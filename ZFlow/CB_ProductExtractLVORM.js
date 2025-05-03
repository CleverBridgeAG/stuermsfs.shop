map CB_ProductExtractLVORM(string payload)
{
v_map = Map();
v_lvorm = null;
// get relevant section
try 
{
	v_section = payload.get("ZMATMAS4").get("IDOC").get("E1MARAM").get("E1MARCM").get("E1MARDM");
	info v_section;
	v_lvorm = v_section.get("LVORM");
	if(v_lvorm == "X")
	{
		v_map.put("product_active",true);
	}
}
catch (e)
{
	info "E1MARDM - with LVORM section does not exist";
}
return v_map;
}