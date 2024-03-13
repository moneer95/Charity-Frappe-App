// Copyright (c) 2024, monir skaik and contributors
// For license information, please see license.txt

frappe.ui.form.on('Registered People', {
	refresh(frm) {
        const get_members_count = frm.doc.enter_your_family_data_each_person_in_a_row.length
        const current_doc_name = frm.doc.family_name__last_name_ + ' ' + get_members_count + ' ' + 'members'

        // rename and redirect to the new name based on the appropriate conditions
        if(frm.doc.family_name__last_name_ && ( current_doc_name != frm.doc.name)){ //check if the doc is first time created
            frappe.call({
                method: 'charity_app.api.rename_and_redirect',
                args: {
                    doc_name: frm.doc.name,
                    family_name: frm.doc.family_name__last_name_,
                    members_count: get_members_count
                },
                callback: function(response) {
                    // Check if response has message property and it's a string
                    if (response.message) {
                        window.location.href = response.message;
                    } else {
                        return
                    }
                }
            })
        }// end if

        // add send button
        frm.add_custom_button('Send to Check List', function(){
        frappe.call({
            method: 'charity_app.api.send_to_checkList',
            args: {
                name: frm.doc.name,
                members_count: get_members_count,
                medical_needs: frm.doc.define_the_needs_here || null
            },
            callback: function(response) {
             // Check if response has message property and it's a string
                if (response.message) {
                    const current_window = window

                    window.open(response.message[0], '_blank');

                    current_window.location.href = response.message[1]
                } else {
                    return
                }
                }
            });
        })
    }
})