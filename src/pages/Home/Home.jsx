import HomeHero from '@/components/HomeHero/HomeHero'
import './Home.css'

const Home = ({ mapData }) => {
    return (
        <main>
            <HomeHero mapData={mapData} />
        </main>
    )
}

export default Home