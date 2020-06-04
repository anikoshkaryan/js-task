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

        let message = $(".invalid").eq(0).closest(".input-container").find(".warning-message");
        $(message).text("Please fill out this field");
        $(message).addClass("show");

    });
    $.ajax({
        url:"https://restcountries.eu/rest/v2/all",
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
});



