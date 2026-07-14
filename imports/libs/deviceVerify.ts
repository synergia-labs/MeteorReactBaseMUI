const userAgent = typeof navigator === 'undefined' ? '' : navigator.userAgent;

export const iOS = /iPad|iPhone|iPod/.test(userAgent);
export const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);

export const setUserAgent = (targetWindow: Window, nextUserAgent: string) => {
	const userAgentProp = {
		get() {
			return nextUserAgent;
		}
	};
	try {
		Object.defineProperty(targetWindow.navigator, 'userAgent', userAgentProp);
	} catch (e) {
		console.error('#>ERROR>>:', e);
		Object.defineProperty(targetWindow, 'navigator', {
			value: Object.create(navigator, {
				userAgent: userAgentProp
			})
		});
	}
};
