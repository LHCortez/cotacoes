const path = require('path')
const express = require('express')
const hbs = require('hbs')
const cotacoes = require('./util/cotacao')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public') //->> dirname usa dois underlines!
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Cotações',
        author: 'Luiz Humberto Cortez Quintas Filho'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Sobre',
        author: 'Luiz Humberto Cortez Quintas Filho'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Ajuda',
        author: 'Luiz Humberto Cortez Quintas Filho'
    })
})

//console.log (publicDirectoryPath)
/*app.get('', (req, res) => {
    res.send('Hello my app!')
})
app.get('/help', (req, res) => {
    res.send('Help Page')
})
app.get('/about', (req, res) => {
    res.send('About Page')
})*/

app.get('/cotacoes', (req, res) => {

    if (!req.query.ativo) {
        return res.status(400).json({
            error: {
                message: 'O ativo deve ser informado como query paramater',
                code: 400
            }
        })
    }

    const symbol = req.query.ativo.toUpperCase()

    cotacoes(symbol, (err, body) => {
        if (err) {
        
            return res.status(err.code).json({
                error: {
                    message: 'O ativo deve ser informado como query parameter',
                    code: err.code
                }})
        }
        res.status(200).json(body)

    })
})

/* const cotacao = {
    symbol: 'PETR4.SA',
    price_open: 10,
    price: 12,
    day_high: 13,
    day_low: 9
}

const cotacoes = new Array()
cotacoes.push(cotacao)
cotacoes.push(cotacao)

res.send(cotacoes)*/


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Não existe página depois de /help',
        author: 'Luiz Humberto Cortez Quintas Filho'
    })

})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Página não encontrada',
        author: 'Luiz Humberto Cortez Quintas Filho'
    })
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})