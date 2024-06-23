import { configureStore } from '@reduxjs/toolkit';
import settingsReaducer from '@/redux/slices/settings-slice';
import propertyCategoryReducer from "./slices/propertyCategory-slice";

export const store = configureStore({
  reducer: {
    settingsReaducer,
    propertyCategoryReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
