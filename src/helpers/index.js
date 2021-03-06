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
        if (config.token) { networkConfig.headers = {'Authorization': "bearer " + config.token} }
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