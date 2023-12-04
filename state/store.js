// store.js
import { configureStore } from "@reduxjs/toolkit";
import profileReducer from './reducers';


const store = configureStore({
	reducer: {
		profile: profileReducer
	}
});

export default store;
