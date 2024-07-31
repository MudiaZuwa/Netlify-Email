<?php
$to = 'mudiaosazuwa@gmail.com';
$subject = 'Test mail';
$message = 'Hello! This is a simple email message.';
$headers = 'From: webmaster@example.com';

if (mail($to, $subject, $message, $headers)) {
    echo 'Mail sent successfully.';
} else {
    echo 'Mail sending failed.';
}
?>
