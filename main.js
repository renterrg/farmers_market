$(document).ready(function() {

    $(document).on('click', '#searchButton', function(e) {
        $('#content').html('');
        ////////////////////farmers market ////////////////////
        var zip = $('#zip').val();
        $.ajax({
            url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + zip,
            contentType: "application/json; charset=utf-8",
            dataType: 'jsonp',
            context: document.body
        }).done(function(res) {
            for (var markets in res.results) {
                var marketName = res.results[markets].marketname;
                var id = res.results[markets].id;
                getmarketDetails(marketName, id);
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
        }).done(function(res) {
            var Address = res.marketdetails.Address;
            var GoogleLink = res.marketdetails.GoogleLink;
            var Products = res.marketdetails.Products;
            var Schedule = res.marketdetails.Schedule;
            var mapSrc = 'https://maps.googleapis.com/maps/api/staticmap?center=' + Address + '&size=320x240&zoom=15&key=AIzaSyBr4KKhAkxT3KGIH7sqxBxPlcJimrJX-ZA';

            var market = "<div> <h2>" + marketName + "</h2> <img src='" + mapSrc + "'> <p><b> Location: </b> <a href='" + GoogleLink + "' target='_blank' >" + Address + "</a></p> <p> <b> Products: </b>" + Products + "</p> <p> <b> Hours: </b>" + Schedule + "</p> </div>";
        });
    }
});
