import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// import 'firebase/auth'
// import firebase from 'firebase/compat/app'

const firebaseConfig = {
  apiKey: 'AIzaSyDKvxcLXN90q3tvcixldmH-MFeny3-2xPg',
  authDomain: 'ecommerce-web-app-ee031.firebaseapp.com',
  projectId: 'ecommerce-web-app-ee031',
  storageBucket: 'ecommerce-web-app-ee031.appspot.com',
  messagingSenderId: '305103543514',
  appId: '1:305103543514:web:6a84c0dd8c26e841b019e3'
}
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleAuthProvider = new GoogleAuthProvider()

// Initialize Firebase
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig)
// }

// export
// export const auth = firebase.auth()
// export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
