const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
// get data from local storage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
// if data is recieved then add data to render function as a parameter
let myLeads = []
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}
//The function is using the chrome.tabs.query method from the chrome API
tabBtn.addEventListener("click", function () {
    // query return currently active window
    //currentWindow property is set to true, so the query returns tabs from the current window only
    chrome.tabs.query({
        active: true,
        currentWindow: true
    },
        //function takes first tab and it pushes to myLeads array then it sets to local storage
        function (tabs) {
            myLeads.push(tabs[0].url)
            localStorage.setItem("myLeads", JSON.stringify(myLeads))
            render(myLeads)
        })
})
// function takes takes parameter then creates list item for each array
function render(Leads) {
    let listItems = ""
    for (let i = 0; i < Leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${Leads[i]}'>
                    ${Leads[i]}
                </a>
            </li>`
    }
    ulEl.innerHTML = listItems
}
// clears local storage when you double click
deleteBtn.addEventListener('dblclick', function () {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})
// takes any value from input element then adds to local storage like a todo list app
inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})