import React from 'react'
import Card from '../card/Card'
import styles from './home.module.css'
import {connect} from 'react-redux'
import charslogo from '../../assets/charslogo.png'
import {nextCharacterAction, addToFavouritesAction} from "../../redux/charsDuck"

function Home({chars, favs, nextCharacterAction, addToFavouritesAction}) {

    function renderCharacter() {
    
        const charsnorepeat = chars.filter(({ char_id: id1 }) => !favs.some(({ char_id: id2 }) => id2 === id1))
        let char = charsnorepeat[0]
        return (
            <Card
            rightClick = { addFav }
            leftClick = { nextCharacter }
            {...char}
            />
        )
    }

    function nextCharacter(){
        nextCharacterAction()
    }

    function addFav(){
        addToFavouritesAction()
    }

    return (
        <div className={styles.container}>
            <img className={styles.charslogo} src= {charslogo} alt=""/>
            <h2 className={styles.title}>Choose your favourite Breaking Bad characters</h2>
            <div>
                {renderCharacter()}
            </div>
        </div>
    )
}

function mapStateToProps(state){   
       return {
           chars: state.characters.chars,
           favs: state.characters.favourites,
       } 
}


export default connect(mapStateToProps, {nextCharacterAction, addToFavouritesAction})(Home)
