import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getCountriesById, deleteActivity, getCountries, getActivities } from '../../Redux/Actions';
import styles from './CountryDetail.module.css'

export default function CountryDetail() {
    const { id } = useParams()
    const dispatch = useDispatch();
    const country = useSelector(state => state.countryDetail);
    const [loaded, setLoaded] = useState(false);

    function handleDeleteActivity(e, idAct) {
        e.preventDefault();
        dispatch(deleteActivity(idAct))
            .then(dispatch(getActivities()))
            .catch(err => console.log(err + 'entra aca? xd'))
    }

    useEffect(() => {
        dispatch(getCountriesById(id))
            .then(res => res && dispatch(getCountries()))
            .catch(err => console.log(err))
    }, [handleDeleteActivity])

    useEffect(async (e) => {
        await dispatch(getCountriesById(id))
        setLoaded(true);
    }, [dispatch]);

    return (
        <div>
            {
                loaded ? (
                    <div className={styles.container}>
                        <div className={styles.containerNum1}>
                            <div className={styles.containerHomeAndName}>
                                <div>
                                    <Link className='d-flex mt-1' to='/Home'>Home</Link>
                                </div>
                                <h1 className='text-light'>{country[0].name}</h1>
                            </div>

                            <div className={styles.dataContainer}>
                                <div className={styles.containerImg}>
                                    <img src={country[0].img} alt="image" />
                                </div>
                                <div className={styles.containerInfo}>
                                    <p>Id: {country[0].id}</p>
                                    <p>Continent: {country[0].continents}</p>
                                    <p>Capital: {country[0].capital}</p>
                                    <p>Subregion: {country[0].subregion}</p>
                                    <p>Area: {country[0].area} km2</p>
                                    <p>Population: {country[0].population}</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.containerNum2}>
                            {
                                country[0].activities.length >= 1
                                    ? (
                                        <div className={styles.containerInfoActivity}>
                                            <div className={styles.containerTitle}>
                                                {
                                                    country[0].activities.length === 1
                                                        ? <h2 className='text-light'>Activity</h2>
                                                        : <h2 className='text-light'>Activities</h2>
                                                }
                                            </div>
                                            <div className={styles.containerActivity}>
                                                {
                                                    country[0].activities?.map((obj, i) => {
                                                        return (
                                                            <div key={i}>
                                                                <div className={styles.containerButtons}>
                                                                    <Link to={`/update-activity/${id}/${obj.id}`}>
                                                                        {/* <button>Update</button> */}
                                                                        Update
                                                                    </Link>
                                                                    <button onClick={(e) => handleDeleteActivity(e, obj.id)}>Delete</button>
                                                                </div>
                                                                <p className='text-light'>Name activity: {obj.name}</p>
                                                                <p className='text-light'>Difficult: {obj.difficult}</p>
                                                                <p className='text-light'>Duration: {obj.duration}</p>
                                                                <p className='text-light'>Season: {obj.season}</p>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )
                                    : (
                                        <p className='m-0 p-3'>There are no tourist activities</p>
                                    )
                            }
                        </div>
                    </div>

                ) : (<p>Louding...</p>)
            }

        </div>
    )
}