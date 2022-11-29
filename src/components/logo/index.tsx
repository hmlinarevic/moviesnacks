import { Link } from 'react-router-dom'
import LogoImg from './LogoImg'
import LogoText from './LogoText'
import './Logo.css'

const Logo = ({ size }: { size: number }) => {
  return (
    <>
      <Link to="/">
        <div className="logo" style={{ width: `${size}` }}>
          <LogoImg size={size} />
          <LogoText />
        </div>
      </Link>
    </>
  )
}

export default Logo
