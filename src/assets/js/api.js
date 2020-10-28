// 本机域名
let domain = document.domain || window.location.host;
// 本机端口
let port = window.location.port;
// 本机HTTP
let protocol = window.location.protocol;
// 完整域名
export const DOMAIN = `${protocol}//${domain}:${port}`
// 图片回显拼接地址
export const API_PIC = 'https://df0716.oss-cn-hangzhou.aliyuncs.com/'
// 1 OSS上传
export const API_MEMBER_UPLOAD = `/club/member/upload`
export const API_OSS_POLICY = `/web/member/oss_policy`


// 登录
const MEMBER_SIGNIN = '/web/member/signin'
// 首页
const HOME_PC_MAIN = '/club/home/pc_main'
// 车型分类
const HOME_FORUMTYPE = '/club/home/forumtype'
// 用户信息
const MEMBER_INFO = '/web/member/info'
// 点击关注
const MEMBER_FOLLOW = '/club/member/follow'
// 底部数据
const PC_FOOTER = '/club/explord/pc_footer'

export default {
  MEMBER_SIGNIN,
  HOME_PC_MAIN,
  HOME_FORUMTYPE,
  MEMBER_INFO,
  MEMBER_FOLLOW,
  PC_FOOTER,
  DOMAIN,
  API_PIC,
  API_MEMBER_UPLOAD,
  API_OSS_POLICY,

}
