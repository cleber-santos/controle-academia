// adicionar a class active, para saber qual pagina está sendo visualizada no header.

const currentPage = location.pathname //mostra qual pagina está
const menuItems = document.querySelectorAll("header .links a") //seleciona no header todos os links

for (item of menuItems){
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}
