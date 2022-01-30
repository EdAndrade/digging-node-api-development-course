//yarn add sequelize

const Sequelize = require('sequelize')
const driver = new Sequelize(
	'heroes',
	'edmilson',
	'123',
	{
		host: 'localhost',
		port: 23456,
		dialect: 'postgres',
		quoteIdentifiers: false
	}
)

async function main(){
	const Herois = driver.define('herois', {
		id: {
			type: Sequelize.INTEGER,
			required: true,
			primaryKey: true,
			autoIncrement: true
		},
		nome: {
			type: Sequelize.STRING,
			required: true
		},
		poder: {
			type: Sequelize.STRING,
			required: true
		}
	}, {
		tableName: 'TB_HEROIS',
		freezeTableName: false,
		timestamps: false
	})

	await Herois.sync()
	const result = await Herois.findAll({ raw: true, attributes: ['nome'] })
	console.log('result',result)
}

main()