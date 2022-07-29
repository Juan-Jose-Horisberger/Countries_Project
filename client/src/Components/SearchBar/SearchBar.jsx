import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCountriesByName } from '../../Redux/Actions';
import styles from './SearchBar.module.css'

export default function SearchBar() {
    const [country, setCountry] = useState('');

    const dispatch = useDispatch();

    function handleInputChange(e) {
        setCountry(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        const reg = /^[a-z ]+$/i;

        if(!country.length){
            alert(`This field is empty`);
            setCountry('');
            return;
        }
        if (!reg.test(country)) {
            alert(`${country} is not recognized as a valid country`)
            setCountry('');
            return;
        }
        
        dispatch(getCountriesByName(country));
        setCountry(''); //borderError
    }
    return (
        <div className={styles.container}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className={styles.containerForm}>
                    <input
                        id='searchBar'
                        type="text"
                        placeholder='Countries..'
                        value={country}
                        autoComplete='Off'
                        className={styles.inputSearchBar}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <button type='submit'>Search</button>
                </div>
            </form>
        </div>
    )
}