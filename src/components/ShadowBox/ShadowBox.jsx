import './ShadowBox.css'

const ShadowBox = (props) => {
    return (
        <div className="shadow-box">
            <div className="shadow-box__content">
                {props.children}
            </div>
            <div className="shadow-box__shadow" aria-hidden="true"></div>
        </div>
    )
}

export default ShadowBox