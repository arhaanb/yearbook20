<template>
  <div id="dashboard">
    <div id="grid">
      <div class="cardhi" v-for="employee in employees" v-bind:key="employee.id">
        <img v-bind:src="employee.image" draggable="false" class="card-img"/>
        <router-link
          class="edit-link"
          v-bind:to="{ name: 'edit-employee', params: { employee_id: employee.employee_id }}"
        >EDIT</router-link>
        <h4>{{employee.name}}</h4>
        <h5>{{employee.classes}} - {{employee.section}}</h5>
        <h6>{{employee.quote}}</h6>
        
      </div>
    </div>
    

    <!--<ul class="collection with-header">
      <h4>Employees</h4>

      

      <li v-for="employee in employees" v-bind:key="employee.id" class="collection-item">
        <div class="chip">{{employee.dept}}</div>
        {{employee.employee_id}}: {{employee.name}}
        <router-link
          class="secondary-content"
          v-bind:to="{ name: 'view-employee', params: { employee_id: employee.employee_id }}"
        >
          <i class="fa fa-eye"></i>
        </router-link>
      </li>
    </ul>-->

    <div class="fixed-plus">
      <router-link to="/new" class="btn-floating btn-large red">
        <h6>Add students</h6>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "dashboard",
  data() {
    return {
      employees: []
    };
  },
  created() {
    db.collection("employees")
      .orderBy("employee_id")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.data());
          const data = {
            id: doc.id,
            employee_id: doc.data().employee_id,
            name: doc.data().name,
            image: doc.data().image,
            classes: doc.data().classes,
            section: doc.data().section,
            quote: doc.data().quote
          };
          this.employees.push(data);
        });
      });
  }
};






</script>

<style>

</style>