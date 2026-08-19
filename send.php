<?php
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["success"=>false,"message"=>"Invalid request."]);
    exit;
}

$name=trim($_POST["name"] ?? "");
$email=trim($_POST["email"] ?? "");
$phone=trim($_POST["phone"] ?? "");
$message=trim($_POST["message"] ?? "");

if($name==="" || $email==="" || $phone==="" || $message===""){
    echo json_encode(["success"=>false,"message"=>"Please fill in all required fields."]);
    exit;
}

if(!filter_var($email,FILTER_VALIDATE_EMAIL)){
    echo json_encode(["success"=>false,"message"=>"Invalid email address."]);
    exit;
}

if(!preg_match("/^[6-9][0-9]{9}$/",$phone)){
    echo json_encode(["success"=>false,"message"=>"Invalid phone number."]);
    exit;
}

/*
 * IMPORTANT:
 * Replace YOUR_EMAIL@gmail.com with the email address
 * where you want to receive enquiries.
 */
$to="YOUR_EMAIL@gmail.com";

$subject="New Get Quote Enquiry";

$emailBody="New enquiry received from your website.\n\n";
$emailBody.="Name: ".$name."\n";
$emailBody.="Email: ".$email."\n";
$emailBody.="Phone: ".$phone."\n\n";
$emailBody.="Message:\n".$message."\n";

$headers="From: Website Enquiry <no-reply@yourdomain.com>\r\n";
$headers.="Reply-To: ".$email."\r\n";
$headers.="Content-Type: text/plain; charset=UTF-8\r\n";

$mailSent=mail($to,$subject,$emailBody,$headers);

if($mailSent){
    echo json_encode(["success"=>true,"message"=>"Email sent successfully."]);
}else{
    echo json_encode(["success"=>false,"message"=>"Email could not be sent. Please check your hosting email configuration."]);
}
?>
