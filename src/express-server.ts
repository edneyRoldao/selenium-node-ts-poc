import express from 'express'
import { Express } from 'express-serve-static-core'
import bodyParser from 'body-parser'
import { getTickerDataFromFundamentus } from './selenium-test'
import { getTickerDataFromFundamentusHeadless } from './selenium-headless-test'

export default class ExpressServer {

    private app: Express
    private readonly PORT = process.env.SERVER_PORT || 3000

    constructor() {
        this.app = express()
    }

    configure(): ExpressServer {
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))
        return this
    }

    routesRegistry(): ExpressServer {
        this.app.use(function(req, res, next) {
            res.header('Access-Control-Allow-Origin', '*')
            res.header("Access-Control-Allow-Headers", '*')
            next()
        })

        this.app.get('/health', (req, res) => {
            res.status(200).json({ messsage: 'selenuium poc app is working' })
        })

        this.app.get('/test/selenium', (req, res) => {
            const ticker: string = req.query.ticker as string || ''
            getTickerDataFromFundamentus(ticker)
            res.status(200).json({ messsage: 'selenuium headless test has been started' })
        })

        this.app.get('/test/selenium-headless', async (req, res) => {
            const ticker: string = req.query.ticker as string || ''
            const price = await getTickerDataFromFundamentusHeadless(ticker)
            res.status(200).json({ messsage: 'selenuium headless test has been started', tickerPrice: price })
        })

        return this
    }

    startServer(): void {
        this.app.listen(this.PORT, () => {
            console.log('server is connected on port:', this.PORT)
        })
    }

} 