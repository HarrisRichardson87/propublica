var app = new Vue({
  el: '#app',
  data: {
    rowDataTwo: [],
    data: [],
    proxyurl: "https://cors-anywhere.herokuapp.com/",
    senateUrl: "http://api.propublica.org/congress/v1/113/senate/members.json",
    houseUrl: "http://api.propublica.org/congress/v1/113/house/members.json",
    url: '',
    stater:[],
    sortBox:[],
    stateBox:[]

  },
  methods: {

    //Main Fetch and Initial Array//

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
        app.stateLoad(this.data.results[0].members);
        app.check(this.data);

      }).catch(function (error) {
        console.log("request failed:" + error.message);
      });
    },

    //Filtering Checks and Select Menu//

    check: function (data) {
      let democratListen = document.getElementById("democrat");
      let republicanListen = document.getElementById("republican");
      let independentListen = document.getElementById("independent");
      let stateSelect = document.getElementById('state_select').value;
      let result = data.results[0].members.filter((member) => {
        if (stateSelect == "All States" || stateSelect == []) {
          if (democratListen.checked && member.party == "D") return member;
          else if (republicanListen.checked && member.party == 'R') return member;
          else if (independentListen.checked && member.party == 'I') return member;
          else if (!independentListen.checked && !democratListen.checked && !republicanListen.checked) return member;
        } else {
          if (member.state == stateSelect && !independentListen.checked && !democratListen.checked && !republicanListen.checked) return member;
          else if (democratListen.checked && member.party == "D" && member.state == stateSelect) return member;
          else if (republicanListen.checked && member.party == 'R' && member.state == stateSelect) return member;
          else if (independentListen.checked && member.party == 'I' && member.state == stateSelect) return member;
        }

      })
      app.rowDataTwo = result
    },

    //State Select Method//
    stateLoad: (stacked) => {
    
      for (let i = 0; i < stacked.length; i++) {
        if (app.stateBox.includes(stacked[i].state) === false) {
          app.stateBox.push(stacked[i].state);
        }
      }
      
      app.sortBox = app.stateBox.sort();
      app.sortBox.unshift('All States')
      app.stater = app.sortBox
     }

  },
  //Initial Load//
  created (){
    this.loader()
  }
});




