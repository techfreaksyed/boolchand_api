var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import sql from "mssql";
import 'dotenv/config';
import { sqlconfig } from "./database.config.js";
import { convertKeysToLowerCaseInArray, addIdToObjects } from "./utils.js";
const app = express();
app.use(bodyParser.json());
app.use(cors());
// // Login Route
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const pool = yield sql.connect(sqlconfig);
        const result = yield pool.request().query(`SELECT * FROM dbo.TestPWD WHERE Username = '${username}' AND Password = '${password}'`);
        if (result.recordset.length > 0) {
            res.json({ success: true });
        }
        else {
            res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}));
// // Fetch Data Route
app.post("/getCrocsData", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, limit } = req.body;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const pool = yield sql.connect(sqlconfig);
        const result = yield pool.request().query(`SELECT * FROM  MiscData.dbo.pj_Crocs_Tran`);
        const arrResult = convertKeysToLowerCaseInArray(result.recordset);
        const arrWithId = addIdToObjects(arrResult);
        const newArr = arrWithId.slice(startIndex, endIndex);
        res.json([newArr]);
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}));
// // Server Start
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
