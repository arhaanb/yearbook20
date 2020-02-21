<template>
  <div id="new-employee">
    <h3 id="heading">Edit Student</h3>
    <div class="row">
      <form @submit.prevent="updateEmployee" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <label>Student ID#</label>
            <input type="text" class="u-full-width" v-model="employee_id" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <label>Name</label>
            <input type="text" class="u-full-width" v-model="name" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <label>Class</label>
            <input type="text" class="u-full-width" v-model="classes" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <label>Section</label>
            <input type="text" class="u-full-width" v-model="section" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <label>Image</label>
            <input type="text" class="u-full-width" v-model="image" required />
          </div>
        </div>
        <div class="row">
          <div>
            <label>Quote</label>
            <input type="text" class="u-full-width" v-model="quote" required />
          </div>
        </div>
        <div class="buttons">
          <router-link to="/" class="button">Cancel</router-link>
          <button type="submit" class="button-primary">Submit</button>
          <button @click="deleteEmployee" class="u-pull-right delete">Delete</button>
          <div class="u-cf"></div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "edit-employee",
  data() {
    return {
      employee_id: null,
      name: null,
      quote: null,
      classes: null,
      section: null,
      image: null
    };
  },
  beforeRouteEnter(to, from, next) {
    db.collection("employees")
      .where("employee_id", "==", to.params.employee_id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.employee_id = doc.data().employee_id;
            vm.name = doc.data().name;
            vm.image = doc.data().image;
            vm.quote = doc.data().quote;
            vm.classes = doc.data().classes;
            vm.section = doc.data().section;
          });
        });
      });
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      db.collection("employees")
        .where("employee_id", "==", this.$route.params.employee_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.employee_id = doc.data().employee_id;
            this.name = doc.data().name;
            this.classes = doc.data().classes;
            this.section = doc.data().section;
            this.image = doc.data().image;
            this.quote = doc.data().quote;
          });
        });
    },
    updateEmployee() {
      db.collection("employees")
        .where("employee_id", "==", this.$route.params.employee_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref
              .update({
                employee_id: this.employee_id,
                name: this.name,
                classes: this.classes,
                section: this.section,
                quote: this.quote,
                image: this.image
              })
              .then(() => {
                this.$router.push({
                  name: "dashboard",
                  params: { employee_id: this.employee_id }
                });
              });
          });
        });
    },
    deleteEmployee() {
      if (confirm("Are you sure?")) {
        db.collection("employees")
          .where("employee_id", "==", this.$route.params.employee_id)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref.delete();
              this.$router.push("/");
            });
          });
      }
    }
  }
};
</script>