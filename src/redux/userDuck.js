import {loginWithGoogle, logOutGoogle} from '../firebase'
import {retreiveFavAction} from './charsDuck'


//////CONSTANTS/////
let initialData= {
    loggedIn: false,
    fetching: false
}

let LOGIN = "LOGIN"
let LOGIN_SUCCESS = "LOGIN_SUCCESS"
let LOGIN_ERROR = 'LOGIN_ERROR'

let LOG_OUT = "LOG_OUT"

/////REDUCER/////
export default function reducer(state = initialData, action){
    switch (action.type){
        case LOGIN: 
            return {...state, fetching: true}
        case LOGIN_ERROR:
            return {...state, fetching: false, error: action.payload}
        case LOGIN_SUCCESS:
            return {...state, fetching: false, ...action.payload, loggedIn: true}
        case LOG_OUT:
            return {...initialData}
        default:
            return state
    }

}

function saveStorage(storage){
    localStorage.storage = JSON.stringify(storage)
}

//////ACTIONS/////
export let doGoogleLoginAction = () => (dispatch, getState) => {
    dispatch({
        type: LOGIN
    })
    return loginWithGoogle()
        .then(user =>{
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL
                }
            })
            saveStorage(getState())
            retreiveFavAction()(dispatch, getState)
        })
        .catch(e=>{
            console.log(e)
            dispatch({
                type: LOGIN_ERROR,
                payload: e.message
            })

        })
}

export let restoreSessionAction = () => dispatch => {
    let userstored = localStorage.getItem('storage')
    userstored = JSON.parse(userstored)
    if(userstored && userstored.user){
        dispatch ({
            type: LOGIN_SUCCESS,
            payload: userstored.user
        })
    }
}

export let logOutAction = () => (dispatch, getState) => {
    logOutGoogle()
    dispatch({
        type: LOG_OUT
    })
    localStorage.removeItem('storage')
}

