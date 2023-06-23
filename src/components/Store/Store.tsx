import CartReducer from "../Cart/Reducer/Reducer";
import HomepageReducer from "../Homepage/Reducer/Reducer";
import { configureStore } from "@reduxjs/toolkit";
import InvoiceSlice from "../Invoice/Reducer/Reducer";

const store = configureStore({
  reducer: {
    HomePage: HomepageReducer,
    CartReducer: CartReducer,
    invoiceSlice: InvoiceSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
