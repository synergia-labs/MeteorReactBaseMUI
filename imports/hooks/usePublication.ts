import { useState } from "react";
import { PublicationType } from "../types/publication";
import { useTracker } from "meteor/react-meteor-data";

function useSubscribe<MethodBase extends PublicationType<any>, ReturnType>({
	method,
	findFunction,
	param,
	options,
	onReady,
	onStop,
	callBack
}: {
	method: MethodBase;
	findFunction?: () => ReturnType;
	param?: Parameters<MethodBase>[0];
	options?: Parameters<MethodBase>[1];
	onReady?: () => void;
	onStop?: (error: Meteor.Error) => void;
	callBack?: (error?: Meteor.Error, result?: ReturnType, loading?: boolean) => void;
}): {
	data: ReturnType | undefined;
	loading: boolean;
	error: Meteor.Error | undefined;
} {
	const [error, setError] = useState<Meteor.Error | undefined>(undefined);

	const { data, isLoading } = useTracker(() => {
		const handle = method(param || {}, options, {
			onStop: (error: Meteor.Error) => {
				setError(error);
				onStop?.(error);
			},
			onReady: () => {
				onReady?.();
			}
		});

		const ready = handle?.ready() || false;

		const result = ready && findFunction ? findFunction() : undefined;

		if (callBack && ready) callBack(error, result, isLoading);

		return {
			data: result,
			isLoading: !ready
		};
	}, [JSON.stringify(param), JSON.stringify(options)]);

	return {
		data: data,
		loading: isLoading,
		error: error
	};
}

export default useSubscribe;
