
var labelgun = require("../lib/labelgun");

describe('labelgun', function() {

  it('should import correctly', function(){
    
      expect(labelgun).not.toBeUndefined(); 
      expect(labelgun).not.toBeNull(); 

  });

  it('should accept hide and show functions in constructor', function(){

      var hideLabel = function(){ return false; }
      var showLabel = function(){ return true; }
      var labelEngine = new labelgun.default(hideLabel, showLabel);

      expect(labelEngine.hideLabel()).toBe(false);
      expect(labelEngine.showLabel()).toBe(true); 

  });

  it('should ingest a single label', function(){
   
    var hideLabel = function(){ return false; }
    var showLabel = function(){ return true; }
    var labelEngine = new labelgun.default(hideLabel, showLabel);

    var boundingBox = {
      bottomLeft : [0.0, 0.0],
      topRight   : [1.0, 1.0]
    };

    labelEngine.ingestLabel(
      boundingBox,
      0, //id
      parseInt(Math.random() * (5 - 1) + 1), // Weight
      {}, // label object
      "Test",
      false
    )

    expect(labelEngine.tree.all().length).toBe(1);
    expect(Object.keys(labelEngine.allLabels).length).toBe(1);
    
  });

  it('should ingest many labels (10)', function(){
   
    var hideLabel = function(){ return false; }
    var showLabel = function(){ return true; }
    var labelEngine = new labelgun.default(hideLabel, showLabel);
    var boundingBox; 

    for (var i=0; i < 10; i++) {
      
      boundingBox = {
        bottomLeft : [i, i],
        topRight   : [i + 1.0, i + 1.0]
      };

      labelEngine.ingestLabel(
        boundingBox,
        i, //id
        parseInt(Math.random() * (5 - 1) + 1), // Weight
        {}, // label object
        "Test",
        false
      )

    }

    expect(labelEngine.tree.all().length).toBe(10);
    expect(Object.keys(labelEngine.allLabels).length).toBe(10);
  
  });

  it('should ingest many labels (10)', function(){
   
    var hideLabel = function(){ return false; }
    var showLabel = function(){ return true; }
    var labelEngine = new labelgun.default(hideLabel, showLabel);
    var boundingBox; 

    for (var i=0; i < 10; i++) {
      
      boundingBox = {
        bottomLeft : [i, i],
        topRight   : [i + 1.0, i + 1.0]
      };

      labelEngine.ingestLabel(
        boundingBox,
        i, //id
        parseInt(Math.random() * (5 - 1) + 1), // Weight
        {}, // label object
        "Test",
        false
      )

    }

    expect(labelEngine.tree.all().length).toBe(10);
    expect(Object.keys(labelEngine.allLabels).length).toBe(10);
  
  });

  it('overlapping labels should be hidden', function(){
   
    var hideLabel = function(){ return false; }
    var showLabel = function(){ return true; }
    var labelEngine = new labelgun.default(hideLabel, showLabel);
    var boundingBox; 

    for (var i=0; i < 2; i++) {
      
      boundingBox = {
        bottomLeft : [i, i],
        topRight   : [i + 1.0, i + 1.0]
      };

      labelEngine.ingestLabel(
        boundingBox,
        i, //id
        i, // Weight
        {}, // label object
        "Test",
        false
      )

    }

    labelEngine.update();

    var shown = labelEngine.totalShown();
    var hidden = labelEngine.totalHidden();
    expect(shown).toBe(1);
    expect(hidden).toBe(1);
    expect(labelEngine.allLabels[0].state).toBe("hide");
    expect(labelEngine.allLabels[1].state).toBe("show");

  
  });


});