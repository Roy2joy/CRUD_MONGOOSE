const { json } = require('body-parser');
const { Pool } = require('pg');   //for postgres
// require('dotenv/config');



class PersistenceHandler{
    constructor(){
        if(this.constructor==PersistenceHandler){
            throw new Error("Abstract class can't be intantiated");
        }
    }

    async selectAllFromPatient(){ //return stringify of all values(JSON)
            throw new Error("Not implemented in drived classes");
    }


    async selectspecificperson(ID){ //return stringify of all values(JSON)
        throw new Error("Not implemented in drived classes");
    }

    async validateCNIC(CNIC){
        throw new Error("Not implemented in drived classes");
    }

    async makeRegisteration(Name,Age,Gender,Address,ContactNumber,Password,CNIC){
        throw new Error("Not implemented in drived classes");
    }

    async getAllDept(){
        throw new Error("Not implemented in drived classes");         
    }

    async getAllDocOfDept(DeptID){
        throw new Error("Not implemented in drived classes");      
    }

    async getAllDetailOfDoctor(ID){
        throw new Error("Not implemented in drived classes");
    }

    async getAdmin(ID,Password){
        throw new Error("Not implemented in drived classes");
    }

    async getDoctor(ID,Password){
        throw new Error("Not implemented in drived classes");
    }    

    async getEmpDetail(ID){
        throw new Error("Not implemented in drived classes");       
    }

    async updateEmployee(EmpId,Name,DOB,Gender,Contact,Job,Salary,Address,Speciality,Password){
        throw new Error("Not implemented in drived classes");
    }

    async getAvailableDate(ID){
        throw new Error("Not implemented in drived classes");

    }

    async getDoctorTiming(ID){
        throw new Error("Not implemented in drived classes");
    }

    async countReservedSlot(ID,Date){ //YYYY_MM_DD
        throw new Error("Not implemented in drived classes");
    }

    async deactivateAppointment(AppID){
        throw new Error("Not implemented in drived classes");
    }

    async allocateAppointment(DocID,PatID,Date,Time){
        throw new Error("Not implemented in drived classes");
    }

    async activateAppointment(AppID,Amount){
        throw new Error("Not implemented in drived classes");      
    }

    async selectDoctorAppointment(DocID,Date){
        throw new Error("Not implemented in drived classes");
    }

    async fetchPatientDetail(PatID){
        throw new Error("Not implemented in drived classes"); 

    }

    async fetchReport(RID){
        throw new Error("Not implemented in drived classes");     

    }

    async collectReports(PatID){
        throw new Error("Not implemented in drived classes");
    }    
    
};


class FileHandler extends PersistenceHandler{
    constructor(){
        super();
    }

    async selectAllFromPatient(){ //return stringify of all values(JSON)
          
    }


    async selectspecificperson(ID){ //return stringify of all values(JSON)
       
    }

    async validateCNIC(CNIC){
      
    }

    async makeRegisteration(Name,Age,Gender,Address,ContactNumber,Password,CNIC){
       
    }

    async getAllDept(){
              
    }

    async getAllDocOfDept(DeptID){
      
    }

    async getAllDetailOfDoctor(ID){
       
    }

    async getAdmin(ID,Password){
        
    }

    async getDoctor(ID,Password){
        
    }    

    async getEmpDetail(ID){
        
    }

    async updateEmployee(EmpId,Name,DOB,Gender,Contact,Job,Salary,Address,Speciality,Password){
       
    }

    async getAvailableDate(ID){
        

    }

    async getDoctorTiming(ID){
       
    }

    async countReservedSlot(ID,Date){ //YYYY_MM_DD
        
    }

    async deactivateAppointment(AppID){
       
    }

    async allocateAppointment(DocID,PatID,Date,Time){
        
    }

    async activateAppointment(AppID,Amount){
            
    }

    async selectDoctorAppointment(DocID,Date){
       
    }

    async fetchPatientDetail(PatID){
       

    }

    async fetchReport(RID){
        

    }

