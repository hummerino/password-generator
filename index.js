const _defaultOption = {
  minLen      : 4,
  maxLen      : 8,
  number      : true,
  character   : true,
  specialChar : true
};


let _randomIntFromInterval = (min,max) => Math.floor( Math.random() * (max-min+1) + min ); //Max and min included

/*
*
*
*
*/
const _isInteger = ( n, def = 0 ) => !isNaN(parseInt(n)) && isFinite(n) ? n : def;

/*
*
*
*
*/
const _isBoolean = (b, def = false ) => {
    var str = String(b);
    return str === "true" ? true : str === "false" ? false : def;
  };


/*
*
*
*
*/
let _validStringCharacters = (number, character, specialChar) => {
  var isNumber  = (n) => n >= 48 && n <= 57; // [ 0...9 ] -> 10char
  var isChar    = (c) => ( c >= 65 && c <= 90 ) || ( c >= 97 && c <= 122 ); // [A...Z] AND [a...z]  -> 52char
  var isSpecial = (s) => ( s >= 33 && s <= 47 ) || ( s >= 58 && s <= 64 ) || ( s >= 91 && s <= 96 ) || ( s >= 123 && s <= 126 ) // 32char

  //Generate random string with all selected type character
  //All char = 94
  var len = 94 - ( number == false ? 10 : 0 ) - ( character == false ? 52 : 0 ) - ( specialChar == false ? 32 : 0 );

  //IN ASCII table from 33 to 126
  var str = "", i = 0;
  while( i < len ){
    //generate value
    const c =  _randomIntFromInterval(33, 126);
    if ( ( isNumber(c) && number == true ) || ( isChar(c) && character == true ) || ( isSpecial(c) && specialChar == true ) ){
      str += String.fromCharCode(c);
      ++i;
    }
  }
  return str;
}


/*
* 
*
*
*/
const _generate = ( option = _defaultOption ) => {
  if( typeof option !== 'function' )
    option = _defaultOption;

  const
    minLen      = Math.abs( _isInteger( option["minLen"] , _defaultOption["minLen"] ) ),
    maxLen      = Math.abs( _isInteger( option["maxLen"] , _defaultOption["maxLen"] ) ),
    number      = _isBoolean( option["number"]      , _defaultOption["number"]      ),
    character   = _isBoolean( option["character"]   , _defaultOption["character"]   ),
    specialChar = _isBoolean( option["specialChar"] , _defaultOption["specialChar"] );

  //Max between minLen and maxLen
  if( maxLen < minLen ){
    var tmp = maxLen;
    maxLen = minLen;
    minLen = tmp;
  }

  //GENERATE LENGHT
  const pswLen = ( maxLen === minLen ) ? maxLen : _randomIntFromInterval( minLen, maxLen );
  const values    = _validStringCharacters(number, character, specialChar);
  const valuesLen = values.length;
  var psw = "";

  var ___nerrori = 0;
  for( var i = 0 ; i < pswLen ; i++ )
      psw += values[ _randomIntFromInterval(0, valuesLen-1) ];

  return psw;
}


module.exports = {
    generate      : _generate,
    defaultOption : _defaultOption
}
