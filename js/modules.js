export const opening = function (sentences, maxPoint, points, content) {
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

export const makeShowedSentences = function (showedContent, content) {
    showedContent.splice(0, showedContent.length)
    for (let i = 0; i < 5; i++) {
        showedContent[i] = content[i];
    }
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
    document.querySelector("#textarea4copy").innerHTML = textForWiev;
    document.querySelector("#textarea4copy").select();
    document.querySelector("#textarea4copy").setSelectionRange(0, 99999)
    document.execCommand("copy");
}

export const cancelFunction = function (index, showedContent) {
    showedContent[index].status ? showedContent[index].status = false : showedContent[index].status = true;
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

export const makeOrderArray = function (orderArray, showedContent) {
    //orderArray = Array();
    showedContent.forEach((value, index) => { orderArray[index] = showedContent[index].point })
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
        if (document.querySelector("#newText").value == "") {
            alert("Nem írt kommentet!")
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
}

export const frontWiev = function (showedContent) {
    let textForWiev = "";
    showedContent.forEach((value) => {
        let myText = value.status ? value.text : '';
        textForWiev += myText
    });
    alert(textForWiev)
}

export const increase = function (orderArray, showedContent, increaseArray, maxPoint, dontDisplay) {
    orderArray = Array();
    makeOrderArray(orderArray, showedContent);
    increaseArray = Array();
    let min = maxPoint;
    let index = Number();
    while (orderArray.length != 0) {
        min = maxPoint;
        for (let i = 0; i < orderArray.length; i++) {
            if (min >= orderArray[i]) { min = orderArray[i]; index = i }
        }
        increaseArray[increaseArray.length] = min;
        orderArray.splice(index, 1)
    }
    orderArray = increaseArray.slice(0);
    let showedContentTemporary = showedContent.slice(0)
    showedContent = Array();
    let myIndex = 0;
    orderArray.forEach((value1) => {
        showedContentTemporary.findIndex((value2, index2) => { if (value2.point == value1) { myIndex = index2; return myIndex } });
        showedContent.push(showedContentTemporary[myIndex]);
        showedContentTemporary.splice(myIndex, 1)
    })
    if (dontDisplay == false) { displayExamples(showedContent) };
    return orderArray
}

export const orderShowedContentAsOrderarrayWantIt = function (showedContent, orderArray2) {
    let showedContentTemporary = showedContent.slice(0)
    showedContent = Array();
    let myIndex = 0;
    orderArray2 = orderArray2.reverse();
    orderArray2.forEach((value1) => {
        showedContentTemporary.findIndex((value2, index2) => { if (value2.point == value1) { myIndex = index2; return myIndex } });
        showedContent.push(showedContentTemporary[myIndex]);
        //ha ugyanaz a pontszám, akkor ugyanazt írná ki újra
        showedContentTemporary.splice(myIndex, 1);
    })
    return showedContent;
}

export const decrease = function (orderArray, showedContent, increaseArray, maxPoint, dontDisplay) {
    let orderArray2 = increase(orderArray, showedContent, increaseArray, maxPoint, dontDisplay);
    showedContent = orderShowedContentAsOrderarrayWantIt(showedContent, orderArray2);
    displayExamples(showedContent);
}

export const showMaxPointComment = function (orderArray, showedContent, increaseArray, maxPoint, dontDisplay) {
    let itWasShowedContent = showedContent.slice(0);
    makeOrderArray(orderArray, showedContent);
    dontDisplay = true;
    let orderArray2 = increase(orderArray, showedContent, increaseArray, maxPoint, dontDisplay);
    let showedContent2 = orderShowedContentAsOrderarrayWantIt(showedContent, orderArray2)
    dontDisplay = false;
    document.querySelector("#maxPointComment").innerHTML = `'<i>${showedContent2[0].text}</i>' - ${showedContent2[0].point} pont`
    showedContent = itWasShowedContent.slice(0);
}

export const wannaOtherExamples = function (sentences, content, orderArray, showedContent, increaseArray, maxPoint, dontDisplay) {
    showedContent = Array();
    content.forEach((value) => { value.status = true })
    randomizeOrderOfSentences(sentences, content);
    makeShowedSentences(showedContent, content);
    displayExamples(showedContent);
    showMaxPointComment(orderArray, showedContent, increaseArray, maxPoint, dontDisplay);
    document.querySelector("#newText").value = "";
    document.querySelector("#newPoint").value = "";
}



