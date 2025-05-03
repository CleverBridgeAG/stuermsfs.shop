map CB_ProductUpsert(string matnr, string maktx)
{
v_map = Map();
v_url = "https://www.zohoapis.eu/crm/v7/Products/upsert";
v_param = Map();
v_header = Map();
v_header.put("X-EXTERNAL","Products.CBdevsap_id");
v_dataL = List();
v_data = Map();
v_data.put("CBdevsap_id",matnr);
v_data.put("Product_Name",maktx);
v_dataL.add(v_data);
v_param.put("data",v_dataL);
//
info v_param;
info v_header;
try 
{
	v_resp = invokeurl
	[
		url :v_url
		type :POST
		parameters:v_param.toString()
		headers:v_header
		connection:"cbcrmfull"
	];
	info v_resp;
}
catch (e)
{
	info "not able to upsert this product with matnr " + matnr;
}
try 
{
	v_data = v_resp.get("data").get(0);
	v_prodID = v_data.get("details").get("id");
	v_map.put("product_id",v_prodID);
}
catch (e)
{
	info "not able to get product id. ";
}
return v_map;
}