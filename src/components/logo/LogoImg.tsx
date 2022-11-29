import moviesnacksPng from '../../assets/moviesnacks.png'

const LogoImg = ({ size }: { size: number }) => {
  return (
    <img
      style={{
        width: `${size}px`,
      }}
      className="logo-img"
      src={moviesnacksPng}
      alt="3d glasses and popcorns"
    />
  )
}

export default LogoImg
