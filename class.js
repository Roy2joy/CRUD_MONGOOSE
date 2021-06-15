const { json } = require('body-parser');
const { Pool } = require('pg');   //for postgres
const package3=require('./PHHandler');
// require('dotenv/config');


class PHFactory{
    static #inst=null;

    constructor(){
        if(this.constructor==PHFactory){
            throw new Error("Private constructor")
        }
    }
  
    static getinstance(){
        if(this.#inst==null){
            this.#inst=new package3.DBcontroller();
            return this.#inst;
        }
        else{
            return this.#inst;
        }
    }

    
    
};




class AppointmentLog{
    #PHobject;
    #appObj;
  
   constructor(){
        this.#PHobject=PHFactory.getinstance();
        this.#appObj=new Appointment();
       //this.#appObj=new Appointment();
   }

   async getSlot(ID,Date){
        let ret;
        ret=await this.#getAvailableSlot(ID,Date);
        return ret;
   }

   async confirmAppointment(DocID,PatID,Date,Time){
       let ret;
       ret=await this.#appObj.confirmAppointment(DocID,PatID,Date,Time);
       return ret;
   }

   async #getAvailableSlot(ID,Date){
       let ret;
       ret=await this.#PHobject.countReservedSlot(ID,Date);
       return ret;
   }

   async makePayment(AppID,Amount){
        let ret;
        ret=await this.#appObj.makePayment(AppID,Amount);
        return ret;
   }

   async checkAppointment(DocID,Date){
       let ret;
       ret=await this.#collectDocAppointment(DocID,Date);
       return ret;
   }

   async #collectDocAppointment(DocID,Date){
        let ret;
        ret=await this.#PHobject.selectDoctorAppointment(DocID,Date);
        return ret;
   }

   async completeAppointment(AppID){
    let ret;
    ret=await this.#appObj.completeAppointment(AppID);
    return ret;
   }

};

class Appointment{
    #PHobject;

    constructor(){
        this.#PHobject=PHFactory.getinstance();;
    }

    
    async confirmAppointment(DocID,PatID,Date,Time){
    let ret;
    ret=await this.#createAppointment(DocID,PatID,Date,Time);
    return ret;
    }

    async #createAppointment(DocID,PatID,Date,Time){
        let ret;
        ret=await this.#PHobject.allocateAppointment(DocID,PatID,Date,Time);
        return ret;
    }

    async makePayment(AppID,Amount){
        let ret;
        ret=await this.#activateAppointment(AppID,Amount);
        return ret;
    }

    async #activateAppointment(AppID,Amount){
        let ret;
        ret=await this.#PHobject.activateAppointment(AppID,Amount);
        return ret;
    }
    
    async completeAppointment(AppID){
        let ret;
        ret=await this.#deactivateAppointment(AppID);
        return ret;
    }

    async #deactivateAppointment(AppID){
        let ret;
        ret=await this.#PHobject.deactivateAppointment(AppID);
        return ret;
    }
};

 class Department{
    #PHobject;
    #Empobj

    constructor(){
        this.#PHobject=PHFactory.getinstance();;
        this.#Empobj=new Employee();
        
    }

    async #getAllDept(){
        //console.log("inside private get dept");
        let retmsg="working fine";
        //call to DB controller to get things
        
        retmsg=await this.#PHobject.getAllDept();
        //console.log(debug2);
        return retmsg;
    }

    async getDept(){
        //public function called by other classes.
        console.log("inside get DEpt");
        let retmsg;
        retmsg=await this.#getAllDept();
        return retmsg;
    }

    async docOfDept(DeptID){
        let returnmsg=null;
        returnmsg=await this.#Empobj.getAllDocOfDept(DeptID);
        return returnmsg;
    }

    async detailOfDoc(ID){
        this.#Empobj=new Doctor();
        let returnmsg=null;
        returnmsg=await this.#Empobj.detailOfDoc(ID);
        return returnmsg;
    }

    async loginAdmin(ID,Password){
        let ret;
        ret=await this.#Empobj.loginAdmin(ID,Password);
        return ret;
    }
    
    async loginDoctor(ID,Password){
        let ret;
        ret=await this.#Empobj.loginDoctor(ID,Password);
        return ret;
    }    

    async empDetail(ID){
        let ret;
        ret=await this.#Empobj.empDetail(ID);
        return ret;
    }

    async updateEmployee(EmpId,Name,DOB,Gender,Contact,Job,Salary,Address,Speciality,Password){
        let ret;
        ret=await this.#Empobj.updateEmployee(EmpId,Name,DOB,Gender,Contact,Job,Salary,Address,Speciality,Password);
        return ret;        
    }

    async availableDate(ID){
        this.#Empobj=new Doctor();
        let ret;
        ret=await this.#Empobj.availableDate(ID);
        return ret;
    }

    async doctorTiming(ID){
        let ret;
        this.#Empobj=new Doctor();
        ret=await this.#Empobj.doctorTiming(ID);
        return ret;
    }


 };


