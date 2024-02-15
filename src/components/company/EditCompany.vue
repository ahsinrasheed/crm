<template>
  <v-dialog v-model="dialog" persistent width="600">
    <template v-slot:activator="{ props }">
      <v-icon small v-bind="props" class="text-red" icon="mdi-pencil"></v-icon>
    </template>
    <v-card>
      <v-card-title>
        <h2 class="d-flex align-center">Company Registor</h2>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="" class="px-3">
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
            label="WebsiteUrl"
            v-model="formData.websiteUrl"
            :rules="websiteUrlRules"
          />
          <v-text-field
            label="Email"
            v-model="formData.email"
            :rules="emailRules"
          />
          <v-text-field
            label="PhoneNumber"
            v-model="formData.phoneNumber"
            :rules="phoneNumberRules"
          />
          <v-text-field
            label="Address"
            v-model="formData.address"
            :rules="addressRules"
          />
          <div>
            <v-btn class="bg-red" variant="text" @click="dialog = false"
              >Close
            </v-btn>
            <v-btn class="bg-indigo" :loading="false" @click="EditCompany(item)"
              >Update</v-btn
            >
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
    
  <script>
export default {
  name: "EditCompany",
  props: {
    item: Object 
  },

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
  mounted() {
    this.populateFormData();
  },

  methods: {
    populateFormData(){
        if (this.item) {
        this.formData.name = this.item.name;
        this.formData.employees = this.item.employees;
        this.formData.websiteUrl = this.item.websiteUrl;
        this.formData.email = this.item.email;
        this.formData.phoneNumber = this.item.phoneNumber;
        this.formData.address = this.item.address;
      }

    },

    EditCompany() {

        const localStorageData = JSON.parse(localStorage.getItem("companies"));
        const index = localStorageData.findIndex((i) => i.id === this.item.id);
        if (index !== -1) {
            localStorageData[index] = { ...localStorageData[index], ...this.formData };
            localStorage.setItem("companies", JSON.stringify(localStorageData));
            this.loading = false;
            this.dialog =  false;
        }
    },
  },
};
</script>
  
    <style scoped>
</style>
    