
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

ctx.fillStyle = "#191970";
ctx.fillRect(0, 0, canvas.width, canvas.height);

var drawLine = function(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.closePath();
  ctx.stroke();
};

//横と縦 ボックスの入る数
let HorizontalNumber = 10
let VerticalNumber = 15

let Tetris = new Array(3)
let BoxPotionParts = new Array(3)//記憶しておく
let BoxPotion = new Array(3)
      
  for (i = 0; i < HorizontalNumber + 1; i++) {
      Tetris[i] = new Array(3);
      BoxPotionParts[i] = new Array(3);
      BoxPotion[i] = new Array(3)
  }

  for (i = 0; i < HorizontalNumber; i++) {
      for (j = 0; j < VerticalNumber; j++) {
          Tetris[i][j] = 0;
          BoxPotionParts[i][j] = 0;
          BoxPotion[i][j] = 0
      }
  }


  // 初期配置
  // for(j = 12; j < 14; j++){
  //   for(i = 0; i < 10; i++){
  //     Tetris[i][j] = 1
  //   }
  // }



let time = 0;
let BoxWidth = 50
let Boxheight = 50

BoxPotion[4][3] = 1
Type = 't' //「0～6」四角o、やまt、S字s、Sじのぎゃくz、Lzi、L字のぎゃくj、ながいやつi
direction = 0 //0北 1東 2南 3西

let lineWidth = 100

let dontPushw = 0
let dontPusha = 0
let dontPushs = 0
let dontPushd = 0



let ijNumber = 0
let ijNumberParts = 0



//何行何列に入ってるか帰すやつ
function ReturnMatrix(matrix){

  let index0 = 0
  let index1 = new Array(1)
 

  for (i = 0; i < 10; i++) {
    for (j = 0; j < 15; j++) {
    
      if(matrix[i][j] == 1){
        index1[index0] = i
        index0++

        index1[index0] = j
        index0++
      }
    
    }
  }

return index1

}

let ijNumberP

function MoveParts(x,y,z){ //下、左、右
  if(x == 1){
    if(ijNumber[1] >= 14){
      BoxPotion[ijNumber[0]][ijNumber[1]] = 0
      BoxPotion[ijNumber[0]][ijNumber[1] - 1] = 1
    }

    for(i = 0; i < ijNumber.length / 2; i++){
      console.log(ijNumberP[2 * i])
      if(Tetris[ijNumberP[2 * i]][ijNumberP[2 * i + 1]] == 1){
        BoxPotion[ijNumber[0]][ijNumber[1]] = 0
        BoxPotion[ijNumber[0] + 1][ijNumber[1]] = 1
        break
      }
    }

  }
  if(y == 1){
    if(ijNumber[0] <= 0){
      BoxPotion[ijNumber[0]][ijNumber[1]] = 0
      BoxPotion[ijNumber[0] + 1][ijNumber[1]] = 1
    }
  }
  if(z == 1){
    if(ijNumber[0] >= 9){
      BoxPotion[ijNumber[0]][ijNumber[1]] = 0
      BoxPotion[ijNumber[0] - 1][ijNumber[1]] = 1
    }
  }
}


