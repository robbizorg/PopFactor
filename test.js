//start with each picture
//iterate through each picture
//Send it to the picture API
//find the different colors
//for each color get the frequency
//ratio = likes/freq
//create a list for each color 
//at the end, find the average likes for each color using the //different lists
//print which ones get most likes

input = {
  "public_id": "fashion1",
  "width": 225,
  "height": 380,
  "predominant": {
    "google": [
      [ "white", 50.7 ],
      [ "blue",  27.8 ],
      [ "gray", 11.2 ],
      [ "brown", 5.1]
    ]
  }
};

colorList = input.predominant.google;

var colorFreq = {};
var colorCount = {};

for (i = 0; i < colorList.length; i++){
    
    if (colorList[i][0] in colorFreq == false){
        colorFreq[colorList[i][0]] = colorList[i][1];
    }
    
    if (colorList[i][0] in colorCount == false){
        colorCount[colorList[i][0]] = 1;
    }
    
    else{
        colorFreq[colorList[i][0]] = colorFreq[colorList[i][0]] + colorList[i][1];
        colorCount[colorList[i][0]] = colorCount[colorList[i][0]] + 1;
    }
}