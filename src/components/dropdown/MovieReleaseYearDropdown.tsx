import { useState, useEffect } from 'react'
import { Dropdown, Form } from 'react-bootstrap'
import { FilterProps } from '../ui/Filters'

export default function MovieReleaseYearDropdown(props: FilterProps) {
  const [releaseYear, setReleaseYear] = useState(0)

  // declared at parent (<DiscoveryPage />)
  const [filter, setFilter] = props.filterState

  // debounce <Form.Range onChange />
  useEffect(() => {
    if (!releaseYear) return

    const timeoutID = setTimeout(() => setFilter(releaseYear), 1000)

    return () => clearTimeout(timeoutID)
  }, [releaseYear, setFilter])

  return (
    <Dropdown>
      <Dropdown.Toggle variant="dark">Release year</Dropdown.Toggle>
      <Dropdown.Menu variant="dark" style={{ minWidth: '300px' }}>
        <div className="m-2">
          <Form.Label>
            Release year <span className="me-1">{releaseYear}</span>
          </Form.Label>
          <div className="d-flex">
            <span className="me-2">1900</span>
            <Form.Range
              min={1900}
              max={new Date().getFullYear()}
              step={1}
              onChange={(e) => setReleaseYear(e.target.valueAsNumber)}
            />
            <span className="ms-2">{new Date().getFullYear()}</span>
          </div>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  )
}
