import React, {Component} from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Section from './Section';

class Home extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div>
        <Header />
        <Section />
      </div>
    )
  }
}

const mapState = ({items}) => ({items});
export default connect(mapState)(Home);