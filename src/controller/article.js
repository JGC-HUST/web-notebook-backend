const Base = require('./base.js');

module.exports = class extends Base {

  /**
   * 增
   */
  async postAction() {
    const userModel = this.model('user');
    const cateModel = this.model('cate');
    const artiModel = this.model('article');

    let username = this.post('username');
    let catename = this.post('catename');
    let title = this.post('title');
    let content = this.post('content');
    let time = this.post('time');

    try {
      let user = await userModel.where({ username }).find();
      let userId = user.id;
      let cate = await cateModel.where({ title: catename, owner: userId }).find();
      let cateId = cate.id;
      let articleId = await artiModel.add({ title, content, time, cate: cateId });
      if (articleId) {
        this.success({
          code: 1,
          msg: '文章创建成功'
        })
      } else {
        this.fail(3000, 'fail', {
          code: -1,
          msg: '文章创建失败'
        })
      }
    } catch (error) {
      this.fail(3001, 'fail', {
        code: -1,
        msg: '文章创建失败'
      })
    }
  }

  async delAction() {
    const userModel = this.model('user');
    const cateModel = this.model('cate');
    const artiModel = this.model('article');

    let title = this.post('title');
    let username = this.post('username');
    let catename = this.post('catename');

    try {
      let user = await userModel.where({ username }).find();
      let userId = user.id;
      let cate = await cateModel.where({ title: catename, owner: userId }).find();
      let cateId = cate.id;
      // todo
    } catch (error) {

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
