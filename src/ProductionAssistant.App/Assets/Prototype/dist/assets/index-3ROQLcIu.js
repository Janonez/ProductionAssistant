function u2(n,a){for(var s=0;s<a.length;s++){const l=a[s];if(typeof l!="string"&&!Array.isArray(l)){for(const u in l)if(u!=="default"&&!(u in n)){const h=Object.getOwnPropertyDescriptor(l,u);h&&Object.defineProperty(n,u,h.get?h:{enumerable:!0,get:()=>l[u]})}}}return Object.freeze(Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}))}(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const u of document.querySelectorAll('link[rel="modulepreload"]'))l(u);new MutationObserver(u=>{for(const h of u)if(h.type==="childList")for(const f of h.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&l(f)}).observe(document,{childList:!0,subtree:!0});function s(u){const h={};return u.integrity&&(h.integrity=u.integrity),u.referrerPolicy&&(h.referrerPolicy=u.referrerPolicy),u.crossOrigin==="use-credentials"?h.credentials="include":u.crossOrigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function l(u){if(u.ep)return;u.ep=!0;const h=s(u);fetch(u.href,h)}})();function Jv(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var Vu={exports:{}},qi={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Gg;function d2(){if(Gg)return qi;Gg=1;var n=Symbol.for("react.transitional.element"),a=Symbol.for("react.fragment");function s(l,u,h){var f=null;if(h!==void 0&&(f=""+h),u.key!==void 0&&(f=""+u.key),"key"in u){h={};for(var m in u)m!=="key"&&(h[m]=u[m])}else h=u;return u=h.ref,{$$typeof:n,type:l,key:f,ref:u!==void 0?u:null,props:h}}return qi.Fragment=a,qi.jsx=s,qi.jsxs=s,qi}var Xg;function f2(){return Xg||(Xg=1,Vu.exports=d2()),Vu.exports}var o=f2(),Bu={exports:{}},Se={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Pg;function h2(){if(Pg)return Se;Pg=1;var n=Symbol.for("react.transitional.element"),a=Symbol.for("react.portal"),s=Symbol.for("react.fragment"),l=Symbol.for("react.strict_mode"),u=Symbol.for("react.profiler"),h=Symbol.for("react.consumer"),f=Symbol.for("react.context"),m=Symbol.for("react.forward_ref"),g=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),x=Symbol.for("react.activity"),b=Symbol.iterator;function j(N){return N===null||typeof N!="object"?null:(N=b&&N[b]||N["@@iterator"],typeof N=="function"?N:null)}var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},T=Object.assign,C={};function R(N,V,I){this.props=N,this.context=V,this.refs=C,this.updater=I||E}R.prototype.isReactComponent={},R.prototype.setState=function(N,V){if(typeof N!="object"&&typeof N!="function"&&N!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,N,V,"setState")},R.prototype.forceUpdate=function(N){this.updater.enqueueForceUpdate(this,N,"forceUpdate")};function k(){}k.prototype=R.prototype;function _(N,V,I){this.props=N,this.context=V,this.refs=C,this.updater=I||E}var O=_.prototype=new k;O.constructor=_,T(O,R.prototype),O.isPureReactComponent=!0;var U=Array.isArray;function P(){}var M={H:null,A:null,T:null,S:null},D=Object.prototype.hasOwnProperty;function q(N,V,I){var re=I.ref;return{$$typeof:n,type:N,key:V,ref:re!==void 0?re:null,props:I}}function $(N,V){return q(N.type,V,N.props)}function ee(N){return typeof N=="object"&&N!==null&&N.$$typeof===n}function ne(N){var V={"=":"=0",":":"=2"};return"$"+N.replace(/[=:]/g,function(I){return V[I]})}var pe=/\/+/g;function le(N,V){return typeof N=="object"&&N!==null&&N.key!=null?ne(""+N.key):V.toString(36)}function se(N){switch(N.status){case"fulfilled":return N.value;case"rejected":throw N.reason;default:switch(typeof N.status=="string"?N.then(P,P):(N.status="pending",N.then(function(V){N.status==="pending"&&(N.status="fulfilled",N.value=V)},function(V){N.status==="pending"&&(N.status="rejected",N.reason=V)})),N.status){case"fulfilled":return N.value;case"rejected":throw N.reason}}throw N}function L(N,V,I,re,ce){var ye=typeof N;(ye==="undefined"||ye==="boolean")&&(N=null);var xe=!1;if(N===null)xe=!0;else switch(ye){case"bigint":case"string":case"number":xe=!0;break;case"object":switch(N.$$typeof){case n:case a:xe=!0;break;case v:return xe=N._init,L(xe(N._payload),V,I,re,ce)}}if(xe)return ce=ce(N),xe=re===""?"."+le(N,0):re,U(ce)?(I="",xe!=null&&(I=xe.replace(pe,"$&/")+"/"),L(ce,V,I,"",function(de){return de})):ce!=null&&(ee(ce)&&(ce=$(ce,I+(ce.key==null||N&&N.key===ce.key?"":(""+ce.key).replace(pe,"$&/")+"/")+xe)),V.push(ce)),1;xe=0;var te=re===""?".":re+":";if(U(N))for(var Q=0;Q<N.length;Q++)re=N[Q],ye=te+le(re,Q),xe+=L(re,V,I,ye,ce);else if(Q=j(N),typeof Q=="function")for(N=Q.call(N),Q=0;!(re=N.next()).done;)re=re.value,ye=te+le(re,Q++),xe+=L(re,V,I,ye,ce);else if(ye==="object"){if(typeof N.then=="function")return L(se(N),V,I,re,ce);throw V=String(N),Error("Objects are not valid as a React child (found: "+(V==="[object Object]"?"object with keys {"+Object.keys(N).join(", ")+"}":V)+"). If you meant to render a collection of children, use an array instead.")}return xe}function F(N,V,I){if(N==null)return N;var re=[],ce=0;return L(N,re,"","",function(ye){return V.call(I,ye,ce++)}),re}function ae(N){if(N._status===-1){var V=N._result;V=V(),V.then(function(I){(N._status===0||N._status===-1)&&(N._status=1,N._result=I)},function(I){(N._status===0||N._status===-1)&&(N._status=2,N._result=I)}),N._status===-1&&(N._status=0,N._result=V)}if(N._status===1)return N._result.default;throw N._result}var ie=typeof reportError=="function"?reportError:function(N){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var V=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof N=="object"&&N!==null&&typeof N.message=="string"?String(N.message):String(N),error:N});if(!window.dispatchEvent(V))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",N);return}console.error(N)},oe={map:F,forEach:function(N,V,I){F(N,function(){V.apply(this,arguments)},I)},count:function(N){var V=0;return F(N,function(){V++}),V},toArray:function(N){return F(N,function(V){return V})||[]},only:function(N){if(!ee(N))throw Error("React.Children.only expected to receive a single React element child.");return N}};return Se.Activity=x,Se.Children=oe,Se.Component=R,Se.Fragment=s,Se.Profiler=u,Se.PureComponent=_,Se.StrictMode=l,Se.Suspense=g,Se.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=M,Se.__COMPILER_RUNTIME={__proto__:null,c:function(N){return M.H.useMemoCache(N)}},Se.cache=function(N){return function(){return N.apply(null,arguments)}},Se.cacheSignal=function(){return null},Se.cloneElement=function(N,V,I){if(N==null)throw Error("The argument must be a React element, but you passed "+N+".");var re=T({},N.props),ce=N.key;if(V!=null)for(ye in V.key!==void 0&&(ce=""+V.key),V)!D.call(V,ye)||ye==="key"||ye==="__self"||ye==="__source"||ye==="ref"&&V.ref===void 0||(re[ye]=V[ye]);var ye=arguments.length-2;if(ye===1)re.children=I;else if(1<ye){for(var xe=Array(ye),te=0;te<ye;te++)xe[te]=arguments[te+2];re.children=xe}return q(N.type,ce,re)},Se.createContext=function(N){return N={$$typeof:f,_currentValue:N,_currentValue2:N,_threadCount:0,Provider:null,Consumer:null},N.Provider=N,N.Consumer={$$typeof:h,_context:N},N},Se.createElement=function(N,V,I){var re,ce={},ye=null;if(V!=null)for(re in V.key!==void 0&&(ye=""+V.key),V)D.call(V,re)&&re!=="key"&&re!=="__self"&&re!=="__source"&&(ce[re]=V[re]);var xe=arguments.length-2;if(xe===1)ce.children=I;else if(1<xe){for(var te=Array(xe),Q=0;Q<xe;Q++)te[Q]=arguments[Q+2];ce.children=te}if(N&&N.defaultProps)for(re in xe=N.defaultProps,xe)ce[re]===void 0&&(ce[re]=xe[re]);return q(N,ye,ce)},Se.createRef=function(){return{current:null}},Se.forwardRef=function(N){return{$$typeof:m,render:N}},Se.isValidElement=ee,Se.lazy=function(N){return{$$typeof:v,_payload:{_status:-1,_result:N},_init:ae}},Se.memo=function(N,V){return{$$typeof:p,type:N,compare:V===void 0?null:V}},Se.startTransition=function(N){var V=M.T,I={};M.T=I;try{var re=N(),ce=M.S;ce!==null&&ce(I,re),typeof re=="object"&&re!==null&&typeof re.then=="function"&&re.then(P,ie)}catch(ye){ie(ye)}finally{V!==null&&I.types!==null&&(V.types=I.types),M.T=V}},Se.unstable_useCacheRefresh=function(){return M.H.useCacheRefresh()},Se.use=function(N){return M.H.use(N)},Se.useActionState=function(N,V,I){return M.H.useActionState(N,V,I)},Se.useCallback=function(N,V){return M.H.useCallback(N,V)},Se.useContext=function(N){return M.H.useContext(N)},Se.useDebugValue=function(){},Se.useDeferredValue=function(N,V){return M.H.useDeferredValue(N,V)},Se.useEffect=function(N,V){return M.H.useEffect(N,V)},Se.useEffectEvent=function(N){return M.H.useEffectEvent(N)},Se.useId=function(){return M.H.useId()},Se.useImperativeHandle=function(N,V,I){return M.H.useImperativeHandle(N,V,I)},Se.useInsertionEffect=function(N,V){return M.H.useInsertionEffect(N,V)},Se.useLayoutEffect=function(N,V){return M.H.useLayoutEffect(N,V)},Se.useMemo=function(N,V){return M.H.useMemo(N,V)},Se.useOptimistic=function(N,V){return M.H.useOptimistic(N,V)},Se.useReducer=function(N,V,I){return M.H.useReducer(N,V,I)},Se.useRef=function(N){return M.H.useRef(N)},Se.useState=function(N){return M.H.useState(N)},Se.useSyncExternalStore=function(N,V,I){return M.H.useSyncExternalStore(N,V,I)},Se.useTransition=function(){return M.H.useTransition()},Se.version="19.2.8",Se}var Fg;function Wd(){return Fg||(Fg=1,Bu.exports=h2()),Bu.exports}var S=Wd();const Wv=Jv(S),is=u2({__proto__:null,default:Wv},[S]);var Lu={exports:{}},Yi={},Uu={exports:{}},Hu={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $g;function m2(){return $g||($g=1,(function(n){function a(L,F){var ae=L.length;L.push(F);e:for(;0<ae;){var ie=ae-1>>>1,oe=L[ie];if(0<u(oe,F))L[ie]=F,L[ae]=oe,ae=ie;else break e}}function s(L){return L.length===0?null:L[0]}function l(L){if(L.length===0)return null;var F=L[0],ae=L.pop();if(ae!==F){L[0]=ae;e:for(var ie=0,oe=L.length,N=oe>>>1;ie<N;){var V=2*(ie+1)-1,I=L[V],re=V+1,ce=L[re];if(0>u(I,ae))re<oe&&0>u(ce,I)?(L[ie]=ce,L[re]=ae,ie=re):(L[ie]=I,L[V]=ae,ie=V);else if(re<oe&&0>u(ce,ae))L[ie]=ce,L[re]=ae,ie=re;else break e}}return F}function u(L,F){var ae=L.sortIndex-F.sortIndex;return ae!==0?ae:L.id-F.id}if(n.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var h=performance;n.unstable_now=function(){return h.now()}}else{var f=Date,m=f.now();n.unstable_now=function(){return f.now()-m}}var g=[],p=[],v=1,x=null,b=3,j=!1,E=!1,T=!1,C=!1,R=typeof setTimeout=="function"?setTimeout:null,k=typeof clearTimeout=="function"?clearTimeout:null,_=typeof setImmediate<"u"?setImmediate:null;function O(L){for(var F=s(p);F!==null;){if(F.callback===null)l(p);else if(F.startTime<=L)l(p),F.sortIndex=F.expirationTime,a(g,F);else break;F=s(p)}}function U(L){if(T=!1,O(L),!E)if(s(g)!==null)E=!0,P||(P=!0,ne());else{var F=s(p);F!==null&&se(U,F.startTime-L)}}var P=!1,M=-1,D=5,q=-1;function $(){return C?!0:!(n.unstable_now()-q<D)}function ee(){if(C=!1,P){var L=n.unstable_now();q=L;var F=!0;try{e:{E=!1,T&&(T=!1,k(M),M=-1),j=!0;var ae=b;try{t:{for(O(L),x=s(g);x!==null&&!(x.expirationTime>L&&$());){var ie=x.callback;if(typeof ie=="function"){x.callback=null,b=x.priorityLevel;var oe=ie(x.expirationTime<=L);if(L=n.unstable_now(),typeof oe=="function"){x.callback=oe,O(L),F=!0;break t}x===s(g)&&l(g),O(L)}else l(g);x=s(g)}if(x!==null)F=!0;else{var N=s(p);N!==null&&se(U,N.startTime-L),F=!1}}break e}finally{x=null,b=ae,j=!1}F=void 0}}finally{F?ne():P=!1}}}var ne;if(typeof _=="function")ne=function(){_(ee)};else if(typeof MessageChannel<"u"){var pe=new MessageChannel,le=pe.port2;pe.port1.onmessage=ee,ne=function(){le.postMessage(null)}}else ne=function(){R(ee,0)};function se(L,F){M=R(function(){L(n.unstable_now())},F)}n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(L){L.callback=null},n.unstable_forceFrameRate=function(L){0>L||125<L?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):D=0<L?Math.floor(1e3/L):5},n.unstable_getCurrentPriorityLevel=function(){return b},n.unstable_next=function(L){switch(b){case 1:case 2:case 3:var F=3;break;default:F=b}var ae=b;b=F;try{return L()}finally{b=ae}},n.unstable_requestPaint=function(){C=!0},n.unstable_runWithPriority=function(L,F){switch(L){case 1:case 2:case 3:case 4:case 5:break;default:L=3}var ae=b;b=L;try{return F()}finally{b=ae}},n.unstable_scheduleCallback=function(L,F,ae){var ie=n.unstable_now();switch(typeof ae=="object"&&ae!==null?(ae=ae.delay,ae=typeof ae=="number"&&0<ae?ie+ae:ie):ae=ie,L){case 1:var oe=-1;break;case 2:oe=250;break;case 5:oe=1073741823;break;case 4:oe=1e4;break;default:oe=5e3}return oe=ae+oe,L={id:v++,callback:F,priorityLevel:L,startTime:ae,expirationTime:oe,sortIndex:-1},ae>ie?(L.sortIndex=ae,a(p,L),s(g)===null&&L===s(p)&&(T?(k(M),M=-1):T=!0,se(U,ae-ie))):(L.sortIndex=oe,a(g,L),E||j||(E=!0,P||(P=!0,ne()))),L},n.unstable_shouldYield=$,n.unstable_wrapCallback=function(L){var F=b;return function(){var ae=b;b=F;try{return L.apply(this,arguments)}finally{b=ae}}}})(Hu)),Hu}var Kg;function p2(){return Kg||(Kg=1,Uu.exports=m2()),Uu.exports}var qu={exports:{}},gt={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Zg;function g2(){if(Zg)return gt;Zg=1;var n=Wd();function a(g){var p="https://react.dev/errors/"+g;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var v=2;v<arguments.length;v++)p+="&args[]="+encodeURIComponent(arguments[v])}return"Minified React error #"+g+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function s(){}var l={d:{f:s,r:function(){throw Error(a(522))},D:s,C:s,L:s,m:s,X:s,S:s,M:s},p:0,findDOMNode:null},u=Symbol.for("react.portal");function h(g,p,v){var x=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:u,key:x==null?null:""+x,children:g,containerInfo:p,implementation:v}}var f=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function m(g,p){if(g==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return gt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=l,gt.createPortal=function(g,p){var v=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(a(299));return h(g,p,null,v)},gt.flushSync=function(g){var p=f.T,v=l.p;try{if(f.T=null,l.p=2,g)return g()}finally{f.T=p,l.p=v,l.d.f()}},gt.preconnect=function(g,p){typeof g=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,l.d.C(g,p))},gt.prefetchDNS=function(g){typeof g=="string"&&l.d.D(g)},gt.preinit=function(g,p){if(typeof g=="string"&&p&&typeof p.as=="string"){var v=p.as,x=m(v,p.crossOrigin),b=typeof p.integrity=="string"?p.integrity:void 0,j=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;v==="style"?l.d.S(g,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:x,integrity:b,fetchPriority:j}):v==="script"&&l.d.X(g,{crossOrigin:x,integrity:b,fetchPriority:j,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},gt.preinitModule=function(g,p){if(typeof g=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var v=m(p.as,p.crossOrigin);l.d.M(g,{crossOrigin:v,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&l.d.M(g)},gt.preload=function(g,p){if(typeof g=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var v=p.as,x=m(v,p.crossOrigin);l.d.L(g,v,{crossOrigin:x,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},gt.preloadModule=function(g,p){if(typeof g=="string")if(p){var v=m(p.as,p.crossOrigin);l.d.m(g,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:v,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else l.d.m(g)},gt.requestFormReset=function(g){l.d.r(g)},gt.unstable_batchedUpdates=function(g,p){return g(p)},gt.useFormState=function(g,p,v){return f.H.useFormState(g,p,v)},gt.useFormStatus=function(){return f.H.useHostTransitionStatus()},gt.version="19.2.8",gt}var Qg;function Iv(){if(Qg)return qu.exports;Qg=1;function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(a){console.error(a)}}return n(),qu.exports=g2(),qu.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Jg;function y2(){if(Jg)return Yi;Jg=1;var n=p2(),a=Wd(),s=Iv();function l(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var r=2;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function u(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function h(e){var t=e,r=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(r=t.return),e=t.return;while(e)}return t.tag===3?r:null}function f(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function m(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function g(e){if(h(e)!==e)throw Error(l(188))}function p(e){var t=e.alternate;if(!t){if(t=h(e),t===null)throw Error(l(188));return t!==e?null:e}for(var r=e,i=t;;){var c=r.return;if(c===null)break;var d=c.alternate;if(d===null){if(i=c.return,i!==null){r=i;continue}break}if(c.child===d.child){for(d=c.child;d;){if(d===r)return g(c),e;if(d===i)return g(c),t;d=d.sibling}throw Error(l(188))}if(r.return!==i.return)r=c,i=d;else{for(var y=!1,w=c.child;w;){if(w===r){y=!0,r=c,i=d;break}if(w===i){y=!0,i=c,r=d;break}w=w.sibling}if(!y){for(w=d.child;w;){if(w===r){y=!0,r=d,i=c;break}if(w===i){y=!0,i=d,r=c;break}w=w.sibling}if(!y)throw Error(l(189))}}if(r.alternate!==i)throw Error(l(190))}if(r.tag!==3)throw Error(l(188));return r.stateNode.current===r?e:t}function v(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=v(e),t!==null)return t;e=e.sibling}return null}var x=Object.assign,b=Symbol.for("react.element"),j=Symbol.for("react.transitional.element"),E=Symbol.for("react.portal"),T=Symbol.for("react.fragment"),C=Symbol.for("react.strict_mode"),R=Symbol.for("react.profiler"),k=Symbol.for("react.consumer"),_=Symbol.for("react.context"),O=Symbol.for("react.forward_ref"),U=Symbol.for("react.suspense"),P=Symbol.for("react.suspense_list"),M=Symbol.for("react.memo"),D=Symbol.for("react.lazy"),q=Symbol.for("react.activity"),$=Symbol.for("react.memo_cache_sentinel"),ee=Symbol.iterator;function ne(e){return e===null||typeof e!="object"?null:(e=ee&&e[ee]||e["@@iterator"],typeof e=="function"?e:null)}var pe=Symbol.for("react.client.reference");function le(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===pe?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case T:return"Fragment";case R:return"Profiler";case C:return"StrictMode";case U:return"Suspense";case P:return"SuspenseList";case q:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case E:return"Portal";case _:return e.displayName||"Context";case k:return(e._context.displayName||"Context")+".Consumer";case O:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case M:return t=e.displayName||null,t!==null?t:le(e.type)||"Memo";case D:t=e._payload,e=e._init;try{return le(e(t))}catch{}}return null}var se=Array.isArray,L=a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,F=s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ae={pending:!1,data:null,method:null,action:null},ie=[],oe=-1;function N(e){return{current:e}}function V(e){0>oe||(e.current=ie[oe],ie[oe]=null,oe--)}function I(e,t){oe++,ie[oe]=e.current,e.current=t}var re=N(null),ce=N(null),ye=N(null),xe=N(null);function te(e,t){switch(I(ye,t),I(ce,e),I(re,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?fg(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=fg(t),e=hg(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}V(re),I(re,e)}function Q(){V(re),V(ce),V(ye)}function de(e){e.memoizedState!==null&&I(xe,e);var t=re.current,r=hg(t,e.type);t!==r&&(I(ce,e),I(re,r))}function W(e){ce.current===e&&(V(re),V(ce)),xe.current===e&&(V(xe),Bi._currentValue=ae)}var he,Ce;function ze(e){if(he===void 0)try{throw Error()}catch(r){var t=r.stack.trim().match(/\n( *(at )?)/);he=t&&t[1]||"",Ce=-1<r.stack.indexOf(`
    at`)?" (<anonymous>)":-1<r.stack.indexOf("@")?"@unknown:0:0":""}return`
`+he+e+Ce}var Qe=!1;function Fe(e,t){if(!e||Qe)return"";Qe=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(t){var J=function(){throw Error()};if(Object.defineProperty(J.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(J,[])}catch(X){var G=X}Reflect.construct(e,[],J)}else{try{J.call()}catch(X){G=X}e.call(J.prototype)}}else{try{throw Error()}catch(X){G=X}(J=e())&&typeof J.catch=="function"&&J.catch(function(){})}}catch(X){if(X&&G&&typeof X.stack=="string")return[X.stack,G.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var c=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");c&&c.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var d=i.DetermineComponentFrameRoot(),y=d[0],w=d[1];if(y&&w){var A=y.split(`
`),Y=w.split(`
`);for(c=i=0;i<A.length&&!A[i].includes("DetermineComponentFrameRoot");)i++;for(;c<Y.length&&!Y[c].includes("DetermineComponentFrameRoot");)c++;if(i===A.length||c===Y.length)for(i=A.length-1,c=Y.length-1;1<=i&&0<=c&&A[i]!==Y[c];)c--;for(;1<=i&&0<=c;i--,c--)if(A[i]!==Y[c]){if(i!==1||c!==1)do if(i--,c--,0>c||A[i]!==Y[c]){var K=`
`+A[i].replace(" at new "," at ");return e.displayName&&K.includes("<anonymous>")&&(K=K.replace("<anonymous>",e.displayName)),K}while(1<=i&&0<=c);break}}}finally{Qe=!1,Error.prepareStackTrace=r}return(r=e?e.displayName||e.name:"")?ze(r):""}function yt(e,t){switch(e.tag){case 26:case 27:case 5:return ze(e.type);case 16:return ze("Lazy");case 13:return e.child!==t&&t!==null?ze("Suspense Fallback"):ze("Suspense");case 19:return ze("SuspenseList");case 0:case 15:return Fe(e.type,!1);case 11:return Fe(e.type.render,!1);case 1:return Fe(e.type,!0);case 31:return ze("Activity");default:return""}}function Gf(e){try{var t="",r=null;do t+=yt(e,r),r=e,e=e.return;while(e);return t}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var So=Object.prototype.hasOwnProperty,wo=n.unstable_scheduleCallback,jo=n.unstable_cancelCallback,Yb=n.unstable_shouldYield,Gb=n.unstable_requestPaint,Dt=n.unstable_now,Xb=n.unstable_getCurrentPriorityLevel,Xf=n.unstable_ImmediatePriority,Pf=n.unstable_UserBlockingPriority,fs=n.unstable_NormalPriority,Pb=n.unstable_LowPriority,Ff=n.unstable_IdlePriority,Fb=n.log,$b=n.unstable_setDisableYieldValue,Za=null,Mt=null;function Yn(e){if(typeof Fb=="function"&&$b(e),Mt&&typeof Mt.setStrictMode=="function")try{Mt.setStrictMode(Za,e)}catch{}}var kt=Math.clz32?Math.clz32:Qb,Kb=Math.log,Zb=Math.LN2;function Qb(e){return e>>>=0,e===0?32:31-(Kb(e)/Zb|0)|0}var hs=256,ms=262144,ps=4194304;function br(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function gs(e,t,r){var i=e.pendingLanes;if(i===0)return 0;var c=0,d=e.suspendedLanes,y=e.pingedLanes;e=e.warmLanes;var w=i&134217727;return w!==0?(i=w&~d,i!==0?c=br(i):(y&=w,y!==0?c=br(y):r||(r=w&~e,r!==0&&(c=br(r))))):(w=i&~d,w!==0?c=br(w):y!==0?c=br(y):r||(r=i&~e,r!==0&&(c=br(r)))),c===0?0:t!==0&&t!==c&&(t&d)===0&&(d=c&-c,r=t&-t,d>=r||d===32&&(r&4194048)!==0)?t:c}function Qa(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function Jb(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function $f(){var e=ps;return ps<<=1,(ps&62914560)===0&&(ps=4194304),e}function Eo(e){for(var t=[],r=0;31>r;r++)t.push(e);return t}function Ja(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Wb(e,t,r,i,c,d){var y=e.pendingLanes;e.pendingLanes=r,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=r,e.entangledLanes&=r,e.errorRecoveryDisabledLanes&=r,e.shellSuspendCounter=0;var w=e.entanglements,A=e.expirationTimes,Y=e.hiddenUpdates;for(r=y&~r;0<r;){var K=31-kt(r),J=1<<K;w[K]=0,A[K]=-1;var G=Y[K];if(G!==null)for(Y[K]=null,K=0;K<G.length;K++){var X=G[K];X!==null&&(X.lane&=-536870913)}r&=~J}i!==0&&Kf(e,i,0),d!==0&&c===0&&e.tag!==0&&(e.suspendedLanes|=d&~(y&~t))}function Kf(e,t,r){e.pendingLanes|=t,e.suspendedLanes&=~t;var i=31-kt(t);e.entangledLanes|=t,e.entanglements[i]=e.entanglements[i]|1073741824|r&261930}function Zf(e,t){var r=e.entangledLanes|=t;for(e=e.entanglements;r;){var i=31-kt(r),c=1<<i;c&t|e[i]&t&&(e[i]|=t),r&=~c}}function Qf(e,t){var r=t&-t;return r=(r&42)!==0?1:To(r),(r&(e.suspendedLanes|t))!==0?0:r}function To(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Co(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Jf(){var e=F.p;return e!==0?e:(e=window.event,e===void 0?32:Vg(e.type))}function Wf(e,t){var r=F.p;try{return F.p=e,t()}finally{F.p=r}}var Gn=Math.random().toString(36).slice(2),ct="__reactFiber$"+Gn,wt="__reactProps$"+Gn,Fr="__reactContainer$"+Gn,No="__reactEvents$"+Gn,Ib="__reactListeners$"+Gn,e1="__reactHandles$"+Gn,If="__reactResources$"+Gn,Wa="__reactMarker$"+Gn;function Ao(e){delete e[ct],delete e[wt],delete e[No],delete e[Ib],delete e[e1]}function $r(e){var t=e[ct];if(t)return t;for(var r=e.parentNode;r;){if(t=r[Fr]||r[ct]){if(r=t.alternate,t.child!==null||r!==null&&r.child!==null)for(e=bg(e);e!==null;){if(r=e[ct])return r;e=bg(e)}return t}e=r,r=e.parentNode}return null}function Kr(e){if(e=e[ct]||e[Fr]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Ia(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(l(33))}function Zr(e){var t=e[If];return t||(t=e[If]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function st(e){e[Wa]=!0}var eh=new Set,th={};function Sr(e,t){Qr(e,t),Qr(e+"Capture",t)}function Qr(e,t){for(th[e]=t,e=0;e<t.length;e++)eh.add(t[e])}var t1=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),nh={},rh={};function n1(e){return So.call(rh,e)?!0:So.call(nh,e)?!1:t1.test(e)?rh[e]=!0:(nh[e]=!0,!1)}function ys(e,t,r){if(n1(t))if(r===null)e.removeAttribute(t);else{switch(typeof r){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var i=t.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+r)}}function vs(e,t,r){if(r===null)e.removeAttribute(t);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+r)}}function bn(e,t,r,i){if(i===null)e.removeAttribute(r);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(r);return}e.setAttributeNS(t,r,""+i)}}function qt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function ah(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function r1(e,t,r){var i=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var c=i.get,d=i.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return c.call(this)},set:function(y){r=""+y,d.call(this,y)}}),Object.defineProperty(e,t,{enumerable:i.enumerable}),{getValue:function(){return r},setValue:function(y){r=""+y},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Do(e){if(!e._valueTracker){var t=ah(e)?"checked":"value";e._valueTracker=r1(e,t,""+e[t])}}function ih(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var r=t.getValue(),i="";return e&&(i=ah(e)?e.checked?"true":"false":e.value),e=i,e!==r?(t.setValue(e),!0):!1}function xs(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var a1=/[\n"\\]/g;function Yt(e){return e.replace(a1,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function Mo(e,t,r,i,c,d,y,w){e.name="",y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"?e.type=y:e.removeAttribute("type"),t!=null?y==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+qt(t)):e.value!==""+qt(t)&&(e.value=""+qt(t)):y!=="submit"&&y!=="reset"||e.removeAttribute("value"),t!=null?ko(e,y,qt(t)):r!=null?ko(e,y,qt(r)):i!=null&&e.removeAttribute("value"),c==null&&d!=null&&(e.defaultChecked=!!d),c!=null&&(e.checked=c&&typeof c!="function"&&typeof c!="symbol"),w!=null&&typeof w!="function"&&typeof w!="symbol"&&typeof w!="boolean"?e.name=""+qt(w):e.removeAttribute("name")}function sh(e,t,r,i,c,d,y,w){if(d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"&&(e.type=d),t!=null||r!=null){if(!(d!=="submit"&&d!=="reset"||t!=null)){Do(e);return}r=r!=null?""+qt(r):"",t=t!=null?""+qt(t):r,w||t===e.value||(e.value=t),e.defaultValue=t}i=i??c,i=typeof i!="function"&&typeof i!="symbol"&&!!i,e.checked=w?e.checked:!!i,e.defaultChecked=!!i,y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"&&(e.name=y),Do(e)}function ko(e,t,r){t==="number"&&xs(e.ownerDocument)===e||e.defaultValue===""+r||(e.defaultValue=""+r)}function Jr(e,t,r,i){if(e=e.options,t){t={};for(var c=0;c<r.length;c++)t["$"+r[c]]=!0;for(r=0;r<e.length;r++)c=t.hasOwnProperty("$"+e[r].value),e[r].selected!==c&&(e[r].selected=c),c&&i&&(e[r].defaultSelected=!0)}else{for(r=""+qt(r),t=null,c=0;c<e.length;c++){if(e[c].value===r){e[c].selected=!0,i&&(e[c].defaultSelected=!0);return}t!==null||e[c].disabled||(t=e[c])}t!==null&&(t.selected=!0)}}function lh(e,t,r){if(t!=null&&(t=""+qt(t),t!==e.value&&(e.value=t),r==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=r!=null?""+qt(r):""}function oh(e,t,r,i){if(t==null){if(i!=null){if(r!=null)throw Error(l(92));if(se(i)){if(1<i.length)throw Error(l(93));i=i[0]}r=i}r==null&&(r=""),t=r}r=qt(t),e.defaultValue=r,i=e.textContent,i===r&&i!==""&&i!==null&&(e.value=i),Do(e)}function Wr(e,t){if(t){var r=e.firstChild;if(r&&r===e.lastChild&&r.nodeType===3){r.nodeValue=t;return}}e.textContent=t}var i1=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function ch(e,t,r){var i=t.indexOf("--")===0;r==null||typeof r=="boolean"||r===""?i?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":i?e.setProperty(t,r):typeof r!="number"||r===0||i1.has(t)?t==="float"?e.cssFloat=r:e[t]=(""+r).trim():e[t]=r+"px"}function uh(e,t,r){if(t!=null&&typeof t!="object")throw Error(l(62));if(e=e.style,r!=null){for(var i in r)!r.hasOwnProperty(i)||t!=null&&t.hasOwnProperty(i)||(i.indexOf("--")===0?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="");for(var c in t)i=t[c],t.hasOwnProperty(c)&&r[c]!==i&&ch(e,c,i)}else for(var d in t)t.hasOwnProperty(d)&&ch(e,d,t[d])}function Ro(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var s1=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),l1=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function bs(e){return l1.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Sn(){}var Oo=null;function zo(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ir=null,ea=null;function dh(e){var t=Kr(e);if(t&&(e=t.stateNode)){var r=e[wt]||null;e:switch(e=t.stateNode,t.type){case"input":if(Mo(e,r.value,r.defaultValue,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name),t=r.name,r.type==="radio"&&t!=null){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll('input[name="'+Yt(""+t)+'"][type="radio"]'),t=0;t<r.length;t++){var i=r[t];if(i!==e&&i.form===e.form){var c=i[wt]||null;if(!c)throw Error(l(90));Mo(i,c.value,c.defaultValue,c.defaultValue,c.checked,c.defaultChecked,c.type,c.name)}}for(t=0;t<r.length;t++)i=r[t],i.form===e.form&&ih(i)}break e;case"textarea":lh(e,r.value,r.defaultValue);break e;case"select":t=r.value,t!=null&&Jr(e,!!r.multiple,t,!1)}}}var _o=!1;function fh(e,t,r){if(_o)return e(t,r);_o=!0;try{var i=e(t);return i}finally{if(_o=!1,(Ir!==null||ea!==null)&&(ll(),Ir&&(t=Ir,e=ea,ea=Ir=null,dh(t),e)))for(t=0;t<e.length;t++)dh(e[t])}}function ei(e,t){var r=e.stateNode;if(r===null)return null;var i=r[wt]||null;if(i===null)return null;r=i[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break e;default:e=!1}if(e)return null;if(r&&typeof r!="function")throw Error(l(231,t,typeof r));return r}var wn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Vo=!1;if(wn)try{var ti={};Object.defineProperty(ti,"passive",{get:function(){Vo=!0}}),window.addEventListener("test",ti,ti),window.removeEventListener("test",ti,ti)}catch{Vo=!1}var Xn=null,Bo=null,Ss=null;function hh(){if(Ss)return Ss;var e,t=Bo,r=t.length,i,c="value"in Xn?Xn.value:Xn.textContent,d=c.length;for(e=0;e<r&&t[e]===c[e];e++);var y=r-e;for(i=1;i<=y&&t[r-i]===c[d-i];i++);return Ss=c.slice(e,1<i?1-i:void 0)}function ws(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function js(){return!0}function mh(){return!1}function jt(e){function t(r,i,c,d,y){this._reactName=r,this._targetInst=c,this.type=i,this.nativeEvent=d,this.target=y,this.currentTarget=null;for(var w in e)e.hasOwnProperty(w)&&(r=e[w],this[w]=r?r(d):d[w]);return this.isDefaultPrevented=(d.defaultPrevented!=null?d.defaultPrevented:d.returnValue===!1)?js:mh,this.isPropagationStopped=mh,this}return x(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=js)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=js)},persist:function(){},isPersistent:js}),t}var wr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Es=jt(wr),ni=x({},wr,{view:0,detail:0}),o1=jt(ni),Lo,Uo,ri,Ts=x({},ni,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:qo,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==ri&&(ri&&e.type==="mousemove"?(Lo=e.screenX-ri.screenX,Uo=e.screenY-ri.screenY):Uo=Lo=0,ri=e),Lo)},movementY:function(e){return"movementY"in e?e.movementY:Uo}}),ph=jt(Ts),c1=x({},Ts,{dataTransfer:0}),u1=jt(c1),d1=x({},ni,{relatedTarget:0}),Ho=jt(d1),f1=x({},wr,{animationName:0,elapsedTime:0,pseudoElement:0}),h1=jt(f1),m1=x({},wr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),p1=jt(m1),g1=x({},wr,{data:0}),gh=jt(g1),y1={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},v1={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},x1={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function b1(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=x1[e])?!!t[e]:!1}function qo(){return b1}var S1=x({},ni,{key:function(e){if(e.key){var t=y1[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=ws(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?v1[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:qo,charCode:function(e){return e.type==="keypress"?ws(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ws(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),w1=jt(S1),j1=x({},Ts,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),yh=jt(j1),E1=x({},ni,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:qo}),T1=jt(E1),C1=x({},wr,{propertyName:0,elapsedTime:0,pseudoElement:0}),N1=jt(C1),A1=x({},Ts,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),D1=jt(A1),M1=x({},wr,{newState:0,oldState:0}),k1=jt(M1),R1=[9,13,27,32],Yo=wn&&"CompositionEvent"in window,ai=null;wn&&"documentMode"in document&&(ai=document.documentMode);var O1=wn&&"TextEvent"in window&&!ai,vh=wn&&(!Yo||ai&&8<ai&&11>=ai),xh=" ",bh=!1;function Sh(e,t){switch(e){case"keyup":return R1.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function wh(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var ta=!1;function z1(e,t){switch(e){case"compositionend":return wh(t);case"keypress":return t.which!==32?null:(bh=!0,xh);case"textInput":return e=t.data,e===xh&&bh?null:e;default:return null}}function _1(e,t){if(ta)return e==="compositionend"||!Yo&&Sh(e,t)?(e=hh(),Ss=Bo=Xn=null,ta=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return vh&&t.locale!=="ko"?null:t.data;default:return null}}var V1={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function jh(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!V1[e.type]:t==="textarea"}function Eh(e,t,r,i){Ir?ea?ea.push(i):ea=[i]:Ir=i,t=ml(t,"onChange"),0<t.length&&(r=new Es("onChange","change",null,r,i),e.push({event:r,listeners:t}))}var ii=null,si=null;function B1(e){sg(e,0)}function Cs(e){var t=Ia(e);if(ih(t))return e}function Th(e,t){if(e==="change")return t}var Ch=!1;if(wn){var Go;if(wn){var Xo="oninput"in document;if(!Xo){var Nh=document.createElement("div");Nh.setAttribute("oninput","return;"),Xo=typeof Nh.oninput=="function"}Go=Xo}else Go=!1;Ch=Go&&(!document.documentMode||9<document.documentMode)}function Ah(){ii&&(ii.detachEvent("onpropertychange",Dh),si=ii=null)}function Dh(e){if(e.propertyName==="value"&&Cs(si)){var t=[];Eh(t,si,e,zo(e)),fh(B1,t)}}function L1(e,t,r){e==="focusin"?(Ah(),ii=t,si=r,ii.attachEvent("onpropertychange",Dh)):e==="focusout"&&Ah()}function U1(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Cs(si)}function H1(e,t){if(e==="click")return Cs(t)}function q1(e,t){if(e==="input"||e==="change")return Cs(t)}function Y1(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Rt=typeof Object.is=="function"?Object.is:Y1;function li(e,t){if(Rt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var r=Object.keys(e),i=Object.keys(t);if(r.length!==i.length)return!1;for(i=0;i<r.length;i++){var c=r[i];if(!So.call(t,c)||!Rt(e[c],t[c]))return!1}return!0}function Mh(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function kh(e,t){var r=Mh(e);e=0;for(var i;r;){if(r.nodeType===3){if(i=e+r.textContent.length,e<=t&&i>=t)return{node:r,offset:t-e};e=i}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=Mh(r)}}function Rh(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Rh(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Oh(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=xs(e.document);t instanceof e.HTMLIFrameElement;){try{var r=typeof t.contentWindow.location.href=="string"}catch{r=!1}if(r)e=t.contentWindow;else break;t=xs(e.document)}return t}function Po(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var G1=wn&&"documentMode"in document&&11>=document.documentMode,na=null,Fo=null,oi=null,$o=!1;function zh(e,t,r){var i=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;$o||na==null||na!==xs(i)||(i=na,"selectionStart"in i&&Po(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),oi&&li(oi,i)||(oi=i,i=ml(Fo,"onSelect"),0<i.length&&(t=new Es("onSelect","select",null,t,r),e.push({event:t,listeners:i}),t.target=na)))}function jr(e,t){var r={};return r[e.toLowerCase()]=t.toLowerCase(),r["Webkit"+e]="webkit"+t,r["Moz"+e]="moz"+t,r}var ra={animationend:jr("Animation","AnimationEnd"),animationiteration:jr("Animation","AnimationIteration"),animationstart:jr("Animation","AnimationStart"),transitionrun:jr("Transition","TransitionRun"),transitionstart:jr("Transition","TransitionStart"),transitioncancel:jr("Transition","TransitionCancel"),transitionend:jr("Transition","TransitionEnd")},Ko={},_h={};wn&&(_h=document.createElement("div").style,"AnimationEvent"in window||(delete ra.animationend.animation,delete ra.animationiteration.animation,delete ra.animationstart.animation),"TransitionEvent"in window||delete ra.transitionend.transition);function Er(e){if(Ko[e])return Ko[e];if(!ra[e])return e;var t=ra[e],r;for(r in t)if(t.hasOwnProperty(r)&&r in _h)return Ko[e]=t[r];return e}var Vh=Er("animationend"),Bh=Er("animationiteration"),Lh=Er("animationstart"),X1=Er("transitionrun"),P1=Er("transitionstart"),F1=Er("transitioncancel"),Uh=Er("transitionend"),Hh=new Map,Zo="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Zo.push("scrollEnd");function en(e,t){Hh.set(e,t),Sr(t,[e])}var Ns=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Gt=[],aa=0,Qo=0;function As(){for(var e=aa,t=Qo=aa=0;t<e;){var r=Gt[t];Gt[t++]=null;var i=Gt[t];Gt[t++]=null;var c=Gt[t];Gt[t++]=null;var d=Gt[t];if(Gt[t++]=null,i!==null&&c!==null){var y=i.pending;y===null?c.next=c:(c.next=y.next,y.next=c),i.pending=c}d!==0&&qh(r,c,d)}}function Ds(e,t,r,i){Gt[aa++]=e,Gt[aa++]=t,Gt[aa++]=r,Gt[aa++]=i,Qo|=i,e.lanes|=i,e=e.alternate,e!==null&&(e.lanes|=i)}function Jo(e,t,r,i){return Ds(e,t,r,i),Ms(e)}function Tr(e,t){return Ds(e,null,null,t),Ms(e)}function qh(e,t,r){e.lanes|=r;var i=e.alternate;i!==null&&(i.lanes|=r);for(var c=!1,d=e.return;d!==null;)d.childLanes|=r,i=d.alternate,i!==null&&(i.childLanes|=r),d.tag===22&&(e=d.stateNode,e===null||e._visibility&1||(c=!0)),e=d,d=d.return;return e.tag===3?(d=e.stateNode,c&&t!==null&&(c=31-kt(r),e=d.hiddenUpdates,i=e[c],i===null?e[c]=[t]:i.push(t),t.lane=r|536870912),d):null}function Ms(e){if(50<Mi)throw Mi=0,su=null,Error(l(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var ia={};function $1(e,t,r,i){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ot(e,t,r,i){return new $1(e,t,r,i)}function Wo(e){return e=e.prototype,!(!e||!e.isReactComponent)}function jn(e,t){var r=e.alternate;return r===null?(r=Ot(e.tag,t,e.key,e.mode),r.elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=e.flags&65011712,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,t=e.dependencies,r.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r.refCleanup=e.refCleanup,r}function Yh(e,t){e.flags&=65011714;var r=e.alternate;return r===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=r.childLanes,e.lanes=r.lanes,e.child=r.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=r.memoizedProps,e.memoizedState=r.memoizedState,e.updateQueue=r.updateQueue,e.type=r.type,t=r.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function ks(e,t,r,i,c,d){var y=0;if(i=e,typeof e=="function")Wo(e)&&(y=1);else if(typeof e=="string")y=WS(e,r,re.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case q:return e=Ot(31,r,t,c),e.elementType=q,e.lanes=d,e;case T:return Cr(r.children,c,d,t);case C:y=8,c|=24;break;case R:return e=Ot(12,r,t,c|2),e.elementType=R,e.lanes=d,e;case U:return e=Ot(13,r,t,c),e.elementType=U,e.lanes=d,e;case P:return e=Ot(19,r,t,c),e.elementType=P,e.lanes=d,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case _:y=10;break e;case k:y=9;break e;case O:y=11;break e;case M:y=14;break e;case D:y=16,i=null;break e}y=29,r=Error(l(130,e===null?"null":typeof e,"")),i=null}return t=Ot(y,r,t,c),t.elementType=e,t.type=i,t.lanes=d,t}function Cr(e,t,r,i){return e=Ot(7,e,i,t),e.lanes=r,e}function Io(e,t,r){return e=Ot(6,e,null,t),e.lanes=r,e}function Gh(e){var t=Ot(18,null,null,0);return t.stateNode=e,t}function ec(e,t,r){return t=Ot(4,e.children!==null?e.children:[],e.key,t),t.lanes=r,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Xh=new WeakMap;function Xt(e,t){if(typeof e=="object"&&e!==null){var r=Xh.get(e);return r!==void 0?r:(t={value:e,source:t,stack:Gf(t)},Xh.set(e,t),t)}return{value:e,source:t,stack:Gf(t)}}var sa=[],la=0,Rs=null,ci=0,Pt=[],Ft=0,Pn=null,un=1,dn="";function En(e,t){sa[la++]=ci,sa[la++]=Rs,Rs=e,ci=t}function Ph(e,t,r){Pt[Ft++]=un,Pt[Ft++]=dn,Pt[Ft++]=Pn,Pn=e;var i=un;e=dn;var c=32-kt(i)-1;i&=~(1<<c),r+=1;var d=32-kt(t)+c;if(30<d){var y=c-c%5;d=(i&(1<<y)-1).toString(32),i>>=y,c-=y,un=1<<32-kt(t)+c|r<<c|i,dn=d+e}else un=1<<d|r<<c|i,dn=e}function tc(e){e.return!==null&&(En(e,1),Ph(e,1,0))}function nc(e){for(;e===Rs;)Rs=sa[--la],sa[la]=null,ci=sa[--la],sa[la]=null;for(;e===Pn;)Pn=Pt[--Ft],Pt[Ft]=null,dn=Pt[--Ft],Pt[Ft]=null,un=Pt[--Ft],Pt[Ft]=null}function Fh(e,t){Pt[Ft++]=un,Pt[Ft++]=dn,Pt[Ft++]=Pn,un=t.id,dn=t.overflow,Pn=e}var ut=null,Ge=null,De=!1,Fn=null,$t=!1,rc=Error(l(519));function $n(e){var t=Error(l(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw ui(Xt(t,e)),rc}function $h(e){var t=e.stateNode,r=e.type,i=e.memoizedProps;switch(t[ct]=e,t[wt]=i,r){case"dialog":Te("cancel",t),Te("close",t);break;case"iframe":case"object":case"embed":Te("load",t);break;case"video":case"audio":for(r=0;r<Ri.length;r++)Te(Ri[r],t);break;case"source":Te("error",t);break;case"img":case"image":case"link":Te("error",t),Te("load",t);break;case"details":Te("toggle",t);break;case"input":Te("invalid",t),sh(t,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":Te("invalid",t);break;case"textarea":Te("invalid",t),oh(t,i.value,i.defaultValue,i.children)}r=i.children,typeof r!="string"&&typeof r!="number"&&typeof r!="bigint"||t.textContent===""+r||i.suppressHydrationWarning===!0||ug(t.textContent,r)?(i.popover!=null&&(Te("beforetoggle",t),Te("toggle",t)),i.onScroll!=null&&Te("scroll",t),i.onScrollEnd!=null&&Te("scrollend",t),i.onClick!=null&&(t.onclick=Sn),t=!0):t=!1,t||$n(e,!0)}function Kh(e){for(ut=e.return;ut;)switch(ut.tag){case 5:case 31:case 13:$t=!1;return;case 27:case 3:$t=!0;return;default:ut=ut.return}}function oa(e){if(e!==ut)return!1;if(!De)return Kh(e),De=!0,!1;var t=e.tag,r;if((r=t!==3&&t!==27)&&((r=t===5)&&(r=e.type,r=!(r!=="form"&&r!=="button")||Su(e.type,e.memoizedProps)),r=!r),r&&Ge&&$n(e),Kh(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(l(317));Ge=xg(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(l(317));Ge=xg(e)}else t===27?(t=Ge,lr(e.type)?(e=Cu,Cu=null,Ge=e):Ge=t):Ge=ut?Zt(e.stateNode.nextSibling):null;return!0}function Nr(){Ge=ut=null,De=!1}function ac(){var e=Fn;return e!==null&&(Nt===null?Nt=e:Nt.push.apply(Nt,e),Fn=null),e}function ui(e){Fn===null?Fn=[e]:Fn.push(e)}var ic=N(null),Ar=null,Tn=null;function Kn(e,t,r){I(ic,t._currentValue),t._currentValue=r}function Cn(e){e._currentValue=ic.current,V(ic)}function sc(e,t,r){for(;e!==null;){var i=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,i!==null&&(i.childLanes|=t)):i!==null&&(i.childLanes&t)!==t&&(i.childLanes|=t),e===r)break;e=e.return}}function lc(e,t,r,i){var c=e.child;for(c!==null&&(c.return=e);c!==null;){var d=c.dependencies;if(d!==null){var y=c.child;d=d.firstContext;e:for(;d!==null;){var w=d;d=c;for(var A=0;A<t.length;A++)if(w.context===t[A]){d.lanes|=r,w=d.alternate,w!==null&&(w.lanes|=r),sc(d.return,r,e),i||(y=null);break e}d=w.next}}else if(c.tag===18){if(y=c.return,y===null)throw Error(l(341));y.lanes|=r,d=y.alternate,d!==null&&(d.lanes|=r),sc(y,r,e),y=null}else y=c.child;if(y!==null)y.return=c;else for(y=c;y!==null;){if(y===e){y=null;break}if(c=y.sibling,c!==null){c.return=y.return,y=c;break}y=y.return}c=y}}function ca(e,t,r,i){e=null;for(var c=t,d=!1;c!==null;){if(!d){if((c.flags&524288)!==0)d=!0;else if((c.flags&262144)!==0)break}if(c.tag===10){var y=c.alternate;if(y===null)throw Error(l(387));if(y=y.memoizedProps,y!==null){var w=c.type;Rt(c.pendingProps.value,y.value)||(e!==null?e.push(w):e=[w])}}else if(c===xe.current){if(y=c.alternate,y===null)throw Error(l(387));y.memoizedState.memoizedState!==c.memoizedState.memoizedState&&(e!==null?e.push(Bi):e=[Bi])}c=c.return}e!==null&&lc(t,e,r,i),t.flags|=262144}function Os(e){for(e=e.firstContext;e!==null;){if(!Rt(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Dr(e){Ar=e,Tn=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function dt(e){return Zh(Ar,e)}function zs(e,t){return Ar===null&&Dr(e),Zh(e,t)}function Zh(e,t){var r=t._currentValue;if(t={context:t,memoizedValue:r,next:null},Tn===null){if(e===null)throw Error(l(308));Tn=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Tn=Tn.next=t;return r}var K1=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(r,i){e.push(i)}};this.abort=function(){t.aborted=!0,e.forEach(function(r){return r()})}},Z1=n.unstable_scheduleCallback,Q1=n.unstable_NormalPriority,Ie={$$typeof:_,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function oc(){return{controller:new K1,data:new Map,refCount:0}}function di(e){e.refCount--,e.refCount===0&&Z1(Q1,function(){e.controller.abort()})}var fi=null,cc=0,ua=0,da=null;function J1(e,t){if(fi===null){var r=fi=[];cc=0,ua=fu(),da={status:"pending",value:void 0,then:function(i){r.push(i)}}}return cc++,t.then(Qh,Qh),t}function Qh(){if(--cc===0&&fi!==null){da!==null&&(da.status="fulfilled");var e=fi;fi=null,ua=0,da=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function W1(e,t){var r=[],i={status:"pending",value:null,reason:null,then:function(c){r.push(c)}};return e.then(function(){i.status="fulfilled",i.value=t;for(var c=0;c<r.length;c++)(0,r[c])(t)},function(c){for(i.status="rejected",i.reason=c,c=0;c<r.length;c++)(0,r[c])(void 0)}),i}var Jh=L.S;L.S=function(e,t){zp=Dt(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&J1(e,t),Jh!==null&&Jh(e,t)};var Mr=N(null);function uc(){var e=Mr.current;return e!==null?e:He.pooledCache}function _s(e,t){t===null?I(Mr,Mr.current):I(Mr,t.pool)}function Wh(){var e=uc();return e===null?null:{parent:Ie._currentValue,pool:e}}var fa=Error(l(460)),dc=Error(l(474)),Vs=Error(l(542)),Bs={then:function(){}};function Ih(e){return e=e.status,e==="fulfilled"||e==="rejected"}function em(e,t,r){switch(r=e[r],r===void 0?e.push(t):r!==t&&(t.then(Sn,Sn),t=r),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,nm(e),e;default:if(typeof t.status=="string")t.then(Sn,Sn);else{if(e=He,e!==null&&100<e.shellSuspendCounter)throw Error(l(482));e=t,e.status="pending",e.then(function(i){if(t.status==="pending"){var c=t;c.status="fulfilled",c.value=i}},function(i){if(t.status==="pending"){var c=t;c.status="rejected",c.reason=i}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,nm(e),e}throw Rr=t,fa}}function kr(e){try{var t=e._init;return t(e._payload)}catch(r){throw r!==null&&typeof r=="object"&&typeof r.then=="function"?(Rr=r,fa):r}}var Rr=null;function tm(){if(Rr===null)throw Error(l(459));var e=Rr;return Rr=null,e}function nm(e){if(e===fa||e===Vs)throw Error(l(483))}var ha=null,hi=0;function Ls(e){var t=hi;return hi+=1,ha===null&&(ha=[]),em(ha,e,t)}function mi(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function Us(e,t){throw t.$$typeof===b?Error(l(525)):(e=Object.prototype.toString.call(t),Error(l(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function rm(e){function t(B,z){if(e){var H=B.deletions;H===null?(B.deletions=[z],B.flags|=16):H.push(z)}}function r(B,z){if(!e)return null;for(;z!==null;)t(B,z),z=z.sibling;return null}function i(B){for(var z=new Map;B!==null;)B.key!==null?z.set(B.key,B):z.set(B.index,B),B=B.sibling;return z}function c(B,z){return B=jn(B,z),B.index=0,B.sibling=null,B}function d(B,z,H){return B.index=H,e?(H=B.alternate,H!==null?(H=H.index,H<z?(B.flags|=67108866,z):H):(B.flags|=67108866,z)):(B.flags|=1048576,z)}function y(B){return e&&B.alternate===null&&(B.flags|=67108866),B}function w(B,z,H,Z){return z===null||z.tag!==6?(z=Io(H,B.mode,Z),z.return=B,z):(z=c(z,H),z.return=B,z)}function A(B,z,H,Z){var ge=H.type;return ge===T?K(B,z,H.props.children,Z,H.key):z!==null&&(z.elementType===ge||typeof ge=="object"&&ge!==null&&ge.$$typeof===D&&kr(ge)===z.type)?(z=c(z,H.props),mi(z,H),z.return=B,z):(z=ks(H.type,H.key,H.props,null,B.mode,Z),mi(z,H),z.return=B,z)}function Y(B,z,H,Z){return z===null||z.tag!==4||z.stateNode.containerInfo!==H.containerInfo||z.stateNode.implementation!==H.implementation?(z=ec(H,B.mode,Z),z.return=B,z):(z=c(z,H.children||[]),z.return=B,z)}function K(B,z,H,Z,ge){return z===null||z.tag!==7?(z=Cr(H,B.mode,Z,ge),z.return=B,z):(z=c(z,H),z.return=B,z)}function J(B,z,H){if(typeof z=="string"&&z!==""||typeof z=="number"||typeof z=="bigint")return z=Io(""+z,B.mode,H),z.return=B,z;if(typeof z=="object"&&z!==null){switch(z.$$typeof){case j:return H=ks(z.type,z.key,z.props,null,B.mode,H),mi(H,z),H.return=B,H;case E:return z=ec(z,B.mode,H),z.return=B,z;case D:return z=kr(z),J(B,z,H)}if(se(z)||ne(z))return z=Cr(z,B.mode,H,null),z.return=B,z;if(typeof z.then=="function")return J(B,Ls(z),H);if(z.$$typeof===_)return J(B,zs(B,z),H);Us(B,z)}return null}function G(B,z,H,Z){var ge=z!==null?z.key:null;if(typeof H=="string"&&H!==""||typeof H=="number"||typeof H=="bigint")return ge!==null?null:w(B,z,""+H,Z);if(typeof H=="object"&&H!==null){switch(H.$$typeof){case j:return H.key===ge?A(B,z,H,Z):null;case E:return H.key===ge?Y(B,z,H,Z):null;case D:return H=kr(H),G(B,z,H,Z)}if(se(H)||ne(H))return ge!==null?null:K(B,z,H,Z,null);if(typeof H.then=="function")return G(B,z,Ls(H),Z);if(H.$$typeof===_)return G(B,z,zs(B,H),Z);Us(B,H)}return null}function X(B,z,H,Z,ge){if(typeof Z=="string"&&Z!==""||typeof Z=="number"||typeof Z=="bigint")return B=B.get(H)||null,w(z,B,""+Z,ge);if(typeof Z=="object"&&Z!==null){switch(Z.$$typeof){case j:return B=B.get(Z.key===null?H:Z.key)||null,A(z,B,Z,ge);case E:return B=B.get(Z.key===null?H:Z.key)||null,Y(z,B,Z,ge);case D:return Z=kr(Z),X(B,z,H,Z,ge)}if(se(Z)||ne(Z))return B=B.get(H)||null,K(z,B,Z,ge,null);if(typeof Z.then=="function")return X(B,z,H,Ls(Z),ge);if(Z.$$typeof===_)return X(B,z,H,zs(z,Z),ge);Us(z,Z)}return null}function ue(B,z,H,Z){for(var ge=null,ke=null,me=z,je=z=0,Ae=null;me!==null&&je<H.length;je++){me.index>je?(Ae=me,me=null):Ae=me.sibling;var Re=G(B,me,H[je],Z);if(Re===null){me===null&&(me=Ae);break}e&&me&&Re.alternate===null&&t(B,me),z=d(Re,z,je),ke===null?ge=Re:ke.sibling=Re,ke=Re,me=Ae}if(je===H.length)return r(B,me),De&&En(B,je),ge;if(me===null){for(;je<H.length;je++)me=J(B,H[je],Z),me!==null&&(z=d(me,z,je),ke===null?ge=me:ke.sibling=me,ke=me);return De&&En(B,je),ge}for(me=i(me);je<H.length;je++)Ae=X(me,B,je,H[je],Z),Ae!==null&&(e&&Ae.alternate!==null&&me.delete(Ae.key===null?je:Ae.key),z=d(Ae,z,je),ke===null?ge=Ae:ke.sibling=Ae,ke=Ae);return e&&me.forEach(function(fr){return t(B,fr)}),De&&En(B,je),ge}function ve(B,z,H,Z){if(H==null)throw Error(l(151));for(var ge=null,ke=null,me=z,je=z=0,Ae=null,Re=H.next();me!==null&&!Re.done;je++,Re=H.next()){me.index>je?(Ae=me,me=null):Ae=me.sibling;var fr=G(B,me,Re.value,Z);if(fr===null){me===null&&(me=Ae);break}e&&me&&fr.alternate===null&&t(B,me),z=d(fr,z,je),ke===null?ge=fr:ke.sibling=fr,ke=fr,me=Ae}if(Re.done)return r(B,me),De&&En(B,je),ge;if(me===null){for(;!Re.done;je++,Re=H.next())Re=J(B,Re.value,Z),Re!==null&&(z=d(Re,z,je),ke===null?ge=Re:ke.sibling=Re,ke=Re);return De&&En(B,je),ge}for(me=i(me);!Re.done;je++,Re=H.next())Re=X(me,B,je,Re.value,Z),Re!==null&&(e&&Re.alternate!==null&&me.delete(Re.key===null?je:Re.key),z=d(Re,z,je),ke===null?ge=Re:ke.sibling=Re,ke=Re);return e&&me.forEach(function(c2){return t(B,c2)}),De&&En(B,je),ge}function Ue(B,z,H,Z){if(typeof H=="object"&&H!==null&&H.type===T&&H.key===null&&(H=H.props.children),typeof H=="object"&&H!==null){switch(H.$$typeof){case j:e:{for(var ge=H.key;z!==null;){if(z.key===ge){if(ge=H.type,ge===T){if(z.tag===7){r(B,z.sibling),Z=c(z,H.props.children),Z.return=B,B=Z;break e}}else if(z.elementType===ge||typeof ge=="object"&&ge!==null&&ge.$$typeof===D&&kr(ge)===z.type){r(B,z.sibling),Z=c(z,H.props),mi(Z,H),Z.return=B,B=Z;break e}r(B,z);break}else t(B,z);z=z.sibling}H.type===T?(Z=Cr(H.props.children,B.mode,Z,H.key),Z.return=B,B=Z):(Z=ks(H.type,H.key,H.props,null,B.mode,Z),mi(Z,H),Z.return=B,B=Z)}return y(B);case E:e:{for(ge=H.key;z!==null;){if(z.key===ge)if(z.tag===4&&z.stateNode.containerInfo===H.containerInfo&&z.stateNode.implementation===H.implementation){r(B,z.sibling),Z=c(z,H.children||[]),Z.return=B,B=Z;break e}else{r(B,z);break}else t(B,z);z=z.sibling}Z=ec(H,B.mode,Z),Z.return=B,B=Z}return y(B);case D:return H=kr(H),Ue(B,z,H,Z)}if(se(H))return ue(B,z,H,Z);if(ne(H)){if(ge=ne(H),typeof ge!="function")throw Error(l(150));return H=ge.call(H),ve(B,z,H,Z)}if(typeof H.then=="function")return Ue(B,z,Ls(H),Z);if(H.$$typeof===_)return Ue(B,z,zs(B,H),Z);Us(B,H)}return typeof H=="string"&&H!==""||typeof H=="number"||typeof H=="bigint"?(H=""+H,z!==null&&z.tag===6?(r(B,z.sibling),Z=c(z,H),Z.return=B,B=Z):(r(B,z),Z=Io(H,B.mode,Z),Z.return=B,B=Z),y(B)):r(B,z)}return function(B,z,H,Z){try{hi=0;var ge=Ue(B,z,H,Z);return ha=null,ge}catch(me){if(me===fa||me===Vs)throw me;var ke=Ot(29,me,null,B.mode);return ke.lanes=Z,ke.return=B,ke}finally{}}}var Or=rm(!0),am=rm(!1),Zn=!1;function fc(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function hc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Qn(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Jn(e,t,r){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,(Oe&2)!==0){var c=i.pending;return c===null?t.next=t:(t.next=c.next,c.next=t),i.pending=t,t=Ms(e),qh(e,null,r),t}return Ds(e,i,t,r),Ms(e)}function pi(e,t,r){if(t=t.updateQueue,t!==null&&(t=t.shared,(r&4194048)!==0)){var i=t.lanes;i&=e.pendingLanes,r|=i,t.lanes=r,Zf(e,r)}}function mc(e,t){var r=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,r===i)){var c=null,d=null;if(r=r.firstBaseUpdate,r!==null){do{var y={lane:r.lane,tag:r.tag,payload:r.payload,callback:null,next:null};d===null?c=d=y:d=d.next=y,r=r.next}while(r!==null);d===null?c=d=t:d=d.next=t}else c=d=t;r={baseState:i.baseState,firstBaseUpdate:c,lastBaseUpdate:d,shared:i.shared,callbacks:i.callbacks},e.updateQueue=r;return}e=r.lastBaseUpdate,e===null?r.firstBaseUpdate=t:e.next=t,r.lastBaseUpdate=t}var pc=!1;function gi(){if(pc){var e=da;if(e!==null)throw e}}function yi(e,t,r,i){pc=!1;var c=e.updateQueue;Zn=!1;var d=c.firstBaseUpdate,y=c.lastBaseUpdate,w=c.shared.pending;if(w!==null){c.shared.pending=null;var A=w,Y=A.next;A.next=null,y===null?d=Y:y.next=Y,y=A;var K=e.alternate;K!==null&&(K=K.updateQueue,w=K.lastBaseUpdate,w!==y&&(w===null?K.firstBaseUpdate=Y:w.next=Y,K.lastBaseUpdate=A))}if(d!==null){var J=c.baseState;y=0,K=Y=A=null,w=d;do{var G=w.lane&-536870913,X=G!==w.lane;if(X?(Ne&G)===G:(i&G)===G){G!==0&&G===ua&&(pc=!0),K!==null&&(K=K.next={lane:0,tag:w.tag,payload:w.payload,callback:null,next:null});e:{var ue=e,ve=w;G=t;var Ue=r;switch(ve.tag){case 1:if(ue=ve.payload,typeof ue=="function"){J=ue.call(Ue,J,G);break e}J=ue;break e;case 3:ue.flags=ue.flags&-65537|128;case 0:if(ue=ve.payload,G=typeof ue=="function"?ue.call(Ue,J,G):ue,G==null)break e;J=x({},J,G);break e;case 2:Zn=!0}}G=w.callback,G!==null&&(e.flags|=64,X&&(e.flags|=8192),X=c.callbacks,X===null?c.callbacks=[G]:X.push(G))}else X={lane:G,tag:w.tag,payload:w.payload,callback:w.callback,next:null},K===null?(Y=K=X,A=J):K=K.next=X,y|=G;if(w=w.next,w===null){if(w=c.shared.pending,w===null)break;X=w,w=X.next,X.next=null,c.lastBaseUpdate=X,c.shared.pending=null}}while(!0);K===null&&(A=J),c.baseState=A,c.firstBaseUpdate=Y,c.lastBaseUpdate=K,d===null&&(c.shared.lanes=0),nr|=y,e.lanes=y,e.memoizedState=J}}function im(e,t){if(typeof e!="function")throw Error(l(191,e));e.call(t)}function sm(e,t){var r=e.callbacks;if(r!==null)for(e.callbacks=null,e=0;e<r.length;e++)im(r[e],t)}var ma=N(null),Hs=N(0);function lm(e,t){e=_n,I(Hs,e),I(ma,t),_n=e|t.baseLanes}function gc(){I(Hs,_n),I(ma,ma.current)}function yc(){_n=Hs.current,V(ma),V(Hs)}var zt=N(null),Kt=null;function Wn(e){var t=e.alternate;I(Je,Je.current&1),I(zt,e),Kt===null&&(t===null||ma.current!==null||t.memoizedState!==null)&&(Kt=e)}function vc(e){I(Je,Je.current),I(zt,e),Kt===null&&(Kt=e)}function om(e){e.tag===22?(I(Je,Je.current),I(zt,e),Kt===null&&(Kt=e)):In()}function In(){I(Je,Je.current),I(zt,zt.current)}function _t(e){V(zt),Kt===e&&(Kt=null),V(Je)}var Je=N(0);function qs(e){for(var t=e;t!==null;){if(t.tag===13){var r=t.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||Eu(r)||Tu(r)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Nn=0,we=null,Be=null,et=null,Ys=!1,pa=!1,zr=!1,Gs=0,vi=0,ga=null,I1=0;function $e(){throw Error(l(321))}function xc(e,t){if(t===null)return!1;for(var r=0;r<t.length&&r<e.length;r++)if(!Rt(e[r],t[r]))return!1;return!0}function bc(e,t,r,i,c,d){return Nn=d,we=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,L.H=e===null||e.memoizedState===null?Pm:_c,zr=!1,d=r(i,c),zr=!1,pa&&(d=um(t,r,i,c)),cm(e),d}function cm(e){L.H=Si;var t=Be!==null&&Be.next!==null;if(Nn=0,et=Be=we=null,Ys=!1,vi=0,ga=null,t)throw Error(l(300));e===null||tt||(e=e.dependencies,e!==null&&Os(e)&&(tt=!0))}function um(e,t,r,i){we=e;var c=0;do{if(pa&&(ga=null),vi=0,pa=!1,25<=c)throw Error(l(301));if(c+=1,et=Be=null,e.updateQueue!=null){var d=e.updateQueue;d.lastEffect=null,d.events=null,d.stores=null,d.memoCache!=null&&(d.memoCache.index=0)}L.H=Fm,d=t(r,i)}while(pa);return d}function eS(){var e=L.H,t=e.useState()[0];return t=typeof t.then=="function"?xi(t):t,e=e.useState()[0],(Be!==null?Be.memoizedState:null)!==e&&(we.flags|=1024),t}function Sc(){var e=Gs!==0;return Gs=0,e}function wc(e,t,r){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~r}function jc(e){if(Ys){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Ys=!1}Nn=0,et=Be=we=null,pa=!1,vi=Gs=0,ga=null}function vt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return et===null?we.memoizedState=et=e:et=et.next=e,et}function We(){if(Be===null){var e=we.alternate;e=e!==null?e.memoizedState:null}else e=Be.next;var t=et===null?we.memoizedState:et.next;if(t!==null)et=t,Be=e;else{if(e===null)throw we.alternate===null?Error(l(467)):Error(l(310));Be=e,e={memoizedState:Be.memoizedState,baseState:Be.baseState,baseQueue:Be.baseQueue,queue:Be.queue,next:null},et===null?we.memoizedState=et=e:et=et.next=e}return et}function Xs(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function xi(e){var t=vi;return vi+=1,ga===null&&(ga=[]),e=em(ga,e,t),t=we,(et===null?t.memoizedState:et.next)===null&&(t=t.alternate,L.H=t===null||t.memoizedState===null?Pm:_c),e}function Ps(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return xi(e);if(e.$$typeof===_)return dt(e)}throw Error(l(438,String(e)))}function Ec(e){var t=null,r=we.updateQueue;if(r!==null&&(t=r.memoCache),t==null){var i=we.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(t={data:i.data.map(function(c){return c.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),r===null&&(r=Xs(),we.updateQueue=r),r.memoCache=t,r=t.data[t.index],r===void 0)for(r=t.data[t.index]=Array(e),i=0;i<e;i++)r[i]=$;return t.index++,r}function An(e,t){return typeof t=="function"?t(e):t}function Fs(e){var t=We();return Tc(t,Be,e)}function Tc(e,t,r){var i=e.queue;if(i===null)throw Error(l(311));i.lastRenderedReducer=r;var c=e.baseQueue,d=i.pending;if(d!==null){if(c!==null){var y=c.next;c.next=d.next,d.next=y}t.baseQueue=c=d,i.pending=null}if(d=e.baseState,c===null)e.memoizedState=d;else{t=c.next;var w=y=null,A=null,Y=t,K=!1;do{var J=Y.lane&-536870913;if(J!==Y.lane?(Ne&J)===J:(Nn&J)===J){var G=Y.revertLane;if(G===0)A!==null&&(A=A.next={lane:0,revertLane:0,gesture:null,action:Y.action,hasEagerState:Y.hasEagerState,eagerState:Y.eagerState,next:null}),J===ua&&(K=!0);else if((Nn&G)===G){Y=Y.next,G===ua&&(K=!0);continue}else J={lane:0,revertLane:Y.revertLane,gesture:null,action:Y.action,hasEagerState:Y.hasEagerState,eagerState:Y.eagerState,next:null},A===null?(w=A=J,y=d):A=A.next=J,we.lanes|=G,nr|=G;J=Y.action,zr&&r(d,J),d=Y.hasEagerState?Y.eagerState:r(d,J)}else G={lane:J,revertLane:Y.revertLane,gesture:Y.gesture,action:Y.action,hasEagerState:Y.hasEagerState,eagerState:Y.eagerState,next:null},A===null?(w=A=G,y=d):A=A.next=G,we.lanes|=J,nr|=J;Y=Y.next}while(Y!==null&&Y!==t);if(A===null?y=d:A.next=w,!Rt(d,e.memoizedState)&&(tt=!0,K&&(r=da,r!==null)))throw r;e.memoizedState=d,e.baseState=y,e.baseQueue=A,i.lastRenderedState=d}return c===null&&(i.lanes=0),[e.memoizedState,i.dispatch]}function Cc(e){var t=We(),r=t.queue;if(r===null)throw Error(l(311));r.lastRenderedReducer=e;var i=r.dispatch,c=r.pending,d=t.memoizedState;if(c!==null){r.pending=null;var y=c=c.next;do d=e(d,y.action),y=y.next;while(y!==c);Rt(d,t.memoizedState)||(tt=!0),t.memoizedState=d,t.baseQueue===null&&(t.baseState=d),r.lastRenderedState=d}return[d,i]}function dm(e,t,r){var i=we,c=We(),d=De;if(d){if(r===void 0)throw Error(l(407));r=r()}else r=t();var y=!Rt((Be||c).memoizedState,r);if(y&&(c.memoizedState=r,tt=!0),c=c.queue,Dc(mm.bind(null,i,c,e),[e]),c.getSnapshot!==t||y||et!==null&&et.memoizedState.tag&1){if(i.flags|=2048,ya(9,{destroy:void 0},hm.bind(null,i,c,r,t),null),He===null)throw Error(l(349));d||(Nn&127)!==0||fm(i,t,r)}return r}function fm(e,t,r){e.flags|=16384,e={getSnapshot:t,value:r},t=we.updateQueue,t===null?(t=Xs(),we.updateQueue=t,t.stores=[e]):(r=t.stores,r===null?t.stores=[e]:r.push(e))}function hm(e,t,r,i){t.value=r,t.getSnapshot=i,pm(t)&&gm(e)}function mm(e,t,r){return r(function(){pm(t)&&gm(e)})}function pm(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!Rt(e,r)}catch{return!0}}function gm(e){var t=Tr(e,2);t!==null&&At(t,e,2)}function Nc(e){var t=vt();if(typeof e=="function"){var r=e;if(e=r(),zr){Yn(!0);try{r()}finally{Yn(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:An,lastRenderedState:e},t}function ym(e,t,r,i){return e.baseState=r,Tc(e,Be,typeof i=="function"?i:An)}function tS(e,t,r,i,c){if(Zs(e))throw Error(l(485));if(e=t.action,e!==null){var d={payload:c,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(y){d.listeners.push(y)}};L.T!==null?r(!0):d.isTransition=!1,i(d),r=t.pending,r===null?(d.next=t.pending=d,vm(t,d)):(d.next=r.next,t.pending=r.next=d)}}function vm(e,t){var r=t.action,i=t.payload,c=e.state;if(t.isTransition){var d=L.T,y={};L.T=y;try{var w=r(c,i),A=L.S;A!==null&&A(y,w),xm(e,t,w)}catch(Y){Ac(e,t,Y)}finally{d!==null&&y.types!==null&&(d.types=y.types),L.T=d}}else try{d=r(c,i),xm(e,t,d)}catch(Y){Ac(e,t,Y)}}function xm(e,t,r){r!==null&&typeof r=="object"&&typeof r.then=="function"?r.then(function(i){bm(e,t,i)},function(i){return Ac(e,t,i)}):bm(e,t,r)}function bm(e,t,r){t.status="fulfilled",t.value=r,Sm(t),e.state=r,t=e.pending,t!==null&&(r=t.next,r===t?e.pending=null:(r=r.next,t.next=r,vm(e,r)))}function Ac(e,t,r){var i=e.pending;if(e.pending=null,i!==null){i=i.next;do t.status="rejected",t.reason=r,Sm(t),t=t.next;while(t!==i)}e.action=null}function Sm(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function wm(e,t){return t}function jm(e,t){if(De){var r=He.formState;if(r!==null){e:{var i=we;if(De){if(Ge){t:{for(var c=Ge,d=$t;c.nodeType!==8;){if(!d){c=null;break t}if(c=Zt(c.nextSibling),c===null){c=null;break t}}d=c.data,c=d==="F!"||d==="F"?c:null}if(c){Ge=Zt(c.nextSibling),i=c.data==="F!";break e}}$n(i)}i=!1}i&&(t=r[0])}}return r=vt(),r.memoizedState=r.baseState=t,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:wm,lastRenderedState:t},r.queue=i,r=Ym.bind(null,we,i),i.dispatch=r,i=Nc(!1),d=zc.bind(null,we,!1,i.queue),i=vt(),c={state:t,dispatch:null,action:e,pending:null},i.queue=c,r=tS.bind(null,we,c,d,r),c.dispatch=r,i.memoizedState=e,[t,r,!1]}function Em(e){var t=We();return Tm(t,Be,e)}function Tm(e,t,r){if(t=Tc(e,t,wm)[0],e=Fs(An)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var i=xi(t)}catch(y){throw y===fa?Vs:y}else i=t;t=We();var c=t.queue,d=c.dispatch;return r!==t.memoizedState&&(we.flags|=2048,ya(9,{destroy:void 0},nS.bind(null,c,r),null)),[i,d,e]}function nS(e,t){e.action=t}function Cm(e){var t=We(),r=Be;if(r!==null)return Tm(t,r,e);We(),t=t.memoizedState,r=We();var i=r.queue.dispatch;return r.memoizedState=e,[t,i,!1]}function ya(e,t,r,i){return e={tag:e,create:r,deps:i,inst:t,next:null},t=we.updateQueue,t===null&&(t=Xs(),we.updateQueue=t),r=t.lastEffect,r===null?t.lastEffect=e.next=e:(i=r.next,r.next=e,e.next=i,t.lastEffect=e),e}function Nm(){return We().memoizedState}function $s(e,t,r,i){var c=vt();we.flags|=e,c.memoizedState=ya(1|t,{destroy:void 0},r,i===void 0?null:i)}function Ks(e,t,r,i){var c=We();i=i===void 0?null:i;var d=c.memoizedState.inst;Be!==null&&i!==null&&xc(i,Be.memoizedState.deps)?c.memoizedState=ya(t,d,r,i):(we.flags|=e,c.memoizedState=ya(1|t,d,r,i))}function Am(e,t){$s(8390656,8,e,t)}function Dc(e,t){Ks(2048,8,e,t)}function rS(e){we.flags|=4;var t=we.updateQueue;if(t===null)t=Xs(),we.updateQueue=t,t.events=[e];else{var r=t.events;r===null?t.events=[e]:r.push(e)}}function Dm(e){var t=We().memoizedState;return rS({ref:t,nextImpl:e}),function(){if((Oe&2)!==0)throw Error(l(440));return t.impl.apply(void 0,arguments)}}function Mm(e,t){return Ks(4,2,e,t)}function km(e,t){return Ks(4,4,e,t)}function Rm(e,t){if(typeof t=="function"){e=e();var r=t(e);return function(){typeof r=="function"?r():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Om(e,t,r){r=r!=null?r.concat([e]):null,Ks(4,4,Rm.bind(null,t,e),r)}function Mc(){}function zm(e,t){var r=We();t=t===void 0?null:t;var i=r.memoizedState;return t!==null&&xc(t,i[1])?i[0]:(r.memoizedState=[e,t],e)}function _m(e,t){var r=We();t=t===void 0?null:t;var i=r.memoizedState;if(t!==null&&xc(t,i[1]))return i[0];if(i=e(),zr){Yn(!0);try{e()}finally{Yn(!1)}}return r.memoizedState=[i,t],i}function kc(e,t,r){return r===void 0||(Nn&1073741824)!==0&&(Ne&261930)===0?e.memoizedState=t:(e.memoizedState=r,e=Vp(),we.lanes|=e,nr|=e,r)}function Vm(e,t,r,i){return Rt(r,t)?r:ma.current!==null?(e=kc(e,r,i),Rt(e,t)||(tt=!0),e):(Nn&42)===0||(Nn&1073741824)!==0&&(Ne&261930)===0?(tt=!0,e.memoizedState=r):(e=Vp(),we.lanes|=e,nr|=e,t)}function Bm(e,t,r,i,c){var d=F.p;F.p=d!==0&&8>d?d:8;var y=L.T,w={};L.T=w,zc(e,!1,t,r);try{var A=c(),Y=L.S;if(Y!==null&&Y(w,A),A!==null&&typeof A=="object"&&typeof A.then=="function"){var K=W1(A,i);bi(e,t,K,Lt(e))}else bi(e,t,i,Lt(e))}catch(J){bi(e,t,{then:function(){},status:"rejected",reason:J},Lt())}finally{F.p=d,y!==null&&w.types!==null&&(y.types=w.types),L.T=y}}function aS(){}function Rc(e,t,r,i){if(e.tag!==5)throw Error(l(476));var c=Lm(e).queue;Bm(e,c,t,ae,r===null?aS:function(){return Um(e),r(i)})}function Lm(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:ae,baseState:ae,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:An,lastRenderedState:ae},next:null};var r={};return t.next={memoizedState:r,baseState:r,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:An,lastRenderedState:r},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Um(e){var t=Lm(e);t.next===null&&(t=e.alternate.memoizedState),bi(e,t.next.queue,{},Lt())}function Oc(){return dt(Bi)}function Hm(){return We().memoizedState}function qm(){return We().memoizedState}function iS(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var r=Lt();e=Qn(r);var i=Jn(t,e,r);i!==null&&(At(i,t,r),pi(i,t,r)),t={cache:oc()},e.payload=t;return}t=t.return}}function sS(e,t,r){var i=Lt();r={lane:i,revertLane:0,gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},Zs(e)?Gm(t,r):(r=Jo(e,t,r,i),r!==null&&(At(r,e,i),Xm(r,t,i)))}function Ym(e,t,r){var i=Lt();bi(e,t,r,i)}function bi(e,t,r,i){var c={lane:i,revertLane:0,gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null};if(Zs(e))Gm(t,c);else{var d=e.alternate;if(e.lanes===0&&(d===null||d.lanes===0)&&(d=t.lastRenderedReducer,d!==null))try{var y=t.lastRenderedState,w=d(y,r);if(c.hasEagerState=!0,c.eagerState=w,Rt(w,y))return Ds(e,t,c,0),He===null&&As(),!1}catch{}finally{}if(r=Jo(e,t,c,i),r!==null)return At(r,e,i),Xm(r,t,i),!0}return!1}function zc(e,t,r,i){if(i={lane:2,revertLane:fu(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},Zs(e)){if(t)throw Error(l(479))}else t=Jo(e,r,i,2),t!==null&&At(t,e,2)}function Zs(e){var t=e.alternate;return e===we||t!==null&&t===we}function Gm(e,t){pa=Ys=!0;var r=e.pending;r===null?t.next=t:(t.next=r.next,r.next=t),e.pending=t}function Xm(e,t,r){if((r&4194048)!==0){var i=t.lanes;i&=e.pendingLanes,r|=i,t.lanes=r,Zf(e,r)}}var Si={readContext:dt,use:Ps,useCallback:$e,useContext:$e,useEffect:$e,useImperativeHandle:$e,useLayoutEffect:$e,useInsertionEffect:$e,useMemo:$e,useReducer:$e,useRef:$e,useState:$e,useDebugValue:$e,useDeferredValue:$e,useTransition:$e,useSyncExternalStore:$e,useId:$e,useHostTransitionStatus:$e,useFormState:$e,useActionState:$e,useOptimistic:$e,useMemoCache:$e,useCacheRefresh:$e};Si.useEffectEvent=$e;var Pm={readContext:dt,use:Ps,useCallback:function(e,t){return vt().memoizedState=[e,t===void 0?null:t],e},useContext:dt,useEffect:Am,useImperativeHandle:function(e,t,r){r=r!=null?r.concat([e]):null,$s(4194308,4,Rm.bind(null,t,e),r)},useLayoutEffect:function(e,t){return $s(4194308,4,e,t)},useInsertionEffect:function(e,t){$s(4,2,e,t)},useMemo:function(e,t){var r=vt();t=t===void 0?null:t;var i=e();if(zr){Yn(!0);try{e()}finally{Yn(!1)}}return r.memoizedState=[i,t],i},useReducer:function(e,t,r){var i=vt();if(r!==void 0){var c=r(t);if(zr){Yn(!0);try{r(t)}finally{Yn(!1)}}}else c=t;return i.memoizedState=i.baseState=c,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:c},i.queue=e,e=e.dispatch=sS.bind(null,we,e),[i.memoizedState,e]},useRef:function(e){var t=vt();return e={current:e},t.memoizedState=e},useState:function(e){e=Nc(e);var t=e.queue,r=Ym.bind(null,we,t);return t.dispatch=r,[e.memoizedState,r]},useDebugValue:Mc,useDeferredValue:function(e,t){var r=vt();return kc(r,e,t)},useTransition:function(){var e=Nc(!1);return e=Bm.bind(null,we,e.queue,!0,!1),vt().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,r){var i=we,c=vt();if(De){if(r===void 0)throw Error(l(407));r=r()}else{if(r=t(),He===null)throw Error(l(349));(Ne&127)!==0||fm(i,t,r)}c.memoizedState=r;var d={value:r,getSnapshot:t};return c.queue=d,Am(mm.bind(null,i,d,e),[e]),i.flags|=2048,ya(9,{destroy:void 0},hm.bind(null,i,d,r,t),null),r},useId:function(){var e=vt(),t=He.identifierPrefix;if(De){var r=dn,i=un;r=(i&~(1<<32-kt(i)-1)).toString(32)+r,t="_"+t+"R_"+r,r=Gs++,0<r&&(t+="H"+r.toString(32)),t+="_"}else r=I1++,t="_"+t+"r_"+r.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:Oc,useFormState:jm,useActionState:jm,useOptimistic:function(e){var t=vt();t.memoizedState=t.baseState=e;var r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=r,t=zc.bind(null,we,!0,r),r.dispatch=t,[e,t]},useMemoCache:Ec,useCacheRefresh:function(){return vt().memoizedState=iS.bind(null,we)},useEffectEvent:function(e){var t=vt(),r={impl:e};return t.memoizedState=r,function(){if((Oe&2)!==0)throw Error(l(440));return r.impl.apply(void 0,arguments)}}},_c={readContext:dt,use:Ps,useCallback:zm,useContext:dt,useEffect:Dc,useImperativeHandle:Om,useInsertionEffect:Mm,useLayoutEffect:km,useMemo:_m,useReducer:Fs,useRef:Nm,useState:function(){return Fs(An)},useDebugValue:Mc,useDeferredValue:function(e,t){var r=We();return Vm(r,Be.memoizedState,e,t)},useTransition:function(){var e=Fs(An)[0],t=We().memoizedState;return[typeof e=="boolean"?e:xi(e),t]},useSyncExternalStore:dm,useId:Hm,useHostTransitionStatus:Oc,useFormState:Em,useActionState:Em,useOptimistic:function(e,t){var r=We();return ym(r,Be,e,t)},useMemoCache:Ec,useCacheRefresh:qm};_c.useEffectEvent=Dm;var Fm={readContext:dt,use:Ps,useCallback:zm,useContext:dt,useEffect:Dc,useImperativeHandle:Om,useInsertionEffect:Mm,useLayoutEffect:km,useMemo:_m,useReducer:Cc,useRef:Nm,useState:function(){return Cc(An)},useDebugValue:Mc,useDeferredValue:function(e,t){var r=We();return Be===null?kc(r,e,t):Vm(r,Be.memoizedState,e,t)},useTransition:function(){var e=Cc(An)[0],t=We().memoizedState;return[typeof e=="boolean"?e:xi(e),t]},useSyncExternalStore:dm,useId:Hm,useHostTransitionStatus:Oc,useFormState:Cm,useActionState:Cm,useOptimistic:function(e,t){var r=We();return Be!==null?ym(r,Be,e,t):(r.baseState=e,[e,r.queue.dispatch])},useMemoCache:Ec,useCacheRefresh:qm};Fm.useEffectEvent=Dm;function Vc(e,t,r,i){t=e.memoizedState,r=r(i,t),r=r==null?t:x({},t,r),e.memoizedState=r,e.lanes===0&&(e.updateQueue.baseState=r)}var Bc={enqueueSetState:function(e,t,r){e=e._reactInternals;var i=Lt(),c=Qn(i);c.payload=t,r!=null&&(c.callback=r),t=Jn(e,c,i),t!==null&&(At(t,e,i),pi(t,e,i))},enqueueReplaceState:function(e,t,r){e=e._reactInternals;var i=Lt(),c=Qn(i);c.tag=1,c.payload=t,r!=null&&(c.callback=r),t=Jn(e,c,i),t!==null&&(At(t,e,i),pi(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var r=Lt(),i=Qn(r);i.tag=2,t!=null&&(i.callback=t),t=Jn(e,i,r),t!==null&&(At(t,e,r),pi(t,e,r))}};function $m(e,t,r,i,c,d,y){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,d,y):t.prototype&&t.prototype.isPureReactComponent?!li(r,i)||!li(c,d):!0}function Km(e,t,r,i){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(r,i),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(r,i),t.state!==e&&Bc.enqueueReplaceState(t,t.state,null)}function _r(e,t){var r=t;if("ref"in t){r={};for(var i in t)i!=="ref"&&(r[i]=t[i])}if(e=e.defaultProps){r===t&&(r=x({},r));for(var c in e)r[c]===void 0&&(r[c]=e[c])}return r}function Zm(e){Ns(e)}function Qm(e){console.error(e)}function Jm(e){Ns(e)}function Qs(e,t){try{var r=e.onUncaughtError;r(t.value,{componentStack:t.stack})}catch(i){setTimeout(function(){throw i})}}function Wm(e,t,r){try{var i=e.onCaughtError;i(r.value,{componentStack:r.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(c){setTimeout(function(){throw c})}}function Lc(e,t,r){return r=Qn(r),r.tag=3,r.payload={element:null},r.callback=function(){Qs(e,t)},r}function Im(e){return e=Qn(e),e.tag=3,e}function ep(e,t,r,i){var c=r.type.getDerivedStateFromError;if(typeof c=="function"){var d=i.value;e.payload=function(){return c(d)},e.callback=function(){Wm(t,r,i)}}var y=r.stateNode;y!==null&&typeof y.componentDidCatch=="function"&&(e.callback=function(){Wm(t,r,i),typeof c!="function"&&(rr===null?rr=new Set([this]):rr.add(this));var w=i.stack;this.componentDidCatch(i.value,{componentStack:w!==null?w:""})})}function lS(e,t,r,i,c){if(r.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(t=r.alternate,t!==null&&ca(t,r,c,!0),r=zt.current,r!==null){switch(r.tag){case 31:case 13:return Kt===null?ol():r.alternate===null&&Ke===0&&(Ke=3),r.flags&=-257,r.flags|=65536,r.lanes=c,i===Bs?r.flags|=16384:(t=r.updateQueue,t===null?r.updateQueue=new Set([i]):t.add(i),cu(e,i,c)),!1;case 22:return r.flags|=65536,i===Bs?r.flags|=16384:(t=r.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([i])},r.updateQueue=t):(r=t.retryQueue,r===null?t.retryQueue=new Set([i]):r.add(i)),cu(e,i,c)),!1}throw Error(l(435,r.tag))}return cu(e,i,c),ol(),!1}if(De)return t=zt.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=c,i!==rc&&(e=Error(l(422),{cause:i}),ui(Xt(e,r)))):(i!==rc&&(t=Error(l(423),{cause:i}),ui(Xt(t,r))),e=e.current.alternate,e.flags|=65536,c&=-c,e.lanes|=c,i=Xt(i,r),c=Lc(e.stateNode,i,c),mc(e,c),Ke!==4&&(Ke=2)),!1;var d=Error(l(520),{cause:i});if(d=Xt(d,r),Di===null?Di=[d]:Di.push(d),Ke!==4&&(Ke=2),t===null)return!0;i=Xt(i,r),r=t;do{switch(r.tag){case 3:return r.flags|=65536,e=c&-c,r.lanes|=e,e=Lc(r.stateNode,i,e),mc(r,e),!1;case 1:if(t=r.type,d=r.stateNode,(r.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||d!==null&&typeof d.componentDidCatch=="function"&&(rr===null||!rr.has(d))))return r.flags|=65536,c&=-c,r.lanes|=c,c=Im(c),ep(c,e,r,i),mc(r,c),!1}r=r.return}while(r!==null);return!1}var Uc=Error(l(461)),tt=!1;function ft(e,t,r,i){t.child=e===null?am(t,null,r,i):Or(t,e.child,r,i)}function tp(e,t,r,i,c){r=r.render;var d=t.ref;if("ref"in i){var y={};for(var w in i)w!=="ref"&&(y[w]=i[w])}else y=i;return Dr(t),i=bc(e,t,r,y,d,c),w=Sc(),e!==null&&!tt?(wc(e,t,c),Dn(e,t,c)):(De&&w&&tc(t),t.flags|=1,ft(e,t,i,c),t.child)}function np(e,t,r,i,c){if(e===null){var d=r.type;return typeof d=="function"&&!Wo(d)&&d.defaultProps===void 0&&r.compare===null?(t.tag=15,t.type=d,rp(e,t,d,i,c)):(e=ks(r.type,null,i,t,t.mode,c),e.ref=t.ref,e.return=t,t.child=e)}if(d=e.child,!$c(e,c)){var y=d.memoizedProps;if(r=r.compare,r=r!==null?r:li,r(y,i)&&e.ref===t.ref)return Dn(e,t,c)}return t.flags|=1,e=jn(d,i),e.ref=t.ref,e.return=t,t.child=e}function rp(e,t,r,i,c){if(e!==null){var d=e.memoizedProps;if(li(d,i)&&e.ref===t.ref)if(tt=!1,t.pendingProps=i=d,$c(e,c))(e.flags&131072)!==0&&(tt=!0);else return t.lanes=e.lanes,Dn(e,t,c)}return Hc(e,t,r,i,c)}function ap(e,t,r,i){var c=i.children,d=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if((t.flags&128)!==0){if(d=d!==null?d.baseLanes|r:r,e!==null){for(i=t.child=e.child,c=0;i!==null;)c=c|i.lanes|i.childLanes,i=i.sibling;i=c&~d}else i=0,t.child=null;return ip(e,t,d,r,i)}if((r&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&_s(t,d!==null?d.cachePool:null),d!==null?lm(t,d):gc(),om(t);else return i=t.lanes=536870912,ip(e,t,d!==null?d.baseLanes|r:r,r,i)}else d!==null?(_s(t,d.cachePool),lm(t,d),In(),t.memoizedState=null):(e!==null&&_s(t,null),gc(),In());return ft(e,t,c,r),t.child}function wi(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function ip(e,t,r,i,c){var d=uc();return d=d===null?null:{parent:Ie._currentValue,pool:d},t.memoizedState={baseLanes:r,cachePool:d},e!==null&&_s(t,null),gc(),om(t),e!==null&&ca(e,t,i,!0),t.childLanes=c,null}function Js(e,t){return t=Is({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function sp(e,t,r){return Or(t,e.child,null,r),e=Js(t,t.pendingProps),e.flags|=2,_t(t),t.memoizedState=null,e}function oS(e,t,r){var i=t.pendingProps,c=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(De){if(i.mode==="hidden")return e=Js(t,i),t.lanes=536870912,wi(null,e);if(vc(t),(e=Ge)?(e=vg(e,$t),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Pn!==null?{id:un,overflow:dn}:null,retryLane:536870912,hydrationErrors:null},r=Gh(e),r.return=t,t.child=r,ut=t,Ge=null)):e=null,e===null)throw $n(t);return t.lanes=536870912,null}return Js(t,i)}var d=e.memoizedState;if(d!==null){var y=d.dehydrated;if(vc(t),c)if(t.flags&256)t.flags&=-257,t=sp(e,t,r);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(l(558));else if(tt||ca(e,t,r,!1),c=(r&e.childLanes)!==0,tt||c){if(i=He,i!==null&&(y=Qf(i,r),y!==0&&y!==d.retryLane))throw d.retryLane=y,Tr(e,y),At(i,e,y),Uc;ol(),t=sp(e,t,r)}else e=d.treeContext,Ge=Zt(y.nextSibling),ut=t,De=!0,Fn=null,$t=!1,e!==null&&Fh(t,e),t=Js(t,i),t.flags|=4096;return t}return e=jn(e.child,{mode:i.mode,children:i.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Ws(e,t){var r=t.ref;if(r===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof r!="function"&&typeof r!="object")throw Error(l(284));(e===null||e.ref!==r)&&(t.flags|=4194816)}}function Hc(e,t,r,i,c){return Dr(t),r=bc(e,t,r,i,void 0,c),i=Sc(),e!==null&&!tt?(wc(e,t,c),Dn(e,t,c)):(De&&i&&tc(t),t.flags|=1,ft(e,t,r,c),t.child)}function lp(e,t,r,i,c,d){return Dr(t),t.updateQueue=null,r=um(t,i,r,c),cm(e),i=Sc(),e!==null&&!tt?(wc(e,t,d),Dn(e,t,d)):(De&&i&&tc(t),t.flags|=1,ft(e,t,r,d),t.child)}function op(e,t,r,i,c){if(Dr(t),t.stateNode===null){var d=ia,y=r.contextType;typeof y=="object"&&y!==null&&(d=dt(y)),d=new r(i,d),t.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,d.updater=Bc,t.stateNode=d,d._reactInternals=t,d=t.stateNode,d.props=i,d.state=t.memoizedState,d.refs={},fc(t),y=r.contextType,d.context=typeof y=="object"&&y!==null?dt(y):ia,d.state=t.memoizedState,y=r.getDerivedStateFromProps,typeof y=="function"&&(Vc(t,r,y,i),d.state=t.memoizedState),typeof r.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(y=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),y!==d.state&&Bc.enqueueReplaceState(d,d.state,null),yi(t,i,d,c),gi(),d.state=t.memoizedState),typeof d.componentDidMount=="function"&&(t.flags|=4194308),i=!0}else if(e===null){d=t.stateNode;var w=t.memoizedProps,A=_r(r,w);d.props=A;var Y=d.context,K=r.contextType;y=ia,typeof K=="object"&&K!==null&&(y=dt(K));var J=r.getDerivedStateFromProps;K=typeof J=="function"||typeof d.getSnapshotBeforeUpdate=="function",w=t.pendingProps!==w,K||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(w||Y!==y)&&Km(t,d,i,y),Zn=!1;var G=t.memoizedState;d.state=G,yi(t,i,d,c),gi(),Y=t.memoizedState,w||G!==Y||Zn?(typeof J=="function"&&(Vc(t,r,J,i),Y=t.memoizedState),(A=Zn||$m(t,r,A,i,G,Y,y))?(K||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount()),typeof d.componentDidMount=="function"&&(t.flags|=4194308)):(typeof d.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=i,t.memoizedState=Y),d.props=i,d.state=Y,d.context=y,i=A):(typeof d.componentDidMount=="function"&&(t.flags|=4194308),i=!1)}else{d=t.stateNode,hc(e,t),y=t.memoizedProps,K=_r(r,y),d.props=K,J=t.pendingProps,G=d.context,Y=r.contextType,A=ia,typeof Y=="object"&&Y!==null&&(A=dt(Y)),w=r.getDerivedStateFromProps,(Y=typeof w=="function"||typeof d.getSnapshotBeforeUpdate=="function")||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(y!==J||G!==A)&&Km(t,d,i,A),Zn=!1,G=t.memoizedState,d.state=G,yi(t,i,d,c),gi();var X=t.memoizedState;y!==J||G!==X||Zn||e!==null&&e.dependencies!==null&&Os(e.dependencies)?(typeof w=="function"&&(Vc(t,r,w,i),X=t.memoizedState),(K=Zn||$m(t,r,K,i,G,X,A)||e!==null&&e.dependencies!==null&&Os(e.dependencies))?(Y||typeof d.UNSAFE_componentWillUpdate!="function"&&typeof d.componentWillUpdate!="function"||(typeof d.componentWillUpdate=="function"&&d.componentWillUpdate(i,X,A),typeof d.UNSAFE_componentWillUpdate=="function"&&d.UNSAFE_componentWillUpdate(i,X,A)),typeof d.componentDidUpdate=="function"&&(t.flags|=4),typeof d.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof d.componentDidUpdate!="function"||y===e.memoizedProps&&G===e.memoizedState||(t.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&G===e.memoizedState||(t.flags|=1024),t.memoizedProps=i,t.memoizedState=X),d.props=i,d.state=X,d.context=A,i=K):(typeof d.componentDidUpdate!="function"||y===e.memoizedProps&&G===e.memoizedState||(t.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&G===e.memoizedState||(t.flags|=1024),i=!1)}return d=i,Ws(e,t),i=(t.flags&128)!==0,d||i?(d=t.stateNode,r=i&&typeof r.getDerivedStateFromError!="function"?null:d.render(),t.flags|=1,e!==null&&i?(t.child=Or(t,e.child,null,c),t.child=Or(t,null,r,c)):ft(e,t,r,c),t.memoizedState=d.state,e=t.child):e=Dn(e,t,c),e}function cp(e,t,r,i){return Nr(),t.flags|=256,ft(e,t,r,i),t.child}var qc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Yc(e){return{baseLanes:e,cachePool:Wh()}}function Gc(e,t,r){return e=e!==null?e.childLanes&~r:0,t&&(e|=Bt),e}function up(e,t,r){var i=t.pendingProps,c=!1,d=(t.flags&128)!==0,y;if((y=d)||(y=e!==null&&e.memoizedState===null?!1:(Je.current&2)!==0),y&&(c=!0,t.flags&=-129),y=(t.flags&32)!==0,t.flags&=-33,e===null){if(De){if(c?Wn(t):In(),(e=Ge)?(e=vg(e,$t),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Pn!==null?{id:un,overflow:dn}:null,retryLane:536870912,hydrationErrors:null},r=Gh(e),r.return=t,t.child=r,ut=t,Ge=null)):e=null,e===null)throw $n(t);return Tu(e)?t.lanes=32:t.lanes=536870912,null}var w=i.children;return i=i.fallback,c?(In(),c=t.mode,w=Is({mode:"hidden",children:w},c),i=Cr(i,c,r,null),w.return=t,i.return=t,w.sibling=i,t.child=w,i=t.child,i.memoizedState=Yc(r),i.childLanes=Gc(e,y,r),t.memoizedState=qc,wi(null,i)):(Wn(t),Xc(t,w))}var A=e.memoizedState;if(A!==null&&(w=A.dehydrated,w!==null)){if(d)t.flags&256?(Wn(t),t.flags&=-257,t=Pc(e,t,r)):t.memoizedState!==null?(In(),t.child=e.child,t.flags|=128,t=null):(In(),w=i.fallback,c=t.mode,i=Is({mode:"visible",children:i.children},c),w=Cr(w,c,r,null),w.flags|=2,i.return=t,w.return=t,i.sibling=w,t.child=i,Or(t,e.child,null,r),i=t.child,i.memoizedState=Yc(r),i.childLanes=Gc(e,y,r),t.memoizedState=qc,t=wi(null,i));else if(Wn(t),Tu(w)){if(y=w.nextSibling&&w.nextSibling.dataset,y)var Y=y.dgst;y=Y,i=Error(l(419)),i.stack="",i.digest=y,ui({value:i,source:null,stack:null}),t=Pc(e,t,r)}else if(tt||ca(e,t,r,!1),y=(r&e.childLanes)!==0,tt||y){if(y=He,y!==null&&(i=Qf(y,r),i!==0&&i!==A.retryLane))throw A.retryLane=i,Tr(e,i),At(y,e,i),Uc;Eu(w)||ol(),t=Pc(e,t,r)}else Eu(w)?(t.flags|=192,t.child=e.child,t=null):(e=A.treeContext,Ge=Zt(w.nextSibling),ut=t,De=!0,Fn=null,$t=!1,e!==null&&Fh(t,e),t=Xc(t,i.children),t.flags|=4096);return t}return c?(In(),w=i.fallback,c=t.mode,A=e.child,Y=A.sibling,i=jn(A,{mode:"hidden",children:i.children}),i.subtreeFlags=A.subtreeFlags&65011712,Y!==null?w=jn(Y,w):(w=Cr(w,c,r,null),w.flags|=2),w.return=t,i.return=t,i.sibling=w,t.child=i,wi(null,i),i=t.child,w=e.child.memoizedState,w===null?w=Yc(r):(c=w.cachePool,c!==null?(A=Ie._currentValue,c=c.parent!==A?{parent:A,pool:A}:c):c=Wh(),w={baseLanes:w.baseLanes|r,cachePool:c}),i.memoizedState=w,i.childLanes=Gc(e,y,r),t.memoizedState=qc,wi(e.child,i)):(Wn(t),r=e.child,e=r.sibling,r=jn(r,{mode:"visible",children:i.children}),r.return=t,r.sibling=null,e!==null&&(y=t.deletions,y===null?(t.deletions=[e],t.flags|=16):y.push(e)),t.child=r,t.memoizedState=null,r)}function Xc(e,t){return t=Is({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function Is(e,t){return e=Ot(22,e,null,t),e.lanes=0,e}function Pc(e,t,r){return Or(t,e.child,null,r),e=Xc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function dp(e,t,r){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t),sc(e.return,t,r)}function Fc(e,t,r,i,c,d){var y=e.memoizedState;y===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:i,tail:r,tailMode:c,treeForkCount:d}:(y.isBackwards=t,y.rendering=null,y.renderingStartTime=0,y.last=i,y.tail=r,y.tailMode=c,y.treeForkCount=d)}function fp(e,t,r){var i=t.pendingProps,c=i.revealOrder,d=i.tail;i=i.children;var y=Je.current,w=(y&2)!==0;if(w?(y=y&1|2,t.flags|=128):y&=1,I(Je,y),ft(e,t,i,r),i=De?ci:0,!w&&e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&dp(e,r,t);else if(e.tag===19)dp(e,r,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(c){case"forwards":for(r=t.child,c=null;r!==null;)e=r.alternate,e!==null&&qs(e)===null&&(c=r),r=r.sibling;r=c,r===null?(c=t.child,t.child=null):(c=r.sibling,r.sibling=null),Fc(t,!1,c,r,d,i);break;case"backwards":case"unstable_legacy-backwards":for(r=null,c=t.child,t.child=null;c!==null;){if(e=c.alternate,e!==null&&qs(e)===null){t.child=c;break}e=c.sibling,c.sibling=r,r=c,c=e}Fc(t,!0,r,null,d,i);break;case"together":Fc(t,!1,null,null,void 0,i);break;default:t.memoizedState=null}return t.child}function Dn(e,t,r){if(e!==null&&(t.dependencies=e.dependencies),nr|=t.lanes,(r&t.childLanes)===0)if(e!==null){if(ca(e,t,r,!1),(r&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(l(153));if(t.child!==null){for(e=t.child,r=jn(e,e.pendingProps),t.child=r,r.return=t;e.sibling!==null;)e=e.sibling,r=r.sibling=jn(e,e.pendingProps),r.return=t;r.sibling=null}return t.child}function $c(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&Os(e)))}function cS(e,t,r){switch(t.tag){case 3:te(t,t.stateNode.containerInfo),Kn(t,Ie,e.memoizedState.cache),Nr();break;case 27:case 5:de(t);break;case 4:te(t,t.stateNode.containerInfo);break;case 10:Kn(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,vc(t),null;break;case 13:var i=t.memoizedState;if(i!==null)return i.dehydrated!==null?(Wn(t),t.flags|=128,null):(r&t.child.childLanes)!==0?up(e,t,r):(Wn(t),e=Dn(e,t,r),e!==null?e.sibling:null);Wn(t);break;case 19:var c=(e.flags&128)!==0;if(i=(r&t.childLanes)!==0,i||(ca(e,t,r,!1),i=(r&t.childLanes)!==0),c){if(i)return fp(e,t,r);t.flags|=128}if(c=t.memoizedState,c!==null&&(c.rendering=null,c.tail=null,c.lastEffect=null),I(Je,Je.current),i)break;return null;case 22:return t.lanes=0,ap(e,t,r,t.pendingProps);case 24:Kn(t,Ie,e.memoizedState.cache)}return Dn(e,t,r)}function hp(e,t,r){if(e!==null)if(e.memoizedProps!==t.pendingProps)tt=!0;else{if(!$c(e,r)&&(t.flags&128)===0)return tt=!1,cS(e,t,r);tt=(e.flags&131072)!==0}else tt=!1,De&&(t.flags&1048576)!==0&&Ph(t,ci,t.index);switch(t.lanes=0,t.tag){case 16:e:{var i=t.pendingProps;if(e=kr(t.elementType),t.type=e,typeof e=="function")Wo(e)?(i=_r(e,i),t.tag=1,t=op(null,t,e,i,r)):(t.tag=0,t=Hc(null,t,e,i,r));else{if(e!=null){var c=e.$$typeof;if(c===O){t.tag=11,t=tp(null,t,e,i,r);break e}else if(c===M){t.tag=14,t=np(null,t,e,i,r);break e}}throw t=le(e)||e,Error(l(306,t,""))}}return t;case 0:return Hc(e,t,t.type,t.pendingProps,r);case 1:return i=t.type,c=_r(i,t.pendingProps),op(e,t,i,c,r);case 3:e:{if(te(t,t.stateNode.containerInfo),e===null)throw Error(l(387));i=t.pendingProps;var d=t.memoizedState;c=d.element,hc(e,t),yi(t,i,null,r);var y=t.memoizedState;if(i=y.cache,Kn(t,Ie,i),i!==d.cache&&lc(t,[Ie],r,!0),gi(),i=y.element,d.isDehydrated)if(d={element:i,isDehydrated:!1,cache:y.cache},t.updateQueue.baseState=d,t.memoizedState=d,t.flags&256){t=cp(e,t,i,r);break e}else if(i!==c){c=Xt(Error(l(424)),t),ui(c),t=cp(e,t,i,r);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Ge=Zt(e.firstChild),ut=t,De=!0,Fn=null,$t=!0,r=am(t,null,i,r),t.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling}else{if(Nr(),i===c){t=Dn(e,t,r);break e}ft(e,t,i,r)}t=t.child}return t;case 26:return Ws(e,t),e===null?(r=Eg(t.type,null,t.pendingProps,null))?t.memoizedState=r:De||(r=t.type,e=t.pendingProps,i=pl(ye.current).createElement(r),i[ct]=t,i[wt]=e,ht(i,r,e),st(i),t.stateNode=i):t.memoizedState=Eg(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return de(t),e===null&&De&&(i=t.stateNode=Sg(t.type,t.pendingProps,ye.current),ut=t,$t=!0,c=Ge,lr(t.type)?(Cu=c,Ge=Zt(i.firstChild)):Ge=c),ft(e,t,t.pendingProps.children,r),Ws(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&De&&((c=i=Ge)&&(i=US(i,t.type,t.pendingProps,$t),i!==null?(t.stateNode=i,ut=t,Ge=Zt(i.firstChild),$t=!1,c=!0):c=!1),c||$n(t)),de(t),c=t.type,d=t.pendingProps,y=e!==null?e.memoizedProps:null,i=d.children,Su(c,d)?i=null:y!==null&&Su(c,y)&&(t.flags|=32),t.memoizedState!==null&&(c=bc(e,t,eS,null,null,r),Bi._currentValue=c),Ws(e,t),ft(e,t,i,r),t.child;case 6:return e===null&&De&&((e=r=Ge)&&(r=HS(r,t.pendingProps,$t),r!==null?(t.stateNode=r,ut=t,Ge=null,e=!0):e=!1),e||$n(t)),null;case 13:return up(e,t,r);case 4:return te(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=Or(t,null,i,r):ft(e,t,i,r),t.child;case 11:return tp(e,t,t.type,t.pendingProps,r);case 7:return ft(e,t,t.pendingProps,r),t.child;case 8:return ft(e,t,t.pendingProps.children,r),t.child;case 12:return ft(e,t,t.pendingProps.children,r),t.child;case 10:return i=t.pendingProps,Kn(t,t.type,i.value),ft(e,t,i.children,r),t.child;case 9:return c=t.type._context,i=t.pendingProps.children,Dr(t),c=dt(c),i=i(c),t.flags|=1,ft(e,t,i,r),t.child;case 14:return np(e,t,t.type,t.pendingProps,r);case 15:return rp(e,t,t.type,t.pendingProps,r);case 19:return fp(e,t,r);case 31:return oS(e,t,r);case 22:return ap(e,t,r,t.pendingProps);case 24:return Dr(t),i=dt(Ie),e===null?(c=uc(),c===null&&(c=He,d=oc(),c.pooledCache=d,d.refCount++,d!==null&&(c.pooledCacheLanes|=r),c=d),t.memoizedState={parent:i,cache:c},fc(t),Kn(t,Ie,c)):((e.lanes&r)!==0&&(hc(e,t),yi(t,null,null,r),gi()),c=e.memoizedState,d=t.memoizedState,c.parent!==i?(c={parent:i,cache:i},t.memoizedState=c,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=c),Kn(t,Ie,i)):(i=d.cache,Kn(t,Ie,i),i!==c.cache&&lc(t,[Ie],r,!0))),ft(e,t,t.pendingProps.children,r),t.child;case 29:throw t.pendingProps}throw Error(l(156,t.tag))}function Mn(e){e.flags|=4}function Kc(e,t,r,i,c){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(c&335544128)===c)if(e.stateNode.complete)e.flags|=8192;else if(Hp())e.flags|=8192;else throw Rr=Bs,dc}else e.flags&=-16777217}function mp(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Dg(t))if(Hp())e.flags|=8192;else throw Rr=Bs,dc}function el(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?$f():536870912,e.lanes|=t,Sa|=t)}function ji(e,t){if(!De)switch(e.tailMode){case"hidden":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var i=null;r!==null;)r.alternate!==null&&(i=r),r=r.sibling;i===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null}}function Xe(e){var t=e.alternate!==null&&e.alternate.child===e.child,r=0,i=0;if(t)for(var c=e.child;c!==null;)r|=c.lanes|c.childLanes,i|=c.subtreeFlags&65011712,i|=c.flags&65011712,c.return=e,c=c.sibling;else for(c=e.child;c!==null;)r|=c.lanes|c.childLanes,i|=c.subtreeFlags,i|=c.flags,c.return=e,c=c.sibling;return e.subtreeFlags|=i,e.childLanes=r,t}function uS(e,t,r){var i=t.pendingProps;switch(nc(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Xe(t),null;case 1:return Xe(t),null;case 3:return r=t.stateNode,i=null,e!==null&&(i=e.memoizedState.cache),t.memoizedState.cache!==i&&(t.flags|=2048),Cn(Ie),Q(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(oa(t)?Mn(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,ac())),Xe(t),null;case 26:var c=t.type,d=t.memoizedState;return e===null?(Mn(t),d!==null?(Xe(t),mp(t,d)):(Xe(t),Kc(t,c,null,i,r))):d?d!==e.memoizedState?(Mn(t),Xe(t),mp(t,d)):(Xe(t),t.flags&=-16777217):(e=e.memoizedProps,e!==i&&Mn(t),Xe(t),Kc(t,c,e,i,r)),null;case 27:if(W(t),r=ye.current,c=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&Mn(t);else{if(!i){if(t.stateNode===null)throw Error(l(166));return Xe(t),null}e=re.current,oa(t)?$h(t):(e=Sg(c,i,r),t.stateNode=e,Mn(t))}return Xe(t),null;case 5:if(W(t),c=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&Mn(t);else{if(!i){if(t.stateNode===null)throw Error(l(166));return Xe(t),null}if(d=re.current,oa(t))$h(t);else{var y=pl(ye.current);switch(d){case 1:d=y.createElementNS("http://www.w3.org/2000/svg",c);break;case 2:d=y.createElementNS("http://www.w3.org/1998/Math/MathML",c);break;default:switch(c){case"svg":d=y.createElementNS("http://www.w3.org/2000/svg",c);break;case"math":d=y.createElementNS("http://www.w3.org/1998/Math/MathML",c);break;case"script":d=y.createElement("div"),d.innerHTML="<script><\/script>",d=d.removeChild(d.firstChild);break;case"select":d=typeof i.is=="string"?y.createElement("select",{is:i.is}):y.createElement("select"),i.multiple?d.multiple=!0:i.size&&(d.size=i.size);break;default:d=typeof i.is=="string"?y.createElement(c,{is:i.is}):y.createElement(c)}}d[ct]=t,d[wt]=i;e:for(y=t.child;y!==null;){if(y.tag===5||y.tag===6)d.appendChild(y.stateNode);else if(y.tag!==4&&y.tag!==27&&y.child!==null){y.child.return=y,y=y.child;continue}if(y===t)break e;for(;y.sibling===null;){if(y.return===null||y.return===t)break e;y=y.return}y.sibling.return=y.return,y=y.sibling}t.stateNode=d;e:switch(ht(d,c,i),c){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}i&&Mn(t)}}return Xe(t),Kc(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,r),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==i&&Mn(t);else{if(typeof i!="string"&&t.stateNode===null)throw Error(l(166));if(e=ye.current,oa(t)){if(e=t.stateNode,r=t.memoizedProps,i=null,c=ut,c!==null)switch(c.tag){case 27:case 5:i=c.memoizedProps}e[ct]=t,e=!!(e.nodeValue===r||i!==null&&i.suppressHydrationWarning===!0||ug(e.nodeValue,r)),e||$n(t,!0)}else e=pl(e).createTextNode(i),e[ct]=t,t.stateNode=e}return Xe(t),null;case 31:if(r=t.memoizedState,e===null||e.memoizedState!==null){if(i=oa(t),r!==null){if(e===null){if(!i)throw Error(l(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(l(557));e[ct]=t}else Nr(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Xe(t),e=!1}else r=ac(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=r),e=!0;if(!e)return t.flags&256?(_t(t),t):(_t(t),null);if((t.flags&128)!==0)throw Error(l(558))}return Xe(t),null;case 13:if(i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(c=oa(t),i!==null&&i.dehydrated!==null){if(e===null){if(!c)throw Error(l(318));if(c=t.memoizedState,c=c!==null?c.dehydrated:null,!c)throw Error(l(317));c[ct]=t}else Nr(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Xe(t),c=!1}else c=ac(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=c),c=!0;if(!c)return t.flags&256?(_t(t),t):(_t(t),null)}return _t(t),(t.flags&128)!==0?(t.lanes=r,t):(r=i!==null,e=e!==null&&e.memoizedState!==null,r&&(i=t.child,c=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(c=i.alternate.memoizedState.cachePool.pool),d=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(d=i.memoizedState.cachePool.pool),d!==c&&(i.flags|=2048)),r!==e&&r&&(t.child.flags|=8192),el(t,t.updateQueue),Xe(t),null);case 4:return Q(),e===null&&gu(t.stateNode.containerInfo),Xe(t),null;case 10:return Cn(t.type),Xe(t),null;case 19:if(V(Je),i=t.memoizedState,i===null)return Xe(t),null;if(c=(t.flags&128)!==0,d=i.rendering,d===null)if(c)ji(i,!1);else{if(Ke!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(d=qs(e),d!==null){for(t.flags|=128,ji(i,!1),e=d.updateQueue,t.updateQueue=e,el(t,e),t.subtreeFlags=0,e=r,r=t.child;r!==null;)Yh(r,e),r=r.sibling;return I(Je,Je.current&1|2),De&&En(t,i.treeForkCount),t.child}e=e.sibling}i.tail!==null&&Dt()>il&&(t.flags|=128,c=!0,ji(i,!1),t.lanes=4194304)}else{if(!c)if(e=qs(d),e!==null){if(t.flags|=128,c=!0,e=e.updateQueue,t.updateQueue=e,el(t,e),ji(i,!0),i.tail===null&&i.tailMode==="hidden"&&!d.alternate&&!De)return Xe(t),null}else 2*Dt()-i.renderingStartTime>il&&r!==536870912&&(t.flags|=128,c=!0,ji(i,!1),t.lanes=4194304);i.isBackwards?(d.sibling=t.child,t.child=d):(e=i.last,e!==null?e.sibling=d:t.child=d,i.last=d)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=Dt(),e.sibling=null,r=Je.current,I(Je,c?r&1|2:r&1),De&&En(t,i.treeForkCount),e):(Xe(t),null);case 22:case 23:return _t(t),yc(),i=t.memoizedState!==null,e!==null?e.memoizedState!==null!==i&&(t.flags|=8192):i&&(t.flags|=8192),i?(r&536870912)!==0&&(t.flags&128)===0&&(Xe(t),t.subtreeFlags&6&&(t.flags|=8192)):Xe(t),r=t.updateQueue,r!==null&&el(t,r.retryQueue),r=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(r=e.memoizedState.cachePool.pool),i=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(i=t.memoizedState.cachePool.pool),i!==r&&(t.flags|=2048),e!==null&&V(Mr),null;case 24:return r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),Cn(Ie),Xe(t),null;case 25:return null;case 30:return null}throw Error(l(156,t.tag))}function dS(e,t){switch(nc(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Cn(Ie),Q(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return W(t),null;case 31:if(t.memoizedState!==null){if(_t(t),t.alternate===null)throw Error(l(340));Nr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(_t(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(l(340));Nr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return V(Je),null;case 4:return Q(),null;case 10:return Cn(t.type),null;case 22:case 23:return _t(t),yc(),e!==null&&V(Mr),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Cn(Ie),null;case 25:return null;default:return null}}function pp(e,t){switch(nc(t),t.tag){case 3:Cn(Ie),Q();break;case 26:case 27:case 5:W(t);break;case 4:Q();break;case 31:t.memoizedState!==null&&_t(t);break;case 13:_t(t);break;case 19:V(Je);break;case 10:Cn(t.type);break;case 22:case 23:_t(t),yc(),e!==null&&V(Mr);break;case 24:Cn(Ie)}}function Ei(e,t){try{var r=t.updateQueue,i=r!==null?r.lastEffect:null;if(i!==null){var c=i.next;r=c;do{if((r.tag&e)===e){i=void 0;var d=r.create,y=r.inst;i=d(),y.destroy=i}r=r.next}while(r!==c)}}catch(w){Ve(t,t.return,w)}}function er(e,t,r){try{var i=t.updateQueue,c=i!==null?i.lastEffect:null;if(c!==null){var d=c.next;i=d;do{if((i.tag&e)===e){var y=i.inst,w=y.destroy;if(w!==void 0){y.destroy=void 0,c=t;var A=r,Y=w;try{Y()}catch(K){Ve(c,A,K)}}}i=i.next}while(i!==d)}}catch(K){Ve(t,t.return,K)}}function gp(e){var t=e.updateQueue;if(t!==null){var r=e.stateNode;try{sm(t,r)}catch(i){Ve(e,e.return,i)}}}function yp(e,t,r){r.props=_r(e.type,e.memoizedProps),r.state=e.memoizedState;try{r.componentWillUnmount()}catch(i){Ve(e,t,i)}}function Ti(e,t){try{var r=e.ref;if(r!==null){switch(e.tag){case 26:case 27:case 5:var i=e.stateNode;break;case 30:i=e.stateNode;break;default:i=e.stateNode}typeof r=="function"?e.refCleanup=r(i):r.current=i}}catch(c){Ve(e,t,c)}}function fn(e,t){var r=e.ref,i=e.refCleanup;if(r!==null)if(typeof i=="function")try{i()}catch(c){Ve(e,t,c)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof r=="function")try{r(null)}catch(c){Ve(e,t,c)}else r.current=null}function vp(e){var t=e.type,r=e.memoizedProps,i=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":r.autoFocus&&i.focus();break e;case"img":r.src?i.src=r.src:r.srcSet&&(i.srcset=r.srcSet)}}catch(c){Ve(e,e.return,c)}}function Zc(e,t,r){try{var i=e.stateNode;OS(i,e.type,r,t),i[wt]=t}catch(c){Ve(e,e.return,c)}}function xp(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&lr(e.type)||e.tag===4}function Qc(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||xp(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&lr(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Jc(e,t,r){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?(r.nodeType===9?r.body:r.nodeName==="HTML"?r.ownerDocument.body:r).insertBefore(e,t):(t=r.nodeType===9?r.body:r.nodeName==="HTML"?r.ownerDocument.body:r,t.appendChild(e),r=r._reactRootContainer,r!=null||t.onclick!==null||(t.onclick=Sn));else if(i!==4&&(i===27&&lr(e.type)&&(r=e.stateNode,t=null),e=e.child,e!==null))for(Jc(e,t,r),e=e.sibling;e!==null;)Jc(e,t,r),e=e.sibling}function tl(e,t,r){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?r.insertBefore(e,t):r.appendChild(e);else if(i!==4&&(i===27&&lr(e.type)&&(r=e.stateNode),e=e.child,e!==null))for(tl(e,t,r),e=e.sibling;e!==null;)tl(e,t,r),e=e.sibling}function bp(e){var t=e.stateNode,r=e.memoizedProps;try{for(var i=e.type,c=t.attributes;c.length;)t.removeAttributeNode(c[0]);ht(t,i,r),t[ct]=e,t[wt]=r}catch(d){Ve(e,e.return,d)}}var kn=!1,nt=!1,Wc=!1,Sp=typeof WeakSet=="function"?WeakSet:Set,lt=null;function fS(e,t){if(e=e.containerInfo,xu=wl,e=Oh(e),Po(e)){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{r=(r=e.ownerDocument)&&r.defaultView||window;var i=r.getSelection&&r.getSelection();if(i&&i.rangeCount!==0){r=i.anchorNode;var c=i.anchorOffset,d=i.focusNode;i=i.focusOffset;try{r.nodeType,d.nodeType}catch{r=null;break e}var y=0,w=-1,A=-1,Y=0,K=0,J=e,G=null;t:for(;;){for(var X;J!==r||c!==0&&J.nodeType!==3||(w=y+c),J!==d||i!==0&&J.nodeType!==3||(A=y+i),J.nodeType===3&&(y+=J.nodeValue.length),(X=J.firstChild)!==null;)G=J,J=X;for(;;){if(J===e)break t;if(G===r&&++Y===c&&(w=y),G===d&&++K===i&&(A=y),(X=J.nextSibling)!==null)break;J=G,G=J.parentNode}J=X}r=w===-1||A===-1?null:{start:w,end:A}}else r=null}r=r||{start:0,end:0}}else r=null;for(bu={focusedElem:e,selectionRange:r},wl=!1,lt=t;lt!==null;)if(t=lt,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,lt=e;else for(;lt!==null;){switch(t=lt,d=t.alternate,e=t.flags,t.tag){case 0:if((e&4)!==0&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(r=0;r<e.length;r++)c=e[r],c.ref.impl=c.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&d!==null){e=void 0,r=t,c=d.memoizedProps,d=d.memoizedState,i=r.stateNode;try{var ue=_r(r.type,c);e=i.getSnapshotBeforeUpdate(ue,d),i.__reactInternalSnapshotBeforeUpdate=e}catch(ve){Ve(r,r.return,ve)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,r=e.nodeType,r===9)ju(e);else if(r===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":ju(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(l(163))}if(e=t.sibling,e!==null){e.return=t.return,lt=e;break}lt=t.return}}function wp(e,t,r){var i=r.flags;switch(r.tag){case 0:case 11:case 15:On(e,r),i&4&&Ei(5,r);break;case 1:if(On(e,r),i&4)if(e=r.stateNode,t===null)try{e.componentDidMount()}catch(y){Ve(r,r.return,y)}else{var c=_r(r.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(c,t,e.__reactInternalSnapshotBeforeUpdate)}catch(y){Ve(r,r.return,y)}}i&64&&gp(r),i&512&&Ti(r,r.return);break;case 3:if(On(e,r),i&64&&(e=r.updateQueue,e!==null)){if(t=null,r.child!==null)switch(r.child.tag){case 27:case 5:t=r.child.stateNode;break;case 1:t=r.child.stateNode}try{sm(e,t)}catch(y){Ve(r,r.return,y)}}break;case 27:t===null&&i&4&&bp(r);case 26:case 5:On(e,r),t===null&&i&4&&vp(r),i&512&&Ti(r,r.return);break;case 12:On(e,r);break;case 31:On(e,r),i&4&&Tp(e,r);break;case 13:On(e,r),i&4&&Cp(e,r),i&64&&(e=r.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(r=SS.bind(null,r),qS(e,r))));break;case 22:if(i=r.memoizedState!==null||kn,!i){t=t!==null&&t.memoizedState!==null||nt,c=kn;var d=nt;kn=i,(nt=t)&&!d?zn(e,r,(r.subtreeFlags&8772)!==0):On(e,r),kn=c,nt=d}break;case 30:break;default:On(e,r)}}function jp(e){var t=e.alternate;t!==null&&(e.alternate=null,jp(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Ao(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Pe=null,Et=!1;function Rn(e,t,r){for(r=r.child;r!==null;)Ep(e,t,r),r=r.sibling}function Ep(e,t,r){if(Mt&&typeof Mt.onCommitFiberUnmount=="function")try{Mt.onCommitFiberUnmount(Za,r)}catch{}switch(r.tag){case 26:nt||fn(r,t),Rn(e,t,r),r.memoizedState?r.memoizedState.count--:r.stateNode&&(r=r.stateNode,r.parentNode.removeChild(r));break;case 27:nt||fn(r,t);var i=Pe,c=Et;lr(r.type)&&(Pe=r.stateNode,Et=!1),Rn(e,t,r),zi(r.stateNode),Pe=i,Et=c;break;case 5:nt||fn(r,t);case 6:if(i=Pe,c=Et,Pe=null,Rn(e,t,r),Pe=i,Et=c,Pe!==null)if(Et)try{(Pe.nodeType===9?Pe.body:Pe.nodeName==="HTML"?Pe.ownerDocument.body:Pe).removeChild(r.stateNode)}catch(d){Ve(r,t,d)}else try{Pe.removeChild(r.stateNode)}catch(d){Ve(r,t,d)}break;case 18:Pe!==null&&(Et?(e=Pe,gg(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,r.stateNode),Da(e)):gg(Pe,r.stateNode));break;case 4:i=Pe,c=Et,Pe=r.stateNode.containerInfo,Et=!0,Rn(e,t,r),Pe=i,Et=c;break;case 0:case 11:case 14:case 15:er(2,r,t),nt||er(4,r,t),Rn(e,t,r);break;case 1:nt||(fn(r,t),i=r.stateNode,typeof i.componentWillUnmount=="function"&&yp(r,t,i)),Rn(e,t,r);break;case 21:Rn(e,t,r);break;case 22:nt=(i=nt)||r.memoizedState!==null,Rn(e,t,r),nt=i;break;default:Rn(e,t,r)}}function Tp(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Da(e)}catch(r){Ve(t,t.return,r)}}}function Cp(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Da(e)}catch(r){Ve(t,t.return,r)}}function hS(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new Sp),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new Sp),t;default:throw Error(l(435,e.tag))}}function nl(e,t){var r=hS(e);t.forEach(function(i){if(!r.has(i)){r.add(i);var c=wS.bind(null,e,i);i.then(c,c)}})}function Tt(e,t){var r=t.deletions;if(r!==null)for(var i=0;i<r.length;i++){var c=r[i],d=e,y=t,w=y;e:for(;w!==null;){switch(w.tag){case 27:if(lr(w.type)){Pe=w.stateNode,Et=!1;break e}break;case 5:Pe=w.stateNode,Et=!1;break e;case 3:case 4:Pe=w.stateNode.containerInfo,Et=!0;break e}w=w.return}if(Pe===null)throw Error(l(160));Ep(d,y,c),Pe=null,Et=!1,d=c.alternate,d!==null&&(d.return=null),c.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Np(t,e),t=t.sibling}var tn=null;function Np(e,t){var r=e.alternate,i=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Tt(t,e),Ct(e),i&4&&(er(3,e,e.return),Ei(3,e),er(5,e,e.return));break;case 1:Tt(t,e),Ct(e),i&512&&(nt||r===null||fn(r,r.return)),i&64&&kn&&(e=e.updateQueue,e!==null&&(i=e.callbacks,i!==null&&(r=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=r===null?i:r.concat(i))));break;case 26:var c=tn;if(Tt(t,e),Ct(e),i&512&&(nt||r===null||fn(r,r.return)),i&4){var d=r!==null?r.memoizedState:null;if(i=e.memoizedState,r===null)if(i===null)if(e.stateNode===null){e:{i=e.type,r=e.memoizedProps,c=c.ownerDocument||c;t:switch(i){case"title":d=c.getElementsByTagName("title")[0],(!d||d[Wa]||d[ct]||d.namespaceURI==="http://www.w3.org/2000/svg"||d.hasAttribute("itemprop"))&&(d=c.createElement(i),c.head.insertBefore(d,c.querySelector("head > title"))),ht(d,i,r),d[ct]=e,st(d),i=d;break e;case"link":var y=Ng("link","href",c).get(i+(r.href||""));if(y){for(var w=0;w<y.length;w++)if(d=y[w],d.getAttribute("href")===(r.href==null||r.href===""?null:r.href)&&d.getAttribute("rel")===(r.rel==null?null:r.rel)&&d.getAttribute("title")===(r.title==null?null:r.title)&&d.getAttribute("crossorigin")===(r.crossOrigin==null?null:r.crossOrigin)){y.splice(w,1);break t}}d=c.createElement(i),ht(d,i,r),c.head.appendChild(d);break;case"meta":if(y=Ng("meta","content",c).get(i+(r.content||""))){for(w=0;w<y.length;w++)if(d=y[w],d.getAttribute("content")===(r.content==null?null:""+r.content)&&d.getAttribute("name")===(r.name==null?null:r.name)&&d.getAttribute("property")===(r.property==null?null:r.property)&&d.getAttribute("http-equiv")===(r.httpEquiv==null?null:r.httpEquiv)&&d.getAttribute("charset")===(r.charSet==null?null:r.charSet)){y.splice(w,1);break t}}d=c.createElement(i),ht(d,i,r),c.head.appendChild(d);break;default:throw Error(l(468,i))}d[ct]=e,st(d),i=d}e.stateNode=i}else Ag(c,e.type,e.stateNode);else e.stateNode=Cg(c,i,e.memoizedProps);else d!==i?(d===null?r.stateNode!==null&&(r=r.stateNode,r.parentNode.removeChild(r)):d.count--,i===null?Ag(c,e.type,e.stateNode):Cg(c,i,e.memoizedProps)):i===null&&e.stateNode!==null&&Zc(e,e.memoizedProps,r.memoizedProps)}break;case 27:Tt(t,e),Ct(e),i&512&&(nt||r===null||fn(r,r.return)),r!==null&&i&4&&Zc(e,e.memoizedProps,r.memoizedProps);break;case 5:if(Tt(t,e),Ct(e),i&512&&(nt||r===null||fn(r,r.return)),e.flags&32){c=e.stateNode;try{Wr(c,"")}catch(ue){Ve(e,e.return,ue)}}i&4&&e.stateNode!=null&&(c=e.memoizedProps,Zc(e,c,r!==null?r.memoizedProps:c)),i&1024&&(Wc=!0);break;case 6:if(Tt(t,e),Ct(e),i&4){if(e.stateNode===null)throw Error(l(162));i=e.memoizedProps,r=e.stateNode;try{r.nodeValue=i}catch(ue){Ve(e,e.return,ue)}}break;case 3:if(vl=null,c=tn,tn=gl(t.containerInfo),Tt(t,e),tn=c,Ct(e),i&4&&r!==null&&r.memoizedState.isDehydrated)try{Da(t.containerInfo)}catch(ue){Ve(e,e.return,ue)}Wc&&(Wc=!1,Ap(e));break;case 4:i=tn,tn=gl(e.stateNode.containerInfo),Tt(t,e),Ct(e),tn=i;break;case 12:Tt(t,e),Ct(e);break;case 31:Tt(t,e),Ct(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,nl(e,i)));break;case 13:Tt(t,e),Ct(e),e.child.flags&8192&&e.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(al=Dt()),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,nl(e,i)));break;case 22:c=e.memoizedState!==null;var A=r!==null&&r.memoizedState!==null,Y=kn,K=nt;if(kn=Y||c,nt=K||A,Tt(t,e),nt=K,kn=Y,Ct(e),i&8192)e:for(t=e.stateNode,t._visibility=c?t._visibility&-2:t._visibility|1,c&&(r===null||A||kn||nt||Vr(e)),r=null,t=e;;){if(t.tag===5||t.tag===26){if(r===null){A=r=t;try{if(d=A.stateNode,c)y=d.style,typeof y.setProperty=="function"?y.setProperty("display","none","important"):y.display="none";else{w=A.stateNode;var J=A.memoizedProps.style,G=J!=null&&J.hasOwnProperty("display")?J.display:null;w.style.display=G==null||typeof G=="boolean"?"":(""+G).trim()}}catch(ue){Ve(A,A.return,ue)}}}else if(t.tag===6){if(r===null){A=t;try{A.stateNode.nodeValue=c?"":A.memoizedProps}catch(ue){Ve(A,A.return,ue)}}}else if(t.tag===18){if(r===null){A=t;try{var X=A.stateNode;c?yg(X,!0):yg(A.stateNode,!1)}catch(ue){Ve(A,A.return,ue)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;r===t&&(r=null),t=t.return}r===t&&(r=null),t.sibling.return=t.return,t=t.sibling}i&4&&(i=e.updateQueue,i!==null&&(r=i.retryQueue,r!==null&&(i.retryQueue=null,nl(e,r))));break;case 19:Tt(t,e),Ct(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,nl(e,i)));break;case 30:break;case 21:break;default:Tt(t,e),Ct(e)}}function Ct(e){var t=e.flags;if(t&2){try{for(var r,i=e.return;i!==null;){if(xp(i)){r=i;break}i=i.return}if(r==null)throw Error(l(160));switch(r.tag){case 27:var c=r.stateNode,d=Qc(e);tl(e,d,c);break;case 5:var y=r.stateNode;r.flags&32&&(Wr(y,""),r.flags&=-33);var w=Qc(e);tl(e,w,y);break;case 3:case 4:var A=r.stateNode.containerInfo,Y=Qc(e);Jc(e,Y,A);break;default:throw Error(l(161))}}catch(K){Ve(e,e.return,K)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Ap(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Ap(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function On(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)wp(e,t.alternate,t),t=t.sibling}function Vr(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:er(4,t,t.return),Vr(t);break;case 1:fn(t,t.return);var r=t.stateNode;typeof r.componentWillUnmount=="function"&&yp(t,t.return,r),Vr(t);break;case 27:zi(t.stateNode);case 26:case 5:fn(t,t.return),Vr(t);break;case 22:t.memoizedState===null&&Vr(t);break;case 30:Vr(t);break;default:Vr(t)}e=e.sibling}}function zn(e,t,r){for(r=r&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var i=t.alternate,c=e,d=t,y=d.flags;switch(d.tag){case 0:case 11:case 15:zn(c,d,r),Ei(4,d);break;case 1:if(zn(c,d,r),i=d,c=i.stateNode,typeof c.componentDidMount=="function")try{c.componentDidMount()}catch(Y){Ve(i,i.return,Y)}if(i=d,c=i.updateQueue,c!==null){var w=i.stateNode;try{var A=c.shared.hiddenCallbacks;if(A!==null)for(c.shared.hiddenCallbacks=null,c=0;c<A.length;c++)im(A[c],w)}catch(Y){Ve(i,i.return,Y)}}r&&y&64&&gp(d),Ti(d,d.return);break;case 27:bp(d);case 26:case 5:zn(c,d,r),r&&i===null&&y&4&&vp(d),Ti(d,d.return);break;case 12:zn(c,d,r);break;case 31:zn(c,d,r),r&&y&4&&Tp(c,d);break;case 13:zn(c,d,r),r&&y&4&&Cp(c,d);break;case 22:d.memoizedState===null&&zn(c,d,r),Ti(d,d.return);break;case 30:break;default:zn(c,d,r)}t=t.sibling}}function Ic(e,t){var r=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(r=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==r&&(e!=null&&e.refCount++,r!=null&&di(r))}function eu(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&di(e))}function nn(e,t,r,i){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Dp(e,t,r,i),t=t.sibling}function Dp(e,t,r,i){var c=t.flags;switch(t.tag){case 0:case 11:case 15:nn(e,t,r,i),c&2048&&Ei(9,t);break;case 1:nn(e,t,r,i);break;case 3:nn(e,t,r,i),c&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&di(e)));break;case 12:if(c&2048){nn(e,t,r,i),e=t.stateNode;try{var d=t.memoizedProps,y=d.id,w=d.onPostCommit;typeof w=="function"&&w(y,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(A){Ve(t,t.return,A)}}else nn(e,t,r,i);break;case 31:nn(e,t,r,i);break;case 13:nn(e,t,r,i);break;case 23:break;case 22:d=t.stateNode,y=t.alternate,t.memoizedState!==null?d._visibility&2?nn(e,t,r,i):Ci(e,t):d._visibility&2?nn(e,t,r,i):(d._visibility|=2,va(e,t,r,i,(t.subtreeFlags&10256)!==0||!1)),c&2048&&Ic(y,t);break;case 24:nn(e,t,r,i),c&2048&&eu(t.alternate,t);break;default:nn(e,t,r,i)}}function va(e,t,r,i,c){for(c=c&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var d=e,y=t,w=r,A=i,Y=y.flags;switch(y.tag){case 0:case 11:case 15:va(d,y,w,A,c),Ei(8,y);break;case 23:break;case 22:var K=y.stateNode;y.memoizedState!==null?K._visibility&2?va(d,y,w,A,c):Ci(d,y):(K._visibility|=2,va(d,y,w,A,c)),c&&Y&2048&&Ic(y.alternate,y);break;case 24:va(d,y,w,A,c),c&&Y&2048&&eu(y.alternate,y);break;default:va(d,y,w,A,c)}t=t.sibling}}function Ci(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var r=e,i=t,c=i.flags;switch(i.tag){case 22:Ci(r,i),c&2048&&Ic(i.alternate,i);break;case 24:Ci(r,i),c&2048&&eu(i.alternate,i);break;default:Ci(r,i)}t=t.sibling}}var Ni=8192;function xa(e,t,r){if(e.subtreeFlags&Ni)for(e=e.child;e!==null;)Mp(e,t,r),e=e.sibling}function Mp(e,t,r){switch(e.tag){case 26:xa(e,t,r),e.flags&Ni&&e.memoizedState!==null&&IS(r,tn,e.memoizedState,e.memoizedProps);break;case 5:xa(e,t,r);break;case 3:case 4:var i=tn;tn=gl(e.stateNode.containerInfo),xa(e,t,r),tn=i;break;case 22:e.memoizedState===null&&(i=e.alternate,i!==null&&i.memoizedState!==null?(i=Ni,Ni=16777216,xa(e,t,r),Ni=i):xa(e,t,r));break;default:xa(e,t,r)}}function kp(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Ai(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var r=0;r<t.length;r++){var i=t[r];lt=i,Op(i,e)}kp(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Rp(e),e=e.sibling}function Rp(e){switch(e.tag){case 0:case 11:case 15:Ai(e),e.flags&2048&&er(9,e,e.return);break;case 3:Ai(e);break;case 12:Ai(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,rl(e)):Ai(e);break;default:Ai(e)}}function rl(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var r=0;r<t.length;r++){var i=t[r];lt=i,Op(i,e)}kp(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:er(8,t,t.return),rl(t);break;case 22:r=t.stateNode,r._visibility&2&&(r._visibility&=-3,rl(t));break;default:rl(t)}e=e.sibling}}function Op(e,t){for(;lt!==null;){var r=lt;switch(r.tag){case 0:case 11:case 15:er(8,r,t);break;case 23:case 22:if(r.memoizedState!==null&&r.memoizedState.cachePool!==null){var i=r.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:di(r.memoizedState.cache)}if(i=r.child,i!==null)i.return=r,lt=i;else e:for(r=e;lt!==null;){i=lt;var c=i.sibling,d=i.return;if(jp(i),i===r){lt=null;break e}if(c!==null){c.return=d,lt=c;break e}lt=d}}}var mS={getCacheForType:function(e){var t=dt(Ie),r=t.data.get(e);return r===void 0&&(r=e(),t.data.set(e,r)),r},cacheSignal:function(){return dt(Ie).controller.signal}},pS=typeof WeakMap=="function"?WeakMap:Map,Oe=0,He=null,Ee=null,Ne=0,_e=0,Vt=null,tr=!1,ba=!1,tu=!1,_n=0,Ke=0,nr=0,Br=0,nu=0,Bt=0,Sa=0,Di=null,Nt=null,ru=!1,al=0,zp=0,il=1/0,sl=null,rr=null,at=0,ar=null,wa=null,Vn=0,au=0,iu=null,_p=null,Mi=0,su=null;function Lt(){return(Oe&2)!==0&&Ne!==0?Ne&-Ne:L.T!==null?fu():Jf()}function Vp(){if(Bt===0)if((Ne&536870912)===0||De){var e=ms;ms<<=1,(ms&3932160)===0&&(ms=262144),Bt=e}else Bt=536870912;return e=zt.current,e!==null&&(e.flags|=32),Bt}function At(e,t,r){(e===He&&(_e===2||_e===9)||e.cancelPendingCommit!==null)&&(ja(e,0),ir(e,Ne,Bt,!1)),Ja(e,r),((Oe&2)===0||e!==He)&&(e===He&&((Oe&2)===0&&(Br|=r),Ke===4&&ir(e,Ne,Bt,!1)),hn(e))}function Bp(e,t,r){if((Oe&6)!==0)throw Error(l(327));var i=!r&&(t&127)===0&&(t&e.expiredLanes)===0||Qa(e,t),c=i?vS(e,t):ou(e,t,!0),d=i;do{if(c===0){ba&&!i&&ir(e,t,0,!1);break}else{if(r=e.current.alternate,d&&!gS(r)){c=ou(e,t,!1),d=!1;continue}if(c===2){if(d=t,e.errorRecoveryDisabledLanes&d)var y=0;else y=e.pendingLanes&-536870913,y=y!==0?y:y&536870912?536870912:0;if(y!==0){t=y;e:{var w=e;c=Di;var A=w.current.memoizedState.isDehydrated;if(A&&(ja(w,y).flags|=256),y=ou(w,y,!1),y!==2){if(tu&&!A){w.errorRecoveryDisabledLanes|=d,Br|=d,c=4;break e}d=Nt,Nt=c,d!==null&&(Nt===null?Nt=d:Nt.push.apply(Nt,d))}c=y}if(d=!1,c!==2)continue}}if(c===1){ja(e,0),ir(e,t,0,!0);break}e:{switch(i=e,d=c,d){case 0:case 1:throw Error(l(345));case 4:if((t&4194048)!==t)break;case 6:ir(i,t,Bt,!tr);break e;case 2:Nt=null;break;case 3:case 5:break;default:throw Error(l(329))}if((t&62914560)===t&&(c=al+300-Dt(),10<c)){if(ir(i,t,Bt,!tr),gs(i,0,!0)!==0)break e;Vn=t,i.timeoutHandle=mg(Lp.bind(null,i,r,Nt,sl,ru,t,Bt,Br,Sa,tr,d,"Throttled",-0,0),c);break e}Lp(i,r,Nt,sl,ru,t,Bt,Br,Sa,tr,d,null,-0,0)}}break}while(!0);hn(e)}function Lp(e,t,r,i,c,d,y,w,A,Y,K,J,G,X){if(e.timeoutHandle=-1,J=t.subtreeFlags,J&8192||(J&16785408)===16785408){J={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Sn},Mp(t,d,J);var ue=(d&62914560)===d?al-Dt():(d&4194048)===d?zp-Dt():0;if(ue=e2(J,ue),ue!==null){Vn=d,e.cancelPendingCommit=ue(Fp.bind(null,e,t,d,r,i,c,y,w,A,K,J,null,G,X)),ir(e,d,y,!Y);return}}Fp(e,t,d,r,i,c,y,w,A)}function gS(e){for(var t=e;;){var r=t.tag;if((r===0||r===11||r===15)&&t.flags&16384&&(r=t.updateQueue,r!==null&&(r=r.stores,r!==null)))for(var i=0;i<r.length;i++){var c=r[i],d=c.getSnapshot;c=c.value;try{if(!Rt(d(),c))return!1}catch{return!1}}if(r=t.child,t.subtreeFlags&16384&&r!==null)r.return=t,t=r;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function ir(e,t,r,i){t&=~nu,t&=~Br,e.suspendedLanes|=t,e.pingedLanes&=~t,i&&(e.warmLanes|=t),i=e.expirationTimes;for(var c=t;0<c;){var d=31-kt(c),y=1<<d;i[d]=-1,c&=~y}r!==0&&Kf(e,r,t)}function ll(){return(Oe&6)===0?(ki(0),!1):!0}function lu(){if(Ee!==null){if(_e===0)var e=Ee.return;else e=Ee,Tn=Ar=null,jc(e),ha=null,hi=0,e=Ee;for(;e!==null;)pp(e.alternate,e),e=e.return;Ee=null}}function ja(e,t){var r=e.timeoutHandle;r!==-1&&(e.timeoutHandle=-1,VS(r)),r=e.cancelPendingCommit,r!==null&&(e.cancelPendingCommit=null,r()),Vn=0,lu(),He=e,Ee=r=jn(e.current,null),Ne=t,_e=0,Vt=null,tr=!1,ba=Qa(e,t),tu=!1,Sa=Bt=nu=Br=nr=Ke=0,Nt=Di=null,ru=!1,(t&8)!==0&&(t|=t&32);var i=e.entangledLanes;if(i!==0)for(e=e.entanglements,i&=t;0<i;){var c=31-kt(i),d=1<<c;t|=e[c],i&=~d}return _n=t,As(),r}function Up(e,t){we=null,L.H=Si,t===fa||t===Vs?(t=tm(),_e=3):t===dc?(t=tm(),_e=4):_e=t===Uc?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,Vt=t,Ee===null&&(Ke=1,Qs(e,Xt(t,e.current)))}function Hp(){var e=zt.current;return e===null?!0:(Ne&4194048)===Ne?Kt===null:(Ne&62914560)===Ne||(Ne&536870912)!==0?e===Kt:!1}function qp(){var e=L.H;return L.H=Si,e===null?Si:e}function Yp(){var e=L.A;return L.A=mS,e}function ol(){Ke=4,tr||(Ne&4194048)!==Ne&&zt.current!==null||(ba=!0),(nr&134217727)===0&&(Br&134217727)===0||He===null||ir(He,Ne,Bt,!1)}function ou(e,t,r){var i=Oe;Oe|=2;var c=qp(),d=Yp();(He!==e||Ne!==t)&&(sl=null,ja(e,t)),t=!1;var y=Ke;e:do try{if(_e!==0&&Ee!==null){var w=Ee,A=Vt;switch(_e){case 8:lu(),y=6;break e;case 3:case 2:case 9:case 6:zt.current===null&&(t=!0);var Y=_e;if(_e=0,Vt=null,Ea(e,w,A,Y),r&&ba){y=0;break e}break;default:Y=_e,_e=0,Vt=null,Ea(e,w,A,Y)}}yS(),y=Ke;break}catch(K){Up(e,K)}while(!0);return t&&e.shellSuspendCounter++,Tn=Ar=null,Oe=i,L.H=c,L.A=d,Ee===null&&(He=null,Ne=0,As()),y}function yS(){for(;Ee!==null;)Gp(Ee)}function vS(e,t){var r=Oe;Oe|=2;var i=qp(),c=Yp();He!==e||Ne!==t?(sl=null,il=Dt()+500,ja(e,t)):ba=Qa(e,t);e:do try{if(_e!==0&&Ee!==null){t=Ee;var d=Vt;t:switch(_e){case 1:_e=0,Vt=null,Ea(e,t,d,1);break;case 2:case 9:if(Ih(d)){_e=0,Vt=null,Xp(t);break}t=function(){_e!==2&&_e!==9||He!==e||(_e=7),hn(e)},d.then(t,t);break e;case 3:_e=7;break e;case 4:_e=5;break e;case 7:Ih(d)?(_e=0,Vt=null,Xp(t)):(_e=0,Vt=null,Ea(e,t,d,7));break;case 5:var y=null;switch(Ee.tag){case 26:y=Ee.memoizedState;case 5:case 27:var w=Ee;if(y?Dg(y):w.stateNode.complete){_e=0,Vt=null;var A=w.sibling;if(A!==null)Ee=A;else{var Y=w.return;Y!==null?(Ee=Y,cl(Y)):Ee=null}break t}}_e=0,Vt=null,Ea(e,t,d,5);break;case 6:_e=0,Vt=null,Ea(e,t,d,6);break;case 8:lu(),Ke=6;break e;default:throw Error(l(462))}}xS();break}catch(K){Up(e,K)}while(!0);return Tn=Ar=null,L.H=i,L.A=c,Oe=r,Ee!==null?0:(He=null,Ne=0,As(),Ke)}function xS(){for(;Ee!==null&&!Yb();)Gp(Ee)}function Gp(e){var t=hp(e.alternate,e,_n);e.memoizedProps=e.pendingProps,t===null?cl(e):Ee=t}function Xp(e){var t=e,r=t.alternate;switch(t.tag){case 15:case 0:t=lp(r,t,t.pendingProps,t.type,void 0,Ne);break;case 11:t=lp(r,t,t.pendingProps,t.type.render,t.ref,Ne);break;case 5:jc(t);default:pp(r,t),t=Ee=Yh(t,_n),t=hp(r,t,_n)}e.memoizedProps=e.pendingProps,t===null?cl(e):Ee=t}function Ea(e,t,r,i){Tn=Ar=null,jc(t),ha=null,hi=0;var c=t.return;try{if(lS(e,c,t,r,Ne)){Ke=1,Qs(e,Xt(r,e.current)),Ee=null;return}}catch(d){if(c!==null)throw Ee=c,d;Ke=1,Qs(e,Xt(r,e.current)),Ee=null;return}t.flags&32768?(De||i===1?e=!0:ba||(Ne&536870912)!==0?e=!1:(tr=e=!0,(i===2||i===9||i===3||i===6)&&(i=zt.current,i!==null&&i.tag===13&&(i.flags|=16384))),Pp(t,e)):cl(t)}function cl(e){var t=e;do{if((t.flags&32768)!==0){Pp(t,tr);return}e=t.return;var r=uS(t.alternate,t,_n);if(r!==null){Ee=r;return}if(t=t.sibling,t!==null){Ee=t;return}Ee=t=e}while(t!==null);Ke===0&&(Ke=5)}function Pp(e,t){do{var r=dS(e.alternate,e);if(r!==null){r.flags&=32767,Ee=r;return}if(r=e.return,r!==null&&(r.flags|=32768,r.subtreeFlags=0,r.deletions=null),!t&&(e=e.sibling,e!==null)){Ee=e;return}Ee=e=r}while(e!==null);Ke=6,Ee=null}function Fp(e,t,r,i,c,d,y,w,A){e.cancelPendingCommit=null;do ul();while(at!==0);if((Oe&6)!==0)throw Error(l(327));if(t!==null){if(t===e.current)throw Error(l(177));if(d=t.lanes|t.childLanes,d|=Qo,Wb(e,r,d,y,w,A),e===He&&(Ee=He=null,Ne=0),wa=t,ar=e,Vn=r,au=d,iu=c,_p=i,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,jS(fs,function(){return Jp(),null})):(e.callbackNode=null,e.callbackPriority=0),i=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||i){i=L.T,L.T=null,c=F.p,F.p=2,y=Oe,Oe|=4;try{fS(e,t,r)}finally{Oe=y,F.p=c,L.T=i}}at=1,$p(),Kp(),Zp()}}function $p(){if(at===1){at=0;var e=ar,t=wa,r=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||r){r=L.T,L.T=null;var i=F.p;F.p=2;var c=Oe;Oe|=4;try{Np(t,e);var d=bu,y=Oh(e.containerInfo),w=d.focusedElem,A=d.selectionRange;if(y!==w&&w&&w.ownerDocument&&Rh(w.ownerDocument.documentElement,w)){if(A!==null&&Po(w)){var Y=A.start,K=A.end;if(K===void 0&&(K=Y),"selectionStart"in w)w.selectionStart=Y,w.selectionEnd=Math.min(K,w.value.length);else{var J=w.ownerDocument||document,G=J&&J.defaultView||window;if(G.getSelection){var X=G.getSelection(),ue=w.textContent.length,ve=Math.min(A.start,ue),Ue=A.end===void 0?ve:Math.min(A.end,ue);!X.extend&&ve>Ue&&(y=Ue,Ue=ve,ve=y);var B=kh(w,ve),z=kh(w,Ue);if(B&&z&&(X.rangeCount!==1||X.anchorNode!==B.node||X.anchorOffset!==B.offset||X.focusNode!==z.node||X.focusOffset!==z.offset)){var H=J.createRange();H.setStart(B.node,B.offset),X.removeAllRanges(),ve>Ue?(X.addRange(H),X.extend(z.node,z.offset)):(H.setEnd(z.node,z.offset),X.addRange(H))}}}}for(J=[],X=w;X=X.parentNode;)X.nodeType===1&&J.push({element:X,left:X.scrollLeft,top:X.scrollTop});for(typeof w.focus=="function"&&w.focus(),w=0;w<J.length;w++){var Z=J[w];Z.element.scrollLeft=Z.left,Z.element.scrollTop=Z.top}}wl=!!xu,bu=xu=null}finally{Oe=c,F.p=i,L.T=r}}e.current=t,at=2}}function Kp(){if(at===2){at=0;var e=ar,t=wa,r=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||r){r=L.T,L.T=null;var i=F.p;F.p=2;var c=Oe;Oe|=4;try{wp(e,t.alternate,t)}finally{Oe=c,F.p=i,L.T=r}}at=3}}function Zp(){if(at===4||at===3){at=0,Gb();var e=ar,t=wa,r=Vn,i=_p;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?at=5:(at=0,wa=ar=null,Qp(e,e.pendingLanes));var c=e.pendingLanes;if(c===0&&(rr=null),Co(r),t=t.stateNode,Mt&&typeof Mt.onCommitFiberRoot=="function")try{Mt.onCommitFiberRoot(Za,t,void 0,(t.current.flags&128)===128)}catch{}if(i!==null){t=L.T,c=F.p,F.p=2,L.T=null;try{for(var d=e.onRecoverableError,y=0;y<i.length;y++){var w=i[y];d(w.value,{componentStack:w.stack})}}finally{L.T=t,F.p=c}}(Vn&3)!==0&&ul(),hn(e),c=e.pendingLanes,(r&261930)!==0&&(c&42)!==0?e===su?Mi++:(Mi=0,su=e):Mi=0,ki(0)}}function Qp(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,di(t)))}function ul(){return $p(),Kp(),Zp(),Jp()}function Jp(){if(at!==5)return!1;var e=ar,t=au;au=0;var r=Co(Vn),i=L.T,c=F.p;try{F.p=32>r?32:r,L.T=null,r=iu,iu=null;var d=ar,y=Vn;if(at=0,wa=ar=null,Vn=0,(Oe&6)!==0)throw Error(l(331));var w=Oe;if(Oe|=4,Rp(d.current),Dp(d,d.current,y,r),Oe=w,ki(0,!1),Mt&&typeof Mt.onPostCommitFiberRoot=="function")try{Mt.onPostCommitFiberRoot(Za,d)}catch{}return!0}finally{F.p=c,L.T=i,Qp(e,t)}}function Wp(e,t,r){t=Xt(r,t),t=Lc(e.stateNode,t,2),e=Jn(e,t,2),e!==null&&(Ja(e,2),hn(e))}function Ve(e,t,r){if(e.tag===3)Wp(e,e,r);else for(;t!==null;){if(t.tag===3){Wp(t,e,r);break}else if(t.tag===1){var i=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(rr===null||!rr.has(i))){e=Xt(r,e),r=Im(2),i=Jn(t,r,2),i!==null&&(ep(r,i,t,e),Ja(i,2),hn(i));break}}t=t.return}}function cu(e,t,r){var i=e.pingCache;if(i===null){i=e.pingCache=new pS;var c=new Set;i.set(t,c)}else c=i.get(t),c===void 0&&(c=new Set,i.set(t,c));c.has(r)||(tu=!0,c.add(r),e=bS.bind(null,e,t,r),t.then(e,e))}function bS(e,t,r){var i=e.pingCache;i!==null&&i.delete(t),e.pingedLanes|=e.suspendedLanes&r,e.warmLanes&=~r,He===e&&(Ne&r)===r&&(Ke===4||Ke===3&&(Ne&62914560)===Ne&&300>Dt()-al?(Oe&2)===0&&ja(e,0):nu|=r,Sa===Ne&&(Sa=0)),hn(e)}function Ip(e,t){t===0&&(t=$f()),e=Tr(e,t),e!==null&&(Ja(e,t),hn(e))}function SS(e){var t=e.memoizedState,r=0;t!==null&&(r=t.retryLane),Ip(e,r)}function wS(e,t){var r=0;switch(e.tag){case 31:case 13:var i=e.stateNode,c=e.memoizedState;c!==null&&(r=c.retryLane);break;case 19:i=e.stateNode;break;case 22:i=e.stateNode._retryCache;break;default:throw Error(l(314))}i!==null&&i.delete(t),Ip(e,r)}function jS(e,t){return wo(e,t)}var dl=null,Ta=null,uu=!1,fl=!1,du=!1,sr=0;function hn(e){e!==Ta&&e.next===null&&(Ta===null?dl=Ta=e:Ta=Ta.next=e),fl=!0,uu||(uu=!0,TS())}function ki(e,t){if(!du&&fl){du=!0;do for(var r=!1,i=dl;i!==null;){if(e!==0){var c=i.pendingLanes;if(c===0)var d=0;else{var y=i.suspendedLanes,w=i.pingedLanes;d=(1<<31-kt(42|e)+1)-1,d&=c&~(y&~w),d=d&201326741?d&201326741|1:d?d|2:0}d!==0&&(r=!0,rg(i,d))}else d=Ne,d=gs(i,i===He?d:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),(d&3)===0||Qa(i,d)||(r=!0,rg(i,d));i=i.next}while(r);du=!1}}function ES(){eg()}function eg(){fl=uu=!1;var e=0;sr!==0&&_S()&&(e=sr);for(var t=Dt(),r=null,i=dl;i!==null;){var c=i.next,d=tg(i,t);d===0?(i.next=null,r===null?dl=c:r.next=c,c===null&&(Ta=r)):(r=i,(e!==0||(d&3)!==0)&&(fl=!0)),i=c}at!==0&&at!==5||ki(e),sr!==0&&(sr=0)}function tg(e,t){for(var r=e.suspendedLanes,i=e.pingedLanes,c=e.expirationTimes,d=e.pendingLanes&-62914561;0<d;){var y=31-kt(d),w=1<<y,A=c[y];A===-1?((w&r)===0||(w&i)!==0)&&(c[y]=Jb(w,t)):A<=t&&(e.expiredLanes|=w),d&=~w}if(t=He,r=Ne,r=gs(e,e===t?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i=e.callbackNode,r===0||e===t&&(_e===2||_e===9)||e.cancelPendingCommit!==null)return i!==null&&i!==null&&jo(i),e.callbackNode=null,e.callbackPriority=0;if((r&3)===0||Qa(e,r)){if(t=r&-r,t===e.callbackPriority)return t;switch(i!==null&&jo(i),Co(r)){case 2:case 8:r=Pf;break;case 32:r=fs;break;case 268435456:r=Ff;break;default:r=fs}return i=ng.bind(null,e),r=wo(r,i),e.callbackPriority=t,e.callbackNode=r,t}return i!==null&&i!==null&&jo(i),e.callbackPriority=2,e.callbackNode=null,2}function ng(e,t){if(at!==0&&at!==5)return e.callbackNode=null,e.callbackPriority=0,null;var r=e.callbackNode;if(ul()&&e.callbackNode!==r)return null;var i=Ne;return i=gs(e,e===He?i:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i===0?null:(Bp(e,i,t),tg(e,Dt()),e.callbackNode!=null&&e.callbackNode===r?ng.bind(null,e):null)}function rg(e,t){if(ul())return null;Bp(e,t,!0)}function TS(){BS(function(){(Oe&6)!==0?wo(Xf,ES):eg()})}function fu(){if(sr===0){var e=ua;e===0&&(e=hs,hs<<=1,(hs&261888)===0&&(hs=256)),sr=e}return sr}function ag(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:bs(""+e)}function ig(e,t){var r=t.ownerDocument.createElement("input");return r.name=t.name,r.value=t.value,e.id&&r.setAttribute("form",e.id),t.parentNode.insertBefore(r,t),e=new FormData(e),r.parentNode.removeChild(r),e}function CS(e,t,r,i,c){if(t==="submit"&&r&&r.stateNode===c){var d=ag((c[wt]||null).action),y=i.submitter;y&&(t=(t=y[wt]||null)?ag(t.formAction):y.getAttribute("formAction"),t!==null&&(d=t,y=null));var w=new Es("action","action",null,i,c);e.push({event:w,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(sr!==0){var A=y?ig(c,y):new FormData(c);Rc(r,{pending:!0,data:A,method:c.method,action:d},null,A)}}else typeof d=="function"&&(w.preventDefault(),A=y?ig(c,y):new FormData(c),Rc(r,{pending:!0,data:A,method:c.method,action:d},d,A))},currentTarget:c}]})}}for(var hu=0;hu<Zo.length;hu++){var mu=Zo[hu],NS=mu.toLowerCase(),AS=mu[0].toUpperCase()+mu.slice(1);en(NS,"on"+AS)}en(Vh,"onAnimationEnd"),en(Bh,"onAnimationIteration"),en(Lh,"onAnimationStart"),en("dblclick","onDoubleClick"),en("focusin","onFocus"),en("focusout","onBlur"),en(X1,"onTransitionRun"),en(P1,"onTransitionStart"),en(F1,"onTransitionCancel"),en(Uh,"onTransitionEnd"),Qr("onMouseEnter",["mouseout","mouseover"]),Qr("onMouseLeave",["mouseout","mouseover"]),Qr("onPointerEnter",["pointerout","pointerover"]),Qr("onPointerLeave",["pointerout","pointerover"]),Sr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Sr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Sr("onBeforeInput",["compositionend","keypress","textInput","paste"]),Sr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Sr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Sr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ri="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),DS=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ri));function sg(e,t){t=(t&4)!==0;for(var r=0;r<e.length;r++){var i=e[r],c=i.event;i=i.listeners;e:{var d=void 0;if(t)for(var y=i.length-1;0<=y;y--){var w=i[y],A=w.instance,Y=w.currentTarget;if(w=w.listener,A!==d&&c.isPropagationStopped())break e;d=w,c.currentTarget=Y;try{d(c)}catch(K){Ns(K)}c.currentTarget=null,d=A}else for(y=0;y<i.length;y++){if(w=i[y],A=w.instance,Y=w.currentTarget,w=w.listener,A!==d&&c.isPropagationStopped())break e;d=w,c.currentTarget=Y;try{d(c)}catch(K){Ns(K)}c.currentTarget=null,d=A}}}}function Te(e,t){var r=t[No];r===void 0&&(r=t[No]=new Set);var i=e+"__bubble";r.has(i)||(lg(t,e,2,!1),r.add(i))}function pu(e,t,r){var i=0;t&&(i|=4),lg(r,e,i,t)}var hl="_reactListening"+Math.random().toString(36).slice(2);function gu(e){if(!e[hl]){e[hl]=!0,eh.forEach(function(r){r!=="selectionchange"&&(DS.has(r)||pu(r,!1,e),pu(r,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[hl]||(t[hl]=!0,pu("selectionchange",!1,t))}}function lg(e,t,r,i){switch(Vg(t)){case 2:var c=r2;break;case 8:c=a2;break;default:c=ku}r=c.bind(null,t,r,e),c=void 0,!Vo||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(c=!0),i?c!==void 0?e.addEventListener(t,r,{capture:!0,passive:c}):e.addEventListener(t,r,!0):c!==void 0?e.addEventListener(t,r,{passive:c}):e.addEventListener(t,r,!1)}function yu(e,t,r,i,c){var d=i;if((t&1)===0&&(t&2)===0&&i!==null)e:for(;;){if(i===null)return;var y=i.tag;if(y===3||y===4){var w=i.stateNode.containerInfo;if(w===c)break;if(y===4)for(y=i.return;y!==null;){var A=y.tag;if((A===3||A===4)&&y.stateNode.containerInfo===c)return;y=y.return}for(;w!==null;){if(y=$r(w),y===null)return;if(A=y.tag,A===5||A===6||A===26||A===27){i=d=y;continue e}w=w.parentNode}}i=i.return}fh(function(){var Y=d,K=zo(r),J=[];e:{var G=Hh.get(e);if(G!==void 0){var X=Es,ue=e;switch(e){case"keypress":if(ws(r)===0)break e;case"keydown":case"keyup":X=w1;break;case"focusin":ue="focus",X=Ho;break;case"focusout":ue="blur",X=Ho;break;case"beforeblur":case"afterblur":X=Ho;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":X=ph;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":X=u1;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":X=T1;break;case Vh:case Bh:case Lh:X=h1;break;case Uh:X=N1;break;case"scroll":case"scrollend":X=o1;break;case"wheel":X=D1;break;case"copy":case"cut":case"paste":X=p1;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":X=yh;break;case"toggle":case"beforetoggle":X=k1}var ve=(t&4)!==0,Ue=!ve&&(e==="scroll"||e==="scrollend"),B=ve?G!==null?G+"Capture":null:G;ve=[];for(var z=Y,H;z!==null;){var Z=z;if(H=Z.stateNode,Z=Z.tag,Z!==5&&Z!==26&&Z!==27||H===null||B===null||(Z=ei(z,B),Z!=null&&ve.push(Oi(z,Z,H))),Ue)break;z=z.return}0<ve.length&&(G=new X(G,ue,null,r,K),J.push({event:G,listeners:ve}))}}if((t&7)===0){e:{if(G=e==="mouseover"||e==="pointerover",X=e==="mouseout"||e==="pointerout",G&&r!==Oo&&(ue=r.relatedTarget||r.fromElement)&&($r(ue)||ue[Fr]))break e;if((X||G)&&(G=K.window===K?K:(G=K.ownerDocument)?G.defaultView||G.parentWindow:window,X?(ue=r.relatedTarget||r.toElement,X=Y,ue=ue?$r(ue):null,ue!==null&&(Ue=h(ue),ve=ue.tag,ue!==Ue||ve!==5&&ve!==27&&ve!==6)&&(ue=null)):(X=null,ue=Y),X!==ue)){if(ve=ph,Z="onMouseLeave",B="onMouseEnter",z="mouse",(e==="pointerout"||e==="pointerover")&&(ve=yh,Z="onPointerLeave",B="onPointerEnter",z="pointer"),Ue=X==null?G:Ia(X),H=ue==null?G:Ia(ue),G=new ve(Z,z+"leave",X,r,K),G.target=Ue,G.relatedTarget=H,Z=null,$r(K)===Y&&(ve=new ve(B,z+"enter",ue,r,K),ve.target=H,ve.relatedTarget=Ue,Z=ve),Ue=Z,X&&ue)t:{for(ve=MS,B=X,z=ue,H=0,Z=B;Z;Z=ve(Z))H++;Z=0;for(var ge=z;ge;ge=ve(ge))Z++;for(;0<H-Z;)B=ve(B),H--;for(;0<Z-H;)z=ve(z),Z--;for(;H--;){if(B===z||z!==null&&B===z.alternate){ve=B;break t}B=ve(B),z=ve(z)}ve=null}else ve=null;X!==null&&og(J,G,X,ve,!1),ue!==null&&Ue!==null&&og(J,Ue,ue,ve,!0)}}e:{if(G=Y?Ia(Y):window,X=G.nodeName&&G.nodeName.toLowerCase(),X==="select"||X==="input"&&G.type==="file")var ke=Th;else if(jh(G))if(Ch)ke=q1;else{ke=U1;var me=L1}else X=G.nodeName,!X||X.toLowerCase()!=="input"||G.type!=="checkbox"&&G.type!=="radio"?Y&&Ro(Y.elementType)&&(ke=Th):ke=H1;if(ke&&(ke=ke(e,Y))){Eh(J,ke,r,K);break e}me&&me(e,G,Y),e==="focusout"&&Y&&G.type==="number"&&Y.memoizedProps.value!=null&&ko(G,"number",G.value)}switch(me=Y?Ia(Y):window,e){case"focusin":(jh(me)||me.contentEditable==="true")&&(na=me,Fo=Y,oi=null);break;case"focusout":oi=Fo=na=null;break;case"mousedown":$o=!0;break;case"contextmenu":case"mouseup":case"dragend":$o=!1,zh(J,r,K);break;case"selectionchange":if(G1)break;case"keydown":case"keyup":zh(J,r,K)}var je;if(Yo)e:{switch(e){case"compositionstart":var Ae="onCompositionStart";break e;case"compositionend":Ae="onCompositionEnd";break e;case"compositionupdate":Ae="onCompositionUpdate";break e}Ae=void 0}else ta?Sh(e,r)&&(Ae="onCompositionEnd"):e==="keydown"&&r.keyCode===229&&(Ae="onCompositionStart");Ae&&(vh&&r.locale!=="ko"&&(ta||Ae!=="onCompositionStart"?Ae==="onCompositionEnd"&&ta&&(je=hh()):(Xn=K,Bo="value"in Xn?Xn.value:Xn.textContent,ta=!0)),me=ml(Y,Ae),0<me.length&&(Ae=new gh(Ae,e,null,r,K),J.push({event:Ae,listeners:me}),je?Ae.data=je:(je=wh(r),je!==null&&(Ae.data=je)))),(je=O1?z1(e,r):_1(e,r))&&(Ae=ml(Y,"onBeforeInput"),0<Ae.length&&(me=new gh("onBeforeInput","beforeinput",null,r,K),J.push({event:me,listeners:Ae}),me.data=je)),CS(J,e,Y,r,K)}sg(J,t)})}function Oi(e,t,r){return{instance:e,listener:t,currentTarget:r}}function ml(e,t){for(var r=t+"Capture",i=[];e!==null;){var c=e,d=c.stateNode;if(c=c.tag,c!==5&&c!==26&&c!==27||d===null||(c=ei(e,r),c!=null&&i.unshift(Oi(e,c,d)),c=ei(e,t),c!=null&&i.push(Oi(e,c,d))),e.tag===3)return i;e=e.return}return[]}function MS(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function og(e,t,r,i,c){for(var d=t._reactName,y=[];r!==null&&r!==i;){var w=r,A=w.alternate,Y=w.stateNode;if(w=w.tag,A!==null&&A===i)break;w!==5&&w!==26&&w!==27||Y===null||(A=Y,c?(Y=ei(r,d),Y!=null&&y.unshift(Oi(r,Y,A))):c||(Y=ei(r,d),Y!=null&&y.push(Oi(r,Y,A)))),r=r.return}y.length!==0&&e.push({event:t,listeners:y})}var kS=/\r\n?/g,RS=/\u0000|\uFFFD/g;function cg(e){return(typeof e=="string"?e:""+e).replace(kS,`
`).replace(RS,"")}function ug(e,t){return t=cg(t),cg(e)===t}function Le(e,t,r,i,c,d){switch(r){case"children":typeof i=="string"?t==="body"||t==="textarea"&&i===""||Wr(e,i):(typeof i=="number"||typeof i=="bigint")&&t!=="body"&&Wr(e,""+i);break;case"className":vs(e,"class",i);break;case"tabIndex":vs(e,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":vs(e,r,i);break;case"style":uh(e,i,d);break;case"data":if(t!=="object"){vs(e,"data",i);break}case"src":case"href":if(i===""&&(t!=="a"||r!=="href")){e.removeAttribute(r);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(r);break}i=bs(""+i),e.setAttribute(r,i);break;case"action":case"formAction":if(typeof i=="function"){e.setAttribute(r,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof d=="function"&&(r==="formAction"?(t!=="input"&&Le(e,t,"name",c.name,c,null),Le(e,t,"formEncType",c.formEncType,c,null),Le(e,t,"formMethod",c.formMethod,c,null),Le(e,t,"formTarget",c.formTarget,c,null)):(Le(e,t,"encType",c.encType,c,null),Le(e,t,"method",c.method,c,null),Le(e,t,"target",c.target,c,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(r);break}i=bs(""+i),e.setAttribute(r,i);break;case"onClick":i!=null&&(e.onclick=Sn);break;case"onScroll":i!=null&&Te("scroll",e);break;case"onScrollEnd":i!=null&&Te("scrollend",e);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(l(61));if(r=i.__html,r!=null){if(c.children!=null)throw Error(l(60));e.innerHTML=r}}break;case"multiple":e.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":e.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){e.removeAttribute("xlink:href");break}r=bs(""+i),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",r);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(r,""+i):e.removeAttribute(r);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(r,""):e.removeAttribute(r);break;case"capture":case"download":i===!0?e.setAttribute(r,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(r,i):e.removeAttribute(r);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?e.setAttribute(r,i):e.removeAttribute(r);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?e.removeAttribute(r):e.setAttribute(r,i);break;case"popover":Te("beforetoggle",e),Te("toggle",e),ys(e,"popover",i);break;case"xlinkActuate":bn(e,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":bn(e,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":bn(e,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":bn(e,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":bn(e,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":bn(e,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":bn(e,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":bn(e,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":bn(e,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":ys(e,"is",i);break;case"innerText":case"textContent":break;default:(!(2<r.length)||r[0]!=="o"&&r[0]!=="O"||r[1]!=="n"&&r[1]!=="N")&&(r=s1.get(r)||r,ys(e,r,i))}}function vu(e,t,r,i,c,d){switch(r){case"style":uh(e,i,d);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(l(61));if(r=i.__html,r!=null){if(c.children!=null)throw Error(l(60));e.innerHTML=r}}break;case"children":typeof i=="string"?Wr(e,i):(typeof i=="number"||typeof i=="bigint")&&Wr(e,""+i);break;case"onScroll":i!=null&&Te("scroll",e);break;case"onScrollEnd":i!=null&&Te("scrollend",e);break;case"onClick":i!=null&&(e.onclick=Sn);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!th.hasOwnProperty(r))e:{if(r[0]==="o"&&r[1]==="n"&&(c=r.endsWith("Capture"),t=r.slice(2,c?r.length-7:void 0),d=e[wt]||null,d=d!=null?d[r]:null,typeof d=="function"&&e.removeEventListener(t,d,c),typeof i=="function")){typeof d!="function"&&d!==null&&(r in e?e[r]=null:e.hasAttribute(r)&&e.removeAttribute(r)),e.addEventListener(t,i,c);break e}r in e?e[r]=i:i===!0?e.setAttribute(r,""):ys(e,r,i)}}}function ht(e,t,r){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Te("error",e),Te("load",e);var i=!1,c=!1,d;for(d in r)if(r.hasOwnProperty(d)){var y=r[d];if(y!=null)switch(d){case"src":i=!0;break;case"srcSet":c=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(l(137,t));default:Le(e,t,d,y,r,null)}}c&&Le(e,t,"srcSet",r.srcSet,r,null),i&&Le(e,t,"src",r.src,r,null);return;case"input":Te("invalid",e);var w=d=y=c=null,A=null,Y=null;for(i in r)if(r.hasOwnProperty(i)){var K=r[i];if(K!=null)switch(i){case"name":c=K;break;case"type":y=K;break;case"checked":A=K;break;case"defaultChecked":Y=K;break;case"value":d=K;break;case"defaultValue":w=K;break;case"children":case"dangerouslySetInnerHTML":if(K!=null)throw Error(l(137,t));break;default:Le(e,t,i,K,r,null)}}sh(e,d,w,A,Y,y,c,!1);return;case"select":Te("invalid",e),i=y=d=null;for(c in r)if(r.hasOwnProperty(c)&&(w=r[c],w!=null))switch(c){case"value":d=w;break;case"defaultValue":y=w;break;case"multiple":i=w;default:Le(e,t,c,w,r,null)}t=d,r=y,e.multiple=!!i,t!=null?Jr(e,!!i,t,!1):r!=null&&Jr(e,!!i,r,!0);return;case"textarea":Te("invalid",e),d=c=i=null;for(y in r)if(r.hasOwnProperty(y)&&(w=r[y],w!=null))switch(y){case"value":i=w;break;case"defaultValue":c=w;break;case"children":d=w;break;case"dangerouslySetInnerHTML":if(w!=null)throw Error(l(91));break;default:Le(e,t,y,w,r,null)}oh(e,i,c,d);return;case"option":for(A in r)if(r.hasOwnProperty(A)&&(i=r[A],i!=null))switch(A){case"selected":e.selected=i&&typeof i!="function"&&typeof i!="symbol";break;default:Le(e,t,A,i,r,null)}return;case"dialog":Te("beforetoggle",e),Te("toggle",e),Te("cancel",e),Te("close",e);break;case"iframe":case"object":Te("load",e);break;case"video":case"audio":for(i=0;i<Ri.length;i++)Te(Ri[i],e);break;case"image":Te("error",e),Te("load",e);break;case"details":Te("toggle",e);break;case"embed":case"source":case"link":Te("error",e),Te("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(Y in r)if(r.hasOwnProperty(Y)&&(i=r[Y],i!=null))switch(Y){case"children":case"dangerouslySetInnerHTML":throw Error(l(137,t));default:Le(e,t,Y,i,r,null)}return;default:if(Ro(t)){for(K in r)r.hasOwnProperty(K)&&(i=r[K],i!==void 0&&vu(e,t,K,i,r,void 0));return}}for(w in r)r.hasOwnProperty(w)&&(i=r[w],i!=null&&Le(e,t,w,i,r,null))}function OS(e,t,r,i){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var c=null,d=null,y=null,w=null,A=null,Y=null,K=null;for(X in r){var J=r[X];if(r.hasOwnProperty(X)&&J!=null)switch(X){case"checked":break;case"value":break;case"defaultValue":A=J;default:i.hasOwnProperty(X)||Le(e,t,X,null,i,J)}}for(var G in i){var X=i[G];if(J=r[G],i.hasOwnProperty(G)&&(X!=null||J!=null))switch(G){case"type":d=X;break;case"name":c=X;break;case"checked":Y=X;break;case"defaultChecked":K=X;break;case"value":y=X;break;case"defaultValue":w=X;break;case"children":case"dangerouslySetInnerHTML":if(X!=null)throw Error(l(137,t));break;default:X!==J&&Le(e,t,G,X,i,J)}}Mo(e,y,w,A,Y,K,d,c);return;case"select":X=y=w=G=null;for(d in r)if(A=r[d],r.hasOwnProperty(d)&&A!=null)switch(d){case"value":break;case"multiple":X=A;default:i.hasOwnProperty(d)||Le(e,t,d,null,i,A)}for(c in i)if(d=i[c],A=r[c],i.hasOwnProperty(c)&&(d!=null||A!=null))switch(c){case"value":G=d;break;case"defaultValue":w=d;break;case"multiple":y=d;default:d!==A&&Le(e,t,c,d,i,A)}t=w,r=y,i=X,G!=null?Jr(e,!!r,G,!1):!!i!=!!r&&(t!=null?Jr(e,!!r,t,!0):Jr(e,!!r,r?[]:"",!1));return;case"textarea":X=G=null;for(w in r)if(c=r[w],r.hasOwnProperty(w)&&c!=null&&!i.hasOwnProperty(w))switch(w){case"value":break;case"children":break;default:Le(e,t,w,null,i,c)}for(y in i)if(c=i[y],d=r[y],i.hasOwnProperty(y)&&(c!=null||d!=null))switch(y){case"value":G=c;break;case"defaultValue":X=c;break;case"children":break;case"dangerouslySetInnerHTML":if(c!=null)throw Error(l(91));break;default:c!==d&&Le(e,t,y,c,i,d)}lh(e,G,X);return;case"option":for(var ue in r)if(G=r[ue],r.hasOwnProperty(ue)&&G!=null&&!i.hasOwnProperty(ue))switch(ue){case"selected":e.selected=!1;break;default:Le(e,t,ue,null,i,G)}for(A in i)if(G=i[A],X=r[A],i.hasOwnProperty(A)&&G!==X&&(G!=null||X!=null))switch(A){case"selected":e.selected=G&&typeof G!="function"&&typeof G!="symbol";break;default:Le(e,t,A,G,i,X)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var ve in r)G=r[ve],r.hasOwnProperty(ve)&&G!=null&&!i.hasOwnProperty(ve)&&Le(e,t,ve,null,i,G);for(Y in i)if(G=i[Y],X=r[Y],i.hasOwnProperty(Y)&&G!==X&&(G!=null||X!=null))switch(Y){case"children":case"dangerouslySetInnerHTML":if(G!=null)throw Error(l(137,t));break;default:Le(e,t,Y,G,i,X)}return;default:if(Ro(t)){for(var Ue in r)G=r[Ue],r.hasOwnProperty(Ue)&&G!==void 0&&!i.hasOwnProperty(Ue)&&vu(e,t,Ue,void 0,i,G);for(K in i)G=i[K],X=r[K],!i.hasOwnProperty(K)||G===X||G===void 0&&X===void 0||vu(e,t,K,G,i,X);return}}for(var B in r)G=r[B],r.hasOwnProperty(B)&&G!=null&&!i.hasOwnProperty(B)&&Le(e,t,B,null,i,G);for(J in i)G=i[J],X=r[J],!i.hasOwnProperty(J)||G===X||G==null&&X==null||Le(e,t,J,G,i,X)}function dg(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function zS(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,r=performance.getEntriesByType("resource"),i=0;i<r.length;i++){var c=r[i],d=c.transferSize,y=c.initiatorType,w=c.duration;if(d&&w&&dg(y)){for(y=0,w=c.responseEnd,i+=1;i<r.length;i++){var A=r[i],Y=A.startTime;if(Y>w)break;var K=A.transferSize,J=A.initiatorType;K&&dg(J)&&(A=A.responseEnd,y+=K*(A<w?1:(w-Y)/(A-Y)))}if(--i,t+=8*(d+y)/(c.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var xu=null,bu=null;function pl(e){return e.nodeType===9?e:e.ownerDocument}function fg(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function hg(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function Su(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var wu=null;function _S(){var e=window.event;return e&&e.type==="popstate"?e===wu?!1:(wu=e,!0):(wu=null,!1)}var mg=typeof setTimeout=="function"?setTimeout:void 0,VS=typeof clearTimeout=="function"?clearTimeout:void 0,pg=typeof Promise=="function"?Promise:void 0,BS=typeof queueMicrotask=="function"?queueMicrotask:typeof pg<"u"?function(e){return pg.resolve(null).then(e).catch(LS)}:mg;function LS(e){setTimeout(function(){throw e})}function lr(e){return e==="head"}function gg(e,t){var r=t,i=0;do{var c=r.nextSibling;if(e.removeChild(r),c&&c.nodeType===8)if(r=c.data,r==="/$"||r==="/&"){if(i===0){e.removeChild(c),Da(t);return}i--}else if(r==="$"||r==="$?"||r==="$~"||r==="$!"||r==="&")i++;else if(r==="html")zi(e.ownerDocument.documentElement);else if(r==="head"){r=e.ownerDocument.head,zi(r);for(var d=r.firstChild;d;){var y=d.nextSibling,w=d.nodeName;d[Wa]||w==="SCRIPT"||w==="STYLE"||w==="LINK"&&d.rel.toLowerCase()==="stylesheet"||r.removeChild(d),d=y}}else r==="body"&&zi(e.ownerDocument.body);r=c}while(r);Da(t)}function yg(e,t){var r=e;e=0;do{var i=r.nextSibling;if(r.nodeType===1?t?(r._stashedDisplay=r.style.display,r.style.display="none"):(r.style.display=r._stashedDisplay||"",r.getAttribute("style")===""&&r.removeAttribute("style")):r.nodeType===3&&(t?(r._stashedText=r.nodeValue,r.nodeValue=""):r.nodeValue=r._stashedText||""),i&&i.nodeType===8)if(r=i.data,r==="/$"){if(e===0)break;e--}else r!=="$"&&r!=="$?"&&r!=="$~"&&r!=="$!"||e++;r=i}while(r)}function ju(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var r=t;switch(t=t.nextSibling,r.nodeName){case"HTML":case"HEAD":case"BODY":ju(r),Ao(r);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(r.rel.toLowerCase()==="stylesheet")continue}e.removeChild(r)}}function US(e,t,r,i){for(;e.nodeType===1;){var c=r;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!i&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(i){if(!e[Wa])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(d=e.getAttribute("rel"),d==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(d!==c.rel||e.getAttribute("href")!==(c.href==null||c.href===""?null:c.href)||e.getAttribute("crossorigin")!==(c.crossOrigin==null?null:c.crossOrigin)||e.getAttribute("title")!==(c.title==null?null:c.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(d=e.getAttribute("src"),(d!==(c.src==null?null:c.src)||e.getAttribute("type")!==(c.type==null?null:c.type)||e.getAttribute("crossorigin")!==(c.crossOrigin==null?null:c.crossOrigin))&&d&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var d=c.name==null?null:""+c.name;if(c.type==="hidden"&&e.getAttribute("name")===d)return e}else return e;if(e=Zt(e.nextSibling),e===null)break}return null}function HS(e,t,r){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!r||(e=Zt(e.nextSibling),e===null))return null;return e}function vg(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Zt(e.nextSibling),e===null))return null;return e}function Eu(e){return e.data==="$?"||e.data==="$~"}function Tu(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function qS(e,t){var r=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||r.readyState!=="loading")t();else{var i=function(){t(),r.removeEventListener("DOMContentLoaded",i)};r.addEventListener("DOMContentLoaded",i),e._reactRetry=i}}function Zt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var Cu=null;function xg(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="/$"||r==="/&"){if(t===0)return Zt(e.nextSibling);t--}else r!=="$"&&r!=="$!"&&r!=="$?"&&r!=="$~"&&r!=="&"||t++}e=e.nextSibling}return null}function bg(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="$"||r==="$!"||r==="$?"||r==="$~"||r==="&"){if(t===0)return e;t--}else r!=="/$"&&r!=="/&"||t++}e=e.previousSibling}return null}function Sg(e,t,r){switch(t=pl(r),e){case"html":if(e=t.documentElement,!e)throw Error(l(452));return e;case"head":if(e=t.head,!e)throw Error(l(453));return e;case"body":if(e=t.body,!e)throw Error(l(454));return e;default:throw Error(l(451))}}function zi(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Ao(e)}var Qt=new Map,wg=new Set;function gl(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Bn=F.d;F.d={f:YS,r:GS,D:XS,C:PS,L:FS,m:$S,X:ZS,S:KS,M:QS};function YS(){var e=Bn.f(),t=ll();return e||t}function GS(e){var t=Kr(e);t!==null&&t.tag===5&&t.type==="form"?Um(t):Bn.r(e)}var Ca=typeof document>"u"?null:document;function jg(e,t,r){var i=Ca;if(i&&typeof t=="string"&&t){var c=Yt(t);c='link[rel="'+e+'"][href="'+c+'"]',typeof r=="string"&&(c+='[crossorigin="'+r+'"]'),wg.has(c)||(wg.add(c),e={rel:e,crossOrigin:r,href:t},i.querySelector(c)===null&&(t=i.createElement("link"),ht(t,"link",e),st(t),i.head.appendChild(t)))}}function XS(e){Bn.D(e),jg("dns-prefetch",e,null)}function PS(e,t){Bn.C(e,t),jg("preconnect",e,t)}function FS(e,t,r){Bn.L(e,t,r);var i=Ca;if(i&&e&&t){var c='link[rel="preload"][as="'+Yt(t)+'"]';t==="image"&&r&&r.imageSrcSet?(c+='[imagesrcset="'+Yt(r.imageSrcSet)+'"]',typeof r.imageSizes=="string"&&(c+='[imagesizes="'+Yt(r.imageSizes)+'"]')):c+='[href="'+Yt(e)+'"]';var d=c;switch(t){case"style":d=Na(e);break;case"script":d=Aa(e)}Qt.has(d)||(e=x({rel:"preload",href:t==="image"&&r&&r.imageSrcSet?void 0:e,as:t},r),Qt.set(d,e),i.querySelector(c)!==null||t==="style"&&i.querySelector(_i(d))||t==="script"&&i.querySelector(Vi(d))||(t=i.createElement("link"),ht(t,"link",e),st(t),i.head.appendChild(t)))}}function $S(e,t){Bn.m(e,t);var r=Ca;if(r&&e){var i=t&&typeof t.as=="string"?t.as:"script",c='link[rel="modulepreload"][as="'+Yt(i)+'"][href="'+Yt(e)+'"]',d=c;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":d=Aa(e)}if(!Qt.has(d)&&(e=x({rel:"modulepreload",href:e},t),Qt.set(d,e),r.querySelector(c)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(r.querySelector(Vi(d)))return}i=r.createElement("link"),ht(i,"link",e),st(i),r.head.appendChild(i)}}}function KS(e,t,r){Bn.S(e,t,r);var i=Ca;if(i&&e){var c=Zr(i).hoistableStyles,d=Na(e);t=t||"default";var y=c.get(d);if(!y){var w={loading:0,preload:null};if(y=i.querySelector(_i(d)))w.loading=5;else{e=x({rel:"stylesheet",href:e,"data-precedence":t},r),(r=Qt.get(d))&&Nu(e,r);var A=y=i.createElement("link");st(A),ht(A,"link",e),A._p=new Promise(function(Y,K){A.onload=Y,A.onerror=K}),A.addEventListener("load",function(){w.loading|=1}),A.addEventListener("error",function(){w.loading|=2}),w.loading|=4,yl(y,t,i)}y={type:"stylesheet",instance:y,count:1,state:w},c.set(d,y)}}}function ZS(e,t){Bn.X(e,t);var r=Ca;if(r&&e){var i=Zr(r).hoistableScripts,c=Aa(e),d=i.get(c);d||(d=r.querySelector(Vi(c)),d||(e=x({src:e,async:!0},t),(t=Qt.get(c))&&Au(e,t),d=r.createElement("script"),st(d),ht(d,"link",e),r.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},i.set(c,d))}}function QS(e,t){Bn.M(e,t);var r=Ca;if(r&&e){var i=Zr(r).hoistableScripts,c=Aa(e),d=i.get(c);d||(d=r.querySelector(Vi(c)),d||(e=x({src:e,async:!0,type:"module"},t),(t=Qt.get(c))&&Au(e,t),d=r.createElement("script"),st(d),ht(d,"link",e),r.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},i.set(c,d))}}function Eg(e,t,r,i){var c=(c=ye.current)?gl(c):null;if(!c)throw Error(l(446));switch(e){case"meta":case"title":return null;case"style":return typeof r.precedence=="string"&&typeof r.href=="string"?(t=Na(r.href),r=Zr(c).hoistableStyles,i=r.get(t),i||(i={type:"style",instance:null,count:0,state:null},r.set(t,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(r.rel==="stylesheet"&&typeof r.href=="string"&&typeof r.precedence=="string"){e=Na(r.href);var d=Zr(c).hoistableStyles,y=d.get(e);if(y||(c=c.ownerDocument||c,y={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},d.set(e,y),(d=c.querySelector(_i(e)))&&!d._p&&(y.instance=d,y.state.loading=5),Qt.has(e)||(r={rel:"preload",as:"style",href:r.href,crossOrigin:r.crossOrigin,integrity:r.integrity,media:r.media,hrefLang:r.hrefLang,referrerPolicy:r.referrerPolicy},Qt.set(e,r),d||JS(c,e,r,y.state))),t&&i===null)throw Error(l(528,""));return y}if(t&&i!==null)throw Error(l(529,""));return null;case"script":return t=r.async,r=r.src,typeof r=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Aa(r),r=Zr(c).hoistableScripts,i=r.get(t),i||(i={type:"script",instance:null,count:0,state:null},r.set(t,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(l(444,e))}}function Na(e){return'href="'+Yt(e)+'"'}function _i(e){return'link[rel="stylesheet"]['+e+"]"}function Tg(e){return x({},e,{"data-precedence":e.precedence,precedence:null})}function JS(e,t,r,i){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?i.loading=1:(t=e.createElement("link"),i.preload=t,t.addEventListener("load",function(){return i.loading|=1}),t.addEventListener("error",function(){return i.loading|=2}),ht(t,"link",r),st(t),e.head.appendChild(t))}function Aa(e){return'[src="'+Yt(e)+'"]'}function Vi(e){return"script[async]"+e}function Cg(e,t,r){if(t.count++,t.instance===null)switch(t.type){case"style":var i=e.querySelector('style[data-href~="'+Yt(r.href)+'"]');if(i)return t.instance=i,st(i),i;var c=x({},r,{"data-href":r.href,"data-precedence":r.precedence,href:null,precedence:null});return i=(e.ownerDocument||e).createElement("style"),st(i),ht(i,"style",c),yl(i,r.precedence,e),t.instance=i;case"stylesheet":c=Na(r.href);var d=e.querySelector(_i(c));if(d)return t.state.loading|=4,t.instance=d,st(d),d;i=Tg(r),(c=Qt.get(c))&&Nu(i,c),d=(e.ownerDocument||e).createElement("link"),st(d);var y=d;return y._p=new Promise(function(w,A){y.onload=w,y.onerror=A}),ht(d,"link",i),t.state.loading|=4,yl(d,r.precedence,e),t.instance=d;case"script":return d=Aa(r.src),(c=e.querySelector(Vi(d)))?(t.instance=c,st(c),c):(i=r,(c=Qt.get(d))&&(i=x({},r),Au(i,c)),e=e.ownerDocument||e,c=e.createElement("script"),st(c),ht(c,"link",i),e.head.appendChild(c),t.instance=c);case"void":return null;default:throw Error(l(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(i=t.instance,t.state.loading|=4,yl(i,r.precedence,e));return t.instance}function yl(e,t,r){for(var i=r.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),c=i.length?i[i.length-1]:null,d=c,y=0;y<i.length;y++){var w=i[y];if(w.dataset.precedence===t)d=w;else if(d!==c)break}d?d.parentNode.insertBefore(e,d.nextSibling):(t=r.nodeType===9?r.head:r,t.insertBefore(e,t.firstChild))}function Nu(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function Au(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var vl=null;function Ng(e,t,r){if(vl===null){var i=new Map,c=vl=new Map;c.set(r,i)}else c=vl,i=c.get(r),i||(i=new Map,c.set(r,i));if(i.has(e))return i;for(i.set(e,null),r=r.getElementsByTagName(e),c=0;c<r.length;c++){var d=r[c];if(!(d[Wa]||d[ct]||e==="link"&&d.getAttribute("rel")==="stylesheet")&&d.namespaceURI!=="http://www.w3.org/2000/svg"){var y=d.getAttribute(t)||"";y=e+y;var w=i.get(y);w?w.push(d):i.set(y,[d])}}return i}function Ag(e,t,r){e=e.ownerDocument||e,e.head.insertBefore(r,t==="title"?e.querySelector("head > title"):null)}function WS(e,t,r){if(r===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function Dg(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function IS(e,t,r,i){if(r.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&(r.state.loading&4)===0){if(r.instance===null){var c=Na(i.href),d=t.querySelector(_i(c));if(d){t=d._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=xl.bind(e),t.then(e,e)),r.state.loading|=4,r.instance=d,st(d);return}d=t.ownerDocument||t,i=Tg(i),(c=Qt.get(c))&&Nu(i,c),d=d.createElement("link"),st(d);var y=d;y._p=new Promise(function(w,A){y.onload=w,y.onerror=A}),ht(d,"link",i),r.instance=d}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(r,t),(t=r.state.preload)&&(r.state.loading&3)===0&&(e.count++,r=xl.bind(e),t.addEventListener("load",r),t.addEventListener("error",r))}}var Du=0;function e2(e,t){return e.stylesheets&&e.count===0&&Sl(e,e.stylesheets),0<e.count||0<e.imgCount?function(r){var i=setTimeout(function(){if(e.stylesheets&&Sl(e,e.stylesheets),e.unsuspend){var d=e.unsuspend;e.unsuspend=null,d()}},6e4+t);0<e.imgBytes&&Du===0&&(Du=62500*zS());var c=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Sl(e,e.stylesheets),e.unsuspend)){var d=e.unsuspend;e.unsuspend=null,d()}},(e.imgBytes>Du?50:800)+t);return e.unsuspend=r,function(){e.unsuspend=null,clearTimeout(i),clearTimeout(c)}}:null}function xl(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Sl(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var bl=null;function Sl(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,bl=new Map,t.forEach(t2,e),bl=null,xl.call(e))}function t2(e,t){if(!(t.state.loading&4)){var r=bl.get(e);if(r)var i=r.get(null);else{r=new Map,bl.set(e,r);for(var c=e.querySelectorAll("link[data-precedence],style[data-precedence]"),d=0;d<c.length;d++){var y=c[d];(y.nodeName==="LINK"||y.getAttribute("media")!=="not all")&&(r.set(y.dataset.precedence,y),i=y)}i&&r.set(null,i)}c=t.instance,y=c.getAttribute("data-precedence"),d=r.get(y)||i,d===i&&r.set(null,c),r.set(y,c),this.count++,i=xl.bind(this),c.addEventListener("load",i),c.addEventListener("error",i),d?d.parentNode.insertBefore(c,d.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(c,e.firstChild)),t.state.loading|=4}}var Bi={$$typeof:_,Provider:null,Consumer:null,_currentValue:ae,_currentValue2:ae,_threadCount:0};function n2(e,t,r,i,c,d,y,w,A){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Eo(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Eo(0),this.hiddenUpdates=Eo(null),this.identifierPrefix=i,this.onUncaughtError=c,this.onCaughtError=d,this.onRecoverableError=y,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=A,this.incompleteTransitions=new Map}function Mg(e,t,r,i,c,d,y,w,A,Y,K,J){return e=new n2(e,t,r,y,A,Y,K,J,w),t=1,d===!0&&(t|=24),d=Ot(3,null,null,t),e.current=d,d.stateNode=e,t=oc(),t.refCount++,e.pooledCache=t,t.refCount++,d.memoizedState={element:i,isDehydrated:r,cache:t},fc(d),e}function kg(e){return e?(e=ia,e):ia}function Rg(e,t,r,i,c,d){c=kg(c),i.context===null?i.context=c:i.pendingContext=c,i=Qn(t),i.payload={element:r},d=d===void 0?null:d,d!==null&&(i.callback=d),r=Jn(e,i,t),r!==null&&(At(r,e,t),pi(r,e,t))}function Og(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var r=e.retryLane;e.retryLane=r!==0&&r<t?r:t}}function Mu(e,t){Og(e,t),(e=e.alternate)&&Og(e,t)}function zg(e){if(e.tag===13||e.tag===31){var t=Tr(e,67108864);t!==null&&At(t,e,67108864),Mu(e,67108864)}}function _g(e){if(e.tag===13||e.tag===31){var t=Lt();t=To(t);var r=Tr(e,t);r!==null&&At(r,e,t),Mu(e,t)}}var wl=!0;function r2(e,t,r,i){var c=L.T;L.T=null;var d=F.p;try{F.p=2,ku(e,t,r,i)}finally{F.p=d,L.T=c}}function a2(e,t,r,i){var c=L.T;L.T=null;var d=F.p;try{F.p=8,ku(e,t,r,i)}finally{F.p=d,L.T=c}}function ku(e,t,r,i){if(wl){var c=Ru(i);if(c===null)yu(e,t,i,jl,r),Bg(e,i);else if(s2(c,e,t,r,i))i.stopPropagation();else if(Bg(e,i),t&4&&-1<i2.indexOf(e)){for(;c!==null;){var d=Kr(c);if(d!==null)switch(d.tag){case 3:if(d=d.stateNode,d.current.memoizedState.isDehydrated){var y=br(d.pendingLanes);if(y!==0){var w=d;for(w.pendingLanes|=2,w.entangledLanes|=2;y;){var A=1<<31-kt(y);w.entanglements[1]|=A,y&=~A}hn(d),(Oe&6)===0&&(il=Dt()+500,ki(0))}}break;case 31:case 13:w=Tr(d,2),w!==null&&At(w,d,2),ll(),Mu(d,2)}if(d=Ru(i),d===null&&yu(e,t,i,jl,r),d===c)break;c=d}c!==null&&i.stopPropagation()}else yu(e,t,i,null,r)}}function Ru(e){return e=zo(e),Ou(e)}var jl=null;function Ou(e){if(jl=null,e=$r(e),e!==null){var t=h(e);if(t===null)e=null;else{var r=t.tag;if(r===13){if(e=f(t),e!==null)return e;e=null}else if(r===31){if(e=m(t),e!==null)return e;e=null}else if(r===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return jl=e,null}function Vg(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Xb()){case Xf:return 2;case Pf:return 8;case fs:case Pb:return 32;case Ff:return 268435456;default:return 32}default:return 32}}var zu=!1,or=null,cr=null,ur=null,Li=new Map,Ui=new Map,dr=[],i2="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Bg(e,t){switch(e){case"focusin":case"focusout":or=null;break;case"dragenter":case"dragleave":cr=null;break;case"mouseover":case"mouseout":ur=null;break;case"pointerover":case"pointerout":Li.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ui.delete(t.pointerId)}}function Hi(e,t,r,i,c,d){return e===null||e.nativeEvent!==d?(e={blockedOn:t,domEventName:r,eventSystemFlags:i,nativeEvent:d,targetContainers:[c]},t!==null&&(t=Kr(t),t!==null&&zg(t)),e):(e.eventSystemFlags|=i,t=e.targetContainers,c!==null&&t.indexOf(c)===-1&&t.push(c),e)}function s2(e,t,r,i,c){switch(t){case"focusin":return or=Hi(or,e,t,r,i,c),!0;case"dragenter":return cr=Hi(cr,e,t,r,i,c),!0;case"mouseover":return ur=Hi(ur,e,t,r,i,c),!0;case"pointerover":var d=c.pointerId;return Li.set(d,Hi(Li.get(d)||null,e,t,r,i,c)),!0;case"gotpointercapture":return d=c.pointerId,Ui.set(d,Hi(Ui.get(d)||null,e,t,r,i,c)),!0}return!1}function Lg(e){var t=$r(e.target);if(t!==null){var r=h(t);if(r!==null){if(t=r.tag,t===13){if(t=f(r),t!==null){e.blockedOn=t,Wf(e.priority,function(){_g(r)});return}}else if(t===31){if(t=m(r),t!==null){e.blockedOn=t,Wf(e.priority,function(){_g(r)});return}}else if(t===3&&r.stateNode.current.memoizedState.isDehydrated){e.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}e.blockedOn=null}function El(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var r=Ru(e.nativeEvent);if(r===null){r=e.nativeEvent;var i=new r.constructor(r.type,r);Oo=i,r.target.dispatchEvent(i),Oo=null}else return t=Kr(r),t!==null&&zg(t),e.blockedOn=r,!1;t.shift()}return!0}function Ug(e,t,r){El(e)&&r.delete(t)}function l2(){zu=!1,or!==null&&El(or)&&(or=null),cr!==null&&El(cr)&&(cr=null),ur!==null&&El(ur)&&(ur=null),Li.forEach(Ug),Ui.forEach(Ug)}function Tl(e,t){e.blockedOn===t&&(e.blockedOn=null,zu||(zu=!0,n.unstable_scheduleCallback(n.unstable_NormalPriority,l2)))}var Cl=null;function Hg(e){Cl!==e&&(Cl=e,n.unstable_scheduleCallback(n.unstable_NormalPriority,function(){Cl===e&&(Cl=null);for(var t=0;t<e.length;t+=3){var r=e[t],i=e[t+1],c=e[t+2];if(typeof i!="function"){if(Ou(i||r)===null)continue;break}var d=Kr(r);d!==null&&(e.splice(t,3),t-=3,Rc(d,{pending:!0,data:c,method:r.method,action:i},i,c))}}))}function Da(e){function t(A){return Tl(A,e)}or!==null&&Tl(or,e),cr!==null&&Tl(cr,e),ur!==null&&Tl(ur,e),Li.forEach(t),Ui.forEach(t);for(var r=0;r<dr.length;r++){var i=dr[r];i.blockedOn===e&&(i.blockedOn=null)}for(;0<dr.length&&(r=dr[0],r.blockedOn===null);)Lg(r),r.blockedOn===null&&dr.shift();if(r=(e.ownerDocument||e).$$reactFormReplay,r!=null)for(i=0;i<r.length;i+=3){var c=r[i],d=r[i+1],y=c[wt]||null;if(typeof d=="function")y||Hg(r);else if(y){var w=null;if(d&&d.hasAttribute("formAction")){if(c=d,y=d[wt]||null)w=y.formAction;else if(Ou(c)!==null)continue}else w=y.action;typeof w=="function"?r[i+1]=w:(r.splice(i,3),i-=3),Hg(r)}}}function qg(){function e(d){d.canIntercept&&d.info==="react-transition"&&d.intercept({handler:function(){return new Promise(function(y){return c=y})},focusReset:"manual",scroll:"manual"})}function t(){c!==null&&(c(),c=null),i||setTimeout(r,20)}function r(){if(!i&&!navigation.transition){var d=navigation.currentEntry;d&&d.url!=null&&navigation.navigate(d.url,{state:d.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,c=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(r,100),function(){i=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),c!==null&&(c(),c=null)}}}function _u(e){this._internalRoot=e}Nl.prototype.render=_u.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(l(409));var r=t.current,i=Lt();Rg(r,i,e,t,null,null)},Nl.prototype.unmount=_u.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Rg(e.current,2,null,e,null,null),ll(),t[Fr]=null}};function Nl(e){this._internalRoot=e}Nl.prototype.unstable_scheduleHydration=function(e){if(e){var t=Jf();e={blockedOn:null,target:e,priority:t};for(var r=0;r<dr.length&&t!==0&&t<dr[r].priority;r++);dr.splice(r,0,e),r===0&&Lg(e)}};var Yg=a.version;if(Yg!=="19.2.8")throw Error(l(527,Yg,"19.2.8"));F.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(l(188)):(e=Object.keys(e).join(","),Error(l(268,e)));return e=p(t),e=e!==null?v(e):null,e=e===null?null:e.stateNode,e};var o2={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:L,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Al=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Al.isDisabled&&Al.supportsFiber)try{Za=Al.inject(o2),Mt=Al}catch{}}return Yi.createRoot=function(e,t){if(!u(e))throw Error(l(299));var r=!1,i="",c=Zm,d=Qm,y=Jm;return t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onUncaughtError!==void 0&&(c=t.onUncaughtError),t.onCaughtError!==void 0&&(d=t.onCaughtError),t.onRecoverableError!==void 0&&(y=t.onRecoverableError)),t=Mg(e,1,!1,null,null,r,i,null,c,d,y,qg),e[Fr]=t.current,gu(e),new _u(t)},Yi.hydrateRoot=function(e,t,r){if(!u(e))throw Error(l(299));var i=!1,c="",d=Zm,y=Qm,w=Jm,A=null;return r!=null&&(r.unstable_strictMode===!0&&(i=!0),r.identifierPrefix!==void 0&&(c=r.identifierPrefix),r.onUncaughtError!==void 0&&(d=r.onUncaughtError),r.onCaughtError!==void 0&&(y=r.onCaughtError),r.onRecoverableError!==void 0&&(w=r.onRecoverableError),r.formState!==void 0&&(A=r.formState)),t=Mg(e,1,!0,t,r??null,i,c,A,d,y,w,qg),t.context=kg(null),r=t.current,i=Lt(),i=To(i),c=Qn(i),c.callback=null,Jn(r,c,i),r=i,t.current.lanes=r,Ja(t,r),hn(t),e[Fr]=t.current,gu(e),new Nl(t)},Yi.version="19.2.8",Yi}var Wg;function v2(){if(Wg)return Lu.exports;Wg=1;function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(a){console.error(a)}}return n(),Lu.exports=y2(),Lu.exports}var e0=v2();const x2=Jv(e0),Id=S.createContext({});function ef(n){const a=S.useRef(null);return a.current===null&&(a.current=n()),a.current}const b2=typeof window<"u",tf=b2?S.useLayoutEffect:S.useEffect,ho=S.createContext(null);function nf(n,a){n.indexOf(a)===-1&&n.push(a)}function Wl(n,a){const s=n.indexOf(a);s>-1&&n.splice(s,1)}const xn=(n,a,s)=>s>a?a:s<n?n:s;let mo=()=>{};const gr={},t0=n=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n),n0=n=>typeof n=="object"&&n!==null,r0=n=>/^0[^.\s]+$/u.test(n);function a0(n){let a;return()=>(a===void 0&&(a=n()),a)}const It=n=>n,ss=(...n)=>n.reduce((a,s)=>l=>s(a(l))),Wi=(n,a,s)=>{const l=a-n;return l?(s-n)/l:1};class rf{constructor(){this.subscriptions=[]}add(a){return nf(this.subscriptions,a),()=>Wl(this.subscriptions,a)}notify(a,s,l){const u=this.subscriptions.length;if(u)if(u===1)this.subscriptions[0](a,s,l);else for(let h=0;h<u;h++){const f=this.subscriptions[h];f&&f(a,s,l)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}}const Ht=n=>n*1e3,Wt=n=>n/1e3,i0=(n,a)=>a?n*(1e3/a):0,s0=(n,a,s)=>(((1-3*s+3*a)*n+(3*s-6*a))*n+3*a)*n,S2=1e-7,w2=12;function j2(n,a,s,l,u){let h,f,m=0;do f=a+(s-a)/2,h=s0(f,l,u)-n,h>0?s=f:a=f;while(Math.abs(h)>S2&&++m<w2);return f}function ls(n,a,s,l){if(n===a&&s===l)return It;const u=h=>j2(h,0,1,n,s);return h=>h===0||h===1?h:s0(u(h),a,l)}const l0=n=>a=>a<=.5?n(2*a)/2:(2-n(2*(1-a)))/2,o0=n=>a=>1-n(1-a),c0=ls(.33,1.53,.69,.99),af=o0(c0),u0=l0(af),d0=n=>n>=1?1:(n*=2)<1?.5*af(n):.5*(2-Math.pow(2,-10*(n-1))),sf=n=>1-Math.sin(Math.acos(n)),f0=o0(sf),h0=l0(sf),E2=ls(.42,0,1,1),T2=ls(0,0,.58,1),m0=ls(.42,0,.58,1),C2=n=>Array.isArray(n)&&typeof n[0]!="number",p0=n=>Array.isArray(n)&&typeof n[0]=="number",N2={linear:It,easeIn:E2,easeInOut:m0,easeOut:T2,circIn:sf,circInOut:h0,circOut:f0,backIn:af,backInOut:u0,backOut:c0,anticipate:d0},A2=n=>typeof n=="string",Ig=n=>{if(p0(n)){mo(n.length===4);const[a,s,l,u]=n;return ls(a,s,l,u)}else if(A2(n))return N2[n];return n},Dl=["setup","read","resolveKeyframes","preUpdate","update","preRender","render","postRender"];function D2(n){let a=new Set,s=new Set,l=!1,u=!1;const h=new WeakSet;let f={delta:0,timestamp:0,isProcessing:!1};function m(p){h.has(p)&&(g.schedule(p),n()),p(f)}const g={schedule:(p,v=!1,x=!1)=>{const j=x&&l?a:s;return v&&h.add(p),j.add(p),p},cancel:p=>{s.delete(p),h.delete(p)},process:p=>{if(f=p,l){u=!0;return}l=!0;const v=a;a=s,s=v,a.forEach(m),a.clear(),l=!1,u&&(u=!1,g.process(p))}};return g}const M2=40;function g0(n,a){let s=!1,l=!0;const u={delta:0,timestamp:0,isProcessing:!1},h=()=>s=!0,f=Dl.reduce((_,O)=>(_[O]=D2(h),_),{}),{setup:m,read:g,resolveKeyframes:p,preUpdate:v,update:x,preRender:b,render:j,postRender:E}=f,T=()=>{const _=gr.useManualTiming,O=_?u.timestamp:performance.now();s=!1,_||(u.delta=l?1e3/60:Math.max(Math.min(O-u.timestamp,M2),1)),u.timestamp=O,u.isProcessing=!0,m.process(u),g.process(u),p.process(u),v.process(u),x.process(u),b.process(u),j.process(u),E.process(u),u.isProcessing=!1,s&&a&&(l=!1,n(T))},C=()=>{s=!0,l=!0,u.isProcessing||n(T)};return{schedule:Dl.reduce((_,O)=>{const U=f[O];return _[O]=(P,M=!1,D=!1)=>(s||C(),U.schedule(P,M,D)),_},{}),cancel:_=>{for(let O=0;O<Dl.length;O++)f[Dl[O]].cancel(_)},state:u,steps:f}}const{schedule:Ye,cancel:yr,state:mt,steps:Yu}=g0(typeof requestAnimationFrame<"u"?requestAnimationFrame:It,!0);let ql;function k2(){ql=void 0}const xt={now:()=>(ql===void 0&&xt.set(mt.isProcessing||gr.useManualTiming?mt.timestamp:performance.now()),ql),set:n=>{ql=n,queueMicrotask(k2)}},y0=n=>a=>typeof a=="string"&&a.startsWith(n),v0=y0("--"),R2=y0("var(--"),lf=n=>R2(n)?O2.test(n.split("/*")[0].trim()):!1,O2=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;function ey(n){return typeof n!="string"?!1:n.split("/*")[0].includes("var(--")}const Ga={test:n=>typeof n=="number",parse:parseFloat,transform:n=>n},Ii={...Ga,transform:n=>xn(0,1,n)},Ml={...Ga,default:1},$i=n=>Math.round(n*1e5)/1e5,of=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function z2(n){return n==null}const _2=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,cf=(n,a)=>s=>!!(typeof s=="string"&&_2.test(s)&&s.startsWith(n)||a&&!z2(s)&&Object.prototype.hasOwnProperty.call(s,a)),x0=(n,a,s)=>l=>{if(typeof l!="string")return l;const[u,h,f,m]=l.match(of);return{[n]:parseFloat(u),[a]:parseFloat(h),[s]:parseFloat(f),alpha:m!==void 0?parseFloat(m):1}},V2=n=>xn(0,255,n),Gu={...Ga,transform:n=>Math.round(V2(n))},Hr={test:cf("rgb","red"),parse:x0("red","green","blue"),transform:({red:n,green:a,blue:s,alpha:l=1})=>"rgba("+Gu.transform(n)+", "+Gu.transform(a)+", "+Gu.transform(s)+", "+$i(Ii.transform(l))+")"};function B2(n){let a="",s="",l="",u="";return n.length>5?(a=n.substring(1,3),s=n.substring(3,5),l=n.substring(5,7),u=n.substring(7,9)):(a=n.substring(1,2),s=n.substring(2,3),l=n.substring(3,4),u=n.substring(4,5),a+=a,s+=s,l+=l,u+=u),{red:parseInt(a,16),green:parseInt(s,16),blue:parseInt(l,16),alpha:u?parseInt(u,16)/255:1}}const md={test:cf("#"),parse:B2,transform:Hr.transform},os=n=>({test:a=>typeof a=="string"&&a.endsWith(n)&&a.split(" ").length===1,parse:parseFloat,transform:a=>`${a}${n}`}),Ln=os("deg"),vn=os("%"),fe=os("px"),L2=os("vh"),U2=os("vw"),ty={...vn,parse:n=>vn.parse(n)/100,transform:n=>vn.transform(n*100)},_a={test:cf("hsl","hue"),parse:x0("hue","saturation","lightness"),transform:({hue:n,saturation:a,lightness:s,alpha:l=1})=>"hsla("+Math.round(n)+", "+vn.transform($i(a))+", "+vn.transform($i(s))+", "+$i(Ii.transform(l))+")"},rt={test:n=>Hr.test(n)||md.test(n)||_a.test(n),parse:n=>Hr.test(n)?Hr.parse(n):_a.test(n)?_a.parse(n):md.parse(n),transform:n=>typeof n=="string"?n:n.hasOwnProperty("red")?Hr.transform(n):_a.transform(n),getAnimatableNone:n=>{const a=rt.parse(n);return a.alpha=0,rt.transform(a)}},H2=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;function q2(n){var a,s;return isNaN(n)&&typeof n=="string"&&(((a=n.match(of))==null?void 0:a.length)||0)+(((s=n.match(H2))==null?void 0:s.length)||0)>0}const b0="number",S0="color",Y2="var",G2="var(",ny="${}",X2=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function Ha(n){const a=n.toString(),s=[],l={color:[],number:[],var:[]},u=[];let h=0;const m=a.replace(X2,g=>(rt.test(g)?(l.color.push(h),u.push(S0),s.push(rt.parse(g))):g.startsWith(G2)?(l.var.push(h),u.push(Y2),s.push(g)):(l.number.push(h),u.push(b0),s.push(parseFloat(g))),++h,ny)).split(ny);return{values:s,split:m,indexes:l,types:u}}function P2(n){return Ha(n).values}function w0({split:n,types:a}){const s=n.length;return l=>{let u="";for(let h=0;h<s;h++)if(u+=n[h],l[h]!==void 0){const f=a[h];f===b0?u+=$i(l[h]):f===S0?u+=rt.transform(l[h]):u+=l[h]}return u}}function F2(n){return w0(Ha(n))}const $2=n=>typeof n=="number"?0:rt.test(n)?rt.getAnimatableNone(n):n,K2=(n,a)=>typeof n=="number"?a!=null&&a.trim().endsWith("/")?n:0:$2(n);function Z2(n){const a=Ha(n);return w0(a)(a.values.map((l,u)=>K2(l,a.split[u])))}const ln={test:q2,parse:P2,createTransformer:F2,getAnimatableNone:Z2};function Xu(n,a,s){return s<0&&(s+=1),s>1&&(s-=1),s<1/6?n+(a-n)*6*s:s<1/2?a:s<2/3?n+(a-n)*(2/3-s)*6:n}function Q2({hue:n,saturation:a,lightness:s,alpha:l}){n/=360,a/=100,s/=100;let u=0,h=0,f=0;if(!a)u=h=f=s;else{const m=s<.5?s*(1+a):s+a-s*a,g=2*s-m;u=Xu(g,m,n+1/3),h=Xu(g,m,n),f=Xu(g,m,n-1/3)}return{red:Math.round(u*255),green:Math.round(h*255),blue:Math.round(f*255),alpha:l}}function Il(n,a){return s=>s>0?a:n}const qe=(n,a,s)=>n+(a-n)*s,Pu=(n,a,s)=>{const l=n*n,u=s*(a*a-l)+l;return u<0?0:Math.sqrt(u)},J2=[md,Hr,_a],W2=n=>J2.find(a=>a.test(n));function ry(n){const a=W2(n);if(!a)return!1;let s=a.parse(n);return a===_a&&(s=Q2(s)),s}const ay=(n,a)=>{const s=ry(n),l=ry(a);if(!s||!l)return Il(n,a);const u={...s};return h=>(u.red=Pu(s.red,l.red,h),u.green=Pu(s.green,l.green,h),u.blue=Pu(s.blue,l.blue,h),u.alpha=qe(s.alpha,l.alpha,h),Hr.transform(u))},pd=new Set(["none","hidden"]);function I2(n,a){return pd.has(n)?s=>s<=0?n:a:s=>s>=1?a:n}function ew(n,a){return s=>qe(n,a,s)}function uf(n){return typeof n=="number"?ew:typeof n=="string"?lf(n)?Il:rt.test(n)?ay:rw:Array.isArray(n)?j0:typeof n=="object"?rt.test(n)?ay:tw:Il}function j0(n,a){const s=[...n],l=s.length,u=n.map((h,f)=>uf(h)(h,a[f]));return h=>{for(let f=0;f<l;f++)s[f]=u[f](h);return s}}function tw(n,a){const s={...n,...a},l={};for(const u in s)n[u]!==void 0&&a[u]!==void 0&&(l[u]=uf(n[u])(n[u],a[u]));return u=>{for(const h in l)s[h]=l[h](u);return s}}function nw(n,a){const s=[],l={color:0,var:0,number:0};for(let u=0;u<a.values.length;u++){const h=a.types[u],f=n.indexes[h][l[h]],m=n.values[f]??0;s[u]=m,l[h]++}return s}const rw=(n,a)=>{const s=ln.createTransformer(a),l=Ha(n),u=Ha(a);return l.indexes.var.length===u.indexes.var.length&&l.indexes.color.length===u.indexes.color.length&&l.indexes.number.length>=u.indexes.number.length?pd.has(n)&&!u.values.length||pd.has(a)&&!l.values.length?I2(n,a):ss(j0(nw(l,u),u.values),s):Il(n,a)};function E0(n,a,s){return typeof n=="number"&&typeof a=="number"&&typeof s=="number"?qe(n,a,s):uf(n)(n,a)}const aw=n=>{const a=({timestamp:s})=>n(s);return{start:(s=!0)=>Ye.update(a,s),stop:()=>yr(a),now:()=>mt.isProcessing?mt.timestamp:xt.now()}},T0=(n,a,s=10)=>{let l="";const u=Math.max(Math.round(a/s),2);for(let h=0;h<u;h++)l+=Math.round(n(h/(u-1))*1e4)/1e4+", ";return`linear(${l.substring(0,l.length-2)})`},eo=2e4;function df(n){let a=0;const s=50;let l=n.next(a);for(;!l.done&&a<eo;)a+=s,l=n.next(a);return a>=eo?1/0:a}function iw(n,a=100,s){const l=s({...n,keyframes:[0,a]}),u=Math.min(df(l),eo);return{type:"keyframes",ease:h=>l.next(u*h).value/a,duration:Wt(u)}}const Ze={stiffness:100,damping:10,mass:1,velocity:0,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05,maxDamping:1};function gd(n,a){return n*Math.sqrt(1-a*a)}const sw=12;function lw(n,a,s){let l=s;for(let u=1;u<sw;u++)l=l-n(l)/a(l);return l}const Fu=.001;function ow({duration:n=Ze.duration,bounce:a=Ze.bounce,velocity:s=Ze.velocity,mass:l=Ze.mass}){let u,h,f=1-a;f=xn(Ze.minDamping,Ze.maxDamping,f),n=xn(Ze.minDuration,Ze.maxDuration,Wt(n)),f<1?(u=p=>{const v=p*f,x=v*n,b=v-s,j=gd(p,f),E=Math.exp(-x);return Fu-b/j*E},h=p=>{const x=p*f*n,b=x*s+s,j=Math.pow(f,2)*Math.pow(p,2)*n,E=Math.exp(-x),T=gd(Math.pow(p,2),f);return(-u(p)+Fu>0?-1:1)*((b-j)*E)/T}):(u=p=>{const v=Math.exp(-p*n),x=(p-s)*n+1;return-Fu+v*x},h=p=>{const v=Math.exp(-p*n),x=(s-p)*(n*n);return v*x});const m=5/n,g=lw(u,h,m);if(n=Ht(n),isNaN(g))return{stiffness:Ze.stiffness,damping:Ze.damping,duration:n};{const p=Math.pow(g,2)*l;return{stiffness:p,damping:f*2*Math.sqrt(l*p),duration:n}}}const cw=["duration","bounce"],uw=["stiffness","damping","mass"];function iy(n,a){return a.some(s=>n[s]!==void 0)}function dw(n){let a={velocity:Ze.velocity,stiffness:Ze.stiffness,damping:Ze.damping,mass:Ze.mass,isResolvedFromDuration:!1,...n};if(!iy(n,uw)&&iy(n,cw))if(a.velocity=0,n.visualDuration){const s=n.visualDuration,l=2*Math.PI/(s*1.2),u=l*l,h=2*xn(.05,1,1-(n.bounce||0))*Math.sqrt(u);a={...a,mass:Ze.mass,stiffness:u,damping:h}}else{const s=ow({...n,velocity:0});a={...a,...s,mass:Ze.mass},a.isResolvedFromDuration=!0}return a}function to(n=Ze.visualDuration,a=Ze.bounce){const s=typeof n!="object"?{visualDuration:n,keyframes:[0,1],bounce:a}:n;let{restSpeed:l,restDelta:u}=s;const h=s.keyframes[0],f=s.keyframes[s.keyframes.length-1],m={done:!1,value:h},{stiffness:g,damping:p,mass:v,duration:x,velocity:b,isResolvedFromDuration:j}=dw({...s,velocity:-Wt(s.velocity||0)}),E=b||0,T=p/(2*Math.sqrt(g*v)),C=f-h,R=Wt(Math.sqrt(g/v)),k=Math.abs(C)<5;l||(l=k?Ze.restSpeed.granular:Ze.restSpeed.default),u||(u=k?Ze.restDelta.granular:Ze.restDelta.default);let _,O,U,P,M,D;if(T<1)U=gd(R,T),P=(E+T*R*C)/U,_=$=>{const ee=Math.exp(-T*R*$);return f-ee*(P*Math.sin(U*$)+C*Math.cos(U*$))},M=T*R*P+C*U,D=T*R*C-P*U,O=$=>Math.exp(-T*R*$)*(M*Math.sin(U*$)+D*Math.cos(U*$));else if(T===1){_=ee=>f-Math.exp(-R*ee)*(C+(E+R*C)*ee);const $=E+R*C;O=ee=>Math.exp(-R*ee)*(R*$*ee-E)}else{const $=R*Math.sqrt(T*T-1);_=le=>{const se=Math.exp(-T*R*le),L=Math.min($*le,300);return f-se*((E+T*R*C)*Math.sinh(L)+$*C*Math.cosh(L))/$};const ee=(E+T*R*C)/$,ne=T*R*ee-C*$,pe=T*R*C-ee*$;O=le=>{const se=Math.exp(-T*R*le),L=Math.min($*le,300);return se*(ne*Math.sinh(L)+pe*Math.cosh(L))}}const q={calculatedDuration:j&&x||null,velocity:$=>Ht(O($)),next:$=>{if(!j&&T<1){const ne=Math.exp(-T*R*$),pe=Math.sin(U*$),le=Math.cos(U*$),se=f-ne*(P*pe+C*le),L=Ht(ne*(M*pe+D*le));return m.done=Math.abs(L)<=l&&Math.abs(f-se)<=u,m.value=m.done?f:se,m}const ee=_($);if(j)m.done=$>=x;else{const ne=Ht(O($));m.done=Math.abs(ne)<=l&&Math.abs(f-ee)<=u}return m.value=m.done?f:ee,m},toString:()=>{const $=Math.min(df(q),eo),ee=T0(ne=>q.next($*ne).value,$,30);return $+"ms "+ee},toTransition:()=>{}};return q}to.applyToOptions=n=>{const a=iw(n,100,to);return n.ease=a.ease,n.duration=Ht(a.duration),n.type="keyframes",n};const fw=5;function C0(n,a,s){const l=Math.max(a-fw,0);return i0(s-n(l),a-l)}function yd({keyframes:n,velocity:a=0,power:s=.8,timeConstant:l=325,bounceDamping:u=10,bounceStiffness:h=500,modifyTarget:f,min:m,max:g,restDelta:p=.5,restSpeed:v}){const x=n[0],b={done:!1,value:x},j=D=>m!==void 0&&D<m||g!==void 0&&D>g,E=D=>m===void 0?g:g===void 0||Math.abs(m-D)<Math.abs(g-D)?m:g;let T=s*a;const C=x+T,R=f===void 0?C:f(C);R!==C&&(T=R-x);const k=D=>-T*Math.exp(-D/l),_=D=>R+k(D),O=D=>{const q=k(D),$=_(D);b.done=Math.abs(q)<=p,b.value=b.done?R:$};let U,P;const M=D=>{j(b.value)&&(U=D,P=to({keyframes:[b.value,E(b.value)],velocity:C0(_,D,b.value),damping:u,stiffness:h,restDelta:p,restSpeed:v}))};return M(0),{calculatedDuration:null,next:D=>{let q=!1;return!P&&U===void 0&&(q=!0,O(D),M(D)),U!==void 0&&D>=U?P.next(D-U):(!q&&O(D),b)}}}function hw(n,a,s){const l=[],u=s||gr.mix||E0,h=n.length-1;for(let f=0;f<h;f++){let m=u(n[f],n[f+1]);if(a){const g=Array.isArray(a)?a[f]||It:a;m=ss(g,m)}l.push(m)}return l}function mw(n,a,{clamp:s=!0,ease:l,mixer:u}={}){const h=n.length;if(mo(h===a.length),h===1)return()=>a[0];if(h===2&&a[0]===a[1])return()=>a[1];const f=n[0]===n[1];n[0]>n[h-1]&&(n=[...n].reverse(),a=[...a].reverse());const m=hw(a,l,u),g=m.length,p=v=>{if(f&&v<n[0])return a[0];let x=0;if(g>1)for(;x<n.length-2&&!(v<n[x+1]);x++);const b=Wi(n[x],n[x+1],v);return m[x](b)};return s?v=>p(xn(n[0],n[h-1],v)):p}function pw(n,a){const s=n[n.length-1];for(let l=1;l<=a;l++){const u=Wi(0,a,l);n.push(qe(s,1,u))}}function gw(n){const a=[0];return pw(a,n.length-1),a}function yw(n,a){return n.map(s=>s*a)}function vw(n,a){return n.map(()=>a||m0).splice(0,n.length-1)}function Ki({duration:n=300,keyframes:a,times:s,ease:l="easeInOut"}){const u=C2(l)?l.map(Ig):Ig(l),h={done:!1,value:a[0]},f=yw(s&&s.length===a.length?s:gw(a),n),m=mw(f,a,{ease:Array.isArray(u)?u:vw(a,u)});return{calculatedDuration:n,next:g=>(h.value=m(g),h.done=g>=n,h)}}const xw=n=>n!==null;function po(n,{repeat:a,repeatType:s="loop"},l,u=1){const h=n.filter(xw),m=u<0||a&&s!=="loop"&&a%2===1?0:h.length-1;return!m||l===void 0?h[m]:l}const bw={decay:yd,inertia:yd,tween:Ki,keyframes:Ki,spring:to};function N0(n){typeof n.type=="string"&&(n.type=bw[n.type])}class ff{constructor(){this.updateFinished()}get finished(){return this._finished}updateFinished(){this._finished=new Promise(a=>{this.resolve=a})}notifyFinished(){this.resolve()}then(a,s){return this.finished.then(a,s)}}const Sw=n=>n/100;class no extends ff{constructor(a){super(),this.state="idle",this.startTime=null,this.isStopped=!1,this.currentTime=0,this.holdTime=null,this.playbackSpeed=1,this.delayState={done:!1,value:void 0},this.stop=()=>{var l,u;const{motionValue:s}=this.options;s&&s.updatedAt!==xt.now()&&this.tick(xt.now()),this.isStopped=!0,this.state!=="idle"&&(this.teardown(),(u=(l=this.options).onStop)==null||u.call(l))},this.options=a,this.initAnimation(),this.play(),a.autoplay===!1&&this.pause()}initAnimation(){const{options:a}=this;N0(a);const{type:s=Ki,repeat:l=0,repeatDelay:u=0,repeatType:h,velocity:f=0}=a;let{keyframes:m}=a;const g=s||Ki;g!==Ki&&typeof m[0]!="number"&&(this.mixKeyframes=ss(Sw,E0(m[0],m[1])),m=[0,100]);const p=g({...a,keyframes:m});h==="mirror"&&(this.mirroredGenerator=g({...a,keyframes:[...m].reverse(),velocity:-f})),p.calculatedDuration===null&&(p.calculatedDuration=df(p));const{calculatedDuration:v}=p;this.calculatedDuration=v,this.resolvedDuration=v+u,this.totalDuration=this.resolvedDuration*(l+1)-u,this.generator=p}updateTime(a){const s=Math.round(a-this.startTime)*this.playbackSpeed;this.holdTime!==null?this.currentTime=this.holdTime:this.currentTime=s}tick(a,s=!1){const{generator:l,totalDuration:u,mixKeyframes:h,mirroredGenerator:f,resolvedDuration:m,calculatedDuration:g}=this;if(this.startTime===null)return l.next(0);const{delay:p=0,keyframes:v,repeat:x,repeatType:b,repeatDelay:j,type:E,onUpdate:T,finalKeyframe:C}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,a):this.speed<0&&(this.startTime=Math.min(a-u/this.speed,this.startTime)),s?this.currentTime=a:this.updateTime(a);const R=this.currentTime-p*(this.playbackSpeed>=0?1:-1),k=this.playbackSpeed>=0?R<0:R>u;this.currentTime=Math.max(R,0),this.state==="finished"&&this.holdTime===null&&(this.currentTime=u);let _=this.currentTime,O=l;if(x){const D=Math.min(this.currentTime,u)/m;let q=Math.floor(D),$=D%1;!$&&D>=1&&($=1),$===1&&q--,q=Math.min(q,x+1),!!(q%2)&&(b==="reverse"?($=1-$,j&&($-=j/m)):b==="mirror"&&(O=f)),_=xn(0,1,$)*m}let U;k?(this.delayState.value=v[0],U=this.delayState):U=O.next(_),h&&!k&&(U.value=h(U.value));let{done:P}=U;!k&&g!==null&&(P=this.playbackSpeed>=0?this.currentTime>=u:this.currentTime<=0);const M=this.holdTime===null&&(this.state==="finished"||this.state==="running"&&P);return M&&E!==yd&&(U.value=po(v,this.options,C,this.speed)),T&&T(U.value),M&&this.finish(),U}then(a,s){return this.finished.then(a,s)}get duration(){return Wt(this.calculatedDuration)}get iterationDuration(){const{delay:a=0}=this.options||{};return this.duration+Wt(a)}get time(){return Wt(this.currentTime)}set time(a){a=Ht(a),this.currentTime=a,this.startTime===null||this.holdTime!==null||this.playbackSpeed===0?this.holdTime=a:this.driver&&(this.startTime=this.driver.now()-a/this.playbackSpeed),this.driver?this.driver.start(!1):(this.startTime=0,this.state="paused",this.holdTime=a,this.tick(a))}getGeneratorVelocity(){const a=this.currentTime;if(a<=0)return this.options.velocity||0;if(this.generator.velocity)return this.generator.velocity(a);const s=this.generator.next(a).value;return C0(l=>this.generator.next(l).value,a,s)}get speed(){return this.playbackSpeed}set speed(a){const s=this.playbackSpeed!==a;s&&this.driver&&this.updateTime(xt.now()),this.playbackSpeed=a,s&&this.driver&&(this.time=Wt(this.currentTime))}play(){var u,h;if(this.isStopped)return;const{driver:a=aw,startTime:s}=this.options;this.driver||(this.driver=a(f=>this.tick(f))),(h=(u=this.options).onPlay)==null||h.call(u);const l=this.driver.now();this.state==="finished"?(this.updateFinished(),this.startTime=l):this.holdTime!==null?this.startTime=l-this.holdTime:this.startTime||(this.startTime=s??l),this.state==="finished"&&this.speed<0&&(this.startTime+=this.calculatedDuration),this.holdTime=null,this.state="running",this.driver.start()}pause(){this.state="paused",this.updateTime(xt.now()),this.holdTime=this.currentTime}complete(){this.state!=="running"&&this.play(),this.state="finished",this.holdTime=null}finish(){var a,s;this.notifyFinished(),this.teardown(),this.state="finished",(s=(a=this.options).onComplete)==null||s.call(a)}cancel(){var a,s;this.holdTime=null,this.startTime=0,this.tick(0),this.teardown(),(s=(a=this.options).onCancel)==null||s.call(a)}teardown(){this.state="idle",this.stopDriver(),this.startTime=this.holdTime=null}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(a){return this.startTime=0,this.tick(a,!0)}attachTimeline(a){var s;return this.options.allowFlatten&&(this.options.type="keyframes",this.options.ease="linear",this.initAnimation()),(s=this.driver)==null||s.stop(),a.observe(this)}}function ww(n){for(let a=1;a<n.length;a++)n[a]??(n[a]=n[a-1])}const qr=n=>n*180/Math.PI,vd=n=>{const a=qr(Math.atan2(n[1],n[0]));return xd(a)},jw={x:4,y:5,translateX:4,translateY:5,scaleX:0,scaleY:3,scale:n=>(Math.abs(n[0])+Math.abs(n[3]))/2,rotate:vd,rotateZ:vd,skewX:n=>qr(Math.atan(n[1])),skewY:n=>qr(Math.atan(n[2])),skew:n=>(Math.abs(n[1])+Math.abs(n[2]))/2},xd=n=>(n=n%360,n<0&&(n+=360),n),sy=vd,ly=n=>Math.sqrt(n[0]*n[0]+n[1]*n[1]),oy=n=>Math.sqrt(n[4]*n[4]+n[5]*n[5]),Ew={x:12,y:13,z:14,translateX:12,translateY:13,translateZ:14,scaleX:ly,scaleY:oy,scale:n=>(ly(n)+oy(n))/2,rotateX:n=>xd(qr(Math.atan2(n[6],n[5]))),rotateY:n=>xd(qr(Math.atan2(-n[2],n[0]))),rotateZ:sy,rotate:sy,skewX:n=>qr(Math.atan(n[4])),skewY:n=>qr(Math.atan(n[1])),skew:n=>(Math.abs(n[1])+Math.abs(n[4]))/2};function bd(n){return n.includes("scale")?1:0}function Sd(n,a){if(!n||n==="none")return bd(a);const s=n.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);let l,u;if(s)l=Ew,u=s;else{const m=n.match(/^matrix\(([-\d.e\s,]+)\)$/u);l=jw,u=m}if(!u)return bd(a);const h=l[a],f=u[1].split(",").map(Cw);return typeof h=="function"?h(f):f[h]}const Tw=(n,a)=>{const{transform:s="none"}=getComputedStyle(n);return Sd(s,a)};function Cw(n){return parseFloat(n.trim())}const Xa=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],Pa=new Set([...Xa,"pathRotation"]),cy=n=>n===Ga||n===fe,Nw=new Set(["x","y","z"]),Aw=Xa.filter(n=>!Nw.has(n));function Dw(n){const a=[];return Aw.forEach(s=>{const l=n.getValue(s);l!==void 0&&(a.push([s,l.get()]),l.set(s.startsWith("scale")?1:0))}),a}const pr={width:({x:n},{paddingLeft:a="0",paddingRight:s="0",boxSizing:l})=>{const u=n.max-n.min;return l==="border-box"?u:u-parseFloat(a)-parseFloat(s)},height:({y:n},{paddingTop:a="0",paddingBottom:s="0",boxSizing:l})=>{const u=n.max-n.min;return l==="border-box"?u:u-parseFloat(a)-parseFloat(s)},top:(n,{top:a})=>parseFloat(a),left:(n,{left:a})=>parseFloat(a),bottom:({y:n},{top:a})=>parseFloat(a)+(n.max-n.min),right:({x:n},{left:a})=>parseFloat(a)+(n.max-n.min),x:(n,{transform:a})=>Sd(a,"x"),y:(n,{transform:a})=>Sd(a,"y")};pr.translateX=pr.x;pr.translateY=pr.y;const Yr=new Set;let wd=!1,jd=!1,Ed=!1;function A0(){if(jd){const n=Array.from(Yr).filter(l=>l.needsMeasurement),a=new Set(n.map(l=>l.element)),s=new Map;a.forEach(l=>{const u=Dw(l);u.length&&(s.set(l,u),l.render())}),n.forEach(l=>l.measureInitialState()),a.forEach(l=>{l.render();const u=s.get(l);u&&u.forEach(([h,f])=>{var m;(m=l.getValue(h))==null||m.set(f)})}),n.forEach(l=>l.measureEndState()),n.forEach(l=>{l.suspendedScrollY!==void 0&&window.scrollTo(0,l.suspendedScrollY)})}jd=!1,wd=!1,Yr.forEach(n=>n.complete(Ed)),Yr.clear()}function D0(){Yr.forEach(n=>{n.readKeyframes(),n.needsMeasurement&&(jd=!0)})}function Mw(){Ed=!0,D0(),A0(),Ed=!1}class hf{constructor(a,s,l,u,h,f=!1){this.state="pending",this.isAsync=!1,this.needsMeasurement=!1,this.unresolvedKeyframes=[...a],this.onComplete=s,this.name=l,this.motionValue=u,this.element=h,this.isAsync=f}scheduleResolve(){this.state="scheduled",this.isAsync?(Yr.add(this),wd||(wd=!0,Ye.read(D0),Ye.resolveKeyframes(A0))):(this.readKeyframes(),this.complete())}readKeyframes(){const{unresolvedKeyframes:a,name:s,element:l,motionValue:u}=this;if(a[0]===null){const h=u==null?void 0:u.get(),f=a[a.length-1];if(h!==void 0)a[0]=h;else if(l&&s){const m=l.readValue(s,f);m!=null&&(a[0]=m)}a[0]===void 0&&(a[0]=f),u&&h===void 0&&u.set(a[0])}ww(a)}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(a=!1){this.state="complete",this.onComplete(this.unresolvedKeyframes,this.finalKeyframe,a),Yr.delete(this)}cancel(){this.state==="scheduled"&&(Yr.delete(this),this.state="pending")}resume(){this.state==="pending"&&this.scheduleResolve()}}const kw=n=>n.startsWith("--");function M0(n,a,s){kw(a)?n.style.setProperty(a,s):n.style[a]=s}const Rw={};function k0(n,a){const s=a0(n);return()=>Rw[a]??s()}const Ow=k0(()=>window.ScrollTimeline!==void 0,"scrollTimeline"),R0=k0(()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0},"linearEasing"),Pi=([n,a,s,l])=>`cubic-bezier(${n}, ${a}, ${s}, ${l})`,uy={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:Pi([0,.65,.55,1]),circOut:Pi([.55,0,1,.45]),backIn:Pi([.31,.01,.66,-.59]),backOut:Pi([.33,1.53,.69,.99])};function O0(n,a){if(n)return typeof n=="function"?R0()?T0(n,a):"ease-out":p0(n)?Pi(n):Array.isArray(n)?n.map(s=>O0(s,a)||uy.easeOut):uy[n]}function zw(n,a,s,{delay:l=0,duration:u=300,repeat:h=0,repeatType:f="loop",ease:m="easeOut",times:g}={},p=void 0){const v={[a]:s};g&&(v.offset=g);const x=O0(m,u);Array.isArray(x)&&(v.easing=x);const b={delay:l,duration:u,easing:Array.isArray(x)?"linear":x,fill:"both",iterations:h+1,direction:f==="reverse"?"alternate":"normal"};return p&&(b.pseudoElement=p),n.animate(v,b)}function z0(n){return typeof n=="function"&&"applyToOptions"in n}function _w({type:n,...a}){return z0(n)&&R0()?n.applyToOptions(a):(a.duration??(a.duration=300),a.ease??(a.ease="easeOut"),a)}class _0 extends ff{constructor(a){if(super(),this.finishedTime=null,this.isStopped=!1,this.manualStartTime=null,!a)return;const{element:s,name:l,keyframes:u,pseudoElement:h,allowFlatten:f=!1,finalKeyframe:m,onComplete:g}=a;this.isPseudoElement=!!h,this.allowFlatten=f,this.options=a,mo(typeof a.type!="string");const p=_w(a);this.animation=zw(s,l,u,p,h),p.autoplay===!1&&this.animation.pause(),this.animation.onfinish=()=>{if(this.finishedTime=this.time,!h){const v=po(u,this.options,m,this.speed);this.updateMotionValue&&this.updateMotionValue(v),M0(s,l,v),this.animation.cancel()}g==null||g(),this.notifyFinished()}}play(){this.isStopped||(this.manualStartTime=null,this.animation.play(),this.state==="finished"&&this.updateFinished())}pause(){this.animation.pause()}complete(){var a,s;(s=(a=this.animation).finish)==null||s.call(a)}cancel(){try{this.animation.cancel()}catch{}}stop(){if(this.isStopped)return;this.isStopped=!0;const{state:a}=this;a==="idle"||a==="finished"||(this.updateMotionValue?this.updateMotionValue():this.commitStyles(),this.isPseudoElement||this.cancel())}commitStyles(){var s,l,u;const a=(s=this.options)==null?void 0:s.element;!this.isPseudoElement&&(a!=null&&a.isConnected)&&((u=(l=this.animation).commitStyles)==null||u.call(l))}get duration(){var s,l;const a=((l=(s=this.animation.effect)==null?void 0:s.getComputedTiming)==null?void 0:l.call(s).duration)||0;return Wt(Number(a))}get iterationDuration(){const{delay:a=0}=this.options||{};return this.duration+Wt(a)}get time(){return Wt(Number(this.animation.currentTime)||0)}set time(a){const s=this.finishedTime!==null;this.manualStartTime=null,this.finishedTime=null,this.animation.currentTime=Ht(a),s&&this.animation.pause()}get speed(){return this.animation.playbackRate}set speed(a){a<0&&(this.finishedTime=null),this.animation.playbackRate=a}get state(){return this.finishedTime!==null?"finished":this.animation.playState}get startTime(){return this.manualStartTime??Number(this.animation.startTime)}set startTime(a){this.manualStartTime=this.animation.startTime=a}attachTimeline({timeline:a,rangeStart:s,rangeEnd:l,observe:u}){var h;return this.allowFlatten&&((h=this.animation.effect)==null||h.updateTiming({easing:"linear"})),this.animation.onfinish=null,a&&Ow()?(this.animation.timeline=a,s&&(this.animation.rangeStart=s),l&&(this.animation.rangeEnd=l),It):u(this)}}const V0={anticipate:d0,backInOut:u0,circInOut:h0};function Vw(n){return n in V0}function Bw(n){typeof n.ease=="string"&&Vw(n.ease)&&(n.ease=V0[n.ease])}const $u=10;class Lw extends _0{constructor(a){Bw(a),N0(a),super(a),a.startTime!==void 0&&a.autoplay!==!1&&(this.startTime=a.startTime),this.options=a}updateMotionValue(a){const{motionValue:s,onUpdate:l,onComplete:u,element:h,...f}=this.options;if(!s)return;if(a!==void 0){s.set(a);return}const m=new no({...f,autoplay:!1}),g=Math.max($u,xt.now()-this.startTime),p=xn(0,$u,g-$u),v=m.sample(g).value,{name:x}=this.options;h&&x&&M0(h,x,v),s.setWithVelocity(m.sample(Math.max(0,g-p)).value,v,p),m.stop()}}const dy=(n,a)=>a==="zIndex"?!1:!!(typeof n=="number"||Array.isArray(n)||typeof n=="string"&&(ln.test(n)||n==="0")&&!n.startsWith("url("));function Uw(n){const a=n[0];if(n.length===1)return!0;for(let s=0;s<n.length;s++)if(n[s]!==a)return!0}function Hw(n,a,s,l){const u=n[0];if(u===null)return!1;if(a==="display"||a==="visibility")return!0;const h=n[n.length-1],f=dy(u,a),m=dy(h,a);return!f||!m?!1:Uw(n)||(s==="spring"||z0(s))&&l}function Td(n){n.duration=0,n.type="keyframes"}const B0=new Set(["opacity","clipPath","filter","transform","backgroundColor"]),qw=/^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;function Yw(n){for(let a=0;a<n.length;a++)if(typeof n[a]=="string"&&qw.test(n[a]))return!0;return!1}const Gw=new Set(["color","backgroundColor","outlineColor","fill","stroke","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"]),Xw=a0(()=>Object.hasOwnProperty.call(Element.prototype,"animate"));function Pw(n){var x;const{motionValue:a,name:s,repeatDelay:l,repeatType:u,damping:h,type:f,keyframes:m}=n,g=(x=a==null?void 0:a.owner)==null?void 0:x.current;if(!(g instanceof HTMLElement)&&!(g instanceof SVGElement))return!1;const{onUpdate:p,transformTemplate:v}=a.owner.getProps();return Xw()&&s&&(B0.has(s)||Gw.has(s)&&Yw(m))&&(s!=="transform"||!v)&&!p&&!l&&u!=="mirror"&&h!==0&&f!=="inertia"}const Fw=40;class $w extends ff{constructor({autoplay:a=!0,delay:s=0,type:l="keyframes",repeat:u=0,repeatDelay:h=0,repeatType:f="loop",keyframes:m,name:g,motionValue:p,element:v,...x}){var E;super(),this.stop=()=>{var T,C;this._animation&&(this._animation.stop(),(T=this.stopTimeline)==null||T.call(this)),(C=this.keyframeResolver)==null||C.cancel()},this.createdAt=xt.now();const b={autoplay:a,delay:s,type:l,repeat:u,repeatDelay:h,repeatType:f,name:g,motionValue:p,element:v,...x},j=(v==null?void 0:v.KeyframeResolver)||hf;this.keyframeResolver=new j(m,(T,C,R)=>this.onKeyframesResolved(T,C,b,!R),g,p,v),(E=this.keyframeResolver)==null||E.scheduleResolve()}onKeyframesResolved(a,s,l,u){var R,k;this.keyframeResolver=void 0;const{name:h,type:f,velocity:m,delay:g,isHandoff:p,onUpdate:v}=l;this.resolvedAt=xt.now();let x=!0;Hw(a,h,f,m)||(x=!1,(gr.instantAnimations||!g)&&(v==null||v(po(a,l,s))),a[0]=a[a.length-1],Td(l),l.repeat=0);const j={startTime:u?this.resolvedAt?this.resolvedAt-this.createdAt>Fw?this.resolvedAt:this.createdAt:this.createdAt:void 0,finalKeyframe:s,...l,keyframes:a},E=x&&!p&&Pw(j),T=(k=(R=j.motionValue)==null?void 0:R.owner)==null?void 0:k.current;let C;if(E)try{C=new Lw({...j,element:T})}catch{C=new no(j)}else C=new no(j);C.finished.then(()=>{this.notifyFinished()}).catch(It),this.pendingTimeline&&(this.stopTimeline=C.attachTimeline(this.pendingTimeline),this.pendingTimeline=void 0),this._animation=C}get finished(){return this._animation?this.animation.finished:this._finished}then(a,s){return this.finished.finally(a).then(()=>{})}get animation(){var a;return this._animation||((a=this.keyframeResolver)==null||a.resume(),Mw()),this._animation}get duration(){return this.animation.duration}get iterationDuration(){return this.animation.iterationDuration}get time(){return this.animation.time}set time(a){this.animation.time=a}get speed(){return this.animation.speed}get state(){return this.animation.state}set speed(a){this.animation.speed=a}get startTime(){return this.animation.startTime}attachTimeline(a){return this._animation?this.stopTimeline=this.animation.attachTimeline(a):this.pendingTimeline=a,()=>this.stop()}play(){this.animation.play()}pause(){this.animation.pause()}complete(){this.animation.complete()}cancel(){var a;this._animation&&this.animation.cancel(),(a=this.keyframeResolver)==null||a.cancel()}}function L0(n,a,s,l=0,u=1){const h=Array.from(n).sort((p,v)=>p.sortNodePosition(v)).indexOf(a),f=n.size,m=(f-1)*l;return typeof s=="function"?s(h,f):u===1?h*l:m-h*l}const fy=30,Kw=n=>!isNaN(parseFloat(n));class Zw{constructor(a,s={}){this.canTrackVelocity=null,this.events={},this.updateAndNotify=l=>{var h;const u=xt.now();if(this.updatedAt!==u&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(l),this.current!==this.prev&&((h=this.events.change)==null||h.notify(this.current),this.dependents))for(const f of this.dependents)f.dirty()},this.hasAnimated=!1,this.setCurrent(a),this.owner=s.owner}setCurrent(a){this.current=a,this.updatedAt=xt.now(),this.canTrackVelocity===null&&a!==void 0&&(this.canTrackVelocity=Kw(this.current))}setPrevFrameValue(a=this.current){this.prevFrameValue=a,this.prevUpdatedAt=this.updatedAt}onChange(a){return this.on("change",a)}on(a,s){this.events[a]||(this.events[a]=new rf);const l=this.events[a].add(s);return a==="change"?()=>{l(),Ye.read(()=>{this.events.change.getSize()||this.stop()})}:l}clearListeners(){for(const a in this.events)this.events[a].clear()}attach(a,s){this.passiveEffect=a,this.stopPassiveEffect=s}set(a){this.passiveEffect?this.passiveEffect(a,this.updateAndNotify):this.updateAndNotify(a)}setWithVelocity(a,s,l){this.set(s),this.prev=void 0,this.prevFrameValue=a,this.prevUpdatedAt=this.updatedAt-l}jump(a,s=!0){this.updateAndNotify(a),this.prev=a,this.prevUpdatedAt=this.prevFrameValue=void 0,s&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}dirty(){var a;(a=this.events.change)==null||a.notify(this.current)}addDependent(a){this.dependents||(this.dependents=new Set),this.dependents.add(a)}removeDependent(a){this.dependents&&this.dependents.delete(a)}get(){return this.current}getPrevious(){return this.prev}getVelocity(){const a=xt.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||a-this.updatedAt>fy)return 0;const s=Math.min(this.updatedAt-this.prevUpdatedAt,fy);return i0(parseFloat(this.current)-parseFloat(this.prevFrameValue),s)}start(a){return this.stop(),new Promise(s=>{this.hasAnimated=!0,this.animation=a(s),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){var a,s;(a=this.dependents)==null||a.clear(),(s=this.events.destroy)==null||s.notify(),this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}}function qa(n,a){return new Zw(n,a)}function U0(n,a){if(n!=null&&n.inherit&&a){const{inherit:s,...l}=n;return{...a,...l}}return n}function mf(n,a){const s=(n==null?void 0:n[a])??(n==null?void 0:n.default)??n;return s!==n?U0(s,n):s}const Qw={type:"spring",stiffness:500,damping:25,restSpeed:10},Jw=n=>({type:"spring",stiffness:550,damping:n===0?2*Math.sqrt(550):30,restSpeed:10}),Ww={type:"keyframes",duration:.8},Iw={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},ej=(n,{keyframes:a})=>a.length>2?Ww:Pa.has(n)?n.startsWith("scale")?Jw(a[1]):Qw:Iw,tj=new Set(["when","delay","delayChildren","staggerChildren","staggerDirection","repeat","repeatType","repeatDelay","from","elapsed"]);function nj(n){for(const a in n)if(!tj.has(a))return!0;return!1}const pf=(n,a,s,l={},u,h)=>f=>{const m=mf(l,n)||{},g=m.delay||l.delay||0;let{elapsed:p=0}=l;p=p-Ht(g);const v={keyframes:Array.isArray(s)?s:[null,s],ease:"easeOut",velocity:a.getVelocity(),...m,delay:-p,onUpdate:b=>{a.set(b),m.onUpdate&&m.onUpdate(b)},onComplete:()=>{f(),m.onComplete&&m.onComplete()},name:n,motionValue:a,element:h?void 0:u};nj(m)||Object.assign(v,ej(n,v)),v.duration&&(v.duration=Ht(v.duration)),v.repeatDelay&&(v.repeatDelay=Ht(v.repeatDelay)),v.from!==void 0&&(v.keyframes[0]=v.from);let x=!1;if((v.type===!1||v.duration===0&&!v.repeatDelay)&&(Td(v),v.delay===0&&(x=!0)),(gr.instantAnimations||gr.skipAnimations||u!=null&&u.shouldSkipAnimations||m.skipAnimations)&&(x=!0,Td(v),v.delay=0),v.allowFlatten=!m.type&&!m.ease,x&&!h&&a.get()!==void 0){const b=po(v.keyframes,m);if(b!==void 0){Ye.update(()=>{v.onUpdate(b),v.onComplete()});return}}return m.isSync?new no(v):new $w(v)},rj=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function aj(n){const a=rj.exec(n);if(!a)return[,];const[,s,l,u]=a;return[`--${s??l}`,u]}function H0(n,a,s=1){const[l,u]=aj(n);if(!l)return;const h=window.getComputedStyle(a).getPropertyValue(l);if(h){const f=h.trim();return t0(f)?parseFloat(f):f}return lf(u)?H0(u,a,s+1):u}function hy(n){const a=[{},{}];return n==null||n.values.forEach((s,l)=>{a[0][l]=s.get(),a[1][l]=s.getVelocity()}),a}function gf(n,a,s,l){if(typeof a=="function"){const[u,h]=hy(l);a=a(s!==void 0?s:n.custom,u,h)}if(typeof a=="string"&&(a=n.variants&&n.variants[a]),typeof a=="function"){const[u,h]=hy(l);a=a(s!==void 0?s:n.custom,u,h)}return a}function Gr(n,a,s){const l=n.getProps();return gf(l,a,s!==void 0?s:l.custom,n)}const q0=new Set(["width","height","top","left","right","bottom",...Xa]),Cd=n=>Array.isArray(n);function ij(n,a,s){n.hasValue(a)?n.getValue(a).set(s):n.addValue(a,qa(s))}function sj(n){return Cd(n)?n[n.length-1]||0:n}function lj(n,a){const s=Gr(n,a);let{transitionEnd:l={},transition:u={},...h}=s||{};h={...h,...l};for(const f in h){const m=sj(h[f]);ij(n,f,m)}}const pt=n=>!!(n&&n.getVelocity);function oj(n){return!!(pt(n)&&n.add)}function Nd(n,a){const s=n.getValue("willChange");if(oj(s))return s.add(a);if(!s&&gr.WillChange){const l=new gr.WillChange("auto");n.addValue("willChange",l),l.add(a)}}function yf(n){return n.replace(/([A-Z])/g,a=>`-${a.toLowerCase()}`)}const cj="framerAppearId",Y0="data-"+yf(cj);function G0(n){return n.props[Y0]}function uj({protectedKeys:n,needsAnimating:a},s){const l=n.hasOwnProperty(s)&&a[s]!==!0;return a[s]=!1,l}function X0(n,a,{delay:s=0,transitionOverride:l,type:u}={}){let{transition:h,transitionEnd:f,...m}=a;const g=n.getDefaultTransition();h=h?U0(h,g):g;const p=h==null?void 0:h.reduceMotion,v=h==null?void 0:h.skipAnimations;l&&(h=l);const x=[],b=u&&n.animationState&&n.animationState.getState()[u],j=h==null?void 0:h.path;j&&j.animateVisualElement(n,m,h,s,x);for(const E in m){const T=n.getValue(E,n.latestValues[E]??null),C=m[E];if(C===void 0||b&&uj(b,E))continue;const R={delay:s,...mf(h||{},E)};v&&(R.skipAnimations=!0);const k=T.get();if(k!==void 0&&!T.isAnimating()&&!Array.isArray(C)&&C===k&&!R.velocity){Ye.update(()=>T.set(C));continue}let _=!1;if(window.MotionHandoffAnimation){const P=G0(n);if(P){const M=window.MotionHandoffAnimation(P,E,Ye);M!==null&&(R.startTime=M,_=!0)}}Nd(n,E);const O=p??n.shouldReduceMotion;T.start(pf(E,T,C,O&&q0.has(E)?{type:!1}:R,n,_));const U=T.animation;U&&x.push(U)}if(f){const E=()=>Ye.update(()=>{f&&lj(n,f)});x.length?Promise.all(x).then(E):E()}return x}function Ad(n,a,s={}){var g;const l=Gr(n,a,s.type==="exit"?(g=n.presenceContext)==null?void 0:g.custom:void 0);let{transition:u=n.getDefaultTransition()||{}}=l||{};s.transitionOverride&&(u=s.transitionOverride);const h=l?()=>Promise.all(X0(n,l,s)):()=>Promise.resolve(),f=n.variantChildren&&n.variantChildren.size?(p=0)=>{const{delayChildren:v=0,staggerChildren:x,staggerDirection:b}=u;return dj(n,a,p,v,x,b,s)}:()=>Promise.resolve(),{when:m}=u;if(m){const[p,v]=m==="beforeChildren"?[h,f]:[f,h];return p().then(()=>v())}else return Promise.all([h(),f(s.delay)])}function dj(n,a,s=0,l=0,u=0,h=1,f){const m=[];for(const g of n.variantChildren)g.notify("AnimationStart",a),m.push(Ad(g,a,{...f,delay:s+(typeof l=="function"?0:l)+L0(n.variantChildren,g,l,u,h)}).then(()=>g.notify("AnimationComplete",a)));return Promise.all(m)}function fj(n,a,s={}){n.notify("AnimationStart",a);let l;if(Array.isArray(a)){const u=a.map(h=>Ad(n,h,s));l=Promise.all(u)}else if(typeof a=="string")l=Ad(n,a,s);else{const u=typeof a=="function"?Gr(n,a,s.custom):a;l=Promise.all(X0(n,u,s))}return l.then(()=>{n.notify("AnimationComplete",a)})}const hj={test:n=>n==="auto",parse:n=>n},P0=n=>a=>a.test(n),F0=[Ga,fe,vn,Ln,U2,L2,hj],my=n=>F0.find(P0(n));function mj(n){return typeof n=="number"?n===0:n!==null?n==="none"||n==="0"||r0(n):!0}const pj=new Set(["brightness","contrast","saturate","opacity"]);function gj(n){const[a,s]=n.slice(0,-1).split("(");if(a==="drop-shadow")return n;const[l]=s.match(of)||[];if(!l)return n;const u=s.replace(l,"");let h=pj.has(a)?1:0;return l!==s&&(h*=100),a+"("+h+u+")"}const yj=/\b([a-z-]*)\(.*?\)/gu,Dd={...ln,getAnimatableNone:n=>{const a=n.match(yj);return a?a.map(gj).join(" "):n}},Md={...ln,getAnimatableNone:n=>{const a=ln.parse(n);return ln.createTransformer(n)(a.map(l=>typeof l=="number"?0:typeof l=="object"?{...l,alpha:1}:l))}},py={...Ga,transform:Math.round},vj={rotate:Ln,pathRotation:Ln,rotateX:Ln,rotateY:Ln,rotateZ:Ln,scale:Ml,scaleX:Ml,scaleY:Ml,scaleZ:Ml,skew:Ln,skewX:Ln,skewY:Ln,distance:fe,translateX:fe,translateY:fe,translateZ:fe,x:fe,y:fe,z:fe,perspective:fe,transformPerspective:fe,opacity:Ii,originX:ty,originY:ty,originZ:fe},ro={borderWidth:fe,borderTopWidth:fe,borderRightWidth:fe,borderBottomWidth:fe,borderLeftWidth:fe,borderRadius:fe,borderTopLeftRadius:fe,borderTopRightRadius:fe,borderBottomRightRadius:fe,borderBottomLeftRadius:fe,width:fe,maxWidth:fe,height:fe,maxHeight:fe,top:fe,right:fe,bottom:fe,left:fe,inset:fe,insetBlock:fe,insetBlockStart:fe,insetBlockEnd:fe,insetInline:fe,insetInlineStart:fe,insetInlineEnd:fe,padding:fe,paddingTop:fe,paddingRight:fe,paddingBottom:fe,paddingLeft:fe,paddingBlock:fe,paddingBlockStart:fe,paddingBlockEnd:fe,paddingInline:fe,paddingInlineStart:fe,paddingInlineEnd:fe,margin:fe,marginTop:fe,marginRight:fe,marginBottom:fe,marginLeft:fe,marginBlock:fe,marginBlockStart:fe,marginBlockEnd:fe,marginInline:fe,marginInlineStart:fe,marginInlineEnd:fe,fontSize:fe,backgroundPositionX:fe,backgroundPositionY:fe,...vj,zIndex:py,fillOpacity:Ii,strokeOpacity:Ii,numOctaves:py},xj={...ro,color:rt,backgroundColor:rt,outlineColor:rt,fill:rt,stroke:rt,borderColor:rt,borderTopColor:rt,borderRightColor:rt,borderBottomColor:rt,borderLeftColor:rt,filter:Dd,WebkitFilter:Dd,mask:Md,WebkitMask:Md},$0=n=>xj[n],bj=new Set([Dd,Md]);function K0(n,a){let s=$0(n);return bj.has(s)||(s=ln),s.getAnimatableNone?s.getAnimatableNone(a):void 0}const Sj=new Set(["auto","none","0"]);function wj(n,a,s){let l=0,u;for(;l<n.length&&!u;){const h=n[l];typeof h=="string"&&!Sj.has(h)&&Ha(h).values.length&&(u=n[l]),l++}if(u&&s)for(const h of a)n[h]=K0(s,u)}class jj extends hf{constructor(a,s,l,u,h){super(a,s,l,u,h,!0)}readKeyframes(){const{unresolvedKeyframes:a,element:s,name:l}=this;if(!s||!s.current)return;super.readKeyframes();for(let v=0;v<a.length;v++){let x=a[v];if(typeof x=="string"&&(x=x.trim(),lf(x))){const b=H0(x,s.current);b!==void 0&&(a[v]=b),v===a.length-1&&(this.finalKeyframe=x)}}if(this.resolveNoneKeyframes(),!q0.has(l)||a.length!==2)return;const[u,h]=a,f=my(u),m=my(h),g=ey(u),p=ey(h);if(g!==p&&pr[l]){this.needsMeasurement=!0;return}if(f!==m)if(cy(f)&&cy(m))for(let v=0;v<a.length;v++){const x=a[v];typeof x=="string"&&(a[v]=parseFloat(x))}else pr[l]&&(this.needsMeasurement=!0)}resolveNoneKeyframes(){const{unresolvedKeyframes:a,name:s}=this,l=[];for(let u=0;u<a.length;u++)(a[u]===null||mj(a[u]))&&l.push(u);l.length&&wj(a,l,s)}measureInitialState(){const{element:a,unresolvedKeyframes:s,name:l}=this;if(!a||!a.current)return;l==="height"&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=pr[l](a.measureViewportBox(),window.getComputedStyle(a.current)),s[0]=this.measuredOrigin;const u=s[s.length-1];u!==void 0&&a.getValue(l,u).jump(u,!1)}measureEndState(){var m;const{element:a,name:s,unresolvedKeyframes:l}=this;if(!a||!a.current)return;const u=a.getValue(s);u&&u.jump(this.measuredOrigin,!1);const h=l.length-1,f=l[h];l[h]=pr[s](a.measureViewportBox(),window.getComputedStyle(a.current)),f!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=f),(m=this.removedTransforms)!=null&&m.length&&this.removedTransforms.forEach(([g,p])=>{a.getValue(g).set(p)}),this.resolveNoneKeyframes()}}const vf=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"];function Z0(n,a,s){if(n==null)return[];if(n instanceof EventTarget)return[n];if(typeof n=="string"){let l=document;const u=(s==null?void 0:s[n])??l.querySelectorAll(n);return u?Array.from(u):[]}return Array.from(n).filter(l=>l!=null)}const kd=(n,a)=>a&&typeof n=="number"?a.transform(n):n;function Yl(n){return n0(n)&&"offsetHeight"in n&&!("ownerSVGElement"in n)}const{schedule:xf}=g0(queueMicrotask,!1),an={x:!1,y:!1};function Q0(){return an.x||an.y}function Ej(n){return n==="x"||n==="y"?an[n]?null:(an[n]=!0,()=>{an[n]=!1}):an.x||an.y?null:(an.x=an.y=!0,()=>{an.x=an.y=!1})}function J0(n,a){const s=Z0(n),l=new AbortController,u={passive:!0,...a,signal:l.signal};return[s,u,()=>l.abort()]}function Tj(n){return!(n.pointerType==="touch"||Q0())}function Cj(n,a,s={}){const[l,u,h]=J0(n,s);return l.forEach(f=>{let m=!1,g=!1,p;const v=()=>{f.removeEventListener("pointerleave",E)},x=C=>{p&&(p(C),p=void 0),v()},b=C=>{m=!1,window.removeEventListener("pointerup",b),window.removeEventListener("pointercancel",b),g&&(g=!1,x(C))},j=()=>{m=!0,window.addEventListener("pointerup",b,u),window.addEventListener("pointercancel",b,u)},E=C=>{if(C.pointerType!=="touch"){if(m){g=!0;return}x(C)}},T=C=>{if(!Tj(C))return;g=!1;const R=a(f,C);typeof R=="function"&&(p=R,f.addEventListener("pointerleave",E,u))};f.addEventListener("pointerenter",T,u),f.addEventListener("pointerdown",j,u)}),h}const W0=(n,a)=>a?n===a?!0:W0(n,a.parentElement):!1,bf=n=>n.pointerType==="mouse"?typeof n.button!="number"||n.button<=0:n.isPrimary!==!1,Nj=new Set(["BUTTON","INPUT","SELECT","TEXTAREA","A"]);function Aj(n){return Nj.has(n.tagName)||n.isContentEditable===!0}const Dj=new Set(["INPUT","SELECT","TEXTAREA"]);function Mj(n){return Dj.has(n.tagName)||n.isContentEditable===!0}const Gl=new WeakSet;function gy(n){return a=>{a.key==="Enter"&&n(a)}}function Ku(n,a){n.dispatchEvent(new PointerEvent("pointer"+a,{isPrimary:!0,bubbles:!0}))}const kj=(n,a)=>{const s=n.currentTarget;if(!s)return;const l=gy(()=>{if(Gl.has(s))return;Ku(s,"down");const u=gy(()=>{Ku(s,"up")}),h=()=>Ku(s,"cancel");s.addEventListener("keyup",u,a),s.addEventListener("blur",h,a)});s.addEventListener("keydown",l,a),s.addEventListener("blur",()=>s.removeEventListener("keydown",l),a)};function yy(n){return bf(n)&&!Q0()}const vy=new WeakSet;function Rj(n,a,s={}){const[l,u,h]=J0(n,s),f=m=>{const g=m.currentTarget;if(!yy(m)||vy.has(m))return;Gl.add(g),s.stopPropagation&&vy.add(m);const p=a(g,m),v={...u,capture:!0},x=(E,T)=>{window.removeEventListener("pointerup",b,v),window.removeEventListener("pointercancel",j,v),Gl.has(g)&&Gl.delete(g),yy(E)&&typeof p=="function"&&p(E,{success:T})},b=E=>{x(E,g===window||g===document||s.useGlobalTarget||W0(g,E.target))},j=E=>{x(E,!1)};window.addEventListener("pointerup",b,v),window.addEventListener("pointercancel",j,v)};return l.forEach(m=>{(s.useGlobalTarget?window:m).addEventListener("pointerdown",f,u),Yl(m)&&(m.addEventListener("focus",p=>kj(p,u)),!Aj(m)&&!m.hasAttribute("tabindex")&&(m.tabIndex=0))}),h}function Sf(n){return n0(n)&&"ownerSVGElement"in n}const Xl=new WeakMap;let hr;const I0=(n,a,s)=>(l,u)=>u&&u[0]?u[0][n+"Size"]:Sf(l)&&"getBBox"in l?l.getBBox()[a]:l[s],Oj=I0("inline","width","offsetWidth"),zj=I0("block","height","offsetHeight");function _j({target:n,borderBoxSize:a}){var s;(s=Xl.get(n))==null||s.forEach(l=>{l(n,{get width(){return Oj(n,a)},get height(){return zj(n,a)}})})}function Vj(n){n.forEach(_j)}function Bj(){typeof ResizeObserver>"u"||(hr=new ResizeObserver(Vj))}function Lj(n,a){hr||Bj();const s=Z0(n);return s.forEach(l=>{let u=Xl.get(l);u||(u=new Set,Xl.set(l,u)),u.add(a),hr==null||hr.observe(l)}),()=>{s.forEach(l=>{const u=Xl.get(l);u==null||u.delete(a),u!=null&&u.size||hr==null||hr.unobserve(l)})}}const Pl=new Set;let Va;function Uj(){Va=()=>{const n={get width(){return window.innerWidth},get height(){return window.innerHeight}};Pl.forEach(a=>a(n))},window.addEventListener("resize",Va)}function Hj(n){return Pl.add(n),Va||Uj(),()=>{Pl.delete(n),!Pl.size&&typeof Va=="function"&&(window.removeEventListener("resize",Va),Va=void 0)}}function xy(n,a){return typeof n=="function"?Hj(n):Lj(n,a)}function qj(n){return Sf(n)&&n.tagName==="svg"}const Yj=[...F0,rt,ln],Gj=n=>Yj.find(P0(n)),by=()=>({translate:0,scale:1,origin:0,originPoint:0}),Ba=()=>({x:by(),y:by()}),Sy=()=>({min:0,max:0}),it=()=>({x:Sy(),y:Sy()}),Xj=new WeakMap;function go(n){return n!==null&&typeof n=="object"&&typeof n.start=="function"}function es(n){return typeof n=="string"||Array.isArray(n)}const wf=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],jf=["initial",...wf];function yo(n){return go(n.animate)||jf.some(a=>es(n[a]))}function ex(n){return!!(yo(n)||n.variants)}function Pj(n,a,s){for(const l in a){const u=a[l],h=s[l];if(pt(u))n.addValue(l,u);else if(pt(h))n.addValue(l,qa(u,{owner:n}));else if(h!==u)if(n.hasValue(l)){const f=n.getValue(l);f.liveStyle===!0?f.jump(u):f.hasAnimated||f.set(u)}else{const f=n.getStaticValue(l);n.addValue(l,qa(f!==void 0?f:u,{owner:n}))}}for(const l in s)a[l]===void 0&&n.removeValue(l);return a}const ao={current:null},Ef={current:!1},Fj=typeof window<"u";function tx(){if(Ef.current=!0,!!Fj)if(window.matchMedia){const n=window.matchMedia("(prefers-reduced-motion)"),a=()=>ao.current=n.matches;n.addEventListener("change",a),a()}else ao.current=!1}const wy=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"];let io={};function nx(n){io=n}function $j(){return io}class Kj{scrapeMotionValuesFromProps(a,s,l){return{}}constructor({parent:a,props:s,presenceContext:l,reducedMotionConfig:u,skipAnimations:h,blockInitialAnimation:f,visualState:m},g={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.shouldSkipAnimations=!1,this.values=new Map,this.KeyframeResolver=hf,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.hasBeenMounted=!1,this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{const j=xt.now();this.renderScheduledAt<j&&(this.renderScheduledAt=j,Ye.render(this.render,!1,!0))};const{latestValues:p,renderState:v}=m;this.latestValues=p,this.baseTarget={...p},this.initialValues=s.initial?{...p}:{},this.renderState=v,this.parent=a,this.props=s,this.presenceContext=l,this.depth=a?a.depth+1:0,this.reducedMotionConfig=u,this.skipAnimationsConfig=h,this.options=g,this.blockInitialAnimation=!!f,this.isControllingVariants=yo(s),this.isVariantNode=ex(s),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(a&&a.current);const{willChange:x,...b}=this.scrapeMotionValuesFromProps(s,{},this);for(const j in b){const E=b[j];p[j]!==void 0&&pt(E)&&E.set(p[j])}}mount(a){var s,l;if(this.hasBeenMounted)for(const u in this.initialValues)(s=this.values.get(u))==null||s.jump(this.initialValues[u]),this.latestValues[u]=this.initialValues[u];this.current=a,Xj.set(a,this),this.projection&&!this.projection.instance&&this.projection.mount(a),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((u,h)=>this.bindToMotionValue(h,u)),this.reducedMotionConfig==="never"?this.shouldReduceMotion=!1:this.reducedMotionConfig==="always"?this.shouldReduceMotion=!0:(Ef.current||tx(),this.shouldReduceMotion=ao.current),this.shouldSkipAnimations=this.skipAnimationsConfig??!1,(l=this.parent)==null||l.addChild(this),this.update(this.props,this.presenceContext),this.hasBeenMounted=!0}unmount(){var a;this.projection&&this.projection.unmount(),yr(this.notifyUpdate),yr(this.render),this.valueSubscriptions.forEach(s=>s()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),(a=this.parent)==null||a.removeChild(this);for(const s in this.events)this.events[s].clear();for(const s in this.features){const l=this.features[s];l&&(l.unmount(),l.isMounted=!1)}this.current=null}addChild(a){this.children.add(a),this.enteringChildren??(this.enteringChildren=new Set),this.enteringChildren.add(a)}removeChild(a){this.children.delete(a),this.enteringChildren&&this.enteringChildren.delete(a)}bindToMotionValue(a,s){if(this.valueSubscriptions.has(a)&&this.valueSubscriptions.get(a)(),s.accelerate&&B0.has(a)&&this.current instanceof HTMLElement){const{factory:f,keyframes:m,times:g,ease:p,duration:v}=s.accelerate,x=new _0({element:this.current,name:a,keyframes:m,times:g,ease:p,duration:Ht(v)}),b=f(x);this.valueSubscriptions.set(a,()=>{b(),x.cancel()});return}const l=Pa.has(a);l&&this.onBindTransform&&this.onBindTransform();const u=s.on("change",f=>{this.latestValues[a]=f,this.props.onUpdate&&Ye.preRender(this.notifyUpdate),l&&this.projection&&(this.projection.isTransformDirty=!0),this.scheduleRender()});let h;typeof window<"u"&&window.MotionCheckAppearSync&&(h=window.MotionCheckAppearSync(this,a,s)),this.valueSubscriptions.set(a,()=>{u(),h&&h()})}sortNodePosition(a){return!this.current||!this.sortInstanceNodePosition||this.type!==a.type?0:this.sortInstanceNodePosition(this.current,a.current)}updateFeatures(){let a="animation";for(a in io){const s=io[a];if(!s)continue;const{isEnabled:l,Feature:u}=s;if(!this.features[a]&&u&&l(this.props)&&(this.features[a]=new u(this)),this.features[a]){const h=this.features[a];h.isMounted?h.update():(h.mount(),h.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):it()}getStaticValue(a){return this.latestValues[a]}setStaticValue(a,s){this.latestValues[a]=s}update(a,s){(a.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=a,this.prevPresenceContext=this.presenceContext,this.presenceContext=s;for(let l=0;l<wy.length;l++){const u=wy[l];this.propEventSubscriptions[u]&&(this.propEventSubscriptions[u](),delete this.propEventSubscriptions[u]);const h="on"+u,f=a[h];f&&(this.propEventSubscriptions[u]=this.on(u,f))}this.prevMotionValues=Pj(this,this.scrapeMotionValuesFromProps(a,this.prevProps||{},this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue()}getProps(){return this.props}getVariant(a){return this.props.variants?this.props.variants[a]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(a){const s=this.getClosestVariantNode();if(s)return s.variantChildren&&s.variantChildren.add(a),()=>s.variantChildren.delete(a)}addValue(a,s){const l=this.values.get(a);s!==l&&(l&&this.removeValue(a),this.bindToMotionValue(a,s),this.values.set(a,s),this.latestValues[a]=s.get())}removeValue(a){this.values.delete(a);const s=this.valueSubscriptions.get(a);s&&(s(),this.valueSubscriptions.delete(a)),delete this.latestValues[a],this.removeValueFromRenderState(a,this.renderState)}hasValue(a){return this.values.has(a)}getValue(a,s){if(this.props.values&&this.props.values[a])return this.props.values[a];let l=this.values.get(a);return l===void 0&&s!==void 0&&(l=qa(s===null?void 0:s,{owner:this}),this.addValue(a,l)),l}readValue(a,s){let l=this.latestValues[a]!==void 0||!this.current?this.latestValues[a]:this.getBaseTargetFromProps(this.props,a)??this.readValueFromInstance(this.current,a,this.options);return l!=null&&(typeof l=="string"&&(t0(l)||r0(l))?l=parseFloat(l):!Gj(l)&&ln.test(s)&&(l=K0(a,s)),this.setBaseTarget(a,pt(l)?l.get():l)),pt(l)?l.get():l}setBaseTarget(a,s){this.baseTarget[a]=s}getBaseTarget(a){var h;const{initial:s}=this.props;let l;if(typeof s=="string"||typeof s=="object"){const f=gf(this.props,s,(h=this.presenceContext)==null?void 0:h.custom);f&&(l=f[a])}if(s&&l!==void 0)return l;const u=this.getBaseTargetFromProps(this.props,a);return u!==void 0&&!pt(u)?u:this.initialValues[a]!==void 0&&l===void 0?void 0:this.baseTarget[a]}on(a,s){return this.events[a]||(this.events[a]=new rf),this.events[a].add(s)}notify(a,...s){this.events[a]&&this.events[a].notify(...s)}scheduleRenderMicrotask(){xf.render(this.render)}}class rx extends Kj{constructor(){super(...arguments),this.KeyframeResolver=jj}sortInstanceNodePosition(a,s){return a.compareDocumentPosition(s)&2?1:-1}getBaseTargetFromProps(a,s){const l=a.style;return l?l[s]:void 0}removeValueFromRenderState(a,{vars:s,style:l}){delete s[a],delete l[a]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);const{children:a}=this.props;pt(a)&&(this.childSubscription=a.on("change",s=>{this.current&&(this.current.textContent=`${s}`)}))}}class xr{constructor(a){this.isMounted=!1,this.node=a}update(){}}function ax({top:n,left:a,right:s,bottom:l}){return{x:{min:a,max:s},y:{min:n,max:l}}}function Zj({x:n,y:a}){return{top:a.min,right:n.max,bottom:a.max,left:n.min}}function Qj(n,a){if(!a)return n;const s=a({x:n.left,y:n.top}),l=a({x:n.right,y:n.bottom});return{top:s.y,left:s.x,bottom:l.y,right:l.x}}function Zu(n){return n===void 0||n===1}function Rd({scale:n,scaleX:a,scaleY:s}){return!Zu(n)||!Zu(a)||!Zu(s)}function Ur(n){return Rd(n)||ix(n)||n.z||n.rotate||n.rotateX||n.rotateY||n.skewX||n.skewY}function ix(n){return jy(n.x)||jy(n.y)}function jy(n){return n&&n!=="0%"}function so(n,a,s){const l=n-s,u=a*l;return s+u}function Ey(n,a,s,l,u){return u!==void 0&&(n=so(n,u,l)),so(n,s,l)+a}function Od(n,a=0,s=1,l,u){n.min=Ey(n.min,a,s,l,u),n.max=Ey(n.max,a,s,l,u)}function sx(n,{x:a,y:s}){Od(n.x,a.translate,a.scale,a.originPoint),Od(n.y,s.translate,s.scale,s.originPoint)}const Ty=.999999999999,Cy=1.0000000000001;function Jj(n,a,s,l=!1){var m;const u=s.length;if(!u)return;a.x=a.y=1;let h,f;for(let g=0;g<u;g++){h=s[g],f=h.projectionDelta;const{visualElement:p}=h.options;p&&p.props.style&&p.props.style.display==="contents"||(l&&h.options.layoutScroll&&h.scroll&&h!==h.root&&(gn(n.x,-h.scroll.offset.x),gn(n.y,-h.scroll.offset.y)),f&&(a.x*=f.x.scale,a.y*=f.y.scale,sx(n,f)),l&&Ur(h.latestValues)&&Fl(n,h.latestValues,(m=h.layout)==null?void 0:m.layoutBox))}a.x<Cy&&a.x>Ty&&(a.x=1),a.y<Cy&&a.y>Ty&&(a.y=1)}function gn(n,a){n.min+=a,n.max+=a}function Ny(n,a,s,l,u=.5){const h=qe(n.min,n.max,u);Od(n,a,s,h,l)}function Ay(n,a){return typeof n=="string"?parseFloat(n)/100*(a.max-a.min):n}function Fl(n,a,s){const l=s??n;Ny(n.x,Ay(a.x,l.x),a.scaleX,a.scale,a.originX),Ny(n.y,Ay(a.y,l.y),a.scaleY,a.scale,a.originY)}function lx(n,a){return ax(Qj(n.getBoundingClientRect(),a))}function Wj(n,a,s){const l=lx(n,s),{scroll:u}=a;return u&&(gn(l.x,u.offset.x),gn(l.y,u.offset.y)),l}const Ij={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},eE=Xa.length;function tE(n,a,s){let l="",u=!0;for(let f=0;f<eE;f++){const m=Xa[f],g=n[m];if(g===void 0)continue;let p=!0;if(typeof g=="number")p=g===(m.startsWith("scale")?1:0);else{const v=parseFloat(g);p=m.startsWith("scale")?v===1:v===0}if(!p||s){const v=kd(g,ro[m]);if(!p){u=!1;const x=Ij[m]||m;l+=`${x}(${v}) `}s&&(a[m]=v)}}const h=n.pathRotation;return h&&(u=!1,l+=`rotate(${kd(h,ro.pathRotation)}) `),l=l.trim(),s?l=s(a,u?"":l):u&&(l="none"),l}function Tf(n,a,s){const{style:l,vars:u,transformOrigin:h}=n;let f=!1,m=!1;for(const g in a){const p=a[g];if(Pa.has(g)){f=!0;continue}else if(v0(g)){u[g]=p;continue}else{const v=kd(p,ro[g]);g.startsWith("origin")?(m=!0,h[g]=v):l[g]=v}}if(a.transform||(f||s?l.transform=tE(a,n.transform,s):l.transform&&(l.transform="none")),m){const{originX:g="50%",originY:p="50%",originZ:v=0}=h;l.transformOrigin=`${g} ${p} ${v}`}}function ox(n,{style:a,vars:s},l,u){const h=n.style;let f;for(f in a)h[f]=a[f];u==null||u.applyProjectionStyles(h,l);for(f in s)h.setProperty(f,s[f])}function Dy(n,a){return a.max===a.min?0:n/(a.max-a.min)*100}const Gi={correct:(n,a)=>{if(!a.target)return n;if(typeof n=="string")if(fe.test(n))n=parseFloat(n);else return n;const s=Dy(n,a.target.x),l=Dy(n,a.target.y);return`${s}% ${l}%`}},nE={correct:(n,{treeScale:a,projectionDelta:s})=>{const l=n,u=ln.parse(n);if(u.length>5)return l;const h=ln.createTransformer(n),f=typeof u[0]!="number"?1:0,m=s.x.scale*a.x,g=s.y.scale*a.y;u[0+f]/=m,u[1+f]/=g;const p=qe(m,g,.5);return typeof u[2+f]=="number"&&(u[2+f]/=p),typeof u[3+f]=="number"&&(u[3+f]/=p),h(u)}},zd={borderRadius:{...Gi,applyTo:[...vf]},borderTopLeftRadius:Gi,borderTopRightRadius:Gi,borderBottomLeftRadius:Gi,borderBottomRightRadius:Gi,boxShadow:nE};function cx(n,{layout:a,layoutId:s}){return Pa.has(n)||n.startsWith("origin")||(a||s!==void 0)&&(!!zd[n]||n==="opacity")}function Cf(n,a,s){var f;const l=n.style,u=a==null?void 0:a.style,h={};if(!l)return h;for(const m in l)(pt(l[m])||u&&pt(u[m])||cx(m,n)||((f=s==null?void 0:s.getValue(m))==null?void 0:f.liveStyle)!==void 0)&&(h[m]=l[m]);return h}function rE(n){return window.getComputedStyle(n)}class aE extends rx{constructor(){super(...arguments),this.type="html",this.renderInstance=ox}mount(a){mo(!!a.style),super.mount(a)}readValueFromInstance(a,s){var l;if(Pa.has(s))return(l=this.projection)!=null&&l.isProjecting?bd(s):Tw(a,s);{const u=rE(a),h=(v0(s)?u.getPropertyValue(s):u[s])||0;return typeof h=="string"?h.trim():h}}measureInstanceViewportBox(a,{transformPagePoint:s}){return lx(a,s)}build(a,s,l){Tf(a,s,l.transformTemplate)}scrapeMotionValuesFromProps(a,s,l){return Cf(a,s,l)}}const iE={offset:"stroke-dashoffset",array:"stroke-dasharray"},sE={offset:"strokeDashoffset",array:"strokeDasharray"};function lE(n,a,s=1,l=0,u=!0){n.pathLength=1;const h=u?iE:sE;n[h.offset]=`${-l}`,n[h.array]=`${a} ${s}`}const oE=["offsetDistance","offsetPath","offsetRotate","offsetAnchor"];function ux(n,{attrX:a,attrY:s,attrScale:l,pathLength:u,pathSpacing:h=1,pathOffset:f=0,...m},g,p,v){if(Tf(n,m,p),g){n.style.viewBox&&(n.attrs.viewBox=n.style.viewBox);return}n.attrs=n.style,n.style={};const{attrs:x,style:b}=n;x.transform&&(b.transform=x.transform,delete x.transform),(b.transform||x.transformOrigin)&&(b.transformOrigin=x.transformOrigin??"50% 50%",delete x.transformOrigin),b.transform&&(b.transformBox=(v==null?void 0:v.transformBox)??"fill-box",delete x.transformBox);for(const j of oE)x[j]!==void 0&&(b[j]=x[j],delete x[j]);a!==void 0&&(x.x=a),s!==void 0&&(x.y=s),l!==void 0&&(x.scale=l),u!==void 0&&lE(x,u,h,f,!1)}const dx=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]),fx=n=>typeof n=="string"&&n.toLowerCase()==="svg";function cE(n,a,s,l){ox(n,a,void 0,l);for(const u in a.attrs)n.setAttribute(dx.has(u)?u:yf(u),a.attrs[u])}function hx(n,a,s){const l=Cf(n,a,s);for(const u in n)if(pt(n[u])||pt(a[u])){const h=Xa.indexOf(u)!==-1?"attr"+u.charAt(0).toUpperCase()+u.substring(1):u;l[h]=n[u]}return l}class uE extends rx{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1,this.measureInstanceViewportBox=it}getBaseTargetFromProps(a,s){return a[s]}readValueFromInstance(a,s){if(Pa.has(s)){const l=$0(s);return l&&l.default||0}return s=dx.has(s)?s:yf(s),a.getAttribute(s)}scrapeMotionValuesFromProps(a,s,l){return hx(a,s,l)}build(a,s,l){ux(a,s,this.isSVGTag,l.transformTemplate,l.style)}renderInstance(a,s,l,u){cE(a,s,l,u)}mount(a){this.isSVGTag=fx(a.tagName),super.mount(a)}}const dE=jf.length;function mx(n){if(!n)return;if(!n.isControllingVariants){const s=n.parent?mx(n.parent)||{}:{};return n.props.initial!==void 0&&(s.initial=n.props.initial),s}const a={};for(let s=0;s<dE;s++){const l=jf[s],u=n.props[l];(es(u)||u===!1)&&(a[l]=u)}return a}function px(n,a){if(!Array.isArray(a))return!1;const s=a.length;if(s!==n.length)return!1;for(let l=0;l<s;l++)if(a[l]!==n[l])return!1;return!0}const fE=[...wf].reverse(),hE=wf.length;function mE(n){return a=>Promise.all(a.map(({animation:s,options:l})=>fj(n,s,l)))}function pE(n){let a=mE(n),s=My(),l=!0,u=!1;const h=p=>(v,x)=>{var j;const b=Gr(n,x,p==="exit"?(j=n.presenceContext)==null?void 0:j.custom:void 0);if(b){const{transition:E,transitionEnd:T,...C}=b;v={...v,...C,...T}}return v};function f(p){a=p(n)}function m(p){const{props:v}=n,x=mx(n.parent)||{},b=[],j=new Set;let E={},T=1/0;for(let R=0;R<hE;R++){const k=fE[R],_=s[k],O=v[k]!==void 0?v[k]:x[k],U=es(O),P=k===p?_.isActive:null;P===!1&&(T=R);let M=O===x[k]&&O!==v[k]&&U;if(M&&(l||u)&&n.manuallyAnimateOnMount&&(M=!1),_.protectedKeys={...E},!_.isActive&&P===null||!O&&!_.prevProp||go(O)||typeof O=="boolean")continue;if(k==="exit"&&_.isActive&&P!==!0){_.prevResolvedValues&&(E={...E,..._.prevResolvedValues});continue}const D=gE(_.prevProp,O);let q=D||k===p&&_.isActive&&!M&&U||R>T&&U,$=!1;const ee=Array.isArray(O)?O:[O];let ne=ee.reduce(h(k),{});P===!1&&(ne={});const{prevResolvedValues:pe={}}=_,le={...pe,...ne},se=ae=>{q=!0,j.has(ae)&&($=!0,j.delete(ae)),_.needsAnimating[ae]=!0;const ie=n.getValue(ae);ie&&(ie.liveStyle=!1)};for(const ae in le){const ie=ne[ae],oe=pe[ae];if(E.hasOwnProperty(ae))continue;let N=!1;Cd(ie)&&Cd(oe)?N=!px(ie,oe)||D:N=ie!==oe,N?ie!=null?se(ae):j.add(ae):ie!==void 0&&j.has(ae)?se(ae):_.protectedKeys[ae]=!0}_.prevProp=O,_.prevResolvedValues=ne,_.isActive&&(E={...E,...ne}),(l||u)&&n.blockInitialAnimation&&(q=!1);const L=M&&D;q&&(!L||$)&&b.push(...ee.map(ae=>{const ie={type:k};if(typeof ae=="string"&&(l||u)&&!L&&n.manuallyAnimateOnMount&&n.parent){const{parent:oe}=n,N=Gr(oe,ae);if(oe.enteringChildren&&N){const{delayChildren:V}=N.transition||{};ie.delay=L0(oe.enteringChildren,n,V)}}return{animation:ae,options:ie}}))}if(j.size){const R={};if(typeof v.initial!="boolean"){const k=Gr(n,Array.isArray(v.initial)?v.initial[0]:v.initial);k&&k.transition&&(R.transition=k.transition)}j.forEach(k=>{const _=n.getBaseTarget(k),O=n.getValue(k);O&&(O.liveStyle=!0),R[k]=_??null}),b.push({animation:R})}let C=!!b.length;return l&&(v.initial===!1||v.initial===v.animate)&&!n.manuallyAnimateOnMount&&(C=!1),l=!1,u=!1,C?a(b):Promise.resolve()}function g(p,v){var b;if(s[p].isActive===v)return Promise.resolve();(b=n.variantChildren)==null||b.forEach(j=>{var E;return(E=j.animationState)==null?void 0:E.setActive(p,v)}),s[p].isActive=v;const x=m(p);for(const j in s)s[j].protectedKeys={};return x}return{animateChanges:m,setActive:g,setAnimateFunction:f,getState:()=>s,reset:()=>{s=My(),u=!0}}}function gE(n,a){return typeof a=="string"?a!==n:Array.isArray(a)?!px(a,n):!1}function Lr(n=!1){return{isActive:n,protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}function My(){return{animate:Lr(!0),whileInView:Lr(),whileHover:Lr(),whileTap:Lr(),whileDrag:Lr(),whileFocus:Lr(),exit:Lr()}}function _d(n,a){n.min=a.min,n.max=a.max}function rn(n,a){_d(n.x,a.x),_d(n.y,a.y)}function ky(n,a){n.translate=a.translate,n.scale=a.scale,n.originPoint=a.originPoint,n.origin=a.origin}const gx=1e-4,yE=1-gx,vE=1+gx,yx=.01,xE=0-yx,bE=0+yx;function bt(n){return n.max-n.min}function SE(n,a,s){return Math.abs(n-a)<=s}function Ry(n,a,s,l=.5){n.origin=l,n.originPoint=qe(a.min,a.max,n.origin),n.scale=bt(s)/bt(a),n.translate=qe(s.min,s.max,n.origin)-n.originPoint,(n.scale>=yE&&n.scale<=vE||isNaN(n.scale))&&(n.scale=1),(n.translate>=xE&&n.translate<=bE||isNaN(n.translate))&&(n.translate=0)}function Zi(n,a,s,l){Ry(n.x,a.x,s.x,l?l.originX:void 0),Ry(n.y,a.y,s.y,l?l.originY:void 0)}function Oy(n,a,s,l=0){const u=l?qe(s.min,s.max,l):s.min;n.min=u+a.min,n.max=n.min+bt(a)}function wE(n,a,s,l){Oy(n.x,a.x,s.x,l==null?void 0:l.x),Oy(n.y,a.y,s.y,l==null?void 0:l.y)}function zy(n,a,s,l=0){const u=l?qe(s.min,s.max,l):s.min;n.min=a.min-u,n.max=n.min+bt(a)}function lo(n,a,s,l){zy(n.x,a.x,s.x,l==null?void 0:l.x),zy(n.y,a.y,s.y,l==null?void 0:l.y)}function _y(n,a,s,l,u){return n-=a,n=so(n,1/s,l),u!==void 0&&(n=so(n,1/u,l)),n}function jE(n,a=0,s=1,l=.5,u,h=n,f=n){if(vn.test(a)&&(a=parseFloat(a),a=qe(f.min,f.max,a/100)-f.min),typeof a!="number")return;let m=qe(h.min,h.max,l);n===h&&(m-=a),n.min=_y(n.min,a,s,m,u),n.max=_y(n.max,a,s,m,u)}function Vy(n,a,[s,l,u],h,f){jE(n,a[s],a[l],a[u],a.scale,h,f)}const EE=["x","scaleX","originX"],TE=["y","scaleY","originY"];function By(n,a,s,l){Vy(n.x,a,EE,s?s.x:void 0,l?l.x:void 0),Vy(n.y,a,TE,s?s.y:void 0,l?l.y:void 0)}function Ly(n){return n.translate===0&&n.scale===1}function vx(n){return Ly(n.x)&&Ly(n.y)}function Uy(n,a){return n.min===a.min&&n.max===a.max}function CE(n,a){return Uy(n.x,a.x)&&Uy(n.y,a.y)}function Hy(n,a){return Math.round(n.min)===Math.round(a.min)&&Math.round(n.max)===Math.round(a.max)}function xx(n,a){return Hy(n.x,a.x)&&Hy(n.y,a.y)}function qy(n){return bt(n.x)/bt(n.y)}function Yy(n,a){return n.translate===a.translate&&n.scale===a.scale&&n.originPoint===a.originPoint}function pn(n){return[n("x"),n("y")]}function NE(n,a,s){let l="";const u=n.x.translate/a.x,h=n.y.translate/a.y,f=(s==null?void 0:s.z)||0;if((u||h||f)&&(l=`translate3d(${u}px, ${h}px, ${f}px) `),(a.x!==1||a.y!==1)&&(l+=`scale(${1/a.x}, ${1/a.y}) `),s){const{transformPerspective:p,rotate:v,pathRotation:x,rotateX:b,rotateY:j,skewX:E,skewY:T}=s;p&&(l=`perspective(${p}px) ${l}`),v&&(l+=`rotate(${v}deg) `),x&&(l+=`rotate(${x}deg) `),b&&(l+=`rotateX(${b}deg) `),j&&(l+=`rotateY(${j}deg) `),E&&(l+=`skewX(${E}deg) `),T&&(l+=`skewY(${T}deg) `)}const m=n.x.scale*a.x,g=n.y.scale*a.y;return(m!==1||g!==1)&&(l+=`scale(${m}, ${g})`),l||"none"}const AE=vf.length,Gy=n=>typeof n=="string"?parseFloat(n):n,Xy=n=>typeof n=="number"||fe.test(n);function DE(n,a,s,l,u,h){u?(n.opacity=qe(0,s.opacity??1,ME(l)),n.opacityExit=qe(a.opacity??1,0,kE(l))):h&&(n.opacity=qe(a.opacity??1,s.opacity??1,l));for(let f=0;f<AE;f++){const m=vf[f];let g=Py(a,m),p=Py(s,m);if(g===void 0&&p===void 0)continue;g||(g=0),p||(p=0),g===0||p===0||Xy(g)===Xy(p)?(n[m]=Math.max(qe(Gy(g),Gy(p),l),0),(vn.test(p)||vn.test(g))&&(n[m]+="%")):n[m]=p}(a.rotate||s.rotate)&&(n.rotate=qe(a.rotate||0,s.rotate||0,l))}function Py(n,a){return n[a]!==void 0?n[a]:n.borderRadius}const ME=bx(0,.5,f0),kE=bx(.5,.95,It);function bx(n,a,s){return l=>l<n?0:l>a?1:s(Wi(n,a,l))}function RE(n,a,s){const l=pt(n)?n:qa(n);return l.start(pf("",l,a,s)),l.animation}function ts(n,a,s,l={passive:!0}){return n.addEventListener(a,s,l),()=>n.removeEventListener(a,s,l)}const OE=(n,a)=>n.depth-a.depth;class zE{constructor(){this.children=[],this.isDirty=!1}add(a){nf(this.children,a),this.isDirty=!0}remove(a){Wl(this.children,a),this.isDirty=!0}forEach(a){this.isDirty&&this.children.sort(OE),this.isDirty=!1,this.children.forEach(a)}}function _E(n,a){const s=xt.now(),l=({timestamp:u})=>{const h=u-s;h>=a&&(yr(l),n(h-a))};return Ye.setup(l,!0),()=>yr(l)}function $l(n){return pt(n)?n.get():n}class VE{constructor(){this.members=[]}add(a){nf(this.members,a);for(let s=this.members.length-1;s>=0;s--){const l=this.members[s];if(l===a||l===this.lead||l===this.prevLead)continue;const u=l.instance;(!u||u.isConnected===!1)&&!l.snapshot&&(Wl(this.members,l),l.unmount())}a.scheduleRender()}remove(a){if(Wl(this.members,a),a===this.prevLead&&(this.prevLead=void 0),a===this.lead){const s=this.members[this.members.length-1];s&&this.promote(s)}}relegate(a){var s;for(let l=this.members.indexOf(a)-1;l>=0;l--){const u=this.members[l];if(u.isPresent!==!1&&((s=u.instance)==null?void 0:s.isConnected)!==!1)return this.promote(u),!0}return!1}promote(a,s){var u;const l=this.lead;if(a!==l&&(this.prevLead=l,this.lead=a,a.show(),l)){l.updateSnapshot(),a.scheduleRender();const{layoutDependency:h}=l.options,{layoutDependency:f}=a.options;(h===void 0||h!==f)&&(a.resumeFrom=l,s&&(l.preserveOpacity=!0),l.snapshot&&(a.snapshot=l.snapshot,a.snapshot.latestValues=l.animationValues||l.latestValues),(u=a.root)!=null&&u.isUpdating&&(a.isLayoutDirty=!0)),a.options.crossfade===!1&&l.hide()}}exitAnimationComplete(){this.members.forEach(a=>{var s,l,u,h,f;(l=(s=a.options).onExitComplete)==null||l.call(s),(f=(u=a.resumingFrom)==null?void 0:(h=u.options).onExitComplete)==null||f.call(h)})}scheduleRender(){this.members.forEach(a=>a.instance&&a.scheduleRender(!1))}removeLeadSnapshot(){var a;(a=this.lead)!=null&&a.snapshot&&(this.lead.snapshot=void 0)}}const Kl={hasAnimatedSinceResize:!0,hasEverUpdated:!1},Qu=["","X","Y","Z"],BE=1e3;let LE=0;function Ju(n,a,s,l){const{latestValues:u}=a;u[n]&&(s[n]=u[n],a.setStaticValue(n,0),l&&(l[n]=0))}function Sx(n){if(n.hasCheckedOptimisedAppear=!0,n.root===n)return;const{visualElement:a}=n.options;if(!a)return;const s=G0(a);if(window.MotionHasOptimisedAnimation(s,"transform")){const{layout:u,layoutId:h}=n.options;window.MotionCancelOptimisedAnimation(s,"transform",Ye,!(u||h))}const{parent:l}=n;l&&!l.hasCheckedOptimisedAppear&&Sx(l)}function wx({attachResizeListener:n,defaultParent:a,measureScroll:s,checkIsScrollRoot:l,resetTransform:u}){return class{constructor(f={},m=a==null?void 0:a()){this.id=LE++,this.animationId=0,this.animationCommitId=0,this.children=new Set,this.options={},this.isTreeAnimating=!1,this.isAnimationBlocked=!1,this.isLayoutDirty=!1,this.isProjectionDirty=!1,this.isSharedProjectionDirty=!1,this.isTransformDirty=!1,this.updateManuallyBlocked=!1,this.updateBlockedByResize=!1,this.isUpdating=!1,this.isSVG=!1,this.needsReset=!1,this.shouldResetTransform=!1,this.hasCheckedOptimisedAppear=!1,this.treeScale={x:1,y:1},this.eventHandlers=new Map,this.hasTreeAnimated=!1,this.layoutVersion=0,this.updateScheduled=!1,this.scheduleUpdate=()=>this.update(),this.projectionUpdateScheduled=!1,this.checkUpdateFailed=()=>{this.isUpdating&&(this.isUpdating=!1,this.clearAllSnapshots())},this.updateProjection=()=>{this.projectionUpdateScheduled=!1,this.nodes.forEach(qE),this.nodes.forEach($E),this.nodes.forEach(KE),this.nodes.forEach(YE)},this.resolvedRelativeTargetAt=0,this.linkedParentVersion=0,this.hasProjected=!1,this.isVisible=!0,this.animationProgress=0,this.sharedNodes=new Map,this.latestValues=f,this.root=m?m.root||m:this,this.path=m?[...m.path,m]:[],this.parent=m,this.depth=m?m.depth+1:0;for(let g=0;g<this.path.length;g++)this.path[g].shouldResetTransform=!0;this.root===this&&(this.nodes=new zE)}addEventListener(f,m){return this.eventHandlers.has(f)||this.eventHandlers.set(f,new rf),this.eventHandlers.get(f).add(m)}notifyListeners(f,...m){const g=this.eventHandlers.get(f);g&&g.notify(...m)}hasListeners(f){return this.eventHandlers.has(f)}mount(f){if(this.instance)return;this.isSVG=Sf(f)&&!qj(f),this.instance=f;const{layoutId:m,layout:g,visualElement:p}=this.options;if(p&&!p.current&&p.mount(f),this.root.nodes.add(this),this.parent&&this.parent.children.add(this),this.root.hasTreeAnimated&&(g||m)&&(this.isLayoutDirty=!0),n){let v,x=0;const b=()=>this.root.updateBlockedByResize=!1;Ye.read(()=>{x=window.innerWidth}),n(f,()=>{const j=window.innerWidth;j!==x&&(x=j,this.root.updateBlockedByResize=!0,v&&v(),v=_E(b,250),Kl.hasAnimatedSinceResize&&(Kl.hasAnimatedSinceResize=!1,this.nodes.forEach(Ky)))})}m&&this.root.registerSharedNode(m,this),this.options.animate!==!1&&p&&(m||g)&&this.addEventListener("didUpdate",({delta:v,hasLayoutChanged:x,hasRelativeLayoutChanged:b,layout:j})=>{if(this.isTreeAnimationBlocked()){this.target=void 0,this.relativeTarget=void 0;return}const E=this.options.transition||p.getDefaultTransition()||IE,{onLayoutAnimationStart:T,onLayoutAnimationComplete:C}=p.getProps(),R=!this.targetLayout||!xx(this.targetLayout,j),k=!x&&b;if(this.options.layoutRoot||this.resumeFrom||k||x&&(R||!this.currentAnimation)){this.resumeFrom&&(this.resumingFrom=this.resumeFrom,this.resumingFrom.resumingFrom=void 0);const _={...mf(E,"layout"),onPlay:T,onComplete:C};(p.shouldReduceMotion||this.options.layoutRoot)&&(_.delay=0,_.type=!1),this.startAnimation(_),this.setAnimationOrigin(v,k,_.path)}else x||Ky(this),this.isLead()&&this.options.onExitComplete&&this.options.onExitComplete();this.targetLayout=j})}unmount(){this.options.layoutId&&this.willUpdate(),this.root.nodes.remove(this);const f=this.getStack();f&&f.remove(this),this.parent&&this.parent.children.delete(this),this.instance=void 0,this.eventHandlers.clear(),yr(this.updateProjection)}blockUpdate(){this.updateManuallyBlocked=!0}unblockUpdate(){this.updateManuallyBlocked=!1}isUpdateBlocked(){return this.updateManuallyBlocked||this.updateBlockedByResize}isTreeAnimationBlocked(){return this.isAnimationBlocked||this.parent&&this.parent.isTreeAnimationBlocked()||!1}startUpdate(){this.isUpdateBlocked()||(this.isUpdating=!0,this.nodes&&this.nodes.forEach(ZE),this.animationId++)}getTransformTemplate(){const{visualElement:f}=this.options;return f&&f.getProps().transformTemplate}willUpdate(f=!0){if(this.root.hasTreeAnimated=!0,this.root.isUpdateBlocked()){this.options.onExitComplete&&this.options.onExitComplete();return}if(window.MotionCancelOptimisedAnimation&&!this.hasCheckedOptimisedAppear&&Sx(this),!this.root.isUpdating&&this.root.startUpdate(),this.isLayoutDirty)return;this.isLayoutDirty=!0;for(let v=0;v<this.path.length;v++){const x=this.path[v];x.shouldResetTransform=!0,(typeof x.latestValues.x=="string"||typeof x.latestValues.y=="string")&&(x.isLayoutDirty=!0),x.updateScroll("snapshot"),x.options.layoutRoot&&x.willUpdate(!1)}const{layoutId:m,layout:g}=this.options;if(m===void 0&&!g)return;const p=this.getTransformTemplate();this.prevTransformTemplateValue=p?p(this.latestValues,""):void 0,this.updateSnapshot(),f&&this.notifyListeners("willUpdate")}update(){if(this.updateScheduled=!1,this.isUpdateBlocked()){const g=this.updateBlockedByResize;this.unblockUpdate(),this.updateBlockedByResize=!1,this.clearAllSnapshots(),g&&this.nodes.forEach(XE),this.nodes.forEach(Fy);return}if(this.animationId<=this.animationCommitId){this.nodes.forEach($y);return}this.animationCommitId=this.animationId,this.isUpdating?(this.isUpdating=!1,this.nodes.forEach(PE),this.nodes.forEach(FE),this.nodes.forEach(UE),this.nodes.forEach(HE)):this.nodes.forEach($y),this.clearAllSnapshots();const m=xt.now();mt.delta=xn(0,1e3/60,m-mt.timestamp),mt.timestamp=m,mt.isProcessing=!0,Yu.update.process(mt),Yu.preRender.process(mt),Yu.render.process(mt),mt.isProcessing=!1}didUpdate(){this.updateScheduled||(this.updateScheduled=!0,xf.read(this.scheduleUpdate))}clearAllSnapshots(){this.nodes.forEach(GE),this.sharedNodes.forEach(QE)}scheduleUpdateProjection(){this.projectionUpdateScheduled||(this.projectionUpdateScheduled=!0,Ye.preRender(this.updateProjection,!1,!0))}scheduleCheckAfterUnmount(){Ye.postRender(()=>{this.isLayoutDirty?this.root.didUpdate():this.root.checkUpdateFailed()})}updateSnapshot(){this.snapshot||!this.instance||(this.snapshot=this.measure(),this.snapshot&&!bt(this.snapshot.measuredBox.x)&&!bt(this.snapshot.measuredBox.y)&&(this.snapshot=void 0))}updateLayout(){if(!this.instance||(this.updateScroll(),!(this.options.alwaysMeasureLayout&&this.isLead())&&!this.isLayoutDirty))return;if(this.resumeFrom&&!this.resumeFrom.instance)for(let g=0;g<this.path.length;g++)this.path[g].updateScroll();const f=this.layout;this.layout=this.measure(!1),this.layoutVersion++,this.layoutCorrected||(this.layoutCorrected=it()),this.isLayoutDirty=!1,this.projectionDelta=void 0,this.notifyListeners("measure",this.layout.layoutBox);const{visualElement:m}=this.options;m&&m.notify("LayoutMeasure",this.layout.layoutBox,f?f.layoutBox:void 0)}updateScroll(f="measure"){let m=!!(this.options.layoutScroll&&this.instance);if(this.scroll&&this.scroll.animationId===this.root.animationId&&this.scroll.phase===f&&(m=!1),m&&this.instance){const g=l(this.instance);this.scroll={animationId:this.root.animationId,phase:f,isRoot:g,offset:s(this.instance),wasRoot:this.scroll?this.scroll.isRoot:g}}}resetTransform(){if(!u)return;const f=this.isLayoutDirty||this.shouldResetTransform||this.options.alwaysMeasureLayout,m=this.projectionDelta&&!vx(this.projectionDelta),g=this.getTransformTemplate(),p=g?g(this.latestValues,""):void 0,v=p!==this.prevTransformTemplateValue;f&&this.instance&&(m||Ur(this.latestValues)||v)&&(u(this.instance,p),this.shouldResetTransform=!1,this.scheduleRender())}measure(f=!0){const m=this.measurePageBox();let g=this.removeElementScroll(m);return f&&(g=this.removeTransform(g)),eT(g),{animationId:this.root.animationId,measuredBox:m,layoutBox:g,latestValues:{},source:this.id}}measurePageBox(){var p;const{visualElement:f}=this.options;if(!f)return it();const m=f.measureViewportBox();if(!(((p=this.scroll)==null?void 0:p.wasRoot)||this.path.some(tT))){const{scroll:v}=this.root;v&&(gn(m.x,v.offset.x),gn(m.y,v.offset.y))}return m}removeElementScroll(f){var g;const m=it();if(rn(m,f),(g=this.scroll)!=null&&g.wasRoot)return m;for(let p=0;p<this.path.length;p++){const v=this.path[p],{scroll:x,options:b}=v;v!==this.root&&x&&b.layoutScroll&&(x.wasRoot&&rn(m,f),gn(m.x,x.offset.x),gn(m.y,x.offset.y))}return m}applyTransform(f,m=!1,g){var v,x;const p=g||it();rn(p,f);for(let b=0;b<this.path.length;b++){const j=this.path[b];!m&&j.options.layoutScroll&&j.scroll&&j!==j.root&&(gn(p.x,-j.scroll.offset.x),gn(p.y,-j.scroll.offset.y)),Ur(j.latestValues)&&Fl(p,j.latestValues,(v=j.layout)==null?void 0:v.layoutBox)}return Ur(this.latestValues)&&Fl(p,this.latestValues,(x=this.layout)==null?void 0:x.layoutBox),p}removeTransform(f){var g;const m=it();rn(m,f);for(let p=0;p<this.path.length;p++){const v=this.path[p];if(!Ur(v.latestValues))continue;let x;v.instance&&(Rd(v.latestValues)&&v.updateSnapshot(),x=it(),rn(x,v.measurePageBox())),By(m,v.latestValues,(g=v.snapshot)==null?void 0:g.layoutBox,x)}return Ur(this.latestValues)&&By(m,this.latestValues),m}setTargetDelta(f){this.targetDelta=f,this.root.scheduleUpdateProjection(),this.isProjectionDirty=!0}setOptions(f){this.options={...this.options,...f,crossfade:f.crossfade!==void 0?f.crossfade:!0}}clearMeasurements(){this.scroll=void 0,this.layout=void 0,this.snapshot=void 0,this.prevTransformTemplateValue=void 0,this.targetDelta=void 0,this.target=void 0,this.isLayoutDirty=!1}forceRelativeParentToResolveTarget(){this.relativeParent&&this.relativeParent.resolvedRelativeTargetAt!==mt.timestamp&&this.relativeParent.resolveTargetDelta(!0)}resolveTargetDelta(f=!1){var j;const m=this.getLead();this.isProjectionDirty||(this.isProjectionDirty=m.isProjectionDirty),this.isTransformDirty||(this.isTransformDirty=m.isTransformDirty),this.isSharedProjectionDirty||(this.isSharedProjectionDirty=m.isSharedProjectionDirty);const g=!!this.resumingFrom||this!==m;if(!(f||g&&this.isSharedProjectionDirty||this.isProjectionDirty||(j=this.parent)!=null&&j.isProjectionDirty||this.attemptToResolveRelativeTarget||this.root.updateBlockedByResize))return;const{layout:v,layoutId:x}=this.options;if(!this.layout||!(v||x))return;this.resolvedRelativeTargetAt=mt.timestamp;const b=this.getClosestProjectingParent();b&&this.linkedParentVersion!==b.layoutVersion&&!b.options.layoutRoot&&this.removeRelativeTarget(),!this.targetDelta&&!this.relativeTarget&&(this.options.layoutAnchor!==!1&&b&&b.layout?this.createRelativeTarget(b,this.layout.layoutBox,b.layout.layoutBox):this.removeRelativeTarget()),!(!this.relativeTarget&&!this.targetDelta)&&(this.target||(this.target=it(),this.targetWithTransforms=it()),this.relativeTarget&&this.relativeTargetOrigin&&this.relativeParent&&this.relativeParent.target?(this.forceRelativeParentToResolveTarget(),wE(this.target,this.relativeTarget,this.relativeParent.target,this.options.layoutAnchor||void 0)):this.targetDelta?(this.resumingFrom?this.applyTransform(this.layout.layoutBox,!1,this.target):rn(this.target,this.layout.layoutBox),sx(this.target,this.targetDelta)):rn(this.target,this.layout.layoutBox),this.attemptToResolveRelativeTarget&&(this.attemptToResolveRelativeTarget=!1,this.options.layoutAnchor!==!1&&b&&!!b.resumingFrom==!!this.resumingFrom&&!b.options.layoutScroll&&b.target&&this.animationProgress!==1?this.createRelativeTarget(b,this.target,b.target):this.relativeParent=this.relativeTarget=void 0))}getClosestProjectingParent(){if(!(!this.parent||Rd(this.parent.latestValues)||ix(this.parent.latestValues)))return this.parent.isProjecting()?this.parent:this.parent.getClosestProjectingParent()}isProjecting(){return!!((this.relativeTarget||this.targetDelta||this.options.layoutRoot)&&this.layout)}createRelativeTarget(f,m,g){this.relativeParent=f,this.linkedParentVersion=f.layoutVersion,this.forceRelativeParentToResolveTarget(),this.relativeTarget=it(),this.relativeTargetOrigin=it(),lo(this.relativeTargetOrigin,m,g,this.options.layoutAnchor||void 0),rn(this.relativeTarget,this.relativeTargetOrigin)}removeRelativeTarget(){this.relativeParent=this.relativeTarget=void 0}calcProjection(){var E;const f=this.getLead(),m=!!this.resumingFrom||this!==f;let g=!0;if((this.isProjectionDirty||(E=this.parent)!=null&&E.isProjectionDirty)&&(g=!1),m&&(this.isSharedProjectionDirty||this.isTransformDirty)&&(g=!1),this.resolvedRelativeTargetAt===mt.timestamp&&(g=!1),g)return;const{layout:p,layoutId:v}=this.options;if(this.isTreeAnimating=!!(this.parent&&this.parent.isTreeAnimating||this.currentAnimation||this.pendingAnimation),this.isTreeAnimating||(this.targetDelta=this.relativeTarget=void 0),!this.layout||!(p||v))return;rn(this.layoutCorrected,this.layout.layoutBox);const x=this.treeScale.x,b=this.treeScale.y;Jj(this.layoutCorrected,this.treeScale,this.path,m),f.layout&&!f.target&&(this.treeScale.x!==1||this.treeScale.y!==1)&&(f.target=f.layout.layoutBox,f.targetWithTransforms=it());const{target:j}=f;if(!j){this.prevProjectionDelta&&(this.createProjectionDeltas(),this.scheduleRender());return}!this.projectionDelta||!this.prevProjectionDelta?this.createProjectionDeltas():(ky(this.prevProjectionDelta.x,this.projectionDelta.x),ky(this.prevProjectionDelta.y,this.projectionDelta.y)),Zi(this.projectionDelta,this.layoutCorrected,j,this.latestValues),(this.treeScale.x!==x||this.treeScale.y!==b||!Yy(this.projectionDelta.x,this.prevProjectionDelta.x)||!Yy(this.projectionDelta.y,this.prevProjectionDelta.y))&&(this.hasProjected=!0,this.scheduleRender(),this.notifyListeners("projectionUpdate",j))}hide(){this.isVisible=!1}show(){this.isVisible=!0}scheduleRender(f=!0){var m;if((m=this.options.visualElement)==null||m.scheduleRender(),f){const g=this.getStack();g&&g.scheduleRender()}this.resumingFrom&&!this.resumingFrom.instance&&(this.resumingFrom=void 0)}createProjectionDeltas(){this.prevProjectionDelta=Ba(),this.projectionDelta=Ba(),this.projectionDeltaWithTransform=Ba()}setAnimationOrigin(f,m=!1,g){const p=this.snapshot,v=p?p.latestValues:{},x={...this.latestValues},b=Ba();(!this.relativeParent||!this.relativeParent.options.layoutRoot)&&(this.relativeTarget=this.relativeTargetOrigin=void 0),this.attemptToResolveRelativeTarget=!m;const j=it(),E=p?p.source:void 0,T=this.layout?this.layout.source:void 0,C=E!==T,R=this.getStack(),k=!R||R.members.length<=1,_=!!(C&&!k&&this.options.crossfade===!0&&!this.path.some(WE));this.animationProgress=0;let O;const U=g==null?void 0:g.interpolateProjection(f);this.mixTargetDelta=P=>{const M=P/1e3,D=U==null?void 0:U(M);D?(b.x.translate=D.x,b.x.scale=qe(f.x.scale,1,M),b.x.origin=f.x.origin,b.x.originPoint=f.x.originPoint,b.y.translate=D.y,b.y.scale=qe(f.y.scale,1,M),b.y.origin=f.y.origin,b.y.originPoint=f.y.originPoint):(Zy(b.x,f.x,M),Zy(b.y,f.y,M)),this.setTargetDelta(b),this.relativeTarget&&this.relativeTargetOrigin&&this.layout&&this.relativeParent&&this.relativeParent.layout&&(lo(j,this.layout.layoutBox,this.relativeParent.layout.layoutBox,this.options.layoutAnchor||void 0),JE(this.relativeTarget,this.relativeTargetOrigin,j,M),O&&CE(this.relativeTarget,O)&&(this.isProjectionDirty=!1),O||(O=it()),rn(O,this.relativeTarget)),C&&(this.animationValues=x,DE(x,v,this.latestValues,M,_,k)),D&&D.rotate!==void 0&&(this.animationValues||(this.animationValues=x),this.animationValues.pathRotation=D.rotate),this.root.scheduleUpdateProjection(),this.scheduleRender(),this.animationProgress=M},this.mixTargetDelta(this.options.layoutRoot?1e3:0)}startAnimation(f){var m,g,p;this.notifyListeners("animationStart"),(m=this.currentAnimation)==null||m.stop(),(p=(g=this.resumingFrom)==null?void 0:g.currentAnimation)==null||p.stop(),this.pendingAnimation&&(yr(this.pendingAnimation),this.pendingAnimation=void 0),this.pendingAnimation=Ye.update(()=>{Kl.hasAnimatedSinceResize=!0,this.motionValue||(this.motionValue=qa(0)),this.motionValue.jump(0,!1),this.currentAnimation=RE(this.motionValue,[0,1e3],{...f,velocity:0,isSync:!0,onUpdate:v=>{this.mixTargetDelta(v),f.onUpdate&&f.onUpdate(v)},onComplete:()=>{f.onComplete&&f.onComplete(),this.completeAnimation()}}),this.resumingFrom&&(this.resumingFrom.currentAnimation=this.currentAnimation),this.pendingAnimation=void 0})}completeAnimation(){this.resumingFrom&&(this.resumingFrom.currentAnimation=void 0,this.resumingFrom.preserveOpacity=void 0);const f=this.getStack();f&&f.exitAnimationComplete(),this.resumingFrom=this.currentAnimation=this.animationValues=void 0,this.notifyListeners("animationComplete")}finishAnimation(){this.currentAnimation&&(this.mixTargetDelta&&this.mixTargetDelta(BE),this.currentAnimation.stop()),this.completeAnimation()}applyTransformsToTarget(){const f=this.getLead();let{targetWithTransforms:m,target:g,layout:p,latestValues:v}=f;if(!(!m||!g||!p)){if(this!==f&&this.layout&&p&&jx(this.options.animationType,this.layout.layoutBox,p.layoutBox)){g=this.target||it();const x=bt(this.layout.layoutBox.x);g.x.min=f.target.x.min,g.x.max=g.x.min+x;const b=bt(this.layout.layoutBox.y);g.y.min=f.target.y.min,g.y.max=g.y.min+b}rn(m,g),Fl(m,v),Zi(this.projectionDeltaWithTransform,this.layoutCorrected,m,v)}}registerSharedNode(f,m){this.sharedNodes.has(f)||this.sharedNodes.set(f,new VE),this.sharedNodes.get(f).add(m);const p=m.options.initialPromotionConfig;m.promote({transition:p?p.transition:void 0,preserveFollowOpacity:p&&p.shouldPreserveFollowOpacity?p.shouldPreserveFollowOpacity(m):void 0})}isLead(){const f=this.getStack();return f?f.lead===this:!0}getLead(){var m;const{layoutId:f}=this.options;return f?((m=this.getStack())==null?void 0:m.lead)||this:this}getPrevLead(){var m;const{layoutId:f}=this.options;return f?(m=this.getStack())==null?void 0:m.prevLead:void 0}getStack(){const{layoutId:f}=this.options;if(f)return this.root.sharedNodes.get(f)}promote({needsReset:f,transition:m,preserveFollowOpacity:g}={}){const p=this.getStack();p&&p.promote(this,g),f&&(this.projectionDelta=void 0,this.needsReset=!0),m&&this.setOptions({transition:m})}relegate(){const f=this.getStack();return f?f.relegate(this):!1}resetSkewAndRotation(){const{visualElement:f}=this.options;if(!f)return;let m=!1;const{latestValues:g}=f;if((g.z||g.rotate||g.rotateX||g.rotateY||g.rotateZ||g.skewX||g.skewY)&&(m=!0),!m)return;const p={};g.z&&Ju("z",f,p,this.animationValues);for(let v=0;v<Qu.length;v++)Ju(`rotate${Qu[v]}`,f,p,this.animationValues),Ju(`skew${Qu[v]}`,f,p,this.animationValues);f.render();for(const v in p)f.setStaticValue(v,p[v]),this.animationValues&&(this.animationValues[v]=p[v]);f.scheduleRender()}applyProjectionStyles(f,m){if(!this.instance||this.isSVG)return;if(!this.isVisible){f.visibility="hidden";return}const g=this.getTransformTemplate();if(this.needsReset){this.needsReset=!1,f.visibility="",f.opacity="",f.pointerEvents=$l(m==null?void 0:m.pointerEvents)||"",f.transform=g?g(this.latestValues,""):"none";return}const p=this.getLead();if(!this.projectionDelta||!this.layout||!p.target){this.options.layoutId&&(f.opacity=this.latestValues.opacity!==void 0?this.latestValues.opacity:1,f.pointerEvents=$l(m==null?void 0:m.pointerEvents)||""),this.hasProjected&&!Ur(this.latestValues)&&(f.transform=g?g({},""):"none",this.hasProjected=!1);return}f.visibility="";const v=p.animationValues||p.latestValues;this.applyTransformsToTarget();let x=NE(this.projectionDeltaWithTransform,this.treeScale,v);g&&(x=g(v,x)),f.transform=x;const{x:b,y:j}=this.projectionDelta;f.transformOrigin=`${b.origin*100}% ${j.origin*100}% 0`,p.animationValues?f.opacity=p===this?v.opacity??this.latestValues.opacity??1:this.preserveOpacity?this.latestValues.opacity:v.opacityExit:f.opacity=p===this?v.opacity!==void 0?v.opacity:"":v.opacityExit!==void 0?v.opacityExit:0;for(const E in zd){if(v[E]===void 0)continue;const{correct:T,applyTo:C,isCSSVariable:R}=zd[E],k=x==="none"?v[E]:T(v[E],p);if(C){const _=C.length;for(let O=0;O<_;O++)f[C[O]]=k}else R?this.options.visualElement.renderState.vars[E]=k:f[E]=k}this.options.layoutId&&(f.pointerEvents=p===this?$l(m==null?void 0:m.pointerEvents)||"":"none")}clearSnapshot(){this.resumeFrom=this.snapshot=void 0}resetTree(){this.root.nodes.forEach(f=>{var m;return(m=f.currentAnimation)==null?void 0:m.stop()}),this.root.nodes.forEach(Fy),this.root.sharedNodes.clear()}}}function UE(n){n.updateLayout()}function HE(n){var s;const a=((s=n.resumeFrom)==null?void 0:s.snapshot)||n.snapshot;if(n.isLead()&&n.layout&&a&&n.hasListeners("didUpdate")){const{layoutBox:l,measuredBox:u}=n.layout,{animationType:h}=n.options,f=a.source!==n.layout.source;if(h==="size")pn(x=>{const b=f?a.measuredBox[x]:a.layoutBox[x],j=bt(b);b.min=l[x].min,b.max=b.min+j});else if(h==="x"||h==="y"){const x=h==="x"?"y":"x";_d(f?a.measuredBox[x]:a.layoutBox[x],l[x])}else jx(h,a.layoutBox,l)&&pn(x=>{const b=f?a.measuredBox[x]:a.layoutBox[x],j=bt(l[x]);b.max=b.min+j,n.relativeTarget&&!n.currentAnimation&&(n.isProjectionDirty=!0,n.relativeTarget[x].max=n.relativeTarget[x].min+j)});const m=Ba();Zi(m,l,a.layoutBox);const g=Ba();f?Zi(g,n.applyTransform(u,!0),a.measuredBox):Zi(g,l,a.layoutBox);const p=!vx(m);let v=!1;if(!n.resumeFrom){const x=n.getClosestProjectingParent();if(x&&!x.resumeFrom){const{snapshot:b,layout:j}=x;if(b&&j){const E=n.options.layoutAnchor||void 0,T=it();lo(T,a.layoutBox,b.layoutBox,E);const C=it();lo(C,l,j.layoutBox,E),xx(T,C)||(v=!0),x.options.layoutRoot&&(n.relativeTarget=C,n.relativeTargetOrigin=T,n.relativeParent=x)}}}n.notifyListeners("didUpdate",{layout:l,snapshot:a,delta:g,layoutDelta:m,hasLayoutChanged:p,hasRelativeLayoutChanged:v})}else if(n.isLead()){const{onExitComplete:l}=n.options;l&&l()}n.options.transition=void 0}function qE(n){n.parent&&(n.isProjecting()||(n.isProjectionDirty=n.parent.isProjectionDirty),n.isSharedProjectionDirty||(n.isSharedProjectionDirty=!!(n.isProjectionDirty||n.parent.isProjectionDirty||n.parent.isSharedProjectionDirty)),n.isTransformDirty||(n.isTransformDirty=n.parent.isTransformDirty))}function YE(n){n.isProjectionDirty=n.isSharedProjectionDirty=n.isTransformDirty=!1}function GE(n){n.clearSnapshot()}function Fy(n){n.clearMeasurements()}function XE(n){n.isLayoutDirty=!0,n.updateLayout()}function $y(n){n.isLayoutDirty=!1}function PE(n){n.isAnimationBlocked&&n.layout&&!n.isLayoutDirty&&(n.snapshot=n.layout,n.isLayoutDirty=!0)}function FE(n){const{visualElement:a}=n.options;a&&a.getProps().onBeforeLayoutMeasure&&a.notify("BeforeLayoutMeasure"),n.resetTransform()}function Ky(n){n.finishAnimation(),n.targetDelta=n.relativeTarget=n.target=void 0,n.isProjectionDirty=!0}function $E(n){n.resolveTargetDelta()}function KE(n){n.calcProjection()}function ZE(n){n.resetSkewAndRotation()}function QE(n){n.removeLeadSnapshot()}function Zy(n,a,s){n.translate=qe(a.translate,0,s),n.scale=qe(a.scale,1,s),n.origin=a.origin,n.originPoint=a.originPoint}function Qy(n,a,s,l){n.min=qe(a.min,s.min,l),n.max=qe(a.max,s.max,l)}function JE(n,a,s,l){Qy(n.x,a.x,s.x,l),Qy(n.y,a.y,s.y,l)}function WE(n){return n.animationValues&&n.animationValues.opacityExit!==void 0}const IE={duration:.45,ease:[.4,0,.1,1]},Jy=n=>typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().includes(n),Wy=Jy("applewebkit/")&&!Jy("chrome/")?Math.round:It;function Iy(n){n.min=Wy(n.min),n.max=Wy(n.max)}function eT(n){Iy(n.x),Iy(n.y)}function jx(n,a,s){return n==="position"||n==="preserve-aspect"&&!SE(qy(a),qy(s),.2)}function tT(n){var a;return n!==n.root&&((a=n.scroll)==null?void 0:a.wasRoot)}const nT=wx({attachResizeListener:(n,a)=>ts(n,"resize",a),measureScroll:()=>{var n,a;return{x:document.documentElement.scrollLeft||((n=document.body)==null?void 0:n.scrollLeft)||0,y:document.documentElement.scrollTop||((a=document.body)==null?void 0:a.scrollTop)||0}},checkIsScrollRoot:()=>!0}),Wu={current:void 0},Ex=wx({measureScroll:n=>({x:n.scrollLeft,y:n.scrollTop}),defaultParent:()=>{if(!Wu.current){const n=new nT({});n.mount(window),n.setOptions({layoutScroll:!0}),Wu.current=n}return Wu.current},resetTransform:(n,a)=>{n.style.transform=a!==void 0?a:"none"},checkIsScrollRoot:n=>window.getComputedStyle(n).position==="fixed"}),Nf=S.createContext({transformPagePoint:n=>n,isStatic:!1,reducedMotion:"never"});function ev(n,a){if(typeof n=="function")return n(a);n!=null&&(n.current=a)}function rT(...n){return a=>{let s=!1;const l=n.map(u=>{const h=ev(u,a);return!s&&typeof h=="function"&&(s=!0),h});if(s)return()=>{for(let u=0;u<l.length;u++){const h=l[u];typeof h=="function"?h():ev(n[u],null)}}}}function aT(...n){return S.useCallback(rT(...n),n)}class iT extends S.Component{getSnapshotBeforeUpdate(a){const s=this.props.childRef.current;if(Yl(s)&&a.isPresent&&!this.props.isPresent&&this.props.pop!==!1){const l=s.offsetParent,u=Yl(l)&&l.offsetWidth||0,h=Yl(l)&&l.offsetHeight||0,f=getComputedStyle(s),m=this.props.sizeRef.current;m.height=parseFloat(f.height),m.width=parseFloat(f.width),m.top=s.offsetTop,m.left=s.offsetLeft,m.right=u-m.width-m.left,m.bottom=h-m.height-m.top,m.direction=f.direction}return null}componentDidUpdate(){}render(){return this.props.children}}function sT({children:n,isPresent:a,anchorX:s,anchorY:l,root:u,pop:h}){var b;const f=S.useId(),m=S.useRef(null),g=S.useRef({width:0,height:0,top:0,left:0,right:0,bottom:0,direction:"ltr"}),{nonce:p}=S.useContext(Nf),v=h!==!1?((b=n.props)==null?void 0:b.ref)??(n==null?void 0:n.ref):void 0,x=aT(m,v);return S.useInsertionEffect(()=>{const{width:j,height:E,top:T,left:C,right:R,bottom:k,direction:_}=g.current;if(a||h===!1||!m.current||!j||!E)return;const O=_==="rtl",U=s==="left"?O?`right: ${R}`:`left: ${C}`:O?`left: ${C}`:`right: ${R}`,P=l==="bottom"?`bottom: ${k}`:`top: ${T}`;m.current.dataset.motionPopId=f;const M=document.createElement("style");p&&(M.nonce=p);const D=u??document.head;return D.appendChild(M),M.sheet&&M.sheet.insertRule(`
          [data-motion-pop-id="${f}"] {
            position: absolute !important;
            width: ${j}px !important;
            height: ${E}px !important;
            ${U}px !important;
            ${P}px !important;
          }
        `),()=>{var q;(q=m.current)==null||q.removeAttribute("data-motion-pop-id"),D.contains(M)&&D.removeChild(M)}},[a]),o.jsx(iT,{isPresent:a,childRef:m,sizeRef:g,pop:h,children:h===!1?n:S.cloneElement(n,{ref:x})})}const lT=({children:n,initial:a,isPresent:s,onExitComplete:l,custom:u,presenceAffectsLayout:h,mode:f,anchorX:m,anchorY:g,root:p})=>{const v=ef(oT),x=S.useId(),b=S.useRef(s),j=S.useRef(l);tf(()=>{b.current=s,j.current=l});let E=!0,T=S.useMemo(()=>(E=!1,{id:x,initial:a,isPresent:s,custom:u,onExitComplete:C=>{v.set(C,!0);for(const R of v.values())if(!R)return;l&&l()},register:C=>(v.set(C,!1),()=>{var R;v.delete(C),!b.current&&!v.size&&((R=j.current)==null||R.call(j))})}),[s,v,l]);return h&&E&&(T={...T}),S.useMemo(()=>{v.forEach((C,R)=>v.set(R,!1))},[s]),S.useEffect(()=>{!s&&!v.size&&l&&l()},[s]),n=o.jsx(sT,{pop:f==="popLayout",isPresent:s,anchorX:m,anchorY:g,root:p,children:n}),o.jsx(ho.Provider,{value:T,children:n})};function oT(){return new Map}function Tx(n=!0){const a=S.useContext(ho);if(a===null)return[!0,null];const{isPresent:s,onExitComplete:l,register:u}=a,h=S.useId();S.useEffect(()=>{if(n)return u(h)},[n]);const f=S.useCallback(()=>n&&l&&l(h),[h,l,n]);return!s&&l?[!1,f]:[!0]}const kl=n=>n.key||"";function tv(n){const a=[];return S.Children.forEach(n,s=>{S.isValidElement(s)&&a.push(s)}),a}const cT=({children:n,custom:a,initial:s=!0,onExitComplete:l,presenceAffectsLayout:u=!0,mode:h="sync",propagate:f=!1,anchorX:m="left",anchorY:g="top",root:p})=>{const[v,x]=Tx(f),b=S.useMemo(()=>tv(n),[n]),j=f&&!v?[]:b.map(kl),E=S.useRef(!0),T=S.useRef(b),C=ef(()=>new Map),R=S.useRef(new Set),[k,_]=S.useState(b),[O,U]=S.useState(b);tf(()=>{E.current=!1,T.current=b;for(let D=0;D<O.length;D++){const q=kl(O[D]);j.includes(q)?(C.delete(q),R.current.delete(q)):C.get(q)!==!0&&C.set(q,!1)}},[O,j.length,j.join("-")]);const P=[];if(b!==k){let D=[...b];for(let q=0;q<O.length;q++){const $=O[q],ee=kl($);j.includes(ee)||(D.splice(q,0,$),P.push($))}return h==="wait"&&P.length&&(D=P),U(tv(D)),_(b),null}const{forceRender:M}=S.useContext(Id);return o.jsx(o.Fragment,{children:O.map(D=>{const q=kl(D),$=f&&!v?!1:b===O||j.includes(q),ee=()=>{if(R.current.has(q))return;if(C.has(q))R.current.add(q),C.set(q,!0);else return;let ne=!0;C.forEach(pe=>{pe||(ne=!1)}),ne&&(M==null||M(),U(T.current),f&&(x==null||x()),l&&l())};return o.jsx(lT,{isPresent:$,initial:!E.current||s?void 0:!1,custom:a,presenceAffectsLayout:u,mode:h,root:p,onExitComplete:$?void 0:ee,anchorX:m,anchorY:g,children:D},q)})})},Cx=S.createContext({strict:!1}),nv={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]};let rv=!1;function uT(){if(rv)return;const n={};for(const a in nv)n[a]={isEnabled:s=>nv[a].some(l=>!!s[l])};nx(n),rv=!0}function Nx(){return uT(),$j()}function dT(n){const a=Nx();for(const s in n)a[s]={...a[s],...n[s]};nx(a)}const fT=new Set(["animate","exit","variants","initial","style","values","variants","transition","transformTemplate","custom","inherit","onBeforeLayoutMeasure","onAnimationStart","onAnimationComplete","onUpdate","onDragStart","onDrag","onDragEnd","onMeasureDragConstraints","onDirectionLock","onDragTransitionEnd","_dragX","_dragY","onHoverStart","onHoverEnd","onViewportEnter","onViewportLeave","globalTapTarget","propagate","ignoreStrict","viewport"]);function oo(n){return n.startsWith("while")||n.startsWith("drag")&&n!=="draggable"||n.startsWith("layout")||n.startsWith("onTap")||n.startsWith("onPan")||n.startsWith("onLayout")||fT.has(n)}let Ax=n=>!oo(n);function hT(n){typeof n=="function"&&(Ax=a=>a.startsWith("on")?!oo(a):n(a))}try{hT(require("@emotion/is-prop-valid").default)}catch{}function mT(n,a,s){const l={};for(const u in n)u==="values"&&typeof n.values=="object"||pt(n[u])||(Ax(u)||s===!0&&oo(u)||!a&&!oo(u)||n.draggable&&u.startsWith("onDrag"))&&(l[u]=n[u]);return l}const vo=S.createContext({});function pT(n,a){if(yo(n)){const{initial:s,animate:l}=n;return{initial:s===!1||es(s)?s:void 0,animate:es(l)?l:void 0}}return n.inherit!==!1?a:{}}function gT(n){const{initial:a,animate:s}=pT(n,S.useContext(vo));return S.useMemo(()=>({initial:a,animate:s}),[av(a),av(s)])}function av(n){return Array.isArray(n)?n.join(" "):n}const Af=()=>({style:{},transform:{},transformOrigin:{},vars:{}});function Dx(n,a,s){for(const l in a)!pt(a[l])&&!cx(l,s)&&(n[l]=a[l])}function yT({transformTemplate:n},a){return S.useMemo(()=>{const s=Af();return Tf(s,a,n),Object.assign({},s.vars,s.style)},[a])}function vT(n,a){const s=n.style||{},l={};return Dx(l,s,n),Object.assign(l,yT(n,a)),l}function xT(n,a){const s={},l=vT(n,a);return n.drag&&n.dragListener!==!1&&(s.draggable=!1,l.userSelect=l.WebkitUserSelect=l.WebkitTouchCallout="none",l.touchAction=n.drag===!0?"none":`pan-${n.drag==="x"?"y":"x"}`),n.tabIndex===void 0&&(n.onTap||n.onTapStart||n.whileTap)&&(s.tabIndex=0),s.style=l,s}const Mx=()=>({...Af(),attrs:{}});function bT(n,a,s,l){const u=S.useMemo(()=>{const h=Mx();return ux(h,a,fx(l),n.transformTemplate,n.style),{...h.attrs,style:{...h.style}}},[a]);if(n.style){const h={};Dx(h,n.style,n),u.style={...h,...u.style}}return u}const ST=["animate","circle","defs","desc","ellipse","g","image","line","filter","marker","mask","metadata","path","pattern","polygon","polyline","rect","stop","switch","symbol","svg","text","tspan","use","view"];function Df(n){return typeof n!="string"||n.includes("-")?!1:!!(ST.indexOf(n)>-1||/[A-Z]/u.test(n))}function wT(n,a,s,{latestValues:l},u,h=!1,f){const g=(f??Df(n)?bT:xT)(a,l,u,n),p=mT(a,typeof n=="string",h),v=n!==S.Fragment?{...p,...g,ref:s}:{},{children:x}=a,b=S.useMemo(()=>pt(x)?x.get():x,[x]);return S.createElement(n,{...v,children:b})}function jT({scrapeMotionValuesFromProps:n,createRenderState:a},s,l,u){return{latestValues:ET(s,l,u,n),renderState:a()}}function ET(n,a,s,l){const u={},h=l(n,{});for(const b in h)u[b]=$l(h[b]);let{initial:f,animate:m}=n;const g=yo(n),p=ex(n);a&&p&&!g&&n.inherit!==!1&&(f===void 0&&(f=a.initial),m===void 0&&(m=a.animate));let v=s?s.initial===!1:!1;v=v||f===!1;const x=v?m:f;if(x&&typeof x!="boolean"&&!go(x)){const b=Array.isArray(x)?x:[x];for(let j=0;j<b.length;j++){const E=gf(n,b[j]);if(E){const{transitionEnd:T,transition:C,...R}=E;for(const k in R){let _=R[k];if(Array.isArray(_)){const O=v?_.length-1:0;_=_[O]}_!==null&&(u[k]=_)}for(const k in T)u[k]=T[k]}}}return u}const kx=n=>(a,s)=>{const l=S.useContext(vo),u=S.useContext(ho),h=()=>jT(n,a,l,u);return s?h():ef(h)},TT=kx({scrapeMotionValuesFromProps:Cf,createRenderState:Af}),CT=kx({scrapeMotionValuesFromProps:hx,createRenderState:Mx}),NT=Symbol.for("motionComponentSymbol");function AT(n,a,s){const l=S.useRef(s);S.useInsertionEffect(()=>{l.current=s});const u=S.useRef(null);return S.useCallback(h=>{var m;h&&((m=n.onMount)==null||m.call(n,h)),a&&(h?a.mount(h):a.unmount());const f=l.current;if(typeof f=="function")if(h){const g=f(h);typeof g=="function"&&(u.current=g)}else u.current?(u.current(),u.current=null):f(h);else f&&(f.current=h)},[a])}const Rx=S.createContext({});function Oa(n){return n&&typeof n=="object"&&Object.prototype.hasOwnProperty.call(n,"current")}function DT(n,a,s,l,u,h){var _,O;const{visualElement:f}=S.useContext(vo),m=S.useContext(Cx),g=S.useContext(ho),p=S.useContext(Nf),v=p.reducedMotion,x=p.skipAnimations,b=S.useRef(null),j=S.useRef(!1);l=l||m.renderer,!b.current&&l&&(b.current=l(n,{visualState:a,parent:f,props:s,presenceContext:g,blockInitialAnimation:g?g.initial===!1:!1,reducedMotionConfig:v,skipAnimations:x,isSVG:h}),j.current&&b.current&&(b.current.manuallyAnimateOnMount=!0));const E=b.current,T=S.useContext(Rx);E&&!E.projection&&u&&(E.type==="html"||E.type==="svg")&&MT(b.current,s,u,T);const C=S.useRef(!1);S.useInsertionEffect(()=>{E&&C.current&&E.update(s,g)});const R=s[Y0],k=S.useRef(!!R&&typeof window<"u"&&!((_=window.MotionHandoffIsComplete)!=null&&_.call(window,R))&&((O=window.MotionHasOptimisedAnimation)==null?void 0:O.call(window,R)));return tf(()=>{j.current=!0,E&&(C.current=!0,window.MotionIsMounted=!0,E.updateFeatures(),E.scheduleRenderMicrotask(),k.current&&E.animationState&&E.animationState.animateChanges())}),S.useEffect(()=>{E&&(!k.current&&E.animationState&&E.animationState.animateChanges(),k.current&&(queueMicrotask(()=>{var U;(U=window.MotionHandoffMarkAsComplete)==null||U.call(window,R)}),k.current=!1),E.enteringChildren=void 0)}),E}function MT(n,a,s,l){const{layoutId:u,layout:h,drag:f,dragConstraints:m,layoutScroll:g,layoutRoot:p,layoutAnchor:v,layoutCrossfade:x}=a;n.projection=new s(n.latestValues,a["data-framer-portal-id"]?void 0:Ox(n.parent)),n.projection.setOptions({layoutId:u,layout:h,alwaysMeasureLayout:!!f||m&&Oa(m),visualElement:n,animationType:typeof h=="string"?h:"both",initialPromotionConfig:l,crossfade:x,layoutScroll:g,layoutRoot:p,layoutAnchor:v})}function Ox(n){if(n)return n.options.allowProjection!==!1?n.projection:Ox(n.parent)}function Iu(n,{forwardMotionProps:a=!1,type:s}={},l,u){l&&dT(l);const h=s?s==="svg":Df(n),f=h?CT:TT;function m(p,v){let x;const b={...S.useContext(Nf),...p,layoutId:kT(p)},{isStatic:j}=b,E=gT(p),T=f(p,j);if(!j&&typeof window<"u"){RT();const C=OT(b);x=C.MeasureLayout,E.visualElement=DT(n,T,b,u,C.ProjectionNode,h)}return o.jsxs(vo.Provider,{value:E,children:[x&&E.visualElement?o.jsx(x,{visualElement:E.visualElement,...b}):null,wT(n,p,AT(T,E.visualElement,v),T,j,a,h)]})}m.displayName=`motion.${typeof n=="string"?n:`create(${n.displayName??n.name??""})`}`;const g=S.forwardRef(m);return g[NT]=n,g}function kT({layoutId:n}){const a=S.useContext(Id).id;return a&&n!==void 0?a+"-"+n:n}function RT(n,a){S.useContext(Cx).strict}function OT(n){const a=Nx(),{drag:s,layout:l}=a;if(!s&&!l)return{};const u={...s,...l};return{MeasureLayout:s!=null&&s.isEnabled(n)||l!=null&&l.isEnabled(n)?u.MeasureLayout:void 0,ProjectionNode:u.ProjectionNode}}function zT(n,a){if(typeof Proxy>"u")return Iu;const s=new Map,l=(h,f)=>Iu(h,f,n,a),u=(h,f)=>l(h,f);return new Proxy(u,{get:(h,f)=>f==="create"?l:(s.has(f)||s.set(f,Iu(f,void 0,n,a)),s.get(f))})}const _T=(n,a)=>a.isSVG??Df(n)?new uE(a):new aE(a,{allowProjection:n!==S.Fragment});class VT extends xr{constructor(a){super(a),a.animationState||(a.animationState=pE(a))}updateAnimationControlsSubscription(){const{animate:a}=this.node.getProps();go(a)&&(this.unmountControls=a.subscribe(this.node))}mount(){this.updateAnimationControlsSubscription()}update(){const{animate:a}=this.node.getProps(),{animate:s}=this.node.prevProps||{};a!==s&&this.updateAnimationControlsSubscription()}unmount(){var a;this.node.animationState.reset(),(a=this.unmountControls)==null||a.call(this)}}let BT=0;class LT extends xr{constructor(){super(...arguments),this.id=BT++,this.isExitComplete=!1}update(){var h;if(!this.node.presenceContext)return;const{isPresent:a,onExitComplete:s}=this.node.presenceContext,{isPresent:l}=this.node.prevPresenceContext||{};if(!this.node.animationState||a===l)return;if(a&&l===!1){if(this.isExitComplete){const{initial:f,custom:m}=this.node.getProps();if(typeof f=="string"||typeof f=="object"&&f!==null&&!Array.isArray(f)){const g=Gr(this.node,f,m);if(g){const{transition:p,transitionEnd:v,...x}=g;for(const b in x)(h=this.node.getValue(b))==null||h.jump(x[b])}}this.node.animationState.reset(),this.node.animationState.animateChanges()}else this.node.animationState.setActive("exit",!1);this.isExitComplete=!1;return}const u=this.node.animationState.setActive("exit",!a);s&&!a&&u.then(()=>{this.isExitComplete=!0,s(this.id)})}mount(){const{register:a,onExitComplete:s}=this.node.presenceContext||{};s&&s(this.id),a&&(this.unmount=a(this.id))}unmount(){}}const UT={animation:{Feature:VT},exit:{Feature:LT}};function cs(n){return{point:{x:n.pageX,y:n.pageY}}}const HT=n=>a=>bf(a)&&n(a,cs(a));function Qi(n,a,s,l){return ts(n,a,HT(s),l)}const zx=({current:n})=>n?n.ownerDocument.defaultView:null,iv=(n,a)=>Math.abs(n-a);function qT(n,a){const s=iv(n.x,a.x),l=iv(n.y,a.y);return Math.sqrt(s**2+l**2)}const sv=new Set(["auto","scroll"]);class _x{constructor(a,s,{transformPagePoint:l,contextWindow:u=window,dragSnapToOrigin:h=!1,distanceThreshold:f=3,element:m}={}){if(this.startEvent=null,this.lastMoveEvent=null,this.lastMoveEventInfo=null,this.lastRawMoveEventInfo=null,this.handlers={},this.contextWindow=window,this.scrollPositions=new Map,this.removeScrollListeners=null,this.onElementScroll=E=>{this.handleScroll(E.target)},this.onWindowScroll=()=>{this.handleScroll(window)},this.updatePoint=()=>{if(!(this.lastMoveEvent&&this.lastMoveEventInfo))return;this.lastRawMoveEventInfo&&(this.lastMoveEventInfo=Rl(this.lastRawMoveEventInfo,this.transformPagePoint));const E=ed(this.lastMoveEventInfo,this.history),T=this.startEvent!==null,C=qT(E.offset,{x:0,y:0})>=this.distanceThreshold;if(!T&&!C)return;const{point:R}=E,{timestamp:k}=mt;this.history.push({...R,timestamp:k});const{onStart:_,onMove:O}=this.handlers;T||(_&&_(this.lastMoveEvent,E),this.startEvent=this.lastMoveEvent),O&&O(this.lastMoveEvent,E)},this.handlePointerMove=(E,T)=>{this.lastMoveEvent=E,this.lastRawMoveEventInfo=T,this.lastMoveEventInfo=Rl(T,this.transformPagePoint),Ye.update(this.updatePoint,!0)},this.handlePointerUp=(E,T)=>{this.end();const{onEnd:C,onSessionEnd:R,resumeAnimation:k}=this.handlers;if((this.dragSnapToOrigin||!this.startEvent)&&k&&k(),!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const _=ed(E.type==="pointercancel"?this.lastMoveEventInfo:Rl(T,this.transformPagePoint),this.history);this.startEvent&&C&&C(E,_),R&&R(E,_)},!bf(a))return;this.dragSnapToOrigin=h,this.handlers=s,this.transformPagePoint=l,this.distanceThreshold=f,this.contextWindow=u||window;const g=cs(a),p=Rl(g,this.transformPagePoint),{point:v}=p,{timestamp:x}=mt;this.history=[{...v,timestamp:x}];const{onSessionStart:b}=s;b&&b(a,ed(p,this.history));const j={passive:!0,capture:!0};this.removeListeners=ss(Qi(this.contextWindow,"pointermove",this.handlePointerMove,j),Qi(this.contextWindow,"pointerup",this.handlePointerUp,j),Qi(this.contextWindow,"pointercancel",this.handlePointerUp,j)),m&&this.startScrollTracking(m)}startScrollTracking(a){let s=a.parentElement;for(;s;){const l=getComputedStyle(s);(sv.has(l.overflowX)||sv.has(l.overflowY))&&this.scrollPositions.set(s,{x:s.scrollLeft,y:s.scrollTop}),s=s.parentElement}this.scrollPositions.set(window,{x:window.scrollX,y:window.scrollY}),window.addEventListener("scroll",this.onElementScroll,{capture:!0}),window.addEventListener("scroll",this.onWindowScroll),this.removeScrollListeners=()=>{window.removeEventListener("scroll",this.onElementScroll,{capture:!0}),window.removeEventListener("scroll",this.onWindowScroll)}}handleScroll(a){const s=this.scrollPositions.get(a);if(!s)return;const l=a===window,u=l?{x:window.scrollX,y:window.scrollY}:{x:a.scrollLeft,y:a.scrollTop},h={x:u.x-s.x,y:u.y-s.y};h.x===0&&h.y===0||(l?this.lastMoveEventInfo&&(this.lastMoveEventInfo.point.x+=h.x,this.lastMoveEventInfo.point.y+=h.y):this.history.length>0&&(this.history[0].x-=h.x,this.history[0].y-=h.y),this.scrollPositions.set(a,u),Ye.update(this.updatePoint,!0))}updateHandlers(a){this.handlers=a}end(){this.removeListeners&&this.removeListeners(),this.removeScrollListeners&&this.removeScrollListeners(),this.scrollPositions.clear(),yr(this.updatePoint)}}function Rl(n,a){return a?{point:a(n.point)}:n}function lv(n,a){return{x:n.x-a.x,y:n.y-a.y}}function ed({point:n},a){return{point:n,delta:lv(n,Vx(a)),offset:lv(n,YT(a)),velocity:GT(a,.1)}}function YT(n){return n[0]}function Vx(n){return n[n.length-1]}function GT(n,a){if(n.length<2)return{x:0,y:0};let s=n.length-1,l=null;const u=Vx(n);for(;s>=0&&(l=n[s],!(u.timestamp-l.timestamp>Ht(a)));)s--;if(!l)return{x:0,y:0};l===n[0]&&n.length>2&&u.timestamp-l.timestamp>Ht(a)*2&&(l=n[1]);const h=Wt(u.timestamp-l.timestamp);if(h===0)return{x:0,y:0};const f={x:(u.x-l.x)/h,y:(u.y-l.y)/h};return f.x===1/0&&(f.x=0),f.y===1/0&&(f.y=0),f}function XT(n,{min:a,max:s},l){return a!==void 0&&n<a?n=l?qe(a,n,l.min):Math.max(n,a):s!==void 0&&n>s&&(n=l?qe(s,n,l.max):Math.min(n,s)),n}function ov(n,a,s){return{min:a!==void 0?n.min+a:void 0,max:s!==void 0?n.max+s-(n.max-n.min):void 0}}function PT(n,{top:a,left:s,bottom:l,right:u}){return{x:ov(n.x,s,u),y:ov(n.y,a,l)}}function cv(n,a){let s=a.min-n.min,l=a.max-n.max;return a.max-a.min<n.max-n.min&&([s,l]=[l,s]),{min:s,max:l}}function FT(n,a){return{x:cv(n.x,a.x),y:cv(n.y,a.y)}}function $T(n,a){let s=.5;const l=bt(n),u=bt(a);return u>l?s=Wi(a.min,a.max-l,n.min):l>u&&(s=Wi(n.min,n.max-u,a.min)),xn(0,1,s)}function KT(n,a){const s={};return a.min!==void 0&&(s.min=a.min-n.min),a.max!==void 0&&(s.max=a.max-n.min),s}const Vd=.35;function ZT(n=Vd){return n===!1?n=0:n===!0&&(n=Vd),{x:uv(n,"left","right"),y:uv(n,"top","bottom")}}function uv(n,a,s){return{min:dv(n,a),max:dv(n,s)}}function dv(n,a){return typeof n=="number"?n:n[a]||0}const QT=new WeakMap;class JT{constructor(a){this.openDragLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},this.constraints=!1,this.hasMutatedConstraints=!1,this.elastic=it(),this.latestPointerEvent=null,this.latestPanInfo=null,this.visualElement=a}start(a,{snapToCursor:s=!1,distanceThreshold:l}={}){const{presenceContext:u}=this.visualElement;if(u&&u.isPresent===!1)return;const h=x=>{s&&this.snapToCursor(cs(x).point),this.stopAnimation()},f=(x,b)=>{const{drag:j,dragPropagation:E,onDragStart:T}=this.getProps();if(j&&!E&&(this.openDragLock&&this.openDragLock(),this.openDragLock=Ej(j),!this.openDragLock))return;this.latestPointerEvent=x,this.latestPanInfo=b,this.isDragging=!0,this.currentDirection=null,this.resolveConstraints(),this.visualElement.projection&&(this.visualElement.projection.isAnimationBlocked=!0,this.visualElement.projection.target=void 0),pn(R=>{let k=this.getAxisMotionValue(R).get()||0;if(vn.test(k)){const{projection:_}=this.visualElement;if(_&&_.layout){const O=_.layout.layoutBox[R];O&&(k=bt(O)*(parseFloat(k)/100))}}this.originPoint[R]=k}),T&&Ye.update(()=>T(x,b),!1,!0),Nd(this.visualElement,"transform");const{animationState:C}=this.visualElement;C&&C.setActive("whileDrag",!0)},m=(x,b)=>{this.latestPointerEvent=x,this.latestPanInfo=b;const{dragPropagation:j,dragDirectionLock:E,onDirectionLock:T,onDrag:C}=this.getProps();if(!j&&!this.openDragLock)return;const{offset:R}=b;if(E&&this.currentDirection===null){this.currentDirection=IT(R),this.currentDirection!==null&&T&&T(this.currentDirection);return}this.updateAxis("x",b.point,R),this.updateAxis("y",b.point,R),this.visualElement.render(),C&&Ye.update(()=>C(x,b),!1,!0)},g=(x,b)=>{this.latestPointerEvent=x,this.latestPanInfo=b,this.stop(x,b),this.latestPointerEvent=null,this.latestPanInfo=null},p=()=>{const{dragSnapToOrigin:x}=this.getProps();(x||this.constraints)&&this.startAnimation({x:0,y:0})},{dragSnapToOrigin:v}=this.getProps();this.panSession=new _x(a,{onSessionStart:h,onStart:f,onMove:m,onSessionEnd:g,resumeAnimation:p},{transformPagePoint:this.visualElement.getTransformPagePoint(),dragSnapToOrigin:v,distanceThreshold:l,contextWindow:zx(this.visualElement),element:this.visualElement.current})}stop(a,s){const l=a||this.latestPointerEvent,u=s||this.latestPanInfo,h=this.isDragging;if(this.cancel(),!h||!u||!l)return;const{velocity:f}=u;this.startAnimation(f);const{onDragEnd:m}=this.getProps();m&&Ye.postRender(()=>m(l,u))}cancel(){this.isDragging=!1;const{projection:a,animationState:s}=this.visualElement;a&&(a.isAnimationBlocked=!1),this.endPanSession();const{dragPropagation:l}=this.getProps();!l&&this.openDragLock&&(this.openDragLock(),this.openDragLock=null),s&&s.setActive("whileDrag",!1)}endPanSession(){this.panSession&&this.panSession.end(),this.panSession=void 0}updateAxis(a,s,l){const{drag:u}=this.getProps();if(!l||!Ol(a,u,this.currentDirection))return;const h=this.getAxisMotionValue(a);let f=this.originPoint[a]+l[a];this.constraints&&this.constraints[a]&&(f=XT(f,this.constraints[a],this.elastic[a])),h.set(f)}resolveConstraints(){var h;const{dragConstraints:a,dragElastic:s}=this.getProps(),l=this.visualElement.projection&&!this.visualElement.projection.layout?this.visualElement.projection.measure(!1):(h=this.visualElement.projection)==null?void 0:h.layout,u=this.constraints;a&&Oa(a)?this.constraints||(this.constraints=this.resolveRefConstraints()):a&&l?this.constraints=PT(l.layoutBox,a):this.constraints=!1,this.elastic=ZT(s),u!==this.constraints&&!Oa(a)&&l&&this.constraints&&!this.hasMutatedConstraints&&pn(f=>{this.constraints!==!1&&this.getAxisMotionValue(f)&&(this.constraints[f]=KT(l.layoutBox[f],this.constraints[f]))})}resolveRefConstraints(){const{dragConstraints:a,onMeasureDragConstraints:s}=this.getProps();if(!a||!Oa(a))return!1;const l=a.current,{projection:u}=this.visualElement;if(!u||!u.layout)return!1;u.root&&(u.root.scroll=void 0,u.root.updateScroll());const h=Wj(l,u.root,this.visualElement.getTransformPagePoint());let f=FT(u.layout.layoutBox,h);if(s){const m=s(Zj(f));this.hasMutatedConstraints=!!m,m&&(f=ax(m))}return f}startAnimation(a){const{drag:s,dragMomentum:l,dragElastic:u,dragTransition:h,dragSnapToOrigin:f,onDragTransitionEnd:m}=this.getProps(),g=this.constraints||{},p=pn(v=>{if(!Ol(v,s,this.currentDirection))return;let x=g&&g[v]||{};(f===!0||f===v)&&(x={min:0,max:0});const b=u?200:1e6,j=u?40:1e7,E={type:"inertia",velocity:l?a[v]:0,bounceStiffness:b,bounceDamping:j,timeConstant:750,restDelta:1,restSpeed:10,...h,...x};return this.startAxisValueAnimation(v,E)});return Promise.all(p).then(m)}startAxisValueAnimation(a,s){const l=this.getAxisMotionValue(a);return Nd(this.visualElement,a),l.start(pf(a,l,0,s,this.visualElement,!1))}stopAnimation(){pn(a=>this.getAxisMotionValue(a).stop())}getAxisMotionValue(a){const s=`_drag${a.toUpperCase()}`,u=this.visualElement.getProps()[s];return u||this.visualElement.getValue(a,this.visualElement.latestValues[a]??0)}snapToCursor(a){pn(s=>{const{drag:l}=this.getProps();if(!Ol(s,l,this.currentDirection))return;const{projection:u}=this.visualElement,h=this.getAxisMotionValue(s);if(u&&u.layout){const{min:f,max:m}=u.layout.layoutBox[s],g=h.get()||0;h.set(a[s]-qe(f,m,.5)+g)}})}scalePositionWithinConstraints(){if(!this.visualElement.current)return;const{drag:a,dragConstraints:s}=this.getProps(),{projection:l}=this.visualElement;if(!Oa(s)||!l||!this.constraints)return;this.stopAnimation();const u={x:0,y:0};pn(f=>{const m=this.getAxisMotionValue(f);if(m&&this.constraints!==!1){const g=m.get();u[f]=$T({min:g,max:g},this.constraints[f])}});const{transformTemplate:h}=this.visualElement.getProps();this.visualElement.current.style.transform=h?h({},""):"none",l.root&&l.root.updateScroll(),l.updateLayout(),this.constraints=!1,this.resolveConstraints(),pn(f=>{if(!Ol(f,a,null))return;const m=this.getAxisMotionValue(f),{min:g,max:p}=this.constraints[f];m.set(qe(g,p,u[f]))}),this.visualElement.render()}addListeners(){if(!this.visualElement.current)return;QT.set(this.visualElement,this);const a=this.visualElement.current,s=Qi(a,"pointerdown",p=>{const{drag:v,dragListener:x=!0}=this.getProps(),b=p.target,j=b!==a&&Mj(b);v&&x&&!j&&this.start(p)});let l;const u=()=>{const{dragConstraints:p}=this.getProps();Oa(p)&&p.current&&(this.constraints=this.resolveRefConstraints(),l||(l=WT(a,p.current,()=>this.scalePositionWithinConstraints())))},{projection:h}=this.visualElement,f=h.addEventListener("measure",u);h&&!h.layout&&(h.root&&h.root.updateScroll(),h.updateLayout()),Ye.read(u);const m=ts(window,"resize",()=>this.scalePositionWithinConstraints()),g=h.addEventListener("didUpdate",(({delta:p,hasLayoutChanged:v})=>{this.isDragging&&v&&(pn(x=>{const b=this.getAxisMotionValue(x);b&&(this.originPoint[x]+=p[x].translate,b.set(b.get()+p[x].translate))}),this.visualElement.render())}));return()=>{m(),s(),f(),g&&g(),l&&l()}}getProps(){const a=this.visualElement.getProps(),{drag:s=!1,dragDirectionLock:l=!1,dragPropagation:u=!1,dragConstraints:h=!1,dragElastic:f=Vd,dragMomentum:m=!0}=a;return{...a,drag:s,dragDirectionLock:l,dragPropagation:u,dragConstraints:h,dragElastic:f,dragMomentum:m}}}function fv(n){let a=!0;return()=>{if(a){a=!1;return}n()}}function WT(n,a,s){const l=xy(n,fv(s)),u=xy(a,fv(s));return()=>{l(),u()}}function Ol(n,a,s){return(a===!0||a===n)&&(s===null||s===n)}function IT(n,a=10){let s=null;return Math.abs(n.y)>a?s="y":Math.abs(n.x)>a&&(s="x"),s}class eC extends xr{constructor(a){super(a),this.removeGroupControls=It,this.removeListeners=It,this.controls=new JT(a)}mount(){const{dragControls:a}=this.node.getProps();a&&(this.removeGroupControls=a.subscribe(this.controls)),this.removeListeners=this.controls.addListeners()||It}update(){const{dragControls:a}=this.node.getProps(),{dragControls:s}=this.node.prevProps||{};a!==s&&(this.removeGroupControls(),a&&(this.removeGroupControls=a.subscribe(this.controls)))}unmount(){this.removeGroupControls(),this.removeListeners(),this.controls.isDragging||this.controls.endPanSession()}}const td=n=>(a,s)=>{n&&Ye.update(()=>n(a,s),!1,!0)};class tC extends xr{constructor(){super(...arguments),this.removePointerDownListener=It}onPointerDown(a){this.session=new _x(a,this.createPanHandlers(),{transformPagePoint:this.node.getTransformPagePoint(),contextWindow:zx(this.node)})}createPanHandlers(){const{onPanSessionStart:a,onPanStart:s,onPan:l,onPanEnd:u}=this.node.getProps();return{onSessionStart:td(a),onStart:td(s),onMove:td(l),onEnd:(h,f)=>{delete this.session,u&&Ye.postRender(()=>u(h,f))}}}mount(){this.removePointerDownListener=Qi(this.node.current,"pointerdown",a=>this.onPointerDown(a))}update(){this.session&&this.session.updateHandlers(this.createPanHandlers())}unmount(){this.removePointerDownListener(),this.session&&this.session.end()}}let nd=!1;class nC extends S.Component{componentDidMount(){const{visualElement:a,layoutGroup:s,switchLayoutGroup:l,layoutId:u}=this.props,{projection:h}=a;h&&(s.group&&s.group.add(h),l&&l.register&&u&&l.register(h),nd&&h.root.didUpdate(),h.addEventListener("animationComplete",()=>{this.safeToRemove()}),h.setOptions({...h.options,layoutDependency:this.props.layoutDependency,onExitComplete:()=>this.safeToRemove()})),Kl.hasEverUpdated=!0}getSnapshotBeforeUpdate(a){const{layoutDependency:s,visualElement:l,drag:u,isPresent:h}=this.props,{projection:f}=l;return f&&(f.isPresent=h,a.layoutDependency!==s&&f.setOptions({...f.options,layoutDependency:s}),nd=!0,u||a.layoutDependency!==s||s===void 0||a.isPresent!==h?f.willUpdate():this.safeToRemove(),a.isPresent!==h&&(h?f.promote():f.relegate()||Ye.postRender(()=>{const m=f.getStack();(!m||!m.members.length)&&this.safeToRemove()}))),null}componentDidUpdate(){const{visualElement:a,layoutAnchor:s}=this.props,{projection:l}=a;l&&(l.options.layoutAnchor=s,l.root.didUpdate(),xf.postRender(()=>{!l.currentAnimation&&l.isLead()&&this.safeToRemove()}))}componentWillUnmount(){const{visualElement:a,layoutGroup:s,switchLayoutGroup:l}=this.props,{projection:u}=a;nd=!0,u&&(u.scheduleCheckAfterUnmount(),s&&s.group&&s.group.remove(u),l&&l.deregister&&l.deregister(u))}safeToRemove(){const{safeToRemove:a}=this.props;a&&a()}render(){return null}}function Bx(n){const[a,s]=Tx(),l=S.useContext(Id);return o.jsx(nC,{...n,layoutGroup:l,switchLayoutGroup:S.useContext(Rx),isPresent:a,safeToRemove:s})}const rC={pan:{Feature:tC},drag:{Feature:eC,ProjectionNode:Ex,MeasureLayout:Bx}};function hv(n,a,s){const{props:l}=n;n.animationState&&l.whileHover&&n.animationState.setActive("whileHover",s==="Start");const u="onHover"+s,h=l[u];h&&Ye.postRender(()=>h(a,cs(a)))}class aC extends xr{mount(){const{current:a}=this.node;a&&(this.unmount=Cj(a,(s,l)=>(hv(this.node,l,"Start"),u=>hv(this.node,u,"End"))))}unmount(){}}class iC extends xr{constructor(){super(...arguments),this.isActive=!1}onFocus(){let a=!1;try{a=this.node.current.matches(":focus-visible")}catch{a=!0}!a||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!0),this.isActive=!0)}onBlur(){!this.isActive||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!1),this.isActive=!1)}mount(){this.unmount=ss(ts(this.node.current,"focus",()=>this.onFocus()),ts(this.node.current,"blur",()=>this.onBlur()))}unmount(){}}function mv(n,a,s){const{props:l}=n;if(n.current instanceof HTMLButtonElement&&n.current.disabled)return;n.animationState&&l.whileTap&&n.animationState.setActive("whileTap",s==="Start");const u="onTap"+(s==="End"?"":s),h=l[u];h&&Ye.postRender(()=>h(a,cs(a)))}class sC extends xr{mount(){const{current:a}=this.node;if(!a)return;const{globalTapTarget:s,propagate:l}=this.node.props;this.unmount=Rj(a,(u,h)=>(mv(this.node,h,"Start"),(f,{success:m})=>mv(this.node,f,m?"End":"Cancel")),{useGlobalTarget:s,stopPropagation:(l==null?void 0:l.tap)===!1})}unmount(){}}const Bd=new WeakMap,rd=new WeakMap,lC=n=>{const a=Bd.get(n.target);a&&a(n)},oC=n=>{n.forEach(lC)};function cC({root:n,...a}){const s=n||document;rd.has(s)||rd.set(s,{});const l=rd.get(s),u=JSON.stringify(a);return l[u]||(l[u]=new IntersectionObserver(oC,{root:n,...a})),l[u]}function uC(n,a,s){const l=cC(a);return Bd.set(n,s),l.observe(n),()=>{Bd.delete(n),l.unobserve(n)}}const dC={some:0,all:1};class fC extends xr{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){var g;(g=this.stopObserver)==null||g.call(this);const{viewport:a={}}=this.node.getProps(),{root:s,margin:l,amount:u="some",once:h}=a,f={root:s?s.current:void 0,rootMargin:l,threshold:typeof u=="number"?u:dC[u]},m=p=>{const{isIntersecting:v}=p;if(this.isInView===v||(this.isInView=v,h&&!v&&this.hasEnteredView))return;v&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive("whileInView",v);const{onViewportEnter:x,onViewportLeave:b}=this.node.getProps(),j=v?x:b;j&&j(p)};this.stopObserver=uC(this.node.current,f,m)}mount(){this.startObserver()}update(){if(typeof IntersectionObserver>"u")return;const{props:a,prevProps:s}=this.node;["amount","margin","root"].some(hC(a,s))&&this.startObserver()}unmount(){var a;(a=this.stopObserver)==null||a.call(this),this.hasEnteredView=!1,this.isInView=!1}}function hC({viewport:n={}},{viewport:a={}}={}){return s=>n[s]!==a[s]}const mC={inView:{Feature:fC},tap:{Feature:sC},focus:{Feature:iC},hover:{Feature:aC}},pC={layout:{ProjectionNode:Ex,MeasureLayout:Bx}},gC={...UT,...mC,...rC,...pC},yC=zT(gC,_T);function Lx(){!Ef.current&&tx();const[n]=S.useState(ao.current);return n}const Mf=yC,co=new Map,pv=new Set;let vC=0;const kf=()=>{var n;return(n=window.chrome)==null?void 0:n.webview};function xC(n){var s;const a=co.get(n.id);if(a){if(n.type==="progress"){(s=a.progress)==null||s.call(a,n.data);return}window.clearTimeout(a.timer),co.delete(n.id),n.ok?a.resolve(n.data):a.reject(new Error(n.error||"操作失败"))}}var Qv;(Qv=kf())==null||Qv.addEventListener("message",n=>xC(n.data));function bC(n,a){var s;a&&pv.has(a)||(a&&pv.add(a),(s=kf())==null||s.postMessage({type:"app.ready",route:n,navigation:a}))}function be(n,a,s=3e4,l){const u=kf();if(!u)return Promise.reject(new Error("当前页面未连接到桌面宿主"));const h=`${Date.now()}-${++vC}`;return new Promise((f,m)=>{const g=window.setTimeout(()=>{co.delete(h),m(new Error("操作超时，请重试"))},s);co.set(h,{resolve:p=>f(p),reject:m,timer:g,progress:l}),u.postMessage({id:h,operation:n,payload:a})})}var Rf=Iv();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const SC=n=>n.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Ux=(...n)=>n.filter((a,s,l)=>!!a&&a.trim()!==""&&l.indexOf(a)===s).join(" ").trim();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var wC={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jC=S.forwardRef(({color:n="currentColor",size:a=24,strokeWidth:s=2,absoluteStrokeWidth:l,className:u="",children:h,iconNode:f,...m},g)=>S.createElement("svg",{ref:g,...wC,width:a,height:a,stroke:n,strokeWidth:l?Number(s)*24/Number(a):s,className:Ux("lucide",u),...m},[...f.map(([p,v])=>S.createElement(p,v)),...Array.isArray(h)?h:[h]]));/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Me=(n,a)=>{const s=S.forwardRef(({className:l,...u},h)=>S.createElement(jC,{ref:h,iconNode:a,className:Ux(`lucide-${SC(n)}`,l),...u}));return s.displayName=`${n}`,s};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ns=Me("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const EC=Me("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hx=Me("CalendarDays",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M16 14h.01",key:"1gbofw"}],["path",{d:"M8 18h.01",key:"lrp35t"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M16 18h.01",key:"kzsmim"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const TC=Me("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const us=Me("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const CC=Me("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qx=Me("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yx=Me("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ld=Me("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uo=Me("CircleCheck",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fo=Me("Database",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const NC=Me("Earth",[["path",{d:"M21.54 15H17a2 2 0 0 0-2 2v4.54",key:"1djwo0"}],["path",{d:"M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17",key:"1tzkfa"}],["path",{d:"M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05",key:"14pb5j"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const AC=Me("Ellipsis",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const DC=Me("FileSpreadsheet",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M8 13h2",key:"yr2amv"}],["path",{d:"M14 13h2",key:"un5t4a"}],["path",{d:"M8 17h2",key:"2yhykz"}],["path",{d:"M14 17h2",key:"10kma7"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const MC=Me("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kC=Me("FolderInput",[["path",{d:"M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1",key:"fm4g5t"}],["path",{d:"M2 13h10",key:"pgb2dq"}],["path",{d:"m9 16 3-3-3-3",key:"6m91ic"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gv=Me("FolderOpen",[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const RC=Me("KeyRound",[["path",{d:"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",key:"1s6t7t"}],["circle",{cx:"16.5",cy:"7.5",r:".5",fill:"currentColor",key:"w0ekpg"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sn=Me("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const OC=Me("LockKeyhole",[["circle",{cx:"12",cy:"16",r:"1",key:"1au0dj"}],["rect",{x:"3",y:"10",width:"18",height:"12",rx:"2",key:"6s8ecr"}],["path",{d:"M7 10V7a5 5 0 0 1 10 0v3",key:"1pqi11"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gx=Me("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zC=Me("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xx=Me("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _C=Me("RotateCw",[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",key:"1p45f6"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const VC=Me("Rows3",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M21 9H3",key:"1338ky"}],["path",{d:"M21 15H3",key:"9uk58r"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const BC=Me("Save",[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ad=Me("Server",[["rect",{width:"20",height:"8",x:"2",y:"2",rx:"2",ry:"2",key:"ngkwjq"}],["rect",{width:"20",height:"8",x:"2",y:"14",rx:"2",ry:"2",key:"iecqi9"}],["line",{x1:"6",x2:"6.01",y1:"6",y2:"6",key:"16zg32"}],["line",{x1:"6",x2:"6.01",y1:"18",y2:"18",key:"nzw8ys"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const LC=Me("Settings2",[["path",{d:"M20 7h-9",key:"3s1dr2"}],["path",{d:"M14 17H5",key:"gfn3mx"}],["circle",{cx:"17",cy:"17",r:"3",key:"18b49y"}],["circle",{cx:"7",cy:"7",r:"3",key:"dfmy0x"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yv=Me("ShieldCheck",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const UC=Me("Sigma",[["path",{d:"M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2",key:"wuwx1p"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const HC=Me("SlidersHorizontal",[["line",{x1:"21",x2:"14",y1:"4",y2:"4",key:"obuewd"}],["line",{x1:"10",x2:"3",y1:"4",y2:"4",key:"1q6298"}],["line",{x1:"21",x2:"12",y1:"12",y2:"12",key:"1iu8h1"}],["line",{x1:"8",x2:"3",y1:"12",y2:"12",key:"ntss68"}],["line",{x1:"21",x2:"16",y1:"20",y2:"20",key:"14d8ph"}],["line",{x1:"12",x2:"3",y1:"20",y2:"20",key:"m0wm8r"}],["line",{x1:"14",x2:"14",y1:"2",y2:"6",key:"14e1ph"}],["line",{x1:"8",x2:"8",y1:"10",y2:"14",key:"1i6ji0"}],["line",{x1:"16",x2:"16",y1:"18",y2:"22",key:"1lctlv"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qC=Me("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const YC=Me("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const GC=Me("UserRound",[["circle",{cx:"12",cy:"8",r:"5",key:"1hypcn"}],["path",{d:"M20 21a8 8 0 0 0-16 0",key:"rfgkzh"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const XC=Me("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),PC=["一","二","三","四","五","六","日"],FC=Array.from({length:12},(n,a)=>`${a+1}月`);function $C(n){if(!n)return null;const[a,s,l=1]=n.split("-").map(Number);return!a||!s||!l?null:new Date(a,s-1,l)}function vv(n){const a=n.getFullYear(),s=String(n.getMonth()+1).padStart(2,"0"),l=String(n.getDate()).padStart(2,"0");return`${a}-${s}-${l}`}function KC(n){const a=n.getFullYear(),s=String(n.getMonth()+1).padStart(2,"0"),l=String(n.getDate()).padStart(2,"0");return`${a}/${s}/${l}`}function ZC(n,a){const s=new Date(n,a,1).getDay();return s===0?6:s-1}function QC(n,a){return new Date(n,a+1,0).getDate()}function xv(n,a){return n.getFullYear()===a.getFullYear()&&n.getMonth()===a.getMonth()&&n.getDate()===a.getDate()}function JC(n){return Math.floor(n/12)*12}function Of({value:n,onChange:a,label:s,disabled:l=!1,selectionMode:u="day"}){var N;const h=S.useId(),f=S.useMemo(()=>$C(n),[n]),[m,g]=S.useState(!1),[p,v]=S.useState(u),[x,b]=S.useState(f??new Date),[j,E]=S.useState({top:0,left:0}),[T,C]=S.useState("bottom"),R=S.useRef(null),k=S.useRef(null),_=S.useRef(null);S.useEffect(()=>{f&&b(f)},[n]);function O(){const V=R.current,I=_.current;if(!V||!I)return;const re=V.ownerDocument.defaultView||window,ce=V.getBoundingClientRect(),ye=I.getBoundingClientRect(),xe=ye.width,te=ye.height,Q=8,de=12,W=re.innerHeight-ce.bottom-de,he=ce.top-de,Ce=te>W&&he>W,ze=Ce?"top":"bottom";let Qe=Ce?ce.top-te-Q:ce.bottom+Q;Qe<de&&(Qe=de),Qe+te>re.innerHeight-de&&(Qe=Math.max(de,re.innerHeight-te-de));let Fe=ce.left;Fe+xe>re.innerWidth-de&&(Fe=re.innerWidth-xe-de),Fe<de&&(Fe=de),C(ze),E({top:Qe,left:Fe})}S.useLayoutEffect(()=>{m&&O()},[m,p]),S.useEffect(()=>{var re;if(!m)return;const V=((re=R.current)==null?void 0:re.ownerDocument.defaultView)||window;function I(){O()}return V.addEventListener("resize",I),V.addEventListener("scroll",I,!0),()=>{V.removeEventListener("resize",I),V.removeEventListener("scroll",I,!0)}},[m,p]),S.useEffect(()=>{var ce;const V=((ce=k.current)==null?void 0:ce.ownerDocument)||document;function I(ye){var de,W;const xe=ye.target,te=(de=k.current)==null?void 0:de.contains(xe),Q=(W=_.current)==null?void 0:W.contains(xe);!te&&!Q&&(g(!1),v(u))}function re(ye){ye.key==="Escape"&&(g(!1),v(u))}return V.addEventListener("mousedown",I),V.addEventListener("keydown",re),()=>{V.removeEventListener("mousedown",I),V.removeEventListener("keydown",re)}},[u]);const U=x.getFullYear(),P=x.getMonth(),M=QC(U,P),D=ZC(U,P),q=JC(U),$=Array.from({length:12},(V,I)=>q+I),ee=[];for(let V=0;V<D;V+=1)ee.push(null);for(let V=1;V<=M;V+=1)ee.push(V);function ne(){if(p==="day"){b(new Date(U,P-1,1));return}if(p==="month"){b(new Date(U-1,P,1));return}b(new Date(U-12,P,1))}function pe(){if(p==="day"){b(new Date(U,P+1,1));return}if(p==="month"){b(new Date(U+1,P,1));return}b(new Date(U+12,P,1))}function le(){if(u==="month"){v(p==="month"?"year":"month");return}if(p==="day"){v("month");return}if(p==="month"){v("year");return}v("day")}function se(V){const I=new Date(U,P,V);a(vv(I)),g(!1),v("day")}function L(V){if(u==="month"){a(`${U}-${String(V+1).padStart(2,"0")}`),b(new Date(U,V,1)),g(!1),v("month");return}b(new Date(U,V,1)),v("day")}function F(V){b(new Date(V,P,1)),v("month")}function ae(){const V=new Date;b(V),a(u==="month"?`${V.getFullYear()}-${String(V.getMonth()+1).padStart(2,"0")}`:vv(V)),v(u),g(!1)}function ie(){return p==="day"?`${U}年 ${P+1}月`:p==="month"?`${U}年`:`${q} - ${q+11}`}const oe=m?o.jsxs("div",{ref:_,className:`date-picker-popover date-picker-popover-${T}`,style:{top:j.top,left:j.left},children:[o.jsxs("div",{className:"date-picker-header",children:[o.jsx("button",{type:"button",className:"date-picker-nav-button",onClick:ne,"aria-label":"上一页",children:o.jsx(qx,{size:17,strokeWidth:1.7})}),o.jsx("button",{type:"button",className:"date-picker-title-button",onClick:le,children:ie()}),o.jsx("button",{type:"button",className:"date-picker-nav-button",onClick:pe,"aria-label":"下一页",children:o.jsx(Yx,{size:17,strokeWidth:1.7})})]}),p==="day"&&o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"date-picker-weekdays",children:PC.map(V=>o.jsx("div",{children:V},V))}),o.jsx("div",{className:"date-picker-grid",children:ee.map((V,I)=>{if(V===null)return o.jsx("div",{},`empty-${I}`);const re=new Date(U,P,V),ce=f?xv(re,f):!1,ye=xv(re,new Date);return o.jsx("button",{type:"button",className:["date-picker-day",ce?"date-picker-day-selected":"",ye&&!ce?"date-picker-day-today":""].filter(Boolean).join(" "),onClick:()=>se(V),children:V},`${U}-${P}-${V}`)})})]}),p==="month"&&o.jsx("div",{className:"date-picker-month-grid",children:FC.map((V,I)=>{const re=f&&f.getFullYear()===U&&f.getMonth()===I,ce=new Date().getFullYear()===U&&new Date().getMonth()===I;return o.jsx("button",{type:"button",className:["date-picker-month-item",re?"date-picker-month-item-selected":"",ce&&!re?"date-picker-month-item-current":""].filter(Boolean).join(" "),onClick:()=>L(I),children:V},V)})}),p==="year"&&o.jsx("div",{className:"date-picker-year-grid",children:$.map(V=>{const I=f&&f.getFullYear()===V,re=new Date().getFullYear()===V;return o.jsx("button",{type:"button",className:["date-picker-year-item",I?"date-picker-year-item-selected":"",re&&!I?"date-picker-year-item-current":""].filter(Boolean).join(" "),onClick:()=>F(V),children:V},V)})}),o.jsx("div",{className:"date-picker-footer",children:o.jsx("button",{type:"button",className:"date-picker-today-button",onClick:ae,children:u==="month"?"回到本月":"回到今天"})})]}):null;return o.jsxs(o.Fragment,{children:[o.jsxs("div",{ref:k,className:"date-picker",children:[s&&o.jsx("label",{id:`${h}-label`,className:"date-picker-label",children:s}),o.jsxs("button",{ref:R,type:"button",disabled:l,className:`date-picker-trigger ${m?"date-picker-trigger-open":""}`,onClick:()=>{l||g(V=>{const I=!V;return I&&v(u),I})},"aria-expanded":m,"aria-labelledby":s?`${h}-label ${h}-value`:void 0,"aria-label":s?void 0:u==="month"?"选择月份":"选择日期",children:[o.jsx("span",{id:`${h}-value`,className:f?"":"date-picker-placeholder",children:f?u==="month"?`${f.getFullYear()} / ${String(f.getMonth()+1).padStart(2,"0")}`:KC(f):u==="month"?"选择月份":"选择日期"}),o.jsx(TC,{className:"date-picker-calendar-icon",size:16,strokeWidth:1.7})]})]}),oe&&Rf.createPortal(oe,((N=k.current)==null?void 0:N.ownerDocument.body)||document.body)]})}const WC=`/* Generated from tools/experiments/production_message/production_assistant_demo/src/index.css and App.css.\r
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
`,IC=`/* Shared controls: normal typography, neutral focus and unobtrusive scrollbars. */\r
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
`,eN=`<!doctype html>\r
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
`,tN=""+new URL("Inter-VF2RPR_K.ttf",import.meta.url).href,nN=""+new URL("NotoSansSC-Dz1u1FRy.ttf",import.meta.url).href,Fi=new Map;function rN(n,a,s=!1){const l=JSON.stringify([n,a]),u=`daily-field-cache-v1:${l}`;let h=s?void 0:Fi.get(l);if(!h&&!s)try{const f=JSON.parse(localStorage.getItem(u)||"null");f&&Array.isArray(f.metrics)&&f.metrics.every(m=>m&&typeof m.id=="string"&&typeof m.name=="string")&&(h=Promise.resolve(f),Fi.set(l,h))}catch{}return h||(h=be("daily.getProperties",{id:n,sourceId:a}).then(f=>{try{localStorage.setItem(u,JSON.stringify(f))}catch{}return f}).catch(f=>{throw Fi.delete(l),f}),Fi.set(l,h)),h}function aN(n=!1){if(Fi.clear(),n)try{Object.keys(localStorage).filter(a=>a.startsWith("daily-field-cache-v1:")).forEach(a=>localStorage.removeItem(a))}catch{}}const zl=[0,-1,-2].flatMap(n=>[{granularity:"day",key:n===0?"today":`day${n}`,label:n===0?"今日":`${n===-1?"去年":"前年"}同日`},{granularity:"mtd",key:n===0?"mtd":n===-1?"lastmonth":"mtd-2",label:n===0?"本月累计":`${n===-1?"去年":"前年"}同期月累计`},{granularity:"ytd",key:n===0?"ytd":n===-1?"last":"ytd-2",label:n===0?"本年累计":`${n===-1?"去年":"前年"}同期`},{granularity:"fullyear",key:n===0?"fullyear":n===-1?"full":"full-2",label:`${n===0?"今年":n===-1?"去年":"前年"}全年`}].map(a=>({key:a.key,label:a.label,spec:{granularity:a.granularity,yearOffset:n}}))),Px={"system.date":'today("yyyy年M月d日")',"system.year":'today("yyyy年")',"system.month":'today("M月")',"system.day":'today("d日")'};function iN(n){return Px[n]||n}function bv(n){const a=[[]];function s(u){u.replace(/\u00a0/g," ").split(`
`).forEach((h,f)=>{var g;if(f&&a.push([]),!h)return;const m=a.at(-1);((g=m.at(-1))==null?void 0:g.type)==="text"?m.at(-1).text+=h:m.push({type:"text",text:h})})}function l(u){var h;if(u.nodeType===3){s(u.textContent||"");return}if(u instanceof n.ownerDocument.defaultView.HTMLElement){if(u.dataset.key){const f=iN(u.dataset.key);a.at(-1).push({type:f.startsWith("today(")?"dateToken":"fieldToken",attrs:{placeholder:f,label:u.textContent||"",...u.dataset.legacySpec?{dateRangeSpec:JSON.parse(u.dataset.legacySpec)}:{}}});return}if(u.tagName==="BR"){s(`
`);return}u!==n&&["DIV","P"].includes(u.tagName)&&u.childNodes.length===1&&((h=u.firstChild)==null?void 0:h.nodeName)==="BR"||Array.from(u.childNodes).forEach((f,m)=>{m&&f.nodeType===1&&["DIV","P"].includes(f.tagName)&&s(`
`),l(f)})}}return l(n),{text:a.map(u=>u.map(h=>h.type==="text"?h.text:h.attrs.placeholder).join("")).join(`
`),document:JSON.stringify({type:"doc",content:a.map(u=>({type:"paragraph",content:u}))})}}function sN(n,a,s,l){const u=[...s,...Object.entries(Px).map(([f,m])=>({key:m,label:f==="system.date"?"业务日期":f==="system.year"?"业务年份":f==="system.month"?"业务月份":"业务日",metric:"date",scope:"date",keywords:"",field:void 0}))].filter(f=>f.field||f.metric==="date").sort((f,m)=>m.key.length-f.key.length);let h=a;for(;h;){const f=u.map(m=>({d:m,index:h.indexOf(m.key)})).filter(m=>m.index>=0).sort((m,g)=>m.index-g.index)[0];if(!f){n.append(n.ownerDocument.createTextNode(h));break}f.index&&n.append(n.ownerDocument.createTextNode(h.slice(0,f.index))),n.append(l(f.d)),h=h.slice(f.index+f.d.key.length)}}function lN(n,a,s,l){if(!a)return!1;let u;try{u=JSON.parse(a)}catch{return!1}if(u.type!=="doc")return!1;function h(f){var m,g,p,v;if(f.type==="text"){n.append(n.ownerDocument.createTextNode(f.text||""));return}if(f.type==="hardBreak"){n.append(n.ownerDocument.createTextNode(`
`));return}if(f.type==="fieldToken"||f.type==="dateToken"){const x=((m=f.attrs)==null?void 0:m.placeholder)||"";let b=s.find(E=>E.key===x);b||(b={key:x,label:f.type==="dateToken"?"业务日期":((g=f.attrs)==null?void 0:g.label)||"已有数据",metric:f.type==="dateToken"?"date":"legacy",scope:"legacy",keywords:((p=f.attrs)==null?void 0:p.label)||""},s.push(b));const j=l(b);(v=f.attrs)!=null&&v.dateRangeSpec&&(j.dataset.legacySpec=JSON.stringify(f.attrs.dateRangeSpec)),n.append(j);return}(f.content||[]).forEach((x,b)=>{f.type==="doc"&&b&&n.append(n.ownerDocument.createTextNode(`
`)),h(x)})}return h(u),!0}function Fx({id:n,back:a,changed:s,openSettings:l}){const u=S.useRef(null),[h,f]=S.useState("");return S.useEffect(()=>{let m=!1;const g=u.current;return be("daily.get",{id:n}).then(p=>{if(m)return;const v=oN(p,{back:a,changed:s,openSettings:l});g.dailyRuntime=v,g.srcdoc=eN.replace("../../src/ProductionAssistant.App/Assets/Fonts/Inter.ttf",new URL(tN,window.location.href).href).replace("../../src/ProductionAssistant.App/Assets/Fonts/NotoSansSC.ttf",new URL(nN,window.location.href).href)}).catch(p=>{m||f(String(p.message||p))}),()=>{var p;m=!0,(p=g.dailyRuntime)==null||p.dispose()}},[n]),o.jsxs("div",{className:"message-template-host",children:[h&&o.jsx("p",{role:"alert",children:h}),o.jsx("iframe",{ref:u,title:"日报消息模板"})]})}function oN(n,a){var P;let s=!1,l=!1,u,h,f=Promise.resolve(),m=0,g;const p=new Date,v=n.fields.map(M=>{var D,q,$;return{key:M.placeholder,label:M.label.replace(" · ",""),metric:`${M.databaseId||((D=M.binding)==null?void 0:D.dataSourceId)}:${M.businessId||((q=M.binding)==null?void 0:q.businessMetricId)}`,scope:(($=zl.find(ee=>JSON.stringify(ee.spec)===JSON.stringify(M.dateRangeSpec)))==null?void 0:$.key)||"legacy",keywords:M.label,field:M}}),x=[];let b=(P=n.metricSourceIds)!=null&&P.length?n.metricSourceIds:[...new Set(n.fields.map(M=>{var D;return M.databaseId||((D=M.binding)==null?void 0:D.dataSourceId)}).filter(Boolean))];const j=new Map(n.fields.map(M=>[M.placeholder,M])),E=new Map;function T(M){const D=h==null?void 0:h.querySelector("#preview-status");D&&(D.textContent=M)}function C(){h==null||h.querySelectorAll("[data-send]").forEach(M=>M.disabled=l||!n.notificationConfigured)}async function R(M){M.text===n.draftTemplate&&M.document===n.draftTemplateDocument||(await be("daily.saveTemplate",{id:O,...M}),n.draftTemplate=M.text,n.draftTemplateDocument=M.document)}async function k(){var M;try{const D=await be("daily.get",{id:O});if(s)return;n.notificationConfigured=D.notificationConfigured,n.sources=D.sources,C(),(M=h==null?void 0:h.querySelector("[data-notification-notice]"))==null||M.toggleAttribute("hidden",!!n.notificationConfigured),await _()}catch(D){T(String(D))}}async function _(){var D;const M=await Promise.allSettled(b.map(async q=>({sourceId:q,metrics:(await rN(O,q)).metrics})));if(!s){v.splice(0,v.length,...v.filter(q=>q.field)),x.length=0;for(const q of M)if(q.status==="fulfilled")for(const $ of q.value.metrics){const ee=`${q.value.sourceId}:${$.id}`;x.push([ee,$.name,$.name,0]);const ne=$.granularity==="monthly"?[{key:"month",label:"本月"}]:zl;for(const pe of ne)v.push({key:`${ee}:${pe.key}`,metric:ee,scope:pe.key,label:$.granularity==="monthly"?$.name:pe.label+$.name,keywords:$.name+" "+pe.label+" "+(((D=n.sources.find(le=>le.id===q.value.sourceId))==null?void 0:D.name)||""),sourceId:q.value.sourceId,metricId:$.id});for(const pe of v.filter(le=>le.metric===ee&&le.field))pe.sourceId=q.value.sourceId,pe.metricId=$.id}M.some(q=>q.status==="rejected")?T("部分指标目录读取失败，请到系统设置刷新数据库。"):b.length||T("请在右上角任务设置中配置本任务的指标范围。")}}const O=n.id,U={dirty(){m++,g=void 0},id:O,name:n.name,sendTime:n.sendTime,businessDate:`${p.getFullYear()}-${String(p.getMonth()+1).padStart(2,"0")}-${String(p.getDate()).padStart(2,"0")}`,definitions:v,metrics:x,value:M=>{var D,q,$;return M.metric==="date"?"业务日期":((D=g==null?void 0:g.fieldValues)==null?void 0:D[M.key])||(($=g==null?void 0:g.fieldValues)==null?void 0:$[((q=v.find(ee=>ee.field&&ee.metric===M.metric&&ee.scope===M.scope))==null?void 0:q.key)||""])||""},mount:(M,D)=>{lN(M,n.draftTemplateDocument,v,D)||sN(M,n.draftTemplate,v,D)},async materialize(M){var pe;if(M.field||M.metric==="date")return M;const D=v.find(le=>le.metric===M.metric&&le.sourceId),q=M.sourceId||(D==null?void 0:D.sourceId),$=M.metricId||(D==null?void 0:D.metricId);if(!q||!$)throw new Error("此字段缺少可用的指标定义，请在任务设置中刷新指标。");const ee=JSON.stringify([q,$,M.scope,M.label]);let ne=E.get(ee);return ne||(ne=be("daily.addField",{id:O,sourceId:q,metricId:$,placeholder:"",displayName:M.label,...M.scope==="month"?{rangeKind:"current-month"}:{dateRangeSpec:(pe=zl.find(le=>le.key===M.scope))==null?void 0:pe.spec}}).then(({field:le})=>{j.set(le.placeholder,le);const se={...M,key:le.placeholder,field:le,sourceId:q,metricId:$};return v.some(L=>L.key===se.key)||v.push(se),a.changed(),se}).catch(le=>{throw E.delete(ee),le}),E.set(ee,ne)),ne},save(M){const D=bv(M),q=f.catch(()=>{}).then(()=>s?void 0:R(D));return f=q,q},preview(M,D){const q=bv(M),$=++m,ee=f.catch(()=>{}).then(async()=>{if(s||$!==m)return{succeeded:!1,text:"",message:"内容已修改，请重新生成预览",errors:[]};await R(q);const ne=await be("daily.preview",{id:O,businessDate:D},12e4),pe={...ne,errors:ne.fieldErrors||[],message:ne.succeeded?"已生成 · "+D:ne.message};return $===m&&!s&&(g=pe),pe});return f=ee,ee},async send(M,D,q){if(!l){if(!n.notificationConfigured)throw new Error("请先在系统设置中配置通知渠道。");l=!0,C();try{await U.save(M);const $=await be(D==="test"?"daily.test":"daily.sendToday",D==="test"?{id:O,businessDate:q}:{id:O},12e4);if(!$.succeeded)throw new Error($.message||"发送失败，请查看运行记录");T($.alreadySent?"今日当前内容已发送":D==="test"?"测试发送成功":"今日消息已发送"),a.changed()}finally{l=!1,C()}}},configureAdvanced(M,D){const q=v.some(ne=>ne.metric===M&&ne.scope==="month"),$=q?[{key:"month",label:"本月计划"}]:[{key:"day",label:"日（业务日当天）"},{key:"mtd",label:"月累计（月初至业务日）"},{key:"ytd",label:"年累计（年初至业务日）"},{key:"fullyear",label:"全年"}];D.replaceChildren(...$.map(ne=>new Option(ne.label,ne.key)));const ee=D.ownerDocument.querySelector("#scope-year");ee&&(ee.disabled=q,ee.value="0")},resolveAdvanced(M,D){return M==="month"?"month":zl.find(q=>q.spec.granularity===M&&q.spec.yearOffset===Number(D)).key},async saveBasics(M,D){const q=Array.from((h==null?void 0:h.querySelectorAll("[data-context-source]:checked"))||[]).map($=>$.value);await be("daily.saveBasics",{id:O,name:M,sendTime:D,metricSourceIds:q}),n.name=M,n.sendTime=D,b=q,U.name=M,await _(),a.changed()},connect(M){var ae;h=M,M.title=n.name,M.querySelector("#runs p").textContent="";const D=M.querySelector("header > span");D.removeAttribute("aria-hidden"),D.setAttribute("role","button"),D.setAttribute("tabindex","0"),D.setAttribute("aria-label","返回任务列表");const q=async()=>{const ie=M.querySelector("#editor");ie.contentEditable="false",m++;try{await U.save(ie),a.back()}catch(oe){T(String(oe)),ie.contentEditable="true"}};D.addEventListener("click",q),D.addEventListener("keydown",ie=>{ie.key==="Enter"&&q()});const $=M.querySelector("#settings"),ee=M.createElement("fieldset");ee.style.cssText="border:0;padding:0;max-height:180px;overflow:auto";const ne=M.createElement("legend");ne.textContent="本任务的指标范围",ee.append(ne);for(const ie of n.sources){const oe=M.createElement("label");oe.style.cssText="display:flex;gap:8px;margin:8px 0";const N=M.createElement("input");N.type="checkbox",N.value=ie.id,N.dataset.contextSource="",N.checked=b.includes(ie.id),N.style.width="auto",oe.append(N,M.createTextNode(ie.name)),ee.append(oe)}(ae=$.querySelector("p"))==null||ae.replaceWith(ee);const pe=M.createElement("button");pe.textContent="数据库设置",pe.type="button",pe.onclick=()=>{var ie;$.close(),(ie=a.openSettings)==null||ie.call(a)},ee.after(pe);const le=M.querySelector("footer");for(const[ie,oe]of[["test","测试发送"],["today","发送今日消息"]]){const N=M.createElement("button");N.textContent=oe,N.dataset.send=ie,N.onclick=async()=>{const V=M.querySelector("#editor");V.contentEditable="false";try{await U.send(V,ie,M.querySelector("#date").value)}catch(I){T(String(I))}finally{V.contentEditable="true"}},le.append(N)}const se=M.createElement("style");se.textContent=WC+`
`+IC+`
body{font-family:var(--font-ui)}#date-picker{width:154px}`,M.head.append(se);const L=M.createElement("span");L.className="production-message-demo",L.hidden=!0,M.body.append(L),u=e0.createRoot(M.querySelector("#date-picker")),u.render(o.jsx(cN,{input:M.querySelector("#date")})),window.addEventListener("production-settings-updated",k);const F=M.querySelector("#runs");if(F.ontoggle=async()=>{if(!F.open)return;const ie=F.querySelector("p");ie.textContent="正在读取…";try{const oe=await be("daily.runs",{id:O});ie.textContent=oe.runs.length?"":"暂无运行记录";for(const N of oe.runs){const V=M.createElement("div");V.textContent=`${N.time} · ${N.status} · ${N.businessDate}${N.error?" · "+N.error:""}`,ie.append(V)}}catch(oe){ie.textContent=String(oe)}},!n.notificationConfigured){const ie=M.createElement("div");ie.className="notice",ie.dataset.notificationNotice="",ie.append(M.createTextNode("通知渠道尚未配置。 "));const oe=M.createElement("button");oe.textContent="通知设置",oe.onclick=a.openSettings||null,ie.append(oe),M.querySelector("#message").before(ie)}C(),_().catch(ie=>T(String(ie)))},dispose(){s=!0,m++,u==null||u.unmount(),window.removeEventListener("production-settings-updated",k)}};return U}function cN({input:n}){const[a,s]=S.useState(n.value);return o.jsx(Of,{value:a,onChange:l=>{var u;s(l),n.value=l,n.dispatchEvent(new(((u=n.ownerDocument.defaultView)==null?void 0:u.Event)||Event)("change",{bubbles:!0}))}})}var uN=Object.defineProperty,Fa=(n,a)=>uN(n,"name",{value:a,configurable:!0}),$x=!!(typeof window<"u"&&window.document&&window.document.createElement);function Xr(n,a,{checkForDefaultPrevented:s=!0}={}){return Fa(function(u){if(n==null||n(u),s===!1||!u||!u.defaultPrevented)return a==null?void 0:a(u)},"handleEvent")}Fa(Xr,"composeEventHandlers");function dN(n){var a;if(!$x)throw new Error("Cannot access window outside of the DOM");return((a=n==null?void 0:n.ownerDocument)==null?void 0:a.defaultView)??window}Fa(dN,"getOwnerWindow");function Ud(n){if(!$x)throw new Error("Cannot access document outside of the DOM");return(n==null?void 0:n.ownerDocument)??document}Fa(Ud,"getOwnerDocument");function Kx(n,a=!1){const{activeElement:s}=Ud(n);if(!(s!=null&&s.nodeName))return null;if(Zx(s)&&s.contentDocument)return Kx(s.contentDocument.body,a);if(a){const l=s.getAttribute("aria-activedescendant");if(l){const u=Ud(s).getElementById(l);if(u)return u}}return s}Fa(Kx,"getActiveElement");function Zx(n){return n.tagName==="IFRAME"}Fa(Zx,"isFrame");var fN=Object.defineProperty,zf=(n,a)=>fN(n,"name",{value:a,configurable:!0});function Hd(n,a){if(typeof n=="function")return n(a);n!=null&&(n.current=a)}zf(Hd,"setRef");function Qx(...n){return a=>{let s=!1;const l=n.map(u=>{const h=Hd(u,a);return!s&&typeof h=="function"&&(s=!0),h});if(s)return()=>{for(let u=0;u<l.length;u++){const h=l[u];typeof h=="function"?h():Hd(n[u],null)}}}}zf(Qx,"composeRefs");function $a(...n){return S.useCallback(Qx(...n),n)}zf($a,"useComposedRefs");var hN=Object.defineProperty,Jt=(n,a)=>hN(n,"name",{value:a,configurable:!0});function mN(n,a){const s=S.createContext(a);s.displayName=n+"Context";const l=Jt(h=>{const{children:f,...m}=h,g=S.useMemo(()=>m,Object.values(m));return o.jsx(s.Provider,{value:g,children:f})},"Provider");l.displayName=n+"Provider";function u(h,f={}){const{optional:m=!1}=f,g=S.useContext(s);if(g)return g;if(a!==void 0)return a;if(!m)throw new Error(`\`${h}\` must be used within \`${n}\``)}return Jt(u,"useContext"),[l,u]}Jt(mN,"createContext");function Jx(n,a=[]){let s=[];function l(h,f){const m=S.createContext(f);m.displayName=h+"Context";const g=s.length;s=[...s,f];const p=Jt(x=>{var R;const{scope:b,children:j,...E}=x,T=((R=b==null?void 0:b[n])==null?void 0:R[g])||m,C=S.useMemo(()=>E,Object.values(E));return o.jsx(T.Provider,{value:C,children:j})},"Provider");p.displayName=h+"Provider";function v(x,b,j={}){var R;const{optional:E=!1}=j,T=((R=b==null?void 0:b[n])==null?void 0:R[g])||m,C=S.useContext(T);if(C)return C;if(f!==void 0)return f;if(!E)throw new Error(`\`${x}\` must be used within \`${h}\``)}return Jt(v,"useContext"),[p,v]}Jt(l,"createContext");const u=Jt(()=>{const h=s.map(f=>S.createContext(f));return Jt(function(m){const g=(m==null?void 0:m[n])||h;return S.useMemo(()=>({[`__scope${n}`]:{...m,[n]:g}}),[m,g])},"useScope")},"createScope");return u.scopeName=n,[l,Wx(u,...a)]}Jt(Jx,"createContextScope");function Wx(...n){const a=n[0];if(n.length===1)return a;const s=Jt(()=>{const l=n.map(u=>({useScope:u(),scopeName:u.scopeName}));return Jt(function(h){const f=l.reduce((m,{useScope:g,scopeName:p})=>{const x=g(h)[`__scope${p}`];return{...m,...x}},{});return S.useMemo(()=>({[`__scope${a.scopeName}`]:f}),[f])},"useComposedScopes")},"createScope");return s.scopeName=a.scopeName,s}Jt(Wx,"composeContextScopes");var vr=globalThis!=null&&globalThis.document?S.useLayoutEffect:()=>{},pN=Object.defineProperty,gN=(n,a)=>pN(n,"name",{value:a,configurable:!0}),yN=is[" useId ".trim().toString()]||(()=>{}),vN=0;function Zl(n){const[a,s]=S.useState(yN());return vr(()=>{n||s(l=>l??String(vN++))},[n]),n||(a?`radix-${a}`:"")}gN(Zl,"useId");var xN=Object.defineProperty,bN=(n,a)=>xN(n,"name",{value:a,configurable:!0}),Sv=is[" useEffectEvent ".trim().toString()],wv=is[" useInsertionEffect ".trim().toString()];function Ix(n){if(typeof Sv=="function")return Sv(n);const a=S.useRef(()=>{throw new Error("Cannot call an event handler while rendering.")});return typeof wv=="function"?wv(()=>{a.current=n}):vr(()=>{a.current=n}),S.useMemo(()=>((...s)=>{var l;return(l=a.current)==null?void 0:l.call(a,...s)}),[])}bN(Ix,"useEffectEvent");var SN=Object.defineProperty,ds=(n,a)=>SN(n,"name",{value:a,configurable:!0}),wN=is[" useInsertionEffect ".trim().toString()]||vr;function eb({prop:n,defaultProp:a,onChange:s=ds(()=>{},"onChange"),caller:l}){const[u,h,f]=tb({defaultProp:a,onChange:s}),m=n!==void 0,g=m?n:u,p=S.useCallback(v=>{var x;if(m){const b=nb(v)?v(n):v;b!==n&&((x=f.current)==null||x.call(f,b))}else h(v)},[m,n,h,f]);return[g,p]}ds(eb,"useControllableState");function tb({defaultProp:n,onChange:a}){const[s,l]=S.useState(n),u=S.useRef(s),h=S.useRef(a);return wN(()=>{h.current=a},[a]),S.useEffect(()=>{var f;u.current!==s&&((f=h.current)==null||f.call(h,s),u.current=s)},[s,u]),[s,l,h]}ds(tb,"useUncontrolledState");function nb(n){return typeof n=="function"}ds(nb,"isFunction");var jv=Symbol("RADIX:SYNC_STATE");function jN(n,a,s,l){const{prop:u,defaultProp:h,onChange:f,caller:m}=a,g=u!==void 0,p=Ix(f),v=[{...s,state:h}];l&&v.push(l);const[x,b]=S.useReducer((C,R)=>{if(R.type===jv)return{...C,state:R.state};const k=n(C,R);return g&&!Object.is(k.state,C.state)&&p(k.state),k},...v),j=x.state,E=S.useRef(j);S.useEffect(()=>{E.current!==j&&(E.current=j,g||p(j))},[j,E,g]);const T=S.useMemo(()=>u!==void 0?{...x,state:u}:x,[x,u]);return S.useEffect(()=>{g&&!Object.is(u,x.state)&&b({type:jv,state:u})},[u,x.state,g]),[T,b]}ds(jN,"useControllableStateReducer");var EN=Object.defineProperty,on=(n,a)=>EN(n,"name",{value:a,configurable:!0});function _f(n){const a=S.forwardRef((s,l)=>{let{children:u,...h}=s,f=null,m=!1;const g=[];qd(u)&&typeof _l=="function"&&(u=_l(u._payload)),S.Children.forEach(u,b=>{var j;if(sb(b)){m=!0;const E=b;let T="child"in E.props?E.props.child:E.props.children;qd(T)&&typeof _l=="function"&&(T=_l(T._payload)),f=CN(E,T),g.push((j=f==null?void 0:f.props)==null?void 0:j.children)}else g.push(b)}),f?f=S.cloneElement(f,void 0,g):!m&&S.Children.count(u)===1&&S.isValidElement(u)&&(f=u);const p=f?ib(f):void 0,v=$a(l,p);if(!f){if(u||u===0)throw new Error(m?DN(n):AN(n));return u}const x=ab(h,f.props??{});return f.type!==S.Fragment&&(x.ref=l?v:p),S.cloneElement(f,x)});return a.displayName=`${n}.Slot`,a}on(_f,"createSlot");var rb=Symbol.for("radix.slottable");function TN(n){const a=on(s=>"child"in s?s.children(s.child):s.children,"Slottable");return a.displayName=`${n}.Slottable`,a.__radixId=rb,a}on(TN,"createSlottable");var CN=on((n,a)=>{if("child"in n.props){const s=n.props.child;return S.isValidElement(s)?S.cloneElement(s,void 0,n.props.children(s.props.children)):null}return S.isValidElement(a)?a:null},"getSlottableElementFromSlottable");function ab(n,a){const s={...a};for(const l in a){const u=n[l],h=a[l];/^on[A-Z]/.test(l)?u&&h?s[l]=(...m)=>{const g=h(...m);return u(...m),g}:u&&(s[l]=u):l==="style"?s[l]={...u,...h}:l==="className"&&(s[l]=[u,h].filter(Boolean).join(" "))}return{...n,...s}}on(ab,"mergeProps");function ib(n){var l,u;let a=(l=Object.getOwnPropertyDescriptor(n.props,"ref"))==null?void 0:l.get,s=a&&"isReactWarning"in a&&a.isReactWarning;return s?n.ref:(a=(u=Object.getOwnPropertyDescriptor(n,"ref"))==null?void 0:u.get,s=a&&"isReactWarning"in a&&a.isReactWarning,s?n.props.ref:n.props.ref||n.ref)}on(ib,"getElementRef");function sb(n){return S.isValidElement(n)&&typeof n.type=="function"&&"__radixId"in n.type&&n.type.__radixId===rb}on(sb,"isSlottable");var NN=Symbol.for("react.lazy");function qd(n){return n!=null&&typeof n=="object"&&"$$typeof"in n&&n.$$typeof===NN&&"_payload"in n&&lb(n._payload)}on(qd,"isLazyComponent");function lb(n){return typeof n=="object"&&n!==null&&"then"in n}on(lb,"isPromiseLike");var AN=on(n=>`${n} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`,"createSlotError"),DN=on(n=>`${n} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`,"createSlottableError"),_l=is[" use ".trim().toString()],MN=Object.defineProperty,kN=(n,a)=>MN(n,"name",{value:a,configurable:!0}),RN=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],Ka=RN.reduce((n,a)=>{const s=_f(`Primitive.${a}`),l=S.forwardRef((u,h)=>{const{asChild:f,...m}=u,g=f?s:a;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),o.jsx(g,{...m,ref:h})});return l.displayName=`Primitive.${a}`,{...n,[a]:l}},{});function ob(n,a){n&&Rf.flushSync(()=>n.dispatchEvent(a))}kN(ob,"dispatchDiscreteCustomEvent");var ON=Object.defineProperty,zN=(n,a)=>ON(n,"name",{value:a,configurable:!0});function Ya(n){const a=S.useRef(n);return S.useEffect(()=>{a.current=n}),S.useMemo(()=>((...s)=>{var l;return(l=a.current)==null?void 0:l.call(a,...s)}),[])}zN(Ya,"useCallbackRef");var _N=Object.defineProperty,ot=(n,a)=>_N(n,"name",{value:a,configurable:!0}),Yd="dismissableLayer.update",VN="dismissableLayer.pointerDownOutside",BN="dismissableLayer.focusOutside",Ev,cb=S.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set,dismissableSurfaces:new Set}),LN=S.forwardRef(ot(function(a,s){const{disableOutsidePointerEvents:l=!1,deferPointerDownOutside:u=!1,onEscapeKeyDown:h,onPointerDownOutside:f,onFocusOutside:m,onInteractOutside:g,onDismiss:p,...v}=a,x=S.useContext(cb),[b,j]=S.useState(null),E=(b==null?void 0:b.ownerDocument)??(globalThis==null?void 0:globalThis.document),[,T]=S.useState({}),C=$a(s,j),R=Array.from(x.layers),[k]=[...x.layersWithOutsidePointerEventsDisabled].slice(-1),_=k?R.indexOf(k):-1,O=b?R.indexOf(b):-1,U=x.layersWithOutsidePointerEventsDisabled.size>0,P=O>=_,M=S.useRef(!1),D=db(ne=>{f==null||f(ne),g==null||g(ne),ne.defaultPrevented||p==null||p()},{ownerDocument:E,deferPointerDownOutside:u,isDeferredPointerDownOutsideRef:M,dismissableSurfaces:x.dismissableSurfaces,shouldHandlePointerDownOutside:S.useCallback(ne=>{if(!(ne instanceof Node))return!1;const pe=[...x.branches].some(le=>le.contains(ne));return P&&!pe},[x.branches,P])}),q=fb(ne=>{if(u&&M.current)return;const pe=ne.target;[...x.branches].some(se=>se.contains(pe))||(m==null||m(ne),g==null||g(ne),ne.defaultPrevented||p==null||p())},E),$=b?O===R.length-1:!1,ee=Ya(ne=>{ne.key==="Escape"&&(h==null||h(ne),!ne.defaultPrevented&&p&&(ne.preventDefault(),p()))});return S.useEffect(()=>{if($)return E.addEventListener("keydown",ee,{capture:!0}),()=>E.removeEventListener("keydown",ee,{capture:!0})},[E,$,ee]),S.useEffect(()=>{if(b)return l&&(x.layersWithOutsidePointerEventsDisabled.size===0&&(Ev=E.body.style.pointerEvents,E.body.style.pointerEvents="none"),x.layersWithOutsidePointerEventsDisabled.add(b)),x.layers.add(b),Gd(),()=>{l&&(x.layersWithOutsidePointerEventsDisabled.delete(b),x.layersWithOutsidePointerEventsDisabled.size===0&&(E.body.style.pointerEvents=Ev))}},[b,E,l,x]),S.useEffect(()=>()=>{b&&(x.layers.delete(b),x.layersWithOutsidePointerEventsDisabled.delete(b),Gd())},[b,x]),S.useEffect(()=>{const ne=ot(()=>T({}),"handleUpdate");return document.addEventListener(Yd,ne),()=>document.removeEventListener(Yd,ne)},[]),o.jsx(Ka.div,{...v,ref:C,style:{pointerEvents:U?P?"auto":"none":void 0,...a.style},onFocusCapture:Xr(a.onFocusCapture,q.onFocusCapture),onBlurCapture:Xr(a.onBlurCapture,q.onBlurCapture),onPointerDownCapture:Xr(a.onPointerDownCapture,D.onPointerDownCapture)})},"DismissableLayer"));function ub(){const n=S.useContext(cb),[a,s]=S.useState(null);return S.useEffect(()=>{if(a)return n.dismissableSurfaces.add(a),()=>{n.dismissableSurfaces.delete(a)}},[a,n.dismissableSurfaces]),s}ot(ub,"useDismissableLayerSurface");var UN=ot(()=>!0,"IS_TRUE");function db(n,a){const{ownerDocument:s=globalThis==null?void 0:globalThis.document,deferPointerDownOutside:l=!1,isDeferredPointerDownOutsideRef:u,dismissableSurfaces:h,shouldHandlePointerDownOutside:f=UN}=a,m=Ya(n),g=S.useRef(!1),p=S.useRef(!1),v=S.useRef(new Map),x=S.useRef(()=>{});return S.useEffect(()=>{function b(){p.current=!1,u.current=!1,v.current.clear()}ot(b,"resetOutsideInteraction");function j(){return Array.from(v.current.values()).some(Boolean)}ot(j,"isOutsideInteractionIntercepted");function E(_){if(!p.current)return;const O=_.target;O instanceof Node&&[...h].some(P=>P.contains(O))||v.current.set(_.type,!0),_.type==="click"&&window.setTimeout(()=>{p.current&&x.current()},0)}ot(E,"handleInteractionCapture");function T(_){p.current&&v.current.set(_.type,!1)}ot(T,"handleInteractionBubble");const C=ot(_=>{if(_.target&&!g.current){let O=function(){s.removeEventListener("click",x.current);const P=j();b(),P||Vf(VN,m,U,{discrete:!0})};if(ot(O,"handleAndDispatchPointerDownOutsideEvent"),!f(_.target)){s.removeEventListener("click",x.current),b(),g.current=!1;return}const U={originalEvent:_};p.current=!0,u.current=l&&_.button===0,v.current.clear(),!l||_.button!==0?O():(s.removeEventListener("click",x.current),x.current=O,s.addEventListener("click",x.current,{once:!0}))}else s.removeEventListener("click",x.current),b();g.current=!1},"handlePointerDown"),R=["pointerup","mousedown","mouseup","touchstart","touchend","click"];for(const _ of R)s.addEventListener(_,E,!0),s.addEventListener(_,T);const k=window.setTimeout(()=>{s.addEventListener("pointerdown",C)},0);return()=>{window.clearTimeout(k),s.removeEventListener("pointerdown",C),s.removeEventListener("click",x.current);for(const _ of R)s.removeEventListener(_,E,!0),s.removeEventListener(_,T)}},[s,m,l,u,h,f]),{onPointerDownCapture:ot(()=>g.current=!0,"onPointerDownCapture")}}ot(db,"usePointerDownOutside");function fb(n,a=globalThis==null?void 0:globalThis.document){const s=Ya(n),l=S.useRef(!1);return S.useEffect(()=>{const u=ot(h=>{h.target&&!l.current&&Vf(BN,s,{originalEvent:h},{discrete:!1})},"handleFocus");return a.addEventListener("focusin",u),()=>a.removeEventListener("focusin",u)},[a,s]),{onFocusCapture:ot(()=>l.current=!0,"onFocusCapture"),onBlurCapture:ot(()=>l.current=!1,"onBlurCapture")}}ot(fb,"useFocusOutside");function Gd(){const n=new CustomEvent(Yd);document.dispatchEvent(n)}ot(Gd,"dispatchUpdate");function Vf(n,a,s,{discrete:l}){const u=s.originalEvent.target,h=new CustomEvent(n,{bubbles:!1,cancelable:!0,detail:s});a&&u.addEventListener(n,a,{once:!0}),l?ob(u,h):u.dispatchEvent(h)}ot(Vf,"handleAndDispatchCustomEvent");var HN=Object.defineProperty,St=(n,a)=>HN(n,"name",{value:a,configurable:!0}),id="focusScope.autoFocusOnMount",sd="focusScope.autoFocusOnUnmount",Tv={bubbles:!1,cancelable:!0},qN=S.forwardRef(St(function(a,s){const{loop:l=!1,trapped:u=!1,onMountAutoFocus:h,onUnmountAutoFocus:f,...m}=a,[g,p]=S.useState(null),v=Ya(h),x=Ya(f),b=S.useRef(null),j=$a(s,p),E=S.useRef({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;S.useEffect(()=>{if(u){let C=function(O){if(E.paused||!g)return;const U=O.target;g.contains(U)?b.current=U:Un(b.current,{select:!0})},R=function(O){if(E.paused||!g)return;const U=O.relatedTarget;U!==null&&(g.contains(U)||Un(b.current,{select:!0}))},k=function(O){if(document.activeElement===document.body)for(const P of O)P.removedNodes.length>0&&Un(g)};St(C,"handleFocusIn"),St(R,"handleFocusOut"),St(k,"handleMutations"),document.addEventListener("focusin",C),document.addEventListener("focusout",R);const _=new MutationObserver(k);return g&&_.observe(g,{childList:!0,subtree:!0}),()=>{document.removeEventListener("focusin",C),document.removeEventListener("focusout",R),_.disconnect()}}},[u,g,E.paused]),S.useEffect(()=>{if(g){Cv.add(E);const C=document.activeElement;if(!g.contains(C)){const k=new CustomEvent(id,Tv);g.addEventListener(id,v),g.dispatchEvent(k),k.defaultPrevented||(hb(vb(Bf(g)),{select:!0}),document.activeElement===C&&Un(g))}return()=>{g.removeEventListener(id,v),setTimeout(()=>{const k=new CustomEvent(sd,Tv);g.addEventListener(sd,x),g.dispatchEvent(k),k.defaultPrevented||Un(C??document.body,{select:!0}),g.removeEventListener(sd,x),Cv.remove(E)},0)}}},[g,v,x,E]);const T=S.useCallback(C=>{if(!l&&!u||E.paused)return;const R=C.key==="Tab"&&!C.altKey&&!C.ctrlKey&&!C.metaKey,k=document.activeElement;if(R&&k){const _=C.currentTarget,[O,U]=mb(_);O&&U?!C.shiftKey&&k===U?(C.preventDefault(),l&&Un(O,{select:!0})):C.shiftKey&&k===O&&(C.preventDefault(),l&&Un(U,{select:!0})):k===_&&C.preventDefault()}},[l,u,E.paused]);return o.jsx(Ka.div,{tabIndex:-1,...m,ref:j,onKeyDown:T})},"FocusScope"));function hb(n,{select:a=!1}={}){const s=document.activeElement;for(const l of n)if(Un(l,{select:a}),document.activeElement!==s)return}St(hb,"focusFirst");function mb(n){const a=Bf(n),s=Xd(a,n),l=Xd(a.reverse(),n);return[s,l]}St(mb,"getTabbableEdges");function Bf(n){const a=[],s=document.createTreeWalker(n,NodeFilter.SHOW_ELEMENT,{acceptNode:St(l=>{const u=l.tagName==="INPUT"&&l.type==="hidden";return l.disabled||l.hidden||u?NodeFilter.FILTER_SKIP:l.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP},"acceptNode")});for(;s.nextNode();)a.push(s.currentNode);return a}St(Bf,"getTabbableCandidates");function Xd(n,a){const s=typeof a.checkVisibility=="function"&&a.checkVisibility({checkVisibilityCSS:!0});for(const l of n)if(!(s?!l.checkVisibility({checkVisibilityCSS:!0}):pb(l,{upTo:a})))return l}St(Xd,"findVisible");function pb(n,{upTo:a}){if(getComputedStyle(n).visibility==="hidden")return!0;for(;n;){if(a!==void 0&&n===a)return!1;if(getComputedStyle(n).display==="none")return!0;n=n.parentElement}return!1}St(pb,"isHidden");function gb(n){return n instanceof HTMLInputElement&&"select"in n}St(gb,"isSelectableInput");function Un(n,{select:a=!1}={}){if(n&&n.focus){const s=document.activeElement;n.focus({preventScroll:!0}),n!==s&&gb(n)&&a&&n.select()}}St(Un,"focus");var Cv=yb();function yb(){let n=[];return{add(a){const s=n[0];a!==s&&(s==null||s.pause()),n=Pd(n,a),n.unshift(a)},remove(a){var s;n=Pd(n,a),(s=n[0])==null||s.resume()}}}St(yb,"createFocusScopesStack");function Pd(n,a){const s=[...n],l=s.indexOf(a);return l!==-1&&s.splice(l,1),s}St(Pd,"arrayRemove");function vb(n){return n.filter(a=>a.tagName!=="A")}St(vb,"removeLinks");var YN=Object.defineProperty,GN=(n,a)=>YN(n,"name",{value:a,configurable:!0}),XN=S.forwardRef(GN(function(a,s){var g;const{container:l,...u}=a,[h,f]=S.useState(!1);vr(()=>f(!0),[]);const m=l||h&&((g=globalThis==null?void 0:globalThis.document)==null?void 0:g.body);return m?Rf.createPortal(o.jsx(Ka.div,{...u,ref:s}),m):null},"Portal")),PN=Object.defineProperty,Hn=(n,a)=>PN(n,"name",{value:a,configurable:!0});function xb(n,a){return S.useReducer((s,l)=>a[s][l]??s,n)}Hn(xb,"useStateMachine");var Lf=Hn(n=>{const{present:a,children:s}=n,l=bb(a),u=typeof s=="function"?s({present:l.isPresent}):S.Children.only(s),h=Sb(l.ref,wb(u));return typeof s=="function"||l.isPresent?S.cloneElement(u,{ref:h}):null},"Presence");function bb(n){const[a,s]=S.useState(),l=S.useRef(null),u=S.useRef(n),h=S.useRef("none"),f=S.useRef(void 0),m=n?"mounted":"unmounted",[g,p]=xb(m,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return S.useEffect(()=>{g==="mounted"?(h.current=f.current??za(l.current),f.current=void 0):h.current="none"},[g]),vr(()=>{const v=l.current,x=u.current;if(x!==n){const j=h.current,E=za(v);n?(f.current=E,p("MOUNT")):E==="none"||(v==null?void 0:v.display)==="none"?p("UNMOUNT"):p(x&&j!==E?"ANIMATION_OUT":"UNMOUNT"),u.current=n}},[n,p]),vr(()=>{if(a){let v;const x=a.ownerDocument.defaultView??window,b=Hn(E=>{const C=za(l.current).includes(CSS.escape(E.animationName));if(E.target===a&&C&&(p("ANIMATION_END"),!u.current)){const R=a.style.animationFillMode;a.style.animationFillMode="forwards",v=x.setTimeout(()=>{a.style.animationFillMode==="forwards"&&(a.style.animationFillMode=R)})}},"handleAnimationEnd"),j=Hn(E=>{E.target===a&&(h.current=za(l.current))},"handleAnimationStart");return a.addEventListener("animationstart",j),a.addEventListener("animationcancel",b),a.addEventListener("animationend",b),()=>{x.clearTimeout(v),a.removeEventListener("animationstart",j),a.removeEventListener("animationcancel",b),a.removeEventListener("animationend",b)}}else p("ANIMATION_END")},[a,p]),{isPresent:["mounted","unmountSuspended"].includes(g),ref:S.useCallback(v=>{if(v){const x=getComputedStyle(v);l.current=x,f.current=za(x)}else l.current=null;s(v)},[])}}Hn(bb,"usePresence");function Fd(n,a){if(typeof n=="function")return n(a);n!=null&&(n.current=a)}Hn(Fd,"setRef");function Sb(...n){const a=S.useRef(n);return a.current=n,S.useCallback(s=>{const l=a.current;let u=!1;const h=l.map(f=>{const m=Fd(f,s);return!u&&typeof m=="function"&&(u=!0),m});if(u)return()=>{for(let f=0;f<h.length;f++){const m=h[f];typeof m=="function"?m():Fd(l[f],null)}}},[])}Hn(Sb,"useStableComposedRefs");function za(n){return(n==null?void 0:n.animationName)||"none"}Hn(za,"getAnimationName");function wb(n){var l,u;let a=(l=Object.getOwnPropertyDescriptor(n.props,"ref"))==null?void 0:l.get,s=a&&"isReactWarning"in a&&a.isReactWarning;return s?n.ref:(a=(u=Object.getOwnPropertyDescriptor(n,"ref"))==null?void 0:u.get,s=a&&"isReactWarning"in a&&a.isReactWarning,s?n.props.ref:n.props.ref||n.ref)}Hn(wb,"getElementRef");var FN=Object.defineProperty,Uf=(n,a)=>FN(n,"name",{value:a,configurable:!0}),Vl=0,mn=null;function $N(n){return Hf(),n.children}Uf($N,"FocusGuards");function Hf(){S.useEffect(()=>{mn||(mn={start:$d(),end:$d()});const{start:n,end:a}=mn;return document.body.firstElementChild!==n&&document.body.insertAdjacentElement("afterbegin",n),document.body.lastElementChild!==a&&document.body.insertAdjacentElement("beforeend",a),Vl++,()=>{Vl===1&&(mn==null||mn.start.remove(),mn==null||mn.end.remove(),mn=null),Vl=Math.max(0,Vl-1)}},[])}Uf(Hf,"useFocusGuards");function $d(){const n=document.createElement("span");return n.setAttribute("data-radix-focus-guard",""),n.tabIndex=0,n.style.outline="none",n.style.opacity="0",n.style.position="fixed",n.style.pointerEvents="none",n}Uf($d,"createFocusGuard");var yn=function(){return yn=Object.assign||function(a){for(var s,l=1,u=arguments.length;l<u;l++){s=arguments[l];for(var h in s)Object.prototype.hasOwnProperty.call(s,h)&&(a[h]=s[h])}return a},yn.apply(this,arguments)};function jb(n,a){var s={};for(var l in n)Object.prototype.hasOwnProperty.call(n,l)&&a.indexOf(l)<0&&(s[l]=n[l]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var u=0,l=Object.getOwnPropertySymbols(n);u<l.length;u++)a.indexOf(l[u])<0&&Object.prototype.propertyIsEnumerable.call(n,l[u])&&(s[l[u]]=n[l[u]]);return s}function KN(n,a,s){if(s||arguments.length===2)for(var l=0,u=a.length,h;l<u;l++)(h||!(l in a))&&(h||(h=Array.prototype.slice.call(a,0,l)),h[l]=a[l]);return n.concat(h||Array.prototype.slice.call(a))}var Ql="right-scroll-bar-position",Jl="width-before-scroll-bar",ZN="with-scroll-bars-hidden",QN="--removed-body-scroll-bar-size";function ld(n,a){return typeof n=="function"?n(a):n&&(n.current=a),n}function JN(n,a){var s=S.useState(function(){return{value:n,callback:a,facade:{get current(){return s.value},set current(l){var u=s.value;u!==l&&(s.value=l,s.callback(l,u))}}}})[0];return s.callback=a,s.facade}var WN=typeof window<"u"?S.useLayoutEffect:S.useEffect,Nv=new WeakMap;function IN(n,a){var s=JN(null,function(l){return n.forEach(function(u){return ld(u,l)})});return WN(function(){var l=Nv.get(s);if(l){var u=new Set(l),h=new Set(n),f=s.current;u.forEach(function(m){h.has(m)||ld(m,null)}),h.forEach(function(m){u.has(m)||ld(m,f)})}Nv.set(s,n)},[n]),s}function eA(n){return n}function tA(n,a){a===void 0&&(a=eA);var s=[],l=!1,u={read:function(){if(l)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return s.length?s[s.length-1]:n},useMedium:function(h){var f=a(h,l);return s.push(f),function(){s=s.filter(function(m){return m!==f})}},assignSyncMedium:function(h){for(l=!0;s.length;){var f=s;s=[],f.forEach(h)}s={push:function(m){return h(m)},filter:function(){return s}}},assignMedium:function(h){l=!0;var f=[];if(s.length){var m=s;s=[],m.forEach(h),f=s}var g=function(){var v=f;f=[],v.forEach(h)},p=function(){return Promise.resolve().then(g)};p(),s={push:function(v){f.push(v),p()},filter:function(v){return f=f.filter(v),s}}}};return u}function nA(n){n===void 0&&(n={});var a=tA(null);return a.options=yn({async:!0,ssr:!1},n),a}var Eb=function(n){var a=n.sideCar,s=jb(n,["sideCar"]);if(!a)throw new Error("Sidecar: please provide `sideCar` property to import the right car");var l=a.read();if(!l)throw new Error("Sidecar medium not found");return S.createElement(l,yn({},s))};Eb.isSideCarExport=!0;function rA(n,a){return n.useMedium(a),Eb}var Tb=nA(),od=function(){},xo=S.forwardRef(function(n,a){var s=S.useRef(null),l=S.useState({onScrollCapture:od,onWheelCapture:od,onTouchMoveCapture:od}),u=l[0],h=l[1],f=n.forwardProps,m=n.children,g=n.className,p=n.removeScrollBar,v=n.enabled,x=n.shards,b=n.sideCar,j=n.noRelative,E=n.noIsolation,T=n.inert,C=n.allowPinchZoom,R=n.as,k=R===void 0?"div":R,_=n.gapMode,O=jb(n,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noRelative","noIsolation","inert","allowPinchZoom","as","gapMode"]),U=b,P=IN([s,a]),M=yn(yn({},O),u);return S.createElement(S.Fragment,null,v&&S.createElement(U,{sideCar:Tb,removeScrollBar:p,shards:x,noRelative:j,noIsolation:E,inert:T,setCallbacks:h,allowPinchZoom:!!C,lockRef:s,gapMode:_}),f?S.cloneElement(S.Children.only(m),yn(yn({},M),{ref:P})):S.createElement(k,yn({},M,{className:g,ref:P}),m))});xo.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};xo.classNames={fullWidth:Jl,zeroRight:Ql};var aA=function(){if(typeof __webpack_nonce__<"u")return __webpack_nonce__};function iA(){if(!document)return null;var n=document.createElement("style");n.type="text/css";var a=aA();return a&&n.setAttribute("nonce",a),n}function sA(n,a){n.styleSheet?n.styleSheet.cssText=a:n.appendChild(document.createTextNode(a))}function lA(n){var a=document.head||document.getElementsByTagName("head")[0];a.appendChild(n)}var oA=function(){var n=0,a=null;return{add:function(s){n==0&&(a=iA())&&(sA(a,s),lA(a)),n++},remove:function(){n--,!n&&a&&(a.parentNode&&a.parentNode.removeChild(a),a=null)}}},cA=function(){var n=oA();return function(a,s){S.useEffect(function(){return n.add(a),function(){n.remove()}},[a&&s])}},Cb=function(){var n=cA(),a=function(s){var l=s.styles,u=s.dynamic;return n(l,u),null};return a},uA={left:0,top:0,right:0,gap:0},cd=function(n){return parseInt(n||"",10)||0},dA=function(n){var a=window.getComputedStyle(document.body),s=a[n==="padding"?"paddingLeft":"marginLeft"],l=a[n==="padding"?"paddingTop":"marginTop"],u=a[n==="padding"?"paddingRight":"marginRight"];return[cd(s),cd(l),cd(u)]},fA=function(n){if(n===void 0&&(n="margin"),typeof window>"u")return uA;var a=dA(n),s=document.documentElement.clientWidth,l=window.innerWidth;return{left:a[0],top:a[1],right:a[2],gap:Math.max(0,l-s+a[2]-a[0])}},hA=Cb(),La="data-scroll-locked",mA=function(n,a,s,l){var u=n.left,h=n.top,f=n.right,m=n.gap;return s===void 0&&(s="margin"),`
  .`.concat(ZN,` {
   overflow: hidden `).concat(l,`;
   padding-right: `).concat(m,"px ").concat(l,`;
  }
  body[`).concat(La,`] {
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
  
  .`).concat(Ql,` {
    right: `).concat(m,"px ").concat(l,`;
  }
  
  .`).concat(Jl,` {
    margin-right: `).concat(m,"px ").concat(l,`;
  }
  
  .`).concat(Ql," .").concat(Ql,` {
    right: 0 `).concat(l,`;
  }
  
  .`).concat(Jl," .").concat(Jl,` {
    margin-right: 0 `).concat(l,`;
  }
  
  body[`).concat(La,`] {
    `).concat(QN,": ").concat(m,`px;
  }
`)},Av=function(){var n=parseInt(document.body.getAttribute(La)||"0",10);return isFinite(n)?n:0},pA=function(){S.useEffect(function(){return document.body.setAttribute(La,(Av()+1).toString()),function(){var n=Av()-1;n<=0?document.body.removeAttribute(La):document.body.setAttribute(La,n.toString())}},[])},gA=function(n){var a=n.noRelative,s=n.noImportant,l=n.gapMode,u=l===void 0?"margin":l;pA();var h=S.useMemo(function(){return fA(u)},[u]);return S.createElement(hA,{styles:mA(h,!a,u,s?"":"!important")})},Kd=!1;if(typeof window<"u")try{var Bl=Object.defineProperty({},"passive",{get:function(){return Kd=!0,!0}});window.addEventListener("test",Bl,Bl),window.removeEventListener("test",Bl,Bl)}catch{Kd=!1}var Ma=Kd?{passive:!1}:!1,yA=function(n){return n.tagName==="TEXTAREA"},Nb=function(n,a){if(!(n instanceof Element))return!1;var s=window.getComputedStyle(n);return s[a]!=="hidden"&&!(s.overflowY===s.overflowX&&!yA(n)&&s[a]==="visible")},vA=function(n){return Nb(n,"overflowY")},xA=function(n){return Nb(n,"overflowX")},Dv=function(n,a){var s=a.ownerDocument,l=a;do{typeof ShadowRoot<"u"&&l instanceof ShadowRoot&&(l=l.host);var u=Ab(n,l);if(u){var h=Db(n,l),f=h[1],m=h[2];if(f>m)return!0}l=l.parentNode}while(l&&l!==s.body);return!1},bA=function(n){var a=n.scrollTop,s=n.scrollHeight,l=n.clientHeight;return[a,s,l]},SA=function(n){var a=n.scrollLeft,s=n.scrollWidth,l=n.clientWidth;return[a,s,l]},Ab=function(n,a){return n==="v"?vA(a):xA(a)},Db=function(n,a){return n==="v"?bA(a):SA(a)},wA=function(n,a){return n==="h"&&a==="rtl"?-1:1},jA=function(n,a,s,l,u){var h=wA(n,window.getComputedStyle(a).direction),f=h*l,m=s.target,g=a.contains(m),p=!1,v=f>0,x=0,b=0;do{if(!m)break;var j=Db(n,m),E=j[0],T=j[1],C=j[2],R=T-C-h*E;(E||R)&&Ab(n,m)&&(x+=R,b+=E);var k=m.parentNode;m=k&&k.nodeType===Node.DOCUMENT_FRAGMENT_NODE?k.host:k}while(!g&&m!==document.body||g&&(a.contains(m)||a===m));return(v&&Math.abs(x)<1||!v&&Math.abs(b)<1)&&(p=!0),p},Ll=function(n){return"changedTouches"in n?[n.changedTouches[0].clientX,n.changedTouches[0].clientY]:[0,0]},Mv=function(n){return[n.deltaX,n.deltaY]},kv=function(n){return n&&"current"in n?n.current:n},EA=function(n,a){return n[0]===a[0]&&n[1]===a[1]},TA=function(n){return`
  .block-interactivity-`.concat(n,` {pointer-events: none;}
  .allow-interactivity-`).concat(n,` {pointer-events: all;}
`)},CA=0,ka=[];function NA(n){var a=S.useRef([]),s=S.useRef([0,0]),l=S.useRef(),u=S.useState(CA++)[0],h=S.useState(Cb)[0],f=S.useRef(n);S.useEffect(function(){f.current=n},[n]),S.useEffect(function(){if(n.inert){document.body.classList.add("block-interactivity-".concat(u));var T=KN([n.lockRef.current],(n.shards||[]).map(kv),!0).filter(Boolean);return T.forEach(function(C){return C.classList.add("allow-interactivity-".concat(u))}),function(){document.body.classList.remove("block-interactivity-".concat(u)),T.forEach(function(C){return C.classList.remove("allow-interactivity-".concat(u))})}}},[n.inert,n.lockRef.current,n.shards]);var m=S.useCallback(function(T,C){if("touches"in T&&T.touches.length===2||T.type==="wheel"&&T.ctrlKey)return!f.current.allowPinchZoom;var R=Ll(T),k=s.current,_="deltaX"in T?T.deltaX:k[0]-R[0],O="deltaY"in T?T.deltaY:k[1]-R[1],U,P=T.target,M=Math.abs(_)>Math.abs(O)?"h":"v";if("touches"in T&&M==="h"&&P.type==="range")return!1;var D=window.getSelection(),q=D&&D.anchorNode,$=q?q===P||q.contains(P):!1;if($)return!1;var ee=Dv(M,P);if(!ee)return!0;if(ee?U=M:(U=M==="v"?"h":"v",ee=Dv(M,P)),!ee)return!1;if(!l.current&&"changedTouches"in T&&(_||O)&&(l.current=U),!U)return!0;var ne=l.current||U;return jA(ne,C,T,ne==="h"?_:O)},[]),g=S.useCallback(function(T){var C=T;if(!(!ka.length||ka[ka.length-1]!==h)){var R="deltaY"in C?Mv(C):Ll(C),k=a.current.filter(function(U){return U.name===C.type&&(U.target===C.target||C.target===U.shadowParent)&&EA(U.delta,R)})[0];if(k&&k.should){C.cancelable&&C.preventDefault();return}if(!k){var _=(f.current.shards||[]).map(kv).filter(Boolean).filter(function(U){return U.contains(C.target)}),O=_.length>0?m(C,_[0]):!f.current.noIsolation;O&&C.cancelable&&C.preventDefault()}}},[]),p=S.useCallback(function(T,C,R,k){var _={name:T,delta:C,target:R,should:k,shadowParent:AA(R)};a.current.push(_),setTimeout(function(){a.current=a.current.filter(function(O){return O!==_})},1)},[]),v=S.useCallback(function(T){s.current=Ll(T),l.current=void 0},[]),x=S.useCallback(function(T){p(T.type,Mv(T),T.target,m(T,n.lockRef.current))},[]),b=S.useCallback(function(T){p(T.type,Ll(T),T.target,m(T,n.lockRef.current))},[]);S.useEffect(function(){return ka.push(h),n.setCallbacks({onScrollCapture:x,onWheelCapture:x,onTouchMoveCapture:b}),document.addEventListener("wheel",g,Ma),document.addEventListener("touchmove",g,Ma),document.addEventListener("touchstart",v,Ma),function(){ka=ka.filter(function(T){return T!==h}),document.removeEventListener("wheel",g,Ma),document.removeEventListener("touchmove",g,Ma),document.removeEventListener("touchstart",v,Ma)}},[]);var j=n.removeScrollBar,E=n.inert;return S.createElement(S.Fragment,null,E?S.createElement(h,{styles:TA(u)}):null,j?S.createElement(gA,{noRelative:n.noRelative,gapMode:n.gapMode}):null)}function AA(n){for(var a=null;n!==null;)n instanceof ShadowRoot&&(a=n.host,n=n.host),n=n.parentNode;return a}const DA=rA(Tb,NA);var Mb=S.forwardRef(function(n,a){return S.createElement(xo,yn({},n,{ref:a,sideCar:DA}))});Mb.classNames=xo.classNames;var MA=function(n){if(typeof document>"u")return null;var a=Array.isArray(n)?n[0]:n;return a.ownerDocument.body},Ra=new WeakMap,Ul=new WeakMap,Hl={},ud=0,kb=function(n){return n&&(n.host||kb(n.parentNode))},kA=function(n,a){return a.map(function(s){if(n.contains(s))return s;var l=kb(s);return l&&n.contains(l)?l:(console.error("aria-hidden",s,"in not contained inside",n,". Doing nothing"),null)}).filter(function(s){return!!s})},RA=function(n,a,s,l){var u=kA(a,Array.isArray(n)?n:[n]);Hl[s]||(Hl[s]=new WeakMap);var h=Hl[s],f=[],m=new Set,g=new Set(u),p=function(x){!x||m.has(x)||(m.add(x),p(x.parentNode))};u.forEach(p);var v=function(x){!x||g.has(x)||Array.prototype.forEach.call(x.children,function(b){if(m.has(b))v(b);else try{var j=b.getAttribute(l),E=j!==null&&j!=="false",T=(Ra.get(b)||0)+1,C=(h.get(b)||0)+1;Ra.set(b,T),h.set(b,C),f.push(b),T===1&&E&&Ul.set(b,!0),C===1&&b.setAttribute(s,"true"),E||b.setAttribute(l,"true")}catch(R){console.error("aria-hidden: cannot operate on ",b,R)}})};return v(a),m.clear(),ud++,function(){f.forEach(function(x){var b=Ra.get(x)-1,j=h.get(x)-1;Ra.set(x,b),h.set(x,j),b||(Ul.has(x)||x.removeAttribute(l),Ul.delete(x)),j||x.removeAttribute(s)}),ud--,ud||(Ra=new WeakMap,Ra=new WeakMap,Ul=new WeakMap,Hl={})}},OA=function(n,a,s){s===void 0&&(s="data-aria-hidden");var l=Array.from(Array.isArray(n)?n:[n]),u=MA(n);return u?(l.push.apply(l,Array.from(u.querySelectorAll("[aria-live], script"))),RA(l,u,s,"aria-hidden")):function(){return null}},zA=Object.defineProperty,cn=(n,a)=>zA(n,"name",{value:a,configurable:!0}),qf="Dialog",[Rb,kD]=Jx(qf),[_A,qn]=Rb(qf),Rv=cn(n=>{const{__scopeDialog:a,children:s,open:l,defaultOpen:u,onOpenChange:h,modal:f=!0}=n,m=S.useRef(null),g=S.useRef(null),[p,v]=eb({prop:l,defaultProp:u??!1,onChange:h,caller:qf}),[x,b]=S.useState(0),[j,E]=S.useState(0);return o.jsx(_A,{scope:a,triggerRef:m,contentRef:g,contentId:Zl(),titleId:Zl(),descriptionId:Zl(),titlePresent:x>0,descriptionPresent:j>0,setTitleCount:b,setDescriptionCount:E,open:p,onOpenChange:v,onOpenToggle:S.useCallback(()=>v(T=>!T),[v]),modal:f,children:s})},"Dialog"),Ob="DialogPortal",[VA,zb]=Rb(Ob,{forceMount:void 0}),Ov=cn(n=>{const{__scopeDialog:a,forceMount:s,children:l,container:u}=n,h=qn(Ob,a);return o.jsx(VA,{scope:a,forceMount:s,children:S.Children.map(l,f=>o.jsx(Lf,{present:s||h.open,children:o.jsx(XN,{asChild:!0,container:u,children:f})}))})},"DialogPortal"),Zd="DialogOverlay",zv=S.forwardRef(cn(function(a,s){const l=zb(Zd,a.__scopeDialog),{forceMount:u=l.forceMount,...h}=a,f=qn(Zd,a.__scopeDialog);return f.modal?o.jsx(Lf,{present:u||f.open,children:o.jsx(LA,{...h,ref:s})}):null},"DialogOverlay")),BA=_f("DialogOverlay.RemoveScroll"),LA=S.forwardRef(cn(function(a,s){const{__scopeDialog:l,...u}=a,h=qn(Zd,l),f=ub(),m=$a(s,f);return o.jsx(Mb,{as:BA,allowPinchZoom:!0,shards:[h.contentRef],children:o.jsx(Ka.div,{"data-state":Yf(h.open),...u,ref:m,style:{pointerEvents:"auto",...u.style}})})},"DialogOverlayImpl")),rs="DialogContent",_v=S.forwardRef(cn(function(a,s){const l=zb(rs,a.__scopeDialog),{forceMount:u=l.forceMount,...h}=a,f=qn(rs,a.__scopeDialog);return o.jsx(Lf,{present:u||f.open,children:f.modal?o.jsx(UA,{...h,ref:s}):o.jsx(HA,{...h,ref:s})})},"DialogContent")),UA=S.forwardRef(cn(function(a,s){const l=qn(rs,a.__scopeDialog),u=S.useRef(null),h=$a(s,l.contentRef,u);return S.useEffect(()=>{const f=u.current;if(f)return OA(f)},[]),o.jsx(_b,{...a,ref:h,trapFocus:l.open,disableOutsidePointerEvents:l.open,onCloseAutoFocus:Xr(a.onCloseAutoFocus,f=>{var m;f.preventDefault(),(m=l.triggerRef.current)==null||m.focus()}),onPointerDownOutside:Xr(a.onPointerDownOutside,f=>{const m=f.detail.originalEvent,g=m.button===0&&m.ctrlKey===!0;(m.button===2||g)&&f.preventDefault()}),onFocusOutside:Xr(a.onFocusOutside,f=>f.preventDefault())})},"DialogContentModal")),HA=S.forwardRef(cn(function(a,s){const l=qn(rs,a.__scopeDialog),u=S.useRef(!1),h=S.useRef(!1);return o.jsx(_b,{...a,ref:s,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:f=>{var m,g;(m=a.onCloseAutoFocus)==null||m.call(a,f),f.defaultPrevented||(u.current||(g=l.triggerRef.current)==null||g.focus(),f.preventDefault()),u.current=!1,h.current=!1},onInteractOutside:f=>{var p,v;(p=a.onInteractOutside)==null||p.call(a,f),f.defaultPrevented||(u.current=!0,f.detail.originalEvent.type==="pointerdown"&&(h.current=!0));const m=f.target;((v=l.triggerRef.current)==null?void 0:v.contains(m))&&f.preventDefault(),f.detail.originalEvent.type==="focusin"&&h.current&&f.preventDefault()}})},"DialogContentNonModal")),_b=S.forwardRef(cn(function(a,s){const{__scopeDialog:l,trapFocus:u,onOpenAutoFocus:h,onCloseAutoFocus:f,...m}=a,g=qn(rs,l);return Hf(),o.jsx(o.Fragment,{children:o.jsx(qN,{asChild:!0,loop:!0,trapped:u,onMountAutoFocus:h,onUnmountAutoFocus:f,children:o.jsx(LN,{role:"dialog",id:g.contentId,"aria-describedby":g.descriptionPresent?g.descriptionId:void 0,"aria-labelledby":g.titlePresent?g.titleId:void 0,"data-state":Yf(g.open),...m,ref:s,deferPointerDownOutside:!0,onDismiss:()=>g.onOpenChange(!1)})})})},"DialogContentImpl")),qA="DialogTitle",Vv=S.forwardRef(cn(function(a,s){const{__scopeDialog:l,...u}=a,h=qn(qA,l),{setTitleCount:f}=h;return vr(()=>(f(m=>m+1),()=>f(m=>m-1)),[f]),o.jsx(Ka.h2,{id:h.titleId,...u,ref:s})},"DialogTitle")),YA="DialogDescription",Bv=S.forwardRef(cn(function(a,s){const{__scopeDialog:l,...u}=a,h=qn(YA,l),{setDescriptionCount:f}=h;return vr(()=>(f(m=>m+1),()=>f(m=>m-1)),[f]),o.jsx(Ka.p,{id:h.descriptionId,...u,ref:s})},"DialogDescription"));function Yf(n){return n?"open":"closed"}cn(Yf,"getState");function GA(n){const a=n-5;return Array.from({length:12},(s,l)=>a+l)}function XA(n,a){const s=new Date(n,a,1),l=new Date(n,a,1-s.getDay());return Array.from({length:42},(u,h)=>{const f=new Date(l.getFullYear(),l.getMonth(),l.getDate()+h);return{date:Vb(f),day:f.getDate(),currentMonth:f.getMonth()===a}})}function Vb(n){const a=n.getFullYear(),s=String(n.getMonth()+1).padStart(2,"0"),l=String(n.getDate()).padStart(2,"0");return`${a}-${s}-${l}`}function Lv(n){const[a,s,l]=n.split("-").map(Number),u=new Date(a,s-1,l);return a&&s&&l&&u.getFullYear()===a&&u.getMonth()===s-1&&u.getDate()===l?u:new Date}function mr({value:n,options:a,placeholder:s,disabled:l,ariaLabel:u,onChange:h}){const[f,m]=S.useState(!1),g=Lx(),p=a.find(v=>v.value===n);return o.jsxs("div",{className:"form-picker",children:[o.jsxs("button",{type:"button",className:`picker-trigger ${f?"open":""}`,disabled:l,"aria-label":u,"aria-haspopup":"listbox","aria-expanded":f,onClick:()=>m(!f),children:[o.jsx("span",{className:p?"":"picker-placeholder",children:(p==null?void 0:p.label)||s}),o.jsx(CC,{})]}),f&&o.jsxs(o.Fragment,{children:[o.jsx("button",{type:"button",className:"picker-backdrop","aria-label":"关闭选项",onClick:()=>m(!1)}),o.jsxs(Mf.div,{className:"picker-popover choice-popover",role:"listbox",initial:g?!1:{opacity:0,y:-5},animate:{opacity:1,y:0,transitionEnd:{transform:"none"}},transition:{duration:g?0:.12},children:[a.map(v=>o.jsxs("button",{type:"button",role:"option","aria-selected":v.value===n,className:v.value===n?"selected":"",onClick:()=>{h(v.value),m(!1)},children:[o.jsx("span",{children:v.label}),v.value===n&&o.jsx(us,{})]},v.value)),!a.length&&o.jsx("span",{className:"picker-empty",children:"暂无可选项"})]})]})]})}function Ua({value:n,onChange:a}){const s=Lv(n),[l,u]=S.useState(!1),[h,f]=S.useState("days"),[m,g]=S.useState(()=>new Date(s.getFullYear(),s.getMonth(),1)),p=XA(m.getFullYear(),m.getMonth()),v=GA(m.getFullYear()),x=Vb(new Date),b=T=>{a(T),u(!1);const C=Lv(T);g(new Date(C.getFullYear(),C.getMonth(),1))},j=()=>{const T=!l;u(T),f("days"),T&&g(new Date(s.getFullYear(),s.getMonth(),1))},E=T=>g(h==="days"?new Date(m.getFullYear(),m.getMonth()+T,1):new Date(m.getFullYear()+T*(h==="years"?12:1),m.getMonth(),1));return o.jsxs("div",{className:"date-picker",children:[o.jsxs("button",{type:"button",className:`date-trigger ${l?"open":""}`,"aria-haspopup":"dialog","aria-expanded":l,onClick:j,children:[o.jsx("span",{children:n?n.replaceAll("-","/"):"选择日期"}),o.jsx(Hx,{})]}),l&&o.jsxs(o.Fragment,{children:[o.jsx("button",{type:"button",className:"date-backdrop","aria-label":"关闭日期选择器",onClick:()=>u(!1)}),o.jsxs(Mf.div,{className:"calendar-popover",role:"dialog","aria-label":"选择日期",initial:{opacity:0,y:-6},animate:{opacity:1,y:0,transitionEnd:{transform:"none"}},transition:{duration:.14},children:[o.jsxs("div",{className:"calendar-head",children:[o.jsx("button",{type:"button","aria-label":"上一页",onClick:()=>E(-1),children:o.jsx(qx,{})}),o.jsx("button",{type:"button",className:"calendar-title",onClick:()=>f(T=>T==="days"?"months":"years"),children:h==="years"?`${v[0]}–${v[11]} 年`:`${m.getFullYear()} 年${h==="days"?` ${m.getMonth()+1} 月`:""}`}),o.jsx("button",{type:"button","aria-label":"下一页",onClick:()=>E(1),children:o.jsx(Yx,{})})]}),h==="days"?o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"weekdays",children:["日","一","二","三","四","五","六"].map(T=>o.jsx("span",{children:T},T))}),o.jsx("div",{className:"calendar-grid",children:p.map(T=>o.jsx("button",{type:"button",className:`${T.currentMonth?"":"outside"} ${T.date===n?"selected":""} ${T.date===x?"today":""}`,onClick:()=>b(T.date),children:T.day},T.date))})]}):h==="months"?o.jsx("div",{className:"month-grid",children:Array.from({length:12},(T,C)=>o.jsxs("button",{type:"button",className:s.getFullYear()===m.getFullYear()&&s.getMonth()===C?"selected":"",onClick:()=>{g(new Date(m.getFullYear(),C,1)),f("days")},children:[C+1," 月"]},C))}):o.jsx("div",{className:"month-grid year-grid",children:v.map(T=>o.jsx("button",{type:"button",className:s.getFullYear()===T?"selected":"",onClick:()=>{g(new Date(T,m.getMonth(),1)),f("months")},children:T},T))}),o.jsx("div",{className:"calendar-footer",children:o.jsx("button",{type:"button",onClick:()=>b(x),children:"今天"})})]})]})]})}const PA=()=>{const n=new Date;return n.setDate(n.getDate()-1),`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`};function FA({id:n,section:a,changed:s}){const[l,u]=S.useState(),[h,f]=S.useState(""),[m,g]=S.useState(""),[p,v]=S.useState(""),[x,b]=S.useState(""),[j,E]=S.useState(PA),[T,C]=S.useState(),[R,k]=S.useState(),[_,O]=S.useState(),[U,P]=S.useState(!1),[M,D]=S.useState(""),[q,$]=S.useState(""),ee=()=>be("notionFill.get",{id:n}).then(F=>{u(F),f(F.name),g(F.sourcePageUrl),v(F.username)});S.useEffect(()=>{ee().catch(ne)},[n]);function ne(F){O({tone:"error",title:"操作失败",message:F instanceof Error?F.message:String(F)})}async function pe(){$("save"),O(void 0);try{await be("notionFill.save",{id:n,name:h,sourcePageUrl:m,username:p,password:x}),b(""),await ee(),s(),O({tone:"success",title:"配置已保存",message:"测试通过后即可返回任务列表启用。"})}catch(F){ne(F)}finally{$("")}}async function le(){$("test"),O(void 0),C(void 0),P(!1);try{await be("notionFill.save",{id:n,name:h,sourcePageUrl:m,username:p,password:x}),b("");const F=await be("notionFill.test",{id:n,businessDate:j},12e4);C(F),await ee(),s(),O({tone:"success",title:"只读测试通过",message:F.message})}catch(F){ne(F)}finally{$("")}}async function se(){$("source-test"),O(void 0),k(void 0);try{await be("notionFill.save",{id:n,name:h,sourcePageUrl:m,username:p,password:x}),b("");const F=await be("notionFill.testSource",{id:n,businessDate:j},12e4);k(F),await ee(),s(),O({tone:"success",title:"93 系统读取成功",message:F.message})}catch(F){O({tone:"error",title:"93 系统读取失败",message:F instanceof Error?F.message:String(F)})}finally{$("")}}async function L(){$("run"),O(void 0);try{const F=await be("notionFill.runNow",{id:n,businessDate:j},12e4);P(!1),C(ie=>ie&&{...ie,targetRecordExists:!0,message:F.message}),F.created&&D(j),s();const ae=!F.created&&M===j;O({tone:"success",title:F.created?"Notion 写入成功":ae?"重复执行验证通过":"目标记录已存在",message:ae?`首次写入已成功；${F.message}`:F.message})}catch(F){ne(F)}finally{$("")}}return l?o.jsxs("div",{className:"page daily-page notion-fill-page automation-task-panel",children:[_&&o.jsx("div",{className:`notice ${_.tone}`,role:"status",children:o.jsxs("div",{children:[o.jsx("strong",{children:_.title}),o.jsx("span",{children:_.message})]})}),!l.notionConfigured&&a!=="basics"&&o.jsx("div",{className:"notice warning",role:"status",children:o.jsxs("div",{children:[o.jsx("strong",{children:"Notion 连接未就绪"}),o.jsx("span",{children:"请先在“设置 → Notion 连接”中保存并测试 Token，然后再执行只读测试。"})]})}),a==="basics"&&o.jsxs("section",{className:"surface notion-fill-card",id:"basics",children:[o.jsxs("div",{className:"notion-fill-heading",children:[o.jsx(ad,{}),o.jsxs("div",{children:[o.jsx("h2",{children:"基本信息"}),o.jsx("p",{children:"名称用于在自动化任务列表中识别当前任务。"})]})]}),o.jsx("div",{className:"notion-fill-fields",children:o.jsxs("label",{children:["任务名称",o.jsx("input",{value:h,onChange:F=>{f(F.target.value),C(void 0)}})]})}),o.jsx("div",{className:"notion-fill-actions",children:o.jsxs("button",{className:"secondary",disabled:!!q||!h.trim()||!p.trim()||!x&&!l.passwordConfigured,onClick:pe,children:[q==="save"&&o.jsx(sn,{className:"spin"}),"保存配置"]})})]}),a==="configuration"&&o.jsxs("section",{className:"surface notion-fill-card",id:"configuration",children:[o.jsxs("div",{className:"notion-fill-heading",children:[o.jsx(ad,{}),o.jsxs("div",{children:[o.jsx("h2",{children:"93 系统连接"}),o.jsx("p",{children:"连接配置由当前任务保存，密码只保留 Windows 加密值。"})]})]}),o.jsxs("div",{className:"notion-fill-fields",children:[o.jsxs("label",{className:"notion-fill-wide-field",children:["材料入库业务页面",o.jsx("input",{type:"url",value:m,placeholder:"http://服务器/业务页面",onChange:F=>{g(F.target.value),C(void 0)}})]}),o.jsxs("label",{children:["用户名",o.jsx("input",{autoComplete:"username",value:p,onChange:F=>{v(F.target.value),C(void 0)}})]}),o.jsxs("label",{children:["密码",o.jsx("input",{type:"password",autoComplete:"current-password",value:x,placeholder:l.passwordConfigured?"已保存；留空表示不修改":"请输入93系统密码",onChange:F=>{b(F.target.value),C(void 0)}})]})]}),o.jsxs("div",{className:"notion-fill-subsection",children:[o.jsxs("div",{className:"notion-fill-heading",children:[o.jsx(fo,{}),o.jsxs("div",{children:[o.jsx("h2",{children:"固定填报目标"}),o.jsx("p",{children:"当前任务只支持已确认的原材料入库日汇总，不提供通用字段映射。"})]})]}),o.jsxs("dl",{className:"notion-fill-contract",children:[o.jsxs("div",{children:[o.jsx("dt",{children:"目标数据库"}),o.jsx("dd",{children:l.targetDataSourceName})]}),o.jsxs("div",{children:[o.jsx("dt",{children:"字段"}),o.jsx("dd",{children:"业务、日期、板材、型材"})]}),o.jsxs("div",{children:[o.jsx("dt",{children:"写入方式"}),o.jsx("dd",{children:"按日期查重，仅新增，不覆盖"})]}),o.jsxs("div",{children:[o.jsx("dt",{children:"执行计划"}),o.jsx("dd",{children:l.schedule})]})]})]}),o.jsx("div",{className:"notion-fill-actions",children:o.jsxs("button",{className:"secondary",disabled:!!q||!h.trim()||!p.trim()||!x&&!l.passwordConfigured,onClick:pe,children:[q==="save"&&o.jsx(sn,{className:"spin"}),"保存任务配置"]})})]}),a==="execution"&&o.jsxs("section",{className:"surface notion-fill-card notion-fill-test",id:"execution",children:[o.jsxs("div",{className:"notion-fill-heading",children:[o.jsx(yv,{}),o.jsxs("div",{children:[o.jsx("h2",{children:"运行与测试"}),o.jsx("p",{children:"读取指定日期的 93 数据并检查 Notion 是否已有记录；只有二次确认后才会写入。"})]})]}),o.jsxs("div",{className:"notion-fill-testbar",children:[o.jsxs("label",{children:["测试业务日期",o.jsx(Ua,{value:j,onChange:F=>{E(F),C(void 0),k(void 0),P(!1),D("")}})]}),o.jsxs("div",{className:"notion-fill-test-actions",children:[o.jsxs("button",{className:"secondary",disabled:!!q||!h.trim()||!p.trim()||!x&&!l.passwordConfigured,onClick:se,children:[q==="source-test"?o.jsx(sn,{className:"spin"}):o.jsx(ad,{}),"仅测试 93 读取"]}),o.jsxs("button",{className:"primary",disabled:!!q||!l.notionConfigured||!h.trim()||!p.trim()||!x&&!l.passwordConfigured,onClick:le,children:[q==="test"?o.jsx(sn,{className:"spin"}):o.jsx(yv,{}),"测试读取与查重"]})]})]}),R&&o.jsxs("div",{className:"notion-fill-result",children:[o.jsxs("div",{children:[o.jsx("span",{children:"板材"}),o.jsxs("strong",{children:[R.plateWeight.toLocaleString("zh-CN",{maximumFractionDigits:3})," 吨"]})]}),o.jsxs("div",{children:[o.jsx("span",{children:"型材"}),o.jsxs("strong",{children:[R.sectionWeight.toLocaleString("zh-CN",{maximumFractionDigits:3})," 吨"]})]}),o.jsxs("div",{children:[o.jsx("span",{children:"合计"}),o.jsxs("strong",{children:[R.totalWeight.toLocaleString("zh-CN",{maximumFractionDigits:3})," 吨"]})]}),o.jsxs("p",{children:[o.jsx(uo,{}),"93 系统读取成功，本次未访问 Notion"]})]}),T&&o.jsxs("div",{className:"notion-fill-result",children:[o.jsxs("div",{children:[o.jsx("span",{children:"板材"}),o.jsxs("strong",{children:[T.plateWeight.toLocaleString("zh-CN",{maximumFractionDigits:3})," 吨"]})]}),o.jsxs("div",{children:[o.jsx("span",{children:"型材"}),o.jsxs("strong",{children:[T.sectionWeight.toLocaleString("zh-CN",{maximumFractionDigits:3})," 吨"]})]}),o.jsxs("div",{children:[o.jsx("span",{children:"合计"}),o.jsxs("strong",{children:[T.totalWeight.toLocaleString("zh-CN",{maximumFractionDigits:3})," 吨"]})]}),o.jsxs("p",{children:[o.jsx(uo,{}),T.targetRecordExists?"目标日期已有记录，正式任务将跳过":"目标日期暂无记录，可以新增"]})]}),T&&!U&&o.jsxs("div",{className:"notion-fill-write-action",children:[o.jsxs("button",{className:"danger",disabled:!!q,onClick:()=>P(!0),children:[q==="run"&&o.jsx(sn,{className:"spin"}),T.targetRecordExists?"再次执行验证查重":"执行本日期"]}),o.jsx("span",{children:"正式执行会重新读取并查重；仅在目标日期不存在时新增。"})]}),T&&U&&o.jsxs("div",{className:"notice warning notion-fill-confirm",role:"alert",children:[o.jsxs("div",{children:[o.jsxs("strong",{children:["确认正式执行 ",j,"？"]}),o.jsx("span",{children:T.targetRecordExists?"当前检测到已有记录，执行应只产生跳过记录。":`将向“${l.targetDataSourceName}”新增板材 ${T.plateWeight} 吨、型材 ${T.sectionWeight} 吨。`})]}),o.jsxs("div",{className:"notion-fill-confirm-actions",children:[o.jsx("button",{className:"secondary",disabled:!!q,onClick:()=>P(!1),children:"取消"}),o.jsxs("button",{className:"danger",disabled:!!q,onClick:L,children:[q==="run"&&o.jsx(sn,{className:"spin"}),"确认执行"]})]})]})]})]}):o.jsx("div",{className:"page daily-page",children:o.jsx(sn,{className:"spin page-loader"})})}function $A({onCreated:n,onBack:a,onCancel:s}){const[l,u]=S.useState(2),[h,f]=S.useState("日报任务"),[m,g]=S.useState("17:30"),[p,v]=S.useState(!1),[x,b]=S.useState("");async function j(){v(!0),b("");try{const E=await be("daily.create",{name:h.trim(),sendTime:m});await n(E)}catch(E){b(E instanceof Error?E.message:String(E))}finally{v(!1)}}return o.jsxs(o.Fragment,{children:[o.jsx(KA,{current:l}),x&&o.jsx("div",{className:"notice error",role:"alert",children:o.jsxs("div",{children:[o.jsx("strong",{children:"创建失败"}),o.jsx("span",{children:x})]})}),l===2?o.jsxs("div",{className:"automation-create-step",children:[o.jsxs("div",{children:[o.jsx("h3",{children:"基本信息"}),o.jsx("p",{children:"名称用于在自动化任务列表中识别这份日报。"})]}),o.jsxs("label",{children:["任务名称",o.jsx("input",{value:h,autoFocus:!0,onChange:E=>f(E.target.value)})]}),o.jsxs("div",{className:"dialog-actions",children:[o.jsxs("button",{className:"ghost",onClick:a,children:[o.jsx(ns,{}),"返回选择类型"]}),o.jsx("button",{className:"primary",disabled:!h.trim(),onClick:()=>u(3),children:"下一步"})]})]}):o.jsxs("div",{className:"automation-create-step",children:[o.jsxs("div",{children:[o.jsx("h3",{children:"日报必要配置"}),o.jsx("p",{children:"先确定每天的发送时间；消息字段和测试发送在创建后的专用 Tab 中完成。"})]}),o.jsxs("label",{children:["每天发送时间",o.jsx("input",{type:"time",value:m,onChange:E=>g(E.target.value)})]}),o.jsxs("div",{className:"automation-create-summary",children:[o.jsx("span",{children:"任务类型"}),o.jsx("strong",{children:"日报推送"}),o.jsx("span",{children:"创建后继续"}),o.jsx("strong",{children:"消息内容 → 预览与测试"})]}),o.jsxs("div",{className:"dialog-actions",children:[o.jsxs("button",{className:"ghost",disabled:p,onClick:()=>u(2),children:[o.jsx(ns,{}),"上一步"]}),o.jsx("button",{className:"secondary",disabled:p,onClick:s,children:"取消"}),o.jsxs("button",{className:"primary",disabled:p||!m,onClick:j,children:[p&&o.jsx(sn,{className:"spin"}),"创建任务"]})]})]})]})}function KA({current:n}){return o.jsxs("ol",{className:"automation-create-progress","aria-label":"新建任务进度",children:[o.jsx("li",{className:"done",children:"1 选择类型"}),o.jsx("li",{className:n===2?"current":"done",children:"2 基本信息"}),o.jsx("li",{className:n===3?"current":"",children:"3 必要配置"})]})}function ZA({onCreated:n,onBack:a,onCancel:s}){const[l,u]=S.useState(2),[h,f]=S.useState("原材料入库自动填报"),[m,g]=S.useState(""),[p,v]=S.useState(""),[x,b]=S.useState(""),[j,E]=S.useState(!1),[T,C]=S.useState("");async function R(){E(!0),C("");try{const k=await be("notionFill.create",{name:h.trim(),sourcePageUrl:m.trim(),username:p.trim(),password:x});await n(k)}catch(k){C(k instanceof Error?k.message:String(k))}finally{E(!1)}}return o.jsxs(o.Fragment,{children:[o.jsx(QA,{current:l}),T&&o.jsx("div",{className:"notice error",role:"alert",children:o.jsxs("div",{children:[o.jsx("strong",{children:"创建失败"}),o.jsx("span",{children:T})]})}),l===2?o.jsxs("div",{className:"automation-create-step",children:[o.jsxs("div",{children:[o.jsx("h3",{children:"基本信息"}),o.jsx("p",{children:"名称用于在自动化任务列表中识别这份填报任务。"})]}),o.jsxs("label",{children:["任务名称",o.jsx("input",{value:h,autoFocus:!0,onChange:k=>f(k.target.value)})]}),o.jsxs("div",{className:"dialog-actions",children:[o.jsxs("button",{className:"ghost",onClick:a,children:[o.jsx(ns,{}),"返回选择类型"]}),o.jsx("button",{className:"primary",disabled:!h.trim(),onClick:()=>u(3),children:"下一步"})]})]}):o.jsxs("div",{className:"automation-create-step",children:[o.jsxs("div",{children:[o.jsx("h3",{children:"93 系统连接"}),o.jsx("p",{children:"凭据只归 NotionFill 任务所有，并使用现有 Windows 加密存储。"})]}),o.jsxs("label",{children:["材料入库业务页面",o.jsx("input",{type:"url",value:m,placeholder:"http://服务器/业务页面",autoFocus:!0,onChange:k=>g(k.target.value)})]}),o.jsxs("label",{children:["93 系统用户名",o.jsx("input",{value:p,autoComplete:"username",onChange:k=>v(k.target.value)})]}),o.jsxs("label",{children:["93 系统密码",o.jsx("input",{type:"password",value:x,autoComplete:"new-password",onChange:k=>b(k.target.value)})]}),o.jsxs("div",{className:"automation-create-summary",children:[o.jsx("span",{children:"填报目标"}),o.jsx("strong",{children:"原材料入库数据库"}),o.jsx("span",{children:"执行时间"}),o.jsx("strong",{children:"每天 00:00 · 填报前一天"}),o.jsx("span",{children:"写入方式"}),o.jsx("strong",{children:"按日期查重，仅新增"})]}),o.jsxs("div",{className:"dialog-actions",children:[o.jsxs("button",{className:"ghost",disabled:j,onClick:()=>u(2),children:[o.jsx(ns,{}),"上一步"]}),o.jsx("button",{className:"secondary",disabled:j,onClick:s,children:"取消"}),o.jsxs("button",{className:"primary",disabled:j||!m.trim()||!p.trim()||!x,onClick:R,children:[j&&o.jsx(sn,{className:"spin"}),"创建任务"]})]})]})]})}function QA({current:n}){return o.jsxs("ol",{className:"automation-create-progress","aria-label":"新建任务进度",children:[o.jsx("li",{className:"done",children:"1 选择类型"}),o.jsx("li",{className:n===2?"current":"done",children:"2 基本信息"}),o.jsx("li",{className:n===3?"current":"",children:"3 必要配置"})]})}const Bb=[{taskType:"daily_report",name:"日报推送",description:"查询日报数据、生成消息并发送钉钉。",renderCreate:n=>o.jsx($A,{...n}),taskTabs:[{id:"configuration",label:"任务配置"},{id:"execution",label:"运行与测试"}],resolveSection:n=>n==="basics"?"basics":n==="template"?"configuration":"execution",issueTitle:n=>n==="notification"?"通知渠道未就绪":n==="template"?"日报配置尚未验证":"基本信息不完整",renderEditor:n=>o.jsx(Fx,{id:n.id,back:()=>n.navigate("list"),changed:n.changed,openSettings:n.openSettings}),loadRuns:n=>be("daily.runs",{id:n}).then(({runs:a})=>a.map(s=>({id:s.id,time:s.time,source:s.source,status:s.status,title:s.textSummary||`业务日期 ${s.businessDate||"—"}`,details:[`业务日期：${s.businessDate||"—"}`,`阶段：${s.stage}`,`尝试：${s.attempts}`],error:s.error})))},{taskType:"notion_fill",name:"Notion 自动填报",description:"读取 93 系统前一天入库数据并新增到 Notion。",renderCreate:n=>o.jsx(ZA,{...n}),taskTabs:[{id:"configuration",label:"任务配置"},{id:"execution",label:"运行与测试"}],resolveSection:n=>n==="basics"?"basics":n==="test"?"execution":"configuration",issueTitle:n=>n==="connection"?"93 系统连接未就绪":n==="target"?"Notion 填报目标未就绪":n==="test"?"任务尚未完成只读测试":"基本信息不完整",renderEditor:n=>o.jsx(FA,{...n}),loadRuns:n=>be("notionFill.runs",{id:n}).then(({runs:a})=>a.map(s=>({id:s.id,time:s.time,source:s.source==="source-test"?"93读取测试":s.source==="test"?"只读测试":s.source==="manual"?"手动执行":"自动执行",status:s.status==="created"?"已新增":s.status==="checked"?"已检查":"失败",title:`${s.businessDate} · 板材 ${s.plateWeight.toLocaleString("zh-CN",{maximumFractionDigits:3})} 吨 · 型材 ${s.sectionWeight.toLocaleString("zh-CN",{maximumFractionDigits:3})} 吨`,details:[s.message].filter(Boolean),error:s.error})))}];function Uv(n){return Bb.find(a=>a.taskType===n)}const dd=n=>({tone:"error",title:"操作失败",message:n instanceof Error?n.message:String(n)});function JA({openSettings:n}){var M;const[a,s]=S.useState([]),[l,u]=S.useState(),[h,f]=S.useState(""),[m,g]=S.useState(""),[p,v]=S.useState(),[x,b]=S.useState(),[j,E]=S.useState(),[T,C]=S.useState(!1),[R,k]=S.useState(""),_=()=>be("automation.list").then(D=>{const q=Array.isArray(D.tasks)?D.tasks:a;return s(q),u($=>$&&(q.find(ee=>ee.taskType===$.taskType&&ee.id===$.id)||$)),q});S.useEffect(()=>{_().catch(D=>v(dd(D)))},[]),S.useEffect(()=>{if(!x)return;const D=()=>b(void 0),q=$=>$.key==="Escape"&&D();return window.addEventListener("pointerdown",D),window.addEventListener("keydown",q),window.addEventListener("blur",D),()=>{window.removeEventListener("pointerdown",D),window.removeEventListener("keydown",q),window.removeEventListener("blur",D)}},[x]);async function O(D,q){const $=await _();C(!1),k(""),u($.find(ee=>ee.taskType===D&&ee.id===q.id))}async function U(D){g(D.id),v(void 0);try{const q=await be("automation.setEnabled",{taskType:D.taskType,id:D.id,enabled:!D.isEnabled},6e4);q.missingStep?(f(q.missingStep),u(D),v({tone:"warning",title:"配置尚未完成",message:q.message||""})):await _()}catch(q){v(dd(q))}finally{g("")}}async function P(D){if(!D.isEnabled){g(D.id);try{await be("automation.delete",{taskType:D.taskType,id:D.id}),E(void 0),await _()}catch(q){v(dd(q))}finally{g("")}}}if(l){const D=Uv(l.taskType);if(D)return o.jsx(WA,{openSettings:n,task:l,definition:D,focusStep:h,notice:p,refresh:_,back:()=>{u(void 0),f(""),v(void 0),_()}})}return o.jsxs("div",{className:"page daily-page automation-list-page",children:[o.jsxs("header",{children:[o.jsxs("div",{children:[o.jsx("h1",{children:"自动化任务"}),o.jsx("p",{children:"管理定时推送与自动填报，查看任务配置和运行情况。"})]}),o.jsx("div",{className:"header-actions",children:o.jsxs("button",{className:"primary",onClick:()=>C(!0),children:[o.jsx(zC,{}),"新建任务"]})})]}),p&&o.jsx("div",{className:`notice ${p.tone}`,role:"status",children:o.jsxs("div",{children:[o.jsx("strong",{children:p.title}),o.jsx("span",{children:p.message})]})}),o.jsxs("section",{className:"daily-job-list","aria-label":"任务列表",children:[a.map(D=>o.jsxs("article",{className:`daily-job-card${["incomplete","pending-test","schedule-error"].includes(D.status)?" needs-attention":""}`,onClick:()=>u(D),onContextMenu:q=>{q.preventDefault(),b({task:D,x:Math.min(q.clientX,window.innerWidth-176),y:Math.min(q.clientY,window.innerHeight-58)})},children:[o.jsxs("div",{className:"job-copy",children:[o.jsx("h2",{children:o.jsx("button",{type:"button",className:"automation-task-name",onClick:q=>{q.stopPropagation(),u(D)},children:D.name||"未命名任务"})}),o.jsxs("p",{children:[D.taskTypeName," · ",D.schedule," · ",D.connectionStatus]})]}),o.jsxs("div",{className:"job-actions",onClick:q=>q.stopPropagation(),children:[o.jsx("span",{className:`job-status ${D.status}`,children:Lb(D.status)}),o.jsxs("label",{className:"switch",children:[o.jsx("input",{type:"checkbox","aria-label":`启用${D.name||"未命名任务"}`,checked:D.isEnabled,disabled:!D.schedulingAvailable||m===D.id,title:D.schedulingAvailable?void 0:"Development 环境默认不启用定时任务",onChange:()=>U(D)}),o.jsx("span",{})]}),o.jsx("button",{type:"button",className:"automation-task-more","aria-label":`${D.name||"未命名任务"}的更多操作`,"aria-haspopup":"menu",onClick:q=>{const $=q.currentTarget.getBoundingClientRect();b({task:D,x:Math.min($.left,window.innerWidth-176),y:Math.min($.bottom+4,window.innerHeight-58)})},children:o.jsx(AC,{})})]}),o.jsxs("div",{className:"automation-card-footer",children:["最近运行：",D.lastRun]})]},`${D.taskType}:${D.id}`)),!a.length&&o.jsxs("div",{className:"empty-state",children:[o.jsx(MC,{}),o.jsx("h2",{children:"还没有自动化任务"}),o.jsx("p",{children:"选择一种任务类型，新建后进入对应的专用配置界面。"})]})]}),!!a.length&&o.jsx("p",{className:"automation-list-help",children:"点击任务名称进入配置。日报配置通知后即可开启，执行结果见运行记录。"}),x&&o.jsx("div",{className:"job-context-menu",role:"menu",style:{left:x.x,top:x.y},onPointerDown:D=>D.stopPropagation(),children:o.jsxs("button",{className:"danger-quiet",role:"menuitem",disabled:x.task.isEnabled||m===x.task.id,onClick:()=>{E(x.task),b(void 0)},children:[o.jsx(qC,{}),x.task.isEnabled?"停用后可删除":"删除任务"]})}),o.jsx(Rv,{open:!!j,onOpenChange:D=>!D&&E(void 0),children:o.jsxs(Ov,{children:[o.jsx(zv,{className:"dialog-overlay"}),o.jsxs(_v,{className:"dialog",children:[o.jsx(Vv,{children:"删除自动化任务？"}),o.jsxs(Bv,{children:["将删除“",j==null?void 0:j.name,"”及其业务记录，此操作无法撤销。"]}),o.jsxs("div",{className:"dialog-actions",children:[o.jsx("button",{className:"secondary",onClick:()=>E(void 0),children:"取消"}),o.jsx("button",{className:"danger",disabled:!!m,onClick:()=>j&&P(j),children:"确认删除"})]})]})]})}),o.jsx(Rv,{open:T,onOpenChange:D=>{C(D),D||k("")},children:o.jsxs(Ov,{children:[o.jsx(zv,{className:"dialog-overlay"}),o.jsxs(_v,{className:"dialog automation-create-dialog",children:[o.jsx(Vv,{children:"新建自动化任务"}),o.jsx(Bv,{children:R?"填写任务信息，创建后可随时通过 Tab 修改。":"先选择任务类型，后续配置由对应任务自己提供。"}),R?(M=Uv(R))==null?void 0:M.renderCreate({onCreated:D=>O(R,D),onBack:()=>k(""),onCancel:()=>{C(!1),k("")}}):o.jsx("div",{className:"automation-create-types",children:Bb.map(D=>o.jsxs("button",{onClick:()=>k(D.taskType),children:[o.jsx("strong",{children:D.name}),o.jsx("span",{children:D.description})]},D.taskType))})]})]})})]})}function WA({openSettings:n,task:a,definition:s,focusStep:l,notice:u,refresh:h,back:f}){const[m,g]=S.useState(l?s.resolveSection(l):"basics"),p=a.taskType==="daily_report",[v,x]=S.useState(),[b,j]=S.useState(""),[E,T]=S.useState(!1),C=[{id:"basics",label:"基本信息"},...s.taskTabs,{id:"runs",label:"运行记录"}],R=[...a.missingMessage?[{id:`configuration:${a.missingStep||"unknown"}`,title:s.issueTitle(a.missingStep||""),message:a.missingMessage,section:s.resolveSection(a.missingStep||"")}]:[],...a.status==="schedule-error"&&a.schedulerMessage?[{id:"scheduler",title:"计划任务异常",message:a.schedulerMessage,section:"basics"}]:[]];async function k(){T(!0),j("");try{x(await s.loadRuns(a.id))}catch(O){j(O instanceof Error?O.message:String(O))}finally{T(!1)}}S.useEffect(()=>{m==="runs"&&v===void 0&&k()},[m,v]);function _(O,U){var M;if(O.key!=="ArrowLeft"&&O.key!=="ArrowRight")return;O.preventDefault();const P=(U+(O.key==="ArrowRight"?1:-1)+C.length)%C.length;g(C[P].id),C[P].id==="basics"&&h().catch(()=>{}),(M=document.getElementById(`automation-tab-${C[P].id}`))==null||M.focus()}return p?o.jsx(Fx,{id:a.id,back:f,changed:h,openSettings:n}):o.jsxs("div",{className:"page daily-page automation-detail",children:[o.jsxs("header",{children:[o.jsxs("div",{children:[o.jsxs("button",{className:"back-link","aria-label":"返回任务列表",onClick:f,children:[o.jsx(ns,{}),"返回任务列表"]}),o.jsx("h1",{title:a.name||"未命名任务",children:a.name||"未命名任务"}),o.jsxs("p",{children:[a.taskTypeName," · ",a.schedule]})]}),o.jsx("span",{className:`job-status ${a.status}`,children:Lb(a.status)})]}),o.jsx("div",{className:"automation-tabs",role:"tablist","aria-label":"任务详情",children:C.map((O,U)=>o.jsx("button",{type:"button",role:"tab",id:`automation-tab-${O.id}`,"aria-selected":m===O.id,"aria-controls":`automation-panel-${O.id}`,tabIndex:m===O.id?0:-1,onClick:()=>{g(O.id),O.id==="basics"&&h().catch(()=>{})},onKeyDown:P=>_(P,U),children:O.label},O.id))}),o.jsxs("div",{children:[u&&o.jsx("div",{className:`notice ${u.tone}`,role:"status",children:o.jsxs("div",{children:[o.jsx("strong",{children:u.title}),o.jsx("span",{children:u.message})]})}),!!R.length&&o.jsxs("section",{className:"automation-issues","aria-labelledby":"automation-issues-title",children:[o.jsxs("div",{className:"automation-issues-heading",children:[o.jsx(YC,{}),o.jsxs("div",{children:[o.jsx("h2",{id:"automation-issues-title",children:"配置问题"}),o.jsx("p",{children:"完成以下项目后才能安全启用任务。"})]}),o.jsxs("span",{children:[R.length," 项"]})]}),o.jsx("ul",{children:R.map(O=>{var U;return o.jsxs("li",{children:[o.jsxs("div",{children:[o.jsx("strong",{children:O.title}),o.jsx("span",{children:O.message})]}),o.jsxs("button",{type:"button",onClick:()=>{g(O.section)},children:["前往",((U=C.find(P=>P.id===O.section))==null?void 0:U.label)||"处理",o.jsx(EC,{})]})]},O.id)})})]}),o.jsxs("div",{className:"automation-tab-panel",role:"tabpanel",id:`automation-panel-${m}`,"aria-labelledby":`automation-tab-${m}`,children:[o.jsx("div",{hidden:m==="runs",children:s.renderEditor({id:a.id,section:m,openSettings:n,navigate:g,changed:()=>{h().catch(()=>{})}})}),m==="runs"&&o.jsxs("section",{className:"surface automation-runs",children:[o.jsxs("div",{className:"automation-runs-heading",children:[o.jsxs("div",{children:[o.jsx("h2",{children:"运行记录"}),o.jsx("p",{children:"查看任务执行结果和错误详情。"})]}),o.jsxs("button",{className:"secondary",disabled:E,onClick:k,children:[E?o.jsx(sn,{className:"spin"}):o.jsx(_C,{}),"刷新"]})]}),b&&o.jsx("div",{className:"notice error",role:"alert",children:o.jsxs("div",{children:[o.jsx("strong",{children:"运行记录读取失败"}),o.jsx("span",{children:b})]})}),o.jsx("div",{className:"automation-run-list",children:v==null?void 0:v.map(O=>o.jsxs("details",{children:[o.jsxs("summary",{children:[o.jsx("span",{children:O.time}),o.jsx("span",{children:O.source}),o.jsx("strong",{children:O.title}),o.jsx("b",{className:O.error?"error-text":"",children:O.status})]}),o.jsxs("div",{children:[O.details.map(U=>o.jsx("p",{children:U},U)),O.error&&o.jsxs("p",{className:"run-error",children:["错误：",O.error]})]})]},O.id))}),!E&&v&&!v.length&&o.jsx("p",{className:"automation-empty",children:"暂无运行记录"})]})]})]})]})}function Lb(n){return{incomplete:"配置未完成","pending-test":"待测试",ready:"可启用",enabled:"已启用","schedule-error":"计划异常"}[n]||n}function Hv({value:n,onChange:a,unit:s,className:l="",disabled:u,ariaLabel:h,onKeyDown:f}){return o.jsxs("div",{className:`numeric-input ${l}`.trim(),children:[o.jsx("input",{type:"text",inputMode:"decimal",value:n,disabled:u,"aria-label":h,onChange:m=>a(m.target.value),onKeyDown:f}),s&&o.jsx("span",{children:s})]})}function Ub({current:n,titles:a,label:s}){const l=a.map((u,h)=>({number:h+1,title:u}));return o.jsx("div",{className:"step-bar","aria-label":s,children:l.map((u,h)=>{const f=u.number<n?"done":u.number===n?"active":"pending";return o.jsxs(S.Fragment,{children:[o.jsxs("div",{className:`step step-${f}`,"aria-current":f==="active"?"step":void 0,children:[o.jsx("div",{className:`step-circle ${f}`,children:f==="done"?o.jsx(us,{}):u.number}),o.jsx("span",{children:u.title})]}),h<l.length-1&&o.jsx("div",{className:`step-line ${u.number<n?"done":u.number===n?"transition":"pending"}`})]},u.number)})})}const qv={configured:!1,binding:{bound:!1,name:"",path:""},usesBusinessSections:!1,businessSections:[],sources:[],selected:""};function IA(){const n=new Date;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`}function eD({openSettings:n}){const[a,s]=S.useState(1),[l,u]=S.useState(IA),[h,f]=S.useState(""),[m,g]=S.useState([]),[p,v]=S.useState(qv),[x,b]=S.useState(!1),[j,E]=S.useState("database"),[T,C]=S.useState(""),[R,k]=S.useState(""),[_,O]=S.useState(!1),[U,P]=S.useState("state"),[M,D]=S.useState(""),[q,$]=S.useState(""),[ee,ne]=S.useState(),pe=S.useRef(!1),le=S.useRef(!1);S.useEffect(()=>{be("weld.getState").then(Q=>{var W;const de=Q!=null&&Q.binding&&Array.isArray(Q.sources)?Q:qv;v(de),C(((W=de.sources.find(he=>he.id===de.selected))==null?void 0:W.businessSection)||""),k(de.selected)}).catch(Q=>D(Q instanceof Error?Q.message:"读取 Notion 配置失败")).finally(()=>P(void 0))},[]);const se=/^\d+$/.test(h)&&Number(h)>0,L=S.useMemo(()=>m.reduce((Q,de)=>Q+Number(de.qty||0),0),[m]),F=L-Number(h||0),ae=m.length>0&&m.every(Q=>/^\d+$/.test(Q.qty))&&F===0,ie=p.usesBusinessSections?p.sources.filter(Q=>Q.businessSection===T):p.sources,oe=U==="generate"||U==="check"||U==="write";async function N(){if(!(!se||oe)){P("generate"),D("");try{const Q=await be("weld.generate",{month:l,total:h});g(Q.map(de=>({...de,qty:String(de.qty)}))),s(2)}catch(Q){D(Q instanceof Error?Q.message:"拆分失败")}finally{P(void 0)}}}function V(Q,de){de!==""&&!/^\d+$/.test(de)||g(W=>W.map((he,Ce)=>Ce===Q?{...he,qty:de}:he))}async function I(){if(R){P("binding"),D("");try{const Q=await be("weld.saveBinding",{sourceId:R});v(Q),k(Q.selected),b(!1)}catch(Q){D(Q instanceof Error?Q.message:"绑定失败")}finally{P(void 0)}}}async function re(){if(!ae||!p.binding.bound||oe||pe.current)return;pe.current=!0,P("check"),D("");const Q={month:l,total:h,rows:m.map(de=>({date:de.date,qty:de.qty}))};try{if((await be("weld.check",Q,12e4)).hasExistingData){O(!0);return}await ce(Q,!1)}catch(de){D(de instanceof Error?de.message:"Notion 数据检查失败")}finally{pe.current=!1,P(de=>de==="check"?void 0:de)}}async function ce(Q,de){if(!le.current){le.current=!0,P("write"),D(""),ne(void 0);try{const W=await be("weld.write",{...Q,overwriteExisting:de},12e4,he=>ne(he));$(W.message),O(!1),s(3)}catch(W){D(W instanceof Error?W.message:"写入 Notion 失败")}finally{le.current=!1,P(void 0)}}}function ye(){s(1),g([]),f(""),$(""),D(""),ne(void 0)}function xe(){D(""),E("database"),b(!0)}const te={month:l,total:h,rows:m.map(Q=>({date:Q.date,qty:Q.qty}))};return o.jsx("div",{className:"app-shell",children:o.jsxs("main",{className:"main-content",children:[o.jsxs("header",{className:"content-header",children:[o.jsxs("div",{children:[o.jsx("h1",{children:"月度焊接计划拆分"}),o.jsx("p",{children:"按自然日模拟产量浮动，确认后写入 Notion 焊接数据库"})]}),o.jsx("button",{type:"button",className:"template-config-button",disabled:U==="state",onClick:xe,children:"焊接设置"})]}),o.jsxs("div",{className:"production-message-scroll daily-weld-page",children:[o.jsx(Ub,{current:a,titles:["录入计划","拆分预览","完成"],label:"焊接计划拆分进度"}),M&&o.jsx("div",{className:"weld-notice error",role:"alert",children:M}),a===1&&o.jsxs("section",{className:"weld-plan-card","aria-labelledby":"weld-plan-title",children:[o.jsxs("div",{className:"weld-section-heading",children:[o.jsx("h2",{id:"weld-plan-title",children:"计划信息"}),o.jsx("p",{children:"输入本月计划焊接总量，下一步将生成每日拆分预览。"})]}),o.jsxs("div",{className:"weld-fields",children:[o.jsx(Of,{label:"计划月份",value:l,selectionMode:"month",disabled:oe,onChange:u}),o.jsxs("label",{className:"weld-field",children:[o.jsx("span",{children:"计划焊接总量（吨）"}),o.jsx(Hv,{value:h,disabled:oe,onChange:Q=>{(Q===""||/^\d+$/.test(Q))&&f(Q)},unit:"吨",ariaLabel:"计划焊接总量"})]})]}),o.jsxs("div",{className:"weld-method-note",children:[o.jsx("strong",{children:"按自然日分配 · 模拟真实产量浮动"}),o.jsx("span",{children:"工作日与周末采用不同权重，并叠加波动；每日取整后自动配平至计划总量。"})]}),o.jsx("div",{className:"weld-actions",children:o.jsx("button",{type:"button",className:"primary-button",disabled:!se||oe,onClick:N,children:U==="generate"?"正在拆分…":"下一步：拆分预览"})})]}),a===2&&o.jsxs("section",{className:"weld-preview","aria-labelledby":"weld-preview-title",children:[o.jsxs("div",{className:"weld-preview-heading",children:[o.jsxs("div",{children:[o.jsxs("h2",{id:"weld-preview-title",children:[l.replace("-"," 年 ")," 月每日拆分详情"]}),o.jsx("p",{children:"可直接修改任意一天的数值；不满意本次浮动效果可重新模拟。"})]}),o.jsxs("button",{type:"button",className:"secondary",disabled:oe,onClick:N,children:[o.jsx(Xx,{}),"重新模拟浮动"]})]}),o.jsx("div",{className:"weld-table-wrap",children:o.jsxs("table",{children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{children:"日期"}),o.jsx("th",{children:"星期"}),o.jsx("th",{children:"类型"}),o.jsx("th",{children:"计划量（吨）"})]})}),o.jsx("tbody",{children:m.map((Q,de)=>o.jsxs("tr",{children:[o.jsx("td",{children:Q.date}),o.jsx("td",{children:Q.weekday}),o.jsx("td",{children:o.jsx("span",{className:`weld-day-pill ${Q.isWeekend?"weekend":""}`,children:Q.isWeekend?"休息日":"工作日"})}),o.jsx("td",{children:o.jsx(Hv,{value:Q.qty,disabled:oe,onChange:W=>V(de,W),unit:"吨",ariaLabel:`${Q.date} 计划量`})})]},Q.date))})]})}),o.jsxs("div",{className:"weld-summary",children:[o.jsxs("span",{children:["共 ",m.length," 天 · 计划总量 ",o.jsx("strong",{children:h})," 吨"]}),o.jsxs("span",{children:["拆分合计 ",o.jsx("strong",{children:L})," 吨 ",F===0?o.jsx("em",{className:"match",children:"与计划总量一致"}):o.jsxs("em",{className:"mismatch",children:["偏差 ",F>0?"+":"",F," 吨，可手动调整"]})]})]}),U==="write"&&o.jsx("div",{className:"weld-write-progress",role:"status","aria-live":"polite",children:ee?`正在写入 ${ee.date.slice(0,10)}（${ee.current}/${ee.total}）`:"正在准备 Notion 层级数据…"}),o.jsxs("div",{className:"weld-actions split",children:[o.jsx("button",{type:"button",className:"secondary",disabled:oe,onClick:()=>s(1),children:"返回修改"}),o.jsx("button",{type:"button",className:"primary-button",disabled:!ae||!p.binding.bound||oe,onClick:re,children:U==="check"?"正在检查…":U==="write"?"正在写入…":"确认并写入 Notion"})]})]}),a===3&&o.jsxs("section",{className:"complete-view weld-complete",children:[o.jsx("div",{className:"complete-icon",children:o.jsx(us,{})}),o.jsx("h2",{children:"入库完成"}),o.jsx("p",{children:q||`${l} 共 ${m.length} 天的焊接计划数据已写入 Notion。`}),o.jsx("button",{className:"primary-button",onClick:ye,children:"拆分下一个月"})]})]}),x&&o.jsx("div",{className:"weld-settings-overlay",children:o.jsxs("section",{className:"weld-settings-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"weld-settings-title",children:[o.jsxs("aside",{className:"weld-settings-nav",children:[o.jsx("h2",{id:"weld-settings-title",children:"焊接设置"}),o.jsxs("nav",{"aria-label":"焊接设置分类",children:[o.jsxs("button",{type:"button",className:j==="rules"?"active":"",onClick:()=>E("rules"),children:[o.jsx(HC,{}),"拆分规则"]}),o.jsxs("button",{type:"button",className:j==="database"?"active":"",onClick:()=>E("database"),children:[o.jsx(fo,{}),"数据库绑定"]})]})]}),o.jsxs("div",{className:"weld-settings-main",children:[o.jsx("button",{type:"button",className:"weld-settings-close","aria-label":"关闭焊接设置",disabled:U==="binding",onClick:()=>b(!1),children:o.jsx(XC,{})}),j==="rules"?o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"weld-settings-heading",children:[o.jsx("h3",{children:"拆分规则"}),o.jsx("p",{children:"当前规则用于生成每日焊接计划，修改每日数值后仍需保证月度合计一致。"})]}),o.jsxs("dl",{className:"weld-rule-list",children:[o.jsxs("div",{children:[o.jsx("dt",{children:"分配周期"}),o.jsx("dd",{children:"按所选月份的全部自然日"})]}),o.jsxs("div",{children:[o.jsx("dt",{children:"产量浮动"}),o.jsx("dd",{children:"基准量叠加 22% 随机波动"})]}),o.jsxs("div",{children:[o.jsx("dt",{children:"周末权重"}),o.jsx("dd",{children:"周六、周日自动降低计划权重"})]}),o.jsxs("div",{children:[o.jsx("dt",{children:"总量配平"}),o.jsx("dd",{children:"每日取整后自动配平至月度计划"})]})]})]}):o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"weld-settings-heading",children:[o.jsx("h3",{children:"数据库绑定"}),o.jsx("p",{children:"每项业务只绑定一个主写入数据库，汇总数据库由系统自动维护。"})]}),M&&o.jsx("div",{className:"weld-notice error",role:"alert",children:M}),o.jsxs("section",{className:"weld-business-binding","aria-labelledby":"weld-business-title",children:[o.jsxs("div",{className:"weld-business-title",children:[o.jsxs("div",{children:[o.jsx("h4",{id:"weld-business-title",children:"焊接业务"}),o.jsx("p",{children:"每日焊接计划的主写入数据库"})]}),o.jsx("span",{className:p.binding.bound?"bound":"",children:p.binding.bound?"已绑定":"未绑定"})]}),!p.configured||!p.sources.length?o.jsx("div",{className:"weld-notice",children:"请先在系统设置中完成数据库连接并刷新数据源。"}):o.jsxs("div",{className:"weld-dialog-field",children:[p.usesBusinessSections&&o.jsxs(o.Fragment,{children:[o.jsx("span",{children:"业务板块"}),o.jsx(mr,{value:T,options:p.businessSections.map(Q=>({value:Q,label:Q})),placeholder:"选择焊接业务板块",ariaLabel:"焊接业务板块",disabled:U==="binding",onChange:Q=>{C(Q),k("")}})]}),o.jsx("span",{children:"主写入数据库"}),o.jsx(mr,{value:R,options:ie.map(Q=>({value:Q.id,label:Q.name})),placeholder:"选择每日焊接量数据库",ariaLabel:"焊接业务主写入数据库",disabled:p.usesBusinessSections&&!T||U==="binding",onChange:k})]}),o.jsx("p",{className:"weld-binding-help",children:"月度和周度汇总数据库由系统在写入时自动维护，无需单独绑定。"})]}),o.jsxs("div",{className:"weld-settings-actions",children:[o.jsx("button",{type:"button",disabled:U==="binding",onClick:()=>b(!1),children:"取消"}),!p.configured||!p.sources.length?o.jsx("button",{type:"button",className:"primary-button",onClick:n,children:"前往系统设置"}):o.jsx("button",{type:"button",className:"primary-button",disabled:!R||U==="binding",onClick:I,children:U==="binding"?"正在检测…":"保存绑定"})]})]})]})]})}),_&&o.jsx("div",{className:"pm-dialog-overlay",children:o.jsxs("section",{className:"pm-dialog weld-confirm-dialog",role:"alertdialog","aria-modal":"true","aria-labelledby":"weld-overwrite-title",children:[o.jsx("h2",{id:"weld-overwrite-title",children:"确认覆盖已有产量"}),o.jsxs("p",{children:[l," 已存在产量数据。继续后将按本次拆分结果覆盖该月每日产量，并更新月、周、日关联。"]}),M&&o.jsx("div",{className:"weld-notice error",role:"alert",children:M}),U==="write"&&o.jsx("div",{className:"weld-write-progress",role:"status","aria-live":"polite",children:ee?`正在写入 ${ee.date.slice(0,10)}（${ee.current}/${ee.total}）`:"正在准备 Notion 层级数据…"}),o.jsxs("div",{className:"pm-dialog-actions",children:[o.jsx("button",{type:"button",disabled:U==="write",onClick:()=>O(!1),children:"取消"}),o.jsx("button",{type:"button",className:"primary-button",disabled:U==="write",onClick:()=>ce(te,!0),children:U==="write"?"正在写入…":"确认覆盖并写入"})]})]})})]})})}const Hb=[{category:"数据文件处理",name:"挂网计划 PDF 导出"},{category:"数据文件处理",name:"生产会资料拆分"},{category:"数据文件处理",name:"文件统计汇总"},{category:"数据同步",name:"每日焊接数据模拟"},{category:"数据同步",name:"生产消息 Notion 入库"},{category:"数据同步",name:"数据库查看"},{category:"自动化",name:"自动化任务"}],tD=[...new Set(Hb.map(n=>n.category))];function nD(n){switch(n){case"挂网计划 PDF 导出":return"plan-pdf";case"生产会资料拆分":return"production-meeting";case"每日焊接数据模拟":return"daily-weld";case"生产消息 Notion 入库":return"production-message";case"数据库查看":return"database-viewer";case"文件统计汇总":return"report-center";case"自动化任务":return"daily-report";default:return"plan-pdf"}}function rD({active:n,navigate:a,openSettings:s}){return o.jsxs("aside",{className:"sidebar",children:[o.jsx("div",{className:"sidebar-top",children:o.jsx("div",{className:"sidebar-brand",children:"生产助手"})}),o.jsx("nav",{className:"sidebar-nav","aria-label":"业务模块",children:tD.map(l=>o.jsxs("section",{className:"sidebar-section",children:[o.jsx("div",{className:"sidebar-section-label",children:l}),Hb.filter(u=>u.category===l).map(u=>{const h=nD(u.name),f=h===n;return o.jsxs("button",{className:`sidebar-item ${f?"sidebar-item-active":""}`,"aria-current":f?"page":void 0,onClick:()=>a(h),children:[o.jsx(Yv,{name:u.name}),o.jsx("span",{children:u.name})]},u.name)})]},l))}),o.jsx("div",{className:"sidebar-bottom",children:o.jsxs("button",{className:"sidebar-item","aria-haspopup":"dialog",onClick:s,children:[o.jsx(Yv,{name:"设置"}),o.jsx("span",{children:"设置"})]})})]})}function Yv({name:n}){return n==="挂网计划 PDF 导出"||n==="生产会资料拆分"?o.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("path",{className:"folder-lid",d:"M3.5 7h6l1.8 2h9.2"}),o.jsx("path",{d:"M4.2 7h15.6l-1.3 11H5.5L4.2 7Z"})]}):n==="每日焊接数据模拟"||n==="自动化任务"?o.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("rect",{x:"5",y:"4.5",width:"14",height:"15",rx:"2"}),o.jsx("path",{d:"M8 3v3M16 3v3M5 9h14"}),o.jsx("path",{className:"daily-check",d:"m8.5 14 2 2 4.5-4.5"})]}):n==="生产消息 Notion 入库"?o.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("path",{d:"M4 14.5 6.2 6h11.6l2.2 8.5V19H4v-4.5Z"}),o.jsx("path",{className:"inbox-tray",d:"M4.3 14h4.1l1.2 2h4.8l1.2-2h4.1"}),o.jsx("path",{className:"inbox-arrow",d:"M12 5v7m-2.5-2.5L12 12l2.5-2.5"})]}):n==="数据库查看"?o.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("ellipse",{cx:"12",cy:"6",rx:"7",ry:"3"}),o.jsx("path",{d:"M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"})]}):n==="文件统计汇总"?o.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("path",{d:"M4.5 19h15"}),o.jsx("rect",{className:"report-bar report-bar-one",x:"6",y:"12",width:"2.5",height:"6",rx:"0.5"}),o.jsx("rect",{className:"report-bar report-bar-two",x:"10.75",y:"8",width:"2.5",height:"10",rx:"0.5"}),o.jsx("rect",{className:"report-bar report-bar-three",x:"15.5",y:"5",width:"2.5",height:"13",rx:"0.5"})]}):o.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("circle",{cx:"12",cy:"12",r:"3"}),o.jsx("path",{className:"settings-ring",d:"M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M18 6l-1.4 1.4M7.4 16.6 6 18"})]})}const Gv=new Set(["raw_message","message_type","parser_version","unit"]),aD=new Set(["piece_count","weight","sheet_in_stock","profile_in_stock","cutting","welding","daily_output","monthly_output","yearly_output","monthly_reference","output_sections"]),iD=/(公斤|千克|kg|吨|t|张|件|套|节|台|米|m)$/i,sD={piece_count:"张",weight:"吨",sheet_in_stock:"吨",profile_in_stock:"吨",cutting:"吨",welding:"吨",daily_output:"套",output_sections:"节"};function fd(){const n=new Date;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`}function Xi(n){return n instanceof Error?n.message:String(n)}function Qd(n,a=""){const s=n.trim().match(iD);return{value:s?n.trim().slice(0,-s[0].length).trim():n,unit:(s==null?void 0:s[0])||a}}function lD(n,a){return n.trim()?`${n}${a}`:""}function oD(n,a){const s=Qd(a).value.trim(),l=Qd(n.databaseValue).value.trim(),u=n.propertyType==="number"&&!Number.isFinite(Number(s.replaceAll(",",""))),h=!s||u?"exception":l?n.propertyType==="number"?Number(s.replaceAll(",",""))===Number(l.replaceAll(",",""))?"same":"confirm":s===l?"same":"confirm":"new";return{...n,parsedValue:a,status:h,message:h==="exception"?`${n.name}的输入值无效`:h==="confirm"?"与数据库现值不同":""}}function cD(n){return{new:"新增",same:"一致",confirm:"待确认",exception:"异常",unchecked:"待检查"}[n]||"异常"}function uD(){const[n,a]=S.useState(""),[s,l]=S.useState(""),[u,h]=S.useState([]),[f,m]=S.useState(),[g,p]=S.useState(),[v,x]=S.useState(),[b,j]=S.useState(""),[E,T]=S.useState({}),[C,R]=S.useState(!1),[k,_]=S.useState(),[O,U]=S.useState(""),[P,M]=S.useState([]),[D,q]=S.useState({}),[$,ee]=S.useState(!1),[ne,pe]=S.useState({cutting:"",towerDaily:""}),le=u.length>0,se=le&&n!==s,L=!!f;S.useEffect(()=>{be("production.getBindings").then(te=>{_(te),pe({cutting:te.selected.cutting||"",towerDaily:te.selected.towerDaily||""})}).catch(te=>U(Xi(te)))},[]);async function F(){U("");try{await be("production.saveBindings",ne,12e4);const te=await be("production.getBindings");_(te),ee(!1)}catch(te){U(Xi(te))}}async function ae(te){m("check"),j(""),T({});try{const Q=await be("production.check",{drafts:te,defaultDate:fd()});p(Q)}catch(Q){j(Xi(Q))}finally{m(void 0)}}async function ie(){if(!(!n.trim()||L)){m("parse"),j(""),R(!1),x(void 0),p(void 0),T({});try{const te=await be("production.parse",{text:n,defaultDate:fd()});if(h(te),l(n),!te.length){j("没有解析到可核对的数据，请检查消息内容后重试。");return}te.every(Q=>Q.canWrite)&&await ae(te)}catch(te){h([]),p(void 0),j(Xi(te))}finally{m(te=>te==="parse"?void 0:te)}}}async function oe(te,Q){const de=u.map(W=>W.index===te?{...W,businessDate:Q,canWrite:!!Q,warningText:Q?"":W.warningText}:W);h(de),p(void 0),T({}),de.every(W=>W.canWrite)&&await ae(de)}function N(te,Q,de){const W=`${te}:${Q}`;h(he=>he.map(Ce=>Ce.index===te?{...Ce,canWrite:!!Ce.businessDate&&Ce.kind!=="Unknown",fields:{...Ce.fields,[Q]:de},previewFields:Ce.previewFields.map(ze=>ze.key===Q?{...ze,value:de}:ze)}:Ce)),T(he=>Object.fromEntries(Object.entries(he).filter(([Ce])=>Ce!==W))),p(he=>{if(!he)return he;const Ce=he.items.map(ze=>{if(ze.index!==te||!ze.fields)return ze;const Qe=ze.fields.map(yt=>yt.key===Q?oD(yt,de):yt),Fe=Qe.some(yt=>yt.status==="exception")?"error":Qe.some(yt=>yt.status==="confirm")?"existing":"ready";return{...ze,fields:Qe,status:Fe}});return{...he,items:Ce,succeeded:Ce.every(ze=>ze.status!=="error")}})}async function V(te){if(!(!g||L)){m("write"),j("");try{const Q=await be("production.write",{drafts:u,defaultDate:fd(),overwriteExisting:!1,fieldChoices:E,monthlyPlans:te},12e4);if(x(Q),Q.requiredMonths.length){M(Q.requiredMonths),q({});return}Q.succeeded?R(!0):j(Q.message||"Notion 写入未完成。")}catch(Q){j(Xi(Q))}finally{m(void 0)}}}function I(){a(""),l(""),h([]),p(void 0),x(void 0),T({}),R(!1),j("")}const re=S.useMemo(()=>u.flatMap(te=>{var de;const Q=(de=g==null?void 0:g.items.find(W=>W.index===te.index))==null?void 0:de.fields;return Q!=null&&Q.length?Q.filter(W=>!Gv.has(W.key)).map(W=>({draft:te,key:W.key,name:W.name,propertyType:W.propertyType,parsedValue:te.fields[W.key]??W.parsedValue,databaseValue:W.databaseValue,status:W.status,message:W.message})):te.previewFields.filter(W=>!Gv.has(W.key)).map(W=>({draft:te,key:W.key,name:W.label,propertyType:aD.has(W.key)?"number":"",parsedValue:te.fields[W.key]??W.value,databaseValue:"",status:te.canWrite?"unchecked":"exception",message:te.warningText}))}),[u,g]),ce=S.useMemo(()=>({newFields:re.filter(te=>te.status==="new").length,same:re.filter(te=>te.status==="same").length,confirm:re.filter(te=>te.status==="confirm").length,exception:re.filter(te=>te.status==="exception").length}),[re]),ye=re.filter(te=>te.status==="confirm"),xe=le&&!se&&!L&&!!(g!=null&&g.succeeded)&&u.every(te=>te.canWrite&&!!te.businessDate)&&re.every(te=>te.status!=="exception"&&te.status!=="unchecked")&&ye.every(te=>!!E[`${te.draft.index}:${te.key}`]);return C?o.jsxs("div",{className:"app-shell",children:[o.jsxs("main",{className:"main-content",children:[o.jsx(Pv,{configure:()=>ee(!0)}),o.jsxs("div",{className:"production-message-scroll",children:[o.jsx(Fv,{current:3}),o.jsxs("section",{className:"complete-view",children:[o.jsx("div",{className:"complete-icon",children:o.jsx(us,{})}),o.jsx("h2",{children:"入库完成"}),o.jsx("p",{children:(v==null?void 0:v.message)||`${u.length} 条消息已写入 Notion`}),o.jsx("button",{className:"primary-button",onClick:I,children:"录入下一条"})]})]})]}),$&&k&&o.jsx(Xv,{state:k,selections:ne,setSelections:pe,error:O,close:()=>ee(!1),save:F})]}):o.jsxs("div",{className:"app-shell",children:[o.jsxs("main",{className:"main-content",children:[o.jsx(Pv,{configure:()=>ee(!0)}),o.jsxs("div",{className:"production-message-scroll",children:[o.jsx(Fv,{current:le?2:1}),o.jsxs("div",{className:"workspace-panel",children:[o.jsxs("section",{className:"message-pane",children:[o.jsxs("div",{className:"pane-title",children:[o.jsx("h2",{children:"原始消息"}),o.jsx("p",{children:"输入生产消息，系统将自动解析并检查已有数据。"})]}),o.jsx("textarea",{className:"message-textarea",value:n,disabled:L,onChange:te=>a(te.target.value),placeholder:"请输入生产消息"}),o.jsx("div",{className:"parse-action",children:o.jsxs("button",{className:"primary-button",disabled:!n.trim()||L,onClick:ie,children:[le&&o.jsx(Xx,{className:"button-icon refresh-icon"}),o.jsx("span",{children:f==="parse"?"正在解析…":le?"重新解析":"解析消息"})]})})]}),o.jsx("section",{className:"review-pane",children:le?o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"review-header",children:[o.jsx("h2",{children:"解析结果"}),o.jsxs("div",{className:"review-summary",children:[o.jsxs("span",{children:["新增",o.jsx("strong",{children:ce.newFields})]}),o.jsx("i",{children:"·"}),o.jsxs("span",{children:["一致",o.jsx("strong",{children:ce.same})]}),o.jsx("i",{children:"·"}),o.jsxs("span",{children:["待确认",o.jsx("strong",{children:ce.confirm})]}),o.jsx("i",{children:"·"}),o.jsxs("span",{children:["异常",o.jsx("strong",{children:ce.exception})]})]})]}),o.jsx("div",{className:"date-groups",children:u.map(te=>{const Q=re.filter(he=>he.draft.index===te.index),de=Q.filter(he=>he.status==="confirm"),W=g?{...g,items:g.items.filter(he=>he.index===te.index)}:void 0;return o.jsxs("section",{className:"date-group","data-business-date":te.businessDate,children:[o.jsxs("div",{className:"identity-section",children:[o.jsx("div",{className:"identity-field",children:o.jsx(Of,{label:"日期",value:te.businessDate||"",disabled:L,onChange:he=>oe(te.index,he)})}),o.jsxs("div",{className:"identity-field",children:[o.jsx("label",{children:"业务 / 产线"}),o.jsx("input",{className:"field-input",value:te.typeDisplay||"",readOnly:!0,disabled:L})]})]}),o.jsx(dD,{busy:f==="check",result:W,error:b,needsReparse:se,invalidCount:te.canWrite?0:1,fieldStatuses:Q.map(he=>he.status)}),o.jsx("div",{className:"data-title",children:"数据字段"}),o.jsxs("div",{className:"field-table",children:[o.jsxs("div",{className:"field-table-header",children:[o.jsx("div",{children:"字段"}),o.jsx("div",{children:"本次解析值"}),o.jsx("div",{children:"数据库值"}),o.jsx("div",{className:"header-status",children:"状态"})]}),Q.map(he=>{const Ce=Qd(he.parsedValue,he.propertyType==="number"&&sD[he.key]||""),ze=`${he.draft.index}:${he.key}`;return o.jsxs("div",{className:"field-row",children:[o.jsx("div",{className:"field-name",children:he.name}),o.jsx("div",{className:"field-editor",children:o.jsxs("div",{className:"input-unit-wrap",children:[o.jsx("input",{className:"field-input compact-input",value:Ce.value,disabled:L,"aria-invalid":he.status==="exception",onChange:Qe=>N(he.draft.index,he.key,lD(Qe.target.value,Ce.unit)),onKeyDown:Qe=>{Qe.key==="Enter"&&Qe.currentTarget.blur()}}),Ce.unit&&o.jsx("span",{children:Ce.unit})]})}),o.jsx("div",{className:"database-value",children:he.databaseValue||"—"}),o.jsx("div",{className:"field-status",children:he.status!=="unchecked"&&o.jsx("span",{className:`pill pill-${he.status}`,title:he.message,children:cD(he.status)})})]},ze)})]}),de.length>0&&o.jsxs("section",{className:"conflict-section","aria-label":`${te.businessDate} 待确认字段`,children:[o.jsx("div",{className:"conflict-section-title",children:"待确认字段"}),de.map(he=>{const Ce=`${he.draft.index}:${he.key}`;return o.jsxs("div",{className:"conflict-panel",children:[o.jsxs("div",{className:"conflict-message",children:[o.jsx("strong",{children:he.name}),o.jsx("span",{children:"原值与新值不同，请选择保留项。"})]}),o.jsxs("div",{className:"conflict-options",children:[o.jsxs("label",{children:[o.jsx("input",{type:"radio",name:`conflict-${Ce}`,checked:E[Ce]==="keep",onChange:()=>T(ze=>({...ze,[Ce]:"keep"}))}),o.jsxs("span",{children:[o.jsx("small",{children:"原值"}),o.jsx("strong",{children:he.databaseValue||"—"})]})]}),o.jsxs("label",{children:[o.jsx("input",{type:"radio",name:`conflict-${Ce}`,checked:E[Ce]==="use",onChange:()=>T(ze=>({...ze,[Ce]:"use"}))}),o.jsxs("span",{children:[o.jsx("small",{children:"新值"}),o.jsx("strong",{children:he.parsedValue||"—"})]})]})]})]},Ce)})]})]},te.index)})}),o.jsxs("div",{className:"review-footer",children:[o.jsx("span",{className:"review-footer-text",children:u.length>1?`本次共 ${u.length} 条消息，将整批写入 Notion。`:"确认后将把本次解析结果写入 Notion。"}),o.jsx("button",{className:"primary-button confirm-button",disabled:!xe,onClick:()=>V(),children:f==="write"?"正在入库…":"确认入库"})]})]}):o.jsxs("div",{className:"review-empty",children:[o.jsx("h2",{children:"解析结果"}),o.jsx("p",{children:"解析消息后，Notion 数据检查结果将在这里显示。"}),(O||(k==null?void 0:k.configured)===!1||k&&(!k.cutting.bound||!k.towerDaily.bound))&&o.jsx("div",{className:"pm-notice",role:"alert",children:O||((k==null?void 0:k.configured)===!1?"Notion 连接尚未配置。":"数据库已变更，请点击右上角“数据库绑定”重新选择下料和塔筒主数据库。")})]})})]})]})]}),P.length>0&&o.jsx(fD,{months:P,values:D,setValues:q,close:()=>M([]),submit:te=>{M([]),V(te)}}),$&&k&&o.jsx(Xv,{state:k,selections:ne,setSelections:pe,error:O,close:()=>ee(!1),save:F})]})}function dD({busy:n,result:a,error:s,needsReparse:l,invalidCount:u,fieldStatuses:h}){if(n)return o.jsxs("div",{className:"match-status",role:"status","aria-live":"polite",children:[o.jsx("span",{className:"status-loader"}),o.jsx("span",{className:"match-status-copy",children:"正在检查 Notion 数据…"})]});if(l)return o.jsxs("div",{className:"match-status match-status-error",role:"alert",children:[o.jsx("span",{className:"new-record-icon",children:"!"}),o.jsx("span",{className:"match-status-copy",children:"原始消息已修改，请重新解析"})]});if(u)return o.jsxs("div",{className:"match-status match-status-error",role:"alert",children:[o.jsx("span",{className:"new-record-icon",children:"!"}),o.jsxs("span",{className:"match-status-copy",children:["本批有 ",u," 条异常，已停止检查和入库"]})]});if(s)return o.jsxs("div",{className:"match-status match-status-error",role:"alert",children:[o.jsx("span",{className:"new-record-icon",children:"!"}),o.jsxs("span",{className:"match-status-copy",children:["检查失败：",s]})]});const f=a==null?void 0:a.items.some(b=>b.status==="existing"||b.status==="conflict"),m=b=>h.includes(b),g=h.length>0&&h.every(b=>b==="same"),p=m("exception")||a&&!a.succeeded&&h.length===0?"match-status-error":m("confirm")?"match-status-warning":g?"match-status-neutral":"",v=m("exception")?"存在异常，不能入库":m("unchecked")?"字段已修改，等待检查":m("confirm")?"已找到对应记录，有字段待确认":m("new")?f||m("same")?"已找到对应记录，将补充空字段":"未找到对应记录，将新建":g?"已找到对应记录，数据一致":a&&!a.succeeded?"Notion 检查未通过":"等待检查 Notion 数据",x=!!a&&!m("exception")&&!m("confirm")&&!m("unchecked");return o.jsxs("div",{className:`match-status ${p}`,role:p==="match-status-error"?"alert":"status","aria-live":"polite",children:[x?o.jsx("span",{className:"match-check",children:o.jsx(us,{})}):o.jsx("span",{className:"new-record-icon",children:p?"!":"+"}),o.jsx("span",{className:"match-status-copy",children:v})]})}function fD({months:n,values:a,setValues:s,close:l,submit:u}){const h=Object.fromEntries(n.map(m=>[m,Number(a[m])])),f=n.every(m=>{var g;return((g=a[m])==null?void 0:g.trim())&&Number.isFinite(h[m])&&h[m]>=0});return o.jsx("div",{className:"pm-dialog-overlay",children:o.jsxs("section",{className:"pm-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"monthly-plan-title",children:[o.jsx("h2",{id:"monthly-plan-title",children:"补充下料月计划"}),o.jsx("p",{children:"独立月计划库中没有该月份记录，请填写计划下料（吨）。"}),n.map(m=>o.jsxs("label",{children:[m,o.jsx("input",{type:"number",min:"0",value:a[m]||"",onChange:g=>s({...a,[m]:g.target.value})})]},m)),o.jsxs("div",{className:"pm-dialog-actions",children:[o.jsx("button",{onClick:l,children:"取消"}),o.jsx("button",{className:"primary-button",disabled:!f,onClick:()=>u(h),children:"创建并继续"})]})]})})}function Xv({state:n,selections:a,setSelections:s,error:l,close:u,save:h}){var x,b;const[f,m]=S.useState(((x=n.sources.find(j=>j.id===a.cutting))==null?void 0:x.businessSection)||""),[g,p]=S.useState(((b=n.sources.find(j=>j.id===a.towerDaily))==null?void 0:b.businessSection)||""),v=j=>n.usesBusinessSections?n.sources.filter(E=>E.businessSection===j):n.sources;return o.jsx("div",{className:"pm-dialog-overlay",children:o.jsxs("section",{className:"pm-dialog pm-binding-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"binding-title",children:[o.jsx("h2",{id:"binding-title",children:"数据库绑定"}),o.jsx("p",{children:"只绑定每日主数据库。月累计和年累计由软件查询计算；下料月计划库通过主库的 Relation 自动识别。"}),n.usesBusinessSections&&o.jsxs("label",{children:["下料业务板块",o.jsxs("select",{value:f,onChange:j=>{m(j.target.value),s({...a,cutting:""})},children:[o.jsx("option",{value:"",children:"不处理下料消息"}),n.businessSections.map(j=>o.jsx("option",{value:j,children:j},`cutting-business-${j}`))]})]}),o.jsxs("label",{children:["下料主数据库",o.jsxs("select",{value:a.cutting,disabled:n.usesBusinessSections&&!f,onChange:j=>s({...a,cutting:j.target.value}),children:[o.jsx("option",{value:"",children:"不处理下料消息"}),v(f).map(j=>o.jsx("option",{value:j.id,children:j.name},`cutting-${j.id}`))]})]}),n.usesBusinessSections&&o.jsxs("label",{children:["塔筒业务板块",o.jsxs("select",{value:g,onChange:j=>{p(j.target.value),s({...a,towerDaily:""})},children:[o.jsx("option",{value:"",children:"请选择业务板块"}),n.businessSections.map(j=>o.jsx("option",{value:j,children:j},`tower-business-${j}`))]})]}),o.jsxs("label",{children:["塔筒产线主数据库",o.jsxs("select",{value:a.towerDaily,disabled:n.usesBusinessSections&&!g,onChange:j=>s({...a,towerDaily:j.target.value}),children:[o.jsx("option",{value:"",children:"请选择具体数据库"}),v(g).map(j=>o.jsx("option",{value:j.id,children:j.name},`tower-${j.id}`))]})]}),l&&o.jsx("div",{className:"pm-notice",role:"alert",children:l}),o.jsxs("div",{className:"pm-dialog-actions",children:[o.jsx("button",{onClick:u,children:"取消"}),o.jsx("button",{className:"primary-button",disabled:!a.towerDaily,onClick:h,children:"保存绑定"})]})]})})}function Pv({configure:n}){return o.jsxs("header",{className:"content-header",children:[o.jsxs("div",{children:[o.jsx("h1",{children:"生产消息入库"}),o.jsx("p",{children:"解析生产消息，检查已有数据并确认入库"})]}),o.jsx("button",{type:"button",className:"template-config-button",onClick:n,children:"数据库绑定"})]})}function Fv({current:n}){return o.jsx(Ub,{current:n,titles:["录入消息","解析确认","完成"],label:"生产消息入库进度"})}function hD({label:n,steps:a,currentStep:s,direction:l,transition:u,busy:h=!1}){const f=(u==null?void 0:u.phase)==="rail"||(u==null?void 0:u.phase)==="arrive"?u.target:s,m=Math.min(f,a.length-1);return o.jsxs("nav",{className:"daily-progress","aria-label":n,children:[o.jsxs("div",{className:"progress-meta",children:[o.jsx("span",{children:"当前步骤"}),o.jsxs("strong",{children:[Math.min(s+1,a.length)," / ",a.length]})]}),o.jsxs("div",{className:"progress-rail",children:[o.jsx("div",{className:"progress-segments","aria-hidden":"true",children:a.slice(1).map((g,p)=>o.jsx("span",{children:o.jsx("i",{style:{width:p<m?"100%":"0%"}})},p))}),o.jsx("ol",{className:l<0?"backward":"forward",style:{gridTemplateColumns:`repeat(${a.length}, 1fr)`},children:a.map((g,p)=>{const v=u?Math.min(u.from,a.length-1):-1,x=p<s||s===a.length,b=(u==null?void 0:u.direction)===1&&u.phase!=="arrive"&&p===v,j=(u==null?void 0:u.direction)===-1&&u.phase!=="arrive"&&p===v,E=!j&&(x||b),T=j?"idle":E?"done":p===s?`active${h?" working":""}`:"idle",C=(u==null?void 0:u.phase)==="node"&&p===v?u.direction>0?" just-completed":" just-back-leave":(u==null?void 0:u.phase)==="arrive"&&p===u.target?u.direction>0?" just-active":" just-back-active":"";return o.jsxs("li",{className:`${T}${C}`,"aria-current":p===s?"step":void 0,"aria-label":`${g}，${E?"已完成":p===s?"当前步骤":"未开始"}`,children:[o.jsx("span",{children:E?"✓":p+1}),o.jsx("strong",{children:g})]},g)})})]})]})}const $v=n=>n.toISOString().slice(0,10);function mD(){const n=new Date,a=new Date(Date.UTC(n.getFullYear(),n.getMonth(),20)),s=new Date(Date.UTC(n.getFullYear(),n.getMonth()-1,21)),[l,u]=S.useState(),[h,f]=S.useState($v(s)),[m,g]=S.useState($v(a)),[p,v]=S.useState({sourceRoot:"",outputRoot:"",reportUrl:"",username:"",password:""}),[x,b]=S.useState(),[j,E]=S.useState(""),[T,C]=S.useState(""),[R,k]=S.useState(),[_,O]=S.useState(),U=m?`${Number(m.slice(5,7))} 月`:"—",P=S.useMemo(()=>{const se=Date.parse(`${h}T00:00:00Z`),L=Date.parse(`${m}T00:00:00Z`);return Number.isFinite(se)&&Number.isFinite(L)&&L>=se?Math.floor((L-se)/864e5)+1:0},[h,m]),M=se=>{u(se),v(L=>({sourceRoot:se.sourceRoot,outputRoot:se.outputRoot,reportUrl:se.reportUrl,username:se.username,password:L.password}))},D=()=>be("report.getState").then(M).catch(se=>E(se.message));S.useEffect(()=>{D()},[]);const q=async()=>{b("save"),E(""),C("");try{const se=await be("report.saveConfig",p);M(se),v(L=>({...L,password:""})),C("配置已保存，请验证登录。")}catch(se){E(se instanceof Error?se.message:"配置保存失败")}finally{b(void 0)}},$=async()=>{b("auth"),E(""),C("");try{await be("report.authenticate",void 0,600*1e3),await D(),C("登录验证通过。")}catch(se){E(se instanceof Error?se.message:"登录验证失败")}finally{b(void 0)}},ee=async()=>{b("run"),E(""),C(""),k(void 0),O({stage:"prepare",current:0,total:P,message:"正在准备任务"});try{k(await be("report.run",{startDate:h,endDate:m},1800*1e3,se=>O(se)))}catch(se){E(se instanceof Error?se.message:"任务执行失败")}finally{b(void 0)}},ne=["准备报表","导出日报","解析数据","生成汇总","完成"],pe=_?{prepare:0,collect:1,parse:2,summary:3,complete:5}[_.stage]:0,le=_!=null&&_.total?Math.round(_.current/_.total*100):0;return o.jsxs("div",{className:"page report-center-page",children:[o.jsxs("header",{children:[o.jsxs("div",{children:[o.jsx("h1",{children:"文件统计汇总"}),o.jsx("p",{children:"手动选择统计日期，自动采集加工日报并生成设备实开台时汇总。"})]}),o.jsxs("span",{className:`report-auth ${l!=null&&l.authenticated?"ready":""}`,children:[l!=null&&l.authenticated?o.jsx(uo,{}):o.jsx(Ld,{}),l!=null&&l.authenticated?"登录可用":"待验证登录"]})]}),o.jsxs("section",{className:"report-workspace",children:[o.jsxs("div",{className:"report-period",children:[o.jsxs("div",{className:"report-section-title",children:[o.jsx(Hx,{}),o.jsxs("div",{children:[o.jsx("h2",{children:"选择统计范围"}),o.jsx("p",{children:"汇总月份自动取结束日期所在月份"})]})]}),o.jsxs("div",{className:"report-fields",children:[o.jsxs("label",{children:["开始日期",o.jsx(Ua,{value:h,onChange:f})]}),o.jsxs("label",{children:["结束日期",o.jsx(Ua,{value:m,onChange:g})]})]}),o.jsxs("div",{className:"report-period-preview",children:[o.jsxs("div",{children:[o.jsx("span",{children:"统计范围"}),o.jsxs("strong",{children:[h||"—"," ～ ",m||"—"]})]}),o.jsxs("div",{children:[o.jsx("span",{children:"汇总月份"}),o.jsx("strong",{children:U})]}),o.jsxs("div",{children:[o.jsx("span",{children:"日报数量"}),o.jsxs("strong",{children:[P||"—"," 天"]})]})]}),(x==="run"||_)&&o.jsxs("div",{className:"report-run-progress","aria-live":"polite",children:[o.jsx(hD,{label:"报表任务进度",steps:ne,currentStep:pe,direction:1,busy:x==="run"}),o.jsxs("div",{className:"report-progress-detail",children:[o.jsx("span",{children:(_==null?void 0:_.message)||"正在准备任务"}),o.jsx("strong",{children:_!=null&&_.total?`${_.current}/${_.total}`:"准备中"})]}),o.jsx("div",{className:"report-progress-bar",role:"progressbar","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":le,children:o.jsx("i",{style:{width:`${le}%`}})})]}),o.jsxs("div",{className:"report-actions",children:[o.jsxs("button",{className:"secondary",disabled:!!x||!(l!=null&&l.credentialsConfigured),onClick:$,children:[o.jsx(RC,{}),x==="auth"?"正在验证登录…":"验证登录"]}),o.jsxs("button",{className:"primary",disabled:!!x||!(l!=null&&l.authenticated)||P===0,onClick:ee,children:[o.jsx(Gx,{}),x==="run"?"正在导出并汇总…":"开始运行"]})]}),o.jsx("p",{className:"report-note",children:"Playwright 在后台运行。测试阶段已有原始日报会重新导出并覆盖。"})]}),o.jsxs("div",{className:"report-side",children:[o.jsx("h2",{children:"输出位置"}),o.jsxs("div",{className:"report-path",children:[o.jsx(gv,{}),o.jsx("span",{children:(l==null?void 0:l.outputRoot)||"正在读取配置…"})]}),o.jsxs("dl",{children:[o.jsxs("div",{children:[o.jsx("dt",{children:"原始日报"}),o.jsxs("dd",{children:[(l==null?void 0:l.sourceRoot)||"—"," · 按年份、月份归档"]})]}),o.jsxs("div",{children:[o.jsx("dt",{children:"汇总文件"}),o.jsx("dd",{children:"按结束日期所在月份归档"})]}),o.jsxs("div",{children:[o.jsx("dt",{children:"本次月份"}),o.jsx("dd",{children:U})]})]})]})]}),o.jsxs("section",{className:"report-config",children:[o.jsxs("div",{className:"report-section-title",children:[o.jsx(LC,{}),o.jsxs("div",{children:[o.jsx("h2",{children:"报表配置"}),o.jsx("p",{children:"保存后登录状态会失效，需要重新验证一次"})]})]}),o.jsxs("div",{className:"report-config-grid",children:[o.jsxs("label",{children:[o.jsxs("span",{children:[o.jsx(kC,{}),"源文件位置"]}),o.jsx("input",{value:p.sourceRoot,onChange:se=>v({...p,sourceRoot:se.target.value}),placeholder:"原始日报保存根目录"})]}),o.jsxs("label",{children:[o.jsxs("span",{children:[o.jsx(gv,{}),"输出位置"]}),o.jsx("input",{value:p.outputRoot,onChange:se=>v({...p,outputRoot:se.target.value}),placeholder:"汇总文件保存根目录"})]}),o.jsxs("label",{className:"wide",children:[o.jsxs("span",{children:[o.jsx(NC,{}),"报表网页"]}),o.jsx("input",{type:"url",value:p.reportUrl,onChange:se=>v({...p,reportUrl:se.target.value}),placeholder:"https://…"})]}),o.jsxs("label",{children:[o.jsxs("span",{children:[o.jsx(GC,{}),"账号"]}),o.jsx("input",{autoComplete:"username",value:p.username,onChange:se=>v({...p,username:se.target.value})})]}),o.jsxs("label",{children:[o.jsxs("span",{children:[o.jsx(OC,{}),"密码"]}),o.jsx("input",{type:"password",autoComplete:"new-password",value:p.password,onChange:se=>v({...p,password:se.target.value}),placeholder:l!=null&&l.credentialsConfigured?"已保存，留空表示不修改":"请输入密码"})]})]}),o.jsxs("div",{className:"report-config-footer",children:[o.jsx("p",{children:"账号和密码使用 Windows 本机加密保存，不写入 YAML，也不会回传显示密码。"}),o.jsxs("button",{className:"primary",disabled:!!x,onClick:q,children:[o.jsx(BC,{}),x==="save"?"正在保存…":"保存配置"]})]})]}),j&&o.jsxs("div",{className:"report-message error",role:"alert",children:[o.jsx(Ld,{}),o.jsxs("div",{children:[o.jsx("strong",{children:"操作未完成"}),o.jsx("span",{children:j})]})]}),T&&o.jsxs("div",{className:"report-message success",role:"status",children:[o.jsx(uo,{}),o.jsxs("div",{children:[o.jsx("strong",{children:"操作成功"}),o.jsx("span",{children:T})]})]}),R&&o.jsxs("section",{className:"report-result",children:[o.jsxs("div",{className:"report-section-title",children:[o.jsx(DC,{}),o.jsxs("div",{children:[o.jsxs("h2",{children:[U,"汇总已完成"]}),o.jsxs("p",{children:[R.period.startDate," ～ ",R.period.endDate]})]})]}),o.jsxs("div",{className:"report-stats",children:[o.jsxs("span",{children:[o.jsxs("strong",{children:[R.parsedReports,"/",R.plannedReports]}),"日报完整"]}),o.jsxs("span",{children:[o.jsx("strong",{children:R.deviceCount}),"台设备"]}),o.jsxs("span",{children:[o.jsxs("strong",{children:[R.actualDataPoints,"/",R.expectedDataPoints]}),"数据点"]})]}),o.jsxs("div",{className:"report-output",children:[o.jsx("span",{children:"汇总文件"}),o.jsx("strong",{children:R.summaryPath})]}),R.warnings.length>0&&o.jsxs("p",{className:"report-warning",children:[R.warnings.length," 份日报使用了已有归档文件。"]})]})]})}const Jd="••••••••••••",Kv=[{key:"connection",label:"连接",keywords:"Notion API 令牌 根页面 数据源",icon:o.jsx(wD,{})},{key:"notification",label:"通知",keywords:"钉钉 Webhook Secret 规则",icon:o.jsx(jD,{})},{key:"data",label:"数据与缓存",keywords:"Notion 数据源 缓存 绑定",icon:o.jsx(ED,{})},{key:"about",label:"关于",keywords:"版本 WebView2 React TypeScript",icon:o.jsx(TD,{})}];function pD({open:n,onClose:a}){const[s,l]=S.useState("connection"),[u,h]=S.useState(""),[f,m]=S.useState(null),[g,p]=S.useState(""),[v,x]=S.useState(""),[b,j]=S.useState(""),E=S.useRef(null),T=S.useRef(null);S.useEffect(()=>{if(!n)return;T.current=document.activeElement instanceof HTMLElement?document.activeElement:null,j("settings.open"),x(""),be("settings.open").then(_=>m(_)).catch(_=>x(_ instanceof Error?_.message:"设置加载失败，请重试。")).finally(()=>j("")),window.setTimeout(()=>{var _;return(_=E.current)==null?void 0:_.focus()},0);const k=_=>{_.key==="Escape"&&a()};return window.addEventListener("keydown",k),()=>{var _;window.removeEventListener("keydown",k),(_=T.current)==null||_.focus()}},[n,a]),S.useEffect(()=>{if(!g)return;const k=window.setTimeout(()=>p(""),3e3);return()=>window.clearTimeout(k)},[g]);const C=async(k,_)=>{j(k),x(""),p("");try{const O=await be(k,_,6e4);return(k==="settings.refreshDataSources"||k==="settings.saveConnection")&&aN(!0),m(O.state),p(O.message),!0}catch(O){return x(O instanceof Error?O.message:"操作未完成，请重试。"),!1}finally{j("")}},R=S.useMemo(()=>{const k=u.trim().toLocaleLowerCase("zh-CN");return k?Kv.filter(_=>`${_.label} ${_.keywords}`.toLocaleLowerCase("zh-CN").includes(k)):Kv},[u]);return n?o.jsx("div",{className:"settings-overlay",onMouseDown:k=>{k.target===k.currentTarget&&a()},children:o.jsxs("div",{className:"settings-window",role:"dialog","aria-modal":"true","aria-label":"设置",children:[o.jsxs("aside",{className:"settings-sidebar",children:[o.jsxs("label",{className:"settings-search",children:[o.jsx(SD,{}),o.jsx("input",{value:u,onChange:k=>h(k.target.value),placeholder:"搜索设置","aria-label":"搜索设置"})]}),o.jsx("div",{className:"settings-sidebar-title",children:"设置"}),o.jsxs("nav",{className:"settings-nav","aria-label":"设置分类",children:[R.map(k=>o.jsxs("button",{type:"button",className:s===k.key?"settings-nav-item active":"settings-nav-item","aria-current":s===k.key?"page":void 0,onClick:()=>l(k.key),children:[o.jsx("span",{className:"settings-nav-icon",children:k.icon}),o.jsx("span",{children:k.label})]},k.key)),R.length===0&&o.jsx("p",{className:"settings-empty-search",children:"没有匹配的设置"})]})]}),o.jsxs("main",{className:"settings-main",children:[o.jsx("button",{ref:E,type:"button",className:"settings-close",onClick:a,"aria-label":"关闭设置",children:o.jsx(CD,{})}),o.jsxs("div",{className:"settings-content",children:[b==="settings.open"&&!f?o.jsx("div",{className:"settings-loading",children:"正在读取本机设置…"}):o.jsxs(o.Fragment,{children:[s==="connection"&&f&&o.jsx(gD,{state:f,busy:b,run:C}),s==="notification"&&f&&o.jsx(yD,{state:f,busy:b,run:C}),s==="data"&&f&&o.jsx(vD,{state:f,busy:b,run:C}),s==="about"&&f&&o.jsx(xD,{state:f})]}),(g||v)&&o.jsx("div",{className:`settings-message ${v?"error":""}`,role:"status","aria-live":"polite",children:v||g})]})]})]})}):null}function gD({state:n,busy:a,run:s}){const[l,u]=S.useState(""),[h,f]=S.useState(!1),[m,g]=S.useState(n.notion.rootPageId);S.useEffect(()=>g(n.notion.rootPageId),[n.notion.rootPageId]);const p=async b=>{await s(b,{token:h?l:"",rootPageId:m})&&(u(""),f(!1))},v=a==="settings.refreshDataSources",x=a==="settings.saveConnection";return o.jsxs(bo,{title:"连接",description:"管理生产助手使用的外部数据源和服务连接。",children:[o.jsxs(Pr,{title:"Notion",children:[o.jsx(Ut,{title:"连接状态",description:"当前本机连接配置和数据源缓存状态",children:o.jsx(qb,{connected:n.notion.configured,label:n.notion.configured?"已配置":"未配置"})}),o.jsx(Ji,{title:"API 令牌",description:"使用 Windows 当前用户加密后保存在本机",children:o.jsx("input",{className:"settings-input",type:"password",autoComplete:"off",placeholder:"输入 Notion API Token",value:h?l:n.notion.configured?Jd:"",onFocus:b=>{!h&&n.notion.configured&&b.currentTarget.select()},onChange:b=>{f(!0),u(b.target.value)}})}),o.jsx(Ji,{title:"根页面 ID",description:"可选。留空时自动发现当前令牌有权限访问的数据源",children:o.jsx("input",{className:"settings-input",value:m,onChange:b=>g(b.target.value)})}),o.jsxs("div",{className:"settings-buttons",children:[o.jsxs("button",{type:"button",className:"settings-button-primary",disabled:!!a,onClick:()=>p("settings.saveConnection"),children:[x&&o.jsx(as,{})," ",x?"正在连接…":"保存并连接"]}),o.jsxs("button",{type:"button",className:"settings-button-secondary",disabled:!!a,onClick:()=>p("settings.refreshDataSources"),children:[v&&o.jsx(as,{})," ",v?"正在刷新…":"刷新数据源"]})]})]}),o.jsxs(Pr,{title:"数据源",children:[o.jsx(Ut,{title:"已发现数据源",description:"最近一次从 Notion 获取的数据源",children:o.jsxs("span",{className:"settings-value",children:[n.notion.dataSourceCount," 个"]})}),o.jsx(Ut,{title:"上次同步",description:"数据源元信息最后更新时间",children:o.jsx("span",{className:"settings-value",children:n.notion.lastSyncedAt||"尚未同步"})})]})]})}function yD({state:n,busy:a,run:s}){const l=n.notification,[u,h]=S.useState(l.enabled),[f,m]=S.useState(l.channelName),[g,p]=S.useState(""),[v,x]=S.useState(""),[b,j]=S.useState(!1),[E,T]=S.useState(!1),[C,R]=S.useState(l.rules);S.useEffect(()=>{h(l.enabled),m(l.channelName),R(l.rules)},[l]);const k={enabled:u,channelName:f,webhook:b?g:"",secret:E?v:""},_=async P=>{await s(P,k)&&(p(""),x(""),j(!1),T(!1))},O=a==="settings.saveNotification",U=a==="settings.testNotification";return o.jsxs(bo,{title:"通知",description:"配置生产助手全局通知使用的技术通道。业务模块只决定何时通知。",children:[o.jsxs(Pr,{title:"通知服务",children:[o.jsx(Ut,{title:"启用通知",description:"关闭后所有业务模块都不会向外发送通知",children:o.jsx(Zv,{checked:u,onChange:h,label:"启用通知"})}),o.jsx(Ut,{title:"发送方式",description:"当前使用的全局通知技术通道",children:o.jsx("span",{className:"settings-value",children:"钉钉机器人 Webhook"})}),o.jsx(Ut,{title:"连接状态",description:l.checkedAt?`上次测试 ${l.checkedAt}`:"尚未发送测试通知",children:o.jsx(qb,{connected:l.connected,label:l.connected===!0?"连接正常":l.connected===!1?"连接失败":"待测试"})})]}),o.jsxs(Pr,{title:"钉钉机器人",children:[o.jsx(Ji,{title:"Webhook URL",description:"使用 Windows 当前用户加密后保存在本机",children:o.jsx("input",{className:"settings-input",type:"password",autoComplete:"off",placeholder:"https://oapi.dingtalk.com/robot/send?...",value:b?g:l.webhookConfigured?Jd:"",onFocus:P=>{!b&&l.webhookConfigured&&P.currentTarget.select()},onChange:P=>{j(!0),p(P.target.value)}})}),o.jsx(Ji,{title:"加签密钥",description:"钉钉机器人 Secret，使用 Windows 当前用户加密保存",children:o.jsx("input",{className:"settings-input",type:"password",autoComplete:"off",placeholder:"SEC...",value:E?v:l.secretConfigured?Jd:"",onFocus:P=>{!E&&l.secretConfigured&&P.currentTarget.select()},onChange:P=>{T(!0),x(P.target.value)}})}),o.jsx(Ji,{title:"默认接收群",description:"用于识别当前通知渠道",children:o.jsx("input",{className:"settings-input",value:f,onChange:P=>m(P.target.value),placeholder:"生产管理群"})}),o.jsxs("div",{className:"settings-buttons",children:[o.jsxs("button",{type:"button",className:"settings-button-primary",disabled:!!a,onClick:()=>_("settings.saveNotification"),children:[O&&o.jsx(as,{})," ",O?"正在保存…":"保存设置"]}),o.jsxs("button",{type:"button",className:"settings-button-secondary",disabled:!!a,onClick:()=>_("settings.testNotification"),children:[U&&o.jsx(as,{})," ",U?"正在发送…":"发送测试"]})]}),l.status&&o.jsx("p",{className:"settings-inline-status",children:l.status})]}),o.jsxs(Pr,{title:"通知规则",children:[o.jsx("div",{className:"settings-rule-list",children:C.map(P=>o.jsx(Ut,{title:P.name,description:`钉钉 · ${bD(P.level)}`,children:o.jsx(Zv,{checked:P.enabled,label:`通知规则：${P.name}`,onChange:M=>R(D=>D.map(q=>q.eventType===P.eventType?{...q,enabled:M}:q))})},P.eventType))}),o.jsx("div",{className:"settings-buttons settings-buttons-end",children:o.jsx("button",{type:"button",className:"settings-button-primary",disabled:!!a,onClick:()=>s("settings.saveNotificationRules",{rules:C}),children:"保存通知规则"})})]})]})}function vD({state:n,busy:a,run:s}){return o.jsx(bo,{title:"数据与缓存",description:"查看和维护生产助手保存在本机的 Notion 数据源缓存。",children:o.jsxs(Pr,{title:"本地数据",children:[o.jsx(Ut,{title:"Notion 数据源缓存",description:"用于减少重复的网络请求",children:o.jsxs("div",{className:"settings-inline-actions",children:[o.jsxs("span",{className:"settings-value",children:[n.notion.dataSourceCount," 个"]}),o.jsxs("button",{type:"button",className:"settings-text-button",disabled:!!a,onClick:()=>s("settings.refreshDataSources"),children:[a==="settings.refreshDataSources"&&o.jsx(as,{})," ",a==="settings.refreshDataSources"?"刷新中…":"刷新"]})]})}),o.jsx(Ut,{title:"上次同步",description:"数据源元信息最后更新时间",children:o.jsx("span",{className:"settings-value",children:n.notion.lastSyncedAt||"尚未同步"})})]})})}function xD({state:n}){return o.jsx(bo,{title:"关于",description:"生产助手的版本和运行环境信息。",children:o.jsxs(Pr,{title:"生产助手",children:[o.jsx(Ut,{title:"版本",description:"当前安装版本",children:o.jsx("span",{className:"settings-value",children:n.version})}),o.jsx(Ut,{title:"桌面环境",description:"应用运行容器",children:o.jsx("span",{className:"settings-value",children:"WinUI 3 + WebView2"})}),o.jsx(Ut,{title:"前端",description:"用户界面技术栈",children:o.jsx("span",{className:"settings-value",children:"React + TypeScript"})}),o.jsx(Ut,{title:"本地数据保护",description:"令牌和通知凭据仅保存在本机",children:o.jsx("span",{className:"settings-value",children:"Windows 当前用户加密"})})]})})}function bo({title:n,description:a,children:s}){return o.jsxs("div",{className:"settings-page",children:[o.jsxs("header",{className:"settings-page-header",children:[o.jsx("h1",{children:n}),o.jsx("p",{children:a})]}),s]})}function Pr({title:n,children:a}){return o.jsxs("section",{className:"settings-section",children:[o.jsx("h2",{children:n}),o.jsx("div",{className:"settings-section-body",children:a})]})}function Ut({title:n,description:a,children:s}){return o.jsxs("div",{className:"settings-row",children:[o.jsxs("div",{className:"settings-row-text",children:[o.jsx("div",{className:"settings-row-title",children:n}),a&&o.jsx("div",{className:"settings-row-description",children:a})]}),o.jsx("div",{className:"settings-row-control",children:s})]})}function Ji({title:n,description:a,children:s}){return o.jsxs("label",{className:"settings-field",children:[o.jsx("span",{className:"settings-field-title",children:n}),a&&o.jsx("span",{className:"settings-field-description",children:a}),o.jsx("span",{className:"settings-field-control",children:s})]})}function Zv({checked:n,onChange:a,label:s}){return o.jsx("button",{type:"button",role:"switch","aria-checked":n,"aria-label":s,className:n?"settings-switch checked":"settings-switch",onClick:()=>a(!n),children:o.jsx("span",{})})}function qb({connected:n,label:a}){return o.jsxs("div",{className:`settings-connected ${n===!1?"error":n===null?"pending":""}`,children:[o.jsx("span",{className:"settings-status-dot"}),a]})}function as(){return o.jsx("span",{className:"settings-spinner","aria-hidden":"true"})}const bD=n=>n==="warning"?"警告":n==="info"?"信息":"错误";function SD(){return o.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("circle",{cx:"11",cy:"11",r:"6.5"}),o.jsx("path",{d:"m16 16 4 4"})]})}function wD(){return o.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("path",{d:"M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"}),o.jsx("path",{d:"M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1"})]})}function jD(){return o.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("path",{d:"M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"}),o.jsx("path",{d:"M10 21h4"})]})}function ED(){return o.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("ellipse",{cx:"12",cy:"5",rx:"7",ry:"3"}),o.jsx("path",{d:"M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5"}),o.jsx("path",{d:"M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"})]})}function TD(){return o.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("circle",{cx:"12",cy:"12",r:"9"}),o.jsx("path",{d:"M12 11v6"}),o.jsx("path",{d:"M12 7h.01"})]})}function CD(){return o.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("path",{d:"m6 6 12 12"}),o.jsx("path",{d:"m18 6-12 12"})]})}const hd=new Date().toISOString().slice(0,10);function ND(){const[n,a]=S.useState(""),[s,l]=S.useState(!1),[u,h]=S.useState([]),[f,m]=S.useState(""),[g,p]=S.useState([]),[v,x]=S.useState(""),[b,j]=S.useState([]),[E,T]=S.useState(""),[C,R]=S.useState([]),[k,_]=S.useState(""),[O,U]=S.useState(""),[P,M]=S.useState("day"),[D,q]=S.useState(hd),[$,ee]=S.useState(hd),[ne,pe]=S.useState(hd),[le,se]=S.useState("load"),[L,F]=S.useState(""),[ae,ie]=S.useState();S.useEffect(()=>{be("database.getState").then(W=>{a(W.provider),l(W.usesBusinessSections),h(W.businessSections),p(W.sources)}).catch(W=>F(W instanceof Error?W.message:String(W))).finally(()=>se(""))},[]);const oe=async W=>{var he,Ce,ze,Qe;if(x(W),T(""),_(""),U(""),j([]),R([]),ie(void 0),F(""),!!W){se("schema");try{const Fe=await be("database.getSchema",{sourceId:W});R(Fe.fields),j(Fe.datasets),_(((he=Fe.fields.find(yt=>yt.type==="date"))==null?void 0:he.id)||""),U(((Ce=Fe.fields.find(yt=>yt.type==="number"))==null?void 0:Ce.id)||""),T(((ze=Fe.datasets.find(yt=>yt.name==="本年截止今日"))==null?void 0:ze.id)||((Qe=Fe.datasets[0])==null?void 0:Qe.id)||"")}catch(Fe){F(Fe instanceof Error?Fe.message:String(Fe))}finally{se("")}}},N=async()=>{se("query"),F(""),ie(void 0);try{ie(await be("database.inspect",{sourceId:v,datasetId:E,dateFieldId:xe?k:"",valueFieldId:xe?O:"",rangeKind:xe?P:"all",businessDate:D,startDate:$,endDate:ne},12e4))}catch(W){F(W instanceof Error?W.message:String(W))}finally{se("")}},V=C.filter(W=>W.type==="date"),I=s?g.filter(W=>W.businessSection===f):g,re=C.filter(W=>W.type==="number"),ce=C.find(W=>W.id===O),ye=b.find(W=>W.id===E),xe=(ye==null?void 0:ye.name.trim())==="本年截止今日",te=S.useMemo(()=>{const W=new Set([k,O]);return[...C.filter(he=>W.has(he.id)),...C.filter(he=>!W.has(he.id))]},[C,k,O]),Q=P==="week"||P==="custom",de=v&&E&&(!xe||k&&(!Q||$&&ne));return o.jsxs("div",{className:"page database-viewer-page",children:[o.jsxs("header",{children:[o.jsxs("div",{children:[o.jsx("h1",{children:"数据库查看"}),o.jsx("p",{children:"按当前适配器提供的目录选择数据库并查看真实 View；目录层级不会由界面写死。"})]}),o.jsxs("span",{className:"database-provider",children:[o.jsx(fo,{}),"当前适配器：",n||"读取中"]})]}),o.jsxs("section",{className:"database-query-panel",children:[o.jsxs("div",{className:"database-query-heading",children:[o.jsx("h2",{children:"查询条件"}),o.jsx("p",{children:"普通 View 读取其完整结果；只有“本年截止今日”可在返回记录内计算日期口径。"})]}),o.jsxs("div",{className:"database-query-grid",children:[s&&o.jsxs("label",{children:["业务板块",o.jsx(mr,{value:f,placeholder:le==="load"?"正在读取业务板块…":"请选择业务板块",disabled:!!le,options:u.map(W=>({value:W,label:W})),onChange:W=>{m(W),oe("")}})]}),o.jsxs("label",{children:["数据库",o.jsx(mr,{value:v,placeholder:"请选择具体数据库",disabled:s&&!f||!!le,options:I.map(W=>({value:W.id,label:W.name})),onChange:oe})]}),o.jsxs("label",{children:["View",o.jsx(mr,{value:E,placeholder:le==="schema"?"正在读取 View…":"请选择 View",disabled:!v||!!le,options:b.map(W=>({value:W.id,label:W.name})),onChange:W=>{T(W),ie(void 0)}})]}),xe&&o.jsxs(o.Fragment,{children:[o.jsxs("label",{children:["日期字段",o.jsx(mr,{value:k,placeholder:"请选择日期字段",disabled:!C.length||!!le,options:V.map(W=>({value:W.id,label:W.name})),onChange:_})]}),o.jsxs("label",{children:["累计字段",o.jsx(mr,{value:O,placeholder:"可选择数值字段",disabled:!C.length||!!le,options:re.map(W=>({value:W.id,label:W.name})),onChange:U})]}),o.jsxs("label",{children:["软件查询口径",o.jsx(mr,{value:P,placeholder:"请选择日期口径",disabled:!!le,options:[{value:"day",label:"指定日期"},{value:"week",label:"指定日期范围"},{value:"month",label:"月初至指定日期"},{value:"year",label:"年初至指定日期"}],onChange:W=>{M(W),ie(void 0)}})]}),!Q&&o.jsxs("label",{children:["指定日期",o.jsx(Ua,{value:D,onChange:q})]}),Q&&o.jsxs(o.Fragment,{children:[o.jsxs("label",{children:["开始日期",o.jsx(Ua,{value:$,onChange:ee})]}),o.jsxs("label",{children:["结束日期",o.jsx(Ua,{value:ne,onChange:pe})]})]})]})]}),o.jsx("div",{className:"database-query-actions",children:o.jsxs("button",{className:"primary",disabled:!de||!!le,onClick:N,children:[le==="query"?o.jsx(sn,{className:"spin"}):o.jsx(Gx,{}),le==="query"?"正在查询…":"执行查询"]})})]}),L&&o.jsxs("div",{className:"notice error",role:"alert",children:[o.jsx(Ld,{}),o.jsxs("div",{children:[o.jsx("strong",{children:"查询失败"}),o.jsx("span",{children:L})]})]}),ae?o.jsxs("section",{className:"database-result",children:[o.jsxs("div",{className:"database-result-head",children:[o.jsxs("div",{children:[o.jsxs("h2",{children:[ae.sourceName," · ",ae.datasetName]}),o.jsx("p",{children:xe?`${ae.startDate} ～ ${ae.endDate}`:"完整 View 结果"})]}),o.jsxs("dl",{children:[o.jsxs("div",{children:[o.jsxs("dt",{children:[o.jsx(VC,{}),"命中记录"]}),o.jsx("dd",{children:ae.recordCount})]}),xe&&o.jsxs("div",{children:[o.jsxs("dt",{children:[o.jsx(UC,{}),(ce==null?void 0:ce.name)||"累计值"]}),o.jsx("dd",{children:ae.total??"—"})]})]})]}),o.jsx("div",{className:"database-table-wrap",children:o.jsxs("table",{children:[o.jsx("thead",{children:o.jsx("tr",{children:te.map(W=>o.jsxs("th",{children:[W.name,o.jsx("small",{children:W.type})]},W.id))})}),o.jsx("tbody",{children:ae.records.map(W=>o.jsx("tr",{children:te.map(he=>o.jsx("td",{children:AD(W.values[he.id])},he.id))},W.id))})]})}),ae.truncated&&o.jsx("p",{className:"database-truncated",children:"结果仅展示前 200 条，命中数量和累计值按全部记录计算。"})]}):!le&&!L&&o.jsxs("section",{className:"database-empty",children:[o.jsx(fo,{}),o.jsx("h2",{children:s?"选择业务板块、数据库和 View 后执行查询":"选择数据库和 View 后执行查询"}),o.jsx("p",{children:"普通 View 显示完整结果；“本年截止今日”可进一步选择日期口径。所有操作均为只读。"})]})]})}function AD(n){return n==null||n===""?"—":typeof n=="boolean"?n?"是":"否":typeof n=="number"?n.toLocaleString("zh-CN",{maximumFractionDigits:2}):String(n)}function DD(){const[n,a]=S.useState(()=>window.location.search),[s,l]=S.useState(!1);S.useEffect(()=>{const j=()=>a(window.location.search);return window.addEventListener("popstate",j),()=>window.removeEventListener("popstate",j)},[]);const u=new URLSearchParams(n),h=u.get("route"),f=h!=null&&h.startsWith("navigation:")||h==="daily-weld"||h==="production-message"||h==="database-viewer"||h==="daily-report"||h==="report-center"?h:"production-message",m=u.get("navigation")||"",g=Lx();S.useEffect(()=>{bC(f,m)},[f,m]);const p=j=>be("app.navigateNative",{tag:j}).catch(()=>{}),v=f.startsWith("navigation:")?f.slice(11):f,x=f.startsWith("navigation:");S.useEffect(()=>(document.body.classList.toggle("settings-over-native",x&&s),()=>document.body.classList.remove("settings-over-native")),[x,s]);const b=()=>{l(!1),window.dispatchEvent(new Event("production-settings-updated")),be("settings.close").catch(()=>{})};return o.jsxs("div",{className:`desktop-shell ${x&&s?"settings-over-native":""}`,children:[o.jsx("div",{className:"production-message-demo desktop-shell-navigation",children:o.jsx(rD,{active:v,navigate:p,openSettings:()=>l(!0)})}),o.jsx("div",{className:`desktop-shell-content ${x?"desktop-shell-content-native":""}`,children:x?o.jsx("div",{className:"native-content-slot","aria-hidden":"true"}):f==="production-message"||f==="daily-weld"?o.jsx("div",{className:"production-message-demo production-message-content",children:f==="daily-weld"?o.jsx(eD,{openSettings:()=>l(!0)}):o.jsx(uD,{})}):o.jsx("div",{className:"app-shell",children:o.jsx("main",{children:o.jsx(cT,{mode:"wait",children:o.jsx(Mf.div,{initial:g?!1:{opacity:0,y:8},animate:{opacity:1,y:0},exit:g?void 0:{opacity:0,y:-6},transition:{duration:.2},children:f==="database-viewer"?o.jsx(ND,{}):f==="daily-report"?o.jsx(JA,{openSettings:()=>l(!0)}):o.jsx(mD,{})},f)})})})}),o.jsx(pD,{open:s,onClose:b})]})}x2.createRoot(document.getElementById("root")).render(o.jsx(Wv.StrictMode,{children:o.jsx(DD,{})}));
