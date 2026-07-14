import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

const perMinute = Number(process.env.DDP_METHODS_PER_MINUTE || 120);
const publicationsPerMinute = Number(process.env.DDP_SUBSCRIPTIONS_PER_MINUTE || 120);
const emailAttempts = Number(process.env.EMAIL_METHOD_RATE_LIMIT_MAX || 5);
const emailWindowMs = Number(process.env.EMAIL_METHOD_RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000);

DDPRateLimiter.addRule({ type: 'method', name: (name: string) => !name.startsWith('/') }, perMinute, 60_000);

DDPRateLimiter.addRule({ type: 'subscription', name: () => true }, publicationsPerMinute, 60_000);

DDPRateLimiter.addRule(
	{
		type: 'method',
		name: (name: string) => ['userprofile.sendVerificationEmail', 'userprofile.sendResetPasswordEmail'].includes(name)
	},
	emailAttempts,
	emailWindowMs
);

DDPRateLimiter.addRule({ type: 'method', name: 'RemoveFile' }, 20, 60_000);
