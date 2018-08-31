import _map from 'lodash/map';

export const toListItem = orders =>
  _map(orders, order => {
    const { customer } = order;

    return {
      key: order.id,
      id: order.id,
      email: customer.email,
      status: '–',
      customer_name: `${customer.given_name} ${customer.family_name}`,
      grand_total: order.grand_total.value,
      created_at: order.created_at,
    };
  });

