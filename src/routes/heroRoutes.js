const BaseRoute = require('./base/baseRoute')

class HeroRoutes extends BaseRoute {

    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            handler: (request, headers) => {

                try {

                    let { skip, limit, nome } = request.query

                    let query = {}

                    if(nome){
                        query.nome = nome
                    }
                    
                    return this.db.read({
                        item: query,
                        skip: parseInt(skip),
                        limit: parseInt(limit)
                    })

                } catch (error) {
                    console.log('Deu ruim', error)
                    return "Erro interno no servidor"
                }

            }
        }
    }

    create() {
        return {
            path: '/herois',
            method: 'POST',
            handler: (request, head) => {
                return this.db.read()
            }
        }
    }
}

module.exports = HeroRoutes