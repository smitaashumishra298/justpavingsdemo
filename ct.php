<?php

header("Content-Type: application/json; charset=UTF-8");


/* ============================================================
   ONLY POST REQUEST ALLOWED
============================================================ */

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    echo json_encode([
        "success" => false,
        "message" => "Invalid request."
    ]);

    exit;
}


/* ============================================================
   GET FORM DATA
============================================================ */

$fullName = trim($_POST["full_name"] ?? "");
$companyName = trim($_POST["company_name"] ?? "");
$address = trim($_POST["address"] ?? "");
$phone = trim($_POST["phone"] ?? "");
$message = trim($_POST["message"] ?? "");


/* ============================================================
   SERVER-SIDE VALIDATION
============================================================ */

if (
    $fullName === "" ||
    $companyName === "" ||
    $address === "" ||
    $phone === "" ||
    $message === ""
) {

    echo json_encode([
        "success" => false,
        "message" => "Please fill in all required fields."
    ]);

    exit;
}


/* ============================================================
   PHONE VALIDATION
============================================================ */

if (!preg_match("/^[0-9+\-\s()]{7,15}$/", $phone)) {

    echo json_encode([
        "success" => false,
        "message" => "Please enter a valid phone number."
    ]);

    exit;
}


/* ============================================================
   SECURITY
============================================================ */

$fullName = htmlspecialchars(
    $fullName,
    ENT_QUOTES,
    "UTF-8"
);

$companyName = htmlspecialchars(
    $companyName,
    ENT_QUOTES,
    "UTF-8"
);

$address = htmlspecialchars(
    $address,
    ENT_QUOTES,
    "UTF-8"
);

$phone = htmlspecialchars(
    $phone,
    ENT_QUOTES,
    "UTF-8"
);

$message = htmlspecialchars(
    $message,
    ENT_QUOTES,
    "UTF-8"
);


/* ============================================================
   EMAIL SETTINGS
============================================================ */

/*
   CHANGE THIS EMAIL
   TO YOUR BUSINESS EMAIL
*/

$to = "YOUR_EMAIL@gmail.com";

$subject = "New Quote Request - JustPaving";


/* ============================================================
   EMAIL BODY
============================================================ */

$emailBody = "

========================================
NEW QUOTE REQUEST
========================================

Full Name:
$fullName

Company Name:
$companyName

Address:
$address

Phone Number:
$phone

Message:
$message

========================================
JustPaving Website
========================================

";


/* ============================================================
   EMAIL HEADERS
============================================================ */

$headers = "From: JustPaving Website <no-reply@" .
    ($_SERVER["HTTP_HOST"] ?? "yourwebsite.com") .
    ">\r\n";

$headers .= "Reply-To: " . $to . "\r\n";

$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";


/* ============================================================
   SEND EMAIL
============================================================ */

$mailSent = mail(
    $to,
    $subject,
    $emailBody,
    $headers
);


/* ============================================================
   RESPONSE
============================================================ */

if ($mailSent) {

    echo json_encode([
        "success" => true,
        "message" => "Thank you! Your quote request has been sent successfully."
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Sorry, we could not send your request. Please try again later."
    ]);

}

exit;

?>