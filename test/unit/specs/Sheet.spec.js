import Sheet from '@/services/Sheet';

describe('Sheet.js', () => {
  describe('Sheet.toCamelCase', () => {
    it('Should convert a string to camel-case', () => {
      expect(Sheet.toCamelCase('foo-bar')).to.equal('fooBar');
      expect(Sheet.toCamelCase('foo-bar-baz')).to.equal('fooBarBaz');
      expect(Sheet.toCamelCase('foo bar')).to.equal('fooBar');
      expect(Sheet.toCamelCase('foo bar baz')).to.equal('fooBarBaz');
      expect(Sheet.toCamelCase('foo  bar')).to.equal('fooBar');
      expect(Sheet.toCamelCase(' foo bar ')).to.equal('fooBar');
      expect(Sheet.toCamelCase(' foo bar baz ')).to.equal('fooBarBaz');
      expect(Sheet.toCamelCase('foo\'bar')).to.equal('fooBar');
      expect(Sheet.toCamelCase('FOO BAR')).to.equal('fooBar');
      expect(Sheet.toCamelCase('FOO BAR BAZ')).to.equal('fooBarBaz');
    });
  });
});
