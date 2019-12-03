import { combineReducers } from 'redux';
import userReducer from './user_reducer';
import productsReducer from './products_reducer';

const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer
});

export default rootReducer;