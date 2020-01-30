//Initial Header Load//
let stacker = data.results[0].members;

let counter = '';
let locations =['one','two']
let headers = ['Name', '# of Votes', `Party Vote %`]

const headLoader = (array,locations) => {
for(let i = 0; i < locations.length; i++){
let nodeTHeadrow = document.createElement("thead");
nodeTHeadrow.setAttribute("id", `header${i}`)
document.getElementById(`${locations[i]}`).appendChild(nodeTHeadrow);

let nodeHeaderRow = document.createElement("TR");
nodeHeaderRow.setAttribute("id", `headerRow${i}`)
document.getElementById(`header${i}`).appendChild(nodeHeaderRow);

for (let j = 0; j < headers.length; j++) {
  let node = document.createElement("TH");
  let textnode = document.createTextNode(`${headers[j]}`); 
  console.log(textnode)// Create a text node
  node.appendChild(textnode);
  node.setAttribute("scope", 'col')
  document.getElementById(`headerRow${i}`).appendChild(node);
}

let nodeTBody = document.createElement("tbody");
nodeTBody.setAttribute("id", `tbody${i}`);
nodeTBody.setAttribute('class', 'table-hover');
document.getElementById(`${locations[i]}`).appendChild(nodeTBody);

}
}

headLoader(stacker,locations);

//Sorters

let sortedStack = stacker.sort(function(a, b) {
    
    return  a.total_votes * (a.votes_with_party_pct / 100)   -  b.total_votes * ( b.votes_with_party_pct / 100)
}); 


const result = stacker.filter(word => word.total_votes > 0);
console.log(stacker)
console.log(result)
let leastLoyal = result.sort(function(a, b) {
    
    return  (a.total_votes * a.votes_with_party_pct / 100 )  - (b.total_votes * b.votes_with_party_pct / 100)
}); 

let length = stacker.length * .1


//Page Loader

let pageLoader = (array, tBody) =>{

    Table = document.getElementById(tBody);
    Table.innerHTML = "";
  
    for (let i = 0; i < length; i++) {
  
      let row = document.createElement('TR'); // Create row
      row.setAttribute('scope', 'row')
      row.setAttribute('id', `${array[i].last_name}`)
  
  
      let node = document.createElement("TD");
      let textname = document.createTextNode(`${array[i].first_name}  ${array[i].last_name}`); // Create a text node Name
      node.appendChild(textname);
      node.setAttribute("id", `${array[i].last_name}`)
      row.appendChild(node);
  
      let nodetwo = document.createElement("TD");
      let textparty = document.createTextNode(`${array[i].total_votes}`); // Create a text nodetwo Total Missed
      nodetwo.appendChild(textparty);
      nodetwo.setAttribute("id", `${array[i].last_name}`)
      row.appendChild(nodetwo);
  
      let nodethree = document.createElement("TD");
      let textstate = document.createTextNode(`${array[i].votes_with_party_pct}`); // Create a text nodethree % Missed
      nodethree.appendChild(textstate);
      row.appendChild(nodethree)
  

      document.getElementById(tBody).appendChild(row);
  
    }
}

pageLoader(leastLoyal, "tbody0")
pageLoader(sortedStack.reverse(), "tbody1")



// "total_votes": 1204,
// "missed_votes": 40,
// "total_present": 1,