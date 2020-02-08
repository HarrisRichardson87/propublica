//Initial Header Load//
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
let revSortedStack;

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
    let filtered = stacker.filter(member => member.total_votes > 50)
    sortedStack = filtered.sort(function (a, b) {

      return (a.total_votes * a.missed_votes_pct / 100) - (b.total_votes * b.missed_votes_pct/ 100)
    });
    length = stacker.length * .1
    revSortedStack = sortedStack.slice(Math.max(sortedStack.length - length, 1))
    
    sortedStack = sortedStack.slice(0,length);
    
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
    var app = new Vue({
      el: '#glance',
      data: {
        rowData: glanceObject 
      }
    });
    var loaderOne = new Vue({
      el:'#one',
      data:{
        rowData:revSortedStack.reverse()
      }
    })
    var loaderTwo = new Vue({
      el:'#two',
      data:{
        rowDataTwo: sortedStack
      }
    });

  }).catch(function (error) {
    console.log("request failed:" + error.message);
  });
}

filterFunction();


