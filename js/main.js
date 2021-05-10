// ------------   ALERT BANNER   ------------
const alertBanner = document.getElementById("alert");

alertBanner.innerHTML = `
<div class="alert-banner">
  <p class="alert-banner-text">
    <strong>Alert:</strong> You have <strong>6</strong> overdue tasks
    to complete
  </p>
  <p class="alert-banner-close">x</p>
</div>
`;
alertBanner.addEventListener('click', e => {
  const element = e.target;
  if ( element.classList.contains("alert-banner-close") ) {
    alertBanner.style.display = "none";
  }
});



// ------------------------------------------------------------------------------
// ---------------------------- NOTIFICACTIONS ----------------------------------
// ------------------------------------------------------------------------------
var box  = document.getElementById('notifications');
var down = false;
const bellBadge = document.querySelector('.bell-badge');
const notificationsDropDown = document.querySelector('#notifications');

function toggleNotifi(){
  bellBadge.style.display = 'none';
	if (down) {
		box.style.display = 'none';
		down = false;
	}else {
		box.style.display = 'initial';
		down = true;
	}
}
notificationsDropDown.addEventListener('click', e => {
  const closeElement = e.target;
  if ( closeElement.classList.contains("notifi-item-close") ) {
    var deleteElement = closeElement.parentNode;
    deleteElement.style.display = 'none';
  }
});







// ------------   MAIN TRAFFIC CHART  ------------
// Chart.defaults.global.defaultFontColor = 'orange';
// Chart.defaults.global.defaultFontSize = 10;
const trafficCanvas = document.getElementById('traffic-chart');
const trafficNav = document.querySelector('.traffic-nav');
let trafficLinks = trafficNav.querySelectorAll('.traffic-nav-link');
const hourly = trafficNav.querySelector('.hourly');
const daily = trafficNav.querySelector('.daily');
const weekly = trafficNav.querySelector('.weekly');
const monthly = trafficNav.querySelector('.monthly');

//--------  HOURLY DATA  --------
let trafficDataHourly = {
  labels: ["12pm","2pm","4pm","6pm","8pm","10pm","12am" ],
  datasets: [{
    data: [12,18,30,34,16,44,42],
    backgroundColor: 'rgba(116, 119, 191, .3)',
    borderWidth: 1,
  }]
};
//--------  DAILY DATA  --------
let trafficDataDaily = {
  labels: ["S","M","T","W","T","F","S" ],
  datasets: [{
    data: [499,211,115,117,335,491,672],
    backgroundColor: 'rgba(116, 119, 191, .3)',
    borderWidth: 1,
  }]
};

//--------  WEEKLY DATA  --------
let trafficDataWeekly = {
  labels: ["16-22","23-29","30-5","6-12","13-19","20-26","27-3","4-10","11-17","18-24","25-31"],
  datasets: [{
    data: [750,1250,1000,2000,1500,1750,1250,1850,2250,1500,2500],
    backgroundColor: 'rgba(116, 119, 191, .3)',
    borderWidth: 1,
  }]
};

//--------  MONTHLY DATA  --------
let trafficDataMonthly = {
  labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  datasets: [{
    data: [5500,6930,8000,8200,7231,5678,5134,4111,5799,6420,7800,7111],
    backgroundColor: 'rgba(116, 119, 191, .3)',
    borderWidth: 1,
  }]
};


//--------  DEFAULT CHART  --------
let trafficOptions = {
  responsive: true,
  maintainAspectRatio: true,
  animation: {duration: 0},
  scales: {
    yAxes: [{
      ticks: {beginAtZero: true}
    }]
  },
  legend: {
    display: false
  }
};

let trafficChart = new Chart(trafficCanvas, {
  type: 'line',
  data: trafficDataWeekly,
  options: trafficOptions
});

