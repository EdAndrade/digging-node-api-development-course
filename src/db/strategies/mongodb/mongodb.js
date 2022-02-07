const ICrud = require('../interfaces/interfaceCrud')

const Mongoose = require('mongoose')

const STATUS = {
	0: 'Disconectado',
	1: 'Conectado',
	2: 'Conectando',
	3: 'Disconectando'
}

class MongoDB extends ICrud {

	constructor(connection, Schema) {
		super()
		this._schema = Schema
		this._connection = connection
	}

	async isConnected() {

		const state = STATUS[this._connection.readyState]

		if(state === 'Conectado') return state;
		if(state !== 'Conectando') return state;

		await new Promise( resolve => setTimeout(resolve, 1000))

		return STATUS[this._connection.readyState]
	}

	static connect() {
		Mongoose.connect('mongodb://edmilson:123@127.0.0.1:27012/herois', { useNewUrlParser: true }, (error) => {
			if (!error) return;
			console.log('Falha na conexão', error)
		})

		const connection = Mongoose.connection
		connection.once('open', () => console.log('database rodando'))
		this._connection = connection
		return this._connection
	}

	create(item) {
		return this._schema.create(item)
	}

	read({ item, skip, limit }){


		if(!item){
			item = {}
		}

		if(!skip){
			skip = 0
		}

		if(!limit){
			limit = 10
		}

		return this._schema.find(item).skip(skip).limit(limit)
	}

	update(id, item){
		return this._schema.updateOne( { _id: id }, { $set: item })
	}

	delete(id){
		return this._schema.deleteOne({_id: id})
	}
}

module.exports = MongoDB