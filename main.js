var portlist = [
{'port': 80, 'service': 'HTTP'},
{'port': 22, 'service': 'SSH'},
{'port': 21, 'service': 'FTP'},
{'port': 25, 'service': 'SMTP'},
];

function getPortStatus(o) 
{
	o.foreach(function(k, v){
		$.delay(2000);
		var postData = {'port': v['port']};
		$.post('/heartbeat/check.php', postData, function(data){
				
		});
	});
}

function initPortStatus(o)
{
	o.foreach(function(k, v){
		var tr_id = 'tr_'+v['service'];
		var td1_id = 'td1_'+v['service'];
		var td2_id = 'td2_'+v['service'];
		var td3_id = 'td3_'+v['service'];
		if($('#'+tr_id).length <= 0) 
		{
			$('#maintable tbody').add('tr').attr('id', tr_id);
		}
		if($('#'+td1_id).length <= 0) 
		{
			$('#'+tr_id).add('td').attr('id', td1_id).text('*:'+v['port']);
		}
		if($('#'+td2_id).length <= 0) 
		{
			$('#'+tr_id).add('td').attr('id', td2_id).text(v['service']);
		}
		if($('#'+td3_id).length <= 0) 
		{
			$('#'+tr_id).add('td').attr('id', td3_id).addClass('checking').text('checking...');
		}
	});
}

initPortStatus(portlist);
