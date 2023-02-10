let doc = document,
    employees,
    id = [],
    firstName = [],
    lastName = [],
    onePayLimit = [],
    dayLimit = [],
    personalId = [],
    deptName = [],
    role = [];

async function loadEmployees() {
    const response = await fetch('http://localhost:8080/api/v1/employee');
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

    function appendNewFlex(jsonTxt) {
        let div = doc.createElement("div");
        div.className = "child-holder";

        let paragraph = doc.createElement("p");
        paragraph.className = "child";

        let newContent = doc.createTextNode(jsonTxt);
        paragraph.appendChild(newContent);

        div.appendChild(paragraph);
        doc.getElementsByClassName("flex-container")[0].appendChild(div);
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
