import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Post {
  uuid: string;
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = `${environment.apiEndpoint}/posts`
  constructor(private httpClient: HttpClient) { }

  getAllPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.baseUrl);
  }

  getPostByUuid(uuid: string): Observable<Post> {
    return this.httpClient.get<Post>(`${this.baseUrl}/${uuid}`);
  }

  // Crear un nuevo post
  createPost(post: Omit<Post, 'uuid'>): Observable<Post> {
    return this.httpClient.post<Post>(`${this.baseUrl}`, post);
  }

  // Actualizar un post existente
  updatePost(uuid: string, post: Partial<Post>): Observable<Post> {
    return this.httpClient.put<Post>(`${this.baseUrl}/${uuid}`, post);
  }

  // Eliminar un post por UUID
  deletePost(uuid: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${uuid}`);
  }
}