//TypeをBoxPotionに書き込む
function WriteType(){
  ijNumber = ReturnMatrix(BoxPotion)

  if(Type == 'o'){ //山なら
      BoxPotionParts[ijNumber[0]    ][ijNumber[1] - 1] = 1
      BoxPotionParts[ijNumber[0] + 1][ijNumber[1] - 1] = 1
      BoxPotionParts[ijNumber[0] + 1][ijNumber[1]    ] = 1
      
  }

  if(Type == 't'){ //山なら
    
    if(direction == 0){ //北向き
      

      MoveParts(0,1,1)

      BoxPotionParts[ijNumber[0]    ][ijNumber[1] - 1] = 1
      BoxPotionParts[ijNumber[0] + 1][ijNumber[1]    ] = 1
      BoxPotionParts[ijNumber[0] - 1][ijNumber[1]    ] = 1
    }
    if(direction == 1){ //東向き
      
      MoveParts(1,0,1)

      BoxPotionParts[ijNumber[0]    ][ijNumber[1] - 1] = 1
      BoxPotionParts[ijNumber[0]    ][ijNumber[1] + 1] = 1
      BoxPotionParts[ijNumber[0] + 1][ijNumber[1]    ] = 1
    }
    if(direction == 2){ //南向き
      
      MoveParts(1,1,1)
      
      ijNumber = ReturnMatrix(BoxPotion)

      BoxPotionParts[ijNumber[0]    ][ijNumber[1] + 1] = 1
      BoxPotionParts[ijNumber[0] - 1][ijNumber[1]    ] = 1
      BoxPotionParts[ijNumber[0] + 1][ijNumber[1]    ] = 1
    }
    if(direction == 3){ //西向き
      
      MoveParts(1,1,0)

      BoxPotionParts[ijNumber[0]    ][ijNumber[1] + 1] = 1
      BoxPotionParts[ijNumber[0] - 1][ijNumber[1]    ] = 1
      BoxPotionParts[ijNumber[0]    ][ijNumber[1] - 1] = 1
    }
  }

  if(Type == 's'){ //山なら
    if(direction == 0 || direction == 2){ //北向き
      ijNumber = ReturnMatrix(BoxPotion)

      BoxPotionParts[ijNumber[0]    ][ijNumber[1] - 1] = 1
      BoxPotionParts[ijNumber[0] + 1][ijNumber[1] - 1] = 1
      BoxPotionParts[ijNumber[0] - 1][ijNumber[1]    ] = 1
    }
    if(direction == 1 || direction == 3){ //東向き
      ijNumber = ReturnMatrix(BoxPotion)

      BoxPotionParts[ijNumber[0]    ][ijNumber[1] - 1] = 1
      BoxPotionParts[ijNumber[0] + 1][ijNumber[1]    ] = 1
      BoxPotionParts[ijNumber[0] + 1][ijNumber[1] + 1] = 1
    }
  }

  if(Type == 'z'){ //山なら
    if(direction == 0 || direction == 2){ //北向き
      ijNumber = ReturnMatrix(BoxPotion)

      BoxPotionParts[ijNumber[0]    ][ijNumber[1] - 1] = 1
      BoxPotionParts[ijNumber[0] - 1][ijNumber[1] - 1] = 1
      BoxPotionParts[ijNumber[0] + 1][ijNumber[1]    ] = 1
    }
    if(direction == 1 || direction == 3){ //東向き
      ijNumber = ReturnMatrix(BoxPotion)

      BoxPotionParts[ijNumber[0] + 1][ijNumber[1] - 1] = 1
      BoxPotionParts[ijNumber[0] + 1][ijNumber[1]    ] = 1
      BoxPotionParts[ijNumber[0]    ][ijNumber[1] + 1] = 1
    }
  }

  if(Type == 'j'){ //山なら
    if(direction == 0){ //北向き
      ijNumber = ReturnMatrix(BoxPotion)

      BoxPotionParts[ijNumber[0] - 1][ijNumber[1] - 1] = 1
      BoxPotionParts[ijNumber[0] + 1][ijNumber[1]    ] = 1
      BoxPotionParts[ijNumber[0] - 1][ijNumber[1]    ] = 1
    }
    if(direction == 1){ //東向き
      ijNumber = ReturnMatrix(BoxPotion)

      BoxPotionParts[ijNumber[0] + 1][ijNumber[1] - 1] = 1
      BoxPotionParts[ijNumber[0]    ][ijNumber[1] - 1] = 1
      BoxPotionParts[ijNumber[0]    ][ijNumber[1] + 1] = 1
    }
    if(direction == 2){ //南向き
      ijNumber = ReturnMatrix(BoxPotion)

      BoxPotionParts[ijNumber[0] - 1][ijNumber[1]    ] = 1
      BoxPotionParts[ijNumber[0] + 1][ijNumber[1]    ] = 1
      BoxPotionParts[ijNumber[0] + 1][ijNumber[1] + 1] = 1
    }
    if(direction == 3){ //西向き
      ijNumber = ReturnMatrix(BoxPotion)

      BoxPotionParts[ijNumber[0]    ][ijNumber[1] + 1] = 1
      BoxPotionParts[ijNumber[0] - 1][ijNumber[1] + 1] = 1
      BoxPotionParts[ijNumber[0]    ][ijNumber[1] - 1] = 1
    }
  }

  if(Type == 'l'){ //山なら
    if(direction == 0){ //北向き
      ijNumber = ReturnMatrix(BoxPotion)

      BoxPotionParts[ijNumber[0] + 1][ijNumber[1] - 1] = 1
      BoxPotionParts[ijNumber[0] + 1][ijNumber[1]    ] = 1
      BoxPotionParts[ijNumber[0] - 1][ijNumber[1]    ] = 1
    }
    if(direction == 1){ //東向き
      ijNumber = ReturnMatrix(BoxPotion)

      BoxPotionParts[ijNumber[0] + 1][ijNumber[1] + 1] = 1
      BoxPotionParts[ijNumber[0]    ][ijNumber[1] - 1] = 1
      BoxPotionParts[ijNumber[0]    ][ijNumber[1] + 1] = 1
    }
    if(direction == 2){ //南向き
      ijNumber = ReturnMatrix(BoxPotion)

      BoxPotionParts[ijNumber[0] - 1][ijNumber[1]    ] = 1
      BoxPotionParts[ijNumber[0] + 1][ijNumber[1]    ] = 1
      BoxPotionParts[ijNumber[0] - 1][ijNumber[1] + 1] = 1
    }
    if(direction == 3){ //西向き
      ijNumber = ReturnMatrix(BoxPotion)

      BoxPotionParts[ijNumber[0]    ][ijNumber[1] + 1] = 1
      BoxPotionParts[ijNumber[0] - 1][ijNumber[1] - 1] = 1
      BoxPotionParts[ijNumber[0]    ][ijNumber[1] - 1] = 1
    }
  }

  if(Type == 'i'){ //山なら
    if(direction == 0){ //北向き
      ijNumber = ReturnMatrix(BoxPotion)

      BoxPotionParts[ijNumber[0] - 1][ijNumber[1]    ] = 1
      BoxPotionParts[ijNumber[0] + 1][ijNumber[1]    ] = 1
      BoxPotionParts[ijNumber[0] + 2][ijNumber[1]    ] = 1
    }
    if(direction == 1){ //東向き
      ijNumber = ReturnMatrix(BoxPotion)

      BoxPotionParts[ijNumber[0]    ][ijNumber[1] - 1] = 1
      BoxPotionParts[ijNumber[0]    ][ijNumber[1] + 1] = 1
      BoxPotionParts[ijNumber[0]    ][ijNumber[1] + 2] = 1
    }
    if(direction == 2){ //南向き
      ijNumber = ReturnMatrix(BoxPotion)

      BoxPotionParts[ijNumber[0] - 1][ijNumber[1]    ] = 1
      BoxPotionParts[ijNumber[0] + 1][ijNumber[1]    ] = 1
      BoxPotionParts[ijNumber[0] - 2][ijNumber[1]    ] = 1
    }
    if(direction == 3){ //西向き
      ijNumber = ReturnMatrix(BoxPotion)

      BoxPotionParts[ijNumber[0]    ][ijNumber[1] - 1] = 1
      BoxPotionParts[ijNumber[0]    ][ijNumber[1] + 1] = 1
      BoxPotionParts[ijNumber[0]    ][ijNumber[1] - 2] = 1
    }
  }
}

