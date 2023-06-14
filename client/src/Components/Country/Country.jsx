import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Country.module.css';

export default function Country({ name, img, continents, id }) {
  return (
    <div className={styles.containerCountry}>
      <Link to={`/CountryDetail/${id}`}>
        <h1>{name}</h1>

        <img src={img} alt="Image" />
        <p className='text-light'>{continents}</p>
      </Link>
    </div>
  )
}