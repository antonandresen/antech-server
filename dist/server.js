"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = require("path");
// Load env vars
dotenv_1.default.config({ path: path_1.resolve(__dirname, '../config/config.env') });
const app = express_1.default();
app.get("/", (req, res) => {
    res.json({ yeet: "dab" });
});
const PORT = process.env.PORT || 1337;
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
