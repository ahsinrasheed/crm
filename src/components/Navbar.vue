<template>
    <v-toolbar
      class="flex-grow-0"
      dark
      color="indigo"
      shaped
      height="90px"
    >
      <v-toolbar-title>Logo</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <router-link to="/login">
            <v-icon class="text-white" >mdi-account</v-icon>
        </router-link>
      </v-btn>
    </v-toolbar>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
</style>