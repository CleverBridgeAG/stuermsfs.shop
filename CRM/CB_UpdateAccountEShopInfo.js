void automation.CB_UpdateAccountEShopInfo(Int ID)
{
// CB yh - ST-T66 - update anbin_eshop field on Account based on eshop_user status
// CONFIG
// CONSTANTS
// VARIABLES
// MAPS
v_map_update = Map();
v_map_query = Map();
// LISTS
// LOGIC
v_map_query.put("select_query","SELECT id FROM Contacts WHERE ((Account_Name = " + ID + ") AND SAP_Kontakt1 = anlegen) LIMIT 1");
v_resp2 = invokeurl
[
	url :"https://www.zohoapis.eu/crm/v7/coql"
	type :POST
	parameters:v_map_query.toString()
	connection:"cbcrmfullaccess"
];
info v_resp2;
v_map_update.put("anbin_eshop",v_resp2 != "");
v_resp = zoho.crm.updateRecord("Accounts",ID,v_map_update);
info v_resp;
}