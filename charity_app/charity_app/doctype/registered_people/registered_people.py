# Copyright (c) 2024, monir skaik and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class RegisteredPeople(Document):
	pass
	# @frappe.whitelist()
	# def update_url(self):
	# 	# pass
	# 	doc_name = self.family_name__last_name_ + ' ' + str(len(self.get("enter_your_family_data_each_person_in_a_row"))) + ' members'
	# 	# self.title = doc_name
	# 	if(doc_name != self.name):
	# 		frappe.rename_doc('Registered People', self.name, doc_name)
	# 		new_url = frappe.utils.get_url(f"{frappe.utils.get_url_to_form('Registered People', doc_name)}")
	# 		# frappe.msgprint(new_url)
	# 		frappe.msgprint('jhh')
	# 		return new_url
	# 		# frappe.local.redirect(new_url)

		# self.insert()



