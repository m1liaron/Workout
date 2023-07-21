import { useState } from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    const txt = {
        color: '#180D91',
        textDecoration: 'none',
        fontSize: '2rem',
    }

    return (
        <div style={{
            width: '100%',
            background: '#4B68C5',
            padding: '20px',
            display: 'flex',
            gap: '20px',
            textAlign: 'center',
            justifyContent: 'center',
        }}>
            <NavLink
                style={({ isActive }) => ({ ...txt, color: isActive ? '#ffff' : txt.color })}
                to='/'>
                Home
            </NavLink>
            <NavLink
                style={({ isActive }) => ({ ...txt, color: isActive ? '#ffff' : txt.color })}
                to='/workout'>
                Workout
            </NavLink>
        </div>
    )
}

export default NavBar;