const { Country, Activity } = require('../db');
const { getOneCountry, getFilteredContinent, getPopulationOrder } = require('./utils');

const getCountries = async (req, res, next) => { // TODOS
    const { name } = req.query;
    try {
        const allTheCountries = await Country.findAll({ include: Activity })

        if (name) {
            const countries = allTheCountries
                .filter((e) => e.name.toLowerCase().includes(name.toLowerCase()))
            countries.length
                ? res.send(countries)
                : res.status(400).json({ messaje: 'Error that country does not exist' });
        }
        else if (allTheCountries.length > 0) {
            res.send(allTheCountries);
        }
    }
    catch (e) {
        next(e);
    }
}

const getCountry = async (req, res, next) => { //POR ID
    const { id } = req.params;
    try {
        if (id) {
            const country = await getOneCountry(id);
            country.length
                ? res.send(country)
                : res.status(400).json({ message: 'Error there is no country with that ID' })
        }
    }
    catch (e) {
        next(e);
    }
}

//Ruta de filtrar con continente.
const getContinent = async (req, res, next) => {
    const { continent } = req.params;
    try {
        // res.send(continent)
        if (continent) {
            const continentFiltered = await getFilteredContinent(continent);
            continentFiltered.length
                ? res.send(continentFiltered)
                : res.status(400).json({ message: 'Error the contains set is not recognized' });
        }
        else res.status(400).json({ message: 'Error the continent was not received' });
    }
    catch (e) {
        next(e)
    }
}

//Ruta de ordenamiento, por cantidad de poblacion ASC y DESC

// const getPopulationInOrder = async (req, res, next) => {
//     const { order } = req.params;
//     try {
//         if (order) {
//             const orderedInfo = await getPopulationOrder(order);
//             orderedInfo !== undefined
//                 ? res.send(orderedInfo)
//                 : res.status(400).json({message: 'Error could not order successfully'});
//         }
//     }
//     catch (e) {
//         next(e)
//     }
// }

module.exports = {
    getCountries,
    getCountry,
    getContinent,
    // getPopulationInOrder
}