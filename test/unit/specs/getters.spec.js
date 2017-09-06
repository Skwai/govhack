import * as getters from '@/store/getters';

describe('getters.js', () => {
  describe('toInt', () => {
    it('should convert a string to an integer', () => {
      expect(getters.toInt('4000')).to.equal(4000);
      expect(getters.toInt('4,000')).to.equal(4000);
      expect(getters.toInt('4,000.00')).to.equal(4000);
    });
  });

  describe('getAverageForState', () => {
    it('should return an average for a given state', () => {
      const postcodes = [{
        state: 'TAS',
        average: '40,000',
      }, {
        state: 'VIC',
        average: '50,000',
      }];
      expect(getters.getAverageForState({ postcodes })('TAS')).to.equal(40000);
      expect(getters.getAverageForState({ postcodes })('VIC')).to.equal(50000);
      expect(getters.getAverageForState({ postcodes })()).to.equal(45000);
    });
  });

  describe('getNationalAverage', () => {
    it('should return the national average', () => {
      const postcodes = [{
        state: 'TAS',
        average: '40,000',
      }, {
        state: 'VIC',
        average: '50,000',
      }];
      expect(getters.getAverageForState({ postcodes })()).to.equal(45000);
    });
  });
});
