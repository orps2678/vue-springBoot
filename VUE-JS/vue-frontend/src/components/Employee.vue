<template>
    <div class="employee-container">
      <nav class="navbar navbar-expand-lg navbar-light bg-white flex-column">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <!-- 新增回後台首頁的連結 -->
            <li class="nav-item">
              <router-link to="/" class="nav-link">回後台首頁</router-link>
            </li>
            <!-- 其他導航項目 -->
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                權限管理
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><router-link to="/permissions/feature1" class="dropdown-item">子功能1</router-link></li>
                <li><router-link to="/permissions/feature2" class="dropdown-item">子功能2</router-link></li>
                <!-- 更多子功能 -->
                </ul>
            </li>
            <li class="nav-item"><router-link to="/permissions" class="nav-link">權限管理</router-link></li>
            <li class="nav-item"><router-link to="/users" class="nav-link">使用者管理</router-link></li>
            <li class="nav-item"><router-link to="/devices" class="nav-link">裝置管理</router-link></li>
            <li class="nav-item"><router-link to="/push-notifications" class="nav-link">推播管理</router-link></li>
            <li class="nav-item"><router-link to="/system-settings" class="nav-link">系統設定管理</router-link></li>
          </ul>
        </div>
      </nav>
      <div class="row">
        <div class="col-3"></div>
        <div class="content col-6">
          <router-view></router-view>
          <div v-if="$route.path === '/'" class="employee-content">
            <h1 class="text-center">員工列表</h1>
            <div class="search-form form-group">
              <div class="input-group">
                <input v-model="searchId" type="text" class="form-control" placeholder="輸入員工編號" />
                <button @click="getEmployeeById" class="btn btn-primary">查詢</button>
              </div>
            </div>
            <form @submit.prevent="addEmployee">
              <div class="row">
                <!-- 員工資訊輸入框 -->
                <div class="col-md-4 form-group">
                  <label for="firstName">員工名：</label>
                  <input v-model="newEmployee.firstName" type="text" class="form-control" required />
                </div>
                <div class="col-md-4 form-group">
                  <label for="lastName">員工姓：</label>
                  <input v-model="newEmployee.lastName" type="text" class="form-control" required />
                </div>
                <div class="col-md-4 form-group">
                  <label for="email">電子郵件：</label>
                  <input v-model="newEmployee.email" type="email" class="form-control" required />
                </div>
              </div>
              <button type="submit" class="btn btn-primary">新增員工資料</button>
            </form>
            <!-- 員工列表表格 -->
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>員工編號</th>
                  <th>員工名</th>
                  <th>員工姓</th>
                  <th>電子郵件</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="employee in employees" :key="employee.id">
                  <td>{{ employee.id }}</td>
                  <td>{{ employee.firstName }}</td>
                  <td>{{ employee.lastName }}</td>
                  <td>{{ employee.email }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-3"></div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import EmployeeService from '../services/EmployeeService';
  
  export default {
    name: 'EmployeeList',
    setup() {
      const employees = ref([]);
      const searchId = ref('');
      const newEmployee = ref({
        firstName: '',
        lastName: '',
        email: '',
      });
  
      // 定義獲取員工列表的方法
      const getEmployees = () => {
          EmployeeService.getEmployees().then((response) => {
          // 使用 ref 的 .value 屬性來更新員工數據
          employees.value = response.data;
          });
      };
  
      // 定義根據員工編號查詢員工的方法
      const getEmployeeById = () => {
          if (searchId.value.trim() === '') { // 檢查 searchId 是否為空
              getEmployees(); // 如果為空，則獲取所有員工
          } else {
              EmployeeService.getEmployeeById(searchId.value).then((response) => {
                  employees.value = [response.data];
              })
              .catch(() => {
                  employees.value = [];
              });
          }
      };
  
      const addEmployee = () => {
          EmployeeService.addEmployee(newEmployee.value)
          .then(() => {
              // 新增成功後重新獲取員工列表，並清空新增員工表單的資料
              getEmployees();
              newEmployee.value = {
                  firstName: '',
                  lastName: '',
                  email: '',
              };
          })
          .catch((error) => {
              console.error('新增員工失敗:', error);
          });
      };
  
      getEmployees();
  
      return {
        employees,
        searchId,
        newEmployee,
        getEmployeeById,
        addEmployee,
      };
    },
  };
  </script>
  
  <style>
  /* 在這裡自訂你想要的樣式 */
  </style>
  