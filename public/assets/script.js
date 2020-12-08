    'use strict';
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let date = new Date();
 

    let clock = document.querySelector('#clock');
    let dayOfTheMonth = document.querySelector("#day-of-the-month");
    let dayOfTheWeek = document.querySelector("#day-of-the-week");

    let examTime = document.querySelector('#exam-goal').children[0];
    let programmingTime = document.querySelector('#programming-goal').children[0];
    let examDebt = document.querySelector('#exam-debt').children[0];
    let programmingDebt = document.querySelector('#programming-debt').children[0];

    let noticeWindow = document.querySelector('#notice-window');
    
    let chosen = null;
   let chosenTime = null;


    function timing (cancCalc) {
       let hours = date.getHours();
    let mins = date.getMinutes();
    if (hours == 0 && mins == 0) putDate(); //verify
    if (mins.toString().length < 2) mins = '0' + mins;
    clock.innerHTML = hours + ':' + mins;

    if (chosen && cancCalc) {
       chosenTime.innerHTML = chosenTime.innerHTML - 1;
       if (chosenTime.innerHTML == 0) {
         //alert(chosen + ' completed');
         noticeWindow.hidden = false;
         noticeWindow.innerHTML = chosen + ' completed';
         // chosen = null;
         // chosenTime = null;
                }

    }
    }
    let t = setInterval(timing, 60000, true);
    timing();

    function putDate() {
    let day = days[date.getDay()];
    let data = date.getDate();
    if (data.toString().length < 2) data = '0' + data;
    dayOfTheMonth.innerHTML = data;  
    dayOfTheWeek.innerHTML = day + ', ';
    }
    putDate();

    function loadingHoursAndDebts() {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', '/getInfo');
            xhr.send();
            xhr.onload = function (data) {
                if (xhr.status !== 200) throw Error ('watch error in loadingHoursAndDebts()');
                else {
                let res = JSON.parse(xhr.response);
                examTime.innerHTML = res[0].todayTimeForExam;
                programmingTime.innerHTML = res[0].todayTimeForProgramming;
                examDebt.innerHTML = res[1].examTimeDebt;
                programmingDebt.innerHTML = res[1].programmingTimeDebt;
                        }
        }
    }
    loadingHoursAndDebts();

   function choose(g) {
chosen  = g;
chosenTime  = document.querySelector('#'+chosen).children[0];
   }

   function stopF() {
      chosen = null;
      chosenTime = null;
   }

   function saveF() {
      if (+examTime.innerHTML < 0 && +examDebt.innerHTML > 0) {
         examDebt.innerHTML = Math.max(0, examDebt.innerHTML - Math.abs(examTime.innerHTML));
         examTime.innerHTML =  0;
      }
      if (+programmingTime.innerHTML < 0 && +programmingDebt.innerHTML > 0) {
         programmingDebt.innerHTML = Math.max(0, programmingDebt.innerHTML - Math.abs(programmingTime.innerHTML));
         programmingTime.innerHTML =  0;
      }

      let data = {
         examTime: examTime.innerHTML,
         programmingTime: programmingTime.innerHTML, 
         examDebt : examDebt.innerHTML, 
         programmingDebt: programmingDebt.innerHTML
      };

      data = JSON.stringify(data);
      console.log(data);
      let xhr = new XMLHttpRequest();
      xhr.open('POST', '/saveInfo');
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(data);
      xhr.onload = function (data) {
          if (xhr.status !== 200) throw Error ('watch error in saveF()');
          else {
        console.log('saved successfully');
                  }
  }
   }

  function newDayF() {
   examTime.innerHTML = 180;
   programmingTime.innerHTML = 360;
   stopF();
   saveF();
  }

  window.onunload = function () {
     console.log(32424)
   saveF();
 }

//  window.onunload = function () {
//    if (+examTime.innerHTML < 0 && +examDebt.innerHTML > 0) {
//       examDebt.innerHTML = Math.max(0, examDebt.innerHTML - Math.abs(examTime.innerHTML));
//       examTime.innerHTML =  0;
//    }
//    if (+programmingTime.innerHTML < 0 && +programmingDebt.innerHTML > 0) {
//       programmingDebt.innerHTML = Math.max(0, programmingDebt.innerHTML - Math.abs(programmingTime.innerHTML));
//       programmingTime.innerHTML =  0;
//    }

//    let data = {
//       examTime: examTime.innerHTML,
//       programmingTime: programmingTime.innerHTML, 
//       examDebt : examDebt.innerHTML, 
//       programmingDebt: programmingDebt.innerHTML
//    };

//    data = JSON.stringify(data);
//    console.log(data)
//    navigator.sendBeacon('/saveInfo', data);
//  }

 

