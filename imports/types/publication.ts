export type PublicationType<PublicationBase extends { action: (...args: any) => any }> = (
	_params?: Parameters<PublicationBase["action"]>[0],
	_options?: Parameters<PublicationBase["action"]>[1],
	_config?: any
) => Meteor.SubscriptionHandle;
