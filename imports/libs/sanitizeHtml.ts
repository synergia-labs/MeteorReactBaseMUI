import DOMPurify from 'dompurify';

const escapeHtml = (value: string) =>
	value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');

const allowedTags = ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'ul', 'ol', 'li', 'blockquote', 'a', 'span'];

export const sanitizeHtml = (value: unknown): string => {
	const html = String(value ?? '');
	if (typeof document === 'undefined') return escapeHtml(html);

	const sanitized = DOMPurify.sanitize(html, {
		ALLOWED_TAGS: allowedTags,
		ALLOWED_ATTR: ['href', 'title', 'target', 'rel', 'class'],
		ALLOW_DATA_ATTR: false,
		FORBID_TAGS: ['svg', 'math', 'style', 'template'],
		FORBID_ATTR: ['style', 'srcdoc'],
		ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|tel):|\/|#)/i
	});

	const template = document.createElement('template');
	template.innerHTML = sanitized;
	template.content.querySelectorAll('a[target="_blank"]').forEach((link) => {
		link.setAttribute('rel', 'noopener noreferrer');
	});
	return template.innerHTML;
};
