const assert = require('assert')
const Postgres = require('../db/strategies/postgres')
const Context = require('../db/strategies/base/contextStrategy')

const context = new Context(new Postgres())
const MOCK_HEROI_CADASTRAR = {
	nome: 'Gaviao Negro',
	poder: 'flexas'
}

describe('Postgres Strategy', function(){
	this.timeout(Infinity)

	this.beforeAll(async function(){
		await context.connect()
	})

	it('PostgresSQL connection', async function (){

		const result = await context.isConnected()
		assert.equal(result, true)

	})

	it('Cadastrar', async function(){
		const { dataValues } = await context.create(MOCK_HEROI_CADASTRAR)
		delete dataValues.id
		assert.deepEqual(dataValues, MOCK_HEROI_CADASTRAR)
	})
})