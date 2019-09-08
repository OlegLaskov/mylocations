export default class {
    getData = () => {
        let data = localStorage.getItem('myLocation');
        if(data){
            data = JSON.parse(data);
        } else {
            data = {locations: [], categories: []};
        }
        return data;
    };
    saveData = (data) => {
        localStorage.setItem('myLocation', JSON.stringify(data));
    }
}