const mongoose = require('mongoose')

const url = 'mongodb+srv://admin:123Senac@cluster0.lfstp.mongodb.net/dbclientes'

let conectado = false
const conectar = async () => {
    if (!conectado) {

   try {
    await mongoose.connect(url)
    conectado = true
    console.log("MongoDB Conectado")
    return true
   } catch (error) {
    if (error.code = 8000) {
        console.log("Erro de autenticacao")
    } else {
        console.log(error)
    }
    return false
   }
}
}

    const desconectar = async () => {
       
        if (conectado) {
                   
            try {
                await mongoose.disconnect(url) 
                conectado = false 
                console.log("MongoDB desconectado")
                return true 
            } catch (error) {
                console.log(error)
                return false
            }
        }
    }
    
    module.exports = { conectar, desconectar }
