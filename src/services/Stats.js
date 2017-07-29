/**
 * A service to calculate Stats
 */
export default class StatsService {
  constructor({
                ageData = [],
                postcodeData = [],
              }) {
    Object.assign(this, {
      ageData,
      postcodeData,
    });
    this.calculateStats();
  }

  calculateStats() {
    const medSals = this.postcodeData.map(el => parseInt(el.Average, 10));
    const avgSals = this.postcodeData.map(el => parseInt(el.Median, 10));

    const totalAvgSalary = medSals.reduce((sum, value) => sum + value, 0);
    const totalMedSalary = avgSals.reduce((sum, value) => sum + value, 0);

    this.avgAvgSalary = totalAvgSalary / this.postcodeData.length;
    this.avgMedSalary = totalMedSalary / this.postcodeData.length;

    this.medAvgSalary = this.constructor.getMedian(medSals);
    this.medMedSalary = this.constructor.getMedian(avgSals);
  }

  postcode(code) {
    const data = this.postcodeData.find(el => el.Postcode === code);
    return data;
  }

  static getMedian(args) {
    if (!args.length) { return 0; }
    const numbers = args.slice(0).sort((a, b) => a - b);
    const middle = Math.floor(numbers.length / 2);
    const isEven = numbers.length % 2 === 0;
    return isEven ? (numbers[middle] + numbers[middle - 1]) / 2 : numbers[middle];
  }
}
