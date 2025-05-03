map CB_AccountPrepareUpdate(string payload, string existing)
{
v_map = Map();
v_list_params = List();
// needed values
v_list_params.add({"key":"email","path":{"ZDEBMAS7","IDOC","E1KNA1M","Z1DEBMAS","SMTP_ADDR"},"fallback":"email_acc"});
v_list_params.add({"key":"kbs","path":{"ZDEBMAS7","IDOC","E1KNA1M","E1KNVVM","KVGR1"},"fallback":"kbs"});
v_list_params.add({"key":"accountnumber","path":{"ZDEBMAS7","IDOC","E1KNA1M","KUNNR"},"fallback":"Account_Number"});
v_list_params.add({"key":"accountname","path":{"ZDEBMAS7","IDOC","E1KNA1M","NAME1"},"fallback":"Account_Name"});
v_list_params.add({"key":"billingstate","path":{"ZDEBMAS7","IDOC","E1KNA1M","REGIO"},"fallback":"Billing_State"});
v_list_params.add({"key":"billingcountry","path":{"ZDEBMAS7","IDOC","E1KNA1M","LAND1"},"fallback":"Billing_Country"});
v_list_params.add({"key":"billingcode","path":{"ZDEBMAS7","IDOC","E1KNA1M","PSTLZ"},"fallback":"Billing_Code"});
v_list_params.add({"key":"billingcity","path":{"ZDEBMAS7","IDOC","E1KNA1M","ORT01"},"fallback":"Billing_City"});
v_list_params.add({"key":"billingstreet","path":{"ZDEBMAS7","IDOC","E1KNA1M","STRAS"},"fallback":"Billing_Street"});
v_list_params.add({"key":"language","path":{"ZDEBMAS7","IDOC","E1KNA1M","SPRAS_ISO"},"fallback":"sprache_acc"});
v_list_params.add({"key":"phone","path":{"ZDEBMAS7","IDOC","E1KNA1M","TELF1"},"fallback":"Phone"});
v_list_params.add({"key":"website","path":{"ZDEBMAS7","IDOC","E1KNA11","E1KNA11","KNURL"},"fallback":"Website"});
v_list_params.add({"key":"currency","path":{"ZDEBMAS7","IDOC","E1KNA1M","WAERS"},"fallback":"Currency"});
v_list_params.add({"key":"creditlimit","path":{"ZDEBMAS7","IDOC","E1KNA1M","Z1DEBMAS","CREDIT_LIMIT"},"fallback":"kreditlimite"});
v_list_params.add({"key":"accountid","path":{"ZDEBMAS7","IDOC","E1KNA1M","Z1DEBMAS","IDNUMBER"},"fallback":"account_id"});
for each  param in v_list_params
{
	// try do get path value
	value = null;
	current = payload;
	v_paths = param.get("path");
	v_i = 1;
	v_paths_size = v_paths.size();
	for each  pathKey in v_paths
	{
		if(current != null && current.containsKey(pathKey))
		{
			current = current.get(pathKey);
			// final key
			if(v_i == v_paths_size)
			{
				// check if empty
				if(current.equals(""))
				{
					current = " ";
				}
			}
		}
		else
		{
			current = null;
			break;
		}
		v_i = v_i + 1;
	}
	value = current;
	// fallback if not existing
	if(value == null || value == "")
	{
		value = existing.get(param.get("fallback"));
	}
	// to string
	if(value != null)
	{
		value = value.toString();
	}
	// add to return map
	v_map.put(param.get("key"),value);
}
//
//
//
//
//
//
//
//
//
//
//
/*
// EMAIL
try 
{
	v_json = payload.get("ZDEBMAS7").get("IDOC").get("E1KNA1M").get("Z1DEBMAS");
	if(v_json.containsKey("SMTP_ADDR"))
	{
		v_value = v_json.get("SMTP_ADDR");
		if(v_value == "")
		{
			v_value = " ";
		}
	}
	else
	{
		v_value = existing.get("email_acc");
	}
}
catch (e)
{
	v_value = existing.get("email_acc");
}
v_map.put("email",v_value);
// KBS
try 
{
	v_json = payload.get("ZDEBMAS7").get("IDOC").get("E1KNA1M").get("E1KNVVM");
	if(v_json.containsKey("KVGR1"))
	{
		v_value = v_json.get("KVGR1");
		if(v_value == "")
		{
			v_value = " ";
		}
	}
	else
	{
		v_value = existing.get("kbs");
	}
}
catch (e)
{
	v_value = existing.get("kbs");
}
v_map.put("kbs",v_value);
// ACCOUNT NUMBER
try 
{
	v_json = payload.get("ZDEBMAS7").get("IDOC").get("E1KNA1M");
	if(v_json.containsKey("KUNNR"))
	{
		v_value = v_json.get("KUNNR");
		if(v_value == "")
		{
			// must not be empty
			v_value = existing.get("Account_Number");
		}
	}
	else
	{
		v_value = existing.get("Account_Number");
	}
}
catch (e)
{
	v_value = existing.get("Account_Number");
}
v_map.put("accountnumber",v_value);
// ACCOUNT NAME
try 
{
	v_json = payload.get("ZDEBMAS7").get("IDOC").get("E1KNA1M");
	if(v_json.containsKey("NAME1"))
	{
		v_value = v_json.get("NAME1");
		if(v_value == "")
		{
			// must not be empty
			v_value = existing.get("Account_Name");
		}
	}
	else
	{
		v_value = existing.get("Account_Name");
	}
}
catch (e)
{
	v_value = existing.get("Account_Name");
}
v_map.put("accountname",v_value);
// BILLING STATE
try 
{
	v_json = payload.get("ZDEBMAS7").get("IDOC").get("E1KNA1M");
	if(v_json.containsKey("REGIO"))
	{
		v_value = v_json.get("REGIO");
		if(v_value == "")
		{
			// must not be empty
			v_value = existing.get("Billing_State");
		}
	}
	else
	{
		v_value = existing.get("Billing_State");
	}
}
catch (e)
{
	v_value = existing.get("Billing_State");
}
v_map.put("billingstate",v_value);
*/
//
//
//
return v_map;
}