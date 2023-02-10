function checkForForbidden() {
    let allNumberInputs = document.getElementsByClassName('number');
    for (let i = 0; i < allNumberInputs.length; i++) {
        allNumberInputs[i].addEventListener('keydown', function (event) {
            if (event.keyCode === 46 || event.keyCode === 8 || event.keyCode === 9 || event.keyCode === 27 ||
                (event.keyCode === 65 && event.ctrlKey === true) ||
                (event.keyCode >= 35 && event.keyCode <= 39)) {
            } else {
                if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                    event.preventDefault();
                }
            }
        });
    }
}

export default checkForForbidden;