export const getSearchParams = (paramsObj) => {
    let searchString = ''

    for (const [key, value] of Object.entries(paramsObj)) {
        if (value) searchString += `${key}=${value}&`
    }

    return searchString.substring(0, searchString.length - 1)
}

export const getAqiVerdict = (aqiLevel) => {
    let verdict = ''

    if (aqiLevel <= 50)
        verdict = 'хорошо'
    else if (aqiLevel <= 100)
        verdict = 'средне'
    else if (aqiLevel <= 150)
        verdict = 'умеренно'
    else
        verdict = 'опасно'

    return verdict
}