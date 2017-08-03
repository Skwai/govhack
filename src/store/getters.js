/* eslint-disable no-param-reassign */

/**
 * Convert a string to an integer
 * @param {String} str
 */
const toInt = str => Number(str.replace(/,/g, ''));

/**
 * Get the average for an Australian state
 * @param {Array} postcodes
 * @param {String} stateName
 * @return {Number}
 */
export const getAverageForState = ({ postcodes }) => (stateName) => {
  const filtered = postcodes.filter(el => el.State === stateName);
  const total = filtered.reduce((sum, value) => sum + toInt(value.Average), 0);
  const count = filtered.length;
  return total / count;
};

/**
 * Get the state a postcode belongs to
 * @param {Array} postcodes
 * @param {String} postcode
 * @return {String}
 */
export const getPostcodeState = ({ postcodes }) => (postcode) => {
  const maybeState = postcodes.find(el => el.Postcode === postcode);
  return maybeState ? maybeState.State : null;
};

/**
 * Get the averages for all postcodes
 * @param {Array} postcodes
 * @return {Array}
 */
export const getPostcodeAverages = ({ postcodes }) =>
  postcodes.map(el => ({
    postcode: el.Postcode,
    average: toInt(el.Average),
    median: toInt(el.Median),
  }));

/**
 * Get the stats for a postcode
 * @param {*} param0
 * @return {Object}
 */
export const getPostcodeStats = ({ postcodes }) => ({ postcode, state }) => {
  const data = postcodes.find(el => el.Postcode === postcode);

  if (!data) {
    return {
      average: null,
      max: null,
      min: null,
    };
  }

  const average = toInt(data.Average);
  const raw = (state ? (postcodes.filter(el => el.State === state)) : postcodes)
    .map(el => toInt(el.Average));
  const min = Math.min(...raw);
  const max = Math.max(...raw);
  return {
    average,
    min,
    max,
  };
};

/**
 * Get the data for a demographic
 * @param {Array} ages
 * @param {String} age
 * @param {String} gender
 * @param {String} state
 * @return {Object}
 */
export const getDemographicsStats = ({ ages }) => ({ age, gender, state }) => {
  const data = ages.filter((el) => {
    const isGender = gender ? el.Gender.toLowerCase() === gender.toLowerCase() : true;
    const isState = state ? el.State.toLowerCase() === state.toLowerCase() : true;
    const isAge = age ? el.Age.toLowerCase().includes(age.toLowerCase()) : true;
    return isGender && isState && isAge;
  });

  const count = data.reduce((sum, value) => sum + toInt(value.Count), 0);
  const total = data.reduce((sum, value) => sum + toInt(value['Income Sum']), 0);
  const average = total / count;

  const raw = data.map(el => toInt(el['Average Income']));
  const min = Math.min(...raw);
  const max = Math.max(...raw);

  return {
    average,
    min,
    max,
  };
};

export const getAverageSalary = ({ postcodes }) => {
  const averages = postcodes.map(el => toInt(el.Average));
  const total = averages.reduce((sum, value) => sum + value, 0);
  return total / postcodes.length;
};

export const getMedianSalary = ({ postcodes }) => {
  const medians = postcodes.map(el => toInt(el.Median));
  const total = medians.reduce((sum, value) => sum + value, 0);
  return total / postcodes.length;
};
