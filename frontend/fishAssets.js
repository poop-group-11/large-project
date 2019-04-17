var prog = document.getElementById("progress-bar"),
    width = 1,
    assets = 21; //UPDATE WHEN YOU ADD MORE

function loadImg(src) {
  var img = new Image();
  img.onload = function () {
    width = width + (100 / 21);
    prog.style.width = width + "%";
    if(width >= 100) {
      prog.parentElement.parentElement.style.display = "none";
    }
  }
  img.src = src;
  return img;
}

const fishAssets = [];

function pushAsset(left, right) {
  fishAssets.push({left: loadImg(left),
                   right: loadImg(right)});
}

var fishHook;

function loadAssets() {
  fishHook = loadImg("Assets\\fishHook.svg");
  pushAsset("Assets\\betaleft.svg", "Assets\\betaright.svg");
  pushAsset("Assets\\clownfishLeft.svg", "Assets\\clownfish.svg");
  pushAsset("Assets\\flounderleft.svg", "Assets\\flounderright.svg");
  pushAsset("Assets\\hammerleft.svg", "Assets\\hammerright.svg");
  pushAsset("Assets\\jellyleft.svg", "Assets\\jellyright.svg");
  pushAsset("Assets\\krabbyleft.svg", "Assets\\krabbyright.svg");
  pushAsset("Assets\\marlinLeft.svg", "Assets\\marlin.svg");
  pushAsset("Assets\\pufferleft.svg", "Assets\\pufferright.svg");
  pushAsset("Assets\\rainbowleft.svg", "Assets\\rainbowright.svg");
  pushAsset("Assets\\seahorseleft.svg", "Assets\\seahorseright.svg");
}
