import checkForForbidden from './modules/checkForForbidden.js';
import check from './modules/check.js';
import {baseURI, doc, csrfToken} from './modules/parameters.js';

checkForForbidden();

const deptIdField = doc.getElementById('departId');
const deptBalanceField = doc.getElementById('deptBalance');
const deptDayLimitField = doc.getElementById('deptDayLimit');
const deptOnePayLimitField = doc.getElementById('deptOnePayLimit');
const deptDateLimitField = doc.getElementById('deptDateLimit');
const deptDateField = doc.getElementById('deptDate');

//--------------------------------------------------------hide some forms
(function () {
    switch (localStorage.getItem('role')) {
        case 'ROLE_DIRECTOR':
            doc.getElementById('f3').hidden = true;
            doc.getElementById('f4').hidden = true;
            doc.getElementById('firstName').readOnly = true;
            doc.getElementById('lastName').readOnly = true;
            break;
        case 'ROLE_CHIEF':
            doc.getElementById('f3').hidden = true;
            doc.getElementById('f4').hidden = true;
            doc.getElementById('firstName').readOnly = true;
            doc.getElementById('lastName').readOnly = true;
            doc.getElementById('deptBalance').readOnly = true;
            doc.getElementById('deptOnePayLimit').readOnly = true;
            doc.getElementById('deptDayLimit').readOnly = true;
            doc.getElementById('deptDateLimit').readOnly = true;
            doc.getElementById('deptDate').readOnly = true;
            doc.getElementById('btn1').hidden = true;
            break;
    }
})();

//--------------------------------------------------------insert/update data in the department fields
let departments,
    deptId = [],
    deptName = [],
    balance = [],
    departDayLimit = [],
    departOnePayLimit = [],
    departDateLimit = [],
    departDate = [];

(async function insertDeptData() {
    const responseDept = await fetch(`${baseURI}/dept`);
    let select1, opt1, text1;

    departments = await responseDept.json();
    for (let i = 0; i < departments.length; i++) {
        deptId[i] = departments[i]['id'];
        deptName[i] = departments[i]['name'];
        balance[i] = departments[i]['balance'];
        departDayLimit[i] = departments[i]['departDayLimit'];
        departOnePayLimit[i] = departments[i]['departOnePayLimit'];
        departDateLimit[i] = departments[i]['departDateLimit'];
        departDate[i] = departments[i]['departDate'];
    }
    if (localStorage.getItem('role') === 'ROLE_ADMIN' ||
        localStorage.getItem('role') === 'ROLE_DIRECTOR') {
        for (let i = 0; i < departments.length; i++) {
            select1 = doc.getElementById('select1');
            opt1 = doc.createElement('option');
            text1 = doc.createTextNode(deptName[i]);
            opt1.appendChild(text1);
            opt1.value = `${i}`;
            select1.appendChild(opt1);
            updateDeptFields();
        }
    } else {
        let number = parseInt(localStorage.getItem('departmentId'), 10);
        select1 = doc.getElementById('select1');
        opt1 = doc.createElement('option');
        text1 = doc.createTextNode(localStorage.getItem('nameOfDepartment'));
        opt1.appendChild(text1);
        opt1.value = `${number}`;
        select1.appendChild(opt1);
        number--;
        deptIdField.value = deptId[number];
        deptBalanceField.value = balance[number];
        deptDayLimitField.value = departDayLimit[number];
        deptOnePayLimitField.value = departOnePayLimit[number];
        deptDateLimitField.value = departDateLimit[number];
        deptDateField.value = departDate[number];
    }
})();

function updateDeptFields() {
    let deptNum = doc.getElementById('select1').value;

    deptIdField.value = deptId[deptNum];
    deptBalanceField.value = balance[deptNum];
    deptDayLimitField.value = departDayLimit[deptNum];
    deptOnePayLimitField.value = departOnePayLimit[deptNum];
    deptDateLimitField.value = departDateLimit[deptNum];
    deptDateField.value = departDate[deptNum];
}

const select1Field = doc.getElementById('select1');
select1Field.addEventListener('change', updateDeptFields);

//--------------------------------------------------------insert/update data in the employee fields
const emplDeptNameField = doc.getElementById('emplDeptName');
const emplFirstNameField = doc.getElementById('firstName');
const emplLastNameField = doc.getElementById('lastName');
const emplOnePayLimitField = doc.getElementById('emplOnePayLimit');
const emplDayLimitField = doc.getElementById('emplDayLimit');

let employees,
    emplId = [],
    emplfirstName = [],
    empllastName = [],
    emplDeptName = [],
    emplonePayLimit = [],
    empldayLimit = [],
    emplPersonId = [];

