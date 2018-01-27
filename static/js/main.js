function getMeta(){
    //returns a promise to return topic and pageNum
    //if(mode=='video') {
        return new Promise((resolve,reject)=> {
            resolve( {} );
        }) ;
    //}
    // return pdfDoc.getPage(pageNum).then(function(page) {
    //     return page.getTextContent().then(function(textContent) {
    //         //alert( "Topic: "+textContent.items[0].str+", Page: "+ String(pageNum))
    //         return {topic: textContent.items[0].str, page: String(pageNum)};
    //     });
    // });
}

function passFace(file) {
    //var image=makeblob(file);
    // var image = new Image();
    // image.id = "pic";
    // image.src = file;
    // console.log(image);
    getMeta().then(function(metaData){
        if(metaData==undefined){
            metaData.page='Undefined';
            metaData.topic='Undefined';
            // console.log("Not OK");
        }
        else{
            // console.log("OK");
        }
        if (mode=='pdf') description="Slide "+metaData.page+" ("+metaData.topic+") ";
        else description=getCleanTimeStamp();
        // console.log(description);
        processFaces(file, getTimeStamp(), description,function(obj) {
            console.log(obj);

            var data = obj.data,
                totalRoll = 0,
                totalYaw = 0,
                totalXcoord = 0,
                totalYcoord = 0,
                details = null;
            
            if (data == null || data.length == 0); // do nothing;
            else {
                // calculate totalYaw and totalRoll in absolute values
                /* for (let i = 0; i < data.length; i++) {
                    var faceAtt = data[i].faceAttributes;

                    // Error handling
                    if (faceAtt == null || !('headPose' in faceAtt)) {
                        // we did not receive the required data
                        // do nothing
                    } else {
                        details = faceAtt.headPose;
                        totalRoll += Math.abs(details.roll.map(-20, 20, -5, 5));
                        totalYaw += Math.abs(details.yaw.map(-20, 20, -5, 5));
                    }
                }  */ 
                
                
                // calculate the pupil position and store that
                for (let i = 0; i < data.length; i++) {
                    var faceLand = data[i].faceLandmarks;

                    // Error handling
                    if (faceLand == null || !('pupilLeft' in faceLand) || !('pupilRight' in faceLand)) {
                        // do nothing as we don't have required data
                    } else {
                        details = {
                                    x: Math.abs(faceLand.pupilLeft.x + faceLand.pupilRight.x) / 2,
                                    y: Math.abs(faceLand.pupilLeft.y + faceLand.pupilRight.y) / 2
                                };
                        totalXcoord += Math.abs(details.x.map(50, 250, 5, 15));
                        totalYcoord += Math.abs(details.y.map(50, 250, 5, 15));
                        // console.log(details);
                    }
                }
            }

            // plotting obj
            if (details != null) {
                var atten = (totalXcoord + totalYcoord) / data.length;
                // console.log(atten);
                plot(obj.timestamp, atten, obj.description);
            }
        });
    });
    
}