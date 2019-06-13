const BaseRest = require('./rest.js');

module.exports = class extends BaseRest {

    async __before() {
        this.header("Access-Control-Allow-Origin", this.header("origin") || "*");
        this.header("Access-Control-Allow-Headers", "x-requested-with");
        this.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
        this.header('Access-Control-Allow-Credentials', true);
        // let method = this.http.method.toLowerCase();
        // if (method === "options") {
        //     this.end();
        //     return;
        // }
        // let isLogin = await this.session('userInfo');
        // if (!isLogin) {
        //     this.fail('AUTH_FAILED');
        // }
    }

    async getAction() {
        console.log(this.cookie('test'))
        const model = this.model('user');
        let username = this.get('username');
        let password = this.get('password');
        let remember = this.get('remember');
        console.log(remember)
        try {
            let user = await model.where({ username }).select();
            if (user[0].password === password) {
                this.cookie('notebook', JSON.stringify(user), {
                    maxAge: 1000 * 60 * 30,
                    path: '/'
                })
                this.success({
                    code: 1,
                    msg: '登陆成功'
                }, 'success');
            } else {
                this.fail(1000, 'fail', {
                    code: -1,
                    msg: '登录失败'
                })
            }
        } catch (error) {
            this.fail(1001, 'fail', {
                code: -1,
                msg: error.message
            })
        }
    }

    async postAction() {
        const model = this.model('user');
        // data fields: username password email
        let username = this.post('username');
        let password = this.post('password');
        let email = this.post('email');
        try {
            let insertId = await model.add({ username, password, email });
            if (insertId > 0) {
                this.success({
                    code: 1,
                    msg: '用户创建成功'
                }, 'success');
            } else {
                this.fail(1002, 'fail', {
                    code: -1,
                    msg: '用户创建失败'
                })
            }
        } catch (error) {
            this.fail(1003, 'fail', {
                code: -1,
                msg: error.message
            })
        }
    }

};