string standalone.CB_SendBesuchsberichtNotificationWidget(String users,String current_user,String besuchsbericht_id,String meeting_id,String account_id)
{
// CB yh - RB1-T4 - Besuchsbericht Notification aus Widget
v_list_users = users.toList();
v_map_current_user = current_user.toMap();
v_list_data = list();
v_map_maildata = Map();
// ACCOUNT NAME
v_account = zoho.crm.getRecordById("Accounts",account_id.toLong());
v_account_name = ifnull(v_account.get("Account_Name"),"");
// START TIME
v_meeting = zoho.crm.getRecordById("Events",meeting_id.toLong());
v_start_datetime = v_meeting.get("Start_DateTime");
v_start_time = "";
v_start_datetime_text = v_start_datetime.toString();
// Format z.B. 2026-05-05T14:30:00+02:00 → 2026-05-05 14:30
v_start_datetime_text = v_start_datetime_text.replaceAll("T"," ");
v_start_datetime_text = v_start_datetime_text.subString(0,16);
v_start_time = v_start_datetime_text.toDateTime("yyyy-MM-dd HH:mm").toString("dd.MM.yyyy HH:mm");
// FROM
v_map_from = Map();
v_map_from.put("user_name","Admin");
v_map_from.put("email","stuermsfsadmin@work.cleverbridge.ch");
v_map_maildata.put("from",v_map_from);
// TO
v_list_to = list();
for each  v_user in v_list_users
{
	v_map_to = Map();
	v_map_to.put("user_name",ifnull(v_user.get("name"),""));
	v_map_to.put("email",ifnull(v_user.get("email"),""));
	v_list_to.add(v_map_to);
}
v_map_maildata.put("to",v_list_to);
// SUBJECT + CONTENT
v_current_user_name = ifnull(v_map_current_user.get("name"),"");
v_subject = "Besuchsbericht wurde aktualisiert für Kunde: " + v_account_name;
v_content = "";
v_content = v_content + "<p>Guten Tag</p>";
v_content = v_content + "<p>" + v_current_user_name + " hat einen Besuchsbericht aktualisiert und möchte dich darüber informieren.</p>";
v_content = v_content + "<p><b>Kundenname:</b> " + v_account_name + "</p>";
v_content = v_content + "<p><b>Besuchszeitpunkt:</b> " + v_start_time + "</p>";
v_content = v_content + "<p><a href='https://crm.zoho.eu/crm/org20100653222/tab/WebTab2?widgetparams=%22" + meeting_id + "%22' target='_blank'>Besuchsbericht öffnen</a></p>";
v_content = v_content + "<p>Freundliche Grüsse<br>" + v_current_user_name + "<br>stürmsfs AG</p>";
v_map_maildata.put("subject",v_subject);
v_map_maildata.put("content",v_content);
v_map_maildata.put("mail_format","html");
// FINAL DATA ARRAY
v_list_data.add(v_map_maildata);
// ROOT MAP
v_map_body = Map();
v_map_body.put("data",v_list_data);
v_url = "https://www.zohoapis.eu/crm/v8/stuerm_Besuchsberichte/" + besuchsbericht_id + "/actions/send_mail";
v_resp = invokeurl
[
	url :v_url
	type :POST
	parameters:v_map_body.toString()
	connection:"cbcrmfullaccess"
];
info v_resp;
return v_resp.toString();
}