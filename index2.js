import {render} from 'react-dom';
import React from 'react'
import Users from './src/containers/users';
import App from './src/components/App';
import First from './src/components/First';
// connect is used to pass the react components the state
// from redux through props
import { connect } from 'react-redux';
// provider is an react component which takes the store
// as a prop and passes the props to their childrens are a props
import { Provider } from 'react-redux';
// Users is a child element. Any number of child
//components can be add to provider and those will get access to the store
import UsersStore from './src/store';
render(
    <Provider store = {UsersStore}>
        <Users />
    </Provider>,
    document.getElementById('App2')
);
render(
    <App />,
    document.getElementById('App')
);
render(
    <First />,
    document.getElementById('First')
);
