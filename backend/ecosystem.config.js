module.exports = {
    apps: [
        {
            name: "restaurantmanagementcompanion",
            scripts: "npm",
            args: "run dev",
            env: {
                NODE_ENV: "development",
                ENV_VAR1: "environment-variable",
            },
        },
    ],
};
