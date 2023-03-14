import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_TOKEN_GITHUB_TOKEN;
const headers = { 'Authorization': {GITHUB_TOKEN}};

export const GithubProvider = ({ children }) => {
  const intialState = {
    users: [],
    user: {},
    loading: false,
  };
  const [state, dispatch] = useReducer(githubReducer, intialState);

  // Get
  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`);

    const { items } = await response.json();

    dispatch({
      type: 'GET_USERS',
      payload: items,
    });

    console.log(items);
  };

  // Get single user
  const getUser = async (login) => {
    setLoading();


    const response = await fetch(`${GITHUB_URL}/users/${login}`, {headers}
    );

    if (response.status === 400) {
      window.location = '/notfound';
    } else {
      const data  = await response.json();

      dispatch({
        type: 'GET_USER',
        payload: data,
      });
    }


  };

  // clear users from state
  const clearUsers = () =>
    dispatch({
      type: 'CLEAR_USERS',
    });

  // Set loading
  const setLoading = () => dispatch({ type: 'SET_LOADING' });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        searchUsers,
        clearUsers,
        getUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
