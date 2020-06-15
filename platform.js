const platform = new function platform() {
	var user = window.navigator.userAgent.toLocaleLowerCase();
	this.isMobile = () => {
		return ((user.indexOf('android') != -1) || (user.indexOf('iphone') != -1) || (user.indexOf('ipad') != -1)) ? true : false
	};
	this.isDesktop = () => {
		return ((user.indexOf('windows') != -1) || ((user.indexOf('mac os x') != -1) && (user.indexOf('ipad') == -1) && (user.indexOf('iphone') == -1))) ? true : false
	};
	this.device = () => {
		if ((this.isMobile() === true) && (this.isDesktop()) === false) {
			return "mobile"
		}
		else if ((this.isDesktop() === true) && (this.isMobile() === false)) {
			return "desktop"
		}
		else {
			return undefined
		}
	};
	this.windowSize = () => {
		return {
			'width':window.innerWidth,
			'height':window.innerHeight
		}
	};
	this.deviceSize = () => {
		return {
			'width':window.screen.width,
			'height':window.screen.height
		}
	};
	this.CSS = (elem, styles) => {
		var firefox      = [],
			firefoxlower = [],
			chrome       = [],
			chromelower  = [],
			IE           = [],
			IElower 	 = [];
		for (key in document.body.style) {
			if (key.indexOf("Moz") != -1) {
				firefox.push(key.replace("Moz", ""));
				firefoxlower.push(key.replace("Moz", "").toLocaleLowerCase());
			}
			else if (key.indexOf("webkit") != -1) {
				chrome.push(key.replace("webkit", ""));
				chromelower.push(key.replace("webkit", "").toLocaleLowerCase());
			}
			else if (key.indexOf("ms") != -1) {
				IE.push(key.replace("ms"));
				IElower.push(key.replace("ms", "").toLocaleLowerCase());
			}
		}
		for (key in styles) {
			if (key.toLocaleLowerCase() in firefoxlower) {
				let index = firefoxlower.indexOf(key);
				eval("document.querySelector(\""+elem+"\").style.Moz"+firefox[index]+"=\""+styles[key]+"\"");
			}
			else if (key.toLocaleLowerCase() in chromelower) {
				let index = chromelower.indexOf(key);
				eval("document.querySelector(\""+elem+"\").style.webkit"+chrome[index]+"=\""+styles[key]+"\"");
			}
			else if (key.toLocaleLowerCase() in IElower) {
				let index = IElower.indexOf(key);
				eval("document.querySelector(\""+elem+"\").style.ms"+IE[index]+"=\""+styles[key]+"\"");
			}
			eval("document.querySelector(\""+elem+"\").style."+key+"=\""+styles[key]+"\"");
		}
	};
}