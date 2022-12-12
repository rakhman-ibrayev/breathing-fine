import SearchIcon from '@/assets/img/SearchIcon'
import './SearchBar.css'

const SearchBar = ({ modifier, label, placeholder }) => {
    const handleSubmit = (event) => {
        event.preventDefault()
    }

    return (
        <form onSubmit={handleSubmit} className={`search-bar${modifier ? ` search-bar--${modifier}` : ''}`}>
            <label htmlFor="search">
                {label}
                <input
                    type="search"
                    name="search"
                    id="search"
                    className="search-bar__search"
                    placeholder={placeholder}
                    maxLength="85"
                />
            </label>
            <button
                type="submit"
                title="Search this website now"
                className={`search-bar__btn${modifier ? ` search-bar__btn--${modifier}` : ''}`}
            >
                <SearchIcon />
            </button>
        </form>
    )
}

export default SearchBar