import './Poster.css'

export default function Poster({ imgUrl }: { imgUrl: string }) {
  return (
    <div className="poster">
      <img src={imgUrl} alt="a" />
    </div>
  )
}
