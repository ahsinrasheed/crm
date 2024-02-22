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
        <v-breadcrumbs
          :items="['Home', 'Dashboard', 'Department']"
        ></v-breadcrumbs>
      </div>
      <div>
        <DepartmentRegistor
          @departmentAdded="handleActionType('add')"
          @add-department="handleaddingFinished"
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
          <EditDepartment
            :item="item"
            @departmentEdit="handleActionType('edit')"
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
                v-model="name"
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
import DepartmentRegistor from "./DepartmentRegistor.vue";
import EditDepartment from "./EditDepartment.vue";

export default {
  name: "Company",

  components: {
    Navbar,
    Sidebar,
    DepartmentRegistor,
    EditDepartment,
  },

  data() {
    return {
      snackbar: false,
      snackbarMessage: "",
      headers: [
        {
          title: "Department Name",
          align: "start",
          sortable: false,
          key: "departmentName",
        },
        { title: "Description", key: "description", align: "start" },
        { title: "Company Name", key: "companyName", align: "start" },
        { title: "Action", key: "action", align: "start" },
      ],
      serverItems: [],
      itemsPerPage: 5,
      loading: true,
      totalItems: 0,
      name: "",
      search: "",
      currentPage: 1,
    };
  },
  watch: {
    name() {
      this.search = String(Date.now());
    },
  },
  mounted() {
    this.loadLocalStorageData();
  },
  methods: {
    loadLocalStorageData() {
      const loggedIn = JSON.parse(localStorage.getItem("loggedIn"));

      if (loggedIn) {
        const localStorageData = JSON.parse(localStorage.getItem("departments"));

        const departments = localStorageData.filter(
          (departments) =>
          departments.companyName === `${loggedIn.companyName}` ||
            loggedIn.role === "1"
        );

        if (departments) {
          this.serverItems = departments;
          this.totalItems = departments.length;
        }
      } else {
        const localStorageData = JSON.parse(localStorage.getItem("departments"));

        if (localStorageData) {
          this.serverItems = localStorageData;
          this.totalItems = localStorageData.length;
        }
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
        const localStorageData = JSON.parse(
          localStorage.getItem("departments")
        );

        if (localStorageData) {
          const updatedLocalStorageData = localStorageData.filter(
            (localStorageItem) => localStorageItem.id !== item.id
          );
          localStorage.setItem(
            "departments",
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
        this.snackbarMessage = "Department added successfully";
      } else if (type === "edit") {
        this.snackbarMessage = "Department edited successfully";
      }
      this.snackbar = true;
    },
  },
};
</script>
  
    <style scoped>
</style>
    