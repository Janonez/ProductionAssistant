function Sw(n,a){for(var s=0;s<a.length;s++){const l=a[s];if(typeof l!="string"&&!Array.isArray(l)){for(const u in l)if(u!=="default"&&!(u in n)){const h=Object.getOwnPropertyDescriptor(l,u);h&&Object.defineProperty(n,u,h.get?h:{enumerable:!0,get:()=>l[u]})}}}return Object.freeze(Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}))}(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const u of document.querySelectorAll('link[rel="modulepreload"]'))l(u);new MutationObserver(u=>{for(const h of u)if(h.type==="childList")for(const f of h.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&l(f)}).observe(document,{childList:!0,subtree:!0});function s(u){const h={};return u.integrity&&(h.integrity=u.integrity),u.referrerPolicy&&(h.referrerPolicy=u.referrerPolicy),u.crossOrigin==="use-credentials"?h.credentials="include":u.crossOrigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function l(u){if(u.ep)return;u.ep=!0;const h=s(u);fetch(u.href,h)}})();function ox(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var Xu={exports:{}},qi={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ty;function ww(){if(ty)return qi;ty=1;var n=Symbol.for("react.transitional.element"),a=Symbol.for("react.fragment");function s(l,u,h){var f=null;if(h!==void 0&&(f=""+h),u.key!==void 0&&(f=""+u.key),"key"in u){h={};for(var m in u)m!=="key"&&(h[m]=u[m])}else h=u;return u=h.ref,{$$typeof:n,type:l,key:f,ref:u!==void 0?u:null,props:h}}return qi.Fragment=a,qi.jsx=s,qi.jsxs=s,qi}var ny;function jw(){return ny||(ny=1,Xu.exports=ww()),Xu.exports}var o=jw(),Fu={exports:{}},Se={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ry;function Ew(){if(ry)return Se;ry=1;var n=Symbol.for("react.transitional.element"),a=Symbol.for("react.portal"),s=Symbol.for("react.fragment"),l=Symbol.for("react.strict_mode"),u=Symbol.for("react.profiler"),h=Symbol.for("react.consumer"),f=Symbol.for("react.context"),m=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),g=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),x=Symbol.for("react.activity"),b=Symbol.iterator;function E(T){return T===null||typeof T!="object"?null:(T=b&&T[b]||T["@@iterator"],typeof T=="function"?T:null)}var j={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},N=Object.assign,C={};function k(T,R,ee){this.props=T,this.context=R,this.refs=C,this.updater=ee||j}k.prototype.isReactComponent={},k.prototype.setState=function(T,R){if(typeof T!="object"&&typeof T!="function"&&T!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,T,R,"setState")},k.prototype.forceUpdate=function(T){this.updater.enqueueForceUpdate(this,T,"forceUpdate")};function D(){}D.prototype=k.prototype;function z(T,R,ee){this.props=T,this.context=R,this.refs=C,this.updater=ee||j}var O=z.prototype=new D;O.constructor=z,N(O,k.prototype),O.isPureReactComponent=!0;var H=Array.isArray;function Y(){}var A={H:null,A:null,T:null,S:null},L=Object.prototype.hasOwnProperty;function B(T,R,ee){var se=ee.ref;return{$$typeof:n,type:T,key:R,ref:se!==void 0?se:null,props:ee}}function V(T,R){return B(T.type,R,T.props)}function $(T){return typeof T=="object"&&T!==null&&T.$$typeof===n}function J(T){var R={"=":"=0",":":"=2"};return"$"+T.replace(/[=:]/g,function(ee){return R[ee]})}var oe=/\/+/g;function ce(T,R){return typeof T=="object"&&T!==null&&T.key!=null?J(""+T.key):R.toString(36)}function le(T){switch(T.status){case"fulfilled":return T.value;case"rejected":throw T.reason;default:switch(typeof T.status=="string"?T.then(Y,Y):(T.status="pending",T.then(function(R){T.status==="pending"&&(T.status="fulfilled",T.value=R)},function(R){T.status==="pending"&&(T.status="rejected",T.reason=R)})),T.status){case"fulfilled":return T.value;case"rejected":throw T.reason}}throw T}function U(T,R,ee,se,ue){var me=typeof T;(me==="undefined"||me==="boolean")&&(T=null);var xe=!1;if(T===null)xe=!0;else switch(me){case"bigint":case"string":case"number":xe=!0;break;case"object":switch(T.$$typeof){case n:case a:xe=!0;break;case v:return xe=T._init,U(xe(T._payload),R,ee,se,ue)}}if(xe)return ue=ue(T),xe=se===""?"."+ce(T,0):se,H(ue)?(ee="",xe!=null&&(ee=xe.replace(oe,"$&/")+"/"),U(ue,R,ee,"",function(de){return de})):ue!=null&&($(ue)&&(ue=V(ue,ee+(ue.key==null||T&&T.key===ue.key?"":(""+ue.key).replace(oe,"$&/")+"/")+xe)),R.push(ue)),1;xe=0;var ie=se===""?".":se+":";if(H(T))for(var W=0;W<T.length;W++)se=T[W],me=ie+ce(se,W),xe+=U(se,R,ee,me,ue);else if(W=E(T),typeof W=="function")for(T=W.call(T),W=0;!(se=T.next()).done;)se=se.value,me=ie+ce(se,W++),xe+=U(se,R,ee,me,ue);else if(me==="object"){if(typeof T.then=="function")return U(le(T),R,ee,se,ue);throw R=String(T),Error("Objects are not valid as a React child (found: "+(R==="[object Object]"?"object with keys {"+Object.keys(T).join(", ")+"}":R)+"). If you meant to render a collection of children, use an array instead.")}return xe}function ae(T,R,ee){if(T==null)return T;var se=[],ue=0;return U(T,se,"","",function(me){return R.call(ee,me,ue++)}),se}function Z(T){if(T._status===-1){var R=T._result;R=R(),R.then(function(ee){(T._status===0||T._status===-1)&&(T._status=1,T._result=ee)},function(ee){(T._status===0||T._status===-1)&&(T._status=2,T._result=ee)}),T._status===-1&&(T._status=0,T._result=R)}if(T._status===1)return T._result.default;throw T._result}var X=typeof reportError=="function"?reportError:function(T){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var R=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof T=="object"&&T!==null&&typeof T.message=="string"?String(T.message):String(T),error:T});if(!window.dispatchEvent(R))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",T);return}console.error(T)},re={map:ae,forEach:function(T,R,ee){ae(T,function(){R.apply(this,arguments)},ee)},count:function(T){var R=0;return ae(T,function(){R++}),R},toArray:function(T){return ae(T,function(R){return R})||[]},only:function(T){if(!$(T))throw Error("React.Children.only expected to receive a single React element child.");return T}};return Se.Activity=x,Se.Children=re,Se.Component=k,Se.Fragment=s,Se.Profiler=u,Se.PureComponent=z,Se.StrictMode=l,Se.Suspense=p,Se.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=A,Se.__COMPILER_RUNTIME={__proto__:null,c:function(T){return A.H.useMemoCache(T)}},Se.cache=function(T){return function(){return T.apply(null,arguments)}},Se.cacheSignal=function(){return null},Se.cloneElement=function(T,R,ee){if(T==null)throw Error("The argument must be a React element, but you passed "+T+".");var se=N({},T.props),ue=T.key;if(R!=null)for(me in R.key!==void 0&&(ue=""+R.key),R)!L.call(R,me)||me==="key"||me==="__self"||me==="__source"||me==="ref"&&R.ref===void 0||(se[me]=R[me]);var me=arguments.length-2;if(me===1)se.children=ee;else if(1<me){for(var xe=Array(me),ie=0;ie<me;ie++)xe[ie]=arguments[ie+2];se.children=xe}return B(T.type,ue,se)},Se.createContext=function(T){return T={$$typeof:f,_currentValue:T,_currentValue2:T,_threadCount:0,Provider:null,Consumer:null},T.Provider=T,T.Consumer={$$typeof:h,_context:T},T},Se.createElement=function(T,R,ee){var se,ue={},me=null;if(R!=null)for(se in R.key!==void 0&&(me=""+R.key),R)L.call(R,se)&&se!=="key"&&se!=="__self"&&se!=="__source"&&(ue[se]=R[se]);var xe=arguments.length-2;if(xe===1)ue.children=ee;else if(1<xe){for(var ie=Array(xe),W=0;W<xe;W++)ie[W]=arguments[W+2];ue.children=ie}if(T&&T.defaultProps)for(se in xe=T.defaultProps,xe)ue[se]===void 0&&(ue[se]=xe[se]);return B(T,me,ue)},Se.createRef=function(){return{current:null}},Se.forwardRef=function(T){return{$$typeof:m,render:T}},Se.isValidElement=$,Se.lazy=function(T){return{$$typeof:v,_payload:{_status:-1,_result:T},_init:Z}},Se.memo=function(T,R){return{$$typeof:g,type:T,compare:R===void 0?null:R}},Se.startTransition=function(T){var R=A.T,ee={};A.T=ee;try{var se=T(),ue=A.S;ue!==null&&ue(ee,se),typeof se=="object"&&se!==null&&typeof se.then=="function"&&se.then(Y,X)}catch(me){X(me)}finally{R!==null&&ee.types!==null&&(R.types=ee.types),A.T=R}},Se.unstable_useCacheRefresh=function(){return A.H.useCacheRefresh()},Se.use=function(T){return A.H.use(T)},Se.useActionState=function(T,R,ee){return A.H.useActionState(T,R,ee)},Se.useCallback=function(T,R){return A.H.useCallback(T,R)},Se.useContext=function(T){return A.H.useContext(T)},Se.useDebugValue=function(){},Se.useDeferredValue=function(T,R){return A.H.useDeferredValue(T,R)},Se.useEffect=function(T,R){return A.H.useEffect(T,R)},Se.useEffectEvent=function(T){return A.H.useEffectEvent(T)},Se.useId=function(){return A.H.useId()},Se.useImperativeHandle=function(T,R,ee){return A.H.useImperativeHandle(T,R,ee)},Se.useInsertionEffect=function(T,R){return A.H.useInsertionEffect(T,R)},Se.useLayoutEffect=function(T,R){return A.H.useLayoutEffect(T,R)},Se.useMemo=function(T,R){return A.H.useMemo(T,R)},Se.useOptimistic=function(T,R){return A.H.useOptimistic(T,R)},Se.useReducer=function(T,R,ee){return A.H.useReducer(T,R,ee)},Se.useRef=function(T){return A.H.useRef(T)},Se.useState=function(T){return A.H.useState(T)},Se.useSyncExternalStore=function(T,R,ee){return A.H.useSyncExternalStore(T,R,ee)},Se.useTransition=function(){return A.H.useTransition()},Se.version="19.2.8",Se}var ay;function uf(){return ay||(ay=1,Fu.exports=Ew()),Fu.exports}var S=uf();const cx=ox(S),is=Sw({__proto__:null,default:cx},[S]);var $u={exports:{}},Yi={},Ku={exports:{}},Zu={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var iy;function Tw(){return iy||(iy=1,(function(n){function a(U,ae){var Z=U.length;U.push(ae);e:for(;0<Z;){var X=Z-1>>>1,re=U[X];if(0<u(re,ae))U[X]=ae,U[Z]=re,Z=X;else break e}}function s(U){return U.length===0?null:U[0]}function l(U){if(U.length===0)return null;var ae=U[0],Z=U.pop();if(Z!==ae){U[0]=Z;e:for(var X=0,re=U.length,T=re>>>1;X<T;){var R=2*(X+1)-1,ee=U[R],se=R+1,ue=U[se];if(0>u(ee,Z))se<re&&0>u(ue,ee)?(U[X]=ue,U[se]=Z,X=se):(U[X]=ee,U[R]=Z,X=R);else if(se<re&&0>u(ue,Z))U[X]=ue,U[se]=Z,X=se;else break e}}return ae}function u(U,ae){var Z=U.sortIndex-ae.sortIndex;return Z!==0?Z:U.id-ae.id}if(n.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var h=performance;n.unstable_now=function(){return h.now()}}else{var f=Date,m=f.now();n.unstable_now=function(){return f.now()-m}}var p=[],g=[],v=1,x=null,b=3,E=!1,j=!1,N=!1,C=!1,k=typeof setTimeout=="function"?setTimeout:null,D=typeof clearTimeout=="function"?clearTimeout:null,z=typeof setImmediate<"u"?setImmediate:null;function O(U){for(var ae=s(g);ae!==null;){if(ae.callback===null)l(g);else if(ae.startTime<=U)l(g),ae.sortIndex=ae.expirationTime,a(p,ae);else break;ae=s(g)}}function H(U){if(N=!1,O(U),!j)if(s(p)!==null)j=!0,Y||(Y=!0,J());else{var ae=s(g);ae!==null&&le(H,ae.startTime-U)}}var Y=!1,A=-1,L=5,B=-1;function V(){return C?!0:!(n.unstable_now()-B<L)}function $(){if(C=!1,Y){var U=n.unstable_now();B=U;var ae=!0;try{e:{j=!1,N&&(N=!1,D(A),A=-1),E=!0;var Z=b;try{t:{for(O(U),x=s(p);x!==null&&!(x.expirationTime>U&&V());){var X=x.callback;if(typeof X=="function"){x.callback=null,b=x.priorityLevel;var re=X(x.expirationTime<=U);if(U=n.unstable_now(),typeof re=="function"){x.callback=re,O(U),ae=!0;break t}x===s(p)&&l(p),O(U)}else l(p);x=s(p)}if(x!==null)ae=!0;else{var T=s(g);T!==null&&le(H,T.startTime-U),ae=!1}}break e}finally{x=null,b=Z,E=!1}ae=void 0}}finally{ae?J():Y=!1}}}var J;if(typeof z=="function")J=function(){z($)};else if(typeof MessageChannel<"u"){var oe=new MessageChannel,ce=oe.port2;oe.port1.onmessage=$,J=function(){ce.postMessage(null)}}else J=function(){k($,0)};function le(U,ae){A=k(function(){U(n.unstable_now())},ae)}n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(U){U.callback=null},n.unstable_forceFrameRate=function(U){0>U||125<U?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):L=0<U?Math.floor(1e3/U):5},n.unstable_getCurrentPriorityLevel=function(){return b},n.unstable_next=function(U){switch(b){case 1:case 2:case 3:var ae=3;break;default:ae=b}var Z=b;b=ae;try{return U()}finally{b=Z}},n.unstable_requestPaint=function(){C=!0},n.unstable_runWithPriority=function(U,ae){switch(U){case 1:case 2:case 3:case 4:case 5:break;default:U=3}var Z=b;b=U;try{return ae()}finally{b=Z}},n.unstable_scheduleCallback=function(U,ae,Z){var X=n.unstable_now();switch(typeof Z=="object"&&Z!==null?(Z=Z.delay,Z=typeof Z=="number"&&0<Z?X+Z:X):Z=X,U){case 1:var re=-1;break;case 2:re=250;break;case 5:re=1073741823;break;case 4:re=1e4;break;default:re=5e3}return re=Z+re,U={id:v++,callback:ae,priorityLevel:U,startTime:Z,expirationTime:re,sortIndex:-1},Z>X?(U.sortIndex=Z,a(g,U),s(p)===null&&U===s(g)&&(N?(D(A),A=-1):N=!0,le(H,Z-X))):(U.sortIndex=re,a(p,U),j||E||(j=!0,Y||(Y=!0,J()))),U},n.unstable_shouldYield=V,n.unstable_wrapCallback=function(U){var ae=b;return function(){var Z=b;b=ae;try{return U.apply(this,arguments)}finally{b=Z}}}})(Zu)),Zu}var sy;function Cw(){return sy||(sy=1,Ku.exports=Tw()),Ku.exports}var Qu={exports:{}},gt={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ly;function Nw(){if(ly)return gt;ly=1;var n=uf();function a(p){var g="https://react.dev/errors/"+p;if(1<arguments.length){g+="?args[]="+encodeURIComponent(arguments[1]);for(var v=2;v<arguments.length;v++)g+="&args[]="+encodeURIComponent(arguments[v])}return"Minified React error #"+p+"; visit "+g+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function s(){}var l={d:{f:s,r:function(){throw Error(a(522))},D:s,C:s,L:s,m:s,X:s,S:s,M:s},p:0,findDOMNode:null},u=Symbol.for("react.portal");function h(p,g,v){var x=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:u,key:x==null?null:""+x,children:p,containerInfo:g,implementation:v}}var f=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function m(p,g){if(p==="font")return"";if(typeof g=="string")return g==="use-credentials"?g:""}return gt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=l,gt.createPortal=function(p,g){var v=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!g||g.nodeType!==1&&g.nodeType!==9&&g.nodeType!==11)throw Error(a(299));return h(p,g,null,v)},gt.flushSync=function(p){var g=f.T,v=l.p;try{if(f.T=null,l.p=2,p)return p()}finally{f.T=g,l.p=v,l.d.f()}},gt.preconnect=function(p,g){typeof p=="string"&&(g?(g=g.crossOrigin,g=typeof g=="string"?g==="use-credentials"?g:"":void 0):g=null,l.d.C(p,g))},gt.prefetchDNS=function(p){typeof p=="string"&&l.d.D(p)},gt.preinit=function(p,g){if(typeof p=="string"&&g&&typeof g.as=="string"){var v=g.as,x=m(v,g.crossOrigin),b=typeof g.integrity=="string"?g.integrity:void 0,E=typeof g.fetchPriority=="string"?g.fetchPriority:void 0;v==="style"?l.d.S(p,typeof g.precedence=="string"?g.precedence:void 0,{crossOrigin:x,integrity:b,fetchPriority:E}):v==="script"&&l.d.X(p,{crossOrigin:x,integrity:b,fetchPriority:E,nonce:typeof g.nonce=="string"?g.nonce:void 0})}},gt.preinitModule=function(p,g){if(typeof p=="string")if(typeof g=="object"&&g!==null){if(g.as==null||g.as==="script"){var v=m(g.as,g.crossOrigin);l.d.M(p,{crossOrigin:v,integrity:typeof g.integrity=="string"?g.integrity:void 0,nonce:typeof g.nonce=="string"?g.nonce:void 0})}}else g==null&&l.d.M(p)},gt.preload=function(p,g){if(typeof p=="string"&&typeof g=="object"&&g!==null&&typeof g.as=="string"){var v=g.as,x=m(v,g.crossOrigin);l.d.L(p,v,{crossOrigin:x,integrity:typeof g.integrity=="string"?g.integrity:void 0,nonce:typeof g.nonce=="string"?g.nonce:void 0,type:typeof g.type=="string"?g.type:void 0,fetchPriority:typeof g.fetchPriority=="string"?g.fetchPriority:void 0,referrerPolicy:typeof g.referrerPolicy=="string"?g.referrerPolicy:void 0,imageSrcSet:typeof g.imageSrcSet=="string"?g.imageSrcSet:void 0,imageSizes:typeof g.imageSizes=="string"?g.imageSizes:void 0,media:typeof g.media=="string"?g.media:void 0})}},gt.preloadModule=function(p,g){if(typeof p=="string")if(g){var v=m(g.as,g.crossOrigin);l.d.m(p,{as:typeof g.as=="string"&&g.as!=="script"?g.as:void 0,crossOrigin:v,integrity:typeof g.integrity=="string"?g.integrity:void 0})}else l.d.m(p)},gt.requestFormReset=function(p){l.d.r(p)},gt.unstable_batchedUpdates=function(p,g){return p(g)},gt.useFormState=function(p,g,v){return f.H.useFormState(p,g,v)},gt.useFormStatus=function(){return f.H.useHostTransitionStatus()},gt.version="19.2.8",gt}var oy;function ux(){if(oy)return Qu.exports;oy=1;function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(a){console.error(a)}}return n(),Qu.exports=Nw(),Qu.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var cy;function Dw(){if(cy)return Yi;cy=1;var n=Cw(),a=uf(),s=ux();function l(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var r=2;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function u(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function h(e){var t=e,r=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(r=t.return),e=t.return;while(e)}return t.tag===3?r:null}function f(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function m(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function p(e){if(h(e)!==e)throw Error(l(188))}function g(e){var t=e.alternate;if(!t){if(t=h(e),t===null)throw Error(l(188));return t!==e?null:e}for(var r=e,i=t;;){var c=r.return;if(c===null)break;var d=c.alternate;if(d===null){if(i=c.return,i!==null){r=i;continue}break}if(c.child===d.child){for(d=c.child;d;){if(d===r)return p(c),e;if(d===i)return p(c),t;d=d.sibling}throw Error(l(188))}if(r.return!==i.return)r=c,i=d;else{for(var y=!1,w=c.child;w;){if(w===r){y=!0,r=c,i=d;break}if(w===i){y=!0,i=c,r=d;break}w=w.sibling}if(!y){for(w=d.child;w;){if(w===r){y=!0,r=d,i=c;break}if(w===i){y=!0,i=d,r=c;break}w=w.sibling}if(!y)throw Error(l(189))}}if(r.alternate!==i)throw Error(l(190))}if(r.tag!==3)throw Error(l(188));return r.stateNode.current===r?e:t}function v(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=v(e),t!==null)return t;e=e.sibling}return null}var x=Object.assign,b=Symbol.for("react.element"),E=Symbol.for("react.transitional.element"),j=Symbol.for("react.portal"),N=Symbol.for("react.fragment"),C=Symbol.for("react.strict_mode"),k=Symbol.for("react.profiler"),D=Symbol.for("react.consumer"),z=Symbol.for("react.context"),O=Symbol.for("react.forward_ref"),H=Symbol.for("react.suspense"),Y=Symbol.for("react.suspense_list"),A=Symbol.for("react.memo"),L=Symbol.for("react.lazy"),B=Symbol.for("react.activity"),V=Symbol.for("react.memo_cache_sentinel"),$=Symbol.iterator;function J(e){return e===null||typeof e!="object"?null:(e=$&&e[$]||e["@@iterator"],typeof e=="function"?e:null)}var oe=Symbol.for("react.client.reference");function ce(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===oe?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case N:return"Fragment";case k:return"Profiler";case C:return"StrictMode";case H:return"Suspense";case Y:return"SuspenseList";case B:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case j:return"Portal";case z:return e.displayName||"Context";case D:return(e._context.displayName||"Context")+".Consumer";case O:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case A:return t=e.displayName||null,t!==null?t:ce(e.type)||"Memo";case L:t=e._payload,e=e._init;try{return ce(e(t))}catch{}}return null}var le=Array.isArray,U=a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ae=s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Z={pending:!1,data:null,method:null,action:null},X=[],re=-1;function T(e){return{current:e}}function R(e){0>re||(e.current=X[re],X[re]=null,re--)}function ee(e,t){re++,X[re]=e.current,e.current=t}var se=T(null),ue=T(null),me=T(null),xe=T(null);function ie(e,t){switch(ee(me,t),ee(ue,e),ee(se,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Eg(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Eg(t),e=Tg(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}R(se),ee(se,e)}function W(){R(se),R(ue),R(me)}function de(e){e.memoizedState!==null&&ee(xe,e);var t=se.current,r=Tg(t,e.type);t!==r&&(ee(ue,e),ee(se,r))}function ne(e){ue.current===e&&(R(se),R(ue)),xe.current===e&&(R(xe),Bi._currentValue=Z)}var pe,Ce;function Oe(e){if(pe===void 0)try{throw Error()}catch(r){var t=r.stack.trim().match(/\n( *(at )?)/);pe=t&&t[1]||"",Ce=-1<r.stack.indexOf(`
    at`)?" (<anonymous>)":-1<r.stack.indexOf("@")?"@unknown:0:0":""}return`
`+pe+e+Ce}var Qe=!1;function Fe(e,t){if(!e||Qe)return"";Qe=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(t){var te=function(){throw Error()};if(Object.defineProperty(te.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(te,[])}catch(K){var F=K}Reflect.construct(e,[],te)}else{try{te.call()}catch(K){F=K}e.call(te.prototype)}}else{try{throw Error()}catch(K){F=K}(te=e())&&typeof te.catch=="function"&&te.catch(function(){})}}catch(K){if(K&&F&&typeof K.stack=="string")return[K.stack,F.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var c=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");c&&c.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var d=i.DetermineComponentFrameRoot(),y=d[0],w=d[1];if(y&&w){var M=y.split(`
`),G=w.split(`
`);for(c=i=0;i<M.length&&!M[i].includes("DetermineComponentFrameRoot");)i++;for(;c<G.length&&!G[c].includes("DetermineComponentFrameRoot");)c++;if(i===M.length||c===G.length)for(i=M.length-1,c=G.length-1;1<=i&&0<=c&&M[i]!==G[c];)c--;for(;1<=i&&0<=c;i--,c--)if(M[i]!==G[c]){if(i!==1||c!==1)do if(i--,c--,0>c||M[i]!==G[c]){var Q=`
`+M[i].replace(" at new "," at ");return e.displayName&&Q.includes("<anonymous>")&&(Q=Q.replace("<anonymous>",e.displayName)),Q}while(1<=i&&0<=c);break}}}finally{Qe=!1,Error.prepareStackTrace=r}return(r=e?e.displayName||e.name:"")?Oe(r):""}function yt(e,t){switch(e.tag){case 26:case 27:case 5:return Oe(e.type);case 16:return Oe("Lazy");case 13:return e.child!==t&&t!==null?Oe("Suspense Fallback"):Oe("Suspense");case 19:return Oe("SuspenseList");case 0:case 15:return Fe(e.type,!1);case 11:return Fe(e.type.render,!1);case 1:return Fe(e.type,!0);case 31:return Oe("Activity");default:return""}}function th(e){try{var t="",r=null;do t+=yt(e,r),r=e,e=e.return;while(e);return t}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var Mo=Object.prototype.hasOwnProperty,ko=n.unstable_scheduleCallback,Ro=n.unstable_cancelCallback,I0=n.unstable_shouldYield,e1=n.unstable_requestPaint,At=n.unstable_now,t1=n.unstable_getCurrentPriorityLevel,nh=n.unstable_ImmediatePriority,rh=n.unstable_UserBlockingPriority,fs=n.unstable_NormalPriority,n1=n.unstable_LowPriority,ah=n.unstable_IdlePriority,r1=n.log,a1=n.unstable_setDisableYieldValue,Za=null,Mt=null;function Gn(e){if(typeof r1=="function"&&a1(e),Mt&&typeof Mt.setStrictMode=="function")try{Mt.setStrictMode(Za,e)}catch{}}var kt=Math.clz32?Math.clz32:l1,i1=Math.log,s1=Math.LN2;function l1(e){return e>>>=0,e===0?32:31-(i1(e)/s1|0)|0}var hs=256,ms=262144,ps=4194304;function wr(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function gs(e,t,r){var i=e.pendingLanes;if(i===0)return 0;var c=0,d=e.suspendedLanes,y=e.pingedLanes;e=e.warmLanes;var w=i&134217727;return w!==0?(i=w&~d,i!==0?c=wr(i):(y&=w,y!==0?c=wr(y):r||(r=w&~e,r!==0&&(c=wr(r))))):(w=i&~d,w!==0?c=wr(w):y!==0?c=wr(y):r||(r=i&~e,r!==0&&(c=wr(r)))),c===0?0:t!==0&&t!==c&&(t&d)===0&&(d=c&-c,r=t&-t,d>=r||d===32&&(r&4194048)!==0)?t:c}function Qa(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function o1(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ih(){var e=ps;return ps<<=1,(ps&62914560)===0&&(ps=4194304),e}function Oo(e){for(var t=[],r=0;31>r;r++)t.push(e);return t}function Ja(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function c1(e,t,r,i,c,d){var y=e.pendingLanes;e.pendingLanes=r,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=r,e.entangledLanes&=r,e.errorRecoveryDisabledLanes&=r,e.shellSuspendCounter=0;var w=e.entanglements,M=e.expirationTimes,G=e.hiddenUpdates;for(r=y&~r;0<r;){var Q=31-kt(r),te=1<<Q;w[Q]=0,M[Q]=-1;var F=G[Q];if(F!==null)for(G[Q]=null,Q=0;Q<F.length;Q++){var K=F[Q];K!==null&&(K.lane&=-536870913)}r&=~te}i!==0&&sh(e,i,0),d!==0&&c===0&&e.tag!==0&&(e.suspendedLanes|=d&~(y&~t))}function sh(e,t,r){e.pendingLanes|=t,e.suspendedLanes&=~t;var i=31-kt(t);e.entangledLanes|=t,e.entanglements[i]=e.entanglements[i]|1073741824|r&261930}function lh(e,t){var r=e.entangledLanes|=t;for(e=e.entanglements;r;){var i=31-kt(r),c=1<<i;c&t|e[i]&t&&(e[i]|=t),r&=~c}}function oh(e,t){var r=t&-t;return r=(r&42)!==0?1:zo(r),(r&(e.suspendedLanes|t))!==0?0:r}function zo(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function _o(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function ch(){var e=ae.p;return e!==0?e:(e=window.event,e===void 0?32:Kg(e.type))}function uh(e,t){var r=ae.p;try{return ae.p=e,t()}finally{ae.p=r}}var Xn=Math.random().toString(36).slice(2),ct="__reactFiber$"+Xn,wt="__reactProps$"+Xn,Kr="__reactContainer$"+Xn,Vo="__reactEvents$"+Xn,u1="__reactListeners$"+Xn,d1="__reactHandles$"+Xn,dh="__reactResources$"+Xn,Wa="__reactMarker$"+Xn;function Bo(e){delete e[ct],delete e[wt],delete e[Vo],delete e[u1],delete e[d1]}function Zr(e){var t=e[ct];if(t)return t;for(var r=e.parentNode;r;){if(t=r[Kr]||r[ct]){if(r=t.alternate,t.child!==null||r!==null&&r.child!==null)for(e=Rg(e);e!==null;){if(r=e[ct])return r;e=Rg(e)}return t}e=r,r=e.parentNode}return null}function Qr(e){if(e=e[ct]||e[Kr]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Ia(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(l(33))}function Jr(e){var t=e[dh];return t||(t=e[dh]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function st(e){e[Wa]=!0}var fh=new Set,hh={};function jr(e,t){Wr(e,t),Wr(e+"Capture",t)}function Wr(e,t){for(hh[e]=t,e=0;e<t.length;e++)fh.add(t[e])}var f1=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),mh={},ph={};function h1(e){return Mo.call(ph,e)?!0:Mo.call(mh,e)?!1:f1.test(e)?ph[e]=!0:(mh[e]=!0,!1)}function ys(e,t,r){if(h1(t))if(r===null)e.removeAttribute(t);else{switch(typeof r){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var i=t.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+r)}}function vs(e,t,r){if(r===null)e.removeAttribute(t);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+r)}}function jn(e,t,r,i){if(i===null)e.removeAttribute(r);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(r);return}e.setAttributeNS(t,r,""+i)}}function Yt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function gh(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function m1(e,t,r){var i=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var c=i.get,d=i.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return c.call(this)},set:function(y){r=""+y,d.call(this,y)}}),Object.defineProperty(e,t,{enumerable:i.enumerable}),{getValue:function(){return r},setValue:function(y){r=""+y},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Lo(e){if(!e._valueTracker){var t=gh(e)?"checked":"value";e._valueTracker=m1(e,t,""+e[t])}}function yh(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var r=t.getValue(),i="";return e&&(i=gh(e)?e.checked?"true":"false":e.value),e=i,e!==r?(t.setValue(e),!0):!1}function xs(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var p1=/[\n"\\]/g;function Pt(e){return e.replace(p1,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function Uo(e,t,r,i,c,d,y,w){e.name="",y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"?e.type=y:e.removeAttribute("type"),t!=null?y==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+Yt(t)):e.value!==""+Yt(t)&&(e.value=""+Yt(t)):y!=="submit"&&y!=="reset"||e.removeAttribute("value"),t!=null?Ho(e,y,Yt(t)):r!=null?Ho(e,y,Yt(r)):i!=null&&e.removeAttribute("value"),c==null&&d!=null&&(e.defaultChecked=!!d),c!=null&&(e.checked=c&&typeof c!="function"&&typeof c!="symbol"),w!=null&&typeof w!="function"&&typeof w!="symbol"&&typeof w!="boolean"?e.name=""+Yt(w):e.removeAttribute("name")}function vh(e,t,r,i,c,d,y,w){if(d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"&&(e.type=d),t!=null||r!=null){if(!(d!=="submit"&&d!=="reset"||t!=null)){Lo(e);return}r=r!=null?""+Yt(r):"",t=t!=null?""+Yt(t):r,w||t===e.value||(e.value=t),e.defaultValue=t}i=i??c,i=typeof i!="function"&&typeof i!="symbol"&&!!i,e.checked=w?e.checked:!!i,e.defaultChecked=!!i,y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"&&(e.name=y),Lo(e)}function Ho(e,t,r){t==="number"&&xs(e.ownerDocument)===e||e.defaultValue===""+r||(e.defaultValue=""+r)}function Ir(e,t,r,i){if(e=e.options,t){t={};for(var c=0;c<r.length;c++)t["$"+r[c]]=!0;for(r=0;r<e.length;r++)c=t.hasOwnProperty("$"+e[r].value),e[r].selected!==c&&(e[r].selected=c),c&&i&&(e[r].defaultSelected=!0)}else{for(r=""+Yt(r),t=null,c=0;c<e.length;c++){if(e[c].value===r){e[c].selected=!0,i&&(e[c].defaultSelected=!0);return}t!==null||e[c].disabled||(t=e[c])}t!==null&&(t.selected=!0)}}function xh(e,t,r){if(t!=null&&(t=""+Yt(t),t!==e.value&&(e.value=t),r==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=r!=null?""+Yt(r):""}function bh(e,t,r,i){if(t==null){if(i!=null){if(r!=null)throw Error(l(92));if(le(i)){if(1<i.length)throw Error(l(93));i=i[0]}r=i}r==null&&(r=""),t=r}r=Yt(t),e.defaultValue=r,i=e.textContent,i===r&&i!==""&&i!==null&&(e.value=i),Lo(e)}function ea(e,t){if(t){var r=e.firstChild;if(r&&r===e.lastChild&&r.nodeType===3){r.nodeValue=t;return}}e.textContent=t}var g1=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Sh(e,t,r){var i=t.indexOf("--")===0;r==null||typeof r=="boolean"||r===""?i?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":i?e.setProperty(t,r):typeof r!="number"||r===0||g1.has(t)?t==="float"?e.cssFloat=r:e[t]=(""+r).trim():e[t]=r+"px"}function wh(e,t,r){if(t!=null&&typeof t!="object")throw Error(l(62));if(e=e.style,r!=null){for(var i in r)!r.hasOwnProperty(i)||t!=null&&t.hasOwnProperty(i)||(i.indexOf("--")===0?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="");for(var c in t)i=t[c],t.hasOwnProperty(c)&&r[c]!==i&&Sh(e,c,i)}else for(var d in t)t.hasOwnProperty(d)&&Sh(e,d,t[d])}function qo(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var y1=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),v1=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function bs(e){return v1.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function En(){}var Yo=null;function Po(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ta=null,na=null;function jh(e){var t=Qr(e);if(t&&(e=t.stateNode)){var r=e[wt]||null;e:switch(e=t.stateNode,t.type){case"input":if(Uo(e,r.value,r.defaultValue,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name),t=r.name,r.type==="radio"&&t!=null){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll('input[name="'+Pt(""+t)+'"][type="radio"]'),t=0;t<r.length;t++){var i=r[t];if(i!==e&&i.form===e.form){var c=i[wt]||null;if(!c)throw Error(l(90));Uo(i,c.value,c.defaultValue,c.defaultValue,c.checked,c.defaultChecked,c.type,c.name)}}for(t=0;t<r.length;t++)i=r[t],i.form===e.form&&yh(i)}break e;case"textarea":xh(e,r.value,r.defaultValue);break e;case"select":t=r.value,t!=null&&Ir(e,!!r.multiple,t,!1)}}}var Go=!1;function Eh(e,t,r){if(Go)return e(t,r);Go=!0;try{var i=e(t);return i}finally{if(Go=!1,(ta!==null||na!==null)&&(ll(),ta&&(t=ta,e=na,na=ta=null,jh(t),e)))for(t=0;t<e.length;t++)jh(e[t])}}function ei(e,t){var r=e.stateNode;if(r===null)return null;var i=r[wt]||null;if(i===null)return null;r=i[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break e;default:e=!1}if(e)return null;if(r&&typeof r!="function")throw Error(l(231,t,typeof r));return r}var Tn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Xo=!1;if(Tn)try{var ti={};Object.defineProperty(ti,"passive",{get:function(){Xo=!0}}),window.addEventListener("test",ti,ti),window.removeEventListener("test",ti,ti)}catch{Xo=!1}var Fn=null,Fo=null,Ss=null;function Th(){if(Ss)return Ss;var e,t=Fo,r=t.length,i,c="value"in Fn?Fn.value:Fn.textContent,d=c.length;for(e=0;e<r&&t[e]===c[e];e++);var y=r-e;for(i=1;i<=y&&t[r-i]===c[d-i];i++);return Ss=c.slice(e,1<i?1-i:void 0)}function ws(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function js(){return!0}function Ch(){return!1}function jt(e){function t(r,i,c,d,y){this._reactName=r,this._targetInst=c,this.type=i,this.nativeEvent=d,this.target=y,this.currentTarget=null;for(var w in e)e.hasOwnProperty(w)&&(r=e[w],this[w]=r?r(d):d[w]);return this.isDefaultPrevented=(d.defaultPrevented!=null?d.defaultPrevented:d.returnValue===!1)?js:Ch,this.isPropagationStopped=Ch,this}return x(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=js)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=js)},persist:function(){},isPersistent:js}),t}var Er={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Es=jt(Er),ni=x({},Er,{view:0,detail:0}),x1=jt(ni),$o,Ko,ri,Ts=x({},ni,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Qo,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==ri&&(ri&&e.type==="mousemove"?($o=e.screenX-ri.screenX,Ko=e.screenY-ri.screenY):Ko=$o=0,ri=e),$o)},movementY:function(e){return"movementY"in e?e.movementY:Ko}}),Nh=jt(Ts),b1=x({},Ts,{dataTransfer:0}),S1=jt(b1),w1=x({},ni,{relatedTarget:0}),Zo=jt(w1),j1=x({},Er,{animationName:0,elapsedTime:0,pseudoElement:0}),E1=jt(j1),T1=x({},Er,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),C1=jt(T1),N1=x({},Er,{data:0}),Dh=jt(N1),D1={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},A1={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},M1={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function k1(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=M1[e])?!!t[e]:!1}function Qo(){return k1}var R1=x({},ni,{key:function(e){if(e.key){var t=D1[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=ws(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?A1[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Qo,charCode:function(e){return e.type==="keypress"?ws(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ws(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),O1=jt(R1),z1=x({},Ts,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ah=jt(z1),_1=x({},ni,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Qo}),V1=jt(_1),B1=x({},Er,{propertyName:0,elapsedTime:0,pseudoElement:0}),L1=jt(B1),U1=x({},Ts,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),H1=jt(U1),q1=x({},Er,{newState:0,oldState:0}),Y1=jt(q1),P1=[9,13,27,32],Jo=Tn&&"CompositionEvent"in window,ai=null;Tn&&"documentMode"in document&&(ai=document.documentMode);var G1=Tn&&"TextEvent"in window&&!ai,Mh=Tn&&(!Jo||ai&&8<ai&&11>=ai),kh=" ",Rh=!1;function Oh(e,t){switch(e){case"keyup":return P1.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function zh(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var ra=!1;function X1(e,t){switch(e){case"compositionend":return zh(t);case"keypress":return t.which!==32?null:(Rh=!0,kh);case"textInput":return e=t.data,e===kh&&Rh?null:e;default:return null}}function F1(e,t){if(ra)return e==="compositionend"||!Jo&&Oh(e,t)?(e=Th(),Ss=Fo=Fn=null,ra=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Mh&&t.locale!=="ko"?null:t.data;default:return null}}var $1={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function _h(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!$1[e.type]:t==="textarea"}function Vh(e,t,r,i){ta?na?na.push(i):na=[i]:ta=i,t=ml(t,"onChange"),0<t.length&&(r=new Es("onChange","change",null,r,i),e.push({event:r,listeners:t}))}var ii=null,si=null;function K1(e){vg(e,0)}function Cs(e){var t=Ia(e);if(yh(t))return e}function Bh(e,t){if(e==="change")return t}var Lh=!1;if(Tn){var Wo;if(Tn){var Io="oninput"in document;if(!Io){var Uh=document.createElement("div");Uh.setAttribute("oninput","return;"),Io=typeof Uh.oninput=="function"}Wo=Io}else Wo=!1;Lh=Wo&&(!document.documentMode||9<document.documentMode)}function Hh(){ii&&(ii.detachEvent("onpropertychange",qh),si=ii=null)}function qh(e){if(e.propertyName==="value"&&Cs(si)){var t=[];Vh(t,si,e,Po(e)),Eh(K1,t)}}function Z1(e,t,r){e==="focusin"?(Hh(),ii=t,si=r,ii.attachEvent("onpropertychange",qh)):e==="focusout"&&Hh()}function Q1(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Cs(si)}function J1(e,t){if(e==="click")return Cs(t)}function W1(e,t){if(e==="input"||e==="change")return Cs(t)}function I1(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Rt=typeof Object.is=="function"?Object.is:I1;function li(e,t){if(Rt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var r=Object.keys(e),i=Object.keys(t);if(r.length!==i.length)return!1;for(i=0;i<r.length;i++){var c=r[i];if(!Mo.call(t,c)||!Rt(e[c],t[c]))return!1}return!0}function Yh(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Ph(e,t){var r=Yh(e);e=0;for(var i;r;){if(r.nodeType===3){if(i=e+r.textContent.length,e<=t&&i>=t)return{node:r,offset:t-e};e=i}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=Yh(r)}}function Gh(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Gh(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Xh(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=xs(e.document);t instanceof e.HTMLIFrameElement;){try{var r=typeof t.contentWindow.location.href=="string"}catch{r=!1}if(r)e=t.contentWindow;else break;t=xs(e.document)}return t}function ec(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var eS=Tn&&"documentMode"in document&&11>=document.documentMode,aa=null,tc=null,oi=null,nc=!1;function Fh(e,t,r){var i=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;nc||aa==null||aa!==xs(i)||(i=aa,"selectionStart"in i&&ec(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),oi&&li(oi,i)||(oi=i,i=ml(tc,"onSelect"),0<i.length&&(t=new Es("onSelect","select",null,t,r),e.push({event:t,listeners:i}),t.target=aa)))}function Tr(e,t){var r={};return r[e.toLowerCase()]=t.toLowerCase(),r["Webkit"+e]="webkit"+t,r["Moz"+e]="moz"+t,r}var ia={animationend:Tr("Animation","AnimationEnd"),animationiteration:Tr("Animation","AnimationIteration"),animationstart:Tr("Animation","AnimationStart"),transitionrun:Tr("Transition","TransitionRun"),transitionstart:Tr("Transition","TransitionStart"),transitioncancel:Tr("Transition","TransitionCancel"),transitionend:Tr("Transition","TransitionEnd")},rc={},$h={};Tn&&($h=document.createElement("div").style,"AnimationEvent"in window||(delete ia.animationend.animation,delete ia.animationiteration.animation,delete ia.animationstart.animation),"TransitionEvent"in window||delete ia.transitionend.transition);function Cr(e){if(rc[e])return rc[e];if(!ia[e])return e;var t=ia[e],r;for(r in t)if(t.hasOwnProperty(r)&&r in $h)return rc[e]=t[r];return e}var Kh=Cr("animationend"),Zh=Cr("animationiteration"),Qh=Cr("animationstart"),tS=Cr("transitionrun"),nS=Cr("transitionstart"),rS=Cr("transitioncancel"),Jh=Cr("transitionend"),Wh=new Map,ac="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");ac.push("scrollEnd");function rn(e,t){Wh.set(e,t),jr(t,[e])}var Ns=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Gt=[],sa=0,ic=0;function Ds(){for(var e=sa,t=ic=sa=0;t<e;){var r=Gt[t];Gt[t++]=null;var i=Gt[t];Gt[t++]=null;var c=Gt[t];Gt[t++]=null;var d=Gt[t];if(Gt[t++]=null,i!==null&&c!==null){var y=i.pending;y===null?c.next=c:(c.next=y.next,y.next=c),i.pending=c}d!==0&&Ih(r,c,d)}}function As(e,t,r,i){Gt[sa++]=e,Gt[sa++]=t,Gt[sa++]=r,Gt[sa++]=i,ic|=i,e.lanes|=i,e=e.alternate,e!==null&&(e.lanes|=i)}function sc(e,t,r,i){return As(e,t,r,i),Ms(e)}function Nr(e,t){return As(e,null,null,t),Ms(e)}function Ih(e,t,r){e.lanes|=r;var i=e.alternate;i!==null&&(i.lanes|=r);for(var c=!1,d=e.return;d!==null;)d.childLanes|=r,i=d.alternate,i!==null&&(i.childLanes|=r),d.tag===22&&(e=d.stateNode,e===null||e._visibility&1||(c=!0)),e=d,d=d.return;return e.tag===3?(d=e.stateNode,c&&t!==null&&(c=31-kt(r),e=d.hiddenUpdates,i=e[c],i===null?e[c]=[t]:i.push(t),t.lane=r|536870912),d):null}function Ms(e){if(50<Mi)throw Mi=0,pu=null,Error(l(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var la={};function aS(e,t,r,i){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ot(e,t,r,i){return new aS(e,t,r,i)}function lc(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Cn(e,t){var r=e.alternate;return r===null?(r=Ot(e.tag,t,e.key,e.mode),r.elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=e.flags&65011712,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,t=e.dependencies,r.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r.refCleanup=e.refCleanup,r}function em(e,t){e.flags&=65011714;var r=e.alternate;return r===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=r.childLanes,e.lanes=r.lanes,e.child=r.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=r.memoizedProps,e.memoizedState=r.memoizedState,e.updateQueue=r.updateQueue,e.type=r.type,t=r.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function ks(e,t,r,i,c,d){var y=0;if(i=e,typeof e=="function")lc(e)&&(y=1);else if(typeof e=="string")y=cw(e,r,se.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case B:return e=Ot(31,r,t,c),e.elementType=B,e.lanes=d,e;case N:return Dr(r.children,c,d,t);case C:y=8,c|=24;break;case k:return e=Ot(12,r,t,c|2),e.elementType=k,e.lanes=d,e;case H:return e=Ot(13,r,t,c),e.elementType=H,e.lanes=d,e;case Y:return e=Ot(19,r,t,c),e.elementType=Y,e.lanes=d,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case z:y=10;break e;case D:y=9;break e;case O:y=11;break e;case A:y=14;break e;case L:y=16,i=null;break e}y=29,r=Error(l(130,e===null?"null":typeof e,"")),i=null}return t=Ot(y,r,t,c),t.elementType=e,t.type=i,t.lanes=d,t}function Dr(e,t,r,i){return e=Ot(7,e,i,t),e.lanes=r,e}function oc(e,t,r){return e=Ot(6,e,null,t),e.lanes=r,e}function tm(e){var t=Ot(18,null,null,0);return t.stateNode=e,t}function cc(e,t,r){return t=Ot(4,e.children!==null?e.children:[],e.key,t),t.lanes=r,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var nm=new WeakMap;function Xt(e,t){if(typeof e=="object"&&e!==null){var r=nm.get(e);return r!==void 0?r:(t={value:e,source:t,stack:th(t)},nm.set(e,t),t)}return{value:e,source:t,stack:th(t)}}var oa=[],ca=0,Rs=null,ci=0,Ft=[],$t=0,$n=null,dn=1,fn="";function Nn(e,t){oa[ca++]=ci,oa[ca++]=Rs,Rs=e,ci=t}function rm(e,t,r){Ft[$t++]=dn,Ft[$t++]=fn,Ft[$t++]=$n,$n=e;var i=dn;e=fn;var c=32-kt(i)-1;i&=~(1<<c),r+=1;var d=32-kt(t)+c;if(30<d){var y=c-c%5;d=(i&(1<<y)-1).toString(32),i>>=y,c-=y,dn=1<<32-kt(t)+c|r<<c|i,fn=d+e}else dn=1<<d|r<<c|i,fn=e}function uc(e){e.return!==null&&(Nn(e,1),rm(e,1,0))}function dc(e){for(;e===Rs;)Rs=oa[--ca],oa[ca]=null,ci=oa[--ca],oa[ca]=null;for(;e===$n;)$n=Ft[--$t],Ft[$t]=null,fn=Ft[--$t],Ft[$t]=null,dn=Ft[--$t],Ft[$t]=null}function am(e,t){Ft[$t++]=dn,Ft[$t++]=fn,Ft[$t++]=$n,dn=t.id,fn=t.overflow,$n=e}var ut=null,Pe=null,Ae=!1,Kn=null,Kt=!1,fc=Error(l(519));function Zn(e){var t=Error(l(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw ui(Xt(t,e)),fc}function im(e){var t=e.stateNode,r=e.type,i=e.memoizedProps;switch(t[ct]=e,t[wt]=i,r){case"dialog":Te("cancel",t),Te("close",t);break;case"iframe":case"object":case"embed":Te("load",t);break;case"video":case"audio":for(r=0;r<Ri.length;r++)Te(Ri[r],t);break;case"source":Te("error",t);break;case"img":case"image":case"link":Te("error",t),Te("load",t);break;case"details":Te("toggle",t);break;case"input":Te("invalid",t),vh(t,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":Te("invalid",t);break;case"textarea":Te("invalid",t),bh(t,i.value,i.defaultValue,i.children)}r=i.children,typeof r!="string"&&typeof r!="number"&&typeof r!="bigint"||t.textContent===""+r||i.suppressHydrationWarning===!0||wg(t.textContent,r)?(i.popover!=null&&(Te("beforetoggle",t),Te("toggle",t)),i.onScroll!=null&&Te("scroll",t),i.onScrollEnd!=null&&Te("scrollend",t),i.onClick!=null&&(t.onclick=En),t=!0):t=!1,t||Zn(e,!0)}function sm(e){for(ut=e.return;ut;)switch(ut.tag){case 5:case 31:case 13:Kt=!1;return;case 27:case 3:Kt=!0;return;default:ut=ut.return}}function ua(e){if(e!==ut)return!1;if(!Ae)return sm(e),Ae=!0,!1;var t=e.tag,r;if((r=t!==3&&t!==27)&&((r=t===5)&&(r=e.type,r=!(r!=="form"&&r!=="button")||Mu(e.type,e.memoizedProps)),r=!r),r&&Pe&&Zn(e),sm(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(l(317));Pe=kg(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(l(317));Pe=kg(e)}else t===27?(t=Pe,cr(e.type)?(e=_u,_u=null,Pe=e):Pe=t):Pe=ut?Qt(e.stateNode.nextSibling):null;return!0}function Ar(){Pe=ut=null,Ae=!1}function hc(){var e=Kn;return e!==null&&(Nt===null?Nt=e:Nt.push.apply(Nt,e),Kn=null),e}function ui(e){Kn===null?Kn=[e]:Kn.push(e)}var mc=T(null),Mr=null,Dn=null;function Qn(e,t,r){ee(mc,t._currentValue),t._currentValue=r}function An(e){e._currentValue=mc.current,R(mc)}function pc(e,t,r){for(;e!==null;){var i=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,i!==null&&(i.childLanes|=t)):i!==null&&(i.childLanes&t)!==t&&(i.childLanes|=t),e===r)break;e=e.return}}function gc(e,t,r,i){var c=e.child;for(c!==null&&(c.return=e);c!==null;){var d=c.dependencies;if(d!==null){var y=c.child;d=d.firstContext;e:for(;d!==null;){var w=d;d=c;for(var M=0;M<t.length;M++)if(w.context===t[M]){d.lanes|=r,w=d.alternate,w!==null&&(w.lanes|=r),pc(d.return,r,e),i||(y=null);break e}d=w.next}}else if(c.tag===18){if(y=c.return,y===null)throw Error(l(341));y.lanes|=r,d=y.alternate,d!==null&&(d.lanes|=r),pc(y,r,e),y=null}else y=c.child;if(y!==null)y.return=c;else for(y=c;y!==null;){if(y===e){y=null;break}if(c=y.sibling,c!==null){c.return=y.return,y=c;break}y=y.return}c=y}}function da(e,t,r,i){e=null;for(var c=t,d=!1;c!==null;){if(!d){if((c.flags&524288)!==0)d=!0;else if((c.flags&262144)!==0)break}if(c.tag===10){var y=c.alternate;if(y===null)throw Error(l(387));if(y=y.memoizedProps,y!==null){var w=c.type;Rt(c.pendingProps.value,y.value)||(e!==null?e.push(w):e=[w])}}else if(c===xe.current){if(y=c.alternate,y===null)throw Error(l(387));y.memoizedState.memoizedState!==c.memoizedState.memoizedState&&(e!==null?e.push(Bi):e=[Bi])}c=c.return}e!==null&&gc(t,e,r,i),t.flags|=262144}function Os(e){for(e=e.firstContext;e!==null;){if(!Rt(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function kr(e){Mr=e,Dn=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function dt(e){return lm(Mr,e)}function zs(e,t){return Mr===null&&kr(e),lm(e,t)}function lm(e,t){var r=t._currentValue;if(t={context:t,memoizedValue:r,next:null},Dn===null){if(e===null)throw Error(l(308));Dn=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Dn=Dn.next=t;return r}var iS=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(r,i){e.push(i)}};this.abort=function(){t.aborted=!0,e.forEach(function(r){return r()})}},sS=n.unstable_scheduleCallback,lS=n.unstable_NormalPriority,Ie={$$typeof:z,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function yc(){return{controller:new iS,data:new Map,refCount:0}}function di(e){e.refCount--,e.refCount===0&&sS(lS,function(){e.controller.abort()})}var fi=null,vc=0,fa=0,ha=null;function oS(e,t){if(fi===null){var r=fi=[];vc=0,fa=Su(),ha={status:"pending",value:void 0,then:function(i){r.push(i)}}}return vc++,t.then(om,om),t}function om(){if(--vc===0&&fi!==null){ha!==null&&(ha.status="fulfilled");var e=fi;fi=null,fa=0,ha=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function cS(e,t){var r=[],i={status:"pending",value:null,reason:null,then:function(c){r.push(c)}};return e.then(function(){i.status="fulfilled",i.value=t;for(var c=0;c<r.length;c++)(0,r[c])(t)},function(c){for(i.status="rejected",i.reason=c,c=0;c<r.length;c++)(0,r[c])(void 0)}),i}var cm=U.S;U.S=function(e,t){Fp=At(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&oS(e,t),cm!==null&&cm(e,t)};var Rr=T(null);function xc(){var e=Rr.current;return e!==null?e:Ue.pooledCache}function _s(e,t){t===null?ee(Rr,Rr.current):ee(Rr,t.pool)}function um(){var e=xc();return e===null?null:{parent:Ie._currentValue,pool:e}}var ma=Error(l(460)),bc=Error(l(474)),Vs=Error(l(542)),Bs={then:function(){}};function dm(e){return e=e.status,e==="fulfilled"||e==="rejected"}function fm(e,t,r){switch(r=e[r],r===void 0?e.push(t):r!==t&&(t.then(En,En),t=r),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,mm(e),e;default:if(typeof t.status=="string")t.then(En,En);else{if(e=Ue,e!==null&&100<e.shellSuspendCounter)throw Error(l(482));e=t,e.status="pending",e.then(function(i){if(t.status==="pending"){var c=t;c.status="fulfilled",c.value=i}},function(i){if(t.status==="pending"){var c=t;c.status="rejected",c.reason=i}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,mm(e),e}throw zr=t,ma}}function Or(e){try{var t=e._init;return t(e._payload)}catch(r){throw r!==null&&typeof r=="object"&&typeof r.then=="function"?(zr=r,ma):r}}var zr=null;function hm(){if(zr===null)throw Error(l(459));var e=zr;return zr=null,e}function mm(e){if(e===ma||e===Vs)throw Error(l(483))}var pa=null,hi=0;function Ls(e){var t=hi;return hi+=1,pa===null&&(pa=[]),fm(pa,e,t)}function mi(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function Us(e,t){throw t.$$typeof===b?Error(l(525)):(e=Object.prototype.toString.call(t),Error(l(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function pm(e){function t(q,_){if(e){var P=q.deletions;P===null?(q.deletions=[_],q.flags|=16):P.push(_)}}function r(q,_){if(!e)return null;for(;_!==null;)t(q,_),_=_.sibling;return null}function i(q){for(var _=new Map;q!==null;)q.key!==null?_.set(q.key,q):_.set(q.index,q),q=q.sibling;return _}function c(q,_){return q=Cn(q,_),q.index=0,q.sibling=null,q}function d(q,_,P){return q.index=P,e?(P=q.alternate,P!==null?(P=P.index,P<_?(q.flags|=67108866,_):P):(q.flags|=67108866,_)):(q.flags|=1048576,_)}function y(q){return e&&q.alternate===null&&(q.flags|=67108866),q}function w(q,_,P,I){return _===null||_.tag!==6?(_=oc(P,q.mode,I),_.return=q,_):(_=c(_,P),_.return=q,_)}function M(q,_,P,I){var ve=P.type;return ve===N?Q(q,_,P.props.children,I,P.key):_!==null&&(_.elementType===ve||typeof ve=="object"&&ve!==null&&ve.$$typeof===L&&Or(ve)===_.type)?(_=c(_,P.props),mi(_,P),_.return=q,_):(_=ks(P.type,P.key,P.props,null,q.mode,I),mi(_,P),_.return=q,_)}function G(q,_,P,I){return _===null||_.tag!==4||_.stateNode.containerInfo!==P.containerInfo||_.stateNode.implementation!==P.implementation?(_=cc(P,q.mode,I),_.return=q,_):(_=c(_,P.children||[]),_.return=q,_)}function Q(q,_,P,I,ve){return _===null||_.tag!==7?(_=Dr(P,q.mode,I,ve),_.return=q,_):(_=c(_,P),_.return=q,_)}function te(q,_,P){if(typeof _=="string"&&_!==""||typeof _=="number"||typeof _=="bigint")return _=oc(""+_,q.mode,P),_.return=q,_;if(typeof _=="object"&&_!==null){switch(_.$$typeof){case E:return P=ks(_.type,_.key,_.props,null,q.mode,P),mi(P,_),P.return=q,P;case j:return _=cc(_,q.mode,P),_.return=q,_;case L:return _=Or(_),te(q,_,P)}if(le(_)||J(_))return _=Dr(_,q.mode,P,null),_.return=q,_;if(typeof _.then=="function")return te(q,Ls(_),P);if(_.$$typeof===z)return te(q,zs(q,_),P);Us(q,_)}return null}function F(q,_,P,I){var ve=_!==null?_.key:null;if(typeof P=="string"&&P!==""||typeof P=="number"||typeof P=="bigint")return ve!==null?null:w(q,_,""+P,I);if(typeof P=="object"&&P!==null){switch(P.$$typeof){case E:return P.key===ve?M(q,_,P,I):null;case j:return P.key===ve?G(q,_,P,I):null;case L:return P=Or(P),F(q,_,P,I)}if(le(P)||J(P))return ve!==null?null:Q(q,_,P,I,null);if(typeof P.then=="function")return F(q,_,Ls(P),I);if(P.$$typeof===z)return F(q,_,zs(q,P),I);Us(q,P)}return null}function K(q,_,P,I,ve){if(typeof I=="string"&&I!==""||typeof I=="number"||typeof I=="bigint")return q=q.get(P)||null,w(_,q,""+I,ve);if(typeof I=="object"&&I!==null){switch(I.$$typeof){case E:return q=q.get(I.key===null?P:I.key)||null,M(_,q,I,ve);case j:return q=q.get(I.key===null?P:I.key)||null,G(_,q,I,ve);case L:return I=Or(I),K(q,_,P,I,ve)}if(le(I)||J(I))return q=q.get(P)||null,Q(_,q,I,ve,null);if(typeof I.then=="function")return K(q,_,P,Ls(I),ve);if(I.$$typeof===z)return K(q,_,P,zs(_,I),ve);Us(_,I)}return null}function fe(q,_,P,I){for(var ve=null,Me=null,ge=_,je=_=0,De=null;ge!==null&&je<P.length;je++){ge.index>je?(De=ge,ge=null):De=ge.sibling;var ke=F(q,ge,P[je],I);if(ke===null){ge===null&&(ge=De);break}e&&ge&&ke.alternate===null&&t(q,ge),_=d(ke,_,je),Me===null?ve=ke:Me.sibling=ke,Me=ke,ge=De}if(je===P.length)return r(q,ge),Ae&&Nn(q,je),ve;if(ge===null){for(;je<P.length;je++)ge=te(q,P[je],I),ge!==null&&(_=d(ge,_,je),Me===null?ve=ge:Me.sibling=ge,Me=ge);return Ae&&Nn(q,je),ve}for(ge=i(ge);je<P.length;je++)De=K(ge,q,je,P[je],I),De!==null&&(e&&De.alternate!==null&&ge.delete(De.key===null?je:De.key),_=d(De,_,je),Me===null?ve=De:Me.sibling=De,Me=De);return e&&ge.forEach(function(mr){return t(q,mr)}),Ae&&Nn(q,je),ve}function be(q,_,P,I){if(P==null)throw Error(l(151));for(var ve=null,Me=null,ge=_,je=_=0,De=null,ke=P.next();ge!==null&&!ke.done;je++,ke=P.next()){ge.index>je?(De=ge,ge=null):De=ge.sibling;var mr=F(q,ge,ke.value,I);if(mr===null){ge===null&&(ge=De);break}e&&ge&&mr.alternate===null&&t(q,ge),_=d(mr,_,je),Me===null?ve=mr:Me.sibling=mr,Me=mr,ge=De}if(ke.done)return r(q,ge),Ae&&Nn(q,je),ve;if(ge===null){for(;!ke.done;je++,ke=P.next())ke=te(q,ke.value,I),ke!==null&&(_=d(ke,_,je),Me===null?ve=ke:Me.sibling=ke,Me=ke);return Ae&&Nn(q,je),ve}for(ge=i(ge);!ke.done;je++,ke=P.next())ke=K(ge,q,je,ke.value,I),ke!==null&&(e&&ke.alternate!==null&&ge.delete(ke.key===null?je:ke.key),_=d(ke,_,je),Me===null?ve=ke:Me.sibling=ke,Me=ke);return e&&ge.forEach(function(bw){return t(q,bw)}),Ae&&Nn(q,je),ve}function Le(q,_,P,I){if(typeof P=="object"&&P!==null&&P.type===N&&P.key===null&&(P=P.props.children),typeof P=="object"&&P!==null){switch(P.$$typeof){case E:e:{for(var ve=P.key;_!==null;){if(_.key===ve){if(ve=P.type,ve===N){if(_.tag===7){r(q,_.sibling),I=c(_,P.props.children),I.return=q,q=I;break e}}else if(_.elementType===ve||typeof ve=="object"&&ve!==null&&ve.$$typeof===L&&Or(ve)===_.type){r(q,_.sibling),I=c(_,P.props),mi(I,P),I.return=q,q=I;break e}r(q,_);break}else t(q,_);_=_.sibling}P.type===N?(I=Dr(P.props.children,q.mode,I,P.key),I.return=q,q=I):(I=ks(P.type,P.key,P.props,null,q.mode,I),mi(I,P),I.return=q,q=I)}return y(q);case j:e:{for(ve=P.key;_!==null;){if(_.key===ve)if(_.tag===4&&_.stateNode.containerInfo===P.containerInfo&&_.stateNode.implementation===P.implementation){r(q,_.sibling),I=c(_,P.children||[]),I.return=q,q=I;break e}else{r(q,_);break}else t(q,_);_=_.sibling}I=cc(P,q.mode,I),I.return=q,q=I}return y(q);case L:return P=Or(P),Le(q,_,P,I)}if(le(P))return fe(q,_,P,I);if(J(P)){if(ve=J(P),typeof ve!="function")throw Error(l(150));return P=ve.call(P),be(q,_,P,I)}if(typeof P.then=="function")return Le(q,_,Ls(P),I);if(P.$$typeof===z)return Le(q,_,zs(q,P),I);Us(q,P)}return typeof P=="string"&&P!==""||typeof P=="number"||typeof P=="bigint"?(P=""+P,_!==null&&_.tag===6?(r(q,_.sibling),I=c(_,P),I.return=q,q=I):(r(q,_),I=oc(P,q.mode,I),I.return=q,q=I),y(q)):r(q,_)}return function(q,_,P,I){try{hi=0;var ve=Le(q,_,P,I);return pa=null,ve}catch(ge){if(ge===ma||ge===Vs)throw ge;var Me=Ot(29,ge,null,q.mode);return Me.lanes=I,Me.return=q,Me}finally{}}}var _r=pm(!0),gm=pm(!1),Jn=!1;function Sc(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function wc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Wn(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function In(e,t,r){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,(Re&2)!==0){var c=i.pending;return c===null?t.next=t:(t.next=c.next,c.next=t),i.pending=t,t=Ms(e),Ih(e,null,r),t}return As(e,i,t,r),Ms(e)}function pi(e,t,r){if(t=t.updateQueue,t!==null&&(t=t.shared,(r&4194048)!==0)){var i=t.lanes;i&=e.pendingLanes,r|=i,t.lanes=r,lh(e,r)}}function jc(e,t){var r=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,r===i)){var c=null,d=null;if(r=r.firstBaseUpdate,r!==null){do{var y={lane:r.lane,tag:r.tag,payload:r.payload,callback:null,next:null};d===null?c=d=y:d=d.next=y,r=r.next}while(r!==null);d===null?c=d=t:d=d.next=t}else c=d=t;r={baseState:i.baseState,firstBaseUpdate:c,lastBaseUpdate:d,shared:i.shared,callbacks:i.callbacks},e.updateQueue=r;return}e=r.lastBaseUpdate,e===null?r.firstBaseUpdate=t:e.next=t,r.lastBaseUpdate=t}var Ec=!1;function gi(){if(Ec){var e=ha;if(e!==null)throw e}}function yi(e,t,r,i){Ec=!1;var c=e.updateQueue;Jn=!1;var d=c.firstBaseUpdate,y=c.lastBaseUpdate,w=c.shared.pending;if(w!==null){c.shared.pending=null;var M=w,G=M.next;M.next=null,y===null?d=G:y.next=G,y=M;var Q=e.alternate;Q!==null&&(Q=Q.updateQueue,w=Q.lastBaseUpdate,w!==y&&(w===null?Q.firstBaseUpdate=G:w.next=G,Q.lastBaseUpdate=M))}if(d!==null){var te=c.baseState;y=0,Q=G=M=null,w=d;do{var F=w.lane&-536870913,K=F!==w.lane;if(K?(Ne&F)===F:(i&F)===F){F!==0&&F===fa&&(Ec=!0),Q!==null&&(Q=Q.next={lane:0,tag:w.tag,payload:w.payload,callback:null,next:null});e:{var fe=e,be=w;F=t;var Le=r;switch(be.tag){case 1:if(fe=be.payload,typeof fe=="function"){te=fe.call(Le,te,F);break e}te=fe;break e;case 3:fe.flags=fe.flags&-65537|128;case 0:if(fe=be.payload,F=typeof fe=="function"?fe.call(Le,te,F):fe,F==null)break e;te=x({},te,F);break e;case 2:Jn=!0}}F=w.callback,F!==null&&(e.flags|=64,K&&(e.flags|=8192),K=c.callbacks,K===null?c.callbacks=[F]:K.push(F))}else K={lane:F,tag:w.tag,payload:w.payload,callback:w.callback,next:null},Q===null?(G=Q=K,M=te):Q=Q.next=K,y|=F;if(w=w.next,w===null){if(w=c.shared.pending,w===null)break;K=w,w=K.next,K.next=null,c.lastBaseUpdate=K,c.shared.pending=null}}while(!0);Q===null&&(M=te),c.baseState=M,c.firstBaseUpdate=G,c.lastBaseUpdate=Q,d===null&&(c.shared.lanes=0),ar|=y,e.lanes=y,e.memoizedState=te}}function ym(e,t){if(typeof e!="function")throw Error(l(191,e));e.call(t)}function vm(e,t){var r=e.callbacks;if(r!==null)for(e.callbacks=null,e=0;e<r.length;e++)ym(r[e],t)}var ga=T(null),Hs=T(0);function xm(e,t){e=Ln,ee(Hs,e),ee(ga,t),Ln=e|t.baseLanes}function Tc(){ee(Hs,Ln),ee(ga,ga.current)}function Cc(){Ln=Hs.current,R(ga),R(Hs)}var zt=T(null),Zt=null;function er(e){var t=e.alternate;ee(Je,Je.current&1),ee(zt,e),Zt===null&&(t===null||ga.current!==null||t.memoizedState!==null)&&(Zt=e)}function Nc(e){ee(Je,Je.current),ee(zt,e),Zt===null&&(Zt=e)}function bm(e){e.tag===22?(ee(Je,Je.current),ee(zt,e),Zt===null&&(Zt=e)):tr()}function tr(){ee(Je,Je.current),ee(zt,zt.current)}function _t(e){R(zt),Zt===e&&(Zt=null),R(Je)}var Je=T(0);function qs(e){for(var t=e;t!==null;){if(t.tag===13){var r=t.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||Ou(r)||zu(r)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Mn=0,we=null,Ve=null,et=null,Ys=!1,ya=!1,Vr=!1,Ps=0,vi=0,va=null,uS=0;function $e(){throw Error(l(321))}function Dc(e,t){if(t===null)return!1;for(var r=0;r<t.length&&r<e.length;r++)if(!Rt(e[r],t[r]))return!1;return!0}function Ac(e,t,r,i,c,d){return Mn=d,we=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,U.H=e===null||e.memoizedState===null?rp:Gc,Vr=!1,d=r(i,c),Vr=!1,ya&&(d=wm(t,r,i,c)),Sm(e),d}function Sm(e){U.H=Si;var t=Ve!==null&&Ve.next!==null;if(Mn=0,et=Ve=we=null,Ys=!1,vi=0,va=null,t)throw Error(l(300));e===null||tt||(e=e.dependencies,e!==null&&Os(e)&&(tt=!0))}function wm(e,t,r,i){we=e;var c=0;do{if(ya&&(va=null),vi=0,ya=!1,25<=c)throw Error(l(301));if(c+=1,et=Ve=null,e.updateQueue!=null){var d=e.updateQueue;d.lastEffect=null,d.events=null,d.stores=null,d.memoCache!=null&&(d.memoCache.index=0)}U.H=ap,d=t(r,i)}while(ya);return d}function dS(){var e=U.H,t=e.useState()[0];return t=typeof t.then=="function"?xi(t):t,e=e.useState()[0],(Ve!==null?Ve.memoizedState:null)!==e&&(we.flags|=1024),t}function Mc(){var e=Ps!==0;return Ps=0,e}function kc(e,t,r){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~r}function Rc(e){if(Ys){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Ys=!1}Mn=0,et=Ve=we=null,ya=!1,vi=Ps=0,va=null}function vt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return et===null?we.memoizedState=et=e:et=et.next=e,et}function We(){if(Ve===null){var e=we.alternate;e=e!==null?e.memoizedState:null}else e=Ve.next;var t=et===null?we.memoizedState:et.next;if(t!==null)et=t,Ve=e;else{if(e===null)throw we.alternate===null?Error(l(467)):Error(l(310));Ve=e,e={memoizedState:Ve.memoizedState,baseState:Ve.baseState,baseQueue:Ve.baseQueue,queue:Ve.queue,next:null},et===null?we.memoizedState=et=e:et=et.next=e}return et}function Gs(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function xi(e){var t=vi;return vi+=1,va===null&&(va=[]),e=fm(va,e,t),t=we,(et===null?t.memoizedState:et.next)===null&&(t=t.alternate,U.H=t===null||t.memoizedState===null?rp:Gc),e}function Xs(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return xi(e);if(e.$$typeof===z)return dt(e)}throw Error(l(438,String(e)))}function Oc(e){var t=null,r=we.updateQueue;if(r!==null&&(t=r.memoCache),t==null){var i=we.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(t={data:i.data.map(function(c){return c.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),r===null&&(r=Gs(),we.updateQueue=r),r.memoCache=t,r=t.data[t.index],r===void 0)for(r=t.data[t.index]=Array(e),i=0;i<e;i++)r[i]=V;return t.index++,r}function kn(e,t){return typeof t=="function"?t(e):t}function Fs(e){var t=We();return zc(t,Ve,e)}function zc(e,t,r){var i=e.queue;if(i===null)throw Error(l(311));i.lastRenderedReducer=r;var c=e.baseQueue,d=i.pending;if(d!==null){if(c!==null){var y=c.next;c.next=d.next,d.next=y}t.baseQueue=c=d,i.pending=null}if(d=e.baseState,c===null)e.memoizedState=d;else{t=c.next;var w=y=null,M=null,G=t,Q=!1;do{var te=G.lane&-536870913;if(te!==G.lane?(Ne&te)===te:(Mn&te)===te){var F=G.revertLane;if(F===0)M!==null&&(M=M.next={lane:0,revertLane:0,gesture:null,action:G.action,hasEagerState:G.hasEagerState,eagerState:G.eagerState,next:null}),te===fa&&(Q=!0);else if((Mn&F)===F){G=G.next,F===fa&&(Q=!0);continue}else te={lane:0,revertLane:G.revertLane,gesture:null,action:G.action,hasEagerState:G.hasEagerState,eagerState:G.eagerState,next:null},M===null?(w=M=te,y=d):M=M.next=te,we.lanes|=F,ar|=F;te=G.action,Vr&&r(d,te),d=G.hasEagerState?G.eagerState:r(d,te)}else F={lane:te,revertLane:G.revertLane,gesture:G.gesture,action:G.action,hasEagerState:G.hasEagerState,eagerState:G.eagerState,next:null},M===null?(w=M=F,y=d):M=M.next=F,we.lanes|=te,ar|=te;G=G.next}while(G!==null&&G!==t);if(M===null?y=d:M.next=w,!Rt(d,e.memoizedState)&&(tt=!0,Q&&(r=ha,r!==null)))throw r;e.memoizedState=d,e.baseState=y,e.baseQueue=M,i.lastRenderedState=d}return c===null&&(i.lanes=0),[e.memoizedState,i.dispatch]}function _c(e){var t=We(),r=t.queue;if(r===null)throw Error(l(311));r.lastRenderedReducer=e;var i=r.dispatch,c=r.pending,d=t.memoizedState;if(c!==null){r.pending=null;var y=c=c.next;do d=e(d,y.action),y=y.next;while(y!==c);Rt(d,t.memoizedState)||(tt=!0),t.memoizedState=d,t.baseQueue===null&&(t.baseState=d),r.lastRenderedState=d}return[d,i]}function jm(e,t,r){var i=we,c=We(),d=Ae;if(d){if(r===void 0)throw Error(l(407));r=r()}else r=t();var y=!Rt((Ve||c).memoizedState,r);if(y&&(c.memoizedState=r,tt=!0),c=c.queue,Lc(Cm.bind(null,i,c,e),[e]),c.getSnapshot!==t||y||et!==null&&et.memoizedState.tag&1){if(i.flags|=2048,xa(9,{destroy:void 0},Tm.bind(null,i,c,r,t),null),Ue===null)throw Error(l(349));d||(Mn&127)!==0||Em(i,t,r)}return r}function Em(e,t,r){e.flags|=16384,e={getSnapshot:t,value:r},t=we.updateQueue,t===null?(t=Gs(),we.updateQueue=t,t.stores=[e]):(r=t.stores,r===null?t.stores=[e]:r.push(e))}function Tm(e,t,r,i){t.value=r,t.getSnapshot=i,Nm(t)&&Dm(e)}function Cm(e,t,r){return r(function(){Nm(t)&&Dm(e)})}function Nm(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!Rt(e,r)}catch{return!0}}function Dm(e){var t=Nr(e,2);t!==null&&Dt(t,e,2)}function Vc(e){var t=vt();if(typeof e=="function"){var r=e;if(e=r(),Vr){Gn(!0);try{r()}finally{Gn(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:kn,lastRenderedState:e},t}function Am(e,t,r,i){return e.baseState=r,zc(e,Ve,typeof i=="function"?i:kn)}function fS(e,t,r,i,c){if(Zs(e))throw Error(l(485));if(e=t.action,e!==null){var d={payload:c,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(y){d.listeners.push(y)}};U.T!==null?r(!0):d.isTransition=!1,i(d),r=t.pending,r===null?(d.next=t.pending=d,Mm(t,d)):(d.next=r.next,t.pending=r.next=d)}}function Mm(e,t){var r=t.action,i=t.payload,c=e.state;if(t.isTransition){var d=U.T,y={};U.T=y;try{var w=r(c,i),M=U.S;M!==null&&M(y,w),km(e,t,w)}catch(G){Bc(e,t,G)}finally{d!==null&&y.types!==null&&(d.types=y.types),U.T=d}}else try{d=r(c,i),km(e,t,d)}catch(G){Bc(e,t,G)}}function km(e,t,r){r!==null&&typeof r=="object"&&typeof r.then=="function"?r.then(function(i){Rm(e,t,i)},function(i){return Bc(e,t,i)}):Rm(e,t,r)}function Rm(e,t,r){t.status="fulfilled",t.value=r,Om(t),e.state=r,t=e.pending,t!==null&&(r=t.next,r===t?e.pending=null:(r=r.next,t.next=r,Mm(e,r)))}function Bc(e,t,r){var i=e.pending;if(e.pending=null,i!==null){i=i.next;do t.status="rejected",t.reason=r,Om(t),t=t.next;while(t!==i)}e.action=null}function Om(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function zm(e,t){return t}function _m(e,t){if(Ae){var r=Ue.formState;if(r!==null){e:{var i=we;if(Ae){if(Pe){t:{for(var c=Pe,d=Kt;c.nodeType!==8;){if(!d){c=null;break t}if(c=Qt(c.nextSibling),c===null){c=null;break t}}d=c.data,c=d==="F!"||d==="F"?c:null}if(c){Pe=Qt(c.nextSibling),i=c.data==="F!";break e}}Zn(i)}i=!1}i&&(t=r[0])}}return r=vt(),r.memoizedState=r.baseState=t,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:zm,lastRenderedState:t},r.queue=i,r=ep.bind(null,we,i),i.dispatch=r,i=Vc(!1),d=Pc.bind(null,we,!1,i.queue),i=vt(),c={state:t,dispatch:null,action:e,pending:null},i.queue=c,r=fS.bind(null,we,c,d,r),c.dispatch=r,i.memoizedState=e,[t,r,!1]}function Vm(e){var t=We();return Bm(t,Ve,e)}function Bm(e,t,r){if(t=zc(e,t,zm)[0],e=Fs(kn)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var i=xi(t)}catch(y){throw y===ma?Vs:y}else i=t;t=We();var c=t.queue,d=c.dispatch;return r!==t.memoizedState&&(we.flags|=2048,xa(9,{destroy:void 0},hS.bind(null,c,r),null)),[i,d,e]}function hS(e,t){e.action=t}function Lm(e){var t=We(),r=Ve;if(r!==null)return Bm(t,r,e);We(),t=t.memoizedState,r=We();var i=r.queue.dispatch;return r.memoizedState=e,[t,i,!1]}function xa(e,t,r,i){return e={tag:e,create:r,deps:i,inst:t,next:null},t=we.updateQueue,t===null&&(t=Gs(),we.updateQueue=t),r=t.lastEffect,r===null?t.lastEffect=e.next=e:(i=r.next,r.next=e,e.next=i,t.lastEffect=e),e}function Um(){return We().memoizedState}function $s(e,t,r,i){var c=vt();we.flags|=e,c.memoizedState=xa(1|t,{destroy:void 0},r,i===void 0?null:i)}function Ks(e,t,r,i){var c=We();i=i===void 0?null:i;var d=c.memoizedState.inst;Ve!==null&&i!==null&&Dc(i,Ve.memoizedState.deps)?c.memoizedState=xa(t,d,r,i):(we.flags|=e,c.memoizedState=xa(1|t,d,r,i))}function Hm(e,t){$s(8390656,8,e,t)}function Lc(e,t){Ks(2048,8,e,t)}function mS(e){we.flags|=4;var t=we.updateQueue;if(t===null)t=Gs(),we.updateQueue=t,t.events=[e];else{var r=t.events;r===null?t.events=[e]:r.push(e)}}function qm(e){var t=We().memoizedState;return mS({ref:t,nextImpl:e}),function(){if((Re&2)!==0)throw Error(l(440));return t.impl.apply(void 0,arguments)}}function Ym(e,t){return Ks(4,2,e,t)}function Pm(e,t){return Ks(4,4,e,t)}function Gm(e,t){if(typeof t=="function"){e=e();var r=t(e);return function(){typeof r=="function"?r():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Xm(e,t,r){r=r!=null?r.concat([e]):null,Ks(4,4,Gm.bind(null,t,e),r)}function Uc(){}function Fm(e,t){var r=We();t=t===void 0?null:t;var i=r.memoizedState;return t!==null&&Dc(t,i[1])?i[0]:(r.memoizedState=[e,t],e)}function $m(e,t){var r=We();t=t===void 0?null:t;var i=r.memoizedState;if(t!==null&&Dc(t,i[1]))return i[0];if(i=e(),Vr){Gn(!0);try{e()}finally{Gn(!1)}}return r.memoizedState=[i,t],i}function Hc(e,t,r){return r===void 0||(Mn&1073741824)!==0&&(Ne&261930)===0?e.memoizedState=t:(e.memoizedState=r,e=Kp(),we.lanes|=e,ar|=e,r)}function Km(e,t,r,i){return Rt(r,t)?r:ga.current!==null?(e=Hc(e,r,i),Rt(e,t)||(tt=!0),e):(Mn&42)===0||(Mn&1073741824)!==0&&(Ne&261930)===0?(tt=!0,e.memoizedState=r):(e=Kp(),we.lanes|=e,ar|=e,t)}function Zm(e,t,r,i,c){var d=ae.p;ae.p=d!==0&&8>d?d:8;var y=U.T,w={};U.T=w,Pc(e,!1,t,r);try{var M=c(),G=U.S;if(G!==null&&G(w,M),M!==null&&typeof M=="object"&&typeof M.then=="function"){var Q=cS(M,i);bi(e,t,Q,Lt(e))}else bi(e,t,i,Lt(e))}catch(te){bi(e,t,{then:function(){},status:"rejected",reason:te},Lt())}finally{ae.p=d,y!==null&&w.types!==null&&(y.types=w.types),U.T=y}}function pS(){}function qc(e,t,r,i){if(e.tag!==5)throw Error(l(476));var c=Qm(e).queue;Zm(e,c,t,Z,r===null?pS:function(){return Jm(e),r(i)})}function Qm(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:Z,baseState:Z,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:kn,lastRenderedState:Z},next:null};var r={};return t.next={memoizedState:r,baseState:r,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:kn,lastRenderedState:r},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Jm(e){var t=Qm(e);t.next===null&&(t=e.alternate.memoizedState),bi(e,t.next.queue,{},Lt())}function Yc(){return dt(Bi)}function Wm(){return We().memoizedState}function Im(){return We().memoizedState}function gS(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var r=Lt();e=Wn(r);var i=In(t,e,r);i!==null&&(Dt(i,t,r),pi(i,t,r)),t={cache:yc()},e.payload=t;return}t=t.return}}function yS(e,t,r){var i=Lt();r={lane:i,revertLane:0,gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},Zs(e)?tp(t,r):(r=sc(e,t,r,i),r!==null&&(Dt(r,e,i),np(r,t,i)))}function ep(e,t,r){var i=Lt();bi(e,t,r,i)}function bi(e,t,r,i){var c={lane:i,revertLane:0,gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null};if(Zs(e))tp(t,c);else{var d=e.alternate;if(e.lanes===0&&(d===null||d.lanes===0)&&(d=t.lastRenderedReducer,d!==null))try{var y=t.lastRenderedState,w=d(y,r);if(c.hasEagerState=!0,c.eagerState=w,Rt(w,y))return As(e,t,c,0),Ue===null&&Ds(),!1}catch{}finally{}if(r=sc(e,t,c,i),r!==null)return Dt(r,e,i),np(r,t,i),!0}return!1}function Pc(e,t,r,i){if(i={lane:2,revertLane:Su(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},Zs(e)){if(t)throw Error(l(479))}else t=sc(e,r,i,2),t!==null&&Dt(t,e,2)}function Zs(e){var t=e.alternate;return e===we||t!==null&&t===we}function tp(e,t){ya=Ys=!0;var r=e.pending;r===null?t.next=t:(t.next=r.next,r.next=t),e.pending=t}function np(e,t,r){if((r&4194048)!==0){var i=t.lanes;i&=e.pendingLanes,r|=i,t.lanes=r,lh(e,r)}}var Si={readContext:dt,use:Xs,useCallback:$e,useContext:$e,useEffect:$e,useImperativeHandle:$e,useLayoutEffect:$e,useInsertionEffect:$e,useMemo:$e,useReducer:$e,useRef:$e,useState:$e,useDebugValue:$e,useDeferredValue:$e,useTransition:$e,useSyncExternalStore:$e,useId:$e,useHostTransitionStatus:$e,useFormState:$e,useActionState:$e,useOptimistic:$e,useMemoCache:$e,useCacheRefresh:$e};Si.useEffectEvent=$e;var rp={readContext:dt,use:Xs,useCallback:function(e,t){return vt().memoizedState=[e,t===void 0?null:t],e},useContext:dt,useEffect:Hm,useImperativeHandle:function(e,t,r){r=r!=null?r.concat([e]):null,$s(4194308,4,Gm.bind(null,t,e),r)},useLayoutEffect:function(e,t){return $s(4194308,4,e,t)},useInsertionEffect:function(e,t){$s(4,2,e,t)},useMemo:function(e,t){var r=vt();t=t===void 0?null:t;var i=e();if(Vr){Gn(!0);try{e()}finally{Gn(!1)}}return r.memoizedState=[i,t],i},useReducer:function(e,t,r){var i=vt();if(r!==void 0){var c=r(t);if(Vr){Gn(!0);try{r(t)}finally{Gn(!1)}}}else c=t;return i.memoizedState=i.baseState=c,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:c},i.queue=e,e=e.dispatch=yS.bind(null,we,e),[i.memoizedState,e]},useRef:function(e){var t=vt();return e={current:e},t.memoizedState=e},useState:function(e){e=Vc(e);var t=e.queue,r=ep.bind(null,we,t);return t.dispatch=r,[e.memoizedState,r]},useDebugValue:Uc,useDeferredValue:function(e,t){var r=vt();return Hc(r,e,t)},useTransition:function(){var e=Vc(!1);return e=Zm.bind(null,we,e.queue,!0,!1),vt().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,r){var i=we,c=vt();if(Ae){if(r===void 0)throw Error(l(407));r=r()}else{if(r=t(),Ue===null)throw Error(l(349));(Ne&127)!==0||Em(i,t,r)}c.memoizedState=r;var d={value:r,getSnapshot:t};return c.queue=d,Hm(Cm.bind(null,i,d,e),[e]),i.flags|=2048,xa(9,{destroy:void 0},Tm.bind(null,i,d,r,t),null),r},useId:function(){var e=vt(),t=Ue.identifierPrefix;if(Ae){var r=fn,i=dn;r=(i&~(1<<32-kt(i)-1)).toString(32)+r,t="_"+t+"R_"+r,r=Ps++,0<r&&(t+="H"+r.toString(32)),t+="_"}else r=uS++,t="_"+t+"r_"+r.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:Yc,useFormState:_m,useActionState:_m,useOptimistic:function(e){var t=vt();t.memoizedState=t.baseState=e;var r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=r,t=Pc.bind(null,we,!0,r),r.dispatch=t,[e,t]},useMemoCache:Oc,useCacheRefresh:function(){return vt().memoizedState=gS.bind(null,we)},useEffectEvent:function(e){var t=vt(),r={impl:e};return t.memoizedState=r,function(){if((Re&2)!==0)throw Error(l(440));return r.impl.apply(void 0,arguments)}}},Gc={readContext:dt,use:Xs,useCallback:Fm,useContext:dt,useEffect:Lc,useImperativeHandle:Xm,useInsertionEffect:Ym,useLayoutEffect:Pm,useMemo:$m,useReducer:Fs,useRef:Um,useState:function(){return Fs(kn)},useDebugValue:Uc,useDeferredValue:function(e,t){var r=We();return Km(r,Ve.memoizedState,e,t)},useTransition:function(){var e=Fs(kn)[0],t=We().memoizedState;return[typeof e=="boolean"?e:xi(e),t]},useSyncExternalStore:jm,useId:Wm,useHostTransitionStatus:Yc,useFormState:Vm,useActionState:Vm,useOptimistic:function(e,t){var r=We();return Am(r,Ve,e,t)},useMemoCache:Oc,useCacheRefresh:Im};Gc.useEffectEvent=qm;var ap={readContext:dt,use:Xs,useCallback:Fm,useContext:dt,useEffect:Lc,useImperativeHandle:Xm,useInsertionEffect:Ym,useLayoutEffect:Pm,useMemo:$m,useReducer:_c,useRef:Um,useState:function(){return _c(kn)},useDebugValue:Uc,useDeferredValue:function(e,t){var r=We();return Ve===null?Hc(r,e,t):Km(r,Ve.memoizedState,e,t)},useTransition:function(){var e=_c(kn)[0],t=We().memoizedState;return[typeof e=="boolean"?e:xi(e),t]},useSyncExternalStore:jm,useId:Wm,useHostTransitionStatus:Yc,useFormState:Lm,useActionState:Lm,useOptimistic:function(e,t){var r=We();return Ve!==null?Am(r,Ve,e,t):(r.baseState=e,[e,r.queue.dispatch])},useMemoCache:Oc,useCacheRefresh:Im};ap.useEffectEvent=qm;function Xc(e,t,r,i){t=e.memoizedState,r=r(i,t),r=r==null?t:x({},t,r),e.memoizedState=r,e.lanes===0&&(e.updateQueue.baseState=r)}var Fc={enqueueSetState:function(e,t,r){e=e._reactInternals;var i=Lt(),c=Wn(i);c.payload=t,r!=null&&(c.callback=r),t=In(e,c,i),t!==null&&(Dt(t,e,i),pi(t,e,i))},enqueueReplaceState:function(e,t,r){e=e._reactInternals;var i=Lt(),c=Wn(i);c.tag=1,c.payload=t,r!=null&&(c.callback=r),t=In(e,c,i),t!==null&&(Dt(t,e,i),pi(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var r=Lt(),i=Wn(r);i.tag=2,t!=null&&(i.callback=t),t=In(e,i,r),t!==null&&(Dt(t,e,r),pi(t,e,r))}};function ip(e,t,r,i,c,d,y){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,d,y):t.prototype&&t.prototype.isPureReactComponent?!li(r,i)||!li(c,d):!0}function sp(e,t,r,i){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(r,i),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(r,i),t.state!==e&&Fc.enqueueReplaceState(t,t.state,null)}function Br(e,t){var r=t;if("ref"in t){r={};for(var i in t)i!=="ref"&&(r[i]=t[i])}if(e=e.defaultProps){r===t&&(r=x({},r));for(var c in e)r[c]===void 0&&(r[c]=e[c])}return r}function lp(e){Ns(e)}function op(e){console.error(e)}function cp(e){Ns(e)}function Qs(e,t){try{var r=e.onUncaughtError;r(t.value,{componentStack:t.stack})}catch(i){setTimeout(function(){throw i})}}function up(e,t,r){try{var i=e.onCaughtError;i(r.value,{componentStack:r.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(c){setTimeout(function(){throw c})}}function $c(e,t,r){return r=Wn(r),r.tag=3,r.payload={element:null},r.callback=function(){Qs(e,t)},r}function dp(e){return e=Wn(e),e.tag=3,e}function fp(e,t,r,i){var c=r.type.getDerivedStateFromError;if(typeof c=="function"){var d=i.value;e.payload=function(){return c(d)},e.callback=function(){up(t,r,i)}}var y=r.stateNode;y!==null&&typeof y.componentDidCatch=="function"&&(e.callback=function(){up(t,r,i),typeof c!="function"&&(ir===null?ir=new Set([this]):ir.add(this));var w=i.stack;this.componentDidCatch(i.value,{componentStack:w!==null?w:""})})}function vS(e,t,r,i,c){if(r.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(t=r.alternate,t!==null&&da(t,r,c,!0),r=zt.current,r!==null){switch(r.tag){case 31:case 13:return Zt===null?ol():r.alternate===null&&Ke===0&&(Ke=3),r.flags&=-257,r.flags|=65536,r.lanes=c,i===Bs?r.flags|=16384:(t=r.updateQueue,t===null?r.updateQueue=new Set([i]):t.add(i),vu(e,i,c)),!1;case 22:return r.flags|=65536,i===Bs?r.flags|=16384:(t=r.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([i])},r.updateQueue=t):(r=t.retryQueue,r===null?t.retryQueue=new Set([i]):r.add(i)),vu(e,i,c)),!1}throw Error(l(435,r.tag))}return vu(e,i,c),ol(),!1}if(Ae)return t=zt.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=c,i!==fc&&(e=Error(l(422),{cause:i}),ui(Xt(e,r)))):(i!==fc&&(t=Error(l(423),{cause:i}),ui(Xt(t,r))),e=e.current.alternate,e.flags|=65536,c&=-c,e.lanes|=c,i=Xt(i,r),c=$c(e.stateNode,i,c),jc(e,c),Ke!==4&&(Ke=2)),!1;var d=Error(l(520),{cause:i});if(d=Xt(d,r),Ai===null?Ai=[d]:Ai.push(d),Ke!==4&&(Ke=2),t===null)return!0;i=Xt(i,r),r=t;do{switch(r.tag){case 3:return r.flags|=65536,e=c&-c,r.lanes|=e,e=$c(r.stateNode,i,e),jc(r,e),!1;case 1:if(t=r.type,d=r.stateNode,(r.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||d!==null&&typeof d.componentDidCatch=="function"&&(ir===null||!ir.has(d))))return r.flags|=65536,c&=-c,r.lanes|=c,c=dp(c),fp(c,e,r,i),jc(r,c),!1}r=r.return}while(r!==null);return!1}var Kc=Error(l(461)),tt=!1;function ft(e,t,r,i){t.child=e===null?gm(t,null,r,i):_r(t,e.child,r,i)}function hp(e,t,r,i,c){r=r.render;var d=t.ref;if("ref"in i){var y={};for(var w in i)w!=="ref"&&(y[w]=i[w])}else y=i;return kr(t),i=Ac(e,t,r,y,d,c),w=Mc(),e!==null&&!tt?(kc(e,t,c),Rn(e,t,c)):(Ae&&w&&uc(t),t.flags|=1,ft(e,t,i,c),t.child)}function mp(e,t,r,i,c){if(e===null){var d=r.type;return typeof d=="function"&&!lc(d)&&d.defaultProps===void 0&&r.compare===null?(t.tag=15,t.type=d,pp(e,t,d,i,c)):(e=ks(r.type,null,i,t,t.mode,c),e.ref=t.ref,e.return=t,t.child=e)}if(d=e.child,!nu(e,c)){var y=d.memoizedProps;if(r=r.compare,r=r!==null?r:li,r(y,i)&&e.ref===t.ref)return Rn(e,t,c)}return t.flags|=1,e=Cn(d,i),e.ref=t.ref,e.return=t,t.child=e}function pp(e,t,r,i,c){if(e!==null){var d=e.memoizedProps;if(li(d,i)&&e.ref===t.ref)if(tt=!1,t.pendingProps=i=d,nu(e,c))(e.flags&131072)!==0&&(tt=!0);else return t.lanes=e.lanes,Rn(e,t,c)}return Zc(e,t,r,i,c)}function gp(e,t,r,i){var c=i.children,d=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if((t.flags&128)!==0){if(d=d!==null?d.baseLanes|r:r,e!==null){for(i=t.child=e.child,c=0;i!==null;)c=c|i.lanes|i.childLanes,i=i.sibling;i=c&~d}else i=0,t.child=null;return yp(e,t,d,r,i)}if((r&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&_s(t,d!==null?d.cachePool:null),d!==null?xm(t,d):Tc(),bm(t);else return i=t.lanes=536870912,yp(e,t,d!==null?d.baseLanes|r:r,r,i)}else d!==null?(_s(t,d.cachePool),xm(t,d),tr(),t.memoizedState=null):(e!==null&&_s(t,null),Tc(),tr());return ft(e,t,c,r),t.child}function wi(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function yp(e,t,r,i,c){var d=xc();return d=d===null?null:{parent:Ie._currentValue,pool:d},t.memoizedState={baseLanes:r,cachePool:d},e!==null&&_s(t,null),Tc(),bm(t),e!==null&&da(e,t,i,!0),t.childLanes=c,null}function Js(e,t){return t=Is({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function vp(e,t,r){return _r(t,e.child,null,r),e=Js(t,t.pendingProps),e.flags|=2,_t(t),t.memoizedState=null,e}function xS(e,t,r){var i=t.pendingProps,c=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(Ae){if(i.mode==="hidden")return e=Js(t,i),t.lanes=536870912,wi(null,e);if(Nc(t),(e=Pe)?(e=Mg(e,Kt),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:$n!==null?{id:dn,overflow:fn}:null,retryLane:536870912,hydrationErrors:null},r=tm(e),r.return=t,t.child=r,ut=t,Pe=null)):e=null,e===null)throw Zn(t);return t.lanes=536870912,null}return Js(t,i)}var d=e.memoizedState;if(d!==null){var y=d.dehydrated;if(Nc(t),c)if(t.flags&256)t.flags&=-257,t=vp(e,t,r);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(l(558));else if(tt||da(e,t,r,!1),c=(r&e.childLanes)!==0,tt||c){if(i=Ue,i!==null&&(y=oh(i,r),y!==0&&y!==d.retryLane))throw d.retryLane=y,Nr(e,y),Dt(i,e,y),Kc;ol(),t=vp(e,t,r)}else e=d.treeContext,Pe=Qt(y.nextSibling),ut=t,Ae=!0,Kn=null,Kt=!1,e!==null&&am(t,e),t=Js(t,i),t.flags|=4096;return t}return e=Cn(e.child,{mode:i.mode,children:i.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Ws(e,t){var r=t.ref;if(r===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof r!="function"&&typeof r!="object")throw Error(l(284));(e===null||e.ref!==r)&&(t.flags|=4194816)}}function Zc(e,t,r,i,c){return kr(t),r=Ac(e,t,r,i,void 0,c),i=Mc(),e!==null&&!tt?(kc(e,t,c),Rn(e,t,c)):(Ae&&i&&uc(t),t.flags|=1,ft(e,t,r,c),t.child)}function xp(e,t,r,i,c,d){return kr(t),t.updateQueue=null,r=wm(t,i,r,c),Sm(e),i=Mc(),e!==null&&!tt?(kc(e,t,d),Rn(e,t,d)):(Ae&&i&&uc(t),t.flags|=1,ft(e,t,r,d),t.child)}function bp(e,t,r,i,c){if(kr(t),t.stateNode===null){var d=la,y=r.contextType;typeof y=="object"&&y!==null&&(d=dt(y)),d=new r(i,d),t.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,d.updater=Fc,t.stateNode=d,d._reactInternals=t,d=t.stateNode,d.props=i,d.state=t.memoizedState,d.refs={},Sc(t),y=r.contextType,d.context=typeof y=="object"&&y!==null?dt(y):la,d.state=t.memoizedState,y=r.getDerivedStateFromProps,typeof y=="function"&&(Xc(t,r,y,i),d.state=t.memoizedState),typeof r.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(y=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),y!==d.state&&Fc.enqueueReplaceState(d,d.state,null),yi(t,i,d,c),gi(),d.state=t.memoizedState),typeof d.componentDidMount=="function"&&(t.flags|=4194308),i=!0}else if(e===null){d=t.stateNode;var w=t.memoizedProps,M=Br(r,w);d.props=M;var G=d.context,Q=r.contextType;y=la,typeof Q=="object"&&Q!==null&&(y=dt(Q));var te=r.getDerivedStateFromProps;Q=typeof te=="function"||typeof d.getSnapshotBeforeUpdate=="function",w=t.pendingProps!==w,Q||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(w||G!==y)&&sp(t,d,i,y),Jn=!1;var F=t.memoizedState;d.state=F,yi(t,i,d,c),gi(),G=t.memoizedState,w||F!==G||Jn?(typeof te=="function"&&(Xc(t,r,te,i),G=t.memoizedState),(M=Jn||ip(t,r,M,i,F,G,y))?(Q||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount()),typeof d.componentDidMount=="function"&&(t.flags|=4194308)):(typeof d.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=i,t.memoizedState=G),d.props=i,d.state=G,d.context=y,i=M):(typeof d.componentDidMount=="function"&&(t.flags|=4194308),i=!1)}else{d=t.stateNode,wc(e,t),y=t.memoizedProps,Q=Br(r,y),d.props=Q,te=t.pendingProps,F=d.context,G=r.contextType,M=la,typeof G=="object"&&G!==null&&(M=dt(G)),w=r.getDerivedStateFromProps,(G=typeof w=="function"||typeof d.getSnapshotBeforeUpdate=="function")||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(y!==te||F!==M)&&sp(t,d,i,M),Jn=!1,F=t.memoizedState,d.state=F,yi(t,i,d,c),gi();var K=t.memoizedState;y!==te||F!==K||Jn||e!==null&&e.dependencies!==null&&Os(e.dependencies)?(typeof w=="function"&&(Xc(t,r,w,i),K=t.memoizedState),(Q=Jn||ip(t,r,Q,i,F,K,M)||e!==null&&e.dependencies!==null&&Os(e.dependencies))?(G||typeof d.UNSAFE_componentWillUpdate!="function"&&typeof d.componentWillUpdate!="function"||(typeof d.componentWillUpdate=="function"&&d.componentWillUpdate(i,K,M),typeof d.UNSAFE_componentWillUpdate=="function"&&d.UNSAFE_componentWillUpdate(i,K,M)),typeof d.componentDidUpdate=="function"&&(t.flags|=4),typeof d.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof d.componentDidUpdate!="function"||y===e.memoizedProps&&F===e.memoizedState||(t.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&F===e.memoizedState||(t.flags|=1024),t.memoizedProps=i,t.memoizedState=K),d.props=i,d.state=K,d.context=M,i=Q):(typeof d.componentDidUpdate!="function"||y===e.memoizedProps&&F===e.memoizedState||(t.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&F===e.memoizedState||(t.flags|=1024),i=!1)}return d=i,Ws(e,t),i=(t.flags&128)!==0,d||i?(d=t.stateNode,r=i&&typeof r.getDerivedStateFromError!="function"?null:d.render(),t.flags|=1,e!==null&&i?(t.child=_r(t,e.child,null,c),t.child=_r(t,null,r,c)):ft(e,t,r,c),t.memoizedState=d.state,e=t.child):e=Rn(e,t,c),e}function Sp(e,t,r,i){return Ar(),t.flags|=256,ft(e,t,r,i),t.child}var Qc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Jc(e){return{baseLanes:e,cachePool:um()}}function Wc(e,t,r){return e=e!==null?e.childLanes&~r:0,t&&(e|=Bt),e}function wp(e,t,r){var i=t.pendingProps,c=!1,d=(t.flags&128)!==0,y;if((y=d)||(y=e!==null&&e.memoizedState===null?!1:(Je.current&2)!==0),y&&(c=!0,t.flags&=-129),y=(t.flags&32)!==0,t.flags&=-33,e===null){if(Ae){if(c?er(t):tr(),(e=Pe)?(e=Mg(e,Kt),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:$n!==null?{id:dn,overflow:fn}:null,retryLane:536870912,hydrationErrors:null},r=tm(e),r.return=t,t.child=r,ut=t,Pe=null)):e=null,e===null)throw Zn(t);return zu(e)?t.lanes=32:t.lanes=536870912,null}var w=i.children;return i=i.fallback,c?(tr(),c=t.mode,w=Is({mode:"hidden",children:w},c),i=Dr(i,c,r,null),w.return=t,i.return=t,w.sibling=i,t.child=w,i=t.child,i.memoizedState=Jc(r),i.childLanes=Wc(e,y,r),t.memoizedState=Qc,wi(null,i)):(er(t),Ic(t,w))}var M=e.memoizedState;if(M!==null&&(w=M.dehydrated,w!==null)){if(d)t.flags&256?(er(t),t.flags&=-257,t=eu(e,t,r)):t.memoizedState!==null?(tr(),t.child=e.child,t.flags|=128,t=null):(tr(),w=i.fallback,c=t.mode,i=Is({mode:"visible",children:i.children},c),w=Dr(w,c,r,null),w.flags|=2,i.return=t,w.return=t,i.sibling=w,t.child=i,_r(t,e.child,null,r),i=t.child,i.memoizedState=Jc(r),i.childLanes=Wc(e,y,r),t.memoizedState=Qc,t=wi(null,i));else if(er(t),zu(w)){if(y=w.nextSibling&&w.nextSibling.dataset,y)var G=y.dgst;y=G,i=Error(l(419)),i.stack="",i.digest=y,ui({value:i,source:null,stack:null}),t=eu(e,t,r)}else if(tt||da(e,t,r,!1),y=(r&e.childLanes)!==0,tt||y){if(y=Ue,y!==null&&(i=oh(y,r),i!==0&&i!==M.retryLane))throw M.retryLane=i,Nr(e,i),Dt(y,e,i),Kc;Ou(w)||ol(),t=eu(e,t,r)}else Ou(w)?(t.flags|=192,t.child=e.child,t=null):(e=M.treeContext,Pe=Qt(w.nextSibling),ut=t,Ae=!0,Kn=null,Kt=!1,e!==null&&am(t,e),t=Ic(t,i.children),t.flags|=4096);return t}return c?(tr(),w=i.fallback,c=t.mode,M=e.child,G=M.sibling,i=Cn(M,{mode:"hidden",children:i.children}),i.subtreeFlags=M.subtreeFlags&65011712,G!==null?w=Cn(G,w):(w=Dr(w,c,r,null),w.flags|=2),w.return=t,i.return=t,i.sibling=w,t.child=i,wi(null,i),i=t.child,w=e.child.memoizedState,w===null?w=Jc(r):(c=w.cachePool,c!==null?(M=Ie._currentValue,c=c.parent!==M?{parent:M,pool:M}:c):c=um(),w={baseLanes:w.baseLanes|r,cachePool:c}),i.memoizedState=w,i.childLanes=Wc(e,y,r),t.memoizedState=Qc,wi(e.child,i)):(er(t),r=e.child,e=r.sibling,r=Cn(r,{mode:"visible",children:i.children}),r.return=t,r.sibling=null,e!==null&&(y=t.deletions,y===null?(t.deletions=[e],t.flags|=16):y.push(e)),t.child=r,t.memoizedState=null,r)}function Ic(e,t){return t=Is({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function Is(e,t){return e=Ot(22,e,null,t),e.lanes=0,e}function eu(e,t,r){return _r(t,e.child,null,r),e=Ic(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function jp(e,t,r){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t),pc(e.return,t,r)}function tu(e,t,r,i,c,d){var y=e.memoizedState;y===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:i,tail:r,tailMode:c,treeForkCount:d}:(y.isBackwards=t,y.rendering=null,y.renderingStartTime=0,y.last=i,y.tail=r,y.tailMode=c,y.treeForkCount=d)}function Ep(e,t,r){var i=t.pendingProps,c=i.revealOrder,d=i.tail;i=i.children;var y=Je.current,w=(y&2)!==0;if(w?(y=y&1|2,t.flags|=128):y&=1,ee(Je,y),ft(e,t,i,r),i=Ae?ci:0,!w&&e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&jp(e,r,t);else if(e.tag===19)jp(e,r,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(c){case"forwards":for(r=t.child,c=null;r!==null;)e=r.alternate,e!==null&&qs(e)===null&&(c=r),r=r.sibling;r=c,r===null?(c=t.child,t.child=null):(c=r.sibling,r.sibling=null),tu(t,!1,c,r,d,i);break;case"backwards":case"unstable_legacy-backwards":for(r=null,c=t.child,t.child=null;c!==null;){if(e=c.alternate,e!==null&&qs(e)===null){t.child=c;break}e=c.sibling,c.sibling=r,r=c,c=e}tu(t,!0,r,null,d,i);break;case"together":tu(t,!1,null,null,void 0,i);break;default:t.memoizedState=null}return t.child}function Rn(e,t,r){if(e!==null&&(t.dependencies=e.dependencies),ar|=t.lanes,(r&t.childLanes)===0)if(e!==null){if(da(e,t,r,!1),(r&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(l(153));if(t.child!==null){for(e=t.child,r=Cn(e,e.pendingProps),t.child=r,r.return=t;e.sibling!==null;)e=e.sibling,r=r.sibling=Cn(e,e.pendingProps),r.return=t;r.sibling=null}return t.child}function nu(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&Os(e)))}function bS(e,t,r){switch(t.tag){case 3:ie(t,t.stateNode.containerInfo),Qn(t,Ie,e.memoizedState.cache),Ar();break;case 27:case 5:de(t);break;case 4:ie(t,t.stateNode.containerInfo);break;case 10:Qn(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Nc(t),null;break;case 13:var i=t.memoizedState;if(i!==null)return i.dehydrated!==null?(er(t),t.flags|=128,null):(r&t.child.childLanes)!==0?wp(e,t,r):(er(t),e=Rn(e,t,r),e!==null?e.sibling:null);er(t);break;case 19:var c=(e.flags&128)!==0;if(i=(r&t.childLanes)!==0,i||(da(e,t,r,!1),i=(r&t.childLanes)!==0),c){if(i)return Ep(e,t,r);t.flags|=128}if(c=t.memoizedState,c!==null&&(c.rendering=null,c.tail=null,c.lastEffect=null),ee(Je,Je.current),i)break;return null;case 22:return t.lanes=0,gp(e,t,r,t.pendingProps);case 24:Qn(t,Ie,e.memoizedState.cache)}return Rn(e,t,r)}function Tp(e,t,r){if(e!==null)if(e.memoizedProps!==t.pendingProps)tt=!0;else{if(!nu(e,r)&&(t.flags&128)===0)return tt=!1,bS(e,t,r);tt=(e.flags&131072)!==0}else tt=!1,Ae&&(t.flags&1048576)!==0&&rm(t,ci,t.index);switch(t.lanes=0,t.tag){case 16:e:{var i=t.pendingProps;if(e=Or(t.elementType),t.type=e,typeof e=="function")lc(e)?(i=Br(e,i),t.tag=1,t=bp(null,t,e,i,r)):(t.tag=0,t=Zc(null,t,e,i,r));else{if(e!=null){var c=e.$$typeof;if(c===O){t.tag=11,t=hp(null,t,e,i,r);break e}else if(c===A){t.tag=14,t=mp(null,t,e,i,r);break e}}throw t=ce(e)||e,Error(l(306,t,""))}}return t;case 0:return Zc(e,t,t.type,t.pendingProps,r);case 1:return i=t.type,c=Br(i,t.pendingProps),bp(e,t,i,c,r);case 3:e:{if(ie(t,t.stateNode.containerInfo),e===null)throw Error(l(387));i=t.pendingProps;var d=t.memoizedState;c=d.element,wc(e,t),yi(t,i,null,r);var y=t.memoizedState;if(i=y.cache,Qn(t,Ie,i),i!==d.cache&&gc(t,[Ie],r,!0),gi(),i=y.element,d.isDehydrated)if(d={element:i,isDehydrated:!1,cache:y.cache},t.updateQueue.baseState=d,t.memoizedState=d,t.flags&256){t=Sp(e,t,i,r);break e}else if(i!==c){c=Xt(Error(l(424)),t),ui(c),t=Sp(e,t,i,r);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Pe=Qt(e.firstChild),ut=t,Ae=!0,Kn=null,Kt=!0,r=gm(t,null,i,r),t.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling}else{if(Ar(),i===c){t=Rn(e,t,r);break e}ft(e,t,i,r)}t=t.child}return t;case 26:return Ws(e,t),e===null?(r=Vg(t.type,null,t.pendingProps,null))?t.memoizedState=r:Ae||(r=t.type,e=t.pendingProps,i=pl(me.current).createElement(r),i[ct]=t,i[wt]=e,ht(i,r,e),st(i),t.stateNode=i):t.memoizedState=Vg(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return de(t),e===null&&Ae&&(i=t.stateNode=Og(t.type,t.pendingProps,me.current),ut=t,Kt=!0,c=Pe,cr(t.type)?(_u=c,Pe=Qt(i.firstChild)):Pe=c),ft(e,t,t.pendingProps.children,r),Ws(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&Ae&&((c=i=Pe)&&(i=QS(i,t.type,t.pendingProps,Kt),i!==null?(t.stateNode=i,ut=t,Pe=Qt(i.firstChild),Kt=!1,c=!0):c=!1),c||Zn(t)),de(t),c=t.type,d=t.pendingProps,y=e!==null?e.memoizedProps:null,i=d.children,Mu(c,d)?i=null:y!==null&&Mu(c,y)&&(t.flags|=32),t.memoizedState!==null&&(c=Ac(e,t,dS,null,null,r),Bi._currentValue=c),Ws(e,t),ft(e,t,i,r),t.child;case 6:return e===null&&Ae&&((e=r=Pe)&&(r=JS(r,t.pendingProps,Kt),r!==null?(t.stateNode=r,ut=t,Pe=null,e=!0):e=!1),e||Zn(t)),null;case 13:return wp(e,t,r);case 4:return ie(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=_r(t,null,i,r):ft(e,t,i,r),t.child;case 11:return hp(e,t,t.type,t.pendingProps,r);case 7:return ft(e,t,t.pendingProps,r),t.child;case 8:return ft(e,t,t.pendingProps.children,r),t.child;case 12:return ft(e,t,t.pendingProps.children,r),t.child;case 10:return i=t.pendingProps,Qn(t,t.type,i.value),ft(e,t,i.children,r),t.child;case 9:return c=t.type._context,i=t.pendingProps.children,kr(t),c=dt(c),i=i(c),t.flags|=1,ft(e,t,i,r),t.child;case 14:return mp(e,t,t.type,t.pendingProps,r);case 15:return pp(e,t,t.type,t.pendingProps,r);case 19:return Ep(e,t,r);case 31:return xS(e,t,r);case 22:return gp(e,t,r,t.pendingProps);case 24:return kr(t),i=dt(Ie),e===null?(c=xc(),c===null&&(c=Ue,d=yc(),c.pooledCache=d,d.refCount++,d!==null&&(c.pooledCacheLanes|=r),c=d),t.memoizedState={parent:i,cache:c},Sc(t),Qn(t,Ie,c)):((e.lanes&r)!==0&&(wc(e,t),yi(t,null,null,r),gi()),c=e.memoizedState,d=t.memoizedState,c.parent!==i?(c={parent:i,cache:i},t.memoizedState=c,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=c),Qn(t,Ie,i)):(i=d.cache,Qn(t,Ie,i),i!==c.cache&&gc(t,[Ie],r,!0))),ft(e,t,t.pendingProps.children,r),t.child;case 29:throw t.pendingProps}throw Error(l(156,t.tag))}function On(e){e.flags|=4}function ru(e,t,r,i,c){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(c&335544128)===c)if(e.stateNode.complete)e.flags|=8192;else if(Wp())e.flags|=8192;else throw zr=Bs,bc}else e.flags&=-16777217}function Cp(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!qg(t))if(Wp())e.flags|=8192;else throw zr=Bs,bc}function el(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?ih():536870912,e.lanes|=t,ja|=t)}function ji(e,t){if(!Ae)switch(e.tailMode){case"hidden":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var i=null;r!==null;)r.alternate!==null&&(i=r),r=r.sibling;i===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null}}function Ge(e){var t=e.alternate!==null&&e.alternate.child===e.child,r=0,i=0;if(t)for(var c=e.child;c!==null;)r|=c.lanes|c.childLanes,i|=c.subtreeFlags&65011712,i|=c.flags&65011712,c.return=e,c=c.sibling;else for(c=e.child;c!==null;)r|=c.lanes|c.childLanes,i|=c.subtreeFlags,i|=c.flags,c.return=e,c=c.sibling;return e.subtreeFlags|=i,e.childLanes=r,t}function SS(e,t,r){var i=t.pendingProps;switch(dc(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ge(t),null;case 1:return Ge(t),null;case 3:return r=t.stateNode,i=null,e!==null&&(i=e.memoizedState.cache),t.memoizedState.cache!==i&&(t.flags|=2048),An(Ie),W(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(ua(t)?On(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,hc())),Ge(t),null;case 26:var c=t.type,d=t.memoizedState;return e===null?(On(t),d!==null?(Ge(t),Cp(t,d)):(Ge(t),ru(t,c,null,i,r))):d?d!==e.memoizedState?(On(t),Ge(t),Cp(t,d)):(Ge(t),t.flags&=-16777217):(e=e.memoizedProps,e!==i&&On(t),Ge(t),ru(t,c,e,i,r)),null;case 27:if(ne(t),r=me.current,c=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&On(t);else{if(!i){if(t.stateNode===null)throw Error(l(166));return Ge(t),null}e=se.current,ua(t)?im(t):(e=Og(c,i,r),t.stateNode=e,On(t))}return Ge(t),null;case 5:if(ne(t),c=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&On(t);else{if(!i){if(t.stateNode===null)throw Error(l(166));return Ge(t),null}if(d=se.current,ua(t))im(t);else{var y=pl(me.current);switch(d){case 1:d=y.createElementNS("http://www.w3.org/2000/svg",c);break;case 2:d=y.createElementNS("http://www.w3.org/1998/Math/MathML",c);break;default:switch(c){case"svg":d=y.createElementNS("http://www.w3.org/2000/svg",c);break;case"math":d=y.createElementNS("http://www.w3.org/1998/Math/MathML",c);break;case"script":d=y.createElement("div"),d.innerHTML="<script><\/script>",d=d.removeChild(d.firstChild);break;case"select":d=typeof i.is=="string"?y.createElement("select",{is:i.is}):y.createElement("select"),i.multiple?d.multiple=!0:i.size&&(d.size=i.size);break;default:d=typeof i.is=="string"?y.createElement(c,{is:i.is}):y.createElement(c)}}d[ct]=t,d[wt]=i;e:for(y=t.child;y!==null;){if(y.tag===5||y.tag===6)d.appendChild(y.stateNode);else if(y.tag!==4&&y.tag!==27&&y.child!==null){y.child.return=y,y=y.child;continue}if(y===t)break e;for(;y.sibling===null;){if(y.return===null||y.return===t)break e;y=y.return}y.sibling.return=y.return,y=y.sibling}t.stateNode=d;e:switch(ht(d,c,i),c){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}i&&On(t)}}return Ge(t),ru(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,r),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==i&&On(t);else{if(typeof i!="string"&&t.stateNode===null)throw Error(l(166));if(e=me.current,ua(t)){if(e=t.stateNode,r=t.memoizedProps,i=null,c=ut,c!==null)switch(c.tag){case 27:case 5:i=c.memoizedProps}e[ct]=t,e=!!(e.nodeValue===r||i!==null&&i.suppressHydrationWarning===!0||wg(e.nodeValue,r)),e||Zn(t,!0)}else e=pl(e).createTextNode(i),e[ct]=t,t.stateNode=e}return Ge(t),null;case 31:if(r=t.memoizedState,e===null||e.memoizedState!==null){if(i=ua(t),r!==null){if(e===null){if(!i)throw Error(l(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(l(557));e[ct]=t}else Ar(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ge(t),e=!1}else r=hc(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=r),e=!0;if(!e)return t.flags&256?(_t(t),t):(_t(t),null);if((t.flags&128)!==0)throw Error(l(558))}return Ge(t),null;case 13:if(i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(c=ua(t),i!==null&&i.dehydrated!==null){if(e===null){if(!c)throw Error(l(318));if(c=t.memoizedState,c=c!==null?c.dehydrated:null,!c)throw Error(l(317));c[ct]=t}else Ar(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ge(t),c=!1}else c=hc(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=c),c=!0;if(!c)return t.flags&256?(_t(t),t):(_t(t),null)}return _t(t),(t.flags&128)!==0?(t.lanes=r,t):(r=i!==null,e=e!==null&&e.memoizedState!==null,r&&(i=t.child,c=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(c=i.alternate.memoizedState.cachePool.pool),d=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(d=i.memoizedState.cachePool.pool),d!==c&&(i.flags|=2048)),r!==e&&r&&(t.child.flags|=8192),el(t,t.updateQueue),Ge(t),null);case 4:return W(),e===null&&Tu(t.stateNode.containerInfo),Ge(t),null;case 10:return An(t.type),Ge(t),null;case 19:if(R(Je),i=t.memoizedState,i===null)return Ge(t),null;if(c=(t.flags&128)!==0,d=i.rendering,d===null)if(c)ji(i,!1);else{if(Ke!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(d=qs(e),d!==null){for(t.flags|=128,ji(i,!1),e=d.updateQueue,t.updateQueue=e,el(t,e),t.subtreeFlags=0,e=r,r=t.child;r!==null;)em(r,e),r=r.sibling;return ee(Je,Je.current&1|2),Ae&&Nn(t,i.treeForkCount),t.child}e=e.sibling}i.tail!==null&&At()>il&&(t.flags|=128,c=!0,ji(i,!1),t.lanes=4194304)}else{if(!c)if(e=qs(d),e!==null){if(t.flags|=128,c=!0,e=e.updateQueue,t.updateQueue=e,el(t,e),ji(i,!0),i.tail===null&&i.tailMode==="hidden"&&!d.alternate&&!Ae)return Ge(t),null}else 2*At()-i.renderingStartTime>il&&r!==536870912&&(t.flags|=128,c=!0,ji(i,!1),t.lanes=4194304);i.isBackwards?(d.sibling=t.child,t.child=d):(e=i.last,e!==null?e.sibling=d:t.child=d,i.last=d)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=At(),e.sibling=null,r=Je.current,ee(Je,c?r&1|2:r&1),Ae&&Nn(t,i.treeForkCount),e):(Ge(t),null);case 22:case 23:return _t(t),Cc(),i=t.memoizedState!==null,e!==null?e.memoizedState!==null!==i&&(t.flags|=8192):i&&(t.flags|=8192),i?(r&536870912)!==0&&(t.flags&128)===0&&(Ge(t),t.subtreeFlags&6&&(t.flags|=8192)):Ge(t),r=t.updateQueue,r!==null&&el(t,r.retryQueue),r=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(r=e.memoizedState.cachePool.pool),i=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(i=t.memoizedState.cachePool.pool),i!==r&&(t.flags|=2048),e!==null&&R(Rr),null;case 24:return r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),An(Ie),Ge(t),null;case 25:return null;case 30:return null}throw Error(l(156,t.tag))}function wS(e,t){switch(dc(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return An(Ie),W(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return ne(t),null;case 31:if(t.memoizedState!==null){if(_t(t),t.alternate===null)throw Error(l(340));Ar()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(_t(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(l(340));Ar()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return R(Je),null;case 4:return W(),null;case 10:return An(t.type),null;case 22:case 23:return _t(t),Cc(),e!==null&&R(Rr),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return An(Ie),null;case 25:return null;default:return null}}function Np(e,t){switch(dc(t),t.tag){case 3:An(Ie),W();break;case 26:case 27:case 5:ne(t);break;case 4:W();break;case 31:t.memoizedState!==null&&_t(t);break;case 13:_t(t);break;case 19:R(Je);break;case 10:An(t.type);break;case 22:case 23:_t(t),Cc(),e!==null&&R(Rr);break;case 24:An(Ie)}}function Ei(e,t){try{var r=t.updateQueue,i=r!==null?r.lastEffect:null;if(i!==null){var c=i.next;r=c;do{if((r.tag&e)===e){i=void 0;var d=r.create,y=r.inst;i=d(),y.destroy=i}r=r.next}while(r!==c)}}catch(w){_e(t,t.return,w)}}function nr(e,t,r){try{var i=t.updateQueue,c=i!==null?i.lastEffect:null;if(c!==null){var d=c.next;i=d;do{if((i.tag&e)===e){var y=i.inst,w=y.destroy;if(w!==void 0){y.destroy=void 0,c=t;var M=r,G=w;try{G()}catch(Q){_e(c,M,Q)}}}i=i.next}while(i!==d)}}catch(Q){_e(t,t.return,Q)}}function Dp(e){var t=e.updateQueue;if(t!==null){var r=e.stateNode;try{vm(t,r)}catch(i){_e(e,e.return,i)}}}function Ap(e,t,r){r.props=Br(e.type,e.memoizedProps),r.state=e.memoizedState;try{r.componentWillUnmount()}catch(i){_e(e,t,i)}}function Ti(e,t){try{var r=e.ref;if(r!==null){switch(e.tag){case 26:case 27:case 5:var i=e.stateNode;break;case 30:i=e.stateNode;break;default:i=e.stateNode}typeof r=="function"?e.refCleanup=r(i):r.current=i}}catch(c){_e(e,t,c)}}function hn(e,t){var r=e.ref,i=e.refCleanup;if(r!==null)if(typeof i=="function")try{i()}catch(c){_e(e,t,c)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof r=="function")try{r(null)}catch(c){_e(e,t,c)}else r.current=null}function Mp(e){var t=e.type,r=e.memoizedProps,i=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":r.autoFocus&&i.focus();break e;case"img":r.src?i.src=r.src:r.srcSet&&(i.srcset=r.srcSet)}}catch(c){_e(e,e.return,c)}}function au(e,t,r){try{var i=e.stateNode;GS(i,e.type,r,t),i[wt]=t}catch(c){_e(e,e.return,c)}}function kp(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&cr(e.type)||e.tag===4}function iu(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||kp(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&cr(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function su(e,t,r){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?(r.nodeType===9?r.body:r.nodeName==="HTML"?r.ownerDocument.body:r).insertBefore(e,t):(t=r.nodeType===9?r.body:r.nodeName==="HTML"?r.ownerDocument.body:r,t.appendChild(e),r=r._reactRootContainer,r!=null||t.onclick!==null||(t.onclick=En));else if(i!==4&&(i===27&&cr(e.type)&&(r=e.stateNode,t=null),e=e.child,e!==null))for(su(e,t,r),e=e.sibling;e!==null;)su(e,t,r),e=e.sibling}function tl(e,t,r){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?r.insertBefore(e,t):r.appendChild(e);else if(i!==4&&(i===27&&cr(e.type)&&(r=e.stateNode),e=e.child,e!==null))for(tl(e,t,r),e=e.sibling;e!==null;)tl(e,t,r),e=e.sibling}function Rp(e){var t=e.stateNode,r=e.memoizedProps;try{for(var i=e.type,c=t.attributes;c.length;)t.removeAttributeNode(c[0]);ht(t,i,r),t[ct]=e,t[wt]=r}catch(d){_e(e,e.return,d)}}var zn=!1,nt=!1,lu=!1,Op=typeof WeakSet=="function"?WeakSet:Set,lt=null;function jS(e,t){if(e=e.containerInfo,Du=wl,e=Xh(e),ec(e)){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{r=(r=e.ownerDocument)&&r.defaultView||window;var i=r.getSelection&&r.getSelection();if(i&&i.rangeCount!==0){r=i.anchorNode;var c=i.anchorOffset,d=i.focusNode;i=i.focusOffset;try{r.nodeType,d.nodeType}catch{r=null;break e}var y=0,w=-1,M=-1,G=0,Q=0,te=e,F=null;t:for(;;){for(var K;te!==r||c!==0&&te.nodeType!==3||(w=y+c),te!==d||i!==0&&te.nodeType!==3||(M=y+i),te.nodeType===3&&(y+=te.nodeValue.length),(K=te.firstChild)!==null;)F=te,te=K;for(;;){if(te===e)break t;if(F===r&&++G===c&&(w=y),F===d&&++Q===i&&(M=y),(K=te.nextSibling)!==null)break;te=F,F=te.parentNode}te=K}r=w===-1||M===-1?null:{start:w,end:M}}else r=null}r=r||{start:0,end:0}}else r=null;for(Au={focusedElem:e,selectionRange:r},wl=!1,lt=t;lt!==null;)if(t=lt,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,lt=e;else for(;lt!==null;){switch(t=lt,d=t.alternate,e=t.flags,t.tag){case 0:if((e&4)!==0&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(r=0;r<e.length;r++)c=e[r],c.ref.impl=c.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&d!==null){e=void 0,r=t,c=d.memoizedProps,d=d.memoizedState,i=r.stateNode;try{var fe=Br(r.type,c);e=i.getSnapshotBeforeUpdate(fe,d),i.__reactInternalSnapshotBeforeUpdate=e}catch(be){_e(r,r.return,be)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,r=e.nodeType,r===9)Ru(e);else if(r===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Ru(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(l(163))}if(e=t.sibling,e!==null){e.return=t.return,lt=e;break}lt=t.return}}function zp(e,t,r){var i=r.flags;switch(r.tag){case 0:case 11:case 15:Vn(e,r),i&4&&Ei(5,r);break;case 1:if(Vn(e,r),i&4)if(e=r.stateNode,t===null)try{e.componentDidMount()}catch(y){_e(r,r.return,y)}else{var c=Br(r.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(c,t,e.__reactInternalSnapshotBeforeUpdate)}catch(y){_e(r,r.return,y)}}i&64&&Dp(r),i&512&&Ti(r,r.return);break;case 3:if(Vn(e,r),i&64&&(e=r.updateQueue,e!==null)){if(t=null,r.child!==null)switch(r.child.tag){case 27:case 5:t=r.child.stateNode;break;case 1:t=r.child.stateNode}try{vm(e,t)}catch(y){_e(r,r.return,y)}}break;case 27:t===null&&i&4&&Rp(r);case 26:case 5:Vn(e,r),t===null&&i&4&&Mp(r),i&512&&Ti(r,r.return);break;case 12:Vn(e,r);break;case 31:Vn(e,r),i&4&&Bp(e,r);break;case 13:Vn(e,r),i&4&&Lp(e,r),i&64&&(e=r.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(r=RS.bind(null,r),WS(e,r))));break;case 22:if(i=r.memoizedState!==null||zn,!i){t=t!==null&&t.memoizedState!==null||nt,c=zn;var d=nt;zn=i,(nt=t)&&!d?Bn(e,r,(r.subtreeFlags&8772)!==0):Vn(e,r),zn=c,nt=d}break;case 30:break;default:Vn(e,r)}}function _p(e){var t=e.alternate;t!==null&&(e.alternate=null,_p(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Bo(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Xe=null,Et=!1;function _n(e,t,r){for(r=r.child;r!==null;)Vp(e,t,r),r=r.sibling}function Vp(e,t,r){if(Mt&&typeof Mt.onCommitFiberUnmount=="function")try{Mt.onCommitFiberUnmount(Za,r)}catch{}switch(r.tag){case 26:nt||hn(r,t),_n(e,t,r),r.memoizedState?r.memoizedState.count--:r.stateNode&&(r=r.stateNode,r.parentNode.removeChild(r));break;case 27:nt||hn(r,t);var i=Xe,c=Et;cr(r.type)&&(Xe=r.stateNode,Et=!1),_n(e,t,r),zi(r.stateNode),Xe=i,Et=c;break;case 5:nt||hn(r,t);case 6:if(i=Xe,c=Et,Xe=null,_n(e,t,r),Xe=i,Et=c,Xe!==null)if(Et)try{(Xe.nodeType===9?Xe.body:Xe.nodeName==="HTML"?Xe.ownerDocument.body:Xe).removeChild(r.stateNode)}catch(d){_e(r,t,d)}else try{Xe.removeChild(r.stateNode)}catch(d){_e(r,t,d)}break;case 18:Xe!==null&&(Et?(e=Xe,Dg(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,r.stateNode),ka(e)):Dg(Xe,r.stateNode));break;case 4:i=Xe,c=Et,Xe=r.stateNode.containerInfo,Et=!0,_n(e,t,r),Xe=i,Et=c;break;case 0:case 11:case 14:case 15:nr(2,r,t),nt||nr(4,r,t),_n(e,t,r);break;case 1:nt||(hn(r,t),i=r.stateNode,typeof i.componentWillUnmount=="function"&&Ap(r,t,i)),_n(e,t,r);break;case 21:_n(e,t,r);break;case 22:nt=(i=nt)||r.memoizedState!==null,_n(e,t,r),nt=i;break;default:_n(e,t,r)}}function Bp(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{ka(e)}catch(r){_e(t,t.return,r)}}}function Lp(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{ka(e)}catch(r){_e(t,t.return,r)}}function ES(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new Op),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new Op),t;default:throw Error(l(435,e.tag))}}function nl(e,t){var r=ES(e);t.forEach(function(i){if(!r.has(i)){r.add(i);var c=OS.bind(null,e,i);i.then(c,c)}})}function Tt(e,t){var r=t.deletions;if(r!==null)for(var i=0;i<r.length;i++){var c=r[i],d=e,y=t,w=y;e:for(;w!==null;){switch(w.tag){case 27:if(cr(w.type)){Xe=w.stateNode,Et=!1;break e}break;case 5:Xe=w.stateNode,Et=!1;break e;case 3:case 4:Xe=w.stateNode.containerInfo,Et=!0;break e}w=w.return}if(Xe===null)throw Error(l(160));Vp(d,y,c),Xe=null,Et=!1,d=c.alternate,d!==null&&(d.return=null),c.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Up(t,e),t=t.sibling}var an=null;function Up(e,t){var r=e.alternate,i=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Tt(t,e),Ct(e),i&4&&(nr(3,e,e.return),Ei(3,e),nr(5,e,e.return));break;case 1:Tt(t,e),Ct(e),i&512&&(nt||r===null||hn(r,r.return)),i&64&&zn&&(e=e.updateQueue,e!==null&&(i=e.callbacks,i!==null&&(r=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=r===null?i:r.concat(i))));break;case 26:var c=an;if(Tt(t,e),Ct(e),i&512&&(nt||r===null||hn(r,r.return)),i&4){var d=r!==null?r.memoizedState:null;if(i=e.memoizedState,r===null)if(i===null)if(e.stateNode===null){e:{i=e.type,r=e.memoizedProps,c=c.ownerDocument||c;t:switch(i){case"title":d=c.getElementsByTagName("title")[0],(!d||d[Wa]||d[ct]||d.namespaceURI==="http://www.w3.org/2000/svg"||d.hasAttribute("itemprop"))&&(d=c.createElement(i),c.head.insertBefore(d,c.querySelector("head > title"))),ht(d,i,r),d[ct]=e,st(d),i=d;break e;case"link":var y=Ug("link","href",c).get(i+(r.href||""));if(y){for(var w=0;w<y.length;w++)if(d=y[w],d.getAttribute("href")===(r.href==null||r.href===""?null:r.href)&&d.getAttribute("rel")===(r.rel==null?null:r.rel)&&d.getAttribute("title")===(r.title==null?null:r.title)&&d.getAttribute("crossorigin")===(r.crossOrigin==null?null:r.crossOrigin)){y.splice(w,1);break t}}d=c.createElement(i),ht(d,i,r),c.head.appendChild(d);break;case"meta":if(y=Ug("meta","content",c).get(i+(r.content||""))){for(w=0;w<y.length;w++)if(d=y[w],d.getAttribute("content")===(r.content==null?null:""+r.content)&&d.getAttribute("name")===(r.name==null?null:r.name)&&d.getAttribute("property")===(r.property==null?null:r.property)&&d.getAttribute("http-equiv")===(r.httpEquiv==null?null:r.httpEquiv)&&d.getAttribute("charset")===(r.charSet==null?null:r.charSet)){y.splice(w,1);break t}}d=c.createElement(i),ht(d,i,r),c.head.appendChild(d);break;default:throw Error(l(468,i))}d[ct]=e,st(d),i=d}e.stateNode=i}else Hg(c,e.type,e.stateNode);else e.stateNode=Lg(c,i,e.memoizedProps);else d!==i?(d===null?r.stateNode!==null&&(r=r.stateNode,r.parentNode.removeChild(r)):d.count--,i===null?Hg(c,e.type,e.stateNode):Lg(c,i,e.memoizedProps)):i===null&&e.stateNode!==null&&au(e,e.memoizedProps,r.memoizedProps)}break;case 27:Tt(t,e),Ct(e),i&512&&(nt||r===null||hn(r,r.return)),r!==null&&i&4&&au(e,e.memoizedProps,r.memoizedProps);break;case 5:if(Tt(t,e),Ct(e),i&512&&(nt||r===null||hn(r,r.return)),e.flags&32){c=e.stateNode;try{ea(c,"")}catch(fe){_e(e,e.return,fe)}}i&4&&e.stateNode!=null&&(c=e.memoizedProps,au(e,c,r!==null?r.memoizedProps:c)),i&1024&&(lu=!0);break;case 6:if(Tt(t,e),Ct(e),i&4){if(e.stateNode===null)throw Error(l(162));i=e.memoizedProps,r=e.stateNode;try{r.nodeValue=i}catch(fe){_e(e,e.return,fe)}}break;case 3:if(vl=null,c=an,an=gl(t.containerInfo),Tt(t,e),an=c,Ct(e),i&4&&r!==null&&r.memoizedState.isDehydrated)try{ka(t.containerInfo)}catch(fe){_e(e,e.return,fe)}lu&&(lu=!1,Hp(e));break;case 4:i=an,an=gl(e.stateNode.containerInfo),Tt(t,e),Ct(e),an=i;break;case 12:Tt(t,e),Ct(e);break;case 31:Tt(t,e),Ct(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,nl(e,i)));break;case 13:Tt(t,e),Ct(e),e.child.flags&8192&&e.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(al=At()),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,nl(e,i)));break;case 22:c=e.memoizedState!==null;var M=r!==null&&r.memoizedState!==null,G=zn,Q=nt;if(zn=G||c,nt=Q||M,Tt(t,e),nt=Q,zn=G,Ct(e),i&8192)e:for(t=e.stateNode,t._visibility=c?t._visibility&-2:t._visibility|1,c&&(r===null||M||zn||nt||Lr(e)),r=null,t=e;;){if(t.tag===5||t.tag===26){if(r===null){M=r=t;try{if(d=M.stateNode,c)y=d.style,typeof y.setProperty=="function"?y.setProperty("display","none","important"):y.display="none";else{w=M.stateNode;var te=M.memoizedProps.style,F=te!=null&&te.hasOwnProperty("display")?te.display:null;w.style.display=F==null||typeof F=="boolean"?"":(""+F).trim()}}catch(fe){_e(M,M.return,fe)}}}else if(t.tag===6){if(r===null){M=t;try{M.stateNode.nodeValue=c?"":M.memoizedProps}catch(fe){_e(M,M.return,fe)}}}else if(t.tag===18){if(r===null){M=t;try{var K=M.stateNode;c?Ag(K,!0):Ag(M.stateNode,!1)}catch(fe){_e(M,M.return,fe)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;r===t&&(r=null),t=t.return}r===t&&(r=null),t.sibling.return=t.return,t=t.sibling}i&4&&(i=e.updateQueue,i!==null&&(r=i.retryQueue,r!==null&&(i.retryQueue=null,nl(e,r))));break;case 19:Tt(t,e),Ct(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,nl(e,i)));break;case 30:break;case 21:break;default:Tt(t,e),Ct(e)}}function Ct(e){var t=e.flags;if(t&2){try{for(var r,i=e.return;i!==null;){if(kp(i)){r=i;break}i=i.return}if(r==null)throw Error(l(160));switch(r.tag){case 27:var c=r.stateNode,d=iu(e);tl(e,d,c);break;case 5:var y=r.stateNode;r.flags&32&&(ea(y,""),r.flags&=-33);var w=iu(e);tl(e,w,y);break;case 3:case 4:var M=r.stateNode.containerInfo,G=iu(e);su(e,G,M);break;default:throw Error(l(161))}}catch(Q){_e(e,e.return,Q)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Hp(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Hp(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function Vn(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)zp(e,t.alternate,t),t=t.sibling}function Lr(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:nr(4,t,t.return),Lr(t);break;case 1:hn(t,t.return);var r=t.stateNode;typeof r.componentWillUnmount=="function"&&Ap(t,t.return,r),Lr(t);break;case 27:zi(t.stateNode);case 26:case 5:hn(t,t.return),Lr(t);break;case 22:t.memoizedState===null&&Lr(t);break;case 30:Lr(t);break;default:Lr(t)}e=e.sibling}}function Bn(e,t,r){for(r=r&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var i=t.alternate,c=e,d=t,y=d.flags;switch(d.tag){case 0:case 11:case 15:Bn(c,d,r),Ei(4,d);break;case 1:if(Bn(c,d,r),i=d,c=i.stateNode,typeof c.componentDidMount=="function")try{c.componentDidMount()}catch(G){_e(i,i.return,G)}if(i=d,c=i.updateQueue,c!==null){var w=i.stateNode;try{var M=c.shared.hiddenCallbacks;if(M!==null)for(c.shared.hiddenCallbacks=null,c=0;c<M.length;c++)ym(M[c],w)}catch(G){_e(i,i.return,G)}}r&&y&64&&Dp(d),Ti(d,d.return);break;case 27:Rp(d);case 26:case 5:Bn(c,d,r),r&&i===null&&y&4&&Mp(d),Ti(d,d.return);break;case 12:Bn(c,d,r);break;case 31:Bn(c,d,r),r&&y&4&&Bp(c,d);break;case 13:Bn(c,d,r),r&&y&4&&Lp(c,d);break;case 22:d.memoizedState===null&&Bn(c,d,r),Ti(d,d.return);break;case 30:break;default:Bn(c,d,r)}t=t.sibling}}function ou(e,t){var r=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(r=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==r&&(e!=null&&e.refCount++,r!=null&&di(r))}function cu(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&di(e))}function sn(e,t,r,i){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)qp(e,t,r,i),t=t.sibling}function qp(e,t,r,i){var c=t.flags;switch(t.tag){case 0:case 11:case 15:sn(e,t,r,i),c&2048&&Ei(9,t);break;case 1:sn(e,t,r,i);break;case 3:sn(e,t,r,i),c&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&di(e)));break;case 12:if(c&2048){sn(e,t,r,i),e=t.stateNode;try{var d=t.memoizedProps,y=d.id,w=d.onPostCommit;typeof w=="function"&&w(y,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(M){_e(t,t.return,M)}}else sn(e,t,r,i);break;case 31:sn(e,t,r,i);break;case 13:sn(e,t,r,i);break;case 23:break;case 22:d=t.stateNode,y=t.alternate,t.memoizedState!==null?d._visibility&2?sn(e,t,r,i):Ci(e,t):d._visibility&2?sn(e,t,r,i):(d._visibility|=2,ba(e,t,r,i,(t.subtreeFlags&10256)!==0||!1)),c&2048&&ou(y,t);break;case 24:sn(e,t,r,i),c&2048&&cu(t.alternate,t);break;default:sn(e,t,r,i)}}function ba(e,t,r,i,c){for(c=c&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var d=e,y=t,w=r,M=i,G=y.flags;switch(y.tag){case 0:case 11:case 15:ba(d,y,w,M,c),Ei(8,y);break;case 23:break;case 22:var Q=y.stateNode;y.memoizedState!==null?Q._visibility&2?ba(d,y,w,M,c):Ci(d,y):(Q._visibility|=2,ba(d,y,w,M,c)),c&&G&2048&&ou(y.alternate,y);break;case 24:ba(d,y,w,M,c),c&&G&2048&&cu(y.alternate,y);break;default:ba(d,y,w,M,c)}t=t.sibling}}function Ci(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var r=e,i=t,c=i.flags;switch(i.tag){case 22:Ci(r,i),c&2048&&ou(i.alternate,i);break;case 24:Ci(r,i),c&2048&&cu(i.alternate,i);break;default:Ci(r,i)}t=t.sibling}}var Ni=8192;function Sa(e,t,r){if(e.subtreeFlags&Ni)for(e=e.child;e!==null;)Yp(e,t,r),e=e.sibling}function Yp(e,t,r){switch(e.tag){case 26:Sa(e,t,r),e.flags&Ni&&e.memoizedState!==null&&uw(r,an,e.memoizedState,e.memoizedProps);break;case 5:Sa(e,t,r);break;case 3:case 4:var i=an;an=gl(e.stateNode.containerInfo),Sa(e,t,r),an=i;break;case 22:e.memoizedState===null&&(i=e.alternate,i!==null&&i.memoizedState!==null?(i=Ni,Ni=16777216,Sa(e,t,r),Ni=i):Sa(e,t,r));break;default:Sa(e,t,r)}}function Pp(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Di(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var r=0;r<t.length;r++){var i=t[r];lt=i,Xp(i,e)}Pp(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Gp(e),e=e.sibling}function Gp(e){switch(e.tag){case 0:case 11:case 15:Di(e),e.flags&2048&&nr(9,e,e.return);break;case 3:Di(e);break;case 12:Di(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,rl(e)):Di(e);break;default:Di(e)}}function rl(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var r=0;r<t.length;r++){var i=t[r];lt=i,Xp(i,e)}Pp(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:nr(8,t,t.return),rl(t);break;case 22:r=t.stateNode,r._visibility&2&&(r._visibility&=-3,rl(t));break;default:rl(t)}e=e.sibling}}function Xp(e,t){for(;lt!==null;){var r=lt;switch(r.tag){case 0:case 11:case 15:nr(8,r,t);break;case 23:case 22:if(r.memoizedState!==null&&r.memoizedState.cachePool!==null){var i=r.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:di(r.memoizedState.cache)}if(i=r.child,i!==null)i.return=r,lt=i;else e:for(r=e;lt!==null;){i=lt;var c=i.sibling,d=i.return;if(_p(i),i===r){lt=null;break e}if(c!==null){c.return=d,lt=c;break e}lt=d}}}var TS={getCacheForType:function(e){var t=dt(Ie),r=t.data.get(e);return r===void 0&&(r=e(),t.data.set(e,r)),r},cacheSignal:function(){return dt(Ie).controller.signal}},CS=typeof WeakMap=="function"?WeakMap:Map,Re=0,Ue=null,Ee=null,Ne=0,ze=0,Vt=null,rr=!1,wa=!1,uu=!1,Ln=0,Ke=0,ar=0,Ur=0,du=0,Bt=0,ja=0,Ai=null,Nt=null,fu=!1,al=0,Fp=0,il=1/0,sl=null,ir=null,at=0,sr=null,Ea=null,Un=0,hu=0,mu=null,$p=null,Mi=0,pu=null;function Lt(){return(Re&2)!==0&&Ne!==0?Ne&-Ne:U.T!==null?Su():ch()}function Kp(){if(Bt===0)if((Ne&536870912)===0||Ae){var e=ms;ms<<=1,(ms&3932160)===0&&(ms=262144),Bt=e}else Bt=536870912;return e=zt.current,e!==null&&(e.flags|=32),Bt}function Dt(e,t,r){(e===Ue&&(ze===2||ze===9)||e.cancelPendingCommit!==null)&&(Ta(e,0),lr(e,Ne,Bt,!1)),Ja(e,r),((Re&2)===0||e!==Ue)&&(e===Ue&&((Re&2)===0&&(Ur|=r),Ke===4&&lr(e,Ne,Bt,!1)),mn(e))}function Zp(e,t,r){if((Re&6)!==0)throw Error(l(327));var i=!r&&(t&127)===0&&(t&e.expiredLanes)===0||Qa(e,t),c=i?AS(e,t):yu(e,t,!0),d=i;do{if(c===0){wa&&!i&&lr(e,t,0,!1);break}else{if(r=e.current.alternate,d&&!NS(r)){c=yu(e,t,!1),d=!1;continue}if(c===2){if(d=t,e.errorRecoveryDisabledLanes&d)var y=0;else y=e.pendingLanes&-536870913,y=y!==0?y:y&536870912?536870912:0;if(y!==0){t=y;e:{var w=e;c=Ai;var M=w.current.memoizedState.isDehydrated;if(M&&(Ta(w,y).flags|=256),y=yu(w,y,!1),y!==2){if(uu&&!M){w.errorRecoveryDisabledLanes|=d,Ur|=d,c=4;break e}d=Nt,Nt=c,d!==null&&(Nt===null?Nt=d:Nt.push.apply(Nt,d))}c=y}if(d=!1,c!==2)continue}}if(c===1){Ta(e,0),lr(e,t,0,!0);break}e:{switch(i=e,d=c,d){case 0:case 1:throw Error(l(345));case 4:if((t&4194048)!==t)break;case 6:lr(i,t,Bt,!rr);break e;case 2:Nt=null;break;case 3:case 5:break;default:throw Error(l(329))}if((t&62914560)===t&&(c=al+300-At(),10<c)){if(lr(i,t,Bt,!rr),gs(i,0,!0)!==0)break e;Un=t,i.timeoutHandle=Cg(Qp.bind(null,i,r,Nt,sl,fu,t,Bt,Ur,ja,rr,d,"Throttled",-0,0),c);break e}Qp(i,r,Nt,sl,fu,t,Bt,Ur,ja,rr,d,null,-0,0)}}break}while(!0);mn(e)}function Qp(e,t,r,i,c,d,y,w,M,G,Q,te,F,K){if(e.timeoutHandle=-1,te=t.subtreeFlags,te&8192||(te&16785408)===16785408){te={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:En},Yp(t,d,te);var fe=(d&62914560)===d?al-At():(d&4194048)===d?Fp-At():0;if(fe=dw(te,fe),fe!==null){Un=d,e.cancelPendingCommit=fe(ag.bind(null,e,t,d,r,i,c,y,w,M,Q,te,null,F,K)),lr(e,d,y,!G);return}}ag(e,t,d,r,i,c,y,w,M)}function NS(e){for(var t=e;;){var r=t.tag;if((r===0||r===11||r===15)&&t.flags&16384&&(r=t.updateQueue,r!==null&&(r=r.stores,r!==null)))for(var i=0;i<r.length;i++){var c=r[i],d=c.getSnapshot;c=c.value;try{if(!Rt(d(),c))return!1}catch{return!1}}if(r=t.child,t.subtreeFlags&16384&&r!==null)r.return=t,t=r;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function lr(e,t,r,i){t&=~du,t&=~Ur,e.suspendedLanes|=t,e.pingedLanes&=~t,i&&(e.warmLanes|=t),i=e.expirationTimes;for(var c=t;0<c;){var d=31-kt(c),y=1<<d;i[d]=-1,c&=~y}r!==0&&sh(e,r,t)}function ll(){return(Re&6)===0?(ki(0),!1):!0}function gu(){if(Ee!==null){if(ze===0)var e=Ee.return;else e=Ee,Dn=Mr=null,Rc(e),pa=null,hi=0,e=Ee;for(;e!==null;)Np(e.alternate,e),e=e.return;Ee=null}}function Ta(e,t){var r=e.timeoutHandle;r!==-1&&(e.timeoutHandle=-1,$S(r)),r=e.cancelPendingCommit,r!==null&&(e.cancelPendingCommit=null,r()),Un=0,gu(),Ue=e,Ee=r=Cn(e.current,null),Ne=t,ze=0,Vt=null,rr=!1,wa=Qa(e,t),uu=!1,ja=Bt=du=Ur=ar=Ke=0,Nt=Ai=null,fu=!1,(t&8)!==0&&(t|=t&32);var i=e.entangledLanes;if(i!==0)for(e=e.entanglements,i&=t;0<i;){var c=31-kt(i),d=1<<c;t|=e[c],i&=~d}return Ln=t,Ds(),r}function Jp(e,t){we=null,U.H=Si,t===ma||t===Vs?(t=hm(),ze=3):t===bc?(t=hm(),ze=4):ze=t===Kc?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,Vt=t,Ee===null&&(Ke=1,Qs(e,Xt(t,e.current)))}function Wp(){var e=zt.current;return e===null?!0:(Ne&4194048)===Ne?Zt===null:(Ne&62914560)===Ne||(Ne&536870912)!==0?e===Zt:!1}function Ip(){var e=U.H;return U.H=Si,e===null?Si:e}function eg(){var e=U.A;return U.A=TS,e}function ol(){Ke=4,rr||(Ne&4194048)!==Ne&&zt.current!==null||(wa=!0),(ar&134217727)===0&&(Ur&134217727)===0||Ue===null||lr(Ue,Ne,Bt,!1)}function yu(e,t,r){var i=Re;Re|=2;var c=Ip(),d=eg();(Ue!==e||Ne!==t)&&(sl=null,Ta(e,t)),t=!1;var y=Ke;e:do try{if(ze!==0&&Ee!==null){var w=Ee,M=Vt;switch(ze){case 8:gu(),y=6;break e;case 3:case 2:case 9:case 6:zt.current===null&&(t=!0);var G=ze;if(ze=0,Vt=null,Ca(e,w,M,G),r&&wa){y=0;break e}break;default:G=ze,ze=0,Vt=null,Ca(e,w,M,G)}}DS(),y=Ke;break}catch(Q){Jp(e,Q)}while(!0);return t&&e.shellSuspendCounter++,Dn=Mr=null,Re=i,U.H=c,U.A=d,Ee===null&&(Ue=null,Ne=0,Ds()),y}function DS(){for(;Ee!==null;)tg(Ee)}function AS(e,t){var r=Re;Re|=2;var i=Ip(),c=eg();Ue!==e||Ne!==t?(sl=null,il=At()+500,Ta(e,t)):wa=Qa(e,t);e:do try{if(ze!==0&&Ee!==null){t=Ee;var d=Vt;t:switch(ze){case 1:ze=0,Vt=null,Ca(e,t,d,1);break;case 2:case 9:if(dm(d)){ze=0,Vt=null,ng(t);break}t=function(){ze!==2&&ze!==9||Ue!==e||(ze=7),mn(e)},d.then(t,t);break e;case 3:ze=7;break e;case 4:ze=5;break e;case 7:dm(d)?(ze=0,Vt=null,ng(t)):(ze=0,Vt=null,Ca(e,t,d,7));break;case 5:var y=null;switch(Ee.tag){case 26:y=Ee.memoizedState;case 5:case 27:var w=Ee;if(y?qg(y):w.stateNode.complete){ze=0,Vt=null;var M=w.sibling;if(M!==null)Ee=M;else{var G=w.return;G!==null?(Ee=G,cl(G)):Ee=null}break t}}ze=0,Vt=null,Ca(e,t,d,5);break;case 6:ze=0,Vt=null,Ca(e,t,d,6);break;case 8:gu(),Ke=6;break e;default:throw Error(l(462))}}MS();break}catch(Q){Jp(e,Q)}while(!0);return Dn=Mr=null,U.H=i,U.A=c,Re=r,Ee!==null?0:(Ue=null,Ne=0,Ds(),Ke)}function MS(){for(;Ee!==null&&!I0();)tg(Ee)}function tg(e){var t=Tp(e.alternate,e,Ln);e.memoizedProps=e.pendingProps,t===null?cl(e):Ee=t}function ng(e){var t=e,r=t.alternate;switch(t.tag){case 15:case 0:t=xp(r,t,t.pendingProps,t.type,void 0,Ne);break;case 11:t=xp(r,t,t.pendingProps,t.type.render,t.ref,Ne);break;case 5:Rc(t);default:Np(r,t),t=Ee=em(t,Ln),t=Tp(r,t,Ln)}e.memoizedProps=e.pendingProps,t===null?cl(e):Ee=t}function Ca(e,t,r,i){Dn=Mr=null,Rc(t),pa=null,hi=0;var c=t.return;try{if(vS(e,c,t,r,Ne)){Ke=1,Qs(e,Xt(r,e.current)),Ee=null;return}}catch(d){if(c!==null)throw Ee=c,d;Ke=1,Qs(e,Xt(r,e.current)),Ee=null;return}t.flags&32768?(Ae||i===1?e=!0:wa||(Ne&536870912)!==0?e=!1:(rr=e=!0,(i===2||i===9||i===3||i===6)&&(i=zt.current,i!==null&&i.tag===13&&(i.flags|=16384))),rg(t,e)):cl(t)}function cl(e){var t=e;do{if((t.flags&32768)!==0){rg(t,rr);return}e=t.return;var r=SS(t.alternate,t,Ln);if(r!==null){Ee=r;return}if(t=t.sibling,t!==null){Ee=t;return}Ee=t=e}while(t!==null);Ke===0&&(Ke=5)}function rg(e,t){do{var r=wS(e.alternate,e);if(r!==null){r.flags&=32767,Ee=r;return}if(r=e.return,r!==null&&(r.flags|=32768,r.subtreeFlags=0,r.deletions=null),!t&&(e=e.sibling,e!==null)){Ee=e;return}Ee=e=r}while(e!==null);Ke=6,Ee=null}function ag(e,t,r,i,c,d,y,w,M){e.cancelPendingCommit=null;do ul();while(at!==0);if((Re&6)!==0)throw Error(l(327));if(t!==null){if(t===e.current)throw Error(l(177));if(d=t.lanes|t.childLanes,d|=ic,c1(e,r,d,y,w,M),e===Ue&&(Ee=Ue=null,Ne=0),Ea=t,sr=e,Un=r,hu=d,mu=c,$p=i,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,zS(fs,function(){return cg(),null})):(e.callbackNode=null,e.callbackPriority=0),i=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||i){i=U.T,U.T=null,c=ae.p,ae.p=2,y=Re,Re|=4;try{jS(e,t,r)}finally{Re=y,ae.p=c,U.T=i}}at=1,ig(),sg(),lg()}}function ig(){if(at===1){at=0;var e=sr,t=Ea,r=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||r){r=U.T,U.T=null;var i=ae.p;ae.p=2;var c=Re;Re|=4;try{Up(t,e);var d=Au,y=Xh(e.containerInfo),w=d.focusedElem,M=d.selectionRange;if(y!==w&&w&&w.ownerDocument&&Gh(w.ownerDocument.documentElement,w)){if(M!==null&&ec(w)){var G=M.start,Q=M.end;if(Q===void 0&&(Q=G),"selectionStart"in w)w.selectionStart=G,w.selectionEnd=Math.min(Q,w.value.length);else{var te=w.ownerDocument||document,F=te&&te.defaultView||window;if(F.getSelection){var K=F.getSelection(),fe=w.textContent.length,be=Math.min(M.start,fe),Le=M.end===void 0?be:Math.min(M.end,fe);!K.extend&&be>Le&&(y=Le,Le=be,be=y);var q=Ph(w,be),_=Ph(w,Le);if(q&&_&&(K.rangeCount!==1||K.anchorNode!==q.node||K.anchorOffset!==q.offset||K.focusNode!==_.node||K.focusOffset!==_.offset)){var P=te.createRange();P.setStart(q.node,q.offset),K.removeAllRanges(),be>Le?(K.addRange(P),K.extend(_.node,_.offset)):(P.setEnd(_.node,_.offset),K.addRange(P))}}}}for(te=[],K=w;K=K.parentNode;)K.nodeType===1&&te.push({element:K,left:K.scrollLeft,top:K.scrollTop});for(typeof w.focus=="function"&&w.focus(),w=0;w<te.length;w++){var I=te[w];I.element.scrollLeft=I.left,I.element.scrollTop=I.top}}wl=!!Du,Au=Du=null}finally{Re=c,ae.p=i,U.T=r}}e.current=t,at=2}}function sg(){if(at===2){at=0;var e=sr,t=Ea,r=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||r){r=U.T,U.T=null;var i=ae.p;ae.p=2;var c=Re;Re|=4;try{zp(e,t.alternate,t)}finally{Re=c,ae.p=i,U.T=r}}at=3}}function lg(){if(at===4||at===3){at=0,e1();var e=sr,t=Ea,r=Un,i=$p;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?at=5:(at=0,Ea=sr=null,og(e,e.pendingLanes));var c=e.pendingLanes;if(c===0&&(ir=null),_o(r),t=t.stateNode,Mt&&typeof Mt.onCommitFiberRoot=="function")try{Mt.onCommitFiberRoot(Za,t,void 0,(t.current.flags&128)===128)}catch{}if(i!==null){t=U.T,c=ae.p,ae.p=2,U.T=null;try{for(var d=e.onRecoverableError,y=0;y<i.length;y++){var w=i[y];d(w.value,{componentStack:w.stack})}}finally{U.T=t,ae.p=c}}(Un&3)!==0&&ul(),mn(e),c=e.pendingLanes,(r&261930)!==0&&(c&42)!==0?e===pu?Mi++:(Mi=0,pu=e):Mi=0,ki(0)}}function og(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,di(t)))}function ul(){return ig(),sg(),lg(),cg()}function cg(){if(at!==5)return!1;var e=sr,t=hu;hu=0;var r=_o(Un),i=U.T,c=ae.p;try{ae.p=32>r?32:r,U.T=null,r=mu,mu=null;var d=sr,y=Un;if(at=0,Ea=sr=null,Un=0,(Re&6)!==0)throw Error(l(331));var w=Re;if(Re|=4,Gp(d.current),qp(d,d.current,y,r),Re=w,ki(0,!1),Mt&&typeof Mt.onPostCommitFiberRoot=="function")try{Mt.onPostCommitFiberRoot(Za,d)}catch{}return!0}finally{ae.p=c,U.T=i,og(e,t)}}function ug(e,t,r){t=Xt(r,t),t=$c(e.stateNode,t,2),e=In(e,t,2),e!==null&&(Ja(e,2),mn(e))}function _e(e,t,r){if(e.tag===3)ug(e,e,r);else for(;t!==null;){if(t.tag===3){ug(t,e,r);break}else if(t.tag===1){var i=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(ir===null||!ir.has(i))){e=Xt(r,e),r=dp(2),i=In(t,r,2),i!==null&&(fp(r,i,t,e),Ja(i,2),mn(i));break}}t=t.return}}function vu(e,t,r){var i=e.pingCache;if(i===null){i=e.pingCache=new CS;var c=new Set;i.set(t,c)}else c=i.get(t),c===void 0&&(c=new Set,i.set(t,c));c.has(r)||(uu=!0,c.add(r),e=kS.bind(null,e,t,r),t.then(e,e))}function kS(e,t,r){var i=e.pingCache;i!==null&&i.delete(t),e.pingedLanes|=e.suspendedLanes&r,e.warmLanes&=~r,Ue===e&&(Ne&r)===r&&(Ke===4||Ke===3&&(Ne&62914560)===Ne&&300>At()-al?(Re&2)===0&&Ta(e,0):du|=r,ja===Ne&&(ja=0)),mn(e)}function dg(e,t){t===0&&(t=ih()),e=Nr(e,t),e!==null&&(Ja(e,t),mn(e))}function RS(e){var t=e.memoizedState,r=0;t!==null&&(r=t.retryLane),dg(e,r)}function OS(e,t){var r=0;switch(e.tag){case 31:case 13:var i=e.stateNode,c=e.memoizedState;c!==null&&(r=c.retryLane);break;case 19:i=e.stateNode;break;case 22:i=e.stateNode._retryCache;break;default:throw Error(l(314))}i!==null&&i.delete(t),dg(e,r)}function zS(e,t){return ko(e,t)}var dl=null,Na=null,xu=!1,fl=!1,bu=!1,or=0;function mn(e){e!==Na&&e.next===null&&(Na===null?dl=Na=e:Na=Na.next=e),fl=!0,xu||(xu=!0,VS())}function ki(e,t){if(!bu&&fl){bu=!0;do for(var r=!1,i=dl;i!==null;){if(e!==0){var c=i.pendingLanes;if(c===0)var d=0;else{var y=i.suspendedLanes,w=i.pingedLanes;d=(1<<31-kt(42|e)+1)-1,d&=c&~(y&~w),d=d&201326741?d&201326741|1:d?d|2:0}d!==0&&(r=!0,pg(i,d))}else d=Ne,d=gs(i,i===Ue?d:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),(d&3)===0||Qa(i,d)||(r=!0,pg(i,d));i=i.next}while(r);bu=!1}}function _S(){fg()}function fg(){fl=xu=!1;var e=0;or!==0&&FS()&&(e=or);for(var t=At(),r=null,i=dl;i!==null;){var c=i.next,d=hg(i,t);d===0?(i.next=null,r===null?dl=c:r.next=c,c===null&&(Na=r)):(r=i,(e!==0||(d&3)!==0)&&(fl=!0)),i=c}at!==0&&at!==5||ki(e),or!==0&&(or=0)}function hg(e,t){for(var r=e.suspendedLanes,i=e.pingedLanes,c=e.expirationTimes,d=e.pendingLanes&-62914561;0<d;){var y=31-kt(d),w=1<<y,M=c[y];M===-1?((w&r)===0||(w&i)!==0)&&(c[y]=o1(w,t)):M<=t&&(e.expiredLanes|=w),d&=~w}if(t=Ue,r=Ne,r=gs(e,e===t?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i=e.callbackNode,r===0||e===t&&(ze===2||ze===9)||e.cancelPendingCommit!==null)return i!==null&&i!==null&&Ro(i),e.callbackNode=null,e.callbackPriority=0;if((r&3)===0||Qa(e,r)){if(t=r&-r,t===e.callbackPriority)return t;switch(i!==null&&Ro(i),_o(r)){case 2:case 8:r=rh;break;case 32:r=fs;break;case 268435456:r=ah;break;default:r=fs}return i=mg.bind(null,e),r=ko(r,i),e.callbackPriority=t,e.callbackNode=r,t}return i!==null&&i!==null&&Ro(i),e.callbackPriority=2,e.callbackNode=null,2}function mg(e,t){if(at!==0&&at!==5)return e.callbackNode=null,e.callbackPriority=0,null;var r=e.callbackNode;if(ul()&&e.callbackNode!==r)return null;var i=Ne;return i=gs(e,e===Ue?i:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i===0?null:(Zp(e,i,t),hg(e,At()),e.callbackNode!=null&&e.callbackNode===r?mg.bind(null,e):null)}function pg(e,t){if(ul())return null;Zp(e,t,!0)}function VS(){KS(function(){(Re&6)!==0?ko(nh,_S):fg()})}function Su(){if(or===0){var e=fa;e===0&&(e=hs,hs<<=1,(hs&261888)===0&&(hs=256)),or=e}return or}function gg(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:bs(""+e)}function yg(e,t){var r=t.ownerDocument.createElement("input");return r.name=t.name,r.value=t.value,e.id&&r.setAttribute("form",e.id),t.parentNode.insertBefore(r,t),e=new FormData(e),r.parentNode.removeChild(r),e}function BS(e,t,r,i,c){if(t==="submit"&&r&&r.stateNode===c){var d=gg((c[wt]||null).action),y=i.submitter;y&&(t=(t=y[wt]||null)?gg(t.formAction):y.getAttribute("formAction"),t!==null&&(d=t,y=null));var w=new Es("action","action",null,i,c);e.push({event:w,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(or!==0){var M=y?yg(c,y):new FormData(c);qc(r,{pending:!0,data:M,method:c.method,action:d},null,M)}}else typeof d=="function"&&(w.preventDefault(),M=y?yg(c,y):new FormData(c),qc(r,{pending:!0,data:M,method:c.method,action:d},d,M))},currentTarget:c}]})}}for(var wu=0;wu<ac.length;wu++){var ju=ac[wu],LS=ju.toLowerCase(),US=ju[0].toUpperCase()+ju.slice(1);rn(LS,"on"+US)}rn(Kh,"onAnimationEnd"),rn(Zh,"onAnimationIteration"),rn(Qh,"onAnimationStart"),rn("dblclick","onDoubleClick"),rn("focusin","onFocus"),rn("focusout","onBlur"),rn(tS,"onTransitionRun"),rn(nS,"onTransitionStart"),rn(rS,"onTransitionCancel"),rn(Jh,"onTransitionEnd"),Wr("onMouseEnter",["mouseout","mouseover"]),Wr("onMouseLeave",["mouseout","mouseover"]),Wr("onPointerEnter",["pointerout","pointerover"]),Wr("onPointerLeave",["pointerout","pointerover"]),jr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),jr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),jr("onBeforeInput",["compositionend","keypress","textInput","paste"]),jr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),jr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),jr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ri="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),HS=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ri));function vg(e,t){t=(t&4)!==0;for(var r=0;r<e.length;r++){var i=e[r],c=i.event;i=i.listeners;e:{var d=void 0;if(t)for(var y=i.length-1;0<=y;y--){var w=i[y],M=w.instance,G=w.currentTarget;if(w=w.listener,M!==d&&c.isPropagationStopped())break e;d=w,c.currentTarget=G;try{d(c)}catch(Q){Ns(Q)}c.currentTarget=null,d=M}else for(y=0;y<i.length;y++){if(w=i[y],M=w.instance,G=w.currentTarget,w=w.listener,M!==d&&c.isPropagationStopped())break e;d=w,c.currentTarget=G;try{d(c)}catch(Q){Ns(Q)}c.currentTarget=null,d=M}}}}function Te(e,t){var r=t[Vo];r===void 0&&(r=t[Vo]=new Set);var i=e+"__bubble";r.has(i)||(xg(t,e,2,!1),r.add(i))}function Eu(e,t,r){var i=0;t&&(i|=4),xg(r,e,i,t)}var hl="_reactListening"+Math.random().toString(36).slice(2);function Tu(e){if(!e[hl]){e[hl]=!0,fh.forEach(function(r){r!=="selectionchange"&&(HS.has(r)||Eu(r,!1,e),Eu(r,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[hl]||(t[hl]=!0,Eu("selectionchange",!1,t))}}function xg(e,t,r,i){switch(Kg(t)){case 2:var c=mw;break;case 8:c=pw;break;default:c=Hu}r=c.bind(null,t,r,e),c=void 0,!Xo||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(c=!0),i?c!==void 0?e.addEventListener(t,r,{capture:!0,passive:c}):e.addEventListener(t,r,!0):c!==void 0?e.addEventListener(t,r,{passive:c}):e.addEventListener(t,r,!1)}function Cu(e,t,r,i,c){var d=i;if((t&1)===0&&(t&2)===0&&i!==null)e:for(;;){if(i===null)return;var y=i.tag;if(y===3||y===4){var w=i.stateNode.containerInfo;if(w===c)break;if(y===4)for(y=i.return;y!==null;){var M=y.tag;if((M===3||M===4)&&y.stateNode.containerInfo===c)return;y=y.return}for(;w!==null;){if(y=Zr(w),y===null)return;if(M=y.tag,M===5||M===6||M===26||M===27){i=d=y;continue e}w=w.parentNode}}i=i.return}Eh(function(){var G=d,Q=Po(r),te=[];e:{var F=Wh.get(e);if(F!==void 0){var K=Es,fe=e;switch(e){case"keypress":if(ws(r)===0)break e;case"keydown":case"keyup":K=O1;break;case"focusin":fe="focus",K=Zo;break;case"focusout":fe="blur",K=Zo;break;case"beforeblur":case"afterblur":K=Zo;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":K=Nh;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":K=S1;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":K=V1;break;case Kh:case Zh:case Qh:K=E1;break;case Jh:K=L1;break;case"scroll":case"scrollend":K=x1;break;case"wheel":K=H1;break;case"copy":case"cut":case"paste":K=C1;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":K=Ah;break;case"toggle":case"beforetoggle":K=Y1}var be=(t&4)!==0,Le=!be&&(e==="scroll"||e==="scrollend"),q=be?F!==null?F+"Capture":null:F;be=[];for(var _=G,P;_!==null;){var I=_;if(P=I.stateNode,I=I.tag,I!==5&&I!==26&&I!==27||P===null||q===null||(I=ei(_,q),I!=null&&be.push(Oi(_,I,P))),Le)break;_=_.return}0<be.length&&(F=new K(F,fe,null,r,Q),te.push({event:F,listeners:be}))}}if((t&7)===0){e:{if(F=e==="mouseover"||e==="pointerover",K=e==="mouseout"||e==="pointerout",F&&r!==Yo&&(fe=r.relatedTarget||r.fromElement)&&(Zr(fe)||fe[Kr]))break e;if((K||F)&&(F=Q.window===Q?Q:(F=Q.ownerDocument)?F.defaultView||F.parentWindow:window,K?(fe=r.relatedTarget||r.toElement,K=G,fe=fe?Zr(fe):null,fe!==null&&(Le=h(fe),be=fe.tag,fe!==Le||be!==5&&be!==27&&be!==6)&&(fe=null)):(K=null,fe=G),K!==fe)){if(be=Nh,I="onMouseLeave",q="onMouseEnter",_="mouse",(e==="pointerout"||e==="pointerover")&&(be=Ah,I="onPointerLeave",q="onPointerEnter",_="pointer"),Le=K==null?F:Ia(K),P=fe==null?F:Ia(fe),F=new be(I,_+"leave",K,r,Q),F.target=Le,F.relatedTarget=P,I=null,Zr(Q)===G&&(be=new be(q,_+"enter",fe,r,Q),be.target=P,be.relatedTarget=Le,I=be),Le=I,K&&fe)t:{for(be=qS,q=K,_=fe,P=0,I=q;I;I=be(I))P++;I=0;for(var ve=_;ve;ve=be(ve))I++;for(;0<P-I;)q=be(q),P--;for(;0<I-P;)_=be(_),I--;for(;P--;){if(q===_||_!==null&&q===_.alternate){be=q;break t}q=be(q),_=be(_)}be=null}else be=null;K!==null&&bg(te,F,K,be,!1),fe!==null&&Le!==null&&bg(te,Le,fe,be,!0)}}e:{if(F=G?Ia(G):window,K=F.nodeName&&F.nodeName.toLowerCase(),K==="select"||K==="input"&&F.type==="file")var Me=Bh;else if(_h(F))if(Lh)Me=W1;else{Me=Q1;var ge=Z1}else K=F.nodeName,!K||K.toLowerCase()!=="input"||F.type!=="checkbox"&&F.type!=="radio"?G&&qo(G.elementType)&&(Me=Bh):Me=J1;if(Me&&(Me=Me(e,G))){Vh(te,Me,r,Q);break e}ge&&ge(e,F,G),e==="focusout"&&G&&F.type==="number"&&G.memoizedProps.value!=null&&Ho(F,"number",F.value)}switch(ge=G?Ia(G):window,e){case"focusin":(_h(ge)||ge.contentEditable==="true")&&(aa=ge,tc=G,oi=null);break;case"focusout":oi=tc=aa=null;break;case"mousedown":nc=!0;break;case"contextmenu":case"mouseup":case"dragend":nc=!1,Fh(te,r,Q);break;case"selectionchange":if(eS)break;case"keydown":case"keyup":Fh(te,r,Q)}var je;if(Jo)e:{switch(e){case"compositionstart":var De="onCompositionStart";break e;case"compositionend":De="onCompositionEnd";break e;case"compositionupdate":De="onCompositionUpdate";break e}De=void 0}else ra?Oh(e,r)&&(De="onCompositionEnd"):e==="keydown"&&r.keyCode===229&&(De="onCompositionStart");De&&(Mh&&r.locale!=="ko"&&(ra||De!=="onCompositionStart"?De==="onCompositionEnd"&&ra&&(je=Th()):(Fn=Q,Fo="value"in Fn?Fn.value:Fn.textContent,ra=!0)),ge=ml(G,De),0<ge.length&&(De=new Dh(De,e,null,r,Q),te.push({event:De,listeners:ge}),je?De.data=je:(je=zh(r),je!==null&&(De.data=je)))),(je=G1?X1(e,r):F1(e,r))&&(De=ml(G,"onBeforeInput"),0<De.length&&(ge=new Dh("onBeforeInput","beforeinput",null,r,Q),te.push({event:ge,listeners:De}),ge.data=je)),BS(te,e,G,r,Q)}vg(te,t)})}function Oi(e,t,r){return{instance:e,listener:t,currentTarget:r}}function ml(e,t){for(var r=t+"Capture",i=[];e!==null;){var c=e,d=c.stateNode;if(c=c.tag,c!==5&&c!==26&&c!==27||d===null||(c=ei(e,r),c!=null&&i.unshift(Oi(e,c,d)),c=ei(e,t),c!=null&&i.push(Oi(e,c,d))),e.tag===3)return i;e=e.return}return[]}function qS(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function bg(e,t,r,i,c){for(var d=t._reactName,y=[];r!==null&&r!==i;){var w=r,M=w.alternate,G=w.stateNode;if(w=w.tag,M!==null&&M===i)break;w!==5&&w!==26&&w!==27||G===null||(M=G,c?(G=ei(r,d),G!=null&&y.unshift(Oi(r,G,M))):c||(G=ei(r,d),G!=null&&y.push(Oi(r,G,M)))),r=r.return}y.length!==0&&e.push({event:t,listeners:y})}var YS=/\r\n?/g,PS=/\u0000|\uFFFD/g;function Sg(e){return(typeof e=="string"?e:""+e).replace(YS,`
`).replace(PS,"")}function wg(e,t){return t=Sg(t),Sg(e)===t}function Be(e,t,r,i,c,d){switch(r){case"children":typeof i=="string"?t==="body"||t==="textarea"&&i===""||ea(e,i):(typeof i=="number"||typeof i=="bigint")&&t!=="body"&&ea(e,""+i);break;case"className":vs(e,"class",i);break;case"tabIndex":vs(e,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":vs(e,r,i);break;case"style":wh(e,i,d);break;case"data":if(t!=="object"){vs(e,"data",i);break}case"src":case"href":if(i===""&&(t!=="a"||r!=="href")){e.removeAttribute(r);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(r);break}i=bs(""+i),e.setAttribute(r,i);break;case"action":case"formAction":if(typeof i=="function"){e.setAttribute(r,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof d=="function"&&(r==="formAction"?(t!=="input"&&Be(e,t,"name",c.name,c,null),Be(e,t,"formEncType",c.formEncType,c,null),Be(e,t,"formMethod",c.formMethod,c,null),Be(e,t,"formTarget",c.formTarget,c,null)):(Be(e,t,"encType",c.encType,c,null),Be(e,t,"method",c.method,c,null),Be(e,t,"target",c.target,c,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(r);break}i=bs(""+i),e.setAttribute(r,i);break;case"onClick":i!=null&&(e.onclick=En);break;case"onScroll":i!=null&&Te("scroll",e);break;case"onScrollEnd":i!=null&&Te("scrollend",e);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(l(61));if(r=i.__html,r!=null){if(c.children!=null)throw Error(l(60));e.innerHTML=r}}break;case"multiple":e.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":e.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){e.removeAttribute("xlink:href");break}r=bs(""+i),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",r);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(r,""+i):e.removeAttribute(r);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(r,""):e.removeAttribute(r);break;case"capture":case"download":i===!0?e.setAttribute(r,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(r,i):e.removeAttribute(r);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?e.setAttribute(r,i):e.removeAttribute(r);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?e.removeAttribute(r):e.setAttribute(r,i);break;case"popover":Te("beforetoggle",e),Te("toggle",e),ys(e,"popover",i);break;case"xlinkActuate":jn(e,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":jn(e,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":jn(e,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":jn(e,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":jn(e,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":jn(e,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":jn(e,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":jn(e,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":jn(e,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":ys(e,"is",i);break;case"innerText":case"textContent":break;default:(!(2<r.length)||r[0]!=="o"&&r[0]!=="O"||r[1]!=="n"&&r[1]!=="N")&&(r=y1.get(r)||r,ys(e,r,i))}}function Nu(e,t,r,i,c,d){switch(r){case"style":wh(e,i,d);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(l(61));if(r=i.__html,r!=null){if(c.children!=null)throw Error(l(60));e.innerHTML=r}}break;case"children":typeof i=="string"?ea(e,i):(typeof i=="number"||typeof i=="bigint")&&ea(e,""+i);break;case"onScroll":i!=null&&Te("scroll",e);break;case"onScrollEnd":i!=null&&Te("scrollend",e);break;case"onClick":i!=null&&(e.onclick=En);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!hh.hasOwnProperty(r))e:{if(r[0]==="o"&&r[1]==="n"&&(c=r.endsWith("Capture"),t=r.slice(2,c?r.length-7:void 0),d=e[wt]||null,d=d!=null?d[r]:null,typeof d=="function"&&e.removeEventListener(t,d,c),typeof i=="function")){typeof d!="function"&&d!==null&&(r in e?e[r]=null:e.hasAttribute(r)&&e.removeAttribute(r)),e.addEventListener(t,i,c);break e}r in e?e[r]=i:i===!0?e.setAttribute(r,""):ys(e,r,i)}}}function ht(e,t,r){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Te("error",e),Te("load",e);var i=!1,c=!1,d;for(d in r)if(r.hasOwnProperty(d)){var y=r[d];if(y!=null)switch(d){case"src":i=!0;break;case"srcSet":c=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(l(137,t));default:Be(e,t,d,y,r,null)}}c&&Be(e,t,"srcSet",r.srcSet,r,null),i&&Be(e,t,"src",r.src,r,null);return;case"input":Te("invalid",e);var w=d=y=c=null,M=null,G=null;for(i in r)if(r.hasOwnProperty(i)){var Q=r[i];if(Q!=null)switch(i){case"name":c=Q;break;case"type":y=Q;break;case"checked":M=Q;break;case"defaultChecked":G=Q;break;case"value":d=Q;break;case"defaultValue":w=Q;break;case"children":case"dangerouslySetInnerHTML":if(Q!=null)throw Error(l(137,t));break;default:Be(e,t,i,Q,r,null)}}vh(e,d,w,M,G,y,c,!1);return;case"select":Te("invalid",e),i=y=d=null;for(c in r)if(r.hasOwnProperty(c)&&(w=r[c],w!=null))switch(c){case"value":d=w;break;case"defaultValue":y=w;break;case"multiple":i=w;default:Be(e,t,c,w,r,null)}t=d,r=y,e.multiple=!!i,t!=null?Ir(e,!!i,t,!1):r!=null&&Ir(e,!!i,r,!0);return;case"textarea":Te("invalid",e),d=c=i=null;for(y in r)if(r.hasOwnProperty(y)&&(w=r[y],w!=null))switch(y){case"value":i=w;break;case"defaultValue":c=w;break;case"children":d=w;break;case"dangerouslySetInnerHTML":if(w!=null)throw Error(l(91));break;default:Be(e,t,y,w,r,null)}bh(e,i,c,d);return;case"option":for(M in r)if(r.hasOwnProperty(M)&&(i=r[M],i!=null))switch(M){case"selected":e.selected=i&&typeof i!="function"&&typeof i!="symbol";break;default:Be(e,t,M,i,r,null)}return;case"dialog":Te("beforetoggle",e),Te("toggle",e),Te("cancel",e),Te("close",e);break;case"iframe":case"object":Te("load",e);break;case"video":case"audio":for(i=0;i<Ri.length;i++)Te(Ri[i],e);break;case"image":Te("error",e),Te("load",e);break;case"details":Te("toggle",e);break;case"embed":case"source":case"link":Te("error",e),Te("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(G in r)if(r.hasOwnProperty(G)&&(i=r[G],i!=null))switch(G){case"children":case"dangerouslySetInnerHTML":throw Error(l(137,t));default:Be(e,t,G,i,r,null)}return;default:if(qo(t)){for(Q in r)r.hasOwnProperty(Q)&&(i=r[Q],i!==void 0&&Nu(e,t,Q,i,r,void 0));return}}for(w in r)r.hasOwnProperty(w)&&(i=r[w],i!=null&&Be(e,t,w,i,r,null))}function GS(e,t,r,i){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var c=null,d=null,y=null,w=null,M=null,G=null,Q=null;for(K in r){var te=r[K];if(r.hasOwnProperty(K)&&te!=null)switch(K){case"checked":break;case"value":break;case"defaultValue":M=te;default:i.hasOwnProperty(K)||Be(e,t,K,null,i,te)}}for(var F in i){var K=i[F];if(te=r[F],i.hasOwnProperty(F)&&(K!=null||te!=null))switch(F){case"type":d=K;break;case"name":c=K;break;case"checked":G=K;break;case"defaultChecked":Q=K;break;case"value":y=K;break;case"defaultValue":w=K;break;case"children":case"dangerouslySetInnerHTML":if(K!=null)throw Error(l(137,t));break;default:K!==te&&Be(e,t,F,K,i,te)}}Uo(e,y,w,M,G,Q,d,c);return;case"select":K=y=w=F=null;for(d in r)if(M=r[d],r.hasOwnProperty(d)&&M!=null)switch(d){case"value":break;case"multiple":K=M;default:i.hasOwnProperty(d)||Be(e,t,d,null,i,M)}for(c in i)if(d=i[c],M=r[c],i.hasOwnProperty(c)&&(d!=null||M!=null))switch(c){case"value":F=d;break;case"defaultValue":w=d;break;case"multiple":y=d;default:d!==M&&Be(e,t,c,d,i,M)}t=w,r=y,i=K,F!=null?Ir(e,!!r,F,!1):!!i!=!!r&&(t!=null?Ir(e,!!r,t,!0):Ir(e,!!r,r?[]:"",!1));return;case"textarea":K=F=null;for(w in r)if(c=r[w],r.hasOwnProperty(w)&&c!=null&&!i.hasOwnProperty(w))switch(w){case"value":break;case"children":break;default:Be(e,t,w,null,i,c)}for(y in i)if(c=i[y],d=r[y],i.hasOwnProperty(y)&&(c!=null||d!=null))switch(y){case"value":F=c;break;case"defaultValue":K=c;break;case"children":break;case"dangerouslySetInnerHTML":if(c!=null)throw Error(l(91));break;default:c!==d&&Be(e,t,y,c,i,d)}xh(e,F,K);return;case"option":for(var fe in r)if(F=r[fe],r.hasOwnProperty(fe)&&F!=null&&!i.hasOwnProperty(fe))switch(fe){case"selected":e.selected=!1;break;default:Be(e,t,fe,null,i,F)}for(M in i)if(F=i[M],K=r[M],i.hasOwnProperty(M)&&F!==K&&(F!=null||K!=null))switch(M){case"selected":e.selected=F&&typeof F!="function"&&typeof F!="symbol";break;default:Be(e,t,M,F,i,K)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var be in r)F=r[be],r.hasOwnProperty(be)&&F!=null&&!i.hasOwnProperty(be)&&Be(e,t,be,null,i,F);for(G in i)if(F=i[G],K=r[G],i.hasOwnProperty(G)&&F!==K&&(F!=null||K!=null))switch(G){case"children":case"dangerouslySetInnerHTML":if(F!=null)throw Error(l(137,t));break;default:Be(e,t,G,F,i,K)}return;default:if(qo(t)){for(var Le in r)F=r[Le],r.hasOwnProperty(Le)&&F!==void 0&&!i.hasOwnProperty(Le)&&Nu(e,t,Le,void 0,i,F);for(Q in i)F=i[Q],K=r[Q],!i.hasOwnProperty(Q)||F===K||F===void 0&&K===void 0||Nu(e,t,Q,F,i,K);return}}for(var q in r)F=r[q],r.hasOwnProperty(q)&&F!=null&&!i.hasOwnProperty(q)&&Be(e,t,q,null,i,F);for(te in i)F=i[te],K=r[te],!i.hasOwnProperty(te)||F===K||F==null&&K==null||Be(e,t,te,F,i,K)}function jg(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function XS(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,r=performance.getEntriesByType("resource"),i=0;i<r.length;i++){var c=r[i],d=c.transferSize,y=c.initiatorType,w=c.duration;if(d&&w&&jg(y)){for(y=0,w=c.responseEnd,i+=1;i<r.length;i++){var M=r[i],G=M.startTime;if(G>w)break;var Q=M.transferSize,te=M.initiatorType;Q&&jg(te)&&(M=M.responseEnd,y+=Q*(M<w?1:(w-G)/(M-G)))}if(--i,t+=8*(d+y)/(c.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Du=null,Au=null;function pl(e){return e.nodeType===9?e:e.ownerDocument}function Eg(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Tg(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function Mu(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var ku=null;function FS(){var e=window.event;return e&&e.type==="popstate"?e===ku?!1:(ku=e,!0):(ku=null,!1)}var Cg=typeof setTimeout=="function"?setTimeout:void 0,$S=typeof clearTimeout=="function"?clearTimeout:void 0,Ng=typeof Promise=="function"?Promise:void 0,KS=typeof queueMicrotask=="function"?queueMicrotask:typeof Ng<"u"?function(e){return Ng.resolve(null).then(e).catch(ZS)}:Cg;function ZS(e){setTimeout(function(){throw e})}function cr(e){return e==="head"}function Dg(e,t){var r=t,i=0;do{var c=r.nextSibling;if(e.removeChild(r),c&&c.nodeType===8)if(r=c.data,r==="/$"||r==="/&"){if(i===0){e.removeChild(c),ka(t);return}i--}else if(r==="$"||r==="$?"||r==="$~"||r==="$!"||r==="&")i++;else if(r==="html")zi(e.ownerDocument.documentElement);else if(r==="head"){r=e.ownerDocument.head,zi(r);for(var d=r.firstChild;d;){var y=d.nextSibling,w=d.nodeName;d[Wa]||w==="SCRIPT"||w==="STYLE"||w==="LINK"&&d.rel.toLowerCase()==="stylesheet"||r.removeChild(d),d=y}}else r==="body"&&zi(e.ownerDocument.body);r=c}while(r);ka(t)}function Ag(e,t){var r=e;e=0;do{var i=r.nextSibling;if(r.nodeType===1?t?(r._stashedDisplay=r.style.display,r.style.display="none"):(r.style.display=r._stashedDisplay||"",r.getAttribute("style")===""&&r.removeAttribute("style")):r.nodeType===3&&(t?(r._stashedText=r.nodeValue,r.nodeValue=""):r.nodeValue=r._stashedText||""),i&&i.nodeType===8)if(r=i.data,r==="/$"){if(e===0)break;e--}else r!=="$"&&r!=="$?"&&r!=="$~"&&r!=="$!"||e++;r=i}while(r)}function Ru(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var r=t;switch(t=t.nextSibling,r.nodeName){case"HTML":case"HEAD":case"BODY":Ru(r),Bo(r);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(r.rel.toLowerCase()==="stylesheet")continue}e.removeChild(r)}}function QS(e,t,r,i){for(;e.nodeType===1;){var c=r;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!i&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(i){if(!e[Wa])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(d=e.getAttribute("rel"),d==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(d!==c.rel||e.getAttribute("href")!==(c.href==null||c.href===""?null:c.href)||e.getAttribute("crossorigin")!==(c.crossOrigin==null?null:c.crossOrigin)||e.getAttribute("title")!==(c.title==null?null:c.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(d=e.getAttribute("src"),(d!==(c.src==null?null:c.src)||e.getAttribute("type")!==(c.type==null?null:c.type)||e.getAttribute("crossorigin")!==(c.crossOrigin==null?null:c.crossOrigin))&&d&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var d=c.name==null?null:""+c.name;if(c.type==="hidden"&&e.getAttribute("name")===d)return e}else return e;if(e=Qt(e.nextSibling),e===null)break}return null}function JS(e,t,r){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!r||(e=Qt(e.nextSibling),e===null))return null;return e}function Mg(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Qt(e.nextSibling),e===null))return null;return e}function Ou(e){return e.data==="$?"||e.data==="$~"}function zu(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function WS(e,t){var r=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||r.readyState!=="loading")t();else{var i=function(){t(),r.removeEventListener("DOMContentLoaded",i)};r.addEventListener("DOMContentLoaded",i),e._reactRetry=i}}function Qt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var _u=null;function kg(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="/$"||r==="/&"){if(t===0)return Qt(e.nextSibling);t--}else r!=="$"&&r!=="$!"&&r!=="$?"&&r!=="$~"&&r!=="&"||t++}e=e.nextSibling}return null}function Rg(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="$"||r==="$!"||r==="$?"||r==="$~"||r==="&"){if(t===0)return e;t--}else r!=="/$"&&r!=="/&"||t++}e=e.previousSibling}return null}function Og(e,t,r){switch(t=pl(r),e){case"html":if(e=t.documentElement,!e)throw Error(l(452));return e;case"head":if(e=t.head,!e)throw Error(l(453));return e;case"body":if(e=t.body,!e)throw Error(l(454));return e;default:throw Error(l(451))}}function zi(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Bo(e)}var Jt=new Map,zg=new Set;function gl(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Hn=ae.d;ae.d={f:IS,r:ew,D:tw,C:nw,L:rw,m:aw,X:sw,S:iw,M:lw};function IS(){var e=Hn.f(),t=ll();return e||t}function ew(e){var t=Qr(e);t!==null&&t.tag===5&&t.type==="form"?Jm(t):Hn.r(e)}var Da=typeof document>"u"?null:document;function _g(e,t,r){var i=Da;if(i&&typeof t=="string"&&t){var c=Pt(t);c='link[rel="'+e+'"][href="'+c+'"]',typeof r=="string"&&(c+='[crossorigin="'+r+'"]'),zg.has(c)||(zg.add(c),e={rel:e,crossOrigin:r,href:t},i.querySelector(c)===null&&(t=i.createElement("link"),ht(t,"link",e),st(t),i.head.appendChild(t)))}}function tw(e){Hn.D(e),_g("dns-prefetch",e,null)}function nw(e,t){Hn.C(e,t),_g("preconnect",e,t)}function rw(e,t,r){Hn.L(e,t,r);var i=Da;if(i&&e&&t){var c='link[rel="preload"][as="'+Pt(t)+'"]';t==="image"&&r&&r.imageSrcSet?(c+='[imagesrcset="'+Pt(r.imageSrcSet)+'"]',typeof r.imageSizes=="string"&&(c+='[imagesizes="'+Pt(r.imageSizes)+'"]')):c+='[href="'+Pt(e)+'"]';var d=c;switch(t){case"style":d=Aa(e);break;case"script":d=Ma(e)}Jt.has(d)||(e=x({rel:"preload",href:t==="image"&&r&&r.imageSrcSet?void 0:e,as:t},r),Jt.set(d,e),i.querySelector(c)!==null||t==="style"&&i.querySelector(_i(d))||t==="script"&&i.querySelector(Vi(d))||(t=i.createElement("link"),ht(t,"link",e),st(t),i.head.appendChild(t)))}}function aw(e,t){Hn.m(e,t);var r=Da;if(r&&e){var i=t&&typeof t.as=="string"?t.as:"script",c='link[rel="modulepreload"][as="'+Pt(i)+'"][href="'+Pt(e)+'"]',d=c;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":d=Ma(e)}if(!Jt.has(d)&&(e=x({rel:"modulepreload",href:e},t),Jt.set(d,e),r.querySelector(c)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(r.querySelector(Vi(d)))return}i=r.createElement("link"),ht(i,"link",e),st(i),r.head.appendChild(i)}}}function iw(e,t,r){Hn.S(e,t,r);var i=Da;if(i&&e){var c=Jr(i).hoistableStyles,d=Aa(e);t=t||"default";var y=c.get(d);if(!y){var w={loading:0,preload:null};if(y=i.querySelector(_i(d)))w.loading=5;else{e=x({rel:"stylesheet",href:e,"data-precedence":t},r),(r=Jt.get(d))&&Vu(e,r);var M=y=i.createElement("link");st(M),ht(M,"link",e),M._p=new Promise(function(G,Q){M.onload=G,M.onerror=Q}),M.addEventListener("load",function(){w.loading|=1}),M.addEventListener("error",function(){w.loading|=2}),w.loading|=4,yl(y,t,i)}y={type:"stylesheet",instance:y,count:1,state:w},c.set(d,y)}}}function sw(e,t){Hn.X(e,t);var r=Da;if(r&&e){var i=Jr(r).hoistableScripts,c=Ma(e),d=i.get(c);d||(d=r.querySelector(Vi(c)),d||(e=x({src:e,async:!0},t),(t=Jt.get(c))&&Bu(e,t),d=r.createElement("script"),st(d),ht(d,"link",e),r.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},i.set(c,d))}}function lw(e,t){Hn.M(e,t);var r=Da;if(r&&e){var i=Jr(r).hoistableScripts,c=Ma(e),d=i.get(c);d||(d=r.querySelector(Vi(c)),d||(e=x({src:e,async:!0,type:"module"},t),(t=Jt.get(c))&&Bu(e,t),d=r.createElement("script"),st(d),ht(d,"link",e),r.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},i.set(c,d))}}function Vg(e,t,r,i){var c=(c=me.current)?gl(c):null;if(!c)throw Error(l(446));switch(e){case"meta":case"title":return null;case"style":return typeof r.precedence=="string"&&typeof r.href=="string"?(t=Aa(r.href),r=Jr(c).hoistableStyles,i=r.get(t),i||(i={type:"style",instance:null,count:0,state:null},r.set(t,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(r.rel==="stylesheet"&&typeof r.href=="string"&&typeof r.precedence=="string"){e=Aa(r.href);var d=Jr(c).hoistableStyles,y=d.get(e);if(y||(c=c.ownerDocument||c,y={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},d.set(e,y),(d=c.querySelector(_i(e)))&&!d._p&&(y.instance=d,y.state.loading=5),Jt.has(e)||(r={rel:"preload",as:"style",href:r.href,crossOrigin:r.crossOrigin,integrity:r.integrity,media:r.media,hrefLang:r.hrefLang,referrerPolicy:r.referrerPolicy},Jt.set(e,r),d||ow(c,e,r,y.state))),t&&i===null)throw Error(l(528,""));return y}if(t&&i!==null)throw Error(l(529,""));return null;case"script":return t=r.async,r=r.src,typeof r=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Ma(r),r=Jr(c).hoistableScripts,i=r.get(t),i||(i={type:"script",instance:null,count:0,state:null},r.set(t,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(l(444,e))}}function Aa(e){return'href="'+Pt(e)+'"'}function _i(e){return'link[rel="stylesheet"]['+e+"]"}function Bg(e){return x({},e,{"data-precedence":e.precedence,precedence:null})}function ow(e,t,r,i){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?i.loading=1:(t=e.createElement("link"),i.preload=t,t.addEventListener("load",function(){return i.loading|=1}),t.addEventListener("error",function(){return i.loading|=2}),ht(t,"link",r),st(t),e.head.appendChild(t))}function Ma(e){return'[src="'+Pt(e)+'"]'}function Vi(e){return"script[async]"+e}function Lg(e,t,r){if(t.count++,t.instance===null)switch(t.type){case"style":var i=e.querySelector('style[data-href~="'+Pt(r.href)+'"]');if(i)return t.instance=i,st(i),i;var c=x({},r,{"data-href":r.href,"data-precedence":r.precedence,href:null,precedence:null});return i=(e.ownerDocument||e).createElement("style"),st(i),ht(i,"style",c),yl(i,r.precedence,e),t.instance=i;case"stylesheet":c=Aa(r.href);var d=e.querySelector(_i(c));if(d)return t.state.loading|=4,t.instance=d,st(d),d;i=Bg(r),(c=Jt.get(c))&&Vu(i,c),d=(e.ownerDocument||e).createElement("link"),st(d);var y=d;return y._p=new Promise(function(w,M){y.onload=w,y.onerror=M}),ht(d,"link",i),t.state.loading|=4,yl(d,r.precedence,e),t.instance=d;case"script":return d=Ma(r.src),(c=e.querySelector(Vi(d)))?(t.instance=c,st(c),c):(i=r,(c=Jt.get(d))&&(i=x({},r),Bu(i,c)),e=e.ownerDocument||e,c=e.createElement("script"),st(c),ht(c,"link",i),e.head.appendChild(c),t.instance=c);case"void":return null;default:throw Error(l(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(i=t.instance,t.state.loading|=4,yl(i,r.precedence,e));return t.instance}function yl(e,t,r){for(var i=r.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),c=i.length?i[i.length-1]:null,d=c,y=0;y<i.length;y++){var w=i[y];if(w.dataset.precedence===t)d=w;else if(d!==c)break}d?d.parentNode.insertBefore(e,d.nextSibling):(t=r.nodeType===9?r.head:r,t.insertBefore(e,t.firstChild))}function Vu(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function Bu(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var vl=null;function Ug(e,t,r){if(vl===null){var i=new Map,c=vl=new Map;c.set(r,i)}else c=vl,i=c.get(r),i||(i=new Map,c.set(r,i));if(i.has(e))return i;for(i.set(e,null),r=r.getElementsByTagName(e),c=0;c<r.length;c++){var d=r[c];if(!(d[Wa]||d[ct]||e==="link"&&d.getAttribute("rel")==="stylesheet")&&d.namespaceURI!=="http://www.w3.org/2000/svg"){var y=d.getAttribute(t)||"";y=e+y;var w=i.get(y);w?w.push(d):i.set(y,[d])}}return i}function Hg(e,t,r){e=e.ownerDocument||e,e.head.insertBefore(r,t==="title"?e.querySelector("head > title"):null)}function cw(e,t,r){if(r===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function qg(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function uw(e,t,r,i){if(r.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&(r.state.loading&4)===0){if(r.instance===null){var c=Aa(i.href),d=t.querySelector(_i(c));if(d){t=d._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=xl.bind(e),t.then(e,e)),r.state.loading|=4,r.instance=d,st(d);return}d=t.ownerDocument||t,i=Bg(i),(c=Jt.get(c))&&Vu(i,c),d=d.createElement("link"),st(d);var y=d;y._p=new Promise(function(w,M){y.onload=w,y.onerror=M}),ht(d,"link",i),r.instance=d}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(r,t),(t=r.state.preload)&&(r.state.loading&3)===0&&(e.count++,r=xl.bind(e),t.addEventListener("load",r),t.addEventListener("error",r))}}var Lu=0;function dw(e,t){return e.stylesheets&&e.count===0&&Sl(e,e.stylesheets),0<e.count||0<e.imgCount?function(r){var i=setTimeout(function(){if(e.stylesheets&&Sl(e,e.stylesheets),e.unsuspend){var d=e.unsuspend;e.unsuspend=null,d()}},6e4+t);0<e.imgBytes&&Lu===0&&(Lu=62500*XS());var c=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Sl(e,e.stylesheets),e.unsuspend)){var d=e.unsuspend;e.unsuspend=null,d()}},(e.imgBytes>Lu?50:800)+t);return e.unsuspend=r,function(){e.unsuspend=null,clearTimeout(i),clearTimeout(c)}}:null}function xl(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Sl(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var bl=null;function Sl(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,bl=new Map,t.forEach(fw,e),bl=null,xl.call(e))}function fw(e,t){if(!(t.state.loading&4)){var r=bl.get(e);if(r)var i=r.get(null);else{r=new Map,bl.set(e,r);for(var c=e.querySelectorAll("link[data-precedence],style[data-precedence]"),d=0;d<c.length;d++){var y=c[d];(y.nodeName==="LINK"||y.getAttribute("media")!=="not all")&&(r.set(y.dataset.precedence,y),i=y)}i&&r.set(null,i)}c=t.instance,y=c.getAttribute("data-precedence"),d=r.get(y)||i,d===i&&r.set(null,c),r.set(y,c),this.count++,i=xl.bind(this),c.addEventListener("load",i),c.addEventListener("error",i),d?d.parentNode.insertBefore(c,d.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(c,e.firstChild)),t.state.loading|=4}}var Bi={$$typeof:z,Provider:null,Consumer:null,_currentValue:Z,_currentValue2:Z,_threadCount:0};function hw(e,t,r,i,c,d,y,w,M){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Oo(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Oo(0),this.hiddenUpdates=Oo(null),this.identifierPrefix=i,this.onUncaughtError=c,this.onCaughtError=d,this.onRecoverableError=y,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=M,this.incompleteTransitions=new Map}function Yg(e,t,r,i,c,d,y,w,M,G,Q,te){return e=new hw(e,t,r,y,M,G,Q,te,w),t=1,d===!0&&(t|=24),d=Ot(3,null,null,t),e.current=d,d.stateNode=e,t=yc(),t.refCount++,e.pooledCache=t,t.refCount++,d.memoizedState={element:i,isDehydrated:r,cache:t},Sc(d),e}function Pg(e){return e?(e=la,e):la}function Gg(e,t,r,i,c,d){c=Pg(c),i.context===null?i.context=c:i.pendingContext=c,i=Wn(t),i.payload={element:r},d=d===void 0?null:d,d!==null&&(i.callback=d),r=In(e,i,t),r!==null&&(Dt(r,e,t),pi(r,e,t))}function Xg(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var r=e.retryLane;e.retryLane=r!==0&&r<t?r:t}}function Uu(e,t){Xg(e,t),(e=e.alternate)&&Xg(e,t)}function Fg(e){if(e.tag===13||e.tag===31){var t=Nr(e,67108864);t!==null&&Dt(t,e,67108864),Uu(e,67108864)}}function $g(e){if(e.tag===13||e.tag===31){var t=Lt();t=zo(t);var r=Nr(e,t);r!==null&&Dt(r,e,t),Uu(e,t)}}var wl=!0;function mw(e,t,r,i){var c=U.T;U.T=null;var d=ae.p;try{ae.p=2,Hu(e,t,r,i)}finally{ae.p=d,U.T=c}}function pw(e,t,r,i){var c=U.T;U.T=null;var d=ae.p;try{ae.p=8,Hu(e,t,r,i)}finally{ae.p=d,U.T=c}}function Hu(e,t,r,i){if(wl){var c=qu(i);if(c===null)Cu(e,t,i,jl,r),Zg(e,i);else if(yw(c,e,t,r,i))i.stopPropagation();else if(Zg(e,i),t&4&&-1<gw.indexOf(e)){for(;c!==null;){var d=Qr(c);if(d!==null)switch(d.tag){case 3:if(d=d.stateNode,d.current.memoizedState.isDehydrated){var y=wr(d.pendingLanes);if(y!==0){var w=d;for(w.pendingLanes|=2,w.entangledLanes|=2;y;){var M=1<<31-kt(y);w.entanglements[1]|=M,y&=~M}mn(d),(Re&6)===0&&(il=At()+500,ki(0))}}break;case 31:case 13:w=Nr(d,2),w!==null&&Dt(w,d,2),ll(),Uu(d,2)}if(d=qu(i),d===null&&Cu(e,t,i,jl,r),d===c)break;c=d}c!==null&&i.stopPropagation()}else Cu(e,t,i,null,r)}}function qu(e){return e=Po(e),Yu(e)}var jl=null;function Yu(e){if(jl=null,e=Zr(e),e!==null){var t=h(e);if(t===null)e=null;else{var r=t.tag;if(r===13){if(e=f(t),e!==null)return e;e=null}else if(r===31){if(e=m(t),e!==null)return e;e=null}else if(r===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return jl=e,null}function Kg(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(t1()){case nh:return 2;case rh:return 8;case fs:case n1:return 32;case ah:return 268435456;default:return 32}default:return 32}}var Pu=!1,ur=null,dr=null,fr=null,Li=new Map,Ui=new Map,hr=[],gw="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Zg(e,t){switch(e){case"focusin":case"focusout":ur=null;break;case"dragenter":case"dragleave":dr=null;break;case"mouseover":case"mouseout":fr=null;break;case"pointerover":case"pointerout":Li.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ui.delete(t.pointerId)}}function Hi(e,t,r,i,c,d){return e===null||e.nativeEvent!==d?(e={blockedOn:t,domEventName:r,eventSystemFlags:i,nativeEvent:d,targetContainers:[c]},t!==null&&(t=Qr(t),t!==null&&Fg(t)),e):(e.eventSystemFlags|=i,t=e.targetContainers,c!==null&&t.indexOf(c)===-1&&t.push(c),e)}function yw(e,t,r,i,c){switch(t){case"focusin":return ur=Hi(ur,e,t,r,i,c),!0;case"dragenter":return dr=Hi(dr,e,t,r,i,c),!0;case"mouseover":return fr=Hi(fr,e,t,r,i,c),!0;case"pointerover":var d=c.pointerId;return Li.set(d,Hi(Li.get(d)||null,e,t,r,i,c)),!0;case"gotpointercapture":return d=c.pointerId,Ui.set(d,Hi(Ui.get(d)||null,e,t,r,i,c)),!0}return!1}function Qg(e){var t=Zr(e.target);if(t!==null){var r=h(t);if(r!==null){if(t=r.tag,t===13){if(t=f(r),t!==null){e.blockedOn=t,uh(e.priority,function(){$g(r)});return}}else if(t===31){if(t=m(r),t!==null){e.blockedOn=t,uh(e.priority,function(){$g(r)});return}}else if(t===3&&r.stateNode.current.memoizedState.isDehydrated){e.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}e.blockedOn=null}function El(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var r=qu(e.nativeEvent);if(r===null){r=e.nativeEvent;var i=new r.constructor(r.type,r);Yo=i,r.target.dispatchEvent(i),Yo=null}else return t=Qr(r),t!==null&&Fg(t),e.blockedOn=r,!1;t.shift()}return!0}function Jg(e,t,r){El(e)&&r.delete(t)}function vw(){Pu=!1,ur!==null&&El(ur)&&(ur=null),dr!==null&&El(dr)&&(dr=null),fr!==null&&El(fr)&&(fr=null),Li.forEach(Jg),Ui.forEach(Jg)}function Tl(e,t){e.blockedOn===t&&(e.blockedOn=null,Pu||(Pu=!0,n.unstable_scheduleCallback(n.unstable_NormalPriority,vw)))}var Cl=null;function Wg(e){Cl!==e&&(Cl=e,n.unstable_scheduleCallback(n.unstable_NormalPriority,function(){Cl===e&&(Cl=null);for(var t=0;t<e.length;t+=3){var r=e[t],i=e[t+1],c=e[t+2];if(typeof i!="function"){if(Yu(i||r)===null)continue;break}var d=Qr(r);d!==null&&(e.splice(t,3),t-=3,qc(d,{pending:!0,data:c,method:r.method,action:i},i,c))}}))}function ka(e){function t(M){return Tl(M,e)}ur!==null&&Tl(ur,e),dr!==null&&Tl(dr,e),fr!==null&&Tl(fr,e),Li.forEach(t),Ui.forEach(t);for(var r=0;r<hr.length;r++){var i=hr[r];i.blockedOn===e&&(i.blockedOn=null)}for(;0<hr.length&&(r=hr[0],r.blockedOn===null);)Qg(r),r.blockedOn===null&&hr.shift();if(r=(e.ownerDocument||e).$$reactFormReplay,r!=null)for(i=0;i<r.length;i+=3){var c=r[i],d=r[i+1],y=c[wt]||null;if(typeof d=="function")y||Wg(r);else if(y){var w=null;if(d&&d.hasAttribute("formAction")){if(c=d,y=d[wt]||null)w=y.formAction;else if(Yu(c)!==null)continue}else w=y.action;typeof w=="function"?r[i+1]=w:(r.splice(i,3),i-=3),Wg(r)}}}function Ig(){function e(d){d.canIntercept&&d.info==="react-transition"&&d.intercept({handler:function(){return new Promise(function(y){return c=y})},focusReset:"manual",scroll:"manual"})}function t(){c!==null&&(c(),c=null),i||setTimeout(r,20)}function r(){if(!i&&!navigation.transition){var d=navigation.currentEntry;d&&d.url!=null&&navigation.navigate(d.url,{state:d.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,c=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(r,100),function(){i=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),c!==null&&(c(),c=null)}}}function Gu(e){this._internalRoot=e}Nl.prototype.render=Gu.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(l(409));var r=t.current,i=Lt();Gg(r,i,e,t,null,null)},Nl.prototype.unmount=Gu.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Gg(e.current,2,null,e,null,null),ll(),t[Kr]=null}};function Nl(e){this._internalRoot=e}Nl.prototype.unstable_scheduleHydration=function(e){if(e){var t=ch();e={blockedOn:null,target:e,priority:t};for(var r=0;r<hr.length&&t!==0&&t<hr[r].priority;r++);hr.splice(r,0,e),r===0&&Qg(e)}};var ey=a.version;if(ey!=="19.2.8")throw Error(l(527,ey,"19.2.8"));ae.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(l(188)):(e=Object.keys(e).join(","),Error(l(268,e)));return e=g(t),e=e!==null?v(e):null,e=e===null?null:e.stateNode,e};var xw={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:U,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Dl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Dl.isDisabled&&Dl.supportsFiber)try{Za=Dl.inject(xw),Mt=Dl}catch{}}return Yi.createRoot=function(e,t){if(!u(e))throw Error(l(299));var r=!1,i="",c=lp,d=op,y=cp;return t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onUncaughtError!==void 0&&(c=t.onUncaughtError),t.onCaughtError!==void 0&&(d=t.onCaughtError),t.onRecoverableError!==void 0&&(y=t.onRecoverableError)),t=Yg(e,1,!1,null,null,r,i,null,c,d,y,Ig),e[Kr]=t.current,Tu(e),new Gu(t)},Yi.hydrateRoot=function(e,t,r){if(!u(e))throw Error(l(299));var i=!1,c="",d=lp,y=op,w=cp,M=null;return r!=null&&(r.unstable_strictMode===!0&&(i=!0),r.identifierPrefix!==void 0&&(c=r.identifierPrefix),r.onUncaughtError!==void 0&&(d=r.onUncaughtError),r.onCaughtError!==void 0&&(y=r.onCaughtError),r.onRecoverableError!==void 0&&(w=r.onRecoverableError),r.formState!==void 0&&(M=r.formState)),t=Yg(e,1,!0,t,r??null,i,c,M,d,y,w,Ig),t.context=Pg(null),r=t.current,i=Lt(),i=zo(i),c=Wn(i),c.callback=null,In(r,c,i),r=i,t.current.lanes=r,Ja(t,r),mn(t),e[Kr]=t.current,Tu(e),new Nl(t)},Yi.version="19.2.8",Yi}var uy;function Aw(){if(uy)return $u.exports;uy=1;function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(a){console.error(a)}}return n(),$u.exports=Dw(),$u.exports}var df=Aw();const Mw=ox(df),ff=S.createContext({});function hf(n){const a=S.useRef(null);return a.current===null&&(a.current=n()),a.current}const kw=typeof window<"u",mf=kw?S.useLayoutEffect:S.useEffect,wo=S.createContext(null);function pf(n,a){n.indexOf(a)===-1&&n.push(a)}function Il(n,a){const s=n.indexOf(a);s>-1&&n.splice(s,1)}const bn=(n,a,s)=>s>a?a:s<n?n:s;let jo=()=>{};const vr={},dx=n=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n),fx=n=>typeof n=="object"&&n!==null,hx=n=>/^0[^.\s]+$/u.test(n);function mx(n){let a;return()=>(a===void 0&&(a=n()),a)}const en=n=>n,ss=(...n)=>n.reduce((a,s)=>l=>s(a(l))),Wi=(n,a,s)=>{const l=a-n;return l?(s-n)/l:1};class gf{constructor(){this.subscriptions=[]}add(a){return pf(this.subscriptions,a),()=>Il(this.subscriptions,a)}notify(a,s,l){const u=this.subscriptions.length;if(u)if(u===1)this.subscriptions[0](a,s,l);else for(let h=0;h<u;h++){const f=this.subscriptions[h];f&&f(a,s,l)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}}const qt=n=>n*1e3,It=n=>n/1e3,px=(n,a)=>a?n*(1e3/a):0,gx=(n,a,s)=>(((1-3*s+3*a)*n+(3*s-6*a))*n+3*a)*n,Rw=1e-7,Ow=12;function zw(n,a,s,l,u){let h,f,m=0;do f=a+(s-a)/2,h=gx(f,l,u)-n,h>0?s=f:a=f;while(Math.abs(h)>Rw&&++m<Ow);return f}function ls(n,a,s,l){if(n===a&&s===l)return en;const u=h=>zw(h,0,1,n,s);return h=>h===0||h===1?h:gx(u(h),a,l)}const yx=n=>a=>a<=.5?n(2*a)/2:(2-n(2*(1-a)))/2,vx=n=>a=>1-n(1-a),xx=ls(.33,1.53,.69,.99),yf=vx(xx),bx=yx(yf),Sx=n=>n>=1?1:(n*=2)<1?.5*yf(n):.5*(2-Math.pow(2,-10*(n-1))),vf=n=>1-Math.sin(Math.acos(n)),wx=vx(vf),jx=yx(vf),_w=ls(.42,0,1,1),Vw=ls(0,0,.58,1),Ex=ls(.42,0,.58,1),Bw=n=>Array.isArray(n)&&typeof n[0]!="number",Tx=n=>Array.isArray(n)&&typeof n[0]=="number",Lw={linear:en,easeIn:_w,easeInOut:Ex,easeOut:Vw,circIn:vf,circInOut:jx,circOut:wx,backIn:yf,backInOut:bx,backOut:xx,anticipate:Sx},Uw=n=>typeof n=="string",dy=n=>{if(Tx(n)){jo(n.length===4);const[a,s,l,u]=n;return ls(a,s,l,u)}else if(Uw(n))return Lw[n];return n},Al=["setup","read","resolveKeyframes","preUpdate","update","preRender","render","postRender"];function Hw(n){let a=new Set,s=new Set,l=!1,u=!1;const h=new WeakSet;let f={delta:0,timestamp:0,isProcessing:!1};function m(g){h.has(g)&&(p.schedule(g),n()),g(f)}const p={schedule:(g,v=!1,x=!1)=>{const E=x&&l?a:s;return v&&h.add(g),E.add(g),g},cancel:g=>{s.delete(g),h.delete(g)},process:g=>{if(f=g,l){u=!0;return}l=!0;const v=a;a=s,s=v,a.forEach(m),a.clear(),l=!1,u&&(u=!1,p.process(g))}};return p}const qw=40;function Cx(n,a){let s=!1,l=!0;const u={delta:0,timestamp:0,isProcessing:!1},h=()=>s=!0,f=Al.reduce((z,O)=>(z[O]=Hw(h),z),{}),{setup:m,read:p,resolveKeyframes:g,preUpdate:v,update:x,preRender:b,render:E,postRender:j}=f,N=()=>{const z=vr.useManualTiming,O=z?u.timestamp:performance.now();s=!1,z||(u.delta=l?1e3/60:Math.max(Math.min(O-u.timestamp,qw),1)),u.timestamp=O,u.isProcessing=!0,m.process(u),p.process(u),g.process(u),v.process(u),x.process(u),b.process(u),E.process(u),j.process(u),u.isProcessing=!1,s&&a&&(l=!1,n(N))},C=()=>{s=!0,l=!0,u.isProcessing||n(N)};return{schedule:Al.reduce((z,O)=>{const H=f[O];return z[O]=(Y,A=!1,L=!1)=>(s||C(),H.schedule(Y,A,L)),z},{}),cancel:z=>{for(let O=0;O<Al.length;O++)f[Al[O]].cancel(z)},state:u,steps:f}}const{schedule:qe,cancel:xr,state:mt,steps:Ju}=Cx(typeof requestAnimationFrame<"u"?requestAnimationFrame:en,!0);let Yl;function Yw(){Yl=void 0}const xt={now:()=>(Yl===void 0&&xt.set(mt.isProcessing||vr.useManualTiming?mt.timestamp:performance.now()),Yl),set:n=>{Yl=n,queueMicrotask(Yw)}},Nx=n=>a=>typeof a=="string"&&a.startsWith(n),Dx=Nx("--"),Pw=Nx("var(--"),xf=n=>Pw(n)?Gw.test(n.split("/*")[0].trim()):!1,Gw=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;function fy(n){return typeof n!="string"?!1:n.split("/*")[0].includes("var(--")}const Ga={test:n=>typeof n=="number",parse:parseFloat,transform:n=>n},Ii={...Ga,transform:n=>bn(0,1,n)},Ml={...Ga,default:1},$i=n=>Math.round(n*1e5)/1e5,bf=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function Xw(n){return n==null}const Fw=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,Sf=(n,a)=>s=>!!(typeof s=="string"&&Fw.test(s)&&s.startsWith(n)||a&&!Xw(s)&&Object.prototype.hasOwnProperty.call(s,a)),Ax=(n,a,s)=>l=>{if(typeof l!="string")return l;const[u,h,f,m]=l.match(bf);return{[n]:parseFloat(u),[a]:parseFloat(h),[s]:parseFloat(f),alpha:m!==void 0?parseFloat(m):1}},$w=n=>bn(0,255,n),Wu={...Ga,transform:n=>Math.round($w(n))},Yr={test:Sf("rgb","red"),parse:Ax("red","green","blue"),transform:({red:n,green:a,blue:s,alpha:l=1})=>"rgba("+Wu.transform(n)+", "+Wu.transform(a)+", "+Wu.transform(s)+", "+$i(Ii.transform(l))+")"};function Kw(n){let a="",s="",l="",u="";return n.length>5?(a=n.substring(1,3),s=n.substring(3,5),l=n.substring(5,7),u=n.substring(7,9)):(a=n.substring(1,2),s=n.substring(2,3),l=n.substring(3,4),u=n.substring(4,5),a+=a,s+=s,l+=l,u+=u),{red:parseInt(a,16),green:parseInt(s,16),blue:parseInt(l,16),alpha:u?parseInt(u,16)/255:1}}const Td={test:Sf("#"),parse:Kw,transform:Yr.transform},os=n=>({test:a=>typeof a=="string"&&a.endsWith(n)&&a.split(" ").length===1,parse:parseFloat,transform:a=>`${a}${n}`}),qn=os("deg"),xn=os("%"),he=os("px"),Zw=os("vh"),Qw=os("vw"),hy={...xn,parse:n=>xn.parse(n)/100,transform:n=>xn.transform(n*100)},Ba={test:Sf("hsl","hue"),parse:Ax("hue","saturation","lightness"),transform:({hue:n,saturation:a,lightness:s,alpha:l=1})=>"hsla("+Math.round(n)+", "+xn.transform($i(a))+", "+xn.transform($i(s))+", "+$i(Ii.transform(l))+")"},rt={test:n=>Yr.test(n)||Td.test(n)||Ba.test(n),parse:n=>Yr.test(n)?Yr.parse(n):Ba.test(n)?Ba.parse(n):Td.parse(n),transform:n=>typeof n=="string"?n:n.hasOwnProperty("red")?Yr.transform(n):Ba.transform(n),getAnimatableNone:n=>{const a=rt.parse(n);return a.alpha=0,rt.transform(a)}},Jw=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;function Ww(n){var a,s;return isNaN(n)&&typeof n=="string"&&(((a=n.match(bf))==null?void 0:a.length)||0)+(((s=n.match(Jw))==null?void 0:s.length)||0)>0}const Mx="number",kx="color",Iw="var",e2="var(",my="${}",t2=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function qa(n){const a=n.toString(),s=[],l={color:[],number:[],var:[]},u=[];let h=0;const m=a.replace(t2,p=>(rt.test(p)?(l.color.push(h),u.push(kx),s.push(rt.parse(p))):p.startsWith(e2)?(l.var.push(h),u.push(Iw),s.push(p)):(l.number.push(h),u.push(Mx),s.push(parseFloat(p))),++h,my)).split(my);return{values:s,split:m,indexes:l,types:u}}function n2(n){return qa(n).values}function Rx({split:n,types:a}){const s=n.length;return l=>{let u="";for(let h=0;h<s;h++)if(u+=n[h],l[h]!==void 0){const f=a[h];f===Mx?u+=$i(l[h]):f===kx?u+=rt.transform(l[h]):u+=l[h]}return u}}function r2(n){return Rx(qa(n))}const a2=n=>typeof n=="number"?0:rt.test(n)?rt.getAnimatableNone(n):n,i2=(n,a)=>typeof n=="number"?a!=null&&a.trim().endsWith("/")?n:0:a2(n);function s2(n){const a=qa(n);return Rx(a)(a.values.map((l,u)=>i2(l,a.split[u])))}const cn={test:Ww,parse:n2,createTransformer:r2,getAnimatableNone:s2};function Iu(n,a,s){return s<0&&(s+=1),s>1&&(s-=1),s<1/6?n+(a-n)*6*s:s<1/2?a:s<2/3?n+(a-n)*(2/3-s)*6:n}function l2({hue:n,saturation:a,lightness:s,alpha:l}){n/=360,a/=100,s/=100;let u=0,h=0,f=0;if(!a)u=h=f=s;else{const m=s<.5?s*(1+a):s+a-s*a,p=2*s-m;u=Iu(p,m,n+1/3),h=Iu(p,m,n),f=Iu(p,m,n-1/3)}return{red:Math.round(u*255),green:Math.round(h*255),blue:Math.round(f*255),alpha:l}}function eo(n,a){return s=>s>0?a:n}const He=(n,a,s)=>n+(a-n)*s,ed=(n,a,s)=>{const l=n*n,u=s*(a*a-l)+l;return u<0?0:Math.sqrt(u)},o2=[Td,Yr,Ba],c2=n=>o2.find(a=>a.test(n));function py(n){const a=c2(n);if(!a)return!1;let s=a.parse(n);return a===Ba&&(s=l2(s)),s}const gy=(n,a)=>{const s=py(n),l=py(a);if(!s||!l)return eo(n,a);const u={...s};return h=>(u.red=ed(s.red,l.red,h),u.green=ed(s.green,l.green,h),u.blue=ed(s.blue,l.blue,h),u.alpha=He(s.alpha,l.alpha,h),Yr.transform(u))},Cd=new Set(["none","hidden"]);function u2(n,a){return Cd.has(n)?s=>s<=0?n:a:s=>s>=1?a:n}function d2(n,a){return s=>He(n,a,s)}function wf(n){return typeof n=="number"?d2:typeof n=="string"?xf(n)?eo:rt.test(n)?gy:m2:Array.isArray(n)?Ox:typeof n=="object"?rt.test(n)?gy:f2:eo}function Ox(n,a){const s=[...n],l=s.length,u=n.map((h,f)=>wf(h)(h,a[f]));return h=>{for(let f=0;f<l;f++)s[f]=u[f](h);return s}}function f2(n,a){const s={...n,...a},l={};for(const u in s)n[u]!==void 0&&a[u]!==void 0&&(l[u]=wf(n[u])(n[u],a[u]));return u=>{for(const h in l)s[h]=l[h](u);return s}}function h2(n,a){const s=[],l={color:0,var:0,number:0};for(let u=0;u<a.values.length;u++){const h=a.types[u],f=n.indexes[h][l[h]],m=n.values[f]??0;s[u]=m,l[h]++}return s}const m2=(n,a)=>{const s=cn.createTransformer(a),l=qa(n),u=qa(a);return l.indexes.var.length===u.indexes.var.length&&l.indexes.color.length===u.indexes.color.length&&l.indexes.number.length>=u.indexes.number.length?Cd.has(n)&&!u.values.length||Cd.has(a)&&!l.values.length?u2(n,a):ss(Ox(h2(l,u),u.values),s):eo(n,a)};function zx(n,a,s){return typeof n=="number"&&typeof a=="number"&&typeof s=="number"?He(n,a,s):wf(n)(n,a)}const p2=n=>{const a=({timestamp:s})=>n(s);return{start:(s=!0)=>qe.update(a,s),stop:()=>xr(a),now:()=>mt.isProcessing?mt.timestamp:xt.now()}},_x=(n,a,s=10)=>{let l="";const u=Math.max(Math.round(a/s),2);for(let h=0;h<u;h++)l+=Math.round(n(h/(u-1))*1e4)/1e4+", ";return`linear(${l.substring(0,l.length-2)})`},to=2e4;function jf(n){let a=0;const s=50;let l=n.next(a);for(;!l.done&&a<to;)a+=s,l=n.next(a);return a>=to?1/0:a}function g2(n,a=100,s){const l=s({...n,keyframes:[0,a]}),u=Math.min(jf(l),to);return{type:"keyframes",ease:h=>l.next(u*h).value/a,duration:It(u)}}const Ze={stiffness:100,damping:10,mass:1,velocity:0,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05,maxDamping:1};function Nd(n,a){return n*Math.sqrt(1-a*a)}const y2=12;function v2(n,a,s){let l=s;for(let u=1;u<y2;u++)l=l-n(l)/a(l);return l}const td=.001;function x2({duration:n=Ze.duration,bounce:a=Ze.bounce,velocity:s=Ze.velocity,mass:l=Ze.mass}){let u,h,f=1-a;f=bn(Ze.minDamping,Ze.maxDamping,f),n=bn(Ze.minDuration,Ze.maxDuration,It(n)),f<1?(u=g=>{const v=g*f,x=v*n,b=v-s,E=Nd(g,f),j=Math.exp(-x);return td-b/E*j},h=g=>{const x=g*f*n,b=x*s+s,E=Math.pow(f,2)*Math.pow(g,2)*n,j=Math.exp(-x),N=Nd(Math.pow(g,2),f);return(-u(g)+td>0?-1:1)*((b-E)*j)/N}):(u=g=>{const v=Math.exp(-g*n),x=(g-s)*n+1;return-td+v*x},h=g=>{const v=Math.exp(-g*n),x=(s-g)*(n*n);return v*x});const m=5/n,p=v2(u,h,m);if(n=qt(n),isNaN(p))return{stiffness:Ze.stiffness,damping:Ze.damping,duration:n};{const g=Math.pow(p,2)*l;return{stiffness:g,damping:f*2*Math.sqrt(l*g),duration:n}}}const b2=["duration","bounce"],S2=["stiffness","damping","mass"];function yy(n,a){return a.some(s=>n[s]!==void 0)}function w2(n){let a={velocity:Ze.velocity,stiffness:Ze.stiffness,damping:Ze.damping,mass:Ze.mass,isResolvedFromDuration:!1,...n};if(!yy(n,S2)&&yy(n,b2))if(a.velocity=0,n.visualDuration){const s=n.visualDuration,l=2*Math.PI/(s*1.2),u=l*l,h=2*bn(.05,1,1-(n.bounce||0))*Math.sqrt(u);a={...a,mass:Ze.mass,stiffness:u,damping:h}}else{const s=x2({...n,velocity:0});a={...a,...s,mass:Ze.mass},a.isResolvedFromDuration=!0}return a}function no(n=Ze.visualDuration,a=Ze.bounce){const s=typeof n!="object"?{visualDuration:n,keyframes:[0,1],bounce:a}:n;let{restSpeed:l,restDelta:u}=s;const h=s.keyframes[0],f=s.keyframes[s.keyframes.length-1],m={done:!1,value:h},{stiffness:p,damping:g,mass:v,duration:x,velocity:b,isResolvedFromDuration:E}=w2({...s,velocity:-It(s.velocity||0)}),j=b||0,N=g/(2*Math.sqrt(p*v)),C=f-h,k=It(Math.sqrt(p/v)),D=Math.abs(C)<5;l||(l=D?Ze.restSpeed.granular:Ze.restSpeed.default),u||(u=D?Ze.restDelta.granular:Ze.restDelta.default);let z,O,H,Y,A,L;if(N<1)H=Nd(k,N),Y=(j+N*k*C)/H,z=V=>{const $=Math.exp(-N*k*V);return f-$*(Y*Math.sin(H*V)+C*Math.cos(H*V))},A=N*k*Y+C*H,L=N*k*C-Y*H,O=V=>Math.exp(-N*k*V)*(A*Math.sin(H*V)+L*Math.cos(H*V));else if(N===1){z=$=>f-Math.exp(-k*$)*(C+(j+k*C)*$);const V=j+k*C;O=$=>Math.exp(-k*$)*(k*V*$-j)}else{const V=k*Math.sqrt(N*N-1);z=ce=>{const le=Math.exp(-N*k*ce),U=Math.min(V*ce,300);return f-le*((j+N*k*C)*Math.sinh(U)+V*C*Math.cosh(U))/V};const $=(j+N*k*C)/V,J=N*k*$-C*V,oe=N*k*C-$*V;O=ce=>{const le=Math.exp(-N*k*ce),U=Math.min(V*ce,300);return le*(J*Math.sinh(U)+oe*Math.cosh(U))}}const B={calculatedDuration:E&&x||null,velocity:V=>qt(O(V)),next:V=>{if(!E&&N<1){const J=Math.exp(-N*k*V),oe=Math.sin(H*V),ce=Math.cos(H*V),le=f-J*(Y*oe+C*ce),U=qt(J*(A*oe+L*ce));return m.done=Math.abs(U)<=l&&Math.abs(f-le)<=u,m.value=m.done?f:le,m}const $=z(V);if(E)m.done=V>=x;else{const J=qt(O(V));m.done=Math.abs(J)<=l&&Math.abs(f-$)<=u}return m.value=m.done?f:$,m},toString:()=>{const V=Math.min(jf(B),to),$=_x(J=>B.next(V*J).value,V,30);return V+"ms "+$},toTransition:()=>{}};return B}no.applyToOptions=n=>{const a=g2(n,100,no);return n.ease=a.ease,n.duration=qt(a.duration),n.type="keyframes",n};const j2=5;function Vx(n,a,s){const l=Math.max(a-j2,0);return px(s-n(l),a-l)}function Dd({keyframes:n,velocity:a=0,power:s=.8,timeConstant:l=325,bounceDamping:u=10,bounceStiffness:h=500,modifyTarget:f,min:m,max:p,restDelta:g=.5,restSpeed:v}){const x=n[0],b={done:!1,value:x},E=L=>m!==void 0&&L<m||p!==void 0&&L>p,j=L=>m===void 0?p:p===void 0||Math.abs(m-L)<Math.abs(p-L)?m:p;let N=s*a;const C=x+N,k=f===void 0?C:f(C);k!==C&&(N=k-x);const D=L=>-N*Math.exp(-L/l),z=L=>k+D(L),O=L=>{const B=D(L),V=z(L);b.done=Math.abs(B)<=g,b.value=b.done?k:V};let H,Y;const A=L=>{E(b.value)&&(H=L,Y=no({keyframes:[b.value,j(b.value)],velocity:Vx(z,L,b.value),damping:u,stiffness:h,restDelta:g,restSpeed:v}))};return A(0),{calculatedDuration:null,next:L=>{let B=!1;return!Y&&H===void 0&&(B=!0,O(L),A(L)),H!==void 0&&L>=H?Y.next(L-H):(!B&&O(L),b)}}}function E2(n,a,s){const l=[],u=s||vr.mix||zx,h=n.length-1;for(let f=0;f<h;f++){let m=u(n[f],n[f+1]);if(a){const p=Array.isArray(a)?a[f]||en:a;m=ss(p,m)}l.push(m)}return l}function T2(n,a,{clamp:s=!0,ease:l,mixer:u}={}){const h=n.length;if(jo(h===a.length),h===1)return()=>a[0];if(h===2&&a[0]===a[1])return()=>a[1];const f=n[0]===n[1];n[0]>n[h-1]&&(n=[...n].reverse(),a=[...a].reverse());const m=E2(a,l,u),p=m.length,g=v=>{if(f&&v<n[0])return a[0];let x=0;if(p>1)for(;x<n.length-2&&!(v<n[x+1]);x++);const b=Wi(n[x],n[x+1],v);return m[x](b)};return s?v=>g(bn(n[0],n[h-1],v)):g}function C2(n,a){const s=n[n.length-1];for(let l=1;l<=a;l++){const u=Wi(0,a,l);n.push(He(s,1,u))}}function N2(n){const a=[0];return C2(a,n.length-1),a}function D2(n,a){return n.map(s=>s*a)}function A2(n,a){return n.map(()=>a||Ex).splice(0,n.length-1)}function Ki({duration:n=300,keyframes:a,times:s,ease:l="easeInOut"}){const u=Bw(l)?l.map(dy):dy(l),h={done:!1,value:a[0]},f=D2(s&&s.length===a.length?s:N2(a),n),m=T2(f,a,{ease:Array.isArray(u)?u:A2(a,u)});return{calculatedDuration:n,next:p=>(h.value=m(p),h.done=p>=n,h)}}const M2=n=>n!==null;function Eo(n,{repeat:a,repeatType:s="loop"},l,u=1){const h=n.filter(M2),m=u<0||a&&s!=="loop"&&a%2===1?0:h.length-1;return!m||l===void 0?h[m]:l}const k2={decay:Dd,inertia:Dd,tween:Ki,keyframes:Ki,spring:no};function Bx(n){typeof n.type=="string"&&(n.type=k2[n.type])}class Ef{constructor(){this.updateFinished()}get finished(){return this._finished}updateFinished(){this._finished=new Promise(a=>{this.resolve=a})}notifyFinished(){this.resolve()}then(a,s){return this.finished.then(a,s)}}const R2=n=>n/100;class ro extends Ef{constructor(a){super(),this.state="idle",this.startTime=null,this.isStopped=!1,this.currentTime=0,this.holdTime=null,this.playbackSpeed=1,this.delayState={done:!1,value:void 0},this.stop=()=>{var l,u;const{motionValue:s}=this.options;s&&s.updatedAt!==xt.now()&&this.tick(xt.now()),this.isStopped=!0,this.state!=="idle"&&(this.teardown(),(u=(l=this.options).onStop)==null||u.call(l))},this.options=a,this.initAnimation(),this.play(),a.autoplay===!1&&this.pause()}initAnimation(){const{options:a}=this;Bx(a);const{type:s=Ki,repeat:l=0,repeatDelay:u=0,repeatType:h,velocity:f=0}=a;let{keyframes:m}=a;const p=s||Ki;p!==Ki&&typeof m[0]!="number"&&(this.mixKeyframes=ss(R2,zx(m[0],m[1])),m=[0,100]);const g=p({...a,keyframes:m});h==="mirror"&&(this.mirroredGenerator=p({...a,keyframes:[...m].reverse(),velocity:-f})),g.calculatedDuration===null&&(g.calculatedDuration=jf(g));const{calculatedDuration:v}=g;this.calculatedDuration=v,this.resolvedDuration=v+u,this.totalDuration=this.resolvedDuration*(l+1)-u,this.generator=g}updateTime(a){const s=Math.round(a-this.startTime)*this.playbackSpeed;this.holdTime!==null?this.currentTime=this.holdTime:this.currentTime=s}tick(a,s=!1){const{generator:l,totalDuration:u,mixKeyframes:h,mirroredGenerator:f,resolvedDuration:m,calculatedDuration:p}=this;if(this.startTime===null)return l.next(0);const{delay:g=0,keyframes:v,repeat:x,repeatType:b,repeatDelay:E,type:j,onUpdate:N,finalKeyframe:C}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,a):this.speed<0&&(this.startTime=Math.min(a-u/this.speed,this.startTime)),s?this.currentTime=a:this.updateTime(a);const k=this.currentTime-g*(this.playbackSpeed>=0?1:-1),D=this.playbackSpeed>=0?k<0:k>u;this.currentTime=Math.max(k,0),this.state==="finished"&&this.holdTime===null&&(this.currentTime=u);let z=this.currentTime,O=l;if(x){const L=Math.min(this.currentTime,u)/m;let B=Math.floor(L),V=L%1;!V&&L>=1&&(V=1),V===1&&B--,B=Math.min(B,x+1),!!(B%2)&&(b==="reverse"?(V=1-V,E&&(V-=E/m)):b==="mirror"&&(O=f)),z=bn(0,1,V)*m}let H;D?(this.delayState.value=v[0],H=this.delayState):H=O.next(z),h&&!D&&(H.value=h(H.value));let{done:Y}=H;!D&&p!==null&&(Y=this.playbackSpeed>=0?this.currentTime>=u:this.currentTime<=0);const A=this.holdTime===null&&(this.state==="finished"||this.state==="running"&&Y);return A&&j!==Dd&&(H.value=Eo(v,this.options,C,this.speed)),N&&N(H.value),A&&this.finish(),H}then(a,s){return this.finished.then(a,s)}get duration(){return It(this.calculatedDuration)}get iterationDuration(){const{delay:a=0}=this.options||{};return this.duration+It(a)}get time(){return It(this.currentTime)}set time(a){a=qt(a),this.currentTime=a,this.startTime===null||this.holdTime!==null||this.playbackSpeed===0?this.holdTime=a:this.driver&&(this.startTime=this.driver.now()-a/this.playbackSpeed),this.driver?this.driver.start(!1):(this.startTime=0,this.state="paused",this.holdTime=a,this.tick(a))}getGeneratorVelocity(){const a=this.currentTime;if(a<=0)return this.options.velocity||0;if(this.generator.velocity)return this.generator.velocity(a);const s=this.generator.next(a).value;return Vx(l=>this.generator.next(l).value,a,s)}get speed(){return this.playbackSpeed}set speed(a){const s=this.playbackSpeed!==a;s&&this.driver&&this.updateTime(xt.now()),this.playbackSpeed=a,s&&this.driver&&(this.time=It(this.currentTime))}play(){var u,h;if(this.isStopped)return;const{driver:a=p2,startTime:s}=this.options;this.driver||(this.driver=a(f=>this.tick(f))),(h=(u=this.options).onPlay)==null||h.call(u);const l=this.driver.now();this.state==="finished"?(this.updateFinished(),this.startTime=l):this.holdTime!==null?this.startTime=l-this.holdTime:this.startTime||(this.startTime=s??l),this.state==="finished"&&this.speed<0&&(this.startTime+=this.calculatedDuration),this.holdTime=null,this.state="running",this.driver.start()}pause(){this.state="paused",this.updateTime(xt.now()),this.holdTime=this.currentTime}complete(){this.state!=="running"&&this.play(),this.state="finished",this.holdTime=null}finish(){var a,s;this.notifyFinished(),this.teardown(),this.state="finished",(s=(a=this.options).onComplete)==null||s.call(a)}cancel(){var a,s;this.holdTime=null,this.startTime=0,this.tick(0),this.teardown(),(s=(a=this.options).onCancel)==null||s.call(a)}teardown(){this.state="idle",this.stopDriver(),this.startTime=this.holdTime=null}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(a){return this.startTime=0,this.tick(a,!0)}attachTimeline(a){var s;return this.options.allowFlatten&&(this.options.type="keyframes",this.options.ease="linear",this.initAnimation()),(s=this.driver)==null||s.stop(),a.observe(this)}}function O2(n){for(let a=1;a<n.length;a++)n[a]??(n[a]=n[a-1])}const Pr=n=>n*180/Math.PI,Ad=n=>{const a=Pr(Math.atan2(n[1],n[0]));return Md(a)},z2={x:4,y:5,translateX:4,translateY:5,scaleX:0,scaleY:3,scale:n=>(Math.abs(n[0])+Math.abs(n[3]))/2,rotate:Ad,rotateZ:Ad,skewX:n=>Pr(Math.atan(n[1])),skewY:n=>Pr(Math.atan(n[2])),skew:n=>(Math.abs(n[1])+Math.abs(n[2]))/2},Md=n=>(n=n%360,n<0&&(n+=360),n),vy=Ad,xy=n=>Math.sqrt(n[0]*n[0]+n[1]*n[1]),by=n=>Math.sqrt(n[4]*n[4]+n[5]*n[5]),_2={x:12,y:13,z:14,translateX:12,translateY:13,translateZ:14,scaleX:xy,scaleY:by,scale:n=>(xy(n)+by(n))/2,rotateX:n=>Md(Pr(Math.atan2(n[6],n[5]))),rotateY:n=>Md(Pr(Math.atan2(-n[2],n[0]))),rotateZ:vy,rotate:vy,skewX:n=>Pr(Math.atan(n[4])),skewY:n=>Pr(Math.atan(n[1])),skew:n=>(Math.abs(n[1])+Math.abs(n[4]))/2};function kd(n){return n.includes("scale")?1:0}function Rd(n,a){if(!n||n==="none")return kd(a);const s=n.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);let l,u;if(s)l=_2,u=s;else{const m=n.match(/^matrix\(([-\d.e\s,]+)\)$/u);l=z2,u=m}if(!u)return kd(a);const h=l[a],f=u[1].split(",").map(B2);return typeof h=="function"?h(f):f[h]}const V2=(n,a)=>{const{transform:s="none"}=getComputedStyle(n);return Rd(s,a)};function B2(n){return parseFloat(n.trim())}const Xa=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],Fa=new Set([...Xa,"pathRotation"]),Sy=n=>n===Ga||n===he,L2=new Set(["x","y","z"]),U2=Xa.filter(n=>!L2.has(n));function H2(n){const a=[];return U2.forEach(s=>{const l=n.getValue(s);l!==void 0&&(a.push([s,l.get()]),l.set(s.startsWith("scale")?1:0))}),a}const gr={width:({x:n},{paddingLeft:a="0",paddingRight:s="0",boxSizing:l})=>{const u=n.max-n.min;return l==="border-box"?u:u-parseFloat(a)-parseFloat(s)},height:({y:n},{paddingTop:a="0",paddingBottom:s="0",boxSizing:l})=>{const u=n.max-n.min;return l==="border-box"?u:u-parseFloat(a)-parseFloat(s)},top:(n,{top:a})=>parseFloat(a),left:(n,{left:a})=>parseFloat(a),bottom:({y:n},{top:a})=>parseFloat(a)+(n.max-n.min),right:({x:n},{left:a})=>parseFloat(a)+(n.max-n.min),x:(n,{transform:a})=>Rd(a,"x"),y:(n,{transform:a})=>Rd(a,"y")};gr.translateX=gr.x;gr.translateY=gr.y;const Gr=new Set;let Od=!1,zd=!1,_d=!1;function Lx(){if(zd){const n=Array.from(Gr).filter(l=>l.needsMeasurement),a=new Set(n.map(l=>l.element)),s=new Map;a.forEach(l=>{const u=H2(l);u.length&&(s.set(l,u),l.render())}),n.forEach(l=>l.measureInitialState()),a.forEach(l=>{l.render();const u=s.get(l);u&&u.forEach(([h,f])=>{var m;(m=l.getValue(h))==null||m.set(f)})}),n.forEach(l=>l.measureEndState()),n.forEach(l=>{l.suspendedScrollY!==void 0&&window.scrollTo(0,l.suspendedScrollY)})}zd=!1,Od=!1,Gr.forEach(n=>n.complete(_d)),Gr.clear()}function Ux(){Gr.forEach(n=>{n.readKeyframes(),n.needsMeasurement&&(zd=!0)})}function q2(){_d=!0,Ux(),Lx(),_d=!1}class Tf{constructor(a,s,l,u,h,f=!1){this.state="pending",this.isAsync=!1,this.needsMeasurement=!1,this.unresolvedKeyframes=[...a],this.onComplete=s,this.name=l,this.motionValue=u,this.element=h,this.isAsync=f}scheduleResolve(){this.state="scheduled",this.isAsync?(Gr.add(this),Od||(Od=!0,qe.read(Ux),qe.resolveKeyframes(Lx))):(this.readKeyframes(),this.complete())}readKeyframes(){const{unresolvedKeyframes:a,name:s,element:l,motionValue:u}=this;if(a[0]===null){const h=u==null?void 0:u.get(),f=a[a.length-1];if(h!==void 0)a[0]=h;else if(l&&s){const m=l.readValue(s,f);m!=null&&(a[0]=m)}a[0]===void 0&&(a[0]=f),u&&h===void 0&&u.set(a[0])}O2(a)}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(a=!1){this.state="complete",this.onComplete(this.unresolvedKeyframes,this.finalKeyframe,a),Gr.delete(this)}cancel(){this.state==="scheduled"&&(Gr.delete(this),this.state="pending")}resume(){this.state==="pending"&&this.scheduleResolve()}}const Y2=n=>n.startsWith("--");function Hx(n,a,s){Y2(a)?n.style.setProperty(a,s):n.style[a]=s}const P2={};function qx(n,a){const s=mx(n);return()=>P2[a]??s()}const G2=qx(()=>window.ScrollTimeline!==void 0,"scrollTimeline"),Yx=qx(()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0},"linearEasing"),Xi=([n,a,s,l])=>`cubic-bezier(${n}, ${a}, ${s}, ${l})`,wy={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:Xi([0,.65,.55,1]),circOut:Xi([.55,0,1,.45]),backIn:Xi([.31,.01,.66,-.59]),backOut:Xi([.33,1.53,.69,.99])};function Px(n,a){if(n)return typeof n=="function"?Yx()?_x(n,a):"ease-out":Tx(n)?Xi(n):Array.isArray(n)?n.map(s=>Px(s,a)||wy.easeOut):wy[n]}function X2(n,a,s,{delay:l=0,duration:u=300,repeat:h=0,repeatType:f="loop",ease:m="easeOut",times:p}={},g=void 0){const v={[a]:s};p&&(v.offset=p);const x=Px(m,u);Array.isArray(x)&&(v.easing=x);const b={delay:l,duration:u,easing:Array.isArray(x)?"linear":x,fill:"both",iterations:h+1,direction:f==="reverse"?"alternate":"normal"};return g&&(b.pseudoElement=g),n.animate(v,b)}function Gx(n){return typeof n=="function"&&"applyToOptions"in n}function F2({type:n,...a}){return Gx(n)&&Yx()?n.applyToOptions(a):(a.duration??(a.duration=300),a.ease??(a.ease="easeOut"),a)}class Xx extends Ef{constructor(a){if(super(),this.finishedTime=null,this.isStopped=!1,this.manualStartTime=null,!a)return;const{element:s,name:l,keyframes:u,pseudoElement:h,allowFlatten:f=!1,finalKeyframe:m,onComplete:p}=a;this.isPseudoElement=!!h,this.allowFlatten=f,this.options=a,jo(typeof a.type!="string");const g=F2(a);this.animation=X2(s,l,u,g,h),g.autoplay===!1&&this.animation.pause(),this.animation.onfinish=()=>{if(this.finishedTime=this.time,!h){const v=Eo(u,this.options,m,this.speed);this.updateMotionValue&&this.updateMotionValue(v),Hx(s,l,v),this.animation.cancel()}p==null||p(),this.notifyFinished()}}play(){this.isStopped||(this.manualStartTime=null,this.animation.play(),this.state==="finished"&&this.updateFinished())}pause(){this.animation.pause()}complete(){var a,s;(s=(a=this.animation).finish)==null||s.call(a)}cancel(){try{this.animation.cancel()}catch{}}stop(){if(this.isStopped)return;this.isStopped=!0;const{state:a}=this;a==="idle"||a==="finished"||(this.updateMotionValue?this.updateMotionValue():this.commitStyles(),this.isPseudoElement||this.cancel())}commitStyles(){var s,l,u;const a=(s=this.options)==null?void 0:s.element;!this.isPseudoElement&&(a!=null&&a.isConnected)&&((u=(l=this.animation).commitStyles)==null||u.call(l))}get duration(){var s,l;const a=((l=(s=this.animation.effect)==null?void 0:s.getComputedTiming)==null?void 0:l.call(s).duration)||0;return It(Number(a))}get iterationDuration(){const{delay:a=0}=this.options||{};return this.duration+It(a)}get time(){return It(Number(this.animation.currentTime)||0)}set time(a){const s=this.finishedTime!==null;this.manualStartTime=null,this.finishedTime=null,this.animation.currentTime=qt(a),s&&this.animation.pause()}get speed(){return this.animation.playbackRate}set speed(a){a<0&&(this.finishedTime=null),this.animation.playbackRate=a}get state(){return this.finishedTime!==null?"finished":this.animation.playState}get startTime(){return this.manualStartTime??Number(this.animation.startTime)}set startTime(a){this.manualStartTime=this.animation.startTime=a}attachTimeline({timeline:a,rangeStart:s,rangeEnd:l,observe:u}){var h;return this.allowFlatten&&((h=this.animation.effect)==null||h.updateTiming({easing:"linear"})),this.animation.onfinish=null,a&&G2()?(this.animation.timeline=a,s&&(this.animation.rangeStart=s),l&&(this.animation.rangeEnd=l),en):u(this)}}const Fx={anticipate:Sx,backInOut:bx,circInOut:jx};function $2(n){return n in Fx}function K2(n){typeof n.ease=="string"&&$2(n.ease)&&(n.ease=Fx[n.ease])}const nd=10;class Z2 extends Xx{constructor(a){K2(a),Bx(a),super(a),a.startTime!==void 0&&a.autoplay!==!1&&(this.startTime=a.startTime),this.options=a}updateMotionValue(a){const{motionValue:s,onUpdate:l,onComplete:u,element:h,...f}=this.options;if(!s)return;if(a!==void 0){s.set(a);return}const m=new ro({...f,autoplay:!1}),p=Math.max(nd,xt.now()-this.startTime),g=bn(0,nd,p-nd),v=m.sample(p).value,{name:x}=this.options;h&&x&&Hx(h,x,v),s.setWithVelocity(m.sample(Math.max(0,p-g)).value,v,g),m.stop()}}const jy=(n,a)=>a==="zIndex"?!1:!!(typeof n=="number"||Array.isArray(n)||typeof n=="string"&&(cn.test(n)||n==="0")&&!n.startsWith("url("));function Q2(n){const a=n[0];if(n.length===1)return!0;for(let s=0;s<n.length;s++)if(n[s]!==a)return!0}function J2(n,a,s,l){const u=n[0];if(u===null)return!1;if(a==="display"||a==="visibility")return!0;const h=n[n.length-1],f=jy(u,a),m=jy(h,a);return!f||!m?!1:Q2(n)||(s==="spring"||Gx(s))&&l}function Vd(n){n.duration=0,n.type="keyframes"}const $x=new Set(["opacity","clipPath","filter","transform","backgroundColor"]),W2=/^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;function I2(n){for(let a=0;a<n.length;a++)if(typeof n[a]=="string"&&W2.test(n[a]))return!0;return!1}const ej=new Set(["color","backgroundColor","outlineColor","fill","stroke","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"]),tj=mx(()=>Object.hasOwnProperty.call(Element.prototype,"animate"));function nj(n){var x;const{motionValue:a,name:s,repeatDelay:l,repeatType:u,damping:h,type:f,keyframes:m}=n,p=(x=a==null?void 0:a.owner)==null?void 0:x.current;if(!(p instanceof HTMLElement)&&!(p instanceof SVGElement))return!1;const{onUpdate:g,transformTemplate:v}=a.owner.getProps();return tj()&&s&&($x.has(s)||ej.has(s)&&I2(m))&&(s!=="transform"||!v)&&!g&&!l&&u!=="mirror"&&h!==0&&f!=="inertia"}const rj=40;class aj extends Ef{constructor({autoplay:a=!0,delay:s=0,type:l="keyframes",repeat:u=0,repeatDelay:h=0,repeatType:f="loop",keyframes:m,name:p,motionValue:g,element:v,...x}){var j;super(),this.stop=()=>{var N,C;this._animation&&(this._animation.stop(),(N=this.stopTimeline)==null||N.call(this)),(C=this.keyframeResolver)==null||C.cancel()},this.createdAt=xt.now();const b={autoplay:a,delay:s,type:l,repeat:u,repeatDelay:h,repeatType:f,name:p,motionValue:g,element:v,...x},E=(v==null?void 0:v.KeyframeResolver)||Tf;this.keyframeResolver=new E(m,(N,C,k)=>this.onKeyframesResolved(N,C,b,!k),p,g,v),(j=this.keyframeResolver)==null||j.scheduleResolve()}onKeyframesResolved(a,s,l,u){var k,D;this.keyframeResolver=void 0;const{name:h,type:f,velocity:m,delay:p,isHandoff:g,onUpdate:v}=l;this.resolvedAt=xt.now();let x=!0;J2(a,h,f,m)||(x=!1,(vr.instantAnimations||!p)&&(v==null||v(Eo(a,l,s))),a[0]=a[a.length-1],Vd(l),l.repeat=0);const E={startTime:u?this.resolvedAt?this.resolvedAt-this.createdAt>rj?this.resolvedAt:this.createdAt:this.createdAt:void 0,finalKeyframe:s,...l,keyframes:a},j=x&&!g&&nj(E),N=(D=(k=E.motionValue)==null?void 0:k.owner)==null?void 0:D.current;let C;if(j)try{C=new Z2({...E,element:N})}catch{C=new ro(E)}else C=new ro(E);C.finished.then(()=>{this.notifyFinished()}).catch(en),this.pendingTimeline&&(this.stopTimeline=C.attachTimeline(this.pendingTimeline),this.pendingTimeline=void 0),this._animation=C}get finished(){return this._animation?this.animation.finished:this._finished}then(a,s){return this.finished.finally(a).then(()=>{})}get animation(){var a;return this._animation||((a=this.keyframeResolver)==null||a.resume(),q2()),this._animation}get duration(){return this.animation.duration}get iterationDuration(){return this.animation.iterationDuration}get time(){return this.animation.time}set time(a){this.animation.time=a}get speed(){return this.animation.speed}get state(){return this.animation.state}set speed(a){this.animation.speed=a}get startTime(){return this.animation.startTime}attachTimeline(a){return this._animation?this.stopTimeline=this.animation.attachTimeline(a):this.pendingTimeline=a,()=>this.stop()}play(){this.animation.play()}pause(){this.animation.pause()}complete(){this.animation.complete()}cancel(){var a;this._animation&&this.animation.cancel(),(a=this.keyframeResolver)==null||a.cancel()}}function Kx(n,a,s,l=0,u=1){const h=Array.from(n).sort((g,v)=>g.sortNodePosition(v)).indexOf(a),f=n.size,m=(f-1)*l;return typeof s=="function"?s(h,f):u===1?h*l:m-h*l}const Ey=30,ij=n=>!isNaN(parseFloat(n));class sj{constructor(a,s={}){this.canTrackVelocity=null,this.events={},this.updateAndNotify=l=>{var h;const u=xt.now();if(this.updatedAt!==u&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(l),this.current!==this.prev&&((h=this.events.change)==null||h.notify(this.current),this.dependents))for(const f of this.dependents)f.dirty()},this.hasAnimated=!1,this.setCurrent(a),this.owner=s.owner}setCurrent(a){this.current=a,this.updatedAt=xt.now(),this.canTrackVelocity===null&&a!==void 0&&(this.canTrackVelocity=ij(this.current))}setPrevFrameValue(a=this.current){this.prevFrameValue=a,this.prevUpdatedAt=this.updatedAt}onChange(a){return this.on("change",a)}on(a,s){this.events[a]||(this.events[a]=new gf);const l=this.events[a].add(s);return a==="change"?()=>{l(),qe.read(()=>{this.events.change.getSize()||this.stop()})}:l}clearListeners(){for(const a in this.events)this.events[a].clear()}attach(a,s){this.passiveEffect=a,this.stopPassiveEffect=s}set(a){this.passiveEffect?this.passiveEffect(a,this.updateAndNotify):this.updateAndNotify(a)}setWithVelocity(a,s,l){this.set(s),this.prev=void 0,this.prevFrameValue=a,this.prevUpdatedAt=this.updatedAt-l}jump(a,s=!0){this.updateAndNotify(a),this.prev=a,this.prevUpdatedAt=this.prevFrameValue=void 0,s&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}dirty(){var a;(a=this.events.change)==null||a.notify(this.current)}addDependent(a){this.dependents||(this.dependents=new Set),this.dependents.add(a)}removeDependent(a){this.dependents&&this.dependents.delete(a)}get(){return this.current}getPrevious(){return this.prev}getVelocity(){const a=xt.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||a-this.updatedAt>Ey)return 0;const s=Math.min(this.updatedAt-this.prevUpdatedAt,Ey);return px(parseFloat(this.current)-parseFloat(this.prevFrameValue),s)}start(a){return this.stop(),new Promise(s=>{this.hasAnimated=!0,this.animation=a(s),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){var a,s;(a=this.dependents)==null||a.clear(),(s=this.events.destroy)==null||s.notify(),this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}}function Ya(n,a){return new sj(n,a)}function Zx(n,a){if(n!=null&&n.inherit&&a){const{inherit:s,...l}=n;return{...a,...l}}return n}function Cf(n,a){const s=(n==null?void 0:n[a])??(n==null?void 0:n.default)??n;return s!==n?Zx(s,n):s}const lj={type:"spring",stiffness:500,damping:25,restSpeed:10},oj=n=>({type:"spring",stiffness:550,damping:n===0?2*Math.sqrt(550):30,restSpeed:10}),cj={type:"keyframes",duration:.8},uj={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},dj=(n,{keyframes:a})=>a.length>2?cj:Fa.has(n)?n.startsWith("scale")?oj(a[1]):lj:uj,fj=new Set(["when","delay","delayChildren","staggerChildren","staggerDirection","repeat","repeatType","repeatDelay","from","elapsed"]);function hj(n){for(const a in n)if(!fj.has(a))return!0;return!1}const Nf=(n,a,s,l={},u,h)=>f=>{const m=Cf(l,n)||{},p=m.delay||l.delay||0;let{elapsed:g=0}=l;g=g-qt(p);const v={keyframes:Array.isArray(s)?s:[null,s],ease:"easeOut",velocity:a.getVelocity(),...m,delay:-g,onUpdate:b=>{a.set(b),m.onUpdate&&m.onUpdate(b)},onComplete:()=>{f(),m.onComplete&&m.onComplete()},name:n,motionValue:a,element:h?void 0:u};hj(m)||Object.assign(v,dj(n,v)),v.duration&&(v.duration=qt(v.duration)),v.repeatDelay&&(v.repeatDelay=qt(v.repeatDelay)),v.from!==void 0&&(v.keyframes[0]=v.from);let x=!1;if((v.type===!1||v.duration===0&&!v.repeatDelay)&&(Vd(v),v.delay===0&&(x=!0)),(vr.instantAnimations||vr.skipAnimations||u!=null&&u.shouldSkipAnimations||m.skipAnimations)&&(x=!0,Vd(v),v.delay=0),v.allowFlatten=!m.type&&!m.ease,x&&!h&&a.get()!==void 0){const b=Eo(v.keyframes,m);if(b!==void 0){qe.update(()=>{v.onUpdate(b),v.onComplete()});return}}return m.isSync?new ro(v):new aj(v)},mj=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function pj(n){const a=mj.exec(n);if(!a)return[,];const[,s,l,u]=a;return[`--${s??l}`,u]}function Qx(n,a,s=1){const[l,u]=pj(n);if(!l)return;const h=window.getComputedStyle(a).getPropertyValue(l);if(h){const f=h.trim();return dx(f)?parseFloat(f):f}return xf(u)?Qx(u,a,s+1):u}function Ty(n){const a=[{},{}];return n==null||n.values.forEach((s,l)=>{a[0][l]=s.get(),a[1][l]=s.getVelocity()}),a}function Df(n,a,s,l){if(typeof a=="function"){const[u,h]=Ty(l);a=a(s!==void 0?s:n.custom,u,h)}if(typeof a=="string"&&(a=n.variants&&n.variants[a]),typeof a=="function"){const[u,h]=Ty(l);a=a(s!==void 0?s:n.custom,u,h)}return a}function Xr(n,a,s){const l=n.getProps();return Df(l,a,s!==void 0?s:l.custom,n)}const Jx=new Set(["width","height","top","left","right","bottom",...Xa]),Bd=n=>Array.isArray(n);function gj(n,a,s){n.hasValue(a)?n.getValue(a).set(s):n.addValue(a,Ya(s))}function yj(n){return Bd(n)?n[n.length-1]||0:n}function vj(n,a){const s=Xr(n,a);let{transitionEnd:l={},transition:u={},...h}=s||{};h={...h,...l};for(const f in h){const m=yj(h[f]);gj(n,f,m)}}const pt=n=>!!(n&&n.getVelocity);function xj(n){return!!(pt(n)&&n.add)}function Ld(n,a){const s=n.getValue("willChange");if(xj(s))return s.add(a);if(!s&&vr.WillChange){const l=new vr.WillChange("auto");n.addValue("willChange",l),l.add(a)}}function Af(n){return n.replace(/([A-Z])/g,a=>`-${a.toLowerCase()}`)}const bj="framerAppearId",Wx="data-"+Af(bj);function Ix(n){return n.props[Wx]}function Sj({protectedKeys:n,needsAnimating:a},s){const l=n.hasOwnProperty(s)&&a[s]!==!0;return a[s]=!1,l}function eb(n,a,{delay:s=0,transitionOverride:l,type:u}={}){let{transition:h,transitionEnd:f,...m}=a;const p=n.getDefaultTransition();h=h?Zx(h,p):p;const g=h==null?void 0:h.reduceMotion,v=h==null?void 0:h.skipAnimations;l&&(h=l);const x=[],b=u&&n.animationState&&n.animationState.getState()[u],E=h==null?void 0:h.path;E&&E.animateVisualElement(n,m,h,s,x);for(const j in m){const N=n.getValue(j,n.latestValues[j]??null),C=m[j];if(C===void 0||b&&Sj(b,j))continue;const k={delay:s,...Cf(h||{},j)};v&&(k.skipAnimations=!0);const D=N.get();if(D!==void 0&&!N.isAnimating()&&!Array.isArray(C)&&C===D&&!k.velocity){qe.update(()=>N.set(C));continue}let z=!1;if(window.MotionHandoffAnimation){const Y=Ix(n);if(Y){const A=window.MotionHandoffAnimation(Y,j,qe);A!==null&&(k.startTime=A,z=!0)}}Ld(n,j);const O=g??n.shouldReduceMotion;N.start(Nf(j,N,C,O&&Jx.has(j)?{type:!1}:k,n,z));const H=N.animation;H&&x.push(H)}if(f){const j=()=>qe.update(()=>{f&&vj(n,f)});x.length?Promise.all(x).then(j):j()}return x}function Ud(n,a,s={}){var p;const l=Xr(n,a,s.type==="exit"?(p=n.presenceContext)==null?void 0:p.custom:void 0);let{transition:u=n.getDefaultTransition()||{}}=l||{};s.transitionOverride&&(u=s.transitionOverride);const h=l?()=>Promise.all(eb(n,l,s)):()=>Promise.resolve(),f=n.variantChildren&&n.variantChildren.size?(g=0)=>{const{delayChildren:v=0,staggerChildren:x,staggerDirection:b}=u;return wj(n,a,g,v,x,b,s)}:()=>Promise.resolve(),{when:m}=u;if(m){const[g,v]=m==="beforeChildren"?[h,f]:[f,h];return g().then(()=>v())}else return Promise.all([h(),f(s.delay)])}function wj(n,a,s=0,l=0,u=0,h=1,f){const m=[];for(const p of n.variantChildren)p.notify("AnimationStart",a),m.push(Ud(p,a,{...f,delay:s+(typeof l=="function"?0:l)+Kx(n.variantChildren,p,l,u,h)}).then(()=>p.notify("AnimationComplete",a)));return Promise.all(m)}function jj(n,a,s={}){n.notify("AnimationStart",a);let l;if(Array.isArray(a)){const u=a.map(h=>Ud(n,h,s));l=Promise.all(u)}else if(typeof a=="string")l=Ud(n,a,s);else{const u=typeof a=="function"?Xr(n,a,s.custom):a;l=Promise.all(eb(n,u,s))}return l.then(()=>{n.notify("AnimationComplete",a)})}const Ej={test:n=>n==="auto",parse:n=>n},tb=n=>a=>a.test(n),nb=[Ga,he,xn,qn,Qw,Zw,Ej],Cy=n=>nb.find(tb(n));function Tj(n){return typeof n=="number"?n===0:n!==null?n==="none"||n==="0"||hx(n):!0}const Cj=new Set(["brightness","contrast","saturate","opacity"]);function Nj(n){const[a,s]=n.slice(0,-1).split("(");if(a==="drop-shadow")return n;const[l]=s.match(bf)||[];if(!l)return n;const u=s.replace(l,"");let h=Cj.has(a)?1:0;return l!==s&&(h*=100),a+"("+h+u+")"}const Dj=/\b([a-z-]*)\(.*?\)/gu,Hd={...cn,getAnimatableNone:n=>{const a=n.match(Dj);return a?a.map(Nj).join(" "):n}},qd={...cn,getAnimatableNone:n=>{const a=cn.parse(n);return cn.createTransformer(n)(a.map(l=>typeof l=="number"?0:typeof l=="object"?{...l,alpha:1}:l))}},Ny={...Ga,transform:Math.round},Aj={rotate:qn,pathRotation:qn,rotateX:qn,rotateY:qn,rotateZ:qn,scale:Ml,scaleX:Ml,scaleY:Ml,scaleZ:Ml,skew:qn,skewX:qn,skewY:qn,distance:he,translateX:he,translateY:he,translateZ:he,x:he,y:he,z:he,perspective:he,transformPerspective:he,opacity:Ii,originX:hy,originY:hy,originZ:he},ao={borderWidth:he,borderTopWidth:he,borderRightWidth:he,borderBottomWidth:he,borderLeftWidth:he,borderRadius:he,borderTopLeftRadius:he,borderTopRightRadius:he,borderBottomRightRadius:he,borderBottomLeftRadius:he,width:he,maxWidth:he,height:he,maxHeight:he,top:he,right:he,bottom:he,left:he,inset:he,insetBlock:he,insetBlockStart:he,insetBlockEnd:he,insetInline:he,insetInlineStart:he,insetInlineEnd:he,padding:he,paddingTop:he,paddingRight:he,paddingBottom:he,paddingLeft:he,paddingBlock:he,paddingBlockStart:he,paddingBlockEnd:he,paddingInline:he,paddingInlineStart:he,paddingInlineEnd:he,margin:he,marginTop:he,marginRight:he,marginBottom:he,marginLeft:he,marginBlock:he,marginBlockStart:he,marginBlockEnd:he,marginInline:he,marginInlineStart:he,marginInlineEnd:he,fontSize:he,backgroundPositionX:he,backgroundPositionY:he,...Aj,zIndex:Ny,fillOpacity:Ii,strokeOpacity:Ii,numOctaves:Ny},Mj={...ao,color:rt,backgroundColor:rt,outlineColor:rt,fill:rt,stroke:rt,borderColor:rt,borderTopColor:rt,borderRightColor:rt,borderBottomColor:rt,borderLeftColor:rt,filter:Hd,WebkitFilter:Hd,mask:qd,WebkitMask:qd},rb=n=>Mj[n],kj=new Set([Hd,qd]);function ab(n,a){let s=rb(n);return kj.has(s)||(s=cn),s.getAnimatableNone?s.getAnimatableNone(a):void 0}const Rj=new Set(["auto","none","0"]);function Oj(n,a,s){let l=0,u;for(;l<n.length&&!u;){const h=n[l];typeof h=="string"&&!Rj.has(h)&&qa(h).values.length&&(u=n[l]),l++}if(u&&s)for(const h of a)n[h]=ab(s,u)}class zj extends Tf{constructor(a,s,l,u,h){super(a,s,l,u,h,!0)}readKeyframes(){const{unresolvedKeyframes:a,element:s,name:l}=this;if(!s||!s.current)return;super.readKeyframes();for(let v=0;v<a.length;v++){let x=a[v];if(typeof x=="string"&&(x=x.trim(),xf(x))){const b=Qx(x,s.current);b!==void 0&&(a[v]=b),v===a.length-1&&(this.finalKeyframe=x)}}if(this.resolveNoneKeyframes(),!Jx.has(l)||a.length!==2)return;const[u,h]=a,f=Cy(u),m=Cy(h),p=fy(u),g=fy(h);if(p!==g&&gr[l]){this.needsMeasurement=!0;return}if(f!==m)if(Sy(f)&&Sy(m))for(let v=0;v<a.length;v++){const x=a[v];typeof x=="string"&&(a[v]=parseFloat(x))}else gr[l]&&(this.needsMeasurement=!0)}resolveNoneKeyframes(){const{unresolvedKeyframes:a,name:s}=this,l=[];for(let u=0;u<a.length;u++)(a[u]===null||Tj(a[u]))&&l.push(u);l.length&&Oj(a,l,s)}measureInitialState(){const{element:a,unresolvedKeyframes:s,name:l}=this;if(!a||!a.current)return;l==="height"&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=gr[l](a.measureViewportBox(),window.getComputedStyle(a.current)),s[0]=this.measuredOrigin;const u=s[s.length-1];u!==void 0&&a.getValue(l,u).jump(u,!1)}measureEndState(){var m;const{element:a,name:s,unresolvedKeyframes:l}=this;if(!a||!a.current)return;const u=a.getValue(s);u&&u.jump(this.measuredOrigin,!1);const h=l.length-1,f=l[h];l[h]=gr[s](a.measureViewportBox(),window.getComputedStyle(a.current)),f!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=f),(m=this.removedTransforms)!=null&&m.length&&this.removedTransforms.forEach(([p,g])=>{a.getValue(p).set(g)}),this.resolveNoneKeyframes()}}const Mf=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"];function ib(n,a,s){if(n==null)return[];if(n instanceof EventTarget)return[n];if(typeof n=="string"){let l=document;const u=(s==null?void 0:s[n])??l.querySelectorAll(n);return u?Array.from(u):[]}return Array.from(n).filter(l=>l!=null)}const Yd=(n,a)=>a&&typeof n=="number"?a.transform(n):n;function Pl(n){return fx(n)&&"offsetHeight"in n&&!("ownerSVGElement"in n)}const{schedule:kf}=Cx(queueMicrotask,!1),on={x:!1,y:!1};function sb(){return on.x||on.y}function _j(n){return n==="x"||n==="y"?on[n]?null:(on[n]=!0,()=>{on[n]=!1}):on.x||on.y?null:(on.x=on.y=!0,()=>{on.x=on.y=!1})}function lb(n,a){const s=ib(n),l=new AbortController,u={passive:!0,...a,signal:l.signal};return[s,u,()=>l.abort()]}function Vj(n){return!(n.pointerType==="touch"||sb())}function Bj(n,a,s={}){const[l,u,h]=lb(n,s);return l.forEach(f=>{let m=!1,p=!1,g;const v=()=>{f.removeEventListener("pointerleave",j)},x=C=>{g&&(g(C),g=void 0),v()},b=C=>{m=!1,window.removeEventListener("pointerup",b),window.removeEventListener("pointercancel",b),p&&(p=!1,x(C))},E=()=>{m=!0,window.addEventListener("pointerup",b,u),window.addEventListener("pointercancel",b,u)},j=C=>{if(C.pointerType!=="touch"){if(m){p=!0;return}x(C)}},N=C=>{if(!Vj(C))return;p=!1;const k=a(f,C);typeof k=="function"&&(g=k,f.addEventListener("pointerleave",j,u))};f.addEventListener("pointerenter",N,u),f.addEventListener("pointerdown",E,u)}),h}const ob=(n,a)=>a?n===a?!0:ob(n,a.parentElement):!1,Rf=n=>n.pointerType==="mouse"?typeof n.button!="number"||n.button<=0:n.isPrimary!==!1,Lj=new Set(["BUTTON","INPUT","SELECT","TEXTAREA","A"]);function Uj(n){return Lj.has(n.tagName)||n.isContentEditable===!0}const Hj=new Set(["INPUT","SELECT","TEXTAREA"]);function qj(n){return Hj.has(n.tagName)||n.isContentEditable===!0}const Gl=new WeakSet;function Dy(n){return a=>{a.key==="Enter"&&n(a)}}function rd(n,a){n.dispatchEvent(new PointerEvent("pointer"+a,{isPrimary:!0,bubbles:!0}))}const Yj=(n,a)=>{const s=n.currentTarget;if(!s)return;const l=Dy(()=>{if(Gl.has(s))return;rd(s,"down");const u=Dy(()=>{rd(s,"up")}),h=()=>rd(s,"cancel");s.addEventListener("keyup",u,a),s.addEventListener("blur",h,a)});s.addEventListener("keydown",l,a),s.addEventListener("blur",()=>s.removeEventListener("keydown",l),a)};function Ay(n){return Rf(n)&&!sb()}const My=new WeakSet;function Pj(n,a,s={}){const[l,u,h]=lb(n,s),f=m=>{const p=m.currentTarget;if(!Ay(m)||My.has(m))return;Gl.add(p),s.stopPropagation&&My.add(m);const g=a(p,m),v={...u,capture:!0},x=(j,N)=>{window.removeEventListener("pointerup",b,v),window.removeEventListener("pointercancel",E,v),Gl.has(p)&&Gl.delete(p),Ay(j)&&typeof g=="function"&&g(j,{success:N})},b=j=>{x(j,p===window||p===document||s.useGlobalTarget||ob(p,j.target))},E=j=>{x(j,!1)};window.addEventListener("pointerup",b,v),window.addEventListener("pointercancel",E,v)};return l.forEach(m=>{(s.useGlobalTarget?window:m).addEventListener("pointerdown",f,u),Pl(m)&&(m.addEventListener("focus",g=>Yj(g,u)),!Uj(m)&&!m.hasAttribute("tabindex")&&(m.tabIndex=0))}),h}function Of(n){return fx(n)&&"ownerSVGElement"in n}const Xl=new WeakMap;let pr;const cb=(n,a,s)=>(l,u)=>u&&u[0]?u[0][n+"Size"]:Of(l)&&"getBBox"in l?l.getBBox()[a]:l[s],Gj=cb("inline","width","offsetWidth"),Xj=cb("block","height","offsetHeight");function Fj({target:n,borderBoxSize:a}){var s;(s=Xl.get(n))==null||s.forEach(l=>{l(n,{get width(){return Gj(n,a)},get height(){return Xj(n,a)}})})}function $j(n){n.forEach(Fj)}function Kj(){typeof ResizeObserver>"u"||(pr=new ResizeObserver($j))}function Zj(n,a){pr||Kj();const s=ib(n);return s.forEach(l=>{let u=Xl.get(l);u||(u=new Set,Xl.set(l,u)),u.add(a),pr==null||pr.observe(l)}),()=>{s.forEach(l=>{const u=Xl.get(l);u==null||u.delete(a),u!=null&&u.size||pr==null||pr.unobserve(l)})}}const Fl=new Set;let La;function Qj(){La=()=>{const n={get width(){return window.innerWidth},get height(){return window.innerHeight}};Fl.forEach(a=>a(n))},window.addEventListener("resize",La)}function Jj(n){return Fl.add(n),La||Qj(),()=>{Fl.delete(n),!Fl.size&&typeof La=="function"&&(window.removeEventListener("resize",La),La=void 0)}}function ky(n,a){return typeof n=="function"?Jj(n):Zj(n,a)}function Wj(n){return Of(n)&&n.tagName==="svg"}const Ij=[...nb,rt,cn],eE=n=>Ij.find(tb(n)),Ry=()=>({translate:0,scale:1,origin:0,originPoint:0}),Ua=()=>({x:Ry(),y:Ry()}),Oy=()=>({min:0,max:0}),it=()=>({x:Oy(),y:Oy()}),tE=new WeakMap;function To(n){return n!==null&&typeof n=="object"&&typeof n.start=="function"}function es(n){return typeof n=="string"||Array.isArray(n)}const zf=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],_f=["initial",...zf];function Co(n){return To(n.animate)||_f.some(a=>es(n[a]))}function ub(n){return!!(Co(n)||n.variants)}function nE(n,a,s){for(const l in a){const u=a[l],h=s[l];if(pt(u))n.addValue(l,u);else if(pt(h))n.addValue(l,Ya(u,{owner:n}));else if(h!==u)if(n.hasValue(l)){const f=n.getValue(l);f.liveStyle===!0?f.jump(u):f.hasAnimated||f.set(u)}else{const f=n.getStaticValue(l);n.addValue(l,Ya(f!==void 0?f:u,{owner:n}))}}for(const l in s)a[l]===void 0&&n.removeValue(l);return a}const io={current:null},Vf={current:!1},rE=typeof window<"u";function db(){if(Vf.current=!0,!!rE)if(window.matchMedia){const n=window.matchMedia("(prefers-reduced-motion)"),a=()=>io.current=n.matches;n.addEventListener("change",a),a()}else io.current=!1}const zy=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"];let so={};function fb(n){so=n}function aE(){return so}class iE{scrapeMotionValuesFromProps(a,s,l){return{}}constructor({parent:a,props:s,presenceContext:l,reducedMotionConfig:u,skipAnimations:h,blockInitialAnimation:f,visualState:m},p={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.shouldSkipAnimations=!1,this.values=new Map,this.KeyframeResolver=Tf,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.hasBeenMounted=!1,this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{const E=xt.now();this.renderScheduledAt<E&&(this.renderScheduledAt=E,qe.render(this.render,!1,!0))};const{latestValues:g,renderState:v}=m;this.latestValues=g,this.baseTarget={...g},this.initialValues=s.initial?{...g}:{},this.renderState=v,this.parent=a,this.props=s,this.presenceContext=l,this.depth=a?a.depth+1:0,this.reducedMotionConfig=u,this.skipAnimationsConfig=h,this.options=p,this.blockInitialAnimation=!!f,this.isControllingVariants=Co(s),this.isVariantNode=ub(s),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(a&&a.current);const{willChange:x,...b}=this.scrapeMotionValuesFromProps(s,{},this);for(const E in b){const j=b[E];g[E]!==void 0&&pt(j)&&j.set(g[E])}}mount(a){var s,l;if(this.hasBeenMounted)for(const u in this.initialValues)(s=this.values.get(u))==null||s.jump(this.initialValues[u]),this.latestValues[u]=this.initialValues[u];this.current=a,tE.set(a,this),this.projection&&!this.projection.instance&&this.projection.mount(a),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((u,h)=>this.bindToMotionValue(h,u)),this.reducedMotionConfig==="never"?this.shouldReduceMotion=!1:this.reducedMotionConfig==="always"?this.shouldReduceMotion=!0:(Vf.current||db(),this.shouldReduceMotion=io.current),this.shouldSkipAnimations=this.skipAnimationsConfig??!1,(l=this.parent)==null||l.addChild(this),this.update(this.props,this.presenceContext),this.hasBeenMounted=!0}unmount(){var a;this.projection&&this.projection.unmount(),xr(this.notifyUpdate),xr(this.render),this.valueSubscriptions.forEach(s=>s()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),(a=this.parent)==null||a.removeChild(this);for(const s in this.events)this.events[s].clear();for(const s in this.features){const l=this.features[s];l&&(l.unmount(),l.isMounted=!1)}this.current=null}addChild(a){this.children.add(a),this.enteringChildren??(this.enteringChildren=new Set),this.enteringChildren.add(a)}removeChild(a){this.children.delete(a),this.enteringChildren&&this.enteringChildren.delete(a)}bindToMotionValue(a,s){if(this.valueSubscriptions.has(a)&&this.valueSubscriptions.get(a)(),s.accelerate&&$x.has(a)&&this.current instanceof HTMLElement){const{factory:f,keyframes:m,times:p,ease:g,duration:v}=s.accelerate,x=new Xx({element:this.current,name:a,keyframes:m,times:p,ease:g,duration:qt(v)}),b=f(x);this.valueSubscriptions.set(a,()=>{b(),x.cancel()});return}const l=Fa.has(a);l&&this.onBindTransform&&this.onBindTransform();const u=s.on("change",f=>{this.latestValues[a]=f,this.props.onUpdate&&qe.preRender(this.notifyUpdate),l&&this.projection&&(this.projection.isTransformDirty=!0),this.scheduleRender()});let h;typeof window<"u"&&window.MotionCheckAppearSync&&(h=window.MotionCheckAppearSync(this,a,s)),this.valueSubscriptions.set(a,()=>{u(),h&&h()})}sortNodePosition(a){return!this.current||!this.sortInstanceNodePosition||this.type!==a.type?0:this.sortInstanceNodePosition(this.current,a.current)}updateFeatures(){let a="animation";for(a in so){const s=so[a];if(!s)continue;const{isEnabled:l,Feature:u}=s;if(!this.features[a]&&u&&l(this.props)&&(this.features[a]=new u(this)),this.features[a]){const h=this.features[a];h.isMounted?h.update():(h.mount(),h.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):it()}getStaticValue(a){return this.latestValues[a]}setStaticValue(a,s){this.latestValues[a]=s}update(a,s){(a.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=a,this.prevPresenceContext=this.presenceContext,this.presenceContext=s;for(let l=0;l<zy.length;l++){const u=zy[l];this.propEventSubscriptions[u]&&(this.propEventSubscriptions[u](),delete this.propEventSubscriptions[u]);const h="on"+u,f=a[h];f&&(this.propEventSubscriptions[u]=this.on(u,f))}this.prevMotionValues=nE(this,this.scrapeMotionValuesFromProps(a,this.prevProps||{},this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue()}getProps(){return this.props}getVariant(a){return this.props.variants?this.props.variants[a]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(a){const s=this.getClosestVariantNode();if(s)return s.variantChildren&&s.variantChildren.add(a),()=>s.variantChildren.delete(a)}addValue(a,s){const l=this.values.get(a);s!==l&&(l&&this.removeValue(a),this.bindToMotionValue(a,s),this.values.set(a,s),this.latestValues[a]=s.get())}removeValue(a){this.values.delete(a);const s=this.valueSubscriptions.get(a);s&&(s(),this.valueSubscriptions.delete(a)),delete this.latestValues[a],this.removeValueFromRenderState(a,this.renderState)}hasValue(a){return this.values.has(a)}getValue(a,s){if(this.props.values&&this.props.values[a])return this.props.values[a];let l=this.values.get(a);return l===void 0&&s!==void 0&&(l=Ya(s===null?void 0:s,{owner:this}),this.addValue(a,l)),l}readValue(a,s){let l=this.latestValues[a]!==void 0||!this.current?this.latestValues[a]:this.getBaseTargetFromProps(this.props,a)??this.readValueFromInstance(this.current,a,this.options);return l!=null&&(typeof l=="string"&&(dx(l)||hx(l))?l=parseFloat(l):!eE(l)&&cn.test(s)&&(l=ab(a,s)),this.setBaseTarget(a,pt(l)?l.get():l)),pt(l)?l.get():l}setBaseTarget(a,s){this.baseTarget[a]=s}getBaseTarget(a){var h;const{initial:s}=this.props;let l;if(typeof s=="string"||typeof s=="object"){const f=Df(this.props,s,(h=this.presenceContext)==null?void 0:h.custom);f&&(l=f[a])}if(s&&l!==void 0)return l;const u=this.getBaseTargetFromProps(this.props,a);return u!==void 0&&!pt(u)?u:this.initialValues[a]!==void 0&&l===void 0?void 0:this.baseTarget[a]}on(a,s){return this.events[a]||(this.events[a]=new gf),this.events[a].add(s)}notify(a,...s){this.events[a]&&this.events[a].notify(...s)}scheduleRenderMicrotask(){kf.render(this.render)}}class hb extends iE{constructor(){super(...arguments),this.KeyframeResolver=zj}sortInstanceNodePosition(a,s){return a.compareDocumentPosition(s)&2?1:-1}getBaseTargetFromProps(a,s){const l=a.style;return l?l[s]:void 0}removeValueFromRenderState(a,{vars:s,style:l}){delete s[a],delete l[a]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);const{children:a}=this.props;pt(a)&&(this.childSubscription=a.on("change",s=>{this.current&&(this.current.textContent=`${s}`)}))}}class Sr{constructor(a){this.isMounted=!1,this.node=a}update(){}}function mb({top:n,left:a,right:s,bottom:l}){return{x:{min:a,max:s},y:{min:n,max:l}}}function sE({x:n,y:a}){return{top:a.min,right:n.max,bottom:a.max,left:n.min}}function lE(n,a){if(!a)return n;const s=a({x:n.left,y:n.top}),l=a({x:n.right,y:n.bottom});return{top:s.y,left:s.x,bottom:l.y,right:l.x}}function ad(n){return n===void 0||n===1}function Pd({scale:n,scaleX:a,scaleY:s}){return!ad(n)||!ad(a)||!ad(s)}function qr(n){return Pd(n)||pb(n)||n.z||n.rotate||n.rotateX||n.rotateY||n.skewX||n.skewY}function pb(n){return _y(n.x)||_y(n.y)}function _y(n){return n&&n!=="0%"}function lo(n,a,s){const l=n-s,u=a*l;return s+u}function Vy(n,a,s,l,u){return u!==void 0&&(n=lo(n,u,l)),lo(n,s,l)+a}function Gd(n,a=0,s=1,l,u){n.min=Vy(n.min,a,s,l,u),n.max=Vy(n.max,a,s,l,u)}function gb(n,{x:a,y:s}){Gd(n.x,a.translate,a.scale,a.originPoint),Gd(n.y,s.translate,s.scale,s.originPoint)}const By=.999999999999,Ly=1.0000000000001;function oE(n,a,s,l=!1){var m;const u=s.length;if(!u)return;a.x=a.y=1;let h,f;for(let p=0;p<u;p++){h=s[p],f=h.projectionDelta;const{visualElement:g}=h.options;g&&g.props.style&&g.props.style.display==="contents"||(l&&h.options.layoutScroll&&h.scroll&&h!==h.root&&(yn(n.x,-h.scroll.offset.x),yn(n.y,-h.scroll.offset.y)),f&&(a.x*=f.x.scale,a.y*=f.y.scale,gb(n,f)),l&&qr(h.latestValues)&&$l(n,h.latestValues,(m=h.layout)==null?void 0:m.layoutBox))}a.x<Ly&&a.x>By&&(a.x=1),a.y<Ly&&a.y>By&&(a.y=1)}function yn(n,a){n.min+=a,n.max+=a}function Uy(n,a,s,l,u=.5){const h=He(n.min,n.max,u);Gd(n,a,s,h,l)}function Hy(n,a){return typeof n=="string"?parseFloat(n)/100*(a.max-a.min):n}function $l(n,a,s){const l=s??n;Uy(n.x,Hy(a.x,l.x),a.scaleX,a.scale,a.originX),Uy(n.y,Hy(a.y,l.y),a.scaleY,a.scale,a.originY)}function yb(n,a){return mb(lE(n.getBoundingClientRect(),a))}function cE(n,a,s){const l=yb(n,s),{scroll:u}=a;return u&&(yn(l.x,u.offset.x),yn(l.y,u.offset.y)),l}const uE={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},dE=Xa.length;function fE(n,a,s){let l="",u=!0;for(let f=0;f<dE;f++){const m=Xa[f],p=n[m];if(p===void 0)continue;let g=!0;if(typeof p=="number")g=p===(m.startsWith("scale")?1:0);else{const v=parseFloat(p);g=m.startsWith("scale")?v===1:v===0}if(!g||s){const v=Yd(p,ao[m]);if(!g){u=!1;const x=uE[m]||m;l+=`${x}(${v}) `}s&&(a[m]=v)}}const h=n.pathRotation;return h&&(u=!1,l+=`rotate(${Yd(h,ao.pathRotation)}) `),l=l.trim(),s?l=s(a,u?"":l):u&&(l="none"),l}function Bf(n,a,s){const{style:l,vars:u,transformOrigin:h}=n;let f=!1,m=!1;for(const p in a){const g=a[p];if(Fa.has(p)){f=!0;continue}else if(Dx(p)){u[p]=g;continue}else{const v=Yd(g,ao[p]);p.startsWith("origin")?(m=!0,h[p]=v):l[p]=v}}if(a.transform||(f||s?l.transform=fE(a,n.transform,s):l.transform&&(l.transform="none")),m){const{originX:p="50%",originY:g="50%",originZ:v=0}=h;l.transformOrigin=`${p} ${g} ${v}`}}function vb(n,{style:a,vars:s},l,u){const h=n.style;let f;for(f in a)h[f]=a[f];u==null||u.applyProjectionStyles(h,l);for(f in s)h.setProperty(f,s[f])}function qy(n,a){return a.max===a.min?0:n/(a.max-a.min)*100}const Pi={correct:(n,a)=>{if(!a.target)return n;if(typeof n=="string")if(he.test(n))n=parseFloat(n);else return n;const s=qy(n,a.target.x),l=qy(n,a.target.y);return`${s}% ${l}%`}},hE={correct:(n,{treeScale:a,projectionDelta:s})=>{const l=n,u=cn.parse(n);if(u.length>5)return l;const h=cn.createTransformer(n),f=typeof u[0]!="number"?1:0,m=s.x.scale*a.x,p=s.y.scale*a.y;u[0+f]/=m,u[1+f]/=p;const g=He(m,p,.5);return typeof u[2+f]=="number"&&(u[2+f]/=g),typeof u[3+f]=="number"&&(u[3+f]/=g),h(u)}},Xd={borderRadius:{...Pi,applyTo:[...Mf]},borderTopLeftRadius:Pi,borderTopRightRadius:Pi,borderBottomLeftRadius:Pi,borderBottomRightRadius:Pi,boxShadow:hE};function xb(n,{layout:a,layoutId:s}){return Fa.has(n)||n.startsWith("origin")||(a||s!==void 0)&&(!!Xd[n]||n==="opacity")}function Lf(n,a,s){var f;const l=n.style,u=a==null?void 0:a.style,h={};if(!l)return h;for(const m in l)(pt(l[m])||u&&pt(u[m])||xb(m,n)||((f=s==null?void 0:s.getValue(m))==null?void 0:f.liveStyle)!==void 0)&&(h[m]=l[m]);return h}function mE(n){return window.getComputedStyle(n)}class pE extends hb{constructor(){super(...arguments),this.type="html",this.renderInstance=vb}mount(a){jo(!!a.style),super.mount(a)}readValueFromInstance(a,s){var l;if(Fa.has(s))return(l=this.projection)!=null&&l.isProjecting?kd(s):V2(a,s);{const u=mE(a),h=(Dx(s)?u.getPropertyValue(s):u[s])||0;return typeof h=="string"?h.trim():h}}measureInstanceViewportBox(a,{transformPagePoint:s}){return yb(a,s)}build(a,s,l){Bf(a,s,l.transformTemplate)}scrapeMotionValuesFromProps(a,s,l){return Lf(a,s,l)}}const gE={offset:"stroke-dashoffset",array:"stroke-dasharray"},yE={offset:"strokeDashoffset",array:"strokeDasharray"};function vE(n,a,s=1,l=0,u=!0){n.pathLength=1;const h=u?gE:yE;n[h.offset]=`${-l}`,n[h.array]=`${a} ${s}`}const xE=["offsetDistance","offsetPath","offsetRotate","offsetAnchor"];function bb(n,{attrX:a,attrY:s,attrScale:l,pathLength:u,pathSpacing:h=1,pathOffset:f=0,...m},p,g,v){if(Bf(n,m,g),p){n.style.viewBox&&(n.attrs.viewBox=n.style.viewBox);return}n.attrs=n.style,n.style={};const{attrs:x,style:b}=n;x.transform&&(b.transform=x.transform,delete x.transform),(b.transform||x.transformOrigin)&&(b.transformOrigin=x.transformOrigin??"50% 50%",delete x.transformOrigin),b.transform&&(b.transformBox=(v==null?void 0:v.transformBox)??"fill-box",delete x.transformBox);for(const E of xE)x[E]!==void 0&&(b[E]=x[E],delete x[E]);a!==void 0&&(x.x=a),s!==void 0&&(x.y=s),l!==void 0&&(x.scale=l),u!==void 0&&vE(x,u,h,f,!1)}const Sb=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]),wb=n=>typeof n=="string"&&n.toLowerCase()==="svg";function bE(n,a,s,l){vb(n,a,void 0,l);for(const u in a.attrs)n.setAttribute(Sb.has(u)?u:Af(u),a.attrs[u])}function jb(n,a,s){const l=Lf(n,a,s);for(const u in n)if(pt(n[u])||pt(a[u])){const h=Xa.indexOf(u)!==-1?"attr"+u.charAt(0).toUpperCase()+u.substring(1):u;l[h]=n[u]}return l}class SE extends hb{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1,this.measureInstanceViewportBox=it}getBaseTargetFromProps(a,s){return a[s]}readValueFromInstance(a,s){if(Fa.has(s)){const l=rb(s);return l&&l.default||0}return s=Sb.has(s)?s:Af(s),a.getAttribute(s)}scrapeMotionValuesFromProps(a,s,l){return jb(a,s,l)}build(a,s,l){bb(a,s,this.isSVGTag,l.transformTemplate,l.style)}renderInstance(a,s,l,u){bE(a,s,l,u)}mount(a){this.isSVGTag=wb(a.tagName),super.mount(a)}}const wE=_f.length;function Eb(n){if(!n)return;if(!n.isControllingVariants){const s=n.parent?Eb(n.parent)||{}:{};return n.props.initial!==void 0&&(s.initial=n.props.initial),s}const a={};for(let s=0;s<wE;s++){const l=_f[s],u=n.props[l];(es(u)||u===!1)&&(a[l]=u)}return a}function Tb(n,a){if(!Array.isArray(a))return!1;const s=a.length;if(s!==n.length)return!1;for(let l=0;l<s;l++)if(a[l]!==n[l])return!1;return!0}const jE=[...zf].reverse(),EE=zf.length;function TE(n){return a=>Promise.all(a.map(({animation:s,options:l})=>jj(n,s,l)))}function CE(n){let a=TE(n),s=Yy(),l=!0,u=!1;const h=g=>(v,x)=>{var E;const b=Xr(n,x,g==="exit"?(E=n.presenceContext)==null?void 0:E.custom:void 0);if(b){const{transition:j,transitionEnd:N,...C}=b;v={...v,...C,...N}}return v};function f(g){a=g(n)}function m(g){const{props:v}=n,x=Eb(n.parent)||{},b=[],E=new Set;let j={},N=1/0;for(let k=0;k<EE;k++){const D=jE[k],z=s[D],O=v[D]!==void 0?v[D]:x[D],H=es(O),Y=D===g?z.isActive:null;Y===!1&&(N=k);let A=O===x[D]&&O!==v[D]&&H;if(A&&(l||u)&&n.manuallyAnimateOnMount&&(A=!1),z.protectedKeys={...j},!z.isActive&&Y===null||!O&&!z.prevProp||To(O)||typeof O=="boolean")continue;if(D==="exit"&&z.isActive&&Y!==!0){z.prevResolvedValues&&(j={...j,...z.prevResolvedValues});continue}const L=NE(z.prevProp,O);let B=L||D===g&&z.isActive&&!A&&H||k>N&&H,V=!1;const $=Array.isArray(O)?O:[O];let J=$.reduce(h(D),{});Y===!1&&(J={});const{prevResolvedValues:oe={}}=z,ce={...oe,...J},le=Z=>{B=!0,E.has(Z)&&(V=!0,E.delete(Z)),z.needsAnimating[Z]=!0;const X=n.getValue(Z);X&&(X.liveStyle=!1)};for(const Z in ce){const X=J[Z],re=oe[Z];if(j.hasOwnProperty(Z))continue;let T=!1;Bd(X)&&Bd(re)?T=!Tb(X,re)||L:T=X!==re,T?X!=null?le(Z):E.add(Z):X!==void 0&&E.has(Z)?le(Z):z.protectedKeys[Z]=!0}z.prevProp=O,z.prevResolvedValues=J,z.isActive&&(j={...j,...J}),(l||u)&&n.blockInitialAnimation&&(B=!1);const U=A&&L;B&&(!U||V)&&b.push(...$.map(Z=>{const X={type:D};if(typeof Z=="string"&&(l||u)&&!U&&n.manuallyAnimateOnMount&&n.parent){const{parent:re}=n,T=Xr(re,Z);if(re.enteringChildren&&T){const{delayChildren:R}=T.transition||{};X.delay=Kx(re.enteringChildren,n,R)}}return{animation:Z,options:X}}))}if(E.size){const k={};if(typeof v.initial!="boolean"){const D=Xr(n,Array.isArray(v.initial)?v.initial[0]:v.initial);D&&D.transition&&(k.transition=D.transition)}E.forEach(D=>{const z=n.getBaseTarget(D),O=n.getValue(D);O&&(O.liveStyle=!0),k[D]=z??null}),b.push({animation:k})}let C=!!b.length;return l&&(v.initial===!1||v.initial===v.animate)&&!n.manuallyAnimateOnMount&&(C=!1),l=!1,u=!1,C?a(b):Promise.resolve()}function p(g,v){var b;if(s[g].isActive===v)return Promise.resolve();(b=n.variantChildren)==null||b.forEach(E=>{var j;return(j=E.animationState)==null?void 0:j.setActive(g,v)}),s[g].isActive=v;const x=m(g);for(const E in s)s[E].protectedKeys={};return x}return{animateChanges:m,setActive:p,setAnimateFunction:f,getState:()=>s,reset:()=>{s=Yy(),u=!0}}}function NE(n,a){return typeof a=="string"?a!==n:Array.isArray(a)?!Tb(a,n):!1}function Hr(n=!1){return{isActive:n,protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}function Yy(){return{animate:Hr(!0),whileInView:Hr(),whileHover:Hr(),whileTap:Hr(),whileDrag:Hr(),whileFocus:Hr(),exit:Hr()}}function Fd(n,a){n.min=a.min,n.max=a.max}function ln(n,a){Fd(n.x,a.x),Fd(n.y,a.y)}function Py(n,a){n.translate=a.translate,n.scale=a.scale,n.originPoint=a.originPoint,n.origin=a.origin}const Cb=1e-4,DE=1-Cb,AE=1+Cb,Nb=.01,ME=0-Nb,kE=0+Nb;function bt(n){return n.max-n.min}function RE(n,a,s){return Math.abs(n-a)<=s}function Gy(n,a,s,l=.5){n.origin=l,n.originPoint=He(a.min,a.max,n.origin),n.scale=bt(s)/bt(a),n.translate=He(s.min,s.max,n.origin)-n.originPoint,(n.scale>=DE&&n.scale<=AE||isNaN(n.scale))&&(n.scale=1),(n.translate>=ME&&n.translate<=kE||isNaN(n.translate))&&(n.translate=0)}function Zi(n,a,s,l){Gy(n.x,a.x,s.x,l?l.originX:void 0),Gy(n.y,a.y,s.y,l?l.originY:void 0)}function Xy(n,a,s,l=0){const u=l?He(s.min,s.max,l):s.min;n.min=u+a.min,n.max=n.min+bt(a)}function OE(n,a,s,l){Xy(n.x,a.x,s.x,l==null?void 0:l.x),Xy(n.y,a.y,s.y,l==null?void 0:l.y)}function Fy(n,a,s,l=0){const u=l?He(s.min,s.max,l):s.min;n.min=a.min-u,n.max=n.min+bt(a)}function oo(n,a,s,l){Fy(n.x,a.x,s.x,l==null?void 0:l.x),Fy(n.y,a.y,s.y,l==null?void 0:l.y)}function $y(n,a,s,l,u){return n-=a,n=lo(n,1/s,l),u!==void 0&&(n=lo(n,1/u,l)),n}function zE(n,a=0,s=1,l=.5,u,h=n,f=n){if(xn.test(a)&&(a=parseFloat(a),a=He(f.min,f.max,a/100)-f.min),typeof a!="number")return;let m=He(h.min,h.max,l);n===h&&(m-=a),n.min=$y(n.min,a,s,m,u),n.max=$y(n.max,a,s,m,u)}function Ky(n,a,[s,l,u],h,f){zE(n,a[s],a[l],a[u],a.scale,h,f)}const _E=["x","scaleX","originX"],VE=["y","scaleY","originY"];function Zy(n,a,s,l){Ky(n.x,a,_E,s?s.x:void 0,l?l.x:void 0),Ky(n.y,a,VE,s?s.y:void 0,l?l.y:void 0)}function Qy(n){return n.translate===0&&n.scale===1}function Db(n){return Qy(n.x)&&Qy(n.y)}function Jy(n,a){return n.min===a.min&&n.max===a.max}function BE(n,a){return Jy(n.x,a.x)&&Jy(n.y,a.y)}function Wy(n,a){return Math.round(n.min)===Math.round(a.min)&&Math.round(n.max)===Math.round(a.max)}function Ab(n,a){return Wy(n.x,a.x)&&Wy(n.y,a.y)}function Iy(n){return bt(n.x)/bt(n.y)}function ev(n,a){return n.translate===a.translate&&n.scale===a.scale&&n.originPoint===a.originPoint}function gn(n){return[n("x"),n("y")]}function LE(n,a,s){let l="";const u=n.x.translate/a.x,h=n.y.translate/a.y,f=(s==null?void 0:s.z)||0;if((u||h||f)&&(l=`translate3d(${u}px, ${h}px, ${f}px) `),(a.x!==1||a.y!==1)&&(l+=`scale(${1/a.x}, ${1/a.y}) `),s){const{transformPerspective:g,rotate:v,pathRotation:x,rotateX:b,rotateY:E,skewX:j,skewY:N}=s;g&&(l=`perspective(${g}px) ${l}`),v&&(l+=`rotate(${v}deg) `),x&&(l+=`rotate(${x}deg) `),b&&(l+=`rotateX(${b}deg) `),E&&(l+=`rotateY(${E}deg) `),j&&(l+=`skewX(${j}deg) `),N&&(l+=`skewY(${N}deg) `)}const m=n.x.scale*a.x,p=n.y.scale*a.y;return(m!==1||p!==1)&&(l+=`scale(${m}, ${p})`),l||"none"}const UE=Mf.length,tv=n=>typeof n=="string"?parseFloat(n):n,nv=n=>typeof n=="number"||he.test(n);function HE(n,a,s,l,u,h){u?(n.opacity=He(0,s.opacity??1,qE(l)),n.opacityExit=He(a.opacity??1,0,YE(l))):h&&(n.opacity=He(a.opacity??1,s.opacity??1,l));for(let f=0;f<UE;f++){const m=Mf[f];let p=rv(a,m),g=rv(s,m);if(p===void 0&&g===void 0)continue;p||(p=0),g||(g=0),p===0||g===0||nv(p)===nv(g)?(n[m]=Math.max(He(tv(p),tv(g),l),0),(xn.test(g)||xn.test(p))&&(n[m]+="%")):n[m]=g}(a.rotate||s.rotate)&&(n.rotate=He(a.rotate||0,s.rotate||0,l))}function rv(n,a){return n[a]!==void 0?n[a]:n.borderRadius}const qE=Mb(0,.5,wx),YE=Mb(.5,.95,en);function Mb(n,a,s){return l=>l<n?0:l>a?1:s(Wi(n,a,l))}function PE(n,a,s){const l=pt(n)?n:Ya(n);return l.start(Nf("",l,a,s)),l.animation}function ts(n,a,s,l={passive:!0}){return n.addEventListener(a,s,l),()=>n.removeEventListener(a,s,l)}const GE=(n,a)=>n.depth-a.depth;class XE{constructor(){this.children=[],this.isDirty=!1}add(a){pf(this.children,a),this.isDirty=!0}remove(a){Il(this.children,a),this.isDirty=!0}forEach(a){this.isDirty&&this.children.sort(GE),this.isDirty=!1,this.children.forEach(a)}}function FE(n,a){const s=xt.now(),l=({timestamp:u})=>{const h=u-s;h>=a&&(xr(l),n(h-a))};return qe.setup(l,!0),()=>xr(l)}function Kl(n){return pt(n)?n.get():n}class $E{constructor(){this.members=[]}add(a){pf(this.members,a);for(let s=this.members.length-1;s>=0;s--){const l=this.members[s];if(l===a||l===this.lead||l===this.prevLead)continue;const u=l.instance;(!u||u.isConnected===!1)&&!l.snapshot&&(Il(this.members,l),l.unmount())}a.scheduleRender()}remove(a){if(Il(this.members,a),a===this.prevLead&&(this.prevLead=void 0),a===this.lead){const s=this.members[this.members.length-1];s&&this.promote(s)}}relegate(a){var s;for(let l=this.members.indexOf(a)-1;l>=0;l--){const u=this.members[l];if(u.isPresent!==!1&&((s=u.instance)==null?void 0:s.isConnected)!==!1)return this.promote(u),!0}return!1}promote(a,s){var u;const l=this.lead;if(a!==l&&(this.prevLead=l,this.lead=a,a.show(),l)){l.updateSnapshot(),a.scheduleRender();const{layoutDependency:h}=l.options,{layoutDependency:f}=a.options;(h===void 0||h!==f)&&(a.resumeFrom=l,s&&(l.preserveOpacity=!0),l.snapshot&&(a.snapshot=l.snapshot,a.snapshot.latestValues=l.animationValues||l.latestValues),(u=a.root)!=null&&u.isUpdating&&(a.isLayoutDirty=!0)),a.options.crossfade===!1&&l.hide()}}exitAnimationComplete(){this.members.forEach(a=>{var s,l,u,h,f;(l=(s=a.options).onExitComplete)==null||l.call(s),(f=(u=a.resumingFrom)==null?void 0:(h=u.options).onExitComplete)==null||f.call(h)})}scheduleRender(){this.members.forEach(a=>a.instance&&a.scheduleRender(!1))}removeLeadSnapshot(){var a;(a=this.lead)!=null&&a.snapshot&&(this.lead.snapshot=void 0)}}const Zl={hasAnimatedSinceResize:!0,hasEverUpdated:!1},id=["","X","Y","Z"],KE=1e3;let ZE=0;function sd(n,a,s,l){const{latestValues:u}=a;u[n]&&(s[n]=u[n],a.setStaticValue(n,0),l&&(l[n]=0))}function kb(n){if(n.hasCheckedOptimisedAppear=!0,n.root===n)return;const{visualElement:a}=n.options;if(!a)return;const s=Ix(a);if(window.MotionHasOptimisedAnimation(s,"transform")){const{layout:u,layoutId:h}=n.options;window.MotionCancelOptimisedAnimation(s,"transform",qe,!(u||h))}const{parent:l}=n;l&&!l.hasCheckedOptimisedAppear&&kb(l)}function Rb({attachResizeListener:n,defaultParent:a,measureScroll:s,checkIsScrollRoot:l,resetTransform:u}){return class{constructor(f={},m=a==null?void 0:a()){this.id=ZE++,this.animationId=0,this.animationCommitId=0,this.children=new Set,this.options={},this.isTreeAnimating=!1,this.isAnimationBlocked=!1,this.isLayoutDirty=!1,this.isProjectionDirty=!1,this.isSharedProjectionDirty=!1,this.isTransformDirty=!1,this.updateManuallyBlocked=!1,this.updateBlockedByResize=!1,this.isUpdating=!1,this.isSVG=!1,this.needsReset=!1,this.shouldResetTransform=!1,this.hasCheckedOptimisedAppear=!1,this.treeScale={x:1,y:1},this.eventHandlers=new Map,this.hasTreeAnimated=!1,this.layoutVersion=0,this.updateScheduled=!1,this.scheduleUpdate=()=>this.update(),this.projectionUpdateScheduled=!1,this.checkUpdateFailed=()=>{this.isUpdating&&(this.isUpdating=!1,this.clearAllSnapshots())},this.updateProjection=()=>{this.projectionUpdateScheduled=!1,this.nodes.forEach(WE),this.nodes.forEach(aT),this.nodes.forEach(iT),this.nodes.forEach(IE)},this.resolvedRelativeTargetAt=0,this.linkedParentVersion=0,this.hasProjected=!1,this.isVisible=!0,this.animationProgress=0,this.sharedNodes=new Map,this.latestValues=f,this.root=m?m.root||m:this,this.path=m?[...m.path,m]:[],this.parent=m,this.depth=m?m.depth+1:0;for(let p=0;p<this.path.length;p++)this.path[p].shouldResetTransform=!0;this.root===this&&(this.nodes=new XE)}addEventListener(f,m){return this.eventHandlers.has(f)||this.eventHandlers.set(f,new gf),this.eventHandlers.get(f).add(m)}notifyListeners(f,...m){const p=this.eventHandlers.get(f);p&&p.notify(...m)}hasListeners(f){return this.eventHandlers.has(f)}mount(f){if(this.instance)return;this.isSVG=Of(f)&&!Wj(f),this.instance=f;const{layoutId:m,layout:p,visualElement:g}=this.options;if(g&&!g.current&&g.mount(f),this.root.nodes.add(this),this.parent&&this.parent.children.add(this),this.root.hasTreeAnimated&&(p||m)&&(this.isLayoutDirty=!0),n){let v,x=0;const b=()=>this.root.updateBlockedByResize=!1;qe.read(()=>{x=window.innerWidth}),n(f,()=>{const E=window.innerWidth;E!==x&&(x=E,this.root.updateBlockedByResize=!0,v&&v(),v=FE(b,250),Zl.hasAnimatedSinceResize&&(Zl.hasAnimatedSinceResize=!1,this.nodes.forEach(sv)))})}m&&this.root.registerSharedNode(m,this),this.options.animate!==!1&&g&&(m||p)&&this.addEventListener("didUpdate",({delta:v,hasLayoutChanged:x,hasRelativeLayoutChanged:b,layout:E})=>{if(this.isTreeAnimationBlocked()){this.target=void 0,this.relativeTarget=void 0;return}const j=this.options.transition||g.getDefaultTransition()||uT,{onLayoutAnimationStart:N,onLayoutAnimationComplete:C}=g.getProps(),k=!this.targetLayout||!Ab(this.targetLayout,E),D=!x&&b;if(this.options.layoutRoot||this.resumeFrom||D||x&&(k||!this.currentAnimation)){this.resumeFrom&&(this.resumingFrom=this.resumeFrom,this.resumingFrom.resumingFrom=void 0);const z={...Cf(j,"layout"),onPlay:N,onComplete:C};(g.shouldReduceMotion||this.options.layoutRoot)&&(z.delay=0,z.type=!1),this.startAnimation(z),this.setAnimationOrigin(v,D,z.path)}else x||sv(this),this.isLead()&&this.options.onExitComplete&&this.options.onExitComplete();this.targetLayout=E})}unmount(){this.options.layoutId&&this.willUpdate(),this.root.nodes.remove(this);const f=this.getStack();f&&f.remove(this),this.parent&&this.parent.children.delete(this),this.instance=void 0,this.eventHandlers.clear(),xr(this.updateProjection)}blockUpdate(){this.updateManuallyBlocked=!0}unblockUpdate(){this.updateManuallyBlocked=!1}isUpdateBlocked(){return this.updateManuallyBlocked||this.updateBlockedByResize}isTreeAnimationBlocked(){return this.isAnimationBlocked||this.parent&&this.parent.isTreeAnimationBlocked()||!1}startUpdate(){this.isUpdateBlocked()||(this.isUpdating=!0,this.nodes&&this.nodes.forEach(sT),this.animationId++)}getTransformTemplate(){const{visualElement:f}=this.options;return f&&f.getProps().transformTemplate}willUpdate(f=!0){if(this.root.hasTreeAnimated=!0,this.root.isUpdateBlocked()){this.options.onExitComplete&&this.options.onExitComplete();return}if(window.MotionCancelOptimisedAnimation&&!this.hasCheckedOptimisedAppear&&kb(this),!this.root.isUpdating&&this.root.startUpdate(),this.isLayoutDirty)return;this.isLayoutDirty=!0;for(let v=0;v<this.path.length;v++){const x=this.path[v];x.shouldResetTransform=!0,(typeof x.latestValues.x=="string"||typeof x.latestValues.y=="string")&&(x.isLayoutDirty=!0),x.updateScroll("snapshot"),x.options.layoutRoot&&x.willUpdate(!1)}const{layoutId:m,layout:p}=this.options;if(m===void 0&&!p)return;const g=this.getTransformTemplate();this.prevTransformTemplateValue=g?g(this.latestValues,""):void 0,this.updateSnapshot(),f&&this.notifyListeners("willUpdate")}update(){if(this.updateScheduled=!1,this.isUpdateBlocked()){const p=this.updateBlockedByResize;this.unblockUpdate(),this.updateBlockedByResize=!1,this.clearAllSnapshots(),p&&this.nodes.forEach(tT),this.nodes.forEach(av);return}if(this.animationId<=this.animationCommitId){this.nodes.forEach(iv);return}this.animationCommitId=this.animationId,this.isUpdating?(this.isUpdating=!1,this.nodes.forEach(nT),this.nodes.forEach(rT),this.nodes.forEach(QE),this.nodes.forEach(JE)):this.nodes.forEach(iv),this.clearAllSnapshots();const m=xt.now();mt.delta=bn(0,1e3/60,m-mt.timestamp),mt.timestamp=m,mt.isProcessing=!0,Ju.update.process(mt),Ju.preRender.process(mt),Ju.render.process(mt),mt.isProcessing=!1}didUpdate(){this.updateScheduled||(this.updateScheduled=!0,kf.read(this.scheduleUpdate))}clearAllSnapshots(){this.nodes.forEach(eT),this.sharedNodes.forEach(lT)}scheduleUpdateProjection(){this.projectionUpdateScheduled||(this.projectionUpdateScheduled=!0,qe.preRender(this.updateProjection,!1,!0))}scheduleCheckAfterUnmount(){qe.postRender(()=>{this.isLayoutDirty?this.root.didUpdate():this.root.checkUpdateFailed()})}updateSnapshot(){this.snapshot||!this.instance||(this.snapshot=this.measure(),this.snapshot&&!bt(this.snapshot.measuredBox.x)&&!bt(this.snapshot.measuredBox.y)&&(this.snapshot=void 0))}updateLayout(){if(!this.instance||(this.updateScroll(),!(this.options.alwaysMeasureLayout&&this.isLead())&&!this.isLayoutDirty))return;if(this.resumeFrom&&!this.resumeFrom.instance)for(let p=0;p<this.path.length;p++)this.path[p].updateScroll();const f=this.layout;this.layout=this.measure(!1),this.layoutVersion++,this.layoutCorrected||(this.layoutCorrected=it()),this.isLayoutDirty=!1,this.projectionDelta=void 0,this.notifyListeners("measure",this.layout.layoutBox);const{visualElement:m}=this.options;m&&m.notify("LayoutMeasure",this.layout.layoutBox,f?f.layoutBox:void 0)}updateScroll(f="measure"){let m=!!(this.options.layoutScroll&&this.instance);if(this.scroll&&this.scroll.animationId===this.root.animationId&&this.scroll.phase===f&&(m=!1),m&&this.instance){const p=l(this.instance);this.scroll={animationId:this.root.animationId,phase:f,isRoot:p,offset:s(this.instance),wasRoot:this.scroll?this.scroll.isRoot:p}}}resetTransform(){if(!u)return;const f=this.isLayoutDirty||this.shouldResetTransform||this.options.alwaysMeasureLayout,m=this.projectionDelta&&!Db(this.projectionDelta),p=this.getTransformTemplate(),g=p?p(this.latestValues,""):void 0,v=g!==this.prevTransformTemplateValue;f&&this.instance&&(m||qr(this.latestValues)||v)&&(u(this.instance,g),this.shouldResetTransform=!1,this.scheduleRender())}measure(f=!0){const m=this.measurePageBox();let p=this.removeElementScroll(m);return f&&(p=this.removeTransform(p)),dT(p),{animationId:this.root.animationId,measuredBox:m,layoutBox:p,latestValues:{},source:this.id}}measurePageBox(){var g;const{visualElement:f}=this.options;if(!f)return it();const m=f.measureViewportBox();if(!(((g=this.scroll)==null?void 0:g.wasRoot)||this.path.some(fT))){const{scroll:v}=this.root;v&&(yn(m.x,v.offset.x),yn(m.y,v.offset.y))}return m}removeElementScroll(f){var p;const m=it();if(ln(m,f),(p=this.scroll)!=null&&p.wasRoot)return m;for(let g=0;g<this.path.length;g++){const v=this.path[g],{scroll:x,options:b}=v;v!==this.root&&x&&b.layoutScroll&&(x.wasRoot&&ln(m,f),yn(m.x,x.offset.x),yn(m.y,x.offset.y))}return m}applyTransform(f,m=!1,p){var v,x;const g=p||it();ln(g,f);for(let b=0;b<this.path.length;b++){const E=this.path[b];!m&&E.options.layoutScroll&&E.scroll&&E!==E.root&&(yn(g.x,-E.scroll.offset.x),yn(g.y,-E.scroll.offset.y)),qr(E.latestValues)&&$l(g,E.latestValues,(v=E.layout)==null?void 0:v.layoutBox)}return qr(this.latestValues)&&$l(g,this.latestValues,(x=this.layout)==null?void 0:x.layoutBox),g}removeTransform(f){var p;const m=it();ln(m,f);for(let g=0;g<this.path.length;g++){const v=this.path[g];if(!qr(v.latestValues))continue;let x;v.instance&&(Pd(v.latestValues)&&v.updateSnapshot(),x=it(),ln(x,v.measurePageBox())),Zy(m,v.latestValues,(p=v.snapshot)==null?void 0:p.layoutBox,x)}return qr(this.latestValues)&&Zy(m,this.latestValues),m}setTargetDelta(f){this.targetDelta=f,this.root.scheduleUpdateProjection(),this.isProjectionDirty=!0}setOptions(f){this.options={...this.options,...f,crossfade:f.crossfade!==void 0?f.crossfade:!0}}clearMeasurements(){this.scroll=void 0,this.layout=void 0,this.snapshot=void 0,this.prevTransformTemplateValue=void 0,this.targetDelta=void 0,this.target=void 0,this.isLayoutDirty=!1}forceRelativeParentToResolveTarget(){this.relativeParent&&this.relativeParent.resolvedRelativeTargetAt!==mt.timestamp&&this.relativeParent.resolveTargetDelta(!0)}resolveTargetDelta(f=!1){var E;const m=this.getLead();this.isProjectionDirty||(this.isProjectionDirty=m.isProjectionDirty),this.isTransformDirty||(this.isTransformDirty=m.isTransformDirty),this.isSharedProjectionDirty||(this.isSharedProjectionDirty=m.isSharedProjectionDirty);const p=!!this.resumingFrom||this!==m;if(!(f||p&&this.isSharedProjectionDirty||this.isProjectionDirty||(E=this.parent)!=null&&E.isProjectionDirty||this.attemptToResolveRelativeTarget||this.root.updateBlockedByResize))return;const{layout:v,layoutId:x}=this.options;if(!this.layout||!(v||x))return;this.resolvedRelativeTargetAt=mt.timestamp;const b=this.getClosestProjectingParent();b&&this.linkedParentVersion!==b.layoutVersion&&!b.options.layoutRoot&&this.removeRelativeTarget(),!this.targetDelta&&!this.relativeTarget&&(this.options.layoutAnchor!==!1&&b&&b.layout?this.createRelativeTarget(b,this.layout.layoutBox,b.layout.layoutBox):this.removeRelativeTarget()),!(!this.relativeTarget&&!this.targetDelta)&&(this.target||(this.target=it(),this.targetWithTransforms=it()),this.relativeTarget&&this.relativeTargetOrigin&&this.relativeParent&&this.relativeParent.target?(this.forceRelativeParentToResolveTarget(),OE(this.target,this.relativeTarget,this.relativeParent.target,this.options.layoutAnchor||void 0)):this.targetDelta?(this.resumingFrom?this.applyTransform(this.layout.layoutBox,!1,this.target):ln(this.target,this.layout.layoutBox),gb(this.target,this.targetDelta)):ln(this.target,this.layout.layoutBox),this.attemptToResolveRelativeTarget&&(this.attemptToResolveRelativeTarget=!1,this.options.layoutAnchor!==!1&&b&&!!b.resumingFrom==!!this.resumingFrom&&!b.options.layoutScroll&&b.target&&this.animationProgress!==1?this.createRelativeTarget(b,this.target,b.target):this.relativeParent=this.relativeTarget=void 0))}getClosestProjectingParent(){if(!(!this.parent||Pd(this.parent.latestValues)||pb(this.parent.latestValues)))return this.parent.isProjecting()?this.parent:this.parent.getClosestProjectingParent()}isProjecting(){return!!((this.relativeTarget||this.targetDelta||this.options.layoutRoot)&&this.layout)}createRelativeTarget(f,m,p){this.relativeParent=f,this.linkedParentVersion=f.layoutVersion,this.forceRelativeParentToResolveTarget(),this.relativeTarget=it(),this.relativeTargetOrigin=it(),oo(this.relativeTargetOrigin,m,p,this.options.layoutAnchor||void 0),ln(this.relativeTarget,this.relativeTargetOrigin)}removeRelativeTarget(){this.relativeParent=this.relativeTarget=void 0}calcProjection(){var j;const f=this.getLead(),m=!!this.resumingFrom||this!==f;let p=!0;if((this.isProjectionDirty||(j=this.parent)!=null&&j.isProjectionDirty)&&(p=!1),m&&(this.isSharedProjectionDirty||this.isTransformDirty)&&(p=!1),this.resolvedRelativeTargetAt===mt.timestamp&&(p=!1),p)return;const{layout:g,layoutId:v}=this.options;if(this.isTreeAnimating=!!(this.parent&&this.parent.isTreeAnimating||this.currentAnimation||this.pendingAnimation),this.isTreeAnimating||(this.targetDelta=this.relativeTarget=void 0),!this.layout||!(g||v))return;ln(this.layoutCorrected,this.layout.layoutBox);const x=this.treeScale.x,b=this.treeScale.y;oE(this.layoutCorrected,this.treeScale,this.path,m),f.layout&&!f.target&&(this.treeScale.x!==1||this.treeScale.y!==1)&&(f.target=f.layout.layoutBox,f.targetWithTransforms=it());const{target:E}=f;if(!E){this.prevProjectionDelta&&(this.createProjectionDeltas(),this.scheduleRender());return}!this.projectionDelta||!this.prevProjectionDelta?this.createProjectionDeltas():(Py(this.prevProjectionDelta.x,this.projectionDelta.x),Py(this.prevProjectionDelta.y,this.projectionDelta.y)),Zi(this.projectionDelta,this.layoutCorrected,E,this.latestValues),(this.treeScale.x!==x||this.treeScale.y!==b||!ev(this.projectionDelta.x,this.prevProjectionDelta.x)||!ev(this.projectionDelta.y,this.prevProjectionDelta.y))&&(this.hasProjected=!0,this.scheduleRender(),this.notifyListeners("projectionUpdate",E))}hide(){this.isVisible=!1}show(){this.isVisible=!0}scheduleRender(f=!0){var m;if((m=this.options.visualElement)==null||m.scheduleRender(),f){const p=this.getStack();p&&p.scheduleRender()}this.resumingFrom&&!this.resumingFrom.instance&&(this.resumingFrom=void 0)}createProjectionDeltas(){this.prevProjectionDelta=Ua(),this.projectionDelta=Ua(),this.projectionDeltaWithTransform=Ua()}setAnimationOrigin(f,m=!1,p){const g=this.snapshot,v=g?g.latestValues:{},x={...this.latestValues},b=Ua();(!this.relativeParent||!this.relativeParent.options.layoutRoot)&&(this.relativeTarget=this.relativeTargetOrigin=void 0),this.attemptToResolveRelativeTarget=!m;const E=it(),j=g?g.source:void 0,N=this.layout?this.layout.source:void 0,C=j!==N,k=this.getStack(),D=!k||k.members.length<=1,z=!!(C&&!D&&this.options.crossfade===!0&&!this.path.some(cT));this.animationProgress=0;let O;const H=p==null?void 0:p.interpolateProjection(f);this.mixTargetDelta=Y=>{const A=Y/1e3,L=H==null?void 0:H(A);L?(b.x.translate=L.x,b.x.scale=He(f.x.scale,1,A),b.x.origin=f.x.origin,b.x.originPoint=f.x.originPoint,b.y.translate=L.y,b.y.scale=He(f.y.scale,1,A),b.y.origin=f.y.origin,b.y.originPoint=f.y.originPoint):(lv(b.x,f.x,A),lv(b.y,f.y,A)),this.setTargetDelta(b),this.relativeTarget&&this.relativeTargetOrigin&&this.layout&&this.relativeParent&&this.relativeParent.layout&&(oo(E,this.layout.layoutBox,this.relativeParent.layout.layoutBox,this.options.layoutAnchor||void 0),oT(this.relativeTarget,this.relativeTargetOrigin,E,A),O&&BE(this.relativeTarget,O)&&(this.isProjectionDirty=!1),O||(O=it()),ln(O,this.relativeTarget)),C&&(this.animationValues=x,HE(x,v,this.latestValues,A,z,D)),L&&L.rotate!==void 0&&(this.animationValues||(this.animationValues=x),this.animationValues.pathRotation=L.rotate),this.root.scheduleUpdateProjection(),this.scheduleRender(),this.animationProgress=A},this.mixTargetDelta(this.options.layoutRoot?1e3:0)}startAnimation(f){var m,p,g;this.notifyListeners("animationStart"),(m=this.currentAnimation)==null||m.stop(),(g=(p=this.resumingFrom)==null?void 0:p.currentAnimation)==null||g.stop(),this.pendingAnimation&&(xr(this.pendingAnimation),this.pendingAnimation=void 0),this.pendingAnimation=qe.update(()=>{Zl.hasAnimatedSinceResize=!0,this.motionValue||(this.motionValue=Ya(0)),this.motionValue.jump(0,!1),this.currentAnimation=PE(this.motionValue,[0,1e3],{...f,velocity:0,isSync:!0,onUpdate:v=>{this.mixTargetDelta(v),f.onUpdate&&f.onUpdate(v)},onComplete:()=>{f.onComplete&&f.onComplete(),this.completeAnimation()}}),this.resumingFrom&&(this.resumingFrom.currentAnimation=this.currentAnimation),this.pendingAnimation=void 0})}completeAnimation(){this.resumingFrom&&(this.resumingFrom.currentAnimation=void 0,this.resumingFrom.preserveOpacity=void 0);const f=this.getStack();f&&f.exitAnimationComplete(),this.resumingFrom=this.currentAnimation=this.animationValues=void 0,this.notifyListeners("animationComplete")}finishAnimation(){this.currentAnimation&&(this.mixTargetDelta&&this.mixTargetDelta(KE),this.currentAnimation.stop()),this.completeAnimation()}applyTransformsToTarget(){const f=this.getLead();let{targetWithTransforms:m,target:p,layout:g,latestValues:v}=f;if(!(!m||!p||!g)){if(this!==f&&this.layout&&g&&Ob(this.options.animationType,this.layout.layoutBox,g.layoutBox)){p=this.target||it();const x=bt(this.layout.layoutBox.x);p.x.min=f.target.x.min,p.x.max=p.x.min+x;const b=bt(this.layout.layoutBox.y);p.y.min=f.target.y.min,p.y.max=p.y.min+b}ln(m,p),$l(m,v),Zi(this.projectionDeltaWithTransform,this.layoutCorrected,m,v)}}registerSharedNode(f,m){this.sharedNodes.has(f)||this.sharedNodes.set(f,new $E),this.sharedNodes.get(f).add(m);const g=m.options.initialPromotionConfig;m.promote({transition:g?g.transition:void 0,preserveFollowOpacity:g&&g.shouldPreserveFollowOpacity?g.shouldPreserveFollowOpacity(m):void 0})}isLead(){const f=this.getStack();return f?f.lead===this:!0}getLead(){var m;const{layoutId:f}=this.options;return f?((m=this.getStack())==null?void 0:m.lead)||this:this}getPrevLead(){var m;const{layoutId:f}=this.options;return f?(m=this.getStack())==null?void 0:m.prevLead:void 0}getStack(){const{layoutId:f}=this.options;if(f)return this.root.sharedNodes.get(f)}promote({needsReset:f,transition:m,preserveFollowOpacity:p}={}){const g=this.getStack();g&&g.promote(this,p),f&&(this.projectionDelta=void 0,this.needsReset=!0),m&&this.setOptions({transition:m})}relegate(){const f=this.getStack();return f?f.relegate(this):!1}resetSkewAndRotation(){const{visualElement:f}=this.options;if(!f)return;let m=!1;const{latestValues:p}=f;if((p.z||p.rotate||p.rotateX||p.rotateY||p.rotateZ||p.skewX||p.skewY)&&(m=!0),!m)return;const g={};p.z&&sd("z",f,g,this.animationValues);for(let v=0;v<id.length;v++)sd(`rotate${id[v]}`,f,g,this.animationValues),sd(`skew${id[v]}`,f,g,this.animationValues);f.render();for(const v in g)f.setStaticValue(v,g[v]),this.animationValues&&(this.animationValues[v]=g[v]);f.scheduleRender()}applyProjectionStyles(f,m){if(!this.instance||this.isSVG)return;if(!this.isVisible){f.visibility="hidden";return}const p=this.getTransformTemplate();if(this.needsReset){this.needsReset=!1,f.visibility="",f.opacity="",f.pointerEvents=Kl(m==null?void 0:m.pointerEvents)||"",f.transform=p?p(this.latestValues,""):"none";return}const g=this.getLead();if(!this.projectionDelta||!this.layout||!g.target){this.options.layoutId&&(f.opacity=this.latestValues.opacity!==void 0?this.latestValues.opacity:1,f.pointerEvents=Kl(m==null?void 0:m.pointerEvents)||""),this.hasProjected&&!qr(this.latestValues)&&(f.transform=p?p({},""):"none",this.hasProjected=!1);return}f.visibility="";const v=g.animationValues||g.latestValues;this.applyTransformsToTarget();let x=LE(this.projectionDeltaWithTransform,this.treeScale,v);p&&(x=p(v,x)),f.transform=x;const{x:b,y:E}=this.projectionDelta;f.transformOrigin=`${b.origin*100}% ${E.origin*100}% 0`,g.animationValues?f.opacity=g===this?v.opacity??this.latestValues.opacity??1:this.preserveOpacity?this.latestValues.opacity:v.opacityExit:f.opacity=g===this?v.opacity!==void 0?v.opacity:"":v.opacityExit!==void 0?v.opacityExit:0;for(const j in Xd){if(v[j]===void 0)continue;const{correct:N,applyTo:C,isCSSVariable:k}=Xd[j],D=x==="none"?v[j]:N(v[j],g);if(C){const z=C.length;for(let O=0;O<z;O++)f[C[O]]=D}else k?this.options.visualElement.renderState.vars[j]=D:f[j]=D}this.options.layoutId&&(f.pointerEvents=g===this?Kl(m==null?void 0:m.pointerEvents)||"":"none")}clearSnapshot(){this.resumeFrom=this.snapshot=void 0}resetTree(){this.root.nodes.forEach(f=>{var m;return(m=f.currentAnimation)==null?void 0:m.stop()}),this.root.nodes.forEach(av),this.root.sharedNodes.clear()}}}function QE(n){n.updateLayout()}function JE(n){var s;const a=((s=n.resumeFrom)==null?void 0:s.snapshot)||n.snapshot;if(n.isLead()&&n.layout&&a&&n.hasListeners("didUpdate")){const{layoutBox:l,measuredBox:u}=n.layout,{animationType:h}=n.options,f=a.source!==n.layout.source;if(h==="size")gn(x=>{const b=f?a.measuredBox[x]:a.layoutBox[x],E=bt(b);b.min=l[x].min,b.max=b.min+E});else if(h==="x"||h==="y"){const x=h==="x"?"y":"x";Fd(f?a.measuredBox[x]:a.layoutBox[x],l[x])}else Ob(h,a.layoutBox,l)&&gn(x=>{const b=f?a.measuredBox[x]:a.layoutBox[x],E=bt(l[x]);b.max=b.min+E,n.relativeTarget&&!n.currentAnimation&&(n.isProjectionDirty=!0,n.relativeTarget[x].max=n.relativeTarget[x].min+E)});const m=Ua();Zi(m,l,a.layoutBox);const p=Ua();f?Zi(p,n.applyTransform(u,!0),a.measuredBox):Zi(p,l,a.layoutBox);const g=!Db(m);let v=!1;if(!n.resumeFrom){const x=n.getClosestProjectingParent();if(x&&!x.resumeFrom){const{snapshot:b,layout:E}=x;if(b&&E){const j=n.options.layoutAnchor||void 0,N=it();oo(N,a.layoutBox,b.layoutBox,j);const C=it();oo(C,l,E.layoutBox,j),Ab(N,C)||(v=!0),x.options.layoutRoot&&(n.relativeTarget=C,n.relativeTargetOrigin=N,n.relativeParent=x)}}}n.notifyListeners("didUpdate",{layout:l,snapshot:a,delta:p,layoutDelta:m,hasLayoutChanged:g,hasRelativeLayoutChanged:v})}else if(n.isLead()){const{onExitComplete:l}=n.options;l&&l()}n.options.transition=void 0}function WE(n){n.parent&&(n.isProjecting()||(n.isProjectionDirty=n.parent.isProjectionDirty),n.isSharedProjectionDirty||(n.isSharedProjectionDirty=!!(n.isProjectionDirty||n.parent.isProjectionDirty||n.parent.isSharedProjectionDirty)),n.isTransformDirty||(n.isTransformDirty=n.parent.isTransformDirty))}function IE(n){n.isProjectionDirty=n.isSharedProjectionDirty=n.isTransformDirty=!1}function eT(n){n.clearSnapshot()}function av(n){n.clearMeasurements()}function tT(n){n.isLayoutDirty=!0,n.updateLayout()}function iv(n){n.isLayoutDirty=!1}function nT(n){n.isAnimationBlocked&&n.layout&&!n.isLayoutDirty&&(n.snapshot=n.layout,n.isLayoutDirty=!0)}function rT(n){const{visualElement:a}=n.options;a&&a.getProps().onBeforeLayoutMeasure&&a.notify("BeforeLayoutMeasure"),n.resetTransform()}function sv(n){n.finishAnimation(),n.targetDelta=n.relativeTarget=n.target=void 0,n.isProjectionDirty=!0}function aT(n){n.resolveTargetDelta()}function iT(n){n.calcProjection()}function sT(n){n.resetSkewAndRotation()}function lT(n){n.removeLeadSnapshot()}function lv(n,a,s){n.translate=He(a.translate,0,s),n.scale=He(a.scale,1,s),n.origin=a.origin,n.originPoint=a.originPoint}function ov(n,a,s,l){n.min=He(a.min,s.min,l),n.max=He(a.max,s.max,l)}function oT(n,a,s,l){ov(n.x,a.x,s.x,l),ov(n.y,a.y,s.y,l)}function cT(n){return n.animationValues&&n.animationValues.opacityExit!==void 0}const uT={duration:.45,ease:[.4,0,.1,1]},cv=n=>typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().includes(n),uv=cv("applewebkit/")&&!cv("chrome/")?Math.round:en;function dv(n){n.min=uv(n.min),n.max=uv(n.max)}function dT(n){dv(n.x),dv(n.y)}function Ob(n,a,s){return n==="position"||n==="preserve-aspect"&&!RE(Iy(a),Iy(s),.2)}function fT(n){var a;return n!==n.root&&((a=n.scroll)==null?void 0:a.wasRoot)}const hT=Rb({attachResizeListener:(n,a)=>ts(n,"resize",a),measureScroll:()=>{var n,a;return{x:document.documentElement.scrollLeft||((n=document.body)==null?void 0:n.scrollLeft)||0,y:document.documentElement.scrollTop||((a=document.body)==null?void 0:a.scrollTop)||0}},checkIsScrollRoot:()=>!0}),ld={current:void 0},zb=Rb({measureScroll:n=>({x:n.scrollLeft,y:n.scrollTop}),defaultParent:()=>{if(!ld.current){const n=new hT({});n.mount(window),n.setOptions({layoutScroll:!0}),ld.current=n}return ld.current},resetTransform:(n,a)=>{n.style.transform=a!==void 0?a:"none"},checkIsScrollRoot:n=>window.getComputedStyle(n).position==="fixed"}),Uf=S.createContext({transformPagePoint:n=>n,isStatic:!1,reducedMotion:"never"});function fv(n,a){if(typeof n=="function")return n(a);n!=null&&(n.current=a)}function mT(...n){return a=>{let s=!1;const l=n.map(u=>{const h=fv(u,a);return!s&&typeof h=="function"&&(s=!0),h});if(s)return()=>{for(let u=0;u<l.length;u++){const h=l[u];typeof h=="function"?h():fv(n[u],null)}}}}function pT(...n){return S.useCallback(mT(...n),n)}class gT extends S.Component{getSnapshotBeforeUpdate(a){const s=this.props.childRef.current;if(Pl(s)&&a.isPresent&&!this.props.isPresent&&this.props.pop!==!1){const l=s.offsetParent,u=Pl(l)&&l.offsetWidth||0,h=Pl(l)&&l.offsetHeight||0,f=getComputedStyle(s),m=this.props.sizeRef.current;m.height=parseFloat(f.height),m.width=parseFloat(f.width),m.top=s.offsetTop,m.left=s.offsetLeft,m.right=u-m.width-m.left,m.bottom=h-m.height-m.top,m.direction=f.direction}return null}componentDidUpdate(){}render(){return this.props.children}}function yT({children:n,isPresent:a,anchorX:s,anchorY:l,root:u,pop:h}){var b;const f=S.useId(),m=S.useRef(null),p=S.useRef({width:0,height:0,top:0,left:0,right:0,bottom:0,direction:"ltr"}),{nonce:g}=S.useContext(Uf),v=h!==!1?((b=n.props)==null?void 0:b.ref)??(n==null?void 0:n.ref):void 0,x=pT(m,v);return S.useInsertionEffect(()=>{const{width:E,height:j,top:N,left:C,right:k,bottom:D,direction:z}=p.current;if(a||h===!1||!m.current||!E||!j)return;const O=z==="rtl",H=s==="left"?O?`right: ${k}`:`left: ${C}`:O?`left: ${C}`:`right: ${k}`,Y=l==="bottom"?`bottom: ${D}`:`top: ${N}`;m.current.dataset.motionPopId=f;const A=document.createElement("style");g&&(A.nonce=g);const L=u??document.head;return L.appendChild(A),A.sheet&&A.sheet.insertRule(`
          [data-motion-pop-id="${f}"] {
            position: absolute !important;
            width: ${E}px !important;
            height: ${j}px !important;
            ${H}px !important;
            ${Y}px !important;
          }
        `),()=>{var B;(B=m.current)==null||B.removeAttribute("data-motion-pop-id"),L.contains(A)&&L.removeChild(A)}},[a]),o.jsx(gT,{isPresent:a,childRef:m,sizeRef:p,pop:h,children:h===!1?n:S.cloneElement(n,{ref:x})})}const vT=({children:n,initial:a,isPresent:s,onExitComplete:l,custom:u,presenceAffectsLayout:h,mode:f,anchorX:m,anchorY:p,root:g})=>{const v=hf(xT),x=S.useId(),b=S.useRef(s),E=S.useRef(l);mf(()=>{b.current=s,E.current=l});let j=!0,N=S.useMemo(()=>(j=!1,{id:x,initial:a,isPresent:s,custom:u,onExitComplete:C=>{v.set(C,!0);for(const k of v.values())if(!k)return;l&&l()},register:C=>(v.set(C,!1),()=>{var k;v.delete(C),!b.current&&!v.size&&((k=E.current)==null||k.call(E))})}),[s,v,l]);return h&&j&&(N={...N}),S.useMemo(()=>{v.forEach((C,k)=>v.set(k,!1))},[s]),S.useEffect(()=>{!s&&!v.size&&l&&l()},[s]),n=o.jsx(yT,{pop:f==="popLayout",isPresent:s,anchorX:m,anchorY:p,root:g,children:n}),o.jsx(wo.Provider,{value:N,children:n})};function xT(){return new Map}function _b(n=!0){const a=S.useContext(wo);if(a===null)return[!0,null];const{isPresent:s,onExitComplete:l,register:u}=a,h=S.useId();S.useEffect(()=>{if(n)return u(h)},[n]);const f=S.useCallback(()=>n&&l&&l(h),[h,l,n]);return!s&&l?[!1,f]:[!0]}const kl=n=>n.key||"";function hv(n){const a=[];return S.Children.forEach(n,s=>{S.isValidElement(s)&&a.push(s)}),a}const bT=({children:n,custom:a,initial:s=!0,onExitComplete:l,presenceAffectsLayout:u=!0,mode:h="sync",propagate:f=!1,anchorX:m="left",anchorY:p="top",root:g})=>{const[v,x]=_b(f),b=S.useMemo(()=>hv(n),[n]),E=f&&!v?[]:b.map(kl),j=S.useRef(!0),N=S.useRef(b),C=hf(()=>new Map),k=S.useRef(new Set),[D,z]=S.useState(b),[O,H]=S.useState(b);mf(()=>{j.current=!1,N.current=b;for(let L=0;L<O.length;L++){const B=kl(O[L]);E.includes(B)?(C.delete(B),k.current.delete(B)):C.get(B)!==!0&&C.set(B,!1)}},[O,E.length,E.join("-")]);const Y=[];if(b!==D){let L=[...b];for(let B=0;B<O.length;B++){const V=O[B],$=kl(V);E.includes($)||(L.splice(B,0,V),Y.push(V))}return h==="wait"&&Y.length&&(L=Y),H(hv(L)),z(b),null}const{forceRender:A}=S.useContext(ff);return o.jsx(o.Fragment,{children:O.map(L=>{const B=kl(L),V=f&&!v?!1:b===O||E.includes(B),$=()=>{if(k.current.has(B))return;if(C.has(B))k.current.add(B),C.set(B,!0);else return;let J=!0;C.forEach(oe=>{oe||(J=!1)}),J&&(A==null||A(),H(N.current),f&&(x==null||x()),l&&l())};return o.jsx(vT,{isPresent:V,initial:!j.current||s?void 0:!1,custom:a,presenceAffectsLayout:u,mode:h,root:g,onExitComplete:V?void 0:$,anchorX:m,anchorY:p,children:L},B)})})},Vb=S.createContext({strict:!1}),mv={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]};let pv=!1;function ST(){if(pv)return;const n={};for(const a in mv)n[a]={isEnabled:s=>mv[a].some(l=>!!s[l])};fb(n),pv=!0}function Bb(){return ST(),aE()}function wT(n){const a=Bb();for(const s in n)a[s]={...a[s],...n[s]};fb(a)}const jT=new Set(["animate","exit","variants","initial","style","values","variants","transition","transformTemplate","custom","inherit","onBeforeLayoutMeasure","onAnimationStart","onAnimationComplete","onUpdate","onDragStart","onDrag","onDragEnd","onMeasureDragConstraints","onDirectionLock","onDragTransitionEnd","_dragX","_dragY","onHoverStart","onHoverEnd","onViewportEnter","onViewportLeave","globalTapTarget","propagate","ignoreStrict","viewport"]);function co(n){return n.startsWith("while")||n.startsWith("drag")&&n!=="draggable"||n.startsWith("layout")||n.startsWith("onTap")||n.startsWith("onPan")||n.startsWith("onLayout")||jT.has(n)}let Lb=n=>!co(n);function ET(n){typeof n=="function"&&(Lb=a=>a.startsWith("on")?!co(a):n(a))}try{ET(require("@emotion/is-prop-valid").default)}catch{}function TT(n,a,s){const l={};for(const u in n)u==="values"&&typeof n.values=="object"||pt(n[u])||(Lb(u)||s===!0&&co(u)||!a&&!co(u)||n.draggable&&u.startsWith("onDrag"))&&(l[u]=n[u]);return l}const No=S.createContext({});function CT(n,a){if(Co(n)){const{initial:s,animate:l}=n;return{initial:s===!1||es(s)?s:void 0,animate:es(l)?l:void 0}}return n.inherit!==!1?a:{}}function NT(n){const{initial:a,animate:s}=CT(n,S.useContext(No));return S.useMemo(()=>({initial:a,animate:s}),[gv(a),gv(s)])}function gv(n){return Array.isArray(n)?n.join(" "):n}const Hf=()=>({style:{},transform:{},transformOrigin:{},vars:{}});function Ub(n,a,s){for(const l in a)!pt(a[l])&&!xb(l,s)&&(n[l]=a[l])}function DT({transformTemplate:n},a){return S.useMemo(()=>{const s=Hf();return Bf(s,a,n),Object.assign({},s.vars,s.style)},[a])}function AT(n,a){const s=n.style||{},l={};return Ub(l,s,n),Object.assign(l,DT(n,a)),l}function MT(n,a){const s={},l=AT(n,a);return n.drag&&n.dragListener!==!1&&(s.draggable=!1,l.userSelect=l.WebkitUserSelect=l.WebkitTouchCallout="none",l.touchAction=n.drag===!0?"none":`pan-${n.drag==="x"?"y":"x"}`),n.tabIndex===void 0&&(n.onTap||n.onTapStart||n.whileTap)&&(s.tabIndex=0),s.style=l,s}const Hb=()=>({...Hf(),attrs:{}});function kT(n,a,s,l){const u=S.useMemo(()=>{const h=Hb();return bb(h,a,wb(l),n.transformTemplate,n.style),{...h.attrs,style:{...h.style}}},[a]);if(n.style){const h={};Ub(h,n.style,n),u.style={...h,...u.style}}return u}const RT=["animate","circle","defs","desc","ellipse","g","image","line","filter","marker","mask","metadata","path","pattern","polygon","polyline","rect","stop","switch","symbol","svg","text","tspan","use","view"];function qf(n){return typeof n!="string"||n.includes("-")?!1:!!(RT.indexOf(n)>-1||/[A-Z]/u.test(n))}function OT(n,a,s,{latestValues:l},u,h=!1,f){const p=(f??qf(n)?kT:MT)(a,l,u,n),g=TT(a,typeof n=="string",h),v=n!==S.Fragment?{...g,...p,ref:s}:{},{children:x}=a,b=S.useMemo(()=>pt(x)?x.get():x,[x]);return S.createElement(n,{...v,children:b})}function zT({scrapeMotionValuesFromProps:n,createRenderState:a},s,l,u){return{latestValues:_T(s,l,u,n),renderState:a()}}function _T(n,a,s,l){const u={},h=l(n,{});for(const b in h)u[b]=Kl(h[b]);let{initial:f,animate:m}=n;const p=Co(n),g=ub(n);a&&g&&!p&&n.inherit!==!1&&(f===void 0&&(f=a.initial),m===void 0&&(m=a.animate));let v=s?s.initial===!1:!1;v=v||f===!1;const x=v?m:f;if(x&&typeof x!="boolean"&&!To(x)){const b=Array.isArray(x)?x:[x];for(let E=0;E<b.length;E++){const j=Df(n,b[E]);if(j){const{transitionEnd:N,transition:C,...k}=j;for(const D in k){let z=k[D];if(Array.isArray(z)){const O=v?z.length-1:0;z=z[O]}z!==null&&(u[D]=z)}for(const D in N)u[D]=N[D]}}}return u}const qb=n=>(a,s)=>{const l=S.useContext(No),u=S.useContext(wo),h=()=>zT(n,a,l,u);return s?h():hf(h)},VT=qb({scrapeMotionValuesFromProps:Lf,createRenderState:Hf}),BT=qb({scrapeMotionValuesFromProps:jb,createRenderState:Hb}),LT=Symbol.for("motionComponentSymbol");function UT(n,a,s){const l=S.useRef(s);S.useInsertionEffect(()=>{l.current=s});const u=S.useRef(null);return S.useCallback(h=>{var m;h&&((m=n.onMount)==null||m.call(n,h)),a&&(h?a.mount(h):a.unmount());const f=l.current;if(typeof f=="function")if(h){const p=f(h);typeof p=="function"&&(u.current=p)}else u.current?(u.current(),u.current=null):f(h);else f&&(f.current=h)},[a])}const Yb=S.createContext({});function _a(n){return n&&typeof n=="object"&&Object.prototype.hasOwnProperty.call(n,"current")}function HT(n,a,s,l,u,h){var z,O;const{visualElement:f}=S.useContext(No),m=S.useContext(Vb),p=S.useContext(wo),g=S.useContext(Uf),v=g.reducedMotion,x=g.skipAnimations,b=S.useRef(null),E=S.useRef(!1);l=l||m.renderer,!b.current&&l&&(b.current=l(n,{visualState:a,parent:f,props:s,presenceContext:p,blockInitialAnimation:p?p.initial===!1:!1,reducedMotionConfig:v,skipAnimations:x,isSVG:h}),E.current&&b.current&&(b.current.manuallyAnimateOnMount=!0));const j=b.current,N=S.useContext(Yb);j&&!j.projection&&u&&(j.type==="html"||j.type==="svg")&&qT(b.current,s,u,N);const C=S.useRef(!1);S.useInsertionEffect(()=>{j&&C.current&&j.update(s,p)});const k=s[Wx],D=S.useRef(!!k&&typeof window<"u"&&!((z=window.MotionHandoffIsComplete)!=null&&z.call(window,k))&&((O=window.MotionHasOptimisedAnimation)==null?void 0:O.call(window,k)));return mf(()=>{E.current=!0,j&&(C.current=!0,window.MotionIsMounted=!0,j.updateFeatures(),j.scheduleRenderMicrotask(),D.current&&j.animationState&&j.animationState.animateChanges())}),S.useEffect(()=>{j&&(!D.current&&j.animationState&&j.animationState.animateChanges(),D.current&&(queueMicrotask(()=>{var H;(H=window.MotionHandoffMarkAsComplete)==null||H.call(window,k)}),D.current=!1),j.enteringChildren=void 0)}),j}function qT(n,a,s,l){const{layoutId:u,layout:h,drag:f,dragConstraints:m,layoutScroll:p,layoutRoot:g,layoutAnchor:v,layoutCrossfade:x}=a;n.projection=new s(n.latestValues,a["data-framer-portal-id"]?void 0:Pb(n.parent)),n.projection.setOptions({layoutId:u,layout:h,alwaysMeasureLayout:!!f||m&&_a(m),visualElement:n,animationType:typeof h=="string"?h:"both",initialPromotionConfig:l,crossfade:x,layoutScroll:p,layoutRoot:g,layoutAnchor:v})}function Pb(n){if(n)return n.options.allowProjection!==!1?n.projection:Pb(n.parent)}function od(n,{forwardMotionProps:a=!1,type:s}={},l,u){l&&wT(l);const h=s?s==="svg":qf(n),f=h?BT:VT;function m(g,v){let x;const b={...S.useContext(Uf),...g,layoutId:YT(g)},{isStatic:E}=b,j=NT(g),N=f(g,E);if(!E&&typeof window<"u"){PT();const C=GT(b);x=C.MeasureLayout,j.visualElement=HT(n,N,b,u,C.ProjectionNode,h)}return o.jsxs(No.Provider,{value:j,children:[x&&j.visualElement?o.jsx(x,{visualElement:j.visualElement,...b}):null,OT(n,g,UT(N,j.visualElement,v),N,E,a,h)]})}m.displayName=`motion.${typeof n=="string"?n:`create(${n.displayName??n.name??""})`}`;const p=S.forwardRef(m);return p[LT]=n,p}function YT({layoutId:n}){const a=S.useContext(ff).id;return a&&n!==void 0?a+"-"+n:n}function PT(n,a){S.useContext(Vb).strict}function GT(n){const a=Bb(),{drag:s,layout:l}=a;if(!s&&!l)return{};const u={...s,...l};return{MeasureLayout:s!=null&&s.isEnabled(n)||l!=null&&l.isEnabled(n)?u.MeasureLayout:void 0,ProjectionNode:u.ProjectionNode}}function XT(n,a){if(typeof Proxy>"u")return od;const s=new Map,l=(h,f)=>od(h,f,n,a),u=(h,f)=>l(h,f);return new Proxy(u,{get:(h,f)=>f==="create"?l:(s.has(f)||s.set(f,od(f,void 0,n,a)),s.get(f))})}const FT=(n,a)=>a.isSVG??qf(n)?new SE(a):new pE(a,{allowProjection:n!==S.Fragment});class $T extends Sr{constructor(a){super(a),a.animationState||(a.animationState=CE(a))}updateAnimationControlsSubscription(){const{animate:a}=this.node.getProps();To(a)&&(this.unmountControls=a.subscribe(this.node))}mount(){this.updateAnimationControlsSubscription()}update(){const{animate:a}=this.node.getProps(),{animate:s}=this.node.prevProps||{};a!==s&&this.updateAnimationControlsSubscription()}unmount(){var a;this.node.animationState.reset(),(a=this.unmountControls)==null||a.call(this)}}let KT=0;class ZT extends Sr{constructor(){super(...arguments),this.id=KT++,this.isExitComplete=!1}update(){var h;if(!this.node.presenceContext)return;const{isPresent:a,onExitComplete:s}=this.node.presenceContext,{isPresent:l}=this.node.prevPresenceContext||{};if(!this.node.animationState||a===l)return;if(a&&l===!1){if(this.isExitComplete){const{initial:f,custom:m}=this.node.getProps();if(typeof f=="string"||typeof f=="object"&&f!==null&&!Array.isArray(f)){const p=Xr(this.node,f,m);if(p){const{transition:g,transitionEnd:v,...x}=p;for(const b in x)(h=this.node.getValue(b))==null||h.jump(x[b])}}this.node.animationState.reset(),this.node.animationState.animateChanges()}else this.node.animationState.setActive("exit",!1);this.isExitComplete=!1;return}const u=this.node.animationState.setActive("exit",!a);s&&!a&&u.then(()=>{this.isExitComplete=!0,s(this.id)})}mount(){const{register:a,onExitComplete:s}=this.node.presenceContext||{};s&&s(this.id),a&&(this.unmount=a(this.id))}unmount(){}}const QT={animation:{Feature:$T},exit:{Feature:ZT}};function cs(n){return{point:{x:n.pageX,y:n.pageY}}}const JT=n=>a=>Rf(a)&&n(a,cs(a));function Qi(n,a,s,l){return ts(n,a,JT(s),l)}const Gb=({current:n})=>n?n.ownerDocument.defaultView:null,yv=(n,a)=>Math.abs(n-a);function WT(n,a){const s=yv(n.x,a.x),l=yv(n.y,a.y);return Math.sqrt(s**2+l**2)}const vv=new Set(["auto","scroll"]);class Xb{constructor(a,s,{transformPagePoint:l,contextWindow:u=window,dragSnapToOrigin:h=!1,distanceThreshold:f=3,element:m}={}){if(this.startEvent=null,this.lastMoveEvent=null,this.lastMoveEventInfo=null,this.lastRawMoveEventInfo=null,this.handlers={},this.contextWindow=window,this.scrollPositions=new Map,this.removeScrollListeners=null,this.onElementScroll=j=>{this.handleScroll(j.target)},this.onWindowScroll=()=>{this.handleScroll(window)},this.updatePoint=()=>{if(!(this.lastMoveEvent&&this.lastMoveEventInfo))return;this.lastRawMoveEventInfo&&(this.lastMoveEventInfo=Rl(this.lastRawMoveEventInfo,this.transformPagePoint));const j=cd(this.lastMoveEventInfo,this.history),N=this.startEvent!==null,C=WT(j.offset,{x:0,y:0})>=this.distanceThreshold;if(!N&&!C)return;const{point:k}=j,{timestamp:D}=mt;this.history.push({...k,timestamp:D});const{onStart:z,onMove:O}=this.handlers;N||(z&&z(this.lastMoveEvent,j),this.startEvent=this.lastMoveEvent),O&&O(this.lastMoveEvent,j)},this.handlePointerMove=(j,N)=>{this.lastMoveEvent=j,this.lastRawMoveEventInfo=N,this.lastMoveEventInfo=Rl(N,this.transformPagePoint),qe.update(this.updatePoint,!0)},this.handlePointerUp=(j,N)=>{this.end();const{onEnd:C,onSessionEnd:k,resumeAnimation:D}=this.handlers;if((this.dragSnapToOrigin||!this.startEvent)&&D&&D(),!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const z=cd(j.type==="pointercancel"?this.lastMoveEventInfo:Rl(N,this.transformPagePoint),this.history);this.startEvent&&C&&C(j,z),k&&k(j,z)},!Rf(a))return;this.dragSnapToOrigin=h,this.handlers=s,this.transformPagePoint=l,this.distanceThreshold=f,this.contextWindow=u||window;const p=cs(a),g=Rl(p,this.transformPagePoint),{point:v}=g,{timestamp:x}=mt;this.history=[{...v,timestamp:x}];const{onSessionStart:b}=s;b&&b(a,cd(g,this.history));const E={passive:!0,capture:!0};this.removeListeners=ss(Qi(this.contextWindow,"pointermove",this.handlePointerMove,E),Qi(this.contextWindow,"pointerup",this.handlePointerUp,E),Qi(this.contextWindow,"pointercancel",this.handlePointerUp,E)),m&&this.startScrollTracking(m)}startScrollTracking(a){let s=a.parentElement;for(;s;){const l=getComputedStyle(s);(vv.has(l.overflowX)||vv.has(l.overflowY))&&this.scrollPositions.set(s,{x:s.scrollLeft,y:s.scrollTop}),s=s.parentElement}this.scrollPositions.set(window,{x:window.scrollX,y:window.scrollY}),window.addEventListener("scroll",this.onElementScroll,{capture:!0}),window.addEventListener("scroll",this.onWindowScroll),this.removeScrollListeners=()=>{window.removeEventListener("scroll",this.onElementScroll,{capture:!0}),window.removeEventListener("scroll",this.onWindowScroll)}}handleScroll(a){const s=this.scrollPositions.get(a);if(!s)return;const l=a===window,u=l?{x:window.scrollX,y:window.scrollY}:{x:a.scrollLeft,y:a.scrollTop},h={x:u.x-s.x,y:u.y-s.y};h.x===0&&h.y===0||(l?this.lastMoveEventInfo&&(this.lastMoveEventInfo.point.x+=h.x,this.lastMoveEventInfo.point.y+=h.y):this.history.length>0&&(this.history[0].x-=h.x,this.history[0].y-=h.y),this.scrollPositions.set(a,u),qe.update(this.updatePoint,!0))}updateHandlers(a){this.handlers=a}end(){this.removeListeners&&this.removeListeners(),this.removeScrollListeners&&this.removeScrollListeners(),this.scrollPositions.clear(),xr(this.updatePoint)}}function Rl(n,a){return a?{point:a(n.point)}:n}function xv(n,a){return{x:n.x-a.x,y:n.y-a.y}}function cd({point:n},a){return{point:n,delta:xv(n,Fb(a)),offset:xv(n,IT(a)),velocity:eC(a,.1)}}function IT(n){return n[0]}function Fb(n){return n[n.length-1]}function eC(n,a){if(n.length<2)return{x:0,y:0};let s=n.length-1,l=null;const u=Fb(n);for(;s>=0&&(l=n[s],!(u.timestamp-l.timestamp>qt(a)));)s--;if(!l)return{x:0,y:0};l===n[0]&&n.length>2&&u.timestamp-l.timestamp>qt(a)*2&&(l=n[1]);const h=It(u.timestamp-l.timestamp);if(h===0)return{x:0,y:0};const f={x:(u.x-l.x)/h,y:(u.y-l.y)/h};return f.x===1/0&&(f.x=0),f.y===1/0&&(f.y=0),f}function tC(n,{min:a,max:s},l){return a!==void 0&&n<a?n=l?He(a,n,l.min):Math.max(n,a):s!==void 0&&n>s&&(n=l?He(s,n,l.max):Math.min(n,s)),n}function bv(n,a,s){return{min:a!==void 0?n.min+a:void 0,max:s!==void 0?n.max+s-(n.max-n.min):void 0}}function nC(n,{top:a,left:s,bottom:l,right:u}){return{x:bv(n.x,s,u),y:bv(n.y,a,l)}}function Sv(n,a){let s=a.min-n.min,l=a.max-n.max;return a.max-a.min<n.max-n.min&&([s,l]=[l,s]),{min:s,max:l}}function rC(n,a){return{x:Sv(n.x,a.x),y:Sv(n.y,a.y)}}function aC(n,a){let s=.5;const l=bt(n),u=bt(a);return u>l?s=Wi(a.min,a.max-l,n.min):l>u&&(s=Wi(n.min,n.max-u,a.min)),bn(0,1,s)}function iC(n,a){const s={};return a.min!==void 0&&(s.min=a.min-n.min),a.max!==void 0&&(s.max=a.max-n.min),s}const $d=.35;function sC(n=$d){return n===!1?n=0:n===!0&&(n=$d),{x:wv(n,"left","right"),y:wv(n,"top","bottom")}}function wv(n,a,s){return{min:jv(n,a),max:jv(n,s)}}function jv(n,a){return typeof n=="number"?n:n[a]||0}const lC=new WeakMap;class oC{constructor(a){this.openDragLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},this.constraints=!1,this.hasMutatedConstraints=!1,this.elastic=it(),this.latestPointerEvent=null,this.latestPanInfo=null,this.visualElement=a}start(a,{snapToCursor:s=!1,distanceThreshold:l}={}){const{presenceContext:u}=this.visualElement;if(u&&u.isPresent===!1)return;const h=x=>{s&&this.snapToCursor(cs(x).point),this.stopAnimation()},f=(x,b)=>{const{drag:E,dragPropagation:j,onDragStart:N}=this.getProps();if(E&&!j&&(this.openDragLock&&this.openDragLock(),this.openDragLock=_j(E),!this.openDragLock))return;this.latestPointerEvent=x,this.latestPanInfo=b,this.isDragging=!0,this.currentDirection=null,this.resolveConstraints(),this.visualElement.projection&&(this.visualElement.projection.isAnimationBlocked=!0,this.visualElement.projection.target=void 0),gn(k=>{let D=this.getAxisMotionValue(k).get()||0;if(xn.test(D)){const{projection:z}=this.visualElement;if(z&&z.layout){const O=z.layout.layoutBox[k];O&&(D=bt(O)*(parseFloat(D)/100))}}this.originPoint[k]=D}),N&&qe.update(()=>N(x,b),!1,!0),Ld(this.visualElement,"transform");const{animationState:C}=this.visualElement;C&&C.setActive("whileDrag",!0)},m=(x,b)=>{this.latestPointerEvent=x,this.latestPanInfo=b;const{dragPropagation:E,dragDirectionLock:j,onDirectionLock:N,onDrag:C}=this.getProps();if(!E&&!this.openDragLock)return;const{offset:k}=b;if(j&&this.currentDirection===null){this.currentDirection=uC(k),this.currentDirection!==null&&N&&N(this.currentDirection);return}this.updateAxis("x",b.point,k),this.updateAxis("y",b.point,k),this.visualElement.render(),C&&qe.update(()=>C(x,b),!1,!0)},p=(x,b)=>{this.latestPointerEvent=x,this.latestPanInfo=b,this.stop(x,b),this.latestPointerEvent=null,this.latestPanInfo=null},g=()=>{const{dragSnapToOrigin:x}=this.getProps();(x||this.constraints)&&this.startAnimation({x:0,y:0})},{dragSnapToOrigin:v}=this.getProps();this.panSession=new Xb(a,{onSessionStart:h,onStart:f,onMove:m,onSessionEnd:p,resumeAnimation:g},{transformPagePoint:this.visualElement.getTransformPagePoint(),dragSnapToOrigin:v,distanceThreshold:l,contextWindow:Gb(this.visualElement),element:this.visualElement.current})}stop(a,s){const l=a||this.latestPointerEvent,u=s||this.latestPanInfo,h=this.isDragging;if(this.cancel(),!h||!u||!l)return;const{velocity:f}=u;this.startAnimation(f);const{onDragEnd:m}=this.getProps();m&&qe.postRender(()=>m(l,u))}cancel(){this.isDragging=!1;const{projection:a,animationState:s}=this.visualElement;a&&(a.isAnimationBlocked=!1),this.endPanSession();const{dragPropagation:l}=this.getProps();!l&&this.openDragLock&&(this.openDragLock(),this.openDragLock=null),s&&s.setActive("whileDrag",!1)}endPanSession(){this.panSession&&this.panSession.end(),this.panSession=void 0}updateAxis(a,s,l){const{drag:u}=this.getProps();if(!l||!Ol(a,u,this.currentDirection))return;const h=this.getAxisMotionValue(a);let f=this.originPoint[a]+l[a];this.constraints&&this.constraints[a]&&(f=tC(f,this.constraints[a],this.elastic[a])),h.set(f)}resolveConstraints(){var h;const{dragConstraints:a,dragElastic:s}=this.getProps(),l=this.visualElement.projection&&!this.visualElement.projection.layout?this.visualElement.projection.measure(!1):(h=this.visualElement.projection)==null?void 0:h.layout,u=this.constraints;a&&_a(a)?this.constraints||(this.constraints=this.resolveRefConstraints()):a&&l?this.constraints=nC(l.layoutBox,a):this.constraints=!1,this.elastic=sC(s),u!==this.constraints&&!_a(a)&&l&&this.constraints&&!this.hasMutatedConstraints&&gn(f=>{this.constraints!==!1&&this.getAxisMotionValue(f)&&(this.constraints[f]=iC(l.layoutBox[f],this.constraints[f]))})}resolveRefConstraints(){const{dragConstraints:a,onMeasureDragConstraints:s}=this.getProps();if(!a||!_a(a))return!1;const l=a.current,{projection:u}=this.visualElement;if(!u||!u.layout)return!1;u.root&&(u.root.scroll=void 0,u.root.updateScroll());const h=cE(l,u.root,this.visualElement.getTransformPagePoint());let f=rC(u.layout.layoutBox,h);if(s){const m=s(sE(f));this.hasMutatedConstraints=!!m,m&&(f=mb(m))}return f}startAnimation(a){const{drag:s,dragMomentum:l,dragElastic:u,dragTransition:h,dragSnapToOrigin:f,onDragTransitionEnd:m}=this.getProps(),p=this.constraints||{},g=gn(v=>{if(!Ol(v,s,this.currentDirection))return;let x=p&&p[v]||{};(f===!0||f===v)&&(x={min:0,max:0});const b=u?200:1e6,E=u?40:1e7,j={type:"inertia",velocity:l?a[v]:0,bounceStiffness:b,bounceDamping:E,timeConstant:750,restDelta:1,restSpeed:10,...h,...x};return this.startAxisValueAnimation(v,j)});return Promise.all(g).then(m)}startAxisValueAnimation(a,s){const l=this.getAxisMotionValue(a);return Ld(this.visualElement,a),l.start(Nf(a,l,0,s,this.visualElement,!1))}stopAnimation(){gn(a=>this.getAxisMotionValue(a).stop())}getAxisMotionValue(a){const s=`_drag${a.toUpperCase()}`,u=this.visualElement.getProps()[s];return u||this.visualElement.getValue(a,this.visualElement.latestValues[a]??0)}snapToCursor(a){gn(s=>{const{drag:l}=this.getProps();if(!Ol(s,l,this.currentDirection))return;const{projection:u}=this.visualElement,h=this.getAxisMotionValue(s);if(u&&u.layout){const{min:f,max:m}=u.layout.layoutBox[s],p=h.get()||0;h.set(a[s]-He(f,m,.5)+p)}})}scalePositionWithinConstraints(){if(!this.visualElement.current)return;const{drag:a,dragConstraints:s}=this.getProps(),{projection:l}=this.visualElement;if(!_a(s)||!l||!this.constraints)return;this.stopAnimation();const u={x:0,y:0};gn(f=>{const m=this.getAxisMotionValue(f);if(m&&this.constraints!==!1){const p=m.get();u[f]=aC({min:p,max:p},this.constraints[f])}});const{transformTemplate:h}=this.visualElement.getProps();this.visualElement.current.style.transform=h?h({},""):"none",l.root&&l.root.updateScroll(),l.updateLayout(),this.constraints=!1,this.resolveConstraints(),gn(f=>{if(!Ol(f,a,null))return;const m=this.getAxisMotionValue(f),{min:p,max:g}=this.constraints[f];m.set(He(p,g,u[f]))}),this.visualElement.render()}addListeners(){if(!this.visualElement.current)return;lC.set(this.visualElement,this);const a=this.visualElement.current,s=Qi(a,"pointerdown",g=>{const{drag:v,dragListener:x=!0}=this.getProps(),b=g.target,E=b!==a&&qj(b);v&&x&&!E&&this.start(g)});let l;const u=()=>{const{dragConstraints:g}=this.getProps();_a(g)&&g.current&&(this.constraints=this.resolveRefConstraints(),l||(l=cC(a,g.current,()=>this.scalePositionWithinConstraints())))},{projection:h}=this.visualElement,f=h.addEventListener("measure",u);h&&!h.layout&&(h.root&&h.root.updateScroll(),h.updateLayout()),qe.read(u);const m=ts(window,"resize",()=>this.scalePositionWithinConstraints()),p=h.addEventListener("didUpdate",(({delta:g,hasLayoutChanged:v})=>{this.isDragging&&v&&(gn(x=>{const b=this.getAxisMotionValue(x);b&&(this.originPoint[x]+=g[x].translate,b.set(b.get()+g[x].translate))}),this.visualElement.render())}));return()=>{m(),s(),f(),p&&p(),l&&l()}}getProps(){const a=this.visualElement.getProps(),{drag:s=!1,dragDirectionLock:l=!1,dragPropagation:u=!1,dragConstraints:h=!1,dragElastic:f=$d,dragMomentum:m=!0}=a;return{...a,drag:s,dragDirectionLock:l,dragPropagation:u,dragConstraints:h,dragElastic:f,dragMomentum:m}}}function Ev(n){let a=!0;return()=>{if(a){a=!1;return}n()}}function cC(n,a,s){const l=ky(n,Ev(s)),u=ky(a,Ev(s));return()=>{l(),u()}}function Ol(n,a,s){return(a===!0||a===n)&&(s===null||s===n)}function uC(n,a=10){let s=null;return Math.abs(n.y)>a?s="y":Math.abs(n.x)>a&&(s="x"),s}class dC extends Sr{constructor(a){super(a),this.removeGroupControls=en,this.removeListeners=en,this.controls=new oC(a)}mount(){const{dragControls:a}=this.node.getProps();a&&(this.removeGroupControls=a.subscribe(this.controls)),this.removeListeners=this.controls.addListeners()||en}update(){const{dragControls:a}=this.node.getProps(),{dragControls:s}=this.node.prevProps||{};a!==s&&(this.removeGroupControls(),a&&(this.removeGroupControls=a.subscribe(this.controls)))}unmount(){this.removeGroupControls(),this.removeListeners(),this.controls.isDragging||this.controls.endPanSession()}}const ud=n=>(a,s)=>{n&&qe.update(()=>n(a,s),!1,!0)};class fC extends Sr{constructor(){super(...arguments),this.removePointerDownListener=en}onPointerDown(a){this.session=new Xb(a,this.createPanHandlers(),{transformPagePoint:this.node.getTransformPagePoint(),contextWindow:Gb(this.node)})}createPanHandlers(){const{onPanSessionStart:a,onPanStart:s,onPan:l,onPanEnd:u}=this.node.getProps();return{onSessionStart:ud(a),onStart:ud(s),onMove:ud(l),onEnd:(h,f)=>{delete this.session,u&&qe.postRender(()=>u(h,f))}}}mount(){this.removePointerDownListener=Qi(this.node.current,"pointerdown",a=>this.onPointerDown(a))}update(){this.session&&this.session.updateHandlers(this.createPanHandlers())}unmount(){this.removePointerDownListener(),this.session&&this.session.end()}}let dd=!1;class hC extends S.Component{componentDidMount(){const{visualElement:a,layoutGroup:s,switchLayoutGroup:l,layoutId:u}=this.props,{projection:h}=a;h&&(s.group&&s.group.add(h),l&&l.register&&u&&l.register(h),dd&&h.root.didUpdate(),h.addEventListener("animationComplete",()=>{this.safeToRemove()}),h.setOptions({...h.options,layoutDependency:this.props.layoutDependency,onExitComplete:()=>this.safeToRemove()})),Zl.hasEverUpdated=!0}getSnapshotBeforeUpdate(a){const{layoutDependency:s,visualElement:l,drag:u,isPresent:h}=this.props,{projection:f}=l;return f&&(f.isPresent=h,a.layoutDependency!==s&&f.setOptions({...f.options,layoutDependency:s}),dd=!0,u||a.layoutDependency!==s||s===void 0||a.isPresent!==h?f.willUpdate():this.safeToRemove(),a.isPresent!==h&&(h?f.promote():f.relegate()||qe.postRender(()=>{const m=f.getStack();(!m||!m.members.length)&&this.safeToRemove()}))),null}componentDidUpdate(){const{visualElement:a,layoutAnchor:s}=this.props,{projection:l}=a;l&&(l.options.layoutAnchor=s,l.root.didUpdate(),kf.postRender(()=>{!l.currentAnimation&&l.isLead()&&this.safeToRemove()}))}componentWillUnmount(){const{visualElement:a,layoutGroup:s,switchLayoutGroup:l}=this.props,{projection:u}=a;dd=!0,u&&(u.scheduleCheckAfterUnmount(),s&&s.group&&s.group.remove(u),l&&l.deregister&&l.deregister(u))}safeToRemove(){const{safeToRemove:a}=this.props;a&&a()}render(){return null}}function $b(n){const[a,s]=_b(),l=S.useContext(ff);return o.jsx(hC,{...n,layoutGroup:l,switchLayoutGroup:S.useContext(Yb),isPresent:a,safeToRemove:s})}const mC={pan:{Feature:fC},drag:{Feature:dC,ProjectionNode:zb,MeasureLayout:$b}};function Tv(n,a,s){const{props:l}=n;n.animationState&&l.whileHover&&n.animationState.setActive("whileHover",s==="Start");const u="onHover"+s,h=l[u];h&&qe.postRender(()=>h(a,cs(a)))}class pC extends Sr{mount(){const{current:a}=this.node;a&&(this.unmount=Bj(a,(s,l)=>(Tv(this.node,l,"Start"),u=>Tv(this.node,u,"End"))))}unmount(){}}class gC extends Sr{constructor(){super(...arguments),this.isActive=!1}onFocus(){let a=!1;try{a=this.node.current.matches(":focus-visible")}catch{a=!0}!a||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!0),this.isActive=!0)}onBlur(){!this.isActive||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!1),this.isActive=!1)}mount(){this.unmount=ss(ts(this.node.current,"focus",()=>this.onFocus()),ts(this.node.current,"blur",()=>this.onBlur()))}unmount(){}}function Cv(n,a,s){const{props:l}=n;if(n.current instanceof HTMLButtonElement&&n.current.disabled)return;n.animationState&&l.whileTap&&n.animationState.setActive("whileTap",s==="Start");const u="onTap"+(s==="End"?"":s),h=l[u];h&&qe.postRender(()=>h(a,cs(a)))}class yC extends Sr{mount(){const{current:a}=this.node;if(!a)return;const{globalTapTarget:s,propagate:l}=this.node.props;this.unmount=Pj(a,(u,h)=>(Cv(this.node,h,"Start"),(f,{success:m})=>Cv(this.node,f,m?"End":"Cancel")),{useGlobalTarget:s,stopPropagation:(l==null?void 0:l.tap)===!1})}unmount(){}}const Kd=new WeakMap,fd=new WeakMap,vC=n=>{const a=Kd.get(n.target);a&&a(n)},xC=n=>{n.forEach(vC)};function bC({root:n,...a}){const s=n||document;fd.has(s)||fd.set(s,{});const l=fd.get(s),u=JSON.stringify(a);return l[u]||(l[u]=new IntersectionObserver(xC,{root:n,...a})),l[u]}function SC(n,a,s){const l=bC(a);return Kd.set(n,s),l.observe(n),()=>{Kd.delete(n),l.unobserve(n)}}const wC={some:0,all:1};class jC extends Sr{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){var p;(p=this.stopObserver)==null||p.call(this);const{viewport:a={}}=this.node.getProps(),{root:s,margin:l,amount:u="some",once:h}=a,f={root:s?s.current:void 0,rootMargin:l,threshold:typeof u=="number"?u:wC[u]},m=g=>{const{isIntersecting:v}=g;if(this.isInView===v||(this.isInView=v,h&&!v&&this.hasEnteredView))return;v&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive("whileInView",v);const{onViewportEnter:x,onViewportLeave:b}=this.node.getProps(),E=v?x:b;E&&E(g)};this.stopObserver=SC(this.node.current,f,m)}mount(){this.startObserver()}update(){if(typeof IntersectionObserver>"u")return;const{props:a,prevProps:s}=this.node;["amount","margin","root"].some(EC(a,s))&&this.startObserver()}unmount(){var a;(a=this.stopObserver)==null||a.call(this),this.hasEnteredView=!1,this.isInView=!1}}function EC({viewport:n={}},{viewport:a={}}={}){return s=>n[s]!==a[s]}const TC={inView:{Feature:jC},tap:{Feature:yC},focus:{Feature:gC},hover:{Feature:pC}},CC={layout:{ProjectionNode:zb,MeasureLayout:$b}},NC={...QT,...TC,...mC,...CC},DC=XT(NC,FT);function Kb(){!Vf.current&&db();const[n]=S.useState(io.current);return n}const Zb=DC,uo=new Map,Nv=new Set;let AC=0;const Yf=()=>{var n;return(n=window.chrome)==null?void 0:n.webview};function MC(n){var s;const a=uo.get(n.id);if(a){if(n.type==="progress"){(s=a.progress)==null||s.call(a,n.data);return}window.clearTimeout(a.timer),uo.delete(n.id),n.ok?a.resolve(n.data):a.reject(new Error(n.error||"操作失败"))}}var lx;(lx=Yf())==null||lx.addEventListener("message",n=>MC(n.data));function kC(n,a){var s;a&&Nv.has(a)||(a&&Nv.add(a),(s=Yf())==null||s.postMessage({type:"app.ready",route:n,navigation:a}))}function ye(n,a,s=3e4,l){const u=Yf();if(!u)return Promise.reject(new Error("当前页面未连接到桌面宿主"));const h=`${Date.now()}-${++AC}`;return new Promise((f,m)=>{const p=window.setTimeout(()=>{uo.delete(h),m(new Error("操作超时，请重试"))},s);uo.set(h,{resolve:g=>f(g),reject:m,timer:p,progress:l}),u.postMessage({id:h,operation:n,payload:a})})}var Pf=ux();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const RC=n=>n.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Qb=(...n)=>n.filter((a,s,l)=>!!a&&a.trim()!==""&&l.indexOf(a)===s).join(" ").trim();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var OC={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zC=S.forwardRef(({color:n="currentColor",size:a=24,strokeWidth:s=2,absoluteStrokeWidth:l,className:u="",children:h,iconNode:f,...m},p)=>S.createElement("svg",{ref:p,...OC,width:a,height:a,stroke:n,strokeWidth:l?Number(s)*24/Number(a):s,className:Qb("lucide",u),...m},[...f.map(([g,v])=>S.createElement(g,v)),...Array.isArray(h)?h:[h]]));/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ye=(n,a)=>{const s=S.forwardRef(({className:l,...u},h)=>S.createElement(zC,{ref:h,iconNode:a,className:Qb(`lucide-${RC(n)}`,l),...u}));return s.displayName=`${n}`,s};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ns=Ye("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _C=Ye("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const VC=Ye("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const us=Ye("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const BC=Ye("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const LC=Ye("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const UC=Ye("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const HC=Ye("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qC=Ye("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zd=Ye("Database",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const YC=Ye("Ellipsis",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dv=Ye("FileCheck2",[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4",key:"1pf5j1"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"m3 15 2 2 4-4",key:"1lhrkk"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fo=Ye("FileSpreadsheet",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M8 13h2",key:"yr2amv"}],["path",{d:"M14 13h2",key:"un5t4a"}],["path",{d:"M8 17h2",key:"2yhykz"}],["path",{d:"M14 17h2",key:"10kma7"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const PC=Ye("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ho=Ye("FolderOpen",[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sn=Ye("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const GC=Ye("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const XC=Ye("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jb=Ye("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const FC=Ye("RotateCw",[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",key:"1p45f6"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $C=Ye("Rows3",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M21 9H3",key:"1338ky"}],["path",{d:"M21 15H3",key:"9uk58r"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gf=Ye("Settings2",[["path",{d:"M20 7h-9",key:"3s1dr2"}],["path",{d:"M14 17H5",key:"gfn3mx"}],["circle",{cx:"17",cy:"17",r:"3",key:"18b49y"}],["circle",{cx:"7",cy:"7",r:"3",key:"dfmy0x"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const KC=Ye("Sigma",[["path",{d:"M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2",key:"wuwx1p"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ZC=Ye("SlidersHorizontal",[["line",{x1:"21",x2:"14",y1:"4",y2:"4",key:"obuewd"}],["line",{x1:"10",x2:"3",y1:"4",y2:"4",key:"1q6298"}],["line",{x1:"21",x2:"12",y1:"12",y2:"12",key:"1iu8h1"}],["line",{x1:"8",x2:"3",y1:"12",y2:"12",key:"ntss68"}],["line",{x1:"21",x2:"16",y1:"20",y2:"20",key:"14d8ph"}],["line",{x1:"12",x2:"3",y1:"20",y2:"20",key:"m0wm8r"}],["line",{x1:"14",x2:"14",y1:"2",y2:"6",key:"14e1ph"}],["line",{x1:"8",x2:"8",y1:"10",y2:"14",key:"1i6ji0"}],["line",{x1:"16",x2:"16",y1:"18",y2:"22",key:"1lctlv"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const QC=Ye("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const JC=Ye("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xf=Ye("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),WC=["一","二","三","四","五","六","日"],IC=Array.from({length:12},(n,a)=>`${a+1}月`);function eN(n){if(!n)return null;const[a,s,l=1]=n.split("-").map(Number);return!a||!s||!l?null:new Date(a,s-1,l)}function Av(n){const a=n.getFullYear(),s=String(n.getMonth()+1).padStart(2,"0"),l=String(n.getDate()).padStart(2,"0");return`${a}-${s}-${l}`}function tN(n){const a=n.getFullYear(),s=String(n.getMonth()+1).padStart(2,"0"),l=String(n.getDate()).padStart(2,"0");return`${a}/${s}/${l}`}function nN(n,a){const s=new Date(n,a,1).getDay();return s===0?6:s-1}function rN(n,a){return new Date(n,a+1,0).getDate()}function Mv(n,a){return n.getFullYear()===a.getFullYear()&&n.getMonth()===a.getMonth()&&n.getDate()===a.getDate()}function aN(n){return Math.floor(n/12)*12}function tn({value:n,onChange:a,label:s,disabled:l=!1,selectionMode:u="day"}){var T;const h=S.useId(),f=S.useMemo(()=>eN(n),[n]),[m,p]=S.useState(!1),[g,v]=S.useState(u),[x,b]=S.useState(f??new Date),[E,j]=S.useState({top:0,left:0}),[N,C]=S.useState("bottom"),k=S.useRef(null),D=S.useRef(null),z=S.useRef(null);S.useEffect(()=>{f&&b(f)},[n]);function O(){const R=k.current,ee=z.current;if(!R||!ee)return;const se=R.ownerDocument.defaultView||window,ue=R.getBoundingClientRect(),me=ee.getBoundingClientRect(),xe=me.width,ie=me.height,W=8,de=12,ne=se.innerHeight-ue.bottom-de,pe=ue.top-de,Ce=ie>ne&&pe>ne,Oe=Ce?"top":"bottom";let Qe=Ce?ue.top-ie-W:ue.bottom+W;Qe<de&&(Qe=de),Qe+ie>se.innerHeight-de&&(Qe=Math.max(de,se.innerHeight-ie-de));let Fe=ue.left;Fe+xe>se.innerWidth-de&&(Fe=se.innerWidth-xe-de),Fe<de&&(Fe=de),C(Oe),j({top:Qe,left:Fe})}S.useLayoutEffect(()=>{m&&O()},[m,g]),S.useEffect(()=>{var se;if(!m)return;const R=((se=k.current)==null?void 0:se.ownerDocument.defaultView)||window;function ee(){O()}return R.addEventListener("resize",ee),R.addEventListener("scroll",ee,!0),()=>{R.removeEventListener("resize",ee),R.removeEventListener("scroll",ee,!0)}},[m,g]),S.useEffect(()=>{var ue;const R=((ue=D.current)==null?void 0:ue.ownerDocument)||document;function ee(me){var de,ne;const xe=me.target,ie=(de=D.current)==null?void 0:de.contains(xe),W=(ne=z.current)==null?void 0:ne.contains(xe);!ie&&!W&&(p(!1),v(u))}function se(me){me.key==="Escape"&&(p(!1),v(u))}return R.addEventListener("mousedown",ee),R.addEventListener("keydown",se),()=>{R.removeEventListener("mousedown",ee),R.removeEventListener("keydown",se)}},[u]);const H=x.getFullYear(),Y=x.getMonth(),A=rN(H,Y),L=nN(H,Y),B=aN(H),V=Array.from({length:12},(R,ee)=>B+ee),$=[];for(let R=0;R<L;R+=1)$.push(null);for(let R=1;R<=A;R+=1)$.push(R);function J(){if(g==="day"){b(new Date(H,Y-1,1));return}if(g==="month"){b(new Date(H-1,Y,1));return}b(new Date(H-12,Y,1))}function oe(){if(g==="day"){b(new Date(H,Y+1,1));return}if(g==="month"){b(new Date(H+1,Y,1));return}b(new Date(H+12,Y,1))}function ce(){if(u==="month"){v(g==="month"?"year":"month");return}if(g==="day"){v("month");return}if(g==="month"){v("year");return}v("day")}function le(R){const ee=new Date(H,Y,R);a(Av(ee)),p(!1),v("day")}function U(R){if(u==="month"){a(`${H}-${String(R+1).padStart(2,"0")}`),b(new Date(H,R,1)),p(!1),v("month");return}b(new Date(H,R,1)),v("day")}function ae(R){b(new Date(R,Y,1)),v("month")}function Z(){const R=new Date;b(R),a(u==="month"?`${R.getFullYear()}-${String(R.getMonth()+1).padStart(2,"0")}`:Av(R)),v(u),p(!1)}function X(){return g==="day"?`${H}年 ${Y+1}月`:g==="month"?`${H}年`:`${B} - ${B+11}`}const re=m?o.jsxs("div",{ref:z,className:`date-picker-popover date-picker-popover-${N}`,style:{top:E.top,left:E.left},children:[o.jsxs("div",{className:"date-picker-header",children:[o.jsx("button",{type:"button",className:"date-picker-nav-button",onClick:J,"aria-label":"上一页",children:o.jsx(LC,{size:17,strokeWidth:1.7})}),o.jsx("button",{type:"button",className:"date-picker-title-button",onClick:ce,children:X()}),o.jsx("button",{type:"button",className:"date-picker-nav-button",onClick:oe,"aria-label":"下一页",children:o.jsx(UC,{size:17,strokeWidth:1.7})})]}),g==="day"&&o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"date-picker-weekdays",children:WC.map(R=>o.jsx("div",{children:R},R))}),o.jsx("div",{className:"date-picker-grid",children:$.map((R,ee)=>{if(R===null)return o.jsx("div",{},`empty-${ee}`);const se=new Date(H,Y,R),ue=f?Mv(se,f):!1,me=Mv(se,new Date);return o.jsx("button",{type:"button",className:["date-picker-day",ue?"date-picker-day-selected":"",me&&!ue?"date-picker-day-today":""].filter(Boolean).join(" "),onClick:()=>le(R),children:R},`${H}-${Y}-${R}`)})})]}),g==="month"&&o.jsx("div",{className:"date-picker-month-grid",children:IC.map((R,ee)=>{const se=f&&f.getFullYear()===H&&f.getMonth()===ee,ue=new Date().getFullYear()===H&&new Date().getMonth()===ee;return o.jsx("button",{type:"button",className:["date-picker-month-item",se?"date-picker-month-item-selected":"",ue&&!se?"date-picker-month-item-current":""].filter(Boolean).join(" "),onClick:()=>U(ee),children:R},R)})}),g==="year"&&o.jsx("div",{className:"date-picker-year-grid",children:V.map(R=>{const ee=f&&f.getFullYear()===R,se=new Date().getFullYear()===R;return o.jsx("button",{type:"button",className:["date-picker-year-item",ee?"date-picker-year-item-selected":"",se&&!ee?"date-picker-year-item-current":""].filter(Boolean).join(" "),onClick:()=>ae(R),children:R},R)})}),o.jsx("div",{className:"date-picker-footer",children:o.jsx("button",{type:"button",className:"date-picker-today-button",onClick:Z,children:u==="month"?"回到本月":"回到今天"})})]}):null;return o.jsxs(o.Fragment,{children:[o.jsxs("div",{ref:D,className:"date-picker",children:[s&&o.jsx("label",{id:`${h}-label`,className:"date-picker-label",children:s}),o.jsxs("button",{ref:k,type:"button",disabled:l,className:`date-picker-trigger ${m?"date-picker-trigger-open":""}`,onClick:()=>{l||p(R=>{const ee=!R;return ee&&v(u),ee})},"aria-expanded":m,"aria-labelledby":s?`${h}-label ${h}-value`:void 0,"aria-label":s?void 0:u==="month"?"选择月份":"选择日期",children:[o.jsx("span",{id:`${h}-value`,className:f?"":"date-picker-placeholder",children:f?u==="month"?`${f.getFullYear()} / ${String(f.getMonth()+1).padStart(2,"0")}`:tN(f):u==="month"?"选择月份":"选择日期"}),o.jsx(VC,{className:"date-picker-calendar-icon",size:16,strokeWidth:1.7})]})]}),re&&Pf.createPortal(re,((T=D.current)==null?void 0:T.ownerDocument.body)||document.body)]})}const Wb=`/* Generated from tools/experiments/production_message/production_assistant_demo/src/index.css and App.css.\r
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
`,Ib=`/* Shared controls: normal typography, neutral focus and unobtrusive scrollbars. */\r
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
`,iN=`<!doctype html>\r
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
`,e0=""+new URL("Inter-VF2RPR_K.ttf",import.meta.url).href,t0=""+new URL("NotoSansSC-Dz1u1FRy.ttf",import.meta.url).href,Fi=new Map;function sN(n,a,s=!1){const l=JSON.stringify([n,a]),u=`daily-field-cache-v1:${l}`;let h=s?void 0:Fi.get(l);if(!h&&!s)try{const f=JSON.parse(localStorage.getItem(u)||"null");f&&Array.isArray(f.metrics)&&f.metrics.every(m=>m&&typeof m.id=="string"&&typeof m.name=="string")&&(h=Promise.resolve(f),Fi.set(l,h))}catch{}return h||(h=ye("daily.getProperties",{id:n,sourceId:a}).then(f=>{try{localStorage.setItem(u,JSON.stringify(f))}catch{}return f}).catch(f=>{throw Fi.delete(l),f}),Fi.set(l,h)),h}function lN(n=!1){if(Fi.clear(),n)try{Object.keys(localStorage).filter(a=>a.startsWith("daily-field-cache-v1:")).forEach(a=>localStorage.removeItem(a))}catch{}}const zl=[0,-1,-2].flatMap(n=>[{granularity:"day",key:n===0?"today":`day${n}`,label:n===0?"今日":`${n===-1?"去年":"前年"}同日`},{granularity:"mtd",key:n===0?"mtd":n===-1?"lastmonth":"mtd-2",label:n===0?"本月累计":`${n===-1?"去年":"前年"}同期月累计`},{granularity:"ytd",key:n===0?"ytd":n===-1?"last":"ytd-2",label:n===0?"本年累计":`${n===-1?"去年":"前年"}同期`},{granularity:"fullyear",key:n===0?"fullyear":n===-1?"full":"full-2",label:`${n===0?"今年":n===-1?"去年":"前年"}全年`}].map(a=>({key:a.key,label:a.label,spec:{granularity:a.granularity,yearOffset:n}}))),n0={"system.date":'today("yyyy年M月d日")',"system.year":'today("yyyy年")',"system.month":'today("M月")',"system.day":'today("d日")'};function oN(n){return n0[n]||n}function kv(n){const a=[[]];function s(u){u.replace(/\u00a0/g," ").split(`
`).forEach((h,f)=>{var p;if(f&&a.push([]),!h)return;const m=a.at(-1);((p=m.at(-1))==null?void 0:p.type)==="text"?m.at(-1).text+=h:m.push({type:"text",text:h})})}function l(u){var h;if(u.nodeType===3){s(u.textContent||"");return}if(u instanceof n.ownerDocument.defaultView.HTMLElement){if(u.dataset.key){const f=oN(u.dataset.key);a.at(-1).push({type:f.startsWith("today(")?"dateToken":"fieldToken",attrs:{placeholder:f,label:u.textContent||"",...u.dataset.legacySpec?{dateRangeSpec:JSON.parse(u.dataset.legacySpec)}:{}}});return}if(u.tagName==="BR"){s(`
`);return}u!==n&&["DIV","P"].includes(u.tagName)&&u.childNodes.length===1&&((h=u.firstChild)==null?void 0:h.nodeName)==="BR"||Array.from(u.childNodes).forEach((f,m)=>{m&&f.nodeType===1&&["DIV","P"].includes(f.tagName)&&s(`
`),l(f)})}}return l(n),{text:a.map(u=>u.map(h=>h.type==="text"?h.text:h.attrs.placeholder).join("")).join(`
`),document:JSON.stringify({type:"doc",content:a.map(u=>({type:"paragraph",content:u}))})}}function cN(n,a,s,l){const u=[...s,...Object.entries(n0).map(([f,m])=>({key:m,label:f==="system.date"?"业务日期":f==="system.year"?"业务年份":f==="system.month"?"业务月份":"业务日",metric:"date",scope:"date",keywords:"",field:void 0}))].filter(f=>f.field||f.metric==="date").sort((f,m)=>m.key.length-f.key.length);let h=a;for(;h;){const f=u.map(m=>({d:m,index:h.indexOf(m.key)})).filter(m=>m.index>=0).sort((m,p)=>m.index-p.index)[0];if(!f){n.append(n.ownerDocument.createTextNode(h));break}f.index&&n.append(n.ownerDocument.createTextNode(h.slice(0,f.index))),n.append(l(f.d)),h=h.slice(f.index+f.d.key.length)}}function uN(n,a,s,l){if(!a)return!1;let u;try{u=JSON.parse(a)}catch{return!1}if(u.type!=="doc")return!1;function h(f){var m,p,g,v;if(f.type==="text"){n.append(n.ownerDocument.createTextNode(f.text||""));return}if(f.type==="hardBreak"){n.append(n.ownerDocument.createTextNode(`
`));return}if(f.type==="fieldToken"||f.type==="dateToken"){const x=((m=f.attrs)==null?void 0:m.placeholder)||"";let b=s.find(j=>j.key===x);b||(b={key:x,label:f.type==="dateToken"?"业务日期":((p=f.attrs)==null?void 0:p.label)||"已有数据",metric:f.type==="dateToken"?"date":"legacy",scope:"legacy",keywords:((g=f.attrs)==null?void 0:g.label)||""},s.push(b));const E=l(b);(v=f.attrs)!=null&&v.dateRangeSpec&&(E.dataset.legacySpec=JSON.stringify(f.attrs.dateRangeSpec)),n.append(E);return}(f.content||[]).forEach((x,b)=>{f.type==="doc"&&b&&n.append(n.ownerDocument.createTextNode(`
`)),h(x)})}return h(u),!0}function r0({id:n,back:a,changed:s,openSettings:l}){const u=S.useRef(null),[h,f]=S.useState("");return S.useEffect(()=>{let m=!1;const p=u.current;return ye("daily.get",{id:n}).then(g=>{if(m)return;const v=dN(g,{back:a,changed:s,openSettings:l});p.dailyRuntime=v,p.srcdoc=iN.replace("../../src/ProductionAssistant.App/Assets/Fonts/Inter.ttf",new URL(e0,window.location.href).href).replace("../../src/ProductionAssistant.App/Assets/Fonts/NotoSansSC.ttf",new URL(t0,window.location.href).href)}).catch(g=>{m||f(String(g.message||g))}),()=>{var g;m=!0,(g=p.dailyRuntime)==null||g.dispose()}},[n]),o.jsxs("div",{className:"message-template-host",children:[h&&o.jsx("p",{role:"alert",children:h}),o.jsx("iframe",{ref:u,title:"日报消息模板"})]})}function dN(n,a){var Y;let s=!1,l=!1,u,h,f=Promise.resolve(),m=0,p;const g=new Date,v=n.fields.map(A=>{var L,B,V;return{key:A.placeholder,label:A.label.replace(" · ",""),metric:`${A.databaseId||((L=A.binding)==null?void 0:L.dataSourceId)}:${A.businessId||((B=A.binding)==null?void 0:B.businessMetricId)}`,scope:((V=zl.find($=>JSON.stringify($.spec)===JSON.stringify(A.dateRangeSpec)))==null?void 0:V.key)||"legacy",keywords:A.label,field:A}}),x=[];let b=(Y=n.metricSourceIds)!=null&&Y.length?n.metricSourceIds:[...new Set(n.fields.map(A=>{var L;return A.databaseId||((L=A.binding)==null?void 0:L.dataSourceId)}).filter(Boolean))];const E=new Map(n.fields.map(A=>[A.placeholder,A])),j=new Map;function N(A){const L=h==null?void 0:h.querySelector("#preview-status");L&&(L.textContent=A)}function C(){h==null||h.querySelectorAll("[data-send]").forEach(A=>A.disabled=l||!n.notificationConfigured)}async function k(A){A.text===n.draftTemplate&&A.document===n.draftTemplateDocument||(await ye("daily.saveTemplate",{id:O,...A}),n.draftTemplate=A.text,n.draftTemplateDocument=A.document)}async function D(){var A;try{const L=await ye("daily.get",{id:O});if(s)return;n.notificationConfigured=L.notificationConfigured,n.sources=L.sources,C(),(A=h==null?void 0:h.querySelector("[data-notification-notice]"))==null||A.toggleAttribute("hidden",!!n.notificationConfigured),await z()}catch(L){N(String(L))}}async function z(){var L;const A=await Promise.allSettled(b.map(async B=>({sourceId:B,metrics:(await sN(O,B)).metrics})));if(!s){v.splice(0,v.length,...v.filter(B=>B.field)),x.length=0;for(const B of A)if(B.status==="fulfilled")for(const V of B.value.metrics){const $=`${B.value.sourceId}:${V.id}`;x.push([$,V.name,V.name,0]);const J=V.granularity==="monthly"?[{key:"month",label:"本月"}]:zl;for(const oe of J)v.push({key:`${$}:${oe.key}`,metric:$,scope:oe.key,label:V.granularity==="monthly"?V.name:oe.label+V.name,keywords:V.name+" "+oe.label+" "+(((L=n.sources.find(ce=>ce.id===B.value.sourceId))==null?void 0:L.name)||""),sourceId:B.value.sourceId,metricId:V.id});for(const oe of v.filter(ce=>ce.metric===$&&ce.field))oe.sourceId=B.value.sourceId,oe.metricId=V.id}A.some(B=>B.status==="rejected")?N("部分指标目录读取失败，请到系统设置刷新数据库。"):b.length||N("请在右上角任务设置中配置本任务的指标范围。")}}const O=n.id,H={dirty(){m++,p=void 0},id:O,name:n.name,sendTime:n.sendTime,businessDate:`${g.getFullYear()}-${String(g.getMonth()+1).padStart(2,"0")}-${String(g.getDate()).padStart(2,"0")}`,definitions:v,metrics:x,value:A=>{var L,B,V;return A.metric==="date"?"业务日期":((L=p==null?void 0:p.fieldValues)==null?void 0:L[A.key])||((V=p==null?void 0:p.fieldValues)==null?void 0:V[((B=v.find($=>$.field&&$.metric===A.metric&&$.scope===A.scope))==null?void 0:B.key)||""])||""},mount:(A,L)=>{uN(A,n.draftTemplateDocument,v,L)||cN(A,n.draftTemplate,v,L)},async materialize(A){var oe;if(A.field||A.metric==="date")return A;const L=v.find(ce=>ce.metric===A.metric&&ce.sourceId),B=A.sourceId||(L==null?void 0:L.sourceId),V=A.metricId||(L==null?void 0:L.metricId);if(!B||!V)throw new Error("此字段缺少可用的指标定义，请在任务设置中刷新指标。");const $=JSON.stringify([B,V,A.scope,A.label]);let J=j.get($);return J||(J=ye("daily.addField",{id:O,sourceId:B,metricId:V,placeholder:"",displayName:A.label,...A.scope==="month"?{rangeKind:"current-month"}:{dateRangeSpec:(oe=zl.find(ce=>ce.key===A.scope))==null?void 0:oe.spec}}).then(({field:ce})=>{E.set(ce.placeholder,ce);const le={...A,key:ce.placeholder,field:ce,sourceId:B,metricId:V};return v.some(U=>U.key===le.key)||v.push(le),a.changed(),le}).catch(ce=>{throw j.delete($),ce}),j.set($,J)),J},save(A){const L=kv(A),B=f.catch(()=>{}).then(()=>s?void 0:k(L));return f=B,B},preview(A,L){const B=kv(A),V=++m,$=f.catch(()=>{}).then(async()=>{if(s||V!==m)return{succeeded:!1,text:"",message:"内容已修改，请重新生成预览",errors:[]};await k(B);const J=await ye("daily.preview",{id:O,businessDate:L},12e4),oe={...J,errors:J.fieldErrors||[],message:J.succeeded?"已生成 · "+L:J.message};return V===m&&!s&&(p=oe),oe});return f=$,$},async send(A,L,B){if(!l){if(!n.notificationConfigured)throw new Error("请先在系统设置中配置通知渠道。");l=!0,C();try{await H.save(A);const V=await ye(L==="test"?"daily.test":"daily.sendToday",L==="test"?{id:O,businessDate:B}:{id:O},12e4);if(!V.succeeded)throw new Error(V.message||"发送失败，请查看运行记录");N(V.alreadySent?"今日当前内容已发送":L==="test"?"测试发送成功":"今日消息已发送"),a.changed()}finally{l=!1,C()}}},configureAdvanced(A,L){const B=v.some(J=>J.metric===A&&J.scope==="month"),V=B?[{key:"month",label:"本月计划"}]:[{key:"day",label:"日（业务日当天）"},{key:"mtd",label:"月累计（月初至业务日）"},{key:"ytd",label:"年累计（年初至业务日）"},{key:"fullyear",label:"全年"}];L.replaceChildren(...V.map(J=>new Option(J.label,J.key)));const $=L.ownerDocument.querySelector("#scope-year");$&&($.disabled=B,$.value="0")},resolveAdvanced(A,L){return A==="month"?"month":zl.find(B=>B.spec.granularity===A&&B.spec.yearOffset===Number(L)).key},async saveBasics(A,L){const B=Array.from((h==null?void 0:h.querySelectorAll("[data-context-source]:checked"))||[]).map(V=>V.value);await ye("daily.saveBasics",{id:O,name:A,sendTime:L,metricSourceIds:B}),n.name=A,n.sendTime=L,b=B,H.name=A,await z(),a.changed()},connect(A){var Z;h=A,A.title=n.name,A.querySelector("#runs p").textContent="";const L=A.querySelector("header > span");L.removeAttribute("aria-hidden"),L.setAttribute("role","button"),L.setAttribute("tabindex","0"),L.setAttribute("aria-label","返回任务列表");const B=async()=>{const X=A.querySelector("#editor");X.contentEditable="false",m++;try{await H.save(X),a.back()}catch(re){N(String(re)),X.contentEditable="true"}};L.addEventListener("click",B),L.addEventListener("keydown",X=>{X.key==="Enter"&&B()});const V=A.querySelector("#settings"),$=A.createElement("fieldset");$.style.cssText="border:0;padding:0;max-height:180px;overflow:auto";const J=A.createElement("legend");J.textContent="本任务的指标范围",$.append(J);for(const X of n.sources){const re=A.createElement("label");re.style.cssText="display:flex;gap:8px;margin:8px 0";const T=A.createElement("input");T.type="checkbox",T.value=X.id,T.dataset.contextSource="",T.checked=b.includes(X.id),T.style.width="auto",re.append(T,A.createTextNode(X.name)),$.append(re)}(Z=V.querySelector("p"))==null||Z.replaceWith($);const oe=A.createElement("button");oe.textContent="数据库设置",oe.type="button",oe.onclick=()=>{var X;V.close(),(X=a.openSettings)==null||X.call(a)},$.after(oe);const ce=A.querySelector("footer");for(const[X,re]of[["test","测试发送"],["today","发送今日消息"]]){const T=A.createElement("button");T.textContent=re,T.dataset.send=X,T.onclick=async()=>{const R=A.querySelector("#editor");R.contentEditable="false";try{await H.send(R,X,A.querySelector("#date").value)}catch(ee){N(String(ee))}finally{R.contentEditable="true"}},ce.append(T)}const le=A.createElement("style");le.textContent=Wb+`
`+Ib+`
body{font-family:var(--font-ui)}#date-picker{width:154px}`,A.head.append(le);const U=A.createElement("span");U.className="production-message-demo",U.hidden=!0,A.body.append(U),u=df.createRoot(A.querySelector("#date-picker")),u.render(o.jsx(fN,{input:A.querySelector("#date")})),window.addEventListener("production-settings-updated",D);const ae=A.querySelector("#runs");if(ae.ontoggle=async()=>{if(!ae.open)return;const X=ae.querySelector("p");X.textContent="正在读取…";try{const re=await ye("daily.runs",{id:O});X.textContent=re.runs.length?"":"暂无运行记录";for(const T of re.runs){const R=A.createElement("div");R.textContent=`${T.time} · ${T.status} · ${T.businessDate}${T.error?" · "+T.error:""}`,X.append(R)}}catch(re){X.textContent=String(re)}},!n.notificationConfigured){const X=A.createElement("div");X.className="notice",X.dataset.notificationNotice="",X.append(A.createTextNode("通知渠道尚未配置。 "));const re=A.createElement("button");re.textContent="通知设置",re.onclick=a.openSettings||null,X.append(re),A.querySelector("#message").before(X)}C(),z().catch(X=>N(String(X)))},dispose(){s=!0,m++,u==null||u.unmount(),window.removeEventListener("production-settings-updated",D)}};return H}function fN({input:n}){const[a,s]=S.useState(n.value);return o.jsx(tn,{value:a,onChange:l=>{var u;s(l),n.value=l,n.dispatchEvent(new(((u=n.ownerDocument.defaultView)==null?void 0:u.Event)||Event)("change",{bubbles:!0}))}})}const hN=`<!doctype html>
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
`,Rv=()=>{const n=new Date;return n.setDate(n.getDate()-1),`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`};function a0({id:n,...a}){const s=S.useRef(null),[l,u]=S.useState("");return S.useEffect(()=>{let h=!1,f;const m=s.current;return u(""),ye("notionFill.get",{id:n}).then(p=>{h||(f=mN(p,a),m.onload=()=>{var g;!h&&((g=m.contentDocument)!=null&&g.getElementById("date-picker"))&&f.connect(m.contentDocument)},m.srcdoc=hN.replace("../../src/ProductionAssistant.App/Assets/Fonts/Inter.ttf",new URL(e0,window.location.href).href).replace("../../src/ProductionAssistant.App/Assets/Fonts/NotoSansSC.ttf",new URL(t0,window.location.href).href))}).catch(p=>{h||u(String(p.message||p))}),()=>{h=!0,m.onload=null,f==null||f.dispose()}},[n]),o.jsxs("div",{className:"message-template-host",children:[l&&o.jsx("p",{role:"alert",children:l}),o.jsx("iframe",{ref:s,title:"原材料自动入库"})]})}function mN(n,a){let s={...n,runTime:n.runTime||"00:00"},l,u,h=!1,f=!1,m=0,p=0,g=Rv(),v,x=s.isEnabled;const b=X=>l.getElementById(X),E=X=>b(X),j=X=>b(X),N=X=>b(X),C=X=>X instanceof Error?X.message:String(X),k=X=>X.toLocaleString("zh-CN",{minimumFractionDigits:3,maximumFractionDigits:3});function D(X,re=!1){b("feedback").textContent=X,b("feedback").className=re?"callout error":""}function z(){return!!(s.sourcePageUrl&&s.username&&s.passwordConfigured)}function O(){u==null||u.render(o.jsx(tn,{value:g,disabled:f,onChange:A}))}function H(){for(const X of["preview","source-test","yesterday","settings-open","back","confirm-run"])j(X).disabled=f;j("preview").disabled=f||!z()||!s.notionConfigured,j("source-test").disabled=f||!z(),j("run").disabled=f||!v,l.querySelectorAll("#settings button, #settings input").forEach(X=>X.disabled=f),j("toggle").disabled=f||!s.schedulingAvailable,j("preview").textContent=f?"处理中…":"生成预览",b("name").textContent=s.name,b("enabled").textContent=s.isEnabled?s.schedulerInstalled?"已启用":"计划异常":"未启用",b("target-name").textContent=s.targetDataSourceName,b("settings-target-name").textContent=s.targetDataSourceName,E("password").placeholder=s.passwordConfigured?"已保存；留空不修改":"请输入 93 系统密码",O()}function Y(X="尚未生成预览"){m++,v=void 0,b("source-empty").hidden=!1,b("source-values").hidden=!0,b("source-error").hidden=!0,b("record").hidden=!0,b("target-status").hidden=!0,b("target-empty").hidden=!1,b("target-empty").querySelector("strong").textContent=X,b("target-empty").querySelector("span").textContent="预览只读取数据，不会新增记录",j("run").textContent="执行本日期",j("run").disabled=!0,N("confirm").open&&N("confirm").close()}function A(X){f||(g=X,E("date").value=X,Y("待重新预览"),D(""),O())}function L(X){b("source-empty").hidden=!0,b("source-values").hidden=!1;for(const[re,T]of[["plate",X.plateWeight],["section",X.sectionWeight],["total",X.totalWeight]])b(re).textContent=k(T)}function B(X){L(X),b("target-empty").hidden=!0,b("record").hidden=!1,b("record-title").textContent=`${X.businessDate} 入库`,b("record-date").textContent=X.businessDate,b("record-plate").textContent=`${k(X.plateWeight)} 吨`,b("record-section").textContent=`${k(X.sectionWeight)} 吨`,b("target-status").hidden=!1,b("target-status").textContent=X.targetRecordExists?"该日期已有记录，无需新增。":"可新增 1 条入库记录。",j("run").textContent=X.targetRecordExists?"验证查重":"执行本日期"}function V(X){b("run-count").textContent=X.length?`· ${X.length}`:"";const re=X.map(T=>{const R=l.createElement("div");R.className="run";const ee=l.createElement("span");ee.textContent={"source-test":"93 测试",test:"只读预览",manual:"手动执行",automatic:"自动执行"}[T.source]||T.source;const se=l.createElement("div");se.textContent=T.error||T.message||(T.status==="created"?"已新增":T.status==="failed"?"执行失败":"已检查"),T.status==="failed"&&(se.style.color="#B91C1C");const ue=l.createElement("p");ue.textContent=T.status==="failed"?T.businessDate:`${T.businessDate} · 板材 ${k(T.plateWeight)} 吨 · 型材 ${k(T.sectionWeight)} 吨`,se.append(ue);const me=l.createElement("small");return me.textContent=T.time,R.append(ee,se,me),R});b("runs-body").replaceChildren(...re),X.length||(b("runs-body").textContent="暂无运行记录")}async function $(){const X=++p;try{const re=await ye("notionFill.runs",{id:s.id});!h&&X===p&&V(re.runs)}catch(re){!h&&X===p&&(b("runs-body").textContent=`运行记录读取失败：${C(re)}；重新展开可重试。`)}}function J(){Promise.resolve(a.changed()).catch(()=>{})}async function oe(X){if(f||!g)return;f=!0,Y("正在读取…");const re=m;H(),D("");try{const T=await ye(X?"notionFill.testSource":"notionFill.test",{id:s.id,businessDate:g},12e4);if(h||re!==m)return;if(!T.succeeded)throw new Error(T.message||"读取失败");X?(L(T),b("target-empty").querySelector("strong").textContent="尚未检查 Notion",b("target-empty").querySelector("span").textContent="点击“生成预览”完成读取与查重"):(s.validated=!0,v=T,B(T)),J()}catch(T){if(h||re!==m)return;Y("本次预览未完成"),b("source-error").hidden=!1,b("source-error").textContent=C(T)}finally{h||(f=!1,H(),$())}}async function ce(){if(f||!v||!N("confirm").open)return;const X=v.businessDate;N("confirm").close(),f=!0,H(),D("");try{const re=await ye("notionFill.runNow",{id:s.id,businessDate:X},12e4);if(h)return;if(!re.succeeded)throw new Error(re.message||"执行失败");v={...v,targetRecordExists:!0},b("target-status").textContent=re.message,j("run").textContent="验证查重",D(re.created?"Notion 写入成功。":"该日期已有记录，本次已跳过。"),J()}catch(re){h||(Y("执行未完成，请重新预览"),D(C(re),!0))}finally{h||(f=!1,H(),$())}}function le(){return E("task-name").value.trim()!==s.name||E("url").value.trim().replace(/\/+$/,"")!==s.sourcePageUrl||E("username").value.trim()!==s.username||!!E("password").value}function U(){j("toggle").setAttribute("aria-checked",String(x)),b("schedule-hint").textContent=s.schedulingAvailable?le()?"配置已修改：保存后需重新预览，再启用。":s.isEnabled&&!s.schedulerInstalled?s.schedulerMessage:s.validated?"只读预览已通过，可以启用定时入库。":"完成一次“生成预览”后可启用。":"当前运行环境不支持定时启停，预览与手动执行仍可使用。"}async function ae(X){if(X.preventDefault(),f)return;const re=E("task-name").value.trim(),T=E("username").value.trim();if(!re||!T){b("settings-note").textContent="任务名称和用户名不能为空。";return}const R=le(),ee=E("run-time").value;if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(ee)){b("settings-note").textContent="请选择有效的执行时间。";return}const se=R||ee!==s.runTime,ue=R?!1:x;let me=!1;f=!0,H();try{if(se){const ie=E("url").value.trim().replace(/\/+$/,""),W=E("password").value;if(await ye("notionFill.save",{id:s.id,name:re,sourcePageUrl:ie,username:T,password:W,runTime:ee}),h)return;me=!0,s={...s,name:re,sourcePageUrl:ie,username:T,runTime:ee,passwordConfigured:s.passwordConfigured||!!W,isEnabled:R?!1:s.isEnabled,validated:R?!1:s.validated},E("password").value="",R&&Y("配置已修改，请重新预览")}if(ue!==s.isEnabled){const ie=await ye("automation.setEnabled",{id:s.id,taskType:"notion_fill",enabled:ue});if(h)return;if(s.isEnabled=ie.enabled,ie.enabled!==ue)throw new Error(ie.message||"定时任务状态未更新");me=!0}const xe=await ye("notionFill.get",{id:s.id});if(h)return;s=xe,N("settings").close(),D(R?"配置已保存，请重新预览后启用。":"任务设置已保存。")}catch(xe){h||(b("settings-note").textContent=`${me?"设置已更新，但后续操作失败：":""}${C(xe)}`)}finally{h||(f=!1,x=s.isEnabled,H(),U(),me&&J())}}async function Z(){if(f||h)return;const X=m;try{const re=await ye("notionFill.get",{id:s.id});if(h||f||X!==m)return;s=re,Y("系统设置已更新，请重新预览"),H(),D(s.notionConfigured?"系统设置已更新，点击“生成预览”读取数据。":"Notion 连接尚未配置，仍可仅测试 93 读取。")}catch(re){h||D(C(re),!0)}}return{connect(X){u==null||u.unmount(),l=X;const re=l.createElement("style");re.textContent=Wb+`
`+Ib+`
body{color:#292524}#date-picker{width:163px;display:inline-block}`,l.head.append(re);const T=l.createElement("span");T.className="production-message-demo",T.hidden=!0,l.body.append(T),u=df.createRoot(b("date-picker")),E("date").value=g,E("date").onchange=()=>A(E("date").value),j("yesterday").onclick=()=>A(Rv()),j("preview").onclick=()=>{oe(!1)},j("source-test").onclick=()=>{oe(!0)},j("back").onclick=a.back,j("run").onclick=()=>{f||!v||(b("confirm-title").textContent=v.targetRecordExists?"验证查重":"执行本日期",b("confirm-copy").textContent=v.targetRecordExists?`${v.businessDate} 已有记录，本次执行应跳过。`:`将向“${s.targetDataSourceName}”新增 ${v.businessDate} 的记录：板材 ${k(v.plateWeight)} 吨，型材 ${k(v.sectionWeight)} 吨。`,N("confirm").showModal())},j("confirm-run").onclick=()=>{ce()},j("settings-open").onclick=()=>{E("task-name").value=s.name,E("url").value=s.sourcePageUrl,E("username").value=s.username,E("password").value="",E("run-time").value=s.runTime,E("password").required=!s.passwordConfigured,b("settings-note").textContent="修改名称或连接后，需重新预览并启用定时任务。",x=s.isEnabled,U(),N("settings").showModal()},j("toggle").onclick=()=>{if(s.schedulingAvailable){if(!x&&(!s.validated||le())){b("schedule-hint").textContent="请先保存配置并完成“生成预览”，再启用定时入库。";return}x=!x,U()}};for(const R of["task-name","url","username","password"])E(R).oninput=()=>{le()&&(x=!1),U()};b("settings-form").onsubmit=R=>{ae(R)},N("settings").onclose=()=>{E("password").value=""},N("settings").oncancel=R=>{f&&R.preventDefault()},l.querySelectorAll("[data-close]").forEach(R=>R.onclick=()=>{f||N(R.dataset.close).close()}),j("system-settings").hidden=!a.openSettings,j("system-settings").onclick=()=>{var R;N("settings").close(),(R=a.openSettings)==null||R.call(a)},l.querySelector(".runs").ontoggle=R=>{R.currentTarget.open&&$()},window.addEventListener("production-settings-updated",Z),Y(),H(),z()?s.notionConfigured||D("Notion 连接尚未配置，请从任务设置打开系统设置；仍可仅测试 93 读取。"):D("请先在任务设置中补全 93 系统连接配置。")},dispose(){h=!0,m++,p++,u==null||u.unmount(),window.removeEventListener("production-settings-updated",Z)}}}var pN=Object.defineProperty,$a=(n,a)=>pN(n,"name",{value:a,configurable:!0}),i0=!!(typeof window<"u"&&window.document&&window.document.createElement);function yr(n,a,{checkForDefaultPrevented:s=!0}={}){return $a(function(u){if(n==null||n(u),s===!1||!u||!u.defaultPrevented)return a==null?void 0:a(u)},"handleEvent")}$a(yr,"composeEventHandlers");function gN(n){var a;if(!i0)throw new Error("Cannot access window outside of the DOM");return((a=n==null?void 0:n.ownerDocument)==null?void 0:a.defaultView)??window}$a(gN,"getOwnerWindow");function Qd(n){if(!i0)throw new Error("Cannot access document outside of the DOM");return(n==null?void 0:n.ownerDocument)??document}$a(Qd,"getOwnerDocument");function s0(n,a=!1){const{activeElement:s}=Qd(n);if(!(s!=null&&s.nodeName))return null;if(l0(s)&&s.contentDocument)return s0(s.contentDocument.body,a);if(a){const l=s.getAttribute("aria-activedescendant");if(l){const u=Qd(s).getElementById(l);if(u)return u}}return s}$a(s0,"getActiveElement");function l0(n){return n.tagName==="IFRAME"}$a(l0,"isFrame");var yN=Object.defineProperty,Ff=(n,a)=>yN(n,"name",{value:a,configurable:!0});function Jd(n,a){if(typeof n=="function")return n(a);n!=null&&(n.current=a)}Ff(Jd,"setRef");function o0(...n){return a=>{let s=!1;const l=n.map(u=>{const h=Jd(u,a);return!s&&typeof h=="function"&&(s=!0),h});if(s)return()=>{for(let u=0;u<l.length;u++){const h=l[u];typeof h=="function"?h():Jd(n[u],null)}}}}Ff(o0,"composeRefs");function Ka(...n){return S.useCallback(o0(...n),n)}Ff(Ka,"useComposedRefs");var vN=Object.defineProperty,Wt=(n,a)=>vN(n,"name",{value:a,configurable:!0});function xN(n,a){const s=S.createContext(a);s.displayName=n+"Context";const l=Wt(h=>{const{children:f,...m}=h,p=S.useMemo(()=>m,Object.values(m));return o.jsx(s.Provider,{value:p,children:f})},"Provider");l.displayName=n+"Provider";function u(h,f={}){const{optional:m=!1}=f,p=S.useContext(s);if(p)return p;if(a!==void 0)return a;if(!m)throw new Error(`\`${h}\` must be used within \`${n}\``)}return Wt(u,"useContext"),[l,u]}Wt(xN,"createContext");function c0(n,a=[]){let s=[];function l(h,f){const m=S.createContext(f);m.displayName=h+"Context";const p=s.length;s=[...s,f];const g=Wt(x=>{var k;const{scope:b,children:E,...j}=x,N=((k=b==null?void 0:b[n])==null?void 0:k[p])||m,C=S.useMemo(()=>j,Object.values(j));return o.jsx(N.Provider,{value:C,children:E})},"Provider");g.displayName=h+"Provider";function v(x,b,E={}){var k;const{optional:j=!1}=E,N=((k=b==null?void 0:b[n])==null?void 0:k[p])||m,C=S.useContext(N);if(C)return C;if(f!==void 0)return f;if(!j)throw new Error(`\`${x}\` must be used within \`${h}\``)}return Wt(v,"useContext"),[g,v]}Wt(l,"createContext");const u=Wt(()=>{const h=s.map(f=>S.createContext(f));return Wt(function(m){const p=(m==null?void 0:m[n])||h;return S.useMemo(()=>({[`__scope${n}`]:{...m,[n]:p}}),[m,p])},"useScope")},"createScope");return u.scopeName=n,[l,u0(u,...a)]}Wt(c0,"createContextScope");function u0(...n){const a=n[0];if(n.length===1)return a;const s=Wt(()=>{const l=n.map(u=>({useScope:u(),scopeName:u.scopeName}));return Wt(function(h){const f=l.reduce((m,{useScope:p,scopeName:g})=>{const x=p(h)[`__scope${g}`];return{...m,...x}},{});return S.useMemo(()=>({[`__scope${a.scopeName}`]:f}),[f])},"useComposedScopes")},"createScope");return s.scopeName=a.scopeName,s}Wt(u0,"composeContextScopes");var br=globalThis!=null&&globalThis.document?S.useLayoutEffect:()=>{},bN=Object.defineProperty,SN=(n,a)=>bN(n,"name",{value:a,configurable:!0}),wN=is[" useId ".trim().toString()]||(()=>{}),jN=0;function Ql(n){const[a,s]=S.useState(wN());return br(()=>{n||s(l=>l??String(jN++))},[n]),n||(a?`radix-${a}`:"")}SN(Ql,"useId");var EN=Object.defineProperty,TN=(n,a)=>EN(n,"name",{value:a,configurable:!0}),Ov=is[" useEffectEvent ".trim().toString()],zv=is[" useInsertionEffect ".trim().toString()];function d0(n){if(typeof Ov=="function")return Ov(n);const a=S.useRef(()=>{throw new Error("Cannot call an event handler while rendering.")});return typeof zv=="function"?zv(()=>{a.current=n}):br(()=>{a.current=n}),S.useMemo(()=>((...s)=>{var l;return(l=a.current)==null?void 0:l.call(a,...s)}),[])}TN(d0,"useEffectEvent");var CN=Object.defineProperty,ds=(n,a)=>CN(n,"name",{value:a,configurable:!0}),NN=is[" useInsertionEffect ".trim().toString()]||br;function f0({prop:n,defaultProp:a,onChange:s=ds(()=>{},"onChange"),caller:l}){const[u,h,f]=h0({defaultProp:a,onChange:s}),m=n!==void 0,p=m?n:u,g=S.useCallback(v=>{var x;if(m){const b=m0(v)?v(n):v;b!==n&&((x=f.current)==null||x.call(f,b))}else h(v)},[m,n,h,f]);return[p,g]}ds(f0,"useControllableState");function h0({defaultProp:n,onChange:a}){const[s,l]=S.useState(n),u=S.useRef(s),h=S.useRef(a);return NN(()=>{h.current=a},[a]),S.useEffect(()=>{var f;u.current!==s&&((f=h.current)==null||f.call(h,s),u.current=s)},[s,u]),[s,l,h]}ds(h0,"useUncontrolledState");function m0(n){return typeof n=="function"}ds(m0,"isFunction");var _v=Symbol("RADIX:SYNC_STATE");function DN(n,a,s,l){const{prop:u,defaultProp:h,onChange:f,caller:m}=a,p=u!==void 0,g=d0(f),v=[{...s,state:h}];l&&v.push(l);const[x,b]=S.useReducer((C,k)=>{if(k.type===_v)return{...C,state:k.state};const D=n(C,k);return p&&!Object.is(D.state,C.state)&&g(D.state),D},...v),E=x.state,j=S.useRef(E);S.useEffect(()=>{j.current!==E&&(j.current=E,p||g(E))},[E,j,p]);const N=S.useMemo(()=>u!==void 0?{...x,state:u}:x,[x,u]);return S.useEffect(()=>{p&&!Object.is(u,x.state)&&b({type:_v,state:u})},[u,x.state,p]),[N,b]}ds(DN,"useControllableStateReducer");var AN=Object.defineProperty,un=(n,a)=>AN(n,"name",{value:a,configurable:!0});function $f(n){const a=S.forwardRef((s,l)=>{let{children:u,...h}=s,f=null,m=!1;const p=[];Wd(u)&&typeof _l=="function"&&(u=_l(u._payload)),S.Children.forEach(u,b=>{var E;if(v0(b)){m=!0;const j=b;let N="child"in j.props?j.props.child:j.props.children;Wd(N)&&typeof _l=="function"&&(N=_l(N._payload)),f=kN(j,N),p.push((E=f==null?void 0:f.props)==null?void 0:E.children)}else p.push(b)}),f?f=S.cloneElement(f,void 0,p):!m&&S.Children.count(u)===1&&S.isValidElement(u)&&(f=u);const g=f?y0(f):void 0,v=Ka(l,g);if(!f){if(u||u===0)throw new Error(m?zN(n):ON(n));return u}const x=g0(h,f.props??{});return f.type!==S.Fragment&&(x.ref=l?v:g),S.cloneElement(f,x)});return a.displayName=`${n}.Slot`,a}un($f,"createSlot");var p0=Symbol.for("radix.slottable");function MN(n){const a=un(s=>"child"in s?s.children(s.child):s.children,"Slottable");return a.displayName=`${n}.Slottable`,a.__radixId=p0,a}un(MN,"createSlottable");var kN=un((n,a)=>{if("child"in n.props){const s=n.props.child;return S.isValidElement(s)?S.cloneElement(s,void 0,n.props.children(s.props.children)):null}return S.isValidElement(a)?a:null},"getSlottableElementFromSlottable");function g0(n,a){const s={...a};for(const l in a){const u=n[l],h=a[l];/^on[A-Z]/.test(l)?u&&h?s[l]=(...m)=>{const p=h(...m);return u(...m),p}:u&&(s[l]=u):l==="style"?s[l]={...u,...h}:l==="className"&&(s[l]=[u,h].filter(Boolean).join(" "))}return{...n,...s}}un(g0,"mergeProps");function y0(n){var l,u;let a=(l=Object.getOwnPropertyDescriptor(n.props,"ref"))==null?void 0:l.get,s=a&&"isReactWarning"in a&&a.isReactWarning;return s?n.ref:(a=(u=Object.getOwnPropertyDescriptor(n,"ref"))==null?void 0:u.get,s=a&&"isReactWarning"in a&&a.isReactWarning,s?n.props.ref:n.props.ref||n.ref)}un(y0,"getElementRef");function v0(n){return S.isValidElement(n)&&typeof n.type=="function"&&"__radixId"in n.type&&n.type.__radixId===p0}un(v0,"isSlottable");var RN=Symbol.for("react.lazy");function Wd(n){return n!=null&&typeof n=="object"&&"$$typeof"in n&&n.$$typeof===RN&&"_payload"in n&&x0(n._payload)}un(Wd,"isLazyComponent");function x0(n){return typeof n=="object"&&n!==null&&"then"in n}un(x0,"isPromiseLike");var ON=un(n=>`${n} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`,"createSlotError"),zN=un(n=>`${n} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`,"createSlottableError"),_l=is[" use ".trim().toString()],_N=Object.defineProperty,VN=(n,a)=>_N(n,"name",{value:a,configurable:!0}),BN=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],$r=BN.reduce((n,a)=>{const s=$f(`Primitive.${a}`),l=S.forwardRef((u,h)=>{const{asChild:f,...m}=u,p=f?s:a;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),o.jsx(p,{...m,ref:h})});return l.displayName=`Primitive.${a}`,{...n,[a]:l}},{});function b0(n,a){n&&Pf.flushSync(()=>n.dispatchEvent(a))}VN(b0,"dispatchDiscreteCustomEvent");var LN=Object.defineProperty,UN=(n,a)=>LN(n,"name",{value:a,configurable:!0});function Pa(n){const a=S.useRef(n);return S.useEffect(()=>{a.current=n}),S.useMemo(()=>((...s)=>{var l;return(l=a.current)==null?void 0:l.call(a,...s)}),[])}UN(Pa,"useCallbackRef");var HN=Object.defineProperty,ot=(n,a)=>HN(n,"name",{value:a,configurable:!0}),Id="dismissableLayer.update",qN="dismissableLayer.pointerDownOutside",YN="dismissableLayer.focusOutside",Vv,S0=S.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set,dismissableSurfaces:new Set}),PN=S.forwardRef(ot(function(a,s){const{disableOutsidePointerEvents:l=!1,deferPointerDownOutside:u=!1,onEscapeKeyDown:h,onPointerDownOutside:f,onFocusOutside:m,onInteractOutside:p,onDismiss:g,...v}=a,x=S.useContext(S0),[b,E]=S.useState(null),j=(b==null?void 0:b.ownerDocument)??(globalThis==null?void 0:globalThis.document),[,N]=S.useState({}),C=Ka(s,E),k=Array.from(x.layers),[D]=[...x.layersWithOutsidePointerEventsDisabled].slice(-1),z=D?k.indexOf(D):-1,O=b?k.indexOf(b):-1,H=x.layersWithOutsidePointerEventsDisabled.size>0,Y=O>=z,A=S.useRef(!1),L=j0(J=>{f==null||f(J),p==null||p(J),J.defaultPrevented||g==null||g()},{ownerDocument:j,deferPointerDownOutside:u,isDeferredPointerDownOutsideRef:A,dismissableSurfaces:x.dismissableSurfaces,shouldHandlePointerDownOutside:S.useCallback(J=>{if(!(J instanceof Node))return!1;const oe=[...x.branches].some(ce=>ce.contains(J));return Y&&!oe},[x.branches,Y])}),B=E0(J=>{if(u&&A.current)return;const oe=J.target;[...x.branches].some(le=>le.contains(oe))||(m==null||m(J),p==null||p(J),J.defaultPrevented||g==null||g())},j),V=b?O===k.length-1:!1,$=Pa(J=>{J.key==="Escape"&&(h==null||h(J),!J.defaultPrevented&&g&&(J.preventDefault(),g()))});return S.useEffect(()=>{if(V)return j.addEventListener("keydown",$,{capture:!0}),()=>j.removeEventListener("keydown",$,{capture:!0})},[j,V,$]),S.useEffect(()=>{if(b)return l&&(x.layersWithOutsidePointerEventsDisabled.size===0&&(Vv=j.body.style.pointerEvents,j.body.style.pointerEvents="none"),x.layersWithOutsidePointerEventsDisabled.add(b)),x.layers.add(b),ef(),()=>{l&&(x.layersWithOutsidePointerEventsDisabled.delete(b),x.layersWithOutsidePointerEventsDisabled.size===0&&(j.body.style.pointerEvents=Vv))}},[b,j,l,x]),S.useEffect(()=>()=>{b&&(x.layers.delete(b),x.layersWithOutsidePointerEventsDisabled.delete(b),ef())},[b,x]),S.useEffect(()=>{const J=ot(()=>N({}),"handleUpdate");return document.addEventListener(Id,J),()=>document.removeEventListener(Id,J)},[]),o.jsx($r.div,{...v,ref:C,style:{pointerEvents:H?Y?"auto":"none":void 0,...a.style},onFocusCapture:yr(a.onFocusCapture,B.onFocusCapture),onBlurCapture:yr(a.onBlurCapture,B.onBlurCapture),onPointerDownCapture:yr(a.onPointerDownCapture,L.onPointerDownCapture)})},"DismissableLayer"));function w0(){const n=S.useContext(S0),[a,s]=S.useState(null);return S.useEffect(()=>{if(a)return n.dismissableSurfaces.add(a),()=>{n.dismissableSurfaces.delete(a)}},[a,n.dismissableSurfaces]),s}ot(w0,"useDismissableLayerSurface");var GN=ot(()=>!0,"IS_TRUE");function j0(n,a){const{ownerDocument:s=globalThis==null?void 0:globalThis.document,deferPointerDownOutside:l=!1,isDeferredPointerDownOutsideRef:u,dismissableSurfaces:h,shouldHandlePointerDownOutside:f=GN}=a,m=Pa(n),p=S.useRef(!1),g=S.useRef(!1),v=S.useRef(new Map),x=S.useRef(()=>{});return S.useEffect(()=>{function b(){g.current=!1,u.current=!1,v.current.clear()}ot(b,"resetOutsideInteraction");function E(){return Array.from(v.current.values()).some(Boolean)}ot(E,"isOutsideInteractionIntercepted");function j(z){if(!g.current)return;const O=z.target;O instanceof Node&&[...h].some(Y=>Y.contains(O))||v.current.set(z.type,!0),z.type==="click"&&window.setTimeout(()=>{g.current&&x.current()},0)}ot(j,"handleInteractionCapture");function N(z){g.current&&v.current.set(z.type,!1)}ot(N,"handleInteractionBubble");const C=ot(z=>{if(z.target&&!p.current){let O=function(){s.removeEventListener("click",x.current);const Y=E();b(),Y||Kf(qN,m,H,{discrete:!0})};if(ot(O,"handleAndDispatchPointerDownOutsideEvent"),!f(z.target)){s.removeEventListener("click",x.current),b(),p.current=!1;return}const H={originalEvent:z};g.current=!0,u.current=l&&z.button===0,v.current.clear(),!l||z.button!==0?O():(s.removeEventListener("click",x.current),x.current=O,s.addEventListener("click",x.current,{once:!0}))}else s.removeEventListener("click",x.current),b();p.current=!1},"handlePointerDown"),k=["pointerup","mousedown","mouseup","touchstart","touchend","click"];for(const z of k)s.addEventListener(z,j,!0),s.addEventListener(z,N);const D=window.setTimeout(()=>{s.addEventListener("pointerdown",C)},0);return()=>{window.clearTimeout(D),s.removeEventListener("pointerdown",C),s.removeEventListener("click",x.current);for(const z of k)s.removeEventListener(z,j,!0),s.removeEventListener(z,N)}},[s,m,l,u,h,f]),{onPointerDownCapture:ot(()=>p.current=!0,"onPointerDownCapture")}}ot(j0,"usePointerDownOutside");function E0(n,a=globalThis==null?void 0:globalThis.document){const s=Pa(n),l=S.useRef(!1);return S.useEffect(()=>{const u=ot(h=>{h.target&&!l.current&&Kf(YN,s,{originalEvent:h},{discrete:!1})},"handleFocus");return a.addEventListener("focusin",u),()=>a.removeEventListener("focusin",u)},[a,s]),{onFocusCapture:ot(()=>l.current=!0,"onFocusCapture"),onBlurCapture:ot(()=>l.current=!1,"onBlurCapture")}}ot(E0,"useFocusOutside");function ef(){const n=new CustomEvent(Id);document.dispatchEvent(n)}ot(ef,"dispatchUpdate");function Kf(n,a,s,{discrete:l}){const u=s.originalEvent.target,h=new CustomEvent(n,{bubbles:!1,cancelable:!0,detail:s});a&&u.addEventListener(n,a,{once:!0}),l?b0(u,h):u.dispatchEvent(h)}ot(Kf,"handleAndDispatchCustomEvent");var XN=Object.defineProperty,St=(n,a)=>XN(n,"name",{value:a,configurable:!0}),hd="focusScope.autoFocusOnMount",md="focusScope.autoFocusOnUnmount",Bv={bubbles:!1,cancelable:!0},FN=S.forwardRef(St(function(a,s){const{loop:l=!1,trapped:u=!1,onMountAutoFocus:h,onUnmountAutoFocus:f,...m}=a,[p,g]=S.useState(null),v=Pa(h),x=Pa(f),b=S.useRef(null),E=Ka(s,g),j=S.useRef({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;S.useEffect(()=>{if(u){let C=function(O){if(j.paused||!p)return;const H=O.target;p.contains(H)?b.current=H:Yn(b.current,{select:!0})},k=function(O){if(j.paused||!p)return;const H=O.relatedTarget;H!==null&&(p.contains(H)||Yn(b.current,{select:!0}))},D=function(O){if(document.activeElement===document.body)for(const Y of O)Y.removedNodes.length>0&&Yn(p)};St(C,"handleFocusIn"),St(k,"handleFocusOut"),St(D,"handleMutations"),document.addEventListener("focusin",C),document.addEventListener("focusout",k);const z=new MutationObserver(D);return p&&z.observe(p,{childList:!0,subtree:!0}),()=>{document.removeEventListener("focusin",C),document.removeEventListener("focusout",k),z.disconnect()}}},[u,p,j.paused]),S.useEffect(()=>{if(p){Lv.add(j);const C=document.activeElement;if(!p.contains(C)){const D=new CustomEvent(hd,Bv);p.addEventListener(hd,v),p.dispatchEvent(D),D.defaultPrevented||(T0(M0(Zf(p)),{select:!0}),document.activeElement===C&&Yn(p))}return()=>{p.removeEventListener(hd,v),setTimeout(()=>{const D=new CustomEvent(md,Bv);p.addEventListener(md,x),p.dispatchEvent(D),D.defaultPrevented||Yn(C??document.body,{select:!0}),p.removeEventListener(md,x),Lv.remove(j)},0)}}},[p,v,x,j]);const N=S.useCallback(C=>{if(!l&&!u||j.paused)return;const k=C.key==="Tab"&&!C.altKey&&!C.ctrlKey&&!C.metaKey,D=document.activeElement;if(k&&D){const z=C.currentTarget,[O,H]=C0(z);O&&H?!C.shiftKey&&D===H?(C.preventDefault(),l&&Yn(O,{select:!0})):C.shiftKey&&D===O&&(C.preventDefault(),l&&Yn(H,{select:!0})):D===z&&C.preventDefault()}},[l,u,j.paused]);return o.jsx($r.div,{tabIndex:-1,...m,ref:E,onKeyDown:N})},"FocusScope"));function T0(n,{select:a=!1}={}){const s=document.activeElement;for(const l of n)if(Yn(l,{select:a}),document.activeElement!==s)return}St(T0,"focusFirst");function C0(n){const a=Zf(n),s=tf(a,n),l=tf(a.reverse(),n);return[s,l]}St(C0,"getTabbableEdges");function Zf(n){const a=[],s=document.createTreeWalker(n,NodeFilter.SHOW_ELEMENT,{acceptNode:St(l=>{const u=l.tagName==="INPUT"&&l.type==="hidden";return l.disabled||l.hidden||u?NodeFilter.FILTER_SKIP:l.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP},"acceptNode")});for(;s.nextNode();)a.push(s.currentNode);return a}St(Zf,"getTabbableCandidates");function tf(n,a){const s=typeof a.checkVisibility=="function"&&a.checkVisibility({checkVisibilityCSS:!0});for(const l of n)if(!(s?!l.checkVisibility({checkVisibilityCSS:!0}):N0(l,{upTo:a})))return l}St(tf,"findVisible");function N0(n,{upTo:a}){if(getComputedStyle(n).visibility==="hidden")return!0;for(;n;){if(a!==void 0&&n===a)return!1;if(getComputedStyle(n).display==="none")return!0;n=n.parentElement}return!1}St(N0,"isHidden");function D0(n){return n instanceof HTMLInputElement&&"select"in n}St(D0,"isSelectableInput");function Yn(n,{select:a=!1}={}){if(n&&n.focus){const s=document.activeElement;n.focus({preventScroll:!0}),n!==s&&D0(n)&&a&&n.select()}}St(Yn,"focus");var Lv=A0();function A0(){let n=[];return{add(a){const s=n[0];a!==s&&(s==null||s.pause()),n=nf(n,a),n.unshift(a)},remove(a){var s;n=nf(n,a),(s=n[0])==null||s.resume()}}}St(A0,"createFocusScopesStack");function nf(n,a){const s=[...n],l=s.indexOf(a);return l!==-1&&s.splice(l,1),s}St(nf,"arrayRemove");function M0(n){return n.filter(a=>a.tagName!=="A")}St(M0,"removeLinks");var $N=Object.defineProperty,KN=(n,a)=>$N(n,"name",{value:a,configurable:!0}),ZN=S.forwardRef(KN(function(a,s){var p;const{container:l,...u}=a,[h,f]=S.useState(!1);br(()=>f(!0),[]);const m=l||h&&((p=globalThis==null?void 0:globalThis.document)==null?void 0:p.body);return m?Pf.createPortal(o.jsx($r.div,{...u,ref:s}),m):null},"Portal")),QN=Object.defineProperty,Pn=(n,a)=>QN(n,"name",{value:a,configurable:!0});function k0(n,a){return S.useReducer((s,l)=>a[s][l]??s,n)}Pn(k0,"useStateMachine");var Qf=Pn(n=>{const{present:a,children:s}=n,l=R0(a),u=typeof s=="function"?s({present:l.isPresent}):S.Children.only(s),h=O0(l.ref,z0(u));return typeof s=="function"||l.isPresent?S.cloneElement(u,{ref:h}):null},"Presence");function R0(n){const[a,s]=S.useState(),l=S.useRef(null),u=S.useRef(n),h=S.useRef("none"),f=S.useRef(void 0),m=n?"mounted":"unmounted",[p,g]=k0(m,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return S.useEffect(()=>{p==="mounted"?(h.current=f.current??Va(l.current),f.current=void 0):h.current="none"},[p]),br(()=>{const v=l.current,x=u.current;if(x!==n){const E=h.current,j=Va(v);n?(f.current=j,g("MOUNT")):j==="none"||(v==null?void 0:v.display)==="none"?g("UNMOUNT"):g(x&&E!==j?"ANIMATION_OUT":"UNMOUNT"),u.current=n}},[n,g]),br(()=>{if(a){let v;const x=a.ownerDocument.defaultView??window,b=Pn(j=>{const C=Va(l.current).includes(CSS.escape(j.animationName));if(j.target===a&&C&&(g("ANIMATION_END"),!u.current)){const k=a.style.animationFillMode;a.style.animationFillMode="forwards",v=x.setTimeout(()=>{a.style.animationFillMode==="forwards"&&(a.style.animationFillMode=k)})}},"handleAnimationEnd"),E=Pn(j=>{j.target===a&&(h.current=Va(l.current))},"handleAnimationStart");return a.addEventListener("animationstart",E),a.addEventListener("animationcancel",b),a.addEventListener("animationend",b),()=>{x.clearTimeout(v),a.removeEventListener("animationstart",E),a.removeEventListener("animationcancel",b),a.removeEventListener("animationend",b)}}else g("ANIMATION_END")},[a,g]),{isPresent:["mounted","unmountSuspended"].includes(p),ref:S.useCallback(v=>{if(v){const x=getComputedStyle(v);l.current=x,f.current=Va(x)}else l.current=null;s(v)},[])}}Pn(R0,"usePresence");function rf(n,a){if(typeof n=="function")return n(a);n!=null&&(n.current=a)}Pn(rf,"setRef");function O0(...n){const a=S.useRef(n);return a.current=n,S.useCallback(s=>{const l=a.current;let u=!1;const h=l.map(f=>{const m=rf(f,s);return!u&&typeof m=="function"&&(u=!0),m});if(u)return()=>{for(let f=0;f<h.length;f++){const m=h[f];typeof m=="function"?m():rf(l[f],null)}}},[])}Pn(O0,"useStableComposedRefs");function Va(n){return(n==null?void 0:n.animationName)||"none"}Pn(Va,"getAnimationName");function z0(n){var l,u;let a=(l=Object.getOwnPropertyDescriptor(n.props,"ref"))==null?void 0:l.get,s=a&&"isReactWarning"in a&&a.isReactWarning;return s?n.ref:(a=(u=Object.getOwnPropertyDescriptor(n,"ref"))==null?void 0:u.get,s=a&&"isReactWarning"in a&&a.isReactWarning,s?n.props.ref:n.props.ref||n.ref)}Pn(z0,"getElementRef");var JN=Object.defineProperty,Jf=(n,a)=>JN(n,"name",{value:a,configurable:!0}),Vl=0,pn=null;function WN(n){return Wf(),n.children}Jf(WN,"FocusGuards");function Wf(){S.useEffect(()=>{pn||(pn={start:af(),end:af()});const{start:n,end:a}=pn;return document.body.firstElementChild!==n&&document.body.insertAdjacentElement("afterbegin",n),document.body.lastElementChild!==a&&document.body.insertAdjacentElement("beforeend",a),Vl++,()=>{Vl===1&&(pn==null||pn.start.remove(),pn==null||pn.end.remove(),pn=null),Vl=Math.max(0,Vl-1)}},[])}Jf(Wf,"useFocusGuards");function af(){const n=document.createElement("span");return n.setAttribute("data-radix-focus-guard",""),n.tabIndex=0,n.style.outline="none",n.style.opacity="0",n.style.position="fixed",n.style.pointerEvents="none",n}Jf(af,"createFocusGuard");var vn=function(){return vn=Object.assign||function(a){for(var s,l=1,u=arguments.length;l<u;l++){s=arguments[l];for(var h in s)Object.prototype.hasOwnProperty.call(s,h)&&(a[h]=s[h])}return a},vn.apply(this,arguments)};function _0(n,a){var s={};for(var l in n)Object.prototype.hasOwnProperty.call(n,l)&&a.indexOf(l)<0&&(s[l]=n[l]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var u=0,l=Object.getOwnPropertySymbols(n);u<l.length;u++)a.indexOf(l[u])<0&&Object.prototype.propertyIsEnumerable.call(n,l[u])&&(s[l[u]]=n[l[u]]);return s}function IN(n,a,s){if(s||arguments.length===2)for(var l=0,u=a.length,h;l<u;l++)(h||!(l in a))&&(h||(h=Array.prototype.slice.call(a,0,l)),h[l]=a[l]);return n.concat(h||Array.prototype.slice.call(a))}var Jl="right-scroll-bar-position",Wl="width-before-scroll-bar",eD="with-scroll-bars-hidden",tD="--removed-body-scroll-bar-size";function pd(n,a){return typeof n=="function"?n(a):n&&(n.current=a),n}function nD(n,a){var s=S.useState(function(){return{value:n,callback:a,facade:{get current(){return s.value},set current(l){var u=s.value;u!==l&&(s.value=l,s.callback(l,u))}}}})[0];return s.callback=a,s.facade}var rD=typeof window<"u"?S.useLayoutEffect:S.useEffect,Uv=new WeakMap;function aD(n,a){var s=nD(null,function(l){return n.forEach(function(u){return pd(u,l)})});return rD(function(){var l=Uv.get(s);if(l){var u=new Set(l),h=new Set(n),f=s.current;u.forEach(function(m){h.has(m)||pd(m,null)}),h.forEach(function(m){u.has(m)||pd(m,f)})}Uv.set(s,n)},[n]),s}function iD(n){return n}function sD(n,a){a===void 0&&(a=iD);var s=[],l=!1,u={read:function(){if(l)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return s.length?s[s.length-1]:n},useMedium:function(h){var f=a(h,l);return s.push(f),function(){s=s.filter(function(m){return m!==f})}},assignSyncMedium:function(h){for(l=!0;s.length;){var f=s;s=[],f.forEach(h)}s={push:function(m){return h(m)},filter:function(){return s}}},assignMedium:function(h){l=!0;var f=[];if(s.length){var m=s;s=[],m.forEach(h),f=s}var p=function(){var v=f;f=[],v.forEach(h)},g=function(){return Promise.resolve().then(p)};g(),s={push:function(v){f.push(v),g()},filter:function(v){return f=f.filter(v),s}}}};return u}function lD(n){n===void 0&&(n={});var a=sD(null);return a.options=vn({async:!0,ssr:!1},n),a}var V0=function(n){var a=n.sideCar,s=_0(n,["sideCar"]);if(!a)throw new Error("Sidecar: please provide `sideCar` property to import the right car");var l=a.read();if(!l)throw new Error("Sidecar medium not found");return S.createElement(l,vn({},s))};V0.isSideCarExport=!0;function oD(n,a){return n.useMedium(a),V0}var B0=lD(),gd=function(){},Do=S.forwardRef(function(n,a){var s=S.useRef(null),l=S.useState({onScrollCapture:gd,onWheelCapture:gd,onTouchMoveCapture:gd}),u=l[0],h=l[1],f=n.forwardProps,m=n.children,p=n.className,g=n.removeScrollBar,v=n.enabled,x=n.shards,b=n.sideCar,E=n.noRelative,j=n.noIsolation,N=n.inert,C=n.allowPinchZoom,k=n.as,D=k===void 0?"div":k,z=n.gapMode,O=_0(n,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noRelative","noIsolation","inert","allowPinchZoom","as","gapMode"]),H=b,Y=aD([s,a]),A=vn(vn({},O),u);return S.createElement(S.Fragment,null,v&&S.createElement(H,{sideCar:B0,removeScrollBar:g,shards:x,noRelative:E,noIsolation:j,inert:N,setCallbacks:h,allowPinchZoom:!!C,lockRef:s,gapMode:z}),f?S.cloneElement(S.Children.only(m),vn(vn({},A),{ref:Y})):S.createElement(D,vn({},A,{className:p,ref:Y}),m))});Do.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};Do.classNames={fullWidth:Wl,zeroRight:Jl};var cD=function(){if(typeof __webpack_nonce__<"u")return __webpack_nonce__};function uD(){if(!document)return null;var n=document.createElement("style");n.type="text/css";var a=cD();return a&&n.setAttribute("nonce",a),n}function dD(n,a){n.styleSheet?n.styleSheet.cssText=a:n.appendChild(document.createTextNode(a))}function fD(n){var a=document.head||document.getElementsByTagName("head")[0];a.appendChild(n)}var hD=function(){var n=0,a=null;return{add:function(s){n==0&&(a=uD())&&(dD(a,s),fD(a)),n++},remove:function(){n--,!n&&a&&(a.parentNode&&a.parentNode.removeChild(a),a=null)}}},mD=function(){var n=hD();return function(a,s){S.useEffect(function(){return n.add(a),function(){n.remove()}},[a&&s])}},L0=function(){var n=mD(),a=function(s){var l=s.styles,u=s.dynamic;return n(l,u),null};return a},pD={left:0,top:0,right:0,gap:0},yd=function(n){return parseInt(n||"",10)||0},gD=function(n){var a=window.getComputedStyle(document.body),s=a[n==="padding"?"paddingLeft":"marginLeft"],l=a[n==="padding"?"paddingTop":"marginTop"],u=a[n==="padding"?"paddingRight":"marginRight"];return[yd(s),yd(l),yd(u)]},yD=function(n){if(n===void 0&&(n="margin"),typeof window>"u")return pD;var a=gD(n),s=document.documentElement.clientWidth,l=window.innerWidth;return{left:a[0],top:a[1],right:a[2],gap:Math.max(0,l-s+a[2]-a[0])}},vD=L0(),Ha="data-scroll-locked",xD=function(n,a,s,l){var u=n.left,h=n.top,f=n.right,m=n.gap;return s===void 0&&(s="margin"),`
  .`.concat(eD,` {
   overflow: hidden `).concat(l,`;
   padding-right: `).concat(m,"px ").concat(l,`;
  }
  body[`).concat(Ha,`] {
    overflow: hidden `).concat(l,`;
    overscroll-behavior: contain;
    `).concat([a&&"position: relative ".concat(l,";"),s==="margin"&&`
    padding-left: `.concat(u,`px;
    padding-top: `).concat(h,`px;
    padding-right: `).concat(f,`px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(m,"px ").concat(l,`;
    `),s==="padding"&&"padding-right: ".concat(m,"px ").concat(l,";")].filter(Boolean).join(""),`
  }
  
  .`).concat(Jl,` {
    right: `).concat(m,"px ").concat(l,`;
  }
  
  .`).concat(Wl,` {
    margin-right: `).concat(m,"px ").concat(l,`;
  }
  
  .`).concat(Jl," .").concat(Jl,` {
    right: 0 `).concat(l,`;
  }
  
  .`).concat(Wl," .").concat(Wl,` {
    margin-right: 0 `).concat(l,`;
  }
  
  body[`).concat(Ha,`] {
    `).concat(tD,": ").concat(m,`px;
  }
`)},Hv=function(){var n=parseInt(document.body.getAttribute(Ha)||"0",10);return isFinite(n)?n:0},bD=function(){S.useEffect(function(){return document.body.setAttribute(Ha,(Hv()+1).toString()),function(){var n=Hv()-1;n<=0?document.body.removeAttribute(Ha):document.body.setAttribute(Ha,n.toString())}},[])},SD=function(n){var a=n.noRelative,s=n.noImportant,l=n.gapMode,u=l===void 0?"margin":l;bD();var h=S.useMemo(function(){return yD(u)},[u]);return S.createElement(vD,{styles:xD(h,!a,u,s?"":"!important")})},sf=!1;if(typeof window<"u")try{var Bl=Object.defineProperty({},"passive",{get:function(){return sf=!0,!0}});window.addEventListener("test",Bl,Bl),window.removeEventListener("test",Bl,Bl)}catch{sf=!1}var Ra=sf?{passive:!1}:!1,wD=function(n){return n.tagName==="TEXTAREA"},U0=function(n,a){if(!(n instanceof Element))return!1;var s=window.getComputedStyle(n);return s[a]!=="hidden"&&!(s.overflowY===s.overflowX&&!wD(n)&&s[a]==="visible")},jD=function(n){return U0(n,"overflowY")},ED=function(n){return U0(n,"overflowX")},qv=function(n,a){var s=a.ownerDocument,l=a;do{typeof ShadowRoot<"u"&&l instanceof ShadowRoot&&(l=l.host);var u=H0(n,l);if(u){var h=q0(n,l),f=h[1],m=h[2];if(f>m)return!0}l=l.parentNode}while(l&&l!==s.body);return!1},TD=function(n){var a=n.scrollTop,s=n.scrollHeight,l=n.clientHeight;return[a,s,l]},CD=function(n){var a=n.scrollLeft,s=n.scrollWidth,l=n.clientWidth;return[a,s,l]},H0=function(n,a){return n==="v"?jD(a):ED(a)},q0=function(n,a){return n==="v"?TD(a):CD(a)},ND=function(n,a){return n==="h"&&a==="rtl"?-1:1},DD=function(n,a,s,l,u){var h=ND(n,window.getComputedStyle(a).direction),f=h*l,m=s.target,p=a.contains(m),g=!1,v=f>0,x=0,b=0;do{if(!m)break;var E=q0(n,m),j=E[0],N=E[1],C=E[2],k=N-C-h*j;(j||k)&&H0(n,m)&&(x+=k,b+=j);var D=m.parentNode;m=D&&D.nodeType===Node.DOCUMENT_FRAGMENT_NODE?D.host:D}while(!p&&m!==document.body||p&&(a.contains(m)||a===m));return(v&&Math.abs(x)<1||!v&&Math.abs(b)<1)&&(g=!0),g},Ll=function(n){return"changedTouches"in n?[n.changedTouches[0].clientX,n.changedTouches[0].clientY]:[0,0]},Yv=function(n){return[n.deltaX,n.deltaY]},Pv=function(n){return n&&"current"in n?n.current:n},AD=function(n,a){return n[0]===a[0]&&n[1]===a[1]},MD=function(n){return`
  .block-interactivity-`.concat(n,` {pointer-events: none;}
  .allow-interactivity-`).concat(n,` {pointer-events: all;}
`)},kD=0,Oa=[];function RD(n){var a=S.useRef([]),s=S.useRef([0,0]),l=S.useRef(),u=S.useState(kD++)[0],h=S.useState(L0)[0],f=S.useRef(n);S.useEffect(function(){f.current=n},[n]),S.useEffect(function(){if(n.inert){document.body.classList.add("block-interactivity-".concat(u));var N=IN([n.lockRef.current],(n.shards||[]).map(Pv),!0).filter(Boolean);return N.forEach(function(C){return C.classList.add("allow-interactivity-".concat(u))}),function(){document.body.classList.remove("block-interactivity-".concat(u)),N.forEach(function(C){return C.classList.remove("allow-interactivity-".concat(u))})}}},[n.inert,n.lockRef.current,n.shards]);var m=S.useCallback(function(N,C){if("touches"in N&&N.touches.length===2||N.type==="wheel"&&N.ctrlKey)return!f.current.allowPinchZoom;var k=Ll(N),D=s.current,z="deltaX"in N?N.deltaX:D[0]-k[0],O="deltaY"in N?N.deltaY:D[1]-k[1],H,Y=N.target,A=Math.abs(z)>Math.abs(O)?"h":"v";if("touches"in N&&A==="h"&&Y.type==="range")return!1;var L=window.getSelection(),B=L&&L.anchorNode,V=B?B===Y||B.contains(Y):!1;if(V)return!1;var $=qv(A,Y);if(!$)return!0;if($?H=A:(H=A==="v"?"h":"v",$=qv(A,Y)),!$)return!1;if(!l.current&&"changedTouches"in N&&(z||O)&&(l.current=H),!H)return!0;var J=l.current||H;return DD(J,C,N,J==="h"?z:O)},[]),p=S.useCallback(function(N){var C=N;if(!(!Oa.length||Oa[Oa.length-1]!==h)){var k="deltaY"in C?Yv(C):Ll(C),D=a.current.filter(function(H){return H.name===C.type&&(H.target===C.target||C.target===H.shadowParent)&&AD(H.delta,k)})[0];if(D&&D.should){C.cancelable&&C.preventDefault();return}if(!D){var z=(f.current.shards||[]).map(Pv).filter(Boolean).filter(function(H){return H.contains(C.target)}),O=z.length>0?m(C,z[0]):!f.current.noIsolation;O&&C.cancelable&&C.preventDefault()}}},[]),g=S.useCallback(function(N,C,k,D){var z={name:N,delta:C,target:k,should:D,shadowParent:OD(k)};a.current.push(z),setTimeout(function(){a.current=a.current.filter(function(O){return O!==z})},1)},[]),v=S.useCallback(function(N){s.current=Ll(N),l.current=void 0},[]),x=S.useCallback(function(N){g(N.type,Yv(N),N.target,m(N,n.lockRef.current))},[]),b=S.useCallback(function(N){g(N.type,Ll(N),N.target,m(N,n.lockRef.current))},[]);S.useEffect(function(){return Oa.push(h),n.setCallbacks({onScrollCapture:x,onWheelCapture:x,onTouchMoveCapture:b}),document.addEventListener("wheel",p,Ra),document.addEventListener("touchmove",p,Ra),document.addEventListener("touchstart",v,Ra),function(){Oa=Oa.filter(function(N){return N!==h}),document.removeEventListener("wheel",p,Ra),document.removeEventListener("touchmove",p,Ra),document.removeEventListener("touchstart",v,Ra)}},[]);var E=n.removeScrollBar,j=n.inert;return S.createElement(S.Fragment,null,j?S.createElement(h,{styles:MD(u)}):null,E?S.createElement(SD,{noRelative:n.noRelative,gapMode:n.gapMode}):null)}function OD(n){for(var a=null;n!==null;)n instanceof ShadowRoot&&(a=n.host,n=n.host),n=n.parentNode;return a}const zD=oD(B0,RD);var Y0=S.forwardRef(function(n,a){return S.createElement(Do,vn({},n,{ref:a,sideCar:zD}))});Y0.classNames=Do.classNames;var _D=function(n){if(typeof document>"u")return null;var a=Array.isArray(n)?n[0]:n;return a.ownerDocument.body},za=new WeakMap,Ul=new WeakMap,Hl={},vd=0,P0=function(n){return n&&(n.host||P0(n.parentNode))},VD=function(n,a){return a.map(function(s){if(n.contains(s))return s;var l=P0(s);return l&&n.contains(l)?l:(console.error("aria-hidden",s,"in not contained inside",n,". Doing nothing"),null)}).filter(function(s){return!!s})},BD=function(n,a,s,l){var u=VD(a,Array.isArray(n)?n:[n]);Hl[s]||(Hl[s]=new WeakMap);var h=Hl[s],f=[],m=new Set,p=new Set(u),g=function(x){!x||m.has(x)||(m.add(x),g(x.parentNode))};u.forEach(g);var v=function(x){!x||p.has(x)||Array.prototype.forEach.call(x.children,function(b){if(m.has(b))v(b);else try{var E=b.getAttribute(l),j=E!==null&&E!=="false",N=(za.get(b)||0)+1,C=(h.get(b)||0)+1;za.set(b,N),h.set(b,C),f.push(b),N===1&&j&&Ul.set(b,!0),C===1&&b.setAttribute(s,"true"),j||b.setAttribute(l,"true")}catch(k){console.error("aria-hidden: cannot operate on ",b,k)}})};return v(a),m.clear(),vd++,function(){f.forEach(function(x){var b=za.get(x)-1,E=h.get(x)-1;za.set(x,b),h.set(x,E),b||(Ul.has(x)||x.removeAttribute(l),Ul.delete(x)),E||x.removeAttribute(s)}),vd--,vd||(za=new WeakMap,za=new WeakMap,Ul=new WeakMap,Hl={})}},LD=function(n,a,s){s===void 0&&(s="data-aria-hidden");var l=Array.from(Array.isArray(n)?n:[n]),u=_D(n);return u?(l.push.apply(l,Array.from(u.querySelectorAll("[aria-live], script"))),BD(l,u,s,"aria-hidden")):function(){return null}},UD=Object.defineProperty,nn=(n,a)=>UD(n,"name",{value:a,configurable:!0}),If="Dialog",[G0,qA]=c0(If),[HD,wn]=G0(If),mo=nn(n=>{const{__scopeDialog:a,children:s,open:l,defaultOpen:u,onOpenChange:h,modal:f=!0}=n,m=S.useRef(null),p=S.useRef(null),[g,v]=f0({prop:l,defaultProp:u??!1,onChange:h,caller:If}),[x,b]=S.useState(0),[E,j]=S.useState(0);return o.jsx(HD,{scope:a,triggerRef:m,contentRef:p,contentId:Ql(),titleId:Ql(),descriptionId:Ql(),titlePresent:x>0,descriptionPresent:E>0,setTitleCount:b,setDescriptionCount:j,open:g,onOpenChange:v,onOpenToggle:S.useCallback(()=>v(N=>!N),[v]),modal:f,children:s})},"Dialog"),X0="DialogPortal",[qD,F0]=G0(X0,{forceMount:void 0}),po=nn(n=>{const{__scopeDialog:a,forceMount:s,children:l,container:u}=n,h=wn(X0,a);return o.jsx(qD,{scope:a,forceMount:s,children:S.Children.map(l,f=>o.jsx(Qf,{present:s||h.open,children:o.jsx(ZN,{asChild:!0,container:u,children:f})}))})},"DialogPortal"),lf="DialogOverlay",go=S.forwardRef(nn(function(a,s){const l=F0(lf,a.__scopeDialog),{forceMount:u=l.forceMount,...h}=a,f=wn(lf,a.__scopeDialog);return f.modal?o.jsx(Qf,{present:u||f.open,children:o.jsx(PD,{...h,ref:s})}):null},"DialogOverlay")),YD=$f("DialogOverlay.RemoveScroll"),PD=S.forwardRef(nn(function(a,s){const{__scopeDialog:l,...u}=a,h=wn(lf,l),f=w0(),m=Ka(s,f);return o.jsx(Y0,{as:YD,allowPinchZoom:!0,shards:[h.contentRef],children:o.jsx($r.div,{"data-state":eh(h.open),...u,ref:m,style:{pointerEvents:"auto",...u.style}})})},"DialogOverlayImpl")),rs="DialogContent",yo=S.forwardRef(nn(function(a,s){const l=F0(rs,a.__scopeDialog),{forceMount:u=l.forceMount,...h}=a,f=wn(rs,a.__scopeDialog);return o.jsx(Qf,{present:u||f.open,children:f.modal?o.jsx(GD,{...h,ref:s}):o.jsx(XD,{...h,ref:s})})},"DialogContent")),GD=S.forwardRef(nn(function(a,s){const l=wn(rs,a.__scopeDialog),u=S.useRef(null),h=Ka(s,l.contentRef,u);return S.useEffect(()=>{const f=u.current;if(f)return LD(f)},[]),o.jsx($0,{...a,ref:h,trapFocus:l.open,disableOutsidePointerEvents:l.open,onCloseAutoFocus:yr(a.onCloseAutoFocus,f=>{var m;f.preventDefault(),(m=l.triggerRef.current)==null||m.focus()}),onPointerDownOutside:yr(a.onPointerDownOutside,f=>{const m=f.detail.originalEvent,p=m.button===0&&m.ctrlKey===!0;(m.button===2||p)&&f.preventDefault()}),onFocusOutside:yr(a.onFocusOutside,f=>f.preventDefault())})},"DialogContentModal")),XD=S.forwardRef(nn(function(a,s){const l=wn(rs,a.__scopeDialog),u=S.useRef(!1),h=S.useRef(!1);return o.jsx($0,{...a,ref:s,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:f=>{var m,p;(m=a.onCloseAutoFocus)==null||m.call(a,f),f.defaultPrevented||(u.current||(p=l.triggerRef.current)==null||p.focus(),f.preventDefault()),u.current=!1,h.current=!1},onInteractOutside:f=>{var g,v;(g=a.onInteractOutside)==null||g.call(a,f),f.defaultPrevented||(u.current=!0,f.detail.originalEvent.type==="pointerdown"&&(h.current=!0));const m=f.target;((v=l.triggerRef.current)==null?void 0:v.contains(m))&&f.preventDefault(),f.detail.originalEvent.type==="focusin"&&h.current&&f.preventDefault()}})},"DialogContentNonModal")),$0=S.forwardRef(nn(function(a,s){const{__scopeDialog:l,trapFocus:u,onOpenAutoFocus:h,onCloseAutoFocus:f,...m}=a,p=wn(rs,l);return Wf(),o.jsx(o.Fragment,{children:o.jsx(FN,{asChild:!0,loop:!0,trapped:u,onMountAutoFocus:h,onUnmountAutoFocus:f,children:o.jsx(PN,{role:"dialog",id:p.contentId,"aria-describedby":p.descriptionPresent?p.descriptionId:void 0,"aria-labelledby":p.titlePresent?p.titleId:void 0,"data-state":eh(p.open),...m,ref:s,deferPointerDownOutside:!0,onDismiss:()=>p.onOpenChange(!1)})})})},"DialogContentImpl")),FD="DialogTitle",vo=S.forwardRef(nn(function(a,s){const{__scopeDialog:l,...u}=a,h=wn(FD,l),{setTitleCount:f}=h;return br(()=>(f(m=>m+1),()=>f(m=>m-1)),[f]),o.jsx($r.h2,{id:h.titleId,...u,ref:s})},"DialogTitle")),$D="DialogDescription",xo=S.forwardRef(nn(function(a,s){const{__scopeDialog:l,...u}=a,h=wn($D,l),{setDescriptionCount:f}=h;return br(()=>(f(m=>m+1),()=>f(m=>m-1)),[f]),o.jsx($r.p,{id:h.descriptionId,...u,ref:s})},"DialogDescription")),KD="DialogClose",bo=S.forwardRef(nn(function(a,s){const{__scopeDialog:l,...u}=a,h=wn(KD,l);return o.jsx($r.button,{type:"button",...u,ref:s,onClick:yr(a.onClick,()=>h.onOpenChange(!1))})},"DialogClose"));function eh(n){return n?"open":"closed"}nn(eh,"getState");function ZD({onCreated:n,onBack:a,onCancel:s}){const[l,u]=S.useState(2),[h,f]=S.useState("日报任务"),[m,p]=S.useState("17:30"),[g,v]=S.useState(!1),[x,b]=S.useState("");async function E(){v(!0),b("");try{const j=await ye("daily.create",{name:h.trim(),sendTime:m});await n(j)}catch(j){b(j instanceof Error?j.message:String(j))}finally{v(!1)}}return o.jsxs(o.Fragment,{children:[o.jsx(QD,{current:l}),x&&o.jsx("div",{className:"notice error",role:"alert",children:o.jsxs("div",{children:[o.jsx("strong",{children:"创建失败"}),o.jsx("span",{children:x})]})}),l===2?o.jsxs("div",{className:"automation-create-step",children:[o.jsxs("div",{children:[o.jsx("h3",{children:"基本信息"}),o.jsx("p",{children:"名称用于在自动化任务列表中识别这份日报。"})]}),o.jsxs("label",{children:["任务名称",o.jsx("input",{value:h,autoFocus:!0,onChange:j=>f(j.target.value)})]}),o.jsxs("div",{className:"dialog-actions",children:[o.jsxs("button",{className:"ghost",onClick:a,children:[o.jsx(ns,{}),"返回选择类型"]}),o.jsx("button",{className:"primary",disabled:!h.trim(),onClick:()=>u(3),children:"下一步"})]})]}):o.jsxs("div",{className:"automation-create-step",children:[o.jsxs("div",{children:[o.jsx("h3",{children:"日报必要配置"}),o.jsx("p",{children:"先确定每天的发送时间；消息字段和测试发送在创建后的专用 Tab 中完成。"})]}),o.jsxs("label",{children:["每天发送时间",o.jsx("input",{type:"time",value:m,onChange:j=>p(j.target.value)})]}),o.jsxs("div",{className:"automation-create-summary",children:[o.jsx("span",{children:"任务类型"}),o.jsx("strong",{children:"日报推送"}),o.jsx("span",{children:"创建后继续"}),o.jsx("strong",{children:"消息内容 → 预览与测试"})]}),o.jsxs("div",{className:"dialog-actions",children:[o.jsxs("button",{className:"ghost",disabled:g,onClick:()=>u(2),children:[o.jsx(ns,{}),"上一步"]}),o.jsx("button",{className:"secondary",disabled:g,onClick:s,children:"取消"}),o.jsxs("button",{className:"primary",disabled:g||!m,onClick:E,children:[g&&o.jsx(Sn,{className:"spin"}),"创建任务"]})]})]})]})}function QD({current:n}){return o.jsxs("ol",{className:"automation-create-progress","aria-label":"新建任务进度",children:[o.jsx("li",{className:"done",children:"1 选择类型"}),o.jsx("li",{className:n===2?"current":"done",children:"2 基本信息"}),o.jsx("li",{className:n===3?"current":"",children:"3 必要配置"})]})}function JD({onCreated:n,onBack:a,onCancel:s}){const[l,u]=S.useState(2),[h,f]=S.useState("原材料入库自动填报"),[m,p]=S.useState(""),[g,v]=S.useState(""),[x,b]=S.useState(""),[E,j]=S.useState(!1),[N,C]=S.useState("");async function k(){j(!0),C("");try{const D=await ye("notionFill.create",{name:h.trim(),sourcePageUrl:m.trim(),username:g.trim(),password:x});await n(D)}catch(D){C(D instanceof Error?D.message:String(D))}finally{j(!1)}}return o.jsxs(o.Fragment,{children:[o.jsx(WD,{current:l}),N&&o.jsx("div",{className:"notice error",role:"alert",children:o.jsxs("div",{children:[o.jsx("strong",{children:"创建失败"}),o.jsx("span",{children:N})]})}),l===2?o.jsxs("div",{className:"automation-create-step",children:[o.jsxs("div",{children:[o.jsx("h3",{children:"基本信息"}),o.jsx("p",{children:"名称用于在自动化任务列表中识别这份填报任务。"})]}),o.jsxs("label",{children:["任务名称",o.jsx("input",{value:h,autoFocus:!0,onChange:D=>f(D.target.value)})]}),o.jsxs("div",{className:"dialog-actions",children:[o.jsxs("button",{className:"ghost",onClick:a,children:[o.jsx(ns,{}),"返回选择类型"]}),o.jsx("button",{className:"primary",disabled:!h.trim(),onClick:()=>u(3),children:"下一步"})]})]}):o.jsxs("div",{className:"automation-create-step",children:[o.jsxs("div",{children:[o.jsx("h3",{children:"93 系统连接"}),o.jsx("p",{children:"凭据只归 NotionFill 任务所有，并使用现有 Windows 加密存储。"})]}),o.jsxs("label",{children:["材料入库业务页面",o.jsx("input",{type:"url",value:m,placeholder:"http://服务器/业务页面",autoFocus:!0,onChange:D=>p(D.target.value)})]}),o.jsxs("label",{children:["93 系统用户名",o.jsx("input",{value:g,autoComplete:"username",onChange:D=>v(D.target.value)})]}),o.jsxs("label",{children:["93 系统密码",o.jsx("input",{type:"password",value:x,autoComplete:"new-password",onChange:D=>b(D.target.value)})]}),o.jsxs("div",{className:"automation-create-summary",children:[o.jsx("span",{children:"填报目标"}),o.jsx("strong",{children:"原材料入库数据库"}),o.jsx("span",{children:"执行时间"}),o.jsx("strong",{children:"每天 00:00 · 填报前一天"}),o.jsx("span",{children:"写入方式"}),o.jsx("strong",{children:"按日期查重，仅新增"})]}),o.jsxs("div",{className:"dialog-actions",children:[o.jsxs("button",{className:"ghost",disabled:E,onClick:()=>u(2),children:[o.jsx(ns,{}),"上一步"]}),o.jsx("button",{className:"secondary",disabled:E,onClick:s,children:"取消"}),o.jsxs("button",{className:"primary",disabled:E||!m.trim()||!g.trim()||!x,onClick:k,children:[E&&o.jsx(Sn,{className:"spin"}),"创建任务"]})]})]})]})}function WD({current:n}){return o.jsxs("ol",{className:"automation-create-progress","aria-label":"新建任务进度",children:[o.jsx("li",{className:"done",children:"1 选择类型"}),o.jsx("li",{className:n===2?"current":"done",children:"2 基本信息"}),o.jsx("li",{className:n===3?"current":"",children:"3 必要配置"})]})}function Ut({value:n,options:a,placeholder:s,disabled:l,ariaLabel:u,onChange:h}){const[f,m]=S.useState(!1),p=Kb(),g=a.find(v=>v.value===n);return o.jsxs("div",{className:"form-picker",children:[o.jsxs("button",{type:"button",className:`picker-trigger ${f?"open":""}`,disabled:l,"aria-label":u,"aria-haspopup":"listbox","aria-expanded":f,onClick:()=>m(!f),children:[o.jsx("span",{className:g?"":"picker-placeholder",children:(g==null?void 0:g.label)||s}),o.jsx(BC,{})]}),f&&o.jsxs(o.Fragment,{children:[o.jsx("button",{type:"button",className:"picker-backdrop","aria-label":"关闭选项",onClick:()=>m(!1)}),o.jsxs(Zb.div,{className:"picker-popover choice-popover",role:"listbox",initial:p?!1:{opacity:0,y:-5},animate:{opacity:1,y:0,transitionEnd:{transform:"none"}},transition:{duration:p?0:.12},children:[a.map(v=>o.jsxs("button",{type:"button",role:"option","aria-selected":v.value===n,className:v.value===n?"selected":"",onClick:()=>{h(v.value),m(!1)},children:[o.jsx("span",{children:v.label}),v.value===n&&o.jsx(us,{})]},v.value)),!a.length&&o.jsx("span",{className:"picker-empty",children:"暂无可选项"})]})]})]})}const xd=[{value:"cutting",label:"下料量"},{value:"welding",label:"装焊量"},{value:"section",label:"型材入库量"},{value:"plate",label:"板材入库量"}],Gv=["firstTarget","secondTarget","dateHeader","label"],Xv=n=>n.rowStep?`每天向下 ${n.rowStep} 行`:`每天向右 ${n.columnStep} 列`;function ID(){const n=new Intl.DateTimeFormat("en",{timeZone:"Asia/Shanghai",year:"numeric",month:"2-digit"}).formatToParts(new Date);return`${n.find(a=>a.type==="year").value}-${n.find(a=>a.type==="month").value}`}function eA({id:n,rules:a,fixedSheet:s,disabled:l,run:u,onActive:h,onSaved:f}){const[m,p]=S.useState("cutting"),[g]=S.useState(ID),[v,x]=S.useState(`${g}-01`),[b,E]=S.useState(`${g}-02`),[j,N]=S.useState(),[C,k]=S.useState({}),[D,z]=S.useState(""),O=!!j,H=xd.find(L=>L.value===m).label,Y={firstTarget:`${v} 的${H}填报格`,secondTarget:`${b} 的${H}填报格`,dateHeader:`${v} 的日期单元格`,label:"项目名称、公司或材料表头"};async function A(L){z(""),await u(L==="preview"?"验证排列并定位第三个日期":L==="confirm"?"保存排列规则":"记录示范位置",async()=>{try{const B=await ye("tencentSheet.teach",{id:n,stage:L,metric:m,firstDate:v,secondDate:b,sessionToken:j==null?void 0:j.sessionToken,previewToken:j==null?void 0:j.previewToken,slot:j==null?void 0:j.step},3e5);L==="confirm"||L==="cancel"?(N(void 0),k({}),h(!1),L==="confirm"&&await f()):(N(V=>({...V,...B})),h(!0),B.capture&&B.slot&&k(V=>({...V,[B.slot]:B.capture})))}catch(B){z(B instanceof Error?B.message:String(B)),L==="cancel"&&(N(void 0),k({}),h(!1))}})}return o.jsxs("fieldset",{className:"tencent-sheet-panel tencent-teaching",disabled:l,children:[o.jsx("legend",{children:"示范填报位置"}),o.jsx("p",{className:"tencent-sheet-help",children:"为每个项目记录排列规则。示范两个日期的位置，程序学习向右或向下的间隔，再请你确认第三个位置。未示范的项目沿用原模板。"}),o.jsx("div",{className:"tencent-teaching-rules",children:xd.map(L=>o.jsxs("div",{children:[o.jsx("strong",{children:L.label}),o.jsx("span",{children:a!=null&&a[L.value]?Xv(a[L.value]):"沿用原模板"})]},L.value))}),D&&o.jsx("div",{className:"notice error",role:"alert",children:o.jsxs("div",{children:[o.jsx("strong",{children:"示范未完成"}),o.jsx("span",{children:D})]})}),O?o.jsxs(o.Fragment,{children:[o.jsx("ol",{className:"tencent-teaching-steps","aria-label":"示范进度",children:Gv.map((L,B)=>{var V;return o.jsxs("li",{"aria-current":j.step===L?"step":void 0,className:C[L]?"done":"",children:[o.jsxs("span",{children:[B+1,". ",Y[L]]}),o.jsx("strong",{children:((V=C[L])==null?void 0:V.address)||"待选取"})]},L)})}),Gv.includes(j.step)&&o.jsxs("div",{className:"tencent-teaching-prompt",children:[o.jsxs("strong",{children:["请在网页中单击：",Y[j.step]]}),o.jsx("p",{children:j.step==="dateHeader"?"选择显示该日期的单元格，程序会检查后续日期是否按同样间隔排列。":j.step==="label"?"选择一处固定的文字标志，用于确认每次填写的仍是这个项目。":"只选中单元格即可，不需要输入数据。已有数据的格子也可用于示范。"}),o.jsx("button",{className:"primary",onClick:()=>A("capture"),children:"记住当前选中的单元格"})]}),j.step==="preview"&&o.jsx("button",{className:"primary",onClick:()=>A("preview"),children:"验证规则并查看第三个位置"}),j.step==="confirm"&&j.rule&&j.prediction&&o.jsxs("div",{className:"tencent-teaching-prompt",children:[o.jsxs("strong",{children:[H,"：",Xv(j.rule)]}),o.jsxs("p",{children:["程序已选中 ",j.prediction.date," 的预测位置 ",o.jsx("b",{children:j.prediction.address}),"。请查看网页，确认它确实是当天的填报格。"]}),o.jsxs("p",{children:["日期及“",j.rule.labelAnchor.expected,"”已通过只读校验。"]}),(j.sheetMode==="fixed"||!j.sheetMode&&s)&&!j.rule.dateAnchor.format.includes("{yyyy}")&&o.jsx("p",{children:"日期未包含完整年月。此固定工作表跨月时需重新示范确认。"}),o.jsxs("div",{className:"tencent-sheet-actions",children:[o.jsx("button",{className:"secondary",onClick:()=>A("preview"),children:"再次定位预测位置"}),o.jsx("button",{className:"primary",onClick:()=>A("confirm"),children:"位置正确，保存此项目"})]})]}),o.jsx("button",{className:"ghost",onClick:()=>A("cancel"),children:"取消示范，保留原配置"})]}):o.jsxs(o.Fragment,{children:[o.jsxs("label",{children:["要示范哪个项目？",o.jsx(Ut,{value:m,options:xd,placeholder:"选择项目",disabled:l,ariaLabel:"要示范的项目",onChange:p})]}),o.jsxs("div",{className:"tencent-sheet-grid",children:[o.jsx(tn,{value:v,onChange:x,label:"第一个示范日期",disabled:l}),o.jsx(tn,{value:b,onChange:E,label:"第二个示范日期",disabled:l})]}),o.jsx("p",{className:"tencent-sheet-help",children:"先在网页选中要配置的工作表。两个日期必须在同一个月，建议使用 1 日和 2 日。"}),o.jsx("button",{className:"secondary",disabled:l||!v||!b,onClick:()=>A("start"),children:a!=null&&a[m]?"重新示范此项目":"开始示范此项目"})]})]})}const tA=[["cutting","下料量"],["welding","装焊量"],["section","型材入库量"],["plate","板材入库量"]],nA={nameBox:"左上角显示单元格地址的输入框",valueBox:"显示单元格内容的编辑区",activeSheet:"底部工作表标签"},So=n=>n instanceof Error?n.message:String(n);function rA({onCreated:n,onCancel:a}){var x;const[s,l]=S.useState({documentUrl:""}),[u,h]=S.useState(!1),[f,m]=S.useState(!1),[p,g]=S.useState("");S.useEffect(()=>{ye("tencentSheet.defaults").then(b=>{l(b.config),h(b.imported)}).catch(b=>g(So(b)))},[]);async function v(){m(!0),g("");try{await n(await ye("tencentSheet.create",{config:s}))}catch(b){g(So(b))}finally{m(!1)}}return o.jsxs("div",{className:"automation-create-step",children:[o.jsxs("div",{children:[o.jsx("h3",{children:"连接生产填报文档"}),o.jsx("p",{children:u?"已找到你在 Demo 中保存的配置，将直接复用。":"粘贴文档分享链接，下一步打开文档并识别填报位置。"})]}),o.jsxs("label",{children:["文档分享链接",o.jsx("input",{type:"url",value:s.documentUrl||"",onChange:b=>l({...s,documentUrl:b.target.value}),placeholder:"粘贴腾讯文档或企业微信文档链接"})]}),p&&o.jsx("p",{role:"alert",children:p}),o.jsxs("div",{className:"dialog-actions",children:[o.jsx("button",{className:"secondary",disabled:f,onClick:a,children:"取消"}),o.jsxs("button",{className:"primary",disabled:f||!((x=s.documentUrl)!=null&&x.trim()),onClick:v,children:[f&&o.jsx(Sn,{className:"spin"}),"创建并配置"]})]})]})}function aA({id:n,changed:a}){const[s,l]=S.useState(),[u,h]=S.useState(""),[f,m]=S.useState(""),[p,g]=S.useState(!1),[v,x]=S.useState([]),[b,E]=S.useState(!1),[j,N]=S.useState(""),[C,k]=S.useState({cutting:"",welding:"",section:"",plate:""}),[D,z]=S.useState(),[O,H]=S.useState(!1),[Y,A]=S.useState(!1),L=()=>ye("tencentSheet.get",{id:n}).then(l);S.useEffect(()=>{L().catch(le=>{g(!0),m(So(le))})},[n]);async function B(le,U){h(le),m(""),g(!1);try{await U()}catch(ae){g(!0),m(So(ae))}finally{h("")}}function V(le){l(U=>U&&{...U,config:le}),H(!0),z(void 0)}async function $(){if(!s)return;const le=await ye("tencentSheet.save",{id:n,config:s.config});l(le),H(!1),z(void 0),a()}async function J(le,U){O&&await $(),z(void 0);const ae=await ye(`tencentSheet.${le}`,{id:n,key:U},3e5);m(ae.message),ae.missing&&x(ae.missing),le==="pick"&&U&&x(Z=>Z.filter(X=>X!==U&&!(U==="activeSheet"&&X==="sheetTabs"))),await L()}if(!s)return o.jsx("div",{className:"notice",role:"status",children:f||"正在读取填报配置…"});const oe=s.config,ce=le=>(le==="activeSheet"?["activeSheet","sheetTabs"]:[le]).every(U=>!v.includes(U)&&!!oe.adapter[U]);return o.jsxs("div",{className:"tencent-sheet-workbench","aria-busy":!!u,children:[o.jsxs("div",{className:"tencent-sheet-intro",children:[o.jsxs("div",{children:[o.jsx("h2",{children:"腾讯文档生产填报"}),o.jsx("p",{children:"连接一次，检查本次数据，再确认填报。目标格已有内容时会停止。"})]}),o.jsx("span",{children:"Development 测试"})]}),f&&o.jsx("div",{className:`notice ${p?"error":"info"}`,role:p?"alert":"status",children:o.jsxs("div",{children:[o.jsx("strong",{children:p?"操作未完成":"操作结果"}),o.jsx("span",{children:f})]})}),o.jsxs("fieldset",{disabled:!!u||Y,className:"tencent-sheet-panel",children:[o.jsx("legend",{children:"1 · 连接文档"}),o.jsxs("label",{children:["文档链接",o.jsx("input",{type:"url",value:oe.documentUrl,onChange:le=>V({...oe,documentUrl:le.target.value})})]}),o.jsxs("div",{className:"tencent-sheet-actions",children:[o.jsx("button",{className:"secondary",onClick:()=>B("打开文档",()=>J("open")),children:"打开文档 / 扫码登录"}),o.jsx("button",{className:"primary",onClick:()=>B("识别页面",()=>J("recognize")),children:"识别并检查"})]}),o.jsx("p",{className:"tencent-sheet-help",children:"首次使用扫码登录。识别过程只获取网页控件位置，不填写数据。"}),o.jsxs("div",{className:"tencent-sheet-guidance",children:[o.jsx("strong",{children:"网页识别位置"}),o.jsx("p",{className:"tencent-sheet-help",children:"识别不准时，点击对应项目重新选取。工作表只需点选当前高亮的标签，即可同时记住标签组和选中状态。程序会自动记住，不需要填写代码或行列。"}),Object.entries(nA).map(([le,U])=>o.jsxs("div",{children:[o.jsxs("span",{children:[U,o.jsx("small",{className:"tencent-control-state",children:ce(le)?"已记录":"待选取"})]}),o.jsx("button",{className:"secondary","aria-label":`点选${U}`,onClick:()=>B("选取网页位置",()=>J("pick",le)),children:ce(le)?"重新点选":"去网页点选"})]},le))]}),o.jsxs("div",{className:"tencent-sheet-guidance",children:[o.jsx("strong",{children:"填报工作表"}),o.jsx("p",{className:"tencent-sheet-help",children:"在网页底部点击要填写的工作表，再记住当前选择。带年月的名称会自动随月份切换。"}),o.jsx("button",{className:"secondary",onClick:()=>B("记住工作表",()=>J("captureSheet")),children:"记住网页当前工作表"}),o.jsx("span",{children:oe.sheetMode==="fixed"?`固定工作表：${oe.sheetName}`:"按业务月份选择工作表"})]}),O&&o.jsx("button",{className:"primary",onClick:()=>B("保存配置",async()=>{await $(),m("配置已保存，请重新检查本次数据。")}),children:"保存文档链接"})]}),o.jsx(eA,{id:n,rules:oe.rules,fixedSheet:oe.sheetMode==="fixed",disabled:!!u||O,run:B,onActive:le=>{A(le),le&&z(void 0)},onSaved:async()=>{await L(),z(void 0),m("排列规则已保存，可以继续示范其他项目，或检查本次填报数据。"),a()}},`${n}:${JSON.stringify(oe)}`),o.jsxs("fieldset",{disabled:!!u||Y,className:"tencent-sheet-panel",children:[o.jsx("legend",{children:"2 · 本次填报数据"}),o.jsxs("label",{className:"tencent-sheet-date-mode",children:[o.jsx("input",{type:"checkbox",checked:b,onChange:le=>{E(le.target.checked),z(void 0)}}),"指定补填日期"]}),b?o.jsx(tn,{label:"业务日期",disabled:!!u,value:j,onChange:le=>{N(le),z(void 0)}}):o.jsx("p",{children:"默认填报前一天，按北京时间计算。"}),o.jsx("div",{className:"tencent-sheet-grid",children:tA.map(([le,U])=>o.jsxs("label",{children:[U,"（吨）",o.jsx("input",{type:"number",min:"0",step:"any",inputMode:"decimal",value:C[le],placeholder:"输入本次实际数据",onChange:ae=>{k({...C,[le]:ae.target.value}),z(void 0)}})]},le))}),o.jsx("button",{className:"primary",disabled:O||b&&!j||Object.values(C).some(le=>le.trim()===""),onClick:()=>B("检查填报位置",async()=>{z(void 0);const le=await ye("tencentSheet.inspect",{id:n,values:C,businessDate:b?j:void 0},3e5);z(le),m(le.message),a()}),children:"检查本次数据与位置"})]}),D&&o.jsxs("section",{className:"tencent-sheet-panel",children:[o.jsx("h3",{children:"3 · 确认填报"}),o.jsxs("p",{children:[D.date," · ",D.sheet]}),o.jsx("div",{className:"tencent-sheet-table",children:o.jsxs("table",{children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{children:"项目"}),o.jsx("th",{children:"位置"}),o.jsx("th",{children:"原内容"}),o.jsx("th",{children:"本次填报（吨）"})]})}),o.jsx("tbody",{children:D.rows.map(le=>o.jsxs("tr",{children:[o.jsx("td",{children:le.label}),o.jsx("td",{children:le.address}),o.jsx("td",{children:le.current||"空白"}),o.jsx("td",{children:le.value})]},le.address))})]})}),o.jsx("p",{children:D.conflict?"目标格已有内容，本次不可写入。":"将仅填写以上空白单元格。确认有效期为 2 分钟。"}),o.jsx("button",{className:"primary",disabled:!!u||!D.token||D.conflict,onClick:()=>B("填报并确认保存",async()=>{const le=D;z(void 0);const U=await ye("tencentSheet.write",{id:n,values:C,businessDate:le.date,token:le.token},31e4);m(U.message),a()}),children:"确认填报以上 4 项"})]}),u&&o.jsxs("p",{role:"status",className:"tencent-sheet-progress",children:[o.jsx(Sn,{className:"spin"}),u,"… 请等待操作结束"]})]})}const K0=[{taskType:"tencent_sheet_fill",name:"腾讯文档填报",includeBasics:!1,description:"连接生产月报，检查位置后填写下料、装焊与材料入库数据。",renderCreate:n=>o.jsx(rA,{...n}),taskTabs:[{id:"configuration",label:"配置与填报"}],resolveSection:()=>"configuration",issueTitle:()=>"请完成文档连接与位置检查",renderEditor:n=>o.jsx(aA,{id:n.id,changed:n.changed}),loadRuns:n=>ye("tencentSheet.runs",{id:n}).then(({runs:a})=>a.map(s=>({...s,title:s.businessDate,details:s.message?[s.message]:[]})))},{taskType:"daily_report",name:"日报推送",description:"查询日报数据、生成消息并发送钉钉。",renderCreate:n=>o.jsx(ZD,{...n}),taskTabs:[{id:"configuration",label:"任务配置"},{id:"execution",label:"运行与测试"}],resolveSection:n=>n==="basics"?"basics":n==="template"?"configuration":"execution",issueTitle:n=>n==="notification"?"通知渠道未就绪":n==="template"?"日报配置尚未验证":"基本信息不完整",renderEditor:n=>o.jsx(r0,{id:n.id,back:()=>n.navigate("list"),changed:n.changed,openSettings:n.openSettings}),loadRuns:n=>ye("daily.runs",{id:n}).then(({runs:a})=>a.map(s=>({id:s.id,time:s.time,source:s.source,status:s.status,title:s.textSummary||`业务日期 ${s.businessDate||"—"}`,details:[`业务日期：${s.businessDate||"—"}`,`阶段：${s.stage}`,`尝试：${s.attempts}`],error:s.error})))},{taskType:"notion_fill",name:"Notion 自动填报",description:"读取 93 系统前一天入库数据并新增到 Notion。",renderCreate:n=>o.jsx(JD,{...n}),taskTabs:[{id:"configuration",label:"任务配置"},{id:"execution",label:"运行与测试"}],resolveSection:n=>n==="basics"?"basics":n==="test"?"execution":"configuration",issueTitle:n=>n==="connection"?"93 系统连接未就绪":n==="target"?"Notion 填报目标未就绪":n==="test"?"任务尚未完成只读测试":"基本信息不完整",renderEditor:n=>o.jsx(a0,{id:n.id,back:()=>n.navigate("list"),changed:n.changed,openSettings:n.openSettings}),loadRuns:n=>ye("notionFill.runs",{id:n}).then(({runs:a})=>a.map(s=>({id:s.id,time:s.time,source:s.source==="source-test"?"93读取测试":s.source==="test"?"只读测试":s.source==="manual"?"手动执行":"自动执行",status:s.status==="created"?"已新增":s.status==="checked"?"已检查":"失败",title:`${s.businessDate} · 板材 ${s.plateWeight.toLocaleString("zh-CN",{maximumFractionDigits:3})} 吨 · 型材 ${s.sectionWeight.toLocaleString("zh-CN",{maximumFractionDigits:3})} 吨`,details:[s.message].filter(Boolean),error:s.error})))}];function Fv(n){return K0.find(a=>a.taskType===n)}const bd=n=>({tone:"error",title:"操作失败",message:n instanceof Error?n.message:String(n)});function iA({openSettings:n}){var B;const[a,s]=S.useState([]),[l,u]=S.useState(),[h,f]=S.useState(""),[m,p]=S.useState(""),[g,v]=S.useState(),[x,b]=S.useState(),[E,j]=S.useState(),[N,C]=S.useState(!1),[k,D]=S.useState(""),[z,O]=S.useState(["daily_report","notion_fill"]),H=()=>ye("automation.list").then(V=>{V.availableTaskTypes&&O(V.availableTaskTypes);const $=Array.isArray(V.tasks)?V.tasks:a;return s($),u(J=>J&&($.find(oe=>oe.taskType===J.taskType&&oe.id===J.id)||J)),$});S.useEffect(()=>{H().catch(V=>v(bd(V)))},[]),S.useEffect(()=>{if(!x)return;const V=()=>b(void 0),$=J=>J.key==="Escape"&&V();return window.addEventListener("pointerdown",V),window.addEventListener("keydown",$),window.addEventListener("blur",V),()=>{window.removeEventListener("pointerdown",V),window.removeEventListener("keydown",$),window.removeEventListener("blur",V)}},[x]);async function Y(V,$){const J=await H();C(!1),D(""),u(J.find(oe=>oe.taskType===V&&oe.id===$.id))}async function A(V){p(V.id),v(void 0);try{const $=await ye("automation.setEnabled",{taskType:V.taskType,id:V.id,enabled:!V.isEnabled},6e4);$.missingStep?(f($.missingStep),u(V),v({tone:"warning",title:"配置尚未完成",message:$.message||""})):await H()}catch($){v(bd($))}finally{p("")}}async function L(V){if(!V.isEnabled){p(V.id);try{await ye("automation.delete",{taskType:V.taskType,id:V.id}),j(void 0),await H()}catch($){v(bd($))}finally{p("")}}}if(l){const V=Fv(l.taskType);if(V)return o.jsx(sA,{openSettings:n,task:l,definition:V,focusStep:h,notice:g,refresh:H,back:()=>{u(void 0),f(""),v(void 0),H()}})}return o.jsxs("div",{className:"page daily-page automation-list-page",children:[o.jsxs("header",{children:[o.jsxs("div",{children:[o.jsx("h1",{children:"自动化任务"}),o.jsx("p",{children:"管理定时推送与自动填报，查看任务配置和运行情况。"})]}),o.jsx("div",{className:"header-actions",children:o.jsxs("button",{className:"primary",onClick:()=>C(!0),children:[o.jsx(XC,{}),"新建任务"]})})]}),g&&o.jsx("div",{className:`notice ${g.tone}`,role:"status",children:o.jsxs("div",{children:[o.jsx("strong",{children:g.title}),o.jsx("span",{children:g.message})]})}),o.jsxs("section",{className:"daily-job-list","aria-label":"任务列表",children:[a.map(V=>o.jsxs("article",{className:`daily-job-card${["incomplete","pending-test","schedule-error"].includes(V.status)?" needs-attention":""}`,onClick:()=>u(V),onContextMenu:$=>{$.preventDefault(),b({task:V,x:Math.min($.clientX,window.innerWidth-176),y:Math.min($.clientY,window.innerHeight-58)})},children:[o.jsxs("div",{className:"job-copy",children:[o.jsx("h2",{children:o.jsx("button",{type:"button",className:"automation-task-name",onClick:$=>{$.stopPropagation(),u(V)},children:V.name||"未命名任务"})}),o.jsxs("p",{children:[V.taskTypeName," · ",V.schedule," · ",V.connectionStatus]})]}),o.jsxs("div",{className:"job-actions",onClick:$=>$.stopPropagation(),children:[o.jsx("span",{className:`job-status ${V.status}`,children:Z0(V.status)}),o.jsxs("label",{className:"switch",children:[o.jsx("input",{type:"checkbox","aria-label":`启用${V.name||"未命名任务"}`,checked:V.isEnabled,disabled:!V.schedulingAvailable||m===V.id,title:V.schedulingAvailable?void 0:"Development 环境默认不启用定时任务",onChange:()=>A(V)}),o.jsx("span",{})]}),o.jsx("button",{type:"button",className:"automation-task-more","aria-label":`${V.name||"未命名任务"}的更多操作`,"aria-haspopup":"menu",onClick:$=>{const J=$.currentTarget.getBoundingClientRect();b({task:V,x:Math.min(J.left,window.innerWidth-176),y:Math.min(J.bottom+4,window.innerHeight-58)})},children:o.jsx(YC,{})})]}),o.jsxs("div",{className:"automation-card-footer",children:["最近运行：",V.lastRun]})]},`${V.taskType}:${V.id}`)),!a.length&&o.jsxs("div",{className:"empty-state",children:[o.jsx(PC,{}),o.jsx("h2",{children:"还没有自动化任务"}),o.jsx("p",{children:"选择一种任务类型，新建后进入对应的专用配置界面。"})]})]}),!!a.length&&o.jsx("p",{className:"automation-list-help",children:"点击任务名称进入配置。日报配置通知后即可开启，执行结果见运行记录。"}),x&&o.jsx("div",{className:"job-context-menu",role:"menu",style:{left:x.x,top:x.y},onPointerDown:V=>V.stopPropagation(),children:o.jsxs("button",{className:"danger-quiet",role:"menuitem",disabled:x.task.isEnabled||m===x.task.id,onClick:()=>{j(x.task),b(void 0)},children:[o.jsx(QC,{}),x.task.isEnabled?"停用后可删除":"删除任务"]})}),o.jsx(mo,{open:!!E,onOpenChange:V=>!V&&j(void 0),children:o.jsxs(po,{children:[o.jsx(go,{className:"dialog-overlay"}),o.jsxs(yo,{className:"dialog",children:[o.jsx(vo,{children:"删除自动化任务？"}),o.jsxs(xo,{children:["将删除“",E==null?void 0:E.name,"”及其业务记录，此操作无法撤销。"]}),o.jsxs("div",{className:"dialog-actions",children:[o.jsx("button",{className:"secondary",onClick:()=>j(void 0),children:"取消"}),o.jsx("button",{className:"danger",disabled:!!m,onClick:()=>E&&L(E),children:"确认删除"})]})]})]})}),o.jsx(mo,{open:N,onOpenChange:V=>{C(V),V||D("")},children:o.jsxs(po,{children:[o.jsx(go,{className:"dialog-overlay"}),o.jsxs(yo,{className:"dialog automation-create-dialog",children:[o.jsx(vo,{children:"新建自动化任务"}),o.jsx(xo,{children:k?"填写任务信息，创建后可随时通过 Tab 修改。":"先选择任务类型，后续配置由对应任务自己提供。"}),k?(B=Fv(k))==null?void 0:B.renderCreate({onCreated:V=>Y(k,V),onBack:()=>D(""),onCancel:()=>{C(!1),D("")}}):o.jsx("div",{className:"automation-create-types",children:K0.filter(V=>z.includes(V.taskType)).map(V=>o.jsxs("button",{onClick:()=>D(V.taskType),children:[o.jsx("strong",{children:V.name}),o.jsx("span",{children:V.description})]},V.taskType))})]})]})})]})}function sA({openSettings:n,task:a,definition:s,focusStep:l,notice:u,refresh:h,back:f}){const[m,p]=S.useState(l?s.resolveSection(l):s.includeBasics===!1?s.taskTabs[0].id:"basics"),g=a.taskType==="daily_report",[v,x]=S.useState(),[b,E]=S.useState(""),[j,N]=S.useState(!1),C=[...s.includeBasics===!1?[]:[{id:"basics",label:"基本信息"}],...s.taskTabs,{id:"runs",label:"运行记录"}],k=[...a.missingMessage?[{id:`configuration:${a.missingStep||"unknown"}`,title:s.issueTitle(a.missingStep||""),message:a.missingMessage,section:s.resolveSection(a.missingStep||"")}]:[],...a.status==="schedule-error"&&a.schedulerMessage?[{id:"scheduler",title:"计划任务异常",message:a.schedulerMessage,section:"basics"}]:[]];async function D(){N(!0),E("");try{x(await s.loadRuns(a.id))}catch(O){E(O instanceof Error?O.message:String(O))}finally{N(!1)}}S.useEffect(()=>{m==="runs"&&v===void 0&&D()},[m,v]);function z(O,H){var A;if(O.key!=="ArrowLeft"&&O.key!=="ArrowRight")return;O.preventDefault();const Y=(H+(O.key==="ArrowRight"?1:-1)+C.length)%C.length;p(C[Y].id),C[Y].id==="basics"&&h().catch(()=>{}),(A=document.getElementById(`automation-tab-${C[Y].id}`))==null||A.focus()}return g?o.jsx(r0,{id:a.id,back:f,changed:h,openSettings:n}):a.taskType==="notion_fill"?o.jsx(a0,{id:a.id,back:f,changed:h,openSettings:n}):o.jsxs("div",{className:"page daily-page automation-detail",children:[o.jsxs("header",{children:[o.jsxs("div",{children:[o.jsxs("button",{className:"back-link","aria-label":"返回任务列表",onClick:f,children:[o.jsx(ns,{}),"返回任务列表"]}),o.jsx("h1",{title:a.name||"未命名任务",children:a.name||"未命名任务"}),o.jsxs("p",{children:[a.taskTypeName," · ",a.schedule]})]}),o.jsx("span",{className:`job-status ${a.status}`,children:Z0(a.status)})]}),o.jsx("div",{className:"automation-tabs",role:"tablist","aria-label":"任务详情",children:C.map((O,H)=>o.jsx("button",{type:"button",role:"tab",id:`automation-tab-${O.id}`,"aria-selected":m===O.id,"aria-controls":`automation-panel-${O.id}`,tabIndex:m===O.id?0:-1,onClick:()=>{p(O.id),O.id==="basics"&&h().catch(()=>{})},onKeyDown:Y=>z(Y,H),children:O.label},O.id))}),o.jsxs("div",{children:[u&&o.jsx("div",{className:`notice ${u.tone}`,role:"status",children:o.jsxs("div",{children:[o.jsx("strong",{children:u.title}),o.jsx("span",{children:u.message})]})}),!!k.length&&o.jsxs("section",{className:"automation-issues","aria-labelledby":"automation-issues-title",children:[o.jsxs("div",{className:"automation-issues-heading",children:[o.jsx(JC,{}),o.jsxs("div",{children:[o.jsx("h2",{id:"automation-issues-title",children:"配置问题"}),o.jsx("p",{children:"完成以下项目后才能安全启用任务。"})]}),o.jsxs("span",{children:[k.length," 项"]})]}),o.jsx("ul",{children:k.map(O=>{var H;return o.jsxs("li",{children:[o.jsxs("div",{children:[o.jsx("strong",{children:O.title}),o.jsx("span",{children:O.message})]}),o.jsxs("button",{type:"button",onClick:()=>{p(O.section)},children:["前往",((H=C.find(Y=>Y.id===O.section))==null?void 0:H.label)||"处理",o.jsx(_C,{})]})]},O.id)})})]}),o.jsxs("div",{className:"automation-tab-panel",role:"tabpanel",id:`automation-panel-${m}`,"aria-labelledby":`automation-tab-${m}`,children:[o.jsx("div",{hidden:m==="runs",children:s.renderEditor({id:a.id,section:m,openSettings:n,navigate:p,changed:()=>{h().catch(()=>{})}})}),m==="runs"&&o.jsxs("section",{className:"surface automation-runs",children:[o.jsxs("div",{className:"automation-runs-heading",children:[o.jsxs("div",{children:[o.jsx("h2",{children:"运行记录"}),o.jsx("p",{children:"查看任务执行结果和错误详情。"})]}),o.jsxs("button",{className:"secondary",disabled:j,onClick:D,children:[j?o.jsx(Sn,{className:"spin"}):o.jsx(FC,{}),"刷新"]})]}),b&&o.jsx("div",{className:"notice error",role:"alert",children:o.jsxs("div",{children:[o.jsx("strong",{children:"运行记录读取失败"}),o.jsx("span",{children:b})]})}),o.jsx("div",{className:"automation-run-list",children:v==null?void 0:v.map(O=>o.jsxs("details",{children:[o.jsxs("summary",{children:[o.jsx("span",{children:O.time}),o.jsx("span",{children:O.source}),o.jsx("strong",{children:O.title}),o.jsx("b",{className:O.error?"error-text":"",children:O.status})]}),o.jsxs("div",{children:[O.details.map(H=>o.jsx("p",{children:H},H)),O.error&&o.jsxs("p",{className:"run-error",children:["错误：",O.error]})]})]},O.id))}),!j&&v&&!v.length&&o.jsx("p",{className:"automation-empty",children:"暂无运行记录"})]})]})]})]})}function Z0(n){return{incomplete:"配置未完成","pending-test":"待测试",checked:"已验证",ready:"可启用",enabled:"已启用","schedule-error":"计划异常"}[n]||n}function $v({value:n,onChange:a,unit:s,className:l="",disabled:u,ariaLabel:h,onKeyDown:f}){return o.jsxs("div",{className:`numeric-input ${l}`.trim(),children:[o.jsx("input",{type:"text",inputMode:"decimal",value:n,disabled:u,"aria-label":h,onChange:m=>a(m.target.value),onKeyDown:f}),s&&o.jsx("span",{children:s})]})}function Q0({current:n,titles:a,label:s}){const l=a.map((u,h)=>({number:h+1,title:u}));return o.jsx("div",{className:"step-bar","aria-label":s,children:l.map((u,h)=>{const f=u.number<n?"done":u.number===n?"active":"pending";return o.jsxs(S.Fragment,{children:[o.jsxs("div",{className:`step step-${f}`,"aria-current":f==="active"?"step":void 0,children:[o.jsx("div",{className:`step-circle ${f}`,children:f==="done"?o.jsx(us,{}):u.number}),o.jsx("span",{children:u.title})]}),h<l.length-1&&o.jsx("div",{className:`step-line ${u.number<n?"done":u.number===n?"transition":"pending"}`})]},u.number)})})}const Kv={configured:!1,binding:{bound:!1,name:"",path:""},usesBusinessSections:!1,businessSections:[],sources:[],selected:""};function lA(){const n=new Date;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`}function oA({openSettings:n}){const[a,s]=S.useState(1),[l,u]=S.useState(lA),[h,f]=S.useState(""),[m,p]=S.useState([]),[g,v]=S.useState(Kv),[x,b]=S.useState(!1),[E,j]=S.useState("database"),[N,C]=S.useState(""),[k,D]=S.useState(""),[z,O]=S.useState(!1),[H,Y]=S.useState("state"),[A,L]=S.useState(""),[B,V]=S.useState(""),[$,J]=S.useState(),oe=S.useRef(!1),ce=S.useRef(!1);S.useEffect(()=>{ye("weld.getState").then(W=>{var ne;const de=W!=null&&W.binding&&Array.isArray(W.sources)?W:Kv;v(de),C(((ne=de.sources.find(pe=>pe.id===de.selected))==null?void 0:ne.businessSection)||""),D(de.selected)}).catch(W=>L(W instanceof Error?W.message:"读取 Notion 配置失败")).finally(()=>Y(void 0))},[]);const le=/^\d+$/.test(h)&&Number(h)>0,U=S.useMemo(()=>m.reduce((W,de)=>W+Number(de.qty||0),0),[m]),ae=U-Number(h||0),Z=m.length>0&&m.every(W=>/^\d+$/.test(W.qty))&&ae===0,X=g.usesBusinessSections?g.sources.filter(W=>W.businessSection===N):g.sources,re=!!H;async function T(){if(!(!le||re)){Y("generate"),L("");try{const W=await ye("weld.generate",{month:l,total:h});p(W.map(de=>({...de,qty:String(de.qty)}))),s(2)}catch(W){L(W instanceof Error?W.message:"拆分失败")}finally{Y(void 0)}}}function R(W,de){de!==""&&!/^\d+$/.test(de)||p(ne=>ne.map((pe,Ce)=>Ce===W?{...pe,qty:de}:pe))}async function ee(){if(!(!k||H)){Y("binding"),L("");try{const W=await ye("weld.saveBinding",{sourceId:k});v(W),D(W.selected),b(!1)}catch(W){L(W instanceof Error?W.message:"绑定失败")}finally{Y(void 0)}}}async function se(){if(!Z||!g.binding.bound||re||oe.current)return;oe.current=!0,Y("check"),L("");const W={month:l,total:h,rows:m.map(de=>({date:de.date,qty:de.qty}))};try{if((await ye("weld.check",W,12e4)).hasExistingData){O(!0);return}await ue(W,!1)}catch(de){L(de instanceof Error?de.message:"Notion 数据检查失败")}finally{oe.current=!1,Y(de=>de==="check"?void 0:de)}}async function ue(W,de){if(!ce.current){ce.current=!0,Y("write"),L(""),J(void 0);try{const ne=await ye("weld.write",{...W,overwriteExisting:de},12e4,pe=>J(pe));V(ne.message),O(!1),s(3)}catch(ne){L(ne instanceof Error?ne.message:"写入 Notion 失败")}finally{ce.current=!1,Y(void 0)}}}function me(){s(1),p([]),f(""),V(""),L(""),J(void 0)}function xe(){var W;re||(D(g.selected),C(((W=g.sources.find(de=>de.id===g.selected))==null?void 0:W.businessSection)||""),L(""),j("database"),b(!0))}const ie={month:l,total:h,rows:m.map(W=>({date:W.date,qty:W.qty}))};return o.jsx("div",{className:"app-shell",children:o.jsxs("main",{className:"main-content",children:[o.jsxs("header",{className:"content-header",children:[o.jsx("h1",{children:"每日焊接数据模拟"}),o.jsx("button",{type:"button",className:"template-config-button",disabled:re,"aria-label":"焊接设置",title:"焊接设置",onClick:xe,children:o.jsx(Gf,{})})]}),o.jsxs("div",{className:"production-message-scroll daily-weld-page",children:[o.jsx(Q0,{current:a,titles:["录入计划","拆分预览","完成"],label:"焊接计划拆分进度"}),A&&o.jsx("div",{className:"weld-notice error",role:"alert",children:A}),a===1&&o.jsxs("section",{className:"weld-plan-card","aria-labelledby":"weld-plan-title",children:[o.jsx("div",{className:"weld-section-heading",children:o.jsx("h2",{id:"weld-plan-title",children:"计划信息"})}),o.jsxs("div",{className:"weld-fields",children:[o.jsx(tn,{label:"计划月份",value:l,selectionMode:"month",disabled:re,onChange:u}),o.jsxs("label",{className:"weld-field",children:[o.jsx("span",{children:"计划焊接总量"}),o.jsx($v,{value:h,disabled:re,onChange:W=>{(W===""||/^\d+$/.test(W))&&f(W)},unit:"吨",ariaLabel:"计划焊接总量"})]})]}),o.jsx("div",{className:"weld-actions",children:o.jsx("button",{type:"button",className:"primary-button",disabled:!le||re,onClick:T,children:H==="generate"?"正在拆分…":"下一步：拆分预览"})})]}),a===2&&o.jsxs("section",{className:"weld-preview","aria-labelledby":"weld-preview-title",children:[o.jsxs("div",{className:"weld-preview-heading",children:[o.jsxs("div",{children:[o.jsxs("h2",{id:"weld-preview-title",children:[l.replace("-"," 年 ")," 月每日拆分详情"]}),o.jsx("p",{children:"可直接修改任意一天的数值；不满意本次浮动效果可重新模拟。"})]}),o.jsxs("button",{type:"button",className:"secondary",disabled:re,onClick:T,children:[o.jsx(Jb,{}),"重新模拟浮动"]})]}),o.jsx("div",{className:"weld-table-wrap",children:o.jsxs("table",{children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{children:"日期"}),o.jsx("th",{children:"星期"}),o.jsx("th",{children:"类型"}),o.jsx("th",{children:"计划量（吨）"})]})}),o.jsx("tbody",{children:m.map((W,de)=>o.jsxs("tr",{children:[o.jsx("td",{children:W.date}),o.jsx("td",{children:W.weekday}),o.jsx("td",{children:o.jsx("span",{className:`weld-day-pill ${W.isWeekend?"weekend":""}`,children:W.isWeekend?"休息日":"工作日"})}),o.jsx("td",{children:o.jsx($v,{value:W.qty,disabled:re,onChange:ne=>R(de,ne),unit:"吨",ariaLabel:`${W.date} 计划量`})})]},W.date))})]})}),o.jsxs("div",{className:"weld-summary",children:[o.jsxs("span",{children:["共 ",m.length," 天 · 计划总量 ",o.jsx("strong",{children:h})," 吨"]}),o.jsxs("span",{children:["拆分合计 ",o.jsx("strong",{children:U})," 吨 ",ae===0?o.jsx("em",{className:"match",children:"与计划总量一致"}):o.jsxs("em",{className:"mismatch",children:["偏差 ",ae>0?"+":"",ae," 吨，可手动调整"]})]})]}),H==="write"&&o.jsx("div",{className:"weld-write-progress",role:"status","aria-live":"polite",children:$?`正在写入 ${$.date.slice(0,10)}（${$.current}/${$.total}）`:"正在准备 Notion 层级数据…"}),o.jsxs("div",{className:"weld-actions split",children:[o.jsx("button",{type:"button",className:"secondary",disabled:re,onClick:()=>s(1),children:"返回修改"}),o.jsx("button",{type:"button",className:"primary-button",disabled:!Z||!g.binding.bound||re,onClick:se,children:H==="check"?"正在检查…":H==="write"?"正在写入…":"确认并写入 Notion"})]})]}),a===3&&o.jsxs("section",{className:"complete-view weld-complete",children:[o.jsx("div",{className:"complete-icon",children:o.jsx(us,{})}),o.jsx("h2",{children:"入库完成"}),o.jsx("p",{children:B||`${l} 共 ${m.length} 天的焊接计划数据已写入 Notion。`}),o.jsx("button",{className:"primary-button",onClick:me,children:"拆分下一个月"})]})]}),x&&o.jsx("div",{className:"weld-settings-overlay",children:o.jsxs("section",{className:"weld-settings-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"weld-settings-title",children:[o.jsxs("aside",{className:"weld-settings-nav",children:[o.jsx("h2",{id:"weld-settings-title",children:"焊接设置"}),o.jsxs("nav",{"aria-label":"焊接设置分类",children:[o.jsxs("button",{type:"button",className:E==="rules"?"active":"",onClick:()=>j("rules"),children:[o.jsx(ZC,{}),"拆分规则"]}),o.jsxs("button",{type:"button",className:E==="database"?"active":"",onClick:()=>j("database"),children:[o.jsx(Zd,{}),"数据库绑定"]})]})]}),o.jsxs("div",{className:"weld-settings-main",children:[o.jsx("button",{type:"button",className:"weld-settings-close","aria-label":"关闭焊接设置",disabled:H==="binding",onClick:()=>b(!1),children:o.jsx(Xf,{})}),E==="rules"?o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"weld-settings-heading",children:[o.jsx("h3",{children:"拆分规则"}),o.jsx("p",{children:"当前规则用于生成每日焊接计划，修改每日数值后仍需保证月度合计一致。"})]}),o.jsxs("dl",{className:"weld-rule-list",children:[o.jsxs("div",{children:[o.jsx("dt",{children:"分配周期"}),o.jsx("dd",{children:"按所选月份的全部自然日"})]}),o.jsxs("div",{children:[o.jsx("dt",{children:"产量浮动"}),o.jsx("dd",{children:"基准量叠加 22% 随机波动"})]}),o.jsxs("div",{children:[o.jsx("dt",{children:"周末权重"}),o.jsx("dd",{children:"周六、周日自动降低计划权重"})]}),o.jsxs("div",{children:[o.jsx("dt",{children:"总量配平"}),o.jsx("dd",{children:"每日取整后自动配平至月度计划"})]})]})]}):o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"weld-settings-heading",children:[o.jsx("h3",{children:"数据库绑定"}),o.jsx("p",{children:"每项业务只绑定一个主写入数据库，汇总数据库由系统自动维护。"})]}),A&&o.jsx("div",{className:"weld-notice error",role:"alert",children:A}),o.jsxs("section",{className:"weld-business-binding","aria-labelledby":"weld-business-title",children:[o.jsxs("div",{className:"weld-business-title",children:[o.jsxs("div",{children:[o.jsx("h4",{id:"weld-business-title",children:"焊接业务"}),o.jsx("p",{children:"每日焊接计划的主写入数据库"})]}),o.jsx("span",{className:g.binding.bound?"bound":"",children:g.binding.bound?"已绑定":"未绑定"})]}),!g.configured||!g.sources.length?o.jsx("div",{className:"weld-notice",children:"请先在系统设置中完成数据库连接并刷新数据源。"}):o.jsxs("div",{className:"weld-dialog-field",children:[g.usesBusinessSections&&o.jsxs(o.Fragment,{children:[o.jsx("span",{children:"业务板块"}),o.jsx(Ut,{value:N,options:g.businessSections.map(W=>({value:W,label:W})),placeholder:"选择焊接业务板块",ariaLabel:"焊接业务板块",disabled:H==="binding",onChange:W=>{C(W),D("")}})]}),o.jsx("span",{children:"主写入数据库"}),o.jsx(Ut,{value:k,options:X.map(W=>({value:W.id,label:W.name})),placeholder:"选择每日焊接量数据库",ariaLabel:"焊接业务主写入数据库",disabled:g.usesBusinessSections&&!N||H==="binding",onChange:D})]}),o.jsx("p",{className:"weld-binding-help",children:"月度和周度汇总数据库由系统在写入时自动维护，无需单独绑定。"})]}),o.jsxs("div",{className:"weld-settings-actions",children:[o.jsx("button",{type:"button",disabled:H==="binding",onClick:()=>b(!1),children:"取消"}),!g.configured||!g.sources.length?o.jsx("button",{type:"button",className:"primary-button",onClick:n,children:"前往系统设置"}):o.jsx("button",{type:"button",className:"primary-button",disabled:!k||H==="binding",onClick:ee,children:H==="binding"?"正在检测…":"保存绑定"})]})]})]})]})}),z&&o.jsx("div",{className:"pm-dialog-overlay",children:o.jsxs("section",{className:"pm-dialog weld-confirm-dialog",role:"alertdialog","aria-modal":"true","aria-labelledby":"weld-overwrite-title",children:[o.jsx("h2",{id:"weld-overwrite-title",children:"确认覆盖已有产量"}),o.jsxs("p",{children:[l," 已存在产量数据。继续后将按本次拆分结果覆盖该月每日产量，并更新月、周、日关联。"]}),A&&o.jsx("div",{className:"weld-notice error",role:"alert",children:A}),H==="write"&&o.jsx("div",{className:"weld-write-progress",role:"status","aria-live":"polite",children:$?`正在写入 ${$.date.slice(0,10)}（${$.current}/${$.total}）`:"正在准备 Notion 层级数据…"}),o.jsxs("div",{className:"pm-dialog-actions",children:[o.jsx("button",{type:"button",disabled:H==="write",onClick:()=>O(!1),children:"取消"}),o.jsx("button",{type:"button",className:"primary-button",disabled:H==="write",onClick:()=>ue(ie,!0),children:H==="write"?"正在写入…":"确认覆盖并写入"})]})]})})]})})}const J0=[{category:"数据文件处理",name:"挂网计划 PDF 导出"},{category:"数据文件处理",name:"生产会资料拆分"},{category:"数据文件处理",name:"文件统计汇总"},{category:"数据同步",name:"每日焊接数据模拟"},{category:"数据同步",name:"生产消息 Notion 入库"},{category:"数据同步",name:"数据库查看"},{category:"自动化",name:"自动化任务"}],cA=[...new Set(J0.map(n=>n.category))];function uA(n){switch(n){case"挂网计划 PDF 导出":return"plan-pdf";case"生产会资料拆分":return"production-meeting";case"每日焊接数据模拟":return"daily-weld";case"生产消息 Notion 入库":return"production-message";case"数据库查看":return"database-viewer";case"文件统计汇总":return"report-center";case"自动化任务":return"daily-report";default:return"plan-pdf"}}function dA({active:n,navigate:a,openSettings:s}){return o.jsxs("aside",{className:"sidebar",children:[o.jsx("div",{className:"sidebar-top",children:o.jsx("div",{className:"sidebar-brand",children:"生产助手"})}),o.jsx("nav",{className:"sidebar-nav","aria-label":"业务模块",children:cA.map(l=>o.jsxs("section",{className:"sidebar-section",children:[o.jsx("div",{className:"sidebar-section-label",children:l}),J0.filter(u=>u.category===l).map(u=>{const h=uA(u.name),f=h===n;return o.jsxs("button",{className:`sidebar-item ${f?"sidebar-item-active":""}`,"aria-current":f?"page":void 0,onClick:()=>a(h),children:[o.jsx(Zv,{name:u.name}),o.jsx("span",{children:u.name})]},u.name)})]},l))}),o.jsx("div",{className:"sidebar-bottom",children:o.jsxs("button",{className:"sidebar-item","aria-haspopup":"dialog",onClick:s,children:[o.jsx(Zv,{name:"设置"}),o.jsx("span",{children:"设置"})]})})]})}function Zv({name:n}){return n==="挂网计划 PDF 导出"||n==="生产会资料拆分"?o.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("path",{className:"folder-lid",d:"M3.5 7h6l1.8 2h9.2"}),o.jsx("path",{d:"M4.2 7h15.6l-1.3 11H5.5L4.2 7Z"})]}):n==="每日焊接数据模拟"||n==="自动化任务"?o.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("rect",{x:"5",y:"4.5",width:"14",height:"15",rx:"2"}),o.jsx("path",{d:"M8 3v3M16 3v3M5 9h14"}),o.jsx("path",{className:"daily-check",d:"m8.5 14 2 2 4.5-4.5"})]}):n==="生产消息 Notion 入库"?o.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("path",{d:"M4 14.5 6.2 6h11.6l2.2 8.5V19H4v-4.5Z"}),o.jsx("path",{className:"inbox-tray",d:"M4.3 14h4.1l1.2 2h4.8l1.2-2h4.1"}),o.jsx("path",{className:"inbox-arrow",d:"M12 5v7m-2.5-2.5L12 12l2.5-2.5"})]}):n==="数据库查看"?o.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("ellipse",{cx:"12",cy:"6",rx:"7",ry:"3"}),o.jsx("path",{d:"M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"})]}):n==="文件统计汇总"?o.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("path",{d:"M4.5 19h15"}),o.jsx("rect",{className:"report-bar report-bar-one",x:"6",y:"12",width:"2.5",height:"6",rx:"0.5"}),o.jsx("rect",{className:"report-bar report-bar-two",x:"10.75",y:"8",width:"2.5",height:"10",rx:"0.5"}),o.jsx("rect",{className:"report-bar report-bar-three",x:"15.5",y:"5",width:"2.5",height:"13",rx:"0.5"})]}):o.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("circle",{cx:"12",cy:"12",r:"3"}),o.jsx("path",{className:"settings-ring",d:"M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M18 6l-1.4 1.4M7.4 16.6 6 18"})]})}const Qv=new Set(["raw_message","message_type","parser_version","unit"]),fA=new Set(["piece_count","weight","sheet_in_stock","profile_in_stock","cutting","welding","daily_output","monthly_output","yearly_output","monthly_reference","output_sections"]),hA=/(公斤|千克|kg|吨|t|张|件|套|节|台|米|m)$/i,mA={piece_count:"张",weight:"吨",sheet_in_stock:"吨",profile_in_stock:"吨",cutting:"吨",welding:"吨",daily_output:"套",output_sections:"节"};function Sd(){const n=new Date;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`}function Gi(n){return n instanceof Error?n.message:String(n)}function of(n,a=""){const s=n.trim().match(hA);return{value:s?n.trim().slice(0,-s[0].length).trim():n,unit:(s==null?void 0:s[0])||a}}function pA(n,a){return n.trim()?`${n}${a}`:""}function gA(n,a){const s=of(a).value.trim(),l=of(n.databaseValue).value.trim(),u=n.propertyType==="number"&&!Number.isFinite(Number(s.replaceAll(",",""))),h=!s||u?"exception":l?n.propertyType==="number"?Number(s.replaceAll(",",""))===Number(l.replaceAll(",",""))?"same":"confirm":s===l?"same":"confirm":"new";return{...n,parsedValue:a,status:h,message:h==="exception"?`${n.name}的输入值无效`:h==="confirm"?"与数据库现值不同":""}}function yA(n){return{new:"新增",same:"一致",confirm:"待确认",exception:"异常",unchecked:"待检查"}[n]||"异常"}function vA(){const[n,a]=S.useState(""),[s,l]=S.useState(""),[u,h]=S.useState([]),[f,m]=S.useState(),[p,g]=S.useState(),[v,x]=S.useState(),[b,E]=S.useState(""),[j,N]=S.useState({}),[C,k]=S.useState(!1),[D,z]=S.useState(),[O,H]=S.useState(""),[Y,A]=S.useState([]),[L,B]=S.useState({}),[V,$]=S.useState(!1),[J,oe]=S.useState({cutting:"",towerDaily:""}),ce=u.length>0,le=ce&&n!==s,U=!!f;S.useEffect(()=>{ye("production.getBindings").then(ie=>{z(ie),oe({cutting:ie.selected.cutting||"",towerDaily:ie.selected.towerDaily||""})}).catch(ie=>H(Gi(ie)))},[]);async function ae(){H("");try{await ye("production.saveBindings",J,12e4);const ie=await ye("production.getBindings");z(ie),$(!1)}catch(ie){H(Gi(ie))}}async function Z(ie){m("check"),E(""),N({});try{const W=await ye("production.check",{drafts:ie,defaultDate:Sd()});g(W)}catch(W){E(Gi(W))}finally{m(void 0)}}async function X(){if(!(!n.trim()||U)){m("parse"),E(""),k(!1),x(void 0),g(void 0),N({});try{const ie=await ye("production.parse",{text:n,defaultDate:Sd()});if(h(ie),l(n),!ie.length){E("没有解析到可核对的数据，请检查消息内容后重试。");return}ie.every(W=>W.canWrite)&&await Z(ie)}catch(ie){h([]),g(void 0),E(Gi(ie))}finally{m(ie=>ie==="parse"?void 0:ie)}}}async function re(ie,W){const de=u.map(ne=>ne.index===ie?{...ne,businessDate:W,canWrite:!!W,warningText:W?"":ne.warningText}:ne);h(de),g(void 0),N({}),de.every(ne=>ne.canWrite)&&await Z(de)}function T(ie,W,de){const ne=`${ie}:${W}`;h(pe=>pe.map(Ce=>Ce.index===ie?{...Ce,canWrite:!!Ce.businessDate&&Ce.kind!=="Unknown",fields:{...Ce.fields,[W]:de},previewFields:Ce.previewFields.map(Oe=>Oe.key===W?{...Oe,value:de}:Oe)}:Ce)),N(pe=>Object.fromEntries(Object.entries(pe).filter(([Ce])=>Ce!==ne))),g(pe=>{if(!pe)return pe;const Ce=pe.items.map(Oe=>{if(Oe.index!==ie||!Oe.fields)return Oe;const Qe=Oe.fields.map(yt=>yt.key===W?gA(yt,de):yt),Fe=Qe.some(yt=>yt.status==="exception")?"error":Qe.some(yt=>yt.status==="confirm")?"existing":"ready";return{...Oe,fields:Qe,status:Fe}});return{...pe,items:Ce,succeeded:Ce.every(Oe=>Oe.status!=="error")}})}async function R(ie){if(!(!p||U)){m("write"),E("");try{const W=await ye("production.write",{drafts:u,defaultDate:Sd(),overwriteExisting:!1,fieldChoices:j,monthlyPlans:ie},12e4);if(x(W),W.requiredMonths.length){A(W.requiredMonths),B({});return}W.succeeded?k(!0):E(W.message||"Notion 写入未完成。")}catch(W){E(Gi(W))}finally{m(void 0)}}}function ee(){a(""),l(""),h([]),g(void 0),x(void 0),N({}),k(!1),E("")}const se=S.useMemo(()=>u.flatMap(ie=>{var de;const W=(de=p==null?void 0:p.items.find(ne=>ne.index===ie.index))==null?void 0:de.fields;return W!=null&&W.length?W.filter(ne=>!Qv.has(ne.key)).map(ne=>({draft:ie,key:ne.key,name:ne.name,propertyType:ne.propertyType,parsedValue:ie.fields[ne.key]??ne.parsedValue,databaseValue:ne.databaseValue,status:ne.status,message:ne.message})):ie.previewFields.filter(ne=>!Qv.has(ne.key)).map(ne=>({draft:ie,key:ne.key,name:ne.label,propertyType:fA.has(ne.key)?"number":"",parsedValue:ie.fields[ne.key]??ne.value,databaseValue:"",status:ie.canWrite?"unchecked":"exception",message:ie.warningText}))}),[u,p]),ue=S.useMemo(()=>({newFields:se.filter(ie=>ie.status==="new").length,same:se.filter(ie=>ie.status==="same").length,confirm:se.filter(ie=>ie.status==="confirm").length,exception:se.filter(ie=>ie.status==="exception").length}),[se]),me=se.filter(ie=>ie.status==="confirm"),xe=ce&&!le&&!U&&!!(p!=null&&p.succeeded)&&u.every(ie=>ie.canWrite&&!!ie.businessDate)&&se.every(ie=>ie.status!=="exception"&&ie.status!=="unchecked")&&me.every(ie=>!!j[`${ie.draft.index}:${ie.key}`]);return C?o.jsxs("div",{className:"app-shell",children:[o.jsxs("main",{className:"main-content",children:[o.jsx(Wv,{disabled:U,configure:()=>{D&&oe({cutting:D.selected.cutting||"",towerDaily:D.selected.towerDaily||""}),H(""),$(!0)}}),o.jsxs("div",{className:"production-message-scroll",children:[o.jsx(Iv,{current:3}),o.jsxs("section",{className:"complete-view",children:[o.jsx("div",{className:"complete-icon",children:o.jsx(us,{})}),o.jsx("h2",{children:"入库完成"}),o.jsx("p",{children:(v==null?void 0:v.message)||`${u.length} 条消息已写入 Notion`}),o.jsx("button",{className:"primary-button",onClick:ee,children:"录入下一条"})]})]})]}),V&&D&&o.jsx(Jv,{state:D,selections:J,setSelections:oe,error:O,close:()=>$(!1),save:ae})]}):o.jsxs("div",{className:"app-shell",children:[o.jsxs("main",{className:"main-content",children:[o.jsx(Wv,{disabled:U,configure:()=>{D&&oe({cutting:D.selected.cutting||"",towerDaily:D.selected.towerDaily||""}),H(""),$(!0)}}),o.jsxs("div",{className:"production-message-scroll",children:[o.jsx(Iv,{current:ce?2:1}),o.jsxs("div",{className:"workspace-panel",children:[o.jsxs("section",{className:"message-pane",children:[o.jsxs("div",{className:"pane-title",children:[o.jsx("h2",{children:"原始消息"}),o.jsx("p",{children:"输入生产消息，系统将自动解析并检查已有数据。"})]}),o.jsx("textarea",{className:"message-textarea",value:n,disabled:U,onChange:ie=>a(ie.target.value),placeholder:"请输入生产消息"}),o.jsx("div",{className:"parse-action",children:o.jsxs("button",{className:"primary-button",disabled:!n.trim()||U,onClick:X,children:[ce&&o.jsx(Jb,{className:"button-icon refresh-icon"}),o.jsx("span",{children:f==="parse"?"正在解析…":ce?"重新解析":"解析消息"})]})})]}),o.jsx("section",{className:"review-pane",children:ce?o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"review-header",children:[o.jsx("h2",{children:"解析结果"}),o.jsxs("div",{className:"review-summary",children:[o.jsxs("span",{children:["新增",o.jsx("strong",{children:ue.newFields})]}),o.jsx("i",{children:"·"}),o.jsxs("span",{children:["一致",o.jsx("strong",{children:ue.same})]}),o.jsx("i",{children:"·"}),o.jsxs("span",{children:["待确认",o.jsx("strong",{children:ue.confirm})]}),o.jsx("i",{children:"·"}),o.jsxs("span",{children:["异常",o.jsx("strong",{children:ue.exception})]})]})]}),o.jsx("div",{className:"date-groups",children:u.map(ie=>{const W=se.filter(pe=>pe.draft.index===ie.index),de=W.filter(pe=>pe.status==="confirm"),ne=p?{...p,items:p.items.filter(pe=>pe.index===ie.index)}:void 0;return o.jsxs("section",{className:"date-group","data-business-date":ie.businessDate,children:[o.jsxs("div",{className:"identity-section",children:[o.jsx("div",{className:"identity-field",children:o.jsx(tn,{label:"日期",value:ie.businessDate||"",disabled:U,onChange:pe=>re(ie.index,pe)})}),o.jsxs("div",{className:"identity-field",children:[o.jsx("label",{children:"业务 / 产线"}),o.jsx("input",{className:"field-input",value:ie.typeDisplay||"",readOnly:!0,disabled:U})]})]}),o.jsx(xA,{busy:f==="check",result:ne,error:b,needsReparse:le,invalidCount:ie.canWrite?0:1,fieldStatuses:W.map(pe=>pe.status)}),o.jsx("div",{className:"data-title",children:"数据字段"}),o.jsxs("div",{className:"field-table",children:[o.jsxs("div",{className:"field-table-header",children:[o.jsx("div",{children:"字段"}),o.jsx("div",{children:"本次解析值"}),o.jsx("div",{children:"数据库值"}),o.jsx("div",{className:"header-status",children:"状态"})]}),W.map(pe=>{const Ce=of(pe.parsedValue,pe.propertyType==="number"&&mA[pe.key]||""),Oe=`${pe.draft.index}:${pe.key}`;return o.jsxs("div",{className:"field-row",children:[o.jsx("div",{className:"field-name",children:pe.name}),o.jsx("div",{className:"field-editor",children:o.jsxs("div",{className:"input-unit-wrap",children:[o.jsx("input",{className:"field-input compact-input",value:Ce.value,disabled:U,"aria-invalid":pe.status==="exception",onChange:Qe=>T(pe.draft.index,pe.key,pA(Qe.target.value,Ce.unit)),onKeyDown:Qe=>{Qe.key==="Enter"&&Qe.currentTarget.blur()}}),Ce.unit&&o.jsx("span",{children:Ce.unit})]})}),o.jsx("div",{className:"database-value",children:pe.databaseValue||"—"}),o.jsx("div",{className:"field-status",children:pe.status!=="unchecked"&&o.jsx("span",{className:`pill pill-${pe.status}`,title:pe.message,children:yA(pe.status)})})]},Oe)})]}),de.length>0&&o.jsxs("section",{className:"conflict-section","aria-label":`${ie.businessDate} 待确认字段`,children:[o.jsx("div",{className:"conflict-section-title",children:"待确认字段"}),de.map(pe=>{const Ce=`${pe.draft.index}:${pe.key}`;return o.jsxs("div",{className:"conflict-panel",children:[o.jsxs("div",{className:"conflict-message",children:[o.jsx("strong",{children:pe.name}),o.jsx("span",{children:"原值与新值不同，请选择保留项。"})]}),o.jsxs("div",{className:"conflict-options",children:[o.jsxs("label",{children:[o.jsx("input",{type:"radio",name:`conflict-${Ce}`,checked:j[Ce]==="keep",onChange:()=>N(Oe=>({...Oe,[Ce]:"keep"}))}),o.jsxs("span",{children:[o.jsx("small",{children:"原值"}),o.jsx("strong",{children:pe.databaseValue||"—"})]})]}),o.jsxs("label",{children:[o.jsx("input",{type:"radio",name:`conflict-${Ce}`,checked:j[Ce]==="use",onChange:()=>N(Oe=>({...Oe,[Ce]:"use"}))}),o.jsxs("span",{children:[o.jsx("small",{children:"新值"}),o.jsx("strong",{children:pe.parsedValue||"—"})]})]})]})]},Ce)})]})]},ie.index)})}),o.jsxs("div",{className:"review-footer",children:[o.jsx("span",{className:"review-footer-text",children:u.length>1?`本次共 ${u.length} 条消息，将整批写入 Notion。`:"确认后将把本次解析结果写入 Notion。"}),o.jsx("button",{className:"primary-button confirm-button",disabled:!xe,onClick:()=>R(),children:f==="write"?"正在入库…":"确认入库"})]})]}):o.jsxs("div",{className:"review-empty",children:[o.jsx("h2",{children:"解析结果"}),o.jsx("p",{children:"解析消息后，Notion 数据检查结果将在这里显示。"}),(O||(D==null?void 0:D.configured)===!1||D&&(!D.cutting.bound||!D.towerDaily.bound))&&o.jsx("div",{className:"pm-notice",role:"alert",children:O||((D==null?void 0:D.configured)===!1?"Notion 连接尚未配置。":"数据库已变更，请点击右上角“数据库绑定”重新选择下料和塔筒主数据库。")})]})})]})]})]}),Y.length>0&&o.jsx(bA,{months:Y,values:L,setValues:B,close:()=>A([]),submit:ie=>{A([]),R(ie)}}),V&&D&&o.jsx(Jv,{state:D,selections:J,setSelections:oe,error:O,close:()=>$(!1),save:ae})]})}function xA({busy:n,result:a,error:s,needsReparse:l,invalidCount:u,fieldStatuses:h}){if(n)return o.jsxs("div",{className:"match-status",role:"status","aria-live":"polite",children:[o.jsx("span",{className:"status-loader"}),o.jsx("span",{className:"match-status-copy",children:"正在检查 Notion 数据…"})]});if(l)return o.jsxs("div",{className:"match-status match-status-error",role:"alert",children:[o.jsx("span",{className:"new-record-icon",children:"!"}),o.jsx("span",{className:"match-status-copy",children:"原始消息已修改，请重新解析"})]});if(u)return o.jsxs("div",{className:"match-status match-status-error",role:"alert",children:[o.jsx("span",{className:"new-record-icon",children:"!"}),o.jsxs("span",{className:"match-status-copy",children:["本批有 ",u," 条异常，已停止检查和入库"]})]});if(s)return o.jsxs("div",{className:"match-status match-status-error",role:"alert",children:[o.jsx("span",{className:"new-record-icon",children:"!"}),o.jsxs("span",{className:"match-status-copy",children:["检查失败：",s]})]});const f=a==null?void 0:a.items.some(b=>b.status==="existing"||b.status==="conflict"),m=b=>h.includes(b),p=h.length>0&&h.every(b=>b==="same"),g=m("exception")||a&&!a.succeeded&&h.length===0?"match-status-error":m("confirm")?"match-status-warning":p?"match-status-neutral":"",v=m("exception")?"存在异常，不能入库":m("unchecked")?"字段已修改，等待检查":m("confirm")?"已找到对应记录，有字段待确认":m("new")?f||m("same")?"已找到对应记录，将补充空字段":"未找到对应记录，将新建":p?"已找到对应记录，数据一致":a&&!a.succeeded?"Notion 检查未通过":"等待检查 Notion 数据",x=!!a&&!m("exception")&&!m("confirm")&&!m("unchecked");return o.jsxs("div",{className:`match-status ${g}`,role:g==="match-status-error"?"alert":"status","aria-live":"polite",children:[x?o.jsx("span",{className:"match-check",children:o.jsx(us,{})}):o.jsx("span",{className:"new-record-icon",children:g?"!":"+"}),o.jsx("span",{className:"match-status-copy",children:v})]})}function bA({months:n,values:a,setValues:s,close:l,submit:u}){const h=Object.fromEntries(n.map(m=>[m,Number(a[m])])),f=n.every(m=>{var p;return((p=a[m])==null?void 0:p.trim())&&Number.isFinite(h[m])&&h[m]>=0});return o.jsx("div",{className:"pm-dialog-overlay",children:o.jsxs("section",{className:"pm-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"monthly-plan-title",children:[o.jsx("h2",{id:"monthly-plan-title",children:"补充下料月计划"}),o.jsx("p",{children:"独立月计划库中没有该月份记录，请填写计划下料（吨）。"}),n.map(m=>o.jsxs("label",{children:[m,o.jsx("input",{type:"number",min:"0",value:a[m]||"",onChange:p=>s({...a,[m]:p.target.value})})]},m)),o.jsxs("div",{className:"pm-dialog-actions",children:[o.jsx("button",{onClick:l,children:"取消"}),o.jsx("button",{className:"primary-button",disabled:!f,onClick:()=>u(h),children:"创建并继续"})]})]})})}function Jv({state:n,selections:a,setSelections:s,error:l,close:u,save:h}){var x,b;const[f,m]=S.useState(((x=n.sources.find(E=>E.id===a.cutting))==null?void 0:x.businessSection)||""),[p,g]=S.useState(((b=n.sources.find(E=>E.id===a.towerDaily))==null?void 0:b.businessSection)||""),v=E=>n.usesBusinessSections?n.sources.filter(j=>j.businessSection===E):n.sources;return o.jsx("div",{className:"pm-dialog-overlay",children:o.jsxs("section",{className:"pm-dialog pm-binding-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"binding-title",children:[o.jsx("h2",{id:"binding-title",children:"数据库绑定"}),o.jsx("p",{children:"只绑定每日主数据库。月累计和年累计由软件查询计算；下料月计划库通过主库的 Relation 自动识别。"}),n.usesBusinessSections&&o.jsxs("label",{children:["下料业务板块",o.jsx(Ut,{value:f,ariaLabel:"下料业务板块",placeholder:"不处理下料消息",options:[{value:"",label:"不处理下料消息"},...n.businessSections.map(E=>({value:E,label:E}))],onChange:E=>{m(E),s({...a,cutting:""})}})]}),o.jsxs("label",{children:["下料主数据库",o.jsx(Ut,{value:a.cutting,ariaLabel:"下料主数据库",placeholder:"不处理下料消息",disabled:n.usesBusinessSections&&!f,options:[{value:"",label:"不处理下料消息"},...v(f).map(E=>({value:E.id,label:E.name}))],onChange:E=>s({...a,cutting:E})})]}),n.usesBusinessSections&&o.jsxs("label",{children:["塔筒业务板块",o.jsx(Ut,{value:p,ariaLabel:"塔筒业务板块",placeholder:"请选择业务板块",options:n.businessSections.map(E=>({value:E,label:E})),onChange:E=>{g(E),s({...a,towerDaily:""})}})]}),o.jsxs("label",{children:["塔筒产线主数据库",o.jsx(Ut,{value:a.towerDaily,ariaLabel:"塔筒产线主数据库",placeholder:"请选择具体数据库",disabled:n.usesBusinessSections&&!p,options:v(p).map(E=>({value:E.id,label:E.name})),onChange:E=>s({...a,towerDaily:E})})]}),l&&o.jsx("div",{className:"pm-notice",role:"alert",children:l}),o.jsxs("div",{className:"pm-dialog-actions",children:[o.jsx("button",{onClick:u,children:"取消"}),o.jsx("button",{className:"primary-button",disabled:!a.towerDaily,onClick:h,children:"保存绑定"})]})]})})}function Wv({configure:n,disabled:a}){return o.jsxs("header",{className:"content-header",children:[o.jsx("h1",{children:"生产消息入库"}),o.jsx("button",{type:"button",className:"template-config-button",disabled:a,"aria-label":"数据库绑定",title:"数据库绑定",onClick:n,children:o.jsx(Gf,{})})]})}function Iv({current:n}){return o.jsx(Q0,{current:n,titles:["录入消息","解析确认","完成"],label:"生产消息入库进度"})}const ex={audit:"正在检查",repair:"正在备份修复并复查",export:"正在导出",pickFolder:"选择目录",openOutput:"正在打开目录"},tx=n=>n.split(/[\\/]/).pop();function SA(){const[n,a]=S.useState(""),[s,l]=S.useState(),[u,h]=S.useState(),[f,m]=S.useState(),[p,g]=S.useState(),[v,x]=S.useState(),[b,E]=S.useState(""),[j,N]=S.useState("全部"),[C,k]=S.useState(),D=S.useRef(!1),z=S.useRef(0);S.useEffect(()=>()=>{z.current++},[]);const O=(s==null?void 0:s.issues.filter(B=>B.severity==="错误").length)||0,H=(s==null?void 0:s.issues.filter(B=>B.severity==="警告").length)||0;function Y(B){D.current||(a(B),l(void 0),m(void 0),h(void 0),E(""),k(void 0),N("全部"))}async function A(B){if(D.current||B==="audit"&&!n.trim()||["repair","export","openOutput"].includes(B)&&!s)return;const V=++z.current;D.current=!0,g(B),E(""),x(void 0),B==="audit"&&(l(void 0),h(void 0),N("全部")),B==="repair"&&(l($=>$&&{...$,repaired:!1,canExport:!1}),h(void 0)),["audit","repair","export"].includes(B)&&(m(void 0),k(void 0));try{if(B==="pickFolder"){const $=await ye("plan.pickFolder",void 0,6e5);if(V!==z.current)return;$.path&&(D.current=!1,Y($.path),D.current=!0)}else{const $=await ye(`plan.${B}`,{path:n.trim(),auditId:s==null?void 0:s.auditId,confirmed:B==="repair"||B==="export"},18e5,J=>{V===z.current&&D.current&&k(J)});if(V!==z.current)return;if(B==="audit"&&l($),B==="repair"){const J=$;l(J.audit),h(J.repair)}B==="export"&&m($)}}catch($){V===z.current&&(E($ instanceof Error?$.message:String($)),(B==="repair"||B==="export")&&l(J=>J&&{...J,canExport:!1,repaired:!1}))}finally{V===z.current&&(D.current=!1,g(void 0),k(void 0))}}const L=p?ex[p]:f?"候选 PDF 已生成":s?O?"存在待处理错误":s.canExport?"可以导出":"检查完成，待修复":"等待检查";return o.jsxs("div",{className:"page plan-pdf-page",children:[o.jsxs("header",{className:"plan-header",children:[o.jsx("h1",{children:"挂网计划导出"}),o.jsx("span",{children:L})]}),o.jsxs("div",{className:"plan-content",children:[o.jsxs("section",{className:"plan-source",children:[o.jsx("label",{htmlFor:"plan-folder",children:"月度目录"}),o.jsxs("div",{children:[o.jsx("input",{id:"plan-folder",value:n,disabled:!!p,placeholder:"选择包含一二三级计划的月份目录",onChange:B=>Y(B.target.value)}),o.jsxs("button",{className:"secondary",disabled:!!p,onClick:()=>void A("pickFolder"),children:[o.jsx(ho,{}),"选择目录"]}),o.jsx("button",{className:"primary",disabled:!!p||!n.trim(),onClick:()=>void A("audit"),children:s?"重新检查":"检查计划"})]})]}),b&&o.jsx("p",{className:"plan-error",role:"alert",children:b}),p&&o.jsxs("div",{className:"plan-progress",role:"status",children:[o.jsxs("span",{children:[o.jsx(Sn,{className:"spin"}),ex[p]]}),p==="export"&&C&&o.jsxs(o.Fragment,{children:[o.jsxs("span",{children:[C.current," / ",C.total," · ",C.name]}),o.jsx("progress",{"aria-label":"PDF 导出进度",max:C.total||11,value:C.current})]})]}),o.jsxs("div",{className:"plan-workspace",children:[o.jsxs("section",{className:"plan-inspection",children:[o.jsxs("div",{className:"plan-pane-heading",children:[o.jsx("h2",{children:"检查结果"}),s&&o.jsxs("span",{children:[s.sheetCount," 个工作表"]})]}),s?o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"plan-workbook",children:[o.jsxs("strong",{children:[s.workspace.year," 年 ",s.workspace.month," 月计划"]}),o.jsx("span",{children:tx(s.workspace.workbookPath)})]}),o.jsx("div",{className:"plan-filters","aria-label":"问题筛选",children:["全部","错误","警告"].map(B=>o.jsxs("button",{"aria-pressed":j===B,onClick:()=>N(B),children:[B," ",o.jsx("span",{children:B==="全部"?s.issues.length:B==="错误"?O:H})]},B))}),o.jsxs("div",{className:"plan-issues",children:[s.issues.filter(B=>j==="全部"||B.severity===j).map((B,V)=>o.jsxs("article",{children:[o.jsxs("div",{children:[o.jsx("span",{className:B.severity==="错误"?"plan-severity-error":"",children:B.severity}),o.jsxs("strong",{children:[B.sheet,B.location&&` · ${B.location}`]}),o.jsx("span",{children:B.canAutoFix?"可自动修复":"需手动处理"})]}),o.jsx("p",{children:B.message})]},V)),!s.issues.some(B=>j==="全部"||B.severity===j)&&o.jsx("p",{className:"plan-clear",children:s.issues.length?`没有${j}`:"未发现检查问题"})]}),o.jsxs("div",{className:"plan-next",children:[o.jsx("span",{children:O?s.repaired?"请手动处理剩余错误，再重新检查。":"修复后自动复查，剩余错误需手动处理。":s.canExport?"复查通过，可以导出候选 PDF。":"继续备份并修复，完成导出前准备。"}),o.jsx("button",{className:"secondary",disabled:!!p,onClick:()=>x("repair"),children:s.repaired?"再次修复":"备份并修复"})]}),u&&o.jsxs("details",{className:"plan-details",children:[o.jsx("summary",{children:"备份与修复明细"}),o.jsxs("p",{children:["已调整 ",u.changedCells," 个单元格、",u.changedRows," 行。"]}),o.jsxs("p",{children:["备份：",u.backupPath]})]})]}):o.jsxs("div",{className:"plan-empty",children:[o.jsx(Dv,{}),o.jsx("strong",{children:"尚未检查计划"}),o.jsx("p",{children:"选择月度目录后，查看需要处理的问题。"})]})]}),o.jsxs("section",{className:"plan-result",children:[o.jsxs("div",{className:"plan-pane-heading",children:[o.jsx("h2",{children:"导出结果"}),f&&o.jsxs("span",{children:[f.files.length," 份 PDF"]})]}),f?o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"plan-file-list",children:f.files.map(B=>o.jsx("p",{children:tx(B)},B))}),o.jsxs("div",{className:"plan-output",children:[o.jsx("span",{children:"文件位置"}),o.jsx("p",{children:f.outputFolder}),o.jsxs("button",{className:"secondary",disabled:!!p,onClick:()=>void A("openOutput"),children:[o.jsx(ho,{}),"打开输出目录"]})]})]}):o.jsxs("div",{className:"plan-empty",children:[o.jsx(Dv,{}),o.jsx("strong",{children:p==="export"?"正在生成候选 PDF":"尚未导出"}),o.jsx("p",{children:"完成检查和修复后，生成 11 份候选 PDF。"})]}),o.jsx("div",{className:"plan-export-action",children:o.jsx("button",{className:"primary",disabled:!!p||!(s!=null&&s.canExport),onClick:()=>x("export"),children:f?"重新导出 PDF":"导出 PDF"})})]})]})]}),o.jsx(mo,{open:!!v,onOpenChange:B=>{B||x(void 0)},children:o.jsxs(po,{children:[o.jsx(go,{className:"dialog-overlay"}),o.jsxs(yo,{className:"plan-confirm",children:[o.jsxs("div",{children:[o.jsx(vo,{children:v==="repair"?"确认备份并修复":"确认导出 PDF"}),o.jsx(bo,{asChild:!0,children:o.jsx("button",{className:"secondary","aria-label":"关闭确认",children:o.jsx(Xf,{})})})]}),o.jsx(xo,{children:v==="repair"?"将先备份 Excel，再修复格式和序号，并自动复查。":"将生成 11 份候选 PDF，不修改 Excel。"}),o.jsxs("footer",{children:[o.jsx(bo,{asChild:!0,children:o.jsx("button",{className:"secondary",autoFocus:!0,children:"取消"})}),o.jsx("button",{className:"primary",onClick:()=>v&&void A(v),children:v==="repair"?"备份并修复":"确认导出"})]})]})]})})]})}const wA=n=>n.split(/[\\/]/).pop();function jA(){const[n,a]=S.useState(""),[s,l]=S.useState(),[u,h]=S.useState(),[f,m]=S.useState(""),p=S.useRef(!1),g=S.useRef(0);S.useEffect(()=>()=>{g.current++},[]);function v(b){p.current||(a(b),l(void 0),m(""))}async function x(b){if(p.current||b==="export"&&!n.trim()||b==="open"&&!s)return;p.current=!0;const E=++g.current;h(b),m(""),b==="export"&&l(void 0);try{if(b==="pick"){const j=await ye("meeting.pickFile",void 0,6e5);E===g.current&&j.path&&(a(j.path),l(void 0))}else if(b==="export"){const j=await ye("meeting.export",{path:n.trim()},18e5);E===g.current&&l(j)}else await ye("meeting.openOutput",{resultId:s.resultId})}catch(j){E===g.current&&m(j instanceof Error?j.message:String(j))}finally{E===g.current&&(p.current=!1,h(void 0))}}return o.jsxs("div",{className:"page meeting-page",children:[o.jsxs("header",{className:"meeting-header",children:[o.jsx("h1",{children:"生产会资料拆分"}),o.jsx("span",{children:u==="export"?"正在拆分":s?"拆分完成":"等待拆分"})]}),o.jsxs("div",{className:"meeting-content",children:[f&&o.jsx("p",{className:"meeting-error",role:"alert",children:f}),o.jsxs("div",{className:"meeting-workspace",children:[o.jsxs("section",{children:[o.jsx("h2",{children:"源文件"}),o.jsx("label",{htmlFor:"meeting-source",children:"生产会资料 Excel"}),o.jsxs("div",{className:"meeting-input",children:[o.jsx("input",{id:"meeting-source",value:n,disabled:!!u,onChange:b=>v(b.target.value),placeholder:"选择 .xlsx、.xlsm 或 .xls 文件"}),o.jsxs("button",{className:"secondary",disabled:!!u,onClick:()=>void x("pick"),children:[o.jsx(ho,{}),"选择文件"]})]}),o.jsx("p",{className:"meeting-hint",children:"源文件需包含一个工作表，按已发运、在制、预投三个分段拆分。"}),o.jsxs("details",{className:"meeting-rules",children:[o.jsx("summary",{children:"拆分规则"}),o.jsx("p",{children:"生成包含三个独立工作表的 .xlsx，保存到源文件所在目录，保留源文件。"}),o.jsx("p",{children:"保留原有内容、公式和布局，清除红色与绿色背景填充。宏不会保留到输出文件。"})]}),o.jsx("div",{className:"meeting-actions",children:o.jsx("button",{className:"primary",disabled:!!u||!n.trim(),onClick:()=>void x("export"),children:u==="export"?"正在拆分…":s?"重新拆分":"开始拆分"})})]}),o.jsxs("section",{className:"meeting-result","aria-live":"polite",children:[o.jsxs("div",{className:"meeting-result-heading",children:[o.jsx("h2",{children:"拆分结果"}),s&&o.jsxs("span",{children:[s.sheetNames.length," 个工作表"]})]}),s?o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"meeting-file",children:[o.jsx(fo,{}),o.jsxs("div",{children:[o.jsx("h3",{children:wA(s.outputPath)}),o.jsxs("p",{children:["开会日期 · ",s.meetingDate]})]})]}),o.jsx("ol",{children:s.sheetNames.map(b=>o.jsx("li",{children:b},b))}),o.jsxs("div",{className:"meeting-output",children:[o.jsx("span",{children:"文件位置"}),o.jsx("p",{children:s.outputPath}),o.jsxs("button",{className:"secondary",disabled:!!u,onClick:()=>void x("open"),children:[o.jsx(ho,{}),"打开文件位置"]})]})]}):o.jsxs("div",{className:"meeting-empty",children:[u==="export"?o.jsx(Sn,{className:"spin"}):o.jsx(fo,{}),o.jsx("strong",{children:u==="export"?"正在生成拆分文件":"尚未生成拆分文件"}),o.jsx("p",{children:u==="export"?"正在检查并处理工作表，请稍候。":"选择源文件后开始拆分。"})]})]})]})]})]})}const wd=(n=0)=>{const a=new Date;return{startDate:new Date(Date.UTC(a.getFullYear(),a.getMonth()+n-1,21)).toISOString().slice(0,10),endDate:new Date(Date.UTC(a.getFullYear(),a.getMonth()+n,20)).toISOString().slice(0,10)}},jd={sourceRoot:"",outputRoot:"",reportUrl:"",username:"",password:""},nx=n=>({sourceRoot:n.sourceRoot,outputRoot:n.outputRoot,reportUrl:n.reportUrl,username:n.username,password:""}),ql=n=>n instanceof Error?n.message:String(n),rx=n=>n?`${n.slice(0,4)} 年 ${Number(n.slice(5,7))} 月`:"—",ax={prepare:"准备中",collect:"正在导出日报",parse:"正在读取数据",summary:"正在生成汇总",complete:"正在完成"};function EA(){const[n,a]=S.useState(),[s,l]=S.useState(wd),[u,h]=S.useState(jd),[f,m]=S.useState(!1),[p,g]=S.useState("load"),[v,x]=S.useState(""),[b,E]=S.useState(""),[j,N]=S.useState(),[C,k]=S.useState(),[D,z]=S.useState(!1),[O,H]=S.useState(!1),Y=S.useRef(0),A=S.useRef(!1),L=Math.floor((Date.parse(`${s.endDate}T00:00:00Z`)-Date.parse(`${s.startDate}T00:00:00Z`))/864e5)+1,B=Number.isFinite(L)?L<1?"结束日期不能早于开始日期。":L>366?"单次统计范围不能超过 366 天。":"":"请选择完整日期。",V=C!=null&&C.total?Math.min(100,Math.max(0,Math.round(C.current/C.total*100))):0;async function $(){const Z=++Y.current;A.current=!0,g("load"),x("");try{const X=await ye("report.getState");Z===Y.current&&a(X)}catch(X){Z===Y.current&&x(ql(X))}finally{Z===Y.current&&(A.current=!1,g(void 0))}}S.useEffect(()=>($(),()=>{Y.current++}),[]);function J(Z){A.current||(l(Z),N(void 0),k(void 0),z(!1),x(""),H(!1))}function oe(Z){A.current||(m(Z),E(""),h(Z&&n?nx(n):jd))}async function ce(Z){if(Z.preventDefault(),A.current||!n)return;const X={...u,sourceRoot:u.sourceRoot.trim(),outputRoot:u.outputRoot.trim(),reportUrl:u.reportUrl.trim(),username:u.username.trim()};if(JSON.stringify(X)===JSON.stringify(nx(n))){oe(!1);return}const re=++Y.current;A.current=!0,g("save"),E("");try{const T=await ye("report.saveConfig",X);if(re!==Y.current)return;a(T),m(!1),h(jd),N(void 0),k(void 0),z(!1),x("")}catch(T){re===Y.current&&E(ql(T))}finally{re===Y.current&&(A.current=!1,g(void 0))}}async function le(){if(A.current||!(n!=null&&n.credentialsConfigured))return;const Z=++Y.current;A.current=!0,g("auth"),x("");try{await ye("report.authenticate",void 0,600*1e3);const X=await ye("report.getState");Z===Y.current&&a(X)}catch(X){Z===Y.current&&x(ql(X))}finally{Z===Y.current&&(A.current=!1,g(void 0))}}async function U(){if(A.current||!(n!=null&&n.authenticated)||B)return;const Z=++Y.current,X={...s};A.current=!0,g("run"),x(""),N(void 0),z(!1),H(!1),k({stage:"prepare",current:0,total:L,message:""});try{const re=await ye("report.run",X,18e5,T=>{Z===Y.current&&A.current&&k(T)});Z===Y.current&&(N(re),k(void 0))}catch(re){Z===Y.current&&(x(ql(re)),z(!0),k(void 0))}finally{Z===Y.current&&(A.current=!1,g(void 0))}}async function ae(){if(j)try{await navigator.clipboard.writeText(j.summaryPath),H(!0)}catch{x("无法复制，请选中文件路径手动复制。")}}return o.jsxs("div",{className:"page report-center-page",children:[o.jsxs("header",{className:"report-header",children:[o.jsx("h1",{children:"文件统计汇总"}),o.jsxs("div",{className:"report-header-actions",children:[o.jsx("span",{className:"report-status",children:p==="load"?"加载中":n!=null&&n.authenticated?"已验证登录":"未验证登录"}),o.jsx("button",{className:"secondary report-icon-button","aria-label":"报表设置",title:"报表设置",disabled:!!p||!n,onClick:()=>oe(!0),children:o.jsx(Gf,{})})]})]}),o.jsxs("div",{className:"report-content",children:[v&&o.jsxs("div",{className:"report-error",role:"alert",children:[o.jsx("span",{children:v}),!n&&o.jsx("button",{className:"secondary",disabled:!!p,onClick:()=>void $(),children:"重新加载"})]}),o.jsxs("section",{className:"report-workspace",children:[o.jsxs("div",{className:"report-pane report-period",children:[o.jsxs("div",{className:"report-pane-heading",children:[o.jsx("h2",{children:"统计范围"}),!B&&o.jsxs("span",{children:[L," 天"]})]}),o.jsxs("div",{className:"report-dates",children:[o.jsx(tn,{label:"开始日期",value:s.startDate,disabled:!!p,onChange:Z=>J({...s,startDate:Z})}),o.jsx(tn,{label:"结束日期",value:s.endDate,disabled:!!p,onChange:Z=>J({...s,endDate:Z})})]}),o.jsxs("div",{className:"report-range-tools",children:[o.jsxs("div",{children:[o.jsx("button",{disabled:!!p,onClick:()=>J(wd()),children:"本期"}),o.jsx("button",{disabled:!!p,onClick:()=>J(wd(-1)),children:"上期"})]}),o.jsx("span",{children:B||`汇总月份 · ${rx(s.endDate)}`})]}),o.jsxs("div",{className:"report-execution",children:[p==="run"&&o.jsxs("div",{className:"report-progress",role:"status",children:[o.jsxs("div",{children:[o.jsxs("span",{children:[o.jsx(Sn,{className:"spin"}),ax[(C==null?void 0:C.stage)||"prepare"]]}),C&&["collect","parse"].includes(C.stage)&&o.jsxs("span",{children:[C.current," / ",C.total]})]}),o.jsx("div",{className:"report-progress-bar",role:"progressbar","aria-label":ax[(C==null?void 0:C.stage)||"prepare"],"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":V,children:o.jsx("i",{style:{width:`${V}%`}})}),(C==null?void 0:C.message)&&o.jsxs("details",{className:"report-details",children:[o.jsx("summary",{children:"处理详情"}),o.jsx("p",{children:C.message})]})]}),!(n!=null&&n.credentialsConfigured)&&n&&o.jsxs("p",{className:"report-setup",children:["请先配置报表连接。",o.jsx("button",{onClick:()=>oe(!0),children:"报表设置"})]}),(n==null?void 0:n.credentialsConfigured)&&!n.authenticated&&o.jsx("p",{className:"report-setup",children:"请先验证登录。"}),o.jsxs("div",{className:"report-actions",children:[(n==null?void 0:n.credentialsConfigured)&&o.jsxs("button",{className:"secondary",disabled:!!p,onClick:le,children:[p==="auth"&&o.jsx(Sn,{className:"spin"}),p==="auth"?"验证中…":n!=null&&n.authenticated?"重新验证":"验证登录"]}),o.jsx("button",{className:"primary",disabled:!!p||!(n!=null&&n.authenticated)||!!B,onClick:U,children:p==="run"?"正在汇总…":D?"重新汇总":"开始汇总"})]})]})]}),o.jsxs("div",{className:"report-pane report-result","aria-live":"polite",children:[o.jsxs("div",{className:"report-pane-heading",children:[o.jsx("h2",{children:"汇总结果"}),j&&o.jsx("span",{children:"已完成"})]}),j?o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"report-file",children:[o.jsx(fo,{}),o.jsxs("div",{children:[o.jsxs("h3",{children:[rx(j.period.endDate),"设备台时汇总"]}),o.jsxs("p",{children:[j.period.startDate," — ",j.period.endDate]})]})]}),o.jsxs("dl",{className:"report-result-stats",children:[o.jsxs("div",{children:[o.jsx("dt",{children:"日报"}),o.jsxs("dd",{children:[j.parsedReports," / ",j.plannedReports," 份"]})]}),o.jsxs("div",{children:[o.jsx("dt",{children:"设备"}),o.jsxs("dd",{children:[j.deviceCount," 台"]})]})]}),o.jsxs("div",{className:"report-output",children:[o.jsx("span",{children:"文件位置"}),o.jsx("p",{children:j.summaryPath}),o.jsxs("button",{className:"secondary",onClick:ae,children:[o.jsx(qC,{}),O?"已复制":"复制路径"]})]}),o.jsxs("details",{className:"report-details",children:[o.jsx("summary",{children:"汇总明细"}),o.jsxs("p",{children:["数据点：",j.actualDataPoints," / ",j.expectedDataPoints]}),j.warnings.map((Z,X)=>o.jsx("p",{children:Z},X))]})]}):o.jsxs("div",{className:"report-empty",children:[o.jsx(fo,{}),o.jsx("strong",{children:p==="run"?"正在生成汇总":D?"未生成汇总文件":"尚未生成汇总"}),o.jsx("p",{children:p==="run"?"完成后可在这里查看文件。":D?"处理错误后，可重新汇总。":"选择统计范围后开始汇总。"})]})]})]})]}),o.jsx(mo,{open:f,onOpenChange:oe,children:o.jsxs(po,{children:[o.jsx(go,{className:"dialog-overlay"}),o.jsxs(yo,{className:"report-settings-dialog",children:[o.jsxs("div",{className:"report-settings-heading",children:[o.jsx(vo,{children:"报表设置"}),o.jsx(bo,{asChild:!0,children:o.jsx("button",{className:"secondary report-icon-button",disabled:!!p,"aria-label":"关闭报表设置",children:o.jsx(Xf,{})})})]}),o.jsx(xo,{className:"report-sr-only",children:"设置报表连接与文件保存位置。"}),o.jsxs("form",{onSubmit:ce,children:[o.jsxs("fieldset",{disabled:!!p,children:[o.jsx("legend",{children:"报表连接"}),o.jsxs("label",{children:["报表网页",o.jsx("input",{type:"url",required:!0,value:u.reportUrl,onChange:Z=>h({...u,reportUrl:Z.target.value}),placeholder:"https://…"})]}),o.jsxs("div",{className:"report-settings-grid",children:[o.jsxs("label",{children:["账号",o.jsx("input",{required:!0,autoComplete:"username",value:u.username,onChange:Z=>h({...u,username:Z.target.value})})]}),o.jsxs("label",{children:["密码",o.jsx("input",{type:"password",required:!(n!=null&&n.credentialsConfigured),autoComplete:"new-password",value:u.password,onChange:Z=>h({...u,password:Z.target.value}),placeholder:n!=null&&n.credentialsConfigured?"留空保持原密码":"请输入密码"})]})]})]}),o.jsxs("fieldset",{disabled:!!p,children:[o.jsx("legend",{children:"保存位置"}),o.jsxs("label",{children:["原始日报",o.jsx("input",{required:!0,value:u.sourceRoot,onChange:Z=>h({...u,sourceRoot:Z.target.value})})]}),o.jsxs("label",{children:["汇总文件",o.jsx("input",{required:!0,value:u.outputRoot,onChange:Z=>h({...u,outputRoot:Z.target.value})})]})]}),b&&o.jsx("p",{className:"report-error",role:"alert",children:b}),o.jsxs("div",{className:"report-settings-actions",children:[o.jsx(bo,{asChild:!0,children:o.jsx("button",{className:"secondary",type:"button",disabled:!!p,children:"取消"})}),o.jsx("button",{className:"primary",type:"submit",disabled:!!p,children:p==="save"?"保存中…":"保存设置"})]})]})]})]})})]})}const cf="••••••••••••",ix=[{key:"connection",label:"连接",keywords:"Notion API 令牌 根页面 数据源",icon:o.jsx(RA,{})},{key:"notification",label:"通知",keywords:"钉钉 Webhook Secret 规则",icon:o.jsx(OA,{})},{key:"data",label:"数据与缓存",keywords:"Notion 数据源 缓存 绑定",icon:o.jsx(zA,{})},{key:"about",label:"关于",keywords:"版本 WebView2 React TypeScript",icon:o.jsx(_A,{})}];function TA({open:n,onClose:a}){const[s,l]=S.useState("connection"),[u,h]=S.useState(""),[f,m]=S.useState(null),[p,g]=S.useState(""),[v,x]=S.useState(""),[b,E]=S.useState(""),j=S.useRef(null),N=S.useRef(null);S.useEffect(()=>{if(!n)return;N.current=document.activeElement instanceof HTMLElement?document.activeElement:null,E("settings.open"),x(""),ye("settings.open").then(z=>m(z)).catch(z=>x(z instanceof Error?z.message:"设置加载失败，请重试。")).finally(()=>E("")),window.setTimeout(()=>{var z;return(z=j.current)==null?void 0:z.focus()},0);const D=z=>{z.key==="Escape"&&a()};return window.addEventListener("keydown",D),()=>{var z;window.removeEventListener("keydown",D),(z=N.current)==null||z.focus()}},[n,a]),S.useEffect(()=>{if(!p)return;const D=window.setTimeout(()=>g(""),3e3);return()=>window.clearTimeout(D)},[p]);const C=async(D,z)=>{E(D),x(""),g("");try{const O=await ye(D,z,6e4);return(D==="settings.refreshDataSources"||D==="settings.saveConnection")&&lN(!0),m(O.state),g(O.message),!0}catch(O){return x(O instanceof Error?O.message:"操作未完成，请重试。"),!1}finally{E("")}},k=S.useMemo(()=>{const D=u.trim().toLocaleLowerCase("zh-CN");return D?ix.filter(z=>`${z.label} ${z.keywords}`.toLocaleLowerCase("zh-CN").includes(D)):ix},[u]);return n?o.jsx("div",{className:"settings-overlay",onMouseDown:D=>{D.target===D.currentTarget&&a()},children:o.jsxs("div",{className:"settings-window",role:"dialog","aria-modal":"true","aria-label":"设置",children:[o.jsxs("aside",{className:"settings-sidebar",children:[o.jsxs("label",{className:"settings-search",children:[o.jsx(kA,{}),o.jsx("input",{value:u,onChange:D=>h(D.target.value),placeholder:"搜索设置","aria-label":"搜索设置"})]}),o.jsx("div",{className:"settings-sidebar-title",children:"设置"}),o.jsxs("nav",{className:"settings-nav","aria-label":"设置分类",children:[k.map(D=>o.jsxs("button",{type:"button",className:s===D.key?"settings-nav-item active":"settings-nav-item","aria-current":s===D.key?"page":void 0,onClick:()=>l(D.key),children:[o.jsx("span",{className:"settings-nav-icon",children:D.icon}),o.jsx("span",{children:D.label})]},D.key)),k.length===0&&o.jsx("p",{className:"settings-empty-search",children:"没有匹配的设置"})]})]}),o.jsxs("main",{className:"settings-main",children:[o.jsx("button",{ref:j,type:"button",className:"settings-close",onClick:a,"aria-label":"关闭设置",children:o.jsx(VA,{})}),o.jsxs("div",{className:"settings-content",children:[b==="settings.open"&&!f?o.jsx("div",{className:"settings-loading",children:"正在读取本机设置…"}):o.jsxs(o.Fragment,{children:[s==="connection"&&f&&o.jsx(CA,{state:f,busy:b,run:C}),s==="notification"&&f&&o.jsx(NA,{state:f,busy:b,run:C}),s==="data"&&f&&o.jsx(DA,{state:f,busy:b,run:C}),s==="about"&&f&&o.jsx(AA,{state:f})]}),(p||v)&&o.jsx("div",{className:`settings-message ${v?"error":""}`,role:"status","aria-live":"polite",children:v||p})]})]})]})}):null}function CA({state:n,busy:a,run:s}){const[l,u]=S.useState(""),[h,f]=S.useState(!1),[m,p]=S.useState(n.notion.rootPageId);S.useEffect(()=>p(n.notion.rootPageId),[n.notion.rootPageId]);const g=async b=>{await s(b,{token:h?l:"",rootPageId:m})&&(u(""),f(!1))},v=a==="settings.refreshDataSources",x=a==="settings.saveConnection";return o.jsxs(Ao,{title:"连接",description:"管理生产助手使用的外部数据源和服务连接。",children:[o.jsxs(Fr,{title:"Notion",children:[o.jsx(Ht,{title:"连接状态",description:"当前本机连接配置和数据源缓存状态",children:o.jsx(W0,{connected:n.notion.configured,label:n.notion.configured?"已配置":"未配置"})}),o.jsx(Ji,{title:"API 令牌",description:"使用 Windows 当前用户加密后保存在本机",children:o.jsx("input",{className:"settings-input",type:"password",autoComplete:"off",placeholder:"输入 Notion API Token",value:h?l:n.notion.configured?cf:"",onFocus:b=>{!h&&n.notion.configured&&b.currentTarget.select()},onChange:b=>{f(!0),u(b.target.value)}})}),o.jsx(Ji,{title:"根页面 ID",description:"可选。留空时自动发现当前令牌有权限访问的数据源",children:o.jsx("input",{className:"settings-input",value:m,onChange:b=>p(b.target.value)})}),o.jsxs("div",{className:"settings-buttons",children:[o.jsxs("button",{type:"button",className:"settings-button-primary",disabled:!!a,onClick:()=>g("settings.saveConnection"),children:[x&&o.jsx(as,{})," ",x?"正在连接…":"保存并连接"]}),o.jsxs("button",{type:"button",className:"settings-button-secondary",disabled:!!a,onClick:()=>g("settings.refreshDataSources"),children:[v&&o.jsx(as,{})," ",v?"正在刷新…":"刷新数据源"]})]})]}),o.jsxs(Fr,{title:"数据源",children:[o.jsx(Ht,{title:"已发现数据源",description:"最近一次从 Notion 获取的数据源",children:o.jsxs("span",{className:"settings-value",children:[n.notion.dataSourceCount," 个"]})}),o.jsx(Ht,{title:"上次同步",description:"数据源元信息最后更新时间",children:o.jsx("span",{className:"settings-value",children:n.notion.lastSyncedAt||"尚未同步"})})]})]})}function NA({state:n,busy:a,run:s}){const l=n.notification,[u,h]=S.useState(l.enabled),[f,m]=S.useState(l.channelName),[p,g]=S.useState(""),[v,x]=S.useState(""),[b,E]=S.useState(!1),[j,N]=S.useState(!1),[C,k]=S.useState(l.rules);S.useEffect(()=>{h(l.enabled),m(l.channelName),k(l.rules)},[l]);const D={enabled:u,channelName:f,webhook:b?p:"",secret:j?v:""},z=async Y=>{await s(Y,D)&&(g(""),x(""),E(!1),N(!1))},O=a==="settings.saveNotification",H=a==="settings.testNotification";return o.jsxs(Ao,{title:"通知",description:"配置生产助手全局通知使用的技术通道。业务模块只决定何时通知。",children:[o.jsxs(Fr,{title:"通知服务",children:[o.jsx(Ht,{title:"启用通知",description:"关闭后所有业务模块都不会向外发送通知",children:o.jsx(sx,{checked:u,onChange:h,label:"启用通知"})}),o.jsx(Ht,{title:"发送方式",description:"当前使用的全局通知技术通道",children:o.jsx("span",{className:"settings-value",children:"钉钉机器人 Webhook"})}),o.jsx(Ht,{title:"连接状态",description:l.checkedAt?`上次测试 ${l.checkedAt}`:"尚未发送测试通知",children:o.jsx(W0,{connected:l.connected,label:l.connected===!0?"连接正常":l.connected===!1?"连接失败":"待测试"})})]}),o.jsxs(Fr,{title:"钉钉机器人",children:[o.jsx(Ji,{title:"Webhook URL",description:"使用 Windows 当前用户加密后保存在本机",children:o.jsx("input",{className:"settings-input",type:"password",autoComplete:"off",placeholder:"https://oapi.dingtalk.com/robot/send?...",value:b?p:l.webhookConfigured?cf:"",onFocus:Y=>{!b&&l.webhookConfigured&&Y.currentTarget.select()},onChange:Y=>{E(!0),g(Y.target.value)}})}),o.jsx(Ji,{title:"加签密钥",description:"钉钉机器人 Secret，使用 Windows 当前用户加密保存",children:o.jsx("input",{className:"settings-input",type:"password",autoComplete:"off",placeholder:"SEC...",value:j?v:l.secretConfigured?cf:"",onFocus:Y=>{!j&&l.secretConfigured&&Y.currentTarget.select()},onChange:Y=>{N(!0),x(Y.target.value)}})}),o.jsx(Ji,{title:"默认接收群",description:"用于识别当前通知渠道",children:o.jsx("input",{className:"settings-input",value:f,onChange:Y=>m(Y.target.value),placeholder:"生产管理群"})}),o.jsxs("div",{className:"settings-buttons",children:[o.jsxs("button",{type:"button",className:"settings-button-primary",disabled:!!a,onClick:()=>z("settings.saveNotification"),children:[O&&o.jsx(as,{})," ",O?"正在保存…":"保存设置"]}),o.jsxs("button",{type:"button",className:"settings-button-secondary",disabled:!!a,onClick:()=>z("settings.testNotification"),children:[H&&o.jsx(as,{})," ",H?"正在发送…":"发送测试"]})]}),l.status&&o.jsx("p",{className:"settings-inline-status",children:l.status})]}),o.jsxs(Fr,{title:"通知规则",children:[o.jsx("div",{className:"settings-rule-list",children:C.map(Y=>o.jsx(Ht,{title:Y.name,description:`钉钉 · ${MA(Y.level)}`,children:o.jsx(sx,{checked:Y.enabled,label:`通知规则：${Y.name}`,onChange:A=>k(L=>L.map(B=>B.eventType===Y.eventType?{...B,enabled:A}:B))})},Y.eventType))}),o.jsx("div",{className:"settings-buttons settings-buttons-end",children:o.jsx("button",{type:"button",className:"settings-button-primary",disabled:!!a,onClick:()=>s("settings.saveNotificationRules",{rules:C}),children:"保存通知规则"})})]})]})}function DA({state:n,busy:a,run:s}){return o.jsx(Ao,{title:"数据与缓存",description:"查看和维护生产助手保存在本机的 Notion 数据源缓存。",children:o.jsxs(Fr,{title:"本地数据",children:[o.jsx(Ht,{title:"Notion 数据源缓存",description:"用于减少重复的网络请求",children:o.jsxs("div",{className:"settings-inline-actions",children:[o.jsxs("span",{className:"settings-value",children:[n.notion.dataSourceCount," 个"]}),o.jsxs("button",{type:"button",className:"settings-text-button",disabled:!!a,onClick:()=>s("settings.refreshDataSources"),children:[a==="settings.refreshDataSources"&&o.jsx(as,{})," ",a==="settings.refreshDataSources"?"刷新中…":"刷新"]})]})}),o.jsx(Ht,{title:"上次同步",description:"数据源元信息最后更新时间",children:o.jsx("span",{className:"settings-value",children:n.notion.lastSyncedAt||"尚未同步"})})]})})}function AA({state:n}){return o.jsx(Ao,{title:"关于",description:"生产助手的版本和运行环境信息。",children:o.jsxs(Fr,{title:"生产助手",children:[o.jsx(Ht,{title:"版本",description:"当前安装版本",children:o.jsx("span",{className:"settings-value",children:n.version})}),o.jsx(Ht,{title:"桌面环境",description:"应用运行容器",children:o.jsx("span",{className:"settings-value",children:"WinUI 3 + WebView2"})}),o.jsx(Ht,{title:"前端",description:"用户界面技术栈",children:o.jsx("span",{className:"settings-value",children:"React + TypeScript"})}),o.jsx(Ht,{title:"本地数据保护",description:"令牌和通知凭据仅保存在本机",children:o.jsx("span",{className:"settings-value",children:"Windows 当前用户加密"})})]})})}function Ao({title:n,description:a,children:s}){return o.jsxs("div",{className:"settings-page",children:[o.jsxs("header",{className:"settings-page-header",children:[o.jsx("h1",{children:n}),o.jsx("p",{children:a})]}),s]})}function Fr({title:n,children:a}){return o.jsxs("section",{className:"settings-section",children:[o.jsx("h2",{children:n}),o.jsx("div",{className:"settings-section-body",children:a})]})}function Ht({title:n,description:a,children:s}){return o.jsxs("div",{className:"settings-row",children:[o.jsxs("div",{className:"settings-row-text",children:[o.jsx("div",{className:"settings-row-title",children:n}),a&&o.jsx("div",{className:"settings-row-description",children:a})]}),o.jsx("div",{className:"settings-row-control",children:s})]})}function Ji({title:n,description:a,children:s}){return o.jsxs("label",{className:"settings-field",children:[o.jsx("span",{className:"settings-field-title",children:n}),a&&o.jsx("span",{className:"settings-field-description",children:a}),o.jsx("span",{className:"settings-field-control",children:s})]})}function sx({checked:n,onChange:a,label:s}){return o.jsx("button",{type:"button",role:"switch","aria-checked":n,"aria-label":s,className:n?"settings-switch checked":"settings-switch",onClick:()=>a(!n),children:o.jsx("span",{})})}function W0({connected:n,label:a}){return o.jsxs("div",{className:`settings-connected ${n===!1?"error":n===null?"pending":""}`,children:[o.jsx("span",{className:"settings-status-dot"}),a]})}function as(){return o.jsx("span",{className:"settings-spinner","aria-hidden":"true"})}const MA=n=>n==="warning"?"警告":n==="info"?"信息":"错误";function kA(){return o.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("circle",{cx:"11",cy:"11",r:"6.5"}),o.jsx("path",{d:"m16 16 4 4"})]})}function RA(){return o.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("path",{d:"M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"}),o.jsx("path",{d:"M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1"})]})}function OA(){return o.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("path",{d:"M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"}),o.jsx("path",{d:"M10 21h4"})]})}function zA(){return o.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("ellipse",{cx:"12",cy:"5",rx:"7",ry:"3"}),o.jsx("path",{d:"M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5"}),o.jsx("path",{d:"M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"})]})}function _A(){return o.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("circle",{cx:"12",cy:"12",r:"9"}),o.jsx("path",{d:"M12 11v6"}),o.jsx("path",{d:"M12 7h.01"})]})}function VA(){return o.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("path",{d:"m6 6 12 12"}),o.jsx("path",{d:"m18 6-12 12"})]})}const Ed=new Date().toISOString().slice(0,10);function BA(){const[n,a]=S.useState(""),[s,l]=S.useState(!1),[u,h]=S.useState([]),[f,m]=S.useState(""),[p,g]=S.useState([]),[v,x]=S.useState(""),[b,E]=S.useState([]),[j,N]=S.useState(""),[C,k]=S.useState([]),[D,z]=S.useState(""),[O,H]=S.useState(""),[Y,A]=S.useState("day"),[L,B]=S.useState(Ed),[V,$]=S.useState(Ed),[J,oe]=S.useState(Ed),[ce,le]=S.useState("load"),[U,ae]=S.useState(""),[Z,X]=S.useState();S.useEffect(()=>{ye("database.getState").then(ne=>{a(ne.provider),l(ne.usesBusinessSections),h(ne.businessSections),g(ne.sources)}).catch(ne=>ae(ne instanceof Error?ne.message:String(ne))).finally(()=>le(""))},[]);const re=async ne=>{var pe,Ce,Oe,Qe;if(x(ne),N(""),z(""),H(""),E([]),k([]),X(void 0),ae(""),!!ne){le("schema");try{const Fe=await ye("database.getSchema",{sourceId:ne});k(Fe.fields),E(Fe.datasets),z(((pe=Fe.fields.find(yt=>yt.type==="date"))==null?void 0:pe.id)||""),H(((Ce=Fe.fields.find(yt=>yt.type==="number"))==null?void 0:Ce.id)||""),N(((Oe=Fe.datasets.find(yt=>yt.name==="本年截止今日"))==null?void 0:Oe.id)||((Qe=Fe.datasets[0])==null?void 0:Qe.id)||"")}catch(Fe){ae(Fe instanceof Error?Fe.message:String(Fe))}finally{le("")}}},T=async()=>{le("query"),ae(""),X(void 0);try{X(await ye("database.inspect",{sourceId:v,datasetId:j,dateFieldId:xe?D:"",valueFieldId:xe?O:"",rangeKind:xe?Y:"all",businessDate:L,startDate:V,endDate:J},12e4))}catch(ne){ae(ne instanceof Error?ne.message:String(ne))}finally{le("")}},R=C.filter(ne=>ne.type==="date"),ee=s?p.filter(ne=>ne.businessSection===f):p,se=C.filter(ne=>ne.type==="number"),ue=C.find(ne=>ne.id===O),me=b.find(ne=>ne.id===j),xe=(me==null?void 0:me.name.trim())==="本年截止今日",ie=S.useMemo(()=>{const ne=new Set([D,O]);return[...C.filter(pe=>ne.has(pe.id)),...C.filter(pe=>!ne.has(pe.id))]},[C,D,O]),W=Y==="week"||Y==="custom",de=v&&j&&(!xe||D&&(!W||V&&J));return o.jsxs("div",{className:"page database-viewer-page",children:[o.jsxs("header",{children:[o.jsxs("div",{children:[o.jsx("h1",{children:"数据库查看"}),o.jsx("p",{children:"按当前适配器提供的目录选择数据库并查看真实 View；目录层级不会由界面写死。"})]}),o.jsxs("span",{className:"database-provider",children:[o.jsx(Zd,{}),"当前适配器：",n||"读取中"]})]}),o.jsxs("section",{className:"database-query-panel",children:[o.jsxs("div",{className:"database-query-heading",children:[o.jsx("h2",{children:"查询条件"}),o.jsx("p",{children:"普通 View 读取其完整结果；只有“本年截止今日”可在返回记录内计算日期口径。"})]}),o.jsxs("div",{className:"database-query-grid",children:[s&&o.jsxs("label",{children:["业务板块",o.jsx(Ut,{value:f,placeholder:ce==="load"?"正在读取业务板块…":"请选择业务板块",disabled:!!ce,options:u.map(ne=>({value:ne,label:ne})),onChange:ne=>{m(ne),re("")}})]}),o.jsxs("label",{children:["数据库",o.jsx(Ut,{value:v,placeholder:"请选择具体数据库",disabled:s&&!f||!!ce,options:ee.map(ne=>({value:ne.id,label:ne.name})),onChange:re})]}),o.jsxs("label",{children:["View",o.jsx(Ut,{value:j,placeholder:ce==="schema"?"正在读取 View…":"请选择 View",disabled:!v||!!ce,options:b.map(ne=>({value:ne.id,label:ne.name})),onChange:ne=>{N(ne),X(void 0)}})]}),xe&&o.jsxs(o.Fragment,{children:[o.jsxs("label",{children:["日期字段",o.jsx(Ut,{value:D,placeholder:"请选择日期字段",disabled:!C.length||!!ce,options:R.map(ne=>({value:ne.id,label:ne.name})),onChange:z})]}),o.jsxs("label",{children:["累计字段",o.jsx(Ut,{value:O,placeholder:"可选择数值字段",disabled:!C.length||!!ce,options:se.map(ne=>({value:ne.id,label:ne.name})),onChange:H})]}),o.jsxs("label",{children:["软件查询口径",o.jsx(Ut,{value:Y,placeholder:"请选择日期口径",disabled:!!ce,options:[{value:"day",label:"指定日期"},{value:"week",label:"指定日期范围"},{value:"month",label:"月初至指定日期"},{value:"year",label:"年初至指定日期"}],onChange:ne=>{A(ne),X(void 0)}})]}),!W&&o.jsxs("label",{children:["指定日期",o.jsx(tn,{value:L,onChange:B})]}),W&&o.jsxs(o.Fragment,{children:[o.jsxs("label",{children:["开始日期",o.jsx(tn,{value:V,onChange:$})]}),o.jsxs("label",{children:["结束日期",o.jsx(tn,{value:J,onChange:oe})]})]})]})]}),o.jsx("div",{className:"database-query-actions",children:o.jsxs("button",{className:"primary",disabled:!de||!!ce,onClick:T,children:[ce==="query"?o.jsx(Sn,{className:"spin"}):o.jsx(GC,{}),ce==="query"?"正在查询…":"执行查询"]})})]}),U&&o.jsxs("div",{className:"notice error",role:"alert",children:[o.jsx(HC,{}),o.jsxs("div",{children:[o.jsx("strong",{children:"查询失败"}),o.jsx("span",{children:U})]})]}),Z?o.jsxs("section",{className:"database-result",children:[o.jsxs("div",{className:"database-result-head",children:[o.jsxs("div",{children:[o.jsxs("h2",{children:[Z.sourceName," · ",Z.datasetName]}),o.jsx("p",{children:xe?`${Z.startDate} ～ ${Z.endDate}`:"完整 View 结果"})]}),o.jsxs("dl",{children:[o.jsxs("div",{children:[o.jsxs("dt",{children:[o.jsx($C,{}),"命中记录"]}),o.jsx("dd",{children:Z.recordCount})]}),xe&&o.jsxs("div",{children:[o.jsxs("dt",{children:[o.jsx(KC,{}),(ue==null?void 0:ue.name)||"累计值"]}),o.jsx("dd",{children:Z.total??"—"})]})]})]}),o.jsx("div",{className:"database-table-wrap",children:o.jsxs("table",{children:[o.jsx("thead",{children:o.jsx("tr",{children:ie.map(ne=>o.jsxs("th",{children:[ne.name,o.jsx("small",{children:ne.type})]},ne.id))})}),o.jsx("tbody",{children:Z.records.map(ne=>o.jsx("tr",{children:ie.map(pe=>o.jsx("td",{children:LA(ne.values[pe.id])},pe.id))},ne.id))})]})}),Z.truncated&&o.jsx("p",{className:"database-truncated",children:"结果仅展示前 200 条，命中数量和累计值按全部记录计算。"})]}):!ce&&!U&&o.jsxs("section",{className:"database-empty",children:[o.jsx(Zd,{}),o.jsx("h2",{children:s?"选择业务板块、数据库和 View 后执行查询":"选择数据库和 View 后执行查询"}),o.jsx("p",{children:"普通 View 显示完整结果；“本年截止今日”可进一步选择日期口径。所有操作均为只读。"})]})]})}function LA(n){return n==null||n===""?"—":typeof n=="boolean"?n?"是":"否":typeof n=="number"?n.toLocaleString("zh-CN",{maximumFractionDigits:2}):String(n)}function UA(){const[n,a]=S.useState(()=>window.location.search),[s,l]=S.useState(!1);S.useEffect(()=>{const E=()=>a(window.location.search);return window.addEventListener("popstate",E),()=>window.removeEventListener("popstate",E)},[]);const u=new URLSearchParams(n),h=u.get("route"),f=h!=null&&h.startsWith("navigation:")||h==="daily-weld"||h==="production-message"||h==="database-viewer"||h==="daily-report"||h==="report-center"||h==="plan-pdf"||h==="production-meeting"?h:"production-message",m=u.get("navigation")||"",p=Kb();S.useEffect(()=>{kC(f,m)},[f,m]);const g=E=>ye("app.navigateNative",{tag:E}).catch(()=>{}),v=f.startsWith("navigation:")?f.slice(11):f,x=f.startsWith("navigation:");S.useEffect(()=>(document.body.classList.toggle("settings-over-native",x&&s),()=>document.body.classList.remove("settings-over-native")),[x,s]);const b=()=>{l(!1),window.dispatchEvent(new Event("production-settings-updated")),ye("settings.close").catch(()=>{})};return o.jsxs("div",{className:`desktop-shell ${x&&s?"settings-over-native":""}`,children:[o.jsx("div",{className:"production-message-demo desktop-shell-navigation",children:o.jsx(dA,{active:v,navigate:g,openSettings:()=>l(!0)})}),o.jsx("div",{className:`desktop-shell-content ${x?"desktop-shell-content-native":""}`,children:x?o.jsx("div",{className:"native-content-slot","aria-hidden":"true"}):o.jsx(bT,{mode:"wait",children:o.jsx(Zb.div,{className:f==="production-message"||f==="daily-weld"?"production-message-demo production-message-content":"app-shell","data-page-route":f,initial:p?!1:{opacity:0,y:8},animate:{opacity:1,y:0},exit:p?void 0:{opacity:0,y:-6},transition:{duration:.2},children:f==="production-message"?o.jsx(vA,{}):f==="daily-weld"?o.jsx(oA,{openSettings:()=>l(!0)}):o.jsx("main",{children:f==="production-meeting"?o.jsx(jA,{}):f==="plan-pdf"?o.jsx(SA,{}):f==="database-viewer"?o.jsx(BA,{}):f==="daily-report"?o.jsx(iA,{openSettings:()=>l(!0)}):o.jsx(EA,{})})},f)})}),o.jsx(TA,{open:s,onClose:b})]})}Mw.createRoot(document.getElementById("root")).render(o.jsx(cx.StrictMode,{children:o.jsx(UA,{})}));
