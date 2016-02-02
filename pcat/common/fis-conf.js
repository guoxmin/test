var meta = require('./package.json');
fis.set('name', meta.name);
fis.set('version', meta.version);


fis.match('*', {
    release: false
});


fis.media('qa').match("/components/**/(*.js)",{
	useHash: true,
	domain:"http://zzsvn.pcauto.com.cn",
 	release:"${name}/${version}/j/$1",
 	deploy: fis.plugin('local-deliver', {
	      to: '../qa/static/'
	  })
})

fis.media('qa').match("/components/**/(*.css)",{
	useHash: true,
	domain:"http://zzsvn.pcauto.com.cn",
	 release:"${name}/${version}/c/$1",
	 deploy: fis.plugin('local-deliver', {
	      to: '../qa/static/'
	  })
})


fis.media('qa').match("/components/**/{(*.jpg),(*.png),(*.gif)}",{
	useHash: true,
	domain:"http://zzsvn.pcauto.com.cn",
 	release:"${name}/${version}/i/$1$2$3",
 	deploy: fis.plugin('local-deliver', {
	      to: '../qa/static/'
	  })
})

fis.media('qa').match("/components/**/{(*.html),(*.cms),(*.tpl)}",{
	useHash: true,
 	release:"${name}/${version}/$1$2$3",
 	deploy: fis.plugin('local-deliver', {
	      to: '../qa/template/'
	  })
})

fis.media('qa').match("map.json",{
	useHash: true,
 	release:"${name}/${version}/$0",
 	deploy: fis.plugin('local-deliver', {
	      to: '../qa/map/'
	  })
})



fis.media('online').match("/components/**/(*.js)",{
	useHash: true,
	domain:"htttp://js.3conline.com.cn",
 	release:"${name}/${version}/j/$1",
 	deploy: fis.plugin('local-deliver', {
	      to: '../online/static/'
	  })
})



fis.media('online').match("/components/**/(*.css)",{
	useHash: true,
	domain:"htttp://js.3conline.com.cn",
	 release:"${name}/${version}/c/$1",
	 deploy: fis.plugin('local-deliver', {
	      to: '../online/static/'
	  })
})


fis.media('online').match("/components/**/{(*.jpg),(*.png),(*.gif)}",{
	useHash: true,
	domain:"htttp://www1.pconline.com.cn",
 	release:"${name}/${version}/i/$1$2$3",
 	deploy: fis.plugin('local-deliver', {
	      to: '../online/static/'
	  })
})

fis.media('online').match("/components/**/{(*.html),(*.cms),(*.tpl)}",{
	useHash: true,
 	release:"${name}/${version}/$1$2$3",
 	deploy: fis.plugin('local-deliver', {
	      to: '../online/template/'
	  })
})

fis.media('online').match("map.json",{
	useHash: true,
 	release:"${name}/${version}/$0",
 	deploy: fis.plugin('local-deliver', {
	      to: '../online/map/'
	  })
})



// fis.media('qa').match('*.{js,css,png}', {
//   useHash: false,
//   useSprite: false,
//   optimizer: null
// })

// fis.match("/page/(**.{js,css,png,jpg,gif})",{
//  	release:"/${name}/static/${version}/$1"
// })

// fis.match("/lib/(**.{js,css,png,jpg,gif})",{
//  	release:"/${name}/static/${version}/$1"
// })

