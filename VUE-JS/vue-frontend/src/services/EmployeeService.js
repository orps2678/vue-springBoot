import axios from 'axios'

const EMPLOYEE_API_BASE_URL = 'http://localhost:8080/api/employees'

class EmployeeService{
    getEmployees(){
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    // 新增 getEmployeeById 方法
    getEmployeeById(id) {
        return axios.get(`${EMPLOYEE_API_BASE_URL}/${id}`);
    }
}

export default new EmployeeService()