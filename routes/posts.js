const express=require('express');
//const cors=require('cors');
const router=express.Router();
//const Post=require('../models/Posts');
const package=require('../Controller');

//router.use(cors());
router.get('/',(req,res)=>{
    res.send("We are on posts");
})

router.post('/reactor',(req,res)=>{
    console.log('hello world');
    console.log(req.body.movieName);   //undefined error>
    console.log(req.body.movieReview);
    res.json([{"movieName":"submitresponse_check1","movieReview":"Excellent"},{"movieName":"submitresponse_check2","movieReview":"Excellent"}]);
})


router.post('/',(req,res)=>{
    console.log("inside posts base")
    // console.log(req.body);

});


///////////////////////////////////////////////


router.post('/makeRegisteration', function (request, response) {  //whenever post and auth is used this functions call
    
    let answer="Error{debug}";
    
    //name,age,gender,address,contactnumber,password,id
    console.log(request);
    let Name = request.body.Name;   
    let Age = request.body.Age;
    let Gender = request.body.Gender;   
    let Address = request.body.Address;
    let ContactNumber = request.body.ContactNumber;   
    let Password = request.body.Password;
    let CNIC = request.body.CNIC;//request.body[0].ID;   
    
    async function main(){
        
        let Hospitalobj=new package.Hospital();
        answer=await Hospitalobj.makeRegisteration(Name,Age,Gender,Address,ContactNumber,Password,CNIC);
    }
    
    main().then(()=>{console.log(answer); response.send(answer);})
    
});

router.post('/login', function (request, response) {  //whenever post and auth is used this functions call
    let answer="Error{debug}";
    //request=JSON.parse(request);
//   console.log(request);

    // console.log(request.body.ID);
    var ID = request.body.ID;   
    var Password = request.body.Password;
    console.log(ID);
    console.log(Password);
    
    
    console.log()
    async function main(){
        let Hospitalobj=new package.Hospital();
        answer=await Hospitalobj.login(ID,Password);
       // console.log(answer);
    }
    
    main().then(()=>{ console.log(answer); response.send(answer) }); 
    //console.log(username);
    //console.log(password);
});

router.post('/loginAdmin', function (request, response) {  //whenever post and auth is used this functions call

    let answer="Error{debug}";

    //response.send("loginAdmin");
    /*
        status:
        ID:
        Password:
        Job:Admin // can check at backend also.
    */
   
   var ID = request.body.ID;   
   var Password = request.body.Password;
   console.log(ID);
   console.log(Password);
   
   
   async function main(){
       let Hospitalobj=new package.Hospital();
       answer=await Hospitalobj.loginAdmin(ID,Password);
      // console.log(answer);
   }
   
   main().then(()=>{ console.log(answer); response.send(answer) }); 
   //console.log(username);
   //console.log(password);
    
});

router.post('/loginDoctor', function (request, response) {  //whenever post and auth is used this functions call

    let answer="Error{debug}";

    //response.send("loginAdmin");
    /*
        status:
        ID:
        Password:
        Job:Admin // can check at backend also.
    */
   
   var ID = request.body.ID;   
   var Password = request.body.Password;
   console.log(ID);
   console.log(Password);
   
   
   async function main(){
       let Hospitalobj=new package.Hospital();
       answer=await Hospitalobj.loginDoctor(ID,Password);
      // console.log(answer);
   }
   
   main().then(()=>{ console.log(answer); response.send(answer) }); 
    
});

