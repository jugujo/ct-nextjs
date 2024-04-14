// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    collection,
    getDocs,
    doc,
    setDoc,
} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
let rtnStr: number

export default async function fetchCt() {
    const querySnapshot = await getDocs(collection(db, 'ct_info'))
    console.log('logggg')
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`)
        rtnStr = doc.data()['ct_no']
        console.log(rtnStr)
        // return rtnStr + 1
    })
    console.log('test')

    return rtnStr
}
export async function setCt(ct: number) {
    const ctRef = doc(db, 'ct_info', 'BJ')
    setDoc(ctRef, { ct_no: ct })
}
// module.exports = { fetchCt }
