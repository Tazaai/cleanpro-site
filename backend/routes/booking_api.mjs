import express from "express";
const router = express.Router();
router.get("/", (req, res) => res.json({ status: "ok", route: "$(basename $route .mjs)" }));
export default router;
