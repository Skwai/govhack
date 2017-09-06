/* eslint-disable no-confusing-arrow */

/**
 * Convert a string to an integer
 * @param {String} str
 * @return {Number}
 */
const toInt = str => Number(String(str).replace(/,/g, ''));

/**
 * Get the average for an Australian state
 * @param {String} stateName
 * @return {Number}
 */
export const getAverageForState = ({ postcodes }) => (state = null) => {
  const filtered = postcodes.filter(el => el.state === state);
  const total = filtered.reduce((sum, value) => sum + toInt(value.average), 0);
  const count = filtered.length;
  return total / count;
};

/**
 * Get the average for an Australian state
 * @return {Number}
 */
export const getNationalAverage = ({ postcodes }) => {
  const total = postcodes.reduce((sum, value) => sum + toInt(value.average), 0);
  const count = postcodes.length;
  return total / count;
};

/**
 * Get the state name (eg. TAS, NSW) a postcode belongs to
 * @param {String} postcode
 * @return {String}
 */
export const getPostcodeState = ({ postcodes }) => (postcode) => {
  const state = postcodes.find(el => el.postcode === postcode);
  return state ? state.state : null;
};

/**
 * Get the average income for a postcode
 * @param {String} postcode
 * @return {Number}
 */
export const getPostcodeAverage = ({ postcodes }) => (postcode) => {
  const match = postcodes.find(el => toInt(el.postcode) === toInt(postcode));
  return match ? toInt(match.average) : getNationalAverage({ postcodes });
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
 * Get all the average incomes for the postcodes in a state
 * @param {String} state
 * @return {Array}
 */
export const getStatePostcodeAverages = ({ postcodes }) => (state = null) =>
  (state ? (postcodes.filter(el => el.state === state)) : postcodes)
    .map(el => toInt(el.average));

/**
 * Get the stats for a postcode
 * @param {Object} param
 * @param {String} param.postcode
 * @return {Object}
 */
export const getPostcodeStats = ({ postcodes }) => ({ postcode, state }) => {
  const average = getPostcodeAverage({ postcodes })(postcode);

  if (!average) {
    return {
      average: null,
      max: null,
      min: null,
    };
  }

  const stateAverages = getStatePostcodeAverages({ postcodes })(state);
  const min = Math.min(...stateAverages);
  const max = Math.max(...stateAverages);

  return {
    average,
    min,
    max,
  };
};

/**
 * Get the average income for a gender
 * @param {String} gender
 * @return {Number}
 */
export const getGenderAverage = ({ ages }) => (gender = null) => {
  const data = ages
    .filter(el => gender ? el.gender.toLowerCase() === gender.toLowerCase() : true);
  const count = data.reduce((sum, el) => sum + toInt(el.count), 0);
  const total = data.reduce((sum, { incomeSum }) => sum + toInt(incomeSum), 0);
  return total / count;
};

/**
 * Get the average income for an age segment
 * @param {String} age (eg. "25 - 29")
 * @return {Number}
 */
export const getAgeAverage = ({ ages }) => (age = null) => {
  const data = ages
    .filter(el => age ? el.age.toLowerCase().includes(age.toLowerCase()) : true);
  const count = data.reduce((sum, el) => sum + toInt(el.count), 0);
  const total = data.reduce((sum, { incomeSum }) => sum + toInt(incomeSum), 0);
  return total / count;
};

/**
 * Get the average income for a state
 * @param {String} state
 * @return {Number}
 */
export const getStateAverage = ({ ages }) => (state = null) => {
  const data = ages
    .filter(el => state ? el.state.toLowerCase() === state.toLowerCase() : true);
  const count = data.reduce((sum, el) => sum + toInt(el.count), 0);
  const total = data.reduce((sum, { incomeSum }) => sum + toInt(incomeSum), 0);
  return total / count;
};

/**
 * Get the average income for an industry
 * @param {String} industry
 * @return {Number}
 */
export const getIndustryAverage = ({ industries }) => (industry = null) => {
  const data = industries
    .filter(el => industry ? el.industry.toLowerCase() === industry.toLowerCase() : true);
  const count = data.reduce((sum, { countSalary }) => sum + toInt(countSalary), 0);
  const total = data.reduce((sum, { salary }) => sum + toInt(salary), 0);
  return total / count;
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
    .filter(el => age ? el.age.toLowerCase().includes(age.toLowerCase()) : true);

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
 * Get all of the average incomes for an industry
 * @return {String} industry
 * @return {Array}
 */
export const getIndustryAverages = ({ industries }) => (industry = null) => industries
  .filter(el => industry ? el.industry.toLowerCase() === industry.toLowerCase() : true)
  .map(el => toInt(el.salary) / toInt(el.countSalary))
  .map(val => isNaN(val) ? 0 : val.toFixed());

/**
 * Get the stats to compare industry
 * @param {Object} param
 * @param {String} param.gender
 * @param {String} param.industry
 * @param {String} param.state
 */
export const getIndustryStats = ({ industries }) => ({ gender, industry, state }) => {
  const data = industries
    .filter(el => gender ? el.gender.toLowerCase() === gender.toLowerCase() : true)
    .filter(el => industry ? el.industry.toLowerCase() === industry.toLowerCase() : true)
    .filter(el => state ? el.state.toLowerCase() === state.toLowerCase() : true);

  if (!data || !data.length) {
    return {
      average: null,
      max: null,
      min: null,
    };
  }

  const count = data.reduce((sum, { countSalary }) => sum + toInt(countSalary), 0);
  const total = data.reduce((sum, { salary }) => sum + toInt(salary), 0);
  const average = total / count;

  const industryAverages = getIndustryAverages({ industries })(industry);
  const min = Math.min(...industryAverages);
  const max = Math.max(...industryAverages);

  return {
    average,
    min,
    max,
  };
};

/**
 * Get an array of industry types
 * @return {Array}
 */
export const getIndustryTypes = ({ industries }) => {
  const arr = industries.map(el => el.industry);
  return [...new Set(arr)].sort();
};

/**
 * Get an array of ages
 * @return {Array}
 */
export const getAges = ({ ages }) => {
  const arr = ages.map(el => el.age.split('.').pop());
  return [...new Set(arr)].sort();
};

/**
 * Get an array of states
 * @return {Array}
 */
export const getStates = ({ industries }) => [...new Set(industries.map(el => el.state))].sort();
