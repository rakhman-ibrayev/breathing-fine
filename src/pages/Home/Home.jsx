import { lazy, Suspense } from 'react'
const Earth = lazy(() => import('@/components/Earth/Earth'))

const Home = ({ mapData }) => {
    return (
        <main>
            <section className="home-hero">
                <Suspense>
                    <Earth
                        mapData={mapData}
                        widthPercentage={100}
                    />
                </Suspense>
            </section>
        </main>
    )
}

export default Home