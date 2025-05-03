map CB_QuoteExtractLookupValues(string payload)
{
v_map = Map();
v_map_notfound = Map();
//
// AG ACCOUNT
value = null;
account_id = null;
v_Billing_Street = null;
v_Billing_City = null;
v_Billing_Code = null;
v_Billing_Country = null;
v_Billing_State = null;
v_vkbur = null;
v_vkorg = null;
v_vkgr = null;
// get relevant section
try 
{
	v_section = payload.get("ZORDERS05").get("IDOC").get("E1EDK01");
	v_keyvalue = v_section.get("RECIPNT_NO");
	if(v_keyvalue != null && v_keyvalue != "")
	{
		v_resp = zoho.crm.searchRecords("Accounts","(sap_kundennummer:equals:" + v_keyvalue + ")");
		if(v_resp.size() >= 1)
		{
			v_resp1 = v_resp.get(0);
			value = v_resp1.get("id");
			v_Billing_Street = v_resp1.get("Billing_Street");
			v_Billing_City = v_resp1.get("Billing_City");
			v_Billing_Code = v_resp1.get("Billing_Code");
			v_Billing_Country = v_resp1.get("Billing_Country");
			v_Billing_State = v_resp1.get("Billing_State");
			v_vkbur = v_resp1.get("vkbur");
			v_vkorg = v_resp1.get("vkorg");
			v_vkgrp = v_resp1.get("vkgr");
		}
		else
		{
			v_map_notfound.put("account_id",v_keyvalue);
		}
	}
}
catch (e)
{
	info "sap_kundennummer section does not exist";
}
v_map.put("account_id",value);
v_map.put("Billing_Street",v_Billing_Street);
v_map.put("Billing_City",v_Billing_City);
v_map.put("Billing_Code",v_Billing_Code);
v_map.put("Billing_Country",v_Billing_Country);
v_map.put("Billing_State",v_Billing_State);
v_map.put("vkbur",v_vkbur);
v_map.put("vkorg",v_vkorg);
v_map.put("vkgrp",v_vkgrp);
//
// ABSAGEGRUND
value = null;
// get relevant section
try 
{
	v_section = payload.get("ZORDERS05").get("IDOC").get("E1EDP01");
	v_keyvalue = v_section.get("ABGRU");
	if(v_keyvalue != null && v_keyvalue != "")
	{
		v_resp = zoho.crm.searchRecords("CBAbsagegrund","(key:equals:" + v_keyvalue + ")");
		if(v_resp.size() >= 1)
		{
			value = v_resp.get("absagegrund_cpl");
		}
		else
		{
			v_map_notfound.put("abgru",v_keyvalue);
		}
	}
}
catch (e)
{
	info "abgru section does not exist";
}
v_map.put("absagegrund",value);
//
// GESAMTSTATUS
value = null;
// get relevant section
try 
{
	v_section = payload.get("ZORDERS05").get("IDOC").get("E1EDK01");
	v_keyvalue = v_section.get("ZE1EDK01").get("GBSTK");
	if(v_keyvalue != null && v_keyvalue != "")
	{
		v_resp = zoho.crm.searchRecords("CBGesamtstatus","(key:equals:" + v_keyvalue + ")");
		if(v_resp.size() >= 1)
		{
			value = v_resp.get(0).get("status_cpl");
		}
		else
		{
			v_map_notfound.put("status_gesamt",v_keyvalue);
		}
	}
}
catch (e)
{
	info "status_gesamt section does not exist";
}
v_map.put("status_gesamt",value);
//
// SUBJECT
value = null;
// get relevant section
try 
{
	v_section = payload.get("ZORDERS05").get("IDOC").get("E1EDK01");
	value = v_section.get("BELNR");
}
catch (e)
{
	info "subject section does not exist";
}
v_map.put("subject",value);
//
// BESTELLNUMMER
value = null;
// get relevant section
try 
{
	v_section = payload.get("ZORDERS05").get("IDOC").get("E1EDK02");
	for each  ele in v_section
	{
		if(ele.get("QUALF") == "001")
		{
			value = ele.get("BELNR");
		}
	}
}
catch (e)
{
	info "BESTELLNUMMER section does not exist";
}
v_map.put("bestellnummer",value);
//
// OWNER
value = null;
// get relevant section
try 
{
	v_section = payload.get("ZORDERS05").get("IDOC").get("E1EDKA1");
	for each  ele in v_section
	{
		v_PARVW = ele.get("PARVW");
		if(v_PARVW == "ZM")
		{
			v_keyvalue = ele.get("PARTN");
			if(v_keyvalue != null && v_keyvalue != "")
			{
				v_resp = zoho.crm.searchRecords("users","(sap_id:equals:" + v_keyvalue + ")");
				if(v_resp.size() >= 1)
				{
					value = v_resp.get("users").get(0).get("id");
					//					value.add(v_id);
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
	info "owner section does not exist";
}
v_map.put("owner",value);
//
//
//
v_map.put("notfound",v_map_notfound);
//
return v_map;
}