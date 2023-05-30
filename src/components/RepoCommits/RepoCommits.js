/* eslint-disable */
import './RepoCommits.css';

const RepoCommits = ({commit}) => {
  return (
    <ul className='commit' tabIndex='0'>
      <li>Commit made by: {commit.commit.author.name}</li>
      <li className='message'>Commit message: {commit.commit.message}</li>
      <li>Commit date: {commit.commit.author.date.substring(0, 10)}</li>
      <li>Commit hash: {commit.sha}</li>
    </ul>
  )
}

export default RepoCommits;