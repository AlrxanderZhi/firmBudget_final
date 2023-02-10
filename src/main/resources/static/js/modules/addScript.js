//Previously this function and its call was in file "dept.js".
//When nodule appendNextFlex was added mistake "import declarations may only appear at top level of a module" arose.
//It occurred that when import is done, only one line "<script src="../js/dept.js" type="module"></script>" is permissible.
//So this function was moved here
function addScript(src) {
    const script = document.createElement('script');
    script.src = src;
    script.async = false; // чтобы гарантировать порядок
    document.head.appendChild(script);
}

export default addScript;