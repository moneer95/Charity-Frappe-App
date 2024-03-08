import frappe

@frappe.whitelist()
def send_to_checkList(name):
    try:
        new_doc = frappe.new_doc("Under Checking Poeple")
        new_doc.name = name
        new_doc.family_name = name

        new_doc.insert()
        new_doc.save()

        frappe.msgprint(convert_to_url(name))


    except Exception as e:
        frappe.msgprint(str(e))

def convert_to_url(name):
    # Split the words by space
    name_list = name.split()
    # Join the words with '%20' between them
    url = '%20'.join(name_list)
    return url

