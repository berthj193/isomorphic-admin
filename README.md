### Installation

We're using Yarn to manage dependencies so the first step, after cloning the repository, is to run `yarn` in order to fetch the various libraries we require.

Next, run `yarn start`. This will load the development server.

### GraphQL Approach

#### Case:
Application is currently using two sources of data (as mentioned in API Endpoints). That's why conventional libraries like ReactApollo won't fit into this app.

#### Approach:
We decided to create HOC that would handle requests to API. They are called:
- withStoresManager in `components/apolloProviders/withStoresManager` )
- withOrdersManager in  `components/apolloProviders/withOrdersManager` )

Every component that requires access to those managers, requires to use wrappers like this:

```javascript
const Component = () => <span/>;

export default withOrdersManager(Component);
export default withStoresManager(Component);
```

#### Usage:
Wrapped component would get set of methods in properties:
- `query` - (Query) method that runs query,
- `mutate` - (Mutation, resetStore = false) method runs mutation. If initial query was defined, it will automatically rerun it
- `refresh` - method reruns initial query

Also if any request finished with error, it would be also passed in `error` property.

All methods above also returns Promise with results. If `data` was present in response, it is automatically extracted.
```javascript
  class ApolloComponent extends Component {
    // ...
    addSomething() {
      this.props.query({...}) // response { lorem: "ipsum" }
        .then(console.log) // { lorem: "ipsum" }
    }

    addSomethingElse() {
      this.props.query({...}) // response { data: { dolor: "sit amet" } }
        .then(console.log) // { dolor: "sit amet" }
    }
    // ...
  }

```

Available parameters:
```javascript
const Query = {
  query: {}, // graphql query
  variables: {} // variables for query
  handleResults: Boolean // defines if results of this query should be passed to properties of wrapped component (defaults to false)
  messages: ['success', 'failure'], // optional message to be emitted after [ success, failure ]
  // all other options available in ApolloClient
}

const Mutation = {
  mutation: {}, // graphql mutation
  variables: {}, // variables for mutation
  refetchQueries: [Query], // array of Queries to rerun after mutation
  messages: ['success', 'failure'], // optional message to be emitted after [ success, failure ]
  // all other options available in ApolloClient
}
```

If Your component requires data to be displayed, you can pass `initialQuery` to HOC provider like this:

```javascript
withStoresProvider(Component, Query)
withStoresProvider(Component, [Query, Query])
withStoresProvider(Component, (props) => Query)
withStoresProvider(Component, (props) => [Query, Query])
```
Results of such query is going to be applied to wrapped component properties. To avoid it, add flag `handleResult` with value `false` to query/mutation.

All initial queries are going to be rerun after every mutation.

