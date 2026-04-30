<template>
  <div class="todo-card" :class="{ completed: todo.completed }">
    <div class="todo-header">
      <div class="todo-title">
        <button class="complete-btn" @click="$emit('toggle')" :title="todo.completed ? 'Отметить как невыполненную' : 'Отметить как выполненную'">
          <CheckCircle v-if="todo.completed" :size="20" class="icon-completed" />
          <Circle v-else :size="20" class="icon-pending" />
        </button>
        <h3 :class="{ 'completed-text': todo.completed }">{{ todo.title }}</h3>
      </div>
      <div class="actions">
        <button @click="$emit('edit')" title="Редактировать" class="icon-btn">
          <Edit :size="18" />
        </button>
        <button @click="$emit('delete')" title="Удалить" class="icon-btn delete-btn">
          <Trash2 :size="18" />
        </button>
      </div>
    </div>
    <p class="todo-description">{{ truncatedDescription }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { CheckCircle, Circle, Edit, Trash2 } from 'lucide-vue-next';
import type { Todo } from '@/types/todo';

const props = defineProps<{ todo: Todo }>();
const emit = defineEmits<{ toggle: []; edit: []; delete: [] }>();

const truncatedDescription = computed(() => {
  if (props.todo.description.length <= 100) return props.todo.description;
  return props.todo.description.slice(0, 100) + '...';
});
</script>

<style scoped>
.todo-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.todo-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transform: translateY(-2px);
}

.todo-card.completed {
  background: #f8f9fa;
  opacity: 0.85;
}

.todo-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.todo-title {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.todo-title h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 500;
  color: #2c3e50;
}

.completed-text {
  text-decoration: line-through;
  color: #95a5a6 !important;
}

.complete-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  transition: transform 0.2s;
}

.complete-btn:hover {
  transform: scale(1.1);
}

.icon-completed {
  color: #27ae60;
}

.icon-pending {
  color: #7f8c8d;
}

.actions {
  display: flex;
  gap: 8px;
}

.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  transition: all 0.2s;
  color: #7f8c8d;
}

.icon-btn:hover {
  background: #ecf0f1;
  color: #3498db;
}

.delete-btn:hover {
  background: #fee;
  color: #e74c3c;
}

.todo-description {
  margin: 12px 0 0 32px;
  color: #7f8c8d;
  font-size: 0.9rem;
  line-height: 1.5;
}
</style>
