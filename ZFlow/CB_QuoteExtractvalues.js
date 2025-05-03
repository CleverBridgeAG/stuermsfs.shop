map CB_QuoteExtractvalues(string payload)
{
v_map = Map();
v_orgid = null;
v_af_dateS = null;
v_currency = null;
v_agart = null;
v_bestnr = null;
// get relevant section
// ORGID ag_art
try 
{
	v_section = payload.get("ZORDERS05").get("IDOC").get("E1EDK14");
	for each  ele in v_section
	{
		v_qualf = ele.get("QUALF");
		if(v_qualf == "012")
		{
			v_orgid = ele.get("ORGID");
		}
	}
}
catch (e)
{
	info "Subject - Belegart section does not exist";
}
//
// af_date
try 
{
	v_section = payload.get("ZORDERS05").get("IDOC").get("E1EDK03");
	for each  ele in v_section
	{
		v_qualf = ele.get("IDDAT");
		if(v_qualf == "012")
		{
			v_af_date = ele.get("DATUM");
			v_year = v_af_date.substring(0,4);
			v_month = v_af_date.substring(4,6);
			v_day = v_af_date.substring(6,8);
			v_af_dateS = v_year + "-" + v_month + "-" + v_day;
		}
	}
}
catch (e)
{
	info "Subject - af_date section does not exist";
}
//
// bestellnummer
try 
{
	v_section = payload.get("ZORDERS05").get("IDOC").get("E1EDK02");
	for each  ele in v_section
	{
		v_qualf = ele.get("QUALF");
		if(v_qualf == "001")
		{
			v_bestnr = ele.get("BELNR");
		}
	}
}
catch (e)
{
	info "Bestellnummer - BELNR section does not exist";
}
//
// CURRENCY
try 
{
	v_section = payload.get("ZORDERS05").get("IDOC").get("E1EDK01");
	v_currency = v_section.get("CURCY");
	v_af_art = v_section.get("BSART");
}
catch (e)
{
	info "E1EDK01 - CURCY section does not exist";
}
//
//
v_map.put("af_art",v_af_art);
v_map.put("ag_art",v_orgid);
v_map.put("af_date",v_af_dateS);
v_map.put("bestellnummer",v_bestnr);
v_map.put("curcy",v_currency);
return v_map;
}