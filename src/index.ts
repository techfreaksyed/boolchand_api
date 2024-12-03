import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import sql from "mssql";
import 'dotenv/config'
import { sqlconfig } from "./database.config.js";
import { convertKeysToLowerCaseInArray, addIdToObjects } from "./utils.js"


const app = express();
app.use(bodyParser.json());
app.use(cors());


// // Login Route
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const pool = await sql.connect(sqlconfig);
        const result = await pool.request().query(`SELECT * FROM dbo.TestPWD WHERE Username = '${username}' AND Password = '${password}'`);
        if (result.recordset.length > 0) {
            res.json({ success: true });
        } else {
            res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// // Fetch Data Route
app.post("/getCrocsData", async (req, res) => {
    try {
        const { page, limit } = req.body;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const pool: any = await sql.connect(sqlconfig);
        const result = await pool.request().query(`SELECT * FROM  MiscData.dbo.pj_Crocs_Tran`);
        const arrResult = convertKeysToLowerCaseInArray(result.recordset);
        const arrWithId = addIdToObjects(arrResult);
        const newArr = arrWithId.slice(startIndex, endIndex);
        res.json([newArr]);
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// // Server Start
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
