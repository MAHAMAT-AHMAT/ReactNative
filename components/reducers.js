import { combineReducers } from "redux";

const initialState = {
  posts: [],
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_POSTS":
      return { ...state, posts: action.payload };
    case "ADD_POST":
      return { ...state, posts: [...state.posts, action.payload] };
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    case "EDIT_POST":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id
            ? { ...post, ...action.payload.updatedPost }
            : post
        ),
      };
    default:
      return state;
  }
};

export default combineReducers({
  posts: postsReducer,
});
