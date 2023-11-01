import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { notify } from '@kyvg/vue3-notification'

export const useToDoStore = defineStore('toDo', () => {
  const toDoList = ref([])
  const counterList = computed(() => toDoList.value.length)

  const addToDo = (toDo) => {
    toDoList.value.push(toDo)
    localStorage.setItem('toDoList', JSON.stringify(toDoList.value))
  }

  const setTodo = () => {
    if (localStorage.getItem('toDoList')) {
      toDoList.value = JSON.parse(localStorage.getItem('toDoList'))
    }
  }

  const removeToDo = (index) => {
    toDoList.value.splice(index, 1)
    notify({
      title: 'Success',
      text: 'Todo deleted successfully',
      type: 'success'
    })
    localStorage.setItem('toDoList', JSON.stringify(toDoList.value))
  }

  const setCompleteToDo = (index) => {
    toDoList.value[index].completed = !toDoList.value[index].completed
    localStorage.setItem('toDoList', JSON.stringify(toDoList.value))
    notify({
      title: 'Success',
      text: 'Todo updated successfully',
      type: 'success'
    })
  }

  return {
    toDoList,
    counterList,
    addToDo,
    setTodo,
    removeToDo,
    setCompleteToDo
  }
})
