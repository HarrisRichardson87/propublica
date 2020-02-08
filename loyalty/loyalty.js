//Variables//
let counter = '';
let count = [];
let democrat = 0;
let republican = 0;
let independent = 0;
let stacked;
let glaceObject;
let sortedStack;
let stacker;
let demPercent = 0;
let repPercent = 0;
let indPercent = 0;
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const senateUrl = "http://api.propublica.org/congress/v1/113/senate/members.json";
const houseUrl = "http://api.propublica.org/congress/v1/113/house/members.json";
let url;
let length;

//FETCH//////

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
      
      return a.total_votes * a.votes_with_party_pct / 100 - b.total_votes * b.votes_with_party_pct / 100
    });
    
    const result = stacker.filter(word => word.total_votes > 0);

    
    
    let leastLoyal = result.sort(function (a, b) {
      
      return a.total_votes * a.votes_with_party_pct / 100 - b.total_votes * b.votes_with_party_pct / 100
    });
    
    length = stacker.length * .1
    leastLoyal = leastLoyal.slice(0,length);
    
    sortedStack = sortedStack.reverse().slice(0, length);
    
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
      rowData:leastLoyal
    }
  })
  var loaderTwo = new Vue({
    el:'#two',
    data:{
      rowData: sortedStack
    }
  });
  
  
}).catch(function (error) {
  console.log("request failed:" + error.message);
});
}

filterFunction();
