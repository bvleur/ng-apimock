

class TestPage {
    constructor() {
        this.data = element(by.className('data'));
        this.status = element(by.className('status'));
        this.done = element(by.className('done'));

        this.buttons = {
            get: element(by.buttonText('get')),
            getAsJsonp:  element(by.buttonText('get as jsonp')),
            post: element(by.buttonText('post'))
        };

        this.input = element(by.id("item"));
    }

    open() {
        return browser.get('/index.html');
    }
}

module.exports = TestPage;