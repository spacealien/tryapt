export default {

    jwtSecret: 'hemmelig',
    cryptoKey: 'hemmeligere',

    sequelize: {
        database: 'test',
        user: 'root',
        password: null,
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        logging: false
    },

    mailer: {
        transport: {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'apttester8531@gmail.com',
                pass: 'asdfasdfasdf'
            }
        }
    }
} // end config
