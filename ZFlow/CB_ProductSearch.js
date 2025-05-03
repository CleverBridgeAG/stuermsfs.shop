void CB_ProductSearch()
{
v_sap_id = "000000000008217000";
v_map = Map();
v_url = "https://www.zohoapis.eu/crm/v8/Products/search";
v_ext = "?criteria=";
v_searchvalue = "(CBdevsap_id:equals:" + v_sap_id + ")&fields=Product_Name";
v_fullurl = v_url + v_ext + v_searchvalue;
v_param = Map();
v_header = Map();
v_header.put("X-EXTERNAL","Products.CBdevsap_id");
//
info v_fullurl;
v_resp = invokeurl
[
	url :v_fullurl
	type :POST
	parameters:v_param.toString()
	headers:v_header
	connection:"cbcrmfull"
];
info v_resp;
}