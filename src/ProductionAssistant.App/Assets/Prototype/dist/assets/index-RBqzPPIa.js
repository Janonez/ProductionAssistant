function Ej(n,a){for(var s=0;s<a.length;s++){const o=a[s];if(typeof o!="string"&&!Array.isArray(o)){for(const u in o)if(u!=="default"&&!(u in n)){const h=Object.getOwnPropertyDescriptor(o,u);h&&Object.defineProperty(n,u,h.get?h:{enumerable:!0,get:()=>o[u]})}}}return Object.freeze(Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}))}(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const u of document.querySelectorAll('link[rel="modulepreload"]'))o(u);new MutationObserver(u=>{for(const h of u)if(h.type==="childList")for(const d of h.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function s(u){const h={};return u.integrity&&(h.integrity=u.integrity),u.referrerPolicy&&(h.referrerPolicy=u.referrerPolicy),u.crossOrigin==="use-credentials"?h.credentials="include":u.crossOrigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function o(u){if(u.ep)return;u.ep=!0;const h=s(u);fetch(u.href,h)}})();function px(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var nd={exports:{}},es={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ly;function Tj(){if(ly)return es;ly=1;var n=Symbol.for("react.transitional.element"),a=Symbol.for("react.fragment");function s(o,u,h){var d=null;if(h!==void 0&&(d=""+h),u.key!==void 0&&(d=""+u.key),"key"in u){h={};for(var m in u)m!=="key"&&(h[m]=u[m])}else h=u;return u=h.ref,{$$typeof:n,type:o,key:d,ref:u!==void 0?u:null,props:h}}return es.Fragment=a,es.jsx=s,es.jsxs=s,es}var oy;function Cj(){return oy||(oy=1,nd.exports=Tj()),nd.exports}var l=Cj(),rd={exports:{}},we={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var cy;function Nj(){if(cy)return we;cy=1;var n=Symbol.for("react.transitional.element"),a=Symbol.for("react.portal"),s=Symbol.for("react.fragment"),o=Symbol.for("react.strict_mode"),u=Symbol.for("react.profiler"),h=Symbol.for("react.consumer"),d=Symbol.for("react.context"),m=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),g=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),x=Symbol.for("react.activity"),b=Symbol.iterator;function j(N){return N===null||typeof N!="object"?null:(N=b&&N[b]||N["@@iterator"],typeof N=="function"?N:null)}var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},C=Object.assign,T={};function k(N,V,ee){this.props=N,this.context=V,this.refs=T,this.updater=ee||E}k.prototype.isReactComponent={},k.prototype.setState=function(N,V){if(typeof N!="object"&&typeof N!="function"&&N!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,N,V,"setState")},k.prototype.forceUpdate=function(N){this.updater.enqueueForceUpdate(this,N,"forceUpdate")};function A(){}A.prototype=k.prototype;function R(N,V,ee){this.props=N,this.context=V,this.refs=T,this.updater=ee||E}var _=R.prototype=new A;_.constructor=R,C(_,k.prototype),_.isPureReactComponent=!0;var B=Array.isArray;function Y(){}var D={H:null,A:null,T:null,S:null},H=Object.prototype.hasOwnProperty;function M(N,V,ee){var le=ee.ref;return{$$typeof:n,type:N,key:V,ref:le!==void 0?le:null,props:ee}}function z(N,V){return M(N.type,V,N.props)}function L(N){return typeof N=="object"&&N!==null&&N.$$typeof===n}function K(N){var V={"=":"=0",":":"=2"};return"$"+N.replace(/[=:]/g,function(ee){return V[ee]})}var ce=/\/+/g;function se(N,V){return typeof N=="object"&&N!==null&&N.key!=null?K(""+N.key):V.toString(36)}function ye(N){switch(N.status){case"fulfilled":return N.value;case"rejected":throw N.reason;default:switch(typeof N.status=="string"?N.then(Y,Y):(N.status="pending",N.then(function(V){N.status==="pending"&&(N.status="fulfilled",N.value=V)},function(V){N.status==="pending"&&(N.status="rejected",N.reason=V)})),N.status){case"fulfilled":return N.value;case"rejected":throw N.reason}}throw N}function P(N,V,ee,le,de){var me=typeof N;(me==="undefined"||me==="boolean")&&(N=null);var xe=!1;if(N===null)xe=!0;else switch(me){case"bigint":case"string":case"number":xe=!0;break;case"object":switch(N.$$typeof){case n:case a:xe=!0;break;case v:return xe=N._init,P(xe(N._payload),V,ee,le,de)}}if(xe)return de=de(N),xe=le===""?"."+se(N,0):le,B(de)?(ee="",xe!=null&&(ee=xe.replace(ce,"$&/")+"/"),P(de,V,ee,"",function(he){return he})):de!=null&&(L(de)&&(de=z(de,ee+(de.key==null||N&&N.key===de.key?"":(""+de.key).replace(ce,"$&/")+"/")+xe)),V.push(de)),1;xe=0;var ie=le===""?".":le+":";if(B(N))for(var W=0;W<N.length;W++)le=N[W],me=ie+se(le,W),xe+=P(le,V,ee,me,de);else if(W=j(N),typeof W=="function")for(N=W.call(N),W=0;!(le=N.next()).done;)le=le.value,me=ie+se(le,W++),xe+=P(le,V,ee,me,de);else if(me==="object"){if(typeof N.then=="function")return P(ye(N),V,ee,le,de);throw V=String(N),Error("Objects are not valid as a React child (found: "+(V==="[object Object]"?"object with keys {"+Object.keys(N).join(", ")+"}":V)+"). If you meant to render a collection of children, use an array instead.")}return xe}function oe(N,V,ee){if(N==null)return N;var le=[],de=0;return P(N,le,"","",function(me){return V.call(ee,me,de++)}),le}function J(N){if(N._status===-1){var V=N._result;V=V(),V.then(function(ee){(N._status===0||N._status===-1)&&(N._status=1,N._result=ee)},function(ee){(N._status===0||N._status===-1)&&(N._status=2,N._result=ee)}),N._status===-1&&(N._status=0,N._result=V)}if(N._status===1)return N._result.default;throw N._result}var $=typeof reportError=="function"?reportError:function(N){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var V=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof N=="object"&&N!==null&&typeof N.message=="string"?String(N.message):String(N),error:N});if(!window.dispatchEvent(V))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",N);return}console.error(N)},ae={map:oe,forEach:function(N,V,ee){oe(N,function(){V.apply(this,arguments)},ee)},count:function(N){var V=0;return oe(N,function(){V++}),V},toArray:function(N){return oe(N,function(V){return V})||[]},only:function(N){if(!L(N))throw Error("React.Children.only expected to receive a single React element child.");return N}};return we.Activity=x,we.Children=ae,we.Component=k,we.Fragment=s,we.Profiler=u,we.PureComponent=R,we.StrictMode=o,we.Suspense=p,we.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=D,we.__COMPILER_RUNTIME={__proto__:null,c:function(N){return D.H.useMemoCache(N)}},we.cache=function(N){return function(){return N.apply(null,arguments)}},we.cacheSignal=function(){return null},we.cloneElement=function(N,V,ee){if(N==null)throw Error("The argument must be a React element, but you passed "+N+".");var le=C({},N.props),de=N.key;if(V!=null)for(me in V.key!==void 0&&(de=""+V.key),V)!H.call(V,me)||me==="key"||me==="__self"||me==="__source"||me==="ref"&&V.ref===void 0||(le[me]=V[me]);var me=arguments.length-2;if(me===1)le.children=ee;else if(1<me){for(var xe=Array(me),ie=0;ie<me;ie++)xe[ie]=arguments[ie+2];le.children=xe}return M(N.type,de,le)},we.createContext=function(N){return N={$$typeof:d,_currentValue:N,_currentValue2:N,_threadCount:0,Provider:null,Consumer:null},N.Provider=N,N.Consumer={$$typeof:h,_context:N},N},we.createElement=function(N,V,ee){var le,de={},me=null;if(V!=null)for(le in V.key!==void 0&&(me=""+V.key),V)H.call(V,le)&&le!=="key"&&le!=="__self"&&le!=="__source"&&(de[le]=V[le]);var xe=arguments.length-2;if(xe===1)de.children=ee;else if(1<xe){for(var ie=Array(xe),W=0;W<xe;W++)ie[W]=arguments[W+2];de.children=ie}if(N&&N.defaultProps)for(le in xe=N.defaultProps,xe)de[le]===void 0&&(de[le]=xe[le]);return M(N,me,de)},we.createRef=function(){return{current:null}},we.forwardRef=function(N){return{$$typeof:m,render:N}},we.isValidElement=L,we.lazy=function(N){return{$$typeof:v,_payload:{_status:-1,_result:N},_init:J}},we.memo=function(N,V){return{$$typeof:g,type:N,compare:V===void 0?null:V}},we.startTransition=function(N){var V=D.T,ee={};D.T=ee;try{var le=N(),de=D.S;de!==null&&de(ee,le),typeof le=="object"&&le!==null&&typeof le.then=="function"&&le.then(Y,$)}catch(me){$(me)}finally{V!==null&&ee.types!==null&&(V.types=ee.types),D.T=V}},we.unstable_useCacheRefresh=function(){return D.H.useCacheRefresh()},we.use=function(N){return D.H.use(N)},we.useActionState=function(N,V,ee){return D.H.useActionState(N,V,ee)},we.useCallback=function(N,V){return D.H.useCallback(N,V)},we.useContext=function(N){return D.H.useContext(N)},we.useDebugValue=function(){},we.useDeferredValue=function(N,V){return D.H.useDeferredValue(N,V)},we.useEffect=function(N,V){return D.H.useEffect(N,V)},we.useEffectEvent=function(N){return D.H.useEffectEvent(N)},we.useId=function(){return D.H.useId()},we.useImperativeHandle=function(N,V,ee){return D.H.useImperativeHandle(N,V,ee)},we.useInsertionEffect=function(N,V){return D.H.useInsertionEffect(N,V)},we.useLayoutEffect=function(N,V){return D.H.useLayoutEffect(N,V)},we.useMemo=function(N,V){return D.H.useMemo(N,V)},we.useOptimistic=function(N,V){return D.H.useOptimistic(N,V)},we.useReducer=function(N,V,ee){return D.H.useReducer(N,V,ee)},we.useRef=function(N){return D.H.useRef(N)},we.useState=function(N){return D.H.useState(N)},we.useSyncExternalStore=function(N,V,ee){return D.H.useSyncExternalStore(N,V,ee)},we.useTransition=function(){return D.H.useTransition()},we.version="19.2.8",we}var uy;function Sf(){return uy||(uy=1,rd.exports=Nj()),rd.exports}var S=Sf();const gx=px(S),Es=Ej({__proto__:null,default:gx},[S]);var ad={exports:{}},ts={},id={exports:{}},sd={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var dy;function Dj(){return dy||(dy=1,(function(n){function a(P,oe){var J=P.length;P.push(oe);e:for(;0<J;){var $=J-1>>>1,ae=P[$];if(0<u(ae,oe))P[$]=oe,P[J]=ae,J=$;else break e}}function s(P){return P.length===0?null:P[0]}function o(P){if(P.length===0)return null;var oe=P[0],J=P.pop();if(J!==oe){P[0]=J;e:for(var $=0,ae=P.length,N=ae>>>1;$<N;){var V=2*($+1)-1,ee=P[V],le=V+1,de=P[le];if(0>u(ee,J))le<ae&&0>u(de,ee)?(P[$]=de,P[le]=J,$=le):(P[$]=ee,P[V]=J,$=V);else if(le<ae&&0>u(de,J))P[$]=de,P[le]=J,$=le;else break e}}return oe}function u(P,oe){var J=P.sortIndex-oe.sortIndex;return J!==0?J:P.id-oe.id}if(n.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var h=performance;n.unstable_now=function(){return h.now()}}else{var d=Date,m=d.now();n.unstable_now=function(){return d.now()-m}}var p=[],g=[],v=1,x=null,b=3,j=!1,E=!1,C=!1,T=!1,k=typeof setTimeout=="function"?setTimeout:null,A=typeof clearTimeout=="function"?clearTimeout:null,R=typeof setImmediate<"u"?setImmediate:null;function _(P){for(var oe=s(g);oe!==null;){if(oe.callback===null)o(g);else if(oe.startTime<=P)o(g),oe.sortIndex=oe.expirationTime,a(p,oe);else break;oe=s(g)}}function B(P){if(C=!1,_(P),!E)if(s(p)!==null)E=!0,Y||(Y=!0,K());else{var oe=s(g);oe!==null&&ye(B,oe.startTime-P)}}var Y=!1,D=-1,H=5,M=-1;function z(){return T?!0:!(n.unstable_now()-M<H)}function L(){if(T=!1,Y){var P=n.unstable_now();M=P;var oe=!0;try{e:{E=!1,C&&(C=!1,A(D),D=-1),j=!0;var J=b;try{t:{for(_(P),x=s(p);x!==null&&!(x.expirationTime>P&&z());){var $=x.callback;if(typeof $=="function"){x.callback=null,b=x.priorityLevel;var ae=$(x.expirationTime<=P);if(P=n.unstable_now(),typeof ae=="function"){x.callback=ae,_(P),oe=!0;break t}x===s(p)&&o(p),_(P)}else o(p);x=s(p)}if(x!==null)oe=!0;else{var N=s(g);N!==null&&ye(B,N.startTime-P),oe=!1}}break e}finally{x=null,b=J,j=!1}oe=void 0}}finally{oe?K():Y=!1}}}var K;if(typeof R=="function")K=function(){R(L)};else if(typeof MessageChannel<"u"){var ce=new MessageChannel,se=ce.port2;ce.port1.onmessage=L,K=function(){se.postMessage(null)}}else K=function(){k(L,0)};function ye(P,oe){D=k(function(){P(n.unstable_now())},oe)}n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(P){P.callback=null},n.unstable_forceFrameRate=function(P){0>P||125<P?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):H=0<P?Math.floor(1e3/P):5},n.unstable_getCurrentPriorityLevel=function(){return b},n.unstable_next=function(P){switch(b){case 1:case 2:case 3:var oe=3;break;default:oe=b}var J=b;b=oe;try{return P()}finally{b=J}},n.unstable_requestPaint=function(){T=!0},n.unstable_runWithPriority=function(P,oe){switch(P){case 1:case 2:case 3:case 4:case 5:break;default:P=3}var J=b;b=P;try{return oe()}finally{b=J}},n.unstable_scheduleCallback=function(P,oe,J){var $=n.unstable_now();switch(typeof J=="object"&&J!==null?(J=J.delay,J=typeof J=="number"&&0<J?$+J:$):J=$,P){case 1:var ae=-1;break;case 2:ae=250;break;case 5:ae=1073741823;break;case 4:ae=1e4;break;default:ae=5e3}return ae=J+ae,P={id:v++,callback:oe,priorityLevel:P,startTime:J,expirationTime:ae,sortIndex:-1},J>$?(P.sortIndex=J,a(g,P),s(p)===null&&P===s(g)&&(C?(A(D),D=-1):C=!0,ye(B,J-$))):(P.sortIndex=ae,a(p,P),E||j||(E=!0,Y||(Y=!0,K()))),P},n.unstable_shouldYield=z,n.unstable_wrapCallback=function(P){var oe=b;return function(){var J=b;b=oe;try{return P.apply(this,arguments)}finally{b=J}}}})(sd)),sd}var fy;function Aj(){return fy||(fy=1,id.exports=Dj()),id.exports}var ld={exports:{}},jt={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var hy;function kj(){if(hy)return jt;hy=1;var n=Sf();function a(p){var g="https://react.dev/errors/"+p;if(1<arguments.length){g+="?args[]="+encodeURIComponent(arguments[1]);for(var v=2;v<arguments.length;v++)g+="&args[]="+encodeURIComponent(arguments[v])}return"Minified React error #"+p+"; visit "+g+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function s(){}var o={d:{f:s,r:function(){throw Error(a(522))},D:s,C:s,L:s,m:s,X:s,S:s,M:s},p:0,findDOMNode:null},u=Symbol.for("react.portal");function h(p,g,v){var x=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:u,key:x==null?null:""+x,children:p,containerInfo:g,implementation:v}}var d=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function m(p,g){if(p==="font")return"";if(typeof g=="string")return g==="use-credentials"?g:""}return jt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=o,jt.createPortal=function(p,g){var v=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!g||g.nodeType!==1&&g.nodeType!==9&&g.nodeType!==11)throw Error(a(299));return h(p,g,null,v)},jt.flushSync=function(p){var g=d.T,v=o.p;try{if(d.T=null,o.p=2,p)return p()}finally{d.T=g,o.p=v,o.d.f()}},jt.preconnect=function(p,g){typeof p=="string"&&(g?(g=g.crossOrigin,g=typeof g=="string"?g==="use-credentials"?g:"":void 0):g=null,o.d.C(p,g))},jt.prefetchDNS=function(p){typeof p=="string"&&o.d.D(p)},jt.preinit=function(p,g){if(typeof p=="string"&&g&&typeof g.as=="string"){var v=g.as,x=m(v,g.crossOrigin),b=typeof g.integrity=="string"?g.integrity:void 0,j=typeof g.fetchPriority=="string"?g.fetchPriority:void 0;v==="style"?o.d.S(p,typeof g.precedence=="string"?g.precedence:void 0,{crossOrigin:x,integrity:b,fetchPriority:j}):v==="script"&&o.d.X(p,{crossOrigin:x,integrity:b,fetchPriority:j,nonce:typeof g.nonce=="string"?g.nonce:void 0})}},jt.preinitModule=function(p,g){if(typeof p=="string")if(typeof g=="object"&&g!==null){if(g.as==null||g.as==="script"){var v=m(g.as,g.crossOrigin);o.d.M(p,{crossOrigin:v,integrity:typeof g.integrity=="string"?g.integrity:void 0,nonce:typeof g.nonce=="string"?g.nonce:void 0})}}else g==null&&o.d.M(p)},jt.preload=function(p,g){if(typeof p=="string"&&typeof g=="object"&&g!==null&&typeof g.as=="string"){var v=g.as,x=m(v,g.crossOrigin);o.d.L(p,v,{crossOrigin:x,integrity:typeof g.integrity=="string"?g.integrity:void 0,nonce:typeof g.nonce=="string"?g.nonce:void 0,type:typeof g.type=="string"?g.type:void 0,fetchPriority:typeof g.fetchPriority=="string"?g.fetchPriority:void 0,referrerPolicy:typeof g.referrerPolicy=="string"?g.referrerPolicy:void 0,imageSrcSet:typeof g.imageSrcSet=="string"?g.imageSrcSet:void 0,imageSizes:typeof g.imageSizes=="string"?g.imageSizes:void 0,media:typeof g.media=="string"?g.media:void 0})}},jt.preloadModule=function(p,g){if(typeof p=="string")if(g){var v=m(g.as,g.crossOrigin);o.d.m(p,{as:typeof g.as=="string"&&g.as!=="script"?g.as:void 0,crossOrigin:v,integrity:typeof g.integrity=="string"?g.integrity:void 0})}else o.d.m(p)},jt.requestFormReset=function(p){o.d.r(p)},jt.unstable_batchedUpdates=function(p,g){return p(g)},jt.useFormState=function(p,g,v){return d.H.useFormState(p,g,v)},jt.useFormStatus=function(){return d.H.useHostTransitionStatus()},jt.version="19.2.8",jt}var my;function yx(){if(my)return ld.exports;my=1;function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(a){console.error(a)}}return n(),ld.exports=kj(),ld.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var py;function Mj(){if(py)return ts;py=1;var n=Aj(),a=Sf(),s=yx();function o(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var r=2;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function u(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function h(e){var t=e,r=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(r=t.return),e=t.return;while(e)}return t.tag===3?r:null}function d(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function m(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function p(e){if(h(e)!==e)throw Error(o(188))}function g(e){var t=e.alternate;if(!t){if(t=h(e),t===null)throw Error(o(188));return t!==e?null:e}for(var r=e,i=t;;){var c=r.return;if(c===null)break;var f=c.alternate;if(f===null){if(i=c.return,i!==null){r=i;continue}break}if(c.child===f.child){for(f=c.child;f;){if(f===r)return p(c),e;if(f===i)return p(c),t;f=f.sibling}throw Error(o(188))}if(r.return!==i.return)r=c,i=f;else{for(var y=!1,w=c.child;w;){if(w===r){y=!0,r=c,i=f;break}if(w===i){y=!0,i=c,r=f;break}w=w.sibling}if(!y){for(w=f.child;w;){if(w===r){y=!0,r=f,i=c;break}if(w===i){y=!0,i=f,r=c;break}w=w.sibling}if(!y)throw Error(o(189))}}if(r.alternate!==i)throw Error(o(190))}if(r.tag!==3)throw Error(o(188));return r.stateNode.current===r?e:t}function v(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=v(e),t!==null)return t;e=e.sibling}return null}var x=Object.assign,b=Symbol.for("react.element"),j=Symbol.for("react.transitional.element"),E=Symbol.for("react.portal"),C=Symbol.for("react.fragment"),T=Symbol.for("react.strict_mode"),k=Symbol.for("react.profiler"),A=Symbol.for("react.consumer"),R=Symbol.for("react.context"),_=Symbol.for("react.forward_ref"),B=Symbol.for("react.suspense"),Y=Symbol.for("react.suspense_list"),D=Symbol.for("react.memo"),H=Symbol.for("react.lazy"),M=Symbol.for("react.activity"),z=Symbol.for("react.memo_cache_sentinel"),L=Symbol.iterator;function K(e){return e===null||typeof e!="object"?null:(e=L&&e[L]||e["@@iterator"],typeof e=="function"?e:null)}var ce=Symbol.for("react.client.reference");function se(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===ce?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case C:return"Fragment";case k:return"Profiler";case T:return"StrictMode";case B:return"Suspense";case Y:return"SuspenseList";case M:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case E:return"Portal";case R:return e.displayName||"Context";case A:return(e._context.displayName||"Context")+".Consumer";case _:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case D:return t=e.displayName||null,t!==null?t:se(e.type)||"Memo";case H:t=e._payload,e=e._init;try{return se(e(t))}catch{}}return null}var ye=Array.isArray,P=a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,oe=s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,J={pending:!1,data:null,method:null,action:null},$=[],ae=-1;function N(e){return{current:e}}function V(e){0>ae||(e.current=$[ae],$[ae]=null,ae--)}function ee(e,t){ae++,$[ae]=e.current,e.current=t}var le=N(null),de=N(null),me=N(null),xe=N(null);function ie(e,t){switch(ee(me,t),ee(de,e),ee(le,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?kg(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=kg(t),e=Mg(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}V(le),ee(le,e)}function W(){V(le),V(de),V(me)}function he(e){e.memoizedState!==null&&ee(xe,e);var t=le.current,r=Mg(t,e.type);t!==r&&(ee(de,e),ee(le,r))}function ne(e){de.current===e&&(V(le),V(de)),xe.current===e&&(V(xe),Qi._currentValue=J)}var ue,Ne;function Me(e){if(ue===void 0)try{throw Error()}catch(r){var t=r.stack.trim().match(/\n( *(at )?)/);ue=t&&t[1]||"",Ne=-1<r.stack.indexOf(`
    at`)?" (<anonymous>)":-1<r.stack.indexOf("@")?"@unknown:0:0":""}return`
`+ue+e+Ne}var De=!1;function Te(e,t){if(!e||De)return"";De=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(t){var re=function(){throw Error()};if(Object.defineProperty(re.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(re,[])}catch(Q){var X=Q}Reflect.construct(e,[],re)}else{try{re.call()}catch(Q){X=Q}e.call(re.prototype)}}else{try{throw Error()}catch(Q){X=Q}(re=e())&&typeof re.catch=="function"&&re.catch(function(){})}}catch(Q){if(Q&&X&&typeof Q.stack=="string")return[Q.stack,X.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var c=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");c&&c.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var f=i.DetermineComponentFrameRoot(),y=f[0],w=f[1];if(y&&w){var O=y.split(`
`),F=w.split(`
`);for(c=i=0;i<O.length&&!O[i].includes("DetermineComponentFrameRoot");)i++;for(;c<F.length&&!F[c].includes("DetermineComponentFrameRoot");)c++;if(i===O.length||c===F.length)for(i=O.length-1,c=F.length-1;1<=i&&0<=c&&O[i]!==F[c];)c--;for(;1<=i&&0<=c;i--,c--)if(O[i]!==F[c]){if(i!==1||c!==1)do if(i--,c--,0>c||O[i]!==F[c]){var I=`
`+O[i].replace(" at new "," at ");return e.displayName&&I.includes("<anonymous>")&&(I=I.replace("<anonymous>",e.displayName)),I}while(1<=i&&0<=c);break}}}finally{De=!1,Error.prepareStackTrace=r}return(r=e?e.displayName||e.name:"")?Me(r):""}function ct(e,t){switch(e.tag){case 26:case 27:case 5:return Me(e.type);case 16:return Me("Lazy");case 13:return e.child!==t&&t!==null?Me("Suspense Fallback"):Me("Suspense");case 19:return Me("SuspenseList");case 0:case 15:return Te(e.type,!1);case 11:return Te(e.type.render,!1);case 1:return Te(e.type,!0);case 31:return Me("Activity");default:return""}}function ks(e){try{var t="",r=null;do t+=ct(e,r),r=e,e=e.return;while(e);return t}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var Mr=Object.prototype.hasOwnProperty,ia=n.unstable_scheduleCallback,_e=n.unstable_cancelCallback,Jn=n.unstable_shouldYield,wt=n.unstable_requestPaint,nt=n.unstable_now,un=n.unstable_getCurrentPriorityLevel,Et=n.unstable_ImmediatePriority,oi=n.unstable_UserBlockingPriority,Rr=n.unstable_NormalPriority,Z=n.unstable_LowPriority,je=n.unstable_IdlePriority,Tt=n.log,Ms=n.unstable_setDisableYieldValue,Wn=null,Bt=null;function In(e){if(typeof Tt=="function"&&Ms(e),Bt&&typeof Bt.setStrictMode=="function")try{Bt.setStrictMode(Wn,e)}catch{}}var Lt=Math.clz32?Math.clz32:u1,o1=Math.log,c1=Math.LN2;function u1(e){return e>>>=0,e===0?32:31-(o1(e)/c1|0)|0}var Rs=256,Os=262144,zs=4194304;function Or(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function _s(e,t,r){var i=e.pendingLanes;if(i===0)return 0;var c=0,f=e.suspendedLanes,y=e.pingedLanes;e=e.warmLanes;var w=i&134217727;return w!==0?(i=w&~f,i!==0?c=Or(i):(y&=w,y!==0?c=Or(y):r||(r=w&~e,r!==0&&(c=Or(r))))):(w=i&~f,w!==0?c=Or(w):y!==0?c=Or(y):r||(r=i&~e,r!==0&&(c=Or(r)))),c===0?0:t!==0&&t!==c&&(t&f)===0&&(f=c&-c,r=t&-t,f>=r||f===32&&(r&4194048)!==0)?t:c}function ci(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function d1(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function dh(){var e=zs;return zs<<=1,(zs&62914560)===0&&(zs=4194304),e}function Go(e){for(var t=[],r=0;31>r;r++)t.push(e);return t}function ui(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function f1(e,t,r,i,c,f){var y=e.pendingLanes;e.pendingLanes=r,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=r,e.entangledLanes&=r,e.errorRecoveryDisabledLanes&=r,e.shellSuspendCounter=0;var w=e.entanglements,O=e.expirationTimes,F=e.hiddenUpdates;for(r=y&~r;0<r;){var I=31-Lt(r),re=1<<I;w[I]=0,O[I]=-1;var X=F[I];if(X!==null)for(F[I]=null,I=0;I<X.length;I++){var Q=X[I];Q!==null&&(Q.lane&=-536870913)}r&=~re}i!==0&&fh(e,i,0),f!==0&&c===0&&e.tag!==0&&(e.suspendedLanes|=f&~(y&~t))}function fh(e,t,r){e.pendingLanes|=t,e.suspendedLanes&=~t;var i=31-Lt(t);e.entangledLanes|=t,e.entanglements[i]=e.entanglements[i]|1073741824|r&261930}function hh(e,t){var r=e.entangledLanes|=t;for(e=e.entanglements;r;){var i=31-Lt(r),c=1<<i;c&t|e[i]&t&&(e[i]|=t),r&=~c}}function mh(e,t){var r=t&-t;return r=(r&42)!==0?1:Fo(r),(r&(e.suspendedLanes|t))!==0?0:r}function Fo(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function $o(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function ph(){var e=oe.p;return e!==0?e:(e=window.event,e===void 0?32:ey(e.type))}function gh(e,t){var r=oe.p;try{return oe.p=e,t()}finally{oe.p=r}}var er=Math.random().toString(36).slice(2),pt="__reactFiber$"+er,kt="__reactProps$"+er,sa="__reactContainer$"+er,Xo="__reactEvents$"+er,h1="__reactListeners$"+er,m1="__reactHandles$"+er,yh="__reactResources$"+er,di="__reactMarker$"+er;function Ko(e){delete e[pt],delete e[kt],delete e[Xo],delete e[h1],delete e[m1]}function la(e){var t=e[pt];if(t)return t;for(var r=e.parentNode;r;){if(t=r[sa]||r[pt]){if(r=t.alternate,t.child!==null||r!==null&&r.child!==null)for(e=Lg(e);e!==null;){if(r=e[pt])return r;e=Lg(e)}return t}e=r,r=e.parentNode}return null}function oa(e){if(e=e[pt]||e[sa]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function fi(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(o(33))}function ca(e){var t=e[yh];return t||(t=e[yh]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function ft(e){e[di]=!0}var vh=new Set,xh={};function zr(e,t){ua(e,t),ua(e+"Capture",t)}function ua(e,t){for(xh[e]=t,e=0;e<t.length;e++)vh.add(t[e])}var p1=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),bh={},Sh={};function g1(e){return Mr.call(Sh,e)?!0:Mr.call(bh,e)?!1:p1.test(e)?Sh[e]=!0:(bh[e]=!0,!1)}function Vs(e,t,r){if(g1(t))if(r===null)e.removeAttribute(t);else{switch(typeof r){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var i=t.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+r)}}function Bs(e,t,r){if(r===null)e.removeAttribute(t);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+r)}}function kn(e,t,r,i){if(i===null)e.removeAttribute(r);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(r);return}e.setAttributeNS(t,r,""+i)}}function Zt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function jh(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function y1(e,t,r){var i=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var c=i.get,f=i.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return c.call(this)},set:function(y){r=""+y,f.call(this,y)}}),Object.defineProperty(e,t,{enumerable:i.enumerable}),{getValue:function(){return r},setValue:function(y){r=""+y},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Zo(e){if(!e._valueTracker){var t=jh(e)?"checked":"value";e._valueTracker=y1(e,t,""+e[t])}}function wh(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var r=t.getValue(),i="";return e&&(i=jh(e)?e.checked?"true":"false":e.value),e=i,e!==r?(t.setValue(e),!0):!1}function Ls(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var v1=/[\n"\\]/g;function Qt(e){return e.replace(v1,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function Qo(e,t,r,i,c,f,y,w){e.name="",y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"?e.type=y:e.removeAttribute("type"),t!=null?y==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+Zt(t)):e.value!==""+Zt(t)&&(e.value=""+Zt(t)):y!=="submit"&&y!=="reset"||e.removeAttribute("value"),t!=null?Jo(e,y,Zt(t)):r!=null?Jo(e,y,Zt(r)):i!=null&&e.removeAttribute("value"),c==null&&f!=null&&(e.defaultChecked=!!f),c!=null&&(e.checked=c&&typeof c!="function"&&typeof c!="symbol"),w!=null&&typeof w!="function"&&typeof w!="symbol"&&typeof w!="boolean"?e.name=""+Zt(w):e.removeAttribute("name")}function Eh(e,t,r,i,c,f,y,w){if(f!=null&&typeof f!="function"&&typeof f!="symbol"&&typeof f!="boolean"&&(e.type=f),t!=null||r!=null){if(!(f!=="submit"&&f!=="reset"||t!=null)){Zo(e);return}r=r!=null?""+Zt(r):"",t=t!=null?""+Zt(t):r,w||t===e.value||(e.value=t),e.defaultValue=t}i=i??c,i=typeof i!="function"&&typeof i!="symbol"&&!!i,e.checked=w?e.checked:!!i,e.defaultChecked=!!i,y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"&&(e.name=y),Zo(e)}function Jo(e,t,r){t==="number"&&Ls(e.ownerDocument)===e||e.defaultValue===""+r||(e.defaultValue=""+r)}function da(e,t,r,i){if(e=e.options,t){t={};for(var c=0;c<r.length;c++)t["$"+r[c]]=!0;for(r=0;r<e.length;r++)c=t.hasOwnProperty("$"+e[r].value),e[r].selected!==c&&(e[r].selected=c),c&&i&&(e[r].defaultSelected=!0)}else{for(r=""+Zt(r),t=null,c=0;c<e.length;c++){if(e[c].value===r){e[c].selected=!0,i&&(e[c].defaultSelected=!0);return}t!==null||e[c].disabled||(t=e[c])}t!==null&&(t.selected=!0)}}function Th(e,t,r){if(t!=null&&(t=""+Zt(t),t!==e.value&&(e.value=t),r==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=r!=null?""+Zt(r):""}function Ch(e,t,r,i){if(t==null){if(i!=null){if(r!=null)throw Error(o(92));if(ye(i)){if(1<i.length)throw Error(o(93));i=i[0]}r=i}r==null&&(r=""),t=r}r=Zt(t),e.defaultValue=r,i=e.textContent,i===r&&i!==""&&i!==null&&(e.value=i),Zo(e)}function fa(e,t){if(t){var r=e.firstChild;if(r&&r===e.lastChild&&r.nodeType===3){r.nodeValue=t;return}}e.textContent=t}var x1=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Nh(e,t,r){var i=t.indexOf("--")===0;r==null||typeof r=="boolean"||r===""?i?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":i?e.setProperty(t,r):typeof r!="number"||r===0||x1.has(t)?t==="float"?e.cssFloat=r:e[t]=(""+r).trim():e[t]=r+"px"}function Dh(e,t,r){if(t!=null&&typeof t!="object")throw Error(o(62));if(e=e.style,r!=null){for(var i in r)!r.hasOwnProperty(i)||t!=null&&t.hasOwnProperty(i)||(i.indexOf("--")===0?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="");for(var c in t)i=t[c],t.hasOwnProperty(c)&&r[c]!==i&&Nh(e,c,i)}else for(var f in t)t.hasOwnProperty(f)&&Nh(e,f,t[f])}function Wo(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var b1=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),S1=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Us(e){return S1.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Mn(){}var Io=null;function ec(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ha=null,ma=null;function Ah(e){var t=oa(e);if(t&&(e=t.stateNode)){var r=e[kt]||null;e:switch(e=t.stateNode,t.type){case"input":if(Qo(e,r.value,r.defaultValue,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name),t=r.name,r.type==="radio"&&t!=null){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll('input[name="'+Qt(""+t)+'"][type="radio"]'),t=0;t<r.length;t++){var i=r[t];if(i!==e&&i.form===e.form){var c=i[kt]||null;if(!c)throw Error(o(90));Qo(i,c.value,c.defaultValue,c.defaultValue,c.checked,c.defaultChecked,c.type,c.name)}}for(t=0;t<r.length;t++)i=r[t],i.form===e.form&&wh(i)}break e;case"textarea":Th(e,r.value,r.defaultValue);break e;case"select":t=r.value,t!=null&&da(e,!!r.multiple,t,!1)}}}var tc=!1;function kh(e,t,r){if(tc)return e(t,r);tc=!0;try{var i=e(t);return i}finally{if(tc=!1,(ha!==null||ma!==null)&&(Cl(),ha&&(t=ha,e=ma,ma=ha=null,Ah(t),e)))for(t=0;t<e.length;t++)Ah(e[t])}}function hi(e,t){var r=e.stateNode;if(r===null)return null;var i=r[kt]||null;if(i===null)return null;r=i[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break e;default:e=!1}if(e)return null;if(r&&typeof r!="function")throw Error(o(231,t,typeof r));return r}var Rn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),nc=!1;if(Rn)try{var mi={};Object.defineProperty(mi,"passive",{get:function(){nc=!0}}),window.addEventListener("test",mi,mi),window.removeEventListener("test",mi,mi)}catch{nc=!1}var tr=null,rc=null,Hs=null;function Mh(){if(Hs)return Hs;var e,t=rc,r=t.length,i,c="value"in tr?tr.value:tr.textContent,f=c.length;for(e=0;e<r&&t[e]===c[e];e++);var y=r-e;for(i=1;i<=y&&t[r-i]===c[f-i];i++);return Hs=c.slice(e,1<i?1-i:void 0)}function qs(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Ys(){return!0}function Rh(){return!1}function Mt(e){function t(r,i,c,f,y){this._reactName=r,this._targetInst=c,this.type=i,this.nativeEvent=f,this.target=y,this.currentTarget=null;for(var w in e)e.hasOwnProperty(w)&&(r=e[w],this[w]=r?r(f):f[w]);return this.isDefaultPrevented=(f.defaultPrevented!=null?f.defaultPrevented:f.returnValue===!1)?Ys:Rh,this.isPropagationStopped=Rh,this}return x(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=Ys)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=Ys)},persist:function(){},isPersistent:Ys}),t}var _r={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ps=Mt(_r),pi=x({},_r,{view:0,detail:0}),j1=Mt(pi),ac,ic,gi,Gs=x({},pi,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:lc,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==gi&&(gi&&e.type==="mousemove"?(ac=e.screenX-gi.screenX,ic=e.screenY-gi.screenY):ic=ac=0,gi=e),ac)},movementY:function(e){return"movementY"in e?e.movementY:ic}}),Oh=Mt(Gs),w1=x({},Gs,{dataTransfer:0}),E1=Mt(w1),T1=x({},pi,{relatedTarget:0}),sc=Mt(T1),C1=x({},_r,{animationName:0,elapsedTime:0,pseudoElement:0}),N1=Mt(C1),D1=x({},_r,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),A1=Mt(D1),k1=x({},_r,{data:0}),zh=Mt(k1),M1={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},R1={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},O1={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function z1(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=O1[e])?!!t[e]:!1}function lc(){return z1}var _1=x({},pi,{key:function(e){if(e.key){var t=M1[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=qs(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?R1[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:lc,charCode:function(e){return e.type==="keypress"?qs(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?qs(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),V1=Mt(_1),B1=x({},Gs,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),_h=Mt(B1),L1=x({},pi,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:lc}),U1=Mt(L1),H1=x({},_r,{propertyName:0,elapsedTime:0,pseudoElement:0}),q1=Mt(H1),Y1=x({},Gs,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),P1=Mt(Y1),G1=x({},_r,{newState:0,oldState:0}),F1=Mt(G1),$1=[9,13,27,32],oc=Rn&&"CompositionEvent"in window,yi=null;Rn&&"documentMode"in document&&(yi=document.documentMode);var X1=Rn&&"TextEvent"in window&&!yi,Vh=Rn&&(!oc||yi&&8<yi&&11>=yi),Bh=" ",Lh=!1;function Uh(e,t){switch(e){case"keyup":return $1.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Hh(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var pa=!1;function K1(e,t){switch(e){case"compositionend":return Hh(t);case"keypress":return t.which!==32?null:(Lh=!0,Bh);case"textInput":return e=t.data,e===Bh&&Lh?null:e;default:return null}}function Z1(e,t){if(pa)return e==="compositionend"||!oc&&Uh(e,t)?(e=Mh(),Hs=rc=tr=null,pa=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Vh&&t.locale!=="ko"?null:t.data;default:return null}}var Q1={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function qh(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Q1[e.type]:t==="textarea"}function Yh(e,t,r,i){ha?ma?ma.push(i):ma=[i]:ha=i,t=Ol(t,"onChange"),0<t.length&&(r=new Ps("onChange","change",null,r,i),e.push({event:r,listeners:t}))}var vi=null,xi=null;function J1(e){Eg(e,0)}function Fs(e){var t=fi(e);if(wh(t))return e}function Ph(e,t){if(e==="change")return t}var Gh=!1;if(Rn){var cc;if(Rn){var uc="oninput"in document;if(!uc){var Fh=document.createElement("div");Fh.setAttribute("oninput","return;"),uc=typeof Fh.oninput=="function"}cc=uc}else cc=!1;Gh=cc&&(!document.documentMode||9<document.documentMode)}function $h(){vi&&(vi.detachEvent("onpropertychange",Xh),xi=vi=null)}function Xh(e){if(e.propertyName==="value"&&Fs(xi)){var t=[];Yh(t,xi,e,ec(e)),kh(J1,t)}}function W1(e,t,r){e==="focusin"?($h(),vi=t,xi=r,vi.attachEvent("onpropertychange",Xh)):e==="focusout"&&$h()}function I1(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Fs(xi)}function eS(e,t){if(e==="click")return Fs(t)}function tS(e,t){if(e==="input"||e==="change")return Fs(t)}function nS(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ut=typeof Object.is=="function"?Object.is:nS;function bi(e,t){if(Ut(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var r=Object.keys(e),i=Object.keys(t);if(r.length!==i.length)return!1;for(i=0;i<r.length;i++){var c=r[i];if(!Mr.call(t,c)||!Ut(e[c],t[c]))return!1}return!0}function Kh(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Zh(e,t){var r=Kh(e);e=0;for(var i;r;){if(r.nodeType===3){if(i=e+r.textContent.length,e<=t&&i>=t)return{node:r,offset:t-e};e=i}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=Kh(r)}}function Qh(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Qh(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Jh(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Ls(e.document);t instanceof e.HTMLIFrameElement;){try{var r=typeof t.contentWindow.location.href=="string"}catch{r=!1}if(r)e=t.contentWindow;else break;t=Ls(e.document)}return t}function dc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var rS=Rn&&"documentMode"in document&&11>=document.documentMode,ga=null,fc=null,Si=null,hc=!1;function Wh(e,t,r){var i=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;hc||ga==null||ga!==Ls(i)||(i=ga,"selectionStart"in i&&dc(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Si&&bi(Si,i)||(Si=i,i=Ol(fc,"onSelect"),0<i.length&&(t=new Ps("onSelect","select",null,t,r),e.push({event:t,listeners:i}),t.target=ga)))}function Vr(e,t){var r={};return r[e.toLowerCase()]=t.toLowerCase(),r["Webkit"+e]="webkit"+t,r["Moz"+e]="moz"+t,r}var ya={animationend:Vr("Animation","AnimationEnd"),animationiteration:Vr("Animation","AnimationIteration"),animationstart:Vr("Animation","AnimationStart"),transitionrun:Vr("Transition","TransitionRun"),transitionstart:Vr("Transition","TransitionStart"),transitioncancel:Vr("Transition","TransitionCancel"),transitionend:Vr("Transition","TransitionEnd")},mc={},Ih={};Rn&&(Ih=document.createElement("div").style,"AnimationEvent"in window||(delete ya.animationend.animation,delete ya.animationiteration.animation,delete ya.animationstart.animation),"TransitionEvent"in window||delete ya.transitionend.transition);function Br(e){if(mc[e])return mc[e];if(!ya[e])return e;var t=ya[e],r;for(r in t)if(t.hasOwnProperty(r)&&r in Ih)return mc[e]=t[r];return e}var em=Br("animationend"),tm=Br("animationiteration"),nm=Br("animationstart"),aS=Br("transitionrun"),iS=Br("transitionstart"),sS=Br("transitioncancel"),rm=Br("transitionend"),am=new Map,pc="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");pc.push("scrollEnd");function dn(e,t){am.set(e,t),zr(t,[e])}var $s=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Jt=[],va=0,gc=0;function Xs(){for(var e=va,t=gc=va=0;t<e;){var r=Jt[t];Jt[t++]=null;var i=Jt[t];Jt[t++]=null;var c=Jt[t];Jt[t++]=null;var f=Jt[t];if(Jt[t++]=null,i!==null&&c!==null){var y=i.pending;y===null?c.next=c:(c.next=y.next,y.next=c),i.pending=c}f!==0&&im(r,c,f)}}function Ks(e,t,r,i){Jt[va++]=e,Jt[va++]=t,Jt[va++]=r,Jt[va++]=i,gc|=i,e.lanes|=i,e=e.alternate,e!==null&&(e.lanes|=i)}function yc(e,t,r,i){return Ks(e,t,r,i),Zs(e)}function Lr(e,t){return Ks(e,null,null,t),Zs(e)}function im(e,t,r){e.lanes|=r;var i=e.alternate;i!==null&&(i.lanes|=r);for(var c=!1,f=e.return;f!==null;)f.childLanes|=r,i=f.alternate,i!==null&&(i.childLanes|=r),f.tag===22&&(e=f.stateNode,e===null||e._visibility&1||(c=!0)),e=f,f=f.return;return e.tag===3?(f=e.stateNode,c&&t!==null&&(c=31-Lt(r),e=f.hiddenUpdates,i=e[c],i===null?e[c]=[t]:i.push(t),t.lane=r|536870912),f):null}function Zs(e){if(50<Pi)throw Pi=0,Cu=null,Error(o(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var xa={};function lS(e,t,r,i){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ht(e,t,r,i){return new lS(e,t,r,i)}function vc(e){return e=e.prototype,!(!e||!e.isReactComponent)}function On(e,t){var r=e.alternate;return r===null?(r=Ht(e.tag,t,e.key,e.mode),r.elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=e.flags&65011712,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,t=e.dependencies,r.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r.refCleanup=e.refCleanup,r}function sm(e,t){e.flags&=65011714;var r=e.alternate;return r===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=r.childLanes,e.lanes=r.lanes,e.child=r.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=r.memoizedProps,e.memoizedState=r.memoizedState,e.updateQueue=r.updateQueue,e.type=r.type,t=r.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Qs(e,t,r,i,c,f){var y=0;if(i=e,typeof e=="function")vc(e)&&(y=1);else if(typeof e=="string")y=fj(e,r,le.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case M:return e=Ht(31,r,t,c),e.elementType=M,e.lanes=f,e;case C:return Ur(r.children,c,f,t);case T:y=8,c|=24;break;case k:return e=Ht(12,r,t,c|2),e.elementType=k,e.lanes=f,e;case B:return e=Ht(13,r,t,c),e.elementType=B,e.lanes=f,e;case Y:return e=Ht(19,r,t,c),e.elementType=Y,e.lanes=f,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case R:y=10;break e;case A:y=9;break e;case _:y=11;break e;case D:y=14;break e;case H:y=16,i=null;break e}y=29,r=Error(o(130,e===null?"null":typeof e,"")),i=null}return t=Ht(y,r,t,c),t.elementType=e,t.type=i,t.lanes=f,t}function Ur(e,t,r,i){return e=Ht(7,e,i,t),e.lanes=r,e}function xc(e,t,r){return e=Ht(6,e,null,t),e.lanes=r,e}function lm(e){var t=Ht(18,null,null,0);return t.stateNode=e,t}function bc(e,t,r){return t=Ht(4,e.children!==null?e.children:[],e.key,t),t.lanes=r,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var om=new WeakMap;function Wt(e,t){if(typeof e=="object"&&e!==null){var r=om.get(e);return r!==void 0?r:(t={value:e,source:t,stack:ks(t)},om.set(e,t),t)}return{value:e,source:t,stack:ks(t)}}var ba=[],Sa=0,Js=null,ji=0,It=[],en=0,nr=null,xn=1,bn="";function zn(e,t){ba[Sa++]=ji,ba[Sa++]=Js,Js=e,ji=t}function cm(e,t,r){It[en++]=xn,It[en++]=bn,It[en++]=nr,nr=e;var i=xn;e=bn;var c=32-Lt(i)-1;i&=~(1<<c),r+=1;var f=32-Lt(t)+c;if(30<f){var y=c-c%5;f=(i&(1<<y)-1).toString(32),i>>=y,c-=y,xn=1<<32-Lt(t)+c|r<<c|i,bn=f+e}else xn=1<<f|r<<c|i,bn=e}function Sc(e){e.return!==null&&(zn(e,1),cm(e,1,0))}function jc(e){for(;e===Js;)Js=ba[--Sa],ba[Sa]=null,ji=ba[--Sa],ba[Sa]=null;for(;e===nr;)nr=It[--en],It[en]=null,bn=It[--en],It[en]=null,xn=It[--en],It[en]=null}function um(e,t){It[en++]=xn,It[en++]=bn,It[en++]=nr,xn=t.id,bn=t.overflow,nr=e}var gt=null,Ke=null,ze=!1,rr=null,tn=!1,wc=Error(o(519));function ar(e){var t=Error(o(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw wi(Wt(t,e)),wc}function dm(e){var t=e.stateNode,r=e.type,i=e.memoizedProps;switch(t[pt]=e,t[kt]=i,r){case"dialog":ke("cancel",t),ke("close",t);break;case"iframe":case"object":case"embed":ke("load",t);break;case"video":case"audio":for(r=0;r<Fi.length;r++)ke(Fi[r],t);break;case"source":ke("error",t);break;case"img":case"image":case"link":ke("error",t),ke("load",t);break;case"details":ke("toggle",t);break;case"input":ke("invalid",t),Eh(t,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":ke("invalid",t);break;case"textarea":ke("invalid",t),Ch(t,i.value,i.defaultValue,i.children)}r=i.children,typeof r!="string"&&typeof r!="number"&&typeof r!="bigint"||t.textContent===""+r||i.suppressHydrationWarning===!0||Dg(t.textContent,r)?(i.popover!=null&&(ke("beforetoggle",t),ke("toggle",t)),i.onScroll!=null&&ke("scroll",t),i.onScrollEnd!=null&&ke("scrollend",t),i.onClick!=null&&(t.onclick=Mn),t=!0):t=!1,t||ar(e,!0)}function fm(e){for(gt=e.return;gt;)switch(gt.tag){case 5:case 31:case 13:tn=!1;return;case 27:case 3:tn=!0;return;default:gt=gt.return}}function ja(e){if(e!==gt)return!1;if(!ze)return fm(e),ze=!0,!1;var t=e.tag,r;if((r=t!==3&&t!==27)&&((r=t===5)&&(r=e.type,r=!(r!=="form"&&r!=="button")||qu(e.type,e.memoizedProps)),r=!r),r&&Ke&&ar(e),fm(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(o(317));Ke=Bg(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(o(317));Ke=Bg(e)}else t===27?(t=Ke,vr(e.type)?(e=$u,$u=null,Ke=e):Ke=t):Ke=gt?rn(e.stateNode.nextSibling):null;return!0}function Hr(){Ke=gt=null,ze=!1}function Ec(){var e=rr;return e!==null&&(_t===null?_t=e:_t.push.apply(_t,e),rr=null),e}function wi(e){rr===null?rr=[e]:rr.push(e)}var Tc=N(null),qr=null,_n=null;function ir(e,t,r){ee(Tc,t._currentValue),t._currentValue=r}function Vn(e){e._currentValue=Tc.current,V(Tc)}function Cc(e,t,r){for(;e!==null;){var i=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,i!==null&&(i.childLanes|=t)):i!==null&&(i.childLanes&t)!==t&&(i.childLanes|=t),e===r)break;e=e.return}}function Nc(e,t,r,i){var c=e.child;for(c!==null&&(c.return=e);c!==null;){var f=c.dependencies;if(f!==null){var y=c.child;f=f.firstContext;e:for(;f!==null;){var w=f;f=c;for(var O=0;O<t.length;O++)if(w.context===t[O]){f.lanes|=r,w=f.alternate,w!==null&&(w.lanes|=r),Cc(f.return,r,e),i||(y=null);break e}f=w.next}}else if(c.tag===18){if(y=c.return,y===null)throw Error(o(341));y.lanes|=r,f=y.alternate,f!==null&&(f.lanes|=r),Cc(y,r,e),y=null}else y=c.child;if(y!==null)y.return=c;else for(y=c;y!==null;){if(y===e){y=null;break}if(c=y.sibling,c!==null){c.return=y.return,y=c;break}y=y.return}c=y}}function wa(e,t,r,i){e=null;for(var c=t,f=!1;c!==null;){if(!f){if((c.flags&524288)!==0)f=!0;else if((c.flags&262144)!==0)break}if(c.tag===10){var y=c.alternate;if(y===null)throw Error(o(387));if(y=y.memoizedProps,y!==null){var w=c.type;Ut(c.pendingProps.value,y.value)||(e!==null?e.push(w):e=[w])}}else if(c===xe.current){if(y=c.alternate,y===null)throw Error(o(387));y.memoizedState.memoizedState!==c.memoizedState.memoizedState&&(e!==null?e.push(Qi):e=[Qi])}c=c.return}e!==null&&Nc(t,e,r,i),t.flags|=262144}function Ws(e){for(e=e.firstContext;e!==null;){if(!Ut(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Yr(e){qr=e,_n=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function yt(e){return hm(qr,e)}function Is(e,t){return qr===null&&Yr(e),hm(e,t)}function hm(e,t){var r=t._currentValue;if(t={context:t,memoizedValue:r,next:null},_n===null){if(e===null)throw Error(o(308));_n=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else _n=_n.next=t;return r}var oS=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(r,i){e.push(i)}};this.abort=function(){t.aborted=!0,e.forEach(function(r){return r()})}},cS=n.unstable_scheduleCallback,uS=n.unstable_NormalPriority,rt={$$typeof:R,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Dc(){return{controller:new oS,data:new Map,refCount:0}}function Ei(e){e.refCount--,e.refCount===0&&cS(uS,function(){e.controller.abort()})}var Ti=null,Ac=0,Ea=0,Ta=null;function dS(e,t){if(Ti===null){var r=Ti=[];Ac=0,Ea=Ru(),Ta={status:"pending",value:void 0,then:function(i){r.push(i)}}}return Ac++,t.then(mm,mm),t}function mm(){if(--Ac===0&&Ti!==null){Ta!==null&&(Ta.status="fulfilled");var e=Ti;Ti=null,Ea=0,Ta=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function fS(e,t){var r=[],i={status:"pending",value:null,reason:null,then:function(c){r.push(c)}};return e.then(function(){i.status="fulfilled",i.value=t;for(var c=0;c<r.length;c++)(0,r[c])(t)},function(c){for(i.status="rejected",i.reason=c,c=0;c<r.length;c++)(0,r[c])(void 0)}),i}var pm=P.S;P.S=function(e,t){Wp=nt(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&dS(e,t),pm!==null&&pm(e,t)};var Pr=N(null);function kc(){var e=Pr.current;return e!==null?e:Ge.pooledCache}function el(e,t){t===null?ee(Pr,Pr.current):ee(Pr,t.pool)}function gm(){var e=kc();return e===null?null:{parent:rt._currentValue,pool:e}}var Ca=Error(o(460)),Mc=Error(o(474)),tl=Error(o(542)),nl={then:function(){}};function ym(e){return e=e.status,e==="fulfilled"||e==="rejected"}function vm(e,t,r){switch(r=e[r],r===void 0?e.push(t):r!==t&&(t.then(Mn,Mn),t=r),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,bm(e),e;default:if(typeof t.status=="string")t.then(Mn,Mn);else{if(e=Ge,e!==null&&100<e.shellSuspendCounter)throw Error(o(482));e=t,e.status="pending",e.then(function(i){if(t.status==="pending"){var c=t;c.status="fulfilled",c.value=i}},function(i){if(t.status==="pending"){var c=t;c.status="rejected",c.reason=i}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,bm(e),e}throw Fr=t,Ca}}function Gr(e){try{var t=e._init;return t(e._payload)}catch(r){throw r!==null&&typeof r=="object"&&typeof r.then=="function"?(Fr=r,Ca):r}}var Fr=null;function xm(){if(Fr===null)throw Error(o(459));var e=Fr;return Fr=null,e}function bm(e){if(e===Ca||e===tl)throw Error(o(483))}var Na=null,Ci=0;function rl(e){var t=Ci;return Ci+=1,Na===null&&(Na=[]),vm(Na,e,t)}function Ni(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function al(e,t){throw t.$$typeof===b?Error(o(525)):(e=Object.prototype.toString.call(t),Error(o(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function Sm(e){function t(q,U){if(e){var G=q.deletions;G===null?(q.deletions=[U],q.flags|=16):G.push(U)}}function r(q,U){if(!e)return null;for(;U!==null;)t(q,U),U=U.sibling;return null}function i(q){for(var U=new Map;q!==null;)q.key!==null?U.set(q.key,q):U.set(q.index,q),q=q.sibling;return U}function c(q,U){return q=On(q,U),q.index=0,q.sibling=null,q}function f(q,U,G){return q.index=G,e?(G=q.alternate,G!==null?(G=G.index,G<U?(q.flags|=67108866,U):G):(q.flags|=67108866,U)):(q.flags|=1048576,U)}function y(q){return e&&q.alternate===null&&(q.flags|=67108866),q}function w(q,U,G,te){return U===null||U.tag!==6?(U=xc(G,q.mode,te),U.return=q,U):(U=c(U,G),U.return=q,U)}function O(q,U,G,te){var be=G.type;return be===C?I(q,U,G.props.children,te,G.key):U!==null&&(U.elementType===be||typeof be=="object"&&be!==null&&be.$$typeof===H&&Gr(be)===U.type)?(U=c(U,G.props),Ni(U,G),U.return=q,U):(U=Qs(G.type,G.key,G.props,null,q.mode,te),Ni(U,G),U.return=q,U)}function F(q,U,G,te){return U===null||U.tag!==4||U.stateNode.containerInfo!==G.containerInfo||U.stateNode.implementation!==G.implementation?(U=bc(G,q.mode,te),U.return=q,U):(U=c(U,G.children||[]),U.return=q,U)}function I(q,U,G,te,be){return U===null||U.tag!==7?(U=Ur(G,q.mode,te,be),U.return=q,U):(U=c(U,G),U.return=q,U)}function re(q,U,G){if(typeof U=="string"&&U!==""||typeof U=="number"||typeof U=="bigint")return U=xc(""+U,q.mode,G),U.return=q,U;if(typeof U=="object"&&U!==null){switch(U.$$typeof){case j:return G=Qs(U.type,U.key,U.props,null,q.mode,G),Ni(G,U),G.return=q,G;case E:return U=bc(U,q.mode,G),U.return=q,U;case H:return U=Gr(U),re(q,U,G)}if(ye(U)||K(U))return U=Ur(U,q.mode,G,null),U.return=q,U;if(typeof U.then=="function")return re(q,rl(U),G);if(U.$$typeof===R)return re(q,Is(q,U),G);al(q,U)}return null}function X(q,U,G,te){var be=U!==null?U.key:null;if(typeof G=="string"&&G!==""||typeof G=="number"||typeof G=="bigint")return be!==null?null:w(q,U,""+G,te);if(typeof G=="object"&&G!==null){switch(G.$$typeof){case j:return G.key===be?O(q,U,G,te):null;case E:return G.key===be?F(q,U,G,te):null;case H:return G=Gr(G),X(q,U,G,te)}if(ye(G)||K(G))return be!==null?null:I(q,U,G,te,null);if(typeof G.then=="function")return X(q,U,rl(G),te);if(G.$$typeof===R)return X(q,U,Is(q,G),te);al(q,G)}return null}function Q(q,U,G,te,be){if(typeof te=="string"&&te!==""||typeof te=="number"||typeof te=="bigint")return q=q.get(G)||null,w(U,q,""+te,be);if(typeof te=="object"&&te!==null){switch(te.$$typeof){case j:return q=q.get(te.key===null?G:te.key)||null,O(U,q,te,be);case E:return q=q.get(te.key===null?G:te.key)||null,F(U,q,te,be);case H:return te=Gr(te),Q(q,U,G,te,be)}if(ye(te)||K(te))return q=q.get(G)||null,I(U,q,te,be,null);if(typeof te.then=="function")return Q(q,U,G,rl(te),be);if(te.$$typeof===R)return Q(q,U,G,Is(U,te),be);al(U,te)}return null}function pe(q,U,G,te){for(var be=null,Ve=null,ve=U,Ce=U=0,Oe=null;ve!==null&&Ce<G.length;Ce++){ve.index>Ce?(Oe=ve,ve=null):Oe=ve.sibling;var Be=X(q,ve,G[Ce],te);if(Be===null){ve===null&&(ve=Oe);break}e&&ve&&Be.alternate===null&&t(q,ve),U=f(Be,U,Ce),Ve===null?be=Be:Ve.sibling=Be,Ve=Be,ve=Oe}if(Ce===G.length)return r(q,ve),ze&&zn(q,Ce),be;if(ve===null){for(;Ce<G.length;Ce++)ve=re(q,G[Ce],te),ve!==null&&(U=f(ve,U,Ce),Ve===null?be=ve:Ve.sibling=ve,Ve=ve);return ze&&zn(q,Ce),be}for(ve=i(ve);Ce<G.length;Ce++)Oe=Q(ve,q,Ce,G[Ce],te),Oe!==null&&(e&&Oe.alternate!==null&&ve.delete(Oe.key===null?Ce:Oe.key),U=f(Oe,U,Ce),Ve===null?be=Oe:Ve.sibling=Oe,Ve=Oe);return e&&ve.forEach(function(wr){return t(q,wr)}),ze&&zn(q,Ce),be}function Se(q,U,G,te){if(G==null)throw Error(o(151));for(var be=null,Ve=null,ve=U,Ce=U=0,Oe=null,Be=G.next();ve!==null&&!Be.done;Ce++,Be=G.next()){ve.index>Ce?(Oe=ve,ve=null):Oe=ve.sibling;var wr=X(q,ve,Be.value,te);if(wr===null){ve===null&&(ve=Oe);break}e&&ve&&wr.alternate===null&&t(q,ve),U=f(wr,U,Ce),Ve===null?be=wr:Ve.sibling=wr,Ve=wr,ve=Oe}if(Be.done)return r(q,ve),ze&&zn(q,Ce),be;if(ve===null){for(;!Be.done;Ce++,Be=G.next())Be=re(q,Be.value,te),Be!==null&&(U=f(Be,U,Ce),Ve===null?be=Be:Ve.sibling=Be,Ve=Be);return ze&&zn(q,Ce),be}for(ve=i(ve);!Be.done;Ce++,Be=G.next())Be=Q(ve,q,Ce,Be.value,te),Be!==null&&(e&&Be.alternate!==null&&ve.delete(Be.key===null?Ce:Be.key),U=f(Be,U,Ce),Ve===null?be=Be:Ve.sibling=Be,Ve=Be);return e&&ve.forEach(function(wj){return t(q,wj)}),ze&&zn(q,Ce),be}function Pe(q,U,G,te){if(typeof G=="object"&&G!==null&&G.type===C&&G.key===null&&(G=G.props.children),typeof G=="object"&&G!==null){switch(G.$$typeof){case j:e:{for(var be=G.key;U!==null;){if(U.key===be){if(be=G.type,be===C){if(U.tag===7){r(q,U.sibling),te=c(U,G.props.children),te.return=q,q=te;break e}}else if(U.elementType===be||typeof be=="object"&&be!==null&&be.$$typeof===H&&Gr(be)===U.type){r(q,U.sibling),te=c(U,G.props),Ni(te,G),te.return=q,q=te;break e}r(q,U);break}else t(q,U);U=U.sibling}G.type===C?(te=Ur(G.props.children,q.mode,te,G.key),te.return=q,q=te):(te=Qs(G.type,G.key,G.props,null,q.mode,te),Ni(te,G),te.return=q,q=te)}return y(q);case E:e:{for(be=G.key;U!==null;){if(U.key===be)if(U.tag===4&&U.stateNode.containerInfo===G.containerInfo&&U.stateNode.implementation===G.implementation){r(q,U.sibling),te=c(U,G.children||[]),te.return=q,q=te;break e}else{r(q,U);break}else t(q,U);U=U.sibling}te=bc(G,q.mode,te),te.return=q,q=te}return y(q);case H:return G=Gr(G),Pe(q,U,G,te)}if(ye(G))return pe(q,U,G,te);if(K(G)){if(be=K(G),typeof be!="function")throw Error(o(150));return G=be.call(G),Se(q,U,G,te)}if(typeof G.then=="function")return Pe(q,U,rl(G),te);if(G.$$typeof===R)return Pe(q,U,Is(q,G),te);al(q,G)}return typeof G=="string"&&G!==""||typeof G=="number"||typeof G=="bigint"?(G=""+G,U!==null&&U.tag===6?(r(q,U.sibling),te=c(U,G),te.return=q,q=te):(r(q,U),te=xc(G,q.mode,te),te.return=q,q=te),y(q)):r(q,U)}return function(q,U,G,te){try{Ci=0;var be=Pe(q,U,G,te);return Na=null,be}catch(ve){if(ve===Ca||ve===tl)throw ve;var Ve=Ht(29,ve,null,q.mode);return Ve.lanes=te,Ve.return=q,Ve}finally{}}}var $r=Sm(!0),jm=Sm(!1),sr=!1;function Rc(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Oc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function lr(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function or(e,t,r){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,(Le&2)!==0){var c=i.pending;return c===null?t.next=t:(t.next=c.next,c.next=t),i.pending=t,t=Zs(e),im(e,null,r),t}return Ks(e,i,t,r),Zs(e)}function Di(e,t,r){if(t=t.updateQueue,t!==null&&(t=t.shared,(r&4194048)!==0)){var i=t.lanes;i&=e.pendingLanes,r|=i,t.lanes=r,hh(e,r)}}function zc(e,t){var r=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,r===i)){var c=null,f=null;if(r=r.firstBaseUpdate,r!==null){do{var y={lane:r.lane,tag:r.tag,payload:r.payload,callback:null,next:null};f===null?c=f=y:f=f.next=y,r=r.next}while(r!==null);f===null?c=f=t:f=f.next=t}else c=f=t;r={baseState:i.baseState,firstBaseUpdate:c,lastBaseUpdate:f,shared:i.shared,callbacks:i.callbacks},e.updateQueue=r;return}e=r.lastBaseUpdate,e===null?r.firstBaseUpdate=t:e.next=t,r.lastBaseUpdate=t}var _c=!1;function Ai(){if(_c){var e=Ta;if(e!==null)throw e}}function ki(e,t,r,i){_c=!1;var c=e.updateQueue;sr=!1;var f=c.firstBaseUpdate,y=c.lastBaseUpdate,w=c.shared.pending;if(w!==null){c.shared.pending=null;var O=w,F=O.next;O.next=null,y===null?f=F:y.next=F,y=O;var I=e.alternate;I!==null&&(I=I.updateQueue,w=I.lastBaseUpdate,w!==y&&(w===null?I.firstBaseUpdate=F:w.next=F,I.lastBaseUpdate=O))}if(f!==null){var re=c.baseState;y=0,I=F=O=null,w=f;do{var X=w.lane&-536870913,Q=X!==w.lane;if(Q?(Re&X)===X:(i&X)===X){X!==0&&X===Ea&&(_c=!0),I!==null&&(I=I.next={lane:0,tag:w.tag,payload:w.payload,callback:null,next:null});e:{var pe=e,Se=w;X=t;var Pe=r;switch(Se.tag){case 1:if(pe=Se.payload,typeof pe=="function"){re=pe.call(Pe,re,X);break e}re=pe;break e;case 3:pe.flags=pe.flags&-65537|128;case 0:if(pe=Se.payload,X=typeof pe=="function"?pe.call(Pe,re,X):pe,X==null)break e;re=x({},re,X);break e;case 2:sr=!0}}X=w.callback,X!==null&&(e.flags|=64,Q&&(e.flags|=8192),Q=c.callbacks,Q===null?c.callbacks=[X]:Q.push(X))}else Q={lane:X,tag:w.tag,payload:w.payload,callback:w.callback,next:null},I===null?(F=I=Q,O=re):I=I.next=Q,y|=X;if(w=w.next,w===null){if(w=c.shared.pending,w===null)break;Q=w,w=Q.next,Q.next=null,c.lastBaseUpdate=Q,c.shared.pending=null}}while(!0);I===null&&(O=re),c.baseState=O,c.firstBaseUpdate=F,c.lastBaseUpdate=I,f===null&&(c.shared.lanes=0),hr|=y,e.lanes=y,e.memoizedState=re}}function wm(e,t){if(typeof e!="function")throw Error(o(191,e));e.call(t)}function Em(e,t){var r=e.callbacks;if(r!==null)for(e.callbacks=null,e=0;e<r.length;e++)wm(r[e],t)}var Da=N(null),il=N(0);function Tm(e,t){e=Fn,ee(il,e),ee(Da,t),Fn=e|t.baseLanes}function Vc(){ee(il,Fn),ee(Da,Da.current)}function Bc(){Fn=il.current,V(Da),V(il)}var qt=N(null),nn=null;function cr(e){var t=e.alternate;ee(et,et.current&1),ee(qt,e),nn===null&&(t===null||Da.current!==null||t.memoizedState!==null)&&(nn=e)}function Lc(e){ee(et,et.current),ee(qt,e),nn===null&&(nn=e)}function Cm(e){e.tag===22?(ee(et,et.current),ee(qt,e),nn===null&&(nn=e)):ur()}function ur(){ee(et,et.current),ee(qt,qt.current)}function Yt(e){V(qt),nn===e&&(nn=null),V(et)}var et=N(0);function sl(e){for(var t=e;t!==null;){if(t.tag===13){var r=t.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||Gu(r)||Fu(r)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Bn=0,Ee=null,qe=null,at=null,ll=!1,Aa=!1,Xr=!1,ol=0,Mi=0,ka=null,hS=0;function Je(){throw Error(o(321))}function Uc(e,t){if(t===null)return!1;for(var r=0;r<t.length&&r<e.length;r++)if(!Ut(e[r],t[r]))return!1;return!0}function Hc(e,t,r,i,c,f){return Bn=f,Ee=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,P.H=e===null||e.memoizedState===null?cp:tu,Xr=!1,f=r(i,c),Xr=!1,Aa&&(f=Dm(t,r,i,c)),Nm(e),f}function Nm(e){P.H=zi;var t=qe!==null&&qe.next!==null;if(Bn=0,at=qe=Ee=null,ll=!1,Mi=0,ka=null,t)throw Error(o(300));e===null||it||(e=e.dependencies,e!==null&&Ws(e)&&(it=!0))}function Dm(e,t,r,i){Ee=e;var c=0;do{if(Aa&&(ka=null),Mi=0,Aa=!1,25<=c)throw Error(o(301));if(c+=1,at=qe=null,e.updateQueue!=null){var f=e.updateQueue;f.lastEffect=null,f.events=null,f.stores=null,f.memoCache!=null&&(f.memoCache.index=0)}P.H=up,f=t(r,i)}while(Aa);return f}function mS(){var e=P.H,t=e.useState()[0];return t=typeof t.then=="function"?Ri(t):t,e=e.useState()[0],(qe!==null?qe.memoizedState:null)!==e&&(Ee.flags|=1024),t}function qc(){var e=ol!==0;return ol=0,e}function Yc(e,t,r){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~r}function Pc(e){if(ll){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}ll=!1}Bn=0,at=qe=Ee=null,Aa=!1,Mi=ol=0,ka=null}function Ct(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return at===null?Ee.memoizedState=at=e:at=at.next=e,at}function tt(){if(qe===null){var e=Ee.alternate;e=e!==null?e.memoizedState:null}else e=qe.next;var t=at===null?Ee.memoizedState:at.next;if(t!==null)at=t,qe=e;else{if(e===null)throw Ee.alternate===null?Error(o(467)):Error(o(310));qe=e,e={memoizedState:qe.memoizedState,baseState:qe.baseState,baseQueue:qe.baseQueue,queue:qe.queue,next:null},at===null?Ee.memoizedState=at=e:at=at.next=e}return at}function cl(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Ri(e){var t=Mi;return Mi+=1,ka===null&&(ka=[]),e=vm(ka,e,t),t=Ee,(at===null?t.memoizedState:at.next)===null&&(t=t.alternate,P.H=t===null||t.memoizedState===null?cp:tu),e}function ul(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Ri(e);if(e.$$typeof===R)return yt(e)}throw Error(o(438,String(e)))}function Gc(e){var t=null,r=Ee.updateQueue;if(r!==null&&(t=r.memoCache),t==null){var i=Ee.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(t={data:i.data.map(function(c){return c.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),r===null&&(r=cl(),Ee.updateQueue=r),r.memoCache=t,r=t.data[t.index],r===void 0)for(r=t.data[t.index]=Array(e),i=0;i<e;i++)r[i]=z;return t.index++,r}function Ln(e,t){return typeof t=="function"?t(e):t}function dl(e){var t=tt();return Fc(t,qe,e)}function Fc(e,t,r){var i=e.queue;if(i===null)throw Error(o(311));i.lastRenderedReducer=r;var c=e.baseQueue,f=i.pending;if(f!==null){if(c!==null){var y=c.next;c.next=f.next,f.next=y}t.baseQueue=c=f,i.pending=null}if(f=e.baseState,c===null)e.memoizedState=f;else{t=c.next;var w=y=null,O=null,F=t,I=!1;do{var re=F.lane&-536870913;if(re!==F.lane?(Re&re)===re:(Bn&re)===re){var X=F.revertLane;if(X===0)O!==null&&(O=O.next={lane:0,revertLane:0,gesture:null,action:F.action,hasEagerState:F.hasEagerState,eagerState:F.eagerState,next:null}),re===Ea&&(I=!0);else if((Bn&X)===X){F=F.next,X===Ea&&(I=!0);continue}else re={lane:0,revertLane:F.revertLane,gesture:null,action:F.action,hasEagerState:F.hasEagerState,eagerState:F.eagerState,next:null},O===null?(w=O=re,y=f):O=O.next=re,Ee.lanes|=X,hr|=X;re=F.action,Xr&&r(f,re),f=F.hasEagerState?F.eagerState:r(f,re)}else X={lane:re,revertLane:F.revertLane,gesture:F.gesture,action:F.action,hasEagerState:F.hasEagerState,eagerState:F.eagerState,next:null},O===null?(w=O=X,y=f):O=O.next=X,Ee.lanes|=re,hr|=re;F=F.next}while(F!==null&&F!==t);if(O===null?y=f:O.next=w,!Ut(f,e.memoizedState)&&(it=!0,I&&(r=Ta,r!==null)))throw r;e.memoizedState=f,e.baseState=y,e.baseQueue=O,i.lastRenderedState=f}return c===null&&(i.lanes=0),[e.memoizedState,i.dispatch]}function $c(e){var t=tt(),r=t.queue;if(r===null)throw Error(o(311));r.lastRenderedReducer=e;var i=r.dispatch,c=r.pending,f=t.memoizedState;if(c!==null){r.pending=null;var y=c=c.next;do f=e(f,y.action),y=y.next;while(y!==c);Ut(f,t.memoizedState)||(it=!0),t.memoizedState=f,t.baseQueue===null&&(t.baseState=f),r.lastRenderedState=f}return[f,i]}function Am(e,t,r){var i=Ee,c=tt(),f=ze;if(f){if(r===void 0)throw Error(o(407));r=r()}else r=t();var y=!Ut((qe||c).memoizedState,r);if(y&&(c.memoizedState=r,it=!0),c=c.queue,Zc(Rm.bind(null,i,c,e),[e]),c.getSnapshot!==t||y||at!==null&&at.memoizedState.tag&1){if(i.flags|=2048,Ma(9,{destroy:void 0},Mm.bind(null,i,c,r,t),null),Ge===null)throw Error(o(349));f||(Bn&127)!==0||km(i,t,r)}return r}function km(e,t,r){e.flags|=16384,e={getSnapshot:t,value:r},t=Ee.updateQueue,t===null?(t=cl(),Ee.updateQueue=t,t.stores=[e]):(r=t.stores,r===null?t.stores=[e]:r.push(e))}function Mm(e,t,r,i){t.value=r,t.getSnapshot=i,Om(t)&&zm(e)}function Rm(e,t,r){return r(function(){Om(t)&&zm(e)})}function Om(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!Ut(e,r)}catch{return!0}}function zm(e){var t=Lr(e,2);t!==null&&Vt(t,e,2)}function Xc(e){var t=Ct();if(typeof e=="function"){var r=e;if(e=r(),Xr){In(!0);try{r()}finally{In(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ln,lastRenderedState:e},t}function _m(e,t,r,i){return e.baseState=r,Fc(e,qe,typeof i=="function"?i:Ln)}function pS(e,t,r,i,c){if(ml(e))throw Error(o(485));if(e=t.action,e!==null){var f={payload:c,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(y){f.listeners.push(y)}};P.T!==null?r(!0):f.isTransition=!1,i(f),r=t.pending,r===null?(f.next=t.pending=f,Vm(t,f)):(f.next=r.next,t.pending=r.next=f)}}function Vm(e,t){var r=t.action,i=t.payload,c=e.state;if(t.isTransition){var f=P.T,y={};P.T=y;try{var w=r(c,i),O=P.S;O!==null&&O(y,w),Bm(e,t,w)}catch(F){Kc(e,t,F)}finally{f!==null&&y.types!==null&&(f.types=y.types),P.T=f}}else try{f=r(c,i),Bm(e,t,f)}catch(F){Kc(e,t,F)}}function Bm(e,t,r){r!==null&&typeof r=="object"&&typeof r.then=="function"?r.then(function(i){Lm(e,t,i)},function(i){return Kc(e,t,i)}):Lm(e,t,r)}function Lm(e,t,r){t.status="fulfilled",t.value=r,Um(t),e.state=r,t=e.pending,t!==null&&(r=t.next,r===t?e.pending=null:(r=r.next,t.next=r,Vm(e,r)))}function Kc(e,t,r){var i=e.pending;if(e.pending=null,i!==null){i=i.next;do t.status="rejected",t.reason=r,Um(t),t=t.next;while(t!==i)}e.action=null}function Um(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Hm(e,t){return t}function qm(e,t){if(ze){var r=Ge.formState;if(r!==null){e:{var i=Ee;if(ze){if(Ke){t:{for(var c=Ke,f=tn;c.nodeType!==8;){if(!f){c=null;break t}if(c=rn(c.nextSibling),c===null){c=null;break t}}f=c.data,c=f==="F!"||f==="F"?c:null}if(c){Ke=rn(c.nextSibling),i=c.data==="F!";break e}}ar(i)}i=!1}i&&(t=r[0])}}return r=Ct(),r.memoizedState=r.baseState=t,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Hm,lastRenderedState:t},r.queue=i,r=sp.bind(null,Ee,i),i.dispatch=r,i=Xc(!1),f=eu.bind(null,Ee,!1,i.queue),i=Ct(),c={state:t,dispatch:null,action:e,pending:null},i.queue=c,r=pS.bind(null,Ee,c,f,r),c.dispatch=r,i.memoizedState=e,[t,r,!1]}function Ym(e){var t=tt();return Pm(t,qe,e)}function Pm(e,t,r){if(t=Fc(e,t,Hm)[0],e=dl(Ln)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var i=Ri(t)}catch(y){throw y===Ca?tl:y}else i=t;t=tt();var c=t.queue,f=c.dispatch;return r!==t.memoizedState&&(Ee.flags|=2048,Ma(9,{destroy:void 0},gS.bind(null,c,r),null)),[i,f,e]}function gS(e,t){e.action=t}function Gm(e){var t=tt(),r=qe;if(r!==null)return Pm(t,r,e);tt(),t=t.memoizedState,r=tt();var i=r.queue.dispatch;return r.memoizedState=e,[t,i,!1]}function Ma(e,t,r,i){return e={tag:e,create:r,deps:i,inst:t,next:null},t=Ee.updateQueue,t===null&&(t=cl(),Ee.updateQueue=t),r=t.lastEffect,r===null?t.lastEffect=e.next=e:(i=r.next,r.next=e,e.next=i,t.lastEffect=e),e}function Fm(){return tt().memoizedState}function fl(e,t,r,i){var c=Ct();Ee.flags|=e,c.memoizedState=Ma(1|t,{destroy:void 0},r,i===void 0?null:i)}function hl(e,t,r,i){var c=tt();i=i===void 0?null:i;var f=c.memoizedState.inst;qe!==null&&i!==null&&Uc(i,qe.memoizedState.deps)?c.memoizedState=Ma(t,f,r,i):(Ee.flags|=e,c.memoizedState=Ma(1|t,f,r,i))}function $m(e,t){fl(8390656,8,e,t)}function Zc(e,t){hl(2048,8,e,t)}function yS(e){Ee.flags|=4;var t=Ee.updateQueue;if(t===null)t=cl(),Ee.updateQueue=t,t.events=[e];else{var r=t.events;r===null?t.events=[e]:r.push(e)}}function Xm(e){var t=tt().memoizedState;return yS({ref:t,nextImpl:e}),function(){if((Le&2)!==0)throw Error(o(440));return t.impl.apply(void 0,arguments)}}function Km(e,t){return hl(4,2,e,t)}function Zm(e,t){return hl(4,4,e,t)}function Qm(e,t){if(typeof t=="function"){e=e();var r=t(e);return function(){typeof r=="function"?r():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Jm(e,t,r){r=r!=null?r.concat([e]):null,hl(4,4,Qm.bind(null,t,e),r)}function Qc(){}function Wm(e,t){var r=tt();t=t===void 0?null:t;var i=r.memoizedState;return t!==null&&Uc(t,i[1])?i[0]:(r.memoizedState=[e,t],e)}function Im(e,t){var r=tt();t=t===void 0?null:t;var i=r.memoizedState;if(t!==null&&Uc(t,i[1]))return i[0];if(i=e(),Xr){In(!0);try{e()}finally{In(!1)}}return r.memoizedState=[i,t],i}function Jc(e,t,r){return r===void 0||(Bn&1073741824)!==0&&(Re&261930)===0?e.memoizedState=t:(e.memoizedState=r,e=eg(),Ee.lanes|=e,hr|=e,r)}function ep(e,t,r,i){return Ut(r,t)?r:Da.current!==null?(e=Jc(e,r,i),Ut(e,t)||(it=!0),e):(Bn&42)===0||(Bn&1073741824)!==0&&(Re&261930)===0?(it=!0,e.memoizedState=r):(e=eg(),Ee.lanes|=e,hr|=e,t)}function tp(e,t,r,i,c){var f=oe.p;oe.p=f!==0&&8>f?f:8;var y=P.T,w={};P.T=w,eu(e,!1,t,r);try{var O=c(),F=P.S;if(F!==null&&F(w,O),O!==null&&typeof O=="object"&&typeof O.then=="function"){var I=fS(O,i);Oi(e,t,I,Ft(e))}else Oi(e,t,i,Ft(e))}catch(re){Oi(e,t,{then:function(){},status:"rejected",reason:re},Ft())}finally{oe.p=f,y!==null&&w.types!==null&&(y.types=w.types),P.T=y}}function vS(){}function Wc(e,t,r,i){if(e.tag!==5)throw Error(o(476));var c=np(e).queue;tp(e,c,t,J,r===null?vS:function(){return rp(e),r(i)})}function np(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:J,baseState:J,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ln,lastRenderedState:J},next:null};var r={};return t.next={memoizedState:r,baseState:r,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ln,lastRenderedState:r},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function rp(e){var t=np(e);t.next===null&&(t=e.alternate.memoizedState),Oi(e,t.next.queue,{},Ft())}function Ic(){return yt(Qi)}function ap(){return tt().memoizedState}function ip(){return tt().memoizedState}function xS(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var r=Ft();e=lr(r);var i=or(t,e,r);i!==null&&(Vt(i,t,r),Di(i,t,r)),t={cache:Dc()},e.payload=t;return}t=t.return}}function bS(e,t,r){var i=Ft();r={lane:i,revertLane:0,gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},ml(e)?lp(t,r):(r=yc(e,t,r,i),r!==null&&(Vt(r,e,i),op(r,t,i)))}function sp(e,t,r){var i=Ft();Oi(e,t,r,i)}function Oi(e,t,r,i){var c={lane:i,revertLane:0,gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null};if(ml(e))lp(t,c);else{var f=e.alternate;if(e.lanes===0&&(f===null||f.lanes===0)&&(f=t.lastRenderedReducer,f!==null))try{var y=t.lastRenderedState,w=f(y,r);if(c.hasEagerState=!0,c.eagerState=w,Ut(w,y))return Ks(e,t,c,0),Ge===null&&Xs(),!1}catch{}finally{}if(r=yc(e,t,c,i),r!==null)return Vt(r,e,i),op(r,t,i),!0}return!1}function eu(e,t,r,i){if(i={lane:2,revertLane:Ru(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},ml(e)){if(t)throw Error(o(479))}else t=yc(e,r,i,2),t!==null&&Vt(t,e,2)}function ml(e){var t=e.alternate;return e===Ee||t!==null&&t===Ee}function lp(e,t){Aa=ll=!0;var r=e.pending;r===null?t.next=t:(t.next=r.next,r.next=t),e.pending=t}function op(e,t,r){if((r&4194048)!==0){var i=t.lanes;i&=e.pendingLanes,r|=i,t.lanes=r,hh(e,r)}}var zi={readContext:yt,use:ul,useCallback:Je,useContext:Je,useEffect:Je,useImperativeHandle:Je,useLayoutEffect:Je,useInsertionEffect:Je,useMemo:Je,useReducer:Je,useRef:Je,useState:Je,useDebugValue:Je,useDeferredValue:Je,useTransition:Je,useSyncExternalStore:Je,useId:Je,useHostTransitionStatus:Je,useFormState:Je,useActionState:Je,useOptimistic:Je,useMemoCache:Je,useCacheRefresh:Je};zi.useEffectEvent=Je;var cp={readContext:yt,use:ul,useCallback:function(e,t){return Ct().memoizedState=[e,t===void 0?null:t],e},useContext:yt,useEffect:$m,useImperativeHandle:function(e,t,r){r=r!=null?r.concat([e]):null,fl(4194308,4,Qm.bind(null,t,e),r)},useLayoutEffect:function(e,t){return fl(4194308,4,e,t)},useInsertionEffect:function(e,t){fl(4,2,e,t)},useMemo:function(e,t){var r=Ct();t=t===void 0?null:t;var i=e();if(Xr){In(!0);try{e()}finally{In(!1)}}return r.memoizedState=[i,t],i},useReducer:function(e,t,r){var i=Ct();if(r!==void 0){var c=r(t);if(Xr){In(!0);try{r(t)}finally{In(!1)}}}else c=t;return i.memoizedState=i.baseState=c,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:c},i.queue=e,e=e.dispatch=bS.bind(null,Ee,e),[i.memoizedState,e]},useRef:function(e){var t=Ct();return e={current:e},t.memoizedState=e},useState:function(e){e=Xc(e);var t=e.queue,r=sp.bind(null,Ee,t);return t.dispatch=r,[e.memoizedState,r]},useDebugValue:Qc,useDeferredValue:function(e,t){var r=Ct();return Jc(r,e,t)},useTransition:function(){var e=Xc(!1);return e=tp.bind(null,Ee,e.queue,!0,!1),Ct().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,r){var i=Ee,c=Ct();if(ze){if(r===void 0)throw Error(o(407));r=r()}else{if(r=t(),Ge===null)throw Error(o(349));(Re&127)!==0||km(i,t,r)}c.memoizedState=r;var f={value:r,getSnapshot:t};return c.queue=f,$m(Rm.bind(null,i,f,e),[e]),i.flags|=2048,Ma(9,{destroy:void 0},Mm.bind(null,i,f,r,t),null),r},useId:function(){var e=Ct(),t=Ge.identifierPrefix;if(ze){var r=bn,i=xn;r=(i&~(1<<32-Lt(i)-1)).toString(32)+r,t="_"+t+"R_"+r,r=ol++,0<r&&(t+="H"+r.toString(32)),t+="_"}else r=hS++,t="_"+t+"r_"+r.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:Ic,useFormState:qm,useActionState:qm,useOptimistic:function(e){var t=Ct();t.memoizedState=t.baseState=e;var r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=r,t=eu.bind(null,Ee,!0,r),r.dispatch=t,[e,t]},useMemoCache:Gc,useCacheRefresh:function(){return Ct().memoizedState=xS.bind(null,Ee)},useEffectEvent:function(e){var t=Ct(),r={impl:e};return t.memoizedState=r,function(){if((Le&2)!==0)throw Error(o(440));return r.impl.apply(void 0,arguments)}}},tu={readContext:yt,use:ul,useCallback:Wm,useContext:yt,useEffect:Zc,useImperativeHandle:Jm,useInsertionEffect:Km,useLayoutEffect:Zm,useMemo:Im,useReducer:dl,useRef:Fm,useState:function(){return dl(Ln)},useDebugValue:Qc,useDeferredValue:function(e,t){var r=tt();return ep(r,qe.memoizedState,e,t)},useTransition:function(){var e=dl(Ln)[0],t=tt().memoizedState;return[typeof e=="boolean"?e:Ri(e),t]},useSyncExternalStore:Am,useId:ap,useHostTransitionStatus:Ic,useFormState:Ym,useActionState:Ym,useOptimistic:function(e,t){var r=tt();return _m(r,qe,e,t)},useMemoCache:Gc,useCacheRefresh:ip};tu.useEffectEvent=Xm;var up={readContext:yt,use:ul,useCallback:Wm,useContext:yt,useEffect:Zc,useImperativeHandle:Jm,useInsertionEffect:Km,useLayoutEffect:Zm,useMemo:Im,useReducer:$c,useRef:Fm,useState:function(){return $c(Ln)},useDebugValue:Qc,useDeferredValue:function(e,t){var r=tt();return qe===null?Jc(r,e,t):ep(r,qe.memoizedState,e,t)},useTransition:function(){var e=$c(Ln)[0],t=tt().memoizedState;return[typeof e=="boolean"?e:Ri(e),t]},useSyncExternalStore:Am,useId:ap,useHostTransitionStatus:Ic,useFormState:Gm,useActionState:Gm,useOptimistic:function(e,t){var r=tt();return qe!==null?_m(r,qe,e,t):(r.baseState=e,[e,r.queue.dispatch])},useMemoCache:Gc,useCacheRefresh:ip};up.useEffectEvent=Xm;function nu(e,t,r,i){t=e.memoizedState,r=r(i,t),r=r==null?t:x({},t,r),e.memoizedState=r,e.lanes===0&&(e.updateQueue.baseState=r)}var ru={enqueueSetState:function(e,t,r){e=e._reactInternals;var i=Ft(),c=lr(i);c.payload=t,r!=null&&(c.callback=r),t=or(e,c,i),t!==null&&(Vt(t,e,i),Di(t,e,i))},enqueueReplaceState:function(e,t,r){e=e._reactInternals;var i=Ft(),c=lr(i);c.tag=1,c.payload=t,r!=null&&(c.callback=r),t=or(e,c,i),t!==null&&(Vt(t,e,i),Di(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var r=Ft(),i=lr(r);i.tag=2,t!=null&&(i.callback=t),t=or(e,i,r),t!==null&&(Vt(t,e,r),Di(t,e,r))}};function dp(e,t,r,i,c,f,y){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,f,y):t.prototype&&t.prototype.isPureReactComponent?!bi(r,i)||!bi(c,f):!0}function fp(e,t,r,i){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(r,i),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(r,i),t.state!==e&&ru.enqueueReplaceState(t,t.state,null)}function Kr(e,t){var r=t;if("ref"in t){r={};for(var i in t)i!=="ref"&&(r[i]=t[i])}if(e=e.defaultProps){r===t&&(r=x({},r));for(var c in e)r[c]===void 0&&(r[c]=e[c])}return r}function hp(e){$s(e)}function mp(e){console.error(e)}function pp(e){$s(e)}function pl(e,t){try{var r=e.onUncaughtError;r(t.value,{componentStack:t.stack})}catch(i){setTimeout(function(){throw i})}}function gp(e,t,r){try{var i=e.onCaughtError;i(r.value,{componentStack:r.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(c){setTimeout(function(){throw c})}}function au(e,t,r){return r=lr(r),r.tag=3,r.payload={element:null},r.callback=function(){pl(e,t)},r}function yp(e){return e=lr(e),e.tag=3,e}function vp(e,t,r,i){var c=r.type.getDerivedStateFromError;if(typeof c=="function"){var f=i.value;e.payload=function(){return c(f)},e.callback=function(){gp(t,r,i)}}var y=r.stateNode;y!==null&&typeof y.componentDidCatch=="function"&&(e.callback=function(){gp(t,r,i),typeof c!="function"&&(mr===null?mr=new Set([this]):mr.add(this));var w=i.stack;this.componentDidCatch(i.value,{componentStack:w!==null?w:""})})}function SS(e,t,r,i,c){if(r.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(t=r.alternate,t!==null&&wa(t,r,c,!0),r=qt.current,r!==null){switch(r.tag){case 31:case 13:return nn===null?Nl():r.alternate===null&&We===0&&(We=3),r.flags&=-257,r.flags|=65536,r.lanes=c,i===nl?r.flags|=16384:(t=r.updateQueue,t===null?r.updateQueue=new Set([i]):t.add(i),Au(e,i,c)),!1;case 22:return r.flags|=65536,i===nl?r.flags|=16384:(t=r.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([i])},r.updateQueue=t):(r=t.retryQueue,r===null?t.retryQueue=new Set([i]):r.add(i)),Au(e,i,c)),!1}throw Error(o(435,r.tag))}return Au(e,i,c),Nl(),!1}if(ze)return t=qt.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=c,i!==wc&&(e=Error(o(422),{cause:i}),wi(Wt(e,r)))):(i!==wc&&(t=Error(o(423),{cause:i}),wi(Wt(t,r))),e=e.current.alternate,e.flags|=65536,c&=-c,e.lanes|=c,i=Wt(i,r),c=au(e.stateNode,i,c),zc(e,c),We!==4&&(We=2)),!1;var f=Error(o(520),{cause:i});if(f=Wt(f,r),Yi===null?Yi=[f]:Yi.push(f),We!==4&&(We=2),t===null)return!0;i=Wt(i,r),r=t;do{switch(r.tag){case 3:return r.flags|=65536,e=c&-c,r.lanes|=e,e=au(r.stateNode,i,e),zc(r,e),!1;case 1:if(t=r.type,f=r.stateNode,(r.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(mr===null||!mr.has(f))))return r.flags|=65536,c&=-c,r.lanes|=c,c=yp(c),vp(c,e,r,i),zc(r,c),!1}r=r.return}while(r!==null);return!1}var iu=Error(o(461)),it=!1;function vt(e,t,r,i){t.child=e===null?jm(t,null,r,i):$r(t,e.child,r,i)}function xp(e,t,r,i,c){r=r.render;var f=t.ref;if("ref"in i){var y={};for(var w in i)w!=="ref"&&(y[w]=i[w])}else y=i;return Yr(t),i=Hc(e,t,r,y,f,c),w=qc(),e!==null&&!it?(Yc(e,t,c),Un(e,t,c)):(ze&&w&&Sc(t),t.flags|=1,vt(e,t,i,c),t.child)}function bp(e,t,r,i,c){if(e===null){var f=r.type;return typeof f=="function"&&!vc(f)&&f.defaultProps===void 0&&r.compare===null?(t.tag=15,t.type=f,Sp(e,t,f,i,c)):(e=Qs(r.type,null,i,t,t.mode,c),e.ref=t.ref,e.return=t,t.child=e)}if(f=e.child,!hu(e,c)){var y=f.memoizedProps;if(r=r.compare,r=r!==null?r:bi,r(y,i)&&e.ref===t.ref)return Un(e,t,c)}return t.flags|=1,e=On(f,i),e.ref=t.ref,e.return=t,t.child=e}function Sp(e,t,r,i,c){if(e!==null){var f=e.memoizedProps;if(bi(f,i)&&e.ref===t.ref)if(it=!1,t.pendingProps=i=f,hu(e,c))(e.flags&131072)!==0&&(it=!0);else return t.lanes=e.lanes,Un(e,t,c)}return su(e,t,r,i,c)}function jp(e,t,r,i){var c=i.children,f=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if((t.flags&128)!==0){if(f=f!==null?f.baseLanes|r:r,e!==null){for(i=t.child=e.child,c=0;i!==null;)c=c|i.lanes|i.childLanes,i=i.sibling;i=c&~f}else i=0,t.child=null;return wp(e,t,f,r,i)}if((r&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&el(t,f!==null?f.cachePool:null),f!==null?Tm(t,f):Vc(),Cm(t);else return i=t.lanes=536870912,wp(e,t,f!==null?f.baseLanes|r:r,r,i)}else f!==null?(el(t,f.cachePool),Tm(t,f),ur(),t.memoizedState=null):(e!==null&&el(t,null),Vc(),ur());return vt(e,t,c,r),t.child}function _i(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function wp(e,t,r,i,c){var f=kc();return f=f===null?null:{parent:rt._currentValue,pool:f},t.memoizedState={baseLanes:r,cachePool:f},e!==null&&el(t,null),Vc(),Cm(t),e!==null&&wa(e,t,i,!0),t.childLanes=c,null}function gl(e,t){return t=vl({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Ep(e,t,r){return $r(t,e.child,null,r),e=gl(t,t.pendingProps),e.flags|=2,Yt(t),t.memoizedState=null,e}function jS(e,t,r){var i=t.pendingProps,c=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(ze){if(i.mode==="hidden")return e=gl(t,i),t.lanes=536870912,_i(null,e);if(Lc(t),(e=Ke)?(e=Vg(e,tn),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:nr!==null?{id:xn,overflow:bn}:null,retryLane:536870912,hydrationErrors:null},r=lm(e),r.return=t,t.child=r,gt=t,Ke=null)):e=null,e===null)throw ar(t);return t.lanes=536870912,null}return gl(t,i)}var f=e.memoizedState;if(f!==null){var y=f.dehydrated;if(Lc(t),c)if(t.flags&256)t.flags&=-257,t=Ep(e,t,r);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(o(558));else if(it||wa(e,t,r,!1),c=(r&e.childLanes)!==0,it||c){if(i=Ge,i!==null&&(y=mh(i,r),y!==0&&y!==f.retryLane))throw f.retryLane=y,Lr(e,y),Vt(i,e,y),iu;Nl(),t=Ep(e,t,r)}else e=f.treeContext,Ke=rn(y.nextSibling),gt=t,ze=!0,rr=null,tn=!1,e!==null&&um(t,e),t=gl(t,i),t.flags|=4096;return t}return e=On(e.child,{mode:i.mode,children:i.children}),e.ref=t.ref,t.child=e,e.return=t,e}function yl(e,t){var r=t.ref;if(r===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof r!="function"&&typeof r!="object")throw Error(o(284));(e===null||e.ref!==r)&&(t.flags|=4194816)}}function su(e,t,r,i,c){return Yr(t),r=Hc(e,t,r,i,void 0,c),i=qc(),e!==null&&!it?(Yc(e,t,c),Un(e,t,c)):(ze&&i&&Sc(t),t.flags|=1,vt(e,t,r,c),t.child)}function Tp(e,t,r,i,c,f){return Yr(t),t.updateQueue=null,r=Dm(t,i,r,c),Nm(e),i=qc(),e!==null&&!it?(Yc(e,t,f),Un(e,t,f)):(ze&&i&&Sc(t),t.flags|=1,vt(e,t,r,f),t.child)}function Cp(e,t,r,i,c){if(Yr(t),t.stateNode===null){var f=xa,y=r.contextType;typeof y=="object"&&y!==null&&(f=yt(y)),f=new r(i,f),t.memoizedState=f.state!==null&&f.state!==void 0?f.state:null,f.updater=ru,t.stateNode=f,f._reactInternals=t,f=t.stateNode,f.props=i,f.state=t.memoizedState,f.refs={},Rc(t),y=r.contextType,f.context=typeof y=="object"&&y!==null?yt(y):xa,f.state=t.memoizedState,y=r.getDerivedStateFromProps,typeof y=="function"&&(nu(t,r,y,i),f.state=t.memoizedState),typeof r.getDerivedStateFromProps=="function"||typeof f.getSnapshotBeforeUpdate=="function"||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(y=f.state,typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount(),y!==f.state&&ru.enqueueReplaceState(f,f.state,null),ki(t,i,f,c),Ai(),f.state=t.memoizedState),typeof f.componentDidMount=="function"&&(t.flags|=4194308),i=!0}else if(e===null){f=t.stateNode;var w=t.memoizedProps,O=Kr(r,w);f.props=O;var F=f.context,I=r.contextType;y=xa,typeof I=="object"&&I!==null&&(y=yt(I));var re=r.getDerivedStateFromProps;I=typeof re=="function"||typeof f.getSnapshotBeforeUpdate=="function",w=t.pendingProps!==w,I||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(w||F!==y)&&fp(t,f,i,y),sr=!1;var X=t.memoizedState;f.state=X,ki(t,i,f,c),Ai(),F=t.memoizedState,w||X!==F||sr?(typeof re=="function"&&(nu(t,r,re,i),F=t.memoizedState),(O=sr||dp(t,r,O,i,X,F,y))?(I||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount()),typeof f.componentDidMount=="function"&&(t.flags|=4194308)):(typeof f.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=i,t.memoizedState=F),f.props=i,f.state=F,f.context=y,i=O):(typeof f.componentDidMount=="function"&&(t.flags|=4194308),i=!1)}else{f=t.stateNode,Oc(e,t),y=t.memoizedProps,I=Kr(r,y),f.props=I,re=t.pendingProps,X=f.context,F=r.contextType,O=xa,typeof F=="object"&&F!==null&&(O=yt(F)),w=r.getDerivedStateFromProps,(F=typeof w=="function"||typeof f.getSnapshotBeforeUpdate=="function")||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(y!==re||X!==O)&&fp(t,f,i,O),sr=!1,X=t.memoizedState,f.state=X,ki(t,i,f,c),Ai();var Q=t.memoizedState;y!==re||X!==Q||sr||e!==null&&e.dependencies!==null&&Ws(e.dependencies)?(typeof w=="function"&&(nu(t,r,w,i),Q=t.memoizedState),(I=sr||dp(t,r,I,i,X,Q,O)||e!==null&&e.dependencies!==null&&Ws(e.dependencies))?(F||typeof f.UNSAFE_componentWillUpdate!="function"&&typeof f.componentWillUpdate!="function"||(typeof f.componentWillUpdate=="function"&&f.componentWillUpdate(i,Q,O),typeof f.UNSAFE_componentWillUpdate=="function"&&f.UNSAFE_componentWillUpdate(i,Q,O)),typeof f.componentDidUpdate=="function"&&(t.flags|=4),typeof f.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof f.componentDidUpdate!="function"||y===e.memoizedProps&&X===e.memoizedState||(t.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&X===e.memoizedState||(t.flags|=1024),t.memoizedProps=i,t.memoizedState=Q),f.props=i,f.state=Q,f.context=O,i=I):(typeof f.componentDidUpdate!="function"||y===e.memoizedProps&&X===e.memoizedState||(t.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&X===e.memoizedState||(t.flags|=1024),i=!1)}return f=i,yl(e,t),i=(t.flags&128)!==0,f||i?(f=t.stateNode,r=i&&typeof r.getDerivedStateFromError!="function"?null:f.render(),t.flags|=1,e!==null&&i?(t.child=$r(t,e.child,null,c),t.child=$r(t,null,r,c)):vt(e,t,r,c),t.memoizedState=f.state,e=t.child):e=Un(e,t,c),e}function Np(e,t,r,i){return Hr(),t.flags|=256,vt(e,t,r,i),t.child}var lu={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function ou(e){return{baseLanes:e,cachePool:gm()}}function cu(e,t,r){return e=e!==null?e.childLanes&~r:0,t&&(e|=Gt),e}function Dp(e,t,r){var i=t.pendingProps,c=!1,f=(t.flags&128)!==0,y;if((y=f)||(y=e!==null&&e.memoizedState===null?!1:(et.current&2)!==0),y&&(c=!0,t.flags&=-129),y=(t.flags&32)!==0,t.flags&=-33,e===null){if(ze){if(c?cr(t):ur(),(e=Ke)?(e=Vg(e,tn),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:nr!==null?{id:xn,overflow:bn}:null,retryLane:536870912,hydrationErrors:null},r=lm(e),r.return=t,t.child=r,gt=t,Ke=null)):e=null,e===null)throw ar(t);return Fu(e)?t.lanes=32:t.lanes=536870912,null}var w=i.children;return i=i.fallback,c?(ur(),c=t.mode,w=vl({mode:"hidden",children:w},c),i=Ur(i,c,r,null),w.return=t,i.return=t,w.sibling=i,t.child=w,i=t.child,i.memoizedState=ou(r),i.childLanes=cu(e,y,r),t.memoizedState=lu,_i(null,i)):(cr(t),uu(t,w))}var O=e.memoizedState;if(O!==null&&(w=O.dehydrated,w!==null)){if(f)t.flags&256?(cr(t),t.flags&=-257,t=du(e,t,r)):t.memoizedState!==null?(ur(),t.child=e.child,t.flags|=128,t=null):(ur(),w=i.fallback,c=t.mode,i=vl({mode:"visible",children:i.children},c),w=Ur(w,c,r,null),w.flags|=2,i.return=t,w.return=t,i.sibling=w,t.child=i,$r(t,e.child,null,r),i=t.child,i.memoizedState=ou(r),i.childLanes=cu(e,y,r),t.memoizedState=lu,t=_i(null,i));else if(cr(t),Fu(w)){if(y=w.nextSibling&&w.nextSibling.dataset,y)var F=y.dgst;y=F,i=Error(o(419)),i.stack="",i.digest=y,wi({value:i,source:null,stack:null}),t=du(e,t,r)}else if(it||wa(e,t,r,!1),y=(r&e.childLanes)!==0,it||y){if(y=Ge,y!==null&&(i=mh(y,r),i!==0&&i!==O.retryLane))throw O.retryLane=i,Lr(e,i),Vt(y,e,i),iu;Gu(w)||Nl(),t=du(e,t,r)}else Gu(w)?(t.flags|=192,t.child=e.child,t=null):(e=O.treeContext,Ke=rn(w.nextSibling),gt=t,ze=!0,rr=null,tn=!1,e!==null&&um(t,e),t=uu(t,i.children),t.flags|=4096);return t}return c?(ur(),w=i.fallback,c=t.mode,O=e.child,F=O.sibling,i=On(O,{mode:"hidden",children:i.children}),i.subtreeFlags=O.subtreeFlags&65011712,F!==null?w=On(F,w):(w=Ur(w,c,r,null),w.flags|=2),w.return=t,i.return=t,i.sibling=w,t.child=i,_i(null,i),i=t.child,w=e.child.memoizedState,w===null?w=ou(r):(c=w.cachePool,c!==null?(O=rt._currentValue,c=c.parent!==O?{parent:O,pool:O}:c):c=gm(),w={baseLanes:w.baseLanes|r,cachePool:c}),i.memoizedState=w,i.childLanes=cu(e,y,r),t.memoizedState=lu,_i(e.child,i)):(cr(t),r=e.child,e=r.sibling,r=On(r,{mode:"visible",children:i.children}),r.return=t,r.sibling=null,e!==null&&(y=t.deletions,y===null?(t.deletions=[e],t.flags|=16):y.push(e)),t.child=r,t.memoizedState=null,r)}function uu(e,t){return t=vl({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function vl(e,t){return e=Ht(22,e,null,t),e.lanes=0,e}function du(e,t,r){return $r(t,e.child,null,r),e=uu(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Ap(e,t,r){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t),Cc(e.return,t,r)}function fu(e,t,r,i,c,f){var y=e.memoizedState;y===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:i,tail:r,tailMode:c,treeForkCount:f}:(y.isBackwards=t,y.rendering=null,y.renderingStartTime=0,y.last=i,y.tail=r,y.tailMode=c,y.treeForkCount=f)}function kp(e,t,r){var i=t.pendingProps,c=i.revealOrder,f=i.tail;i=i.children;var y=et.current,w=(y&2)!==0;if(w?(y=y&1|2,t.flags|=128):y&=1,ee(et,y),vt(e,t,i,r),i=ze?ji:0,!w&&e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ap(e,r,t);else if(e.tag===19)Ap(e,r,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(c){case"forwards":for(r=t.child,c=null;r!==null;)e=r.alternate,e!==null&&sl(e)===null&&(c=r),r=r.sibling;r=c,r===null?(c=t.child,t.child=null):(c=r.sibling,r.sibling=null),fu(t,!1,c,r,f,i);break;case"backwards":case"unstable_legacy-backwards":for(r=null,c=t.child,t.child=null;c!==null;){if(e=c.alternate,e!==null&&sl(e)===null){t.child=c;break}e=c.sibling,c.sibling=r,r=c,c=e}fu(t,!0,r,null,f,i);break;case"together":fu(t,!1,null,null,void 0,i);break;default:t.memoizedState=null}return t.child}function Un(e,t,r){if(e!==null&&(t.dependencies=e.dependencies),hr|=t.lanes,(r&t.childLanes)===0)if(e!==null){if(wa(e,t,r,!1),(r&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(o(153));if(t.child!==null){for(e=t.child,r=On(e,e.pendingProps),t.child=r,r.return=t;e.sibling!==null;)e=e.sibling,r=r.sibling=On(e,e.pendingProps),r.return=t;r.sibling=null}return t.child}function hu(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&Ws(e)))}function wS(e,t,r){switch(t.tag){case 3:ie(t,t.stateNode.containerInfo),ir(t,rt,e.memoizedState.cache),Hr();break;case 27:case 5:he(t);break;case 4:ie(t,t.stateNode.containerInfo);break;case 10:ir(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Lc(t),null;break;case 13:var i=t.memoizedState;if(i!==null)return i.dehydrated!==null?(cr(t),t.flags|=128,null):(r&t.child.childLanes)!==0?Dp(e,t,r):(cr(t),e=Un(e,t,r),e!==null?e.sibling:null);cr(t);break;case 19:var c=(e.flags&128)!==0;if(i=(r&t.childLanes)!==0,i||(wa(e,t,r,!1),i=(r&t.childLanes)!==0),c){if(i)return kp(e,t,r);t.flags|=128}if(c=t.memoizedState,c!==null&&(c.rendering=null,c.tail=null,c.lastEffect=null),ee(et,et.current),i)break;return null;case 22:return t.lanes=0,jp(e,t,r,t.pendingProps);case 24:ir(t,rt,e.memoizedState.cache)}return Un(e,t,r)}function Mp(e,t,r){if(e!==null)if(e.memoizedProps!==t.pendingProps)it=!0;else{if(!hu(e,r)&&(t.flags&128)===0)return it=!1,wS(e,t,r);it=(e.flags&131072)!==0}else it=!1,ze&&(t.flags&1048576)!==0&&cm(t,ji,t.index);switch(t.lanes=0,t.tag){case 16:e:{var i=t.pendingProps;if(e=Gr(t.elementType),t.type=e,typeof e=="function")vc(e)?(i=Kr(e,i),t.tag=1,t=Cp(null,t,e,i,r)):(t.tag=0,t=su(null,t,e,i,r));else{if(e!=null){var c=e.$$typeof;if(c===_){t.tag=11,t=xp(null,t,e,i,r);break e}else if(c===D){t.tag=14,t=bp(null,t,e,i,r);break e}}throw t=se(e)||e,Error(o(306,t,""))}}return t;case 0:return su(e,t,t.type,t.pendingProps,r);case 1:return i=t.type,c=Kr(i,t.pendingProps),Cp(e,t,i,c,r);case 3:e:{if(ie(t,t.stateNode.containerInfo),e===null)throw Error(o(387));i=t.pendingProps;var f=t.memoizedState;c=f.element,Oc(e,t),ki(t,i,null,r);var y=t.memoizedState;if(i=y.cache,ir(t,rt,i),i!==f.cache&&Nc(t,[rt],r,!0),Ai(),i=y.element,f.isDehydrated)if(f={element:i,isDehydrated:!1,cache:y.cache},t.updateQueue.baseState=f,t.memoizedState=f,t.flags&256){t=Np(e,t,i,r);break e}else if(i!==c){c=Wt(Error(o(424)),t),wi(c),t=Np(e,t,i,r);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Ke=rn(e.firstChild),gt=t,ze=!0,rr=null,tn=!0,r=jm(t,null,i,r),t.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling}else{if(Hr(),i===c){t=Un(e,t,r);break e}vt(e,t,i,r)}t=t.child}return t;case 26:return yl(e,t),e===null?(r=Yg(t.type,null,t.pendingProps,null))?t.memoizedState=r:ze||(r=t.type,e=t.pendingProps,i=zl(me.current).createElement(r),i[pt]=t,i[kt]=e,xt(i,r,e),ft(i),t.stateNode=i):t.memoizedState=Yg(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return he(t),e===null&&ze&&(i=t.stateNode=Ug(t.type,t.pendingProps,me.current),gt=t,tn=!0,c=Ke,vr(t.type)?($u=c,Ke=rn(i.firstChild)):Ke=c),vt(e,t,t.pendingProps.children,r),yl(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&ze&&((c=i=Ke)&&(i=IS(i,t.type,t.pendingProps,tn),i!==null?(t.stateNode=i,gt=t,Ke=rn(i.firstChild),tn=!1,c=!0):c=!1),c||ar(t)),he(t),c=t.type,f=t.pendingProps,y=e!==null?e.memoizedProps:null,i=f.children,qu(c,f)?i=null:y!==null&&qu(c,y)&&(t.flags|=32),t.memoizedState!==null&&(c=Hc(e,t,mS,null,null,r),Qi._currentValue=c),yl(e,t),vt(e,t,i,r),t.child;case 6:return e===null&&ze&&((e=r=Ke)&&(r=ej(r,t.pendingProps,tn),r!==null?(t.stateNode=r,gt=t,Ke=null,e=!0):e=!1),e||ar(t)),null;case 13:return Dp(e,t,r);case 4:return ie(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=$r(t,null,i,r):vt(e,t,i,r),t.child;case 11:return xp(e,t,t.type,t.pendingProps,r);case 7:return vt(e,t,t.pendingProps,r),t.child;case 8:return vt(e,t,t.pendingProps.children,r),t.child;case 12:return vt(e,t,t.pendingProps.children,r),t.child;case 10:return i=t.pendingProps,ir(t,t.type,i.value),vt(e,t,i.children,r),t.child;case 9:return c=t.type._context,i=t.pendingProps.children,Yr(t),c=yt(c),i=i(c),t.flags|=1,vt(e,t,i,r),t.child;case 14:return bp(e,t,t.type,t.pendingProps,r);case 15:return Sp(e,t,t.type,t.pendingProps,r);case 19:return kp(e,t,r);case 31:return jS(e,t,r);case 22:return jp(e,t,r,t.pendingProps);case 24:return Yr(t),i=yt(rt),e===null?(c=kc(),c===null&&(c=Ge,f=Dc(),c.pooledCache=f,f.refCount++,f!==null&&(c.pooledCacheLanes|=r),c=f),t.memoizedState={parent:i,cache:c},Rc(t),ir(t,rt,c)):((e.lanes&r)!==0&&(Oc(e,t),ki(t,null,null,r),Ai()),c=e.memoizedState,f=t.memoizedState,c.parent!==i?(c={parent:i,cache:i},t.memoizedState=c,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=c),ir(t,rt,i)):(i=f.cache,ir(t,rt,i),i!==c.cache&&Nc(t,[rt],r,!0))),vt(e,t,t.pendingProps.children,r),t.child;case 29:throw t.pendingProps}throw Error(o(156,t.tag))}function Hn(e){e.flags|=4}function mu(e,t,r,i,c){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(c&335544128)===c)if(e.stateNode.complete)e.flags|=8192;else if(ag())e.flags|=8192;else throw Fr=nl,Mc}else e.flags&=-16777217}function Rp(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Xg(t))if(ag())e.flags|=8192;else throw Fr=nl,Mc}function xl(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?dh():536870912,e.lanes|=t,_a|=t)}function Vi(e,t){if(!ze)switch(e.tailMode){case"hidden":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var i=null;r!==null;)r.alternate!==null&&(i=r),r=r.sibling;i===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null}}function Ze(e){var t=e.alternate!==null&&e.alternate.child===e.child,r=0,i=0;if(t)for(var c=e.child;c!==null;)r|=c.lanes|c.childLanes,i|=c.subtreeFlags&65011712,i|=c.flags&65011712,c.return=e,c=c.sibling;else for(c=e.child;c!==null;)r|=c.lanes|c.childLanes,i|=c.subtreeFlags,i|=c.flags,c.return=e,c=c.sibling;return e.subtreeFlags|=i,e.childLanes=r,t}function ES(e,t,r){var i=t.pendingProps;switch(jc(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ze(t),null;case 1:return Ze(t),null;case 3:return r=t.stateNode,i=null,e!==null&&(i=e.memoizedState.cache),t.memoizedState.cache!==i&&(t.flags|=2048),Vn(rt),W(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(ja(t)?Hn(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,Ec())),Ze(t),null;case 26:var c=t.type,f=t.memoizedState;return e===null?(Hn(t),f!==null?(Ze(t),Rp(t,f)):(Ze(t),mu(t,c,null,i,r))):f?f!==e.memoizedState?(Hn(t),Ze(t),Rp(t,f)):(Ze(t),t.flags&=-16777217):(e=e.memoizedProps,e!==i&&Hn(t),Ze(t),mu(t,c,e,i,r)),null;case 27:if(ne(t),r=me.current,c=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&Hn(t);else{if(!i){if(t.stateNode===null)throw Error(o(166));return Ze(t),null}e=le.current,ja(t)?dm(t):(e=Ug(c,i,r),t.stateNode=e,Hn(t))}return Ze(t),null;case 5:if(ne(t),c=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&Hn(t);else{if(!i){if(t.stateNode===null)throw Error(o(166));return Ze(t),null}if(f=le.current,ja(t))dm(t);else{var y=zl(me.current);switch(f){case 1:f=y.createElementNS("http://www.w3.org/2000/svg",c);break;case 2:f=y.createElementNS("http://www.w3.org/1998/Math/MathML",c);break;default:switch(c){case"svg":f=y.createElementNS("http://www.w3.org/2000/svg",c);break;case"math":f=y.createElementNS("http://www.w3.org/1998/Math/MathML",c);break;case"script":f=y.createElement("div"),f.innerHTML="<script><\/script>",f=f.removeChild(f.firstChild);break;case"select":f=typeof i.is=="string"?y.createElement("select",{is:i.is}):y.createElement("select"),i.multiple?f.multiple=!0:i.size&&(f.size=i.size);break;default:f=typeof i.is=="string"?y.createElement(c,{is:i.is}):y.createElement(c)}}f[pt]=t,f[kt]=i;e:for(y=t.child;y!==null;){if(y.tag===5||y.tag===6)f.appendChild(y.stateNode);else if(y.tag!==4&&y.tag!==27&&y.child!==null){y.child.return=y,y=y.child;continue}if(y===t)break e;for(;y.sibling===null;){if(y.return===null||y.return===t)break e;y=y.return}y.sibling.return=y.return,y=y.sibling}t.stateNode=f;e:switch(xt(f,c,i),c){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}i&&Hn(t)}}return Ze(t),mu(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,r),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==i&&Hn(t);else{if(typeof i!="string"&&t.stateNode===null)throw Error(o(166));if(e=me.current,ja(t)){if(e=t.stateNode,r=t.memoizedProps,i=null,c=gt,c!==null)switch(c.tag){case 27:case 5:i=c.memoizedProps}e[pt]=t,e=!!(e.nodeValue===r||i!==null&&i.suppressHydrationWarning===!0||Dg(e.nodeValue,r)),e||ar(t,!0)}else e=zl(e).createTextNode(i),e[pt]=t,t.stateNode=e}return Ze(t),null;case 31:if(r=t.memoizedState,e===null||e.memoizedState!==null){if(i=ja(t),r!==null){if(e===null){if(!i)throw Error(o(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(o(557));e[pt]=t}else Hr(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ze(t),e=!1}else r=Ec(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=r),e=!0;if(!e)return t.flags&256?(Yt(t),t):(Yt(t),null);if((t.flags&128)!==0)throw Error(o(558))}return Ze(t),null;case 13:if(i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(c=ja(t),i!==null&&i.dehydrated!==null){if(e===null){if(!c)throw Error(o(318));if(c=t.memoizedState,c=c!==null?c.dehydrated:null,!c)throw Error(o(317));c[pt]=t}else Hr(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ze(t),c=!1}else c=Ec(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=c),c=!0;if(!c)return t.flags&256?(Yt(t),t):(Yt(t),null)}return Yt(t),(t.flags&128)!==0?(t.lanes=r,t):(r=i!==null,e=e!==null&&e.memoizedState!==null,r&&(i=t.child,c=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(c=i.alternate.memoizedState.cachePool.pool),f=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(f=i.memoizedState.cachePool.pool),f!==c&&(i.flags|=2048)),r!==e&&r&&(t.child.flags|=8192),xl(t,t.updateQueue),Ze(t),null);case 4:return W(),e===null&&Vu(t.stateNode.containerInfo),Ze(t),null;case 10:return Vn(t.type),Ze(t),null;case 19:if(V(et),i=t.memoizedState,i===null)return Ze(t),null;if(c=(t.flags&128)!==0,f=i.rendering,f===null)if(c)Vi(i,!1);else{if(We!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(f=sl(e),f!==null){for(t.flags|=128,Vi(i,!1),e=f.updateQueue,t.updateQueue=e,xl(t,e),t.subtreeFlags=0,e=r,r=t.child;r!==null;)sm(r,e),r=r.sibling;return ee(et,et.current&1|2),ze&&zn(t,i.treeForkCount),t.child}e=e.sibling}i.tail!==null&&nt()>El&&(t.flags|=128,c=!0,Vi(i,!1),t.lanes=4194304)}else{if(!c)if(e=sl(f),e!==null){if(t.flags|=128,c=!0,e=e.updateQueue,t.updateQueue=e,xl(t,e),Vi(i,!0),i.tail===null&&i.tailMode==="hidden"&&!f.alternate&&!ze)return Ze(t),null}else 2*nt()-i.renderingStartTime>El&&r!==536870912&&(t.flags|=128,c=!0,Vi(i,!1),t.lanes=4194304);i.isBackwards?(f.sibling=t.child,t.child=f):(e=i.last,e!==null?e.sibling=f:t.child=f,i.last=f)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=nt(),e.sibling=null,r=et.current,ee(et,c?r&1|2:r&1),ze&&zn(t,i.treeForkCount),e):(Ze(t),null);case 22:case 23:return Yt(t),Bc(),i=t.memoizedState!==null,e!==null?e.memoizedState!==null!==i&&(t.flags|=8192):i&&(t.flags|=8192),i?(r&536870912)!==0&&(t.flags&128)===0&&(Ze(t),t.subtreeFlags&6&&(t.flags|=8192)):Ze(t),r=t.updateQueue,r!==null&&xl(t,r.retryQueue),r=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(r=e.memoizedState.cachePool.pool),i=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(i=t.memoizedState.cachePool.pool),i!==r&&(t.flags|=2048),e!==null&&V(Pr),null;case 24:return r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),Vn(rt),Ze(t),null;case 25:return null;case 30:return null}throw Error(o(156,t.tag))}function TS(e,t){switch(jc(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Vn(rt),W(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return ne(t),null;case 31:if(t.memoizedState!==null){if(Yt(t),t.alternate===null)throw Error(o(340));Hr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Yt(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(o(340));Hr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return V(et),null;case 4:return W(),null;case 10:return Vn(t.type),null;case 22:case 23:return Yt(t),Bc(),e!==null&&V(Pr),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Vn(rt),null;case 25:return null;default:return null}}function Op(e,t){switch(jc(t),t.tag){case 3:Vn(rt),W();break;case 26:case 27:case 5:ne(t);break;case 4:W();break;case 31:t.memoizedState!==null&&Yt(t);break;case 13:Yt(t);break;case 19:V(et);break;case 10:Vn(t.type);break;case 22:case 23:Yt(t),Bc(),e!==null&&V(Pr);break;case 24:Vn(rt)}}function Bi(e,t){try{var r=t.updateQueue,i=r!==null?r.lastEffect:null;if(i!==null){var c=i.next;r=c;do{if((r.tag&e)===e){i=void 0;var f=r.create,y=r.inst;i=f(),y.destroy=i}r=r.next}while(r!==c)}}catch(w){He(t,t.return,w)}}function dr(e,t,r){try{var i=t.updateQueue,c=i!==null?i.lastEffect:null;if(c!==null){var f=c.next;i=f;do{if((i.tag&e)===e){var y=i.inst,w=y.destroy;if(w!==void 0){y.destroy=void 0,c=t;var O=r,F=w;try{F()}catch(I){He(c,O,I)}}}i=i.next}while(i!==f)}}catch(I){He(t,t.return,I)}}function zp(e){var t=e.updateQueue;if(t!==null){var r=e.stateNode;try{Em(t,r)}catch(i){He(e,e.return,i)}}}function _p(e,t,r){r.props=Kr(e.type,e.memoizedProps),r.state=e.memoizedState;try{r.componentWillUnmount()}catch(i){He(e,t,i)}}function Li(e,t){try{var r=e.ref;if(r!==null){switch(e.tag){case 26:case 27:case 5:var i=e.stateNode;break;case 30:i=e.stateNode;break;default:i=e.stateNode}typeof r=="function"?e.refCleanup=r(i):r.current=i}}catch(c){He(e,t,c)}}function Sn(e,t){var r=e.ref,i=e.refCleanup;if(r!==null)if(typeof i=="function")try{i()}catch(c){He(e,t,c)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof r=="function")try{r(null)}catch(c){He(e,t,c)}else r.current=null}function Vp(e){var t=e.type,r=e.memoizedProps,i=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":r.autoFocus&&i.focus();break e;case"img":r.src?i.src=r.src:r.srcSet&&(i.srcset=r.srcSet)}}catch(c){He(e,e.return,c)}}function pu(e,t,r){try{var i=e.stateNode;XS(i,e.type,r,t),i[kt]=t}catch(c){He(e,e.return,c)}}function Bp(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&vr(e.type)||e.tag===4}function gu(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Bp(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&vr(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function yu(e,t,r){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?(r.nodeType===9?r.body:r.nodeName==="HTML"?r.ownerDocument.body:r).insertBefore(e,t):(t=r.nodeType===9?r.body:r.nodeName==="HTML"?r.ownerDocument.body:r,t.appendChild(e),r=r._reactRootContainer,r!=null||t.onclick!==null||(t.onclick=Mn));else if(i!==4&&(i===27&&vr(e.type)&&(r=e.stateNode,t=null),e=e.child,e!==null))for(yu(e,t,r),e=e.sibling;e!==null;)yu(e,t,r),e=e.sibling}function bl(e,t,r){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?r.insertBefore(e,t):r.appendChild(e);else if(i!==4&&(i===27&&vr(e.type)&&(r=e.stateNode),e=e.child,e!==null))for(bl(e,t,r),e=e.sibling;e!==null;)bl(e,t,r),e=e.sibling}function Lp(e){var t=e.stateNode,r=e.memoizedProps;try{for(var i=e.type,c=t.attributes;c.length;)t.removeAttributeNode(c[0]);xt(t,i,r),t[pt]=e,t[kt]=r}catch(f){He(e,e.return,f)}}var qn=!1,st=!1,vu=!1,Up=typeof WeakSet=="function"?WeakSet:Set,ht=null;function CS(e,t){if(e=e.containerInfo,Uu=ql,e=Jh(e),dc(e)){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{r=(r=e.ownerDocument)&&r.defaultView||window;var i=r.getSelection&&r.getSelection();if(i&&i.rangeCount!==0){r=i.anchorNode;var c=i.anchorOffset,f=i.focusNode;i=i.focusOffset;try{r.nodeType,f.nodeType}catch{r=null;break e}var y=0,w=-1,O=-1,F=0,I=0,re=e,X=null;t:for(;;){for(var Q;re!==r||c!==0&&re.nodeType!==3||(w=y+c),re!==f||i!==0&&re.nodeType!==3||(O=y+i),re.nodeType===3&&(y+=re.nodeValue.length),(Q=re.firstChild)!==null;)X=re,re=Q;for(;;){if(re===e)break t;if(X===r&&++F===c&&(w=y),X===f&&++I===i&&(O=y),(Q=re.nextSibling)!==null)break;re=X,X=re.parentNode}re=Q}r=w===-1||O===-1?null:{start:w,end:O}}else r=null}r=r||{start:0,end:0}}else r=null;for(Hu={focusedElem:e,selectionRange:r},ql=!1,ht=t;ht!==null;)if(t=ht,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,ht=e;else for(;ht!==null;){switch(t=ht,f=t.alternate,e=t.flags,t.tag){case 0:if((e&4)!==0&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(r=0;r<e.length;r++)c=e[r],c.ref.impl=c.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&f!==null){e=void 0,r=t,c=f.memoizedProps,f=f.memoizedState,i=r.stateNode;try{var pe=Kr(r.type,c);e=i.getSnapshotBeforeUpdate(pe,f),i.__reactInternalSnapshotBeforeUpdate=e}catch(Se){He(r,r.return,Se)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,r=e.nodeType,r===9)Pu(e);else if(r===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Pu(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(o(163))}if(e=t.sibling,e!==null){e.return=t.return,ht=e;break}ht=t.return}}function Hp(e,t,r){var i=r.flags;switch(r.tag){case 0:case 11:case 15:Pn(e,r),i&4&&Bi(5,r);break;case 1:if(Pn(e,r),i&4)if(e=r.stateNode,t===null)try{e.componentDidMount()}catch(y){He(r,r.return,y)}else{var c=Kr(r.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(c,t,e.__reactInternalSnapshotBeforeUpdate)}catch(y){He(r,r.return,y)}}i&64&&zp(r),i&512&&Li(r,r.return);break;case 3:if(Pn(e,r),i&64&&(e=r.updateQueue,e!==null)){if(t=null,r.child!==null)switch(r.child.tag){case 27:case 5:t=r.child.stateNode;break;case 1:t=r.child.stateNode}try{Em(e,t)}catch(y){He(r,r.return,y)}}break;case 27:t===null&&i&4&&Lp(r);case 26:case 5:Pn(e,r),t===null&&i&4&&Vp(r),i&512&&Li(r,r.return);break;case 12:Pn(e,r);break;case 31:Pn(e,r),i&4&&Pp(e,r);break;case 13:Pn(e,r),i&4&&Gp(e,r),i&64&&(e=r.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(r=_S.bind(null,r),tj(e,r))));break;case 22:if(i=r.memoizedState!==null||qn,!i){t=t!==null&&t.memoizedState!==null||st,c=qn;var f=st;qn=i,(st=t)&&!f?Gn(e,r,(r.subtreeFlags&8772)!==0):Pn(e,r),qn=c,st=f}break;case 30:break;default:Pn(e,r)}}function qp(e){var t=e.alternate;t!==null&&(e.alternate=null,qp(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Ko(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Qe=null,Rt=!1;function Yn(e,t,r){for(r=r.child;r!==null;)Yp(e,t,r),r=r.sibling}function Yp(e,t,r){if(Bt&&typeof Bt.onCommitFiberUnmount=="function")try{Bt.onCommitFiberUnmount(Wn,r)}catch{}switch(r.tag){case 26:st||Sn(r,t),Yn(e,t,r),r.memoizedState?r.memoizedState.count--:r.stateNode&&(r=r.stateNode,r.parentNode.removeChild(r));break;case 27:st||Sn(r,t);var i=Qe,c=Rt;vr(r.type)&&(Qe=r.stateNode,Rt=!1),Yn(e,t,r),Xi(r.stateNode),Qe=i,Rt=c;break;case 5:st||Sn(r,t);case 6:if(i=Qe,c=Rt,Qe=null,Yn(e,t,r),Qe=i,Rt=c,Qe!==null)if(Rt)try{(Qe.nodeType===9?Qe.body:Qe.nodeName==="HTML"?Qe.ownerDocument.body:Qe).removeChild(r.stateNode)}catch(f){He(r,t,f)}else try{Qe.removeChild(r.stateNode)}catch(f){He(r,t,f)}break;case 18:Qe!==null&&(Rt?(e=Qe,zg(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,r.stateNode),Pa(e)):zg(Qe,r.stateNode));break;case 4:i=Qe,c=Rt,Qe=r.stateNode.containerInfo,Rt=!0,Yn(e,t,r),Qe=i,Rt=c;break;case 0:case 11:case 14:case 15:dr(2,r,t),st||dr(4,r,t),Yn(e,t,r);break;case 1:st||(Sn(r,t),i=r.stateNode,typeof i.componentWillUnmount=="function"&&_p(r,t,i)),Yn(e,t,r);break;case 21:Yn(e,t,r);break;case 22:st=(i=st)||r.memoizedState!==null,Yn(e,t,r),st=i;break;default:Yn(e,t,r)}}function Pp(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Pa(e)}catch(r){He(t,t.return,r)}}}function Gp(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Pa(e)}catch(r){He(t,t.return,r)}}function NS(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new Up),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new Up),t;default:throw Error(o(435,e.tag))}}function Sl(e,t){var r=NS(e);t.forEach(function(i){if(!r.has(i)){r.add(i);var c=VS.bind(null,e,i);i.then(c,c)}})}function Ot(e,t){var r=t.deletions;if(r!==null)for(var i=0;i<r.length;i++){var c=r[i],f=e,y=t,w=y;e:for(;w!==null;){switch(w.tag){case 27:if(vr(w.type)){Qe=w.stateNode,Rt=!1;break e}break;case 5:Qe=w.stateNode,Rt=!1;break e;case 3:case 4:Qe=w.stateNode.containerInfo,Rt=!0;break e}w=w.return}if(Qe===null)throw Error(o(160));Yp(f,y,c),Qe=null,Rt=!1,f=c.alternate,f!==null&&(f.return=null),c.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Fp(t,e),t=t.sibling}var fn=null;function Fp(e,t){var r=e.alternate,i=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Ot(t,e),zt(e),i&4&&(dr(3,e,e.return),Bi(3,e),dr(5,e,e.return));break;case 1:Ot(t,e),zt(e),i&512&&(st||r===null||Sn(r,r.return)),i&64&&qn&&(e=e.updateQueue,e!==null&&(i=e.callbacks,i!==null&&(r=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=r===null?i:r.concat(i))));break;case 26:var c=fn;if(Ot(t,e),zt(e),i&512&&(st||r===null||Sn(r,r.return)),i&4){var f=r!==null?r.memoizedState:null;if(i=e.memoizedState,r===null)if(i===null)if(e.stateNode===null){e:{i=e.type,r=e.memoizedProps,c=c.ownerDocument||c;t:switch(i){case"title":f=c.getElementsByTagName("title")[0],(!f||f[di]||f[pt]||f.namespaceURI==="http://www.w3.org/2000/svg"||f.hasAttribute("itemprop"))&&(f=c.createElement(i),c.head.insertBefore(f,c.querySelector("head > title"))),xt(f,i,r),f[pt]=e,ft(f),i=f;break e;case"link":var y=Fg("link","href",c).get(i+(r.href||""));if(y){for(var w=0;w<y.length;w++)if(f=y[w],f.getAttribute("href")===(r.href==null||r.href===""?null:r.href)&&f.getAttribute("rel")===(r.rel==null?null:r.rel)&&f.getAttribute("title")===(r.title==null?null:r.title)&&f.getAttribute("crossorigin")===(r.crossOrigin==null?null:r.crossOrigin)){y.splice(w,1);break t}}f=c.createElement(i),xt(f,i,r),c.head.appendChild(f);break;case"meta":if(y=Fg("meta","content",c).get(i+(r.content||""))){for(w=0;w<y.length;w++)if(f=y[w],f.getAttribute("content")===(r.content==null?null:""+r.content)&&f.getAttribute("name")===(r.name==null?null:r.name)&&f.getAttribute("property")===(r.property==null?null:r.property)&&f.getAttribute("http-equiv")===(r.httpEquiv==null?null:r.httpEquiv)&&f.getAttribute("charset")===(r.charSet==null?null:r.charSet)){y.splice(w,1);break t}}f=c.createElement(i),xt(f,i,r),c.head.appendChild(f);break;default:throw Error(o(468,i))}f[pt]=e,ft(f),i=f}e.stateNode=i}else $g(c,e.type,e.stateNode);else e.stateNode=Gg(c,i,e.memoizedProps);else f!==i?(f===null?r.stateNode!==null&&(r=r.stateNode,r.parentNode.removeChild(r)):f.count--,i===null?$g(c,e.type,e.stateNode):Gg(c,i,e.memoizedProps)):i===null&&e.stateNode!==null&&pu(e,e.memoizedProps,r.memoizedProps)}break;case 27:Ot(t,e),zt(e),i&512&&(st||r===null||Sn(r,r.return)),r!==null&&i&4&&pu(e,e.memoizedProps,r.memoizedProps);break;case 5:if(Ot(t,e),zt(e),i&512&&(st||r===null||Sn(r,r.return)),e.flags&32){c=e.stateNode;try{fa(c,"")}catch(pe){He(e,e.return,pe)}}i&4&&e.stateNode!=null&&(c=e.memoizedProps,pu(e,c,r!==null?r.memoizedProps:c)),i&1024&&(vu=!0);break;case 6:if(Ot(t,e),zt(e),i&4){if(e.stateNode===null)throw Error(o(162));i=e.memoizedProps,r=e.stateNode;try{r.nodeValue=i}catch(pe){He(e,e.return,pe)}}break;case 3:if(Bl=null,c=fn,fn=_l(t.containerInfo),Ot(t,e),fn=c,zt(e),i&4&&r!==null&&r.memoizedState.isDehydrated)try{Pa(t.containerInfo)}catch(pe){He(e,e.return,pe)}vu&&(vu=!1,$p(e));break;case 4:i=fn,fn=_l(e.stateNode.containerInfo),Ot(t,e),zt(e),fn=i;break;case 12:Ot(t,e),zt(e);break;case 31:Ot(t,e),zt(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,Sl(e,i)));break;case 13:Ot(t,e),zt(e),e.child.flags&8192&&e.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(wl=nt()),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,Sl(e,i)));break;case 22:c=e.memoizedState!==null;var O=r!==null&&r.memoizedState!==null,F=qn,I=st;if(qn=F||c,st=I||O,Ot(t,e),st=I,qn=F,zt(e),i&8192)e:for(t=e.stateNode,t._visibility=c?t._visibility&-2:t._visibility|1,c&&(r===null||O||qn||st||Zr(e)),r=null,t=e;;){if(t.tag===5||t.tag===26){if(r===null){O=r=t;try{if(f=O.stateNode,c)y=f.style,typeof y.setProperty=="function"?y.setProperty("display","none","important"):y.display="none";else{w=O.stateNode;var re=O.memoizedProps.style,X=re!=null&&re.hasOwnProperty("display")?re.display:null;w.style.display=X==null||typeof X=="boolean"?"":(""+X).trim()}}catch(pe){He(O,O.return,pe)}}}else if(t.tag===6){if(r===null){O=t;try{O.stateNode.nodeValue=c?"":O.memoizedProps}catch(pe){He(O,O.return,pe)}}}else if(t.tag===18){if(r===null){O=t;try{var Q=O.stateNode;c?_g(Q,!0):_g(O.stateNode,!1)}catch(pe){He(O,O.return,pe)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;r===t&&(r=null),t=t.return}r===t&&(r=null),t.sibling.return=t.return,t=t.sibling}i&4&&(i=e.updateQueue,i!==null&&(r=i.retryQueue,r!==null&&(i.retryQueue=null,Sl(e,r))));break;case 19:Ot(t,e),zt(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,Sl(e,i)));break;case 30:break;case 21:break;default:Ot(t,e),zt(e)}}function zt(e){var t=e.flags;if(t&2){try{for(var r,i=e.return;i!==null;){if(Bp(i)){r=i;break}i=i.return}if(r==null)throw Error(o(160));switch(r.tag){case 27:var c=r.stateNode,f=gu(e);bl(e,f,c);break;case 5:var y=r.stateNode;r.flags&32&&(fa(y,""),r.flags&=-33);var w=gu(e);bl(e,w,y);break;case 3:case 4:var O=r.stateNode.containerInfo,F=gu(e);yu(e,F,O);break;default:throw Error(o(161))}}catch(I){He(e,e.return,I)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function $p(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;$p(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function Pn(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)Hp(e,t.alternate,t),t=t.sibling}function Zr(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:dr(4,t,t.return),Zr(t);break;case 1:Sn(t,t.return);var r=t.stateNode;typeof r.componentWillUnmount=="function"&&_p(t,t.return,r),Zr(t);break;case 27:Xi(t.stateNode);case 26:case 5:Sn(t,t.return),Zr(t);break;case 22:t.memoizedState===null&&Zr(t);break;case 30:Zr(t);break;default:Zr(t)}e=e.sibling}}function Gn(e,t,r){for(r=r&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var i=t.alternate,c=e,f=t,y=f.flags;switch(f.tag){case 0:case 11:case 15:Gn(c,f,r),Bi(4,f);break;case 1:if(Gn(c,f,r),i=f,c=i.stateNode,typeof c.componentDidMount=="function")try{c.componentDidMount()}catch(F){He(i,i.return,F)}if(i=f,c=i.updateQueue,c!==null){var w=i.stateNode;try{var O=c.shared.hiddenCallbacks;if(O!==null)for(c.shared.hiddenCallbacks=null,c=0;c<O.length;c++)wm(O[c],w)}catch(F){He(i,i.return,F)}}r&&y&64&&zp(f),Li(f,f.return);break;case 27:Lp(f);case 26:case 5:Gn(c,f,r),r&&i===null&&y&4&&Vp(f),Li(f,f.return);break;case 12:Gn(c,f,r);break;case 31:Gn(c,f,r),r&&y&4&&Pp(c,f);break;case 13:Gn(c,f,r),r&&y&4&&Gp(c,f);break;case 22:f.memoizedState===null&&Gn(c,f,r),Li(f,f.return);break;case 30:break;default:Gn(c,f,r)}t=t.sibling}}function xu(e,t){var r=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(r=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==r&&(e!=null&&e.refCount++,r!=null&&Ei(r))}function bu(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Ei(e))}function hn(e,t,r,i){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Xp(e,t,r,i),t=t.sibling}function Xp(e,t,r,i){var c=t.flags;switch(t.tag){case 0:case 11:case 15:hn(e,t,r,i),c&2048&&Bi(9,t);break;case 1:hn(e,t,r,i);break;case 3:hn(e,t,r,i),c&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Ei(e)));break;case 12:if(c&2048){hn(e,t,r,i),e=t.stateNode;try{var f=t.memoizedProps,y=f.id,w=f.onPostCommit;typeof w=="function"&&w(y,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(O){He(t,t.return,O)}}else hn(e,t,r,i);break;case 31:hn(e,t,r,i);break;case 13:hn(e,t,r,i);break;case 23:break;case 22:f=t.stateNode,y=t.alternate,t.memoizedState!==null?f._visibility&2?hn(e,t,r,i):Ui(e,t):f._visibility&2?hn(e,t,r,i):(f._visibility|=2,Ra(e,t,r,i,(t.subtreeFlags&10256)!==0||!1)),c&2048&&xu(y,t);break;case 24:hn(e,t,r,i),c&2048&&bu(t.alternate,t);break;default:hn(e,t,r,i)}}function Ra(e,t,r,i,c){for(c=c&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var f=e,y=t,w=r,O=i,F=y.flags;switch(y.tag){case 0:case 11:case 15:Ra(f,y,w,O,c),Bi(8,y);break;case 23:break;case 22:var I=y.stateNode;y.memoizedState!==null?I._visibility&2?Ra(f,y,w,O,c):Ui(f,y):(I._visibility|=2,Ra(f,y,w,O,c)),c&&F&2048&&xu(y.alternate,y);break;case 24:Ra(f,y,w,O,c),c&&F&2048&&bu(y.alternate,y);break;default:Ra(f,y,w,O,c)}t=t.sibling}}function Ui(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var r=e,i=t,c=i.flags;switch(i.tag){case 22:Ui(r,i),c&2048&&xu(i.alternate,i);break;case 24:Ui(r,i),c&2048&&bu(i.alternate,i);break;default:Ui(r,i)}t=t.sibling}}var Hi=8192;function Oa(e,t,r){if(e.subtreeFlags&Hi)for(e=e.child;e!==null;)Kp(e,t,r),e=e.sibling}function Kp(e,t,r){switch(e.tag){case 26:Oa(e,t,r),e.flags&Hi&&e.memoizedState!==null&&hj(r,fn,e.memoizedState,e.memoizedProps);break;case 5:Oa(e,t,r);break;case 3:case 4:var i=fn;fn=_l(e.stateNode.containerInfo),Oa(e,t,r),fn=i;break;case 22:e.memoizedState===null&&(i=e.alternate,i!==null&&i.memoizedState!==null?(i=Hi,Hi=16777216,Oa(e,t,r),Hi=i):Oa(e,t,r));break;default:Oa(e,t,r)}}function Zp(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function qi(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var r=0;r<t.length;r++){var i=t[r];ht=i,Jp(i,e)}Zp(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Qp(e),e=e.sibling}function Qp(e){switch(e.tag){case 0:case 11:case 15:qi(e),e.flags&2048&&dr(9,e,e.return);break;case 3:qi(e);break;case 12:qi(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,jl(e)):qi(e);break;default:qi(e)}}function jl(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var r=0;r<t.length;r++){var i=t[r];ht=i,Jp(i,e)}Zp(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:dr(8,t,t.return),jl(t);break;case 22:r=t.stateNode,r._visibility&2&&(r._visibility&=-3,jl(t));break;default:jl(t)}e=e.sibling}}function Jp(e,t){for(;ht!==null;){var r=ht;switch(r.tag){case 0:case 11:case 15:dr(8,r,t);break;case 23:case 22:if(r.memoizedState!==null&&r.memoizedState.cachePool!==null){var i=r.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:Ei(r.memoizedState.cache)}if(i=r.child,i!==null)i.return=r,ht=i;else e:for(r=e;ht!==null;){i=ht;var c=i.sibling,f=i.return;if(qp(i),i===r){ht=null;break e}if(c!==null){c.return=f,ht=c;break e}ht=f}}}var DS={getCacheForType:function(e){var t=yt(rt),r=t.data.get(e);return r===void 0&&(r=e(),t.data.set(e,r)),r},cacheSignal:function(){return yt(rt).controller.signal}},AS=typeof WeakMap=="function"?WeakMap:Map,Le=0,Ge=null,Ae=null,Re=0,Ue=0,Pt=null,fr=!1,za=!1,Su=!1,Fn=0,We=0,hr=0,Qr=0,ju=0,Gt=0,_a=0,Yi=null,_t=null,wu=!1,wl=0,Wp=0,El=1/0,Tl=null,mr=null,ut=0,pr=null,Va=null,$n=0,Eu=0,Tu=null,Ip=null,Pi=0,Cu=null;function Ft(){return(Le&2)!==0&&Re!==0?Re&-Re:P.T!==null?Ru():ph()}function eg(){if(Gt===0)if((Re&536870912)===0||ze){var e=Os;Os<<=1,(Os&3932160)===0&&(Os=262144),Gt=e}else Gt=536870912;return e=qt.current,e!==null&&(e.flags|=32),Gt}function Vt(e,t,r){(e===Ge&&(Ue===2||Ue===9)||e.cancelPendingCommit!==null)&&(Ba(e,0),gr(e,Re,Gt,!1)),ui(e,r),((Le&2)===0||e!==Ge)&&(e===Ge&&((Le&2)===0&&(Qr|=r),We===4&&gr(e,Re,Gt,!1)),jn(e))}function tg(e,t,r){if((Le&6)!==0)throw Error(o(327));var i=!r&&(t&127)===0&&(t&e.expiredLanes)===0||ci(e,t),c=i?RS(e,t):Du(e,t,!0),f=i;do{if(c===0){za&&!i&&gr(e,t,0,!1);break}else{if(r=e.current.alternate,f&&!kS(r)){c=Du(e,t,!1),f=!1;continue}if(c===2){if(f=t,e.errorRecoveryDisabledLanes&f)var y=0;else y=e.pendingLanes&-536870913,y=y!==0?y:y&536870912?536870912:0;if(y!==0){t=y;e:{var w=e;c=Yi;var O=w.current.memoizedState.isDehydrated;if(O&&(Ba(w,y).flags|=256),y=Du(w,y,!1),y!==2){if(Su&&!O){w.errorRecoveryDisabledLanes|=f,Qr|=f,c=4;break e}f=_t,_t=c,f!==null&&(_t===null?_t=f:_t.push.apply(_t,f))}c=y}if(f=!1,c!==2)continue}}if(c===1){Ba(e,0),gr(e,t,0,!0);break}e:{switch(i=e,f=c,f){case 0:case 1:throw Error(o(345));case 4:if((t&4194048)!==t)break;case 6:gr(i,t,Gt,!fr);break e;case 2:_t=null;break;case 3:case 5:break;default:throw Error(o(329))}if((t&62914560)===t&&(c=wl+300-nt(),10<c)){if(gr(i,t,Gt,!fr),_s(i,0,!0)!==0)break e;$n=t,i.timeoutHandle=Rg(ng.bind(null,i,r,_t,Tl,wu,t,Gt,Qr,_a,fr,f,"Throttled",-0,0),c);break e}ng(i,r,_t,Tl,wu,t,Gt,Qr,_a,fr,f,null,-0,0)}}break}while(!0);jn(e)}function ng(e,t,r,i,c,f,y,w,O,F,I,re,X,Q){if(e.timeoutHandle=-1,re=t.subtreeFlags,re&8192||(re&16785408)===16785408){re={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Mn},Kp(t,f,re);var pe=(f&62914560)===f?wl-nt():(f&4194048)===f?Wp-nt():0;if(pe=mj(re,pe),pe!==null){$n=f,e.cancelPendingCommit=pe(ug.bind(null,e,t,f,r,i,c,y,w,O,I,re,null,X,Q)),gr(e,f,y,!F);return}}ug(e,t,f,r,i,c,y,w,O)}function kS(e){for(var t=e;;){var r=t.tag;if((r===0||r===11||r===15)&&t.flags&16384&&(r=t.updateQueue,r!==null&&(r=r.stores,r!==null)))for(var i=0;i<r.length;i++){var c=r[i],f=c.getSnapshot;c=c.value;try{if(!Ut(f(),c))return!1}catch{return!1}}if(r=t.child,t.subtreeFlags&16384&&r!==null)r.return=t,t=r;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function gr(e,t,r,i){t&=~ju,t&=~Qr,e.suspendedLanes|=t,e.pingedLanes&=~t,i&&(e.warmLanes|=t),i=e.expirationTimes;for(var c=t;0<c;){var f=31-Lt(c),y=1<<f;i[f]=-1,c&=~y}r!==0&&fh(e,r,t)}function Cl(){return(Le&6)===0?(Gi(0),!1):!0}function Nu(){if(Ae!==null){if(Ue===0)var e=Ae.return;else e=Ae,_n=qr=null,Pc(e),Na=null,Ci=0,e=Ae;for(;e!==null;)Op(e.alternate,e),e=e.return;Ae=null}}function Ba(e,t){var r=e.timeoutHandle;r!==-1&&(e.timeoutHandle=-1,QS(r)),r=e.cancelPendingCommit,r!==null&&(e.cancelPendingCommit=null,r()),$n=0,Nu(),Ge=e,Ae=r=On(e.current,null),Re=t,Ue=0,Pt=null,fr=!1,za=ci(e,t),Su=!1,_a=Gt=ju=Qr=hr=We=0,_t=Yi=null,wu=!1,(t&8)!==0&&(t|=t&32);var i=e.entangledLanes;if(i!==0)for(e=e.entanglements,i&=t;0<i;){var c=31-Lt(i),f=1<<c;t|=e[c],i&=~f}return Fn=t,Xs(),r}function rg(e,t){Ee=null,P.H=zi,t===Ca||t===tl?(t=xm(),Ue=3):t===Mc?(t=xm(),Ue=4):Ue=t===iu?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,Pt=t,Ae===null&&(We=1,pl(e,Wt(t,e.current)))}function ag(){var e=qt.current;return e===null?!0:(Re&4194048)===Re?nn===null:(Re&62914560)===Re||(Re&536870912)!==0?e===nn:!1}function ig(){var e=P.H;return P.H=zi,e===null?zi:e}function sg(){var e=P.A;return P.A=DS,e}function Nl(){We=4,fr||(Re&4194048)!==Re&&qt.current!==null||(za=!0),(hr&134217727)===0&&(Qr&134217727)===0||Ge===null||gr(Ge,Re,Gt,!1)}function Du(e,t,r){var i=Le;Le|=2;var c=ig(),f=sg();(Ge!==e||Re!==t)&&(Tl=null,Ba(e,t)),t=!1;var y=We;e:do try{if(Ue!==0&&Ae!==null){var w=Ae,O=Pt;switch(Ue){case 8:Nu(),y=6;break e;case 3:case 2:case 9:case 6:qt.current===null&&(t=!0);var F=Ue;if(Ue=0,Pt=null,La(e,w,O,F),r&&za){y=0;break e}break;default:F=Ue,Ue=0,Pt=null,La(e,w,O,F)}}MS(),y=We;break}catch(I){rg(e,I)}while(!0);return t&&e.shellSuspendCounter++,_n=qr=null,Le=i,P.H=c,P.A=f,Ae===null&&(Ge=null,Re=0,Xs()),y}function MS(){for(;Ae!==null;)lg(Ae)}function RS(e,t){var r=Le;Le|=2;var i=ig(),c=sg();Ge!==e||Re!==t?(Tl=null,El=nt()+500,Ba(e,t)):za=ci(e,t);e:do try{if(Ue!==0&&Ae!==null){t=Ae;var f=Pt;t:switch(Ue){case 1:Ue=0,Pt=null,La(e,t,f,1);break;case 2:case 9:if(ym(f)){Ue=0,Pt=null,og(t);break}t=function(){Ue!==2&&Ue!==9||Ge!==e||(Ue=7),jn(e)},f.then(t,t);break e;case 3:Ue=7;break e;case 4:Ue=5;break e;case 7:ym(f)?(Ue=0,Pt=null,og(t)):(Ue=0,Pt=null,La(e,t,f,7));break;case 5:var y=null;switch(Ae.tag){case 26:y=Ae.memoizedState;case 5:case 27:var w=Ae;if(y?Xg(y):w.stateNode.complete){Ue=0,Pt=null;var O=w.sibling;if(O!==null)Ae=O;else{var F=w.return;F!==null?(Ae=F,Dl(F)):Ae=null}break t}}Ue=0,Pt=null,La(e,t,f,5);break;case 6:Ue=0,Pt=null,La(e,t,f,6);break;case 8:Nu(),We=6;break e;default:throw Error(o(462))}}OS();break}catch(I){rg(e,I)}while(!0);return _n=qr=null,P.H=i,P.A=c,Le=r,Ae!==null?0:(Ge=null,Re=0,Xs(),We)}function OS(){for(;Ae!==null&&!Jn();)lg(Ae)}function lg(e){var t=Mp(e.alternate,e,Fn);e.memoizedProps=e.pendingProps,t===null?Dl(e):Ae=t}function og(e){var t=e,r=t.alternate;switch(t.tag){case 15:case 0:t=Tp(r,t,t.pendingProps,t.type,void 0,Re);break;case 11:t=Tp(r,t,t.pendingProps,t.type.render,t.ref,Re);break;case 5:Pc(t);default:Op(r,t),t=Ae=sm(t,Fn),t=Mp(r,t,Fn)}e.memoizedProps=e.pendingProps,t===null?Dl(e):Ae=t}function La(e,t,r,i){_n=qr=null,Pc(t),Na=null,Ci=0;var c=t.return;try{if(SS(e,c,t,r,Re)){We=1,pl(e,Wt(r,e.current)),Ae=null;return}}catch(f){if(c!==null)throw Ae=c,f;We=1,pl(e,Wt(r,e.current)),Ae=null;return}t.flags&32768?(ze||i===1?e=!0:za||(Re&536870912)!==0?e=!1:(fr=e=!0,(i===2||i===9||i===3||i===6)&&(i=qt.current,i!==null&&i.tag===13&&(i.flags|=16384))),cg(t,e)):Dl(t)}function Dl(e){var t=e;do{if((t.flags&32768)!==0){cg(t,fr);return}e=t.return;var r=ES(t.alternate,t,Fn);if(r!==null){Ae=r;return}if(t=t.sibling,t!==null){Ae=t;return}Ae=t=e}while(t!==null);We===0&&(We=5)}function cg(e,t){do{var r=TS(e.alternate,e);if(r!==null){r.flags&=32767,Ae=r;return}if(r=e.return,r!==null&&(r.flags|=32768,r.subtreeFlags=0,r.deletions=null),!t&&(e=e.sibling,e!==null)){Ae=e;return}Ae=e=r}while(e!==null);We=6,Ae=null}function ug(e,t,r,i,c,f,y,w,O){e.cancelPendingCommit=null;do Al();while(ut!==0);if((Le&6)!==0)throw Error(o(327));if(t!==null){if(t===e.current)throw Error(o(177));if(f=t.lanes|t.childLanes,f|=gc,f1(e,r,f,y,w,O),e===Ge&&(Ae=Ge=null,Re=0),Va=t,pr=e,$n=r,Eu=f,Tu=c,Ip=i,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,BS(Rr,function(){return pg(),null})):(e.callbackNode=null,e.callbackPriority=0),i=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||i){i=P.T,P.T=null,c=oe.p,oe.p=2,y=Le,Le|=4;try{CS(e,t,r)}finally{Le=y,oe.p=c,P.T=i}}ut=1,dg(),fg(),hg()}}function dg(){if(ut===1){ut=0;var e=pr,t=Va,r=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||r){r=P.T,P.T=null;var i=oe.p;oe.p=2;var c=Le;Le|=4;try{Fp(t,e);var f=Hu,y=Jh(e.containerInfo),w=f.focusedElem,O=f.selectionRange;if(y!==w&&w&&w.ownerDocument&&Qh(w.ownerDocument.documentElement,w)){if(O!==null&&dc(w)){var F=O.start,I=O.end;if(I===void 0&&(I=F),"selectionStart"in w)w.selectionStart=F,w.selectionEnd=Math.min(I,w.value.length);else{var re=w.ownerDocument||document,X=re&&re.defaultView||window;if(X.getSelection){var Q=X.getSelection(),pe=w.textContent.length,Se=Math.min(O.start,pe),Pe=O.end===void 0?Se:Math.min(O.end,pe);!Q.extend&&Se>Pe&&(y=Pe,Pe=Se,Se=y);var q=Zh(w,Se),U=Zh(w,Pe);if(q&&U&&(Q.rangeCount!==1||Q.anchorNode!==q.node||Q.anchorOffset!==q.offset||Q.focusNode!==U.node||Q.focusOffset!==U.offset)){var G=re.createRange();G.setStart(q.node,q.offset),Q.removeAllRanges(),Se>Pe?(Q.addRange(G),Q.extend(U.node,U.offset)):(G.setEnd(U.node,U.offset),Q.addRange(G))}}}}for(re=[],Q=w;Q=Q.parentNode;)Q.nodeType===1&&re.push({element:Q,left:Q.scrollLeft,top:Q.scrollTop});for(typeof w.focus=="function"&&w.focus(),w=0;w<re.length;w++){var te=re[w];te.element.scrollLeft=te.left,te.element.scrollTop=te.top}}ql=!!Uu,Hu=Uu=null}finally{Le=c,oe.p=i,P.T=r}}e.current=t,ut=2}}function fg(){if(ut===2){ut=0;var e=pr,t=Va,r=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||r){r=P.T,P.T=null;var i=oe.p;oe.p=2;var c=Le;Le|=4;try{Hp(e,t.alternate,t)}finally{Le=c,oe.p=i,P.T=r}}ut=3}}function hg(){if(ut===4||ut===3){ut=0,wt();var e=pr,t=Va,r=$n,i=Ip;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?ut=5:(ut=0,Va=pr=null,mg(e,e.pendingLanes));var c=e.pendingLanes;if(c===0&&(mr=null),$o(r),t=t.stateNode,Bt&&typeof Bt.onCommitFiberRoot=="function")try{Bt.onCommitFiberRoot(Wn,t,void 0,(t.current.flags&128)===128)}catch{}if(i!==null){t=P.T,c=oe.p,oe.p=2,P.T=null;try{for(var f=e.onRecoverableError,y=0;y<i.length;y++){var w=i[y];f(w.value,{componentStack:w.stack})}}finally{P.T=t,oe.p=c}}($n&3)!==0&&Al(),jn(e),c=e.pendingLanes,(r&261930)!==0&&(c&42)!==0?e===Cu?Pi++:(Pi=0,Cu=e):Pi=0,Gi(0)}}function mg(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Ei(t)))}function Al(){return dg(),fg(),hg(),pg()}function pg(){if(ut!==5)return!1;var e=pr,t=Eu;Eu=0;var r=$o($n),i=P.T,c=oe.p;try{oe.p=32>r?32:r,P.T=null,r=Tu,Tu=null;var f=pr,y=$n;if(ut=0,Va=pr=null,$n=0,(Le&6)!==0)throw Error(o(331));var w=Le;if(Le|=4,Qp(f.current),Xp(f,f.current,y,r),Le=w,Gi(0,!1),Bt&&typeof Bt.onPostCommitFiberRoot=="function")try{Bt.onPostCommitFiberRoot(Wn,f)}catch{}return!0}finally{oe.p=c,P.T=i,mg(e,t)}}function gg(e,t,r){t=Wt(r,t),t=au(e.stateNode,t,2),e=or(e,t,2),e!==null&&(ui(e,2),jn(e))}function He(e,t,r){if(e.tag===3)gg(e,e,r);else for(;t!==null;){if(t.tag===3){gg(t,e,r);break}else if(t.tag===1){var i=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(mr===null||!mr.has(i))){e=Wt(r,e),r=yp(2),i=or(t,r,2),i!==null&&(vp(r,i,t,e),ui(i,2),jn(i));break}}t=t.return}}function Au(e,t,r){var i=e.pingCache;if(i===null){i=e.pingCache=new AS;var c=new Set;i.set(t,c)}else c=i.get(t),c===void 0&&(c=new Set,i.set(t,c));c.has(r)||(Su=!0,c.add(r),e=zS.bind(null,e,t,r),t.then(e,e))}function zS(e,t,r){var i=e.pingCache;i!==null&&i.delete(t),e.pingedLanes|=e.suspendedLanes&r,e.warmLanes&=~r,Ge===e&&(Re&r)===r&&(We===4||We===3&&(Re&62914560)===Re&&300>nt()-wl?(Le&2)===0&&Ba(e,0):ju|=r,_a===Re&&(_a=0)),jn(e)}function yg(e,t){t===0&&(t=dh()),e=Lr(e,t),e!==null&&(ui(e,t),jn(e))}function _S(e){var t=e.memoizedState,r=0;t!==null&&(r=t.retryLane),yg(e,r)}function VS(e,t){var r=0;switch(e.tag){case 31:case 13:var i=e.stateNode,c=e.memoizedState;c!==null&&(r=c.retryLane);break;case 19:i=e.stateNode;break;case 22:i=e.stateNode._retryCache;break;default:throw Error(o(314))}i!==null&&i.delete(t),yg(e,r)}function BS(e,t){return ia(e,t)}var kl=null,Ua=null,ku=!1,Ml=!1,Mu=!1,yr=0;function jn(e){e!==Ua&&e.next===null&&(Ua===null?kl=Ua=e:Ua=Ua.next=e),Ml=!0,ku||(ku=!0,US())}function Gi(e,t){if(!Mu&&Ml){Mu=!0;do for(var r=!1,i=kl;i!==null;){if(e!==0){var c=i.pendingLanes;if(c===0)var f=0;else{var y=i.suspendedLanes,w=i.pingedLanes;f=(1<<31-Lt(42|e)+1)-1,f&=c&~(y&~w),f=f&201326741?f&201326741|1:f?f|2:0}f!==0&&(r=!0,Sg(i,f))}else f=Re,f=_s(i,i===Ge?f:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),(f&3)===0||ci(i,f)||(r=!0,Sg(i,f));i=i.next}while(r);Mu=!1}}function LS(){vg()}function vg(){Ml=ku=!1;var e=0;yr!==0&&ZS()&&(e=yr);for(var t=nt(),r=null,i=kl;i!==null;){var c=i.next,f=xg(i,t);f===0?(i.next=null,r===null?kl=c:r.next=c,c===null&&(Ua=r)):(r=i,(e!==0||(f&3)!==0)&&(Ml=!0)),i=c}ut!==0&&ut!==5||Gi(e),yr!==0&&(yr=0)}function xg(e,t){for(var r=e.suspendedLanes,i=e.pingedLanes,c=e.expirationTimes,f=e.pendingLanes&-62914561;0<f;){var y=31-Lt(f),w=1<<y,O=c[y];O===-1?((w&r)===0||(w&i)!==0)&&(c[y]=d1(w,t)):O<=t&&(e.expiredLanes|=w),f&=~w}if(t=Ge,r=Re,r=_s(e,e===t?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i=e.callbackNode,r===0||e===t&&(Ue===2||Ue===9)||e.cancelPendingCommit!==null)return i!==null&&i!==null&&_e(i),e.callbackNode=null,e.callbackPriority=0;if((r&3)===0||ci(e,r)){if(t=r&-r,t===e.callbackPriority)return t;switch(i!==null&&_e(i),$o(r)){case 2:case 8:r=oi;break;case 32:r=Rr;break;case 268435456:r=je;break;default:r=Rr}return i=bg.bind(null,e),r=ia(r,i),e.callbackPriority=t,e.callbackNode=r,t}return i!==null&&i!==null&&_e(i),e.callbackPriority=2,e.callbackNode=null,2}function bg(e,t){if(ut!==0&&ut!==5)return e.callbackNode=null,e.callbackPriority=0,null;var r=e.callbackNode;if(Al()&&e.callbackNode!==r)return null;var i=Re;return i=_s(e,e===Ge?i:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i===0?null:(tg(e,i,t),xg(e,nt()),e.callbackNode!=null&&e.callbackNode===r?bg.bind(null,e):null)}function Sg(e,t){if(Al())return null;tg(e,t,!0)}function US(){JS(function(){(Le&6)!==0?ia(Et,LS):vg()})}function Ru(){if(yr===0){var e=Ea;e===0&&(e=Rs,Rs<<=1,(Rs&261888)===0&&(Rs=256)),yr=e}return yr}function jg(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Us(""+e)}function wg(e,t){var r=t.ownerDocument.createElement("input");return r.name=t.name,r.value=t.value,e.id&&r.setAttribute("form",e.id),t.parentNode.insertBefore(r,t),e=new FormData(e),r.parentNode.removeChild(r),e}function HS(e,t,r,i,c){if(t==="submit"&&r&&r.stateNode===c){var f=jg((c[kt]||null).action),y=i.submitter;y&&(t=(t=y[kt]||null)?jg(t.formAction):y.getAttribute("formAction"),t!==null&&(f=t,y=null));var w=new Ps("action","action",null,i,c);e.push({event:w,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(yr!==0){var O=y?wg(c,y):new FormData(c);Wc(r,{pending:!0,data:O,method:c.method,action:f},null,O)}}else typeof f=="function"&&(w.preventDefault(),O=y?wg(c,y):new FormData(c),Wc(r,{pending:!0,data:O,method:c.method,action:f},f,O))},currentTarget:c}]})}}for(var Ou=0;Ou<pc.length;Ou++){var zu=pc[Ou],qS=zu.toLowerCase(),YS=zu[0].toUpperCase()+zu.slice(1);dn(qS,"on"+YS)}dn(em,"onAnimationEnd"),dn(tm,"onAnimationIteration"),dn(nm,"onAnimationStart"),dn("dblclick","onDoubleClick"),dn("focusin","onFocus"),dn("focusout","onBlur"),dn(aS,"onTransitionRun"),dn(iS,"onTransitionStart"),dn(sS,"onTransitionCancel"),dn(rm,"onTransitionEnd"),ua("onMouseEnter",["mouseout","mouseover"]),ua("onMouseLeave",["mouseout","mouseover"]),ua("onPointerEnter",["pointerout","pointerover"]),ua("onPointerLeave",["pointerout","pointerover"]),zr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),zr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),zr("onBeforeInput",["compositionend","keypress","textInput","paste"]),zr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),zr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),zr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Fi="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),PS=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Fi));function Eg(e,t){t=(t&4)!==0;for(var r=0;r<e.length;r++){var i=e[r],c=i.event;i=i.listeners;e:{var f=void 0;if(t)for(var y=i.length-1;0<=y;y--){var w=i[y],O=w.instance,F=w.currentTarget;if(w=w.listener,O!==f&&c.isPropagationStopped())break e;f=w,c.currentTarget=F;try{f(c)}catch(I){$s(I)}c.currentTarget=null,f=O}else for(y=0;y<i.length;y++){if(w=i[y],O=w.instance,F=w.currentTarget,w=w.listener,O!==f&&c.isPropagationStopped())break e;f=w,c.currentTarget=F;try{f(c)}catch(I){$s(I)}c.currentTarget=null,f=O}}}}function ke(e,t){var r=t[Xo];r===void 0&&(r=t[Xo]=new Set);var i=e+"__bubble";r.has(i)||(Tg(t,e,2,!1),r.add(i))}function _u(e,t,r){var i=0;t&&(i|=4),Tg(r,e,i,t)}var Rl="_reactListening"+Math.random().toString(36).slice(2);function Vu(e){if(!e[Rl]){e[Rl]=!0,vh.forEach(function(r){r!=="selectionchange"&&(PS.has(r)||_u(r,!1,e),_u(r,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Rl]||(t[Rl]=!0,_u("selectionchange",!1,t))}}function Tg(e,t,r,i){switch(ey(t)){case 2:var c=yj;break;case 8:c=vj;break;default:c=Ju}r=c.bind(null,t,r,e),c=void 0,!nc||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(c=!0),i?c!==void 0?e.addEventListener(t,r,{capture:!0,passive:c}):e.addEventListener(t,r,!0):c!==void 0?e.addEventListener(t,r,{passive:c}):e.addEventListener(t,r,!1)}function Bu(e,t,r,i,c){var f=i;if((t&1)===0&&(t&2)===0&&i!==null)e:for(;;){if(i===null)return;var y=i.tag;if(y===3||y===4){var w=i.stateNode.containerInfo;if(w===c)break;if(y===4)for(y=i.return;y!==null;){var O=y.tag;if((O===3||O===4)&&y.stateNode.containerInfo===c)return;y=y.return}for(;w!==null;){if(y=la(w),y===null)return;if(O=y.tag,O===5||O===6||O===26||O===27){i=f=y;continue e}w=w.parentNode}}i=i.return}kh(function(){var F=f,I=ec(r),re=[];e:{var X=am.get(e);if(X!==void 0){var Q=Ps,pe=e;switch(e){case"keypress":if(qs(r)===0)break e;case"keydown":case"keyup":Q=V1;break;case"focusin":pe="focus",Q=sc;break;case"focusout":pe="blur",Q=sc;break;case"beforeblur":case"afterblur":Q=sc;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":Q=Oh;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":Q=E1;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":Q=U1;break;case em:case tm:case nm:Q=N1;break;case rm:Q=q1;break;case"scroll":case"scrollend":Q=j1;break;case"wheel":Q=P1;break;case"copy":case"cut":case"paste":Q=A1;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":Q=_h;break;case"toggle":case"beforetoggle":Q=F1}var Se=(t&4)!==0,Pe=!Se&&(e==="scroll"||e==="scrollend"),q=Se?X!==null?X+"Capture":null:X;Se=[];for(var U=F,G;U!==null;){var te=U;if(G=te.stateNode,te=te.tag,te!==5&&te!==26&&te!==27||G===null||q===null||(te=hi(U,q),te!=null&&Se.push($i(U,te,G))),Pe)break;U=U.return}0<Se.length&&(X=new Q(X,pe,null,r,I),re.push({event:X,listeners:Se}))}}if((t&7)===0){e:{if(X=e==="mouseover"||e==="pointerover",Q=e==="mouseout"||e==="pointerout",X&&r!==Io&&(pe=r.relatedTarget||r.fromElement)&&(la(pe)||pe[sa]))break e;if((Q||X)&&(X=I.window===I?I:(X=I.ownerDocument)?X.defaultView||X.parentWindow:window,Q?(pe=r.relatedTarget||r.toElement,Q=F,pe=pe?la(pe):null,pe!==null&&(Pe=h(pe),Se=pe.tag,pe!==Pe||Se!==5&&Se!==27&&Se!==6)&&(pe=null)):(Q=null,pe=F),Q!==pe)){if(Se=Oh,te="onMouseLeave",q="onMouseEnter",U="mouse",(e==="pointerout"||e==="pointerover")&&(Se=_h,te="onPointerLeave",q="onPointerEnter",U="pointer"),Pe=Q==null?X:fi(Q),G=pe==null?X:fi(pe),X=new Se(te,U+"leave",Q,r,I),X.target=Pe,X.relatedTarget=G,te=null,la(I)===F&&(Se=new Se(q,U+"enter",pe,r,I),Se.target=G,Se.relatedTarget=Pe,te=Se),Pe=te,Q&&pe)t:{for(Se=GS,q=Q,U=pe,G=0,te=q;te;te=Se(te))G++;te=0;for(var be=U;be;be=Se(be))te++;for(;0<G-te;)q=Se(q),G--;for(;0<te-G;)U=Se(U),te--;for(;G--;){if(q===U||U!==null&&q===U.alternate){Se=q;break t}q=Se(q),U=Se(U)}Se=null}else Se=null;Q!==null&&Cg(re,X,Q,Se,!1),pe!==null&&Pe!==null&&Cg(re,Pe,pe,Se,!0)}}e:{if(X=F?fi(F):window,Q=X.nodeName&&X.nodeName.toLowerCase(),Q==="select"||Q==="input"&&X.type==="file")var Ve=Ph;else if(qh(X))if(Gh)Ve=tS;else{Ve=I1;var ve=W1}else Q=X.nodeName,!Q||Q.toLowerCase()!=="input"||X.type!=="checkbox"&&X.type!=="radio"?F&&Wo(F.elementType)&&(Ve=Ph):Ve=eS;if(Ve&&(Ve=Ve(e,F))){Yh(re,Ve,r,I);break e}ve&&ve(e,X,F),e==="focusout"&&F&&X.type==="number"&&F.memoizedProps.value!=null&&Jo(X,"number",X.value)}switch(ve=F?fi(F):window,e){case"focusin":(qh(ve)||ve.contentEditable==="true")&&(ga=ve,fc=F,Si=null);break;case"focusout":Si=fc=ga=null;break;case"mousedown":hc=!0;break;case"contextmenu":case"mouseup":case"dragend":hc=!1,Wh(re,r,I);break;case"selectionchange":if(rS)break;case"keydown":case"keyup":Wh(re,r,I)}var Ce;if(oc)e:{switch(e){case"compositionstart":var Oe="onCompositionStart";break e;case"compositionend":Oe="onCompositionEnd";break e;case"compositionupdate":Oe="onCompositionUpdate";break e}Oe=void 0}else pa?Uh(e,r)&&(Oe="onCompositionEnd"):e==="keydown"&&r.keyCode===229&&(Oe="onCompositionStart");Oe&&(Vh&&r.locale!=="ko"&&(pa||Oe!=="onCompositionStart"?Oe==="onCompositionEnd"&&pa&&(Ce=Mh()):(tr=I,rc="value"in tr?tr.value:tr.textContent,pa=!0)),ve=Ol(F,Oe),0<ve.length&&(Oe=new zh(Oe,e,null,r,I),re.push({event:Oe,listeners:ve}),Ce?Oe.data=Ce:(Ce=Hh(r),Ce!==null&&(Oe.data=Ce)))),(Ce=X1?K1(e,r):Z1(e,r))&&(Oe=Ol(F,"onBeforeInput"),0<Oe.length&&(ve=new zh("onBeforeInput","beforeinput",null,r,I),re.push({event:ve,listeners:Oe}),ve.data=Ce)),HS(re,e,F,r,I)}Eg(re,t)})}function $i(e,t,r){return{instance:e,listener:t,currentTarget:r}}function Ol(e,t){for(var r=t+"Capture",i=[];e!==null;){var c=e,f=c.stateNode;if(c=c.tag,c!==5&&c!==26&&c!==27||f===null||(c=hi(e,r),c!=null&&i.unshift($i(e,c,f)),c=hi(e,t),c!=null&&i.push($i(e,c,f))),e.tag===3)return i;e=e.return}return[]}function GS(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Cg(e,t,r,i,c){for(var f=t._reactName,y=[];r!==null&&r!==i;){var w=r,O=w.alternate,F=w.stateNode;if(w=w.tag,O!==null&&O===i)break;w!==5&&w!==26&&w!==27||F===null||(O=F,c?(F=hi(r,f),F!=null&&y.unshift($i(r,F,O))):c||(F=hi(r,f),F!=null&&y.push($i(r,F,O)))),r=r.return}y.length!==0&&e.push({event:t,listeners:y})}var FS=/\r\n?/g,$S=/\u0000|\uFFFD/g;function Ng(e){return(typeof e=="string"?e:""+e).replace(FS,`
`).replace($S,"")}function Dg(e,t){return t=Ng(t),Ng(e)===t}function Ye(e,t,r,i,c,f){switch(r){case"children":typeof i=="string"?t==="body"||t==="textarea"&&i===""||fa(e,i):(typeof i=="number"||typeof i=="bigint")&&t!=="body"&&fa(e,""+i);break;case"className":Bs(e,"class",i);break;case"tabIndex":Bs(e,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":Bs(e,r,i);break;case"style":Dh(e,i,f);break;case"data":if(t!=="object"){Bs(e,"data",i);break}case"src":case"href":if(i===""&&(t!=="a"||r!=="href")){e.removeAttribute(r);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(r);break}i=Us(""+i),e.setAttribute(r,i);break;case"action":case"formAction":if(typeof i=="function"){e.setAttribute(r,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof f=="function"&&(r==="formAction"?(t!=="input"&&Ye(e,t,"name",c.name,c,null),Ye(e,t,"formEncType",c.formEncType,c,null),Ye(e,t,"formMethod",c.formMethod,c,null),Ye(e,t,"formTarget",c.formTarget,c,null)):(Ye(e,t,"encType",c.encType,c,null),Ye(e,t,"method",c.method,c,null),Ye(e,t,"target",c.target,c,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(r);break}i=Us(""+i),e.setAttribute(r,i);break;case"onClick":i!=null&&(e.onclick=Mn);break;case"onScroll":i!=null&&ke("scroll",e);break;case"onScrollEnd":i!=null&&ke("scrollend",e);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(o(61));if(r=i.__html,r!=null){if(c.children!=null)throw Error(o(60));e.innerHTML=r}}break;case"multiple":e.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":e.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){e.removeAttribute("xlink:href");break}r=Us(""+i),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",r);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(r,""+i):e.removeAttribute(r);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(r,""):e.removeAttribute(r);break;case"capture":case"download":i===!0?e.setAttribute(r,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(r,i):e.removeAttribute(r);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?e.setAttribute(r,i):e.removeAttribute(r);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?e.removeAttribute(r):e.setAttribute(r,i);break;case"popover":ke("beforetoggle",e),ke("toggle",e),Vs(e,"popover",i);break;case"xlinkActuate":kn(e,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":kn(e,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":kn(e,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":kn(e,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":kn(e,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":kn(e,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":kn(e,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":kn(e,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":kn(e,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":Vs(e,"is",i);break;case"innerText":case"textContent":break;default:(!(2<r.length)||r[0]!=="o"&&r[0]!=="O"||r[1]!=="n"&&r[1]!=="N")&&(r=b1.get(r)||r,Vs(e,r,i))}}function Lu(e,t,r,i,c,f){switch(r){case"style":Dh(e,i,f);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(o(61));if(r=i.__html,r!=null){if(c.children!=null)throw Error(o(60));e.innerHTML=r}}break;case"children":typeof i=="string"?fa(e,i):(typeof i=="number"||typeof i=="bigint")&&fa(e,""+i);break;case"onScroll":i!=null&&ke("scroll",e);break;case"onScrollEnd":i!=null&&ke("scrollend",e);break;case"onClick":i!=null&&(e.onclick=Mn);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!xh.hasOwnProperty(r))e:{if(r[0]==="o"&&r[1]==="n"&&(c=r.endsWith("Capture"),t=r.slice(2,c?r.length-7:void 0),f=e[kt]||null,f=f!=null?f[r]:null,typeof f=="function"&&e.removeEventListener(t,f,c),typeof i=="function")){typeof f!="function"&&f!==null&&(r in e?e[r]=null:e.hasAttribute(r)&&e.removeAttribute(r)),e.addEventListener(t,i,c);break e}r in e?e[r]=i:i===!0?e.setAttribute(r,""):Vs(e,r,i)}}}function xt(e,t,r){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":ke("error",e),ke("load",e);var i=!1,c=!1,f;for(f in r)if(r.hasOwnProperty(f)){var y=r[f];if(y!=null)switch(f){case"src":i=!0;break;case"srcSet":c=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(o(137,t));default:Ye(e,t,f,y,r,null)}}c&&Ye(e,t,"srcSet",r.srcSet,r,null),i&&Ye(e,t,"src",r.src,r,null);return;case"input":ke("invalid",e);var w=f=y=c=null,O=null,F=null;for(i in r)if(r.hasOwnProperty(i)){var I=r[i];if(I!=null)switch(i){case"name":c=I;break;case"type":y=I;break;case"checked":O=I;break;case"defaultChecked":F=I;break;case"value":f=I;break;case"defaultValue":w=I;break;case"children":case"dangerouslySetInnerHTML":if(I!=null)throw Error(o(137,t));break;default:Ye(e,t,i,I,r,null)}}Eh(e,f,w,O,F,y,c,!1);return;case"select":ke("invalid",e),i=y=f=null;for(c in r)if(r.hasOwnProperty(c)&&(w=r[c],w!=null))switch(c){case"value":f=w;break;case"defaultValue":y=w;break;case"multiple":i=w;default:Ye(e,t,c,w,r,null)}t=f,r=y,e.multiple=!!i,t!=null?da(e,!!i,t,!1):r!=null&&da(e,!!i,r,!0);return;case"textarea":ke("invalid",e),f=c=i=null;for(y in r)if(r.hasOwnProperty(y)&&(w=r[y],w!=null))switch(y){case"value":i=w;break;case"defaultValue":c=w;break;case"children":f=w;break;case"dangerouslySetInnerHTML":if(w!=null)throw Error(o(91));break;default:Ye(e,t,y,w,r,null)}Ch(e,i,c,f);return;case"option":for(O in r)if(r.hasOwnProperty(O)&&(i=r[O],i!=null))switch(O){case"selected":e.selected=i&&typeof i!="function"&&typeof i!="symbol";break;default:Ye(e,t,O,i,r,null)}return;case"dialog":ke("beforetoggle",e),ke("toggle",e),ke("cancel",e),ke("close",e);break;case"iframe":case"object":ke("load",e);break;case"video":case"audio":for(i=0;i<Fi.length;i++)ke(Fi[i],e);break;case"image":ke("error",e),ke("load",e);break;case"details":ke("toggle",e);break;case"embed":case"source":case"link":ke("error",e),ke("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(F in r)if(r.hasOwnProperty(F)&&(i=r[F],i!=null))switch(F){case"children":case"dangerouslySetInnerHTML":throw Error(o(137,t));default:Ye(e,t,F,i,r,null)}return;default:if(Wo(t)){for(I in r)r.hasOwnProperty(I)&&(i=r[I],i!==void 0&&Lu(e,t,I,i,r,void 0));return}}for(w in r)r.hasOwnProperty(w)&&(i=r[w],i!=null&&Ye(e,t,w,i,r,null))}function XS(e,t,r,i){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var c=null,f=null,y=null,w=null,O=null,F=null,I=null;for(Q in r){var re=r[Q];if(r.hasOwnProperty(Q)&&re!=null)switch(Q){case"checked":break;case"value":break;case"defaultValue":O=re;default:i.hasOwnProperty(Q)||Ye(e,t,Q,null,i,re)}}for(var X in i){var Q=i[X];if(re=r[X],i.hasOwnProperty(X)&&(Q!=null||re!=null))switch(X){case"type":f=Q;break;case"name":c=Q;break;case"checked":F=Q;break;case"defaultChecked":I=Q;break;case"value":y=Q;break;case"defaultValue":w=Q;break;case"children":case"dangerouslySetInnerHTML":if(Q!=null)throw Error(o(137,t));break;default:Q!==re&&Ye(e,t,X,Q,i,re)}}Qo(e,y,w,O,F,I,f,c);return;case"select":Q=y=w=X=null;for(f in r)if(O=r[f],r.hasOwnProperty(f)&&O!=null)switch(f){case"value":break;case"multiple":Q=O;default:i.hasOwnProperty(f)||Ye(e,t,f,null,i,O)}for(c in i)if(f=i[c],O=r[c],i.hasOwnProperty(c)&&(f!=null||O!=null))switch(c){case"value":X=f;break;case"defaultValue":w=f;break;case"multiple":y=f;default:f!==O&&Ye(e,t,c,f,i,O)}t=w,r=y,i=Q,X!=null?da(e,!!r,X,!1):!!i!=!!r&&(t!=null?da(e,!!r,t,!0):da(e,!!r,r?[]:"",!1));return;case"textarea":Q=X=null;for(w in r)if(c=r[w],r.hasOwnProperty(w)&&c!=null&&!i.hasOwnProperty(w))switch(w){case"value":break;case"children":break;default:Ye(e,t,w,null,i,c)}for(y in i)if(c=i[y],f=r[y],i.hasOwnProperty(y)&&(c!=null||f!=null))switch(y){case"value":X=c;break;case"defaultValue":Q=c;break;case"children":break;case"dangerouslySetInnerHTML":if(c!=null)throw Error(o(91));break;default:c!==f&&Ye(e,t,y,c,i,f)}Th(e,X,Q);return;case"option":for(var pe in r)if(X=r[pe],r.hasOwnProperty(pe)&&X!=null&&!i.hasOwnProperty(pe))switch(pe){case"selected":e.selected=!1;break;default:Ye(e,t,pe,null,i,X)}for(O in i)if(X=i[O],Q=r[O],i.hasOwnProperty(O)&&X!==Q&&(X!=null||Q!=null))switch(O){case"selected":e.selected=X&&typeof X!="function"&&typeof X!="symbol";break;default:Ye(e,t,O,X,i,Q)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var Se in r)X=r[Se],r.hasOwnProperty(Se)&&X!=null&&!i.hasOwnProperty(Se)&&Ye(e,t,Se,null,i,X);for(F in i)if(X=i[F],Q=r[F],i.hasOwnProperty(F)&&X!==Q&&(X!=null||Q!=null))switch(F){case"children":case"dangerouslySetInnerHTML":if(X!=null)throw Error(o(137,t));break;default:Ye(e,t,F,X,i,Q)}return;default:if(Wo(t)){for(var Pe in r)X=r[Pe],r.hasOwnProperty(Pe)&&X!==void 0&&!i.hasOwnProperty(Pe)&&Lu(e,t,Pe,void 0,i,X);for(I in i)X=i[I],Q=r[I],!i.hasOwnProperty(I)||X===Q||X===void 0&&Q===void 0||Lu(e,t,I,X,i,Q);return}}for(var q in r)X=r[q],r.hasOwnProperty(q)&&X!=null&&!i.hasOwnProperty(q)&&Ye(e,t,q,null,i,X);for(re in i)X=i[re],Q=r[re],!i.hasOwnProperty(re)||X===Q||X==null&&Q==null||Ye(e,t,re,X,i,Q)}function Ag(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function KS(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,r=performance.getEntriesByType("resource"),i=0;i<r.length;i++){var c=r[i],f=c.transferSize,y=c.initiatorType,w=c.duration;if(f&&w&&Ag(y)){for(y=0,w=c.responseEnd,i+=1;i<r.length;i++){var O=r[i],F=O.startTime;if(F>w)break;var I=O.transferSize,re=O.initiatorType;I&&Ag(re)&&(O=O.responseEnd,y+=I*(O<w?1:(w-F)/(O-F)))}if(--i,t+=8*(f+y)/(c.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Uu=null,Hu=null;function zl(e){return e.nodeType===9?e:e.ownerDocument}function kg(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Mg(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function qu(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Yu=null;function ZS(){var e=window.event;return e&&e.type==="popstate"?e===Yu?!1:(Yu=e,!0):(Yu=null,!1)}var Rg=typeof setTimeout=="function"?setTimeout:void 0,QS=typeof clearTimeout=="function"?clearTimeout:void 0,Og=typeof Promise=="function"?Promise:void 0,JS=typeof queueMicrotask=="function"?queueMicrotask:typeof Og<"u"?function(e){return Og.resolve(null).then(e).catch(WS)}:Rg;function WS(e){setTimeout(function(){throw e})}function vr(e){return e==="head"}function zg(e,t){var r=t,i=0;do{var c=r.nextSibling;if(e.removeChild(r),c&&c.nodeType===8)if(r=c.data,r==="/$"||r==="/&"){if(i===0){e.removeChild(c),Pa(t);return}i--}else if(r==="$"||r==="$?"||r==="$~"||r==="$!"||r==="&")i++;else if(r==="html")Xi(e.ownerDocument.documentElement);else if(r==="head"){r=e.ownerDocument.head,Xi(r);for(var f=r.firstChild;f;){var y=f.nextSibling,w=f.nodeName;f[di]||w==="SCRIPT"||w==="STYLE"||w==="LINK"&&f.rel.toLowerCase()==="stylesheet"||r.removeChild(f),f=y}}else r==="body"&&Xi(e.ownerDocument.body);r=c}while(r);Pa(t)}function _g(e,t){var r=e;e=0;do{var i=r.nextSibling;if(r.nodeType===1?t?(r._stashedDisplay=r.style.display,r.style.display="none"):(r.style.display=r._stashedDisplay||"",r.getAttribute("style")===""&&r.removeAttribute("style")):r.nodeType===3&&(t?(r._stashedText=r.nodeValue,r.nodeValue=""):r.nodeValue=r._stashedText||""),i&&i.nodeType===8)if(r=i.data,r==="/$"){if(e===0)break;e--}else r!=="$"&&r!=="$?"&&r!=="$~"&&r!=="$!"||e++;r=i}while(r)}function Pu(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var r=t;switch(t=t.nextSibling,r.nodeName){case"HTML":case"HEAD":case"BODY":Pu(r),Ko(r);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(r.rel.toLowerCase()==="stylesheet")continue}e.removeChild(r)}}function IS(e,t,r,i){for(;e.nodeType===1;){var c=r;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!i&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(i){if(!e[di])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(f=e.getAttribute("rel"),f==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(f!==c.rel||e.getAttribute("href")!==(c.href==null||c.href===""?null:c.href)||e.getAttribute("crossorigin")!==(c.crossOrigin==null?null:c.crossOrigin)||e.getAttribute("title")!==(c.title==null?null:c.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(f=e.getAttribute("src"),(f!==(c.src==null?null:c.src)||e.getAttribute("type")!==(c.type==null?null:c.type)||e.getAttribute("crossorigin")!==(c.crossOrigin==null?null:c.crossOrigin))&&f&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var f=c.name==null?null:""+c.name;if(c.type==="hidden"&&e.getAttribute("name")===f)return e}else return e;if(e=rn(e.nextSibling),e===null)break}return null}function ej(e,t,r){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!r||(e=rn(e.nextSibling),e===null))return null;return e}function Vg(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=rn(e.nextSibling),e===null))return null;return e}function Gu(e){return e.data==="$?"||e.data==="$~"}function Fu(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function tj(e,t){var r=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||r.readyState!=="loading")t();else{var i=function(){t(),r.removeEventListener("DOMContentLoaded",i)};r.addEventListener("DOMContentLoaded",i),e._reactRetry=i}}function rn(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var $u=null;function Bg(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="/$"||r==="/&"){if(t===0)return rn(e.nextSibling);t--}else r!=="$"&&r!=="$!"&&r!=="$?"&&r!=="$~"&&r!=="&"||t++}e=e.nextSibling}return null}function Lg(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="$"||r==="$!"||r==="$?"||r==="$~"||r==="&"){if(t===0)return e;t--}else r!=="/$"&&r!=="/&"||t++}e=e.previousSibling}return null}function Ug(e,t,r){switch(t=zl(r),e){case"html":if(e=t.documentElement,!e)throw Error(o(452));return e;case"head":if(e=t.head,!e)throw Error(o(453));return e;case"body":if(e=t.body,!e)throw Error(o(454));return e;default:throw Error(o(451))}}function Xi(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Ko(e)}var an=new Map,Hg=new Set;function _l(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Xn=oe.d;oe.d={f:nj,r:rj,D:aj,C:ij,L:sj,m:lj,X:cj,S:oj,M:uj};function nj(){var e=Xn.f(),t=Cl();return e||t}function rj(e){var t=oa(e);t!==null&&t.tag===5&&t.type==="form"?rp(t):Xn.r(e)}var Ha=typeof document>"u"?null:document;function qg(e,t,r){var i=Ha;if(i&&typeof t=="string"&&t){var c=Qt(t);c='link[rel="'+e+'"][href="'+c+'"]',typeof r=="string"&&(c+='[crossorigin="'+r+'"]'),Hg.has(c)||(Hg.add(c),e={rel:e,crossOrigin:r,href:t},i.querySelector(c)===null&&(t=i.createElement("link"),xt(t,"link",e),ft(t),i.head.appendChild(t)))}}function aj(e){Xn.D(e),qg("dns-prefetch",e,null)}function ij(e,t){Xn.C(e,t),qg("preconnect",e,t)}function sj(e,t,r){Xn.L(e,t,r);var i=Ha;if(i&&e&&t){var c='link[rel="preload"][as="'+Qt(t)+'"]';t==="image"&&r&&r.imageSrcSet?(c+='[imagesrcset="'+Qt(r.imageSrcSet)+'"]',typeof r.imageSizes=="string"&&(c+='[imagesizes="'+Qt(r.imageSizes)+'"]')):c+='[href="'+Qt(e)+'"]';var f=c;switch(t){case"style":f=qa(e);break;case"script":f=Ya(e)}an.has(f)||(e=x({rel:"preload",href:t==="image"&&r&&r.imageSrcSet?void 0:e,as:t},r),an.set(f,e),i.querySelector(c)!==null||t==="style"&&i.querySelector(Ki(f))||t==="script"&&i.querySelector(Zi(f))||(t=i.createElement("link"),xt(t,"link",e),ft(t),i.head.appendChild(t)))}}function lj(e,t){Xn.m(e,t);var r=Ha;if(r&&e){var i=t&&typeof t.as=="string"?t.as:"script",c='link[rel="modulepreload"][as="'+Qt(i)+'"][href="'+Qt(e)+'"]',f=c;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":f=Ya(e)}if(!an.has(f)&&(e=x({rel:"modulepreload",href:e},t),an.set(f,e),r.querySelector(c)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(r.querySelector(Zi(f)))return}i=r.createElement("link"),xt(i,"link",e),ft(i),r.head.appendChild(i)}}}function oj(e,t,r){Xn.S(e,t,r);var i=Ha;if(i&&e){var c=ca(i).hoistableStyles,f=qa(e);t=t||"default";var y=c.get(f);if(!y){var w={loading:0,preload:null};if(y=i.querySelector(Ki(f)))w.loading=5;else{e=x({rel:"stylesheet",href:e,"data-precedence":t},r),(r=an.get(f))&&Xu(e,r);var O=y=i.createElement("link");ft(O),xt(O,"link",e),O._p=new Promise(function(F,I){O.onload=F,O.onerror=I}),O.addEventListener("load",function(){w.loading|=1}),O.addEventListener("error",function(){w.loading|=2}),w.loading|=4,Vl(y,t,i)}y={type:"stylesheet",instance:y,count:1,state:w},c.set(f,y)}}}function cj(e,t){Xn.X(e,t);var r=Ha;if(r&&e){var i=ca(r).hoistableScripts,c=Ya(e),f=i.get(c);f||(f=r.querySelector(Zi(c)),f||(e=x({src:e,async:!0},t),(t=an.get(c))&&Ku(e,t),f=r.createElement("script"),ft(f),xt(f,"link",e),r.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},i.set(c,f))}}function uj(e,t){Xn.M(e,t);var r=Ha;if(r&&e){var i=ca(r).hoistableScripts,c=Ya(e),f=i.get(c);f||(f=r.querySelector(Zi(c)),f||(e=x({src:e,async:!0,type:"module"},t),(t=an.get(c))&&Ku(e,t),f=r.createElement("script"),ft(f),xt(f,"link",e),r.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},i.set(c,f))}}function Yg(e,t,r,i){var c=(c=me.current)?_l(c):null;if(!c)throw Error(o(446));switch(e){case"meta":case"title":return null;case"style":return typeof r.precedence=="string"&&typeof r.href=="string"?(t=qa(r.href),r=ca(c).hoistableStyles,i=r.get(t),i||(i={type:"style",instance:null,count:0,state:null},r.set(t,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(r.rel==="stylesheet"&&typeof r.href=="string"&&typeof r.precedence=="string"){e=qa(r.href);var f=ca(c).hoistableStyles,y=f.get(e);if(y||(c=c.ownerDocument||c,y={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},f.set(e,y),(f=c.querySelector(Ki(e)))&&!f._p&&(y.instance=f,y.state.loading=5),an.has(e)||(r={rel:"preload",as:"style",href:r.href,crossOrigin:r.crossOrigin,integrity:r.integrity,media:r.media,hrefLang:r.hrefLang,referrerPolicy:r.referrerPolicy},an.set(e,r),f||dj(c,e,r,y.state))),t&&i===null)throw Error(o(528,""));return y}if(t&&i!==null)throw Error(o(529,""));return null;case"script":return t=r.async,r=r.src,typeof r=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Ya(r),r=ca(c).hoistableScripts,i=r.get(t),i||(i={type:"script",instance:null,count:0,state:null},r.set(t,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(o(444,e))}}function qa(e){return'href="'+Qt(e)+'"'}function Ki(e){return'link[rel="stylesheet"]['+e+"]"}function Pg(e){return x({},e,{"data-precedence":e.precedence,precedence:null})}function dj(e,t,r,i){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?i.loading=1:(t=e.createElement("link"),i.preload=t,t.addEventListener("load",function(){return i.loading|=1}),t.addEventListener("error",function(){return i.loading|=2}),xt(t,"link",r),ft(t),e.head.appendChild(t))}function Ya(e){return'[src="'+Qt(e)+'"]'}function Zi(e){return"script[async]"+e}function Gg(e,t,r){if(t.count++,t.instance===null)switch(t.type){case"style":var i=e.querySelector('style[data-href~="'+Qt(r.href)+'"]');if(i)return t.instance=i,ft(i),i;var c=x({},r,{"data-href":r.href,"data-precedence":r.precedence,href:null,precedence:null});return i=(e.ownerDocument||e).createElement("style"),ft(i),xt(i,"style",c),Vl(i,r.precedence,e),t.instance=i;case"stylesheet":c=qa(r.href);var f=e.querySelector(Ki(c));if(f)return t.state.loading|=4,t.instance=f,ft(f),f;i=Pg(r),(c=an.get(c))&&Xu(i,c),f=(e.ownerDocument||e).createElement("link"),ft(f);var y=f;return y._p=new Promise(function(w,O){y.onload=w,y.onerror=O}),xt(f,"link",i),t.state.loading|=4,Vl(f,r.precedence,e),t.instance=f;case"script":return f=Ya(r.src),(c=e.querySelector(Zi(f)))?(t.instance=c,ft(c),c):(i=r,(c=an.get(f))&&(i=x({},r),Ku(i,c)),e=e.ownerDocument||e,c=e.createElement("script"),ft(c),xt(c,"link",i),e.head.appendChild(c),t.instance=c);case"void":return null;default:throw Error(o(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(i=t.instance,t.state.loading|=4,Vl(i,r.precedence,e));return t.instance}function Vl(e,t,r){for(var i=r.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),c=i.length?i[i.length-1]:null,f=c,y=0;y<i.length;y++){var w=i[y];if(w.dataset.precedence===t)f=w;else if(f!==c)break}f?f.parentNode.insertBefore(e,f.nextSibling):(t=r.nodeType===9?r.head:r,t.insertBefore(e,t.firstChild))}function Xu(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function Ku(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var Bl=null;function Fg(e,t,r){if(Bl===null){var i=new Map,c=Bl=new Map;c.set(r,i)}else c=Bl,i=c.get(r),i||(i=new Map,c.set(r,i));if(i.has(e))return i;for(i.set(e,null),r=r.getElementsByTagName(e),c=0;c<r.length;c++){var f=r[c];if(!(f[di]||f[pt]||e==="link"&&f.getAttribute("rel")==="stylesheet")&&f.namespaceURI!=="http://www.w3.org/2000/svg"){var y=f.getAttribute(t)||"";y=e+y;var w=i.get(y);w?w.push(f):i.set(y,[f])}}return i}function $g(e,t,r){e=e.ownerDocument||e,e.head.insertBefore(r,t==="title"?e.querySelector("head > title"):null)}function fj(e,t,r){if(r===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function Xg(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function hj(e,t,r,i){if(r.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&(r.state.loading&4)===0){if(r.instance===null){var c=qa(i.href),f=t.querySelector(Ki(c));if(f){t=f._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=Ll.bind(e),t.then(e,e)),r.state.loading|=4,r.instance=f,ft(f);return}f=t.ownerDocument||t,i=Pg(i),(c=an.get(c))&&Xu(i,c),f=f.createElement("link"),ft(f);var y=f;y._p=new Promise(function(w,O){y.onload=w,y.onerror=O}),xt(f,"link",i),r.instance=f}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(r,t),(t=r.state.preload)&&(r.state.loading&3)===0&&(e.count++,r=Ll.bind(e),t.addEventListener("load",r),t.addEventListener("error",r))}}var Zu=0;function mj(e,t){return e.stylesheets&&e.count===0&&Hl(e,e.stylesheets),0<e.count||0<e.imgCount?function(r){var i=setTimeout(function(){if(e.stylesheets&&Hl(e,e.stylesheets),e.unsuspend){var f=e.unsuspend;e.unsuspend=null,f()}},6e4+t);0<e.imgBytes&&Zu===0&&(Zu=62500*KS());var c=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Hl(e,e.stylesheets),e.unsuspend)){var f=e.unsuspend;e.unsuspend=null,f()}},(e.imgBytes>Zu?50:800)+t);return e.unsuspend=r,function(){e.unsuspend=null,clearTimeout(i),clearTimeout(c)}}:null}function Ll(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Hl(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Ul=null;function Hl(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Ul=new Map,t.forEach(pj,e),Ul=null,Ll.call(e))}function pj(e,t){if(!(t.state.loading&4)){var r=Ul.get(e);if(r)var i=r.get(null);else{r=new Map,Ul.set(e,r);for(var c=e.querySelectorAll("link[data-precedence],style[data-precedence]"),f=0;f<c.length;f++){var y=c[f];(y.nodeName==="LINK"||y.getAttribute("media")!=="not all")&&(r.set(y.dataset.precedence,y),i=y)}i&&r.set(null,i)}c=t.instance,y=c.getAttribute("data-precedence"),f=r.get(y)||i,f===i&&r.set(null,c),r.set(y,c),this.count++,i=Ll.bind(this),c.addEventListener("load",i),c.addEventListener("error",i),f?f.parentNode.insertBefore(c,f.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(c,e.firstChild)),t.state.loading|=4}}var Qi={$$typeof:R,Provider:null,Consumer:null,_currentValue:J,_currentValue2:J,_threadCount:0};function gj(e,t,r,i,c,f,y,w,O){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Go(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Go(0),this.hiddenUpdates=Go(null),this.identifierPrefix=i,this.onUncaughtError=c,this.onCaughtError=f,this.onRecoverableError=y,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=O,this.incompleteTransitions=new Map}function Kg(e,t,r,i,c,f,y,w,O,F,I,re){return e=new gj(e,t,r,y,O,F,I,re,w),t=1,f===!0&&(t|=24),f=Ht(3,null,null,t),e.current=f,f.stateNode=e,t=Dc(),t.refCount++,e.pooledCache=t,t.refCount++,f.memoizedState={element:i,isDehydrated:r,cache:t},Rc(f),e}function Zg(e){return e?(e=xa,e):xa}function Qg(e,t,r,i,c,f){c=Zg(c),i.context===null?i.context=c:i.pendingContext=c,i=lr(t),i.payload={element:r},f=f===void 0?null:f,f!==null&&(i.callback=f),r=or(e,i,t),r!==null&&(Vt(r,e,t),Di(r,e,t))}function Jg(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var r=e.retryLane;e.retryLane=r!==0&&r<t?r:t}}function Qu(e,t){Jg(e,t),(e=e.alternate)&&Jg(e,t)}function Wg(e){if(e.tag===13||e.tag===31){var t=Lr(e,67108864);t!==null&&Vt(t,e,67108864),Qu(e,67108864)}}function Ig(e){if(e.tag===13||e.tag===31){var t=Ft();t=Fo(t);var r=Lr(e,t);r!==null&&Vt(r,e,t),Qu(e,t)}}var ql=!0;function yj(e,t,r,i){var c=P.T;P.T=null;var f=oe.p;try{oe.p=2,Ju(e,t,r,i)}finally{oe.p=f,P.T=c}}function vj(e,t,r,i){var c=P.T;P.T=null;var f=oe.p;try{oe.p=8,Ju(e,t,r,i)}finally{oe.p=f,P.T=c}}function Ju(e,t,r,i){if(ql){var c=Wu(i);if(c===null)Bu(e,t,i,Yl,r),ty(e,i);else if(bj(c,e,t,r,i))i.stopPropagation();else if(ty(e,i),t&4&&-1<xj.indexOf(e)){for(;c!==null;){var f=oa(c);if(f!==null)switch(f.tag){case 3:if(f=f.stateNode,f.current.memoizedState.isDehydrated){var y=Or(f.pendingLanes);if(y!==0){var w=f;for(w.pendingLanes|=2,w.entangledLanes|=2;y;){var O=1<<31-Lt(y);w.entanglements[1]|=O,y&=~O}jn(f),(Le&6)===0&&(El=nt()+500,Gi(0))}}break;case 31:case 13:w=Lr(f,2),w!==null&&Vt(w,f,2),Cl(),Qu(f,2)}if(f=Wu(i),f===null&&Bu(e,t,i,Yl,r),f===c)break;c=f}c!==null&&i.stopPropagation()}else Bu(e,t,i,null,r)}}function Wu(e){return e=ec(e),Iu(e)}var Yl=null;function Iu(e){if(Yl=null,e=la(e),e!==null){var t=h(e);if(t===null)e=null;else{var r=t.tag;if(r===13){if(e=d(t),e!==null)return e;e=null}else if(r===31){if(e=m(t),e!==null)return e;e=null}else if(r===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Yl=e,null}function ey(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(un()){case Et:return 2;case oi:return 8;case Rr:case Z:return 32;case je:return 268435456;default:return 32}default:return 32}}var ed=!1,xr=null,br=null,Sr=null,Ji=new Map,Wi=new Map,jr=[],xj="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function ty(e,t){switch(e){case"focusin":case"focusout":xr=null;break;case"dragenter":case"dragleave":br=null;break;case"mouseover":case"mouseout":Sr=null;break;case"pointerover":case"pointerout":Ji.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Wi.delete(t.pointerId)}}function Ii(e,t,r,i,c,f){return e===null||e.nativeEvent!==f?(e={blockedOn:t,domEventName:r,eventSystemFlags:i,nativeEvent:f,targetContainers:[c]},t!==null&&(t=oa(t),t!==null&&Wg(t)),e):(e.eventSystemFlags|=i,t=e.targetContainers,c!==null&&t.indexOf(c)===-1&&t.push(c),e)}function bj(e,t,r,i,c){switch(t){case"focusin":return xr=Ii(xr,e,t,r,i,c),!0;case"dragenter":return br=Ii(br,e,t,r,i,c),!0;case"mouseover":return Sr=Ii(Sr,e,t,r,i,c),!0;case"pointerover":var f=c.pointerId;return Ji.set(f,Ii(Ji.get(f)||null,e,t,r,i,c)),!0;case"gotpointercapture":return f=c.pointerId,Wi.set(f,Ii(Wi.get(f)||null,e,t,r,i,c)),!0}return!1}function ny(e){var t=la(e.target);if(t!==null){var r=h(t);if(r!==null){if(t=r.tag,t===13){if(t=d(r),t!==null){e.blockedOn=t,gh(e.priority,function(){Ig(r)});return}}else if(t===31){if(t=m(r),t!==null){e.blockedOn=t,gh(e.priority,function(){Ig(r)});return}}else if(t===3&&r.stateNode.current.memoizedState.isDehydrated){e.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Pl(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var r=Wu(e.nativeEvent);if(r===null){r=e.nativeEvent;var i=new r.constructor(r.type,r);Io=i,r.target.dispatchEvent(i),Io=null}else return t=oa(r),t!==null&&Wg(t),e.blockedOn=r,!1;t.shift()}return!0}function ry(e,t,r){Pl(e)&&r.delete(t)}function Sj(){ed=!1,xr!==null&&Pl(xr)&&(xr=null),br!==null&&Pl(br)&&(br=null),Sr!==null&&Pl(Sr)&&(Sr=null),Ji.forEach(ry),Wi.forEach(ry)}function Gl(e,t){e.blockedOn===t&&(e.blockedOn=null,ed||(ed=!0,n.unstable_scheduleCallback(n.unstable_NormalPriority,Sj)))}var Fl=null;function ay(e){Fl!==e&&(Fl=e,n.unstable_scheduleCallback(n.unstable_NormalPriority,function(){Fl===e&&(Fl=null);for(var t=0;t<e.length;t+=3){var r=e[t],i=e[t+1],c=e[t+2];if(typeof i!="function"){if(Iu(i||r)===null)continue;break}var f=oa(r);f!==null&&(e.splice(t,3),t-=3,Wc(f,{pending:!0,data:c,method:r.method,action:i},i,c))}}))}function Pa(e){function t(O){return Gl(O,e)}xr!==null&&Gl(xr,e),br!==null&&Gl(br,e),Sr!==null&&Gl(Sr,e),Ji.forEach(t),Wi.forEach(t);for(var r=0;r<jr.length;r++){var i=jr[r];i.blockedOn===e&&(i.blockedOn=null)}for(;0<jr.length&&(r=jr[0],r.blockedOn===null);)ny(r),r.blockedOn===null&&jr.shift();if(r=(e.ownerDocument||e).$$reactFormReplay,r!=null)for(i=0;i<r.length;i+=3){var c=r[i],f=r[i+1],y=c[kt]||null;if(typeof f=="function")y||ay(r);else if(y){var w=null;if(f&&f.hasAttribute("formAction")){if(c=f,y=f[kt]||null)w=y.formAction;else if(Iu(c)!==null)continue}else w=y.action;typeof w=="function"?r[i+1]=w:(r.splice(i,3),i-=3),ay(r)}}}function iy(){function e(f){f.canIntercept&&f.info==="react-transition"&&f.intercept({handler:function(){return new Promise(function(y){return c=y})},focusReset:"manual",scroll:"manual"})}function t(){c!==null&&(c(),c=null),i||setTimeout(r,20)}function r(){if(!i&&!navigation.transition){var f=navigation.currentEntry;f&&f.url!=null&&navigation.navigate(f.url,{state:f.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,c=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(r,100),function(){i=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),c!==null&&(c(),c=null)}}}function td(e){this._internalRoot=e}$l.prototype.render=td.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(o(409));var r=t.current,i=Ft();Qg(r,i,e,t,null,null)},$l.prototype.unmount=td.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Qg(e.current,2,null,e,null,null),Cl(),t[sa]=null}};function $l(e){this._internalRoot=e}$l.prototype.unstable_scheduleHydration=function(e){if(e){var t=ph();e={blockedOn:null,target:e,priority:t};for(var r=0;r<jr.length&&t!==0&&t<jr[r].priority;r++);jr.splice(r,0,e),r===0&&ny(e)}};var sy=a.version;if(sy!=="19.2.8")throw Error(o(527,sy,"19.2.8"));oe.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(o(188)):(e=Object.keys(e).join(","),Error(o(268,e)));return e=g(t),e=e!==null?v(e):null,e=e===null?null:e.stateNode,e};var jj={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:P,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Xl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Xl.isDisabled&&Xl.supportsFiber)try{Wn=Xl.inject(jj),Bt=Xl}catch{}}return ts.createRoot=function(e,t){if(!u(e))throw Error(o(299));var r=!1,i="",c=hp,f=mp,y=pp;return t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onUncaughtError!==void 0&&(c=t.onUncaughtError),t.onCaughtError!==void 0&&(f=t.onCaughtError),t.onRecoverableError!==void 0&&(y=t.onRecoverableError)),t=Kg(e,1,!1,null,null,r,i,null,c,f,y,iy),e[sa]=t.current,Vu(e),new td(t)},ts.hydrateRoot=function(e,t,r){if(!u(e))throw Error(o(299));var i=!1,c="",f=hp,y=mp,w=pp,O=null;return r!=null&&(r.unstable_strictMode===!0&&(i=!0),r.identifierPrefix!==void 0&&(c=r.identifierPrefix),r.onUncaughtError!==void 0&&(f=r.onUncaughtError),r.onCaughtError!==void 0&&(y=r.onCaughtError),r.onRecoverableError!==void 0&&(w=r.onRecoverableError),r.formState!==void 0&&(O=r.formState)),t=Kg(e,1,!0,t,r??null,i,c,O,f,y,w,iy),t.context=Zg(null),r=t.current,i=Ft(),i=Fo(i),c=lr(i),c.callback=null,or(r,c,i),r=i,t.current.lanes=r,ui(t,r),jn(t),e[sa]=t.current,Vu(e),new $l(t)},ts.version="19.2.8",ts}var gy;function Rj(){if(gy)return ad.exports;gy=1;function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(a){console.error(a)}}return n(),ad.exports=Mj(),ad.exports}var jf=Rj();const Oj=px(jf),wf=S.createContext({});function Ef(n){const a=S.useRef(null);return a.current===null&&(a.current=n()),a.current}const zj=typeof window<"u",Tf=zj?S.useLayoutEffect:S.useEffect,_o=S.createContext(null);function Cf(n,a){n.indexOf(a)===-1&&n.push(a)}function bo(n,a){const s=n.indexOf(a);s>-1&&n.splice(s,1)}const Dn=(n,a,s)=>s>a?a:s<n?n:s;let Vo=()=>{};const Nr={},vx=n=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n),xx=n=>typeof n=="object"&&n!==null,bx=n=>/^0[^.\s]+$/u.test(n);function Sx(n){let a;return()=>(a===void 0&&(a=n()),a)}const on=n=>n,Ts=(...n)=>n.reduce((a,s)=>o=>s(a(o))),ds=(n,a,s)=>{const o=a-n;return o?(s-n)/o:1};class Nf{constructor(){this.subscriptions=[]}add(a){return Cf(this.subscriptions,a),()=>bo(this.subscriptions,a)}notify(a,s,o){const u=this.subscriptions.length;if(u)if(u===1)this.subscriptions[0](a,s,o);else for(let h=0;h<u;h++){const d=this.subscriptions[h];d&&d(a,s,o)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}}const Xt=n=>n*1e3,ln=n=>n/1e3,jx=(n,a)=>a?n*(1e3/a):0,wx=(n,a,s)=>(((1-3*s+3*a)*n+(3*s-6*a))*n+3*a)*n,_j=1e-7,Vj=12;function Bj(n,a,s,o,u){let h,d,m=0;do d=a+(s-a)/2,h=wx(d,o,u)-n,h>0?s=d:a=d;while(Math.abs(h)>_j&&++m<Vj);return d}function Cs(n,a,s,o){if(n===a&&s===o)return on;const u=h=>Bj(h,0,1,n,s);return h=>h===0||h===1?h:wx(u(h),a,o)}const Ex=n=>a=>a<=.5?n(2*a)/2:(2-n(2*(1-a)))/2,Tx=n=>a=>1-n(1-a),Cx=Cs(.33,1.53,.69,.99),Df=Tx(Cx),Nx=Ex(Df),Dx=n=>n>=1?1:(n*=2)<1?.5*Df(n):.5*(2-Math.pow(2,-10*(n-1))),Af=n=>1-Math.sin(Math.acos(n)),Ax=Tx(Af),kx=Ex(Af),Lj=Cs(.42,0,1,1),Uj=Cs(0,0,.58,1),Mx=Cs(.42,0,.58,1),Hj=n=>Array.isArray(n)&&typeof n[0]!="number",Rx=n=>Array.isArray(n)&&typeof n[0]=="number",qj={linear:on,easeIn:Lj,easeInOut:Mx,easeOut:Uj,circIn:Af,circInOut:kx,circOut:Ax,backIn:Df,backInOut:Nx,backOut:Cx,anticipate:Dx},Yj=n=>typeof n=="string",yy=n=>{if(Rx(n)){Vo(n.length===4);const[a,s,o,u]=n;return Cs(a,s,o,u)}else if(Yj(n))return qj[n];return n},Kl=["setup","read","resolveKeyframes","preUpdate","update","preRender","render","postRender"];function Pj(n){let a=new Set,s=new Set,o=!1,u=!1;const h=new WeakSet;let d={delta:0,timestamp:0,isProcessing:!1};function m(g){h.has(g)&&(p.schedule(g),n()),g(d)}const p={schedule:(g,v=!1,x=!1)=>{const j=x&&o?a:s;return v&&h.add(g),j.add(g),g},cancel:g=>{s.delete(g),h.delete(g)},process:g=>{if(d=g,o){u=!0;return}o=!0;const v=a;a=s,s=v,a.forEach(m),a.clear(),o=!1,u&&(u=!1,p.process(g))}};return p}const Gj=40;function Ox(n,a){let s=!1,o=!0;const u={delta:0,timestamp:0,isProcessing:!1},h=()=>s=!0,d=Kl.reduce((R,_)=>(R[_]=Pj(h),R),{}),{setup:m,read:p,resolveKeyframes:g,preUpdate:v,update:x,preRender:b,render:j,postRender:E}=d,C=()=>{const R=Nr.useManualTiming,_=R?u.timestamp:performance.now();s=!1,R||(u.delta=o?1e3/60:Math.max(Math.min(_-u.timestamp,Gj),1)),u.timestamp=_,u.isProcessing=!0,m.process(u),p.process(u),g.process(u),v.process(u),x.process(u),b.process(u),j.process(u),E.process(u),u.isProcessing=!1,s&&a&&(o=!1,n(C))},T=()=>{s=!0,o=!0,u.isProcessing||n(C)};return{schedule:Kl.reduce((R,_)=>{const B=d[_];return R[_]=(Y,D=!1,H=!1)=>(s||T(),B.schedule(Y,D,H)),R},{}),cancel:R=>{for(let _=0;_<Kl.length;_++)d[Kl[_]].cancel(R)},state:u,steps:d}}const{schedule:$e,cancel:Dr,state:bt,steps:od}=Ox(typeof requestAnimationFrame<"u"?requestAnimationFrame:on,!0);let oo;function Fj(){oo=void 0}const Nt={now:()=>(oo===void 0&&Nt.set(bt.isProcessing||Nr.useManualTiming?bt.timestamp:performance.now()),oo),set:n=>{oo=n,queueMicrotask(Fj)}},zx=n=>a=>typeof a=="string"&&a.startsWith(n),_x=zx("--"),$j=zx("var(--"),kf=n=>$j(n)?Xj.test(n.split("/*")[0].trim()):!1,Xj=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;function vy(n){return typeof n!="string"?!1:n.split("/*")[0].includes("var(--")}const ni={test:n=>typeof n=="number",parse:parseFloat,transform:n=>n},fs={...ni,transform:n=>Dn(0,1,n)},Zl={...ni,default:1},ss=n=>Math.round(n*1e5)/1e5,Mf=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function Kj(n){return n==null}const Zj=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,Rf=(n,a)=>s=>!!(typeof s=="string"&&Zj.test(s)&&s.startsWith(n)||a&&!Kj(s)&&Object.prototype.hasOwnProperty.call(s,a)),Vx=(n,a,s)=>o=>{if(typeof o!="string")return o;const[u,h,d,m]=o.match(Mf);return{[n]:parseFloat(u),[a]:parseFloat(h),[s]:parseFloat(d),alpha:m!==void 0?parseFloat(m):1}},Qj=n=>Dn(0,255,n),cd={...ni,transform:n=>Math.round(Qj(n))},Ir={test:Rf("rgb","red"),parse:Vx("red","green","blue"),transform:({red:n,green:a,blue:s,alpha:o=1})=>"rgba("+cd.transform(n)+", "+cd.transform(a)+", "+cd.transform(s)+", "+ss(fs.transform(o))+")"};function Jj(n){let a="",s="",o="",u="";return n.length>5?(a=n.substring(1,3),s=n.substring(3,5),o=n.substring(5,7),u=n.substring(7,9)):(a=n.substring(1,2),s=n.substring(2,3),o=n.substring(3,4),u=n.substring(4,5),a+=a,s+=s,o+=o,u+=u),{red:parseInt(a,16),green:parseInt(s,16),blue:parseInt(o,16),alpha:u?parseInt(u,16)/255:1}}const _d={test:Rf("#"),parse:Jj,transform:Ir.transform},Ns=n=>({test:a=>typeof a=="string"&&a.endsWith(n)&&a.split(" ").length===1,parse:parseFloat,transform:a=>`${a}${n}`}),Kn=Ns("deg"),Nn=Ns("%"),ge=Ns("px"),Wj=Ns("vh"),Ij=Ns("vw"),xy={...Nn,parse:n=>Nn.parse(n)/100,transform:n=>Nn.transform(n*100)},Za={test:Rf("hsl","hue"),parse:Vx("hue","saturation","lightness"),transform:({hue:n,saturation:a,lightness:s,alpha:o=1})=>"hsla("+Math.round(n)+", "+Nn.transform(ss(a))+", "+Nn.transform(ss(s))+", "+ss(fs.transform(o))+")"},lt={test:n=>Ir.test(n)||_d.test(n)||Za.test(n),parse:n=>Ir.test(n)?Ir.parse(n):Za.test(n)?Za.parse(n):_d.parse(n),transform:n=>typeof n=="string"?n:n.hasOwnProperty("red")?Ir.transform(n):Za.transform(n),getAnimatableNone:n=>{const a=lt.parse(n);return a.alpha=0,lt.transform(a)}},ew=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;function tw(n){var a,s;return isNaN(n)&&typeof n=="string"&&(((a=n.match(Mf))==null?void 0:a.length)||0)+(((s=n.match(ew))==null?void 0:s.length)||0)>0}const Bx="number",Lx="color",nw="var",rw="var(",by="${}",aw=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function Ia(n){const a=n.toString(),s=[],o={color:[],number:[],var:[]},u=[];let h=0;const m=a.replace(aw,p=>(lt.test(p)?(o.color.push(h),u.push(Lx),s.push(lt.parse(p))):p.startsWith(rw)?(o.var.push(h),u.push(nw),s.push(p)):(o.number.push(h),u.push(Bx),s.push(parseFloat(p))),++h,by)).split(by);return{values:s,split:m,indexes:o,types:u}}function iw(n){return Ia(n).values}function Ux({split:n,types:a}){const s=n.length;return o=>{let u="";for(let h=0;h<s;h++)if(u+=n[h],o[h]!==void 0){const d=a[h];d===Bx?u+=ss(o[h]):d===Lx?u+=lt.transform(o[h]):u+=o[h]}return u}}function sw(n){return Ux(Ia(n))}const lw=n=>typeof n=="number"?0:lt.test(n)?lt.getAnimatableNone(n):n,ow=(n,a)=>typeof n=="number"?a!=null&&a.trim().endsWith("/")?n:0:lw(n);function cw(n){const a=Ia(n);return Ux(a)(a.values.map((o,u)=>ow(o,a.split[u])))}const gn={test:tw,parse:iw,createTransformer:sw,getAnimatableNone:cw};function ud(n,a,s){return s<0&&(s+=1),s>1&&(s-=1),s<1/6?n+(a-n)*6*s:s<1/2?a:s<2/3?n+(a-n)*(2/3-s)*6:n}function uw({hue:n,saturation:a,lightness:s,alpha:o}){n/=360,a/=100,s/=100;let u=0,h=0,d=0;if(!a)u=h=d=s;else{const m=s<.5?s*(1+a):s+a-s*a,p=2*s-m;u=ud(p,m,n+1/3),h=ud(p,m,n),d=ud(p,m,n-1/3)}return{red:Math.round(u*255),green:Math.round(h*255),blue:Math.round(d*255),alpha:o}}function So(n,a){return s=>s>0?a:n}const Fe=(n,a,s)=>n+(a-n)*s,dd=(n,a,s)=>{const o=n*n,u=s*(a*a-o)+o;return u<0?0:Math.sqrt(u)},dw=[_d,Ir,Za],fw=n=>dw.find(a=>a.test(n));function Sy(n){const a=fw(n);if(!a)return!1;let s=a.parse(n);return a===Za&&(s=uw(s)),s}const jy=(n,a)=>{const s=Sy(n),o=Sy(a);if(!s||!o)return So(n,a);const u={...s};return h=>(u.red=dd(s.red,o.red,h),u.green=dd(s.green,o.green,h),u.blue=dd(s.blue,o.blue,h),u.alpha=Fe(s.alpha,o.alpha,h),Ir.transform(u))},Vd=new Set(["none","hidden"]);function hw(n,a){return Vd.has(n)?s=>s<=0?n:a:s=>s>=1?a:n}function mw(n,a){return s=>Fe(n,a,s)}function Of(n){return typeof n=="number"?mw:typeof n=="string"?kf(n)?So:lt.test(n)?jy:yw:Array.isArray(n)?Hx:typeof n=="object"?lt.test(n)?jy:pw:So}function Hx(n,a){const s=[...n],o=s.length,u=n.map((h,d)=>Of(h)(h,a[d]));return h=>{for(let d=0;d<o;d++)s[d]=u[d](h);return s}}function pw(n,a){const s={...n,...a},o={};for(const u in s)n[u]!==void 0&&a[u]!==void 0&&(o[u]=Of(n[u])(n[u],a[u]));return u=>{for(const h in o)s[h]=o[h](u);return s}}function gw(n,a){const s=[],o={color:0,var:0,number:0};for(let u=0;u<a.values.length;u++){const h=a.types[u],d=n.indexes[h][o[h]],m=n.values[d]??0;s[u]=m,o[h]++}return s}const yw=(n,a)=>{const s=gn.createTransformer(a),o=Ia(n),u=Ia(a);return o.indexes.var.length===u.indexes.var.length&&o.indexes.color.length===u.indexes.color.length&&o.indexes.number.length>=u.indexes.number.length?Vd.has(n)&&!u.values.length||Vd.has(a)&&!o.values.length?hw(n,a):Ts(Hx(gw(o,u),u.values),s):So(n,a)};function qx(n,a,s){return typeof n=="number"&&typeof a=="number"&&typeof s=="number"?Fe(n,a,s):Of(n)(n,a)}const vw=n=>{const a=({timestamp:s})=>n(s);return{start:(s=!0)=>$e.update(a,s),stop:()=>Dr(a),now:()=>bt.isProcessing?bt.timestamp:Nt.now()}},Yx=(n,a,s=10)=>{let o="";const u=Math.max(Math.round(a/s),2);for(let h=0;h<u;h++)o+=Math.round(n(h/(u-1))*1e4)/1e4+", ";return`linear(${o.substring(0,o.length-2)})`},jo=2e4;function zf(n){let a=0;const s=50;let o=n.next(a);for(;!o.done&&a<jo;)a+=s,o=n.next(a);return a>=jo?1/0:a}function xw(n,a=100,s){const o=s({...n,keyframes:[0,a]}),u=Math.min(zf(o),jo);return{type:"keyframes",ease:h=>o.next(u*h).value/a,duration:ln(u)}}const Ie={stiffness:100,damping:10,mass:1,velocity:0,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05,maxDamping:1};function Bd(n,a){return n*Math.sqrt(1-a*a)}const bw=12;function Sw(n,a,s){let o=s;for(let u=1;u<bw;u++)o=o-n(o)/a(o);return o}const fd=.001;function jw({duration:n=Ie.duration,bounce:a=Ie.bounce,velocity:s=Ie.velocity,mass:o=Ie.mass}){let u,h,d=1-a;d=Dn(Ie.minDamping,Ie.maxDamping,d),n=Dn(Ie.minDuration,Ie.maxDuration,ln(n)),d<1?(u=g=>{const v=g*d,x=v*n,b=v-s,j=Bd(g,d),E=Math.exp(-x);return fd-b/j*E},h=g=>{const x=g*d*n,b=x*s+s,j=Math.pow(d,2)*Math.pow(g,2)*n,E=Math.exp(-x),C=Bd(Math.pow(g,2),d);return(-u(g)+fd>0?-1:1)*((b-j)*E)/C}):(u=g=>{const v=Math.exp(-g*n),x=(g-s)*n+1;return-fd+v*x},h=g=>{const v=Math.exp(-g*n),x=(s-g)*(n*n);return v*x});const m=5/n,p=Sw(u,h,m);if(n=Xt(n),isNaN(p))return{stiffness:Ie.stiffness,damping:Ie.damping,duration:n};{const g=Math.pow(p,2)*o;return{stiffness:g,damping:d*2*Math.sqrt(o*g),duration:n}}}const ww=["duration","bounce"],Ew=["stiffness","damping","mass"];function wy(n,a){return a.some(s=>n[s]!==void 0)}function Tw(n){let a={velocity:Ie.velocity,stiffness:Ie.stiffness,damping:Ie.damping,mass:Ie.mass,isResolvedFromDuration:!1,...n};if(!wy(n,Ew)&&wy(n,ww))if(a.velocity=0,n.visualDuration){const s=n.visualDuration,o=2*Math.PI/(s*1.2),u=o*o,h=2*Dn(.05,1,1-(n.bounce||0))*Math.sqrt(u);a={...a,mass:Ie.mass,stiffness:u,damping:h}}else{const s=jw({...n,velocity:0});a={...a,...s,mass:Ie.mass},a.isResolvedFromDuration=!0}return a}function wo(n=Ie.visualDuration,a=Ie.bounce){const s=typeof n!="object"?{visualDuration:n,keyframes:[0,1],bounce:a}:n;let{restSpeed:o,restDelta:u}=s;const h=s.keyframes[0],d=s.keyframes[s.keyframes.length-1],m={done:!1,value:h},{stiffness:p,damping:g,mass:v,duration:x,velocity:b,isResolvedFromDuration:j}=Tw({...s,velocity:-ln(s.velocity||0)}),E=b||0,C=g/(2*Math.sqrt(p*v)),T=d-h,k=ln(Math.sqrt(p/v)),A=Math.abs(T)<5;o||(o=A?Ie.restSpeed.granular:Ie.restSpeed.default),u||(u=A?Ie.restDelta.granular:Ie.restDelta.default);let R,_,B,Y,D,H;if(C<1)B=Bd(k,C),Y=(E+C*k*T)/B,R=z=>{const L=Math.exp(-C*k*z);return d-L*(Y*Math.sin(B*z)+T*Math.cos(B*z))},D=C*k*Y+T*B,H=C*k*T-Y*B,_=z=>Math.exp(-C*k*z)*(D*Math.sin(B*z)+H*Math.cos(B*z));else if(C===1){R=L=>d-Math.exp(-k*L)*(T+(E+k*T)*L);const z=E+k*T;_=L=>Math.exp(-k*L)*(k*z*L-E)}else{const z=k*Math.sqrt(C*C-1);R=se=>{const ye=Math.exp(-C*k*se),P=Math.min(z*se,300);return d-ye*((E+C*k*T)*Math.sinh(P)+z*T*Math.cosh(P))/z};const L=(E+C*k*T)/z,K=C*k*L-T*z,ce=C*k*T-L*z;_=se=>{const ye=Math.exp(-C*k*se),P=Math.min(z*se,300);return ye*(K*Math.sinh(P)+ce*Math.cosh(P))}}const M={calculatedDuration:j&&x||null,velocity:z=>Xt(_(z)),next:z=>{if(!j&&C<1){const K=Math.exp(-C*k*z),ce=Math.sin(B*z),se=Math.cos(B*z),ye=d-K*(Y*ce+T*se),P=Xt(K*(D*ce+H*se));return m.done=Math.abs(P)<=o&&Math.abs(d-ye)<=u,m.value=m.done?d:ye,m}const L=R(z);if(j)m.done=z>=x;else{const K=Xt(_(z));m.done=Math.abs(K)<=o&&Math.abs(d-L)<=u}return m.value=m.done?d:L,m},toString:()=>{const z=Math.min(zf(M),jo),L=Yx(K=>M.next(z*K).value,z,30);return z+"ms "+L},toTransition:()=>{}};return M}wo.applyToOptions=n=>{const a=xw(n,100,wo);return n.ease=a.ease,n.duration=Xt(a.duration),n.type="keyframes",n};const Cw=5;function Px(n,a,s){const o=Math.max(a-Cw,0);return jx(s-n(o),a-o)}function Ld({keyframes:n,velocity:a=0,power:s=.8,timeConstant:o=325,bounceDamping:u=10,bounceStiffness:h=500,modifyTarget:d,min:m,max:p,restDelta:g=.5,restSpeed:v}){const x=n[0],b={done:!1,value:x},j=H=>m!==void 0&&H<m||p!==void 0&&H>p,E=H=>m===void 0?p:p===void 0||Math.abs(m-H)<Math.abs(p-H)?m:p;let C=s*a;const T=x+C,k=d===void 0?T:d(T);k!==T&&(C=k-x);const A=H=>-C*Math.exp(-H/o),R=H=>k+A(H),_=H=>{const M=A(H),z=R(H);b.done=Math.abs(M)<=g,b.value=b.done?k:z};let B,Y;const D=H=>{j(b.value)&&(B=H,Y=wo({keyframes:[b.value,E(b.value)],velocity:Px(R,H,b.value),damping:u,stiffness:h,restDelta:g,restSpeed:v}))};return D(0),{calculatedDuration:null,next:H=>{let M=!1;return!Y&&B===void 0&&(M=!0,_(H),D(H)),B!==void 0&&H>=B?Y.next(H-B):(!M&&_(H),b)}}}function Nw(n,a,s){const o=[],u=s||Nr.mix||qx,h=n.length-1;for(let d=0;d<h;d++){let m=u(n[d],n[d+1]);if(a){const p=Array.isArray(a)?a[d]||on:a;m=Ts(p,m)}o.push(m)}return o}function Dw(n,a,{clamp:s=!0,ease:o,mixer:u}={}){const h=n.length;if(Vo(h===a.length),h===1)return()=>a[0];if(h===2&&a[0]===a[1])return()=>a[1];const d=n[0]===n[1];n[0]>n[h-1]&&(n=[...n].reverse(),a=[...a].reverse());const m=Nw(a,o,u),p=m.length,g=v=>{if(d&&v<n[0])return a[0];let x=0;if(p>1)for(;x<n.length-2&&!(v<n[x+1]);x++);const b=ds(n[x],n[x+1],v);return m[x](b)};return s?v=>g(Dn(n[0],n[h-1],v)):g}function Aw(n,a){const s=n[n.length-1];for(let o=1;o<=a;o++){const u=ds(0,a,o);n.push(Fe(s,1,u))}}function kw(n){const a=[0];return Aw(a,n.length-1),a}function Mw(n,a){return n.map(s=>s*a)}function Rw(n,a){return n.map(()=>a||Mx).splice(0,n.length-1)}function ls({duration:n=300,keyframes:a,times:s,ease:o="easeInOut"}){const u=Hj(o)?o.map(yy):yy(o),h={done:!1,value:a[0]},d=Mw(s&&s.length===a.length?s:kw(a),n),m=Dw(d,a,{ease:Array.isArray(u)?u:Rw(a,u)});return{calculatedDuration:n,next:p=>(h.value=m(p),h.done=p>=n,h)}}const Ow=n=>n!==null;function Bo(n,{repeat:a,repeatType:s="loop"},o,u=1){const h=n.filter(Ow),m=u<0||a&&s!=="loop"&&a%2===1?0:h.length-1;return!m||o===void 0?h[m]:o}const zw={decay:Ld,inertia:Ld,tween:ls,keyframes:ls,spring:wo};function Gx(n){typeof n.type=="string"&&(n.type=zw[n.type])}class _f{constructor(){this.updateFinished()}get finished(){return this._finished}updateFinished(){this._finished=new Promise(a=>{this.resolve=a})}notifyFinished(){this.resolve()}then(a,s){return this.finished.then(a,s)}}const _w=n=>n/100;class Eo extends _f{constructor(a){super(),this.state="idle",this.startTime=null,this.isStopped=!1,this.currentTime=0,this.holdTime=null,this.playbackSpeed=1,this.delayState={done:!1,value:void 0},this.stop=()=>{var o,u;const{motionValue:s}=this.options;s&&s.updatedAt!==Nt.now()&&this.tick(Nt.now()),this.isStopped=!0,this.state!=="idle"&&(this.teardown(),(u=(o=this.options).onStop)==null||u.call(o))},this.options=a,this.initAnimation(),this.play(),a.autoplay===!1&&this.pause()}initAnimation(){const{options:a}=this;Gx(a);const{type:s=ls,repeat:o=0,repeatDelay:u=0,repeatType:h,velocity:d=0}=a;let{keyframes:m}=a;const p=s||ls;p!==ls&&typeof m[0]!="number"&&(this.mixKeyframes=Ts(_w,qx(m[0],m[1])),m=[0,100]);const g=p({...a,keyframes:m});h==="mirror"&&(this.mirroredGenerator=p({...a,keyframes:[...m].reverse(),velocity:-d})),g.calculatedDuration===null&&(g.calculatedDuration=zf(g));const{calculatedDuration:v}=g;this.calculatedDuration=v,this.resolvedDuration=v+u,this.totalDuration=this.resolvedDuration*(o+1)-u,this.generator=g}updateTime(a){const s=Math.round(a-this.startTime)*this.playbackSpeed;this.holdTime!==null?this.currentTime=this.holdTime:this.currentTime=s}tick(a,s=!1){const{generator:o,totalDuration:u,mixKeyframes:h,mirroredGenerator:d,resolvedDuration:m,calculatedDuration:p}=this;if(this.startTime===null)return o.next(0);const{delay:g=0,keyframes:v,repeat:x,repeatType:b,repeatDelay:j,type:E,onUpdate:C,finalKeyframe:T}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,a):this.speed<0&&(this.startTime=Math.min(a-u/this.speed,this.startTime)),s?this.currentTime=a:this.updateTime(a);const k=this.currentTime-g*(this.playbackSpeed>=0?1:-1),A=this.playbackSpeed>=0?k<0:k>u;this.currentTime=Math.max(k,0),this.state==="finished"&&this.holdTime===null&&(this.currentTime=u);let R=this.currentTime,_=o;if(x){const H=Math.min(this.currentTime,u)/m;let M=Math.floor(H),z=H%1;!z&&H>=1&&(z=1),z===1&&M--,M=Math.min(M,x+1),!!(M%2)&&(b==="reverse"?(z=1-z,j&&(z-=j/m)):b==="mirror"&&(_=d)),R=Dn(0,1,z)*m}let B;A?(this.delayState.value=v[0],B=this.delayState):B=_.next(R),h&&!A&&(B.value=h(B.value));let{done:Y}=B;!A&&p!==null&&(Y=this.playbackSpeed>=0?this.currentTime>=u:this.currentTime<=0);const D=this.holdTime===null&&(this.state==="finished"||this.state==="running"&&Y);return D&&E!==Ld&&(B.value=Bo(v,this.options,T,this.speed)),C&&C(B.value),D&&this.finish(),B}then(a,s){return this.finished.then(a,s)}get duration(){return ln(this.calculatedDuration)}get iterationDuration(){const{delay:a=0}=this.options||{};return this.duration+ln(a)}get time(){return ln(this.currentTime)}set time(a){a=Xt(a),this.currentTime=a,this.startTime===null||this.holdTime!==null||this.playbackSpeed===0?this.holdTime=a:this.driver&&(this.startTime=this.driver.now()-a/this.playbackSpeed),this.driver?this.driver.start(!1):(this.startTime=0,this.state="paused",this.holdTime=a,this.tick(a))}getGeneratorVelocity(){const a=this.currentTime;if(a<=0)return this.options.velocity||0;if(this.generator.velocity)return this.generator.velocity(a);const s=this.generator.next(a).value;return Px(o=>this.generator.next(o).value,a,s)}get speed(){return this.playbackSpeed}set speed(a){const s=this.playbackSpeed!==a;s&&this.driver&&this.updateTime(Nt.now()),this.playbackSpeed=a,s&&this.driver&&(this.time=ln(this.currentTime))}play(){var u,h;if(this.isStopped)return;const{driver:a=vw,startTime:s}=this.options;this.driver||(this.driver=a(d=>this.tick(d))),(h=(u=this.options).onPlay)==null||h.call(u);const o=this.driver.now();this.state==="finished"?(this.updateFinished(),this.startTime=o):this.holdTime!==null?this.startTime=o-this.holdTime:this.startTime||(this.startTime=s??o),this.state==="finished"&&this.speed<0&&(this.startTime+=this.calculatedDuration),this.holdTime=null,this.state="running",this.driver.start()}pause(){this.state="paused",this.updateTime(Nt.now()),this.holdTime=this.currentTime}complete(){this.state!=="running"&&this.play(),this.state="finished",this.holdTime=null}finish(){var a,s;this.notifyFinished(),this.teardown(),this.state="finished",(s=(a=this.options).onComplete)==null||s.call(a)}cancel(){var a,s;this.holdTime=null,this.startTime=0,this.tick(0),this.teardown(),(s=(a=this.options).onCancel)==null||s.call(a)}teardown(){this.state="idle",this.stopDriver(),this.startTime=this.holdTime=null}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(a){return this.startTime=0,this.tick(a,!0)}attachTimeline(a){var s;return this.options.allowFlatten&&(this.options.type="keyframes",this.options.ease="linear",this.initAnimation()),(s=this.driver)==null||s.stop(),a.observe(this)}}function Vw(n){for(let a=1;a<n.length;a++)n[a]??(n[a]=n[a-1])}const ea=n=>n*180/Math.PI,Ud=n=>{const a=ea(Math.atan2(n[1],n[0]));return Hd(a)},Bw={x:4,y:5,translateX:4,translateY:5,scaleX:0,scaleY:3,scale:n=>(Math.abs(n[0])+Math.abs(n[3]))/2,rotate:Ud,rotateZ:Ud,skewX:n=>ea(Math.atan(n[1])),skewY:n=>ea(Math.atan(n[2])),skew:n=>(Math.abs(n[1])+Math.abs(n[2]))/2},Hd=n=>(n=n%360,n<0&&(n+=360),n),Ey=Ud,Ty=n=>Math.sqrt(n[0]*n[0]+n[1]*n[1]),Cy=n=>Math.sqrt(n[4]*n[4]+n[5]*n[5]),Lw={x:12,y:13,z:14,translateX:12,translateY:13,translateZ:14,scaleX:Ty,scaleY:Cy,scale:n=>(Ty(n)+Cy(n))/2,rotateX:n=>Hd(ea(Math.atan2(n[6],n[5]))),rotateY:n=>Hd(ea(Math.atan2(-n[2],n[0]))),rotateZ:Ey,rotate:Ey,skewX:n=>ea(Math.atan(n[4])),skewY:n=>ea(Math.atan(n[1])),skew:n=>(Math.abs(n[1])+Math.abs(n[4]))/2};function qd(n){return n.includes("scale")?1:0}function Yd(n,a){if(!n||n==="none")return qd(a);const s=n.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);let o,u;if(s)o=Lw,u=s;else{const m=n.match(/^matrix\(([-\d.e\s,]+)\)$/u);o=Bw,u=m}if(!u)return qd(a);const h=o[a],d=u[1].split(",").map(Hw);return typeof h=="function"?h(d):d[h]}const Uw=(n,a)=>{const{transform:s="none"}=getComputedStyle(n);return Yd(s,a)};function Hw(n){return parseFloat(n.trim())}const ri=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],ai=new Set([...ri,"pathRotation"]),Ny=n=>n===ni||n===ge,qw=new Set(["x","y","z"]),Yw=ri.filter(n=>!qw.has(n));function Pw(n){const a=[];return Yw.forEach(s=>{const o=n.getValue(s);o!==void 0&&(a.push([s,o.get()]),o.set(s.startsWith("scale")?1:0))}),a}const Tr={width:({x:n},{paddingLeft:a="0",paddingRight:s="0",boxSizing:o})=>{const u=n.max-n.min;return o==="border-box"?u:u-parseFloat(a)-parseFloat(s)},height:({y:n},{paddingTop:a="0",paddingBottom:s="0",boxSizing:o})=>{const u=n.max-n.min;return o==="border-box"?u:u-parseFloat(a)-parseFloat(s)},top:(n,{top:a})=>parseFloat(a),left:(n,{left:a})=>parseFloat(a),bottom:({y:n},{top:a})=>parseFloat(a)+(n.max-n.min),right:({x:n},{left:a})=>parseFloat(a)+(n.max-n.min),x:(n,{transform:a})=>Yd(a,"x"),y:(n,{transform:a})=>Yd(a,"y")};Tr.translateX=Tr.x;Tr.translateY=Tr.y;const ta=new Set;let Pd=!1,Gd=!1,Fd=!1;function Fx(){if(Gd){const n=Array.from(ta).filter(o=>o.needsMeasurement),a=new Set(n.map(o=>o.element)),s=new Map;a.forEach(o=>{const u=Pw(o);u.length&&(s.set(o,u),o.render())}),n.forEach(o=>o.measureInitialState()),a.forEach(o=>{o.render();const u=s.get(o);u&&u.forEach(([h,d])=>{var m;(m=o.getValue(h))==null||m.set(d)})}),n.forEach(o=>o.measureEndState()),n.forEach(o=>{o.suspendedScrollY!==void 0&&window.scrollTo(0,o.suspendedScrollY)})}Gd=!1,Pd=!1,ta.forEach(n=>n.complete(Fd)),ta.clear()}function $x(){ta.forEach(n=>{n.readKeyframes(),n.needsMeasurement&&(Gd=!0)})}function Gw(){Fd=!0,$x(),Fx(),Fd=!1}class Vf{constructor(a,s,o,u,h,d=!1){this.state="pending",this.isAsync=!1,this.needsMeasurement=!1,this.unresolvedKeyframes=[...a],this.onComplete=s,this.name=o,this.motionValue=u,this.element=h,this.isAsync=d}scheduleResolve(){this.state="scheduled",this.isAsync?(ta.add(this),Pd||(Pd=!0,$e.read($x),$e.resolveKeyframes(Fx))):(this.readKeyframes(),this.complete())}readKeyframes(){const{unresolvedKeyframes:a,name:s,element:o,motionValue:u}=this;if(a[0]===null){const h=u==null?void 0:u.get(),d=a[a.length-1];if(h!==void 0)a[0]=h;else if(o&&s){const m=o.readValue(s,d);m!=null&&(a[0]=m)}a[0]===void 0&&(a[0]=d),u&&h===void 0&&u.set(a[0])}Vw(a)}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(a=!1){this.state="complete",this.onComplete(this.unresolvedKeyframes,this.finalKeyframe,a),ta.delete(this)}cancel(){this.state==="scheduled"&&(ta.delete(this),this.state="pending")}resume(){this.state==="pending"&&this.scheduleResolve()}}const Fw=n=>n.startsWith("--");function Xx(n,a,s){Fw(a)?n.style.setProperty(a,s):n.style[a]=s}const $w={};function Kx(n,a){const s=Sx(n);return()=>$w[a]??s()}const Xw=Kx(()=>window.ScrollTimeline!==void 0,"scrollTimeline"),Zx=Kx(()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0},"linearEasing"),as=([n,a,s,o])=>`cubic-bezier(${n}, ${a}, ${s}, ${o})`,Dy={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:as([0,.65,.55,1]),circOut:as([.55,0,1,.45]),backIn:as([.31,.01,.66,-.59]),backOut:as([.33,1.53,.69,.99])};function Qx(n,a){if(n)return typeof n=="function"?Zx()?Yx(n,a):"ease-out":Rx(n)?as(n):Array.isArray(n)?n.map(s=>Qx(s,a)||Dy.easeOut):Dy[n]}function Kw(n,a,s,{delay:o=0,duration:u=300,repeat:h=0,repeatType:d="loop",ease:m="easeOut",times:p}={},g=void 0){const v={[a]:s};p&&(v.offset=p);const x=Qx(m,u);Array.isArray(x)&&(v.easing=x);const b={delay:o,duration:u,easing:Array.isArray(x)?"linear":x,fill:"both",iterations:h+1,direction:d==="reverse"?"alternate":"normal"};return g&&(b.pseudoElement=g),n.animate(v,b)}function Jx(n){return typeof n=="function"&&"applyToOptions"in n}function Zw({type:n,...a}){return Jx(n)&&Zx()?n.applyToOptions(a):(a.duration??(a.duration=300),a.ease??(a.ease="easeOut"),a)}class Wx extends _f{constructor(a){if(super(),this.finishedTime=null,this.isStopped=!1,this.manualStartTime=null,!a)return;const{element:s,name:o,keyframes:u,pseudoElement:h,allowFlatten:d=!1,finalKeyframe:m,onComplete:p}=a;this.isPseudoElement=!!h,this.allowFlatten=d,this.options=a,Vo(typeof a.type!="string");const g=Zw(a);this.animation=Kw(s,o,u,g,h),g.autoplay===!1&&this.animation.pause(),this.animation.onfinish=()=>{if(this.finishedTime=this.time,!h){const v=Bo(u,this.options,m,this.speed);this.updateMotionValue&&this.updateMotionValue(v),Xx(s,o,v),this.animation.cancel()}p==null||p(),this.notifyFinished()}}play(){this.isStopped||(this.manualStartTime=null,this.animation.play(),this.state==="finished"&&this.updateFinished())}pause(){this.animation.pause()}complete(){var a,s;(s=(a=this.animation).finish)==null||s.call(a)}cancel(){try{this.animation.cancel()}catch{}}stop(){if(this.isStopped)return;this.isStopped=!0;const{state:a}=this;a==="idle"||a==="finished"||(this.updateMotionValue?this.updateMotionValue():this.commitStyles(),this.isPseudoElement||this.cancel())}commitStyles(){var s,o,u;const a=(s=this.options)==null?void 0:s.element;!this.isPseudoElement&&(a!=null&&a.isConnected)&&((u=(o=this.animation).commitStyles)==null||u.call(o))}get duration(){var s,o;const a=((o=(s=this.animation.effect)==null?void 0:s.getComputedTiming)==null?void 0:o.call(s).duration)||0;return ln(Number(a))}get iterationDuration(){const{delay:a=0}=this.options||{};return this.duration+ln(a)}get time(){return ln(Number(this.animation.currentTime)||0)}set time(a){const s=this.finishedTime!==null;this.manualStartTime=null,this.finishedTime=null,this.animation.currentTime=Xt(a),s&&this.animation.pause()}get speed(){return this.animation.playbackRate}set speed(a){a<0&&(this.finishedTime=null),this.animation.playbackRate=a}get state(){return this.finishedTime!==null?"finished":this.animation.playState}get startTime(){return this.manualStartTime??Number(this.animation.startTime)}set startTime(a){this.manualStartTime=this.animation.startTime=a}attachTimeline({timeline:a,rangeStart:s,rangeEnd:o,observe:u}){var h;return this.allowFlatten&&((h=this.animation.effect)==null||h.updateTiming({easing:"linear"})),this.animation.onfinish=null,a&&Xw()?(this.animation.timeline=a,s&&(this.animation.rangeStart=s),o&&(this.animation.rangeEnd=o),on):u(this)}}const Ix={anticipate:Dx,backInOut:Nx,circInOut:kx};function Qw(n){return n in Ix}function Jw(n){typeof n.ease=="string"&&Qw(n.ease)&&(n.ease=Ix[n.ease])}const hd=10;class Ww extends Wx{constructor(a){Jw(a),Gx(a),super(a),a.startTime!==void 0&&a.autoplay!==!1&&(this.startTime=a.startTime),this.options=a}updateMotionValue(a){const{motionValue:s,onUpdate:o,onComplete:u,element:h,...d}=this.options;if(!s)return;if(a!==void 0){s.set(a);return}const m=new Eo({...d,autoplay:!1}),p=Math.max(hd,Nt.now()-this.startTime),g=Dn(0,hd,p-hd),v=m.sample(p).value,{name:x}=this.options;h&&x&&Xx(h,x,v),s.setWithVelocity(m.sample(Math.max(0,p-g)).value,v,g),m.stop()}}const Ay=(n,a)=>a==="zIndex"?!1:!!(typeof n=="number"||Array.isArray(n)||typeof n=="string"&&(gn.test(n)||n==="0")&&!n.startsWith("url("));function Iw(n){const a=n[0];if(n.length===1)return!0;for(let s=0;s<n.length;s++)if(n[s]!==a)return!0}function e2(n,a,s,o){const u=n[0];if(u===null)return!1;if(a==="display"||a==="visibility")return!0;const h=n[n.length-1],d=Ay(u,a),m=Ay(h,a);return!d||!m?!1:Iw(n)||(s==="spring"||Jx(s))&&o}function $d(n){n.duration=0,n.type="keyframes"}const eb=new Set(["opacity","clipPath","filter","transform","backgroundColor"]),t2=/^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;function n2(n){for(let a=0;a<n.length;a++)if(typeof n[a]=="string"&&t2.test(n[a]))return!0;return!1}const r2=new Set(["color","backgroundColor","outlineColor","fill","stroke","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"]),a2=Sx(()=>Object.hasOwnProperty.call(Element.prototype,"animate"));function i2(n){var x;const{motionValue:a,name:s,repeatDelay:o,repeatType:u,damping:h,type:d,keyframes:m}=n,p=(x=a==null?void 0:a.owner)==null?void 0:x.current;if(!(p instanceof HTMLElement)&&!(p instanceof SVGElement))return!1;const{onUpdate:g,transformTemplate:v}=a.owner.getProps();return a2()&&s&&(eb.has(s)||r2.has(s)&&n2(m))&&(s!=="transform"||!v)&&!g&&!o&&u!=="mirror"&&h!==0&&d!=="inertia"}const s2=40;class l2 extends _f{constructor({autoplay:a=!0,delay:s=0,type:o="keyframes",repeat:u=0,repeatDelay:h=0,repeatType:d="loop",keyframes:m,name:p,motionValue:g,element:v,...x}){var E;super(),this.stop=()=>{var C,T;this._animation&&(this._animation.stop(),(C=this.stopTimeline)==null||C.call(this)),(T=this.keyframeResolver)==null||T.cancel()},this.createdAt=Nt.now();const b={autoplay:a,delay:s,type:o,repeat:u,repeatDelay:h,repeatType:d,name:p,motionValue:g,element:v,...x},j=(v==null?void 0:v.KeyframeResolver)||Vf;this.keyframeResolver=new j(m,(C,T,k)=>this.onKeyframesResolved(C,T,b,!k),p,g,v),(E=this.keyframeResolver)==null||E.scheduleResolve()}onKeyframesResolved(a,s,o,u){var k,A;this.keyframeResolver=void 0;const{name:h,type:d,velocity:m,delay:p,isHandoff:g,onUpdate:v}=o;this.resolvedAt=Nt.now();let x=!0;e2(a,h,d,m)||(x=!1,(Nr.instantAnimations||!p)&&(v==null||v(Bo(a,o,s))),a[0]=a[a.length-1],$d(o),o.repeat=0);const j={startTime:u?this.resolvedAt?this.resolvedAt-this.createdAt>s2?this.resolvedAt:this.createdAt:this.createdAt:void 0,finalKeyframe:s,...o,keyframes:a},E=x&&!g&&i2(j),C=(A=(k=j.motionValue)==null?void 0:k.owner)==null?void 0:A.current;let T;if(E)try{T=new Ww({...j,element:C})}catch{T=new Eo(j)}else T=new Eo(j);T.finished.then(()=>{this.notifyFinished()}).catch(on),this.pendingTimeline&&(this.stopTimeline=T.attachTimeline(this.pendingTimeline),this.pendingTimeline=void 0),this._animation=T}get finished(){return this._animation?this.animation.finished:this._finished}then(a,s){return this.finished.finally(a).then(()=>{})}get animation(){var a;return this._animation||((a=this.keyframeResolver)==null||a.resume(),Gw()),this._animation}get duration(){return this.animation.duration}get iterationDuration(){return this.animation.iterationDuration}get time(){return this.animation.time}set time(a){this.animation.time=a}get speed(){return this.animation.speed}get state(){return this.animation.state}set speed(a){this.animation.speed=a}get startTime(){return this.animation.startTime}attachTimeline(a){return this._animation?this.stopTimeline=this.animation.attachTimeline(a):this.pendingTimeline=a,()=>this.stop()}play(){this.animation.play()}pause(){this.animation.pause()}complete(){this.animation.complete()}cancel(){var a;this._animation&&this.animation.cancel(),(a=this.keyframeResolver)==null||a.cancel()}}function tb(n,a,s,o=0,u=1){const h=Array.from(n).sort((g,v)=>g.sortNodePosition(v)).indexOf(a),d=n.size,m=(d-1)*o;return typeof s=="function"?s(h,d):u===1?h*o:m-h*o}const ky=30,o2=n=>!isNaN(parseFloat(n));class c2{constructor(a,s={}){this.canTrackVelocity=null,this.events={},this.updateAndNotify=o=>{var h;const u=Nt.now();if(this.updatedAt!==u&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(o),this.current!==this.prev&&((h=this.events.change)==null||h.notify(this.current),this.dependents))for(const d of this.dependents)d.dirty()},this.hasAnimated=!1,this.setCurrent(a),this.owner=s.owner}setCurrent(a){this.current=a,this.updatedAt=Nt.now(),this.canTrackVelocity===null&&a!==void 0&&(this.canTrackVelocity=o2(this.current))}setPrevFrameValue(a=this.current){this.prevFrameValue=a,this.prevUpdatedAt=this.updatedAt}onChange(a){return this.on("change",a)}on(a,s){this.events[a]||(this.events[a]=new Nf);const o=this.events[a].add(s);return a==="change"?()=>{o(),$e.read(()=>{this.events.change.getSize()||this.stop()})}:o}clearListeners(){for(const a in this.events)this.events[a].clear()}attach(a,s){this.passiveEffect=a,this.stopPassiveEffect=s}set(a){this.passiveEffect?this.passiveEffect(a,this.updateAndNotify):this.updateAndNotify(a)}setWithVelocity(a,s,o){this.set(s),this.prev=void 0,this.prevFrameValue=a,this.prevUpdatedAt=this.updatedAt-o}jump(a,s=!0){this.updateAndNotify(a),this.prev=a,this.prevUpdatedAt=this.prevFrameValue=void 0,s&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}dirty(){var a;(a=this.events.change)==null||a.notify(this.current)}addDependent(a){this.dependents||(this.dependents=new Set),this.dependents.add(a)}removeDependent(a){this.dependents&&this.dependents.delete(a)}get(){return this.current}getPrevious(){return this.prev}getVelocity(){const a=Nt.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||a-this.updatedAt>ky)return 0;const s=Math.min(this.updatedAt-this.prevUpdatedAt,ky);return jx(parseFloat(this.current)-parseFloat(this.prevFrameValue),s)}start(a){return this.stop(),new Promise(s=>{this.hasAnimated=!0,this.animation=a(s),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){var a,s;(a=this.dependents)==null||a.clear(),(s=this.events.destroy)==null||s.notify(),this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}}function ei(n,a){return new c2(n,a)}function nb(n,a){if(n!=null&&n.inherit&&a){const{inherit:s,...o}=n;return{...a,...o}}return n}function Bf(n,a){const s=(n==null?void 0:n[a])??(n==null?void 0:n.default)??n;return s!==n?nb(s,n):s}const u2={type:"spring",stiffness:500,damping:25,restSpeed:10},d2=n=>({type:"spring",stiffness:550,damping:n===0?2*Math.sqrt(550):30,restSpeed:10}),f2={type:"keyframes",duration:.8},h2={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},m2=(n,{keyframes:a})=>a.length>2?f2:ai.has(n)?n.startsWith("scale")?d2(a[1]):u2:h2,p2=new Set(["when","delay","delayChildren","staggerChildren","staggerDirection","repeat","repeatType","repeatDelay","from","elapsed"]);function g2(n){for(const a in n)if(!p2.has(a))return!0;return!1}const Lf=(n,a,s,o={},u,h)=>d=>{const m=Bf(o,n)||{},p=m.delay||o.delay||0;let{elapsed:g=0}=o;g=g-Xt(p);const v={keyframes:Array.isArray(s)?s:[null,s],ease:"easeOut",velocity:a.getVelocity(),...m,delay:-g,onUpdate:b=>{a.set(b),m.onUpdate&&m.onUpdate(b)},onComplete:()=>{d(),m.onComplete&&m.onComplete()},name:n,motionValue:a,element:h?void 0:u};g2(m)||Object.assign(v,m2(n,v)),v.duration&&(v.duration=Xt(v.duration)),v.repeatDelay&&(v.repeatDelay=Xt(v.repeatDelay)),v.from!==void 0&&(v.keyframes[0]=v.from);let x=!1;if((v.type===!1||v.duration===0&&!v.repeatDelay)&&($d(v),v.delay===0&&(x=!0)),(Nr.instantAnimations||Nr.skipAnimations||u!=null&&u.shouldSkipAnimations||m.skipAnimations)&&(x=!0,$d(v),v.delay=0),v.allowFlatten=!m.type&&!m.ease,x&&!h&&a.get()!==void 0){const b=Bo(v.keyframes,m);if(b!==void 0){$e.update(()=>{v.onUpdate(b),v.onComplete()});return}}return m.isSync?new Eo(v):new l2(v)},y2=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function v2(n){const a=y2.exec(n);if(!a)return[,];const[,s,o,u]=a;return[`--${s??o}`,u]}function rb(n,a,s=1){const[o,u]=v2(n);if(!o)return;const h=window.getComputedStyle(a).getPropertyValue(o);if(h){const d=h.trim();return vx(d)?parseFloat(d):d}return kf(u)?rb(u,a,s+1):u}function My(n){const a=[{},{}];return n==null||n.values.forEach((s,o)=>{a[0][o]=s.get(),a[1][o]=s.getVelocity()}),a}function Uf(n,a,s,o){if(typeof a=="function"){const[u,h]=My(o);a=a(s!==void 0?s:n.custom,u,h)}if(typeof a=="string"&&(a=n.variants&&n.variants[a]),typeof a=="function"){const[u,h]=My(o);a=a(s!==void 0?s:n.custom,u,h)}return a}function na(n,a,s){const o=n.getProps();return Uf(o,a,s!==void 0?s:o.custom,n)}const ab=new Set(["width","height","top","left","right","bottom",...ri]),Xd=n=>Array.isArray(n);function x2(n,a,s){n.hasValue(a)?n.getValue(a).set(s):n.addValue(a,ei(s))}function b2(n){return Xd(n)?n[n.length-1]||0:n}function S2(n,a){const s=na(n,a);let{transitionEnd:o={},transition:u={},...h}=s||{};h={...h,...o};for(const d in h){const m=b2(h[d]);x2(n,d,m)}}const St=n=>!!(n&&n.getVelocity);function j2(n){return!!(St(n)&&n.add)}function Kd(n,a){const s=n.getValue("willChange");if(j2(s))return s.add(a);if(!s&&Nr.WillChange){const o=new Nr.WillChange("auto");n.addValue("willChange",o),o.add(a)}}function Hf(n){return n.replace(/([A-Z])/g,a=>`-${a.toLowerCase()}`)}const w2="framerAppearId",ib="data-"+Hf(w2);function sb(n){return n.props[ib]}function E2({protectedKeys:n,needsAnimating:a},s){const o=n.hasOwnProperty(s)&&a[s]!==!0;return a[s]=!1,o}function lb(n,a,{delay:s=0,transitionOverride:o,type:u}={}){let{transition:h,transitionEnd:d,...m}=a;const p=n.getDefaultTransition();h=h?nb(h,p):p;const g=h==null?void 0:h.reduceMotion,v=h==null?void 0:h.skipAnimations;o&&(h=o);const x=[],b=u&&n.animationState&&n.animationState.getState()[u],j=h==null?void 0:h.path;j&&j.animateVisualElement(n,m,h,s,x);for(const E in m){const C=n.getValue(E,n.latestValues[E]??null),T=m[E];if(T===void 0||b&&E2(b,E))continue;const k={delay:s,...Bf(h||{},E)};v&&(k.skipAnimations=!0);const A=C.get();if(A!==void 0&&!C.isAnimating()&&!Array.isArray(T)&&T===A&&!k.velocity){$e.update(()=>C.set(T));continue}let R=!1;if(window.MotionHandoffAnimation){const Y=sb(n);if(Y){const D=window.MotionHandoffAnimation(Y,E,$e);D!==null&&(k.startTime=D,R=!0)}}Kd(n,E);const _=g??n.shouldReduceMotion;C.start(Lf(E,C,T,_&&ab.has(E)?{type:!1}:k,n,R));const B=C.animation;B&&x.push(B)}if(d){const E=()=>$e.update(()=>{d&&S2(n,d)});x.length?Promise.all(x).then(E):E()}return x}function Zd(n,a,s={}){var p;const o=na(n,a,s.type==="exit"?(p=n.presenceContext)==null?void 0:p.custom:void 0);let{transition:u=n.getDefaultTransition()||{}}=o||{};s.transitionOverride&&(u=s.transitionOverride);const h=o?()=>Promise.all(lb(n,o,s)):()=>Promise.resolve(),d=n.variantChildren&&n.variantChildren.size?(g=0)=>{const{delayChildren:v=0,staggerChildren:x,staggerDirection:b}=u;return T2(n,a,g,v,x,b,s)}:()=>Promise.resolve(),{when:m}=u;if(m){const[g,v]=m==="beforeChildren"?[h,d]:[d,h];return g().then(()=>v())}else return Promise.all([h(),d(s.delay)])}function T2(n,a,s=0,o=0,u=0,h=1,d){const m=[];for(const p of n.variantChildren)p.notify("AnimationStart",a),m.push(Zd(p,a,{...d,delay:s+(typeof o=="function"?0:o)+tb(n.variantChildren,p,o,u,h)}).then(()=>p.notify("AnimationComplete",a)));return Promise.all(m)}function C2(n,a,s={}){n.notify("AnimationStart",a);let o;if(Array.isArray(a)){const u=a.map(h=>Zd(n,h,s));o=Promise.all(u)}else if(typeof a=="string")o=Zd(n,a,s);else{const u=typeof a=="function"?na(n,a,s.custom):a;o=Promise.all(lb(n,u,s))}return o.then(()=>{n.notify("AnimationComplete",a)})}const N2={test:n=>n==="auto",parse:n=>n},ob=n=>a=>a.test(n),cb=[ni,ge,Nn,Kn,Ij,Wj,N2],Ry=n=>cb.find(ob(n));function D2(n){return typeof n=="number"?n===0:n!==null?n==="none"||n==="0"||bx(n):!0}const A2=new Set(["brightness","contrast","saturate","opacity"]);function k2(n){const[a,s]=n.slice(0,-1).split("(");if(a==="drop-shadow")return n;const[o]=s.match(Mf)||[];if(!o)return n;const u=s.replace(o,"");let h=A2.has(a)?1:0;return o!==s&&(h*=100),a+"("+h+u+")"}const M2=/\b([a-z-]*)\(.*?\)/gu,Qd={...gn,getAnimatableNone:n=>{const a=n.match(M2);return a?a.map(k2).join(" "):n}},Jd={...gn,getAnimatableNone:n=>{const a=gn.parse(n);return gn.createTransformer(n)(a.map(o=>typeof o=="number"?0:typeof o=="object"?{...o,alpha:1}:o))}},Oy={...ni,transform:Math.round},R2={rotate:Kn,pathRotation:Kn,rotateX:Kn,rotateY:Kn,rotateZ:Kn,scale:Zl,scaleX:Zl,scaleY:Zl,scaleZ:Zl,skew:Kn,skewX:Kn,skewY:Kn,distance:ge,translateX:ge,translateY:ge,translateZ:ge,x:ge,y:ge,z:ge,perspective:ge,transformPerspective:ge,opacity:fs,originX:xy,originY:xy,originZ:ge},To={borderWidth:ge,borderTopWidth:ge,borderRightWidth:ge,borderBottomWidth:ge,borderLeftWidth:ge,borderRadius:ge,borderTopLeftRadius:ge,borderTopRightRadius:ge,borderBottomRightRadius:ge,borderBottomLeftRadius:ge,width:ge,maxWidth:ge,height:ge,maxHeight:ge,top:ge,right:ge,bottom:ge,left:ge,inset:ge,insetBlock:ge,insetBlockStart:ge,insetBlockEnd:ge,insetInline:ge,insetInlineStart:ge,insetInlineEnd:ge,padding:ge,paddingTop:ge,paddingRight:ge,paddingBottom:ge,paddingLeft:ge,paddingBlock:ge,paddingBlockStart:ge,paddingBlockEnd:ge,paddingInline:ge,paddingInlineStart:ge,paddingInlineEnd:ge,margin:ge,marginTop:ge,marginRight:ge,marginBottom:ge,marginLeft:ge,marginBlock:ge,marginBlockStart:ge,marginBlockEnd:ge,marginInline:ge,marginInlineStart:ge,marginInlineEnd:ge,fontSize:ge,backgroundPositionX:ge,backgroundPositionY:ge,...R2,zIndex:Oy,fillOpacity:fs,strokeOpacity:fs,numOctaves:Oy},O2={...To,color:lt,backgroundColor:lt,outlineColor:lt,fill:lt,stroke:lt,borderColor:lt,borderTopColor:lt,borderRightColor:lt,borderBottomColor:lt,borderLeftColor:lt,filter:Qd,WebkitFilter:Qd,mask:Jd,WebkitMask:Jd},ub=n=>O2[n],z2=new Set([Qd,Jd]);function db(n,a){let s=ub(n);return z2.has(s)||(s=gn),s.getAnimatableNone?s.getAnimatableNone(a):void 0}const _2=new Set(["auto","none","0"]);function V2(n,a,s){let o=0,u;for(;o<n.length&&!u;){const h=n[o];typeof h=="string"&&!_2.has(h)&&Ia(h).values.length&&(u=n[o]),o++}if(u&&s)for(const h of a)n[h]=db(s,u)}class B2 extends Vf{constructor(a,s,o,u,h){super(a,s,o,u,h,!0)}readKeyframes(){const{unresolvedKeyframes:a,element:s,name:o}=this;if(!s||!s.current)return;super.readKeyframes();for(let v=0;v<a.length;v++){let x=a[v];if(typeof x=="string"&&(x=x.trim(),kf(x))){const b=rb(x,s.current);b!==void 0&&(a[v]=b),v===a.length-1&&(this.finalKeyframe=x)}}if(this.resolveNoneKeyframes(),!ab.has(o)||a.length!==2)return;const[u,h]=a,d=Ry(u),m=Ry(h),p=vy(u),g=vy(h);if(p!==g&&Tr[o]){this.needsMeasurement=!0;return}if(d!==m)if(Ny(d)&&Ny(m))for(let v=0;v<a.length;v++){const x=a[v];typeof x=="string"&&(a[v]=parseFloat(x))}else Tr[o]&&(this.needsMeasurement=!0)}resolveNoneKeyframes(){const{unresolvedKeyframes:a,name:s}=this,o=[];for(let u=0;u<a.length;u++)(a[u]===null||D2(a[u]))&&o.push(u);o.length&&V2(a,o,s)}measureInitialState(){const{element:a,unresolvedKeyframes:s,name:o}=this;if(!a||!a.current)return;o==="height"&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=Tr[o](a.measureViewportBox(),window.getComputedStyle(a.current)),s[0]=this.measuredOrigin;const u=s[s.length-1];u!==void 0&&a.getValue(o,u).jump(u,!1)}measureEndState(){var m;const{element:a,name:s,unresolvedKeyframes:o}=this;if(!a||!a.current)return;const u=a.getValue(s);u&&u.jump(this.measuredOrigin,!1);const h=o.length-1,d=o[h];o[h]=Tr[s](a.measureViewportBox(),window.getComputedStyle(a.current)),d!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=d),(m=this.removedTransforms)!=null&&m.length&&this.removedTransforms.forEach(([p,g])=>{a.getValue(p).set(g)}),this.resolveNoneKeyframes()}}const qf=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"];function fb(n,a,s){if(n==null)return[];if(n instanceof EventTarget)return[n];if(typeof n=="string"){let o=document;const u=(s==null?void 0:s[n])??o.querySelectorAll(n);return u?Array.from(u):[]}return Array.from(n).filter(o=>o!=null)}const Wd=(n,a)=>a&&typeof n=="number"?a.transform(n):n;function co(n){return xx(n)&&"offsetHeight"in n&&!("ownerSVGElement"in n)}const{schedule:Yf}=Ox(queueMicrotask,!1),pn={x:!1,y:!1};function hb(){return pn.x||pn.y}function L2(n){return n==="x"||n==="y"?pn[n]?null:(pn[n]=!0,()=>{pn[n]=!1}):pn.x||pn.y?null:(pn.x=pn.y=!0,()=>{pn.x=pn.y=!1})}function mb(n,a){const s=fb(n),o=new AbortController,u={passive:!0,...a,signal:o.signal};return[s,u,()=>o.abort()]}function U2(n){return!(n.pointerType==="touch"||hb())}function H2(n,a,s={}){const[o,u,h]=mb(n,s);return o.forEach(d=>{let m=!1,p=!1,g;const v=()=>{d.removeEventListener("pointerleave",E)},x=T=>{g&&(g(T),g=void 0),v()},b=T=>{m=!1,window.removeEventListener("pointerup",b),window.removeEventListener("pointercancel",b),p&&(p=!1,x(T))},j=()=>{m=!0,window.addEventListener("pointerup",b,u),window.addEventListener("pointercancel",b,u)},E=T=>{if(T.pointerType!=="touch"){if(m){p=!0;return}x(T)}},C=T=>{if(!U2(T))return;p=!1;const k=a(d,T);typeof k=="function"&&(g=k,d.addEventListener("pointerleave",E,u))};d.addEventListener("pointerenter",C,u),d.addEventListener("pointerdown",j,u)}),h}const pb=(n,a)=>a?n===a?!0:pb(n,a.parentElement):!1,Pf=n=>n.pointerType==="mouse"?typeof n.button!="number"||n.button<=0:n.isPrimary!==!1,q2=new Set(["BUTTON","INPUT","SELECT","TEXTAREA","A"]);function Y2(n){return q2.has(n.tagName)||n.isContentEditable===!0}const P2=new Set(["INPUT","SELECT","TEXTAREA"]);function G2(n){return P2.has(n.tagName)||n.isContentEditable===!0}const uo=new WeakSet;function zy(n){return a=>{a.key==="Enter"&&n(a)}}function md(n,a){n.dispatchEvent(new PointerEvent("pointer"+a,{isPrimary:!0,bubbles:!0}))}const F2=(n,a)=>{const s=n.currentTarget;if(!s)return;const o=zy(()=>{if(uo.has(s))return;md(s,"down");const u=zy(()=>{md(s,"up")}),h=()=>md(s,"cancel");s.addEventListener("keyup",u,a),s.addEventListener("blur",h,a)});s.addEventListener("keydown",o,a),s.addEventListener("blur",()=>s.removeEventListener("keydown",o),a)};function _y(n){return Pf(n)&&!hb()}const Vy=new WeakSet;function $2(n,a,s={}){const[o,u,h]=mb(n,s),d=m=>{const p=m.currentTarget;if(!_y(m)||Vy.has(m))return;uo.add(p),s.stopPropagation&&Vy.add(m);const g=a(p,m),v={...u,capture:!0},x=(E,C)=>{window.removeEventListener("pointerup",b,v),window.removeEventListener("pointercancel",j,v),uo.has(p)&&uo.delete(p),_y(E)&&typeof g=="function"&&g(E,{success:C})},b=E=>{x(E,p===window||p===document||s.useGlobalTarget||pb(p,E.target))},j=E=>{x(E,!1)};window.addEventListener("pointerup",b,v),window.addEventListener("pointercancel",j,v)};return o.forEach(m=>{(s.useGlobalTarget?window:m).addEventListener("pointerdown",d,u),co(m)&&(m.addEventListener("focus",g=>F2(g,u)),!Y2(m)&&!m.hasAttribute("tabindex")&&(m.tabIndex=0))}),h}function Gf(n){return xx(n)&&"ownerSVGElement"in n}const fo=new WeakMap;let Er;const gb=(n,a,s)=>(o,u)=>u&&u[0]?u[0][n+"Size"]:Gf(o)&&"getBBox"in o?o.getBBox()[a]:o[s],X2=gb("inline","width","offsetWidth"),K2=gb("block","height","offsetHeight");function Z2({target:n,borderBoxSize:a}){var s;(s=fo.get(n))==null||s.forEach(o=>{o(n,{get width(){return X2(n,a)},get height(){return K2(n,a)}})})}function Q2(n){n.forEach(Z2)}function J2(){typeof ResizeObserver>"u"||(Er=new ResizeObserver(Q2))}function W2(n,a){Er||J2();const s=fb(n);return s.forEach(o=>{let u=fo.get(o);u||(u=new Set,fo.set(o,u)),u.add(a),Er==null||Er.observe(o)}),()=>{s.forEach(o=>{const u=fo.get(o);u==null||u.delete(a),u!=null&&u.size||Er==null||Er.unobserve(o)})}}const ho=new Set;let Qa;function I2(){Qa=()=>{const n={get width(){return window.innerWidth},get height(){return window.innerHeight}};ho.forEach(a=>a(n))},window.addEventListener("resize",Qa)}function eE(n){return ho.add(n),Qa||I2(),()=>{ho.delete(n),!ho.size&&typeof Qa=="function"&&(window.removeEventListener("resize",Qa),Qa=void 0)}}function By(n,a){return typeof n=="function"?eE(n):W2(n,a)}function tE(n){return Gf(n)&&n.tagName==="svg"}const nE=[...cb,lt,gn],rE=n=>nE.find(ob(n)),Ly=()=>({translate:0,scale:1,origin:0,originPoint:0}),Ja=()=>({x:Ly(),y:Ly()}),Uy=()=>({min:0,max:0}),dt=()=>({x:Uy(),y:Uy()}),aE=new WeakMap;function Lo(n){return n!==null&&typeof n=="object"&&typeof n.start=="function"}function hs(n){return typeof n=="string"||Array.isArray(n)}const Ff=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],$f=["initial",...Ff];function Uo(n){return Lo(n.animate)||$f.some(a=>hs(n[a]))}function yb(n){return!!(Uo(n)||n.variants)}function iE(n,a,s){for(const o in a){const u=a[o],h=s[o];if(St(u))n.addValue(o,u);else if(St(h))n.addValue(o,ei(u,{owner:n}));else if(h!==u)if(n.hasValue(o)){const d=n.getValue(o);d.liveStyle===!0?d.jump(u):d.hasAnimated||d.set(u)}else{const d=n.getStaticValue(o);n.addValue(o,ei(d!==void 0?d:u,{owner:n}))}}for(const o in s)a[o]===void 0&&n.removeValue(o);return a}const Co={current:null},Xf={current:!1},sE=typeof window<"u";function vb(){if(Xf.current=!0,!!sE)if(window.matchMedia){const n=window.matchMedia("(prefers-reduced-motion)"),a=()=>Co.current=n.matches;n.addEventListener("change",a),a()}else Co.current=!1}const Hy=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"];let No={};function xb(n){No=n}function lE(){return No}class oE{scrapeMotionValuesFromProps(a,s,o){return{}}constructor({parent:a,props:s,presenceContext:o,reducedMotionConfig:u,skipAnimations:h,blockInitialAnimation:d,visualState:m},p={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.shouldSkipAnimations=!1,this.values=new Map,this.KeyframeResolver=Vf,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.hasBeenMounted=!1,this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{const j=Nt.now();this.renderScheduledAt<j&&(this.renderScheduledAt=j,$e.render(this.render,!1,!0))};const{latestValues:g,renderState:v}=m;this.latestValues=g,this.baseTarget={...g},this.initialValues=s.initial?{...g}:{},this.renderState=v,this.parent=a,this.props=s,this.presenceContext=o,this.depth=a?a.depth+1:0,this.reducedMotionConfig=u,this.skipAnimationsConfig=h,this.options=p,this.blockInitialAnimation=!!d,this.isControllingVariants=Uo(s),this.isVariantNode=yb(s),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(a&&a.current);const{willChange:x,...b}=this.scrapeMotionValuesFromProps(s,{},this);for(const j in b){const E=b[j];g[j]!==void 0&&St(E)&&E.set(g[j])}}mount(a){var s,o;if(this.hasBeenMounted)for(const u in this.initialValues)(s=this.values.get(u))==null||s.jump(this.initialValues[u]),this.latestValues[u]=this.initialValues[u];this.current=a,aE.set(a,this),this.projection&&!this.projection.instance&&this.projection.mount(a),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((u,h)=>this.bindToMotionValue(h,u)),this.reducedMotionConfig==="never"?this.shouldReduceMotion=!1:this.reducedMotionConfig==="always"?this.shouldReduceMotion=!0:(Xf.current||vb(),this.shouldReduceMotion=Co.current),this.shouldSkipAnimations=this.skipAnimationsConfig??!1,(o=this.parent)==null||o.addChild(this),this.update(this.props,this.presenceContext),this.hasBeenMounted=!0}unmount(){var a;this.projection&&this.projection.unmount(),Dr(this.notifyUpdate),Dr(this.render),this.valueSubscriptions.forEach(s=>s()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),(a=this.parent)==null||a.removeChild(this);for(const s in this.events)this.events[s].clear();for(const s in this.features){const o=this.features[s];o&&(o.unmount(),o.isMounted=!1)}this.current=null}addChild(a){this.children.add(a),this.enteringChildren??(this.enteringChildren=new Set),this.enteringChildren.add(a)}removeChild(a){this.children.delete(a),this.enteringChildren&&this.enteringChildren.delete(a)}bindToMotionValue(a,s){if(this.valueSubscriptions.has(a)&&this.valueSubscriptions.get(a)(),s.accelerate&&eb.has(a)&&this.current instanceof HTMLElement){const{factory:d,keyframes:m,times:p,ease:g,duration:v}=s.accelerate,x=new Wx({element:this.current,name:a,keyframes:m,times:p,ease:g,duration:Xt(v)}),b=d(x);this.valueSubscriptions.set(a,()=>{b(),x.cancel()});return}const o=ai.has(a);o&&this.onBindTransform&&this.onBindTransform();const u=s.on("change",d=>{this.latestValues[a]=d,this.props.onUpdate&&$e.preRender(this.notifyUpdate),o&&this.projection&&(this.projection.isTransformDirty=!0),this.scheduleRender()});let h;typeof window<"u"&&window.MotionCheckAppearSync&&(h=window.MotionCheckAppearSync(this,a,s)),this.valueSubscriptions.set(a,()=>{u(),h&&h()})}sortNodePosition(a){return!this.current||!this.sortInstanceNodePosition||this.type!==a.type?0:this.sortInstanceNodePosition(this.current,a.current)}updateFeatures(){let a="animation";for(a in No){const s=No[a];if(!s)continue;const{isEnabled:o,Feature:u}=s;if(!this.features[a]&&u&&o(this.props)&&(this.features[a]=new u(this)),this.features[a]){const h=this.features[a];h.isMounted?h.update():(h.mount(),h.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):dt()}getStaticValue(a){return this.latestValues[a]}setStaticValue(a,s){this.latestValues[a]=s}update(a,s){(a.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=a,this.prevPresenceContext=this.presenceContext,this.presenceContext=s;for(let o=0;o<Hy.length;o++){const u=Hy[o];this.propEventSubscriptions[u]&&(this.propEventSubscriptions[u](),delete this.propEventSubscriptions[u]);const h="on"+u,d=a[h];d&&(this.propEventSubscriptions[u]=this.on(u,d))}this.prevMotionValues=iE(this,this.scrapeMotionValuesFromProps(a,this.prevProps||{},this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue()}getProps(){return this.props}getVariant(a){return this.props.variants?this.props.variants[a]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(a){const s=this.getClosestVariantNode();if(s)return s.variantChildren&&s.variantChildren.add(a),()=>s.variantChildren.delete(a)}addValue(a,s){const o=this.values.get(a);s!==o&&(o&&this.removeValue(a),this.bindToMotionValue(a,s),this.values.set(a,s),this.latestValues[a]=s.get())}removeValue(a){this.values.delete(a);const s=this.valueSubscriptions.get(a);s&&(s(),this.valueSubscriptions.delete(a)),delete this.latestValues[a],this.removeValueFromRenderState(a,this.renderState)}hasValue(a){return this.values.has(a)}getValue(a,s){if(this.props.values&&this.props.values[a])return this.props.values[a];let o=this.values.get(a);return o===void 0&&s!==void 0&&(o=ei(s===null?void 0:s,{owner:this}),this.addValue(a,o)),o}readValue(a,s){let o=this.latestValues[a]!==void 0||!this.current?this.latestValues[a]:this.getBaseTargetFromProps(this.props,a)??this.readValueFromInstance(this.current,a,this.options);return o!=null&&(typeof o=="string"&&(vx(o)||bx(o))?o=parseFloat(o):!rE(o)&&gn.test(s)&&(o=db(a,s)),this.setBaseTarget(a,St(o)?o.get():o)),St(o)?o.get():o}setBaseTarget(a,s){this.baseTarget[a]=s}getBaseTarget(a){var h;const{initial:s}=this.props;let o;if(typeof s=="string"||typeof s=="object"){const d=Uf(this.props,s,(h=this.presenceContext)==null?void 0:h.custom);d&&(o=d[a])}if(s&&o!==void 0)return o;const u=this.getBaseTargetFromProps(this.props,a);return u!==void 0&&!St(u)?u:this.initialValues[a]!==void 0&&o===void 0?void 0:this.baseTarget[a]}on(a,s){return this.events[a]||(this.events[a]=new Nf),this.events[a].add(s)}notify(a,...s){this.events[a]&&this.events[a].notify(...s)}scheduleRenderMicrotask(){Yf.render(this.render)}}class bb extends oE{constructor(){super(...arguments),this.KeyframeResolver=B2}sortInstanceNodePosition(a,s){return a.compareDocumentPosition(s)&2?1:-1}getBaseTargetFromProps(a,s){const o=a.style;return o?o[s]:void 0}removeValueFromRenderState(a,{vars:s,style:o}){delete s[a],delete o[a]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);const{children:a}=this.props;St(a)&&(this.childSubscription=a.on("change",s=>{this.current&&(this.current.textContent=`${s}`)}))}}class kr{constructor(a){this.isMounted=!1,this.node=a}update(){}}function Sb({top:n,left:a,right:s,bottom:o}){return{x:{min:a,max:s},y:{min:n,max:o}}}function cE({x:n,y:a}){return{top:a.min,right:n.max,bottom:a.max,left:n.min}}function uE(n,a){if(!a)return n;const s=a({x:n.left,y:n.top}),o=a({x:n.right,y:n.bottom});return{top:s.y,left:s.x,bottom:o.y,right:o.x}}function pd(n){return n===void 0||n===1}function Id({scale:n,scaleX:a,scaleY:s}){return!pd(n)||!pd(a)||!pd(s)}function Wr(n){return Id(n)||jb(n)||n.z||n.rotate||n.rotateX||n.rotateY||n.skewX||n.skewY}function jb(n){return qy(n.x)||qy(n.y)}function qy(n){return n&&n!=="0%"}function Do(n,a,s){const o=n-s,u=a*o;return s+u}function Yy(n,a,s,o,u){return u!==void 0&&(n=Do(n,u,o)),Do(n,s,o)+a}function ef(n,a=0,s=1,o,u){n.min=Yy(n.min,a,s,o,u),n.max=Yy(n.max,a,s,o,u)}function wb(n,{x:a,y:s}){ef(n.x,a.translate,a.scale,a.originPoint),ef(n.y,s.translate,s.scale,s.originPoint)}const Py=.999999999999,Gy=1.0000000000001;function dE(n,a,s,o=!1){var m;const u=s.length;if(!u)return;a.x=a.y=1;let h,d;for(let p=0;p<u;p++){h=s[p],d=h.projectionDelta;const{visualElement:g}=h.options;g&&g.props.style&&g.props.style.display==="contents"||(o&&h.options.layoutScroll&&h.scroll&&h!==h.root&&(Tn(n.x,-h.scroll.offset.x),Tn(n.y,-h.scroll.offset.y)),d&&(a.x*=d.x.scale,a.y*=d.y.scale,wb(n,d)),o&&Wr(h.latestValues)&&mo(n,h.latestValues,(m=h.layout)==null?void 0:m.layoutBox))}a.x<Gy&&a.x>Py&&(a.x=1),a.y<Gy&&a.y>Py&&(a.y=1)}function Tn(n,a){n.min+=a,n.max+=a}function Fy(n,a,s,o,u=.5){const h=Fe(n.min,n.max,u);ef(n,a,s,h,o)}function $y(n,a){return typeof n=="string"?parseFloat(n)/100*(a.max-a.min):n}function mo(n,a,s){const o=s??n;Fy(n.x,$y(a.x,o.x),a.scaleX,a.scale,a.originX),Fy(n.y,$y(a.y,o.y),a.scaleY,a.scale,a.originY)}function Eb(n,a){return Sb(uE(n.getBoundingClientRect(),a))}function fE(n,a,s){const o=Eb(n,s),{scroll:u}=a;return u&&(Tn(o.x,u.offset.x),Tn(o.y,u.offset.y)),o}const hE={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},mE=ri.length;function pE(n,a,s){let o="",u=!0;for(let d=0;d<mE;d++){const m=ri[d],p=n[m];if(p===void 0)continue;let g=!0;if(typeof p=="number")g=p===(m.startsWith("scale")?1:0);else{const v=parseFloat(p);g=m.startsWith("scale")?v===1:v===0}if(!g||s){const v=Wd(p,To[m]);if(!g){u=!1;const x=hE[m]||m;o+=`${x}(${v}) `}s&&(a[m]=v)}}const h=n.pathRotation;return h&&(u=!1,o+=`rotate(${Wd(h,To.pathRotation)}) `),o=o.trim(),s?o=s(a,u?"":o):u&&(o="none"),o}function Kf(n,a,s){const{style:o,vars:u,transformOrigin:h}=n;let d=!1,m=!1;for(const p in a){const g=a[p];if(ai.has(p)){d=!0;continue}else if(_x(p)){u[p]=g;continue}else{const v=Wd(g,To[p]);p.startsWith("origin")?(m=!0,h[p]=v):o[p]=v}}if(a.transform||(d||s?o.transform=pE(a,n.transform,s):o.transform&&(o.transform="none")),m){const{originX:p="50%",originY:g="50%",originZ:v=0}=h;o.transformOrigin=`${p} ${g} ${v}`}}function Tb(n,{style:a,vars:s},o,u){const h=n.style;let d;for(d in a)h[d]=a[d];u==null||u.applyProjectionStyles(h,o);for(d in s)h.setProperty(d,s[d])}function Xy(n,a){return a.max===a.min?0:n/(a.max-a.min)*100}const ns={correct:(n,a)=>{if(!a.target)return n;if(typeof n=="string")if(ge.test(n))n=parseFloat(n);else return n;const s=Xy(n,a.target.x),o=Xy(n,a.target.y);return`${s}% ${o}%`}},gE={correct:(n,{treeScale:a,projectionDelta:s})=>{const o=n,u=gn.parse(n);if(u.length>5)return o;const h=gn.createTransformer(n),d=typeof u[0]!="number"?1:0,m=s.x.scale*a.x,p=s.y.scale*a.y;u[0+d]/=m,u[1+d]/=p;const g=Fe(m,p,.5);return typeof u[2+d]=="number"&&(u[2+d]/=g),typeof u[3+d]=="number"&&(u[3+d]/=g),h(u)}},tf={borderRadius:{...ns,applyTo:[...qf]},borderTopLeftRadius:ns,borderTopRightRadius:ns,borderBottomLeftRadius:ns,borderBottomRightRadius:ns,boxShadow:gE};function Cb(n,{layout:a,layoutId:s}){return ai.has(n)||n.startsWith("origin")||(a||s!==void 0)&&(!!tf[n]||n==="opacity")}function Zf(n,a,s){var d;const o=n.style,u=a==null?void 0:a.style,h={};if(!o)return h;for(const m in o)(St(o[m])||u&&St(u[m])||Cb(m,n)||((d=s==null?void 0:s.getValue(m))==null?void 0:d.liveStyle)!==void 0)&&(h[m]=o[m]);return h}function yE(n){return window.getComputedStyle(n)}class vE extends bb{constructor(){super(...arguments),this.type="html",this.renderInstance=Tb}mount(a){Vo(!!a.style),super.mount(a)}readValueFromInstance(a,s){var o;if(ai.has(s))return(o=this.projection)!=null&&o.isProjecting?qd(s):Uw(a,s);{const u=yE(a),h=(_x(s)?u.getPropertyValue(s):u[s])||0;return typeof h=="string"?h.trim():h}}measureInstanceViewportBox(a,{transformPagePoint:s}){return Eb(a,s)}build(a,s,o){Kf(a,s,o.transformTemplate)}scrapeMotionValuesFromProps(a,s,o){return Zf(a,s,o)}}const xE={offset:"stroke-dashoffset",array:"stroke-dasharray"},bE={offset:"strokeDashoffset",array:"strokeDasharray"};function SE(n,a,s=1,o=0,u=!0){n.pathLength=1;const h=u?xE:bE;n[h.offset]=`${-o}`,n[h.array]=`${a} ${s}`}const jE=["offsetDistance","offsetPath","offsetRotate","offsetAnchor"];function Nb(n,{attrX:a,attrY:s,attrScale:o,pathLength:u,pathSpacing:h=1,pathOffset:d=0,...m},p,g,v){if(Kf(n,m,g),p){n.style.viewBox&&(n.attrs.viewBox=n.style.viewBox);return}n.attrs=n.style,n.style={};const{attrs:x,style:b}=n;x.transform&&(b.transform=x.transform,delete x.transform),(b.transform||x.transformOrigin)&&(b.transformOrigin=x.transformOrigin??"50% 50%",delete x.transformOrigin),b.transform&&(b.transformBox=(v==null?void 0:v.transformBox)??"fill-box",delete x.transformBox);for(const j of jE)x[j]!==void 0&&(b[j]=x[j],delete x[j]);a!==void 0&&(x.x=a),s!==void 0&&(x.y=s),o!==void 0&&(x.scale=o),u!==void 0&&SE(x,u,h,d,!1)}const Db=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]),Ab=n=>typeof n=="string"&&n.toLowerCase()==="svg";function wE(n,a,s,o){Tb(n,a,void 0,o);for(const u in a.attrs)n.setAttribute(Db.has(u)?u:Hf(u),a.attrs[u])}function kb(n,a,s){const o=Zf(n,a,s);for(const u in n)if(St(n[u])||St(a[u])){const h=ri.indexOf(u)!==-1?"attr"+u.charAt(0).toUpperCase()+u.substring(1):u;o[h]=n[u]}return o}class EE extends bb{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1,this.measureInstanceViewportBox=dt}getBaseTargetFromProps(a,s){return a[s]}readValueFromInstance(a,s){if(ai.has(s)){const o=ub(s);return o&&o.default||0}return s=Db.has(s)?s:Hf(s),a.getAttribute(s)}scrapeMotionValuesFromProps(a,s,o){return kb(a,s,o)}build(a,s,o){Nb(a,s,this.isSVGTag,o.transformTemplate,o.style)}renderInstance(a,s,o,u){wE(a,s,o,u)}mount(a){this.isSVGTag=Ab(a.tagName),super.mount(a)}}const TE=$f.length;function Mb(n){if(!n)return;if(!n.isControllingVariants){const s=n.parent?Mb(n.parent)||{}:{};return n.props.initial!==void 0&&(s.initial=n.props.initial),s}const a={};for(let s=0;s<TE;s++){const o=$f[s],u=n.props[o];(hs(u)||u===!1)&&(a[o]=u)}return a}function Rb(n,a){if(!Array.isArray(a))return!1;const s=a.length;if(s!==n.length)return!1;for(let o=0;o<s;o++)if(a[o]!==n[o])return!1;return!0}const CE=[...Ff].reverse(),NE=Ff.length;function DE(n){return a=>Promise.all(a.map(({animation:s,options:o})=>C2(n,s,o)))}function AE(n){let a=DE(n),s=Ky(),o=!0,u=!1;const h=g=>(v,x)=>{var j;const b=na(n,x,g==="exit"?(j=n.presenceContext)==null?void 0:j.custom:void 0);if(b){const{transition:E,transitionEnd:C,...T}=b;v={...v,...T,...C}}return v};function d(g){a=g(n)}function m(g){const{props:v}=n,x=Mb(n.parent)||{},b=[],j=new Set;let E={},C=1/0;for(let k=0;k<NE;k++){const A=CE[k],R=s[A],_=v[A]!==void 0?v[A]:x[A],B=hs(_),Y=A===g?R.isActive:null;Y===!1&&(C=k);let D=_===x[A]&&_!==v[A]&&B;if(D&&(o||u)&&n.manuallyAnimateOnMount&&(D=!1),R.protectedKeys={...E},!R.isActive&&Y===null||!_&&!R.prevProp||Lo(_)||typeof _=="boolean")continue;if(A==="exit"&&R.isActive&&Y!==!0){R.prevResolvedValues&&(E={...E,...R.prevResolvedValues});continue}const H=kE(R.prevProp,_);let M=H||A===g&&R.isActive&&!D&&B||k>C&&B,z=!1;const L=Array.isArray(_)?_:[_];let K=L.reduce(h(A),{});Y===!1&&(K={});const{prevResolvedValues:ce={}}=R,se={...ce,...K},ye=J=>{M=!0,j.has(J)&&(z=!0,j.delete(J)),R.needsAnimating[J]=!0;const $=n.getValue(J);$&&($.liveStyle=!1)};for(const J in se){const $=K[J],ae=ce[J];if(E.hasOwnProperty(J))continue;let N=!1;Xd($)&&Xd(ae)?N=!Rb($,ae)||H:N=$!==ae,N?$!=null?ye(J):j.add(J):$!==void 0&&j.has(J)?ye(J):R.protectedKeys[J]=!0}R.prevProp=_,R.prevResolvedValues=K,R.isActive&&(E={...E,...K}),(o||u)&&n.blockInitialAnimation&&(M=!1);const P=D&&H;M&&(!P||z)&&b.push(...L.map(J=>{const $={type:A};if(typeof J=="string"&&(o||u)&&!P&&n.manuallyAnimateOnMount&&n.parent){const{parent:ae}=n,N=na(ae,J);if(ae.enteringChildren&&N){const{delayChildren:V}=N.transition||{};$.delay=tb(ae.enteringChildren,n,V)}}return{animation:J,options:$}}))}if(j.size){const k={};if(typeof v.initial!="boolean"){const A=na(n,Array.isArray(v.initial)?v.initial[0]:v.initial);A&&A.transition&&(k.transition=A.transition)}j.forEach(A=>{const R=n.getBaseTarget(A),_=n.getValue(A);_&&(_.liveStyle=!0),k[A]=R??null}),b.push({animation:k})}let T=!!b.length;return o&&(v.initial===!1||v.initial===v.animate)&&!n.manuallyAnimateOnMount&&(T=!1),o=!1,u=!1,T?a(b):Promise.resolve()}function p(g,v){var b;if(s[g].isActive===v)return Promise.resolve();(b=n.variantChildren)==null||b.forEach(j=>{var E;return(E=j.animationState)==null?void 0:E.setActive(g,v)}),s[g].isActive=v;const x=m(g);for(const j in s)s[j].protectedKeys={};return x}return{animateChanges:m,setActive:p,setAnimateFunction:d,getState:()=>s,reset:()=>{s=Ky(),u=!0}}}function kE(n,a){return typeof a=="string"?a!==n:Array.isArray(a)?!Rb(a,n):!1}function Jr(n=!1){return{isActive:n,protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}function Ky(){return{animate:Jr(!0),whileInView:Jr(),whileHover:Jr(),whileTap:Jr(),whileDrag:Jr(),whileFocus:Jr(),exit:Jr()}}function nf(n,a){n.min=a.min,n.max=a.max}function mn(n,a){nf(n.x,a.x),nf(n.y,a.y)}function Zy(n,a){n.translate=a.translate,n.scale=a.scale,n.originPoint=a.originPoint,n.origin=a.origin}const Ob=1e-4,ME=1-Ob,RE=1+Ob,zb=.01,OE=0-zb,zE=0+zb;function Dt(n){return n.max-n.min}function _E(n,a,s){return Math.abs(n-a)<=s}function Qy(n,a,s,o=.5){n.origin=o,n.originPoint=Fe(a.min,a.max,n.origin),n.scale=Dt(s)/Dt(a),n.translate=Fe(s.min,s.max,n.origin)-n.originPoint,(n.scale>=ME&&n.scale<=RE||isNaN(n.scale))&&(n.scale=1),(n.translate>=OE&&n.translate<=zE||isNaN(n.translate))&&(n.translate=0)}function os(n,a,s,o){Qy(n.x,a.x,s.x,o?o.originX:void 0),Qy(n.y,a.y,s.y,o?o.originY:void 0)}function Jy(n,a,s,o=0){const u=o?Fe(s.min,s.max,o):s.min;n.min=u+a.min,n.max=n.min+Dt(a)}function VE(n,a,s,o){Jy(n.x,a.x,s.x,o==null?void 0:o.x),Jy(n.y,a.y,s.y,o==null?void 0:o.y)}function Wy(n,a,s,o=0){const u=o?Fe(s.min,s.max,o):s.min;n.min=a.min-u,n.max=n.min+Dt(a)}function Ao(n,a,s,o){Wy(n.x,a.x,s.x,o==null?void 0:o.x),Wy(n.y,a.y,s.y,o==null?void 0:o.y)}function Iy(n,a,s,o,u){return n-=a,n=Do(n,1/s,o),u!==void 0&&(n=Do(n,1/u,o)),n}function BE(n,a=0,s=1,o=.5,u,h=n,d=n){if(Nn.test(a)&&(a=parseFloat(a),a=Fe(d.min,d.max,a/100)-d.min),typeof a!="number")return;let m=Fe(h.min,h.max,o);n===h&&(m-=a),n.min=Iy(n.min,a,s,m,u),n.max=Iy(n.max,a,s,m,u)}function ev(n,a,[s,o,u],h,d){BE(n,a[s],a[o],a[u],a.scale,h,d)}const LE=["x","scaleX","originX"],UE=["y","scaleY","originY"];function tv(n,a,s,o){ev(n.x,a,LE,s?s.x:void 0,o?o.x:void 0),ev(n.y,a,UE,s?s.y:void 0,o?o.y:void 0)}function nv(n){return n.translate===0&&n.scale===1}function _b(n){return nv(n.x)&&nv(n.y)}function rv(n,a){return n.min===a.min&&n.max===a.max}function HE(n,a){return rv(n.x,a.x)&&rv(n.y,a.y)}function av(n,a){return Math.round(n.min)===Math.round(a.min)&&Math.round(n.max)===Math.round(a.max)}function Vb(n,a){return av(n.x,a.x)&&av(n.y,a.y)}function iv(n){return Dt(n.x)/Dt(n.y)}function sv(n,a){return n.translate===a.translate&&n.scale===a.scale&&n.originPoint===a.originPoint}function En(n){return[n("x"),n("y")]}function qE(n,a,s){let o="";const u=n.x.translate/a.x,h=n.y.translate/a.y,d=(s==null?void 0:s.z)||0;if((u||h||d)&&(o=`translate3d(${u}px, ${h}px, ${d}px) `),(a.x!==1||a.y!==1)&&(o+=`scale(${1/a.x}, ${1/a.y}) `),s){const{transformPerspective:g,rotate:v,pathRotation:x,rotateX:b,rotateY:j,skewX:E,skewY:C}=s;g&&(o=`perspective(${g}px) ${o}`),v&&(o+=`rotate(${v}deg) `),x&&(o+=`rotate(${x}deg) `),b&&(o+=`rotateX(${b}deg) `),j&&(o+=`rotateY(${j}deg) `),E&&(o+=`skewX(${E}deg) `),C&&(o+=`skewY(${C}deg) `)}const m=n.x.scale*a.x,p=n.y.scale*a.y;return(m!==1||p!==1)&&(o+=`scale(${m}, ${p})`),o||"none"}const YE=qf.length,lv=n=>typeof n=="string"?parseFloat(n):n,ov=n=>typeof n=="number"||ge.test(n);function PE(n,a,s,o,u,h){u?(n.opacity=Fe(0,s.opacity??1,GE(o)),n.opacityExit=Fe(a.opacity??1,0,FE(o))):h&&(n.opacity=Fe(a.opacity??1,s.opacity??1,o));for(let d=0;d<YE;d++){const m=qf[d];let p=cv(a,m),g=cv(s,m);if(p===void 0&&g===void 0)continue;p||(p=0),g||(g=0),p===0||g===0||ov(p)===ov(g)?(n[m]=Math.max(Fe(lv(p),lv(g),o),0),(Nn.test(g)||Nn.test(p))&&(n[m]+="%")):n[m]=g}(a.rotate||s.rotate)&&(n.rotate=Fe(a.rotate||0,s.rotate||0,o))}function cv(n,a){return n[a]!==void 0?n[a]:n.borderRadius}const GE=Bb(0,.5,Ax),FE=Bb(.5,.95,on);function Bb(n,a,s){return o=>o<n?0:o>a?1:s(ds(n,a,o))}function $E(n,a,s){const o=St(n)?n:ei(n);return o.start(Lf("",o,a,s)),o.animation}function ms(n,a,s,o={passive:!0}){return n.addEventListener(a,s,o),()=>n.removeEventListener(a,s,o)}const XE=(n,a)=>n.depth-a.depth;class KE{constructor(){this.children=[],this.isDirty=!1}add(a){Cf(this.children,a),this.isDirty=!0}remove(a){bo(this.children,a),this.isDirty=!0}forEach(a){this.isDirty&&this.children.sort(XE),this.isDirty=!1,this.children.forEach(a)}}function ZE(n,a){const s=Nt.now(),o=({timestamp:u})=>{const h=u-s;h>=a&&(Dr(o),n(h-a))};return $e.setup(o,!0),()=>Dr(o)}function po(n){return St(n)?n.get():n}class QE{constructor(){this.members=[]}add(a){Cf(this.members,a);for(let s=this.members.length-1;s>=0;s--){const o=this.members[s];if(o===a||o===this.lead||o===this.prevLead)continue;const u=o.instance;(!u||u.isConnected===!1)&&!o.snapshot&&(bo(this.members,o),o.unmount())}a.scheduleRender()}remove(a){if(bo(this.members,a),a===this.prevLead&&(this.prevLead=void 0),a===this.lead){const s=this.members[this.members.length-1];s&&this.promote(s)}}relegate(a){var s;for(let o=this.members.indexOf(a)-1;o>=0;o--){const u=this.members[o];if(u.isPresent!==!1&&((s=u.instance)==null?void 0:s.isConnected)!==!1)return this.promote(u),!0}return!1}promote(a,s){var u;const o=this.lead;if(a!==o&&(this.prevLead=o,this.lead=a,a.show(),o)){o.updateSnapshot(),a.scheduleRender();const{layoutDependency:h}=o.options,{layoutDependency:d}=a.options;(h===void 0||h!==d)&&(a.resumeFrom=o,s&&(o.preserveOpacity=!0),o.snapshot&&(a.snapshot=o.snapshot,a.snapshot.latestValues=o.animationValues||o.latestValues),(u=a.root)!=null&&u.isUpdating&&(a.isLayoutDirty=!0)),a.options.crossfade===!1&&o.hide()}}exitAnimationComplete(){this.members.forEach(a=>{var s,o,u,h,d;(o=(s=a.options).onExitComplete)==null||o.call(s),(d=(u=a.resumingFrom)==null?void 0:(h=u.options).onExitComplete)==null||d.call(h)})}scheduleRender(){this.members.forEach(a=>a.instance&&a.scheduleRender(!1))}removeLeadSnapshot(){var a;(a=this.lead)!=null&&a.snapshot&&(this.lead.snapshot=void 0)}}const go={hasAnimatedSinceResize:!0,hasEverUpdated:!1},gd=["","X","Y","Z"],JE=1e3;let WE=0;function yd(n,a,s,o){const{latestValues:u}=a;u[n]&&(s[n]=u[n],a.setStaticValue(n,0),o&&(o[n]=0))}function Lb(n){if(n.hasCheckedOptimisedAppear=!0,n.root===n)return;const{visualElement:a}=n.options;if(!a)return;const s=sb(a);if(window.MotionHasOptimisedAnimation(s,"transform")){const{layout:u,layoutId:h}=n.options;window.MotionCancelOptimisedAnimation(s,"transform",$e,!(u||h))}const{parent:o}=n;o&&!o.hasCheckedOptimisedAppear&&Lb(o)}function Ub({attachResizeListener:n,defaultParent:a,measureScroll:s,checkIsScrollRoot:o,resetTransform:u}){return class{constructor(d={},m=a==null?void 0:a()){this.id=WE++,this.animationId=0,this.animationCommitId=0,this.children=new Set,this.options={},this.isTreeAnimating=!1,this.isAnimationBlocked=!1,this.isLayoutDirty=!1,this.isProjectionDirty=!1,this.isSharedProjectionDirty=!1,this.isTransformDirty=!1,this.updateManuallyBlocked=!1,this.updateBlockedByResize=!1,this.isUpdating=!1,this.isSVG=!1,this.needsReset=!1,this.shouldResetTransform=!1,this.hasCheckedOptimisedAppear=!1,this.treeScale={x:1,y:1},this.eventHandlers=new Map,this.hasTreeAnimated=!1,this.layoutVersion=0,this.updateScheduled=!1,this.scheduleUpdate=()=>this.update(),this.projectionUpdateScheduled=!1,this.checkUpdateFailed=()=>{this.isUpdating&&(this.isUpdating=!1,this.clearAllSnapshots())},this.updateProjection=()=>{this.projectionUpdateScheduled=!1,this.nodes.forEach(tT),this.nodes.forEach(lT),this.nodes.forEach(oT),this.nodes.forEach(nT)},this.resolvedRelativeTargetAt=0,this.linkedParentVersion=0,this.hasProjected=!1,this.isVisible=!0,this.animationProgress=0,this.sharedNodes=new Map,this.latestValues=d,this.root=m?m.root||m:this,this.path=m?[...m.path,m]:[],this.parent=m,this.depth=m?m.depth+1:0;for(let p=0;p<this.path.length;p++)this.path[p].shouldResetTransform=!0;this.root===this&&(this.nodes=new KE)}addEventListener(d,m){return this.eventHandlers.has(d)||this.eventHandlers.set(d,new Nf),this.eventHandlers.get(d).add(m)}notifyListeners(d,...m){const p=this.eventHandlers.get(d);p&&p.notify(...m)}hasListeners(d){return this.eventHandlers.has(d)}mount(d){if(this.instance)return;this.isSVG=Gf(d)&&!tE(d),this.instance=d;const{layoutId:m,layout:p,visualElement:g}=this.options;if(g&&!g.current&&g.mount(d),this.root.nodes.add(this),this.parent&&this.parent.children.add(this),this.root.hasTreeAnimated&&(p||m)&&(this.isLayoutDirty=!0),n){let v,x=0;const b=()=>this.root.updateBlockedByResize=!1;$e.read(()=>{x=window.innerWidth}),n(d,()=>{const j=window.innerWidth;j!==x&&(x=j,this.root.updateBlockedByResize=!0,v&&v(),v=ZE(b,250),go.hasAnimatedSinceResize&&(go.hasAnimatedSinceResize=!1,this.nodes.forEach(fv)))})}m&&this.root.registerSharedNode(m,this),this.options.animate!==!1&&g&&(m||p)&&this.addEventListener("didUpdate",({delta:v,hasLayoutChanged:x,hasRelativeLayoutChanged:b,layout:j})=>{if(this.isTreeAnimationBlocked()){this.target=void 0,this.relativeTarget=void 0;return}const E=this.options.transition||g.getDefaultTransition()||hT,{onLayoutAnimationStart:C,onLayoutAnimationComplete:T}=g.getProps(),k=!this.targetLayout||!Vb(this.targetLayout,j),A=!x&&b;if(this.options.layoutRoot||this.resumeFrom||A||x&&(k||!this.currentAnimation)){this.resumeFrom&&(this.resumingFrom=this.resumeFrom,this.resumingFrom.resumingFrom=void 0);const R={...Bf(E,"layout"),onPlay:C,onComplete:T};(g.shouldReduceMotion||this.options.layoutRoot)&&(R.delay=0,R.type=!1),this.startAnimation(R),this.setAnimationOrigin(v,A,R.path)}else x||fv(this),this.isLead()&&this.options.onExitComplete&&this.options.onExitComplete();this.targetLayout=j})}unmount(){this.options.layoutId&&this.willUpdate(),this.root.nodes.remove(this);const d=this.getStack();d&&d.remove(this),this.parent&&this.parent.children.delete(this),this.instance=void 0,this.eventHandlers.clear(),Dr(this.updateProjection)}blockUpdate(){this.updateManuallyBlocked=!0}unblockUpdate(){this.updateManuallyBlocked=!1}isUpdateBlocked(){return this.updateManuallyBlocked||this.updateBlockedByResize}isTreeAnimationBlocked(){return this.isAnimationBlocked||this.parent&&this.parent.isTreeAnimationBlocked()||!1}startUpdate(){this.isUpdateBlocked()||(this.isUpdating=!0,this.nodes&&this.nodes.forEach(cT),this.animationId++)}getTransformTemplate(){const{visualElement:d}=this.options;return d&&d.getProps().transformTemplate}willUpdate(d=!0){if(this.root.hasTreeAnimated=!0,this.root.isUpdateBlocked()){this.options.onExitComplete&&this.options.onExitComplete();return}if(window.MotionCancelOptimisedAnimation&&!this.hasCheckedOptimisedAppear&&Lb(this),!this.root.isUpdating&&this.root.startUpdate(),this.isLayoutDirty)return;this.isLayoutDirty=!0;for(let v=0;v<this.path.length;v++){const x=this.path[v];x.shouldResetTransform=!0,(typeof x.latestValues.x=="string"||typeof x.latestValues.y=="string")&&(x.isLayoutDirty=!0),x.updateScroll("snapshot"),x.options.layoutRoot&&x.willUpdate(!1)}const{layoutId:m,layout:p}=this.options;if(m===void 0&&!p)return;const g=this.getTransformTemplate();this.prevTransformTemplateValue=g?g(this.latestValues,""):void 0,this.updateSnapshot(),d&&this.notifyListeners("willUpdate")}update(){if(this.updateScheduled=!1,this.isUpdateBlocked()){const p=this.updateBlockedByResize;this.unblockUpdate(),this.updateBlockedByResize=!1,this.clearAllSnapshots(),p&&this.nodes.forEach(aT),this.nodes.forEach(uv);return}if(this.animationId<=this.animationCommitId){this.nodes.forEach(dv);return}this.animationCommitId=this.animationId,this.isUpdating?(this.isUpdating=!1,this.nodes.forEach(iT),this.nodes.forEach(sT),this.nodes.forEach(IE),this.nodes.forEach(eT)):this.nodes.forEach(dv),this.clearAllSnapshots();const m=Nt.now();bt.delta=Dn(0,1e3/60,m-bt.timestamp),bt.timestamp=m,bt.isProcessing=!0,od.update.process(bt),od.preRender.process(bt),od.render.process(bt),bt.isProcessing=!1}didUpdate(){this.updateScheduled||(this.updateScheduled=!0,Yf.read(this.scheduleUpdate))}clearAllSnapshots(){this.nodes.forEach(rT),this.sharedNodes.forEach(uT)}scheduleUpdateProjection(){this.projectionUpdateScheduled||(this.projectionUpdateScheduled=!0,$e.preRender(this.updateProjection,!1,!0))}scheduleCheckAfterUnmount(){$e.postRender(()=>{this.isLayoutDirty?this.root.didUpdate():this.root.checkUpdateFailed()})}updateSnapshot(){this.snapshot||!this.instance||(this.snapshot=this.measure(),this.snapshot&&!Dt(this.snapshot.measuredBox.x)&&!Dt(this.snapshot.measuredBox.y)&&(this.snapshot=void 0))}updateLayout(){if(!this.instance||(this.updateScroll(),!(this.options.alwaysMeasureLayout&&this.isLead())&&!this.isLayoutDirty))return;if(this.resumeFrom&&!this.resumeFrom.instance)for(let p=0;p<this.path.length;p++)this.path[p].updateScroll();const d=this.layout;this.layout=this.measure(!1),this.layoutVersion++,this.layoutCorrected||(this.layoutCorrected=dt()),this.isLayoutDirty=!1,this.projectionDelta=void 0,this.notifyListeners("measure",this.layout.layoutBox);const{visualElement:m}=this.options;m&&m.notify("LayoutMeasure",this.layout.layoutBox,d?d.layoutBox:void 0)}updateScroll(d="measure"){let m=!!(this.options.layoutScroll&&this.instance);if(this.scroll&&this.scroll.animationId===this.root.animationId&&this.scroll.phase===d&&(m=!1),m&&this.instance){const p=o(this.instance);this.scroll={animationId:this.root.animationId,phase:d,isRoot:p,offset:s(this.instance),wasRoot:this.scroll?this.scroll.isRoot:p}}}resetTransform(){if(!u)return;const d=this.isLayoutDirty||this.shouldResetTransform||this.options.alwaysMeasureLayout,m=this.projectionDelta&&!_b(this.projectionDelta),p=this.getTransformTemplate(),g=p?p(this.latestValues,""):void 0,v=g!==this.prevTransformTemplateValue;d&&this.instance&&(m||Wr(this.latestValues)||v)&&(u(this.instance,g),this.shouldResetTransform=!1,this.scheduleRender())}measure(d=!0){const m=this.measurePageBox();let p=this.removeElementScroll(m);return d&&(p=this.removeTransform(p)),mT(p),{animationId:this.root.animationId,measuredBox:m,layoutBox:p,latestValues:{},source:this.id}}measurePageBox(){var g;const{visualElement:d}=this.options;if(!d)return dt();const m=d.measureViewportBox();if(!(((g=this.scroll)==null?void 0:g.wasRoot)||this.path.some(pT))){const{scroll:v}=this.root;v&&(Tn(m.x,v.offset.x),Tn(m.y,v.offset.y))}return m}removeElementScroll(d){var p;const m=dt();if(mn(m,d),(p=this.scroll)!=null&&p.wasRoot)return m;for(let g=0;g<this.path.length;g++){const v=this.path[g],{scroll:x,options:b}=v;v!==this.root&&x&&b.layoutScroll&&(x.wasRoot&&mn(m,d),Tn(m.x,x.offset.x),Tn(m.y,x.offset.y))}return m}applyTransform(d,m=!1,p){var v,x;const g=p||dt();mn(g,d);for(let b=0;b<this.path.length;b++){const j=this.path[b];!m&&j.options.layoutScroll&&j.scroll&&j!==j.root&&(Tn(g.x,-j.scroll.offset.x),Tn(g.y,-j.scroll.offset.y)),Wr(j.latestValues)&&mo(g,j.latestValues,(v=j.layout)==null?void 0:v.layoutBox)}return Wr(this.latestValues)&&mo(g,this.latestValues,(x=this.layout)==null?void 0:x.layoutBox),g}removeTransform(d){var p;const m=dt();mn(m,d);for(let g=0;g<this.path.length;g++){const v=this.path[g];if(!Wr(v.latestValues))continue;let x;v.instance&&(Id(v.latestValues)&&v.updateSnapshot(),x=dt(),mn(x,v.measurePageBox())),tv(m,v.latestValues,(p=v.snapshot)==null?void 0:p.layoutBox,x)}return Wr(this.latestValues)&&tv(m,this.latestValues),m}setTargetDelta(d){this.targetDelta=d,this.root.scheduleUpdateProjection(),this.isProjectionDirty=!0}setOptions(d){this.options={...this.options,...d,crossfade:d.crossfade!==void 0?d.crossfade:!0}}clearMeasurements(){this.scroll=void 0,this.layout=void 0,this.snapshot=void 0,this.prevTransformTemplateValue=void 0,this.targetDelta=void 0,this.target=void 0,this.isLayoutDirty=!1}forceRelativeParentToResolveTarget(){this.relativeParent&&this.relativeParent.resolvedRelativeTargetAt!==bt.timestamp&&this.relativeParent.resolveTargetDelta(!0)}resolveTargetDelta(d=!1){var j;const m=this.getLead();this.isProjectionDirty||(this.isProjectionDirty=m.isProjectionDirty),this.isTransformDirty||(this.isTransformDirty=m.isTransformDirty),this.isSharedProjectionDirty||(this.isSharedProjectionDirty=m.isSharedProjectionDirty);const p=!!this.resumingFrom||this!==m;if(!(d||p&&this.isSharedProjectionDirty||this.isProjectionDirty||(j=this.parent)!=null&&j.isProjectionDirty||this.attemptToResolveRelativeTarget||this.root.updateBlockedByResize))return;const{layout:v,layoutId:x}=this.options;if(!this.layout||!(v||x))return;this.resolvedRelativeTargetAt=bt.timestamp;const b=this.getClosestProjectingParent();b&&this.linkedParentVersion!==b.layoutVersion&&!b.options.layoutRoot&&this.removeRelativeTarget(),!this.targetDelta&&!this.relativeTarget&&(this.options.layoutAnchor!==!1&&b&&b.layout?this.createRelativeTarget(b,this.layout.layoutBox,b.layout.layoutBox):this.removeRelativeTarget()),!(!this.relativeTarget&&!this.targetDelta)&&(this.target||(this.target=dt(),this.targetWithTransforms=dt()),this.relativeTarget&&this.relativeTargetOrigin&&this.relativeParent&&this.relativeParent.target?(this.forceRelativeParentToResolveTarget(),VE(this.target,this.relativeTarget,this.relativeParent.target,this.options.layoutAnchor||void 0)):this.targetDelta?(this.resumingFrom?this.applyTransform(this.layout.layoutBox,!1,this.target):mn(this.target,this.layout.layoutBox),wb(this.target,this.targetDelta)):mn(this.target,this.layout.layoutBox),this.attemptToResolveRelativeTarget&&(this.attemptToResolveRelativeTarget=!1,this.options.layoutAnchor!==!1&&b&&!!b.resumingFrom==!!this.resumingFrom&&!b.options.layoutScroll&&b.target&&this.animationProgress!==1?this.createRelativeTarget(b,this.target,b.target):this.relativeParent=this.relativeTarget=void 0))}getClosestProjectingParent(){if(!(!this.parent||Id(this.parent.latestValues)||jb(this.parent.latestValues)))return this.parent.isProjecting()?this.parent:this.parent.getClosestProjectingParent()}isProjecting(){return!!((this.relativeTarget||this.targetDelta||this.options.layoutRoot)&&this.layout)}createRelativeTarget(d,m,p){this.relativeParent=d,this.linkedParentVersion=d.layoutVersion,this.forceRelativeParentToResolveTarget(),this.relativeTarget=dt(),this.relativeTargetOrigin=dt(),Ao(this.relativeTargetOrigin,m,p,this.options.layoutAnchor||void 0),mn(this.relativeTarget,this.relativeTargetOrigin)}removeRelativeTarget(){this.relativeParent=this.relativeTarget=void 0}calcProjection(){var E;const d=this.getLead(),m=!!this.resumingFrom||this!==d;let p=!0;if((this.isProjectionDirty||(E=this.parent)!=null&&E.isProjectionDirty)&&(p=!1),m&&(this.isSharedProjectionDirty||this.isTransformDirty)&&(p=!1),this.resolvedRelativeTargetAt===bt.timestamp&&(p=!1),p)return;const{layout:g,layoutId:v}=this.options;if(this.isTreeAnimating=!!(this.parent&&this.parent.isTreeAnimating||this.currentAnimation||this.pendingAnimation),this.isTreeAnimating||(this.targetDelta=this.relativeTarget=void 0),!this.layout||!(g||v))return;mn(this.layoutCorrected,this.layout.layoutBox);const x=this.treeScale.x,b=this.treeScale.y;dE(this.layoutCorrected,this.treeScale,this.path,m),d.layout&&!d.target&&(this.treeScale.x!==1||this.treeScale.y!==1)&&(d.target=d.layout.layoutBox,d.targetWithTransforms=dt());const{target:j}=d;if(!j){this.prevProjectionDelta&&(this.createProjectionDeltas(),this.scheduleRender());return}!this.projectionDelta||!this.prevProjectionDelta?this.createProjectionDeltas():(Zy(this.prevProjectionDelta.x,this.projectionDelta.x),Zy(this.prevProjectionDelta.y,this.projectionDelta.y)),os(this.projectionDelta,this.layoutCorrected,j,this.latestValues),(this.treeScale.x!==x||this.treeScale.y!==b||!sv(this.projectionDelta.x,this.prevProjectionDelta.x)||!sv(this.projectionDelta.y,this.prevProjectionDelta.y))&&(this.hasProjected=!0,this.scheduleRender(),this.notifyListeners("projectionUpdate",j))}hide(){this.isVisible=!1}show(){this.isVisible=!0}scheduleRender(d=!0){var m;if((m=this.options.visualElement)==null||m.scheduleRender(),d){const p=this.getStack();p&&p.scheduleRender()}this.resumingFrom&&!this.resumingFrom.instance&&(this.resumingFrom=void 0)}createProjectionDeltas(){this.prevProjectionDelta=Ja(),this.projectionDelta=Ja(),this.projectionDeltaWithTransform=Ja()}setAnimationOrigin(d,m=!1,p){const g=this.snapshot,v=g?g.latestValues:{},x={...this.latestValues},b=Ja();(!this.relativeParent||!this.relativeParent.options.layoutRoot)&&(this.relativeTarget=this.relativeTargetOrigin=void 0),this.attemptToResolveRelativeTarget=!m;const j=dt(),E=g?g.source:void 0,C=this.layout?this.layout.source:void 0,T=E!==C,k=this.getStack(),A=!k||k.members.length<=1,R=!!(T&&!A&&this.options.crossfade===!0&&!this.path.some(fT));this.animationProgress=0;let _;const B=p==null?void 0:p.interpolateProjection(d);this.mixTargetDelta=Y=>{const D=Y/1e3,H=B==null?void 0:B(D);H?(b.x.translate=H.x,b.x.scale=Fe(d.x.scale,1,D),b.x.origin=d.x.origin,b.x.originPoint=d.x.originPoint,b.y.translate=H.y,b.y.scale=Fe(d.y.scale,1,D),b.y.origin=d.y.origin,b.y.originPoint=d.y.originPoint):(hv(b.x,d.x,D),hv(b.y,d.y,D)),this.setTargetDelta(b),this.relativeTarget&&this.relativeTargetOrigin&&this.layout&&this.relativeParent&&this.relativeParent.layout&&(Ao(j,this.layout.layoutBox,this.relativeParent.layout.layoutBox,this.options.layoutAnchor||void 0),dT(this.relativeTarget,this.relativeTargetOrigin,j,D),_&&HE(this.relativeTarget,_)&&(this.isProjectionDirty=!1),_||(_=dt()),mn(_,this.relativeTarget)),T&&(this.animationValues=x,PE(x,v,this.latestValues,D,R,A)),H&&H.rotate!==void 0&&(this.animationValues||(this.animationValues=x),this.animationValues.pathRotation=H.rotate),this.root.scheduleUpdateProjection(),this.scheduleRender(),this.animationProgress=D},this.mixTargetDelta(this.options.layoutRoot?1e3:0)}startAnimation(d){var m,p,g;this.notifyListeners("animationStart"),(m=this.currentAnimation)==null||m.stop(),(g=(p=this.resumingFrom)==null?void 0:p.currentAnimation)==null||g.stop(),this.pendingAnimation&&(Dr(this.pendingAnimation),this.pendingAnimation=void 0),this.pendingAnimation=$e.update(()=>{go.hasAnimatedSinceResize=!0,this.motionValue||(this.motionValue=ei(0)),this.motionValue.jump(0,!1),this.currentAnimation=$E(this.motionValue,[0,1e3],{...d,velocity:0,isSync:!0,onUpdate:v=>{this.mixTargetDelta(v),d.onUpdate&&d.onUpdate(v)},onComplete:()=>{d.onComplete&&d.onComplete(),this.completeAnimation()}}),this.resumingFrom&&(this.resumingFrom.currentAnimation=this.currentAnimation),this.pendingAnimation=void 0})}completeAnimation(){this.resumingFrom&&(this.resumingFrom.currentAnimation=void 0,this.resumingFrom.preserveOpacity=void 0);const d=this.getStack();d&&d.exitAnimationComplete(),this.resumingFrom=this.currentAnimation=this.animationValues=void 0,this.notifyListeners("animationComplete")}finishAnimation(){this.currentAnimation&&(this.mixTargetDelta&&this.mixTargetDelta(JE),this.currentAnimation.stop()),this.completeAnimation()}applyTransformsToTarget(){const d=this.getLead();let{targetWithTransforms:m,target:p,layout:g,latestValues:v}=d;if(!(!m||!p||!g)){if(this!==d&&this.layout&&g&&Hb(this.options.animationType,this.layout.layoutBox,g.layoutBox)){p=this.target||dt();const x=Dt(this.layout.layoutBox.x);p.x.min=d.target.x.min,p.x.max=p.x.min+x;const b=Dt(this.layout.layoutBox.y);p.y.min=d.target.y.min,p.y.max=p.y.min+b}mn(m,p),mo(m,v),os(this.projectionDeltaWithTransform,this.layoutCorrected,m,v)}}registerSharedNode(d,m){this.sharedNodes.has(d)||this.sharedNodes.set(d,new QE),this.sharedNodes.get(d).add(m);const g=m.options.initialPromotionConfig;m.promote({transition:g?g.transition:void 0,preserveFollowOpacity:g&&g.shouldPreserveFollowOpacity?g.shouldPreserveFollowOpacity(m):void 0})}isLead(){const d=this.getStack();return d?d.lead===this:!0}getLead(){var m;const{layoutId:d}=this.options;return d?((m=this.getStack())==null?void 0:m.lead)||this:this}getPrevLead(){var m;const{layoutId:d}=this.options;return d?(m=this.getStack())==null?void 0:m.prevLead:void 0}getStack(){const{layoutId:d}=this.options;if(d)return this.root.sharedNodes.get(d)}promote({needsReset:d,transition:m,preserveFollowOpacity:p}={}){const g=this.getStack();g&&g.promote(this,p),d&&(this.projectionDelta=void 0,this.needsReset=!0),m&&this.setOptions({transition:m})}relegate(){const d=this.getStack();return d?d.relegate(this):!1}resetSkewAndRotation(){const{visualElement:d}=this.options;if(!d)return;let m=!1;const{latestValues:p}=d;if((p.z||p.rotate||p.rotateX||p.rotateY||p.rotateZ||p.skewX||p.skewY)&&(m=!0),!m)return;const g={};p.z&&yd("z",d,g,this.animationValues);for(let v=0;v<gd.length;v++)yd(`rotate${gd[v]}`,d,g,this.animationValues),yd(`skew${gd[v]}`,d,g,this.animationValues);d.render();for(const v in g)d.setStaticValue(v,g[v]),this.animationValues&&(this.animationValues[v]=g[v]);d.scheduleRender()}applyProjectionStyles(d,m){if(!this.instance||this.isSVG)return;if(!this.isVisible){d.visibility="hidden";return}const p=this.getTransformTemplate();if(this.needsReset){this.needsReset=!1,d.visibility="",d.opacity="",d.pointerEvents=po(m==null?void 0:m.pointerEvents)||"",d.transform=p?p(this.latestValues,""):"none";return}const g=this.getLead();if(!this.projectionDelta||!this.layout||!g.target){this.options.layoutId&&(d.opacity=this.latestValues.opacity!==void 0?this.latestValues.opacity:1,d.pointerEvents=po(m==null?void 0:m.pointerEvents)||""),this.hasProjected&&!Wr(this.latestValues)&&(d.transform=p?p({},""):"none",this.hasProjected=!1);return}d.visibility="";const v=g.animationValues||g.latestValues;this.applyTransformsToTarget();let x=qE(this.projectionDeltaWithTransform,this.treeScale,v);p&&(x=p(v,x)),d.transform=x;const{x:b,y:j}=this.projectionDelta;d.transformOrigin=`${b.origin*100}% ${j.origin*100}% 0`,g.animationValues?d.opacity=g===this?v.opacity??this.latestValues.opacity??1:this.preserveOpacity?this.latestValues.opacity:v.opacityExit:d.opacity=g===this?v.opacity!==void 0?v.opacity:"":v.opacityExit!==void 0?v.opacityExit:0;for(const E in tf){if(v[E]===void 0)continue;const{correct:C,applyTo:T,isCSSVariable:k}=tf[E],A=x==="none"?v[E]:C(v[E],g);if(T){const R=T.length;for(let _=0;_<R;_++)d[T[_]]=A}else k?this.options.visualElement.renderState.vars[E]=A:d[E]=A}this.options.layoutId&&(d.pointerEvents=g===this?po(m==null?void 0:m.pointerEvents)||"":"none")}clearSnapshot(){this.resumeFrom=this.snapshot=void 0}resetTree(){this.root.nodes.forEach(d=>{var m;return(m=d.currentAnimation)==null?void 0:m.stop()}),this.root.nodes.forEach(uv),this.root.sharedNodes.clear()}}}function IE(n){n.updateLayout()}function eT(n){var s;const a=((s=n.resumeFrom)==null?void 0:s.snapshot)||n.snapshot;if(n.isLead()&&n.layout&&a&&n.hasListeners("didUpdate")){const{layoutBox:o,measuredBox:u}=n.layout,{animationType:h}=n.options,d=a.source!==n.layout.source;if(h==="size")En(x=>{const b=d?a.measuredBox[x]:a.layoutBox[x],j=Dt(b);b.min=o[x].min,b.max=b.min+j});else if(h==="x"||h==="y"){const x=h==="x"?"y":"x";nf(d?a.measuredBox[x]:a.layoutBox[x],o[x])}else Hb(h,a.layoutBox,o)&&En(x=>{const b=d?a.measuredBox[x]:a.layoutBox[x],j=Dt(o[x]);b.max=b.min+j,n.relativeTarget&&!n.currentAnimation&&(n.isProjectionDirty=!0,n.relativeTarget[x].max=n.relativeTarget[x].min+j)});const m=Ja();os(m,o,a.layoutBox);const p=Ja();d?os(p,n.applyTransform(u,!0),a.measuredBox):os(p,o,a.layoutBox);const g=!_b(m);let v=!1;if(!n.resumeFrom){const x=n.getClosestProjectingParent();if(x&&!x.resumeFrom){const{snapshot:b,layout:j}=x;if(b&&j){const E=n.options.layoutAnchor||void 0,C=dt();Ao(C,a.layoutBox,b.layoutBox,E);const T=dt();Ao(T,o,j.layoutBox,E),Vb(C,T)||(v=!0),x.options.layoutRoot&&(n.relativeTarget=T,n.relativeTargetOrigin=C,n.relativeParent=x)}}}n.notifyListeners("didUpdate",{layout:o,snapshot:a,delta:p,layoutDelta:m,hasLayoutChanged:g,hasRelativeLayoutChanged:v})}else if(n.isLead()){const{onExitComplete:o}=n.options;o&&o()}n.options.transition=void 0}function tT(n){n.parent&&(n.isProjecting()||(n.isProjectionDirty=n.parent.isProjectionDirty),n.isSharedProjectionDirty||(n.isSharedProjectionDirty=!!(n.isProjectionDirty||n.parent.isProjectionDirty||n.parent.isSharedProjectionDirty)),n.isTransformDirty||(n.isTransformDirty=n.parent.isTransformDirty))}function nT(n){n.isProjectionDirty=n.isSharedProjectionDirty=n.isTransformDirty=!1}function rT(n){n.clearSnapshot()}function uv(n){n.clearMeasurements()}function aT(n){n.isLayoutDirty=!0,n.updateLayout()}function dv(n){n.isLayoutDirty=!1}function iT(n){n.isAnimationBlocked&&n.layout&&!n.isLayoutDirty&&(n.snapshot=n.layout,n.isLayoutDirty=!0)}function sT(n){const{visualElement:a}=n.options;a&&a.getProps().onBeforeLayoutMeasure&&a.notify("BeforeLayoutMeasure"),n.resetTransform()}function fv(n){n.finishAnimation(),n.targetDelta=n.relativeTarget=n.target=void 0,n.isProjectionDirty=!0}function lT(n){n.resolveTargetDelta()}function oT(n){n.calcProjection()}function cT(n){n.resetSkewAndRotation()}function uT(n){n.removeLeadSnapshot()}function hv(n,a,s){n.translate=Fe(a.translate,0,s),n.scale=Fe(a.scale,1,s),n.origin=a.origin,n.originPoint=a.originPoint}function mv(n,a,s,o){n.min=Fe(a.min,s.min,o),n.max=Fe(a.max,s.max,o)}function dT(n,a,s,o){mv(n.x,a.x,s.x,o),mv(n.y,a.y,s.y,o)}function fT(n){return n.animationValues&&n.animationValues.opacityExit!==void 0}const hT={duration:.45,ease:[.4,0,.1,1]},pv=n=>typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().includes(n),gv=pv("applewebkit/")&&!pv("chrome/")?Math.round:on;function yv(n){n.min=gv(n.min),n.max=gv(n.max)}function mT(n){yv(n.x),yv(n.y)}function Hb(n,a,s){return n==="position"||n==="preserve-aspect"&&!_E(iv(a),iv(s),.2)}function pT(n){var a;return n!==n.root&&((a=n.scroll)==null?void 0:a.wasRoot)}const gT=Ub({attachResizeListener:(n,a)=>ms(n,"resize",a),measureScroll:()=>{var n,a;return{x:document.documentElement.scrollLeft||((n=document.body)==null?void 0:n.scrollLeft)||0,y:document.documentElement.scrollTop||((a=document.body)==null?void 0:a.scrollTop)||0}},checkIsScrollRoot:()=>!0}),vd={current:void 0},qb=Ub({measureScroll:n=>({x:n.scrollLeft,y:n.scrollTop}),defaultParent:()=>{if(!vd.current){const n=new gT({});n.mount(window),n.setOptions({layoutScroll:!0}),vd.current=n}return vd.current},resetTransform:(n,a)=>{n.style.transform=a!==void 0?a:"none"},checkIsScrollRoot:n=>window.getComputedStyle(n).position==="fixed"}),Qf=S.createContext({transformPagePoint:n=>n,isStatic:!1,reducedMotion:"never"});function vv(n,a){if(typeof n=="function")return n(a);n!=null&&(n.current=a)}function yT(...n){return a=>{let s=!1;const o=n.map(u=>{const h=vv(u,a);return!s&&typeof h=="function"&&(s=!0),h});if(s)return()=>{for(let u=0;u<o.length;u++){const h=o[u];typeof h=="function"?h():vv(n[u],null)}}}}function vT(...n){return S.useCallback(yT(...n),n)}class xT extends S.Component{getSnapshotBeforeUpdate(a){const s=this.props.childRef.current;if(co(s)&&a.isPresent&&!this.props.isPresent&&this.props.pop!==!1){const o=s.offsetParent,u=co(o)&&o.offsetWidth||0,h=co(o)&&o.offsetHeight||0,d=getComputedStyle(s),m=this.props.sizeRef.current;m.height=parseFloat(d.height),m.width=parseFloat(d.width),m.top=s.offsetTop,m.left=s.offsetLeft,m.right=u-m.width-m.left,m.bottom=h-m.height-m.top,m.direction=d.direction}return null}componentDidUpdate(){}render(){return this.props.children}}function bT({children:n,isPresent:a,anchorX:s,anchorY:o,root:u,pop:h}){var b;const d=S.useId(),m=S.useRef(null),p=S.useRef({width:0,height:0,top:0,left:0,right:0,bottom:0,direction:"ltr"}),{nonce:g}=S.useContext(Qf),v=h!==!1?((b=n.props)==null?void 0:b.ref)??(n==null?void 0:n.ref):void 0,x=vT(m,v);return S.useInsertionEffect(()=>{const{width:j,height:E,top:C,left:T,right:k,bottom:A,direction:R}=p.current;if(a||h===!1||!m.current||!j||!E)return;const _=R==="rtl",B=s==="left"?_?`right: ${k}`:`left: ${T}`:_?`left: ${T}`:`right: ${k}`,Y=o==="bottom"?`bottom: ${A}`:`top: ${C}`;m.current.dataset.motionPopId=d;const D=document.createElement("style");g&&(D.nonce=g);const H=u??document.head;return H.appendChild(D),D.sheet&&D.sheet.insertRule(`
          [data-motion-pop-id="${d}"] {
            position: absolute !important;
            width: ${j}px !important;
            height: ${E}px !important;
            ${B}px !important;
            ${Y}px !important;
          }
        `),()=>{var M;(M=m.current)==null||M.removeAttribute("data-motion-pop-id"),H.contains(D)&&H.removeChild(D)}},[a]),l.jsx(xT,{isPresent:a,childRef:m,sizeRef:p,pop:h,children:h===!1?n:S.cloneElement(n,{ref:x})})}const ST=({children:n,initial:a,isPresent:s,onExitComplete:o,custom:u,presenceAffectsLayout:h,mode:d,anchorX:m,anchorY:p,root:g})=>{const v=Ef(jT),x=S.useId(),b=S.useRef(s),j=S.useRef(o);Tf(()=>{b.current=s,j.current=o});let E=!0,C=S.useMemo(()=>(E=!1,{id:x,initial:a,isPresent:s,custom:u,onExitComplete:T=>{v.set(T,!0);for(const k of v.values())if(!k)return;o&&o()},register:T=>(v.set(T,!1),()=>{var k;v.delete(T),!b.current&&!v.size&&((k=j.current)==null||k.call(j))})}),[s,v,o]);return h&&E&&(C={...C}),S.useMemo(()=>{v.forEach((T,k)=>v.set(k,!1))},[s]),S.useEffect(()=>{!s&&!v.size&&o&&o()},[s]),n=l.jsx(bT,{pop:d==="popLayout",isPresent:s,anchorX:m,anchorY:p,root:g,children:n}),l.jsx(_o.Provider,{value:C,children:n})};function jT(){return new Map}function Yb(n=!0){const a=S.useContext(_o);if(a===null)return[!0,null];const{isPresent:s,onExitComplete:o,register:u}=a,h=S.useId();S.useEffect(()=>{if(n)return u(h)},[n]);const d=S.useCallback(()=>n&&o&&o(h),[h,o,n]);return!s&&o?[!1,d]:[!0]}const Ql=n=>n.key||"";function xv(n){const a=[];return S.Children.forEach(n,s=>{S.isValidElement(s)&&a.push(s)}),a}const wT=({children:n,custom:a,initial:s=!0,onExitComplete:o,presenceAffectsLayout:u=!0,mode:h="sync",propagate:d=!1,anchorX:m="left",anchorY:p="top",root:g})=>{const[v,x]=Yb(d),b=S.useMemo(()=>xv(n),[n]),j=d&&!v?[]:b.map(Ql),E=S.useRef(!0),C=S.useRef(b),T=Ef(()=>new Map),k=S.useRef(new Set),[A,R]=S.useState(b),[_,B]=S.useState(b);Tf(()=>{E.current=!1,C.current=b;for(let H=0;H<_.length;H++){const M=Ql(_[H]);j.includes(M)?(T.delete(M),k.current.delete(M)):T.get(M)!==!0&&T.set(M,!1)}},[_,j.length,j.join("-")]);const Y=[];if(b!==A){let H=[...b];for(let M=0;M<_.length;M++){const z=_[M],L=Ql(z);j.includes(L)||(H.splice(M,0,z),Y.push(z))}return h==="wait"&&Y.length&&(H=Y),B(xv(H)),R(b),null}const{forceRender:D}=S.useContext(wf);return l.jsx(l.Fragment,{children:_.map(H=>{const M=Ql(H),z=d&&!v?!1:b===_||j.includes(M),L=()=>{if(k.current.has(M))return;if(T.has(M))k.current.add(M),T.set(M,!0);else return;let K=!0;T.forEach(ce=>{ce||(K=!1)}),K&&(D==null||D(),B(C.current),d&&(x==null||x()),o&&o())};return l.jsx(ST,{isPresent:z,initial:!E.current||s?void 0:!1,custom:a,presenceAffectsLayout:u,mode:h,root:g,onExitComplete:z?void 0:L,anchorX:m,anchorY:p,children:H},M)})})},Pb=S.createContext({strict:!1}),bv={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]};let Sv=!1;function ET(){if(Sv)return;const n={};for(const a in bv)n[a]={isEnabled:s=>bv[a].some(o=>!!s[o])};xb(n),Sv=!0}function Gb(){return ET(),lE()}function TT(n){const a=Gb();for(const s in n)a[s]={...a[s],...n[s]};xb(a)}const CT=new Set(["animate","exit","variants","initial","style","values","variants","transition","transformTemplate","custom","inherit","onBeforeLayoutMeasure","onAnimationStart","onAnimationComplete","onUpdate","onDragStart","onDrag","onDragEnd","onMeasureDragConstraints","onDirectionLock","onDragTransitionEnd","_dragX","_dragY","onHoverStart","onHoverEnd","onViewportEnter","onViewportLeave","globalTapTarget","propagate","ignoreStrict","viewport"]);function ko(n){return n.startsWith("while")||n.startsWith("drag")&&n!=="draggable"||n.startsWith("layout")||n.startsWith("onTap")||n.startsWith("onPan")||n.startsWith("onLayout")||CT.has(n)}let Fb=n=>!ko(n);function NT(n){typeof n=="function"&&(Fb=a=>a.startsWith("on")?!ko(a):n(a))}try{NT(require("@emotion/is-prop-valid").default)}catch{}function DT(n,a,s){const o={};for(const u in n)u==="values"&&typeof n.values=="object"||St(n[u])||(Fb(u)||s===!0&&ko(u)||!a&&!ko(u)||n.draggable&&u.startsWith("onDrag"))&&(o[u]=n[u]);return o}const Ho=S.createContext({});function AT(n,a){if(Uo(n)){const{initial:s,animate:o}=n;return{initial:s===!1||hs(s)?s:void 0,animate:hs(o)?o:void 0}}return n.inherit!==!1?a:{}}function kT(n){const{initial:a,animate:s}=AT(n,S.useContext(Ho));return S.useMemo(()=>({initial:a,animate:s}),[jv(a),jv(s)])}function jv(n){return Array.isArray(n)?n.join(" "):n}const Jf=()=>({style:{},transform:{},transformOrigin:{},vars:{}});function $b(n,a,s){for(const o in a)!St(a[o])&&!Cb(o,s)&&(n[o]=a[o])}function MT({transformTemplate:n},a){return S.useMemo(()=>{const s=Jf();return Kf(s,a,n),Object.assign({},s.vars,s.style)},[a])}function RT(n,a){const s=n.style||{},o={};return $b(o,s,n),Object.assign(o,MT(n,a)),o}function OT(n,a){const s={},o=RT(n,a);return n.drag&&n.dragListener!==!1&&(s.draggable=!1,o.userSelect=o.WebkitUserSelect=o.WebkitTouchCallout="none",o.touchAction=n.drag===!0?"none":`pan-${n.drag==="x"?"y":"x"}`),n.tabIndex===void 0&&(n.onTap||n.onTapStart||n.whileTap)&&(s.tabIndex=0),s.style=o,s}const Xb=()=>({...Jf(),attrs:{}});function zT(n,a,s,o){const u=S.useMemo(()=>{const h=Xb();return Nb(h,a,Ab(o),n.transformTemplate,n.style),{...h.attrs,style:{...h.style}}},[a]);if(n.style){const h={};$b(h,n.style,n),u.style={...h,...u.style}}return u}const _T=["animate","circle","defs","desc","ellipse","g","image","line","filter","marker","mask","metadata","path","pattern","polygon","polyline","rect","stop","switch","symbol","svg","text","tspan","use","view"];function Wf(n){return typeof n!="string"||n.includes("-")?!1:!!(_T.indexOf(n)>-1||/[A-Z]/u.test(n))}function VT(n,a,s,{latestValues:o},u,h=!1,d){const p=(d??Wf(n)?zT:OT)(a,o,u,n),g=DT(a,typeof n=="string",h),v=n!==S.Fragment?{...g,...p,ref:s}:{},{children:x}=a,b=S.useMemo(()=>St(x)?x.get():x,[x]);return S.createElement(n,{...v,children:b})}function BT({scrapeMotionValuesFromProps:n,createRenderState:a},s,o,u){return{latestValues:LT(s,o,u,n),renderState:a()}}function LT(n,a,s,o){const u={},h=o(n,{});for(const b in h)u[b]=po(h[b]);let{initial:d,animate:m}=n;const p=Uo(n),g=yb(n);a&&g&&!p&&n.inherit!==!1&&(d===void 0&&(d=a.initial),m===void 0&&(m=a.animate));let v=s?s.initial===!1:!1;v=v||d===!1;const x=v?m:d;if(x&&typeof x!="boolean"&&!Lo(x)){const b=Array.isArray(x)?x:[x];for(let j=0;j<b.length;j++){const E=Uf(n,b[j]);if(E){const{transitionEnd:C,transition:T,...k}=E;for(const A in k){let R=k[A];if(Array.isArray(R)){const _=v?R.length-1:0;R=R[_]}R!==null&&(u[A]=R)}for(const A in C)u[A]=C[A]}}}return u}const Kb=n=>(a,s)=>{const o=S.useContext(Ho),u=S.useContext(_o),h=()=>BT(n,a,o,u);return s?h():Ef(h)},UT=Kb({scrapeMotionValuesFromProps:Zf,createRenderState:Jf}),HT=Kb({scrapeMotionValuesFromProps:kb,createRenderState:Xb}),qT=Symbol.for("motionComponentSymbol");function YT(n,a,s){const o=S.useRef(s);S.useInsertionEffect(()=>{o.current=s});const u=S.useRef(null);return S.useCallback(h=>{var m;h&&((m=n.onMount)==null||m.call(n,h)),a&&(h?a.mount(h):a.unmount());const d=o.current;if(typeof d=="function")if(h){const p=d(h);typeof p=="function"&&(u.current=p)}else u.current?(u.current(),u.current=null):d(h);else d&&(d.current=h)},[a])}const Zb=S.createContext({});function Xa(n){return n&&typeof n=="object"&&Object.prototype.hasOwnProperty.call(n,"current")}function PT(n,a,s,o,u,h){var R,_;const{visualElement:d}=S.useContext(Ho),m=S.useContext(Pb),p=S.useContext(_o),g=S.useContext(Qf),v=g.reducedMotion,x=g.skipAnimations,b=S.useRef(null),j=S.useRef(!1);o=o||m.renderer,!b.current&&o&&(b.current=o(n,{visualState:a,parent:d,props:s,presenceContext:p,blockInitialAnimation:p?p.initial===!1:!1,reducedMotionConfig:v,skipAnimations:x,isSVG:h}),j.current&&b.current&&(b.current.manuallyAnimateOnMount=!0));const E=b.current,C=S.useContext(Zb);E&&!E.projection&&u&&(E.type==="html"||E.type==="svg")&&GT(b.current,s,u,C);const T=S.useRef(!1);S.useInsertionEffect(()=>{E&&T.current&&E.update(s,p)});const k=s[ib],A=S.useRef(!!k&&typeof window<"u"&&!((R=window.MotionHandoffIsComplete)!=null&&R.call(window,k))&&((_=window.MotionHasOptimisedAnimation)==null?void 0:_.call(window,k)));return Tf(()=>{j.current=!0,E&&(T.current=!0,window.MotionIsMounted=!0,E.updateFeatures(),E.scheduleRenderMicrotask(),A.current&&E.animationState&&E.animationState.animateChanges())}),S.useEffect(()=>{E&&(!A.current&&E.animationState&&E.animationState.animateChanges(),A.current&&(queueMicrotask(()=>{var B;(B=window.MotionHandoffMarkAsComplete)==null||B.call(window,k)}),A.current=!1),E.enteringChildren=void 0)}),E}function GT(n,a,s,o){const{layoutId:u,layout:h,drag:d,dragConstraints:m,layoutScroll:p,layoutRoot:g,layoutAnchor:v,layoutCrossfade:x}=a;n.projection=new s(n.latestValues,a["data-framer-portal-id"]?void 0:Qb(n.parent)),n.projection.setOptions({layoutId:u,layout:h,alwaysMeasureLayout:!!d||m&&Xa(m),visualElement:n,animationType:typeof h=="string"?h:"both",initialPromotionConfig:o,crossfade:x,layoutScroll:p,layoutRoot:g,layoutAnchor:v})}function Qb(n){if(n)return n.options.allowProjection!==!1?n.projection:Qb(n.parent)}function xd(n,{forwardMotionProps:a=!1,type:s}={},o,u){o&&TT(o);const h=s?s==="svg":Wf(n),d=h?HT:UT;function m(g,v){let x;const b={...S.useContext(Qf),...g,layoutId:FT(g)},{isStatic:j}=b,E=kT(g),C=d(g,j);if(!j&&typeof window<"u"){$T();const T=XT(b);x=T.MeasureLayout,E.visualElement=PT(n,C,b,u,T.ProjectionNode,h)}return l.jsxs(Ho.Provider,{value:E,children:[x&&E.visualElement?l.jsx(x,{visualElement:E.visualElement,...b}):null,VT(n,g,YT(C,E.visualElement,v),C,j,a,h)]})}m.displayName=`motion.${typeof n=="string"?n:`create(${n.displayName??n.name??""})`}`;const p=S.forwardRef(m);return p[qT]=n,p}function FT({layoutId:n}){const a=S.useContext(wf).id;return a&&n!==void 0?a+"-"+n:n}function $T(n,a){S.useContext(Pb).strict}function XT(n){const a=Gb(),{drag:s,layout:o}=a;if(!s&&!o)return{};const u={...s,...o};return{MeasureLayout:s!=null&&s.isEnabled(n)||o!=null&&o.isEnabled(n)?u.MeasureLayout:void 0,ProjectionNode:u.ProjectionNode}}function KT(n,a){if(typeof Proxy>"u")return xd;const s=new Map,o=(h,d)=>xd(h,d,n,a),u=(h,d)=>o(h,d);return new Proxy(u,{get:(h,d)=>d==="create"?o:(s.has(d)||s.set(d,xd(d,void 0,n,a)),s.get(d))})}const ZT=(n,a)=>a.isSVG??Wf(n)?new EE(a):new vE(a,{allowProjection:n!==S.Fragment});class QT extends kr{constructor(a){super(a),a.animationState||(a.animationState=AE(a))}updateAnimationControlsSubscription(){const{animate:a}=this.node.getProps();Lo(a)&&(this.unmountControls=a.subscribe(this.node))}mount(){this.updateAnimationControlsSubscription()}update(){const{animate:a}=this.node.getProps(),{animate:s}=this.node.prevProps||{};a!==s&&this.updateAnimationControlsSubscription()}unmount(){var a;this.node.animationState.reset(),(a=this.unmountControls)==null||a.call(this)}}let JT=0;class WT extends kr{constructor(){super(...arguments),this.id=JT++,this.isExitComplete=!1}update(){var h;if(!this.node.presenceContext)return;const{isPresent:a,onExitComplete:s}=this.node.presenceContext,{isPresent:o}=this.node.prevPresenceContext||{};if(!this.node.animationState||a===o)return;if(a&&o===!1){if(this.isExitComplete){const{initial:d,custom:m}=this.node.getProps();if(typeof d=="string"||typeof d=="object"&&d!==null&&!Array.isArray(d)){const p=na(this.node,d,m);if(p){const{transition:g,transitionEnd:v,...x}=p;for(const b in x)(h=this.node.getValue(b))==null||h.jump(x[b])}}this.node.animationState.reset(),this.node.animationState.animateChanges()}else this.node.animationState.setActive("exit",!1);this.isExitComplete=!1;return}const u=this.node.animationState.setActive("exit",!a);s&&!a&&u.then(()=>{this.isExitComplete=!0,s(this.id)})}mount(){const{register:a,onExitComplete:s}=this.node.presenceContext||{};s&&s(this.id),a&&(this.unmount=a(this.id))}unmount(){}}const IT={animation:{Feature:QT},exit:{Feature:WT}};function Ds(n){return{point:{x:n.pageX,y:n.pageY}}}const eC=n=>a=>Pf(a)&&n(a,Ds(a));function cs(n,a,s,o){return ms(n,a,eC(s),o)}const Jb=({current:n})=>n?n.ownerDocument.defaultView:null,wv=(n,a)=>Math.abs(n-a);function tC(n,a){const s=wv(n.x,a.x),o=wv(n.y,a.y);return Math.sqrt(s**2+o**2)}const Ev=new Set(["auto","scroll"]);class Wb{constructor(a,s,{transformPagePoint:o,contextWindow:u=window,dragSnapToOrigin:h=!1,distanceThreshold:d=3,element:m}={}){if(this.startEvent=null,this.lastMoveEvent=null,this.lastMoveEventInfo=null,this.lastRawMoveEventInfo=null,this.handlers={},this.contextWindow=window,this.scrollPositions=new Map,this.removeScrollListeners=null,this.onElementScroll=E=>{this.handleScroll(E.target)},this.onWindowScroll=()=>{this.handleScroll(window)},this.updatePoint=()=>{if(!(this.lastMoveEvent&&this.lastMoveEventInfo))return;this.lastRawMoveEventInfo&&(this.lastMoveEventInfo=Jl(this.lastRawMoveEventInfo,this.transformPagePoint));const E=bd(this.lastMoveEventInfo,this.history),C=this.startEvent!==null,T=tC(E.offset,{x:0,y:0})>=this.distanceThreshold;if(!C&&!T)return;const{point:k}=E,{timestamp:A}=bt;this.history.push({...k,timestamp:A});const{onStart:R,onMove:_}=this.handlers;C||(R&&R(this.lastMoveEvent,E),this.startEvent=this.lastMoveEvent),_&&_(this.lastMoveEvent,E)},this.handlePointerMove=(E,C)=>{this.lastMoveEvent=E,this.lastRawMoveEventInfo=C,this.lastMoveEventInfo=Jl(C,this.transformPagePoint),$e.update(this.updatePoint,!0)},this.handlePointerUp=(E,C)=>{this.end();const{onEnd:T,onSessionEnd:k,resumeAnimation:A}=this.handlers;if((this.dragSnapToOrigin||!this.startEvent)&&A&&A(),!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const R=bd(E.type==="pointercancel"?this.lastMoveEventInfo:Jl(C,this.transformPagePoint),this.history);this.startEvent&&T&&T(E,R),k&&k(E,R)},!Pf(a))return;this.dragSnapToOrigin=h,this.handlers=s,this.transformPagePoint=o,this.distanceThreshold=d,this.contextWindow=u||window;const p=Ds(a),g=Jl(p,this.transformPagePoint),{point:v}=g,{timestamp:x}=bt;this.history=[{...v,timestamp:x}];const{onSessionStart:b}=s;b&&b(a,bd(g,this.history));const j={passive:!0,capture:!0};this.removeListeners=Ts(cs(this.contextWindow,"pointermove",this.handlePointerMove,j),cs(this.contextWindow,"pointerup",this.handlePointerUp,j),cs(this.contextWindow,"pointercancel",this.handlePointerUp,j)),m&&this.startScrollTracking(m)}startScrollTracking(a){let s=a.parentElement;for(;s;){const o=getComputedStyle(s);(Ev.has(o.overflowX)||Ev.has(o.overflowY))&&this.scrollPositions.set(s,{x:s.scrollLeft,y:s.scrollTop}),s=s.parentElement}this.scrollPositions.set(window,{x:window.scrollX,y:window.scrollY}),window.addEventListener("scroll",this.onElementScroll,{capture:!0}),window.addEventListener("scroll",this.onWindowScroll),this.removeScrollListeners=()=>{window.removeEventListener("scroll",this.onElementScroll,{capture:!0}),window.removeEventListener("scroll",this.onWindowScroll)}}handleScroll(a){const s=this.scrollPositions.get(a);if(!s)return;const o=a===window,u=o?{x:window.scrollX,y:window.scrollY}:{x:a.scrollLeft,y:a.scrollTop},h={x:u.x-s.x,y:u.y-s.y};h.x===0&&h.y===0||(o?this.lastMoveEventInfo&&(this.lastMoveEventInfo.point.x+=h.x,this.lastMoveEventInfo.point.y+=h.y):this.history.length>0&&(this.history[0].x-=h.x,this.history[0].y-=h.y),this.scrollPositions.set(a,u),$e.update(this.updatePoint,!0))}updateHandlers(a){this.handlers=a}end(){this.removeListeners&&this.removeListeners(),this.removeScrollListeners&&this.removeScrollListeners(),this.scrollPositions.clear(),Dr(this.updatePoint)}}function Jl(n,a){return a?{point:a(n.point)}:n}function Tv(n,a){return{x:n.x-a.x,y:n.y-a.y}}function bd({point:n},a){return{point:n,delta:Tv(n,Ib(a)),offset:Tv(n,nC(a)),velocity:rC(a,.1)}}function nC(n){return n[0]}function Ib(n){return n[n.length-1]}function rC(n,a){if(n.length<2)return{x:0,y:0};let s=n.length-1,o=null;const u=Ib(n);for(;s>=0&&(o=n[s],!(u.timestamp-o.timestamp>Xt(a)));)s--;if(!o)return{x:0,y:0};o===n[0]&&n.length>2&&u.timestamp-o.timestamp>Xt(a)*2&&(o=n[1]);const h=ln(u.timestamp-o.timestamp);if(h===0)return{x:0,y:0};const d={x:(u.x-o.x)/h,y:(u.y-o.y)/h};return d.x===1/0&&(d.x=0),d.y===1/0&&(d.y=0),d}function aC(n,{min:a,max:s},o){return a!==void 0&&n<a?n=o?Fe(a,n,o.min):Math.max(n,a):s!==void 0&&n>s&&(n=o?Fe(s,n,o.max):Math.min(n,s)),n}function Cv(n,a,s){return{min:a!==void 0?n.min+a:void 0,max:s!==void 0?n.max+s-(n.max-n.min):void 0}}function iC(n,{top:a,left:s,bottom:o,right:u}){return{x:Cv(n.x,s,u),y:Cv(n.y,a,o)}}function Nv(n,a){let s=a.min-n.min,o=a.max-n.max;return a.max-a.min<n.max-n.min&&([s,o]=[o,s]),{min:s,max:o}}function sC(n,a){return{x:Nv(n.x,a.x),y:Nv(n.y,a.y)}}function lC(n,a){let s=.5;const o=Dt(n),u=Dt(a);return u>o?s=ds(a.min,a.max-o,n.min):o>u&&(s=ds(n.min,n.max-u,a.min)),Dn(0,1,s)}function oC(n,a){const s={};return a.min!==void 0&&(s.min=a.min-n.min),a.max!==void 0&&(s.max=a.max-n.min),s}const rf=.35;function cC(n=rf){return n===!1?n=0:n===!0&&(n=rf),{x:Dv(n,"left","right"),y:Dv(n,"top","bottom")}}function Dv(n,a,s){return{min:Av(n,a),max:Av(n,s)}}function Av(n,a){return typeof n=="number"?n:n[a]||0}const uC=new WeakMap;class dC{constructor(a){this.openDragLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},this.constraints=!1,this.hasMutatedConstraints=!1,this.elastic=dt(),this.latestPointerEvent=null,this.latestPanInfo=null,this.visualElement=a}start(a,{snapToCursor:s=!1,distanceThreshold:o}={}){const{presenceContext:u}=this.visualElement;if(u&&u.isPresent===!1)return;const h=x=>{s&&this.snapToCursor(Ds(x).point),this.stopAnimation()},d=(x,b)=>{const{drag:j,dragPropagation:E,onDragStart:C}=this.getProps();if(j&&!E&&(this.openDragLock&&this.openDragLock(),this.openDragLock=L2(j),!this.openDragLock))return;this.latestPointerEvent=x,this.latestPanInfo=b,this.isDragging=!0,this.currentDirection=null,this.resolveConstraints(),this.visualElement.projection&&(this.visualElement.projection.isAnimationBlocked=!0,this.visualElement.projection.target=void 0),En(k=>{let A=this.getAxisMotionValue(k).get()||0;if(Nn.test(A)){const{projection:R}=this.visualElement;if(R&&R.layout){const _=R.layout.layoutBox[k];_&&(A=Dt(_)*(parseFloat(A)/100))}}this.originPoint[k]=A}),C&&$e.update(()=>C(x,b),!1,!0),Kd(this.visualElement,"transform");const{animationState:T}=this.visualElement;T&&T.setActive("whileDrag",!0)},m=(x,b)=>{this.latestPointerEvent=x,this.latestPanInfo=b;const{dragPropagation:j,dragDirectionLock:E,onDirectionLock:C,onDrag:T}=this.getProps();if(!j&&!this.openDragLock)return;const{offset:k}=b;if(E&&this.currentDirection===null){this.currentDirection=hC(k),this.currentDirection!==null&&C&&C(this.currentDirection);return}this.updateAxis("x",b.point,k),this.updateAxis("y",b.point,k),this.visualElement.render(),T&&$e.update(()=>T(x,b),!1,!0)},p=(x,b)=>{this.latestPointerEvent=x,this.latestPanInfo=b,this.stop(x,b),this.latestPointerEvent=null,this.latestPanInfo=null},g=()=>{const{dragSnapToOrigin:x}=this.getProps();(x||this.constraints)&&this.startAnimation({x:0,y:0})},{dragSnapToOrigin:v}=this.getProps();this.panSession=new Wb(a,{onSessionStart:h,onStart:d,onMove:m,onSessionEnd:p,resumeAnimation:g},{transformPagePoint:this.visualElement.getTransformPagePoint(),dragSnapToOrigin:v,distanceThreshold:o,contextWindow:Jb(this.visualElement),element:this.visualElement.current})}stop(a,s){const o=a||this.latestPointerEvent,u=s||this.latestPanInfo,h=this.isDragging;if(this.cancel(),!h||!u||!o)return;const{velocity:d}=u;this.startAnimation(d);const{onDragEnd:m}=this.getProps();m&&$e.postRender(()=>m(o,u))}cancel(){this.isDragging=!1;const{projection:a,animationState:s}=this.visualElement;a&&(a.isAnimationBlocked=!1),this.endPanSession();const{dragPropagation:o}=this.getProps();!o&&this.openDragLock&&(this.openDragLock(),this.openDragLock=null),s&&s.setActive("whileDrag",!1)}endPanSession(){this.panSession&&this.panSession.end(),this.panSession=void 0}updateAxis(a,s,o){const{drag:u}=this.getProps();if(!o||!Wl(a,u,this.currentDirection))return;const h=this.getAxisMotionValue(a);let d=this.originPoint[a]+o[a];this.constraints&&this.constraints[a]&&(d=aC(d,this.constraints[a],this.elastic[a])),h.set(d)}resolveConstraints(){var h;const{dragConstraints:a,dragElastic:s}=this.getProps(),o=this.visualElement.projection&&!this.visualElement.projection.layout?this.visualElement.projection.measure(!1):(h=this.visualElement.projection)==null?void 0:h.layout,u=this.constraints;a&&Xa(a)?this.constraints||(this.constraints=this.resolveRefConstraints()):a&&o?this.constraints=iC(o.layoutBox,a):this.constraints=!1,this.elastic=cC(s),u!==this.constraints&&!Xa(a)&&o&&this.constraints&&!this.hasMutatedConstraints&&En(d=>{this.constraints!==!1&&this.getAxisMotionValue(d)&&(this.constraints[d]=oC(o.layoutBox[d],this.constraints[d]))})}resolveRefConstraints(){const{dragConstraints:a,onMeasureDragConstraints:s}=this.getProps();if(!a||!Xa(a))return!1;const o=a.current,{projection:u}=this.visualElement;if(!u||!u.layout)return!1;u.root&&(u.root.scroll=void 0,u.root.updateScroll());const h=fE(o,u.root,this.visualElement.getTransformPagePoint());let d=sC(u.layout.layoutBox,h);if(s){const m=s(cE(d));this.hasMutatedConstraints=!!m,m&&(d=Sb(m))}return d}startAnimation(a){const{drag:s,dragMomentum:o,dragElastic:u,dragTransition:h,dragSnapToOrigin:d,onDragTransitionEnd:m}=this.getProps(),p=this.constraints||{},g=En(v=>{if(!Wl(v,s,this.currentDirection))return;let x=p&&p[v]||{};(d===!0||d===v)&&(x={min:0,max:0});const b=u?200:1e6,j=u?40:1e7,E={type:"inertia",velocity:o?a[v]:0,bounceStiffness:b,bounceDamping:j,timeConstant:750,restDelta:1,restSpeed:10,...h,...x};return this.startAxisValueAnimation(v,E)});return Promise.all(g).then(m)}startAxisValueAnimation(a,s){const o=this.getAxisMotionValue(a);return Kd(this.visualElement,a),o.start(Lf(a,o,0,s,this.visualElement,!1))}stopAnimation(){En(a=>this.getAxisMotionValue(a).stop())}getAxisMotionValue(a){const s=`_drag${a.toUpperCase()}`,u=this.visualElement.getProps()[s];return u||this.visualElement.getValue(a,this.visualElement.latestValues[a]??0)}snapToCursor(a){En(s=>{const{drag:o}=this.getProps();if(!Wl(s,o,this.currentDirection))return;const{projection:u}=this.visualElement,h=this.getAxisMotionValue(s);if(u&&u.layout){const{min:d,max:m}=u.layout.layoutBox[s],p=h.get()||0;h.set(a[s]-Fe(d,m,.5)+p)}})}scalePositionWithinConstraints(){if(!this.visualElement.current)return;const{drag:a,dragConstraints:s}=this.getProps(),{projection:o}=this.visualElement;if(!Xa(s)||!o||!this.constraints)return;this.stopAnimation();const u={x:0,y:0};En(d=>{const m=this.getAxisMotionValue(d);if(m&&this.constraints!==!1){const p=m.get();u[d]=lC({min:p,max:p},this.constraints[d])}});const{transformTemplate:h}=this.visualElement.getProps();this.visualElement.current.style.transform=h?h({},""):"none",o.root&&o.root.updateScroll(),o.updateLayout(),this.constraints=!1,this.resolveConstraints(),En(d=>{if(!Wl(d,a,null))return;const m=this.getAxisMotionValue(d),{min:p,max:g}=this.constraints[d];m.set(Fe(p,g,u[d]))}),this.visualElement.render()}addListeners(){if(!this.visualElement.current)return;uC.set(this.visualElement,this);const a=this.visualElement.current,s=cs(a,"pointerdown",g=>{const{drag:v,dragListener:x=!0}=this.getProps(),b=g.target,j=b!==a&&G2(b);v&&x&&!j&&this.start(g)});let o;const u=()=>{const{dragConstraints:g}=this.getProps();Xa(g)&&g.current&&(this.constraints=this.resolveRefConstraints(),o||(o=fC(a,g.current,()=>this.scalePositionWithinConstraints())))},{projection:h}=this.visualElement,d=h.addEventListener("measure",u);h&&!h.layout&&(h.root&&h.root.updateScroll(),h.updateLayout()),$e.read(u);const m=ms(window,"resize",()=>this.scalePositionWithinConstraints()),p=h.addEventListener("didUpdate",(({delta:g,hasLayoutChanged:v})=>{this.isDragging&&v&&(En(x=>{const b=this.getAxisMotionValue(x);b&&(this.originPoint[x]+=g[x].translate,b.set(b.get()+g[x].translate))}),this.visualElement.render())}));return()=>{m(),s(),d(),p&&p(),o&&o()}}getProps(){const a=this.visualElement.getProps(),{drag:s=!1,dragDirectionLock:o=!1,dragPropagation:u=!1,dragConstraints:h=!1,dragElastic:d=rf,dragMomentum:m=!0}=a;return{...a,drag:s,dragDirectionLock:o,dragPropagation:u,dragConstraints:h,dragElastic:d,dragMomentum:m}}}function kv(n){let a=!0;return()=>{if(a){a=!1;return}n()}}function fC(n,a,s){const o=By(n,kv(s)),u=By(a,kv(s));return()=>{o(),u()}}function Wl(n,a,s){return(a===!0||a===n)&&(s===null||s===n)}function hC(n,a=10){let s=null;return Math.abs(n.y)>a?s="y":Math.abs(n.x)>a&&(s="x"),s}class mC extends kr{constructor(a){super(a),this.removeGroupControls=on,this.removeListeners=on,this.controls=new dC(a)}mount(){const{dragControls:a}=this.node.getProps();a&&(this.removeGroupControls=a.subscribe(this.controls)),this.removeListeners=this.controls.addListeners()||on}update(){const{dragControls:a}=this.node.getProps(),{dragControls:s}=this.node.prevProps||{};a!==s&&(this.removeGroupControls(),a&&(this.removeGroupControls=a.subscribe(this.controls)))}unmount(){this.removeGroupControls(),this.removeListeners(),this.controls.isDragging||this.controls.endPanSession()}}const Sd=n=>(a,s)=>{n&&$e.update(()=>n(a,s),!1,!0)};class pC extends kr{constructor(){super(...arguments),this.removePointerDownListener=on}onPointerDown(a){this.session=new Wb(a,this.createPanHandlers(),{transformPagePoint:this.node.getTransformPagePoint(),contextWindow:Jb(this.node)})}createPanHandlers(){const{onPanSessionStart:a,onPanStart:s,onPan:o,onPanEnd:u}=this.node.getProps();return{onSessionStart:Sd(a),onStart:Sd(s),onMove:Sd(o),onEnd:(h,d)=>{delete this.session,u&&$e.postRender(()=>u(h,d))}}}mount(){this.removePointerDownListener=cs(this.node.current,"pointerdown",a=>this.onPointerDown(a))}update(){this.session&&this.session.updateHandlers(this.createPanHandlers())}unmount(){this.removePointerDownListener(),this.session&&this.session.end()}}let jd=!1;class gC extends S.Component{componentDidMount(){const{visualElement:a,layoutGroup:s,switchLayoutGroup:o,layoutId:u}=this.props,{projection:h}=a;h&&(s.group&&s.group.add(h),o&&o.register&&u&&o.register(h),jd&&h.root.didUpdate(),h.addEventListener("animationComplete",()=>{this.safeToRemove()}),h.setOptions({...h.options,layoutDependency:this.props.layoutDependency,onExitComplete:()=>this.safeToRemove()})),go.hasEverUpdated=!0}getSnapshotBeforeUpdate(a){const{layoutDependency:s,visualElement:o,drag:u,isPresent:h}=this.props,{projection:d}=o;return d&&(d.isPresent=h,a.layoutDependency!==s&&d.setOptions({...d.options,layoutDependency:s}),jd=!0,u||a.layoutDependency!==s||s===void 0||a.isPresent!==h?d.willUpdate():this.safeToRemove(),a.isPresent!==h&&(h?d.promote():d.relegate()||$e.postRender(()=>{const m=d.getStack();(!m||!m.members.length)&&this.safeToRemove()}))),null}componentDidUpdate(){const{visualElement:a,layoutAnchor:s}=this.props,{projection:o}=a;o&&(o.options.layoutAnchor=s,o.root.didUpdate(),Yf.postRender(()=>{!o.currentAnimation&&o.isLead()&&this.safeToRemove()}))}componentWillUnmount(){const{visualElement:a,layoutGroup:s,switchLayoutGroup:o}=this.props,{projection:u}=a;jd=!0,u&&(u.scheduleCheckAfterUnmount(),s&&s.group&&s.group.remove(u),o&&o.deregister&&o.deregister(u))}safeToRemove(){const{safeToRemove:a}=this.props;a&&a()}render(){return null}}function e0(n){const[a,s]=Yb(),o=S.useContext(wf);return l.jsx(gC,{...n,layoutGroup:o,switchLayoutGroup:S.useContext(Zb),isPresent:a,safeToRemove:s})}const yC={pan:{Feature:pC},drag:{Feature:mC,ProjectionNode:qb,MeasureLayout:e0}};function Mv(n,a,s){const{props:o}=n;n.animationState&&o.whileHover&&n.animationState.setActive("whileHover",s==="Start");const u="onHover"+s,h=o[u];h&&$e.postRender(()=>h(a,Ds(a)))}class vC extends kr{mount(){const{current:a}=this.node;a&&(this.unmount=H2(a,(s,o)=>(Mv(this.node,o,"Start"),u=>Mv(this.node,u,"End"))))}unmount(){}}class xC extends kr{constructor(){super(...arguments),this.isActive=!1}onFocus(){let a=!1;try{a=this.node.current.matches(":focus-visible")}catch{a=!0}!a||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!0),this.isActive=!0)}onBlur(){!this.isActive||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!1),this.isActive=!1)}mount(){this.unmount=Ts(ms(this.node.current,"focus",()=>this.onFocus()),ms(this.node.current,"blur",()=>this.onBlur()))}unmount(){}}function Rv(n,a,s){const{props:o}=n;if(n.current instanceof HTMLButtonElement&&n.current.disabled)return;n.animationState&&o.whileTap&&n.animationState.setActive("whileTap",s==="Start");const u="onTap"+(s==="End"?"":s),h=o[u];h&&$e.postRender(()=>h(a,Ds(a)))}class bC extends kr{mount(){const{current:a}=this.node;if(!a)return;const{globalTapTarget:s,propagate:o}=this.node.props;this.unmount=$2(a,(u,h)=>(Rv(this.node,h,"Start"),(d,{success:m})=>Rv(this.node,d,m?"End":"Cancel")),{useGlobalTarget:s,stopPropagation:(o==null?void 0:o.tap)===!1})}unmount(){}}const af=new WeakMap,wd=new WeakMap,SC=n=>{const a=af.get(n.target);a&&a(n)},jC=n=>{n.forEach(SC)};function wC({root:n,...a}){const s=n||document;wd.has(s)||wd.set(s,{});const o=wd.get(s),u=JSON.stringify(a);return o[u]||(o[u]=new IntersectionObserver(jC,{root:n,...a})),o[u]}function EC(n,a,s){const o=wC(a);return af.set(n,s),o.observe(n),()=>{af.delete(n),o.unobserve(n)}}const TC={some:0,all:1};class CC extends kr{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){var p;(p=this.stopObserver)==null||p.call(this);const{viewport:a={}}=this.node.getProps(),{root:s,margin:o,amount:u="some",once:h}=a,d={root:s?s.current:void 0,rootMargin:o,threshold:typeof u=="number"?u:TC[u]},m=g=>{const{isIntersecting:v}=g;if(this.isInView===v||(this.isInView=v,h&&!v&&this.hasEnteredView))return;v&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive("whileInView",v);const{onViewportEnter:x,onViewportLeave:b}=this.node.getProps(),j=v?x:b;j&&j(g)};this.stopObserver=EC(this.node.current,d,m)}mount(){this.startObserver()}update(){if(typeof IntersectionObserver>"u")return;const{props:a,prevProps:s}=this.node;["amount","margin","root"].some(NC(a,s))&&this.startObserver()}unmount(){var a;(a=this.stopObserver)==null||a.call(this),this.hasEnteredView=!1,this.isInView=!1}}function NC({viewport:n={}},{viewport:a={}}={}){return s=>n[s]!==a[s]}const DC={inView:{Feature:CC},tap:{Feature:bC},focus:{Feature:xC},hover:{Feature:vC}},AC={layout:{ProjectionNode:qb,MeasureLayout:e0}},kC={...IT,...DC,...yC,...AC},MC=KT(kC,ZT);function t0(){!Xf.current&&vb();const[n]=S.useState(Co.current);return n}const n0=MC,Mo=new Map,Ov=new Set;let RC=0;const If=()=>{var n;return(n=window.chrome)==null?void 0:n.webview};function OC(n){var s;const a=Mo.get(n.id);if(a){if(n.type==="progress"){(s=a.progress)==null||s.call(a,n.data);return}window.clearTimeout(a.timer),Mo.delete(n.id),n.ok?a.resolve(n.data):a.reject(new Error(n.error||"操作失败"))}}var mx;(mx=If())==null||mx.addEventListener("message",n=>OC(n.data));function zC(n,a){var s;a&&Ov.has(a)||(a&&Ov.add(a),(s=If())==null||s.postMessage({type:"app.ready",route:n,navigation:a}))}function fe(n,a,s=3e4,o){const u=If();if(!u)return Promise.reject(new Error("当前页面未连接到桌面宿主"));const h=`${Date.now()}-${++RC}`;return new Promise((d,m)=>{const p=window.setTimeout(()=>{Mo.delete(h),m(new Error("操作超时，请重试"))},s);Mo.set(h,{resolve:g=>d(g),reject:m,timer:p,progress:o}),u.postMessage({id:h,operation:n,payload:a})})}/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _C=n=>n.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),r0=(...n)=>n.filter((a,s,o)=>!!a&&a.trim()!==""&&o.indexOf(a)===s).join(" ").trim();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var VC={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const BC=S.forwardRef(({color:n="currentColor",size:a=24,strokeWidth:s=2,absoluteStrokeWidth:o,className:u="",children:h,iconNode:d,...m},p)=>S.createElement("svg",{ref:p,...VC,width:a,height:a,stroke:n,strokeWidth:o?Number(s)*24/Number(a):s,className:r0("lucide",u),...m},[...d.map(([g,v])=>S.createElement(g,v)),...Array.isArray(h)?h:[h]]));/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xe=(n,a)=>{const s=S.forwardRef(({className:o,...u},h)=>S.createElement(BC,{ref:h,iconNode:a,className:r0(`lucide-${_C(n)}`,o),...u}));return s.displayName=`${n}`,s};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ps=Xe("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const LC=Xe("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const UC=Xe("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ii=Xe("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const HC=Xe("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qC=Xe("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const YC=Xe("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const PC=Xe("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const GC=Xe("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sf=Xe("Database",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const FC=Xe("Ellipsis",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zv=Xe("FileCheck2",[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4",key:"1pf5j1"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"m3 15 2 2 4-4",key:"1lhrkk"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ro=Xe("FileSpreadsheet",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M8 13h2",key:"yr2amv"}],["path",{d:"M14 13h2",key:"un5t4a"}],["path",{d:"M8 17h2",key:"2yhykz"}],["path",{d:"M14 17h2",key:"10kma7"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $C=Xe("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oo=Xe("FolderOpen",[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yn=Xe("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const XC=Xe("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const KC=Xe("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a0=Xe("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ZC=Xe("RotateCw",[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",key:"1p45f6"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const QC=Xe("Rows3",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M21 9H3",key:"1338ky"}],["path",{d:"M21 15H3",key:"9uk58r"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eh=Xe("Settings2",[["path",{d:"M20 7h-9",key:"3s1dr2"}],["path",{d:"M14 17H5",key:"gfn3mx"}],["circle",{cx:"17",cy:"17",r:"3",key:"18b49y"}],["circle",{cx:"7",cy:"7",r:"3",key:"dfmy0x"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const JC=Xe("Sigma",[["path",{d:"M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2",key:"wuwx1p"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const WC=Xe("SlidersHorizontal",[["line",{x1:"21",x2:"14",y1:"4",y2:"4",key:"obuewd"}],["line",{x1:"10",x2:"3",y1:"4",y2:"4",key:"1q6298"}],["line",{x1:"21",x2:"12",y1:"12",y2:"12",key:"1iu8h1"}],["line",{x1:"8",x2:"3",y1:"12",y2:"12",key:"ntss68"}],["line",{x1:"21",x2:"16",y1:"20",y2:"20",key:"14d8ph"}],["line",{x1:"12",x2:"3",y1:"20",y2:"20",key:"m0wm8r"}],["line",{x1:"14",x2:"14",y1:"2",y2:"6",key:"14e1ph"}],["line",{x1:"8",x2:"8",y1:"10",y2:"14",key:"1i6ji0"}],["line",{x1:"16",x2:"16",y1:"18",y2:"22",key:"1lctlv"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const IC=Xe("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eN=Xe("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qo=Xe("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);var th=yx();const tN=["一","二","三","四","五","六","日"],nN=Array.from({length:12},(n,a)=>`${a+1}月`);function rN(n){if(!n)return null;const[a,s,o=1]=n.split("-").map(Number);return!a||!s||!o?null:new Date(a,s-1,o)}function _v(n){const a=n.getFullYear(),s=String(n.getMonth()+1).padStart(2,"0"),o=String(n.getDate()).padStart(2,"0");return`${a}-${s}-${o}`}function aN(n){const a=n.getFullYear(),s=String(n.getMonth()+1).padStart(2,"0"),o=String(n.getDate()).padStart(2,"0");return`${a}/${s}/${o}`}function iN(n,a){const s=new Date(n,a,1).getDay();return s===0?6:s-1}function sN(n,a){return new Date(n,a+1,0).getDate()}function Vv(n,a){return n.getFullYear()===a.getFullYear()&&n.getMonth()===a.getMonth()&&n.getDate()===a.getDate()}function lN(n){return Math.floor(n/12)*12}function Kt({value:n,onChange:a,label:s,disabled:o=!1,selectionMode:u="day"}){var N;const h=S.useId(),d=S.useMemo(()=>rN(n),[n]),[m,p]=S.useState(!1),[g,v]=S.useState(u),[x,b]=S.useState(d??new Date),[j,E]=S.useState({top:0,left:0}),[C,T]=S.useState("bottom"),k=S.useRef(null),A=S.useRef(null),R=S.useRef(null);S.useEffect(()=>{d&&b(d)},[n]);function _(){const V=k.current,ee=R.current;if(!V||!ee)return;const le=V.ownerDocument.defaultView||window,de=V.getBoundingClientRect(),me=ee.getBoundingClientRect(),xe=me.width,ie=me.height,W=8,he=12,ne=le.innerHeight-de.bottom-he,ue=de.top-he,Ne=ie>ne&&ue>ne,Me=Ne?"top":"bottom";let De=Ne?de.top-ie-W:de.bottom+W;De<he&&(De=he),De+ie>le.innerHeight-he&&(De=Math.max(he,le.innerHeight-ie-he));let Te=de.left;Te+xe>le.innerWidth-he&&(Te=le.innerWidth-xe-he),Te<he&&(Te=he),T(Me),E({top:De,left:Te})}S.useLayoutEffect(()=>{m&&_()},[m,g]),S.useEffect(()=>{var le;if(!m)return;const V=((le=k.current)==null?void 0:le.ownerDocument.defaultView)||window;function ee(){_()}return V.addEventListener("resize",ee),V.addEventListener("scroll",ee,!0),()=>{V.removeEventListener("resize",ee),V.removeEventListener("scroll",ee,!0)}},[m,g]),S.useEffect(()=>{var de;const V=((de=A.current)==null?void 0:de.ownerDocument)||document;function ee(me){var he,ne;const xe=me.target,ie=(he=A.current)==null?void 0:he.contains(xe),W=(ne=R.current)==null?void 0:ne.contains(xe);!ie&&!W&&(p(!1),v(u))}function le(me){me.key==="Escape"&&(p(!1),v(u))}return V.addEventListener("mousedown",ee),V.addEventListener("keydown",le),()=>{V.removeEventListener("mousedown",ee),V.removeEventListener("keydown",le)}},[u]);const B=x.getFullYear(),Y=x.getMonth(),D=sN(B,Y),H=iN(B,Y),M=lN(B),z=Array.from({length:12},(V,ee)=>M+ee),L=[];for(let V=0;V<H;V+=1)L.push(null);for(let V=1;V<=D;V+=1)L.push(V);function K(){if(g==="day"){b(new Date(B,Y-1,1));return}if(g==="month"){b(new Date(B-1,Y,1));return}b(new Date(B-12,Y,1))}function ce(){if(g==="day"){b(new Date(B,Y+1,1));return}if(g==="month"){b(new Date(B+1,Y,1));return}b(new Date(B+12,Y,1))}function se(){if(u==="month"){v(g==="month"?"year":"month");return}if(g==="day"){v("month");return}if(g==="month"){v("year");return}v("day")}function ye(V){const ee=new Date(B,Y,V);a(_v(ee)),p(!1),v("day")}function P(V){if(u==="month"){a(`${B}-${String(V+1).padStart(2,"0")}`),b(new Date(B,V,1)),p(!1),v("month");return}b(new Date(B,V,1)),v("day")}function oe(V){b(new Date(V,Y,1)),v("month")}function J(){const V=new Date;b(V),a(u==="month"?`${V.getFullYear()}-${String(V.getMonth()+1).padStart(2,"0")}`:_v(V)),v(u),p(!1)}function $(){return g==="day"?`${B}年 ${Y+1}月`:g==="month"?`${B}年`:`${M} - ${M+11}`}const ae=m?l.jsxs("div",{ref:R,className:`date-picker-popover date-picker-popover-${C}`,style:{top:j.top,left:j.left},children:[l.jsxs("div",{className:"date-picker-header",children:[l.jsx("button",{type:"button",className:"date-picker-nav-button",onClick:K,"aria-label":"上一页",children:l.jsx(qC,{size:17,strokeWidth:1.7})}),l.jsx("button",{type:"button",className:"date-picker-title-button",onClick:se,children:$()}),l.jsx("button",{type:"button",className:"date-picker-nav-button",onClick:ce,"aria-label":"下一页",children:l.jsx(YC,{size:17,strokeWidth:1.7})})]}),g==="day"&&l.jsxs(l.Fragment,{children:[l.jsx("div",{className:"date-picker-weekdays",children:tN.map(V=>l.jsx("div",{children:V},V))}),l.jsx("div",{className:"date-picker-grid",children:L.map((V,ee)=>{if(V===null)return l.jsx("div",{},`empty-${ee}`);const le=new Date(B,Y,V),de=d?Vv(le,d):!1,me=Vv(le,new Date);return l.jsx("button",{type:"button",className:["date-picker-day",de?"date-picker-day-selected":"",me&&!de?"date-picker-day-today":""].filter(Boolean).join(" "),onClick:()=>ye(V),children:V},`${B}-${Y}-${V}`)})})]}),g==="month"&&l.jsx("div",{className:"date-picker-month-grid",children:nN.map((V,ee)=>{const le=d&&d.getFullYear()===B&&d.getMonth()===ee,de=new Date().getFullYear()===B&&new Date().getMonth()===ee;return l.jsx("button",{type:"button",className:["date-picker-month-item",le?"date-picker-month-item-selected":"",de&&!le?"date-picker-month-item-current":""].filter(Boolean).join(" "),onClick:()=>P(ee),children:V},V)})}),g==="year"&&l.jsx("div",{className:"date-picker-year-grid",children:z.map(V=>{const ee=d&&d.getFullYear()===V,le=new Date().getFullYear()===V;return l.jsx("button",{type:"button",className:["date-picker-year-item",ee?"date-picker-year-item-selected":"",le&&!ee?"date-picker-year-item-current":""].filter(Boolean).join(" "),onClick:()=>oe(V),children:V},V)})}),l.jsx("div",{className:"date-picker-footer",children:l.jsx("button",{type:"button",className:"date-picker-today-button",onClick:J,children:u==="month"?"回到本月":"回到今天"})})]}):null;return l.jsxs(l.Fragment,{children:[l.jsxs("div",{ref:A,className:"date-picker",children:[s&&l.jsx("label",{id:`${h}-label`,className:"date-picker-label",children:s}),l.jsxs("button",{ref:k,type:"button",disabled:o,className:`date-picker-trigger ${m?"date-picker-trigger-open":""}`,onClick:()=>{o||p(V=>{const ee=!V;return ee&&v(u),ee})},"aria-expanded":m,"aria-labelledby":s?`${h}-label ${h}-value`:void 0,"aria-label":s?void 0:u==="month"?"选择月份":"选择日期",children:[l.jsx("span",{id:`${h}-value`,className:d?"":"date-picker-placeholder",children:d?u==="month"?`${d.getFullYear()} / ${String(d.getMonth()+1).padStart(2,"0")}`:aN(d):u==="month"?"选择月份":"选择日期"}),l.jsx(UC,{className:"date-picker-calendar-icon",size:16,strokeWidth:1.7})]})]}),ae&&th.createPortal(ae,((N=A.current)==null?void 0:N.ownerDocument.body)||document.body)]})}function ot({value:n,options:a,placeholder:s,disabled:o,ariaLabel:u,onChange:h}){const[d,m]=S.useState(!1),p=t0(),g=a.find(v=>v.value===n);return l.jsxs("div",{className:"form-picker",children:[l.jsxs("button",{type:"button",className:`picker-trigger ${d?"open":""}`,disabled:o,"aria-label":u,"aria-haspopup":"listbox","aria-expanded":d,onClick:()=>m(!d),children:[l.jsx("span",{className:g?"":"picker-placeholder",children:(g==null?void 0:g.label)||s}),l.jsx(HC,{})]}),d&&l.jsxs(l.Fragment,{children:[l.jsx("button",{type:"button",className:"picker-backdrop","aria-label":"关闭选项",onClick:()=>m(!1)}),l.jsxs(n0.div,{className:"picker-popover choice-popover",role:"listbox",initial:p?!1:{opacity:0,y:-5},animate:{opacity:1,y:0,transitionEnd:{transform:"none"}},transition:{duration:p?0:.12},children:[a.map(v=>l.jsxs("button",{type:"button",role:"option","aria-selected":v.value===n,className:v.value===n?"selected":"",onClick:()=>{h(v.value),m(!1)},children:[l.jsx("span",{children:v.label}),v.value===n&&l.jsx(ii,{})]},v.value)),!a.length&&l.jsx("span",{className:"picker-empty",children:"暂无可选项"})]})]})]})}const Bv=["firstTarget","secondTarget","dateHeader","label"],Lv=n=>n.rowStep?`每天向下 ${n.rowStep} 行`:`每天向右 ${n.columnStep} 列`;function oN(){const n=new Intl.DateTimeFormat("en",{timeZone:"Asia/Shanghai",year:"numeric",month:"2-digit"}).formatToParts(new Date);return`${n.find(a=>a.type==="year").value}-${n.find(a=>a.type==="month").value}`}function cN({id:n,metrics:a,initialMetric:s,businessDate:o,rules:u,fixedSheet:h,disabled:d,run:m,onActive:p,onSaved:g}){var L,K;const[v,x]=S.useState(s||((L=a[0])==null?void 0:L.value)||""),[b]=S.useState(()=>(o==null?void 0:o.slice(0,7))||oN()),[j,E]=S.useState(`${b}-01`),[C,T]=S.useState(`${b}-02`),[k,A]=S.useState(),[R,_]=S.useState({}),[B,Y]=S.useState(""),D=!!k,H=((K=a.find(ce=>ce.value===v))==null?void 0:K.label)||"业务字段",M={firstTarget:`${j} 的${H}填报格`,secondTarget:`${C} 的${H}填报格`,dateHeader:`${j} 的日期单元格`,label:"项目名称、公司或材料表头"};async function z(ce){Y(""),await m(ce==="preview"?"验证排列并定位第三个日期":ce==="confirm"?"保存排列规则":"记录示范位置",async()=>{try{const se=await fe("tencentSheet.teach",{id:n,stage:ce,metric:v,firstDate:j,secondDate:C,sessionToken:k==null?void 0:k.sessionToken,previewToken:k==null?void 0:k.previewToken,slot:k==null?void 0:k.step},3e5);ce==="confirm"||ce==="cancel"?(A(void 0),_({}),p(!1),ce==="confirm"&&await g()):(A(ye=>({...ye,...se})),p(!0),se.capture&&se.slot&&_(ye=>({...ye,[se.slot]:se.capture})))}catch(se){Y(se instanceof Error?se.message:String(se)),ce==="cancel"&&(A(void 0),_({}),p(!1))}})}return l.jsxs("fieldset",{className:"tencent-sheet-panel tencent-teaching",disabled:d,children:[l.jsx("legend",{children:"示范填报位置"}),l.jsx("p",{className:"tencent-sheet-help",children:"为每个项目记录排列规则。示范只读取位置与表头，受保护或已有数据的单元格也可使用，不检查是否可编辑、不填写数据。程序学习两个日期的排列关系，再请你确认第三个位置；正式填报前才检查目标是否可编辑。"}),l.jsx("div",{className:"tencent-teaching-rules",children:a.map(ce=>l.jsxs("div",{children:[l.jsx("strong",{children:ce.label}),l.jsx("span",{children:u!=null&&u[ce.value]?Lv(u[ce.value]):"待示范位置"})]},ce.value))}),B&&l.jsx("div",{className:"notice error",role:"alert",children:l.jsxs("div",{children:[l.jsx("strong",{children:"示范未完成"}),l.jsx("span",{children:B})]})}),D?l.jsxs(l.Fragment,{children:[l.jsx("ol",{className:"tencent-teaching-steps","aria-label":"示范进度",children:Bv.map((ce,se)=>{var ye;return l.jsxs("li",{"aria-current":k.step===ce?"step":void 0,className:R[ce]?"done":"",children:[l.jsxs("span",{children:[se+1,". ",M[ce]]}),l.jsx("strong",{children:((ye=R[ce])==null?void 0:ye.address)||"待选取"})]},ce)})}),Bv.includes(k.step)&&l.jsxs("div",{className:"tencent-teaching-prompt",children:[l.jsxs("strong",{children:["请在网页中单击：",M[k.step]]}),l.jsx("p",{children:k.step==="dateHeader"?"选择显示该日期的单元格，程序会检查后续日期是否按同样间隔排列。":k.step==="label"?"选择一处固定的文字标志，用于确认每次填写的仍是这个项目。":"只选中单元格即可。受保护或已有数据的格子也可示范，无需解除保护或输入数据。"}),l.jsx("button",{className:"primary",onClick:()=>z("capture"),children:"记住当前选中的单元格"})]}),k.step==="preview"&&l.jsx("button",{className:"primary",onClick:()=>z("preview"),children:"验证规则并查看第三个位置"}),k.step==="confirm"&&k.rule&&k.prediction&&l.jsxs("div",{className:"tencent-teaching-prompt",children:[l.jsxs("strong",{children:[H,"：",Lv(k.rule)]}),l.jsxs("p",{children:["程序已选中 ",k.prediction.date," 的预测位置 ",l.jsx("b",{children:k.prediction.address}),"。请查看网页，确认它确实是当天的填报格。"]}),l.jsxs("p",{children:["日期及“",k.rule.labelAnchor.expected,"”已通过只读校验。"]}),(k.sheetMode==="fixed"||!k.sheetMode&&h)&&!k.rule.dateAnchor.format.includes("{yyyy}")&&l.jsx("p",{children:"日期未包含完整年月。此固定工作表跨月时需重新示范确认。"}),l.jsxs("div",{className:"tencent-sheet-actions",children:[l.jsx("button",{className:"secondary",onClick:()=>z("preview"),children:"再次定位预测位置"}),l.jsx("button",{className:"primary",onClick:()=>z("confirm"),children:"位置正确，保存此项目"})]})]}),l.jsx("button",{className:"ghost",onClick:()=>z("cancel"),children:"取消示范，保留原配置"})]}):l.jsxs(l.Fragment,{children:[l.jsxs("label",{children:["要示范哪个项目？",l.jsx(ot,{value:v,options:a,placeholder:"选择项目",disabled:d,ariaLabel:"要示范的项目",onChange:x})]}),l.jsxs("div",{className:"tencent-sheet-grid",children:[l.jsx(Kt,{value:j,onChange:E,label:"第一个示范日期",disabled:d}),l.jsx(Kt,{value:C,onChange:T,label:"第二个示范日期",disabled:d})]}),l.jsx("p",{className:"tencent-sheet-help",children:"先在网页选中要配置的工作表。两个日期必须在同一个月，建议使用 1 日和 2 日。"}),l.jsx("button",{className:"secondary",disabled:d||!v||!j||!C,onClick:()=>z("start"),children:u!=null&&u[v]?"重新示范此项目":"开始示范此项目"})]})]})}const Il=[{key:"sheetTab",title:"① Sheet 标签",prompt:"请在浏览器中点击任意一个底部 Sheet 标签。程序会识别它所属的集合。"},{key:"cellAddressBox",title:"② 单元格名称框",prompt:"先在表格中选一个可编辑的空白格，再点击左上角名称框。程序会读取地址，作为临时测试格。尚未选择时可按 Esc 取消后重试。"},{key:"cellEditor",title:"③ 内容编辑区／公式栏",prompt:"请点击上方内容编辑区或公式栏的输入区域。录制的是通用控件，不是测试格的位置。"},{key:"saveStatus",title:"④ 保存状态（可选）",prompt:"请点击保存状态控件的位置，无需等待特定文字。"}];function uN({id:n,value:a,disabled:s,onSaved:o,onActive:u}){var z;const[h,d]=S.useState(),[m,p]=S.useState(!1),[g,v]=S.useState(""),[x,b]=S.useState(""),[j,E]=S.useState(!1),[C,T]=S.useState(""),[k,A]=S.useState([]),[R,_]=S.useState(),[B,Y]=S.useState();function D(){T(""),A([])}function H(){d(structuredClone(a??{})),p(!1),b(""),E(!1),_(void 0),Y(void 0),D(),u(!0)}async function M(L,K){if(!h)return;v(K??L),E(!1),b(K?Il.find(se=>se.key===K).prompt:"正在操作…");const ce=C;L!=="save"&&D(),(L==="open"||L==="testSheet"||K==="sheetTab")&&_(void 0),(L==="open"||L==="testSheet"||L==="captureCell"||K==="sheetTab"||K==="cellAddressBox")&&Y(void 0);try{let se=await fe(`tencentSite.${L}`,{id:n,controls:h,key:K,token:ce},3e5);L==="pick"&&K==="sheetTab"&&(se.controls&&d(se.controls),v("testSheet"),b("正在独立检验 Sheet：识别标签集合、匹配本月并确认选中状态…"),se=await fe("tencentSite.testSheet",{id:n,controls:se.controls??h},3e5)),b(se.message),E(se.passed===!1),L==="open"&&p(!0),se.controls&&d(se.controls),"testCell"in se&&Y(se.testCell??void 0),(L==="testSheet"||K==="sheetTab")&&_(se),se.sheetRequired&&(_({passed:!1,message:se.message}),Y(void 0)),L==="test"&&(T(se.token??""),A(se.steps)),L==="save"&&(await o(),d(void 0),u(!1))}catch(se){E(!0),b(se instanceof Error?se.message:String(se)),D()}finally{v("")}}return l.jsxs("fieldset",{className:"card tencent-web-controls tencent-sheet-panel","aria-busy":!!g,disabled:s,children:[l.jsx("h2",{children:"网页控件录制"}),l.jsx("p",{className:"tencent-sheet-help",children:"记录本任务的单元格名称框、内容编辑区和 Sheet 标签。可补录保存状态，用于等待网页保存完成；业务填写位置在“业务字段”中单独配置。"}),h?l.jsx(l.Fragment,{children:l.jsxs("fieldset",{className:"tencent-site-fields",disabled:s||!!g,children:[l.jsx("button",{className:m?"secondary":"primary",onClick:()=>M("open"),children:m?"重新打开配置文档":"开始配置"}),l.jsxs("div",{className:"tencent-site-recording",children:[l.jsx("div",{className:"tencent-site-controls",children:Il.map(L=>l.jsxs("div",{children:[l.jsx("strong",{children:L.title}),l.jsxs("span",{className:"tencent-control-state",children:[L.key==="sheetTab"&&(R!=null&&R.passed)?"已录制 · 检验通过":h[L.key]?"已录制":"未配置",L.key==="saveStatus"&&h.saveStatus?` · ${h.saveStatus.sampleText}`:""]}),l.jsxs("button",{className:"secondary",disabled:!m||L.key!=="sheetTab"&&!(R!=null&&R.passed)||L.key==="cellEditor"&&!B,onClick:()=>M("pick",L.key),children:["录制",L.key==="sheetTab"?" Sheet 标签":L.key==="cellEditor"?"内容编辑区":L.key==="saveStatus"?"保存状态":"单元格名称框"]}),L.key==="sheetTab"&&h.sheetTab&&l.jsx("button",{className:"secondary",disabled:!m,onClick:()=>M("testSheet"),children:"重新检验 Sheet"}),L.key==="saveStatus"&&h.saveStatus&&l.jsx("button",{className:"secondary",onClick:()=>{const K={...h};delete K.saveStatus,d(K),D()},children:"移除保存状态"})]},L.key))}),l.jsxs("div",{className:"tencent-site-instructions",children:[l.jsx("strong",{children:Il.some(L=>L.key===g)?"正在等待网页点选":g==="testSheet"?"正在检验 Sheet":"控件录制模式"}),l.jsx("p",{children:"先点击“录制 Sheet 标签”，再在文档中点选任意一个标签。程序会立即独立检验集合、本月匹配和选中状态，通过后再录制其他控件。按 Esc 取消点选。"}),l.jsx("p",{children:"录制点击只记录位置。检验时，本月已选中则不重复点击，否则仅切换到本月；不定位单元格或填写数据。登录提示自动发现，无需录制。"}),R&&l.jsxs("div",{className:`notice tencent-sheet-check ${R.passed?"info":"error"}`,role:R.passed?"status":"alert",children:[l.jsx("strong",{children:R.passed?"Sheet 检验通过":"Sheet 检验未通过"}),l.jsx("ol",{className:"tencent-site-results",children:(z=R.steps)==null?void 0:z.map(L=>l.jsxs("li",{children:[l.jsx("strong",{children:L.label}),l.jsx("span",{children:L.detail}),L.names&&l.jsxs("details",{children:[l.jsx("summary",{children:"查看全部 Sheet 名称"}),l.jsx("ul",{children:L.names.map((K,ce)=>l.jsx("li",{children:K},`${ce}:${K}`))})]})]},L.label))}),!R.passed&&l.jsx("p",{children:R.message})]}),(R==null?void 0:R.passed)&&l.jsxs("div",{className:"tencent-sheet-guidance tencent-test-cell",role:"status",children:[l.jsx("strong",{children:B?`临时测试格：${B.sheet}!${B.address}`:"请选择一个可编辑的空白格"}),l.jsx("p",{children:B?"此地址只用于本次控件检验，不保存为业务填写位置。若要更换，请先在表格中选另一个空白格，再读取当前测试格。":"在当前工作表中任选一个可编辑的空白格，不要求属于今天。然后录制名称框，程序会读取它的地址；已有名称框可直接读取。"}),l.jsx("button",{className:"secondary",disabled:!m||!h.cellAddressBox,onClick:()=>M("captureCell"),children:"读取当前测试格"})]})]})]}),!!(k!=null&&k.length)&&l.jsx("ol",{className:"tencent-site-results",children:k.map(L=>l.jsxs("li",{children:[l.jsx("strong",{children:L.label}),l.jsx("span",{children:L.detail})]},L.label))}),l.jsx("p",{className:"tencent-sheet-help",children:"录制的是名称框和编辑区两个通用控件。检验时仅跳转到上方临时测试格，确认空白、可编辑且地址正确，不输入测试值。正式填写始终按业务规则计算目标位置。单元格检验失败保留 Sheet 结果；全部通过后统一保存。"}),l.jsx("p",{className:"tencent-sheet-help",children:"保存状态可单独补录，已有三个控件无需重录。录制后填写会等待保存状态稳定，再刷新回读；上次修改时间仅表示空闲，不能单独证明本次保存成功。未配置时沿用原确认方式。"}),l.jsxs("div",{className:"tencent-sheet-actions",children:[l.jsx("button",{className:"secondary",disabled:!m||!(R!=null&&R.passed)||!B||!h.cellAddressBox||!h.cellEditor,onClick:()=>M("test"),children:"检验单元格控件"}),l.jsx("button",{className:m?"primary":"secondary",disabled:!C,onClick:()=>M("save"),children:"保存网页控件"}),l.jsx("button",{className:"secondary",onClick:()=>{d(void 0),_(void 0),Y(void 0),u(!1),D(),b("")},children:"取消"})]})]})}):l.jsxs(l.Fragment,{children:[l.jsx("div",{className:"checklist",children:Il.map(L=>l.jsxs("div",{className:"check-item",children:[l.jsx("span",{className:`mark ${a!=null&&a[L.key]?"":"pending"}`,children:a!=null&&a[L.key]?"✓":"·"}),L.title.slice(2),l.jsx("span",{className:"tencent-control-state",children:a!=null&&a[L.key]?"已录制":L.key==="saveStatus"?"未配置":"待录制"})]},L.key))}),l.jsx("button",{className:"secondary",onClick:H,children:a?"重新录制网页控件":"录制网页控件"})]}),x&&l.jsx("div",{className:`notice ${j?"error":"info"}`,role:j?"alert":"status",children:x})]})}function dN({id:n,field:a,disabled:s,continueToTeaching:o=!1,onSave:u,onCancel:h}){const[d,m]=S.useState(a.notion??{sourceId:"",valueFieldId:"",queryMode:"date",dateFieldId:"",datasetId:"",period:"day"}),[p,g]=S.useState([]),[v,x]=S.useState([]),[b,j]=S.useState([]),[E,C]=S.useState(!1),[T,k]=S.useState(!1),[A,R]=S.useState("");S.useEffect(()=>{let M=!0;return fe("tencentSheet.sources",{id:n}).then(z=>{M&&g(z.sources)}).catch(z=>{M&&R(String(z))}),()=>{M=!1}},[n]),S.useEffect(()=>{let M=!0;if(x([]),R(""),C(!1),!!d.sourceId)return C(!0),fe("tencentSheet.schema",{id:n,sourceId:d.sourceId}).then(z=>{M&&x(z.fields)}).catch(z=>{M&&R(String(z))}).finally(()=>{M&&C(!1)}),()=>{M=!1}},[n,d.sourceId]),S.useEffect(()=>{let M=!0;if(j([]),k(!1),!(d.queryMode!=="view"||!d.sourceId))return k(!0),fe("tencentSheet.views",{id:n,sourceId:d.sourceId},12e4).then(z=>{M&&j(z.views)}).catch(z=>{M&&R(String(z))}).finally(()=>{M&&k(!1)}),()=>{M=!1}},[n,d.sourceId,d.queryMode]);const _=M=>M.map(z=>({value:z.id,label:z.name})),B=v.filter(M=>["number","formula","rollup"].includes(M.type??"")),Y=v.filter(M=>M.type==="date"),D=s||E||d.queryMode==="view"&&T,H=p.some(M=>M.id===d.sourceId)&&B.some(M=>M.id===d.valueFieldId)&&(d.queryMode==="date"?Y.some(M=>M.id===d.dateFieldId):b.some(M=>M.id===d.datasetId));return l.jsxs("fieldset",{className:"tencent-sheet-panel",disabled:s,children:[l.jsxs("legend",{children:["绑定 Notion：",a.name]}),l.jsx("p",{className:"tencent-sheet-help",children:"选择这个业务字段的数据来源，默认获取本次业务日期当天的数据；例如补填 8 月 31 日，就查询 8 月 31 日。保存后接着录制网页位置。"}),l.jsxs("label",{children:["Notion 数据库",l.jsx(ot,{value:d.sourceId,options:_(p),placeholder:"选择已有数据库",ariaLabel:"Notion 数据库",disabled:D,onChange:M=>m({...d,sourceId:M,valueFieldId:"",dateFieldId:"",datasetId:""})})]}),l.jsxs("label",{children:["取数方式",l.jsx(ot,{value:d.queryMode,options:[{value:"date",label:"按业务日期筛选后汇总"},{value:"view",label:"汇总指定 View 的筛选结果"}],placeholder:"选择取数方式",disabled:D,onChange:M=>{R(""),m({...d,queryMode:M})}})]}),l.jsxs("div",{className:"tencent-sheet-grid",children:[l.jsxs("label",{children:["数值字段",l.jsx(ot,{value:d.valueFieldId,options:_(B),placeholder:"选择要汇总的数值字段",disabled:D,onChange:M=>m({...d,valueFieldId:M})})]}),d.queryMode==="date"?l.jsxs("label",{children:["日期字段",l.jsx(ot,{value:d.dateFieldId,options:_(Y),placeholder:"选择用于筛选的日期字段",disabled:D,onChange:M=>m({...d,dateFieldId:M})})]}):l.jsxs("label",{children:["Notion View",l.jsx(ot,{value:d.datasetId,options:_(b),placeholder:"选择真实 View",disabled:D,onChange:M=>m({...d,datasetId:M})})]})]}),d.queryMode==="date"?l.jsxs("label",{children:["统计范围",l.jsx(ot,{value:d.period,options:[{value:"day",label:"业务日期当天"},{value:"month",label:"业务日期所在月月初至该日"},{value:"year",label:"业务日期所在年年初至该日"}],placeholder:"选择统计范围",disabled:D,onChange:M=>m({...d,period:M})})]}):l.jsx("p",{className:"tencent-sheet-help",children:"使用该 View 在 Notion 中的真实筛选结果，不额外添加日期条件。需要业务日期当天的数据，请使用按业务日期筛选。"}),(E||T)&&l.jsx("p",{role:"status",children:"正在读取数据库结构…"}),A&&l.jsx("p",{role:"alert",children:A}),l.jsxs("div",{className:"tencent-sheet-actions",children:[l.jsx("button",{className:"primary",disabled:D||!H,onClick:()=>{var M,z,L;return u({...d,sourceName:(M=p.find(K=>K.id===d.sourceId))==null?void 0:M.name,valueFieldName:(z=B.find(K=>K.id===d.valueFieldId))==null?void 0:z.name,datasetName:(L=b.find(K=>K.id===d.datasetId))==null?void 0:L.name})},children:o?"下一步 · 录制位置":"保存数据绑定"}),l.jsx("button",{className:"secondary",disabled:s,onClick:h,children:"稍后继续"})]})]})}const i0={weekdays:[1,2,3,4,5,6,0],times:["08:00"]},fN=["周日","周一","周二","周三","周四","周五","周六"];function hN({rule:n,schedule:a,disabled:s,onChange:o}){const[u,h]=S.useState(n.kind==="relative"&&![-1,0].includes(n.offsetDays)),d=n.kind==="fixed"?"fixed":u?"offset":n.offsetDays===0?"today":"previous";return l.jsxs("fieldset",{className:"card tencent-sheet-panel",disabled:s,children:[l.jsx("h2",{children:"执行频率与业务日期"}),l.jsx("p",{className:"tencent-sheet-help",children:"执行时间决定什么时候开始；业务日期决定取哪天的数据、选择哪个月份的工作表、填写哪个位置。以下规则可独立组合。"}),l.jsxs("div",{className:"tencent-sheet-grid",children:[l.jsxs("label",{children:["执行频率",l.jsxs("select",{value:a.weekdays.length===7?"daily":"weekly",disabled:s,onChange:m=>o(n,{...a,weekdays:m.target.value==="daily"?[...i0.weekdays]:[1,2,3,4,5]}),children:[l.jsx("option",{value:"daily",children:"每天"}),l.jsx("option",{value:"weekly",children:"指定星期"})]})]}),l.jsxs("label",{children:["业务日期",l.jsxs("select",{value:d,disabled:s,onChange:m=>{const p=m.target.value;h(p==="offset"),o(p==="fixed"?{kind:"fixed",date:""}:{kind:"relative",offsetDays:p==="today"?0:n.kind==="relative"&&p==="offset"?n.offsetDays:-1},a)},children:[l.jsx("option",{value:"previous",children:"执行当天的前一天"}),l.jsx("option",{value:"today",children:"执行当天"}),l.jsx("option",{value:"offset",children:"相对执行当天偏移 N 天"}),l.jsx("option",{value:"fixed",children:"指定固定日期"})]})]})]}),a.weekdays.length!==7&&l.jsx("div",{className:"tencent-sheet-actions",role:"group","aria-label":"执行星期",children:[1,2,3,4,5,6,0].map(m=>l.jsxs("label",{className:"tencent-sheet-date-mode",children:[l.jsx("input",{type:"checkbox",checked:a.weekdays.includes(m),onChange:p=>o(n,{...a,weekdays:p.target.checked?[...a.weekdays,m]:a.weekdays.filter(g=>g!==m)})}),fN[m]]},m))}),d==="offset"&&n.kind==="relative"&&l.jsxs("label",{children:["偏移天数（负数向前，正数向后）",l.jsx("input",{type:"number",min:"-3660",max:"3660",step:"1",value:Number.isFinite(n.offsetDays)?n.offsetDays:"",onChange:m=>o({kind:"relative",offsetDays:m.target.value===""?NaN:Number(m.target.value)},a)})]}),n.kind==="fixed"&&l.jsx(Kt,{label:"固定业务日期",value:n.date,onChange:m=>o({kind:"fixed",date:m},a),disabled:s}),l.jsx("div",{className:"divider"}),l.jsx("div",{className:"tencent-sheet-grid",children:a.times.map((m,p)=>l.jsxs("div",{children:[l.jsxs("label",{children:["执行时刻 ",p+1,"（北京时间）"]}),l.jsxs("div",{className:"tencent-sheet-actions",children:[l.jsx("input",{type:"time","aria-label":`执行时刻 ${p+1}（北京时间）`,value:m,onChange:g=>o(n,{...a,times:a.times.map((v,x)=>x===p?g.target.value:v)})}),l.jsxs("button",{className:"ghost",disabled:a.times.length===1,onClick:()=>o(n,{...a,times:a.times.filter((g,v)=>v!==p)}),children:["移除时刻 ",p+1]})]})]},p))}),l.jsx("button",{className:"secondary",disabled:a.times.length>=24,onClick:()=>{const m=Array.from({length:24},(p,g)=>`${String(g).padStart(2,"0")}:00`).find(p=>!a.times.includes(p));m&&o(n,{...a,times:[...a.times,m]})},children:"添加执行时刻"}),l.jsx("p",{className:"tencent-sheet-help",children:"保存规则不会自动启用定时。先完成前台或后台测试；当前配置后台测试通过后，可在任务列表启用定时。临时补填日期只影响本次测试。"})]})}var mN=Object.defineProperty,si=(n,a)=>mN(n,"name",{value:a,configurable:!0}),s0=!!(typeof window<"u"&&window.document&&window.document.createElement);function Cr(n,a,{checkForDefaultPrevented:s=!0}={}){return si(function(u){if(n==null||n(u),s===!1||!u||!u.defaultPrevented)return a==null?void 0:a(u)},"handleEvent")}si(Cr,"composeEventHandlers");function pN(n){var a;if(!s0)throw new Error("Cannot access window outside of the DOM");return((a=n==null?void 0:n.ownerDocument)==null?void 0:a.defaultView)??window}si(pN,"getOwnerWindow");function lf(n){if(!s0)throw new Error("Cannot access document outside of the DOM");return(n==null?void 0:n.ownerDocument)??document}si(lf,"getOwnerDocument");function l0(n,a=!1){const{activeElement:s}=lf(n);if(!(s!=null&&s.nodeName))return null;if(o0(s)&&s.contentDocument)return l0(s.contentDocument.body,a);if(a){const o=s.getAttribute("aria-activedescendant");if(o){const u=lf(s).getElementById(o);if(u)return u}}return s}si(l0,"getActiveElement");function o0(n){return n.tagName==="IFRAME"}si(o0,"isFrame");var gN=Object.defineProperty,nh=(n,a)=>gN(n,"name",{value:a,configurable:!0});function of(n,a){if(typeof n=="function")return n(a);n!=null&&(n.current=a)}nh(of,"setRef");function c0(...n){return a=>{let s=!1;const o=n.map(u=>{const h=of(u,a);return!s&&typeof h=="function"&&(s=!0),h});if(s)return()=>{for(let u=0;u<o.length;u++){const h=o[u];typeof h=="function"?h():of(n[u],null)}}}}nh(c0,"composeRefs");function li(...n){return S.useCallback(c0(...n),n)}nh(li,"useComposedRefs");var yN=Object.defineProperty,sn=(n,a)=>yN(n,"name",{value:a,configurable:!0});function vN(n,a){const s=S.createContext(a);s.displayName=n+"Context";const o=sn(h=>{const{children:d,...m}=h,p=S.useMemo(()=>m,Object.values(m));return l.jsx(s.Provider,{value:p,children:d})},"Provider");o.displayName=n+"Provider";function u(h,d={}){const{optional:m=!1}=d,p=S.useContext(s);if(p)return p;if(a!==void 0)return a;if(!m)throw new Error(`\`${h}\` must be used within \`${n}\``)}return sn(u,"useContext"),[o,u]}sn(vN,"createContext");function u0(n,a=[]){let s=[];function o(h,d){const m=S.createContext(d);m.displayName=h+"Context";const p=s.length;s=[...s,d];const g=sn(x=>{var k;const{scope:b,children:j,...E}=x,C=((k=b==null?void 0:b[n])==null?void 0:k[p])||m,T=S.useMemo(()=>E,Object.values(E));return l.jsx(C.Provider,{value:T,children:j})},"Provider");g.displayName=h+"Provider";function v(x,b,j={}){var k;const{optional:E=!1}=j,C=((k=b==null?void 0:b[n])==null?void 0:k[p])||m,T=S.useContext(C);if(T)return T;if(d!==void 0)return d;if(!E)throw new Error(`\`${x}\` must be used within \`${h}\``)}return sn(v,"useContext"),[g,v]}sn(o,"createContext");const u=sn(()=>{const h=s.map(d=>S.createContext(d));return sn(function(m){const p=(m==null?void 0:m[n])||h;return S.useMemo(()=>({[`__scope${n}`]:{...m,[n]:p}}),[m,p])},"useScope")},"createScope");return u.scopeName=n,[o,d0(u,...a)]}sn(u0,"createContextScope");function d0(...n){const a=n[0];if(n.length===1)return a;const s=sn(()=>{const o=n.map(u=>({useScope:u(),scopeName:u.scopeName}));return sn(function(h){const d=o.reduce((m,{useScope:p,scopeName:g})=>{const x=p(h)[`__scope${g}`];return{...m,...x}},{});return S.useMemo(()=>({[`__scope${a.scopeName}`]:d}),[d])},"useComposedScopes")},"createScope");return s.scopeName=a.scopeName,s}sn(d0,"composeContextScopes");var Ar=globalThis!=null&&globalThis.document?S.useLayoutEffect:()=>{},xN=Object.defineProperty,bN=(n,a)=>xN(n,"name",{value:a,configurable:!0}),SN=Es[" useId ".trim().toString()]||(()=>{}),jN=0;function yo(n){const[a,s]=S.useState(SN());return Ar(()=>{n||s(o=>o??String(jN++))},[n]),n||(a?`radix-${a}`:"")}bN(yo,"useId");var wN=Object.defineProperty,EN=(n,a)=>wN(n,"name",{value:a,configurable:!0}),Uv=Es[" useEffectEvent ".trim().toString()],Hv=Es[" useInsertionEffect ".trim().toString()];function f0(n){if(typeof Uv=="function")return Uv(n);const a=S.useRef(()=>{throw new Error("Cannot call an event handler while rendering.")});return typeof Hv=="function"?Hv(()=>{a.current=n}):Ar(()=>{a.current=n}),S.useMemo(()=>((...s)=>{var o;return(o=a.current)==null?void 0:o.call(a,...s)}),[])}EN(f0,"useEffectEvent");var TN=Object.defineProperty,As=(n,a)=>TN(n,"name",{value:a,configurable:!0}),CN=Es[" useInsertionEffect ".trim().toString()]||Ar;function h0({prop:n,defaultProp:a,onChange:s=As(()=>{},"onChange"),caller:o}){const[u,h,d]=m0({defaultProp:a,onChange:s}),m=n!==void 0,p=m?n:u,g=S.useCallback(v=>{var x;if(m){const b=p0(v)?v(n):v;b!==n&&((x=d.current)==null||x.call(d,b))}else h(v)},[m,n,h,d]);return[p,g]}As(h0,"useControllableState");function m0({defaultProp:n,onChange:a}){const[s,o]=S.useState(n),u=S.useRef(s),h=S.useRef(a);return CN(()=>{h.current=a},[a]),S.useEffect(()=>{var d;u.current!==s&&((d=h.current)==null||d.call(h,s),u.current=s)},[s,u]),[s,o,h]}As(m0,"useUncontrolledState");function p0(n){return typeof n=="function"}As(p0,"isFunction");var qv=Symbol("RADIX:SYNC_STATE");function NN(n,a,s,o){const{prop:u,defaultProp:h,onChange:d,caller:m}=a,p=u!==void 0,g=f0(d),v=[{...s,state:h}];o&&v.push(o);const[x,b]=S.useReducer((T,k)=>{if(k.type===qv)return{...T,state:k.state};const A=n(T,k);return p&&!Object.is(A.state,T.state)&&g(A.state),A},...v),j=x.state,E=S.useRef(j);S.useEffect(()=>{E.current!==j&&(E.current=j,p||g(j))},[j,E,p]);const C=S.useMemo(()=>u!==void 0?{...x,state:u}:x,[x,u]);return S.useEffect(()=>{p&&!Object.is(u,x.state)&&b({type:qv,state:u})},[u,x.state,p]),[C,b]}As(NN,"useControllableStateReducer");var DN=Object.defineProperty,vn=(n,a)=>DN(n,"name",{value:a,configurable:!0});function rh(n){const a=S.forwardRef((s,o)=>{let{children:u,...h}=s,d=null,m=!1;const p=[];cf(u)&&typeof eo=="function"&&(u=eo(u._payload)),S.Children.forEach(u,b=>{var j;if(x0(b)){m=!0;const E=b;let C="child"in E.props?E.props.child:E.props.children;cf(C)&&typeof eo=="function"&&(C=eo(C._payload)),d=kN(E,C),p.push((j=d==null?void 0:d.props)==null?void 0:j.children)}else p.push(b)}),d?d=S.cloneElement(d,void 0,p):!m&&S.Children.count(u)===1&&S.isValidElement(u)&&(d=u);const g=d?v0(d):void 0,v=li(o,g);if(!d){if(u||u===0)throw new Error(m?ON(n):RN(n));return u}const x=y0(h,d.props??{});return d.type!==S.Fragment&&(x.ref=o?v:g),S.cloneElement(d,x)});return a.displayName=`${n}.Slot`,a}vn(rh,"createSlot");var g0=Symbol.for("radix.slottable");function AN(n){const a=vn(s=>"child"in s?s.children(s.child):s.children,"Slottable");return a.displayName=`${n}.Slottable`,a.__radixId=g0,a}vn(AN,"createSlottable");var kN=vn((n,a)=>{if("child"in n.props){const s=n.props.child;return S.isValidElement(s)?S.cloneElement(s,void 0,n.props.children(s.props.children)):null}return S.isValidElement(a)?a:null},"getSlottableElementFromSlottable");function y0(n,a){const s={...a};for(const o in a){const u=n[o],h=a[o];/^on[A-Z]/.test(o)?u&&h?s[o]=(...m)=>{const p=h(...m);return u(...m),p}:u&&(s[o]=u):o==="style"?s[o]={...u,...h}:o==="className"&&(s[o]=[u,h].filter(Boolean).join(" "))}return{...n,...s}}vn(y0,"mergeProps");function v0(n){var o,u;let a=(o=Object.getOwnPropertyDescriptor(n.props,"ref"))==null?void 0:o.get,s=a&&"isReactWarning"in a&&a.isReactWarning;return s?n.ref:(a=(u=Object.getOwnPropertyDescriptor(n,"ref"))==null?void 0:u.get,s=a&&"isReactWarning"in a&&a.isReactWarning,s?n.props.ref:n.props.ref||n.ref)}vn(v0,"getElementRef");function x0(n){return S.isValidElement(n)&&typeof n.type=="function"&&"__radixId"in n.type&&n.type.__radixId===g0}vn(x0,"isSlottable");var MN=Symbol.for("react.lazy");function cf(n){return n!=null&&typeof n=="object"&&"$$typeof"in n&&n.$$typeof===MN&&"_payload"in n&&b0(n._payload)}vn(cf,"isLazyComponent");function b0(n){return typeof n=="object"&&n!==null&&"then"in n}vn(b0,"isPromiseLike");var RN=vn(n=>`${n} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`,"createSlotError"),ON=vn(n=>`${n} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`,"createSlottableError"),eo=Es[" use ".trim().toString()],zN=Object.defineProperty,_N=(n,a)=>zN(n,"name",{value:a,configurable:!0}),VN=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],aa=VN.reduce((n,a)=>{const s=rh(`Primitive.${a}`),o=S.forwardRef((u,h)=>{const{asChild:d,...m}=u,p=d?s:a;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),l.jsx(p,{...m,ref:h})});return o.displayName=`Primitive.${a}`,{...n,[a]:o}},{});function S0(n,a){n&&th.flushSync(()=>n.dispatchEvent(a))}_N(S0,"dispatchDiscreteCustomEvent");var BN=Object.defineProperty,LN=(n,a)=>BN(n,"name",{value:a,configurable:!0});function ti(n){const a=S.useRef(n);return S.useEffect(()=>{a.current=n}),S.useMemo(()=>((...s)=>{var o;return(o=a.current)==null?void 0:o.call(a,...s)}),[])}LN(ti,"useCallbackRef");var UN=Object.defineProperty,mt=(n,a)=>UN(n,"name",{value:a,configurable:!0}),uf="dismissableLayer.update",HN="dismissableLayer.pointerDownOutside",qN="dismissableLayer.focusOutside",Yv,j0=S.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set,dismissableSurfaces:new Set}),YN=S.forwardRef(mt(function(a,s){const{disableOutsidePointerEvents:o=!1,deferPointerDownOutside:u=!1,onEscapeKeyDown:h,onPointerDownOutside:d,onFocusOutside:m,onInteractOutside:p,onDismiss:g,...v}=a,x=S.useContext(j0),[b,j]=S.useState(null),E=(b==null?void 0:b.ownerDocument)??(globalThis==null?void 0:globalThis.document),[,C]=S.useState({}),T=li(s,j),k=Array.from(x.layers),[A]=[...x.layersWithOutsidePointerEventsDisabled].slice(-1),R=A?k.indexOf(A):-1,_=b?k.indexOf(b):-1,B=x.layersWithOutsidePointerEventsDisabled.size>0,Y=_>=R,D=S.useRef(!1),H=E0(K=>{d==null||d(K),p==null||p(K),K.defaultPrevented||g==null||g()},{ownerDocument:E,deferPointerDownOutside:u,isDeferredPointerDownOutsideRef:D,dismissableSurfaces:x.dismissableSurfaces,shouldHandlePointerDownOutside:S.useCallback(K=>{if(!(K instanceof Node))return!1;const ce=[...x.branches].some(se=>se.contains(K));return Y&&!ce},[x.branches,Y])}),M=T0(K=>{if(u&&D.current)return;const ce=K.target;[...x.branches].some(ye=>ye.contains(ce))||(m==null||m(K),p==null||p(K),K.defaultPrevented||g==null||g())},E),z=b?_===k.length-1:!1,L=ti(K=>{K.key==="Escape"&&(h==null||h(K),!K.defaultPrevented&&g&&(K.preventDefault(),g()))});return S.useEffect(()=>{if(z)return E.addEventListener("keydown",L,{capture:!0}),()=>E.removeEventListener("keydown",L,{capture:!0})},[E,z,L]),S.useEffect(()=>{if(b)return o&&(x.layersWithOutsidePointerEventsDisabled.size===0&&(Yv=E.body.style.pointerEvents,E.body.style.pointerEvents="none"),x.layersWithOutsidePointerEventsDisabled.add(b)),x.layers.add(b),df(),()=>{o&&(x.layersWithOutsidePointerEventsDisabled.delete(b),x.layersWithOutsidePointerEventsDisabled.size===0&&(E.body.style.pointerEvents=Yv))}},[b,E,o,x]),S.useEffect(()=>()=>{b&&(x.layers.delete(b),x.layersWithOutsidePointerEventsDisabled.delete(b),df())},[b,x]),S.useEffect(()=>{const K=mt(()=>C({}),"handleUpdate");return document.addEventListener(uf,K),()=>document.removeEventListener(uf,K)},[]),l.jsx(aa.div,{...v,ref:T,style:{pointerEvents:B?Y?"auto":"none":void 0,...a.style},onFocusCapture:Cr(a.onFocusCapture,M.onFocusCapture),onBlurCapture:Cr(a.onBlurCapture,M.onBlurCapture),onPointerDownCapture:Cr(a.onPointerDownCapture,H.onPointerDownCapture)})},"DismissableLayer"));function w0(){const n=S.useContext(j0),[a,s]=S.useState(null);return S.useEffect(()=>{if(a)return n.dismissableSurfaces.add(a),()=>{n.dismissableSurfaces.delete(a)}},[a,n.dismissableSurfaces]),s}mt(w0,"useDismissableLayerSurface");var PN=mt(()=>!0,"IS_TRUE");function E0(n,a){const{ownerDocument:s=globalThis==null?void 0:globalThis.document,deferPointerDownOutside:o=!1,isDeferredPointerDownOutsideRef:u,dismissableSurfaces:h,shouldHandlePointerDownOutside:d=PN}=a,m=ti(n),p=S.useRef(!1),g=S.useRef(!1),v=S.useRef(new Map),x=S.useRef(()=>{});return S.useEffect(()=>{function b(){g.current=!1,u.current=!1,v.current.clear()}mt(b,"resetOutsideInteraction");function j(){return Array.from(v.current.values()).some(Boolean)}mt(j,"isOutsideInteractionIntercepted");function E(R){if(!g.current)return;const _=R.target;_ instanceof Node&&[...h].some(Y=>Y.contains(_))||v.current.set(R.type,!0),R.type==="click"&&window.setTimeout(()=>{g.current&&x.current()},0)}mt(E,"handleInteractionCapture");function C(R){g.current&&v.current.set(R.type,!1)}mt(C,"handleInteractionBubble");const T=mt(R=>{if(R.target&&!p.current){let _=function(){s.removeEventListener("click",x.current);const Y=j();b(),Y||ah(HN,m,B,{discrete:!0})};if(mt(_,"handleAndDispatchPointerDownOutsideEvent"),!d(R.target)){s.removeEventListener("click",x.current),b(),p.current=!1;return}const B={originalEvent:R};g.current=!0,u.current=o&&R.button===0,v.current.clear(),!o||R.button!==0?_():(s.removeEventListener("click",x.current),x.current=_,s.addEventListener("click",x.current,{once:!0}))}else s.removeEventListener("click",x.current),b();p.current=!1},"handlePointerDown"),k=["pointerup","mousedown","mouseup","touchstart","touchend","click"];for(const R of k)s.addEventListener(R,E,!0),s.addEventListener(R,C);const A=window.setTimeout(()=>{s.addEventListener("pointerdown",T)},0);return()=>{window.clearTimeout(A),s.removeEventListener("pointerdown",T),s.removeEventListener("click",x.current);for(const R of k)s.removeEventListener(R,E,!0),s.removeEventListener(R,C)}},[s,m,o,u,h,d]),{onPointerDownCapture:mt(()=>p.current=!0,"onPointerDownCapture")}}mt(E0,"usePointerDownOutside");function T0(n,a=globalThis==null?void 0:globalThis.document){const s=ti(n),o=S.useRef(!1);return S.useEffect(()=>{const u=mt(h=>{h.target&&!o.current&&ah(qN,s,{originalEvent:h},{discrete:!1})},"handleFocus");return a.addEventListener("focusin",u),()=>a.removeEventListener("focusin",u)},[a,s]),{onFocusCapture:mt(()=>o.current=!0,"onFocusCapture"),onBlurCapture:mt(()=>o.current=!1,"onBlurCapture")}}mt(T0,"useFocusOutside");function df(){const n=new CustomEvent(uf);document.dispatchEvent(n)}mt(df,"dispatchUpdate");function ah(n,a,s,{discrete:o}){const u=s.originalEvent.target,h=new CustomEvent(n,{bubbles:!1,cancelable:!0,detail:s});a&&u.addEventListener(n,a,{once:!0}),o?S0(u,h):u.dispatchEvent(h)}mt(ah,"handleAndDispatchCustomEvent");var GN=Object.defineProperty,At=(n,a)=>GN(n,"name",{value:a,configurable:!0}),Ed="focusScope.autoFocusOnMount",Td="focusScope.autoFocusOnUnmount",Pv={bubbles:!1,cancelable:!0},FN=S.forwardRef(At(function(a,s){const{loop:o=!1,trapped:u=!1,onMountAutoFocus:h,onUnmountAutoFocus:d,...m}=a,[p,g]=S.useState(null),v=ti(h),x=ti(d),b=S.useRef(null),j=li(s,g),E=S.useRef({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;S.useEffect(()=>{if(u){let T=function(_){if(E.paused||!p)return;const B=_.target;p.contains(B)?b.current=B:Zn(b.current,{select:!0})},k=function(_){if(E.paused||!p)return;const B=_.relatedTarget;B!==null&&(p.contains(B)||Zn(b.current,{select:!0}))},A=function(_){if(document.activeElement===document.body)for(const Y of _)Y.removedNodes.length>0&&Zn(p)};At(T,"handleFocusIn"),At(k,"handleFocusOut"),At(A,"handleMutations"),document.addEventListener("focusin",T),document.addEventListener("focusout",k);const R=new MutationObserver(A);return p&&R.observe(p,{childList:!0,subtree:!0}),()=>{document.removeEventListener("focusin",T),document.removeEventListener("focusout",k),R.disconnect()}}},[u,p,E.paused]),S.useEffect(()=>{if(p){Gv.add(E);const T=document.activeElement;if(!p.contains(T)){const A=new CustomEvent(Ed,Pv);p.addEventListener(Ed,v),p.dispatchEvent(A),A.defaultPrevented||(C0(M0(ih(p)),{select:!0}),document.activeElement===T&&Zn(p))}return()=>{p.removeEventListener(Ed,v),setTimeout(()=>{const A=new CustomEvent(Td,Pv);p.addEventListener(Td,x),p.dispatchEvent(A),A.defaultPrevented||Zn(T??document.body,{select:!0}),p.removeEventListener(Td,x),Gv.remove(E)},0)}}},[p,v,x,E]);const C=S.useCallback(T=>{if(!o&&!u||E.paused)return;const k=T.key==="Tab"&&!T.altKey&&!T.ctrlKey&&!T.metaKey,A=document.activeElement;if(k&&A){const R=T.currentTarget,[_,B]=N0(R);_&&B?!T.shiftKey&&A===B?(T.preventDefault(),o&&Zn(_,{select:!0})):T.shiftKey&&A===_&&(T.preventDefault(),o&&Zn(B,{select:!0})):A===R&&T.preventDefault()}},[o,u,E.paused]);return l.jsx(aa.div,{tabIndex:-1,...m,ref:j,onKeyDown:C})},"FocusScope"));function C0(n,{select:a=!1}={}){const s=document.activeElement;for(const o of n)if(Zn(o,{select:a}),document.activeElement!==s)return}At(C0,"focusFirst");function N0(n){const a=ih(n),s=ff(a,n),o=ff(a.reverse(),n);return[s,o]}At(N0,"getTabbableEdges");function ih(n){const a=[],s=document.createTreeWalker(n,NodeFilter.SHOW_ELEMENT,{acceptNode:At(o=>{const u=o.tagName==="INPUT"&&o.type==="hidden";return o.disabled||o.hidden||u?NodeFilter.FILTER_SKIP:o.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP},"acceptNode")});for(;s.nextNode();)a.push(s.currentNode);return a}At(ih,"getTabbableCandidates");function ff(n,a){const s=typeof a.checkVisibility=="function"&&a.checkVisibility({checkVisibilityCSS:!0});for(const o of n)if(!(s?!o.checkVisibility({checkVisibilityCSS:!0}):D0(o,{upTo:a})))return o}At(ff,"findVisible");function D0(n,{upTo:a}){if(getComputedStyle(n).visibility==="hidden")return!0;for(;n;){if(a!==void 0&&n===a)return!1;if(getComputedStyle(n).display==="none")return!0;n=n.parentElement}return!1}At(D0,"isHidden");function A0(n){return n instanceof HTMLInputElement&&"select"in n}At(A0,"isSelectableInput");function Zn(n,{select:a=!1}={}){if(n&&n.focus){const s=document.activeElement;n.focus({preventScroll:!0}),n!==s&&A0(n)&&a&&n.select()}}At(Zn,"focus");var Gv=k0();function k0(){let n=[];return{add(a){const s=n[0];a!==s&&(s==null||s.pause()),n=hf(n,a),n.unshift(a)},remove(a){var s;n=hf(n,a),(s=n[0])==null||s.resume()}}}At(k0,"createFocusScopesStack");function hf(n,a){const s=[...n],o=s.indexOf(a);return o!==-1&&s.splice(o,1),s}At(hf,"arrayRemove");function M0(n){return n.filter(a=>a.tagName!=="A")}At(M0,"removeLinks");var $N=Object.defineProperty,XN=(n,a)=>$N(n,"name",{value:a,configurable:!0}),KN=S.forwardRef(XN(function(a,s){var p;const{container:o,...u}=a,[h,d]=S.useState(!1);Ar(()=>d(!0),[]);const m=o||h&&((p=globalThis==null?void 0:globalThis.document)==null?void 0:p.body);return m?th.createPortal(l.jsx(aa.div,{...u,ref:s}),m):null},"Portal")),ZN=Object.defineProperty,Qn=(n,a)=>ZN(n,"name",{value:a,configurable:!0});function R0(n,a){return S.useReducer((s,o)=>a[s][o]??s,n)}Qn(R0,"useStateMachine");var sh=Qn(n=>{const{present:a,children:s}=n,o=O0(a),u=typeof s=="function"?s({present:o.isPresent}):S.Children.only(s),h=z0(o.ref,_0(u));return typeof s=="function"||o.isPresent?S.cloneElement(u,{ref:h}):null},"Presence");function O0(n){const[a,s]=S.useState(),o=S.useRef(null),u=S.useRef(n),h=S.useRef("none"),d=S.useRef(void 0),m=n?"mounted":"unmounted",[p,g]=R0(m,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return S.useEffect(()=>{p==="mounted"?(h.current=d.current??Ka(o.current),d.current=void 0):h.current="none"},[p]),Ar(()=>{const v=o.current,x=u.current;if(x!==n){const j=h.current,E=Ka(v);n?(d.current=E,g("MOUNT")):E==="none"||(v==null?void 0:v.display)==="none"?g("UNMOUNT"):g(x&&j!==E?"ANIMATION_OUT":"UNMOUNT"),u.current=n}},[n,g]),Ar(()=>{if(a){let v;const x=a.ownerDocument.defaultView??window,b=Qn(E=>{const T=Ka(o.current).includes(CSS.escape(E.animationName));if(E.target===a&&T&&(g("ANIMATION_END"),!u.current)){const k=a.style.animationFillMode;a.style.animationFillMode="forwards",v=x.setTimeout(()=>{a.style.animationFillMode==="forwards"&&(a.style.animationFillMode=k)})}},"handleAnimationEnd"),j=Qn(E=>{E.target===a&&(h.current=Ka(o.current))},"handleAnimationStart");return a.addEventListener("animationstart",j),a.addEventListener("animationcancel",b),a.addEventListener("animationend",b),()=>{x.clearTimeout(v),a.removeEventListener("animationstart",j),a.removeEventListener("animationcancel",b),a.removeEventListener("animationend",b)}}else g("ANIMATION_END")},[a,g]),{isPresent:["mounted","unmountSuspended"].includes(p),ref:S.useCallback(v=>{if(v){const x=getComputedStyle(v);o.current=x,d.current=Ka(x)}else o.current=null;s(v)},[])}}Qn(O0,"usePresence");function mf(n,a){if(typeof n=="function")return n(a);n!=null&&(n.current=a)}Qn(mf,"setRef");function z0(...n){const a=S.useRef(n);return a.current=n,S.useCallback(s=>{const o=a.current;let u=!1;const h=o.map(d=>{const m=mf(d,s);return!u&&typeof m=="function"&&(u=!0),m});if(u)return()=>{for(let d=0;d<h.length;d++){const m=h[d];typeof m=="function"?m():mf(o[d],null)}}},[])}Qn(z0,"useStableComposedRefs");function Ka(n){return(n==null?void 0:n.animationName)||"none"}Qn(Ka,"getAnimationName");function _0(n){var o,u;let a=(o=Object.getOwnPropertyDescriptor(n.props,"ref"))==null?void 0:o.get,s=a&&"isReactWarning"in a&&a.isReactWarning;return s?n.ref:(a=(u=Object.getOwnPropertyDescriptor(n,"ref"))==null?void 0:u.get,s=a&&"isReactWarning"in a&&a.isReactWarning,s?n.props.ref:n.props.ref||n.ref)}Qn(_0,"getElementRef");var QN=Object.defineProperty,lh=(n,a)=>QN(n,"name",{value:a,configurable:!0}),to=0,wn=null;function JN(n){return oh(),n.children}lh(JN,"FocusGuards");function oh(){S.useEffect(()=>{wn||(wn={start:pf(),end:pf()});const{start:n,end:a}=wn;return document.body.firstElementChild!==n&&document.body.insertAdjacentElement("afterbegin",n),document.body.lastElementChild!==a&&document.body.insertAdjacentElement("beforeend",a),to++,()=>{to===1&&(wn==null||wn.start.remove(),wn==null||wn.end.remove(),wn=null),to=Math.max(0,to-1)}},[])}lh(oh,"useFocusGuards");function pf(){const n=document.createElement("span");return n.setAttribute("data-radix-focus-guard",""),n.tabIndex=0,n.style.outline="none",n.style.opacity="0",n.style.position="fixed",n.style.pointerEvents="none",n}lh(pf,"createFocusGuard");var Cn=function(){return Cn=Object.assign||function(a){for(var s,o=1,u=arguments.length;o<u;o++){s=arguments[o];for(var h in s)Object.prototype.hasOwnProperty.call(s,h)&&(a[h]=s[h])}return a},Cn.apply(this,arguments)};function V0(n,a){var s={};for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&a.indexOf(o)<0&&(s[o]=n[o]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var u=0,o=Object.getOwnPropertySymbols(n);u<o.length;u++)a.indexOf(o[u])<0&&Object.prototype.propertyIsEnumerable.call(n,o[u])&&(s[o[u]]=n[o[u]]);return s}function WN(n,a,s){if(s||arguments.length===2)for(var o=0,u=a.length,h;o<u;o++)(h||!(o in a))&&(h||(h=Array.prototype.slice.call(a,0,o)),h[o]=a[o]);return n.concat(h||Array.prototype.slice.call(a))}var vo="right-scroll-bar-position",xo="width-before-scroll-bar",IN="with-scroll-bars-hidden",eD="--removed-body-scroll-bar-size";function Cd(n,a){return typeof n=="function"?n(a):n&&(n.current=a),n}function tD(n,a){var s=S.useState(function(){return{value:n,callback:a,facade:{get current(){return s.value},set current(o){var u=s.value;u!==o&&(s.value=o,s.callback(o,u))}}}})[0];return s.callback=a,s.facade}var nD=typeof window<"u"?S.useLayoutEffect:S.useEffect,Fv=new WeakMap;function rD(n,a){var s=tD(null,function(o){return n.forEach(function(u){return Cd(u,o)})});return nD(function(){var o=Fv.get(s);if(o){var u=new Set(o),h=new Set(n),d=s.current;u.forEach(function(m){h.has(m)||Cd(m,null)}),h.forEach(function(m){u.has(m)||Cd(m,d)})}Fv.set(s,n)},[n]),s}function aD(n){return n}function iD(n,a){a===void 0&&(a=aD);var s=[],o=!1,u={read:function(){if(o)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return s.length?s[s.length-1]:n},useMedium:function(h){var d=a(h,o);return s.push(d),function(){s=s.filter(function(m){return m!==d})}},assignSyncMedium:function(h){for(o=!0;s.length;){var d=s;s=[],d.forEach(h)}s={push:function(m){return h(m)},filter:function(){return s}}},assignMedium:function(h){o=!0;var d=[];if(s.length){var m=s;s=[],m.forEach(h),d=s}var p=function(){var v=d;d=[],v.forEach(h)},g=function(){return Promise.resolve().then(p)};g(),s={push:function(v){d.push(v),g()},filter:function(v){return d=d.filter(v),s}}}};return u}function sD(n){n===void 0&&(n={});var a=iD(null);return a.options=Cn({async:!0,ssr:!1},n),a}var B0=function(n){var a=n.sideCar,s=V0(n,["sideCar"]);if(!a)throw new Error("Sidecar: please provide `sideCar` property to import the right car");var o=a.read();if(!o)throw new Error("Sidecar medium not found");return S.createElement(o,Cn({},s))};B0.isSideCarExport=!0;function lD(n,a){return n.useMedium(a),B0}var L0=sD(),Nd=function(){},Yo=S.forwardRef(function(n,a){var s=S.useRef(null),o=S.useState({onScrollCapture:Nd,onWheelCapture:Nd,onTouchMoveCapture:Nd}),u=o[0],h=o[1],d=n.forwardProps,m=n.children,p=n.className,g=n.removeScrollBar,v=n.enabled,x=n.shards,b=n.sideCar,j=n.noRelative,E=n.noIsolation,C=n.inert,T=n.allowPinchZoom,k=n.as,A=k===void 0?"div":k,R=n.gapMode,_=V0(n,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noRelative","noIsolation","inert","allowPinchZoom","as","gapMode"]),B=b,Y=rD([s,a]),D=Cn(Cn({},_),u);return S.createElement(S.Fragment,null,v&&S.createElement(B,{sideCar:L0,removeScrollBar:g,shards:x,noRelative:j,noIsolation:E,inert:C,setCallbacks:h,allowPinchZoom:!!T,lockRef:s,gapMode:R}),d?S.cloneElement(S.Children.only(m),Cn(Cn({},D),{ref:Y})):S.createElement(A,Cn({},D,{className:p,ref:Y}),m))});Yo.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};Yo.classNames={fullWidth:xo,zeroRight:vo};var oD=function(){if(typeof __webpack_nonce__<"u")return __webpack_nonce__};function cD(){if(!document)return null;var n=document.createElement("style");n.type="text/css";var a=oD();return a&&n.setAttribute("nonce",a),n}function uD(n,a){n.styleSheet?n.styleSheet.cssText=a:n.appendChild(document.createTextNode(a))}function dD(n){var a=document.head||document.getElementsByTagName("head")[0];a.appendChild(n)}var fD=function(){var n=0,a=null;return{add:function(s){n==0&&(a=cD())&&(uD(a,s),dD(a)),n++},remove:function(){n--,!n&&a&&(a.parentNode&&a.parentNode.removeChild(a),a=null)}}},hD=function(){var n=fD();return function(a,s){S.useEffect(function(){return n.add(a),function(){n.remove()}},[a&&s])}},U0=function(){var n=hD(),a=function(s){var o=s.styles,u=s.dynamic;return n(o,u),null};return a},mD={left:0,top:0,right:0,gap:0},Dd=function(n){return parseInt(n||"",10)||0},pD=function(n){var a=window.getComputedStyle(document.body),s=a[n==="padding"?"paddingLeft":"marginLeft"],o=a[n==="padding"?"paddingTop":"marginTop"],u=a[n==="padding"?"paddingRight":"marginRight"];return[Dd(s),Dd(o),Dd(u)]},gD=function(n){if(n===void 0&&(n="margin"),typeof window>"u")return mD;var a=pD(n),s=document.documentElement.clientWidth,o=window.innerWidth;return{left:a[0],top:a[1],right:a[2],gap:Math.max(0,o-s+a[2]-a[0])}},yD=U0(),Wa="data-scroll-locked",vD=function(n,a,s,o){var u=n.left,h=n.top,d=n.right,m=n.gap;return s===void 0&&(s="margin"),`
  .`.concat(IN,` {
   overflow: hidden `).concat(o,`;
   padding-right: `).concat(m,"px ").concat(o,`;
  }
  body[`).concat(Wa,`] {
    overflow: hidden `).concat(o,`;
    overscroll-behavior: contain;
    `).concat([a&&"position: relative ".concat(o,";"),s==="margin"&&`
    padding-left: `.concat(u,`px;
    padding-top: `).concat(h,`px;
    padding-right: `).concat(d,`px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(m,"px ").concat(o,`;
    `),s==="padding"&&"padding-right: ".concat(m,"px ").concat(o,";")].filter(Boolean).join(""),`
  }
  
  .`).concat(vo,` {
    right: `).concat(m,"px ").concat(o,`;
  }
  
  .`).concat(xo,` {
    margin-right: `).concat(m,"px ").concat(o,`;
  }
  
  .`).concat(vo," .").concat(vo,` {
    right: 0 `).concat(o,`;
  }
  
  .`).concat(xo," .").concat(xo,` {
    margin-right: 0 `).concat(o,`;
  }
  
  body[`).concat(Wa,`] {
    `).concat(eD,": ").concat(m,`px;
  }
`)},$v=function(){var n=parseInt(document.body.getAttribute(Wa)||"0",10);return isFinite(n)?n:0},xD=function(){S.useEffect(function(){return document.body.setAttribute(Wa,($v()+1).toString()),function(){var n=$v()-1;n<=0?document.body.removeAttribute(Wa):document.body.setAttribute(Wa,n.toString())}},[])},bD=function(n){var a=n.noRelative,s=n.noImportant,o=n.gapMode,u=o===void 0?"margin":o;xD();var h=S.useMemo(function(){return gD(u)},[u]);return S.createElement(yD,{styles:vD(h,!a,u,s?"":"!important")})},gf=!1;if(typeof window<"u")try{var no=Object.defineProperty({},"passive",{get:function(){return gf=!0,!0}});window.addEventListener("test",no,no),window.removeEventListener("test",no,no)}catch{gf=!1}var Ga=gf?{passive:!1}:!1,SD=function(n){return n.tagName==="TEXTAREA"},H0=function(n,a){if(!(n instanceof Element))return!1;var s=window.getComputedStyle(n);return s[a]!=="hidden"&&!(s.overflowY===s.overflowX&&!SD(n)&&s[a]==="visible")},jD=function(n){return H0(n,"overflowY")},wD=function(n){return H0(n,"overflowX")},Xv=function(n,a){var s=a.ownerDocument,o=a;do{typeof ShadowRoot<"u"&&o instanceof ShadowRoot&&(o=o.host);var u=q0(n,o);if(u){var h=Y0(n,o),d=h[1],m=h[2];if(d>m)return!0}o=o.parentNode}while(o&&o!==s.body);return!1},ED=function(n){var a=n.scrollTop,s=n.scrollHeight,o=n.clientHeight;return[a,s,o]},TD=function(n){var a=n.scrollLeft,s=n.scrollWidth,o=n.clientWidth;return[a,s,o]},q0=function(n,a){return n==="v"?jD(a):wD(a)},Y0=function(n,a){return n==="v"?ED(a):TD(a)},CD=function(n,a){return n==="h"&&a==="rtl"?-1:1},ND=function(n,a,s,o,u){var h=CD(n,window.getComputedStyle(a).direction),d=h*o,m=s.target,p=a.contains(m),g=!1,v=d>0,x=0,b=0;do{if(!m)break;var j=Y0(n,m),E=j[0],C=j[1],T=j[2],k=C-T-h*E;(E||k)&&q0(n,m)&&(x+=k,b+=E);var A=m.parentNode;m=A&&A.nodeType===Node.DOCUMENT_FRAGMENT_NODE?A.host:A}while(!p&&m!==document.body||p&&(a.contains(m)||a===m));return(v&&Math.abs(x)<1||!v&&Math.abs(b)<1)&&(g=!0),g},ro=function(n){return"changedTouches"in n?[n.changedTouches[0].clientX,n.changedTouches[0].clientY]:[0,0]},Kv=function(n){return[n.deltaX,n.deltaY]},Zv=function(n){return n&&"current"in n?n.current:n},DD=function(n,a){return n[0]===a[0]&&n[1]===a[1]},AD=function(n){return`
  .block-interactivity-`.concat(n,` {pointer-events: none;}
  .allow-interactivity-`).concat(n,` {pointer-events: all;}
`)},kD=0,Fa=[];function MD(n){var a=S.useRef([]),s=S.useRef([0,0]),o=S.useRef(),u=S.useState(kD++)[0],h=S.useState(U0)[0],d=S.useRef(n);S.useEffect(function(){d.current=n},[n]),S.useEffect(function(){if(n.inert){document.body.classList.add("block-interactivity-".concat(u));var C=WN([n.lockRef.current],(n.shards||[]).map(Zv),!0).filter(Boolean);return C.forEach(function(T){return T.classList.add("allow-interactivity-".concat(u))}),function(){document.body.classList.remove("block-interactivity-".concat(u)),C.forEach(function(T){return T.classList.remove("allow-interactivity-".concat(u))})}}},[n.inert,n.lockRef.current,n.shards]);var m=S.useCallback(function(C,T){if("touches"in C&&C.touches.length===2||C.type==="wheel"&&C.ctrlKey)return!d.current.allowPinchZoom;var k=ro(C),A=s.current,R="deltaX"in C?C.deltaX:A[0]-k[0],_="deltaY"in C?C.deltaY:A[1]-k[1],B,Y=C.target,D=Math.abs(R)>Math.abs(_)?"h":"v";if("touches"in C&&D==="h"&&Y.type==="range")return!1;var H=window.getSelection(),M=H&&H.anchorNode,z=M?M===Y||M.contains(Y):!1;if(z)return!1;var L=Xv(D,Y);if(!L)return!0;if(L?B=D:(B=D==="v"?"h":"v",L=Xv(D,Y)),!L)return!1;if(!o.current&&"changedTouches"in C&&(R||_)&&(o.current=B),!B)return!0;var K=o.current||B;return ND(K,T,C,K==="h"?R:_)},[]),p=S.useCallback(function(C){var T=C;if(!(!Fa.length||Fa[Fa.length-1]!==h)){var k="deltaY"in T?Kv(T):ro(T),A=a.current.filter(function(B){return B.name===T.type&&(B.target===T.target||T.target===B.shadowParent)&&DD(B.delta,k)})[0];if(A&&A.should){T.cancelable&&T.preventDefault();return}if(!A){var R=(d.current.shards||[]).map(Zv).filter(Boolean).filter(function(B){return B.contains(T.target)}),_=R.length>0?m(T,R[0]):!d.current.noIsolation;_&&T.cancelable&&T.preventDefault()}}},[]),g=S.useCallback(function(C,T,k,A){var R={name:C,delta:T,target:k,should:A,shadowParent:RD(k)};a.current.push(R),setTimeout(function(){a.current=a.current.filter(function(_){return _!==R})},1)},[]),v=S.useCallback(function(C){s.current=ro(C),o.current=void 0},[]),x=S.useCallback(function(C){g(C.type,Kv(C),C.target,m(C,n.lockRef.current))},[]),b=S.useCallback(function(C){g(C.type,ro(C),C.target,m(C,n.lockRef.current))},[]);S.useEffect(function(){return Fa.push(h),n.setCallbacks({onScrollCapture:x,onWheelCapture:x,onTouchMoveCapture:b}),document.addEventListener("wheel",p,Ga),document.addEventListener("touchmove",p,Ga),document.addEventListener("touchstart",v,Ga),function(){Fa=Fa.filter(function(C){return C!==h}),document.removeEventListener("wheel",p,Ga),document.removeEventListener("touchmove",p,Ga),document.removeEventListener("touchstart",v,Ga)}},[]);var j=n.removeScrollBar,E=n.inert;return S.createElement(S.Fragment,null,E?S.createElement(h,{styles:AD(u)}):null,j?S.createElement(bD,{noRelative:n.noRelative,gapMode:n.gapMode}):null)}function RD(n){for(var a=null;n!==null;)n instanceof ShadowRoot&&(a=n.host,n=n.host),n=n.parentNode;return a}const OD=lD(L0,MD);var P0=S.forwardRef(function(n,a){return S.createElement(Yo,Cn({},n,{ref:a,sideCar:OD}))});P0.classNames=Yo.classNames;var zD=function(n){if(typeof document>"u")return null;var a=Array.isArray(n)?n[0]:n;return a.ownerDocument.body},$a=new WeakMap,ao=new WeakMap,io={},Ad=0,G0=function(n){return n&&(n.host||G0(n.parentNode))},_D=function(n,a){return a.map(function(s){if(n.contains(s))return s;var o=G0(s);return o&&n.contains(o)?o:(console.error("aria-hidden",s,"in not contained inside",n,". Doing nothing"),null)}).filter(function(s){return!!s})},VD=function(n,a,s,o){var u=_D(a,Array.isArray(n)?n:[n]);io[s]||(io[s]=new WeakMap);var h=io[s],d=[],m=new Set,p=new Set(u),g=function(x){!x||m.has(x)||(m.add(x),g(x.parentNode))};u.forEach(g);var v=function(x){!x||p.has(x)||Array.prototype.forEach.call(x.children,function(b){if(m.has(b))v(b);else try{var j=b.getAttribute(o),E=j!==null&&j!=="false",C=($a.get(b)||0)+1,T=(h.get(b)||0)+1;$a.set(b,C),h.set(b,T),d.push(b),C===1&&E&&ao.set(b,!0),T===1&&b.setAttribute(s,"true"),E||b.setAttribute(o,"true")}catch(k){console.error("aria-hidden: cannot operate on ",b,k)}})};return v(a),m.clear(),Ad++,function(){d.forEach(function(x){var b=$a.get(x)-1,j=h.get(x)-1;$a.set(x,b),h.set(x,j),b||(ao.has(x)||x.removeAttribute(o),ao.delete(x)),j||x.removeAttribute(s)}),Ad--,Ad||($a=new WeakMap,$a=new WeakMap,ao=new WeakMap,io={})}},BD=function(n,a,s){s===void 0&&(s="data-aria-hidden");var o=Array.from(Array.isArray(n)?n:[n]),u=zD(n);return u?(o.push.apply(o,Array.from(u.querySelectorAll("[aria-live], script"))),VD(o,u,s,"aria-hidden")):function(){return null}},LD=Object.defineProperty,cn=(n,a)=>LD(n,"name",{value:a,configurable:!0}),ch="Dialog",[F0,XA]=u0(ch),[UD,An]=F0(ch),gs=cn(n=>{const{__scopeDialog:a,children:s,open:o,defaultOpen:u,onOpenChange:h,modal:d=!0}=n,m=S.useRef(null),p=S.useRef(null),[g,v]=h0({prop:o,defaultProp:u??!1,onChange:h,caller:ch}),[x,b]=S.useState(0),[j,E]=S.useState(0);return l.jsx(UD,{scope:a,triggerRef:m,contentRef:p,contentId:yo(),titleId:yo(),descriptionId:yo(),titlePresent:x>0,descriptionPresent:j>0,setTitleCount:b,setDescriptionCount:E,open:g,onOpenChange:v,onOpenToggle:S.useCallback(()=>v(C=>!C),[v]),modal:d,children:s})},"Dialog"),$0="DialogPortal",[HD,X0]=F0($0,{forceMount:void 0}),ys=cn(n=>{const{__scopeDialog:a,forceMount:s,children:o,container:u}=n,h=An($0,a);return l.jsx(HD,{scope:a,forceMount:s,children:S.Children.map(o,d=>l.jsx(sh,{present:s||h.open,children:l.jsx(KN,{asChild:!0,container:u,children:d})}))})},"DialogPortal"),yf="DialogOverlay",vs=S.forwardRef(cn(function(a,s){const o=X0(yf,a.__scopeDialog),{forceMount:u=o.forceMount,...h}=a,d=An(yf,a.__scopeDialog);return d.modal?l.jsx(sh,{present:u||d.open,children:l.jsx(YD,{...h,ref:s})}):null},"DialogOverlay")),qD=rh("DialogOverlay.RemoveScroll"),YD=S.forwardRef(cn(function(a,s){const{__scopeDialog:o,...u}=a,h=An(yf,o),d=w0(),m=li(s,d);return l.jsx(P0,{as:qD,allowPinchZoom:!0,shards:[h.contentRef],children:l.jsx(aa.div,{"data-state":uh(h.open),...u,ref:m,style:{pointerEvents:"auto",...u.style}})})},"DialogOverlayImpl")),xs="DialogContent",bs=S.forwardRef(cn(function(a,s){const o=X0(xs,a.__scopeDialog),{forceMount:u=o.forceMount,...h}=a,d=An(xs,a.__scopeDialog);return l.jsx(sh,{present:u||d.open,children:d.modal?l.jsx(PD,{...h,ref:s}):l.jsx(GD,{...h,ref:s})})},"DialogContent")),PD=S.forwardRef(cn(function(a,s){const o=An(xs,a.__scopeDialog),u=S.useRef(null),h=li(s,o.contentRef,u);return S.useEffect(()=>{const d=u.current;if(d)return BD(d)},[]),l.jsx(K0,{...a,ref:h,trapFocus:o.open,disableOutsidePointerEvents:o.open,onCloseAutoFocus:Cr(a.onCloseAutoFocus,d=>{var m;d.preventDefault(),(m=o.triggerRef.current)==null||m.focus()}),onPointerDownOutside:Cr(a.onPointerDownOutside,d=>{const m=d.detail.originalEvent,p=m.button===0&&m.ctrlKey===!0;(m.button===2||p)&&d.preventDefault()}),onFocusOutside:Cr(a.onFocusOutside,d=>d.preventDefault())})},"DialogContentModal")),GD=S.forwardRef(cn(function(a,s){const o=An(xs,a.__scopeDialog),u=S.useRef(!1),h=S.useRef(!1);return l.jsx(K0,{...a,ref:s,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:d=>{var m,p;(m=a.onCloseAutoFocus)==null||m.call(a,d),d.defaultPrevented||(u.current||(p=o.triggerRef.current)==null||p.focus(),d.preventDefault()),u.current=!1,h.current=!1},onInteractOutside:d=>{var g,v;(g=a.onInteractOutside)==null||g.call(a,d),d.defaultPrevented||(u.current=!0,d.detail.originalEvent.type==="pointerdown"&&(h.current=!0));const m=d.target;((v=o.triggerRef.current)==null?void 0:v.contains(m))&&d.preventDefault(),d.detail.originalEvent.type==="focusin"&&h.current&&d.preventDefault()}})},"DialogContentNonModal")),K0=S.forwardRef(cn(function(a,s){const{__scopeDialog:o,trapFocus:u,onOpenAutoFocus:h,onCloseAutoFocus:d,...m}=a,p=An(xs,o);return oh(),l.jsx(l.Fragment,{children:l.jsx(FN,{asChild:!0,loop:!0,trapped:u,onMountAutoFocus:h,onUnmountAutoFocus:d,children:l.jsx(YN,{role:"dialog",id:p.contentId,"aria-describedby":p.descriptionPresent?p.descriptionId:void 0,"aria-labelledby":p.titlePresent?p.titleId:void 0,"data-state":uh(p.open),...m,ref:s,deferPointerDownOutside:!0,onDismiss:()=>p.onOpenChange(!1)})})})},"DialogContentImpl")),FD="DialogTitle",Ss=S.forwardRef(cn(function(a,s){const{__scopeDialog:o,...u}=a,h=An(FD,o),{setTitleCount:d}=h;return Ar(()=>(d(m=>m+1),()=>d(m=>m-1)),[d]),l.jsx(aa.h2,{id:h.titleId,...u,ref:s})},"DialogTitle")),$D="DialogDescription",js=S.forwardRef(cn(function(a,s){const{__scopeDialog:o,...u}=a,h=An($D,o),{setDescriptionCount:d}=h;return Ar(()=>(d(m=>m+1),()=>d(m=>m-1)),[d]),l.jsx(aa.p,{id:h.descriptionId,...u,ref:s})},"DialogDescription")),XD="DialogClose",zo=S.forwardRef(cn(function(a,s){const{__scopeDialog:o,...u}=a,h=An(XD,o);return l.jsx(aa.button,{type:"button",...u,ref:s,onClick:Cr(a.onClick,()=>h.onOpenChange(!1))})},"DialogClose"));function uh(n){return n?"open":"closed"}cn(uh,"getState");let Qv=Promise.resolve();const KD={loading:["正在准备二维码","正在连接腾讯文档，请稍候。"],consent:["确认腾讯文档登录协议","继续前，请阅读腾讯文档的服务协议与隐私政策。"],waiting:["请使用企业微信扫一扫","打开手机企业微信，扫描上方二维码。"],scanned:["已扫码，请在手机上确认","确认后将检查目标文档是否可访问。"],expired:["二维码已过期","刷新后，使用企业微信重新扫码。"],failed:["暂时无法完成登录","请检查网络连接后重试。"],success:["登录完成","已连接腾讯文档，可以继续识别并检查。"]};function ZD({id:n,onClose:a}){const[s,o]=S.useState({state:"loading"}),[u,h]=S.useState(!0),[d,m]=S.useState(!1),[p,g]=S.useState(""),v=S.useRef(void 0),x=S.useRef(a);x.current=a,S.useEffect(()=>{const C=crypto.randomUUID();let T=!1,k=!1,A=!1,R,_=Date.now();const B=D=>{const H=Qv.then(()=>fe("tencentSheet.login",{id:n,sessionToken:C,stage:D},3e5));return Qv=H.catch(()=>{}),H},Y=D=>{clearTimeout(R),D!=="poll"&&(_=Date.now(),o({state:"loading"})),h(!0),(async()=>{try{const H=await B(D);if(T||k)return;if(H.state==="loading"){if(_??(_=Date.now()),Date.now()-_>45e3)throw new Error("暂时无法确认登录状态或加载企业微信二维码，请刷新重试，或打开文档检查登录页面。")}else _=void 0;A=H.state==="success",o(H),["loading","waiting","scanned"].includes(H.state)&&(R=setTimeout(()=>Y("poll"),1200))}catch(H){!T&&!k&&o({state:"failed",message:H instanceof Error?H.message:String(H)})}finally{T||h(!1)}})()};return v.current={run:Y,close:()=>{k||(k=!0,clearTimeout(R),m(!0),B("cancel").then(()=>{T||x.current(A)}).catch(D=>{T||(k=!1,m(!1),o({state:"failed",message:`关闭登录会话失败：${D instanceof Error?D.message:String(D)}`}))}))}},Y("start"),()=>{T=!0,clearTimeout(R),k||B("cancel").catch(()=>{})}},[n]);async function b(C){g("");try{await fe("tencentSheet.loginAgreement",{kind:C})}catch(T){g(T instanceof Error?T.message:String(T))}}const[j,E]=KD[s.state];return l.jsx(gs,{open:!0,onOpenChange:C=>{var T;C||(T=v.current)==null||T.close()},children:l.jsxs(ys,{children:[l.jsx(vs,{className:"dialog-overlay"}),l.jsxs(bs,{className:"tencent-login-dialog",onPointerDownOutside:C=>C.preventDefault(),children:[l.jsxs("div",{className:"tencent-login-header",children:[l.jsx(Ss,{children:"登录腾讯文档"}),l.jsx("button",{className:"secondary","aria-label":"关闭登录弹窗",disabled:d,onClick:()=>{var C;return(C=v.current)==null?void 0:C.close()},children:l.jsx(qo,{size:20})})]}),l.jsx("div",{className:"tencent-login-method",children:"企业微信扫码"}),l.jsx("div",{className:"tencent-login-qr",children:s.state==="waiting"&&s.qr?l.jsx("img",{src:s.qr,alt:"企业微信登录二维码"}):s.state==="success"?l.jsx(ii,{size:48}):s.state==="loading"?l.jsx(yn,{className:"spin",size:36}):l.jsx("span",{children:s.state==="scanned"?"等待确认":s.state==="consent"?"登录协议":s.state==="expired"?"已过期":"请重试"})}),l.jsxs("div",{className:"tencent-login-status","aria-live":"polite",children:[l.jsx("h3",{children:j}),l.jsx(js,{children:s.message||E})]}),s.state==="consent"&&l.jsxs("p",{className:"tencent-login-terms",children:[l.jsx("a",{href:"https://docs.qq.com/doc/p/41c65c813fe78d2f262bf35b825c214f0f459bfe",onClick:C=>{C.preventDefault(),b("service")},children:"服务协议"}),l.jsx("span",{children:"与"}),l.jsx("a",{href:"https://docs.qq.com/doc/p/79d8f25f4f022ccca80949ea89b3fe8a137d8940",onClick:C=>{C.preventDefault(),b("privacy")},children:"隐私政策"})]}),p&&l.jsx("p",{role:"alert",className:"tencent-sheet-help",children:p}),l.jsx("button",{className:"primary tencent-login-submit",disabled:u||d,onClick:()=>{var C,T;return s.state==="success"?(C=v.current)==null?void 0:C.close():(T=v.current)==null?void 0:T.run(s.state==="consent"?"consent":"refresh")},children:d?"正在关闭…":s.state==="success"?"完成":s.state==="consent"?"同意协议并继续":s.state==="failed"?"重新加载":"刷新二维码"}),l.jsx("p",{className:"tencent-sheet-help tencent-login-footnote",children:"关闭弹窗可取消本次登录。已有登录状态会保留。"})]})]})})}const vf=n=>n instanceof Error?n.message:String(n);function QD({onCreated:n,onCancel:a}){const[s,o]=S.useState(""),[u,h]=S.useState(!1),[d,m]=S.useState("");async function p(){h(!0),m("");try{await n(await fe("tencentSheet.create",{documentUrl:s}))}catch(g){m(vf(g))}finally{h(!1)}}return l.jsxs("div",{className:"automation-create-step",children:[l.jsxs("div",{children:[l.jsx("h3",{children:"新建文档填报任务"}),l.jsx("p",{children:"填写文档链接，进入任务后分别配置网页控件、业务位置和执行规则。"})]}),l.jsxs("label",{children:["文档分享链接",l.jsx("input",{type:"url",disabled:u,value:s,onChange:g=>o(g.target.value),placeholder:"粘贴腾讯文档或企业微信文档链接"})]}),d&&l.jsx("p",{role:"alert",children:d}),l.jsxs("div",{className:"dialog-actions",children:[l.jsx("button",{className:"secondary",disabled:u,onClick:a,children:"取消"}),l.jsxs("button",{className:"primary",disabled:u||!s.trim(),onClick:p,children:[u&&l.jsx(yn,{className:"spin"}),"创建并配置"]})]})]})}function Z0({id:n,changed:a,back:s,name:o}){var oi,Rr;const u=[{id:"doc",label:"文档与账号"},{id:"control",label:"网页控件"},{id:"fields",label:"业务字段"},{id:"rule",label:"执行规则"},{id:"test",label:"测试与上线"}],[h,d]=S.useState("doc"),[m,p]=S.useState("front"),[g,v]=S.useState(!1),[x,b]=S.useState(),[j,E]=S.useState(),[C,T]=S.useState(""),[k,A]=S.useState(""),[R,_]=S.useState(!1),[B,Y]=S.useState(!1),[D,H]=S.useState(""),[M,z]=S.useState(),[L,K]=S.useState(!1),[ce,se]=S.useState(!1),[ye,P]=S.useState(!1),[oe,J]=S.useState(!1),[$,ae]=S.useState(!1),[N,V]=S.useState([]),[ee,le]=S.useState(""),[de,me]=S.useState(""),[xe,ie]=S.useState(""),[W,he]=S.useState(""),ne=S.useRef(null),[ue,Ne]=S.useState();S.useEffect(()=>{if(!k||R)return;const Z=window.setTimeout(()=>A(""),2400);return()=>window.clearTimeout(Z)},[k,R]);const Me=()=>fe("tencentSheet.get",{id:n}).then(E);S.useEffect(()=>{let Z=!0;return J(!1),P(!1),fe("tencentSheet.get",{id:n}).then(je=>{Z&&E(je)}).catch(je=>{Z&&(_(!0),A(vf(je)))}),()=>{Z=!1}},[n]),S.useEffect(()=>{var Z,je;(xe||W)&&((je=(Z=ne.current)==null?void 0:Z.scrollIntoView)==null||je.call(Z,{block:"start"}))},[xe,W]);async function De(Z,je){T(Z),A(""),_(!1);try{await je()}catch(Tt){_(!0),A(vf(Tt))}finally{T("")}}function Te(){Ne(void 0),z(void 0)}function ct(Z){E(je=>je&&{...je,config:Z}),J(!1),K(!0),Te()}async function ks(Z,je){var Tt;Te(),E(await fe("tencentSheet.updateField",{id:n,fieldId:Z.id,name:Z.name,unit:Z.unit,...je?{notion:je}:{}})),he(""),(Tt=j==null?void 0:j.config.rules)!=null&&Tt[Z.id]||(ie(Jn?Z.id:""),A(Jn?"数据来源已保存，接着示范这个字段的两个日期位置。":"数据来源已保存。录制网页控件后，再示范这个字段的填写位置。")),a()}async function Mr(){if(!j)return;const Z=await fe("tencentSheet.save",{id:n,config:j.config,configRevision:j.configRevision??0});E(Z),K(!1),Te(),a()}async function ia(Z){L&&await Mr(),Te();const je=await fe(`tencentSheet.${Z}`,{id:n},3e5);A(je.message),je.sheets&&V([...new Set(je.sheets)]),await Me()}if(!j)return l.jsx("div",{className:"notice",role:"status",children:k||"正在读取填报配置…"});const _e=j.config,Jn=!!((oi=_e.webControls)!=null&&oi.sheetTab&&_e.webControls.cellAddressBox&&_e.webControls.cellEditor),wt=_e.fields??[],nt=wt.find(Z=>Z.id===xe),un=wt.find(Z=>Z.id===W),Et=!!C||ce||!!un||$||ye;return l.jsx("div",{className:"tencent-demo","aria-busy":!!C,children:l.jsxs("div",{className:"page tencent-sheet-workbench",children:[s&&l.jsx("button",{className:"crumb",onClick:s,disabled:Et,children:"← 返回任务列表"}),l.jsxs("div",{className:"titlebar",children:[l.jsxs("div",{children:[l.jsx("h1",{children:o||"腾讯文档填报"}),l.jsxs("div",{className:"subtitle",children:["腾讯文档填报 · 业务日期 ",j.businessDate??"获取数据时确定"]})]}),l.jsxs("div",{className:"tencent-badges",children:[l.jsxs("span",{className:`badge ${j.enabled?"success":"warning"}`,children:["● 定时",j.enabled?"已启用":"未启用"]}),l.jsx("span",{className:"badge neutral",children:j.validated&&!L?"已验证":"待验证"})]})]}),j.enabled&&l.jsxs("div",{className:"banner",children:[l.jsxs("p",{children:["定时填报当前处于",l.jsx("strong",{children:"已启用"}),"状态。修改任何配置前，请先停用，避免与正在运行的任务冲突。"]}),l.jsx("button",{className:"btn btn-secondary",disabled:Et,onClick:()=>De("停用定时填报",async()=>{await fe("automation.setEnabled",{taskType:"tencent_sheet_fill",id:n,enabled:!1},6e4),await Me(),a(),A("已停用定时填报，现在可以修改配置。")}),children:"立即停用"})]}),l.jsx("div",{className:"status-strip",children:[{ok:oe,text:oe?"文档已连接":"文档连接待检查"},{ok:Jn,text:Jn?"网页控件已录制":"网页控件待录制"},{ok:wt.length>0&&wt.every(Z=>{var je;return Z.notion&&((je=_e.rules)==null?void 0:je[Z.id])}),text:`业务字段 ${wt.filter(Z=>{var je;return Z.notion&&((je=_e.rules)==null?void 0:je[Z.id])}).length}/${wt.length} 已绑定`},{ok:!!j.enabled,text:j.enabled?"定时已启用":"定时未启用"}].map(Z=>l.jsxs("span",{className:`status-chip ${Z.ok?"ok":"pending"}`,children:[l.jsx("span",{className:"dot"}),Z.text]},Z.text))}),l.jsx("div",{className:"tabs",role:"tablist","aria-label":"腾讯文档配置",children:u.map((Z,je)=>l.jsx("button",{id:`tencent-tab-${Z.id}`,role:"tab","aria-selected":h===Z.id,"aria-controls":`tencent-panel-${Z.id}`,tabIndex:h===Z.id?0:-1,disabled:Et,className:`tab ${h===Z.id?"active":""}`,onClick:()=>d(Z.id),onKeyDown:Tt=>{var Wn;if(!["ArrowLeft","ArrowRight","Home","End"].includes(Tt.key))return;Tt.preventDefault();const Ms=Tt.key==="Home"?0:Tt.key==="End"?u.length-1:(je+(Tt.key==="ArrowRight"?1:-1)+u.length)%u.length;d(u[Ms].id),(Wn=document.getElementById(`tencent-tab-${u[Ms].id}`))==null||Wn.focus()},children:Z.label},Z.id))}),l.jsxs("div",{className:"panel active",role:"tabpanel",id:`tencent-panel-${h}`,"aria-labelledby":`tencent-tab-${h}`,children:[h==="doc"&&l.jsx(l.Fragment,{children:l.jsxs("fieldset",{disabled:Et,className:"card tencent-sheet-panel",children:[l.jsx("h2",{children:"目标文档"}),l.jsx("p",{className:"hint",children:"填报的目标腾讯共享表格。目标格已有内容时会自动停止，不会覆盖。"}),l.jsxs("label",{children:["文档链接",l.jsx("input",{type:"url",disabled:j.enabled,value:_e.documentUrl,onChange:Z=>ct({..._e,documentUrl:Z.target.value})})]}),l.jsx("div",{className:"divider"}),l.jsx("h2",{children:"填报账号"}),l.jsx("p",{className:"hint",children:"使用企业微信扫码登录，已有登录状态会自动复用。"}),l.jsxs("div",{className:"btn-row",children:[l.jsx("button",{className:"primary",onClick:()=>De("准备扫码登录",async()=>{L&&await Mr(),Te(),J(!1),P(!0)}),children:oe?"检查登录":"扫码登录"}),l.jsx("button",{className:"secondary",onClick:()=>De("打开文档",()=>ia("open")),children:"打开文档"}),l.jsx("button",{className:"ghost",onClick:()=>De("结束前台会话",async()=>{Te();const Z=await fe("tencentSheet.close",{id:n});A(Z.message)}),children:"结束前台会话"})]}),l.jsxs("details",{className:"tencent-document-check",children:[l.jsx("summary",{children:"工作表识别与检查"}),l.jsx("div",{className:"btn-row",children:l.jsx("button",{className:"secondary",disabled:j.enabled,onClick:()=>De("识别页面",()=>ia("recognize")),children:"识别并检查"})}),l.jsx("p",{className:"tencent-sheet-help",children:"识别会检查已保存控件并读取工作表名称，不填写数据。录制控件和示范位置时，仍会打开填报专用浏览器。"}),!!N.length&&l.jsxs("label",{children:["工作表名称",l.jsx(ot,{value:_e.sheetReferenceName??_e.capturedSheet??_e.sheetName??"",options:N.map(Z=>({value:Z,label:Z})),placeholder:"选择识别到的工作表名称",disabled:Et||!!j.enabled,onChange:Z=>ct({..._e,sheetReferenceName:Z})})]}),(_e.sheetReferenceName||_e.capturedSheet||_e.sheetMode==="fixed")&&l.jsxs("p",{className:"tencent-sheet-help",children:["工作表：",_e.sheetReferenceName??_e.capturedSheet??_e.sheetName," · 执行时按名称匹配，年月使用本次业务日期。"]})]})]})}),h==="control"&&l.jsx(uN,{id:n,value:_e.webControls,disabled:!!C||ce||!!un||L||!!j.enabled,onActive:Z=>{ae(Z),Z&&Te()},onSaved:async()=>{await Me(),Te(),a()}},n),h==="fields"&&l.jsxs(l.Fragment,{children:[l.jsxs("fieldset",{disabled:Et||L||j.enabled,className:"card tencent-sheet-panel",children:[l.jsxs("div",{className:"add-field-toggle",children:[l.jsxs("div",{children:[l.jsx("h2",{children:"已绑定的业务字段"}),l.jsx("p",{className:"hint",children:"取数、月份和填写位置共用本次业务日期。"})]}),l.jsx("button",{className:"secondary",onClick:()=>v(!g),children:"+ 添加业务字段"})]}),g&&l.jsxs("div",{className:"add-field-form open",children:[l.jsxs("div",{className:"tencent-sheet-grid",children:[l.jsxs("label",{children:["业务字段名称",l.jsx("input",{value:ee,placeholder:"例如：合格数量",onChange:Z=>le(Z.target.value)})]}),l.jsxs("label",{children:["单位（可选）",l.jsx("input",{value:de,placeholder:"例如：件",onChange:Z=>me(Z.target.value)})]})]}),l.jsx("button",{className:"primary",disabled:!ee.trim(),onClick:()=>De("新增业务字段",async()=>{var je,Tt;Te();const Z=await fe("tencentSheet.addField",{id:n,name:ee,unit:de});E(Z),ie(""),he(((Tt=(je=Z.config.fields)==null?void 0:je.at(-1))==null?void 0:Tt.id)??""),le(""),me(""),v(!1),a()}),children:"下一步 · 选择数据库"}),l.jsx("button",{className:"ghost",onClick:()=>v(!1),children:"取消"})]}),!wt.length&&l.jsx("p",{children:"还没有业务字段，请先新增。新文档没有预设业务。"}),l.jsx("div",{className:"field-list",children:wt.map(Z=>{var je;return l.jsxs("div",{className:"field-row",children:[l.jsxs("span",{children:[l.jsxs("strong",{children:[Z.name,Z.unit?`（${Z.unit}）`:""]}),l.jsxs("small",{className:"tencent-control-state",children:[(je=_e.rules)!=null&&je[Z.id]?"位置已示范":"待示范位置"," · ",Z.notion?`${Z.notion.sourceName??"Notion"} / ${Z.notion.valueFieldName??"数值字段"}`:"待绑定数据库"]})]}),l.jsxs("div",{className:"tencent-sheet-actions",children:[l.jsx("button",{className:"ghost",disabled:!Jn||!Z.notion,onClick:()=>{ie(Z.id),Te()},"aria-label":`示范位置：${Z.name}`,children:"示范位置"}),l.jsx("button",{className:"ghost",onClick:()=>{he(Z.id),ie(""),Te()},"aria-label":`绑定数据：${Z.name}`,children:"绑定数据"}),l.jsx("button",{className:"btn-danger-ghost",onClick:()=>De("删除业务字段",async()=>{Te(),E(await fe("tencentSheet.deleteField",{id:n,fieldId:Z.id})),xe===Z.id&&ie(""),a()}),"aria-label":`删除：${Z.name}`,children:"删除"})]})]},Z.id)})})]}),(nt||un)&&l.jsxs("div",{ref:ne,children:[nt&&!un&&l.jsx(cN,{id:n,businessDate:B&&D?D:j.businessDate,metrics:[{value:nt.id,label:nt.name}],initialMetric:nt.id,rules:_e.rules,fixedSheet:_e.sheetMode==="fixed",disabled:!!C||L||$,run:De,onActive:Z=>{se(Z),Z&&Te()},onSaved:async()=>{await Me(),Te(),ie(""),A("这个业务字段的数据来源和填报位置已配置完成，可以新增下一个字段或获取本次数据。"),a()}},`${n}:${nt.id}:${JSON.stringify(_e.rules)}`),un&&l.jsx(dN,{id:n,field:un,continueToTeaching:Jn&&!((Rr=_e.rules)!=null&&Rr[un.id]),disabled:!!C,onCancel:()=>he(""),onSave:Z=>De("保存数据绑定",()=>ks(un,Z))},un.id)]})]}),h==="rule"&&l.jsx(l.Fragment,{children:l.jsx(hN,{rule:_e.businessDateRule??{kind:"relative",offsetDays:-1},schedule:_e.executionSchedule??i0,disabled:Et||!!j.enabled,onChange:(Z,je)=>ct({..._e,businessDateRule:Z,executionSchedule:je})})}),L&&(h==="doc"||h==="rule")&&l.jsx("div",{className:"btn-row",children:l.jsx("button",{className:"primary",disabled:Et,onClick:()=>De("保存任务配置",async()=>{await Mr(),A("任务配置已保存。保存规则不会自动启用定时。")}),children:"保存任务配置"})}),h==="test"&&l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"card",children:[l.jsx("h2",{children:"运行测试"}),l.jsx("div",{className:"segmented",role:"group","aria-label":"测试模式",children:[{id:"front",label:"前台测试"},{id:"back",label:"后台自动测试"}].map(Z=>l.jsx("button",{"aria-pressed":m===Z.id,disabled:Et,className:m===Z.id?"active":"",onClick:()=>p(Z.id),children:Z.label},Z.id))}),m==="front"&&l.jsxs("fieldset",{disabled:Et||L,className:"test-mode active tencent-test-fields",children:[l.jsx("p",{className:"test-desc",children:"浏览器可见，手动核对数据与填写位置。获取数据和检查位置不会写入；点击确认填报后才会真实写入文档。"}),l.jsxs("label",{className:"tencent-sheet-date-mode",children:[l.jsx("input",{type:"checkbox",checked:B,onChange:Z=>{Y(Z.target.checked),Te()}}),"指定补填日期"]}),B?l.jsx(Kt,{label:"本次业务日期",disabled:!!C,value:D,onChange:Z=>{H(Z),Te()}}):l.jsxs("p",{children:["按已保存规则计算的业务日期：",(ue==null?void 0:ue.date)??j.businessDate??"获取数据时确定","。本次取数后日期固定，检查与填报沿用同一天。"]}),l.jsx("button",{className:"secondary",disabled:!wt.length||B&&!D||wt.some(Z=>{var je;return!((je=_e.rules)!=null&&je[Z.id])||!Z.notion}),onClick:()=>De("获取 Notion 数据",async()=>{Te(),Ne(await fe("tencentSheet.fetch",{id:n,businessDate:B?D:void 0},3e5)),A("取数完成，请核对来源、日期和数值后检查网页位置。")}),children:"获取本次 Notion 数据"}),ue&&l.jsxs("div",{className:"tencent-sheet-table",children:[l.jsxs("p",{children:["业务日期：",ue.date]}),l.jsxs("table",{children:[l.jsx("thead",{children:l.jsxs("tr",{children:[l.jsx("th",{children:"业务字段"}),l.jsx("th",{children:"数值"}),l.jsx("th",{children:"来源与范围"}),l.jsx("th",{children:"记录数"})]})}),l.jsx("tbody",{children:ue.rows.map(Z=>l.jsxs("tr",{children:[l.jsx("td",{children:Z.name}),l.jsxs("td",{children:[Z.value," ",Z.unit]}),l.jsxs("td",{children:[Z.source," · ",Z.period]}),l.jsx("td",{children:Z.recordCount})]},Z.id))})]})]}),l.jsx("button",{className:"primary",disabled:!wt.length||B&&!D||!ue,onClick:()=>De("检查填报位置",async()=>{z(void 0);const Z=await fe("tencentSheet.inspect",{id:n,dataToken:ue==null?void 0:ue.dataToken,businessDate:(ue==null?void 0:ue.date)??(B?D:void 0)},3e5);z(Z),A(Z.message),a()}),children:"检查本次数据与位置"})]}),m==="back"&&l.jsxs("fieldset",{disabled:Et||L,className:"test-mode active tencent-test-fields",children:[l.jsxs("p",{className:"hint",children:["本次业务日期：",B?D||"请在前台测试选择补填日期":j.businessDate??"执行时确定",B?"（指定补填日期）":"（按已保存规则）"]}),l.jsx("p",{className:"tencent-sheet-help",children:"按本次业务日期重新取数，自动检查位置、填写空白格并确认保存。这会真实写入文档。测试时关闭前台填报浏览器，复用登录状态在后台运行；失败后可重新打开文档检查。"}),l.jsx("p",{className:"tencent-sheet-help",children:"所有字段须绑定 Notion。测试通过后，可在任务列表启用定时；当前环境须开放 Windows 调度，电脑须开机且用户已登录。已有执行记录的业务日期不会由定时再次填写。"}),l.jsx("button",{className:"primary",disabled:!wt.length||wt.some(Z=>{var je;return!Z.notion||!((je=_e.rules)!=null&&je[Z.id])})||B&&!D,onClick:()=>De("后台取数、填报并确认保存",async()=>{Te();try{const Z=await fe("tencentSheet.backgroundTest",{id:n,businessDate:B?D:void 0},6e5);A(Z.message)}finally{await Me(),a()}}),children:"后台自动测试并填写"}),j.enabled&&l.jsx("p",{className:"tencent-sheet-help",children:"定时填报已启用。修改配置前请先在任务列表停用。"})]})]}),m==="front"&&M&&l.jsxs("section",{className:"card tencent-sheet-panel",children:[l.jsx("h3",{children:"确认填报"}),l.jsxs("p",{children:["业务日期：",M.date," · ",M.sheet]}),l.jsx("div",{className:"tencent-sheet-table",children:l.jsxs("table",{children:[l.jsx("thead",{children:l.jsxs("tr",{children:[l.jsx("th",{children:"项目"}),l.jsx("th",{children:"位置"}),l.jsx("th",{children:"原内容"}),l.jsx("th",{children:"本次填报"})]})}),l.jsx("tbody",{children:M.rows.map(Z=>l.jsxs("tr",{children:[l.jsx("td",{children:Z.label}),l.jsx("td",{children:Z.address}),l.jsx("td",{children:Z.current||"空白"}),l.jsx("td",{children:Z.value})]},Z.address))})]})}),l.jsx("p",{children:M.conflict?"目标格已有内容，本次不可写入。":"将仅填写以上空白单元格。确认有效期为 2 分钟。"}),l.jsxs("button",{className:"primary",disabled:Et||!M.token||M.conflict,onClick:()=>De("填报并确认保存",async()=>{const Z=M;z(void 0);const je=await fe("tencentSheet.write",{id:n,dataToken:ue==null?void 0:ue.dataToken,businessDate:Z.date,token:Z.token},31e4);A(je.message),a()}),children:["确认填报以上 ",M.rows.length," 项"]})]}),l.jsxs("details",{className:"tencent-run-history",children:[l.jsx("summary",{onClick:()=>{x||De("读取运行记录",async()=>{const Z=await fe("tencentSheet.runs",{id:n});b(Z.runs)})},children:"运行记录"}),x==null?void 0:x.map(Z=>l.jsxs("div",{children:[l.jsxs("p",{children:[Z.time," · ",Z.businessDate," · ",Z.status]}),l.jsx("p",{children:Z.error||Z.message})]},Z.id)),(x==null?void 0:x.length)===0&&l.jsx("p",{children:"暂无运行记录"})]})]})]},h),ye&&l.jsx(ZD,{id:n,onClose:Z=>{J(Z),P(!1),A(Z?"已登录腾讯文档，可以继续识别并检查。":"已关闭扫码登录，原有登录状态已保留。")}},`login:${n}`),l.jsxs("div",{className:`toast ${k?"show":""} ${R?"error":""}`,role:R?"alert":"status",children:[k,k&&l.jsx("button",{className:"ghost","aria-label":"关闭提示",onClick:()=>A(""),children:"×"})]}),C&&l.jsxs("p",{role:"status",className:"tencent-sheet-progress",children:[l.jsx(yn,{className:"spin"}),C,"… 请等待操作结束"]})]})})}const Q0=`/* Generated from tools/experiments/production_message/production_assistant_demo/src/index.css and App.css.\r
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
`,J0=`/* Shared controls: normal typography, neutral focus and unobtrusive scrollbars. */\r
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
`,JD=`<!doctype html>\r
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
`,W0=""+new URL("Inter-VF2RPR_K.ttf",import.meta.url).href,I0=""+new URL("NotoSansSC-Dz1u1FRy.ttf",import.meta.url).href,is=new Map;function WD(n,a,s=!1){const o=JSON.stringify([n,a]),u=`daily-field-cache-v1:${o}`;let h=s?void 0:is.get(o);if(!h&&!s)try{const d=JSON.parse(localStorage.getItem(u)||"null");d&&Array.isArray(d.metrics)&&d.metrics.every(m=>m&&typeof m.id=="string"&&typeof m.name=="string")&&(h=Promise.resolve(d),is.set(o,h))}catch{}return h||(h=fe("daily.getProperties",{id:n,sourceId:a}).then(d=>{try{localStorage.setItem(u,JSON.stringify(d))}catch{}return d}).catch(d=>{throw is.delete(o),d}),is.set(o,h)),h}function ID(n=!1){if(is.clear(),n)try{Object.keys(localStorage).filter(a=>a.startsWith("daily-field-cache-v1:")).forEach(a=>localStorage.removeItem(a))}catch{}}const so=[0,-1,-2].flatMap(n=>[{granularity:"day",key:n===0?"today":`day${n}`,label:n===0?"今日":`${n===-1?"去年":"前年"}同日`},{granularity:"mtd",key:n===0?"mtd":n===-1?"lastmonth":"mtd-2",label:n===0?"本月累计":`${n===-1?"去年":"前年"}同期月累计`},{granularity:"ytd",key:n===0?"ytd":n===-1?"last":"ytd-2",label:n===0?"本年累计":`${n===-1?"去年":"前年"}同期`},{granularity:"fullyear",key:n===0?"fullyear":n===-1?"full":"full-2",label:`${n===0?"今年":n===-1?"去年":"前年"}全年`}].map(a=>({key:a.key,label:a.label,spec:{granularity:a.granularity,yearOffset:n}}))),e1={"system.date":'today("yyyy年M月d日")',"system.year":'today("yyyy年")',"system.month":'today("M月")',"system.day":'today("d日")'};function eA(n){return e1[n]||n}function Jv(n){const a=[[]];function s(u){u.replace(/\u00a0/g," ").split(`
`).forEach((h,d)=>{var p;if(d&&a.push([]),!h)return;const m=a.at(-1);((p=m.at(-1))==null?void 0:p.type)==="text"?m.at(-1).text+=h:m.push({type:"text",text:h})})}function o(u){var h;if(u.nodeType===3){s(u.textContent||"");return}if(u instanceof n.ownerDocument.defaultView.HTMLElement){if(u.dataset.key){const d=eA(u.dataset.key);a.at(-1).push({type:d.startsWith("today(")?"dateToken":"fieldToken",attrs:{placeholder:d,label:u.textContent||"",...u.dataset.legacySpec?{dateRangeSpec:JSON.parse(u.dataset.legacySpec)}:{}}});return}if(u.tagName==="BR"){s(`
`);return}u!==n&&["DIV","P"].includes(u.tagName)&&u.childNodes.length===1&&((h=u.firstChild)==null?void 0:h.nodeName)==="BR"||Array.from(u.childNodes).forEach((d,m)=>{m&&d.nodeType===1&&["DIV","P"].includes(d.tagName)&&s(`
`),o(d)})}}return o(n),{text:a.map(u=>u.map(h=>h.type==="text"?h.text:h.attrs.placeholder).join("")).join(`
`),document:JSON.stringify({type:"doc",content:a.map(u=>({type:"paragraph",content:u}))})}}function tA(n,a,s,o){const u=[...s,...Object.entries(e1).map(([d,m])=>({key:m,label:d==="system.date"?"业务日期":d==="system.year"?"业务年份":d==="system.month"?"业务月份":"业务日",metric:"date",scope:"date",keywords:"",field:void 0}))].filter(d=>d.field||d.metric==="date").sort((d,m)=>m.key.length-d.key.length);let h=a;for(;h;){const d=u.map(m=>({d:m,index:h.indexOf(m.key)})).filter(m=>m.index>=0).sort((m,p)=>m.index-p.index)[0];if(!d){n.append(n.ownerDocument.createTextNode(h));break}d.index&&n.append(n.ownerDocument.createTextNode(h.slice(0,d.index))),n.append(o(d.d)),h=h.slice(d.index+d.d.key.length)}}function nA(n,a,s,o){if(!a)return!1;let u;try{u=JSON.parse(a)}catch{return!1}if(u.type!=="doc")return!1;function h(d){var m,p,g,v;if(d.type==="text"){n.append(n.ownerDocument.createTextNode(d.text||""));return}if(d.type==="hardBreak"){n.append(n.ownerDocument.createTextNode(`
`));return}if(d.type==="fieldToken"||d.type==="dateToken"){const x=((m=d.attrs)==null?void 0:m.placeholder)||"";let b=s.find(E=>E.key===x);b||(b={key:x,label:d.type==="dateToken"?"业务日期":((p=d.attrs)==null?void 0:p.label)||"已有数据",metric:d.type==="dateToken"?"date":"legacy",scope:"legacy",keywords:((g=d.attrs)==null?void 0:g.label)||""},s.push(b));const j=o(b);(v=d.attrs)!=null&&v.dateRangeSpec&&(j.dataset.legacySpec=JSON.stringify(d.attrs.dateRangeSpec)),n.append(j);return}(d.content||[]).forEach((x,b)=>{d.type==="doc"&&b&&n.append(n.ownerDocument.createTextNode(`
`)),h(x)})}return h(u),!0}function t1({id:n,back:a,changed:s,openSettings:o}){const u=S.useRef(null),[h,d]=S.useState("");return S.useEffect(()=>{let m=!1;const p=u.current;return fe("daily.get",{id:n}).then(g=>{if(m)return;const v=rA(g,{back:a,changed:s,openSettings:o});p.dailyRuntime=v,p.srcdoc=JD.replace("../../src/ProductionAssistant.App/Assets/Fonts/Inter.ttf",new URL(W0,window.location.href).href).replace("../../src/ProductionAssistant.App/Assets/Fonts/NotoSansSC.ttf",new URL(I0,window.location.href).href)}).catch(g=>{m||d(String(g.message||g))}),()=>{var g;m=!0,(g=p.dailyRuntime)==null||g.dispose()}},[n]),l.jsxs("div",{className:"message-template-host",children:[h&&l.jsx("p",{role:"alert",children:h}),l.jsx("iframe",{ref:u,title:"日报消息模板"})]})}function rA(n,a){var Y;let s=!1,o=!1,u,h,d=Promise.resolve(),m=0,p;const g=new Date,v=n.fields.map(D=>{var H,M,z;return{key:D.placeholder,label:D.label.replace(" · ",""),metric:`${D.databaseId||((H=D.binding)==null?void 0:H.dataSourceId)}:${D.businessId||((M=D.binding)==null?void 0:M.businessMetricId)}`,scope:((z=so.find(L=>JSON.stringify(L.spec)===JSON.stringify(D.dateRangeSpec)))==null?void 0:z.key)||"legacy",keywords:D.label,field:D}}),x=[];let b=(Y=n.metricSourceIds)!=null&&Y.length?n.metricSourceIds:[...new Set(n.fields.map(D=>{var H;return D.databaseId||((H=D.binding)==null?void 0:H.dataSourceId)}).filter(Boolean))];const j=new Map(n.fields.map(D=>[D.placeholder,D])),E=new Map;function C(D){const H=h==null?void 0:h.querySelector("#preview-status");H&&(H.textContent=D)}function T(){h==null||h.querySelectorAll("[data-send]").forEach(D=>D.disabled=o||!n.notificationConfigured)}async function k(D){D.text===n.draftTemplate&&D.document===n.draftTemplateDocument||(await fe("daily.saveTemplate",{id:_,...D}),n.draftTemplate=D.text,n.draftTemplateDocument=D.document)}async function A(){var D;try{const H=await fe("daily.get",{id:_});if(s)return;n.notificationConfigured=H.notificationConfigured,n.sources=H.sources,T(),(D=h==null?void 0:h.querySelector("[data-notification-notice]"))==null||D.toggleAttribute("hidden",!!n.notificationConfigured),await R()}catch(H){C(String(H))}}async function R(){var H;const D=await Promise.allSettled(b.map(async M=>({sourceId:M,metrics:(await WD(_,M)).metrics})));if(!s){v.splice(0,v.length,...v.filter(M=>M.field)),x.length=0;for(const M of D)if(M.status==="fulfilled")for(const z of M.value.metrics){const L=`${M.value.sourceId}:${z.id}`;x.push([L,z.name,z.name,0]);const K=z.granularity==="monthly"?[{key:"month",label:"本月"}]:so;for(const ce of K)v.push({key:`${L}:${ce.key}`,metric:L,scope:ce.key,label:z.granularity==="monthly"?z.name:ce.label+z.name,keywords:z.name+" "+ce.label+" "+(((H=n.sources.find(se=>se.id===M.value.sourceId))==null?void 0:H.name)||""),sourceId:M.value.sourceId,metricId:z.id});for(const ce of v.filter(se=>se.metric===L&&se.field))ce.sourceId=M.value.sourceId,ce.metricId=z.id}D.some(M=>M.status==="rejected")?C("部分指标目录读取失败，请到系统设置刷新数据库。"):b.length||C("请在右上角任务设置中配置本任务的指标范围。")}}const _=n.id,B={dirty(){m++,p=void 0},id:_,name:n.name,sendTime:n.sendTime,businessDate:`${g.getFullYear()}-${String(g.getMonth()+1).padStart(2,"0")}-${String(g.getDate()).padStart(2,"0")}`,definitions:v,metrics:x,value:D=>{var H,M,z;return D.metric==="date"?"业务日期":((H=p==null?void 0:p.fieldValues)==null?void 0:H[D.key])||((z=p==null?void 0:p.fieldValues)==null?void 0:z[((M=v.find(L=>L.field&&L.metric===D.metric&&L.scope===D.scope))==null?void 0:M.key)||""])||""},mount:(D,H)=>{nA(D,n.draftTemplateDocument,v,H)||tA(D,n.draftTemplate,v,H)},async materialize(D){var ce;if(D.field||D.metric==="date")return D;const H=v.find(se=>se.metric===D.metric&&se.sourceId),M=D.sourceId||(H==null?void 0:H.sourceId),z=D.metricId||(H==null?void 0:H.metricId);if(!M||!z)throw new Error("此字段缺少可用的指标定义，请在任务设置中刷新指标。");const L=JSON.stringify([M,z,D.scope,D.label]);let K=E.get(L);return K||(K=fe("daily.addField",{id:_,sourceId:M,metricId:z,placeholder:"",displayName:D.label,...D.scope==="month"?{rangeKind:"current-month"}:{dateRangeSpec:(ce=so.find(se=>se.key===D.scope))==null?void 0:ce.spec}}).then(({field:se})=>{j.set(se.placeholder,se);const ye={...D,key:se.placeholder,field:se,sourceId:M,metricId:z};return v.some(P=>P.key===ye.key)||v.push(ye),a.changed(),ye}).catch(se=>{throw E.delete(L),se}),E.set(L,K)),K},save(D){const H=Jv(D),M=d.catch(()=>{}).then(()=>s?void 0:k(H));return d=M,M},preview(D,H){const M=Jv(D),z=++m,L=d.catch(()=>{}).then(async()=>{if(s||z!==m)return{succeeded:!1,text:"",message:"内容已修改，请重新生成预览",errors:[]};await k(M);const K=await fe("daily.preview",{id:_,businessDate:H},12e4),ce={...K,errors:K.fieldErrors||[],message:K.succeeded?"已生成 · "+H:K.message};return z===m&&!s&&(p=ce),ce});return d=L,L},async send(D,H,M){if(!o){if(!n.notificationConfigured)throw new Error("请先在系统设置中配置通知渠道。");o=!0,T();try{await B.save(D);const z=await fe(H==="test"?"daily.test":"daily.sendToday",H==="test"?{id:_,businessDate:M}:{id:_},12e4);if(!z.succeeded)throw new Error(z.message||"发送失败，请查看运行记录");C(z.alreadySent?"今日当前内容已发送":H==="test"?"测试发送成功":"今日消息已发送"),a.changed()}finally{o=!1,T()}}},configureAdvanced(D,H){const M=v.some(K=>K.metric===D&&K.scope==="month"),z=M?[{key:"month",label:"本月计划"}]:[{key:"day",label:"日（业务日当天）"},{key:"mtd",label:"月累计（月初至业务日）"},{key:"ytd",label:"年累计（年初至业务日）"},{key:"fullyear",label:"全年"}];H.replaceChildren(...z.map(K=>new Option(K.label,K.key)));const L=H.ownerDocument.querySelector("#scope-year");L&&(L.disabled=M,L.value="0")},resolveAdvanced(D,H){return D==="month"?"month":so.find(M=>M.spec.granularity===D&&M.spec.yearOffset===Number(H)).key},async saveBasics(D,H){const M=Array.from((h==null?void 0:h.querySelectorAll("[data-context-source]:checked"))||[]).map(z=>z.value);await fe("daily.saveBasics",{id:_,name:D,sendTime:H,metricSourceIds:M}),n.name=D,n.sendTime=H,b=M,B.name=D,await R(),a.changed()},connect(D){var J;h=D,D.title=n.name,D.querySelector("#runs p").textContent="";const H=D.querySelector("header > span");H.removeAttribute("aria-hidden"),H.setAttribute("role","button"),H.setAttribute("tabindex","0"),H.setAttribute("aria-label","返回任务列表");const M=async()=>{const $=D.querySelector("#editor");$.contentEditable="false",m++;try{await B.save($),a.back()}catch(ae){C(String(ae)),$.contentEditable="true"}};H.addEventListener("click",M),H.addEventListener("keydown",$=>{$.key==="Enter"&&M()});const z=D.querySelector("#settings"),L=D.createElement("fieldset");L.style.cssText="border:0;padding:0;max-height:180px;overflow:auto";const K=D.createElement("legend");K.textContent="本任务的指标范围",L.append(K);for(const $ of n.sources){const ae=D.createElement("label");ae.style.cssText="display:flex;gap:8px;margin:8px 0";const N=D.createElement("input");N.type="checkbox",N.value=$.id,N.dataset.contextSource="",N.checked=b.includes($.id),N.style.width="auto",ae.append(N,D.createTextNode($.name)),L.append(ae)}(J=z.querySelector("p"))==null||J.replaceWith(L);const ce=D.createElement("button");ce.textContent="数据库设置",ce.type="button",ce.onclick=()=>{var $;z.close(),($=a.openSettings)==null||$.call(a)},L.after(ce);const se=D.querySelector("footer");for(const[$,ae]of[["test","测试发送"],["today","发送今日消息"]]){const N=D.createElement("button");N.textContent=ae,N.dataset.send=$,N.onclick=async()=>{const V=D.querySelector("#editor");V.contentEditable="false";try{await B.send(V,$,D.querySelector("#date").value)}catch(ee){C(String(ee))}finally{V.contentEditable="true"}},se.append(N)}const ye=D.createElement("style");ye.textContent=Q0+`
`+J0+`
body{font-family:var(--font-ui)}#date-picker{width:154px}`,D.head.append(ye);const P=D.createElement("span");P.className="production-message-demo",P.hidden=!0,D.body.append(P),u=jf.createRoot(D.querySelector("#date-picker")),u.render(l.jsx(aA,{input:D.querySelector("#date")})),window.addEventListener("production-settings-updated",A);const oe=D.querySelector("#runs");if(oe.ontoggle=async()=>{if(!oe.open)return;const $=oe.querySelector("p");$.textContent="正在读取…";try{const ae=await fe("daily.runs",{id:_});$.textContent=ae.runs.length?"":"暂无运行记录";for(const N of ae.runs){const V=D.createElement("div");V.textContent=`${N.time} · ${N.status} · ${N.businessDate}${N.error?" · "+N.error:""}`,$.append(V)}}catch(ae){$.textContent=String(ae)}},!n.notificationConfigured){const $=D.createElement("div");$.className="notice",$.dataset.notificationNotice="",$.append(D.createTextNode("通知渠道尚未配置。 "));const ae=D.createElement("button");ae.textContent="通知设置",ae.onclick=a.openSettings||null,$.append(ae),D.querySelector("#message").before($)}T(),R().catch($=>C(String($)))},dispose(){s=!0,m++,u==null||u.unmount(),window.removeEventListener("production-settings-updated",A)}};return B}function aA({input:n}){const[a,s]=S.useState(n.value);return l.jsx(Kt,{value:a,onChange:o=>{var u;s(o),n.value=o,n.dispatchEvent(new(((u=n.ownerDocument.defaultView)==null?void 0:u.Event)||Event)("change",{bubbles:!0}))}})}const iA=`<!doctype html>
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
`,Wv=()=>{const n=new Date;return n.setDate(n.getDate()-1),`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`};function n1({id:n,...a}){const s=S.useRef(null),[o,u]=S.useState("");return S.useEffect(()=>{let h=!1,d;const m=s.current;return u(""),fe("notionFill.get",{id:n}).then(p=>{h||(d=sA(p,a),m.onload=()=>{var g;!h&&((g=m.contentDocument)!=null&&g.getElementById("date-picker"))&&d.connect(m.contentDocument)},m.srcdoc=iA.replace("../../src/ProductionAssistant.App/Assets/Fonts/Inter.ttf",new URL(W0,window.location.href).href).replace("../../src/ProductionAssistant.App/Assets/Fonts/NotoSansSC.ttf",new URL(I0,window.location.href).href))}).catch(p=>{h||u(String(p.message||p))}),()=>{h=!0,m.onload=null,d==null||d.dispose()}},[n]),l.jsxs("div",{className:"message-template-host",children:[o&&l.jsx("p",{role:"alert",children:o}),l.jsx("iframe",{ref:s,title:"原材料自动入库"})]})}function sA(n,a){let s={...n,runTime:n.runTime||"00:00"},o,u,h=!1,d=!1,m=0,p=0,g=Wv(),v,x=s.isEnabled;const b=$=>o.getElementById($),j=$=>b($),E=$=>b($),C=$=>b($),T=$=>$ instanceof Error?$.message:String($),k=$=>$.toLocaleString("zh-CN",{minimumFractionDigits:3,maximumFractionDigits:3});function A($,ae=!1){b("feedback").textContent=$,b("feedback").className=ae?"callout error":""}function R(){return!!(s.sourcePageUrl&&s.username&&s.passwordConfigured)}function _(){u==null||u.render(l.jsx(Kt,{value:g,disabled:d,onChange:D}))}function B(){for(const $ of["preview","source-test","yesterday","settings-open","back","confirm-run"])E($).disabled=d;E("preview").disabled=d||!R()||!s.notionConfigured,E("source-test").disabled=d||!R(),E("run").disabled=d||!v,o.querySelectorAll("#settings button, #settings input").forEach($=>$.disabled=d),E("toggle").disabled=d||!s.schedulingAvailable,E("preview").textContent=d?"处理中…":"生成预览",b("name").textContent=s.name,b("enabled").textContent=s.isEnabled?s.schedulerInstalled?"已启用":"计划异常":"未启用",b("target-name").textContent=s.targetDataSourceName,b("settings-target-name").textContent=s.targetDataSourceName,j("password").placeholder=s.passwordConfigured?"已保存；留空不修改":"请输入 93 系统密码",_()}function Y($="尚未生成预览"){m++,v=void 0,b("source-empty").hidden=!1,b("source-values").hidden=!0,b("source-error").hidden=!0,b("record").hidden=!0,b("target-status").hidden=!0,b("target-empty").hidden=!1,b("target-empty").querySelector("strong").textContent=$,b("target-empty").querySelector("span").textContent="预览只读取数据，不会新增记录",E("run").textContent="执行本日期",E("run").disabled=!0,C("confirm").open&&C("confirm").close()}function D($){d||(g=$,j("date").value=$,Y("待重新预览"),A(""),_())}function H($){b("source-empty").hidden=!0,b("source-values").hidden=!1;for(const[ae,N]of[["plate",$.plateWeight],["section",$.sectionWeight],["total",$.totalWeight]])b(ae).textContent=k(N)}function M($){H($),b("target-empty").hidden=!0,b("record").hidden=!1,b("record-title").textContent=`${$.businessDate} 入库`,b("record-date").textContent=$.businessDate,b("record-plate").textContent=`${k($.plateWeight)} 吨`,b("record-section").textContent=`${k($.sectionWeight)} 吨`,b("target-status").hidden=!1,b("target-status").textContent=$.targetRecordExists?"该日期已有记录，无需新增。":"可新增 1 条入库记录。",E("run").textContent=$.targetRecordExists?"验证查重":"执行本日期"}function z($){b("run-count").textContent=$.length?`· ${$.length}`:"";const ae=$.map(N=>{const V=o.createElement("div");V.className="run";const ee=o.createElement("span");ee.textContent={"source-test":"93 测试",test:"只读预览",manual:"手动执行",automatic:"自动执行"}[N.source]||N.source;const le=o.createElement("div");le.textContent=N.error||N.message||(N.status==="created"?"已新增":N.status==="failed"?"执行失败":"已检查"),N.status==="failed"&&(le.style.color="#B91C1C");const de=o.createElement("p");de.textContent=N.status==="failed"?N.businessDate:`${N.businessDate} · 板材 ${k(N.plateWeight)} 吨 · 型材 ${k(N.sectionWeight)} 吨`,le.append(de);const me=o.createElement("small");return me.textContent=N.time,V.append(ee,le,me),V});b("runs-body").replaceChildren(...ae),$.length||(b("runs-body").textContent="暂无运行记录")}async function L(){const $=++p;try{const ae=await fe("notionFill.runs",{id:s.id});!h&&$===p&&z(ae.runs)}catch(ae){!h&&$===p&&(b("runs-body").textContent=`运行记录读取失败：${T(ae)}；重新展开可重试。`)}}function K(){Promise.resolve(a.changed()).catch(()=>{})}async function ce($){if(d||!g)return;d=!0,Y("正在读取…");const ae=m;B(),A("");try{const N=await fe($?"notionFill.testSource":"notionFill.test",{id:s.id,businessDate:g},12e4);if(h||ae!==m)return;if(!N.succeeded)throw new Error(N.message||"读取失败");$?(H(N),b("target-empty").querySelector("strong").textContent="尚未检查 Notion",b("target-empty").querySelector("span").textContent="点击“生成预览”完成读取与查重"):(s.validated=!0,v=N,M(N)),K()}catch(N){if(h||ae!==m)return;Y("本次预览未完成"),b("source-error").hidden=!1,b("source-error").textContent=T(N)}finally{h||(d=!1,B(),L())}}async function se(){if(d||!v||!C("confirm").open)return;const $=v.businessDate;C("confirm").close(),d=!0,B(),A("");try{const ae=await fe("notionFill.runNow",{id:s.id,businessDate:$},12e4);if(h)return;if(!ae.succeeded)throw new Error(ae.message||"执行失败");v={...v,targetRecordExists:!0},b("target-status").textContent=ae.message,E("run").textContent="验证查重",A(ae.created?"Notion 写入成功。":"该日期已有记录，本次已跳过。"),K()}catch(ae){h||(Y("执行未完成，请重新预览"),A(T(ae),!0))}finally{h||(d=!1,B(),L())}}function ye(){return j("task-name").value.trim()!==s.name||j("url").value.trim().replace(/\/+$/,"")!==s.sourcePageUrl||j("username").value.trim()!==s.username||!!j("password").value}function P(){E("toggle").setAttribute("aria-checked",String(x)),b("schedule-hint").textContent=s.schedulingAvailable?ye()?"配置已修改：保存后需重新预览，再启用。":s.isEnabled&&!s.schedulerInstalled?s.schedulerMessage:s.validated?"只读预览已通过，可以启用定时入库。":"完成一次“生成预览”后可启用。":"当前运行环境不支持定时启停，预览与手动执行仍可使用。"}async function oe($){if($.preventDefault(),d)return;const ae=j("task-name").value.trim(),N=j("username").value.trim();if(!ae||!N){b("settings-note").textContent="任务名称和用户名不能为空。";return}const V=ye(),ee=j("run-time").value;if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(ee)){b("settings-note").textContent="请选择有效的执行时间。";return}const le=V||ee!==s.runTime,de=V?!1:x;let me=!1;d=!0,B();try{if(le){const ie=j("url").value.trim().replace(/\/+$/,""),W=j("password").value;if(await fe("notionFill.save",{id:s.id,name:ae,sourcePageUrl:ie,username:N,password:W,runTime:ee}),h)return;me=!0,s={...s,name:ae,sourcePageUrl:ie,username:N,runTime:ee,passwordConfigured:s.passwordConfigured||!!W,isEnabled:V?!1:s.isEnabled,validated:V?!1:s.validated},j("password").value="",V&&Y("配置已修改，请重新预览")}if(de!==s.isEnabled){const ie=await fe("automation.setEnabled",{id:s.id,taskType:"notion_fill",enabled:de});if(h)return;if(s.isEnabled=ie.enabled,ie.enabled!==de)throw new Error(ie.message||"定时任务状态未更新");me=!0}const xe=await fe("notionFill.get",{id:s.id});if(h)return;s=xe,C("settings").close(),A(V?"配置已保存，请重新预览后启用。":"任务设置已保存。")}catch(xe){h||(b("settings-note").textContent=`${me?"设置已更新，但后续操作失败：":""}${T(xe)}`)}finally{h||(d=!1,x=s.isEnabled,B(),P(),me&&K())}}async function J(){if(d||h)return;const $=m;try{const ae=await fe("notionFill.get",{id:s.id});if(h||d||$!==m)return;s=ae,Y("系统设置已更新，请重新预览"),B(),A(s.notionConfigured?"系统设置已更新，点击“生成预览”读取数据。":"Notion 连接尚未配置，仍可仅测试 93 读取。")}catch(ae){h||A(T(ae),!0)}}return{connect($){u==null||u.unmount(),o=$;const ae=o.createElement("style");ae.textContent=Q0+`
`+J0+`
body{color:#292524}#date-picker{width:163px;display:inline-block}`,o.head.append(ae);const N=o.createElement("span");N.className="production-message-demo",N.hidden=!0,o.body.append(N),u=jf.createRoot(b("date-picker")),j("date").value=g,j("date").onchange=()=>D(j("date").value),E("yesterday").onclick=()=>D(Wv()),E("preview").onclick=()=>{ce(!1)},E("source-test").onclick=()=>{ce(!0)},E("back").onclick=a.back,E("run").onclick=()=>{d||!v||(b("confirm-title").textContent=v.targetRecordExists?"验证查重":"执行本日期",b("confirm-copy").textContent=v.targetRecordExists?`${v.businessDate} 已有记录，本次执行应跳过。`:`将向“${s.targetDataSourceName}”新增 ${v.businessDate} 的记录：板材 ${k(v.plateWeight)} 吨，型材 ${k(v.sectionWeight)} 吨。`,C("confirm").showModal())},E("confirm-run").onclick=()=>{se()},E("settings-open").onclick=()=>{j("task-name").value=s.name,j("url").value=s.sourcePageUrl,j("username").value=s.username,j("password").value="",j("run-time").value=s.runTime,j("password").required=!s.passwordConfigured,b("settings-note").textContent="修改名称或连接后，需重新预览并启用定时任务。",x=s.isEnabled,P(),C("settings").showModal()},E("toggle").onclick=()=>{if(s.schedulingAvailable){if(!x&&(!s.validated||ye())){b("schedule-hint").textContent="请先保存配置并完成“生成预览”，再启用定时入库。";return}x=!x,P()}};for(const V of["task-name","url","username","password"])j(V).oninput=()=>{ye()&&(x=!1),P()};b("settings-form").onsubmit=V=>{oe(V)},C("settings").onclose=()=>{j("password").value=""},C("settings").oncancel=V=>{d&&V.preventDefault()},o.querySelectorAll("[data-close]").forEach(V=>V.onclick=()=>{d||C(V.dataset.close).close()}),E("system-settings").hidden=!a.openSettings,E("system-settings").onclick=()=>{var V;C("settings").close(),(V=a.openSettings)==null||V.call(a)},o.querySelector(".runs").ontoggle=V=>{V.currentTarget.open&&L()},window.addEventListener("production-settings-updated",J),Y(),B(),R()?s.notionConfigured||A("Notion 连接尚未配置，请从任务设置打开系统设置；仍可仅测试 93 读取。"):A("请先在任务设置中补全 93 系统连接配置。")},dispose(){h=!0,m++,p++,u==null||u.unmount(),window.removeEventListener("production-settings-updated",J)}}}function lA({onCreated:n,onBack:a,onCancel:s}){const[o,u]=S.useState(2),[h,d]=S.useState("日报任务"),[m,p]=S.useState("17:30"),[g,v]=S.useState(!1),[x,b]=S.useState("");async function j(){v(!0),b("");try{const E=await fe("daily.create",{name:h.trim(),sendTime:m});await n(E)}catch(E){b(E instanceof Error?E.message:String(E))}finally{v(!1)}}return l.jsxs(l.Fragment,{children:[l.jsx(oA,{current:o}),x&&l.jsx("div",{className:"notice error",role:"alert",children:l.jsxs("div",{children:[l.jsx("strong",{children:"创建失败"}),l.jsx("span",{children:x})]})}),o===2?l.jsxs("div",{className:"automation-create-step",children:[l.jsxs("div",{children:[l.jsx("h3",{children:"基本信息"}),l.jsx("p",{children:"名称用于在自动化任务列表中识别这份日报。"})]}),l.jsxs("label",{children:["任务名称",l.jsx("input",{value:h,autoFocus:!0,onChange:E=>d(E.target.value)})]}),l.jsxs("div",{className:"dialog-actions",children:[l.jsxs("button",{className:"ghost",onClick:a,children:[l.jsx(ps,{}),"返回选择类型"]}),l.jsx("button",{className:"primary",disabled:!h.trim(),onClick:()=>u(3),children:"下一步"})]})]}):l.jsxs("div",{className:"automation-create-step",children:[l.jsxs("div",{children:[l.jsx("h3",{children:"日报必要配置"}),l.jsx("p",{children:"先确定每天的发送时间；消息字段和测试发送在创建后的专用 Tab 中完成。"})]}),l.jsxs("label",{children:["每天发送时间",l.jsx("input",{type:"time",value:m,onChange:E=>p(E.target.value)})]}),l.jsxs("div",{className:"automation-create-summary",children:[l.jsx("span",{children:"任务类型"}),l.jsx("strong",{children:"日报推送"}),l.jsx("span",{children:"创建后继续"}),l.jsx("strong",{children:"消息内容 → 预览与测试"})]}),l.jsxs("div",{className:"dialog-actions",children:[l.jsxs("button",{className:"ghost",disabled:g,onClick:()=>u(2),children:[l.jsx(ps,{}),"上一步"]}),l.jsx("button",{className:"secondary",disabled:g,onClick:s,children:"取消"}),l.jsxs("button",{className:"primary",disabled:g||!m,onClick:j,children:[g&&l.jsx(yn,{className:"spin"}),"创建任务"]})]})]})]})}function oA({current:n}){return l.jsxs("ol",{className:"automation-create-progress","aria-label":"新建任务进度",children:[l.jsx("li",{className:"done",children:"1 选择类型"}),l.jsx("li",{className:n===2?"current":"done",children:"2 基本信息"}),l.jsx("li",{className:n===3?"current":"",children:"3 必要配置"})]})}function cA({onCreated:n,onBack:a,onCancel:s}){const[o,u]=S.useState(2),[h,d]=S.useState("原材料入库自动填报"),[m,p]=S.useState(""),[g,v]=S.useState(""),[x,b]=S.useState(""),[j,E]=S.useState(!1),[C,T]=S.useState("");async function k(){E(!0),T("");try{const A=await fe("notionFill.create",{name:h.trim(),sourcePageUrl:m.trim(),username:g.trim(),password:x});await n(A)}catch(A){T(A instanceof Error?A.message:String(A))}finally{E(!1)}}return l.jsxs(l.Fragment,{children:[l.jsx(uA,{current:o}),C&&l.jsx("div",{className:"notice error",role:"alert",children:l.jsxs("div",{children:[l.jsx("strong",{children:"创建失败"}),l.jsx("span",{children:C})]})}),o===2?l.jsxs("div",{className:"automation-create-step",children:[l.jsxs("div",{children:[l.jsx("h3",{children:"基本信息"}),l.jsx("p",{children:"名称用于在自动化任务列表中识别这份填报任务。"})]}),l.jsxs("label",{children:["任务名称",l.jsx("input",{value:h,autoFocus:!0,onChange:A=>d(A.target.value)})]}),l.jsxs("div",{className:"dialog-actions",children:[l.jsxs("button",{className:"ghost",onClick:a,children:[l.jsx(ps,{}),"返回选择类型"]}),l.jsx("button",{className:"primary",disabled:!h.trim(),onClick:()=>u(3),children:"下一步"})]})]}):l.jsxs("div",{className:"automation-create-step",children:[l.jsxs("div",{children:[l.jsx("h3",{children:"93 系统连接"}),l.jsx("p",{children:"凭据只归 NotionFill 任务所有，并使用现有 Windows 加密存储。"})]}),l.jsxs("label",{children:["材料入库业务页面",l.jsx("input",{type:"url",value:m,placeholder:"http://服务器/业务页面",autoFocus:!0,onChange:A=>p(A.target.value)})]}),l.jsxs("label",{children:["93 系统用户名",l.jsx("input",{value:g,autoComplete:"username",onChange:A=>v(A.target.value)})]}),l.jsxs("label",{children:["93 系统密码",l.jsx("input",{type:"password",value:x,autoComplete:"new-password",onChange:A=>b(A.target.value)})]}),l.jsxs("div",{className:"automation-create-summary",children:[l.jsx("span",{children:"填报目标"}),l.jsx("strong",{children:"原材料入库数据库"}),l.jsx("span",{children:"执行时间"}),l.jsx("strong",{children:"每天 00:00 · 填报前一天"}),l.jsx("span",{children:"写入方式"}),l.jsx("strong",{children:"按日期查重，仅新增"})]}),l.jsxs("div",{className:"dialog-actions",children:[l.jsxs("button",{className:"ghost",disabled:j,onClick:()=>u(2),children:[l.jsx(ps,{}),"上一步"]}),l.jsx("button",{className:"secondary",disabled:j,onClick:s,children:"取消"}),l.jsxs("button",{className:"primary",disabled:j||!m.trim()||!g.trim()||!x,onClick:k,children:[j&&l.jsx(yn,{className:"spin"}),"创建任务"]})]})]})]})}function uA({current:n}){return l.jsxs("ol",{className:"automation-create-progress","aria-label":"新建任务进度",children:[l.jsx("li",{className:"done",children:"1 选择类型"}),l.jsx("li",{className:n===2?"current":"done",children:"2 基本信息"}),l.jsx("li",{className:n===3?"current":"",children:"3 必要配置"})]})}const r1=[{taskType:"tencent_sheet_fill",name:"腾讯文档填报",includeBasics:!1,description:"录制文档控件与业务位置，按执行规则从 Notion 取数填报。",renderCreate:n=>l.jsx(QD,{...n}),taskTabs:[{id:"configuration",label:"配置与填报"}],resolveSection:()=>"configuration",issueTitle:()=>"请完成文档连接与位置检查",renderEditor:n=>l.jsx(Z0,{id:n.id,changed:n.changed},n.id),loadRuns:n=>fe("tencentSheet.runs",{id:n}).then(({runs:a})=>a.map(s=>({...s,source:s.source==="background-test"?"后台自动测试":s.source==="automatic"?"定时填报":"前台测试",title:s.businessDate,details:s.message?[s.message]:[]})))},{taskType:"daily_report",name:"日报推送",description:"查询日报数据、生成消息并发送钉钉。",renderCreate:n=>l.jsx(lA,{...n}),taskTabs:[{id:"configuration",label:"任务配置"},{id:"execution",label:"运行与测试"}],resolveSection:n=>n==="basics"?"basics":n==="template"?"configuration":"execution",issueTitle:n=>n==="notification"?"通知渠道未就绪":n==="template"?"日报配置尚未验证":"基本信息不完整",renderEditor:n=>l.jsx(t1,{id:n.id,back:()=>n.navigate("list"),changed:n.changed,openSettings:n.openSettings}),loadRuns:n=>fe("daily.runs",{id:n}).then(({runs:a})=>a.map(s=>({id:s.id,time:s.time,source:s.source,status:s.status,title:s.textSummary||`业务日期 ${s.businessDate||"—"}`,details:[`业务日期：${s.businessDate||"—"}`,`阶段：${s.stage}`,`尝试：${s.attempts}`],error:s.error})))},{taskType:"notion_fill",name:"Notion 自动填报",description:"读取 93 系统前一天入库数据并新增到 Notion。",renderCreate:n=>l.jsx(cA,{...n}),taskTabs:[{id:"configuration",label:"任务配置"},{id:"execution",label:"运行与测试"}],resolveSection:n=>n==="basics"?"basics":n==="test"?"execution":"configuration",issueTitle:n=>n==="connection"?"93 系统连接未就绪":n==="target"?"Notion 填报目标未就绪":n==="test"?"任务尚未完成只读测试":"基本信息不完整",renderEditor:n=>l.jsx(n1,{id:n.id,back:()=>n.navigate("list"),changed:n.changed,openSettings:n.openSettings}),loadRuns:n=>fe("notionFill.runs",{id:n}).then(({runs:a})=>a.map(s=>({id:s.id,time:s.time,source:s.source==="source-test"?"93读取测试":s.source==="test"?"只读测试":s.source==="manual"?"手动执行":"自动执行",status:s.status==="created"?"已新增":s.status==="checked"?"已检查":"失败",title:`${s.businessDate} · 板材 ${s.plateWeight.toLocaleString("zh-CN",{maximumFractionDigits:3})} 吨 · 型材 ${s.sectionWeight.toLocaleString("zh-CN",{maximumFractionDigits:3})} 吨`,details:[s.message].filter(Boolean),error:s.error})))}];function Iv(n){return r1.find(a=>a.taskType===n)}const kd=n=>({tone:"error",title:"操作失败",message:n instanceof Error?n.message:String(n)});function dA({openSettings:n}){var M;const[a,s]=S.useState([]),[o,u]=S.useState(),[h,d]=S.useState(""),[m,p]=S.useState(""),[g,v]=S.useState(),[x,b]=S.useState(),[j,E]=S.useState(),[C,T]=S.useState(!1),[k,A]=S.useState(""),[R,_]=S.useState(["daily_report","notion_fill"]),B=()=>fe("automation.list").then(z=>{z.availableTaskTypes&&_(z.availableTaskTypes);const L=Array.isArray(z.tasks)?z.tasks:a;return s(L),u(K=>K&&(L.find(ce=>ce.taskType===K.taskType&&ce.id===K.id)||K)),L});S.useEffect(()=>{B().catch(z=>v(kd(z)))},[]),S.useEffect(()=>{if(!x)return;const z=()=>b(void 0),L=K=>K.key==="Escape"&&z();return window.addEventListener("pointerdown",z),window.addEventListener("keydown",L),window.addEventListener("blur",z),()=>{window.removeEventListener("pointerdown",z),window.removeEventListener("keydown",L),window.removeEventListener("blur",z)}},[x]);async function Y(z,L){const K=await B();T(!1),A(""),u(K.find(ce=>ce.taskType===z&&ce.id===L.id))}async function D(z){p(z.id),v(void 0);try{const L=await fe("automation.setEnabled",{taskType:z.taskType,id:z.id,enabled:!z.isEnabled},6e4);L.missingStep?(d(L.missingStep),u(z),v({tone:"warning",title:"配置尚未完成",message:L.message||""})):await B()}catch(L){v(kd(L))}finally{p("")}}async function H(z){if(!z.isEnabled){p(z.id);try{await fe("automation.delete",{taskType:z.taskType,id:z.id}),E(void 0),await B()}catch(L){v(kd(L))}finally{p("")}}}if(o){const z=Iv(o.taskType);if(z)return l.jsx(fA,{openSettings:n,task:o,definition:z,focusStep:h,notice:g,refresh:B,back:()=>{u(void 0),d(""),v(void 0),B()}})}return l.jsxs("div",{className:"page daily-page automation-list-page",children:[l.jsxs("header",{children:[l.jsxs("div",{children:[l.jsx("h1",{children:"自动化任务"}),l.jsx("p",{children:"管理定时推送与自动填报，查看任务配置和运行情况。"})]}),l.jsx("div",{className:"header-actions",children:l.jsxs("button",{className:"primary",onClick:()=>T(!0),children:[l.jsx(KC,{}),"新建任务"]})})]}),g&&l.jsx("div",{className:`notice ${g.tone}`,role:"status",children:l.jsxs("div",{children:[l.jsx("strong",{children:g.title}),l.jsx("span",{children:g.message})]})}),l.jsxs("section",{className:"daily-job-list","aria-label":"任务列表",children:[a.map(z=>l.jsxs("article",{className:`daily-job-card${["incomplete","pending-test","schedule-error"].includes(z.status)?" needs-attention":""}`,onClick:()=>u(z),onContextMenu:L=>{L.preventDefault(),b({task:z,x:Math.min(L.clientX,window.innerWidth-176),y:Math.min(L.clientY,window.innerHeight-58)})},children:[l.jsxs("div",{className:"job-copy",children:[l.jsx("h2",{children:l.jsx("button",{type:"button",className:"automation-task-name",onClick:L=>{L.stopPropagation(),u(z)},children:z.name||"未命名任务"})}),l.jsxs("p",{children:[z.taskTypeName," · ",z.schedule," · ",z.connectionStatus]})]}),l.jsxs("div",{className:"job-actions",onClick:L=>L.stopPropagation(),children:[l.jsx("span",{className:`job-status ${z.status}`,children:a1(z.status)}),l.jsxs("label",{className:"switch",children:[l.jsx("input",{type:"checkbox","aria-label":`启用${z.name||"未命名任务"}`,checked:z.isEnabled,disabled:!z.schedulingAvailable||m===z.id,title:z.schedulingAvailable?void 0:"Development 环境默认不启用定时任务",onChange:()=>D(z)}),l.jsx("span",{})]}),l.jsx("button",{type:"button",className:"automation-task-more","aria-label":`${z.name||"未命名任务"}的更多操作`,"aria-haspopup":"menu",onClick:L=>{const K=L.currentTarget.getBoundingClientRect();b({task:z,x:Math.min(K.left,window.innerWidth-176),y:Math.min(K.bottom+4,window.innerHeight-58)})},children:l.jsx(FC,{})})]}),l.jsxs("div",{className:"automation-card-footer",children:["最近运行：",z.lastRun]})]},`${z.taskType}:${z.id}`)),!a.length&&l.jsxs("div",{className:"empty-state",children:[l.jsx($C,{}),l.jsx("h2",{children:"还没有自动化任务"}),l.jsx("p",{children:"选择一种任务类型，新建后进入对应的专用配置界面。"})]})]}),!!a.length&&l.jsx("p",{className:"automation-list-help",children:"点击任务名称进入配置。日报配置通知后即可开启，执行结果见运行记录。"}),x&&l.jsx("div",{className:"job-context-menu",role:"menu",style:{left:x.x,top:x.y},onPointerDown:z=>z.stopPropagation(),children:l.jsxs("button",{className:"danger-quiet",role:"menuitem",disabled:x.task.isEnabled||m===x.task.id,onClick:()=>{E(x.task),b(void 0)},children:[l.jsx(IC,{}),x.task.isEnabled?"停用后可删除":"删除任务"]})}),l.jsx(gs,{open:!!j,onOpenChange:z=>!z&&E(void 0),children:l.jsxs(ys,{children:[l.jsx(vs,{className:"dialog-overlay"}),l.jsxs(bs,{className:"dialog",children:[l.jsx(Ss,{children:"删除自动化任务？"}),l.jsxs(js,{children:["将删除“",j==null?void 0:j.name,"”及其业务记录，此操作无法撤销。"]}),l.jsxs("div",{className:"dialog-actions",children:[l.jsx("button",{className:"secondary",onClick:()=>E(void 0),children:"取消"}),l.jsx("button",{className:"danger",disabled:!!m,onClick:()=>j&&H(j),children:"确认删除"})]})]})]})}),l.jsx(gs,{open:C,onOpenChange:z=>{T(z),z||A("")},children:l.jsxs(ys,{children:[l.jsx(vs,{className:"dialog-overlay"}),l.jsxs(bs,{className:"dialog automation-create-dialog",children:[l.jsx(Ss,{children:"新建自动化任务"}),l.jsx(js,{children:k?"填写任务信息，创建后可随时通过 Tab 修改。":"先选择任务类型，后续配置由对应任务自己提供。"}),k?(M=Iv(k))==null?void 0:M.renderCreate({onCreated:z=>Y(k,z),onBack:()=>A(""),onCancel:()=>{T(!1),A("")}}):l.jsx("div",{className:"automation-create-types",children:r1.filter(z=>R.includes(z.taskType)).map(z=>l.jsxs("button",{onClick:()=>A(z.taskType),children:[l.jsx("strong",{children:z.name}),l.jsx("span",{children:z.description})]},z.taskType))})]})]})})]})}function fA({openSettings:n,task:a,definition:s,focusStep:o,notice:u,refresh:h,back:d}){const[m,p]=S.useState(o?s.resolveSection(o):s.includeBasics===!1?s.taskTabs[0].id:"basics"),g=a.taskType==="daily_report",[v,x]=S.useState(),[b,j]=S.useState(""),[E,C]=S.useState(!1),T=[...s.includeBasics===!1?[]:[{id:"basics",label:"基本信息"}],...s.taskTabs,{id:"runs",label:"运行记录"}],k=[...a.missingMessage?[{id:`configuration:${a.missingStep||"unknown"}`,title:s.issueTitle(a.missingStep||""),message:a.missingMessage,section:s.resolveSection(a.missingStep||"")}]:[],...a.status==="schedule-error"&&a.schedulerMessage?[{id:"scheduler",title:"计划任务异常",message:a.schedulerMessage,section:"basics"}]:[]];async function A(){C(!0),j("");try{x(await s.loadRuns(a.id))}catch(_){j(_ instanceof Error?_.message:String(_))}finally{C(!1)}}S.useEffect(()=>{m==="runs"&&v===void 0&&A()},[m,v]);function R(_,B){var D;if(_.key!=="ArrowLeft"&&_.key!=="ArrowRight")return;_.preventDefault();const Y=(B+(_.key==="ArrowRight"?1:-1)+T.length)%T.length;p(T[Y].id),T[Y].id==="basics"&&h().catch(()=>{}),(D=document.getElementById(`automation-tab-${T[Y].id}`))==null||D.focus()}return a.taskType==="tencent_sheet_fill"?l.jsx(Z0,{id:a.id,name:a.name,back:d,changed:()=>{h().catch(()=>{})}},a.id):g?l.jsx(t1,{id:a.id,back:d,changed:h,openSettings:n}):a.taskType==="notion_fill"?l.jsx(n1,{id:a.id,back:d,changed:h,openSettings:n}):l.jsxs("div",{className:"page daily-page automation-detail",children:[l.jsxs("header",{children:[l.jsxs("div",{children:[l.jsxs("button",{className:"back-link","aria-label":"返回任务列表",onClick:d,children:[l.jsx(ps,{}),"返回任务列表"]}),l.jsx("h1",{title:a.name||"未命名任务",children:a.name||"未命名任务"}),l.jsxs("p",{children:[a.taskTypeName," · ",a.schedule]})]}),l.jsx("span",{className:`job-status ${a.status}`,children:a1(a.status)})]}),l.jsx("div",{className:"automation-tabs",role:"tablist","aria-label":"任务详情",children:T.map((_,B)=>l.jsx("button",{type:"button",role:"tab",id:`automation-tab-${_.id}`,"aria-selected":m===_.id,"aria-controls":`automation-panel-${_.id}`,tabIndex:m===_.id?0:-1,onClick:()=>{p(_.id),_.id==="basics"&&h().catch(()=>{})},onKeyDown:Y=>R(Y,B),children:_.label},_.id))}),l.jsxs("div",{children:[u&&l.jsx("div",{className:`notice ${u.tone}`,role:"status",children:l.jsxs("div",{children:[l.jsx("strong",{children:u.title}),l.jsx("span",{children:u.message})]})}),!!k.length&&l.jsxs("section",{className:"automation-issues","aria-labelledby":"automation-issues-title",children:[l.jsxs("div",{className:"automation-issues-heading",children:[l.jsx(eN,{}),l.jsxs("div",{children:[l.jsx("h2",{id:"automation-issues-title",children:"配置问题"}),l.jsx("p",{children:"完成以下项目后才能安全启用任务。"})]}),l.jsxs("span",{children:[k.length," 项"]})]}),l.jsx("ul",{children:k.map(_=>{var B;return l.jsxs("li",{children:[l.jsxs("div",{children:[l.jsx("strong",{children:_.title}),l.jsx("span",{children:_.message})]}),l.jsxs("button",{type:"button",onClick:()=>{p(_.section)},children:["前往",((B=T.find(Y=>Y.id===_.section))==null?void 0:B.label)||"处理",l.jsx(LC,{})]})]},_.id)})})]}),l.jsxs("div",{className:"automation-tab-panel",role:"tabpanel",id:`automation-panel-${m}`,"aria-labelledby":`automation-tab-${m}`,children:[l.jsx("div",{hidden:m==="runs",children:s.renderEditor({id:a.id,section:m,openSettings:n,navigate:p,changed:()=>{h().catch(()=>{})}})}),m==="runs"&&l.jsxs("section",{className:"surface automation-runs",children:[l.jsxs("div",{className:"automation-runs-heading",children:[l.jsxs("div",{children:[l.jsx("h2",{children:"运行记录"}),l.jsx("p",{children:"查看任务执行结果和错误详情。"})]}),l.jsxs("button",{className:"secondary",disabled:E,onClick:A,children:[E?l.jsx(yn,{className:"spin"}):l.jsx(ZC,{}),"刷新"]})]}),b&&l.jsx("div",{className:"notice error",role:"alert",children:l.jsxs("div",{children:[l.jsx("strong",{children:"运行记录读取失败"}),l.jsx("span",{children:b})]})}),l.jsx("div",{className:"automation-run-list",children:v==null?void 0:v.map(_=>l.jsxs("details",{children:[l.jsxs("summary",{children:[l.jsx("span",{children:_.time}),l.jsx("span",{children:_.source}),l.jsx("strong",{children:_.title}),l.jsx("b",{className:_.error?"error-text":"",children:_.status})]}),l.jsxs("div",{children:[_.details.map(B=>l.jsx("p",{children:B},B)),_.error&&l.jsxs("p",{className:"run-error",children:["错误：",_.error]})]})]},_.id))}),!E&&v&&!v.length&&l.jsx("p",{className:"automation-empty",children:"暂无运行记录"})]})]})]})]})}function a1(n){return{incomplete:"配置未完成","pending-test":"待测试",checked:"已验证",ready:"可启用",enabled:"已启用","schedule-error":"计划异常"}[n]||n}function ex({value:n,onChange:a,unit:s,className:o="",disabled:u,ariaLabel:h,onKeyDown:d}){return l.jsxs("div",{className:`numeric-input ${o}`.trim(),children:[l.jsx("input",{type:"text",inputMode:"decimal",value:n,disabled:u,"aria-label":h,onChange:m=>a(m.target.value),onKeyDown:d}),s&&l.jsx("span",{children:s})]})}function i1({current:n,titles:a,label:s}){const o=a.map((u,h)=>({number:h+1,title:u}));return l.jsx("div",{className:"step-bar","aria-label":s,children:o.map((u,h)=>{const d=u.number<n?"done":u.number===n?"active":"pending";return l.jsxs(S.Fragment,{children:[l.jsxs("div",{className:`step step-${d}`,"aria-current":d==="active"?"step":void 0,children:[l.jsx("div",{className:`step-circle ${d}`,children:d==="done"?l.jsx(ii,{}):u.number}),l.jsx("span",{children:u.title})]}),h<o.length-1&&l.jsx("div",{className:`step-line ${u.number<n?"done":u.number===n?"transition":"pending"}`})]},u.number)})})}const tx={configured:!1,binding:{bound:!1,name:"",path:""},usesBusinessSections:!1,businessSections:[],sources:[],selected:""};function hA(){const n=new Date;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`}function mA({openSettings:n}){const[a,s]=S.useState(1),[o,u]=S.useState(hA),[h,d]=S.useState(""),[m,p]=S.useState([]),[g,v]=S.useState(tx),[x,b]=S.useState(!1),[j,E]=S.useState("database"),[C,T]=S.useState(""),[k,A]=S.useState(""),[R,_]=S.useState(!1),[B,Y]=S.useState("state"),[D,H]=S.useState(""),[M,z]=S.useState(""),[L,K]=S.useState(),ce=S.useRef(!1),se=S.useRef(!1);S.useEffect(()=>{fe("weld.getState").then(W=>{var ne;const he=W!=null&&W.binding&&Array.isArray(W.sources)?W:tx;v(he),T(((ne=he.sources.find(ue=>ue.id===he.selected))==null?void 0:ne.businessSection)||""),A(he.selected)}).catch(W=>H(W instanceof Error?W.message:"读取 Notion 配置失败")).finally(()=>Y(void 0))},[]);const ye=/^\d+$/.test(h)&&Number(h)>0,P=S.useMemo(()=>m.reduce((W,he)=>W+Number(he.qty||0),0),[m]),oe=P-Number(h||0),J=m.length>0&&m.every(W=>/^\d+$/.test(W.qty))&&oe===0,$=g.usesBusinessSections?g.sources.filter(W=>W.businessSection===C):g.sources,ae=!!B;async function N(){if(!(!ye||ae)){Y("generate"),H("");try{const W=await fe("weld.generate",{month:o,total:h});p(W.map(he=>({...he,qty:String(he.qty)}))),s(2)}catch(W){H(W instanceof Error?W.message:"拆分失败")}finally{Y(void 0)}}}function V(W,he){he!==""&&!/^\d+$/.test(he)||p(ne=>ne.map((ue,Ne)=>Ne===W?{...ue,qty:he}:ue))}async function ee(){if(!(!k||B)){Y("binding"),H("");try{const W=await fe("weld.saveBinding",{sourceId:k});v(W),A(W.selected),b(!1)}catch(W){H(W instanceof Error?W.message:"绑定失败")}finally{Y(void 0)}}}async function le(){if(!J||!g.binding.bound||ae||ce.current)return;ce.current=!0,Y("check"),H("");const W={month:o,total:h,rows:m.map(he=>({date:he.date,qty:he.qty}))};try{if((await fe("weld.check",W,12e4)).hasExistingData){_(!0);return}await de(W,!1)}catch(he){H(he instanceof Error?he.message:"Notion 数据检查失败")}finally{ce.current=!1,Y(he=>he==="check"?void 0:he)}}async function de(W,he){if(!se.current){se.current=!0,Y("write"),H(""),K(void 0);try{const ne=await fe("weld.write",{...W,overwriteExisting:he},12e4,ue=>K(ue));z(ne.message),_(!1),s(3)}catch(ne){H(ne instanceof Error?ne.message:"写入 Notion 失败")}finally{se.current=!1,Y(void 0)}}}function me(){s(1),p([]),d(""),z(""),H(""),K(void 0)}function xe(){var W;ae||(A(g.selected),T(((W=g.sources.find(he=>he.id===g.selected))==null?void 0:W.businessSection)||""),H(""),E("database"),b(!0))}const ie={month:o,total:h,rows:m.map(W=>({date:W.date,qty:W.qty}))};return l.jsx("div",{className:"app-shell",children:l.jsxs("main",{className:"main-content",children:[l.jsxs("header",{className:"content-header",children:[l.jsx("h1",{children:"每日焊接数据模拟"}),l.jsx("button",{type:"button",className:"template-config-button",disabled:ae,"aria-label":"焊接设置",title:"焊接设置",onClick:xe,children:l.jsx(eh,{})})]}),l.jsxs("div",{className:"production-message-scroll daily-weld-page",children:[l.jsx(i1,{current:a,titles:["录入计划","拆分预览","完成"],label:"焊接计划拆分进度"}),D&&l.jsx("div",{className:"weld-notice error",role:"alert",children:D}),a===1&&l.jsxs("section",{className:"weld-plan-card","aria-labelledby":"weld-plan-title",children:[l.jsx("div",{className:"weld-section-heading",children:l.jsx("h2",{id:"weld-plan-title",children:"计划信息"})}),l.jsxs("div",{className:"weld-fields",children:[l.jsx(Kt,{label:"计划月份",value:o,selectionMode:"month",disabled:ae,onChange:u}),l.jsxs("label",{className:"weld-field",children:[l.jsx("span",{children:"计划焊接总量"}),l.jsx(ex,{value:h,disabled:ae,onChange:W=>{(W===""||/^\d+$/.test(W))&&d(W)},unit:"吨",ariaLabel:"计划焊接总量"})]})]}),l.jsx("div",{className:"weld-actions",children:l.jsx("button",{type:"button",className:"primary-button",disabled:!ye||ae,onClick:N,children:B==="generate"?"正在拆分…":"下一步：拆分预览"})})]}),a===2&&l.jsxs("section",{className:"weld-preview","aria-labelledby":"weld-preview-title",children:[l.jsxs("div",{className:"weld-preview-heading",children:[l.jsxs("div",{children:[l.jsxs("h2",{id:"weld-preview-title",children:[o.replace("-"," 年 ")," 月每日拆分详情"]}),l.jsx("p",{children:"可直接修改任意一天的数值；不满意本次浮动效果可重新模拟。"})]}),l.jsxs("button",{type:"button",className:"secondary",disabled:ae,onClick:N,children:[l.jsx(a0,{}),"重新模拟浮动"]})]}),l.jsx("div",{className:"weld-table-wrap",children:l.jsxs("table",{children:[l.jsx("thead",{children:l.jsxs("tr",{children:[l.jsx("th",{children:"日期"}),l.jsx("th",{children:"星期"}),l.jsx("th",{children:"类型"}),l.jsx("th",{children:"计划量（吨）"})]})}),l.jsx("tbody",{children:m.map((W,he)=>l.jsxs("tr",{children:[l.jsx("td",{children:W.date}),l.jsx("td",{children:W.weekday}),l.jsx("td",{children:l.jsx("span",{className:`weld-day-pill ${W.isWeekend?"weekend":""}`,children:W.isWeekend?"休息日":"工作日"})}),l.jsx("td",{children:l.jsx(ex,{value:W.qty,disabled:ae,onChange:ne=>V(he,ne),unit:"吨",ariaLabel:`${W.date} 计划量`})})]},W.date))})]})}),l.jsxs("div",{className:"weld-summary",children:[l.jsxs("span",{children:["共 ",m.length," 天 · 计划总量 ",l.jsx("strong",{children:h})," 吨"]}),l.jsxs("span",{children:["拆分合计 ",l.jsx("strong",{children:P})," 吨 ",oe===0?l.jsx("em",{className:"match",children:"与计划总量一致"}):l.jsxs("em",{className:"mismatch",children:["偏差 ",oe>0?"+":"",oe," 吨，可手动调整"]})]})]}),B==="write"&&l.jsx("div",{className:"weld-write-progress",role:"status","aria-live":"polite",children:L?`正在写入 ${L.date.slice(0,10)}（${L.current}/${L.total}）`:"正在准备 Notion 层级数据…"}),l.jsxs("div",{className:"weld-actions split",children:[l.jsx("button",{type:"button",className:"secondary",disabled:ae,onClick:()=>s(1),children:"返回修改"}),l.jsx("button",{type:"button",className:"primary-button",disabled:!J||!g.binding.bound||ae,onClick:le,children:B==="check"?"正在检查…":B==="write"?"正在写入…":"确认并写入 Notion"})]})]}),a===3&&l.jsxs("section",{className:"complete-view weld-complete",children:[l.jsx("div",{className:"complete-icon",children:l.jsx(ii,{})}),l.jsx("h2",{children:"入库完成"}),l.jsx("p",{children:M||`${o} 共 ${m.length} 天的焊接计划数据已写入 Notion。`}),l.jsx("button",{className:"primary-button",onClick:me,children:"拆分下一个月"})]})]}),x&&l.jsx("div",{className:"weld-settings-overlay",children:l.jsxs("section",{className:"weld-settings-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"weld-settings-title",children:[l.jsxs("aside",{className:"weld-settings-nav",children:[l.jsx("h2",{id:"weld-settings-title",children:"焊接设置"}),l.jsxs("nav",{"aria-label":"焊接设置分类",children:[l.jsxs("button",{type:"button",className:j==="rules"?"active":"",onClick:()=>E("rules"),children:[l.jsx(WC,{}),"拆分规则"]}),l.jsxs("button",{type:"button",className:j==="database"?"active":"",onClick:()=>E("database"),children:[l.jsx(sf,{}),"数据库绑定"]})]})]}),l.jsxs("div",{className:"weld-settings-main",children:[l.jsx("button",{type:"button",className:"weld-settings-close","aria-label":"关闭焊接设置",disabled:B==="binding",onClick:()=>b(!1),children:l.jsx(qo,{})}),j==="rules"?l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"weld-settings-heading",children:[l.jsx("h3",{children:"拆分规则"}),l.jsx("p",{children:"当前规则用于生成每日焊接计划，修改每日数值后仍需保证月度合计一致。"})]}),l.jsxs("dl",{className:"weld-rule-list",children:[l.jsxs("div",{children:[l.jsx("dt",{children:"分配周期"}),l.jsx("dd",{children:"按所选月份的全部自然日"})]}),l.jsxs("div",{children:[l.jsx("dt",{children:"产量浮动"}),l.jsx("dd",{children:"基准量叠加 22% 随机波动"})]}),l.jsxs("div",{children:[l.jsx("dt",{children:"周末权重"}),l.jsx("dd",{children:"周六、周日自动降低计划权重"})]}),l.jsxs("div",{children:[l.jsx("dt",{children:"总量配平"}),l.jsx("dd",{children:"每日取整后自动配平至月度计划"})]})]})]}):l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"weld-settings-heading",children:[l.jsx("h3",{children:"数据库绑定"}),l.jsx("p",{children:"每项业务只绑定一个主写入数据库，汇总数据库由系统自动维护。"})]}),D&&l.jsx("div",{className:"weld-notice error",role:"alert",children:D}),l.jsxs("section",{className:"weld-business-binding","aria-labelledby":"weld-business-title",children:[l.jsxs("div",{className:"weld-business-title",children:[l.jsxs("div",{children:[l.jsx("h4",{id:"weld-business-title",children:"焊接业务"}),l.jsx("p",{children:"每日焊接计划的主写入数据库"})]}),l.jsx("span",{className:g.binding.bound?"bound":"",children:g.binding.bound?"已绑定":"未绑定"})]}),!g.configured||!g.sources.length?l.jsx("div",{className:"weld-notice",children:"请先在系统设置中完成数据库连接并刷新数据源。"}):l.jsxs("div",{className:"weld-dialog-field",children:[g.usesBusinessSections&&l.jsxs(l.Fragment,{children:[l.jsx("span",{children:"业务板块"}),l.jsx(ot,{value:C,options:g.businessSections.map(W=>({value:W,label:W})),placeholder:"选择焊接业务板块",ariaLabel:"焊接业务板块",disabled:B==="binding",onChange:W=>{T(W),A("")}})]}),l.jsx("span",{children:"主写入数据库"}),l.jsx(ot,{value:k,options:$.map(W=>({value:W.id,label:W.name})),placeholder:"选择每日焊接量数据库",ariaLabel:"焊接业务主写入数据库",disabled:g.usesBusinessSections&&!C||B==="binding",onChange:A})]}),l.jsx("p",{className:"weld-binding-help",children:"月度和周度汇总数据库由系统在写入时自动维护，无需单独绑定。"})]}),l.jsxs("div",{className:"weld-settings-actions",children:[l.jsx("button",{type:"button",disabled:B==="binding",onClick:()=>b(!1),children:"取消"}),!g.configured||!g.sources.length?l.jsx("button",{type:"button",className:"primary-button",onClick:n,children:"前往系统设置"}):l.jsx("button",{type:"button",className:"primary-button",disabled:!k||B==="binding",onClick:ee,children:B==="binding"?"正在检测…":"保存绑定"})]})]})]})]})}),R&&l.jsx("div",{className:"pm-dialog-overlay",children:l.jsxs("section",{className:"pm-dialog weld-confirm-dialog",role:"alertdialog","aria-modal":"true","aria-labelledby":"weld-overwrite-title",children:[l.jsx("h2",{id:"weld-overwrite-title",children:"确认覆盖已有产量"}),l.jsxs("p",{children:[o," 已存在产量数据。继续后将按本次拆分结果覆盖该月每日产量，并更新月、周、日关联。"]}),D&&l.jsx("div",{className:"weld-notice error",role:"alert",children:D}),B==="write"&&l.jsx("div",{className:"weld-write-progress",role:"status","aria-live":"polite",children:L?`正在写入 ${L.date.slice(0,10)}（${L.current}/${L.total}）`:"正在准备 Notion 层级数据…"}),l.jsxs("div",{className:"pm-dialog-actions",children:[l.jsx("button",{type:"button",disabled:B==="write",onClick:()=>_(!1),children:"取消"}),l.jsx("button",{type:"button",className:"primary-button",disabled:B==="write",onClick:()=>de(ie,!0),children:B==="write"?"正在写入…":"确认覆盖并写入"})]})]})})]})})}const s1=[{category:"数据文件处理",name:"挂网计划 PDF 导出"},{category:"数据文件处理",name:"生产会资料拆分"},{category:"数据文件处理",name:"文件统计汇总"},{category:"数据同步",name:"每日焊接数据模拟"},{category:"数据同步",name:"生产消息 Notion 入库"},{category:"数据同步",name:"数据库查看"},{category:"自动化",name:"自动化任务"}],pA=[...new Set(s1.map(n=>n.category))];function gA(n){switch(n){case"挂网计划 PDF 导出":return"plan-pdf";case"生产会资料拆分":return"production-meeting";case"每日焊接数据模拟":return"daily-weld";case"生产消息 Notion 入库":return"production-message";case"数据库查看":return"database-viewer";case"文件统计汇总":return"report-center";case"自动化任务":return"daily-report";default:return"plan-pdf"}}function yA({active:n,navigate:a,openSettings:s}){return l.jsxs("aside",{className:"sidebar",children:[l.jsx("div",{className:"sidebar-top",children:l.jsx("div",{className:"sidebar-brand",children:"生产助手"})}),l.jsx("nav",{className:"sidebar-nav","aria-label":"业务模块",children:pA.map(o=>l.jsxs("section",{className:"sidebar-section",children:[l.jsx("div",{className:"sidebar-section-label",children:o}),s1.filter(u=>u.category===o).map(u=>{const h=gA(u.name),d=h===n;return l.jsxs("button",{className:`sidebar-item ${d?"sidebar-item-active":""}`,"aria-current":d?"page":void 0,onClick:()=>a(h),children:[l.jsx(nx,{name:u.name}),l.jsx("span",{children:u.name})]},u.name)})]},o))}),l.jsx("div",{className:"sidebar-bottom",children:l.jsxs("button",{className:"sidebar-item","aria-haspopup":"dialog",onClick:s,children:[l.jsx(nx,{name:"设置"}),l.jsx("span",{children:"设置"})]})})]})}function nx({name:n}){return n==="挂网计划 PDF 导出"||n==="生产会资料拆分"?l.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[l.jsx("path",{className:"folder-lid",d:"M3.5 7h6l1.8 2h9.2"}),l.jsx("path",{d:"M4.2 7h15.6l-1.3 11H5.5L4.2 7Z"})]}):n==="每日焊接数据模拟"||n==="自动化任务"?l.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[l.jsx("rect",{x:"5",y:"4.5",width:"14",height:"15",rx:"2"}),l.jsx("path",{d:"M8 3v3M16 3v3M5 9h14"}),l.jsx("path",{className:"daily-check",d:"m8.5 14 2 2 4.5-4.5"})]}):n==="生产消息 Notion 入库"?l.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[l.jsx("path",{d:"M4 14.5 6.2 6h11.6l2.2 8.5V19H4v-4.5Z"}),l.jsx("path",{className:"inbox-tray",d:"M4.3 14h4.1l1.2 2h4.8l1.2-2h4.1"}),l.jsx("path",{className:"inbox-arrow",d:"M12 5v7m-2.5-2.5L12 12l2.5-2.5"})]}):n==="数据库查看"?l.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[l.jsx("ellipse",{cx:"12",cy:"6",rx:"7",ry:"3"}),l.jsx("path",{d:"M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"})]}):n==="文件统计汇总"?l.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[l.jsx("path",{d:"M4.5 19h15"}),l.jsx("rect",{className:"report-bar report-bar-one",x:"6",y:"12",width:"2.5",height:"6",rx:"0.5"}),l.jsx("rect",{className:"report-bar report-bar-two",x:"10.75",y:"8",width:"2.5",height:"10",rx:"0.5"}),l.jsx("rect",{className:"report-bar report-bar-three",x:"15.5",y:"5",width:"2.5",height:"13",rx:"0.5"})]}):l.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[l.jsx("circle",{cx:"12",cy:"12",r:"3"}),l.jsx("path",{className:"settings-ring",d:"M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M18 6l-1.4 1.4M7.4 16.6 6 18"})]})}const rx=new Set(["raw_message","message_type","parser_version","unit"]),vA=new Set(["piece_count","weight","sheet_in_stock","profile_in_stock","cutting","welding","daily_output","monthly_output","yearly_output","monthly_reference","output_sections"]),xA=/(公斤|千克|kg|吨|t|张|件|套|节|台|米|m)$/i,bA={piece_count:"张",weight:"吨",sheet_in_stock:"吨",profile_in_stock:"吨",cutting:"吨",welding:"吨",daily_output:"套",output_sections:"节"};function Md(){const n=new Date;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`}function rs(n){return n instanceof Error?n.message:String(n)}function xf(n,a=""){const s=n.trim().match(xA);return{value:s?n.trim().slice(0,-s[0].length).trim():n,unit:(s==null?void 0:s[0])||a}}function SA(n,a){return n.trim()?`${n}${a}`:""}function jA(n,a){const s=xf(a).value.trim(),o=xf(n.databaseValue).value.trim(),u=n.propertyType==="number"&&!Number.isFinite(Number(s.replaceAll(",",""))),h=!s||u?"exception":o?n.propertyType==="number"?Number(s.replaceAll(",",""))===Number(o.replaceAll(",",""))?"same":"confirm":s===o?"same":"confirm":"new";return{...n,parsedValue:a,status:h,message:h==="exception"?`${n.name}的输入值无效`:h==="confirm"?"与数据库现值不同":""}}function wA(n){return{new:"新增",same:"一致",confirm:"待确认",exception:"异常",unchecked:"待检查"}[n]||"异常"}function EA(){const[n,a]=S.useState(""),[s,o]=S.useState(""),[u,h]=S.useState([]),[d,m]=S.useState(),[p,g]=S.useState(),[v,x]=S.useState(),[b,j]=S.useState(""),[E,C]=S.useState({}),[T,k]=S.useState(!1),[A,R]=S.useState(),[_,B]=S.useState(""),[Y,D]=S.useState([]),[H,M]=S.useState({}),[z,L]=S.useState(!1),[K,ce]=S.useState({cutting:"",towerDaily:""}),se=u.length>0,ye=se&&n!==s,P=!!d;S.useEffect(()=>{fe("production.getBindings").then(ie=>{R(ie),ce({cutting:ie.selected.cutting||"",towerDaily:ie.selected.towerDaily||""})}).catch(ie=>B(rs(ie)))},[]);async function oe(){B("");try{await fe("production.saveBindings",K,12e4);const ie=await fe("production.getBindings");R(ie),L(!1)}catch(ie){B(rs(ie))}}async function J(ie){m("check"),j(""),C({});try{const W=await fe("production.check",{drafts:ie,defaultDate:Md()});g(W)}catch(W){j(rs(W))}finally{m(void 0)}}async function $(){if(!(!n.trim()||P)){m("parse"),j(""),k(!1),x(void 0),g(void 0),C({});try{const ie=await fe("production.parse",{text:n,defaultDate:Md()});if(h(ie),o(n),!ie.length){j("没有解析到可核对的数据，请检查消息内容后重试。");return}ie.every(W=>W.canWrite)&&await J(ie)}catch(ie){h([]),g(void 0),j(rs(ie))}finally{m(ie=>ie==="parse"?void 0:ie)}}}async function ae(ie,W){const he=u.map(ne=>ne.index===ie?{...ne,businessDate:W,canWrite:!!W,warningText:W?"":ne.warningText}:ne);h(he),g(void 0),C({}),he.every(ne=>ne.canWrite)&&await J(he)}function N(ie,W,he){const ne=`${ie}:${W}`;h(ue=>ue.map(Ne=>Ne.index===ie?{...Ne,canWrite:!!Ne.businessDate&&Ne.kind!=="Unknown",fields:{...Ne.fields,[W]:he},previewFields:Ne.previewFields.map(Me=>Me.key===W?{...Me,value:he}:Me)}:Ne)),C(ue=>Object.fromEntries(Object.entries(ue).filter(([Ne])=>Ne!==ne))),g(ue=>{if(!ue)return ue;const Ne=ue.items.map(Me=>{if(Me.index!==ie||!Me.fields)return Me;const De=Me.fields.map(ct=>ct.key===W?jA(ct,he):ct),Te=De.some(ct=>ct.status==="exception")?"error":De.some(ct=>ct.status==="confirm")?"existing":"ready";return{...Me,fields:De,status:Te}});return{...ue,items:Ne,succeeded:Ne.every(Me=>Me.status!=="error")}})}async function V(ie){if(!(!p||P)){m("write"),j("");try{const W=await fe("production.write",{drafts:u,defaultDate:Md(),overwriteExisting:!1,fieldChoices:E,monthlyPlans:ie},12e4);if(x(W),W.requiredMonths.length){D(W.requiredMonths),M({});return}W.succeeded?k(!0):j(W.message||"Notion 写入未完成。")}catch(W){j(rs(W))}finally{m(void 0)}}}function ee(){a(""),o(""),h([]),g(void 0),x(void 0),C({}),k(!1),j("")}const le=S.useMemo(()=>u.flatMap(ie=>{var he;const W=(he=p==null?void 0:p.items.find(ne=>ne.index===ie.index))==null?void 0:he.fields;return W!=null&&W.length?W.filter(ne=>!rx.has(ne.key)).map(ne=>({draft:ie,key:ne.key,name:ne.name,propertyType:ne.propertyType,parsedValue:ie.fields[ne.key]??ne.parsedValue,databaseValue:ne.databaseValue,status:ne.status,message:ne.message})):ie.previewFields.filter(ne=>!rx.has(ne.key)).map(ne=>({draft:ie,key:ne.key,name:ne.label,propertyType:vA.has(ne.key)?"number":"",parsedValue:ie.fields[ne.key]??ne.value,databaseValue:"",status:ie.canWrite?"unchecked":"exception",message:ie.warningText}))}),[u,p]),de=S.useMemo(()=>({newFields:le.filter(ie=>ie.status==="new").length,same:le.filter(ie=>ie.status==="same").length,confirm:le.filter(ie=>ie.status==="confirm").length,exception:le.filter(ie=>ie.status==="exception").length}),[le]),me=le.filter(ie=>ie.status==="confirm"),xe=se&&!ye&&!P&&!!(p!=null&&p.succeeded)&&u.every(ie=>ie.canWrite&&!!ie.businessDate)&&le.every(ie=>ie.status!=="exception"&&ie.status!=="unchecked")&&me.every(ie=>!!E[`${ie.draft.index}:${ie.key}`]);return T?l.jsxs("div",{className:"app-shell",children:[l.jsxs("main",{className:"main-content",children:[l.jsx(ix,{disabled:P,configure:()=>{A&&ce({cutting:A.selected.cutting||"",towerDaily:A.selected.towerDaily||""}),B(""),L(!0)}}),l.jsxs("div",{className:"production-message-scroll",children:[l.jsx(sx,{current:3}),l.jsxs("section",{className:"complete-view",children:[l.jsx("div",{className:"complete-icon",children:l.jsx(ii,{})}),l.jsx("h2",{children:"入库完成"}),l.jsx("p",{children:(v==null?void 0:v.message)||`${u.length} 条消息已写入 Notion`}),l.jsx("button",{className:"primary-button",onClick:ee,children:"录入下一条"})]})]})]}),z&&A&&l.jsx(ax,{state:A,selections:K,setSelections:ce,error:_,close:()=>L(!1),save:oe})]}):l.jsxs("div",{className:"app-shell",children:[l.jsxs("main",{className:"main-content",children:[l.jsx(ix,{disabled:P,configure:()=>{A&&ce({cutting:A.selected.cutting||"",towerDaily:A.selected.towerDaily||""}),B(""),L(!0)}}),l.jsxs("div",{className:"production-message-scroll",children:[l.jsx(sx,{current:se?2:1}),l.jsxs("div",{className:"workspace-panel",children:[l.jsxs("section",{className:"message-pane",children:[l.jsxs("div",{className:"pane-title",children:[l.jsx("h2",{children:"原始消息"}),l.jsx("p",{children:"输入生产消息，系统将自动解析并检查已有数据。"})]}),l.jsx("textarea",{className:"message-textarea",value:n,disabled:P,onChange:ie=>a(ie.target.value),placeholder:"请输入生产消息"}),l.jsx("div",{className:"parse-action",children:l.jsxs("button",{className:"primary-button",disabled:!n.trim()||P,onClick:$,children:[se&&l.jsx(a0,{className:"button-icon refresh-icon"}),l.jsx("span",{children:d==="parse"?"正在解析…":se?"重新解析":"解析消息"})]})})]}),l.jsx("section",{className:"review-pane",children:se?l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"review-header",children:[l.jsx("h2",{children:"解析结果"}),l.jsxs("div",{className:"review-summary",children:[l.jsxs("span",{children:["新增",l.jsx("strong",{children:de.newFields})]}),l.jsx("i",{children:"·"}),l.jsxs("span",{children:["一致",l.jsx("strong",{children:de.same})]}),l.jsx("i",{children:"·"}),l.jsxs("span",{children:["待确认",l.jsx("strong",{children:de.confirm})]}),l.jsx("i",{children:"·"}),l.jsxs("span",{children:["异常",l.jsx("strong",{children:de.exception})]})]})]}),l.jsx("div",{className:"date-groups",children:u.map(ie=>{const W=le.filter(ue=>ue.draft.index===ie.index),he=W.filter(ue=>ue.status==="confirm"),ne=p?{...p,items:p.items.filter(ue=>ue.index===ie.index)}:void 0;return l.jsxs("section",{className:"date-group","data-business-date":ie.businessDate,children:[l.jsxs("div",{className:"identity-section",children:[l.jsx("div",{className:"identity-field",children:l.jsx(Kt,{label:"日期",value:ie.businessDate||"",disabled:P,onChange:ue=>ae(ie.index,ue)})}),l.jsxs("div",{className:"identity-field",children:[l.jsx("label",{children:"业务 / 产线"}),l.jsx("input",{className:"field-input",value:ie.typeDisplay||"",readOnly:!0,disabled:P})]})]}),l.jsx(TA,{busy:d==="check",result:ne,error:b,needsReparse:ye,invalidCount:ie.canWrite?0:1,fieldStatuses:W.map(ue=>ue.status)}),l.jsx("div",{className:"data-title",children:"数据字段"}),l.jsxs("div",{className:"field-table",children:[l.jsxs("div",{className:"field-table-header",children:[l.jsx("div",{children:"字段"}),l.jsx("div",{children:"本次解析值"}),l.jsx("div",{children:"数据库值"}),l.jsx("div",{className:"header-status",children:"状态"})]}),W.map(ue=>{const Ne=xf(ue.parsedValue,ue.propertyType==="number"&&bA[ue.key]||""),Me=`${ue.draft.index}:${ue.key}`;return l.jsxs("div",{className:"field-row",children:[l.jsx("div",{className:"field-name",children:ue.name}),l.jsx("div",{className:"field-editor",children:l.jsxs("div",{className:"input-unit-wrap",children:[l.jsx("input",{className:"field-input compact-input",value:Ne.value,disabled:P,"aria-invalid":ue.status==="exception",onChange:De=>N(ue.draft.index,ue.key,SA(De.target.value,Ne.unit)),onKeyDown:De=>{De.key==="Enter"&&De.currentTarget.blur()}}),Ne.unit&&l.jsx("span",{children:Ne.unit})]})}),l.jsx("div",{className:"database-value",children:ue.databaseValue||"—"}),l.jsx("div",{className:"field-status",children:ue.status!=="unchecked"&&l.jsx("span",{className:`pill pill-${ue.status}`,title:ue.message,children:wA(ue.status)})})]},Me)})]}),he.length>0&&l.jsxs("section",{className:"conflict-section","aria-label":`${ie.businessDate} 待确认字段`,children:[l.jsx("div",{className:"conflict-section-title",children:"待确认字段"}),he.map(ue=>{const Ne=`${ue.draft.index}:${ue.key}`;return l.jsxs("div",{className:"conflict-panel",children:[l.jsxs("div",{className:"conflict-message",children:[l.jsx("strong",{children:ue.name}),l.jsx("span",{children:"原值与新值不同，请选择保留项。"})]}),l.jsxs("div",{className:"conflict-options",children:[l.jsxs("label",{children:[l.jsx("input",{type:"radio",name:`conflict-${Ne}`,checked:E[Ne]==="keep",onChange:()=>C(Me=>({...Me,[Ne]:"keep"}))}),l.jsxs("span",{children:[l.jsx("small",{children:"原值"}),l.jsx("strong",{children:ue.databaseValue||"—"})]})]}),l.jsxs("label",{children:[l.jsx("input",{type:"radio",name:`conflict-${Ne}`,checked:E[Ne]==="use",onChange:()=>C(Me=>({...Me,[Ne]:"use"}))}),l.jsxs("span",{children:[l.jsx("small",{children:"新值"}),l.jsx("strong",{children:ue.parsedValue||"—"})]})]})]})]},Ne)})]})]},ie.index)})}),l.jsxs("div",{className:"review-footer",children:[l.jsx("span",{className:"review-footer-text",children:u.length>1?`本次共 ${u.length} 条消息，将整批写入 Notion。`:"确认后将把本次解析结果写入 Notion。"}),l.jsx("button",{className:"primary-button confirm-button",disabled:!xe,onClick:()=>V(),children:d==="write"?"正在入库…":"确认入库"})]})]}):l.jsxs("div",{className:"review-empty",children:[l.jsx("h2",{children:"解析结果"}),l.jsx("p",{children:"解析消息后，Notion 数据检查结果将在这里显示。"}),(_||(A==null?void 0:A.configured)===!1||A&&(!A.cutting.bound||!A.towerDaily.bound))&&l.jsx("div",{className:"pm-notice",role:"alert",children:_||((A==null?void 0:A.configured)===!1?"Notion 连接尚未配置。":"数据库已变更，请点击右上角“数据库绑定”重新选择下料和塔筒主数据库。")})]})})]})]})]}),Y.length>0&&l.jsx(CA,{months:Y,values:H,setValues:M,close:()=>D([]),submit:ie=>{D([]),V(ie)}}),z&&A&&l.jsx(ax,{state:A,selections:K,setSelections:ce,error:_,close:()=>L(!1),save:oe})]})}function TA({busy:n,result:a,error:s,needsReparse:o,invalidCount:u,fieldStatuses:h}){if(n)return l.jsxs("div",{className:"match-status",role:"status","aria-live":"polite",children:[l.jsx("span",{className:"status-loader"}),l.jsx("span",{className:"match-status-copy",children:"正在检查 Notion 数据…"})]});if(o)return l.jsxs("div",{className:"match-status match-status-error",role:"alert",children:[l.jsx("span",{className:"new-record-icon",children:"!"}),l.jsx("span",{className:"match-status-copy",children:"原始消息已修改，请重新解析"})]});if(u)return l.jsxs("div",{className:"match-status match-status-error",role:"alert",children:[l.jsx("span",{className:"new-record-icon",children:"!"}),l.jsxs("span",{className:"match-status-copy",children:["本批有 ",u," 条异常，已停止检查和入库"]})]});if(s)return l.jsxs("div",{className:"match-status match-status-error",role:"alert",children:[l.jsx("span",{className:"new-record-icon",children:"!"}),l.jsxs("span",{className:"match-status-copy",children:["检查失败：",s]})]});const d=a==null?void 0:a.items.some(b=>b.status==="existing"||b.status==="conflict"),m=b=>h.includes(b),p=h.length>0&&h.every(b=>b==="same"),g=m("exception")||a&&!a.succeeded&&h.length===0?"match-status-error":m("confirm")?"match-status-warning":p?"match-status-neutral":"",v=m("exception")?"存在异常，不能入库":m("unchecked")?"字段已修改，等待检查":m("confirm")?"已找到对应记录，有字段待确认":m("new")?d||m("same")?"已找到对应记录，将补充空字段":"未找到对应记录，将新建":p?"已找到对应记录，数据一致":a&&!a.succeeded?"Notion 检查未通过":"等待检查 Notion 数据",x=!!a&&!m("exception")&&!m("confirm")&&!m("unchecked");return l.jsxs("div",{className:`match-status ${g}`,role:g==="match-status-error"?"alert":"status","aria-live":"polite",children:[x?l.jsx("span",{className:"match-check",children:l.jsx(ii,{})}):l.jsx("span",{className:"new-record-icon",children:g?"!":"+"}),l.jsx("span",{className:"match-status-copy",children:v})]})}function CA({months:n,values:a,setValues:s,close:o,submit:u}){const h=Object.fromEntries(n.map(m=>[m,Number(a[m])])),d=n.every(m=>{var p;return((p=a[m])==null?void 0:p.trim())&&Number.isFinite(h[m])&&h[m]>=0});return l.jsx("div",{className:"pm-dialog-overlay",children:l.jsxs("section",{className:"pm-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"monthly-plan-title",children:[l.jsx("h2",{id:"monthly-plan-title",children:"补充下料月计划"}),l.jsx("p",{children:"独立月计划库中没有该月份记录，请填写计划下料（吨）。"}),n.map(m=>l.jsxs("label",{children:[m,l.jsx("input",{type:"number",min:"0",value:a[m]||"",onChange:p=>s({...a,[m]:p.target.value})})]},m)),l.jsxs("div",{className:"pm-dialog-actions",children:[l.jsx("button",{onClick:o,children:"取消"}),l.jsx("button",{className:"primary-button",disabled:!d,onClick:()=>u(h),children:"创建并继续"})]})]})})}function ax({state:n,selections:a,setSelections:s,error:o,close:u,save:h}){var x,b;const[d,m]=S.useState(((x=n.sources.find(j=>j.id===a.cutting))==null?void 0:x.businessSection)||""),[p,g]=S.useState(((b=n.sources.find(j=>j.id===a.towerDaily))==null?void 0:b.businessSection)||""),v=j=>n.usesBusinessSections?n.sources.filter(E=>E.businessSection===j):n.sources;return l.jsx("div",{className:"pm-dialog-overlay",children:l.jsxs("section",{className:"pm-dialog pm-binding-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"binding-title",children:[l.jsx("h2",{id:"binding-title",children:"数据库绑定"}),l.jsx("p",{children:"只绑定每日主数据库。月累计和年累计由软件查询计算；下料月计划库通过主库的 Relation 自动识别。"}),n.usesBusinessSections&&l.jsxs("label",{children:["下料业务板块",l.jsx(ot,{value:d,ariaLabel:"下料业务板块",placeholder:"不处理下料消息",options:[{value:"",label:"不处理下料消息"},...n.businessSections.map(j=>({value:j,label:j}))],onChange:j=>{m(j),s({...a,cutting:""})}})]}),l.jsxs("label",{children:["下料主数据库",l.jsx(ot,{value:a.cutting,ariaLabel:"下料主数据库",placeholder:"不处理下料消息",disabled:n.usesBusinessSections&&!d,options:[{value:"",label:"不处理下料消息"},...v(d).map(j=>({value:j.id,label:j.name}))],onChange:j=>s({...a,cutting:j})})]}),n.usesBusinessSections&&l.jsxs("label",{children:["塔筒业务板块",l.jsx(ot,{value:p,ariaLabel:"塔筒业务板块",placeholder:"请选择业务板块",options:n.businessSections.map(j=>({value:j,label:j})),onChange:j=>{g(j),s({...a,towerDaily:""})}})]}),l.jsxs("label",{children:["塔筒产线主数据库",l.jsx(ot,{value:a.towerDaily,ariaLabel:"塔筒产线主数据库",placeholder:"请选择具体数据库",disabled:n.usesBusinessSections&&!p,options:v(p).map(j=>({value:j.id,label:j.name})),onChange:j=>s({...a,towerDaily:j})})]}),o&&l.jsx("div",{className:"pm-notice",role:"alert",children:o}),l.jsxs("div",{className:"pm-dialog-actions",children:[l.jsx("button",{onClick:u,children:"取消"}),l.jsx("button",{className:"primary-button",disabled:!a.towerDaily,onClick:h,children:"保存绑定"})]})]})})}function ix({configure:n,disabled:a}){return l.jsxs("header",{className:"content-header",children:[l.jsx("h1",{children:"生产消息入库"}),l.jsx("button",{type:"button",className:"template-config-button",disabled:a,"aria-label":"数据库绑定",title:"数据库绑定",onClick:n,children:l.jsx(eh,{})})]})}function sx({current:n}){return l.jsx(i1,{current:n,titles:["录入消息","解析确认","完成"],label:"生产消息入库进度"})}const lx={audit:"正在检查",repair:"正在备份修复并复查",export:"正在导出",pickFolder:"选择目录",openOutput:"正在打开目录"},ox=n=>n.split(/[\\/]/).pop();function NA(){const[n,a]=S.useState(""),[s,o]=S.useState(),[u,h]=S.useState(),[d,m]=S.useState(),[p,g]=S.useState(),[v,x]=S.useState(),[b,j]=S.useState(""),[E,C]=S.useState("全部"),[T,k]=S.useState(),A=S.useRef(!1),R=S.useRef(0);S.useEffect(()=>()=>{R.current++},[]);const _=(s==null?void 0:s.issues.filter(M=>M.severity==="错误").length)||0,B=(s==null?void 0:s.issues.filter(M=>M.severity==="警告").length)||0;function Y(M){A.current||(a(M),o(void 0),m(void 0),h(void 0),j(""),k(void 0),C("全部"))}async function D(M){if(A.current||M==="audit"&&!n.trim()||["repair","export","openOutput"].includes(M)&&!s)return;const z=++R.current;A.current=!0,g(M),j(""),x(void 0),M==="audit"&&(o(void 0),h(void 0),C("全部")),M==="repair"&&(o(L=>L&&{...L,repaired:!1,canExport:!1}),h(void 0)),["audit","repair","export"].includes(M)&&(m(void 0),k(void 0));try{if(M==="pickFolder"){const L=await fe("plan.pickFolder",void 0,6e5);if(z!==R.current)return;L.path&&(A.current=!1,Y(L.path),A.current=!0)}else{const L=await fe(`plan.${M}`,{path:n.trim(),auditId:s==null?void 0:s.auditId,confirmed:M==="repair"||M==="export"},18e5,K=>{z===R.current&&A.current&&k(K)});if(z!==R.current)return;if(M==="audit"&&o(L),M==="repair"){const K=L;o(K.audit),h(K.repair)}M==="export"&&m(L)}}catch(L){z===R.current&&(j(L instanceof Error?L.message:String(L)),(M==="repair"||M==="export")&&o(K=>K&&{...K,canExport:!1,repaired:!1}))}finally{z===R.current&&(A.current=!1,g(void 0),k(void 0))}}const H=p?lx[p]:d?"候选 PDF 已生成":s?_?"存在待处理错误":s.canExport?"可以导出":"检查完成，待修复":"等待检查";return l.jsxs("div",{className:"page plan-pdf-page",children:[l.jsxs("header",{className:"plan-header",children:[l.jsx("h1",{children:"挂网计划导出"}),l.jsx("span",{children:H})]}),l.jsxs("div",{className:"plan-content",children:[l.jsxs("section",{className:"plan-source",children:[l.jsx("label",{htmlFor:"plan-folder",children:"月度目录"}),l.jsxs("div",{children:[l.jsx("input",{id:"plan-folder",value:n,disabled:!!p,placeholder:"选择包含一二三级计划的月份目录",onChange:M=>Y(M.target.value)}),l.jsxs("button",{className:"secondary",disabled:!!p,onClick:()=>void D("pickFolder"),children:[l.jsx(Oo,{}),"选择目录"]}),l.jsx("button",{className:"primary",disabled:!!p||!n.trim(),onClick:()=>void D("audit"),children:s?"重新检查":"检查计划"})]})]}),b&&l.jsx("p",{className:"plan-error",role:"alert",children:b}),p&&l.jsxs("div",{className:"plan-progress",role:"status",children:[l.jsxs("span",{children:[l.jsx(yn,{className:"spin"}),lx[p]]}),p==="export"&&T&&l.jsxs(l.Fragment,{children:[l.jsxs("span",{children:[T.current," / ",T.total," · ",T.name]}),l.jsx("progress",{"aria-label":"PDF 导出进度",max:T.total||11,value:T.current})]})]}),l.jsxs("div",{className:"plan-workspace",children:[l.jsxs("section",{className:"plan-inspection",children:[l.jsxs("div",{className:"plan-pane-heading",children:[l.jsx("h2",{children:"检查结果"}),s&&l.jsxs("span",{children:[s.sheetCount," 个工作表"]})]}),s?l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"plan-workbook",children:[l.jsxs("strong",{children:[s.workspace.year," 年 ",s.workspace.month," 月计划"]}),l.jsx("span",{children:ox(s.workspace.workbookPath)})]}),l.jsx("div",{className:"plan-filters","aria-label":"问题筛选",children:["全部","错误","警告"].map(M=>l.jsxs("button",{"aria-pressed":E===M,onClick:()=>C(M),children:[M," ",l.jsx("span",{children:M==="全部"?s.issues.length:M==="错误"?_:B})]},M))}),l.jsxs("div",{className:"plan-issues",children:[s.issues.filter(M=>E==="全部"||M.severity===E).map((M,z)=>l.jsxs("article",{children:[l.jsxs("div",{children:[l.jsx("span",{className:M.severity==="错误"?"plan-severity-error":"",children:M.severity}),l.jsxs("strong",{children:[M.sheet,M.location&&` · ${M.location}`]}),l.jsx("span",{children:M.canAutoFix?"可自动修复":"需手动处理"})]}),l.jsx("p",{children:M.message})]},z)),!s.issues.some(M=>E==="全部"||M.severity===E)&&l.jsx("p",{className:"plan-clear",children:s.issues.length?`没有${E}`:"未发现检查问题"})]}),l.jsxs("div",{className:"plan-next",children:[l.jsx("span",{children:_?s.repaired?"请手动处理剩余错误，再重新检查。":"修复后自动复查，剩余错误需手动处理。":s.canExport?"复查通过，可以导出候选 PDF。":"继续备份并修复，完成导出前准备。"}),l.jsx("button",{className:"secondary",disabled:!!p,onClick:()=>x("repair"),children:s.repaired?"再次修复":"备份并修复"})]}),u&&l.jsxs("details",{className:"plan-details",children:[l.jsx("summary",{children:"备份与修复明细"}),l.jsxs("p",{children:["已调整 ",u.changedCells," 个单元格、",u.changedRows," 行。"]}),l.jsxs("p",{children:["备份：",u.backupPath]})]})]}):l.jsxs("div",{className:"plan-empty",children:[l.jsx(zv,{}),l.jsx("strong",{children:"尚未检查计划"}),l.jsx("p",{children:"选择月度目录后，查看需要处理的问题。"})]})]}),l.jsxs("section",{className:"plan-result",children:[l.jsxs("div",{className:"plan-pane-heading",children:[l.jsx("h2",{children:"导出结果"}),d&&l.jsxs("span",{children:[d.files.length," 份 PDF"]})]}),d?l.jsxs(l.Fragment,{children:[l.jsx("div",{className:"plan-file-list",children:d.files.map(M=>l.jsx("p",{children:ox(M)},M))}),l.jsxs("div",{className:"plan-output",children:[l.jsx("span",{children:"文件位置"}),l.jsx("p",{children:d.outputFolder}),l.jsxs("button",{className:"secondary",disabled:!!p,onClick:()=>void D("openOutput"),children:[l.jsx(Oo,{}),"打开输出目录"]})]})]}):l.jsxs("div",{className:"plan-empty",children:[l.jsx(zv,{}),l.jsx("strong",{children:p==="export"?"正在生成候选 PDF":"尚未导出"}),l.jsx("p",{children:"完成检查和修复后，生成 11 份候选 PDF。"})]}),l.jsx("div",{className:"plan-export-action",children:l.jsx("button",{className:"primary",disabled:!!p||!(s!=null&&s.canExport),onClick:()=>x("export"),children:d?"重新导出 PDF":"导出 PDF"})})]})]})]}),l.jsx(gs,{open:!!v,onOpenChange:M=>{M||x(void 0)},children:l.jsxs(ys,{children:[l.jsx(vs,{className:"dialog-overlay"}),l.jsxs(bs,{className:"plan-confirm",children:[l.jsxs("div",{children:[l.jsx(Ss,{children:v==="repair"?"确认备份并修复":"确认导出 PDF"}),l.jsx(zo,{asChild:!0,children:l.jsx("button",{className:"secondary","aria-label":"关闭确认",children:l.jsx(qo,{})})})]}),l.jsx(js,{children:v==="repair"?"将先备份 Excel，再修复格式和序号，并自动复查。":"将生成 11 份候选 PDF，不修改 Excel。"}),l.jsxs("footer",{children:[l.jsx(zo,{asChild:!0,children:l.jsx("button",{className:"secondary",autoFocus:!0,children:"取消"})}),l.jsx("button",{className:"primary",onClick:()=>v&&void D(v),children:v==="repair"?"备份并修复":"确认导出"})]})]})]})})]})}const DA=n=>n.split(/[\\/]/).pop();function AA(){const[n,a]=S.useState(""),[s,o]=S.useState(),[u,h]=S.useState(),[d,m]=S.useState(""),p=S.useRef(!1),g=S.useRef(0);S.useEffect(()=>()=>{g.current++},[]);function v(b){p.current||(a(b),o(void 0),m(""))}async function x(b){if(p.current||b==="export"&&!n.trim()||b==="open"&&!s)return;p.current=!0;const j=++g.current;h(b),m(""),b==="export"&&o(void 0);try{if(b==="pick"){const E=await fe("meeting.pickFile",void 0,6e5);j===g.current&&E.path&&(a(E.path),o(void 0))}else if(b==="export"){const E=await fe("meeting.export",{path:n.trim()},18e5);j===g.current&&o(E)}else await fe("meeting.openOutput",{resultId:s.resultId})}catch(E){j===g.current&&m(E instanceof Error?E.message:String(E))}finally{j===g.current&&(p.current=!1,h(void 0))}}return l.jsxs("div",{className:"page meeting-page",children:[l.jsxs("header",{className:"meeting-header",children:[l.jsx("h1",{children:"生产会资料拆分"}),l.jsx("span",{children:u==="export"?"正在拆分":s?"拆分完成":"等待拆分"})]}),l.jsxs("div",{className:"meeting-content",children:[d&&l.jsx("p",{className:"meeting-error",role:"alert",children:d}),l.jsxs("div",{className:"meeting-workspace",children:[l.jsxs("section",{children:[l.jsx("h2",{children:"源文件"}),l.jsx("label",{htmlFor:"meeting-source",children:"生产会资料 Excel"}),l.jsxs("div",{className:"meeting-input",children:[l.jsx("input",{id:"meeting-source",value:n,disabled:!!u,onChange:b=>v(b.target.value),placeholder:"选择 .xlsx、.xlsm 或 .xls 文件"}),l.jsxs("button",{className:"secondary",disabled:!!u,onClick:()=>void x("pick"),children:[l.jsx(Oo,{}),"选择文件"]})]}),l.jsx("p",{className:"meeting-hint",children:"源文件需包含一个工作表，按已发运、在制、预投三个分段拆分。"}),l.jsxs("details",{className:"meeting-rules",children:[l.jsx("summary",{children:"拆分规则"}),l.jsx("p",{children:"生成包含三个独立工作表的 .xlsx，保存到源文件所在目录，保留源文件。"}),l.jsx("p",{children:"保留原有内容、公式和布局，清除红色与绿色背景填充。宏不会保留到输出文件。"})]}),l.jsx("div",{className:"meeting-actions",children:l.jsx("button",{className:"primary",disabled:!!u||!n.trim(),onClick:()=>void x("export"),children:u==="export"?"正在拆分…":s?"重新拆分":"开始拆分"})})]}),l.jsxs("section",{className:"meeting-result","aria-live":"polite",children:[l.jsxs("div",{className:"meeting-result-heading",children:[l.jsx("h2",{children:"拆分结果"}),s&&l.jsxs("span",{children:[s.sheetNames.length," 个工作表"]})]}),s?l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"meeting-file",children:[l.jsx(Ro,{}),l.jsxs("div",{children:[l.jsx("h3",{children:DA(s.outputPath)}),l.jsxs("p",{children:["开会日期 · ",s.meetingDate]})]})]}),l.jsx("ol",{children:s.sheetNames.map(b=>l.jsx("li",{children:b},b))}),l.jsxs("div",{className:"meeting-output",children:[l.jsx("span",{children:"文件位置"}),l.jsx("p",{children:s.outputPath}),l.jsxs("button",{className:"secondary",disabled:!!u,onClick:()=>void x("open"),children:[l.jsx(Oo,{}),"打开文件位置"]})]})]}):l.jsxs("div",{className:"meeting-empty",children:[u==="export"?l.jsx(yn,{className:"spin"}):l.jsx(Ro,{}),l.jsx("strong",{children:u==="export"?"正在生成拆分文件":"尚未生成拆分文件"}),l.jsx("p",{children:u==="export"?"正在检查并处理工作表，请稍候。":"选择源文件后开始拆分。"})]})]})]})]})]})}const Rd=(n=0)=>{const a=new Date;return{startDate:new Date(Date.UTC(a.getFullYear(),a.getMonth()+n-1,21)).toISOString().slice(0,10),endDate:new Date(Date.UTC(a.getFullYear(),a.getMonth()+n,20)).toISOString().slice(0,10)}},Od={sourceRoot:"",outputRoot:"",reportUrl:"",username:"",password:""},cx=n=>({sourceRoot:n.sourceRoot,outputRoot:n.outputRoot,reportUrl:n.reportUrl,username:n.username,password:""}),lo=n=>n instanceof Error?n.message:String(n),ux=n=>n?`${n.slice(0,4)} 年 ${Number(n.slice(5,7))} 月`:"—",dx={prepare:"准备中",collect:"正在导出日报",parse:"正在读取数据",summary:"正在生成汇总",complete:"正在完成"};function kA(){const[n,a]=S.useState(),[s,o]=S.useState(Rd),[u,h]=S.useState(Od),[d,m]=S.useState(!1),[p,g]=S.useState("load"),[v,x]=S.useState(""),[b,j]=S.useState(""),[E,C]=S.useState(),[T,k]=S.useState(),[A,R]=S.useState(!1),[_,B]=S.useState(!1),Y=S.useRef(0),D=S.useRef(!1),H=Math.floor((Date.parse(`${s.endDate}T00:00:00Z`)-Date.parse(`${s.startDate}T00:00:00Z`))/864e5)+1,M=Number.isFinite(H)?H<1?"结束日期不能早于开始日期。":H>366?"单次统计范围不能超过 366 天。":"":"请选择完整日期。",z=T!=null&&T.total?Math.min(100,Math.max(0,Math.round(T.current/T.total*100))):0;async function L(){const J=++Y.current;D.current=!0,g("load"),x("");try{const $=await fe("report.getState");J===Y.current&&a($)}catch($){J===Y.current&&x(lo($))}finally{J===Y.current&&(D.current=!1,g(void 0))}}S.useEffect(()=>(L(),()=>{Y.current++}),[]);function K(J){D.current||(o(J),C(void 0),k(void 0),R(!1),x(""),B(!1))}function ce(J){D.current||(m(J),j(""),h(J&&n?cx(n):Od))}async function se(J){if(J.preventDefault(),D.current||!n)return;const $={...u,sourceRoot:u.sourceRoot.trim(),outputRoot:u.outputRoot.trim(),reportUrl:u.reportUrl.trim(),username:u.username.trim()};if(JSON.stringify($)===JSON.stringify(cx(n))){ce(!1);return}const ae=++Y.current;D.current=!0,g("save"),j("");try{const N=await fe("report.saveConfig",$);if(ae!==Y.current)return;a(N),m(!1),h(Od),C(void 0),k(void 0),R(!1),x("")}catch(N){ae===Y.current&&j(lo(N))}finally{ae===Y.current&&(D.current=!1,g(void 0))}}async function ye(){if(D.current||!(n!=null&&n.credentialsConfigured))return;const J=++Y.current;D.current=!0,g("auth"),x("");try{await fe("report.authenticate",void 0,600*1e3);const $=await fe("report.getState");J===Y.current&&a($)}catch($){J===Y.current&&x(lo($))}finally{J===Y.current&&(D.current=!1,g(void 0))}}async function P(){if(D.current||!(n!=null&&n.authenticated)||M)return;const J=++Y.current,$={...s};D.current=!0,g("run"),x(""),C(void 0),R(!1),B(!1),k({stage:"prepare",current:0,total:H,message:""});try{const ae=await fe("report.run",$,18e5,N=>{J===Y.current&&D.current&&k(N)});J===Y.current&&(C(ae),k(void 0))}catch(ae){J===Y.current&&(x(lo(ae)),R(!0),k(void 0))}finally{J===Y.current&&(D.current=!1,g(void 0))}}async function oe(){if(E)try{await navigator.clipboard.writeText(E.summaryPath),B(!0)}catch{x("无法复制，请选中文件路径手动复制。")}}return l.jsxs("div",{className:"page report-center-page",children:[l.jsxs("header",{className:"report-header",children:[l.jsx("h1",{children:"文件统计汇总"}),l.jsxs("div",{className:"report-header-actions",children:[l.jsx("span",{className:"report-status",children:p==="load"?"加载中":n!=null&&n.authenticated?"已验证登录":"未验证登录"}),l.jsx("button",{className:"secondary report-icon-button","aria-label":"报表设置",title:"报表设置",disabled:!!p||!n,onClick:()=>ce(!0),children:l.jsx(eh,{})})]})]}),l.jsxs("div",{className:"report-content",children:[v&&l.jsxs("div",{className:"report-error",role:"alert",children:[l.jsx("span",{children:v}),!n&&l.jsx("button",{className:"secondary",disabled:!!p,onClick:()=>void L(),children:"重新加载"})]}),l.jsxs("section",{className:"report-workspace",children:[l.jsxs("div",{className:"report-pane report-period",children:[l.jsxs("div",{className:"report-pane-heading",children:[l.jsx("h2",{children:"统计范围"}),!M&&l.jsxs("span",{children:[H," 天"]})]}),l.jsxs("div",{className:"report-dates",children:[l.jsx(Kt,{label:"开始日期",value:s.startDate,disabled:!!p,onChange:J=>K({...s,startDate:J})}),l.jsx(Kt,{label:"结束日期",value:s.endDate,disabled:!!p,onChange:J=>K({...s,endDate:J})})]}),l.jsxs("div",{className:"report-range-tools",children:[l.jsxs("div",{children:[l.jsx("button",{disabled:!!p,onClick:()=>K(Rd()),children:"本期"}),l.jsx("button",{disabled:!!p,onClick:()=>K(Rd(-1)),children:"上期"})]}),l.jsx("span",{children:M||`汇总月份 · ${ux(s.endDate)}`})]}),l.jsxs("div",{className:"report-execution",children:[p==="run"&&l.jsxs("div",{className:"report-progress",role:"status",children:[l.jsxs("div",{children:[l.jsxs("span",{children:[l.jsx(yn,{className:"spin"}),dx[(T==null?void 0:T.stage)||"prepare"]]}),T&&["collect","parse"].includes(T.stage)&&l.jsxs("span",{children:[T.current," / ",T.total]})]}),l.jsx("div",{className:"report-progress-bar",role:"progressbar","aria-label":dx[(T==null?void 0:T.stage)||"prepare"],"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":z,children:l.jsx("i",{style:{width:`${z}%`}})}),(T==null?void 0:T.message)&&l.jsxs("details",{className:"report-details",children:[l.jsx("summary",{children:"处理详情"}),l.jsx("p",{children:T.message})]})]}),!(n!=null&&n.credentialsConfigured)&&n&&l.jsxs("p",{className:"report-setup",children:["请先配置报表连接。",l.jsx("button",{onClick:()=>ce(!0),children:"报表设置"})]}),(n==null?void 0:n.credentialsConfigured)&&!n.authenticated&&l.jsx("p",{className:"report-setup",children:"请先验证登录。"}),l.jsxs("div",{className:"report-actions",children:[(n==null?void 0:n.credentialsConfigured)&&l.jsxs("button",{className:"secondary",disabled:!!p,onClick:ye,children:[p==="auth"&&l.jsx(yn,{className:"spin"}),p==="auth"?"验证中…":n!=null&&n.authenticated?"重新验证":"验证登录"]}),l.jsx("button",{className:"primary",disabled:!!p||!(n!=null&&n.authenticated)||!!M,onClick:P,children:p==="run"?"正在汇总…":A?"重新汇总":"开始汇总"})]})]})]}),l.jsxs("div",{className:"report-pane report-result","aria-live":"polite",children:[l.jsxs("div",{className:"report-pane-heading",children:[l.jsx("h2",{children:"汇总结果"}),E&&l.jsx("span",{children:"已完成"})]}),E?l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"report-file",children:[l.jsx(Ro,{}),l.jsxs("div",{children:[l.jsxs("h3",{children:[ux(E.period.endDate),"设备台时汇总"]}),l.jsxs("p",{children:[E.period.startDate," — ",E.period.endDate]})]})]}),l.jsxs("dl",{className:"report-result-stats",children:[l.jsxs("div",{children:[l.jsx("dt",{children:"日报"}),l.jsxs("dd",{children:[E.parsedReports," / ",E.plannedReports," 份"]})]}),l.jsxs("div",{children:[l.jsx("dt",{children:"设备"}),l.jsxs("dd",{children:[E.deviceCount," 台"]})]})]}),l.jsxs("div",{className:"report-output",children:[l.jsx("span",{children:"文件位置"}),l.jsx("p",{children:E.summaryPath}),l.jsxs("button",{className:"secondary",onClick:oe,children:[l.jsx(GC,{}),_?"已复制":"复制路径"]})]}),l.jsxs("details",{className:"report-details",children:[l.jsx("summary",{children:"汇总明细"}),l.jsxs("p",{children:["数据点：",E.actualDataPoints," / ",E.expectedDataPoints]}),E.warnings.map((J,$)=>l.jsx("p",{children:J},$))]})]}):l.jsxs("div",{className:"report-empty",children:[l.jsx(Ro,{}),l.jsx("strong",{children:p==="run"?"正在生成汇总":A?"未生成汇总文件":"尚未生成汇总"}),l.jsx("p",{children:p==="run"?"完成后可在这里查看文件。":A?"处理错误后，可重新汇总。":"选择统计范围后开始汇总。"})]})]})]})]}),l.jsx(gs,{open:d,onOpenChange:ce,children:l.jsxs(ys,{children:[l.jsx(vs,{className:"dialog-overlay"}),l.jsxs(bs,{className:"report-settings-dialog",children:[l.jsxs("div",{className:"report-settings-heading",children:[l.jsx(Ss,{children:"报表设置"}),l.jsx(zo,{asChild:!0,children:l.jsx("button",{className:"secondary report-icon-button",disabled:!!p,"aria-label":"关闭报表设置",children:l.jsx(qo,{})})})]}),l.jsx(js,{className:"report-sr-only",children:"设置报表连接与文件保存位置。"}),l.jsxs("form",{onSubmit:se,children:[l.jsxs("fieldset",{disabled:!!p,children:[l.jsx("legend",{children:"报表连接"}),l.jsxs("label",{children:["报表网页",l.jsx("input",{type:"url",required:!0,value:u.reportUrl,onChange:J=>h({...u,reportUrl:J.target.value}),placeholder:"https://…"})]}),l.jsxs("div",{className:"report-settings-grid",children:[l.jsxs("label",{children:["账号",l.jsx("input",{required:!0,autoComplete:"username",value:u.username,onChange:J=>h({...u,username:J.target.value})})]}),l.jsxs("label",{children:["密码",l.jsx("input",{type:"password",required:!(n!=null&&n.credentialsConfigured),autoComplete:"new-password",value:u.password,onChange:J=>h({...u,password:J.target.value}),placeholder:n!=null&&n.credentialsConfigured?"留空保持原密码":"请输入密码"})]})]})]}),l.jsxs("fieldset",{disabled:!!p,children:[l.jsx("legend",{children:"保存位置"}),l.jsxs("label",{children:["原始日报",l.jsx("input",{required:!0,value:u.sourceRoot,onChange:J=>h({...u,sourceRoot:J.target.value})})]}),l.jsxs("label",{children:["汇总文件",l.jsx("input",{required:!0,value:u.outputRoot,onChange:J=>h({...u,outputRoot:J.target.value})})]})]}),b&&l.jsx("p",{className:"report-error",role:"alert",children:b}),l.jsxs("div",{className:"report-settings-actions",children:[l.jsx(zo,{asChild:!0,children:l.jsx("button",{className:"secondary",type:"button",disabled:!!p,children:"取消"})}),l.jsx("button",{className:"primary",type:"submit",disabled:!!p,children:p==="save"?"保存中…":"保存设置"})]})]})]})]})})]})}const bf="••••••••••••",fx=[{key:"connection",label:"连接",keywords:"Notion API 令牌 根页面 数据源",icon:l.jsx(LA,{})},{key:"notification",label:"通知",keywords:"钉钉 Webhook Secret 规则",icon:l.jsx(UA,{})},{key:"data",label:"数据与缓存",keywords:"Notion 数据源 缓存 绑定",icon:l.jsx(HA,{})},{key:"about",label:"关于",keywords:"版本 WebView2 React TypeScript",icon:l.jsx(qA,{})}];function MA({open:n,onClose:a}){const[s,o]=S.useState("connection"),[u,h]=S.useState(""),[d,m]=S.useState(null),[p,g]=S.useState(""),[v,x]=S.useState(""),[b,j]=S.useState(""),E=S.useRef(null),C=S.useRef(null);S.useEffect(()=>{if(!n)return;C.current=document.activeElement instanceof HTMLElement?document.activeElement:null,j("settings.open"),x(""),fe("settings.open").then(R=>m(R)).catch(R=>x(R instanceof Error?R.message:"设置加载失败，请重试。")).finally(()=>j("")),window.setTimeout(()=>{var R;return(R=E.current)==null?void 0:R.focus()},0);const A=R=>{R.key==="Escape"&&a()};return window.addEventListener("keydown",A),()=>{var R;window.removeEventListener("keydown",A),(R=C.current)==null||R.focus()}},[n,a]),S.useEffect(()=>{if(!p)return;const A=window.setTimeout(()=>g(""),3e3);return()=>window.clearTimeout(A)},[p]);const T=async(A,R)=>{j(A),x(""),g("");try{const _=await fe(A,R,6e4);return(A==="settings.refreshDataSources"||A==="settings.saveConnection")&&ID(!0),m(_.state),g(_.message),!0}catch(_){return x(_ instanceof Error?_.message:"操作未完成，请重试。"),!1}finally{j("")}},k=S.useMemo(()=>{const A=u.trim().toLocaleLowerCase("zh-CN");return A?fx.filter(R=>`${R.label} ${R.keywords}`.toLocaleLowerCase("zh-CN").includes(A)):fx},[u]);return n?l.jsx("div",{className:"settings-overlay",onMouseDown:A=>{A.target===A.currentTarget&&a()},children:l.jsxs("div",{className:"settings-window",role:"dialog","aria-modal":"true","aria-label":"设置",children:[l.jsxs("aside",{className:"settings-sidebar",children:[l.jsxs("label",{className:"settings-search",children:[l.jsx(BA,{}),l.jsx("input",{value:u,onChange:A=>h(A.target.value),placeholder:"搜索设置","aria-label":"搜索设置"})]}),l.jsx("div",{className:"settings-sidebar-title",children:"设置"}),l.jsxs("nav",{className:"settings-nav","aria-label":"设置分类",children:[k.map(A=>l.jsxs("button",{type:"button",className:s===A.key?"settings-nav-item active":"settings-nav-item","aria-current":s===A.key?"page":void 0,onClick:()=>o(A.key),children:[l.jsx("span",{className:"settings-nav-icon",children:A.icon}),l.jsx("span",{children:A.label})]},A.key)),k.length===0&&l.jsx("p",{className:"settings-empty-search",children:"没有匹配的设置"})]})]}),l.jsxs("main",{className:"settings-main",children:[l.jsx("button",{ref:E,type:"button",className:"settings-close",onClick:a,"aria-label":"关闭设置",children:l.jsx(YA,{})}),l.jsxs("div",{className:"settings-content",children:[b==="settings.open"&&!d?l.jsx("div",{className:"settings-loading",children:"正在读取本机设置…"}):l.jsxs(l.Fragment,{children:[s==="connection"&&d&&l.jsx(RA,{state:d,busy:b,run:T}),s==="notification"&&d&&l.jsx(OA,{state:d,busy:b,run:T}),s==="data"&&d&&l.jsx(zA,{state:d,busy:b,run:T}),s==="about"&&d&&l.jsx(_A,{state:d})]}),(p||v)&&l.jsx("div",{className:`settings-message ${v?"error":""}`,role:"status","aria-live":"polite",children:v||p})]})]})]})}):null}function RA({state:n,busy:a,run:s}){const[o,u]=S.useState(""),[h,d]=S.useState(!1),[m,p]=S.useState(n.notion.rootPageId);S.useEffect(()=>p(n.notion.rootPageId),[n.notion.rootPageId]);const g=async b=>{await s(b,{token:h?o:"",rootPageId:m})&&(u(""),d(!1))},v=a==="settings.refreshDataSources",x=a==="settings.saveConnection";return l.jsxs(Po,{title:"连接",description:"管理生产助手使用的外部数据源和服务连接。",children:[l.jsxs(ra,{title:"Notion",children:[l.jsx($t,{title:"连接状态",description:"当前本机连接配置和数据源缓存状态",children:l.jsx(l1,{connected:n.notion.configured,label:n.notion.configured?"已配置":"未配置"})}),l.jsx(us,{title:"API 令牌",description:"使用 Windows 当前用户加密后保存在本机",children:l.jsx("input",{className:"settings-input",type:"password",autoComplete:"off",placeholder:"输入 Notion API Token",value:h?o:n.notion.configured?bf:"",onFocus:b=>{!h&&n.notion.configured&&b.currentTarget.select()},onChange:b=>{d(!0),u(b.target.value)}})}),l.jsx(us,{title:"根页面 ID",description:"可选。留空时自动发现当前令牌有权限访问的数据源",children:l.jsx("input",{className:"settings-input",value:m,onChange:b=>p(b.target.value)})}),l.jsxs("div",{className:"settings-buttons",children:[l.jsxs("button",{type:"button",className:"settings-button-primary",disabled:!!a,onClick:()=>g("settings.saveConnection"),children:[x&&l.jsx(ws,{})," ",x?"正在连接…":"保存并连接"]}),l.jsxs("button",{type:"button",className:"settings-button-secondary",disabled:!!a,onClick:()=>g("settings.refreshDataSources"),children:[v&&l.jsx(ws,{})," ",v?"正在刷新…":"刷新数据源"]})]})]}),l.jsxs(ra,{title:"数据源",children:[l.jsx($t,{title:"已发现数据源",description:"最近一次从 Notion 获取的数据源",children:l.jsxs("span",{className:"settings-value",children:[n.notion.dataSourceCount," 个"]})}),l.jsx($t,{title:"上次同步",description:"数据源元信息最后更新时间",children:l.jsx("span",{className:"settings-value",children:n.notion.lastSyncedAt||"尚未同步"})})]})]})}function OA({state:n,busy:a,run:s}){const o=n.notification,[u,h]=S.useState(o.enabled),[d,m]=S.useState(o.channelName),[p,g]=S.useState(""),[v,x]=S.useState(""),[b,j]=S.useState(!1),[E,C]=S.useState(!1),[T,k]=S.useState(o.rules);S.useEffect(()=>{h(o.enabled),m(o.channelName),k(o.rules)},[o]);const A={enabled:u,channelName:d,webhook:b?p:"",secret:E?v:""},R=async Y=>{await s(Y,A)&&(g(""),x(""),j(!1),C(!1))},_=a==="settings.saveNotification",B=a==="settings.testNotification";return l.jsxs(Po,{title:"通知",description:"配置生产助手全局通知使用的技术通道。业务模块只决定何时通知。",children:[l.jsxs(ra,{title:"通知服务",children:[l.jsx($t,{title:"启用通知",description:"关闭后所有业务模块都不会向外发送通知",children:l.jsx(hx,{checked:u,onChange:h,label:"启用通知"})}),l.jsx($t,{title:"发送方式",description:"当前使用的全局通知技术通道",children:l.jsx("span",{className:"settings-value",children:"钉钉机器人 Webhook"})}),l.jsx($t,{title:"连接状态",description:o.checkedAt?`上次测试 ${o.checkedAt}`:"尚未发送测试通知",children:l.jsx(l1,{connected:o.connected,label:o.connected===!0?"连接正常":o.connected===!1?"连接失败":"待测试"})})]}),l.jsxs(ra,{title:"钉钉机器人",children:[l.jsx(us,{title:"Webhook URL",description:"使用 Windows 当前用户加密后保存在本机",children:l.jsx("input",{className:"settings-input",type:"password",autoComplete:"off",placeholder:"https://oapi.dingtalk.com/robot/send?...",value:b?p:o.webhookConfigured?bf:"",onFocus:Y=>{!b&&o.webhookConfigured&&Y.currentTarget.select()},onChange:Y=>{j(!0),g(Y.target.value)}})}),l.jsx(us,{title:"加签密钥",description:"钉钉机器人 Secret，使用 Windows 当前用户加密保存",children:l.jsx("input",{className:"settings-input",type:"password",autoComplete:"off",placeholder:"SEC...",value:E?v:o.secretConfigured?bf:"",onFocus:Y=>{!E&&o.secretConfigured&&Y.currentTarget.select()},onChange:Y=>{C(!0),x(Y.target.value)}})}),l.jsx(us,{title:"默认接收群",description:"用于识别当前通知渠道",children:l.jsx("input",{className:"settings-input",value:d,onChange:Y=>m(Y.target.value),placeholder:"生产管理群"})}),l.jsxs("div",{className:"settings-buttons",children:[l.jsxs("button",{type:"button",className:"settings-button-primary",disabled:!!a,onClick:()=>R("settings.saveNotification"),children:[_&&l.jsx(ws,{})," ",_?"正在保存…":"保存设置"]}),l.jsxs("button",{type:"button",className:"settings-button-secondary",disabled:!!a,onClick:()=>R("settings.testNotification"),children:[B&&l.jsx(ws,{})," ",B?"正在发送…":"发送测试"]})]}),o.status&&l.jsx("p",{className:"settings-inline-status",children:o.status})]}),l.jsxs(ra,{title:"通知规则",children:[l.jsx("div",{className:"settings-rule-list",children:T.map(Y=>l.jsx($t,{title:Y.name,description:`钉钉 · ${VA(Y.level)}`,children:l.jsx(hx,{checked:Y.enabled,label:`通知规则：${Y.name}`,onChange:D=>k(H=>H.map(M=>M.eventType===Y.eventType?{...M,enabled:D}:M))})},Y.eventType))}),l.jsx("div",{className:"settings-buttons settings-buttons-end",children:l.jsx("button",{type:"button",className:"settings-button-primary",disabled:!!a,onClick:()=>s("settings.saveNotificationRules",{rules:T}),children:"保存通知规则"})})]})]})}function zA({state:n,busy:a,run:s}){return l.jsx(Po,{title:"数据与缓存",description:"查看和维护生产助手保存在本机的 Notion 数据源缓存。",children:l.jsxs(ra,{title:"本地数据",children:[l.jsx($t,{title:"Notion 数据源缓存",description:"用于减少重复的网络请求",children:l.jsxs("div",{className:"settings-inline-actions",children:[l.jsxs("span",{className:"settings-value",children:[n.notion.dataSourceCount," 个"]}),l.jsxs("button",{type:"button",className:"settings-text-button",disabled:!!a,onClick:()=>s("settings.refreshDataSources"),children:[a==="settings.refreshDataSources"&&l.jsx(ws,{})," ",a==="settings.refreshDataSources"?"刷新中…":"刷新"]})]})}),l.jsx($t,{title:"上次同步",description:"数据源元信息最后更新时间",children:l.jsx("span",{className:"settings-value",children:n.notion.lastSyncedAt||"尚未同步"})})]})})}function _A({state:n}){return l.jsx(Po,{title:"关于",description:"生产助手的版本和运行环境信息。",children:l.jsxs(ra,{title:"生产助手",children:[l.jsx($t,{title:"版本",description:"当前安装版本",children:l.jsx("span",{className:"settings-value",children:n.version})}),l.jsx($t,{title:"桌面环境",description:"应用运行容器",children:l.jsx("span",{className:"settings-value",children:"WinUI 3 + WebView2"})}),l.jsx($t,{title:"前端",description:"用户界面技术栈",children:l.jsx("span",{className:"settings-value",children:"React + TypeScript"})}),l.jsx($t,{title:"本地数据保护",description:"令牌和通知凭据仅保存在本机",children:l.jsx("span",{className:"settings-value",children:"Windows 当前用户加密"})})]})})}function Po({title:n,description:a,children:s}){return l.jsxs("div",{className:"settings-page",children:[l.jsxs("header",{className:"settings-page-header",children:[l.jsx("h1",{children:n}),l.jsx("p",{children:a})]}),s]})}function ra({title:n,children:a}){return l.jsxs("section",{className:"settings-section",children:[l.jsx("h2",{children:n}),l.jsx("div",{className:"settings-section-body",children:a})]})}function $t({title:n,description:a,children:s}){return l.jsxs("div",{className:"settings-row",children:[l.jsxs("div",{className:"settings-row-text",children:[l.jsx("div",{className:"settings-row-title",children:n}),a&&l.jsx("div",{className:"settings-row-description",children:a})]}),l.jsx("div",{className:"settings-row-control",children:s})]})}function us({title:n,description:a,children:s}){return l.jsxs("label",{className:"settings-field",children:[l.jsx("span",{className:"settings-field-title",children:n}),a&&l.jsx("span",{className:"settings-field-description",children:a}),l.jsx("span",{className:"settings-field-control",children:s})]})}function hx({checked:n,onChange:a,label:s}){return l.jsx("button",{type:"button",role:"switch","aria-checked":n,"aria-label":s,className:n?"settings-switch checked":"settings-switch",onClick:()=>a(!n),children:l.jsx("span",{})})}function l1({connected:n,label:a}){return l.jsxs("div",{className:`settings-connected ${n===!1?"error":n===null?"pending":""}`,children:[l.jsx("span",{className:"settings-status-dot"}),a]})}function ws(){return l.jsx("span",{className:"settings-spinner","aria-hidden":"true"})}const VA=n=>n==="warning"?"警告":n==="info"?"信息":"错误";function BA(){return l.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[l.jsx("circle",{cx:"11",cy:"11",r:"6.5"}),l.jsx("path",{d:"m16 16 4 4"})]})}function LA(){return l.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[l.jsx("path",{d:"M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"}),l.jsx("path",{d:"M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1"})]})}function UA(){return l.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[l.jsx("path",{d:"M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"}),l.jsx("path",{d:"M10 21h4"})]})}function HA(){return l.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[l.jsx("ellipse",{cx:"12",cy:"5",rx:"7",ry:"3"}),l.jsx("path",{d:"M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5"}),l.jsx("path",{d:"M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"})]})}function qA(){return l.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[l.jsx("circle",{cx:"12",cy:"12",r:"9"}),l.jsx("path",{d:"M12 11v6"}),l.jsx("path",{d:"M12 7h.01"})]})}function YA(){return l.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[l.jsx("path",{d:"m6 6 12 12"}),l.jsx("path",{d:"m18 6-12 12"})]})}const zd=new Date().toISOString().slice(0,10);function PA(){const[n,a]=S.useState(""),[s,o]=S.useState(!1),[u,h]=S.useState([]),[d,m]=S.useState(""),[p,g]=S.useState([]),[v,x]=S.useState(""),[b,j]=S.useState([]),[E,C]=S.useState(""),[T,k]=S.useState([]),[A,R]=S.useState(""),[_,B]=S.useState(""),[Y,D]=S.useState("day"),[H,M]=S.useState(zd),[z,L]=S.useState(zd),[K,ce]=S.useState(zd),[se,ye]=S.useState("load"),[P,oe]=S.useState(""),[J,$]=S.useState();S.useEffect(()=>{fe("database.getState").then(ne=>{a(ne.provider),o(ne.usesBusinessSections),h(ne.businessSections),g(ne.sources)}).catch(ne=>oe(ne instanceof Error?ne.message:String(ne))).finally(()=>ye(""))},[]);const ae=async ne=>{var ue,Ne,Me,De;if(x(ne),C(""),R(""),B(""),j([]),k([]),$(void 0),oe(""),!!ne){ye("schema");try{const Te=await fe("database.getSchema",{sourceId:ne});k(Te.fields),j(Te.datasets),R(((ue=Te.fields.find(ct=>ct.type==="date"))==null?void 0:ue.id)||""),B(((Ne=Te.fields.find(ct=>ct.type==="number"))==null?void 0:Ne.id)||""),C(((Me=Te.datasets.find(ct=>ct.name==="本年截止今日"))==null?void 0:Me.id)||((De=Te.datasets[0])==null?void 0:De.id)||"")}catch(Te){oe(Te instanceof Error?Te.message:String(Te))}finally{ye("")}}},N=async()=>{ye("query"),oe(""),$(void 0);try{$(await fe("database.inspect",{sourceId:v,datasetId:E,dateFieldId:xe?A:"",valueFieldId:xe?_:"",rangeKind:xe?Y:"all",businessDate:H,startDate:z,endDate:K},12e4))}catch(ne){oe(ne instanceof Error?ne.message:String(ne))}finally{ye("")}},V=T.filter(ne=>ne.type==="date"),ee=s?p.filter(ne=>ne.businessSection===d):p,le=T.filter(ne=>ne.type==="number"),de=T.find(ne=>ne.id===_),me=b.find(ne=>ne.id===E),xe=(me==null?void 0:me.name.trim())==="本年截止今日",ie=S.useMemo(()=>{const ne=new Set([A,_]);return[...T.filter(ue=>ne.has(ue.id)),...T.filter(ue=>!ne.has(ue.id))]},[T,A,_]),W=Y==="week"||Y==="custom",he=v&&E&&(!xe||A&&(!W||z&&K));return l.jsxs("div",{className:"page database-viewer-page",children:[l.jsxs("header",{children:[l.jsxs("div",{children:[l.jsx("h1",{children:"数据库查看"}),l.jsx("p",{children:"按当前适配器提供的目录选择数据库并查看真实 View；目录层级不会由界面写死。"})]}),l.jsxs("span",{className:"database-provider",children:[l.jsx(sf,{}),"当前适配器：",n||"读取中"]})]}),l.jsxs("section",{className:"database-query-panel",children:[l.jsxs("div",{className:"database-query-heading",children:[l.jsx("h2",{children:"查询条件"}),l.jsx("p",{children:"普通 View 读取其完整结果；只有“本年截止今日”可在返回记录内计算日期口径。"})]}),l.jsxs("div",{className:"database-query-grid",children:[s&&l.jsxs("label",{children:["业务板块",l.jsx(ot,{value:d,placeholder:se==="load"?"正在读取业务板块…":"请选择业务板块",disabled:!!se,options:u.map(ne=>({value:ne,label:ne})),onChange:ne=>{m(ne),ae("")}})]}),l.jsxs("label",{children:["数据库",l.jsx(ot,{value:v,placeholder:"请选择具体数据库",disabled:s&&!d||!!se,options:ee.map(ne=>({value:ne.id,label:ne.name})),onChange:ae})]}),l.jsxs("label",{children:["View",l.jsx(ot,{value:E,placeholder:se==="schema"?"正在读取 View…":"请选择 View",disabled:!v||!!se,options:b.map(ne=>({value:ne.id,label:ne.name})),onChange:ne=>{C(ne),$(void 0)}})]}),xe&&l.jsxs(l.Fragment,{children:[l.jsxs("label",{children:["日期字段",l.jsx(ot,{value:A,placeholder:"请选择日期字段",disabled:!T.length||!!se,options:V.map(ne=>({value:ne.id,label:ne.name})),onChange:R})]}),l.jsxs("label",{children:["累计字段",l.jsx(ot,{value:_,placeholder:"可选择数值字段",disabled:!T.length||!!se,options:le.map(ne=>({value:ne.id,label:ne.name})),onChange:B})]}),l.jsxs("label",{children:["软件查询口径",l.jsx(ot,{value:Y,placeholder:"请选择日期口径",disabled:!!se,options:[{value:"day",label:"指定日期"},{value:"week",label:"指定日期范围"},{value:"month",label:"月初至指定日期"},{value:"year",label:"年初至指定日期"}],onChange:ne=>{D(ne),$(void 0)}})]}),!W&&l.jsxs("label",{children:["指定日期",l.jsx(Kt,{value:H,onChange:M})]}),W&&l.jsxs(l.Fragment,{children:[l.jsxs("label",{children:["开始日期",l.jsx(Kt,{value:z,onChange:L})]}),l.jsxs("label",{children:["结束日期",l.jsx(Kt,{value:K,onChange:ce})]})]})]})]}),l.jsx("div",{className:"database-query-actions",children:l.jsxs("button",{className:"primary",disabled:!he||!!se,onClick:N,children:[se==="query"?l.jsx(yn,{className:"spin"}):l.jsx(XC,{}),se==="query"?"正在查询…":"执行查询"]})})]}),P&&l.jsxs("div",{className:"notice error",role:"alert",children:[l.jsx(PC,{}),l.jsxs("div",{children:[l.jsx("strong",{children:"查询失败"}),l.jsx("span",{children:P})]})]}),J?l.jsxs("section",{className:"database-result",children:[l.jsxs("div",{className:"database-result-head",children:[l.jsxs("div",{children:[l.jsxs("h2",{children:[J.sourceName," · ",J.datasetName]}),l.jsx("p",{children:xe?`${J.startDate} ～ ${J.endDate}`:"完整 View 结果"})]}),l.jsxs("dl",{children:[l.jsxs("div",{children:[l.jsxs("dt",{children:[l.jsx(QC,{}),"命中记录"]}),l.jsx("dd",{children:J.recordCount})]}),xe&&l.jsxs("div",{children:[l.jsxs("dt",{children:[l.jsx(JC,{}),(de==null?void 0:de.name)||"累计值"]}),l.jsx("dd",{children:J.total??"—"})]})]})]}),l.jsx("div",{className:"database-table-wrap",children:l.jsxs("table",{children:[l.jsx("thead",{children:l.jsx("tr",{children:ie.map(ne=>l.jsxs("th",{children:[ne.name,l.jsx("small",{children:ne.type})]},ne.id))})}),l.jsx("tbody",{children:J.records.map(ne=>l.jsx("tr",{children:ie.map(ue=>l.jsx("td",{children:GA(ne.values[ue.id])},ue.id))},ne.id))})]})}),J.truncated&&l.jsx("p",{className:"database-truncated",children:"结果仅展示前 200 条，命中数量和累计值按全部记录计算。"})]}):!se&&!P&&l.jsxs("section",{className:"database-empty",children:[l.jsx(sf,{}),l.jsx("h2",{children:s?"选择业务板块、数据库和 View 后执行查询":"选择数据库和 View 后执行查询"}),l.jsx("p",{children:"普通 View 显示完整结果；“本年截止今日”可进一步选择日期口径。所有操作均为只读。"})]})]})}function GA(n){return n==null||n===""?"—":typeof n=="boolean"?n?"是":"否":typeof n=="number"?n.toLocaleString("zh-CN",{maximumFractionDigits:2}):String(n)}function FA(){const[n,a]=S.useState(()=>window.location.search),[s,o]=S.useState(!1);S.useEffect(()=>{const j=()=>a(window.location.search);return window.addEventListener("popstate",j),()=>window.removeEventListener("popstate",j)},[]);const u=new URLSearchParams(n),h=u.get("route"),d=h!=null&&h.startsWith("navigation:")||h==="daily-weld"||h==="production-message"||h==="database-viewer"||h==="daily-report"||h==="report-center"||h==="plan-pdf"||h==="production-meeting"?h:"production-message",m=u.get("navigation")||"",p=t0();S.useEffect(()=>{zC(d,m)},[d,m]);const g=j=>fe("app.navigateNative",{tag:j}).catch(()=>{}),v=d.startsWith("navigation:")?d.slice(11):d,x=d.startsWith("navigation:");S.useEffect(()=>(document.body.classList.toggle("settings-over-native",x&&s),()=>document.body.classList.remove("settings-over-native")),[x,s]);const b=()=>{o(!1),window.dispatchEvent(new Event("production-settings-updated")),fe("settings.close").catch(()=>{})};return l.jsxs("div",{className:`desktop-shell ${x&&s?"settings-over-native":""}`,children:[l.jsx("div",{className:"production-message-demo desktop-shell-navigation",children:l.jsx(yA,{active:v,navigate:g,openSettings:()=>o(!0)})}),l.jsx("div",{className:`desktop-shell-content ${x?"desktop-shell-content-native":""}`,children:x?l.jsx("div",{className:"native-content-slot","aria-hidden":"true"}):l.jsx(wT,{mode:"wait",children:l.jsx(n0.div,{className:d==="production-message"||d==="daily-weld"?"production-message-demo production-message-content":"app-shell","data-page-route":d,initial:p?!1:{opacity:0,y:8},animate:{opacity:1,y:0},exit:p?void 0:{opacity:0,y:-6},transition:{duration:.2},children:d==="production-message"?l.jsx(EA,{}):d==="daily-weld"?l.jsx(mA,{openSettings:()=>o(!0)}):l.jsx("main",{children:d==="production-meeting"?l.jsx(AA,{}):d==="plan-pdf"?l.jsx(NA,{}):d==="database-viewer"?l.jsx(PA,{}):d==="daily-report"?l.jsx(dA,{openSettings:()=>o(!0)}):l.jsx(kA,{})})},d)})}),l.jsx(MA,{open:s,onClose:b})]})}Oj.createRoot(document.getElementById("root")).render(l.jsx(gx.StrictMode,{children:l.jsx(FA,{})}));
