export default {
  'get|/community/page': option => {
    return {
      code: 200,
      msg: 'ok',
      data: {
        page: 1,
        size: 10,
        totalPage: 1000,
        list: [
          {
            id: '1',
            name: 'xxx社区'
          }, {
            id: '1',
            name: 'xxx社区'
          }, {
            id: '1',
            name: 'xxx社区'
          }, {
            id: '1',
            name: 'xxx社区'
          }, {
            id: '1',
            name: 'xxx社区'
          }, {
            id: '1',
            name: 'xxx社区'
          }, {
            id: '1',
            name: 'xxx社区'
          }, {
            id: '1',
            name: 'xxx社区'
          }, {
            id: '1',
            name: 'xxx社区'
          }, {
            id: '1',
            name: 'xxx社区'
          }
        ]
      }
    }
  },
  'post|/community/add': option => {
    return {
      msg: 'ok',
      code: 200
    }
  },
  'post|/community/del': option => {
    return {
      msg: 'ok',
      code: 200
    }
  },
  'post|/community/update': option => {
    return {
      msg: 'ok',
      code: 200
    }
  }
}
