import {
  GET_PRODUCTS_BY_ARRIVAL,
  GET_PRODUCTS_BY_SELL,
  GET_BRANDS,
  GET_CATEGORIES,
  GET_PRODUCTS_TO_SHOP,
  ADD_PRODUCT,
  CLEAR_PRODUCT,
  ADD_BRAND,
  ADD_CATEGORY,
  GET_PRODUCT_DETAIL,
  //to clear global redux state
  //prevent flashing the older state in screen
  CLEAR_PRODUCT_DETAIL,
} from "../actions/types";
const INITIAL_STATE = {};

const productsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PRODUCTS_BY_SELL:
      return { ...state, bySell: action.payload };
    case GET_PRODUCTS_BY_ARRIVAL:
      return { ...state, byArrival: action.payload };
    case GET_BRANDS:
      return { ...state, brands: action.payload };
    case GET_CATEGORIES:
      return { ...state, categories: action.payload };
    case GET_PRODUCTS_TO_SHOP:
      return {
        ...state,
        toShop: action.payload.articles,
        toShopSize: action.payload.size
      };
    case ADD_PRODUCT:
      return { ...state, addProduct: action.payload };
    case CLEAR_PRODUCT:
      return { ...state, addProduct: action.payload };
    case ADD_BRAND:
      return { 
        ...state, 
        addBrand: action.payload.success,
        brands: action.payload.brands 
      };
    case ADD_CATEGORY:
      return { 
        ...state, 
        addCategory: action.payload.success,
        categories: action.payload.categories 
      };
    case GET_PRODUCT_DETAIL:
      return { 
        ...state, 
        prodDetail: action.payload
      };
    case CLEAR_PRODUCT_DETAIL:
      return { 
        ...state, 
        prodDetail: action.payload
      };
    default:
      return state;
  }
};

export default productsReducer;
