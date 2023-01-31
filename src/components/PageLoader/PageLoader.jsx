import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import './PageLoader.css'

const PageLoader = () => {
    return (
        <div
            aria-hidden="true"
            className="page-loader flex align-center justify-center"
        >
            <LoadingSpinner></LoadingSpinner>
        </div>
    )
}

export default PageLoader