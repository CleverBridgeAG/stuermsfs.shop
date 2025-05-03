map CB_ProductExtractMAKTX(string payload)
{
v_map = Map();
v_MAKTX = null;
// get relevant section
try 
{
	v_section = payload.get("ZMATMAS4").get("IDOC").get("E1MARAM").get("E1MAKTM");
	for each  ele in v_section
	{
		v_SPRAS_ISO = ele.get("SPRAS_ISO");
		if(v_SPRAS_ISO == "DE")
		{
			v_MAKTX = ele.get("MAKTX");
		}
	}
}
catch (e)
{
	info "owner section does not exist";
}
v_map.put("product_name",v_MAKTX);
return v_map;
}