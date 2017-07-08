$(document).ready(function() {
  
    $(document).on('click', '#searchButton', function(e) {
    $('tbody').html('');

    var zip = $('#zip').val();

        $.ajax({
            url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + zip,
            contentType: "application/json; charset=utf-8",
            dataType: 'jsonp',
            context: document.body
        }).done(function(res){
            for (var markets in res.results) {
                var marketName = res.results[markets].marketname;
                var id =res.results[markets].id;
                getmarketDetails(marketName, id);
                console.log(marketName);
            }
        });

        return false;
    });

        getmarketDetails = function(marketName, id) {

              $.ajax({
                url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + id,
                    contentType: "application/json; charset=utf-8",
                    dataType: 'jsonp',
                    context: document.body
              }).done(function(res){
                var Address = res.marketdetails.Address;
                var GoogleLink = res.marketdetails.GoogleLink;
                var Products = res.marketdetails.Products;
                var Schedule = res.marketdetails.Schedule;
                var mapSrc = 'https://maps.googleapis.com/maps/api/staticmap?center='+Address+'&size=320x240&zoom=15&key=AIzaSyBr4KKhAkxT3KGIH7sqxBxPlcJimrJX-ZA';
              
                

            var market = $('<tr class=data_row>')

           


            market.append('<td class=left>' + "<div class=left_content> <h3>"+marketName+"</h3> <img class=map src='"+mapSrc+"'> <a href='"+GoogleLink+"' target='_blank'>" + "<p id=address_link>" + Address + "</p>" + '</td>');
            market.append('<td class=middle>' + "<p class=middle_content>" + Products + "</p>" + '</td>');
            market.append('<td class=right>' + "<p class=right_content>" + Schedule + "</p>" + '</td>');

            database.ref().on("child_added", function(childSnapshot){
                if (marketName == childSnapshot.val().name) {
                    market.append('<td class=far_right>' + "<p class=specials_content>" + childSnapshot.val().dates + "<br>" + childSnapshot.val().specials + "</p>" + '</td>');
                }
            });

            


            $('tbody').append(market);
              });
        }

          // Initialize Firebase
          var config = {
            apiKey: "AIzaSyAwXjBf6q0NN6K4Ub_uO0H2qBAgeTFiU24",
            authDomain: "farmers-market-80467.firebaseapp.com",
            databaseURL: "https://farmers-market-80467.firebaseio.com",
            projectId: "farmers-market-80467",
            storageBucket: "farmers-market-80467.appspot.com",
            messagingSenderId: "597648973276"
          };
          firebase.initializeApp(config);

          var database = firebase.database();


          $('form').on('submit', function(event){
            event.preventDefault();

            var market_name = $('#name').val().trim();
            var dates = $('#dates').val().trim();
            var special_offers = $('#specials').val().trim();

            database.ref().push({
              name: market_name,
              dates: dates,
              specials: special_offers,
            });

            alert("Thank you! Your information has been uploaded!");

            $('#myForm').each(function(){
            this.reset();
            });



          });

});


