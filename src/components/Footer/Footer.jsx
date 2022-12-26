import NavLinks from '@/components/NavLinks'
import GitIcon from '@/assets/img/GitIcon'
import './Footer.css'

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <nav className="footer-nav">
                    <NavLinks block="footer-nav" />
                </nav>
                <a
                    href="https://github.com/rakhman-ibrayev/breathing-fine"
                    target="_blank" rel="noreferrer"
                    className="github-link flex align-center justify-center"
                >
                    by Rakhman Ibrayev
                    <GitIcon />
                </a>
            </div>
        </footer>
    )
}

export default Footer