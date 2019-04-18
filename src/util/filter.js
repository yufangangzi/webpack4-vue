/**
 * author haoxiaojun
 * on 1505985374000
 */
/**
 * 对日期进行格式化，
 * @param date 要格式化的日期
 * @param format 进行格式化的模式字符串
 *     支持的模式字母有：
 *     y:年,
 *     M:年中的月份(1-12),
 *     d:月份中的天(1-31),
 *     h:小时(0-23),
 *     m:分(0-59),
 *     s:秒(0-59),
 *     S:毫秒(0-999),
 *     q:季度(1-4)
 * @return String
 */
import { Message } from 'element-ui'
export const formatDate = (str, format) => {
  if (!str) return ''
  // console.log(str,fromat)
  var date = new Date(str)

  var map = {
    '': date.getFullYear(), // 年
    'M': date.getMonth() + 1, // 月份
    'd': date.getDate(), // 日
    'h': date.getHours(), // 小时
    'm': date.getMinutes(), // 分
    's': date.getSeconds(), // 秒
    'q': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
    var v = map[t]
    if (v !== undefined) {
      if (all.length > 1) {
        v = '0' + v
        v = v.substr(v.length - 2)
      }
      return v
    } else if (t === 'y') {
      return (date.getFullYear() + '').substr(4 - all.length)
    }
    return all
  })
  return format
}
/**
 * 转换为大写
 * @param {String} value 接受的过滤值
 */
export const uppercase = (value) => {
  return (value || value === 0)
    ? value.toString().toUpperCase()
    : ''
}
/**
 * 转换为大写
 * @param {String} value 接受的过滤值
 */
export const lowercase = (value) => {
  return (value || value === 0)
    ? value.toString().toLowerCase()
    : ''
}

/**
 获取url参数
 */
export const queryUrl = (url) => {
  url = url || window.location.href
  var reg = /([^?=&]+)=([^?=&]+)/g
  var obj = {}
  url.replace(reg, function () {
    obj[arguments[1]] = arguments[2]
  })
  return obj
}

/**
 * js精度问题解决方案
 * @export
 * @param {any} f 算数表达式
 * @param {any} digit 保留几位小数
 * @returns 处理后的数据
 */
export const formatFloat = (f, digit) => {
  digit = digit || 1
  var m = Math.pow(10, digit)
  return (parseFloat(f * m, 10) / m).toFixed(digit)
}

/**
 * author yangtiansheng
 * js取到小数后n位,不四舍五入
 * @param {any} val 需要转换的值
 * @param {number} digit 保留几位小数
 * @returns 处理后的数据
 */
export const formatFloatNumber = (val, digit) => {
  digit = digit || 1
  let num = Number(val)
  let regexp1 = new RegExp(`^\\d+(?:\\.\\d{0,${digit}})?`)
  // 有小数点按digit取
  if (parseInt(num) !== num) {
    return Number(num.toString().match(regexp1))
  }
  // 非小数直接返回
  return num
}

/**
 * author yts
 * 格式化数字：每三位加逗号
 * @param {number || string} num 需转换的值
 */
export const toThousands = (num) => {
  let result = ''
  let counter = 0
  num = (num || 0).toString()
  for (let i = num.length - 1; i >= 0; i--) {
    counter++
    result = num.charAt(i) + result
    if (!(counter % 3) && i !== 0) { result = ',' + result }
  }
  return result
}

/**
 * author sj
 * on 2018-09
 */
/**
 手机号加密
 */
export const phoneEncry = (val) => {
  if (!val) return ''
  if (val) { return (val.substr(0, 3) + '****' + val.substr(7)) }
}

/**
 上传
 */
export const beforeUpload = (file, obj) => {
  console.log(file)
  console.log(obj)
  /*
   * 参数说明：
   * file：必填 上传文件
   * obj：选填 文件格式要求的配置项目
   * */
  let isOk = false

  // 是否传递第二个参数
  if (obj === undefined) {
    obj = {}
  }
  // 赋默认值
  var option = {
    fileType: obj.fileType || ['txt', 'doc', 'docx', 'pdf', 'jpg', 'jpeg', 'gif', 'png', 'xlsx', 'xls', 'rar', 'zip', '7z'],
    unit: obj.unit || 'KB',
    min: obj.min || 0,
    max: obj.max || 20480,
    error: obj.error || '请上传小于20MB的txt/doc/docx/pdf/jpg/jpeg/gif/png/xlsx/xls/rar/zip/7z文件'
  }

  // 类型对比
  const fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
  for (var i = 0; i < option.fileType.length; i++) {
    if (fileType === option.fileType[i]) {
      isOk = true
    }
  }

  // 大小限制
  let size = 0
  if (option.unit === 'KB') {
    size = file.size / 1024
  } else if (option.unit === 'MB') {
    size = file.size / 1024 / 1024
  }
  if (option.max > 0 && option.min > 0) {
    let isLt = size < option.max
    let isGt = size > option.min
    if (!(isLt && isGt)) {
      isOk = false
    }
  } else if (option.max > 0 && option.min === 0) {
    let isLt = size < option.max
    if (!isLt) {
      isOk = false
    }
  }

  if (!isOk) {
    // message.error(option.error)
    Message.error(option.error)
  }
  console.log(isOk)
  return isOk
}
