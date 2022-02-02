
for(let i =0; i<=1000; i++){
    db.herois.insert({
        nome: `Clone-${i}`,
        poder: 'Velocidade',
        dataNascimento: '1998-01-01'
    })
}

//create
db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})

//read
db.herois.find()

//update
db.herois.update({_id: 'ObjectId'}, { $set: {nome: 'Mulher maravilha'}})

//delete
db.herois.remove({})