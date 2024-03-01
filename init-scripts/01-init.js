db.auth(process.env.MONGO_INITDB_ROOT_USERNAME, process.env.MONGO_INITDB_ROOT_PASSWORD)

const satoroDb = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE);

// базовые коллекции для этой бд
satoroDb.createCollection('teams')
satoroDb.createCollection('players')