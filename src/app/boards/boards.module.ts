import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardsRoutingModule } from './boards-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { BoardListComponent } from './board-list/board-list.component';
import { BoardComponent } from './board/board.component';
import { BoardDialogComponent } from './dialogs/board-dialog.component';
import { TaskDialogComponent } from './dialogs/task-dialog.component';

@NgModule({
    declarations: [BoardListComponent, BoardComponent, BoardDialogComponent, TaskDialogComponent],
    imports: [
        CommonModule,
        BoardsRoutingModule,
        SharedModule,
        FormsModule,
        DragDropModule,
        MatDialogModule,
        MatButtonToggleModule,
    ]
})
export class BoardsModule {}
