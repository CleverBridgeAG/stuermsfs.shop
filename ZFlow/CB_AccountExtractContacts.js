bool CB_AccountExtractContacts(string payload, string id_account, string id_account_created)
{
v_success = true;
v_contact_KUNN2 = List();
id_account = if(id_account == null,id_account_created,id_account);
//
// get KUNN2
try 
{
	v_section = payload.get("ZDEBMAS7").get("IDOC").get("E1KNA1M").get("E1KNVVM").get("E1KNVPM");
	for each  ele in v_section
	{
		v_PARVW = ele.get("PARVW");
		if(v_PARVW == "AP")
		{
			v_contact_KUNN2.add(ele.get("KUNN2"));
		}
	}
}
catch (e)
{
	v_success = false;
	info "contact section does not exist";
}
//
// loop through all eles
try 
{
	v_section = payload.get("ZDEBMAS7").get("IDOC").get("E1KNA1M").get("E1KNVKM");
	v_list_section = v_section.toList();
	for each  ele in v_list_section
	{
		v_PARNR = ele.get("PARNR");
		if(v_contact_KUNN2.contains(v_PARNR))
		{
			// this is a contact related to account
			//
			v_lastname = ele.get("NAME1");
			//
			v_map_contact = Map();
			v_map_contact.put("E1KNVKM",ele);
			v_map_contact.put("id_account",id_account);
			//
			// call contact flow
			info v_map_contact;
			// url live
			v_url = "https://flow.zoho.eu/20104463054/flow/webhook/incoming?zapikey=1001.5b202348c4de55c52785cff5dc4ef84e.bef165721a626835ee1c746cfc85756d&isdebug=false";
			v_resp = invokeurl
			[
				url :v_url
				type :POST
				parameters:v_map_contact
			];
		}
	}
}
catch (e)
{
	v_success = false;
	info "unable to read contact section";
}
// 
return v_success;
}