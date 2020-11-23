// Importar o express (Chamar o express)
const express = require('express')

// Importar o nunjucks (Chamar o nunjucks)
const nunjucks = require('nunjucks')

// Chamar o arquivo routes.js
const routes = require('./routes')

//Chamar o method Override
const methodOverride = require('method-override')

// criar um servidor, executando o express
const server = express()

// Configurar o servidor para usar arquivos estáticos.
server.use(express.urlencoded({extended: true})) //funcionar a route req.body
server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(routes)

// Configurar minha template engine.(nunjucks)
server.set("view engine", "njk")

// caminho e options do nunjucks
nunjucks.configure("views", {
    express:server,
    autoescape: false, // para o nunjucks mostrar algumas tags html dentro das variáveis.
    noCache: true, // não ter cache.
})

// Iniciar meu servidor
server.listen(5000, function(){
    console.log("server is running")
})