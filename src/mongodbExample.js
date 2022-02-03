
const state = connection.readyState
console.log('state', state)



const model = Mongoose.model('herois', heroisSchema)

async function main(){
    

    console.log('result cadastrar', resultCadastrar)

    const listItem = await model.find()
    console.log('items', listItem)
}

main()