//fuctions//
let stacked = [];
//main//
for (let i = 0; i < data.results[0].members.length; i++) {
  stacked.push(data.results[0].members[i])
}

function filterFunction() {
  console.log('run')
  const democratListen = document.getElementById("democrat");
  const republicanListen = document.getElementById("republican");
  const independentListen = document.getElementById("independent");
  let stateSelect = document.getElementById('state_select').value;
  console.log(stateSelect)
  const result = stacked.filter((member) => {
    if(stateSelect == "All States"){
    if(democratListen.checked && member.party == "D") return member;
    if(republicanListen.checked && member.party =='R') return member;
    if(independentListen.checked && member.party == 'I') return member;
    if(!independentListen.checked && !democratListen.checked && !republicanListen.checked) return member;
    }else{
      if(member.state == stateSelect && !independentListen.checked && !democratListen.checked && !republicanListen.checked) return member;
      if(democratListen.checked && member.party == "D" && member.state == stateSelect) return member;
      if(republicanListen.checked && member.party =='R' && member.state == stateSelect) return member;
      if(independentListen.checked && member.party == 'I' && member.state == stateSelect) return member;
    }
  })
pageLoader(result)
}

let stateBox = [];

for (let i = 0; i < stacked.length; i++) {
  if (stateBox.includes(stacked[i].state) === false) {
    stateBox.push(stacked[i].state);
  }
}
let sortBox = stateBox.sort();
stateBox.unshift('All States')
for (let i = 0; i < sortBox.length; i++) {
  let states = document.createElement("OPTION");
  let textname = document.createTextNode(`${sortBox[i]}`); // Create a text node
  states.appendChild(textname)
  states.setAttribute("class", 'state')
  states.setAttribute('value', `${sortBox[i]}`)
  states.setAttribute('id', `${sortBox[i]}`)
  document.getElementById("state_select").appendChild(states);
}

//Initial Header Load//

const headers = ['Name', 'Party', 'State', 'Senority', 'Party Line Votes']

let nodeTHeadrow = document.createElement("thead");
nodeTHeadrow.setAttribute("id", 'header')
document.getElementById("senate-data").appendChild(nodeTHeadrow);

let nodeHeaderRow = document.createElement("TR");
nodeHeaderRow.setAttribute("id", 'headerRow')
document.getElementById("header").appendChild(nodeHeaderRow);

for (let i = 0; i < headers.length; i++) {
  let node = document.createElement("TH");
  let textnode = document.createTextNode(`${headers[i]}`); // Create a text node
  node.appendChild(textnode);
  node.setAttribute("scope", 'col')
  document.getElementById("headerRow").appendChild(node);
}

let nodeTBody = document.createElement("tbody");
nodeTBody.setAttribute("id", 'tbody');
nodeTBody.setAttribute('class', 'table-hover');
document.getElementById("senate-data").appendChild(nodeTBody);

//TBODY Page Loader//

const pageLoader = (stacked) => {
  var Table = document.getElementById("tbody");
  Table.innerHTML = "";

  for (let i = 0; i < stacked.length; i++) {

    let row = document.createElement('TR'); // Create row
    row.setAttribute('scope', 'row')
    row.setAttribute("class", `${stacked[i].state}`)
    row.setAttribute('id', `${stacked[i].party}`)

    let node = document.createElement("TD");
    let textname = document.createTextNode(`${stacked[i].first_name}  ${stacked[i].last_name}`); // Create a text node
    node.appendChild(textname);
    node.setAttribute("id", `${stacked[i].last_name}`)
    row.appendChild(node);

    let nodetwo = document.createElement("TD");
    let textparty = document.createTextNode(`${stacked[i].party}`); // Create a text nodetwo
    nodetwo.appendChild(textparty);
    nodetwo.setAttribute("id", `${stacked[i].party}`)
    row.appendChild(nodetwo);

    let nodethree = document.createElement("TD");
    let textstate = document.createTextNode(`${stacked[i].state}`); // Create a text nodethree
    nodethree.appendChild(textstate);
    row.appendChild(nodethree)

    let nodefour = document.createElement("TD");
    let textsenor = document.createTextNode(`${stacked[i].seniority}`); // Create a text nodefour
    nodefour.appendChild(textsenor);
    nodefour.setAttribute("id", `${stacked[i].seniority}`)

    row.appendChild(nodefour)

    let nodefive = document.createElement("TD");
    let textpercentage = document.createTextNode(`${stacked[i].votes_with_party_pct}`); // Create a text nodefour
    nodefive.appendChild(textpercentage);
    nodefive.setAttribute("id", `${stacked[i].votes_with_party_pct}`)

    row.appendChild(nodefive)
    document.getElementById("tbody").appendChild(row);

  }
}

pageLoader(stacked);

// $('#senate-data').bootstrapTable({
//   url: '../data/pro-congress-113-senate.js',
//   pagination: true,
//   search: true,
//   columns: [{
//     field: 'id',
//     title: 'Item ID'
//   }, {
//     field: 'name',
//     title: 'Item Name'
//   }, {
//     field: 'price',
//     title: 'Item Price'
//   }]
// })