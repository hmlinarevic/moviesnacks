import './Poster.css'

const Poster = ({ imgUrl }: { imgUrl: string }) => {
  return (
    <div className="poster">
      <img src={imgUrl} alt="a" />
    </div>
  )
}

export default Poster
