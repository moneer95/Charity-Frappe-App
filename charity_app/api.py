import frappe


@frappe.whitelist()
def rename_and_redirect(doc_name, family_name, members_count):
    # structure family name that we get from client script on Registered People doctype,
    # so we can compare it with the actual doc name
    structured_name = family_name + ' ' + str(members_count) + ' ' + 'members'

    # check if any changes happen to family name or number of members
    # this function will not run when the doc is first time created ,
    # because family name field will be empty
    if(doc_name != structured_name):
        # rename the doc
        try:
            new_confirmed_name = frappe.rename_doc('Registered People', doc_name, structured_name)
        except:
            new_confirmed_name = rename(doc_name, structured_name, 1)

        # get the url of the doc after renaming
        new_url = frappe.utils.get_url_to_form('Registered People', new_confirmed_name)

        # return the url to the client script func in Registered People,
        # to perform the redirection process
        return new_url

    # if name has not changed: pass
    else:
        pass


@frappe.whitelist()
def send_to_checkList(name, members_count, medical_needs):
    try:

        new_doc = frappe.new_doc("Under Checking People")

        new_doc.name = name
        new_doc.family_name = name
        new_doc.family_name_displayed = name
        new_doc.how_many_food_boxes = int(members_count) / 3
        new_doc.details_medical = medical_needs

        change_registered_doc_status(name)

        new_doc.insert(ignore_permissions=True)
        new_doc.save(ignore_permissions=True)

        # frappe.msgprint(new_doc.family_name + ' successfully sent to check list')

        new_url = frappe.utils.get_url_to_form('Under Checking People', new_doc.name)

        # get List url to return to it so enhance user experience
        list_url = frappe.utils.get_url_to_list('Registered People')


        return [new_url, list_url]

    except Exception as e:
        frappe.msgprint(str(e))


def rename(doc_name, structured_name, i):
    i = i
    try:
        new_modified_name = frappe.rename_doc('Registered People', doc_name, f'{structured_name} ({i})')
        return new_modified_name

    except:
        return rename(doc_name, structured_name, i + 1)


def change_registered_doc_status(name):
    current_registered_doc = frappe.get_doc('Registered People', name)
    current_registered_doc.status = "Checked"
    current_registered_doc.save(ignore_permissions=True)


