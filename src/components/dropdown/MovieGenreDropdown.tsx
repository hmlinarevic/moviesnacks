import { useState, useEffect } from 'react'
import { Dropdown } from 'react-bootstrap'

interface Props {
  listOfGenre: string[]
  setGenre: (genre: string) => void
  isClear: boolean
}

export default function MovieGenreDropdown(props: Props) {
  const [selected, setSelected] = useState('')

  useEffect(() => {
    if (props.isClear) {
      setSelected('')
    }
  }, [props.isClear])

  return (
    <Dropdown
      className="ms-2"
      onSelect={(e) => {
        if (e) {
          props.setGenre(e)
          setSelected(e)
        }

        if (e === selected) {
          setSelected('')
          props.setGenre('')
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
              active={genre === selected}
            >
              <p>{genre}</p>
            </Dropdown.Item>
          ))}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  )
}
