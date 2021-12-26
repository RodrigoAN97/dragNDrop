import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Board, Task } from './board.model';
import firebase from 'firebase/app';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private db: AngularFirestore, private auth: AuthService) {}

  // Creates a new board for the current user
  async createBoard(data: Board) {
    const user = await this.auth.user
    return this.db.collection('boards').add({
      ...data,
      uid: user && user.uid,
      tasks: [ { description: 'Hello', label: 'yellow' } ],
    });
  }

  // Delete Board
  deleteBoard(boardId: string) {
    return this.db.collection('boards').doc(boardId).delete();
  }

  // Updates the tasks on the board
  updateTasks(boardId: string, tasks: Task[]) {
    return this.db.collection('boards').doc(boardId).update({ tasks });
  }

  // Remove a specific task from the board
  removeTask(boardId: string, task: Task) {
    return this.db.collection('boards').doc(boardId).update({ tasks: firebase.firestore.FieldValue.arrayRemove(task) });
  }

  // Get all boards owned by current user
  getUserBoards() {
    return this.auth.user$.pipe(
      switchMap((user) => {
        if (user) {
          return this.db
            .collection<Board>('boards', (ref) => ref.where('uid', '==', user.uid).orderBy('priority'))
            .valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      }),
    );
  }

  // Run a batch write to change the priority of each board for sorting
  sortBoards(boards: Board[]) {
    const db = firebase.firestore();
    const batch = db.batch();
    const refs = boards.map((board) => db.collection('boards').doc(board.id));
    refs.forEach((ref, idx) => batch.update(ref, { priority: idx }));
    batch.commit();
  }
}
