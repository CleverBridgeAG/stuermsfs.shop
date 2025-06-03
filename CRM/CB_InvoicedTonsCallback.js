string standalone.CB_InvoicedTonsCallback(String recordid)
{
// MAPS
v_map_variable = Map();
v_map_headers = Map();
// CONSTANTES
v_id_org = "20100654034";
v_id_workspace = "238641000000007358";
//
// LISTS
v_update_bulk_list = List();
v_insert_bulk_list = List();
// VARIABLES
v_resp = "";
v_count_update_total = 0;
v_count_insert_total = 0;
v_count_update_loop = 0;
v_count_insert_loop = 0;
v_resp_all = "";
//
// GET PARAMETER FROM CALLBACK FUNCTION
v_cblogs_id = recordid;
// GET JOBID FROM ORG VARIABLES
v_id_job = zoho.crm.getOrgVariable("CB_JobIDAnalyticsInvoiceTonsExport");
info v_id_job;
//
v_map_headers.put("ZANALYTICS-ORGID",v_id_org);
// RETRIEVE QUERIED DATA FROM ANALYTICS
v_resp = invokeurl
[
	url :"https://analyticsapi.zoho.eu/restapi/v2/bulk/workspaces/" + v_id_workspace + "/exportjobs/" + v_id_job + "/data"
	type :GET
	headers:v_map_headers
	connection:"cbanalytics"
];
info v_resp;
//
// LOOP THROUGH ALL QUERIED ACCOUNTS
v_data = v_resp.get("data");
//
for each  v_rec in v_data
{
	info "-------------------";
	// LOOP VARIABLES
	v_map_turnover = Map();
	v_resp = null;
	//
	// get record fields
	v_id_ph3module = v_rec.get("ph3module_id");
	v_key = v_rec.get("key");
	v_id_account = v_rec.get("id_account");
	v_account_no = v_rec.get("account_no");
	v_id_product = v_rec.get("id_product");
	v_ph3code = v_rec.get("ph3_code");
	v_year = v_rec.get("Jahr");
	v_absatz_now = v_rec.get("absatz_now");
	v_absatz_add = v_rec.get("absatz_add");
	v_absatz_total = v_rec.get("absatz_total");
	//
	info "v_id_ph3module: " + v_id_ph3module;
	info "v_key: " + v_key;
	info "v_absatz_now: " + v_absatz_now;
	info "v_absatz_add: " + v_absatz_add;
	info "v_absatz_total: " + v_absatz_total;
	//
	// check if record in PH3 Module already exists
	if(v_id_ph3module != "")
	{
		// records exists
		info "ID PH3 Module: " + v_id_ph3module;
		//
		// bulk update record
		v_update_bulk = Map();
		v_update_bulk.put("id",v_id_ph3module.toLong());
		v_update_bulk.put("abs_t",v_absatz_total);
		v_update_bulk_list.add(v_update_bulk);
		//
		v_count_update_total = v_count_update_total + 1;
		v_count_update_loop = v_count_update_loop + 1;
		//
		// max of 100 cound be inserted at a time
		if(v_count_update_loop > 90)
		{
			info "UPDATE " + v_count_update_loop;
			v_resp = zoho.crm.bulkUpdate("Potentials_PH3_Absatz",v_update_bulk_list);
			info v_resp;
			v_resp_all = v_resp_all + v_resp;
			// reset values
			v_update_bulk_list = List();
			v_count_update_loop = 0;
		}
	}
	else
	{
		// bulk insert record
		v_map_turnover = Map();
		v_map_turnover.put("Name","idk");
		v_map_turnover.put("gueltig",today);
		v_map_turnover.put("ph3",v_id_product);
		v_map_turnover.put("PH_3_Code",v_ph3code);
		v_map_turnover.put("kunde",v_id_account);
		v_map_turnover.put("account_id",v_account_no);
		v_map_turnover.put("abs_t",v_absatz_total);
		v_insert_bulk_list.add(v_map_turnover);
		//
		v_count_insert_total = v_count_insert_total + 1;
		v_count_insert_loop = v_count_insert_loop + 1;
		//
		// max of 100 cound be inserted at a time
		if(v_count_insert_loop > 90)
		{
			info "INSERT " + v_count_insert_loop;
			v_resp = zoho.crm.bulkCreate("Potentials_PH3_Absatz",v_insert_bulk_list);
			info v_resp;
			v_resp_all = v_resp_all + v_resp;
			// reset values
			v_insert_bulk_list = List();
			v_count_insert_loop = 0;
		}
	}
}
//
info "Total Update: " + v_count_update_total;
info "Total Insert: " + v_count_insert_total;
//
// update / insert rest
if(v_count_update_loop > 0)
{
	info "UPDATE rest";
	v_resp = zoho.crm.bulkUpdate("Potentials_PH3_Absatz",v_update_bulk_list);
	info v_resp;
	v_resp_all = v_resp_all + v_resp;
}
if(v_count_insert_loop > 0)
{
	info "INSERT rest";
	v_resp = zoho.crm.bulkCreate("Potentials_PH3_Absatz",v_insert_bulk_list);
	info v_resp;
	v_resp_all = v_resp_all + v_resp;
}
//
//
return "";
}