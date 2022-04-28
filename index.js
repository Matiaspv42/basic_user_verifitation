const {getUsuarios, addUsuario, loginUsuario}= require('./consultas')
const express = require('express');
const { log } = require('console');
const app = express()

app.listen(3000, ()=>{
    console.log('Servidor andando en puerto 3000');
})

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

app.get('/usuarios', async(req,res)=>{
    const usuarios = await getUsuarios()
    res.json(usuarios)
})

app.use(express.json())

app.post('/usuario', async (req,res)=>{
    try {
        const data = Object.values(req.body)
        const resultado = await addUsuario(data)
        
    } catch (error) {
        
    }
})

app.post('/login', async(req,res)=>{
    try {
        const data = Object.values(req.body)
        const respuesta = await loginUsuario(data)
        if(respuesta[0].email === data[0] && respuesta[0].password === data[1]){
            console.log('usuario verificado');
            res.status(201).json()
        }else{
            console.log('usuario no verificado');
            res.status(400).json('Usuario o password equivocada!')
        }
    } catch (error) {
        
    }
})