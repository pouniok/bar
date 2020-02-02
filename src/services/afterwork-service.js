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

  /**
   * Add a new Afterwork
   * @param bar Bar object
   * @param date Date of next afterwork
   * @returns {Promise<any>}
   */
  async addAfterwork(bar, date) {
    const resp = await fetch(this.BASE_URL + `?action=sorties&state=new&date=${date}&bar=${bar.id}`)
    const data = await resp.json()
    return data
  }

  /**
   * Remove an Afterwork
   * @param afterwork Afterwork object
   * @returns {Promise<any>}
   */
  async removeAfterwork(afterwork) {
    const resp = await fetch(this.BASE_URL + `?action=sortie-delete&id=${afterwork.id}`)
    const data = await resp.json()
    return data
  }
}
