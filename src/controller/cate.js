const Base = require('./base.js');

module.exports = class extends Base {

  indexAction() {
    return this.display();
  }

  async addAction() {
    const userModel = this.model('user');
    const cateModel = this.model('cate');
    let username = this.post('username');
    let catename = this.post('catename');
    try {
      let user = await userModel.where({username}).find();
      let userId = user.id;
      let cateId = await cateModel.add({title: catename, owner: userId});
      if (cateId) {
        this.success({
          code: 1,
          msg: '分类创建成功'
        });
      } else {
        this.fail(2000, 'fail', {
          code: -1,
          msg: '分类创建失败'
        });
      }
    } catch (error) {
      this.fail(2001, 'fail', {
        code: -1,
        msg: '分类创建失败'
      });
    }
  }

  async getAction() {
    const userModel = this.model('user');
    const cateModel = this.model('cate');
    let username = this.get('username');
    try {
      let user = await userModel.where({username}).find();
      let userId = user.id;
      let cates = await cateModel.where({owner: userId}).select();
      cates = cates.map((item) => {
        return JSON.parse(JSON.stringify(item, (key, value) => {
          if (key === 'id' || key === 'owner') {
            return undefined;
          } else {
            return value;
          }
        }));
      });
      this.success({
        code: 1,
        cates
      });
    } catch (error) {
      this.fail(2002, 'fail', {
        code: -1,
        msg: '分类查询失败'
      });
    }
  }

  async getArtiAction() {
    const userModel = this.model('user');
    const cateModel = this.model('cate');
    const artiModel = this.model('article');

    try {
      let username = this.get('username');
      let catename = this.get('catename');
      let user = await userModel.where({username}).find();
      let userId = user.id;
      let cate = await cateModel.where({title: catename, owner: userId}).find();
      let cateId = cate.id;
      console.log(cateId)
      let articles = await artiModel.where({cate: cateId}).select();
      articles = articles.map((item) => {
        return JSON.parse(JSON.stringify(item, (key, value) => {
          if (key === 'id' || key === 'cate') {
            return undefined;
          } else {
            return value;
          }
        }));
      });
      this.success({
        code: 1,
        articles
      });
    } catch (e) {
      this.fail(2002, 'fail', {
        code: -1,
        msg: e.message
      });
    }
  }

};
