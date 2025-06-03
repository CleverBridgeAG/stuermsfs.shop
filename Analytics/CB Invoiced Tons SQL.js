SELECT
		 acc."Account Name" AS "Account",
		 acc."Id" AS "id_account",
		 acc."account_id" AS "account_no",
		 cp."PH 3" AS "ph3_code",
		 pp."Id" AS "id_product",
		 CAST(YEAR(inv."Invoice Date") AS CHAR) AS "Jahr",
		 ROUND(SUM(ii."Menge") / 1000, 3) AS "absatz_add",
		 pph3."Absatz in Tonnen" AS "absatz_now",
		 pph3."Id" AS "ph3module_id",
		 ROUND(SUM(ii."Menge") / 1000 + IFNULL(pph3."Absatz in Tonnen", 0), 3) AS "absatz_total",
		 CONCAT(CAST(YEAR(inv."Invoice Date") AS CHAR), '_', acc."account_id", '_', cp."PH 3") AS "key"
FROM  "Invoiced Items" ii
JOIN "Products" cp ON ii."Product Name"  = cp."Id" 
JOIN "Products" pp ON cp."PH 3"  = pp."Product Code"
	 AND	pp."Typ"  = 'Potential' 
JOIN "Invoices" inv ON ii."Parent ID"  = inv."Id" 
JOIN "Accounts" acc ON inv."Account Name"  = acc."Id" 
LEFT JOIN "Potentials PH3 Absatz" pph3 ON pph3."id_cb"  = CONCAT(CAST(YEAR(inv."Invoice Date") AS CHAR), '_', acc."account_id", '_', cp."PH 3")  
WHERE	 DATE(inv."Created Time")  = '2025-05-30'
GROUP BY acc."Account Name",
	 acc."Id",
	 cp."PH 3",
	 CAST(YEAR(inv."Invoice Date") AS CHAR),
	 pph3."Absatz in Tonnen",
	 CONCAT(CAST(YEAR(inv."Invoice Date") AS CHAR), '_', acc."account_id", '_', cp."PH 3"),
	 pph3."Id",
	 acc."account_id",
	  pp."Id" 
