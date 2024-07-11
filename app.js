const express = require('express')
const bcrypt = require('bcrypt')
const app = express()

app.use(express.json())

const Users = []

app.post('/signup', async (req,res) => {
    try {
        const {username, password} = req.body
        console.log('Received inputs:', {username, password})

        if (Users.find(member => member.username === username)) {
            return res.status(400).send("Sorry, that username already exists.")
        }

        const secretPassword = await bcrypt.hash(password.toString(), 10)

        console.log('Hashed Password:', secretPassword)

        Users.push({username, password: secretPassword})

        console.log(Users)

        res.status(201).send("Welcome to the club.")
    } catch (error) {
        console.log(error)
    }
});


app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body

        console.log('Login attempt for username:', username);

        const member = Users.find(m => m.username === username)

        if (!member) {
            return res.status(400).send("Sorry, we couldn't find that username!");
        }
        const passwordMatch = await bcrypt.compare(password, member.password)
    
        if (passwordMatch) {
            return res.status(200).json('Welcome back to the club');
        } else {
            return res.status(404).json('Wrong Password');
        }
        
    } catch (error) {
        console.error('Login error:', error);
    }
});


app.listen(3000, () => console.log('Server is listening on port 3000'))