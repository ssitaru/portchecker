var portlist = [
{'port': 22, 'service': 'SSH'},
{'port': 21, 'service': 'FTP'},
{'port': 25, 'service': 'SMTP'},
];

function getPortStatus(o) 
{
	window.setInterval(function(){
		o.forEach(function(v, k){
		var postData = {port: v['port']};
		$.post('/heartbeat/check.php', postData, function(data){
				if(data['return'])
				{
					$('#td3_'+v['service']).text('ok').addClass('online');
				} else {
					$('#td3_'+v['service']).text('failed').addClass('offline');
				}
			});
		});
	}, 2000);
	
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

