/* eslint-disable */

import './App.css'
import { useState } from 'react';
import RepoCard from '../RepoCard/RepoCard';
import { Route } from 'react-router';

function App() {
  const [search, setSearch] = useState('');
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState('');
  const [singleRepo, setSingleRepo] = useState({});

  const submitSearch = (e) => {
    e.preventDefault();
    setError('');
    setRepos([]);
    setSingleRepo({});

    if(search) {
      fetch(`https://api.github.com/orgs/${search}/repos`)
        .then(response => {
          if(response.ok) {
            return response.json()
          } else {
            setError('Sorry, that search has no results.  Try a different search.')
          }
        })
        .then(data => setRepos(data.sort((a, b) => b.stargazers_count - a.stargazers_count)))
    } else {
      setError('Please enter a search term');
    }
  }

  const getSingleRepo = (id) => {
    console.log(id)
    fetch(`${id}`)
      .then(response => response.json())
      .then(data => console.log(data));
  }

  return (
    <main>
      <Route path='/'>
      <h1>Search for a GitHub organization</h1>
        <div>
          <form>
            <div>
              <label htmlFor="githubOrgSearch" hidden>
                Search for GitHub organization
              </label>
              <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  className="form-control"
                  id="githubOrgSearch"
                  aria-describedby="githubOrgSearch"
                  placeholder="Search for a GitHub Organization"
                />
            </div>
            <button type="submit" className="btn btn-primary" onClick={(e) => submitSearch(e)}>
              Search
            </button>
          </form>
          {(repos !== [] && !error) && repos.map(repo => <RepoCard key={repo.name} repo={repo} getSingleRepo={getSingleRepo}/>)}
          {error && <p>{error}</p>}
      </div>
      </Route>
      <Route path='/:id'>
        <div>
          uhhh
        </div>
      </Route>
    </main>
  );
}

export default App;
