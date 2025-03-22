import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  admin: {
    backendUrl: process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000',
    storefrontUrl: process.env.MEDUSA_STOREFRONT_URL || 'http://localhost:8000'
  },
  projectConfig: {
    // databaseDriverOptions: process.env.NODE_ENV !== "development" ?
    //   { connection: { ssl: { rejectUnauthorized: false } } } : {},
    // databaseLogging: false,
    databaseUrl: process.env.DATABASE_URL,
    databaseName: process.env.DATABASE_NAME,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!, 
      jwtSecret: process.env.JWT_SECRET,
      cookieSecret: process.env.COOKIE_SECRET,
    }
  }
})
