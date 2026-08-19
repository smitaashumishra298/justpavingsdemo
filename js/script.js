<script>
document.addEventListener("DOMContentLoaded", function () {

    const navQuoteBtn = document.getElementById("navQuoteBtn");
    const quotePopup = document.getElementById("quotePopup");
    const closeQuote = document.getElementById("closeQuote");

    if (!navQuoteBtn || !quotePopup) {
        return;
    }


    // OPEN POPUP
    navQuoteBtn.addEventListener("click", function () {

        quotePopup.classList.add("active");

    });


    // CLOSE POPUP
    closeQuote.addEventListener("click", function () {

        quotePopup.classList.remove("active");

    });


    // CLOSE WHEN CLICKING OUTSIDE
    quotePopup.addEventListener("click", function (event) {

        if (event.target === quotePopup) {

            quotePopup.classList.remove("active");

        }

    });


    // ESC KEY
    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            quotePopup.classList.contains("active")
        ) {

            quotePopup.classList.remove("active");

        }

    });

});
</script>
