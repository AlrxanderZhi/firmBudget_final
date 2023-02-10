import {baseURI} from './modules/parameters.js';
import appendNewFlex from './modules/appendNewFlex.js'

let employees,
    id = [],
    firstName = [],
    lastName = [],
    onePayLimit = [],
    dayLimit = [],
    personalId = [],
    deptName = [],
    role = [];

async function loadEmployees() {
    const response = await fetch(`${baseURI}/employee`);
    employees = await response.json();

    for (let i = 0; i < employees.length; i++) {
        id[i] = employees[i]['id'];
        firstName[i] = employees[i]['firstName'];
        lastName[i] = employees[i]['lastName'];
        onePayLimit[i] = employees[i]['onePayLimit'];
        dayLimit[i] = employees[i]['dayLimit'];
        deptName[i] = employees[i]['department']['name'];
        personalId[i] = employees[i]['personalId'];
        role[i] = employees[i]['role'];
    }

    let departmentName = [];
    for (let i = 0; i < employees.length; i++) {
        let space = `    `
        departmentName[i] = deptName[i] + ` department`
            + `\n`
            + `\n`
            + firstName[i] + ' ' + space
            + lastName[i] + '\n'
            + "Personal ID " + personalId[i] + '\n'
            + "ROLE " + role[i].substring(5) + '\n'
            + `\n`
            + `Limit for one payment` + space + onePayLimit[i] + '\n'
            + `Limit for one day` + space + dayLimit[i] + '\n'
            + "ID " + id[i];

    }
    departmentName.forEach(appendNewFlex);
}

window.addEventListener('load', loadEmployees);
