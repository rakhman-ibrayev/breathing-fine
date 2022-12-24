import { useEffect, useRef } from 'react'

const Section = (props) => {
    const ref = useRef()

    const scrollToComponent = () => {
        if (window.location.hash === `#${props.id}`) {
            ref.current.scrollIntoView({ block: 'end', behavior: 'smooth' })
            ref.current.focus()
        }
    }

    useEffect(() => scrollToComponent(), [])

    return (
        <section ref={ref} id={props.id} className={props.className}>
            <div className="container">{props.children}</div>
        </section>
    )
}

export default Section