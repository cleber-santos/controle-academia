module.exports = {
    age: function age(timestamp){
        const today = new Date()
        const birthDate = new Date(timestamp)
    
        let age = today.getFullYear() - birthDate.getFullYear() // exemplo: 2019 - 1984 = 35
        
        const month = today.getMonth() - birthDate.getMonth()
        
        // se o mês for menor ou igual a 0   &&   se o dia de hoje for menor que meu dia de aniversario retire -1 da variável age.
        if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
            age = age - 1
        }
    
        return age
    },

    date: function(timestamp) {
        const date = new Date(timestamp)
        
        // yyyy
        const year = date.getUTCFullYear()

        // mm
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)

        // dd
        const day = `0${date.getUTCDate()}`.slice(-2)

        return `${year}-${month}-${day}`
    }
}