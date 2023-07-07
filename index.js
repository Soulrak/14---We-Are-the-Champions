import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-b373a-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementListInDB = ref(database, "endorsementList")

const inputFieldEl = document.querySelector("#input-field")
const inputButtonEl = document.querySelector("#input-button")
const endorsementListEl = document.querySelector("#endorsement-list")

inputButtonEl.addEventListener("click", function(){
    let inputText = inputFieldEl.value

    if (inputText.trim() != "") {
        push(endorsementListInDB, inputText)

        clearInputFieldEl()
    }
    
})

onValue(endorsementListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())

        clearEndorsementListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
    
            appendItemToEndorsementListEl(currentItemValue)
        }
    } else {
        endorsementListEl.innerHTML = `<em>Publish an endorsement!</em>`
    }

    
})

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function clearEndorsementListEl() {
    endorsementListEl.innerHTML = ""
}

function appendItemToEndorsementListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("div")
    
    newEl.innerHTML = ` <div class="endorsement-message">
                            <p>${item}</p>
                        </div>
                      `
    // newEl.addEventListener("dblclick", function() {
    //     let exactEndorsementInDB = ref(database, `endorsementList/${itemID}`)
    //     remove(exactEndorsementInDB)
        
    // })
    endorsementListEl.append(newEl)
}
