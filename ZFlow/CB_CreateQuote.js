map CB_CreateQuote(map quoteditems, map extractlookupvalues, map extractvalues)
{
// fix vars
v_url = "https://www.zohoapis.eu/crm/v7/Quotes";
v_params = Map();
v_paramL = List();
v_prm = Map();
v_map = Map();
//
//
v_params.put("Quoted_Items",quoteditems.get("Quoted_Items"));
v_params.put("Account_Name",extractlookupvalues.get("account_id"));
v_params.put("Subject",extractlookupvalues.get("subject"));
v_params.put("Currency",extractvalues.get("curcy"));
v_params.put("af_art",extractvalues.get("af_art"));
v_params.put("af_date",extractvalues.get("af_date"));
v_params.put("ag_art",extractvalues.get("ag_art"));
//v_params.put("besteller",extractvalues.get("curcy"));
v_params.put("bestellnummer",extractlookupvalues.get("bestellnummer"));
v_params.put("Billing_City",extractlookupvalues.get("Billing_City"));
v_params.put("Billing_Code",extractlookupvalues.get("Billing_Code"));
v_params.put("Billing_Country",extractlookupvalues.get("Billing_Country"));
v_params.put("Billing_State",extractlookupvalues.get("Billing_State"));
v_params.put("Billing_Street",extractlookupvalues.get("Billing_Street"));
v_params.put("status_gesamt",extractlookupvalues.get("status_gesamt"));
v_params.put("vkbur",extractlookupvalues.get("vkbur"));
v_params.put("vkorg",extractlookupvalues.get("vkorg"));
v_params.put("vkgrp",extractlookupvalues.get("vkgrp"));
//
v_paramL.add(v_params);
v_prm.put("data",v_paramL);
//
info "v_prm:" + v_prm;
v_respquote = invokeurl
[
	url :v_url
	type :POST
	parameters:v_prm.toString()
	connection:"cbcrmfull"
];
info v_respquote;
v_status = v_respquote.get("data").get(0).get("status");
if(v_status == "success")
{
	v_value = v_respquote.get("data").get(0).get("details").get("id");
}
else
{
	v_value = null;
}
info v_value;
v_map.put("quote_id",v_value);
return v_map;
}