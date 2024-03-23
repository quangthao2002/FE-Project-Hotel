import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
  return (
    <div className='container mt-5'>
      <h2>Welcom to Admin Panel</h2>
      <hr />
      <Link to={"/existing-rooms"} className='text-decoration-none'>
            Manager rooms
      </Link>
      <br />
      <Link to={"/existing-bookings"} className='text-decoration-none'>
            Manager Bookings
      </Link>
    </div>
  )
}

export default Admin
