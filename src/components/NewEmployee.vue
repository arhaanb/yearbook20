<template>
  <div id="new-employee">
    <h3 id="heading">New Student</h3>
    <div class="row">
      <form @submit.prevent="saveEmployee" class="col s12">
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
          <div class="input-field col s12" type="number">
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
            <label>Image Link</label>
            <input type="text" class="u-full-width" v-model="image" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <label>Quote</label>
            <input type="text" class="u-full-width" v-model="quote" required />
          </div>
        </div>
        <div class="buttons">       
          <router-link to="/" class="button">Cancel</router-link>
          <button type="submit" class="button-primary">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "new-employee",
  data() {
    return {
      employee_id: null,
      name: null,
      dept: null,
      position: null
    };
  },
  methods: {
    saveEmployee() {
      db.collection("employees")
        .add({
          employee_id: this.employee_id,
          name: this.name,
          image: this.image,
          classes: this.classes,
          section: this.section,
          quote: this.quote
        })
        .then(docRef => {
          console.log("Client added: ", docRef.id);
          this.$router.push("/");
        })
        .catch(error => {
          console.error("Error adding employee: ", error);
        });
    }
  }
};
</script>

<style>
</style>