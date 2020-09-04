var express = require('express')
var app = express()
const axios = require('axios')

app.use(express.json())

app.get('/callback', (req, res)=>{
    const function1 = () => {
        console.log('This is function 1')
    }

    const function3 = () => {
        console.log("This is function 3")
    }

    const function2 = (callback) => {
        console.log('This is function 2')
        callback()
    }

    function1()
    function2(function3)
})


app.get('/promise/:id', (req, res)=>{
    let id = req.params.id
    const albums = (id) => axios.get('https://jsonplaceholder.typicode.com/users/'+id+'/albums').then((response)=>response.data)
    const posts  = (id) => axios.get('https://jsonplaceholder.typicode.com/users/'+id+'/posts').then((response)=>response.data)
    
    const getAlbums = albums(id)
    const getPosts  = posts(id)
    Promise.all([getAlbums,getPosts]).then((values)=>{
        console.log(values)
        res.send(values)
    }).catch(error => {
        console.log(error)
        res.send(error)
    })
})

app.get('/async-await/:id', async (req, res)=>{
    const id = req.params.id

        try{
            let response = await axios.get('https://jsonplaceholder.typicode.com/users/'+id+'/albums')
            response = await response.data
            console.log(response)
            res.json(response)
        }catch(error){
            console.log(error)
            res.json(error)
        }
    
})


app.listen(3000, () => console.log('Listening at http://localhost:3000'))