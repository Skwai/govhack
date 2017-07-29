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

    console.log(`avgMedSalary: ${this.avgMedSalary}`);
    console.log(`avgAvgSalary: ${this.avgAvgSalary}`);
    console.log(`medAvgSalary: ${this.medAvgSalary}`);
    console.log(`medMedSalary: ${this.medMedSalary}`);
  }

  getPostcodeStats({ postcode, state }) {
    // const state = this.getState(code);

    debugger;
    const data = this.postcodeData.find(el => StatsService.toInt(el.Postcode) === postcode);
    const median = StatsService.toInt(data.Median);

    const raw = this.postcodeData
      .filter(el => el.State === state)
      .map(el => StatsService.toInt(el.Median));

    const min = Math.min(...raw);
    const max = Math.max(...raw);

    return {
      median,
      min,
      max,
    };
  }

  getState(postcode) {
    const maybeState = this.postcodeData.find(el => StatsService.toInt(el.Postcode) === postcode);
    return maybeState ? maybeState.State : null;
  }

  getDempgraphicsStats({ age, gender, state }) {
    const data = this.ageData.filter((el) => {
      const t1 = gender ? el.Gender.toLowerCase() === gender.toLowerCase() : true;
      const t2 = state ? el.State.toLowerCase() === state.toLowerCase() : true;
      const t3 = age ? el.Age.toLowerCase() === age.toLowerCase() : true;
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
