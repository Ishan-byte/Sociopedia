import { createSlice } from "@reduxjs/toolkit";

// Initial Values for the Global State
const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Reducer for setting the lighting mode of the web UI
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark " : "light";
    },

    // Reducer for setting the user information
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.user;
    },

    // Reducer for logging out and setting the user information state
    setLogOut: (state) => {
      state.user = null;
      state.token = null;
    },

    // Reducer for setting user friends
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("User Friend's are non-existent");
      }
    },

    // Reducer for getting all the posts
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },

    // Reducer for updating a single post without invoking get API
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });

      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogOut, setFriends, setPosts, setPost } =
    authSlice.actions;

export default authSlice.reducer;
