import React from "react";
import styles from './Pagination.module.css'

export default function Pagination({ countriesPerPage, allCountries, pagination }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allCountries / countriesPerPage); i++) { //250 / 10 = 25
        pageNumbers.push(i);
    }

    return (
        <div>
            <nav>
                <ul className={styles.containerUl}>
                    {pageNumbers?.map((number) => {
                        return (
                            <li key={number}>
                                <button onClick={() => pagination(number)}>{number}</button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}
