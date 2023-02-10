let doc = document;

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

export default appendNewFlex;