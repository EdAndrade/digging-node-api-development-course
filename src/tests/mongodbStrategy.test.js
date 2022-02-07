const assert = require('assert')
const MongoDb = require('../db/strategies/mongodb/mongodb')
const HeroisSchema = require('./../db/strategies/mongodb/schemas/heroisSchema')
const Context = require('../db/strategies/base/contextStrategy')

const MOCK_HEROI_CADASTRAR = {
    nome: 'Mulher Maravilha',
    poder: 'Laço'
}

const MOCK_HEROI_ATUALIZAR = {
    nome: 'Patolino',
    poder: 'Velocidade'
}

let MOCK_HEROI_ATUALIZAR_ID = ''

let context = {}

describe('MongoDb suite de testes', function(){

    this.beforeAll(async () => {
        const connection = MongoDb.connect()
        context = new Context(new MongoDb(connection, HeroisSchema))
        const result = await context.create(MOCK_HEROI_ATUALIZAR)
        MOCK_HEROI_ATUALIZAR_ID = result._id
    })
     
    it('verificar conexao', async () => {
        const result = await context.isConnected()
        const expected = 'Conectado'

        assert.deepEqual(result, expected)
    })

    it('cadastrar', async () => {
        const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR)
        assert.deepEqual({nome, poder}, MOCK_HEROI_CADASTRAR)
    })

    it('listar', async () => {
        const [{nome, poder}] = await context.read({ item: { nome: MOCK_HEROI_CADASTRAR.nome }})
        assert.deepEqual({ nome, poder}, MOCK_HEROI_CADASTRAR)
    })

    it('atualizar', async () => {
        const result = await context.update(MOCK_HEROI_ATUALIZAR_ID, {
            nome: 'Pernalonga'
        })

        assert.deepEqual(result.modifiedCount, 1)
    })

    it('remover', async () => {

        const result = await context.delete(MOCK_HEROI_ATUALIZAR_ID)
        assert.deepEqual(result.deletedCount, 1)
    })
})