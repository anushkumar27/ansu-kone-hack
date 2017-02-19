(function() {
  var ElevatorModelView, modelView;

  ElevatorModelView = (function() {
    function ElevatorModelView() {
      var buttons, floor, me;
      this.floors = 16;
      this.cars = [
        {
          floor: 1,
          moving: false
        }, {
          floor: 1,
          moving: false
        }, {
          floor: 1,
          moving: false
        }, {
          floor: 1,
          moving: false
        }, {
          floor: 1,
          moving: false
        }, {
          floor: 1,
          moving: false
        }
      ];
      me = this;
      buttons = ((function() {
        var j, results;
        results = [];
        for (floor = j = 16; j >= 1; floor = j += -1) {
          results.push("<div id = 'button-floor-" + floor + "' class='button-floor'>\n  <button class='button up' data-floor='" + floor + "'><div class='up'></div></button>\n  <button class='button down' data-floor='" + floor + "'><div class='down'></div></button>\n</div>");
        }
        return results;
      })()).join('');
      $('#buttons').empty().append($(buttons)).off('click').on('click', 'button', function() {
        if ($(this).hasClass('on')) {
          return;
        }
        $(this).toggleClass('on');
        return $(me).trigger('pressed', [
          {
            floor: parseInt($(this)[0].dataset.floor),
            dir: $(this).children().hasClass('up') ? 'up' : 'down'
          }
        ]);
      });
    }

    ElevatorModelView.prototype.clearButton = function(floor, dir) {
      return $("#button-floor-" + floor + " > button > div." + dir).parent().removeClass('on');
    };

    ElevatorModelView.prototype.firstIdleCar = function() {
      var car, i;
      return ((function() {
        var j, len, ref, results;
        ref = this.cars;
        results = [];
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          car = ref[i];
          if (!car.moving) {
            results.push(i + 1);
          }
        }
        return results;
      }).call(this))[0];
    };

    ElevatorModelView.prototype.closestIdleCar = function(floor) {
      var a, car, closest, i, lowest, nonmoving;
      //console.log("Finding closest car to " + floor + " from ", this.cars);
      nonmoving = (function() {
        var j, len, ref, results;
        ref = this.cars;
        results = [];
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          car = ref[i];
          if (!car.moving) {
            results.push([i + 1, Math.abs(floor - car.floor)]);
          }
        }
        return results;
      }).call(this);
      closest = nonmoving.reduce(function(a, b) {
        if (a[1] <= b[1]) {
          return a;
        } else {
          return b;
        }
      });
      lowest = (function() {
        var j, len, results;
        results = [];
        for (j = 0, len = nonmoving.length; j < len; j++) {
          a = nonmoving[j];
          if (a[1] === closest[1]) {
            results.push(a[0]);
          }
        }
        return results;
      })();
      //console.log("Closest car to " + floor + " is " + closest + " from " + nonmoving);
      return lowest[Math.floor(Math.random() * lowest.length)];
    };

    ElevatorModelView.prototype.moveCar = function(car, floor) {
      var deferred, myCars;
      myCars = this.cars;
      deferred = $.Deferred();
      if (this.cars[car - 1].moving) {
        return deferred.reject();
      }
      if (floor < 1 || floor > this.floors) {
        return deferred.reject();
      }
      this.cars[car - 1].moving = true;
      $("#elevator" + car + " .car").animate({
        bottom: ((floor - 1) * 23) + "px"
      }, {
        duration: mydelay,//500 * Math.abs(myCars[car - 1].floor - floor),
        easing: 'swing',
        complete: function() {
          myCars[car - 1].floor = floor;
          myCars[car - 1].moving = false;
          return deferred.resolve();
        }
      }).delay(75);
      $("#elevator" + car + " .car > div").animate({
        top: (-368 + floor * 23) + "px"
      }, {
        duration: mydelay,// 500 * Math.abs(myCars[car - 1].floor - floor),
        easing: 'swing'
      }).delay(75);
      return deferred;
    };

    return ElevatorModelView;

  })();

  modelView = new ElevatorModelView();

  $(modelView).on('pressed', async function(e, arg) {
    var dir, floor;
    floor = arg.floor, dir = arg.dir;
    console.log("Pressed " + floor + "-" + dir);
    console.log("in pressed func: " + modelView.cars[0].floor);
    
    var fy = modelView.closestIdleCar(floor);
    var numStops = getRandomInt(1, Math.abs(modelView.cars[fy - 1].floor - floor));
    console.log("making " + numStops + " stop to get to " + floor);
    //patience is key
    //

    var arr = new Array();
    while(arr.length < numStops){
        var randomnumber = getRandomInt(modelView.cars[fy-1].floor, floor);
        if(arr.indexOf(randomnumber) > -1) continue;
        arr.push(randomnumber);
    }

    //console.log(arr);
    bubbleSort(arr);
    //console.log(arr);
    if(floor < modelView.cars[fy-1].floor) {
      arr.reverse(); //please work.
    }
    //arr.sort();
    //await sleep(2000);
    console.log(arr);

    for(var i = 0; i < arr.length; i++) {
      /*if(numStops == 1) {
        await sleep(1000);
        modelView.moveCar(fy, 5).then(function() {
          return modelView.clearButton(floor, dir);
        });
        await sleep(6000);
      }
      else {
        modelView.moveCar(fy, 7).then(function() {
          return modelView.clearButton(floor, dir);
        });
        await sleep(6000);
      }*/
      var inout = getRandomInt(3000, 7000);
      var nextStop = arr[i];//getRandomInt(modelView.cars[fy-1].floor, floor);
      console.log("next Stop is: " + nextStop);
      mydelay = Math.abs(modelView.cars[fy - 1].floor - nextStop) * avgTimePerFloor;
      console.log("delay to destination: " + mydelay);
      var num_people = getRandomInt(1,10);
      query = 'e_id=' + fy + 
              '&curr_floor=' + modelView.cars[fy-1].floor + 
              '&dest_floor=' + floor +
              '&num_people=' + num_people + 
              '&weight='     + num_people * getRandomInt(50,100) + 
              '&rem_stops='  + (arr.length - i + 1);
      console.log("query: " + query);
      getData('insertQuery');
      await sleep(1000);
      modelView.moveCar(fy, nextStop).then(function() {
        return modelView.clearButton(floor, dir);
      });
      await sleep(mydelay); //nimation sleep = time taken for the lift to traverse
      //sleep for people to get in and out
      await sleep(inout);
      /*query = 'e_id=' + fy + 
              '&curr_floor=' + modelView.cars[fy-1].floor + 
              '&dest_floor=' + floor +
              '&num_people=' + num_people + 
              '&weight='     + num_people * getRandomInt(50,100) + 
              '&rem_stops='  + (arr.length - i + 1);
      console.log("query: " + query);
      getData('insertQuery');*/
      console.log("inout: " + inout);
    }
    console.log("finished moving");

   /*query = 'e_id=' + fy + 
            '&curr_floor=' + modelView.cars[fy-1].floor + 
            '&dest_floor=' + floor +
            '&num_people=' + num_people + 
            '&weight='     + num_people * getRandomInt(50,100) + 
            '&rem_stops='  + (arr.length - i + 1);
    console.log("query: " + query);
    getData('insertQuery');*/
    mydelay = Math.abs(modelView.cars[fy - 1].floor - nextStop) * avgTimePerFloor;
    modelView.moveCar(fy, floor).then(function() {
      return modelView.clearButton(floor, dir);
    });
    query = 'e_id=' + fy + 
            '&curr_floor=' + modelView.cars[fy-1].floor + 
            '&dest_floor=' + floor +
            '&num_people=' + num_people + 
            '&weight='     + num_people * getRandomInt(50,100) + 
            '&rem_stops='  + (arr.length - i + 1);
    console.log("query: " + query);
    await sleep(mydelay);
    getData('insertQuery');
  });

  /*
  modelView.moveCar(1, 1);
  modelView.moveCar(2, 16);
  modelView.moveCar(3, 6);
  modelView.moveCar(4, 5);
  modelView.moveCar(5, 9);
  modelView.moveCar(6, 3);
  */

}).call(this);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.ceil(Math.random() * (max - min)) + min;
}

function bubbleSort(items) {  
    var length = items.length;
    for (var i = (length - 1); i >= 0; i--) {
        //Number of passes
        for (var j = (length - i); j > 0; j--) {
            //Compare the adjacent positions
            if (items[j] < items[j - 1]) {
                //Swap the numbers
                var tmp = items[j];
                items[j] = items[j - 1];
                items[j - 1] = tmp;
            }
        }
    }
}

var mydelay = 2000;
var avgTimePerFloor = 2000;

var dataRecieved = null;
var query = '';

function getData(phpFile) {
  var xhttp,data;
  if (window.XMLHttpRequest){
    xhttp = new XMLHttpRequest();
  }
  else{
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xhttp.onreadystatechange = function ()
  {
    if(xhttp.readyState==4 && xhttp.status==200)
    {
      data = xhttp.responseText;
      if(!data.includes("Unsuccessful")){
        //console.log(data);
        dataRecieved = data;
        console.log("DATA: "+data);
      }
      else{
        console.error("Unsuccessful retrieval")
      }
    }
  };
  xhttp.open("GET","http://localhost/konehack/elevator-simulation/"+phpFile+".php?"+query.trim());
  //console.log("Query: "+query);
  xhttp.send();
}