
  function callAPI(text) {

      var documents = {"documents": [
         {
             "id": "1",
             "text": text
         },
     ]};
        var params = {
            // Request parameters
            "numberOfLanguagesToDetect": 0,
        };

        $.ajax({
            url: "https://westcentralus.api.cognitive.microsoft.com/text/analytics/v2.0/languages?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                //xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key",encodeURIComponent("7fd065baec1847eda695a7c41720a3aa"));
            },
            type: "POST",
            // Request body
            data: JSON.stringify(documents),
            contentType: "application/json",
        })
        .done(function(data) {
          var language = data.documents[0].detectedLanguages[0].name;
          var score = data.documents[0].detectedLanguages[0].score;
          var percent=score*100;
          $('#region').text(language);
          move(percent);
          console.log(score);
        })
        .fail(function() {
            alert("error");
        });
    }

function move(percent) {
  var elem = document.getElementById("myBar");
  var width = 1;
  var id = setInterval(frame, 10);
  function frame() {
    if (width >= percent) {
      clearInterval(id);
    } else {
      width++;
      elem.style.width = width + '%';
      $('#myBar').text(width + "%");
    }
  }
}
