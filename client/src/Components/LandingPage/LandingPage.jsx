import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./LandingPage.module.css";
import video from '../../Videos/Video1.mp4';

export default function LandingPage() {
    return (
        <div className={styles.conteinerLandingPage}>
            <video muted autoPlay loop className={styles.LandingPageVideo}>
                <source src={video}></source>
            </video>
            <div className={styles.infoLandingPage}>
                <h1>Exploring the Countries</h1>
                <Link to='/Home'>
                    <button>Discover</button>
                </Link>
                <p>Developed by Juan Jose Horisberger</p>
            </div>
        </div>
    )
}