import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import {
   getCountries,
   getActivities,
   filterCountriesByActivity,
   filterCountriesByContinent,
   orderByPopulation,
   orderByName,
} from '../../Redux/Actions/index';
import Country from '../Country/Country';
import Pagination from '../Pagination/Pagination';
import styles from './Home.module.css';

export default function Home() {
   const dispatch = useDispatch()

   const allCountries = useSelector(state => state.countries);
   const allActivities = useSelector(state => state.activities);

   const [disabled, setDisabled] = useState(false);
   const [isToggle, setIsToggle] = useState(false);
   const [isClosedFilter, setIsClosedFilter] = useState(false);

   //<------Order----->
   const [order, setOrder] = useState("");

   //<-----Pagination----->
   //El estado locar currentPage hacemos referencia a nuestra pagina actual, decimos que tendra como valor 1 porque siempre empieza en la primer pagina.
   const [currentPage, setCurrentPage] = useState(1);

   //En el estado countriesPerPage, almacename cuantos paises quiero por pagina
   const [countriesPerPage, setCountriesPerPage] = useState(10);
   const indexOfLastCountry = currentPage * countriesPerPage; //1 * 10 = 10
   const indexOfFirstCountry = indexOfLastCountry - countriesPerPage; // 10 - 10 = 0

   //currentRecipes tendra las paises de la pagina actual
   const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry);
   const [loaded, setLoaded] = useState(false);

   const pagination = (pageNumber) => { //Nos va a ayudar a renderizar
      setCurrentPage(pageNumber);
   }

   async function getData() {
      if (allCountries.length > 0) {
         setLoaded(true);
         return;
      }
      else {
         dispatch(getCountries())
            .then(res => res && setLoaded(true))
            .catch(err => console.log(err))
      }
   }

   useEffect(async () => {
      getData()
      if (allActivities.length > 0) {
         return;
      }
      await dispatch(getActivities())
   }, [])

   function handleClick(e) {
      // e.preventDefault();
      // dispatch(getCountries());
      // dispatch(getActivities());
      // window.scrollTo(0, 0); //Para cuando se haga un refresh
      window.location.reload(false)
   }

   function handleFilterType(e) {
      dispatch(filterCountriesByActivity(e.target.value))
      setCurrentPage(1)
   }

   function handleFilterContinent(e) {
      dispatch(filterCountriesByContinent(e.target.value));
      setCurrentPage(1);
   }

   function handlerSortPopulation(e) {
      dispatch(orderByPopulation(e.target.value));
      setCurrentPage(1)
      setOrder(e.target.value)
   }

   function handlerSortName(e) {
      dispatch(orderByName(e.target.value));
      setCurrentPage(1)
      setOrder(e.target.value)// Modificamos el estado order, para que se vuelva a renderizar mi componente
   }

   function handleClickEvent(e) {
      e.preventDefault()
      isToggle ? setIsToggle(false) : setIsToggle(true);
   }

   function handleClickEventFilter(e) {
      e.preventDefault()
      isClosedFilter ? setIsClosedFilter(false) : setIsClosedFilter(true);
   }

   useEffect(() => { //Ver si lo dejo o no
      setIsClosedFilter(true);
   }, [])

   useEffect(() => {
      window.scrollTo(0, 0);
   }, [currentPage]);


   return (
      <div className={styles.container}>
         <div className={styles.containerHome}>

            <div className={styles.containerTitle}>
               <Link to='/' className={styles.link}>
                  <h1>COUNTRIES APP</h1>
               </Link>
            </div>


            <div className={styles.containerButton}>
               <button
                  className={`${styles.hamburger} ${isToggle && styles.open}`} onClick={(e) => handleClickEvent(e)}>
                  <p className={styles.line}></p>
                  <p className={styles.line}></p>
                  <p className={styles.line}></p>
               </button>
            </div>

            <div className={`${styles.containerNavegarion} ${isToggle && styles.open}`}>
               <ul>
                  <Link to='/About' className={styles.link}>
                     <p className='m-0'>About</p>
                  </Link>
                  <li className={styles.list}>
                     <p className='m-0' onClick={(e) => { handleClick(e) }}>Reload page</p>
                  </li>
                  <Link to='/CreateActivity' className={styles.link}>
                     <p className='m-0'>Create tourist activity</p>
                  </Link>
               </ul>
               <SearchBar
                  setCurrentPage={setCurrentPage}
               />
            </div>
         </div>


         {
            loaded ? (
               <div>
                  <div className={`${styles.containerFilter} ${isClosedFilter && styles.closed}`}>
                     <h2>Filters</h2>
                     <div className={`${styles.containerButtonClosed} ${isClosedFilter && styles.closed}`}>
                        <button onClick={(e) => handleClickEventFilter(e)} className={styles.buttonFilter}>X</button>
                     </div>

                     <div className={`${styles.containerSelects} ${isClosedFilter && styles.closed}`}>
                        <div className={styles.containerSelect1}>

                           <h3>FILTER BY CONTINENT</h3>
                           <select onChange={(e) => handleFilterContinent(e)} onFocus={() => setDisabled(true)}>
                              <option disabled={disabled} >Continents</option>
                              <option value="All">All</option>
                              <option value="Africa">Africa</option>
                              <option value="South America">South America</option>
                              <option value="Asia">Asia</option>
                              <option value="North America">North America</option>
                              <option value="Oceania">Oceania</option>
                              <option value="Antarctica">Antarctica</option>
                           </select>
                        </div>

                        <div className={styles.containerSelect2}>
                           <h3>SORT BY POPULATION OR NAME</h3>
                           <div>
                              <select onChange={(e) => handlerSortName(e)} onFocus={() => setDisabled(true)}>
                                 <option disabled={disabled}>Sort by name</option>
                                 <option value='All'>All</option>
                                 <option value='asc'>A-Z</option>
                                 <option value='desc'>Z-A</option>
                              </select>
                           </div>
                           <div>
                              <select onChange={(e) => handlerSortPopulation(e)} onFocus={() => setDisabled(true)}>
                                 <option disabled={disabled}>Sort by population</option>
                                 <option value='All'>All</option>
                                 <option value='asc'>Lower population</option>
                                 <option value='desc'>Higher population</option>
                              </select>
                           </div>

                        </div>

                        <div className={styles.containerSelect3}>
                           <h3>FILTER BY ACTIVITY</h3>
                           <select onChange={(e) => handleFilterType(e)} onFocus={() => setDisabled(true)}>
                              <option disabled={disabled}>Activities</option>
                              {
                                 !allActivities.length
                                    ? <option value="All" style={{ display: 'none' }}>All</option>
                                    : <option value="All" style={{ display: 'block' }}>All</option>
                              }
                              {
                                 allActivities.length
                                    ? allActivities.map((type) => {
                                       return (
                                          <option value={type.name} key={type.id}>
                                             {type.name}
                                          </option>
                                       );
                                    })
                                    : <option disabled>There are no tourist activities</option>
                              }
                           </select>
                        </div>

                     </div>
                     <button
                        onClick={(e) => handleClickEventFilter(e)}
                        className={`${styles.buttonFilters} ${isClosedFilter && styles.open}`}>{'>'}
                     </button>
                  </div>

                  {currentCountries.length ? (
                     <div className={styles.containerCountries}>
                        {
                           currentCountries && currentCountries.map(e => {
                              return (
                                 <div key={e.id} className={styles.divsCountries}>
                                    <Country
                                       id={e.id}
                                       name={e.name}
                                       img={e.img}
                                       continents={e.continents}
                                    />
                                 </div>
                              );
                           })
                        }
                     </div>
                  ) : (
                     <p>No countries found.</p>
                  )}

                  <Pagination
                     countriesPerPage={countriesPerPage}
                     allCountries={allCountries.length}
                     pagination={pagination}
                     currentPage={currentPage}
                     setCurrentPage={setCurrentPage}
                  />

               </div>
            ) : (
               <div
                  className={`d-flex justify-content-center flex-column ${styles.container_loading}`}
               >
                  <p>Cargando...</p>
                  <div
                     className={`spinner-border ${styles.loading}`}
                     style={{ width: "4rem", height: "4rem" }}
                     role="status"
                  >
                     <span className="visually-hidden"></span>
                  </div>
               </div>
            )
         }

      </div>
   )
}