// ACTIVE highlighter
for (var i = 0; i < trafficLinks.length; i++) {
  trafficLinks[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
// Data Display for Hourly Daily Weekly Monthly
trafficNav.addEventListener('click', (e) => {
  if ( weekly.classList.contains('active') ) {
    trafficChart.data = trafficDataWeekly;
    trafficChart.update();
  } else if (daily.classList.contains('active')) {
    trafficChart.data = trafficDataDaily;
    trafficChart.update();
  } else if (hourly.classList.contains('active')) {
    trafficChart.data = trafficDataHourly;
    trafficChart.update();
  } else if (monthly.classList.contains('active')) {
    trafficChart.data = trafficDataMonthly;
    trafficChart.update();
  }
});

// ------------   DAILY TRAFFIC CHART  ------------
const dailyCanvas = document.getElementById('daily-chart');

let dailyData = {
  labels: ["S","M","T","W","T","F","S" ],
  datasets: [{
    label: '# of Hits',
    data: [75,115,175,125,225,200,100],
    backgroundColor: '#7477BF',
    borderWidth: 1,
    barThickness: 22
  }]
};

let dailyOptions = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  },
  legend: {
    display: false
  }
};

let dailyChart = new Chart(dailyCanvas, {
  type: 'bar',
  data: dailyData,
  options: dailyOptions
});

// ------------   MOBILE USERS  ------------
const mobileCanvas = document.getElementById('mobile-chart');

let mobileData = {
  labels: ['Phones','Tablet','Desktop'],
  datasets: [{
    label: '# of Users',
    data: [500,550,2000],
    borderWidth: 0,
    backgroundColor: [
      '#51B6C8',
      '#78CF82',
      '#7477BF'
    ]
  }]
};
let mobileOptions = {
  legend: {
    position: 'right',
    labels: {
      boxWidth: 15,
      fontStyle: '400'
    }
  }
};
let mobileChart = new Chart(mobileCanvas, {
  type: 'doughnut',
  data: mobileData,
  options: mobileOptions
});




// ------------   MESSAGE USER  ------------
const user = document.getElementById('userField');
const message = document.getElementById('messageField');
const send = document.getElementById('send');

send.addEventListener('click', () => {
  // ensure user and message fields are filled out
  if (user.value === '' && message.value === '') {
    alert('Please fill out user and message fields before sending.');
  } else if (user.value === '') {
    alert('Please fill out user field before sending.');
  } else if (message.value === '') {
    alert('Please fill out message field before sending.');
  } else {
    alert(`Message successfully sent to: ${user.value}`);
  }
});


function autocomplete(inp, arr) {
  var currentFocus;
  inp.addEventListener("input", function(e) {
    var a, b, i, val = this.value;
    closeAllLists();
    if (!val) { return false;}
    currentFocus = -1;
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(a);
    for (i = 0; i < arr.length; i++) {
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        b = document.createElement("DIV");
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";


        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function(e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }


    }
  });


  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
    var x = document.getElementById(this.id + "autocomplete-list");

    if (x) x = x.getElementsByTagName("div");

    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed, increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed, decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });


  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document, except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

/*An array containing all the country names in the world:*/
var userNames = ["Juan Guillermo (me)","Victoria Chambers","Dale Byrd","Dawn Wood","Dan Oliver"];
/*initiate the autocomplete function on the "myInput" element, and pass along the userNames array as possible autocomplete values:*/
autocomplete(document.getElementById("userField"), userNames);


// ------------   TIMEZONE Function   ------------
function timezone() {
  var x, i, j, l, ll, selElmnt, a, b, c;
  /*look for any elements with the class "custom-select":*/
  x = document.getElementsByClassName("custom-select");
  l = x.length;
  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /*for each element, create a new DIV that will act as the selected item:*/
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /*for each element, create a new DIV that will contain the option list:*/
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
      /*for each option in the original select element,
      create a new DIV that will act as an option item:*/
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function(e) {
          /*when an item is clicked, update the original select box,
          and the selected item:*/
          var y, i, k, s, h, sl, yl;
          s = this.parentNode.parentNode.getElementsByTagName("select")[0];
          sl = s.length;
          h = this.parentNode.previousSibling;
          for (i = 0; i < sl; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName("same-as-selected");
              yl = y.length;
              for (k = 0; k < yl; k++) {
                y[k].removeAttribute("class");
              }
              this.setAttribute("class", "same-as-selected");
              break;
            }
          }
          h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
        /*when the select box is clicked, close any other select boxes,
        and open/close the current select box:*/
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
      });
  }
  function closeAllSelect(elmnt) {
    /*a function that will close all select boxes in the document,
    except the current select box:*/
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i);
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < xl; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }
  /*if the user clicks anywhere outside the select box,
  then close all select boxes:*/
  document.addEventListener("click", closeAllSelect);
}
timezone();
