var time = [
  {unit : "second", value: 1},
  {unit : "minute", value: 1},
  {unit : "hour", value: 1},
  {unit : "day", value: 1},
  {unit : "month", value: 1},
  {unit : "year", value: 1},
  {unit : "century", value: 1}
];

function selectUnitMultiplier(unit){
  var multiplier = 0;
  var newUnit = "Foo";
  if(unit == "second"){
    multiplier = 1000;
    newUnit = "milisecond";
  }else if (unit == "minute") {
    multiplier = 60;
    newUnit = "second";
  }else if (unit == "hour") {
    multiplier = 60;
    newUnit = "minute";
  }else if (unit == "day") {
    multiplier = 24;
    newUnit = "hour";
  }else if (unit == "month") {
    multiplier = 31;
    newUnit = "day";
  }else if (unit == "year") {
    multiplier = 365;
    newUnit = "day";
  }else if (unit == "century") {
    multiplier = 100;
    newUnit = "year";
  }
  return [multiplier, newUnit];
}

function convertToMiliseconds(time){
  var update = [];
  while (!(time.unit == "milisecond")){
    update = selectUnitMultiplier(time.unit);
    time.value *= update[0];
    time.unit = update[1];
  };
}

console.log(time);
time.forEach(function(time){
  convertToMiliseconds(time);
});
console.log(time);
