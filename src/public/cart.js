let user = {}

fetch('/api/current')
  .then(result => {
    if (result.status !== 200) location.replace('signin.html')
    return result.json()
  })
  .then(response => {
    user = response
    setUserProfile(response)
    fetchProductsCart()
  })

const setUserProfile = (user) => {
  const avatar = document.getElementById('avatar')
  if (avatar && user.avatar) { avatar.setAttribute('src', user.avatar) }
  const email = document.getElementById('email')
  if (email) { email.innerText = user.email }
  const role = document.getElementById('role')
  if (role) { role.innerText = user.role }
}

const logout = document.getElementById('logout')
if (logout) {
  logout.addEventListener('click', (e) => {
    fetch('/api/logout', {
      method: 'POST'
    })
      .then(result => {
        if (result.status === 200) location.replace('signin.html')
      })
  })
}

const cart = document.getElementById('cart')
if (cart) {
  cart.addEventListener('click', (e) => {
    location.replace('cart.html')
  })
}

const fetchProductsCart = () => {
  let cartId
  fetch(`/api/users/${user._id}`)
    .then(result => result.json())
    .then(response => {
      cartId = response.user.cart
      if (cartId) {
        fetch(`/api/carts/${cartId}/products`)
          .then(result => result.json())
          .then(response => {
            let products = ''
            if (response.products.length === 0) {
              document.getElementById('productsCart').innerHTML = '<span class=\'display-6 text-center\'>No products in shopping cart.</span>'
            } else {
              response.products.forEach(product => {
                products += `
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <img class="rounded" src="${product.picture}" width="50px" height="50px" />
            <div class="vr mx-2"></div>
            <div class="me-auto">
              <div class="fw-bold">${product.name}</div>
              ${product.description}
            </div>
            <div class="vr mx-3"></div>
            <span class="badge bg-primary rounded-pill">$${product.price}</span>
          </li>
          `
              })
              document.getElementById('productsCart').innerHTML = `
        <ul class="list-group">
          ${products}
        </ul>
        <div class="mt-3 align-self-end">
          <button id="purchase" class="btn btn-primary">Finalizar pedido</button>
        </div>
        `
              document.getElementById('purchase').addEventListener('click', (e) => {
                fetch('/api/purchases', {
                  method: 'POST',
                  body: JSON.stringify({
                    productsId: response.products.map(product => product._id),
                    userId: user._id
                  }),
                  headers: {
                    'Content-Type': 'application/json'
                  }
                })
                  .then(result => {
                    return result.json()
                  })
                  .then(response => {
                    if (response.message) {
                      window.alert(`Error: ${response.message}`)
                    } else {
                      window.alert(`Thanks for your purchase #${response.purchase._id}`)
                      location.replace('home.html')
                    }
                  })
              })
            }
          })
      } else {
        document.getElementById('productsCart').innerHTML = '<span class=\'display-6 text-center\'>No products in shopping cart.</span>'
      }
    })
}