    async collectReports(PatID){
        
    }    
    
};

class DBcontroller extends PersistenceHandler{
   
    #pool=null; 
    #connector
    #Databaseconfig={
        "user": 'Hospital_Admin',
        "host": 'localhost',
        "database": 'HospitalDB',
        "password": '123',
        "port": 5432  
    };

    constructor(){
        //this.#returnvalue= null;
        super();
        this.#pool= new Pool(this.#Databaseconfig);
        console.log("DBcontroller constructor called testing for singelton");
    }

    async connectionEstablish(){
        if(this.#connector==null){
            this.#connector=await this.#pool.connect();
        }
    }

    async selectAllFromPatient(){ //return stringify of all values(JSON)
        let p;
        let b_sync=await (async () => {
                            //const client = await this.#pool.connect();
                            await this.connectionEstablish();
                            const query = "SELECT * FROM \"Patient\"";
                        
                            //const cursor 
                            p= await this.#connector.query(query);
                            
                          })();
        //console.log(p)
        return JSON.stringify(p.rows); 
    }

    async selectspecificperson(ID){ //return stringify of all values(JSON)
        let p;
        if(typeof(ID)!="string") throw new Error("alpha error");
        let b_sync=await (async () => {
                            //const client = await this.#pool.connect();
                            
                            const query = "SELECT * FROM public.\"Patient\" where \"ID\"=\'"+ID+"\'" ;
                            //console.log(query);
                            //const cursor 
                            await this.connectionEstablish();
                            p= await this.#connector.query(query);
                            //console.log("ok till now \n")
                          })();
        //console.log(p)
        let tret=JSON.stringify(p.rows); ;
        //tret=tret.slice(1,-1);
        return tret;
    }

    async validateCNIC(CNIC){
        //true if person is already registered.
        let returnmsg={stauts:1,nextID:1};
        let arr=await this.selectAllFromPatient();
        arr=JSON.parse(arr);
        
        // console.log(CNIC);  //for debugging
        // console.log(arr);
    
        for(let i=0;i<arr.length;i++){
            // console.log(CNIC);
            // console.log(arr[i].ID);
            if(CNIC==arr[i].CNIC){
                // console.log("ID matched");
                returnmsg={status: 0 ,  nextID:-1};
                break;
                
            }
            else{
                
                // console.log("ID not matched");;
                var numericString=arr[i].ID;
                numericString=numericString.substring(1);
                // console.log(numericString);
                numericString=(parseInt(numericString)+1);
                numericString=numericString;
                returnmsg={status:1,nextID:(numericString)}
            }
        }
        return returnmsg;
    }

    async makeRegisteration(Name,Age,Gender,Address,ContactNumber,Password,CNIC){
        
        let nextID;
        let validCNIC= await this.validateCNIC(CNIC);//check if person is already registered with such CNIC
        
        
        //nextID=validCNIC.nextID.toString(10/*base*/); //convert number to string
        nextID="P"+validCNIC.nextID;
        validCNIC=validCNIC.status;
        //console.log(nextID);
        
        if(validCNIC==0){
            //retur Json contain already registered msg.
            return {"status":"0","msg":"already registered with this CNIC","ID":"-1","Password":"-1"};
        }
        else{ 
            //call validate CNIC for 
            //
            // console.log(validCNIC);
            // console.log(nextID);
            
            let querystring="INSERT INTO public.\"Patient\"(\"ID\",\"Name\",\"Password\",\"Age\",\"Address\",\"Gender\",\"ContactNumber\",\"CNIC\") VALUES(\'"+nextID+"\',\'"+Name+"\'::text, \'"+Password+"\', \'"+Age+"\'::numeric, \'"+Address+"\'::text, \'"+Gender+"\', \'"+ContactNumber+"\'::numeric,\'"+CNIC+"\' ::text) returning \"Password\";"
            let retPassword;
            let b_sync=await (async () => {
                await this.connectionEstablish();
                // const client = await this.#pool.connect();
                
                //const query = "SELECT * FROM public.\"people\" where \"Name\"=\'"+name+"\'" ;
                //console.log(query);
                //const cursor 
                let temp= await this.#connector.query(querystring);
                console.log(temp.rows[0].Password);
                
                retPassword=temp.rows[0].Password;
                //console.log("ok till now \n")
                
            })();
    
            return {"status":"1","msg":"Registerd with ID:"+nextID,"ID":nextID,"Password":retPassword};

        }
    }

    async getAllDept(){
        let p;
        let b_sync=await (async () => {
                            await this.connectionEstablish();
                            const query = "SELECT * FROM \"Dept\" where \"Dept\".\"DeptID\"!=\'M1\'";
                        
                            //const cursor 
                            
                            p= await this.#connector.query(query);
                            
                          })();
        //console.log(p)
        return JSON.stringify(p.rows);         
    }

    async getAllDocOfDept(DeptID){
        let p;
        let b_sync=await (async () => {
                            await this.connectionEstablish();
                            //const client = await this.#pool.connect();
                            const query = "SELECT \"Employee\".\"EmpId\",\"Employee\".\"Name\",\"Employee\".\"Speciality\" FROM \"Employee\" inner join \"Doctor\" on \"Employee\".\"EmpId\"=\"Doctor\".\"DocID\" where \"Employee\".\"DeptID\"=\'"+DeptID+"\'";
                            //const cursor 
                            p= await this.#connector.query(query);
                            
                          })();
        //console.log(p)
        return JSON.stringify(p.rows);        
    }

    async getAllDetailOfDoctor(ID){
            let p;
            let b_sync=await (async () => {
                                await this.connectionEstablish();
                                //const client = await this.#pool.connect();
                                const query = "SELECT * FROM \"Doctor\" where \"Doctor\".\"DocID\"=\'"+ID+"\'";
                            
                                //const cursor 
                                p= await this.#connector.query(query);
                                
                              })();
            //console.log(p)
            let ret=JSON.stringify(p.rows); 
            console.log('\ntesting of get all doc\n'+ret+'\n');
            ret=ret.slice(1,-1);
            ret=JSON.parse(ret);
            delete ret.EmpId;
            return ret;

    }

    async getAdmin(ID,Password){
        let p;
        let b_sync=await (async () => {
                            //const client = await this.#pool.connect();
                            await this.connectionEstablish();
                            const query = "Select \"Employee\".\"EmpId\" , \"Employee\".\"Password\" from \"Employee\" where \"Employee\".\"Job\"=\'ADMIN\' and \"Employee\".\"EmpId\"=\'"+ID+"\'"; 
                            //console.log(query);
                            //const cursor 
                            p= await this.#connector.query(query);
                            //console.log("ok till now \n")
                          })();
        //console.log(p)
        let tret=JSON.stringify(p.rows); ;
        tret=tret.slice(1,-1);
        return tret;

    }

    async getDoctor(ID,Password){
        let p;
        let b_sync=await (async () => {
                            //const client = await this.#pool.connect();
                            await this.connectionEstablish();
                            const query = "Select \"Employee\".\"EmpId\" , \"Employee\".\"Password\" from \"Employee\" where \"Employee\".\"Job\"=\'DOCTOR\' and \"Employee\".\"EmpId\"=\'"+ID+"\'"; 
                            //console.log(query);
                            //const cursor 
                            p= await this.#connector.query(query);
                            //console.log("ok till now \n")
                          })();
        //console.log(p)
        let tret=JSON.stringify(p.rows); ;
        tret=tret.slice(1,-1);
        return tret;
    }    

    async getEmpDetail(ID){
        let p;
        let b_sync=await (async () => {
                            //const client = await this.#pool.connect();
                            await this.connectionEstablish();
                            const query = "Select \"Employee\".\"Name\" , \"Employee\".\"DOB\",\"Employee\".\"Gender\",\"Employee\".\"Contact\",\"Employee\".\"Job\",\"Employee\".\"Salary\",\"Employee\".\"Address\",\"Employee\".\"Speciality\",\"Employee\".\"Password\" from \"Employee\" where  \"Employee\".\"EmpId\"=\'"+ID+"\'"; 
                            //console.log(query);
                            //const cursor 
                            p= await this.#connector.query(query);
                            //console.log("ok till now \n")
                          })();
        //console.log(p)
        let tret=JSON.stringify(p.rows); ;
        //tret=tret.slice(1,-1);
        return tret;        
    }

    async updateEmployee(EmpId,Name,DOB,Gender,Contact,Job,Salary,Address,Speciality,Password){
        // console.log("inside updateEmploy");
        try {
            let p;
            let b_sync=await (async () => {
                                //const client = await this.#pool.connect();
                                await this.connectionEstablish();
                                const query = "UPDATE public.\"Employee\" SET \"Gender\" = \'"+Gender+"\', \"Contact\" = \'"+Contact+"\', \"Job\" = \'"+Job+"\', \"Salary\" = \'"+Salary+"\', \"Address\" = \'"+Address+"\', \"Speciality\" = \'"+Speciality+"\', \"DOB\" = \'"+DOB+"\', \"Name\" = \'"+Name+"\', \"Password\" = \'"+Password+"\'   WHERE \"EmpId\" = \'"+EmpId+"\'";
                                //console.log(query);
                                //const cursor 
                                p= await this.#connector.query(query);
                                //console.log("ok till now \n")
                              })();
            //console.log(p)
            //let tret=JSON.stringify(p.rows); ;
            //tret=tret.slice(1,-1);
            return {"status":"1","msg":"Successfully updated"};              
            
        } catch (error) {
            return {"status":"0","msg":"Error check your values"};
        }
    }

    async getAvailableDate(ID){
        try {
            let p;
            let b_sync=await (async () => {
                                //const client = await this.#pool.connect();
                                await this.connectionEstablish();
                                const query = "select \"ActiveDay\" from \"Doctor\" where \"DocID\"=\'"+ID+"\'";
                                //console.log(query);
                                //const cursor 
                                p= await this.#connector.query(query);
                                //console.log("ok till now \n")
                              })();
            
            let tret=JSON.stringify(p.rows); ;
            tret=tret.slice(1,-1);
            tret=JSON.parse(tret);
            //console.log(tret);
            tret={"status":"1","Date":tret.ActiveDay}  
            tret=JSON.stringify(tret);
            return tret;              
            
        } catch (error) {
            let ret1={"status":"0","Date":"Error"};
            ret1=JSON.stringify(ret1);
            return ret1; 
        }

    }

    async getDoctorTiming(ID){
        try {
            let p;
            let b_sync=await (async () => {
                                //const client = await this.#pool.connect();
                                await this.connectionEstablish();
                                const query = "select \"Timing\",\"AppSlot\" from \"Doctor\" where \"DocID\"=\'"+ID+"\'";  
                                //console.log(query);
                                //const cursor 
                                p= await this.#connector.query(query);
                                //console.log("ok till now \n")
                              })();
            // console.log(p.rows);

            let tret=JSON.stringify(p.rows); ;
            tret=tret.slice(1,-1);
             tret=JSON.parse(tret);
            // //console.log(tret);
            // tret={"status":"1","Date":tret.ActiveDay}  
            // tret=JSON.stringify(tret);
            // console.log(tret.Timing);
             return tret;              
            
        } catch (error) {
            // let ret1={"status":"0","Date":"Error"};
            // ret1=JSON.stringify(ret1);
            // return ret1; 
        }


    }

    async countReservedSlot(ID,Date){ //YYYY_MM_DD
        try {
            let p;
            let b_sync=await (async () => {
                                //const client = await this.#pool.connect();
                                await this.connectionEstablish();
                                const query = "select count(*) from \"App_Log\" where \"Date\"=\'"+Date+"\' and \"DocID\"=\'"+ID+"\' and \"Status\"=true ";
                                //console.log(query);
                                //const cursor 
                                p= await this.#connector.query(query);
                                //console.log("ok till now \n")
                              })();
            //console.log(p);

             let tret=JSON.stringify(p.rows); ;
             tret=tret.slice(1,-1);
              tret=JSON.parse(tret);

              return tret;              
            
        } catch (error) {
            throw new error("error");
            // let ret1={"status":"0","Date":"Error"};
            // ret1=JSON.stringify(ret1);
            // return ret1; 
        }        
    }

    async deactivateAppointment(AppID){

        try {
            let p;
            let b_sync=await (async () => {
                                //const client = await this.#pool.connect();
                                await this.connectionEstablish();
                                const query = "UPDATE public.\"App_Log\" SET \"Status\" = false WHERE \"AppID\" = "+AppID;
                                //console.log(query);
                                //const cursor 
                                p= await this.#connector.query(query);
                                //console.log("ok till now \n")
                              })();
            //console.log(p);

            //  let tret=JSON.stringify(p.rows); ;
            //  tret=tret.slice(1,-1);
            //   tret=JSON.parse(tret);

              return {"Status":"1" ,"msg":"Appointment deactivate" ,"AppID":AppID};              
            
        } catch (error) {
        //     throw new error("error");
        //     // let ret1={"status":"0","Date":"Error"};
        //     // ret1=JSON.stringify(ret1);
        //     // return ret1; 
        }            
        
        
    }

    async allocateAppointment(DocID,PatID,Date,Time){
        let Fee;
        try {
            try {
                    let p;
                    let b_sync=await (async () => {
                                        //const client = await this.#pool.connect();
                                        await this.connectionEstablish();
                                        const query = "select \"CheckupFee\" from \"Doctor\" where \"DocID\"=\'"+DocID+"\'";
                                        //console.log(query);
                                        //const cursor 
                                        p= await this.#connector.query(query);
                                        //console.log("ok till now \n")
                                    })();
                    //console.log(p);
        
                    let tret=JSON.stringify(p.rows);
                    tret=tret.slice(1,-1);
                    tret=JSON.parse(tret);
                    Fee=tret.CheckupFee;
                    Fee=parseFloat(Fee);
                    //console.log(Fee);
                    // return tret;                
                
            } catch (error) {
                
            }
            let p;
            let b_sync=await (async () => {
                                //const client = await this.#pool.connect();
                                await this.connectionEstablish();
                                const query = "INSERT INTO public.\"App_Log\" (\"Date\", \"Time\", \"PatID\", \"DocID\", \"Status\", \"FeeBalance\") VALUES (\'"+Date+"\', \'"+Time+"\', \'"+PatID+"\', \'"+DocID+"\', false, \'"+Fee+"\') returning \"AppID\",\"FeeBalance\"";
                                //console.log(query);
                                //const cursor 
                                p= await this.#connector.query(query);
                                //console.log("ok till now \n")
                              })();
            console.log(p);

             let tret=JSON.stringify(p.rows);
             tret=tret.slice(1,-1);
              tret=JSON.parse(tret);

              return tret;              
            
        } catch (error) {
            console.log(DocID+","+PatID+","+Date+","+Time);
            throw new error("error");
            // let ret1={"status":"0","Date":"Error"};
            // ret1=JSON.stringify(ret1);
            // return ret1; 
        }         
    }

    async activateAppointment(AppID,Amount){
        console.log(AppID);
        console.log("inside");
        console.log(Amount);

        try {
            let p;
            let b_sync=await (async () => {
                                //const client = await this.#pool.connect();
                                await this.connectionEstablish();
                                const query = "UPDATE public.\"App_Log\" SET \"Status\" =true, \"FeeBalance\"=\'"+Amount+"\' WHERE \"AppID\" = "+AppID+" returning \"AppID\",\"FeeBalance\"";
                                //console.log(query);
                                //const cursor 
                                p= await this.#connector.query(query);
                                //console.log("ok till now \n")
                              })();
            //console.log(p);

             let tret=JSON.stringify(p.rows); ;
             tret=tret.slice(1,-1);
              tret=JSON.parse(tret);

              return tret;              
            
        } catch (error) {
        //     throw new error("error");
        //     // let ret1={"status":"0","Date":"Error"};
        //     // ret1=JSON.stringify(ret1);
        //     // return ret1; 
        }         
    }

    async selectDoctorAppointment(DocID,Date){
        try {
            let p;
            let b_sync=await (async () => {
                                //const client = await this.#pool.connect();
                                await this.connectionEstablish();
                                const query = "select * from \"App_Log\" where \"Status\"="+true+" and \"DocID\"=\'"+DocID+"\' and \"Date\" like \'"+Date+"\';";
                                //console.log(query);
                                //const cursor 
                                p= await this.#connector.query(query);
                                //console.log("ok till now \n")
                              })();
            //console.log(p);

             let tret=JSON.stringify(p.rows); ;
            //  tret=tret.slice(1,-1);
             if(tret.length==2) {return {"status":"1","msg":"No Records","Data":"-1"} }
            // console.log(tret)
            tret=JSON.parse(tret);
            // console.log(tret);
            return {"status":"1","msg":"Record Found","Data":tret}
            return tret;              
            
        } catch (error) {
            return {"status":"0","msg":"Error","Data":"-1"}
          //  console.log("Error");
        //    throw new error("error");
        //     // let ret1={"status":"0","Date":"Error"};
        //     // ret1=JSON.stringify(ret1);
        //     // return ret1; 
        }         

    }

    async fetchPatientDetail(PatID){
        try {
            let p;
            let b_sync=await (async () => {
                                //const client = await this.#pool.connect();
                                await this.connectionEstablish();
                                const query = "Select \"Name\",\"Age\",\"Gender\",\"ContactNumber\" from \"Patient\" where \"ID\"=\'"+PatID+"\'"; 
                                //console.log(query);
                                //const cursor 
                                p= await this.#connector.query(query);
                                //console.log("ok till now \n")
                              })();
            //console.log(p);

              let tret=JSON.stringify(p.rows); ;
              tret=tret.slice(1,-1);
              //if(tret.length==0){ return {"status":"0","Name":"-1","Age":"-1","Gender":"-1","ContactNumber":"-1"}; }
              if(tret.length==0){ return {"status":"0","Data":"-1"}; }
              tret=JSON.parse(tret);
              //return {"status":"1","Name":tret.Name,"Age":tret.Age,"Gender":tret.Gender,"ContactNumber":tret.ContactNumber};
              return {"status":"1","Data":tret};
            
              
            
        } catch (error) {
            //return {"status":"-1","Name":"-1","Age":"-1","Gender":"-1","ContactNumber":"-1"}
            return {"status":"-1","Data":"-1"}
            //throw new error("error");
            // let ret1={"status":"0","Date":"Error"};
            // ret1=JSON.stringify(ret1);
            // return ret1; 
       }        

    }

    async fetchReport(RID){
        console.log(RID+"inside through DB controller");
        try {
            let p;
            let b_sync=await (async () => {
                                //const client = await this.#pool.connect();
                                await this.connectionEstablish();
                                const query = "select * from \"PatientRecord\" where \"RepID\"=\'"+RID+"\';"; 
                                //console.log(query);
                                //const cursor 
                                p= await this.#connector.query(query);
                                //console.log("ok till now \n")
                              })();
            //console.log(p);

              let tret=JSON.stringify(p.rows); 
              tret=tret.slice(1,-1);

              if(tret.length==0){ //no record
                return {
                            "status":"0",
                            "msg":"record not found",
                            "Data":"-1"


                       }
              }
              else{//no record
                tret=JSON.parse(tret);
                // console.log(tret);
                return {
                            "status":"1",
                            "msg":"record found",
                            "Data":tret
                       }
              }

            //   tret=JSON.parse(tret);
            //   return {"status":"1","Name":tret.Name,"Age":tret.Age,"Gender":tret.Gender,"ContactNumber":tret.ContactNumber};
            
              
            
        } catch (error) {
            return {
                "status":"-1",
                "msg":"Error",
                "Data":"-1"
            }
            //throw new error("error");
            // let ret1={"status":"0","Date":"Error"};
            // ret1=JSON.stringify(ret1);
            // return ret1; 
       }        

    }

    async collectReports(PatID){
        try {
            let p;
            let b_sync=await (async () => {
                                //const client = await this.#pool.connect();
                                await this.connectionEstablish();
                                const query = "select \"RepID\",\"Date\",\"ExaminedBy\" from \"PatientRecord\" where \"PatID\"=\'"+PatID+"\' ";
                                //console.log(query);
                                //const cursor 
                                p= await this.#connector.query(query);
                                //console.log("ok till now \n")
                              })();
            //console.log(p);

              let tret=JSON.stringify(p.rows); ;
              
              //tret=tret.slice(1,-1);
              //if(tret.length==0){ return {"status":"0","Name":"-1","Age":"-1","Gender":"-1","ContactNumber":"-1"}; }
              if(tret.length<=2){ return {"status":"0","msg":"Empty","Data":"-1"};   }//empty

                tret=JSON.parse(tret);
              //return {"status":"1","Name":tret.Name,"Age":tret.Age,"Gender":tret.Gender,"ContactNumber":tret.ContactNumber};
              return {"status":"1","msg":"Records Fetched","Data":tret};
            
              
            
        } catch (error) {
            //return {"status":"-1","Name":"-1","Age":"-1","Gender":"-1","ContactNumber":"-1"}
            return {"status":"-1","msg":"Error","Data":"-1"}
            //throw new error("error");
            // let ret1={"status":"0","Date":"Error"};
            // ret1=JSON.stringify(ret1);
            // return ret1; 
       }
    }

    async createPatRecord(PatID,DocID,Date,Diagnosis,Prescription,Advice,NameOfDoctor){
        console.log(PatID);
        console.log(DocID);
        console.log(Date);
        console.log(Diagnosis);
        console.log(Prescription);
        console.log(Advice);
        console.log(NameOfDoctor);

        try {
            let p;
            let b_sync=await (async () => {
                                //const client = await this.#pool.connect();
                                await this.connectionEstablish();
                                const query = "INSERT INTO public.\"PatientRecord\" (\"PatID\", \"DocID\", \"ExaminedBy\", \"Date\", \"Diagnosis\", \"Prescription\", \"Advice\") VALUES (\'"+PatID+"\', \'"+DocID+"\', \'"+NameOfDoctor+"\', \'"+Date+"\', \'"+Diagnosis+"\', \'"+Prescription+"\', \'"+Advice+"\') returning \"RepID\"";
                                //console.log(query);
                                //const cursor 
                                p= await this.#connector.query(query);
                                //console.log("ok till now \n")
                              })();
            //console.log(p);

              let tret=JSON.stringify(p.rows); ;
              
              tret=tret.slice(1,-1);
              //if(tret.length==0){ return {"status":"0","Name":"-1","Age":"-1","Gender":"-1","ContactNumber":"-1"}; }
              if(tret.length==0){ return {"status":"0","msg":"Not entered","Data":tret};   }//empty

                tret=JSON.parse(tret);
              //return {"status":"1","Name":tret.Name,"Age":tret.Age,"Gender":tret.Gender,"ContactNumber":tret.ContactNumber};
              return {"status":"1","msg":"Records Fetched","Data":tret};
            
              
            
        } catch (error) {
            //return {"status":"-1","Name":"-1","Age":"-1","Gender":"-1","ContactNumber":"-1"}
            return {"status":"-1","msg":"Error","Data":"-1"}
            //throw new error("error");
            // let ret1={"status":"0","Date":"Error"};
            // ret1=JSON.stringify(ret1);
            // return ret1; 
       }        
        return "inside createRecord";
    }    
 };//end of DBcontroller class



 module.exports.PersistenceHandler = PersistenceHandler;
 module.exports.DBcontroller = DBcontroller;
 module.exports.FileHandler = FileHandler;