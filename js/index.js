const sentences = ["Ha tízmillió oltásnál lemondasz, én beadatom még négyszer az oltást. Deal? ", "Csodálatos napot kívánok Önnek, drága elnök úr! De öröm olvasni az új posztját! &#9829 &#9829 &#9829 ", "Nagyon szépen köszönjük áldozatos munkáját! A jó Isten áldja meg és vigyázzon Önre! ", "Hálásan köszönjük tisztelt Miniszterelnök Úrnak megfeszített munkáját és hazánk megmentését! ", "Mi van főni? Már megint felugrott hány kiló? ", "A mi miniszterelnökünk egy remek ember! Sokat köszönhetünk Neki és az egész Csapatának! &#9996; ", "Isten áldása Önre és Hazánkra! ", "Ez még mindig a pörköltszaftos ing? ", "A jó Isten és a Szűzanya vigyázza a Miniszterelnök Úr lépteit mindörökre! ", "Ennek a csávónak nincs másik ruhája? ", "Maga a mi megmentőnk. Maga a fény az alaggutba! ", "Több krumlit a népnek! ", "Legyen béke, szabadság és egyetértés! ", "Hát milyen cuki ez a pasas, megeszlek, királyom, de édes vagy &#9829 ", "Kis birtok, nagy birtok, Viktorunkkal nem bírtok! ", "Még stadiont és kisvasutat a zembereknek! ", "Mi az, hogy együtt újra sikerülni fog? Mer eddig hányszor sikerült? ", "Én véletlenül kerültem ide, de ennyi eszement kommentet még az életbe nem olvastam! ", "Orban ist gut für Ungarn. ", "Veled vagyunk bátya! Hajrá! ", "Éjt nappallá téve dolgozik ez az áldott jó ember értünk Magyarokért! Az Isten áldása kísérje fáradhatatlan munkáját! ", "Az a szemét Gyurcsány az összes oltást saját magának adatta volna be, hogy egy se jusson a magyaroknak! De én úgy szeretem a Miniszterelnök Urat, hogy az összeset Önnek adatnám be, hogy sose legyen beteg! ", "De jól nézel ki, Viktorom, sok puszi! &#128139 &#128139 &#128139 "]
const points = Array();
const content = Array();
let showedContent = Array();
let increaseArray = Array();
let orderArray = Array();

const maxPoint = 15;
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

const randomizeOrderOfSentences = function () {
    for (let i = 0; i < sentences.length * 100; i++) {
        let myNumber1 = Math.floor(Math.random() * sentences.length);
        let myNumber2 = Math.floor(Math.random() * sentences.length);
        let element1 = content[myNumber1];
        let element2 = content[myNumber2];
        content[myNumber1] = element2;
        content[myNumber2] = element1;
    }
}
//import {randomizeOrderOfSentences} from "/js/modules.js"
randomizeOrderOfSentences();

const makeShowedSentences = function () {
    showedContent = Array();
    for (let i = 0; i < 5; i++) {
        showedContent[i] = content[i];
    }

}
makeShowedSentences(sentences,content);



const displayExamples = function () {
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



const cancelFunction = function (index) {
    console.log(index)
    showedContent[index].status ? showedContent[index].status = false : showedContent[index].status = true;
    console.log(showedContent[index].status)
    displayExamples();
}

const deleteFunction = function (index) {
    showedContent.splice(index, 1);
    displayExamples();
}


document.addEventListener("DOMContentLoaded", () => {

})
document.addEventListener("DOMContentLoaded", () => { displayExamples() })
//document.addEventListener("DOMContentLoaded", () => { displayExamples() })


const addAllInputs = function () {
    let allCancelInput = document.querySelectorAll(".checkbox4cancel");
    let allDeleteInput = document.querySelectorAll(".checkbox4delete");

    allCancelInput.forEach((value, index) => {
        value.addEventListener("click", () => { cancelFunction(index); })
    })
    allDeleteInput.forEach((value, index) => {
        value.addEventListener("click", () => { deleteFunction(index) })
    })

}
/*document.addEventListener("DOMContentLoaded", () => {
addAllInputs();}
)*/

const wannaOtherExamples = function () {
    showedContent = Array();
    content.forEach((value) => { value.status = true })
    randomizeOrderOfSentences(sentences,content);
    makeShowedSentences();
    displayExamples();
    showMaxPointComment();
}

const newContent = function () {
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

const frontWiev = function () {
    let textForWiev = "";
    showedContent.forEach((value) => {
        let myText = value.status ? value.text : '';
        textForWiev += myText
    });
    alert(textForWiev)
}

const makeOrderArray = function () {
    orderArray = Array();
    showedContent.forEach((value, index) => { orderArray[index] = showedContent[index].point })
}
makeOrderArray();

const increase = function () {
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
    let showedContentTemporary = showedContent.slice(0)
    showedContent = Array();
    let myIndex = 0;
    orderArray.forEach((value1) => {
        showedContentTemporary.findIndex((value2, index2) => { if (value2.point == value1) { myIndex = index2; return myIndex } });
        showedContent.push(showedContentTemporary[myIndex]);
        showedContentTemporary.splice(myIndex, 1)
    })
    if (dontDisplay == false) { displayExamples() };


}

const orderShowedContentAsOrderarrayWantIt = function () {
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

const decrease = function () {
    makeOrderArray();
    increase();
    orderShowedContentAsOrderarrayWantIt();
    displayExamples();
}

let dontDisplay=false;
const showMaxPointComment = function () {
    let itWasShowedContent = showedContent.slice(0);
    makeOrderArray();
    dontDisplay = true;
    increase();
    dontDisplay = false;
    document.querySelector("#maxPointComment").innerHTML = `<i>${showedContent[showedContent.length - 1].text}</i>`
    showedContent = itWasShowedContent.slice(0);
}

document.addEventListener("DOMContentLoaded", () => { showMaxPointComment(); })

const visitProfile = function () {
    window.open("https://www.facebook.com/orbanviktor")
}

let textForWiev
const copyContent = function () {
    textForWiev = "";
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

document.addEventListener("DOMContentLoaded", () => { document.querySelector("#otherExamples").addEventListener("click",()=>{wannaOtherExamples()}) })

