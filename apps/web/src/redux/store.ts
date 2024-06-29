import { configureStore } from '@reduxjs/toolkit';
import settingsReaducer from '@/redux/slices/settings-slice';
import propertyCategoryReducer from './slices/propertyCategory-slice';
import tenantReducer from './slices/tenant-slice';
import roomReducer from './slices/room-slice';
import roomAvailabilityReducer from "./slices/roomAvailability-slice";
import propertiesClientSlice from "./slices/client/property-slice";

export const store = configureStore({
  reducer: {
    settingsReaducer,
    propertyCategoryReducer,
    tenantReducer,
    roomReducer,
    roomAvailabilityReducer,
    propertiesClientSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
