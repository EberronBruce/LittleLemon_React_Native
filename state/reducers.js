import { RECIEVE_IMAGE } from "./actions";
// Define the initial state
const initialState = {
    imageUri: null,
};

// Define the reducer function
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
		case RECIEVE_IMAGE:
			return {
				...state,
				imageUri: action.payload,
			};
		default:
			return state;
	}
};

// Export the reducer function
export default profileReducer;
