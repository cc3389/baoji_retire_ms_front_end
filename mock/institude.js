export default {
  'get|/institute/list': option => {
    return {
      msg: 'ok',
      code: 200,
      data: {
        page: 1,
        size: 10,
        totalPage: 1000,
        list: [
          {
            id: 1,
            name: 'xxx机构'
          }, {
            id: 1,
            name: 'xxx机构'
          }, {
            id: 1,
            name: 'xxx机构'
          }, {
            id: 1,
            name: 'xxx机构'
          }, {
            id: 1,
            name: 'xxx机构'
          }, {
            id: 1,
            name: 'xxx机构'
          }, {
            id: 1,
            name: 'xxx机构'
          }, {
            id: 1,
            name: 'xxx机构'
          }, {
            id: 1,
            name: 'xxx机构'
          }, {
            id: 1,
            name: 'xxx机构'
          }, {
            id: 1,
            name: 'xxx机构'
          }]
      }
    }
  },
  'get|/institute/info': option => {
    return {
      code: 200,
      msg: 'ok',
      data: {
        id: 1,
        name: '123',
        phone: '12345678',
        address: 'xxx',
        sum: 12,
        email: '123@123.com',
        comName: 'xxx'
      }
    }
  }

}
