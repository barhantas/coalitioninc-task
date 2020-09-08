import React, { useReducer, createContext, useEffect } from "react";
import store from "store";

import { SET_BROKER_LIST, INIT_BROKER_LIST } from "../actions";
import { brokersReducer } from "../reducers";
import { useFetch } from "../hooks";
import { URLS } from "../constants";

const StoreContext = createContext();

function StoreProvider({ children }) {
  // using a reducer and adding it to store code sample
  /* const [brokersState, brokersDispatch] = useReducer(brokersReducer);

  const setBrokerList = (brokerList) => {
    brokersDispatch({ type: SET_BROKER_LIST, payload: brokerList})
  }

  const initBrokerList = () => {
    brokersDispatch({ type: INIT_BROKER_LIST})
  }
  
  //important for adding the data fetching funtion of the reducer to the store.
  const { doFetch: doBrokerListFetchRequest } = useFetch();
  
  const doBrokerListFetch = () => {
    doBrokerListFetchRequest({url: URLS.brokerList, onSuccess: setBrokerList});
  } */

  // initializing the store sample
  /* const initialStore = {
    data: {
      ...brokersState,
    },
    setBrokerList,
    initBrokerList,
    doBrokerListFetch,
  }; */

  const initialStore = {};

  return (
    <StoreContext.Provider value={initialStore}>
      {children}
    </StoreContext.Provider>
  );
}

export { StoreContext, StoreProvider };
