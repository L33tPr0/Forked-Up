export default {
    environment: process.env.NODE_ENV || "development",
    port: process.env.PORT || 8000,
    db: {
        schema: process.env.SCHEMA,
        file: process.env.DB_FILE,
    },
    jwtConfig: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    },
};
