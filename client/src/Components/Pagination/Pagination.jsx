import React, { useState } from "react";
import styles from './Pagination.module.css'

export default function Pagination({ countriesPerPage, allCountries, currentPage, setCurrentPage }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allCountries / countriesPerPage); i++) { //250 / 10 = 25
        pageNumbers.push(i);
    }

    const [input, setInput] = useState(1);

    if(pageNumbers === 1){
        setInput(1);
    }

    function previousAndNext(e) {
        e.preventDefault();
        e.target.id === "previous"
            ? currentPage > 1 && (setCurrentPage(currentPage - 1) === undefined && setInput(input - 1))
            : currentPage < pageNumbers.length && (setCurrentPage(currentPage + 1) === undefined && setInput(input + 1))
    }
    return (
        <div>
            <nav>
                <ul className={styles.containerUl}>
                    <img
                        id="previous"
                        className={`${styles.buttonPrevious}`} //${disabledPrevious && styles.open}
                        onClick={(e) => previousAndNext(e)}
                        src="https://img.icons8.com/ios-glyphs/50/000000/circled-chevron-left.png"
                        alt="Imagen previous"

                    />

                    <input name="page" autoComplete="off" value={input} disabled />
                    <p>de {pageNumbers.length}</p>


                    <img
                        id="next"
                        className={styles.buttonNext}
                        onClick={previousAndNext}
                        src="https://img.icons8.com/ios-glyphs/50/000000/circled-chevron-right.png"
                        alt="Imagen next"
                    />
                </ul>
            </nav>
        </div>
    );
}
