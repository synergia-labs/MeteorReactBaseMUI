import { Meteor } from 'meteor/meteor';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

export const subjectRouter = new Subject();
export const subjectCallMethod = new Subject();
export const subjectSubscribe = new Subject();
export const subjectComponents = new Subject();

if (Meteor.isClient) {
	//LoggedUser
	subjectRouter.pipe(filter((event: any) => !!event && !!event.user)).subscribe((event) => {
		console.info('Router-LoggedUser>', event);
	});

	//NoLoggedUser
	subjectRouter.pipe(filter((event: any) => !!event && !event.user)).subscribe((event) => {
		console.info('Router-UnLoggedUser>', event);
	});

	//LoggedUser
	subjectCallMethod.pipe(filter((event: any) => !!event && !!event.user)).subscribe((event) => {
		console.info('CallMethod-LoggedUser>', event);
	});

	//LoggedUser
	subjectSubscribe.pipe(filter((event: any) => !!event && !!event.user)).subscribe((event) => {
		console.info('subjectSubscribe-LoggedUser>', event);
	});

	subjectComponents.pipe(filter((event) => !!event)).subscribe((event) => {
		console.info('subjectComponent', event);
	});
}