WriteType()


function BoxPotionPartsReset(){
    for (i = 0; i < HorizontalNumber; i++) {
    BoxPotionParts[i] = new Array(3);
  }

  for (i = 0; i < HorizontalNumber; i++) {
    for (j = 0; j < VerticalNumber; j++) {
        BoxPotionParts[i][j] = 0;
    }
  }
}



function darwBoard(){
  ctx.fillStyle = "#3cb371";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#2f4f4f';
  ctx.lineWidth = lineWidth;
  drawLine(0, 0, 0, canvas.height)
  drawLine(0, canvas.height, canvas.width, canvas.height)
  drawLine(canvas.width, 0, canvas.width, canvas.height)


  for (i = 0; i < 10; i++) {
      for (j = 0; j < 15; j++) {
          if(Tetris[i][j] == 1){
            ctx.fillStyle = "#f0f8ff"; 
            ctx.fillRect(i * 50 + lineWidth / 2, j * 50, BoxWidth , Boxheight)
            ctx.lineWidth = 1
            ctx.strokeRect(i * 50 + lineWidth / 2, j * 50, BoxWidth , Boxheight);
          }
        }
      }

  if(Type == 'o')ctx.fillStyle = '#ffff00'
  if(Type == 'z')ctx.fillStyle = '#ff4500'
  if(Type == 's')ctx.fillStyle = '#008000'
  if(Type == 't')ctx.fillStyle = '#800080'
  if(Type == 'j')ctx.fillStyle = '#0000cd'
  if(Type == 'l')ctx.fillStyle = '#ff7f50'
  if(Type == 'i')ctx.fillStyle = '#00ffff'



  for (i = 0; i < 10; i++) {
    for (j = 0; j < 15; j++) {
          if(BoxPotion[i][j] == 1){
            ctx.fillRect(i * 50 + lineWidth / 2, j * 50, BoxWidth , Boxheight)
            ctx.lineWidth = 1
            ctx.strokeRect(i * 50 + lineWidth / 2, j * 50, BoxWidth , Boxheight);
          }

          if(BoxPotionParts[i][j] == 1){
            ctx.fillRect(i * 50 + lineWidth / 2, j * 50, BoxWidth , Boxheight)
            ctx.lineWidth = 1
            ctx.strokeRect(i * 50 + lineWidth / 2, j * 50, BoxWidth , Boxheight);
          }
       
      }
  }




}



