if (jQuery('body.STANDALONE-PRODUCT-PAGE #dossier .Column2').find('.infoModule').length) {
    if (jQuery('.infoModule').find('.product_page_video').length) {
        var g_idAttribute = null, id;
        g_idAttribute = jQuery('.product_page_video').attr('data-youtube-value');
        jQuery('#videoId').attr('value', g_idAttribute);
        jQuery('#videoId').attr('data-param', g_idAttribute);
        console.log('before Cart = ' + g_idAttribute);
        jQuery('#addToCart').click(function () {
            jQuery('#checkoutButton').click(function () {
                console.log('checkoutButton = ' + g_idAttribute);
                jQuery.ajax({
                    type: 'GET',
                    url: 'https://www.eddiebauer.com/checkout/bag.jsp',
                    data: id + "=" + g_idAttribute,
                    success: function (data) {
                        // successful request; do something with the data
                        alert(data);
                        console.log(data);
                        if (jQuery('body#cat27411.EB').length) {
                            alert('data = ' + data);
                            jQuery(data).find('item').each(function (i) {
                                jQuery('#bag').append('<input type="hidden" value="' + jQuery(this).find('idNamespace').text() + '" name="videoId" id="videoId">');
                            });
                        }
                    },
                    error: function (data) {
                        // failed request; give feedback to user
                        alert('request failed = ' + data);

                        //jQuery('#bag').html('<p class="error"><strong>Oops!</strong> Try that again in a few moments.</p>');
                    }
                });
            });
        });
    }
}