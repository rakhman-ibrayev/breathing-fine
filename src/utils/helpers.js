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
    else if (aqiLevel <= 200)
        color = '#B982E1'
    else
        color = '#B982E1'

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