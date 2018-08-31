import { getList, getDetails, placeOrder, createRefund } from '../orders';

describe('orders gql', () => {
  it('getList', () =>
    expect(getList).toMatchSnapshot()
  );

  it('getDetails', () =>
    expect(getDetails).toMatchSnapshot()
  );

  it('placeOrder', () =>
    expect(placeOrder).toMatchSnapshot()
  );

  it('createRefund', () =>
    expect(createRefund).toMatchSnapshot()
  );
});
