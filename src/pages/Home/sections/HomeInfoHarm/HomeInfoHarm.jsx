import { useEffect, useRef, useState } from 'react'
import Section from '@/components/Section'
import Intro from '@/components/Intro/Intro'
import ShadowBox from '@/components/ShadowBox/ShadowBox'
import './HomeInfoHarm.css'

const HomeInfoHarm = () => {
    const imagesRef = useRef()
    const [refWidthPercent, setRefWidthPercent] = useState(0)
    const smallImage = 'https://images.unsplash.com/photo-1585496058078-29596a3a7ced?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=clip'
    const mediumImage = 'https://images.unsplash.com/photo-1612173214687-f7bad03aad55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=clip'
    const largeImage = 'https://images.unsplash.com/photo-1532300481631-0bc14f3b7699?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=clip'

    useEffect(() => {
        if (imagesRef.current) {
            setRefWidthPercent(Math.round(imagesRef.current.offsetWidth / 100))
        }
    }, [])

    return (
        <Section id="pollution-harm" className="home-info-harm">
            <div ref={imagesRef} className="home-info-harm__images">
                {refWidthPercent
                    ? <>
                        <img
                            width={refWidthPercent * 90} height="200"
                            src={`${largeImage}&w=${refWidthPercent * 90}`}
                            alt="Город в густом смоге"
                            className="home-info-harm__large-image"
                        />
                        <img
                            width={refWidthPercent * 25} height="100"
                            src={`${smallImage}&w=${refWidthPercent * 25}`}
                            alt="Большое количество выбросов из трубы ТЭЦ"
                            className="home-info-harm__small-image"
                        />
                        <img
                            width={refWidthPercent * 65} height="150"
                            src={`${mediumImage}&w=${refWidthPercent * 65}`}
                            alt="Большое количество выбросов из труб ТЭЦ"
                            className="home-info-harm__medium-image"
                        />
                    </>
                    : null
                }
            </div>
            <div className="home-info-harm__text">
                <Intro
                    smallText="Критический ущерб"
                    bigText="Значительный вклад в статистику смертности"
                    infoSign="!"
                />
                <ShadowBox>
                    <p className="home-info-harm__description">
                        Загрязнение воздуха в настоящее время считается самой
                        большой угрозой здоровью из-за окружающей среды в мире,
                        ежегодно приводя к 7 миллионам случаев смерти во всем мире.
                        <br /><br />
                        Международное агентство по изучению рака классифицирует
                        канцерогенное для человека загрязнение наружного воздуха и
                        твердые частицы, как один из его основных компонентов.
                    </p>
                    <a
                        className="home-info-harm__article-link"
                        href="https://unece.org/ru/air-pollution-and-health"
                        alt="ссылка на статью unece о вредах загрязнений"
                        target="_blank" rel="noreferrer"
                    >
                        unece.org
                    </a>
                </ShadowBox>
            </div>
        </Section>
    )
}

export default HomeInfoHarm