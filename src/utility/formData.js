export default function createFormData(data){
    const formData = new FormData();

    for (const key in data){
        if(data.hasOwnProperty(key)){
            formData.append(key, data[key]);
        }
    }

    return formData
}