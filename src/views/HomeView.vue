<template>
  <div class="home">
    <div class="header">
      <div>
        <h1>Мои задачи</h1>
        <p class="subtitle">
          {{ activeTasksCount }} активных, {{ completedTasksCount }} выполнено
        </p>
      </div>
      <button class="create-btn" @click="router.push('/create')">
        <Plus :size="20" />
        Создать задачу
      </button>
    </div>

    <div v-if="store.todos.length === 0" class="empty-state">
      <ClipboardList :size="64" />
      <h3>Пока нет задач</h3>
      <p>Создайте свою первую задачу, нажав на кнопку выше</p>
    </div>

    <div v-else class="todo-list">
      <transition-group name="list">
        <TodoCard
          v-for="todo in store.todos"
          :key="todo.id"
          :todo="todo"
          @toggle="handleToggle(todo.id)"
          @edit="router.push(`/edit/${todo.id}`)"
          @delete="handleDelete(todo.id)"
        />
      </transition-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useTodoStore } from "@/stores/todoStore";
import { Plus, ClipboardList } from "lucide-vue-next";
import TodoCard from "@/components/TodoCard.vue";

const store = useTodoStore();
const router = useRouter();

const activeTasksCount = computed(
  () => store.todos.filter((t) => !t.completed).length
);
const completedTasksCount = computed(
  () => store.todos.filter((t) => t.completed).length
);

onMounted(() => {
  store.loadFromStorage();
});

const handleToggle = (id: string) => {
  store.toggleComplete(id);
};

const handleDelete = (id: string) => {
  if (confirm("🗑️ Удалить задачу?\n\nЭто действие нельзя отменить.")) {
    store.deleteTodo(id);
  }
};
</script>

<style scoped>
.home {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
}

.header h1 {
  margin: 0;
  font-size: 2rem;
  color: #2c3e50;
  font-weight: 700;
}

.subtitle {
  margin: 8px 0 0;
  color: #cccfdf;
  font-size: 0.9rem;
}

.create-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #42b983 0%, #2c6e4f 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1rem;
}

.create-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 185, 131, 0.3);
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 20px;
  color: #bdc3c7;
}

.empty-state h3 {
  margin: 20px 0 8px;
  color: #7f8c8d;
}

.empty-state p {
  color: #95a5a6;
}

.todo-list {
  margin-top: 20px;
}

/* Анимации для списка */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-move {
  transition: transform 0.3s ease;
}
</style>
