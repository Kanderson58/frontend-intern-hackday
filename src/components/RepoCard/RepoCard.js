/* eslint-disable */
import './RepoCard.css'

const RepoCard = ({repo, getSingleRepo}) => {

 
  return (
    <div className='repo-card' id={`${repo.commits_url.substring(0, repo.commits_url.length - 6)}`} onClick={(e) => getSingleRepo(e.target.parentNode.parentNode.id)}>
      <ul>
        <li>{repo.name ? 'Name: ' + repo.name : 'Sorry, no name available'}</li>
        <li>{repo.language ? 'Language: ' + repo.language : 'Sorry, no languages on file'}</li>
        <li>{repo.description ? 'Description: ' + repo.description : 'Sorry, no description available'}</li>
        <li>{repo.stargazers_count ? 'Number of stars: ' + repo.stargazers_count : 'Sorry, unkown number of stars'}</li>
        <li>{repo.forks_count ? 'Number of forks: ' + repo.forks_count : 'Sorry, unknown number of forks'}</li>
        <li>{repo.created_at ? 'Created on: ' + repo.created_at : 'Sorry, unknown creation date'}</li>
      </ul>
    </div>
  )
}

export default RepoCard