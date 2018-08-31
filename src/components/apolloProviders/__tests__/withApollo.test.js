import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { withProvider } from '../withApollo';

const mockClient = {
  query: jest.fn().mockReturnValue(Promise.resolve({ data: {} })),
  mutate: jest.fn().mockReturnValue(Promise.resolve({ data: {} })),
  resetStore: jest.fn(),
};

const TestComponent = () => <span>My Beautiful Component</span>;

const defaultProps = { startRequest: jest.fn() };

describe('withProvider()', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render delivered component', () => {
    const ApolloComponent = withProvider(TestComponent, null, mockClient);
    expect(toJson(mount(<ApolloComponent {...defaultProps} {...defaultProps} />))).toMatchSnapshot();
  });

  it('should pass mutate and query methods to component', () => {
    const LocalTestComponent = jest.fn().mockImplementation(() => <span/>);
    const ApolloComponent = withProvider(LocalTestComponent, null, mockClient);
    const instance = mount(<ApolloComponent {...defaultProps} />).instance();
    expect(LocalTestComponent).toHaveBeenCalledWith(
      {
        error: instance.state.error,
        mutate: instance.mutate,
        query: instance.query,
        refresh: instance.refresh,
      },
      {},
    );
  });

  it('should pass props and state to initialQuery, if initialQuery is function', () => {
    const mockInitialQuery = jest.fn();
    const ApolloComponent = withProvider(TestComponent, mockInitialQuery, mockClient);
    mount(<ApolloComponent {...defaultProps} test="Lorem Ipsum" />);
    expect(mockInitialQuery).toHaveBeenCalledWith({ test: 'Lorem Ipsum' }, { error: null, data: {} });
  });

  it('should set error state after failing request', () => {
    const client = {
      ...mockClient,
      query: () => Promise.reject(new Error('Lorem Error')),
    };
    const ApolloComponent = withProvider(TestComponent, null, client);
    const tree = mount(<ApolloComponent {...defaultProps} />);
    return tree.instance().query('Lorem')
      .catch(() => expect(tree.update().instance().state.error).toEqual('Lorem Error'));
  });

  it('should save result of query to state, if handleResults flag is set', () => {
    const setStateMock = jest.fn();
    const client = {
      ...mockClient,
      query: () => Promise.resolve({ data: { items: ['lorem', 'ipsum', 'dolor'] } }),
    };
    const ApolloComponent = withProvider(TestComponent, null, client);
    const instance = mount(<ApolloComponent {...defaultProps} />).instance();
    instance.setState = setStateMock;
    return instance.query({
      query: 'lorem',
      handleResults: true,
    })
      .then(() => expect(setStateMock).toHaveBeenCalled());
  });

  it('should not save result of query to state, if handleResults flag is unset', () => {
    const setStateMock = jest.fn();
    const client = {
      ...mockClient,
      query: () => Promise.resolve({ data: { items: ['lorem', 'ipsum', 'dolor'] } }),
    };
    const ApolloComponent = withProvider(TestComponent, null, client);
    const instance = mount(<ApolloComponent {...defaultProps} />).instance();
    instance.setState = setStateMock;
    return instance.query({
      query: 'lorem',
    })
      .then(() => expect(setStateMock).not.toHaveBeenCalled());
  });

  it('should set mounted flag to true', () => {
    const ApolloComponent = withProvider(TestComponent, null, mockClient);
    const tree = mount(<ApolloComponent {...defaultProps} />);
    expect(tree.instance().mounted).toEqual(true);
  });

  it('should set mounted flag to false after unmount', () => {
    const ApolloComponent = withProvider(TestComponent, null, mockClient);
    const tree = mount(<ApolloComponent {...defaultProps} />);
    const instance = tree.instance();
    tree.unmount();
    expect(instance.mounted).toEqual(false);
  });

  it('should run setState when component is mounted', () => {
    const setStateMock = jest.fn();
    const ApolloComponent = withProvider(TestComponent, null, mockClient);
    const tree = mount(<ApolloComponent {...defaultProps} />);
    const instance = tree.instance();
    instance.setState = setStateMock;
    instance.updateState({ lorem: 'ipsum' });
    expect(setStateMock).toHaveBeenCalledWith({ lorem: 'ipsum' });
  });

  it('should not run setState when component is unmounted', () => {
    const setStateMock = jest.fn();
    const ApolloComponent = withProvider(TestComponent, null, mockClient);
    const tree = mount(<ApolloComponent {...defaultProps} />);
    const instance = tree.instance();
    instance.setState = setStateMock;
    tree.unmount();
    instance.updateState({ lorem: 'ipsum' });
    expect(setStateMock).not.toHaveBeenCalled();
  });

  it('should run delivered startRequest method with promise of call query', () => {
    const client = {
      ...mockClient,
      query: () => Promise.resolve({ data: { items: ['lorem', 'ipsum', 'dolor'] } }),
    };
    const ApolloComponent = withProvider(TestComponent, null, client);
    const instance = shallow(<ApolloComponent {...defaultProps} />).instance();
    const promise = instance.query({ query: 'SomeQuery' });
    // eslint-disable-next-line no-undefined
    expect(defaultProps.startRequest).toHaveBeenCalledWith(promise, undefined);
  });

  it('should run delivered startRequest method with messages from query', () => {
    const client = {
      ...mockClient,
      query: () => Promise.resolve({ data: { items: ['lorem', 'ipsum', 'dolor'] } }),
    };
    const ApolloComponent = withProvider(TestComponent, null, client);
    const instance = shallow(<ApolloComponent {...defaultProps} />).instance();
    const promise = instance.query({ query: 'SomeQuery', messages: ['lorem', 'ipsum'] });
    expect(defaultProps.startRequest).toHaveBeenCalledWith(promise, ['lorem', 'ipsum']);
  });

  it('should run delivered startRequest method with promise of call mutation', () => {
    const client = {
      ...mockClient,
      mutate: () => Promise.resolve({ data: { items: ['lorem', 'ipsum', 'dolor'] } }),
    };
    const ApolloComponent = withProvider(TestComponent, null, client);
    const instance = shallow(<ApolloComponent {...defaultProps} />).instance();
    const promise = instance.mutate({ query: 'SomeQuery' });
    // eslint-disable-next-line no-undefined
    expect(defaultProps.startRequest).toHaveBeenCalledWith(promise, undefined);
  });

  it('should run delivered startRequest method with messages from query', () => {
    const client = {
      ...mockClient,
      mutate: () => Promise.resolve({ data: { items: ['lorem', 'ipsum', 'dolor'] } }),
    };
    const ApolloComponent = withProvider(TestComponent, null, client);
    const instance = shallow(<ApolloComponent {...defaultProps} />).instance();
    const promise = instance.mutate({ query: 'SomeQuery', messages: ['lorem', 'ipsum'] });
    expect(defaultProps.startRequest).toHaveBeenCalledWith(promise, ['lorem', 'ipsum']);
  });

  describe('query()', () => {
    it('should run query method of given client', () => {
      const ApolloComponent = withProvider(TestComponent, null, mockClient);
      shallow(<ApolloComponent {...defaultProps} />).instance().query({ query: 'Test Query' });
      expect(mockClient.query).toHaveBeenCalledWith({ query: 'Test Query' });
    });

    it('should run array of initialQueries after mount', () => {
      const ApolloComponent = withProvider(TestComponent, [{ query: 'Lorem' }, { query: 'Ipsum' }], mockClient);
      mount(<ApolloComponent {...defaultProps} />);
      expect(mockClient.query).toHaveBeenCalledTimes(2);
    });

    it('should run initialQuery after mount', () => {
      const ApolloComponent = withProvider(TestComponent, { query: 'Lorem' }, mockClient);
      mount(<ApolloComponent {...defaultProps} />);
      expect(mockClient.query).toHaveBeenCalledWith({ query: 'Lorem' });
    });

    it('should run multiple initialQueries after mount', () => {
      const ApolloComponent = withProvider(TestComponent, [{ query: 'Lorem' }, { query: 'Ipsum' }], mockClient);
      mount(<ApolloComponent {...defaultProps} />);
      expect(mockClient.query).toHaveBeenCalledTimes(2);
    });

    it('should rerun multiple initialQueries after refresh', () => {
      const ApolloComponent = withProvider(TestComponent, [{ query: 'Lorem' }, { query: 'Ipsum' }], mockClient);
      mount(<ApolloComponent {...defaultProps} />).instance().refresh();
      expect(mockClient.query).toHaveBeenCalledTimes(4);
    });

    it('should run query method with builded initialQuery', () => {
      const ApolloComponent = withProvider(TestComponent, ({ test }) => ({ query: test }), mockClient);
      mount(<ApolloComponent {...defaultProps} test="Lorem Ipsum" />);
      expect(mockClient.query).toHaveBeenCalledWith({ query: 'Lorem Ipsum' });
    });
  });

  describe('mutate()', () => {
    it('should run mutate method of given client', () => {
      const ApolloComponent = withProvider(TestComponent, null, mockClient);
      shallow(<ApolloComponent {...defaultProps} />).instance().mutate({ mutation: 'Test Mutation' });
      expect(mockClient.mutate).toHaveBeenCalledWith({ mutation: 'Test Mutation' });
    });

    it('should run resetStore method after mutation, if flag is set to true', () => {
      const ApolloComponent = withProvider(TestComponent, null, mockClient);
      return shallow(<ApolloComponent {...defaultProps} />).instance().mutate('Test Mutation', true)
        .then(() => expect(mockClient.resetStore).toHaveBeenCalledTimes(1));
    });

    it('should run query with defined refetchQuery', () => {
      const ApolloComponent = withProvider(TestComponent, null, mockClient);
      const mutation = {
        mutate: 'Lorem',
        refetchQueries: [
          { query: 'Ipsum' },
        ],
      };
      const resultQueries = mutation.refetchQueries.map(query => ({ ...query, fetchPolicy: 'network-only' }));
      return shallow(<ApolloComponent {...defaultProps} />).instance().mutate(mutation, true)
        .then(() => expect(mockClient.query).toHaveBeenCalledWith(resultQueries[0]));
    });

    it('should run all queries defined in refetchQueries', () => {
      const ApolloComponent = withProvider(TestComponent, null, mockClient);
      const mutation = {
        mutate: 'Lorem',
        refetchQueries: [
          { query: 'Ipsum' },
          { query: 'Dolor' },
        ],
      };
      return shallow(<ApolloComponent {...defaultProps} />).instance().mutate(mutation, true)
        .then(() => expect(mockClient.query).toHaveBeenCalledTimes(2));
    });

    it('should include initialQuery to refetchQueries', () => {
      const ApolloComponent = withProvider(TestComponent, { query: 'initial' }, mockClient);
      const mutation = {
        mutate: 'Lorem',
      };
      const tree = shallow(<ApolloComponent {...defaultProps} />);
      mockClient.query.mockClear();
      return tree.instance().mutate(mutation, true)
        .then(() => expect(mockClient.query).toHaveBeenCalledWith(
          { query: 'initial', fetchPolicy: 'network-only' },
        ));
    });
  });

  describe('refresh()', () => {
    it('should run initialQuery after refresh action', () => {
      const ApolloComponent = withProvider(TestComponent, { query: 'Lorem' }, mockClient);
      const tree = mount(<ApolloComponent {...defaultProps} />);
      tree.instance().refresh();
      expect(mockClient.query).toHaveBeenCalledTimes(2);
    });
  });

  describe('runCommand()', () => {
    it('should return data from promise, if able', () => {
      const client = {
        ...mockClient,
        mutate: () => Promise.resolve({ data: { items: ['lorem', 'ipsum', 'dolor'] } }),
      };
      const ApolloComponent = withProvider(TestComponent, null, client);
      const instance = mount(<ApolloComponent {...defaultProps} />).instance();
      return instance.mutate('Lorem')
        .then(result => expect(result).toEqual({ items: ['lorem', 'ipsum', 'dolor'] }));
    });

    it('should return response from promise, if data is not present', () => {
      const client = {
        ...mockClient,
        mutate: () => Promise.resolve({ test: 'My perfect test' }),
      };
      const ApolloComponent = withProvider(TestComponent, null, client);
      const instance = mount(<ApolloComponent {...defaultProps} />).instance();
      instance.mutate('Lorem')
        .then(result => expect(result).toEqual({ test: 'My perfect test' }));
    });
  });
});
