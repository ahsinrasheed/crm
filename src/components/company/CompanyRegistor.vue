<template>
  <v-dialog v-model="dialog" persistent width="600">
    <template v-slot:activator="{ props }">
      
      <v-btn color="primary" v-bind="props"> 
        Add Company 
        <v-tooltip
        activator="parent"
        location="top"
      >Add New Comapny</v-tooltip>

      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h2 class="d-flex align-center">Company Registor</h2>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submit" class="px-3" ref="form" >
          <v-text-field
            label="Company Name"
            v-model="formData.name"
            :rules="nameRules"
          />
          <v-text-field
            label="Employees"
            type="number"
            v-model="formData.employees"
            :rules="employeesRules"
          />
          <v-text-field
            label="Description"
            v-model="formData.description"
            :rules="descriptionRules"
          />

          <v-btn class="bg-red" variant="text" @click="dialog = false"
            >Close
          </v-btn>
          <v-btn class="mr-4 bg-indigo" type="submit" :loading="false" >Submit</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
  
<script>
import { ref } from "vue";

export default {
  name: "CompanyRegistor",
  data() {
    return {
      dialog: false,
      loading: false,
      formData: {
        name: "",
        employees: "",
        websiteUrl: "",
        email: "",
        phoneNumber: "",
        address: "",
      },
      nameRules: [(v) => !!v || "Company Name is required"],
      employeesRules: [
        (v) => !!v || "Number of Employees is required",
        (v) => /^[0-9]+$/.test(v) || "Must be a valid number",
      ],
      websiteUrlRules: [
        (v) => !!v || "Website URL is required",
        (v) => /^(ftp|http|https):\/\/[^ "]+$/.test(v) || "Must be a valid URL",
      ],
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      ],
      phoneNumberRules: [
        (v) => !!v || "Phone Number is required",
        (v) => /^[0-9]+$/.test(v) || "Must be a valid number",
      ],
      addressRules: [(v) => !!v || "Address is required"],
    };
  },
  methods: {

    submit() {
      if (
        !this.formData.name ||
        !this.formData.employees ||
        !this.formData.websiteUrl ||
        !this.formData.email ||
        !this.formData.phoneNumber ||
        !this.formData.address
      ) {
        alert("Fill the Form ");
      }else{

        this.loading = true
        const companyId = Date.now().toString();
        const newCompany = {
          id: companyId,
          name: this.formData.name,
          employees: this.formData.employees,
          websiteUrl: this.formData.websiteUrl,
          email: this.formData.email,
          phoneNumber: this.formData.phoneNumber,
          address: this.formData.address,
        };

        // Push the new company data to the array of companies
        let companies = JSON.parse(localStorage.getItem("companies")) || [];
        companies.push(newCompany);
        localStorage.setItem("companies", JSON.stringify(companies));

        this.loading= false;
        this.formData = {};
        this.dialog = false;
        this.$emit('companyAdded')

      }
      
    },
  },
};
</script>

  <style scoped>
</style>
  