import React from 'react'
import styles from './favs.module.css'
import Card from '../card/Card'
import {connect} from 'react-redux'
import favslogo from '../../assets/favslogo.png'
import nofavs from '../../assets/nofavs.png'

function FavPage( {favs} ) {

    return (
        <div className={styles.container}>
            <img className={styles.favslogo} src= {favslogo} alt=""/>
            {favs.map((favs) =>(
                <Card hide {...favs} key = {favs.char_id}/>    
            ))}
            {!favs.length && 
                <div>
                <img className={styles.nofavs} src= {nofavs} alt=""/>
                <h2 className={styles.title}>You haven't picked your favourite characters yet!</h2>
                </div>
            }
        </div>
    )
}

function mapStateToProps({characters}){
    return {
        favs: characters.favourites
    }
}

export default connect(mapStateToProps)(FavPage) 


