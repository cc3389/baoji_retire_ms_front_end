export default {
  'get|/visit/page': option => {
    return {
      code: 200,
      msg: 'ok',
      data: {
        page: 1,
        size: 10,
        totalPage: 1000,
        list: [{
          id: 1,
          date: '2022-2-22',
          comId: 1,
          comName: 'xxxxx社区',
          desc: '我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述'
        }, {
          id: 1,
          date: '2022-2-22',
          comId: 1,
          comName: 'xxxxx社区',
          desc: '我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述'
        }, {
          id: 1,
          date: '2022-2-22',
          comId: 1,
          comName: 'xxxxx社区',
          desc: '我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述'
        }, {
          id: 1,
          date: '2022-2-22',
          comId: 1,
          comName: 'xxxxx社区',
          desc: '我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述'
        }, {
          id: 1,
          date: '2022-2-22',
          comId: 1,
          comName: 'xxxxx社区',
          desc: '我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述'
        }, {
          id: 1,
          date: '2022-2-22',
          comId: 1,
          comName: 'xxxxx社区',
          desc: '我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述'
        }, {
          id: 1,
          date: '2022-2-22',
          comId: 1,
          comName: 'xxxxx社区',
          desc: '我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述'
        }, {
          id: 1,
          date: '2022-2-22',
          comId: 1,
          comName: 'xxxxx社区',
          desc: '我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述'
        }, {
          id: 1,
          date: '2022-2-22',
          comId: 1,
          comName: 'xxxxx社区',
          desc: '我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述'
        }, {
          id: 1,
          date: '2022-2-22',
          comId: 1,
          comName: 'xxxxx社区',
          desc: '我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述'
        }, {
          id: 1,
          date: '2022-2-22',
          comId: 1,
          comName: 'xxxxx社区',
          desc: '我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述'
        }
        ]
      }
    }
  },
  'get|/visit/chart': option => {
    return {
      code: 200,
      mag: 'ok',
      data: {
        list: [
          { comName: '1区',
            total: 1
          },
          { comName: '5区',
            total: 32
          },
          { comName: '2区',
            total: 4
          },
          { comName: '3区',
            total: 5
          },
          { comName: '4区',
            total: 2
          }
        ]
      }
    }
  }
}
