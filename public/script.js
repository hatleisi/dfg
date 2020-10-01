/**var count=10;

var counter=setInterval(timer, 1000); //1000 will  run it every 1 second

function timer()
{ count=count-1;
  if (count <= 0)
  {
     clearInterval(counter);
    document.getElementById("timer").innerHTML = "Finish";
     //counter ended, do something here
     return;
  }
  // showing seconds
 document.getElementById("timer").innerHTML=count + " secs";
 console.log(timer);
}
**/

// time input by user
var time = parseInt(document.getElementById("tim").value);

function startCountdown() {
  time = parseInt(document.getElementById("tim").value);

  // run every 1 second
  var countTimer = setInterval(countDown, 1000);
}

function countDown() {
  console.log(countDown);
  console.log(time);

  // Count down by 1
  time = time - 1;
  console.log("t=" + time);

  //show "Finished" when finished
  if (time < 0) {
    clearInterval(countDown);
    document.getElementById("time").innerHTML = "Finished";
    console.log(clearInterval);
    return;
  }

  // Display result time
  document.getElementById("time").innerHTML = "0:" + time;
}
