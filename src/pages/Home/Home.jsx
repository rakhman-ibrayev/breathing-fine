import HomeHero from './sections/HomeHero/HomeHero'
import HomeInfoPollution from './sections/HomeInfoPollution/HomeInfoPollution'
import HomeInfoWorstAQI from './sections/HomeInfoWorstAQI/HomeInfoWorstAQI'
import './Home.css'

const Home = ({ mapData }) => {
    return (
        <main className="home-page">
            <HomeHero mapData={mapData} />
            <HomeInfoPollution />
            <HomeInfoWorstAQI mapData={mapData} />
        </main>
    )
}

export default Home