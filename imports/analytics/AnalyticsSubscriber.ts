import { Subject } from "rxjs";
import { filter } from "rxjs/operators";

export const subjectRouter = new Subject();
export const subjectCallMethod = new Subject();
export const subjectSubscribe = new Subject();

if (Meteor.isClient) {
  //LoggedUser
  subjectRouter.pipe(filter((event) => !!event.user)).subscribe((event) => {
    //console.log("Router-LoggedUser>", event);
  });

  //NoLoggedUser
  subjectRouter.pipe(filter((event) => !event.user)).subscribe((event) => {
    //console.log("Router-UnLoggedUser>", event);
  });

  //LoggedUser
  subjectCallMethod.pipe(filter((event) => !!event.user)).subscribe((event) => {
    //console.log("CallMethod-LoggedUser>", event);
  });

  //LoggedUser
  subjectSubscribe.pipe(filter((event) => !!event.user)).subscribe((event) => {
    //console.log("subjectSubscribe-LoggedUser>", event);
  });
}
