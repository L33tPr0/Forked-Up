import config from "./index";

const db = config.db;
const schema = db.schema;

module.exports = {
    development: {
        storage: db.file,
        dialect: "sqlite",
        seederStorage: "prisma",
        logQueryParameters: true,
        typeValidation: true,
    },
    production: {
        use_env_variable: "DATABASE_URL",
        dialect: "postgres",
        seederStorage: "prisma",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
        define: {
            schema,
        },
    },
};