class Patient{
    #PHobject;
    #patHistobj;

    constructor(){
        this.#PHobject=PHFactory.getinstance();;
        this.#patHistobj=new PatientHistory();
    }

    async login(ID,Password){
        //console.log(ID+"inside login");
        //console.log(Password+"inside patient login");
        let returnmsg=null;
        let responseFromDB=await this.#PHobject.selectspecificperson(ID);

        
        if(responseFromDB.length==2) { //ID not found
            return {
                          "status":"0",
                           "msg":"ID not found",
                           "ID":"-1",
                           "Password":"-1"
                       }
        } 
        else{
                console.log(responseFromDB);
                
                responseFromDB=JSON.parse(responseFromDB);
                for(let i=0;i<responseFromDB.length;i++){
                    //console.log("inside iteration of loops");
                    let trimID=responseFromDB[i].ID;
                    trimID=trimID.trim();
                    let trimPassword=responseFromDB[i].Password;
                    trimPassword=trimPassword.trim();
                    console.log(trimPassword+"|");

                    // console.log(trimID+"|");
                    // console.log(ID+"|");
                    if(trimID==ID && Password==trimPassword){//Password matched
                        //res.send("Password matched");
                        console.log("Password matched");
                        //returnmsg=[{"status":"1"}];
                        //alp="{\"status\":\"1\",\"msg\":\"Password matched\"}";
                        returnmsg={
                            "status":"1",
                            "msg" :"Password matched",
                            "ID":trimID,
                            "Password":trimPassword
                        };
                        return returnmsg;
                    }
                }
                return {
                        "status":"0",
                        "msg" :"Password not matched",
                        "ID":"-1",
                        "Password":"-1"
                    };
            }

            
    }
        
    async makeRegisteration(Name,Age,Gender,Address,ContactNumber,Password,CNIC){
        console.log(ContactNumber);
        let returnmsg=await this.#PHobject.makeRegisteration(Name,Age,Gender,Address,ContactNumber,Password,CNIC);
        return returnmsg;
    }

    async #fetchPatientDetail(PatID){
        let ret;
        ret=await this.#PHobject.fetchPatientDetail(PatID);
        return ret
    }


    async detailReport(RID){
        let ret1;
        ret1=await this.#patHistobj.detailReport(RID);

        if(ret1.status=="1"){
            let ret2;
            ret2=await this.#fetchPatientDetail(ret1.Data.PatID);
            console.log(ret2);
            return {
                     "status":"1",
                     "BioData":ret2.Data,
                     "Records":ret1.Data
                   };
        }
        else{
            return {
                        "status":ret1.status,
                        "BioData":"-1",
                        "Records":"-1"
                   }
        }
        
    }

    async getMedicalReport(PatID){
        let ret;
        ret=await this.#patHistobj.getMedicalReport(PatID);
        return ret;
    }

    async getPatientDetail(PatID){
        let ret;
        ret=await this.#fetchPatientDetail(PatID);
        return ret;
    }

    async updatePatientHistory(PatID,DocID,Date,Diagnosis,Prescription,Advice,NameOfDoctor)
    {
        let ret;
        ret=await this.#patHistobj.updatePatientHistory(PatID,DocID,Date,Diagnosis,Prescription,Advice,NameOfDoctor);
        return ret;
    }    

    

};


