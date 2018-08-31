import apolloClientProvider from '../apolloClientProvider';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';

jest.mock('apollo-client');
jest.mock('apollo-link-http');

describe('apolloClientProvider', () => {
  beforeEach(() => {
    ApolloClient.mockClear();
    HttpLink.mockClear();
  });

  it('should create HttpLink with provided uri', () => {
    apolloClientProvider('/uri');
    expect(HttpLink).toHaveBeenLastCalledWith({ uri: '/uri' });
  });

  it('should create an instance of ApolloClient', () => {
    apolloClientProvider();
    expect(ApolloClient).toHaveBeenCalled();
  });

  it('should return an instance of ApolloClient', () => {
    expect(apolloClientProvider()).toBeInstanceOf(ApolloClient);
  });
});
