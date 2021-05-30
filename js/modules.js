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

export const cancelFunction = function (index, showedContent, orderArray) {
    showedContent[index].status ? showedContent[index].status = false : showedContent[index].status = true;
    displayExamples(showedContent, orderArray);
}

export const deleteFunction = function (index, showedContent, orderArray,increaseArray, maxPoint, dontDisplay) {
    showedContent.splice(index, 1);
    orderArray.splice(index, 1)
    displayExamples(showedContent, orderArray);
    showedContentNew = showedContent.slice(0);
    showMaxPointComment(orderArray, showedContentNew, increaseArray, maxPoint, dontDisplay)
    
}

export const addAllInputs = function (showedContent, orderArray,increaseArray, maxPoint, dontDisplay) {
    let allCancelInput = document.querySelectorAll(".checkbox4cancel");
    let allDeleteInput = document.querySelectorAll(".checkbox4delete");

    allCancelInput.forEach((value, index) => {
        value.addEventListener("click", () => { cancelFunction(index, showedContent, orderArray); })
    })
    allDeleteInput.forEach((value, index) => {
        value.addEventListener("click", () => { deleteFunction(index,  showedContent, orderArray,increaseArray, maxPoint, dontDisplay) })
    })
}

export const displayExamples = function (showedContent, orderArray,increaseArray, maxPoint, dontDisplay) {
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
    showedContentNew = showedContent.slice(0);
    addAllInputs(showedContent, orderArray,showedContent, orderArray,increaseArray, maxPoint, dontDisplay);
}

export const makeOrderArray = function (orderArray, showedContent,increaseArray, maxPoint, dontDisplay) {
    //orderArray = Array();
    showedContent.forEach((value, index) => { orderArray[index] = showedContent[index].point })
}

export const newContent = function (showedContent, orderArray,increaseArray, maxPoint, dontDisplay) {
    if(showedContentNew.length!=0){showedContent=showedContentNew;}
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
            makeOrderArray(orderArray, showedContent,increaseArray, maxPoint, dontDisplay)
            let myNewObject = Object();
            myNewObject.text = myNewText;
            myNewObject.point = myNewPoint;
            myNewObject.status = true;
            showedContent[showedContent.length] = myNewObject;
            orderArray.push(myNewPoint)
            displayExamples(showedContent, orderArray,increaseArray, maxPoint, dontDisplay);
            document.querySelector("#newText").value = "";
            document.querySelector("#newPoint").value = "";
        }
    }
    showedContentNew = showedContent.slice(0);
    showMaxPointComment(orderArray, showedContentNew, increaseArray, maxPoint, dontDisplay)
}

export const frontWiev = function (showedContent) {
    let textForWiev = "";
    showedContent.forEach((value) => {
        let myText = value.status ? value.text : '';
        textForWiev += myText
    });
    alert(textForWiev)
}

export const increase = function (showedContent, orderArray, increaseArray, maxPoint, dontDisplay) {
    if (showedContentNew.length != 0) { showedContent = showedContentNew.slice(0) }
    orderArray = Array();
    makeOrderArray(orderArray, showedContent,increaseArray, maxPoint, dontDisplay)
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
    showedContentTemporary = Array();
    if (dontDisplay == false) { displayExamples(showedContent, orderArray,increaseArray, maxPoint, dontDisplay) };
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

export const decrease = function (showedContent, orderArray, increaseArray, maxPoint, dontDisplay) {
    if (showedContentNew.length != 0) { showedContent = showedContentNew.slice(0) }
    //makeOrderArray(orderArray, showedContent,increaseArray, maxPoint, dontDisplay)
    let orderArray2 = increase(showedContent, orderArray, increaseArray, maxPoint, dontDisplay);
    let showedContent2 = orderShowedContentAsOrderarrayWantIt(showedContent, orderArray2);
    displayExamples(showedContent2, orderArray,increaseArray, maxPoint, dontDisplay);
    showMaxPointComment(orderArray, showedContent, increaseArray, maxPoint, dontDisplay)
    showedContentNew = showedContent.slice(0);
}

export const showMaxPointComment = function (orderArray, showedContent, increaseArray, maxPoint, dontDisplay) {
    let itWasShowedContent = showedContent.slice(0);
    makeOrderArray(orderArray, showedContent,increaseArray, maxPoint, dontDisplay);
    dontDisplay = true;
    let orderArray2 = makeIncreasingOrder(orderArray)
    let showedContent2 = orderShowedContentAsOrderarrayWantIt(showedContent, orderArray2)
    dontDisplay = false;
    document.querySelector("#maxPointComment").innerHTML = `'<i>${showedContent2[showedContent2.length-1].text}</i>' - ${showedContent2[showedContent2.length-1].point} pont`
    showedContent = itWasShowedContent.slice(0);
}

export const makeIncreasingOrder = function (orderArray) {
    let newOrderArray = Array();
    while (orderArray.length > 0) {
        let max = 0;let index=-10;
        for (let i = 0; i < orderArray.length; i++) {
            if (orderArray[i] > max) { max = orderArray[i];index = i }
        }
        newOrderArray[newOrderArray.length] = max;
        orderArray.splice(index, 1)
    }
    return newOrderArray;
}

let showedContentNew = Array();
export const wannaOtherExamples = function (sentences, content, orderArray, showedContent, increaseArray, maxPoint, dontDisplay) {
    showedContent = Array();
    content.forEach((value) => { value.status = true })
    randomizeOrderOfSentences(sentences, content);
    makeShowedSentences(showedContent, content);
    displayExamples(showedContent, orderArray,increaseArray, maxPoint, dontDisplay);
    showMaxPointComment(orderArray, showedContent, increaseArray, maxPoint, dontDisplay);
    document.querySelector("#newText").value = "";
    document.querySelector("#newPoint").value = "";
    showedContentNew = showedContent.slice(0);
}



