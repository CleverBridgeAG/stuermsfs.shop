map CB_AccountExtractOwner(string payload)
{
v_map = Map();
v_owner_KUNN2 = null;
// get relevant section
try 
{
	v_section = payload.get("ZDEBMAS7").get("IDOC").get("E1KNA1M").get("E1KNVVM").get("E1KNVPM");
	for each  ele in v_section
	{
		v_PARVW = ele.get("PARVW");
		if(v_PARVW == "VE")
		{
			v_owner_KUNN2 = ele.get("KUNN2");
		}
	}
}
catch (e)
{
	info "owner section does not exist";
}
v_map.put("owner",v_owner_KUNN2);
return v_map;
}