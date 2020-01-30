//Variables//
let count = [];
let democrat = 0;
let republican = 0;
let independent = 0;
let stacked = data.results[0].members;
let demPercent = 0;
let repPercent = 0;
let indPercent = 0

for (let i = 0; i < stacked.length; i++) {
  if (stacked[i].party === 'D') {
    democrat++;
    demPercent += stacked[i].votes_with_party_pct
  }
  if (stacked[i].party === 'R') {
    republican++;
    repPercent += stacked[i].votes_with_party_pct
  }
  if (stacked[i].party === 'I') {
    independent++;
    indPercent += stacked[i].votes_with_party_pct
  }
}

demPercent = demPercent/democrat
repPercent = repPercent/republican
indPercent = indPercent/independent
//Input Object//
let glaceObject = [{
    "name": "Democrat",
    "reps": democrat,
    "percent": demPercent.toFixed(2)
  },
  {
    "name": "Republican",
    "reps": republican,
    "percent": repPercent.toFixed(2)

  }, {
    "name": "Independent",
    "reps": independent,
    "percent": indPercent.toFixed(2)
  }
]

//Loader//

const glanceLoader = (object) => {

  let headers = ['Party', '# of Reps', '% voted with Party']

  let nodeTHeadrow = document.createElement("thead");
  nodeTHeadrow.setAttribute("id", 'thead')
  document.getElementById('glance').appendChild(nodeTHeadrow);

  let nodeHeaderRow = document.createElement("TR");
  nodeHeaderRow.setAttribute("id", 'tr')
  document.getElementById('thead').appendChild(nodeHeaderRow);

  for (let i = 0; i < headers.length; i++) {

    let node = document.createElement("TH");
    let textnode = document.createTextNode(`${headers[i]}`); // Create a text node
    node.appendChild(textnode);
    node.setAttribute("scope", 'col')
    document.getElementById('tr').appendChild(node);
  }
  for (let i = 0; i < glaceObject.length; i++) {

    let row = document.createElement('TR'); // Create row
    row.setAttribute('scope', 'row')
    row.setAttribute('id', `${glaceObject[i].name}`)


    let node = document.createElement("TD");
    let textname = document.createTextNode(`${glaceObject[i].name}`); // Create a text node
    node.appendChild(textname);
    node.setAttribute("id", 'TD')
    row.appendChild(node);

    let nodetwo = document.createElement("TD");
    let textparty = document.createTextNode(`${glaceObject[i].reps}`); // Create a text nodetwo
    nodetwo.appendChild(textparty);
    nodetwo.setAttribute("id", `number_of_reps`)
    row.appendChild(nodetwo);

    let nodeThree = document.createElement("TD");
    let textpercent = document.createTextNode(`${glaceObject[i].percent}%`); // Create a text nodeThree
    nodeThree.appendChild(textpercent);
    nodeThree.setAttribute("id", `percent_with_party`)
    row.appendChild(nodeThree);

    document.getElementById('thead').appendChild(row);
  }
}

glanceLoader(glaceObject);