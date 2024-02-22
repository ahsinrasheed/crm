<template>
  <Navbar />
  <Sidebar />
  <div>
    <v-snackbar
      v-model="snackbar"
      color="success"
      location="center"
      rounded="pill"
      :timeout="4000"
    >
      {{ snackbarMessage }}
      <template v-slot:actions>
        <v-btn flat color="red" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </div>
  <v-container>
    <div class="d-flex flex-row align-center justify-space-between mb-6">
      <div>
        <v-breadcrumbs :items="['Home', 'Dashboard', 'Users']"></v-breadcrumbs>
      </div>
      <div>
        <UserRegistor
          @usersAdded="handleActionType('add')"
          @add-users="handleaddingFinished"
        />
      </div>
    </div>
    <v-row class="pa-4" col="12" md="12">
      <!-- Data table  -->
      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :search="search"
        :headers="headers"
        :items-length="totalItems"
        :server-items-length="totalItems"
        :items="serverItems"
        :loading="loading"
        item-value="name"
        @update:options="loadItems"
      >
        <template v-slot:[`item.action`]="{ item }">
          <EditUser
            :item="item"
            @userEdit="handleActionType('edit')"
            @editing-finished="handleEditingFinished"
          />
          <v-icon
            small
            @click="deleteItem(item)"
            class="text-red"
            icon="mdi-delete"
          ></v-icon>
        </template>
        <template v-slot:thead>
          <tr>
            <td>
              <v-text-field
                v-model="userName"
                hide-details
                placeholder="Search name..."
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
import UserRegistor from "./UserRegistor.vue";
import EditUser from "./EditUser.vue";
export default {
  name: "Users",

  components: {
    Navbar,
    Sidebar,
    UserRegistor,
    EditUser,
  },

  data() {
    return {
      snackbar: false,
      itemsPerPage: 5,
      snackbarMessage: "",
      headers: [
        {
          title: "Name",
          align: "start",
          sortable: false,
          key: "name",
        },
        {
          title: "User Name",
          key: "userName",
          align: "start",
        },
        {
          title: "Company Name",
          key: "companyName",
          align: "start",
        },
        {
          title: "Department Name",
          key: "departmentName",
          align: "start",
        },
        { title: "Action", sortable: false, key: "action", align: "start" },
      ],
      serverItems: [],
      loading: true,
      totalItems: 0,
      userName: "",
      search: "",
      currentPage: 1,
    };
  },
  watch: {
    userName() {
      this.search = String(Date.now());
    },
  },
  mounted() {
    this.loadLocalStorageData();
  },
  methods: {
    loadLocalStorageData() {

      const localStorageData = JSON.parse(localStorage.getItem("users"));

      const adminUser = localStorageData.filter((user) => user.role ==='1');
      
      const normalUsers = localStorageData.filter((user) => user.role === '0');

      if (adminUser) {
        this.serverItems = localStorageData;
        this.totalItems = localStorageData.length;
      }
      else if (normalUsers){
       console.log("normal user");
        this.serverItems = normalUsers;
        this.totalItems = normalUsers.length;
      } 

    },

    loadItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;

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

        // Remove item from localStorage
        const localStorageData = JSON.parse(localStorage.getItem("users"));

        if (localStorageData) {
          const updatedLocalStorageData = localStorageData.filter(
            (localStorageItem) => localStorageItem.id !== item.id
          );
          localStorage.setItem(
            "users",
            JSON.stringify(updatedLocalStorageData)
          );
        }
      }

      // Implement delete logic here
      console.log("Deleting item:", item);
    },
    handleEditingFinished() {
      this.loadLocalStorageData();
    },
    handleaddingFinished() {
      this.loadLocalStorageData();
    },

    handleActionType(type) {
      this.actionType = type;
      if (type === "add") {
        this.snackbarMessage = "User added successfully";
      } else if (type === "edit") {
        this.snackbarMessage = "User edited successfully";
      }
      this.snackbar = true;
    },
  },
};
</script>

  <style scoped>
</style>
  