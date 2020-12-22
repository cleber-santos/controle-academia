const fs = require('fs') // fileSystem
const data = require("../data.json")
const {age, date} = require("../utils")
const Intl = require('intl') // Intl do npm

exports.index = function(req,res){
    return res.render("members/index", { members: data.members})
}

exports.create = function(req,res){
    return res.render('members/create')
}

exports.post = function(req,res) {

    const keys = Object.keys(req.body) // Cria um array com as keys do formulário.

    // Criar estrutura de validação, para checar que todos os campos estão preenchidos
    for (key of keys) {

        if (req.body[key] == "") {
            return res.send('Please, fill all fields!')
        }        
        //req.body[key] // É o mesmo que usar req.body.avatar_url (exemplo)
    }


    birth = Date.parse(req.body.birth) // altera a data em milissegundos

    // logica para criar o primeiro ID e não haver repetições de valores.
    let id = 1
    const lastMember = data.members[data.members.length -1]

    if (lastMember){
        id = lastMember.id + 1
    }

    // para o fs adicionar novos arrays no data.json
    data.members.push({
        id,
        ...req.body,
        birth,
    })

    // Criar um arquivo json na raiz, com os dados informado do formulário.
    // fs.writeFile("nomeDoArquivo.json", constructor para transformar o js em json, callback para caso exista algum erro de escrita(function))
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error!")

        return res.redirect(`/members/${id}`) // se não ocorrer nenhum erro, ele retorna para a pagina.
    })

}

exports.show = function(req, res){
    const { id } = req.params // retirando o id do req.params e transformando em variável

    const foundMember = data.members.find(function(member){
        return member.id == id
    })

    if (!foundMember) return res.send("Member not found!")

    // corrigir as informações da renderização.
    const member = {
        ... foundMember, // spread do resto das informações
        birth: date(foundMember.birth).birthDay,
    }

    return res.render("members/show", {member})
}

exports.edit = function(req,res){
    const { id } = req.params

    const foundMember = data.members.find(function(member){
        return member.id == id
    })

    if (!foundMember) return res.send("Member not found!")

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).iso
    }


    return res.render('members/edit', {member})
}

exports.put = function(req,res){
    const { id } = req.body
    let index = 0

    const foundMember = data.members.find(function(member, foundIndex){
        if (id == member.id){
            index = foundIndex
            return true
        }
    })

    if (!foundMember) return res.send("Member not found!")

    const member = {
        ... foundMember,
        ... req.body,
        birth: Date.parse(req.body.birth),//tráz o birth atualizado do req.body
        id: Number(req.body.id)
    }

    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("white error!")

        return res.redirect(`/members/${id}`)
    })
}

exports.delete = function(req,res){
    const { id } = req.body

    const filteredMembers = data.members.filter(function(member){
        return member.id != id
    })

    data.members = filteredMembers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("White error!")

        return res.redirect("/members")
    })
}