import React, {Component} from 'react';
import {connect} from 'react-redux';
import Item from './Item';

class Section extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <section id="one" className="wrapper style2 special flow">
        {
          this.props.items && this.props.items.map((item) => {
            if (!item)
              return <div></div>
            return (
              <Item key={item._id} Obj={item} isComplete={item.metafields[0].value} Name={item.title}/>
            )
          })
        }
      </section>
    );
  }

}
;

const mapState = ({items}) => ({items});
export default connect(mapState)(Section);