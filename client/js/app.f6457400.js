(function(e){function t(t){for(var c,r,o=t[0],i=t[1],l=t[2],f=0,b=[];f<o.length;f++)r=o[f],Object.prototype.hasOwnProperty.call(a,r)&&a[r]&&b.push(a[r][0]),a[r]=0;for(c in i)Object.prototype.hasOwnProperty.call(i,c)&&(e[c]=i[c]);u&&u(t);while(b.length)b.shift()();return s.push.apply(s,l||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],c=!0,o=1;o<n.length;o++){var i=n[o];0!==a[i]&&(c=!1)}c&&(s.splice(t--,1),e=r(r.s=n[0]))}return e}var c={},a={app:0},s=[];function r(t){if(c[t])return c[t].exports;var n=c[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=c,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)r.d(n,c,function(t){return e[t]}.bind(null,c));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],i=o.push.bind(o);o.push=t,o=o.slice();for(var l=0;l<o.length;l++)t(o[l]);var u=i;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"0418":function(e,t,n){"use strict";var c=n("7a23"),a=Object(c["p"])("data-v-14a12788");Object(c["h"])("data-v-14a12788");var s={class:"header"},r=Object(c["e"])("div",{class:"goTo"},[Object(c["e"])("p",null,"Meine Auswahl"),Object(c["e"])("p",null,"Suche"),Object(c["e"])("p",null,"Genres")],-1),o={class:"userMenu"},i=Object(c["e"])("p",null,"Profile",-1);Object(c["g"])();var l=a((function(e,t,n,a,l,u){return Object(c["f"])(),Object(c["c"])("div",s,[r,Object(c["e"])("div",o,[i,Object(c["e"])("p",{onClick:t[1]||(t[1]=function(e){return a.logOut()})},"Logout")])])})),u=n("ac3c");n("3445");u["a"].render=l,u["a"].__scopeId="data-v-14a12788";t["a"]=u["a"]},"09a9":function(e,t,n){},"22ac":function(e,t,n){"use strict";n("69c0")},"2d80":function(e,t,n){},3445:function(e,t,n){"use strict";n("c864")},"527a":function(e,t,n){"use strict";(function(e){n("d3b7"),n("ac1f"),n("25f0"),n("5319"),n("1276");var c=n("0418"),a=n("cccf"),s=n("f154"),r=n("c106"),o=n("578a"),i=n("54c5"),l=n("7a23");t["a"]={name:"App",components:{Login:o["a"],Header:c["a"],Player:a["a"],Selection:i["a"],Search:r["a"],Genres:s["a"]},setup:function(){var t=Object(l["i"])({value:""}),n=Object(l["i"])({status:localStorage.jwt});function c(e){t.value=e}function a(t){var n=t.replace(/-/g,"+").replace(/_/g,"/").split(".")[1];return n=JSON.parse(e.from(n,"base64").toString()),n}function s(e){if(e){n.status=!0;var t=a(e);console.log(t)}}return{showID:t,openPlayer:c,loggedin:s,isLoggedIn:n}}}}).call(this,n("b639").Buffer)},"52a8":function(e,t,n){"use strict";n("5dbc")},"54c5":function(e,t,n){"use strict";var c=n("7a23"),a=Object(c["p"])("data-v-2ecf4d8a");Object(c["h"])("data-v-2ecf4d8a");var s={class:"selection"},r={key:0,class:"selectionWatched"},o=Object(c["e"])("h2",null,"Kürzlich angesehen",-1),i={class:"showWrapper"},l={class:"overview"},u={class:"showTitle"},f={key:1,class:"selectionList"},b=Object(c["e"])("h2",null,"Meine Liste",-1),d={class:"showWrapper"},j={class:"overview"},O={class:"showTitle"};Object(c["g"])();var p=a((function(e,t,n,a,p,h){return Object(c["f"])(),Object(c["c"])("div",s,[0!=a.data.watched.length?(Object(c["f"])(),Object(c["c"])("div",r,[o,Object(c["e"])("p",{class:"swipeRight",onClick:t[1]||(t[1]=function(){return h.swipe.apply(h,arguments)})},">"),Object(c["e"])("p",{class:"swipeLeft",onClick:t[2]||(t[2]=function(){return h.swipe.apply(h,arguments)})},"<"),Object(c["e"])("div",i,[(Object(c["f"])(!0),Object(c["c"])(c["a"],null,Object(c["j"])(a.data.watched,(function(e){return Object(c["f"])(),Object(c["c"])("div",{class:"show",key:e.ID,id:e.ID,onClick:t[3]||(t[3]=function(e){return a.openShow()})},[Object(c["e"])("img",{src:e.cover,alt:e.title,onerror:"this.onerror=null;this.src='https://lh3.googleusercontent.com/proxy/M6EzbRlGY17V5U8_3ijVqh2Z8GwzUl4W62HZ6jYbEFsQWlr1GGC8CofYPrsmVcYawFGjb4xPHsCqIxBOIRHP0Oltu3a0GRuMU_HghMFMfVJ9mBKjwuS6QFtwwRrkYgdyWYAM3Q';"},null,8,["src","alt"]),Object(c["e"])("div",l,[Object(c["e"])("p",u,Object(c["l"])(e.title),1),(Object(c["f"])(!0),Object(c["c"])(c["a"],null,Object(c["j"])(e.genres,(function(e){return Object(c["f"])(),Object(c["c"])("div",{class:"showTag",key:e},[Object(c["e"])("p",null,Object(c["l"])(e),1)])})),128))])],8,["id"])})),128))])])):Object(c["d"])("",!0),0!=a.data.list.length?(Object(c["f"])(),Object(c["c"])("div",f,[b,Object(c["e"])("p",{class:"swipeRight",onClick:t[4]||(t[4]=function(){return h.swipe.apply(h,arguments)})},">"),Object(c["e"])("p",{class:"swipeLeft",onClick:t[5]||(t[5]=function(){return h.swipe.apply(h,arguments)})},"<"),Object(c["e"])("div",d,[(Object(c["f"])(!0),Object(c["c"])(c["a"],null,Object(c["j"])(a.data.list,(function(e){return Object(c["f"])(),Object(c["c"])("div",{class:"show",key:e.ID,id:e.ID,onClick:t[6]||(t[6]=function(e){return a.openShow()})},[Object(c["e"])("img",{src:e.cover,alt:e.title,onerror:"this.onerror=null;this.src='https://lh3.googleusercontent.com/proxy/M6EzbRlGY17V5U8_3ijVqh2Z8GwzUl4W62HZ6jYbEFsQWlr1GGC8CofYPrsmVcYawFGjb4xPHsCqIxBOIRHP0Oltu3a0GRuMU_HghMFMfVJ9mBKjwuS6QFtwwRrkYgdyWYAM3Q';"},null,8,["src","alt"]),Object(c["e"])("div",j,[Object(c["e"])("p",O,Object(c["l"])(e.title),1),(Object(c["f"])(!0),Object(c["c"])(c["a"],null,Object(c["j"])(e.genres,(function(e){return Object(c["f"])(),Object(c["c"])("div",{class:"showTag",key:e},[Object(c["e"])("p",null,Object(c["l"])(e),1)])})),128))])],8,["id"])})),128))])])):Object(c["d"])("",!0)])})),h=n("6612");n("90f5");h["a"].render=p,h["a"].__scopeId="data-v-2ecf4d8a";t["a"]=h["a"]},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var c=n("7a23"),a=Object(c["e"])("head",null,[Object(c["e"])("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),Object(c["e"])("meta",{"http-equiv":"Cache-control",content:"no-cache"}),Object(c["e"])("meta",{"http-equiv":"Expires",content:"-1"})],-1);function s(e,t,n,s,r,o){var i=Object(c["k"])("Login"),l=Object(c["k"])("Header"),u=Object(c["k"])("Search"),f=Object(c["k"])("Selection"),b=Object(c["k"])("Player"),d=Object(c["k"])("Genres");return Object(c["f"])(),Object(c["c"])(c["a"],null,[a,s.isLoggedIn.status?Object(c["d"])("",!0):(Object(c["f"])(),Object(c["c"])(i,{key:0,onLoggedin:t[1]||(t[1]=function(e){return s.loggedin(e)})})),s.isLoggedIn.status?(Object(c["f"])(),Object(c["c"])(l,{key:1})):Object(c["d"])("",!0),s.isLoggedIn.status?(Object(c["f"])(),Object(c["c"])(u,{key:2,onNewshow:t[2]||(t[2]=function(e){return s.openPlayer(e)})})):Object(c["d"])("",!0),s.isLoggedIn.status?(Object(c["f"])(),Object(c["c"])(f,{key:3,onNewshow:t[3]||(t[3]=function(e){return s.openPlayer(e)})})):Object(c["d"])("",!0),s.isLoggedIn.status?(Object(c["f"])(),Object(c["c"])(b,{key:4,showID:s.showID},null,8,["showID"])):Object(c["d"])("",!0),s.isLoggedIn.status?(Object(c["f"])(),Object(c["c"])(d,{key:5,onNewshow:t[4]||(t[4]=function(e){return s.openPlayer(e)})})):Object(c["d"])("",!0)],64)}var r=n("527a");n("22ac");r["a"].render=s;var o=r["a"];Object(c["b"])(o).mount("#app")},"578a":function(e,t,n){"use strict";var c=n("7a23"),a=Object(c["p"])("data-v-2ec3ac04");Object(c["h"])("data-v-2ec3ac04");var s={class:"loginWrapper"},r={class:"login"},o=Object(c["e"])("h1",null,"Login",-1),i=Object(c["e"])("br",null,null,-1);Object(c["g"])();var l=a((function(e,t,n,a,l,u){return Object(c["f"])(),Object(c["c"])("div",s,[Object(c["e"])("div",r,[o,i,Object(c["o"])(Object(c["e"])("input",{type:"text",id:"name","onUpdate:modelValue":t[1]||(t[1]=function(e){return a.loginData.username=e}),placeholder:"Benutzername..."},null,512),[[c["m"],a.loginData.username]]),Object(c["o"])(Object(c["e"])("input",{type:"password",id:"pw","onUpdate:modelValue":t[2]||(t[2]=function(e){return a.loginData.password=e}),placeholder:"Passwort..."},null,512),[[c["m"],a.loginData.password]]),Object(c["e"])("button",{onClick:t[3]||(t[3]=function(e){return a.login()})},"Anmelden")])])})),u=(n("d3b7"),n("96cf"),n("1da1")),f={name:"Login",setup:function(e,t){var n="http://bstoapp.staging.it-tf.ch/",a=Object(c["i"])({username:"",password:""});function s(){return r.apply(this,arguments)}function r(){return r=Object(u["a"])(regeneratorRuntime.mark((function e(){var c,s,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log(a),c={headers:{"Content-Type":"application/json"},method:"POST",body:JSON.stringify(a)},e.next=4,fetch(n+"login",c);case 4:return s=e.sent,e.next=7,s.json();case 7:r=e.sent,localStorage.setItem("jwt",r),t.emit("loggedin",r);case 10:case"end":return e.stop()}}),e)}))),r.apply(this,arguments)}return{loginData:a,login:s}}};n("e965");f.render=l,f.__scopeId="data-v-2ec3ac04";t["a"]=f},"5dbc":function(e,t,n){},6612:function(e,t,n){"use strict";(function(e){n("a9e3"),n("d3b7"),n("ac1f"),n("25f0"),n("5319"),n("1276"),n("96cf");var c=n("1da1"),a=n("7a23");t["a"]={name:"Selection",setup:function(t,n){var s=Object(a["i"])({watched:[],list:[]}),r="http://bstoapp.staging.it-tf.ch/api/";function o(){return i.apply(this,arguments)}function i(){return i=Object(c["a"])(regeneratorRuntime.mark((function e(){var t,n,c,a,o,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=localStorage.jwt,n=f(t),e.next=4,fetch(r+"shows/latest/".concat(n.id));case 4:return c=e.sent,e.next=7,c.json();case 7:return a=e.sent,s.watched=a,e.next=11,fetch(r+"shows/list/".concat(n.id));case 11:return o=e.sent,e.next=14,o.json();case 14:i=e.sent,s.list=i,console.log(s);case 17:case"end":return e.stop()}}),e)}))),i.apply(this,arguments)}function l(){var e=event.target;while(""==e.id)e=e.parentElement;u(e.id),console.log(e.id),n.emit("newshow",e.id)}function u(e){var t=localStorage.jwt,n=f(t),c={headers:{"Content-Type":"application/json"},method:"POST",body:JSON.stringify({UID:n.id,SID:Number(e)})};fetch(r+"shows/latest/add",c).then((function(e){console.log(e)}))}function f(t){var n=t.replace(/-/g,"+").replace(/_/g,"/").split(".")[1];return n=JSON.parse(e.from(n,"base64").toString()),n}return o(),{data:s,openShow:l}},methods:{swipe:function(e){var t=e.target.parentElement.childNodes[3],n=e.target,c=0;c="&lt;"==n.innerHTML?t.scrollLeft-t.offsetWidth:t.scrollLeft+t.offsetWidth;var a={top:0,left:c,behavior:"smooth"};t.scroll(a)}}}}).call(this,n("b639").Buffer)},"69c0":function(e,t,n){},"71bf":function(e,t,n){"use strict";n("946e")},"90f5":function(e,t,n){"use strict";n("09a9")},"946e":function(e,t,n){},"950c":function(e,t,n){"use strict";(function(e){n("a9e3"),n("d3b7"),n("ac1f"),n("25f0"),n("5319"),n("1276"),n("96cf");var c=n("1da1"),a=n("7a23");t["a"]={name:"Search",setup:function(t,n){var s="http://bstoapp.staging.it-tf.ch/api/",r=Object(a["i"])({results:[]});function o(e){return new Promise((function(t){return setTimeout(t,e)}))}function i(){return l.apply(this,arguments)}function l(){return l=Object(c["a"])(regeneratorRuntime.mark((function e(){var t,n,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o(100);case 2:if(t=document.getElementById("queryInput").value,""==t){e.next=13;break}return e.next=6,fetch(s+"search/".concat(t));case 6:return n=e.sent,e.next=9,n.json();case 9:c=e.sent,document.getElementById("queryInput").value==c.query&&(r.results=c.results),e.next=14;break;case 13:r.results=[];case 14:case"end":return e.stop()}}),e)}))),l.apply(this,arguments)}function u(){var e=event.target;while(""==e.id)e=e.parentElement;f(e.id),n.emit("newshow",e.id)}function f(e){var t=localStorage.jwt,n=b(t),c={headers:{"Content-Type":"application/json"},method:"POST",body:JSON.stringify({UID:n.id,SID:Number(e)})};fetch(s+"shows/latest/add",c).then((function(e){console.log(e)}))}function b(t){var n=t.replace(/-/g,"+").replace(/_/g,"/").split(".")[1];return n=JSON.parse(e.from(n,"base64").toString()),n}return{requestResults:i,data:r,openShow:u}}}}).call(this,n("b639").Buffer)},"97b4":function(e,t,n){},ac3c:function(e,t,n){"use strict";(function(e){n("d3b7"),n("ac1f"),n("25f0"),n("5319"),n("1276");t["a"]={name:"Header",setup:function(){function t(){var e=n(localStorage.jwt);console.log(e),localStorage.removeItem("jwt"),location.reload()}function n(t){var n=t.replace(/-/g,"+").replace(/_/g,"/").split(".")[1];return console.log(n),n=JSON.parse(e.from(n,"base64").toString()),console.log(n),n}return document.addEventListener("scroll",(function(){var e=document.getElementsByClassName("header")[0];window.pageYOffset>0?e.classList.add("headerFloat"):e.classList.remove("headerFloat")})),{logOut:t}}}}).call(this,n("b639").Buffer)},c106:function(e,t,n){"use strict";var c=n("7a23"),a=Object(c["p"])("data-v-72de3e21");Object(c["h"])("data-v-72de3e21");var s={class:"search"},r={class:"searchbar"},o={class:"results"},i={class:"overview"},l={class:"showTitle"};Object(c["g"])();var u=a((function(e,t,n,a,u,f){return Object(c["f"])(),Object(c["c"])("div",s,[Object(c["e"])("div",r,[Object(c["e"])("input",{type:"text",class:"SearchInput",onKeydown:t[1]||(t[1]=function(e){return a.requestResults()}),id:"queryInput",placeholder:"Suche..."},null,32)]),Object(c["e"])("div",o,[(Object(c["f"])(!0),Object(c["c"])(c["a"],null,Object(c["j"])(a.data.results,(function(e){return Object(c["f"])(),Object(c["c"])("div",{class:"show",key:e.length,onClick:t[2]||(t[2]=function(e){return a.openShow()}),id:e.ID},[Object(c["e"])("img",{src:e.cover,alt:e.title,onerror:"this.onerror=null;this.src='https://lh3.googleusercontent.com/proxy/M6EzbRlGY17V5U8_3ijVqh2Z8GwzUl4W62HZ6jYbEFsQWlr1GGC8CofYPrsmVcYawFGjb4xPHsCqIxBOIRHP0Oltu3a0GRuMU_HghMFMfVJ9mBKjwuS6QFtwwRrkYgdyWYAM3Q';"},null,8,["src","alt"]),Object(c["e"])("div",i,[Object(c["e"])("p",l,Object(c["l"])(e.title),1),(Object(c["f"])(!0),Object(c["c"])(c["a"],null,Object(c["j"])(e.genres,(function(e){return Object(c["f"])(),Object(c["c"])("div",{class:"showTag",key:e},[Object(c["e"])("p",null,Object(c["l"])(e),1)])})),128))])],8,["id"])})),128))])])})),f=n("950c");n("52a8");f["a"].render=u,f["a"].__scopeId="data-v-72de3e21";t["a"]=f["a"]},c864:function(e,t,n){},cccf:function(e,t,n){"use strict";var c=n("7a23"),a=Object(c["p"])("data-v-26ca0fe6");Object(c["h"])("data-v-26ca0fe6");var s=Object(c["e"])("div",{class:"loader"},[Object(c["e"])("h3",null,"Lade Episoden..."),Object(c["e"])("i",{class:"gg-spinner-alt"})],-1),r={class:"player"},o={class:"left"},i={class:"media"},l={key:0,class:"info"},u={class:"showTitle"},f={class:"year"},b={key:0},d={class:"genres"},j={key:0,class:"gg-play-list-add"},O={key:1,class:"gg-play-list-check"},p={class:"description"},h={key:0,class:"actors"},g=Object(c["e"])("h3",null,"Schauspieler:",-1),v={key:1,class:"directors"},w=Object(c["e"])("h3",null,"Regisseure:",-1),m={key:2,class:"producers"},y=Object(c["e"])("h3",null,"Produzenten:",-1),k={key:3,class:"authors"},S=Object(c["e"])("h3",null,"Autoren:",-1),x={class:"episodes"},I={class:"selectSeason"},C={class:"seasons"};Object(c["g"])();var P=a((function(e,t,n,a,P,R){return Object(c["f"])(),Object(c["c"])("div",{class:"playerContainer",onClick:t[2]||(t[2]=function(e){return a.closePlayer()})},[s,Object(c["e"])("div",r,[Object(c["e"])("div",o,[Object(c["e"])("div",i,[Object(c["e"])("iframe",{id:"mediaFrame",src:a.player.source,allowfullscreen:"",frameborder:"0",scrolling:"no",sandbox:"allow-scripts allow-forms allow-same-origin"},null,8,["src"])]),void 0!=a.data.show.info?(Object(c["f"])(),Object(c["c"])("div",l,[Object(c["e"])("h1",u,Object(c["l"])(a.data.show.info.title),1),Object(c["e"])("div",f,[Object(c["e"])("p",null,Object(c["l"])(a.data.show.info.fromYear),1),0!=a.data.show.info.toYear?(Object(c["f"])(),Object(c["c"])("p",b," - "+Object(c["l"])(a.data.show.info.toYear),1)):Object(c["d"])("",!0)]),Object(c["e"])("div",d,[(Object(c["f"])(!0),Object(c["c"])(c["a"],null,Object(c["j"])(a.data.show.info.genres,(function(e){return Object(c["f"])(),Object(c["c"])("div",{class:"genreTag",key:e},[Object(c["e"])("p",null,Object(c["l"])(e),1)])})),128))]),Object(c["e"])("div",{class:"addWatchlist",onClick:t[1]||(t[1]=function(e){return a.addPlaylist()})},[a.data.show.info.inWatchlist?Object(c["d"])("",!0):(Object(c["f"])(),Object(c["c"])("i",j)),a.data.show.info.inWatchlist?(Object(c["f"])(),Object(c["c"])("i",O)):Object(c["d"])("",!0)]),Object(c["e"])("p",p,Object(c["l"])(a.data.show.info.desc),1),"undefined"!=a.data.show.info.actors[0]?(Object(c["f"])(),Object(c["c"])("div",h,[g,(Object(c["f"])(!0),Object(c["c"])(c["a"],null,Object(c["j"])(a.data.show.info.actors,(function(e){return Object(c["f"])(),Object(c["c"])("div",{class:"infoTag",key:e},[Object(c["e"])("p",null,Object(c["l"])(e),1)])})),128))])):Object(c["d"])("",!0),"undefined"!=a.data.show.info.directors[0]?(Object(c["f"])(),Object(c["c"])("div",v,[w,(Object(c["f"])(!0),Object(c["c"])(c["a"],null,Object(c["j"])(a.data.show.info.directors,(function(e){return Object(c["f"])(),Object(c["c"])("div",{class:"infoTag",key:e},[Object(c["e"])("p",null,Object(c["l"])(e),1)])})),128))])):Object(c["d"])("",!0),"undefined"!=a.data.show.info.producers[0]?(Object(c["f"])(),Object(c["c"])("div",m,[y,(Object(c["f"])(!0),Object(c["c"])(c["a"],null,Object(c["j"])(a.data.show.info.producers,(function(e){return Object(c["f"])(),Object(c["c"])("div",{class:"infoTag",key:e},[Object(c["e"])("p",null,Object(c["l"])(e),1)])})),128))])):Object(c["d"])("",!0),"undefined"!=a.data.show.info.authors[0]?(Object(c["f"])(),Object(c["c"])("div",k,[S,(Object(c["f"])(!0),Object(c["c"])(c["a"],null,Object(c["j"])(a.data.show.info.authors,(function(e){return Object(c["f"])(),Object(c["c"])("div",{class:"infoTag",key:e},[Object(c["e"])("p",null,Object(c["l"])(e),1)])})),128))])):Object(c["d"])("",!0)])):Object(c["d"])("",!0)]),Object(c["e"])("div",x,[Object(c["e"])("div",I,[Object(c["e"])("select",null,[(Object(c["f"])(!0),Object(c["c"])(c["a"],null,Object(c["j"])(a.data.show.seasons,(function(e){return Object(c["f"])(),Object(c["c"])("option",{key:e},"Staffel "+Object(c["l"])(parseInt(e.index)+1),1)})),128))])]),Object(c["e"])("div",C,[(Object(c["f"])(!0),Object(c["c"])(c["a"],null,Object(c["j"])(a.data.show.seasons,(function(e){return Object(c["f"])(),Object(c["c"])("div",{class:"season",key:e},[Object(c["e"])("h2",null,"Staffel "+Object(c["l"])(parseInt(e.index)+1),1),(Object(c["f"])(!0),Object(c["c"])(c["a"],null,Object(c["j"])(e.episodes,(function(e){return Object(c["f"])(),Object(c["c"])("div",{class:"episode",key:e,onClick:function(t){return a.setMediaSource(e.vivo_link)}},[Object(c["e"])("p",null,Object(c["l"])(e.title),1)],8,["onClick"])})),128))])})),128))])])])])})),R=n("d5e5");n("71bf");R["a"].render=P,R["a"].__scopeId="data-v-26ca0fe6";t["a"]=R["a"]},d5e5:function(e,t,n){"use strict";(function(e){n("99af"),n("a9e3"),n("d3b7"),n("ac1f"),n("25f0"),n("5319"),n("1276"),n("96cf");var c=n("1da1"),a=n("7a23");t["a"]={name:"Player",props:{showID:Object},methods:{},setup:function(t,n){var s=Object(a["i"])({show:{}}),r=Object(a["i"])({value:0}),o=Object(a["i"])({source:""}),i="http://bstoapp.staging.it-tf.ch/api/";function l(){return u.apply(this,arguments)}function u(){return u=Object(c["a"])(regeneratorRuntime.mark((function e(){var n,c,a,l,u,f,d,j,O;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return document.getElementsByClassName("playerContainer")[0].style.display="block",n=localStorage.jwt,c=b(n),e.next=5,fetch(i+"episodes/".concat(t.showID.value,"?UID=").concat(c.id));case 5:return a=e.sent,e.next=8,a.json();case 8:for(f in l=e.sent,console.log(l),u=!1,l.seasons)for(d in l.seasons[f].index=f,l.seasons[f].episodes)l.seasons[f].episodes[d].index=d,0==u&&(u=!0,j=l.seasons[f].episodes[d].vivo_link.split("https://vivo.sx/")[1],o.source="https://vivo.sx/embed/"+j);s.show=l,r.value=0,O=document.getElementById("mediaFrame"),O.addEventListener("load",(function(){document.getElementsByClassName("player")[0].style.display="block",document.getElementsByClassName("loader")[0].style.display="none";var e=event.target.offsetWidth;event.target.style.height=.56*e+"px";var t=document.getElementsByClassName("info")[0];t.style.height=document.getElementsByClassName("player")[0].offsetHeight-.56*e-60+"px"}));case 16:case"end":return e.stop()}}),e)}))),u.apply(this,arguments)}function f(){var e=localStorage.jwt,n=b(e),c={headers:{"Content-Type":"application/json"},method:"POST",body:JSON.stringify({UID:n.id,SID:Number(t.showID.value)})};fetch(i+"shows/list/add",c).then((function(e){console.log(e),l()}))}function b(t){var n=t.replace(/-/g,"+").replace(/_/g,"/").split(".")[1];return n=JSON.parse(e.from(n,"base64").toString()),n}function d(e){var t=e.split("https://vivo.sx/")[1];o.source="https://vivo.sx/embed/"+t}function j(){"playerContainer"==event.target.className&&(s.show={},document.getElementsByClassName("playerContainer")[0].style.display="none",o.source="")}return Object(a["n"])((function(){return t.showID.value}),Object(c["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:l();case 1:case"end":return e.stop()}}),e)})))),{data:s,seasonNr:r,player:o,setMediaSource:d,closePlayer:j,addPlaylist:f}},mounted:function(){}}}).call(this,n("b639").Buffer)},e965:function(e,t,n){"use strict";n("97b4")},ed07:function(e,t,n){"use strict";(function(e){n("a9e3"),n("d3b7"),n("ac1f"),n("25f0"),n("5319"),n("1276"),n("96cf");var c=n("1da1"),a=n("7a23");t["a"]={name:"Genres",setup:function(t,n){var s="http://bstoapp.staging.it-tf.ch/api/",r=Object(a["i"])({genres:{}}),o=Object(a["i"])({value:"ddd"});function i(){return l.apply(this,arguments)}function l(){return l=Object(c["a"])(regeneratorRuntime.mark((function e(){var t,n,c,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,fetch(s+"genres");case 2:return t=e.sent,e.next=5,t.json();case 5:t=e.sent,n=0;case 7:if(!(n<t.length)){e.next=19;break}return c=t[n],e.next=11,fetch(s+"shows/genre/".concat(c));case 11:return a=e.sent,e.next=14,a.json();case 14:r.genres[c]=e.sent,r.genres[c].title=c;case 16:n++,e.next=7;break;case 19:case"end":return e.stop()}}),e)}))),l.apply(this,arguments)}function u(){var e=event.target;while(""==e.id)e=e.parentElement;f(e.id),n.emit("newshow",e.id)}function f(e){var t=localStorage.jwt,n=b(t),c={headers:{"Content-Type":"application/json"},method:"POST",body:JSON.stringify({UID:n.id,SID:Number(e)})};fetch(s+"shows/latest/add",c).then((function(e){console.log(e)}))}function b(t){var n=t.replace(/-/g,"+").replace(/_/g,"/").split(".")[1];return n=JSON.parse(e.from(n,"base64").toString()),n}return i(),{shows:r,showID:o,openShow:u}},methods:{swipe:function(e){var t=e.target.parentElement.childNodes[3],n=e.target,c=0;c="&lt;"==n.innerHTML?t.scrollLeft-t.offsetWidth:t.scrollLeft+t.offsetWidth;var a={top:0,left:c,behavior:"smooth"};t.scroll(a)}}}}).call(this,n("b639").Buffer)},f0dd:function(e,t,n){"use strict";n("2d80")},f154:function(e,t,n){"use strict";var c=n("7a23"),a=Object(c["p"])("data-v-19a90812");Object(c["h"])("data-v-19a90812");var s={class:"genres"},r={class:"genreName"},o={class:"showWrapper"},i={class:"overview"},l={class:"showTitle"};Object(c["g"])();var u=a((function(e,t,n,a,u,f){return Object(c["f"])(),Object(c["c"])("div",s,[(Object(c["f"])(!0),Object(c["c"])(c["a"],null,Object(c["j"])(a.shows.genres,(function(e){return Object(c["f"])(),Object(c["c"])("div",{class:"genre",key:e.length},[Object(c["e"])("h2",r,Object(c["l"])(e.title),1),Object(c["e"])("p",{class:"swipeRight",onClick:t[1]||(t[1]=function(){return f.swipe.apply(f,arguments)})},">"),Object(c["e"])("p",{class:"swipeLeft",onClick:t[2]||(t[2]=function(){return f.swipe.apply(f,arguments)})},"<"),Object(c["e"])("div",o,[(Object(c["f"])(!0),Object(c["c"])(c["a"],null,Object(c["j"])(e,(function(e){return Object(c["f"])(),Object(c["c"])("div",{class:"show",key:e.length,onClick:t[3]||(t[3]=function(e){return a.openShow()}),id:e.SID},[Object(c["e"])("img",{src:e.cover,alt:e.title,onerror:"this.onerror=null;this.src='https://lh3.googleusercontent.com/proxy/M6EzbRlGY17V5U8_3ijVqh2Z8GwzUl4W62HZ6jYbEFsQWlr1GGC8CofYPrsmVcYawFGjb4xPHsCqIxBOIRHP0Oltu3a0GRuMU_HghMFMfVJ9mBKjwuS6QFtwwRrkYgdyWYAM3Q';"},null,8,["src","alt"]),Object(c["e"])("div",i,[Object(c["e"])("p",l,Object(c["l"])(e.title),1),(Object(c["f"])(!0),Object(c["c"])(c["a"],null,Object(c["j"])(e.genres,(function(e){return Object(c["f"])(),Object(c["c"])("div",{class:"showTag",key:e},[Object(c["e"])("p",null,Object(c["l"])(e),1)])})),128))])],8,["id"])})),128))])])})),128))])})),f=n("ed07");n("f0dd");f["a"].render=u,f["a"].__scopeId="data-v-19a90812";t["a"]=f["a"]}});
//# sourceMappingURL=app.f6457400.js.map