var HTMLEscaper = (function() {
			
	return {
	 
		escape:function(str) {
			//Repace <
			str = str.replace(/</g,"&lt;");
			str = str.replace(/>/g,"&gt;");
			return str;
		}
		
	};
	
}());