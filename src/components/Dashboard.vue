<template>
    <Navbar />
    <Sidebar />
    <v-container>
      <div>
        <v-breadcrumbs :items="['Home', 'Dashboard']"></v-breadcrumbs>
      </div>
  
      <v-row wrap>
        <v-col  cols="12" xs="12" sm="4" md="6" lg="3">
          <v-card  class="bg-grey text-center ma-2">
            <v-card-item>
              <v-icon class="text-white" icon="mdi-view-dashboard"></v-icon>
              <v-card-title>Campany Details</v-card-title>
              <v-card-subtitle>Here Details comes</v-card-subtitle>
            </v-card-item>
          </v-card>
        </v-col>
        <v-col  cols="12" xs="12" sm="4" md="6" lg="3">
          <v-card  class="bg-red text-center ma-2">
            <v-card-item>
              <v-card-title>Users Details</v-card-title>
              <v-card-subtitle>Here Details comes</v-card-subtitle>
            </v-card-item>
          </v-card>
        </v-col>
        <v-col  cols="12" xs="12" sm="4" md="6" lg="3">
          <v-card  class="bg-indigo text-center ma-2">
            <v-card-item>
              <v-card-title>Status</v-card-title>
              <v-card-subtitle>Here Details comes</v-card-subtitle>
            </v-card-item>
          </v-card>
        </v-col>
        <v-col  cols="12" xs="12" sm="4" md="6" lg="3">
          <v-card  class="bg-green text-center ma-2">
            <v-card-item>
              <v-card-title>Departments</v-card-title>
              <v-card-subtitle>Here Details comes</v-card-subtitle>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import Navbar from "./Navbar.vue";
  import Sidebar from "./Sidebar.vue";
  
  export default {
    name: "Dashboard",
    components: {
      Navbar,
      Sidebar,
    },
  };
  </script>
  
  <style scoped>
  </style>