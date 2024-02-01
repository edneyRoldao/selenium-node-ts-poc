import ExpressServer from './express-server'

const server = new ExpressServer()

server
   .configure()
   .routesRegistry()
   .startServer()