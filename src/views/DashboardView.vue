<template>
  <Dashboard />
</template>

<script>
import { defineComponent } from 'vue';

// Components
import Dashboard from '../components/Dashboard.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    Dashboard,
  },
});
</script>
