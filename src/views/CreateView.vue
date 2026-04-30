<template>
  <div class="create-view">
    <div class="page-header">
      <button class="back-btn" @click="router.back()">
        <ArrowLeft :size="20" />
      </button>
      <h2>Создание задачи</h2>
    </div>
    <TodoForm :on-submit="handleCreate" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useTodoStore } from '@/stores/todoStore';
import { ArrowLeft } from 'lucide-vue-next';
import TodoForm from '@/components/TodoForm.vue';

const router = useRouter();
const store = useTodoStore();

const handleCreate = (data: { title: string; description: string }) => {
  store.addTodo(data);
};
</script>

<style scoped>
.create-view {
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
</style>
