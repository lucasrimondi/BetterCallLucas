import React from 'react'
import styles from './card.module.css'
import FontAwesome from 'react-fontawesome'
import PropTypes from 'prop-types'
import cardloader from '../../assets/cardloader.gif'


export default function Card({
    name, img, rightClick, leftClick, hide, nickname, birthday, occupation, portrayed
}) {


    return (
        <div className={styles.container}>
            <div className={styles.card}>
                {hide && <div className={styles.ribbon}><span>&#9733;</span></div>}
                <img alt="img" src={img}/>
                <p className={styles.name}>
                <b>{name}</b>
                </p>
                {hide ? <div className={styles.chardata}>
                        <p><b>Nickname: </b>  {nickname}</p>
                        <p><b>Birthday: </b>  {birthday}</p>
                        <p><b>Occupation: </b>  {occupation[0]}</p>
                        <p><b>Portrayed by: </b>  {portrayed}</p>
                        </div> 
                        : 
                        ""
                }
                {!hide && <div className={styles.actions}>
                    <div
                        onClick={leftClick}
                        className={styles.left}>
                        <FontAwesome
                            name="arrow-right"
                            size="2x"
                        />
                    </div>
                    <div
                        onClick={rightClick}
                        className={styles.right}>
                        <FontAwesome
                            name="heart"
                            size="2x"
                        />
                    </div>
                </div>
                }
            </div>
        </div>
    )
    
    
}

Card.propTypes = {
    name: PropTypes.string.isRequired,
    img: PropTypes.string,
    leftClick: PropTypes.func,
    rightClick: PropTypes.func,
    nickname: PropTypes.string,
    birthday: PropTypes.string,
    occupation: PropTypes.array,
    portrayed: PropTypes.string
}

Card.defaultProps = {
    name: "",
    img: cardloader,
}
