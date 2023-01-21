// import { v4 as uuidv4 } from 'uuid';
// import { root, State } from '../Lib';
// import { dragstartHandler } from '../Lib/dragAndDrop';
// import { deleteCardFromFirebase } from '../lib/firebase-init';
// import Comment from './Comment';
// import editableText from './editableText';
// import TodoList from './TodoList';
// import {
//   onSnapshot,
//   collection,
//   query, 
//   where,
//   doc, 
//   getDocs,
//   updateDoc,
//   arrayUnion,
//   Query
// } from 'firebase/firestore';
// import {
//   db, 
//   auth
// } from '../Lib/firebase-init';

// export default class Card {
//   place: HTMLElement;

//   // todoList: TodoList;

//   // state: State;

//   // menuContainer?: HTMLElement;

//   // card?: HTMLDivElement ;

//   // deleteButton?: HTMLButtonElement ;

//   // p?: HTMLParagraphElement ;

//   // menu?: HTMLDivElement ;

//   // menuTitle?: HTMLDivElement ;

//   // menuDescription?: HTMLDivElement ;

//   // commentsInput?: HTMLInputElement ;

//   // commentsButton?: HTMLButtonElement ;

//   // menuComments?: HTMLDivElement ;

//   // editableDescription?: editableText ;

//   // editableText?: editableText;

//   // id: string;

//   // parentId: string;

//   title: string;

//   // constructor(title: string, place: HTMLElement, todoList: TodoList, id = '_'+uuidv4(), parentId:string) {
//   //   this.id = id;
//   //   this.place = place;
//   //   this.todoList = todoList;
//   //   this.state = {
//   //     id,
//   //     title,
//   //     description: 'Click to write a description...',
//   //     comments: [],
//   //   };
//   //   this.parentId = parentId;

//   //   this.render();

//   // }

//   constructor(title: string, place: HTMLElement){
//     this.title = title;
//     this.place = place;

//     this.render();
//   }

//   // Functions
//   // Render (make the thing)
//   render(): void {
//     const q : Query = query(collection(db, "projects"), where("members", "array-contains", "234"));

//     const querySnapshot = getDocs(q);

//     querySnapshot.then((snapshot) => {
//       snapshot.forEach((docc) => {
//         let project = docc.data();
//         console.log(project);

//         const cardContainer = document.createElement('div');
//         cardContainer.classList.add('project');

//         let projectName = project.name;
//         let projectDescription = project.description;
//         let projectDueDate = project.dueDate;

//         for (const key in project.taskMembers) {
//           let memberInfo = project.taskMembers[key];

//           let memberId = memberInfo.name;
//           let memberName = memberInfo.name;


//           cardContainer.setAttribute('id', project.id);

//           cardContainer.innerHTML = `
//           <h4>${project.name}</h4>
//           <p>${project.description}</p>
//           <div class="flex"><p>${project.dueDate}</p><p>Tasks: 50</p><p>Publicationdate : ${project.publicationDate}</p></div>
//           <div class="flex">
//             <div class="blue status" value="${memberInfo.status}">
//             ${memberInfo.name}
//             </div>
//           </div>
  
//           <form>
//             <input type="text" value="v5S4hoR9UwS8tK08nvpUs94Illq1" required name="user_id">
//             <button type="submit">Submit</button>
//           </form>
//           `;

          
//         }

//         this.place.append(cardContainer);

//         cardContainer.addEventListener('submit', (e : Event) => {
//           e.preventDefault();
//           const formdata = new FormData(e.target);
//           const user_id = formdata.get('user_id');
//           const projectRef = doc(db, "projects", project.id);


//           updateDoc(projectRef, {
//             members: arrayUnion(user_id)
//           });
//         })

//         return cardContainer;
//       })
//     })
//   }
// }