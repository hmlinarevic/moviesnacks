import { useState, useEffect } from 'react'
import { Dropdown, Form } from 'react-bootstrap'

interface Props {
  setReleaseYear: (year: number) => void
}

export default function MovieReleaseYearDropdown(props: Props) {
  const [selected, setSelected] = useState(0)

  // debounce <Form.Range onChange />
  useEffect(() => {
    if (!selected) return

    const timeoutID = setTimeout(() => props.setReleaseYear(selected), 1000)

    return () => clearTimeout(timeoutID)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  return (
    <Dropdown>
      <Dropdown.Toggle variant="dark">Release year</Dropdown.Toggle>
      <Dropdown.Menu variant="dark" style={{ minWidth: '300px' }}>
        <div className="m-2">
          <Form.Label>
            Release year <span className="me-1">{selected}</span>
          </Form.Label>
          <div className="d-flex">
            <span className="me-2">1900</span>
            <Form.Range
              min={1900}
              max={new Date().getFullYear()}
              step={1}
              onChange={(e) => setSelected(e.target.valueAsNumber)}
            />
            <span className="ms-2">{new Date().getFullYear()}</span>
          </div>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  )
}
