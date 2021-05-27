const sentences = ["Ha tízmillió oltásnál lemondasz, én beadatom még négyszer az oltást. Deal? ", "Csodálatos napot kívánok Önnek, drága elnök úr! De öröm olvasni az új posztját! &#9829 &#9829 &#9829 ", "Nagyon szépen köszönjük áldozatos munkáját! A jó Isten áldja meg és vigyázzon Önre! ", "Hálásan köszönjük tisztelt Miniszterelnök Úrnak megfeszített munkáját és hazánk megmentését! ", "Mi van főni? Már megint felugrott hány kiló? ", "A mi miniszterelnökünk egy remek ember! Sokat köszönhetünk Neki és az egész Csapatának! &#9996; ", "Isten áldása Önre és Hazánkra! ", "Ez még mindig a pörköltszaftos ing? ", "A jó Isten és a Szűzanya vigyázza a Miniszterelnök Úr lépteit mindörökre! ", "Ennek a csávónak nincs másik ruhája? ", "Maga a mi megmentőnk. Maga a fény az alaggutba! ", "Több krumlit a népnek! ", "Legyen béke, szabadság és egyetértés! ", "Hát milyen cuki ez a pasas, megeszlek, királyom, de édes vagy &#9829 ", "Kis birtok, nagy birtok, Viktorunkkal nem bírtok! ", "Még stadiont és kisvasutat a zembereknek! ", "Mi az, hogy együtt újra sikerülni fog? Mer eddig hányszor sikerült? ", "Én véletlenül kerültem ide, de ennyi eszement kommentet még az életbe nem olvastam! ", "Orban ist gut für Ungarn. ", "Veled vagyunk bátya! Hajrá! ", "Éjt nappallá téve dolgozik ez az áldott jó ember értünk Magyarokért! Az Isten áldása kísérje fáradhatatlan munkáját! ", "Az a szemét Gyurcsány az összes oltást saját magának adatta volna be, hogy egy se jusson a magyaroknak! De én úgy szeretem a Miniszterelnök Úrat, hogy az összeset Önnek adatnám be, hogy mindig egészséges legyen! ","De jól nézel ki, Viktorom, sok puszi! &#128139 &#128139 &#128139 "]
const points = Array();
const content = Array();
let showedContent = Array();
let increaseArray = Array();
let orderArray=Array();

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
//randomizeOrderOfSentences();

const makeShowedSentences = function () {
    showedContent = Array();
    for (let i = 0; i < 5; i++) {
        showedContent[i] = content[i];
    }

}
makeShowedSentences();



const displayExamples = function () {
    document.querySelector("#examples").innerHTML = "";
    document.querySelector("#examples").innerHTML =
        `<tr><td>áthúz</td><td>komment szövege</td><td>pont</td><td>töröl</td></tr>`;
    showedContent.forEach((value, index) => {
        let checkboxId4cancel = "cancelId" + index;
        let checkboxId4delete = "deleteId" + index;
        document.querySelector("#examples").innerHTML += `
<tr>
<td><input type="checkbox" class="checkbox4cancel" id=${checkboxId4cancel} ${value.status ? "" : "checked"}></td>
<td>${value.status ? "<span>" : "<s style='color:grey'>"}
${value.text}</td>
<td>${value.status ? "</span>" : "</s>"}
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
    randomizeOrderOfSentences();
    makeShowedSentences();
    displayExamples();
    showMaxPointComment();
}

const newContent = function () {
    let myNewText = document.querySelector("#newText").value;
    let myNewPoint = document.querySelector("#newPoint").value;
    myNewPoint = parseInt(newPoint);
    let myNewObject = Object();
    myNewObject.text = myNewText;
    myNewObject.point = myNewPoint;
    myNewObject.status = true;
    showedContent[showedContent.length] = myNewObject;
    displayExamples();
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
    showedContentTemporary = showedContent.slice(0)
    showedContent = Array();
    let myIndex=0;
    orderArray.forEach((value1) => {
        showedContentTemporary.findIndex((value2, index2) => { if (value2.point == value1) {myIndex=index2;return myIndex } });
        showedContent.push(showedContentTemporary[myIndex]);
    })
    if(dontDisplay==false){displayExamples()};


}

const orderShowedContentAsOrderarrayWantIt =function(){
  showedContentTemporary = showedContent.slice(0)
    showedContent = Array();
    let myIndex=0;
    orderArray = orderArray.reverse();
    orderArray.forEach((value1) => {
        showedContentTemporary.findIndex((value2, index2) => { if (value2.point == value1) {myIndex=index2;return myIndex } });
        console.log(myIndex);
        console.log(showedContentTemporary[myIndex]);
        showedContent.push(showedContentTemporary[myIndex]);
    })  
}

const decrease = function () {
    makeOrderArray();
    increase();
    orderShowedContentAsOrderarrayWantIt();
    displayExamples();
}

let dontDisplay=false;
const showMaxPointComment = function(){
    makeOrderArray();
    dontDisplay=true;
    increase();
    dontDisplay=false;
    document.querySelector("#maxPointComment").innerHTML=`<i>${showedContent[showedContent.length-1].text}</i>`
}

document.addEventListener("DOMContentLoaded", () => {showMaxPointComment(); })
