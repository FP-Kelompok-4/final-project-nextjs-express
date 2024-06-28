import { createSlice } from "@reduxjs/toolkit";
import { getPropertiesClientThunk } from "./property-thunk";

export type TPropertiesClient = {
  id: string;
  name: string;
  description: string;
  location: string;
  image: string;
  price: number;
}

type TInitialState = {
  properties: TPropertiesClient[];
  isLoading: boolean;
}

const initialState: TInitialState = {
  properties: [],
  isLoading: true
}

const propertiesClientSlice = createSlice({
  name: 'propertiesClient',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getPropertiesClientThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getPropertiesClientThunk.fulfilled,
      (state, action) => {
        if (action.payload) state.properties = action.payload.data;

        state.isLoading = false;
      },
    );
  },
})

export const {} = propertiesClientSlice.actions;
export default propertiesClientSlice.reducer;
