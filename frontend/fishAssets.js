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

function pushAsset(left, right, id) {
  fishAssets.push({left: loadImg(left),
                   right: loadImg(right),
                   name: id});
}

var fishHook;

function loadAssets() {
  fishHook = loadImg("Assets\\fishHook.svg");
  pushAsset("Assets\\betaleft.svg", "Assets\\betaright.svg", "beta");
  pushAsset("Assets\\clownfishLeft.svg", "Assets\\clownfish.svg", "clown");
  pushAsset("Assets\\flounderleft.svg", "Assets\\flounderright.svg", "flounder");
  pushAsset("Assets\\hammerleft.svg", "Assets\\hammerright.svg", "hammer");
  pushAsset("Assets\\jellyleft.svg", "Assets\\jellyright.svg", "jelly");
  pushAsset("Assets\\krabbyleft.svg", "Assets\\krabbyright.svg", "crab");
  pushAsset("Assets\\marlinLeft.svg", "Assets\\marlin.svg", "marlin");
  pushAsset("Assets\\pufferleft.svg", "Assets\\pufferright.svg", "puffer");
  pushAsset("Assets\\rainbowleft.svg", "Assets\\rainbowright.svg", "rainbow");
  pushAsset("Assets\\seahorseleft.svg", "Assets\\seahorseright.svg", "seahorse");
}
