import 'meteor/meteor';

declare module 'meteor/meteor' {
	namespace Meteor {
		interface UserProfile {
			name?: string;
			email?: string;
		}

		interface UserServices {
			password?: { bcrypt?: string };
			resume?: { loginTokens?: Array<{ when: Date; hashedToken: string }> };
			username?: string;
			google?: {
				name?: string;
				email?: string;
				picture?: string;
				[key: string]: unknown;
			};
			facebook?: {
				name?: string;
				email?: string;
				picture?: string;
				[key: string]: unknown;
			};
		}
	}
}
