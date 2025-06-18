void schedule.CB_InvoicedTonsScheduler()
{
// MAPS
v_map_variable = Map();
v_map_config = Map();
v_map_headers = Map();
v_map_params = Map();
// CONSTANTES
v_id_org = "20100654034";
v_id_workspace = "238641000000007358";
v_id_view = "238641000000463062";
//
v_map_headers.put("ZANALYTICS-ORGID",v_id_org);
v_map_config.put("responseFormat","json");
// add function as callback url
v_map_config.put("callbackUrl","https://www.zohoapis.eu/crm/v7/functions/cb_invoicedtonscallback/actions/execute?auth_type=apikey&zapikey=***&recordid=0");
v_map_params.put("CONFIG",v_map_config.toString());
// REQUEST DATA FROM ANALYTICS
v_resp = invokeurl
[
	url :"https://analyticsapi.zoho.eu/restapi/v2/bulk/workspaces/" + v_id_workspace + "/views/" + v_id_view + "/data"
	type :GET
	parameters:v_map_params
	headers:v_map_headers
	connection:"cbanalytics"
];
info v_resp;
// get jobid
v_id_job = v_resp.get("data").get("jobId");
info v_id_job;
//
// WRITE JOBID TO ORG VARIABLES
v_map_variable.put("apiname","CB_JobIDAnalyticsInvoiceTonsExport");
v_map_variable.put("value",v_id_job);
v_resp = zoho.crm.invokeConnector("crm.set",v_map_variable);
info v_resp;
}