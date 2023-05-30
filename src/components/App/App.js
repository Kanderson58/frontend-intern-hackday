import './App.css'
import { useState } from 'react';
import RepoCard from '../RepoCard/RepoCard';

function App() {
  const [search, setSearch] = useState('');
  const [repos, setRepos] = useState([]);

  const submitSearch = (e) => {
    e.preventDefault();

    fetch(`https://api.github.com/orgs/${search}/repos`)
      .then(response => response.json())
      .then(data => setRepos(data))
  }

  return (
    <div>
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
          {repos && repos.map(repo => <RepoCard key={repo.name} repo={repo}/>)}
      </div>
    </div>
  );
}

export default App;
