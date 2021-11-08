const fs = require('fs');
class Data{
    constructor(employees, departments){
        this.employees = employees;
        this.departments = departments;
    }
}

let allData = null;

module.exports.intialize = function(){
    return new Promise(function(resolve,reject){
        

        fs.readFile('./data/employees.json',function(err,employeeData){
            if(err){
                reject("Unable to read the contents from employees.json file");
            }
            else{
            fs.readFile('./data/departments.json',function(err,departmentData){
                if(err){
                    reject("Unable to read the contents from departments.json file");
                }
                else{
                        var employeeDataFromFile = JSON.parse(employeeData);
                       var departmentDataFromFile = JSON.parse(departmentData);
                        //console.log(employeeDataFromFile);
                       //resolve(employeeDataFromFile);
                       allData = new Data(employeeDataFromFile,departmentDataFromFile);
                       //console.log(allData);
                       resolve(allData);
                    }
            });
        }
        });
    });
   
}



module.exports.getAllEmployees = function(){
    return new Promise(function(resolve,reject){

       //console.log("the length is" +allData.employees);
        if(allData.employees.length == 0){
          reject("No records found");
        }else
        {
            resolve(allData.employees);
        }
    });

}

module.exports.getManagers = function(){
    return new Promise(function(resolve,reject){
       if(allData.employees.length != 0){
           var arrayNew = [];
          for(var i = 0; i < allData.employees.length; i++){
                if(allData.employees[i].isManager == true){
                    arrayNew.push(allData.employees[i]);
                }
                resolve(arrayNew);
            }
        }else{
            reject("No records found");
        }
    
    });
}

module.exports.getDepartments = function(){
    return new Promise(function(resolve,reject){

       //console.log("the length is" +allData.employees);
        if(allData.departments.length == 0){
          reject("No records found");
        }else
        {
            resolve(allData.departments);
        }
    });

}

module.exports.getEmployeesByDepartment = function(department){
    return new Promise(function(resolve,reject){
        var empArray = [];
        for(var i=0; i<allData.employees.length; i++){
            if(allData.employees[i].department == department){
                empArray.push(allData.employees[i]);
               
            }
           // 
           
        }
        resolve(empArray);
        if(empArray.length == 0){
             reject("no results returned");
        }
           
        
       
    });
}

module.exports.getEmployeeByNum = function(num){
    return new Promise(function(resolve,reject){
        var empVal = "";
        for(var i=0; i<allData.employees.length; i++){
            if(allData.employees[i].employeeNum == num){
               empVal = allData.employees[i].firstName + " " + allData.employees[i].lastName;
               
            //}
           // if(empVal!= 0){
           
                   
                }
          
              
        }
        resolve(empVal);
       
           if(empVal == ""){
               reject("no records returned")
           }
    });
}

module.exports.addEmployee = function(employeeData){
    return new Promise(function(resolve,reject){
        if(employeeData.length != 0){
            if(!employeeData.isManager){
                employeeData.isManager = false;
            }
            else{
                employeeData.isManager = true;
            }
            employeeData.employeeNum = allData.employees.length + 1;
            allData.employees.push(employeeData);
            resolve(allData.employees);
        }else{
            reject("no new records added");
        }

        
    });
}