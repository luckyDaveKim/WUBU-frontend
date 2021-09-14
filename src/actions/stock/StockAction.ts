import { ActionType, createAction } from "typesafe-actions";
import { CODE } from "./StockActionTypes";

export const setCode = createAction(CODE)<string>();

export const stockActions = {
  setCode
};
export type StockAction = ActionType<typeof stockActions>;
