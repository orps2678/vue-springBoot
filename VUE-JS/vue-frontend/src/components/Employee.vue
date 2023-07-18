<template>
    <div class="container">
        <h1 class="text-center"> Employees List</h1>
        <table class="table table-striped">
            <thead>
                <th>Employees Id</th>
                <th>Employees First Name</th>
                <th>Employees Last Name</th>
                <th>Employees Email</th>
            </thead>
            <tbody>
                <tr v-for = "employee in employees" v-bind:key = "employee.id">
                    <td> {{employee.id }}</td>
                    <td> {{employee.firstName }}</td>
                    <td> {{employee.lastName }}</td>
                    <td> {{employee.email }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import EmployeeService from '../services/EmployeeService'

    export default{
        // eslint-disable-next-line
        name : 'employees', 
        data(){
            return{
                employees : []
            }
        },
        methods:{
            getEmployees(){
                EmployeeService.getEmployees().then((response) =>{
                    this.employees = response.data;
                });
            }
        },
        created(){
            this.getEmployees()
        }
    }
</script>
