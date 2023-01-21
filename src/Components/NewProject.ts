import {
  collection,
  serverTimestamp,
  addDoc, 
  doc, 
  setDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import {
  db
} from '../Lib/firebase-init';
import Card from './Card3';
import { v4 as uuidv4 } from 'uuid';


export default class NewProject {
  newProjectForm: HTMLFormElement;

  newProjectName: HTMLInputElement;

  newProjectDescription: HTMLInputElement;

  newProjectDueDate: HTMLInputElement;

  newProjectTime: HTMLInputElement;

  NewProjectButton: HTMLInputElement;

  card ? : HTMLDivElement;

  place: HTMLElement;

  constructor(place: HTMLElement) {
    this.place = place;

    this.render();
  }

  render() {
    // create card-element
    this.card = document.createElement('div');
    this.card.classList.add('card');

    this.place.append(this.card);

    //create form element
    this.newProjectForm = document.createElement('form');
    this.newProjectForm.classList.add("card");

    this.card.append(this.newProjectForm);

    //create input-fields
    // Name
    this.newProjectName = document.createElement('input');
    this.newProjectName.setAttribute('type', 'text');
    this.newProjectName.setAttribute("name", "newProjectName");
    this.newProjectName.setAttribute("value", "Projectnaam");
    this.newProjectName.classList.add("addMember");

    this.newProjectForm.append(this.newProjectName);

    //Description
    this.newProjectDescription = document.createElement('input');
    this.newProjectDescription.setAttribute('type', 'text');
    this.newProjectDescription.setAttribute("name", "newProjectDescription");    
    this.newProjectDescription.setAttribute("value", "Projectbeschrijving");
    this.newProjectDescription.classList.add("addMember");

    this.newProjectForm.append(this.newProjectDescription);

    //Duedate
    this.newProjectDueDate = document.createElement('input');
    this.newProjectDueDate.setAttribute('type', 'date');
    this.newProjectDueDate.setAttribute("name", "newProjectDueDate");
    this.newProjectDueDate.setAttribute("value", "2023-01-01");

    this.newProjectDueDate.classList.add("addMember");


    this.newProjectForm.append(this.newProjectDueDate);

    //Time
    this.newProjectTime = document.createElement('input');
    this.newProjectTime.setAttribute('type', 'time');
    this.newProjectTime.setAttribute("name", "newProjectWorktime");
    this.newProjectTime.setAttribute("value", "12:00");
    this.newProjectTime.classList.add("addMember");

    this.newProjectForm.append(this.newProjectTime);

    //Submit button
    this.NewProjectButton = document.createElement('input');
    this.NewProjectButton.setAttribute('type', 'submit');
    this.NewProjectButton.setAttribute('value', '+');
    this.NewProjectButton.classList.add("addMember");

    this.newProjectForm.append(this.NewProjectButton);

    //Add eventlistener
    this.newProjectForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formdata = new FormData(e!.target);
      const project_name = formdata.get('newProjectName');
      const project_description = formdata.get('newProjectDescription');
      const project_duedate = formdata.get('newProjectDueDate');
      const project_worktime = formdata.get('newProjectWorktime');
      let user_id = sessionStorage.getItem("user_id");

      // if(sessionStorage.getItem("user_id")) {
      //   let user_id = sessionStorage.getItem("user_id");

      //   console.log(user_id);
      // }
  
// set project
const setProject = async () => {
  let projectId : string = uuidv4();
  await setDoc(doc(db, "projects", projectId), {
    name: project_name,
    description: project_description,
    dueDate: project_duedate,
    publicationDate: serverTimestamp(),
    workTime: project_worktime,
    projectId: projectId,

    members: [user_id],
    invitedMembers: [],
    remarks: {
      member: {
        comment: "Project made!",
        memberId: user_id,
        name: "Member",
        publicationDate: serverTimestamp(),
      }
    },
    taskMembers: [          
      {
        memberId: user_id,
        name: "Member",
        status: "Not started"
      }]
    ,
    todos: [{
      finished: false,
      finishedBy: "",
      todo: "Maak je eerste todo!"
    }]
  });


  // console.log("Document written with ID: ", docRef.id);
  // const idRef = doc(db, "projects", docRef.id);
  // await updateDoc(idRef, {
  //   id: docRef.id,
  // });
}

  setProject();


      
      // location.reload();
    })
    
  }
}