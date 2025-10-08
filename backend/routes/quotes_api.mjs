import express from "express";
const router = express.Router();
router.get("/", (req,res)=>res.json({ok:true, message:"quotes_api placeholder"}));
export default router;
