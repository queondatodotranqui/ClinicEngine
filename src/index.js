const path = require('path');
const express = require('express');
const data = require('./patients.js');
const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.set('view engine', 'hbs');

app.get('/', (req, res)=>{
    res.render('index');
})

app.get('/patient/add', (req, res)=>{
    if(req.query.name){
        let info = data.add(req.query.name, req.query.address, req.query.visit, req.query.doctor);
        
        if(info){
            return res.send({
                info
            })
        }
    } else {
        return res.send({
            error: 'name pls'
        })
    }
})

app.get('/patient/read', (req, res)=>{
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

app.get('/patient/list', (req, res)=>{
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

app.get('/patient/remove', (req, res)=>{
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
