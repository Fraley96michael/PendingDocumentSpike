import React, { createContext, useMemo, useReducer } from "react";
import {
  DocumentRequest,
  Document,
  Action,
  ActionTypes,
  ActionEnum,
  Option,
} from "../shared/types";

interface State {
  requests: DocumentRequest[];
  errorMessage: string | null;
}

const initialState: State = {
  requests: [],
  errorMessage: null,
};

export const Context = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state: State, action: Action) => {
  let requests = state.requests;

  switch (action.type) {
    case ActionEnum.INITIALIZE:
      return {
        ...state,
        requests: action.payload.requests,
      };
    case ActionEnum.ADD_REQUEST:
      requests.push(action.payload.request);
      return { ...state, requests };

    case ActionEnum.EDIT_REQUEST:
      requests[action.payload.index] = action.payload.request;
      return { ...state, requests };

    case ActionEnum.REMOVE_REQUEST:
      requests = requests.filter(
        (_request, index) => index !== action.payload.index
      );
      return { ...state, requests };

    case ActionEnum.UPDATE_REQUEST:
      requests[action.payload.index] = action.payload.request;
      return { ...state, requests };

    default:
      return state;
  }
};

export function ContextProvider(props: {
  children: JSX.Element | JSX.Element[];
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
}
