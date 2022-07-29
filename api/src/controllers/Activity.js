const { Activity, Country } = require('../db');
const { json } = require('express');
const { getFilteredActivity } = require('./utils');

const getActivities = async (req, res, next) => {
    try {
        const allActivities = await Activity.findAll({
            include: [Country]
        });
        allActivities.length
            ? res.send(allActivities)
            : res.status(400).json({ message: 'Error reading database' })
    } catch (e) {
        next(e);
    }
}

const addActivities = async (req, res, next) => {
    const {
        name,
        difficult,
        duration,
        season,
        Countries
    } = req.body;

    if (!typeof name === 'string')
        res.status(400).json({ message: 'Unsupported data type error, must be string' })

    if (
        !difficult === '1'
        || !difficult === '2'
        || !difficult === '3'
        || !difficult === '4'
        || !difficult === '5'
    )
        res.status(400).json({ message: 'Error the difficulty must be from 1 to a maximum of 5' })


    if (!typeof duration === 'number')
        res.status(400).json({ message: 'Unsupported data type error, must be number' })

    if (
        !season === 'Summer'
        || !season === 'Fall'
        || !season === 'Spring'
        || !season === 'Winter'
    )
        res.status(400).json({ message: 'Invalid entered data error, it only has these options (Summer, Fall, Spring, Winter)' })


    try {
        //newActivity sera la respuesta de que si existe estos datos en la tabla los devuelve,
        //Sino los crea. y boolean se almacenara el valor boleano, si se creo o no.
        const [newActivity, boolean] = await Activity.findOrCreate({
            where: {
                name: name,
                difficult: difficult,
                duration: duration,
                season: season
            },
            defaults: {
                name,
                difficult,
                duration,
                season
            }
        });

        if (boolean) {
            Countries.map(async (c) => { //Countries = ['Argentina', 'Peru', 'Bolivia']
                const findedCountry = await Country.findOne({
                    where: {
                        name: c
                    }
                })
                //res.send(findedCountry)
                await newActivity.addCountry(findedCountry) //Se genera la relacion
            })

            if (newActivity) res.json({ message: "successfully created", data: newActivity });
            else res.json({ message: "Error could not create the tourist activity" });
        }
        else {
            res.json({ message: "Error this tourist activity already exists" });
        }


    }
    catch (e) {
        next(e)
    }
}

//Ruta de filtrar paises por actividad turistica 
const getTouristActivity = async (req, res, next) => {
    const { activity } = req.params;
    try {
        if(activity){
            const allCountries = await getFilteredActivity(activity);
            allCountries.length 
            ? res.send(allCountries)
            : res.status(400).json({message: 'No countries associated with this activity were found'});
        }
    }
    catch (e) {
        next(e);
    }
}

module.exports = {
    getActivities,
    addActivities,
    getTouristActivity
}