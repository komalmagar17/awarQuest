const express=require('express');
const router=express.Router();
const auth=require('../middleware/authMiddleware');
const controller=require('../controllers/resource-controller');
// Public discovery endpoints are safe for guest browser play; scenario-linked resources remain protected.
router.get('/regions',controller.regions);
router.get('/catalogue',controller.catalogue);
router.get('/',auth,controller.list);
router.get('/:scenarioId',auth,controller.listByScenario);
module.exports=router;
