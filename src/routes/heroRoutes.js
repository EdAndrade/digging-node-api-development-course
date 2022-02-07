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
                        message: 'Heroi cadastrado com sucesso!',
                        _id: result._id
                    }

                }catch{
                    console.log('Deu ruim', error)
                    return "Erro interno no servidor"
                }
            }
        }
    }

    update(){

        return {
            path: '/herois/{id}',
            method: 'PATCH',
            handler: async (request) => {
                
                try{

                    const { id } = request.params
                    const { payload } = request

                    const dadosString = JSON.stringify(payload)
                    const dados = JSON.parse(dadosString)

                    const result = await this.db.update(id, dados)

                    return {
                        message: 'Heroi atualizado com sucesso!'
                    }

                }catch{
                    console.log('Deu ruim', error)
                    return "Erro interno no servidor"
                }
            }
        }
    }

    delete(){

        return {
            path: '/herois/{id}',
            method: 'DELETE',
            handler: async (request) => {

                try{
                    const {id} = request.params
                    const resultado = await this.db.delete(id)

                    return {
                        message: 'Heroi removido com sucesso!'
                    }

                }catch(error){
                    console.log('Deu ruim', error)
                    return "Erro interno no servidor"
                }
            }
        }
    }
}

module.exports = HeroRoutes