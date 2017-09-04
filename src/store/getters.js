/* eslint-disable no-confusing-arrow */

/**
 * Convert a string to an integer
 * @param {String} str
 * @return {Number}
 */
const toInt = str => Number(str.replace(/,/g, ''));

/**
 * Get the average for an Australian state
 * @param {String} stateName
 * @return {Number}
 */
export const getAverageForState = ({ postcodes }) => (stateName) => {
  const filtered = postcodes.filter(el => el.state === stateName);
  const total = filtered.reduce((sum, value) => sum + toInt(value.average), 0);
  const count = filtered.length;
  return total / count;
};

/**
 * Get the state name (eg. TAS, NSW) a postcode belongs to
 * @param {String} postcode
 * @return {String}
 */
export const getPostcodeState = ({ postcodes }) => (postcode) => {
  const maybeState = postcodes.find(el => el.postcode === postcode);
  return maybeState ? maybeState.State : null;
};

/**
 * Get the averages for all postcodes
 * @return {Array}
 */
export const getPostcodeAverages = ({ postcodes }) =>
  postcodes.map(el => ({
    postcode: el.postcode,
    average: toInt(el.average),
    median: toInt(el.median),
  }));

/**
 * Get the stats for a postcode
 * @param {Object} param
 * @param {String} param.postcode
 * @param {String} param.state
 * @return {Object}
 */
export const getPostcodeStats = ({ postcodes }) => ({ postcode, state }) => {
  const data = postcodes.find(el => el.postcode === postcode);

  if (!data) {
    return {
      average: null,
      max: null,
      min: null,
    };
  }

  const average = toInt(data.average);
  const raw = (state ? (postcodes.filter(el => el.state === state)) : postcodes)
    .map(el => toInt(el.average));
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
 * @param {Object} param
 * @param {String} param.age
 * @param {String} param.gender
 * @param {String} param.state
 * @return {Object}
 */
export const getDemographicsStats = ({ ages }) => ({ age, gender, state }) => {
  const data = ages
    .filter(el => gender ? el.gender.toLowerCase() === gender.toLowerCase() : true)
    .filter(el => state ? el.state.toLowerCase() === state.toLowerCase() : true)
    .filter(el => age ? el.age.toLowerCase() === age.toLowerCase() : true);

  if (!data || !data.length) {
    return {
      average: null,
      max: null,
      min: null,
    };
  }

  const count = data.reduce((sum, el) => sum + toInt(el.count), 0);
  const total = data.reduce((sum, { incomeSum }) => sum + toInt(incomeSum), 0);
  const average = total / count;

  const values = data.map(el => toInt(el.averageIncome));
  const min = Math.min(...values);
  const max = Math.max(...values);

  return {
    average,
    min,
    max,
  };
};

/**
 * Get the stats to compare industry
 */
export const getIndustryStats = ({ industries }) => ({ gender, industry, state }) => {
  // debugger;
  const data = industries
    .filter(el => gender ? el.gender.toLowerCase() === gender.toLowerCase() : true)
    .filter(el => industry ? el.industry.toLowerCase() === industry.toLowerCase() : true)
    .filter(el => state ? el.state.toLowerCase() === state.toLowerCase() : true);

  if (!data) {
    return {
      average: null,
      max: null,
      min: null,
    };
  }

  const count = data.reduce((sum, { countSalary }) => sum + toInt(countSalary), 0);
  const total = data.reduce((sum, { salary }) => sum + toInt(salary), 0);
  const average = total / count;

  // to do: calculate min/max
  const values = data.map(el => el.salary / el.salaryCount);
  const min = Math.min(...values);
  const max = Math.max(...values);

  return {
    average,
    min,
    max,
  };
};

/**
 * Get an array of industry types
 * @param {Object} params
 * @return {Array}
 */
export const getIndustryTypes = ({ industries }) => {
  const arr = industries.map(el => el.industry);
  return [...new Set(arr)].sort();
};

export const getAges = ({ ages }) => {
  const arr = ages.map(el => el.age.split('.').pop());
  return [...new Set(arr)].sort();
};
