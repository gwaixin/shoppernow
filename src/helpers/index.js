import axios from 'axios'
const Network = (config) => {
    
    let networkConfig = {
        baseURL: process.env.REACT_APP_SERVER_URL
    }

    //  if provided with config
    if (config) {
        // check if provided a specific base url
        if (config.baseURL) { networkConfig.baseURL = config.baseURL }

        // checks if this request needs authentication
        if (config.auth) { networkConfig.headers = {'Authorization': "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImNyZWF0ZWRfYXQiOiIyMDE5LTAzLTA4VDA4OjA0OjU3LjY3NloiLCJ1cGRhdGVkX2F0IjoiMjAxOS0wMy0wOFQwODowNDo1Ny42NzZaIiwiX2lkIjoiNWM4MjIyMzZiY2RhMzAzMDg4MTMxNzE5IiwibmFtZSI6Ik5pY2hvbGUgSm9obiBNYXJ0aW5leiIsImVtYWlsIjoiZGFsdXdpZEBnbWFpbC5jb20iLCJwYXNzd29yZCI6ImRhMzUxOTdiMTY2MmQ0OGUwZTlmZjc4ZjhhMzI0NmI5IiwiX192IjowfSwiaWF0IjoxNTUyMDM1ODcwLCJleHAiOjE1NTIwNDMwNzB9.rHqpI2t3AG6DIWgKjPr3M47SkybKkbP4HRAgI1j0o6Q"} }
    }

    // create network request
    let network = axios.create(networkConfig)

    return network
}

const ErrorHandler = (res) => {
    let errors = []

    if (!res.data && res.response.status) {
        let msg = 'Request Error ' 
            + res.response.status 
            + ' : ' 
            + res.response.statusText
        errors.push(msg)
    } else if (res.data.message) {
        errors.push(res.data.message)
    } else if (res.data.error.message) {
        errors.push(res.data.error.message)
    } else {
        errors.push('There seems to be a problem, try again later.')
    }

    return errors
}

export {
    Network,
    ErrorHandler
}