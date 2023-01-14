import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp, collection, addDoc } from "firebase/firestore";

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
//For auth
initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export {auth, db};

// Add a new document with a generated id.
const newProject = document.getElementById('newProjectForm');
newProject?.addEventListener('submit', (e) => {
  e.preventDefault();

  const formdata = new FormData(e?.target);

  const project_name = formdata.get('newProjectName');
  const project_description = formdata.get('newProjectDescription');
  const project_duedate = formdata.get('newProjectDueDate');
  const project_worktime = formdata.get('newProjectWorktime');


  const docRef = addDoc(collection(db, "projects"), {
    name: project_name,
    description: project_description,
    dueDate: project_duedate,
    publicationDate: serverTimestamp(),
    workTime: project_worktime,

    members: ["123"],
    remarks: {
      member: {
        comment: "Project made!",
        memberId: "123",
        name: "Member",
        publicationDate: serverTimestamp(),
      }
    },
    taskMembers: {
      member: {
        memberId: "123",
        name: "Member",
        status: "Not started"
      }
    },
    todos: {
      todo: {
        name: "First todo",
      }
    }

  });
  console.log("Document written with ID");



  console.log(project_description);

})
