import React from 'react';
import { connect } from 'react-redux';
import { postNewItem } from '../redux/reducers/reducer';

const Header = (props) => {
  return (
    <header>
      <div className="content container">
        <form onSubmit={evt => {
          evt.preventDefault();
          props.postNewItem(evt.target.itemName.value);
          evt.target.itemName.value = "";
        }
        }>
          <div className="form-group">
            <label for="exampleInputEmail1">Add New Item</label>
            <input autoComplete="off" className="form-control input-lg" name="itemName" placeholder="Enter new item" />
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
    </header>
  );
};


const mapDispatch = {postNewItem};
export default connect(null, mapDispatch)(Header);
