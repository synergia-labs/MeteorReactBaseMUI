import { Meteor } from 'meteor/meteor';
import assert from 'assert';
import { hasValue } from '../imports/libs/hasValue';
import { Validador } from '../imports/libs/Validador';
import { escapeRegExp } from '../imports/libs/escapeRegExp';
import { sanitizeHtml } from '../imports/libs/sanitizeHtml';
import { normalizeCheckBoxValue } from '../imports/ui/components/sysFormFields/sysCheckBoxField/normalizeCheckBoxValue';
import { isAllowedAttachment } from '../imports/api/attachmentsCollection';
import { userProfileSch } from '../imports/modules/userprofile/api/userProfileSch';
import { segurancaApi } from '../imports/security/api/segurancaApi';

describe('meteor-react-base-mui', function () {
	it('package.json has correct name', async function () {
		const { name } = await import('../package.json');
		assert.strictEqual(name, 'meteor-react-base-mui');
	});

	it('recognizes meaningful values without treating zero and false as empty', function () {
		assert.strictEqual(hasValue(0), true);
		assert.strictEqual(hasValue(false), true);
		assert.strictEqual(hasValue('  '), false);
		assert.strictEqual(hasValue([]), false);
	});

	it('throws accumulated validation errors', function () {
		const validator = new Validador();
		validator.validar(false, 'invalid', 'Valor inválido');
		assert.throws(() => validator.lancarErroSeHouver(), /errosValidacao/);
	});

	it('escapes user input before building a Mongo regular expression', function () {
		assert.strictEqual(escapeRegExp('a.*(b)'), 'a\\.\\*\\(b\\)');
	});

	it('does not return executable HTML when no browser DOM is available', function () {
		if (Meteor.isServer)
			assert.strictEqual(sanitizeHtml('<script>alert(1)</script>'), '&lt;script&gt;alert(1)&lt;/script&gt;');
	});

	it('normalizes malformed checkbox values without treating objects as iterable lists', function () {
		assert.deepStrictEqual(normalizeCheckBoxValue({}), []);
		assert.deepStrictEqual(normalizeCheckBoxValue(undefined), []);
		assert.deepStrictEqual(normalizeCheckBoxValue(['Grupo 1']), ['Grupo 1']);
	});

	it('accepts supported Flutter media and rejects MIME/extension mismatches', function () {
		assert.strictEqual(
			isAllowedAttachment({ name: 'gravacao.webm', mimeType: 'audio/webm;codecs=opus', size: 1024 }),
			true
		);
		assert.strictEqual(isAllowedAttachment({ name: 'foto.jpg', mimeType: 'application/pdf', size: 1024 }), false);
	});

	it('keeps user profile status as a scalar string', function () {
		assert.strictEqual(userProfileSch.status.type, String);
	});

	it('does not grant resources to disabled profiles', function () {
		assert.strictEqual(
			segurancaApi.podeAcessarRecurso(
				{
					_id: 'disabled-user',
					username: 'Usuário desativado',
					email: 'disabled@example.com',
					roles: ['Administrador'],
					status: 'disabled'
				},
				'USUARIO_VIEW'
			),
			false
		);
	});

	if (Meteor.isClient) {
		it('client is not server', function () {
			assert.strictEqual(Meteor.isServer, false);
		});
	}

	if (Meteor.isServer) {
		it('server is not client', function () {
			assert.strictEqual(Meteor.isClient, false);
		});
	}
});
