<template>
    <Departments />
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  // Components
  import Departments from '../components/department/Departments.vue';
  
  export default defineComponent({
    name: 'DepartmentView',
  
    components: {
        Departments,
    },
  });
  </script>
  