export default {

    jwtSecret: 'hemmelig',
    cryptoKey: 'hemmeligere',
    
    sequelize: {
        table: 'test',
        user: 'root',
        password: null,
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        logging: false
    },

    mailer: {
        transport: {
            service: 'Gmail',
            auth: {
                user: 'aptemailtester1@gmail.com', 
                pass: 'passord123' 
            }
        },
        mailOptions: {
            from: 'aptemailtester1@gmail.com', // sender address
            subject: 'TILBAKESTILL PASSORD', // Subject line

        }
    }
} // end config
