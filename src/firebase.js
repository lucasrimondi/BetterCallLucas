import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAI_eUu6S2k3gHfandLrgqUQT740l_YWMM",
  authDomain: "bettercalllucas-af50c.firebaseapp.com",
  projectId: "bettercalllucas-af50c",
  storageBucket: "bettercalllucas-af50c.appspot.com",
  messagingSenderId: "557493647805",
  appId: "1:557493647805:web:38ea3c5a1fc2b8802afad4",
  measurementId: "G-SWV17NMMQJ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

//DATABASE
let db = firebase.firestore().collection('favs')

export function updateDB(favourites, uid){
  return db.doc(uid).set({favourites})
}

export function getFavsFromDB(uid){
    return db.doc(uid).get()
    .then(snap=>{
        return snap.data().favourites
    })
}


//LOGIN FUNCTIONS
export function loginWithGoogle(){
    let provider = new firebase.auth.GoogleAuthProvider()
    return firebase.auth().signInWithPopup(provider)
    .then(snap=>snap.user)
}

export function logOutGoogle (){
    firebase.auth().signOut()
}