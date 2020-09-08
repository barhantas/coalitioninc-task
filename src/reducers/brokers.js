import { INIT_BROKER_LIST, SET_BROKER_LIST } from "../actions";

export const brokersInitialState = [];

export const brokersReducer = (state, action) => {
  switch (action.type) {
    case SET_BROKER_LIST:
      return { brokerList: action.payload };
    case INIT_BROKER_LIST:
      return { brokerList: brokersInitialState };
    default:
      throw new Error("Unexpected action");
  }
};
