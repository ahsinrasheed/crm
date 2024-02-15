<template>
  <Navbar />
  <Sidebar />
  <v-container>
    <div class="d-flex flex-row align-center justify-space-between mb-6">
      <div>
        <v-breadcrumbs
          :items="['Home', 'Dashboard', 'Users']"
        ></v-breadcrumbs>
      </div>
    </div>
    <v-row class="pa-4" col="12" md="12">
      <!-- Data table  -->
      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :search="search"
        :headers="headers"
        :items-length="totalItems"
        :items="serverItems"
        :loading="loading"
        item-value="username"
        @update:options="loadItems"
      >
      <template v-slot:[`item.image`]="{ item }">
          <img :src="item.image" alt="img"  width="40px" height="40px"/>
        </template>
        <template v-slot:[`item.action`]="{ item }">
          <v-icon small @click="deleteItem(item)" class="text-red"
            >mdi-delete</v-icon
          >
        </template>
        <template v-slot:tfoot>
          <tr>
            <td>
              <v-text-field
                v-model="username"
                hide-details
                placeholder="Search username..."
                class="ma-2"
                density="compact"
              ></v-text-field>
            </td>
          </tr>
        </template>
      </v-data-table-server>
    </v-row>
  </v-container>
</template>
  
<script>
import Navbar from "../Navbar.vue";
import Sidebar from "../Sidebar.vue";

export default {
  name: "Users",
  components: {
    Navbar,
    Sidebar,
  },

  data() {
    return {
      itemsPerPage: 10,
      headers: [
        {
          title: "ID",
          align: "start",
          sortable: false,
          key: "id",
        },
        { title: "UserName", key: "username", align: "start" },
        { title: "Gander", key: "gender", align: "start" },
        { title: "Email", key: "email", align: "start" },
        { title: "Image", key: "image", align: "start" },
        { title: "Action", key: "action", align: "start" }, 
      ],
      serverItems: [],
      loading: true,
      totalItems: 0,
      username: "",
      search: "",
      currentPage: 1,

    };
  },
  watch: {
    username() {
      this.search = String(Date.now());
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      
      fetch('https://dummyjson.com/users')
        .then(response => response.json())
        .then(data => {
          this.serverItems = data.users;
          this.totalItems = data.users.length;
          this.loading = false;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },

    loadItems() { 
      
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        this.serverItems = this.serverItems.slice(startIndex, endIndex);
      }, 500);
    },

    deleteItem(item) {
      const index = this.serverItems.findIndex((i) => i.id === item.id);

      if (index !== -1) {
        this.serverItems.splice(index, 1);
        this.totalItems--;
       
      }

      // Implement delete logic here
      console.log("Deleting item:", item);
    },
  },
};
</script>

  <style scoped>
</style>
  