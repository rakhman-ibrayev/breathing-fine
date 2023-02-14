import { useEffect, useRef } from 'react'

const Section = (props) => {
    const ref = useRef()
    const hash = window.location.hash

    const scrollToComponent = () => {
        if (hash === `#${props.id}`) {
            ref.current.scrollIntoView({ behavior: 'smooth' })
        }
    }

    useEffect(() => scrollToComponent(), [hash])

    return (
        <section ref={ref} id={props.id} className={props.className}>
            <div className="container">{props.children}</div>
        </section>
    )
}

export default Section