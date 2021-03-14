const fs = require('fs');

class Patient{
    constructor(name, address, visit , doctor){
        this.name = name;
        this.address = address;
        this.visit = visit;
        this.doctor = doctor;
    }    
}

// add patient
const addPatient = (name, address = 'Homeless', visit = 'Knee injury' , doctor = 'Rivera') =>{
    const listPatients = loadPatients();

    const duplicate = listPatients.find((item)=>{
        return item.name === name;
    })

   if(!duplicate){
        listPatients.push(new Patient(name, address, visit, doctor));

        saveList(listPatients);
   } else {
       console.log('Patient already exists');
   }
}

// reads a patient searched for his name
const readPatient = (name) =>{
    const listPatients = loadPatients();

    const duplicate = listPatients.find((item)=>{
        return item.name === name;
    })

    if(duplicate){
        return duplicate;
    } else {
        console.log('Patient not found');
    }
}

// list all the patients
const listPatients = () =>{
    return loadPatients();
}

// remove patient from list
const removePatient = (name) =>{
    const listPatients = loadPatients();

    const toKeep = listPatients.filter((item)=>{
        return item.name !== name;
    })

    if(toKeep.length === listPatients){
        console.log('patient not found'); 
    } else {
        saveList(toKeep);
    }
}

// save list of patients
const saveList = (array) =>{
    fs.writeFileSync('patients.json',JSON.stringify(array));
}

// load list of patients / returns empty list in case of not founding any
const loadPatients = () =>{
    try{
        return JSON.parse(fs.readFileSync('patients.json').toString())
    } 
    catch(e) {
        return [];
    }
}

module.exports = {
    add: addPatient,
    read: readPatient,
    list: listPatients,
    remove: removePatient
}