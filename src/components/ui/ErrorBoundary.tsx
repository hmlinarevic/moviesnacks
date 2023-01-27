/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import './ErrorBoundary.css'

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: any, info: any) {
    console.log(error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container className="container-error">
          <Link to="/">Click here to go back.</Link>
          <h2>Something went wrong.</h2>
        </Container>
      )
    }

    return this.props.children
  }
}
export default ErrorBoundary
