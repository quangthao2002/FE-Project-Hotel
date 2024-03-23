import React from 'react'
import { Container } from 'react-bootstrap'

const Parallax = () => {
  return (
    <div className='parallax mb-5'>
      <Container className='text-center px-5 py-5 justify-content-center align-content-center'>
        <div className='animated-texts bounceIn'>
            <h1>
                Welcom to <span className='hotel-color'>QT-Hotel</span>
            </h1>
            <h3>We offer the best services for all your need</h3>
        </div>
      </Container>
    </div>
  )
}

export default Parallax
