const ICrud = require('./interfaces/interfaceCrud')

const Mongoose = require('mongoose')

const STATUS = {
	0: 'Disconectado',
	1: 'Conectado',
	2: 'Conectando',
	3: 'Disconectando'
}

class MongoDB extends ICrud {

	constructor() {
		super()
		this._herois = null
		this._driver = null
	}

	async isConnected() {

		const state = STATUS[connection.readyState]

		if(state === 'Conectado') return state;
		if(state !== 'Conectando') return state;
		
		await new Promise( resolve => setTimeout(resolve, 1000))

		return STATUS[connection.readyState]
	}

	defineModel() {

		this._herois = new Mongoose.Schema({
			nome: {
				type: String,
				required: true
			},
			poder: {
				type: String,
				required: true
			},
			insertedAt: {
				type: Date,
				default: new Date()
			}
		})
	}

	connect() {
		Mongoose.connect('mongodb://edmilson:123@127.0.0.1:27012/herois', { useNewUrlParser: true }, (error) => {
			if (!error) return;
			console.log('Falha na conexão', error)
		})

		const connection = Mongoose.connection
		connection.once('open', () => console.log('database rodando'))
	}

	create() {
		const resultCadastrar = await model.create({
			nome: 'Batman',
			poder: 'Dinheiro'
		})
	}

	create(item) {
		console.log('O item foi salvo em MongoDB')
	}
}

module.exports = MongoDB