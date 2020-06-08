/* order-stezps function*/
$(document).ready(function () {
    /*$(".step-title").click(function () {
        let form = $(this).attr("data-form");
        $(" .form-container > div").addClass("hidden");
        $(`.${form}`).removeClass("hidden");

    });*/
    $(".btn").click(function () {
        let inputs = $(this).closest(".main-content").find(".input-field:not(.optional)");
        $(inputs).removeClass("invalid");
        $(".warning-message.show").removeClass("show");
        $(inputs).each(function () {
            if ($(this).val().length === 0) {
                $(this).addClass("invalid");
            }

        });
        let invalid = $(this).closest(".main-content").find(".invalid");
        if (invalid.length === 0) {
            let active = $("[data-next]:not('.hidden')");
            let activeAttribute = $(active).attr("data-next");
            $(`.${activeAttribute}`).removeClass("hidden");
            if (activeAttribute === "thanks-message") {
                $(".order-steps").addClass("hidden");
                thanksBlock();
            } else {
                $(".step-title").removeClass("active");
                $(`[data-form=${activeAttribute}]`).addClass("active");
                $(active).addClass("hidden");
            }


        } else {
            let message = $(invalid).eq(0).closest(".input-container").find(".warning-message");
            $(message).text("Please fill out this field");
            $(message).addClass("show");
        }


    });
    function thanksBlock (){
        $(".thanks-message .email").text($("[name='email-address']").val());
        let num = localStorage.getItem("orderNumber");
        if (!num){
            localStorage.setItem("orderNumber",188787788);
        }else {
            localStorage.setItem("orderNumber", +num + 1);
        }
        $(".ordNum").text(localStorage.getItem("orderNumber"));
        let date = $(".delivery-date");
        let now = new  Date();
        now.setMonth(now.getMonth() + 1);
        date.text(now);
    }
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
                let active = $("[data-next]:not('.hidden')");
                let city = result.results[0].components.city;
                let country = result.results[0].components.country;
                $(active).find("[name='city']").val(city);
                $(active).find(`.country-input option[value='${country}']`).attr("selected", "true");
                $(active).find(".country-input").removeClass("invalid");
                $(active).find("[name= 'city']").removeClass("invalid");
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
    $(".same-as-shipping").click(function () {
        let $copyInputs = [...document.querySelectorAll(".copy")];
        let $pasteInputs = [...document.querySelectorAll(".paste")];
        $copyInputs.forEach(function (copyInput) {
            let filtered = $pasteInputs.filter(function (pasteInput) {
                return $(pasteInput).attr("name") === $(copyInput).attr("name");
            });
            if (filtered.length > 0) {
                filtered[0].value = copyInput.value;
            }

        });
    })
});



