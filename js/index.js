const sentences = ["Ha tízmillió oltásnál lemondasz, én beadatom még négyszer az oltást. Deal? ", "Csodálatos napot kívánok Önnek, drága elnök úr! De öröm olvasni az új posztját! &#9829 &#9829 &#9829 ", "Nagyon szépen köszönjük áldozatos munkáját! A jó Isten áldja meg és vigyázzon Önre! ", "Hálásan köszönjük tisztelt Miniszterelnök Úrnak megfeszített munkáját és hazánk megmentését! ", "Mi van főni? Már megint felugrott hány kiló? ", "A mi miniszterelnökünk egy remek ember! Sokat köszönhetünk Neki és az egész Csapatának! &#9996; ", "Isten áldása Önre és Hazánkra! ", "Ez még mindig a pörköltszaftos ing? ", "A jó Isten és a Szűzanya vigyázza a Miniszterelnök Úr lépteit mindörökre! ", "Ennek a csávónak nincs másik ruhája? ", "Maga a mi megmentőnk. Maga a fény az alaggutba! ", "Több krumlit a népnek! ", "Legyen béke, szabadság és egyetértés! ", "Hát milyen cuki ez a pasas, megeszlek, királyom, de édes vagy &#9829 ", "Kis birtok, nagy birtok, Viktorunkkal nem bírtok! ", "Még stadiont és kisvasutat a zembereknek! ", "Mi az, hogy együtt újra sikerülni fog? Mer eddig hányszor sikerült? ", "Én véletlenül kerültem ide, de ennyi eszement kommentet még az életbe nem olvastam! ", "Orban ist gut für Ungarn. ", "Veled vagyunk bátya! Hajrá! ", "Éjt nappallá téve dolgozik ez az áldott jó ember értünk Magyarokért! Az Isten áldása kísérje fáradhatatlan munkáját! ", "Az a szemét Gyurcsány az összes oltást saját magának adatta volna be, hogy egy se jusson a magyaroknak! De én úgy szeretem a Miniszterelnök Urat, hogy az összeset Önnek adatnám be, hogy sose legyen beteg! ", "De jól nézel ki, Viktorom, sok puszi! &#128139 &#128139 &#128139 "]
const points = Array();
const content = Array();
let showedContent = Array();
let increaseArray = Array();
let orderArray = Array();

const maxPoint = 15;

import {opening} from "/js/modules.js"
opening(sentences, maxPoint, points, content);

import {randomizeOrderOfSentences} from "/js/modules.js"
randomizeOrderOfSentences(sentences,content);

import {makeShowedSentences} from "/js/modules.js"
makeShowedSentences(showedContent, content);

import {displayExamples} from "/js/modules.js"
displayExamples(showedContent,orderArray);

import {cancelFunction} from "/js/modules.js"
import {deleteFunction} from "/js/modules.js"
import {newContent} from "/js/modules.js"
document.addEventListener("DOMContentLoaded", () => { 
    document.querySelector("#buttonForNewContent").addEventListener("click",()=>{newContent(showedContent)})
})

import {frontWiev} from "/js/modules.js"
document.addEventListener("DOMContentLoaded", () => { 
    document.querySelector("#buttonForFrontWiev").addEventListener("click",()=>{frontWiev(showedContent)})
})

import {makeOrderArray} from "/js/modules.js"
makeOrderArray(orderArray,showedContent);

import {increase} from "/js/modules.js"
document.addEventListener("DOMContentLoaded", () => { 
    document.querySelector("#buttonForIncrease").addEventListener("click",()=>{increase(orderArray,showedContent,increaseArray,maxPoint,dontDisplay)})
})

import {decrease} from "/js/modules.js"
document.addEventListener("DOMContentLoaded", () => { 
    document.querySelector("#buttonForDecrease").addEventListener("click",()=>{decrease(orderArray,showedContent,increaseArray,maxPoint,dontDisplay)})
})

let dontDisplay = false;
import {showMaxPointComment} from "/js/modules.js"
document.addEventListener("DOMContentLoaded", () => { showMaxPointComment(orderArray,showedContent,increaseArray,maxPoint,dontDisplay); })

import {visiteProfile} from "/js/modules.js"

document.addEventListener("DOMContentLoaded", () => { 
    document.querySelector("#buttonForVisiteProfile").addEventListener("click",()=>{visiteProfile()})
})

import {copyContent} from "/js/modules.js"
document.addEventListener("DOMContentLoaded", () => { 
    document.querySelector("#buttonForCopyContent").addEventListener("click",()=>{copyContent(showedContent)})
})

import {wannaOtherExamples} from "/js/modules.js"
document.addEventListener("DOMContentLoaded", () => { document.querySelector("#otherExamples").addEventListener("click", () => {
    wannaOtherExamples(sentences,content,orderArray,showedContent,increaseArray,maxPoint,dontDisplay) }) })
