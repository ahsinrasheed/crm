<template>
    <v-dialog v-model="dialog" persistent width="600">
      <template v-slot:activator="{ props }">
        <v-icon small v-bind="props" class="text-red" icon="mdi-pencil"></v-icon>
      </template>
      <v-card>
        <v-card-title>
          <h2 class="d-flex align-center">User Edit</h2>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="" class="px-3">
            <v-text-field
              label="Name"
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
            />
            <v-text-field
              label="Enter Password"
              v-model="formData.password"
              :rules="passwordRules"
            />
            <v-select
              v-model="formData.companyName"
              :items="companyList"
              label="Select a Company"
              item-text="companyname"
            ></v-select>
            <v-select
              v-model="formData.departmentName"
              :items="departmentList"
              label="Select a Department Name"
              item-text="departmentName"
            ></v-select>
            <div>
              <v-btn class="bg-red" variant="text" @click="dialog = false"
                >Close
              </v-btn>
              <v-btn class="bg-indigo" :loading="false" @click="EditUser(item)"
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
    name: "EditUser",
    props: {
      item: Object,
    },
  
    data() {
      return {
        dialog: false,
        loading: false,
        companyList: {},
        departmentList: {},
        formData: {
          name: "",
          userName: "",
          role:"",
          password:"",
          companyName: "",
          departmentName: "",
        },
        nameRules: [(v) => !!v || "Name is required"],
        userNameRules: [(v) => !!v || "User Name is required"],
        roleRules: [(v) => !!v || "User role is required"],
        passwordRules: [(v) => !!v || "Password is required"],
      };
    },
    mounted() {
      this.getCompaniesName();
      this.getDepartmentsName();
      this.populateFormData();
    },
  
    methods: {
      populateFormData() {
        if (this.item) {
          this.formData.name = this.item.name;
          this.formData.userName = this.item.userName;
          this.formData.role = this.item.role;
          this.formData.password = this.item.password;
          this.formData.companyName = this.item.companyName;
          this.formData.departmentName = this.item.departmentName;
        }
      },
  
      getDepartmentsName() {
        let departmentNameList = localStorage.getItem("departments");
        if (departmentNameList) {
          this.formData.departmentName = JSON.parse(departmentNameList);
          this.departmentList = this.formData.departmentName.map(
            (department) => department.departmentName
          );
        } else {
          this.departmentList = this.formData.departmentName;
        }
      },
      getCompaniesName() {
          let companyNameList = localStorage.getItem("companies");
          if (companyNameList) {
  
            this.formData.companyName = JSON.parse(companyNameList);
            this.companyList = this.formData.companyName.map(company => company.companyName);
          }
      },
  
      EditUser() {
        const localStorageData = JSON.parse(localStorage.getItem("users"));
        const index = localStorageData.findIndex((i) => i.id === this.item.id);
        if (index !== -1) {
          localStorageData[index] = {
            ...localStorageData[index],
            ...this.formData,
          };
          localStorage.setItem("users", JSON.stringify(localStorageData));
  
          this.$emit("userEdit"); // for Rerandring
          this.$emit("editing-finished"); // for showing result
  
          this.loading = false;
          this.dialog = false;
        }
      },
    },
  };
  </script>
        
          <style scoped>
  </style>
          