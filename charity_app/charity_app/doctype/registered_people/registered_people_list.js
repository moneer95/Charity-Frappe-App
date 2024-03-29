frappe.listview_settings['Registered People'] = {
    get_indicator: function(doc) {
        if (doc.status === "Waiting") {
            return [__("Waiting"), 'yellow', "status,=," + doc.status];
        }

        if (doc.status === "Checked") {
            return [__("Checked"), 'green', "status,=," + doc.status];
        }

        if (doc.status === "Will Visit Us") {
            return [__("Will Visit Us"), 'blue', "status,=," + doc.status];
        }
    }
}
