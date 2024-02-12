"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cont1_1 = require("./controllers/cont1");
const routes = (0, express_1.Router)();
routes.get("/", (req, res) => {
    return res.json({ message: "Hello World" });
});
routes.post("/create-bucket", cont1_1.createBucket);
exports.default = routes;
