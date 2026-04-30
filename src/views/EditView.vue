<template>
  <div class="edit-view">
    <div class="page-header">
      <button class="back-btn" @click="router.back()">
        <ArrowLeft :size="20" />
      </button>
      <h2>Редактирование</h2>
    </div>
    <div v-if="todo">
      <TodoForm :initial-data="todo" :on-submit="handleUpdate" />
    </div>
    <div v-else class="not-found">
      <AlertCircle :size="48" />
      <h3>Задача не найдена</h3>
      <button class="btn-secondary" @click="router.push('/')">Вернуться на главную</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTodoStore } from '@/stores/todoStore';
import { ArrowLeft, AlertCircle } from 'lucide-vue-next';
import TodoForm from '@/components/TodoForm.vue';

const route = useRoute();
const router = useRouter();
const store = useTodoStore();

const todo = computed(() => store.todos.find(t => t.id === route.params.id));

const handleUpdate = (data: { title: string; description: string }) => {
  if (todo.value) {
    store.updateTodo(todo.value.id, { title: data.title, description: data.description });
  }
};
</script>

<style scoped>
.edit-view {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
}

.page-header h2 {
  margin: 0;
  color: #2c3e50;
}

.back-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  transition: all 0.2s;
  color: #7f8c8d;
}

.back-btn:hover {
  background: #ecf0f1;
  color: #2c3e50;
}

.not-found {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 20px;
}

.not-found h3 {
  margin: 20px 0;
  color: #7f8c8d;
}

.btn-secondary {
  background: #ecf0f1;
  color: #7f8c8d;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background: #e0e0e0;
}
</style>
