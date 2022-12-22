import { Link } from 'react-router-dom'
import Wires from '@/assets/img/Wires'
import './Error.css'

const Error = () => {
    return (
        <main className="error-page flex column justify-around align-center">
            <p className="error-page__oops">упс</p>
            <Wires />
            <div className="error-page__text flex column align-center">
                <p className="error-page__title">Ошибка</p>
                <p className="error-page__description">
                    Что-то пошло не так. <br /> Вернитесь позже или попробуйте еще раз.
                </p>
                <Link to="/" className="error-page__button">
                    на главную
                </Link>
            </div>
        </main>
    )
}

export default Error