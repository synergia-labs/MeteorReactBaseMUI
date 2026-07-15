import 'package:flutter_test/flutter_test.dart';
import 'package:synergia_flutter_meteor_boilerplate/modules/example/data/example_api.dart';
import 'package:synergia_flutter_meteor_boilerplate/modules/example/domain/example.dart';
import 'package:synergia_flutter_meteor_boilerplate/services/meteor/meteor_subscription.dart';
import 'package:synergia_flutter_meteor_boilerplate/services/meteor/meteor_transport.dart';
import 'package:dart_meteor/dart_meteor.dart';

void main() {
  test('converte o schema example do Meteor sem perder nomes de campos', () {
    final createdAt = DateTime.utc(2026, 7, 14);
    final example = Example.fromMeteor({
      '_id': 'example-1',
      'title': 'Produto de teste',
      'description': 'Descrição',
      'type': 'Categoria A',
      'typeMulti': 'alta',
      'contacts': {'phone': '3133334444'},
      'slider': 42,
      'statusToggle': true,
      'createdat': createdAt,
    });

    expect(example.id, 'example-1');
    expect(example.priority, 'alta');
    expect(example.createdAt, createdAt);
    expect(example.contacts['phone'], '3133334444');
    expect(example.toMeteorDocument(), containsPair('typeMulti', 'alta'));
    expect(example.toMeteorDocument(), isNot(contains('createdat')));
  });

  test('ExampleApi usa os métodos CRUD padronizados do ProductBase', () async {
    final transport = _FakeTransport();
    final api = ExampleApi(transport: transport);
    const example = Example(
      id: '',
      title: 'Novo',
      type: 'Categoria B',
      priority: 'media',
    );

    final id = await api.save(example);
    expect(id, 'created-id');
    expect(transport.lastMethod, 'example.insert');
    expect(transport.lastArgs.single, containsPair('title', 'Novo'));

    await api.remove('created-id');
    expect(transport.lastMethod, 'example.remove');
    expect(transport.lastArgs, [
      {'_id': 'created-id'},
    ]);
  });
}

class _FakeTransport implements MeteorTransport {
  String? lastMethod;
  List<dynamic> lastArgs = const [];

  @override
  Future<dynamic> call(String method, {List<dynamic> args = const []}) async {
    lastMethod = method;
    lastArgs = args;
    return method.endsWith('.insert') ? 'created-id' : null;
  }

  @override
  Stream<Map<String, dynamic>> collection(String name) => const Stream.empty();

  @override
  Map<String, dynamic> collectionValue(String name) => const {};

  @override
  Stream<DdpConnectionStatus> get connectionStatus => const Stream.empty();

  @override
  Stream<Map<String, dynamic>?> get meteorUser => const Stream.empty();

  @override
  void reconnect() {}

  @override
  MeteorSubscription subscribe(
    String publication, {
    List<dynamic> args = const [],
  }) {
    throw UnimplementedError();
  }

  @override
  Stream<String?> get userId => const Stream.empty();

  @override
  Future<void> waitUntilConnected({
    Duration timeout = const Duration(seconds: 12),
  }) async {}
}
