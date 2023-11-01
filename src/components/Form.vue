<script setup>
import { ref, onBeforeMount } from 'vue'
import { useToDoStore } from '../stores/toDo'
import { notify } from "@kyvg/vue3-notification";
import useValidateSpaces from '../composables/useValidateSpaces'

const toDoStore = useToDoStore()

const form = ref({
  name: '',
  description: '',
})

const onSubmit = () => {
  if(!useValidateSpaces(form.value.name) || !useValidateSpaces(form.value.description)) return notify({
    title: "Error",
    text: "Please fill all the fields without spaces",
    type: "error",
  });
  if(!form.value.name || !form.value.description) return notify({
    title: "Error",
    text: "Please fill all the fields",
    type: "error",
  });
  if(form.value.name.length < 3 || form.value.description.length < 3) return notify({
    title: "Error",
    text: "Please fill all the fields with at least 3 characters",
    type: "error",
  });
  if(form.value.name.length > 50 || form.value.description.length > 50) return notify({
    title: "Error",
    text: "Please fill all the fields with less than 50 characters",
    type: "error",
  });

  toDoStore.addToDo({
    name: form.value.name,
    description: form.value.description,
    completed: false
  })
  form.value.name = ''
  form.value.description = ''
  notify({
    title: "Success",
    text: "To do added",
    type: "success",
  });
}

const onResetForm = () => {
  form.value.name = ''
  form.value.description = ''
}

onBeforeMount(() => {
  toDoStore.setTodo();
})
</script>


<template>
  <div class="container">
    <div class="form">
      <div class="name">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="form.name" />
      </div>
      <div class="description">
        <label for="description">Description</label>
        <input type="text" id="description" v-model="form.description" />
      </div>
      <div class="actions">
        <button class="btn primary submit" @click="onSubmit">Submit</button>
        <button class="btn secondary cancel" @click="onResetForm">Cancel</button>
      </div>
    </div>
  </div>
</template>

<style scoped lant="scss">
.container {
  color: white;
  border: 1px solid white;
  width: 330px;
  text-align: center;
  margin: 10px auto;
  border-radius: 8px;
  padding: 15px;

  .form {
    .name {
      margin-bottom: 15px;
      display: flex;
      flex-direction: column;
    }

    .description {
      margin-bottom: 15px;
      display: flex;
      flex-direction: column;
    }
    .actions {
      margin: 10px 0px;
      .submit {
        margin-right: 10px;
      }
      .cancel{

      }
    }
  }
}

@media screen and (min-width: 768px){
  .container {
    width: 500px;
  }
}

@media screen and (min-width: 1024px){
  .container {
    width: 800px;
  }
}

@media screen and (min-width: 1440px){
  .container {
    width: 1000px;
  }
}
</style>