import { lazy, Suspense } from 'react'
const Earth = lazy(() => import('@/components/Earth'))

const Home = () => {
    return (
        <main>
            {/* <section className="home-hero">
                <Suspense>
                    <Earth
                        widthPercentage={100}
                    />
                </Suspense>
            </section> */}
        </main>
    )
}

export default Home