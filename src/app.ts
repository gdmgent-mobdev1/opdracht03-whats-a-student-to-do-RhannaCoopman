// import Card from "./Components/Card2";
import Card from "./Components/Card3";
import NewProject from "./Components/NewProject";
import SearchMember from "./Components/Search";

// import EditableText from "./Components/EditableText";


import  Login  from "./Components/Login";

import  Register  from "./Components/Register";
// import  Text  from "./Components/EditableText";
// import {newProject} from "./Lib/firebase-init";


const login = new Login(document.querySelector("#root")!);
const register = new Register(document.querySelector("#root")!);
// // const something = new Text("test", document.querySelector("#root")!, )
const cards = new Card(document.querySelector("#root")!);
const newProject = new NewProject(document.querySelector("#root")!);
const Searchmember = new SearchMember(document.querySelector("#root")!);



// const text = new EditableText();
// TODO: lib - firebase-init, css, index.html

// import {Card, Comment, EditableText, TodoList} from "./Components/index";



// const newProject = (e) => {

//   const formdata = new FormData(e?.target);

//   const project_name = formdata.get('newProjectName');
//   const project_description = formdata.get('newProjectDescription');
//   const project_duedate = formdata.get('newProjectDueDate');
//   const project_worktime = formdata.get('newProjectWorktime');


//   const docRef = addDoc(collection(db, "projects"), {
//     name: project_name,
//     description: project_description,
//     dueDate: project_duedate,
//     publicationDate: serverTimestamp(),
//     workTime: project_worktime,

//     members: ["123"],
//     remarks: {
//       member: {
//         comment: "Project made!",
//         memberId: "123",
//         name: "Member",
//         publicationDate: serverTimestamp(),
//       }
//     },
//     taskMembers: {
//       member: {
//         memberId: "123",
//         name: "Member",
//         status: "Not started"
//       }
//     },
//     todos: {
//       todo: {
//         name: "First todo",
//       }
//     }

//   });
//   console.log("Document written with ID");



//   console.log(project_description);

// }

// const newProjectButton = document.getElementById('newProjectForm');
// newProjectButton?.addEventListener('submit', (e) => {
//   e.preventDefault();
//   newProject(e);
// })
