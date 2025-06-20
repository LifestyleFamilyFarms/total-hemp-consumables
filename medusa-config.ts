import { loadEnv, defineConfig } from '@medusajs/framework/utils';

loadEnv(process.env.NODE_ENV || 'development', process.cwd());

const isProd = process.env.NODE_ENV === 'production';

module.exports = defineConfig({
  admin: {
    backendUrl: process.env.MEDUSA_BACKEND_URL,
    disable: process.env.DISABLE_MEDUSA_ADMIN === "true",
    storefrontUrl: process.env.MEDUSA_STOREFRONT_URL,
  },
  projectConfig: {
    // Use production-ready database settings dynamically
    databaseUrl: process.env.DATABASE_URL,
    databaseName: process.env.DATABASE_NAME,
    redisUrl: process.env.REDIS_URL,
    workerMode: process.env.MEDUSA_WORKER_MODE as "shared" | "worker" | "server",
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET,
      cookieSecret: process.env.COOKIE_SECRET,
    },
    // Enable SSL options for production if needed
    databaseDriverOptions: isProd
      ? { connection: { ssl: { rejectUnauthorized: false } } }
      : {},
  },
  modules: [
    // Redis Cache Module
    {
      resolve: '@medusajs/medusa/cache-redis',
      options: {
        redisUrl: process.env.CACHE_REDIS_URL,
      },
    },
    // Redis Event Bus Module
    {
      resolve: '@medusajs/medusa/event-bus-redis',
      options: {
        redisUrl: process.env.EVENTS_REDIS_URL,
      },
    },
    // Workflow Engine Redis Module
    {
      resolve: '@medusajs/medusa/workflow-engine-redis',
      options: {
        redis: {
          url: process.env.WORKFLOW_REDIS_URL,
        },
      },
    },
    // S3 File Module Provider (for production)
    {
      resolve: '@medusajs/medusa/file',
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/file-s3",
            id: "s3",
            options: {
              file_url: process.env.S3_FILE_URL,
              access_key_id: process.env.S3_ACCESS_KEY_ID,
              secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
              region: process.env.S3_REGION,
              bucket: process.env.S3_BUCKET,
              endpoint: process.env.S3_ENDPOINT
            }
          }
        ]
      }
    },
    //Redis Locking Module
    {
      resolve: "@medusajs/medusa/locking",
      options:{
        providers: [
          {
            resolve: "@medusajs/medusa/locking-redis",
            id: "locking-redis",
            options:{
              redisUrl: process.env.LOCKING_REDIS_URL
            }
          }
        ]
      }
    },
    //SendGrid Notifications
    {
      resolve: "@medusajs/medusa/notification",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/notification-sendgrid",
            id: "sendgrid",
            options: {
              channels: ["email"],
              api_key: process.env.SENDGRID_API_KEY,
              from: process.env.SENDGRID_FROM,
            },
          },
        ],
      },
    },
    //ShipStation Fulfillment
    {
      resolve: "@medusajs/medusa/fulfillment",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/fulfillment-manual",
            id: "manual",
          },
          {
            resolve: "./src/modules/shipstation",
            id: "shipstation",
            options: {
              api_key: process.env.SHIPSTATION_API_KEY
            }
          }
        ]
      }
    },
  ],
}); 

