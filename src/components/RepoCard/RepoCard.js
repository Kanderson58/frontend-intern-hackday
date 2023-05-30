import { propTypes } from "react"

const RepoCard = ({repo}) => {
 
  return (
    <div>
      {console.log(repo)}
    </div>
  )
}

export default RepoCard

RepoCard.propTypes = {
  repo: propTypes.Obj
} 