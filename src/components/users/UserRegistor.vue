<template>
  <v-dialog v-model="dialog" persistent width="600">
    <template v-slot:activator="{ props }">
      <v-btn color="primary" v-bind="props">
        Add User
        <v-tooltip activator="parent" location="top"
          >Add New User</v-tooltip
        >
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h2 class="d-flex align-center">User Registor</h2>
      </v-card-title>
      <v-card-text>
        <v-form
          @submit.prevent="submit"
          class="px-3"
          ref="form"
        >
          <v-text-field
            label="name"
            v-model="formData.name"
            :rules="nameRules"
          />
          <v-text-field
            label="User Name"
            v-model="formData.userName"
            :rules="userNameRules"
          />
          <v-text-field
            label="Enter User Role"
            v-model="formData.role"
            :rules="roleRules"
            type="number"
          />
          <v-text-field
            label="Enter your Password"
            v-model="formData.password"
            :rules="passwordRules"
            type="password"
          />
          <!--  Get Company Name Here  -->
          <v-select
            v-model="formData.companyName"
            :items="companyList"
            label="Select a Company"
            item-text="companyname"
            :rules="companyNameRules"
          ></v-select>

          <v-select
            v-model="formData.departmentName"
            :items="departmentList"
            label="Select a department"
            item-text="departmentname"
            :rules="departmentNameRules"
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
export default {
  name: "UserRegistor",

  data() {
    return {
      dialog: false,
      loading: false,
      companyList: {},
      departmentList: {},
      formData: {
          name: "",
          userName: "",
          password:"",
          role: null,
        companyName: "Select any Company",
        departmentName: "Select any Department",
      },
      nameRules: [(v) => !!v || "Name is required"],
      passwordRules: [(v) => !!v || "Password is required",
            (v) => (v && v.length >= 8) || "Password must be larger than 08 characters",],
      roleRules: [(v) => !!v || "Role is required"],
      userNameRules: [(v) => !!v || "User Name is required"],
      companyNameRules: [(v) => !!v || "Company Name is required"],
      departmentNameRules: [(v) => !!v || "Company Name is required"],
    };
  },
  mounted() {
    this.getCompaniesName();
    this.getDepartmentsName();
  },
  methods: {

    getCompaniesName() {
      let companyNameList = localStorage.getItem("companies");
      if (companyNameList) {

        this.formData.companyName = JSON.parse(companyNameList);
        this.companyList = this.formData.companyName.map(company => company.companyName);
      }

      
    },
    
    getDepartmentsName() {

      let departmentNameList = localStorage.getItem("departments");
      if (departmentNameList) {
        this.formData.departmentName = JSON.parse(departmentNameList);
        this.departmentList = this.formData.departmentName.map(department => department.departmentName);
      } else{
          this.departmentList = this.formData.departmentName
      }
    },

    submit() {
      if (
        !this.formData.name ||
        !this.formData.userName ||
        !this.formData.role ||
        !this.formData.departmentName ||
        !this.formData.companyName||
        !this.formData.password
      ) {
        alert("Fill the Form ");
      } else {
        this.loading = true;

        const departmentId = Date.now().toString();

        const newUsers = {
          id: departmentId,
          name: this.formData.name,
          userName: this.formData.userName,
          departmentName: this.formData.departmentName,
          companyName: this.formData.companyName,
          password: this.formData.password,
          role: this.formData.role,
        };

        // Push the new company data to the array of companies
        
        let users = JSON.parse(localStorage.getItem("users")) || [];
        

        users.push(newUsers);

        localStorage.setItem("users", JSON.stringify(users));
        this.$emit("add-Users");

        this.loading = false;
        this.formData = {};
        this.dialog = false;
        this.$emit("UsersAdded");
      }
    },
  },
};
</script>
  
    <style scoped>
</style>
    