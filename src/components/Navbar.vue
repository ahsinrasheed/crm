<template>
 
  <v-toolbar class="flex-grow-0" dark color="indigo" shaped height="90px">
    <v-app-bar-nav-icon variant="text" @click="$store.commit('stop')" ></v-app-bar-nav-icon>
    <v-toolbar-title >
      <img src="../assets/logo.png"  height="50" alt="logo">
      
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <div class="userImage">
      <img :src="imageData"  height="50" alt=" User">
    </div>
    
    <router-link to="/login" class="text-white">
      <v-btn  v-if="!isLoggedIn" prepend-icon="mdi-login">
        Login
      </v-btn>
    </router-link>

    <v-btn v-if="isLoggedIn"  prepend-icon="mdi-logout" @click="logout" >
        Logout
    </v-btn>
  </v-toolbar>
</template>
<script>
export default {
  name: "Navbar",
  data(){
    return{
      imageData:'',
    }
  },

  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    }
  },
  mounted (){
    this.imageData = localStorage.getItem("imageUrl")
  },
  methods:{
    logout(){
      localStorage.removeItem("token");
      this.$store.commit("logout");
      this.$router.push({ name: "login" });
    }
  },
};
</script>

<style scoped>
.userImage{
  display: flex;
}
.userImage img{
  border-radius: 50%;
  width: 50px;
  height: 50px;
}
</style>