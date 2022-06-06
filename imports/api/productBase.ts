import { ApiBase } from "/imports/api/base";
import { getUser } from "/imports/libs/getUser";

export class ProductBase extends ApiBase<any> {
  constructor(apiName: string, apiSch: any, options?: object) {
    super(apiName, apiSch, options);
    if (options && options.enableCallMethodObserver) {
      this.enableCallMethodObserver = true;
    }
    if (options && options.enableSubscribeObserver) {
      this.enableSubscribeObserver = true;
    }

    this.callMethod = this.callMethod.bind(this);
  }

  callMethod(name, ...params) {
    if (Meteor.isClient && this.enableCallMethodObserver) {
      const self = this;
      import("../analytics/AnalyticsSubscriber").then(
        ({ subjectCallMethod }) => {
          const preparedParams = params
            ? Object.keys(params)
                .filter(
                  (key) =>
                    Array.isArray(params[key]) ||
                    typeof params[key] !== "function"
                )
                .reduce((obj, key) => {
                  return Object.assign(obj, {
                    [key]: params[key],
                  });
                }, {})
            : {};

          const eventData = {
            methodName: name,
            collection: self.collectionName,
            params: Object.values(preparedParams),
            user: getUser(),
          };
          const eventStringify = JSON.stringify({ ...eventData, user: null });
          if (self._tmpLastSubscribeRegister !== eventStringify) {
            subjectCallMethod.next(eventData);
            self._tmpLastSubscribeRegister = eventStringify;
          }
        }
      );
    }
    super.callMethod(name, ...params);
  }

  subscribe(
    api: string = "default",
    ...params: object[]
  ): { stop(): void; ready: () => boolean } | null {
    if (Meteor.isClient && this.enableSubscribeObserver) {
      const self = this;
      import("../analytics/AnalyticsSubscriber").then(
        ({ subjectSubscribe }) => {
          const preparedParams = params
            ? Object.keys(params)
                .filter(
                  (key) =>
                    Array.isArray(params[key]) ||
                    typeof params[key] !== "function"
                )
                .reduce((obj, key) => {
                  return Object.assign(obj, {
                    [key]: params[key],
                  });
                }, {})
            : {};

          const eventData = {
            apiName: api,
            collection: self.collectionName,
            params: Object.values(preparedParams),
            user: getUser(),
          };
          const eventStringify = JSON.stringify({ ...eventData, user: null });
          if (self._tmpLastSubscribeRegister !== eventStringify) {
            subjectSubscribe.next(eventData);
            self._tmpLastSubscribeRegister = eventStringify;
          }
        }
      );
    }

    return super.subscribe(api, ...params);
  }
}
