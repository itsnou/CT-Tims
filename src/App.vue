<script setup>
import Form from './components/Form.vue';
import ContainerList from './components/ContainerList.vue';
</script>

<template>
  <header>
    <div class="wrapper">
      <Form />
    </div>
  </header>

  <main>
    <ContainerList />
    <notifications position="bottom center"/>
  </main>
</template>
