import { Meteor } from "meteor/meteor";
// @ts-ignore
import { ParseStatic, ScheduleData } from "later";

if (Meteor.isServer) {
	// @ts-ignore
	import { SyncedCron } from "meteor/littledata:synced-cron"; // eslint-disable-line
}

/**
 * Interface para registro de JOBs.
 */
class JobScheduling {
	initJobScheduling() {
		if (Meteor.settings.runJobs === false) {
			console.info(
				"Jobs não serão iniciados nesta instância do servidor. Para habilitar utilize Meteor.settings.runJobs = true"
			);
			return;
		}
		SyncedCron.start();
	}

	removeJob(jobName: string) {
		SyncedCron.remove(jobName);
	}

	addJob(
		jobName: string,
		schedule: (parser: ParseStatic) => ScheduleData,
		job: Function // eslint-disable-line
	) {
		SyncedCron.add({
			name: jobName,
			schedule,
			job
		});
	}
}

export const jobScheduling = new JobScheduling();
