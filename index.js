var express = require('express')
var app = express()
const axios = require('axios')
const { response } = require('express')

app.use(express.json())

app.get('/callback', (req, res)=>{
    function1 = () => {
        console.log('This is function 1')
    }

    function3 = () => {
        console.log("This is function 3")
    }

    function2 = (callback) => {
        console.log('This is function 2');
        callback()
    }

    function1()
    function2(function3)
})


app.get('/promise/:id', (req, res)=>{
    var id = req.params.id
    const albums = (id) => axios.get('https://jsonplaceholder.typicode.com/users/'+id+'/albums')
    const posts  = (id) => axios.get('https://jsonplaceholder.typicode.com/users/'+id+'/posts')
    
    const getAlbums = albums(id).then(res => res.data).catch(error => error)
    const getPosts  = posts(id).then(res => res.data).catch(error => error)
    Promise.all([getAlbums,getPosts]).then((values)=>{
        console.log(values)
        res.json(values)
    })
})

app.get('/async-await/:id', (req, res)=>{
    var id = req.params.id

    getAlbums = async (id) =>{
        try{
            let response = await axios.get('https://jsonplaceholder.typicode.com/users/'+id+'/albums')
            response = await response.data
            console.log(response)
            res.json(response)
        }catch(error){
            console.log(error)
            res.json(error)
        }
    }
    getAlbums(id)
})


app.listen(3000, () => console.log('Listening at http://localhost:3000'))