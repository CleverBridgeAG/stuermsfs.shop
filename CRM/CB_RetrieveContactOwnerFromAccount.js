void automation.CB_RetrieveContactOwnerFromAccount(Int id_contact,Int id_owner,String vkbur)
{
// CB yh - ST-T69
// MAPS
v_map_update = Map();
v_map_update.put("Owner",id_owner);
v_map_update.put("vkbur",vkbur);
v_resp = zoho.crm.updateRecord("Contacts",id_contact,v_map_update);
}