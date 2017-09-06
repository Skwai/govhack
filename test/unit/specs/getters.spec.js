import * as getters from '@/store/getters';
import { TEST_POSTCODES } from './getters.data';

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
      expect(getters.getAverageForState({ postcodes: TEST_POSTCODES })('TAS')).to.equal(30000);
      expect(getters.getAverageForState({ postcodes: TEST_POSTCODES })('VIC')).to.equal(45000);
      expect(getters.getAverageForState({ postcodes: TEST_POSTCODES })(null)).to.equal(null);
      expect(getters.getAverageForState({ postcodes: TEST_POSTCODES })('INVALID')).to.equal(null);
    });
  });

  describe('getPostcodeAverage', () => {
    it('should return the average for a postcode', () => {
      expect(getters.getPostcodeAverage({ postcodes: TEST_POSTCODES })(7000)).to.equal(30000);
      expect(getters.getPostcodeAverage({ postcodes: TEST_POSTCODES })('7000')).to.equal(30000);
      expect(getters.getPostcodeAverage({ postcodes: TEST_POSTCODES })()).to.equal(null);
      expect(getters.getPostcodeAverage({ postcodes: TEST_POSTCODES })('INVALID')).to.equal(null);
    });
  });

  describe('getNationalAverage', () => {
    it('should return the national average', () => {
      expect(getters.getNationalAverage({ postcodes: TEST_POSTCODES })).to.equal(40000);
    });
  });

  describe('getPostcodeState', () => {
    it('should return the state a postcode belongs to', () => {
      expect(getters.getPostcodeState({ postcodes: TEST_POSTCODES })(7000)).to.equal('TAS');
      expect(getters.getPostcodeState({ postcodes: TEST_POSTCODES })('7000')).to.equal('TAS');
      expect(getters.getPostcodeState({ postcodes: TEST_POSTCODES })(3000)).to.equal('VIC');
      expect(getters.getPostcodeState({ postcodes: TEST_POSTCODES })('INVALID')).to.equal(null);
    });
  });

  describe('getPostcodeAverages', () => {
    it('should return the average, median and postcode for each postcode', () => {
      expect(getters.getPostcodeAverages({ postcodes: TEST_POSTCODES }))
        .to.have.lengthOf(TEST_POSTCODES.length);
    });
  });
});
