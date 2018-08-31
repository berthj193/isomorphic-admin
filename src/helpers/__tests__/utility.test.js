import MockDate from 'mockdate';
import moment from 'moment';

import { timeDifference } from '../utility';

const DATE = new Date(2018, 6, 20, 12, 0, 0, 0);

describe('utility', () => {
  describe('timeDifference()', () => {
    beforeAll(() => {
      MockDate.set(DATE);
    });

    afterAll(() => {
      MockDate.reset();
    });

    it('should return day, month and year if difference is over 27 days', () => {
      const testDate = moment(DATE).add(-1, 'y');
      expect(timeDifference(testDate)).toEqual(`${testDate.format('DD-MM-YY')}`);
    });

    it('should return day and month, if difference is over 27 days', () => {
      const testDate = moment(DATE).add(-28, 'd');
      expect(timeDifference(testDate)).toEqual(`${testDate.format('DD MMM')}`);
    });

    it('should return days, if difference is one day', () => {
      expect(timeDifference(moment(DATE).add(-1, 'd'))).toEqual('1 day');
    });

    it('should return plural days, if difference is over one day', () => {
      expect(timeDifference(moment(DATE).add(-3, 'd'))).toEqual('3 days');
    });

    it('should return rounded days, if difference is over few day', () => {
      expect(timeDifference(moment(DATE).add(-4, 'd').add(-2, 'h'))).toEqual('4 days');
    });

    it('should return hours, if difference is less than day and more then hour', () => {
      expect(timeDifference(moment(DATE).add(-1, 'h'))).toEqual('1 hour ago');
    });

    it('should return plural hours, if difference is less than day and more then hour', () => {
      expect(timeDifference(moment(DATE).add(-2, 'h'))).toEqual('2 hours ago');
    });

    it('should round hours, if difference is less than day and more then hour', () => {
      expect(timeDifference(moment(DATE).add(-2, 'h').add(-1, 'm'))).toEqual('2 hours ago');
    });

    it('should return minute, if difference is one minute', () => {
      expect(timeDifference(moment(DATE).add(-1, 'm'))).toEqual('1 minute ago');
    });

    it('should return plural minutes, if difference is over one minute', () => {
      expect(timeDifference(moment(DATE).add(-56, 'm'))).toEqual('56 minutes ago');
    });

    it('should return \'a few seconds ago\', if difference is one second', () => {
      expect(timeDifference(moment(DATE).add(-1, 's'))).toEqual('a few seconds ago');
    });

    it('should return \'a few seconds ago\', if difference is below one minute', () => {
      expect(timeDifference(moment(DATE).add(-56, 's'))).toEqual('a few seconds ago');
    });
  });
});
