function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#the-img')
                    .attr('src', e.target.result)
                    .width(150)
                    .height(200);
            };

            reader.readAsDataURL(input.files[0]);
            document.getElementById("the-img").onload = function() {

                EXIF.getData(this, function() {

                    myData = this;

                    console.log(myData.exifdata);

                    var latDegree = myData.exifdata.GPSLatitude[0].numerator;
                    var latMinute = myData.exifdata.GPSLatitude[1].numerator;
                    var latSecond = myData.exifdata.GPSLatitude[2].numerator;
                    var latDirection = myData.exifdata.GPSLatitudeRef;

                    var latFinal = ConvertDMSToDD(latDegree, latMinute, latSecond, latDirection);
                    console.log(latFinal);

        // Calculate longitude decimal
                    var lonDegree = myData.exifdata.GPSLongitude[0].numerator;
                    var lonMinute = myData.exifdata.GPSLongitude[1].numerator;
                    var lonSecond = myData.exifdata.GPSLongitude[2].numerator;
                    var lonDirection = myData.exifdata.GPSLongitudeRef;

                    var lonFinal = ConvertDMSToDD(lonDegree, lonMinute, lonSecond, lonDirection);
                    console.log(lonFinal);

                    initialize(latFinal, lonFinal);





                });
              }
        }
    }



      function ConvertDMSToDD(degrees, minutes, seconds, direction) {

          var dd = degrees + (minutes/60) + (seconds/36000000);

          if (direction == "S" || direction == "W") {
              dd = dd * -1;
          }

          return dd;
      }


      function initialize(lan, lon)
      {
      var myCenter=new google.maps.LatLng(lan,lon);
      var marker;
      var mapProp = {
        center:myCenter,
        zoom:13,
        mapTypeId:google.maps.MapTypeId.ROADMAP
        };
      var map=new google.maps.Map(document.getElementById("map"),mapProp);
      marker=new google.maps.Marker({
        position:myCenter,
        animation:google.maps.Animation.BOUNCE
        });
      marker.setMap(map);
      }







      google.maps.event.addDomListener(window, 'load', initialize);
