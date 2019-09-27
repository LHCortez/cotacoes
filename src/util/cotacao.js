const request = require('request')

const api_token = 'hZdmQbCzzX3iGZH7iSj6Q5YNE26vlGATAoObUNMVDy12L0wmjaVAb2ZIecv8'

const cotacao = (symbol, callback) => {

    const url = `https://api.worldtradingdata.com/api/v1/stock?symbol=${symbol}&api_token=${api_token}`

    request({
        url: url,
        json: true
    }, (err, response) => {
        if (err) {
            callback({
                message: `Something went wrong: ${err}`,
                code: 500
            }, undefined)

        }

        if (response.body.data === undefined || response.body.data === undefined) {
            callback({
                message: `No data found.`,
                code: 404
            }, undefined)
        }

        const parsedJSON = response.body.data[0]

        const {
            symbol,
            price_open,
            price,
            day_high,
            day_low
        } = parsedJSON

        callback(undefined, {
            symbol,
            price_open,
            price,
            day_high,
            day_low
        })

    })
}

module.exports = cotacao