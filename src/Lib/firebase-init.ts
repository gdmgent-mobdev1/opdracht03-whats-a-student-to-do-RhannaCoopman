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
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

import { getAuth } from "firebase/auth";

// import {auth, db} from "./auth.ts";

import { v4 as uuidv4 } from 'uuid';


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

let user_id = sessionStorage.getItem('user_id')
// // get data from firestore
// export const fireStoreDb = getFirestore(fireStoreApp);
// export const addTodoFirebase = async(text: string, todoId: string) => {
//   console.log("test");
//   const cardsSnapShot = doc(db, "projects", "8IHv6Rm6OEGThDdt2fq0");
  
//   const docRef = await updateDoc(cardsSnapShot, {
//     todos: arrayUnion({    
//       title: text,
//       description: '',
//       comments: []})
//     }
//   );
//   return docRef.id;
// }

export const updateTodoFirebase = async(todoListId: string, id: string, attribute: string, value: string) => {
  console.log(todoListId, id, attribute, value);
  if(attribute === 'title'){
    const answer = await setDoc(doc(db, "projects", id), {
      name: value
    }, { merge: true });
  }else{
    const answer = await setDoc(doc(db, "projects", id), {
      description: value
    }, { merge: true });
  }
  
}


// export const deleteTodoListFirebase = async(id :string) => {
//   await deleteDoc(doc(db, "projects", id));
//   await setDoc(doc(db, "projects", id), {
//     name: "nieuwe naam",
//   });
//   console.log(id);
// }

// export const deleteTodoListFirebase = async() => {
//   // await deleteDoc(doc(db, "projects", id));
//   // console.log(id);
//   console.log('deleteTodoListFirebase');
// }

// export const deleteTodoListFirebase = () => {
//   console.log('without async');
//   await deleteDoc(doc(db, "projects", id));
// }


export const deleteTodoListFirebase = async(id : string, todo: string) => {
  console.log("test");
  const cardsSnapShot = doc(db, "projects", id);
  
  const docRef = await updateDoc(cardsSnapShot, {
    todos: arrayRemove({
      finished: false,
      finishedBy: "",
      todo: todo
    })
    }
  );
  console.log("succes");

}

export const CheckTodo = async(id : string, todo: string) => {
  console.log("check");
  const cardsSnapShot = doc(db, "projects", id);

  const falseRef = await updateDoc(cardsSnapShot, {
    todos: arrayRemove({
      finished: false,
      finishedBy: "",
      todo: todo
    })
    }
  );
  const trueRef = await updateDoc(cardsSnapShot, {
    todos: arrayUnion({
      finished: true,
      finishedBy: user_id,
      todo: todo
    })
    }
  );
  console.log("check succes");

}

export const deleteCardFromFirebase = async(id: string) => {
  await deleteDoc(doc(db, "projects", id));
}

// export const deleteTodoFromFirebase = async(id: string) => {
//   await deleteDoc(doc(db, "projects", id));
// }


