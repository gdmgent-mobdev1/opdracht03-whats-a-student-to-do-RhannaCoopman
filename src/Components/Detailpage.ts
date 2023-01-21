import {
  onSnapshot,
  collection,
  query,
  where,
  doc,
  getDocs,
  updateDoc,
  arrayUnion,
  Query,
  DocumentData
} from 'firebase/firestore';
import {
  db
} from '../Lib/firebase-init';

export default class Detailpage {
  id: string;

  div?: HTMLDivElement;

  h1?: HTMLHeadingElement;

  place: HTMLDivElement;

  constructor(id: string, place: HTMLDivElement) {
    this.id = id;
    this.place = place;
    this.info();
    // this.render();

  }

  render(Projectname, projectDescription): void {
    console.log(this.id);

    this.div = document.createElement('div');

    this.h1 = document.createElement('h1');
    this.h1.innerText= Projectname;
    // console.log(info.name);

    this.div.appendChild(this.h1);

    this.place.appendChild(this.div);
  }

  info(): void {
    const q = query(collection(db, "projects"), where("projectId", "==", this.id));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const projects : Object[] = [];
      
      querySnapshot.forEach((doc) => {
          projects.push(doc.data());
          console.log(doc.data());
          let Projectname = doc.data().name;
          let projectDescription = doc.data().description;
          let dueDate = doc.data().dueDate;
          let projectId = doc.data().projectId
          let members
          
          this.render(Projectname, projectDescription);
      });
      // console.log("Current projects: " + projects);
    });
  }
}