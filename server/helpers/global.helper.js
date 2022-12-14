class GlobalHelper {
    constructor(){
    }

    validateFields = (required_fields, optional_fields=[], req) => {
        let response_data = { status: false, result: {}, error: null}

        try{
            if(!Array.isArray(required_fields) || !Array.isArray(optional_fields)){
                throw Error("Arguments have incorrect data types. Must pass array.")
            }

            let all_fields = required_fields.concat(optional_fields);
            let sanitized_data = {};
            let missing_fields = [];

            for(const index in all_fields){
                let selected_key = all_fields[index];
                let selected_value = req.body[selected_key] != undefined ? req.body[selected_key] : "";

                if(String(selected_value).trim() === "" && required_fields.includes(selected_key)){
                    missing_fields.push(selected_key);
                }
                else{
                    sanitized_data[selected_key] = selected_value;
                }
            }

            response_data.status = missing_fields.length === 0;
            response_data.result = response_data.status ? {sanitized_data} : {missing_fields};
        }
        catch(error){
            response_data.error = error;
        }

        return response_data;
    }
}

module.exports = GlobalHelper;