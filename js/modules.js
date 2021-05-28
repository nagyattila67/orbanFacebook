export const opening = function (sentences,points, content,maxPoint) {
    sentences.forEach((value, index) => {
        let point = Math.round(Math.random() * maxPoint);
        points[index] = point;
    })

    sentences.forEach((value, index) => {
        let myObject = Object();
        myObject.text = value;
        myObject.point = points[index];
        myObject.status = true;
        content[index] = myObject;
    })
}

export const randomizeOrderOfSentences = function (sentences, content) {
    for (let i = 0; i < sentences.length * 100; i++) {
        let myNumber1 = Math.floor(Math.random() * sentences.length);
        let myNumber2 = Math.floor(Math.random() * sentences.length);
        let element1 = content[myNumber1];
        let element2 = content[myNumber2];
        content[myNumber1] = element2;
        content[myNumber2] = element1;
    }
}

export const displayExamples = function (showedContent) {
    document.querySelector("#examples").innerHTML = "";
    showedContent.forEach((value, index) => {
        let checkboxId4cancel = "cancelId" + index;
        let checkboxId4delete = "deleteId" + index;
        document.querySelector("#examples").innerHTML += `
<tr>
<td><input type="checkbox" class="checkbox4cancel" id=${checkboxId4cancel} ${value.status ? "" : "checked"}></td>
${value.status ? `<td><span>${value.text}</span></td>` : `<td><s style='color:grey'>${value.text}</s></td>`}


<td>${value.point}</td>
<td><img src="img/trash-bin.png" class="checkbox4delete" id=${checkboxId4delete}></td>
</tr>
`
    })
    addAllInputs(showedContent);
}

export const cancelFunction = function (index, showedContent) {
    console.log(index)
    showedContent[index].status ? showedContent[index].status = false : showedContent[index].status = true;
    console.log(showedContent[index].status)
    displayExamples(showedContent);
}

export const deleteFunction = function (index, showedContent) {
    showedContent.splice(index, 1);
    displayExamples(showedContent);
}

export const addAllInputs = function (showedContent) {
    let allCancelInput = document.querySelectorAll(".checkbox4cancel");
    let allDeleteInput = document.querySelectorAll(".checkbox4delete");

    allCancelInput.forEach((value, index) => {
        value.addEventListener("click", () => { cancelFunction(index, showedContent); })
    })
    allDeleteInput.forEach((value, index) => {
        value.addEventListener("click", () => { deleteFunction(index, showedContent) })
    })
}

export const newContent = function (showedContent) {
    let myNewText = document.querySelector("#newText").value;
    let myNewPoint = document.querySelector("#newPoint").value;
    myNewPoint = parseInt(myNewPoint);
    if (myNewPoint > 15 || myNewPoint < 0 || isNaN(myNewPoint) == true) {
        alert("A pontszám csak 0 és 15 közé eső egész szám lehet.")
        document.querySelector("#newPoint").value = "";
    }
    else {
        let myNewObject = Object();
        myNewObject.text = myNewText;
        myNewObject.point = myNewPoint;
        myNewObject.status = true;
        showedContent[showedContent.length] = myNewObject;
        displayExamples(showedContent);
        document.querySelector("#newText").value = "";
        document.querySelector("#newPoint").value = "";
    }
}

export const frontWiev = function (showedContent) {
    let textForWiev = "";
    showedContent.forEach((value) => {
        let myText = value.status ? value.text : '';
        textForWiev += myText
    });
    alert(textForWiev)
}

export const visiteProfile = function () {
    window.open("https://www.facebook.com/orbanviktor")
}

export const copyContent = function (showedContent) {
    let textForWiev = "";
    showedContent.forEach((value) => {
        let myText = value.status ? value.text : '';
        textForWiev += myText
    });
    console.log(textForWiev)
    document.querySelector("#textarea4copy").innerHTML = textForWiev;
    document.querySelector("#textarea4copy").select();
    document.querySelector("#textarea4copy").setSelectionRange(0, 99999)
    document.execCommand("copy");
}






