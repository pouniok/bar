/**
 * @file
 * Newsletters service - Handles interactions with the backend.
 */
export default class NewsletterService {
  constructor() {
    this.BASE_URL = 'http://api.godhateusall.com/newsletters.php'
  }

  /**
   * Load the list of all employees.
   */
  async getNewsletters() {
    const resp = await fetch(this.BASE_URL)
    return await resp.json()
  }

  /**
   * Add an employee
   */
  async getNewsletter(newsletterId) {
    const resp = await fetch(this.BASE_URL + `?newsletterId=${newsletterId}`)
    return await resp.json()
  }
}
