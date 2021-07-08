/**
 * @file
 * Employee service - Handles interactions with the backend.
 */
export default class EmployeeService {
  constructor() {
    this.BASE_URL = 'https://api.godhateusall.com/'
  }

  /**
   * Load the list of all employees.
   */
  async getEmployees() {
    const resp = await fetch(this.BASE_URL + '?action=employees')
    const data = await resp.json()
    return data.result
  }

  /**
   * Add an employee
   */
  async addEmployee(employee) {
    // Encodage des paramètres pour l'API
    employee = Object.keys(employee).map(function(k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(employee[k])
    }).join('&')

    const resp = await fetch(this.BASE_URL + `?action=employee-add&${employee}`)
    const data = await resp.json()
    return data
  }

  /**
   * Remove an employee
   */
  async removeEmployee(employee) {
    const resp = await fetch(this.BASE_URL + `?action=employee-delete&id=${employee.id}`)
    const data = await resp.json()
    return data
  }

  /**
   * Remove a bar for an employee
   */
  async removeBarForEmployee(employeeId, barId) {
    const resp = await fetch(this.BASE_URL + `?action=bar-employee-delete&employee_id=${employeeId}&bar_id=${barId}`)
    const data = await resp.json()
    return data
  }

  /**
   * Add a bar for an employee
   */
  async addBarForEmployee(employeeId, placeInfo) {
    const location = placeInfo.geometry.location.toJSON()

    let params = {
      ...location,
      action: 'bar-employee-add',
      employee_id: employeeId,
      bar_name: placeInfo.name
    }

    // Encodage des paramètres pour l'API
    params = Object.keys(params).map(function(k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
    }).join('&')

    const resp = await fetch(this.BASE_URL + `?${params}`)
    const data = await resp.json()
    return data
  }
}
