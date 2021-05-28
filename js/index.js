const sentences = ["Ha tízmillió oltásnál lemondasz, én beadatom még négyszer az oltást. Deal? ", "Csodálatos napot kívánok Önnek, drága elnök úr! De öröm olvasni az új posztját! &#9829 &#9829 &#9829 ", "Nagyon szépen köszönjük áldozatos munkáját! A jó Isten áldja meg és vigyázzon Önre! ", "Hálásan köszönjük tisztelt Miniszterelnök Úrnak megfeszített munkáját és hazánk megmentését! ", "Mi van főni? Már megint felugrott hány kiló? ", "A mi miniszterelnökünk egy remek ember! Sokat köszönhetünk Neki és az egész Csapatának! &#9996; ", "Isten áldása Önre és Hazánkra! ", "Ez még mindig a pörköltszaftos ing? ", "A jó Isten és a Szűzanya vigyázza a Miniszterelnök Úr lépteit mindörökre! ", "Ennek a csávónak nincs másik ruhája? ", "Maga a mi megmentőnk. Maga a fény az alaggutba! ", "Több krumlit a népnek! ", "Legyen béke, szabadság és egyetértés! ", "Hát milyen cuki ez a pasas, megeszlek, királyom, de édes vagy &#9829 ", "Kis birtok, nagy birtok, Viktorunkkal nem bírtok! ", "Még stadiont és kisvasutat a zembereknek! ", "Mi az, hogy együtt újra sikerülni fog? Mer eddig hányszor sikerült? ", "Én véletlenül kerültem ide, de ennyi eszement kommentet még az életbe nem olvastam! ", "Orban ist gut für Ungarn. ", "Veled vagyunk bátya! Hajrá! ", "Éjt nappallá téve dolgozik ez az áldott jó ember értünk Magyarokért! Az Isten áldása kísérje fáradhatatlan munkáját! ", "Az a szemét Gyurcsány az összes oltást saját magának adatta volna be, hogy egy se jusson a magyaroknak! De én úgy szeretem a Miniszterelnök Urat, hogy az összeset Önnek adatnám be, hogy sose legyen beteg! ", "De jól nézel ki, Viktorom, sok puszi! &#128139 &#128139 &#128139 "]
const points = Array();
const content = Array();
let showedContent = Array();
let increaseArray = Array();
let orderArray = Array();
const maxPoint = 15;


import { opening } from "/js/modules.js"
opening(sentences, points, content, maxPoint);

import { randomizeOrderOfSentences } from "/js/modules.js"
randomizeOrderOfSentences(sentences, content);

const makeShowedSentences = function (content) {
    showedContent = Array();
    for (let i = 0; i < 5; i++) {
        showedContent[i] = content[i];
    }

}
//import {makeShowedSentences} from "/js/modules.js"
makeShowedSentences(content);

import { displayExamples } from "/js/modules.js"

document.addEventListener("DOMContentLoaded", () => { displayExamples(showedContent) })

const wannaOtherExamples = function () {
    showedContent = Array();
    content.forEach((value) => { value.status = true })
    randomizeOrderOfSentences(sentences, content);
    makeShowedSentences(content);
    displayExamples(showedContent);
    showMaxPointComment();
}
import { newContent } from "/js/modules.js";
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#buttonForNewContent").addEventListener("click", () => { newContent(showedContent) })
})

import { frontWiev } from "/js/modules.js";
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#buttonForFrontWiev").addEventListener("click", () => { frontWiev(showedContent) })
})

const makeOrderArray = function (showedContent) {
    orderArray = Array();
    showedContent.forEach((value, index) => { orderArray[index] = showedContent[index].point })
}
//import { makeOrderArray } from "/js/modules.js";
makeOrderArray(showedContent);

const increase = function () {
    //orderArray=Array();
    makeOrderArray(showedContent);
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
}

document.addEventListener("DOMContentLoaded", () => { document.querySelector("#buttonForIncrease").addEventListener("click", () => { increase() }) })

const orderShowedContentAsOrderarrayWantIt = function () {
    let showedContentTemporary = showedContent.slice(0)
    showedContent = Array();
    let myIndex = 0;
    orderArray = orderArray.reverse();
    orderArray.forEach((value1) => {
        showedContentTemporary.findIndex((value2, index2) => { if (value2.point == value1) { myIndex = index2; return myIndex } });
        showedContent.push(showedContentTemporary[myIndex]);
        //ha ugyanaz a pontszám, akkor ugyanazt írná ki újra
        showedContentTemporary.splice(myIndex, 1);
    })
}

const decrease = function () {
    makeOrderArray(showedContent);
    increase();
    orderShowedContentAsOrderarrayWantIt();
    displayExamples(showedContent);
}
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#buttonForDecrease").addEventListener("click", () => { decrease() })
})

let dontDisplay = false;
const showMaxPointComment = function () {
    let itWasShowedContent = showedContent.slice(0);
    makeOrderArray(showedContent);
    dontDisplay = true;
    increase();
    dontDisplay = false;
    document.querySelector("#maxPointComment").innerHTML = `<i>${showedContent[showedContent.length - 1].text}</i> - ${showedContent[showedContent.length - 1].point} pont`
    showedContent = itWasShowedContent.slice(0);
}

document.addEventListener("DOMContentLoaded", () => { showMaxPointComment(); })

import { visiteProfile } from "/js/modules.js";
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#buttonForVisiteProfile").addEventListener("click", () => { visiteProfile() })
})

import { copyContent } from "/js/modules.js";
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#buttonForCopyContent").addEventListener("click", () => { copyContent(showedContent) })
})

document.addEventListener("DOMContentLoaded", () => { document.querySelector("#otherExamples").addEventListener("click", () => { wannaOtherExamples() }) })