router.post('/updateEmployee', function (request, response) {  //whenever post and auth is used this functions call

    let answer="Error{debug}";

    //response.send("Inside Update employ");
    /*
    Name,DOB,Gender,Contact,Job,Salary,Address,Specility
    */
   let EmpId=request.body.EmpId;
   let Name=request.body.Name;
   let DOB=request.body.DOB;
   let Gender=request.body.Gender;
   let Contact=request.body.Contact;
   let Job=request.body.Job;
   let Salary=request.body.Salary;
   let Address=request.body.Address;
   let Speciality=request.body.Speciality;
   let Password=request.body.Password;
    
    async function main(){
        
        let Hospitalobj=new package.Hospital();
        answer=await Hospitalobj.updateEmployee(EmpId,Name,DOB,Gender,Contact,Job,Salary,Address,Speciality,Password);
    }

    main().then(()=>{console.log(answer); response.send(answer);})
    
});

router.post('/getEmployeeDetails', function (request, response) {  //whenever post and auth is used this functions call

    let answer="Error{debug}";
    let ID=request.body.ID;
    

    
    /*
    Name,DOB,Gender,Contact,Job,Salary,Address,Specility
    */
    
    async function main(){
        
        let Hospitalobj=new package.Hospital();
        answer=await Hospitalobj.detailOfEmployee(ID);

        //to remove []
        answer=answer.slice(1,-1);
    }

    main().then(()=>{console.log(answer); response.send(answer);})
    
});


router.post('/detailOfDoctor', function (request, response) {  //whenever post and auth is used this functions call

    let answer="Error{debug}";
    //  let DeptID=request.body.ID;
  
      let ID=request.body.ID;
      //ID=ID.slice(-2);
   
    

    
    async function main(){
        
        let Hospitalobj=new package.Hospital();
        answer=await Hospitalobj.detailOfDoc(ID);
    }

    main().then(()=>{console.log(answer); response.send(answer);})
    
});

router.post('/makeAppointment', function (request, response) {  //whenever post and auth is used this functions call

    let answer="Error{debug}";
    //  let DeptID=request.body.ID;
  
      let ID=request.body.ID;
      //ID=ID.slice(-2);
   
    

    
    async function main(){
        
        let Hospitalobj=new package.Hospital();
        answer=await Hospitalobj.makeAppointment(ID);
    }

    main().then(()=>{console.log(answer); response.send(answer);})
    
});


router.post('/requestTime', function (request, response) {  //whenever post and auth is used this functions call

    let answer="Error{debug}";
    
   
    
    let ID=request.body.ID;
    let Date=request.body.Date;
    
    async function main(){
        
        // let Hospitalobj=new package.Hospital();
        // answer=await Hospitalobj.arrangeSlot(0,8,6);

        let Hospitalobj=new package.Hospital();
        answer=await Hospitalobj.requestTime(ID,Date);
        //console.log(answer.count+"this is final")
    }

    main().then(()=>{console.log(answer); response.send(answer);})
    
});


router.post('/confirmAppointment', function (request, response) {  //whenever post and auth is used this functions call

    let answer="Error{debug}";
    
   
    
    let DocID=request.body.DocID;
    let Date=request.body.Date;
    let PatID=request.body.ID;
    let Time=request.body.Time;
    
    async function main(){
        
        // let Hospitalobj=new package.Hospital();
        // answer=await Hospitalobj.arrangeSlot(0,8,6);

        let Hospitalobj=new package.Hospital();
        answer=await Hospitalobj.confirmAppointment(DocID,PatID,Date,Time);
        //console.log(answer.count+"this is final")
    }

    main().then(()=>{console.log(answer); response.send(answer);})
    
});


router.post('/makePayment', function (request, response) {  //whenever post and auth is used this functions call

    let answer="Error{debug}";
    
   
    
    let AppID=request.body.AppID;
    let Amount=request.body.Amount;

    // AppID=parseInt(AppID);
    // Amount=parseInt(Amount);

    
    async function main(){
        
        // let Hospitalobj=new package.Hospital();
        // answer=await Hospitalobj.arrangeSlot(0,8,6);

        let Hospitalobj=new package.Hospital();
        answer=await Hospitalobj.makePayment(AppID,Amount);
        //console.log(answer.count+"this is final")
    }

    main().then(()=>{console.log(answer); response.send(answer);})
    
});



