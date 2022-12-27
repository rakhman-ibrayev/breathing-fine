import HomeHero from './sections/HomeHero/HomeHero'
import HomeInfoPollution from './sections/HomeInfoPollution/HomeInfoPollution'
import './Home.css'

const Home = ({ mapData }) => {
    return (
        <main className="home-page">
            <HomeHero mapData={mapData} />
            <HomeInfoPollution />
        </main>
    )
}

export default Home