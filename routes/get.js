const express=require('express');
//const cors=require('cors');

const router=express.Router();

const package=require('../Controller');
//router.use(cors());
router.get('/',(req,res)=>{
    res.send("We are on user");
})


router.get('/specific',(req,res)=>{
    res.send('This is specific user')
})


router.get('/reactor',(req,res)=>{
    //res.send("you have all these");
    res.json([{"movieName":"Universal Soldier","movieReview":"Excellent"},{"movieName":"Universal Soldier","movieReview":"Excellent"}]);  //to test get funcition wil;
    //connect to backend 
});

router.get("/getAllPatients",(req,res)=>{
    async function main(){
        
        let Hospitalobj=new package.Hospital();
        answer=await Hospitalobj.getAllPatientInfo();
    }

    main().then(()=>{console.log(answer+"okokokokokokokokok"); res.send(answer);})
    
});

router.get('/findDoctor', function (request, response) {  //whenever post and auth is used this functions call

    let answer="Error{debug}";


    
    async function main(){
        
        let Hospitalobj=new package.Hospital();
        answer=await Hospitalobj.getDept();
    }

    main().then(()=>{console.log(answer+"okokokokokokokokok"); response.send(answer);})
    
});


router.get('/doctorOfDept', function (request, response) {  //whenever post and auth is used this functions call

    let answer="Error{debug}";
  //  let DeptID=request.body.ID;

    let ID=(request.url);
	ID=ID.slice(-2);
	DeptID=ID;
    
    async function main(){
        
        let Hospitalobj=new package.Hospital();
        answer=await Hospitalobj.docOfDept(DeptID);
    }

    main().then(()=>{console.log(answer); response.send(answer);})
    
});
//

router.get('/checkDoctorAppointment', function (request, response) {  //whenever post and auth is used this functions call

    let answer="Error{debug}";
    
    let DocID=(request.url);
    DocID=DocID.slice(-2);
   
   
    let Date=request.body.Date;
    
    if(typeof(Date)=='undefined'){
        Date="%";
    }

    console.log(DocID);
    console.log(Date);
    
    
    async function main(){
        
         let Hospitalobj=new package.Hospital();
         answer=await Hospitalobj.checkAppointment(DocID,Date);

        // let Hospitalobj=new package.Hospital();
        // answer=await Hospitalobj.confirmAppointment(DocID,PatID,Date,Time);
        
        //console.log(answer.count+"this is final")
    }
    console.log(answer);

    main().then(()=>{ response.send(answer);})
    
});


router.get('/viewMedicalReport', function (request, response) {  //whenever post and auth is used this functions call

    let answer="Error{debug}";
    
    let PatID=(request.url);
    PatID=PatID.slice(-2);
    
    
    console.log(PatID);
    
    
    async function main(){
        
         let Hospitalobj=new package.Hospital();
         answer=await Hospitalobj.getMedicalReport(PatID);

        // let Hospitalobj=new package.Hospital();
        // answer=await Hospitalobj.confirmAppointment(DocID,PatID,Date,Time);
        
        //console.log(answer.count+"this is final")
    }

    console.log(answer);

    main().then(()=>{ response.send(answer);})
    
});



router.get('/viewEmploy', function (request, response) {  //whenever post and auth is used this functions call

    let answer="Error{debug}";

    response.send("Inside Update employ");
    /*
    Name,DOB,Gender,Contact,Job,Salary,Address,Specility
    */
    
    // async function main(){
        
    //     let Hospitalobj=new package.Hospital();
    //     answer=await Hospitalobj.docOfDept();
    // }

    //main().then(()=>{console.log(answer); response.send(answer);})
    
});


router.get('/testing', function (request, response) {  //whenever post and auth is used this functions call

    let answer="Error{debug}";
    async function main(){
        
        // let Person=new package.Teacher("Nabeel","Noor",21,"M","Physics");
        // // await Person.setSubject("Maths");
        // // sub=await Person.getSubject();
        // // console.log(sub);

        // // await Person.setAge(22);
        // // sub=await Person.getAge();
        // // console.log(sub);        
        
        // //answer=await Person.speak();
        // //await Person.accessfunction();
        // await Person.accessfunction2();


    }

    main().then(()=>{console.log(answer); response.send(answer);})
    
});



module.exports= router;