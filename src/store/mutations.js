/* eslint-disable no-param-reassign */

export default {
  /**
   * Insert the age rows into the store
   * @param {Object} state
   * @param {Array} ages
   */
  insertAges(state, ages) {
    state.ages = ages;
  },

  /**
   * Insert the postcode rows into the store
   * @param {Object} state
   * @param {Array} postcodes
   */
  insertPostcodes(state, postcodes) {
    state.postcodes = postcodes;
  },
};
