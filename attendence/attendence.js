//Initial Header Load//
let counter = '';
let locations = ['one', 'two']
let headers = ['Name', 'No Missed Votes', `Missed Vote %`]
let count = [];
let democrat = 0;
let republican = 0;
let independent = 0;
let stacked;
let glaceObject;
let demPercent = 0;
let repPercent = 0;
let indPercent = 0;
let length;
let sortedStack;

const headLoader = (locations) => {
  for (let i = 0; i < locations.length; i++) {
    let nodeTHeadrow = document.createElement("thead");
    nodeTHeadrow.setAttribute("id", `header${i}`)
    document.getElementById(`${locations[i]}`).appendChild(nodeTHeadrow);

    let nodeHeaderRow = document.createElement("TR");
    nodeHeaderRow.setAttribute("id", `headerRow${i}`)
    document.getElementById(`header${i}`).appendChild(nodeHeaderRow);

    for (let j = 0; j < headers.length; j++) {
      let node = document.createElement("TH");
      let textnode = document.createTextNode(`${headers[j]}`);
      console.log(textnode) // Create a text node
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

headLoader(locations);
//FETCH//////
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const senateUrl = "http://api.propublica.org/congress/v1/113/senate/members.json";
const houseUrl = "http://api.propublica.org/congress/v1/113/house/members.json";
let url;

if (location.href.includes("senate")) {
  url = senateUrl
} else {
  url = houseUrl
}

function filterFunction() {
  fetch(proxyurl + url, {
    method: "GET",
    headers: {
      'X-API-Key': 'wpXHjG2BpCVmtW4PyIQZXxmhf97lTRwdA5NtC3dh'
    }
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    }
    throw new Error(res.statusText);

  }).then(function (json) {
    let data = json;
    return data;

  }).then(function (data) {
    stacker = data.results[0].members;
    sortedStack = stacker.sort(function (a, b) {
      return (a.total_votes * a.missed_votes_pct / 100) - (b.total_votes * b.missed_votes_pct / 100)
    });
    length = stacker.length * .1

    pageLoader(sortedStack, "tbody1")
    pageLoader(sortedStack.reverse(), "tbody0")

    for (let i = 0; i < stacker.length; i++) {
      if (stacker[i].party === 'D') {
        democrat++;
        demPercent += stacker[i].votes_with_party_pct
      }
      if (stacker[i].party === 'R') {
        republican++;
        repPercent += stacker[i].votes_with_party_pct
      }
      if (stacker[i].party === 'I') {
        independent++;
        indPercent += stacker[i].votes_with_party_pct
      }
    }

    demPercent = demPercent / democrat
    repPercent = repPercent / republican
    if (independent == 0) {
      indPercent = 0
    } else {
      indPercent = indPercent / independent
    }
    //Input Object//
    glanceObject = [{
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
    ];
    glanceLoader(glanceObject);

  }).catch(function (error) {
    console.log("request failed:" + error.message);
  });
}

filterFunction();

///Main Loader//

let pageLoader = (array, tBody) => {

  Table = document.getElementById(tBody);
  Table.innerHTML = "";

  let length = array.length * 0.1

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
    let textparty = document.createTextNode(`${array[i].missed_votes}`); // Create a text nodetwo Total Missed
    nodetwo.appendChild(textparty);
    nodetwo.setAttribute("id", `${array[i].missed_votes}`)
    row.appendChild(nodetwo);

    let nodethree = document.createElement("TD");
    let textstate = document.createTextNode(`${array[i].missed_votes_pct}%`); // Create a text nodethree % Missed
    nodethree.appendChild(textstate);
    row.appendChild(nodethree)

    document.getElementById(tBody).appendChild(row);

  }
}
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
  for (let i = 0; i < object.length; i++) {

    let row = document.createElement('TR'); // Create row
    row.setAttribute('scope', 'row')
    row.setAttribute('id', `${object[i].name}`)


    let node = document.createElement("TD");
    let textname = document.createTextNode(`${object[i].name}`); // Create a text node
    node.appendChild(textname);
    node.setAttribute("id", 'TD')
    row.appendChild(node);

    let nodetwo = document.createElement("TD");
    let textparty = document.createTextNode(`${object[i].reps}`); // Create a text nodetwo
    nodetwo.appendChild(textparty);
    nodetwo.setAttribute("id", `number_of_reps`)
    row.appendChild(nodetwo);

    let nodeThree = document.createElement("TD");
    let textpercent = document.createTextNode(`${object[i].percent}%`); // Create a text nodeThree
    nodeThree.appendChild(textpercent);
    nodeThree.setAttribute("id", `percent_with_party`)
    row.appendChild(nodeThree);

    document.getElementById('thead').appendChild(row);
  }
};