// 替换文件中到对应目录
const fs = require('fs');
const path = require('path');
const CONFIG = require('./package.json');

function travel(dir, callback) {
  fs.readdirSync(dir).forEach(function (file) {
      var pathname = path.join(dir, file);

      if (fs.statSync(pathname).isDirectory()) {
          travel(pathname, callback);
      } else {
        callback(pathname);
      }
  });
}
function swName(){
  for(let k in CONFIG.pushTpl){
    if(CONFIG.pushTpl[k] == 'service-worker.js'){
      return k;
    }
  }
}
travel('./build/',(pathname)=>{
  // service-worker to url
  if(pathname.indexOf('service-worker') > -1 || pathname.indexOf('precache') > -1){
    console.log('service-worker：',pathname)
    let source = fs.readFileSync(pathname,'utf8');
    source = source.replace(/([\'\"])([^\'\"]*?)\<\%\= htmlWebpackPlugin\.options\.static \%\>/g,(a,b,c)=>{
      return b+'https://static.yizhibo.com';
    });
    fs.writeFileSync(pathname, source);
    return;
  }
  if(/\.(html)$/.test(pathname)){
    console.log('html：',pathname)
    let source = fs.readFileSync(pathname,'utf8');
    // html中域名前有斜杠
    // <\%\= htmlWebpackPlugin\.options\.static \%>\/v2\/h5\/share\/
    source = source.replace(/\/\<\%\= htmlWebpackPlugin\.options\.static \%\>/g,"<{factory::load_config('domain','static_domain')}>");
    source = source.replace(/\'\<\{\$str_lives\}\>\'/g,'<{$str_lives}>');
    source = source.replace(/\'\<\{\$time\}\>\'/g,'<{$time}>');
    fs.writeFileSync(pathname, source);
    return;
  }
  if(/\.(js)$/.test(pathname)){
    console.log('js：',pathname)
    let source = fs.readFileSync(pathname,'utf8');
    // <\%\= htmlWebpackPlugin\.options\.static \%>\/v2\/h5\/share\/
    source = source.replace(/([\'\"])([^\'\"]*?)\<\%\= htmlWebpackPlugin\.options\.static \%\>/g,(a,b,c)=>{
      return '$CONFIG.static + '+b;
    });
    if(source.indexOf("service-worker.js") > -1){
      let _swPath = swName();
      console.log('switch sw.js url：',pathname,_swPath);
      source = source.replace(/\$CONFIG\.static(.*?)service\-worker\.js([\'\"])/g,(a,b,c)=>{
        console.log('replace',a,b,c)
        return c+'//'+c+'+location.hostname+'+c+'/templates/'+_swPath+c;
      });
    }
    fs.writeFileSync(pathname, source);
  }
});