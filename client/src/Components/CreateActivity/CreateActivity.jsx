import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getCountries, postActivity } from '../../Redux/Actions';
import styles from './CreateActivity.module.css'
import { validate } from './Validate.js'

export default function CreateActivity() {
    const history = useHistory();
    const dispatch = useDispatch()
    const countries = useSelector(state => state.countries);

    const [input, setInput] = useState({
        name: "",
        difficult: "",
        duration: 0,
        season: "",
        Countries: ''
    })


    const [disabled, setDisabled] = useState(false)
    const [selectedCountries, setSelectedCountries] = useState([]); //Paises relacionados a esta act
    let [countryCounter, setCountryCounter] = useState(0); //Contador de cada pais

    const [errorsExist, setErrorsExist] = useState(true); // Este estado local habilita el submit

    // const [notifications, setNotifications] = useState({ success: "", });

    const [error, setError] = useState({}); //estado maneja errores

    function handleChange(e) {
        const objError = validate({ ...input, [e.target.name]: e.target.value });
        setError(objError)
        //console.log(objError)

        setInput({
            ...input,
            [e.target.id]: e.target.value
        })

    }

    function handleSelectedCountries(e) {
        const objError = validate({ ...input, [e.target.name]: e.target.value });
        setError(objError)
        //console.log(objError)

        setInput({
            ...input,
            [e.target.id]: e.target.value
        })

        const allDescriptions = selectedCountries.map(country => country.description);
        // console.log(allDescriptions)
        const findCountry = allDescriptions.filter(description => description === e.target.value); //Si hay un pais igual, a otro 

        //pais ya existente en allDescriptions filtramelo en findCountry

        if (findCountry.length) {
            alert("Please do not repeat the country.") //Intentar que esto salga como un error
            setInput({
                ...input,
                Countries: ""
            })
        }
        if (e.target.value && !findCountry.length) {
            setCountryCounter(++countryCounter);
            setSelectedCountries([
                ...selectedCountries,
                { number: countryCounter, description: e.target.value },
            ]);
        }

        setTimeout(() => {
            console.log(e.target.value = 'Selected');
        }, 300);
    }


    function deleteCountry(countryNumberDelete) {
        let filteredCountries = selectedCountries.filter(   // [pais1, pais2, pais3, pais4, pais5] = 5
            //    1      2       3      4      5
            (el) => el.number !== countryNumberDelete //countries  6 -------------- countryNumberDelete = 3 - 1 = 3
        );//                                                                                                i

        //Este for nos sirve para que se re acomoden los numeros de los countries al ser eliminado alguno

        // i = 
        for (let i = countryNumberDelete - 1; i < filteredCountries.length; i++) {
            if (filteredCountries[i]) {
                filteredCountries[i].number = filteredCountries[i].number - 1;
            }
        }
        setCountryCounter(--countryCounter);
        setSelectedCountries(filteredCountries);
    }

    function errorExist() {
        if (
            input.name &&
            input.difficult &&
            input.duration >= 1 &&
            input.season &&
            selectedCountries.length > 0
        ) {
            setErrorsExist(false)
        }
        else setErrorsExist(true)
    }


    function handleSubmit(e) {
        e.preventDefault();
        if (
            input.name &&
            input.difficult &&
            input.duration >= 1 &&
            input.season &&
            selectedCountries.length > 0
        ) {
            const selected_Countries = selectedCountries.map(e => e.description)
            input.Countries = selected_Countries;

            const Activity = {
                name: input.name,
                difficult: input.difficult,
                duration: input.duration,
                season: input.season,
                Countries: input.Countries
            }

            // Promise.all([
            //     dispatch(postActivity(Activity)),
            //     dispatch(getActivities())
            // ])

            // dispatch(postActivity(Activity))

            Promise.all([
                dispatch(postActivity(Activity)),
                dispatch(getActivities())
            ])
                .then(alert("Activity created."))
                .catch(err => console.log(err));

            setInput({
                name: "",
                difficult: "",
                duration: 0,
                season: "",
                Countries: ''
            })

            history.push('/Home');
        }
    }

    useEffect((e) => {
        errorExist()
    }, [errorExist])

    useEffect((e) => {
        if (countries.length > 0) {
            return;
        }
        dispatch(getCountries())
    })

    return (
        <div className={styles.container}>
            <div className={styles.containerInfo}>
                <div>
                    <h1>Create Activity</h1>
                    <div className={styles.containerHome2}>
                        <Link to='/Home'>
                            <p>Home</p>
                        </Link>
                    </div>
                    <p>
                        Hello! In this section you will be able to create tourist activities and assign them to different countries.
                        After you have already created them you will be able to see them in the home page and filter by the countries where they take place.
                    </p>
                </div>
            </div>
            <div className={styles.containerForm}>
                <div className={styles.containerHome}>
                    <Link to='/Home'>
                        <p>Home</p>
                    </Link>
                </div>
                <div className={styles.container2}>
                    <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
                        <div className={styles.containerNrm1}>
                            <div className={styles.containerInputName}>
                                <label>Name: </label>
                                <input
                                    id='name'
                                    type="text"
                                    placeholder='Name of the activity'
                                    name='name'
                                    autoComplete='off'
                                    value={input.name}
                                    onChange={(e) => handleChange(e)}
                                    className={error.name && styles.inputErrorBorder}
                                />
                            </div>
                            {
                                error.name && <span className={styles.inputError}>{error.name}</span>
                            }
                        </div>

                        <div className={styles.containerNrm2}>
                            <div className={styles.containerInputDificult}>
                                <label>Difficult: </label>
                                <select
                                    id='difficult'
                                    onChange={(e) => handleChange(e)}
                                    //Sin este : null me tira un warning
                                    //Warning: Advertencia: se recibió `falso` para un atributo no booleano `className`.
                                    className={(error.difficult && input.difficult.length < 1) ? styles.inputErrorBorder : null}
                                    onFocus={(e) => setDisabled(true)}>
                                    <option disabled={disabled}>Select difficulty</option>
                                    <option value='1' name='difficult'>1</option> {/*QUEDA PENDIENTE*/}
                                    <option value='2' name='difficult'>2</option>
                                    <option value='3' name='difficult'>3</option>
                                    <option value='4' name='difficult'>4</option>
                                    <option value='5' name='difficult'>5</option>
                                </select>
                            </div>
                            {
                                !input.difficult.length && <span className={styles.inputError}>{error.difficult}</span>
                            }
                        </div>

                        <div className={styles.containerNrm3}>
                            <div className={styles.containerInputDuration}>
                                {console.log(input.duration)}
                                <label>Duration: </label>
                                <input
                                    id='duration'
                                    type="number"
                                    min="0"
                                    max="10"
                                    name='duration'
                                    value={input.duration}
                                    className={error.duration && styles.inputErrorBorder}
                                    onChange={(e) => handleChange(e)}
                                //
                                />
                                <span>Hs</span>
                            </div>
                            {
                                error.duration && <span className={styles.inputError}>{error.duration}</span>
                            }
                        </div>

                        <div className={styles.containerNrm4}>
                            <div className={styles.containerInputSeason}>
                                <label>Season: </label>
                                <select
                                    className={(error.season && input.season.length < 1) ? styles.inputErrorBorder : null}
                                    onChange={handleChange}
                                    id="season"
                                    onFocus={(e) => setDisabled(true)}>
                                    <option value="Selected" disabled={disabled}>{"Select season"}</option>
                                    <option value="Summer">Summer</option>
                                    <option value="Fall">Fall</option>
                                    <option value="Winter">Winter</option>
                                    <option value="Spring">Spring</option>
                                </select>
                            </div>
                            {
                                !input.season.length && <span className={styles.inputError}>{error.season}</span> //Lo dejamos en span porque sino ocupa espacio en el dom.
                            }
                        </div>

                        <div className={styles.containerNrm5}>
                            <div className={styles.containerInputCountries}>
                                <label>Countries: </label>
                                <select
                                    className={(error.Country && selectedCountries.length < 1) ? styles.inputErrorBorder : null}
                                    onChange={(e) => handleSelectedCountries(e)}
                                    id="Countries"
                                    onFocus={(e) => setDisabled(true)}>
                                    <option value="Selected" disabled={disabled}>{"Select country"}</option>
                                    {
                                        countries.length && countries.map(obj => {
                                            return (
                                                <option key={obj.id} defaultValue={obj.name}>
                                                    {obj.name}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            {
                                !selectedCountries.length && <span className={styles.inputError}>{error.Country}</span>
                            }
                            <div className={styles.containerCountriesSelected}>{/*ACA ME QUEDE*/}
                                {
                                    selectedCountries?.map(e => (
                                        <div key={e.number}>
                                            <span>{e.number}.</span>
                                            <span>{e.description}</span>
                                            <button
                                                type='button'
                                                onClick={() => deleteCountry(e.number)}
                                            >X
                                            </button>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        <div className={styles.containerSubmit}>
                            <button
                                type="submit"
                                disabled={errorsExist}
                                className={`${styles.button} ${errorsExist !== true && styles.open}`}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}