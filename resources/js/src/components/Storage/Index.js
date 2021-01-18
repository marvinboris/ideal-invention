export default class Storage {
    static get = key => {
        if (!localStorage.getItem('data')) localStorage.setItem('data', JSON.stringify({}));
        const data = JSON.parse(localStorage.getItem('data'));
        return data[key];
    }

    static set = (key, value) => {
        if (!localStorage.getItem('data')) localStorage.setItem('data', JSON.stringify({}));
        const data = JSON.parse(localStorage.getItem('data'));
        data[key] = value;
        localStorage.setItem('data', JSON.stringify(data));
    }
}