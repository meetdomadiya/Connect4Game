var player1 = prompt("player 1! Please Enter your name. you will be blue ");
var player1color = 'rgb(86, 151, 255)';

var player2 = prompt("player 2! Please Enter your name. you will be red ");
var player2color = 'rgb(237, 45, 73)';


var game_on = true;
var table = $('table tr');


function reportwin(rowNum,colNum){
  console.log('you won starting at this row,col');
  console.log(rowNum);
  console.log(colNum);
}


function changeColor(rowIndex,colIndex,color){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}

function reportColor(rowIndex,colIndex){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}


function checkBottom(colIndex){
  var colorReport = reportColor(5,colIndex);
  for(var i=5;i>-1;i--){
    var colorReport = reportColor(i,colIndex);
    if(colorReport === 'rgb(128, 128, 128)'){
      return i;
    }
  }
}


function colorMatchCheck(one,two,three,four){
  return (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}


function horizontalWinCheck(){
  for(var row = 0;row<6;row++){
    for(var col = 0;col<4;col++){
      if(colorMatchCheck(reportColor(row,col),reportColor(row,col+1),reportColor(row,col+2),reportColor(row,col+3))){
        console.log('horiz');
        reportwin(row,col);
        return true;
      }else{
        continue;
      }
    }
  }
}

function verticalWinCheck(){
  for(var row = 0;row<7;row++){
    for(var col = 0;col<3;col++){
      if(colorMatchCheck(reportColor(row,col),reportColor(row+1,col),reportColor(row+2,col),reportColor(row+3,col))){
        console.log('vertical');
        reportwin(row,col);
        return true;
      }else{
        continue;
      }
    }
  }
}


function diagonalWinCheck() {
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if (colorMatchCheck(reportColor(row,col), reportColor(row+1,col+1) ,reportColor(row+2,col+2), reportColor(row+3,col+3))) {
        console.log('diag');
        reportwin(row,col);
        return true;
      }else if (colorMatchCheck(reportColor(row,col), reportColor(row-1,col+1) ,reportColor(row-2,col+2), reportColor(row-3,col+3))) {
        console.log('diag');
        reportwin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}




var currentPlayer = 1;
var CurrentName = player1;
var currentColor = player1color;

$('h3').text(player1+ " it is your turn, pick a column to drop in!");
$('.board button').on('click',function(){
  var col = $(this).closest('td').index();
  var bottomAvail = checkBottom(col);
  changeColor(bottomAvail,col,currentColor);
  if(horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
    $('h1').text(currentName+" You Have Won!");
    $('h3').fadeOut('fast');
    $('h2').fadeOut('fast');
    game_on = false;
  }

  currentPlayer = currentPlayer * -1;
  if(game_on){
  if(currentPlayer === 1){
    currentName = player1;
    $('h3').text(currentName+ " it is your turn!");
    currentColor = player1color;
  }else{
    currentName = player2;
    $('h3').text(currentName+ " it is your turn!");
    currentColor = player2color;
  }

}

})
