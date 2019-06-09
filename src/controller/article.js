const Base = require('./base.js');

module.exports = class extends Base {

  async addAction() {
    const userModel = this.model('user');
    const cateModel = this.model('cate');
    let username = this.post('username');
    let catename = this.post('catename');
    try {
      let user = await userModel.where({ username }).find();
      let userId = user.id;
      let cateId = await cateModel.add({ title: catename, owner: userId });
      if (cateId) {
        this.success({
          code: 1,
          msg: '分类创建成功'
        })
      } else {
        this.fail(4000, 'fail', {
          code: -1,
          msg: '分类创建失败'
        })
      }
    } catch (error) {
      this.fail(3000, 'fail', {
        code: -1,
        msg: '分类创建失败'
      })
    }
  }

  async getAction() {
    const userModel = this.model('user');
    const cateModel = this.model('cate');
    let username = this.get('username');
    try {
      let user = await userModel.where({ username }).find();
      let userId = user.id;
      let cates = await cateModel.where({ owner: userId }).select();
      cates = cates.map((item) => {
        return JSON.parse(JSON.stringify(item, (key, value) => {
          if (key === 'id' || key === 'owner') {
            return undefined;
          } else {
            return value;
          }
        }))
      })
      this.success({
        code: 1,
        cates
      }, 'success');
    } catch (error) {
      this.fail(3000, 'fail', {
        code: -1,
        msg: '分类查询失败'
      })
    }
  }

  async putAction() {

  }

  async delAction() {

  }

  async getAllAction() {

  }

};
