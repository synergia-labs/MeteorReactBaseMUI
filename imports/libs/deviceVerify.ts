export const iOS = process.browser && /iPad|iPhone|iPod/.test(window.$isMobile || navigator.userAgent);
export const isMobile = /iPhone|iPad|iPod|Android/i.test(window.$isMobile || navigator.userAgent);

export const setUserAgent = (window, userAgent) => {
	const userAgentProp = {
		get() {
			return userAgent;
		}
	};
	try {
		Object.defineProperty(window.navigator, 'userAgent', userAgentProp);
	} catch (e) {
		console.error('#>ERROR>>:', e);
		window.navigator = Object.create(navigator, {
			userAgent: userAgentProp
		});
	}
};
