fetch('/api/current')
  .then(result => {
    if (result.status === 200) location.replace('home.html')
    location.replace('signin.html')
  })
