let elem = document.getElementsByTagName('h3')[0];
elem.innerHTML = localStorage.getItem('login') + " / " +
    localStorage.getItem('role').substring(5).toLowerCase();

