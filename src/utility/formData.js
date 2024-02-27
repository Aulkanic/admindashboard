export default function createFormData(data){
    const formData = new FormData();

    for (const key in data){
        if(data.hasOwnProperty(key)){
            let value = data[key];
            if (value instanceof Date) {
                // If the value is a Date object, convert it to a localized date string
                formData.append(key, value.toLocaleDateString());
            } else if (typeof value === 'object') {
                // If the value is an object, stringify it
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, value);
            }
        }
    }

    return formData
}