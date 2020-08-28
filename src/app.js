const path = require('path')
const express = require('express')
const hbs=require('hbs')
const request=require('request');
const { response } = require('express');
port = 3000;
const app = express();

const publicpath=path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialspath)

app.use(express.static(publicpath))



app.get('',(req,res)=>{
    res.render('index',{
        title:"Covid-19 app",
        name:"jenis gadhiya"
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About me",
        name:"jenis gadhiya"
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:"this is some helpful text",
        title:"Help",
        name:"jenis gadhiya"
    })
})
app.get("/covid-19",(req,res)=>{
    if(!req.query.state){
        return res.send({
            error:"You must provide state.."
        })
    }

const url = "https://api.covid19india.org/data.json";
const state=req.query.state;
request({url:url,json:true}, (error, response) =>{
    if (!error && response.statusCode == 200){
        var data = [];
        for (let i = 1; i < response.body.statewise.length; i++) { 
            data.push({ 
                "State": response.body.statewise[i].state, 
                "Confirmed": response.body.statewise[i].confirmed, 
                "Active": response.body.statewise[i].active,  
                "Recovered": response.body.statewise[i].recovered,   
                "Death": response.body.statewise[i].deaths 
            }); 
        } 
        const a=data.find(f=>f.State.toLowerCase().replace(/\s+/g, '')==state.toLowerCase().replace(/\s+/g, ''));
        if(a){res.send(a)}
        else{res.send({
            error:"error...."
        })}
    }
})
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:"Error",
        name:"jenis gadhiya",
    })
})

app.listen(port,()=>{
    console.log("server run up on port 3000")
})