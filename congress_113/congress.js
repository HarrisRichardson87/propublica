// let data;
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const senateUrl = "http://api.propublica.org/congress/v1/113/senate/members.json";
const houseUrl = "http://api.propublica.org/congress/v1/113/house/members.json";
let url;
let data;
let loaderTwo;
var app = new Vue({
  el: '#two',
  data: {
    rowDataTwo: []
  }

})

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
    data = json;
    stater(data.results[0].members);
    return data;

  }).then(function (data) {
    checker(data);


  }).catch(function (error) {
    console.log("request failed:" + error.message);
  });
}

filterFunction();

function checker(data) {
  console.log(data, "checker front")
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
  console.log(result, "checker back")

  app.rowDataTwo = result




};

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
};