const router = require("express").Router();

const {
    getActivities,
    addActivities,
    getTouristActivity,
    deleteActivity,
    putActivity
} = require('../controllers/Activity')


// GETS
router.get("/", getActivities);

//Filtro de paises que tienen la actividad turistica que nos llega desde el front.
router.get("/filterActivity/:activity", getTouristActivity);


// POST
router.post("/", addActivities);

// DELETE
router.delete("/deleteActivity/:id", deleteActivity);

// PUT
router.put("/putActivity/:idAct", putActivity)

module.exports = router;

