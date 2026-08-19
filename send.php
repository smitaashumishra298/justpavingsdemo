<?php

header("Content-Type: application/json");


/* =========================
   CHECK REQUEST
========================= */

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    echo json_encode([
        "success" => false,
        "message" => "Invalid request."
    ]);

    exit;
}


/* =========================
   GET FORM DATA
========================= */

$name = trim($_POST["name"] ?? "");
$email = trim($_POST["email"] ?? "");
$phone = trim($_POST["phone"] ?? "");
$message = trim($_POST["message"] ?? "");


/* =========================
   REQUIRED VALIDATION
========================= */

if (
    $name === "" ||
    $email === "" ||
    $phone === "" ||
    $message === ""
) {

    echo json_encode([
        "success" => false,
        "message" => "Please fill in all required fields."
    ]);

    exit;
}


/* =========================
   EMAIL VALIDATION
========================= */

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {

    echo json_encode([
        "success" => false,
        "message" => "Invalid email address."
    ]);

    exit;
}


/* =========================
   PHONE VALIDATION
========================= */

if (!preg_match("/^[6-9][0-9]{9}$/", $phone)) {

    echo json_encode([
        "success" => false,
        "message" => "Invalid phone number."
    ]);

    exit;
}


/* =========================
   EMAIL SETTINGS
========================= */

/*
 * YAHAN APNA RECEIVING EMAIL DAALO
 */

$to = "YOUR-RECEIVING-EMAIL@gmail.com";


/*
 * Agar domain email bana hua hai
 * to us email ko From mein use karo.
 */

$fromEmail = "info@surepathsolutions.co.in";


$subject = "New Get Quote Enquiry - Website";


/* =========================
   EMAIL BODY
========================= */

$emailBody = "New Get Quote enquiry received from website.\n\n";

$emailBody .= "Name: " . $name . "\n";

$emailBody .= "Email: " . $email . "\n";

$emailBody .= "Phone: " . $phone . "\n\n";

$emailBody .= "Message:\n";

$emailBody .= $message . "\n";


/* =========================
   HEADERS
========================= */

$headers = "From: Website Enquiry <" . $fromEmail . ">\r\n";

$headers .= "Reply-To: " . $email . "\r\n";

$headers .= "MIME-Version: 1.0\r\n";

$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";


/* =========================
   SEND EMAIL
========================= */

$mailSent = mail(
    $to,
    $subject,
    $emailBody,
    $headers
);


/* =========================
   RESPONSE
========================= */

if ($mailSent) {

    echo json_encode([
        "success" => true,
        "message" => "Email sent successfully."
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Email could not be sent. Please check your hosting email configuration."
    ]);

}

?>
