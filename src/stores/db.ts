import { openDB } from 'idb';

const DB_NAME = 'three-egg-phone';
let currentVersion = 1;

async function getDB(storeName: string) {
  let db = await openDB(DB_NAME, currentVersion, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName);
      }
    },
  });

  if (!db.objectStoreNames.contains(storeName)) {
    db.close();
    currentVersion += 1;
    db = await openDB(DB_NAME, currentVersion, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName);
        }
      },
    });
  }
  return db;
}

export async function get(storeName: string, key: string): Promise<any> {
  const db = await getDB(storeName);
  return db.get(storeName, key);
}

export async function set(storeName: string, key: string, value: any): Promise<void> {
  const db = await getDB(storeName);
  await db.put(storeName, value, key);
}

export async function del(storeName: string, key: string): Promise<void> {
  const db = await getDB(storeName);
  await db.delete(storeName, key);
}

export async function clearAll(storeName: string): Promise<void> {
  const db = await getDB(storeName);
  await db.clear(storeName);
}
