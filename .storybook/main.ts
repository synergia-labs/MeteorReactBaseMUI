import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
	'stories': [
		'../stories/**/*.mdx', 
		'../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
		'../imports/**/*.mdx',
    	'../imports/**/*.stories.@(js|jsx|ts|tsx)'
	],
	'addons': [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-onboarding',
        '@storybook/addon-interactions',
        '@storybook/addon-themes',
    ],
	'framework': {
		'name': '@storybook/react-webpack5',
		'options': {
			'builder': {
				'useSWC': true
			}
		}
	},
	'docs': {
		'autodocs': 'tag'
	}
};
export default config;
