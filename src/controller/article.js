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
      let user = await userModel.where({username}).find();
      let userId = user.id;
      let cate = await cateModel.where({title: catename, owner: userId}).find();
      let cateId = cate.id;
      let articleId = await artiModel.add({title, content, time, cate: cateId});
      if (articleId) {
        this.success({
          code: 1,
          msg: '文章创建成功'
        });
      } else {
        this.fail(3000, 'fail', {
          code: -1,
          msg: '文章创建失败'
        });
      }
    } catch (error) {
      this.fail(3001, 'fail', {
        code: -1,
        msg: '文章创建失败'
      });
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
      let user = await userModel.where({username}).find();
      let userId = user.id;
      let cate = await cateModel.where({title: catename, owner: userId}).find();
      let cateId = cate.id;
      let article = await artiModel.where({title, cate: cateId}).find();
      let artiId = article.id;
      let affectedRows = await artiModel.where({id: artiId}).delete();
      if (affectedRows === 1) {
        this.success({
          code: 1,
          msg: '删除成功'
        });
      } else {
        this.fail(3002, 'fail', {
          code: -1,
          msg: '删除失败'
        });
      }
    } catch (error) {
      this.fail(3003, 'fail', {
        code: -1,
        msg: '删除失败'
      });
    }
  }

  /**
   * 改
   * @returns {Promise<void>}
   */
  async updateAction() {
    const userModel = this.model('user');
    const cateModel = this.model('cate');
    const artiModel = this.model('article');

    let username = this.post('username');
    let catename = this.post('catename');
    let title = this.post('title');
    let content = this.post('content');

    try {
      let user = await userModel.where({username}).find();
      let userId = user.id;
      let cate = await cateModel.where({title: catename, owner: userId}).find();
      let cateId = cate.id;
      let article = await artiModel.where({title, cate: cateId}).find();
      let artiId = article.id;
      let affectedRows = await artiModel.where({id: artiId}).update({content});
      if (affectedRows === 1) {
        this.success({
          code: 1,
          msg: '更新成功'
        });
      } else {
        this.fail(3004, 'fail', {
          code: -1,
          msg: '更新失败'
        });
      }
    } catch (error) {
      this.fail(3005, 'fail', {
        code: -1,
        msg: '更新失败'
      });
    }
  }

  async putAction() {

  }


  async getAllAction() {

  }

};
