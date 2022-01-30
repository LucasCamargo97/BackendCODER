fetch('/api/login')
  .then(result => result.json())
  .then(response => {
    console.log(response)
    if (response.status === 'error') {
      location.replace('/')
    } else {
      const user = response
      document.getElementById('avatar').setAttribute('src', user.avatar)
      document.getElementById('username').innerHTML = `Bienvenido <strong>${user.username}</strong>!`
      document.getElementById('email').innerHTML = `Email: ${user.email}`
    }
  })
  
document.getElementById('logout').addEventListener('click', () => location.replace('/'))