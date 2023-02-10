let doc = document,
    departments,
    employee,
    numEmployee = 0,
    deptName = [];

let arrPict = [
    "../pic/electrical.jpg",
    "../pic/mechanical.png",
    "../pic/technological.jpg",
    "../pic/instrumental.jpg",
    "../pic/administrative.jpg",
]

let description = [
    `* Design, control, and implement electrical systems and products.
            * Develop manufacturing processes according to global engineering codes and standards.
            * Manage engineering projects and deliver them on time.
            * Define customer needs and requirements.
            * Ensure that installations and applications are in line with customer needs and safety standards.
            * Collaborate with engineers and technicians to design and apply new system processes.
            * Perform quality and performance analysis on new and legacy IT systems.
            * Summarize data and report on test results.
            * Examine needs on new equipment, calculate costs and help prepare budgets
            * Monitor maintenance and inspection plans.`,
    `* Assessing project requirements.
            * Measuring the performance of mechanical components, devices and engines.
            * Agreeing budgets, timescales and specifications with clients and managers.
            * Modifying and maintaining products and the processes that support them.
            * Using computer-aided design/modelling software.
            * Liaising with suppliers.
            * Undertaking research.
            * Producing and implementing designs and test procedures.
            * Carrying out risk assessments.
            * Presenting designs to managers and clients.
            * Testing, evaluating, modifying and re-testing products.
            * Writing reports and documentation.
            * Providing technical advice.
            * Analysing and interpreting data.
            * Managing projects, costs and people.`,
    `* Supporting the engineering team during planning, design, development, installation,
        maintenance, and troubleshooting processes.
            * Analyzing existing systems and operations and developing preventative maintenance strategies.
            * Identifying potential problems and notifying the relevant stakeholders in a timely manner.
            * Monitoring processes, workers, and methods, and developing plans for increased efficiency.
            * Conducting required research and developing best practices.
            * Coordinating with other Engineers and crew members to ensure quality products are completed on schedule.
            * Performing quality control on all projects, writing reports, and making recommendations for improvement.`,
    `* Designing and testing equipment.
           * Troubleshooting any issues.
           * Researching projects.
           * Analyzing and interpreting data.
           * Managing projects.`,
    `* Provides administrative and technical support in the areas of human resources (HR), 
    budgetary, strategic planning, legal affairs, calls for tenders, facilities and security`
];

(function () {
    doc.body.style.background = `url('${arrPict[window.location.pathname.substring(6) - 1]}')`;
    doc.body.style.backgroundRepeat = 'no-repeat';
    doc.body.style.backgroundSize = 'cover';
})();

// Loading elements from json
(async function () {
    const responseDept = await fetch('http://localhost:8080/api/v1/dept');
    const responseEmpl = await fetch('http://localhost:8080/api/v1/employee');

    departments = await responseDept.json();
    employee = await responseEmpl.json();

    for (let i = 0; i < departments.length; i++) {
        deptName[i] = departments[i]['name'];

        //Insert name of department
        let nameDept = doc.getElementById("deptTheSame");
        nameDept.innerHTML = deptName[window.location.pathname.substring(6) - 1] + ` department`;

        let descriptionDept = doc.getElementsByClassName('flex-container')[0];
        descriptionDept.innerHTML = description[window.location.pathname.substring(6) - 1];
    }

    for (let i = 0; i < employee.length; i++) {
        if (employee[i]['department']['name'] === deptName[window.location.pathname.substring(6) - 1]) {
            numEmployee++;
        }
    }

    (function () {
        let header = doc.getElementById("_header");
        let div = doc.createElement("div");
        let paragraphElement = doc.createElement("p");
        paragraphElement.style.fontSize = `3vh`
        let content = doc.createTextNode(`Employees - ` + numEmployee);
        paragraphElement.appendChild(content);
        div.appendChild(paragraphElement);
        header.appendChild(div);
    })();
})();
