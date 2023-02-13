import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'
import Section from '@/components/Section'
import './HomeComparison.css'

const HomeComparison = () => {
    const image1 = 'https://i.guim.co.uk/img/media/618734951ef3cc55e4cb31dced05f88b98f5ced3/11_11_2505_1680/master/2505.jpg?width=2000&quality=85&s=3c697928f32641cac1d20208315be1e5'
    const image2 = 'https://i.guim.co.uk/img/media/f6a67fe1b98b14faba3061a03c1e87bf90436e20/11_11_2505_1680/master/2505.jpg?width=2000&quality=85&s=38474d8d992d8cf2aee541f2826b5a15'

    return (
        <Section className="home-comparison">
            <div className="home-comparison__slider center-margin" aria-hidden="true">
                <ReactCompareSlider
                    itemOne={<ReactCompareSliderImage src={image1} alt="Image one" />}
                    itemTwo={<ReactCompareSliderImage src={image2} alt="Image two" />}
                />
            </div>
            <div className="home-comparison__text flex justify-end">
                <div>
                    <p className="home-comparison__description">
                        Снижение использования автотраспорта вследствие
                        карантина привело к положительному эффекту на
                        ситуацию с загрязнением воздуха в Нью-Дели.
                    </p>
                    <a
                        className="home-comparison__article-link"
                        href="https://www.theguardian.com/environment/2020/apr/11/positively-alpine-disbelief-air-pollution-falls-lockdown-coronavirus"
                        alt="ссылка на статью The Guardian о пользе карантина для чистоты воздуха"
                        target="_blank" rel="noreferrer"
                    >
                        theguardian.com
                    </a>
                </div>
            </div>
        </Section>
    )
}

export default HomeComparison