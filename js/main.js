var portlist = [
{'port': 22, 'service': 'SSH'},
{'port': 21, 'service': 'FTP'},
{'port': 25, 'service': 'SMTP'},
{'port': 993, 'service': 'IMAP'},
{'port': 3306, 'service': 'MySQL'},
];

function getPortStatus(o) 
{
	var len=o.length;
	for(var k=0; k < len; k++) {
		var v = o[k];
		var current_service = v['service'];
		var current_port = v['port'];
		window.setTimeout(function(v){
			return function() { // strange closure bug, fixed
				var postData = {port: v['port']};
				$.post('/heartbeat/check.php', postData, function(data){
					//alert(data);
					if(data['return'] == true)
					{
						if(data['port'] == 'open')
						{
							$('#td3_'+v['service']).text('online').addClass('online');
						} else {
							$('#td3_'+v['service']).text('offline').addClass('offline');
						}
					} else {
						$('#td3_'+v['service']).text('error').addClass('offline');
					}
				});
			};
		}(v), 1000*(k+1));
	}
	
}

function initPortStatus(o)
{
	o.forEach(function(v, k){
		var tr_id = 'tr_'+v['service'];
		var td1_id = 'td1_'+v['service'];
		var td2_id = 'td2_'+v['service'];
		var td3_id = 'td3_'+v['service'];
		if($('#'+tr_id).length <= 0) 
		{
			$('#maintable tr:last').after('<tr id="'+tr_id+'"></tr>');
		}
		if($('#'+td1_id).length <= 0) 
		{
			$('#'+tr_id).append('<td id="'+td1_id+'">*:'+v['port']+'</td>');
		}
		if($('#'+td2_id).length <= 0) 
		{
			$('#'+tr_id).append('<td id="'+td2_id+'">'+v['service']+'</td>');
		}
		if($('#'+td3_id).length <= 0) 
		{
			$('#'+tr_id).append('<td id="'+td3_id+'" class="checking">checking...</td>');
		}
	});
}
$(document).ready(function(){
	initPortStatus(portlist);
	window.setTimeout(getPortStatus(portlist),200);
});

