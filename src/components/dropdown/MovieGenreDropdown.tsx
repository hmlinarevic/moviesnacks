import { useState, useEffect } from 'react'
import { Dropdown } from 'react-bootstrap'
import { FilterProps } from '../ui/Filters'

export default function MovieGenreDropdown(props: FilterProps) {
  const [selectedGenre, setSelectedGenre] = useState('')

  // declared at parent (<DiscoveryPage />)
  const [filter, setFilter] = props.filterState

  useEffect(() => {
    if (!filter) {
      setSelectedGenre('')
    }
  }, [filter])

  return (
    <Dropdown
      className="ms-2"
      onSelect={(e) => {
        if (!e) return

        if (e === selectedGenre) {
          setFilter('')
          setSelectedGenre('')
        } else {
          setFilter(e)
          setSelectedGenre(e)
        }
      }}
    >
      <Dropdown.Toggle variant="dark">Genres</Dropdown.Toggle>
      <Dropdown.Menu variant="dark" style={{ minWidth: '300px' }}>
        <div className="m-2">
          {props.listOfGenre?.map((genre) => (
            <Dropdown.Item
              eventKey={genre}
              key={genre}
              active={selectedGenre === genre}
            >
              {/* <button>{genre}</button> */}
              {/* active={isGenreButtonActive} */}
              <p>{genre}</p>
            </Dropdown.Item>
          ))}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  )
}
