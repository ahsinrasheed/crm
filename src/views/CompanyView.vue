<template>
    <Company />
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  // Components
  import Company from '../components/company/Company.vue';
  
  export default defineComponent({
    name: 'CompanyView',
  
    components: {
        Company,
    },
  });
  </script>
  