export const getSearchParams = (paramsObj) => {
    let searchString = ''

    for (const [key, value] of Object.entries(paramsObj)) {
        if (value) searchString += `${key}=${value}&`
    }

    return searchString.substring(0, searchString.length - 1)
}

export const getAqiColor = (aqiLevel) => {
    let color = ''

    if (aqiLevel <= 50)
        color = '#00FF83'
    else if (aqiLevel <= 100)
        color = '#5CC1B2'
    else if (aqiLevel <= 150)
        color = '#C1AE5C'
    else if (aqiLevel <= 200)
        color = '#B982E1'
    else
        color = '#AC65E0'

    return color
}

export const getAqiVerdict = (aqiLevel) => {
    let verdict = ''

    if (aqiLevel <= 50)
        verdict = 'хорошо'
    else if (aqiLevel <= 100)
        verdict = 'средне'
    else if (aqiLevel <= 150)
        verdict = 'умеренно'
    else if (aqiLevel <= 200)
        verdict = 'опасно'
    else
        verdict = 'очень опасно'

    return verdict
}

export const getAqiVerdictDetails = (aqiLevel) => {
    let verdict = ''

    if (aqiLevel <= 50)
        verdict = 'Качество воздуха удовлетворительное: уровень загрязнений не опасен для здоровья человека.'
    else if (aqiLevel <= 100)
        verdict = 'Небольшой риск для людей с повышенной чувствительностью к качеству воздуха.'
    else if (aqiLevel <= 150)
        verdict = 'Повышенная опасность для людей чувствительных к качеству воздуха.'
    else if (aqiLevel <= 200)
        verdict = 'Риск для всех групп людей и серьезная опасноть для людей чувствительных к качеству воздуха.'
    else
        verdict = 'Серьезная опасность для всех групп людей'

    return verdict
}

export const getWeekDay = (dayNumber) => {
    let day = ''

    switch (dayNumber) {
        case 0:
            day = 'ПН'
            break
        case 1:
            day = 'ВТ'
            break
        case 2:
            day = 'СР'
            break
        case 3:
            day = 'ЧТ'
            break
        case 4:
            day = 'ПТ'
            break
        case 5:
            day = 'СБ'
            break
        case 6:
            day = 'ВС'
            break
        default:
            break
    }

    return day
}

export const fetchWrapper = async (url) => {
    const res = await fetch(url)
    
    if (!res.ok) {
        throw new Error('Error: fetch failed')
    }

    return await res.json()
}