import { createReducer } from 'typesafe-actions';
import { StockAction } from '../actions/stock/StockAction';
import { CODE } from "../actions/stock/StockActionTypes";

/* Types */
type Stock = {
  code?: string;
};
export type StockKey = keyof Stock;

const initialStock: Stock = {
  code: undefined
};

/* Reducer */
const stock = createReducer<Stock, StockAction>(initialStock, {
  [CODE]: (state, action) => {
    return {...state, code: action.payload};
  }
});

export default stock;
