const Student = require('../models/Student');

exports.createStudent = (req, res, next)=>{
    const new_student = new Student(req.body);
        new_student.save((err, student)=>{
            if (err) {
                console.log(err)
            } else {
                res.redirect(student.url); 
                console.log(student)
            }
        });
        
}

exports.listStudents = (req, res, next)=>{
    Student.find({}, (err, students)=>{
        res.render('students', { title: 'Students', students})
    });
}


exports.studentDetail = (req, res, next)=>{
    Student.findById(req.params.id, (err, student)=>{
        if (err) {
            console.log(err);
        } else {
            res.render('studentdetail', {title: student.firstname +" "+ student.lastname , student})
        }
    });
}