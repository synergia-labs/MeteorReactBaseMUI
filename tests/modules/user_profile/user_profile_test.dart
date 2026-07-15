import 'package:flutter_test/flutter_test.dart';
import 'package:synergia_flutter_meteor_boilerplate/modules/user_profile/domain/user_profile.dart';
import 'package:synergia_flutter_meteor_boilerplate/services/auth/access_control_policy.dart';

void main() {
  test('mantém o contrato básico da coleção userprofile', () {
    final profile = UserProfile.fromMeteor({
      '_id': 'user-1',
      'username': 'Maria',
      'email': 'maria@example.com',
      'photo': 'data:image/png;base64,abc',
      'phone': '3133334444',
      'roles': ['Usuario'],
      'status': 'active',
      'createdat': '2026-07-01T12:00:00.000Z',
      'lastupdate': '2026-07-02T12:00:00.000Z',
      'sincronizadoEm': '2026-07-03T12:00:00.000Z',
      'needSync': true,
      'createdby': 'admin-1',
      'updatedby': 'admin-2',
    });

    expect(profile.id, 'user-1');
    expect(profile.displayName, 'Maria');
    expect(profile.photo, 'data:image/png;base64,abc');
    expect(profile.phone, '3133334444');
    expect(profile.roles, ['Usuario']);
    expect(profile.status, 'active');
    expect(profile.createdAt, DateTime.utc(2026, 7, 1, 12));
    expect(profile.lastUpdate, DateTime.utc(2026, 7, 2, 12));
    expect(profile.syncedAt, DateTime.utc(2026, 7, 3, 12));
    expect(profile.needsSync, isTrue);
    expect(profile.createdBy, 'admin-1');
    expect(profile.updatedBy, 'admin-2');
  });

  test('converte roles em recursos como o mapa de segurança do React', () {
    const policy = AccessControlPolicy(
      resourcesByRole: {
        'Usuario': {'EXAMPLE_VIEW', 'EXAMPLE_CREATE'},
      },
    );
    const profile = UserProfile(
      id: 'user-1',
      username: 'Maria',
      email: 'maria@example.com',
      roles: ['Usuario'],
    );

    expect(policy.canAccessAny(profile, ['EXAMPLE_VIEW']), isTrue);
    expect(policy.canAccessAny(profile, ['EXAMPLE_REMOVE']), isFalse);
  });

  test('recursos publicados pelo servidor prevalecem sobre o mapa local', () {
    const policy = AccessControlPolicy(
      resourcesByRole: {
        'Administrador': {'EXAMPLE_VIEW', 'EXAMPLE_REMOVE'},
      },
    );
    const profile = UserProfile(
      id: 'admin-1',
      username: 'Admin',
      email: 'admin@example.com',
      roles: ['Administrador'],
      resources: ['EXAMPLE_VIEW'],
    );

    expect(policy.canAccessAny(profile, ['EXAMPLE_VIEW']), isTrue);
    expect(policy.canAccessAny(profile, ['EXAMPLE_REMOVE']), isFalse);
  });
}
