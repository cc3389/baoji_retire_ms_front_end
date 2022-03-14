/**
 * Created by PanJiaChen on 16/11/18.
 */

import { formatToElDate } from '@/utils/date'

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  return str.length > 0 // 校验用户名长度
}

export function isEmail(s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 验证手机号码
 * @param {*} s
 */
export function isMobile(s) {
  return /^1[0-9]{10}$/.test(s)
}

/**
 * 验证电话号码
 * @param {*} s
 */
export function isPhone(s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}
export function isDate(s) {
  return /^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$/.test(s)
}
/**
 * 验证URL地址
 * @param {*} s
 */
export function isURL(s) {
  return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 验证用户名
 * @param {Object} s
 */
export function isUsername(s) {
  return /^[a-zA-Z0-9]{5,50}$/.test(s)
}

/**
 * 验证密码
 * @param {Object} s
 */
export function isPassword(s) {
  return /^[a-zA-Z0-9]{6,20}$/.test(s)
}
export function validatePhone(rule, value, callback) {
  if (value === '') {
    callback(new Error('请输入手机号'))
  } else if (!/^1\d{10}$/.test(value)) {
    callback(new Error('手机号格式错误'))
  } else {
    callback()
  }
}
export function validateExcel(form) {
  if (typeof form.name !== 'string') {
    form.name = ''
  }
  if (typeof form.gender !== 'string') {
    form.gender = ''
  }
  if (typeof form.birthday !== 'string') {
    form.birthday = ''
  } else {
    form.birthday = form.birthday.replaceAll('.', '-')
    // if (isDate(form.birthday)) {
      console.log('b4', form.birthday)
      form.birthday = formatToElDate(form.birthday)
      console.log('af', form.birthday)
    // }
  }
  if (typeof form.phone !== 'number') {
    form.phone = ''
  }
  if (typeof form.insName !== 'string') {
    form.insName = ''
  }
  return form
}
