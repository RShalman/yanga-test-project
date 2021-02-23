const sleeper = async (ms) => await new Promise(resolve => setTimeout(resolve, ms))

const obtainData = async (listOfUrls, timeout) => {
    const data = await Promise.all(listOfUrls.map(async (url) => {
        await sleeper(timeout)
        const resp = await fetch(url)

        if(resp.ok) {
            return await resp.json()
        } else {
            throw new Error(`Ошибка запроса: ${url}, status ${resp.status}`)
        }
    }))

    return data.reduce((acc, cur) => {
        return Object.keys(acc).length === 0 ?
            {perPage: cur.per_page, total: cur.total, data: cur.data}
            :
            {...acc, data: [...acc.data, ...cur.data]}
    }, {})
}

const dataPaginator = (data, page, perPage) => {
    const start = (page - 1) * perPage
    const end = page * perPage

    return data.slice(start, end)
}

export {sleeper, obtainData, dataPaginator}