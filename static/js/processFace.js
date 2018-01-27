
function getEmotionData(faceData) {
    /* faceData = {
        timestamp,
        description,
        faceApiResponse
    } 
    returns:
        obj = {
            timestamp,
            description,
            details = {
                gender:
                age:
                emotion = {
                    disgust
                    fear
                    happy
                    sad
                    suprise
                    All in %age
                }
            }
        }
    */

    var faceEmotions = {
        timestamp: faceData.timestamp,
        description: faceData.description,
        details: null
    }
    var apiRes = faceData.data;
    if (apiRes == null || apiRes == undefined || data.length == 0) {
        faceEmotions.details = null;
        return faceEmotions;
    } else {
        // this assumes single user
        // processes first face in case of more than one usr
        let faceAtt = apiRes[0].faceAttributes;

        // Error handling
        if (faceAtt == null || faceAtt == undefined) {
            // no data
            faceEmotions.details = null;
            return faceEmotions;
        } else {
            let details = {};
            details.gender = (faceAtt.gender == null || faceAtt.gender == undefined) ? null : faceAtt.gender;
            details.age = (faceAtt.age == null || faceAtt.age == undefined) ? null : faceAtt.age;

            let emotion = faceAtt.emotion;
            details.emotion = null;
            if (emotion != null && emotion != undefined) {
                let sum = 0;
                sum += emotion.disgust + emotion.fear + emotion.happiness + emotion.neutral + emotion.sadness + emotion.surprise;
                details.emotion = {
                    disgust: emotion.disgust * 100 / sum,
                    fear: emotion.fear * 100 / sum,
                    happiness: emotion.happiness * 100 / sum,
                    sadness: emotion.sadness * 100 / sum,
                    surprise: emotion.surprise * 100 / sum
                }
            }

            faceEmotions.details = details;
            return faceEmotions;
        }
    }
}

function getAttentionData(faceData) {
    /* faceData = {
        timestamp,
        description,
        faceApiResponse
    } 
    returns:
        obj = {
            timestamp,
            description,
            eyeCoordinate
        }
    */

    var faceAttention = {
        timestamp: faceData.timestamp,
        description: faceData.description,
        eyeCoordinate: null
    }
    var apiRes = faceData.data;
    if (apiRes == null || apiRes == undefined || data.length == 0) {
        faceAttention.eyeCoordinate = null;
        return faceAttention;
    } else {
        // this assumes single user
        // processes first face in case of more than one usr
        let faceAtt = apiRes[0].faceAttributes;

        // Error handling
        if (faceAtt == null || faceAtt == undefined) {
            // no data
            faceAttention.eyeCoordinate = null;
            return faceAttention;
        } else {
            var faceLand = data[0].faceLandmarks;

            // Error handling
            if (faceLand == null || faceLand == undefined || !('pupilLeft' in faceLand) || !('pupilRight' in faceLand)) {
                // do nothing as we don't have required data
                faceAttention.eyeCoordinate = null;
                return faceAttention;
            } else {
                let details = {
                    x: Math.abs(faceLand.pupilLeft.x + faceLand.pupilRight.x) / 2,
                    y: Math.abs(faceLand.pupilLeft.y + faceLand.pupilRight.y) / 2
                };
                let eyeCoordinate = {};
                eyeCoordinate.x = Math.abs(details.x.map(50, 250, 5, 15));
                eyeCoordinate.y += Math.abs(details.y.map(50, 250, 5, 15));

                faceAttention.eyeCoordinate = eyeCoordinate;
                return faceAttention
            }
        }
    }
}

function processFaces(dataURL, timestamp, description, callback) {
    // **********************************************
    // *** Update or verify the following values. ***
    // **********************************************
    console.log("Sending image to face api");
    // Replace the subscriptionKey string value with your valid subscription key.
    var subscriptionKey = "ec21e11600704233a7cdb295a37249b6";

    var uriBase = "https://southeastasia.api.cognitive.microsoft.com/face/v1.0/detect";

    // Request parameters.
    var params = {
        "returnFaceId": "true",
        "returnFaceLandmarks": "true",
        "returnFaceAttributes": "headPose"
    };

    // Display the image.
    //document.querySelector("#sourceImage").src = document.getElementById("inputImage").value;

    // file=fopen("./test.jpg",0);
    // str = fread(file,flength(file));


    // Perform the REST API call.
    console.log('before ')
    $.ajax({
        url: uriBase + "?" + $.param(params),

        type: 'POST',
        processData: false,
        contentType: 'application/octet-stream',


        // Request headers.
        beforeSend: function (xhrObj) {
            // xhrObj.setRequestHeader("Content-Type","application/octet-stream");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },

        // Request body.
        // data: '{"url": ' + '"' + sourceImageUrl + '"}'
        data: makeblob(dataURL)

    })

        .done(function (data) {

            var obj = {
                timestamp: timestamp,
                description: description,
                data: data
            }
            console.log(obj)
            callback(obj);
        })

        .fail(function (jqXHR, textStatus, errorThrown) {
            var obj = {
                timestamp: timestamp,
                description: description,
                data: null // change this to actual error message if you want err to be sent
            }
            console.log(errorThrown)
            callback(obj);
        });
}