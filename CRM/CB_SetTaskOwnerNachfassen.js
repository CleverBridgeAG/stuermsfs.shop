void automation.CB_SetTaskOwnerNachfassen(Int ID)
{
// CB yh - ST-T31
// RECORDS
task = zoho.crm.getRecordById("Tasks",ID);
// MAPS
v_map_update = Map();
//
v_module = task.get("$se_module");
if(v_module == "Quotes")
{
	v_id_quote = task.get("What_Id").get("id");
	quote = zoho.crm.getRecordById("Quotes",v_id_quote);
	v_account = quote.get("Account_Name");
	if(v_account != null)
	{
		v_id_account = v_account.get("id");
		account = zoho.crm.getRecordById("Accounts",v_id_account);
		v_id_owner = account.get("vid").get("id");
		// update task owner
		v_map_update.put("Owner",v_id_owner);
		v_resp = zoho.crm.updateRecord("Tasks",ID,v_map_update);
		info v_resp;
	}
	else
	{
		info "quote has no Account";
	}
}
else
{
	info "related module is not Quotes";
}
}