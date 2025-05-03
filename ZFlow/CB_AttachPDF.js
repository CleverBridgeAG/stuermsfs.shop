void CB_AttachPDF(string filename, string pdf, string recid, string module)
{
if(pdf != null && pdf != "")
{
	// list and delete existing attachments
	v_url = "https://www.zohoapis.eu/crm/v7/" + module + "/" + recid + "/Attachments";
	v_ext = "?fields=id,Owner,File_Name,Created_Time";
	v_fullurl = v_url + v_ext;
	info v_url;
	v_attachments = invokeurl
	[
		url :v_fullurl
		type :GET
		connection:"cbcrmfull"
	];
	info "attachments: " + v_attachments;
	if(v_attachments != null)
	{
		for each  ele in v_attachments.get("data")
		{
			if(ele.get("File_Name") == filename)
			{
				// this needs to be deleted
				v_attid = ele.get("id");
				v_fullurl = v_url + "/" + v_attid;
				info "v_fullurl before delete:" + v_fullurl;
				v_respdeleted = invokeurl
				[
					url :v_fullurl
					type :DELETE
					connection:"cbcrmfull"
				];
				info v_respdeleted;
			}
		}
	}
	else
	{
		info "no attachments found";
	}
	//
	v_file_object = zoho.encryption.base64DecodeToFile(pdf,filename);
	info v_file_object;
	v_resp_file = zoho.crm.attachFile("Quotes",recid,v_file_object,"cbcrmfull");
	info v_resp_file;
}
}