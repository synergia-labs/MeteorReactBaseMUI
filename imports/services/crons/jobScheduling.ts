import cron from "node-cron";

class JobScheduling {
	private jobs: Map<string, cron.ScheduledTask> = new Map();
	private withLogs: boolean;

	constructor(withLogs = false) {
		this.withLogs = withLogs;
	}

	initJobScheduling() {
		console.info("Jobs scheduler iniciado.");
	}

	stopJobScheduling() {
		this.jobs.forEach((task, jobName) => {
			task.stop();
			if (this.withLogs) {
				console.info(`Job '${jobName}' parado.`);
			}
		});
	}

	removeJob(jobName: string) {
		const job = this.jobs.get(jobName);
		if (job) {
			job.stop();
			this.jobs.delete(jobName);
			if (this.withLogs) {
				console.info(`Job '${jobName}' removido.`);
			}
		}
	}

	addJob(jobName: string, schedule: string, job: () => void) {
		if (this.jobs.has(jobName)) {
			console.warn(`Job '${jobName}' já existe.`);
			return;
		}

		const task = cron.schedule(schedule, job, { scheduled: true });
		this.jobs.set(jobName, task);

		if (this.withLogs) {
			console.info(`Job '${jobName}' agendado com cron '${schedule}'.`);
		}
	}
}

export const jobScheduling = new JobScheduling();
