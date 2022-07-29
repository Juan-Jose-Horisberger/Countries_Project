const router = require("express").Router();

const {
    getCountries,
    getCountry,
    getContinent,
    // getPopulationInOrder,
  } = require("../controllers/Country");
  
  //Creating routes and adding the controllers.
  
  router.get("/", getCountries);
  router.get("/:id", getCountry);

  // FILTER
  router.get("/filterContinent/:continent", getContinent); 

  //ORDER
  // router.get("/orderPopulation/:order", getPopulationInOrder);
  

module.exports = router;
