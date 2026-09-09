function xw(n,a){for(var s=0;s<a.length;s++){const o=a[s];if(typeof o!="string"&&!Array.isArray(o)){for(const u in o)if(u!=="default"&&!(u in n)){const h=Object.getOwnPropertyDescriptor(o,u);h&&Object.defineProperty(n,u,h.get?h:{enumerable:!0,get:()=>o[u]})}}}return Object.freeze(Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}))}(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const u of document.querySelectorAll('link[rel="modulepreload"]'))o(u);new MutationObserver(u=>{for(const h of u)if(h.type==="childList")for(const f of h.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&o(f)}).observe(document,{childList:!0,subtree:!0});function s(u){const h={};return u.integrity&&(h.integrity=u.integrity),u.referrerPolicy&&(h.referrerPolicy=u.referrerPolicy),u.crossOrigin==="use-credentials"?h.credentials="include":u.crossOrigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function o(u){if(u.ep)return;u.ep=!0;const h=s(u);fetch(u.href,h)}})();function sx(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var Xu={exports:{}},qi={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ey;function bw(){if(ey)return qi;ey=1;var n=Symbol.for("react.transitional.element"),a=Symbol.for("react.fragment");function s(o,u,h){var f=null;if(h!==void 0&&(f=""+h),u.key!==void 0&&(f=""+u.key),"key"in u){h={};for(var m in u)m!=="key"&&(h[m]=u[m])}else h=u;return u=h.ref,{$$typeof:n,type:o,key:f,ref:u!==void 0?u:null,props:h}}return qi.Fragment=a,qi.jsx=s,qi.jsxs=s,qi}var ty;function Sw(){return ty||(ty=1,Xu.exports=bw()),Xu.exports}var l=Sw(),Fu={exports:{}},Se={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ny;function ww(){if(ny)return Se;ny=1;var n=Symbol.for("react.transitional.element"),a=Symbol.for("react.portal"),s=Symbol.for("react.fragment"),o=Symbol.for("react.strict_mode"),u=Symbol.for("react.profiler"),h=Symbol.for("react.consumer"),f=Symbol.for("react.context"),m=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),g=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),x=Symbol.for("react.activity"),b=Symbol.iterator;function E(T){return T===null||typeof T!="object"?null:(T=b&&T[b]||T["@@iterator"],typeof T=="function"?T:null)}var j={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},N=Object.assign,C={};function k(T,O,te){this.props=T,this.context=O,this.refs=C,this.updater=te||j}k.prototype.isReactComponent={},k.prototype.setState=function(T,O){if(typeof T!="object"&&typeof T!="function"&&T!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,T,O,"setState")},k.prototype.forceUpdate=function(T){this.updater.enqueueForceUpdate(this,T,"forceUpdate")};function D(){}D.prototype=k.prototype;function V(T,O,te){this.props=T,this.context=O,this.refs=C,this.updater=te||j}var R=V.prototype=new D;R.constructor=V,N(R,k.prototype),R.isPureReactComponent=!0;var B=Array.isArray;function Y(){}var A={H:null,A:null,T:null,S:null},q=Object.prototype.hasOwnProperty;function U(T,O,te){var oe=te.ref;return{$$typeof:n,type:T,key:O,ref:oe!==void 0?oe:null,props:te}}function _(T,O){return U(T.type,O,T.props)}function $(T){return typeof T=="object"&&T!==null&&T.$$typeof===n}function W(T){var O={"=":"=0",":":"=2"};return"$"+T.replace(/[=:]/g,function(te){return O[te]})}var le=/\/+/g;function Z(T,O){return typeof T=="object"&&T!==null&&T.key!=null?W(""+T.key):O.toString(36)}function ce(T){switch(T.status){case"fulfilled":return T.value;case"rejected":throw T.reason;default:switch(typeof T.status=="string"?T.then(Y,Y):(T.status="pending",T.then(function(O){T.status==="pending"&&(T.status="fulfilled",T.value=O)},function(O){T.status==="pending"&&(T.status="rejected",T.reason=O)})),T.status){case"fulfilled":return T.value;case"rejected":throw T.reason}}throw T}function L(T,O,te,oe,ue){var me=typeof T;(me==="undefined"||me==="boolean")&&(T=null);var xe=!1;if(T===null)xe=!0;else switch(me){case"bigint":case"string":case"number":xe=!0;break;case"object":switch(T.$$typeof){case n:case a:xe=!0;break;case v:return xe=T._init,L(xe(T._payload),O,te,oe,ue)}}if(xe)return ue=ue(T),xe=oe===""?"."+Z(T,0):oe,B(ue)?(te="",xe!=null&&(te=xe.replace(le,"$&/")+"/"),L(ue,O,te,"",function(de){return de})):ue!=null&&($(ue)&&(ue=_(ue,te+(ue.key==null||T&&T.key===ue.key?"":(""+ue.key).replace(le,"$&/")+"/")+xe)),O.push(ue)),1;xe=0;var ie=oe===""?".":oe+":";if(B(T))for(var I=0;I<T.length;I++)oe=T[I],me=ie+Z(oe,I),xe+=L(oe,O,te,me,ue);else if(I=E(T),typeof I=="function")for(T=I.call(T),I=0;!(oe=T.next()).done;)oe=oe.value,me=ie+Z(oe,I++),xe+=L(oe,O,te,me,ue);else if(me==="object"){if(typeof T.then=="function")return L(ce(T),O,te,oe,ue);throw O=String(T),Error("Objects are not valid as a React child (found: "+(O==="[object Object]"?"object with keys {"+Object.keys(T).join(", ")+"}":O)+"). If you meant to render a collection of children, use an array instead.")}return xe}function se(T,O,te){if(T==null)return T;var oe=[],ue=0;return L(T,oe,"","",function(me){return O.call(te,me,ue++)}),oe}function Q(T){if(T._status===-1){var O=T._result;O=O(),O.then(function(te){(T._status===0||T._status===-1)&&(T._status=1,T._result=te)},function(te){(T._status===0||T._status===-1)&&(T._status=2,T._result=te)}),T._status===-1&&(T._status=0,T._result=O)}if(T._status===1)return T._result.default;throw T._result}var X=typeof reportError=="function"?reportError:function(T){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var O=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof T=="object"&&T!==null&&typeof T.message=="string"?String(T.message):String(T),error:T});if(!window.dispatchEvent(O))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",T);return}console.error(T)},ae={map:se,forEach:function(T,O,te){se(T,function(){O.apply(this,arguments)},te)},count:function(T){var O=0;return se(T,function(){O++}),O},toArray:function(T){return se(T,function(O){return O})||[]},only:function(T){if(!$(T))throw Error("React.Children.only expected to receive a single React element child.");return T}};return Se.Activity=x,Se.Children=ae,Se.Component=k,Se.Fragment=s,Se.Profiler=u,Se.PureComponent=V,Se.StrictMode=o,Se.Suspense=p,Se.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=A,Se.__COMPILER_RUNTIME={__proto__:null,c:function(T){return A.H.useMemoCache(T)}},Se.cache=function(T){return function(){return T.apply(null,arguments)}},Se.cacheSignal=function(){return null},Se.cloneElement=function(T,O,te){if(T==null)throw Error("The argument must be a React element, but you passed "+T+".");var oe=N({},T.props),ue=T.key;if(O!=null)for(me in O.key!==void 0&&(ue=""+O.key),O)!q.call(O,me)||me==="key"||me==="__self"||me==="__source"||me==="ref"&&O.ref===void 0||(oe[me]=O[me]);var me=arguments.length-2;if(me===1)oe.children=te;else if(1<me){for(var xe=Array(me),ie=0;ie<me;ie++)xe[ie]=arguments[ie+2];oe.children=xe}return U(T.type,ue,oe)},Se.createContext=function(T){return T={$$typeof:f,_currentValue:T,_currentValue2:T,_threadCount:0,Provider:null,Consumer:null},T.Provider=T,T.Consumer={$$typeof:h,_context:T},T},Se.createElement=function(T,O,te){var oe,ue={},me=null;if(O!=null)for(oe in O.key!==void 0&&(me=""+O.key),O)q.call(O,oe)&&oe!=="key"&&oe!=="__self"&&oe!=="__source"&&(ue[oe]=O[oe]);var xe=arguments.length-2;if(xe===1)ue.children=te;else if(1<xe){for(var ie=Array(xe),I=0;I<xe;I++)ie[I]=arguments[I+2];ue.children=ie}if(T&&T.defaultProps)for(oe in xe=T.defaultProps,xe)ue[oe]===void 0&&(ue[oe]=xe[oe]);return U(T,me,ue)},Se.createRef=function(){return{current:null}},Se.forwardRef=function(T){return{$$typeof:m,render:T}},Se.isValidElement=$,Se.lazy=function(T){return{$$typeof:v,_payload:{_status:-1,_result:T},_init:Q}},Se.memo=function(T,O){return{$$typeof:g,type:T,compare:O===void 0?null:O}},Se.startTransition=function(T){var O=A.T,te={};A.T=te;try{var oe=T(),ue=A.S;ue!==null&&ue(te,oe),typeof oe=="object"&&oe!==null&&typeof oe.then=="function"&&oe.then(Y,X)}catch(me){X(me)}finally{O!==null&&te.types!==null&&(O.types=te.types),A.T=O}},Se.unstable_useCacheRefresh=function(){return A.H.useCacheRefresh()},Se.use=function(T){return A.H.use(T)},Se.useActionState=function(T,O,te){return A.H.useActionState(T,O,te)},Se.useCallback=function(T,O){return A.H.useCallback(T,O)},Se.useContext=function(T){return A.H.useContext(T)},Se.useDebugValue=function(){},Se.useDeferredValue=function(T,O){return A.H.useDeferredValue(T,O)},Se.useEffect=function(T,O){return A.H.useEffect(T,O)},Se.useEffectEvent=function(T){return A.H.useEffectEvent(T)},Se.useId=function(){return A.H.useId()},Se.useImperativeHandle=function(T,O,te){return A.H.useImperativeHandle(T,O,te)},Se.useInsertionEffect=function(T,O){return A.H.useInsertionEffect(T,O)},Se.useLayoutEffect=function(T,O){return A.H.useLayoutEffect(T,O)},Se.useMemo=function(T,O){return A.H.useMemo(T,O)},Se.useOptimistic=function(T,O){return A.H.useOptimistic(T,O)},Se.useReducer=function(T,O,te){return A.H.useReducer(T,O,te)},Se.useRef=function(T){return A.H.useRef(T)},Se.useState=function(T){return A.H.useState(T)},Se.useSyncExternalStore=function(T,O,te){return A.H.useSyncExternalStore(T,O,te)},Se.useTransition=function(){return A.H.useTransition()},Se.version="19.2.8",Se}var ry;function cf(){return ry||(ry=1,Fu.exports=ww()),Fu.exports}var S=cf();const ox=sx(S),is=xw({__proto__:null,default:ox},[S]);var $u={exports:{}},Yi={},Ku={exports:{}},Zu={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ay;function jw(){return ay||(ay=1,(function(n){function a(L,se){var Q=L.length;L.push(se);e:for(;0<Q;){var X=Q-1>>>1,ae=L[X];if(0<u(ae,se))L[X]=se,L[Q]=ae,Q=X;else break e}}function s(L){return L.length===0?null:L[0]}function o(L){if(L.length===0)return null;var se=L[0],Q=L.pop();if(Q!==se){L[0]=Q;e:for(var X=0,ae=L.length,T=ae>>>1;X<T;){var O=2*(X+1)-1,te=L[O],oe=O+1,ue=L[oe];if(0>u(te,Q))oe<ae&&0>u(ue,te)?(L[X]=ue,L[oe]=Q,X=oe):(L[X]=te,L[O]=Q,X=O);else if(oe<ae&&0>u(ue,Q))L[X]=ue,L[oe]=Q,X=oe;else break e}}return se}function u(L,se){var Q=L.sortIndex-se.sortIndex;return Q!==0?Q:L.id-se.id}if(n.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var h=performance;n.unstable_now=function(){return h.now()}}else{var f=Date,m=f.now();n.unstable_now=function(){return f.now()-m}}var p=[],g=[],v=1,x=null,b=3,E=!1,j=!1,N=!1,C=!1,k=typeof setTimeout=="function"?setTimeout:null,D=typeof clearTimeout=="function"?clearTimeout:null,V=typeof setImmediate<"u"?setImmediate:null;function R(L){for(var se=s(g);se!==null;){if(se.callback===null)o(g);else if(se.startTime<=L)o(g),se.sortIndex=se.expirationTime,a(p,se);else break;se=s(g)}}function B(L){if(N=!1,R(L),!j)if(s(p)!==null)j=!0,Y||(Y=!0,W());else{var se=s(g);se!==null&&ce(B,se.startTime-L)}}var Y=!1,A=-1,q=5,U=-1;function _(){return C?!0:!(n.unstable_now()-U<q)}function $(){if(C=!1,Y){var L=n.unstable_now();U=L;var se=!0;try{e:{j=!1,N&&(N=!1,D(A),A=-1),E=!0;var Q=b;try{t:{for(R(L),x=s(p);x!==null&&!(x.expirationTime>L&&_());){var X=x.callback;if(typeof X=="function"){x.callback=null,b=x.priorityLevel;var ae=X(x.expirationTime<=L);if(L=n.unstable_now(),typeof ae=="function"){x.callback=ae,R(L),se=!0;break t}x===s(p)&&o(p),R(L)}else o(p);x=s(p)}if(x!==null)se=!0;else{var T=s(g);T!==null&&ce(B,T.startTime-L),se=!1}}break e}finally{x=null,b=Q,E=!1}se=void 0}}finally{se?W():Y=!1}}}var W;if(typeof V=="function")W=function(){V($)};else if(typeof MessageChannel<"u"){var le=new MessageChannel,Z=le.port2;le.port1.onmessage=$,W=function(){Z.postMessage(null)}}else W=function(){k($,0)};function ce(L,se){A=k(function(){L(n.unstable_now())},se)}n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(L){L.callback=null},n.unstable_forceFrameRate=function(L){0>L||125<L?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):q=0<L?Math.floor(1e3/L):5},n.unstable_getCurrentPriorityLevel=function(){return b},n.unstable_next=function(L){switch(b){case 1:case 2:case 3:var se=3;break;default:se=b}var Q=b;b=se;try{return L()}finally{b=Q}},n.unstable_requestPaint=function(){C=!0},n.unstable_runWithPriority=function(L,se){switch(L){case 1:case 2:case 3:case 4:case 5:break;default:L=3}var Q=b;b=L;try{return se()}finally{b=Q}},n.unstable_scheduleCallback=function(L,se,Q){var X=n.unstable_now();switch(typeof Q=="object"&&Q!==null?(Q=Q.delay,Q=typeof Q=="number"&&0<Q?X+Q:X):Q=X,L){case 1:var ae=-1;break;case 2:ae=250;break;case 5:ae=1073741823;break;case 4:ae=1e4;break;default:ae=5e3}return ae=Q+ae,L={id:v++,callback:se,priorityLevel:L,startTime:Q,expirationTime:ae,sortIndex:-1},Q>X?(L.sortIndex=Q,a(g,L),s(p)===null&&L===s(g)&&(N?(D(A),A=-1):N=!0,ce(B,Q-X))):(L.sortIndex=ae,a(p,L),j||E||(j=!0,Y||(Y=!0,W()))),L},n.unstable_shouldYield=_,n.unstable_wrapCallback=function(L){var se=b;return function(){var Q=b;b=se;try{return L.apply(this,arguments)}finally{b=Q}}}})(Zu)),Zu}var iy;function Ew(){return iy||(iy=1,Ku.exports=jw()),Ku.exports}var Qu={exports:{}},gt={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var sy;function Tw(){if(sy)return gt;sy=1;var n=cf();function a(p){var g="https://react.dev/errors/"+p;if(1<arguments.length){g+="?args[]="+encodeURIComponent(arguments[1]);for(var v=2;v<arguments.length;v++)g+="&args[]="+encodeURIComponent(arguments[v])}return"Minified React error #"+p+"; visit "+g+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function s(){}var o={d:{f:s,r:function(){throw Error(a(522))},D:s,C:s,L:s,m:s,X:s,S:s,M:s},p:0,findDOMNode:null},u=Symbol.for("react.portal");function h(p,g,v){var x=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:u,key:x==null?null:""+x,children:p,containerInfo:g,implementation:v}}var f=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function m(p,g){if(p==="font")return"";if(typeof g=="string")return g==="use-credentials"?g:""}return gt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=o,gt.createPortal=function(p,g){var v=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!g||g.nodeType!==1&&g.nodeType!==9&&g.nodeType!==11)throw Error(a(299));return h(p,g,null,v)},gt.flushSync=function(p){var g=f.T,v=o.p;try{if(f.T=null,o.p=2,p)return p()}finally{f.T=g,o.p=v,o.d.f()}},gt.preconnect=function(p,g){typeof p=="string"&&(g?(g=g.crossOrigin,g=typeof g=="string"?g==="use-credentials"?g:"":void 0):g=null,o.d.C(p,g))},gt.prefetchDNS=function(p){typeof p=="string"&&o.d.D(p)},gt.preinit=function(p,g){if(typeof p=="string"&&g&&typeof g.as=="string"){var v=g.as,x=m(v,g.crossOrigin),b=typeof g.integrity=="string"?g.integrity:void 0,E=typeof g.fetchPriority=="string"?g.fetchPriority:void 0;v==="style"?o.d.S(p,typeof g.precedence=="string"?g.precedence:void 0,{crossOrigin:x,integrity:b,fetchPriority:E}):v==="script"&&o.d.X(p,{crossOrigin:x,integrity:b,fetchPriority:E,nonce:typeof g.nonce=="string"?g.nonce:void 0})}},gt.preinitModule=function(p,g){if(typeof p=="string")if(typeof g=="object"&&g!==null){if(g.as==null||g.as==="script"){var v=m(g.as,g.crossOrigin);o.d.M(p,{crossOrigin:v,integrity:typeof g.integrity=="string"?g.integrity:void 0,nonce:typeof g.nonce=="string"?g.nonce:void 0})}}else g==null&&o.d.M(p)},gt.preload=function(p,g){if(typeof p=="string"&&typeof g=="object"&&g!==null&&typeof g.as=="string"){var v=g.as,x=m(v,g.crossOrigin);o.d.L(p,v,{crossOrigin:x,integrity:typeof g.integrity=="string"?g.integrity:void 0,nonce:typeof g.nonce=="string"?g.nonce:void 0,type:typeof g.type=="string"?g.type:void 0,fetchPriority:typeof g.fetchPriority=="string"?g.fetchPriority:void 0,referrerPolicy:typeof g.referrerPolicy=="string"?g.referrerPolicy:void 0,imageSrcSet:typeof g.imageSrcSet=="string"?g.imageSrcSet:void 0,imageSizes:typeof g.imageSizes=="string"?g.imageSizes:void 0,media:typeof g.media=="string"?g.media:void 0})}},gt.preloadModule=function(p,g){if(typeof p=="string")if(g){var v=m(g.as,g.crossOrigin);o.d.m(p,{as:typeof g.as=="string"&&g.as!=="script"?g.as:void 0,crossOrigin:v,integrity:typeof g.integrity=="string"?g.integrity:void 0})}else o.d.m(p)},gt.requestFormReset=function(p){o.d.r(p)},gt.unstable_batchedUpdates=function(p,g){return p(g)},gt.useFormState=function(p,g,v){return f.H.useFormState(p,g,v)},gt.useFormStatus=function(){return f.H.useHostTransitionStatus()},gt.version="19.2.8",gt}var oy;function lx(){if(oy)return Qu.exports;oy=1;function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(a){console.error(a)}}return n(),Qu.exports=Tw(),Qu.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ly;function Cw(){if(ly)return Yi;ly=1;var n=Ew(),a=cf(),s=lx();function o(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var r=2;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function u(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function h(e){var t=e,r=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(r=t.return),e=t.return;while(e)}return t.tag===3?r:null}function f(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function m(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function p(e){if(h(e)!==e)throw Error(o(188))}function g(e){var t=e.alternate;if(!t){if(t=h(e),t===null)throw Error(o(188));return t!==e?null:e}for(var r=e,i=t;;){var c=r.return;if(c===null)break;var d=c.alternate;if(d===null){if(i=c.return,i!==null){r=i;continue}break}if(c.child===d.child){for(d=c.child;d;){if(d===r)return p(c),e;if(d===i)return p(c),t;d=d.sibling}throw Error(o(188))}if(r.return!==i.return)r=c,i=d;else{for(var y=!1,w=c.child;w;){if(w===r){y=!0,r=c,i=d;break}if(w===i){y=!0,i=c,r=d;break}w=w.sibling}if(!y){for(w=d.child;w;){if(w===r){y=!0,r=d,i=c;break}if(w===i){y=!0,i=d,r=c;break}w=w.sibling}if(!y)throw Error(o(189))}}if(r.alternate!==i)throw Error(o(190))}if(r.tag!==3)throw Error(o(188));return r.stateNode.current===r?e:t}function v(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=v(e),t!==null)return t;e=e.sibling}return null}var x=Object.assign,b=Symbol.for("react.element"),E=Symbol.for("react.transitional.element"),j=Symbol.for("react.portal"),N=Symbol.for("react.fragment"),C=Symbol.for("react.strict_mode"),k=Symbol.for("react.profiler"),D=Symbol.for("react.consumer"),V=Symbol.for("react.context"),R=Symbol.for("react.forward_ref"),B=Symbol.for("react.suspense"),Y=Symbol.for("react.suspense_list"),A=Symbol.for("react.memo"),q=Symbol.for("react.lazy"),U=Symbol.for("react.activity"),_=Symbol.for("react.memo_cache_sentinel"),$=Symbol.iterator;function W(e){return e===null||typeof e!="object"?null:(e=$&&e[$]||e["@@iterator"],typeof e=="function"?e:null)}var le=Symbol.for("react.client.reference");function Z(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===le?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case N:return"Fragment";case k:return"Profiler";case C:return"StrictMode";case B:return"Suspense";case Y:return"SuspenseList";case U:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case j:return"Portal";case V:return e.displayName||"Context";case D:return(e._context.displayName||"Context")+".Consumer";case R:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case A:return t=e.displayName||null,t!==null?t:Z(e.type)||"Memo";case q:t=e._payload,e=e._init;try{return Z(e(t))}catch{}}return null}var ce=Array.isArray,L=a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,se=s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Q={pending:!1,data:null,method:null,action:null},X=[],ae=-1;function T(e){return{current:e}}function O(e){0>ae||(e.current=X[ae],X[ae]=null,ae--)}function te(e,t){ae++,X[ae]=e.current,e.current=t}var oe=T(null),ue=T(null),me=T(null),xe=T(null);function ie(e,t){switch(te(me,t),te(ue,e),te(oe,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?jg(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=jg(t),e=Eg(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}O(oe),te(oe,e)}function I(){O(oe),O(ue),O(me)}function de(e){e.memoizedState!==null&&te(xe,e);var t=oe.current,r=Eg(t,e.type);t!==r&&(te(ue,e),te(oe,r))}function re(e){ue.current===e&&(O(oe),O(ue)),xe.current===e&&(O(xe),Bi._currentValue=Q)}var pe,Ce;function Oe(e){if(pe===void 0)try{throw Error()}catch(r){var t=r.stack.trim().match(/\n( *(at )?)/);pe=t&&t[1]||"",Ce=-1<r.stack.indexOf(`
    at`)?" (<anonymous>)":-1<r.stack.indexOf("@")?"@unknown:0:0":""}return`
`+pe+e+Ce}var Qe=!1;function Fe(e,t){if(!e||Qe)return"";Qe=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(t){var ne=function(){throw Error()};if(Object.defineProperty(ne.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(ne,[])}catch(K){var F=K}Reflect.construct(e,[],ne)}else{try{ne.call()}catch(K){F=K}e.call(ne.prototype)}}else{try{throw Error()}catch(K){F=K}(ne=e())&&typeof ne.catch=="function"&&ne.catch(function(){})}}catch(K){if(K&&F&&typeof K.stack=="string")return[K.stack,F.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var c=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");c&&c.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var d=i.DetermineComponentFrameRoot(),y=d[0],w=d[1];if(y&&w){var M=y.split(`
`),G=w.split(`
`);for(c=i=0;i<M.length&&!M[i].includes("DetermineComponentFrameRoot");)i++;for(;c<G.length&&!G[c].includes("DetermineComponentFrameRoot");)c++;if(i===M.length||c===G.length)for(i=M.length-1,c=G.length-1;1<=i&&0<=c&&M[i]!==G[c];)c--;for(;1<=i&&0<=c;i--,c--)if(M[i]!==G[c]){if(i!==1||c!==1)do if(i--,c--,0>c||M[i]!==G[c]){var J=`
`+M[i].replace(" at new "," at ");return e.displayName&&J.includes("<anonymous>")&&(J=J.replace("<anonymous>",e.displayName)),J}while(1<=i&&0<=c);break}}}finally{Qe=!1,Error.prepareStackTrace=r}return(r=e?e.displayName||e.name:"")?Oe(r):""}function yt(e,t){switch(e.tag){case 26:case 27:case 5:return Oe(e.type);case 16:return Oe("Lazy");case 13:return e.child!==t&&t!==null?Oe("Suspense Fallback"):Oe("Suspense");case 19:return Oe("SuspenseList");case 0:case 15:return Fe(e.type,!1);case 11:return Fe(e.type.render,!1);case 1:return Fe(e.type,!0);case 31:return Oe("Activity");default:return""}}function eh(e){try{var t="",r=null;do t+=yt(e,r),r=e,e=e.return;while(e);return t}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var Ml=Object.prototype.hasOwnProperty,kl=n.unstable_scheduleCallback,Rl=n.unstable_cancelCallback,J0=n.unstable_shouldYield,W0=n.unstable_requestPaint,At=n.unstable_now,I0=n.unstable_getCurrentPriorityLevel,th=n.unstable_ImmediatePriority,nh=n.unstable_UserBlockingPriority,fs=n.unstable_NormalPriority,e1=n.unstable_LowPriority,rh=n.unstable_IdlePriority,t1=n.log,n1=n.unstable_setDisableYieldValue,Za=null,Mt=null;function Gn(e){if(typeof t1=="function"&&n1(e),Mt&&typeof Mt.setStrictMode=="function")try{Mt.setStrictMode(Za,e)}catch{}}var kt=Math.clz32?Math.clz32:i1,r1=Math.log,a1=Math.LN2;function i1(e){return e>>>=0,e===0?32:31-(r1(e)/a1|0)|0}var hs=256,ms=262144,ps=4194304;function wr(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function gs(e,t,r){var i=e.pendingLanes;if(i===0)return 0;var c=0,d=e.suspendedLanes,y=e.pingedLanes;e=e.warmLanes;var w=i&134217727;return w!==0?(i=w&~d,i!==0?c=wr(i):(y&=w,y!==0?c=wr(y):r||(r=w&~e,r!==0&&(c=wr(r))))):(w=i&~d,w!==0?c=wr(w):y!==0?c=wr(y):r||(r=i&~e,r!==0&&(c=wr(r)))),c===0?0:t!==0&&t!==c&&(t&d)===0&&(d=c&-c,r=t&-t,d>=r||d===32&&(r&4194048)!==0)?t:c}function Qa(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function s1(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ah(){var e=ps;return ps<<=1,(ps&62914560)===0&&(ps=4194304),e}function Ol(e){for(var t=[],r=0;31>r;r++)t.push(e);return t}function Ja(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function o1(e,t,r,i,c,d){var y=e.pendingLanes;e.pendingLanes=r,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=r,e.entangledLanes&=r,e.errorRecoveryDisabledLanes&=r,e.shellSuspendCounter=0;var w=e.entanglements,M=e.expirationTimes,G=e.hiddenUpdates;for(r=y&~r;0<r;){var J=31-kt(r),ne=1<<J;w[J]=0,M[J]=-1;var F=G[J];if(F!==null)for(G[J]=null,J=0;J<F.length;J++){var K=F[J];K!==null&&(K.lane&=-536870913)}r&=~ne}i!==0&&ih(e,i,0),d!==0&&c===0&&e.tag!==0&&(e.suspendedLanes|=d&~(y&~t))}function ih(e,t,r){e.pendingLanes|=t,e.suspendedLanes&=~t;var i=31-kt(t);e.entangledLanes|=t,e.entanglements[i]=e.entanglements[i]|1073741824|r&261930}function sh(e,t){var r=e.entangledLanes|=t;for(e=e.entanglements;r;){var i=31-kt(r),c=1<<i;c&t|e[i]&t&&(e[i]|=t),r&=~c}}function oh(e,t){var r=t&-t;return r=(r&42)!==0?1:zl(r),(r&(e.suspendedLanes|t))!==0?0:r}function zl(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function _l(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function lh(){var e=se.p;return e!==0?e:(e=window.event,e===void 0?32:$g(e.type))}function ch(e,t){var r=se.p;try{return se.p=e,t()}finally{se.p=r}}var Xn=Math.random().toString(36).slice(2),ct="__reactFiber$"+Xn,wt="__reactProps$"+Xn,Kr="__reactContainer$"+Xn,Vl="__reactEvents$"+Xn,l1="__reactListeners$"+Xn,c1="__reactHandles$"+Xn,uh="__reactResources$"+Xn,Wa="__reactMarker$"+Xn;function Bl(e){delete e[ct],delete e[wt],delete e[Vl],delete e[l1],delete e[c1]}function Zr(e){var t=e[ct];if(t)return t;for(var r=e.parentNode;r;){if(t=r[Kr]||r[ct]){if(r=t.alternate,t.child!==null||r!==null&&r.child!==null)for(e=kg(e);e!==null;){if(r=e[ct])return r;e=kg(e)}return t}e=r,r=e.parentNode}return null}function Qr(e){if(e=e[ct]||e[Kr]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Ia(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(o(33))}function Jr(e){var t=e[uh];return t||(t=e[uh]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function st(e){e[Wa]=!0}var dh=new Set,fh={};function jr(e,t){Wr(e,t),Wr(e+"Capture",t)}function Wr(e,t){for(fh[e]=t,e=0;e<t.length;e++)dh.add(t[e])}var u1=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),hh={},mh={};function d1(e){return Ml.call(mh,e)?!0:Ml.call(hh,e)?!1:u1.test(e)?mh[e]=!0:(hh[e]=!0,!1)}function ys(e,t,r){if(d1(t))if(r===null)e.removeAttribute(t);else{switch(typeof r){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var i=t.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+r)}}function vs(e,t,r){if(r===null)e.removeAttribute(t);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+r)}}function jn(e,t,r,i){if(i===null)e.removeAttribute(r);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(r);return}e.setAttributeNS(t,r,""+i)}}function qt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function ph(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function f1(e,t,r){var i=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var c=i.get,d=i.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return c.call(this)},set:function(y){r=""+y,d.call(this,y)}}),Object.defineProperty(e,t,{enumerable:i.enumerable}),{getValue:function(){return r},setValue:function(y){r=""+y},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Ll(e){if(!e._valueTracker){var t=ph(e)?"checked":"value";e._valueTracker=f1(e,t,""+e[t])}}function gh(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var r=t.getValue(),i="";return e&&(i=ph(e)?e.checked?"true":"false":e.value),e=i,e!==r?(t.setValue(e),!0):!1}function xs(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var h1=/[\n"\\]/g;function Yt(e){return e.replace(h1,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function Ul(e,t,r,i,c,d,y,w){e.name="",y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"?e.type=y:e.removeAttribute("type"),t!=null?y==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+qt(t)):e.value!==""+qt(t)&&(e.value=""+qt(t)):y!=="submit"&&y!=="reset"||e.removeAttribute("value"),t!=null?Hl(e,y,qt(t)):r!=null?Hl(e,y,qt(r)):i!=null&&e.removeAttribute("value"),c==null&&d!=null&&(e.defaultChecked=!!d),c!=null&&(e.checked=c&&typeof c!="function"&&typeof c!="symbol"),w!=null&&typeof w!="function"&&typeof w!="symbol"&&typeof w!="boolean"?e.name=""+qt(w):e.removeAttribute("name")}function yh(e,t,r,i,c,d,y,w){if(d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"&&(e.type=d),t!=null||r!=null){if(!(d!=="submit"&&d!=="reset"||t!=null)){Ll(e);return}r=r!=null?""+qt(r):"",t=t!=null?""+qt(t):r,w||t===e.value||(e.value=t),e.defaultValue=t}i=i??c,i=typeof i!="function"&&typeof i!="symbol"&&!!i,e.checked=w?e.checked:!!i,e.defaultChecked=!!i,y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"&&(e.name=y),Ll(e)}function Hl(e,t,r){t==="number"&&xs(e.ownerDocument)===e||e.defaultValue===""+r||(e.defaultValue=""+r)}function Ir(e,t,r,i){if(e=e.options,t){t={};for(var c=0;c<r.length;c++)t["$"+r[c]]=!0;for(r=0;r<e.length;r++)c=t.hasOwnProperty("$"+e[r].value),e[r].selected!==c&&(e[r].selected=c),c&&i&&(e[r].defaultSelected=!0)}else{for(r=""+qt(r),t=null,c=0;c<e.length;c++){if(e[c].value===r){e[c].selected=!0,i&&(e[c].defaultSelected=!0);return}t!==null||e[c].disabled||(t=e[c])}t!==null&&(t.selected=!0)}}function vh(e,t,r){if(t!=null&&(t=""+qt(t),t!==e.value&&(e.value=t),r==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=r!=null?""+qt(r):""}function xh(e,t,r,i){if(t==null){if(i!=null){if(r!=null)throw Error(o(92));if(ce(i)){if(1<i.length)throw Error(o(93));i=i[0]}r=i}r==null&&(r=""),t=r}r=qt(t),e.defaultValue=r,i=e.textContent,i===r&&i!==""&&i!==null&&(e.value=i),Ll(e)}function ea(e,t){if(t){var r=e.firstChild;if(r&&r===e.lastChild&&r.nodeType===3){r.nodeValue=t;return}}e.textContent=t}var m1=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function bh(e,t,r){var i=t.indexOf("--")===0;r==null||typeof r=="boolean"||r===""?i?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":i?e.setProperty(t,r):typeof r!="number"||r===0||m1.has(t)?t==="float"?e.cssFloat=r:e[t]=(""+r).trim():e[t]=r+"px"}function Sh(e,t,r){if(t!=null&&typeof t!="object")throw Error(o(62));if(e=e.style,r!=null){for(var i in r)!r.hasOwnProperty(i)||t!=null&&t.hasOwnProperty(i)||(i.indexOf("--")===0?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="");for(var c in t)i=t[c],t.hasOwnProperty(c)&&r[c]!==i&&bh(e,c,i)}else for(var d in t)t.hasOwnProperty(d)&&bh(e,d,t[d])}function ql(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var p1=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),g1=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function bs(e){return g1.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function En(){}var Yl=null;function Pl(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ta=null,na=null;function wh(e){var t=Qr(e);if(t&&(e=t.stateNode)){var r=e[wt]||null;e:switch(e=t.stateNode,t.type){case"input":if(Ul(e,r.value,r.defaultValue,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name),t=r.name,r.type==="radio"&&t!=null){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll('input[name="'+Yt(""+t)+'"][type="radio"]'),t=0;t<r.length;t++){var i=r[t];if(i!==e&&i.form===e.form){var c=i[wt]||null;if(!c)throw Error(o(90));Ul(i,c.value,c.defaultValue,c.defaultValue,c.checked,c.defaultChecked,c.type,c.name)}}for(t=0;t<r.length;t++)i=r[t],i.form===e.form&&gh(i)}break e;case"textarea":vh(e,r.value,r.defaultValue);break e;case"select":t=r.value,t!=null&&Ir(e,!!r.multiple,t,!1)}}}var Gl=!1;function jh(e,t,r){if(Gl)return e(t,r);Gl=!0;try{var i=e(t);return i}finally{if(Gl=!1,(ta!==null||na!==null)&&(oo(),ta&&(t=ta,e=na,na=ta=null,wh(t),e)))for(t=0;t<e.length;t++)wh(e[t])}}function ei(e,t){var r=e.stateNode;if(r===null)return null;var i=r[wt]||null;if(i===null)return null;r=i[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break e;default:e=!1}if(e)return null;if(r&&typeof r!="function")throw Error(o(231,t,typeof r));return r}var Tn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Xl=!1;if(Tn)try{var ti={};Object.defineProperty(ti,"passive",{get:function(){Xl=!0}}),window.addEventListener("test",ti,ti),window.removeEventListener("test",ti,ti)}catch{Xl=!1}var Fn=null,Fl=null,Ss=null;function Eh(){if(Ss)return Ss;var e,t=Fl,r=t.length,i,c="value"in Fn?Fn.value:Fn.textContent,d=c.length;for(e=0;e<r&&t[e]===c[e];e++);var y=r-e;for(i=1;i<=y&&t[r-i]===c[d-i];i++);return Ss=c.slice(e,1<i?1-i:void 0)}function ws(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function js(){return!0}function Th(){return!1}function jt(e){function t(r,i,c,d,y){this._reactName=r,this._targetInst=c,this.type=i,this.nativeEvent=d,this.target=y,this.currentTarget=null;for(var w in e)e.hasOwnProperty(w)&&(r=e[w],this[w]=r?r(d):d[w]);return this.isDefaultPrevented=(d.defaultPrevented!=null?d.defaultPrevented:d.returnValue===!1)?js:Th,this.isPropagationStopped=Th,this}return x(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=js)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=js)},persist:function(){},isPersistent:js}),t}var Er={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Es=jt(Er),ni=x({},Er,{view:0,detail:0}),y1=jt(ni),$l,Kl,ri,Ts=x({},ni,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ql,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==ri&&(ri&&e.type==="mousemove"?($l=e.screenX-ri.screenX,Kl=e.screenY-ri.screenY):Kl=$l=0,ri=e),$l)},movementY:function(e){return"movementY"in e?e.movementY:Kl}}),Ch=jt(Ts),v1=x({},Ts,{dataTransfer:0}),x1=jt(v1),b1=x({},ni,{relatedTarget:0}),Zl=jt(b1),S1=x({},Er,{animationName:0,elapsedTime:0,pseudoElement:0}),w1=jt(S1),j1=x({},Er,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),E1=jt(j1),T1=x({},Er,{data:0}),Nh=jt(T1),C1={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},N1={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},D1={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function A1(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=D1[e])?!!t[e]:!1}function Ql(){return A1}var M1=x({},ni,{key:function(e){if(e.key){var t=C1[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=ws(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?N1[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ql,charCode:function(e){return e.type==="keypress"?ws(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ws(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),k1=jt(M1),R1=x({},Ts,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Dh=jt(R1),O1=x({},ni,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ql}),z1=jt(O1),_1=x({},Er,{propertyName:0,elapsedTime:0,pseudoElement:0}),V1=jt(_1),B1=x({},Ts,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),L1=jt(B1),U1=x({},Er,{newState:0,oldState:0}),H1=jt(U1),q1=[9,13,27,32],Jl=Tn&&"CompositionEvent"in window,ai=null;Tn&&"documentMode"in document&&(ai=document.documentMode);var Y1=Tn&&"TextEvent"in window&&!ai,Ah=Tn&&(!Jl||ai&&8<ai&&11>=ai),Mh=" ",kh=!1;function Rh(e,t){switch(e){case"keyup":return q1.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Oh(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var ra=!1;function P1(e,t){switch(e){case"compositionend":return Oh(t);case"keypress":return t.which!==32?null:(kh=!0,Mh);case"textInput":return e=t.data,e===Mh&&kh?null:e;default:return null}}function G1(e,t){if(ra)return e==="compositionend"||!Jl&&Rh(e,t)?(e=Eh(),Ss=Fl=Fn=null,ra=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Ah&&t.locale!=="ko"?null:t.data;default:return null}}var X1={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function zh(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!X1[e.type]:t==="textarea"}function _h(e,t,r,i){ta?na?na.push(i):na=[i]:ta=i,t=po(t,"onChange"),0<t.length&&(r=new Es("onChange","change",null,r,i),e.push({event:r,listeners:t}))}var ii=null,si=null;function F1(e){yg(e,0)}function Cs(e){var t=Ia(e);if(gh(t))return e}function Vh(e,t){if(e==="change")return t}var Bh=!1;if(Tn){var Wl;if(Tn){var Il="oninput"in document;if(!Il){var Lh=document.createElement("div");Lh.setAttribute("oninput","return;"),Il=typeof Lh.oninput=="function"}Wl=Il}else Wl=!1;Bh=Wl&&(!document.documentMode||9<document.documentMode)}function Uh(){ii&&(ii.detachEvent("onpropertychange",Hh),si=ii=null)}function Hh(e){if(e.propertyName==="value"&&Cs(si)){var t=[];_h(t,si,e,Pl(e)),jh(F1,t)}}function $1(e,t,r){e==="focusin"?(Uh(),ii=t,si=r,ii.attachEvent("onpropertychange",Hh)):e==="focusout"&&Uh()}function K1(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Cs(si)}function Z1(e,t){if(e==="click")return Cs(t)}function Q1(e,t){if(e==="input"||e==="change")return Cs(t)}function J1(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Rt=typeof Object.is=="function"?Object.is:J1;function oi(e,t){if(Rt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var r=Object.keys(e),i=Object.keys(t);if(r.length!==i.length)return!1;for(i=0;i<r.length;i++){var c=r[i];if(!Ml.call(t,c)||!Rt(e[c],t[c]))return!1}return!0}function qh(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Yh(e,t){var r=qh(e);e=0;for(var i;r;){if(r.nodeType===3){if(i=e+r.textContent.length,e<=t&&i>=t)return{node:r,offset:t-e};e=i}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=qh(r)}}function Ph(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Ph(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Gh(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=xs(e.document);t instanceof e.HTMLIFrameElement;){try{var r=typeof t.contentWindow.location.href=="string"}catch{r=!1}if(r)e=t.contentWindow;else break;t=xs(e.document)}return t}function ec(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var W1=Tn&&"documentMode"in document&&11>=document.documentMode,aa=null,tc=null,li=null,nc=!1;function Xh(e,t,r){var i=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;nc||aa==null||aa!==xs(i)||(i=aa,"selectionStart"in i&&ec(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),li&&oi(li,i)||(li=i,i=po(tc,"onSelect"),0<i.length&&(t=new Es("onSelect","select",null,t,r),e.push({event:t,listeners:i}),t.target=aa)))}function Tr(e,t){var r={};return r[e.toLowerCase()]=t.toLowerCase(),r["Webkit"+e]="webkit"+t,r["Moz"+e]="moz"+t,r}var ia={animationend:Tr("Animation","AnimationEnd"),animationiteration:Tr("Animation","AnimationIteration"),animationstart:Tr("Animation","AnimationStart"),transitionrun:Tr("Transition","TransitionRun"),transitionstart:Tr("Transition","TransitionStart"),transitioncancel:Tr("Transition","TransitionCancel"),transitionend:Tr("Transition","TransitionEnd")},rc={},Fh={};Tn&&(Fh=document.createElement("div").style,"AnimationEvent"in window||(delete ia.animationend.animation,delete ia.animationiteration.animation,delete ia.animationstart.animation),"TransitionEvent"in window||delete ia.transitionend.transition);function Cr(e){if(rc[e])return rc[e];if(!ia[e])return e;var t=ia[e],r;for(r in t)if(t.hasOwnProperty(r)&&r in Fh)return rc[e]=t[r];return e}var $h=Cr("animationend"),Kh=Cr("animationiteration"),Zh=Cr("animationstart"),I1=Cr("transitionrun"),eS=Cr("transitionstart"),tS=Cr("transitioncancel"),Qh=Cr("transitionend"),Jh=new Map,ac="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");ac.push("scrollEnd");function nn(e,t){Jh.set(e,t),jr(t,[e])}var Ns=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Pt=[],sa=0,ic=0;function Ds(){for(var e=sa,t=ic=sa=0;t<e;){var r=Pt[t];Pt[t++]=null;var i=Pt[t];Pt[t++]=null;var c=Pt[t];Pt[t++]=null;var d=Pt[t];if(Pt[t++]=null,i!==null&&c!==null){var y=i.pending;y===null?c.next=c:(c.next=y.next,y.next=c),i.pending=c}d!==0&&Wh(r,c,d)}}function As(e,t,r,i){Pt[sa++]=e,Pt[sa++]=t,Pt[sa++]=r,Pt[sa++]=i,ic|=i,e.lanes|=i,e=e.alternate,e!==null&&(e.lanes|=i)}function sc(e,t,r,i){return As(e,t,r,i),Ms(e)}function Nr(e,t){return As(e,null,null,t),Ms(e)}function Wh(e,t,r){e.lanes|=r;var i=e.alternate;i!==null&&(i.lanes|=r);for(var c=!1,d=e.return;d!==null;)d.childLanes|=r,i=d.alternate,i!==null&&(i.childLanes|=r),d.tag===22&&(e=d.stateNode,e===null||e._visibility&1||(c=!0)),e=d,d=d.return;return e.tag===3?(d=e.stateNode,c&&t!==null&&(c=31-kt(r),e=d.hiddenUpdates,i=e[c],i===null?e[c]=[t]:i.push(t),t.lane=r|536870912),d):null}function Ms(e){if(50<Mi)throw Mi=0,pu=null,Error(o(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var oa={};function nS(e,t,r,i){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ot(e,t,r,i){return new nS(e,t,r,i)}function oc(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Cn(e,t){var r=e.alternate;return r===null?(r=Ot(e.tag,t,e.key,e.mode),r.elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=e.flags&65011712,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,t=e.dependencies,r.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r.refCleanup=e.refCleanup,r}function Ih(e,t){e.flags&=65011714;var r=e.alternate;return r===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=r.childLanes,e.lanes=r.lanes,e.child=r.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=r.memoizedProps,e.memoizedState=r.memoizedState,e.updateQueue=r.updateQueue,e.type=r.type,t=r.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function ks(e,t,r,i,c,d){var y=0;if(i=e,typeof e=="function")oc(e)&&(y=1);else if(typeof e=="string")y=ow(e,r,oe.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case U:return e=Ot(31,r,t,c),e.elementType=U,e.lanes=d,e;case N:return Dr(r.children,c,d,t);case C:y=8,c|=24;break;case k:return e=Ot(12,r,t,c|2),e.elementType=k,e.lanes=d,e;case B:return e=Ot(13,r,t,c),e.elementType=B,e.lanes=d,e;case Y:return e=Ot(19,r,t,c),e.elementType=Y,e.lanes=d,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case V:y=10;break e;case D:y=9;break e;case R:y=11;break e;case A:y=14;break e;case q:y=16,i=null;break e}y=29,r=Error(o(130,e===null?"null":typeof e,"")),i=null}return t=Ot(y,r,t,c),t.elementType=e,t.type=i,t.lanes=d,t}function Dr(e,t,r,i){return e=Ot(7,e,i,t),e.lanes=r,e}function lc(e,t,r){return e=Ot(6,e,null,t),e.lanes=r,e}function em(e){var t=Ot(18,null,null,0);return t.stateNode=e,t}function cc(e,t,r){return t=Ot(4,e.children!==null?e.children:[],e.key,t),t.lanes=r,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var tm=new WeakMap;function Gt(e,t){if(typeof e=="object"&&e!==null){var r=tm.get(e);return r!==void 0?r:(t={value:e,source:t,stack:eh(t)},tm.set(e,t),t)}return{value:e,source:t,stack:eh(t)}}var la=[],ca=0,Rs=null,ci=0,Xt=[],Ft=0,$n=null,un=1,dn="";function Nn(e,t){la[ca++]=ci,la[ca++]=Rs,Rs=e,ci=t}function nm(e,t,r){Xt[Ft++]=un,Xt[Ft++]=dn,Xt[Ft++]=$n,$n=e;var i=un;e=dn;var c=32-kt(i)-1;i&=~(1<<c),r+=1;var d=32-kt(t)+c;if(30<d){var y=c-c%5;d=(i&(1<<y)-1).toString(32),i>>=y,c-=y,un=1<<32-kt(t)+c|r<<c|i,dn=d+e}else un=1<<d|r<<c|i,dn=e}function uc(e){e.return!==null&&(Nn(e,1),nm(e,1,0))}function dc(e){for(;e===Rs;)Rs=la[--ca],la[ca]=null,ci=la[--ca],la[ca]=null;for(;e===$n;)$n=Xt[--Ft],Xt[Ft]=null,dn=Xt[--Ft],Xt[Ft]=null,un=Xt[--Ft],Xt[Ft]=null}function rm(e,t){Xt[Ft++]=un,Xt[Ft++]=dn,Xt[Ft++]=$n,un=t.id,dn=t.overflow,$n=e}var ut=null,Pe=null,Ae=!1,Kn=null,$t=!1,fc=Error(o(519));function Zn(e){var t=Error(o(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw ui(Gt(t,e)),fc}function am(e){var t=e.stateNode,r=e.type,i=e.memoizedProps;switch(t[ct]=e,t[wt]=i,r){case"dialog":Te("cancel",t),Te("close",t);break;case"iframe":case"object":case"embed":Te("load",t);break;case"video":case"audio":for(r=0;r<Ri.length;r++)Te(Ri[r],t);break;case"source":Te("error",t);break;case"img":case"image":case"link":Te("error",t),Te("load",t);break;case"details":Te("toggle",t);break;case"input":Te("invalid",t),yh(t,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":Te("invalid",t);break;case"textarea":Te("invalid",t),xh(t,i.value,i.defaultValue,i.children)}r=i.children,typeof r!="string"&&typeof r!="number"&&typeof r!="bigint"||t.textContent===""+r||i.suppressHydrationWarning===!0||Sg(t.textContent,r)?(i.popover!=null&&(Te("beforetoggle",t),Te("toggle",t)),i.onScroll!=null&&Te("scroll",t),i.onScrollEnd!=null&&Te("scrollend",t),i.onClick!=null&&(t.onclick=En),t=!0):t=!1,t||Zn(e,!0)}function im(e){for(ut=e.return;ut;)switch(ut.tag){case 5:case 31:case 13:$t=!1;return;case 27:case 3:$t=!0;return;default:ut=ut.return}}function ua(e){if(e!==ut)return!1;if(!Ae)return im(e),Ae=!0,!1;var t=e.tag,r;if((r=t!==3&&t!==27)&&((r=t===5)&&(r=e.type,r=!(r!=="form"&&r!=="button")||Mu(e.type,e.memoizedProps)),r=!r),r&&Pe&&Zn(e),im(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(o(317));Pe=Mg(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(o(317));Pe=Mg(e)}else t===27?(t=Pe,cr(e.type)?(e=_u,_u=null,Pe=e):Pe=t):Pe=ut?Zt(e.stateNode.nextSibling):null;return!0}function Ar(){Pe=ut=null,Ae=!1}function hc(){var e=Kn;return e!==null&&(Nt===null?Nt=e:Nt.push.apply(Nt,e),Kn=null),e}function ui(e){Kn===null?Kn=[e]:Kn.push(e)}var mc=T(null),Mr=null,Dn=null;function Qn(e,t,r){te(mc,t._currentValue),t._currentValue=r}function An(e){e._currentValue=mc.current,O(mc)}function pc(e,t,r){for(;e!==null;){var i=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,i!==null&&(i.childLanes|=t)):i!==null&&(i.childLanes&t)!==t&&(i.childLanes|=t),e===r)break;e=e.return}}function gc(e,t,r,i){var c=e.child;for(c!==null&&(c.return=e);c!==null;){var d=c.dependencies;if(d!==null){var y=c.child;d=d.firstContext;e:for(;d!==null;){var w=d;d=c;for(var M=0;M<t.length;M++)if(w.context===t[M]){d.lanes|=r,w=d.alternate,w!==null&&(w.lanes|=r),pc(d.return,r,e),i||(y=null);break e}d=w.next}}else if(c.tag===18){if(y=c.return,y===null)throw Error(o(341));y.lanes|=r,d=y.alternate,d!==null&&(d.lanes|=r),pc(y,r,e),y=null}else y=c.child;if(y!==null)y.return=c;else for(y=c;y!==null;){if(y===e){y=null;break}if(c=y.sibling,c!==null){c.return=y.return,y=c;break}y=y.return}c=y}}function da(e,t,r,i){e=null;for(var c=t,d=!1;c!==null;){if(!d){if((c.flags&524288)!==0)d=!0;else if((c.flags&262144)!==0)break}if(c.tag===10){var y=c.alternate;if(y===null)throw Error(o(387));if(y=y.memoizedProps,y!==null){var w=c.type;Rt(c.pendingProps.value,y.value)||(e!==null?e.push(w):e=[w])}}else if(c===xe.current){if(y=c.alternate,y===null)throw Error(o(387));y.memoizedState.memoizedState!==c.memoizedState.memoizedState&&(e!==null?e.push(Bi):e=[Bi])}c=c.return}e!==null&&gc(t,e,r,i),t.flags|=262144}function Os(e){for(e=e.firstContext;e!==null;){if(!Rt(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function kr(e){Mr=e,Dn=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function dt(e){return sm(Mr,e)}function zs(e,t){return Mr===null&&kr(e),sm(e,t)}function sm(e,t){var r=t._currentValue;if(t={context:t,memoizedValue:r,next:null},Dn===null){if(e===null)throw Error(o(308));Dn=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Dn=Dn.next=t;return r}var rS=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(r,i){e.push(i)}};this.abort=function(){t.aborted=!0,e.forEach(function(r){return r()})}},aS=n.unstable_scheduleCallback,iS=n.unstable_NormalPriority,Ie={$$typeof:V,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function yc(){return{controller:new rS,data:new Map,refCount:0}}function di(e){e.refCount--,e.refCount===0&&aS(iS,function(){e.controller.abort()})}var fi=null,vc=0,fa=0,ha=null;function sS(e,t){if(fi===null){var r=fi=[];vc=0,fa=Su(),ha={status:"pending",value:void 0,then:function(i){r.push(i)}}}return vc++,t.then(om,om),t}function om(){if(--vc===0&&fi!==null){ha!==null&&(ha.status="fulfilled");var e=fi;fi=null,fa=0,ha=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function oS(e,t){var r=[],i={status:"pending",value:null,reason:null,then:function(c){r.push(c)}};return e.then(function(){i.status="fulfilled",i.value=t;for(var c=0;c<r.length;c++)(0,r[c])(t)},function(c){for(i.status="rejected",i.reason=c,c=0;c<r.length;c++)(0,r[c])(void 0)}),i}var lm=L.S;L.S=function(e,t){Xp=At(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&sS(e,t),lm!==null&&lm(e,t)};var Rr=T(null);function xc(){var e=Rr.current;return e!==null?e:Ue.pooledCache}function _s(e,t){t===null?te(Rr,Rr.current):te(Rr,t.pool)}function cm(){var e=xc();return e===null?null:{parent:Ie._currentValue,pool:e}}var ma=Error(o(460)),bc=Error(o(474)),Vs=Error(o(542)),Bs={then:function(){}};function um(e){return e=e.status,e==="fulfilled"||e==="rejected"}function dm(e,t,r){switch(r=e[r],r===void 0?e.push(t):r!==t&&(t.then(En,En),t=r),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,hm(e),e;default:if(typeof t.status=="string")t.then(En,En);else{if(e=Ue,e!==null&&100<e.shellSuspendCounter)throw Error(o(482));e=t,e.status="pending",e.then(function(i){if(t.status==="pending"){var c=t;c.status="fulfilled",c.value=i}},function(i){if(t.status==="pending"){var c=t;c.status="rejected",c.reason=i}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,hm(e),e}throw zr=t,ma}}function Or(e){try{var t=e._init;return t(e._payload)}catch(r){throw r!==null&&typeof r=="object"&&typeof r.then=="function"?(zr=r,ma):r}}var zr=null;function fm(){if(zr===null)throw Error(o(459));var e=zr;return zr=null,e}function hm(e){if(e===ma||e===Vs)throw Error(o(483))}var pa=null,hi=0;function Ls(e){var t=hi;return hi+=1,pa===null&&(pa=[]),dm(pa,e,t)}function mi(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function Us(e,t){throw t.$$typeof===b?Error(o(525)):(e=Object.prototype.toString.call(t),Error(o(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function mm(e){function t(H,z){if(e){var P=H.deletions;P===null?(H.deletions=[z],H.flags|=16):P.push(z)}}function r(H,z){if(!e)return null;for(;z!==null;)t(H,z),z=z.sibling;return null}function i(H){for(var z=new Map;H!==null;)H.key!==null?z.set(H.key,H):z.set(H.index,H),H=H.sibling;return z}function c(H,z){return H=Cn(H,z),H.index=0,H.sibling=null,H}function d(H,z,P){return H.index=P,e?(P=H.alternate,P!==null?(P=P.index,P<z?(H.flags|=67108866,z):P):(H.flags|=67108866,z)):(H.flags|=1048576,z)}function y(H){return e&&H.alternate===null&&(H.flags|=67108866),H}function w(H,z,P,ee){return z===null||z.tag!==6?(z=lc(P,H.mode,ee),z.return=H,z):(z=c(z,P),z.return=H,z)}function M(H,z,P,ee){var ve=P.type;return ve===N?J(H,z,P.props.children,ee,P.key):z!==null&&(z.elementType===ve||typeof ve=="object"&&ve!==null&&ve.$$typeof===q&&Or(ve)===z.type)?(z=c(z,P.props),mi(z,P),z.return=H,z):(z=ks(P.type,P.key,P.props,null,H.mode,ee),mi(z,P),z.return=H,z)}function G(H,z,P,ee){return z===null||z.tag!==4||z.stateNode.containerInfo!==P.containerInfo||z.stateNode.implementation!==P.implementation?(z=cc(P,H.mode,ee),z.return=H,z):(z=c(z,P.children||[]),z.return=H,z)}function J(H,z,P,ee,ve){return z===null||z.tag!==7?(z=Dr(P,H.mode,ee,ve),z.return=H,z):(z=c(z,P),z.return=H,z)}function ne(H,z,P){if(typeof z=="string"&&z!==""||typeof z=="number"||typeof z=="bigint")return z=lc(""+z,H.mode,P),z.return=H,z;if(typeof z=="object"&&z!==null){switch(z.$$typeof){case E:return P=ks(z.type,z.key,z.props,null,H.mode,P),mi(P,z),P.return=H,P;case j:return z=cc(z,H.mode,P),z.return=H,z;case q:return z=Or(z),ne(H,z,P)}if(ce(z)||W(z))return z=Dr(z,H.mode,P,null),z.return=H,z;if(typeof z.then=="function")return ne(H,Ls(z),P);if(z.$$typeof===V)return ne(H,zs(H,z),P);Us(H,z)}return null}function F(H,z,P,ee){var ve=z!==null?z.key:null;if(typeof P=="string"&&P!==""||typeof P=="number"||typeof P=="bigint")return ve!==null?null:w(H,z,""+P,ee);if(typeof P=="object"&&P!==null){switch(P.$$typeof){case E:return P.key===ve?M(H,z,P,ee):null;case j:return P.key===ve?G(H,z,P,ee):null;case q:return P=Or(P),F(H,z,P,ee)}if(ce(P)||W(P))return ve!==null?null:J(H,z,P,ee,null);if(typeof P.then=="function")return F(H,z,Ls(P),ee);if(P.$$typeof===V)return F(H,z,zs(H,P),ee);Us(H,P)}return null}function K(H,z,P,ee,ve){if(typeof ee=="string"&&ee!==""||typeof ee=="number"||typeof ee=="bigint")return H=H.get(P)||null,w(z,H,""+ee,ve);if(typeof ee=="object"&&ee!==null){switch(ee.$$typeof){case E:return H=H.get(ee.key===null?P:ee.key)||null,M(z,H,ee,ve);case j:return H=H.get(ee.key===null?P:ee.key)||null,G(z,H,ee,ve);case q:return ee=Or(ee),K(H,z,P,ee,ve)}if(ce(ee)||W(ee))return H=H.get(P)||null,J(z,H,ee,ve,null);if(typeof ee.then=="function")return K(H,z,P,Ls(ee),ve);if(ee.$$typeof===V)return K(H,z,P,zs(z,ee),ve);Us(z,ee)}return null}function fe(H,z,P,ee){for(var ve=null,Me=null,ge=z,je=z=0,De=null;ge!==null&&je<P.length;je++){ge.index>je?(De=ge,ge=null):De=ge.sibling;var ke=F(H,ge,P[je],ee);if(ke===null){ge===null&&(ge=De);break}e&&ge&&ke.alternate===null&&t(H,ge),z=d(ke,z,je),Me===null?ve=ke:Me.sibling=ke,Me=ke,ge=De}if(je===P.length)return r(H,ge),Ae&&Nn(H,je),ve;if(ge===null){for(;je<P.length;je++)ge=ne(H,P[je],ee),ge!==null&&(z=d(ge,z,je),Me===null?ve=ge:Me.sibling=ge,Me=ge);return Ae&&Nn(H,je),ve}for(ge=i(ge);je<P.length;je++)De=K(ge,H,je,P[je],ee),De!==null&&(e&&De.alternate!==null&&ge.delete(De.key===null?je:De.key),z=d(De,z,je),Me===null?ve=De:Me.sibling=De,Me=De);return e&&ge.forEach(function(mr){return t(H,mr)}),Ae&&Nn(H,je),ve}function be(H,z,P,ee){if(P==null)throw Error(o(151));for(var ve=null,Me=null,ge=z,je=z=0,De=null,ke=P.next();ge!==null&&!ke.done;je++,ke=P.next()){ge.index>je?(De=ge,ge=null):De=ge.sibling;var mr=F(H,ge,ke.value,ee);if(mr===null){ge===null&&(ge=De);break}e&&ge&&mr.alternate===null&&t(H,ge),z=d(mr,z,je),Me===null?ve=mr:Me.sibling=mr,Me=mr,ge=De}if(ke.done)return r(H,ge),Ae&&Nn(H,je),ve;if(ge===null){for(;!ke.done;je++,ke=P.next())ke=ne(H,ke.value,ee),ke!==null&&(z=d(ke,z,je),Me===null?ve=ke:Me.sibling=ke,Me=ke);return Ae&&Nn(H,je),ve}for(ge=i(ge);!ke.done;je++,ke=P.next())ke=K(ge,H,je,ke.value,ee),ke!==null&&(e&&ke.alternate!==null&&ge.delete(ke.key===null?je:ke.key),z=d(ke,z,je),Me===null?ve=ke:Me.sibling=ke,Me=ke);return e&&ge.forEach(function(vw){return t(H,vw)}),Ae&&Nn(H,je),ve}function Le(H,z,P,ee){if(typeof P=="object"&&P!==null&&P.type===N&&P.key===null&&(P=P.props.children),typeof P=="object"&&P!==null){switch(P.$$typeof){case E:e:{for(var ve=P.key;z!==null;){if(z.key===ve){if(ve=P.type,ve===N){if(z.tag===7){r(H,z.sibling),ee=c(z,P.props.children),ee.return=H,H=ee;break e}}else if(z.elementType===ve||typeof ve=="object"&&ve!==null&&ve.$$typeof===q&&Or(ve)===z.type){r(H,z.sibling),ee=c(z,P.props),mi(ee,P),ee.return=H,H=ee;break e}r(H,z);break}else t(H,z);z=z.sibling}P.type===N?(ee=Dr(P.props.children,H.mode,ee,P.key),ee.return=H,H=ee):(ee=ks(P.type,P.key,P.props,null,H.mode,ee),mi(ee,P),ee.return=H,H=ee)}return y(H);case j:e:{for(ve=P.key;z!==null;){if(z.key===ve)if(z.tag===4&&z.stateNode.containerInfo===P.containerInfo&&z.stateNode.implementation===P.implementation){r(H,z.sibling),ee=c(z,P.children||[]),ee.return=H,H=ee;break e}else{r(H,z);break}else t(H,z);z=z.sibling}ee=cc(P,H.mode,ee),ee.return=H,H=ee}return y(H);case q:return P=Or(P),Le(H,z,P,ee)}if(ce(P))return fe(H,z,P,ee);if(W(P)){if(ve=W(P),typeof ve!="function")throw Error(o(150));return P=ve.call(P),be(H,z,P,ee)}if(typeof P.then=="function")return Le(H,z,Ls(P),ee);if(P.$$typeof===V)return Le(H,z,zs(H,P),ee);Us(H,P)}return typeof P=="string"&&P!==""||typeof P=="number"||typeof P=="bigint"?(P=""+P,z!==null&&z.tag===6?(r(H,z.sibling),ee=c(z,P),ee.return=H,H=ee):(r(H,z),ee=lc(P,H.mode,ee),ee.return=H,H=ee),y(H)):r(H,z)}return function(H,z,P,ee){try{hi=0;var ve=Le(H,z,P,ee);return pa=null,ve}catch(ge){if(ge===ma||ge===Vs)throw ge;var Me=Ot(29,ge,null,H.mode);return Me.lanes=ee,Me.return=H,Me}finally{}}}var _r=mm(!0),pm=mm(!1),Jn=!1;function Sc(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function wc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Wn(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function In(e,t,r){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,(Re&2)!==0){var c=i.pending;return c===null?t.next=t:(t.next=c.next,c.next=t),i.pending=t,t=Ms(e),Wh(e,null,r),t}return As(e,i,t,r),Ms(e)}function pi(e,t,r){if(t=t.updateQueue,t!==null&&(t=t.shared,(r&4194048)!==0)){var i=t.lanes;i&=e.pendingLanes,r|=i,t.lanes=r,sh(e,r)}}function jc(e,t){var r=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,r===i)){var c=null,d=null;if(r=r.firstBaseUpdate,r!==null){do{var y={lane:r.lane,tag:r.tag,payload:r.payload,callback:null,next:null};d===null?c=d=y:d=d.next=y,r=r.next}while(r!==null);d===null?c=d=t:d=d.next=t}else c=d=t;r={baseState:i.baseState,firstBaseUpdate:c,lastBaseUpdate:d,shared:i.shared,callbacks:i.callbacks},e.updateQueue=r;return}e=r.lastBaseUpdate,e===null?r.firstBaseUpdate=t:e.next=t,r.lastBaseUpdate=t}var Ec=!1;function gi(){if(Ec){var e=ha;if(e!==null)throw e}}function yi(e,t,r,i){Ec=!1;var c=e.updateQueue;Jn=!1;var d=c.firstBaseUpdate,y=c.lastBaseUpdate,w=c.shared.pending;if(w!==null){c.shared.pending=null;var M=w,G=M.next;M.next=null,y===null?d=G:y.next=G,y=M;var J=e.alternate;J!==null&&(J=J.updateQueue,w=J.lastBaseUpdate,w!==y&&(w===null?J.firstBaseUpdate=G:w.next=G,J.lastBaseUpdate=M))}if(d!==null){var ne=c.baseState;y=0,J=G=M=null,w=d;do{var F=w.lane&-536870913,K=F!==w.lane;if(K?(Ne&F)===F:(i&F)===F){F!==0&&F===fa&&(Ec=!0),J!==null&&(J=J.next={lane:0,tag:w.tag,payload:w.payload,callback:null,next:null});e:{var fe=e,be=w;F=t;var Le=r;switch(be.tag){case 1:if(fe=be.payload,typeof fe=="function"){ne=fe.call(Le,ne,F);break e}ne=fe;break e;case 3:fe.flags=fe.flags&-65537|128;case 0:if(fe=be.payload,F=typeof fe=="function"?fe.call(Le,ne,F):fe,F==null)break e;ne=x({},ne,F);break e;case 2:Jn=!0}}F=w.callback,F!==null&&(e.flags|=64,K&&(e.flags|=8192),K=c.callbacks,K===null?c.callbacks=[F]:K.push(F))}else K={lane:F,tag:w.tag,payload:w.payload,callback:w.callback,next:null},J===null?(G=J=K,M=ne):J=J.next=K,y|=F;if(w=w.next,w===null){if(w=c.shared.pending,w===null)break;K=w,w=K.next,K.next=null,c.lastBaseUpdate=K,c.shared.pending=null}}while(!0);J===null&&(M=ne),c.baseState=M,c.firstBaseUpdate=G,c.lastBaseUpdate=J,d===null&&(c.shared.lanes=0),ar|=y,e.lanes=y,e.memoizedState=ne}}function gm(e,t){if(typeof e!="function")throw Error(o(191,e));e.call(t)}function ym(e,t){var r=e.callbacks;if(r!==null)for(e.callbacks=null,e=0;e<r.length;e++)gm(r[e],t)}var ga=T(null),Hs=T(0);function vm(e,t){e=Ln,te(Hs,e),te(ga,t),Ln=e|t.baseLanes}function Tc(){te(Hs,Ln),te(ga,ga.current)}function Cc(){Ln=Hs.current,O(ga),O(Hs)}var zt=T(null),Kt=null;function er(e){var t=e.alternate;te(Je,Je.current&1),te(zt,e),Kt===null&&(t===null||ga.current!==null||t.memoizedState!==null)&&(Kt=e)}function Nc(e){te(Je,Je.current),te(zt,e),Kt===null&&(Kt=e)}function xm(e){e.tag===22?(te(Je,Je.current),te(zt,e),Kt===null&&(Kt=e)):tr()}function tr(){te(Je,Je.current),te(zt,zt.current)}function _t(e){O(zt),Kt===e&&(Kt=null),O(Je)}var Je=T(0);function qs(e){for(var t=e;t!==null;){if(t.tag===13){var r=t.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||Ou(r)||zu(r)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Mn=0,we=null,Ve=null,et=null,Ys=!1,ya=!1,Vr=!1,Ps=0,vi=0,va=null,lS=0;function $e(){throw Error(o(321))}function Dc(e,t){if(t===null)return!1;for(var r=0;r<t.length&&r<e.length;r++)if(!Rt(e[r],t[r]))return!1;return!0}function Ac(e,t,r,i,c,d){return Mn=d,we=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,L.H=e===null||e.memoizedState===null?np:Gc,Vr=!1,d=r(i,c),Vr=!1,ya&&(d=Sm(t,r,i,c)),bm(e),d}function bm(e){L.H=Si;var t=Ve!==null&&Ve.next!==null;if(Mn=0,et=Ve=we=null,Ys=!1,vi=0,va=null,t)throw Error(o(300));e===null||tt||(e=e.dependencies,e!==null&&Os(e)&&(tt=!0))}function Sm(e,t,r,i){we=e;var c=0;do{if(ya&&(va=null),vi=0,ya=!1,25<=c)throw Error(o(301));if(c+=1,et=Ve=null,e.updateQueue!=null){var d=e.updateQueue;d.lastEffect=null,d.events=null,d.stores=null,d.memoCache!=null&&(d.memoCache.index=0)}L.H=rp,d=t(r,i)}while(ya);return d}function cS(){var e=L.H,t=e.useState()[0];return t=typeof t.then=="function"?xi(t):t,e=e.useState()[0],(Ve!==null?Ve.memoizedState:null)!==e&&(we.flags|=1024),t}function Mc(){var e=Ps!==0;return Ps=0,e}function kc(e,t,r){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~r}function Rc(e){if(Ys){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Ys=!1}Mn=0,et=Ve=we=null,ya=!1,vi=Ps=0,va=null}function vt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return et===null?we.memoizedState=et=e:et=et.next=e,et}function We(){if(Ve===null){var e=we.alternate;e=e!==null?e.memoizedState:null}else e=Ve.next;var t=et===null?we.memoizedState:et.next;if(t!==null)et=t,Ve=e;else{if(e===null)throw we.alternate===null?Error(o(467)):Error(o(310));Ve=e,e={memoizedState:Ve.memoizedState,baseState:Ve.baseState,baseQueue:Ve.baseQueue,queue:Ve.queue,next:null},et===null?we.memoizedState=et=e:et=et.next=e}return et}function Gs(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function xi(e){var t=vi;return vi+=1,va===null&&(va=[]),e=dm(va,e,t),t=we,(et===null?t.memoizedState:et.next)===null&&(t=t.alternate,L.H=t===null||t.memoizedState===null?np:Gc),e}function Xs(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return xi(e);if(e.$$typeof===V)return dt(e)}throw Error(o(438,String(e)))}function Oc(e){var t=null,r=we.updateQueue;if(r!==null&&(t=r.memoCache),t==null){var i=we.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(t={data:i.data.map(function(c){return c.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),r===null&&(r=Gs(),we.updateQueue=r),r.memoCache=t,r=t.data[t.index],r===void 0)for(r=t.data[t.index]=Array(e),i=0;i<e;i++)r[i]=_;return t.index++,r}function kn(e,t){return typeof t=="function"?t(e):t}function Fs(e){var t=We();return zc(t,Ve,e)}function zc(e,t,r){var i=e.queue;if(i===null)throw Error(o(311));i.lastRenderedReducer=r;var c=e.baseQueue,d=i.pending;if(d!==null){if(c!==null){var y=c.next;c.next=d.next,d.next=y}t.baseQueue=c=d,i.pending=null}if(d=e.baseState,c===null)e.memoizedState=d;else{t=c.next;var w=y=null,M=null,G=t,J=!1;do{var ne=G.lane&-536870913;if(ne!==G.lane?(Ne&ne)===ne:(Mn&ne)===ne){var F=G.revertLane;if(F===0)M!==null&&(M=M.next={lane:0,revertLane:0,gesture:null,action:G.action,hasEagerState:G.hasEagerState,eagerState:G.eagerState,next:null}),ne===fa&&(J=!0);else if((Mn&F)===F){G=G.next,F===fa&&(J=!0);continue}else ne={lane:0,revertLane:G.revertLane,gesture:null,action:G.action,hasEagerState:G.hasEagerState,eagerState:G.eagerState,next:null},M===null?(w=M=ne,y=d):M=M.next=ne,we.lanes|=F,ar|=F;ne=G.action,Vr&&r(d,ne),d=G.hasEagerState?G.eagerState:r(d,ne)}else F={lane:ne,revertLane:G.revertLane,gesture:G.gesture,action:G.action,hasEagerState:G.hasEagerState,eagerState:G.eagerState,next:null},M===null?(w=M=F,y=d):M=M.next=F,we.lanes|=ne,ar|=ne;G=G.next}while(G!==null&&G!==t);if(M===null?y=d:M.next=w,!Rt(d,e.memoizedState)&&(tt=!0,J&&(r=ha,r!==null)))throw r;e.memoizedState=d,e.baseState=y,e.baseQueue=M,i.lastRenderedState=d}return c===null&&(i.lanes=0),[e.memoizedState,i.dispatch]}function _c(e){var t=We(),r=t.queue;if(r===null)throw Error(o(311));r.lastRenderedReducer=e;var i=r.dispatch,c=r.pending,d=t.memoizedState;if(c!==null){r.pending=null;var y=c=c.next;do d=e(d,y.action),y=y.next;while(y!==c);Rt(d,t.memoizedState)||(tt=!0),t.memoizedState=d,t.baseQueue===null&&(t.baseState=d),r.lastRenderedState=d}return[d,i]}function wm(e,t,r){var i=we,c=We(),d=Ae;if(d){if(r===void 0)throw Error(o(407));r=r()}else r=t();var y=!Rt((Ve||c).memoizedState,r);if(y&&(c.memoizedState=r,tt=!0),c=c.queue,Lc(Tm.bind(null,i,c,e),[e]),c.getSnapshot!==t||y||et!==null&&et.memoizedState.tag&1){if(i.flags|=2048,xa(9,{destroy:void 0},Em.bind(null,i,c,r,t),null),Ue===null)throw Error(o(349));d||(Mn&127)!==0||jm(i,t,r)}return r}function jm(e,t,r){e.flags|=16384,e={getSnapshot:t,value:r},t=we.updateQueue,t===null?(t=Gs(),we.updateQueue=t,t.stores=[e]):(r=t.stores,r===null?t.stores=[e]:r.push(e))}function Em(e,t,r,i){t.value=r,t.getSnapshot=i,Cm(t)&&Nm(e)}function Tm(e,t,r){return r(function(){Cm(t)&&Nm(e)})}function Cm(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!Rt(e,r)}catch{return!0}}function Nm(e){var t=Nr(e,2);t!==null&&Dt(t,e,2)}function Vc(e){var t=vt();if(typeof e=="function"){var r=e;if(e=r(),Vr){Gn(!0);try{r()}finally{Gn(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:kn,lastRenderedState:e},t}function Dm(e,t,r,i){return e.baseState=r,zc(e,Ve,typeof i=="function"?i:kn)}function uS(e,t,r,i,c){if(Zs(e))throw Error(o(485));if(e=t.action,e!==null){var d={payload:c,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(y){d.listeners.push(y)}};L.T!==null?r(!0):d.isTransition=!1,i(d),r=t.pending,r===null?(d.next=t.pending=d,Am(t,d)):(d.next=r.next,t.pending=r.next=d)}}function Am(e,t){var r=t.action,i=t.payload,c=e.state;if(t.isTransition){var d=L.T,y={};L.T=y;try{var w=r(c,i),M=L.S;M!==null&&M(y,w),Mm(e,t,w)}catch(G){Bc(e,t,G)}finally{d!==null&&y.types!==null&&(d.types=y.types),L.T=d}}else try{d=r(c,i),Mm(e,t,d)}catch(G){Bc(e,t,G)}}function Mm(e,t,r){r!==null&&typeof r=="object"&&typeof r.then=="function"?r.then(function(i){km(e,t,i)},function(i){return Bc(e,t,i)}):km(e,t,r)}function km(e,t,r){t.status="fulfilled",t.value=r,Rm(t),e.state=r,t=e.pending,t!==null&&(r=t.next,r===t?e.pending=null:(r=r.next,t.next=r,Am(e,r)))}function Bc(e,t,r){var i=e.pending;if(e.pending=null,i!==null){i=i.next;do t.status="rejected",t.reason=r,Rm(t),t=t.next;while(t!==i)}e.action=null}function Rm(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Om(e,t){return t}function zm(e,t){if(Ae){var r=Ue.formState;if(r!==null){e:{var i=we;if(Ae){if(Pe){t:{for(var c=Pe,d=$t;c.nodeType!==8;){if(!d){c=null;break t}if(c=Zt(c.nextSibling),c===null){c=null;break t}}d=c.data,c=d==="F!"||d==="F"?c:null}if(c){Pe=Zt(c.nextSibling),i=c.data==="F!";break e}}Zn(i)}i=!1}i&&(t=r[0])}}return r=vt(),r.memoizedState=r.baseState=t,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Om,lastRenderedState:t},r.queue=i,r=Im.bind(null,we,i),i.dispatch=r,i=Vc(!1),d=Pc.bind(null,we,!1,i.queue),i=vt(),c={state:t,dispatch:null,action:e,pending:null},i.queue=c,r=uS.bind(null,we,c,d,r),c.dispatch=r,i.memoizedState=e,[t,r,!1]}function _m(e){var t=We();return Vm(t,Ve,e)}function Vm(e,t,r){if(t=zc(e,t,Om)[0],e=Fs(kn)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var i=xi(t)}catch(y){throw y===ma?Vs:y}else i=t;t=We();var c=t.queue,d=c.dispatch;return r!==t.memoizedState&&(we.flags|=2048,xa(9,{destroy:void 0},dS.bind(null,c,r),null)),[i,d,e]}function dS(e,t){e.action=t}function Bm(e){var t=We(),r=Ve;if(r!==null)return Vm(t,r,e);We(),t=t.memoizedState,r=We();var i=r.queue.dispatch;return r.memoizedState=e,[t,i,!1]}function xa(e,t,r,i){return e={tag:e,create:r,deps:i,inst:t,next:null},t=we.updateQueue,t===null&&(t=Gs(),we.updateQueue=t),r=t.lastEffect,r===null?t.lastEffect=e.next=e:(i=r.next,r.next=e,e.next=i,t.lastEffect=e),e}function Lm(){return We().memoizedState}function $s(e,t,r,i){var c=vt();we.flags|=e,c.memoizedState=xa(1|t,{destroy:void 0},r,i===void 0?null:i)}function Ks(e,t,r,i){var c=We();i=i===void 0?null:i;var d=c.memoizedState.inst;Ve!==null&&i!==null&&Dc(i,Ve.memoizedState.deps)?c.memoizedState=xa(t,d,r,i):(we.flags|=e,c.memoizedState=xa(1|t,d,r,i))}function Um(e,t){$s(8390656,8,e,t)}function Lc(e,t){Ks(2048,8,e,t)}function fS(e){we.flags|=4;var t=we.updateQueue;if(t===null)t=Gs(),we.updateQueue=t,t.events=[e];else{var r=t.events;r===null?t.events=[e]:r.push(e)}}function Hm(e){var t=We().memoizedState;return fS({ref:t,nextImpl:e}),function(){if((Re&2)!==0)throw Error(o(440));return t.impl.apply(void 0,arguments)}}function qm(e,t){return Ks(4,2,e,t)}function Ym(e,t){return Ks(4,4,e,t)}function Pm(e,t){if(typeof t=="function"){e=e();var r=t(e);return function(){typeof r=="function"?r():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Gm(e,t,r){r=r!=null?r.concat([e]):null,Ks(4,4,Pm.bind(null,t,e),r)}function Uc(){}function Xm(e,t){var r=We();t=t===void 0?null:t;var i=r.memoizedState;return t!==null&&Dc(t,i[1])?i[0]:(r.memoizedState=[e,t],e)}function Fm(e,t){var r=We();t=t===void 0?null:t;var i=r.memoizedState;if(t!==null&&Dc(t,i[1]))return i[0];if(i=e(),Vr){Gn(!0);try{e()}finally{Gn(!1)}}return r.memoizedState=[i,t],i}function Hc(e,t,r){return r===void 0||(Mn&1073741824)!==0&&(Ne&261930)===0?e.memoizedState=t:(e.memoizedState=r,e=$p(),we.lanes|=e,ar|=e,r)}function $m(e,t,r,i){return Rt(r,t)?r:ga.current!==null?(e=Hc(e,r,i),Rt(e,t)||(tt=!0),e):(Mn&42)===0||(Mn&1073741824)!==0&&(Ne&261930)===0?(tt=!0,e.memoizedState=r):(e=$p(),we.lanes|=e,ar|=e,t)}function Km(e,t,r,i,c){var d=se.p;se.p=d!==0&&8>d?d:8;var y=L.T,w={};L.T=w,Pc(e,!1,t,r);try{var M=c(),G=L.S;if(G!==null&&G(w,M),M!==null&&typeof M=="object"&&typeof M.then=="function"){var J=oS(M,i);bi(e,t,J,Lt(e))}else bi(e,t,i,Lt(e))}catch(ne){bi(e,t,{then:function(){},status:"rejected",reason:ne},Lt())}finally{se.p=d,y!==null&&w.types!==null&&(y.types=w.types),L.T=y}}function hS(){}function qc(e,t,r,i){if(e.tag!==5)throw Error(o(476));var c=Zm(e).queue;Km(e,c,t,Q,r===null?hS:function(){return Qm(e),r(i)})}function Zm(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:Q,baseState:Q,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:kn,lastRenderedState:Q},next:null};var r={};return t.next={memoizedState:r,baseState:r,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:kn,lastRenderedState:r},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Qm(e){var t=Zm(e);t.next===null&&(t=e.alternate.memoizedState),bi(e,t.next.queue,{},Lt())}function Yc(){return dt(Bi)}function Jm(){return We().memoizedState}function Wm(){return We().memoizedState}function mS(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var r=Lt();e=Wn(r);var i=In(t,e,r);i!==null&&(Dt(i,t,r),pi(i,t,r)),t={cache:yc()},e.payload=t;return}t=t.return}}function pS(e,t,r){var i=Lt();r={lane:i,revertLane:0,gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},Zs(e)?ep(t,r):(r=sc(e,t,r,i),r!==null&&(Dt(r,e,i),tp(r,t,i)))}function Im(e,t,r){var i=Lt();bi(e,t,r,i)}function bi(e,t,r,i){var c={lane:i,revertLane:0,gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null};if(Zs(e))ep(t,c);else{var d=e.alternate;if(e.lanes===0&&(d===null||d.lanes===0)&&(d=t.lastRenderedReducer,d!==null))try{var y=t.lastRenderedState,w=d(y,r);if(c.hasEagerState=!0,c.eagerState=w,Rt(w,y))return As(e,t,c,0),Ue===null&&Ds(),!1}catch{}finally{}if(r=sc(e,t,c,i),r!==null)return Dt(r,e,i),tp(r,t,i),!0}return!1}function Pc(e,t,r,i){if(i={lane:2,revertLane:Su(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},Zs(e)){if(t)throw Error(o(479))}else t=sc(e,r,i,2),t!==null&&Dt(t,e,2)}function Zs(e){var t=e.alternate;return e===we||t!==null&&t===we}function ep(e,t){ya=Ys=!0;var r=e.pending;r===null?t.next=t:(t.next=r.next,r.next=t),e.pending=t}function tp(e,t,r){if((r&4194048)!==0){var i=t.lanes;i&=e.pendingLanes,r|=i,t.lanes=r,sh(e,r)}}var Si={readContext:dt,use:Xs,useCallback:$e,useContext:$e,useEffect:$e,useImperativeHandle:$e,useLayoutEffect:$e,useInsertionEffect:$e,useMemo:$e,useReducer:$e,useRef:$e,useState:$e,useDebugValue:$e,useDeferredValue:$e,useTransition:$e,useSyncExternalStore:$e,useId:$e,useHostTransitionStatus:$e,useFormState:$e,useActionState:$e,useOptimistic:$e,useMemoCache:$e,useCacheRefresh:$e};Si.useEffectEvent=$e;var np={readContext:dt,use:Xs,useCallback:function(e,t){return vt().memoizedState=[e,t===void 0?null:t],e},useContext:dt,useEffect:Um,useImperativeHandle:function(e,t,r){r=r!=null?r.concat([e]):null,$s(4194308,4,Pm.bind(null,t,e),r)},useLayoutEffect:function(e,t){return $s(4194308,4,e,t)},useInsertionEffect:function(e,t){$s(4,2,e,t)},useMemo:function(e,t){var r=vt();t=t===void 0?null:t;var i=e();if(Vr){Gn(!0);try{e()}finally{Gn(!1)}}return r.memoizedState=[i,t],i},useReducer:function(e,t,r){var i=vt();if(r!==void 0){var c=r(t);if(Vr){Gn(!0);try{r(t)}finally{Gn(!1)}}}else c=t;return i.memoizedState=i.baseState=c,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:c},i.queue=e,e=e.dispatch=pS.bind(null,we,e),[i.memoizedState,e]},useRef:function(e){var t=vt();return e={current:e},t.memoizedState=e},useState:function(e){e=Vc(e);var t=e.queue,r=Im.bind(null,we,t);return t.dispatch=r,[e.memoizedState,r]},useDebugValue:Uc,useDeferredValue:function(e,t){var r=vt();return Hc(r,e,t)},useTransition:function(){var e=Vc(!1);return e=Km.bind(null,we,e.queue,!0,!1),vt().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,r){var i=we,c=vt();if(Ae){if(r===void 0)throw Error(o(407));r=r()}else{if(r=t(),Ue===null)throw Error(o(349));(Ne&127)!==0||jm(i,t,r)}c.memoizedState=r;var d={value:r,getSnapshot:t};return c.queue=d,Um(Tm.bind(null,i,d,e),[e]),i.flags|=2048,xa(9,{destroy:void 0},Em.bind(null,i,d,r,t),null),r},useId:function(){var e=vt(),t=Ue.identifierPrefix;if(Ae){var r=dn,i=un;r=(i&~(1<<32-kt(i)-1)).toString(32)+r,t="_"+t+"R_"+r,r=Ps++,0<r&&(t+="H"+r.toString(32)),t+="_"}else r=lS++,t="_"+t+"r_"+r.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:Yc,useFormState:zm,useActionState:zm,useOptimistic:function(e){var t=vt();t.memoizedState=t.baseState=e;var r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=r,t=Pc.bind(null,we,!0,r),r.dispatch=t,[e,t]},useMemoCache:Oc,useCacheRefresh:function(){return vt().memoizedState=mS.bind(null,we)},useEffectEvent:function(e){var t=vt(),r={impl:e};return t.memoizedState=r,function(){if((Re&2)!==0)throw Error(o(440));return r.impl.apply(void 0,arguments)}}},Gc={readContext:dt,use:Xs,useCallback:Xm,useContext:dt,useEffect:Lc,useImperativeHandle:Gm,useInsertionEffect:qm,useLayoutEffect:Ym,useMemo:Fm,useReducer:Fs,useRef:Lm,useState:function(){return Fs(kn)},useDebugValue:Uc,useDeferredValue:function(e,t){var r=We();return $m(r,Ve.memoizedState,e,t)},useTransition:function(){var e=Fs(kn)[0],t=We().memoizedState;return[typeof e=="boolean"?e:xi(e),t]},useSyncExternalStore:wm,useId:Jm,useHostTransitionStatus:Yc,useFormState:_m,useActionState:_m,useOptimistic:function(e,t){var r=We();return Dm(r,Ve,e,t)},useMemoCache:Oc,useCacheRefresh:Wm};Gc.useEffectEvent=Hm;var rp={readContext:dt,use:Xs,useCallback:Xm,useContext:dt,useEffect:Lc,useImperativeHandle:Gm,useInsertionEffect:qm,useLayoutEffect:Ym,useMemo:Fm,useReducer:_c,useRef:Lm,useState:function(){return _c(kn)},useDebugValue:Uc,useDeferredValue:function(e,t){var r=We();return Ve===null?Hc(r,e,t):$m(r,Ve.memoizedState,e,t)},useTransition:function(){var e=_c(kn)[0],t=We().memoizedState;return[typeof e=="boolean"?e:xi(e),t]},useSyncExternalStore:wm,useId:Jm,useHostTransitionStatus:Yc,useFormState:Bm,useActionState:Bm,useOptimistic:function(e,t){var r=We();return Ve!==null?Dm(r,Ve,e,t):(r.baseState=e,[e,r.queue.dispatch])},useMemoCache:Oc,useCacheRefresh:Wm};rp.useEffectEvent=Hm;function Xc(e,t,r,i){t=e.memoizedState,r=r(i,t),r=r==null?t:x({},t,r),e.memoizedState=r,e.lanes===0&&(e.updateQueue.baseState=r)}var Fc={enqueueSetState:function(e,t,r){e=e._reactInternals;var i=Lt(),c=Wn(i);c.payload=t,r!=null&&(c.callback=r),t=In(e,c,i),t!==null&&(Dt(t,e,i),pi(t,e,i))},enqueueReplaceState:function(e,t,r){e=e._reactInternals;var i=Lt(),c=Wn(i);c.tag=1,c.payload=t,r!=null&&(c.callback=r),t=In(e,c,i),t!==null&&(Dt(t,e,i),pi(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var r=Lt(),i=Wn(r);i.tag=2,t!=null&&(i.callback=t),t=In(e,i,r),t!==null&&(Dt(t,e,r),pi(t,e,r))}};function ap(e,t,r,i,c,d,y){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,d,y):t.prototype&&t.prototype.isPureReactComponent?!oi(r,i)||!oi(c,d):!0}function ip(e,t,r,i){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(r,i),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(r,i),t.state!==e&&Fc.enqueueReplaceState(t,t.state,null)}function Br(e,t){var r=t;if("ref"in t){r={};for(var i in t)i!=="ref"&&(r[i]=t[i])}if(e=e.defaultProps){r===t&&(r=x({},r));for(var c in e)r[c]===void 0&&(r[c]=e[c])}return r}function sp(e){Ns(e)}function op(e){console.error(e)}function lp(e){Ns(e)}function Qs(e,t){try{var r=e.onUncaughtError;r(t.value,{componentStack:t.stack})}catch(i){setTimeout(function(){throw i})}}function cp(e,t,r){try{var i=e.onCaughtError;i(r.value,{componentStack:r.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(c){setTimeout(function(){throw c})}}function $c(e,t,r){return r=Wn(r),r.tag=3,r.payload={element:null},r.callback=function(){Qs(e,t)},r}function up(e){return e=Wn(e),e.tag=3,e}function dp(e,t,r,i){var c=r.type.getDerivedStateFromError;if(typeof c=="function"){var d=i.value;e.payload=function(){return c(d)},e.callback=function(){cp(t,r,i)}}var y=r.stateNode;y!==null&&typeof y.componentDidCatch=="function"&&(e.callback=function(){cp(t,r,i),typeof c!="function"&&(ir===null?ir=new Set([this]):ir.add(this));var w=i.stack;this.componentDidCatch(i.value,{componentStack:w!==null?w:""})})}function gS(e,t,r,i,c){if(r.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(t=r.alternate,t!==null&&da(t,r,c,!0),r=zt.current,r!==null){switch(r.tag){case 31:case 13:return Kt===null?lo():r.alternate===null&&Ke===0&&(Ke=3),r.flags&=-257,r.flags|=65536,r.lanes=c,i===Bs?r.flags|=16384:(t=r.updateQueue,t===null?r.updateQueue=new Set([i]):t.add(i),vu(e,i,c)),!1;case 22:return r.flags|=65536,i===Bs?r.flags|=16384:(t=r.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([i])},r.updateQueue=t):(r=t.retryQueue,r===null?t.retryQueue=new Set([i]):r.add(i)),vu(e,i,c)),!1}throw Error(o(435,r.tag))}return vu(e,i,c),lo(),!1}if(Ae)return t=zt.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=c,i!==fc&&(e=Error(o(422),{cause:i}),ui(Gt(e,r)))):(i!==fc&&(t=Error(o(423),{cause:i}),ui(Gt(t,r))),e=e.current.alternate,e.flags|=65536,c&=-c,e.lanes|=c,i=Gt(i,r),c=$c(e.stateNode,i,c),jc(e,c),Ke!==4&&(Ke=2)),!1;var d=Error(o(520),{cause:i});if(d=Gt(d,r),Ai===null?Ai=[d]:Ai.push(d),Ke!==4&&(Ke=2),t===null)return!0;i=Gt(i,r),r=t;do{switch(r.tag){case 3:return r.flags|=65536,e=c&-c,r.lanes|=e,e=$c(r.stateNode,i,e),jc(r,e),!1;case 1:if(t=r.type,d=r.stateNode,(r.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||d!==null&&typeof d.componentDidCatch=="function"&&(ir===null||!ir.has(d))))return r.flags|=65536,c&=-c,r.lanes|=c,c=up(c),dp(c,e,r,i),jc(r,c),!1}r=r.return}while(r!==null);return!1}var Kc=Error(o(461)),tt=!1;function ft(e,t,r,i){t.child=e===null?pm(t,null,r,i):_r(t,e.child,r,i)}function fp(e,t,r,i,c){r=r.render;var d=t.ref;if("ref"in i){var y={};for(var w in i)w!=="ref"&&(y[w]=i[w])}else y=i;return kr(t),i=Ac(e,t,r,y,d,c),w=Mc(),e!==null&&!tt?(kc(e,t,c),Rn(e,t,c)):(Ae&&w&&uc(t),t.flags|=1,ft(e,t,i,c),t.child)}function hp(e,t,r,i,c){if(e===null){var d=r.type;return typeof d=="function"&&!oc(d)&&d.defaultProps===void 0&&r.compare===null?(t.tag=15,t.type=d,mp(e,t,d,i,c)):(e=ks(r.type,null,i,t,t.mode,c),e.ref=t.ref,e.return=t,t.child=e)}if(d=e.child,!nu(e,c)){var y=d.memoizedProps;if(r=r.compare,r=r!==null?r:oi,r(y,i)&&e.ref===t.ref)return Rn(e,t,c)}return t.flags|=1,e=Cn(d,i),e.ref=t.ref,e.return=t,t.child=e}function mp(e,t,r,i,c){if(e!==null){var d=e.memoizedProps;if(oi(d,i)&&e.ref===t.ref)if(tt=!1,t.pendingProps=i=d,nu(e,c))(e.flags&131072)!==0&&(tt=!0);else return t.lanes=e.lanes,Rn(e,t,c)}return Zc(e,t,r,i,c)}function pp(e,t,r,i){var c=i.children,d=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if((t.flags&128)!==0){if(d=d!==null?d.baseLanes|r:r,e!==null){for(i=t.child=e.child,c=0;i!==null;)c=c|i.lanes|i.childLanes,i=i.sibling;i=c&~d}else i=0,t.child=null;return gp(e,t,d,r,i)}if((r&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&_s(t,d!==null?d.cachePool:null),d!==null?vm(t,d):Tc(),xm(t);else return i=t.lanes=536870912,gp(e,t,d!==null?d.baseLanes|r:r,r,i)}else d!==null?(_s(t,d.cachePool),vm(t,d),tr(),t.memoizedState=null):(e!==null&&_s(t,null),Tc(),tr());return ft(e,t,c,r),t.child}function wi(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function gp(e,t,r,i,c){var d=xc();return d=d===null?null:{parent:Ie._currentValue,pool:d},t.memoizedState={baseLanes:r,cachePool:d},e!==null&&_s(t,null),Tc(),xm(t),e!==null&&da(e,t,i,!0),t.childLanes=c,null}function Js(e,t){return t=Is({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function yp(e,t,r){return _r(t,e.child,null,r),e=Js(t,t.pendingProps),e.flags|=2,_t(t),t.memoizedState=null,e}function yS(e,t,r){var i=t.pendingProps,c=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(Ae){if(i.mode==="hidden")return e=Js(t,i),t.lanes=536870912,wi(null,e);if(Nc(t),(e=Pe)?(e=Ag(e,$t),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:$n!==null?{id:un,overflow:dn}:null,retryLane:536870912,hydrationErrors:null},r=em(e),r.return=t,t.child=r,ut=t,Pe=null)):e=null,e===null)throw Zn(t);return t.lanes=536870912,null}return Js(t,i)}var d=e.memoizedState;if(d!==null){var y=d.dehydrated;if(Nc(t),c)if(t.flags&256)t.flags&=-257,t=yp(e,t,r);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(o(558));else if(tt||da(e,t,r,!1),c=(r&e.childLanes)!==0,tt||c){if(i=Ue,i!==null&&(y=oh(i,r),y!==0&&y!==d.retryLane))throw d.retryLane=y,Nr(e,y),Dt(i,e,y),Kc;lo(),t=yp(e,t,r)}else e=d.treeContext,Pe=Zt(y.nextSibling),ut=t,Ae=!0,Kn=null,$t=!1,e!==null&&rm(t,e),t=Js(t,i),t.flags|=4096;return t}return e=Cn(e.child,{mode:i.mode,children:i.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Ws(e,t){var r=t.ref;if(r===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof r!="function"&&typeof r!="object")throw Error(o(284));(e===null||e.ref!==r)&&(t.flags|=4194816)}}function Zc(e,t,r,i,c){return kr(t),r=Ac(e,t,r,i,void 0,c),i=Mc(),e!==null&&!tt?(kc(e,t,c),Rn(e,t,c)):(Ae&&i&&uc(t),t.flags|=1,ft(e,t,r,c),t.child)}function vp(e,t,r,i,c,d){return kr(t),t.updateQueue=null,r=Sm(t,i,r,c),bm(e),i=Mc(),e!==null&&!tt?(kc(e,t,d),Rn(e,t,d)):(Ae&&i&&uc(t),t.flags|=1,ft(e,t,r,d),t.child)}function xp(e,t,r,i,c){if(kr(t),t.stateNode===null){var d=oa,y=r.contextType;typeof y=="object"&&y!==null&&(d=dt(y)),d=new r(i,d),t.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,d.updater=Fc,t.stateNode=d,d._reactInternals=t,d=t.stateNode,d.props=i,d.state=t.memoizedState,d.refs={},Sc(t),y=r.contextType,d.context=typeof y=="object"&&y!==null?dt(y):oa,d.state=t.memoizedState,y=r.getDerivedStateFromProps,typeof y=="function"&&(Xc(t,r,y,i),d.state=t.memoizedState),typeof r.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(y=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),y!==d.state&&Fc.enqueueReplaceState(d,d.state,null),yi(t,i,d,c),gi(),d.state=t.memoizedState),typeof d.componentDidMount=="function"&&(t.flags|=4194308),i=!0}else if(e===null){d=t.stateNode;var w=t.memoizedProps,M=Br(r,w);d.props=M;var G=d.context,J=r.contextType;y=oa,typeof J=="object"&&J!==null&&(y=dt(J));var ne=r.getDerivedStateFromProps;J=typeof ne=="function"||typeof d.getSnapshotBeforeUpdate=="function",w=t.pendingProps!==w,J||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(w||G!==y)&&ip(t,d,i,y),Jn=!1;var F=t.memoizedState;d.state=F,yi(t,i,d,c),gi(),G=t.memoizedState,w||F!==G||Jn?(typeof ne=="function"&&(Xc(t,r,ne,i),G=t.memoizedState),(M=Jn||ap(t,r,M,i,F,G,y))?(J||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount()),typeof d.componentDidMount=="function"&&(t.flags|=4194308)):(typeof d.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=i,t.memoizedState=G),d.props=i,d.state=G,d.context=y,i=M):(typeof d.componentDidMount=="function"&&(t.flags|=4194308),i=!1)}else{d=t.stateNode,wc(e,t),y=t.memoizedProps,J=Br(r,y),d.props=J,ne=t.pendingProps,F=d.context,G=r.contextType,M=oa,typeof G=="object"&&G!==null&&(M=dt(G)),w=r.getDerivedStateFromProps,(G=typeof w=="function"||typeof d.getSnapshotBeforeUpdate=="function")||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(y!==ne||F!==M)&&ip(t,d,i,M),Jn=!1,F=t.memoizedState,d.state=F,yi(t,i,d,c),gi();var K=t.memoizedState;y!==ne||F!==K||Jn||e!==null&&e.dependencies!==null&&Os(e.dependencies)?(typeof w=="function"&&(Xc(t,r,w,i),K=t.memoizedState),(J=Jn||ap(t,r,J,i,F,K,M)||e!==null&&e.dependencies!==null&&Os(e.dependencies))?(G||typeof d.UNSAFE_componentWillUpdate!="function"&&typeof d.componentWillUpdate!="function"||(typeof d.componentWillUpdate=="function"&&d.componentWillUpdate(i,K,M),typeof d.UNSAFE_componentWillUpdate=="function"&&d.UNSAFE_componentWillUpdate(i,K,M)),typeof d.componentDidUpdate=="function"&&(t.flags|=4),typeof d.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof d.componentDidUpdate!="function"||y===e.memoizedProps&&F===e.memoizedState||(t.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&F===e.memoizedState||(t.flags|=1024),t.memoizedProps=i,t.memoizedState=K),d.props=i,d.state=K,d.context=M,i=J):(typeof d.componentDidUpdate!="function"||y===e.memoizedProps&&F===e.memoizedState||(t.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&F===e.memoizedState||(t.flags|=1024),i=!1)}return d=i,Ws(e,t),i=(t.flags&128)!==0,d||i?(d=t.stateNode,r=i&&typeof r.getDerivedStateFromError!="function"?null:d.render(),t.flags|=1,e!==null&&i?(t.child=_r(t,e.child,null,c),t.child=_r(t,null,r,c)):ft(e,t,r,c),t.memoizedState=d.state,e=t.child):e=Rn(e,t,c),e}function bp(e,t,r,i){return Ar(),t.flags|=256,ft(e,t,r,i),t.child}var Qc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Jc(e){return{baseLanes:e,cachePool:cm()}}function Wc(e,t,r){return e=e!==null?e.childLanes&~r:0,t&&(e|=Bt),e}function Sp(e,t,r){var i=t.pendingProps,c=!1,d=(t.flags&128)!==0,y;if((y=d)||(y=e!==null&&e.memoizedState===null?!1:(Je.current&2)!==0),y&&(c=!0,t.flags&=-129),y=(t.flags&32)!==0,t.flags&=-33,e===null){if(Ae){if(c?er(t):tr(),(e=Pe)?(e=Ag(e,$t),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:$n!==null?{id:un,overflow:dn}:null,retryLane:536870912,hydrationErrors:null},r=em(e),r.return=t,t.child=r,ut=t,Pe=null)):e=null,e===null)throw Zn(t);return zu(e)?t.lanes=32:t.lanes=536870912,null}var w=i.children;return i=i.fallback,c?(tr(),c=t.mode,w=Is({mode:"hidden",children:w},c),i=Dr(i,c,r,null),w.return=t,i.return=t,w.sibling=i,t.child=w,i=t.child,i.memoizedState=Jc(r),i.childLanes=Wc(e,y,r),t.memoizedState=Qc,wi(null,i)):(er(t),Ic(t,w))}var M=e.memoizedState;if(M!==null&&(w=M.dehydrated,w!==null)){if(d)t.flags&256?(er(t),t.flags&=-257,t=eu(e,t,r)):t.memoizedState!==null?(tr(),t.child=e.child,t.flags|=128,t=null):(tr(),w=i.fallback,c=t.mode,i=Is({mode:"visible",children:i.children},c),w=Dr(w,c,r,null),w.flags|=2,i.return=t,w.return=t,i.sibling=w,t.child=i,_r(t,e.child,null,r),i=t.child,i.memoizedState=Jc(r),i.childLanes=Wc(e,y,r),t.memoizedState=Qc,t=wi(null,i));else if(er(t),zu(w)){if(y=w.nextSibling&&w.nextSibling.dataset,y)var G=y.dgst;y=G,i=Error(o(419)),i.stack="",i.digest=y,ui({value:i,source:null,stack:null}),t=eu(e,t,r)}else if(tt||da(e,t,r,!1),y=(r&e.childLanes)!==0,tt||y){if(y=Ue,y!==null&&(i=oh(y,r),i!==0&&i!==M.retryLane))throw M.retryLane=i,Nr(e,i),Dt(y,e,i),Kc;Ou(w)||lo(),t=eu(e,t,r)}else Ou(w)?(t.flags|=192,t.child=e.child,t=null):(e=M.treeContext,Pe=Zt(w.nextSibling),ut=t,Ae=!0,Kn=null,$t=!1,e!==null&&rm(t,e),t=Ic(t,i.children),t.flags|=4096);return t}return c?(tr(),w=i.fallback,c=t.mode,M=e.child,G=M.sibling,i=Cn(M,{mode:"hidden",children:i.children}),i.subtreeFlags=M.subtreeFlags&65011712,G!==null?w=Cn(G,w):(w=Dr(w,c,r,null),w.flags|=2),w.return=t,i.return=t,i.sibling=w,t.child=i,wi(null,i),i=t.child,w=e.child.memoizedState,w===null?w=Jc(r):(c=w.cachePool,c!==null?(M=Ie._currentValue,c=c.parent!==M?{parent:M,pool:M}:c):c=cm(),w={baseLanes:w.baseLanes|r,cachePool:c}),i.memoizedState=w,i.childLanes=Wc(e,y,r),t.memoizedState=Qc,wi(e.child,i)):(er(t),r=e.child,e=r.sibling,r=Cn(r,{mode:"visible",children:i.children}),r.return=t,r.sibling=null,e!==null&&(y=t.deletions,y===null?(t.deletions=[e],t.flags|=16):y.push(e)),t.child=r,t.memoizedState=null,r)}function Ic(e,t){return t=Is({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function Is(e,t){return e=Ot(22,e,null,t),e.lanes=0,e}function eu(e,t,r){return _r(t,e.child,null,r),e=Ic(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function wp(e,t,r){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t),pc(e.return,t,r)}function tu(e,t,r,i,c,d){var y=e.memoizedState;y===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:i,tail:r,tailMode:c,treeForkCount:d}:(y.isBackwards=t,y.rendering=null,y.renderingStartTime=0,y.last=i,y.tail=r,y.tailMode=c,y.treeForkCount=d)}function jp(e,t,r){var i=t.pendingProps,c=i.revealOrder,d=i.tail;i=i.children;var y=Je.current,w=(y&2)!==0;if(w?(y=y&1|2,t.flags|=128):y&=1,te(Je,y),ft(e,t,i,r),i=Ae?ci:0,!w&&e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&wp(e,r,t);else if(e.tag===19)wp(e,r,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(c){case"forwards":for(r=t.child,c=null;r!==null;)e=r.alternate,e!==null&&qs(e)===null&&(c=r),r=r.sibling;r=c,r===null?(c=t.child,t.child=null):(c=r.sibling,r.sibling=null),tu(t,!1,c,r,d,i);break;case"backwards":case"unstable_legacy-backwards":for(r=null,c=t.child,t.child=null;c!==null;){if(e=c.alternate,e!==null&&qs(e)===null){t.child=c;break}e=c.sibling,c.sibling=r,r=c,c=e}tu(t,!0,r,null,d,i);break;case"together":tu(t,!1,null,null,void 0,i);break;default:t.memoizedState=null}return t.child}function Rn(e,t,r){if(e!==null&&(t.dependencies=e.dependencies),ar|=t.lanes,(r&t.childLanes)===0)if(e!==null){if(da(e,t,r,!1),(r&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(o(153));if(t.child!==null){for(e=t.child,r=Cn(e,e.pendingProps),t.child=r,r.return=t;e.sibling!==null;)e=e.sibling,r=r.sibling=Cn(e,e.pendingProps),r.return=t;r.sibling=null}return t.child}function nu(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&Os(e)))}function vS(e,t,r){switch(t.tag){case 3:ie(t,t.stateNode.containerInfo),Qn(t,Ie,e.memoizedState.cache),Ar();break;case 27:case 5:de(t);break;case 4:ie(t,t.stateNode.containerInfo);break;case 10:Qn(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Nc(t),null;break;case 13:var i=t.memoizedState;if(i!==null)return i.dehydrated!==null?(er(t),t.flags|=128,null):(r&t.child.childLanes)!==0?Sp(e,t,r):(er(t),e=Rn(e,t,r),e!==null?e.sibling:null);er(t);break;case 19:var c=(e.flags&128)!==0;if(i=(r&t.childLanes)!==0,i||(da(e,t,r,!1),i=(r&t.childLanes)!==0),c){if(i)return jp(e,t,r);t.flags|=128}if(c=t.memoizedState,c!==null&&(c.rendering=null,c.tail=null,c.lastEffect=null),te(Je,Je.current),i)break;return null;case 22:return t.lanes=0,pp(e,t,r,t.pendingProps);case 24:Qn(t,Ie,e.memoizedState.cache)}return Rn(e,t,r)}function Ep(e,t,r){if(e!==null)if(e.memoizedProps!==t.pendingProps)tt=!0;else{if(!nu(e,r)&&(t.flags&128)===0)return tt=!1,vS(e,t,r);tt=(e.flags&131072)!==0}else tt=!1,Ae&&(t.flags&1048576)!==0&&nm(t,ci,t.index);switch(t.lanes=0,t.tag){case 16:e:{var i=t.pendingProps;if(e=Or(t.elementType),t.type=e,typeof e=="function")oc(e)?(i=Br(e,i),t.tag=1,t=xp(null,t,e,i,r)):(t.tag=0,t=Zc(null,t,e,i,r));else{if(e!=null){var c=e.$$typeof;if(c===R){t.tag=11,t=fp(null,t,e,i,r);break e}else if(c===A){t.tag=14,t=hp(null,t,e,i,r);break e}}throw t=Z(e)||e,Error(o(306,t,""))}}return t;case 0:return Zc(e,t,t.type,t.pendingProps,r);case 1:return i=t.type,c=Br(i,t.pendingProps),xp(e,t,i,c,r);case 3:e:{if(ie(t,t.stateNode.containerInfo),e===null)throw Error(o(387));i=t.pendingProps;var d=t.memoizedState;c=d.element,wc(e,t),yi(t,i,null,r);var y=t.memoizedState;if(i=y.cache,Qn(t,Ie,i),i!==d.cache&&gc(t,[Ie],r,!0),gi(),i=y.element,d.isDehydrated)if(d={element:i,isDehydrated:!1,cache:y.cache},t.updateQueue.baseState=d,t.memoizedState=d,t.flags&256){t=bp(e,t,i,r);break e}else if(i!==c){c=Gt(Error(o(424)),t),ui(c),t=bp(e,t,i,r);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Pe=Zt(e.firstChild),ut=t,Ae=!0,Kn=null,$t=!0,r=pm(t,null,i,r),t.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling}else{if(Ar(),i===c){t=Rn(e,t,r);break e}ft(e,t,i,r)}t=t.child}return t;case 26:return Ws(e,t),e===null?(r=_g(t.type,null,t.pendingProps,null))?t.memoizedState=r:Ae||(r=t.type,e=t.pendingProps,i=go(me.current).createElement(r),i[ct]=t,i[wt]=e,ht(i,r,e),st(i),t.stateNode=i):t.memoizedState=_g(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return de(t),e===null&&Ae&&(i=t.stateNode=Rg(t.type,t.pendingProps,me.current),ut=t,$t=!0,c=Pe,cr(t.type)?(_u=c,Pe=Zt(i.firstChild)):Pe=c),ft(e,t,t.pendingProps.children,r),Ws(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&Ae&&((c=i=Pe)&&(i=KS(i,t.type,t.pendingProps,$t),i!==null?(t.stateNode=i,ut=t,Pe=Zt(i.firstChild),$t=!1,c=!0):c=!1),c||Zn(t)),de(t),c=t.type,d=t.pendingProps,y=e!==null?e.memoizedProps:null,i=d.children,Mu(c,d)?i=null:y!==null&&Mu(c,y)&&(t.flags|=32),t.memoizedState!==null&&(c=Ac(e,t,cS,null,null,r),Bi._currentValue=c),Ws(e,t),ft(e,t,i,r),t.child;case 6:return e===null&&Ae&&((e=r=Pe)&&(r=ZS(r,t.pendingProps,$t),r!==null?(t.stateNode=r,ut=t,Pe=null,e=!0):e=!1),e||Zn(t)),null;case 13:return Sp(e,t,r);case 4:return ie(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=_r(t,null,i,r):ft(e,t,i,r),t.child;case 11:return fp(e,t,t.type,t.pendingProps,r);case 7:return ft(e,t,t.pendingProps,r),t.child;case 8:return ft(e,t,t.pendingProps.children,r),t.child;case 12:return ft(e,t,t.pendingProps.children,r),t.child;case 10:return i=t.pendingProps,Qn(t,t.type,i.value),ft(e,t,i.children,r),t.child;case 9:return c=t.type._context,i=t.pendingProps.children,kr(t),c=dt(c),i=i(c),t.flags|=1,ft(e,t,i,r),t.child;case 14:return hp(e,t,t.type,t.pendingProps,r);case 15:return mp(e,t,t.type,t.pendingProps,r);case 19:return jp(e,t,r);case 31:return yS(e,t,r);case 22:return pp(e,t,r,t.pendingProps);case 24:return kr(t),i=dt(Ie),e===null?(c=xc(),c===null&&(c=Ue,d=yc(),c.pooledCache=d,d.refCount++,d!==null&&(c.pooledCacheLanes|=r),c=d),t.memoizedState={parent:i,cache:c},Sc(t),Qn(t,Ie,c)):((e.lanes&r)!==0&&(wc(e,t),yi(t,null,null,r),gi()),c=e.memoizedState,d=t.memoizedState,c.parent!==i?(c={parent:i,cache:i},t.memoizedState=c,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=c),Qn(t,Ie,i)):(i=d.cache,Qn(t,Ie,i),i!==c.cache&&gc(t,[Ie],r,!0))),ft(e,t,t.pendingProps.children,r),t.child;case 29:throw t.pendingProps}throw Error(o(156,t.tag))}function On(e){e.flags|=4}function ru(e,t,r,i,c){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(c&335544128)===c)if(e.stateNode.complete)e.flags|=8192;else if(Jp())e.flags|=8192;else throw zr=Bs,bc}else e.flags&=-16777217}function Tp(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Hg(t))if(Jp())e.flags|=8192;else throw zr=Bs,bc}function eo(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?ah():536870912,e.lanes|=t,ja|=t)}function ji(e,t){if(!Ae)switch(e.tailMode){case"hidden":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var i=null;r!==null;)r.alternate!==null&&(i=r),r=r.sibling;i===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null}}function Ge(e){var t=e.alternate!==null&&e.alternate.child===e.child,r=0,i=0;if(t)for(var c=e.child;c!==null;)r|=c.lanes|c.childLanes,i|=c.subtreeFlags&65011712,i|=c.flags&65011712,c.return=e,c=c.sibling;else for(c=e.child;c!==null;)r|=c.lanes|c.childLanes,i|=c.subtreeFlags,i|=c.flags,c.return=e,c=c.sibling;return e.subtreeFlags|=i,e.childLanes=r,t}function xS(e,t,r){var i=t.pendingProps;switch(dc(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ge(t),null;case 1:return Ge(t),null;case 3:return r=t.stateNode,i=null,e!==null&&(i=e.memoizedState.cache),t.memoizedState.cache!==i&&(t.flags|=2048),An(Ie),I(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(ua(t)?On(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,hc())),Ge(t),null;case 26:var c=t.type,d=t.memoizedState;return e===null?(On(t),d!==null?(Ge(t),Tp(t,d)):(Ge(t),ru(t,c,null,i,r))):d?d!==e.memoizedState?(On(t),Ge(t),Tp(t,d)):(Ge(t),t.flags&=-16777217):(e=e.memoizedProps,e!==i&&On(t),Ge(t),ru(t,c,e,i,r)),null;case 27:if(re(t),r=me.current,c=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&On(t);else{if(!i){if(t.stateNode===null)throw Error(o(166));return Ge(t),null}e=oe.current,ua(t)?am(t):(e=Rg(c,i,r),t.stateNode=e,On(t))}return Ge(t),null;case 5:if(re(t),c=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&On(t);else{if(!i){if(t.stateNode===null)throw Error(o(166));return Ge(t),null}if(d=oe.current,ua(t))am(t);else{var y=go(me.current);switch(d){case 1:d=y.createElementNS("http://www.w3.org/2000/svg",c);break;case 2:d=y.createElementNS("http://www.w3.org/1998/Math/MathML",c);break;default:switch(c){case"svg":d=y.createElementNS("http://www.w3.org/2000/svg",c);break;case"math":d=y.createElementNS("http://www.w3.org/1998/Math/MathML",c);break;case"script":d=y.createElement("div"),d.innerHTML="<script><\/script>",d=d.removeChild(d.firstChild);break;case"select":d=typeof i.is=="string"?y.createElement("select",{is:i.is}):y.createElement("select"),i.multiple?d.multiple=!0:i.size&&(d.size=i.size);break;default:d=typeof i.is=="string"?y.createElement(c,{is:i.is}):y.createElement(c)}}d[ct]=t,d[wt]=i;e:for(y=t.child;y!==null;){if(y.tag===5||y.tag===6)d.appendChild(y.stateNode);else if(y.tag!==4&&y.tag!==27&&y.child!==null){y.child.return=y,y=y.child;continue}if(y===t)break e;for(;y.sibling===null;){if(y.return===null||y.return===t)break e;y=y.return}y.sibling.return=y.return,y=y.sibling}t.stateNode=d;e:switch(ht(d,c,i),c){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}i&&On(t)}}return Ge(t),ru(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,r),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==i&&On(t);else{if(typeof i!="string"&&t.stateNode===null)throw Error(o(166));if(e=me.current,ua(t)){if(e=t.stateNode,r=t.memoizedProps,i=null,c=ut,c!==null)switch(c.tag){case 27:case 5:i=c.memoizedProps}e[ct]=t,e=!!(e.nodeValue===r||i!==null&&i.suppressHydrationWarning===!0||Sg(e.nodeValue,r)),e||Zn(t,!0)}else e=go(e).createTextNode(i),e[ct]=t,t.stateNode=e}return Ge(t),null;case 31:if(r=t.memoizedState,e===null||e.memoizedState!==null){if(i=ua(t),r!==null){if(e===null){if(!i)throw Error(o(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(o(557));e[ct]=t}else Ar(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ge(t),e=!1}else r=hc(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=r),e=!0;if(!e)return t.flags&256?(_t(t),t):(_t(t),null);if((t.flags&128)!==0)throw Error(o(558))}return Ge(t),null;case 13:if(i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(c=ua(t),i!==null&&i.dehydrated!==null){if(e===null){if(!c)throw Error(o(318));if(c=t.memoizedState,c=c!==null?c.dehydrated:null,!c)throw Error(o(317));c[ct]=t}else Ar(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ge(t),c=!1}else c=hc(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=c),c=!0;if(!c)return t.flags&256?(_t(t),t):(_t(t),null)}return _t(t),(t.flags&128)!==0?(t.lanes=r,t):(r=i!==null,e=e!==null&&e.memoizedState!==null,r&&(i=t.child,c=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(c=i.alternate.memoizedState.cachePool.pool),d=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(d=i.memoizedState.cachePool.pool),d!==c&&(i.flags|=2048)),r!==e&&r&&(t.child.flags|=8192),eo(t,t.updateQueue),Ge(t),null);case 4:return I(),e===null&&Tu(t.stateNode.containerInfo),Ge(t),null;case 10:return An(t.type),Ge(t),null;case 19:if(O(Je),i=t.memoizedState,i===null)return Ge(t),null;if(c=(t.flags&128)!==0,d=i.rendering,d===null)if(c)ji(i,!1);else{if(Ke!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(d=qs(e),d!==null){for(t.flags|=128,ji(i,!1),e=d.updateQueue,t.updateQueue=e,eo(t,e),t.subtreeFlags=0,e=r,r=t.child;r!==null;)Ih(r,e),r=r.sibling;return te(Je,Je.current&1|2),Ae&&Nn(t,i.treeForkCount),t.child}e=e.sibling}i.tail!==null&&At()>io&&(t.flags|=128,c=!0,ji(i,!1),t.lanes=4194304)}else{if(!c)if(e=qs(d),e!==null){if(t.flags|=128,c=!0,e=e.updateQueue,t.updateQueue=e,eo(t,e),ji(i,!0),i.tail===null&&i.tailMode==="hidden"&&!d.alternate&&!Ae)return Ge(t),null}else 2*At()-i.renderingStartTime>io&&r!==536870912&&(t.flags|=128,c=!0,ji(i,!1),t.lanes=4194304);i.isBackwards?(d.sibling=t.child,t.child=d):(e=i.last,e!==null?e.sibling=d:t.child=d,i.last=d)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=At(),e.sibling=null,r=Je.current,te(Je,c?r&1|2:r&1),Ae&&Nn(t,i.treeForkCount),e):(Ge(t),null);case 22:case 23:return _t(t),Cc(),i=t.memoizedState!==null,e!==null?e.memoizedState!==null!==i&&(t.flags|=8192):i&&(t.flags|=8192),i?(r&536870912)!==0&&(t.flags&128)===0&&(Ge(t),t.subtreeFlags&6&&(t.flags|=8192)):Ge(t),r=t.updateQueue,r!==null&&eo(t,r.retryQueue),r=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(r=e.memoizedState.cachePool.pool),i=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(i=t.memoizedState.cachePool.pool),i!==r&&(t.flags|=2048),e!==null&&O(Rr),null;case 24:return r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),An(Ie),Ge(t),null;case 25:return null;case 30:return null}throw Error(o(156,t.tag))}function bS(e,t){switch(dc(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return An(Ie),I(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return re(t),null;case 31:if(t.memoizedState!==null){if(_t(t),t.alternate===null)throw Error(o(340));Ar()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(_t(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(o(340));Ar()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return O(Je),null;case 4:return I(),null;case 10:return An(t.type),null;case 22:case 23:return _t(t),Cc(),e!==null&&O(Rr),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return An(Ie),null;case 25:return null;default:return null}}function Cp(e,t){switch(dc(t),t.tag){case 3:An(Ie),I();break;case 26:case 27:case 5:re(t);break;case 4:I();break;case 31:t.memoizedState!==null&&_t(t);break;case 13:_t(t);break;case 19:O(Je);break;case 10:An(t.type);break;case 22:case 23:_t(t),Cc(),e!==null&&O(Rr);break;case 24:An(Ie)}}function Ei(e,t){try{var r=t.updateQueue,i=r!==null?r.lastEffect:null;if(i!==null){var c=i.next;r=c;do{if((r.tag&e)===e){i=void 0;var d=r.create,y=r.inst;i=d(),y.destroy=i}r=r.next}while(r!==c)}}catch(w){_e(t,t.return,w)}}function nr(e,t,r){try{var i=t.updateQueue,c=i!==null?i.lastEffect:null;if(c!==null){var d=c.next;i=d;do{if((i.tag&e)===e){var y=i.inst,w=y.destroy;if(w!==void 0){y.destroy=void 0,c=t;var M=r,G=w;try{G()}catch(J){_e(c,M,J)}}}i=i.next}while(i!==d)}}catch(J){_e(t,t.return,J)}}function Np(e){var t=e.updateQueue;if(t!==null){var r=e.stateNode;try{ym(t,r)}catch(i){_e(e,e.return,i)}}}function Dp(e,t,r){r.props=Br(e.type,e.memoizedProps),r.state=e.memoizedState;try{r.componentWillUnmount()}catch(i){_e(e,t,i)}}function Ti(e,t){try{var r=e.ref;if(r!==null){switch(e.tag){case 26:case 27:case 5:var i=e.stateNode;break;case 30:i=e.stateNode;break;default:i=e.stateNode}typeof r=="function"?e.refCleanup=r(i):r.current=i}}catch(c){_e(e,t,c)}}function fn(e,t){var r=e.ref,i=e.refCleanup;if(r!==null)if(typeof i=="function")try{i()}catch(c){_e(e,t,c)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof r=="function")try{r(null)}catch(c){_e(e,t,c)}else r.current=null}function Ap(e){var t=e.type,r=e.memoizedProps,i=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":r.autoFocus&&i.focus();break e;case"img":r.src?i.src=r.src:r.srcSet&&(i.srcset=r.srcSet)}}catch(c){_e(e,e.return,c)}}function au(e,t,r){try{var i=e.stateNode;YS(i,e.type,r,t),i[wt]=t}catch(c){_e(e,e.return,c)}}function Mp(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&cr(e.type)||e.tag===4}function iu(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Mp(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&cr(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function su(e,t,r){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?(r.nodeType===9?r.body:r.nodeName==="HTML"?r.ownerDocument.body:r).insertBefore(e,t):(t=r.nodeType===9?r.body:r.nodeName==="HTML"?r.ownerDocument.body:r,t.appendChild(e),r=r._reactRootContainer,r!=null||t.onclick!==null||(t.onclick=En));else if(i!==4&&(i===27&&cr(e.type)&&(r=e.stateNode,t=null),e=e.child,e!==null))for(su(e,t,r),e=e.sibling;e!==null;)su(e,t,r),e=e.sibling}function to(e,t,r){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?r.insertBefore(e,t):r.appendChild(e);else if(i!==4&&(i===27&&cr(e.type)&&(r=e.stateNode),e=e.child,e!==null))for(to(e,t,r),e=e.sibling;e!==null;)to(e,t,r),e=e.sibling}function kp(e){var t=e.stateNode,r=e.memoizedProps;try{for(var i=e.type,c=t.attributes;c.length;)t.removeAttributeNode(c[0]);ht(t,i,r),t[ct]=e,t[wt]=r}catch(d){_e(e,e.return,d)}}var zn=!1,nt=!1,ou=!1,Rp=typeof WeakSet=="function"?WeakSet:Set,ot=null;function SS(e,t){if(e=e.containerInfo,Du=jo,e=Gh(e),ec(e)){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{r=(r=e.ownerDocument)&&r.defaultView||window;var i=r.getSelection&&r.getSelection();if(i&&i.rangeCount!==0){r=i.anchorNode;var c=i.anchorOffset,d=i.focusNode;i=i.focusOffset;try{r.nodeType,d.nodeType}catch{r=null;break e}var y=0,w=-1,M=-1,G=0,J=0,ne=e,F=null;t:for(;;){for(var K;ne!==r||c!==0&&ne.nodeType!==3||(w=y+c),ne!==d||i!==0&&ne.nodeType!==3||(M=y+i),ne.nodeType===3&&(y+=ne.nodeValue.length),(K=ne.firstChild)!==null;)F=ne,ne=K;for(;;){if(ne===e)break t;if(F===r&&++G===c&&(w=y),F===d&&++J===i&&(M=y),(K=ne.nextSibling)!==null)break;ne=F,F=ne.parentNode}ne=K}r=w===-1||M===-1?null:{start:w,end:M}}else r=null}r=r||{start:0,end:0}}else r=null;for(Au={focusedElem:e,selectionRange:r},jo=!1,ot=t;ot!==null;)if(t=ot,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,ot=e;else for(;ot!==null;){switch(t=ot,d=t.alternate,e=t.flags,t.tag){case 0:if((e&4)!==0&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(r=0;r<e.length;r++)c=e[r],c.ref.impl=c.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&d!==null){e=void 0,r=t,c=d.memoizedProps,d=d.memoizedState,i=r.stateNode;try{var fe=Br(r.type,c);e=i.getSnapshotBeforeUpdate(fe,d),i.__reactInternalSnapshotBeforeUpdate=e}catch(be){_e(r,r.return,be)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,r=e.nodeType,r===9)Ru(e);else if(r===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Ru(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(o(163))}if(e=t.sibling,e!==null){e.return=t.return,ot=e;break}ot=t.return}}function Op(e,t,r){var i=r.flags;switch(r.tag){case 0:case 11:case 15:Vn(e,r),i&4&&Ei(5,r);break;case 1:if(Vn(e,r),i&4)if(e=r.stateNode,t===null)try{e.componentDidMount()}catch(y){_e(r,r.return,y)}else{var c=Br(r.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(c,t,e.__reactInternalSnapshotBeforeUpdate)}catch(y){_e(r,r.return,y)}}i&64&&Np(r),i&512&&Ti(r,r.return);break;case 3:if(Vn(e,r),i&64&&(e=r.updateQueue,e!==null)){if(t=null,r.child!==null)switch(r.child.tag){case 27:case 5:t=r.child.stateNode;break;case 1:t=r.child.stateNode}try{ym(e,t)}catch(y){_e(r,r.return,y)}}break;case 27:t===null&&i&4&&kp(r);case 26:case 5:Vn(e,r),t===null&&i&4&&Ap(r),i&512&&Ti(r,r.return);break;case 12:Vn(e,r);break;case 31:Vn(e,r),i&4&&Vp(e,r);break;case 13:Vn(e,r),i&4&&Bp(e,r),i&64&&(e=r.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(r=MS.bind(null,r),QS(e,r))));break;case 22:if(i=r.memoizedState!==null||zn,!i){t=t!==null&&t.memoizedState!==null||nt,c=zn;var d=nt;zn=i,(nt=t)&&!d?Bn(e,r,(r.subtreeFlags&8772)!==0):Vn(e,r),zn=c,nt=d}break;case 30:break;default:Vn(e,r)}}function zp(e){var t=e.alternate;t!==null&&(e.alternate=null,zp(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Bl(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Xe=null,Et=!1;function _n(e,t,r){for(r=r.child;r!==null;)_p(e,t,r),r=r.sibling}function _p(e,t,r){if(Mt&&typeof Mt.onCommitFiberUnmount=="function")try{Mt.onCommitFiberUnmount(Za,r)}catch{}switch(r.tag){case 26:nt||fn(r,t),_n(e,t,r),r.memoizedState?r.memoizedState.count--:r.stateNode&&(r=r.stateNode,r.parentNode.removeChild(r));break;case 27:nt||fn(r,t);var i=Xe,c=Et;cr(r.type)&&(Xe=r.stateNode,Et=!1),_n(e,t,r),zi(r.stateNode),Xe=i,Et=c;break;case 5:nt||fn(r,t);case 6:if(i=Xe,c=Et,Xe=null,_n(e,t,r),Xe=i,Et=c,Xe!==null)if(Et)try{(Xe.nodeType===9?Xe.body:Xe.nodeName==="HTML"?Xe.ownerDocument.body:Xe).removeChild(r.stateNode)}catch(d){_e(r,t,d)}else try{Xe.removeChild(r.stateNode)}catch(d){_e(r,t,d)}break;case 18:Xe!==null&&(Et?(e=Xe,Ng(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,r.stateNode),ka(e)):Ng(Xe,r.stateNode));break;case 4:i=Xe,c=Et,Xe=r.stateNode.containerInfo,Et=!0,_n(e,t,r),Xe=i,Et=c;break;case 0:case 11:case 14:case 15:nr(2,r,t),nt||nr(4,r,t),_n(e,t,r);break;case 1:nt||(fn(r,t),i=r.stateNode,typeof i.componentWillUnmount=="function"&&Dp(r,t,i)),_n(e,t,r);break;case 21:_n(e,t,r);break;case 22:nt=(i=nt)||r.memoizedState!==null,_n(e,t,r),nt=i;break;default:_n(e,t,r)}}function Vp(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{ka(e)}catch(r){_e(t,t.return,r)}}}function Bp(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{ka(e)}catch(r){_e(t,t.return,r)}}function wS(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new Rp),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new Rp),t;default:throw Error(o(435,e.tag))}}function no(e,t){var r=wS(e);t.forEach(function(i){if(!r.has(i)){r.add(i);var c=kS.bind(null,e,i);i.then(c,c)}})}function Tt(e,t){var r=t.deletions;if(r!==null)for(var i=0;i<r.length;i++){var c=r[i],d=e,y=t,w=y;e:for(;w!==null;){switch(w.tag){case 27:if(cr(w.type)){Xe=w.stateNode,Et=!1;break e}break;case 5:Xe=w.stateNode,Et=!1;break e;case 3:case 4:Xe=w.stateNode.containerInfo,Et=!0;break e}w=w.return}if(Xe===null)throw Error(o(160));_p(d,y,c),Xe=null,Et=!1,d=c.alternate,d!==null&&(d.return=null),c.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Lp(t,e),t=t.sibling}var rn=null;function Lp(e,t){var r=e.alternate,i=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Tt(t,e),Ct(e),i&4&&(nr(3,e,e.return),Ei(3,e),nr(5,e,e.return));break;case 1:Tt(t,e),Ct(e),i&512&&(nt||r===null||fn(r,r.return)),i&64&&zn&&(e=e.updateQueue,e!==null&&(i=e.callbacks,i!==null&&(r=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=r===null?i:r.concat(i))));break;case 26:var c=rn;if(Tt(t,e),Ct(e),i&512&&(nt||r===null||fn(r,r.return)),i&4){var d=r!==null?r.memoizedState:null;if(i=e.memoizedState,r===null)if(i===null)if(e.stateNode===null){e:{i=e.type,r=e.memoizedProps,c=c.ownerDocument||c;t:switch(i){case"title":d=c.getElementsByTagName("title")[0],(!d||d[Wa]||d[ct]||d.namespaceURI==="http://www.w3.org/2000/svg"||d.hasAttribute("itemprop"))&&(d=c.createElement(i),c.head.insertBefore(d,c.querySelector("head > title"))),ht(d,i,r),d[ct]=e,st(d),i=d;break e;case"link":var y=Lg("link","href",c).get(i+(r.href||""));if(y){for(var w=0;w<y.length;w++)if(d=y[w],d.getAttribute("href")===(r.href==null||r.href===""?null:r.href)&&d.getAttribute("rel")===(r.rel==null?null:r.rel)&&d.getAttribute("title")===(r.title==null?null:r.title)&&d.getAttribute("crossorigin")===(r.crossOrigin==null?null:r.crossOrigin)){y.splice(w,1);break t}}d=c.createElement(i),ht(d,i,r),c.head.appendChild(d);break;case"meta":if(y=Lg("meta","content",c).get(i+(r.content||""))){for(w=0;w<y.length;w++)if(d=y[w],d.getAttribute("content")===(r.content==null?null:""+r.content)&&d.getAttribute("name")===(r.name==null?null:r.name)&&d.getAttribute("property")===(r.property==null?null:r.property)&&d.getAttribute("http-equiv")===(r.httpEquiv==null?null:r.httpEquiv)&&d.getAttribute("charset")===(r.charSet==null?null:r.charSet)){y.splice(w,1);break t}}d=c.createElement(i),ht(d,i,r),c.head.appendChild(d);break;default:throw Error(o(468,i))}d[ct]=e,st(d),i=d}e.stateNode=i}else Ug(c,e.type,e.stateNode);else e.stateNode=Bg(c,i,e.memoizedProps);else d!==i?(d===null?r.stateNode!==null&&(r=r.stateNode,r.parentNode.removeChild(r)):d.count--,i===null?Ug(c,e.type,e.stateNode):Bg(c,i,e.memoizedProps)):i===null&&e.stateNode!==null&&au(e,e.memoizedProps,r.memoizedProps)}break;case 27:Tt(t,e),Ct(e),i&512&&(nt||r===null||fn(r,r.return)),r!==null&&i&4&&au(e,e.memoizedProps,r.memoizedProps);break;case 5:if(Tt(t,e),Ct(e),i&512&&(nt||r===null||fn(r,r.return)),e.flags&32){c=e.stateNode;try{ea(c,"")}catch(fe){_e(e,e.return,fe)}}i&4&&e.stateNode!=null&&(c=e.memoizedProps,au(e,c,r!==null?r.memoizedProps:c)),i&1024&&(ou=!0);break;case 6:if(Tt(t,e),Ct(e),i&4){if(e.stateNode===null)throw Error(o(162));i=e.memoizedProps,r=e.stateNode;try{r.nodeValue=i}catch(fe){_e(e,e.return,fe)}}break;case 3:if(xo=null,c=rn,rn=yo(t.containerInfo),Tt(t,e),rn=c,Ct(e),i&4&&r!==null&&r.memoizedState.isDehydrated)try{ka(t.containerInfo)}catch(fe){_e(e,e.return,fe)}ou&&(ou=!1,Up(e));break;case 4:i=rn,rn=yo(e.stateNode.containerInfo),Tt(t,e),Ct(e),rn=i;break;case 12:Tt(t,e),Ct(e);break;case 31:Tt(t,e),Ct(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,no(e,i)));break;case 13:Tt(t,e),Ct(e),e.child.flags&8192&&e.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(ao=At()),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,no(e,i)));break;case 22:c=e.memoizedState!==null;var M=r!==null&&r.memoizedState!==null,G=zn,J=nt;if(zn=G||c,nt=J||M,Tt(t,e),nt=J,zn=G,Ct(e),i&8192)e:for(t=e.stateNode,t._visibility=c?t._visibility&-2:t._visibility|1,c&&(r===null||M||zn||nt||Lr(e)),r=null,t=e;;){if(t.tag===5||t.tag===26){if(r===null){M=r=t;try{if(d=M.stateNode,c)y=d.style,typeof y.setProperty=="function"?y.setProperty("display","none","important"):y.display="none";else{w=M.stateNode;var ne=M.memoizedProps.style,F=ne!=null&&ne.hasOwnProperty("display")?ne.display:null;w.style.display=F==null||typeof F=="boolean"?"":(""+F).trim()}}catch(fe){_e(M,M.return,fe)}}}else if(t.tag===6){if(r===null){M=t;try{M.stateNode.nodeValue=c?"":M.memoizedProps}catch(fe){_e(M,M.return,fe)}}}else if(t.tag===18){if(r===null){M=t;try{var K=M.stateNode;c?Dg(K,!0):Dg(M.stateNode,!1)}catch(fe){_e(M,M.return,fe)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;r===t&&(r=null),t=t.return}r===t&&(r=null),t.sibling.return=t.return,t=t.sibling}i&4&&(i=e.updateQueue,i!==null&&(r=i.retryQueue,r!==null&&(i.retryQueue=null,no(e,r))));break;case 19:Tt(t,e),Ct(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,no(e,i)));break;case 30:break;case 21:break;default:Tt(t,e),Ct(e)}}function Ct(e){var t=e.flags;if(t&2){try{for(var r,i=e.return;i!==null;){if(Mp(i)){r=i;break}i=i.return}if(r==null)throw Error(o(160));switch(r.tag){case 27:var c=r.stateNode,d=iu(e);to(e,d,c);break;case 5:var y=r.stateNode;r.flags&32&&(ea(y,""),r.flags&=-33);var w=iu(e);to(e,w,y);break;case 3:case 4:var M=r.stateNode.containerInfo,G=iu(e);su(e,G,M);break;default:throw Error(o(161))}}catch(J){_e(e,e.return,J)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Up(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Up(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function Vn(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)Op(e,t.alternate,t),t=t.sibling}function Lr(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:nr(4,t,t.return),Lr(t);break;case 1:fn(t,t.return);var r=t.stateNode;typeof r.componentWillUnmount=="function"&&Dp(t,t.return,r),Lr(t);break;case 27:zi(t.stateNode);case 26:case 5:fn(t,t.return),Lr(t);break;case 22:t.memoizedState===null&&Lr(t);break;case 30:Lr(t);break;default:Lr(t)}e=e.sibling}}function Bn(e,t,r){for(r=r&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var i=t.alternate,c=e,d=t,y=d.flags;switch(d.tag){case 0:case 11:case 15:Bn(c,d,r),Ei(4,d);break;case 1:if(Bn(c,d,r),i=d,c=i.stateNode,typeof c.componentDidMount=="function")try{c.componentDidMount()}catch(G){_e(i,i.return,G)}if(i=d,c=i.updateQueue,c!==null){var w=i.stateNode;try{var M=c.shared.hiddenCallbacks;if(M!==null)for(c.shared.hiddenCallbacks=null,c=0;c<M.length;c++)gm(M[c],w)}catch(G){_e(i,i.return,G)}}r&&y&64&&Np(d),Ti(d,d.return);break;case 27:kp(d);case 26:case 5:Bn(c,d,r),r&&i===null&&y&4&&Ap(d),Ti(d,d.return);break;case 12:Bn(c,d,r);break;case 31:Bn(c,d,r),r&&y&4&&Vp(c,d);break;case 13:Bn(c,d,r),r&&y&4&&Bp(c,d);break;case 22:d.memoizedState===null&&Bn(c,d,r),Ti(d,d.return);break;case 30:break;default:Bn(c,d,r)}t=t.sibling}}function lu(e,t){var r=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(r=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==r&&(e!=null&&e.refCount++,r!=null&&di(r))}function cu(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&di(e))}function an(e,t,r,i){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Hp(e,t,r,i),t=t.sibling}function Hp(e,t,r,i){var c=t.flags;switch(t.tag){case 0:case 11:case 15:an(e,t,r,i),c&2048&&Ei(9,t);break;case 1:an(e,t,r,i);break;case 3:an(e,t,r,i),c&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&di(e)));break;case 12:if(c&2048){an(e,t,r,i),e=t.stateNode;try{var d=t.memoizedProps,y=d.id,w=d.onPostCommit;typeof w=="function"&&w(y,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(M){_e(t,t.return,M)}}else an(e,t,r,i);break;case 31:an(e,t,r,i);break;case 13:an(e,t,r,i);break;case 23:break;case 22:d=t.stateNode,y=t.alternate,t.memoizedState!==null?d._visibility&2?an(e,t,r,i):Ci(e,t):d._visibility&2?an(e,t,r,i):(d._visibility|=2,ba(e,t,r,i,(t.subtreeFlags&10256)!==0||!1)),c&2048&&lu(y,t);break;case 24:an(e,t,r,i),c&2048&&cu(t.alternate,t);break;default:an(e,t,r,i)}}function ba(e,t,r,i,c){for(c=c&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var d=e,y=t,w=r,M=i,G=y.flags;switch(y.tag){case 0:case 11:case 15:ba(d,y,w,M,c),Ei(8,y);break;case 23:break;case 22:var J=y.stateNode;y.memoizedState!==null?J._visibility&2?ba(d,y,w,M,c):Ci(d,y):(J._visibility|=2,ba(d,y,w,M,c)),c&&G&2048&&lu(y.alternate,y);break;case 24:ba(d,y,w,M,c),c&&G&2048&&cu(y.alternate,y);break;default:ba(d,y,w,M,c)}t=t.sibling}}function Ci(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var r=e,i=t,c=i.flags;switch(i.tag){case 22:Ci(r,i),c&2048&&lu(i.alternate,i);break;case 24:Ci(r,i),c&2048&&cu(i.alternate,i);break;default:Ci(r,i)}t=t.sibling}}var Ni=8192;function Sa(e,t,r){if(e.subtreeFlags&Ni)for(e=e.child;e!==null;)qp(e,t,r),e=e.sibling}function qp(e,t,r){switch(e.tag){case 26:Sa(e,t,r),e.flags&Ni&&e.memoizedState!==null&&lw(r,rn,e.memoizedState,e.memoizedProps);break;case 5:Sa(e,t,r);break;case 3:case 4:var i=rn;rn=yo(e.stateNode.containerInfo),Sa(e,t,r),rn=i;break;case 22:e.memoizedState===null&&(i=e.alternate,i!==null&&i.memoizedState!==null?(i=Ni,Ni=16777216,Sa(e,t,r),Ni=i):Sa(e,t,r));break;default:Sa(e,t,r)}}function Yp(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Di(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var r=0;r<t.length;r++){var i=t[r];ot=i,Gp(i,e)}Yp(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Pp(e),e=e.sibling}function Pp(e){switch(e.tag){case 0:case 11:case 15:Di(e),e.flags&2048&&nr(9,e,e.return);break;case 3:Di(e);break;case 12:Di(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,ro(e)):Di(e);break;default:Di(e)}}function ro(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var r=0;r<t.length;r++){var i=t[r];ot=i,Gp(i,e)}Yp(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:nr(8,t,t.return),ro(t);break;case 22:r=t.stateNode,r._visibility&2&&(r._visibility&=-3,ro(t));break;default:ro(t)}e=e.sibling}}function Gp(e,t){for(;ot!==null;){var r=ot;switch(r.tag){case 0:case 11:case 15:nr(8,r,t);break;case 23:case 22:if(r.memoizedState!==null&&r.memoizedState.cachePool!==null){var i=r.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:di(r.memoizedState.cache)}if(i=r.child,i!==null)i.return=r,ot=i;else e:for(r=e;ot!==null;){i=ot;var c=i.sibling,d=i.return;if(zp(i),i===r){ot=null;break e}if(c!==null){c.return=d,ot=c;break e}ot=d}}}var jS={getCacheForType:function(e){var t=dt(Ie),r=t.data.get(e);return r===void 0&&(r=e(),t.data.set(e,r)),r},cacheSignal:function(){return dt(Ie).controller.signal}},ES=typeof WeakMap=="function"?WeakMap:Map,Re=0,Ue=null,Ee=null,Ne=0,ze=0,Vt=null,rr=!1,wa=!1,uu=!1,Ln=0,Ke=0,ar=0,Ur=0,du=0,Bt=0,ja=0,Ai=null,Nt=null,fu=!1,ao=0,Xp=0,io=1/0,so=null,ir=null,at=0,sr=null,Ea=null,Un=0,hu=0,mu=null,Fp=null,Mi=0,pu=null;function Lt(){return(Re&2)!==0&&Ne!==0?Ne&-Ne:L.T!==null?Su():lh()}function $p(){if(Bt===0)if((Ne&536870912)===0||Ae){var e=ms;ms<<=1,(ms&3932160)===0&&(ms=262144),Bt=e}else Bt=536870912;return e=zt.current,e!==null&&(e.flags|=32),Bt}function Dt(e,t,r){(e===Ue&&(ze===2||ze===9)||e.cancelPendingCommit!==null)&&(Ta(e,0),or(e,Ne,Bt,!1)),Ja(e,r),((Re&2)===0||e!==Ue)&&(e===Ue&&((Re&2)===0&&(Ur|=r),Ke===4&&or(e,Ne,Bt,!1)),hn(e))}function Kp(e,t,r){if((Re&6)!==0)throw Error(o(327));var i=!r&&(t&127)===0&&(t&e.expiredLanes)===0||Qa(e,t),c=i?NS(e,t):yu(e,t,!0),d=i;do{if(c===0){wa&&!i&&or(e,t,0,!1);break}else{if(r=e.current.alternate,d&&!TS(r)){c=yu(e,t,!1),d=!1;continue}if(c===2){if(d=t,e.errorRecoveryDisabledLanes&d)var y=0;else y=e.pendingLanes&-536870913,y=y!==0?y:y&536870912?536870912:0;if(y!==0){t=y;e:{var w=e;c=Ai;var M=w.current.memoizedState.isDehydrated;if(M&&(Ta(w,y).flags|=256),y=yu(w,y,!1),y!==2){if(uu&&!M){w.errorRecoveryDisabledLanes|=d,Ur|=d,c=4;break e}d=Nt,Nt=c,d!==null&&(Nt===null?Nt=d:Nt.push.apply(Nt,d))}c=y}if(d=!1,c!==2)continue}}if(c===1){Ta(e,0),or(e,t,0,!0);break}e:{switch(i=e,d=c,d){case 0:case 1:throw Error(o(345));case 4:if((t&4194048)!==t)break;case 6:or(i,t,Bt,!rr);break e;case 2:Nt=null;break;case 3:case 5:break;default:throw Error(o(329))}if((t&62914560)===t&&(c=ao+300-At(),10<c)){if(or(i,t,Bt,!rr),gs(i,0,!0)!==0)break e;Un=t,i.timeoutHandle=Tg(Zp.bind(null,i,r,Nt,so,fu,t,Bt,Ur,ja,rr,d,"Throttled",-0,0),c);break e}Zp(i,r,Nt,so,fu,t,Bt,Ur,ja,rr,d,null,-0,0)}}break}while(!0);hn(e)}function Zp(e,t,r,i,c,d,y,w,M,G,J,ne,F,K){if(e.timeoutHandle=-1,ne=t.subtreeFlags,ne&8192||(ne&16785408)===16785408){ne={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:En},qp(t,d,ne);var fe=(d&62914560)===d?ao-At():(d&4194048)===d?Xp-At():0;if(fe=cw(ne,fe),fe!==null){Un=d,e.cancelPendingCommit=fe(rg.bind(null,e,t,d,r,i,c,y,w,M,J,ne,null,F,K)),or(e,d,y,!G);return}}rg(e,t,d,r,i,c,y,w,M)}function TS(e){for(var t=e;;){var r=t.tag;if((r===0||r===11||r===15)&&t.flags&16384&&(r=t.updateQueue,r!==null&&(r=r.stores,r!==null)))for(var i=0;i<r.length;i++){var c=r[i],d=c.getSnapshot;c=c.value;try{if(!Rt(d(),c))return!1}catch{return!1}}if(r=t.child,t.subtreeFlags&16384&&r!==null)r.return=t,t=r;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function or(e,t,r,i){t&=~du,t&=~Ur,e.suspendedLanes|=t,e.pingedLanes&=~t,i&&(e.warmLanes|=t),i=e.expirationTimes;for(var c=t;0<c;){var d=31-kt(c),y=1<<d;i[d]=-1,c&=~y}r!==0&&ih(e,r,t)}function oo(){return(Re&6)===0?(ki(0),!1):!0}function gu(){if(Ee!==null){if(ze===0)var e=Ee.return;else e=Ee,Dn=Mr=null,Rc(e),pa=null,hi=0,e=Ee;for(;e!==null;)Cp(e.alternate,e),e=e.return;Ee=null}}function Ta(e,t){var r=e.timeoutHandle;r!==-1&&(e.timeoutHandle=-1,XS(r)),r=e.cancelPendingCommit,r!==null&&(e.cancelPendingCommit=null,r()),Un=0,gu(),Ue=e,Ee=r=Cn(e.current,null),Ne=t,ze=0,Vt=null,rr=!1,wa=Qa(e,t),uu=!1,ja=Bt=du=Ur=ar=Ke=0,Nt=Ai=null,fu=!1,(t&8)!==0&&(t|=t&32);var i=e.entangledLanes;if(i!==0)for(e=e.entanglements,i&=t;0<i;){var c=31-kt(i),d=1<<c;t|=e[c],i&=~d}return Ln=t,Ds(),r}function Qp(e,t){we=null,L.H=Si,t===ma||t===Vs?(t=fm(),ze=3):t===bc?(t=fm(),ze=4):ze=t===Kc?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,Vt=t,Ee===null&&(Ke=1,Qs(e,Gt(t,e.current)))}function Jp(){var e=zt.current;return e===null?!0:(Ne&4194048)===Ne?Kt===null:(Ne&62914560)===Ne||(Ne&536870912)!==0?e===Kt:!1}function Wp(){var e=L.H;return L.H=Si,e===null?Si:e}function Ip(){var e=L.A;return L.A=jS,e}function lo(){Ke=4,rr||(Ne&4194048)!==Ne&&zt.current!==null||(wa=!0),(ar&134217727)===0&&(Ur&134217727)===0||Ue===null||or(Ue,Ne,Bt,!1)}function yu(e,t,r){var i=Re;Re|=2;var c=Wp(),d=Ip();(Ue!==e||Ne!==t)&&(so=null,Ta(e,t)),t=!1;var y=Ke;e:do try{if(ze!==0&&Ee!==null){var w=Ee,M=Vt;switch(ze){case 8:gu(),y=6;break e;case 3:case 2:case 9:case 6:zt.current===null&&(t=!0);var G=ze;if(ze=0,Vt=null,Ca(e,w,M,G),r&&wa){y=0;break e}break;default:G=ze,ze=0,Vt=null,Ca(e,w,M,G)}}CS(),y=Ke;break}catch(J){Qp(e,J)}while(!0);return t&&e.shellSuspendCounter++,Dn=Mr=null,Re=i,L.H=c,L.A=d,Ee===null&&(Ue=null,Ne=0,Ds()),y}function CS(){for(;Ee!==null;)eg(Ee)}function NS(e,t){var r=Re;Re|=2;var i=Wp(),c=Ip();Ue!==e||Ne!==t?(so=null,io=At()+500,Ta(e,t)):wa=Qa(e,t);e:do try{if(ze!==0&&Ee!==null){t=Ee;var d=Vt;t:switch(ze){case 1:ze=0,Vt=null,Ca(e,t,d,1);break;case 2:case 9:if(um(d)){ze=0,Vt=null,tg(t);break}t=function(){ze!==2&&ze!==9||Ue!==e||(ze=7),hn(e)},d.then(t,t);break e;case 3:ze=7;break e;case 4:ze=5;break e;case 7:um(d)?(ze=0,Vt=null,tg(t)):(ze=0,Vt=null,Ca(e,t,d,7));break;case 5:var y=null;switch(Ee.tag){case 26:y=Ee.memoizedState;case 5:case 27:var w=Ee;if(y?Hg(y):w.stateNode.complete){ze=0,Vt=null;var M=w.sibling;if(M!==null)Ee=M;else{var G=w.return;G!==null?(Ee=G,co(G)):Ee=null}break t}}ze=0,Vt=null,Ca(e,t,d,5);break;case 6:ze=0,Vt=null,Ca(e,t,d,6);break;case 8:gu(),Ke=6;break e;default:throw Error(o(462))}}DS();break}catch(J){Qp(e,J)}while(!0);return Dn=Mr=null,L.H=i,L.A=c,Re=r,Ee!==null?0:(Ue=null,Ne=0,Ds(),Ke)}function DS(){for(;Ee!==null&&!J0();)eg(Ee)}function eg(e){var t=Ep(e.alternate,e,Ln);e.memoizedProps=e.pendingProps,t===null?co(e):Ee=t}function tg(e){var t=e,r=t.alternate;switch(t.tag){case 15:case 0:t=vp(r,t,t.pendingProps,t.type,void 0,Ne);break;case 11:t=vp(r,t,t.pendingProps,t.type.render,t.ref,Ne);break;case 5:Rc(t);default:Cp(r,t),t=Ee=Ih(t,Ln),t=Ep(r,t,Ln)}e.memoizedProps=e.pendingProps,t===null?co(e):Ee=t}function Ca(e,t,r,i){Dn=Mr=null,Rc(t),pa=null,hi=0;var c=t.return;try{if(gS(e,c,t,r,Ne)){Ke=1,Qs(e,Gt(r,e.current)),Ee=null;return}}catch(d){if(c!==null)throw Ee=c,d;Ke=1,Qs(e,Gt(r,e.current)),Ee=null;return}t.flags&32768?(Ae||i===1?e=!0:wa||(Ne&536870912)!==0?e=!1:(rr=e=!0,(i===2||i===9||i===3||i===6)&&(i=zt.current,i!==null&&i.tag===13&&(i.flags|=16384))),ng(t,e)):co(t)}function co(e){var t=e;do{if((t.flags&32768)!==0){ng(t,rr);return}e=t.return;var r=xS(t.alternate,t,Ln);if(r!==null){Ee=r;return}if(t=t.sibling,t!==null){Ee=t;return}Ee=t=e}while(t!==null);Ke===0&&(Ke=5)}function ng(e,t){do{var r=bS(e.alternate,e);if(r!==null){r.flags&=32767,Ee=r;return}if(r=e.return,r!==null&&(r.flags|=32768,r.subtreeFlags=0,r.deletions=null),!t&&(e=e.sibling,e!==null)){Ee=e;return}Ee=e=r}while(e!==null);Ke=6,Ee=null}function rg(e,t,r,i,c,d,y,w,M){e.cancelPendingCommit=null;do uo();while(at!==0);if((Re&6)!==0)throw Error(o(327));if(t!==null){if(t===e.current)throw Error(o(177));if(d=t.lanes|t.childLanes,d|=ic,o1(e,r,d,y,w,M),e===Ue&&(Ee=Ue=null,Ne=0),Ea=t,sr=e,Un=r,hu=d,mu=c,Fp=i,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,RS(fs,function(){return lg(),null})):(e.callbackNode=null,e.callbackPriority=0),i=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||i){i=L.T,L.T=null,c=se.p,se.p=2,y=Re,Re|=4;try{SS(e,t,r)}finally{Re=y,se.p=c,L.T=i}}at=1,ag(),ig(),sg()}}function ag(){if(at===1){at=0;var e=sr,t=Ea,r=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||r){r=L.T,L.T=null;var i=se.p;se.p=2;var c=Re;Re|=4;try{Lp(t,e);var d=Au,y=Gh(e.containerInfo),w=d.focusedElem,M=d.selectionRange;if(y!==w&&w&&w.ownerDocument&&Ph(w.ownerDocument.documentElement,w)){if(M!==null&&ec(w)){var G=M.start,J=M.end;if(J===void 0&&(J=G),"selectionStart"in w)w.selectionStart=G,w.selectionEnd=Math.min(J,w.value.length);else{var ne=w.ownerDocument||document,F=ne&&ne.defaultView||window;if(F.getSelection){var K=F.getSelection(),fe=w.textContent.length,be=Math.min(M.start,fe),Le=M.end===void 0?be:Math.min(M.end,fe);!K.extend&&be>Le&&(y=Le,Le=be,be=y);var H=Yh(w,be),z=Yh(w,Le);if(H&&z&&(K.rangeCount!==1||K.anchorNode!==H.node||K.anchorOffset!==H.offset||K.focusNode!==z.node||K.focusOffset!==z.offset)){var P=ne.createRange();P.setStart(H.node,H.offset),K.removeAllRanges(),be>Le?(K.addRange(P),K.extend(z.node,z.offset)):(P.setEnd(z.node,z.offset),K.addRange(P))}}}}for(ne=[],K=w;K=K.parentNode;)K.nodeType===1&&ne.push({element:K,left:K.scrollLeft,top:K.scrollTop});for(typeof w.focus=="function"&&w.focus(),w=0;w<ne.length;w++){var ee=ne[w];ee.element.scrollLeft=ee.left,ee.element.scrollTop=ee.top}}jo=!!Du,Au=Du=null}finally{Re=c,se.p=i,L.T=r}}e.current=t,at=2}}function ig(){if(at===2){at=0;var e=sr,t=Ea,r=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||r){r=L.T,L.T=null;var i=se.p;se.p=2;var c=Re;Re|=4;try{Op(e,t.alternate,t)}finally{Re=c,se.p=i,L.T=r}}at=3}}function sg(){if(at===4||at===3){at=0,W0();var e=sr,t=Ea,r=Un,i=Fp;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?at=5:(at=0,Ea=sr=null,og(e,e.pendingLanes));var c=e.pendingLanes;if(c===0&&(ir=null),_l(r),t=t.stateNode,Mt&&typeof Mt.onCommitFiberRoot=="function")try{Mt.onCommitFiberRoot(Za,t,void 0,(t.current.flags&128)===128)}catch{}if(i!==null){t=L.T,c=se.p,se.p=2,L.T=null;try{for(var d=e.onRecoverableError,y=0;y<i.length;y++){var w=i[y];d(w.value,{componentStack:w.stack})}}finally{L.T=t,se.p=c}}(Un&3)!==0&&uo(),hn(e),c=e.pendingLanes,(r&261930)!==0&&(c&42)!==0?e===pu?Mi++:(Mi=0,pu=e):Mi=0,ki(0)}}function og(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,di(t)))}function uo(){return ag(),ig(),sg(),lg()}function lg(){if(at!==5)return!1;var e=sr,t=hu;hu=0;var r=_l(Un),i=L.T,c=se.p;try{se.p=32>r?32:r,L.T=null,r=mu,mu=null;var d=sr,y=Un;if(at=0,Ea=sr=null,Un=0,(Re&6)!==0)throw Error(o(331));var w=Re;if(Re|=4,Pp(d.current),Hp(d,d.current,y,r),Re=w,ki(0,!1),Mt&&typeof Mt.onPostCommitFiberRoot=="function")try{Mt.onPostCommitFiberRoot(Za,d)}catch{}return!0}finally{se.p=c,L.T=i,og(e,t)}}function cg(e,t,r){t=Gt(r,t),t=$c(e.stateNode,t,2),e=In(e,t,2),e!==null&&(Ja(e,2),hn(e))}function _e(e,t,r){if(e.tag===3)cg(e,e,r);else for(;t!==null;){if(t.tag===3){cg(t,e,r);break}else if(t.tag===1){var i=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(ir===null||!ir.has(i))){e=Gt(r,e),r=up(2),i=In(t,r,2),i!==null&&(dp(r,i,t,e),Ja(i,2),hn(i));break}}t=t.return}}function vu(e,t,r){var i=e.pingCache;if(i===null){i=e.pingCache=new ES;var c=new Set;i.set(t,c)}else c=i.get(t),c===void 0&&(c=new Set,i.set(t,c));c.has(r)||(uu=!0,c.add(r),e=AS.bind(null,e,t,r),t.then(e,e))}function AS(e,t,r){var i=e.pingCache;i!==null&&i.delete(t),e.pingedLanes|=e.suspendedLanes&r,e.warmLanes&=~r,Ue===e&&(Ne&r)===r&&(Ke===4||Ke===3&&(Ne&62914560)===Ne&&300>At()-ao?(Re&2)===0&&Ta(e,0):du|=r,ja===Ne&&(ja=0)),hn(e)}function ug(e,t){t===0&&(t=ah()),e=Nr(e,t),e!==null&&(Ja(e,t),hn(e))}function MS(e){var t=e.memoizedState,r=0;t!==null&&(r=t.retryLane),ug(e,r)}function kS(e,t){var r=0;switch(e.tag){case 31:case 13:var i=e.stateNode,c=e.memoizedState;c!==null&&(r=c.retryLane);break;case 19:i=e.stateNode;break;case 22:i=e.stateNode._retryCache;break;default:throw Error(o(314))}i!==null&&i.delete(t),ug(e,r)}function RS(e,t){return kl(e,t)}var fo=null,Na=null,xu=!1,ho=!1,bu=!1,lr=0;function hn(e){e!==Na&&e.next===null&&(Na===null?fo=Na=e:Na=Na.next=e),ho=!0,xu||(xu=!0,zS())}function ki(e,t){if(!bu&&ho){bu=!0;do for(var r=!1,i=fo;i!==null;){if(e!==0){var c=i.pendingLanes;if(c===0)var d=0;else{var y=i.suspendedLanes,w=i.pingedLanes;d=(1<<31-kt(42|e)+1)-1,d&=c&~(y&~w),d=d&201326741?d&201326741|1:d?d|2:0}d!==0&&(r=!0,mg(i,d))}else d=Ne,d=gs(i,i===Ue?d:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),(d&3)===0||Qa(i,d)||(r=!0,mg(i,d));i=i.next}while(r);bu=!1}}function OS(){dg()}function dg(){ho=xu=!1;var e=0;lr!==0&&GS()&&(e=lr);for(var t=At(),r=null,i=fo;i!==null;){var c=i.next,d=fg(i,t);d===0?(i.next=null,r===null?fo=c:r.next=c,c===null&&(Na=r)):(r=i,(e!==0||(d&3)!==0)&&(ho=!0)),i=c}at!==0&&at!==5||ki(e),lr!==0&&(lr=0)}function fg(e,t){for(var r=e.suspendedLanes,i=e.pingedLanes,c=e.expirationTimes,d=e.pendingLanes&-62914561;0<d;){var y=31-kt(d),w=1<<y,M=c[y];M===-1?((w&r)===0||(w&i)!==0)&&(c[y]=s1(w,t)):M<=t&&(e.expiredLanes|=w),d&=~w}if(t=Ue,r=Ne,r=gs(e,e===t?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i=e.callbackNode,r===0||e===t&&(ze===2||ze===9)||e.cancelPendingCommit!==null)return i!==null&&i!==null&&Rl(i),e.callbackNode=null,e.callbackPriority=0;if((r&3)===0||Qa(e,r)){if(t=r&-r,t===e.callbackPriority)return t;switch(i!==null&&Rl(i),_l(r)){case 2:case 8:r=nh;break;case 32:r=fs;break;case 268435456:r=rh;break;default:r=fs}return i=hg.bind(null,e),r=kl(r,i),e.callbackPriority=t,e.callbackNode=r,t}return i!==null&&i!==null&&Rl(i),e.callbackPriority=2,e.callbackNode=null,2}function hg(e,t){if(at!==0&&at!==5)return e.callbackNode=null,e.callbackPriority=0,null;var r=e.callbackNode;if(uo()&&e.callbackNode!==r)return null;var i=Ne;return i=gs(e,e===Ue?i:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i===0?null:(Kp(e,i,t),fg(e,At()),e.callbackNode!=null&&e.callbackNode===r?hg.bind(null,e):null)}function mg(e,t){if(uo())return null;Kp(e,t,!0)}function zS(){FS(function(){(Re&6)!==0?kl(th,OS):dg()})}function Su(){if(lr===0){var e=fa;e===0&&(e=hs,hs<<=1,(hs&261888)===0&&(hs=256)),lr=e}return lr}function pg(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:bs(""+e)}function gg(e,t){var r=t.ownerDocument.createElement("input");return r.name=t.name,r.value=t.value,e.id&&r.setAttribute("form",e.id),t.parentNode.insertBefore(r,t),e=new FormData(e),r.parentNode.removeChild(r),e}function _S(e,t,r,i,c){if(t==="submit"&&r&&r.stateNode===c){var d=pg((c[wt]||null).action),y=i.submitter;y&&(t=(t=y[wt]||null)?pg(t.formAction):y.getAttribute("formAction"),t!==null&&(d=t,y=null));var w=new Es("action","action",null,i,c);e.push({event:w,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(lr!==0){var M=y?gg(c,y):new FormData(c);qc(r,{pending:!0,data:M,method:c.method,action:d},null,M)}}else typeof d=="function"&&(w.preventDefault(),M=y?gg(c,y):new FormData(c),qc(r,{pending:!0,data:M,method:c.method,action:d},d,M))},currentTarget:c}]})}}for(var wu=0;wu<ac.length;wu++){var ju=ac[wu],VS=ju.toLowerCase(),BS=ju[0].toUpperCase()+ju.slice(1);nn(VS,"on"+BS)}nn($h,"onAnimationEnd"),nn(Kh,"onAnimationIteration"),nn(Zh,"onAnimationStart"),nn("dblclick","onDoubleClick"),nn("focusin","onFocus"),nn("focusout","onBlur"),nn(I1,"onTransitionRun"),nn(eS,"onTransitionStart"),nn(tS,"onTransitionCancel"),nn(Qh,"onTransitionEnd"),Wr("onMouseEnter",["mouseout","mouseover"]),Wr("onMouseLeave",["mouseout","mouseover"]),Wr("onPointerEnter",["pointerout","pointerover"]),Wr("onPointerLeave",["pointerout","pointerover"]),jr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),jr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),jr("onBeforeInput",["compositionend","keypress","textInput","paste"]),jr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),jr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),jr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ri="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),LS=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ri));function yg(e,t){t=(t&4)!==0;for(var r=0;r<e.length;r++){var i=e[r],c=i.event;i=i.listeners;e:{var d=void 0;if(t)for(var y=i.length-1;0<=y;y--){var w=i[y],M=w.instance,G=w.currentTarget;if(w=w.listener,M!==d&&c.isPropagationStopped())break e;d=w,c.currentTarget=G;try{d(c)}catch(J){Ns(J)}c.currentTarget=null,d=M}else for(y=0;y<i.length;y++){if(w=i[y],M=w.instance,G=w.currentTarget,w=w.listener,M!==d&&c.isPropagationStopped())break e;d=w,c.currentTarget=G;try{d(c)}catch(J){Ns(J)}c.currentTarget=null,d=M}}}}function Te(e,t){var r=t[Vl];r===void 0&&(r=t[Vl]=new Set);var i=e+"__bubble";r.has(i)||(vg(t,e,2,!1),r.add(i))}function Eu(e,t,r){var i=0;t&&(i|=4),vg(r,e,i,t)}var mo="_reactListening"+Math.random().toString(36).slice(2);function Tu(e){if(!e[mo]){e[mo]=!0,dh.forEach(function(r){r!=="selectionchange"&&(LS.has(r)||Eu(r,!1,e),Eu(r,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[mo]||(t[mo]=!0,Eu("selectionchange",!1,t))}}function vg(e,t,r,i){switch($g(t)){case 2:var c=fw;break;case 8:c=hw;break;default:c=Hu}r=c.bind(null,t,r,e),c=void 0,!Xl||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(c=!0),i?c!==void 0?e.addEventListener(t,r,{capture:!0,passive:c}):e.addEventListener(t,r,!0):c!==void 0?e.addEventListener(t,r,{passive:c}):e.addEventListener(t,r,!1)}function Cu(e,t,r,i,c){var d=i;if((t&1)===0&&(t&2)===0&&i!==null)e:for(;;){if(i===null)return;var y=i.tag;if(y===3||y===4){var w=i.stateNode.containerInfo;if(w===c)break;if(y===4)for(y=i.return;y!==null;){var M=y.tag;if((M===3||M===4)&&y.stateNode.containerInfo===c)return;y=y.return}for(;w!==null;){if(y=Zr(w),y===null)return;if(M=y.tag,M===5||M===6||M===26||M===27){i=d=y;continue e}w=w.parentNode}}i=i.return}jh(function(){var G=d,J=Pl(r),ne=[];e:{var F=Jh.get(e);if(F!==void 0){var K=Es,fe=e;switch(e){case"keypress":if(ws(r)===0)break e;case"keydown":case"keyup":K=k1;break;case"focusin":fe="focus",K=Zl;break;case"focusout":fe="blur",K=Zl;break;case"beforeblur":case"afterblur":K=Zl;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":K=Ch;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":K=x1;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":K=z1;break;case $h:case Kh:case Zh:K=w1;break;case Qh:K=V1;break;case"scroll":case"scrollend":K=y1;break;case"wheel":K=L1;break;case"copy":case"cut":case"paste":K=E1;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":K=Dh;break;case"toggle":case"beforetoggle":K=H1}var be=(t&4)!==0,Le=!be&&(e==="scroll"||e==="scrollend"),H=be?F!==null?F+"Capture":null:F;be=[];for(var z=G,P;z!==null;){var ee=z;if(P=ee.stateNode,ee=ee.tag,ee!==5&&ee!==26&&ee!==27||P===null||H===null||(ee=ei(z,H),ee!=null&&be.push(Oi(z,ee,P))),Le)break;z=z.return}0<be.length&&(F=new K(F,fe,null,r,J),ne.push({event:F,listeners:be}))}}if((t&7)===0){e:{if(F=e==="mouseover"||e==="pointerover",K=e==="mouseout"||e==="pointerout",F&&r!==Yl&&(fe=r.relatedTarget||r.fromElement)&&(Zr(fe)||fe[Kr]))break e;if((K||F)&&(F=J.window===J?J:(F=J.ownerDocument)?F.defaultView||F.parentWindow:window,K?(fe=r.relatedTarget||r.toElement,K=G,fe=fe?Zr(fe):null,fe!==null&&(Le=h(fe),be=fe.tag,fe!==Le||be!==5&&be!==27&&be!==6)&&(fe=null)):(K=null,fe=G),K!==fe)){if(be=Ch,ee="onMouseLeave",H="onMouseEnter",z="mouse",(e==="pointerout"||e==="pointerover")&&(be=Dh,ee="onPointerLeave",H="onPointerEnter",z="pointer"),Le=K==null?F:Ia(K),P=fe==null?F:Ia(fe),F=new be(ee,z+"leave",K,r,J),F.target=Le,F.relatedTarget=P,ee=null,Zr(J)===G&&(be=new be(H,z+"enter",fe,r,J),be.target=P,be.relatedTarget=Le,ee=be),Le=ee,K&&fe)t:{for(be=US,H=K,z=fe,P=0,ee=H;ee;ee=be(ee))P++;ee=0;for(var ve=z;ve;ve=be(ve))ee++;for(;0<P-ee;)H=be(H),P--;for(;0<ee-P;)z=be(z),ee--;for(;P--;){if(H===z||z!==null&&H===z.alternate){be=H;break t}H=be(H),z=be(z)}be=null}else be=null;K!==null&&xg(ne,F,K,be,!1),fe!==null&&Le!==null&&xg(ne,Le,fe,be,!0)}}e:{if(F=G?Ia(G):window,K=F.nodeName&&F.nodeName.toLowerCase(),K==="select"||K==="input"&&F.type==="file")var Me=Vh;else if(zh(F))if(Bh)Me=Q1;else{Me=K1;var ge=$1}else K=F.nodeName,!K||K.toLowerCase()!=="input"||F.type!=="checkbox"&&F.type!=="radio"?G&&ql(G.elementType)&&(Me=Vh):Me=Z1;if(Me&&(Me=Me(e,G))){_h(ne,Me,r,J);break e}ge&&ge(e,F,G),e==="focusout"&&G&&F.type==="number"&&G.memoizedProps.value!=null&&Hl(F,"number",F.value)}switch(ge=G?Ia(G):window,e){case"focusin":(zh(ge)||ge.contentEditable==="true")&&(aa=ge,tc=G,li=null);break;case"focusout":li=tc=aa=null;break;case"mousedown":nc=!0;break;case"contextmenu":case"mouseup":case"dragend":nc=!1,Xh(ne,r,J);break;case"selectionchange":if(W1)break;case"keydown":case"keyup":Xh(ne,r,J)}var je;if(Jl)e:{switch(e){case"compositionstart":var De="onCompositionStart";break e;case"compositionend":De="onCompositionEnd";break e;case"compositionupdate":De="onCompositionUpdate";break e}De=void 0}else ra?Rh(e,r)&&(De="onCompositionEnd"):e==="keydown"&&r.keyCode===229&&(De="onCompositionStart");De&&(Ah&&r.locale!=="ko"&&(ra||De!=="onCompositionStart"?De==="onCompositionEnd"&&ra&&(je=Eh()):(Fn=J,Fl="value"in Fn?Fn.value:Fn.textContent,ra=!0)),ge=po(G,De),0<ge.length&&(De=new Nh(De,e,null,r,J),ne.push({event:De,listeners:ge}),je?De.data=je:(je=Oh(r),je!==null&&(De.data=je)))),(je=Y1?P1(e,r):G1(e,r))&&(De=po(G,"onBeforeInput"),0<De.length&&(ge=new Nh("onBeforeInput","beforeinput",null,r,J),ne.push({event:ge,listeners:De}),ge.data=je)),_S(ne,e,G,r,J)}yg(ne,t)})}function Oi(e,t,r){return{instance:e,listener:t,currentTarget:r}}function po(e,t){for(var r=t+"Capture",i=[];e!==null;){var c=e,d=c.stateNode;if(c=c.tag,c!==5&&c!==26&&c!==27||d===null||(c=ei(e,r),c!=null&&i.unshift(Oi(e,c,d)),c=ei(e,t),c!=null&&i.push(Oi(e,c,d))),e.tag===3)return i;e=e.return}return[]}function US(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function xg(e,t,r,i,c){for(var d=t._reactName,y=[];r!==null&&r!==i;){var w=r,M=w.alternate,G=w.stateNode;if(w=w.tag,M!==null&&M===i)break;w!==5&&w!==26&&w!==27||G===null||(M=G,c?(G=ei(r,d),G!=null&&y.unshift(Oi(r,G,M))):c||(G=ei(r,d),G!=null&&y.push(Oi(r,G,M)))),r=r.return}y.length!==0&&e.push({event:t,listeners:y})}var HS=/\r\n?/g,qS=/\u0000|\uFFFD/g;function bg(e){return(typeof e=="string"?e:""+e).replace(HS,`
`).replace(qS,"")}function Sg(e,t){return t=bg(t),bg(e)===t}function Be(e,t,r,i,c,d){switch(r){case"children":typeof i=="string"?t==="body"||t==="textarea"&&i===""||ea(e,i):(typeof i=="number"||typeof i=="bigint")&&t!=="body"&&ea(e,""+i);break;case"className":vs(e,"class",i);break;case"tabIndex":vs(e,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":vs(e,r,i);break;case"style":Sh(e,i,d);break;case"data":if(t!=="object"){vs(e,"data",i);break}case"src":case"href":if(i===""&&(t!=="a"||r!=="href")){e.removeAttribute(r);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(r);break}i=bs(""+i),e.setAttribute(r,i);break;case"action":case"formAction":if(typeof i=="function"){e.setAttribute(r,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof d=="function"&&(r==="formAction"?(t!=="input"&&Be(e,t,"name",c.name,c,null),Be(e,t,"formEncType",c.formEncType,c,null),Be(e,t,"formMethod",c.formMethod,c,null),Be(e,t,"formTarget",c.formTarget,c,null)):(Be(e,t,"encType",c.encType,c,null),Be(e,t,"method",c.method,c,null),Be(e,t,"target",c.target,c,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(r);break}i=bs(""+i),e.setAttribute(r,i);break;case"onClick":i!=null&&(e.onclick=En);break;case"onScroll":i!=null&&Te("scroll",e);break;case"onScrollEnd":i!=null&&Te("scrollend",e);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(o(61));if(r=i.__html,r!=null){if(c.children!=null)throw Error(o(60));e.innerHTML=r}}break;case"multiple":e.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":e.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){e.removeAttribute("xlink:href");break}r=bs(""+i),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",r);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(r,""+i):e.removeAttribute(r);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(r,""):e.removeAttribute(r);break;case"capture":case"download":i===!0?e.setAttribute(r,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(r,i):e.removeAttribute(r);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?e.setAttribute(r,i):e.removeAttribute(r);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?e.removeAttribute(r):e.setAttribute(r,i);break;case"popover":Te("beforetoggle",e),Te("toggle",e),ys(e,"popover",i);break;case"xlinkActuate":jn(e,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":jn(e,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":jn(e,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":jn(e,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":jn(e,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":jn(e,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":jn(e,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":jn(e,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":jn(e,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":ys(e,"is",i);break;case"innerText":case"textContent":break;default:(!(2<r.length)||r[0]!=="o"&&r[0]!=="O"||r[1]!=="n"&&r[1]!=="N")&&(r=p1.get(r)||r,ys(e,r,i))}}function Nu(e,t,r,i,c,d){switch(r){case"style":Sh(e,i,d);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(o(61));if(r=i.__html,r!=null){if(c.children!=null)throw Error(o(60));e.innerHTML=r}}break;case"children":typeof i=="string"?ea(e,i):(typeof i=="number"||typeof i=="bigint")&&ea(e,""+i);break;case"onScroll":i!=null&&Te("scroll",e);break;case"onScrollEnd":i!=null&&Te("scrollend",e);break;case"onClick":i!=null&&(e.onclick=En);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!fh.hasOwnProperty(r))e:{if(r[0]==="o"&&r[1]==="n"&&(c=r.endsWith("Capture"),t=r.slice(2,c?r.length-7:void 0),d=e[wt]||null,d=d!=null?d[r]:null,typeof d=="function"&&e.removeEventListener(t,d,c),typeof i=="function")){typeof d!="function"&&d!==null&&(r in e?e[r]=null:e.hasAttribute(r)&&e.removeAttribute(r)),e.addEventListener(t,i,c);break e}r in e?e[r]=i:i===!0?e.setAttribute(r,""):ys(e,r,i)}}}function ht(e,t,r){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Te("error",e),Te("load",e);var i=!1,c=!1,d;for(d in r)if(r.hasOwnProperty(d)){var y=r[d];if(y!=null)switch(d){case"src":i=!0;break;case"srcSet":c=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(o(137,t));default:Be(e,t,d,y,r,null)}}c&&Be(e,t,"srcSet",r.srcSet,r,null),i&&Be(e,t,"src",r.src,r,null);return;case"input":Te("invalid",e);var w=d=y=c=null,M=null,G=null;for(i in r)if(r.hasOwnProperty(i)){var J=r[i];if(J!=null)switch(i){case"name":c=J;break;case"type":y=J;break;case"checked":M=J;break;case"defaultChecked":G=J;break;case"value":d=J;break;case"defaultValue":w=J;break;case"children":case"dangerouslySetInnerHTML":if(J!=null)throw Error(o(137,t));break;default:Be(e,t,i,J,r,null)}}yh(e,d,w,M,G,y,c,!1);return;case"select":Te("invalid",e),i=y=d=null;for(c in r)if(r.hasOwnProperty(c)&&(w=r[c],w!=null))switch(c){case"value":d=w;break;case"defaultValue":y=w;break;case"multiple":i=w;default:Be(e,t,c,w,r,null)}t=d,r=y,e.multiple=!!i,t!=null?Ir(e,!!i,t,!1):r!=null&&Ir(e,!!i,r,!0);return;case"textarea":Te("invalid",e),d=c=i=null;for(y in r)if(r.hasOwnProperty(y)&&(w=r[y],w!=null))switch(y){case"value":i=w;break;case"defaultValue":c=w;break;case"children":d=w;break;case"dangerouslySetInnerHTML":if(w!=null)throw Error(o(91));break;default:Be(e,t,y,w,r,null)}xh(e,i,c,d);return;case"option":for(M in r)if(r.hasOwnProperty(M)&&(i=r[M],i!=null))switch(M){case"selected":e.selected=i&&typeof i!="function"&&typeof i!="symbol";break;default:Be(e,t,M,i,r,null)}return;case"dialog":Te("beforetoggle",e),Te("toggle",e),Te("cancel",e),Te("close",e);break;case"iframe":case"object":Te("load",e);break;case"video":case"audio":for(i=0;i<Ri.length;i++)Te(Ri[i],e);break;case"image":Te("error",e),Te("load",e);break;case"details":Te("toggle",e);break;case"embed":case"source":case"link":Te("error",e),Te("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(G in r)if(r.hasOwnProperty(G)&&(i=r[G],i!=null))switch(G){case"children":case"dangerouslySetInnerHTML":throw Error(o(137,t));default:Be(e,t,G,i,r,null)}return;default:if(ql(t)){for(J in r)r.hasOwnProperty(J)&&(i=r[J],i!==void 0&&Nu(e,t,J,i,r,void 0));return}}for(w in r)r.hasOwnProperty(w)&&(i=r[w],i!=null&&Be(e,t,w,i,r,null))}function YS(e,t,r,i){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var c=null,d=null,y=null,w=null,M=null,G=null,J=null;for(K in r){var ne=r[K];if(r.hasOwnProperty(K)&&ne!=null)switch(K){case"checked":break;case"value":break;case"defaultValue":M=ne;default:i.hasOwnProperty(K)||Be(e,t,K,null,i,ne)}}for(var F in i){var K=i[F];if(ne=r[F],i.hasOwnProperty(F)&&(K!=null||ne!=null))switch(F){case"type":d=K;break;case"name":c=K;break;case"checked":G=K;break;case"defaultChecked":J=K;break;case"value":y=K;break;case"defaultValue":w=K;break;case"children":case"dangerouslySetInnerHTML":if(K!=null)throw Error(o(137,t));break;default:K!==ne&&Be(e,t,F,K,i,ne)}}Ul(e,y,w,M,G,J,d,c);return;case"select":K=y=w=F=null;for(d in r)if(M=r[d],r.hasOwnProperty(d)&&M!=null)switch(d){case"value":break;case"multiple":K=M;default:i.hasOwnProperty(d)||Be(e,t,d,null,i,M)}for(c in i)if(d=i[c],M=r[c],i.hasOwnProperty(c)&&(d!=null||M!=null))switch(c){case"value":F=d;break;case"defaultValue":w=d;break;case"multiple":y=d;default:d!==M&&Be(e,t,c,d,i,M)}t=w,r=y,i=K,F!=null?Ir(e,!!r,F,!1):!!i!=!!r&&(t!=null?Ir(e,!!r,t,!0):Ir(e,!!r,r?[]:"",!1));return;case"textarea":K=F=null;for(w in r)if(c=r[w],r.hasOwnProperty(w)&&c!=null&&!i.hasOwnProperty(w))switch(w){case"value":break;case"children":break;default:Be(e,t,w,null,i,c)}for(y in i)if(c=i[y],d=r[y],i.hasOwnProperty(y)&&(c!=null||d!=null))switch(y){case"value":F=c;break;case"defaultValue":K=c;break;case"children":break;case"dangerouslySetInnerHTML":if(c!=null)throw Error(o(91));break;default:c!==d&&Be(e,t,y,c,i,d)}vh(e,F,K);return;case"option":for(var fe in r)if(F=r[fe],r.hasOwnProperty(fe)&&F!=null&&!i.hasOwnProperty(fe))switch(fe){case"selected":e.selected=!1;break;default:Be(e,t,fe,null,i,F)}for(M in i)if(F=i[M],K=r[M],i.hasOwnProperty(M)&&F!==K&&(F!=null||K!=null))switch(M){case"selected":e.selected=F&&typeof F!="function"&&typeof F!="symbol";break;default:Be(e,t,M,F,i,K)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var be in r)F=r[be],r.hasOwnProperty(be)&&F!=null&&!i.hasOwnProperty(be)&&Be(e,t,be,null,i,F);for(G in i)if(F=i[G],K=r[G],i.hasOwnProperty(G)&&F!==K&&(F!=null||K!=null))switch(G){case"children":case"dangerouslySetInnerHTML":if(F!=null)throw Error(o(137,t));break;default:Be(e,t,G,F,i,K)}return;default:if(ql(t)){for(var Le in r)F=r[Le],r.hasOwnProperty(Le)&&F!==void 0&&!i.hasOwnProperty(Le)&&Nu(e,t,Le,void 0,i,F);for(J in i)F=i[J],K=r[J],!i.hasOwnProperty(J)||F===K||F===void 0&&K===void 0||Nu(e,t,J,F,i,K);return}}for(var H in r)F=r[H],r.hasOwnProperty(H)&&F!=null&&!i.hasOwnProperty(H)&&Be(e,t,H,null,i,F);for(ne in i)F=i[ne],K=r[ne],!i.hasOwnProperty(ne)||F===K||F==null&&K==null||Be(e,t,ne,F,i,K)}function wg(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function PS(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,r=performance.getEntriesByType("resource"),i=0;i<r.length;i++){var c=r[i],d=c.transferSize,y=c.initiatorType,w=c.duration;if(d&&w&&wg(y)){for(y=0,w=c.responseEnd,i+=1;i<r.length;i++){var M=r[i],G=M.startTime;if(G>w)break;var J=M.transferSize,ne=M.initiatorType;J&&wg(ne)&&(M=M.responseEnd,y+=J*(M<w?1:(w-G)/(M-G)))}if(--i,t+=8*(d+y)/(c.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Du=null,Au=null;function go(e){return e.nodeType===9?e:e.ownerDocument}function jg(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Eg(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function Mu(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var ku=null;function GS(){var e=window.event;return e&&e.type==="popstate"?e===ku?!1:(ku=e,!0):(ku=null,!1)}var Tg=typeof setTimeout=="function"?setTimeout:void 0,XS=typeof clearTimeout=="function"?clearTimeout:void 0,Cg=typeof Promise=="function"?Promise:void 0,FS=typeof queueMicrotask=="function"?queueMicrotask:typeof Cg<"u"?function(e){return Cg.resolve(null).then(e).catch($S)}:Tg;function $S(e){setTimeout(function(){throw e})}function cr(e){return e==="head"}function Ng(e,t){var r=t,i=0;do{var c=r.nextSibling;if(e.removeChild(r),c&&c.nodeType===8)if(r=c.data,r==="/$"||r==="/&"){if(i===0){e.removeChild(c),ka(t);return}i--}else if(r==="$"||r==="$?"||r==="$~"||r==="$!"||r==="&")i++;else if(r==="html")zi(e.ownerDocument.documentElement);else if(r==="head"){r=e.ownerDocument.head,zi(r);for(var d=r.firstChild;d;){var y=d.nextSibling,w=d.nodeName;d[Wa]||w==="SCRIPT"||w==="STYLE"||w==="LINK"&&d.rel.toLowerCase()==="stylesheet"||r.removeChild(d),d=y}}else r==="body"&&zi(e.ownerDocument.body);r=c}while(r);ka(t)}function Dg(e,t){var r=e;e=0;do{var i=r.nextSibling;if(r.nodeType===1?t?(r._stashedDisplay=r.style.display,r.style.display="none"):(r.style.display=r._stashedDisplay||"",r.getAttribute("style")===""&&r.removeAttribute("style")):r.nodeType===3&&(t?(r._stashedText=r.nodeValue,r.nodeValue=""):r.nodeValue=r._stashedText||""),i&&i.nodeType===8)if(r=i.data,r==="/$"){if(e===0)break;e--}else r!=="$"&&r!=="$?"&&r!=="$~"&&r!=="$!"||e++;r=i}while(r)}function Ru(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var r=t;switch(t=t.nextSibling,r.nodeName){case"HTML":case"HEAD":case"BODY":Ru(r),Bl(r);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(r.rel.toLowerCase()==="stylesheet")continue}e.removeChild(r)}}function KS(e,t,r,i){for(;e.nodeType===1;){var c=r;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!i&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(i){if(!e[Wa])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(d=e.getAttribute("rel"),d==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(d!==c.rel||e.getAttribute("href")!==(c.href==null||c.href===""?null:c.href)||e.getAttribute("crossorigin")!==(c.crossOrigin==null?null:c.crossOrigin)||e.getAttribute("title")!==(c.title==null?null:c.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(d=e.getAttribute("src"),(d!==(c.src==null?null:c.src)||e.getAttribute("type")!==(c.type==null?null:c.type)||e.getAttribute("crossorigin")!==(c.crossOrigin==null?null:c.crossOrigin))&&d&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var d=c.name==null?null:""+c.name;if(c.type==="hidden"&&e.getAttribute("name")===d)return e}else return e;if(e=Zt(e.nextSibling),e===null)break}return null}function ZS(e,t,r){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!r||(e=Zt(e.nextSibling),e===null))return null;return e}function Ag(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Zt(e.nextSibling),e===null))return null;return e}function Ou(e){return e.data==="$?"||e.data==="$~"}function zu(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function QS(e,t){var r=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||r.readyState!=="loading")t();else{var i=function(){t(),r.removeEventListener("DOMContentLoaded",i)};r.addEventListener("DOMContentLoaded",i),e._reactRetry=i}}function Zt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var _u=null;function Mg(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="/$"||r==="/&"){if(t===0)return Zt(e.nextSibling);t--}else r!=="$"&&r!=="$!"&&r!=="$?"&&r!=="$~"&&r!=="&"||t++}e=e.nextSibling}return null}function kg(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="$"||r==="$!"||r==="$?"||r==="$~"||r==="&"){if(t===0)return e;t--}else r!=="/$"&&r!=="/&"||t++}e=e.previousSibling}return null}function Rg(e,t,r){switch(t=go(r),e){case"html":if(e=t.documentElement,!e)throw Error(o(452));return e;case"head":if(e=t.head,!e)throw Error(o(453));return e;case"body":if(e=t.body,!e)throw Error(o(454));return e;default:throw Error(o(451))}}function zi(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Bl(e)}var Qt=new Map,Og=new Set;function yo(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Hn=se.d;se.d={f:JS,r:WS,D:IS,C:ew,L:tw,m:nw,X:aw,S:rw,M:iw};function JS(){var e=Hn.f(),t=oo();return e||t}function WS(e){var t=Qr(e);t!==null&&t.tag===5&&t.type==="form"?Qm(t):Hn.r(e)}var Da=typeof document>"u"?null:document;function zg(e,t,r){var i=Da;if(i&&typeof t=="string"&&t){var c=Yt(t);c='link[rel="'+e+'"][href="'+c+'"]',typeof r=="string"&&(c+='[crossorigin="'+r+'"]'),Og.has(c)||(Og.add(c),e={rel:e,crossOrigin:r,href:t},i.querySelector(c)===null&&(t=i.createElement("link"),ht(t,"link",e),st(t),i.head.appendChild(t)))}}function IS(e){Hn.D(e),zg("dns-prefetch",e,null)}function ew(e,t){Hn.C(e,t),zg("preconnect",e,t)}function tw(e,t,r){Hn.L(e,t,r);var i=Da;if(i&&e&&t){var c='link[rel="preload"][as="'+Yt(t)+'"]';t==="image"&&r&&r.imageSrcSet?(c+='[imagesrcset="'+Yt(r.imageSrcSet)+'"]',typeof r.imageSizes=="string"&&(c+='[imagesizes="'+Yt(r.imageSizes)+'"]')):c+='[href="'+Yt(e)+'"]';var d=c;switch(t){case"style":d=Aa(e);break;case"script":d=Ma(e)}Qt.has(d)||(e=x({rel:"preload",href:t==="image"&&r&&r.imageSrcSet?void 0:e,as:t},r),Qt.set(d,e),i.querySelector(c)!==null||t==="style"&&i.querySelector(_i(d))||t==="script"&&i.querySelector(Vi(d))||(t=i.createElement("link"),ht(t,"link",e),st(t),i.head.appendChild(t)))}}function nw(e,t){Hn.m(e,t);var r=Da;if(r&&e){var i=t&&typeof t.as=="string"?t.as:"script",c='link[rel="modulepreload"][as="'+Yt(i)+'"][href="'+Yt(e)+'"]',d=c;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":d=Ma(e)}if(!Qt.has(d)&&(e=x({rel:"modulepreload",href:e},t),Qt.set(d,e),r.querySelector(c)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(r.querySelector(Vi(d)))return}i=r.createElement("link"),ht(i,"link",e),st(i),r.head.appendChild(i)}}}function rw(e,t,r){Hn.S(e,t,r);var i=Da;if(i&&e){var c=Jr(i).hoistableStyles,d=Aa(e);t=t||"default";var y=c.get(d);if(!y){var w={loading:0,preload:null};if(y=i.querySelector(_i(d)))w.loading=5;else{e=x({rel:"stylesheet",href:e,"data-precedence":t},r),(r=Qt.get(d))&&Vu(e,r);var M=y=i.createElement("link");st(M),ht(M,"link",e),M._p=new Promise(function(G,J){M.onload=G,M.onerror=J}),M.addEventListener("load",function(){w.loading|=1}),M.addEventListener("error",function(){w.loading|=2}),w.loading|=4,vo(y,t,i)}y={type:"stylesheet",instance:y,count:1,state:w},c.set(d,y)}}}function aw(e,t){Hn.X(e,t);var r=Da;if(r&&e){var i=Jr(r).hoistableScripts,c=Ma(e),d=i.get(c);d||(d=r.querySelector(Vi(c)),d||(e=x({src:e,async:!0},t),(t=Qt.get(c))&&Bu(e,t),d=r.createElement("script"),st(d),ht(d,"link",e),r.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},i.set(c,d))}}function iw(e,t){Hn.M(e,t);var r=Da;if(r&&e){var i=Jr(r).hoistableScripts,c=Ma(e),d=i.get(c);d||(d=r.querySelector(Vi(c)),d||(e=x({src:e,async:!0,type:"module"},t),(t=Qt.get(c))&&Bu(e,t),d=r.createElement("script"),st(d),ht(d,"link",e),r.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},i.set(c,d))}}function _g(e,t,r,i){var c=(c=me.current)?yo(c):null;if(!c)throw Error(o(446));switch(e){case"meta":case"title":return null;case"style":return typeof r.precedence=="string"&&typeof r.href=="string"?(t=Aa(r.href),r=Jr(c).hoistableStyles,i=r.get(t),i||(i={type:"style",instance:null,count:0,state:null},r.set(t,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(r.rel==="stylesheet"&&typeof r.href=="string"&&typeof r.precedence=="string"){e=Aa(r.href);var d=Jr(c).hoistableStyles,y=d.get(e);if(y||(c=c.ownerDocument||c,y={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},d.set(e,y),(d=c.querySelector(_i(e)))&&!d._p&&(y.instance=d,y.state.loading=5),Qt.has(e)||(r={rel:"preload",as:"style",href:r.href,crossOrigin:r.crossOrigin,integrity:r.integrity,media:r.media,hrefLang:r.hrefLang,referrerPolicy:r.referrerPolicy},Qt.set(e,r),d||sw(c,e,r,y.state))),t&&i===null)throw Error(o(528,""));return y}if(t&&i!==null)throw Error(o(529,""));return null;case"script":return t=r.async,r=r.src,typeof r=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Ma(r),r=Jr(c).hoistableScripts,i=r.get(t),i||(i={type:"script",instance:null,count:0,state:null},r.set(t,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(o(444,e))}}function Aa(e){return'href="'+Yt(e)+'"'}function _i(e){return'link[rel="stylesheet"]['+e+"]"}function Vg(e){return x({},e,{"data-precedence":e.precedence,precedence:null})}function sw(e,t,r,i){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?i.loading=1:(t=e.createElement("link"),i.preload=t,t.addEventListener("load",function(){return i.loading|=1}),t.addEventListener("error",function(){return i.loading|=2}),ht(t,"link",r),st(t),e.head.appendChild(t))}function Ma(e){return'[src="'+Yt(e)+'"]'}function Vi(e){return"script[async]"+e}function Bg(e,t,r){if(t.count++,t.instance===null)switch(t.type){case"style":var i=e.querySelector('style[data-href~="'+Yt(r.href)+'"]');if(i)return t.instance=i,st(i),i;var c=x({},r,{"data-href":r.href,"data-precedence":r.precedence,href:null,precedence:null});return i=(e.ownerDocument||e).createElement("style"),st(i),ht(i,"style",c),vo(i,r.precedence,e),t.instance=i;case"stylesheet":c=Aa(r.href);var d=e.querySelector(_i(c));if(d)return t.state.loading|=4,t.instance=d,st(d),d;i=Vg(r),(c=Qt.get(c))&&Vu(i,c),d=(e.ownerDocument||e).createElement("link"),st(d);var y=d;return y._p=new Promise(function(w,M){y.onload=w,y.onerror=M}),ht(d,"link",i),t.state.loading|=4,vo(d,r.precedence,e),t.instance=d;case"script":return d=Ma(r.src),(c=e.querySelector(Vi(d)))?(t.instance=c,st(c),c):(i=r,(c=Qt.get(d))&&(i=x({},r),Bu(i,c)),e=e.ownerDocument||e,c=e.createElement("script"),st(c),ht(c,"link",i),e.head.appendChild(c),t.instance=c);case"void":return null;default:throw Error(o(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(i=t.instance,t.state.loading|=4,vo(i,r.precedence,e));return t.instance}function vo(e,t,r){for(var i=r.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),c=i.length?i[i.length-1]:null,d=c,y=0;y<i.length;y++){var w=i[y];if(w.dataset.precedence===t)d=w;else if(d!==c)break}d?d.parentNode.insertBefore(e,d.nextSibling):(t=r.nodeType===9?r.head:r,t.insertBefore(e,t.firstChild))}function Vu(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function Bu(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var xo=null;function Lg(e,t,r){if(xo===null){var i=new Map,c=xo=new Map;c.set(r,i)}else c=xo,i=c.get(r),i||(i=new Map,c.set(r,i));if(i.has(e))return i;for(i.set(e,null),r=r.getElementsByTagName(e),c=0;c<r.length;c++){var d=r[c];if(!(d[Wa]||d[ct]||e==="link"&&d.getAttribute("rel")==="stylesheet")&&d.namespaceURI!=="http://www.w3.org/2000/svg"){var y=d.getAttribute(t)||"";y=e+y;var w=i.get(y);w?w.push(d):i.set(y,[d])}}return i}function Ug(e,t,r){e=e.ownerDocument||e,e.head.insertBefore(r,t==="title"?e.querySelector("head > title"):null)}function ow(e,t,r){if(r===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function Hg(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function lw(e,t,r,i){if(r.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&(r.state.loading&4)===0){if(r.instance===null){var c=Aa(i.href),d=t.querySelector(_i(c));if(d){t=d._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=bo.bind(e),t.then(e,e)),r.state.loading|=4,r.instance=d,st(d);return}d=t.ownerDocument||t,i=Vg(i),(c=Qt.get(c))&&Vu(i,c),d=d.createElement("link"),st(d);var y=d;y._p=new Promise(function(w,M){y.onload=w,y.onerror=M}),ht(d,"link",i),r.instance=d}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(r,t),(t=r.state.preload)&&(r.state.loading&3)===0&&(e.count++,r=bo.bind(e),t.addEventListener("load",r),t.addEventListener("error",r))}}var Lu=0;function cw(e,t){return e.stylesheets&&e.count===0&&wo(e,e.stylesheets),0<e.count||0<e.imgCount?function(r){var i=setTimeout(function(){if(e.stylesheets&&wo(e,e.stylesheets),e.unsuspend){var d=e.unsuspend;e.unsuspend=null,d()}},6e4+t);0<e.imgBytes&&Lu===0&&(Lu=62500*PS());var c=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&wo(e,e.stylesheets),e.unsuspend)){var d=e.unsuspend;e.unsuspend=null,d()}},(e.imgBytes>Lu?50:800)+t);return e.unsuspend=r,function(){e.unsuspend=null,clearTimeout(i),clearTimeout(c)}}:null}function bo(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)wo(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var So=null;function wo(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,So=new Map,t.forEach(uw,e),So=null,bo.call(e))}function uw(e,t){if(!(t.state.loading&4)){var r=So.get(e);if(r)var i=r.get(null);else{r=new Map,So.set(e,r);for(var c=e.querySelectorAll("link[data-precedence],style[data-precedence]"),d=0;d<c.length;d++){var y=c[d];(y.nodeName==="LINK"||y.getAttribute("media")!=="not all")&&(r.set(y.dataset.precedence,y),i=y)}i&&r.set(null,i)}c=t.instance,y=c.getAttribute("data-precedence"),d=r.get(y)||i,d===i&&r.set(null,c),r.set(y,c),this.count++,i=bo.bind(this),c.addEventListener("load",i),c.addEventListener("error",i),d?d.parentNode.insertBefore(c,d.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(c,e.firstChild)),t.state.loading|=4}}var Bi={$$typeof:V,Provider:null,Consumer:null,_currentValue:Q,_currentValue2:Q,_threadCount:0};function dw(e,t,r,i,c,d,y,w,M){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Ol(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ol(0),this.hiddenUpdates=Ol(null),this.identifierPrefix=i,this.onUncaughtError=c,this.onCaughtError=d,this.onRecoverableError=y,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=M,this.incompleteTransitions=new Map}function qg(e,t,r,i,c,d,y,w,M,G,J,ne){return e=new dw(e,t,r,y,M,G,J,ne,w),t=1,d===!0&&(t|=24),d=Ot(3,null,null,t),e.current=d,d.stateNode=e,t=yc(),t.refCount++,e.pooledCache=t,t.refCount++,d.memoizedState={element:i,isDehydrated:r,cache:t},Sc(d),e}function Yg(e){return e?(e=oa,e):oa}function Pg(e,t,r,i,c,d){c=Yg(c),i.context===null?i.context=c:i.pendingContext=c,i=Wn(t),i.payload={element:r},d=d===void 0?null:d,d!==null&&(i.callback=d),r=In(e,i,t),r!==null&&(Dt(r,e,t),pi(r,e,t))}function Gg(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var r=e.retryLane;e.retryLane=r!==0&&r<t?r:t}}function Uu(e,t){Gg(e,t),(e=e.alternate)&&Gg(e,t)}function Xg(e){if(e.tag===13||e.tag===31){var t=Nr(e,67108864);t!==null&&Dt(t,e,67108864),Uu(e,67108864)}}function Fg(e){if(e.tag===13||e.tag===31){var t=Lt();t=zl(t);var r=Nr(e,t);r!==null&&Dt(r,e,t),Uu(e,t)}}var jo=!0;function fw(e,t,r,i){var c=L.T;L.T=null;var d=se.p;try{se.p=2,Hu(e,t,r,i)}finally{se.p=d,L.T=c}}function hw(e,t,r,i){var c=L.T;L.T=null;var d=se.p;try{se.p=8,Hu(e,t,r,i)}finally{se.p=d,L.T=c}}function Hu(e,t,r,i){if(jo){var c=qu(i);if(c===null)Cu(e,t,i,Eo,r),Kg(e,i);else if(pw(c,e,t,r,i))i.stopPropagation();else if(Kg(e,i),t&4&&-1<mw.indexOf(e)){for(;c!==null;){var d=Qr(c);if(d!==null)switch(d.tag){case 3:if(d=d.stateNode,d.current.memoizedState.isDehydrated){var y=wr(d.pendingLanes);if(y!==0){var w=d;for(w.pendingLanes|=2,w.entangledLanes|=2;y;){var M=1<<31-kt(y);w.entanglements[1]|=M,y&=~M}hn(d),(Re&6)===0&&(io=At()+500,ki(0))}}break;case 31:case 13:w=Nr(d,2),w!==null&&Dt(w,d,2),oo(),Uu(d,2)}if(d=qu(i),d===null&&Cu(e,t,i,Eo,r),d===c)break;c=d}c!==null&&i.stopPropagation()}else Cu(e,t,i,null,r)}}function qu(e){return e=Pl(e),Yu(e)}var Eo=null;function Yu(e){if(Eo=null,e=Zr(e),e!==null){var t=h(e);if(t===null)e=null;else{var r=t.tag;if(r===13){if(e=f(t),e!==null)return e;e=null}else if(r===31){if(e=m(t),e!==null)return e;e=null}else if(r===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Eo=e,null}function $g(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(I0()){case th:return 2;case nh:return 8;case fs:case e1:return 32;case rh:return 268435456;default:return 32}default:return 32}}var Pu=!1,ur=null,dr=null,fr=null,Li=new Map,Ui=new Map,hr=[],mw="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Kg(e,t){switch(e){case"focusin":case"focusout":ur=null;break;case"dragenter":case"dragleave":dr=null;break;case"mouseover":case"mouseout":fr=null;break;case"pointerover":case"pointerout":Li.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ui.delete(t.pointerId)}}function Hi(e,t,r,i,c,d){return e===null||e.nativeEvent!==d?(e={blockedOn:t,domEventName:r,eventSystemFlags:i,nativeEvent:d,targetContainers:[c]},t!==null&&(t=Qr(t),t!==null&&Xg(t)),e):(e.eventSystemFlags|=i,t=e.targetContainers,c!==null&&t.indexOf(c)===-1&&t.push(c),e)}function pw(e,t,r,i,c){switch(t){case"focusin":return ur=Hi(ur,e,t,r,i,c),!0;case"dragenter":return dr=Hi(dr,e,t,r,i,c),!0;case"mouseover":return fr=Hi(fr,e,t,r,i,c),!0;case"pointerover":var d=c.pointerId;return Li.set(d,Hi(Li.get(d)||null,e,t,r,i,c)),!0;case"gotpointercapture":return d=c.pointerId,Ui.set(d,Hi(Ui.get(d)||null,e,t,r,i,c)),!0}return!1}function Zg(e){var t=Zr(e.target);if(t!==null){var r=h(t);if(r!==null){if(t=r.tag,t===13){if(t=f(r),t!==null){e.blockedOn=t,ch(e.priority,function(){Fg(r)});return}}else if(t===31){if(t=m(r),t!==null){e.blockedOn=t,ch(e.priority,function(){Fg(r)});return}}else if(t===3&&r.stateNode.current.memoizedState.isDehydrated){e.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}e.blockedOn=null}function To(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var r=qu(e.nativeEvent);if(r===null){r=e.nativeEvent;var i=new r.constructor(r.type,r);Yl=i,r.target.dispatchEvent(i),Yl=null}else return t=Qr(r),t!==null&&Xg(t),e.blockedOn=r,!1;t.shift()}return!0}function Qg(e,t,r){To(e)&&r.delete(t)}function gw(){Pu=!1,ur!==null&&To(ur)&&(ur=null),dr!==null&&To(dr)&&(dr=null),fr!==null&&To(fr)&&(fr=null),Li.forEach(Qg),Ui.forEach(Qg)}function Co(e,t){e.blockedOn===t&&(e.blockedOn=null,Pu||(Pu=!0,n.unstable_scheduleCallback(n.unstable_NormalPriority,gw)))}var No=null;function Jg(e){No!==e&&(No=e,n.unstable_scheduleCallback(n.unstable_NormalPriority,function(){No===e&&(No=null);for(var t=0;t<e.length;t+=3){var r=e[t],i=e[t+1],c=e[t+2];if(typeof i!="function"){if(Yu(i||r)===null)continue;break}var d=Qr(r);d!==null&&(e.splice(t,3),t-=3,qc(d,{pending:!0,data:c,method:r.method,action:i},i,c))}}))}function ka(e){function t(M){return Co(M,e)}ur!==null&&Co(ur,e),dr!==null&&Co(dr,e),fr!==null&&Co(fr,e),Li.forEach(t),Ui.forEach(t);for(var r=0;r<hr.length;r++){var i=hr[r];i.blockedOn===e&&(i.blockedOn=null)}for(;0<hr.length&&(r=hr[0],r.blockedOn===null);)Zg(r),r.blockedOn===null&&hr.shift();if(r=(e.ownerDocument||e).$$reactFormReplay,r!=null)for(i=0;i<r.length;i+=3){var c=r[i],d=r[i+1],y=c[wt]||null;if(typeof d=="function")y||Jg(r);else if(y){var w=null;if(d&&d.hasAttribute("formAction")){if(c=d,y=d[wt]||null)w=y.formAction;else if(Yu(c)!==null)continue}else w=y.action;typeof w=="function"?r[i+1]=w:(r.splice(i,3),i-=3),Jg(r)}}}function Wg(){function e(d){d.canIntercept&&d.info==="react-transition"&&d.intercept({handler:function(){return new Promise(function(y){return c=y})},focusReset:"manual",scroll:"manual"})}function t(){c!==null&&(c(),c=null),i||setTimeout(r,20)}function r(){if(!i&&!navigation.transition){var d=navigation.currentEntry;d&&d.url!=null&&navigation.navigate(d.url,{state:d.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,c=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(r,100),function(){i=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),c!==null&&(c(),c=null)}}}function Gu(e){this._internalRoot=e}Do.prototype.render=Gu.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(o(409));var r=t.current,i=Lt();Pg(r,i,e,t,null,null)},Do.prototype.unmount=Gu.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Pg(e.current,2,null,e,null,null),oo(),t[Kr]=null}};function Do(e){this._internalRoot=e}Do.prototype.unstable_scheduleHydration=function(e){if(e){var t=lh();e={blockedOn:null,target:e,priority:t};for(var r=0;r<hr.length&&t!==0&&t<hr[r].priority;r++);hr.splice(r,0,e),r===0&&Zg(e)}};var Ig=a.version;if(Ig!=="19.2.8")throw Error(o(527,Ig,"19.2.8"));se.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(o(188)):(e=Object.keys(e).join(","),Error(o(268,e)));return e=g(t),e=e!==null?v(e):null,e=e===null?null:e.stateNode,e};var yw={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:L,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ao=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ao.isDisabled&&Ao.supportsFiber)try{Za=Ao.inject(yw),Mt=Ao}catch{}}return Yi.createRoot=function(e,t){if(!u(e))throw Error(o(299));var r=!1,i="",c=sp,d=op,y=lp;return t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onUncaughtError!==void 0&&(c=t.onUncaughtError),t.onCaughtError!==void 0&&(d=t.onCaughtError),t.onRecoverableError!==void 0&&(y=t.onRecoverableError)),t=qg(e,1,!1,null,null,r,i,null,c,d,y,Wg),e[Kr]=t.current,Tu(e),new Gu(t)},Yi.hydrateRoot=function(e,t,r){if(!u(e))throw Error(o(299));var i=!1,c="",d=sp,y=op,w=lp,M=null;return r!=null&&(r.unstable_strictMode===!0&&(i=!0),r.identifierPrefix!==void 0&&(c=r.identifierPrefix),r.onUncaughtError!==void 0&&(d=r.onUncaughtError),r.onCaughtError!==void 0&&(y=r.onCaughtError),r.onRecoverableError!==void 0&&(w=r.onRecoverableError),r.formState!==void 0&&(M=r.formState)),t=qg(e,1,!0,t,r??null,i,c,M,d,y,w,Wg),t.context=Yg(null),r=t.current,i=Lt(),i=zl(i),c=Wn(i),c.callback=null,In(r,c,i),r=i,t.current.lanes=r,Ja(t,r),hn(t),e[Kr]=t.current,Tu(e),new Do(t)},Yi.version="19.2.8",Yi}var cy;function Nw(){if(cy)return $u.exports;cy=1;function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(a){console.error(a)}}return n(),$u.exports=Cw(),$u.exports}var uf=Nw();const Dw=sx(uf),df=S.createContext({});function ff(n){const a=S.useRef(null);return a.current===null&&(a.current=n()),a.current}const Aw=typeof window<"u",hf=Aw?S.useLayoutEffect:S.useEffect,wl=S.createContext(null);function mf(n,a){n.indexOf(a)===-1&&n.push(a)}function el(n,a){const s=n.indexOf(a);s>-1&&n.splice(s,1)}const bn=(n,a,s)=>s>a?a:s<n?n:s;let jl=()=>{};const vr={},cx=n=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n),ux=n=>typeof n=="object"&&n!==null,dx=n=>/^0[^.\s]+$/u.test(n);function fx(n){let a;return()=>(a===void 0&&(a=n()),a)}const en=n=>n,ss=(...n)=>n.reduce((a,s)=>o=>s(a(o))),Wi=(n,a,s)=>{const o=a-n;return o?(s-n)/o:1};class pf{constructor(){this.subscriptions=[]}add(a){return mf(this.subscriptions,a),()=>el(this.subscriptions,a)}notify(a,s,o){const u=this.subscriptions.length;if(u)if(u===1)this.subscriptions[0](a,s,o);else for(let h=0;h<u;h++){const f=this.subscriptions[h];f&&f(a,s,o)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}}const Ht=n=>n*1e3,It=n=>n/1e3,hx=(n,a)=>a?n*(1e3/a):0,mx=(n,a,s)=>(((1-3*s+3*a)*n+(3*s-6*a))*n+3*a)*n,Mw=1e-7,kw=12;function Rw(n,a,s,o,u){let h,f,m=0;do f=a+(s-a)/2,h=mx(f,o,u)-n,h>0?s=f:a=f;while(Math.abs(h)>Mw&&++m<kw);return f}function os(n,a,s,o){if(n===a&&s===o)return en;const u=h=>Rw(h,0,1,n,s);return h=>h===0||h===1?h:mx(u(h),a,o)}const px=n=>a=>a<=.5?n(2*a)/2:(2-n(2*(1-a)))/2,gx=n=>a=>1-n(1-a),yx=os(.33,1.53,.69,.99),gf=gx(yx),vx=px(gf),xx=n=>n>=1?1:(n*=2)<1?.5*gf(n):.5*(2-Math.pow(2,-10*(n-1))),yf=n=>1-Math.sin(Math.acos(n)),bx=gx(yf),Sx=px(yf),Ow=os(.42,0,1,1),zw=os(0,0,.58,1),wx=os(.42,0,.58,1),_w=n=>Array.isArray(n)&&typeof n[0]!="number",jx=n=>Array.isArray(n)&&typeof n[0]=="number",Vw={linear:en,easeIn:Ow,easeInOut:wx,easeOut:zw,circIn:yf,circInOut:Sx,circOut:bx,backIn:gf,backInOut:vx,backOut:yx,anticipate:xx},Bw=n=>typeof n=="string",uy=n=>{if(jx(n)){jl(n.length===4);const[a,s,o,u]=n;return os(a,s,o,u)}else if(Bw(n))return Vw[n];return n},Mo=["setup","read","resolveKeyframes","preUpdate","update","preRender","render","postRender"];function Lw(n){let a=new Set,s=new Set,o=!1,u=!1;const h=new WeakSet;let f={delta:0,timestamp:0,isProcessing:!1};function m(g){h.has(g)&&(p.schedule(g),n()),g(f)}const p={schedule:(g,v=!1,x=!1)=>{const E=x&&o?a:s;return v&&h.add(g),E.add(g),g},cancel:g=>{s.delete(g),h.delete(g)},process:g=>{if(f=g,o){u=!0;return}o=!0;const v=a;a=s,s=v,a.forEach(m),a.clear(),o=!1,u&&(u=!1,p.process(g))}};return p}const Uw=40;function Ex(n,a){let s=!1,o=!0;const u={delta:0,timestamp:0,isProcessing:!1},h=()=>s=!0,f=Mo.reduce((V,R)=>(V[R]=Lw(h),V),{}),{setup:m,read:p,resolveKeyframes:g,preUpdate:v,update:x,preRender:b,render:E,postRender:j}=f,N=()=>{const V=vr.useManualTiming,R=V?u.timestamp:performance.now();s=!1,V||(u.delta=o?1e3/60:Math.max(Math.min(R-u.timestamp,Uw),1)),u.timestamp=R,u.isProcessing=!0,m.process(u),p.process(u),g.process(u),v.process(u),x.process(u),b.process(u),E.process(u),j.process(u),u.isProcessing=!1,s&&a&&(o=!1,n(N))},C=()=>{s=!0,o=!0,u.isProcessing||n(N)};return{schedule:Mo.reduce((V,R)=>{const B=f[R];return V[R]=(Y,A=!1,q=!1)=>(s||C(),B.schedule(Y,A,q)),V},{}),cancel:V=>{for(let R=0;R<Mo.length;R++)f[Mo[R]].cancel(V)},state:u,steps:f}}const{schedule:qe,cancel:xr,state:mt,steps:Ju}=Ex(typeof requestAnimationFrame<"u"?requestAnimationFrame:en,!0);let Po;function Hw(){Po=void 0}const xt={now:()=>(Po===void 0&&xt.set(mt.isProcessing||vr.useManualTiming?mt.timestamp:performance.now()),Po),set:n=>{Po=n,queueMicrotask(Hw)}},Tx=n=>a=>typeof a=="string"&&a.startsWith(n),Cx=Tx("--"),qw=Tx("var(--"),vf=n=>qw(n)?Yw.test(n.split("/*")[0].trim()):!1,Yw=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;function dy(n){return typeof n!="string"?!1:n.split("/*")[0].includes("var(--")}const Ga={test:n=>typeof n=="number",parse:parseFloat,transform:n=>n},Ii={...Ga,transform:n=>bn(0,1,n)},ko={...Ga,default:1},$i=n=>Math.round(n*1e5)/1e5,xf=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function Pw(n){return n==null}const Gw=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,bf=(n,a)=>s=>!!(typeof s=="string"&&Gw.test(s)&&s.startsWith(n)||a&&!Pw(s)&&Object.prototype.hasOwnProperty.call(s,a)),Nx=(n,a,s)=>o=>{if(typeof o!="string")return o;const[u,h,f,m]=o.match(xf);return{[n]:parseFloat(u),[a]:parseFloat(h),[s]:parseFloat(f),alpha:m!==void 0?parseFloat(m):1}},Xw=n=>bn(0,255,n),Wu={...Ga,transform:n=>Math.round(Xw(n))},Yr={test:bf("rgb","red"),parse:Nx("red","green","blue"),transform:({red:n,green:a,blue:s,alpha:o=1})=>"rgba("+Wu.transform(n)+", "+Wu.transform(a)+", "+Wu.transform(s)+", "+$i(Ii.transform(o))+")"};function Fw(n){let a="",s="",o="",u="";return n.length>5?(a=n.substring(1,3),s=n.substring(3,5),o=n.substring(5,7),u=n.substring(7,9)):(a=n.substring(1,2),s=n.substring(2,3),o=n.substring(3,4),u=n.substring(4,5),a+=a,s+=s,o+=o,u+=u),{red:parseInt(a,16),green:parseInt(s,16),blue:parseInt(o,16),alpha:u?parseInt(u,16)/255:1}}const Ed={test:bf("#"),parse:Fw,transform:Yr.transform},ls=n=>({test:a=>typeof a=="string"&&a.endsWith(n)&&a.split(" ").length===1,parse:parseFloat,transform:a=>`${a}${n}`}),qn=ls("deg"),vn=ls("%"),he=ls("px"),$w=ls("vh"),Kw=ls("vw"),fy={...vn,parse:n=>vn.parse(n)/100,transform:n=>vn.transform(n*100)},Ba={test:bf("hsl","hue"),parse:Nx("hue","saturation","lightness"),transform:({hue:n,saturation:a,lightness:s,alpha:o=1})=>"hsla("+Math.round(n)+", "+vn.transform($i(a))+", "+vn.transform($i(s))+", "+$i(Ii.transform(o))+")"},rt={test:n=>Yr.test(n)||Ed.test(n)||Ba.test(n),parse:n=>Yr.test(n)?Yr.parse(n):Ba.test(n)?Ba.parse(n):Ed.parse(n),transform:n=>typeof n=="string"?n:n.hasOwnProperty("red")?Yr.transform(n):Ba.transform(n),getAnimatableNone:n=>{const a=rt.parse(n);return a.alpha=0,rt.transform(a)}},Zw=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;function Qw(n){var a,s;return isNaN(n)&&typeof n=="string"&&(((a=n.match(xf))==null?void 0:a.length)||0)+(((s=n.match(Zw))==null?void 0:s.length)||0)>0}const Dx="number",Ax="color",Jw="var",Ww="var(",hy="${}",Iw=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function qa(n){const a=n.toString(),s=[],o={color:[],number:[],var:[]},u=[];let h=0;const m=a.replace(Iw,p=>(rt.test(p)?(o.color.push(h),u.push(Ax),s.push(rt.parse(p))):p.startsWith(Ww)?(o.var.push(h),u.push(Jw),s.push(p)):(o.number.push(h),u.push(Dx),s.push(parseFloat(p))),++h,hy)).split(hy);return{values:s,split:m,indexes:o,types:u}}function e2(n){return qa(n).values}function Mx({split:n,types:a}){const s=n.length;return o=>{let u="";for(let h=0;h<s;h++)if(u+=n[h],o[h]!==void 0){const f=a[h];f===Dx?u+=$i(o[h]):f===Ax?u+=rt.transform(o[h]):u+=o[h]}return u}}function t2(n){return Mx(qa(n))}const n2=n=>typeof n=="number"?0:rt.test(n)?rt.getAnimatableNone(n):n,r2=(n,a)=>typeof n=="number"?a!=null&&a.trim().endsWith("/")?n:0:n2(n);function a2(n){const a=qa(n);return Mx(a)(a.values.map((o,u)=>r2(o,a.split[u])))}const ln={test:Qw,parse:e2,createTransformer:t2,getAnimatableNone:a2};function Iu(n,a,s){return s<0&&(s+=1),s>1&&(s-=1),s<1/6?n+(a-n)*6*s:s<1/2?a:s<2/3?n+(a-n)*(2/3-s)*6:n}function i2({hue:n,saturation:a,lightness:s,alpha:o}){n/=360,a/=100,s/=100;let u=0,h=0,f=0;if(!a)u=h=f=s;else{const m=s<.5?s*(1+a):s+a-s*a,p=2*s-m;u=Iu(p,m,n+1/3),h=Iu(p,m,n),f=Iu(p,m,n-1/3)}return{red:Math.round(u*255),green:Math.round(h*255),blue:Math.round(f*255),alpha:o}}function tl(n,a){return s=>s>0?a:n}const He=(n,a,s)=>n+(a-n)*s,ed=(n,a,s)=>{const o=n*n,u=s*(a*a-o)+o;return u<0?0:Math.sqrt(u)},s2=[Ed,Yr,Ba],o2=n=>s2.find(a=>a.test(n));function my(n){const a=o2(n);if(!a)return!1;let s=a.parse(n);return a===Ba&&(s=i2(s)),s}const py=(n,a)=>{const s=my(n),o=my(a);if(!s||!o)return tl(n,a);const u={...s};return h=>(u.red=ed(s.red,o.red,h),u.green=ed(s.green,o.green,h),u.blue=ed(s.blue,o.blue,h),u.alpha=He(s.alpha,o.alpha,h),Yr.transform(u))},Td=new Set(["none","hidden"]);function l2(n,a){return Td.has(n)?s=>s<=0?n:a:s=>s>=1?a:n}function c2(n,a){return s=>He(n,a,s)}function Sf(n){return typeof n=="number"?c2:typeof n=="string"?vf(n)?tl:rt.test(n)?py:f2:Array.isArray(n)?kx:typeof n=="object"?rt.test(n)?py:u2:tl}function kx(n,a){const s=[...n],o=s.length,u=n.map((h,f)=>Sf(h)(h,a[f]));return h=>{for(let f=0;f<o;f++)s[f]=u[f](h);return s}}function u2(n,a){const s={...n,...a},o={};for(const u in s)n[u]!==void 0&&a[u]!==void 0&&(o[u]=Sf(n[u])(n[u],a[u]));return u=>{for(const h in o)s[h]=o[h](u);return s}}function d2(n,a){const s=[],o={color:0,var:0,number:0};for(let u=0;u<a.values.length;u++){const h=a.types[u],f=n.indexes[h][o[h]],m=n.values[f]??0;s[u]=m,o[h]++}return s}const f2=(n,a)=>{const s=ln.createTransformer(a),o=qa(n),u=qa(a);return o.indexes.var.length===u.indexes.var.length&&o.indexes.color.length===u.indexes.color.length&&o.indexes.number.length>=u.indexes.number.length?Td.has(n)&&!u.values.length||Td.has(a)&&!o.values.length?l2(n,a):ss(kx(d2(o,u),u.values),s):tl(n,a)};function Rx(n,a,s){return typeof n=="number"&&typeof a=="number"&&typeof s=="number"?He(n,a,s):Sf(n)(n,a)}const h2=n=>{const a=({timestamp:s})=>n(s);return{start:(s=!0)=>qe.update(a,s),stop:()=>xr(a),now:()=>mt.isProcessing?mt.timestamp:xt.now()}},Ox=(n,a,s=10)=>{let o="";const u=Math.max(Math.round(a/s),2);for(let h=0;h<u;h++)o+=Math.round(n(h/(u-1))*1e4)/1e4+", ";return`linear(${o.substring(0,o.length-2)})`},nl=2e4;function wf(n){let a=0;const s=50;let o=n.next(a);for(;!o.done&&a<nl;)a+=s,o=n.next(a);return a>=nl?1/0:a}function m2(n,a=100,s){const o=s({...n,keyframes:[0,a]}),u=Math.min(wf(o),nl);return{type:"keyframes",ease:h=>o.next(u*h).value/a,duration:It(u)}}const Ze={stiffness:100,damping:10,mass:1,velocity:0,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05,maxDamping:1};function Cd(n,a){return n*Math.sqrt(1-a*a)}const p2=12;function g2(n,a,s){let o=s;for(let u=1;u<p2;u++)o=o-n(o)/a(o);return o}const td=.001;function y2({duration:n=Ze.duration,bounce:a=Ze.bounce,velocity:s=Ze.velocity,mass:o=Ze.mass}){let u,h,f=1-a;f=bn(Ze.minDamping,Ze.maxDamping,f),n=bn(Ze.minDuration,Ze.maxDuration,It(n)),f<1?(u=g=>{const v=g*f,x=v*n,b=v-s,E=Cd(g,f),j=Math.exp(-x);return td-b/E*j},h=g=>{const x=g*f*n,b=x*s+s,E=Math.pow(f,2)*Math.pow(g,2)*n,j=Math.exp(-x),N=Cd(Math.pow(g,2),f);return(-u(g)+td>0?-1:1)*((b-E)*j)/N}):(u=g=>{const v=Math.exp(-g*n),x=(g-s)*n+1;return-td+v*x},h=g=>{const v=Math.exp(-g*n),x=(s-g)*(n*n);return v*x});const m=5/n,p=g2(u,h,m);if(n=Ht(n),isNaN(p))return{stiffness:Ze.stiffness,damping:Ze.damping,duration:n};{const g=Math.pow(p,2)*o;return{stiffness:g,damping:f*2*Math.sqrt(o*g),duration:n}}}const v2=["duration","bounce"],x2=["stiffness","damping","mass"];function gy(n,a){return a.some(s=>n[s]!==void 0)}function b2(n){let a={velocity:Ze.velocity,stiffness:Ze.stiffness,damping:Ze.damping,mass:Ze.mass,isResolvedFromDuration:!1,...n};if(!gy(n,x2)&&gy(n,v2))if(a.velocity=0,n.visualDuration){const s=n.visualDuration,o=2*Math.PI/(s*1.2),u=o*o,h=2*bn(.05,1,1-(n.bounce||0))*Math.sqrt(u);a={...a,mass:Ze.mass,stiffness:u,damping:h}}else{const s=y2({...n,velocity:0});a={...a,...s,mass:Ze.mass},a.isResolvedFromDuration=!0}return a}function rl(n=Ze.visualDuration,a=Ze.bounce){const s=typeof n!="object"?{visualDuration:n,keyframes:[0,1],bounce:a}:n;let{restSpeed:o,restDelta:u}=s;const h=s.keyframes[0],f=s.keyframes[s.keyframes.length-1],m={done:!1,value:h},{stiffness:p,damping:g,mass:v,duration:x,velocity:b,isResolvedFromDuration:E}=b2({...s,velocity:-It(s.velocity||0)}),j=b||0,N=g/(2*Math.sqrt(p*v)),C=f-h,k=It(Math.sqrt(p/v)),D=Math.abs(C)<5;o||(o=D?Ze.restSpeed.granular:Ze.restSpeed.default),u||(u=D?Ze.restDelta.granular:Ze.restDelta.default);let V,R,B,Y,A,q;if(N<1)B=Cd(k,N),Y=(j+N*k*C)/B,V=_=>{const $=Math.exp(-N*k*_);return f-$*(Y*Math.sin(B*_)+C*Math.cos(B*_))},A=N*k*Y+C*B,q=N*k*C-Y*B,R=_=>Math.exp(-N*k*_)*(A*Math.sin(B*_)+q*Math.cos(B*_));else if(N===1){V=$=>f-Math.exp(-k*$)*(C+(j+k*C)*$);const _=j+k*C;R=$=>Math.exp(-k*$)*(k*_*$-j)}else{const _=k*Math.sqrt(N*N-1);V=Z=>{const ce=Math.exp(-N*k*Z),L=Math.min(_*Z,300);return f-ce*((j+N*k*C)*Math.sinh(L)+_*C*Math.cosh(L))/_};const $=(j+N*k*C)/_,W=N*k*$-C*_,le=N*k*C-$*_;R=Z=>{const ce=Math.exp(-N*k*Z),L=Math.min(_*Z,300);return ce*(W*Math.sinh(L)+le*Math.cosh(L))}}const U={calculatedDuration:E&&x||null,velocity:_=>Ht(R(_)),next:_=>{if(!E&&N<1){const W=Math.exp(-N*k*_),le=Math.sin(B*_),Z=Math.cos(B*_),ce=f-W*(Y*le+C*Z),L=Ht(W*(A*le+q*Z));return m.done=Math.abs(L)<=o&&Math.abs(f-ce)<=u,m.value=m.done?f:ce,m}const $=V(_);if(E)m.done=_>=x;else{const W=Ht(R(_));m.done=Math.abs(W)<=o&&Math.abs(f-$)<=u}return m.value=m.done?f:$,m},toString:()=>{const _=Math.min(wf(U),nl),$=Ox(W=>U.next(_*W).value,_,30);return _+"ms "+$},toTransition:()=>{}};return U}rl.applyToOptions=n=>{const a=m2(n,100,rl);return n.ease=a.ease,n.duration=Ht(a.duration),n.type="keyframes",n};const S2=5;function zx(n,a,s){const o=Math.max(a-S2,0);return hx(s-n(o),a-o)}function Nd({keyframes:n,velocity:a=0,power:s=.8,timeConstant:o=325,bounceDamping:u=10,bounceStiffness:h=500,modifyTarget:f,min:m,max:p,restDelta:g=.5,restSpeed:v}){const x=n[0],b={done:!1,value:x},E=q=>m!==void 0&&q<m||p!==void 0&&q>p,j=q=>m===void 0?p:p===void 0||Math.abs(m-q)<Math.abs(p-q)?m:p;let N=s*a;const C=x+N,k=f===void 0?C:f(C);k!==C&&(N=k-x);const D=q=>-N*Math.exp(-q/o),V=q=>k+D(q),R=q=>{const U=D(q),_=V(q);b.done=Math.abs(U)<=g,b.value=b.done?k:_};let B,Y;const A=q=>{E(b.value)&&(B=q,Y=rl({keyframes:[b.value,j(b.value)],velocity:zx(V,q,b.value),damping:u,stiffness:h,restDelta:g,restSpeed:v}))};return A(0),{calculatedDuration:null,next:q=>{let U=!1;return!Y&&B===void 0&&(U=!0,R(q),A(q)),B!==void 0&&q>=B?Y.next(q-B):(!U&&R(q),b)}}}function w2(n,a,s){const o=[],u=s||vr.mix||Rx,h=n.length-1;for(let f=0;f<h;f++){let m=u(n[f],n[f+1]);if(a){const p=Array.isArray(a)?a[f]||en:a;m=ss(p,m)}o.push(m)}return o}function j2(n,a,{clamp:s=!0,ease:o,mixer:u}={}){const h=n.length;if(jl(h===a.length),h===1)return()=>a[0];if(h===2&&a[0]===a[1])return()=>a[1];const f=n[0]===n[1];n[0]>n[h-1]&&(n=[...n].reverse(),a=[...a].reverse());const m=w2(a,o,u),p=m.length,g=v=>{if(f&&v<n[0])return a[0];let x=0;if(p>1)for(;x<n.length-2&&!(v<n[x+1]);x++);const b=Wi(n[x],n[x+1],v);return m[x](b)};return s?v=>g(bn(n[0],n[h-1],v)):g}function E2(n,a){const s=n[n.length-1];for(let o=1;o<=a;o++){const u=Wi(0,a,o);n.push(He(s,1,u))}}function T2(n){const a=[0];return E2(a,n.length-1),a}function C2(n,a){return n.map(s=>s*a)}function N2(n,a){return n.map(()=>a||wx).splice(0,n.length-1)}function Ki({duration:n=300,keyframes:a,times:s,ease:o="easeInOut"}){const u=_w(o)?o.map(uy):uy(o),h={done:!1,value:a[0]},f=C2(s&&s.length===a.length?s:T2(a),n),m=j2(f,a,{ease:Array.isArray(u)?u:N2(a,u)});return{calculatedDuration:n,next:p=>(h.value=m(p),h.done=p>=n,h)}}const D2=n=>n!==null;function El(n,{repeat:a,repeatType:s="loop"},o,u=1){const h=n.filter(D2),m=u<0||a&&s!=="loop"&&a%2===1?0:h.length-1;return!m||o===void 0?h[m]:o}const A2={decay:Nd,inertia:Nd,tween:Ki,keyframes:Ki,spring:rl};function _x(n){typeof n.type=="string"&&(n.type=A2[n.type])}class jf{constructor(){this.updateFinished()}get finished(){return this._finished}updateFinished(){this._finished=new Promise(a=>{this.resolve=a})}notifyFinished(){this.resolve()}then(a,s){return this.finished.then(a,s)}}const M2=n=>n/100;class al extends jf{constructor(a){super(),this.state="idle",this.startTime=null,this.isStopped=!1,this.currentTime=0,this.holdTime=null,this.playbackSpeed=1,this.delayState={done:!1,value:void 0},this.stop=()=>{var o,u;const{motionValue:s}=this.options;s&&s.updatedAt!==xt.now()&&this.tick(xt.now()),this.isStopped=!0,this.state!=="idle"&&(this.teardown(),(u=(o=this.options).onStop)==null||u.call(o))},this.options=a,this.initAnimation(),this.play(),a.autoplay===!1&&this.pause()}initAnimation(){const{options:a}=this;_x(a);const{type:s=Ki,repeat:o=0,repeatDelay:u=0,repeatType:h,velocity:f=0}=a;let{keyframes:m}=a;const p=s||Ki;p!==Ki&&typeof m[0]!="number"&&(this.mixKeyframes=ss(M2,Rx(m[0],m[1])),m=[0,100]);const g=p({...a,keyframes:m});h==="mirror"&&(this.mirroredGenerator=p({...a,keyframes:[...m].reverse(),velocity:-f})),g.calculatedDuration===null&&(g.calculatedDuration=wf(g));const{calculatedDuration:v}=g;this.calculatedDuration=v,this.resolvedDuration=v+u,this.totalDuration=this.resolvedDuration*(o+1)-u,this.generator=g}updateTime(a){const s=Math.round(a-this.startTime)*this.playbackSpeed;this.holdTime!==null?this.currentTime=this.holdTime:this.currentTime=s}tick(a,s=!1){const{generator:o,totalDuration:u,mixKeyframes:h,mirroredGenerator:f,resolvedDuration:m,calculatedDuration:p}=this;if(this.startTime===null)return o.next(0);const{delay:g=0,keyframes:v,repeat:x,repeatType:b,repeatDelay:E,type:j,onUpdate:N,finalKeyframe:C}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,a):this.speed<0&&(this.startTime=Math.min(a-u/this.speed,this.startTime)),s?this.currentTime=a:this.updateTime(a);const k=this.currentTime-g*(this.playbackSpeed>=0?1:-1),D=this.playbackSpeed>=0?k<0:k>u;this.currentTime=Math.max(k,0),this.state==="finished"&&this.holdTime===null&&(this.currentTime=u);let V=this.currentTime,R=o;if(x){const q=Math.min(this.currentTime,u)/m;let U=Math.floor(q),_=q%1;!_&&q>=1&&(_=1),_===1&&U--,U=Math.min(U,x+1),!!(U%2)&&(b==="reverse"?(_=1-_,E&&(_-=E/m)):b==="mirror"&&(R=f)),V=bn(0,1,_)*m}let B;D?(this.delayState.value=v[0],B=this.delayState):B=R.next(V),h&&!D&&(B.value=h(B.value));let{done:Y}=B;!D&&p!==null&&(Y=this.playbackSpeed>=0?this.currentTime>=u:this.currentTime<=0);const A=this.holdTime===null&&(this.state==="finished"||this.state==="running"&&Y);return A&&j!==Nd&&(B.value=El(v,this.options,C,this.speed)),N&&N(B.value),A&&this.finish(),B}then(a,s){return this.finished.then(a,s)}get duration(){return It(this.calculatedDuration)}get iterationDuration(){const{delay:a=0}=this.options||{};return this.duration+It(a)}get time(){return It(this.currentTime)}set time(a){a=Ht(a),this.currentTime=a,this.startTime===null||this.holdTime!==null||this.playbackSpeed===0?this.holdTime=a:this.driver&&(this.startTime=this.driver.now()-a/this.playbackSpeed),this.driver?this.driver.start(!1):(this.startTime=0,this.state="paused",this.holdTime=a,this.tick(a))}getGeneratorVelocity(){const a=this.currentTime;if(a<=0)return this.options.velocity||0;if(this.generator.velocity)return this.generator.velocity(a);const s=this.generator.next(a).value;return zx(o=>this.generator.next(o).value,a,s)}get speed(){return this.playbackSpeed}set speed(a){const s=this.playbackSpeed!==a;s&&this.driver&&this.updateTime(xt.now()),this.playbackSpeed=a,s&&this.driver&&(this.time=It(this.currentTime))}play(){var u,h;if(this.isStopped)return;const{driver:a=h2,startTime:s}=this.options;this.driver||(this.driver=a(f=>this.tick(f))),(h=(u=this.options).onPlay)==null||h.call(u);const o=this.driver.now();this.state==="finished"?(this.updateFinished(),this.startTime=o):this.holdTime!==null?this.startTime=o-this.holdTime:this.startTime||(this.startTime=s??o),this.state==="finished"&&this.speed<0&&(this.startTime+=this.calculatedDuration),this.holdTime=null,this.state="running",this.driver.start()}pause(){this.state="paused",this.updateTime(xt.now()),this.holdTime=this.currentTime}complete(){this.state!=="running"&&this.play(),this.state="finished",this.holdTime=null}finish(){var a,s;this.notifyFinished(),this.teardown(),this.state="finished",(s=(a=this.options).onComplete)==null||s.call(a)}cancel(){var a,s;this.holdTime=null,this.startTime=0,this.tick(0),this.teardown(),(s=(a=this.options).onCancel)==null||s.call(a)}teardown(){this.state="idle",this.stopDriver(),this.startTime=this.holdTime=null}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(a){return this.startTime=0,this.tick(a,!0)}attachTimeline(a){var s;return this.options.allowFlatten&&(this.options.type="keyframes",this.options.ease="linear",this.initAnimation()),(s=this.driver)==null||s.stop(),a.observe(this)}}function k2(n){for(let a=1;a<n.length;a++)n[a]??(n[a]=n[a-1])}const Pr=n=>n*180/Math.PI,Dd=n=>{const a=Pr(Math.atan2(n[1],n[0]));return Ad(a)},R2={x:4,y:5,translateX:4,translateY:5,scaleX:0,scaleY:3,scale:n=>(Math.abs(n[0])+Math.abs(n[3]))/2,rotate:Dd,rotateZ:Dd,skewX:n=>Pr(Math.atan(n[1])),skewY:n=>Pr(Math.atan(n[2])),skew:n=>(Math.abs(n[1])+Math.abs(n[2]))/2},Ad=n=>(n=n%360,n<0&&(n+=360),n),yy=Dd,vy=n=>Math.sqrt(n[0]*n[0]+n[1]*n[1]),xy=n=>Math.sqrt(n[4]*n[4]+n[5]*n[5]),O2={x:12,y:13,z:14,translateX:12,translateY:13,translateZ:14,scaleX:vy,scaleY:xy,scale:n=>(vy(n)+xy(n))/2,rotateX:n=>Ad(Pr(Math.atan2(n[6],n[5]))),rotateY:n=>Ad(Pr(Math.atan2(-n[2],n[0]))),rotateZ:yy,rotate:yy,skewX:n=>Pr(Math.atan(n[4])),skewY:n=>Pr(Math.atan(n[1])),skew:n=>(Math.abs(n[1])+Math.abs(n[4]))/2};function Md(n){return n.includes("scale")?1:0}function kd(n,a){if(!n||n==="none")return Md(a);const s=n.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);let o,u;if(s)o=O2,u=s;else{const m=n.match(/^matrix\(([-\d.e\s,]+)\)$/u);o=R2,u=m}if(!u)return Md(a);const h=o[a],f=u[1].split(",").map(_2);return typeof h=="function"?h(f):f[h]}const z2=(n,a)=>{const{transform:s="none"}=getComputedStyle(n);return kd(s,a)};function _2(n){return parseFloat(n.trim())}const Xa=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],Fa=new Set([...Xa,"pathRotation"]),by=n=>n===Ga||n===he,V2=new Set(["x","y","z"]),B2=Xa.filter(n=>!V2.has(n));function L2(n){const a=[];return B2.forEach(s=>{const o=n.getValue(s);o!==void 0&&(a.push([s,o.get()]),o.set(s.startsWith("scale")?1:0))}),a}const gr={width:({x:n},{paddingLeft:a="0",paddingRight:s="0",boxSizing:o})=>{const u=n.max-n.min;return o==="border-box"?u:u-parseFloat(a)-parseFloat(s)},height:({y:n},{paddingTop:a="0",paddingBottom:s="0",boxSizing:o})=>{const u=n.max-n.min;return o==="border-box"?u:u-parseFloat(a)-parseFloat(s)},top:(n,{top:a})=>parseFloat(a),left:(n,{left:a})=>parseFloat(a),bottom:({y:n},{top:a})=>parseFloat(a)+(n.max-n.min),right:({x:n},{left:a})=>parseFloat(a)+(n.max-n.min),x:(n,{transform:a})=>kd(a,"x"),y:(n,{transform:a})=>kd(a,"y")};gr.translateX=gr.x;gr.translateY=gr.y;const Gr=new Set;let Rd=!1,Od=!1,zd=!1;function Vx(){if(Od){const n=Array.from(Gr).filter(o=>o.needsMeasurement),a=new Set(n.map(o=>o.element)),s=new Map;a.forEach(o=>{const u=L2(o);u.length&&(s.set(o,u),o.render())}),n.forEach(o=>o.measureInitialState()),a.forEach(o=>{o.render();const u=s.get(o);u&&u.forEach(([h,f])=>{var m;(m=o.getValue(h))==null||m.set(f)})}),n.forEach(o=>o.measureEndState()),n.forEach(o=>{o.suspendedScrollY!==void 0&&window.scrollTo(0,o.suspendedScrollY)})}Od=!1,Rd=!1,Gr.forEach(n=>n.complete(zd)),Gr.clear()}function Bx(){Gr.forEach(n=>{n.readKeyframes(),n.needsMeasurement&&(Od=!0)})}function U2(){zd=!0,Bx(),Vx(),zd=!1}class Ef{constructor(a,s,o,u,h,f=!1){this.state="pending",this.isAsync=!1,this.needsMeasurement=!1,this.unresolvedKeyframes=[...a],this.onComplete=s,this.name=o,this.motionValue=u,this.element=h,this.isAsync=f}scheduleResolve(){this.state="scheduled",this.isAsync?(Gr.add(this),Rd||(Rd=!0,qe.read(Bx),qe.resolveKeyframes(Vx))):(this.readKeyframes(),this.complete())}readKeyframes(){const{unresolvedKeyframes:a,name:s,element:o,motionValue:u}=this;if(a[0]===null){const h=u==null?void 0:u.get(),f=a[a.length-1];if(h!==void 0)a[0]=h;else if(o&&s){const m=o.readValue(s,f);m!=null&&(a[0]=m)}a[0]===void 0&&(a[0]=f),u&&h===void 0&&u.set(a[0])}k2(a)}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(a=!1){this.state="complete",this.onComplete(this.unresolvedKeyframes,this.finalKeyframe,a),Gr.delete(this)}cancel(){this.state==="scheduled"&&(Gr.delete(this),this.state="pending")}resume(){this.state==="pending"&&this.scheduleResolve()}}const H2=n=>n.startsWith("--");function Lx(n,a,s){H2(a)?n.style.setProperty(a,s):n.style[a]=s}const q2={};function Ux(n,a){const s=fx(n);return()=>q2[a]??s()}const Y2=Ux(()=>window.ScrollTimeline!==void 0,"scrollTimeline"),Hx=Ux(()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0},"linearEasing"),Xi=([n,a,s,o])=>`cubic-bezier(${n}, ${a}, ${s}, ${o})`,Sy={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:Xi([0,.65,.55,1]),circOut:Xi([.55,0,1,.45]),backIn:Xi([.31,.01,.66,-.59]),backOut:Xi([.33,1.53,.69,.99])};function qx(n,a){if(n)return typeof n=="function"?Hx()?Ox(n,a):"ease-out":jx(n)?Xi(n):Array.isArray(n)?n.map(s=>qx(s,a)||Sy.easeOut):Sy[n]}function P2(n,a,s,{delay:o=0,duration:u=300,repeat:h=0,repeatType:f="loop",ease:m="easeOut",times:p}={},g=void 0){const v={[a]:s};p&&(v.offset=p);const x=qx(m,u);Array.isArray(x)&&(v.easing=x);const b={delay:o,duration:u,easing:Array.isArray(x)?"linear":x,fill:"both",iterations:h+1,direction:f==="reverse"?"alternate":"normal"};return g&&(b.pseudoElement=g),n.animate(v,b)}function Yx(n){return typeof n=="function"&&"applyToOptions"in n}function G2({type:n,...a}){return Yx(n)&&Hx()?n.applyToOptions(a):(a.duration??(a.duration=300),a.ease??(a.ease="easeOut"),a)}class Px extends jf{constructor(a){if(super(),this.finishedTime=null,this.isStopped=!1,this.manualStartTime=null,!a)return;const{element:s,name:o,keyframes:u,pseudoElement:h,allowFlatten:f=!1,finalKeyframe:m,onComplete:p}=a;this.isPseudoElement=!!h,this.allowFlatten=f,this.options=a,jl(typeof a.type!="string");const g=G2(a);this.animation=P2(s,o,u,g,h),g.autoplay===!1&&this.animation.pause(),this.animation.onfinish=()=>{if(this.finishedTime=this.time,!h){const v=El(u,this.options,m,this.speed);this.updateMotionValue&&this.updateMotionValue(v),Lx(s,o,v),this.animation.cancel()}p==null||p(),this.notifyFinished()}}play(){this.isStopped||(this.manualStartTime=null,this.animation.play(),this.state==="finished"&&this.updateFinished())}pause(){this.animation.pause()}complete(){var a,s;(s=(a=this.animation).finish)==null||s.call(a)}cancel(){try{this.animation.cancel()}catch{}}stop(){if(this.isStopped)return;this.isStopped=!0;const{state:a}=this;a==="idle"||a==="finished"||(this.updateMotionValue?this.updateMotionValue():this.commitStyles(),this.isPseudoElement||this.cancel())}commitStyles(){var s,o,u;const a=(s=this.options)==null?void 0:s.element;!this.isPseudoElement&&(a!=null&&a.isConnected)&&((u=(o=this.animation).commitStyles)==null||u.call(o))}get duration(){var s,o;const a=((o=(s=this.animation.effect)==null?void 0:s.getComputedTiming)==null?void 0:o.call(s).duration)||0;return It(Number(a))}get iterationDuration(){const{delay:a=0}=this.options||{};return this.duration+It(a)}get time(){return It(Number(this.animation.currentTime)||0)}set time(a){const s=this.finishedTime!==null;this.manualStartTime=null,this.finishedTime=null,this.animation.currentTime=Ht(a),s&&this.animation.pause()}get speed(){return this.animation.playbackRate}set speed(a){a<0&&(this.finishedTime=null),this.animation.playbackRate=a}get state(){return this.finishedTime!==null?"finished":this.animation.playState}get startTime(){return this.manualStartTime??Number(this.animation.startTime)}set startTime(a){this.manualStartTime=this.animation.startTime=a}attachTimeline({timeline:a,rangeStart:s,rangeEnd:o,observe:u}){var h;return this.allowFlatten&&((h=this.animation.effect)==null||h.updateTiming({easing:"linear"})),this.animation.onfinish=null,a&&Y2()?(this.animation.timeline=a,s&&(this.animation.rangeStart=s),o&&(this.animation.rangeEnd=o),en):u(this)}}const Gx={anticipate:xx,backInOut:vx,circInOut:Sx};function X2(n){return n in Gx}function F2(n){typeof n.ease=="string"&&X2(n.ease)&&(n.ease=Gx[n.ease])}const nd=10;class $2 extends Px{constructor(a){F2(a),_x(a),super(a),a.startTime!==void 0&&a.autoplay!==!1&&(this.startTime=a.startTime),this.options=a}updateMotionValue(a){const{motionValue:s,onUpdate:o,onComplete:u,element:h,...f}=this.options;if(!s)return;if(a!==void 0){s.set(a);return}const m=new al({...f,autoplay:!1}),p=Math.max(nd,xt.now()-this.startTime),g=bn(0,nd,p-nd),v=m.sample(p).value,{name:x}=this.options;h&&x&&Lx(h,x,v),s.setWithVelocity(m.sample(Math.max(0,p-g)).value,v,g),m.stop()}}const wy=(n,a)=>a==="zIndex"?!1:!!(typeof n=="number"||Array.isArray(n)||typeof n=="string"&&(ln.test(n)||n==="0")&&!n.startsWith("url("));function K2(n){const a=n[0];if(n.length===1)return!0;for(let s=0;s<n.length;s++)if(n[s]!==a)return!0}function Z2(n,a,s,o){const u=n[0];if(u===null)return!1;if(a==="display"||a==="visibility")return!0;const h=n[n.length-1],f=wy(u,a),m=wy(h,a);return!f||!m?!1:K2(n)||(s==="spring"||Yx(s))&&o}function _d(n){n.duration=0,n.type="keyframes"}const Xx=new Set(["opacity","clipPath","filter","transform","backgroundColor"]),Q2=/^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;function J2(n){for(let a=0;a<n.length;a++)if(typeof n[a]=="string"&&Q2.test(n[a]))return!0;return!1}const W2=new Set(["color","backgroundColor","outlineColor","fill","stroke","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"]),I2=fx(()=>Object.hasOwnProperty.call(Element.prototype,"animate"));function ej(n){var x;const{motionValue:a,name:s,repeatDelay:o,repeatType:u,damping:h,type:f,keyframes:m}=n,p=(x=a==null?void 0:a.owner)==null?void 0:x.current;if(!(p instanceof HTMLElement)&&!(p instanceof SVGElement))return!1;const{onUpdate:g,transformTemplate:v}=a.owner.getProps();return I2()&&s&&(Xx.has(s)||W2.has(s)&&J2(m))&&(s!=="transform"||!v)&&!g&&!o&&u!=="mirror"&&h!==0&&f!=="inertia"}const tj=40;class nj extends jf{constructor({autoplay:a=!0,delay:s=0,type:o="keyframes",repeat:u=0,repeatDelay:h=0,repeatType:f="loop",keyframes:m,name:p,motionValue:g,element:v,...x}){var j;super(),this.stop=()=>{var N,C;this._animation&&(this._animation.stop(),(N=this.stopTimeline)==null||N.call(this)),(C=this.keyframeResolver)==null||C.cancel()},this.createdAt=xt.now();const b={autoplay:a,delay:s,type:o,repeat:u,repeatDelay:h,repeatType:f,name:p,motionValue:g,element:v,...x},E=(v==null?void 0:v.KeyframeResolver)||Ef;this.keyframeResolver=new E(m,(N,C,k)=>this.onKeyframesResolved(N,C,b,!k),p,g,v),(j=this.keyframeResolver)==null||j.scheduleResolve()}onKeyframesResolved(a,s,o,u){var k,D;this.keyframeResolver=void 0;const{name:h,type:f,velocity:m,delay:p,isHandoff:g,onUpdate:v}=o;this.resolvedAt=xt.now();let x=!0;Z2(a,h,f,m)||(x=!1,(vr.instantAnimations||!p)&&(v==null||v(El(a,o,s))),a[0]=a[a.length-1],_d(o),o.repeat=0);const E={startTime:u?this.resolvedAt?this.resolvedAt-this.createdAt>tj?this.resolvedAt:this.createdAt:this.createdAt:void 0,finalKeyframe:s,...o,keyframes:a},j=x&&!g&&ej(E),N=(D=(k=E.motionValue)==null?void 0:k.owner)==null?void 0:D.current;let C;if(j)try{C=new $2({...E,element:N})}catch{C=new al(E)}else C=new al(E);C.finished.then(()=>{this.notifyFinished()}).catch(en),this.pendingTimeline&&(this.stopTimeline=C.attachTimeline(this.pendingTimeline),this.pendingTimeline=void 0),this._animation=C}get finished(){return this._animation?this.animation.finished:this._finished}then(a,s){return this.finished.finally(a).then(()=>{})}get animation(){var a;return this._animation||((a=this.keyframeResolver)==null||a.resume(),U2()),this._animation}get duration(){return this.animation.duration}get iterationDuration(){return this.animation.iterationDuration}get time(){return this.animation.time}set time(a){this.animation.time=a}get speed(){return this.animation.speed}get state(){return this.animation.state}set speed(a){this.animation.speed=a}get startTime(){return this.animation.startTime}attachTimeline(a){return this._animation?this.stopTimeline=this.animation.attachTimeline(a):this.pendingTimeline=a,()=>this.stop()}play(){this.animation.play()}pause(){this.animation.pause()}complete(){this.animation.complete()}cancel(){var a;this._animation&&this.animation.cancel(),(a=this.keyframeResolver)==null||a.cancel()}}function Fx(n,a,s,o=0,u=1){const h=Array.from(n).sort((g,v)=>g.sortNodePosition(v)).indexOf(a),f=n.size,m=(f-1)*o;return typeof s=="function"?s(h,f):u===1?h*o:m-h*o}const jy=30,rj=n=>!isNaN(parseFloat(n));class aj{constructor(a,s={}){this.canTrackVelocity=null,this.events={},this.updateAndNotify=o=>{var h;const u=xt.now();if(this.updatedAt!==u&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(o),this.current!==this.prev&&((h=this.events.change)==null||h.notify(this.current),this.dependents))for(const f of this.dependents)f.dirty()},this.hasAnimated=!1,this.setCurrent(a),this.owner=s.owner}setCurrent(a){this.current=a,this.updatedAt=xt.now(),this.canTrackVelocity===null&&a!==void 0&&(this.canTrackVelocity=rj(this.current))}setPrevFrameValue(a=this.current){this.prevFrameValue=a,this.prevUpdatedAt=this.updatedAt}onChange(a){return this.on("change",a)}on(a,s){this.events[a]||(this.events[a]=new pf);const o=this.events[a].add(s);return a==="change"?()=>{o(),qe.read(()=>{this.events.change.getSize()||this.stop()})}:o}clearListeners(){for(const a in this.events)this.events[a].clear()}attach(a,s){this.passiveEffect=a,this.stopPassiveEffect=s}set(a){this.passiveEffect?this.passiveEffect(a,this.updateAndNotify):this.updateAndNotify(a)}setWithVelocity(a,s,o){this.set(s),this.prev=void 0,this.prevFrameValue=a,this.prevUpdatedAt=this.updatedAt-o}jump(a,s=!0){this.updateAndNotify(a),this.prev=a,this.prevUpdatedAt=this.prevFrameValue=void 0,s&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}dirty(){var a;(a=this.events.change)==null||a.notify(this.current)}addDependent(a){this.dependents||(this.dependents=new Set),this.dependents.add(a)}removeDependent(a){this.dependents&&this.dependents.delete(a)}get(){return this.current}getPrevious(){return this.prev}getVelocity(){const a=xt.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||a-this.updatedAt>jy)return 0;const s=Math.min(this.updatedAt-this.prevUpdatedAt,jy);return hx(parseFloat(this.current)-parseFloat(this.prevFrameValue),s)}start(a){return this.stop(),new Promise(s=>{this.hasAnimated=!0,this.animation=a(s),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){var a,s;(a=this.dependents)==null||a.clear(),(s=this.events.destroy)==null||s.notify(),this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}}function Ya(n,a){return new aj(n,a)}function $x(n,a){if(n!=null&&n.inherit&&a){const{inherit:s,...o}=n;return{...a,...o}}return n}function Tf(n,a){const s=(n==null?void 0:n[a])??(n==null?void 0:n.default)??n;return s!==n?$x(s,n):s}const ij={type:"spring",stiffness:500,damping:25,restSpeed:10},sj=n=>({type:"spring",stiffness:550,damping:n===0?2*Math.sqrt(550):30,restSpeed:10}),oj={type:"keyframes",duration:.8},lj={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},cj=(n,{keyframes:a})=>a.length>2?oj:Fa.has(n)?n.startsWith("scale")?sj(a[1]):ij:lj,uj=new Set(["when","delay","delayChildren","staggerChildren","staggerDirection","repeat","repeatType","repeatDelay","from","elapsed"]);function dj(n){for(const a in n)if(!uj.has(a))return!0;return!1}const Cf=(n,a,s,o={},u,h)=>f=>{const m=Tf(o,n)||{},p=m.delay||o.delay||0;let{elapsed:g=0}=o;g=g-Ht(p);const v={keyframes:Array.isArray(s)?s:[null,s],ease:"easeOut",velocity:a.getVelocity(),...m,delay:-g,onUpdate:b=>{a.set(b),m.onUpdate&&m.onUpdate(b)},onComplete:()=>{f(),m.onComplete&&m.onComplete()},name:n,motionValue:a,element:h?void 0:u};dj(m)||Object.assign(v,cj(n,v)),v.duration&&(v.duration=Ht(v.duration)),v.repeatDelay&&(v.repeatDelay=Ht(v.repeatDelay)),v.from!==void 0&&(v.keyframes[0]=v.from);let x=!1;if((v.type===!1||v.duration===0&&!v.repeatDelay)&&(_d(v),v.delay===0&&(x=!0)),(vr.instantAnimations||vr.skipAnimations||u!=null&&u.shouldSkipAnimations||m.skipAnimations)&&(x=!0,_d(v),v.delay=0),v.allowFlatten=!m.type&&!m.ease,x&&!h&&a.get()!==void 0){const b=El(v.keyframes,m);if(b!==void 0){qe.update(()=>{v.onUpdate(b),v.onComplete()});return}}return m.isSync?new al(v):new nj(v)},fj=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function hj(n){const a=fj.exec(n);if(!a)return[,];const[,s,o,u]=a;return[`--${s??o}`,u]}function Kx(n,a,s=1){const[o,u]=hj(n);if(!o)return;const h=window.getComputedStyle(a).getPropertyValue(o);if(h){const f=h.trim();return cx(f)?parseFloat(f):f}return vf(u)?Kx(u,a,s+1):u}function Ey(n){const a=[{},{}];return n==null||n.values.forEach((s,o)=>{a[0][o]=s.get(),a[1][o]=s.getVelocity()}),a}function Nf(n,a,s,o){if(typeof a=="function"){const[u,h]=Ey(o);a=a(s!==void 0?s:n.custom,u,h)}if(typeof a=="string"&&(a=n.variants&&n.variants[a]),typeof a=="function"){const[u,h]=Ey(o);a=a(s!==void 0?s:n.custom,u,h)}return a}function Xr(n,a,s){const o=n.getProps();return Nf(o,a,s!==void 0?s:o.custom,n)}const Zx=new Set(["width","height","top","left","right","bottom",...Xa]),Vd=n=>Array.isArray(n);function mj(n,a,s){n.hasValue(a)?n.getValue(a).set(s):n.addValue(a,Ya(s))}function pj(n){return Vd(n)?n[n.length-1]||0:n}function gj(n,a){const s=Xr(n,a);let{transitionEnd:o={},transition:u={},...h}=s||{};h={...h,...o};for(const f in h){const m=pj(h[f]);mj(n,f,m)}}const pt=n=>!!(n&&n.getVelocity);function yj(n){return!!(pt(n)&&n.add)}function Bd(n,a){const s=n.getValue("willChange");if(yj(s))return s.add(a);if(!s&&vr.WillChange){const o=new vr.WillChange("auto");n.addValue("willChange",o),o.add(a)}}function Df(n){return n.replace(/([A-Z])/g,a=>`-${a.toLowerCase()}`)}const vj="framerAppearId",Qx="data-"+Df(vj);function Jx(n){return n.props[Qx]}function xj({protectedKeys:n,needsAnimating:a},s){const o=n.hasOwnProperty(s)&&a[s]!==!0;return a[s]=!1,o}function Wx(n,a,{delay:s=0,transitionOverride:o,type:u}={}){let{transition:h,transitionEnd:f,...m}=a;const p=n.getDefaultTransition();h=h?$x(h,p):p;const g=h==null?void 0:h.reduceMotion,v=h==null?void 0:h.skipAnimations;o&&(h=o);const x=[],b=u&&n.animationState&&n.animationState.getState()[u],E=h==null?void 0:h.path;E&&E.animateVisualElement(n,m,h,s,x);for(const j in m){const N=n.getValue(j,n.latestValues[j]??null),C=m[j];if(C===void 0||b&&xj(b,j))continue;const k={delay:s,...Tf(h||{},j)};v&&(k.skipAnimations=!0);const D=N.get();if(D!==void 0&&!N.isAnimating()&&!Array.isArray(C)&&C===D&&!k.velocity){qe.update(()=>N.set(C));continue}let V=!1;if(window.MotionHandoffAnimation){const Y=Jx(n);if(Y){const A=window.MotionHandoffAnimation(Y,j,qe);A!==null&&(k.startTime=A,V=!0)}}Bd(n,j);const R=g??n.shouldReduceMotion;N.start(Cf(j,N,C,R&&Zx.has(j)?{type:!1}:k,n,V));const B=N.animation;B&&x.push(B)}if(f){const j=()=>qe.update(()=>{f&&gj(n,f)});x.length?Promise.all(x).then(j):j()}return x}function Ld(n,a,s={}){var p;const o=Xr(n,a,s.type==="exit"?(p=n.presenceContext)==null?void 0:p.custom:void 0);let{transition:u=n.getDefaultTransition()||{}}=o||{};s.transitionOverride&&(u=s.transitionOverride);const h=o?()=>Promise.all(Wx(n,o,s)):()=>Promise.resolve(),f=n.variantChildren&&n.variantChildren.size?(g=0)=>{const{delayChildren:v=0,staggerChildren:x,staggerDirection:b}=u;return bj(n,a,g,v,x,b,s)}:()=>Promise.resolve(),{when:m}=u;if(m){const[g,v]=m==="beforeChildren"?[h,f]:[f,h];return g().then(()=>v())}else return Promise.all([h(),f(s.delay)])}function bj(n,a,s=0,o=0,u=0,h=1,f){const m=[];for(const p of n.variantChildren)p.notify("AnimationStart",a),m.push(Ld(p,a,{...f,delay:s+(typeof o=="function"?0:o)+Fx(n.variantChildren,p,o,u,h)}).then(()=>p.notify("AnimationComplete",a)));return Promise.all(m)}function Sj(n,a,s={}){n.notify("AnimationStart",a);let o;if(Array.isArray(a)){const u=a.map(h=>Ld(n,h,s));o=Promise.all(u)}else if(typeof a=="string")o=Ld(n,a,s);else{const u=typeof a=="function"?Xr(n,a,s.custom):a;o=Promise.all(Wx(n,u,s))}return o.then(()=>{n.notify("AnimationComplete",a)})}const wj={test:n=>n==="auto",parse:n=>n},Ix=n=>a=>a.test(n),eb=[Ga,he,vn,qn,Kw,$w,wj],Ty=n=>eb.find(Ix(n));function jj(n){return typeof n=="number"?n===0:n!==null?n==="none"||n==="0"||dx(n):!0}const Ej=new Set(["brightness","contrast","saturate","opacity"]);function Tj(n){const[a,s]=n.slice(0,-1).split("(");if(a==="drop-shadow")return n;const[o]=s.match(xf)||[];if(!o)return n;const u=s.replace(o,"");let h=Ej.has(a)?1:0;return o!==s&&(h*=100),a+"("+h+u+")"}const Cj=/\b([a-z-]*)\(.*?\)/gu,Ud={...ln,getAnimatableNone:n=>{const a=n.match(Cj);return a?a.map(Tj).join(" "):n}},Hd={...ln,getAnimatableNone:n=>{const a=ln.parse(n);return ln.createTransformer(n)(a.map(o=>typeof o=="number"?0:typeof o=="object"?{...o,alpha:1}:o))}},Cy={...Ga,transform:Math.round},Nj={rotate:qn,pathRotation:qn,rotateX:qn,rotateY:qn,rotateZ:qn,scale:ko,scaleX:ko,scaleY:ko,scaleZ:ko,skew:qn,skewX:qn,skewY:qn,distance:he,translateX:he,translateY:he,translateZ:he,x:he,y:he,z:he,perspective:he,transformPerspective:he,opacity:Ii,originX:fy,originY:fy,originZ:he},il={borderWidth:he,borderTopWidth:he,borderRightWidth:he,borderBottomWidth:he,borderLeftWidth:he,borderRadius:he,borderTopLeftRadius:he,borderTopRightRadius:he,borderBottomRightRadius:he,borderBottomLeftRadius:he,width:he,maxWidth:he,height:he,maxHeight:he,top:he,right:he,bottom:he,left:he,inset:he,insetBlock:he,insetBlockStart:he,insetBlockEnd:he,insetInline:he,insetInlineStart:he,insetInlineEnd:he,padding:he,paddingTop:he,paddingRight:he,paddingBottom:he,paddingLeft:he,paddingBlock:he,paddingBlockStart:he,paddingBlockEnd:he,paddingInline:he,paddingInlineStart:he,paddingInlineEnd:he,margin:he,marginTop:he,marginRight:he,marginBottom:he,marginLeft:he,marginBlock:he,marginBlockStart:he,marginBlockEnd:he,marginInline:he,marginInlineStart:he,marginInlineEnd:he,fontSize:he,backgroundPositionX:he,backgroundPositionY:he,...Nj,zIndex:Cy,fillOpacity:Ii,strokeOpacity:Ii,numOctaves:Cy},Dj={...il,color:rt,backgroundColor:rt,outlineColor:rt,fill:rt,stroke:rt,borderColor:rt,borderTopColor:rt,borderRightColor:rt,borderBottomColor:rt,borderLeftColor:rt,filter:Ud,WebkitFilter:Ud,mask:Hd,WebkitMask:Hd},tb=n=>Dj[n],Aj=new Set([Ud,Hd]);function nb(n,a){let s=tb(n);return Aj.has(s)||(s=ln),s.getAnimatableNone?s.getAnimatableNone(a):void 0}const Mj=new Set(["auto","none","0"]);function kj(n,a,s){let o=0,u;for(;o<n.length&&!u;){const h=n[o];typeof h=="string"&&!Mj.has(h)&&qa(h).values.length&&(u=n[o]),o++}if(u&&s)for(const h of a)n[h]=nb(s,u)}class Rj extends Ef{constructor(a,s,o,u,h){super(a,s,o,u,h,!0)}readKeyframes(){const{unresolvedKeyframes:a,element:s,name:o}=this;if(!s||!s.current)return;super.readKeyframes();for(let v=0;v<a.length;v++){let x=a[v];if(typeof x=="string"&&(x=x.trim(),vf(x))){const b=Kx(x,s.current);b!==void 0&&(a[v]=b),v===a.length-1&&(this.finalKeyframe=x)}}if(this.resolveNoneKeyframes(),!Zx.has(o)||a.length!==2)return;const[u,h]=a,f=Ty(u),m=Ty(h),p=dy(u),g=dy(h);if(p!==g&&gr[o]){this.needsMeasurement=!0;return}if(f!==m)if(by(f)&&by(m))for(let v=0;v<a.length;v++){const x=a[v];typeof x=="string"&&(a[v]=parseFloat(x))}else gr[o]&&(this.needsMeasurement=!0)}resolveNoneKeyframes(){const{unresolvedKeyframes:a,name:s}=this,o=[];for(let u=0;u<a.length;u++)(a[u]===null||jj(a[u]))&&o.push(u);o.length&&kj(a,o,s)}measureInitialState(){const{element:a,unresolvedKeyframes:s,name:o}=this;if(!a||!a.current)return;o==="height"&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=gr[o](a.measureViewportBox(),window.getComputedStyle(a.current)),s[0]=this.measuredOrigin;const u=s[s.length-1];u!==void 0&&a.getValue(o,u).jump(u,!1)}measureEndState(){var m;const{element:a,name:s,unresolvedKeyframes:o}=this;if(!a||!a.current)return;const u=a.getValue(s);u&&u.jump(this.measuredOrigin,!1);const h=o.length-1,f=o[h];o[h]=gr[s](a.measureViewportBox(),window.getComputedStyle(a.current)),f!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=f),(m=this.removedTransforms)!=null&&m.length&&this.removedTransforms.forEach(([p,g])=>{a.getValue(p).set(g)}),this.resolveNoneKeyframes()}}const Af=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"];function rb(n,a,s){if(n==null)return[];if(n instanceof EventTarget)return[n];if(typeof n=="string"){let o=document;const u=(s==null?void 0:s[n])??o.querySelectorAll(n);return u?Array.from(u):[]}return Array.from(n).filter(o=>o!=null)}const qd=(n,a)=>a&&typeof n=="number"?a.transform(n):n;function Go(n){return ux(n)&&"offsetHeight"in n&&!("ownerSVGElement"in n)}const{schedule:Mf}=Ex(queueMicrotask,!1),on={x:!1,y:!1};function ab(){return on.x||on.y}function Oj(n){return n==="x"||n==="y"?on[n]?null:(on[n]=!0,()=>{on[n]=!1}):on.x||on.y?null:(on.x=on.y=!0,()=>{on.x=on.y=!1})}function ib(n,a){const s=rb(n),o=new AbortController,u={passive:!0,...a,signal:o.signal};return[s,u,()=>o.abort()]}function zj(n){return!(n.pointerType==="touch"||ab())}function _j(n,a,s={}){const[o,u,h]=ib(n,s);return o.forEach(f=>{let m=!1,p=!1,g;const v=()=>{f.removeEventListener("pointerleave",j)},x=C=>{g&&(g(C),g=void 0),v()},b=C=>{m=!1,window.removeEventListener("pointerup",b),window.removeEventListener("pointercancel",b),p&&(p=!1,x(C))},E=()=>{m=!0,window.addEventListener("pointerup",b,u),window.addEventListener("pointercancel",b,u)},j=C=>{if(C.pointerType!=="touch"){if(m){p=!0;return}x(C)}},N=C=>{if(!zj(C))return;p=!1;const k=a(f,C);typeof k=="function"&&(g=k,f.addEventListener("pointerleave",j,u))};f.addEventListener("pointerenter",N,u),f.addEventListener("pointerdown",E,u)}),h}const sb=(n,a)=>a?n===a?!0:sb(n,a.parentElement):!1,kf=n=>n.pointerType==="mouse"?typeof n.button!="number"||n.button<=0:n.isPrimary!==!1,Vj=new Set(["BUTTON","INPUT","SELECT","TEXTAREA","A"]);function Bj(n){return Vj.has(n.tagName)||n.isContentEditable===!0}const Lj=new Set(["INPUT","SELECT","TEXTAREA"]);function Uj(n){return Lj.has(n.tagName)||n.isContentEditable===!0}const Xo=new WeakSet;function Ny(n){return a=>{a.key==="Enter"&&n(a)}}function rd(n,a){n.dispatchEvent(new PointerEvent("pointer"+a,{isPrimary:!0,bubbles:!0}))}const Hj=(n,a)=>{const s=n.currentTarget;if(!s)return;const o=Ny(()=>{if(Xo.has(s))return;rd(s,"down");const u=Ny(()=>{rd(s,"up")}),h=()=>rd(s,"cancel");s.addEventListener("keyup",u,a),s.addEventListener("blur",h,a)});s.addEventListener("keydown",o,a),s.addEventListener("blur",()=>s.removeEventListener("keydown",o),a)};function Dy(n){return kf(n)&&!ab()}const Ay=new WeakSet;function qj(n,a,s={}){const[o,u,h]=ib(n,s),f=m=>{const p=m.currentTarget;if(!Dy(m)||Ay.has(m))return;Xo.add(p),s.stopPropagation&&Ay.add(m);const g=a(p,m),v={...u,capture:!0},x=(j,N)=>{window.removeEventListener("pointerup",b,v),window.removeEventListener("pointercancel",E,v),Xo.has(p)&&Xo.delete(p),Dy(j)&&typeof g=="function"&&g(j,{success:N})},b=j=>{x(j,p===window||p===document||s.useGlobalTarget||sb(p,j.target))},E=j=>{x(j,!1)};window.addEventListener("pointerup",b,v),window.addEventListener("pointercancel",E,v)};return o.forEach(m=>{(s.useGlobalTarget?window:m).addEventListener("pointerdown",f,u),Go(m)&&(m.addEventListener("focus",g=>Hj(g,u)),!Bj(m)&&!m.hasAttribute("tabindex")&&(m.tabIndex=0))}),h}function Rf(n){return ux(n)&&"ownerSVGElement"in n}const Fo=new WeakMap;let pr;const ob=(n,a,s)=>(o,u)=>u&&u[0]?u[0][n+"Size"]:Rf(o)&&"getBBox"in o?o.getBBox()[a]:o[s],Yj=ob("inline","width","offsetWidth"),Pj=ob("block","height","offsetHeight");function Gj({target:n,borderBoxSize:a}){var s;(s=Fo.get(n))==null||s.forEach(o=>{o(n,{get width(){return Yj(n,a)},get height(){return Pj(n,a)}})})}function Xj(n){n.forEach(Gj)}function Fj(){typeof ResizeObserver>"u"||(pr=new ResizeObserver(Xj))}function $j(n,a){pr||Fj();const s=rb(n);return s.forEach(o=>{let u=Fo.get(o);u||(u=new Set,Fo.set(o,u)),u.add(a),pr==null||pr.observe(o)}),()=>{s.forEach(o=>{const u=Fo.get(o);u==null||u.delete(a),u!=null&&u.size||pr==null||pr.unobserve(o)})}}const $o=new Set;let La;function Kj(){La=()=>{const n={get width(){return window.innerWidth},get height(){return window.innerHeight}};$o.forEach(a=>a(n))},window.addEventListener("resize",La)}function Zj(n){return $o.add(n),La||Kj(),()=>{$o.delete(n),!$o.size&&typeof La=="function"&&(window.removeEventListener("resize",La),La=void 0)}}function My(n,a){return typeof n=="function"?Zj(n):$j(n,a)}function Qj(n){return Rf(n)&&n.tagName==="svg"}const Jj=[...eb,rt,ln],Wj=n=>Jj.find(Ix(n)),ky=()=>({translate:0,scale:1,origin:0,originPoint:0}),Ua=()=>({x:ky(),y:ky()}),Ry=()=>({min:0,max:0}),it=()=>({x:Ry(),y:Ry()}),Ij=new WeakMap;function Tl(n){return n!==null&&typeof n=="object"&&typeof n.start=="function"}function es(n){return typeof n=="string"||Array.isArray(n)}const Of=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],zf=["initial",...Of];function Cl(n){return Tl(n.animate)||zf.some(a=>es(n[a]))}function lb(n){return!!(Cl(n)||n.variants)}function eE(n,a,s){for(const o in a){const u=a[o],h=s[o];if(pt(u))n.addValue(o,u);else if(pt(h))n.addValue(o,Ya(u,{owner:n}));else if(h!==u)if(n.hasValue(o)){const f=n.getValue(o);f.liveStyle===!0?f.jump(u):f.hasAnimated||f.set(u)}else{const f=n.getStaticValue(o);n.addValue(o,Ya(f!==void 0?f:u,{owner:n}))}}for(const o in s)a[o]===void 0&&n.removeValue(o);return a}const sl={current:null},_f={current:!1},tE=typeof window<"u";function cb(){if(_f.current=!0,!!tE)if(window.matchMedia){const n=window.matchMedia("(prefers-reduced-motion)"),a=()=>sl.current=n.matches;n.addEventListener("change",a),a()}else sl.current=!1}const Oy=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"];let ol={};function ub(n){ol=n}function nE(){return ol}class rE{scrapeMotionValuesFromProps(a,s,o){return{}}constructor({parent:a,props:s,presenceContext:o,reducedMotionConfig:u,skipAnimations:h,blockInitialAnimation:f,visualState:m},p={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.shouldSkipAnimations=!1,this.values=new Map,this.KeyframeResolver=Ef,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.hasBeenMounted=!1,this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{const E=xt.now();this.renderScheduledAt<E&&(this.renderScheduledAt=E,qe.render(this.render,!1,!0))};const{latestValues:g,renderState:v}=m;this.latestValues=g,this.baseTarget={...g},this.initialValues=s.initial?{...g}:{},this.renderState=v,this.parent=a,this.props=s,this.presenceContext=o,this.depth=a?a.depth+1:0,this.reducedMotionConfig=u,this.skipAnimationsConfig=h,this.options=p,this.blockInitialAnimation=!!f,this.isControllingVariants=Cl(s),this.isVariantNode=lb(s),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(a&&a.current);const{willChange:x,...b}=this.scrapeMotionValuesFromProps(s,{},this);for(const E in b){const j=b[E];g[E]!==void 0&&pt(j)&&j.set(g[E])}}mount(a){var s,o;if(this.hasBeenMounted)for(const u in this.initialValues)(s=this.values.get(u))==null||s.jump(this.initialValues[u]),this.latestValues[u]=this.initialValues[u];this.current=a,Ij.set(a,this),this.projection&&!this.projection.instance&&this.projection.mount(a),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((u,h)=>this.bindToMotionValue(h,u)),this.reducedMotionConfig==="never"?this.shouldReduceMotion=!1:this.reducedMotionConfig==="always"?this.shouldReduceMotion=!0:(_f.current||cb(),this.shouldReduceMotion=sl.current),this.shouldSkipAnimations=this.skipAnimationsConfig??!1,(o=this.parent)==null||o.addChild(this),this.update(this.props,this.presenceContext),this.hasBeenMounted=!0}unmount(){var a;this.projection&&this.projection.unmount(),xr(this.notifyUpdate),xr(this.render),this.valueSubscriptions.forEach(s=>s()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),(a=this.parent)==null||a.removeChild(this);for(const s in this.events)this.events[s].clear();for(const s in this.features){const o=this.features[s];o&&(o.unmount(),o.isMounted=!1)}this.current=null}addChild(a){this.children.add(a),this.enteringChildren??(this.enteringChildren=new Set),this.enteringChildren.add(a)}removeChild(a){this.children.delete(a),this.enteringChildren&&this.enteringChildren.delete(a)}bindToMotionValue(a,s){if(this.valueSubscriptions.has(a)&&this.valueSubscriptions.get(a)(),s.accelerate&&Xx.has(a)&&this.current instanceof HTMLElement){const{factory:f,keyframes:m,times:p,ease:g,duration:v}=s.accelerate,x=new Px({element:this.current,name:a,keyframes:m,times:p,ease:g,duration:Ht(v)}),b=f(x);this.valueSubscriptions.set(a,()=>{b(),x.cancel()});return}const o=Fa.has(a);o&&this.onBindTransform&&this.onBindTransform();const u=s.on("change",f=>{this.latestValues[a]=f,this.props.onUpdate&&qe.preRender(this.notifyUpdate),o&&this.projection&&(this.projection.isTransformDirty=!0),this.scheduleRender()});let h;typeof window<"u"&&window.MotionCheckAppearSync&&(h=window.MotionCheckAppearSync(this,a,s)),this.valueSubscriptions.set(a,()=>{u(),h&&h()})}sortNodePosition(a){return!this.current||!this.sortInstanceNodePosition||this.type!==a.type?0:this.sortInstanceNodePosition(this.current,a.current)}updateFeatures(){let a="animation";for(a in ol){const s=ol[a];if(!s)continue;const{isEnabled:o,Feature:u}=s;if(!this.features[a]&&u&&o(this.props)&&(this.features[a]=new u(this)),this.features[a]){const h=this.features[a];h.isMounted?h.update():(h.mount(),h.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):it()}getStaticValue(a){return this.latestValues[a]}setStaticValue(a,s){this.latestValues[a]=s}update(a,s){(a.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=a,this.prevPresenceContext=this.presenceContext,this.presenceContext=s;for(let o=0;o<Oy.length;o++){const u=Oy[o];this.propEventSubscriptions[u]&&(this.propEventSubscriptions[u](),delete this.propEventSubscriptions[u]);const h="on"+u,f=a[h];f&&(this.propEventSubscriptions[u]=this.on(u,f))}this.prevMotionValues=eE(this,this.scrapeMotionValuesFromProps(a,this.prevProps||{},this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue()}getProps(){return this.props}getVariant(a){return this.props.variants?this.props.variants[a]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(a){const s=this.getClosestVariantNode();if(s)return s.variantChildren&&s.variantChildren.add(a),()=>s.variantChildren.delete(a)}addValue(a,s){const o=this.values.get(a);s!==o&&(o&&this.removeValue(a),this.bindToMotionValue(a,s),this.values.set(a,s),this.latestValues[a]=s.get())}removeValue(a){this.values.delete(a);const s=this.valueSubscriptions.get(a);s&&(s(),this.valueSubscriptions.delete(a)),delete this.latestValues[a],this.removeValueFromRenderState(a,this.renderState)}hasValue(a){return this.values.has(a)}getValue(a,s){if(this.props.values&&this.props.values[a])return this.props.values[a];let o=this.values.get(a);return o===void 0&&s!==void 0&&(o=Ya(s===null?void 0:s,{owner:this}),this.addValue(a,o)),o}readValue(a,s){let o=this.latestValues[a]!==void 0||!this.current?this.latestValues[a]:this.getBaseTargetFromProps(this.props,a)??this.readValueFromInstance(this.current,a,this.options);return o!=null&&(typeof o=="string"&&(cx(o)||dx(o))?o=parseFloat(o):!Wj(o)&&ln.test(s)&&(o=nb(a,s)),this.setBaseTarget(a,pt(o)?o.get():o)),pt(o)?o.get():o}setBaseTarget(a,s){this.baseTarget[a]=s}getBaseTarget(a){var h;const{initial:s}=this.props;let o;if(typeof s=="string"||typeof s=="object"){const f=Nf(this.props,s,(h=this.presenceContext)==null?void 0:h.custom);f&&(o=f[a])}if(s&&o!==void 0)return o;const u=this.getBaseTargetFromProps(this.props,a);return u!==void 0&&!pt(u)?u:this.initialValues[a]!==void 0&&o===void 0?void 0:this.baseTarget[a]}on(a,s){return this.events[a]||(this.events[a]=new pf),this.events[a].add(s)}notify(a,...s){this.events[a]&&this.events[a].notify(...s)}scheduleRenderMicrotask(){Mf.render(this.render)}}class db extends rE{constructor(){super(...arguments),this.KeyframeResolver=Rj}sortInstanceNodePosition(a,s){return a.compareDocumentPosition(s)&2?1:-1}getBaseTargetFromProps(a,s){const o=a.style;return o?o[s]:void 0}removeValueFromRenderState(a,{vars:s,style:o}){delete s[a],delete o[a]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);const{children:a}=this.props;pt(a)&&(this.childSubscription=a.on("change",s=>{this.current&&(this.current.textContent=`${s}`)}))}}class Sr{constructor(a){this.isMounted=!1,this.node=a}update(){}}function fb({top:n,left:a,right:s,bottom:o}){return{x:{min:a,max:s},y:{min:n,max:o}}}function aE({x:n,y:a}){return{top:a.min,right:n.max,bottom:a.max,left:n.min}}function iE(n,a){if(!a)return n;const s=a({x:n.left,y:n.top}),o=a({x:n.right,y:n.bottom});return{top:s.y,left:s.x,bottom:o.y,right:o.x}}function ad(n){return n===void 0||n===1}function Yd({scale:n,scaleX:a,scaleY:s}){return!ad(n)||!ad(a)||!ad(s)}function qr(n){return Yd(n)||hb(n)||n.z||n.rotate||n.rotateX||n.rotateY||n.skewX||n.skewY}function hb(n){return zy(n.x)||zy(n.y)}function zy(n){return n&&n!=="0%"}function ll(n,a,s){const o=n-s,u=a*o;return s+u}function _y(n,a,s,o,u){return u!==void 0&&(n=ll(n,u,o)),ll(n,s,o)+a}function Pd(n,a=0,s=1,o,u){n.min=_y(n.min,a,s,o,u),n.max=_y(n.max,a,s,o,u)}function mb(n,{x:a,y:s}){Pd(n.x,a.translate,a.scale,a.originPoint),Pd(n.y,s.translate,s.scale,s.originPoint)}const Vy=.999999999999,By=1.0000000000001;function sE(n,a,s,o=!1){var m;const u=s.length;if(!u)return;a.x=a.y=1;let h,f;for(let p=0;p<u;p++){h=s[p],f=h.projectionDelta;const{visualElement:g}=h.options;g&&g.props.style&&g.props.style.display==="contents"||(o&&h.options.layoutScroll&&h.scroll&&h!==h.root&&(gn(n.x,-h.scroll.offset.x),gn(n.y,-h.scroll.offset.y)),f&&(a.x*=f.x.scale,a.y*=f.y.scale,mb(n,f)),o&&qr(h.latestValues)&&Ko(n,h.latestValues,(m=h.layout)==null?void 0:m.layoutBox))}a.x<By&&a.x>Vy&&(a.x=1),a.y<By&&a.y>Vy&&(a.y=1)}function gn(n,a){n.min+=a,n.max+=a}function Ly(n,a,s,o,u=.5){const h=He(n.min,n.max,u);Pd(n,a,s,h,o)}function Uy(n,a){return typeof n=="string"?parseFloat(n)/100*(a.max-a.min):n}function Ko(n,a,s){const o=s??n;Ly(n.x,Uy(a.x,o.x),a.scaleX,a.scale,a.originX),Ly(n.y,Uy(a.y,o.y),a.scaleY,a.scale,a.originY)}function pb(n,a){return fb(iE(n.getBoundingClientRect(),a))}function oE(n,a,s){const o=pb(n,s),{scroll:u}=a;return u&&(gn(o.x,u.offset.x),gn(o.y,u.offset.y)),o}const lE={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},cE=Xa.length;function uE(n,a,s){let o="",u=!0;for(let f=0;f<cE;f++){const m=Xa[f],p=n[m];if(p===void 0)continue;let g=!0;if(typeof p=="number")g=p===(m.startsWith("scale")?1:0);else{const v=parseFloat(p);g=m.startsWith("scale")?v===1:v===0}if(!g||s){const v=qd(p,il[m]);if(!g){u=!1;const x=lE[m]||m;o+=`${x}(${v}) `}s&&(a[m]=v)}}const h=n.pathRotation;return h&&(u=!1,o+=`rotate(${qd(h,il.pathRotation)}) `),o=o.trim(),s?o=s(a,u?"":o):u&&(o="none"),o}function Vf(n,a,s){const{style:o,vars:u,transformOrigin:h}=n;let f=!1,m=!1;for(const p in a){const g=a[p];if(Fa.has(p)){f=!0;continue}else if(Cx(p)){u[p]=g;continue}else{const v=qd(g,il[p]);p.startsWith("origin")?(m=!0,h[p]=v):o[p]=v}}if(a.transform||(f||s?o.transform=uE(a,n.transform,s):o.transform&&(o.transform="none")),m){const{originX:p="50%",originY:g="50%",originZ:v=0}=h;o.transformOrigin=`${p} ${g} ${v}`}}function gb(n,{style:a,vars:s},o,u){const h=n.style;let f;for(f in a)h[f]=a[f];u==null||u.applyProjectionStyles(h,o);for(f in s)h.setProperty(f,s[f])}function Hy(n,a){return a.max===a.min?0:n/(a.max-a.min)*100}const Pi={correct:(n,a)=>{if(!a.target)return n;if(typeof n=="string")if(he.test(n))n=parseFloat(n);else return n;const s=Hy(n,a.target.x),o=Hy(n,a.target.y);return`${s}% ${o}%`}},dE={correct:(n,{treeScale:a,projectionDelta:s})=>{const o=n,u=ln.parse(n);if(u.length>5)return o;const h=ln.createTransformer(n),f=typeof u[0]!="number"?1:0,m=s.x.scale*a.x,p=s.y.scale*a.y;u[0+f]/=m,u[1+f]/=p;const g=He(m,p,.5);return typeof u[2+f]=="number"&&(u[2+f]/=g),typeof u[3+f]=="number"&&(u[3+f]/=g),h(u)}},Gd={borderRadius:{...Pi,applyTo:[...Af]},borderTopLeftRadius:Pi,borderTopRightRadius:Pi,borderBottomLeftRadius:Pi,borderBottomRightRadius:Pi,boxShadow:dE};function yb(n,{layout:a,layoutId:s}){return Fa.has(n)||n.startsWith("origin")||(a||s!==void 0)&&(!!Gd[n]||n==="opacity")}function Bf(n,a,s){var f;const o=n.style,u=a==null?void 0:a.style,h={};if(!o)return h;for(const m in o)(pt(o[m])||u&&pt(u[m])||yb(m,n)||((f=s==null?void 0:s.getValue(m))==null?void 0:f.liveStyle)!==void 0)&&(h[m]=o[m]);return h}function fE(n){return window.getComputedStyle(n)}class hE extends db{constructor(){super(...arguments),this.type="html",this.renderInstance=gb}mount(a){jl(!!a.style),super.mount(a)}readValueFromInstance(a,s){var o;if(Fa.has(s))return(o=this.projection)!=null&&o.isProjecting?Md(s):z2(a,s);{const u=fE(a),h=(Cx(s)?u.getPropertyValue(s):u[s])||0;return typeof h=="string"?h.trim():h}}measureInstanceViewportBox(a,{transformPagePoint:s}){return pb(a,s)}build(a,s,o){Vf(a,s,o.transformTemplate)}scrapeMotionValuesFromProps(a,s,o){return Bf(a,s,o)}}const mE={offset:"stroke-dashoffset",array:"stroke-dasharray"},pE={offset:"strokeDashoffset",array:"strokeDasharray"};function gE(n,a,s=1,o=0,u=!0){n.pathLength=1;const h=u?mE:pE;n[h.offset]=`${-o}`,n[h.array]=`${a} ${s}`}const yE=["offsetDistance","offsetPath","offsetRotate","offsetAnchor"];function vb(n,{attrX:a,attrY:s,attrScale:o,pathLength:u,pathSpacing:h=1,pathOffset:f=0,...m},p,g,v){if(Vf(n,m,g),p){n.style.viewBox&&(n.attrs.viewBox=n.style.viewBox);return}n.attrs=n.style,n.style={};const{attrs:x,style:b}=n;x.transform&&(b.transform=x.transform,delete x.transform),(b.transform||x.transformOrigin)&&(b.transformOrigin=x.transformOrigin??"50% 50%",delete x.transformOrigin),b.transform&&(b.transformBox=(v==null?void 0:v.transformBox)??"fill-box",delete x.transformBox);for(const E of yE)x[E]!==void 0&&(b[E]=x[E],delete x[E]);a!==void 0&&(x.x=a),s!==void 0&&(x.y=s),o!==void 0&&(x.scale=o),u!==void 0&&gE(x,u,h,f,!1)}const xb=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]),bb=n=>typeof n=="string"&&n.toLowerCase()==="svg";function vE(n,a,s,o){gb(n,a,void 0,o);for(const u in a.attrs)n.setAttribute(xb.has(u)?u:Df(u),a.attrs[u])}function Sb(n,a,s){const o=Bf(n,a,s);for(const u in n)if(pt(n[u])||pt(a[u])){const h=Xa.indexOf(u)!==-1?"attr"+u.charAt(0).toUpperCase()+u.substring(1):u;o[h]=n[u]}return o}class xE extends db{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1,this.measureInstanceViewportBox=it}getBaseTargetFromProps(a,s){return a[s]}readValueFromInstance(a,s){if(Fa.has(s)){const o=tb(s);return o&&o.default||0}return s=xb.has(s)?s:Df(s),a.getAttribute(s)}scrapeMotionValuesFromProps(a,s,o){return Sb(a,s,o)}build(a,s,o){vb(a,s,this.isSVGTag,o.transformTemplate,o.style)}renderInstance(a,s,o,u){vE(a,s,o,u)}mount(a){this.isSVGTag=bb(a.tagName),super.mount(a)}}const bE=zf.length;function wb(n){if(!n)return;if(!n.isControllingVariants){const s=n.parent?wb(n.parent)||{}:{};return n.props.initial!==void 0&&(s.initial=n.props.initial),s}const a={};for(let s=0;s<bE;s++){const o=zf[s],u=n.props[o];(es(u)||u===!1)&&(a[o]=u)}return a}function jb(n,a){if(!Array.isArray(a))return!1;const s=a.length;if(s!==n.length)return!1;for(let o=0;o<s;o++)if(a[o]!==n[o])return!1;return!0}const SE=[...Of].reverse(),wE=Of.length;function jE(n){return a=>Promise.all(a.map(({animation:s,options:o})=>Sj(n,s,o)))}function EE(n){let a=jE(n),s=qy(),o=!0,u=!1;const h=g=>(v,x)=>{var E;const b=Xr(n,x,g==="exit"?(E=n.presenceContext)==null?void 0:E.custom:void 0);if(b){const{transition:j,transitionEnd:N,...C}=b;v={...v,...C,...N}}return v};function f(g){a=g(n)}function m(g){const{props:v}=n,x=wb(n.parent)||{},b=[],E=new Set;let j={},N=1/0;for(let k=0;k<wE;k++){const D=SE[k],V=s[D],R=v[D]!==void 0?v[D]:x[D],B=es(R),Y=D===g?V.isActive:null;Y===!1&&(N=k);let A=R===x[D]&&R!==v[D]&&B;if(A&&(o||u)&&n.manuallyAnimateOnMount&&(A=!1),V.protectedKeys={...j},!V.isActive&&Y===null||!R&&!V.prevProp||Tl(R)||typeof R=="boolean")continue;if(D==="exit"&&V.isActive&&Y!==!0){V.prevResolvedValues&&(j={...j,...V.prevResolvedValues});continue}const q=TE(V.prevProp,R);let U=q||D===g&&V.isActive&&!A&&B||k>N&&B,_=!1;const $=Array.isArray(R)?R:[R];let W=$.reduce(h(D),{});Y===!1&&(W={});const{prevResolvedValues:le={}}=V,Z={...le,...W},ce=Q=>{U=!0,E.has(Q)&&(_=!0,E.delete(Q)),V.needsAnimating[Q]=!0;const X=n.getValue(Q);X&&(X.liveStyle=!1)};for(const Q in Z){const X=W[Q],ae=le[Q];if(j.hasOwnProperty(Q))continue;let T=!1;Vd(X)&&Vd(ae)?T=!jb(X,ae)||q:T=X!==ae,T?X!=null?ce(Q):E.add(Q):X!==void 0&&E.has(Q)?ce(Q):V.protectedKeys[Q]=!0}V.prevProp=R,V.prevResolvedValues=W,V.isActive&&(j={...j,...W}),(o||u)&&n.blockInitialAnimation&&(U=!1);const L=A&&q;U&&(!L||_)&&b.push(...$.map(Q=>{const X={type:D};if(typeof Q=="string"&&(o||u)&&!L&&n.manuallyAnimateOnMount&&n.parent){const{parent:ae}=n,T=Xr(ae,Q);if(ae.enteringChildren&&T){const{delayChildren:O}=T.transition||{};X.delay=Fx(ae.enteringChildren,n,O)}}return{animation:Q,options:X}}))}if(E.size){const k={};if(typeof v.initial!="boolean"){const D=Xr(n,Array.isArray(v.initial)?v.initial[0]:v.initial);D&&D.transition&&(k.transition=D.transition)}E.forEach(D=>{const V=n.getBaseTarget(D),R=n.getValue(D);R&&(R.liveStyle=!0),k[D]=V??null}),b.push({animation:k})}let C=!!b.length;return o&&(v.initial===!1||v.initial===v.animate)&&!n.manuallyAnimateOnMount&&(C=!1),o=!1,u=!1,C?a(b):Promise.resolve()}function p(g,v){var b;if(s[g].isActive===v)return Promise.resolve();(b=n.variantChildren)==null||b.forEach(E=>{var j;return(j=E.animationState)==null?void 0:j.setActive(g,v)}),s[g].isActive=v;const x=m(g);for(const E in s)s[E].protectedKeys={};return x}return{animateChanges:m,setActive:p,setAnimateFunction:f,getState:()=>s,reset:()=>{s=qy(),u=!0}}}function TE(n,a){return typeof a=="string"?a!==n:Array.isArray(a)?!jb(a,n):!1}function Hr(n=!1){return{isActive:n,protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}function qy(){return{animate:Hr(!0),whileInView:Hr(),whileHover:Hr(),whileTap:Hr(),whileDrag:Hr(),whileFocus:Hr(),exit:Hr()}}function Xd(n,a){n.min=a.min,n.max=a.max}function sn(n,a){Xd(n.x,a.x),Xd(n.y,a.y)}function Yy(n,a){n.translate=a.translate,n.scale=a.scale,n.originPoint=a.originPoint,n.origin=a.origin}const Eb=1e-4,CE=1-Eb,NE=1+Eb,Tb=.01,DE=0-Tb,AE=0+Tb;function bt(n){return n.max-n.min}function ME(n,a,s){return Math.abs(n-a)<=s}function Py(n,a,s,o=.5){n.origin=o,n.originPoint=He(a.min,a.max,n.origin),n.scale=bt(s)/bt(a),n.translate=He(s.min,s.max,n.origin)-n.originPoint,(n.scale>=CE&&n.scale<=NE||isNaN(n.scale))&&(n.scale=1),(n.translate>=DE&&n.translate<=AE||isNaN(n.translate))&&(n.translate=0)}function Zi(n,a,s,o){Py(n.x,a.x,s.x,o?o.originX:void 0),Py(n.y,a.y,s.y,o?o.originY:void 0)}function Gy(n,a,s,o=0){const u=o?He(s.min,s.max,o):s.min;n.min=u+a.min,n.max=n.min+bt(a)}function kE(n,a,s,o){Gy(n.x,a.x,s.x,o==null?void 0:o.x),Gy(n.y,a.y,s.y,o==null?void 0:o.y)}function Xy(n,a,s,o=0){const u=o?He(s.min,s.max,o):s.min;n.min=a.min-u,n.max=n.min+bt(a)}function cl(n,a,s,o){Xy(n.x,a.x,s.x,o==null?void 0:o.x),Xy(n.y,a.y,s.y,o==null?void 0:o.y)}function Fy(n,a,s,o,u){return n-=a,n=ll(n,1/s,o),u!==void 0&&(n=ll(n,1/u,o)),n}function RE(n,a=0,s=1,o=.5,u,h=n,f=n){if(vn.test(a)&&(a=parseFloat(a),a=He(f.min,f.max,a/100)-f.min),typeof a!="number")return;let m=He(h.min,h.max,o);n===h&&(m-=a),n.min=Fy(n.min,a,s,m,u),n.max=Fy(n.max,a,s,m,u)}function $y(n,a,[s,o,u],h,f){RE(n,a[s],a[o],a[u],a.scale,h,f)}const OE=["x","scaleX","originX"],zE=["y","scaleY","originY"];function Ky(n,a,s,o){$y(n.x,a,OE,s?s.x:void 0,o?o.x:void 0),$y(n.y,a,zE,s?s.y:void 0,o?o.y:void 0)}function Zy(n){return n.translate===0&&n.scale===1}function Cb(n){return Zy(n.x)&&Zy(n.y)}function Qy(n,a){return n.min===a.min&&n.max===a.max}function _E(n,a){return Qy(n.x,a.x)&&Qy(n.y,a.y)}function Jy(n,a){return Math.round(n.min)===Math.round(a.min)&&Math.round(n.max)===Math.round(a.max)}function Nb(n,a){return Jy(n.x,a.x)&&Jy(n.y,a.y)}function Wy(n){return bt(n.x)/bt(n.y)}function Iy(n,a){return n.translate===a.translate&&n.scale===a.scale&&n.originPoint===a.originPoint}function pn(n){return[n("x"),n("y")]}function VE(n,a,s){let o="";const u=n.x.translate/a.x,h=n.y.translate/a.y,f=(s==null?void 0:s.z)||0;if((u||h||f)&&(o=`translate3d(${u}px, ${h}px, ${f}px) `),(a.x!==1||a.y!==1)&&(o+=`scale(${1/a.x}, ${1/a.y}) `),s){const{transformPerspective:g,rotate:v,pathRotation:x,rotateX:b,rotateY:E,skewX:j,skewY:N}=s;g&&(o=`perspective(${g}px) ${o}`),v&&(o+=`rotate(${v}deg) `),x&&(o+=`rotate(${x}deg) `),b&&(o+=`rotateX(${b}deg) `),E&&(o+=`rotateY(${E}deg) `),j&&(o+=`skewX(${j}deg) `),N&&(o+=`skewY(${N}deg) `)}const m=n.x.scale*a.x,p=n.y.scale*a.y;return(m!==1||p!==1)&&(o+=`scale(${m}, ${p})`),o||"none"}const BE=Af.length,ev=n=>typeof n=="string"?parseFloat(n):n,tv=n=>typeof n=="number"||he.test(n);function LE(n,a,s,o,u,h){u?(n.opacity=He(0,s.opacity??1,UE(o)),n.opacityExit=He(a.opacity??1,0,HE(o))):h&&(n.opacity=He(a.opacity??1,s.opacity??1,o));for(let f=0;f<BE;f++){const m=Af[f];let p=nv(a,m),g=nv(s,m);if(p===void 0&&g===void 0)continue;p||(p=0),g||(g=0),p===0||g===0||tv(p)===tv(g)?(n[m]=Math.max(He(ev(p),ev(g),o),0),(vn.test(g)||vn.test(p))&&(n[m]+="%")):n[m]=g}(a.rotate||s.rotate)&&(n.rotate=He(a.rotate||0,s.rotate||0,o))}function nv(n,a){return n[a]!==void 0?n[a]:n.borderRadius}const UE=Db(0,.5,bx),HE=Db(.5,.95,en);function Db(n,a,s){return o=>o<n?0:o>a?1:s(Wi(n,a,o))}function qE(n,a,s){const o=pt(n)?n:Ya(n);return o.start(Cf("",o,a,s)),o.animation}function ts(n,a,s,o={passive:!0}){return n.addEventListener(a,s,o),()=>n.removeEventListener(a,s,o)}const YE=(n,a)=>n.depth-a.depth;class PE{constructor(){this.children=[],this.isDirty=!1}add(a){mf(this.children,a),this.isDirty=!0}remove(a){el(this.children,a),this.isDirty=!0}forEach(a){this.isDirty&&this.children.sort(YE),this.isDirty=!1,this.children.forEach(a)}}function GE(n,a){const s=xt.now(),o=({timestamp:u})=>{const h=u-s;h>=a&&(xr(o),n(h-a))};return qe.setup(o,!0),()=>xr(o)}function Zo(n){return pt(n)?n.get():n}class XE{constructor(){this.members=[]}add(a){mf(this.members,a);for(let s=this.members.length-1;s>=0;s--){const o=this.members[s];if(o===a||o===this.lead||o===this.prevLead)continue;const u=o.instance;(!u||u.isConnected===!1)&&!o.snapshot&&(el(this.members,o),o.unmount())}a.scheduleRender()}remove(a){if(el(this.members,a),a===this.prevLead&&(this.prevLead=void 0),a===this.lead){const s=this.members[this.members.length-1];s&&this.promote(s)}}relegate(a){var s;for(let o=this.members.indexOf(a)-1;o>=0;o--){const u=this.members[o];if(u.isPresent!==!1&&((s=u.instance)==null?void 0:s.isConnected)!==!1)return this.promote(u),!0}return!1}promote(a,s){var u;const o=this.lead;if(a!==o&&(this.prevLead=o,this.lead=a,a.show(),o)){o.updateSnapshot(),a.scheduleRender();const{layoutDependency:h}=o.options,{layoutDependency:f}=a.options;(h===void 0||h!==f)&&(a.resumeFrom=o,s&&(o.preserveOpacity=!0),o.snapshot&&(a.snapshot=o.snapshot,a.snapshot.latestValues=o.animationValues||o.latestValues),(u=a.root)!=null&&u.isUpdating&&(a.isLayoutDirty=!0)),a.options.crossfade===!1&&o.hide()}}exitAnimationComplete(){this.members.forEach(a=>{var s,o,u,h,f;(o=(s=a.options).onExitComplete)==null||o.call(s),(f=(u=a.resumingFrom)==null?void 0:(h=u.options).onExitComplete)==null||f.call(h)})}scheduleRender(){this.members.forEach(a=>a.instance&&a.scheduleRender(!1))}removeLeadSnapshot(){var a;(a=this.lead)!=null&&a.snapshot&&(this.lead.snapshot=void 0)}}const Qo={hasAnimatedSinceResize:!0,hasEverUpdated:!1},id=["","X","Y","Z"],FE=1e3;let $E=0;function sd(n,a,s,o){const{latestValues:u}=a;u[n]&&(s[n]=u[n],a.setStaticValue(n,0),o&&(o[n]=0))}function Ab(n){if(n.hasCheckedOptimisedAppear=!0,n.root===n)return;const{visualElement:a}=n.options;if(!a)return;const s=Jx(a);if(window.MotionHasOptimisedAnimation(s,"transform")){const{layout:u,layoutId:h}=n.options;window.MotionCancelOptimisedAnimation(s,"transform",qe,!(u||h))}const{parent:o}=n;o&&!o.hasCheckedOptimisedAppear&&Ab(o)}function Mb({attachResizeListener:n,defaultParent:a,measureScroll:s,checkIsScrollRoot:o,resetTransform:u}){return class{constructor(f={},m=a==null?void 0:a()){this.id=$E++,this.animationId=0,this.animationCommitId=0,this.children=new Set,this.options={},this.isTreeAnimating=!1,this.isAnimationBlocked=!1,this.isLayoutDirty=!1,this.isProjectionDirty=!1,this.isSharedProjectionDirty=!1,this.isTransformDirty=!1,this.updateManuallyBlocked=!1,this.updateBlockedByResize=!1,this.isUpdating=!1,this.isSVG=!1,this.needsReset=!1,this.shouldResetTransform=!1,this.hasCheckedOptimisedAppear=!1,this.treeScale={x:1,y:1},this.eventHandlers=new Map,this.hasTreeAnimated=!1,this.layoutVersion=0,this.updateScheduled=!1,this.scheduleUpdate=()=>this.update(),this.projectionUpdateScheduled=!1,this.checkUpdateFailed=()=>{this.isUpdating&&(this.isUpdating=!1,this.clearAllSnapshots())},this.updateProjection=()=>{this.projectionUpdateScheduled=!1,this.nodes.forEach(QE),this.nodes.forEach(nT),this.nodes.forEach(rT),this.nodes.forEach(JE)},this.resolvedRelativeTargetAt=0,this.linkedParentVersion=0,this.hasProjected=!1,this.isVisible=!0,this.animationProgress=0,this.sharedNodes=new Map,this.latestValues=f,this.root=m?m.root||m:this,this.path=m?[...m.path,m]:[],this.parent=m,this.depth=m?m.depth+1:0;for(let p=0;p<this.path.length;p++)this.path[p].shouldResetTransform=!0;this.root===this&&(this.nodes=new PE)}addEventListener(f,m){return this.eventHandlers.has(f)||this.eventHandlers.set(f,new pf),this.eventHandlers.get(f).add(m)}notifyListeners(f,...m){const p=this.eventHandlers.get(f);p&&p.notify(...m)}hasListeners(f){return this.eventHandlers.has(f)}mount(f){if(this.instance)return;this.isSVG=Rf(f)&&!Qj(f),this.instance=f;const{layoutId:m,layout:p,visualElement:g}=this.options;if(g&&!g.current&&g.mount(f),this.root.nodes.add(this),this.parent&&this.parent.children.add(this),this.root.hasTreeAnimated&&(p||m)&&(this.isLayoutDirty=!0),n){let v,x=0;const b=()=>this.root.updateBlockedByResize=!1;qe.read(()=>{x=window.innerWidth}),n(f,()=>{const E=window.innerWidth;E!==x&&(x=E,this.root.updateBlockedByResize=!0,v&&v(),v=GE(b,250),Qo.hasAnimatedSinceResize&&(Qo.hasAnimatedSinceResize=!1,this.nodes.forEach(iv)))})}m&&this.root.registerSharedNode(m,this),this.options.animate!==!1&&g&&(m||p)&&this.addEventListener("didUpdate",({delta:v,hasLayoutChanged:x,hasRelativeLayoutChanged:b,layout:E})=>{if(this.isTreeAnimationBlocked()){this.target=void 0,this.relativeTarget=void 0;return}const j=this.options.transition||g.getDefaultTransition()||lT,{onLayoutAnimationStart:N,onLayoutAnimationComplete:C}=g.getProps(),k=!this.targetLayout||!Nb(this.targetLayout,E),D=!x&&b;if(this.options.layoutRoot||this.resumeFrom||D||x&&(k||!this.currentAnimation)){this.resumeFrom&&(this.resumingFrom=this.resumeFrom,this.resumingFrom.resumingFrom=void 0);const V={...Tf(j,"layout"),onPlay:N,onComplete:C};(g.shouldReduceMotion||this.options.layoutRoot)&&(V.delay=0,V.type=!1),this.startAnimation(V),this.setAnimationOrigin(v,D,V.path)}else x||iv(this),this.isLead()&&this.options.onExitComplete&&this.options.onExitComplete();this.targetLayout=E})}unmount(){this.options.layoutId&&this.willUpdate(),this.root.nodes.remove(this);const f=this.getStack();f&&f.remove(this),this.parent&&this.parent.children.delete(this),this.instance=void 0,this.eventHandlers.clear(),xr(this.updateProjection)}blockUpdate(){this.updateManuallyBlocked=!0}unblockUpdate(){this.updateManuallyBlocked=!1}isUpdateBlocked(){return this.updateManuallyBlocked||this.updateBlockedByResize}isTreeAnimationBlocked(){return this.isAnimationBlocked||this.parent&&this.parent.isTreeAnimationBlocked()||!1}startUpdate(){this.isUpdateBlocked()||(this.isUpdating=!0,this.nodes&&this.nodes.forEach(aT),this.animationId++)}getTransformTemplate(){const{visualElement:f}=this.options;return f&&f.getProps().transformTemplate}willUpdate(f=!0){if(this.root.hasTreeAnimated=!0,this.root.isUpdateBlocked()){this.options.onExitComplete&&this.options.onExitComplete();return}if(window.MotionCancelOptimisedAnimation&&!this.hasCheckedOptimisedAppear&&Ab(this),!this.root.isUpdating&&this.root.startUpdate(),this.isLayoutDirty)return;this.isLayoutDirty=!0;for(let v=0;v<this.path.length;v++){const x=this.path[v];x.shouldResetTransform=!0,(typeof x.latestValues.x=="string"||typeof x.latestValues.y=="string")&&(x.isLayoutDirty=!0),x.updateScroll("snapshot"),x.options.layoutRoot&&x.willUpdate(!1)}const{layoutId:m,layout:p}=this.options;if(m===void 0&&!p)return;const g=this.getTransformTemplate();this.prevTransformTemplateValue=g?g(this.latestValues,""):void 0,this.updateSnapshot(),f&&this.notifyListeners("willUpdate")}update(){if(this.updateScheduled=!1,this.isUpdateBlocked()){const p=this.updateBlockedByResize;this.unblockUpdate(),this.updateBlockedByResize=!1,this.clearAllSnapshots(),p&&this.nodes.forEach(IE),this.nodes.forEach(rv);return}if(this.animationId<=this.animationCommitId){this.nodes.forEach(av);return}this.animationCommitId=this.animationId,this.isUpdating?(this.isUpdating=!1,this.nodes.forEach(eT),this.nodes.forEach(tT),this.nodes.forEach(KE),this.nodes.forEach(ZE)):this.nodes.forEach(av),this.clearAllSnapshots();const m=xt.now();mt.delta=bn(0,1e3/60,m-mt.timestamp),mt.timestamp=m,mt.isProcessing=!0,Ju.update.process(mt),Ju.preRender.process(mt),Ju.render.process(mt),mt.isProcessing=!1}didUpdate(){this.updateScheduled||(this.updateScheduled=!0,Mf.read(this.scheduleUpdate))}clearAllSnapshots(){this.nodes.forEach(WE),this.sharedNodes.forEach(iT)}scheduleUpdateProjection(){this.projectionUpdateScheduled||(this.projectionUpdateScheduled=!0,qe.preRender(this.updateProjection,!1,!0))}scheduleCheckAfterUnmount(){qe.postRender(()=>{this.isLayoutDirty?this.root.didUpdate():this.root.checkUpdateFailed()})}updateSnapshot(){this.snapshot||!this.instance||(this.snapshot=this.measure(),this.snapshot&&!bt(this.snapshot.measuredBox.x)&&!bt(this.snapshot.measuredBox.y)&&(this.snapshot=void 0))}updateLayout(){if(!this.instance||(this.updateScroll(),!(this.options.alwaysMeasureLayout&&this.isLead())&&!this.isLayoutDirty))return;if(this.resumeFrom&&!this.resumeFrom.instance)for(let p=0;p<this.path.length;p++)this.path[p].updateScroll();const f=this.layout;this.layout=this.measure(!1),this.layoutVersion++,this.layoutCorrected||(this.layoutCorrected=it()),this.isLayoutDirty=!1,this.projectionDelta=void 0,this.notifyListeners("measure",this.layout.layoutBox);const{visualElement:m}=this.options;m&&m.notify("LayoutMeasure",this.layout.layoutBox,f?f.layoutBox:void 0)}updateScroll(f="measure"){let m=!!(this.options.layoutScroll&&this.instance);if(this.scroll&&this.scroll.animationId===this.root.animationId&&this.scroll.phase===f&&(m=!1),m&&this.instance){const p=o(this.instance);this.scroll={animationId:this.root.animationId,phase:f,isRoot:p,offset:s(this.instance),wasRoot:this.scroll?this.scroll.isRoot:p}}}resetTransform(){if(!u)return;const f=this.isLayoutDirty||this.shouldResetTransform||this.options.alwaysMeasureLayout,m=this.projectionDelta&&!Cb(this.projectionDelta),p=this.getTransformTemplate(),g=p?p(this.latestValues,""):void 0,v=g!==this.prevTransformTemplateValue;f&&this.instance&&(m||qr(this.latestValues)||v)&&(u(this.instance,g),this.shouldResetTransform=!1,this.scheduleRender())}measure(f=!0){const m=this.measurePageBox();let p=this.removeElementScroll(m);return f&&(p=this.removeTransform(p)),cT(p),{animationId:this.root.animationId,measuredBox:m,layoutBox:p,latestValues:{},source:this.id}}measurePageBox(){var g;const{visualElement:f}=this.options;if(!f)return it();const m=f.measureViewportBox();if(!(((g=this.scroll)==null?void 0:g.wasRoot)||this.path.some(uT))){const{scroll:v}=this.root;v&&(gn(m.x,v.offset.x),gn(m.y,v.offset.y))}return m}removeElementScroll(f){var p;const m=it();if(sn(m,f),(p=this.scroll)!=null&&p.wasRoot)return m;for(let g=0;g<this.path.length;g++){const v=this.path[g],{scroll:x,options:b}=v;v!==this.root&&x&&b.layoutScroll&&(x.wasRoot&&sn(m,f),gn(m.x,x.offset.x),gn(m.y,x.offset.y))}return m}applyTransform(f,m=!1,p){var v,x;const g=p||it();sn(g,f);for(let b=0;b<this.path.length;b++){const E=this.path[b];!m&&E.options.layoutScroll&&E.scroll&&E!==E.root&&(gn(g.x,-E.scroll.offset.x),gn(g.y,-E.scroll.offset.y)),qr(E.latestValues)&&Ko(g,E.latestValues,(v=E.layout)==null?void 0:v.layoutBox)}return qr(this.latestValues)&&Ko(g,this.latestValues,(x=this.layout)==null?void 0:x.layoutBox),g}removeTransform(f){var p;const m=it();sn(m,f);for(let g=0;g<this.path.length;g++){const v=this.path[g];if(!qr(v.latestValues))continue;let x;v.instance&&(Yd(v.latestValues)&&v.updateSnapshot(),x=it(),sn(x,v.measurePageBox())),Ky(m,v.latestValues,(p=v.snapshot)==null?void 0:p.layoutBox,x)}return qr(this.latestValues)&&Ky(m,this.latestValues),m}setTargetDelta(f){this.targetDelta=f,this.root.scheduleUpdateProjection(),this.isProjectionDirty=!0}setOptions(f){this.options={...this.options,...f,crossfade:f.crossfade!==void 0?f.crossfade:!0}}clearMeasurements(){this.scroll=void 0,this.layout=void 0,this.snapshot=void 0,this.prevTransformTemplateValue=void 0,this.targetDelta=void 0,this.target=void 0,this.isLayoutDirty=!1}forceRelativeParentToResolveTarget(){this.relativeParent&&this.relativeParent.resolvedRelativeTargetAt!==mt.timestamp&&this.relativeParent.resolveTargetDelta(!0)}resolveTargetDelta(f=!1){var E;const m=this.getLead();this.isProjectionDirty||(this.isProjectionDirty=m.isProjectionDirty),this.isTransformDirty||(this.isTransformDirty=m.isTransformDirty),this.isSharedProjectionDirty||(this.isSharedProjectionDirty=m.isSharedProjectionDirty);const p=!!this.resumingFrom||this!==m;if(!(f||p&&this.isSharedProjectionDirty||this.isProjectionDirty||(E=this.parent)!=null&&E.isProjectionDirty||this.attemptToResolveRelativeTarget||this.root.updateBlockedByResize))return;const{layout:v,layoutId:x}=this.options;if(!this.layout||!(v||x))return;this.resolvedRelativeTargetAt=mt.timestamp;const b=this.getClosestProjectingParent();b&&this.linkedParentVersion!==b.layoutVersion&&!b.options.layoutRoot&&this.removeRelativeTarget(),!this.targetDelta&&!this.relativeTarget&&(this.options.layoutAnchor!==!1&&b&&b.layout?this.createRelativeTarget(b,this.layout.layoutBox,b.layout.layoutBox):this.removeRelativeTarget()),!(!this.relativeTarget&&!this.targetDelta)&&(this.target||(this.target=it(),this.targetWithTransforms=it()),this.relativeTarget&&this.relativeTargetOrigin&&this.relativeParent&&this.relativeParent.target?(this.forceRelativeParentToResolveTarget(),kE(this.target,this.relativeTarget,this.relativeParent.target,this.options.layoutAnchor||void 0)):this.targetDelta?(this.resumingFrom?this.applyTransform(this.layout.layoutBox,!1,this.target):sn(this.target,this.layout.layoutBox),mb(this.target,this.targetDelta)):sn(this.target,this.layout.layoutBox),this.attemptToResolveRelativeTarget&&(this.attemptToResolveRelativeTarget=!1,this.options.layoutAnchor!==!1&&b&&!!b.resumingFrom==!!this.resumingFrom&&!b.options.layoutScroll&&b.target&&this.animationProgress!==1?this.createRelativeTarget(b,this.target,b.target):this.relativeParent=this.relativeTarget=void 0))}getClosestProjectingParent(){if(!(!this.parent||Yd(this.parent.latestValues)||hb(this.parent.latestValues)))return this.parent.isProjecting()?this.parent:this.parent.getClosestProjectingParent()}isProjecting(){return!!((this.relativeTarget||this.targetDelta||this.options.layoutRoot)&&this.layout)}createRelativeTarget(f,m,p){this.relativeParent=f,this.linkedParentVersion=f.layoutVersion,this.forceRelativeParentToResolveTarget(),this.relativeTarget=it(),this.relativeTargetOrigin=it(),cl(this.relativeTargetOrigin,m,p,this.options.layoutAnchor||void 0),sn(this.relativeTarget,this.relativeTargetOrigin)}removeRelativeTarget(){this.relativeParent=this.relativeTarget=void 0}calcProjection(){var j;const f=this.getLead(),m=!!this.resumingFrom||this!==f;let p=!0;if((this.isProjectionDirty||(j=this.parent)!=null&&j.isProjectionDirty)&&(p=!1),m&&(this.isSharedProjectionDirty||this.isTransformDirty)&&(p=!1),this.resolvedRelativeTargetAt===mt.timestamp&&(p=!1),p)return;const{layout:g,layoutId:v}=this.options;if(this.isTreeAnimating=!!(this.parent&&this.parent.isTreeAnimating||this.currentAnimation||this.pendingAnimation),this.isTreeAnimating||(this.targetDelta=this.relativeTarget=void 0),!this.layout||!(g||v))return;sn(this.layoutCorrected,this.layout.layoutBox);const x=this.treeScale.x,b=this.treeScale.y;sE(this.layoutCorrected,this.treeScale,this.path,m),f.layout&&!f.target&&(this.treeScale.x!==1||this.treeScale.y!==1)&&(f.target=f.layout.layoutBox,f.targetWithTransforms=it());const{target:E}=f;if(!E){this.prevProjectionDelta&&(this.createProjectionDeltas(),this.scheduleRender());return}!this.projectionDelta||!this.prevProjectionDelta?this.createProjectionDeltas():(Yy(this.prevProjectionDelta.x,this.projectionDelta.x),Yy(this.prevProjectionDelta.y,this.projectionDelta.y)),Zi(this.projectionDelta,this.layoutCorrected,E,this.latestValues),(this.treeScale.x!==x||this.treeScale.y!==b||!Iy(this.projectionDelta.x,this.prevProjectionDelta.x)||!Iy(this.projectionDelta.y,this.prevProjectionDelta.y))&&(this.hasProjected=!0,this.scheduleRender(),this.notifyListeners("projectionUpdate",E))}hide(){this.isVisible=!1}show(){this.isVisible=!0}scheduleRender(f=!0){var m;if((m=this.options.visualElement)==null||m.scheduleRender(),f){const p=this.getStack();p&&p.scheduleRender()}this.resumingFrom&&!this.resumingFrom.instance&&(this.resumingFrom=void 0)}createProjectionDeltas(){this.prevProjectionDelta=Ua(),this.projectionDelta=Ua(),this.projectionDeltaWithTransform=Ua()}setAnimationOrigin(f,m=!1,p){const g=this.snapshot,v=g?g.latestValues:{},x={...this.latestValues},b=Ua();(!this.relativeParent||!this.relativeParent.options.layoutRoot)&&(this.relativeTarget=this.relativeTargetOrigin=void 0),this.attemptToResolveRelativeTarget=!m;const E=it(),j=g?g.source:void 0,N=this.layout?this.layout.source:void 0,C=j!==N,k=this.getStack(),D=!k||k.members.length<=1,V=!!(C&&!D&&this.options.crossfade===!0&&!this.path.some(oT));this.animationProgress=0;let R;const B=p==null?void 0:p.interpolateProjection(f);this.mixTargetDelta=Y=>{const A=Y/1e3,q=B==null?void 0:B(A);q?(b.x.translate=q.x,b.x.scale=He(f.x.scale,1,A),b.x.origin=f.x.origin,b.x.originPoint=f.x.originPoint,b.y.translate=q.y,b.y.scale=He(f.y.scale,1,A),b.y.origin=f.y.origin,b.y.originPoint=f.y.originPoint):(sv(b.x,f.x,A),sv(b.y,f.y,A)),this.setTargetDelta(b),this.relativeTarget&&this.relativeTargetOrigin&&this.layout&&this.relativeParent&&this.relativeParent.layout&&(cl(E,this.layout.layoutBox,this.relativeParent.layout.layoutBox,this.options.layoutAnchor||void 0),sT(this.relativeTarget,this.relativeTargetOrigin,E,A),R&&_E(this.relativeTarget,R)&&(this.isProjectionDirty=!1),R||(R=it()),sn(R,this.relativeTarget)),C&&(this.animationValues=x,LE(x,v,this.latestValues,A,V,D)),q&&q.rotate!==void 0&&(this.animationValues||(this.animationValues=x),this.animationValues.pathRotation=q.rotate),this.root.scheduleUpdateProjection(),this.scheduleRender(),this.animationProgress=A},this.mixTargetDelta(this.options.layoutRoot?1e3:0)}startAnimation(f){var m,p,g;this.notifyListeners("animationStart"),(m=this.currentAnimation)==null||m.stop(),(g=(p=this.resumingFrom)==null?void 0:p.currentAnimation)==null||g.stop(),this.pendingAnimation&&(xr(this.pendingAnimation),this.pendingAnimation=void 0),this.pendingAnimation=qe.update(()=>{Qo.hasAnimatedSinceResize=!0,this.motionValue||(this.motionValue=Ya(0)),this.motionValue.jump(0,!1),this.currentAnimation=qE(this.motionValue,[0,1e3],{...f,velocity:0,isSync:!0,onUpdate:v=>{this.mixTargetDelta(v),f.onUpdate&&f.onUpdate(v)},onComplete:()=>{f.onComplete&&f.onComplete(),this.completeAnimation()}}),this.resumingFrom&&(this.resumingFrom.currentAnimation=this.currentAnimation),this.pendingAnimation=void 0})}completeAnimation(){this.resumingFrom&&(this.resumingFrom.currentAnimation=void 0,this.resumingFrom.preserveOpacity=void 0);const f=this.getStack();f&&f.exitAnimationComplete(),this.resumingFrom=this.currentAnimation=this.animationValues=void 0,this.notifyListeners("animationComplete")}finishAnimation(){this.currentAnimation&&(this.mixTargetDelta&&this.mixTargetDelta(FE),this.currentAnimation.stop()),this.completeAnimation()}applyTransformsToTarget(){const f=this.getLead();let{targetWithTransforms:m,target:p,layout:g,latestValues:v}=f;if(!(!m||!p||!g)){if(this!==f&&this.layout&&g&&kb(this.options.animationType,this.layout.layoutBox,g.layoutBox)){p=this.target||it();const x=bt(this.layout.layoutBox.x);p.x.min=f.target.x.min,p.x.max=p.x.min+x;const b=bt(this.layout.layoutBox.y);p.y.min=f.target.y.min,p.y.max=p.y.min+b}sn(m,p),Ko(m,v),Zi(this.projectionDeltaWithTransform,this.layoutCorrected,m,v)}}registerSharedNode(f,m){this.sharedNodes.has(f)||this.sharedNodes.set(f,new XE),this.sharedNodes.get(f).add(m);const g=m.options.initialPromotionConfig;m.promote({transition:g?g.transition:void 0,preserveFollowOpacity:g&&g.shouldPreserveFollowOpacity?g.shouldPreserveFollowOpacity(m):void 0})}isLead(){const f=this.getStack();return f?f.lead===this:!0}getLead(){var m;const{layoutId:f}=this.options;return f?((m=this.getStack())==null?void 0:m.lead)||this:this}getPrevLead(){var m;const{layoutId:f}=this.options;return f?(m=this.getStack())==null?void 0:m.prevLead:void 0}getStack(){const{layoutId:f}=this.options;if(f)return this.root.sharedNodes.get(f)}promote({needsReset:f,transition:m,preserveFollowOpacity:p}={}){const g=this.getStack();g&&g.promote(this,p),f&&(this.projectionDelta=void 0,this.needsReset=!0),m&&this.setOptions({transition:m})}relegate(){const f=this.getStack();return f?f.relegate(this):!1}resetSkewAndRotation(){const{visualElement:f}=this.options;if(!f)return;let m=!1;const{latestValues:p}=f;if((p.z||p.rotate||p.rotateX||p.rotateY||p.rotateZ||p.skewX||p.skewY)&&(m=!0),!m)return;const g={};p.z&&sd("z",f,g,this.animationValues);for(let v=0;v<id.length;v++)sd(`rotate${id[v]}`,f,g,this.animationValues),sd(`skew${id[v]}`,f,g,this.animationValues);f.render();for(const v in g)f.setStaticValue(v,g[v]),this.animationValues&&(this.animationValues[v]=g[v]);f.scheduleRender()}applyProjectionStyles(f,m){if(!this.instance||this.isSVG)return;if(!this.isVisible){f.visibility="hidden";return}const p=this.getTransformTemplate();if(this.needsReset){this.needsReset=!1,f.visibility="",f.opacity="",f.pointerEvents=Zo(m==null?void 0:m.pointerEvents)||"",f.transform=p?p(this.latestValues,""):"none";return}const g=this.getLead();if(!this.projectionDelta||!this.layout||!g.target){this.options.layoutId&&(f.opacity=this.latestValues.opacity!==void 0?this.latestValues.opacity:1,f.pointerEvents=Zo(m==null?void 0:m.pointerEvents)||""),this.hasProjected&&!qr(this.latestValues)&&(f.transform=p?p({},""):"none",this.hasProjected=!1);return}f.visibility="";const v=g.animationValues||g.latestValues;this.applyTransformsToTarget();let x=VE(this.projectionDeltaWithTransform,this.treeScale,v);p&&(x=p(v,x)),f.transform=x;const{x:b,y:E}=this.projectionDelta;f.transformOrigin=`${b.origin*100}% ${E.origin*100}% 0`,g.animationValues?f.opacity=g===this?v.opacity??this.latestValues.opacity??1:this.preserveOpacity?this.latestValues.opacity:v.opacityExit:f.opacity=g===this?v.opacity!==void 0?v.opacity:"":v.opacityExit!==void 0?v.opacityExit:0;for(const j in Gd){if(v[j]===void 0)continue;const{correct:N,applyTo:C,isCSSVariable:k}=Gd[j],D=x==="none"?v[j]:N(v[j],g);if(C){const V=C.length;for(let R=0;R<V;R++)f[C[R]]=D}else k?this.options.visualElement.renderState.vars[j]=D:f[j]=D}this.options.layoutId&&(f.pointerEvents=g===this?Zo(m==null?void 0:m.pointerEvents)||"":"none")}clearSnapshot(){this.resumeFrom=this.snapshot=void 0}resetTree(){this.root.nodes.forEach(f=>{var m;return(m=f.currentAnimation)==null?void 0:m.stop()}),this.root.nodes.forEach(rv),this.root.sharedNodes.clear()}}}function KE(n){n.updateLayout()}function ZE(n){var s;const a=((s=n.resumeFrom)==null?void 0:s.snapshot)||n.snapshot;if(n.isLead()&&n.layout&&a&&n.hasListeners("didUpdate")){const{layoutBox:o,measuredBox:u}=n.layout,{animationType:h}=n.options,f=a.source!==n.layout.source;if(h==="size")pn(x=>{const b=f?a.measuredBox[x]:a.layoutBox[x],E=bt(b);b.min=o[x].min,b.max=b.min+E});else if(h==="x"||h==="y"){const x=h==="x"?"y":"x";Xd(f?a.measuredBox[x]:a.layoutBox[x],o[x])}else kb(h,a.layoutBox,o)&&pn(x=>{const b=f?a.measuredBox[x]:a.layoutBox[x],E=bt(o[x]);b.max=b.min+E,n.relativeTarget&&!n.currentAnimation&&(n.isProjectionDirty=!0,n.relativeTarget[x].max=n.relativeTarget[x].min+E)});const m=Ua();Zi(m,o,a.layoutBox);const p=Ua();f?Zi(p,n.applyTransform(u,!0),a.measuredBox):Zi(p,o,a.layoutBox);const g=!Cb(m);let v=!1;if(!n.resumeFrom){const x=n.getClosestProjectingParent();if(x&&!x.resumeFrom){const{snapshot:b,layout:E}=x;if(b&&E){const j=n.options.layoutAnchor||void 0,N=it();cl(N,a.layoutBox,b.layoutBox,j);const C=it();cl(C,o,E.layoutBox,j),Nb(N,C)||(v=!0),x.options.layoutRoot&&(n.relativeTarget=C,n.relativeTargetOrigin=N,n.relativeParent=x)}}}n.notifyListeners("didUpdate",{layout:o,snapshot:a,delta:p,layoutDelta:m,hasLayoutChanged:g,hasRelativeLayoutChanged:v})}else if(n.isLead()){const{onExitComplete:o}=n.options;o&&o()}n.options.transition=void 0}function QE(n){n.parent&&(n.isProjecting()||(n.isProjectionDirty=n.parent.isProjectionDirty),n.isSharedProjectionDirty||(n.isSharedProjectionDirty=!!(n.isProjectionDirty||n.parent.isProjectionDirty||n.parent.isSharedProjectionDirty)),n.isTransformDirty||(n.isTransformDirty=n.parent.isTransformDirty))}function JE(n){n.isProjectionDirty=n.isSharedProjectionDirty=n.isTransformDirty=!1}function WE(n){n.clearSnapshot()}function rv(n){n.clearMeasurements()}function IE(n){n.isLayoutDirty=!0,n.updateLayout()}function av(n){n.isLayoutDirty=!1}function eT(n){n.isAnimationBlocked&&n.layout&&!n.isLayoutDirty&&(n.snapshot=n.layout,n.isLayoutDirty=!0)}function tT(n){const{visualElement:a}=n.options;a&&a.getProps().onBeforeLayoutMeasure&&a.notify("BeforeLayoutMeasure"),n.resetTransform()}function iv(n){n.finishAnimation(),n.targetDelta=n.relativeTarget=n.target=void 0,n.isProjectionDirty=!0}function nT(n){n.resolveTargetDelta()}function rT(n){n.calcProjection()}function aT(n){n.resetSkewAndRotation()}function iT(n){n.removeLeadSnapshot()}function sv(n,a,s){n.translate=He(a.translate,0,s),n.scale=He(a.scale,1,s),n.origin=a.origin,n.originPoint=a.originPoint}function ov(n,a,s,o){n.min=He(a.min,s.min,o),n.max=He(a.max,s.max,o)}function sT(n,a,s,o){ov(n.x,a.x,s.x,o),ov(n.y,a.y,s.y,o)}function oT(n){return n.animationValues&&n.animationValues.opacityExit!==void 0}const lT={duration:.45,ease:[.4,0,.1,1]},lv=n=>typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().includes(n),cv=lv("applewebkit/")&&!lv("chrome/")?Math.round:en;function uv(n){n.min=cv(n.min),n.max=cv(n.max)}function cT(n){uv(n.x),uv(n.y)}function kb(n,a,s){return n==="position"||n==="preserve-aspect"&&!ME(Wy(a),Wy(s),.2)}function uT(n){var a;return n!==n.root&&((a=n.scroll)==null?void 0:a.wasRoot)}const dT=Mb({attachResizeListener:(n,a)=>ts(n,"resize",a),measureScroll:()=>{var n,a;return{x:document.documentElement.scrollLeft||((n=document.body)==null?void 0:n.scrollLeft)||0,y:document.documentElement.scrollTop||((a=document.body)==null?void 0:a.scrollTop)||0}},checkIsScrollRoot:()=>!0}),od={current:void 0},Rb=Mb({measureScroll:n=>({x:n.scrollLeft,y:n.scrollTop}),defaultParent:()=>{if(!od.current){const n=new dT({});n.mount(window),n.setOptions({layoutScroll:!0}),od.current=n}return od.current},resetTransform:(n,a)=>{n.style.transform=a!==void 0?a:"none"},checkIsScrollRoot:n=>window.getComputedStyle(n).position==="fixed"}),Lf=S.createContext({transformPagePoint:n=>n,isStatic:!1,reducedMotion:"never"});function dv(n,a){if(typeof n=="function")return n(a);n!=null&&(n.current=a)}function fT(...n){return a=>{let s=!1;const o=n.map(u=>{const h=dv(u,a);return!s&&typeof h=="function"&&(s=!0),h});if(s)return()=>{for(let u=0;u<o.length;u++){const h=o[u];typeof h=="function"?h():dv(n[u],null)}}}}function hT(...n){return S.useCallback(fT(...n),n)}class mT extends S.Component{getSnapshotBeforeUpdate(a){const s=this.props.childRef.current;if(Go(s)&&a.isPresent&&!this.props.isPresent&&this.props.pop!==!1){const o=s.offsetParent,u=Go(o)&&o.offsetWidth||0,h=Go(o)&&o.offsetHeight||0,f=getComputedStyle(s),m=this.props.sizeRef.current;m.height=parseFloat(f.height),m.width=parseFloat(f.width),m.top=s.offsetTop,m.left=s.offsetLeft,m.right=u-m.width-m.left,m.bottom=h-m.height-m.top,m.direction=f.direction}return null}componentDidUpdate(){}render(){return this.props.children}}function pT({children:n,isPresent:a,anchorX:s,anchorY:o,root:u,pop:h}){var b;const f=S.useId(),m=S.useRef(null),p=S.useRef({width:0,height:0,top:0,left:0,right:0,bottom:0,direction:"ltr"}),{nonce:g}=S.useContext(Lf),v=h!==!1?((b=n.props)==null?void 0:b.ref)??(n==null?void 0:n.ref):void 0,x=hT(m,v);return S.useInsertionEffect(()=>{const{width:E,height:j,top:N,left:C,right:k,bottom:D,direction:V}=p.current;if(a||h===!1||!m.current||!E||!j)return;const R=V==="rtl",B=s==="left"?R?`right: ${k}`:`left: ${C}`:R?`left: ${C}`:`right: ${k}`,Y=o==="bottom"?`bottom: ${D}`:`top: ${N}`;m.current.dataset.motionPopId=f;const A=document.createElement("style");g&&(A.nonce=g);const q=u??document.head;return q.appendChild(A),A.sheet&&A.sheet.insertRule(`
          [data-motion-pop-id="${f}"] {
            position: absolute !important;
            width: ${E}px !important;
            height: ${j}px !important;
            ${B}px !important;
            ${Y}px !important;
          }
        `),()=>{var U;(U=m.current)==null||U.removeAttribute("data-motion-pop-id"),q.contains(A)&&q.removeChild(A)}},[a]),l.jsx(mT,{isPresent:a,childRef:m,sizeRef:p,pop:h,children:h===!1?n:S.cloneElement(n,{ref:x})})}const gT=({children:n,initial:a,isPresent:s,onExitComplete:o,custom:u,presenceAffectsLayout:h,mode:f,anchorX:m,anchorY:p,root:g})=>{const v=ff(yT),x=S.useId(),b=S.useRef(s),E=S.useRef(o);hf(()=>{b.current=s,E.current=o});let j=!0,N=S.useMemo(()=>(j=!1,{id:x,initial:a,isPresent:s,custom:u,onExitComplete:C=>{v.set(C,!0);for(const k of v.values())if(!k)return;o&&o()},register:C=>(v.set(C,!1),()=>{var k;v.delete(C),!b.current&&!v.size&&((k=E.current)==null||k.call(E))})}),[s,v,o]);return h&&j&&(N={...N}),S.useMemo(()=>{v.forEach((C,k)=>v.set(k,!1))},[s]),S.useEffect(()=>{!s&&!v.size&&o&&o()},[s]),n=l.jsx(pT,{pop:f==="popLayout",isPresent:s,anchorX:m,anchorY:p,root:g,children:n}),l.jsx(wl.Provider,{value:N,children:n})};function yT(){return new Map}function Ob(n=!0){const a=S.useContext(wl);if(a===null)return[!0,null];const{isPresent:s,onExitComplete:o,register:u}=a,h=S.useId();S.useEffect(()=>{if(n)return u(h)},[n]);const f=S.useCallback(()=>n&&o&&o(h),[h,o,n]);return!s&&o?[!1,f]:[!0]}const Ro=n=>n.key||"";function fv(n){const a=[];return S.Children.forEach(n,s=>{S.isValidElement(s)&&a.push(s)}),a}const vT=({children:n,custom:a,initial:s=!0,onExitComplete:o,presenceAffectsLayout:u=!0,mode:h="sync",propagate:f=!1,anchorX:m="left",anchorY:p="top",root:g})=>{const[v,x]=Ob(f),b=S.useMemo(()=>fv(n),[n]),E=f&&!v?[]:b.map(Ro),j=S.useRef(!0),N=S.useRef(b),C=ff(()=>new Map),k=S.useRef(new Set),[D,V]=S.useState(b),[R,B]=S.useState(b);hf(()=>{j.current=!1,N.current=b;for(let q=0;q<R.length;q++){const U=Ro(R[q]);E.includes(U)?(C.delete(U),k.current.delete(U)):C.get(U)!==!0&&C.set(U,!1)}},[R,E.length,E.join("-")]);const Y=[];if(b!==D){let q=[...b];for(let U=0;U<R.length;U++){const _=R[U],$=Ro(_);E.includes($)||(q.splice(U,0,_),Y.push(_))}return h==="wait"&&Y.length&&(q=Y),B(fv(q)),V(b),null}const{forceRender:A}=S.useContext(df);return l.jsx(l.Fragment,{children:R.map(q=>{const U=Ro(q),_=f&&!v?!1:b===R||E.includes(U),$=()=>{if(k.current.has(U))return;if(C.has(U))k.current.add(U),C.set(U,!0);else return;let W=!0;C.forEach(le=>{le||(W=!1)}),W&&(A==null||A(),B(N.current),f&&(x==null||x()),o&&o())};return l.jsx(gT,{isPresent:_,initial:!j.current||s?void 0:!1,custom:a,presenceAffectsLayout:u,mode:h,root:g,onExitComplete:_?void 0:$,anchorX:m,anchorY:p,children:q},U)})})},zb=S.createContext({strict:!1}),hv={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]};let mv=!1;function xT(){if(mv)return;const n={};for(const a in hv)n[a]={isEnabled:s=>hv[a].some(o=>!!s[o])};ub(n),mv=!0}function _b(){return xT(),nE()}function bT(n){const a=_b();for(const s in n)a[s]={...a[s],...n[s]};ub(a)}const ST=new Set(["animate","exit","variants","initial","style","values","variants","transition","transformTemplate","custom","inherit","onBeforeLayoutMeasure","onAnimationStart","onAnimationComplete","onUpdate","onDragStart","onDrag","onDragEnd","onMeasureDragConstraints","onDirectionLock","onDragTransitionEnd","_dragX","_dragY","onHoverStart","onHoverEnd","onViewportEnter","onViewportLeave","globalTapTarget","propagate","ignoreStrict","viewport"]);function ul(n){return n.startsWith("while")||n.startsWith("drag")&&n!=="draggable"||n.startsWith("layout")||n.startsWith("onTap")||n.startsWith("onPan")||n.startsWith("onLayout")||ST.has(n)}let Vb=n=>!ul(n);function wT(n){typeof n=="function"&&(Vb=a=>a.startsWith("on")?!ul(a):n(a))}try{wT(require("@emotion/is-prop-valid").default)}catch{}function jT(n,a,s){const o={};for(const u in n)u==="values"&&typeof n.values=="object"||pt(n[u])||(Vb(u)||s===!0&&ul(u)||!a&&!ul(u)||n.draggable&&u.startsWith("onDrag"))&&(o[u]=n[u]);return o}const Nl=S.createContext({});function ET(n,a){if(Cl(n)){const{initial:s,animate:o}=n;return{initial:s===!1||es(s)?s:void 0,animate:es(o)?o:void 0}}return n.inherit!==!1?a:{}}function TT(n){const{initial:a,animate:s}=ET(n,S.useContext(Nl));return S.useMemo(()=>({initial:a,animate:s}),[pv(a),pv(s)])}function pv(n){return Array.isArray(n)?n.join(" "):n}const Uf=()=>({style:{},transform:{},transformOrigin:{},vars:{}});function Bb(n,a,s){for(const o in a)!pt(a[o])&&!yb(o,s)&&(n[o]=a[o])}function CT({transformTemplate:n},a){return S.useMemo(()=>{const s=Uf();return Vf(s,a,n),Object.assign({},s.vars,s.style)},[a])}function NT(n,a){const s=n.style||{},o={};return Bb(o,s,n),Object.assign(o,CT(n,a)),o}function DT(n,a){const s={},o=NT(n,a);return n.drag&&n.dragListener!==!1&&(s.draggable=!1,o.userSelect=o.WebkitUserSelect=o.WebkitTouchCallout="none",o.touchAction=n.drag===!0?"none":`pan-${n.drag==="x"?"y":"x"}`),n.tabIndex===void 0&&(n.onTap||n.onTapStart||n.whileTap)&&(s.tabIndex=0),s.style=o,s}const Lb=()=>({...Uf(),attrs:{}});function AT(n,a,s,o){const u=S.useMemo(()=>{const h=Lb();return vb(h,a,bb(o),n.transformTemplate,n.style),{...h.attrs,style:{...h.style}}},[a]);if(n.style){const h={};Bb(h,n.style,n),u.style={...h,...u.style}}return u}const MT=["animate","circle","defs","desc","ellipse","g","image","line","filter","marker","mask","metadata","path","pattern","polygon","polyline","rect","stop","switch","symbol","svg","text","tspan","use","view"];function Hf(n){return typeof n!="string"||n.includes("-")?!1:!!(MT.indexOf(n)>-1||/[A-Z]/u.test(n))}function kT(n,a,s,{latestValues:o},u,h=!1,f){const p=(f??Hf(n)?AT:DT)(a,o,u,n),g=jT(a,typeof n=="string",h),v=n!==S.Fragment?{...g,...p,ref:s}:{},{children:x}=a,b=S.useMemo(()=>pt(x)?x.get():x,[x]);return S.createElement(n,{...v,children:b})}function RT({scrapeMotionValuesFromProps:n,createRenderState:a},s,o,u){return{latestValues:OT(s,o,u,n),renderState:a()}}function OT(n,a,s,o){const u={},h=o(n,{});for(const b in h)u[b]=Zo(h[b]);let{initial:f,animate:m}=n;const p=Cl(n),g=lb(n);a&&g&&!p&&n.inherit!==!1&&(f===void 0&&(f=a.initial),m===void 0&&(m=a.animate));let v=s?s.initial===!1:!1;v=v||f===!1;const x=v?m:f;if(x&&typeof x!="boolean"&&!Tl(x)){const b=Array.isArray(x)?x:[x];for(let E=0;E<b.length;E++){const j=Nf(n,b[E]);if(j){const{transitionEnd:N,transition:C,...k}=j;for(const D in k){let V=k[D];if(Array.isArray(V)){const R=v?V.length-1:0;V=V[R]}V!==null&&(u[D]=V)}for(const D in N)u[D]=N[D]}}}return u}const Ub=n=>(a,s)=>{const o=S.useContext(Nl),u=S.useContext(wl),h=()=>RT(n,a,o,u);return s?h():ff(h)},zT=Ub({scrapeMotionValuesFromProps:Bf,createRenderState:Uf}),_T=Ub({scrapeMotionValuesFromProps:Sb,createRenderState:Lb}),VT=Symbol.for("motionComponentSymbol");function BT(n,a,s){const o=S.useRef(s);S.useInsertionEffect(()=>{o.current=s});const u=S.useRef(null);return S.useCallback(h=>{var m;h&&((m=n.onMount)==null||m.call(n,h)),a&&(h?a.mount(h):a.unmount());const f=o.current;if(typeof f=="function")if(h){const p=f(h);typeof p=="function"&&(u.current=p)}else u.current?(u.current(),u.current=null):f(h);else f&&(f.current=h)},[a])}const Hb=S.createContext({});function _a(n){return n&&typeof n=="object"&&Object.prototype.hasOwnProperty.call(n,"current")}function LT(n,a,s,o,u,h){var V,R;const{visualElement:f}=S.useContext(Nl),m=S.useContext(zb),p=S.useContext(wl),g=S.useContext(Lf),v=g.reducedMotion,x=g.skipAnimations,b=S.useRef(null),E=S.useRef(!1);o=o||m.renderer,!b.current&&o&&(b.current=o(n,{visualState:a,parent:f,props:s,presenceContext:p,blockInitialAnimation:p?p.initial===!1:!1,reducedMotionConfig:v,skipAnimations:x,isSVG:h}),E.current&&b.current&&(b.current.manuallyAnimateOnMount=!0));const j=b.current,N=S.useContext(Hb);j&&!j.projection&&u&&(j.type==="html"||j.type==="svg")&&UT(b.current,s,u,N);const C=S.useRef(!1);S.useInsertionEffect(()=>{j&&C.current&&j.update(s,p)});const k=s[Qx],D=S.useRef(!!k&&typeof window<"u"&&!((V=window.MotionHandoffIsComplete)!=null&&V.call(window,k))&&((R=window.MotionHasOptimisedAnimation)==null?void 0:R.call(window,k)));return hf(()=>{E.current=!0,j&&(C.current=!0,window.MotionIsMounted=!0,j.updateFeatures(),j.scheduleRenderMicrotask(),D.current&&j.animationState&&j.animationState.animateChanges())}),S.useEffect(()=>{j&&(!D.current&&j.animationState&&j.animationState.animateChanges(),D.current&&(queueMicrotask(()=>{var B;(B=window.MotionHandoffMarkAsComplete)==null||B.call(window,k)}),D.current=!1),j.enteringChildren=void 0)}),j}function UT(n,a,s,o){const{layoutId:u,layout:h,drag:f,dragConstraints:m,layoutScroll:p,layoutRoot:g,layoutAnchor:v,layoutCrossfade:x}=a;n.projection=new s(n.latestValues,a["data-framer-portal-id"]?void 0:qb(n.parent)),n.projection.setOptions({layoutId:u,layout:h,alwaysMeasureLayout:!!f||m&&_a(m),visualElement:n,animationType:typeof h=="string"?h:"both",initialPromotionConfig:o,crossfade:x,layoutScroll:p,layoutRoot:g,layoutAnchor:v})}function qb(n){if(n)return n.options.allowProjection!==!1?n.projection:qb(n.parent)}function ld(n,{forwardMotionProps:a=!1,type:s}={},o,u){o&&bT(o);const h=s?s==="svg":Hf(n),f=h?_T:zT;function m(g,v){let x;const b={...S.useContext(Lf),...g,layoutId:HT(g)},{isStatic:E}=b,j=TT(g),N=f(g,E);if(!E&&typeof window<"u"){qT();const C=YT(b);x=C.MeasureLayout,j.visualElement=LT(n,N,b,u,C.ProjectionNode,h)}return l.jsxs(Nl.Provider,{value:j,children:[x&&j.visualElement?l.jsx(x,{visualElement:j.visualElement,...b}):null,kT(n,g,BT(N,j.visualElement,v),N,E,a,h)]})}m.displayName=`motion.${typeof n=="string"?n:`create(${n.displayName??n.name??""})`}`;const p=S.forwardRef(m);return p[VT]=n,p}function HT({layoutId:n}){const a=S.useContext(df).id;return a&&n!==void 0?a+"-"+n:n}function qT(n,a){S.useContext(zb).strict}function YT(n){const a=_b(),{drag:s,layout:o}=a;if(!s&&!o)return{};const u={...s,...o};return{MeasureLayout:s!=null&&s.isEnabled(n)||o!=null&&o.isEnabled(n)?u.MeasureLayout:void 0,ProjectionNode:u.ProjectionNode}}function PT(n,a){if(typeof Proxy>"u")return ld;const s=new Map,o=(h,f)=>ld(h,f,n,a),u=(h,f)=>o(h,f);return new Proxy(u,{get:(h,f)=>f==="create"?o:(s.has(f)||s.set(f,ld(f,void 0,n,a)),s.get(f))})}const GT=(n,a)=>a.isSVG??Hf(n)?new xE(a):new hE(a,{allowProjection:n!==S.Fragment});class XT extends Sr{constructor(a){super(a),a.animationState||(a.animationState=EE(a))}updateAnimationControlsSubscription(){const{animate:a}=this.node.getProps();Tl(a)&&(this.unmountControls=a.subscribe(this.node))}mount(){this.updateAnimationControlsSubscription()}update(){const{animate:a}=this.node.getProps(),{animate:s}=this.node.prevProps||{};a!==s&&this.updateAnimationControlsSubscription()}unmount(){var a;this.node.animationState.reset(),(a=this.unmountControls)==null||a.call(this)}}let FT=0;class $T extends Sr{constructor(){super(...arguments),this.id=FT++,this.isExitComplete=!1}update(){var h;if(!this.node.presenceContext)return;const{isPresent:a,onExitComplete:s}=this.node.presenceContext,{isPresent:o}=this.node.prevPresenceContext||{};if(!this.node.animationState||a===o)return;if(a&&o===!1){if(this.isExitComplete){const{initial:f,custom:m}=this.node.getProps();if(typeof f=="string"||typeof f=="object"&&f!==null&&!Array.isArray(f)){const p=Xr(this.node,f,m);if(p){const{transition:g,transitionEnd:v,...x}=p;for(const b in x)(h=this.node.getValue(b))==null||h.jump(x[b])}}this.node.animationState.reset(),this.node.animationState.animateChanges()}else this.node.animationState.setActive("exit",!1);this.isExitComplete=!1;return}const u=this.node.animationState.setActive("exit",!a);s&&!a&&u.then(()=>{this.isExitComplete=!0,s(this.id)})}mount(){const{register:a,onExitComplete:s}=this.node.presenceContext||{};s&&s(this.id),a&&(this.unmount=a(this.id))}unmount(){}}const KT={animation:{Feature:XT},exit:{Feature:$T}};function cs(n){return{point:{x:n.pageX,y:n.pageY}}}const ZT=n=>a=>kf(a)&&n(a,cs(a));function Qi(n,a,s,o){return ts(n,a,ZT(s),o)}const Yb=({current:n})=>n?n.ownerDocument.defaultView:null,gv=(n,a)=>Math.abs(n-a);function QT(n,a){const s=gv(n.x,a.x),o=gv(n.y,a.y);return Math.sqrt(s**2+o**2)}const yv=new Set(["auto","scroll"]);class Pb{constructor(a,s,{transformPagePoint:o,contextWindow:u=window,dragSnapToOrigin:h=!1,distanceThreshold:f=3,element:m}={}){if(this.startEvent=null,this.lastMoveEvent=null,this.lastMoveEventInfo=null,this.lastRawMoveEventInfo=null,this.handlers={},this.contextWindow=window,this.scrollPositions=new Map,this.removeScrollListeners=null,this.onElementScroll=j=>{this.handleScroll(j.target)},this.onWindowScroll=()=>{this.handleScroll(window)},this.updatePoint=()=>{if(!(this.lastMoveEvent&&this.lastMoveEventInfo))return;this.lastRawMoveEventInfo&&(this.lastMoveEventInfo=Oo(this.lastRawMoveEventInfo,this.transformPagePoint));const j=cd(this.lastMoveEventInfo,this.history),N=this.startEvent!==null,C=QT(j.offset,{x:0,y:0})>=this.distanceThreshold;if(!N&&!C)return;const{point:k}=j,{timestamp:D}=mt;this.history.push({...k,timestamp:D});const{onStart:V,onMove:R}=this.handlers;N||(V&&V(this.lastMoveEvent,j),this.startEvent=this.lastMoveEvent),R&&R(this.lastMoveEvent,j)},this.handlePointerMove=(j,N)=>{this.lastMoveEvent=j,this.lastRawMoveEventInfo=N,this.lastMoveEventInfo=Oo(N,this.transformPagePoint),qe.update(this.updatePoint,!0)},this.handlePointerUp=(j,N)=>{this.end();const{onEnd:C,onSessionEnd:k,resumeAnimation:D}=this.handlers;if((this.dragSnapToOrigin||!this.startEvent)&&D&&D(),!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const V=cd(j.type==="pointercancel"?this.lastMoveEventInfo:Oo(N,this.transformPagePoint),this.history);this.startEvent&&C&&C(j,V),k&&k(j,V)},!kf(a))return;this.dragSnapToOrigin=h,this.handlers=s,this.transformPagePoint=o,this.distanceThreshold=f,this.contextWindow=u||window;const p=cs(a),g=Oo(p,this.transformPagePoint),{point:v}=g,{timestamp:x}=mt;this.history=[{...v,timestamp:x}];const{onSessionStart:b}=s;b&&b(a,cd(g,this.history));const E={passive:!0,capture:!0};this.removeListeners=ss(Qi(this.contextWindow,"pointermove",this.handlePointerMove,E),Qi(this.contextWindow,"pointerup",this.handlePointerUp,E),Qi(this.contextWindow,"pointercancel",this.handlePointerUp,E)),m&&this.startScrollTracking(m)}startScrollTracking(a){let s=a.parentElement;for(;s;){const o=getComputedStyle(s);(yv.has(o.overflowX)||yv.has(o.overflowY))&&this.scrollPositions.set(s,{x:s.scrollLeft,y:s.scrollTop}),s=s.parentElement}this.scrollPositions.set(window,{x:window.scrollX,y:window.scrollY}),window.addEventListener("scroll",this.onElementScroll,{capture:!0}),window.addEventListener("scroll",this.onWindowScroll),this.removeScrollListeners=()=>{window.removeEventListener("scroll",this.onElementScroll,{capture:!0}),window.removeEventListener("scroll",this.onWindowScroll)}}handleScroll(a){const s=this.scrollPositions.get(a);if(!s)return;const o=a===window,u=o?{x:window.scrollX,y:window.scrollY}:{x:a.scrollLeft,y:a.scrollTop},h={x:u.x-s.x,y:u.y-s.y};h.x===0&&h.y===0||(o?this.lastMoveEventInfo&&(this.lastMoveEventInfo.point.x+=h.x,this.lastMoveEventInfo.point.y+=h.y):this.history.length>0&&(this.history[0].x-=h.x,this.history[0].y-=h.y),this.scrollPositions.set(a,u),qe.update(this.updatePoint,!0))}updateHandlers(a){this.handlers=a}end(){this.removeListeners&&this.removeListeners(),this.removeScrollListeners&&this.removeScrollListeners(),this.scrollPositions.clear(),xr(this.updatePoint)}}function Oo(n,a){return a?{point:a(n.point)}:n}function vv(n,a){return{x:n.x-a.x,y:n.y-a.y}}function cd({point:n},a){return{point:n,delta:vv(n,Gb(a)),offset:vv(n,JT(a)),velocity:WT(a,.1)}}function JT(n){return n[0]}function Gb(n){return n[n.length-1]}function WT(n,a){if(n.length<2)return{x:0,y:0};let s=n.length-1,o=null;const u=Gb(n);for(;s>=0&&(o=n[s],!(u.timestamp-o.timestamp>Ht(a)));)s--;if(!o)return{x:0,y:0};o===n[0]&&n.length>2&&u.timestamp-o.timestamp>Ht(a)*2&&(o=n[1]);const h=It(u.timestamp-o.timestamp);if(h===0)return{x:0,y:0};const f={x:(u.x-o.x)/h,y:(u.y-o.y)/h};return f.x===1/0&&(f.x=0),f.y===1/0&&(f.y=0),f}function IT(n,{min:a,max:s},o){return a!==void 0&&n<a?n=o?He(a,n,o.min):Math.max(n,a):s!==void 0&&n>s&&(n=o?He(s,n,o.max):Math.min(n,s)),n}function xv(n,a,s){return{min:a!==void 0?n.min+a:void 0,max:s!==void 0?n.max+s-(n.max-n.min):void 0}}function eC(n,{top:a,left:s,bottom:o,right:u}){return{x:xv(n.x,s,u),y:xv(n.y,a,o)}}function bv(n,a){let s=a.min-n.min,o=a.max-n.max;return a.max-a.min<n.max-n.min&&([s,o]=[o,s]),{min:s,max:o}}function tC(n,a){return{x:bv(n.x,a.x),y:bv(n.y,a.y)}}function nC(n,a){let s=.5;const o=bt(n),u=bt(a);return u>o?s=Wi(a.min,a.max-o,n.min):o>u&&(s=Wi(n.min,n.max-u,a.min)),bn(0,1,s)}function rC(n,a){const s={};return a.min!==void 0&&(s.min=a.min-n.min),a.max!==void 0&&(s.max=a.max-n.min),s}const Fd=.35;function aC(n=Fd){return n===!1?n=0:n===!0&&(n=Fd),{x:Sv(n,"left","right"),y:Sv(n,"top","bottom")}}function Sv(n,a,s){return{min:wv(n,a),max:wv(n,s)}}function wv(n,a){return typeof n=="number"?n:n[a]||0}const iC=new WeakMap;class sC{constructor(a){this.openDragLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},this.constraints=!1,this.hasMutatedConstraints=!1,this.elastic=it(),this.latestPointerEvent=null,this.latestPanInfo=null,this.visualElement=a}start(a,{snapToCursor:s=!1,distanceThreshold:o}={}){const{presenceContext:u}=this.visualElement;if(u&&u.isPresent===!1)return;const h=x=>{s&&this.snapToCursor(cs(x).point),this.stopAnimation()},f=(x,b)=>{const{drag:E,dragPropagation:j,onDragStart:N}=this.getProps();if(E&&!j&&(this.openDragLock&&this.openDragLock(),this.openDragLock=Oj(E),!this.openDragLock))return;this.latestPointerEvent=x,this.latestPanInfo=b,this.isDragging=!0,this.currentDirection=null,this.resolveConstraints(),this.visualElement.projection&&(this.visualElement.projection.isAnimationBlocked=!0,this.visualElement.projection.target=void 0),pn(k=>{let D=this.getAxisMotionValue(k).get()||0;if(vn.test(D)){const{projection:V}=this.visualElement;if(V&&V.layout){const R=V.layout.layoutBox[k];R&&(D=bt(R)*(parseFloat(D)/100))}}this.originPoint[k]=D}),N&&qe.update(()=>N(x,b),!1,!0),Bd(this.visualElement,"transform");const{animationState:C}=this.visualElement;C&&C.setActive("whileDrag",!0)},m=(x,b)=>{this.latestPointerEvent=x,this.latestPanInfo=b;const{dragPropagation:E,dragDirectionLock:j,onDirectionLock:N,onDrag:C}=this.getProps();if(!E&&!this.openDragLock)return;const{offset:k}=b;if(j&&this.currentDirection===null){this.currentDirection=lC(k),this.currentDirection!==null&&N&&N(this.currentDirection);return}this.updateAxis("x",b.point,k),this.updateAxis("y",b.point,k),this.visualElement.render(),C&&qe.update(()=>C(x,b),!1,!0)},p=(x,b)=>{this.latestPointerEvent=x,this.latestPanInfo=b,this.stop(x,b),this.latestPointerEvent=null,this.latestPanInfo=null},g=()=>{const{dragSnapToOrigin:x}=this.getProps();(x||this.constraints)&&this.startAnimation({x:0,y:0})},{dragSnapToOrigin:v}=this.getProps();this.panSession=new Pb(a,{onSessionStart:h,onStart:f,onMove:m,onSessionEnd:p,resumeAnimation:g},{transformPagePoint:this.visualElement.getTransformPagePoint(),dragSnapToOrigin:v,distanceThreshold:o,contextWindow:Yb(this.visualElement),element:this.visualElement.current})}stop(a,s){const o=a||this.latestPointerEvent,u=s||this.latestPanInfo,h=this.isDragging;if(this.cancel(),!h||!u||!o)return;const{velocity:f}=u;this.startAnimation(f);const{onDragEnd:m}=this.getProps();m&&qe.postRender(()=>m(o,u))}cancel(){this.isDragging=!1;const{projection:a,animationState:s}=this.visualElement;a&&(a.isAnimationBlocked=!1),this.endPanSession();const{dragPropagation:o}=this.getProps();!o&&this.openDragLock&&(this.openDragLock(),this.openDragLock=null),s&&s.setActive("whileDrag",!1)}endPanSession(){this.panSession&&this.panSession.end(),this.panSession=void 0}updateAxis(a,s,o){const{drag:u}=this.getProps();if(!o||!zo(a,u,this.currentDirection))return;const h=this.getAxisMotionValue(a);let f=this.originPoint[a]+o[a];this.constraints&&this.constraints[a]&&(f=IT(f,this.constraints[a],this.elastic[a])),h.set(f)}resolveConstraints(){var h;const{dragConstraints:a,dragElastic:s}=this.getProps(),o=this.visualElement.projection&&!this.visualElement.projection.layout?this.visualElement.projection.measure(!1):(h=this.visualElement.projection)==null?void 0:h.layout,u=this.constraints;a&&_a(a)?this.constraints||(this.constraints=this.resolveRefConstraints()):a&&o?this.constraints=eC(o.layoutBox,a):this.constraints=!1,this.elastic=aC(s),u!==this.constraints&&!_a(a)&&o&&this.constraints&&!this.hasMutatedConstraints&&pn(f=>{this.constraints!==!1&&this.getAxisMotionValue(f)&&(this.constraints[f]=rC(o.layoutBox[f],this.constraints[f]))})}resolveRefConstraints(){const{dragConstraints:a,onMeasureDragConstraints:s}=this.getProps();if(!a||!_a(a))return!1;const o=a.current,{projection:u}=this.visualElement;if(!u||!u.layout)return!1;u.root&&(u.root.scroll=void 0,u.root.updateScroll());const h=oE(o,u.root,this.visualElement.getTransformPagePoint());let f=tC(u.layout.layoutBox,h);if(s){const m=s(aE(f));this.hasMutatedConstraints=!!m,m&&(f=fb(m))}return f}startAnimation(a){const{drag:s,dragMomentum:o,dragElastic:u,dragTransition:h,dragSnapToOrigin:f,onDragTransitionEnd:m}=this.getProps(),p=this.constraints||{},g=pn(v=>{if(!zo(v,s,this.currentDirection))return;let x=p&&p[v]||{};(f===!0||f===v)&&(x={min:0,max:0});const b=u?200:1e6,E=u?40:1e7,j={type:"inertia",velocity:o?a[v]:0,bounceStiffness:b,bounceDamping:E,timeConstant:750,restDelta:1,restSpeed:10,...h,...x};return this.startAxisValueAnimation(v,j)});return Promise.all(g).then(m)}startAxisValueAnimation(a,s){const o=this.getAxisMotionValue(a);return Bd(this.visualElement,a),o.start(Cf(a,o,0,s,this.visualElement,!1))}stopAnimation(){pn(a=>this.getAxisMotionValue(a).stop())}getAxisMotionValue(a){const s=`_drag${a.toUpperCase()}`,u=this.visualElement.getProps()[s];return u||this.visualElement.getValue(a,this.visualElement.latestValues[a]??0)}snapToCursor(a){pn(s=>{const{drag:o}=this.getProps();if(!zo(s,o,this.currentDirection))return;const{projection:u}=this.visualElement,h=this.getAxisMotionValue(s);if(u&&u.layout){const{min:f,max:m}=u.layout.layoutBox[s],p=h.get()||0;h.set(a[s]-He(f,m,.5)+p)}})}scalePositionWithinConstraints(){if(!this.visualElement.current)return;const{drag:a,dragConstraints:s}=this.getProps(),{projection:o}=this.visualElement;if(!_a(s)||!o||!this.constraints)return;this.stopAnimation();const u={x:0,y:0};pn(f=>{const m=this.getAxisMotionValue(f);if(m&&this.constraints!==!1){const p=m.get();u[f]=nC({min:p,max:p},this.constraints[f])}});const{transformTemplate:h}=this.visualElement.getProps();this.visualElement.current.style.transform=h?h({},""):"none",o.root&&o.root.updateScroll(),o.updateLayout(),this.constraints=!1,this.resolveConstraints(),pn(f=>{if(!zo(f,a,null))return;const m=this.getAxisMotionValue(f),{min:p,max:g}=this.constraints[f];m.set(He(p,g,u[f]))}),this.visualElement.render()}addListeners(){if(!this.visualElement.current)return;iC.set(this.visualElement,this);const a=this.visualElement.current,s=Qi(a,"pointerdown",g=>{const{drag:v,dragListener:x=!0}=this.getProps(),b=g.target,E=b!==a&&Uj(b);v&&x&&!E&&this.start(g)});let o;const u=()=>{const{dragConstraints:g}=this.getProps();_a(g)&&g.current&&(this.constraints=this.resolveRefConstraints(),o||(o=oC(a,g.current,()=>this.scalePositionWithinConstraints())))},{projection:h}=this.visualElement,f=h.addEventListener("measure",u);h&&!h.layout&&(h.root&&h.root.updateScroll(),h.updateLayout()),qe.read(u);const m=ts(window,"resize",()=>this.scalePositionWithinConstraints()),p=h.addEventListener("didUpdate",(({delta:g,hasLayoutChanged:v})=>{this.isDragging&&v&&(pn(x=>{const b=this.getAxisMotionValue(x);b&&(this.originPoint[x]+=g[x].translate,b.set(b.get()+g[x].translate))}),this.visualElement.render())}));return()=>{m(),s(),f(),p&&p(),o&&o()}}getProps(){const a=this.visualElement.getProps(),{drag:s=!1,dragDirectionLock:o=!1,dragPropagation:u=!1,dragConstraints:h=!1,dragElastic:f=Fd,dragMomentum:m=!0}=a;return{...a,drag:s,dragDirectionLock:o,dragPropagation:u,dragConstraints:h,dragElastic:f,dragMomentum:m}}}function jv(n){let a=!0;return()=>{if(a){a=!1;return}n()}}function oC(n,a,s){const o=My(n,jv(s)),u=My(a,jv(s));return()=>{o(),u()}}function zo(n,a,s){return(a===!0||a===n)&&(s===null||s===n)}function lC(n,a=10){let s=null;return Math.abs(n.y)>a?s="y":Math.abs(n.x)>a&&(s="x"),s}class cC extends Sr{constructor(a){super(a),this.removeGroupControls=en,this.removeListeners=en,this.controls=new sC(a)}mount(){const{dragControls:a}=this.node.getProps();a&&(this.removeGroupControls=a.subscribe(this.controls)),this.removeListeners=this.controls.addListeners()||en}update(){const{dragControls:a}=this.node.getProps(),{dragControls:s}=this.node.prevProps||{};a!==s&&(this.removeGroupControls(),a&&(this.removeGroupControls=a.subscribe(this.controls)))}unmount(){this.removeGroupControls(),this.removeListeners(),this.controls.isDragging||this.controls.endPanSession()}}const ud=n=>(a,s)=>{n&&qe.update(()=>n(a,s),!1,!0)};class uC extends Sr{constructor(){super(...arguments),this.removePointerDownListener=en}onPointerDown(a){this.session=new Pb(a,this.createPanHandlers(),{transformPagePoint:this.node.getTransformPagePoint(),contextWindow:Yb(this.node)})}createPanHandlers(){const{onPanSessionStart:a,onPanStart:s,onPan:o,onPanEnd:u}=this.node.getProps();return{onSessionStart:ud(a),onStart:ud(s),onMove:ud(o),onEnd:(h,f)=>{delete this.session,u&&qe.postRender(()=>u(h,f))}}}mount(){this.removePointerDownListener=Qi(this.node.current,"pointerdown",a=>this.onPointerDown(a))}update(){this.session&&this.session.updateHandlers(this.createPanHandlers())}unmount(){this.removePointerDownListener(),this.session&&this.session.end()}}let dd=!1;class dC extends S.Component{componentDidMount(){const{visualElement:a,layoutGroup:s,switchLayoutGroup:o,layoutId:u}=this.props,{projection:h}=a;h&&(s.group&&s.group.add(h),o&&o.register&&u&&o.register(h),dd&&h.root.didUpdate(),h.addEventListener("animationComplete",()=>{this.safeToRemove()}),h.setOptions({...h.options,layoutDependency:this.props.layoutDependency,onExitComplete:()=>this.safeToRemove()})),Qo.hasEverUpdated=!0}getSnapshotBeforeUpdate(a){const{layoutDependency:s,visualElement:o,drag:u,isPresent:h}=this.props,{projection:f}=o;return f&&(f.isPresent=h,a.layoutDependency!==s&&f.setOptions({...f.options,layoutDependency:s}),dd=!0,u||a.layoutDependency!==s||s===void 0||a.isPresent!==h?f.willUpdate():this.safeToRemove(),a.isPresent!==h&&(h?f.promote():f.relegate()||qe.postRender(()=>{const m=f.getStack();(!m||!m.members.length)&&this.safeToRemove()}))),null}componentDidUpdate(){const{visualElement:a,layoutAnchor:s}=this.props,{projection:o}=a;o&&(o.options.layoutAnchor=s,o.root.didUpdate(),Mf.postRender(()=>{!o.currentAnimation&&o.isLead()&&this.safeToRemove()}))}componentWillUnmount(){const{visualElement:a,layoutGroup:s,switchLayoutGroup:o}=this.props,{projection:u}=a;dd=!0,u&&(u.scheduleCheckAfterUnmount(),s&&s.group&&s.group.remove(u),o&&o.deregister&&o.deregister(u))}safeToRemove(){const{safeToRemove:a}=this.props;a&&a()}render(){return null}}function Xb(n){const[a,s]=Ob(),o=S.useContext(df);return l.jsx(dC,{...n,layoutGroup:o,switchLayoutGroup:S.useContext(Hb),isPresent:a,safeToRemove:s})}const fC={pan:{Feature:uC},drag:{Feature:cC,ProjectionNode:Rb,MeasureLayout:Xb}};function Ev(n,a,s){const{props:o}=n;n.animationState&&o.whileHover&&n.animationState.setActive("whileHover",s==="Start");const u="onHover"+s,h=o[u];h&&qe.postRender(()=>h(a,cs(a)))}class hC extends Sr{mount(){const{current:a}=this.node;a&&(this.unmount=_j(a,(s,o)=>(Ev(this.node,o,"Start"),u=>Ev(this.node,u,"End"))))}unmount(){}}class mC extends Sr{constructor(){super(...arguments),this.isActive=!1}onFocus(){let a=!1;try{a=this.node.current.matches(":focus-visible")}catch{a=!0}!a||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!0),this.isActive=!0)}onBlur(){!this.isActive||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!1),this.isActive=!1)}mount(){this.unmount=ss(ts(this.node.current,"focus",()=>this.onFocus()),ts(this.node.current,"blur",()=>this.onBlur()))}unmount(){}}function Tv(n,a,s){const{props:o}=n;if(n.current instanceof HTMLButtonElement&&n.current.disabled)return;n.animationState&&o.whileTap&&n.animationState.setActive("whileTap",s==="Start");const u="onTap"+(s==="End"?"":s),h=o[u];h&&qe.postRender(()=>h(a,cs(a)))}class pC extends Sr{mount(){const{current:a}=this.node;if(!a)return;const{globalTapTarget:s,propagate:o}=this.node.props;this.unmount=qj(a,(u,h)=>(Tv(this.node,h,"Start"),(f,{success:m})=>Tv(this.node,f,m?"End":"Cancel")),{useGlobalTarget:s,stopPropagation:(o==null?void 0:o.tap)===!1})}unmount(){}}const $d=new WeakMap,fd=new WeakMap,gC=n=>{const a=$d.get(n.target);a&&a(n)},yC=n=>{n.forEach(gC)};function vC({root:n,...a}){const s=n||document;fd.has(s)||fd.set(s,{});const o=fd.get(s),u=JSON.stringify(a);return o[u]||(o[u]=new IntersectionObserver(yC,{root:n,...a})),o[u]}function xC(n,a,s){const o=vC(a);return $d.set(n,s),o.observe(n),()=>{$d.delete(n),o.unobserve(n)}}const bC={some:0,all:1};class SC extends Sr{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){var p;(p=this.stopObserver)==null||p.call(this);const{viewport:a={}}=this.node.getProps(),{root:s,margin:o,amount:u="some",once:h}=a,f={root:s?s.current:void 0,rootMargin:o,threshold:typeof u=="number"?u:bC[u]},m=g=>{const{isIntersecting:v}=g;if(this.isInView===v||(this.isInView=v,h&&!v&&this.hasEnteredView))return;v&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive("whileInView",v);const{onViewportEnter:x,onViewportLeave:b}=this.node.getProps(),E=v?x:b;E&&E(g)};this.stopObserver=xC(this.node.current,f,m)}mount(){this.startObserver()}update(){if(typeof IntersectionObserver>"u")return;const{props:a,prevProps:s}=this.node;["amount","margin","root"].some(wC(a,s))&&this.startObserver()}unmount(){var a;(a=this.stopObserver)==null||a.call(this),this.hasEnteredView=!1,this.isInView=!1}}function wC({viewport:n={}},{viewport:a={}}={}){return s=>n[s]!==a[s]}const jC={inView:{Feature:SC},tap:{Feature:pC},focus:{Feature:mC},hover:{Feature:hC}},EC={layout:{ProjectionNode:Rb,MeasureLayout:Xb}},TC={...KT,...jC,...fC,...EC},CC=PT(TC,GT);function Fb(){!_f.current&&cb();const[n]=S.useState(sl.current);return n}const $b=CC,dl=new Map,Cv=new Set;let NC=0;const qf=()=>{var n;return(n=window.chrome)==null?void 0:n.webview};function DC(n){var s;const a=dl.get(n.id);if(a){if(n.type==="progress"){(s=a.progress)==null||s.call(a,n.data);return}window.clearTimeout(a.timer),dl.delete(n.id),n.ok?a.resolve(n.data):a.reject(new Error(n.error||"操作失败"))}}var ix;(ix=qf())==null||ix.addEventListener("message",n=>DC(n.data));function AC(n,a){var s;a&&Cv.has(a)||(a&&Cv.add(a),(s=qf())==null||s.postMessage({type:"app.ready",route:n,navigation:a}))}function ye(n,a,s=3e4,o){const u=qf();if(!u)return Promise.reject(new Error("当前页面未连接到桌面宿主"));const h=`${Date.now()}-${++NC}`;return new Promise((f,m)=>{const p=window.setTimeout(()=>{dl.delete(h),m(new Error("操作超时，请重试"))},s);dl.set(h,{resolve:g=>f(g),reject:m,timer:p,progress:o}),u.postMessage({id:h,operation:n,payload:a})})}var Yf=lx();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const MC=n=>n.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Kb=(...n)=>n.filter((a,s,o)=>!!a&&a.trim()!==""&&o.indexOf(a)===s).join(" ").trim();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var kC={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const RC=S.forwardRef(({color:n="currentColor",size:a=24,strokeWidth:s=2,absoluteStrokeWidth:o,className:u="",children:h,iconNode:f,...m},p)=>S.createElement("svg",{ref:p,...kC,width:a,height:a,stroke:n,strokeWidth:o?Number(s)*24/Number(a):s,className:Kb("lucide",u),...m},[...f.map(([g,v])=>S.createElement(g,v)),...Array.isArray(h)?h:[h]]));/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ye=(n,a)=>{const s=S.forwardRef(({className:o,...u},h)=>S.createElement(RC,{ref:h,iconNode:a,className:Kb(`lucide-${MC(n)}`,o),...u}));return s.displayName=`${n}`,s};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ns=Ye("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const OC=Ye("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zC=Ye("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const us=Ye("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _C=Ye("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const VC=Ye("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const BC=Ye("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const LC=Ye("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const UC=Ye("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kd=Ye("Database",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const HC=Ye("Ellipsis",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nv=Ye("FileCheck2",[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4",key:"1pf5j1"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"m3 15 2 2 4-4",key:"1lhrkk"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fl=Ye("FileSpreadsheet",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M8 13h2",key:"yr2amv"}],["path",{d:"M14 13h2",key:"un5t4a"}],["path",{d:"M8 17h2",key:"2yhykz"}],["path",{d:"M14 17h2",key:"10kma7"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qC=Ye("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hl=Ye("FolderOpen",[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sn=Ye("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const YC=Ye("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const PC=Ye("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zb=Ye("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const GC=Ye("RotateCw",[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",key:"1p45f6"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const XC=Ye("Rows3",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M21 9H3",key:"1338ky"}],["path",{d:"M21 15H3",key:"9uk58r"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pf=Ye("Settings2",[["path",{d:"M20 7h-9",key:"3s1dr2"}],["path",{d:"M14 17H5",key:"gfn3mx"}],["circle",{cx:"17",cy:"17",r:"3",key:"18b49y"}],["circle",{cx:"7",cy:"7",r:"3",key:"dfmy0x"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const FC=Ye("Sigma",[["path",{d:"M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2",key:"wuwx1p"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $C=Ye("SlidersHorizontal",[["line",{x1:"21",x2:"14",y1:"4",y2:"4",key:"obuewd"}],["line",{x1:"10",x2:"3",y1:"4",y2:"4",key:"1q6298"}],["line",{x1:"21",x2:"12",y1:"12",y2:"12",key:"1iu8h1"}],["line",{x1:"8",x2:"3",y1:"12",y2:"12",key:"ntss68"}],["line",{x1:"21",x2:"16",y1:"20",y2:"20",key:"14d8ph"}],["line",{x1:"12",x2:"3",y1:"20",y2:"20",key:"m0wm8r"}],["line",{x1:"14",x2:"14",y1:"2",y2:"6",key:"14e1ph"}],["line",{x1:"8",x2:"8",y1:"10",y2:"14",key:"1i6ji0"}],["line",{x1:"16",x2:"16",y1:"18",y2:"22",key:"1lctlv"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const KC=Ye("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ZC=Ye("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gf=Ye("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),QC=["一","二","三","四","五","六","日"],JC=Array.from({length:12},(n,a)=>`${a+1}月`);function WC(n){if(!n)return null;const[a,s,o=1]=n.split("-").map(Number);return!a||!s||!o?null:new Date(a,s-1,o)}function Dv(n){const a=n.getFullYear(),s=String(n.getMonth()+1).padStart(2,"0"),o=String(n.getDate()).padStart(2,"0");return`${a}-${s}-${o}`}function IC(n){const a=n.getFullYear(),s=String(n.getMonth()+1).padStart(2,"0"),o=String(n.getDate()).padStart(2,"0");return`${a}/${s}/${o}`}function eN(n,a){const s=new Date(n,a,1).getDay();return s===0?6:s-1}function tN(n,a){return new Date(n,a+1,0).getDate()}function Av(n,a){return n.getFullYear()===a.getFullYear()&&n.getMonth()===a.getMonth()&&n.getDate()===a.getDate()}function nN(n){return Math.floor(n/12)*12}function xn({value:n,onChange:a,label:s,disabled:o=!1,selectionMode:u="day"}){var T;const h=S.useId(),f=S.useMemo(()=>WC(n),[n]),[m,p]=S.useState(!1),[g,v]=S.useState(u),[x,b]=S.useState(f??new Date),[E,j]=S.useState({top:0,left:0}),[N,C]=S.useState("bottom"),k=S.useRef(null),D=S.useRef(null),V=S.useRef(null);S.useEffect(()=>{f&&b(f)},[n]);function R(){const O=k.current,te=V.current;if(!O||!te)return;const oe=O.ownerDocument.defaultView||window,ue=O.getBoundingClientRect(),me=te.getBoundingClientRect(),xe=me.width,ie=me.height,I=8,de=12,re=oe.innerHeight-ue.bottom-de,pe=ue.top-de,Ce=ie>re&&pe>re,Oe=Ce?"top":"bottom";let Qe=Ce?ue.top-ie-I:ue.bottom+I;Qe<de&&(Qe=de),Qe+ie>oe.innerHeight-de&&(Qe=Math.max(de,oe.innerHeight-ie-de));let Fe=ue.left;Fe+xe>oe.innerWidth-de&&(Fe=oe.innerWidth-xe-de),Fe<de&&(Fe=de),C(Oe),j({top:Qe,left:Fe})}S.useLayoutEffect(()=>{m&&R()},[m,g]),S.useEffect(()=>{var oe;if(!m)return;const O=((oe=k.current)==null?void 0:oe.ownerDocument.defaultView)||window;function te(){R()}return O.addEventListener("resize",te),O.addEventListener("scroll",te,!0),()=>{O.removeEventListener("resize",te),O.removeEventListener("scroll",te,!0)}},[m,g]),S.useEffect(()=>{var ue;const O=((ue=D.current)==null?void 0:ue.ownerDocument)||document;function te(me){var de,re;const xe=me.target,ie=(de=D.current)==null?void 0:de.contains(xe),I=(re=V.current)==null?void 0:re.contains(xe);!ie&&!I&&(p(!1),v(u))}function oe(me){me.key==="Escape"&&(p(!1),v(u))}return O.addEventListener("mousedown",te),O.addEventListener("keydown",oe),()=>{O.removeEventListener("mousedown",te),O.removeEventListener("keydown",oe)}},[u]);const B=x.getFullYear(),Y=x.getMonth(),A=tN(B,Y),q=eN(B,Y),U=nN(B),_=Array.from({length:12},(O,te)=>U+te),$=[];for(let O=0;O<q;O+=1)$.push(null);for(let O=1;O<=A;O+=1)$.push(O);function W(){if(g==="day"){b(new Date(B,Y-1,1));return}if(g==="month"){b(new Date(B-1,Y,1));return}b(new Date(B-12,Y,1))}function le(){if(g==="day"){b(new Date(B,Y+1,1));return}if(g==="month"){b(new Date(B+1,Y,1));return}b(new Date(B+12,Y,1))}function Z(){if(u==="month"){v(g==="month"?"year":"month");return}if(g==="day"){v("month");return}if(g==="month"){v("year");return}v("day")}function ce(O){const te=new Date(B,Y,O);a(Dv(te)),p(!1),v("day")}function L(O){if(u==="month"){a(`${B}-${String(O+1).padStart(2,"0")}`),b(new Date(B,O,1)),p(!1),v("month");return}b(new Date(B,O,1)),v("day")}function se(O){b(new Date(O,Y,1)),v("month")}function Q(){const O=new Date;b(O),a(u==="month"?`${O.getFullYear()}-${String(O.getMonth()+1).padStart(2,"0")}`:Dv(O)),v(u),p(!1)}function X(){return g==="day"?`${B}年 ${Y+1}月`:g==="month"?`${B}年`:`${U} - ${U+11}`}const ae=m?l.jsxs("div",{ref:V,className:`date-picker-popover date-picker-popover-${N}`,style:{top:E.top,left:E.left},children:[l.jsxs("div",{className:"date-picker-header",children:[l.jsx("button",{type:"button",className:"date-picker-nav-button",onClick:W,"aria-label":"上一页",children:l.jsx(VC,{size:17,strokeWidth:1.7})}),l.jsx("button",{type:"button",className:"date-picker-title-button",onClick:Z,children:X()}),l.jsx("button",{type:"button",className:"date-picker-nav-button",onClick:le,"aria-label":"下一页",children:l.jsx(BC,{size:17,strokeWidth:1.7})})]}),g==="day"&&l.jsxs(l.Fragment,{children:[l.jsx("div",{className:"date-picker-weekdays",children:QC.map(O=>l.jsx("div",{children:O},O))}),l.jsx("div",{className:"date-picker-grid",children:$.map((O,te)=>{if(O===null)return l.jsx("div",{},`empty-${te}`);const oe=new Date(B,Y,O),ue=f?Av(oe,f):!1,me=Av(oe,new Date);return l.jsx("button",{type:"button",className:["date-picker-day",ue?"date-picker-day-selected":"",me&&!ue?"date-picker-day-today":""].filter(Boolean).join(" "),onClick:()=>ce(O),children:O},`${B}-${Y}-${O}`)})})]}),g==="month"&&l.jsx("div",{className:"date-picker-month-grid",children:JC.map((O,te)=>{const oe=f&&f.getFullYear()===B&&f.getMonth()===te,ue=new Date().getFullYear()===B&&new Date().getMonth()===te;return l.jsx("button",{type:"button",className:["date-picker-month-item",oe?"date-picker-month-item-selected":"",ue&&!oe?"date-picker-month-item-current":""].filter(Boolean).join(" "),onClick:()=>L(te),children:O},O)})}),g==="year"&&l.jsx("div",{className:"date-picker-year-grid",children:_.map(O=>{const te=f&&f.getFullYear()===O,oe=new Date().getFullYear()===O;return l.jsx("button",{type:"button",className:["date-picker-year-item",te?"date-picker-year-item-selected":"",oe&&!te?"date-picker-year-item-current":""].filter(Boolean).join(" "),onClick:()=>se(O),children:O},O)})}),l.jsx("div",{className:"date-picker-footer",children:l.jsx("button",{type:"button",className:"date-picker-today-button",onClick:Q,children:u==="month"?"回到本月":"回到今天"})})]}):null;return l.jsxs(l.Fragment,{children:[l.jsxs("div",{ref:D,className:"date-picker",children:[s&&l.jsx("label",{id:`${h}-label`,className:"date-picker-label",children:s}),l.jsxs("button",{ref:k,type:"button",disabled:o,className:`date-picker-trigger ${m?"date-picker-trigger-open":""}`,onClick:()=>{o||p(O=>{const te=!O;return te&&v(u),te})},"aria-expanded":m,"aria-labelledby":s?`${h}-label ${h}-value`:void 0,"aria-label":s?void 0:u==="month"?"选择月份":"选择日期",children:[l.jsx("span",{id:`${h}-value`,className:f?"":"date-picker-placeholder",children:f?u==="month"?`${f.getFullYear()} / ${String(f.getMonth()+1).padStart(2,"0")}`:IC(f):u==="month"?"选择月份":"选择日期"}),l.jsx(zC,{className:"date-picker-calendar-icon",size:16,strokeWidth:1.7})]})]}),ae&&Yf.createPortal(ae,((T=D.current)==null?void 0:T.ownerDocument.body)||document.body)]})}const Qb=`/* Generated from tools/experiments/production_message/production_assistant_demo/src/index.css and App.css.\r
   Do not redesign this file; run npm run sync:production-message-demo after Demo changes. */\r
.production-message-demo, .production-message-demo :where(*:not(svg):not(svg *)) { all: revert; box-sizing: border-box; }\r
.production-message-demo svg, .production-message-demo svg * { box-sizing: border-box; }\r
.production-message-demo { line-height: normal; }\r
.production-message-demo, body:has(.production-message-demo) {\r
  font-family:\r
    "Inter Variable",\r
    "Noto Sans SC Variable",\r
    "Microsoft YaHei UI",\r
    "Segoe UI",\r
    sans-serif;\r
\r
  font-synthesis: none;\r
  text-rendering: optimizeLegibility;\r
\r
  color: #1c1917;\r
  background: #fafaf9;\r
}\r
\r
.production-message-demo {\r
  scrollbar-gutter: stable;\r
}\r
\r
.production-message-demo, .production-message-demo, .production-message-demo {\r
  width: 100%;\r
  min-width: 320px;\r
  min-height: 100%;\r
  margin: 0;\r
}\r
\r
.production-message-demo {\r
  min-height: 100vh;\r
\r
  background: #fafaf9;\r
\r
  -webkit-font-smoothing: antialiased;\r
  -moz-osx-font-smoothing: grayscale;\r
}\r
\r
.production-message-demo button, .production-message-demo input, .production-message-demo textarea, .production-message-demo select {\r
  font-family: inherit;\r
}\r
\r
.production-message-demo, body:has(.production-message-demo) {\r
  /* =======================================================\r
     LAYOUT\r
  ======================================================= */\r
\r
  --page-content-width:\r
    1050px;\r
\r
  --step-content-width:\r
    760px;\r
\r
\r
  /* =======================================================\r
     基础中性色\r
  ======================================================= */\r
\r
  --bg-page:\r
    #fafaf9;\r
\r
  --bg-card:\r
    #ffffff;\r
\r
  --border-subtle:\r
    #e7e5e4;\r
\r
  /*\r
   * 更轻的内部线。\r
   */\r
  --border-soft:\r
    #f0efed;\r
\r
  --text-primary:\r
    #292524;\r
\r
  --text-secondary:\r
    #78716c;\r
\r
\r
/* =======================================================\r
   品牌色\r
   仅用于：\r
   - 主按钮\r
   - 当前步骤\r
   - 已完成步骤\r
======================================================= */\r
\r
--brand: #C2703D;\r
--brand-hover: #A85C2E;\r
--brand-soft: #F5EBE3;\r
\r
\r
  /* =======================================================\r
     状态色\r
  ======================================================= */\r
\r
  --status-ok-text:\r
    #15803d;\r
\r
  --status-ok-bg:\r
    #f0fdf4;\r
\r
\r
  --status-info-text:\r
    #57534e;\r
\r
  --status-info-bg:\r
    #f5f5f4;\r
\r
\r
  --status-warn-text:\r
    #b91c1c;\r
\r
  --status-warn-bg:\r
    #fef2f2;\r
\r
\r
  /* =======================================================\r
     INPUT\r
  ======================================================= */\r
\r
  /*\r
   * 保留之前确定的输入框边框。\r
   */\r
  --input-border:\r
    rgb(215, 215, 214);\r
\r
  --input-border-hover:\r
    rgb(182, 182, 180);\r
\r
  --input-border-focus:\r
    rgb(160, 158, 156);\r
\r
  --input-bg:\r
    #fafaf9;\r
\r
\r
  /* =======================================================\r
     SIDEBAR\r
  ======================================================= */\r
\r
  --sidebar-bg:\r
    rgb(251, 251, 249);\r
\r
  --sidebar-hover:\r
    rgb(240, 239, 236);\r
\r
\r
  /* =======================================================\r
     RADIUS\r
  ======================================================= */\r
\r
  --radius-sm:\r
    14px;\r
\r
  --radius-md:\r
    17px;\r
\r
  --radius-lg:\r
    20px;\r
}\r
\r
\r
/* =========================================================\r
   BASE\r
========================================================= */\r
\r
.production-message-demo {\r
  min-height:\r
    100vh;\r
}\r
\r
\r
.production-message-demo * {\r
  box-sizing:\r
    border-box;\r
}\r
\r
\r
.production-message-demo button, .production-message-demo input, .production-message-demo textarea, .production-message-demo select {\r
  font:\r
    inherit;\r
}\r
\r
\r
.production-message-demo button {\r
  color:\r
    inherit;\r
}\r
\r
\r
/* =========================================================\r
   APP\r
========================================================= */\r
\r
.production-message-demo .app-shell {\r
  min-height:\r
    100vh;\r
\r
  display:\r
    flex;\r
\r
  background:\r
    var(--bg-page);\r
\r
  color:\r
    var(--text-primary);\r
}\r
\r
\r
/* =========================================================\r
   SIDEBAR\r
========================================================= */\r
\r
.production-message-demo .sidebar {\r
  width:\r
    222px;\r
\r
  min-width:\r
    222px;\r
\r
  min-height:\r
    100vh;\r
\r
  display:\r
    flex;\r
\r
  flex-direction:\r
    column;\r
\r
  background:\r
    var(--sidebar-bg);\r
\r
  border-right:\r
    1px solid\r
    var(--border-subtle);\r
}\r
\r
\r
.production-message-demo .sidebar-top {\r
  height:\r
    72px;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
}\r
\r
\r
.production-message-demo .sidebar-brand {\r
  padding:\r
    0 20px;\r
\r
  font-size:\r
    16px;\r
\r
  font-weight:\r
    560;\r
\r
  letter-spacing:\r
    -0.2px;\r
}\r
\r
\r
/* =========================================================\r
   SIDEBAR NAV\r
========================================================= */\r
\r
.production-message-demo .sidebar-nav {\r
  padding:\r
    8px;\r
}\r
\r
\r
.production-message-demo .sidebar-item {\r
  position:\r
    relative;\r
\r
  width:\r
    100%;\r
\r
  height:\r
    40px;\r
\r
  padding:\r
    0 10px;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  gap:\r
    11px;\r
\r
  border:\r
    none;\r
\r
  border-radius:\r
    7px;\r
\r
  background:\r
    transparent;\r
\r
  color:\r
    #44403c;\r
\r
  font-size:\r
    14px;\r
\r
  font-weight:\r
    440;\r
\r
  text-align:\r
    left;\r
\r
  cursor:\r
    pointer;\r
\r
  transition:\r
    background-color\r
      120ms ease,\r
    color\r
      120ms ease,\r
    transform\r
      100ms ease;\r
}\r
\r
\r
.production-message-demo .sidebar-item:hover {\r
  background:\r
    var(--sidebar-hover);\r
\r
  color:\r
    var(--text-primary);\r
}\r
\r
\r
.production-message-demo .sidebar-item:active {\r
  transform:\r
    scale(0.99);\r
}\r
\r
\r
.production-message-demo .sidebar-item-active {\r
  background:\r
    var(--sidebar-hover);\r
\r
  color:\r
    var(--text-primary);\r
\r
  font-weight:\r
    520;\r
}\r
\r
\r
.production-message-demo .sidebar-bottom {\r
  margin-top:\r
    auto;\r
\r
  padding:\r
    8px;\r
\r
  border-top:\r
    1px solid\r
    var(--border-subtle);\r
}\r
\r
\r
/* =========================================================\r
   NAV ICON\r
========================================================= */\r
\r
.production-message-demo .nav-icon {\r
  width:\r
    18px;\r
\r
  height:\r
    18px;\r
\r
  flex:\r
    none;\r
\r
  overflow:\r
    visible;\r
\r
  fill:\r
    none;\r
\r
  stroke:\r
    currentColor;\r
\r
  stroke-width:\r
    1.55;\r
\r
  stroke-linecap:\r
    round;\r
\r
  stroke-linejoin:\r
    round;\r
\r
  color:\r
    #57534e;\r
\r
  transition:\r
    color\r
      130ms ease,\r
    transform\r
      160ms ease;\r
}\r
\r
\r
.production-message-demo .sidebar-item:hover\r
.nav-icon {\r
  color:\r
    var(--text-primary);\r
}\r
\r
\r
/* =========================================================\r
   NAV ANIMATIONS\r
========================================================= */\r
\r
.production-message-demo .sidebar-item-active\r
.home-roof {\r
  animation:\r
    home-roof-enter\r
    320ms\r
    cubic-bezier(\r
      0.2,\r
      0.8,\r
      0.2,\r
      1\r
    );\r
}\r
\r
\r
.production-message-demo .sidebar-item-active\r
.home-door {\r
  animation:\r
    fade-rise\r
    280ms\r
    ease-out;\r
}\r
\r
\r
@keyframes\r
home-roof-enter {\r
  0% {\r
    transform:\r
      translateY(2px);\r
  }\r
\r
  65% {\r
    transform:\r
      translateY(-1px);\r
  }\r
\r
  100% {\r
    transform:\r
      translateY(0);\r
  }\r
}\r
\r
\r
.production-message-demo .sidebar-item-active\r
.folder-lid {\r
  animation:\r
    folder-open\r
    320ms\r
    ease-out;\r
}\r
\r
\r
@keyframes\r
folder-open {\r
  0% {\r
    transform:\r
      translateY(2px);\r
  }\r
\r
  60% {\r
    transform:\r
      translateY(-1px);\r
  }\r
\r
  100% {\r
    transform:\r
      translateY(0);\r
  }\r
}\r
\r
\r
.production-message-demo .daily-check {\r
  stroke-dasharray:\r
    10;\r
\r
  stroke-dashoffset:\r
    0;\r
}\r
\r
\r
.production-message-demo .sidebar-item-active\r
.daily-check {\r
  animation:\r
    check-draw\r
    360ms\r
    ease-out;\r
}\r
\r
\r
@keyframes\r
check-draw {\r
  from {\r
    stroke-dashoffset:\r
      10;\r
  }\r
\r
  to {\r
    stroke-dashoffset:\r
      0;\r
  }\r
}\r
\r
\r
.production-message-demo .sidebar-item-active\r
.inbox-arrow {\r
  animation:\r
    inbox-drop\r
    360ms\r
    cubic-bezier(\r
      0.2,\r
      0.8,\r
      0.2,\r
      1\r
    );\r
}\r
\r
\r
.production-message-demo .sidebar-item-active\r
.inbox-tray {\r
  animation:\r
    inbox-tray-enter\r
    300ms\r
    ease-out;\r
}\r
\r
\r
@keyframes\r
inbox-drop {\r
  0% {\r
    opacity:\r
      0;\r
\r
    transform:\r
      translateY(-4px);\r
  }\r
\r
  70% {\r
    opacity:\r
      1;\r
\r
    transform:\r
      translateY(1px);\r
  }\r
\r
  100% {\r
    transform:\r
      translateY(0);\r
  }\r
}\r
\r
\r
@keyframes\r
inbox-tray-enter {\r
  from {\r
    transform:\r
      scaleX(0.88);\r
  }\r
\r
  to {\r
    transform:\r
      scaleX(1);\r
  }\r
}\r
\r
\r
.production-message-demo .report-bar {\r
  transform-box:\r
    fill-box;\r
\r
  transform-origin:\r
    center bottom;\r
}\r
\r
\r
.production-message-demo .sidebar-item-active\r
.report-bar-one {\r
  animation:\r
    report-rise\r
    260ms\r
    ease-out;\r
}\r
\r
\r
.production-message-demo .sidebar-item-active\r
.report-bar-two {\r
  animation:\r
    report-rise\r
    330ms\r
    ease-out;\r
}\r
\r
\r
.production-message-demo .sidebar-item-active\r
.report-bar-three {\r
  animation:\r
    report-rise\r
    400ms\r
    ease-out;\r
}\r
\r
\r
@keyframes\r
report-rise {\r
  from {\r
    opacity:\r
      0.35;\r
\r
    transform:\r
      scaleY(0.2);\r
  }\r
\r
  to {\r
    opacity:\r
      1;\r
\r
    transform:\r
      scaleY(1);\r
  }\r
}\r
\r
\r
.production-message-demo .sidebar-item-active\r
.settings-ring {\r
  transform-origin:\r
    center;\r
\r
  animation:\r
    settings-turn\r
    380ms\r
    ease-out;\r
}\r
\r
\r
@keyframes\r
settings-turn {\r
  from {\r
    transform:\r
      rotate(-28deg);\r
  }\r
\r
  to {\r
    transform:\r
      rotate(0);\r
  }\r
}\r
\r
\r
/* =========================================================\r
   MAIN\r
========================================================= */\r
\r
.production-message-demo .main-content {\r
  flex:\r
    1;\r
\r
  width:\r
    0;\r
\r
  min-width:\r
    0;\r
\r
  background:\r
    var(--bg-page);\r
}\r
\r
\r
/* =========================================================\r
   PAGE TITLE\r
========================================================= */\r
\r
.production-message-demo .content-header {\r
  width:\r
    min(\r
      calc(100% - 80px),\r
      var(--page-content-width)\r
    );\r
\r
  margin:\r
    0 auto;\r
\r
  padding:\r
    42px 0 24px;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
}\r
\r
\r
.production-message-demo .content-header h1 {\r
  margin:\r
    0;\r
\r
  color:\r
    var(--text-primary);\r
\r
  font-size:\r
    26px;\r
\r
  font-weight:\r
    570;\r
\r
  letter-spacing:\r
    -0.55px;\r
}\r
\r
\r
.production-message-demo .content-header p {\r
  margin:\r
    8px 0 0;\r
\r
  color:\r
    var(--text-secondary);\r
\r
  font-size:\r
    13px;\r
\r
  font-weight:\r
    430;\r
}\r
\r
\r
/* =========================================================\r
   STEPPER\r
========================================================= */\r
\r
.production-message-demo .step-bar {\r
  width:\r
    min(\r
      calc(100% - 80px),\r
      var(--step-content-width)\r
    );\r
\r
  height:\r
    62px;\r
\r
  margin:\r
    0 auto 30px;\r
\r
  display:\r
    grid;\r
\r
  grid-template-columns:\r
    max-content\r
    minmax(70px, 1fr)\r
    max-content\r
    minmax(70px, 1fr)\r
    max-content;\r
\r
  column-gap:\r
    18px;\r
\r
  align-items:\r
    center;\r
}\r
\r
\r
.production-message-demo .step {\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  gap:\r
    10px;\r
\r
  color:\r
    var(--text-secondary);\r
\r
  font-size:\r
    14px;\r
\r
  font-weight:\r
    450;\r
\r
  white-space:\r
    nowrap;\r
}\r
\r
\r
.production-message-demo .step-active {\r
  color:\r
    var(--text-primary);\r
\r
  font-weight:\r
    550;\r
}\r
\r
\r
.production-message-demo .step-done {\r
  color:\r
    #57534e;\r
\r
  font-weight:\r
    500;\r
}\r
\r
\r
/* =========================================================\r
   STEP CIRCLE\r
========================================================= */\r
\r
.production-message-demo .step-circle {\r
  width:\r
    32px;\r
\r
  height:\r
    32px;\r
\r
  flex:\r
    none;\r
\r
  border-radius:\r
    50%;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    center;\r
\r
  font-size:\r
    14px;\r
\r
  font-weight:\r
    600;\r
\r
  transition:\r
    background-color\r
      180ms ease,\r
    border-color\r
      180ms ease,\r
    color\r
      180ms ease,\r
    box-shadow\r
      180ms ease,\r
    transform\r
      180ms ease;\r
}\r
\r
\r
/* 未开始 */\r
\r
.production-message-demo .step-circle.pending {\r
  border:\r
    1.5px solid\r
    #d6d3d1;\r
\r
  background:\r
    #ffffff;\r
\r
  color:\r
    #a8a29e;\r
}\r
\r
\r
/* 当前 */\r
\r
.production-message-demo .step-circle.active {\r
  border:\r
    1.5px solid\r
    var(--brand);\r
\r
  background:\r
    var(--brand);\r
\r
  color:\r
    #ffffff;\r
\r
box-shadow:\r
  0 0 0 4px\r
  rgba(\r
    194,\r
    112,\r
    61,\r
    0.12\r
  );\r
\r
  animation:\r
    step-active-enter\r
    260ms\r
    cubic-bezier(\r
      0.2,\r
      0.8,\r
      0.2,\r
      1\r
    );\r
}\r
\r
\r
@keyframes\r
step-active-enter {\r
  0% {\r
    transform:\r
      scale(0.88);\r
  }\r
\r
  70% {\r
    transform:\r
      scale(1.05);\r
  }\r
\r
  100% {\r
    transform:\r
      scale(1);\r
  }\r
}\r
\r
\r
/* 已完成 */\r
\r
.production-message-demo .step-circle.done {\r
  border:\r
    1.5px solid\r
    var(--brand);\r
\r
  background:\r
    var(--brand-soft);\r
\r
  color:\r
    var(--brand);\r
}\r
\r
\r
.production-message-demo .step-circle.done svg {\r
  width:\r
    17px;\r
\r
  height:\r
    17px;\r
\r
  fill:\r
    none;\r
\r
  stroke:\r
    currentColor;\r
\r
  stroke-width:\r
    1.8;\r
\r
  stroke-linecap:\r
    round;\r
\r
  stroke-linejoin:\r
    round;\r
\r
  stroke-dasharray:\r
    20;\r
\r
  animation:\r
    step-check-draw\r
    320ms\r
    ease-out;\r
}\r
\r
\r
@keyframes\r
step-check-draw {\r
  from {\r
    stroke-dashoffset:\r
      20;\r
  }\r
\r
  to {\r
    stroke-dashoffset:\r
      0;\r
  }\r
}\r
\r
\r
/* =========================================================\r
   STEP LINE\r
========================================================= */\r
\r
.production-message-demo .step-line {\r
  height:\r
    1px;\r
\r
  width:\r
    100%;\r
}\r
\r
\r
.production-message-demo .step-line.done {\r
  background:\r
    var(--brand);\r
}\r
\r
\r
.production-message-demo .step-line.pending {\r
  background:\r
    var(--border-subtle);\r
}\r
\r
\r
/*\r
 * 当前到未来。\r
 *\r
 * 左侧带一点品牌色，\r
 * 很快淡到浅灰。\r
 */\r
.production-message-demo .step-line.transition {\r
  background:\r
    linear-gradient(\r
      to right,\r
      var(--brand) 0%,\r
      rgba(\r
        234,\r
        88,\r
        12,\r
        0.34\r
      ) 18%,\r
      var(--border-subtle) 42%,\r
      var(--border-subtle) 100%\r
    );\r
}\r
\r
\r
/* =========================================================\r
   MAIN WORK PANEL\r
========================================================= */\r
\r
.production-message-demo .workspace-panel {\r
  width:\r
    min(\r
      calc(100% - 80px),\r
      var(--page-content-width)\r
    );\r
\r
  min-height:\r
    560px;\r
\r
  margin:\r
    0 auto 48px;\r
\r
  display:\r
    grid;\r
\r
  /*\r
   * 一个统一面板，\r
   * 左右只是两个 View。\r
   */\r
  grid-template-columns:\r
    400px\r
    minmax(0, 1fr);\r
\r
  background:\r
    var(--bg-card);\r
\r
  border:\r
    1px solid\r
    var(--border-subtle);\r
\r
border-radius:\r
  var(--radius-lg);\r
\r
  overflow:\r
    visible;\r
\r
\r
  /*\r
   * 整个静态大面板不加阴影。\r
   */\r
  box-shadow:\r
    none;\r
}\r
\r
\r
/* =========================================================\r
   LEFT\r
========================================================= */\r
\r
.production-message-demo .message-pane {\r
  min-width:\r
    0;\r
\r
  padding:\r
    28px 30px 36px;\r
\r
  /*\r
   * 只有这一条竖线。\r
   *\r
   * 使用非常浅的颜色，\r
   * 把两个 view 分开，\r
   * 而不是做成两个盒子。\r
   */\r
  border-right:\r
    1px solid\r
    var(--border-soft);\r
}\r
\r
\r
.production-message-demo .pane-title h2, .production-message-demo .review-header h2, .production-message-demo .review-empty h2 {\r
  margin:\r
    0;\r
\r
  color:\r
    var(--text-primary);\r
\r
  font-size:\r
    16px;\r
\r
  font-weight:\r
    560;\r
}\r
\r
\r
.production-message-demo .pane-title p {\r
  margin:\r
    8px 0 0;\r
\r
  color:\r
    var(--text-secondary);\r
\r
  font-size:\r
    13px;\r
\r
  line-height:\r
    1.6;\r
}\r
\r
\r
/* =========================================================\r
   MESSAGE\r
========================================================= */\r
\r
.production-message-demo .message-textarea {\r
  width:\r
    100%;\r
\r
  height:\r
    330px;\r
\r
  margin-top:\r
    22px;\r
\r
  padding:\r
    17px 18px;\r
\r
  resize:\r
    none;\r
\r
  outline:\r
    none;\r
\r
  border:\r
    1px solid\r
    var(--input-border);\r
\r
border-radius:\r
  var(--radius-sm);\r
\r
  background:\r
    var(--input-bg);\r
\r
  color:\r
    var(--text-primary);\r
\r
  font-size:\r
    15px;\r
\r
  font-weight:\r
    430;\r
\r
  line-height:\r
    1.8;\r
\r
\r
  /*\r
   * 静态输入区没有阴影。\r
   */\r
  box-shadow:\r
    none;\r
\r
  transition:\r
    border-color\r
      120ms ease,\r
    background-color\r
      120ms ease;\r
}\r
\r
\r
.production-message-demo .message-textarea:hover {\r
  border-color:\r
    var(--input-border-hover);\r
}\r
\r
\r
.production-message-demo .message-textarea:focus {\r
  background:\r
    var(--input-bg);\r
\r
  border-color:\r
    var(--input-border-hover);\r
\r
  box-shadow:\r
    none;\r
}\r
\r
\r
.production-message-demo .message-textarea::placeholder {\r
  color:\r
    #a8a29e;\r
}\r
\r
\r
.production-message-demo .parse-action {\r
  margin-top:\r
    20px;\r
\r
  display:\r
    flex;\r
\r
  justify-content:\r
    flex-end;\r
}\r
\r
\r
/* =========================================================\r
   PRIMARY BUTTON\r
========================================================= */\r
\r
.production-message-demo .primary-button {\r
  min-width:\r
    112px;\r
\r
  height:\r
    40px;\r
\r
  padding:\r
    0 18px;\r
\r
  display:\r
    inline-flex;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    center;\r
\r
  gap:\r
    8px;\r
\r
  border:\r
    1px solid\r
    var(--brand);\r
\r
border-radius:\r
  var(--radius-sm);\r
\r
  background:\r
    var(--brand);\r
\r
  color:\r
    #ffffff;\r
\r
  font-size:\r
    14px;\r
\r
  font-weight:\r
    550;\r
\r
  cursor:\r
    pointer;\r
\r
  box-shadow:\r
    none;\r
\r
  transition:\r
    background-color\r
      120ms ease,\r
    border-color\r
      120ms ease,\r
    box-shadow\r
      120ms ease,\r
    transform\r
      90ms ease,\r
    opacity\r
      120ms ease;\r
}\r
\r
\r
.production-message-demo .primary-button:hover:not(\r
  :disabled\r
) {\r
  background:\r
    var(--brand-hover);\r
\r
  border-color:\r
    var(--brand-hover);\r
\r
  box-shadow:\r
    0 1px 2px\r
    rgba(\r
      0,\r
      0,\r
      0,\r
      0.08\r
    );\r
}\r
\r
\r
.production-message-demo .primary-button:active:not(\r
  :disabled\r
) {\r
  transform:\r
    translateY(1px);\r
\r
  box-shadow:\r
    none;\r
}\r
\r
\r
.production-message-demo .primary-button:disabled {\r
  opacity:\r
    0.32;\r
\r
  cursor:\r
    not-allowed;\r
}\r
\r
\r
.production-message-demo .button-icon {\r
  width:\r
    16px;\r
\r
  height:\r
    16px;\r
\r
  fill:\r
    none;\r
\r
  stroke:\r
    currentColor;\r
\r
  stroke-width:\r
    1.7;\r
\r
  stroke-linecap:\r
    round;\r
\r
  stroke-linejoin:\r
    round;\r
}\r
\r
\r
.production-message-demo .refresh-icon {\r
  animation:\r
    refresh-enter\r
    360ms\r
    ease-out;\r
}\r
\r
\r
@keyframes\r
refresh-enter {\r
  from {\r
    transform:\r
      rotate(-90deg);\r
  }\r
\r
  to {\r
    transform:\r
      rotate(0);\r
  }\r
}\r
\r
\r
/* =========================================================\r
   RIGHT\r
========================================================= */\r
\r
.production-message-demo .review-pane {\r
  min-width:\r
    0;\r
\r
  padding:\r
    28px 30px 36px;\r
\r
  overflow:\r
    visible;\r
}\r
\r
\r
.production-message-demo .review-empty p {\r
  margin:\r
    12px 0 0;\r
\r
  color:\r
    var(--text-secondary);\r
\r
  font-size:\r
    13px;\r
}\r
\r
\r
/* =========================================================\r
   REVIEW HEADER\r
========================================================= */\r
\r
.production-message-demo .review-header {\r
  min-height:\r
    46px;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    flex-start;\r
\r
  justify-content:\r
    space-between;\r
\r
  gap:\r
    22px;\r
\r
  animation:\r
    content-enter\r
    220ms\r
    ease-out\r
    both;\r
}\r
\r
\r
.production-message-demo .review-summary {\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  gap:\r
    7px;\r
\r
  color:\r
    var(--text-secondary);\r
\r
  font-size:\r
    12px;\r
\r
  font-weight:\r
    430;\r
\r
  white-space:\r
    nowrap;\r
}\r
\r
\r
.production-message-demo .review-summary span {\r
  display:\r
    inline-flex;\r
\r
  align-items:\r
    baseline;\r
\r
  gap:\r
    4px;\r
}\r
\r
\r
.production-message-demo .review-summary strong {\r
  color:\r
    var(--text-primary);\r
\r
  font-weight:\r
    600;\r
\r
  font-variant-numeric:\r
    tabular-nums;\r
}\r
\r
\r
.production-message-demo .review-summary i {\r
  color:\r
    #d6d3d1;\r
\r
  font-style:\r
    normal;\r
}\r
\r
\r
/* =========================================================\r
   IDENTITY\r
========================================================= */\r
\r
.production-message-demo .identity-section {\r
  display:\r
    grid;\r
\r
  grid-template-columns:\r
    210px\r
    250px;\r
\r
  gap:\r
    24px;\r
\r
  padding:\r
    18px 0 20px;\r
\r
  animation:\r
    content-enter\r
    240ms\r
    30ms\r
    ease-out\r
    both;\r
}\r
\r
\r
.production-message-demo .identity-field label {\r
  display:\r
    block;\r
\r
  margin-bottom:\r
    8px;\r
\r
  color:\r
    var(--text-secondary);\r
\r
  font-size:\r
    13px;\r
\r
  font-weight:\r
    440;\r
}\r
\r
\r
/* =========================================================\r
   INPUTS\r
========================================================= */\r
\r
.production-message-demo .field-input {\r
  width:\r
    100%;\r
\r
  height:\r
    44px;\r
\r
  padding:\r
    0 14px;\r
\r
  outline:\r
    none;\r
\r
  border:\r
    1px solid\r
    var(--input-border);\r
\r
border-radius:\r
  var(--radius-sm);\r
\r
  background:\r
    var(--input-bg);\r
\r
  color:\r
    var(--text-primary);\r
\r
  font-size:\r
    14px;\r
\r
  font-weight:\r
    440;\r
\r
\r
  /*\r
   * 不使用阴影。\r
   */\r
  box-shadow:\r
    none;\r
\r
  transition:\r
    border-color\r
      120ms ease,\r
    background-color\r
      120ms ease;\r
\r
font-variant-numeric:\r
	tabular-nums;\r
}\r
\r
\r
.production-message-demo .field-input:hover {\r
  border-color:\r
    var(--input-border-hover);\r
}\r
\r
\r
.production-message-demo .field-input:focus {\r
  background:\r
    var(--input-bg);\r
\r
  border-color:\r
    var(--input-border-hover);\r
\r
  box-shadow:\r
    none;\r
}\r
\r
\r
/* =========================================================\r
   MATCH\r
========================================================= */\r
\r
.production-message-demo .match-status {\r
  min-height:\r
    42px;\r
\r
  padding-bottom:\r
    18px;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  gap:\r
    8px;\r
\r
  color:\r
    var(--text-secondary);\r
\r
  font-size:\r
    13px;\r
\r
  border-bottom:\r
    1px solid\r
    var(--border-soft);\r
\r
  animation:\r
    content-enter\r
    250ms\r
    50ms\r
    ease-out\r
    both;\r
}\r
\r
\r
.production-message-demo .match-check {\r
  width:\r
    18px;\r
\r
  height:\r
    18px;\r
\r
  flex:\r
    none;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    center;\r
\r
  color:\r
    var(--status-ok-text);\r
}\r
\r
\r
.production-message-demo .match-check svg {\r
  width:\r
    16px;\r
\r
  height:\r
    16px;\r
\r
  fill:\r
    none;\r
\r
  stroke:\r
    currentColor;\r
\r
  stroke-width:\r
    1.8;\r
\r
  stroke-linecap:\r
    round;\r
\r
  stroke-linejoin:\r
    round;\r
}\r
\r
\r
.production-message-demo .new-record-icon {\r
  width:\r
    18px;\r
\r
  height:\r
    18px;\r
\r
  flex:\r
    none;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    center;\r
\r
  color:\r
    var(--status-info-text);\r
\r
  font-size:\r
    16px;\r
}\r
\r
\r
.production-message-demo .status-loader {\r
  width:\r
    17px;\r
\r
  height:\r
    17px;\r
\r
  flex:\r
    none;\r
\r
  border:\r
    2px solid\r
    var(--border-subtle);\r
\r
  border-top-color:\r
    #78716c;\r
\r
  border-radius:\r
    50%;\r
\r
  animation:\r
    spinner\r
    650ms\r
    linear\r
    infinite;\r
}\r
\r
\r
@keyframes\r
spinner {\r
  to {\r
    transform:\r
      rotate(360deg);\r
  }\r
}\r
\r
\r
/* =========================================================\r
   DATA TITLE\r
========================================================= */\r
\r
.production-message-demo .data-title {\r
  padding:\r
    21px 0 13px;\r
\r
  color:\r
    var(--text-primary);\r
\r
  font-size:\r
    14px;\r
\r
  font-weight:\r
    560;\r
\r
  /*\r
   * 很浅。\r
   */\r
  border-bottom:\r
    1px solid\r
    var(--border-soft);\r
\r
  animation:\r
    content-enter\r
    260ms\r
    70ms\r
    ease-out\r
    both;\r
}\r
\r
\r
/* =========================================================\r
   FIELD TABLE\r
========================================================= */\r
\r
.production-message-demo .field-table {\r
  width:\r
    100%;\r
\r
  min-width:\r
    540px;\r
\r
  animation:\r
    content-enter\r
    280ms\r
    90ms\r
    ease-out\r
    both;\r
}\r
\r
\r
.production-message-demo .field-table-header, .production-message-demo .field-row {\r
  display:\r
    grid;\r
\r
  /*\r
   * 字段列不再按字符做奇怪的两端对齐。\r
   *\r
   * 直接给足够宽度，\r
   * 所有内容左对齐。\r
   */\r
  grid-template-columns:\r
    96px\r
    176px\r
    130px\r
    94px;\r
\r
  column-gap:\r
    24px;\r
\r
  align-items:\r
    center;\r
}\r
\r
\r
.production-message-demo .field-table-header {\r
  min-height:\r
    42px;\r
\r
  color:\r
    var(--text-secondary);\r
\r
  font-size:\r
    12px;\r
\r
  font-weight:\r
    520;\r
\r
  border-bottom:\r
    1px solid\r
    var(--border-soft);\r
}\r
\r
\r
.production-message-demo .field-row {\r
  min-height:\r
    62px;\r
\r
  border-bottom:\r
    1px solid\r
    var(--border-soft);\r
\r
  transition:\r
    background-color\r
      120ms ease;\r
}\r
\r
\r
.production-message-demo .field-row:hover {\r
  background:\r
    #fafaf9;\r
}\r
\r
\r
.production-message-demo .field-row-conflict {\r
  border-bottom:\r
    none;\r
}\r
\r
\r
/* =========================================================\r
   FIELD NAME\r
========================================================= */\r
\r
.production-message-demo .field-name {\r
  width:\r
    96px;\r
\r
  color:\r
    #44403c;\r
\r
  font-size:\r
    14px;\r
\r
  font-weight:\r
    440;\r
\r
  white-space:\r
    nowrap;\r
\r
  text-align:\r
    left;\r
}\r
\r
\r
/* =========================================================\r
   FIELD EDITOR\r
========================================================= */\r
\r
.production-message-demo .field-editor {\r
  width:\r
    140px;\r
}\r
\r
\r
.production-message-demo .compact-input {\r
  width:\r
    140px;\r
}\r
\r
\r
.production-message-demo .input-unit-wrap {\r
  position:\r
    relative;\r
\r
  width:\r
    140px;\r
}\r
\r
\r
.production-message-demo .input-unit-wrap\r
.field-input {\r
  padding-right:\r
    42px;\r
}\r
\r
\r
.production-message-demo .input-unit-wrap\r
span {\r
  position:\r
    absolute;\r
\r
  right:\r
    12px;\r
\r
  top:\r
    50%;\r
\r
  transform:\r
    translateY(-50%);\r
\r
  color:\r
    var(--text-secondary);\r
\r
  font-size:\r
    12px;\r
\r
  pointer-events:\r
    none;\r
}\r
\r
\r
/* =========================================================\r
   DATABASE VALUE\r
========================================================= */\r
\r
.production-message-demo .database-value {\r
  width:\r
    130px;\r
\r
  color:\r
    #57534e;\r
\r
  font-size:\r
    14px;\r
\r
  font-weight:\r
    440;\r
\r
  font-variant-numeric:\r
    tabular-nums;\r
\r
  white-space:\r
    nowrap;\r
}\r
\r
\r
/* =========================================================\r
   PILLS\r
========================================================= */\r
\r
.production-message-demo .pill {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  min-height: 24px;\r
  padding:\r
    2px 10px;\r
\r
  border:\r
    none;\r
\r
  border-radius:\r
    999px;\r
\r
  font-size:\r
    12px;\r
\r
  font-weight:\r
    500;\r
\r
  line-height:\r
    1.5;\r
\r
  white-space:\r
    nowrap;\r
}\r
\r
\r
.production-message-demo .pill-ok {\r
  color:\r
    var(--status-ok-text);\r
\r
  background:\r
    var(--status-ok-bg);\r
}\r
\r
\r
.production-message-demo .pill-info {\r
  color:\r
    var(--status-info-text);\r
\r
  background:\r
    var(--status-info-bg);\r
}\r
\r
\r
.production-message-demo .pill-warn {\r
  color:\r
    var(--status-warn-text);\r
\r
  background:\r
    var(--status-warn-bg);\r
}\r
\r
\r
/* =========================================================\r
   CONFLICT PANEL\r
========================================================= */\r
\r
.production-message-demo .conflict-panel {\r
  width:\r
    100%;\r
\r
  min-height:\r
    78px;\r
\r
  margin:\r
    4px 0 10px;\r
\r
  padding:\r
    15px 18px;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    space-between;\r
\r
  gap:\r
    20px;\r
\r
  border:\r
    1px solid\r
    #fecaca;\r
\r
  border-radius:\r
    8px;\r
\r
  background:\r
    var(--status-warn-bg);\r
\r
\r
  /*\r
   * 这是少数真正浮起来的东西。\r
   */\r
  box-shadow:\r
    0 1px 3px\r
    rgba(\r
      0,\r
      0,\r
      0,\r
      0.06\r
    ),\r
    0 1px 2px\r
    rgba(\r
      0,\r
      0,\r
      0,\r
      0.04\r
    );\r
\r
  animation:\r
    conflict-enter\r
    200ms\r
    ease-out\r
    both;\r
}\r
\r
\r
.production-message-demo .conflict-message {\r
  min-width:\r
    155px;\r
\r
  display:\r
    flex;\r
\r
  flex-direction:\r
    column;\r
\r
  gap:\r
    4px;\r
\r
  color:\r
    #7f1d1d;\r
\r
  font-size:\r
    12px;\r
}\r
\r
\r
.production-message-demo .conflict-message strong {\r
  color:\r
    var(--status-warn-text);\r
\r
  font-size:\r
    13px;\r
\r
  font-weight:\r
    600;\r
}\r
\r
\r
.production-message-demo .conflict-options {\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  gap:\r
    18px;\r
}\r
\r
\r
.production-message-demo .conflict-options label {\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  gap:\r
    6px;\r
\r
  color:\r
    #57534e;\r
\r
  font-size:\r
    12px;\r
\r
  white-space:\r
    nowrap;\r
\r
  cursor:\r
    pointer;\r
}\r
\r
\r
.production-message-demo .conflict-options strong {\r
  color:\r
    var(--text-primary);\r
\r
  font-weight:\r
    550;\r
}\r
\r
\r
.production-message-demo .conflict-options input {\r
  width:\r
    15px;\r
\r
  height:\r
    15px;\r
\r
  accent-color:\r
    var(--status-warn-text);\r
}\r
\r
\r
/* =========================================================\r
   REVIEW FOOTER\r
========================================================= */\r
\r
.production-message-demo .review-footer {\r
  min-height:\r
    82px;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    space-between;\r
\r
  gap:\r
    20px;\r
}\r
\r
\r
.production-message-demo .review-footer-text {\r
  color:\r
    var(--text-secondary);\r
\r
  font-size:\r
    13px;\r
}\r
\r
\r
.production-message-demo .confirm-button {\r
  min-width:\r
    118px;\r
}\r
\r
\r
/* =========================================================\r
   COMPLETE\r
========================================================= */\r
\r
.production-message-demo .complete-view {\r
  width:\r
    min(\r
      calc(100% - 80px),\r
      var(--page-content-width)\r
    );\r
\r
  min-height:\r
    520px;\r
\r
  margin:\r
    0 auto;\r
\r
  display:\r
    flex;\r
\r
  flex-direction:\r
    column;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    center;\r
\r
  background:\r
    var(--bg-card);\r
\r
  border:\r
    1px solid\r
    var(--border-subtle);\r
\r
border-radius:\r
  var(--radius-lg);\r
}\r
\r
\r
.production-message-demo .complete-icon {\r
  width:\r
    46px;\r
\r
  height:\r
    46px;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    center;\r
\r
  border:\r
    1.5px solid\r
    var(--brand);\r
\r
  border-radius:\r
    50%;\r
\r
  background:\r
    var(--brand-soft);\r
\r
  color:\r
    var(--brand);\r
}\r
\r
\r
.production-message-demo .complete-icon svg {\r
  width:\r
    23px;\r
\r
  height:\r
    23px;\r
\r
  fill:\r
    none;\r
\r
  stroke:\r
    currentColor;\r
\r
  stroke-width:\r
    1.8;\r
\r
  stroke-linecap:\r
    round;\r
\r
  stroke-linejoin:\r
    round;\r
}\r
\r
\r
.production-message-demo .complete-view h2 {\r
  margin:\r
    20px 0 0;\r
\r
  color:\r
    var(--text-primary);\r
\r
  font-size:\r
    20px;\r
\r
  font-weight:\r
    570;\r
}\r
\r
\r
.production-message-demo .complete-view p {\r
  margin:\r
    12px 0 30px;\r
\r
  color:\r
    var(--text-secondary);\r
\r
  font-size:\r
    14px;\r
}\r
\r
\r
/* =========================================================\r
   ANIMATIONS\r
========================================================= */\r
\r
@keyframes\r
content-enter {\r
  from {\r
    opacity:\r
      0;\r
\r
    transform:\r
      translateY(4px);\r
  }\r
\r
  to {\r
    opacity:\r
      1;\r
\r
    transform:\r
      translateY(0);\r
  }\r
}\r
\r
\r
@keyframes\r
conflict-enter {\r
  from {\r
    opacity:\r
      0;\r
\r
    transform:\r
      translateY(-3px);\r
  }\r
\r
  to {\r
    opacity:\r
      1;\r
\r
    transform:\r
      translateY(0);\r
  }\r
}\r
\r
\r
@keyframes\r
fade-rise {\r
  from {\r
    opacity:\r
      0;\r
\r
    transform:\r
      translateY(2px);\r
  }\r
\r
  to {\r
    opacity:\r
      1;\r
\r
    transform:\r
      translateY(0);\r
  }\r
}\r
\r
\r
/* =========================================================\r
   NUMBER INPUT\r
========================================================= */\r
\r
.production-message-demo input[type="number"] {\r
  appearance:\r
    textfield;\r
\r
  -moz-appearance:\r
    textfield;\r
}\r
\r
\r
.production-message-demo input[type="number"]::-webkit-outer-spin-button, .production-message-demo input[type="number"]::-webkit-inner-spin-button {\r
  -webkit-appearance: none;\r
	margin: 0;\r
}\r
\r
\r
/* =========================================================\r
   RESPONSIVE\r
========================================================= */\r
\r
@media (\r
  max-width: 1320px\r
) {\r
  .production-message-demo, body:has(.production-message-demo) {\r
    --page-content-width:\r
      960px;\r
  }\r
\r
\r
  .production-message-demo .sidebar {\r
    width:\r
      198px;\r
\r
    min-width:\r
      198px;\r
  }\r
\r
\r
  .production-message-demo .workspace-panel {\r
    grid-template-columns:\r
      360px\r
      minmax(\r
        0,\r
        1fr\r
      );\r
  }\r
\r
\r
  .production-message-demo .message-pane {\r
    padding:\r
      26px 26px 34px;\r
  }\r
\r
\r
  .production-message-demo .review-pane {\r
    padding:\r
      26px 26px 34px;\r
  }\r
\r
\r
  .production-message-demo .identity-section {\r
    grid-template-columns:\r
      195px\r
      230px;\r
\r
    gap:\r
      20px;\r
  }\r
\r
\r
  .production-message-demo .field-table-header, .production-message-demo .field-row {\r
    grid-template-columns:\r
      88px\r
      160px\r
      118px\r
      88px;\r
\r
    column-gap:\r
      20px;\r
  }\r
\r
 .production-message-demo .field-table-header > div:last-child {\r
	text-align: center;\r
}\r
\r
  .production-message-demo .field-name {\r
    width:\r
      88px;\r
  }\r
\r
\r
  .production-message-demo .field-editor, .production-message-demo .compact-input, .production-message-demo .input-unit-wrap {\r
    width:\r
      160px;\r
  }\r
\r
\r
  .production-message-demo .database-value {\r
    width:\r
      118px;\r
  }\r
\r
\r
  .production-message-demo .conflict-panel {\r
    flex-direction:\r
      column;\r
\r
    align-items:\r
      flex-start;\r
  }\r
}\r
\r
.production-message-demo .field-status {\r
	display: flex;\r
	justify-content: center;\r
}\r
\r
/* =========================================================\r
   SMALL WINDOW\r
========================================================= */\r
\r
@media (\r
  max-width: 1080px\r
) {\r
  .production-message-demo .content-header, .production-message-demo .workspace-panel, .production-message-demo .complete-view {\r
    width:\r
      calc(\r
        100% - 40px\r
      );\r
  }\r
\r
\r
  .production-message-demo .step-bar {\r
    width:\r
      min(\r
        calc(\r
          100% - 40px\r
        ),\r
        660px\r
      );\r
  }\r
\r
\r
  .production-message-demo .workspace-panel {\r
    grid-template-columns:\r
      330px\r
      minmax(\r
        520px,\r
        1fr\r
      );\r
  }\r
\r
\r
  .production-message-demo .main-content {\r
    overflow-x:\r
      auto;\r
  }\r
}\r
\r
\r
/* =========================================================\r
   REDUCED MOTION\r
========================================================= */\r
\r
@media (\r
  prefers-reduced-motion:\r
    reduce\r
) {\r
  .production-message-demo *, .production-message-demo *::before, .production-message-demo *::after {\r
    animation-duration:\r
      0.01ms !important;\r
\r
    animation-iteration-count:\r
      1 !important;\r
\r
    transition-duration:\r
      0.01ms !important;\r
  }\r
}\r
\r
\r
/* =========================================================\r
   DATE PICKER\r
========================================================= */\r
\r
body:has(.production-message-demo) .date-picker {\r
  position:\r
    relative;\r
\r
  width:\r
    100%;\r
}\r
\r
body:has(.production-message-demo) .date-picker-label {\r
  display:\r
    block;\r
\r
  margin-bottom:\r
    8px;\r
\r
  color:\r
    var(--text-secondary);\r
\r
  font-size:\r
    13px;\r
\r
  font-weight:\r
    440;\r
}\r
\r
\r
/* =========================================================\r
   TRIGGER\r
========================================================= */\r
\r
body:has(.production-message-demo) .date-picker-trigger {\r
  width:\r
    100%;\r
\r
  height:\r
    44px;\r
\r
  padding:\r
    0 14px;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    space-between;\r
\r
  gap:\r
    12px;\r
\r
  border:\r
    1px solid\r
    var(--input-border);\r
\r
border-radius:\r
  var(--radius-sm);\r
\r
  background:\r
    var(--input-bg);\r
\r
  color:\r
    var(--text-primary);\r
\r
  font-size:\r
    14px;\r
\r
  font-weight:\r
    440;\r
\r
  text-align:\r
    left;\r
\r
  cursor:\r
    pointer;\r
\r
  outline:\r
    none;\r
\r
  box-shadow:\r
    none;\r
\r
  transition:\r
    border-color\r
      120ms ease,\r
    background-color\r
      120ms ease,\r
    box-shadow\r
      120ms ease;\r
}\r
\r
body:has(.production-message-demo) .date-picker-trigger:hover {\r
  border-color:\r
    var(--input-border-hover);\r
}\r
\r
body:has(.production-message-demo) .date-picker-trigger-open {\r
  border-color:\r
    var(--input-border-hover);\r
\r
  background:\r
    var(--input-bg);\r
\r
  box-shadow:none;\r
   /* 0 0 0 3px\r
    rgba(\r
      194,\r
      112,\r
      61,\r
      0.08\r
    );*/\r
}\r
\r
body:has(.production-message-demo) .date-picker-placeholder {\r
  color:\r
    #a8a29e;\r
}\r
\r
body:has(.production-message-demo) .date-picker-calendar-icon {\r
  flex:\r
    none;\r
\r
  color:\r
    var(--text-secondary);\r
}\r
\r
\r
/* =========================================================\r
   PORTAL POPOVER\r
========================================================= */\r
\r
body:has(.production-message-demo) .date-picker-popover {\r
  position:\r
    fixed;\r
\r
  z-index:\r
    9999;\r
\r
  width:\r
    312px;\r
\r
  padding:\r
    18px;\r
\r
  border:\r
    1px solid\r
    var(--border-subtle);\r
\r
border-radius:\r
  var(--radius-lg);\r
\r
  background:\r
    #ffffff;\r
\r
  opacity:\r
    1;\r
\r
  transform:\r
    scale(1);\r
\r
  color:\r
    var(--text-primary);\r
\r
  box-shadow:\r
    0 8px 20px\r
      rgba(\r
        41,\r
        37,\r
        36,\r
        0.08\r
      ),\r
    0 2px 6px\r
      rgba(\r
        41,\r
        37,\r
        36,\r
        0.05\r
      );\r
\r
\r
\r
}\r
/* Chrome 139+ 增强圆角 */\r
@supports (corner-shape: squircle) {\r
  body:has(.production-message-demo) .date-picker-popover {\r
    corner-shape: squircle;\r
  }\r
}\r
/* 向下展开 */\r
body:has(.production-message-demo) .date-picker-popover-bottom {\r
\r
  transform-origin:\r
    top left;\r
\r
  animation:\r
    date-picker-enter-bottom\r
    140ms\r
    ease-out\r
    both;\r
\r
}\r
\r
\r
/* 向上展开 */\r
body:has(.production-message-demo) .date-picker-popover-top {\r
\r
  transform-origin:\r
    bottom left;\r
\r
  animation:\r
    date-picker-enter-top\r
    140ms\r
    ease-out\r
    both;\r
\r
}\r
\r
\r
\r
/* 从上方出现 */\r
\r
@keyframes date-picker-enter-bottom {\r
\r
  from {\r
\r
    opacity:\r
      0;\r
\r
    transform:\r
      translateY(-2px)\r
      scale(0.99);\r
\r
  }\r
\r
\r
  to {\r
\r
    opacity:\r
      1;\r
\r
    transform:\r
      translateY(0)\r
      scale(1);\r
\r
  }\r
\r
}\r
\r
\r
\r
/* 从下方出现 */\r
\r
@keyframes date-picker-enter-top {\r
\r
  from {\r
\r
    opacity:\r
      0;\r
\r
    transform:\r
      translateY(2px)\r
      scale(0.99);\r
\r
  }\r
\r
\r
  to {\r
\r
    opacity:\r
      1;\r
\r
    transform:\r
      translateY(0)\r
      scale(1);\r
\r
  }\r
\r
}\r
\r
/* =========================================================\r
   HEADER\r
========================================================= */\r
\r
body:has(.production-message-demo) .date-picker-header {\r
  height:\r
    36px;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    space-between;\r
\r
  margin-bottom:\r
    14px;\r
}\r
\r
body:has(.production-message-demo) .date-picker-title-button {\r
  padding:\r
    0 10px;\r
\r
  height:\r
    32px;\r
\r
  border:\r
    none;\r
\r
  border-radius:\r
    8px;\r
\r
  background:\r
    transparent;\r
\r
  color:\r
    var(--text-primary);\r
\r
  font-size:\r
    15px;\r
\r
  font-weight:\r
    600;\r
\r
  font-variant-numeric:\r
    tabular-nums;\r
\r
  cursor:\r
    pointer;\r
\r
  transition:\r
    background-color\r
      110ms ease,\r
    color\r
      110ms ease;\r
}\r
\r
body:has(.production-message-demo) .date-picker-title-button:hover {\r
  background:\r
    #f5f5f4;\r
}\r
\r
body:has(.production-message-demo) .date-picker-nav-button {\r
  width:\r
    30px;\r
\r
  height:\r
    30px;\r
\r
  padding:\r
    0;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    center;\r
\r
  border:\r
    none;\r
\r
  border-radius:\r
    7px;\r
\r
  background:\r
    transparent;\r
\r
  color:\r
    var(--text-secondary);\r
\r
  cursor:\r
    pointer;\r
\r
  transition:\r
    background-color\r
      110ms ease,\r
    color\r
      110ms ease,\r
    transform\r
      90ms ease;\r
}\r
\r
body:has(.production-message-demo) .date-picker-nav-button:hover {\r
  background:\r
    #f5f5f4;\r
\r
  color:\r
    var(--text-primary);\r
}\r
\r
body:has(.production-message-demo) .date-picker-nav-button:active {\r
  transform:\r
    scale(0.94);\r
}\r
\r
\r
/* =========================================================\r
   WEEKDAYS\r
========================================================= */\r
\r
body:has(.production-message-demo) .date-picker-weekdays {\r
  display:\r
    grid;\r
\r
  grid-template-columns:\r
    repeat(\r
      7,\r
      1fr\r
    );\r
\r
  margin-bottom:\r
    8px;\r
}\r
\r
body:has(.production-message-demo) .date-picker-weekdays div {\r
  height:\r
    30px;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    center;\r
\r
  color:\r
    var(--text-secondary);\r
\r
  font-size:\r
    12px;\r
\r
  font-weight:\r
    500;\r
}\r
\r
\r
/* =========================================================\r
   DAY GRID\r
========================================================= */\r
\r
body:has(.production-message-demo) .date-picker-grid {\r
  display:\r
    grid;\r
\r
  grid-template-columns:\r
    repeat(\r
      7,\r
      1fr\r
    );\r
\r
  gap:\r
    4px;\r
}\r
\r
body:has(.production-message-demo) .date-picker-day {\r
  width:\r
    36px;\r
\r
  height:\r
    36px;\r
\r
  padding:\r
    0;\r
\r
  justify-self:\r
    center;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    center;\r
\r
  border:\r
    1px solid\r
    transparent;\r
\r
  border-radius:\r
    10px;\r
\r
  background:\r
    transparent;\r
\r
  color:\r
    var(--text-primary);\r
\r
  font-size:\r
    13px;\r
\r
  font-weight:\r
    430;\r
\r
  font-variant-numeric:\r
    tabular-nums;\r
\r
  cursor:\r
    pointer;\r
\r
  transition:\r
    background-color\r
      100ms ease,\r
    border-color\r
      100ms ease,\r
    color\r
      100ms ease,\r
    transform\r
      80ms ease;\r
}\r
\r
body:has(.production-message-demo) .date-picker-day:hover {\r
  background:\r
    var(--brand-soft);\r
}\r
\r
body:has(.production-message-demo) .date-picker-day:active {\r
  transform:\r
    scale(0.93);\r
}\r
\r
body:has(.production-message-demo) .date-picker-day-today {\r
  border-color:\r
    var(--brand);\r
\r
  color:\r
    var(--brand);\r
\r
  font-weight:\r
    550;\r
}\r
\r
body:has(.production-message-demo) .date-picker-day-selected {\r
  border-color:\r
    var(--brand);\r
\r
  background:\r
    var(--brand);\r
\r
  color:\r
    #ffffff;\r
\r
  font-weight:\r
    600;\r
}\r
\r
body:has(.production-message-demo) .date-picker-day-selected:hover {\r
  background:\r
    var(--brand-hover);\r
\r
  border-color:\r
    var(--brand-hover);\r
}\r
\r
\r
/* =========================================================\r
   MONTH / YEAR GRID\r
========================================================= */\r
\r
body:has(.production-message-demo) .date-picker-month-grid, body:has(.production-message-demo) .date-picker-year-grid {\r
  display:\r
    grid;\r
\r
  grid-template-columns:\r
    repeat(\r
      3,\r
      1fr\r
    );\r
\r
  gap:\r
    8px;\r
\r
  padding:\r
    4px 0 6px;\r
}\r
\r
body:has(.production-message-demo) .date-picker-month-item, body:has(.production-message-demo) .date-picker-year-item {\r
  height:\r
    40px;\r
\r
  padding:\r
    0 10px;\r
\r
  display:\r
    flex;\r
\r
  align-items:\r
    center;\r
\r
  justify-content:\r
    center;\r
\r
  border:\r
    1px solid\r
    transparent;\r
\r
  border-radius:\r
    10px;\r
\r
  background:\r
    transparent;\r
\r
  color:\r
    var(--text-primary);\r
\r
  font-size:\r
    13px;\r
\r
  font-weight:\r
    500;\r
\r
  cursor:\r
    pointer;\r
\r
  transition:\r
    background-color\r
      100ms ease,\r
    border-color\r
      100ms ease,\r
    color\r
      100ms ease,\r
    transform\r
      80ms ease;\r
}\r
\r
body:has(.production-message-demo) .date-picker-month-item:hover, body:has(.production-message-demo) .date-picker-year-item:hover {\r
  background:\r
    var(--brand-soft);\r
}\r
\r
body:has(.production-message-demo) .date-picker-month-item:active, body:has(.production-message-demo) .date-picker-year-item:active {\r
  transform:\r
    scale(0.97);\r
}\r
\r
body:has(.production-message-demo) .date-picker-month-item-current, body:has(.production-message-demo) .date-picker-year-item-current {\r
  border-color:\r
    var(--brand);\r
\r
  color:\r
    var(--brand);\r
}\r
\r
body:has(.production-message-demo) .date-picker-month-item-selected, body:has(.production-message-demo) .date-picker-year-item-selected {\r
  border-color:\r
    var(--brand);\r
\r
  background:\r
    var(--brand);\r
\r
  color:\r
    #ffffff;\r
\r
  font-weight:\r
    600;\r
}\r
\r
body:has(.production-message-demo) .date-picker-month-item-selected:hover, body:has(.production-message-demo) .date-picker-year-item-selected:hover {\r
  background:\r
    var(--brand-hover);\r
\r
  border-color:\r
    var(--brand-hover);\r
}\r
\r
\r
/* =========================================================\r
   FOOTER\r
========================================================= */\r
\r
body:has(.production-message-demo) .date-picker-footer {\r
  margin-top:\r
    14px;\r
\r
  padding-top:\r
    12px;\r
\r
  border-top:\r
    1px solid\r
    var(--border-soft);\r
}\r
\r
body:has(.production-message-demo) .date-picker-today-button {\r
  height:\r
    30px;\r
\r
  padding:\r
    0 6px;\r
\r
  border:\r
    none;\r
\r
  border-radius:\r
    6px;\r
\r
  background:\r
    transparent;\r
\r
  color:\r
    var(--brand);\r
\r
  font-size:\r
    13px;\r
\r
  font-weight:\r
    550;\r
\r
  cursor:\r
    pointer;\r
\r
  transition:\r
    background-color\r
      100ms ease,\r
    color\r
      100ms ease;\r
}\r
\r
body:has(.production-message-demo) .date-picker-today-button:hover {\r
  background:\r
    var(--brand-soft);\r
\r
  color:\r
    var(--brand-hover);\r
}\r
\r
/* =========================================================\r
   SQUIRCLE CORNER ENHANCEMENT\r
   Chrome 139+\r
========================================================= */\r
\r
@supports (corner-shape: squircle) {\r
\r
  .production-message-demo button, .production-message-demo input, .production-message-demo textarea, .production-message-demo select, .production-message-demo .workspace-panel, .production-message-demo .complete-view, body:has(.production-message-demo) .date-picker-popover, body:has(.production-message-demo) .date-picker-trigger, .production-message-demo .field-input, .production-message-demo .message-textarea, .production-message-demo .primary-button, .production-message-demo .conflict-panel, .production-message-demo .sidebar-item, body:has(.production-message-demo) .date-picker-day, body:has(.production-message-demo) .date-picker-month-item, body:has(.production-message-demo) .date-picker-year-item, body:has(.production-message-demo) .date-picker-title-button, body:has(.production-message-demo) .date-picker-nav-button, body:has(.production-message-demo) .date-picker-today-button, .production-message-demo .pill {\r
    corner-shape: squircle;\r
  }\r
\r
}\r
`,Jb=`/* Shared controls: normal typography, neutral focus and unobtrusive scrollbars. */\r
* { scrollbar-width: thin; scrollbar-color: #d1d0cd transparent; }\r
*::-webkit-scrollbar { width: 6px; height: 6px; }\r
*::-webkit-scrollbar-thumb { background: #d1d0cd; border-radius: 6px; }\r
*::-webkit-scrollbar-track { background: transparent; margin-block: 10px; }\r
*::-webkit-scrollbar-button { display: none; width: 0; height: 0; }\r
*::-webkit-scrollbar-corner { background: transparent; }\r
button, input, select, textarea, button span, .picker-trigger > span, .choice-popover button.selected, .time-column button.selected { font-weight: 400 !important; }\r
button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible, [tabindex]:focus-visible { outline: 1px solid var(--text-muted); outline-offset: 2px; box-shadow: none; }\r
.daily-focus-card label, .progressive-field-picker label, .preview-action-group label { font-weight: 400; }\r
.daily-focus-card input, .daily-focus-card select { background: var(--surface); border-radius: var(--radius-control); corner-shape: squircle; }\r
.daily-focus-card input:focus, .daily-focus-card select:focus, .picker-trigger.open, .picker-trigger:focus-visible, .daily-focus-card .picker-trigger.open, .daily-focus-card .picker-trigger:focus-visible { border-color: var(--text-muted); box-shadow: none; outline: none; }\r
.picker-popover { border-radius: var(--radius-panel); corner-shape: squircle; box-shadow: 0 4px 14px #0000000a; }\r
.choice-popover button.selected, .choice-popover button:hover { background: var(--surface-muted); color: var(--text); }\r
.time-trigger svg, .time-done { color: var(--text-muted); }\r
.time-column button.selected, .time-popover .time-done { background: var(--surface-muted); color: var(--text); }\r
.report-editor .ProseMirror:focus, .report-editor .ProseMirror:focus-visible { outline: none; box-shadow: none; }\r
.report-editor:focus-within { border-color: var(--text-muted); box-shadow: none; }\r
.daily-workbench-detail .report-editor { overflow-y: auto; }\r
.daily-workbench .system-variable button { text-decoration: none; color: var(--text); }\r
.daily-runs-toggle { display: flex; align-items: center; gap: 8px; text-decoration: none; }\r
.daily-runs-toggle svg { width: 14px; height: 14px; }\r
.daily-runs-toggle[aria-expanded="true"] svg { transform: rotate(90deg); }\r
/* The title stays outside the scrolling body, including its scrollbar. */\r
.desktop-shell-content:has(.daily-workbench-detail) { overflow: hidden; }\r
.daily-workbench-detail.page { height: calc(100vh - 48px); min-height: 0; display: flex; flex-direction: column; padding-bottom: 0; }\r
.daily-workbench-detail > header { flex-shrink: 0; margin-bottom: 0; padding-bottom: 18px; }\r
.daily-detail-scroll { min-height: 0; overflow-y: auto; padding: 18px 12px 32px 0; margin-right: -12px; }\r
.daily-task-settings { height: auto; min-height: 0; padding: 28px; }\r
.daily-task-settings .daily-focus-card { min-height: 0; box-shadow: none; }\r
.daily-task-settings .daily-page, .daily-task-settings .daily-workbench { min-height: 0; }\r
.daily-task-settings .focus-form { display: grid; grid-template-columns: 1fr; gap: 20px; }\r
.daily-task-settings .primary { background: var(--text); color: var(--surface); border-color: var(--text); }\r
.daily-task-settings .focus-actions { margin: 24px 0; padding-top: 16px; border-top: 1px solid var(--border); }\r
.daily-task-settings .time-trigger > svg:first-child { color: var(--text-muted); }\r
.daily-task-settings .focus-form > label { margin: 0; }\r
.daily-task-settings .focus-form { row-gap: 16px; }\r
.daily-workbench .daily-split-workspace { overflow: visible; }\r
.daily-workbench .progressive-field-picker { border-radius: 0 var(--radius-panel) var(--radius-panel) 0; corner-shape: squircle; }\r
.daily-workbench-detail > header { display: flex; align-items: center; gap: 16px; }\r
.daily-title-line { display: flex; align-items: center; gap: 10px; min-width: 0; flex: 1; }\r
.daily-title-line .back-link { margin: 0; padding: 6px; flex-shrink: 0; }\r
.daily-workbench-detail .daily-title-line h1 { margin: 0; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 18px; }\r
.daily-workbench-detail .daily-title-line p { margin: 0; font-size: 12px; white-space: nowrap; flex-shrink: 0; }\r
.daily-workbench-detail > header > button { flex-shrink: 0; }\r
.daily-workbench .preview-action-group { gap: 8px; }\r
.preview-date-action { order: 1; width: 154px; }\r
.preview-action-group > .primary { order: 0; }\r
.preview-action-group > .secondary { order: 2; }\r
\r
.daily-workbench .preview-action-group > button { padding-inline: 8px; font-size: 13px; min-height: 40px; gap: 5px; }\r
.daily-workbench .preview-action-group > button svg { width: 14px; height: 14px; }\r
.preview-date-action { width: 140px; }\r
body:has(.production-message-demo) .preview-date-action .date-picker-trigger { min-height: 40px; height: 40px; padding-inline: 9px; font-size: 13px; }\r
.field-selection-stage { height: auto; overflow: visible; flex-shrink: 0; }\r
\r
.field-breadcrumbs { display: flex; align-items: center; gap: 4px; height: 40px; flex-wrap: nowrap; border-bottom: 1px solid var(--border); overflow: hidden; }\r
.field-breadcrumbs button { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding: 4px; border: 0; background: transparent; color: var(--text); }\r
.field-breadcrumbs svg { width: 12px; height: 12px; flex-shrink: 0; color: var(--text-muted); }\r
.field-drill-list { height: auto; max-height: 210px; overflow-y: auto; padding: 8px 0; margin-bottom: 14px; }\r
.field-drill-list p { color: var(--text-muted); font-size: 13px; margin: 0 0 8px; }\r
.field-drill-list > button { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 8px; text-align: left; border: 0; border-radius: var(--radius-control); corner-shape: squircle; background: transparent; color: var(--text); padding: 9px 10px; }\r
.field-drill-list > button:hover, .field-drill-list > button[aria-pressed="true"] { background: var(--surface-muted); }\r
.field-drill-list > button svg { width: 16px; height: 16px; flex-shrink: 0; }\r
.field-breadcrumbs .field-refresh { margin-left: auto; flex-shrink: 0; font-size: 12px; color: var(--text-muted); }\r
\r
.message-template-host {height:calc(100vh - 48px);min-height:0;}\r
.message-template-host iframe{width:100%;height:100%;border:0;display:block;}\r
.desktop-shell-content:has(.message-template-host){overflow:hidden;}\r
`,rN=`<!doctype html>\r
<html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>日报消息编辑器 · 交互 Demo</title>\r
<style>\r
:root{--font-ui:"Inter Variable","Noto Sans SC Variable",sans-serif}\r
@font-face{font-family:"Inter Variable";src:url('../../src/ProductionAssistant.App/Assets/Fonts/Inter.ttf')}@font-face{font-family:"Noto Sans SC Variable";src:url('../../src/ProductionAssistant.App/Assets/Fonts/NotoSansSC.ttf')}\r
*{box-sizing:border-box;scrollbar-width:thin;scrollbar-color:#d1d0cd transparent}body{margin:0;background:#fafaf9;color:#292524;font:14px var(--font-ui)}button,input,select{font:inherit;color:inherit}button{cursor:pointer;background:white;border:1px solid #deddd9;border-radius:14px;corner-shape:squircle;padding:9px 13px}button:hover{background:#f1f0ed}button:disabled{color:#a8a29e;background:#fafaf9;cursor:default}button:focus-visible,input:focus-visible,select:focus-visible{outline:1px solid #78716c;outline-offset:2px}small,.muted{color:#78716c}main{max-width:1420px;margin:auto;padding:30px 36px}header{display:flex;align-items:center;gap:14px;margin-bottom:24px}h1{font-size:20px;margin:0;font-weight:600;flex:1}header small{white-space:nowrap}h2{font-size:15px;font-weight:500;margin:0 0 10px}p{line-height:1.7}.work{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);border:1px solid #deddd9;border-radius:20px;corner-shape:squircle;background:white;overflow:hidden}.pane{padding:24px;min-width:0}.pane+ .pane{border-left:1px solid #e7e5e4}.pane-head{display:flex;align-items:center;justify-content:space-between;gap:10px;height:42px;margin-bottom:12px}.pane-head h2{margin:0}.editor{min-height:440px;height:calc(100vh - 310px);max-height:700px;overflow:auto;border:1px solid #deddd9;border-radius:14px;corner-shape:squircle;padding:20px;line-height:2.05;font-size:15px;white-space:pre-wrap;outline:none}.editor:focus{border-color:#78716c}.token{display:inline-block;white-space:nowrap;background:#f1f0ed;border-radius:10px;corner-shape:squircle;padding:0 7px;line-height:28px;cursor:pointer;vertical-align:baseline;font-size:14px}.token.bad{border-left:2px solid #c2703d}#preview{white-space:pre-wrap;line-height:2.05;font-size:15px;margin:12px 0;max-height:calc(100vh - 320px);overflow:auto}input,select{background:white;border:1px solid #deddd9;border-radius:12px;corner-shape:squircle;padding:8px;width:100%}input[type=date]{width:146px}footer{display:flex;justify-content:space-between;gap:12px;margin-top:16px;color:#78716c;font-size:12px}.popup{position:fixed;width:350px;max-width:calc(100vw - 24px);max-height:380px;overflow:auto;background:white;border:1px solid #deddd9;border-radius:18px;corner-shape:squircle;box-shadow:0 10px 30px #29252418;padding:10px;z-index:10}.popup h2{padding:8px;font-size:13px;color:#78716c}.popup button{display:flex;width:100%;justify-content:space-between;text-align:left;border:0;padding:10px;border-radius:12px;background:none}.popup button.active,.popup button[aria-pressed=true]{background:#f1f0ed}.popup small{padding-left:10px}.popup .custom{border-top:1px solid #e7e5e4;margin-top:6px}.hidden,[hidden]{display:none!important}dialog{width:430px;border:1px solid #deddd9;border-radius:20px;corner-shape:squircle;padding:24px;color:#292524}dialog::backdrop{background:#0005}dialog label{display:grid;gap:8px;margin:16px 0}dialog .actions{display:flex;justify-content:flex-end;gap:8px;margin-top:24px}.dark{background:#292524;color:white}.dark:hover{background:#44403c}.notice{border-left:2px solid #c2703d;padding:8px 12px;margin-top:14px}.empty{padding:50px;text-align:center;color:#78716c}.status{color:#78716c;font-size:12px}#demo-tools{display:flex;gap:12px;align-items:center;margin-top:20px;font-size:12px;color:#78716c}#demo-tools button{font-size:12px;padding:6px 10px}@media(max-width:800px){main{padding:18px}.work{grid-template-columns:1fr}.pane+.pane{border-left:0;border-top:1px solid #deddd9}header small{display:none}.editor{height:360px;min-height:300px}}\r
#settings-open{display:inline-flex;align-items:center;justify-content:center;padding:10px}#runs{margin-top:22px;border-top:1px solid #deddd9;padding-top:16px}#runs summary{cursor:pointer;padding:4px 0}#runs p{padding:8px 16px;margin:0}header h1{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}</style>\r
<main><header><span aria-hidden="true">←</span><h1>塔筒生产日报</h1><small id="saved">已保存</small><button id="save">保存</button><button id="settings-open" aria-label="任务设置" title="任务设置"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="m9 3 6 0 1 3 3 1 2 5-2 5-3 1-1 3H9l-1-3-3-1-2-5 2-5 3-1Z"/><circle cx="12" cy="12" r="3"/></svg></button></header>\r
<section id="message"><div class="work"><div class="pane"><div class="pane-head"><h2>消息内容</h2><small>输入 / 插入数据</small></div><div id="editor" class="editor" role="textbox" aria-label="消息内容" aria-multiline="true" contenteditable="true"></div></div><div class="pane"><div class="pane-head"><h2>最终预览</h2><input id="date" type="hidden" value="2026-09-06"><span id="date-picker"></span><button id="preview-generate" class="dark">生成预览</button></div><small class="status" id="preview-status">示例数据 · 仅演示交互</small><div id="preview"></div></div></div><footer><span>↑ ↓ 选择 · Enter 插入 · Esc 关闭</span></footer></section>\r
<details id="runs"><summary>运行记录</summary><p class="muted">暂无运行记录 · Demo 不执行发送任务</p></details>\r
<div id="demo-tools"><span>交互 Demo · 所有数值均为示例，不连接 Notion 或发送消息</span><button id="fail">模拟单个指标失败</button></div>\r
</main><div id="menu" class="popup" role="listbox" aria-label="插入数据" hidden></div><div id="quick" class="popup" role="dialog" aria-label="修改数据口径" hidden></div>\r
<dialog id="settings" aria-labelledby="settings-title"><h2 id="settings-title">任务设置</h2><label>任务名称<input id="task-name" value="塔筒生产日报"></label><label>每天发送时间<input id="send-time" type="time" value="17:30"></label><p class="muted">业务上下文：塔筒生产日报</p><div class="actions"><button id="settings-close">取消</button><button id="settings-save" class="dark">保存设置</button></div></dialog>\r
<dialog id="advanced"><h2>自定义数据</h2><p class="muted">保存后可通过 / 搜索复用。</p><label>指标<select id="metric"></select></label><label>统计口径<select id="scope"><option value="day">日（业务日当天）</option><option value="mtd">月累计（月初至业务日）</option><option value="ytd">年累计（年初至业务日）</option><option value="fullyear">全年</option></select></label><label>年份<select id="scope-year"><option value="0">今年</option><option value="-1">去年</option><option value="-2">前年</option></select></label><label>显示名称<input id="custom-name" placeholder="如：去年同期月焊接量"></label><div class="actions"><button id="cancel">取消</button><button id="create" class="dark">保存并插入</button></div></dialog>\r
<script>\r
const runtime=window.frameElement?.dailyRuntime;\r
const $=s=>document.querySelector(s),ed=$('#editor'),menu=$('#menu'),quick=$('#quick');\r
const metrics=runtime?.metrics || [['weld','焊接量','焊 焊量 weld',42.17],['cut','下料量','下料 切割 cut',48.36],['plate','板材入库','板 钢板',32.15],['section','型材入库','型材',15.62],['output','产出量','产量 套',4],['plan','焊接月计划','焊 月 计划',1160]];\r
const scopes=[['today','今日',1],['mtd','本月',5.608],['ytd','本年',83.437],['last','去年同期',78.2],['full','去年全年',103.4]];\r
const storagePrefix=runtime ? 'daily-slash-'+runtime.id : 'slash-demo';\r
let custom=runtime ? [] : JSON.parse(localStorage.getItem(storagePrefix+'-custom')||'[]'),recent=JSON.parse(localStorage.getItem(storagePrefix+'-recent')||'[]');\r
const defaults=runtime?.definitions || metrics.flatMap(m=>(m[0]==='plan'?[['month','本月',1]]:scopes).map(s=>({key:m[0]+'.'+s[0],metric:m[0],scope:s[0],label:m[0]==='plan'?m[1]:s[1]+m[1],keywords:m[2]+' '+s[1]})));\r
let index=0,results=[],slashRange=null,query='',target=null,insertion=null,failed=false,timer;\r
const dateChoices=[['year','业务年份','年'],['month','业务月份','月'],['day','业务日','日'],['date','完整业务日期','完整日期']].map(([key,label,words])=>({key:'system.'+key,metric:'date',scope:key,label,keywords:'业务日期 '+words}));\r
const definitions=()=>[...defaults,...custom,...dateChoices];\r
function value(d){if(runtime)return runtime.value(d);if(d.metric==='date')return $('#date').value;if(failed&&d.metric==='weld'&&d.scope==='today')return '⚠ 获取失败';const m=metrics.find(m=>m[0]===d.metric),day=Number($('#date').value.slice(-2))||1;let scale=scopes.find(s=>s[0]===d.scope)?.[2]||4.8;return (m[3]*(d.metric==='plan'?1:scale*(day/6))).toFixed(2)}\r
function pill(d){let el=document.createElement('span');el.className='token';el.contentEditable='false';el.dataset.key=d.key;el.textContent=d.label;el.tabIndex=0;el.setAttribute('role','button');return el}\r
function initial(){if(runtime){runtime.mount(ed,pill);$('h1').textContent=runtime.name;$('#task-name').value=runtime.name;$('#send-time').value=runtime.sendTime;$('#demo-tools').hidden=true;$('#preview-status').textContent='尚未生成预览';$('#preview').textContent='选择日期后，点击“生成预览”读取数据。';$('#date').value=runtime.businessDate;return}ed.append(document.createTextNode('塔筒生产日报\\n\\n日期：'),pill(definitions().at(-1)),document.createTextNode('\\n\\n今日焊接：'),pill(defaults[0]),document.createTextNode(' t\\n本月累计：'),pill(defaults[1]),document.createTextNode(' t\\n\\n今日下料：'),pill(defaults[5]),document.createTextNode(' t\\n\\n'))}initial();\r
let previewVersion=0;\r
async function preview(){if(runtime&&(!menu.hidden||ed.contentEditable==='false'))return;if(runtime){const version=++previewVersion;$('#preview-generate').disabled=true;$('#preview-status').textContent='正在读取数据…';try{const result=await runtime.preview(ed,$('#date').value);if(version!==previewVersion)return;$('#preview').textContent=result.text;$('#preview-status').textContent=result.message || '已更新';ed.querySelectorAll('.token').forEach(el=>{el.classList.toggle('bad',result.errors.some(error=>error.placeholder===el.dataset.key));el.title=result.errors.find(error=>error.placeholder===el.dataset.key)?.message||''});$('#saved').textContent='已保存'}catch(error){if(version===previewVersion){$('#preview-status').textContent=error.message;$('#saved').textContent='保存或预览失败'}}finally{$('#preview-generate').disabled=false}return}const copy=ed.cloneNode(true);copy.querySelectorAll('.token').forEach(el=>{let d=definitions().find(d=>d.key===el.dataset.key);el.replaceWith(document.createTextNode(d?value(d):'⚠ 无法识别'))});$('#preview').textContent=copy.innerText;ed.querySelectorAll('.token').forEach(el=>el.classList.toggle('bad',value(definitions().find(d=>d.key===el.dataset.key)).startsWith('⚠')));$('#saved').textContent='已保存'}\r
async function save(){if(!runtime)return preview();if(!menu.hidden||ed.contentEditable==='false')return;try{await runtime.save(ed);$('#saved').textContent='已保存'}catch(error){$('#saved').textContent='保存失败';$('#preview-status').textContent=error.message}}\r
function changed(){runtime?.dirty();previewVersion++;if(runtime)$('#preview-status').textContent='内容已修改，点击生成预览';$('#saved').textContent='保存中…';clearTimeout(timer);timer=setTimeout(save,350)}\r
function position(el,rect){el.hidden=false;const r=el.getBoundingClientRect();el.style.left=Math.max(12,Math.min(rect.left,innerWidth-r.width-12))+'px';el.style.top=Math.max(12,rect.bottom+r.height+8<innerHeight?rect.bottom+8:rect.top-r.height-8)+'px'}\r
function close(){menu.hidden=true;quick.hidden=true;slashRange=null}\r
function search(){const words=query.trim().toLowerCase().split(/\\s+/).filter(Boolean);results=definitions().filter(d=>words.every(w=>(d.label+' '+d.key+' '+d.keywords).toLowerCase().includes(w))).sort((a,b)=>{const ai=recent.indexOf(a.key),bi=recent.indexOf(b.key);return (ai<0?999:ai)-(bi<0?999:bi)}).slice(0,8);index=Math.min(index,results.length);menu.replaceChildren();let heading=document.createElement('h2');heading.textContent=query?'搜索：'+query:'最近使用 / 常用数据';menu.append(heading);results.forEach((d,i)=>{let b=document.createElement('button');b.setAttribute('role','option');b.setAttribute('aria-selected',i===index);b.className=i===index?'active':'';b.append(document.createTextNode(d.label));let v=document.createElement('small');v.textContent=value(d);b.append(v);b.onmousedown=e=>{e.preventDefault();insert(d)};menu.append(b)});let b=document.createElement('button');b.className='custom '+(index===results.length?'active':'');b.textContent='创建自定义数据…';b.onmousedown=e=>{e.preventDefault();openAdvanced()};menu.append(b);const rect=slashRange?.getBoundingClientRect()||ed.getBoundingClientRect();position(menu,rect)}\r
function detect(){let sel=getSelection();if(!sel.isCollapsed||!ed.contains(sel.anchorNode))return close();let n=sel.anchorNode;if(n.nodeType!==3)return close();let before=n.textContent.slice(0,sel.anchorOffset),match=before.match(/\\/([^/\\n]*)$/);if(!match)return close();slashRange=document.createRange();slashRange.setStart(n,sel.anchorOffset-match[0].length);slashRange.setEnd(n,sel.anchorOffset);query=match[1];target=null;insertion=null;index=0;search()}\r
async function insert(d){const range=(slashRange||insertion)?.cloneRange();if(!range)return;menu.hidden=true;ed.contentEditable='false';try{if(runtime)d=await runtime.materialize(d);}catch(error){$('#preview-status').textContent=error.message;return}finally{ed.contentEditable='true'}range.deleteContents();const el=pill(d);range.insertNode(el);range.setStartAfter(el);range.collapse(true);getSelection().removeAllRanges();getSelection().addRange(range);ed.focus();recent=[d.key,...recent.filter(k=>k!==d.key)].slice(0,8);localStorage.setItem(storagePrefix+'-recent',JSON.stringify(recent));close();changed()}\r
ed.addEventListener('input',e=>{changed();if(!e.isComposing)detect()});ed.addEventListener('compositionend',detect);\r
ed.addEventListener('paste',e=>{e.preventDefault();document.execCommand('insertText',false,e.clipboardData.getData('text/plain'))});\r
ed.addEventListener('keydown',e=>{if(e.isComposing)return;if(!menu.hidden){if(['ArrowDown','ArrowUp','Enter','Escape'].includes(e.key)){e.preventDefault();if(e.key==='Escape'){close();changed();return;}if(e.key==='Enter')return index===results.length?openAdvanced():insert(results[index]);index=(index+(e.key==='ArrowDown'?1:-1)+results.length+1)%(results.length+1);search();return}}if(e.target.classList.contains('token')&&['Backspace','Delete'].includes(e.key)){e.preventDefault();e.target.remove();changed()}});\r
function editToken(el){target=el;insertion=null;let d=definitions().find(d=>d.key===el.dataset.key);if(!d&&el.dataset.key.startsWith('today('))d={metric:'date',label:'业务日期'};if(!d)return;quick.replaceChildren();let title=document.createElement('h2');title.textContent=d.label+(value(d)?' · '+(runtime?'当前值 ':'示例值 ')+value(d):'');quick.append(title);if(d.metric==='date'){title.textContent='业务日期 · 选择显示粒度';dateChoices.forEach(choice=>{const b=document.createElement('button');b.textContent=choice.label;b.onclick=()=>{el.replaceWith(pill(choice));close();changed()};quick.append(b)});position(quick,el.getBoundingClientRect());return}const choices=defaults.filter(x=>x.metric===d.metric);choices.forEach(x=>{let b=document.createElement('button');b.textContent=x.label+(x.key===d.key?' ✓':'');b.setAttribute('aria-pressed',x.key===d.key);b.onclick=async()=>{try{b.disabled=true;const next=runtime?await runtime.materialize(x):x;el.replaceWith(pill(next));close();changed()}catch(error){title.textContent=error.message;b.disabled=false}};quick.append(b)});let b=document.createElement('button');b.textContent='高级设置…';b.onclick=()=>openAdvanced(d);quick.append(b);position(quick,el.getBoundingClientRect())}\r
ed.onclick=e=>{let el=e.target.closest('.token');if(el)editToken(el)};ed.addEventListener('keydown',e=>{if(e.target.classList.contains('token')&&e.key==='Enter'){e.preventDefault();editToken(e.target)}});\r
function openAdvanced(d){insertion=d?null:slashRange?.cloneRange();menu.hidden=true;quick.hidden=true;$('#metric').replaceChildren(...metrics.map(m=>new Option(m[1],m[0])));$('#metric').value=d?.metric||metrics[0]?.[0]||'';$('#custom-name').value='';runtime?.configureAdvanced($('#metric').value,$('#scope'));$('#advanced').showModal()}\r
$('#metric').onchange=()=>runtime?.configureAdvanced($('#metric').value,$('#scope'));\r
$('#cancel').onclick=()=>$('#advanced').close();$('#create').onclick=async()=>{let name=$('#custom-name').value.trim();if(!name){$('#custom-name').focus();return}let d={key:'custom.'+Date.now(),metric:$('#metric').value,scope:runtime?runtime.resolveAdvanced($('#scope').value,$('#scope-year').value):$('#scope').value,label:name,keywords:name};if(runtime){try{d=await runtime.materialize(d)}catch(error){$('#preview-status').textContent=error.message;return}}else{custom.push(d);localStorage.setItem(storagePrefix+'-custom',JSON.stringify(custom))}$('#advanced').close();if(target&&!insertion){target.replaceWith(pill(d));target=null;changed()}else insert(d)};\r
$('#date').onchange=()=>{if(!runtime)return preview();runtime.dirty();previewVersion++;$('#preview-status').textContent='日期已修改，点击生成预览'};$('#preview-generate').onclick=preview;$('#save').onclick=save;$('#fail').onclick=()=>{failed=!failed;$('#fail').textContent=failed?'恢复示例数据':'模拟单个指标失败';preview()};document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});document.addEventListener('mousedown',e=>{if(!e.target.closest('.popup')&&!e.target.closest('.token')&&!e.target.closest('#editor'))close()});$('#settings-open').onclick=()=>{close();$('#task-name').value=$('h1').textContent;$('#settings').showModal()};$('#settings-close').onclick=()=>$('#settings').close();$('#settings-save').onclick=async()=>{const name=$('#task-name').value.trim();if(!name){$('#task-name').focus();return}if(runtime){try{await runtime.saveBasics(name,$('#send-time').value)}catch(error){$('#preview-status').textContent=error.message;return}}$('h1').textContent=name;$('#settings').close()};if(runtime)runtime.connect(document);else preview();\r
<\/script></html>\r
`,Wb=""+new URL("Inter-VF2RPR_K.ttf",import.meta.url).href,Ib=""+new URL("NotoSansSC-Dz1u1FRy.ttf",import.meta.url).href,Fi=new Map;function aN(n,a,s=!1){const o=JSON.stringify([n,a]),u=`daily-field-cache-v1:${o}`;let h=s?void 0:Fi.get(o);if(!h&&!s)try{const f=JSON.parse(localStorage.getItem(u)||"null");f&&Array.isArray(f.metrics)&&f.metrics.every(m=>m&&typeof m.id=="string"&&typeof m.name=="string")&&(h=Promise.resolve(f),Fi.set(o,h))}catch{}return h||(h=ye("daily.getProperties",{id:n,sourceId:a}).then(f=>{try{localStorage.setItem(u,JSON.stringify(f))}catch{}return f}).catch(f=>{throw Fi.delete(o),f}),Fi.set(o,h)),h}function iN(n=!1){if(Fi.clear(),n)try{Object.keys(localStorage).filter(a=>a.startsWith("daily-field-cache-v1:")).forEach(a=>localStorage.removeItem(a))}catch{}}const _o=[0,-1,-2].flatMap(n=>[{granularity:"day",key:n===0?"today":`day${n}`,label:n===0?"今日":`${n===-1?"去年":"前年"}同日`},{granularity:"mtd",key:n===0?"mtd":n===-1?"lastmonth":"mtd-2",label:n===0?"本月累计":`${n===-1?"去年":"前年"}同期月累计`},{granularity:"ytd",key:n===0?"ytd":n===-1?"last":"ytd-2",label:n===0?"本年累计":`${n===-1?"去年":"前年"}同期`},{granularity:"fullyear",key:n===0?"fullyear":n===-1?"full":"full-2",label:`${n===0?"今年":n===-1?"去年":"前年"}全年`}].map(a=>({key:a.key,label:a.label,spec:{granularity:a.granularity,yearOffset:n}}))),e0={"system.date":'today("yyyy年M月d日")',"system.year":'today("yyyy年")',"system.month":'today("M月")',"system.day":'today("d日")'};function sN(n){return e0[n]||n}function Mv(n){const a=[[]];function s(u){u.replace(/\u00a0/g," ").split(`
`).forEach((h,f)=>{var p;if(f&&a.push([]),!h)return;const m=a.at(-1);((p=m.at(-1))==null?void 0:p.type)==="text"?m.at(-1).text+=h:m.push({type:"text",text:h})})}function o(u){var h;if(u.nodeType===3){s(u.textContent||"");return}if(u instanceof n.ownerDocument.defaultView.HTMLElement){if(u.dataset.key){const f=sN(u.dataset.key);a.at(-1).push({type:f.startsWith("today(")?"dateToken":"fieldToken",attrs:{placeholder:f,label:u.textContent||"",...u.dataset.legacySpec?{dateRangeSpec:JSON.parse(u.dataset.legacySpec)}:{}}});return}if(u.tagName==="BR"){s(`
`);return}u!==n&&["DIV","P"].includes(u.tagName)&&u.childNodes.length===1&&((h=u.firstChild)==null?void 0:h.nodeName)==="BR"||Array.from(u.childNodes).forEach((f,m)=>{m&&f.nodeType===1&&["DIV","P"].includes(f.tagName)&&s(`
`),o(f)})}}return o(n),{text:a.map(u=>u.map(h=>h.type==="text"?h.text:h.attrs.placeholder).join("")).join(`
`),document:JSON.stringify({type:"doc",content:a.map(u=>({type:"paragraph",content:u}))})}}function oN(n,a,s,o){const u=[...s,...Object.entries(e0).map(([f,m])=>({key:m,label:f==="system.date"?"业务日期":f==="system.year"?"业务年份":f==="system.month"?"业务月份":"业务日",metric:"date",scope:"date",keywords:"",field:void 0}))].filter(f=>f.field||f.metric==="date").sort((f,m)=>m.key.length-f.key.length);let h=a;for(;h;){const f=u.map(m=>({d:m,index:h.indexOf(m.key)})).filter(m=>m.index>=0).sort((m,p)=>m.index-p.index)[0];if(!f){n.append(n.ownerDocument.createTextNode(h));break}f.index&&n.append(n.ownerDocument.createTextNode(h.slice(0,f.index))),n.append(o(f.d)),h=h.slice(f.index+f.d.key.length)}}function lN(n,a,s,o){if(!a)return!1;let u;try{u=JSON.parse(a)}catch{return!1}if(u.type!=="doc")return!1;function h(f){var m,p,g,v;if(f.type==="text"){n.append(n.ownerDocument.createTextNode(f.text||""));return}if(f.type==="hardBreak"){n.append(n.ownerDocument.createTextNode(`
`));return}if(f.type==="fieldToken"||f.type==="dateToken"){const x=((m=f.attrs)==null?void 0:m.placeholder)||"";let b=s.find(j=>j.key===x);b||(b={key:x,label:f.type==="dateToken"?"业务日期":((p=f.attrs)==null?void 0:p.label)||"已有数据",metric:f.type==="dateToken"?"date":"legacy",scope:"legacy",keywords:((g=f.attrs)==null?void 0:g.label)||""},s.push(b));const E=o(b);(v=f.attrs)!=null&&v.dateRangeSpec&&(E.dataset.legacySpec=JSON.stringify(f.attrs.dateRangeSpec)),n.append(E);return}(f.content||[]).forEach((x,b)=>{f.type==="doc"&&b&&n.append(n.ownerDocument.createTextNode(`
`)),h(x)})}return h(u),!0}function t0({id:n,back:a,changed:s,openSettings:o}){const u=S.useRef(null),[h,f]=S.useState("");return S.useEffect(()=>{let m=!1;const p=u.current;return ye("daily.get",{id:n}).then(g=>{if(m)return;const v=cN(g,{back:a,changed:s,openSettings:o});p.dailyRuntime=v,p.srcdoc=rN.replace("../../src/ProductionAssistant.App/Assets/Fonts/Inter.ttf",new URL(Wb,window.location.href).href).replace("../../src/ProductionAssistant.App/Assets/Fonts/NotoSansSC.ttf",new URL(Ib,window.location.href).href)}).catch(g=>{m||f(String(g.message||g))}),()=>{var g;m=!0,(g=p.dailyRuntime)==null||g.dispose()}},[n]),l.jsxs("div",{className:"message-template-host",children:[h&&l.jsx("p",{role:"alert",children:h}),l.jsx("iframe",{ref:u,title:"日报消息模板"})]})}function cN(n,a){var Y;let s=!1,o=!1,u,h,f=Promise.resolve(),m=0,p;const g=new Date,v=n.fields.map(A=>{var q,U,_;return{key:A.placeholder,label:A.label.replace(" · ",""),metric:`${A.databaseId||((q=A.binding)==null?void 0:q.dataSourceId)}:${A.businessId||((U=A.binding)==null?void 0:U.businessMetricId)}`,scope:((_=_o.find($=>JSON.stringify($.spec)===JSON.stringify(A.dateRangeSpec)))==null?void 0:_.key)||"legacy",keywords:A.label,field:A}}),x=[];let b=(Y=n.metricSourceIds)!=null&&Y.length?n.metricSourceIds:[...new Set(n.fields.map(A=>{var q;return A.databaseId||((q=A.binding)==null?void 0:q.dataSourceId)}).filter(Boolean))];const E=new Map(n.fields.map(A=>[A.placeholder,A])),j=new Map;function N(A){const q=h==null?void 0:h.querySelector("#preview-status");q&&(q.textContent=A)}function C(){h==null||h.querySelectorAll("[data-send]").forEach(A=>A.disabled=o||!n.notificationConfigured)}async function k(A){A.text===n.draftTemplate&&A.document===n.draftTemplateDocument||(await ye("daily.saveTemplate",{id:R,...A}),n.draftTemplate=A.text,n.draftTemplateDocument=A.document)}async function D(){var A;try{const q=await ye("daily.get",{id:R});if(s)return;n.notificationConfigured=q.notificationConfigured,n.sources=q.sources,C(),(A=h==null?void 0:h.querySelector("[data-notification-notice]"))==null||A.toggleAttribute("hidden",!!n.notificationConfigured),await V()}catch(q){N(String(q))}}async function V(){var q;const A=await Promise.allSettled(b.map(async U=>({sourceId:U,metrics:(await aN(R,U)).metrics})));if(!s){v.splice(0,v.length,...v.filter(U=>U.field)),x.length=0;for(const U of A)if(U.status==="fulfilled")for(const _ of U.value.metrics){const $=`${U.value.sourceId}:${_.id}`;x.push([$,_.name,_.name,0]);const W=_.granularity==="monthly"?[{key:"month",label:"本月"}]:_o;for(const le of W)v.push({key:`${$}:${le.key}`,metric:$,scope:le.key,label:_.granularity==="monthly"?_.name:le.label+_.name,keywords:_.name+" "+le.label+" "+(((q=n.sources.find(Z=>Z.id===U.value.sourceId))==null?void 0:q.name)||""),sourceId:U.value.sourceId,metricId:_.id});for(const le of v.filter(Z=>Z.metric===$&&Z.field))le.sourceId=U.value.sourceId,le.metricId=_.id}A.some(U=>U.status==="rejected")?N("部分指标目录读取失败，请到系统设置刷新数据库。"):b.length||N("请在右上角任务设置中配置本任务的指标范围。")}}const R=n.id,B={dirty(){m++,p=void 0},id:R,name:n.name,sendTime:n.sendTime,businessDate:`${g.getFullYear()}-${String(g.getMonth()+1).padStart(2,"0")}-${String(g.getDate()).padStart(2,"0")}`,definitions:v,metrics:x,value:A=>{var q,U,_;return A.metric==="date"?"业务日期":((q=p==null?void 0:p.fieldValues)==null?void 0:q[A.key])||((_=p==null?void 0:p.fieldValues)==null?void 0:_[((U=v.find($=>$.field&&$.metric===A.metric&&$.scope===A.scope))==null?void 0:U.key)||""])||""},mount:(A,q)=>{lN(A,n.draftTemplateDocument,v,q)||oN(A,n.draftTemplate,v,q)},async materialize(A){var le;if(A.field||A.metric==="date")return A;const q=v.find(Z=>Z.metric===A.metric&&Z.sourceId),U=A.sourceId||(q==null?void 0:q.sourceId),_=A.metricId||(q==null?void 0:q.metricId);if(!U||!_)throw new Error("此字段缺少可用的指标定义，请在任务设置中刷新指标。");const $=JSON.stringify([U,_,A.scope,A.label]);let W=j.get($);return W||(W=ye("daily.addField",{id:R,sourceId:U,metricId:_,placeholder:"",displayName:A.label,...A.scope==="month"?{rangeKind:"current-month"}:{dateRangeSpec:(le=_o.find(Z=>Z.key===A.scope))==null?void 0:le.spec}}).then(({field:Z})=>{E.set(Z.placeholder,Z);const ce={...A,key:Z.placeholder,field:Z,sourceId:U,metricId:_};return v.some(L=>L.key===ce.key)||v.push(ce),a.changed(),ce}).catch(Z=>{throw j.delete($),Z}),j.set($,W)),W},save(A){const q=Mv(A),U=f.catch(()=>{}).then(()=>s?void 0:k(q));return f=U,U},preview(A,q){const U=Mv(A),_=++m,$=f.catch(()=>{}).then(async()=>{if(s||_!==m)return{succeeded:!1,text:"",message:"内容已修改，请重新生成预览",errors:[]};await k(U);const W=await ye("daily.preview",{id:R,businessDate:q},12e4),le={...W,errors:W.fieldErrors||[],message:W.succeeded?"已生成 · "+q:W.message};return _===m&&!s&&(p=le),le});return f=$,$},async send(A,q,U){if(!o){if(!n.notificationConfigured)throw new Error("请先在系统设置中配置通知渠道。");o=!0,C();try{await B.save(A);const _=await ye(q==="test"?"daily.test":"daily.sendToday",q==="test"?{id:R,businessDate:U}:{id:R},12e4);if(!_.succeeded)throw new Error(_.message||"发送失败，请查看运行记录");N(_.alreadySent?"今日当前内容已发送":q==="test"?"测试发送成功":"今日消息已发送"),a.changed()}finally{o=!1,C()}}},configureAdvanced(A,q){const U=v.some(W=>W.metric===A&&W.scope==="month"),_=U?[{key:"month",label:"本月计划"}]:[{key:"day",label:"日（业务日当天）"},{key:"mtd",label:"月累计（月初至业务日）"},{key:"ytd",label:"年累计（年初至业务日）"},{key:"fullyear",label:"全年"}];q.replaceChildren(..._.map(W=>new Option(W.label,W.key)));const $=q.ownerDocument.querySelector("#scope-year");$&&($.disabled=U,$.value="0")},resolveAdvanced(A,q){return A==="month"?"month":_o.find(U=>U.spec.granularity===A&&U.spec.yearOffset===Number(q)).key},async saveBasics(A,q){const U=Array.from((h==null?void 0:h.querySelectorAll("[data-context-source]:checked"))||[]).map(_=>_.value);await ye("daily.saveBasics",{id:R,name:A,sendTime:q,metricSourceIds:U}),n.name=A,n.sendTime=q,b=U,B.name=A,await V(),a.changed()},connect(A){var Q;h=A,A.title=n.name,A.querySelector("#runs p").textContent="";const q=A.querySelector("header > span");q.removeAttribute("aria-hidden"),q.setAttribute("role","button"),q.setAttribute("tabindex","0"),q.setAttribute("aria-label","返回任务列表");const U=async()=>{const X=A.querySelector("#editor");X.contentEditable="false",m++;try{await B.save(X),a.back()}catch(ae){N(String(ae)),X.contentEditable="true"}};q.addEventListener("click",U),q.addEventListener("keydown",X=>{X.key==="Enter"&&U()});const _=A.querySelector("#settings"),$=A.createElement("fieldset");$.style.cssText="border:0;padding:0;max-height:180px;overflow:auto";const W=A.createElement("legend");W.textContent="本任务的指标范围",$.append(W);for(const X of n.sources){const ae=A.createElement("label");ae.style.cssText="display:flex;gap:8px;margin:8px 0";const T=A.createElement("input");T.type="checkbox",T.value=X.id,T.dataset.contextSource="",T.checked=b.includes(X.id),T.style.width="auto",ae.append(T,A.createTextNode(X.name)),$.append(ae)}(Q=_.querySelector("p"))==null||Q.replaceWith($);const le=A.createElement("button");le.textContent="数据库设置",le.type="button",le.onclick=()=>{var X;_.close(),(X=a.openSettings)==null||X.call(a)},$.after(le);const Z=A.querySelector("footer");for(const[X,ae]of[["test","测试发送"],["today","发送今日消息"]]){const T=A.createElement("button");T.textContent=ae,T.dataset.send=X,T.onclick=async()=>{const O=A.querySelector("#editor");O.contentEditable="false";try{await B.send(O,X,A.querySelector("#date").value)}catch(te){N(String(te))}finally{O.contentEditable="true"}},Z.append(T)}const ce=A.createElement("style");ce.textContent=Qb+`
`+Jb+`
body{font-family:var(--font-ui)}#date-picker{width:154px}`,A.head.append(ce);const L=A.createElement("span");L.className="production-message-demo",L.hidden=!0,A.body.append(L),u=uf.createRoot(A.querySelector("#date-picker")),u.render(l.jsx(uN,{input:A.querySelector("#date")})),window.addEventListener("production-settings-updated",D);const se=A.querySelector("#runs");if(se.ontoggle=async()=>{if(!se.open)return;const X=se.querySelector("p");X.textContent="正在读取…";try{const ae=await ye("daily.runs",{id:R});X.textContent=ae.runs.length?"":"暂无运行记录";for(const T of ae.runs){const O=A.createElement("div");O.textContent=`${T.time} · ${T.status} · ${T.businessDate}${T.error?" · "+T.error:""}`,X.append(O)}}catch(ae){X.textContent=String(ae)}},!n.notificationConfigured){const X=A.createElement("div");X.className="notice",X.dataset.notificationNotice="",X.append(A.createTextNode("通知渠道尚未配置。 "));const ae=A.createElement("button");ae.textContent="通知设置",ae.onclick=a.openSettings||null,X.append(ae),A.querySelector("#message").before(X)}C(),V().catch(X=>N(String(X)))},dispose(){s=!0,m++,u==null||u.unmount(),window.removeEventListener("production-settings-updated",D)}};return B}function uN({input:n}){const[a,s]=S.useState(n.value);return l.jsx(xn,{value:a,onChange:o=>{var u;s(o),n.value=o,n.dispatchEvent(new(((u=n.ownerDocument.defaultView)==null?void 0:u.Event)||Event)("change",{bubbles:!0}))}})}const dN=`<!doctype html>
<html lang="zh-CN">
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>原材料自动入库</title>
<style>
@font-face{font-family:"Inter Variable";src:url('../../src/ProductionAssistant.App/Assets/Fonts/Inter.ttf');font-weight:100 900}@font-face{font-family:"Noto Sans SC Variable";src:url('../../src/ProductionAssistant.App/Assets/Fonts/NotoSansSC.ttf');font-weight:100 900}
:root{font-family:"Inter Variable","Noto Sans SC Variable",sans-serif;color:#292524;background:#fafaf9;font-size:15px;--line:#e7e5e4;--muted:#78716c;--accent:#c2703d}*{box-sizing:border-box;scrollbar-width:thin;scrollbar-color:#d1d0cd transparent}body{margin:0}button,input,select{font:inherit;color:inherit}button,input,select,.work,dialog{corner-shape:squircle}button{height:44px;border:1px solid #e7e5e4;border-radius:14px;padding:0 16px;background:white;cursor:pointer;white-space:nowrap;font-weight:400}button:hover{background:#f5f5f4}button:disabled{color:#a8a29e;background:#fafaf9;cursor:default}button:focus-visible,input:focus-visible,select:focus-visible,summary:focus-visible{outline:2px solid #78716c;outline-offset:3px}.primary{background:var(--accent);border-color:var(--accent);color:white}.primary:hover{background:#a85c2e}.quiet{border:0;background:transparent}.icon{width:44px;padding:0;display:grid;place-items:center}svg{width:19px;height:19px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}h1,h2,h3,p{margin:0}h1{font-size:26px;font-weight:600;letter-spacing:-.02em}h2{font-size:16px;font-weight:500}h3{font-size:15px;font-weight:500}small,.muted{font-size:14px;color:var(--muted)}p{line-height:1.7}main{max-width:1420px;margin:auto;padding:30px 36px}.top{display:flex;align-items:center;gap:14px;padding-bottom:24px;background:#fafaf9;position:sticky;top:0;z-index:2}.title{flex:1;min-width:0}.title h1{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.title small{display:block;margin-top:7px}.pill{font-size:14px;border-radius:999px;background:#f5f5f4;padding:5px 10px;white-space:nowrap}.work{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);border:1px solid #e7e5e4;border-radius:20px;background:white;overflow:hidden;min-height:440px}.pane{padding:24px;min-width:0}.pane+.pane{border-left:1px solid var(--line)}.pane-head{display:flex;gap:12px;align-items:center;justify-content:space-between;margin-bottom:24px;min-height:44px}.datebar{display:flex;align-items:center;gap:10px;margin-bottom:20px;flex-wrap:wrap}input,select{height:44px;background:#fafaf9;border:1px solid #e7e5e4;border-radius:14px;padding:0 12px;min-width:0}input[type=date]{width:163px}.plain{padding:0 4px;height:32px;background:none;border:0;color:var(--muted)}.sheet{border-top:1px solid var(--line)}.line{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:18px 0;border-bottom:1px solid var(--line)}.line .number{font-size:24px;font-weight:500;font-variant-numeric:tabular-nums}.line small{margin-left:6px}.line.total{border-bottom:0}.line.total .number{font-size:18px}.annotation{margin-top:24px;display:flex;align-items:flex-start;gap:9px;color:var(--muted);font-size:14px;line-height:1.7}.annotation svg{flex-shrink:0;margin-top:2px}.empty{min-height:230px;display:flex;justify-content:center;flex-direction:column;align-items:center;gap:12px;color:var(--muted);text-align:center;line-height:1.8}.empty svg{width:32px;height:32px;stroke:#a8a29e}.empty strong{color:#57534e;font-weight:500}.record{margin-top:22px}.record .line{font-size:15px;padding:13px 0}.record .line span:first-child{color:var(--muted)}.record .line span:last-child{text-align:right}.callout{background:#f5f5f4;border-radius:14px;corner-shape:squircle;padding:13px 15px;margin-top:20px;font-size:14px;line-height:1.7}.callout.error{background:#fef2f2;color:#b91c1c}.callout.warn{background:rgb(249, 220, 164);color:#57534e}.action-row{display:flex;align-items:center;justify-content:flex-end;gap:16px;margin-top:16px}.action-row p{font-size:14px;color:var(--muted);flex:1}.action-row button{flex-shrink:0}details.runs{margin-top:24px;border-top:1px solid var(--line)}summary{cursor:pointer;padding:18px 0;font-size:15px}summary::marker{color:var(--muted)}.runs-body{padding-bottom:15px}.run{border-top:1px solid var(--line);padding:14px 0;display:grid;grid-template-columns:85px 1fr auto;gap:16px;font-size:14px}.run p{color:var(--muted);font-size:14px}.demo{display:flex;align-items:center;gap:12px;flex-wrap:wrap;border-top:1px dashed #e7e5e4;padding-top:16px;margin-top:12px;color:var(--muted);font-size:14px}.demo select{height:36px;font-size:14px}.demo button{height:36px;font-size:14px}.demo label{margin-left:auto;display:flex;align-items:center;gap:8px}dialog{width:510px;max-width:calc(100vw - 32px);max-height:calc(100vh - 48px);overflow:auto;border:1px solid #e7e5e4;border-radius:20px;padding:24px;color:#292524}dialog::backdrop{background:#29252460}dialog header{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}dialog label{display:grid;gap:8px;font-size:14px;margin-top:16px}dialog label input{width:100%}.two{display:grid;grid-template-columns:1fr 1fr;gap:16px}.section{border-top:1px solid var(--line);margin-top:22px;padding-top:20px}.actions{display:flex;justify-content:flex-end;gap:8px;margin-top:24px}.switch-row{display:flex;align-items:center;justify-content:space-between;gap:15px}.switch-row small{display:block;margin-top:6px}.toggle{width:44px;height:26px;border-radius:999px;padding:3px;background:#d6d3d1;border:0;corner-shape:round}.toggle::after{content:'';display:block;width:20px;height:20px;background:white;border-radius:50%;transition:transform .15s}.toggle[aria-checked=true]{background:#57534e}.toggle[aria-checked=true]::after{transform:translateX(18px)}[hidden]{display:none!important}#feedback{margin:0 0 18px}#feedback:empty{display:none}@media(max-width:900px){main{padding:24px}.pane{padding:20px}.work{grid-template-columns:1.2fr 1fr}.datebar{gap:8px}.top{gap:10px}.top>small{display:none}}@media(max-width:700px){main{padding:16px}.work{grid-template-columns:1fr}.pane+.pane{border-left:0;border-top:1px solid var(--line)}h1{font-size:22px}.action-row{align-items:flex-start;flex-wrap:wrap}.demo label{margin-left:0}.two{grid-template-columns:1fr}.top{position:static}.run{grid-template-columns:70px 1fr}.run>small{display:none}}@media(prefers-reduced-motion:reduce){*{transition:none!important}}
</style>
<main>
<header class="top"><button class="icon quiet" id="back" aria-label="返回任务列表"><svg viewBox="0 0 24 24"><path d="m14 6-6 6 6 6M8 12h12"/></svg></button><div class="title"><h1 id="name">原材料入库自动填报</h1></div><span class="pill" id="enabled">未启用</span><button class="icon" id="settings-open" aria-label="任务设置" title="任务设置"><svg viewBox="0 0 24 24"><path d="m9 3 6 0 1 3 3 1 2 5-2 5-3 1-1 3H9l-1-3-3-1-2-5 2-5 3-1Z"/><circle cx="12" cy="12" r="3"/></svg></button></header>
<p id="feedback" role="status" aria-live="polite"></p>
<section class="work" aria-label="入库工作区"><div class="pane"><div class="pane-head"><h2>入库数据</h2></div><div class="datebar"><span id="date-label">业务日期</span><input type="hidden" id="date"><span id="date-picker"></span><button class="plain" id="yesterday">昨天</button><button id="preview" class="primary">生成预览</button></div><div id="source-empty" class="empty"><svg viewBox="0 0 24 24"><path d="M5 5h14v15H5zM8 3v4m8-4v4M5 10h14m-10 4h6m-6 3h4"/></svg><strong>选择日期，查看入库汇总</strong><span>手动读取板材、型材重量<br>同时检查 Notion 中是否已有记录</span></div><div id="source-values" hidden><div class="sheet"><div class="line"><span>板材</span><span><b class="number" id="plate">—</b><small>吨</small></span></div><div class="line"><span>型材</span><span><b class="number" id="section">—</b><small>吨</small></span></div><div class="line total"><span>合计</span><span><b class="number" id="total">—</b><small>吨</small></span></div></div></div><div id="source-error" class="callout error" role="alert" hidden></div></div>
<div class="pane"><div class="pane-head"><h2>写入预览</h2><span class="pill">Notion</span></div><small id="target-name">原材料入库数据库</small><div id="target-empty" class="empty"><strong>尚未生成预览</strong><span>预览只读取数据，不会新增记录</span></div><div class="record" id="record" hidden><div class="line"><span>业务</span><span id="record-title"></span></div><div class="line"><span>日期</span><span id="record-date"></span></div><div class="line"><span>板材</span><span id="record-plate"></span></div><div class="line"><span>型材</span><span id="record-section"></span></div></div><div id="target-status" class="callout" role="status" hidden></div></div></section>
<div class="action-row"><button id="source-test">仅测试 93 读取</button><button id="run" disabled>执行本日期</button></div>
<details class="runs"><summary>运行记录 <small id="run-count"></small></summary><div class="runs-body" id="runs-body"><p class="muted">暂无运行记录</p></div></details>
</main>
<dialog id="settings" aria-labelledby="settings-title"><form id="settings-form"><header><h2 id="settings-title">任务设置</h2><button type="button" class="icon quiet" data-close="settings" aria-label="关闭任务设置">✕</button></header><label>任务名称<input id="task-name" required maxlength="80"></label><div class="section"><h3>93 系统连接</h3><label>材料入库业务页面<input type="url" id="url" required placeholder="http://服务器/业务页面"></label><div class="two"><label>用户名<input id="username" required autocomplete="off"></label><label>密码<input id="password" type="password" placeholder="已保存；留空不修改" autocomplete="new-password"></label></div></div><div class="section"><div class="switch-row"><div><h3>定时入库</h3><small>填报前一天</small></div><button type="button" id="toggle" class="toggle" role="switch" aria-checked="false" aria-label="定时入库"></button></div><label>每天执行时间<input id="run-time" type="time" step="60" required></label><p id="schedule-hint" class="muted" style="margin-top:12px">完成一次“生成预览”后可启用。</p></div><div class="section"><h3>固定写入目标</h3><p class="muted" style="margin-top:8px"><span id="settings-target-name">原材料入库数据库</span> · 业务、日期、板材、型材<br>Notion 连接与数据库目录在系统设置中维护。<br><button type="button" class="plain" id="system-settings">打开系统设置</button></p></div><p class="callout" id="settings-note">修改名称或连接后，需重新预览并启用定时任务。</p><div class="actions"><button type="button" data-close="settings">取消</button><button class="primary" type="submit">保存设置</button></div></form></dialog>
<dialog id="confirm" aria-labelledby="confirm-title"><header><h2 id="confirm-title">执行本日期</h2><button class="icon quiet" data-close="confirm" aria-label="关闭确认">✕</button></header><p id="confirm-copy"></p><p class="callout">执行时会重新读取并查重，以当时的数据为准；已有记录则跳过。</p><div class="actions"><button data-close="confirm">取消</button><button class="primary" id="confirm-run">确认执行</button></div></dialog>

</html>
`,kv=()=>{const n=new Date;return n.setDate(n.getDate()-1),`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`};function n0({id:n,...a}){const s=S.useRef(null),[o,u]=S.useState("");return S.useEffect(()=>{let h=!1,f;const m=s.current;return u(""),ye("notionFill.get",{id:n}).then(p=>{h||(f=fN(p,a),m.onload=()=>{var g;!h&&((g=m.contentDocument)!=null&&g.getElementById("date-picker"))&&f.connect(m.contentDocument)},m.srcdoc=dN.replace("../../src/ProductionAssistant.App/Assets/Fonts/Inter.ttf",new URL(Wb,window.location.href).href).replace("../../src/ProductionAssistant.App/Assets/Fonts/NotoSansSC.ttf",new URL(Ib,window.location.href).href))}).catch(p=>{h||u(String(p.message||p))}),()=>{h=!0,m.onload=null,f==null||f.dispose()}},[n]),l.jsxs("div",{className:"message-template-host",children:[o&&l.jsx("p",{role:"alert",children:o}),l.jsx("iframe",{ref:s,title:"原材料自动入库"})]})}function fN(n,a){let s={...n,runTime:n.runTime||"00:00"},o,u,h=!1,f=!1,m=0,p=0,g=kv(),v,x=s.isEnabled;const b=X=>o.getElementById(X),E=X=>b(X),j=X=>b(X),N=X=>b(X),C=X=>X instanceof Error?X.message:String(X),k=X=>X.toLocaleString("zh-CN",{minimumFractionDigits:3,maximumFractionDigits:3});function D(X,ae=!1){b("feedback").textContent=X,b("feedback").className=ae?"callout error":""}function V(){return!!(s.sourcePageUrl&&s.username&&s.passwordConfigured)}function R(){u==null||u.render(l.jsx(xn,{value:g,disabled:f,onChange:A}))}function B(){for(const X of["preview","source-test","yesterday","settings-open","back","confirm-run"])j(X).disabled=f;j("preview").disabled=f||!V()||!s.notionConfigured,j("source-test").disabled=f||!V(),j("run").disabled=f||!v,o.querySelectorAll("#settings button, #settings input").forEach(X=>X.disabled=f),j("toggle").disabled=f||!s.schedulingAvailable,j("preview").textContent=f?"处理中…":"生成预览",b("name").textContent=s.name,b("enabled").textContent=s.isEnabled?s.schedulerInstalled?"已启用":"计划异常":"未启用",b("target-name").textContent=s.targetDataSourceName,b("settings-target-name").textContent=s.targetDataSourceName,E("password").placeholder=s.passwordConfigured?"已保存；留空不修改":"请输入 93 系统密码",R()}function Y(X="尚未生成预览"){m++,v=void 0,b("source-empty").hidden=!1,b("source-values").hidden=!0,b("source-error").hidden=!0,b("record").hidden=!0,b("target-status").hidden=!0,b("target-empty").hidden=!1,b("target-empty").querySelector("strong").textContent=X,b("target-empty").querySelector("span").textContent="预览只读取数据，不会新增记录",j("run").textContent="执行本日期",j("run").disabled=!0,N("confirm").open&&N("confirm").close()}function A(X){f||(g=X,E("date").value=X,Y("待重新预览"),D(""),R())}function q(X){b("source-empty").hidden=!0,b("source-values").hidden=!1;for(const[ae,T]of[["plate",X.plateWeight],["section",X.sectionWeight],["total",X.totalWeight]])b(ae).textContent=k(T)}function U(X){q(X),b("target-empty").hidden=!0,b("record").hidden=!1,b("record-title").textContent=`${X.businessDate} 入库`,b("record-date").textContent=X.businessDate,b("record-plate").textContent=`${k(X.plateWeight)} 吨`,b("record-section").textContent=`${k(X.sectionWeight)} 吨`,b("target-status").hidden=!1,b("target-status").textContent=X.targetRecordExists?"该日期已有记录，无需新增。":"可新增 1 条入库记录。",j("run").textContent=X.targetRecordExists?"验证查重":"执行本日期"}function _(X){b("run-count").textContent=X.length?`· ${X.length}`:"";const ae=X.map(T=>{const O=o.createElement("div");O.className="run";const te=o.createElement("span");te.textContent={"source-test":"93 测试",test:"只读预览",manual:"手动执行",automatic:"自动执行"}[T.source]||T.source;const oe=o.createElement("div");oe.textContent=T.error||T.message||(T.status==="created"?"已新增":T.status==="failed"?"执行失败":"已检查"),T.status==="failed"&&(oe.style.color="#B91C1C");const ue=o.createElement("p");ue.textContent=T.status==="failed"?T.businessDate:`${T.businessDate} · 板材 ${k(T.plateWeight)} 吨 · 型材 ${k(T.sectionWeight)} 吨`,oe.append(ue);const me=o.createElement("small");return me.textContent=T.time,O.append(te,oe,me),O});b("runs-body").replaceChildren(...ae),X.length||(b("runs-body").textContent="暂无运行记录")}async function $(){const X=++p;try{const ae=await ye("notionFill.runs",{id:s.id});!h&&X===p&&_(ae.runs)}catch(ae){!h&&X===p&&(b("runs-body").textContent=`运行记录读取失败：${C(ae)}；重新展开可重试。`)}}function W(){Promise.resolve(a.changed()).catch(()=>{})}async function le(X){if(f||!g)return;f=!0,Y("正在读取…");const ae=m;B(),D("");try{const T=await ye(X?"notionFill.testSource":"notionFill.test",{id:s.id,businessDate:g},12e4);if(h||ae!==m)return;if(!T.succeeded)throw new Error(T.message||"读取失败");X?(q(T),b("target-empty").querySelector("strong").textContent="尚未检查 Notion",b("target-empty").querySelector("span").textContent="点击“生成预览”完成读取与查重"):(s.validated=!0,v=T,U(T)),W()}catch(T){if(h||ae!==m)return;Y("本次预览未完成"),b("source-error").hidden=!1,b("source-error").textContent=C(T)}finally{h||(f=!1,B(),$())}}async function Z(){if(f||!v||!N("confirm").open)return;const X=v.businessDate;N("confirm").close(),f=!0,B(),D("");try{const ae=await ye("notionFill.runNow",{id:s.id,businessDate:X},12e4);if(h)return;if(!ae.succeeded)throw new Error(ae.message||"执行失败");v={...v,targetRecordExists:!0},b("target-status").textContent=ae.message,j("run").textContent="验证查重",D(ae.created?"Notion 写入成功。":"该日期已有记录，本次已跳过。"),W()}catch(ae){h||(Y("执行未完成，请重新预览"),D(C(ae),!0))}finally{h||(f=!1,B(),$())}}function ce(){return E("task-name").value.trim()!==s.name||E("url").value.trim().replace(/\/+$/,"")!==s.sourcePageUrl||E("username").value.trim()!==s.username||!!E("password").value}function L(){j("toggle").setAttribute("aria-checked",String(x)),b("schedule-hint").textContent=s.schedulingAvailable?ce()?"配置已修改：保存后需重新预览，再启用。":s.isEnabled&&!s.schedulerInstalled?s.schedulerMessage:s.validated?"只读预览已通过，可以启用定时入库。":"完成一次“生成预览”后可启用。":"当前运行环境不支持定时启停，预览与手动执行仍可使用。"}async function se(X){if(X.preventDefault(),f)return;const ae=E("task-name").value.trim(),T=E("username").value.trim();if(!ae||!T){b("settings-note").textContent="任务名称和用户名不能为空。";return}const O=ce(),te=E("run-time").value;if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(te)){b("settings-note").textContent="请选择有效的执行时间。";return}const oe=O||te!==s.runTime,ue=O?!1:x;let me=!1;f=!0,B();try{if(oe){const ie=E("url").value.trim().replace(/\/+$/,""),I=E("password").value;if(await ye("notionFill.save",{id:s.id,name:ae,sourcePageUrl:ie,username:T,password:I,runTime:te}),h)return;me=!0,s={...s,name:ae,sourcePageUrl:ie,username:T,runTime:te,passwordConfigured:s.passwordConfigured||!!I,isEnabled:O?!1:s.isEnabled,validated:O?!1:s.validated},E("password").value="",O&&Y("配置已修改，请重新预览")}if(ue!==s.isEnabled){const ie=await ye("automation.setEnabled",{id:s.id,taskType:"notion_fill",enabled:ue});if(h)return;if(s.isEnabled=ie.enabled,ie.enabled!==ue)throw new Error(ie.message||"定时任务状态未更新");me=!0}const xe=await ye("notionFill.get",{id:s.id});if(h)return;s=xe,N("settings").close(),D(O?"配置已保存，请重新预览后启用。":"任务设置已保存。")}catch(xe){h||(b("settings-note").textContent=`${me?"设置已更新，但后续操作失败：":""}${C(xe)}`)}finally{h||(f=!1,x=s.isEnabled,B(),L(),me&&W())}}async function Q(){if(f||h)return;const X=m;try{const ae=await ye("notionFill.get",{id:s.id});if(h||f||X!==m)return;s=ae,Y("系统设置已更新，请重新预览"),B(),D(s.notionConfigured?"系统设置已更新，点击“生成预览”读取数据。":"Notion 连接尚未配置，仍可仅测试 93 读取。")}catch(ae){h||D(C(ae),!0)}}return{connect(X){u==null||u.unmount(),o=X;const ae=o.createElement("style");ae.textContent=Qb+`
`+Jb+`
body{color:#292524}#date-picker{width:163px;display:inline-block}`,o.head.append(ae);const T=o.createElement("span");T.className="production-message-demo",T.hidden=!0,o.body.append(T),u=uf.createRoot(b("date-picker")),E("date").value=g,E("date").onchange=()=>A(E("date").value),j("yesterday").onclick=()=>A(kv()),j("preview").onclick=()=>{le(!1)},j("source-test").onclick=()=>{le(!0)},j("back").onclick=a.back,j("run").onclick=()=>{f||!v||(b("confirm-title").textContent=v.targetRecordExists?"验证查重":"执行本日期",b("confirm-copy").textContent=v.targetRecordExists?`${v.businessDate} 已有记录，本次执行应跳过。`:`将向“${s.targetDataSourceName}”新增 ${v.businessDate} 的记录：板材 ${k(v.plateWeight)} 吨，型材 ${k(v.sectionWeight)} 吨。`,N("confirm").showModal())},j("confirm-run").onclick=()=>{Z()},j("settings-open").onclick=()=>{E("task-name").value=s.name,E("url").value=s.sourcePageUrl,E("username").value=s.username,E("password").value="",E("run-time").value=s.runTime,E("password").required=!s.passwordConfigured,b("settings-note").textContent="修改名称或连接后，需重新预览并启用定时任务。",x=s.isEnabled,L(),N("settings").showModal()},j("toggle").onclick=()=>{if(s.schedulingAvailable){if(!x&&(!s.validated||ce())){b("schedule-hint").textContent="请先保存配置并完成“生成预览”，再启用定时入库。";return}x=!x,L()}};for(const O of["task-name","url","username","password"])E(O).oninput=()=>{ce()&&(x=!1),L()};b("settings-form").onsubmit=O=>{se(O)},N("settings").onclose=()=>{E("password").value=""},N("settings").oncancel=O=>{f&&O.preventDefault()},o.querySelectorAll("[data-close]").forEach(O=>O.onclick=()=>{f||N(O.dataset.close).close()}),j("system-settings").hidden=!a.openSettings,j("system-settings").onclick=()=>{var O;N("settings").close(),(O=a.openSettings)==null||O.call(a)},o.querySelector(".runs").ontoggle=O=>{O.currentTarget.open&&$()},window.addEventListener("production-settings-updated",Q),Y(),B(),V()?s.notionConfigured||D("Notion 连接尚未配置，请从任务设置打开系统设置；仍可仅测试 93 读取。"):D("请先在任务设置中补全 93 系统连接配置。")},dispose(){h=!0,m++,p++,u==null||u.unmount(),window.removeEventListener("production-settings-updated",Q)}}}var hN=Object.defineProperty,$a=(n,a)=>hN(n,"name",{value:a,configurable:!0}),r0=!!(typeof window<"u"&&window.document&&window.document.createElement);function yr(n,a,{checkForDefaultPrevented:s=!0}={}){return $a(function(u){if(n==null||n(u),s===!1||!u||!u.defaultPrevented)return a==null?void 0:a(u)},"handleEvent")}$a(yr,"composeEventHandlers");function mN(n){var a;if(!r0)throw new Error("Cannot access window outside of the DOM");return((a=n==null?void 0:n.ownerDocument)==null?void 0:a.defaultView)??window}$a(mN,"getOwnerWindow");function Zd(n){if(!r0)throw new Error("Cannot access document outside of the DOM");return(n==null?void 0:n.ownerDocument)??document}$a(Zd,"getOwnerDocument");function a0(n,a=!1){const{activeElement:s}=Zd(n);if(!(s!=null&&s.nodeName))return null;if(i0(s)&&s.contentDocument)return a0(s.contentDocument.body,a);if(a){const o=s.getAttribute("aria-activedescendant");if(o){const u=Zd(s).getElementById(o);if(u)return u}}return s}$a(a0,"getActiveElement");function i0(n){return n.tagName==="IFRAME"}$a(i0,"isFrame");var pN=Object.defineProperty,Xf=(n,a)=>pN(n,"name",{value:a,configurable:!0});function Qd(n,a){if(typeof n=="function")return n(a);n!=null&&(n.current=a)}Xf(Qd,"setRef");function s0(...n){return a=>{let s=!1;const o=n.map(u=>{const h=Qd(u,a);return!s&&typeof h=="function"&&(s=!0),h});if(s)return()=>{for(let u=0;u<o.length;u++){const h=o[u];typeof h=="function"?h():Qd(n[u],null)}}}}Xf(s0,"composeRefs");function Ka(...n){return S.useCallback(s0(...n),n)}Xf(Ka,"useComposedRefs");var gN=Object.defineProperty,Wt=(n,a)=>gN(n,"name",{value:a,configurable:!0});function yN(n,a){const s=S.createContext(a);s.displayName=n+"Context";const o=Wt(h=>{const{children:f,...m}=h,p=S.useMemo(()=>m,Object.values(m));return l.jsx(s.Provider,{value:p,children:f})},"Provider");o.displayName=n+"Provider";function u(h,f={}){const{optional:m=!1}=f,p=S.useContext(s);if(p)return p;if(a!==void 0)return a;if(!m)throw new Error(`\`${h}\` must be used within \`${n}\``)}return Wt(u,"useContext"),[o,u]}Wt(yN,"createContext");function o0(n,a=[]){let s=[];function o(h,f){const m=S.createContext(f);m.displayName=h+"Context";const p=s.length;s=[...s,f];const g=Wt(x=>{var k;const{scope:b,children:E,...j}=x,N=((k=b==null?void 0:b[n])==null?void 0:k[p])||m,C=S.useMemo(()=>j,Object.values(j));return l.jsx(N.Provider,{value:C,children:E})},"Provider");g.displayName=h+"Provider";function v(x,b,E={}){var k;const{optional:j=!1}=E,N=((k=b==null?void 0:b[n])==null?void 0:k[p])||m,C=S.useContext(N);if(C)return C;if(f!==void 0)return f;if(!j)throw new Error(`\`${x}\` must be used within \`${h}\``)}return Wt(v,"useContext"),[g,v]}Wt(o,"createContext");const u=Wt(()=>{const h=s.map(f=>S.createContext(f));return Wt(function(m){const p=(m==null?void 0:m[n])||h;return S.useMemo(()=>({[`__scope${n}`]:{...m,[n]:p}}),[m,p])},"useScope")},"createScope");return u.scopeName=n,[o,l0(u,...a)]}Wt(o0,"createContextScope");function l0(...n){const a=n[0];if(n.length===1)return a;const s=Wt(()=>{const o=n.map(u=>({useScope:u(),scopeName:u.scopeName}));return Wt(function(h){const f=o.reduce((m,{useScope:p,scopeName:g})=>{const x=p(h)[`__scope${g}`];return{...m,...x}},{});return S.useMemo(()=>({[`__scope${a.scopeName}`]:f}),[f])},"useComposedScopes")},"createScope");return s.scopeName=a.scopeName,s}Wt(l0,"composeContextScopes");var br=globalThis!=null&&globalThis.document?S.useLayoutEffect:()=>{},vN=Object.defineProperty,xN=(n,a)=>vN(n,"name",{value:a,configurable:!0}),bN=is[" useId ".trim().toString()]||(()=>{}),SN=0;function Jo(n){const[a,s]=S.useState(bN());return br(()=>{n||s(o=>o??String(SN++))},[n]),n||(a?`radix-${a}`:"")}xN(Jo,"useId");var wN=Object.defineProperty,jN=(n,a)=>wN(n,"name",{value:a,configurable:!0}),Rv=is[" useEffectEvent ".trim().toString()],Ov=is[" useInsertionEffect ".trim().toString()];function c0(n){if(typeof Rv=="function")return Rv(n);const a=S.useRef(()=>{throw new Error("Cannot call an event handler while rendering.")});return typeof Ov=="function"?Ov(()=>{a.current=n}):br(()=>{a.current=n}),S.useMemo(()=>((...s)=>{var o;return(o=a.current)==null?void 0:o.call(a,...s)}),[])}jN(c0,"useEffectEvent");var EN=Object.defineProperty,ds=(n,a)=>EN(n,"name",{value:a,configurable:!0}),TN=is[" useInsertionEffect ".trim().toString()]||br;function u0({prop:n,defaultProp:a,onChange:s=ds(()=>{},"onChange"),caller:o}){const[u,h,f]=d0({defaultProp:a,onChange:s}),m=n!==void 0,p=m?n:u,g=S.useCallback(v=>{var x;if(m){const b=f0(v)?v(n):v;b!==n&&((x=f.current)==null||x.call(f,b))}else h(v)},[m,n,h,f]);return[p,g]}ds(u0,"useControllableState");function d0({defaultProp:n,onChange:a}){const[s,o]=S.useState(n),u=S.useRef(s),h=S.useRef(a);return TN(()=>{h.current=a},[a]),S.useEffect(()=>{var f;u.current!==s&&((f=h.current)==null||f.call(h,s),u.current=s)},[s,u]),[s,o,h]}ds(d0,"useUncontrolledState");function f0(n){return typeof n=="function"}ds(f0,"isFunction");var zv=Symbol("RADIX:SYNC_STATE");function CN(n,a,s,o){const{prop:u,defaultProp:h,onChange:f,caller:m}=a,p=u!==void 0,g=c0(f),v=[{...s,state:h}];o&&v.push(o);const[x,b]=S.useReducer((C,k)=>{if(k.type===zv)return{...C,state:k.state};const D=n(C,k);return p&&!Object.is(D.state,C.state)&&g(D.state),D},...v),E=x.state,j=S.useRef(E);S.useEffect(()=>{j.current!==E&&(j.current=E,p||g(E))},[E,j,p]);const N=S.useMemo(()=>u!==void 0?{...x,state:u}:x,[x,u]);return S.useEffect(()=>{p&&!Object.is(u,x.state)&&b({type:zv,state:u})},[u,x.state,p]),[N,b]}ds(CN,"useControllableStateReducer");var NN=Object.defineProperty,cn=(n,a)=>NN(n,"name",{value:a,configurable:!0});function Ff(n){const a=S.forwardRef((s,o)=>{let{children:u,...h}=s,f=null,m=!1;const p=[];Jd(u)&&typeof Vo=="function"&&(u=Vo(u._payload)),S.Children.forEach(u,b=>{var E;if(g0(b)){m=!0;const j=b;let N="child"in j.props?j.props.child:j.props.children;Jd(N)&&typeof Vo=="function"&&(N=Vo(N._payload)),f=AN(j,N),p.push((E=f==null?void 0:f.props)==null?void 0:E.children)}else p.push(b)}),f?f=S.cloneElement(f,void 0,p):!m&&S.Children.count(u)===1&&S.isValidElement(u)&&(f=u);const g=f?p0(f):void 0,v=Ka(o,g);if(!f){if(u||u===0)throw new Error(m?RN(n):kN(n));return u}const x=m0(h,f.props??{});return f.type!==S.Fragment&&(x.ref=o?v:g),S.cloneElement(f,x)});return a.displayName=`${n}.Slot`,a}cn(Ff,"createSlot");var h0=Symbol.for("radix.slottable");function DN(n){const a=cn(s=>"child"in s?s.children(s.child):s.children,"Slottable");return a.displayName=`${n}.Slottable`,a.__radixId=h0,a}cn(DN,"createSlottable");var AN=cn((n,a)=>{if("child"in n.props){const s=n.props.child;return S.isValidElement(s)?S.cloneElement(s,void 0,n.props.children(s.props.children)):null}return S.isValidElement(a)?a:null},"getSlottableElementFromSlottable");function m0(n,a){const s={...a};for(const o in a){const u=n[o],h=a[o];/^on[A-Z]/.test(o)?u&&h?s[o]=(...m)=>{const p=h(...m);return u(...m),p}:u&&(s[o]=u):o==="style"?s[o]={...u,...h}:o==="className"&&(s[o]=[u,h].filter(Boolean).join(" "))}return{...n,...s}}cn(m0,"mergeProps");function p0(n){var o,u;let a=(o=Object.getOwnPropertyDescriptor(n.props,"ref"))==null?void 0:o.get,s=a&&"isReactWarning"in a&&a.isReactWarning;return s?n.ref:(a=(u=Object.getOwnPropertyDescriptor(n,"ref"))==null?void 0:u.get,s=a&&"isReactWarning"in a&&a.isReactWarning,s?n.props.ref:n.props.ref||n.ref)}cn(p0,"getElementRef");function g0(n){return S.isValidElement(n)&&typeof n.type=="function"&&"__radixId"in n.type&&n.type.__radixId===h0}cn(g0,"isSlottable");var MN=Symbol.for("react.lazy");function Jd(n){return n!=null&&typeof n=="object"&&"$$typeof"in n&&n.$$typeof===MN&&"_payload"in n&&y0(n._payload)}cn(Jd,"isLazyComponent");function y0(n){return typeof n=="object"&&n!==null&&"then"in n}cn(y0,"isPromiseLike");var kN=cn(n=>`${n} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`,"createSlotError"),RN=cn(n=>`${n} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`,"createSlottableError"),Vo=is[" use ".trim().toString()],ON=Object.defineProperty,zN=(n,a)=>ON(n,"name",{value:a,configurable:!0}),_N=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],$r=_N.reduce((n,a)=>{const s=Ff(`Primitive.${a}`),o=S.forwardRef((u,h)=>{const{asChild:f,...m}=u,p=f?s:a;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),l.jsx(p,{...m,ref:h})});return o.displayName=`Primitive.${a}`,{...n,[a]:o}},{});function v0(n,a){n&&Yf.flushSync(()=>n.dispatchEvent(a))}zN(v0,"dispatchDiscreteCustomEvent");var VN=Object.defineProperty,BN=(n,a)=>VN(n,"name",{value:a,configurable:!0});function Pa(n){const a=S.useRef(n);return S.useEffect(()=>{a.current=n}),S.useMemo(()=>((...s)=>{var o;return(o=a.current)==null?void 0:o.call(a,...s)}),[])}BN(Pa,"useCallbackRef");var LN=Object.defineProperty,lt=(n,a)=>LN(n,"name",{value:a,configurable:!0}),Wd="dismissableLayer.update",UN="dismissableLayer.pointerDownOutside",HN="dismissableLayer.focusOutside",_v,x0=S.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set,dismissableSurfaces:new Set}),qN=S.forwardRef(lt(function(a,s){const{disableOutsidePointerEvents:o=!1,deferPointerDownOutside:u=!1,onEscapeKeyDown:h,onPointerDownOutside:f,onFocusOutside:m,onInteractOutside:p,onDismiss:g,...v}=a,x=S.useContext(x0),[b,E]=S.useState(null),j=(b==null?void 0:b.ownerDocument)??(globalThis==null?void 0:globalThis.document),[,N]=S.useState({}),C=Ka(s,E),k=Array.from(x.layers),[D]=[...x.layersWithOutsidePointerEventsDisabled].slice(-1),V=D?k.indexOf(D):-1,R=b?k.indexOf(b):-1,B=x.layersWithOutsidePointerEventsDisabled.size>0,Y=R>=V,A=S.useRef(!1),q=S0(W=>{f==null||f(W),p==null||p(W),W.defaultPrevented||g==null||g()},{ownerDocument:j,deferPointerDownOutside:u,isDeferredPointerDownOutsideRef:A,dismissableSurfaces:x.dismissableSurfaces,shouldHandlePointerDownOutside:S.useCallback(W=>{if(!(W instanceof Node))return!1;const le=[...x.branches].some(Z=>Z.contains(W));return Y&&!le},[x.branches,Y])}),U=w0(W=>{if(u&&A.current)return;const le=W.target;[...x.branches].some(ce=>ce.contains(le))||(m==null||m(W),p==null||p(W),W.defaultPrevented||g==null||g())},j),_=b?R===k.length-1:!1,$=Pa(W=>{W.key==="Escape"&&(h==null||h(W),!W.defaultPrevented&&g&&(W.preventDefault(),g()))});return S.useEffect(()=>{if(_)return j.addEventListener("keydown",$,{capture:!0}),()=>j.removeEventListener("keydown",$,{capture:!0})},[j,_,$]),S.useEffect(()=>{if(b)return o&&(x.layersWithOutsidePointerEventsDisabled.size===0&&(_v=j.body.style.pointerEvents,j.body.style.pointerEvents="none"),x.layersWithOutsidePointerEventsDisabled.add(b)),x.layers.add(b),Id(),()=>{o&&(x.layersWithOutsidePointerEventsDisabled.delete(b),x.layersWithOutsidePointerEventsDisabled.size===0&&(j.body.style.pointerEvents=_v))}},[b,j,o,x]),S.useEffect(()=>()=>{b&&(x.layers.delete(b),x.layersWithOutsidePointerEventsDisabled.delete(b),Id())},[b,x]),S.useEffect(()=>{const W=lt(()=>N({}),"handleUpdate");return document.addEventListener(Wd,W),()=>document.removeEventListener(Wd,W)},[]),l.jsx($r.div,{...v,ref:C,style:{pointerEvents:B?Y?"auto":"none":void 0,...a.style},onFocusCapture:yr(a.onFocusCapture,U.onFocusCapture),onBlurCapture:yr(a.onBlurCapture,U.onBlurCapture),onPointerDownCapture:yr(a.onPointerDownCapture,q.onPointerDownCapture)})},"DismissableLayer"));function b0(){const n=S.useContext(x0),[a,s]=S.useState(null);return S.useEffect(()=>{if(a)return n.dismissableSurfaces.add(a),()=>{n.dismissableSurfaces.delete(a)}},[a,n.dismissableSurfaces]),s}lt(b0,"useDismissableLayerSurface");var YN=lt(()=>!0,"IS_TRUE");function S0(n,a){const{ownerDocument:s=globalThis==null?void 0:globalThis.document,deferPointerDownOutside:o=!1,isDeferredPointerDownOutsideRef:u,dismissableSurfaces:h,shouldHandlePointerDownOutside:f=YN}=a,m=Pa(n),p=S.useRef(!1),g=S.useRef(!1),v=S.useRef(new Map),x=S.useRef(()=>{});return S.useEffect(()=>{function b(){g.current=!1,u.current=!1,v.current.clear()}lt(b,"resetOutsideInteraction");function E(){return Array.from(v.current.values()).some(Boolean)}lt(E,"isOutsideInteractionIntercepted");function j(V){if(!g.current)return;const R=V.target;R instanceof Node&&[...h].some(Y=>Y.contains(R))||v.current.set(V.type,!0),V.type==="click"&&window.setTimeout(()=>{g.current&&x.current()},0)}lt(j,"handleInteractionCapture");function N(V){g.current&&v.current.set(V.type,!1)}lt(N,"handleInteractionBubble");const C=lt(V=>{if(V.target&&!p.current){let R=function(){s.removeEventListener("click",x.current);const Y=E();b(),Y||$f(UN,m,B,{discrete:!0})};if(lt(R,"handleAndDispatchPointerDownOutsideEvent"),!f(V.target)){s.removeEventListener("click",x.current),b(),p.current=!1;return}const B={originalEvent:V};g.current=!0,u.current=o&&V.button===0,v.current.clear(),!o||V.button!==0?R():(s.removeEventListener("click",x.current),x.current=R,s.addEventListener("click",x.current,{once:!0}))}else s.removeEventListener("click",x.current),b();p.current=!1},"handlePointerDown"),k=["pointerup","mousedown","mouseup","touchstart","touchend","click"];for(const V of k)s.addEventListener(V,j,!0),s.addEventListener(V,N);const D=window.setTimeout(()=>{s.addEventListener("pointerdown",C)},0);return()=>{window.clearTimeout(D),s.removeEventListener("pointerdown",C),s.removeEventListener("click",x.current);for(const V of k)s.removeEventListener(V,j,!0),s.removeEventListener(V,N)}},[s,m,o,u,h,f]),{onPointerDownCapture:lt(()=>p.current=!0,"onPointerDownCapture")}}lt(S0,"usePointerDownOutside");function w0(n,a=globalThis==null?void 0:globalThis.document){const s=Pa(n),o=S.useRef(!1);return S.useEffect(()=>{const u=lt(h=>{h.target&&!o.current&&$f(HN,s,{originalEvent:h},{discrete:!1})},"handleFocus");return a.addEventListener("focusin",u),()=>a.removeEventListener("focusin",u)},[a,s]),{onFocusCapture:lt(()=>o.current=!0,"onFocusCapture"),onBlurCapture:lt(()=>o.current=!1,"onBlurCapture")}}lt(w0,"useFocusOutside");function Id(){const n=new CustomEvent(Wd);document.dispatchEvent(n)}lt(Id,"dispatchUpdate");function $f(n,a,s,{discrete:o}){const u=s.originalEvent.target,h=new CustomEvent(n,{bubbles:!1,cancelable:!0,detail:s});a&&u.addEventListener(n,a,{once:!0}),o?v0(u,h):u.dispatchEvent(h)}lt($f,"handleAndDispatchCustomEvent");var PN=Object.defineProperty,St=(n,a)=>PN(n,"name",{value:a,configurable:!0}),hd="focusScope.autoFocusOnMount",md="focusScope.autoFocusOnUnmount",Vv={bubbles:!1,cancelable:!0},GN=S.forwardRef(St(function(a,s){const{loop:o=!1,trapped:u=!1,onMountAutoFocus:h,onUnmountAutoFocus:f,...m}=a,[p,g]=S.useState(null),v=Pa(h),x=Pa(f),b=S.useRef(null),E=Ka(s,g),j=S.useRef({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;S.useEffect(()=>{if(u){let C=function(R){if(j.paused||!p)return;const B=R.target;p.contains(B)?b.current=B:Yn(b.current,{select:!0})},k=function(R){if(j.paused||!p)return;const B=R.relatedTarget;B!==null&&(p.contains(B)||Yn(b.current,{select:!0}))},D=function(R){if(document.activeElement===document.body)for(const Y of R)Y.removedNodes.length>0&&Yn(p)};St(C,"handleFocusIn"),St(k,"handleFocusOut"),St(D,"handleMutations"),document.addEventListener("focusin",C),document.addEventListener("focusout",k);const V=new MutationObserver(D);return p&&V.observe(p,{childList:!0,subtree:!0}),()=>{document.removeEventListener("focusin",C),document.removeEventListener("focusout",k),V.disconnect()}}},[u,p,j.paused]),S.useEffect(()=>{if(p){Bv.add(j);const C=document.activeElement;if(!p.contains(C)){const D=new CustomEvent(hd,Vv);p.addEventListener(hd,v),p.dispatchEvent(D),D.defaultPrevented||(j0(D0(Kf(p)),{select:!0}),document.activeElement===C&&Yn(p))}return()=>{p.removeEventListener(hd,v),setTimeout(()=>{const D=new CustomEvent(md,Vv);p.addEventListener(md,x),p.dispatchEvent(D),D.defaultPrevented||Yn(C??document.body,{select:!0}),p.removeEventListener(md,x),Bv.remove(j)},0)}}},[p,v,x,j]);const N=S.useCallback(C=>{if(!o&&!u||j.paused)return;const k=C.key==="Tab"&&!C.altKey&&!C.ctrlKey&&!C.metaKey,D=document.activeElement;if(k&&D){const V=C.currentTarget,[R,B]=E0(V);R&&B?!C.shiftKey&&D===B?(C.preventDefault(),o&&Yn(R,{select:!0})):C.shiftKey&&D===R&&(C.preventDefault(),o&&Yn(B,{select:!0})):D===V&&C.preventDefault()}},[o,u,j.paused]);return l.jsx($r.div,{tabIndex:-1,...m,ref:E,onKeyDown:N})},"FocusScope"));function j0(n,{select:a=!1}={}){const s=document.activeElement;for(const o of n)if(Yn(o,{select:a}),document.activeElement!==s)return}St(j0,"focusFirst");function E0(n){const a=Kf(n),s=ef(a,n),o=ef(a.reverse(),n);return[s,o]}St(E0,"getTabbableEdges");function Kf(n){const a=[],s=document.createTreeWalker(n,NodeFilter.SHOW_ELEMENT,{acceptNode:St(o=>{const u=o.tagName==="INPUT"&&o.type==="hidden";return o.disabled||o.hidden||u?NodeFilter.FILTER_SKIP:o.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP},"acceptNode")});for(;s.nextNode();)a.push(s.currentNode);return a}St(Kf,"getTabbableCandidates");function ef(n,a){const s=typeof a.checkVisibility=="function"&&a.checkVisibility({checkVisibilityCSS:!0});for(const o of n)if(!(s?!o.checkVisibility({checkVisibilityCSS:!0}):T0(o,{upTo:a})))return o}St(ef,"findVisible");function T0(n,{upTo:a}){if(getComputedStyle(n).visibility==="hidden")return!0;for(;n;){if(a!==void 0&&n===a)return!1;if(getComputedStyle(n).display==="none")return!0;n=n.parentElement}return!1}St(T0,"isHidden");function C0(n){return n instanceof HTMLInputElement&&"select"in n}St(C0,"isSelectableInput");function Yn(n,{select:a=!1}={}){if(n&&n.focus){const s=document.activeElement;n.focus({preventScroll:!0}),n!==s&&C0(n)&&a&&n.select()}}St(Yn,"focus");var Bv=N0();function N0(){let n=[];return{add(a){const s=n[0];a!==s&&(s==null||s.pause()),n=tf(n,a),n.unshift(a)},remove(a){var s;n=tf(n,a),(s=n[0])==null||s.resume()}}}St(N0,"createFocusScopesStack");function tf(n,a){const s=[...n],o=s.indexOf(a);return o!==-1&&s.splice(o,1),s}St(tf,"arrayRemove");function D0(n){return n.filter(a=>a.tagName!=="A")}St(D0,"removeLinks");var XN=Object.defineProperty,FN=(n,a)=>XN(n,"name",{value:a,configurable:!0}),$N=S.forwardRef(FN(function(a,s){var p;const{container:o,...u}=a,[h,f]=S.useState(!1);br(()=>f(!0),[]);const m=o||h&&((p=globalThis==null?void 0:globalThis.document)==null?void 0:p.body);return m?Yf.createPortal(l.jsx($r.div,{...u,ref:s}),m):null},"Portal")),KN=Object.defineProperty,Pn=(n,a)=>KN(n,"name",{value:a,configurable:!0});function A0(n,a){return S.useReducer((s,o)=>a[s][o]??s,n)}Pn(A0,"useStateMachine");var Zf=Pn(n=>{const{present:a,children:s}=n,o=M0(a),u=typeof s=="function"?s({present:o.isPresent}):S.Children.only(s),h=k0(o.ref,R0(u));return typeof s=="function"||o.isPresent?S.cloneElement(u,{ref:h}):null},"Presence");function M0(n){const[a,s]=S.useState(),o=S.useRef(null),u=S.useRef(n),h=S.useRef("none"),f=S.useRef(void 0),m=n?"mounted":"unmounted",[p,g]=A0(m,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return S.useEffect(()=>{p==="mounted"?(h.current=f.current??Va(o.current),f.current=void 0):h.current="none"},[p]),br(()=>{const v=o.current,x=u.current;if(x!==n){const E=h.current,j=Va(v);n?(f.current=j,g("MOUNT")):j==="none"||(v==null?void 0:v.display)==="none"?g("UNMOUNT"):g(x&&E!==j?"ANIMATION_OUT":"UNMOUNT"),u.current=n}},[n,g]),br(()=>{if(a){let v;const x=a.ownerDocument.defaultView??window,b=Pn(j=>{const C=Va(o.current).includes(CSS.escape(j.animationName));if(j.target===a&&C&&(g("ANIMATION_END"),!u.current)){const k=a.style.animationFillMode;a.style.animationFillMode="forwards",v=x.setTimeout(()=>{a.style.animationFillMode==="forwards"&&(a.style.animationFillMode=k)})}},"handleAnimationEnd"),E=Pn(j=>{j.target===a&&(h.current=Va(o.current))},"handleAnimationStart");return a.addEventListener("animationstart",E),a.addEventListener("animationcancel",b),a.addEventListener("animationend",b),()=>{x.clearTimeout(v),a.removeEventListener("animationstart",E),a.removeEventListener("animationcancel",b),a.removeEventListener("animationend",b)}}else g("ANIMATION_END")},[a,g]),{isPresent:["mounted","unmountSuspended"].includes(p),ref:S.useCallback(v=>{if(v){const x=getComputedStyle(v);o.current=x,f.current=Va(x)}else o.current=null;s(v)},[])}}Pn(M0,"usePresence");function nf(n,a){if(typeof n=="function")return n(a);n!=null&&(n.current=a)}Pn(nf,"setRef");function k0(...n){const a=S.useRef(n);return a.current=n,S.useCallback(s=>{const o=a.current;let u=!1;const h=o.map(f=>{const m=nf(f,s);return!u&&typeof m=="function"&&(u=!0),m});if(u)return()=>{for(let f=0;f<h.length;f++){const m=h[f];typeof m=="function"?m():nf(o[f],null)}}},[])}Pn(k0,"useStableComposedRefs");function Va(n){return(n==null?void 0:n.animationName)||"none"}Pn(Va,"getAnimationName");function R0(n){var o,u;let a=(o=Object.getOwnPropertyDescriptor(n.props,"ref"))==null?void 0:o.get,s=a&&"isReactWarning"in a&&a.isReactWarning;return s?n.ref:(a=(u=Object.getOwnPropertyDescriptor(n,"ref"))==null?void 0:u.get,s=a&&"isReactWarning"in a&&a.isReactWarning,s?n.props.ref:n.props.ref||n.ref)}Pn(R0,"getElementRef");var ZN=Object.defineProperty,Qf=(n,a)=>ZN(n,"name",{value:a,configurable:!0}),Bo=0,mn=null;function QN(n){return Jf(),n.children}Qf(QN,"FocusGuards");function Jf(){S.useEffect(()=>{mn||(mn={start:rf(),end:rf()});const{start:n,end:a}=mn;return document.body.firstElementChild!==n&&document.body.insertAdjacentElement("afterbegin",n),document.body.lastElementChild!==a&&document.body.insertAdjacentElement("beforeend",a),Bo++,()=>{Bo===1&&(mn==null||mn.start.remove(),mn==null||mn.end.remove(),mn=null),Bo=Math.max(0,Bo-1)}},[])}Qf(Jf,"useFocusGuards");function rf(){const n=document.createElement("span");return n.setAttribute("data-radix-focus-guard",""),n.tabIndex=0,n.style.outline="none",n.style.opacity="0",n.style.position="fixed",n.style.pointerEvents="none",n}Qf(rf,"createFocusGuard");var yn=function(){return yn=Object.assign||function(a){for(var s,o=1,u=arguments.length;o<u;o++){s=arguments[o];for(var h in s)Object.prototype.hasOwnProperty.call(s,h)&&(a[h]=s[h])}return a},yn.apply(this,arguments)};function O0(n,a){var s={};for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&a.indexOf(o)<0&&(s[o]=n[o]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var u=0,o=Object.getOwnPropertySymbols(n);u<o.length;u++)a.indexOf(o[u])<0&&Object.prototype.propertyIsEnumerable.call(n,o[u])&&(s[o[u]]=n[o[u]]);return s}function JN(n,a,s){if(s||arguments.length===2)for(var o=0,u=a.length,h;o<u;o++)(h||!(o in a))&&(h||(h=Array.prototype.slice.call(a,0,o)),h[o]=a[o]);return n.concat(h||Array.prototype.slice.call(a))}var Wo="right-scroll-bar-position",Io="width-before-scroll-bar",WN="with-scroll-bars-hidden",IN="--removed-body-scroll-bar-size";function pd(n,a){return typeof n=="function"?n(a):n&&(n.current=a),n}function eD(n,a){var s=S.useState(function(){return{value:n,callback:a,facade:{get current(){return s.value},set current(o){var u=s.value;u!==o&&(s.value=o,s.callback(o,u))}}}})[0];return s.callback=a,s.facade}var tD=typeof window<"u"?S.useLayoutEffect:S.useEffect,Lv=new WeakMap;function nD(n,a){var s=eD(null,function(o){return n.forEach(function(u){return pd(u,o)})});return tD(function(){var o=Lv.get(s);if(o){var u=new Set(o),h=new Set(n),f=s.current;u.forEach(function(m){h.has(m)||pd(m,null)}),h.forEach(function(m){u.has(m)||pd(m,f)})}Lv.set(s,n)},[n]),s}function rD(n){return n}function aD(n,a){a===void 0&&(a=rD);var s=[],o=!1,u={read:function(){if(o)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return s.length?s[s.length-1]:n},useMedium:function(h){var f=a(h,o);return s.push(f),function(){s=s.filter(function(m){return m!==f})}},assignSyncMedium:function(h){for(o=!0;s.length;){var f=s;s=[],f.forEach(h)}s={push:function(m){return h(m)},filter:function(){return s}}},assignMedium:function(h){o=!0;var f=[];if(s.length){var m=s;s=[],m.forEach(h),f=s}var p=function(){var v=f;f=[],v.forEach(h)},g=function(){return Promise.resolve().then(p)};g(),s={push:function(v){f.push(v),g()},filter:function(v){return f=f.filter(v),s}}}};return u}function iD(n){n===void 0&&(n={});var a=aD(null);return a.options=yn({async:!0,ssr:!1},n),a}var z0=function(n){var a=n.sideCar,s=O0(n,["sideCar"]);if(!a)throw new Error("Sidecar: please provide `sideCar` property to import the right car");var o=a.read();if(!o)throw new Error("Sidecar medium not found");return S.createElement(o,yn({},s))};z0.isSideCarExport=!0;function sD(n,a){return n.useMedium(a),z0}var _0=iD(),gd=function(){},Dl=S.forwardRef(function(n,a){var s=S.useRef(null),o=S.useState({onScrollCapture:gd,onWheelCapture:gd,onTouchMoveCapture:gd}),u=o[0],h=o[1],f=n.forwardProps,m=n.children,p=n.className,g=n.removeScrollBar,v=n.enabled,x=n.shards,b=n.sideCar,E=n.noRelative,j=n.noIsolation,N=n.inert,C=n.allowPinchZoom,k=n.as,D=k===void 0?"div":k,V=n.gapMode,R=O0(n,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noRelative","noIsolation","inert","allowPinchZoom","as","gapMode"]),B=b,Y=nD([s,a]),A=yn(yn({},R),u);return S.createElement(S.Fragment,null,v&&S.createElement(B,{sideCar:_0,removeScrollBar:g,shards:x,noRelative:E,noIsolation:j,inert:N,setCallbacks:h,allowPinchZoom:!!C,lockRef:s,gapMode:V}),f?S.cloneElement(S.Children.only(m),yn(yn({},A),{ref:Y})):S.createElement(D,yn({},A,{className:p,ref:Y}),m))});Dl.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};Dl.classNames={fullWidth:Io,zeroRight:Wo};var oD=function(){if(typeof __webpack_nonce__<"u")return __webpack_nonce__};function lD(){if(!document)return null;var n=document.createElement("style");n.type="text/css";var a=oD();return a&&n.setAttribute("nonce",a),n}function cD(n,a){n.styleSheet?n.styleSheet.cssText=a:n.appendChild(document.createTextNode(a))}function uD(n){var a=document.head||document.getElementsByTagName("head")[0];a.appendChild(n)}var dD=function(){var n=0,a=null;return{add:function(s){n==0&&(a=lD())&&(cD(a,s),uD(a)),n++},remove:function(){n--,!n&&a&&(a.parentNode&&a.parentNode.removeChild(a),a=null)}}},fD=function(){var n=dD();return function(a,s){S.useEffect(function(){return n.add(a),function(){n.remove()}},[a&&s])}},V0=function(){var n=fD(),a=function(s){var o=s.styles,u=s.dynamic;return n(o,u),null};return a},hD={left:0,top:0,right:0,gap:0},yd=function(n){return parseInt(n||"",10)||0},mD=function(n){var a=window.getComputedStyle(document.body),s=a[n==="padding"?"paddingLeft":"marginLeft"],o=a[n==="padding"?"paddingTop":"marginTop"],u=a[n==="padding"?"paddingRight":"marginRight"];return[yd(s),yd(o),yd(u)]},pD=function(n){if(n===void 0&&(n="margin"),typeof window>"u")return hD;var a=mD(n),s=document.documentElement.clientWidth,o=window.innerWidth;return{left:a[0],top:a[1],right:a[2],gap:Math.max(0,o-s+a[2]-a[0])}},gD=V0(),Ha="data-scroll-locked",yD=function(n,a,s,o){var u=n.left,h=n.top,f=n.right,m=n.gap;return s===void 0&&(s="margin"),`
  .`.concat(WN,` {
   overflow: hidden `).concat(o,`;
   padding-right: `).concat(m,"px ").concat(o,`;
  }
  body[`).concat(Ha,`] {
    overflow: hidden `).concat(o,`;
    overscroll-behavior: contain;
    `).concat([a&&"position: relative ".concat(o,";"),s==="margin"&&`
    padding-left: `.concat(u,`px;
    padding-top: `).concat(h,`px;
    padding-right: `).concat(f,`px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(m,"px ").concat(o,`;
    `),s==="padding"&&"padding-right: ".concat(m,"px ").concat(o,";")].filter(Boolean).join(""),`
  }
  
  .`).concat(Wo,` {
    right: `).concat(m,"px ").concat(o,`;
  }
  
  .`).concat(Io,` {
    margin-right: `).concat(m,"px ").concat(o,`;
  }
  
  .`).concat(Wo," .").concat(Wo,` {
    right: 0 `).concat(o,`;
  }
  
  .`).concat(Io," .").concat(Io,` {
    margin-right: 0 `).concat(o,`;
  }
  
  body[`).concat(Ha,`] {
    `).concat(IN,": ").concat(m,`px;
  }
`)},Uv=function(){var n=parseInt(document.body.getAttribute(Ha)||"0",10);return isFinite(n)?n:0},vD=function(){S.useEffect(function(){return document.body.setAttribute(Ha,(Uv()+1).toString()),function(){var n=Uv()-1;n<=0?document.body.removeAttribute(Ha):document.body.setAttribute(Ha,n.toString())}},[])},xD=function(n){var a=n.noRelative,s=n.noImportant,o=n.gapMode,u=o===void 0?"margin":o;vD();var h=S.useMemo(function(){return pD(u)},[u]);return S.createElement(gD,{styles:yD(h,!a,u,s?"":"!important")})},af=!1;if(typeof window<"u")try{var Lo=Object.defineProperty({},"passive",{get:function(){return af=!0,!0}});window.addEventListener("test",Lo,Lo),window.removeEventListener("test",Lo,Lo)}catch{af=!1}var Ra=af?{passive:!1}:!1,bD=function(n){return n.tagName==="TEXTAREA"},B0=function(n,a){if(!(n instanceof Element))return!1;var s=window.getComputedStyle(n);return s[a]!=="hidden"&&!(s.overflowY===s.overflowX&&!bD(n)&&s[a]==="visible")},SD=function(n){return B0(n,"overflowY")},wD=function(n){return B0(n,"overflowX")},Hv=function(n,a){var s=a.ownerDocument,o=a;do{typeof ShadowRoot<"u"&&o instanceof ShadowRoot&&(o=o.host);var u=L0(n,o);if(u){var h=U0(n,o),f=h[1],m=h[2];if(f>m)return!0}o=o.parentNode}while(o&&o!==s.body);return!1},jD=function(n){var a=n.scrollTop,s=n.scrollHeight,o=n.clientHeight;return[a,s,o]},ED=function(n){var a=n.scrollLeft,s=n.scrollWidth,o=n.clientWidth;return[a,s,o]},L0=function(n,a){return n==="v"?SD(a):wD(a)},U0=function(n,a){return n==="v"?jD(a):ED(a)},TD=function(n,a){return n==="h"&&a==="rtl"?-1:1},CD=function(n,a,s,o,u){var h=TD(n,window.getComputedStyle(a).direction),f=h*o,m=s.target,p=a.contains(m),g=!1,v=f>0,x=0,b=0;do{if(!m)break;var E=U0(n,m),j=E[0],N=E[1],C=E[2],k=N-C-h*j;(j||k)&&L0(n,m)&&(x+=k,b+=j);var D=m.parentNode;m=D&&D.nodeType===Node.DOCUMENT_FRAGMENT_NODE?D.host:D}while(!p&&m!==document.body||p&&(a.contains(m)||a===m));return(v&&Math.abs(x)<1||!v&&Math.abs(b)<1)&&(g=!0),g},Uo=function(n){return"changedTouches"in n?[n.changedTouches[0].clientX,n.changedTouches[0].clientY]:[0,0]},qv=function(n){return[n.deltaX,n.deltaY]},Yv=function(n){return n&&"current"in n?n.current:n},ND=function(n,a){return n[0]===a[0]&&n[1]===a[1]},DD=function(n){return`
  .block-interactivity-`.concat(n,` {pointer-events: none;}
  .allow-interactivity-`).concat(n,` {pointer-events: all;}
`)},AD=0,Oa=[];function MD(n){var a=S.useRef([]),s=S.useRef([0,0]),o=S.useRef(),u=S.useState(AD++)[0],h=S.useState(V0)[0],f=S.useRef(n);S.useEffect(function(){f.current=n},[n]),S.useEffect(function(){if(n.inert){document.body.classList.add("block-interactivity-".concat(u));var N=JN([n.lockRef.current],(n.shards||[]).map(Yv),!0).filter(Boolean);return N.forEach(function(C){return C.classList.add("allow-interactivity-".concat(u))}),function(){document.body.classList.remove("block-interactivity-".concat(u)),N.forEach(function(C){return C.classList.remove("allow-interactivity-".concat(u))})}}},[n.inert,n.lockRef.current,n.shards]);var m=S.useCallback(function(N,C){if("touches"in N&&N.touches.length===2||N.type==="wheel"&&N.ctrlKey)return!f.current.allowPinchZoom;var k=Uo(N),D=s.current,V="deltaX"in N?N.deltaX:D[0]-k[0],R="deltaY"in N?N.deltaY:D[1]-k[1],B,Y=N.target,A=Math.abs(V)>Math.abs(R)?"h":"v";if("touches"in N&&A==="h"&&Y.type==="range")return!1;var q=window.getSelection(),U=q&&q.anchorNode,_=U?U===Y||U.contains(Y):!1;if(_)return!1;var $=Hv(A,Y);if(!$)return!0;if($?B=A:(B=A==="v"?"h":"v",$=Hv(A,Y)),!$)return!1;if(!o.current&&"changedTouches"in N&&(V||R)&&(o.current=B),!B)return!0;var W=o.current||B;return CD(W,C,N,W==="h"?V:R)},[]),p=S.useCallback(function(N){var C=N;if(!(!Oa.length||Oa[Oa.length-1]!==h)){var k="deltaY"in C?qv(C):Uo(C),D=a.current.filter(function(B){return B.name===C.type&&(B.target===C.target||C.target===B.shadowParent)&&ND(B.delta,k)})[0];if(D&&D.should){C.cancelable&&C.preventDefault();return}if(!D){var V=(f.current.shards||[]).map(Yv).filter(Boolean).filter(function(B){return B.contains(C.target)}),R=V.length>0?m(C,V[0]):!f.current.noIsolation;R&&C.cancelable&&C.preventDefault()}}},[]),g=S.useCallback(function(N,C,k,D){var V={name:N,delta:C,target:k,should:D,shadowParent:kD(k)};a.current.push(V),setTimeout(function(){a.current=a.current.filter(function(R){return R!==V})},1)},[]),v=S.useCallback(function(N){s.current=Uo(N),o.current=void 0},[]),x=S.useCallback(function(N){g(N.type,qv(N),N.target,m(N,n.lockRef.current))},[]),b=S.useCallback(function(N){g(N.type,Uo(N),N.target,m(N,n.lockRef.current))},[]);S.useEffect(function(){return Oa.push(h),n.setCallbacks({onScrollCapture:x,onWheelCapture:x,onTouchMoveCapture:b}),document.addEventListener("wheel",p,Ra),document.addEventListener("touchmove",p,Ra),document.addEventListener("touchstart",v,Ra),function(){Oa=Oa.filter(function(N){return N!==h}),document.removeEventListener("wheel",p,Ra),document.removeEventListener("touchmove",p,Ra),document.removeEventListener("touchstart",v,Ra)}},[]);var E=n.removeScrollBar,j=n.inert;return S.createElement(S.Fragment,null,j?S.createElement(h,{styles:DD(u)}):null,E?S.createElement(xD,{noRelative:n.noRelative,gapMode:n.gapMode}):null)}function kD(n){for(var a=null;n!==null;)n instanceof ShadowRoot&&(a=n.host,n=n.host),n=n.parentNode;return a}const RD=sD(_0,MD);var H0=S.forwardRef(function(n,a){return S.createElement(Dl,yn({},n,{ref:a,sideCar:RD}))});H0.classNames=Dl.classNames;var OD=function(n){if(typeof document>"u")return null;var a=Array.isArray(n)?n[0]:n;return a.ownerDocument.body},za=new WeakMap,Ho=new WeakMap,qo={},vd=0,q0=function(n){return n&&(n.host||q0(n.parentNode))},zD=function(n,a){return a.map(function(s){if(n.contains(s))return s;var o=q0(s);return o&&n.contains(o)?o:(console.error("aria-hidden",s,"in not contained inside",n,". Doing nothing"),null)}).filter(function(s){return!!s})},_D=function(n,a,s,o){var u=zD(a,Array.isArray(n)?n:[n]);qo[s]||(qo[s]=new WeakMap);var h=qo[s],f=[],m=new Set,p=new Set(u),g=function(x){!x||m.has(x)||(m.add(x),g(x.parentNode))};u.forEach(g);var v=function(x){!x||p.has(x)||Array.prototype.forEach.call(x.children,function(b){if(m.has(b))v(b);else try{var E=b.getAttribute(o),j=E!==null&&E!=="false",N=(za.get(b)||0)+1,C=(h.get(b)||0)+1;za.set(b,N),h.set(b,C),f.push(b),N===1&&j&&Ho.set(b,!0),C===1&&b.setAttribute(s,"true"),j||b.setAttribute(o,"true")}catch(k){console.error("aria-hidden: cannot operate on ",b,k)}})};return v(a),m.clear(),vd++,function(){f.forEach(function(x){var b=za.get(x)-1,E=h.get(x)-1;za.set(x,b),h.set(x,E),b||(Ho.has(x)||x.removeAttribute(o),Ho.delete(x)),E||x.removeAttribute(s)}),vd--,vd||(za=new WeakMap,za=new WeakMap,Ho=new WeakMap,qo={})}},VD=function(n,a,s){s===void 0&&(s="data-aria-hidden");var o=Array.from(Array.isArray(n)?n:[n]),u=OD(n);return u?(o.push.apply(o,Array.from(u.querySelectorAll("[aria-live], script"))),_D(o,u,s,"aria-hidden")):function(){return null}},BD=Object.defineProperty,tn=(n,a)=>BD(n,"name",{value:a,configurable:!0}),Wf="Dialog",[Y0,BA]=o0(Wf),[LD,wn]=Y0(Wf),ml=tn(n=>{const{__scopeDialog:a,children:s,open:o,defaultOpen:u,onOpenChange:h,modal:f=!0}=n,m=S.useRef(null),p=S.useRef(null),[g,v]=u0({prop:o,defaultProp:u??!1,onChange:h,caller:Wf}),[x,b]=S.useState(0),[E,j]=S.useState(0);return l.jsx(LD,{scope:a,triggerRef:m,contentRef:p,contentId:Jo(),titleId:Jo(),descriptionId:Jo(),titlePresent:x>0,descriptionPresent:E>0,setTitleCount:b,setDescriptionCount:j,open:g,onOpenChange:v,onOpenToggle:S.useCallback(()=>v(N=>!N),[v]),modal:f,children:s})},"Dialog"),P0="DialogPortal",[UD,G0]=Y0(P0,{forceMount:void 0}),pl=tn(n=>{const{__scopeDialog:a,forceMount:s,children:o,container:u}=n,h=wn(P0,a);return l.jsx(UD,{scope:a,forceMount:s,children:S.Children.map(o,f=>l.jsx(Zf,{present:s||h.open,children:l.jsx($N,{asChild:!0,container:u,children:f})}))})},"DialogPortal"),sf="DialogOverlay",gl=S.forwardRef(tn(function(a,s){const o=G0(sf,a.__scopeDialog),{forceMount:u=o.forceMount,...h}=a,f=wn(sf,a.__scopeDialog);return f.modal?l.jsx(Zf,{present:u||f.open,children:l.jsx(qD,{...h,ref:s})}):null},"DialogOverlay")),HD=Ff("DialogOverlay.RemoveScroll"),qD=S.forwardRef(tn(function(a,s){const{__scopeDialog:o,...u}=a,h=wn(sf,o),f=b0(),m=Ka(s,f);return l.jsx(H0,{as:HD,allowPinchZoom:!0,shards:[h.contentRef],children:l.jsx($r.div,{"data-state":If(h.open),...u,ref:m,style:{pointerEvents:"auto",...u.style}})})},"DialogOverlayImpl")),rs="DialogContent",yl=S.forwardRef(tn(function(a,s){const o=G0(rs,a.__scopeDialog),{forceMount:u=o.forceMount,...h}=a,f=wn(rs,a.__scopeDialog);return l.jsx(Zf,{present:u||f.open,children:f.modal?l.jsx(YD,{...h,ref:s}):l.jsx(PD,{...h,ref:s})})},"DialogContent")),YD=S.forwardRef(tn(function(a,s){const o=wn(rs,a.__scopeDialog),u=S.useRef(null),h=Ka(s,o.contentRef,u);return S.useEffect(()=>{const f=u.current;if(f)return VD(f)},[]),l.jsx(X0,{...a,ref:h,trapFocus:o.open,disableOutsidePointerEvents:o.open,onCloseAutoFocus:yr(a.onCloseAutoFocus,f=>{var m;f.preventDefault(),(m=o.triggerRef.current)==null||m.focus()}),onPointerDownOutside:yr(a.onPointerDownOutside,f=>{const m=f.detail.originalEvent,p=m.button===0&&m.ctrlKey===!0;(m.button===2||p)&&f.preventDefault()}),onFocusOutside:yr(a.onFocusOutside,f=>f.preventDefault())})},"DialogContentModal")),PD=S.forwardRef(tn(function(a,s){const o=wn(rs,a.__scopeDialog),u=S.useRef(!1),h=S.useRef(!1);return l.jsx(X0,{...a,ref:s,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:f=>{var m,p;(m=a.onCloseAutoFocus)==null||m.call(a,f),f.defaultPrevented||(u.current||(p=o.triggerRef.current)==null||p.focus(),f.preventDefault()),u.current=!1,h.current=!1},onInteractOutside:f=>{var g,v;(g=a.onInteractOutside)==null||g.call(a,f),f.defaultPrevented||(u.current=!0,f.detail.originalEvent.type==="pointerdown"&&(h.current=!0));const m=f.target;((v=o.triggerRef.current)==null?void 0:v.contains(m))&&f.preventDefault(),f.detail.originalEvent.type==="focusin"&&h.current&&f.preventDefault()}})},"DialogContentNonModal")),X0=S.forwardRef(tn(function(a,s){const{__scopeDialog:o,trapFocus:u,onOpenAutoFocus:h,onCloseAutoFocus:f,...m}=a,p=wn(rs,o);return Jf(),l.jsx(l.Fragment,{children:l.jsx(GN,{asChild:!0,loop:!0,trapped:u,onMountAutoFocus:h,onUnmountAutoFocus:f,children:l.jsx(qN,{role:"dialog",id:p.contentId,"aria-describedby":p.descriptionPresent?p.descriptionId:void 0,"aria-labelledby":p.titlePresent?p.titleId:void 0,"data-state":If(p.open),...m,ref:s,deferPointerDownOutside:!0,onDismiss:()=>p.onOpenChange(!1)})})})},"DialogContentImpl")),GD="DialogTitle",vl=S.forwardRef(tn(function(a,s){const{__scopeDialog:o,...u}=a,h=wn(GD,o),{setTitleCount:f}=h;return br(()=>(f(m=>m+1),()=>f(m=>m-1)),[f]),l.jsx($r.h2,{id:h.titleId,...u,ref:s})},"DialogTitle")),XD="DialogDescription",xl=S.forwardRef(tn(function(a,s){const{__scopeDialog:o,...u}=a,h=wn(XD,o),{setDescriptionCount:f}=h;return br(()=>(f(m=>m+1),()=>f(m=>m-1)),[f]),l.jsx($r.p,{id:h.descriptionId,...u,ref:s})},"DialogDescription")),FD="DialogClose",bl=S.forwardRef(tn(function(a,s){const{__scopeDialog:o,...u}=a,h=wn(FD,o);return l.jsx($r.button,{type:"button",...u,ref:s,onClick:yr(a.onClick,()=>h.onOpenChange(!1))})},"DialogClose"));function If(n){return n?"open":"closed"}tn(If,"getState");function $D({onCreated:n,onBack:a,onCancel:s}){const[o,u]=S.useState(2),[h,f]=S.useState("日报任务"),[m,p]=S.useState("17:30"),[g,v]=S.useState(!1),[x,b]=S.useState("");async function E(){v(!0),b("");try{const j=await ye("daily.create",{name:h.trim(),sendTime:m});await n(j)}catch(j){b(j instanceof Error?j.message:String(j))}finally{v(!1)}}return l.jsxs(l.Fragment,{children:[l.jsx(KD,{current:o}),x&&l.jsx("div",{className:"notice error",role:"alert",children:l.jsxs("div",{children:[l.jsx("strong",{children:"创建失败"}),l.jsx("span",{children:x})]})}),o===2?l.jsxs("div",{className:"automation-create-step",children:[l.jsxs("div",{children:[l.jsx("h3",{children:"基本信息"}),l.jsx("p",{children:"名称用于在自动化任务列表中识别这份日报。"})]}),l.jsxs("label",{children:["任务名称",l.jsx("input",{value:h,autoFocus:!0,onChange:j=>f(j.target.value)})]}),l.jsxs("div",{className:"dialog-actions",children:[l.jsxs("button",{className:"ghost",onClick:a,children:[l.jsx(ns,{}),"返回选择类型"]}),l.jsx("button",{className:"primary",disabled:!h.trim(),onClick:()=>u(3),children:"下一步"})]})]}):l.jsxs("div",{className:"automation-create-step",children:[l.jsxs("div",{children:[l.jsx("h3",{children:"日报必要配置"}),l.jsx("p",{children:"先确定每天的发送时间；消息字段和测试发送在创建后的专用 Tab 中完成。"})]}),l.jsxs("label",{children:["每天发送时间",l.jsx("input",{type:"time",value:m,onChange:j=>p(j.target.value)})]}),l.jsxs("div",{className:"automation-create-summary",children:[l.jsx("span",{children:"任务类型"}),l.jsx("strong",{children:"日报推送"}),l.jsx("span",{children:"创建后继续"}),l.jsx("strong",{children:"消息内容 → 预览与测试"})]}),l.jsxs("div",{className:"dialog-actions",children:[l.jsxs("button",{className:"ghost",disabled:g,onClick:()=>u(2),children:[l.jsx(ns,{}),"上一步"]}),l.jsx("button",{className:"secondary",disabled:g,onClick:s,children:"取消"}),l.jsxs("button",{className:"primary",disabled:g||!m,onClick:E,children:[g&&l.jsx(Sn,{className:"spin"}),"创建任务"]})]})]})]})}function KD({current:n}){return l.jsxs("ol",{className:"automation-create-progress","aria-label":"新建任务进度",children:[l.jsx("li",{className:"done",children:"1 选择类型"}),l.jsx("li",{className:n===2?"current":"done",children:"2 基本信息"}),l.jsx("li",{className:n===3?"current":"",children:"3 必要配置"})]})}function ZD({onCreated:n,onBack:a,onCancel:s}){const[o,u]=S.useState(2),[h,f]=S.useState("原材料入库自动填报"),[m,p]=S.useState(""),[g,v]=S.useState(""),[x,b]=S.useState(""),[E,j]=S.useState(!1),[N,C]=S.useState("");async function k(){j(!0),C("");try{const D=await ye("notionFill.create",{name:h.trim(),sourcePageUrl:m.trim(),username:g.trim(),password:x});await n(D)}catch(D){C(D instanceof Error?D.message:String(D))}finally{j(!1)}}return l.jsxs(l.Fragment,{children:[l.jsx(QD,{current:o}),N&&l.jsx("div",{className:"notice error",role:"alert",children:l.jsxs("div",{children:[l.jsx("strong",{children:"创建失败"}),l.jsx("span",{children:N})]})}),o===2?l.jsxs("div",{className:"automation-create-step",children:[l.jsxs("div",{children:[l.jsx("h3",{children:"基本信息"}),l.jsx("p",{children:"名称用于在自动化任务列表中识别这份填报任务。"})]}),l.jsxs("label",{children:["任务名称",l.jsx("input",{value:h,autoFocus:!0,onChange:D=>f(D.target.value)})]}),l.jsxs("div",{className:"dialog-actions",children:[l.jsxs("button",{className:"ghost",onClick:a,children:[l.jsx(ns,{}),"返回选择类型"]}),l.jsx("button",{className:"primary",disabled:!h.trim(),onClick:()=>u(3),children:"下一步"})]})]}):l.jsxs("div",{className:"automation-create-step",children:[l.jsxs("div",{children:[l.jsx("h3",{children:"93 系统连接"}),l.jsx("p",{children:"凭据只归 NotionFill 任务所有，并使用现有 Windows 加密存储。"})]}),l.jsxs("label",{children:["材料入库业务页面",l.jsx("input",{type:"url",value:m,placeholder:"http://服务器/业务页面",autoFocus:!0,onChange:D=>p(D.target.value)})]}),l.jsxs("label",{children:["93 系统用户名",l.jsx("input",{value:g,autoComplete:"username",onChange:D=>v(D.target.value)})]}),l.jsxs("label",{children:["93 系统密码",l.jsx("input",{type:"password",value:x,autoComplete:"new-password",onChange:D=>b(D.target.value)})]}),l.jsxs("div",{className:"automation-create-summary",children:[l.jsx("span",{children:"填报目标"}),l.jsx("strong",{children:"原材料入库数据库"}),l.jsx("span",{children:"执行时间"}),l.jsx("strong",{children:"每天 00:00 · 填报前一天"}),l.jsx("span",{children:"写入方式"}),l.jsx("strong",{children:"按日期查重，仅新增"})]}),l.jsxs("div",{className:"dialog-actions",children:[l.jsxs("button",{className:"ghost",disabled:E,onClick:()=>u(2),children:[l.jsx(ns,{}),"上一步"]}),l.jsx("button",{className:"secondary",disabled:E,onClick:s,children:"取消"}),l.jsxs("button",{className:"primary",disabled:E||!m.trim()||!g.trim()||!x,onClick:k,children:[E&&l.jsx(Sn,{className:"spin"}),"创建任务"]})]})]})]})}function QD({current:n}){return l.jsxs("ol",{className:"automation-create-progress","aria-label":"新建任务进度",children:[l.jsx("li",{className:"done",children:"1 选择类型"}),l.jsx("li",{className:n===2?"current":"done",children:"2 基本信息"}),l.jsx("li",{className:n===3?"current":"",children:"3 必要配置"})]})}const JD=[["cutting","下料量"],["welding","装焊量"],["section","型材入库量"],["plate","板材入库量"]],Pv={nameBox:"左上角显示单元格地址的输入框",valueBox:"显示单元格内容的编辑区",sheetTabs:"底部工作表标签",activeSheet:"当前选中的工作表标签"},WD={cuttingDate:"下料日期",weldingDate:"装焊日期",sectionDate:"型材日期",plateDate:"板材日期（合并格左上角）",cuttingCompany:"下料公司",weldingCompany:"装焊公司",park:"入库园区",sectionType:"型材表头",plateType:"板材表头"},Sl=n=>n instanceof Error?n.message:String(n);function ID({onCreated:n,onCancel:a}){var x;const[s,o]=S.useState({documentUrl:""}),[u,h]=S.useState(!1),[f,m]=S.useState(!1),[p,g]=S.useState("");S.useEffect(()=>{ye("tencentSheet.defaults").then(b=>{o(b.config),h(b.imported)}).catch(b=>g(Sl(b)))},[]);async function v(){m(!0),g("");try{await n(await ye("tencentSheet.create",{config:s}))}catch(b){g(Sl(b))}finally{m(!1)}}return l.jsxs("div",{className:"automation-create-step",children:[l.jsxs("div",{children:[l.jsx("h3",{children:"连接生产填报文档"}),l.jsx("p",{children:u?"已找到你在 Demo 中保存的配置，将直接复用。":"粘贴文档分享链接，下一步打开文档并识别填报位置。"})]}),l.jsxs("label",{children:["文档分享链接",l.jsx("input",{type:"url",value:s.documentUrl||"",onChange:b=>o({...s,documentUrl:b.target.value}),placeholder:"粘贴腾讯文档或企业微信文档链接"})]}),p&&l.jsx("p",{role:"alert",children:p}),l.jsxs("div",{className:"dialog-actions",children:[l.jsx("button",{className:"secondary",disabled:f,onClick:a,children:"取消"}),l.jsxs("button",{className:"primary",disabled:f||!((x=s.documentUrl)!=null&&x.trim()),onClick:v,children:[f&&l.jsx(Sn,{className:"spin"}),"创建并配置"]})]})]})}function eA({id:n,changed:a}){const[s,o]=S.useState(),[u,h]=S.useState(""),[f,m]=S.useState(""),[p,g]=S.useState(!1),[v,x]=S.useState([]),[b,E]=S.useState([]),[j,N]=S.useState(!1),[C,k]=S.useState(""),[D,V]=S.useState({cutting:"",welding:"",section:"",plate:""}),[R,B]=S.useState(),[Y,A]=S.useState(!1),q=()=>ye("tencentSheet.get",{id:n}).then(o);S.useEffect(()=>{q().catch(Z=>{g(!0),m(Sl(Z))})},[n]);async function U(Z,ce){h(Z),m(""),g(!1);try{await ce()}catch(L){g(!0),m(Sl(L))}finally{h("")}}function _(Z){o(ce=>ce&&{...ce,config:Z}),A(!0),B(void 0)}async function $(){if(!s)return;const Z=await ye("tencentSheet.save",{id:n,config:s.config});o(Z),A(!1),B(void 0),a()}async function W(Z,ce){Y&&await $(),B(void 0);const L=await ye(`tencentSheet.${Z}`,{id:n,key:ce},3e5);m(L.message),L.sheets&&x(L.sheets),L.missing&&E(L.missing),Z==="pick"&&ce&&E(se=>se.filter(Q=>Q!==ce)),await q()}if(!s)return l.jsx("div",{className:"notice",role:"status",children:f||"正在读取填报配置…"});const le=s.config;return l.jsxs("div",{className:"tencent-sheet-workbench","aria-busy":!!u,children:[l.jsxs("div",{className:"tencent-sheet-intro",children:[l.jsxs("div",{children:[l.jsx("h2",{children:"腾讯文档生产填报"}),l.jsx("p",{children:"连接一次，检查本次数据，再确认填报。目标格已有内容时会停止。"})]}),l.jsx("span",{children:"Development 测试"})]}),f&&l.jsx("div",{className:`notice ${p?"error":"info"}`,role:p?"alert":"status",children:l.jsxs("div",{children:[l.jsx("strong",{children:p?"操作未完成":"操作结果"}),l.jsx("span",{children:f})]})}),l.jsxs("fieldset",{disabled:!!u,className:"tencent-sheet-panel",children:[l.jsx("legend",{children:"1 · 连接文档"}),l.jsxs("label",{children:["文档链接",l.jsx("input",{type:"url",value:le.documentUrl,onChange:Z=>_({...le,documentUrl:Z.target.value})})]}),l.jsxs("div",{className:"tencent-sheet-actions",children:[l.jsx("button",{className:"secondary",onClick:()=>U("打开文档",()=>W("open")),children:"打开文档 / 扫码登录"}),l.jsx("button",{className:"primary",onClick:()=>U("识别页面",()=>W("recognize")),children:"识别并检查"})]}),l.jsx("p",{className:"tencent-sheet-help",children:"首次使用扫码登录。识别过程只获取网页控件位置，不填写数据。"}),b.length>0&&l.jsxs("div",{className:"tencent-sheet-guidance",children:[l.jsx("strong",{children:"按提示点选，程序会记住位置"}),b.map(Z=>l.jsxs("div",{children:[l.jsx("span",{children:Pv[Z]}),l.jsx("button",{className:"secondary",onClick:()=>U("选取控件",()=>W("pick",Z)),children:"去网页点一下"})]},Z))]}),v.length>0&&l.jsxs("label",{children:["工作表",l.jsxs("select",{defaultValue:"",onChange:Z=>{const ce=Z.target.value;ce&&_({...le,sheetPattern:ce.replace(/(\d{2}|\d{4})年\d{1,2}月/,(L,se)=>`${se.length===4?"{yyyy}":"{yy}"}年{M}月`)})},children:[l.jsx("option",{value:"",children:"选择月份工作表"}),v.map(Z=>l.jsx("option",{children:Z},Z))]})]}),l.jsxs("p",{className:"tencent-sheet-help",children:["填报范围：",le.company," / ",le.park,"。工作表月份随业务日期自动切换。"]}),l.jsxs("details",{children:[l.jsx("summary",{children:"调整模板与高级设置"}),l.jsxs("div",{className:"tencent-sheet-grid",children:[[["sheetPattern","月份工作表名称"],["company","公司"],["park","园区"],["startColumn","1 日起始列"]].map(([Z,ce])=>l.jsxs("label",{children:[ce,l.jsx("input",{value:le[Z],onChange:L=>_({...le,[Z]:L.target.value})})]},Z)),[["cuttingRow","下料行"],["weldingRow","装焊行"],["inboundRow","入库行"]].map(([Z,ce])=>l.jsxs("label",{children:[ce,l.jsx("input",{type:"number",min:"1",value:le[Z],onChange:L=>_({...le,[Z]:Number(L.target.value)})})]},Z)),Object.entries(le.adapter.anchors).map(([Z,ce])=>l.jsxs("label",{children:[WD[Z]||Z,l.jsx("input",{value:ce.address,onChange:L=>_({...le,adapter:{...le.adapter,anchors:{...le.adapter.anchors,[Z]:{...ce,address:L.target.value}}}})})]},Z)),Object.entries(Pv).map(([Z,ce])=>l.jsxs("label",{children:[ce," · CSS",l.jsx("input",{value:String(le.adapter[Z]||""),onChange:L=>_({...le,adapter:{...le.adapter,[Z]:L.target.value}})})]},Z))]})]}),Y&&l.jsx("button",{className:"primary",onClick:()=>U("保存配置",async()=>{await $(),m("配置已保存，请重新检查本次数据。")}),children:"保存配置"})]}),l.jsxs("fieldset",{disabled:!!u,className:"tencent-sheet-panel",children:[l.jsx("legend",{children:"2 · 本次填报数据"}),l.jsxs("label",{className:"tencent-sheet-date-mode",children:[l.jsx("input",{type:"checkbox",checked:j,onChange:Z=>{N(Z.target.checked),B(void 0)}}),"指定补填日期"]}),j?l.jsx(xn,{label:"业务日期",disabled:!!u,value:C,onChange:Z=>{k(Z),B(void 0)}}):l.jsx("p",{children:"默认填报前一天，按北京时间计算。"}),l.jsx("div",{className:"tencent-sheet-grid",children:JD.map(([Z,ce])=>l.jsxs("label",{children:[ce,"（吨）",l.jsx("input",{type:"number",min:"0",step:"any",inputMode:"decimal",value:D[Z],placeholder:"输入本次实际数据",onChange:L=>{V({...D,[Z]:L.target.value}),B(void 0)}})]},Z))}),l.jsx("button",{className:"primary",disabled:Y||j&&!C||Object.values(D).some(Z=>Z.trim()===""),onClick:()=>U("检查填报位置",async()=>{B(void 0);const Z=await ye("tencentSheet.inspect",{id:n,values:D,businessDate:j?C:void 0},3e5);B(Z),m(Z.message),a()}),children:"检查本次数据与位置"})]}),R&&l.jsxs("section",{className:"tencent-sheet-panel",children:[l.jsx("h3",{children:"3 · 确认填报"}),l.jsxs("p",{children:[R.date," · ",R.sheet]}),l.jsx("div",{className:"tencent-sheet-table",children:l.jsxs("table",{children:[l.jsx("thead",{children:l.jsxs("tr",{children:[l.jsx("th",{children:"项目"}),l.jsx("th",{children:"位置"}),l.jsx("th",{children:"原内容"}),l.jsx("th",{children:"本次填报（吨）"})]})}),l.jsx("tbody",{children:R.rows.map(Z=>l.jsxs("tr",{children:[l.jsx("td",{children:Z.label}),l.jsx("td",{children:Z.address}),l.jsx("td",{children:Z.current||"空白"}),l.jsx("td",{children:Z.value})]},Z.address))})]})}),l.jsx("p",{children:R.conflict?"目标格已有内容，本次不可写入。":"将仅填写以上空白单元格。确认有效期为 2 分钟。"}),l.jsx("button",{className:"primary",disabled:!!u||!R.token||R.conflict,onClick:()=>U("填报并确认保存",async()=>{const Z=R;B(void 0);const ce=await ye("tencentSheet.write",{id:n,values:D,businessDate:Z.date,token:Z.token},31e4);m(ce.message),a()}),children:"确认填报以上 4 项"})]}),u&&l.jsxs("p",{role:"status",className:"tencent-sheet-progress",children:[l.jsx(Sn,{className:"spin"}),u,"… 请等待操作结束"]})]})}const F0=[{taskType:"tencent_sheet_fill",name:"腾讯文档填报",includeBasics:!1,description:"连接生产月报，检查位置后填写下料、装焊与材料入库数据。",renderCreate:n=>l.jsx(ID,{...n}),taskTabs:[{id:"configuration",label:"配置与填报"}],resolveSection:()=>"configuration",issueTitle:()=>"请完成文档连接与位置检查",renderEditor:n=>l.jsx(eA,{id:n.id,changed:n.changed}),loadRuns:n=>ye("tencentSheet.runs",{id:n}).then(({runs:a})=>a.map(s=>({...s,title:s.businessDate,details:s.message?[s.message]:[]})))},{taskType:"daily_report",name:"日报推送",description:"查询日报数据、生成消息并发送钉钉。",renderCreate:n=>l.jsx($D,{...n}),taskTabs:[{id:"configuration",label:"任务配置"},{id:"execution",label:"运行与测试"}],resolveSection:n=>n==="basics"?"basics":n==="template"?"configuration":"execution",issueTitle:n=>n==="notification"?"通知渠道未就绪":n==="template"?"日报配置尚未验证":"基本信息不完整",renderEditor:n=>l.jsx(t0,{id:n.id,back:()=>n.navigate("list"),changed:n.changed,openSettings:n.openSettings}),loadRuns:n=>ye("daily.runs",{id:n}).then(({runs:a})=>a.map(s=>({id:s.id,time:s.time,source:s.source,status:s.status,title:s.textSummary||`业务日期 ${s.businessDate||"—"}`,details:[`业务日期：${s.businessDate||"—"}`,`阶段：${s.stage}`,`尝试：${s.attempts}`],error:s.error})))},{taskType:"notion_fill",name:"Notion 自动填报",description:"读取 93 系统前一天入库数据并新增到 Notion。",renderCreate:n=>l.jsx(ZD,{...n}),taskTabs:[{id:"configuration",label:"任务配置"},{id:"execution",label:"运行与测试"}],resolveSection:n=>n==="basics"?"basics":n==="test"?"execution":"configuration",issueTitle:n=>n==="connection"?"93 系统连接未就绪":n==="target"?"Notion 填报目标未就绪":n==="test"?"任务尚未完成只读测试":"基本信息不完整",renderEditor:n=>l.jsx(n0,{id:n.id,back:()=>n.navigate("list"),changed:n.changed,openSettings:n.openSettings}),loadRuns:n=>ye("notionFill.runs",{id:n}).then(({runs:a})=>a.map(s=>({id:s.id,time:s.time,source:s.source==="source-test"?"93读取测试":s.source==="test"?"只读测试":s.source==="manual"?"手动执行":"自动执行",status:s.status==="created"?"已新增":s.status==="checked"?"已检查":"失败",title:`${s.businessDate} · 板材 ${s.plateWeight.toLocaleString("zh-CN",{maximumFractionDigits:3})} 吨 · 型材 ${s.sectionWeight.toLocaleString("zh-CN",{maximumFractionDigits:3})} 吨`,details:[s.message].filter(Boolean),error:s.error})))}];function Gv(n){return F0.find(a=>a.taskType===n)}const xd=n=>({tone:"error",title:"操作失败",message:n instanceof Error?n.message:String(n)});function tA({openSettings:n}){var U;const[a,s]=S.useState([]),[o,u]=S.useState(),[h,f]=S.useState(""),[m,p]=S.useState(""),[g,v]=S.useState(),[x,b]=S.useState(),[E,j]=S.useState(),[N,C]=S.useState(!1),[k,D]=S.useState(""),[V,R]=S.useState(["daily_report","notion_fill"]),B=()=>ye("automation.list").then(_=>{_.availableTaskTypes&&R(_.availableTaskTypes);const $=Array.isArray(_.tasks)?_.tasks:a;return s($),u(W=>W&&($.find(le=>le.taskType===W.taskType&&le.id===W.id)||W)),$});S.useEffect(()=>{B().catch(_=>v(xd(_)))},[]),S.useEffect(()=>{if(!x)return;const _=()=>b(void 0),$=W=>W.key==="Escape"&&_();return window.addEventListener("pointerdown",_),window.addEventListener("keydown",$),window.addEventListener("blur",_),()=>{window.removeEventListener("pointerdown",_),window.removeEventListener("keydown",$),window.removeEventListener("blur",_)}},[x]);async function Y(_,$){const W=await B();C(!1),D(""),u(W.find(le=>le.taskType===_&&le.id===$.id))}async function A(_){p(_.id),v(void 0);try{const $=await ye("automation.setEnabled",{taskType:_.taskType,id:_.id,enabled:!_.isEnabled},6e4);$.missingStep?(f($.missingStep),u(_),v({tone:"warning",title:"配置尚未完成",message:$.message||""})):await B()}catch($){v(xd($))}finally{p("")}}async function q(_){if(!_.isEnabled){p(_.id);try{await ye("automation.delete",{taskType:_.taskType,id:_.id}),j(void 0),await B()}catch($){v(xd($))}finally{p("")}}}if(o){const _=Gv(o.taskType);if(_)return l.jsx(nA,{openSettings:n,task:o,definition:_,focusStep:h,notice:g,refresh:B,back:()=>{u(void 0),f(""),v(void 0),B()}})}return l.jsxs("div",{className:"page daily-page automation-list-page",children:[l.jsxs("header",{children:[l.jsxs("div",{children:[l.jsx("h1",{children:"自动化任务"}),l.jsx("p",{children:"管理定时推送与自动填报，查看任务配置和运行情况。"})]}),l.jsx("div",{className:"header-actions",children:l.jsxs("button",{className:"primary",onClick:()=>C(!0),children:[l.jsx(PC,{}),"新建任务"]})})]}),g&&l.jsx("div",{className:`notice ${g.tone}`,role:"status",children:l.jsxs("div",{children:[l.jsx("strong",{children:g.title}),l.jsx("span",{children:g.message})]})}),l.jsxs("section",{className:"daily-job-list","aria-label":"任务列表",children:[a.map(_=>l.jsxs("article",{className:`daily-job-card${["incomplete","pending-test","schedule-error"].includes(_.status)?" needs-attention":""}`,onClick:()=>u(_),onContextMenu:$=>{$.preventDefault(),b({task:_,x:Math.min($.clientX,window.innerWidth-176),y:Math.min($.clientY,window.innerHeight-58)})},children:[l.jsxs("div",{className:"job-copy",children:[l.jsx("h2",{children:l.jsx("button",{type:"button",className:"automation-task-name",onClick:$=>{$.stopPropagation(),u(_)},children:_.name||"未命名任务"})}),l.jsxs("p",{children:[_.taskTypeName," · ",_.schedule," · ",_.connectionStatus]})]}),l.jsxs("div",{className:"job-actions",onClick:$=>$.stopPropagation(),children:[l.jsx("span",{className:`job-status ${_.status}`,children:$0(_.status)}),l.jsxs("label",{className:"switch",children:[l.jsx("input",{type:"checkbox","aria-label":`启用${_.name||"未命名任务"}`,checked:_.isEnabled,disabled:!_.schedulingAvailable||m===_.id,title:_.schedulingAvailable?void 0:"Development 环境默认不启用定时任务",onChange:()=>A(_)}),l.jsx("span",{})]}),l.jsx("button",{type:"button",className:"automation-task-more","aria-label":`${_.name||"未命名任务"}的更多操作`,"aria-haspopup":"menu",onClick:$=>{const W=$.currentTarget.getBoundingClientRect();b({task:_,x:Math.min(W.left,window.innerWidth-176),y:Math.min(W.bottom+4,window.innerHeight-58)})},children:l.jsx(HC,{})})]}),l.jsxs("div",{className:"automation-card-footer",children:["最近运行：",_.lastRun]})]},`${_.taskType}:${_.id}`)),!a.length&&l.jsxs("div",{className:"empty-state",children:[l.jsx(qC,{}),l.jsx("h2",{children:"还没有自动化任务"}),l.jsx("p",{children:"选择一种任务类型，新建后进入对应的专用配置界面。"})]})]}),!!a.length&&l.jsx("p",{className:"automation-list-help",children:"点击任务名称进入配置。日报配置通知后即可开启，执行结果见运行记录。"}),x&&l.jsx("div",{className:"job-context-menu",role:"menu",style:{left:x.x,top:x.y},onPointerDown:_=>_.stopPropagation(),children:l.jsxs("button",{className:"danger-quiet",role:"menuitem",disabled:x.task.isEnabled||m===x.task.id,onClick:()=>{j(x.task),b(void 0)},children:[l.jsx(KC,{}),x.task.isEnabled?"停用后可删除":"删除任务"]})}),l.jsx(ml,{open:!!E,onOpenChange:_=>!_&&j(void 0),children:l.jsxs(pl,{children:[l.jsx(gl,{className:"dialog-overlay"}),l.jsxs(yl,{className:"dialog",children:[l.jsx(vl,{children:"删除自动化任务？"}),l.jsxs(xl,{children:["将删除“",E==null?void 0:E.name,"”及其业务记录，此操作无法撤销。"]}),l.jsxs("div",{className:"dialog-actions",children:[l.jsx("button",{className:"secondary",onClick:()=>j(void 0),children:"取消"}),l.jsx("button",{className:"danger",disabled:!!m,onClick:()=>E&&q(E),children:"确认删除"})]})]})]})}),l.jsx(ml,{open:N,onOpenChange:_=>{C(_),_||D("")},children:l.jsxs(pl,{children:[l.jsx(gl,{className:"dialog-overlay"}),l.jsxs(yl,{className:"dialog automation-create-dialog",children:[l.jsx(vl,{children:"新建自动化任务"}),l.jsx(xl,{children:k?"填写任务信息，创建后可随时通过 Tab 修改。":"先选择任务类型，后续配置由对应任务自己提供。"}),k?(U=Gv(k))==null?void 0:U.renderCreate({onCreated:_=>Y(k,_),onBack:()=>D(""),onCancel:()=>{C(!1),D("")}}):l.jsx("div",{className:"automation-create-types",children:F0.filter(_=>V.includes(_.taskType)).map(_=>l.jsxs("button",{onClick:()=>D(_.taskType),children:[l.jsx("strong",{children:_.name}),l.jsx("span",{children:_.description})]},_.taskType))})]})]})})]})}function nA({openSettings:n,task:a,definition:s,focusStep:o,notice:u,refresh:h,back:f}){const[m,p]=S.useState(o?s.resolveSection(o):s.includeBasics===!1?s.taskTabs[0].id:"basics"),g=a.taskType==="daily_report",[v,x]=S.useState(),[b,E]=S.useState(""),[j,N]=S.useState(!1),C=[...s.includeBasics===!1?[]:[{id:"basics",label:"基本信息"}],...s.taskTabs,{id:"runs",label:"运行记录"}],k=[...a.missingMessage?[{id:`configuration:${a.missingStep||"unknown"}`,title:s.issueTitle(a.missingStep||""),message:a.missingMessage,section:s.resolveSection(a.missingStep||"")}]:[],...a.status==="schedule-error"&&a.schedulerMessage?[{id:"scheduler",title:"计划任务异常",message:a.schedulerMessage,section:"basics"}]:[]];async function D(){N(!0),E("");try{x(await s.loadRuns(a.id))}catch(R){E(R instanceof Error?R.message:String(R))}finally{N(!1)}}S.useEffect(()=>{m==="runs"&&v===void 0&&D()},[m,v]);function V(R,B){var A;if(R.key!=="ArrowLeft"&&R.key!=="ArrowRight")return;R.preventDefault();const Y=(B+(R.key==="ArrowRight"?1:-1)+C.length)%C.length;p(C[Y].id),C[Y].id==="basics"&&h().catch(()=>{}),(A=document.getElementById(`automation-tab-${C[Y].id}`))==null||A.focus()}return g?l.jsx(t0,{id:a.id,back:f,changed:h,openSettings:n}):a.taskType==="notion_fill"?l.jsx(n0,{id:a.id,back:f,changed:h,openSettings:n}):l.jsxs("div",{className:"page daily-page automation-detail",children:[l.jsxs("header",{children:[l.jsxs("div",{children:[l.jsxs("button",{className:"back-link","aria-label":"返回任务列表",onClick:f,children:[l.jsx(ns,{}),"返回任务列表"]}),l.jsx("h1",{title:a.name||"未命名任务",children:a.name||"未命名任务"}),l.jsxs("p",{children:[a.taskTypeName," · ",a.schedule]})]}),l.jsx("span",{className:`job-status ${a.status}`,children:$0(a.status)})]}),l.jsx("div",{className:"automation-tabs",role:"tablist","aria-label":"任务详情",children:C.map((R,B)=>l.jsx("button",{type:"button",role:"tab",id:`automation-tab-${R.id}`,"aria-selected":m===R.id,"aria-controls":`automation-panel-${R.id}`,tabIndex:m===R.id?0:-1,onClick:()=>{p(R.id),R.id==="basics"&&h().catch(()=>{})},onKeyDown:Y=>V(Y,B),children:R.label},R.id))}),l.jsxs("div",{children:[u&&l.jsx("div",{className:`notice ${u.tone}`,role:"status",children:l.jsxs("div",{children:[l.jsx("strong",{children:u.title}),l.jsx("span",{children:u.message})]})}),!!k.length&&l.jsxs("section",{className:"automation-issues","aria-labelledby":"automation-issues-title",children:[l.jsxs("div",{className:"automation-issues-heading",children:[l.jsx(ZC,{}),l.jsxs("div",{children:[l.jsx("h2",{id:"automation-issues-title",children:"配置问题"}),l.jsx("p",{children:"完成以下项目后才能安全启用任务。"})]}),l.jsxs("span",{children:[k.length," 项"]})]}),l.jsx("ul",{children:k.map(R=>{var B;return l.jsxs("li",{children:[l.jsxs("div",{children:[l.jsx("strong",{children:R.title}),l.jsx("span",{children:R.message})]}),l.jsxs("button",{type:"button",onClick:()=>{p(R.section)},children:["前往",((B=C.find(Y=>Y.id===R.section))==null?void 0:B.label)||"处理",l.jsx(OC,{})]})]},R.id)})})]}),l.jsxs("div",{className:"automation-tab-panel",role:"tabpanel",id:`automation-panel-${m}`,"aria-labelledby":`automation-tab-${m}`,children:[l.jsx("div",{hidden:m==="runs",children:s.renderEditor({id:a.id,section:m,openSettings:n,navigate:p,changed:()=>{h().catch(()=>{})}})}),m==="runs"&&l.jsxs("section",{className:"surface automation-runs",children:[l.jsxs("div",{className:"automation-runs-heading",children:[l.jsxs("div",{children:[l.jsx("h2",{children:"运行记录"}),l.jsx("p",{children:"查看任务执行结果和错误详情。"})]}),l.jsxs("button",{className:"secondary",disabled:j,onClick:D,children:[j?l.jsx(Sn,{className:"spin"}):l.jsx(GC,{}),"刷新"]})]}),b&&l.jsx("div",{className:"notice error",role:"alert",children:l.jsxs("div",{children:[l.jsx("strong",{children:"运行记录读取失败"}),l.jsx("span",{children:b})]})}),l.jsx("div",{className:"automation-run-list",children:v==null?void 0:v.map(R=>l.jsxs("details",{children:[l.jsxs("summary",{children:[l.jsx("span",{children:R.time}),l.jsx("span",{children:R.source}),l.jsx("strong",{children:R.title}),l.jsx("b",{className:R.error?"error-text":"",children:R.status})]}),l.jsxs("div",{children:[R.details.map(B=>l.jsx("p",{children:B},B)),R.error&&l.jsxs("p",{className:"run-error",children:["错误：",R.error]})]})]},R.id))}),!j&&v&&!v.length&&l.jsx("p",{className:"automation-empty",children:"暂无运行记录"})]})]})]})]})}function $0(n){return{incomplete:"配置未完成","pending-test":"待测试",checked:"已验证",ready:"可启用",enabled:"已启用","schedule-error":"计划异常"}[n]||n}function Jt({value:n,options:a,placeholder:s,disabled:o,ariaLabel:u,onChange:h}){const[f,m]=S.useState(!1),p=Fb(),g=a.find(v=>v.value===n);return l.jsxs("div",{className:"form-picker",children:[l.jsxs("button",{type:"button",className:`picker-trigger ${f?"open":""}`,disabled:o,"aria-label":u,"aria-haspopup":"listbox","aria-expanded":f,onClick:()=>m(!f),children:[l.jsx("span",{className:g?"":"picker-placeholder",children:(g==null?void 0:g.label)||s}),l.jsx(_C,{})]}),f&&l.jsxs(l.Fragment,{children:[l.jsx("button",{type:"button",className:"picker-backdrop","aria-label":"关闭选项",onClick:()=>m(!1)}),l.jsxs($b.div,{className:"picker-popover choice-popover",role:"listbox",initial:p?!1:{opacity:0,y:-5},animate:{opacity:1,y:0,transitionEnd:{transform:"none"}},transition:{duration:p?0:.12},children:[a.map(v=>l.jsxs("button",{type:"button",role:"option","aria-selected":v.value===n,className:v.value===n?"selected":"",onClick:()=>{h(v.value),m(!1)},children:[l.jsx("span",{children:v.label}),v.value===n&&l.jsx(us,{})]},v.value)),!a.length&&l.jsx("span",{className:"picker-empty",children:"暂无可选项"})]})]})]})}function Xv({value:n,onChange:a,unit:s,className:o="",disabled:u,ariaLabel:h,onKeyDown:f}){return l.jsxs("div",{className:`numeric-input ${o}`.trim(),children:[l.jsx("input",{type:"text",inputMode:"decimal",value:n,disabled:u,"aria-label":h,onChange:m=>a(m.target.value),onKeyDown:f}),s&&l.jsx("span",{children:s})]})}function K0({current:n,titles:a,label:s}){const o=a.map((u,h)=>({number:h+1,title:u}));return l.jsx("div",{className:"step-bar","aria-label":s,children:o.map((u,h)=>{const f=u.number<n?"done":u.number===n?"active":"pending";return l.jsxs(S.Fragment,{children:[l.jsxs("div",{className:`step step-${f}`,"aria-current":f==="active"?"step":void 0,children:[l.jsx("div",{className:`step-circle ${f}`,children:f==="done"?l.jsx(us,{}):u.number}),l.jsx("span",{children:u.title})]}),h<o.length-1&&l.jsx("div",{className:`step-line ${u.number<n?"done":u.number===n?"transition":"pending"}`})]},u.number)})})}const Fv={configured:!1,binding:{bound:!1,name:"",path:""},usesBusinessSections:!1,businessSections:[],sources:[],selected:""};function rA(){const n=new Date;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`}function aA({openSettings:n}){const[a,s]=S.useState(1),[o,u]=S.useState(rA),[h,f]=S.useState(""),[m,p]=S.useState([]),[g,v]=S.useState(Fv),[x,b]=S.useState(!1),[E,j]=S.useState("database"),[N,C]=S.useState(""),[k,D]=S.useState(""),[V,R]=S.useState(!1),[B,Y]=S.useState("state"),[A,q]=S.useState(""),[U,_]=S.useState(""),[$,W]=S.useState(),le=S.useRef(!1),Z=S.useRef(!1);S.useEffect(()=>{ye("weld.getState").then(I=>{var re;const de=I!=null&&I.binding&&Array.isArray(I.sources)?I:Fv;v(de),C(((re=de.sources.find(pe=>pe.id===de.selected))==null?void 0:re.businessSection)||""),D(de.selected)}).catch(I=>q(I instanceof Error?I.message:"读取 Notion 配置失败")).finally(()=>Y(void 0))},[]);const ce=/^\d+$/.test(h)&&Number(h)>0,L=S.useMemo(()=>m.reduce((I,de)=>I+Number(de.qty||0),0),[m]),se=L-Number(h||0),Q=m.length>0&&m.every(I=>/^\d+$/.test(I.qty))&&se===0,X=g.usesBusinessSections?g.sources.filter(I=>I.businessSection===N):g.sources,ae=!!B;async function T(){if(!(!ce||ae)){Y("generate"),q("");try{const I=await ye("weld.generate",{month:o,total:h});p(I.map(de=>({...de,qty:String(de.qty)}))),s(2)}catch(I){q(I instanceof Error?I.message:"拆分失败")}finally{Y(void 0)}}}function O(I,de){de!==""&&!/^\d+$/.test(de)||p(re=>re.map((pe,Ce)=>Ce===I?{...pe,qty:de}:pe))}async function te(){if(!(!k||B)){Y("binding"),q("");try{const I=await ye("weld.saveBinding",{sourceId:k});v(I),D(I.selected),b(!1)}catch(I){q(I instanceof Error?I.message:"绑定失败")}finally{Y(void 0)}}}async function oe(){if(!Q||!g.binding.bound||ae||le.current)return;le.current=!0,Y("check"),q("");const I={month:o,total:h,rows:m.map(de=>({date:de.date,qty:de.qty}))};try{if((await ye("weld.check",I,12e4)).hasExistingData){R(!0);return}await ue(I,!1)}catch(de){q(de instanceof Error?de.message:"Notion 数据检查失败")}finally{le.current=!1,Y(de=>de==="check"?void 0:de)}}async function ue(I,de){if(!Z.current){Z.current=!0,Y("write"),q(""),W(void 0);try{const re=await ye("weld.write",{...I,overwriteExisting:de},12e4,pe=>W(pe));_(re.message),R(!1),s(3)}catch(re){q(re instanceof Error?re.message:"写入 Notion 失败")}finally{Z.current=!1,Y(void 0)}}}function me(){s(1),p([]),f(""),_(""),q(""),W(void 0)}function xe(){var I;ae||(D(g.selected),C(((I=g.sources.find(de=>de.id===g.selected))==null?void 0:I.businessSection)||""),q(""),j("database"),b(!0))}const ie={month:o,total:h,rows:m.map(I=>({date:I.date,qty:I.qty}))};return l.jsx("div",{className:"app-shell",children:l.jsxs("main",{className:"main-content",children:[l.jsxs("header",{className:"content-header",children:[l.jsx("h1",{children:"每日焊接数据模拟"}),l.jsx("button",{type:"button",className:"template-config-button",disabled:ae,"aria-label":"焊接设置",title:"焊接设置",onClick:xe,children:l.jsx(Pf,{})})]}),l.jsxs("div",{className:"production-message-scroll daily-weld-page",children:[l.jsx(K0,{current:a,titles:["录入计划","拆分预览","完成"],label:"焊接计划拆分进度"}),A&&l.jsx("div",{className:"weld-notice error",role:"alert",children:A}),a===1&&l.jsxs("section",{className:"weld-plan-card","aria-labelledby":"weld-plan-title",children:[l.jsx("div",{className:"weld-section-heading",children:l.jsx("h2",{id:"weld-plan-title",children:"计划信息"})}),l.jsxs("div",{className:"weld-fields",children:[l.jsx(xn,{label:"计划月份",value:o,selectionMode:"month",disabled:ae,onChange:u}),l.jsxs("label",{className:"weld-field",children:[l.jsx("span",{children:"计划焊接总量"}),l.jsx(Xv,{value:h,disabled:ae,onChange:I=>{(I===""||/^\d+$/.test(I))&&f(I)},unit:"吨",ariaLabel:"计划焊接总量"})]})]}),l.jsx("div",{className:"weld-actions",children:l.jsx("button",{type:"button",className:"primary-button",disabled:!ce||ae,onClick:T,children:B==="generate"?"正在拆分…":"下一步：拆分预览"})})]}),a===2&&l.jsxs("section",{className:"weld-preview","aria-labelledby":"weld-preview-title",children:[l.jsxs("div",{className:"weld-preview-heading",children:[l.jsxs("div",{children:[l.jsxs("h2",{id:"weld-preview-title",children:[o.replace("-"," 年 ")," 月每日拆分详情"]}),l.jsx("p",{children:"可直接修改任意一天的数值；不满意本次浮动效果可重新模拟。"})]}),l.jsxs("button",{type:"button",className:"secondary",disabled:ae,onClick:T,children:[l.jsx(Zb,{}),"重新模拟浮动"]})]}),l.jsx("div",{className:"weld-table-wrap",children:l.jsxs("table",{children:[l.jsx("thead",{children:l.jsxs("tr",{children:[l.jsx("th",{children:"日期"}),l.jsx("th",{children:"星期"}),l.jsx("th",{children:"类型"}),l.jsx("th",{children:"计划量（吨）"})]})}),l.jsx("tbody",{children:m.map((I,de)=>l.jsxs("tr",{children:[l.jsx("td",{children:I.date}),l.jsx("td",{children:I.weekday}),l.jsx("td",{children:l.jsx("span",{className:`weld-day-pill ${I.isWeekend?"weekend":""}`,children:I.isWeekend?"休息日":"工作日"})}),l.jsx("td",{children:l.jsx(Xv,{value:I.qty,disabled:ae,onChange:re=>O(de,re),unit:"吨",ariaLabel:`${I.date} 计划量`})})]},I.date))})]})}),l.jsxs("div",{className:"weld-summary",children:[l.jsxs("span",{children:["共 ",m.length," 天 · 计划总量 ",l.jsx("strong",{children:h})," 吨"]}),l.jsxs("span",{children:["拆分合计 ",l.jsx("strong",{children:L})," 吨 ",se===0?l.jsx("em",{className:"match",children:"与计划总量一致"}):l.jsxs("em",{className:"mismatch",children:["偏差 ",se>0?"+":"",se," 吨，可手动调整"]})]})]}),B==="write"&&l.jsx("div",{className:"weld-write-progress",role:"status","aria-live":"polite",children:$?`正在写入 ${$.date.slice(0,10)}（${$.current}/${$.total}）`:"正在准备 Notion 层级数据…"}),l.jsxs("div",{className:"weld-actions split",children:[l.jsx("button",{type:"button",className:"secondary",disabled:ae,onClick:()=>s(1),children:"返回修改"}),l.jsx("button",{type:"button",className:"primary-button",disabled:!Q||!g.binding.bound||ae,onClick:oe,children:B==="check"?"正在检查…":B==="write"?"正在写入…":"确认并写入 Notion"})]})]}),a===3&&l.jsxs("section",{className:"complete-view weld-complete",children:[l.jsx("div",{className:"complete-icon",children:l.jsx(us,{})}),l.jsx("h2",{children:"入库完成"}),l.jsx("p",{children:U||`${o} 共 ${m.length} 天的焊接计划数据已写入 Notion。`}),l.jsx("button",{className:"primary-button",onClick:me,children:"拆分下一个月"})]})]}),x&&l.jsx("div",{className:"weld-settings-overlay",children:l.jsxs("section",{className:"weld-settings-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"weld-settings-title",children:[l.jsxs("aside",{className:"weld-settings-nav",children:[l.jsx("h2",{id:"weld-settings-title",children:"焊接设置"}),l.jsxs("nav",{"aria-label":"焊接设置分类",children:[l.jsxs("button",{type:"button",className:E==="rules"?"active":"",onClick:()=>j("rules"),children:[l.jsx($C,{}),"拆分规则"]}),l.jsxs("button",{type:"button",className:E==="database"?"active":"",onClick:()=>j("database"),children:[l.jsx(Kd,{}),"数据库绑定"]})]})]}),l.jsxs("div",{className:"weld-settings-main",children:[l.jsx("button",{type:"button",className:"weld-settings-close","aria-label":"关闭焊接设置",disabled:B==="binding",onClick:()=>b(!1),children:l.jsx(Gf,{})}),E==="rules"?l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"weld-settings-heading",children:[l.jsx("h3",{children:"拆分规则"}),l.jsx("p",{children:"当前规则用于生成每日焊接计划，修改每日数值后仍需保证月度合计一致。"})]}),l.jsxs("dl",{className:"weld-rule-list",children:[l.jsxs("div",{children:[l.jsx("dt",{children:"分配周期"}),l.jsx("dd",{children:"按所选月份的全部自然日"})]}),l.jsxs("div",{children:[l.jsx("dt",{children:"产量浮动"}),l.jsx("dd",{children:"基准量叠加 22% 随机波动"})]}),l.jsxs("div",{children:[l.jsx("dt",{children:"周末权重"}),l.jsx("dd",{children:"周六、周日自动降低计划权重"})]}),l.jsxs("div",{children:[l.jsx("dt",{children:"总量配平"}),l.jsx("dd",{children:"每日取整后自动配平至月度计划"})]})]})]}):l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"weld-settings-heading",children:[l.jsx("h3",{children:"数据库绑定"}),l.jsx("p",{children:"每项业务只绑定一个主写入数据库，汇总数据库由系统自动维护。"})]}),A&&l.jsx("div",{className:"weld-notice error",role:"alert",children:A}),l.jsxs("section",{className:"weld-business-binding","aria-labelledby":"weld-business-title",children:[l.jsxs("div",{className:"weld-business-title",children:[l.jsxs("div",{children:[l.jsx("h4",{id:"weld-business-title",children:"焊接业务"}),l.jsx("p",{children:"每日焊接计划的主写入数据库"})]}),l.jsx("span",{className:g.binding.bound?"bound":"",children:g.binding.bound?"已绑定":"未绑定"})]}),!g.configured||!g.sources.length?l.jsx("div",{className:"weld-notice",children:"请先在系统设置中完成数据库连接并刷新数据源。"}):l.jsxs("div",{className:"weld-dialog-field",children:[g.usesBusinessSections&&l.jsxs(l.Fragment,{children:[l.jsx("span",{children:"业务板块"}),l.jsx(Jt,{value:N,options:g.businessSections.map(I=>({value:I,label:I})),placeholder:"选择焊接业务板块",ariaLabel:"焊接业务板块",disabled:B==="binding",onChange:I=>{C(I),D("")}})]}),l.jsx("span",{children:"主写入数据库"}),l.jsx(Jt,{value:k,options:X.map(I=>({value:I.id,label:I.name})),placeholder:"选择每日焊接量数据库",ariaLabel:"焊接业务主写入数据库",disabled:g.usesBusinessSections&&!N||B==="binding",onChange:D})]}),l.jsx("p",{className:"weld-binding-help",children:"月度和周度汇总数据库由系统在写入时自动维护，无需单独绑定。"})]}),l.jsxs("div",{className:"weld-settings-actions",children:[l.jsx("button",{type:"button",disabled:B==="binding",onClick:()=>b(!1),children:"取消"}),!g.configured||!g.sources.length?l.jsx("button",{type:"button",className:"primary-button",onClick:n,children:"前往系统设置"}):l.jsx("button",{type:"button",className:"primary-button",disabled:!k||B==="binding",onClick:te,children:B==="binding"?"正在检测…":"保存绑定"})]})]})]})]})}),V&&l.jsx("div",{className:"pm-dialog-overlay",children:l.jsxs("section",{className:"pm-dialog weld-confirm-dialog",role:"alertdialog","aria-modal":"true","aria-labelledby":"weld-overwrite-title",children:[l.jsx("h2",{id:"weld-overwrite-title",children:"确认覆盖已有产量"}),l.jsxs("p",{children:[o," 已存在产量数据。继续后将按本次拆分结果覆盖该月每日产量，并更新月、周、日关联。"]}),A&&l.jsx("div",{className:"weld-notice error",role:"alert",children:A}),B==="write"&&l.jsx("div",{className:"weld-write-progress",role:"status","aria-live":"polite",children:$?`正在写入 ${$.date.slice(0,10)}（${$.current}/${$.total}）`:"正在准备 Notion 层级数据…"}),l.jsxs("div",{className:"pm-dialog-actions",children:[l.jsx("button",{type:"button",disabled:B==="write",onClick:()=>R(!1),children:"取消"}),l.jsx("button",{type:"button",className:"primary-button",disabled:B==="write",onClick:()=>ue(ie,!0),children:B==="write"?"正在写入…":"确认覆盖并写入"})]})]})})]})})}const Z0=[{category:"数据文件处理",name:"挂网计划 PDF 导出"},{category:"数据文件处理",name:"生产会资料拆分"},{category:"数据文件处理",name:"文件统计汇总"},{category:"数据同步",name:"每日焊接数据模拟"},{category:"数据同步",name:"生产消息 Notion 入库"},{category:"数据同步",name:"数据库查看"},{category:"自动化",name:"自动化任务"}],iA=[...new Set(Z0.map(n=>n.category))];function sA(n){switch(n){case"挂网计划 PDF 导出":return"plan-pdf";case"生产会资料拆分":return"production-meeting";case"每日焊接数据模拟":return"daily-weld";case"生产消息 Notion 入库":return"production-message";case"数据库查看":return"database-viewer";case"文件统计汇总":return"report-center";case"自动化任务":return"daily-report";default:return"plan-pdf"}}function oA({active:n,navigate:a,openSettings:s}){return l.jsxs("aside",{className:"sidebar",children:[l.jsx("div",{className:"sidebar-top",children:l.jsx("div",{className:"sidebar-brand",children:"生产助手"})}),l.jsx("nav",{className:"sidebar-nav","aria-label":"业务模块",children:iA.map(o=>l.jsxs("section",{className:"sidebar-section",children:[l.jsx("div",{className:"sidebar-section-label",children:o}),Z0.filter(u=>u.category===o).map(u=>{const h=sA(u.name),f=h===n;return l.jsxs("button",{className:`sidebar-item ${f?"sidebar-item-active":""}`,"aria-current":f?"page":void 0,onClick:()=>a(h),children:[l.jsx($v,{name:u.name}),l.jsx("span",{children:u.name})]},u.name)})]},o))}),l.jsx("div",{className:"sidebar-bottom",children:l.jsxs("button",{className:"sidebar-item","aria-haspopup":"dialog",onClick:s,children:[l.jsx($v,{name:"设置"}),l.jsx("span",{children:"设置"})]})})]})}function $v({name:n}){return n==="挂网计划 PDF 导出"||n==="生产会资料拆分"?l.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[l.jsx("path",{className:"folder-lid",d:"M3.5 7h6l1.8 2h9.2"}),l.jsx("path",{d:"M4.2 7h15.6l-1.3 11H5.5L4.2 7Z"})]}):n==="每日焊接数据模拟"||n==="自动化任务"?l.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[l.jsx("rect",{x:"5",y:"4.5",width:"14",height:"15",rx:"2"}),l.jsx("path",{d:"M8 3v3M16 3v3M5 9h14"}),l.jsx("path",{className:"daily-check",d:"m8.5 14 2 2 4.5-4.5"})]}):n==="生产消息 Notion 入库"?l.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[l.jsx("path",{d:"M4 14.5 6.2 6h11.6l2.2 8.5V19H4v-4.5Z"}),l.jsx("path",{className:"inbox-tray",d:"M4.3 14h4.1l1.2 2h4.8l1.2-2h4.1"}),l.jsx("path",{className:"inbox-arrow",d:"M12 5v7m-2.5-2.5L12 12l2.5-2.5"})]}):n==="数据库查看"?l.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[l.jsx("ellipse",{cx:"12",cy:"6",rx:"7",ry:"3"}),l.jsx("path",{d:"M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"})]}):n==="文件统计汇总"?l.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[l.jsx("path",{d:"M4.5 19h15"}),l.jsx("rect",{className:"report-bar report-bar-one",x:"6",y:"12",width:"2.5",height:"6",rx:"0.5"}),l.jsx("rect",{className:"report-bar report-bar-two",x:"10.75",y:"8",width:"2.5",height:"10",rx:"0.5"}),l.jsx("rect",{className:"report-bar report-bar-three",x:"15.5",y:"5",width:"2.5",height:"13",rx:"0.5"})]}):l.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[l.jsx("circle",{cx:"12",cy:"12",r:"3"}),l.jsx("path",{className:"settings-ring",d:"M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M18 6l-1.4 1.4M7.4 16.6 6 18"})]})}const Kv=new Set(["raw_message","message_type","parser_version","unit"]),lA=new Set(["piece_count","weight","sheet_in_stock","profile_in_stock","cutting","welding","daily_output","monthly_output","yearly_output","monthly_reference","output_sections"]),cA=/(公斤|千克|kg|吨|t|张|件|套|节|台|米|m)$/i,uA={piece_count:"张",weight:"吨",sheet_in_stock:"吨",profile_in_stock:"吨",cutting:"吨",welding:"吨",daily_output:"套",output_sections:"节"};function bd(){const n=new Date;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`}function Gi(n){return n instanceof Error?n.message:String(n)}function of(n,a=""){const s=n.trim().match(cA);return{value:s?n.trim().slice(0,-s[0].length).trim():n,unit:(s==null?void 0:s[0])||a}}function dA(n,a){return n.trim()?`${n}${a}`:""}function fA(n,a){const s=of(a).value.trim(),o=of(n.databaseValue).value.trim(),u=n.propertyType==="number"&&!Number.isFinite(Number(s.replaceAll(",",""))),h=!s||u?"exception":o?n.propertyType==="number"?Number(s.replaceAll(",",""))===Number(o.replaceAll(",",""))?"same":"confirm":s===o?"same":"confirm":"new";return{...n,parsedValue:a,status:h,message:h==="exception"?`${n.name}的输入值无效`:h==="confirm"?"与数据库现值不同":""}}function hA(n){return{new:"新增",same:"一致",confirm:"待确认",exception:"异常",unchecked:"待检查"}[n]||"异常"}function mA(){const[n,a]=S.useState(""),[s,o]=S.useState(""),[u,h]=S.useState([]),[f,m]=S.useState(),[p,g]=S.useState(),[v,x]=S.useState(),[b,E]=S.useState(""),[j,N]=S.useState({}),[C,k]=S.useState(!1),[D,V]=S.useState(),[R,B]=S.useState(""),[Y,A]=S.useState([]),[q,U]=S.useState({}),[_,$]=S.useState(!1),[W,le]=S.useState({cutting:"",towerDaily:""}),Z=u.length>0,ce=Z&&n!==s,L=!!f;S.useEffect(()=>{ye("production.getBindings").then(ie=>{V(ie),le({cutting:ie.selected.cutting||"",towerDaily:ie.selected.towerDaily||""})}).catch(ie=>B(Gi(ie)))},[]);async function se(){B("");try{await ye("production.saveBindings",W,12e4);const ie=await ye("production.getBindings");V(ie),$(!1)}catch(ie){B(Gi(ie))}}async function Q(ie){m("check"),E(""),N({});try{const I=await ye("production.check",{drafts:ie,defaultDate:bd()});g(I)}catch(I){E(Gi(I))}finally{m(void 0)}}async function X(){if(!(!n.trim()||L)){m("parse"),E(""),k(!1),x(void 0),g(void 0),N({});try{const ie=await ye("production.parse",{text:n,defaultDate:bd()});if(h(ie),o(n),!ie.length){E("没有解析到可核对的数据，请检查消息内容后重试。");return}ie.every(I=>I.canWrite)&&await Q(ie)}catch(ie){h([]),g(void 0),E(Gi(ie))}finally{m(ie=>ie==="parse"?void 0:ie)}}}async function ae(ie,I){const de=u.map(re=>re.index===ie?{...re,businessDate:I,canWrite:!!I,warningText:I?"":re.warningText}:re);h(de),g(void 0),N({}),de.every(re=>re.canWrite)&&await Q(de)}function T(ie,I,de){const re=`${ie}:${I}`;h(pe=>pe.map(Ce=>Ce.index===ie?{...Ce,canWrite:!!Ce.businessDate&&Ce.kind!=="Unknown",fields:{...Ce.fields,[I]:de},previewFields:Ce.previewFields.map(Oe=>Oe.key===I?{...Oe,value:de}:Oe)}:Ce)),N(pe=>Object.fromEntries(Object.entries(pe).filter(([Ce])=>Ce!==re))),g(pe=>{if(!pe)return pe;const Ce=pe.items.map(Oe=>{if(Oe.index!==ie||!Oe.fields)return Oe;const Qe=Oe.fields.map(yt=>yt.key===I?fA(yt,de):yt),Fe=Qe.some(yt=>yt.status==="exception")?"error":Qe.some(yt=>yt.status==="confirm")?"existing":"ready";return{...Oe,fields:Qe,status:Fe}});return{...pe,items:Ce,succeeded:Ce.every(Oe=>Oe.status!=="error")}})}async function O(ie){if(!(!p||L)){m("write"),E("");try{const I=await ye("production.write",{drafts:u,defaultDate:bd(),overwriteExisting:!1,fieldChoices:j,monthlyPlans:ie},12e4);if(x(I),I.requiredMonths.length){A(I.requiredMonths),U({});return}I.succeeded?k(!0):E(I.message||"Notion 写入未完成。")}catch(I){E(Gi(I))}finally{m(void 0)}}}function te(){a(""),o(""),h([]),g(void 0),x(void 0),N({}),k(!1),E("")}const oe=S.useMemo(()=>u.flatMap(ie=>{var de;const I=(de=p==null?void 0:p.items.find(re=>re.index===ie.index))==null?void 0:de.fields;return I!=null&&I.length?I.filter(re=>!Kv.has(re.key)).map(re=>({draft:ie,key:re.key,name:re.name,propertyType:re.propertyType,parsedValue:ie.fields[re.key]??re.parsedValue,databaseValue:re.databaseValue,status:re.status,message:re.message})):ie.previewFields.filter(re=>!Kv.has(re.key)).map(re=>({draft:ie,key:re.key,name:re.label,propertyType:lA.has(re.key)?"number":"",parsedValue:ie.fields[re.key]??re.value,databaseValue:"",status:ie.canWrite?"unchecked":"exception",message:ie.warningText}))}),[u,p]),ue=S.useMemo(()=>({newFields:oe.filter(ie=>ie.status==="new").length,same:oe.filter(ie=>ie.status==="same").length,confirm:oe.filter(ie=>ie.status==="confirm").length,exception:oe.filter(ie=>ie.status==="exception").length}),[oe]),me=oe.filter(ie=>ie.status==="confirm"),xe=Z&&!ce&&!L&&!!(p!=null&&p.succeeded)&&u.every(ie=>ie.canWrite&&!!ie.businessDate)&&oe.every(ie=>ie.status!=="exception"&&ie.status!=="unchecked")&&me.every(ie=>!!j[`${ie.draft.index}:${ie.key}`]);return C?l.jsxs("div",{className:"app-shell",children:[l.jsxs("main",{className:"main-content",children:[l.jsx(Qv,{disabled:L,configure:()=>{D&&le({cutting:D.selected.cutting||"",towerDaily:D.selected.towerDaily||""}),B(""),$(!0)}}),l.jsxs("div",{className:"production-message-scroll",children:[l.jsx(Jv,{current:3}),l.jsxs("section",{className:"complete-view",children:[l.jsx("div",{className:"complete-icon",children:l.jsx(us,{})}),l.jsx("h2",{children:"入库完成"}),l.jsx("p",{children:(v==null?void 0:v.message)||`${u.length} 条消息已写入 Notion`}),l.jsx("button",{className:"primary-button",onClick:te,children:"录入下一条"})]})]})]}),_&&D&&l.jsx(Zv,{state:D,selections:W,setSelections:le,error:R,close:()=>$(!1),save:se})]}):l.jsxs("div",{className:"app-shell",children:[l.jsxs("main",{className:"main-content",children:[l.jsx(Qv,{disabled:L,configure:()=>{D&&le({cutting:D.selected.cutting||"",towerDaily:D.selected.towerDaily||""}),B(""),$(!0)}}),l.jsxs("div",{className:"production-message-scroll",children:[l.jsx(Jv,{current:Z?2:1}),l.jsxs("div",{className:"workspace-panel",children:[l.jsxs("section",{className:"message-pane",children:[l.jsxs("div",{className:"pane-title",children:[l.jsx("h2",{children:"原始消息"}),l.jsx("p",{children:"输入生产消息，系统将自动解析并检查已有数据。"})]}),l.jsx("textarea",{className:"message-textarea",value:n,disabled:L,onChange:ie=>a(ie.target.value),placeholder:"请输入生产消息"}),l.jsx("div",{className:"parse-action",children:l.jsxs("button",{className:"primary-button",disabled:!n.trim()||L,onClick:X,children:[Z&&l.jsx(Zb,{className:"button-icon refresh-icon"}),l.jsx("span",{children:f==="parse"?"正在解析…":Z?"重新解析":"解析消息"})]})})]}),l.jsx("section",{className:"review-pane",children:Z?l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"review-header",children:[l.jsx("h2",{children:"解析结果"}),l.jsxs("div",{className:"review-summary",children:[l.jsxs("span",{children:["新增",l.jsx("strong",{children:ue.newFields})]}),l.jsx("i",{children:"·"}),l.jsxs("span",{children:["一致",l.jsx("strong",{children:ue.same})]}),l.jsx("i",{children:"·"}),l.jsxs("span",{children:["待确认",l.jsx("strong",{children:ue.confirm})]}),l.jsx("i",{children:"·"}),l.jsxs("span",{children:["异常",l.jsx("strong",{children:ue.exception})]})]})]}),l.jsx("div",{className:"date-groups",children:u.map(ie=>{const I=oe.filter(pe=>pe.draft.index===ie.index),de=I.filter(pe=>pe.status==="confirm"),re=p?{...p,items:p.items.filter(pe=>pe.index===ie.index)}:void 0;return l.jsxs("section",{className:"date-group","data-business-date":ie.businessDate,children:[l.jsxs("div",{className:"identity-section",children:[l.jsx("div",{className:"identity-field",children:l.jsx(xn,{label:"日期",value:ie.businessDate||"",disabled:L,onChange:pe=>ae(ie.index,pe)})}),l.jsxs("div",{className:"identity-field",children:[l.jsx("label",{children:"业务 / 产线"}),l.jsx("input",{className:"field-input",value:ie.typeDisplay||"",readOnly:!0,disabled:L})]})]}),l.jsx(pA,{busy:f==="check",result:re,error:b,needsReparse:ce,invalidCount:ie.canWrite?0:1,fieldStatuses:I.map(pe=>pe.status)}),l.jsx("div",{className:"data-title",children:"数据字段"}),l.jsxs("div",{className:"field-table",children:[l.jsxs("div",{className:"field-table-header",children:[l.jsx("div",{children:"字段"}),l.jsx("div",{children:"本次解析值"}),l.jsx("div",{children:"数据库值"}),l.jsx("div",{className:"header-status",children:"状态"})]}),I.map(pe=>{const Ce=of(pe.parsedValue,pe.propertyType==="number"&&uA[pe.key]||""),Oe=`${pe.draft.index}:${pe.key}`;return l.jsxs("div",{className:"field-row",children:[l.jsx("div",{className:"field-name",children:pe.name}),l.jsx("div",{className:"field-editor",children:l.jsxs("div",{className:"input-unit-wrap",children:[l.jsx("input",{className:"field-input compact-input",value:Ce.value,disabled:L,"aria-invalid":pe.status==="exception",onChange:Qe=>T(pe.draft.index,pe.key,dA(Qe.target.value,Ce.unit)),onKeyDown:Qe=>{Qe.key==="Enter"&&Qe.currentTarget.blur()}}),Ce.unit&&l.jsx("span",{children:Ce.unit})]})}),l.jsx("div",{className:"database-value",children:pe.databaseValue||"—"}),l.jsx("div",{className:"field-status",children:pe.status!=="unchecked"&&l.jsx("span",{className:`pill pill-${pe.status}`,title:pe.message,children:hA(pe.status)})})]},Oe)})]}),de.length>0&&l.jsxs("section",{className:"conflict-section","aria-label":`${ie.businessDate} 待确认字段`,children:[l.jsx("div",{className:"conflict-section-title",children:"待确认字段"}),de.map(pe=>{const Ce=`${pe.draft.index}:${pe.key}`;return l.jsxs("div",{className:"conflict-panel",children:[l.jsxs("div",{className:"conflict-message",children:[l.jsx("strong",{children:pe.name}),l.jsx("span",{children:"原值与新值不同，请选择保留项。"})]}),l.jsxs("div",{className:"conflict-options",children:[l.jsxs("label",{children:[l.jsx("input",{type:"radio",name:`conflict-${Ce}`,checked:j[Ce]==="keep",onChange:()=>N(Oe=>({...Oe,[Ce]:"keep"}))}),l.jsxs("span",{children:[l.jsx("small",{children:"原值"}),l.jsx("strong",{children:pe.databaseValue||"—"})]})]}),l.jsxs("label",{children:[l.jsx("input",{type:"radio",name:`conflict-${Ce}`,checked:j[Ce]==="use",onChange:()=>N(Oe=>({...Oe,[Ce]:"use"}))}),l.jsxs("span",{children:[l.jsx("small",{children:"新值"}),l.jsx("strong",{children:pe.parsedValue||"—"})]})]})]})]},Ce)})]})]},ie.index)})}),l.jsxs("div",{className:"review-footer",children:[l.jsx("span",{className:"review-footer-text",children:u.length>1?`本次共 ${u.length} 条消息，将整批写入 Notion。`:"确认后将把本次解析结果写入 Notion。"}),l.jsx("button",{className:"primary-button confirm-button",disabled:!xe,onClick:()=>O(),children:f==="write"?"正在入库…":"确认入库"})]})]}):l.jsxs("div",{className:"review-empty",children:[l.jsx("h2",{children:"解析结果"}),l.jsx("p",{children:"解析消息后，Notion 数据检查结果将在这里显示。"}),(R||(D==null?void 0:D.configured)===!1||D&&(!D.cutting.bound||!D.towerDaily.bound))&&l.jsx("div",{className:"pm-notice",role:"alert",children:R||((D==null?void 0:D.configured)===!1?"Notion 连接尚未配置。":"数据库已变更，请点击右上角“数据库绑定”重新选择下料和塔筒主数据库。")})]})})]})]})]}),Y.length>0&&l.jsx(gA,{months:Y,values:q,setValues:U,close:()=>A([]),submit:ie=>{A([]),O(ie)}}),_&&D&&l.jsx(Zv,{state:D,selections:W,setSelections:le,error:R,close:()=>$(!1),save:se})]})}function pA({busy:n,result:a,error:s,needsReparse:o,invalidCount:u,fieldStatuses:h}){if(n)return l.jsxs("div",{className:"match-status",role:"status","aria-live":"polite",children:[l.jsx("span",{className:"status-loader"}),l.jsx("span",{className:"match-status-copy",children:"正在检查 Notion 数据…"})]});if(o)return l.jsxs("div",{className:"match-status match-status-error",role:"alert",children:[l.jsx("span",{className:"new-record-icon",children:"!"}),l.jsx("span",{className:"match-status-copy",children:"原始消息已修改，请重新解析"})]});if(u)return l.jsxs("div",{className:"match-status match-status-error",role:"alert",children:[l.jsx("span",{className:"new-record-icon",children:"!"}),l.jsxs("span",{className:"match-status-copy",children:["本批有 ",u," 条异常，已停止检查和入库"]})]});if(s)return l.jsxs("div",{className:"match-status match-status-error",role:"alert",children:[l.jsx("span",{className:"new-record-icon",children:"!"}),l.jsxs("span",{className:"match-status-copy",children:["检查失败：",s]})]});const f=a==null?void 0:a.items.some(b=>b.status==="existing"||b.status==="conflict"),m=b=>h.includes(b),p=h.length>0&&h.every(b=>b==="same"),g=m("exception")||a&&!a.succeeded&&h.length===0?"match-status-error":m("confirm")?"match-status-warning":p?"match-status-neutral":"",v=m("exception")?"存在异常，不能入库":m("unchecked")?"字段已修改，等待检查":m("confirm")?"已找到对应记录，有字段待确认":m("new")?f||m("same")?"已找到对应记录，将补充空字段":"未找到对应记录，将新建":p?"已找到对应记录，数据一致":a&&!a.succeeded?"Notion 检查未通过":"等待检查 Notion 数据",x=!!a&&!m("exception")&&!m("confirm")&&!m("unchecked");return l.jsxs("div",{className:`match-status ${g}`,role:g==="match-status-error"?"alert":"status","aria-live":"polite",children:[x?l.jsx("span",{className:"match-check",children:l.jsx(us,{})}):l.jsx("span",{className:"new-record-icon",children:g?"!":"+"}),l.jsx("span",{className:"match-status-copy",children:v})]})}function gA({months:n,values:a,setValues:s,close:o,submit:u}){const h=Object.fromEntries(n.map(m=>[m,Number(a[m])])),f=n.every(m=>{var p;return((p=a[m])==null?void 0:p.trim())&&Number.isFinite(h[m])&&h[m]>=0});return l.jsx("div",{className:"pm-dialog-overlay",children:l.jsxs("section",{className:"pm-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"monthly-plan-title",children:[l.jsx("h2",{id:"monthly-plan-title",children:"补充下料月计划"}),l.jsx("p",{children:"独立月计划库中没有该月份记录，请填写计划下料（吨）。"}),n.map(m=>l.jsxs("label",{children:[m,l.jsx("input",{type:"number",min:"0",value:a[m]||"",onChange:p=>s({...a,[m]:p.target.value})})]},m)),l.jsxs("div",{className:"pm-dialog-actions",children:[l.jsx("button",{onClick:o,children:"取消"}),l.jsx("button",{className:"primary-button",disabled:!f,onClick:()=>u(h),children:"创建并继续"})]})]})})}function Zv({state:n,selections:a,setSelections:s,error:o,close:u,save:h}){var x,b;const[f,m]=S.useState(((x=n.sources.find(E=>E.id===a.cutting))==null?void 0:x.businessSection)||""),[p,g]=S.useState(((b=n.sources.find(E=>E.id===a.towerDaily))==null?void 0:b.businessSection)||""),v=E=>n.usesBusinessSections?n.sources.filter(j=>j.businessSection===E):n.sources;return l.jsx("div",{className:"pm-dialog-overlay",children:l.jsxs("section",{className:"pm-dialog pm-binding-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"binding-title",children:[l.jsx("h2",{id:"binding-title",children:"数据库绑定"}),l.jsx("p",{children:"只绑定每日主数据库。月累计和年累计由软件查询计算；下料月计划库通过主库的 Relation 自动识别。"}),n.usesBusinessSections&&l.jsxs("label",{children:["下料业务板块",l.jsx(Jt,{value:f,ariaLabel:"下料业务板块",placeholder:"不处理下料消息",options:[{value:"",label:"不处理下料消息"},...n.businessSections.map(E=>({value:E,label:E}))],onChange:E=>{m(E),s({...a,cutting:""})}})]}),l.jsxs("label",{children:["下料主数据库",l.jsx(Jt,{value:a.cutting,ariaLabel:"下料主数据库",placeholder:"不处理下料消息",disabled:n.usesBusinessSections&&!f,options:[{value:"",label:"不处理下料消息"},...v(f).map(E=>({value:E.id,label:E.name}))],onChange:E=>s({...a,cutting:E})})]}),n.usesBusinessSections&&l.jsxs("label",{children:["塔筒业务板块",l.jsx(Jt,{value:p,ariaLabel:"塔筒业务板块",placeholder:"请选择业务板块",options:n.businessSections.map(E=>({value:E,label:E})),onChange:E=>{g(E),s({...a,towerDaily:""})}})]}),l.jsxs("label",{children:["塔筒产线主数据库",l.jsx(Jt,{value:a.towerDaily,ariaLabel:"塔筒产线主数据库",placeholder:"请选择具体数据库",disabled:n.usesBusinessSections&&!p,options:v(p).map(E=>({value:E.id,label:E.name})),onChange:E=>s({...a,towerDaily:E})})]}),o&&l.jsx("div",{className:"pm-notice",role:"alert",children:o}),l.jsxs("div",{className:"pm-dialog-actions",children:[l.jsx("button",{onClick:u,children:"取消"}),l.jsx("button",{className:"primary-button",disabled:!a.towerDaily,onClick:h,children:"保存绑定"})]})]})})}function Qv({configure:n,disabled:a}){return l.jsxs("header",{className:"content-header",children:[l.jsx("h1",{children:"生产消息入库"}),l.jsx("button",{type:"button",className:"template-config-button",disabled:a,"aria-label":"数据库绑定",title:"数据库绑定",onClick:n,children:l.jsx(Pf,{})})]})}function Jv({current:n}){return l.jsx(K0,{current:n,titles:["录入消息","解析确认","完成"],label:"生产消息入库进度"})}const Wv={audit:"正在检查",repair:"正在备份修复并复查",export:"正在导出",pickFolder:"选择目录",openOutput:"正在打开目录"},Iv=n=>n.split(/[\\/]/).pop();function yA(){const[n,a]=S.useState(""),[s,o]=S.useState(),[u,h]=S.useState(),[f,m]=S.useState(),[p,g]=S.useState(),[v,x]=S.useState(),[b,E]=S.useState(""),[j,N]=S.useState("全部"),[C,k]=S.useState(),D=S.useRef(!1),V=S.useRef(0);S.useEffect(()=>()=>{V.current++},[]);const R=(s==null?void 0:s.issues.filter(U=>U.severity==="错误").length)||0,B=(s==null?void 0:s.issues.filter(U=>U.severity==="警告").length)||0;function Y(U){D.current||(a(U),o(void 0),m(void 0),h(void 0),E(""),k(void 0),N("全部"))}async function A(U){if(D.current||U==="audit"&&!n.trim()||["repair","export","openOutput"].includes(U)&&!s)return;const _=++V.current;D.current=!0,g(U),E(""),x(void 0),U==="audit"&&(o(void 0),h(void 0),N("全部")),U==="repair"&&(o($=>$&&{...$,repaired:!1,canExport:!1}),h(void 0)),["audit","repair","export"].includes(U)&&(m(void 0),k(void 0));try{if(U==="pickFolder"){const $=await ye("plan.pickFolder",void 0,6e5);if(_!==V.current)return;$.path&&(D.current=!1,Y($.path),D.current=!0)}else{const $=await ye(`plan.${U}`,{path:n.trim(),auditId:s==null?void 0:s.auditId,confirmed:U==="repair"||U==="export"},18e5,W=>{_===V.current&&D.current&&k(W)});if(_!==V.current)return;if(U==="audit"&&o($),U==="repair"){const W=$;o(W.audit),h(W.repair)}U==="export"&&m($)}}catch($){_===V.current&&(E($ instanceof Error?$.message:String($)),(U==="repair"||U==="export")&&o(W=>W&&{...W,canExport:!1,repaired:!1}))}finally{_===V.current&&(D.current=!1,g(void 0),k(void 0))}}const q=p?Wv[p]:f?"候选 PDF 已生成":s?R?"存在待处理错误":s.canExport?"可以导出":"检查完成，待修复":"等待检查";return l.jsxs("div",{className:"page plan-pdf-page",children:[l.jsxs("header",{className:"plan-header",children:[l.jsx("h1",{children:"挂网计划导出"}),l.jsx("span",{children:q})]}),l.jsxs("div",{className:"plan-content",children:[l.jsxs("section",{className:"plan-source",children:[l.jsx("label",{htmlFor:"plan-folder",children:"月度目录"}),l.jsxs("div",{children:[l.jsx("input",{id:"plan-folder",value:n,disabled:!!p,placeholder:"选择包含一二三级计划的月份目录",onChange:U=>Y(U.target.value)}),l.jsxs("button",{className:"secondary",disabled:!!p,onClick:()=>void A("pickFolder"),children:[l.jsx(hl,{}),"选择目录"]}),l.jsx("button",{className:"primary",disabled:!!p||!n.trim(),onClick:()=>void A("audit"),children:s?"重新检查":"检查计划"})]})]}),b&&l.jsx("p",{className:"plan-error",role:"alert",children:b}),p&&l.jsxs("div",{className:"plan-progress",role:"status",children:[l.jsxs("span",{children:[l.jsx(Sn,{className:"spin"}),Wv[p]]}),p==="export"&&C&&l.jsxs(l.Fragment,{children:[l.jsxs("span",{children:[C.current," / ",C.total," · ",C.name]}),l.jsx("progress",{"aria-label":"PDF 导出进度",max:C.total||11,value:C.current})]})]}),l.jsxs("div",{className:"plan-workspace",children:[l.jsxs("section",{className:"plan-inspection",children:[l.jsxs("div",{className:"plan-pane-heading",children:[l.jsx("h2",{children:"检查结果"}),s&&l.jsxs("span",{children:[s.sheetCount," 个工作表"]})]}),s?l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"plan-workbook",children:[l.jsxs("strong",{children:[s.workspace.year," 年 ",s.workspace.month," 月计划"]}),l.jsx("span",{children:Iv(s.workspace.workbookPath)})]}),l.jsx("div",{className:"plan-filters","aria-label":"问题筛选",children:["全部","错误","警告"].map(U=>l.jsxs("button",{"aria-pressed":j===U,onClick:()=>N(U),children:[U," ",l.jsx("span",{children:U==="全部"?s.issues.length:U==="错误"?R:B})]},U))}),l.jsxs("div",{className:"plan-issues",children:[s.issues.filter(U=>j==="全部"||U.severity===j).map((U,_)=>l.jsxs("article",{children:[l.jsxs("div",{children:[l.jsx("span",{className:U.severity==="错误"?"plan-severity-error":"",children:U.severity}),l.jsxs("strong",{children:[U.sheet,U.location&&` · ${U.location}`]}),l.jsx("span",{children:U.canAutoFix?"可自动修复":"需手动处理"})]}),l.jsx("p",{children:U.message})]},_)),!s.issues.some(U=>j==="全部"||U.severity===j)&&l.jsx("p",{className:"plan-clear",children:s.issues.length?`没有${j}`:"未发现检查问题"})]}),l.jsxs("div",{className:"plan-next",children:[l.jsx("span",{children:R?s.repaired?"请手动处理剩余错误，再重新检查。":"修复后自动复查，剩余错误需手动处理。":s.canExport?"复查通过，可以导出候选 PDF。":"继续备份并修复，完成导出前准备。"}),l.jsx("button",{className:"secondary",disabled:!!p,onClick:()=>x("repair"),children:s.repaired?"再次修复":"备份并修复"})]}),u&&l.jsxs("details",{className:"plan-details",children:[l.jsx("summary",{children:"备份与修复明细"}),l.jsxs("p",{children:["已调整 ",u.changedCells," 个单元格、",u.changedRows," 行。"]}),l.jsxs("p",{children:["备份：",u.backupPath]})]})]}):l.jsxs("div",{className:"plan-empty",children:[l.jsx(Nv,{}),l.jsx("strong",{children:"尚未检查计划"}),l.jsx("p",{children:"选择月度目录后，查看需要处理的问题。"})]})]}),l.jsxs("section",{className:"plan-result",children:[l.jsxs("div",{className:"plan-pane-heading",children:[l.jsx("h2",{children:"导出结果"}),f&&l.jsxs("span",{children:[f.files.length," 份 PDF"]})]}),f?l.jsxs(l.Fragment,{children:[l.jsx("div",{className:"plan-file-list",children:f.files.map(U=>l.jsx("p",{children:Iv(U)},U))}),l.jsxs("div",{className:"plan-output",children:[l.jsx("span",{children:"文件位置"}),l.jsx("p",{children:f.outputFolder}),l.jsxs("button",{className:"secondary",disabled:!!p,onClick:()=>void A("openOutput"),children:[l.jsx(hl,{}),"打开输出目录"]})]})]}):l.jsxs("div",{className:"plan-empty",children:[l.jsx(Nv,{}),l.jsx("strong",{children:p==="export"?"正在生成候选 PDF":"尚未导出"}),l.jsx("p",{children:"完成检查和修复后，生成 11 份候选 PDF。"})]}),l.jsx("div",{className:"plan-export-action",children:l.jsx("button",{className:"primary",disabled:!!p||!(s!=null&&s.canExport),onClick:()=>x("export"),children:f?"重新导出 PDF":"导出 PDF"})})]})]})]}),l.jsx(ml,{open:!!v,onOpenChange:U=>{U||x(void 0)},children:l.jsxs(pl,{children:[l.jsx(gl,{className:"dialog-overlay"}),l.jsxs(yl,{className:"plan-confirm",children:[l.jsxs("div",{children:[l.jsx(vl,{children:v==="repair"?"确认备份并修复":"确认导出 PDF"}),l.jsx(bl,{asChild:!0,children:l.jsx("button",{className:"secondary","aria-label":"关闭确认",children:l.jsx(Gf,{})})})]}),l.jsx(xl,{children:v==="repair"?"将先备份 Excel，再修复格式和序号，并自动复查。":"将生成 11 份候选 PDF，不修改 Excel。"}),l.jsxs("footer",{children:[l.jsx(bl,{asChild:!0,children:l.jsx("button",{className:"secondary",autoFocus:!0,children:"取消"})}),l.jsx("button",{className:"primary",onClick:()=>v&&void A(v),children:v==="repair"?"备份并修复":"确认导出"})]})]})]})})]})}const vA=n=>n.split(/[\\/]/).pop();function xA(){const[n,a]=S.useState(""),[s,o]=S.useState(),[u,h]=S.useState(),[f,m]=S.useState(""),p=S.useRef(!1),g=S.useRef(0);S.useEffect(()=>()=>{g.current++},[]);function v(b){p.current||(a(b),o(void 0),m(""))}async function x(b){if(p.current||b==="export"&&!n.trim()||b==="open"&&!s)return;p.current=!0;const E=++g.current;h(b),m(""),b==="export"&&o(void 0);try{if(b==="pick"){const j=await ye("meeting.pickFile",void 0,6e5);E===g.current&&j.path&&(a(j.path),o(void 0))}else if(b==="export"){const j=await ye("meeting.export",{path:n.trim()},18e5);E===g.current&&o(j)}else await ye("meeting.openOutput",{resultId:s.resultId})}catch(j){E===g.current&&m(j instanceof Error?j.message:String(j))}finally{E===g.current&&(p.current=!1,h(void 0))}}return l.jsxs("div",{className:"page meeting-page",children:[l.jsxs("header",{className:"meeting-header",children:[l.jsx("h1",{children:"生产会资料拆分"}),l.jsx("span",{children:u==="export"?"正在拆分":s?"拆分完成":"等待拆分"})]}),l.jsxs("div",{className:"meeting-content",children:[f&&l.jsx("p",{className:"meeting-error",role:"alert",children:f}),l.jsxs("div",{className:"meeting-workspace",children:[l.jsxs("section",{children:[l.jsx("h2",{children:"源文件"}),l.jsx("label",{htmlFor:"meeting-source",children:"生产会资料 Excel"}),l.jsxs("div",{className:"meeting-input",children:[l.jsx("input",{id:"meeting-source",value:n,disabled:!!u,onChange:b=>v(b.target.value),placeholder:"选择 .xlsx、.xlsm 或 .xls 文件"}),l.jsxs("button",{className:"secondary",disabled:!!u,onClick:()=>void x("pick"),children:[l.jsx(hl,{}),"选择文件"]})]}),l.jsx("p",{className:"meeting-hint",children:"源文件需包含一个工作表，按已发运、在制、预投三个分段拆分。"}),l.jsxs("details",{className:"meeting-rules",children:[l.jsx("summary",{children:"拆分规则"}),l.jsx("p",{children:"生成包含三个独立工作表的 .xlsx，保存到源文件所在目录，保留源文件。"}),l.jsx("p",{children:"保留原有内容、公式和布局，清除红色与绿色背景填充。宏不会保留到输出文件。"})]}),l.jsx("div",{className:"meeting-actions",children:l.jsx("button",{className:"primary",disabled:!!u||!n.trim(),onClick:()=>void x("export"),children:u==="export"?"正在拆分…":s?"重新拆分":"开始拆分"})})]}),l.jsxs("section",{className:"meeting-result","aria-live":"polite",children:[l.jsxs("div",{className:"meeting-result-heading",children:[l.jsx("h2",{children:"拆分结果"}),s&&l.jsxs("span",{children:[s.sheetNames.length," 个工作表"]})]}),s?l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"meeting-file",children:[l.jsx(fl,{}),l.jsxs("div",{children:[l.jsx("h3",{children:vA(s.outputPath)}),l.jsxs("p",{children:["开会日期 · ",s.meetingDate]})]})]}),l.jsx("ol",{children:s.sheetNames.map(b=>l.jsx("li",{children:b},b))}),l.jsxs("div",{className:"meeting-output",children:[l.jsx("span",{children:"文件位置"}),l.jsx("p",{children:s.outputPath}),l.jsxs("button",{className:"secondary",disabled:!!u,onClick:()=>void x("open"),children:[l.jsx(hl,{}),"打开文件位置"]})]})]}):l.jsxs("div",{className:"meeting-empty",children:[u==="export"?l.jsx(Sn,{className:"spin"}):l.jsx(fl,{}),l.jsx("strong",{children:u==="export"?"正在生成拆分文件":"尚未生成拆分文件"}),l.jsx("p",{children:u==="export"?"正在检查并处理工作表，请稍候。":"选择源文件后开始拆分。"})]})]})]})]})]})}const Sd=(n=0)=>{const a=new Date;return{startDate:new Date(Date.UTC(a.getFullYear(),a.getMonth()+n-1,21)).toISOString().slice(0,10),endDate:new Date(Date.UTC(a.getFullYear(),a.getMonth()+n,20)).toISOString().slice(0,10)}},wd={sourceRoot:"",outputRoot:"",reportUrl:"",username:"",password:""},ex=n=>({sourceRoot:n.sourceRoot,outputRoot:n.outputRoot,reportUrl:n.reportUrl,username:n.username,password:""}),Yo=n=>n instanceof Error?n.message:String(n),tx=n=>n?`${n.slice(0,4)} 年 ${Number(n.slice(5,7))} 月`:"—",nx={prepare:"准备中",collect:"正在导出日报",parse:"正在读取数据",summary:"正在生成汇总",complete:"正在完成"};function bA(){const[n,a]=S.useState(),[s,o]=S.useState(Sd),[u,h]=S.useState(wd),[f,m]=S.useState(!1),[p,g]=S.useState("load"),[v,x]=S.useState(""),[b,E]=S.useState(""),[j,N]=S.useState(),[C,k]=S.useState(),[D,V]=S.useState(!1),[R,B]=S.useState(!1),Y=S.useRef(0),A=S.useRef(!1),q=Math.floor((Date.parse(`${s.endDate}T00:00:00Z`)-Date.parse(`${s.startDate}T00:00:00Z`))/864e5)+1,U=Number.isFinite(q)?q<1?"结束日期不能早于开始日期。":q>366?"单次统计范围不能超过 366 天。":"":"请选择完整日期。",_=C!=null&&C.total?Math.min(100,Math.max(0,Math.round(C.current/C.total*100))):0;async function $(){const Q=++Y.current;A.current=!0,g("load"),x("");try{const X=await ye("report.getState");Q===Y.current&&a(X)}catch(X){Q===Y.current&&x(Yo(X))}finally{Q===Y.current&&(A.current=!1,g(void 0))}}S.useEffect(()=>($(),()=>{Y.current++}),[]);function W(Q){A.current||(o(Q),N(void 0),k(void 0),V(!1),x(""),B(!1))}function le(Q){A.current||(m(Q),E(""),h(Q&&n?ex(n):wd))}async function Z(Q){if(Q.preventDefault(),A.current||!n)return;const X={...u,sourceRoot:u.sourceRoot.trim(),outputRoot:u.outputRoot.trim(),reportUrl:u.reportUrl.trim(),username:u.username.trim()};if(JSON.stringify(X)===JSON.stringify(ex(n))){le(!1);return}const ae=++Y.current;A.current=!0,g("save"),E("");try{const T=await ye("report.saveConfig",X);if(ae!==Y.current)return;a(T),m(!1),h(wd),N(void 0),k(void 0),V(!1),x("")}catch(T){ae===Y.current&&E(Yo(T))}finally{ae===Y.current&&(A.current=!1,g(void 0))}}async function ce(){if(A.current||!(n!=null&&n.credentialsConfigured))return;const Q=++Y.current;A.current=!0,g("auth"),x("");try{await ye("report.authenticate",void 0,600*1e3);const X=await ye("report.getState");Q===Y.current&&a(X)}catch(X){Q===Y.current&&x(Yo(X))}finally{Q===Y.current&&(A.current=!1,g(void 0))}}async function L(){if(A.current||!(n!=null&&n.authenticated)||U)return;const Q=++Y.current,X={...s};A.current=!0,g("run"),x(""),N(void 0),V(!1),B(!1),k({stage:"prepare",current:0,total:q,message:""});try{const ae=await ye("report.run",X,18e5,T=>{Q===Y.current&&A.current&&k(T)});Q===Y.current&&(N(ae),k(void 0))}catch(ae){Q===Y.current&&(x(Yo(ae)),V(!0),k(void 0))}finally{Q===Y.current&&(A.current=!1,g(void 0))}}async function se(){if(j)try{await navigator.clipboard.writeText(j.summaryPath),B(!0)}catch{x("无法复制，请选中文件路径手动复制。")}}return l.jsxs("div",{className:"page report-center-page",children:[l.jsxs("header",{className:"report-header",children:[l.jsx("h1",{children:"文件统计汇总"}),l.jsxs("div",{className:"report-header-actions",children:[l.jsx("span",{className:"report-status",children:p==="load"?"加载中":n!=null&&n.authenticated?"已验证登录":"未验证登录"}),l.jsx("button",{className:"secondary report-icon-button","aria-label":"报表设置",title:"报表设置",disabled:!!p||!n,onClick:()=>le(!0),children:l.jsx(Pf,{})})]})]}),l.jsxs("div",{className:"report-content",children:[v&&l.jsxs("div",{className:"report-error",role:"alert",children:[l.jsx("span",{children:v}),!n&&l.jsx("button",{className:"secondary",disabled:!!p,onClick:()=>void $(),children:"重新加载"})]}),l.jsxs("section",{className:"report-workspace",children:[l.jsxs("div",{className:"report-pane report-period",children:[l.jsxs("div",{className:"report-pane-heading",children:[l.jsx("h2",{children:"统计范围"}),!U&&l.jsxs("span",{children:[q," 天"]})]}),l.jsxs("div",{className:"report-dates",children:[l.jsx(xn,{label:"开始日期",value:s.startDate,disabled:!!p,onChange:Q=>W({...s,startDate:Q})}),l.jsx(xn,{label:"结束日期",value:s.endDate,disabled:!!p,onChange:Q=>W({...s,endDate:Q})})]}),l.jsxs("div",{className:"report-range-tools",children:[l.jsxs("div",{children:[l.jsx("button",{disabled:!!p,onClick:()=>W(Sd()),children:"本期"}),l.jsx("button",{disabled:!!p,onClick:()=>W(Sd(-1)),children:"上期"})]}),l.jsx("span",{children:U||`汇总月份 · ${tx(s.endDate)}`})]}),l.jsxs("div",{className:"report-execution",children:[p==="run"&&l.jsxs("div",{className:"report-progress",role:"status",children:[l.jsxs("div",{children:[l.jsxs("span",{children:[l.jsx(Sn,{className:"spin"}),nx[(C==null?void 0:C.stage)||"prepare"]]}),C&&["collect","parse"].includes(C.stage)&&l.jsxs("span",{children:[C.current," / ",C.total]})]}),l.jsx("div",{className:"report-progress-bar",role:"progressbar","aria-label":nx[(C==null?void 0:C.stage)||"prepare"],"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":_,children:l.jsx("i",{style:{width:`${_}%`}})}),(C==null?void 0:C.message)&&l.jsxs("details",{className:"report-details",children:[l.jsx("summary",{children:"处理详情"}),l.jsx("p",{children:C.message})]})]}),!(n!=null&&n.credentialsConfigured)&&n&&l.jsxs("p",{className:"report-setup",children:["请先配置报表连接。",l.jsx("button",{onClick:()=>le(!0),children:"报表设置"})]}),(n==null?void 0:n.credentialsConfigured)&&!n.authenticated&&l.jsx("p",{className:"report-setup",children:"请先验证登录。"}),l.jsxs("div",{className:"report-actions",children:[(n==null?void 0:n.credentialsConfigured)&&l.jsxs("button",{className:"secondary",disabled:!!p,onClick:ce,children:[p==="auth"&&l.jsx(Sn,{className:"spin"}),p==="auth"?"验证中…":n!=null&&n.authenticated?"重新验证":"验证登录"]}),l.jsx("button",{className:"primary",disabled:!!p||!(n!=null&&n.authenticated)||!!U,onClick:L,children:p==="run"?"正在汇总…":D?"重新汇总":"开始汇总"})]})]})]}),l.jsxs("div",{className:"report-pane report-result","aria-live":"polite",children:[l.jsxs("div",{className:"report-pane-heading",children:[l.jsx("h2",{children:"汇总结果"}),j&&l.jsx("span",{children:"已完成"})]}),j?l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"report-file",children:[l.jsx(fl,{}),l.jsxs("div",{children:[l.jsxs("h3",{children:[tx(j.period.endDate),"设备台时汇总"]}),l.jsxs("p",{children:[j.period.startDate," — ",j.period.endDate]})]})]}),l.jsxs("dl",{className:"report-result-stats",children:[l.jsxs("div",{children:[l.jsx("dt",{children:"日报"}),l.jsxs("dd",{children:[j.parsedReports," / ",j.plannedReports," 份"]})]}),l.jsxs("div",{children:[l.jsx("dt",{children:"设备"}),l.jsxs("dd",{children:[j.deviceCount," 台"]})]})]}),l.jsxs("div",{className:"report-output",children:[l.jsx("span",{children:"文件位置"}),l.jsx("p",{children:j.summaryPath}),l.jsxs("button",{className:"secondary",onClick:se,children:[l.jsx(UC,{}),R?"已复制":"复制路径"]})]}),l.jsxs("details",{className:"report-details",children:[l.jsx("summary",{children:"汇总明细"}),l.jsxs("p",{children:["数据点：",j.actualDataPoints," / ",j.expectedDataPoints]}),j.warnings.map((Q,X)=>l.jsx("p",{children:Q},X))]})]}):l.jsxs("div",{className:"report-empty",children:[l.jsx(fl,{}),l.jsx("strong",{children:p==="run"?"正在生成汇总":D?"未生成汇总文件":"尚未生成汇总"}),l.jsx("p",{children:p==="run"?"完成后可在这里查看文件。":D?"处理错误后，可重新汇总。":"选择统计范围后开始汇总。"})]})]})]})]}),l.jsx(ml,{open:f,onOpenChange:le,children:l.jsxs(pl,{children:[l.jsx(gl,{className:"dialog-overlay"}),l.jsxs(yl,{className:"report-settings-dialog",children:[l.jsxs("div",{className:"report-settings-heading",children:[l.jsx(vl,{children:"报表设置"}),l.jsx(bl,{asChild:!0,children:l.jsx("button",{className:"secondary report-icon-button",disabled:!!p,"aria-label":"关闭报表设置",children:l.jsx(Gf,{})})})]}),l.jsx(xl,{className:"report-sr-only",children:"设置报表连接与文件保存位置。"}),l.jsxs("form",{onSubmit:Z,children:[l.jsxs("fieldset",{disabled:!!p,children:[l.jsx("legend",{children:"报表连接"}),l.jsxs("label",{children:["报表网页",l.jsx("input",{type:"url",required:!0,value:u.reportUrl,onChange:Q=>h({...u,reportUrl:Q.target.value}),placeholder:"https://…"})]}),l.jsxs("div",{className:"report-settings-grid",children:[l.jsxs("label",{children:["账号",l.jsx("input",{required:!0,autoComplete:"username",value:u.username,onChange:Q=>h({...u,username:Q.target.value})})]}),l.jsxs("label",{children:["密码",l.jsx("input",{type:"password",required:!(n!=null&&n.credentialsConfigured),autoComplete:"new-password",value:u.password,onChange:Q=>h({...u,password:Q.target.value}),placeholder:n!=null&&n.credentialsConfigured?"留空保持原密码":"请输入密码"})]})]})]}),l.jsxs("fieldset",{disabled:!!p,children:[l.jsx("legend",{children:"保存位置"}),l.jsxs("label",{children:["原始日报",l.jsx("input",{required:!0,value:u.sourceRoot,onChange:Q=>h({...u,sourceRoot:Q.target.value})})]}),l.jsxs("label",{children:["汇总文件",l.jsx("input",{required:!0,value:u.outputRoot,onChange:Q=>h({...u,outputRoot:Q.target.value})})]})]}),b&&l.jsx("p",{className:"report-error",role:"alert",children:b}),l.jsxs("div",{className:"report-settings-actions",children:[l.jsx(bl,{asChild:!0,children:l.jsx("button",{className:"secondary",type:"button",disabled:!!p,children:"取消"})}),l.jsx("button",{className:"primary",type:"submit",disabled:!!p,children:p==="save"?"保存中…":"保存设置"})]})]})]})]})})]})}const lf="••••••••••••",rx=[{key:"connection",label:"连接",keywords:"Notion API 令牌 根页面 数据源",icon:l.jsx(DA,{})},{key:"notification",label:"通知",keywords:"钉钉 Webhook Secret 规则",icon:l.jsx(AA,{})},{key:"data",label:"数据与缓存",keywords:"Notion 数据源 缓存 绑定",icon:l.jsx(MA,{})},{key:"about",label:"关于",keywords:"版本 WebView2 React TypeScript",icon:l.jsx(kA,{})}];function SA({open:n,onClose:a}){const[s,o]=S.useState("connection"),[u,h]=S.useState(""),[f,m]=S.useState(null),[p,g]=S.useState(""),[v,x]=S.useState(""),[b,E]=S.useState(""),j=S.useRef(null),N=S.useRef(null);S.useEffect(()=>{if(!n)return;N.current=document.activeElement instanceof HTMLElement?document.activeElement:null,E("settings.open"),x(""),ye("settings.open").then(V=>m(V)).catch(V=>x(V instanceof Error?V.message:"设置加载失败，请重试。")).finally(()=>E("")),window.setTimeout(()=>{var V;return(V=j.current)==null?void 0:V.focus()},0);const D=V=>{V.key==="Escape"&&a()};return window.addEventListener("keydown",D),()=>{var V;window.removeEventListener("keydown",D),(V=N.current)==null||V.focus()}},[n,a]),S.useEffect(()=>{if(!p)return;const D=window.setTimeout(()=>g(""),3e3);return()=>window.clearTimeout(D)},[p]);const C=async(D,V)=>{E(D),x(""),g("");try{const R=await ye(D,V,6e4);return(D==="settings.refreshDataSources"||D==="settings.saveConnection")&&iN(!0),m(R.state),g(R.message),!0}catch(R){return x(R instanceof Error?R.message:"操作未完成，请重试。"),!1}finally{E("")}},k=S.useMemo(()=>{const D=u.trim().toLocaleLowerCase("zh-CN");return D?rx.filter(V=>`${V.label} ${V.keywords}`.toLocaleLowerCase("zh-CN").includes(D)):rx},[u]);return n?l.jsx("div",{className:"settings-overlay",onMouseDown:D=>{D.target===D.currentTarget&&a()},children:l.jsxs("div",{className:"settings-window",role:"dialog","aria-modal":"true","aria-label":"设置",children:[l.jsxs("aside",{className:"settings-sidebar",children:[l.jsxs("label",{className:"settings-search",children:[l.jsx(NA,{}),l.jsx("input",{value:u,onChange:D=>h(D.target.value),placeholder:"搜索设置","aria-label":"搜索设置"})]}),l.jsx("div",{className:"settings-sidebar-title",children:"设置"}),l.jsxs("nav",{className:"settings-nav","aria-label":"设置分类",children:[k.map(D=>l.jsxs("button",{type:"button",className:s===D.key?"settings-nav-item active":"settings-nav-item","aria-current":s===D.key?"page":void 0,onClick:()=>o(D.key),children:[l.jsx("span",{className:"settings-nav-icon",children:D.icon}),l.jsx("span",{children:D.label})]},D.key)),k.length===0&&l.jsx("p",{className:"settings-empty-search",children:"没有匹配的设置"})]})]}),l.jsxs("main",{className:"settings-main",children:[l.jsx("button",{ref:j,type:"button",className:"settings-close",onClick:a,"aria-label":"关闭设置",children:l.jsx(RA,{})}),l.jsxs("div",{className:"settings-content",children:[b==="settings.open"&&!f?l.jsx("div",{className:"settings-loading",children:"正在读取本机设置…"}):l.jsxs(l.Fragment,{children:[s==="connection"&&f&&l.jsx(wA,{state:f,busy:b,run:C}),s==="notification"&&f&&l.jsx(jA,{state:f,busy:b,run:C}),s==="data"&&f&&l.jsx(EA,{state:f,busy:b,run:C}),s==="about"&&f&&l.jsx(TA,{state:f})]}),(p||v)&&l.jsx("div",{className:`settings-message ${v?"error":""}`,role:"status","aria-live":"polite",children:v||p})]})]})]})}):null}function wA({state:n,busy:a,run:s}){const[o,u]=S.useState(""),[h,f]=S.useState(!1),[m,p]=S.useState(n.notion.rootPageId);S.useEffect(()=>p(n.notion.rootPageId),[n.notion.rootPageId]);const g=async b=>{await s(b,{token:h?o:"",rootPageId:m})&&(u(""),f(!1))},v=a==="settings.refreshDataSources",x=a==="settings.saveConnection";return l.jsxs(Al,{title:"连接",description:"管理生产助手使用的外部数据源和服务连接。",children:[l.jsxs(Fr,{title:"Notion",children:[l.jsx(Ut,{title:"连接状态",description:"当前本机连接配置和数据源缓存状态",children:l.jsx(Q0,{connected:n.notion.configured,label:n.notion.configured?"已配置":"未配置"})}),l.jsx(Ji,{title:"API 令牌",description:"使用 Windows 当前用户加密后保存在本机",children:l.jsx("input",{className:"settings-input",type:"password",autoComplete:"off",placeholder:"输入 Notion API Token",value:h?o:n.notion.configured?lf:"",onFocus:b=>{!h&&n.notion.configured&&b.currentTarget.select()},onChange:b=>{f(!0),u(b.target.value)}})}),l.jsx(Ji,{title:"根页面 ID",description:"可选。留空时自动发现当前令牌有权限访问的数据源",children:l.jsx("input",{className:"settings-input",value:m,onChange:b=>p(b.target.value)})}),l.jsxs("div",{className:"settings-buttons",children:[l.jsxs("button",{type:"button",className:"settings-button-primary",disabled:!!a,onClick:()=>g("settings.saveConnection"),children:[x&&l.jsx(as,{})," ",x?"正在连接…":"保存并连接"]}),l.jsxs("button",{type:"button",className:"settings-button-secondary",disabled:!!a,onClick:()=>g("settings.refreshDataSources"),children:[v&&l.jsx(as,{})," ",v?"正在刷新…":"刷新数据源"]})]})]}),l.jsxs(Fr,{title:"数据源",children:[l.jsx(Ut,{title:"已发现数据源",description:"最近一次从 Notion 获取的数据源",children:l.jsxs("span",{className:"settings-value",children:[n.notion.dataSourceCount," 个"]})}),l.jsx(Ut,{title:"上次同步",description:"数据源元信息最后更新时间",children:l.jsx("span",{className:"settings-value",children:n.notion.lastSyncedAt||"尚未同步"})})]})]})}function jA({state:n,busy:a,run:s}){const o=n.notification,[u,h]=S.useState(o.enabled),[f,m]=S.useState(o.channelName),[p,g]=S.useState(""),[v,x]=S.useState(""),[b,E]=S.useState(!1),[j,N]=S.useState(!1),[C,k]=S.useState(o.rules);S.useEffect(()=>{h(o.enabled),m(o.channelName),k(o.rules)},[o]);const D={enabled:u,channelName:f,webhook:b?p:"",secret:j?v:""},V=async Y=>{await s(Y,D)&&(g(""),x(""),E(!1),N(!1))},R=a==="settings.saveNotification",B=a==="settings.testNotification";return l.jsxs(Al,{title:"通知",description:"配置生产助手全局通知使用的技术通道。业务模块只决定何时通知。",children:[l.jsxs(Fr,{title:"通知服务",children:[l.jsx(Ut,{title:"启用通知",description:"关闭后所有业务模块都不会向外发送通知",children:l.jsx(ax,{checked:u,onChange:h,label:"启用通知"})}),l.jsx(Ut,{title:"发送方式",description:"当前使用的全局通知技术通道",children:l.jsx("span",{className:"settings-value",children:"钉钉机器人 Webhook"})}),l.jsx(Ut,{title:"连接状态",description:o.checkedAt?`上次测试 ${o.checkedAt}`:"尚未发送测试通知",children:l.jsx(Q0,{connected:o.connected,label:o.connected===!0?"连接正常":o.connected===!1?"连接失败":"待测试"})})]}),l.jsxs(Fr,{title:"钉钉机器人",children:[l.jsx(Ji,{title:"Webhook URL",description:"使用 Windows 当前用户加密后保存在本机",children:l.jsx("input",{className:"settings-input",type:"password",autoComplete:"off",placeholder:"https://oapi.dingtalk.com/robot/send?...",value:b?p:o.webhookConfigured?lf:"",onFocus:Y=>{!b&&o.webhookConfigured&&Y.currentTarget.select()},onChange:Y=>{E(!0),g(Y.target.value)}})}),l.jsx(Ji,{title:"加签密钥",description:"钉钉机器人 Secret，使用 Windows 当前用户加密保存",children:l.jsx("input",{className:"settings-input",type:"password",autoComplete:"off",placeholder:"SEC...",value:j?v:o.secretConfigured?lf:"",onFocus:Y=>{!j&&o.secretConfigured&&Y.currentTarget.select()},onChange:Y=>{N(!0),x(Y.target.value)}})}),l.jsx(Ji,{title:"默认接收群",description:"用于识别当前通知渠道",children:l.jsx("input",{className:"settings-input",value:f,onChange:Y=>m(Y.target.value),placeholder:"生产管理群"})}),l.jsxs("div",{className:"settings-buttons",children:[l.jsxs("button",{type:"button",className:"settings-button-primary",disabled:!!a,onClick:()=>V("settings.saveNotification"),children:[R&&l.jsx(as,{})," ",R?"正在保存…":"保存设置"]}),l.jsxs("button",{type:"button",className:"settings-button-secondary",disabled:!!a,onClick:()=>V("settings.testNotification"),children:[B&&l.jsx(as,{})," ",B?"正在发送…":"发送测试"]})]}),o.status&&l.jsx("p",{className:"settings-inline-status",children:o.status})]}),l.jsxs(Fr,{title:"通知规则",children:[l.jsx("div",{className:"settings-rule-list",children:C.map(Y=>l.jsx(Ut,{title:Y.name,description:`钉钉 · ${CA(Y.level)}`,children:l.jsx(ax,{checked:Y.enabled,label:`通知规则：${Y.name}`,onChange:A=>k(q=>q.map(U=>U.eventType===Y.eventType?{...U,enabled:A}:U))})},Y.eventType))}),l.jsx("div",{className:"settings-buttons settings-buttons-end",children:l.jsx("button",{type:"button",className:"settings-button-primary",disabled:!!a,onClick:()=>s("settings.saveNotificationRules",{rules:C}),children:"保存通知规则"})})]})]})}function EA({state:n,busy:a,run:s}){return l.jsx(Al,{title:"数据与缓存",description:"查看和维护生产助手保存在本机的 Notion 数据源缓存。",children:l.jsxs(Fr,{title:"本地数据",children:[l.jsx(Ut,{title:"Notion 数据源缓存",description:"用于减少重复的网络请求",children:l.jsxs("div",{className:"settings-inline-actions",children:[l.jsxs("span",{className:"settings-value",children:[n.notion.dataSourceCount," 个"]}),l.jsxs("button",{type:"button",className:"settings-text-button",disabled:!!a,onClick:()=>s("settings.refreshDataSources"),children:[a==="settings.refreshDataSources"&&l.jsx(as,{})," ",a==="settings.refreshDataSources"?"刷新中…":"刷新"]})]})}),l.jsx(Ut,{title:"上次同步",description:"数据源元信息最后更新时间",children:l.jsx("span",{className:"settings-value",children:n.notion.lastSyncedAt||"尚未同步"})})]})})}function TA({state:n}){return l.jsx(Al,{title:"关于",description:"生产助手的版本和运行环境信息。",children:l.jsxs(Fr,{title:"生产助手",children:[l.jsx(Ut,{title:"版本",description:"当前安装版本",children:l.jsx("span",{className:"settings-value",children:n.version})}),l.jsx(Ut,{title:"桌面环境",description:"应用运行容器",children:l.jsx("span",{className:"settings-value",children:"WinUI 3 + WebView2"})}),l.jsx(Ut,{title:"前端",description:"用户界面技术栈",children:l.jsx("span",{className:"settings-value",children:"React + TypeScript"})}),l.jsx(Ut,{title:"本地数据保护",description:"令牌和通知凭据仅保存在本机",children:l.jsx("span",{className:"settings-value",children:"Windows 当前用户加密"})})]})})}function Al({title:n,description:a,children:s}){return l.jsxs("div",{className:"settings-page",children:[l.jsxs("header",{className:"settings-page-header",children:[l.jsx("h1",{children:n}),l.jsx("p",{children:a})]}),s]})}function Fr({title:n,children:a}){return l.jsxs("section",{className:"settings-section",children:[l.jsx("h2",{children:n}),l.jsx("div",{className:"settings-section-body",children:a})]})}function Ut({title:n,description:a,children:s}){return l.jsxs("div",{className:"settings-row",children:[l.jsxs("div",{className:"settings-row-text",children:[l.jsx("div",{className:"settings-row-title",children:n}),a&&l.jsx("div",{className:"settings-row-description",children:a})]}),l.jsx("div",{className:"settings-row-control",children:s})]})}function Ji({title:n,description:a,children:s}){return l.jsxs("label",{className:"settings-field",children:[l.jsx("span",{className:"settings-field-title",children:n}),a&&l.jsx("span",{className:"settings-field-description",children:a}),l.jsx("span",{className:"settings-field-control",children:s})]})}function ax({checked:n,onChange:a,label:s}){return l.jsx("button",{type:"button",role:"switch","aria-checked":n,"aria-label":s,className:n?"settings-switch checked":"settings-switch",onClick:()=>a(!n),children:l.jsx("span",{})})}function Q0({connected:n,label:a}){return l.jsxs("div",{className:`settings-connected ${n===!1?"error":n===null?"pending":""}`,children:[l.jsx("span",{className:"settings-status-dot"}),a]})}function as(){return l.jsx("span",{className:"settings-spinner","aria-hidden":"true"})}const CA=n=>n==="warning"?"警告":n==="info"?"信息":"错误";function NA(){return l.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[l.jsx("circle",{cx:"11",cy:"11",r:"6.5"}),l.jsx("path",{d:"m16 16 4 4"})]})}function DA(){return l.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[l.jsx("path",{d:"M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"}),l.jsx("path",{d:"M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1"})]})}function AA(){return l.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[l.jsx("path",{d:"M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"}),l.jsx("path",{d:"M10 21h4"})]})}function MA(){return l.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[l.jsx("ellipse",{cx:"12",cy:"5",rx:"7",ry:"3"}),l.jsx("path",{d:"M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5"}),l.jsx("path",{d:"M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"})]})}function kA(){return l.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[l.jsx("circle",{cx:"12",cy:"12",r:"9"}),l.jsx("path",{d:"M12 11v6"}),l.jsx("path",{d:"M12 7h.01"})]})}function RA(){return l.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[l.jsx("path",{d:"m6 6 12 12"}),l.jsx("path",{d:"m18 6-12 12"})]})}const jd=new Date().toISOString().slice(0,10);function OA(){const[n,a]=S.useState(""),[s,o]=S.useState(!1),[u,h]=S.useState([]),[f,m]=S.useState(""),[p,g]=S.useState([]),[v,x]=S.useState(""),[b,E]=S.useState([]),[j,N]=S.useState(""),[C,k]=S.useState([]),[D,V]=S.useState(""),[R,B]=S.useState(""),[Y,A]=S.useState("day"),[q,U]=S.useState(jd),[_,$]=S.useState(jd),[W,le]=S.useState(jd),[Z,ce]=S.useState("load"),[L,se]=S.useState(""),[Q,X]=S.useState();S.useEffect(()=>{ye("database.getState").then(re=>{a(re.provider),o(re.usesBusinessSections),h(re.businessSections),g(re.sources)}).catch(re=>se(re instanceof Error?re.message:String(re))).finally(()=>ce(""))},[]);const ae=async re=>{var pe,Ce,Oe,Qe;if(x(re),N(""),V(""),B(""),E([]),k([]),X(void 0),se(""),!!re){ce("schema");try{const Fe=await ye("database.getSchema",{sourceId:re});k(Fe.fields),E(Fe.datasets),V(((pe=Fe.fields.find(yt=>yt.type==="date"))==null?void 0:pe.id)||""),B(((Ce=Fe.fields.find(yt=>yt.type==="number"))==null?void 0:Ce.id)||""),N(((Oe=Fe.datasets.find(yt=>yt.name==="本年截止今日"))==null?void 0:Oe.id)||((Qe=Fe.datasets[0])==null?void 0:Qe.id)||"")}catch(Fe){se(Fe instanceof Error?Fe.message:String(Fe))}finally{ce("")}}},T=async()=>{ce("query"),se(""),X(void 0);try{X(await ye("database.inspect",{sourceId:v,datasetId:j,dateFieldId:xe?D:"",valueFieldId:xe?R:"",rangeKind:xe?Y:"all",businessDate:q,startDate:_,endDate:W},12e4))}catch(re){se(re instanceof Error?re.message:String(re))}finally{ce("")}},O=C.filter(re=>re.type==="date"),te=s?p.filter(re=>re.businessSection===f):p,oe=C.filter(re=>re.type==="number"),ue=C.find(re=>re.id===R),me=b.find(re=>re.id===j),xe=(me==null?void 0:me.name.trim())==="本年截止今日",ie=S.useMemo(()=>{const re=new Set([D,R]);return[...C.filter(pe=>re.has(pe.id)),...C.filter(pe=>!re.has(pe.id))]},[C,D,R]),I=Y==="week"||Y==="custom",de=v&&j&&(!xe||D&&(!I||_&&W));return l.jsxs("div",{className:"page database-viewer-page",children:[l.jsxs("header",{children:[l.jsxs("div",{children:[l.jsx("h1",{children:"数据库查看"}),l.jsx("p",{children:"按当前适配器提供的目录选择数据库并查看真实 View；目录层级不会由界面写死。"})]}),l.jsxs("span",{className:"database-provider",children:[l.jsx(Kd,{}),"当前适配器：",n||"读取中"]})]}),l.jsxs("section",{className:"database-query-panel",children:[l.jsxs("div",{className:"database-query-heading",children:[l.jsx("h2",{children:"查询条件"}),l.jsx("p",{children:"普通 View 读取其完整结果；只有“本年截止今日”可在返回记录内计算日期口径。"})]}),l.jsxs("div",{className:"database-query-grid",children:[s&&l.jsxs("label",{children:["业务板块",l.jsx(Jt,{value:f,placeholder:Z==="load"?"正在读取业务板块…":"请选择业务板块",disabled:!!Z,options:u.map(re=>({value:re,label:re})),onChange:re=>{m(re),ae("")}})]}),l.jsxs("label",{children:["数据库",l.jsx(Jt,{value:v,placeholder:"请选择具体数据库",disabled:s&&!f||!!Z,options:te.map(re=>({value:re.id,label:re.name})),onChange:ae})]}),l.jsxs("label",{children:["View",l.jsx(Jt,{value:j,placeholder:Z==="schema"?"正在读取 View…":"请选择 View",disabled:!v||!!Z,options:b.map(re=>({value:re.id,label:re.name})),onChange:re=>{N(re),X(void 0)}})]}),xe&&l.jsxs(l.Fragment,{children:[l.jsxs("label",{children:["日期字段",l.jsx(Jt,{value:D,placeholder:"请选择日期字段",disabled:!C.length||!!Z,options:O.map(re=>({value:re.id,label:re.name})),onChange:V})]}),l.jsxs("label",{children:["累计字段",l.jsx(Jt,{value:R,placeholder:"可选择数值字段",disabled:!C.length||!!Z,options:oe.map(re=>({value:re.id,label:re.name})),onChange:B})]}),l.jsxs("label",{children:["软件查询口径",l.jsx(Jt,{value:Y,placeholder:"请选择日期口径",disabled:!!Z,options:[{value:"day",label:"指定日期"},{value:"week",label:"指定日期范围"},{value:"month",label:"月初至指定日期"},{value:"year",label:"年初至指定日期"}],onChange:re=>{A(re),X(void 0)}})]}),!I&&l.jsxs("label",{children:["指定日期",l.jsx(xn,{value:q,onChange:U})]}),I&&l.jsxs(l.Fragment,{children:[l.jsxs("label",{children:["开始日期",l.jsx(xn,{value:_,onChange:$})]}),l.jsxs("label",{children:["结束日期",l.jsx(xn,{value:W,onChange:le})]})]})]})]}),l.jsx("div",{className:"database-query-actions",children:l.jsxs("button",{className:"primary",disabled:!de||!!Z,onClick:T,children:[Z==="query"?l.jsx(Sn,{className:"spin"}):l.jsx(YC,{}),Z==="query"?"正在查询…":"执行查询"]})})]}),L&&l.jsxs("div",{className:"notice error",role:"alert",children:[l.jsx(LC,{}),l.jsxs("div",{children:[l.jsx("strong",{children:"查询失败"}),l.jsx("span",{children:L})]})]}),Q?l.jsxs("section",{className:"database-result",children:[l.jsxs("div",{className:"database-result-head",children:[l.jsxs("div",{children:[l.jsxs("h2",{children:[Q.sourceName," · ",Q.datasetName]}),l.jsx("p",{children:xe?`${Q.startDate} ～ ${Q.endDate}`:"完整 View 结果"})]}),l.jsxs("dl",{children:[l.jsxs("div",{children:[l.jsxs("dt",{children:[l.jsx(XC,{}),"命中记录"]}),l.jsx("dd",{children:Q.recordCount})]}),xe&&l.jsxs("div",{children:[l.jsxs("dt",{children:[l.jsx(FC,{}),(ue==null?void 0:ue.name)||"累计值"]}),l.jsx("dd",{children:Q.total??"—"})]})]})]}),l.jsx("div",{className:"database-table-wrap",children:l.jsxs("table",{children:[l.jsx("thead",{children:l.jsx("tr",{children:ie.map(re=>l.jsxs("th",{children:[re.name,l.jsx("small",{children:re.type})]},re.id))})}),l.jsx("tbody",{children:Q.records.map(re=>l.jsx("tr",{children:ie.map(pe=>l.jsx("td",{children:zA(re.values[pe.id])},pe.id))},re.id))})]})}),Q.truncated&&l.jsx("p",{className:"database-truncated",children:"结果仅展示前 200 条，命中数量和累计值按全部记录计算。"})]}):!Z&&!L&&l.jsxs("section",{className:"database-empty",children:[l.jsx(Kd,{}),l.jsx("h2",{children:s?"选择业务板块、数据库和 View 后执行查询":"选择数据库和 View 后执行查询"}),l.jsx("p",{children:"普通 View 显示完整结果；“本年截止今日”可进一步选择日期口径。所有操作均为只读。"})]})]})}function zA(n){return n==null||n===""?"—":typeof n=="boolean"?n?"是":"否":typeof n=="number"?n.toLocaleString("zh-CN",{maximumFractionDigits:2}):String(n)}function _A(){const[n,a]=S.useState(()=>window.location.search),[s,o]=S.useState(!1);S.useEffect(()=>{const E=()=>a(window.location.search);return window.addEventListener("popstate",E),()=>window.removeEventListener("popstate",E)},[]);const u=new URLSearchParams(n),h=u.get("route"),f=h!=null&&h.startsWith("navigation:")||h==="daily-weld"||h==="production-message"||h==="database-viewer"||h==="daily-report"||h==="report-center"||h==="plan-pdf"||h==="production-meeting"?h:"production-message",m=u.get("navigation")||"",p=Fb();S.useEffect(()=>{AC(f,m)},[f,m]);const g=E=>ye("app.navigateNative",{tag:E}).catch(()=>{}),v=f.startsWith("navigation:")?f.slice(11):f,x=f.startsWith("navigation:");S.useEffect(()=>(document.body.classList.toggle("settings-over-native",x&&s),()=>document.body.classList.remove("settings-over-native")),[x,s]);const b=()=>{o(!1),window.dispatchEvent(new Event("production-settings-updated")),ye("settings.close").catch(()=>{})};return l.jsxs("div",{className:`desktop-shell ${x&&s?"settings-over-native":""}`,children:[l.jsx("div",{className:"production-message-demo desktop-shell-navigation",children:l.jsx(oA,{active:v,navigate:g,openSettings:()=>o(!0)})}),l.jsx("div",{className:`desktop-shell-content ${x?"desktop-shell-content-native":""}`,children:x?l.jsx("div",{className:"native-content-slot","aria-hidden":"true"}):l.jsx(vT,{mode:"wait",children:l.jsx($b.div,{className:f==="production-message"||f==="daily-weld"?"production-message-demo production-message-content":"app-shell","data-page-route":f,initial:p?!1:{opacity:0,y:8},animate:{opacity:1,y:0},exit:p?void 0:{opacity:0,y:-6},transition:{duration:.2},children:f==="production-message"?l.jsx(mA,{}):f==="daily-weld"?l.jsx(aA,{openSettings:()=>o(!0)}):l.jsx("main",{children:f==="production-meeting"?l.jsx(xA,{}):f==="plan-pdf"?l.jsx(yA,{}):f==="database-viewer"?l.jsx(OA,{}):f==="daily-report"?l.jsx(tA,{openSettings:()=>o(!0)}):l.jsx(bA,{})})},f)})}),l.jsx(SA,{open:s,onClose:b})]})}Dw.createRoot(document.getElementById("root")).render(l.jsx(ox.StrictMode,{children:l.jsx(_A,{})}));
