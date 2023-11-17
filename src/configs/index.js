const dev = {
    app: {
        port: process.env.DEV_APP_PORT || 3050
    },
    mongo_db: {
        host: process.env.DEV_MONGO_HOST || '127.0.0.1',
        port: process.env.DEV_MONGO_PORT || 27017,
        name: process.env.DEV_MONGO_NAME || 'shopDev'
    }
}

const pro = {
    app: {
        port: process.env.PRO_APP_PORT || 3055,
    },
    mongo_db: {
        host: process.env.PRO_MONGO_HOST || '127.0.0.1',
        port: process.env.PRO_MONGO_PORT || 27017,
        name: process.env.PRO_MONGO_NAME || 'shopPro'
    }
}

const config = {dev, pro}
const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]

