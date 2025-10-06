import express from 'express'; const router = express.Router(); router.get('/', (req,res)=>res.json({ok:true,route:'calendar_api',data:[]})); export default router;
