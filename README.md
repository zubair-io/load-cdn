load-cdn
========

Load Script over CDN then uses MD5 to validate it.

Usage:
```javascript

var scriptUrl = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js';

var scriptHash = 'd021c983bd6e7291b43a5cc1fb2ebe99';

loadScript(scriptUrl, scriptHash, function(er){
  console.log("Load Jquery")

})
```


To Do
--------
  * Support more then one script at a time
  * Add fallback script
