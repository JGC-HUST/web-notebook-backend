const BaseRest = require('./rest.js');

module.exports = class extends BaseRest {

    async getAction() {
        const model = this.model('user');
        let id = this.getId();
        let user = await model.where({ id }).select();
        console.log(user)
    }

    async postAction() {
        const model = this.model('user');
        console.log(this.post('username'));
    }

};