/**
 * @file
 * AfterworkService service - Handles interactions with the backend.
 */
export default class AfterworkService {
  constructor() {
    this.BASE_URL = 'http://api.godhateusall.com/'
  }

  /**
   * Load the list of all afterworks.
   */
  async getAfterworks() {
    const resp = await fetch(this.BASE_URL + '?action=getsorties')
    const data = await resp.json()
    return data.result
  }

  /**
   * Load the list of all afterworks.
   */
  async getBars() {
    const resp = await fetch(this.BASE_URL + '?action=bars')
    const data = await resp.json()
    return data.result
  }
}
