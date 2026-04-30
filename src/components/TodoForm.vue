<template>
  <form @submit.prevent="handleSubmit" class="todo-form">
    <div class="form-group">
      <label class="form-label">
        <span class="label-text">Название задачи</span>
        <span class="required">*</span>
      </label>
      <input 
        v-model="form.title" 
        type="text" 
        placeholder="Например: Купить продукты"
        :class="{ 'input-error': errors.title }"
      />
      <span v-if="errors.title" class="error-message">
        <AlertCircle :size="14" />
        {{ errors.title }}
      </span>
    </div>

    <div class="form-group">
      <label class="form-label">Описание</label>
      <textarea 
        v-model="form.description" 
        rows="5"
        placeholder="Подробное описание задачи..."
      ></textarea>
    </div>

    <div class="form-actions">
      <button type="submit" class="btn-primary" :disabled="!isValid">
        <Save :size="18" />
        Сохранить
      </button>
      <button type="button" class="btn-secondary" @click="$router.back()">
        <X :size="18" />
        Отмена
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { AlertCircle, Save, X } from 'lucide-vue-next';

const props = defineProps<{
  initialData?: { title: string; description: string };
  onSubmit: (data: { title: string; description: string }) => void;
}>();

const router = useRouter();
const form = reactive({
  title: props.initialData?.title || '',
  description: props.initialData?.description || '',
});

const errors = computed(() => ({
  title: form.title.trim().length === 0 ? 'Заголовок обязателен для заполнения' : '',
}));

const isValid = computed(() => errors.value.title === '');

const handleSubmit = () => {
  if (!isValid.value) return;
  props.onSubmit({ 
    title: form.title.trim(), 
    description: form.description.trim() 
  });
  router.push('/');
};
</script>

<style scoped>
.todo-form {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  padding: 32px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.form-group {
  margin-bottom: 24px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.95rem;
}

.label-text {
  margin-right: 4px;
}

.required {
  color: #e74c3c;
}

input, textarea {
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s;
  resize: vertical;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.1);
}

.input-error {
  border-color: #e74c3c;
}

.input-error:focus {
  border-color: #e74c3c;
  box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
}

.error-message {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 6px;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 32px;
}

.btn-primary, .btn-secondary {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: linear-gradient(135deg, #42b983 0%, #2c6e4f 100%);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 185, 131, 0.3);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: #ecf0f1;
  color: #7f8c8d;
}

.btn-secondary:hover {
  background: #e0e0e0;
  transform: translateY(-2px);
}
</style>
