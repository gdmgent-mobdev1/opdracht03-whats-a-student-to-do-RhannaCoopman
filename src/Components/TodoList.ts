import { v4 as uuidv4 } from 'uuid';

import { dragoverHandler, dropHandler } from '../Lib/dragAndDrop';
// eslint-disable-next-line import/no-cycle
import Card from './Card';
import SearchMember from './Search';
import {TaskMember} from '../Lib/todoInterface';
import { initializeApp } from "firebase/app";
import {deleteTodoListFirebase} from "../Lib/firebase-init";
import Detailpage from './Detailpage';


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
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {
  db
} from '../Lib/auth';



export default class TodoList {
  place: HTMLElement;

  title: string;

  description: string;

  cardArray: Card[];

  todos: Array<object>;

  todosDiv?: HTMLDivElement;

  input?: HTMLInputElement ;

  allMembersDiv?: HTMLDivElement;

  memberDiv?: HTMLDivElement;

  todoDiv?: HTMLDivElement;

  members: Array<object>;

  div?: HTMLDivElement ;

  h2?: HTMLHeadingElement ;

  p?: HTMLParagraphElement ;

  search?: SearchMember;

  button?: HTMLButtonElement ;

  deleteButton?: HTMLButtonElement;

  todoListElement?: string | HTMLElement ;

  id: string;
  constructor(place: HTMLElement, title = 'to-do list', description = 'add description', members : Array<TaskMember>, todos : Array<object>, id = '_'+uuidv4()) {
    this.id = id;
    this.place = place;
    this.title = title;
    this.description = description;
    this.members = members;
    this.todos = todos;
    this.cardArray = [];
    this.render();
  }

  async addToDo(id: string) {
    console.log(1);
    if (this.input instanceof HTMLInputElement && this.div instanceof HTMLDivElement) {
      console.log(2);
      const text = this.input.value;
      const cardId = "todo" + id;
      const newCard = new Card(text, this.div, this.id, cardId)
      this.cardArray.push(newCard); 
      console.log(3);
      const projectRef = doc(db, "projects", id);

      await updateDoc(projectRef, {
        todos: arrayUnion(text)
    });
    }
  }

  render(): void {
    this.createMembers();
    this.createTodos();
    this.createToDoListElement();
    if (this.todoListElement instanceof HTMLElement) {
      this.todoListElement.addEventListener('drop', dropHandler);
      this.todoListElement.addEventListener('dragover', dragoverHandler);
      this.place.append(this.todoListElement);
    }
  }
  // todoListElement(todoListElement: any) {
  //   throw new Error("Method not implemented.");
  // }

  createToDoListElement(): void {
    // Create elements
    this.h2 = document.createElement('h2');
    this.h2.innerText = this.title;
    this.p = document.createElement('p');
    this.p.innerText = this.description;
    this.input = document.createElement('input');
    this.input.classList.add('comment');
    this.button = document.createElement('button');
    this.button.innerText = 'Add';
    this.button.classList.add('btn-save');
    this.button.id = 'to-do-list-button';
    this.div = document.createElement('div');
    this.deleteButton = document.createElement('button');
    this.deleteButton.classList.add('delete-btn')
    this.todoListElement = document.createElement('div');
    this.todoListElement.id = this.id;

    this.search = new SearchMember(this.todoListElement);
    // Add Event listener
    this.button.addEventListener('click', () => {
      if ((this.input !== null) && this.input?.value !== '') {
        this.addToDo.call(this, this.id);
        this.input!.value = '';
        // console.log("niewe todo")
      }
    });
    this.deleteButton.addEventListener('click', () => {
      // const deleteTodoListFirebase = async(id :string) => {
      //   await deleteDoc(doc(db, "projects", id));
      //   // console.log(id);
      //   console.log(id);
      // }
      // deleteTodoListFirebase(this.id);
      // // document.querySelector(`#${this.id}`)?.remove();
      deleteTodoListFirebase();
      console.log('deleteTodoListFirebase')
    });

    this.todoListElement.addEventListener('click', (e : Event) => {
      e.preventDefault();
      new Detailpage(this.id);

    })



        // Append elements to the to-do list element
        this.todoListElement.append(this.h2);
        this.todoListElement.append(this.p);
        this.todoListElement.append(this.input);
        this.todoListElement.append(this.button);
        this.todoListElement.append(this.div);
        this.todoListElement.append(this.deleteButton);
        this.todoListElement.append(this.allMembersDiv);
        this.todoListElement.classList.add('todoList');
        this.todoListElement.append(this.todosDiv);

      }
    

  createTodos(): void {
    this.todosDiv = document.createElement('div');
    this.todosDiv.classList.add('todosDiv');

    this.todos.forEach(element => {
      console.log(element);
      const newCard = new Card(element, this.todosDiv, this.id, uuidv4())
      // this.todoDiv = document.createElement('div');
      // this.todoDiv.innerText = element;
      // this.todoDiv.classList.add('todoDiv');
      // this.todosDiv.append(this.todoDiv);
    });
  }
    
  createMembers(): void {
    this.allMembersDiv = document.createElement('div');
    this.members.forEach(member => {

      // this.allMembersDiv.innerText = member.name;
      let memberName = member.name;
      let memberStatus = member.status;
      let memberId = member.id;
      
        this.memberDiv = document.createElement('div');
        this.memberDiv.classList.add("memberDiv");
        this.memberDiv.innerHTML = memberName;
  
        switch (memberStatus) {
          case "Done":
            this.memberDiv.classList.add("green");
            break;
          
          case "Started":
            this.memberDiv.classList.add("blue");
            break;
  
          case "Not started":
            this.memberDiv.classList.add("red");
            break;
  
          case "Invited":
            this.memberDiv.classList.add("yellow");
            break;
        
          default:
            this.memberDiv.classList.add("unknown");
            break;
        }
        
        this.allMembersDiv.append(this.memberDiv);

    });
  }


}