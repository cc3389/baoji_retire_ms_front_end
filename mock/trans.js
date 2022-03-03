export default {
  'get|/trans/page': option => {
    return {
      code: 200,
      msg: 'ok',
      data: {
        page: '1',
        totalPage: '200',
        size: '10',
        list: [{
          id: '1',
          name: '张三',
          transId: '2',
          status: '通过',
          outCom: 'xxx社区',
          inCom: 'xxxx社区',
          outDate: '2022-1-18',
          inDate: '2022-01-24',
          outComId: '3',
          inComId: '4'
        }, {
          id: '2',
          name: '张三',
          transId: '2',
          status: '待转移',
          outCom: 'xxx社区',
          inCom: 'xxxx社区',
          outDate: '',
          inDate: '2022-01-04',
          outComId: '3',
          inComId: '4'
        },
        {
          id: '3',
          name: '张三',
          transId: '2',
          status: '拒绝',
          outCom: 'xxx社区',
          inCom: 'xxxx社区',
          outDate: '',
          inDate: '2022-10-14',
          outComId: '3',
          inComId: '4'
        },
        {
          id: '3',
          name: '张三',
          transId: '2',
          status: '拒绝',
          outCom: 'xxx社区',
          inCom: 'xxxx社区',
          outDate: '',
          inDate: '2022-10-14',
          outComId: '3',
          inComId: '4'
        },
        {
          id: '3',
          name: '张三',
          transId: '2',
          status: '拒绝',
          outCom: 'xxx社区',
          inCom: 'xxxx社区',
          outDate: '',
          inDate: '2022-10-14',
          outComId: '3',
          inComId: '4'
        },
        {
          id: '3',
          name: '张三',
          transId: '2',
          status: '拒绝',
          outCom: 'xxx社区',
          inCom: 'xxxx社区',
          outDate: '',
          inDate: '2022-10-14',
          outComId: '3',
          inComId: '4'
        },
        {
          id: '3',
          name: '张三',
          transId: '2',
          status: '拒绝',
          outCom: 'xxx社区',
          inCom: 'xxxx社区',
          outDate: '',
          inDate: '2022-10-14',
          outComId: '3',
          inComId: '4'
        },
        {
          id: '3',
          name: '张三',
          transId: '2',
          status: '拒绝',
          outCom: 'xxx社区',
          inCom: 'xxxx社区',
          outDate: '',
          inDate: '2022-10-14',
          outComId: '3',
          inComId: '4'
        },
        {
          id: '3',
          name: '张三',
          transId: '2',
          status: '拒绝',
          outCom: 'xxx社区',
          inCom: 'xxxx社区',
          outDate: '',
          inDate: '2022-10-14',
          outComId: '3',
          inComId: '4'
        },
        {
          id: '3',
          name: '张三',
          transId: '2',
          status: '拒绝',
          outCom: 'xxx社区',
          inCom: 'xxxx社区',
          outDate: '',
          inDate: '2022-10-14',
          outComId: '3',
          inComId: '4'
        }

        ]
      }
    }
  },
  'get|/trans/suggesion': option => {
    return {
      code: 200,
      msg: 'ok',
      data: {
        list: [
          { 'value': '三全鲜食（北新泾店）' },
          { 'value': 'Hot honey 首尔炸鸡（仙霞路）' },
          { 'value': '新旺角茶餐厅' },
          { 'value': '泷千家(天山西路店)', 'address': '天山西路438号' },
          { 'value': '胖仙女纸杯蛋糕（上海凌空店）' },
          { 'value': '贡茶' },
          { 'value': '豪大大香鸡排超级奶爸' },
          { 'value': '茶芝兰（奶茶，手抓饼）' },
          { 'value': '十二泷町' },
          { 'value': '星移浓缩咖啡' },
          { 'value': '阿姨奶茶/豪大大' },
          { 'value': '新麦甜四季甜品炸鸡' },
          { 'value': 'Monica摩托主题咖啡店' },
          { 'value': '浮生若茶（凌空soho店）' },
          { 'value': 'NONO JUICE  鲜榨果汁' },
          { 'value': 'CoCo都可(北新泾店）' },
          { 'value': '快乐柠檬（神州智慧店）' },
          { 'value': 'Merci Paul cafe' },
          { 'value': '猫山王（西郊百联店）' },
          { 'value': '枪会山' }
        ]
      }
    }
  }
}
