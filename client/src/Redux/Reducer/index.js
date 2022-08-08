import {
    FILTER_BY_ACTIVITY,
    GET_ALL_ACTIVITY,
    GET_ALL_COUNTRIES,
    FILTER_BY_CONTINENT,
    ORDER_BY_POPULATION,
    ORDER_BY_NAME,
    COUNTRY_BY_NAME,
    COUNTRY_BY_ID,
    POST_ACTIVITY,
    DELETE_ACTIVITY,
    PUT_ACTIVITY
} from "../Actions/ActionsTypes";

const initialState = {
    countries: [],
    allCountries: [],
    activities: [],
    countryDetail: []
}

const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ALL_COUNTRIES:
            return {
                ...state,
                countries: payload,
                allCountries: payload
            }
        case COUNTRY_BY_NAME: {
            return {
                ...state,
                countries: payload
            }
        }
        case COUNTRY_BY_ID: {
            return {
                ...state,
                countryDetail: payload
            }
        }
        case GET_ALL_ACTIVITY:
            return {
                ...state,
                activities: payload
            }
        case FILTER_BY_ACTIVITY: {
            return {
                ...state,
                countries: payload === 'All'
                    ? state.allCountries
                    : payload
            }
        }
        case FILTER_BY_CONTINENT: {
            return {
                ...state,
                countries: payload === 'All'
                    ? state.allCountries
                    : payload
            }
        }
        case ORDER_BY_POPULATION: {
            const countriesMap = state.countries.map(e => e);
            const orderedPopulation = payload === 'asc'
                ? countriesMap.sort(function (a, b) {
                    if (a.population > b.population) return 1;
                    if (a.population < b.population) return -1;
                    return 0;
                })
                : countriesMap.sort(function (a, b) {
                    if (a.population > b.population) return -1;
                    if (a.population < b.population) return 1;
                    return 0;
                })
            return {
                ...state,
                countries: payload === 'All'
                    ? state.allCountries
                    : orderedPopulation
            }
        }
        case ORDER_BY_NAME: {
            const countries = state.countries.map(e => e);
            const countriesOrdered = payload === 'asc'
                ? countries.sort(function (a, b) {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                })
                : countries.sort(function (a, b) {
                    if (a.name > b.name) return -1;
                    if (a.name < b.name) return 1;
                    return 0;
                })
            return {
                ...state,
                countries: payload === 'All'
                    ? state.allCountries
                    : countriesOrdered
            }
        }
        case POST_ACTIVITY:
            return {
                ...state
            }
        case DELETE_ACTIVITY:
            return {
                ...state
            }
        case PUT_ACTIVITY:
            return {
                ...state
            }
        default:
            return { ...state };
    }
}

export default rootReducer;