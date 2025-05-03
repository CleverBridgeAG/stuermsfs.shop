map CB_ProductPrepareUpdate(string payload, string existing)
{
v_map = Map();
v_list_params = List();
// needed values
v_list_params.add({"key":"productcode","path":{"ZMATMAS4","IDOC","E1MARAM","E1MARA1","MATNR_EXTERNAL"},"fallback":"productcode"});
v_list_params.add({"key":"sapid","path":{"ZMATMAS4","IDOC","E1MARAM","MATNR_LONG"},"fallback":"sapid"});
v_list_params.add({"key":"usage_unit","path":{"ZMATMAS4","IDOC","E1MARAM","MEINS"},"fallback":"usage_unit"});
v_list_params.add({"key":"productactive","path":{"ZMATMAS4","IDOC","E1MARAM","E1MARCM","E1MARDM","LVORM"},"fallback":"productactive"});
v_list_params.add({"key":"prdha","path":{"ZMATMAS4","IDOC","E1MARAM","PRDHA"},"fallback":"prdha"});
v_list_params.add({"key":"ph1","path":{"ZMATMAS4","IDOC","E1MARAM","Z1MARA2","PRDHA1"},"fallback":"ph1"});
v_list_params.add({"key":"ph2","path":{"ZMATMAS4","IDOC","E1MARAM","Z1MARA2","PRDHA2"},"fallback":"ph2"});
v_list_params.add({"key":"ph3","path":{"ZMATMAS4","IDOC","E1MARAM","Z1MARA2","PRDHA3"},"fallback":"ph3"});
v_list_params.add({"key":"ph1_bez","path":{"ZMATMAS4","IDOC","E1MARAM","Z1MARA2","PRDHA1T"},"fallback":"ph1_bez"});
v_list_params.add({"key":"ph2_bez","path":{"ZMATMAS4","IDOC","E1MARAM","Z1MARA2","PRDHA2T"},"fallback":"ph2_bez"});
v_list_params.add({"key":"ph3_bez","path":{"ZMATMAS4","IDOC","E1MARAM","Z1MARA2","PRDHA3T"},"fallback":"ph3_bez"});
v_list_params.add({"key":"ph5_bez","path":{"ZMATMAS4","IDOC","E1MARAM","Z1MARA2","PRDHA5T"},"fallback":"ph5_bez"});
v_list_params.add({"key":"sparte","path":{"ZMATMAS4","IDOC","E1MARAM","SPART"},"fallback":"sparte"});
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
return v_map;
}