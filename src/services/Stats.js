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

    try {
      this.calculateStats();
      console.log(`avgMedSalary: ${this.avgMedSalary}`);
      console.log(`avgAvgSalary: ${this.avgAvgSalary}`);
      console.log(`medAvgSalary: ${this.medAvgSalary}`);
      console.log(`medMedSalary: ${this.medMedSalary}`);

      this.combine({ gender: 'Female' });
    } catch (err) {
      console.log(err);
    }
  }

  calculateStats() {
    const medSals = this.postcodeData.map(el => this.constructor.toInt(el.Average));
    const avgSals = this.postcodeData.map(el => this.constructor.toInt(el.Median));

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

  combine({ age, gender, state }) {
    console.log(age, gender, state);
    try {
      const data = this.ageData.filter((el) => {
        const t1 = gender ? el.Gender.toLowerCase() === gender.toLowerCase() : true;
        const t2 = state ? el.State.toLowerCase() === state.toLowerCase() : true;
        const t3 = age ? el.Age.toLowerCase() === age.toLowerCase() : true;
        return t1 && t2 && t3;
      });

      const avg = data.reduce((sum, value) => sum + this.constructor.toInt(value['Average Income']), 0);
      console.log(avg);
      console.log(data.length);
      console.log(avg / data.length);

      const count = data.reduce((sum, value) => sum + this.constructor.toInt(value.Count), 0);
      const tot = data.reduce((sum, value) => sum + this.constructor.toInt(value['Income Sum']), 0);

      console.log(tot);
      console.log(count);
      console.log(tot / count);

      return avg;
    } catch (err) {
      console.log(err);
    }
    return 0;
  }

  static getMedian(args) {
    if (!args.length) { return 0; }
    const numbers = args.slice(0).sort((a, b) => a - b);
    const middle = Math.floor(numbers.length / 2);
    const isEven = numbers.length % 2 === 0;
    return isEven ? (numbers[middle] + numbers[middle - 1]) / 2 : numbers[middle];
  }

  static toInt(str) {
    return parseInt(str.replace(/,/g, ''), 10);
  }
}
