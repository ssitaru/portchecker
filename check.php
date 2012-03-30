<?php
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

$port = $_REQUEST['port'];

$stat = stat('.lastrequest');
if(($stat['mtime'] + 2) > time())
{
	$dt = time() - $stat['mtime'];
	$err = "delta T is $dt - must be > 2";
	$response = array('return' => false, 'error' => $err);
	send_and_exit($response);
}

touch('.lastrequest');

if(empty($port)) 
{
	$response = array('return' => false, 'error' => 'no port');
	send_and_exit($response);
}

$ret = fsockopen('127.0.0.1', $port, $errno, $errstr, 5);
if($ret) 
{
    $response = array('return' => true, 'port' => 'open');
} else {
    $response = array('return' => true, 'port' => 'closed');
}
send_and_exit($response);

function send_and_exit($r)
{
	$response = json_encode($r);
	echo $response;
	exit;
}
?>