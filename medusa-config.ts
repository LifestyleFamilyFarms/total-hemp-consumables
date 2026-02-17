import { loadEnv, defineConfig } from '@medusajs/framework/utils';
import { resolveShipstationEnv } from "./src/utils/shipstation-env"

loadEnv(process.env.NODE_ENV || 'development', process.cwd());

const isProd = process.env.NODE_ENV === 'production';
const dbSslRejectUnauthorized = process.env.DB_SSL_REJECT_UNAUTHORIZED;
const shipstationEnv = resolveShipstationEnv(process.env.NODE_ENV)
const redisDisabled = process.env.DISABLE_REDIS_MODULES === "true"
const sharedRedisUrl = process.env.REDIS_URL
const cacheRedisUrl = process.env.CACHE_REDIS_URL || sharedRedisUrl
const eventsRedisUrl = process.env.EVENTS_REDIS_URL || sharedRedisUrl
const workflowRedisUrl = process.env.WORKFLOW_REDIS_URL || sharedRedisUrl
const lockingRedisUrl = process.env.LOCKING_REDIS_URL || sharedRedisUrl

const shouldUseRedisSessionStore = !redisDisabled && Boolean(sharedRedisUrl)
const shouldUseCacheRedis = !redisDisabled && Boolean(cacheRedisUrl)
const shouldUseEventsRedis = !redisDisabled && Boolean(eventsRedisUrl)
const shouldUseWorkflowRedis = !redisDisabled && Boolean(workflowRedisUrl)
const shouldUseRedisLocking = !redisDisabled && Boolean(lockingRedisUrl)

const databaseDriverOptions = (() => {
  if (isProd) {
    const sslConfig = dbSslRejectUnauthorized
      ? { rejectUnauthorized: dbSslRejectUnauthorized !== "false" }
      : true

    return {
      connection: {
        ssl: sslConfig,
      },
    }
  }

  if (dbSslRejectUnauthorized) {
    return {
      connection: {
        ssl: { rejectUnauthorized: dbSslRejectUnauthorized !== "false" },
      },
    }
  }

  return {}
})();

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
    redisUrl: shouldUseRedisSessionStore ? sharedRedisUrl : undefined,
    workerMode: process.env.MEDUSA_WORKER_MODE as "shared" | "worker" | "server",
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET,
      cookieSecret: process.env.COOKIE_SECRET,
    },
    // Enable SSL options for production if needed
    databaseDriverOptions,
  },
  modules: [
    //Authorize.net Payment Module
    {
      resolve: "@medusajs/medusa/payment",
      options: {
        providers: [
          {
            resolve: "payment-authorizenet-medusa",
            id: "authorizenet",
            options: {
              api_login_id: process.env.AUTHORIZE_NET_API_LOGIN_ID,
              transaction_key: process.env.AUTHORIZE_NET_TRANSACTION_KEY,
              capture: true,
              environment: process.env.NODE_ENV === "production" ? "production" : "sandbox"
            }
          }
        ]
      }
    },
    ...(shouldUseCacheRedis
      ? [
          // Redis Cache Module
          {
            resolve: '@medusajs/medusa/cache-redis',
            options: {
              redisUrl: cacheRedisUrl,
            },
          },
        ]
      : []),
    ...(shouldUseEventsRedis
      ? [
          // Redis Event Bus Module
          {
            resolve: '@medusajs/medusa/event-bus-redis',
            options: {
              redisUrl: eventsRedisUrl,
            },
          },
        ]
      : []),
    ...(shouldUseWorkflowRedis
      ? [
          // Workflow Engine Redis Module
          {
            resolve: '@medusajs/medusa/workflow-engine-redis',
            options: {
              // Keep both keys for compatibility across loader versions.
              redisUrl: workflowRedisUrl,
              redis: {
                redisUrl: workflowRedisUrl,
                url: workflowRedisUrl,
              },
            },
          },
        ]
      : []),
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
        providers: shouldUseRedisLocking
          ? [
              {
                resolve: "@medusajs/medusa/locking-redis",
                id: "locking-redis",
                options: {
                  redisUrl: lockingRedisUrl,
                },
              },
            ]
          : [
              {
                resolve: "@medusajs/medusa/locking-postgres",
                id: "locking-postgres",
              },
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
            resolve: "./src/modules/shipstation",
            id: "shipstation",
            options: {
              api_key: shipstationEnv.apiKey,
              api_secret: shipstationEnv.apiSecret
            }
          }
        ]
      }
    },
    {
      resolve: "./src/modules/sales-stores",
    },
    {
      resolve: "./src/modules/sales-people",
    },
  ],
}); 
