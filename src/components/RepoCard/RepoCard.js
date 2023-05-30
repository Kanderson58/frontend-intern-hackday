/* eslint-disable */
import './RepoCard.css'

const RepoCard = ({repo}) => {
 
  return (
    <div>
      <ul>
        <li>{repo.name ? repo.name : 'Sorry, no name available'}</li>
        <li>{repo.language ? repo.language : 'Sorry, no languages on file'}</li>
        <li>{repo.description ? repo.description : 'Sorry, no description available'}</li>
        <li>{repo.stargazers_count ? repo.stargazers_count : 'Sorry, unkown number of stars'}</li>
        <li>{repo.forks_count ? repo.forks_count : 'Sorry, unknown number of forks'}</li>
        <li>{repo.created_at ? repo.created_at : 'Sorry, unknown creation date'}</li>
      </ul>
    </div>
  )
}

export default RepoCard