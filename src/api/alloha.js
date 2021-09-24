const API_TOKEN = "d317441359e505c343c2063edc97e7"
const BASE_URL = "https://api.alloha.tv"

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

    return fetch(`${BASE_URL}/search?token=${API_TOKEN}&${objectToQuery(params)}`)
        .then(res => res.json())
        .catch(error => error)

}

export async function film(params) {

    return fetch(`${BASE_URL}/search?token=${API_TOKEN}&${objectToQuery(params)}`)
        .then(res => res.json())
        .catch(error => error)

}