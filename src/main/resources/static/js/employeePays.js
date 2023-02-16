import checkForForbidden from './modules/checkForForbidden.js';
import check from './modules/check.js';
import {baseURI, csrfToken, doc} from './modules/parameters.js';

checkForForbidden();

//--------------------------------------------------------insert/update data in the employee fields
const emplIdField = doc.getElementById('emplId');
const emplDeptNameField = doc.getElementById('emplDeptName');
const emplFirstNameField = doc.getElementById('firstName');
const emplLastNameField = doc.getElementById('lastName');
const emplOnePayLimitField = doc.getElementById('emplOnePayLimit');
const emplDayLimitField = doc.getElementById('emplDayLimit');
const emplBalanceField = doc.getElementById('emplBalance');

let employees,
    emplFirstName,
    emplLastName,
    emplDeptName,
    emplOnePayLimit,
    emplDayLimit,
    emplBalance,
    date,
    currDate;

(async function insertEmplData() {
    const responseEmpl = await fetch(`${baseURI}/employee`);

    currDate = new Date().toISOString().substring(8, 10);
    console.log(currDate);

    employees = await responseEmpl.json();
    for (let i = 0; i < employees.length; i++) {
        if (employees[i]['id'] == localStorage.getItem('employeeId')) {
            emplFirstName = employees[i]['firstName'];
            emplLastName = employees[i]['lastName'];
            emplDeptName = employees[i]['department']['name'];
            emplOnePayLimit = employees[i]['onePayLimit'];
            emplDayLimit = employees[i]['dayLimit'];
            date = employees[i]['date'];
            if (currDate !== date.substring(8, 10)) {
                emplBalance = emplDayLimit
            } else {
                emplBalance = employees[i]['balance'];
            }
        }
    }

    emplIdField.value = localStorage.getItem('employeeId');
    emplFirstNameField.value = emplFirstName;
    emplLastNameField.value = emplLastName;
    emplDeptNameField.value = emplDeptName;
    emplOnePayLimitField.value = emplOnePayLimit;
    emplDayLimitField.value = emplDayLimit;
    emplBalanceField.value = emplBalance;
})();

//---------------------------------------------------------employee pays
async function employeePays() {
    let employeeId = doc.getElementById('emplId').value;

    const requestDpt = await fetch(`${baseURI}/employee/${employeeId}`);
    employees = await requestDpt.json();

    let emplId = employees['id'];
    let emplFirstName = employees['firstName'];
    let emplLastName = employees['lastName'];
    let emplOnePayLimit = employees['onePayLimit'];
    let emplDayLimit = employees['dayLimit'];
    let balance = emplBalance;

    let deptId = employees['department']['id'];
    let deptName = employees['department']['name'];
    let deptBalance = employees['department']['balance'];
    let deptDayLimit = employees['department']['departDayLimit'];
    let deptOnePayLimit = employees['department']['departOnePayLimit'];
    let deptDateLimit = employees['department']['departDateLimit'];
    let deptDate = employees['department']['departDate'];

    function compareValues(x, y, z) {
        if (y - x < 0) {
            alert(z);
            return false;
        }
    }

    let emplPays = doc.getElementById('emplPays').value;

    if (compareValues(emplPays, emplOnePayLimit, 'exceeding your one pay limit!!!') === false) {
        return;
    }

    if (compareValues(emplPays, emplDayLimit, 'exceeding your day limit!!!') === false) {
        return;
    }
    if (compareValues(emplPays, balance, 'exceeding your balance!!!') === false) {
        return;
    }

    if (compareValues(emplPays, deptDayLimit, 'exceeding department day limit!!!') === false) {
        return;
    }

    if (compareValues(emplPays, deptOnePayLimit, 'exceeding department one pay limit!!!') === false) {
        return;
    }

    if (compareValues(emplPays, deptBalance, 'not enough money on department account!!!') === false) {
        return;
    }

    deptDate = new Date(deptDate).setHours(0, 0, 0, 0);
    let now = new Date().setHours(0, 0, 0, 0);
    if (deptDate === now && compareValues(emplPays, deptDateLimit, 'exceeding department limit for today!!!') === false) {
        return;
    }


    if (currDate !== date.substring(8, 10)) {
        deptBalance = deptDayLimit
    } else {
        deptBalance = deptBalance - emplPays;
    }

    const deptNewData = {
        name: deptName,
        balance: deptBalance,
        departDayLimit: deptDayLimit,
        departOnePayLimit: deptOnePayLimit,
        departDateLimit: deptDateLimit,
        departDate: new Date(deptDate).toJSON()
    };

    await fetch(`${baseURI}/dept/${deptId}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'X-XSRF-TOKEN': csrfToken
        },
        body: JSON.stringify(deptNewData)
    });

    let currBalance = balance - emplPays;
    const emplNewData = {
        firstName: emplFirstName,
        lastName: emplLastName,
        onePayLimit: emplOnePayLimit,
        dayLimit: emplDayLimit,
        personalId: employeeId,
        balance: currBalance,
        date: new Date().toISOString(),
    };

    let responseEmpl = await fetch(`${baseURI}/employee/${emplId}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'X-XSRF-TOKEN': csrfToken
        },
        body: JSON.stringify(emplNewData)
    });

    check(responseEmpl);
    location.reload()
}

const btn5 = doc.getElementById('btn5');
btn5.addEventListener('click', employeePays);