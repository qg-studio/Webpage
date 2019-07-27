require.config({
	baseUrl: '',  // 根目录，相对于HTML文件
	paths: {
		login: "../js/login",  // 相对于Js目录
		tools: "../js/tools"
	}	
})

require(['login']);

