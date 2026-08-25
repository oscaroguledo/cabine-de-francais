/* Minimal IndexedDB key/value store for persisting the SQLite database's raw
 * bytes between sessions. sql.js keeps the whole DB in memory — this is what
 * makes that memory durable across page reloads/browser restarts. */
const DB_NAME = "cabine_sqlite_store";
const STORE_NAME = "blobs";
const DB_VERSION = 1;

function openIdb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE_NAME);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function loadBlob(key) {
  try {
    const idb = await openIdb();
    return await new Promise((resolve, reject) => {
      const tx = idb.transaction(STORE_NAME, "readonly");
      const req = tx.objectStore(STORE_NAME).get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    return null;
  }
}

export async function saveBlob(key, uint8Array) {
  try {
    const idb = await openIdb();
    await new Promise((resolve, reject) => {
      const tx = idb.transaction(STORE_NAME, "readwrite");
      tx.objectStore(STORE_NAME).put(uint8Array, key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (e) {
    /* IndexedDB unavailable (private mode etc.) — in-memory DB still works
     * for the current session, it just won't survive a reload. */
  }
}
