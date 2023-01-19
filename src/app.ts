import {
  onSnapshot,
  collection,
  query,
  where,
  doc,
  getDocs,
  updateDoc,
  arrayUnion,
  Query
} from 'firebase/firestore';
import {
  db
} from './Lib/firebase-init';
import { v4 as uuidv4 } from 'uuid';

import NewProject from './Components/NewProject' ;
import Login from './Components/Login';
import Register from './Components/Register';

import TodoList from './Components/TodoList' ;
import Invite from './Components/invites' ;

new NewProject(document.querySelector("#newProjectContainer")!);
new Invite(document.querySelector("#inviteContainer")!);
new Login(document.querySelector("#root")!);
new Register(document.querySelector("#root")!);


// const todo1 = new TodoList(document.querySelector("#projectContainer")!, "todolist");
// const todo2 = new TodoList(document.querySelector("#projectContainer")!, "todolist");
// const todo3 = new TodoList(document.querySelector("#projectContainer")!, "todolist");



// const unsub = onSnapshot(doc(db, "lists", "_1e3a33fd-27c8-4f27-b888-015664585600"), (doc) => {
//   console.log("Current data: ", doc.data());
// });

// let user_id = sessionStorage.getItem("user_id");

//     const q: Query = query(collection(db, "projects"), where("members", "array-contains", user_id));

//     const querySnapshot = getDocs(q);

//     querySnapshot.then((snapshot) => {
//       snapshot.forEach((docc) => {
//         let project = docc.data();
//         console.log(project);
//         // const cardContainer = document.createElement('div');
//         // cardContainer.classList.add('project');

//         // let projectName = project.name;
//         // let projectDescription = project.description;
//         // let projectDueDate = project.dueDate;
//         // let projectId = project.id;

//         // let projectMembers = project.taskMembers;

//         // this.render(projectName, projectDescription, projectDueDate, projectMembers, projectId, false);        
//       })
//     })

// import { collection, query, where, onSnapshot } from "firebase/firestore";
// , where("state", "==", "CA")
const q = query(collection(db, "projects"));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const projects : Object[] = [];
  let projectContainer : HTMLDivElement = document.querySelector("#projectContainer")!;
  projectContainer.innerHTML = ``;
  querySnapshot.forEach((doc) => {
      projects.push(doc.data());
      // console.log(doc.data().todos);
      doc.data().todos.forEach(element => {
        // console.log(element);
      });
      new TodoList(projectContainer, doc.data().name, doc.data().description, doc.data().taskMembers, doc.data().todos, doc.data().projectId);
  });
  console.log("Current projects: " + projects);
});

