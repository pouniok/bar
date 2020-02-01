/**
 * @file
 * Employee service - Handles interactions with the backend.
 */
export default class EmployeeService {
  constructor() {
    this.BASE_URL = 'http://api.godhateusall.com/'
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
