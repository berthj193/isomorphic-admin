export const required = value => !value
  && 'Required';

export const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  && 'Invalid email address';

export const number = value => value && isNaN(Number(value))
  && 'Must be a number';

export const fieldListRequired = value =>
  (!value || !value.filter(item => item).length)
  && `You must include at least one item`;

// Autocomplete field should have a value of type number (id)
export const autocompleteIdRequired = value =>
  required(value) || (number(value) && `You must select an item`);

export const autocompleteKeyRequired = value =>
  required(value) && `You must select an item`;
