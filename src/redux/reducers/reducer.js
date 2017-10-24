import axios from "axios";
import config from '../../config';
/////////////////CONSTANTS/////////////////////


const GET_ALL_ITEMS = "GET_ALL_ITEMS";
const POST_ITEM = "POST_ITEM";
const CHANGE_STATUS = "CHANGE_STATUS";
const DELETE_ITEM = "DELETE_ITEM";


/////////////////ACTIONS//////////////

const getItems = (items) => ({type: GET_ALL_ITEMS, items});
const addItem = (item) => ({type: POST_ITEM, item});
const changeStatus = (item) => ({type: CHANGE_STATUS, item});
const itemDelete = (slug) => ({type: DELETE_ITEM, slug});


/////////////////REDUCER/////////////////////

//initiate your starting state
let initial = {
  items: []
};

const reducer = (state = initial, action) => {

  switch (action.type) {
    case GET_ALL_ITEMS:
      return Object.assign({}, state, {items: action.items.objects});
    case POST_ITEM:
      let updatedItems = [action.item].concat(state.items);
      return Object.assign({}, state, {items: updatedItems});
    case CHANGE_STATUS:
      let newArr = state.items.map((item) => {
        if(item.slug === action.item.slug) item.metafields[0].value = !item.metafields[0].value;
        return item;
      });
      return Object.assign({}, state, {items: newArr});
    case DELETE_ITEM:
      let arr = state.items.filter((item) => {
        return !(item.slug === action.slug);
      });
      return Object.assign({}, state, {items: arr});
    default:
      return state;
  }

};

export default reducer;


/////////////// ACTION DISPATCHER FUNCTIONS///////////////////

export const getAllItems = () => dispatch => {
  axios.get(`https://api.cosmicjs.com/v1/${config.bucket.slug}/object-type/items`)
    .then((response) => {
      return response.data;
    })
    .then((items) => {
      dispatch(getItems(items))
    })
    .catch((err) => {
      console.error.bind(err);
    })
};

export const postNewItem = (item) => dispatch => {
  axios.post(`https://api.cosmicjs.com/v1/${config.bucket.slug}/add-object`, {type_slug: "items", title: item, content: "New Item",
    metafields: [
      {
        title: "Is Complete",
        key: "is_complete",
        value: false,
        type: "text"
      }
    ]})
    .then((response) => {
      return response.data;
    })
    .then((item) => {
      dispatch(addItem(item.object));
    })
    .catch((err) => {
      console.error.bind(err);
    })
};

export const putChangeStatus = (item, bool) => (dispatch) => {
  axios.put(`https://api.cosmicjs.com/v1/${config.bucket.slug}/edit-object`, {slug: item.slug,
    metafields: [
      {
        title: "Is Complete",
        key: "is_complete",
        value: !bool,
        type: "text"
      }
    ]})
    .then((response) => {
      return response.data;
    })
    .then((item) => {
      dispatch(changeStatus(item.object));
    })
    .catch((err) => {
      console.error.bind(err);
    })
};

export const deleteItem = (slug) => (dispatch) => {
  dispatch(itemDelete(slug));
  axios.delete(`https://api.cosmicjs.com/v1/${config.bucket.slug}/${slug}`)
    .then((response) => {
    })
    .catch((err) => {
      console.error.bind(err);
    })
};

const formatSlug = (title) => {
  return title.toLowerCase().split(" ").join("-");
};