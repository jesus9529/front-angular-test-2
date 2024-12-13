import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss'],
  imports: [MatFormField, MatLabel,FormsModule, MatButtonModule, MatInputModule, MatDialogModule]
})
export class PostDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string; content: string; uuid?: string }) {}
}
