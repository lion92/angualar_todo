import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoItem } from '../todo-item/todo-item';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface TodoDTO {
  id: number;
  title: string;
  completed?: boolean;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, TodoItem],
  templateUrl: './todo.html',
  styleUrl: './todo.css'
})
export class Todo implements OnInit {

  apiUrl = 'http://localhost:3005/todos';

  newTodo = signal('');
  todos = signal<TodoDTO[]>([]);

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    await this.loadTodos();
  }

  // GET
  async loadTodos() {
    const data = await firstValueFrom(
      this.http.get<TodoDTO[]>(this.apiUrl)
    );

    this.todos.set(data);
  }

  // CREATE
  async addTodo() {

    if (!this.newTodo().trim()) return;

    await firstValueFrom(
      this.http.post<TodoDTO>(this.apiUrl, {
        title: this.newTodo(),
        completed: false
      })
    );

    this.newTodo.set('');
    await this.loadTodos();
  }

  // UPDATE
  async update(todo: TodoDTO) {

    await firstValueFrom(
      this.http.patch(`${this.apiUrl}/${todo.id}`, {
        title: todo.title,
        completed: todo.completed
      })
    );

    await this.loadTodos();
  }

  // DELETE
  async delete(id: number) {

    await firstValueFrom(
      this.http.delete(`${this.apiUrl}/${id}`)
    );

    await this.loadTodos();
  }

}
