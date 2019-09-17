const config = {
  ROOT: '../../',
  CONFIG: '../../config/config.js',
  RUNTIME: '../../libs/runtime.js',
  ioContext: '../../common/io-context.js',
  utils: '../../utils/util.js',
  appid: '',
  appSecret: '',
  mode: 'dev', // dev / test / pro
  prefix: {
    dev: 'dev.www.baidu.com',
    test: 'test.www.baidu.com',
    pro: 'pro.www.baidu.com',
  },
  https: true,
}

export default config
