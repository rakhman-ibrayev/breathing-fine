import { useState } from 'react'
import SearchBar from '@/components/SearchBar/SearchBar'
import Ridges from '@/assets/img/Ridges'
import './Nav.css'

const BtnNav = ({ isOpen, handleClick }) => {
    return (
        <button
            className={`btn-nav${isOpen ? ' btn-nav--open' : ''}`}
            onClick={handleClick}
        >
            <div className="btn-nav__label">
                {isOpen
                    ? <>
                        <span className="curved char1">c</span>
                        <span className="curved char2">l</span>
                        <span className="curved char3">o</span>
                        <span className="curved char4">s</span>
                        <span className="curved char5">e</span>
                    </>
                    : <>
                        <span className="curved char1">m</span>
                        <span className="curved char2">e</span>
                        <span className="curved char3">n</span>
                        <span className="curved char4">u</span>
                    </>
                }
            </div>
        </button>
    )
}

const NavSection = (props) => {
    return (
        <section className="nav__section flex column" role={props.role}>
            <p className="nav__section-heading">{props.heading}</p>
            {props.children}
        </section>
    )
}

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false)
    const navLinks = [
        { title: 'поиск aqi', id: '#main-aqi-search' },
        { title: 'референсы', id: '#references' },
        { title: 'худший AQI', id: '#worst-aqi' },
        { title: 'вред загрязнений', id: '#pollution-harm' },
        { title: 'что такое AQI?', id: '#what-is-aqi' },
    ]

    return (
        <>
            <BtnNav isOpen={isOpen} handleClick={() => setIsOpen(prevState => !prevState)} />
            <nav className={`nav ${isOpen ? 'nav--open' : 'nav--closed'}`}>
                <div className="container grid">
                    <NavSection role="search" heading="поиск">
                        <div className="nav__search flex column justify-between">
                            <SearchBar modifier="nav" placeholder="Поиск локации..." />
                            <Ridges />
                        </div>
                    </NavSection>
                    <NavSection role="navigation" heading="меню">
                        <ul className="nav__links grid">
                            {navLinks.map(link =>
                                <li key={link.id} className="nav__link">
                                    <a href={link.id}>{link.title}</a>
                                </li>
                            )}
                        </ul>
                    </NavSection>
                </div>
            </nav>
        </>
    )
}

export default Nav