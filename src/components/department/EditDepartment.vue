<template>
  <v-dialog v-model="dialog" persistent width="600">
    <template v-slot:activator="{ props }">
      <v-icon small v-bind="props" class="text-red" icon="mdi-pencil"></v-icon>
    </template>
    <v-card>
      <v-card-title>
        <h2 class="d-flex align-center">Department Edit</h2>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="" class="px-3">
          <v-text-field
            label="Department Name"
            v-model="formData.departmentName"
            :rules="departmentRules"
          />
          <v-text-field
            label="Description"
            v-model="formData.description"
            :rules="descriptionRules"
          />
          <v-select
            v-model="formData.companyName"
            label="Select a Company"
            item-text="companyname"
            disabled
          ></v-select>
          <div>
            <v-btn class="bg-red" variant="text" @click="dialog = false"
              >Close
            </v-btn>
            <v-btn
              class="bg-indigo"
              :loading="false"
              @click="EditDepartment(item)"
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
  name: "EditDepartment",
  props: {
    item: Object,
  },

  data() {
    return {
      dialog: false,
      loading: false,
      formData: {
        departmentName: "",
        description: "",
        companyName: "",
      },
      departmentRules: [(v) => !!v || "Company Name is required"],
      comapanyRules: [(v) => !!v || "User Name is required"],
      descriptionRules: [(v) => !!v || "Description is required"],
    };
  },
  mounted() {
    this.populateFormData();
  },

  methods: {
    populateFormData() {
      if (this.item) {
        this.formData.departmentName = this.item.departmentName;
        this.formData.description = this.item.description;
        this.formData.companyName = this.item.companyName;
      }
    },

    EditDepartment() {
      const localStorageData = JSON.parse(localStorage.getItem("departments"));
      const index = localStorageData.findIndex((i) => i.id === this.item.id);
      if (index !== -1) {
        localStorageData[index] = {
          ...localStorageData[index],
          ...this.formData,
        };
        localStorage.setItem("departments", JSON.stringify(localStorageData));

        this.$emit("departmentEdit"); // for Rerandring
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
      