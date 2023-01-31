import Section from '@/components/Section'
import Intro from '@/components/Intro/Intro'
import './HomeInfoReferences.css'

const HomeInfoReferences = () => {
    const references = [
        {
            title: 'WHO',
            link: 'https://www.who.int/ru/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health'
        },
        {
            title: 'UNECE',
            link: ' https://unece.org/ru/air-pollution-and-health'
        },
        {
            title: 'The Guardian',
            link: 'https://www.theguardian.com/environment/2020/apr/11/positively-alpine-disbelief-air-pollution-falls-lockdown-coronavirus'
        },
        {
            title: 'Unsplash #1',
            link: 'https://unsplash.com/@mikemarrah'
        },
        {
            title: 'Unsplash #2',
            link: 'https://unsplash.com/@photoholgic'
        },
        {
            title: 'Unsplash #3',
            link: 'https://unsplash.com/@scutal'
        }
    ]

    return (
        <Section id="references" className="home-info-references">
            <Intro
                smallText="Материалы"
                bigText="Список референсов"
                infoSign="?"
            />
            <ul className="home-info-references__list flex column">
                {references.map((ref, index) =>
                    <li 
                        key={`${ref.title}${index}`}
                    >
                        <a
                            href={ref.link}
                            alt={`ссылка на источник от ${ref.title}`}
                            target="_blank" rel="noreferrer"
                            className="home-info-references__link"
                        >
                            {ref.title}
                        </a>
                    </li>
                )}
            </ul>
        </Section>
    )
}

export default HomeInfoReferences