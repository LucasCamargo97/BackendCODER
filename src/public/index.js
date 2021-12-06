const socket = io()

socket.on('deliverProducts',result=>{
    let products = result.payload;
    fetch('templates/productsTable.handlebars').then(string=>string.text()).then(template=>{
        const prossTemplate = Handlebars.compile(template);
        const tempObj={
            products:products
        }
        const html = prossTemplate(tempObj);
        let div = document.getElementById('productsTable');
        div.innerHTML=html;
    })
})

document.addEventListener('submit', sendForm)
function sendForm(event){
    event.preventDefault()
    let form = document.querySelector('#productForm')
    let data = new FormData(form)
    let title = data.get('title')
    let price = data.get('price')
    let thumbnail = data.get('thumbnail')
    let description = data.get('description')
    let req = {
        title:title,
        price:price,
        thumbnail:thumbnail,
        description:description
    }
    fetch('http://localhost:8080/api/productos',{
        method:'POST',
        body:JSON.stringify(req),
        headers:{
            "Content-type":"application/json"
        }

    }).then(result=>{
        return result.json()
    }).then(json=>{
        console.log(json)
    })
}

