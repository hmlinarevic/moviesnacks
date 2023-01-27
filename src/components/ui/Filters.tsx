import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Filter } from '../../hooks/useFilter'
import MovieGenreDropdown from '../dropdown/MovieGenreDropdown'
import MovieReleaseYearDropdown from '../dropdown/MovieReleaseYearDropdown'
import FilterSvg from '../svg/FilterSvg'
import XSvg from '../svg/XSvg'
import './Filters.css'

interface Props {
  listOfGenre: string[]
  // setFilter: (prop: string, callback: (...params: any) => boolean) => void
  setFilter: React.Dispatch<React.SetStateAction<Filter | null>>
}

export default function Filters({ listOfGenre, setFilter }: Props) {
  const [releaseYear, setReleaseYear] = useState(0)
  const [genre, setGenre] = useState('')
  const [isClear, setIsClear] = useState(false)

  const filterByMovieReleaseYear = (movieYear: string) => {
    // movieYear will be releaseDate prop in MovieDetails which is in string format, e.g. ("2022-10-12")
    return new Date(movieYear).getFullYear() === releaseYear
  }

  const filterByMovieGenre = (movieGenres: string[]) => {
    return movieGenres.includes(genre)
  }

  useEffect(() => {
    releaseYear &&
      setFilter({
        prop: 'releaseDate', // releaseDate in MovieDetails
        callback: filterByMovieReleaseYear,
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [releaseYear])

  useEffect(() => {
    if (!genre) {
      setFilter(null)
    } else {
      setFilter({ prop: 'genres', callback: filterByMovieGenre })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genre])

  useEffect(() => {
    if (isClear) {
      setFilter(null)
      setIsClear(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClear])

  return (
    <div className="filters d-flex align-items-center mb-5">
      <div className="me-3">
        <FilterSvg className="filters-svg" />
        <span className="filters-text ms-2">FILTERS</span>
      </div>

      <MovieReleaseYearDropdown setReleaseYear={setReleaseYear} />

      <MovieGenreDropdown
        listOfGenre={listOfGenre}
        setGenre={setGenre}
        isClear={isClear}
      />

      <div>
        <Button
          className="d-flex items-center ms-2"
          variant="dark"
          onClick={() => {
            setIsClear(true)
          }}
        >
          <XSvg />
          RESET
        </Button>
      </div>
    </div>
  )
}
