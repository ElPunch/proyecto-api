fetch ("https://superheroapi.com/api/5cbbe2217a57e86e8968274677c361c0/245")
.then(response => response.json())
.then(data => {
    console.log(data)
})
.catch(error => alert (error))


