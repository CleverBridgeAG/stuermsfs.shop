SELECT
		 acc."Account Name" AS "Account",
		 acc."Id" AS "id_account",
		 acc."account_id" AS "account_no",
		 cp."PH 3" AS "ph3_code",
		 pp."Id" AS "id_product",
		 CAST(YEAR(inv."Invoice Date") AS CHAR) AS "Jahr",
		 ROUND(SUM(ii."Menge") / 1000, 3) AS "absatz_total",
		 pph3."Absatz in Tonnen" AS "alt_gespeichert",
		 pph3."Id" AS "ph3module_id",
		 CONCAT(CAST(YEAR(inv."Invoice Date") AS CHAR), '_', acc."account_id", '_', cp."PH 3") AS "key"
FROM  "Invoiced Items" ii
JOIN "Products" cp ON ii."Product Name"  = cp."Id" 
JOIN "Products" pp ON cp."PH 3"  = pp."Product Code"
	 AND	pp."Typ"  = 'Potential' 
JOIN "Invoices" inv ON ii."Parent ID"  = inv."Id" 
JOIN "Accounts" acc ON inv."Account Name"  = acc."Id" 
LEFT JOIN "Potentials PH3 Absatz" pph3 ON pph3."id_cb"  = CONCAT(CAST(YEAR(inv."Invoice Date") AS CHAR), '_', acc."account_id", '_', cp."PH 3") 
JOIN(	SELECT DISTINCT
			 acc_sub."account_id" AS account_no,
			 cp_sub."PH 3" AS ph3_code,
			 CAST(YEAR(inv_sub."Invoice Date") AS CHAR) AS jahr
	FROM  "Invoiced Items" ii_sub
JOIN "Invoices" inv_sub ON ii_sub."Parent ID"  = inv_sub."Id" 
JOIN "Accounts" acc_sub ON inv_sub."Account Name"  = acc_sub."Id" 
JOIN "Products" cp_sub ON ii_sub."Product Name"  = cp_sub."Id"  
	WHERE	 DATE(ii_sub."Modified Time")  = DATE(yesterday())
) AS  geaendert ON acc."account_id"  = geaendert.account_no
	 AND	cp."PH 3"  = geaendert.ph3_code
	 AND	CAST(YEAR(inv."Invoice Date") AS CHAR)  = geaendert.jahr  
GROUP BY acc."Account Name",
	 acc."Id",
	 acc."account_id",
	 cp."PH 3",
	 pp."Id",
	 CAST(YEAR(inv."Invoice Date") AS CHAR),
	 pph3."Absatz in Tonnen",
	 pph3."Id",
	  CONCAT(CAST(YEAR(inv."Invoice Date") AS CHAR), '_', acc."account_id", '_', cp."PH 3") 
