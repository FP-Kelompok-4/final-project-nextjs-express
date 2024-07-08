import { createSlice } from "@reduxjs/toolkit";
import { postReview } from "./review-thunk";

type InitialState = {
  refetch: boolean;
}

const initialState: InitialState = {
  refetch: false,
}

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(postReview.pending, (state) => {
      state.refetch = true;
    })
    builder.addCase(postReview.fulfilled, (state, action) => {
      state.refetch = false;
    })
  },
})

const {} = reviewSlice.actions;
export default reviewSlice.reducer;