class PatientHistory{
    #patRecobj;
    #PHobject;

    constructor()
    {
        this.#PHobject=PHFactory.getinstance();;
        this.#patRecobj=new PatientRecord();
    }

    async detailReport(RID){
        let ret;
        ret=await this.#patRecobj.detailReport(RID);
        return ret;
    }

    async getMedicalReport(PatID){
        let ret;
        ret=await this.#collectReports(PatID);
        return ret;
    }

    async #collectReports(PatID){
        let ret;
        ret=await this.#PHobject.collectReports(PatID);
        return ret;
    }

    async updatePatientHistory(PatID,DocID,Date,Diagnosis,Prescription,Advice,NameOfDoctor)
    {
        let ret;
        ret=await this.#patRecobj.updatePatientHistory(PatID,DocID,Date,Diagnosis,Prescription,Advice,NameOfDoctor);
        return ret;
    }    
};


class PatientRecord{
    #PHobject;

    constructor(){
        this.#PHobject=PHFactory.getinstance();;
    }

    async detailReport(RID){
        let ret;
        ret=await this.#fetchReportDetail(RID);
        return ret;
    }

    async #fetchReportDetail(RID){
        let ret;
        ret=await this.#PHobject.fetchReport(RID);
        return ret;
    }

    async updatePatientHistory(PatID,DocID,Date,Diagnosis,Prescription,Advice,NameOfDoctor)
    {
        let ret;
        ret=await this.#createPatRecord(PatID,DocID,Date,Diagnosis,Prescription,Advice,NameOfDoctor);
        return ret;
    } 

    async #createPatRecord(PatID,DocID,Date,Diagnosis,Prescription,Advice,NameOfDoctor){
        let ret;
        ret=await this.#PHobject.createPatRecord(PatID,DocID,Date,Diagnosis,Prescription,Advice,NameOfDoctor);
        return ret;
    }
};

class Employee{
    #PHobject;
    

    constructor(){
        this.#PHobject=PHFactory.getinstance();;
    }

    async getAllDocOfDept(DeptID){
        //public function called by other classes.
        //console.log("inside get DEpt");
        let retmsg;
        retmsg=await this.#getDeptDoc(DeptID);
        return retmsg;
    }

