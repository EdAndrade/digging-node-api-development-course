const BaseRoute = require('./base/baseRoute')

class HeroRoutes extends BaseRoute{

    constructor(db){
        super()
        this.db = db
    }

    list(){
        return {
            path: '/herois',
            method: 'GET',
            handler: (request, head) => {
                return this.db.read()
            }
        }
    }

    create(){
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