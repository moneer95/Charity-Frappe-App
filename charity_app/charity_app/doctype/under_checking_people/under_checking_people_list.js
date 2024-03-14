frappe.listview_settings['Under Checking People'] = {
    get_indicator: function(doc) {
        if (doc.status === "Good without Sponsorship") {
            return [__(doc.status), 'green', "status,=," + doc.status];
        }

        if (doc.status === "Sponsored by individual") {
            return [__(doc.status), 'blue', "status,=," + doc.status];
        }

        if (doc.status === "Sponsored by MATW") {
            return [__(doc.status), 'purple', "status,=," + doc.status];
        }

        if (doc.status === "Waiting to be sponsored") {
            return [__(doc.status), 'yellow', "status,=," + doc.status];
        }

    }
}
