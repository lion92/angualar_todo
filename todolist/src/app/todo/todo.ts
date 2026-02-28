import {Component, computed, OnInit, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TodoItem} from '../todo-item/todo-item';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {CommonModule} from '@angular/common';
import {CdkDragDrop, DragDropModule, moveItemInArray} from '@angular/cdk/drag-drop';

interface TodoDTO {
  id: number;
  title: string;
  completed?: boolean;
  position?: number;
}

type Filter = 'all' | 'active' | 'completed';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, TodoItem, CommonModule, DragDropModule],
  templateUrl: './todo.html',
  styleUrl: './todo.css'
})
export class Todo implements OnInit {

  apiUrl = 'http://localhost:3005/todos';

  newTodo = signal('');
  todos = signal<TodoDTO[]>([]);
  filter = signal<Filter>('all');

  filteredTodos = computed(() => {
    const f = this.filter();
    const all = this.todos();
    if (f === 'active') return all.filter(t => !t.completed);
    if (f === 'completed') return all.filter(t => t.completed);
    return all;
  });

  activeCount = computed(() => this.todos().filter(t => !t.completed).length);
  completedCount = computed(() => this.todos().filter(t => t.completed).length);

  constructor(private http: HttpClient) {
  }

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
        completed: false,
        position: this.todos().length
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

  async drop(event: CdkDragDrop<TodoDTO[]>) {

    const todos = [...this.todos()];

    moveItemInArray(todos, event.previousIndex, event.currentIndex);

    const reordered = todos.map((t, index) => ({
      id: t.id,
      position: index
    }));
    console.log(reordered);
    this.todos.set(
      todos.map((t, index) => ({ ...t, position: index }))
    );

    await firstValueFrom(
      this.http.patch(`${this.apiUrl}/reorder`, reordered)
    );
  }
}
