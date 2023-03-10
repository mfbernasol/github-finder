import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = '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';

export const GithubProvider = ({ children }) => {
  const intialState = {
    users: [],
    loading: true,
  };
  const [state, dispatch] = useReducer(githubReducer, intialState);

  const fetchUsers = async () => {
    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
      },
    });

    //with headers
    // const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
    //   headers: {
    //     Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
    //   },
    // });

    const data = await response.json();

    dispatch({
      type: 'GET_USERS',
      payload: data
    });

    console.log(data);
  };

  return (
    <GithubContext.Provider value={{ users: state.users, loading: state.loading, fetchUsers }}>
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
