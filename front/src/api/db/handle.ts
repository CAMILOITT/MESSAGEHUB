export class Db {
  private connection: IDBOpenDBRequest
  private nameDb: string

  constructor(nameDb: string, version: number) {
    this.nameDb = nameDb
    this.connection = indexedDB.open(nameDb, version)

    this.connection.onsuccess = e => {
      const db = (e.target as IDBOpenDBRequest).result
      console.log(db)
    }

    this.connection.onupgradeneeded = e => {
      const db = (e.target as IDBOpenDBRequest).result
      db.createObjectStore(nameDb, { keyPath: 'id' })
    }
  }

  public createCollection(data: unknown) {
    const db = this.connection.result
    const transaction = db.transaction(this.nameDb, 'readwrite')

    const collection = transaction.objectStore(this.nameDb)

    collection.add(data)
  }

  public readCollection() {
    const db = this.connection.result
    const transaction = db.transaction(this.nameDb, 'readonly')

    transaction.objectStore(this.nameDb).getAll()
  }

  public getSomeCollections() {
    const db = this.connection.result
    const transaction = db.transaction(this.nameDb, 'readonly')
    transaction.objectStore(this.nameDb).openCursor
  }
}
