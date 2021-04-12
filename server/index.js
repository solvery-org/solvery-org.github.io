const express = require('express')
const Sequelize = require('sequelize')

const app = express()
const port = 3000

// all APIs use JSON, tell express to expect it
app.use(express.json());
const sequelize = new Sequelize('postgres://xjfqwgak:H1k4qy...@kandula.db.elephantsql.com:5432/xjfqwgak')

sequelize
.authenticate()
.then(() => {
console.log('Connection has been established successfully.');
})
.catch(err => {
console.error('Unable to connect to the database:', err);
})

// first argument is the name of the table
const User = sequelize.define('nodes', {
// attributes
firstName: {
type: Sequelize.STRING,
allowNull: false
},
lastName: {
type: Sequelize.STRING
// allowNull defaults to true
}
}, {
// options
});

//true drops a prexisitng table
User.sync({ force: true }) // Now the `users` table in the database corresponds to the model definition


//takes url endpoint '/' and an anoymous funtion with reqest and response (req,res) params
app.get('/',(req,res) => res.json({message:'Hello World'}))

app.post('/user', async (req, res) => {
try {
const newUser = new User(req.body)
await newUser.save()
res.json({ user: newUser }) // Returns the new user that is created in the database
} catch(error) {
console.error(error)
}
})

app.get('/user/:userId', async (req, res) => {
const userId = req.params.userId
try {
const user = await User.findAll({
where: {
id: userId
}
}
)
res.json({ user })
} catch(error) {
console.error(error)
}
})

//listen on port
app.listen(port,() => console.log('Example app listening on port ${port}!'))
