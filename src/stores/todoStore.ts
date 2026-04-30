import { defineStore } from "pinia";
import type { Todo } from "@/types/todo";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [] as Todo[],
  }),

  actions: {
    loadFromStorage() {
      const stored = localStorage.getItem("todo-list");
      if (stored) {
        this.todos = JSON.parse(stored);
      } else {
        this.todos = [
          {
            id: "1",
            title: "Изучить Vue 3",
            description: "Composition API, Teleport, Suspense",
            completed: false,
            createdAt: Date.now(),
          },
          {
            id: "2",
            title: "Написать тестовое",
            description: "Todo лист с карточками",
            completed: false,
            createdAt: Date.now() + 1,
          },
        ];
      }
    },
    saveToStorage() {
      localStorage.setItem("todo-list", JSON.stringify(this.todos));
    },

    // Сортировка: невыполненные сверху (новые выше), выполненные внизу
    sortTodos() {
      this.todos.sort((a, b) => {
        // Если оба выполненные или оба невыполненные - сортируем по дате (новые выше)
        if (a.completed === b.completed) {
          return b.createdAt - a.createdAt; // новые сверху
        }
        // Выполненные вниз
        return a.completed ? 1 : -1;
      });
    },

    addTodo(data: { title: string; description: string }) {
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        title: data.title,
        description: data.description,
        completed: false,
        createdAt: Date.now(),
      };
      this.todos.push(newTodo);
      this.sortTodos(); // сортируем после добавления
      this.saveToStorage();
    },

    updateTodo(
      id: string,
      updates: { title?: string; description?: string; completed?: boolean }
    ) {
      const index = this.todos.findIndex((t) => t.id === id);
      if (index !== -1) {
        this.todos[index] = { ...this.todos[index], ...updates };
        this.sortTodos(); // сортируем после обновления
        this.saveToStorage();
      }
    },

    toggleComplete(id: string) {
      const todo = this.todos.find((t) => t.id === id);
      if (todo) {
        todo.completed = !todo.completed;
        this.sortTodos(); // сортируем после переключения
        this.saveToStorage();
      }
    },

    deleteTodo(id: string) {
      this.todos = this.todos.filter((t) => t.id !== id);
      this.saveToStorage();
    },
  },
});
