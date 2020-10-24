window.onload = function(){

  var $tableElements = document.getElementsByTagName('td');
  let status = false;
  let count = 32;
  let rod = '●';
  let choice;
  let remove;
  let notField = [0, 1, 5, 6, 7, 8, 12, 13, 24, 35, 36, 40, 41, 42, 43, 47, 48];
  let notMoveField = [0, 1, 5, 6, 7, 8, 12, 13, 35, 36, 40, 41, 42, 43, 47, 48];

  //tableの全てにclickイベントを付与する
  for (let $i=0; $i < $tableElements.length; $i++) {
    $tableElements[$i].addEventListener('click', function(){
      //配列に変換する
      let tableElements = [].slice.call($tableElements);
      //クリックした位置の取得
      let index = tableElements.indexOf(this);
      if (!status) {
        choiceRod(index); 
      } else {
        moveRod(index);
        if (count != 1) {
            document.getElementById("count").innerHTML = "残り:" + count;
        } else {
            document.getElementById("count").innerHTML = "クリア！";
        }
      }
    });
  }

  document.getElementById("start-button").onclick = function() {
    for (let $i=0; $i < $tableElements.length; $i++) {
        if (!notField.includes($i)) {
            $tableElements[$i].innerHTML = rod;
        }
    }
    document.getElementById("count").innerHTML = "残り:" + count;
    document.getElementById("status").innerHTML = "移動する対象を選んでください。"; 
  };

  document.getElementById("reset-button").onclick = function() {
    for (let $i=0; $i < $tableElements.length; $i++) {
        $tableElements[$i].innerHTML = "";
        count = 32;
        document.getElementById("count").innerHTML = "";
        document.getElementById("status").innerHTML = "";
    }
  };

  function moveRod(index) {
    if ($tableElements[index].innerHTML != "●" && !notMoveField.includes(index) && checkeMove(index)) {
        $tableElements[choice].innerHTML = "";
        $tableElements[remove].innerHTML = "";
        $tableElements[index].innerHTML = "●";
        document.getElementById("status").innerHTML = "動かす対象を選んでください";
        count = count - 1;
        status = false;
    } else if($tableElements[index].innerHTML == "●") {
        $tableElements[choice].innerHTML = "●";
        $tableElements[index].innerHTML  = "★"; 
        choice = index;
        document.getElementById("status").innerHTML = "★を選択中：移動先を選んでください。他の対象を選択することで移動する対象を変更できます";
        status = true;
    } else {
        document.getElementById("status").innerHTML = "そこには移動できません！別の場所を選んでください"; 
        status = true;
    }
  }

  function checkeMove(index) {
    if (Math.abs(choice - index) != 2 && Math.abs(choice - index) != 14) {
        return false;
    } else {
        if ($tableElements[index].innerHTML != "") {
            return false;
        }
        if (choice > index) {
            remove = index + Math.abs(choice - index)/2;
        } else {
            remove = choice + + Math.abs(choice - index)/2;
        }
        if ($tableElements[remove].innerHTML != "●") {
            return false;
        }
    }
    return true;
  }

  function choiceRod(index) {
    choice = index;
    status = true;
    $tableElements[index].innerHTML = '★'
    document.getElementById("status").innerHTML = "★を選択中：移動先を選んでください。他の対象を選択することで移動する対象を変更できます"
  }
}