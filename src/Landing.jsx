import React from 'react'
import { Link, Outlet } from "react-router-dom";


const Landing = () => {
  return (
    <div>
      <nav className="p-4">
        <Link to="/" className="mr-4">Login</Link>
        <Link to="/signup">Signin</Link>
      </nav>

      <main className="p-4">
        <Outlet /> {/* Renders the matching child route */}
      </main>
    </div>
  )
}

export default Landing