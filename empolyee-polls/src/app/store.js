import { configureStore } from '@reduxjs/toolkit';
import middleware from '../middleware';
import reducers from '../reducers';

export const createNewStore = (preloadedState) => configureStore({
  reducer: reducers,
  middleware,
  preloadedState
});

export const store = createNewStore();
