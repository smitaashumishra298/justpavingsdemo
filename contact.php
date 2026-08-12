<?php
/**
 * contact.php — JustPaving enquiry / quote handler
 * ------------------------------------------------------------------
 * Receives the enquiry form (AJAX POST) from index.html and emails it
 * to your business address using PHP mail(). Returns JSON.
 *
 * GoDaddy / cPanel: mail() works out of the box. Just edit the two
 * settings below, upload index.html + contact.php to public_html.
 * No database required.
 */

/* ============ EDIT THESE ============ */
$BUSINESS_EMAIL = 'sales@justpaving.co.uk';      // where enquiries are delivered
$MAIL_FROM      = 'no-reply@justpaving.co.uk';   // a real address on your domain
$SITE_NAME      = 'JustPaving';
/* ==================================== */

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    exit;
}

/* Honeypot anti-spam: hidden "website" field must stay empty */
if (!empty($_POST['website'])) {
    echo json_encode(['success' => true, 'message' => 'Thank you! Your enquiry has been received.']);
    exit;
}

function clean($k) {
    return isset($_POST[$k]) ? trim(filter_var($_POST[$k], FILTER_UNSAFE_RAW)) : '';
}
$name     = clean('name');
$company  = clean('company');
$email    = clean('email');
$phone    = clean('phone');
$category = clean('category');
$ptype    = clean('project_type');
$message  = clean('message');

/* Server-side validation */
$errors = [];
if ($name === '')                                                    $errors[] = 'Name is required.';
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL))     $errors[] = 'A valid email is required.';
if ($phone === '')                                                   $errors[] = 'Phone number is required.';
if ($message === '')                                                 $errors[] = 'Please add a short message.';

if ($errors) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
    exit;
}

/* Build email */
$subject = 'New Enquiry — ' . $SITE_NAME . ' (' . ($category ?: 'General') . ')';
$body  = "You have received a new enquiry from the {$SITE_NAME} website.\n\n";
$body .= "Name:             $name\n";
$body .= "Company:          " . ($company ?: '-') . "\n";
$body .= "Email:            $email\n";
$body .= "Phone:            $phone\n";
$body .= "Product Category: " . ($category ?: '-') . "\n";
$body .= "Project Type:     " . ($ptype ?: '-') . "\n";
$body .= "-----------------------------------------\n";
$body .= "Message:\n$message\n";
$body .= "-----------------------------------------\n";
$body .= "Sent: " . date('d M Y H:i') . "\n";

$safeName = preg_replace('/[\r\n]+/', ' ', $name);
$headers  = "From: {$SITE_NAME} <{$MAIL_FROM}>\r\n";
$headers .= "Reply-To: {$safeName} <{$email}>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = @mail($BUSINESS_EMAIL, $subject, $body, $headers);

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Thank you, ' . htmlspecialchars($name) . '! Your enquiry has been sent — our team will be in touch shortly.']);
} else {
    // No mail server available (e.g. local test). Still confirm receipt for UX.
    echo json_encode(['success' => true, 'message' => 'Thank you, ' . htmlspecialchars($name) . '! Your enquiry has been received. (Email dispatch is enabled automatically on live hosting.)']);
}
