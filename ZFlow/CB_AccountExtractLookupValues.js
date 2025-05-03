map CB_AccountExtractLookupValues(string payload)
{
v_map = Map();
v_map_notfound = Map();
//
// PAYMENTTERMS
value = null;
// get relevant section
try 
{
	v_section = payload.get("ZDEBMAS7").get("IDOC").get("E1KNA1M").get("E1KNVVM");
	v_keyvalue = v_section.get("ZTERM");
	if(v_keyvalue != null && v_keyvalue != "")
	{
		v_resp = zoho.crm.searchRecords("CBPaymentTerms","(key:equals:" + v_keyvalue + ")");
		if(v_resp.size() >= 1)
		{
			value = v_resp.get(0).get("key_desc");
		}
		else
		{
			v_map_notfound.put("paymentterm",v_keyvalue);
		}
	}
}
catch (e)
{
	info "paymentterms section does not exist";
}
v_map.put("paymentterms",value);
//
// VKORG
value = null;
// get relevant section
try 
{
	v_section = payload.get("ZDEBMAS7").get("IDOC").get("E1KNA1M").get("E1KNVVM");
	v_keyvalue = v_section.get("VKORG");
	if(v_keyvalue != null && v_keyvalue != "")
	{
		v_resp = zoho.crm.searchRecords("CBVerkaufsorg","(key:equals:" + v_keyvalue + ")");
		if(v_resp.size() >= 1)
		{
			value = v_resp.get(0).get("verkaufsorg_key_des");
		}
		else
		{
			v_map_notfound.put("vkorg",v_keyvalue);
		}
	}
}
catch (e)
{
	info "vkorg section does not exist";
}
v_map.put("vkorg",value);
//
// VKBUR
value = null;
// get relevant section
try 
{
	v_section = payload.get("ZDEBMAS7").get("IDOC").get("E1KNA1M").get("E1KNVVM");
	v_keyvalue = v_section.get("VKBUR");
	if(v_keyvalue != null && v_keyvalue != "")
	{
		v_resp = zoho.crm.searchRecords("CBVerkaufsbueros","(key:equals:" + v_keyvalue + ")");
		if(v_resp.size() >= 1)
		{
			value = v_resp.get(0).get("verkaufsbuero_key_desc");
		}
		else
		{
			v_map_notfound.put("vkbur",v_keyvalue);
		}
	}
}
catch (e)
{
	info "vkbur section does not exist";
}
v_map.put("vkbur",value);
//
// VKGRP
value = null;
// get relevant section
try 
{
	v_section = payload.get("ZDEBMAS7").get("IDOC").get("E1KNA1M").get("E1KNVVM");
	v_keyvalue = v_section.get("VKGRP");
	if(v_keyvalue != null && v_keyvalue != "")
	{
		v_resp = zoho.crm.searchRecords("CBVerkGruppen","(key:equals:" + v_keyvalue + ")");
		if(v_resp.size() >= 1)
		{
			value = v_resp.get(0).get("verkgrp_key_desc");
		}
		else
		{
			v_map_notfound.put("vkgrp",v_keyvalue);
		}
	}
}
catch (e)
{
	info "vkgrp section does not exist";
}
v_map.put("vkgrp",value);
//
//
// VID
value = List();
// get relevant section
try 
{
	v_section = payload.get("ZDEBMAS7").get("IDOC").get("E1KNA1M").get("E1KNVVM").get("E1KNVPM");
	for each  ele in v_section
	{
		v_sectionkey = ele.get("PARVW");
		if(v_sectionkey == "ZM")
		{
			v_keyvalue = ele.get("KUNN2");
			if(v_keyvalue != null && v_keyvalue != "")
			{
				v_resp = zoho.crm.searchRecords("users","(sap_id:equals:" + v_keyvalue + ")");
				if(v_resp.size() >= 1)
				{
					v_id = v_resp.get("users").get(0).get("id");
					value.add(v_id);
				}
				else
				{
					v_map_notfound.put("user",v_keyvalue);
				}
			}
		}
	}
}
catch (e)
{
	info "users section does not exist";
}
v_map.put("users",value);
//
//
v_map.put("notfound",v_map_notfound);
//
return v_map;
}