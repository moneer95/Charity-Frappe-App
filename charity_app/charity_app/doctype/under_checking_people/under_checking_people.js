// Copyright (c) 2024, monir skaik and contributors
// For license information, please see license.txt

frappe.ui.form.on('Under Checking People', {
	 refresh: function(frm) {
        frappe.msgprint(frm.doc.family_name_displayed)
	 }
});
