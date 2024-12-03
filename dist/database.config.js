var _a, _b, _c, _d;
export const sqlconfig = {
    user: (_a = process.env.user) !== null && _a !== void 0 ? _a : '',
    password: (_b = process.env.password) !== null && _b !== void 0 ? _b : '',
    server: (_c = process.env.server) !== null && _c !== void 0 ? _c : '',
    database: (_d = process.env.database) !== null && _d !== void 0 ? _d : '',
    options: {
        encrypt: false,
        enableArithAbort: true,
    },
};
