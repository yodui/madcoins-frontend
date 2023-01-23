const uFetch = async (url, options, timeLimit = 5000) => {
    return Promise.race([
        fetch(url, options),
        new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error('Fetch timeout'))
            }, timeLimit)
        })
    ])
}

export { uFetch };
