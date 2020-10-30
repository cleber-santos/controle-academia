const fs = require('fs') // fileSystem
const data = require("./data.json")
const {age, date} = require("./utils")
const Intl = require('intl') // Intl do npm


// Show
exports.show = function(req, res){
    const { id } = req.params // retirando o id do req.params e transformando em variável

    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id
    })

    if (!foundInstructor) return res.send("Instructor not found!")

    // corrigir as informações da renderização.
    const instructor = {
        ... foundInstructor, // spread do resto das informações
        birth: age(foundInstructor.birth),
        services: foundInstructor.services.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at)// para o pt-BR deve instalar o intl pelo npm (npm i intl)
    }

    return res.render("instructors/show", {instructor})
}


// create
exports.post = function(req,res) {

    const keys = Object.keys(req.body) // Cria um array com as keys do formulário.

    // Criar estrutura de validação, para checar que todos os campos estão preenchidos
    for (key of keys) {

        if (req.body[key] == "") {
            return res.send('Please, fill all fields!')
        }        
        //req.body[key] // É o mesmo que usar req.body.avatar_url (exemplo)
    }

    // Desestruturar o req.body
    let {avatar_url, name, birth, gender, services} = req.body

    birth = Date.parse(birth) // altera a data em milissegundos
    const created_at = Date.now() // coloca a data de criação do cadastro (em milissegundos)
    const id = Number(data.instructors.length + 1) // Criar um ID numérico

    // para o fs adicionar novos arrays no data.json
    data.instructors.push({
        id,
        name,
        birth,
        gender,
        avatar_url,
        services,
        created_at,
    })

    // Criar um arquivo json na raiz, com os dados informado do formulário.
    // fs.writeFile("nomeDoArquivo.json", constructor para transformar o js em json, callback para caso exista algum erro de escrita(function))
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error!")

        return res.redirect("/instructors") // se não ocorrer nenhum erro, ele retorna para a pagina.
    })

}

// edit

exports.edit = function(req,res){
    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id
    })

    if (!foundInstructor) return res.send("Instructor not found!")

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth)
    }


    return res.render('instructors/edit', {instructor})
}

// PUT - update
exports.put = function(req,res){
    const { id } = req.body
    let index = 0

    const foundInstructor = data.instructors.find(function(instructor, foundIndex){
        if (id == instructor.id){
            index = foundIndex
            return true
        }
    })

    if (!foundInstructor) return res.send("Instructor not found!")

    const instructor = {
        ... foundInstructor,
        ... req.body,
        birth: Date.parse(req.body.birth)
    }

    data.instructors[index] = instructor

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("white error!")

        return res.redirect('/instructors/{{id}}')
    })
}




// delete