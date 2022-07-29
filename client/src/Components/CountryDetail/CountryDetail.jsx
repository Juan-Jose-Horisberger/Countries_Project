import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getCountriesById } from '../../Redux/Actions';
import styles from './CountryDetail.module.css'

export default function CountryDetail() {
    const { id } = useParams()
    const dispatch = useDispatch();
    const country = useSelector(state => state.countryDetail);
    const [loaded, setLoaded] = useState(false);

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
                                    <Link to='/Home'><h2>Home</h2></Link>
                                </div>
                                <h1>{country[0].name}</h1>
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
                                                        ? <h2>Activity</h2>
                                                        : <h2>Activities</h2>
                                                }
                                            </div>
                                            <div className={styles.algo}>
                                                {
                                                    country[0].activities?.map(obj => {
                                                        return (
                                                            <div>
                                                                <p>Name activity: {obj.name}</p>
                                                                <p>Difficult: {obj.difficult}</p>
                                                                <p>Duration: {obj.duration}</p>
                                                                <p>Season: {obj.season}</p>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )
                                    : (
                                        <p>There are no tourist activities</p>
                                    )
                            }
                        </div>
                    </div>

                ) : (<p>Louding...</p>)
            }

        </div>
    )
}