import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

// Extend the global object type properly
declare global {
  var mongooseCache: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;
}

// Use globalThis instead of global
const globalForMongoose = globalThis as typeof globalThis & {
  mongooseCache?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
};

let cached = globalForMongoose.mongooseCache;

// Ensure that cached is properly initialized if it's undefined
if (!cached) {
  cached = { conn: null, promise: null };
  globalForMongoose.mongooseCache = cached;
}

// Now we assert that cached is non-null and defined
let cachedNonNull = cached as { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };

async function dbConnect() {
  if (cachedNonNull.conn) {
    return cachedNonNull.conn;
  }

  if (!cachedNonNull.promise) {
    cachedNonNull.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }

  cachedNonNull.conn = await cachedNonNull.promise;
  return cachedNonNull.conn;
}

export default dbConnect;
