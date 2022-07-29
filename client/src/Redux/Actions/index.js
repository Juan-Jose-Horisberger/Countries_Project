import {
    GET_ALL_COUNTRIES,
    GET_ALL_ACTIVITY,
    COUNTRY_BY_NAME,
    COUNTRY_BY_ID,
    FILTER_BY_ACTIVITY,
    FILTER_BY_CONTINENT,
    ORDER_BY_POPULATION,
    ORDER_BY_NAME,
} from './ActionsTypes';
import axios from 'axios';

export function getCountries() {
    return async function (dispatch) {
        let countries = await axios.get('http://localhost:3001/Countries');
        return dispatch({
            type: GET_ALL_COUNTRIES,
            payload: countries.data,
        });
    };
}

export function getCountriesByName(country) {
    return async function (dispatch) {
        let countryFiltered = await axios.get(`http://localhost:3001/Countries?name=${country}`);
        return dispatch({
            type: COUNTRY_BY_NAME,
            payload: countryFiltered.data,
        });
    };
}

export function getCountriesById(id) {
    // console.log('ACTIONS ' + id)
    return async function (dispatch) {
        let countryFilteredForId = await axios.get(`http://localhost:3001/Countries/${id}`);
        return dispatch({
            type: COUNTRY_BY_ID,
            payload: countryFilteredForId.data,
        });
    };
}


export function getActivities() {
    return async function (dispatch) {
        let activities = await axios.get('http://localhost:3001/Activities')
        return dispatch({
            type: GET_ALL_ACTIVITY,
            payload: activities.data
        })
    }
}

export function filterCountriesByActivity(activity) {
    return async function (dispatch) {
        if (activity !== 'All') {
            let countriesFiltered = await axios.get(`http://localhost:3001/Activities/filterActivity/${activity}`)
            return dispatch({
                type: FILTER_BY_ACTIVITY,
                payload: countriesFiltered.data
            })
        }
        else {
            return dispatch({
                type: FILTER_BY_ACTIVITY,
                payload: 'All'
            })
        }
    }
}

export function filterCountriesByContinent(continent) {
    return async function (dispatch) {
        if (continent !== 'All') {
            let countriesFiltered = await axios.get(`http://localhost:3001/Countries/filterContinent/${continent}`)
            return dispatch({
                type: FILTER_BY_CONTINENT,
                payload: countriesFiltered.data
            })
        }
        else {
            return dispatch({
                type: FILTER_BY_CONTINENT,
                payload: 'All'
            })
        }
    }
}

// export function orderByPopulation(order) {
//     return async function (dispatch) {
//         if (order !== 'All') {
//             let orderedCountries = await axios.get(`http://localhost:3001/Countries/orderPopulation/${order}`)
//             return dispatch({
//                 type: ORDER_BY_POPULATION,
//                 payload: orderedCountries.data
//             })
//         }
//         else {
//             return dispatch({
//                 type: ORDER_BY_POPULATION,
//                 payload: 'All'
//             })
//         }
//     }
// }

export function orderByPopulation(payload) {
    return {
        type: ORDER_BY_POPULATION,
        payload
    }
}



export function orderByName(payload) {
    // console.log(order)
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function postActivity(data) {
    return async function (dispatch) {
        let newActivity = await axios.post('http://localhost:3001/Activities', data);
        return newActivity;
    }
}
