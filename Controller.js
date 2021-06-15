const { json } = require('body-parser');
const package2=require('./class');

 class Hospital{
    #patobj;
    #Deptobj;
    #appLogObj;
    #DiagnosticLog;
  
   constructor(){
       this.#patobj=new package2.Patient();
       this.#Deptobj=new package2.Department();
       this.#appLogObj=new package2.AppointmentLog();
   }

   async getAllPatientInfo(){
     //integration required pending
     //call patient class from here.
     let returnmsg=null;
     returnmsg=await this.#patobj.getAllPatientDetail();
     return returnmsg;       
   }

   async login(ID,Password){
     //integration required pending
     //call patient class from here.
     let returnmsg=null;
     returnmsg=await this.#patobj.login(ID,Password);
     return returnmsg;
   }
   
   async makeRegisteration(Name,Age,Gender,Address,ContactNumber,Password,CNIC){
       //integration required pending
       //call patient class from here.
       let returnmsg=null;
       returnmsg=await this.#patobj.makeRegisteration(Name,Age,Gender,Address,ContactNumber,Password,CNIC);
       return returnmsg;
   }

   async getDept(){
       
       let returnmsg=null;
       returnmsg=await this.#Deptobj.getDept();
       return returnmsg;
   }
   
   async docOfDept(DeptID){
       let returnmsg=null;
       returnmsg=await this.#Deptobj.docOfDept(DeptID);
       return returnmsg;
   }

   async detailOfDoc(ID){
       let returnmsg=null;
       returnmsg=await this.#Deptobj.detailOfDoc(ID);
       return returnmsg;
   }

   async loginAdmin(ID,Password){
       let returnmsg=null;
       returnmsg=await this.#Deptobj.loginAdmin(ID,Password);
       return returnmsg;        
   }

   async loginDoctor(ID,Password){
       let returnmsg=null;
       returnmsg=await this.#Deptobj.loginDoctor(ID,Password);
       return returnmsg;        
   }

   async detailOfEmployee(ID){
     let ret;
     ret=await this.#Deptobj.empDetail(ID);
     return ret;
   }

   async updateEmployee(EmpId,Name,DOB,Gender,Contact,Job,Salary,Address,Speciality,Password){
       let ret;
       ret=await this.#Deptobj.updateEmployee(EmpId,Name,DOB,Gender,Contact,Job,Salary,Address,Speciality,Password);
       return ret;        
   }

   async makeAppointment(ID){
       let ret;
       ret=await this.#Deptobj.availableDate(ID);
       return ret;
   }

   async arrangeSlot(reservedSlot,startTiming,slotsPerDay){
       if(reservedSlot<slotsPerDay){
           let arrangedTime=(startTiming+(reservedSlot*(0.5)) );
           return {
               "status":"1",
               "msg":"slot reserved",
               "timing":arrangedTime
           }
       } 
       else{
           return {
               "status":"0",
               "msg":"All slot are already reserved",
               "timing":"-1"
           }            
       }
   }

   async requestTime(ID,Date){
       let counter;
       counter=await this.#appLogObj.getSlot(ID,Date);
       counter=counter.count;
       counter=parseInt(counter,10);

       let timingContainer;
       timingContainer= await this.#Deptobj.doctorTiming(ID);
       //timingContainer=JSON.stringify(timingContainer);
       let startTime=timingContainer.Timing;
       let slotsPerDay=timingContainer.AppSlot;
       startTime=parseFloat(startTime,10);
       slotsPerDay=parseFloat(slotsPerDay,10);
       
       let ret=await this.arrangeSlot(counter,startTime,slotsPerDay);
       ret.timing=ret.timing.toString();
       console.log(ret);
       console.log("This is time");
       return ret;
       

       // console.log(timingContainer+"This is final dest");

       // console.log(counter+1);
       //return ret;
   }

   async confirmAppointment(DocID,PatID,Date,Time){
       let ret;
       ret=await this.#appLogObj.confirmAppointment(DocID,PatID,Date,Time);
       return ret;
   }

   async makePayment(AppID,Amount){
       let ret;
       ret=await this.#appLogObj.makePayment(AppID,Amount);
       return ret;
   }

   async checkAppointment(DocID,Date){
       let ret;
       ret=await this.#appLogObj.checkAppointment(DocID,Date);
       return ret;
   }

   async completeAppointment(AppID){
       let ret;
       ret=await this.#appLogObj.completeAppointment(AppID);
       return ret;
   }

   async detailReport(RID){
        let ret;
        ret=await this.#patobj.detailReport(RID);
        return ret;
   }

   async getMedicalReport(PatID){
       let ret;
       ret=await this.#patobj.getMedicalReport(PatID);
       return ret;
   }

   async findPatientDetail(PatID){
       let ret;
       ret=await this.#patobj.getPatientDetail(PatID);
       return ret;
   }

   async updatePatientHistory(PatID,DocID,Date,Diagnosis,Prescription,Advice)
   {
       let ret1;
       ret1=await this.#Deptobj.empDetail(DocID);  
       ret1=ret1.slice(1,-1);
       ret1=JSON.parse(ret1);
       ret1=ret1.Name;
       

       let ret;
       ret=await this.#patobj.updatePatientHistory(PatID,DocID,Date,Diagnosis,Prescription,Advice,ret1);
       return ret;

   }


   async getMyAppointments(Id){
    //    return "{my worlds}"
        let ret1=Id;
        ret1=await this.#appLogObj.getMyAppointments(Id);
        console.log(ret1);
        return ret1;
   }

   
};

module.exports.Hospital = Hospital;