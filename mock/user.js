const users = {
  'lowadmin': {
    roles: 'low',
    name: '市区管理员'
  },
  'midadmin': {
    roles: 'mid',
    name: '县区管理员'
  },
  'highadmin': {
    roles: 'high',
    name: '社区管理员'
  }
}
export default {
  'post|/admin/login': option => {
    return {
      code: 200,
      msg: 'success',
      data: {
        token: 'this is token'
      }
    }
  },
  'get|/admin/info\.*': option => {
    return {
      code: 200,
      msg: 'ok',
      data:
        {
          roles: 'low',
          name: '市区管理员'
        }
    // {
    //   roles: 'mid',
    //   name: '县区管理员'
    // }
    // {
    //   roles: 'low',
    //     name: '系统管理员'
    // }
    }
  },
  'post|/admin/logout': option => {
    return {
      code: 200,
      msg: 'ok'
    }
  },
  'get|/admin/list\.*': option => {
    return {
      code: 200,
      msg: 'ok',
      data: {
        page: 1,
        size: 10,
        total: 100,
        list: [{
          id: 1,
          name: 'admin1',
          permission: 'mid'
        },
        {
          id: 1,
          name: 'admin11',
          permission: 'low'
        }, {
          id: 1,
          name: 'admin12',
          permission: 'mid'
        }, {
          id: 1,
          name: 'admin2',
          permission: 'low'
        }, {
          id: 1,
          name: 'admin1',
          permission: 'high'
        }, {
          id: 1,
          name: 'admin1',
          permission: 'high'
        }, {
          id: 1,
          name: 'admin1',
          permission: 'high'
        }, {
          id: 1,
          name: 'admin1',
          permission: 'high'
        }, {
          id: 1,
          name: 'admin1',
          permission: 'high'
        }, {
          id: 1,
          name: 'admin1',
          permission: 'high'
        }, {
          id: 1,
          name: 'admin1',
          permission: 'high'
        }, {
          id: 1,
          name: 'admin1',
          permission: 'high'
        }]
      }
    }
  },
  'post|/admin/create': option => {
    return {
      code: 200,
      msg: 'ok'
    }
  },
  'post|/admin/grant': option => {
    return {
      code: 200,
      msg: 'ok'
    }
  },
  'post|/admin/revoke': option => {
    return {
      code: 200,
      msg: 'ok'
    }
  },
  'get|/admin/suggestion': option => {
    return {
      code: 200,
      msg: 'ok',
      data: {
        community: [
          { 'value': '三全鲜食（北新泾店）' },
          { 'value': 'Hot honey 首尔炸鸡（仙霞路）' },
          { 'value': '新旺角茶餐厅' },
          { 'value': '泷千家(天山西路店)' },
          { 'value': '胖仙女纸杯蛋糕（上海凌空店）' },
          { 'value': '贡茶' },
          { 'value': '豪大大香鸡排超级奶爸' },
          { 'value': '茶芝兰（奶茶，手抓饼）' }
        ],
        area: [
          { 'value': '猫山王（西郊百联店）' },
          { 'value': '枪会山' },
          { 'value': '纵食' },
          { 'value': '钱记' },
          { 'value': '壹杯加' }
        ]
      }
    }
  }
}
