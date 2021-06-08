const Joi=require('joi');
const express=require ('express');
const app=express();
app.use(express.json());
//get
const courses=[
    {id:1,name:'nodejs'},
    {id:2,name:'expressjs'},
    {id:3,name:'reactjs'} 
];
app.get('/',(req,res)=>{
    res.send('Hello World');
});
app.get('/api/courses',(req,res)=>{
    res.send(courses);
});
app.get('/api/courses/:id',(req,res)=>{
    const course = courses.find(c=>c.id === parseInt(req.params.id))
    if(!course)
    res.status(404).send('The course with the given Id is not found');
    res.send(course);
});


//Post
app.post('/api/courses',(req,res)=>{
     const schema={
         name:Joi.string().min(3).required()
     };
     const result=Joi.validate(req.body,schema);
     console.log(result);

    if(!req.body.name ||req.body.name.length<3){
      //400 bad request  
      res.status(400).send('Name is required and should be  minimum characters long')
      return;
    }
    const course={
        id:courses.length +1,
        name :req.body.name
    };
    courses.push(course);
    res.send(course);
});

//Put
app.put('/api/courses/:id',(req,res)=>{
    const course = courses.find(c=>c.id === parseInt(req.params.id))
    if(!course)
    res.status(404).send('The course with the given Id is not found');

    const schema={
        name:Joi.string().min(3).required()
    };
    const result=Joi.validate(req.body,schema);
    if(!req.body.name ||req.body.name.length<3){
        //400 bad request  
        res.status(400).send('Name is required and should be  minimum characters long')
        return;
      }
      course.name=req.body.name;
      res.send(course)
});

function validateCourse(course){
    const schema={
        name:Joi.string().min(3).required()
    };
    return Joi.validate(course,schema);
}


//Delete
app.delete('/api/courses/:id',(req,res)=>{
    const course=courses.find(c=>c.id ===parseInt(req.params.id));
    if(!course)res.status(404).send('The course with the given ID is not found');
    const index=courses.indexOf(course);
    courses.splice(index,1);
    res.send(course);

})





//Port
const port=process.env.PORT || 5000;
app.listen(port,()=>console.log(`Listening on port ${port}.....`));