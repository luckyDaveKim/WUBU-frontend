import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { stockActions } from "../../actions/stock/StockAction";

export default function useControllerActions() {
  const dispatch = useDispatch();

  const setCode = useCallback(
    code => {
      dispatch(stockActions.setCode(code));
    },
    [dispatch]
  );

  return {
    setCode
  }
}