let CheckIndex = 0
let disLine = new Array(1)//消えた行
let disIndex = 0

DisIndex = 1

//列で消えるやつ
function Disappear(){
  

  for (j = 0; j < VerticalNumber; j++) {
    CheckIndex = 0
    
      for (i = 0; i < HorizontalNumber; i++) {
        if(Tetris[i][j] == 1 || BoxPotion[i][j] == 1){
          CheckIndex++
        }         
      }

      if(CheckIndex == 10){
        for (i = 0; i < HorizontalNumber; i++) {
              Tetris[i][j] = 0
              BoxPotion[i][j] = 0
        } 
              disLine[disIndex] = j
              disIndex++
      } 
  }

}


//下に落ちるやつ
function FallDown(){
    for(k = 0; k < disIndex; k++){
      for(j = disLine[k]; j >= 0; j--){
        for(i = 0; i < HorizontalNumber; i++){
              Tetris[i][j + k] = Tetris[i][j + k - 1]
          }
        }
      }
  disIndex = 0
}

//Boxpotionとtetrisが被っていないか
function CheckOverlap(){
  for(j = 0; j < VerticalNumber; j++){
    for(i = 0; i < HorizontalNumber; i++){

      if(Tetris[i][j] == 1 && BoxPotion[i][j] == 1 || Tetris[i][j] == 1 && BoxPotionParts[i][j] == 1 ){
        
        console.log('重なり検知')
        return 1 //テトリスとボックスボディションorパーツが重なると1を返す
    }
    }
  }


  ijNumber = ReturnMatrix(BoxPotionParts)


  for(i = 0; i < ijNumber.length / 2; i ++){
    if(ijNumber[2 * i] < 0 || ijNumber[2 * i] > 9 || ijNumber[2 * i + 1] < 0 || ijNumber[2 * i + 1] > 15){
      console.log('重なり検知')
      return 1
    }
  }

}

