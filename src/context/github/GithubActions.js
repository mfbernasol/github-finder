const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_TOKEN_GITHUB_TOKEN;
const headers = { Authorization: { GITHUB_TOKEN } };

// Get search results
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });

  const response = await fetch(`${GITHUB_URL}/search/users?${params}`);

  const { items } = await response.json();

  return items;
};

// Get single user
export const getUser = async (login) => {
  const response = await fetch(`${GITHUB_URL}/users/${login}`, { headers });

  if (response.status === 400) {
    window.location = '/notfound';
  } else {
    const data = await response.json();
    return data;
  }
};

// Get user repos
export const getUserRepos = async (login) => {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10,
  });

  const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
    headers,
  });

  const data = await response.json();
  return data;
};


