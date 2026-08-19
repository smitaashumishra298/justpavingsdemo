document.addEventListener("DOMContentLoaded", function () {

    const navQuoteBtn = document.getElementById("navQuoteBtn");
    const quotePopup = document.getElementById("quotePopup");
    const closeQuote = document.getElementById("closeQuote");
    const quoteForm = document.getElementById("quoteForm");

    const nameInput = document.getElementById("quoteName");
    const emailInput = document.getElementById("quoteEmail");
    const phoneInput = document.getElementById("quotePhone");
    const messageInput = document.getElementById("quoteMessage");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const phoneError = document.getElementById("phoneError");
    const messageError = document.getElementById("messageError");

    const formMessage = document.getElementById("formMessage");
    const submitButton = document.getElementById("quoteSubmit");


    /* =========================
       OPEN POPUP
    ========================= */

    if (navQuoteBtn && quotePopup) {

        navQuoteBtn.addEventListener("click", function (e) {

            e.preventDefault();

            quotePopup.classList.add("active");

            document.body.style.overflow = "hidden";

        });

    }


    /* =========================
       CLOSE POPUP
    ========================= */

    function closePopup() {

        quotePopup.classList.remove("active");

        document.body.style.overflow = "";

    }


    if (closeQuote) {

        closeQuote.addEventListener("click", closePopup);

    }


    /* =========================
       CLICK OUTSIDE
    ========================= */

    if (quotePopup) {

        quotePopup.addEventListener("click", function (event) {

            if (event.target === quotePopup) {

                closePopup();

            }

        });

    }


    /* =========================
       ESC KEY
    ========================= */

    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            quotePopup.classList.contains("active")
        ) {

            closePopup();

        }

    });


    /* =========================
       PHONE ONLY NUMBERS
    ========================= */

    if (phoneInput) {

        phoneInput.addEventListener("input", function () {

            this.value = this.value.replace(/\D/g, "").slice(0, 10);

        });

    }


    /* =========================
       FORM SUBMIT
    ========================= */

    if (quoteForm) {

        quoteForm.addEventListener("submit", async function (event) {

            event.preventDefault();


            /* Clear previous errors */

            nameError.textContent = "";
            emailError.textContent = "";
            phoneError.textContent = "";
            messageError.textContent = "";

            formMessage.textContent = "";
            formMessage.className = "";


            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const phone = phoneInput.value.trim();
            const message = messageInput.value.trim();


            let valid = true;


            /* NAME */

            if (name.length < 2) {

                nameError.textContent = "Please enter your name.";

                valid = false;

            }


            /* EMAIL */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                emailError.textContent =
                    "Please enter a valid email address.";

                valid = false;

            }


            /* PHONE */

            const phonePattern =
                /^[6-9][0-9]{9}$/;

            if (!phonePattern.test(phone)) {

                phoneError.textContent =
                    "Please enter a valid 10 digit phone number.";

                valid = false;

            }


            /* MESSAGE */

            if (message.length < 5) {

                messageError.textContent =
                    "Please enter your project details.";

                valid = false;

            }


            if (!valid) {

                return;

            }


            /* BUTTON */

            submitButton.disabled = true;

            submitButton.textContent = "Sending...";


            try {

                const formData = new FormData(quoteForm);

                const response = await fetch(
                    quoteForm.action,
                    {
                        method: "POST",
                        body: formData
                    }
                );


                const result = await response.json();


                if (result.success) {

                    formMessage.className = "success-message";

                    formMessage.textContent =
                        "Thank you! Your enquiry has been sent successfully.";

                    quoteForm.reset();


                    setTimeout(function () {

                        closePopup();

                        formMessage.textContent = "";
                        formMessage.className = "";

                    }, 2500);


                } else {

                    formMessage.className = "error-message";

                    formMessage.textContent =
                        result.message ||
                        "Something went wrong. Please try again.";

                }


            } catch (error) {

                console.error(error);

                formMessage.className = "error-message";

                formMessage.textContent =
                    "Unable to send enquiry. Please try again later.";

            }


            submitButton.disabled = false;

            submitButton.textContent = "Send Enquiry";

        });

    }

});
