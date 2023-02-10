import {baseURI, doc} from './modules/parameters.js';
import appendNewFlex from './modules/appendNewFlex.js';
import addScript from './modules/addScript.js';

(async function getData() {
    const responseEmpl = await fetch(`${baseURI}/employee`);
    let employees = await responseEmpl.json();

    for (let i = 0; i < employees.length; i++) {
        if (localStorage.getItem('login') === employees[i]['username']) {
            localStorage.setItem('employeeId', employees[i]['id']);
            localStorage.setItem('personalId', employees[i]['personalId']);
            localStorage.setItem('departmentId', employees[i]['department']['id']);
            localStorage.setItem('nameOfDepartment', employees[i]['department']['name']);
            return;
        }
    }
})();

let departments,
    deptName = [],
    balance = [],
    departDayLimit = [],
    departOnePayLimit = [],
    departDateLimit = [],
    departDate = [];

async function loadDepts() {
    const responseDept = await fetch(`${baseURI}/dept`);

    departments = await responseDept.json();
    for (let i = 0; i < departments.length; i++) {
        deptName[i] = departments[i]['name'];
        balance[i] = departments[i]['balance'];
        departDayLimit[i] = departments[i]['departDayLimit'];
        departOnePayLimit[i] = departments[i]['departOnePayLimit'];
        departDateLimit[i] = departments[i]['departDateLimit'];
        departDate[i] = departments[i]['departDate'];
    }

    (function () {
        let header = doc.getElementById("header");

        let i = 1;
        while (i < departments.length + 1) {
            let div = doc.createElement("div");
            let hyperlink = doc.createElement("a");
            hyperlink.href = "dept/" + i;
            let content = doc.createTextNode(deptName[i - 1]);
            hyperlink.appendChild(content);
            div.appendChild(hyperlink);
            hyperlink.setAttribute("class", "deptName");
            header.appendChild(div);
            i++;
        }
    })();

    // Insert data from json into Flexbox
    let departmentName = [];
    for (let i = 0; i < departments.length; i++) {
        let space = `          `
        departmentName[i] = deptName[i]
            + `\n`
            + `\n`
            + `\n`
            + `Balance` + space + balance[i] + `\n`
            + `Department limit per day` + space + departDayLimit[i] + '\n'
            + `Department limit for one payment` + space + departOnePayLimit[i] + '\n'
            + `Department day limit` + space + departDateLimit[i] + ` for ` + departDate[i];
    }
    departmentName.forEach(appendNewFlex);

    let userObj,
        role;
    await (async function getUser() {
        const responseUser = await fetch('http://localhost:8080/user');
        userObj = await responseUser.json();

        role = userObj['authorities'][0]['authority'];
        localStorage.setItem('role', role);
    })();
}

window.addEventListener('load', loadDepts);

//--------------------------------------------------------fulfil scripts one by one

setTimeout(addScript, 200, "../js/getLoginAndRole.js", 1);
