// /* eslint-disable import/no-cycle */
// import {
//   v4 as uuidv4
// } from 'uuid';
// import {
//   root,
//   State
// } from '../Lib';
// import {
//   dragstartHandler
// } from '../Lib/dragAndDrop';
// import {
//   deleteCardFromFirebase
// } from '../lib/firebase-init';
// import Comment from './Comment';
// import editableText from './editableText';
// import TodoList from './TodoList';
// import SearchMember from './Search';

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
//   db
// } from '../Lib/firebase-init';

// export default class Card {
//   nameElement: HTMLHeadingElement;

//   name: string;

//   descriptionElement: HTMLParagraphElement;

//   description: string;

//   dueDateElement: HTMLParagraphElement;

//   dueDate: string;

  // allMembersDiv: HTMLDivElement;

  // memberDiv: HTMLDivElement;

  // member: string;

//   NewMemberForm: HTMLFormElement;

//   NewMemberInput: HTMLInputElement;

//   NewMemberButton: HTMLInputElement;

//   card ? : HTMLDivElement;

//   place: HTMLElement;

//   search : SearchMember;

//   constructor(place: HTMLElement) {
//     this.place = place;

//     this.myProjects();
//   }

//   myProjects(): void {
//     let user_id = sessionStorage.getItem("user_id");

//     const q: Query = query(collection(db, "projects"), where("members", "array-contains", user_id));

//     const querySnapshot = getDocs(q);

//     querySnapshot.then((snapshot) => {
//       snapshot.forEach((docc) => {
//         let project = docc.data();

//         const cardContainer = document.createElement('div');
//         cardContainer.classList.add('project');

//         let projectName = project.name;
//         let projectDescription = project.description;
//         let projectDueDate = project.dueDate;
//         let projectId = project.id;

//         let projectMembers = project.taskMembers;

//         this.render(projectName, projectDescription, projectDueDate, projectMembers, projectId, false);        
//       })
//     })
//   }


//   render(name: string, description: string, dueDate: string, projectMembers : Object, id :string, invite: boolean): void {
//     if(sessionStorage.getItem("user_id")) {
//       let user_id = sessionStorage.getItem("user_id");
//     }



//     // create card-element
//     this.card = document.createElement('div');
//     this.card.classList.add('card');
//     this.card.setAttribute('id', id);


//     this.place.append(this.card);
//     //create text-elements
//     //name
//     this.name = name;

//     this.nameElement = document.createElement('h3');
//     this.nameElement.innerHTML = this.name;

//     this.card.append(this.nameElement);

//     //description
//     this.description = description;
    
//     this.descriptionElement = document.createElement('p');
//     this.descriptionElement.innerHTML = this.description;

//     this.card.append(this.descriptionElement);

//     //duedate
//     this.dueDate = dueDate;
    
//     this.dueDateElement = document.createElement('p');
//     this.dueDateElement.innerHTML = this.dueDate;
    
//     this.card.append(this.dueDateElement);

//     //memberContainer
//     this.allMembersDiv = document.createElement('div');
//     this.allMembersDiv.classList.add('flex');

//     this.card.append(this.allMembersDiv);


//     //members
    // for (const key in projectMembers) {
    //   let memberInfo : Object = projectMembers[key];

    //   let memberId : string = memberInfo.id;
    //   let memberName : string = memberInfo.name;
    //   let memberStatus : string = memberInfo.status;

    //   this.member = memberName;
    
    //   this.memberDiv = document.createElement('div');
    //   this.memberDiv.classList.add("memberDiv");
    //   this.memberDiv.innerHTML = this.member;

    //   switch (memberStatus) {
    //     case "Done":
    //       this.memberDiv.classList.add("green");
    //       break;
        
    //     case "Started":
    //       this.memberDiv.classList.add("blue");
    //       break;

    //     case "Not started":
    //       this.memberDiv.classList.add("red");
    //       break;

    //     case "Invited":
    //       this.memberDiv.classList.add("yellow");
    //       break;
      
    //     default:
    //       this.memberDiv.classList.add("unknown");
    //       break;
    //   }
      
    //   this.allMembersDiv.append(this.memberDiv);
    // }

//       //add new member
//       this.NewMemberForm = document.createElement('form');
//       this.NewMemberForm.classList.add("memberDiv");
//       this.NewMemberForm.classList.add("unknown");

//       this.NewMemberInput = document.createElement('input');
//       this.NewMemberInput.setAttribute('type', 'text');
//       this.NewMemberInput.classList.add("addMember");


//       this.NewMemberButton = document.createElement('input');
//       this.NewMemberButton.setAttribute('type', 'submit');
//       this.NewMemberButton.setAttribute('value', '+');
//       this.NewMemberButton.classList.add("addMember");

//       this.NewMemberForm.append(this.NewMemberInput);
//       this.NewMemberForm.append(this.NewMemberButton);
//       this.allMembersDiv.append(this.NewMemberForm);

//       //search
//       const searchmember = new SearchMember(this.card);

//   }
// }