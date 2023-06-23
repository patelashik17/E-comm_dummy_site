import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface pageReducer {
  productData: any;
  addSuccess: boolean;
  bedgeCount: number;
  quantity: any;
}
const initialState: pageReducer = {
  productData: [],
  addSuccess: false,
  bedgeCount: 0,
  quantity: "",
};

const HomepageReducer = createSlice({
  name: "HomePage",
  initialState,
  reducers: {
    setProductData: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        productData: action.payload,
      };
    },
    setAddSuccess: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        addSuccess: action.payload,
      };
    },
    setBedgeCount: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        bedgeCount: action.payload,
      };
    },
  },
});

export const { setAddSuccess, setBedgeCount, setProductData } =
  HomepageReducer.actions;

export default HomepageReducer.reducer;
