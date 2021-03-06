const assert = require('assert')
const api = require('./../api')
let app = {}

const MOCK_HEROI_CADASTRAR = {
    nome: 'Chapolin',
    poder: 'Marreta Bionica'
}

const MOCK_HEROI_ATUALIZAR = {
    nome: 'Gaviao',
    poder: 'A mira'
}

let MOCK_ID = ''

describe('Suite de testes da API Heroes', function(){

    this.beforeAll(async () => {
        app = await api
        const result = await app.inject({
            method: 'POST',
            url: '/herois',
            payload: JSON.stringify(MOCK_HEROI_ATUALIZAR)
        })

        const dados = JSON.parse(result.payload)
        
        MOCK_ID = dados._id
    })

    it('listar /herois', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois'
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode
        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))
    })

    it('listar/herois deve retornar somente 3 registros', async () => {
        
        const TAMANHO_LIMITE = 3

        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode
        assert.deepEqual(statusCode, 200)
        assert.ok(dados.length === TAMANHO_LIMITE)
        
    })

    it('listar/herois deve filtrar um item', async () => {
        
        const TAMANHO_LIMITE = 1000
        const NAME = 'Clone-19'

        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}&nome=${NAME}`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode
        assert.deepEqual(statusCode, 200)
        assert.ok(dados[0].nome === NAME)
        
    })

    it('cadastrar herois', async () => {

        const result = await app.inject({
            method: 'POST',
            url: `/herois`,
            payload: MOCK_HEROI_CADASTRAR
        })

        const {message} = JSON.parse(result.payload)
        const statusCode = result.statusCode
        assert.deepEqual(message, "Heroi cadastrado com sucesso!")
    })

    it('atualizar PATCH - /herois/:id', async () => {
        
        const _id = MOCK_ID
        const expected = {
            poder: 'Super Mira'
        }

        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${_id}`,
            payload: JSON.stringify(expected)
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode
        assert.deepEqual(dados.message, 'Heroi atualizado com sucesso!')
        assert.ok(statusCode === 200)
    })

    it('remover DELETE - /herois/:id', async () => {
        const _id = MOCK_ID
        const result = await app.inject({
            method: 'DELETE', 
            url: `/herois/${_id}`
        })

        const statusCode = result.statusCode
        console.log(result)
        const dados = JSON.parse(result.payload)

        assert.ok(statusCode === 200)
        assert.deepEqual(dados.message, 'Heroi removido com sucesso!')
    })
})