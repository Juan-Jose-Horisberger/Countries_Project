const router = require("express").Router();

const { getActivities, addActivities, getTouristActivity } = require('../controllers/Activity')

router.get("/", getActivities);

//Filtro de paises que tienen la actividad turistica que nos llega desde el front.
router.get("/filterActivity/:activity", getTouristActivity);


router.post("/", addActivities);

module.exports = router;

