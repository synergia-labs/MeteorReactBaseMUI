import { ApiBase } from "/imports/api/base";

class ProjectBase extends ApiBase {
  constructor(apiName: string, apiSch: any, options?: object) {
    super(apiName, apiSch, options);
  }
}

export default ProjectBase;
