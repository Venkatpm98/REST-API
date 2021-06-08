const express=require('express');

const app=express();

//Middleware
// app.use('/posts',()=>{
//     console.log("This is middleware running");
// });

app.get('/',(req,res)=>{
    res.send('we are on home page');
});

app.get('/posts',(req,res)=>{
    res.send('we are on posts page');
});

app.listen(3000);
