const Hapi = require('@hapi/hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDB = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema')
const HeroRoute = require('./routes/heroRoutes')
const HapiSwagger = require('hapi-swagger')
const Vision = require('@hapi/vision')
const Inert = require('@hapi/inert')

const app = new Hapi.Server({
    port: 5000
})

function mapRoutes(instance, methods){
    return methods.map(method => instance[method]())
}

async function main(){

    const connection = MongoDB.connect()
    const context = new Context(new MongoDB(connection, HeroiSchema))
    const SwaggerOptions = {
        info: {
            title: 'Api herois curso nodeBR',
            version: 'v1.0'
        }
    }

    await app.register([
        Vision,
        Inert,
        {
            plugin: HapiSwagger,
            options: SwaggerOptions
        }
    ])

    app.route(
        mapRoutes(new HeroRoute(context), HeroRoute.methods())
    )

    await app.start()
    console.log('Server Runiings')
    return app
}

module.exports = main()