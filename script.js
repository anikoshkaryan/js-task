/* order-steps function*/
$(document).ready(function () {
    $(".step-title").click(function () {
        let form = $(this).attr("data-form");
        $(" .form-container > div").addClass("hidden");
        $(`.${form}`).removeClass("hidden");

    });
    $(".btn").click(function () {
        let inputs = $(this).closest(".main-content").find(".input-field");
        $(inputs).each(function () {
            if ($(this).val().length === 0) {
                $(this).addClass("invalid");

            }

        });

        let message = $(".invalid").eq(0).closest(".input-container").find(".warning-message");
        $(message).text("Please fill out this field");
        $(message).addClass("show");

    });
});



