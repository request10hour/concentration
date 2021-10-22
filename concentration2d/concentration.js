function draw(num, cnum) {
  defimgload(num);
  cardlist[num].addEventListener("mousedown", function () {
    if (arr[num] == 0 && stopgame == 0) {
      if (clickcount == 0) {
        pos = num;
        cpos = cnum;
        clickcount = 1;
        cardlist[num].style.boxShadow = "0px 0px 5px 5px paleturquoise";
        imgload(num, cnum);
      } else if (clickcount == 1) {
        if (pos == num) {
          pos = null;
          cpos = null;
          clickcount = 0;
          cardlist[num].style.boxShadow = null;
          defimgload(num);
        } else {
          if (cpos == cnum) {
            cardlist[pos].style.boxShadow = "0px 0px 5px 5px palegreen";
            cardlist[num].style.boxShadow = "0px 0px 5px 5px palegreen";
            imgload(num, cnum);
            arr[pos] = 1;
            arr[num] = 1;
            pos = null;
            cpos = null;
            clickcount = 0;
            document.getElementById("point").textContent =
              parseInt(document.getElementById("point").textContent) + 1;
          } else {
            cardlist[pos].style.boxShadow = "0px 0px 5px 5px palevioletred";
            cardlist[num].style.boxShadow = "0px 0px 5px 5px palevioletred";
            imgload(num, cnum);
            p = pos;
            n = num;
            stopgame = 1;
            setTimeout(() => {
              rmsdw();
              defimgload(p);
              defimgload(n);
            }, 500);
            pos = null;
            cpos = null;
            clickcount = 0;
          }
        }
      }
    }
  });
}

function defimgload(num) {
  var imgClo = new Image();
  imgClo.addEventListener(
    "load",
    function () {
      var ctx = cardlist[num].getContext("2d");
      ctx.clearRect(0, 0, cardlist[num].width, cardlist[num].height);
      ctx.drawImage(imgClo, 0, 0, cardlist[num].width, cardlist[num].height);
    },
    false
  );
  imgClo.src = "./2dimage/def.png";
}

function imgload(num, cnum) {
  var imgClo = new Image();
  imgClo.addEventListener(
    "load",
    function () {
      var ctx = cardlist[num].getContext("2d");
      ctx.clearRect(0, 0, cardlist[num].width, cardlist[num].height);
      ctx.drawImage(imgClo, 0, 0, cardlist[num].width, cardlist[num].height);
    },
    false
  );
  imgClo.src = "./2dimage/" + cnum + ".png";
}

var p;
var n;
var stopgame = 0;
function rmsdw() {
  cardlist[p].style.boxShadow = null;
  cardlist[n].style.boxShadow = null;
  stopgame = 0;
}

var h;
var cardlist;
var clickcount = 0;
var pos = null;
var cpos = null;
var arr = new Array();

window.onload = function () {
  cardlist = document.getElementsByClassName("card");
  mixcard();
  for (var i = 0; i < 12; i++) {
    var cnum = cardlist[i].textContent;
    imgload(i, cnum);
  }
  setTimeout(() => {
    for (var i = 0; i < 12; i++) {
      var cnum = cardlist[i].textContent;
      draw(i, cnum);
      arr[i] = 0;
    }
  }, 300);
  
};

function mixcard() {
  for (var i = 0; i < 12; i++) {
    while (true) {
      var r = Math.floor(Math.random() * 12);
      if (!cardlist[r].textContent) {
        cardlist[r].textContent = Math.floor(i / 2) + 1;
        break;
      }
    }
  }
}
