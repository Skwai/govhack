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
  const filtered = postcodes.filter(el => el.State === stateName);
  const total = filtered.reduce((sum, value) => sum + toInt(value.Average), 0);
  const count = filtered.length;
  return total / count;
};

/**
 * Get the state name (eg. TAS, NSW) a postcode belongs to
 * @param {String} postcode
 * @return {String}
 */
export const getPostcodeState = ({ postcodes }) => (postcode) => {
  const maybeState = postcodes.find(el => el.Postcode === postcode);
  return maybeState ? maybeState.State : null;
};

/**
 * Get the averages for all postcodes
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
 * @param {Object} param
 * @param {String} param.postcode
 * @param {String} param.state
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
 * @param {Object} param
 * @param {String} param.age
 * @param {String} param.gender
 * @param {String} param.state
 * @return {Object}
 */
export const getDemographicsStats = ({ ages }) => ({ age, gender, state }) => {
  const data = ages.filter((el) => {
    const isGender = gender ? el.Gender.toLowerCase() === gender.toLowerCase() : true;
    const isState = state ? el.State.toLowerCase() === state.toLowerCase() : true;
    const isAge = age ? el.Age.toLowerCase().includes(age.toLowerCase()) : true;
    return isGender && isState && isAge;
  });

  if (!data) {
    return {
      average: null,
      max: null,
      min: null,
    };
  }

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