(async function insertEmplData() {
    const responseEmpl = await fetch(`${baseURI}/employee`);
    let select2, opt2, text2;

    employees = await responseEmpl.json();
    for (let i = 0; i < employees.length; i++) {
        emplId[i] = employees[i]['id'];
        emplfirstName[i] = employees[i]['firstName'];
        empllastName[i] = employees[i]['lastName'];
        emplDeptName[i] = employees[i]['department']['name'];
        emplonePayLimit[i] = employees[i]['onePayLimit'];
        empldayLimit[i] = employees[i]['dayLimit'];
        emplPersonId[i] = employees[i]['personalId'];
    }
    if (localStorage.getItem('role') === 'ROLE_ADMIN' ||
        localStorage.getItem('role') === 'ROLE_DIRECTOR') {
        for (let i = 0; i < employees.length; i++) {
            let select2 = doc.getElementById('select2');
            let opt2 = doc.createElement('option');
            let text2 = doc.createTextNode(emplId[i]);
            opt2.appendChild(text2);
            opt2.value = `${i}`;
            select2.appendChild(opt2);
            updateEmplFields();
        }
    } else if (localStorage.getItem('role') === 'ROLE_CLERK') {
        let number = parseInt(localStorage.getItem('employeeId'), 10);
        select2 = doc.getElementById('select2');
        opt2 = doc.createElement('option');
        text2 = doc.createTextNode(localStorage.getItem('id'));
        opt2.appendChild(text2);
        opt2.value = `${number}`;
        select2.appendChild(opt2);
        number--;
        emplFirstNameField.value = emplfirstName[number];
        emplLastNameField.value = empllastName[number];
        emplDeptNameField.value = emplDeptName[number];
        emplOnePayLimitField.value = emplonePayLimit[number];
        emplDayLimitField.value = empldayLimit[number];
    } else {
        for (let i = 0; i < employees.length; i++) {
            if (employees[i]['department']['name'] === localStorage.getItem('nameOfDepartment')) {
                let select2 = doc.getElementById('select2');
                let opt2 = doc.createElement('option');
                let text2 = doc.createTextNode(emplId[i]);
                opt2.appendChild(text2);
                opt2.value = `${i}`;
                select2.appendChild(opt2);
                updateEmplFields();
            }
        }
    }
})();

function updateEmplFields() {
    let idx = doc.getElementById('select2').value;

    emplFirstNameField.value = emplfirstName[idx];
    emplLastNameField.value = empllastName[idx];
    emplDeptNameField.value = emplDeptName[idx];
    emplOnePayLimitField.value = emplonePayLimit[idx];
    emplDayLimitField.value = empldayLimit[idx];
}

const select2Field = doc.getElementById('select2');
select2Field.addEventListener('change', updateEmplFields);

//--------------------------------------------------------ADMIN/update department
async function changeDeptData() {
    const deptNewData = {
        name: select1Field.options[select1Field.selectedIndex].text,
        balance: deptBalanceField.value,
        departDayLimit: deptDayLimitField.value,
        departOnePayLimit: deptOnePayLimitField.value,
        departDateLimit: deptDateLimitField.value,
        departDate: deptDateField.value
    };

    let idx = deptIdField.value;
    const responseDept = await fetch(`${baseURI}/dept/${idx}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'X-XSRF-TOKEN': csrfToken
        },
        body: JSON.stringify(deptNewData)
    });

    check(responseDept);
    window.location.href = "http://localhost:8080/dept";
}

const btn1 = doc.getElementById('btn1');
btn1.addEventListener('click', changeDeptData);

//--------------------------------------------------------ADMIN/update employee
async function changeEmployeeData() {
    const employeeNewData = {
        firstName: emplFirstNameField.value,
        lastName: emplLastNameField.value,
        onePayLimit: emplOnePayLimitField.value,
        dayLimit: emplDayLimitField.value,
        // personalId: select2Field.options[select2Field.selectedIndex].text,  in service we have only 4 parameters
    };

    let index = select2Field.options[select2Field.selectedIndex].text;
    const responseEmpl = await fetch(`${baseURI}/employee/${index}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'X-XSRF-TOKEN': csrfToken
        },
        body: JSON.stringify(employeeNewData)
    });

    check(responseEmpl);
    window.location.href = "http://localhost:8080/employees";
    // window.location.href = "http://localhost:8080/authorized";

}

const btn2 = doc.getElementById('btn2');
btn2.addEventListener('click', changeEmployeeData);

//--------------------------------------------------------ADMIN/delete department
async function deleteDept() {
    const idx = doc.getElementById('deptId');
    const dept = {
        id: idx.value,
    };

    const responseDept = await fetch(`${baseURI}/dept/${idx.value}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': csrfToken
        },
        body: JSON.stringify(dept)
    });

    check(responseDept);
    location.reload();
}

const btn3 = doc.getElementById('btn3');
btn3.addEventListener('click', deleteDept);

//---------------------------------------------------------ADMIN/delete employee
async function deleteEmployee() {
    const idx = doc.getElementById('employeeId').value;

    const requestEmpl = await fetch(`${baseURI}/employee`);
    employees = await requestEmpl.json();

    let role;
    for (let i = 0; i < employees.length; i++) {
        if (employees[i]['id'] == idx) {
            role = employees[i]['role'];
        }
    }

    if (role !== 'ROLE_ADMIN') {
        const employee = {
            id: idx
        }

        const responseEmpl = await fetch(`${baseURI}/employee/${idx}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': csrfToken
            },
            body: JSON.stringify(employee)
        });

        check(responseEmpl);
        location.reload();

    } else {
        alert("Can't delete admin!!!");
    }
}

const btn4 = doc.getElementById('btn4');
btn4.addEventListener('click', deleteEmployee);






