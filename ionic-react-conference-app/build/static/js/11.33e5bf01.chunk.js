/*! For license information please see 11.33e5bf01.chunk.js.LICENSE.txt */
(this["webpackJsonpionic-react-conference-app"]=this["webpackJsonpionic-react-conference-app"]||[]).push([[11,34,55,56,57],{135:function(t,e,n){"use strict";n.r(e),n.d(e,"ion_reorder",(function(){return a})),n.d(e,"ion_reorder_group",(function(){return u}));var o=n(15),i=n(33),r=n(89),s=n(28),l=n(88),c=n(90),a=(n(22),n(87),function(){function t(t){Object(i.r)(this,t)}return t.prototype.onClick=function(t){var e=this.el.closest("ion-reorder-group");t.preventDefault(),e&&e.disabled||t.stopImmediatePropagation()},t.prototype.render=function(){var t=Object(s.b)(this),e="ios"===t?r.r:r.h;return Object(i.h)(i.H,{class:t},Object(i.h)("slot",null,Object(i.h)("ion-icon",{icon:e,lazy:!1,class:"reorder-icon",part:"icon"})))},Object.defineProperty(t.prototype,"el",{get:function(){return Object(i.i)(this)},enumerable:!1,configurable:!0}),t}());a.style={ios:":host([slot]){display:none;line-height:0;z-index:100}.reorder-icon{display:block;font-size:22px}.reorder-icon{font-size:34px;opacity:0.4}",md:":host([slot]){display:none;line-height:0;z-index:100}.reorder-icon{display:block;font-size:22px}.reorder-icon{font-size:31px;opacity:0.3}"};var u=function(){function t(t){Object(i.r)(this,t),this.ionItemReorder=Object(i.e)(this,"ionItemReorder",7),this.lastToIndex=-1,this.cachedHeights=[],this.scrollElTop=0,this.scrollElBottom=0,this.scrollElInitial=0,this.containerTop=0,this.containerBottom=0,this.state=0,this.disabled=!0}return t.prototype.disabledChanged=function(){this.gesture&&this.gesture.enable(!this.disabled)},t.prototype.connectedCallback=function(){return Object(o.a)(this,void 0,void 0,(function(){var t,e,i,r=this;return Object(o.c)(this,(function(o){switch(o.label){case 0:return(t=Object(l.f)(this.el))?(e=this,[4,Object(l.g)(t)]):[3,2];case 1:e.scrollEl=o.sent(),o.label=2;case 2:return i=this,[4,Promise.resolve().then(n.bind(null,53))];case 3:return i.gesture=o.sent().createGesture({el:this.el,gestureName:"reorder",gesturePriority:110,threshold:0,direction:"y",passive:!1,canStart:function(t){return r.canStart(t)},onStart:function(t){return r.onStart(t)},onMove:function(t){return r.onMove(t)},onEnd:function(){return r.onEnd()}}),this.disabledChanged(),[2]}}))}))},t.prototype.disconnectedCallback=function(){this.onEnd(),this.gesture&&(this.gesture.destroy(),this.gesture=void 0)},t.prototype.complete=function(t){return Promise.resolve(this.completeSync(t))},t.prototype.canStart=function(t){if(this.selectedItemEl||0!==this.state)return!1;var e=t.event.target.closest("ion-reorder");if(!e)return!1;var n=h(e,this.el);return!!n&&(t.data=n,!0)},t.prototype.onStart=function(t){t.event.preventDefault();var e=this.selectedItemEl=t.data,n=this.cachedHeights;n.length=0;var o=this.el,i=o.children;if(i&&0!==i.length){for(var r=0,s=0;s<i.length;s++){var l=i[s];r+=l.offsetHeight,n.push(r),l.$ionIndex=s}var a=o.getBoundingClientRect();if(this.containerTop=a.top,this.containerBottom=a.bottom,this.scrollEl){var u=this.scrollEl.getBoundingClientRect();this.scrollElInitial=this.scrollEl.scrollTop,this.scrollElTop=u.top+g,this.scrollElBottom=u.bottom-g}else this.scrollElInitial=0,this.scrollElTop=0,this.scrollElBottom=0;this.lastToIndex=d(e),this.selectedItemHeight=e.offsetHeight,this.state=1,e.classList.add(v),Object(c.a)()}},t.prototype.onMove=function(t){var e=this.selectedItemEl;if(e){var n=this.autoscroll(t.currentY),o=this.containerTop-n,i=this.containerBottom-n,r=Math.max(o,Math.min(t.currentY,i)),s=n+r-t.startY,l=r-o,a=this.itemIndexForTop(l);if(a!==this.lastToIndex){var u=d(e);this.lastToIndex=a,Object(c.b)(),this.reorderMove(u,a)}e.style.transform="translateY(".concat(s,"px)")}},t.prototype.onEnd=function(){var t=this.selectedItemEl;if(this.state=2,t){var e=this.lastToIndex,n=d(t);e===n?this.completeSync():this.ionItemReorder.emit({from:n,to:e,complete:this.completeSync.bind(this)}),Object(c.h)()}else this.state=0},t.prototype.completeSync=function(t){var e=this.selectedItemEl;if(e&&2===this.state){var n=this.el.children,o=n.length,i=this.lastToIndex,r=d(e);if(i!==r&&(void 0===t||!0===t)){var s=r<i?n[i+1]:n[i];this.el.insertBefore(e,s)}Array.isArray(t)&&(t=p(t,r,i));for(var l=0;l<o;l++)n[l].style.transform="";e.style.transition="",e.classList.remove(v),this.selectedItemEl=void 0,this.state=0}return t},t.prototype.itemIndexForTop=function(t){for(var e=this.cachedHeights,n=0;n<e.length;n++)if(e[n]>t)return n;return e.length-1},t.prototype.reorderMove=function(t,e){for(var n=this.selectedItemHeight,o=this.el.children,i=0;i<o.length;i++){var r=o[i].style,s="";i>t&&i<=e?s="translateY(".concat(-n,"px)"):i<t&&i>=e&&(s="translateY(".concat(n,"px)")),r.transform=s}},t.prototype.autoscroll=function(t){if(!this.scrollEl)return 0;var e=0;return t<this.scrollElTop?e=-f:t>this.scrollElBottom&&(e=f),0!==e&&this.scrollEl.scrollBy(0,e),this.scrollEl.scrollTop-this.scrollElInitial},t.prototype.render=function(){var t,e=Object(s.b)(this);return Object(i.h)(i.H,{class:(t={},t[e]=!0,t["reorder-enabled"]=!this.disabled,t["reorder-list-active"]=0!==this.state,t)})},Object.defineProperty(t.prototype,"el",{get:function(){return Object(i.i)(this)},enumerable:!1,configurable:!0}),Object.defineProperty(t,"watchers",{get:function(){return{disabled:["disabledChanged"]}},enumerable:!1,configurable:!0}),t}(),d=function(t){return t.$ionIndex},h=function(t,e){for(var n;t;){if((n=t.parentElement)===e)return t;t=n}},g=60,f=10,v="reorder-selected",p=function(t,e,n){var o=t[e];return t.splice(e,1),t.splice(n,0,o),t.slice()};u.style=".reorder-list-active>*{-webkit-transition:-webkit-transform 300ms;transition:-webkit-transform 300ms;transition:transform 300ms;transition:transform 300ms, -webkit-transform 300ms;will-change:transform}.reorder-enabled{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.reorder-enabled ion-reorder{display:block;cursor:-webkit-grab;cursor:grab;pointer-events:all;-ms-touch-action:none;touch-action:none}.reorder-selected,.reorder-selected ion-reorder{cursor:-webkit-grabbing;cursor:grabbing}.reorder-selected{position:relative;-webkit-transition:none !important;transition:none !important;-webkit-box-shadow:0 0 10px rgba(0, 0, 0, 0.4);box-shadow:0 0 10px rgba(0, 0, 0, 0.4);opacity:0.8;z-index:100}.reorder-visible ion-reorder .reorder-icon{-webkit-transform:translate3d(0,  0,  0);transform:translate3d(0,  0,  0)}"},87:function(t,e,n){"use strict";n.r(e),n.d(e,"a",(function(){return s})),n.d(e,"b",(function(){return r})),n.d(e,"p",(function(){return i}));var o=n(15),i=function(t){return console.warn("[Ionic Warning]: ".concat(t))},r=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];return console.error.apply(console,Object(o.d)(["[Ionic Error]: ".concat(t)],e,!1))},s=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];return console.error("<".concat(t.tagName.toLowerCase(),"> must be used inside ").concat(e.join(" or "),"."))}},88:function(t,e,n){"use strict";n.r(e),n.d(e,"I",(function(){return s})),n.d(e,"a",(function(){return d})),n.d(e,"b",(function(){return l})),n.d(e,"c",(function(){return f})),n.d(e,"d",(function(){return p})),n.d(e,"f",(function(){return h})),n.d(e,"g",(function(){return u})),n.d(e,"i",(function(){return a})),n.d(e,"p",(function(){return v})),n.d(e,"r",(function(){return m})),n.d(e,"s",(function(){return g}));var o=n(15),i=n(22),r=n(87),s="ion-content",l=".ion-content-scroll-host",c="".concat(s,", ").concat(l),a=function(t){return t&&"ION-CONTENT"===t.tagName},u=function(t){return Object(o.a)(void 0,void 0,void 0,(function(){return Object(o.c)(this,(function(e){switch(e.label){case 0:return a(t)?[4,new Promise((function(e){return Object(i.c)(t,e)}))]:[3,2];case 1:return e.sent(),[2,t.getScrollElement()];case 2:return[2,t]}}))}))},d=function(t){var e=t.querySelector(l);return e||t.querySelector(c)},h=function(t){return t.closest(c)},g=function(t,e){return a(t)?t.scrollToTop(e):Promise.resolve(t.scrollTo({top:0,left:0,behavior:e>0?"smooth":"auto"}))},f=function(t,e,n,o){return a(t)?t.scrollByPoint(e,n,o):Promise.resolve(t.scrollBy({top:n,left:e,behavior:o>0?"smooth":"auto"}))},v=function(t){return Object(r.a)(t,s)},p=function(t){if(a(t)){var e=t,n=e.scrollY;return e.scrollY=!1,n}return t.style.setProperty("overflow","hidden"),!0},m=function(t,e){a(t)?t.scrollY=e:t.style.removeProperty("overflow")}},89:function(t,e,n){"use strict";n.r(e),n.d(e,"a",(function(){return o})),n.d(e,"b",(function(){return g})),n.d(e,"c",(function(){return c})),n.d(e,"d",(function(){return f})),n.d(e,"e",(function(){return y})),n.d(e,"f",(function(){return r})),n.d(e,"g",(function(){return i})),n.d(e,"h",(function(){return b})),n.d(e,"i",(function(){return a})),n.d(e,"j",(function(){return d})),n.d(e,"k",(function(){return v})),n.d(e,"l",(function(){return u})),n.d(e,"m",(function(){return l})),n.d(e,"n",(function(){return s})),n.d(e,"o",(function(){return h})),n.d(e,"p",(function(){return p})),n.d(e,"q",(function(){return m})),n.d(e,"r",(function(){return w})),n.d(e,"s",(function(){return x}));var o="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Arrow Back</title><path stroke-linecap='square' stroke-miterlimit='10' stroke-width='48' d='M244 400L100 256l144-144M120 256h292' class='ionicon-fill-none'/></svg>",i="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Arrow Down</title><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 268l144 144 144-144M256 392V100' class='ionicon-fill-none'/></svg>",r="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Caret Back</title><path d='M368 64L144 256l224 192V64z'/></svg>",s="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Caret Down</title><path d='M64 144l192 224 192-224H64z'/></svg>",l="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Caret Up</title><path d='M448 368L256 144 64 368h384z'/></svg>",c="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Chevron Back</title><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M328 112L184 256l144 144' class='ionicon-fill-none'/></svg>",a="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Chevron Down</title><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144' class='ionicon-fill-none'/></svg>",u="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Chevron Forward</title><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M184 112l144 144-144 144' class='ionicon-fill-none'/></svg>",d="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Chevron Forward</title><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M184 112l144 144-144 144' class='ionicon-fill-none'/></svg>",h="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Close</title><path d='M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z'/></svg>",g="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Close Circle</title><path d='M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm75.31 260.69a16 16 0 11-22.62 22.62L256 278.63l-52.69 52.68a16 16 0 01-22.62-22.62L233.37 256l-52.68-52.69a16 16 0 0122.62-22.62L256 233.37l52.69-52.68a16 16 0 0122.62 22.62L278.63 256z'/></svg>",f="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Close</title><path d='M400 145.49L366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49z'/></svg>",v="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Ellipsis Horizontal</title><circle cx='256' cy='256' r='48'/><circle cx='416' cy='256' r='48'/><circle cx='96' cy='256' r='48'/></svg>",p="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Menu</title><path stroke-linecap='round' stroke-miterlimit='10' d='M80 160h352M80 256h352M80 352h352' class='ionicon-fill-none ionicon-stroke-width'/></svg>",m="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Menu</title><path d='M64 384h384v-42.67H64zm0-106.67h384v-42.66H64zM64 128v42.67h384V128z'/></svg>",w="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Reorder Three</title><path stroke-linecap='round' stroke-linejoin='round' d='M96 256h320M96 176h320M96 336h320' class='ionicon-fill-none ionicon-stroke-width'/></svg>",b="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Reorder Two</title><path stroke-linecap='square' stroke-linejoin='round' stroke-width='44' d='M118 304h276M118 208h276' class='ionicon-fill-none'/></svg>",x="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Search</title><path d='M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z' stroke-miterlimit='10' class='ionicon-fill-none ionicon-stroke-width'/><path stroke-linecap='round' stroke-miterlimit='10' d='M338.29 338.29L448 448' class='ionicon-fill-none ionicon-stroke-width'/></svg>",y="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Search</title><path d='M464 428L339.92 303.9a160.48 160.48 0 0030.72-94.58C370.64 120.37 298.27 48 209.32 48S48 120.37 48 209.32s72.37 161.32 161.32 161.32a160.48 160.48 0 0094.58-30.72L428 464zM209.32 319.69a110.38 110.38 0 11110.37-110.37 110.5 110.5 0 01-110.37 110.37z'/></svg>"},90:function(t,e,n){"use strict";n.r(e),n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return s})),n.d(e,"c",(function(){return i})),n.d(e,"d",(function(){return c})),n.d(e,"h",(function(){return l}));var o={getEngine:function(){var t,e=window;return e.TapticEngine||(null===(t=e.Capacitor)||void 0===t?void 0:t.isPluginAvailable("Haptics"))&&e.Capacitor.Plugins.Haptics},available:function(){return!!this.getEngine()},isCordova:function(){return!!window.TapticEngine},isCapacitor:function(){return!!window.Capacitor},impact:function(t){var e=this.getEngine();if(e){var n=this.isCapacitor()?t.style.toUpperCase():t.style;e.impact({style:n})}},notification:function(t){var e=this.getEngine();if(e){var n=this.isCapacitor()?t.style.toUpperCase():t.style;e.notification({style:n})}},selection:function(){this.impact({style:"light"})},selectionStart:function(){var t=this.getEngine();t&&(this.isCapacitor()?t.selectionStart():t.gestureSelectionStart())},selectionChanged:function(){var t=this.getEngine();t&&(this.isCapacitor()?t.selectionChanged():t.gestureSelectionChanged())},selectionEnd:function(){var t=this.getEngine();t&&(this.isCapacitor()?t.selectionEnd():t.gestureSelectionEnd())}},i=function(){o.selection()},r=function(){o.selectionStart()},s=function(){o.selectionChanged()},l=function(){o.selectionEnd()},c=function(t){o.impact(t)}}}]);
//# sourceMappingURL=11.33e5bf01.chunk.js.map