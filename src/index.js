const path = require('path');
const express = require('express');
const data = require('./data.js');
const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.set('view engine', 'hbs');

app.get('/', (req, res)=>{
    res.render('index');
})

app.get('/data', (req, res)=>{
    if(req.query.name){
        data.add(req.query.name, req.query.address, req.query.visit, req.query.doctor);
        return res.send({
            status: 'loaded'
        })
    } else {
        return res.send({
            error: 'name pls'
        })
    }
})

app.get('/read', (req, res)=>{
    if(req.query.name){
        let info = data.read(req.query.name);

        if(info){
            return res.send({
                info
            })
        }
    } else {
        return res.send({
            error: 'info not found'
        })
    }
})

app.get('/list', (req, res)=>{
    if(data.list()){
        return res.send({
            patients: data.list()
        })
    } else {
        return res.send({
            error: 'no patients yet'
        })
    }
})

app.get('/remove', (req, res)=>{
    if(req.query.name){
        data.remove(req.query.name);
        return res.send({
            msg: 'Patient deleted',
            patients: data.list()
        })
    } else {
        return res.send({
            error: 'name not found'
        })
    }
})

app.listen(5000, ()=>{
    console.log('Server up in port 5000');
})
