import React from 'react'
import styles from './login.module.css'
import {connect} from 'react-redux'
import {doGoogleLoginAction, logOutAction} from "../../redux/userDuck"
import logo from '../../assets/logo.png'
import FontAwesome from 'react-fontawesome'
import gloader from '../../assets/gloader.gif'
function LoginPage({fetching, loggedIn, logOutAction, doGoogleLoginAction, email}) {

    function doLogin(){
        doGoogleLoginAction()
    }

    function logOut(){
        logOutAction()
    }

    if(fetching) 
        return <img className={styles.loader} src= {gloader} alt=""/>

    return ( 
        <div className={styles.container}>
            <img className={styles.logo} src= {logo} alt=""/>
            {loggedIn ? <h1 className={styles.welcome}>Thanks for stopping by, {email}!<br></br><br></br>Now you can access the App     <FontAwesome name="check-circle" style={{color:'green'}}/></h1> 
            : 
            <h1 className={styles.welcome}>Welcome! <br></br>Please login to access the App</h1>
            }
            
            {loggedIn ? <button onClick ={logOut}>Log out</button>
            : 
            <button onClick = {doLogin}><FontAwesome name="google"/> - Login with Google</button>}
        </div>
    )
}

function mapStateToProps({user:{fetching, loggedIn, email}}){ 
    return {
        fetching,
        loggedIn,
        email
    }
}

export default connect(mapStateToProps, {doGoogleLoginAction, logOutAction})(LoginPage)