function put(){
  console.log('置く')
  ijNumber = ReturnMatrix(BoxPotion)

  BoxPotion[ijNumber[0]][ijNumber[1]] = 0
  Tetris[ijNumber[0]][ijNumber[1]] = 1

  ijNumberParts = ReturnMatrix(BoxPotionParts)


  for(i = 0; i < ijNumberParts.length / 2; i++){
    console.log(i)
    Tetris[ijNumberParts[i * 2]][ijNumberParts[i * 2 + 1]] = 1

  }
  

  let random

  random = Math.random()

  if(random < 1 / 7)Type = 'o'
  else if(random < 2 / 7)Type = 't'
  else if(random < 3 / 7)Type = 's'
  else if(random < 4 / 7)Type = 'z'
  else if(random < 5 / 7)Type = 'l'
  else if(random < 6 / 7)Type = 'j'
  else if(random < 7 / 7)Type = 'i'
  direction = 0

  dontPusha = 0
  dontPushs = 0
  dontPushw = 0 
  dontPushd = 0

  BoxPotion[4][1] = 1

  Type = 't' //仮

  BoxPotionPartsReset()
  WriteType() //書き込む
}





const intervalId = setInterval(() =>{
    darwBoard()
    
    if(time > 900){　
      clearInterval(intervalId);　//intervalIdをclearIntervalで指定している
    }}, 10);



