import "dotenv/config"

export const config = {
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options : {
        trustServerCertificate: true,
        trustedConnection: true,
    }
}

