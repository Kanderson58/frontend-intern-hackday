/* eslint-disable */

import './App.css'
import { useState } from 'react';
import RepoCard from '../RepoCard/RepoCard';
import RepoCommits from '../RepoCommits/RepoCommits';

function App() {
  const [search, setSearch] = useState('');
  const [repos, setRepos] = useState([]);
  const [singleRepoCommits, setSingleRepoCommits] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('');

  const submitSearch = (e) => {
    e.preventDefault();
    setError('');
    setRepos([]);
    setSingleRepoCommits([]);
    setLoading(true);

    if(search) {
      fetch(`https://api.github.com/orgs/${search}/repos`)
        .then(response => {
          if(response.ok) {
            return response.json()
          } else {
            // check your load states
            // hit enter to submit the form
            // don't worry about making ti cute
            setError('Sorry, that search has no results.  Try a different search.')
          }
        })
        .then(data => {
          setLoading(false);
          setRepos(data.sort((a, b) => b.stargazers_count - a.stargazers_count));
        })
    } else {
      setError('Please enter a search term');
    }
  }

  const getSingleRepo = (id) => {
    setError('');
    setLoading(true);

    fetch(`${id}`)
      .then(response => {
        if(response.ok) {
          return response.json()
        } else {
          setError('Sorry, there was an error. Try again later.');
        }
      })
      .then(data => {
        setLoading(false);
        setSingleRepoCommits(data);
      });
  }

  return (
    <main>
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
            <button type="submit" className="btn btn-primary" onClick={(e) => submitSearch(e)}>Search</button>
          </form>
          {loading && <p>Loading...</p>}
          {singleRepoCommits.length !== 0 && <div className='repo-commits'>{singleRepoCommits.sort((a, b) => a.commit.author.date - b.commit.author.date).map(commit => <RepoCommits key={commit.commit.author.date} commit={commit}/>)}</div>}
          {(repos !== [] && !error && singleRepoCommits.length === 0) && repos.map(repo => <RepoCard key={repo.name} repo={repo} getSingleRepo={getSingleRepo}/>)}
          {error && <p>{error}</p>}
      </div>
    </main>
  );
}

export default App;
