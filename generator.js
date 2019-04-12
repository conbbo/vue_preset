module.exports = (api, options, rootOptions) => {
  // 安装一些基础公共库
  api.extendPackage({
    dependencies: {
      "axios": "^0.18.0",
      "less": "^3.8.1",
      "less-loader": "^4.1.0",
      "vue": "^2.5.17",
      "vue-router": "^3.0.1",
      "vconsole": "^3.2.2"
    },
    scripts: {
      "postbuild": "node replaceDomain.js",
      "lint": "vue-cli-service lint"
    },
    pushTpl:{
      ["default/www/app/"+options.directoryname+"/index.tpl"]: "index.html",
    }
  });

  // 安装 vuex
  // if (options.vuex) {
  //   api.extendPackage({
  //     dependencies: {
  //       vuex: '^3.0.1'
  //     }
  //   });
  //
  //   api.render('./template/vuex');
  // }

  // 安装 yzb-ui 库
  // if (options.yzbui) {
  //   api.extendPackage({
  //     devDependencies: {
  //       "yzb-ui": {
  //         "version": "0.11.1",
  //         "resolved": "http://10.211.163.156:4873/yzb-ui/-/yzb-ui-0.11.1.tgz"
  //       }
  //     }
  //   });
  // }

  // 公共基础目录和文件
  // api.render('./template/default');

  // 配置文件
  api.render({
    './src/App.vue' : './template/default/App.vue',
    './src/main.js' : './template/default/main.js',
    './src/assets/styles/reset.css' : './template/default/assets/styles/reset.css',
    './public/index.html': './template/public/index.html',
    './.gitignore'       : './template/_gitignore',
    './.gitlab-ci.yml'    : './template/_gitlab-ci.yml',
    './replaceDomain.js'  : './template/replaceDomain.js',
    './vue.config.js'    : './template/vue.config.js',
    './.eslintrc.js'    : './template/_eslintrc.js'
  });
}