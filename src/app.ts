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


import PomodoroTimer from './Components/Pomodoro' ;

import NewProject from './Components/NewProject' ;
import Login from './Components/Login';
import Register from './Components/Register';

import TodoList from './Components/TodoList' ;
import Invite from './Components/invites' ;
import ChangeTheme from './Components/ChangeTheme';

new NewProject(document.querySelector("#newProjectContainer")!);
new Invite(document.querySelector("#inviteContainer")!, "123");
new Register(document.querySelector("#root")!);

new Login(document.querySelector("#root")!);
new PomodoroTimer(25, 5, document.querySelector("#pomodoro")!, document.querySelector(".detailContainer")!);
new ChangeTheme(document.querySelector("#theme")!)


export const renderTodos = () => {
  let user_id = sessionStorage.getItem('user_id');
  const q = query(collection(db, "projects"), where("members", "array-contains", user_id));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const projects : Object[] = [];
    
    let projectContainer : HTMLDivElement = document.querySelector("#projectContainer")!;
    projectContainer.innerHTML = ``;
    querySnapshot.forEach((doc) => {
        projects.push(doc.data());

        new TodoList(projectContainer, doc.data().name, doc.data().description, doc.data().taskMembers, doc.data().todos, doc.data().projectId);
    });
  });
}

renderTodos();






