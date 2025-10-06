import express from 'express'; const router = express.Router(); router.get('/', (req,res)=>res.json({ok:true,route:'coordination_points_api',data:[]})); export default router;
