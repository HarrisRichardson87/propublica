
//FETCH//////
var app = new Vue({
  el: "#app",
  data: {
    glance: [],
    sorted: [],
    leastLoyal: [],
    stacked: [],
    glanceObject: [{
      'name': "Democrat",
      'reps': 0,
      'percent': 0
    },
    {
      "name": "Republican",
      "reps": 0,
      "percent": 0

    }, {
      "name": "Independent",
      "reps": 0,
      "percent":0 
    }],
    proxyurl: "https://cors-anywhere.herokuapp.com/",
    senateUrl: "http://api.propublica.org/congress/v1/113/senate/members.json",
    houseUrl: "http://api.propublica.org/congress/v1/113/house/members.json",
    length: 0,
    url: '',
  },
  methods: {

    //Main Loader//
    loader: function () {
      if (location.href.includes("senate")) {
        this.url = this.senateUrl
      } else {
        this.url = this.houseUrl
      }
      fetch(this.proxyurl + this.url, {
        method: "GET",
        headers: {
          'X-API-Key': 'wpXHjG2BpCVmtW4PyIQZXxmhf97lTRwdA5NtC3dh'
        }
      }).then(function (res) {
        if (res.ok) {
          return res.json();
        }

      }).then(function (json) {
        this.data = json;
        console.log(this.data)
        app.objector(this.data.results[0].members)
        app.loyalty(this.data.results[0].members)
        console.log(app.leastLoyal)

      }).catch(function (error) {
        console.log("request failed:" + error.message);
      });
    },

    //Loyalty Calculations//
    loyalty: function (stacker) {
      let max = 1200;
      if (location.href.includes("senate")) {
        max = 600;
      }
     const result = stacker.filter(word => word.total_votes > max);
      app.leastLoyal = result.sort(function (a, b) {
            return b.total_votes * b.votes_with_party_pct / 100 - a.total_votes * a.votes_with_party_pct / 100
           })
      let length = stacker.length * .1
      app.sorted = app.leastLoyal.slice(0, length)
      app.leastLoyal = app.leastLoyal.slice(Math.max(app.leastLoyal.length - length, 0)).reverse()
    
    },
    
    //At a Glance//
    objector: function (stacker) {

      for (let i = 0; i < stacker.length; i++) {
        if (stacker[i].party === 'D') {
          app.glanceObject[0].reps ++;
          app.glanceObject[0].percent += stacker[i].votes_with_party_pct
        }
        if (stacker[i].party === 'R') {
          app.glanceObject[1].reps ++;
          app.glanceObject[1].percent += stacker[i].votes_with_party_pct
        }
        if (stacker[i].party === 'I') {
          app.glanceObject[2].reps++;
          app.glanceObject[2].percent += stacker[i].votes_with_party_pct
        }
      }
      app.glanceObject[0].percent = app.glanceObject[0].percent / app.glanceObject[0].reps
      app.glanceObject[0].percent = app.glanceObject[0].percent.toFixed(2)
      app.glanceObject[1].percent = app.glanceObject[1].percent / app.glanceObject[1].reps
      app.glanceObject[1].percent = app.glanceObject[1].percent.toFixed(2)
      
      if (app.glanceObject.independent == 0) {
        app.glanceObject[2].percent = 0
      } else {
        app.glanceObject[2].percent = app.glanceObject[2].percent / app.glanceObject[1].reps 
        app.glanceObject[2].percent = app.glanceObject[2].percent.toFixed(2)
      }
  
    },
  },

  //Initial Loader//

  created() {
    this.loader()
  }
});


