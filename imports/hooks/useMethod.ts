import { Meteor } from 'meteor/meteor';
import React, { useEffect, useRef, useState } from 'react';
import { ProductBase } from '../api/productBase';
import { IMeteorError } from '../typings/BoilerplateDefaultTypings';
import { IDoc } from '../typings/IDoc';

const isObjectEqual = (objA: object, objB: object) => {
	return JSON.stringify(objA) === JSON.stringify(objB);
};

/**
 * @param api api to be used to call the method
 * @param method method name
 * @param params parameters to be passed to the method
 * @returns  Array[T | null, boolean, IMeteorError | null]
 */

export function useMethod<T>(
	api: ProductBase<IDoc>,
	method: string,
	params?: object
): [result: T | null, loading: boolean, error: IMeteorError | null] {
	const [result, setResult] = useState<T | null>(null);
	const [loading, setLoading] = useState(false);
	const [shouldLoad, setShouldLoad] = useState(false);
	const [error, setError] = useState<IMeteorError | null>(null);
	const optionsRef = useRef(params);

	const isConnected = Meteor.status().connected;

	useEffect(() => {
		if (params && optionsRef.current) {
			let changed = false;
			if (!isObjectEqual(params, optionsRef.current)) {
				optionsRef.current = params;
				changed = true;
			}

			if (changed) {
				setShouldLoad((s) => !s);
			}
		}
	}, [params]);

	useEffect(() => {
		let wait = false;
		setLoading(true);

		const fetchData = async () => {
			api.callMethod(method, params, (e: IMeteorError, result: T) => {
				if (!e) {
					if (!wait) {
						setResult(result);
						setLoading(false);
					}
				} else {
					if (!wait) {
						setLoading(false);
						setError(e);
					}
				}
			});
		};

		fetchData();

		return () => {
			wait = true;
		};
	}, [shouldLoad, isConnected]);

	return [result, loading, error];
}
