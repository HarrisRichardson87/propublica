//FETCH//////
var app = new Vue({
  el: "#app",
  data: {
    glance: [],
    bestAttendence: [],
    worstAttendence: [],
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
        app.attendence(this.data.results[0].members)
        app.objector(this.data.results[0].members)

      }).catch(function (error) {
        console.log("request failed:" + error.message);
      });
    },

    //Attendence Calculations//
    attendence: function (stacker) {
      console.log('attendence')
      let filtered = stacker.filter(member => member.total_votes > 50)
      app.sortedStack = filtered.sort(function (a, b) {
        return (a.total_votes * a.missed_votes_pct / 100) - (b.total_votes * b.missed_votes_pct / 100)
      });
      let length = stacker.length * .1
      app.revSortedStack = app.sortedStack.slice(Math.max(app.sortedStack.length - length, 0))
      app.sortedStack = app.sortedStack.slice(0, length);
      app.worstAttendence = app.revSortedStack.reverse()
      app.bestAttendence = app.sortedStack
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
