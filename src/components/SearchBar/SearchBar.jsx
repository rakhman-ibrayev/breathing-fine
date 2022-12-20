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
                    aria-label="введите название локации для поиска индекса качества воздуха AQI в этой локации"
                    type="search"
                    name="search"
                    id="search"
                    className="search-bar__input"
                    placeholder={placeholder}
                    maxLength="85"
                    autoComplete="off"
                />
            </label>
            <button
                type="submit"
                title="начать поиск в указанной локации"
                className={`search-bar__btn${modifier ? ` search-bar__btn--${modifier}` : ''}`}
            >
                <SearchIcon />
            </button>
        </form>
    )
}

export default SearchBar