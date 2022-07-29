const axios = require("axios");
const { Country, Activity } = require("../db");

const dbLoader = async () => {
    try {
        const api = await axios.get('https://restcountries.com/v3/all')
        if (api) {
            const apiInfo = api.data?.map(e => {
                return {
                    id: e.cca3,
                    name: e.name.common,
                    img: e.flags[1],
                    continents: e.continents[0],
                    capital: e.capital ? e.capital.join(', ') : 'Sin capital',
                    subregion: e.subregion ? e.subregion : 'Sin subregion',
                    area: e.area,
                    population: e.population
                }
            })

            //return apiInfo

            const allInfo = Country.findAll({ include: Activity })
            if (!allInfo.length) {
                Country.bulkCreate(apiInfo);
            }
        }
    }
    catch (e) {
        console.log(e);
    }
}

const getOneCountry = async (id) => {
    try {
        if (id) {
            const DbAndApiInfo = await Country.findAll({
                where: {
                    id: id.toUpperCase()
                },
                include: { model: Activity }
            });
            return DbAndApiInfo;
        }
    }
    catch (e) {
        console.log(e)
    }
}

//<----------Filters LOGIC---------->


const getFilteredActivity = async (activity) => {
    try {
        if (activity) {
            //http://localhost:3001/Activities/filterActivity/Ir a correr

            const allInfo = await Country.findAll({
                include: { model: Activity }
            });

            const countriesAndActivities = allInfo.filter((c) => {
                let check = false;
                if (c.activities) {
                    c.activities.forEach((a) => {
                        if (a.name.toLowerCase().includes(activity.toLowerCase())) {
                            check = true;
                        }
                    });
                }
                return check;
            });

            return countriesAndActivities;
        }
    }
    catch (e) {
        console.log(e);
    }
}

const getFilteredContinent = async (continent) => { //http://localhost:3001/Countries/filterContinent/Africa
    try {
        if (continent) {

            //Logica donde cada primera palabra, su primer caracter se convertira en MAYUSCULA.
            //Esto es para lograr con exito la busqueda en la db.

            const continentAux = continent.split(" ").map((palabra) => {
                return palabra[0].toUpperCase() + palabra.substring(1);
            }).join(" ")

            const countries = Country.findAll({
                where: {
                    continents: continentAux
                },
                include: { model: Activity }
            })

            return countries
        }
    }
    catch (e) {
        console.log(e);
    }
}

// <---------- ORDERS ---------->


// const getPopulationOrder = async (order) => {
//     try {
//         if (order) {
//             const allInfo = await Country.findAll({
//                 include: { model: Activity }
//             });


//             if (order.toLowerCase() === 'asc') {
//                 allInfo.sort(function (a, b) {
//                     if (a.population > b.population) return 1;
//                     if (a.population < b.population) return -1;
//                     return 0;
//                 })
//                 return allInfo
//             }
//             else if (order.toLowerCase() === 'desc') {
//                 allInfo.sort(function (a, b) {
//                     if (a.population > b.population) return -1;
//                     if (a.population < b.population) return 1;
//                     return 0;
//                 })
//                 return allInfo
//             }

//         }
//     }
//     catch (e) {
//         console.log(e);
//     }
// }





module.exports = {
    dbLoader,
    getOneCountry,
    getFilteredActivity,
    getFilteredContinent,
    // getPopulationOrder
}