void automation.CB_UpdateMeetingStatusFromBesuchsbericht(Int ID)
{
// CB yh - S-AR-I13
// RECORDS
besuchsbericht = zoho.crm.getRecordById("stuerm_Besuchsberichte",ID);
v_criteria = "(id_besuchsbericht:equals:" + ID + ")";
meeting = zoho.crm.searchRecords("Events",v_criteria);
// MAPS
v_map_update = Map();
// VALUES
v_status = besuchsbericht.get("status");
info "Status Besuchsbericht: " + v_status;
v_id_meeting = meeting.get(0).get("id");
//
v_map_update.put("status_stuermsfs",v_status);
v_resp = zoho.crm.updateRecord("Events",v_id_meeting,v_map_update);
info v_resp;
}