import { NavLink } from 'react-router-dom'

const NavLinks = ({ block, hash }) => {
    const blockClass = block ? block : ''
    const hashId = hash ? hash : ''
    const navLinks = [
        { title: 'поиск AQI', id: '#main-aqi-search' },
        { title: 'референсы', id: '#references' },
        { title: 'худший AQI', id: '#worst-aqi' },
        { title: 'вред загрязнений', id: '#pollution-harm' },
        { title: 'что такое AQI?', id: '#what-is-aqi' },
    ]

    return (
        <ul className={`${blockClass}__links grid`}>
            {navLinks.map(link =>
                <li key={link.id}>
                    <NavLink
                        to={`/${link.id}`}
                        className={`${blockClass}__link ${hashId === link.id ? `${blockClass}__link--active` : ''}`}
                    >
                        {link.title}
                    </NavLink>
                </li>
            )}
        </ul>
    )
}

export default NavLinks