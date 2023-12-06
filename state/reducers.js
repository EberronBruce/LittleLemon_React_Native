import { ADD_CATEGORY, RECIEVE_IMAGE, REMOVE_CATEGORY, SEARCH_PHRASE } from "./actions";
// Define the initial state
const initialState = {
    imageUri: null,
	categories: [],
	search: ""
};

// Define the reducer function
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
		case RECIEVE_IMAGE:
			return {
				...state,
				imageUri: action.payload,
			};
		case ADD_CATEGORY:
			if(!state.categories.includes(action.payload)) {
				return {
					...state,
					categories: [...state.categories, action.payload],
				};
			}
			return state
		case REMOVE_CATEGORY:
			return {
				...state,
				categories: state.categories.filter((category) => category !== action.payload),
			}
		case SEARCH_PHRASE:
			return {
				...state,
				search: action.payload,
			};
		default:
			return state;
	}
};

// Export the reducer function
export default profileReducer;
