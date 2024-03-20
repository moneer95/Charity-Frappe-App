frappe.ready(function() {
	// bind events here

    document.querySelector('.navbar-expand-lg').innerHTML = ''
    document.querySelector('.navbar-expand-lg').style.display = 'none';

    document.querySelector('.footer-powered').innerHTML = ''
    document.querySelector('.footer-powered').style.display = 'none';

    // Select the button element with class "btn-primary" inside the ".web-form-actions" div
    // const webFormActionsDiv = document.querySelector('.web-form-actions');

	frappe.web_form.after_load = () => {
        let childTableField = frappe.web_form.fields_dict['enter_your_family_data_each_person_in_a_row'];
        let childTableFieldLength = childTableField.grid.grid_rows.length

        //delete unwanted name field in the child table
        childTableField.grid.docfields.splice(0, 1)

        childTableField.grid.grid_buttons.find('.grid-add-row')[0].innerHTML='اضغط هنا لإضافة فرد'


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


let value = ''
frappe.web_form.validate = () => {

    // return false if not valid
    value = frappe.web_form.get_value(['family_name__last_name_']);
    if (!value){
        frappe.msgprint('!أدخل اسم العائلة');
        return false;
    }


    var childs = frappe.web_form.get_value('enter_your_family_data_each_person_in_a_row');

    if(childs.length == 0){
        frappe.msgprint('!لا يمكن ترك الجدول فارغا يجب إدخال جميع أفراد العائلة المستفيدة ');
        return false;
    }

    for(var i = 0; i < childs.length; i++){
        var child = childs[i]
        if(!child.first_name){
            frappe.msgprint('!لا يمكن ترك اسم الفرد فارغا في الجدول');
            frappe.msgprint('قم بتعبئته أو احذف الصف الفارغ عن طريق الضفط على المربع الصغير على اليسار ثم الضغط على سلة المهملات');
            return false;
        }

        if(!child.age){
            frappe.msgprint('!لا يمكن ترك العمر فارغا في الجدول');
            frappe.msgprint('قم بتعبئته أو احذف الصف الفارغ عن طريق الضفط على المربع الصغير على اليسار ثم الضغط على الزر الأحمر');
            return false;
        }

        if(!child.passport_number){
            frappe.msgprint('!لا يمكن ترك رقم جواز السفر فارغا في الجدول');
            frappe.msgprint('قم بتعبئته أو أدخل رقم الهوية');
            return false;
        }

        if(!child.passport_image){
            frappe.msgprint('!يجب إرفاق صورة جواز السفر');
            frappe.msgprint('أرفق صورة الهوية في حال عدم وجود جواز سفر');
            return false;
        }
    }

    value = frappe.web_form.get_value(['arrival_date']);
    if (!value){
        frappe.msgprint('!أدخل تاريخ الوصول');
        return false;
    }

    value = frappe.web_form.get_value(['phone_number']);
    if (!value){
        frappe.msgprint('!أدخل رقم هاتفك المصري');
        return false;
    }

    value = frappe.web_form.get_value(['whatsapp_number']);
    if (!value){
        frappe.msgprint('!أدخل رقم واتس اب');
        return false;
    }

    value = frappe.web_form.get_value(['city_name']);
    if (!value){
        frappe.msgprint('!أدخل اسم المدينة');
        return false;
    }

    value = frappe.web_form.get_value(['address']);
    if (!value){
        frappe.msgprint('!أدخل العنوان بالتفصيل');
        return false;
    }

    value = frappe.web_form.get_value(['location']);
    if (!value){
        frappe.msgprint('!أدخل اللوكيشن من خرائط جوجل');
        return false;
    }

    return true


};

frappe.web_form.handle_success = () => {
    frappe.msgprint(__('تم التسجيل بنجاح'));
    frappe.msgprint(__('سيتم التواصل معكم في أقرب وقت'));
    setTimeout(() => {
        location.reload();
    }, 3000)
    }
})

