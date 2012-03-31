var portlist = [
{'port': 22, 'service': 'SSH'},
{'port': 21, 'service': 'FTP'},
{'port': 25, 'service': 'SMTP'},
];

function getPortStatus(o) 
{
	var local_ports = o;
	for(var k=0; k < o.length; k++) {
		if(o[k])
		window.setInterval(function(){
			var v = local_ports[k];
			var postData = {port: v['port']};
			$.post('/heartbeat/check.php', postData, function(data){
				alert(data);
				if(data['return'] == true)
				{
					$('#td3_'+v['service']).text('ok').addClass('online');
				} else {
					$('#td3_'+v['service']).text('failed').addClass('offline');
				}
			});
		}, 2000*(k+1));
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
			$('#'+tr_id).append('<td id="'+td1_id+'" class="checking">checking...</td>');
		}
	});
}
$(document).ready(function(){
	initPortStatus(portlist);
});

