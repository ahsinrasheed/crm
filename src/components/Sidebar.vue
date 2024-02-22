<template>
  <div>
    <v-navigation-drawer
      expand-on-hover
      rail
      v-model="drawerValue"
      app
      class="bg-indigo"
    >
      <v-list>
        <v-list-item
          title="CRM Project"
          subtitle="Make Your File Easy"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <router-link to="/" class="text-white">
          <v-list-item
            prepend-icon="mdi-view-dashboard"
            title="Dashboard"
            value="dashboard"
          ></v-list-item
        ></router-link>

        <router-link to="/company" class="text-white">
          <v-list-item
            prepend-icon="mdi-office-building"
            title="Company"
            value="company"
          ></v-list-item>
        </router-link>

        <router-link v-if="type"  to="/department" class="text-white">
          <v-list-item
            prepend-icon="mdi-domain"
            title="Department"
            value="department"
          ></v-list-item>
        </router-link>

        <router-link to="/users" class="text-white">
        <v-list-item
          prepend-icon="mdi-account-group"
          title="Users"
          value="users"
        ></v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "Sidebar",
  data() {
    return {
      drawer: null,
    };
  },
  computed: {
    drawerValue: () => store.state.drawer,
    type:()=> {
     return store.state.type

    }
  },
};
</script>

<style scoped>
</style>