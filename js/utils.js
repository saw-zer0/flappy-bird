function getRandom(min, max) {
    return (Math.random() * (max - min)) + min;
}


class Store {
    static getData() {
        let data;
        if (localStorage.getItem(`flappydata`) === null) {
            data = {'high-score': 0};
        } else {
            data = JSON.parse(localStorage.getItem(`flappydata`));
        }
        return data;
    }

    static addData(newData) {
        const datas = Store.getData();
        datas['high-score'] = newData;
        localStorage.setItem(`flappydata`, JSON.stringify(datas));
    }

}