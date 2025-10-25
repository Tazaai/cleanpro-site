import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ 
    ok: true, 
    message: "✅ Test API route working",
    timestamp: new Date().toISOString()
  });
});

export default router;