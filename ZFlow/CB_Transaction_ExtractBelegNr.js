map CB_Transaction_ExtractBelegNr(string payload)
{
v_map = Map();
// get relevant section
try 
{
	v_keyvalue = payload.get("VBELN");
	if(v_keyvalue != null && v_keyvalue != "")
	{
		value = v_keyvalue.getPrefix(".");
	}
}
catch (e)
{
	info "vbeln section does not exist";
}
v_map.put("vbeln",value);
return v_map;
}