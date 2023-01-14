// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  doc, 
  deleteDoc, 
  collection,
  addDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDjBUWLbTJcaF14Rm0uhxm0gFPMoARBba0",
  authDomain: "whats-a-students-to-do.firebaseapp.com",
  projectId: "whats-a-students-to-do",
  storageBucket: "whats-a-students-to-do.appspot.com",
  messagingSenderId: "189378655493",
  appId: "1:189378655493:web:2f74d1f9deaa37baa7736c"
};


// Initialize Firebase

export const fireStoreApp = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export {auth, db};

// get data from firestore
export const fireStoreDb = getFirestore(fireStoreApp);
export const addTodoFirebase = async(text: string, todoId: string) => {
  const cardsSnapShot = collection(fireStoreDb, `lists/${todoId}/cards`);
  
  const docRef = await addDoc(cardsSnapShot, {
    title: text,
    description: '',
    comments: []
    }
  );
  return docRef.id;
}

export const updateTodoFirebase = async(todoListId: string, id: string, attribute: string, value: string) => {
  console.log(todoListId, id, attribute, value);
  if(attribute === 'title'){
    const answer = await setDoc(doc(fireStoreDb, `lists/${todoListId}/cards`, id), {
      title: value
    }, { merge: true });
  }else{
    const answer = await setDoc(doc(fireStoreDb, `lists/${todoListId}/cards`, id), {
      description: value
    }, { merge: true });
  }
  
}


export const deleteTodoListFirebase = async(id: string) => {
  await deleteDoc(doc(fireStoreDb, "lists", id));
}

export const deleteCardFromFirebase = async(todoListId: string, id: string) => {
  await deleteDoc(doc(fireStoreDb, `lists/${todoListId}/cards`, id));
}

