import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _isArray from 'lodash/isArray';
import _omit from 'lodash/omit';
import { startRequest } from '../../actions/request';

const apolloClientMethods = {
  mutate: 'mutate',
  query: 'query',
};

export function withProvider(WrappedComponent, initialQuery, apolloClient) {
  return class ComponentWithProvider extends Component {
    static propTypes = {
      startRequest: PropTypes.func.isRequired,
    };

    constructor() {
      super();
      this.state = {
        data: {},
        error: null,
      };
    }

    componentDidMount() {
      this.mounted = true;
      this.executeInitialQuery();
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    mounted = false;

    query = ({ messages, ...query }) => this.startCommand(messages, query, apolloClientMethods.query);

    // extract refetch queries to manually trigger them after request. Workaround for racing condition:
    // https://github.com/apollographql/apollo-client/issues/1821
    mutate = ({ refetchQueries, messages, ...mutation }, resetStore) =>
      this.startCommand(
        messages,
        mutation,
        apolloClientMethods.mutate,
        [
          // include initial query automatically, if such was defined
          ...(initialQuery ? this.extractQuery(initialQuery) : []),
          ...(refetchQueries || []),
        ],
        resetStore,
      );

    refresh = () => this.executeInitialQuery();

    executeInitialQuery() {
      if (initialQuery) {
        const queries = this.extractQuery(initialQuery);
        return Promise.all(
          queries
            .map(query =>
              this.query(query)
            )
        );
      }
    }

    extractQuery(query) {
      const queries = typeof query === 'function'
        ? query(_omit(this.props, 'startRequest'), this.state)
        : query;

      return (_isArray(queries) ? queries : [queries])
        .map(query => ({ handleResults: true, ...query }));
    }

    startCommand(messages, ...args) {
      const promise = this.runCommand(...args);
      this.props.startRequest(promise, messages);
      return promise;
    }

    runCommand({ handleResults, ...command }, method, refetchQueries = [], resetStore = false) {
      // reset store is required
      if (resetStore) {
        apolloClient.resetStore();
      }
      // run command
      return apolloClient[method](command)
        .then(response =>
          // manually refetch queries
          this.refetchQueries(refetchQueries)
            .then(() => response)
        )
        .then(response => {
          if (response && response.data) {
            // if handleResults is set to true, result is passed to wrapped component in props
            handleResults && this.updateState(state => ({
              data: { ...state.data, ...response.data },
              error: null,
            }));
            return response.data;
          } else {
            return response;
          }
        })
        .catch(error => {
          this.updateState({ error: error.message });
          return Promise.reject(error);
        });
    }

    refetchQueries(queries) {
      return Promise.all(
        queries.map(query => this.query(
          Object.assign({}, query, {
            fetchPolicy: 'network-only',
          }),
        ))
      );
    }

    updateState(newState) {
      if (this.mounted) {
        return this.setState(newState);
      }
      return null;
    }

    render() {
      return <WrappedComponent
        query={this.query}
        mutate={this.mutate}
        refresh={this.refresh}
        error={this.state.error}
        {...this.state.data}
        {..._omit(this.props, 'startRequest')}
      />;
    }
  };
}

export default (...args) =>
  connect(
    null,
    { startRequest },
  )(withProvider(...args));
