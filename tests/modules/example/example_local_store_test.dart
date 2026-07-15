import 'dart:typed_data';

import 'package:flutter_test/flutter_test.dart';
import 'package:sqflite_common_ffi/sqflite_ffi.dart';
import 'package:synergia_flutter_meteor_boilerplate/modules/example/data/example_local_store.dart';
import 'package:synergia_flutter_meteor_boilerplate/modules/example/domain/example.dart';
import 'package:synergia_flutter_meteor_boilerplate/modules/example/domain/example_asset.dart';
import 'package:synergia_flutter_meteor_boilerplate/services/meteor/meteor_error_mapper.dart';

void main() {
  sqfliteFfiInit();

  late ExampleLocalStore store;

  setUp(() {
    store = ExampleLocalStore(
      factory: databaseFactoryFfi,
      databasePath: inMemoryDatabasePath,
    );
  });

  tearDown(() => store.close());

  test(
    'salva documento offline e cria uma operação idempotente na fila',
    () async {
      const example = Example(
        id: 'offline-1',
        title: 'Inspeção offline',
        type: 'Categoria A',
        priority: 'alta',
      );

      await store.saveLocal(example);
      await store.saveLocal(example);

      final saved = await store.getExample('offline-1');
      final queue = await store.dueQueue();
      expect(saved?.title, 'Inspeção offline');
      expect(saved?.syncStatus, ExampleSyncStatus.pending);
      expect(queue, hasLength(1));
      expect(queue.single.action, 'upsert');
    },
  );

  test('compartilha a abertura do banco entre acessos simultâneos', () async {
    await store.close();
    final factory = _CountingDatabaseFactory(databaseFactoryFfi);
    store = ExampleLocalStore(
      factory: factory,
      databasePath: inMemoryDatabasePath,
    );

    final databases = await Future.wait([
      store.database,
      store.database,
      store.database,
    ]);

    expect(factory.openCount, 1);
    expect(
      databases.every((database) => identical(database, databases.first)),
      isTrue,
    );
  });

  test('não sobrescreve edição pendente ao receber versão remota', () async {
    await store.saveLocal(
      const Example(
        id: 'same-id',
        title: 'Minha edição',
        type: 'Categoria A',
        priority: 'media',
      ),
    );

    await store.mergeRemote(
      Example(
        id: 'same-id',
        title: 'Versão do servidor',
        type: 'Categoria B',
        priority: 'baixa',
        lastUpdate: DateTime.utc(2026, 7, 15),
      ),
    );

    expect((await store.getExample('same-id'))?.title, 'Minha edição');
  });

  test(
    'baixa automaticamente imagem e áudio, mas não anexo genérico',
    () async {
      await store.mergeRemote(
        Example(
          id: 'doc-assets',
          title: 'Documento',
          type: 'Categoria A',
          priority: 'baixa',
          lastUpdate: DateTime.utc(2026, 7, 15),
        ),
      );
      for (final asset in [
        const ExampleAsset(
          id: 'image-1',
          exampleId: 'doc-assets',
          kind: ExampleAssetKind.image,
          name: 'foto.jpg',
          mimeType: 'image/jpeg',
          size: 10,
          remoteUrl: 'https://example.test/foto.jpg',
          status: ExampleAssetSyncStatus.available,
        ),
        const ExampleAsset(
          id: 'audio-1',
          exampleId: 'doc-assets',
          kind: ExampleAssetKind.audio,
          name: 'voz.m4a',
          mimeType: 'audio/mp4',
          size: 20,
          remoteUrl: 'https://example.test/voz.m4a',
          status: ExampleAssetSyncStatus.available,
        ),
        const ExampleAsset(
          id: 'file-1',
          exampleId: 'doc-assets',
          kind: ExampleAssetKind.attachment,
          name: 'laudo.pdf',
          mimeType: 'application/pdf',
          size: 30,
          remoteUrl: 'https://example.test/laudo.pdf',
          status: ExampleAssetSyncStatus.available,
        ),
      ]) {
        await store.putAsset(asset);
      }

      final automatic = await store.assetsToAutoDownload();
      expect(
        automatic.map((item) => item.id),
        containsAll(['image-1', 'audio-1']),
      );
      expect(automatic.map((item) => item.id), isNot(contains('file-1')));
    },
  );

  test('conflito pausa a fila até uma resolução explícita', () async {
    await store.saveLocal(
      const Example(
        id: 'conflict-1',
        title: 'Versão local',
        type: 'Categoria A',
        priority: 'alta',
      ),
    );
    final operation = (await store.dueQueue()).single;
    await store.failQueue(
      operation,
      const MeteorFailure(
        message: 'Alterado no servidor',
        kind: MeteorFailureKind.unknown,
        code: 'sync-conflict',
      ),
    );

    expect(
      (await store.getExample('conflict-1'))?.syncStatus,
      ExampleSyncStatus.conflict,
    );
    expect(await store.dueQueue(), isEmpty);

    await store.rebaseLocalConflict(
      'conflict-1',
      DateTime.utc(2026, 7, 15, 12),
    );
    expect((await store.dueQueue()).single.entityId, 'conflict-1');
    expect(
      (await store.getExample('conflict-1'))?.syncStatus,
      ExampleSyncStatus.pending,
    );
  });
}

class _CountingDatabaseFactory implements DatabaseFactory {
  _CountingDatabaseFactory(this.delegate);

  final DatabaseFactory delegate;
  int openCount = 0;

  @override
  Future<Database> openDatabase(
    String path, {
    OpenDatabaseOptions? options,
  }) async {
    openCount++;
    await Future<void>.delayed(const Duration(milliseconds: 10));
    return delegate.openDatabase(path, options: options);
  }

  @override
  Future<bool> databaseExists(String path) => delegate.databaseExists(path);

  @override
  Future<void> deleteDatabase(String path) => delegate.deleteDatabase(path);

  @override
  Future<String> getDatabasesPath() => delegate.getDatabasesPath();

  @override
  Future<Uint8List> readDatabaseBytes(String path) =>
      delegate.readDatabaseBytes(path);

  @override
  Future<void> setDatabasesPath(String path) => delegate.setDatabasesPath(path);

  @override
  Future<void> writeDatabaseBytes(String path, Uint8List bytes) =>
      delegate.writeDatabaseBytes(path, bytes);
}
