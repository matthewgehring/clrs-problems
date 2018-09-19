//TODO:  Consider using counter instead of process.hrtime, if counter > max acceptable incriments {increase granularity}
//data from problem statement
var time = [
  {unit : "second", value: 1},
  {unit : "minute", value: 1},
  {unit : "hour", value: 1},
  {unit : "day", value: 1},
  {unit : "month", value: 1},
  {unit : "year", value: 1},
  {unit : "century", value: 1}
];
//empty array to store solution
var solution = [
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  []
];
//logic used to convert units and values from problem statement into microseconds
function selectUnitMultiplier(unit){
  var multiplier = 0;
  var newUnit = "";
  if(unit == "second"){
    multiplier = 1000000;
    newUnit = "microsecond";
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
//updates time array with converted results
function convertToMicroseconds(time){
  var update = [];
  while (!(time.unit == "microsecond")){
    update = selectUnitMultiplier(time.unit);
    time.value *= update[0];
    time.unit = update[1];
  };
}
//calls function for each element in time array
time.forEach(function(time){
  convertToMicroseconds(time);
});
//initializes set of functions to calculate make problem size
var array_of_functions = [
    {funct: function calculateSqrtN(n){
      return Math.sqrt(n);
    }, granularity: 1000000000000},
    {funct: function calculateN(n){
      return n;
    }, granularity: 1000000},
    {funct: function calculateNlogN(n){
      return (n * Math.log2(n));
    }, granularity: 100000},
    {funct: function CalculateNSquared(n){
      return n*n;
    }, granularity: 1},
    {funct: function calculateNCubed(n){
      return Math.pow(n, 3);
    }, granularity: 1},
    {funct: function calculateTwoToN(n){
      return Math.pow(2, n);
    }, granularity: 1},
    {funct: function calculateNfactorial(n){
      var rval = 1;
      for (var i = 2; i <= n; i++)
          rval = rval * i;
      return rval;
    }, granularity: 1}
]

// function runTimeCalc(granularity){
//   var n = 0;
//   for (x = 0; x < time.length; x++){
//     while(array_of_functions[y](n) <= time[x].value){
//       n += granularity;
//     }
//     return n;
//   }
// }

function clock(start) {
    if ( !start ) return process.hrtime();
    var end = process.hrtime(start);
    return Math.round((end[0]*1000) + (end[1]/1000000));
}


//gives solution to first function, would be too long to calculate with other method, might revist this
for (x = 0; x < time.length; x++){
  solution[0][x] = "2 to the power of " + time[x].value.toString();
};

//loops through function array, calculates problem size
for (y = 0; y < array_of_functions.length; y++) {
  for (x = 0; x < time.length; x++){
    var n = 1;
    var start = clock();
    while(array_of_functions[y].funct(n) <= time[x].value){
      n += array_of_functions[y].granularity;
    }

    var duration = clock(start);
    if (duration >= 500){
      array_of_functions[y].granularity *= array_of_functions[y].granularity;
    }
    console.log("Took "+duration+"ms " + array_of_functions[y].granularity);
    solution[y+1][x] = n-1;
  }
}

console.log(solution);
console.log(process.hrtime());
