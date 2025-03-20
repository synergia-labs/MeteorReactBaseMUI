import { useState } from "react";
import { PublicationType } from "../base/types/publication";
import { useTracker } from "meteor/react-meteor-data";

function useSubscribe<MethodBase extends PublicationType<any>, ReturnType>({
	method,
	findFunction,
	param,
	options,
	onReady,
	onStop
}: {
	method: MethodBase;
	findFunction?: () => ReturnType;
	param?: Parameters<MethodBase>[0];
	options?: Parameters<MethodBase>[1];
	onReady?: () => void;
	onStop?: (error: Meteor.Error) => void;
}): {
	data: ReturnType | undefined;
	loading: boolean;
	error: Meteor.Error | undefined;
} {
	const [data, setData] = useState<ReturnType | undefined>(undefined);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<Meteor.Error | undefined>(undefined);

	useTracker(() => {
		setLoading(true);
		method(param || {}, {
			onStop: (error: Meteor.Error) => {
				setLoading(false);
				setError(error);
				onStop?.(error);
			},
			onReady: () => {
				setLoading(false);
				const dataList = findFunction?.();
				setData(dataList);
				onReady?.();
			},
			...(options || {})
		});
	}, []);

	return {
		data: data,
		loading: data == undefined && loading,
		error: error
	};
}

export default useSubscribe;
