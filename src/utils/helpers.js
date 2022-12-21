export const getSearchParams = (paramsObj) => {
    let searchString = ''

    for (const [key, value] of Object.entries(paramsObj)) {
        if (value) searchString += `${key}=${value}&`
    }

    return searchString.substring(0, searchString.length - 1)
}