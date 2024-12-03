
// Database Configuration

export const sqlconfig = {
    user: process.env.user ?? '',
    password: process.env.password ?? '',
    server: process.env.server ?? '',
    database: process.env.database ?? '',
    options: {
        encrypt: false,
        enableArithAbort: true,
    },
};