document.onkeydown = function (e){
	if(!e) e = window.event; // レガシー
    if(e.key == 'w'){
      
      // ijNumber = ReturnMatrix(BoxPotion)
      
      //   for (i = 0; i < ijNumber.length / 2; i++){
      //     if(ijNumber[i + 1] - 1 >= 0){
      //       if(Tetris[ijNumber[i]][ijNumber[i + 1] - 1] == 0){
      //         BoxPotion[ijNumber[i]][ijNumber[i + 1]] = 0
      //         BoxPotion[ijNumber[i]][ijNumber[i + 1] - 1] = 1
      //     }
      //   }
      // }

      // BoxPotionPartsReset()
      
      // if(CheckOverlap() == 1 ||　WriteType() == 1){
      //   ijNumber = ReturnMatrix(BoxPotion)

      //   for (i = 0; i < ijNumber.length / 2; i++){
      //     if(ijNumber[i + 1] + 1 < 15){
      //         BoxPotion[ijNumber[i] + 1][ijNumber[i - 1]] = 1
      //         BoxPotion[ijNumber[i]][ijNumber[i + 1]] = 0
      //     }
      //   }
      
      //   BoxPotionPartsReset()
      //   WriteType() //書き込む
      // }
      // dontPushd = 0
      // dontPushs = 0
      // dontPusha = 0  

    }
    if(e.key == 'a'){
      ijNumber = ReturnMatrix(BoxPotionParts)

      for(i = 0; i < ijNumber.length / 2; i++){


          if(ijNumber[2 * i] > 0){
            dontPusha = 0

          }
          else{
            dontPusha = 1
            
            break
          }
        }
      
      ijNumber = ReturnMatrix(BoxPotion)
      console.log(dontPusha)

      if(ijNumber[0] > 0 && dontPusha == 0){

        for (i = 0; i < ijNumber.length / 2; i++){
            if(Tetris[ijNumber[i] - 1][ijNumber[i + 1]] == 0){
              BoxPotion[ijNumber[i]][ijNumber[i + 1]] = 0
              BoxPotion[ijNumber[i] - 1][ijNumber[i + 1]] = 1
          }
        }
        BoxPotionPartsReset()
        WriteType() //書き込む

      }
      

      ijNumber = ReturnMatrix(BoxPotionParts)

      for(i = 0; i < ijNumber.length / 2; i++){


          if(ijNumber[2 * i] > 0){
            dontPusha = 0

          }
          else{
            dontPusha = 1
            
            break
          }
        }

        console.log(dontPusha)

        for(i = 0; i < ijNumber.length / 2; i++){
          if(Tetris[ijNumber[2 * i]][ijNumber[2 * i + 1]] == 1){
            ijNumber = ReturnMatrix(BoxPotion)

            BoxPotion[ijNumber[0]][ijNumber[1]] = 0
            BoxPotion[ijNumber[0] + 1][ijNumber[1]] = 1


            BoxPotionPartsReset()
            WriteType() //書き込む

          }
        } 

      dontPushd = 0
      dontPushs = 0
      dontPushw = 0  

    }
    if(e.key == 's'){
      if(dontPushs == 1){
        put()
      }else{
          
      ijNumber = ReturnMatrix(BoxPotion)

      if(ijNumber[1] != 14 && dontPushs == 0){ //中心部分がy軸14ではない、パーツの下にものがない

        for (i = 0; i < ijNumber.length / 2; i++){
            if(Tetris[ijNumber[i]][ijNumber[i + 1] + 1] == 0){
              BoxPotion[ijNumber[i]][ijNumber[i + 1]] = 0
              BoxPotion[ijNumber[i]][ijNumber[i + 1] + 1] = 1
            }
        }
        BoxPotionPartsReset()
        WriteType() //書き込む

      }

      
      

      ijNumber = ReturnMatrix(BoxPotionParts) //↓パーツの話↓

      for(i = 0; i < ijNumber.length / 2; i++){

          if(ijNumber[2 * i + 1] != 14){ //パーツが14ではない
            console.log('〇')
            dontPushs = 0

          }
          else{  //パーツが14である
            console.log('×')
            dontPushs = 1
            
            break
          }
        }

        


        for(i = 0; i < ijNumber.length / 2; i++){
          if(Tetris[ijNumber[2 * i]][ijNumber[2 * i + 1]] == 1 ){ //パーツが他のと被った 
            ijNumber = ReturnMatrix(BoxPotion)

            BoxPotion[ijNumber[0]][ijNumber[1]] = 0
            BoxPotion[ijNumber[0]][ijNumber[1] - 1] = 1


            BoxPotionPartsReset()
            WriteType() //書き込む

            dontPushs = 1
          }
          else if(Tetris[ijNumber[2 * i]][ijNumber[2 * i + 1] + 1] == 1 ){
            dontPushs = 1
          }
        } 

      //中心の下にものがある      
      ijNumber = ReturnMatrix(BoxPotion)
      
      if(Tetris[ijNumber[0]][ijNumber[1] + 1] == 1 ){ //パーツが他のと被った
        dontPushs = 1
      } 
        


      dontPushd = 0
      dontPusha = 0
      dontPushw = 0 

        
      }
      
    }
    if(e.key == 'd'){
      ijNumber = ReturnMatrix(BoxPotionParts)

      for(i = 0; i < ijNumber.length / 2; i++){


          if(ijNumber[2 * i] != 9){
            dontPushd = 0

          }
          else{
            dontPushd = 1
            
            break
          }
        }

      ijNumber = ReturnMatrix(BoxPotion)

      if(ijNumber[0] != 9 && dontPushd == 0){

        for (i = 0; i < ijNumber.length / 2; i++){
            if(Tetris[ijNumber[i] + 1][ijNumber[i + 1]] == 0){
              BoxPotion[ijNumber[i]][ijNumber[i + 1]] = 0
              BoxPotion[ijNumber[i] + 1][ijNumber[i + 1]] = 1
          }
        }
        BoxPotionPartsReset()
        WriteType() //書き込む

      }
      

      ijNumber = ReturnMatrix(BoxPotionParts)

      for(i = 0; i < ijNumber.length / 2; i++){


          if(ijNumber[2 * i] != 9){
            dontPushd = 0

          }
          else{
            dontPushd = 1
            
            break
          }
        }


        for(i = 0; i < ijNumber.length / 2; i++){
          if(Tetris[ijNumber[2 * i]][ijNumber[2 * i + 1]] == 1){
            ijNumber = ReturnMatrix(BoxPotion)

            BoxPotion[ijNumber[0]][ijNumber[1]] = 0
            BoxPotion[ijNumber[0] - 1][ijNumber[1]] = 1


            BoxPotionPartsReset()
            WriteType() //書き込む

          }
        } 

      dontPushs = 0
      dontPusha = 0
      dontPushw = 0 

    }
    if(e.key == 'f'){
      console.log('列が消えるか判断')
      Disappear()

      dontPushs = 0
      dontPusha = 0
      dontPushw = 0 
      dontPushd = 0
    }
    if(e.key == 'r'){
      console.log('落ちる')
      FallDown()
      dontPushs = 0
      dontPusha = 0
      dontPushw = 0 
      dontPushd = 0
    }
    if(e.key == 'e'){
      console.log('置く')
      ijNumber = ReturnMatrix(BoxPotion)

      BoxPotion[ijNumber[0]][ijNumber[1]] = 0
      Tetris[ijNumber[0]][ijNumber[1]] = 1

      ijNumberParts = ReturnMatrix(BoxPotionParts)
      console.log(ijNumberParts)


      for(i = 0; i < ijNumberParts.length / 2; i++){
        console.log(i)
        Tetris[ijNumberParts[i * 2]][ijNumberParts[i * 2 + 1]] = 1

      }
      

      let random

      random = Math.random()

      if(random < 1 / 7)Type = 'o'
      else if(random < 2 / 7)Type = 't'
      else if(random < 3 / 7)Type = 's'
      else if(random < 4 / 7)Type = 'z'
      else if(random < 5 / 7)Type = 'l'
      else if(random < 6 / 7)Type = 'j'
      else if(random < 7 / 7)Type = 'i'
      direction = 0

      dontPusha = 0
      dontPushs = 0
      dontPushw = 0 
      dontPushd = 0

      BoxPotion[4][1] = 1

      BoxPotionPartsReset()
      WriteType() //書き込む
    }
    if(e.key == ' '){ //スペース
      if(direction == 3){
        direction = 0
      }
      else{
        direction++
      }

      ijNumberP = ReturnMatrix(BoxPotionParts)
      BoxPotionPartsReset()
      WriteType()
      
      ijNumberP = ReturnMatrix(BoxPotionParts)
      BoxPotionPartsReset()
      WriteType()

      

      TatchTime = 0

    }
    if(e.key == 'b'){ //逆回転
      if(direction == 0){
        direction = 3
      }
      else{
        direction--
      }

      BoxPotionPartsReset()
      WriteType()
      BoxPotionPartsReset()
      WriteType()

      TatchTime = 0

    }


    dontPusha = 0
    dontPushd = 0
    dontPushs = 0
    dontPushw = 0

};


