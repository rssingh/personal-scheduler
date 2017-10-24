import React from 'react';
import {Router, Route, IndexRedirect, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import Home from './Home';
import { getAllItems } from '../redux/reducers/reducer';

const Routes = ({getAllItems}) => {
  return (
    <Router history={browserHistory}>
        <Route path="/" component={Home} onEnter={getAllItems} />
    </Router>
  )
};

const mapState = ({items}) => ({items});
const mapDispatch = {getAllItems};

export default connect(mapState, mapDispatch)(Routes);