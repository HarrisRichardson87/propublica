// let data;
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
    stater(data.results[0].members)
    return data;

  }).then(function (data) {
    checker(data);

  }).catch(function (error) {
    console.log("request failed:" + error.message);
  });
}
filterFunction();



function checker(data) {
  let democratListen = document.getElementById("democrat");
  let republicanListen = document.getElementById("republican");
  let independentListen = document.getElementById("independent");
  let stateSelect = document.getElementById('state_select').value;
  let result = data.results[0].members.filter((member) => {
    if (stateSelect == "All States") {
      if (democratListen.checked && member.party == "D") return member;
      if (republicanListen.checked && member.party == 'R') return member;
      if (independentListen.checked && member.party == 'I') return member;
      if (!independentListen.checked && !democratListen.checked && !republicanListen.checked) return member;
    } else {
      if (member.state == stateSelect && !independentListen.checked && !democratListen.checked && !republicanListen.checked) return member;
      if (democratListen.checked && member.party == "D" && member.state == stateSelect) return member;
      if (republicanListen.checked && member.party == 'R' && member.state == stateSelect) return member;
      if (independentListen.checked && member.party == 'I' && member.state == stateSelect) return member;
    }
  })
  pageLoader(result)
}

const stater = (stacked) => {
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
}
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