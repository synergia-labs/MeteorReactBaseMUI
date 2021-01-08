/**
 * Browser Policy
 * Set security-related policies to be enforced by newer browsers.
 * These policies help prevent and mitigate common attacks like
 * cross-site scripting and clickjacking.
 */

/**
 * allowed scripts
 */
const allowScriptOrigin = [
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'localhost:3000',
    `${Meteor.absoluteUrl()}`,
];
allowScriptOrigin.forEach(o => {
    return BrowserPolicy.content.allowScriptOrigin(o);
});

/**
 * allowed styles
 */
const allowStyleOrigin = [
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'localhost:3000',
    `${Meteor.absoluteUrl()}`,
];
allowStyleOrigin.forEach(o => {
    return BrowserPolicy.content.allowStyleOrigin(o);
});

const allowFontOrigin = [
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'localhost:3000',
    `${Meteor.absoluteUrl()}`,
];
allowFontOrigin.forEach(o => {
    return BrowserPolicy.content.allowDataUrlForAll(o);
});

const allowAll = [
    'fonts.googleapis.com',
    'maps.gstatic.com',
    'maps.googleapis.com',
    'fonts.gstatic.com',
    'localhost:3000',
    `${Meteor.absoluteUrl()}`,
];
allowAll.forEach(o => {
    return BrowserPolicy.content.allowOriginForAll(o);
});

BrowserPolicy.content.allowInlineScripts('fonts.gstatic.com','localhost:3000',`${Meteor.absoluteUrl()}`);
BrowserPolicy.content.allowOriginForAll('blob:');