import React, { useState } from "react";
import styles from './Pagination.module.css'

export default function Pagination({ countriesPerPage, allCountries, pagination, currentPage, setCurrentPage }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allCountries / countriesPerPage); i++) { //250 / 10 = 25
        pageNumbers.push(i);
    }

    //const [disabledPrevious, setDisabledPrevious] = useState(false);
    //const [disabledNext, setDisabledNext] = useState(false);
    const [input, setInput] = useState(1)

    function previousAndNext(e) {
        e.preventDefault();
        e.target.id === "previous"
            ? currentPage > 1 && setCurrentPage(currentPage - 1)
            : currentPage < pageNumbers.length && setCurrentPage(currentPage + 1)
        if (e.target.id === 'previous') {
            if (input > 1) {
                setInput(input - 1);
            }
        }
        else {
            if (input < 25) {
                setInput(input + 1)
            }
            //input + 1 > 1 && setDisabledPrevious(true) //SEGUIR VIENDO ESTO QUE CASI LO TENEMOS
        }
    }

    function handleChange(e){
       
    }

    // const nextPage = () => {
    //     currentPage < pageNumbers.length && setInput(input + 1);
    //     currentPage < pageNumbers.length && setCurrentPage(currentPage + 1)
    // }

    // const previousPage = () => {
    //     currentPage > 1 && setInput(input - 1)
    //     currentPage > 1 && setCurrentPage(currentPage - 1)
    // }

    return (
        <div>
            <nav>
                <ul className={styles.containerUl}>
                    {/* <button id="previous" onClick={(e) => previousAndNext(e)}>Previous</button> */}
                    {/* <img
                        id="previous" onClick={(e) => previousAndNext(e)}
                        src="https://img.icons8.com/ios-glyphs/50/000000/circled-chevron-left.png"
                        className={styles.buttonPrevious}
                    /> */}
                    <img
                        id="previous"
                        className={`${styles.buttonPrevious}`} //${disabledPrevious && styles.open}
                        onClick={(e) => previousAndNext(e)}
                        src="https://img.icons8.com/ios-glyphs/50/000000/circled-chevron-left.png"

                    />


                    {/* {pageNumbers?.map((number) => {
                        return (
                            <li key={number}>
                                <button onClick={() => pagination(number)}>{number}</button>
                            </li>
                        );
                    })} */}

                    <input name="page" autoComplete="off" value={input} disabled onChange={(e) => handleChange(e)}/>
                    <p>de {pageNumbers.length}</p>


                    <img
                        id="next" onClick={previousAndNext}
                        src="https://img.icons8.com/ios-glyphs/50/000000/circled-chevron-right.png"
                        className={styles.buttonNext}
                    />

                    {/* <img
                        id="next" onClick={(e) => previousAndNext(e)}
                        src="https://img.icons8.com/ios-glyphs/50/000000/circled-chevron-right.png"
                        className={styles.buttonNext}
                    /> */}
                </ul>
            </nav>
        </div>
    );
}
