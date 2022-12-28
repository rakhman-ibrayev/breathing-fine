import { useEffect, useState } from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import SearchBar from '@/components/SearchBar/SearchBar'
import NavLinks from '@/components/NavLinks'
import Ridges from '@/assets/img/Ridges'
import './Nav.css'

const BtnNav = ({ isOpen, handleClick }) => {
    return (
        <button
            className={`btn-nav${isOpen ? ' btn-nav--open' : ''}`}
            alt="кнопка для открытия или закрытия меню навигации по сайту"
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
    const { pathname, search, hash } = useLocation()

    useEffect(() => {
        setIsOpen(false)
    }, [pathname, search, hash])

    return (
        <>
            <BtnNav isOpen={isOpen} handleClick={() => setIsOpen(prevState => !prevState)} />
            <nav className={`nav ${isOpen ? 'nav--open' : 'nav--closed'}`}>
                <div className="nav__container container flex">
                    <NavSection role="search" heading="поиск">
                        <div className="flex column">
                            <SearchBar modifier="nav" placeholder="Поиск локации..." />
                            <Ridges />
                        </div>
                    </NavSection>
                    <NavSection role="navigation" heading="меню">
                        <NavLinks block="nav" hash={hash} />
                    </NavSection>
                </div>
            </nav>
        </>
    )
}

export default Nav