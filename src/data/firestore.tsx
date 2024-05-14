// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    collection,
    getDocs,
    getDoc,
    doc,
    setDoc,
    addDoc,
    Timestamp,
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

export async function fetchTodos() {
    const querySnapshot = await getDocs(collection(db, 'todos_info'))
    if (querySnapshot.empty) {
        return []
    }
    const todos: {
        id: string
        title: string
        is_done: boolean
        created_at: Timestamp
    }[] = []

    querySnapshot.forEach((doc) => {
        console.log(doc.id, '⇒', doc.data())
        const todo = {
            id: doc.id,
            title: doc.data()['title'],
            is_done: doc.data()['is_done'],
            created_at: doc.data()['created_at'],
            // .toDate()
            // .toLocaleTimeString('ko'),
        }
        todos.push(todo)
    })

    return todos
}
export async function fetchTodo(id: string) {
    if (id == null) {
        return null
    }
    const docRef = doc(db, 'todos_info', id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        console.log('Document data:', docSnap.data())
        const todo = {
            id: docSnap.id,
            title: docSnap.data()['title'],
            is_done: docSnap.data()['is_done'],
            created_at: docSnap.data()['created_at'],
            // .toDate()
            // .toLocaleTimeString('ko'),
        }

        return todo
    } else {
        // docSnap.data() will be undefined in this case
        console.log('No such document!')
        return null
    }
}

export async function addTodo({ title }: { title: string }) {
    const newTodoRef = doc(collection(db, 'todos_info'))
    // console.log(title)

    const createdAt = Timestamp.fromDate(new Date())
    const newTodo = {
        id: newTodoRef.id,
        title: title,
        is_done: false,
        create_at: createdAt,
    }

    await setDoc(newTodoRef, newTodo)

    return newTodo
}

export async function setCt(ct: number) {
    // const ctRef = doc(db, 'ct_info', 'visitCnt')
    if (ct == null) {
        ct = 0
    }
    await setDoc(doc(db, 'ct_info', 'visitCnt'), { ct_no: ct })

    await addDoc(collection(db, 'ct_info'), {
        name: 'Tokyo',
        country: 'Japan',
    })
}

// export async function addTodos({title}) {
//     const newTodoRef =
// }

// export default fetchCt
// module.exports = { fetchCt, setCt }
