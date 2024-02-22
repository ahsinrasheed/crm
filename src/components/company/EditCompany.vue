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
            v-model="formData.companyName"
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
        companyName: "",
        employees: "",
        description: "",
      },
      nameRules: [(v) => !!v || "Company Name is required"],
      employeesRules: [
        (v) => !!v || "Number of Employees is required",
        (v) => /^[0-9]+$/.test(v) || "Must be a valid number",
      ],
      descriptionRules: [(v) => !!v || "Address is required"],
    };

  },
  mounted() {
    this.populateFormData();
  },

  methods: {
    populateFormData(){
        if (this.item) {
        this.formData.companyName = this.item.companyName;
        this.formData.employees = this.item.employees;
        this.formData.description = this.item.description;
      }

    },

    EditCompany() {

        const localStorageData = JSON.parse(localStorage.getItem("companies"));
        const index = localStorageData.findIndex((i) => i.id === this.item.id);
        if (index !== -1) {
            localStorageData[index] = { ...localStorageData[index], ...this.formData };
            localStorage.setItem("companies", JSON.stringify(localStorageData));

            this.$emit('companyEdit')  
            this.$emit('editing-finished'); 
            this.loading = false;
            this.dialog =  false;
        }
    },
  },
};
</script>
  
    <style scoped>
</style>
    