bool CB_AccountUpdateVID(list vid, string id_account)
{
v_success = true;
v_map_update = Map();
v_map_update.put("vid",vid);
try 
{
	v_resp = zoho.crm.updateRecord("Accounts",id_account,v_map_update);
	info v_resp;
	v_id_account = v_resp.get("id");
}
catch (e)
{
	v_success = false;
}
return v_success;
}