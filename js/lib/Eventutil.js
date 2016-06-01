define(['exports'],function (exports) {
    exports.addHandler=function(element,type,handler){
			if(element.addEventListener){
				element.addEventListener(type,handler,false);
			}else if(element.attachEvent){
				element.attachEvent('on'+type,handler);
			}else{
				element['on'+type]=handler;
			}
		};
		exports.removeHandler=function(element,type,handler){
			if(element.removeHandler){
				element.removeHandler(type,handler,false);
			}else if(element.detachEvent){
				element.detachEvent('on'+type,handler);
			}else{
				element['on'+type]=null;
			}
		};
		exports.getEvent=function(event){
			return event?event:window.event;
		};
		exports.getTarget=function(event){
			return event.target||event.srcElement;
		};
		exports.stopPropagation=function(event){
			if(event.stopPropagation){
				event.stopPropagation();
			}else{
				event.cancelBubble=true;
			}
		}
 });
