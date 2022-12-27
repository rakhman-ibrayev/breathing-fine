import './Intro.css'

const Intro = ({ smallText, bigText, infoSign }) => {
    return (
        <div className="intro flex justify-between">
            <hgroup className="intro__text flex column justify-between">
                <p className="intro__small-text">{smallText}</p>
                <h2 className="intro__big-text">{bigText}</h2>
            </hgroup>
            <div aria-hidden="true" className="intro__info-sign flex justify-center align-center">
                {infoSign}
            </div>
        </div>
    )
}

export default Intro