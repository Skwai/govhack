/**
 * A service to fetch the produts from a Google Sheet
 */
export default class SheetsService {
  constructor({
    cols = [],
    sheetId = '',
  }) {
    Object.assign(this, {
      rows: [],
      loading: null,
      loaded: false,
      cols,
      sheetId,
    });
  }

  async loadData() {
    try {
      const data = await this.fetchData();
      const rows = this.serializeData(data);
      this.rows = rows;
      this.loaded = true;
      return rows;
    } catch (err) {
      throw err;
    }
  }

  serializeData(data) {
    const rows = data.feed.entry;
    return rows.map(row => this.serializeRow(row));
  }

  serializeRow(row) {
    return this.cols.reduce((obj, col) => {
      const name = `gsx$${col.toLowerCase()}`;
      const value = row[name].$t;
      return Object.assign({}, obj, { [col]: value });
    }, {});
  }

  /**
   * Fetch the Google Sheet data from the JSON API
   * @return {Promise.<Object>}
   */
  async fetchData() {
    try {
      const url = `https://spreadsheets.google.com/feeds/list/${this.sheetId}/od6/public/values?alt=json`;
      const response = await fetch(url, {
        mode: 'cors',
      });
      return await response.json();
    } catch (err) {
      throw err;
    }
  }
}
