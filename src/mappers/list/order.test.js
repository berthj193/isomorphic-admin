import { toListItem } from '../order';

describe('Order mapper', () => {
  describe('toListItem()', () => {
    it('should flatten order object', () => {
      const data = {
        id: 'My0rd3r',
        customer: {
          email: 'my@email.com',
          given_name: 'Miroslaw',
          family_name: 'Yarzyna',
        },
        grand_total: {
          value: '1.000.000',
        },
        created_at: '2018-07-03T12:24:06+00:00',
      };
      expect(toListItem([data])).toMatchSnapshot();
    });

    it('should skip unpredicted fields', () => {
      const data = {
        id: 'My0rd3r',
        customer: {
          email: 'my@email.com',
          given_name: 'Miroslaw',
          family_name: 'Yarzyna',
        },
        grand_total: {
          value: '1.000.000',
        },
        created_at: '2018-07-03T12:24:06+00:00',
        iShould: 'BeHere',
      };
      expect(toListItem([data])).toMatchSnapshot();
    });
  });
});
