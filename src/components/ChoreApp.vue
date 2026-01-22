<script setup lang="ts">
import { ref, computed } from 'vue';

type Recurrence = 'daily' | 'weekly' | 'monthly' | 'once';

interface Chore {
  id: number;
  name: string;
  completed: boolean;
  recurrence: Recurrence;
}

const newChore = ref('');
const newRecurrence = ref<Recurrence>('once');
const chores = ref<Chore[]>([]);

let nextId = 1;

const choresByRecurrence = computed(() => {
  const buckets: Record<Recurrence, Chore[]> = {
    daily: [],
    weekly: [],
    monthly: [],
    once: [],
  };
  for (const chore of chores.value) {
    buckets[chore.recurrence].push(chore);
  }
  return buckets;
});

const pendingCount = computed(() => chores.value.filter(c => !c.completed).length);
const completedCount = computed(() => chores.value.filter(c => c.completed).length);

function addChore() {
  const name = newChore.value.trim();
  if (!name) return;
  
  chores.value.push({
    id: nextId++,
    name,
    completed: false,
    recurrence: newRecurrence.value,
  });
  newChore.value = '';
  newRecurrence.value = 'once';
}

function toggleChore(id: number) {
  const chore = chores.value.find(c => c.id === id);
  if (chore) {
    chore.completed = !chore.completed;
  }
}

function removeChore(id: number) {
  chores.value = chores.value.filter(c => c.id !== id);
}

function clearCompleted() {
  chores.value = chores.value.filter(c => !c.completed);
}

const recurrenceLabels: Record<Recurrence, string> = {
  daily: 'Daily',
  weekly: 'Weekly',
  monthly: 'Monthly',
  once: 'One-time',
};
</script>

<template>
  <div class="chore-app">
    <header>
      <h1>Choar</h1>
      <p class="tagline">Keep on top of moar chores</p>
    </header>

    <form @submit.prevent="addChore" class="add-form">
      <input
        v-model="newChore"
        type="text"
        placeholder="Add a new chore..."
        class="chore-input"
      />
      <select v-model="newRecurrence" class="recurrence-select">
        <option value="once">One-time</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      <button type="submit" class="add-btn">Add</button>
    </form>

    <div class="stats">
      <span class="pending">{{ pendingCount }} pending</span>
      <span class="completed">{{ completedCount }} completed</span>
    </div>

    <div class="buckets">
      <section
        v-for="recurrence in (['daily', 'weekly', 'monthly', 'once'] as Recurrence[])"
        :key="recurrence"
        class="task-bucket"
        :data-recurrence="recurrence"
      >
        <h2 class="bucket-title">{{ recurrenceLabels[recurrence] }}</h2>
        <ul class="chore-list">
          <li
            v-for="chore in choresByRecurrence[recurrence]"
            :key="chore.id"
            :class="{ completed: chore.completed }"
            class="chore-item"
          >
            <label class="chore-label">
              <input
                type="checkbox"
                :checked="chore.completed"
                @change="toggleChore(chore.id)"
              />
              <span class="chore-name">{{ chore.name }}</span>
            </label>
            <button @click="removeChore(chore.id)" class="remove-btn" aria-label="Remove chore">
              ×
            </button>
          </li>
        </ul>
        <p v-if="choresByRecurrence[recurrence].length === 0" class="empty-message">
          No {{ recurrenceLabels[recurrence].toLowerCase() }} tasks
        </p>
      </section>
    </div>

    <button
      v-if="completedCount > 0"
      @click="clearCompleted"
      class="clear-btn"
    >
      Clear completed
    </button>
  </div>
</template>

<style scoped>
.chore-app {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

header {
  text-align: center;
  margin-bottom: 1.5rem;
}

h1 {
  font-size: 2.5rem;
  color: #667eea;
  margin-bottom: 0.25rem;
}

.tagline {
  color: #888;
  font-size: 0.9rem;
}

.add-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.chore-input {
  flex: 1;
  min-width: 150px;
  padding: 0.75rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.chore-input:focus {
  outline: none;
  border-color: #667eea;
}

.recurrence-select {
  padding: 0.75rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
}

.recurrence-select:focus {
  outline: none;
  border-color: #667eea;
}

.add-btn {
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.add-btn:hover {
  background: #5a6fd6;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
  font-size: 0.85rem;
}

.pending {
  color: #e67e22;
}

.completed {
  color: #27ae60;
}

.buckets {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.task-bucket {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
}

.bucket-title {
  font-size: 1rem;
  color: #667eea;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.chore-list {
  list-style: none;
}

.chore-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
  transition: background 0.2s;
}

.chore-item:last-child {
  border-bottom: none;
}

.chore-item:hover {
  background: #f9f9f9;
}

.chore-item.completed .chore-name {
  text-decoration: line-through;
  color: #aaa;
}

.chore-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  flex: 1;
}

.chore-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.chore-name {
  font-size: 1rem;
}

.remove-btn {
  background: none;
  border: none;
  color: #ccc;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0 0.5rem;
  line-height: 1;
  transition: color 0.2s;
}

.remove-btn:hover {
  color: #e74c3c;
}

.empty-message {
  color: #aaa;
  font-size: 0.85rem;
  font-style: italic;
}

.clear-btn {
  width: 100%;
  padding: 0.75rem;
  background: #f0f0f0;
  border: none;
  border-radius: 8px;
  color: #666;
  cursor: pointer;
  transition: background 0.2s;
}

.clear-btn:hover {
  background: #e0e0e0;
}
</style>
