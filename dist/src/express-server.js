"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const selenium_test_1 = require("./selenium-test");
const selenium_headless_test_1 = require("./selenium-headless-test");
class ExpressServer {
    constructor() {
        this.PORT = process.env.SERVER_PORT || 3000;
        this.app = (0, express_1.default)();
    }
    configure() {
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        return this;
    }
    routesRegistry() {
        this.app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header("Access-Control-Allow-Headers", '*');
            next();
        });
        this.app.get('/health', (req, res) => {
            res.status(200).json({ messsage: 'selenuium poc app is working' });
        });
        this.app.get('/test/selenium', (req, res) => {
            const ticker = req.query.ticker || '';
            (0, selenium_test_1.getTickerDataFromFundamentus)(ticker);
            res.status(200).json({ messsage: 'selenuium headless test has been started' });
        });
        this.app.get('/test/selenium-headless', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const ticker = req.query.ticker || '';
            const price = yield (0, selenium_headless_test_1.getTickerDataFromFundamentusHeadless)(ticker);
            res.status(200).json({ messsage: 'selenuium headless test has been started', tickerPrice: price });
        }));
        return this;
    }
    startServer() {
        this.app.listen(this.PORT, () => {
            console.log('server is connected on port:', this.PORT);
        });
    }
}
exports.default = ExpressServer;
//# sourceMappingURL=express-server.js.map