require.config ({
    baseUrl:"js/lib",
    paths:{
        "jquery":"jquery",
        "underscore":"underscore",
        "backbone":"backbone",
        "Eventutil":"Eventutil",
        "comms":"comms"
    }
});
require(["jquery","Eventutil","comms"],function($,util,comms){

    changeText(1);
    function changeText(n){
    
    //获取店铺数据更新
    var xhr =comms.createXHR();           //创建对象
    xhr.onreadystatechange = call;                  
    xhr.open('get','http://127.0.0.1:8020/project/data/1.json',true);       //发送异步请求       
    xhr.send(null);                                                       

    function call(){                        //回调函数
        if (xhr.readyState == 4){ 
            if ((xhr.status >= 200 && xhr.status <300) || xhr.status == 304){             //响应成功
                var objs = JSON.parse(xhr.responseText).shop_data;     //处理后的json数据
               // console.log(JSON.parse(xhr.responseText));
                for(var i = (n-1)*5;i < n*5; i++){ 
                	storeList.innerHTML += '<li>'+
	    	    				'<div class="tbp">'+
	    	    				    '<a >'+'<img src='+objs[i].shop_ico +'>'+'</a>'+
	    	    				'</div>'+
	    	    				'<div class="tbl">'+
	    	    					'<a href='+objs[i].shop_addr + 'style="color:#118855;">'+objs[i].shop_name+'</a>'+
	    	    					'<span>店铺等级: '+'<span class="level"></span>'+'<span class="level"></span>'+'</span>'+
	    	    					'<div class="tbld">主营：'+objs[i].main+'</div>'+
	    	    					'<div>地址：'+objs[i].addr_detail+'</div>'+
	    	    				'</div>'+
	    	    				'<div class="tbr">'+
	    	    					'<span>'+'<img src="images/t01dddbd1775cf1d1d7.png">'+'&nbsp;'+'先行赔付'+'</span>'+
	    	    					'<span>'+'<img src="images/t0141b1afb0bd0d7e2e.png">'+'&nbsp;'+'同城帮认证'+'</span>'+
	    	    					'<span>人气：'+objs[i].shop_visit+'次浏览</span>'+
	    	    				'</div>'+
	    	    				'<div class="tbh">'+'<a href='+objs[i].shop_addr+'>进入店铺</a>'+'</div>'+
	    	    			'</li>';
                }
            }     
         }
    }
    	
    }
   
    //数据分页
    var storeList = document.getElementsByClassName('leftb')[0];
    var page = document.getElementsByClassName('page');
    for(var j = 0;j < page.length;j++){                   //遍历页数
        util.addHandler(page[j],'click',changeTab); //页面添加点击事件
        page[0].style.backgroundColor = '#FC6621';
    }
    var next = 0;
    function changeTab(e){                     
    	var event = util.getEvent(e);   //获取事件
    	var target = util.getTarget(event);  //获取事件源
    	storeList.innerHTML = ''; 
    	next = target.innerText;
    	changeText(next);
    	for(var i = 0;i < page.length;i++){         //加背景色
    	    if(i == (next-1)){
    	    	page[i].style.backgroundColor = '#FC6621';
    	    }else{
    	    	page[i].style.backgroundColor = '#fff';
    	    }
    	}
    }
    
    //下一页   var一个变量 next 把当前的页面数字赋给next  点击下一页  next++
    var nextBtn = document.getElementsByClassName('splast')[0];
    util.addHandler(nextBtn,'click',NextTab);
    function NextTab(e){
    	storeList.innerHTML = ''; 
    	for(var i = 0;i < page.length;i++){         //加背景色
    	    if(i == next){
    	    	page[i].style.backgroundColor = '#FC6621';
    	    }else{
    	    	page[i].style.backgroundColor = '#fff';
    	    }
    	}
    	changeText(next++);
    }
    
    //地区转换
    var change = document.getElementById('change');
    var changeCity = document.getElementById('changeCity');
    var closeCity = document.getElementById('closeCity')
    change.onclick = function(){
                changeCity.style.display = 'block';
            }
    closeCity.onclick = function(){
                changeCity.style.display = 'none';
            }
    //拼音转换
    var abcList = document.getElementsByClassName('abcList')[0];
    var abc = document.getElementsByClassName('abc');
    for(var i = 0;i < abc.length; i++){
        util.addHandler(abc[i],'click',changeAbc);   //拼音添加点击事件
    }
    
    
    function changeAbc (e){
        var event = util.getEvent(e);  
    	var target = util.getTarget(event); 
        for(var i = 0;i < abc.length; i++){  //加背景色
              for(var j = 0;j<abc.length;j++){
              	abc[j].removeAttribute("id","point")
              }
                target.setAttribute("id","point");
  	    }
    }
    
    
});