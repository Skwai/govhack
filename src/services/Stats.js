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
    const medSals = this.postcodeData.map(el => StatsService.toInt(el.Average));
    const avgSals = this.postcodeData.map(el => StatsService.toInt(el.Median));

    const totalAvgSalary = medSals.reduce((sum, value) => sum + value, 0);
    const totalMedSalary = avgSals.reduce((sum, value) => sum + value, 0);

    this.avgAvgSalary = totalAvgSalary / this.postcodeData.length;
    this.avgMedSalary = totalMedSalary / this.postcodeData.length;
    this.medAvgSalary = StatsService.getMedian(medSals);
    this.medMedSalary = StatsService.getMedian(avgSals);
  }

  getPostcodeStats({ postcode, state }) {
    const data = this.postcodeData.find(el => el.Postcode === postcode);

    if (!data) {
      return {
        average: null,
        max: null,
        min: null,
      };
    }

    const average = StatsService.toInt(data.Average);
    const raw = (state ? (this.postcodeData.filter(el => el.State === state)) : this.postcodeData)
      .map(el => StatsService.toInt(el.Average));
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
      postcode: el.Postcode,
      average: StatsService.toInt(el.Average),
    }));
  }

  getAverageforState(state) {
    const filtered = this.postcodeData.filter(el => el.State === state);
    const total = filtered.reduce((sum, value) => sum + StatsService.toInt(value.Average), 0);
    const count = filtered.length;
    return total / count;
  }

  getTopPostcodes(num) {
    const sorted = this.postcodeData.sort(
      (a, b) => StatsService.toInt(a.Median) - (StatsService.toInt(b.Median)),
    );
    return sorted.reverse().splice(0, num).map(
      el => ({ postcode: el.Postcode, state: el.State, median: el.Median }));
  }

  getBottomPostcodes(num) {
    const sorted = this.postcodeData.sort((a, b) =>
      StatsService.toInt(a.Median) - (StatsService.toInt(b.Median)));
    return sorted.splice(0, num).map(el =>
      ({ postcode: el.Postcode, state: el.State, median: el.Median }));
  }

  getState(postcode) {
    const maybeState = this.postcodeData.find(el => el.Postcode === postcode);
    return maybeState ? maybeState.State : null;
  }

  getDemographicsStats({ age, gender, state }) {
    const data = this.ageData.filter((el) => {
      const t1 = gender ? el.Gender.toLowerCase() === gender.toLowerCase() : true;
      const t2 = state ? el.State.toLowerCase() === state.toLowerCase() : true;
      const t3 = age ? el.Age.toLowerCase().includes(age.toLowerCase()) : true;
      return t1 && t2 && t3;
    });

    const count = data.reduce((sum, value) => sum + StatsService.toInt(value.Count), 0);
    const total = data.reduce((sum, value) => sum + StatsService.toInt(value['Income Sum']), 0);
    const average = total / count;

    const raw = data.map(el => StatsService.toInt(el['Average Income']));
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
