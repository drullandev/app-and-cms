(this["webpackJsonpionic-react-conference-app"]=this["webpackJsonpionic-react-conference-app"]||[]).push([[33,54],{145:function(t,e,n){"use strict";n.r(e),n.d(e,"ion_tab",(function(){return c})),n.d(e,"ion_tabs",(function(){return s}));var i=n(15),o=n(33),r=n(92),c=(n(22),function(){function t(t){Object(o.r)(this,t),this.loaded=!1,this.active=!1}return t.prototype.componentWillLoad=function(){return Object(i.a)(this,void 0,void 0,(function(){return Object(i.c)(this,(function(t){switch(t.label){case 0:return this.active?[4,this.setActive()]:[3,2];case 1:t.sent(),t.label=2;case 2:return[2]}}))}))},t.prototype.setActive=function(){return Object(i.a)(this,void 0,void 0,(function(){return Object(i.c)(this,(function(t){switch(t.label){case 0:return[4,this.prepareLazyLoaded()];case 1:return t.sent(),this.active=!0,[2]}}))}))},t.prototype.changeActive=function(t){t&&this.prepareLazyLoaded()},t.prototype.prepareLazyLoaded=function(){if(!this.loaded&&null!=this.component){this.loaded=!0;try{return Object(r.a)(this.delegate,this.el,this.component,["ion-page"])}catch(t){console.error(t)}}return Promise.resolve(void 0)},t.prototype.render=function(){var t=this,e=t.tab,n=t.active,i=t.component;return Object(o.h)(o.H,{role:"tabpanel","aria-hidden":n?null:"true","aria-labelledby":"tab-button-".concat(e),class:{"ion-page":void 0===i,"tab-hidden":!n}},Object(o.h)("slot",null))},Object.defineProperty(t.prototype,"el",{get:function(){return Object(o.i)(this)},enumerable:!1,configurable:!0}),Object.defineProperty(t,"watchers",{get:function(){return{active:["changeActive"]}},enumerable:!1,configurable:!0}),t}());c.style=":host(.tab-hidden){display:none !important}";var s=function(){function t(t){var e=this;Object(o.r)(this,t),this.ionNavWillLoad=Object(o.e)(this,"ionNavWillLoad",7),this.ionTabsWillChange=Object(o.e)(this,"ionTabsWillChange",3),this.ionTabsDidChange=Object(o.e)(this,"ionTabsDidChange",3),this.transitioning=!1,this.useRouter=!1,this.onTabClicked=function(t){var n=t.detail,i=n.href,o=n.tab;if(e.useRouter&&void 0!==i){var r=document.querySelector("ion-router");r&&r.push(i)}else e.select(o)}}return t.prototype.componentWillLoad=function(){return Object(i.a)(this,void 0,void 0,(function(){var t;return Object(i.c)(this,(function(e){switch(e.label){case 0:return this.useRouter||(this.useRouter=!!document.querySelector("ion-router")&&!this.el.closest("[no-router]")),this.useRouter?[3,2]:(t=this.tabs).length>0?[4,this.select(t[0])]:[3,2];case 1:e.sent(),e.label=2;case 2:return this.ionNavWillLoad.emit(),[2]}}))}))},t.prototype.componentWillRender=function(){var t=this.el.querySelector("ion-tab-bar");if(t){var e=this.selectedTab?this.selectedTab.tab:void 0;t.selectedTab=e}},t.prototype.select=function(t){return Object(i.a)(this,void 0,void 0,(function(){var e;return Object(i.c)(this,(function(n){switch(n.label){case 0:return e=a(this.tabs,t),this.shouldSwitch(e)?[4,this.setActive(e)]:[2,!1];case 1:return n.sent(),[4,this.notifyRouter()];case 2:return n.sent(),this.tabSwitch(),[2,!0]}}))}))},t.prototype.getTab=function(t){return Object(i.a)(this,void 0,void 0,(function(){return Object(i.c)(this,(function(e){return[2,a(this.tabs,t)]}))}))},t.prototype.getSelected=function(){return Promise.resolve(this.selectedTab?this.selectedTab.tab:void 0)},t.prototype.setRouteId=function(t){return Object(i.a)(this,void 0,void 0,(function(){var e,n=this;return Object(i.c)(this,(function(i){switch(i.label){case 0:return e=a(this.tabs,t),this.shouldSwitch(e)?[4,this.setActive(e)]:[2,{changed:!1,element:this.selectedTab}];case 1:return i.sent(),[2,{changed:!0,element:this.selectedTab,markVisible:function(){return n.tabSwitch()}}]}}))}))},t.prototype.getRouteId=function(){return Object(i.a)(this,void 0,void 0,(function(){var t,e;return Object(i.c)(this,(function(n){return[2,void 0!==(e=null===(t=this.selectedTab)||void 0===t?void 0:t.tab)?{id:e,element:this.selectedTab}:void 0]}))}))},t.prototype.setActive=function(t){return this.transitioning?Promise.reject("transitioning already happening"):(this.transitioning=!0,this.leavingTab=this.selectedTab,this.selectedTab=t,this.ionTabsWillChange.emit({tab:t.tab}),t.active=!0,Promise.resolve())},t.prototype.tabSwitch=function(){var t=this.selectedTab,e=this.leavingTab;this.leavingTab=void 0,this.transitioning=!1,t&&e!==t&&(e&&(e.active=!1),this.ionTabsDidChange.emit({tab:t.tab}))},t.prototype.notifyRouter=function(){if(this.useRouter){var t=document.querySelector("ion-router");if(t)return t.navChanged("forward")}return Promise.resolve(!1)},t.prototype.shouldSwitch=function(t){var e=this.selectedTab;return void 0!==t&&t!==e&&!this.transitioning},Object.defineProperty(t.prototype,"tabs",{get:function(){return Array.from(this.el.querySelectorAll("ion-tab"))},enumerable:!1,configurable:!0}),t.prototype.render=function(){return Object(o.h)(o.H,{onIonTabButtonClick:this.onTabClicked},Object(o.h)("slot",{name:"top"}),Object(o.h)("div",{class:"tabs-inner"},Object(o.h)("slot",null)),Object(o.h)("slot",{name:"bottom"}))},Object.defineProperty(t.prototype,"el",{get:function(){return Object(o.i)(this)},enumerable:!1,configurable:!0}),t}(),a=function(t,e){var n="string"===typeof e?t.find((function(t){return t.tab===e})):e;return n||console.error('tab with id: "'.concat(n,'" does not exist')),n};s.style=":host{left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;width:100%;height:100%;contain:layout size style;z-index:0}.tabs-inner{position:relative;-ms-flex:1;flex:1;contain:layout size style}"},92:function(t,e,n){"use strict";n.r(e),n.d(e,"C",(function(){return s})),n.d(e,"a",(function(){return r})),n.d(e,"d",(function(){return c}));var i=n(15),o=n(22),r=function(t,e,n,r,c,s){return Object(i.a)(void 0,void 0,void 0,(function(){var a,u;return Object(i.c)(this,(function(i){switch(i.label){case 0:if(t)return[2,t.attachViewToDom(e,n,c,r)];if(!s&&"string"!==typeof n&&!(n instanceof HTMLElement))throw new Error("framework delegate is missing");return u="string"===typeof n?null===(a=e.ownerDocument)||void 0===a?void 0:a.createElement(n):n,r&&r.forEach((function(t){return u.classList.add(t)})),c&&Object.assign(u,c),e.appendChild(u),[4,new Promise((function(t){return Object(o.c)(u,t)}))];case 1:return i.sent(),[2,u]}}))}))},c=function(t,e){if(e){if(t){var n=e.parentElement;return t.removeViewFromDom(n,e)}e.remove()}return Promise.resolve()},s=function(){var t,e;return{attachViewToDom:function(n,r,c,s){return void 0===c&&(c={}),void 0===s&&(s=[]),Object(i.a)(void 0,void 0,void 0,(function(){var a,u,l,h,d;return Object(i.c)(this,(function(i){switch(i.label){case 0:return t=n,r?(l="string"===typeof r?null===(a=t.ownerDocument)||void 0===a?void 0:a.createElement(r):r,s.forEach((function(t){return l.classList.add(t)})),Object.assign(l,c),t.appendChild(l),[4,new Promise((function(t){return Object(o.c)(l,t)}))]):[3,2];case 1:return i.sent(),[3,3];case 2:t.children.length>0&&(h=null===(u=t.ownerDocument)||void 0===u?void 0:u.createElement("div"),s.forEach((function(t){return h.classList.add(t)})),h.append.apply(h,t.children),t.appendChild(h)),i.label=3;case 3:return d=document.querySelector("ion-app")||document.body,e=document.createComment("ionic teleport"),t.parentNode.insertBefore(e,t),d.appendChild(t),[2,t]}}))}))},removeViewFromDom:function(){return t&&e&&(e.parentNode.insertBefore(t,e),e.remove()),Promise.resolve()}}}}}]);
//# sourceMappingURL=33.8c6aaba4.chunk.js.map