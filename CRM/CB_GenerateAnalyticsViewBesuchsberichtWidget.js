string standalone.CB_GenerateAnalyticsViewBesuchsberichtWidget()
{
// CB yh - RB1-T4
// CONSTANTES
v_id_org = "20100654034";
v_id_workspace = "238641000000007358";
v_id_view = "238641000003665002";
today = zoho.currentdate;
// org variables
v_linkVarName = "CB_Widget_Besuchsbericht_Analytics_URL";
v_validUntilVarName = "CB_Widget_Besuchsbericht_Analytics_ValidDate";
//
// read org variables
v_storedLink = zoho.crm.getOrgVariable(v_linkVarName);
v_storedValidUntil = zoho.crm.getOrgVariable(v_validUntilVarName);
// check if url valid
if(v_storedLink != null && v_storedLink != "" && v_storedValidUntil != null && v_storedValidUntil != "")
{
	validUntilDate = v_storedValidUntil.toDate("yyyy-MM-dd");
	if(validUntilDate >= today)
	{
		return v_storedLink;
	}
}
// Falls kein gültiger Link vorhanden ist: neuen Link generieren
v_map_headers = Map();
v_map_headers.put("ZANALYTICS-ORGID",v_id_org);
// CONFIG
v_map_config = Map();
v_map_config.put("regenerateKey",true);
v_map_config.put("removeExpiryDate",true);
v_config_str = v_map_config.toString();
v_config_encoded = encodeUrl(v_config_str);
url = "https://analyticsapi.zoho.eu/restapi/v2/workspaces/" + v_id_workspace + "/views/" + v_id_view + "/publish/privatelink?CONFIG=" + v_config_encoded;
v_resp_analytics = invokeurl
[
	url :url
	type :POST
	headers:v_map_headers
	connection:"cbanalytics"
];
info v_resp_analytics;
v_newurl = v_resp_analytics.get("data").get("privateUrl");
// Neues Ablaufdatum: heute + 14 Tage
v_newValidUntil = today.addDay(14).toString("yyyy-MM-dd");
// Link speichern
v_map_value = Map();
v_map_value.put("apiname",v_linkVarName);
v_map_value.put("value",v_newurl);
v_resp_setlink = zoho.crm.invokeConnector("crm.set",v_map_value);
info v_resp_setlink;
// Ablaufdatum speichern
v_map_value = Map();
v_map_value.put("apiname",v_validUntilVarName);
v_map_value.put("value",v_newValidUntil);
v_resp_setDate = zoho.crm.invokeConnector("crm.set",v_map_value);
info v_resp_setDate;
return v_newurl;
}