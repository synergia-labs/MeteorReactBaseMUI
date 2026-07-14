import type { IUserProfile } from '/imports/modules/userprofile/api/userProfileSch';

declare global {
	interface Window {
		$app?: {
			user?: IUserProfile;
			api?: Record<string, unknown>;
			[key: string]: unknown;
		};
		webkitURL?: typeof URL;
	}
}

export {};
