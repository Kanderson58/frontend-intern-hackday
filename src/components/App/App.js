/* eslint-disable */

import './App.css'
import { useState } from 'react';
import RepoCard from '../RepoCard/RepoCard';
import RepoCommits from '../RepoCommits/RepoCommits';
import { Octokit } from "octokit";

const octokit = new Octokit({ 
  auth: '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'
});

function App() {
  const [search, setSearch] = useState('');
  const [repos, setRepos] = useState([]);
  const [singleRepoCommits, setSingleRepoCommits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submitSearch = async (e) => {
    e.preventDefault();
    setError('');
    setRepos([]);
    setSingleRepoCommits([]);
    setLoading(true);

    if(search) {
      const request = await octokit.paginate(`GET /orgs/${search}/repos`);

      if(request.length) {
        setLoading(false);
        request ? setRepos(request.sort((a, b) => b.stargazers_count - a.stargazers_count)) : setError('Sorry, that search has no results.  Try a different search.');
      } else {
        setError('Sorry, something went wrong.  Try again later.');
      }
    }
  }

  const getSingleRepo = async (id) => {
    setError('');
    setLoading(true);
    setSearch('');

    const endpoint = id.split('/')
    console.log('/' + endpoint[3] + '/' + endpoint[4] + '/' + endpoint[5] + '/' + endpoint[6])

    const request = await octokit.paginate(`GET ${'/' + endpoint[3] + '/' + endpoint[4] + '/' + endpoint[5] + '/' + endpoint[6]}`);

    if(request.length) {
      setLoading(false);
      setSingleRepoCommits(request);
    } else {
      setError('Sorry, there was an error.  Try again later.')
    }
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
          {loading && <p className='loading'>Loading...</p>}
          {singleRepoCommits.length !== 0 && <div className='repo-commits'>{singleRepoCommits.sort((a, b) => a.commit.author.date - b.commit.author.date).map(commit => <RepoCommits key={commit.commit.author.date} commit={commit}/>)}</div>}
          {(repos !== [] && !error && singleRepoCommits.length === 0) && repos.map(repo => <RepoCard key={repo.name} repo={repo} getSingleRepo={getSingleRepo}/>)}
          {error && <p className='error'>{error}</p>}
      </div>
    </main>
  );
}

export default App;