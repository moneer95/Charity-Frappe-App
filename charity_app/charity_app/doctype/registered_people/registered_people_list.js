frappe.listview_settings['Registered People'] = {
    get_indicator: function(doc) {
        if (doc.status === "Waiting") {
            return [__("Waiting"), 'yellow', "status,=," + doc.status];
        }

        if (doc.status === "Checking") {
            return [__("Checking"), 'green', "status,=," + doc.status];
        }
    }
}