    async #getDeptDoc(DeptID){
        let retmsg;
        retmsg=await this.#PHobject.getAllDocOfDept(DeptID);
        return retmsg;
    }

    async loginAdmin(ID,Password){
        let ret;
        ret=await this.#authAdmin(ID,Password);
        return ret;
    }

    async #authAdmin(ID,Password){
        let returnmsg=null;
        let responseFromDB=await this.#PHobject.getAdmin(ID,Password);

        console.log(responseFromDB);
        if(responseFromDB.length==0) { //ID not found
            return {
                          "status":"0",
                           "msg":"ID not found",
                           "ID":"-1",
                           "Password":"-1"
                       }
        } 
        else{
                let trimData=responseFromDB; 
                trimData=JSON.parse(trimData);
                let trimID=trimData.EmpId;
                trimID=trimID.trim();
                let trimPassword=trimData.Password;
                 console.log(trimID+"|");
                 console.log(trimPassword+"|");

                 if(trimID==ID && trimPassword==Password){
                        returnmsg={
                            "status":"1",
                            "msg" :"Password matched",
                            "ID":trimID,
                            "Password":trimPassword
                        };       
                        return returnmsg;              
                    
                 }
                 else{
                    returnmsg={
                        "status":"0",
                        "msg" :"Password not matched",
                        "ID":"-1",
                        "Password":"-1"
                    };       
                    return returnmsg; 

                 }

            }

    }

    async loginDoctor(ID,Password){
        let ret;
        ret=await this.#authDoctor(ID,Password);
        return ret;
    }

    async #authDoctor(ID,Password){
        let returnmsg=null;
        let responseFromDB=await this.#PHobject.getDoctor(ID,Password);

        console.log(responseFromDB);
        if(responseFromDB.length==0) { //ID not found
            return {
                          "status":"0",
                           "msg":"ID not found",
                           "ID":"-1",
                           "Password":"-1"
                       }
        } 
        else{
                let trimData=responseFromDB; 
                trimData=JSON.parse(trimData);
                let trimID=trimData.EmpId;
                trimID=trimID.trim();
                let trimPassword=trimData.Password;
                 console.log(trimID+"|");
                 console.log(trimPassword+"|");

                 if(trimID==ID && trimPassword==Password){
                        returnmsg={
                            "status":"1",
                            "msg" :"Password matched",
                            "ID":trimID,
                            "Password":trimPassword
                        };       
                        return returnmsg;              
                    
                 }
                 else{
                    returnmsg={
                        "status":"0",
                        "msg" :"Password not matched",
                        "ID":"-1",
                        "Password":"-1"
                    };       
                    return returnmsg; 

                 }

            }


    }    
    
    async empDetail(ID){
        let ret;
        ret=await this.#getEmpDetail(ID);
        return ret;
    }

    async #getEmpDetail(ID){
        let ret;
        ret=await this.#PHobject.getEmpDetail(ID);
        return ret;
    }

    async updateEmployee(EmpId,Name,DOB,Gender,Contact,Job,Salary,Address,Speciality,Password){
        let ret;
        ret=await this.#performUpdateEmployee(EmpId,Name,DOB,Gender,Contact,Job,Salary,Address,Speciality,Password);
        return ret;        
    }

    async #performUpdateEmployee(EmpId,Name,DOB,Gender,Contact,Job,Salary,Address,Speciality,Password){
        
        let ret;
        ret=await this.#PHobject.updateEmployee(EmpId,Name,DOB,Gender,Contact,Job,Salary,Address,Speciality,Password);
        return ret;        
    }
};

class Doctor extends Employee{
    #PHobject;
    constructor(){
        super();
        this.#PHobject=PHFactory.getinstance();
    }

    async #getDocDetail(ID){//DB function
        let ret;
        ret=await this.#PHobject.getAllDetailOfDoctor(ID);
        return ret; 
    }

    async detailOfDoc(ID){
        let ret;
        ret=await this.#getDocDetail(ID);
        return ret;
    }

    async availableDate(ID){
        let ret;
        ret=await this.#getAvailableDate(ID);
        return ret;
    }

    async #getAvailableDate(ID){
        let ret;
        ret=await this.#PHobject.getAvailableDate(ID);
        return ret;
    }

    async doctorTiming(ID)
    {
        let ret;
        ret=await this.#getDoctorTiming(ID);
        return ret;
    }

    async #getDoctorTiming(ID){
        let ret;
        ret=await this.#PHobject.getDoctorTiming(ID);
        return ret;
    }

};


 
 module.exports.Patient = Patient;
 module.exports.AppointmentLog= AppointmentLog;
 module.exports.Appointment= Appointment;
 module.exports.Department= Department;
 module.exports.PatientHistory= PatientHistory;
 module.exports.PatientRecord= PatientRecord;
 module.exports.Employee= Employee;
 module.exports.Doctor= Doctor;


 

//  module.exports.favoriteBook = favoriteBook;
//  module.exports.getBookRecommendations = getBookRecommendations;