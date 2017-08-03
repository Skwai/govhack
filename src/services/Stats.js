/**
 * A service to calculate Stats
 *
 * gender/age/state
 * avg
 * min/max
 *
 * Postcode
 * state Avg
 * postcode Avg
 * min/max
 *
 */
class StatsService {
  constructor({
                ageData = [],
                postcodeData = [],
              }) {
    Object.assign(this, {
      ageData,
      postcodeData,
    });
  }

  calculateStats() {
    const medSals = this.postcodeData.map(el => StatsService.toInt(el.average));
    const avgSals = this.postcodeData.map(el => StatsService.toInt(el.median));

    const totalAvgSalary = medSals.reduce((sum, value) => sum + value, 0);
    const totalMedSalary = avgSals.reduce((sum, value) => sum + value, 0);

    this.avgAvgSalary = totalAvgSalary / this.postcodeData.length;
    this.avgMedSalary = totalMedSalary / this.postcodeData.length;
    this.medAvgSalary = StatsService.getMedian(medSals);
    this.medMedSalary = StatsService.getMedian(avgSals);
  }

  getPostcodeStats({ postcode, state }) {
    const data = this.postcodeData.find(el => el.postcode === postcode);

    if (!data) {
      return {
        average: null,
        max: null,
        min: null,
      };
    }

    const average = StatsService.toInt(data.average);
    const raw = (state ? (this.postcodeData.filter(el => el.state === state)) : this.postcodeData)
      .map(el => StatsService.toInt(el.average));
    const min = Math.min(...raw);
    const max = Math.max(...raw);
    return {
      average,
      min,
      max,
    };
  }

  getPostcodeAverages() {
    return this.postcodeData.map(el => ({
      postcode: el.postcode,
      average: StatsService.toInt(el.average),
      median: StatsService.toInt(el.median),
    }));
  }

  getAverageforState(state) {
    const filtered = this.postcodeData.filter(el => el.state === state);
    const total = filtered.reduce((sum, value) => sum + StatsService.toInt(value.average), 0);
    const count = filtered.length;
    return total / count;
  }

  getState(postcode) {
    const maybeState = this.postcodeData.find(el => el.postcode === postcode);
    return maybeState ? maybeState.State : null;
  }

  getDemographicsStats({ age, gender, state }) {
    const data = this.ageData.filter((el) => {
      const t1 = gender ? el.gender.toLowerCase() === gender.toLowerCase() : true;
      const t2 = state ? el.state.toLowerCase() === state.toLowerCase() : true;
      const t3 = age ? el.age.toLowerCase().includes(age.toLowerCase()) : true;
      return t1 && t2 && t3;
    });

    const count = data.reduce((sum, value) => sum + StatsService.toInt(value.count), 0);
    const total = data.reduce((sum, value) => sum + StatsService.toInt(value.incomeSum), 0);
    const average = total / count;

    const raw = data.map(el => StatsService.toInt(el.averageIncome));
    const min = Math.min(...raw);
    const max = Math.max(...raw);

    return {
      average,
      min,
      max,
    };
  }

  static getMedian(args) {
    if (!args.length) { return 0; }
    const numbers = args.slice(0).sort((a, b) => a - b);
    const middle = Math.floor(numbers.length / 2);
    const isEven = numbers.length % 2 === 0;
    return isEven ? (numbers[middle] + numbers[middle - 1]) / 2 : numbers[middle];
  }

  static toInt(str) {
    return Number(str.replace(/,/g, ''));
  }
}

const statsService = new StatsService({});

export default statsService;
