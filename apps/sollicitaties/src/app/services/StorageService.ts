import { inject, Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, deleteDoc, updateDoc, getDoc, setDoc, collectionData } from '@angular/fire/firestore';
import { Sollicitatie } from '../../../models/sollicitatie.interface';
import { firebaseConfig } from '../environments/firebase.config';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { from, Observable } from 'rxjs';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

@Injectable({
  providedIn: 'root',
  
})
export class StorageService {
  private firestore: Firestore = inject(Firestore);
  private sollicitatiesRef = collection(this.firestore, 'sollicitaties');

  // Voeg een nieuwe sollicitatie toe
  addSollicitatie(sollicitatie: Sollicitatie): Promise<void> {
    const sollicitatieRef = doc(this.firestore, `sollicitaties/${sollicitatie.datum}`); // We gebruiken de datum als ID (je kunt dit ook vervangen door een UUID of andere unieke identifier)
    return setDoc(sollicitatieRef, sollicitatie);
  }

  // Haal alle sollicitaties op
  getSollicitaties(): Observable<Sollicitatie[]> {
    return collectionData(this.sollicitatiesRef, { idField: 'id' }) as Observable<Sollicitatie[]>;
  }

  // Update een sollicitatie
  updateSollicitatie(id: string, sollicitatie: Sollicitatie): Promise<void> {
    const sollicitatieRef = doc(this.firestore, `sollicitaties/${id}`);
    return updateDoc(sollicitatieRef, {...sollicitatie});
  }

  // Verwijder een sollicitatie
  deleteSollicitatie(id: string): Promise<void> {
    const sollicitatieRef = doc(this.firestore, `sollicitaties/${id}`);
    return deleteDoc(sollicitatieRef);
  }

  // Haal een specifieke sollicitatie op
  getSollicitatie(id: string): Observable<Sollicitatie> {
    const sollicitatieRef = doc(this.firestore, `sollicitaties/${id}`);
    return from(
      getDoc(sollicitatieRef).then(docSnap => {
        if (docSnap.exists()) {
          return docSnap.data() as Sollicitatie;
        } else {
          throw new Error('Sollicitatie not found');
        }
      })
    );
  }
}
