/* order-stezps function*/
$(document).ready(function () {
    $(".step-title").click(function () {
        let form = $(this).attr("data-form");
        $(" .form-container > div").addClass("hidden");
        $(`.${form}`).removeClass("hidden");

    });
    $(".btn").click(function () {
        let inputs = $(this).closest(".main-content").find(".input-field:not(.optional)");
        $(inputs).removeClass("invalid");
        $(".warning-message.show").removeClass("show");
        $(inputs).each(function () {
            console.log($(this), $(this).val());
            if ($(this).val().length === 0) {
                $(this).addClass("invalid");
            }

        });

        let message = $(this).closest(".main-content").find(".invalid").eq(0).closest(".input-container").find(".warning-message");
        $(message).text("Please fill out this field");
        $(message).addClass("show");


    });

    $(".input-field").focus(function () {
        $(this).removeClass("invalid");
        $(this).closest(".input-container").find(".warning-message").removeClass("show");
    });
    $.ajax({
        url: "https://restcountries.eu/rest/v2/all",
        success: function (result) {
            setCountries(result);
        }

    });

    function setCountries(x) {
        let select = $(".country-input");
        x.forEach((country) => {
            let option = document.createElement("option");
            $(option).val(country.name);
            $(option).text(country.name);
            select.append(option);

        })
    }

    $(".geolocation-icon").click(function () {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
        } else {
            navigator.geolocation.getCurrentPosition(locationSuccess, locationFail);
        }
    });

    function locationSuccess(position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        $.ajax({
            url: `https://api.opencagedata.com/geocode/v1/json?q=${lat},${long}&key=85c6959e8b7e40beab666006dcf5d35d`,
            success: function (result) {
                let city = result.results[0].components.city;
                let country = result.results[0].components.country;
                $("[name= 'city']").val(city);
                $(`.country-input option[value='${country}']`).attr("selected", "true");
                $(".country-input").removeClass("invalid");
                $("[name= 'city']").removeClass("invalid");
            }
        })
    }

    function locationFail() {
        alert('Unable to retrieve your location');
    }

    $(".input-phone").inputmask("+(374)99 99-99-99");
    $("[name='email-address']").inputmask({alias: "email"});
    $("[name='card-number']").inputmask("9999 9999 9999 9999");
    $(".date").inputmask({
        alias: 'datetime',
        inputFormat: 'mm/yy'
    });
    $(".code").inputmask("999");
});



