import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostService, Post } from '../../services/posts.service';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-posts',
  imports: [
    MatToolbar,
    NgFor,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getAllPosts().subscribe((data) => {
      this.posts = data;
    });
  }

  openPostDialog(post?: Post): void {
    const dialogRef = this.dialog.open(PostDialogComponent, {
      width: '400px',
      data: post ? { ...post } : { title: '', content: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.uuid) {
          this.postService.updatePost(result.uuid, result).subscribe(() => {
            this.loadPosts();
          });
        } else {
          this.postService.createPost(result).subscribe(() => {
            this.loadPosts();
          });
        }
      }
    });
  }

  deletePost(post: Post): void {
    this.postService.deletePost(post.uuid).subscribe(() => {
      this.loadPosts();
    });
  }
}