window.onload = function(){
  //1000ミリ秒（1秒）毎に関数「showNowDate()」を呼び出す
  setInterval("fall()", 1000);
}

let TatchTime = 0
 
//時間ごとに落ちる
function fall(){

  if(TatchTime == 2){
    put()
    TatchTime = 0
  }
  else{
    
  ijNumber = ReturnMatrix(BoxPotion)

  if(ijNumber[1] != 14 && Tetris[ijNumber[0]][ijNumber[1] + 1] == 0){ //中心部分がy軸14ではない 下になにもない
      

      ijNumberP = ReturnMatrix(BoxPotionParts)
      CheckIndex = 0

      for (i = 0; i < ijNumberP.length / 2; i++){
        if(ijNumberP[2 * i + 1] + 1 >= 15){ 
          CheckIndex = 1
        }
      }
      
      if(CheckIndex == 0){
        for (i = 0; i < ijNumberP.length / 2; i++){
          if(Tetris[ijNumberP[2 * i]][ijNumberP[2 * i + 1] + 1] == 1){
            BoxPotion[ijNumber[0]][ijNumber[1]] = 1
            BoxPotion[ijNumber[0]][ijNumber[1] + 1] = 0
            TatchTime++
            i = ijNumberP.length //for文を終わらせる
          }
          else if(Tetris[ijNumberP[2 * i]][ijNumberP[2 * i + 1] + 1] == 0){
            BoxPotion[ijNumber[0]][ijNumber[1]] = 0
            BoxPotion[ijNumber[0]][ijNumber[1] + 1] = 1
          }       
        } 
      }
      
    }


    if(ijNumber[1] == 14 || Tetris[ijNumber[0]][ijNumber[1] + 1] == 1){
      TatchTime++
        }
        BoxPotionPartsReset()
        WriteType() //書き込む

  }

}

