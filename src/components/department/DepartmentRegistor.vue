<template>
  <v-dialog v-model="dialog" persistent width="600">
    <template v-slot:activator="{ props }">
      <v-btn color="primary" v-bind="props">
        Add Department
        <v-tooltip activator="parent" location="top"
          >Add New Department</v-tooltip
        >
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h2 class="d-flex align-center">Department Registor</h2>
      </v-card-title>
      <v-card-text>
        <v-form
          @submit.prevent="submit"
          class="px-3"
          ref="form"
          
        >
          <v-text-field
            label="Department Name"
            v-model="formData.departmentName"
            :rules="nameRules"
          />
          <v-text-field
            label="Description"
            v-model="formData.description"
            :rules="descriptionRules"
          />
          <!--  Get Company Name Here  -->
          <v-select
            v-model="formData.companyName"
            :items="companyList"
            label="Select a Company"
            item-text="companyname"
          ></v-select>

          <v-btn class="bg-red" variant="text" @click="dialog = false"
            >Close
          </v-btn>
          <v-btn class="mr-4 bg-indigo" type="submit" :loading="false"
            >Submit</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
    
  <script>
import { ref } from "vue";

export default {
  name: "DepartmentRegistor",

  data() {
    return {
      dialog: false,
      loading: false,
      companyList: null,
      formData: {
        departmentName: "",
        companyName: "Select Any Company",
        description: "",
      },
      nameRules: [(v) => !!v || "Department Name is required"],
      companyNameRules: [(v) => !!v || "Company Name is required"],
      descriptionRules: [(v) => !!v || "Description  is required"],
    };
  },
  mounted() {
    this.getCompaniesName();
  },
  methods: {
    getCompaniesName() {
      this.formData.companyName = 'Choose any company'


      let companiesNameList = localStorage.getItem("companies");

      if (companiesNameList) {

        this.formData.companyName = JSON.parse(companiesNameList);

        this.companyList = this.formData.companyName.map(company => company.companyName);
      }
    },

    submit() {
      if (
        !this.formData.departmentName ||
        !this.formData.companyName ||
        !this.formData.description
      ) {
        alert("Fill the Form ");
      } else {
        this.loading = true;

        const departmentId = Date.now().toString();

        const newDepartment = {
          id: departmentId,
          departmentName: this.formData.departmentName,
          companyName: this.formData.companyName,
          description: this.formData.description,
        };

        // Push the new company data to the array of companies
        
        let departments = JSON.parse(localStorage.getItem("departments")) || [];
        

        departments.push(newDepartment);

        localStorage.setItem("departments", JSON.stringify(departments));

        this.$emit("add-department");

        this.loading = false;
        this.formData = {};
        this.dialog = false;
        this.$emit("departmentAdded");
      }
    },
  },
};
</script>
  
    <style scoped>
</style>
    