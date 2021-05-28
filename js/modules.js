export const randomizeOrderOfSentences = function (sentences,content) {
    for (let i = 0; i < sentences.length * 100; i++) {
        let myNumber1 = Math.floor(Math.random() * sentences.length);
        let myNumber2 = Math.floor(Math.random() * sentences.length);
        let element1 = content[myNumber1];
        let element2 = content[myNumber2];
        content[myNumber1] = element2;
        content[myNumber2] = element1;
    }
}

export const makeShowedSentences = function (showedContent) {
    showedContent = Array();
    for (let i = 0; i < 5; i++) {
        showedContent[i] = content[i];
    }

}

export const displayExamples = function () {
    document.querySelector("#examples").innerHTML = "";
    document.querySelector("#examples").innerHTML =
        `<tr><td><small>áthúz</small></td><td><small>komment szövege</small></td><td><small>pont</small></td><td><small>töröl</small></td></tr>`;
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
    addAllInputs();
}

export const cancelFunction = function (index,showedContent) {
    console.log(index)
    showedContent[index].status ? showedContent[index].status = false : showedContent[index].status = true;
    console.log(showedContent[index].status)
    displayExamples();
}

export const deleteFunction = function (index,showedContent) {
    showedContent.splice(index, 1);
    displayExamples();
}

export const addAllInputs = function () {
    let allCancelInput = document.querySelectorAll(".checkbox4cancel");
    let allDeleteInput = document.querySelectorAll(".checkbox4delete");

    allCancelInput.forEach((value, index) => {
        value.addEventListener("click", () => { cancelFunction(index); })
    })
    allDeleteInput.forEach((value, index) => {
        value.addEventListener("click", () => { deleteFunction(index) })
    })

}

export const wannaOtherExamples = function (sentences,content) {
    showedContent = Array();
    content.forEach((value) => { value.status = true })
    randomizeOrderOfSentences(sentences,content);
    makeShowedSentences(showedContent);
    displayExamples();
    showMaxPointComment(showedContent);
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
        displayExamples();
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

export const makeOrderArray = function (showedContent) {
    orderArray = Array();
    showedContent.forEach((value, index) => { orderArray[index] = showedContent[index].point })
}

export const increase = function (orderArray,increaseArray,showedContent) {
    //orderArray=Array();
    makeOrderArray();
    increaseArray = Array();
    let min = maxPoint;
    let index = Number();
    while (orderArray.length != 0) {
        min = maxPoint;
        for (let i = 0; i < orderArray.length; i++) {
            if (min >= orderArray[i]) { min = orderArray[i]; index = i }
        }
        increaseArray[increaseArray.length] = min;
        console.log(min, increaseArray, orderArray)
        orderArray.splice(index, 1)
    }
    orderArray = increaseArray.slice(0);
    showedContentTemporary = showedContent.slice(0)
    showedContent = Array();
    let myIndex = 0;
    orderArray.forEach((value1) => {
        showedContentTemporary.findIndex((value2, index2) => { if (value2.point == value1) { myIndex = index2; return myIndex } });
        showedContent.push(showedContentTemporary[myIndex]);
        showedContentTemporary.splice(myIndex, 1)
    })
    if (dontDisplay == false) { displayExamples() };
}

export const orderShowedContentAsOrderarrayWantIt = function (showedContent) {
    showedContentTemporary = showedContent.slice(0)
    showedContent = Array();
    let myIndex = 0;
    orderArray = orderArray.reverse();
    orderArray.forEach((value1) => {
        showedContentTemporary.findIndex((value2, index2) => { if (value2.point == value1) { myIndex = index2; return myIndex } });
        console.log(myIndex);
        console.log(showedContentTemporary[myIndex]);
        showedContent.push(showedContentTemporary[myIndex]);
        //ha ugyanaz a pontszám, akkor ugyanazt írná ki újra
        showedContentTemporary.splice(myIndex, 1);
    })
}

export const decrease = function () {
    makeOrderArray();
    increase();
    orderShowedContentAsOrderarrayWantIt();
    displayExamples();
}

export const showMaxPointComment = function (showedContent) {
    itWasShowedContent = showedContent.slice(0);
    makeOrderArray();
    dontDisplay = true;
    increase();
    dontDisplay = false;
    document.querySelector("#maxPointComment").innerHTML = `<i>${showedContent[showedContent.length - 1].text}</i>`
    showedContent = itWasShowedContent.slice(0);
}

export const visitProfile = function () {
    window.open("https://www.facebook.com/orbanviktor")
}

const copyContent = function (showedContent) {
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