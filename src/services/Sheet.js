/**
 * A service to fetch the produts from a Google Sheet
 */
export default class Sheet {
  /**
   * @param {Object} param
   * @param {Array} param.cols The colomns to serialize
   * @param {String} param.sheetId The Google Sheet ID
   */
  constructor({
    cols = [],
    sheetId = '',
  }) {
    Object.assign(this, {
      cols,
      sheetId,
    });
  }

  /**
   * Load the data and serialize it
   * @return {Promise.<Array>}
   */
  async loadData() {
    const data = await Sheet.fetchData(this.sheetId);
    return Sheet.serializeData(data, this.cols);
  }

  /**
   * Serialize an entire Google Sheet
   * @param {Array} data
   * @param {Array} cols
   * @return {Array}
   */
  static serializeData(data, cols) {
    const rows = data.feed.entry;
    return rows.map(row => Sheet.serializeRow(row, cols));
  }

  /**
   * Serialize a Google Sheets row
   * @param {Object} row
   * @param {Array} cols
   * @return {Object}
   */
  static serializeRow(row, cols) {
    return cols.reduce((obj, col) => {
      const name = `gsx$${col.toLowerCase().replace(' ', '')}`;
      const value = row[name].$t;
      return Object.assign(obj, { [Sheet.toCamelCase(col)]: value });
    }, {});
  }

  /**
   * Fetch the Google Sheet data from the JSON API
   * @return {Promise.<Object>}
   */
  static async fetchData(sheetId) {
    try {
      const url = `https://spreadsheets.google.com/feeds/list/${sheetId}/od6/public/values?alt=json`;
      const response = await fetch(url, {
        mode: 'cors',
      });
      return await response.json();
    } catch (err) {
      throw err;
    }
  }

  /**
   * Convert a random string to a camel-cased string (fooBarBaz)
   * @param {String} str
   * @return {String}
   */
  static toCamelCase(str) {
    const [first, ...acc] = str.replace(/[^\w\d]/g, ' ').split(/\s+/);
    return first.toLowerCase() + acc.map(x => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase()).join('');
  }
}
