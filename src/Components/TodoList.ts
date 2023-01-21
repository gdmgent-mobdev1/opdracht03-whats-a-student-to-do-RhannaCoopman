import { v4 as uuidv4 } from 'uuid';

import { dragoverHandler, dropHandler } from '../Lib/dragAndDrop';
// eslint-disable-next-line import/no-cycle
import Card from './Card';
import SearchMember from './Search';
import {TaskMember} from '../Lib/todoInterface';
// import {deleteTodoListFirebase} from "../Lib/firebase-init";
import {deleteCardFromFirebase} from "../Lib/firebase-init";

import Detailpage from './Detailpage';


import { 
  doc, 
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import {
  db
} from '../Lib/auth';



export default class TodoList {
  place: HTMLElement;

  title: string;

  description: string;

  cardArray: Card[];

  todos: Array<object>;

  todosDiv!: HTMLDivElement;

  input?: HTMLInputElement ;

  allMembersDiv!: HTMLDivElement;

  memberDiv?: HTMLDivElement;

  todoDiv?: HTMLDivElement;

  members: Array<object>;

  div?: HTMLDivElement ;

  h2?: HTMLHeadingElement ;

  p?: HTMLParagraphElement ;

  search?: SearchMember;

  button?: HTMLButtonElement ;

  deleteButton?: HTMLButtonElement;

  todoListElement?: HTMLElement ;

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
    if (this.input instanceof HTMLInputElement && this.div instanceof HTMLDivElement) {
      const text = this.input.value;
      const cardId = "todo" + id;
      const newCard = new Card(text, false, this.div, this.id, cardId)
      this.cardArray.push(newCard); 
      console.log(3);
      const projectRef = doc(db, "projects", id);

      await updateDoc(projectRef, {
        todos: arrayUnion({todo: text, finished: false, finishedBy: ""})
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

    // Add Event listener
    this.button.addEventListener('click', () => {
      if ((this.input !== null) && this.input?.value !== '') {
        this.addToDo.call(this, this.id);
        this.input!.value = '';
      }
    });
    this.deleteButton.addEventListener('click', () => {
      deleteCardFromFirebase(this.id);
      console.log('deleteTodoListFirebase')
    });

    this.h2.addEventListener('click', (e : Event) => {
      e.preventDefault();
      new Detailpage(this.id, (document.querySelector(".detailContainer")!));
      let detailContainer : HTMLDivElement = document.querySelector(".detailContainer")!;
      detailContainer.innerHTML = ``;
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

        this.search = new SearchMember(this.todoListElement, this.id);

      }
    

  createTodos(): void {
    this.todosDiv = document.createElement('div');
    this.todosDiv.classList.add('todosDiv');
    this.todos.forEach(element => {

      const newCard = new Card((element["todo"]), (element["finished"]), this.todosDiv, this.id, uuidv4())
 
    });
  }
    
  createMembers(): void {
    this.allMembersDiv = document.createElement('div');
    this.members.forEach(member => {

      // this.allMembersDiv.innerText = member.name;
      let memberName:string = member.name;
      let memberStatus:string = member.status;
      let memberId:string = member.id;
      
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