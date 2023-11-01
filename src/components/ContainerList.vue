<script setup>
import { ref, watch, computed } from "vue";
import { useToDoStore } from "../stores/toDo";
import { storeToRefs } from "pinia";

const toDoStore = useToDoStore();
const { toDoList, counterList } = storeToRefs(toDoStore);

const complete = ref(false);
const pending = ref(false);
const toDoListFiltered = computed(() => {
  if (complete.value && pending.value) {
    return toDoList.value;
  } else if (complete.value) {
    return toDoList.value.filter(item => item.completed);
  } else if (pending.value) {
    return toDoList.value.filter(item => !item.completed);
  } else {
    return toDoList.value;
  }
});

watch(() => complete.value, value => {
  if (value) {
    pending.value = false;
  }
});

watch(() => pending.value, value => {
  if (value) {
    complete.value = false;
  }
});
</script>

<template>
  <div class="containerList">
    <div class="mb-md">Total Items: {{ counterList }}</div>
    <div class="actions" v-if="counterList">
      <div>
        <h3>Filters</h3>
      </div>
      <div class="completed">
        <input type="checkbox" id="completed" v-model="complete" />
        <label for="completed"> Show completed</label>
      </div>
      <div class="pending">
        <input type="checkbox" id="pending" v-model="pending" />
        <label for="pending"> Show pending</label>
      </div>
    </div>
    <div class="containerLists">
      <h3>To Do List</h3>
      <div class="list" v-if="toDoListFiltered.length">
        <div class="item" v-for="(item, index) in toDoListFiltered" :key="index">
          <div class="name">Name: {{ item.name }}</div>
          <div class="description">Description: {{ item.description }}</div>
          <div class="actions-btn">
            <button 
              v-if="!item.completed" 
              class="btn primary complete" 
              @click="() => toDoStore.setCompleteToDo(index)">
              Complete
            </button>
            <button class="btn secondary delete" @click="() => toDoStore.removeToDo(index)">Delete</button>
          </div>
        </div>
      </div>
      <div  v-else>
        <div class="empty">Empty list</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.containerList {
  color: white;
  border: 1px solid white;
  width: 330px;
  margin: 10px auto;
  border-radius: 8px;
  padding: 15px;
  height: auto;
  .containerLists{
    text-align: center;
    margin-top: 15px;
    h3{
      font-weight: bold;
      margin-bottom: 5px;
    }
  }
  .actions{
    border: 1px solid white;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
    h3{
      font-weight: bold;
    }
    .completed, .pending{
      text-align: left;
    }
    label{
      user-select: none;
    }
  }
  .list {
    margin-top: 10px;
    display: grid;
    grid-gap: 1rem;
    .item{
      width: 100%;
      min-height: 150px;
      border: 1px solid green;
      border-radius: 8px;
      padding: 15px;
      display: grid;
      grid-template-columns: 1fr;
      .actions-btn{
        margin-top: 10px;
        text-align: center;
        button:first-child{
          margin-right: 10px;
        }
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .containerList {
    width: 500px;
  }
}

@media screen and (min-width: 1024px) {
  .containerList {
    width: 800px;
  }
}

@media screen and (min-width: 1440px) {
  .containerList {
    width: 1000px;
  }
}

</style>