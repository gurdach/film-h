const API_TOKEN = "aa9f084b4e35c710768b0ca9345b1510"
const BASE_URL = "https://bazon.cc/api"

function objectToQuery(params) {

    if (params) {
        return Object.keys(params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&');
    } else {
        return ''
    }

}

export async function search(params) {

    return fetch(`${BASE_URL}/json/?token=${API_TOKEN}&${objectToQuery(params)}`)
        .then(res => res.json())
        .catch(error => error)

}

export async function film(params) {

    return fetch(`${BASE_URL}/search?token=${API_TOKEN}&${objectToQuery(params)}`)
        .then(res => res.json())
        .catch(error => error)

}