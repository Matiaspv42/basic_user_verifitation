const { log } = require('console');
const {Pool}= require('pg')

const config = {
    user:'postgres',
    password:'postgres',
    database:'softlife',
    host:'localhost',
    route:5432
}

const pool = new Pool(config);

const getUsuarios = async()=>{
    const query = {
        text:'SELECT * from usuarios'
    }
    try {
        const {rows} = await pool.query(query)
        return rows
    } catch (error) {
        console.log(error);
    }
}

const addUsuario = async(data)=>{
    const query = {
        text:'INSERT INTO usuarios values($1,$2) RETURNING *',
        values:data
    }
    try {
        const respuesta = await pool.query(query);
        return respuesta
    } catch (error) {
        
    }
}

const loginUsuario = async(data)=>{
    const query = {
        text:'SELECT * FROM usuarios WHERE email = $1',
        values:[data[0]]
    };
    try {
        const {rows} = await pool.query(query);
        return rows
    } catch (error) {
        console.log(error);
    }
}

module.exports ={
    getUsuarios,
    addUsuario,
    loginUsuario
}