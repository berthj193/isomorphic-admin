import {
  required, email, number,
  fieldListRequired,
} from '../formValidation';

describe('formValidation helper', () => {
  describe('required validator', () => {
    it('should return error message if value is an empty string', () => {
      expect(required('')).toBeTruthy();
    });

    it('should return error message if passed value is null', () => {
      expect(required(null)).toBeTruthy();
    });

    it('should return false if passed value is a string', () => {
      expect(required('foo')).toBe(false);
    });
  });

  describe('email validator', () => {
    it('should return error message if passed value is not an email', () => {
      expect(email('foo')).toBeTruthy();
    });

    it('should return error message if email is not valid', () => {
      expect(email('#@%^%#.com')).toBeTruthy();
    });

    it('should return error message if email is missing username', () => {
      expect(email('@google.com')).toBeTruthy();
    });

    it('should return false if email address is correct', () => {
      expect(email('johndoe@gogoel.com')).toBe(false);
    });
  });

  describe('number validator', () => {
    it('should return error message if passed value is a non number of type string', () => {
      expect(number('a0')).toBeTruthy();
    });

    it('should return false if passed value is a number of type string', () => {
      expect(number('0')).toBe(false);
    });

    it('should return false if passed value is a number', () => {
      expect(number(1)).toBe(false);
    });
  });

  describe('fieldListRequired validator', () => {
    it('should return error message if passed value is an empty array', () => {
      expect(fieldListRequired([])).toBeTruthy();
    });
    it('should return error message if passed value is null', () => {
      expect(fieldListRequired(null)).toBeTruthy();
    });
    it('should return error message if passed value is an array of null', () => {
      expect(fieldListRequired([null, null])).toBeTruthy();
    });
    it('should return error message if passed value is an array of empty strings', () => {
      expect(fieldListRequired(['', ''])).toBeTruthy();
    });
    it('should return false if passed value is an array with at least one item', () => {
      expect(fieldListRequired(['foo'])).toBe(false);
    });
  });
});