router.post('/checkDoctorAppointment', function (request, response) {  //whenever post and auth is used this functions call

    let answer="Error{debug}";
    
    let DocID=request.body.DocID;
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

    main().then(()=>{ response.send(answer);})
    
});




router.post('/completeAppointment', function (request, response) {  //whenever post and auth is used this functions call

    let answer="Error{debug}";
    
    let AppID=request.body.AppID;
    
    
    
    
    
    async function main(){
        
         let Hospitalobj=new package.Hospital();
         answer=await Hospitalobj.completeAppointment(AppID);

        // let Hospitalobj=new package.Hospital();
        // answer=await Hospitalobj.confirmAppointment(DocID,PatID,Date,Time);
        
        //console.log(answer.count+"this is final")
    }

    main().then(()=>{ response.send(answer);})
    
});


router.post('/detailReport', function (request, response) {  //whenever post and auth is used this functions call

    let answer="Error{debug}";
    
    let RepID=request.body.RepID;
    
    
    
    
    
    async function main(){
        
         let Hospitalobj=new package.Hospital();
         answer=await Hospitalobj.detailReport(RepID);

        // let Hospitalobj=new package.Hospital();
        // answer=await Hospitalobj.confirmAppointment(DocID,PatID,Date,Time);
        
        //console.log(answer.count+"this is final")
    }

    main().then(()=>{ response.send(answer);})
    
});


router.post('/viewMedicalReport', function (request, response) {  //whenever post and auth is used this functions call

    let answer="Error{debug}";
    
    let PatID=request.body.PatID;
    
    
    
    
    
    async function main(){
        
         let Hospitalobj=new package.Hospital();
         answer=await Hospitalobj.getMedicalReport(PatID);

        // let Hospitalobj=new package.Hospital();
        // answer=await Hospitalobj.confirmAppointment(DocID,PatID,Date,Time);
        
        //console.log(answer.count+"this is final")
    }

    main().then(()=>{ response.send(answer);})
    
});

router.post('/patientInformation', function (request, response) {  //whenever post and auth is used this functions call

    let answer="Error{debug}";
    
    let PatID=request.body.PatID;
    
    
    
    
    
    async function main(){
        
         let Hospitalobj=new package.Hospital();
         answer=await Hospitalobj.findPatientDetail(PatID);

        // let Hospitalobj=new package.Hospital();
        // answer=await Hospitalobj.confirmAppointment(DocID,PatID,Date,Time);
        
        //console.log(answer.count+"this is final")
    }

    main().then(()=>{ response.send(answer);})
    
});


router.post('/updatePatientHistory', function (request, response) {  //whenever post and auth is used this functions call

    let answer="Error{debug}";
    
    let PatID=request.body.PatID;
    let DocID=request.body.DocID;
    let Date=request.body.Date;
    let Diagnosis=request.body.Diagnosis;
    let Prescription=request.body.Prescription;
    let Advice=request.body.Advice;
    
    
    
    async function main(){
        
         let Hospitalobj=new package.Hospital();
         answer=await Hospitalobj.updatePatientHistory(PatID,DocID,Date,Diagnosis,Prescription,Advice);

        // let Hospitalobj=new package.Hospital();
        // answer=await Hospitalobj.confirmAppointment(DocID,PatID,Date,Time);
        
        //console.log(answer.count+"this is final")
    }

    main().then(()=>{ response.send(answer);})
    
});


router.post('/testing', function (request, response) {  //whenever post and auth is used this functions call

    let answer="Error{debug}";
    
   
    
    
    
    async function main(){
        
        // let Hospitalobj=new package.Hospital();
        // answer=await Hospitalobj.arrangeSlot(0,8,6);

          let tempobj=new package.Creater();
          answer=await tempobj.car();
          
        
    }

    main().then(()=>{console.log(answer); response.send(answer);})
    
});


module.exports= router;