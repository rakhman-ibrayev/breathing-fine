import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePlacesWidget } from 'react-google-autocomplete'
import { getSearchParams } from '@/utils/helpers'
import SearchIcon from '@/assets/img/SearchIcon'
import './SearchBar.css'

const SearchBar = ({ modifier, label, placeholder }) => {
    const [searchInput, setSearchInput] = useState('')
    const [searchParams, setSearchParams] = useState({ city: '', lat: '', lng: '' })
    const navigate = useNavigate()
    const { ref } = usePlacesWidget({
        apiKey: import.meta.env.VITE_GOOGLE_PLACES_API_KEY,
        onPlaceSelected: (place) => {
            if (!place || !place.geometry) return

            const city = place.address_components
                ? place.address_components[0].long_name.toLowerCase()
                : place.name.toLowerCase()
            const lat = place.geometry.location.lat()
            const lng = place.geometry.location.lng()

            navigateWithParams({ city, lat, lng })
        }
    })

    const navigateWithParams = (params) => {
        navigate({
            pathname: '/search',
            search: `?${getSearchParams(params)}`,
        })
        setSearchInput('')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        navigateWithParams(searchParams)
    }

    return (
        <form onSubmit={handleSubmit} className={`search-bar${modifier ? ` search-bar--${modifier}` : ''}`}>
            <label htmlFor="search">
                {label}
                <input
                    ref={ref}
                    aria-label="введите название локации для поиска индекса качества воздуха AQI в этой локации"
                    type="text"
                    name="search"
                    id="search"
                    className="search-bar__input"
                    placeholder={placeholder}
                    value={searchInput}
                    onChange={event => {
                        setSearchInput(event.target.value)
                        setSearchParams({
                            city: event.target.value,
                            lat: '',
                            lng: '',
                        })
                    }}
                    autoComplete="off"
                    maxLength="85"
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