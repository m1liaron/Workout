import { useState } from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    const txt = {
        position: 'relative',
        color: '#180D91',
        textDecoration: 'none',
        width: '110px',
        fontSize: '1rem',
        borderRadius: '100%',
        background: 'rgb(75, 104, 197)',
        border:'1px solid #000',
        top: '-50px',
        height: '80px',
        padding: '10px'
    }

    return (
        <div style={{
            position: 'fixed',
            bottom: '-62px',
            right: '0',
            width: '100%',
            background: '#4B68C5',
            padding: '5px',
            display: 'flex',
            gap: '20px',
            textAlign: 'center',
            justifyContent: 'center',
            height: '103px'
        }}>
            {/* <NavLink
                style={({ isActive }) => ({ ...txt, color: isActive ? '#ffff' : txt.color })}
                to='/'>
                Home
            </NavLink> */}
            <NavLink
                style={({ isActive }) => ({ ...txt, color: isActive ? '#ffff' : txt.color, borderColor: isActive ? '#fff' : null })}
                to='/'>
                Тренування
                <i className="fa-solid fa-person"></i>
            </NavLink>
            <NavLink
                style={({ isActive }) => ({ ...txt, color: isActive ? '#ffff' : txt.color, borderColor: isActive ? '#fff' : null })}
                to='/statistic'>
                Статистика
                <i className="fa-solid fa-chart-line" ></i>
            </NavLink>
        </div>
    )
}

export default NavBar;