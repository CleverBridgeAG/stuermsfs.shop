map CB_InvoiceExtractLineItems(string payload, string saprgtyp)
{
v_map = Map();
v_map_notfound = Map();
v_itemsL = List();
v_owner_KUNN2 = null;
// get relevant section
try 
{
	v_section = payload.get("INVOIC02").get("IDOC").get("E1EDP01");
	for each  ele in v_section
	{
		v_item = Map();
		v_quantity = ele.get("NTGEW");
		//v_subtotal = ele.get("NETWR");
		// extract products
		v_E1EDP19 = ele.get("E1EDP19").toList();
		//
		v_amountoflineitems = v_E1EDP19.size();
		//
		for each  posele in v_E1EDP19
		{
			if(posele.get("QUALF") == "006")
			{
				v_keyvalue = posele.get("IDTNR_LONG");
				//
				// fetch and add as product id
				v_resp = zoho.crm.searchRecords("Products","(sap_id:equals:" + v_keyvalue + ")");
				if(v_resp.size() >= 1)
				{
					v_prodid = v_resp.get(0).get("id");
					v_prodname = v_resp.get(0).get("Product_Name");
					v_product = {"name":v_prodname,"id":v_prodid};
					v_product = {"id":v_prodid};
				}
				else
				{
					v_map_notfound.put("product_id",v_keyvalue);
				}
			}
		}
		// extract subtotal
		v_E1EDP26 = ele.get("E1EDP26").toList();
		v_subtotal = 0;
		for each  posele in v_E1EDP26
		{
			if(posele.get("QUALF") == "003")
			{
				v_subtotal = posele.get("BETRG");
			}
		}
		// prepare and add lineitem 
		if(saprgtyp == "M" || saprgtyp == "P")
		{
			v_item.put("menge",v_quantity.toDecimal());
			v_item.put("cbsubtotal_bw",v_subtotal.toDecimal());
			v_item.put("cbsubtotal",v_subtotal.toDecimal());
		}
		else if(saprgtyp == "N" || saprgtyp == "O")
		{
			v_item.put("menge",0 - v_quantity.toDecimal());
			v_item.put("cbsubtotal_bw",0 - v_subtotal.toDecimal());
			v_item.put("cbsubtotal",0 - v_subtotal.toDecimal());
		}
		v_item.put("List_Price",1);
		v_item.put("Product_Name",v_product);
		v_itemsL.add(v_item);
	}
}
catch (e)
{
	info "line item section does not exist";
}
v_map.put("Quoted_Items",v_itemsL);
v_map.put("AmountofQuotedItems",v_itemsL.size());
return v_map;
}