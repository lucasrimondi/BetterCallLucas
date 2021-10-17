import axios from 'axios'
import {updateDB, getFavsFromDB} from '../firebase'

//////////CONSTANTS/////////////
let initialData = {
    fetching: false,
    chars: [],
    current: {},
    favourites: []
}

let URL = "https://www.breakingbadapi.com/api/characters"

let GET_CHARACTERS = "GET_CHARACTERS"
let GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS"
let GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR"

let NEXT_CHARACTER = "NEXT_CHARACTER"

let ADD_TO_FAVOURITES = "ADD_TO_FAVOURITES"

let GET_FAVS = "GET_FAVS"
let GET_FAVS_SUCCESS = "GET_FAVS_SUCCESS"
let GET_FAVS_ERROR = "GET_FAVS_ERROR"

/////REDUCER/////
export default function reducer(state=initialData, action){
    switch(action.type){
        case GET_CHARACTERS:
            return {...state, fetching: true}
        case GET_CHARACTERS_ERROR:
            return {...state, fetching: false, error: action.payload}
        case GET_CHARACTERS_SUCCESS:
            return {...state, chars: action.payload, fetching: false}
        case NEXT_CHARACTER:
            return {...state, chars: action.payload}
        case ADD_TO_FAVOURITES:
            return {...state, ...action.payload}
        case GET_FAVS:
            return {...state, fetching: true}
        case GET_FAVS_ERROR:
            return {...state, fetching: false, error: action.payload}
        case GET_FAVS_SUCCESS:
            return {...state, fetching: false, favourites: action.payload}
        default: 
            return state
    }
}


//////ACTIONS (THUNK) ///// 
export function getCharactersAction(){
    return (dispatch, getState) => {     
        dispatch ({
            type: GET_CHARACTERS,
        })
        return axios.get(URL)
        .then(res => {
            dispatch({
                type: GET_CHARACTERS_SUCCESS,
                payload: res.data
            })
        })
        .catch(err=>{
            console.log(err)
            dispatch({
                type: GET_CHARACTERS_ERROR,
                payload: err.response.message
            })
        })
    }
}

export let nextCharacterAction = () => (dispatch, getState) => {
    let {chars, favourites} = getState().characters
    const charsnorepeat = chars.filter(({ char_id: id1 }) => !favourites.some(({ char_id: id2 }) => id2 === id1)); 
    charsnorepeat.shift() 
    dispatch ({
        type: NEXT_CHARACTER,
        payload: [...charsnorepeat] 
    })
}

export let addToFavouritesAction = () => (dispatch, getState) => { 
    let {chars, favourites} = getState().characters
    let {uid} = getState().user
    const charsnorepeat = chars.filter(({ char_id: id1 }) => !favourites.some(({ char_id: id2 }) => id2 === id1));
    let char = charsnorepeat.shift()
    favourites.push(char)
    updateDB(favourites, uid)
    saveStorage('favs', favourites)
    dispatch({
        type: ADD_TO_FAVOURITES,
        payload: {chars: [...charsnorepeat], favourites: [...favourites]}
    })
}


function saveStorage(name, storage) {
    storage = JSON.stringify(storage);
    localStorage.setItem(name, storage)
}

export let retreiveFavAction = () => (dispatch, getState) => {
    dispatch ({
        type: GET_FAVS
    }) 
    let {uid} = getState().user
    return getFavsFromDB(uid)
    .then(favourites =>{
        dispatch({
            type: GET_FAVS_SUCCESS,
            payload: [...favourites]
        })
        saveStorage('favs', [...favourites])
    })
    .catch(e=>{
        console.log(e)
        dispatch({
            type: GET_FAVS_ERROR,
            payload: e.message

        })
    })
}

export let restoreFavsAction = () => dispatch => {
    let favs = localStorage.getItem('favs')
    favs = JSON.parse(favs);
    if (favs && favs.length >0) {
        dispatch({
            type: GET_FAVS_SUCCESS,
            payload: favs
        })
    }
}
