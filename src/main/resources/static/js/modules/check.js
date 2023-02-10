function check(response) {
    if (response.status === 200) {
        alert("Successful");
    } else {
        alert('Error: ' + response.status);
    }
}

export default check;