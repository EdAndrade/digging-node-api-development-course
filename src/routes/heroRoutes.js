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

                    if(!skip){
                        skip = 0
                    }

                    if(!limit){
                        limit = 10
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
            handler: async (request, head) => {
                
                try{

                    const { nome, poder } = request.payload
                    const result = await this.db.create({nome, poder})

                    return {
                        message: 'Heroi cadastrado com sucesso!'
                    }

                }catch{
                    console.log('Deu ruim', error)
                    return "Erro interno no servidor"
                }
            }
        }
    }
}

module.exports = HeroRoutes