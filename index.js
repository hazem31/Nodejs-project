const express = require('express');
const Joi = require('joi');
const { validate } = require('joi/lib/types/object');
const app = express();
 
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var count1 = 3;
var count2 = 3;

const courses = [
    {name : 'DataBase' , code : "CSE111" , id : 1 , description: "database course"},
    {name : 'Networks' , code : "CSE222" , id : 2 , description: "Networks course"},
    {name : 'Neural Networks' , code : "CSE333" , id : 3 , description: "neural networks course"}
];

const students = [
    {name : 'Hazem Nashar' , code : "1600471" , id : 1},
    {name : 'Ahmed Mohamed' , code : "1600480" , id : 2},
    {name : 'Ramy Adham' , code : "1600450" , id : 3},
];


app.get('/api/courses' , (req,res) =>{
    res.send(courses);
});

app.get('/api/students' , (req,res) =>{
    res.send(students);
});


app.get('/api/courses/:id' , (req,res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id) )
    if (!course)
    { 
        res.status(404).send('course not found');
        return;
    }
    res.send(course);

});

app.get('/api/students/:id' , (req,res) =>{
    const student = students.find(c => c.id === parseInt(req.params.id) )
    if (!student)
    { 
        res.status(404).send('student not found');
        return;
    }
    res.send(student);


});



app.put('/api/courses/:id' , (req,res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id) )
    if (!course)
    { 
        res.status(404).send('course not found');
        return;
    }

    const { error } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    course.name = req.body.name;
    course.code = req.body.code;
    course.description = req.body.description;
    res.send(course);


});

app.put('/api/students/:id' , (req,res) =>{
    const student = students.find(c => c.id === parseInt(req.params.id) )
    if (!student)
    { 
        res.status(404).send('student not found');
        return;
    }

    const { error } = validateStudent(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    student.name = req.body.name;
    student.code = req.body.code;
    res.send(student);


});


app.delete('/api/courses/:id' , (req,res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id) )
    if (!course)
    { 
        res.status(404).send('course not found');
        return;
    }

    const index = courses.indexOf(course);
    courses.splice(index,1);

    res.send(course);
});


app.delete('/api/students/:id' , (req,res) =>{
    const student = students.find(c => c.id === parseInt(req.params.id) )
    if (!student)
    { 
        res.status(404).send('student not found');
        return;
    }

    const index = students.indexOf(student);
    students.splice(index,1);

    res.send(student);
});

app.get('/web/courses/create' , (req,res) =>{
    res.sendFile("courseCreate.html", { root: __dirname });
});

app.get('/web/students' , (req,res) =>{
    res.sendFile("studentCreate.html", { root: __dirname });
});


app.post('/api/courses', (req , res) => {    
    
    const { error } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }


    const course = {
        id : count1 + 1,
        name : req.body.name,
        code : req.body.code,
        description : req.body.description
    };
    courses.push(course);
    res.send(course);
});

app.post('/api/students', (req , res) => {    
    
    const { error } = validateStudent(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }


    const student = {
        id : count2 + 1,
        name : req.body.name,
        code : req.body.code,
    };
    students.push(student);
    res.send(student);
});





function validateCourse(course) {
    const schema = {
        name : Joi.string().min(5).required(),
        code : Joi.string().regex(new RegExp ('^[A-Z]{3}[0-9]{3}$')).required(),
        description : Joi.string().max(200)
    };

    return Joi.validate(course,schema);
}

function validateStudent(student) {
    const schema = {
        name : Joi.string().regex(new RegExp ('^[a-zA-Z ,-]{5,20}$')).required(),
        code : Joi.string().regex(new RegExp ('^[a-zA-Z0-9]{7}$')).required(),
    };

    return Joi.validate(student,schema);
}


// const cources = [
//     {id : 1 , name : 'course1'},
//     {id : 2 , name : 'course2'},
//     {id : 3 , name : 'course3'}
// ];


// app.get('/',(req , res) => {
//     res.send('hello world???');
// });

// app.get('/api/cources' , (req,res) =>{
//     res.send(cources);
// });

// app.get('/api/posts/:year/:month' , (req,res) =>{
//     res.send(req.query);
// });

// app.get('/api/cources/:id' , (req,res) =>{
//     const course = cources.find(c => c.id === parseInt(req.params.id) )
//     if (!course)
//     { 
//         res.status(404).send('course not found');
//         return;
//     }
//     res.send(course);
// });



// app.post('/api/cources/', (req , res) => {
    
//     const { error } = validateCourse(req.body);
//     if (error) {
//         res.status(400).send(error.details[0].message);
//         return;
//     }

//     const course = {
//         id : cources.length + 1,
//         name : req.body.name
//     };
//     cources.push(course);
//     res.send(course);
// });




// app.put('/api/cources/:id' , (req,res) =>{
//     const course = cources.find(c => c.id === parseInt(req.params.id) )
//     if (!course)
//     { 
//         res.status(404).send('course not found');
//         return;
//     }


    // const { error } = validateCourse(req.body);
    // if (error) {
    //     res.status(400).send(error.details[0].message);
    //     return;
    // }

    // course.name = req.body.name;
    // res.send(course);

// });


// app.delete('/api/cources/:id' , (req,res) =>{
//     const course = cources.find(c => c.id === parseInt(req.params.id) )
//     if (!course)
//     { 
//         res.status(404).send('course not found');
//         return;
//     }

//     const index = cources.indexOf(course);
//     cources.splice(index,1);

//     res.send(course);
// });

// function validateCourse(course) {
//     const schema = {
//         name : Joi.string().min(3).required(),
//     };

//     return Joi.validate(course,schema);
// }


// PORT 
const port  = process.env.PORT || 3000
app.listen(port , () => console.log(`listen on ${port}`));