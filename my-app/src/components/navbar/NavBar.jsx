import { useState } from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    const txt = {
        color: '#180D91',
        textDecoration: 'none',
        fontSize: '1.5rem',
        width: '100px',
        height: 'auto',
        borderRadius: '100%',
        background: 'rgb(126 115 255)'
    }

    return (
        <div style={{
            position: 'fixed',
            bottom: '0px',
            right: '0',
            width: '100%',
            background: '#4B68C5',
            padding: '20px',
            display: 'flex',
            gap: '20px',
            textAlign: 'center',
            justifyContent: 'center',
        }}>
            {/* <NavLink
                style={({ isActive }) => ({ ...txt, color: isActive ? '#ffff' : txt.color })}
                to='/'>
                Home
            </NavLink> */}
            <NavLink
                style={({ isActive }) => ({ ...txt, color: isActive ? '#ffff' : txt.color })}
                to='/workout'>
                Workout
                <i className="fa-solid fa-person" style={{color: '#005eff'}}></i>
            </NavLink>
            <NavLink
                style={({ isActive }) => ({ ...txt, color: isActive ? '#ffff' : txt.color })}
                to='/statistic'>
                Statistic
                <i class="fa-solid fa-chart-line" ></i>
            </NavLink>
        </div>
    )
}

export default NavBar;