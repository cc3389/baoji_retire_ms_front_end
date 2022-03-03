export default {
  'get|/member/deathPage': option => {
    return {
      code: 200,
      msg: 'ok',
      data: {
        totalPage: '200',
        page: 1,
        size: 10,
        list: [{
          id: '1',
          name: '张三',
          birth: '2022-2-2',
          gender: '男',
          status: '死亡'
        }, {
          id: '1',
          name: '张三',
          birth: '2022-2-2',
          gender: '男',
          status: '健康'
        }, {
          id: '1',
          name: '张三',
          birth: '2022-2-2',
          gender: '男',
          status: '健康'
        }]
      }
    }
  },
  'post|/member/death': option => {
    return {
      code: 200,
      msg: 'ok'
    }
  },
  'post|/member/insert': option => {
    return {
      code: 200,
      msg: 'success'
    }
  },
  'get|/member/page': option => {
    return {
      code: 200,
      msg: 'success',
      data: {
        page: '1',
        size: '10',
        totalPage: '500',
        list: [
          {
            id: '1',
            name: 'zs',
            birthday: '2022-2-22',
            gender: '男'
          },
          {
            id: '2',
            name: 'zs',
            birthday: '2022-2-22',
            gender: '男'
          },
          {
            id: '3',
            name: 'zs',
            birthday: '2022-2-22',
            gender: '男'
          }, {
            id: '4',
            name: 'zs',
            birthday: '2022-2-22',
            gender: '男'
          },
          {
            id: '5',
            name: 'zs',
            birthday: '2022-2-22',
            gender: '男'
          },
          {
            id: '6',
            name: 'zs',
            birthday: '2022-2-22',
            gender: '男'
          },
          {
            id: '7',
            name: 'zs',
            birthday: '2022-2-22',
            gender: '男'
          },
          {
            id: '8',
            name: 'zs',
            birthday: '2022-2-22',
            gender: '男'
          },
          {
            id: '9',
            name: 'zs',
            birthday: '2022-2-22',
            gender: '男'
          },
          {
            id: '10',
            name: 'zs',
            birthday: '2022-2-22',
            gender: '男'
          }
        ]
      }
    }
  },
  'post|/member/out': option => {
    return {
      msg: 'success',
      code: 200
    }
  },
  'get|/member/one': option => {
    return {
      code: 200,
      msg: 'ok',
      data: {
        list: {
          name: '张三',
          phone: '15978545632',
          avatar: 'https://x0.ifengimg.com/res/2021/EC934263EE097554D42CDDB2C7E9F1C925C61F4F_size16_w416_h531.jpeg',
          age: '23',
          gender: '女',
          birth: '1998-09-09',
          isDeath: '否',
          insName: '爱情公寓'
        }
      }
    }
  },
  'get|/member/feePage': option => {
    return {
      code: 200,
      mag: 'ok',
      data: {
        total: 1000,
        page: 1,
        size: 10,
        list: [{
          id: 1,
          name: 'zzx',
          fee: 123
        },
        {
          id: 1,
          name: 'zzx',
          fee: 123
        },
        {
          id: 1,
          name: 'zzx',
          fee: 123
        }]
      }
    }
  }
}
