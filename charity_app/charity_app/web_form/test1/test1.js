frappe.ready(function() {
	// bind events here
	frappe.web_form.after_load = () => {



        let childTableField = frappe.web_form.fields_dict['enter_your_family_data_each_person_in_a_row'];
        let childTableFieldLength = childTableField.grid.grid_rows.length

        //delete unwanted name field in the child table
        childTableField.grid.docfields.splice(0, 1)


        while(childTableFieldLength) {
            deleteRows()
        }

        function deleteRows(){
            console.log('called')
            childTableField.grid.remove_all();
            setTimeout( () => {

            }, 1000)

            childTableFieldLength = childTableField.grid.grid_rows.length
            return
        }
	}
})