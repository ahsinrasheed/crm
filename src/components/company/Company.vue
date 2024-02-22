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
      Form Submit Successfuly
      <template v-slot:actions>
        <v-btn flat color="red" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </div>
  <v-container>
    <div class="d-flex flex-row align-center justify-space-between mb-6">
      <div>
        <v-breadcrumbs
          :items="['Home', 'Dashboard', 'Company']"
        ></v-breadcrumbs>
      </div>
      <div v-if="!showAdd">
        <CompanyRegistor @companyAdded="snackbar = true" />
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
        item-value="id"
        @update:options="loadItems"
      >
        <template v-slot:[`item.action`]="{ item }">
          <EditCompany :item="item"  @companyEdit="handleActionType('edit')"
            @editing-finished="handleEditingFinished"/>
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
                v-model="companyName"
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
import CompanyRegistor from "./CompanyRegistor.vue";
import EditCompany from "./EditCompany.vue";

export default {
  name: "Company",

  components: {
    Navbar,
    Sidebar,
    CompanyRegistor,
    EditCompany,
  },

  data() {
    return {
      snackbar: false,
      itemsPerPage: 10,
      showAdd: false,
      headers: [
        {
          title: "Company Name",
          align: "start",
          sortable: false,
          key: "companyName",
        },
        { title: "Total Employees", key: "employees", align: "start" },
        { title: "Decrption", key: "description", align: "start" },
        { title: "Action", key: "action", align: "start" }, // Added for delete icon
      ],
      serverItems: [],
      loading: true,
      totalItems: 0,
      companyName: "",
      search: "",
      currentPage: 1,
    };
  },
  watch: {
    companyName() {
      this.search = String(Date.now());
    },
  },
  mounted() {
    this.loadLocalStorageData();
    const loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
      if(loggedIn.role == "0"){
        this.showAdd = true
      }
  },
  methods: {
    loadLocalStorageData() {
      const loggedIn = JSON.parse(localStorage.getItem("loggedIn"));

      if (loggedIn) {
        const localStorageData = JSON.parse(localStorage.getItem("companies"));
        console.log(localStorageData);

        const companies = localStorageData.filter(
          (compnay) =>
            compnay.companyName === `${loggedIn.companyName}` ||
            loggedIn.role === "1"
        );

        if (companies) {
          this.serverItems = companies;
          this.totalItems = companies.length;
        }
      } else {
        const localStorageData = JSON.parse(localStorage.getItem("companies"));

        if (localStorageData) {
          this.serverItems = localStorageData;
          this.totalItems = localStorageData.length;
        }
        console.log("not working");
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
        const localStorageData = JSON.parse(localStorage.getItem("companies"));
        if (localStorageData) {
          const updatedLocalStorageData = localStorageData.filter(
            (localStorageItem) => localStorageItem.id !== item.id
          );
          localStorage.setItem(
            "companies",
            JSON.stringify(updatedLocalStorageData)
          );
        }
      }

      // Implement delete logic here
      console.log("Deleting item:", item);
    },
    editItem(item) {
      console.log("Edit Item ", item);
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
        this.snackbarMessage = "Company added successfully";
      } else if (type === "edit") {
        this.snackbarMessage = "Company edited successfully";
      }
      this.snackbar = true;
    },
  },
};
</script>

  <style scoped>
</style>
  