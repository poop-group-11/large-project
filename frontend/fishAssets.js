var fishHook = new Image();
fishHook.src = "Assets\\fishhook.svg";

function mkImg(src) {
  var img = new Image();
  img.src = src;
  return img;
}

const fishAssets = [];

function pushAsset(left, right) {
  fishAssets.push({left: mkImg(left),
                   right: mkImg(right)});
}

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
