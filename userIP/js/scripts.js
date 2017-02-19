//Data from the DB
var dataRecieved ="";
//Query to send to DB

// Functon to get data from DB
function getData(floor) {
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
				dataRecieved = data;
			}
			else{
				console.error("Unsuccessful retrieval")
			}
		}
	};
	xhttp.open("GET","http://192.175.5.204/konehack/elevator-simulation/query.php?floor="+floor,false);
	xhttp.send();
}


	var timeoutID = null;
	var prevFloor = 0;
function getFloorInfo(floor) {

	if(prevFloor != floor){
		prevFloor = floor;
		init();
	}

	getData(floor);
	var floorData = JSON.parse(dataRecieved);
	console.log(floorData);
	var myETA = 0;
	if(floorData.length > 3){
		for(var i = 0; i < 3; i++){
		myETA += calcETA(convertDate(floorData[i]['timestamp']) ,convertDate(floorData[i+1]['timestamp'])) / Math.abs( floorData[i]['curr_floor'] - floorData[i+1]['curr_floor']);
		}
		myETA /= 2;
		myETA *= Math.abs(floorData[0]['dest_floor'] -  floorData[0]['curr_floor']);

		if(floorData[0]['dest_floor'] >  floorData[0]['curr_floor']){
			updateInfo(floorData[0]['e_id'], ((myETA/1000)) + " secs", 10 - floorData[0]['num_people'], "up", "yeah");
		}else{
			updateInfo(floorData[0]['e_id'], ((myETA/1000)) + "sec", 10 - floorData[0]['num_people'], "down", "yeah");
		}
	}
	else if(floorData.length > 0){
		updateInfo(floorData[0]['e_id'], "-", 10 - floorData[0]['num_people'], null, "yeah");
	}

	if(timeoutID){
		clearTimeout(timeoutID);
	}

	timeoutID = setTimeout(function() {
		poll(floor);
	}, 100);
}

function poll(floor){
	getFloorInfo(floor);
}

function convertDate(x){
	var t = x.toString().split(/[- :]/);
	return new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
}

function calcETA(d1 ,d2){
	return Math.abs(d1-d2);  // difference in milliseconds
}

init();
function init(){
	updateInfo(1, "-", "-");
	updateInfo(2, "-", "-");
	updateInfo(3, "-", "-");
	updateInfo(4, "-", "-");
	updateInfo(5, "-", "-");
	updateInfo(6, "-", "-");
}

function updateInfo(eid, eta, vac, btn, active){

	document.getElementById(eid+"_eta").innerHTML = eta;

	document.getElementById(eid+"_eta").innerHTML = eta;
	document.getElementById(eid+"_vac").innerHTML = vac;
	if(btn != null){
		document.getElementById(eid+"_"+btn).className = "btn btn-info btn-lg btn-block active";
	}else{
		document.getElementById(eid+"_up").className = "btn btn-info btn-lg btn-block";
		document.getElementById(eid+"_down").className = "btn btn-info btn-lg btn-block";
	}

	if(active != null){
		document.getElementById(eid+"_eCol").className = "col-md-2 active";
	}else{
		document.getElementById(eid+"_eCol").className = "col-md-2";
	}
}