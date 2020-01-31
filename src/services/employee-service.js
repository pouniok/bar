/**
 * @file
 * Employee service - Handles interactions with the backend.
 */
export default class EmployeeService {
  constructor () {
    this.BASE_URL = 'http://api.godhateusall.com/?action=employees'
  }

  /**
   * Load the list of all employees.
   */
  async getEmployees () {
    const resp = await fetch(this.BASE_URL)
    const data = await resp.json()
    return data.result
  }
}
