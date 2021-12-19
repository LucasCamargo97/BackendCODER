const socket = io()


socket.on('deliverProducts',result=>{
    let products = result.payload;
    fetch('templates/productTable.handlebars').then(string=>string.text()).then(template=>{
        const prossTemplate = Handlebars.compile(template);
        const tempObj={
            products:products
        }
        const html = prossTemplate(tempObj);
        let div = document.getElementById('productsTable');
        div.innerHTML=html;
    })
})
//----------------------CHAT--------------------------
const mailInp = document.getElementById('email')
let email = ''
mailInp.addEventListener('keyup', e => {
  if (e.target.value) email = e.target.value
})
const msgInput = document.getElementById('msg')
let msg = ''
msgInput.addEventListener('keyup', e => {
  if (e.target.value) msg = e.target.value
})

const sendBtn = document.getElementById('sendBtn')

sendBtn.addEventListener('click', e => {
  let data = {email:email,message:msg}
  fetch('http://localhost:8080/api/chat',{
        method:'POST',
        body:JSON.stringify(data),
        headers:{
            "Content-type":"application/json"
        }})
  e.preventDefault()
  if (!email || !msg) window.alert('email or message inputs are empty!')
  const date = new Date()
  const theDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}
  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  socket.emit('chat', { email: email, date: chat.created_at, message: msg })
})

socket.on('chat', data => {
  const chatDiv = document.getElementById('chat')
  const chat = data.map(chat => {
    return `<p>
            <span style='color: blue; font-weight: 600;'>${chat.email}</span> [<span style='color: brown;'>
            ${chat.created_at}</span>]: <span style='color: green;font-style: italic;'>${chat.message}</span>
          </p>`
  }).join('')
  chatDiv.innerHTML = chat
})
//----------------------------------------------------

document.addEventListener('submit', sendForm)
function sendForm(event){
    event.preventDefault()
    let form = document.querySelector('#productForm')
    let data = new FormData(form)
    let title = data.get('title')
    let description = data.get('description')
    let code = data.get('code')
    let thumbnail = data.get('thumbnail')
    let price = data.get('price')
    let stock = data.get('stock')
    let req = {
        title:title,
        description:description,
        code:code,
        thumbnail:thumbnail,
        price:price,
        stock:stock
    }
    alert(`Gracias!, si eres Admin el producto '${title}' se ha añadido con exito
    de lo contrario no lo podras añadir`)
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

