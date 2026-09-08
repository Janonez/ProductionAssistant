function yw(n,a){for(var s=0;s<a.length;s++){const o=a[s];if(typeof o!="string"&&!Array.isArray(o)){for(const c in o)if(c!=="default"&&!(c in n)){const h=Object.getOwnPropertyDescriptor(o,c);h&&Object.defineProperty(n,c,h.get?h:{enumerable:!0,get:()=>o[c]})}}}return Object.freeze(Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}))}(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))o(c);new MutationObserver(c=>{for(const h of c)if(h.type==="childList")for(const f of h.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&o(f)}).observe(document,{childList:!0,subtree:!0});function s(c){const h={};return c.integrity&&(h.integrity=c.integrity),c.referrerPolicy&&(h.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?h.credentials="include":c.crossOrigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function o(c){if(c.ep)return;c.ep=!0;const h=s(c);fetch(c.href,h)}})();function tb(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var _u={exports:{}},qi={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Qg;function vw(){if(Qg)return qi;Qg=1;var n=Symbol.for("react.transitional.element"),a=Symbol.for("react.fragment");function s(o,c,h){var f=null;if(h!==void 0&&(f=""+h),c.key!==void 0&&(f=""+c.key),"key"in c){h={};for(var m in c)m!=="key"&&(h[m]=c[m])}else h=c;return c=h.ref,{$$typeof:n,type:o,key:f,ref:c!==void 0?c:null,props:h}}return qi.Fragment=a,qi.jsx=s,qi.jsxs=s,qi}var Jg;function bw(){return Jg||(Jg=1,_u.exports=vw()),_u.exports}var u=bw(),Vu={exports:{}},Se={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Wg;function xw(){if(Wg)return Se;Wg=1;var n=Symbol.for("react.transitional.element"),a=Symbol.for("react.portal"),s=Symbol.for("react.fragment"),o=Symbol.for("react.strict_mode"),c=Symbol.for("react.profiler"),h=Symbol.for("react.consumer"),f=Symbol.for("react.context"),m=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),g=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),b=Symbol.for("react.activity"),x=Symbol.iterator;function j(T){return T===null||typeof T!="object"?null:(T=x&&T[x]||T["@@iterator"],typeof T=="function"?T:null)}var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},C=Object.assign,A={};function z(T,R,W){this.props=T,this.context=R,this.refs=A,this.updater=W||E}z.prototype.isReactComponent={},z.prototype.setState=function(T,R){if(typeof T!="object"&&typeof T!="function"&&T!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,T,R,"setState")},z.prototype.forceUpdate=function(T){this.updater.enqueueForceUpdate(this,T,"forceUpdate")};function k(){}k.prototype=z.prototype;function V(T,R,W){this.props=T,this.context=R,this.refs=A,this.updater=W||E}var _=V.prototype=new k;_.constructor=V,C(_,z.prototype),_.isPureReactComponent=!0;var L=Array.isArray;function Y(){}var N={H:null,A:null,T:null,S:null},M=Object.prototype.hasOwnProperty;function X(T,R,W){var ae=W.ref;return{$$typeof:n,type:T,key:R,ref:ae!==void 0?ae:null,props:W}}function F(T,R){return X(T.type,R,T.props)}function ne(T){return typeof T=="object"&&T!==null&&T.$$typeof===n}function ie(T){var R={"=":"=0",":":"=2"};return"$"+T.replace(/[=:]/g,function(W){return R[W]})}var pe=/\/+/g;function le(T,R){return typeof T=="object"&&T!==null&&T.key!=null?ie(""+T.key):R.toString(36)}function ve(T){switch(T.status){case"fulfilled":return T.value;case"rejected":throw T.reason;default:switch(typeof T.status=="string"?T.then(Y,Y):(T.status="pending",T.then(function(R){T.status==="pending"&&(T.status="fulfilled",T.value=R)},function(R){T.status==="pending"&&(T.status="rejected",T.reason=R)})),T.status){case"fulfilled":return T.value;case"rejected":throw T.reason}}throw T}function U(T,R,W,ae,oe){var fe=typeof T;(fe==="undefined"||fe==="boolean")&&(T=null);var ye=!1;if(T===null)ye=!0;else switch(fe){case"bigint":case"string":case"number":ye=!0;break;case"object":switch(T.$$typeof){case n:case a:ye=!0;break;case v:return ye=T._init,U(ye(T._payload),R,W,ae,oe)}}if(ye)return oe=oe(T),ye=ae===""?"."+le(T,0):ae,L(oe)?(W="",ye!=null&&(W=ye.replace(pe,"$&/")+"/"),U(oe,R,W,"",function(ue){return ue})):oe!=null&&(ne(oe)&&(oe=F(oe,W+(oe.key==null||T&&T.key===oe.key?"":(""+oe.key).replace(pe,"$&/")+"/")+ye)),R.push(oe)),1;ye=0;var re=ae===""?".":ae+":";if(L(T))for(var Q=0;Q<T.length;Q++)ae=T[Q],fe=re+le(ae,Q),ye+=U(ae,R,W,fe,oe);else if(Q=j(T),typeof Q=="function")for(T=Q.call(T),Q=0;!(ae=T.next()).done;)ae=ae.value,fe=re+le(ae,Q++),ye+=U(ae,R,W,fe,oe);else if(fe==="object"){if(typeof T.then=="function")return U(ve(T),R,W,ae,oe);throw R=String(T),Error("Objects are not valid as a React child (found: "+(R==="[object Object]"?"object with keys {"+Object.keys(T).join(", ")+"}":R)+"). If you meant to render a collection of children, use an array instead.")}return ye}function se(T,R,W){if(T==null)return T;var ae=[],oe=0;return U(T,ae,"","",function(fe){return R.call(W,fe,oe++)}),ae}function K(T){if(T._status===-1){var R=T._result;R=R(),R.then(function(W){(T._status===0||T._status===-1)&&(T._status=1,T._result=W)},function(W){(T._status===0||T._status===-1)&&(T._status=2,T._result=W)}),T._status===-1&&(T._status=0,T._result=R)}if(T._status===1)return T._result.default;throw T._result}var G=typeof reportError=="function"?reportError:function(T){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var R=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof T=="object"&&T!==null&&typeof T.message=="string"?String(T.message):String(T),error:T});if(!window.dispatchEvent(R))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",T);return}console.error(T)},te={map:se,forEach:function(T,R,W){se(T,function(){R.apply(this,arguments)},W)},count:function(T){var R=0;return se(T,function(){R++}),R},toArray:function(T){return se(T,function(R){return R})||[]},only:function(T){if(!ne(T))throw Error("React.Children.only expected to receive a single React element child.");return T}};return Se.Activity=b,Se.Children=te,Se.Component=z,Se.Fragment=s,Se.Profiler=c,Se.PureComponent=V,Se.StrictMode=o,Se.Suspense=p,Se.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=N,Se.__COMPILER_RUNTIME={__proto__:null,c:function(T){return N.H.useMemoCache(T)}},Se.cache=function(T){return function(){return T.apply(null,arguments)}},Se.cacheSignal=function(){return null},Se.cloneElement=function(T,R,W){if(T==null)throw Error("The argument must be a React element, but you passed "+T+".");var ae=C({},T.props),oe=T.key;if(R!=null)for(fe in R.key!==void 0&&(oe=""+R.key),R)!M.call(R,fe)||fe==="key"||fe==="__self"||fe==="__source"||fe==="ref"&&R.ref===void 0||(ae[fe]=R[fe]);var fe=arguments.length-2;if(fe===1)ae.children=W;else if(1<fe){for(var ye=Array(fe),re=0;re<fe;re++)ye[re]=arguments[re+2];ae.children=ye}return X(T.type,oe,ae)},Se.createContext=function(T){return T={$$typeof:f,_currentValue:T,_currentValue2:T,_threadCount:0,Provider:null,Consumer:null},T.Provider=T,T.Consumer={$$typeof:h,_context:T},T},Se.createElement=function(T,R,W){var ae,oe={},fe=null;if(R!=null)for(ae in R.key!==void 0&&(fe=""+R.key),R)M.call(R,ae)&&ae!=="key"&&ae!=="__self"&&ae!=="__source"&&(oe[ae]=R[ae]);var ye=arguments.length-2;if(ye===1)oe.children=W;else if(1<ye){for(var re=Array(ye),Q=0;Q<ye;Q++)re[Q]=arguments[Q+2];oe.children=re}if(T&&T.defaultProps)for(ae in ye=T.defaultProps,ye)oe[ae]===void 0&&(oe[ae]=ye[ae]);return X(T,fe,oe)},Se.createRef=function(){return{current:null}},Se.forwardRef=function(T){return{$$typeof:m,render:T}},Se.isValidElement=ne,Se.lazy=function(T){return{$$typeof:v,_payload:{_status:-1,_result:T},_init:K}},Se.memo=function(T,R){return{$$typeof:g,type:T,compare:R===void 0?null:R}},Se.startTransition=function(T){var R=N.T,W={};N.T=W;try{var ae=T(),oe=N.S;oe!==null&&oe(W,ae),typeof ae=="object"&&ae!==null&&typeof ae.then=="function"&&ae.then(Y,G)}catch(fe){G(fe)}finally{R!==null&&W.types!==null&&(R.types=W.types),N.T=R}},Se.unstable_useCacheRefresh=function(){return N.H.useCacheRefresh()},Se.use=function(T){return N.H.use(T)},Se.useActionState=function(T,R,W){return N.H.useActionState(T,R,W)},Se.useCallback=function(T,R){return N.H.useCallback(T,R)},Se.useContext=function(T){return N.H.useContext(T)},Se.useDebugValue=function(){},Se.useDeferredValue=function(T,R){return N.H.useDeferredValue(T,R)},Se.useEffect=function(T,R){return N.H.useEffect(T,R)},Se.useEffectEvent=function(T){return N.H.useEffectEvent(T)},Se.useId=function(){return N.H.useId()},Se.useImperativeHandle=function(T,R,W){return N.H.useImperativeHandle(T,R,W)},Se.useInsertionEffect=function(T,R){return N.H.useInsertionEffect(T,R)},Se.useLayoutEffect=function(T,R){return N.H.useLayoutEffect(T,R)},Se.useMemo=function(T,R){return N.H.useMemo(T,R)},Se.useOptimistic=function(T,R){return N.H.useOptimistic(T,R)},Se.useReducer=function(T,R,W){return N.H.useReducer(T,R,W)},Se.useRef=function(T){return N.H.useRef(T)},Se.useState=function(T){return N.H.useState(T)},Se.useSyncExternalStore=function(T,R,W){return N.H.useSyncExternalStore(T,R,W)},Se.useTransition=function(){return N.H.useTransition()},Se.version="19.2.8",Se}var Ig;function sf(){return Ig||(Ig=1,Vu.exports=xw()),Vu.exports}var S=sf();const nb=tb(S),is=yw({__proto__:null,default:nb},[S]);var Bu={exports:{}},Yi={},Lu={exports:{}},Uu={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ey;function Sw(){return ey||(ey=1,(function(n){function a(U,se){var K=U.length;U.push(se);e:for(;0<K;){var G=K-1>>>1,te=U[G];if(0<c(te,se))U[G]=se,U[K]=te,K=G;else break e}}function s(U){return U.length===0?null:U[0]}function o(U){if(U.length===0)return null;var se=U[0],K=U.pop();if(K!==se){U[0]=K;e:for(var G=0,te=U.length,T=te>>>1;G<T;){var R=2*(G+1)-1,W=U[R],ae=R+1,oe=U[ae];if(0>c(W,K))ae<te&&0>c(oe,W)?(U[G]=oe,U[ae]=K,G=ae):(U[G]=W,U[R]=K,G=R);else if(ae<te&&0>c(oe,K))U[G]=oe,U[ae]=K,G=ae;else break e}}return se}function c(U,se){var K=U.sortIndex-se.sortIndex;return K!==0?K:U.id-se.id}if(n.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var h=performance;n.unstable_now=function(){return h.now()}}else{var f=Date,m=f.now();n.unstable_now=function(){return f.now()-m}}var p=[],g=[],v=1,b=null,x=3,j=!1,E=!1,C=!1,A=!1,z=typeof setTimeout=="function"?setTimeout:null,k=typeof clearTimeout=="function"?clearTimeout:null,V=typeof setImmediate<"u"?setImmediate:null;function _(U){for(var se=s(g);se!==null;){if(se.callback===null)o(g);else if(se.startTime<=U)o(g),se.sortIndex=se.expirationTime,a(p,se);else break;se=s(g)}}function L(U){if(C=!1,_(U),!E)if(s(p)!==null)E=!0,Y||(Y=!0,ie());else{var se=s(g);se!==null&&ve(L,se.startTime-U)}}var Y=!1,N=-1,M=5,X=-1;function F(){return A?!0:!(n.unstable_now()-X<M)}function ne(){if(A=!1,Y){var U=n.unstable_now();X=U;var se=!0;try{e:{E=!1,C&&(C=!1,k(N),N=-1),j=!0;var K=x;try{t:{for(_(U),b=s(p);b!==null&&!(b.expirationTime>U&&F());){var G=b.callback;if(typeof G=="function"){b.callback=null,x=b.priorityLevel;var te=G(b.expirationTime<=U);if(U=n.unstable_now(),typeof te=="function"){b.callback=te,_(U),se=!0;break t}b===s(p)&&o(p),_(U)}else o(p);b=s(p)}if(b!==null)se=!0;else{var T=s(g);T!==null&&ve(L,T.startTime-U),se=!1}}break e}finally{b=null,x=K,j=!1}se=void 0}}finally{se?ie():Y=!1}}}var ie;if(typeof V=="function")ie=function(){V(ne)};else if(typeof MessageChannel<"u"){var pe=new MessageChannel,le=pe.port2;pe.port1.onmessage=ne,ie=function(){le.postMessage(null)}}else ie=function(){z(ne,0)};function ve(U,se){N=z(function(){U(n.unstable_now())},se)}n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(U){U.callback=null},n.unstable_forceFrameRate=function(U){0>U||125<U?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):M=0<U?Math.floor(1e3/U):5},n.unstable_getCurrentPriorityLevel=function(){return x},n.unstable_next=function(U){switch(x){case 1:case 2:case 3:var se=3;break;default:se=x}var K=x;x=se;try{return U()}finally{x=K}},n.unstable_requestPaint=function(){A=!0},n.unstable_runWithPriority=function(U,se){switch(U){case 1:case 2:case 3:case 4:case 5:break;default:U=3}var K=x;x=U;try{return se()}finally{x=K}},n.unstable_scheduleCallback=function(U,se,K){var G=n.unstable_now();switch(typeof K=="object"&&K!==null?(K=K.delay,K=typeof K=="number"&&0<K?G+K:G):K=G,U){case 1:var te=-1;break;case 2:te=250;break;case 5:te=1073741823;break;case 4:te=1e4;break;default:te=5e3}return te=K+te,U={id:v++,callback:se,priorityLevel:U,startTime:K,expirationTime:te,sortIndex:-1},K>G?(U.sortIndex=K,a(g,U),s(p)===null&&U===s(g)&&(C?(k(N),N=-1):C=!0,ve(L,K-G))):(U.sortIndex=te,a(p,U),E||j||(E=!0,Y||(Y=!0,ie()))),U},n.unstable_shouldYield=F,n.unstable_wrapCallback=function(U){var se=x;return function(){var K=x;x=se;try{return U.apply(this,arguments)}finally{x=K}}}})(Uu)),Uu}var ty;function ww(){return ty||(ty=1,Lu.exports=Sw()),Lu.exports}var Hu={exports:{}},gt={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ny;function jw(){if(ny)return gt;ny=1;var n=sf();function a(p){var g="https://react.dev/errors/"+p;if(1<arguments.length){g+="?args[]="+encodeURIComponent(arguments[1]);for(var v=2;v<arguments.length;v++)g+="&args[]="+encodeURIComponent(arguments[v])}return"Minified React error #"+p+"; visit "+g+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function s(){}var o={d:{f:s,r:function(){throw Error(a(522))},D:s,C:s,L:s,m:s,X:s,S:s,M:s},p:0,findDOMNode:null},c=Symbol.for("react.portal");function h(p,g,v){var b=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:c,key:b==null?null:""+b,children:p,containerInfo:g,implementation:v}}var f=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function m(p,g){if(p==="font")return"";if(typeof g=="string")return g==="use-credentials"?g:""}return gt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=o,gt.createPortal=function(p,g){var v=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!g||g.nodeType!==1&&g.nodeType!==9&&g.nodeType!==11)throw Error(a(299));return h(p,g,null,v)},gt.flushSync=function(p){var g=f.T,v=o.p;try{if(f.T=null,o.p=2,p)return p()}finally{f.T=g,o.p=v,o.d.f()}},gt.preconnect=function(p,g){typeof p=="string"&&(g?(g=g.crossOrigin,g=typeof g=="string"?g==="use-credentials"?g:"":void 0):g=null,o.d.C(p,g))},gt.prefetchDNS=function(p){typeof p=="string"&&o.d.D(p)},gt.preinit=function(p,g){if(typeof p=="string"&&g&&typeof g.as=="string"){var v=g.as,b=m(v,g.crossOrigin),x=typeof g.integrity=="string"?g.integrity:void 0,j=typeof g.fetchPriority=="string"?g.fetchPriority:void 0;v==="style"?o.d.S(p,typeof g.precedence=="string"?g.precedence:void 0,{crossOrigin:b,integrity:x,fetchPriority:j}):v==="script"&&o.d.X(p,{crossOrigin:b,integrity:x,fetchPriority:j,nonce:typeof g.nonce=="string"?g.nonce:void 0})}},gt.preinitModule=function(p,g){if(typeof p=="string")if(typeof g=="object"&&g!==null){if(g.as==null||g.as==="script"){var v=m(g.as,g.crossOrigin);o.d.M(p,{crossOrigin:v,integrity:typeof g.integrity=="string"?g.integrity:void 0,nonce:typeof g.nonce=="string"?g.nonce:void 0})}}else g==null&&o.d.M(p)},gt.preload=function(p,g){if(typeof p=="string"&&typeof g=="object"&&g!==null&&typeof g.as=="string"){var v=g.as,b=m(v,g.crossOrigin);o.d.L(p,v,{crossOrigin:b,integrity:typeof g.integrity=="string"?g.integrity:void 0,nonce:typeof g.nonce=="string"?g.nonce:void 0,type:typeof g.type=="string"?g.type:void 0,fetchPriority:typeof g.fetchPriority=="string"?g.fetchPriority:void 0,referrerPolicy:typeof g.referrerPolicy=="string"?g.referrerPolicy:void 0,imageSrcSet:typeof g.imageSrcSet=="string"?g.imageSrcSet:void 0,imageSizes:typeof g.imageSizes=="string"?g.imageSizes:void 0,media:typeof g.media=="string"?g.media:void 0})}},gt.preloadModule=function(p,g){if(typeof p=="string")if(g){var v=m(g.as,g.crossOrigin);o.d.m(p,{as:typeof g.as=="string"&&g.as!=="script"?g.as:void 0,crossOrigin:v,integrity:typeof g.integrity=="string"?g.integrity:void 0})}else o.d.m(p)},gt.requestFormReset=function(p){o.d.r(p)},gt.unstable_batchedUpdates=function(p,g){return p(g)},gt.useFormState=function(p,g,v){return f.H.useFormState(p,g,v)},gt.useFormStatus=function(){return f.H.useHostTransitionStatus()},gt.version="19.2.8",gt}var ry;function rb(){if(ry)return Hu.exports;ry=1;function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(a){console.error(a)}}return n(),Hu.exports=jw(),Hu.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ay;function Ew(){if(ay)return Yi;ay=1;var n=ww(),a=sf(),s=rb();function o(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var r=2;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function c(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function h(e){var t=e,r=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(r=t.return),e=t.return;while(e)}return t.tag===3?r:null}function f(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function m(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function p(e){if(h(e)!==e)throw Error(o(188))}function g(e){var t=e.alternate;if(!t){if(t=h(e),t===null)throw Error(o(188));return t!==e?null:e}for(var r=e,i=t;;){var l=r.return;if(l===null)break;var d=l.alternate;if(d===null){if(i=l.return,i!==null){r=i;continue}break}if(l.child===d.child){for(d=l.child;d;){if(d===r)return p(l),e;if(d===i)return p(l),t;d=d.sibling}throw Error(o(188))}if(r.return!==i.return)r=l,i=d;else{for(var y=!1,w=l.child;w;){if(w===r){y=!0,r=l,i=d;break}if(w===i){y=!0,i=l,r=d;break}w=w.sibling}if(!y){for(w=d.child;w;){if(w===r){y=!0,r=d,i=l;break}if(w===i){y=!0,i=d,r=l;break}w=w.sibling}if(!y)throw Error(o(189))}}if(r.alternate!==i)throw Error(o(190))}if(r.tag!==3)throw Error(o(188));return r.stateNode.current===r?e:t}function v(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=v(e),t!==null)return t;e=e.sibling}return null}var b=Object.assign,x=Symbol.for("react.element"),j=Symbol.for("react.transitional.element"),E=Symbol.for("react.portal"),C=Symbol.for("react.fragment"),A=Symbol.for("react.strict_mode"),z=Symbol.for("react.profiler"),k=Symbol.for("react.consumer"),V=Symbol.for("react.context"),_=Symbol.for("react.forward_ref"),L=Symbol.for("react.suspense"),Y=Symbol.for("react.suspense_list"),N=Symbol.for("react.memo"),M=Symbol.for("react.lazy"),X=Symbol.for("react.activity"),F=Symbol.for("react.memo_cache_sentinel"),ne=Symbol.iterator;function ie(e){return e===null||typeof e!="object"?null:(e=ne&&e[ne]||e["@@iterator"],typeof e=="function"?e:null)}var pe=Symbol.for("react.client.reference");function le(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===pe?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case C:return"Fragment";case z:return"Profiler";case A:return"StrictMode";case L:return"Suspense";case Y:return"SuspenseList";case X:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case E:return"Portal";case V:return e.displayName||"Context";case k:return(e._context.displayName||"Context")+".Consumer";case _:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case N:return t=e.displayName||null,t!==null?t:le(e.type)||"Memo";case M:t=e._payload,e=e._init;try{return le(e(t))}catch{}}return null}var ve=Array.isArray,U=a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,se=s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,K={pending:!1,data:null,method:null,action:null},G=[],te=-1;function T(e){return{current:e}}function R(e){0>te||(e.current=G[te],G[te]=null,te--)}function W(e,t){te++,G[te]=e.current,e.current=t}var ae=T(null),oe=T(null),fe=T(null),ye=T(null);function re(e,t){switch(W(fe,t),W(oe,e),W(ae,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?bg(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=bg(t),e=xg(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}R(ae),W(ae,e)}function Q(){R(ae),R(oe),R(fe)}function ue(e){e.memoizedState!==null&&W(ye,e);var t=ae.current,r=xg(t,e.type);t!==r&&(W(oe,e),W(ae,r))}function ee(e){oe.current===e&&(R(ae),R(oe)),ye.current===e&&(R(ye),Bi._currentValue=K)}var he,Ce;function Oe(e){if(he===void 0)try{throw Error()}catch(r){var t=r.stack.trim().match(/\n( *(at )?)/);he=t&&t[1]||"",Ce=-1<r.stack.indexOf(`
    at`)?" (<anonymous>)":-1<r.stack.indexOf("@")?"@unknown:0:0":""}return`
`+he+e+Ce}var Qe=!1;function $e(e,t){if(!e||Qe)return"";Qe=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(t){var I=function(){throw Error()};if(Object.defineProperty(I.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(I,[])}catch($){var P=$}Reflect.construct(e,[],I)}else{try{I.call()}catch($){P=$}e.call(I.prototype)}}else{try{throw Error()}catch($){P=$}(I=e())&&typeof I.catch=="function"&&I.catch(function(){})}}catch($){if($&&P&&typeof $.stack=="string")return[$.stack,P.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var l=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");l&&l.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var d=i.DetermineComponentFrameRoot(),y=d[0],w=d[1];if(y&&w){var D=y.split(`
`),q=w.split(`
`);for(l=i=0;i<D.length&&!D[i].includes("DetermineComponentFrameRoot");)i++;for(;l<q.length&&!q[l].includes("DetermineComponentFrameRoot");)l++;if(i===D.length||l===q.length)for(i=D.length-1,l=q.length-1;1<=i&&0<=l&&D[i]!==q[l];)l--;for(;1<=i&&0<=l;i--,l--)if(D[i]!==q[l]){if(i!==1||l!==1)do if(i--,l--,0>l||D[i]!==q[l]){var Z=`
`+D[i].replace(" at new "," at ");return e.displayName&&Z.includes("<anonymous>")&&(Z=Z.replace("<anonymous>",e.displayName)),Z}while(1<=i&&0<=l);break}}}finally{Qe=!1,Error.prepareStackTrace=r}return(r=e?e.displayName||e.name:"")?Oe(r):""}function yt(e,t){switch(e.tag){case 26:case 27:case 5:return Oe(e.type);case 16:return Oe("Lazy");case 13:return e.child!==t&&t!==null?Oe("Suspense Fallback"):Oe("Suspense");case 19:return Oe("SuspenseList");case 0:case 15:return $e(e.type,!1);case 11:return $e(e.type.render,!1);case 1:return $e(e.type,!0);case 31:return Oe("Activity");default:return""}}function Qf(e){try{var t="",r=null;do t+=yt(e,r),r=e,e=e.return;while(e);return t}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var xl=Object.prototype.hasOwnProperty,Sl=n.unstable_scheduleCallback,wl=n.unstable_cancelCallback,Z0=n.unstable_shouldYield,Q0=n.unstable_requestPaint,Nt=n.unstable_now,J0=n.unstable_getCurrentPriorityLevel,Jf=n.unstable_ImmediatePriority,Wf=n.unstable_UserBlockingPriority,fs=n.unstable_NormalPriority,W0=n.unstable_LowPriority,If=n.unstable_IdlePriority,I0=n.log,e1=n.unstable_setDisableYieldValue,Za=null,Mt=null;function qn(e){if(typeof I0=="function"&&e1(e),Mt&&typeof Mt.setStrictMode=="function")try{Mt.setStrictMode(Za,e)}catch{}}var kt=Math.clz32?Math.clz32:r1,t1=Math.log,n1=Math.LN2;function r1(e){return e>>>=0,e===0?32:31-(t1(e)/n1|0)|0}var hs=256,ms=262144,ps=4194304;function xr(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function gs(e,t,r){var i=e.pendingLanes;if(i===0)return 0;var l=0,d=e.suspendedLanes,y=e.pingedLanes;e=e.warmLanes;var w=i&134217727;return w!==0?(i=w&~d,i!==0?l=xr(i):(y&=w,y!==0?l=xr(y):r||(r=w&~e,r!==0&&(l=xr(r))))):(w=i&~d,w!==0?l=xr(w):y!==0?l=xr(y):r||(r=i&~e,r!==0&&(l=xr(r)))),l===0?0:t!==0&&t!==l&&(t&d)===0&&(d=l&-l,r=t&-t,d>=r||d===32&&(r&4194048)!==0)?t:l}function Qa(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function a1(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function eh(){var e=ps;return ps<<=1,(ps&62914560)===0&&(ps=4194304),e}function jl(e){for(var t=[],r=0;31>r;r++)t.push(e);return t}function Ja(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function i1(e,t,r,i,l,d){var y=e.pendingLanes;e.pendingLanes=r,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=r,e.entangledLanes&=r,e.errorRecoveryDisabledLanes&=r,e.shellSuspendCounter=0;var w=e.entanglements,D=e.expirationTimes,q=e.hiddenUpdates;for(r=y&~r;0<r;){var Z=31-kt(r),I=1<<Z;w[Z]=0,D[Z]=-1;var P=q[Z];if(P!==null)for(q[Z]=null,Z=0;Z<P.length;Z++){var $=P[Z];$!==null&&($.lane&=-536870913)}r&=~I}i!==0&&th(e,i,0),d!==0&&l===0&&e.tag!==0&&(e.suspendedLanes|=d&~(y&~t))}function th(e,t,r){e.pendingLanes|=t,e.suspendedLanes&=~t;var i=31-kt(t);e.entangledLanes|=t,e.entanglements[i]=e.entanglements[i]|1073741824|r&261930}function nh(e,t){var r=e.entangledLanes|=t;for(e=e.entanglements;r;){var i=31-kt(r),l=1<<i;l&t|e[i]&t&&(e[i]|=t),r&=~l}}function rh(e,t){var r=t&-t;return r=(r&42)!==0?1:El(r),(r&(e.suspendedLanes|t))!==0?0:r}function El(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Tl(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function ah(){var e=se.p;return e!==0?e:(e=window.event,e===void 0?32:Gg(e.type))}function ih(e,t){var r=se.p;try{return se.p=e,t()}finally{se.p=r}}var Yn=Math.random().toString(36).slice(2),ct="__reactFiber$"+Yn,wt="__reactProps$"+Yn,$r="__reactContainer$"+Yn,Cl="__reactEvents$"+Yn,s1="__reactListeners$"+Yn,o1="__reactHandles$"+Yn,sh="__reactResources$"+Yn,Wa="__reactMarker$"+Yn;function Al(e){delete e[ct],delete e[wt],delete e[Cl],delete e[s1],delete e[o1]}function Fr(e){var t=e[ct];if(t)return t;for(var r=e.parentNode;r;){if(t=r[$r]||r[ct]){if(r=t.alternate,t.child!==null||r!==null&&r.child!==null)for(e=Ag(e);e!==null;){if(r=e[ct])return r;e=Ag(e)}return t}e=r,r=e.parentNode}return null}function Kr(e){if(e=e[ct]||e[$r]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Ia(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(o(33))}function Zr(e){var t=e[sh];return t||(t=e[sh]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function st(e){e[Wa]=!0}var oh=new Set,lh={};function Sr(e,t){Qr(e,t),Qr(e+"Capture",t)}function Qr(e,t){for(lh[e]=t,e=0;e<t.length;e++)oh.add(t[e])}var l1=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),ch={},uh={};function c1(e){return xl.call(uh,e)?!0:xl.call(ch,e)?!1:l1.test(e)?uh[e]=!0:(ch[e]=!0,!1)}function ys(e,t,r){if(c1(t))if(r===null)e.removeAttribute(t);else{switch(typeof r){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var i=t.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+r)}}function vs(e,t,r){if(r===null)e.removeAttribute(t);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+r)}}function xn(e,t,r,i){if(i===null)e.removeAttribute(r);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(r);return}e.setAttributeNS(t,r,""+i)}}function qt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function dh(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function u1(e,t,r){var i=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var l=i.get,d=i.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(y){r=""+y,d.call(this,y)}}),Object.defineProperty(e,t,{enumerable:i.enumerable}),{getValue:function(){return r},setValue:function(y){r=""+y},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Dl(e){if(!e._valueTracker){var t=dh(e)?"checked":"value";e._valueTracker=u1(e,t,""+e[t])}}function fh(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var r=t.getValue(),i="";return e&&(i=dh(e)?e.checked?"true":"false":e.value),e=i,e!==r?(t.setValue(e),!0):!1}function bs(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var d1=/[\n"\\]/g;function Yt(e){return e.replace(d1,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function Nl(e,t,r,i,l,d,y,w){e.name="",y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"?e.type=y:e.removeAttribute("type"),t!=null?y==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+qt(t)):e.value!==""+qt(t)&&(e.value=""+qt(t)):y!=="submit"&&y!=="reset"||e.removeAttribute("value"),t!=null?Ml(e,y,qt(t)):r!=null?Ml(e,y,qt(r)):i!=null&&e.removeAttribute("value"),l==null&&d!=null&&(e.defaultChecked=!!d),l!=null&&(e.checked=l&&typeof l!="function"&&typeof l!="symbol"),w!=null&&typeof w!="function"&&typeof w!="symbol"&&typeof w!="boolean"?e.name=""+qt(w):e.removeAttribute("name")}function hh(e,t,r,i,l,d,y,w){if(d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"&&(e.type=d),t!=null||r!=null){if(!(d!=="submit"&&d!=="reset"||t!=null)){Dl(e);return}r=r!=null?""+qt(r):"",t=t!=null?""+qt(t):r,w||t===e.value||(e.value=t),e.defaultValue=t}i=i??l,i=typeof i!="function"&&typeof i!="symbol"&&!!i,e.checked=w?e.checked:!!i,e.defaultChecked=!!i,y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"&&(e.name=y),Dl(e)}function Ml(e,t,r){t==="number"&&bs(e.ownerDocument)===e||e.defaultValue===""+r||(e.defaultValue=""+r)}function Jr(e,t,r,i){if(e=e.options,t){t={};for(var l=0;l<r.length;l++)t["$"+r[l]]=!0;for(r=0;r<e.length;r++)l=t.hasOwnProperty("$"+e[r].value),e[r].selected!==l&&(e[r].selected=l),l&&i&&(e[r].defaultSelected=!0)}else{for(r=""+qt(r),t=null,l=0;l<e.length;l++){if(e[l].value===r){e[l].selected=!0,i&&(e[l].defaultSelected=!0);return}t!==null||e[l].disabled||(t=e[l])}t!==null&&(t.selected=!0)}}function mh(e,t,r){if(t!=null&&(t=""+qt(t),t!==e.value&&(e.value=t),r==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=r!=null?""+qt(r):""}function ph(e,t,r,i){if(t==null){if(i!=null){if(r!=null)throw Error(o(92));if(ve(i)){if(1<i.length)throw Error(o(93));i=i[0]}r=i}r==null&&(r=""),t=r}r=qt(t),e.defaultValue=r,i=e.textContent,i===r&&i!==""&&i!==null&&(e.value=i),Dl(e)}function Wr(e,t){if(t){var r=e.firstChild;if(r&&r===e.lastChild&&r.nodeType===3){r.nodeValue=t;return}}e.textContent=t}var f1=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function gh(e,t,r){var i=t.indexOf("--")===0;r==null||typeof r=="boolean"||r===""?i?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":i?e.setProperty(t,r):typeof r!="number"||r===0||f1.has(t)?t==="float"?e.cssFloat=r:e[t]=(""+r).trim():e[t]=r+"px"}function yh(e,t,r){if(t!=null&&typeof t!="object")throw Error(o(62));if(e=e.style,r!=null){for(var i in r)!r.hasOwnProperty(i)||t!=null&&t.hasOwnProperty(i)||(i.indexOf("--")===0?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="");for(var l in t)i=t[l],t.hasOwnProperty(l)&&r[l]!==i&&gh(e,l,i)}else for(var d in t)t.hasOwnProperty(d)&&gh(e,d,t[d])}function kl(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var h1=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),m1=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function xs(e){return m1.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Sn(){}var Rl=null;function Ol(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ir=null,ea=null;function vh(e){var t=Kr(e);if(t&&(e=t.stateNode)){var r=e[wt]||null;e:switch(e=t.stateNode,t.type){case"input":if(Nl(e,r.value,r.defaultValue,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name),t=r.name,r.type==="radio"&&t!=null){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll('input[name="'+Yt(""+t)+'"][type="radio"]'),t=0;t<r.length;t++){var i=r[t];if(i!==e&&i.form===e.form){var l=i[wt]||null;if(!l)throw Error(o(90));Nl(i,l.value,l.defaultValue,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name)}}for(t=0;t<r.length;t++)i=r[t],i.form===e.form&&fh(i)}break e;case"textarea":mh(e,r.value,r.defaultValue);break e;case"select":t=r.value,t!=null&&Jr(e,!!r.multiple,t,!1)}}}var zl=!1;function bh(e,t,r){if(zl)return e(t,r);zl=!0;try{var i=e(t);return i}finally{if(zl=!1,(Ir!==null||ea!==null)&&(oo(),Ir&&(t=Ir,e=ea,ea=Ir=null,vh(t),e)))for(t=0;t<e.length;t++)vh(e[t])}}function ei(e,t){var r=e.stateNode;if(r===null)return null;var i=r[wt]||null;if(i===null)return null;r=i[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break e;default:e=!1}if(e)return null;if(r&&typeof r!="function")throw Error(o(231,t,typeof r));return r}var wn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),_l=!1;if(wn)try{var ti={};Object.defineProperty(ti,"passive",{get:function(){_l=!0}}),window.addEventListener("test",ti,ti),window.removeEventListener("test",ti,ti)}catch{_l=!1}var Gn=null,Vl=null,Ss=null;function xh(){if(Ss)return Ss;var e,t=Vl,r=t.length,i,l="value"in Gn?Gn.value:Gn.textContent,d=l.length;for(e=0;e<r&&t[e]===l[e];e++);var y=r-e;for(i=1;i<=y&&t[r-i]===l[d-i];i++);return Ss=l.slice(e,1<i?1-i:void 0)}function ws(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function js(){return!0}function Sh(){return!1}function jt(e){function t(r,i,l,d,y){this._reactName=r,this._targetInst=l,this.type=i,this.nativeEvent=d,this.target=y,this.currentTarget=null;for(var w in e)e.hasOwnProperty(w)&&(r=e[w],this[w]=r?r(d):d[w]);return this.isDefaultPrevented=(d.defaultPrevented!=null?d.defaultPrevented:d.returnValue===!1)?js:Sh,this.isPropagationStopped=Sh,this}return b(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=js)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=js)},persist:function(){},isPersistent:js}),t}var wr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Es=jt(wr),ni=b({},wr,{view:0,detail:0}),p1=jt(ni),Bl,Ll,ri,Ts=b({},ni,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Hl,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==ri&&(ri&&e.type==="mousemove"?(Bl=e.screenX-ri.screenX,Ll=e.screenY-ri.screenY):Ll=Bl=0,ri=e),Bl)},movementY:function(e){return"movementY"in e?e.movementY:Ll}}),wh=jt(Ts),g1=b({},Ts,{dataTransfer:0}),y1=jt(g1),v1=b({},ni,{relatedTarget:0}),Ul=jt(v1),b1=b({},wr,{animationName:0,elapsedTime:0,pseudoElement:0}),x1=jt(b1),S1=b({},wr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),w1=jt(S1),j1=b({},wr,{data:0}),jh=jt(j1),E1={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},T1={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},C1={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function A1(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=C1[e])?!!t[e]:!1}function Hl(){return A1}var D1=b({},ni,{key:function(e){if(e.key){var t=E1[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=ws(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?T1[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Hl,charCode:function(e){return e.type==="keypress"?ws(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ws(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),N1=jt(D1),M1=b({},Ts,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Eh=jt(M1),k1=b({},ni,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Hl}),R1=jt(k1),O1=b({},wr,{propertyName:0,elapsedTime:0,pseudoElement:0}),z1=jt(O1),_1=b({},Ts,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),V1=jt(_1),B1=b({},wr,{newState:0,oldState:0}),L1=jt(B1),U1=[9,13,27,32],ql=wn&&"CompositionEvent"in window,ai=null;wn&&"documentMode"in document&&(ai=document.documentMode);var H1=wn&&"TextEvent"in window&&!ai,Th=wn&&(!ql||ai&&8<ai&&11>=ai),Ch=" ",Ah=!1;function Dh(e,t){switch(e){case"keyup":return U1.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Nh(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var ta=!1;function q1(e,t){switch(e){case"compositionend":return Nh(t);case"keypress":return t.which!==32?null:(Ah=!0,Ch);case"textInput":return e=t.data,e===Ch&&Ah?null:e;default:return null}}function Y1(e,t){if(ta)return e==="compositionend"||!ql&&Dh(e,t)?(e=xh(),Ss=Vl=Gn=null,ta=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Th&&t.locale!=="ko"?null:t.data;default:return null}}var G1={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Mh(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!G1[e.type]:t==="textarea"}function kh(e,t,r,i){Ir?ea?ea.push(i):ea=[i]:Ir=i,t=po(t,"onChange"),0<t.length&&(r=new Es("onChange","change",null,r,i),e.push({event:r,listeners:t}))}var ii=null,si=null;function P1(e){hg(e,0)}function Cs(e){var t=Ia(e);if(fh(t))return e}function Rh(e,t){if(e==="change")return t}var Oh=!1;if(wn){var Yl;if(wn){var Gl="oninput"in document;if(!Gl){var zh=document.createElement("div");zh.setAttribute("oninput","return;"),Gl=typeof zh.oninput=="function"}Yl=Gl}else Yl=!1;Oh=Yl&&(!document.documentMode||9<document.documentMode)}function _h(){ii&&(ii.detachEvent("onpropertychange",Vh),si=ii=null)}function Vh(e){if(e.propertyName==="value"&&Cs(si)){var t=[];kh(t,si,e,Ol(e)),bh(P1,t)}}function X1(e,t,r){e==="focusin"?(_h(),ii=t,si=r,ii.attachEvent("onpropertychange",Vh)):e==="focusout"&&_h()}function $1(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Cs(si)}function F1(e,t){if(e==="click")return Cs(t)}function K1(e,t){if(e==="input"||e==="change")return Cs(t)}function Z1(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Rt=typeof Object.is=="function"?Object.is:Z1;function oi(e,t){if(Rt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var r=Object.keys(e),i=Object.keys(t);if(r.length!==i.length)return!1;for(i=0;i<r.length;i++){var l=r[i];if(!xl.call(t,l)||!Rt(e[l],t[l]))return!1}return!0}function Bh(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Lh(e,t){var r=Bh(e);e=0;for(var i;r;){if(r.nodeType===3){if(i=e+r.textContent.length,e<=t&&i>=t)return{node:r,offset:t-e};e=i}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=Bh(r)}}function Uh(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Uh(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Hh(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=bs(e.document);t instanceof e.HTMLIFrameElement;){try{var r=typeof t.contentWindow.location.href=="string"}catch{r=!1}if(r)e=t.contentWindow;else break;t=bs(e.document)}return t}function Pl(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var Q1=wn&&"documentMode"in document&&11>=document.documentMode,na=null,Xl=null,li=null,$l=!1;function qh(e,t,r){var i=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;$l||na==null||na!==bs(i)||(i=na,"selectionStart"in i&&Pl(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),li&&oi(li,i)||(li=i,i=po(Xl,"onSelect"),0<i.length&&(t=new Es("onSelect","select",null,t,r),e.push({event:t,listeners:i}),t.target=na)))}function jr(e,t){var r={};return r[e.toLowerCase()]=t.toLowerCase(),r["Webkit"+e]="webkit"+t,r["Moz"+e]="moz"+t,r}var ra={animationend:jr("Animation","AnimationEnd"),animationiteration:jr("Animation","AnimationIteration"),animationstart:jr("Animation","AnimationStart"),transitionrun:jr("Transition","TransitionRun"),transitionstart:jr("Transition","TransitionStart"),transitioncancel:jr("Transition","TransitionCancel"),transitionend:jr("Transition","TransitionEnd")},Fl={},Yh={};wn&&(Yh=document.createElement("div").style,"AnimationEvent"in window||(delete ra.animationend.animation,delete ra.animationiteration.animation,delete ra.animationstart.animation),"TransitionEvent"in window||delete ra.transitionend.transition);function Er(e){if(Fl[e])return Fl[e];if(!ra[e])return e;var t=ra[e],r;for(r in t)if(t.hasOwnProperty(r)&&r in Yh)return Fl[e]=t[r];return e}var Gh=Er("animationend"),Ph=Er("animationiteration"),Xh=Er("animationstart"),J1=Er("transitionrun"),W1=Er("transitionstart"),I1=Er("transitioncancel"),$h=Er("transitionend"),Fh=new Map,Kl="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Kl.push("scrollEnd");function tn(e,t){Fh.set(e,t),Sr(t,[e])}var As=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Gt=[],aa=0,Zl=0;function Ds(){for(var e=aa,t=Zl=aa=0;t<e;){var r=Gt[t];Gt[t++]=null;var i=Gt[t];Gt[t++]=null;var l=Gt[t];Gt[t++]=null;var d=Gt[t];if(Gt[t++]=null,i!==null&&l!==null){var y=i.pending;y===null?l.next=l:(l.next=y.next,y.next=l),i.pending=l}d!==0&&Kh(r,l,d)}}function Ns(e,t,r,i){Gt[aa++]=e,Gt[aa++]=t,Gt[aa++]=r,Gt[aa++]=i,Zl|=i,e.lanes|=i,e=e.alternate,e!==null&&(e.lanes|=i)}function Ql(e,t,r,i){return Ns(e,t,r,i),Ms(e)}function Tr(e,t){return Ns(e,null,null,t),Ms(e)}function Kh(e,t,r){e.lanes|=r;var i=e.alternate;i!==null&&(i.lanes|=r);for(var l=!1,d=e.return;d!==null;)d.childLanes|=r,i=d.alternate,i!==null&&(i.childLanes|=r),d.tag===22&&(e=d.stateNode,e===null||e._visibility&1||(l=!0)),e=d,d=d.return;return e.tag===3?(d=e.stateNode,l&&t!==null&&(l=31-kt(r),e=d.hiddenUpdates,i=e[l],i===null?e[l]=[t]:i.push(t),t.lane=r|536870912),d):null}function Ms(e){if(50<Mi)throw Mi=0,iu=null,Error(o(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var ia={};function eS(e,t,r,i){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ot(e,t,r,i){return new eS(e,t,r,i)}function Jl(e){return e=e.prototype,!(!e||!e.isReactComponent)}function jn(e,t){var r=e.alternate;return r===null?(r=Ot(e.tag,t,e.key,e.mode),r.elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=e.flags&65011712,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,t=e.dependencies,r.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r.refCleanup=e.refCleanup,r}function Zh(e,t){e.flags&=65011714;var r=e.alternate;return r===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=r.childLanes,e.lanes=r.lanes,e.child=r.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=r.memoizedProps,e.memoizedState=r.memoizedState,e.updateQueue=r.updateQueue,e.type=r.type,t=r.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function ks(e,t,r,i,l,d){var y=0;if(i=e,typeof e=="function")Jl(e)&&(y=1);else if(typeof e=="string")y=iw(e,r,ae.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case X:return e=Ot(31,r,t,l),e.elementType=X,e.lanes=d,e;case C:return Cr(r.children,l,d,t);case A:y=8,l|=24;break;case z:return e=Ot(12,r,t,l|2),e.elementType=z,e.lanes=d,e;case L:return e=Ot(13,r,t,l),e.elementType=L,e.lanes=d,e;case Y:return e=Ot(19,r,t,l),e.elementType=Y,e.lanes=d,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case V:y=10;break e;case k:y=9;break e;case _:y=11;break e;case N:y=14;break e;case M:y=16,i=null;break e}y=29,r=Error(o(130,e===null?"null":typeof e,"")),i=null}return t=Ot(y,r,t,l),t.elementType=e,t.type=i,t.lanes=d,t}function Cr(e,t,r,i){return e=Ot(7,e,i,t),e.lanes=r,e}function Wl(e,t,r){return e=Ot(6,e,null,t),e.lanes=r,e}function Qh(e){var t=Ot(18,null,null,0);return t.stateNode=e,t}function Il(e,t,r){return t=Ot(4,e.children!==null?e.children:[],e.key,t),t.lanes=r,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Jh=new WeakMap;function Pt(e,t){if(typeof e=="object"&&e!==null){var r=Jh.get(e);return r!==void 0?r:(t={value:e,source:t,stack:Qf(t)},Jh.set(e,t),t)}return{value:e,source:t,stack:Qf(t)}}var sa=[],oa=0,Rs=null,ci=0,Xt=[],$t=0,Pn=null,cn=1,un="";function En(e,t){sa[oa++]=ci,sa[oa++]=Rs,Rs=e,ci=t}function Wh(e,t,r){Xt[$t++]=cn,Xt[$t++]=un,Xt[$t++]=Pn,Pn=e;var i=cn;e=un;var l=32-kt(i)-1;i&=~(1<<l),r+=1;var d=32-kt(t)+l;if(30<d){var y=l-l%5;d=(i&(1<<y)-1).toString(32),i>>=y,l-=y,cn=1<<32-kt(t)+l|r<<l|i,un=d+e}else cn=1<<d|r<<l|i,un=e}function ec(e){e.return!==null&&(En(e,1),Wh(e,1,0))}function tc(e){for(;e===Rs;)Rs=sa[--oa],sa[oa]=null,ci=sa[--oa],sa[oa]=null;for(;e===Pn;)Pn=Xt[--$t],Xt[$t]=null,un=Xt[--$t],Xt[$t]=null,cn=Xt[--$t],Xt[$t]=null}function Ih(e,t){Xt[$t++]=cn,Xt[$t++]=un,Xt[$t++]=Pn,cn=t.id,un=t.overflow,Pn=e}var ut=null,Ge=null,Ne=!1,Xn=null,Ft=!1,nc=Error(o(519));function $n(e){var t=Error(o(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw ui(Pt(t,e)),nc}function em(e){var t=e.stateNode,r=e.type,i=e.memoizedProps;switch(t[ct]=e,t[wt]=i,r){case"dialog":Te("cancel",t),Te("close",t);break;case"iframe":case"object":case"embed":Te("load",t);break;case"video":case"audio":for(r=0;r<Ri.length;r++)Te(Ri[r],t);break;case"source":Te("error",t);break;case"img":case"image":case"link":Te("error",t),Te("load",t);break;case"details":Te("toggle",t);break;case"input":Te("invalid",t),hh(t,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":Te("invalid",t);break;case"textarea":Te("invalid",t),ph(t,i.value,i.defaultValue,i.children)}r=i.children,typeof r!="string"&&typeof r!="number"&&typeof r!="bigint"||t.textContent===""+r||i.suppressHydrationWarning===!0||yg(t.textContent,r)?(i.popover!=null&&(Te("beforetoggle",t),Te("toggle",t)),i.onScroll!=null&&Te("scroll",t),i.onScrollEnd!=null&&Te("scrollend",t),i.onClick!=null&&(t.onclick=Sn),t=!0):t=!1,t||$n(e,!0)}function tm(e){for(ut=e.return;ut;)switch(ut.tag){case 5:case 31:case 13:Ft=!1;return;case 27:case 3:Ft=!0;return;default:ut=ut.return}}function la(e){if(e!==ut)return!1;if(!Ne)return tm(e),Ne=!0,!1;var t=e.tag,r;if((r=t!==3&&t!==27)&&((r=t===5)&&(r=e.type,r=!(r!=="form"&&r!=="button")||xu(e.type,e.memoizedProps)),r=!r),r&&Ge&&$n(e),tm(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(o(317));Ge=Cg(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(o(317));Ge=Cg(e)}else t===27?(t=Ge,sr(e.type)?(e=Tu,Tu=null,Ge=e):Ge=t):Ge=ut?Zt(e.stateNode.nextSibling):null;return!0}function Ar(){Ge=ut=null,Ne=!1}function rc(){var e=Xn;return e!==null&&(At===null?At=e:At.push.apply(At,e),Xn=null),e}function ui(e){Xn===null?Xn=[e]:Xn.push(e)}var ac=T(null),Dr=null,Tn=null;function Fn(e,t,r){W(ac,t._currentValue),t._currentValue=r}function Cn(e){e._currentValue=ac.current,R(ac)}function ic(e,t,r){for(;e!==null;){var i=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,i!==null&&(i.childLanes|=t)):i!==null&&(i.childLanes&t)!==t&&(i.childLanes|=t),e===r)break;e=e.return}}function sc(e,t,r,i){var l=e.child;for(l!==null&&(l.return=e);l!==null;){var d=l.dependencies;if(d!==null){var y=l.child;d=d.firstContext;e:for(;d!==null;){var w=d;d=l;for(var D=0;D<t.length;D++)if(w.context===t[D]){d.lanes|=r,w=d.alternate,w!==null&&(w.lanes|=r),ic(d.return,r,e),i||(y=null);break e}d=w.next}}else if(l.tag===18){if(y=l.return,y===null)throw Error(o(341));y.lanes|=r,d=y.alternate,d!==null&&(d.lanes|=r),ic(y,r,e),y=null}else y=l.child;if(y!==null)y.return=l;else for(y=l;y!==null;){if(y===e){y=null;break}if(l=y.sibling,l!==null){l.return=y.return,y=l;break}y=y.return}l=y}}function ca(e,t,r,i){e=null;for(var l=t,d=!1;l!==null;){if(!d){if((l.flags&524288)!==0)d=!0;else if((l.flags&262144)!==0)break}if(l.tag===10){var y=l.alternate;if(y===null)throw Error(o(387));if(y=y.memoizedProps,y!==null){var w=l.type;Rt(l.pendingProps.value,y.value)||(e!==null?e.push(w):e=[w])}}else if(l===ye.current){if(y=l.alternate,y===null)throw Error(o(387));y.memoizedState.memoizedState!==l.memoizedState.memoizedState&&(e!==null?e.push(Bi):e=[Bi])}l=l.return}e!==null&&sc(t,e,r,i),t.flags|=262144}function Os(e){for(e=e.firstContext;e!==null;){if(!Rt(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Nr(e){Dr=e,Tn=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function dt(e){return nm(Dr,e)}function zs(e,t){return Dr===null&&Nr(e),nm(e,t)}function nm(e,t){var r=t._currentValue;if(t={context:t,memoizedValue:r,next:null},Tn===null){if(e===null)throw Error(o(308));Tn=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Tn=Tn.next=t;return r}var tS=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(r,i){e.push(i)}};this.abort=function(){t.aborted=!0,e.forEach(function(r){return r()})}},nS=n.unstable_scheduleCallback,rS=n.unstable_NormalPriority,Ie={$$typeof:V,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function oc(){return{controller:new tS,data:new Map,refCount:0}}function di(e){e.refCount--,e.refCount===0&&nS(rS,function(){e.controller.abort()})}var fi=null,lc=0,ua=0,da=null;function aS(e,t){if(fi===null){var r=fi=[];lc=0,ua=du(),da={status:"pending",value:void 0,then:function(i){r.push(i)}}}return lc++,t.then(rm,rm),t}function rm(){if(--lc===0&&fi!==null){da!==null&&(da.status="fulfilled");var e=fi;fi=null,ua=0,da=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function iS(e,t){var r=[],i={status:"pending",value:null,reason:null,then:function(l){r.push(l)}};return e.then(function(){i.status="fulfilled",i.value=t;for(var l=0;l<r.length;l++)(0,r[l])(t)},function(l){for(i.status="rejected",i.reason=l,l=0;l<r.length;l++)(0,r[l])(void 0)}),i}var am=U.S;U.S=function(e,t){qp=Nt(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&aS(e,t),am!==null&&am(e,t)};var Mr=T(null);function cc(){var e=Mr.current;return e!==null?e:Ue.pooledCache}function _s(e,t){t===null?W(Mr,Mr.current):W(Mr,t.pool)}function im(){var e=cc();return e===null?null:{parent:Ie._currentValue,pool:e}}var fa=Error(o(460)),uc=Error(o(474)),Vs=Error(o(542)),Bs={then:function(){}};function sm(e){return e=e.status,e==="fulfilled"||e==="rejected"}function om(e,t,r){switch(r=e[r],r===void 0?e.push(t):r!==t&&(t.then(Sn,Sn),t=r),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,cm(e),e;default:if(typeof t.status=="string")t.then(Sn,Sn);else{if(e=Ue,e!==null&&100<e.shellSuspendCounter)throw Error(o(482));e=t,e.status="pending",e.then(function(i){if(t.status==="pending"){var l=t;l.status="fulfilled",l.value=i}},function(i){if(t.status==="pending"){var l=t;l.status="rejected",l.reason=i}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,cm(e),e}throw Rr=t,fa}}function kr(e){try{var t=e._init;return t(e._payload)}catch(r){throw r!==null&&typeof r=="object"&&typeof r.then=="function"?(Rr=r,fa):r}}var Rr=null;function lm(){if(Rr===null)throw Error(o(459));var e=Rr;return Rr=null,e}function cm(e){if(e===fa||e===Vs)throw Error(o(483))}var ha=null,hi=0;function Ls(e){var t=hi;return hi+=1,ha===null&&(ha=[]),om(ha,e,t)}function mi(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function Us(e,t){throw t.$$typeof===x?Error(o(525)):(e=Object.prototype.toString.call(t),Error(o(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function um(e){function t(B,O){if(e){var H=B.deletions;H===null?(B.deletions=[O],B.flags|=16):H.push(O)}}function r(B,O){if(!e)return null;for(;O!==null;)t(B,O),O=O.sibling;return null}function i(B){for(var O=new Map;B!==null;)B.key!==null?O.set(B.key,B):O.set(B.index,B),B=B.sibling;return O}function l(B,O){return B=jn(B,O),B.index=0,B.sibling=null,B}function d(B,O,H){return B.index=H,e?(H=B.alternate,H!==null?(H=H.index,H<O?(B.flags|=67108866,O):H):(B.flags|=67108866,O)):(B.flags|=1048576,O)}function y(B){return e&&B.alternate===null&&(B.flags|=67108866),B}function w(B,O,H,J){return O===null||O.tag!==6?(O=Wl(H,B.mode,J),O.return=B,O):(O=l(O,H),O.return=B,O)}function D(B,O,H,J){var ge=H.type;return ge===C?Z(B,O,H.props.children,J,H.key):O!==null&&(O.elementType===ge||typeof ge=="object"&&ge!==null&&ge.$$typeof===M&&kr(ge)===O.type)?(O=l(O,H.props),mi(O,H),O.return=B,O):(O=ks(H.type,H.key,H.props,null,B.mode,J),mi(O,H),O.return=B,O)}function q(B,O,H,J){return O===null||O.tag!==4||O.stateNode.containerInfo!==H.containerInfo||O.stateNode.implementation!==H.implementation?(O=Il(H,B.mode,J),O.return=B,O):(O=l(O,H.children||[]),O.return=B,O)}function Z(B,O,H,J,ge){return O===null||O.tag!==7?(O=Cr(H,B.mode,J,ge),O.return=B,O):(O=l(O,H),O.return=B,O)}function I(B,O,H){if(typeof O=="string"&&O!==""||typeof O=="number"||typeof O=="bigint")return O=Wl(""+O,B.mode,H),O.return=B,O;if(typeof O=="object"&&O!==null){switch(O.$$typeof){case j:return H=ks(O.type,O.key,O.props,null,B.mode,H),mi(H,O),H.return=B,H;case E:return O=Il(O,B.mode,H),O.return=B,O;case M:return O=kr(O),I(B,O,H)}if(ve(O)||ie(O))return O=Cr(O,B.mode,H,null),O.return=B,O;if(typeof O.then=="function")return I(B,Ls(O),H);if(O.$$typeof===V)return I(B,zs(B,O),H);Us(B,O)}return null}function P(B,O,H,J){var ge=O!==null?O.key:null;if(typeof H=="string"&&H!==""||typeof H=="number"||typeof H=="bigint")return ge!==null?null:w(B,O,""+H,J);if(typeof H=="object"&&H!==null){switch(H.$$typeof){case j:return H.key===ge?D(B,O,H,J):null;case E:return H.key===ge?q(B,O,H,J):null;case M:return H=kr(H),P(B,O,H,J)}if(ve(H)||ie(H))return ge!==null?null:Z(B,O,H,J,null);if(typeof H.then=="function")return P(B,O,Ls(H),J);if(H.$$typeof===V)return P(B,O,zs(B,H),J);Us(B,H)}return null}function $(B,O,H,J,ge){if(typeof J=="string"&&J!==""||typeof J=="number"||typeof J=="bigint")return B=B.get(H)||null,w(O,B,""+J,ge);if(typeof J=="object"&&J!==null){switch(J.$$typeof){case j:return B=B.get(J.key===null?H:J.key)||null,D(O,B,J,ge);case E:return B=B.get(J.key===null?H:J.key)||null,q(O,B,J,ge);case M:return J=kr(J),$(B,O,H,J,ge)}if(ve(J)||ie(J))return B=B.get(H)||null,Z(O,B,J,ge,null);if(typeof J.then=="function")return $(B,O,H,Ls(J),ge);if(J.$$typeof===V)return $(B,O,H,zs(O,J),ge);Us(O,J)}return null}function ce(B,O,H,J){for(var ge=null,Me=null,me=O,je=O=0,De=null;me!==null&&je<H.length;je++){me.index>je?(De=me,me=null):De=me.sibling;var ke=P(B,me,H[je],J);if(ke===null){me===null&&(me=De);break}e&&me&&ke.alternate===null&&t(B,me),O=d(ke,O,je),Me===null?ge=ke:Me.sibling=ke,Me=ke,me=De}if(je===H.length)return r(B,me),Ne&&En(B,je),ge;if(me===null){for(;je<H.length;je++)me=I(B,H[je],J),me!==null&&(O=d(me,O,je),Me===null?ge=me:Me.sibling=me,Me=me);return Ne&&En(B,je),ge}for(me=i(me);je<H.length;je++)De=$(me,B,je,H[je],J),De!==null&&(e&&De.alternate!==null&&me.delete(De.key===null?je:De.key),O=d(De,O,je),Me===null?ge=De:Me.sibling=De,Me=De);return e&&me.forEach(function(dr){return t(B,dr)}),Ne&&En(B,je),ge}function be(B,O,H,J){if(H==null)throw Error(o(151));for(var ge=null,Me=null,me=O,je=O=0,De=null,ke=H.next();me!==null&&!ke.done;je++,ke=H.next()){me.index>je?(De=me,me=null):De=me.sibling;var dr=P(B,me,ke.value,J);if(dr===null){me===null&&(me=De);break}e&&me&&dr.alternate===null&&t(B,me),O=d(dr,O,je),Me===null?ge=dr:Me.sibling=dr,Me=dr,me=De}if(ke.done)return r(B,me),Ne&&En(B,je),ge;if(me===null){for(;!ke.done;je++,ke=H.next())ke=I(B,ke.value,J),ke!==null&&(O=d(ke,O,je),Me===null?ge=ke:Me.sibling=ke,Me=ke);return Ne&&En(B,je),ge}for(me=i(me);!ke.done;je++,ke=H.next())ke=$(me,B,je,ke.value,J),ke!==null&&(e&&ke.alternate!==null&&me.delete(ke.key===null?je:ke.key),O=d(ke,O,je),Me===null?ge=ke:Me.sibling=ke,Me=ke);return e&&me.forEach(function(gw){return t(B,gw)}),Ne&&En(B,je),ge}function Le(B,O,H,J){if(typeof H=="object"&&H!==null&&H.type===C&&H.key===null&&(H=H.props.children),typeof H=="object"&&H!==null){switch(H.$$typeof){case j:e:{for(var ge=H.key;O!==null;){if(O.key===ge){if(ge=H.type,ge===C){if(O.tag===7){r(B,O.sibling),J=l(O,H.props.children),J.return=B,B=J;break e}}else if(O.elementType===ge||typeof ge=="object"&&ge!==null&&ge.$$typeof===M&&kr(ge)===O.type){r(B,O.sibling),J=l(O,H.props),mi(J,H),J.return=B,B=J;break e}r(B,O);break}else t(B,O);O=O.sibling}H.type===C?(J=Cr(H.props.children,B.mode,J,H.key),J.return=B,B=J):(J=ks(H.type,H.key,H.props,null,B.mode,J),mi(J,H),J.return=B,B=J)}return y(B);case E:e:{for(ge=H.key;O!==null;){if(O.key===ge)if(O.tag===4&&O.stateNode.containerInfo===H.containerInfo&&O.stateNode.implementation===H.implementation){r(B,O.sibling),J=l(O,H.children||[]),J.return=B,B=J;break e}else{r(B,O);break}else t(B,O);O=O.sibling}J=Il(H,B.mode,J),J.return=B,B=J}return y(B);case M:return H=kr(H),Le(B,O,H,J)}if(ve(H))return ce(B,O,H,J);if(ie(H)){if(ge=ie(H),typeof ge!="function")throw Error(o(150));return H=ge.call(H),be(B,O,H,J)}if(typeof H.then=="function")return Le(B,O,Ls(H),J);if(H.$$typeof===V)return Le(B,O,zs(B,H),J);Us(B,H)}return typeof H=="string"&&H!==""||typeof H=="number"||typeof H=="bigint"?(H=""+H,O!==null&&O.tag===6?(r(B,O.sibling),J=l(O,H),J.return=B,B=J):(r(B,O),J=Wl(H,B.mode,J),J.return=B,B=J),y(B)):r(B,O)}return function(B,O,H,J){try{hi=0;var ge=Le(B,O,H,J);return ha=null,ge}catch(me){if(me===fa||me===Vs)throw me;var Me=Ot(29,me,null,B.mode);return Me.lanes=J,Me.return=B,Me}finally{}}}var Or=um(!0),dm=um(!1),Kn=!1;function dc(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function fc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Zn(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Qn(e,t,r){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,(Re&2)!==0){var l=i.pending;return l===null?t.next=t:(t.next=l.next,l.next=t),i.pending=t,t=Ms(e),Kh(e,null,r),t}return Ns(e,i,t,r),Ms(e)}function pi(e,t,r){if(t=t.updateQueue,t!==null&&(t=t.shared,(r&4194048)!==0)){var i=t.lanes;i&=e.pendingLanes,r|=i,t.lanes=r,nh(e,r)}}function hc(e,t){var r=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,r===i)){var l=null,d=null;if(r=r.firstBaseUpdate,r!==null){do{var y={lane:r.lane,tag:r.tag,payload:r.payload,callback:null,next:null};d===null?l=d=y:d=d.next=y,r=r.next}while(r!==null);d===null?l=d=t:d=d.next=t}else l=d=t;r={baseState:i.baseState,firstBaseUpdate:l,lastBaseUpdate:d,shared:i.shared,callbacks:i.callbacks},e.updateQueue=r;return}e=r.lastBaseUpdate,e===null?r.firstBaseUpdate=t:e.next=t,r.lastBaseUpdate=t}var mc=!1;function gi(){if(mc){var e=da;if(e!==null)throw e}}function yi(e,t,r,i){mc=!1;var l=e.updateQueue;Kn=!1;var d=l.firstBaseUpdate,y=l.lastBaseUpdate,w=l.shared.pending;if(w!==null){l.shared.pending=null;var D=w,q=D.next;D.next=null,y===null?d=q:y.next=q,y=D;var Z=e.alternate;Z!==null&&(Z=Z.updateQueue,w=Z.lastBaseUpdate,w!==y&&(w===null?Z.firstBaseUpdate=q:w.next=q,Z.lastBaseUpdate=D))}if(d!==null){var I=l.baseState;y=0,Z=q=D=null,w=d;do{var P=w.lane&-536870913,$=P!==w.lane;if($?(Ae&P)===P:(i&P)===P){P!==0&&P===ua&&(mc=!0),Z!==null&&(Z=Z.next={lane:0,tag:w.tag,payload:w.payload,callback:null,next:null});e:{var ce=e,be=w;P=t;var Le=r;switch(be.tag){case 1:if(ce=be.payload,typeof ce=="function"){I=ce.call(Le,I,P);break e}I=ce;break e;case 3:ce.flags=ce.flags&-65537|128;case 0:if(ce=be.payload,P=typeof ce=="function"?ce.call(Le,I,P):ce,P==null)break e;I=b({},I,P);break e;case 2:Kn=!0}}P=w.callback,P!==null&&(e.flags|=64,$&&(e.flags|=8192),$=l.callbacks,$===null?l.callbacks=[P]:$.push(P))}else $={lane:P,tag:w.tag,payload:w.payload,callback:w.callback,next:null},Z===null?(q=Z=$,D=I):Z=Z.next=$,y|=P;if(w=w.next,w===null){if(w=l.shared.pending,w===null)break;$=w,w=$.next,$.next=null,l.lastBaseUpdate=$,l.shared.pending=null}}while(!0);Z===null&&(D=I),l.baseState=D,l.firstBaseUpdate=q,l.lastBaseUpdate=Z,d===null&&(l.shared.lanes=0),tr|=y,e.lanes=y,e.memoizedState=I}}function fm(e,t){if(typeof e!="function")throw Error(o(191,e));e.call(t)}function hm(e,t){var r=e.callbacks;if(r!==null)for(e.callbacks=null,e=0;e<r.length;e++)fm(r[e],t)}var ma=T(null),Hs=T(0);function mm(e,t){e=_n,W(Hs,e),W(ma,t),_n=e|t.baseLanes}function pc(){W(Hs,_n),W(ma,ma.current)}function gc(){_n=Hs.current,R(ma),R(Hs)}var zt=T(null),Kt=null;function Jn(e){var t=e.alternate;W(Je,Je.current&1),W(zt,e),Kt===null&&(t===null||ma.current!==null||t.memoizedState!==null)&&(Kt=e)}function yc(e){W(Je,Je.current),W(zt,e),Kt===null&&(Kt=e)}function pm(e){e.tag===22?(W(Je,Je.current),W(zt,e),Kt===null&&(Kt=e)):Wn()}function Wn(){W(Je,Je.current),W(zt,zt.current)}function _t(e){R(zt),Kt===e&&(Kt=null),R(Je)}var Je=T(0);function qs(e){for(var t=e;t!==null;){if(t.tag===13){var r=t.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||ju(r)||Eu(r)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var An=0,we=null,Ve=null,et=null,Ys=!1,pa=!1,zr=!1,Gs=0,vi=0,ga=null,sS=0;function Fe(){throw Error(o(321))}function vc(e,t){if(t===null)return!1;for(var r=0;r<t.length&&r<e.length;r++)if(!Rt(e[r],t[r]))return!1;return!0}function bc(e,t,r,i,l,d){return An=d,we=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,U.H=e===null||e.memoizedState===null?Wm:zc,zr=!1,d=r(i,l),zr=!1,pa&&(d=ym(t,r,i,l)),gm(e),d}function gm(e){U.H=Si;var t=Ve!==null&&Ve.next!==null;if(An=0,et=Ve=we=null,Ys=!1,vi=0,ga=null,t)throw Error(o(300));e===null||tt||(e=e.dependencies,e!==null&&Os(e)&&(tt=!0))}function ym(e,t,r,i){we=e;var l=0;do{if(pa&&(ga=null),vi=0,pa=!1,25<=l)throw Error(o(301));if(l+=1,et=Ve=null,e.updateQueue!=null){var d=e.updateQueue;d.lastEffect=null,d.events=null,d.stores=null,d.memoCache!=null&&(d.memoCache.index=0)}U.H=Im,d=t(r,i)}while(pa);return d}function oS(){var e=U.H,t=e.useState()[0];return t=typeof t.then=="function"?bi(t):t,e=e.useState()[0],(Ve!==null?Ve.memoizedState:null)!==e&&(we.flags|=1024),t}function xc(){var e=Gs!==0;return Gs=0,e}function Sc(e,t,r){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~r}function wc(e){if(Ys){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Ys=!1}An=0,et=Ve=we=null,pa=!1,vi=Gs=0,ga=null}function vt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return et===null?we.memoizedState=et=e:et=et.next=e,et}function We(){if(Ve===null){var e=we.alternate;e=e!==null?e.memoizedState:null}else e=Ve.next;var t=et===null?we.memoizedState:et.next;if(t!==null)et=t,Ve=e;else{if(e===null)throw we.alternate===null?Error(o(467)):Error(o(310));Ve=e,e={memoizedState:Ve.memoizedState,baseState:Ve.baseState,baseQueue:Ve.baseQueue,queue:Ve.queue,next:null},et===null?we.memoizedState=et=e:et=et.next=e}return et}function Ps(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function bi(e){var t=vi;return vi+=1,ga===null&&(ga=[]),e=om(ga,e,t),t=we,(et===null?t.memoizedState:et.next)===null&&(t=t.alternate,U.H=t===null||t.memoizedState===null?Wm:zc),e}function Xs(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return bi(e);if(e.$$typeof===V)return dt(e)}throw Error(o(438,String(e)))}function jc(e){var t=null,r=we.updateQueue;if(r!==null&&(t=r.memoCache),t==null){var i=we.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(t={data:i.data.map(function(l){return l.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),r===null&&(r=Ps(),we.updateQueue=r),r.memoCache=t,r=t.data[t.index],r===void 0)for(r=t.data[t.index]=Array(e),i=0;i<e;i++)r[i]=F;return t.index++,r}function Dn(e,t){return typeof t=="function"?t(e):t}function $s(e){var t=We();return Ec(t,Ve,e)}function Ec(e,t,r){var i=e.queue;if(i===null)throw Error(o(311));i.lastRenderedReducer=r;var l=e.baseQueue,d=i.pending;if(d!==null){if(l!==null){var y=l.next;l.next=d.next,d.next=y}t.baseQueue=l=d,i.pending=null}if(d=e.baseState,l===null)e.memoizedState=d;else{t=l.next;var w=y=null,D=null,q=t,Z=!1;do{var I=q.lane&-536870913;if(I!==q.lane?(Ae&I)===I:(An&I)===I){var P=q.revertLane;if(P===0)D!==null&&(D=D.next={lane:0,revertLane:0,gesture:null,action:q.action,hasEagerState:q.hasEagerState,eagerState:q.eagerState,next:null}),I===ua&&(Z=!0);else if((An&P)===P){q=q.next,P===ua&&(Z=!0);continue}else I={lane:0,revertLane:q.revertLane,gesture:null,action:q.action,hasEagerState:q.hasEagerState,eagerState:q.eagerState,next:null},D===null?(w=D=I,y=d):D=D.next=I,we.lanes|=P,tr|=P;I=q.action,zr&&r(d,I),d=q.hasEagerState?q.eagerState:r(d,I)}else P={lane:I,revertLane:q.revertLane,gesture:q.gesture,action:q.action,hasEagerState:q.hasEagerState,eagerState:q.eagerState,next:null},D===null?(w=D=P,y=d):D=D.next=P,we.lanes|=I,tr|=I;q=q.next}while(q!==null&&q!==t);if(D===null?y=d:D.next=w,!Rt(d,e.memoizedState)&&(tt=!0,Z&&(r=da,r!==null)))throw r;e.memoizedState=d,e.baseState=y,e.baseQueue=D,i.lastRenderedState=d}return l===null&&(i.lanes=0),[e.memoizedState,i.dispatch]}function Tc(e){var t=We(),r=t.queue;if(r===null)throw Error(o(311));r.lastRenderedReducer=e;var i=r.dispatch,l=r.pending,d=t.memoizedState;if(l!==null){r.pending=null;var y=l=l.next;do d=e(d,y.action),y=y.next;while(y!==l);Rt(d,t.memoizedState)||(tt=!0),t.memoizedState=d,t.baseQueue===null&&(t.baseState=d),r.lastRenderedState=d}return[d,i]}function vm(e,t,r){var i=we,l=We(),d=Ne;if(d){if(r===void 0)throw Error(o(407));r=r()}else r=t();var y=!Rt((Ve||l).memoizedState,r);if(y&&(l.memoizedState=r,tt=!0),l=l.queue,Dc(Sm.bind(null,i,l,e),[e]),l.getSnapshot!==t||y||et!==null&&et.memoizedState.tag&1){if(i.flags|=2048,ya(9,{destroy:void 0},xm.bind(null,i,l,r,t),null),Ue===null)throw Error(o(349));d||(An&127)!==0||bm(i,t,r)}return r}function bm(e,t,r){e.flags|=16384,e={getSnapshot:t,value:r},t=we.updateQueue,t===null?(t=Ps(),we.updateQueue=t,t.stores=[e]):(r=t.stores,r===null?t.stores=[e]:r.push(e))}function xm(e,t,r,i){t.value=r,t.getSnapshot=i,wm(t)&&jm(e)}function Sm(e,t,r){return r(function(){wm(t)&&jm(e)})}function wm(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!Rt(e,r)}catch{return!0}}function jm(e){var t=Tr(e,2);t!==null&&Dt(t,e,2)}function Cc(e){var t=vt();if(typeof e=="function"){var r=e;if(e=r(),zr){qn(!0);try{r()}finally{qn(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Dn,lastRenderedState:e},t}function Em(e,t,r,i){return e.baseState=r,Ec(e,Ve,typeof i=="function"?i:Dn)}function lS(e,t,r,i,l){if(Zs(e))throw Error(o(485));if(e=t.action,e!==null){var d={payload:l,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(y){d.listeners.push(y)}};U.T!==null?r(!0):d.isTransition=!1,i(d),r=t.pending,r===null?(d.next=t.pending=d,Tm(t,d)):(d.next=r.next,t.pending=r.next=d)}}function Tm(e,t){var r=t.action,i=t.payload,l=e.state;if(t.isTransition){var d=U.T,y={};U.T=y;try{var w=r(l,i),D=U.S;D!==null&&D(y,w),Cm(e,t,w)}catch(q){Ac(e,t,q)}finally{d!==null&&y.types!==null&&(d.types=y.types),U.T=d}}else try{d=r(l,i),Cm(e,t,d)}catch(q){Ac(e,t,q)}}function Cm(e,t,r){r!==null&&typeof r=="object"&&typeof r.then=="function"?r.then(function(i){Am(e,t,i)},function(i){return Ac(e,t,i)}):Am(e,t,r)}function Am(e,t,r){t.status="fulfilled",t.value=r,Dm(t),e.state=r,t=e.pending,t!==null&&(r=t.next,r===t?e.pending=null:(r=r.next,t.next=r,Tm(e,r)))}function Ac(e,t,r){var i=e.pending;if(e.pending=null,i!==null){i=i.next;do t.status="rejected",t.reason=r,Dm(t),t=t.next;while(t!==i)}e.action=null}function Dm(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Nm(e,t){return t}function Mm(e,t){if(Ne){var r=Ue.formState;if(r!==null){e:{var i=we;if(Ne){if(Ge){t:{for(var l=Ge,d=Ft;l.nodeType!==8;){if(!d){l=null;break t}if(l=Zt(l.nextSibling),l===null){l=null;break t}}d=l.data,l=d==="F!"||d==="F"?l:null}if(l){Ge=Zt(l.nextSibling),i=l.data==="F!";break e}}$n(i)}i=!1}i&&(t=r[0])}}return r=vt(),r.memoizedState=r.baseState=t,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Nm,lastRenderedState:t},r.queue=i,r=Zm.bind(null,we,i),i.dispatch=r,i=Cc(!1),d=Oc.bind(null,we,!1,i.queue),i=vt(),l={state:t,dispatch:null,action:e,pending:null},i.queue=l,r=lS.bind(null,we,l,d,r),l.dispatch=r,i.memoizedState=e,[t,r,!1]}function km(e){var t=We();return Rm(t,Ve,e)}function Rm(e,t,r){if(t=Ec(e,t,Nm)[0],e=$s(Dn)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var i=bi(t)}catch(y){throw y===fa?Vs:y}else i=t;t=We();var l=t.queue,d=l.dispatch;return r!==t.memoizedState&&(we.flags|=2048,ya(9,{destroy:void 0},cS.bind(null,l,r),null)),[i,d,e]}function cS(e,t){e.action=t}function Om(e){var t=We(),r=Ve;if(r!==null)return Rm(t,r,e);We(),t=t.memoizedState,r=We();var i=r.queue.dispatch;return r.memoizedState=e,[t,i,!1]}function ya(e,t,r,i){return e={tag:e,create:r,deps:i,inst:t,next:null},t=we.updateQueue,t===null&&(t=Ps(),we.updateQueue=t),r=t.lastEffect,r===null?t.lastEffect=e.next=e:(i=r.next,r.next=e,e.next=i,t.lastEffect=e),e}function zm(){return We().memoizedState}function Fs(e,t,r,i){var l=vt();we.flags|=e,l.memoizedState=ya(1|t,{destroy:void 0},r,i===void 0?null:i)}function Ks(e,t,r,i){var l=We();i=i===void 0?null:i;var d=l.memoizedState.inst;Ve!==null&&i!==null&&vc(i,Ve.memoizedState.deps)?l.memoizedState=ya(t,d,r,i):(we.flags|=e,l.memoizedState=ya(1|t,d,r,i))}function _m(e,t){Fs(8390656,8,e,t)}function Dc(e,t){Ks(2048,8,e,t)}function uS(e){we.flags|=4;var t=we.updateQueue;if(t===null)t=Ps(),we.updateQueue=t,t.events=[e];else{var r=t.events;r===null?t.events=[e]:r.push(e)}}function Vm(e){var t=We().memoizedState;return uS({ref:t,nextImpl:e}),function(){if((Re&2)!==0)throw Error(o(440));return t.impl.apply(void 0,arguments)}}function Bm(e,t){return Ks(4,2,e,t)}function Lm(e,t){return Ks(4,4,e,t)}function Um(e,t){if(typeof t=="function"){e=e();var r=t(e);return function(){typeof r=="function"?r():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Hm(e,t,r){r=r!=null?r.concat([e]):null,Ks(4,4,Um.bind(null,t,e),r)}function Nc(){}function qm(e,t){var r=We();t=t===void 0?null:t;var i=r.memoizedState;return t!==null&&vc(t,i[1])?i[0]:(r.memoizedState=[e,t],e)}function Ym(e,t){var r=We();t=t===void 0?null:t;var i=r.memoizedState;if(t!==null&&vc(t,i[1]))return i[0];if(i=e(),zr){qn(!0);try{e()}finally{qn(!1)}}return r.memoizedState=[i,t],i}function Mc(e,t,r){return r===void 0||(An&1073741824)!==0&&(Ae&261930)===0?e.memoizedState=t:(e.memoizedState=r,e=Gp(),we.lanes|=e,tr|=e,r)}function Gm(e,t,r,i){return Rt(r,t)?r:ma.current!==null?(e=Mc(e,r,i),Rt(e,t)||(tt=!0),e):(An&42)===0||(An&1073741824)!==0&&(Ae&261930)===0?(tt=!0,e.memoizedState=r):(e=Gp(),we.lanes|=e,tr|=e,t)}function Pm(e,t,r,i,l){var d=se.p;se.p=d!==0&&8>d?d:8;var y=U.T,w={};U.T=w,Oc(e,!1,t,r);try{var D=l(),q=U.S;if(q!==null&&q(w,D),D!==null&&typeof D=="object"&&typeof D.then=="function"){var Z=iS(D,i);xi(e,t,Z,Lt(e))}else xi(e,t,i,Lt(e))}catch(I){xi(e,t,{then:function(){},status:"rejected",reason:I},Lt())}finally{se.p=d,y!==null&&w.types!==null&&(y.types=w.types),U.T=y}}function dS(){}function kc(e,t,r,i){if(e.tag!==5)throw Error(o(476));var l=Xm(e).queue;Pm(e,l,t,K,r===null?dS:function(){return $m(e),r(i)})}function Xm(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:K,baseState:K,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Dn,lastRenderedState:K},next:null};var r={};return t.next={memoizedState:r,baseState:r,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Dn,lastRenderedState:r},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function $m(e){var t=Xm(e);t.next===null&&(t=e.alternate.memoizedState),xi(e,t.next.queue,{},Lt())}function Rc(){return dt(Bi)}function Fm(){return We().memoizedState}function Km(){return We().memoizedState}function fS(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var r=Lt();e=Zn(r);var i=Qn(t,e,r);i!==null&&(Dt(i,t,r),pi(i,t,r)),t={cache:oc()},e.payload=t;return}t=t.return}}function hS(e,t,r){var i=Lt();r={lane:i,revertLane:0,gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},Zs(e)?Qm(t,r):(r=Ql(e,t,r,i),r!==null&&(Dt(r,e,i),Jm(r,t,i)))}function Zm(e,t,r){var i=Lt();xi(e,t,r,i)}function xi(e,t,r,i){var l={lane:i,revertLane:0,gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null};if(Zs(e))Qm(t,l);else{var d=e.alternate;if(e.lanes===0&&(d===null||d.lanes===0)&&(d=t.lastRenderedReducer,d!==null))try{var y=t.lastRenderedState,w=d(y,r);if(l.hasEagerState=!0,l.eagerState=w,Rt(w,y))return Ns(e,t,l,0),Ue===null&&Ds(),!1}catch{}finally{}if(r=Ql(e,t,l,i),r!==null)return Dt(r,e,i),Jm(r,t,i),!0}return!1}function Oc(e,t,r,i){if(i={lane:2,revertLane:du(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},Zs(e)){if(t)throw Error(o(479))}else t=Ql(e,r,i,2),t!==null&&Dt(t,e,2)}function Zs(e){var t=e.alternate;return e===we||t!==null&&t===we}function Qm(e,t){pa=Ys=!0;var r=e.pending;r===null?t.next=t:(t.next=r.next,r.next=t),e.pending=t}function Jm(e,t,r){if((r&4194048)!==0){var i=t.lanes;i&=e.pendingLanes,r|=i,t.lanes=r,nh(e,r)}}var Si={readContext:dt,use:Xs,useCallback:Fe,useContext:Fe,useEffect:Fe,useImperativeHandle:Fe,useLayoutEffect:Fe,useInsertionEffect:Fe,useMemo:Fe,useReducer:Fe,useRef:Fe,useState:Fe,useDebugValue:Fe,useDeferredValue:Fe,useTransition:Fe,useSyncExternalStore:Fe,useId:Fe,useHostTransitionStatus:Fe,useFormState:Fe,useActionState:Fe,useOptimistic:Fe,useMemoCache:Fe,useCacheRefresh:Fe};Si.useEffectEvent=Fe;var Wm={readContext:dt,use:Xs,useCallback:function(e,t){return vt().memoizedState=[e,t===void 0?null:t],e},useContext:dt,useEffect:_m,useImperativeHandle:function(e,t,r){r=r!=null?r.concat([e]):null,Fs(4194308,4,Um.bind(null,t,e),r)},useLayoutEffect:function(e,t){return Fs(4194308,4,e,t)},useInsertionEffect:function(e,t){Fs(4,2,e,t)},useMemo:function(e,t){var r=vt();t=t===void 0?null:t;var i=e();if(zr){qn(!0);try{e()}finally{qn(!1)}}return r.memoizedState=[i,t],i},useReducer:function(e,t,r){var i=vt();if(r!==void 0){var l=r(t);if(zr){qn(!0);try{r(t)}finally{qn(!1)}}}else l=t;return i.memoizedState=i.baseState=l,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:l},i.queue=e,e=e.dispatch=hS.bind(null,we,e),[i.memoizedState,e]},useRef:function(e){var t=vt();return e={current:e},t.memoizedState=e},useState:function(e){e=Cc(e);var t=e.queue,r=Zm.bind(null,we,t);return t.dispatch=r,[e.memoizedState,r]},useDebugValue:Nc,useDeferredValue:function(e,t){var r=vt();return Mc(r,e,t)},useTransition:function(){var e=Cc(!1);return e=Pm.bind(null,we,e.queue,!0,!1),vt().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,r){var i=we,l=vt();if(Ne){if(r===void 0)throw Error(o(407));r=r()}else{if(r=t(),Ue===null)throw Error(o(349));(Ae&127)!==0||bm(i,t,r)}l.memoizedState=r;var d={value:r,getSnapshot:t};return l.queue=d,_m(Sm.bind(null,i,d,e),[e]),i.flags|=2048,ya(9,{destroy:void 0},xm.bind(null,i,d,r,t),null),r},useId:function(){var e=vt(),t=Ue.identifierPrefix;if(Ne){var r=un,i=cn;r=(i&~(1<<32-kt(i)-1)).toString(32)+r,t="_"+t+"R_"+r,r=Gs++,0<r&&(t+="H"+r.toString(32)),t+="_"}else r=sS++,t="_"+t+"r_"+r.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:Rc,useFormState:Mm,useActionState:Mm,useOptimistic:function(e){var t=vt();t.memoizedState=t.baseState=e;var r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=r,t=Oc.bind(null,we,!0,r),r.dispatch=t,[e,t]},useMemoCache:jc,useCacheRefresh:function(){return vt().memoizedState=fS.bind(null,we)},useEffectEvent:function(e){var t=vt(),r={impl:e};return t.memoizedState=r,function(){if((Re&2)!==0)throw Error(o(440));return r.impl.apply(void 0,arguments)}}},zc={readContext:dt,use:Xs,useCallback:qm,useContext:dt,useEffect:Dc,useImperativeHandle:Hm,useInsertionEffect:Bm,useLayoutEffect:Lm,useMemo:Ym,useReducer:$s,useRef:zm,useState:function(){return $s(Dn)},useDebugValue:Nc,useDeferredValue:function(e,t){var r=We();return Gm(r,Ve.memoizedState,e,t)},useTransition:function(){var e=$s(Dn)[0],t=We().memoizedState;return[typeof e=="boolean"?e:bi(e),t]},useSyncExternalStore:vm,useId:Fm,useHostTransitionStatus:Rc,useFormState:km,useActionState:km,useOptimistic:function(e,t){var r=We();return Em(r,Ve,e,t)},useMemoCache:jc,useCacheRefresh:Km};zc.useEffectEvent=Vm;var Im={readContext:dt,use:Xs,useCallback:qm,useContext:dt,useEffect:Dc,useImperativeHandle:Hm,useInsertionEffect:Bm,useLayoutEffect:Lm,useMemo:Ym,useReducer:Tc,useRef:zm,useState:function(){return Tc(Dn)},useDebugValue:Nc,useDeferredValue:function(e,t){var r=We();return Ve===null?Mc(r,e,t):Gm(r,Ve.memoizedState,e,t)},useTransition:function(){var e=Tc(Dn)[0],t=We().memoizedState;return[typeof e=="boolean"?e:bi(e),t]},useSyncExternalStore:vm,useId:Fm,useHostTransitionStatus:Rc,useFormState:Om,useActionState:Om,useOptimistic:function(e,t){var r=We();return Ve!==null?Em(r,Ve,e,t):(r.baseState=e,[e,r.queue.dispatch])},useMemoCache:jc,useCacheRefresh:Km};Im.useEffectEvent=Vm;function _c(e,t,r,i){t=e.memoizedState,r=r(i,t),r=r==null?t:b({},t,r),e.memoizedState=r,e.lanes===0&&(e.updateQueue.baseState=r)}var Vc={enqueueSetState:function(e,t,r){e=e._reactInternals;var i=Lt(),l=Zn(i);l.payload=t,r!=null&&(l.callback=r),t=Qn(e,l,i),t!==null&&(Dt(t,e,i),pi(t,e,i))},enqueueReplaceState:function(e,t,r){e=e._reactInternals;var i=Lt(),l=Zn(i);l.tag=1,l.payload=t,r!=null&&(l.callback=r),t=Qn(e,l,i),t!==null&&(Dt(t,e,i),pi(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var r=Lt(),i=Zn(r);i.tag=2,t!=null&&(i.callback=t),t=Qn(e,i,r),t!==null&&(Dt(t,e,r),pi(t,e,r))}};function ep(e,t,r,i,l,d,y){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,d,y):t.prototype&&t.prototype.isPureReactComponent?!oi(r,i)||!oi(l,d):!0}function tp(e,t,r,i){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(r,i),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(r,i),t.state!==e&&Vc.enqueueReplaceState(t,t.state,null)}function _r(e,t){var r=t;if("ref"in t){r={};for(var i in t)i!=="ref"&&(r[i]=t[i])}if(e=e.defaultProps){r===t&&(r=b({},r));for(var l in e)r[l]===void 0&&(r[l]=e[l])}return r}function np(e){As(e)}function rp(e){console.error(e)}function ap(e){As(e)}function Qs(e,t){try{var r=e.onUncaughtError;r(t.value,{componentStack:t.stack})}catch(i){setTimeout(function(){throw i})}}function ip(e,t,r){try{var i=e.onCaughtError;i(r.value,{componentStack:r.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(l){setTimeout(function(){throw l})}}function Bc(e,t,r){return r=Zn(r),r.tag=3,r.payload={element:null},r.callback=function(){Qs(e,t)},r}function sp(e){return e=Zn(e),e.tag=3,e}function op(e,t,r,i){var l=r.type.getDerivedStateFromError;if(typeof l=="function"){var d=i.value;e.payload=function(){return l(d)},e.callback=function(){ip(t,r,i)}}var y=r.stateNode;y!==null&&typeof y.componentDidCatch=="function"&&(e.callback=function(){ip(t,r,i),typeof l!="function"&&(nr===null?nr=new Set([this]):nr.add(this));var w=i.stack;this.componentDidCatch(i.value,{componentStack:w!==null?w:""})})}function mS(e,t,r,i,l){if(r.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(t=r.alternate,t!==null&&ca(t,r,l,!0),r=zt.current,r!==null){switch(r.tag){case 31:case 13:return Kt===null?lo():r.alternate===null&&Ke===0&&(Ke=3),r.flags&=-257,r.flags|=65536,r.lanes=l,i===Bs?r.flags|=16384:(t=r.updateQueue,t===null?r.updateQueue=new Set([i]):t.add(i),lu(e,i,l)),!1;case 22:return r.flags|=65536,i===Bs?r.flags|=16384:(t=r.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([i])},r.updateQueue=t):(r=t.retryQueue,r===null?t.retryQueue=new Set([i]):r.add(i)),lu(e,i,l)),!1}throw Error(o(435,r.tag))}return lu(e,i,l),lo(),!1}if(Ne)return t=zt.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=l,i!==nc&&(e=Error(o(422),{cause:i}),ui(Pt(e,r)))):(i!==nc&&(t=Error(o(423),{cause:i}),ui(Pt(t,r))),e=e.current.alternate,e.flags|=65536,l&=-l,e.lanes|=l,i=Pt(i,r),l=Bc(e.stateNode,i,l),hc(e,l),Ke!==4&&(Ke=2)),!1;var d=Error(o(520),{cause:i});if(d=Pt(d,r),Ni===null?Ni=[d]:Ni.push(d),Ke!==4&&(Ke=2),t===null)return!0;i=Pt(i,r),r=t;do{switch(r.tag){case 3:return r.flags|=65536,e=l&-l,r.lanes|=e,e=Bc(r.stateNode,i,e),hc(r,e),!1;case 1:if(t=r.type,d=r.stateNode,(r.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||d!==null&&typeof d.componentDidCatch=="function"&&(nr===null||!nr.has(d))))return r.flags|=65536,l&=-l,r.lanes|=l,l=sp(l),op(l,e,r,i),hc(r,l),!1}r=r.return}while(r!==null);return!1}var Lc=Error(o(461)),tt=!1;function ft(e,t,r,i){t.child=e===null?dm(t,null,r,i):Or(t,e.child,r,i)}function lp(e,t,r,i,l){r=r.render;var d=t.ref;if("ref"in i){var y={};for(var w in i)w!=="ref"&&(y[w]=i[w])}else y=i;return Nr(t),i=bc(e,t,r,y,d,l),w=xc(),e!==null&&!tt?(Sc(e,t,l),Nn(e,t,l)):(Ne&&w&&ec(t),t.flags|=1,ft(e,t,i,l),t.child)}function cp(e,t,r,i,l){if(e===null){var d=r.type;return typeof d=="function"&&!Jl(d)&&d.defaultProps===void 0&&r.compare===null?(t.tag=15,t.type=d,up(e,t,d,i,l)):(e=ks(r.type,null,i,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(d=e.child,!$c(e,l)){var y=d.memoizedProps;if(r=r.compare,r=r!==null?r:oi,r(y,i)&&e.ref===t.ref)return Nn(e,t,l)}return t.flags|=1,e=jn(d,i),e.ref=t.ref,e.return=t,t.child=e}function up(e,t,r,i,l){if(e!==null){var d=e.memoizedProps;if(oi(d,i)&&e.ref===t.ref)if(tt=!1,t.pendingProps=i=d,$c(e,l))(e.flags&131072)!==0&&(tt=!0);else return t.lanes=e.lanes,Nn(e,t,l)}return Uc(e,t,r,i,l)}function dp(e,t,r,i){var l=i.children,d=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if((t.flags&128)!==0){if(d=d!==null?d.baseLanes|r:r,e!==null){for(i=t.child=e.child,l=0;i!==null;)l=l|i.lanes|i.childLanes,i=i.sibling;i=l&~d}else i=0,t.child=null;return fp(e,t,d,r,i)}if((r&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&_s(t,d!==null?d.cachePool:null),d!==null?mm(t,d):pc(),pm(t);else return i=t.lanes=536870912,fp(e,t,d!==null?d.baseLanes|r:r,r,i)}else d!==null?(_s(t,d.cachePool),mm(t,d),Wn(),t.memoizedState=null):(e!==null&&_s(t,null),pc(),Wn());return ft(e,t,l,r),t.child}function wi(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function fp(e,t,r,i,l){var d=cc();return d=d===null?null:{parent:Ie._currentValue,pool:d},t.memoizedState={baseLanes:r,cachePool:d},e!==null&&_s(t,null),pc(),pm(t),e!==null&&ca(e,t,i,!0),t.childLanes=l,null}function Js(e,t){return t=Is({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function hp(e,t,r){return Or(t,e.child,null,r),e=Js(t,t.pendingProps),e.flags|=2,_t(t),t.memoizedState=null,e}function pS(e,t,r){var i=t.pendingProps,l=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(Ne){if(i.mode==="hidden")return e=Js(t,i),t.lanes=536870912,wi(null,e);if(yc(t),(e=Ge)?(e=Tg(e,Ft),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Pn!==null?{id:cn,overflow:un}:null,retryLane:536870912,hydrationErrors:null},r=Qh(e),r.return=t,t.child=r,ut=t,Ge=null)):e=null,e===null)throw $n(t);return t.lanes=536870912,null}return Js(t,i)}var d=e.memoizedState;if(d!==null){var y=d.dehydrated;if(yc(t),l)if(t.flags&256)t.flags&=-257,t=hp(e,t,r);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(o(558));else if(tt||ca(e,t,r,!1),l=(r&e.childLanes)!==0,tt||l){if(i=Ue,i!==null&&(y=rh(i,r),y!==0&&y!==d.retryLane))throw d.retryLane=y,Tr(e,y),Dt(i,e,y),Lc;lo(),t=hp(e,t,r)}else e=d.treeContext,Ge=Zt(y.nextSibling),ut=t,Ne=!0,Xn=null,Ft=!1,e!==null&&Ih(t,e),t=Js(t,i),t.flags|=4096;return t}return e=jn(e.child,{mode:i.mode,children:i.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Ws(e,t){var r=t.ref;if(r===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof r!="function"&&typeof r!="object")throw Error(o(284));(e===null||e.ref!==r)&&(t.flags|=4194816)}}function Uc(e,t,r,i,l){return Nr(t),r=bc(e,t,r,i,void 0,l),i=xc(),e!==null&&!tt?(Sc(e,t,l),Nn(e,t,l)):(Ne&&i&&ec(t),t.flags|=1,ft(e,t,r,l),t.child)}function mp(e,t,r,i,l,d){return Nr(t),t.updateQueue=null,r=ym(t,i,r,l),gm(e),i=xc(),e!==null&&!tt?(Sc(e,t,d),Nn(e,t,d)):(Ne&&i&&ec(t),t.flags|=1,ft(e,t,r,d),t.child)}function pp(e,t,r,i,l){if(Nr(t),t.stateNode===null){var d=ia,y=r.contextType;typeof y=="object"&&y!==null&&(d=dt(y)),d=new r(i,d),t.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,d.updater=Vc,t.stateNode=d,d._reactInternals=t,d=t.stateNode,d.props=i,d.state=t.memoizedState,d.refs={},dc(t),y=r.contextType,d.context=typeof y=="object"&&y!==null?dt(y):ia,d.state=t.memoizedState,y=r.getDerivedStateFromProps,typeof y=="function"&&(_c(t,r,y,i),d.state=t.memoizedState),typeof r.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(y=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),y!==d.state&&Vc.enqueueReplaceState(d,d.state,null),yi(t,i,d,l),gi(),d.state=t.memoizedState),typeof d.componentDidMount=="function"&&(t.flags|=4194308),i=!0}else if(e===null){d=t.stateNode;var w=t.memoizedProps,D=_r(r,w);d.props=D;var q=d.context,Z=r.contextType;y=ia,typeof Z=="object"&&Z!==null&&(y=dt(Z));var I=r.getDerivedStateFromProps;Z=typeof I=="function"||typeof d.getSnapshotBeforeUpdate=="function",w=t.pendingProps!==w,Z||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(w||q!==y)&&tp(t,d,i,y),Kn=!1;var P=t.memoizedState;d.state=P,yi(t,i,d,l),gi(),q=t.memoizedState,w||P!==q||Kn?(typeof I=="function"&&(_c(t,r,I,i),q=t.memoizedState),(D=Kn||ep(t,r,D,i,P,q,y))?(Z||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount()),typeof d.componentDidMount=="function"&&(t.flags|=4194308)):(typeof d.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=i,t.memoizedState=q),d.props=i,d.state=q,d.context=y,i=D):(typeof d.componentDidMount=="function"&&(t.flags|=4194308),i=!1)}else{d=t.stateNode,fc(e,t),y=t.memoizedProps,Z=_r(r,y),d.props=Z,I=t.pendingProps,P=d.context,q=r.contextType,D=ia,typeof q=="object"&&q!==null&&(D=dt(q)),w=r.getDerivedStateFromProps,(q=typeof w=="function"||typeof d.getSnapshotBeforeUpdate=="function")||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(y!==I||P!==D)&&tp(t,d,i,D),Kn=!1,P=t.memoizedState,d.state=P,yi(t,i,d,l),gi();var $=t.memoizedState;y!==I||P!==$||Kn||e!==null&&e.dependencies!==null&&Os(e.dependencies)?(typeof w=="function"&&(_c(t,r,w,i),$=t.memoizedState),(Z=Kn||ep(t,r,Z,i,P,$,D)||e!==null&&e.dependencies!==null&&Os(e.dependencies))?(q||typeof d.UNSAFE_componentWillUpdate!="function"&&typeof d.componentWillUpdate!="function"||(typeof d.componentWillUpdate=="function"&&d.componentWillUpdate(i,$,D),typeof d.UNSAFE_componentWillUpdate=="function"&&d.UNSAFE_componentWillUpdate(i,$,D)),typeof d.componentDidUpdate=="function"&&(t.flags|=4),typeof d.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof d.componentDidUpdate!="function"||y===e.memoizedProps&&P===e.memoizedState||(t.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&P===e.memoizedState||(t.flags|=1024),t.memoizedProps=i,t.memoizedState=$),d.props=i,d.state=$,d.context=D,i=Z):(typeof d.componentDidUpdate!="function"||y===e.memoizedProps&&P===e.memoizedState||(t.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&P===e.memoizedState||(t.flags|=1024),i=!1)}return d=i,Ws(e,t),i=(t.flags&128)!==0,d||i?(d=t.stateNode,r=i&&typeof r.getDerivedStateFromError!="function"?null:d.render(),t.flags|=1,e!==null&&i?(t.child=Or(t,e.child,null,l),t.child=Or(t,null,r,l)):ft(e,t,r,l),t.memoizedState=d.state,e=t.child):e=Nn(e,t,l),e}function gp(e,t,r,i){return Ar(),t.flags|=256,ft(e,t,r,i),t.child}var Hc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function qc(e){return{baseLanes:e,cachePool:im()}}function Yc(e,t,r){return e=e!==null?e.childLanes&~r:0,t&&(e|=Bt),e}function yp(e,t,r){var i=t.pendingProps,l=!1,d=(t.flags&128)!==0,y;if((y=d)||(y=e!==null&&e.memoizedState===null?!1:(Je.current&2)!==0),y&&(l=!0,t.flags&=-129),y=(t.flags&32)!==0,t.flags&=-33,e===null){if(Ne){if(l?Jn(t):Wn(),(e=Ge)?(e=Tg(e,Ft),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Pn!==null?{id:cn,overflow:un}:null,retryLane:536870912,hydrationErrors:null},r=Qh(e),r.return=t,t.child=r,ut=t,Ge=null)):e=null,e===null)throw $n(t);return Eu(e)?t.lanes=32:t.lanes=536870912,null}var w=i.children;return i=i.fallback,l?(Wn(),l=t.mode,w=Is({mode:"hidden",children:w},l),i=Cr(i,l,r,null),w.return=t,i.return=t,w.sibling=i,t.child=w,i=t.child,i.memoizedState=qc(r),i.childLanes=Yc(e,y,r),t.memoizedState=Hc,wi(null,i)):(Jn(t),Gc(t,w))}var D=e.memoizedState;if(D!==null&&(w=D.dehydrated,w!==null)){if(d)t.flags&256?(Jn(t),t.flags&=-257,t=Pc(e,t,r)):t.memoizedState!==null?(Wn(),t.child=e.child,t.flags|=128,t=null):(Wn(),w=i.fallback,l=t.mode,i=Is({mode:"visible",children:i.children},l),w=Cr(w,l,r,null),w.flags|=2,i.return=t,w.return=t,i.sibling=w,t.child=i,Or(t,e.child,null,r),i=t.child,i.memoizedState=qc(r),i.childLanes=Yc(e,y,r),t.memoizedState=Hc,t=wi(null,i));else if(Jn(t),Eu(w)){if(y=w.nextSibling&&w.nextSibling.dataset,y)var q=y.dgst;y=q,i=Error(o(419)),i.stack="",i.digest=y,ui({value:i,source:null,stack:null}),t=Pc(e,t,r)}else if(tt||ca(e,t,r,!1),y=(r&e.childLanes)!==0,tt||y){if(y=Ue,y!==null&&(i=rh(y,r),i!==0&&i!==D.retryLane))throw D.retryLane=i,Tr(e,i),Dt(y,e,i),Lc;ju(w)||lo(),t=Pc(e,t,r)}else ju(w)?(t.flags|=192,t.child=e.child,t=null):(e=D.treeContext,Ge=Zt(w.nextSibling),ut=t,Ne=!0,Xn=null,Ft=!1,e!==null&&Ih(t,e),t=Gc(t,i.children),t.flags|=4096);return t}return l?(Wn(),w=i.fallback,l=t.mode,D=e.child,q=D.sibling,i=jn(D,{mode:"hidden",children:i.children}),i.subtreeFlags=D.subtreeFlags&65011712,q!==null?w=jn(q,w):(w=Cr(w,l,r,null),w.flags|=2),w.return=t,i.return=t,i.sibling=w,t.child=i,wi(null,i),i=t.child,w=e.child.memoizedState,w===null?w=qc(r):(l=w.cachePool,l!==null?(D=Ie._currentValue,l=l.parent!==D?{parent:D,pool:D}:l):l=im(),w={baseLanes:w.baseLanes|r,cachePool:l}),i.memoizedState=w,i.childLanes=Yc(e,y,r),t.memoizedState=Hc,wi(e.child,i)):(Jn(t),r=e.child,e=r.sibling,r=jn(r,{mode:"visible",children:i.children}),r.return=t,r.sibling=null,e!==null&&(y=t.deletions,y===null?(t.deletions=[e],t.flags|=16):y.push(e)),t.child=r,t.memoizedState=null,r)}function Gc(e,t){return t=Is({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function Is(e,t){return e=Ot(22,e,null,t),e.lanes=0,e}function Pc(e,t,r){return Or(t,e.child,null,r),e=Gc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function vp(e,t,r){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t),ic(e.return,t,r)}function Xc(e,t,r,i,l,d){var y=e.memoizedState;y===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:i,tail:r,tailMode:l,treeForkCount:d}:(y.isBackwards=t,y.rendering=null,y.renderingStartTime=0,y.last=i,y.tail=r,y.tailMode=l,y.treeForkCount=d)}function bp(e,t,r){var i=t.pendingProps,l=i.revealOrder,d=i.tail;i=i.children;var y=Je.current,w=(y&2)!==0;if(w?(y=y&1|2,t.flags|=128):y&=1,W(Je,y),ft(e,t,i,r),i=Ne?ci:0,!w&&e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&vp(e,r,t);else if(e.tag===19)vp(e,r,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(l){case"forwards":for(r=t.child,l=null;r!==null;)e=r.alternate,e!==null&&qs(e)===null&&(l=r),r=r.sibling;r=l,r===null?(l=t.child,t.child=null):(l=r.sibling,r.sibling=null),Xc(t,!1,l,r,d,i);break;case"backwards":case"unstable_legacy-backwards":for(r=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&qs(e)===null){t.child=l;break}e=l.sibling,l.sibling=r,r=l,l=e}Xc(t,!0,r,null,d,i);break;case"together":Xc(t,!1,null,null,void 0,i);break;default:t.memoizedState=null}return t.child}function Nn(e,t,r){if(e!==null&&(t.dependencies=e.dependencies),tr|=t.lanes,(r&t.childLanes)===0)if(e!==null){if(ca(e,t,r,!1),(r&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(o(153));if(t.child!==null){for(e=t.child,r=jn(e,e.pendingProps),t.child=r,r.return=t;e.sibling!==null;)e=e.sibling,r=r.sibling=jn(e,e.pendingProps),r.return=t;r.sibling=null}return t.child}function $c(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&Os(e)))}function gS(e,t,r){switch(t.tag){case 3:re(t,t.stateNode.containerInfo),Fn(t,Ie,e.memoizedState.cache),Ar();break;case 27:case 5:ue(t);break;case 4:re(t,t.stateNode.containerInfo);break;case 10:Fn(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,yc(t),null;break;case 13:var i=t.memoizedState;if(i!==null)return i.dehydrated!==null?(Jn(t),t.flags|=128,null):(r&t.child.childLanes)!==0?yp(e,t,r):(Jn(t),e=Nn(e,t,r),e!==null?e.sibling:null);Jn(t);break;case 19:var l=(e.flags&128)!==0;if(i=(r&t.childLanes)!==0,i||(ca(e,t,r,!1),i=(r&t.childLanes)!==0),l){if(i)return bp(e,t,r);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),W(Je,Je.current),i)break;return null;case 22:return t.lanes=0,dp(e,t,r,t.pendingProps);case 24:Fn(t,Ie,e.memoizedState.cache)}return Nn(e,t,r)}function xp(e,t,r){if(e!==null)if(e.memoizedProps!==t.pendingProps)tt=!0;else{if(!$c(e,r)&&(t.flags&128)===0)return tt=!1,gS(e,t,r);tt=(e.flags&131072)!==0}else tt=!1,Ne&&(t.flags&1048576)!==0&&Wh(t,ci,t.index);switch(t.lanes=0,t.tag){case 16:e:{var i=t.pendingProps;if(e=kr(t.elementType),t.type=e,typeof e=="function")Jl(e)?(i=_r(e,i),t.tag=1,t=pp(null,t,e,i,r)):(t.tag=0,t=Uc(null,t,e,i,r));else{if(e!=null){var l=e.$$typeof;if(l===_){t.tag=11,t=lp(null,t,e,i,r);break e}else if(l===N){t.tag=14,t=cp(null,t,e,i,r);break e}}throw t=le(e)||e,Error(o(306,t,""))}}return t;case 0:return Uc(e,t,t.type,t.pendingProps,r);case 1:return i=t.type,l=_r(i,t.pendingProps),pp(e,t,i,l,r);case 3:e:{if(re(t,t.stateNode.containerInfo),e===null)throw Error(o(387));i=t.pendingProps;var d=t.memoizedState;l=d.element,fc(e,t),yi(t,i,null,r);var y=t.memoizedState;if(i=y.cache,Fn(t,Ie,i),i!==d.cache&&sc(t,[Ie],r,!0),gi(),i=y.element,d.isDehydrated)if(d={element:i,isDehydrated:!1,cache:y.cache},t.updateQueue.baseState=d,t.memoizedState=d,t.flags&256){t=gp(e,t,i,r);break e}else if(i!==l){l=Pt(Error(o(424)),t),ui(l),t=gp(e,t,i,r);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Ge=Zt(e.firstChild),ut=t,Ne=!0,Xn=null,Ft=!0,r=dm(t,null,i,r),t.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling}else{if(Ar(),i===l){t=Nn(e,t,r);break e}ft(e,t,i,r)}t=t.child}return t;case 26:return Ws(e,t),e===null?(r=kg(t.type,null,t.pendingProps,null))?t.memoizedState=r:Ne||(r=t.type,e=t.pendingProps,i=go(fe.current).createElement(r),i[ct]=t,i[wt]=e,ht(i,r,e),st(i),t.stateNode=i):t.memoizedState=kg(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return ue(t),e===null&&Ne&&(i=t.stateNode=Dg(t.type,t.pendingProps,fe.current),ut=t,Ft=!0,l=Ge,sr(t.type)?(Tu=l,Ge=Zt(i.firstChild)):Ge=l),ft(e,t,t.pendingProps.children,r),Ws(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&Ne&&((l=i=Ge)&&(i=$S(i,t.type,t.pendingProps,Ft),i!==null?(t.stateNode=i,ut=t,Ge=Zt(i.firstChild),Ft=!1,l=!0):l=!1),l||$n(t)),ue(t),l=t.type,d=t.pendingProps,y=e!==null?e.memoizedProps:null,i=d.children,xu(l,d)?i=null:y!==null&&xu(l,y)&&(t.flags|=32),t.memoizedState!==null&&(l=bc(e,t,oS,null,null,r),Bi._currentValue=l),Ws(e,t),ft(e,t,i,r),t.child;case 6:return e===null&&Ne&&((e=r=Ge)&&(r=FS(r,t.pendingProps,Ft),r!==null?(t.stateNode=r,ut=t,Ge=null,e=!0):e=!1),e||$n(t)),null;case 13:return yp(e,t,r);case 4:return re(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=Or(t,null,i,r):ft(e,t,i,r),t.child;case 11:return lp(e,t,t.type,t.pendingProps,r);case 7:return ft(e,t,t.pendingProps,r),t.child;case 8:return ft(e,t,t.pendingProps.children,r),t.child;case 12:return ft(e,t,t.pendingProps.children,r),t.child;case 10:return i=t.pendingProps,Fn(t,t.type,i.value),ft(e,t,i.children,r),t.child;case 9:return l=t.type._context,i=t.pendingProps.children,Nr(t),l=dt(l),i=i(l),t.flags|=1,ft(e,t,i,r),t.child;case 14:return cp(e,t,t.type,t.pendingProps,r);case 15:return up(e,t,t.type,t.pendingProps,r);case 19:return bp(e,t,r);case 31:return pS(e,t,r);case 22:return dp(e,t,r,t.pendingProps);case 24:return Nr(t),i=dt(Ie),e===null?(l=cc(),l===null&&(l=Ue,d=oc(),l.pooledCache=d,d.refCount++,d!==null&&(l.pooledCacheLanes|=r),l=d),t.memoizedState={parent:i,cache:l},dc(t),Fn(t,Ie,l)):((e.lanes&r)!==0&&(fc(e,t),yi(t,null,null,r),gi()),l=e.memoizedState,d=t.memoizedState,l.parent!==i?(l={parent:i,cache:i},t.memoizedState=l,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=l),Fn(t,Ie,i)):(i=d.cache,Fn(t,Ie,i),i!==l.cache&&sc(t,[Ie],r,!0))),ft(e,t,t.pendingProps.children,r),t.child;case 29:throw t.pendingProps}throw Error(o(156,t.tag))}function Mn(e){e.flags|=4}function Fc(e,t,r,i,l){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(l&335544128)===l)if(e.stateNode.complete)e.flags|=8192;else if(Fp())e.flags|=8192;else throw Rr=Bs,uc}else e.flags&=-16777217}function Sp(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Vg(t))if(Fp())e.flags|=8192;else throw Rr=Bs,uc}function eo(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?eh():536870912,e.lanes|=t,Sa|=t)}function ji(e,t){if(!Ne)switch(e.tailMode){case"hidden":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var i=null;r!==null;)r.alternate!==null&&(i=r),r=r.sibling;i===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null}}function Pe(e){var t=e.alternate!==null&&e.alternate.child===e.child,r=0,i=0;if(t)for(var l=e.child;l!==null;)r|=l.lanes|l.childLanes,i|=l.subtreeFlags&65011712,i|=l.flags&65011712,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)r|=l.lanes|l.childLanes,i|=l.subtreeFlags,i|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=i,e.childLanes=r,t}function yS(e,t,r){var i=t.pendingProps;switch(tc(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Pe(t),null;case 1:return Pe(t),null;case 3:return r=t.stateNode,i=null,e!==null&&(i=e.memoizedState.cache),t.memoizedState.cache!==i&&(t.flags|=2048),Cn(Ie),Q(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(la(t)?Mn(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,rc())),Pe(t),null;case 26:var l=t.type,d=t.memoizedState;return e===null?(Mn(t),d!==null?(Pe(t),Sp(t,d)):(Pe(t),Fc(t,l,null,i,r))):d?d!==e.memoizedState?(Mn(t),Pe(t),Sp(t,d)):(Pe(t),t.flags&=-16777217):(e=e.memoizedProps,e!==i&&Mn(t),Pe(t),Fc(t,l,e,i,r)),null;case 27:if(ee(t),r=fe.current,l=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&Mn(t);else{if(!i){if(t.stateNode===null)throw Error(o(166));return Pe(t),null}e=ae.current,la(t)?em(t):(e=Dg(l,i,r),t.stateNode=e,Mn(t))}return Pe(t),null;case 5:if(ee(t),l=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&Mn(t);else{if(!i){if(t.stateNode===null)throw Error(o(166));return Pe(t),null}if(d=ae.current,la(t))em(t);else{var y=go(fe.current);switch(d){case 1:d=y.createElementNS("http://www.w3.org/2000/svg",l);break;case 2:d=y.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;default:switch(l){case"svg":d=y.createElementNS("http://www.w3.org/2000/svg",l);break;case"math":d=y.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;case"script":d=y.createElement("div"),d.innerHTML="<script><\/script>",d=d.removeChild(d.firstChild);break;case"select":d=typeof i.is=="string"?y.createElement("select",{is:i.is}):y.createElement("select"),i.multiple?d.multiple=!0:i.size&&(d.size=i.size);break;default:d=typeof i.is=="string"?y.createElement(l,{is:i.is}):y.createElement(l)}}d[ct]=t,d[wt]=i;e:for(y=t.child;y!==null;){if(y.tag===5||y.tag===6)d.appendChild(y.stateNode);else if(y.tag!==4&&y.tag!==27&&y.child!==null){y.child.return=y,y=y.child;continue}if(y===t)break e;for(;y.sibling===null;){if(y.return===null||y.return===t)break e;y=y.return}y.sibling.return=y.return,y=y.sibling}t.stateNode=d;e:switch(ht(d,l,i),l){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}i&&Mn(t)}}return Pe(t),Fc(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,r),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==i&&Mn(t);else{if(typeof i!="string"&&t.stateNode===null)throw Error(o(166));if(e=fe.current,la(t)){if(e=t.stateNode,r=t.memoizedProps,i=null,l=ut,l!==null)switch(l.tag){case 27:case 5:i=l.memoizedProps}e[ct]=t,e=!!(e.nodeValue===r||i!==null&&i.suppressHydrationWarning===!0||yg(e.nodeValue,r)),e||$n(t,!0)}else e=go(e).createTextNode(i),e[ct]=t,t.stateNode=e}return Pe(t),null;case 31:if(r=t.memoizedState,e===null||e.memoizedState!==null){if(i=la(t),r!==null){if(e===null){if(!i)throw Error(o(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(o(557));e[ct]=t}else Ar(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Pe(t),e=!1}else r=rc(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=r),e=!0;if(!e)return t.flags&256?(_t(t),t):(_t(t),null);if((t.flags&128)!==0)throw Error(o(558))}return Pe(t),null;case 13:if(i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(l=la(t),i!==null&&i.dehydrated!==null){if(e===null){if(!l)throw Error(o(318));if(l=t.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(o(317));l[ct]=t}else Ar(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Pe(t),l=!1}else l=rc(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=l),l=!0;if(!l)return t.flags&256?(_t(t),t):(_t(t),null)}return _t(t),(t.flags&128)!==0?(t.lanes=r,t):(r=i!==null,e=e!==null&&e.memoizedState!==null,r&&(i=t.child,l=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(l=i.alternate.memoizedState.cachePool.pool),d=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(d=i.memoizedState.cachePool.pool),d!==l&&(i.flags|=2048)),r!==e&&r&&(t.child.flags|=8192),eo(t,t.updateQueue),Pe(t),null);case 4:return Q(),e===null&&pu(t.stateNode.containerInfo),Pe(t),null;case 10:return Cn(t.type),Pe(t),null;case 19:if(R(Je),i=t.memoizedState,i===null)return Pe(t),null;if(l=(t.flags&128)!==0,d=i.rendering,d===null)if(l)ji(i,!1);else{if(Ke!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(d=qs(e),d!==null){for(t.flags|=128,ji(i,!1),e=d.updateQueue,t.updateQueue=e,eo(t,e),t.subtreeFlags=0,e=r,r=t.child;r!==null;)Zh(r,e),r=r.sibling;return W(Je,Je.current&1|2),Ne&&En(t,i.treeForkCount),t.child}e=e.sibling}i.tail!==null&&Nt()>io&&(t.flags|=128,l=!0,ji(i,!1),t.lanes=4194304)}else{if(!l)if(e=qs(d),e!==null){if(t.flags|=128,l=!0,e=e.updateQueue,t.updateQueue=e,eo(t,e),ji(i,!0),i.tail===null&&i.tailMode==="hidden"&&!d.alternate&&!Ne)return Pe(t),null}else 2*Nt()-i.renderingStartTime>io&&r!==536870912&&(t.flags|=128,l=!0,ji(i,!1),t.lanes=4194304);i.isBackwards?(d.sibling=t.child,t.child=d):(e=i.last,e!==null?e.sibling=d:t.child=d,i.last=d)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=Nt(),e.sibling=null,r=Je.current,W(Je,l?r&1|2:r&1),Ne&&En(t,i.treeForkCount),e):(Pe(t),null);case 22:case 23:return _t(t),gc(),i=t.memoizedState!==null,e!==null?e.memoizedState!==null!==i&&(t.flags|=8192):i&&(t.flags|=8192),i?(r&536870912)!==0&&(t.flags&128)===0&&(Pe(t),t.subtreeFlags&6&&(t.flags|=8192)):Pe(t),r=t.updateQueue,r!==null&&eo(t,r.retryQueue),r=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(r=e.memoizedState.cachePool.pool),i=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(i=t.memoizedState.cachePool.pool),i!==r&&(t.flags|=2048),e!==null&&R(Mr),null;case 24:return r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),Cn(Ie),Pe(t),null;case 25:return null;case 30:return null}throw Error(o(156,t.tag))}function vS(e,t){switch(tc(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Cn(Ie),Q(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return ee(t),null;case 31:if(t.memoizedState!==null){if(_t(t),t.alternate===null)throw Error(o(340));Ar()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(_t(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(o(340));Ar()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return R(Je),null;case 4:return Q(),null;case 10:return Cn(t.type),null;case 22:case 23:return _t(t),gc(),e!==null&&R(Mr),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Cn(Ie),null;case 25:return null;default:return null}}function wp(e,t){switch(tc(t),t.tag){case 3:Cn(Ie),Q();break;case 26:case 27:case 5:ee(t);break;case 4:Q();break;case 31:t.memoizedState!==null&&_t(t);break;case 13:_t(t);break;case 19:R(Je);break;case 10:Cn(t.type);break;case 22:case 23:_t(t),gc(),e!==null&&R(Mr);break;case 24:Cn(Ie)}}function Ei(e,t){try{var r=t.updateQueue,i=r!==null?r.lastEffect:null;if(i!==null){var l=i.next;r=l;do{if((r.tag&e)===e){i=void 0;var d=r.create,y=r.inst;i=d(),y.destroy=i}r=r.next}while(r!==l)}}catch(w){_e(t,t.return,w)}}function In(e,t,r){try{var i=t.updateQueue,l=i!==null?i.lastEffect:null;if(l!==null){var d=l.next;i=d;do{if((i.tag&e)===e){var y=i.inst,w=y.destroy;if(w!==void 0){y.destroy=void 0,l=t;var D=r,q=w;try{q()}catch(Z){_e(l,D,Z)}}}i=i.next}while(i!==d)}}catch(Z){_e(t,t.return,Z)}}function jp(e){var t=e.updateQueue;if(t!==null){var r=e.stateNode;try{hm(t,r)}catch(i){_e(e,e.return,i)}}}function Ep(e,t,r){r.props=_r(e.type,e.memoizedProps),r.state=e.memoizedState;try{r.componentWillUnmount()}catch(i){_e(e,t,i)}}function Ti(e,t){try{var r=e.ref;if(r!==null){switch(e.tag){case 26:case 27:case 5:var i=e.stateNode;break;case 30:i=e.stateNode;break;default:i=e.stateNode}typeof r=="function"?e.refCleanup=r(i):r.current=i}}catch(l){_e(e,t,l)}}function dn(e,t){var r=e.ref,i=e.refCleanup;if(r!==null)if(typeof i=="function")try{i()}catch(l){_e(e,t,l)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof r=="function")try{r(null)}catch(l){_e(e,t,l)}else r.current=null}function Tp(e){var t=e.type,r=e.memoizedProps,i=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":r.autoFocus&&i.focus();break e;case"img":r.src?i.src=r.src:r.srcSet&&(i.srcset=r.srcSet)}}catch(l){_e(e,e.return,l)}}function Kc(e,t,r){try{var i=e.stateNode;HS(i,e.type,r,t),i[wt]=t}catch(l){_e(e,e.return,l)}}function Cp(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&sr(e.type)||e.tag===4}function Zc(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Cp(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&sr(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Qc(e,t,r){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?(r.nodeType===9?r.body:r.nodeName==="HTML"?r.ownerDocument.body:r).insertBefore(e,t):(t=r.nodeType===9?r.body:r.nodeName==="HTML"?r.ownerDocument.body:r,t.appendChild(e),r=r._reactRootContainer,r!=null||t.onclick!==null||(t.onclick=Sn));else if(i!==4&&(i===27&&sr(e.type)&&(r=e.stateNode,t=null),e=e.child,e!==null))for(Qc(e,t,r),e=e.sibling;e!==null;)Qc(e,t,r),e=e.sibling}function to(e,t,r){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?r.insertBefore(e,t):r.appendChild(e);else if(i!==4&&(i===27&&sr(e.type)&&(r=e.stateNode),e=e.child,e!==null))for(to(e,t,r),e=e.sibling;e!==null;)to(e,t,r),e=e.sibling}function Ap(e){var t=e.stateNode,r=e.memoizedProps;try{for(var i=e.type,l=t.attributes;l.length;)t.removeAttributeNode(l[0]);ht(t,i,r),t[ct]=e,t[wt]=r}catch(d){_e(e,e.return,d)}}var kn=!1,nt=!1,Jc=!1,Dp=typeof WeakSet=="function"?WeakSet:Set,ot=null;function bS(e,t){if(e=e.containerInfo,vu=jo,e=Hh(e),Pl(e)){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{r=(r=e.ownerDocument)&&r.defaultView||window;var i=r.getSelection&&r.getSelection();if(i&&i.rangeCount!==0){r=i.anchorNode;var l=i.anchorOffset,d=i.focusNode;i=i.focusOffset;try{r.nodeType,d.nodeType}catch{r=null;break e}var y=0,w=-1,D=-1,q=0,Z=0,I=e,P=null;t:for(;;){for(var $;I!==r||l!==0&&I.nodeType!==3||(w=y+l),I!==d||i!==0&&I.nodeType!==3||(D=y+i),I.nodeType===3&&(y+=I.nodeValue.length),($=I.firstChild)!==null;)P=I,I=$;for(;;){if(I===e)break t;if(P===r&&++q===l&&(w=y),P===d&&++Z===i&&(D=y),($=I.nextSibling)!==null)break;I=P,P=I.parentNode}I=$}r=w===-1||D===-1?null:{start:w,end:D}}else r=null}r=r||{start:0,end:0}}else r=null;for(bu={focusedElem:e,selectionRange:r},jo=!1,ot=t;ot!==null;)if(t=ot,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,ot=e;else for(;ot!==null;){switch(t=ot,d=t.alternate,e=t.flags,t.tag){case 0:if((e&4)!==0&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(r=0;r<e.length;r++)l=e[r],l.ref.impl=l.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&d!==null){e=void 0,r=t,l=d.memoizedProps,d=d.memoizedState,i=r.stateNode;try{var ce=_r(r.type,l);e=i.getSnapshotBeforeUpdate(ce,d),i.__reactInternalSnapshotBeforeUpdate=e}catch(be){_e(r,r.return,be)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,r=e.nodeType,r===9)wu(e);else if(r===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":wu(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(o(163))}if(e=t.sibling,e!==null){e.return=t.return,ot=e;break}ot=t.return}}function Np(e,t,r){var i=r.flags;switch(r.tag){case 0:case 11:case 15:On(e,r),i&4&&Ei(5,r);break;case 1:if(On(e,r),i&4)if(e=r.stateNode,t===null)try{e.componentDidMount()}catch(y){_e(r,r.return,y)}else{var l=_r(r.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(l,t,e.__reactInternalSnapshotBeforeUpdate)}catch(y){_e(r,r.return,y)}}i&64&&jp(r),i&512&&Ti(r,r.return);break;case 3:if(On(e,r),i&64&&(e=r.updateQueue,e!==null)){if(t=null,r.child!==null)switch(r.child.tag){case 27:case 5:t=r.child.stateNode;break;case 1:t=r.child.stateNode}try{hm(e,t)}catch(y){_e(r,r.return,y)}}break;case 27:t===null&&i&4&&Ap(r);case 26:case 5:On(e,r),t===null&&i&4&&Tp(r),i&512&&Ti(r,r.return);break;case 12:On(e,r);break;case 31:On(e,r),i&4&&Rp(e,r);break;case 13:On(e,r),i&4&&Op(e,r),i&64&&(e=r.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(r=DS.bind(null,r),KS(e,r))));break;case 22:if(i=r.memoizedState!==null||kn,!i){t=t!==null&&t.memoizedState!==null||nt,l=kn;var d=nt;kn=i,(nt=t)&&!d?zn(e,r,(r.subtreeFlags&8772)!==0):On(e,r),kn=l,nt=d}break;case 30:break;default:On(e,r)}}function Mp(e){var t=e.alternate;t!==null&&(e.alternate=null,Mp(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Al(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Xe=null,Et=!1;function Rn(e,t,r){for(r=r.child;r!==null;)kp(e,t,r),r=r.sibling}function kp(e,t,r){if(Mt&&typeof Mt.onCommitFiberUnmount=="function")try{Mt.onCommitFiberUnmount(Za,r)}catch{}switch(r.tag){case 26:nt||dn(r,t),Rn(e,t,r),r.memoizedState?r.memoizedState.count--:r.stateNode&&(r=r.stateNode,r.parentNode.removeChild(r));break;case 27:nt||dn(r,t);var i=Xe,l=Et;sr(r.type)&&(Xe=r.stateNode,Et=!1),Rn(e,t,r),zi(r.stateNode),Xe=i,Et=l;break;case 5:nt||dn(r,t);case 6:if(i=Xe,l=Et,Xe=null,Rn(e,t,r),Xe=i,Et=l,Xe!==null)if(Et)try{(Xe.nodeType===9?Xe.body:Xe.nodeName==="HTML"?Xe.ownerDocument.body:Xe).removeChild(r.stateNode)}catch(d){_e(r,t,d)}else try{Xe.removeChild(r.stateNode)}catch(d){_e(r,t,d)}break;case 18:Xe!==null&&(Et?(e=Xe,jg(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,r.stateNode),Na(e)):jg(Xe,r.stateNode));break;case 4:i=Xe,l=Et,Xe=r.stateNode.containerInfo,Et=!0,Rn(e,t,r),Xe=i,Et=l;break;case 0:case 11:case 14:case 15:In(2,r,t),nt||In(4,r,t),Rn(e,t,r);break;case 1:nt||(dn(r,t),i=r.stateNode,typeof i.componentWillUnmount=="function"&&Ep(r,t,i)),Rn(e,t,r);break;case 21:Rn(e,t,r);break;case 22:nt=(i=nt)||r.memoizedState!==null,Rn(e,t,r),nt=i;break;default:Rn(e,t,r)}}function Rp(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Na(e)}catch(r){_e(t,t.return,r)}}}function Op(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Na(e)}catch(r){_e(t,t.return,r)}}function xS(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new Dp),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new Dp),t;default:throw Error(o(435,e.tag))}}function no(e,t){var r=xS(e);t.forEach(function(i){if(!r.has(i)){r.add(i);var l=NS.bind(null,e,i);i.then(l,l)}})}function Tt(e,t){var r=t.deletions;if(r!==null)for(var i=0;i<r.length;i++){var l=r[i],d=e,y=t,w=y;e:for(;w!==null;){switch(w.tag){case 27:if(sr(w.type)){Xe=w.stateNode,Et=!1;break e}break;case 5:Xe=w.stateNode,Et=!1;break e;case 3:case 4:Xe=w.stateNode.containerInfo,Et=!0;break e}w=w.return}if(Xe===null)throw Error(o(160));kp(d,y,l),Xe=null,Et=!1,d=l.alternate,d!==null&&(d.return=null),l.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)zp(t,e),t=t.sibling}var nn=null;function zp(e,t){var r=e.alternate,i=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Tt(t,e),Ct(e),i&4&&(In(3,e,e.return),Ei(3,e),In(5,e,e.return));break;case 1:Tt(t,e),Ct(e),i&512&&(nt||r===null||dn(r,r.return)),i&64&&kn&&(e=e.updateQueue,e!==null&&(i=e.callbacks,i!==null&&(r=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=r===null?i:r.concat(i))));break;case 26:var l=nn;if(Tt(t,e),Ct(e),i&512&&(nt||r===null||dn(r,r.return)),i&4){var d=r!==null?r.memoizedState:null;if(i=e.memoizedState,r===null)if(i===null)if(e.stateNode===null){e:{i=e.type,r=e.memoizedProps,l=l.ownerDocument||l;t:switch(i){case"title":d=l.getElementsByTagName("title")[0],(!d||d[Wa]||d[ct]||d.namespaceURI==="http://www.w3.org/2000/svg"||d.hasAttribute("itemprop"))&&(d=l.createElement(i),l.head.insertBefore(d,l.querySelector("head > title"))),ht(d,i,r),d[ct]=e,st(d),i=d;break e;case"link":var y=zg("link","href",l).get(i+(r.href||""));if(y){for(var w=0;w<y.length;w++)if(d=y[w],d.getAttribute("href")===(r.href==null||r.href===""?null:r.href)&&d.getAttribute("rel")===(r.rel==null?null:r.rel)&&d.getAttribute("title")===(r.title==null?null:r.title)&&d.getAttribute("crossorigin")===(r.crossOrigin==null?null:r.crossOrigin)){y.splice(w,1);break t}}d=l.createElement(i),ht(d,i,r),l.head.appendChild(d);break;case"meta":if(y=zg("meta","content",l).get(i+(r.content||""))){for(w=0;w<y.length;w++)if(d=y[w],d.getAttribute("content")===(r.content==null?null:""+r.content)&&d.getAttribute("name")===(r.name==null?null:r.name)&&d.getAttribute("property")===(r.property==null?null:r.property)&&d.getAttribute("http-equiv")===(r.httpEquiv==null?null:r.httpEquiv)&&d.getAttribute("charset")===(r.charSet==null?null:r.charSet)){y.splice(w,1);break t}}d=l.createElement(i),ht(d,i,r),l.head.appendChild(d);break;default:throw Error(o(468,i))}d[ct]=e,st(d),i=d}e.stateNode=i}else _g(l,e.type,e.stateNode);else e.stateNode=Og(l,i,e.memoizedProps);else d!==i?(d===null?r.stateNode!==null&&(r=r.stateNode,r.parentNode.removeChild(r)):d.count--,i===null?_g(l,e.type,e.stateNode):Og(l,i,e.memoizedProps)):i===null&&e.stateNode!==null&&Kc(e,e.memoizedProps,r.memoizedProps)}break;case 27:Tt(t,e),Ct(e),i&512&&(nt||r===null||dn(r,r.return)),r!==null&&i&4&&Kc(e,e.memoizedProps,r.memoizedProps);break;case 5:if(Tt(t,e),Ct(e),i&512&&(nt||r===null||dn(r,r.return)),e.flags&32){l=e.stateNode;try{Wr(l,"")}catch(ce){_e(e,e.return,ce)}}i&4&&e.stateNode!=null&&(l=e.memoizedProps,Kc(e,l,r!==null?r.memoizedProps:l)),i&1024&&(Jc=!0);break;case 6:if(Tt(t,e),Ct(e),i&4){if(e.stateNode===null)throw Error(o(162));i=e.memoizedProps,r=e.stateNode;try{r.nodeValue=i}catch(ce){_e(e,e.return,ce)}}break;case 3:if(bo=null,l=nn,nn=yo(t.containerInfo),Tt(t,e),nn=l,Ct(e),i&4&&r!==null&&r.memoizedState.isDehydrated)try{Na(t.containerInfo)}catch(ce){_e(e,e.return,ce)}Jc&&(Jc=!1,_p(e));break;case 4:i=nn,nn=yo(e.stateNode.containerInfo),Tt(t,e),Ct(e),nn=i;break;case 12:Tt(t,e),Ct(e);break;case 31:Tt(t,e),Ct(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,no(e,i)));break;case 13:Tt(t,e),Ct(e),e.child.flags&8192&&e.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(ao=Nt()),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,no(e,i)));break;case 22:l=e.memoizedState!==null;var D=r!==null&&r.memoizedState!==null,q=kn,Z=nt;if(kn=q||l,nt=Z||D,Tt(t,e),nt=Z,kn=q,Ct(e),i&8192)e:for(t=e.stateNode,t._visibility=l?t._visibility&-2:t._visibility|1,l&&(r===null||D||kn||nt||Vr(e)),r=null,t=e;;){if(t.tag===5||t.tag===26){if(r===null){D=r=t;try{if(d=D.stateNode,l)y=d.style,typeof y.setProperty=="function"?y.setProperty("display","none","important"):y.display="none";else{w=D.stateNode;var I=D.memoizedProps.style,P=I!=null&&I.hasOwnProperty("display")?I.display:null;w.style.display=P==null||typeof P=="boolean"?"":(""+P).trim()}}catch(ce){_e(D,D.return,ce)}}}else if(t.tag===6){if(r===null){D=t;try{D.stateNode.nodeValue=l?"":D.memoizedProps}catch(ce){_e(D,D.return,ce)}}}else if(t.tag===18){if(r===null){D=t;try{var $=D.stateNode;l?Eg($,!0):Eg(D.stateNode,!1)}catch(ce){_e(D,D.return,ce)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;r===t&&(r=null),t=t.return}r===t&&(r=null),t.sibling.return=t.return,t=t.sibling}i&4&&(i=e.updateQueue,i!==null&&(r=i.retryQueue,r!==null&&(i.retryQueue=null,no(e,r))));break;case 19:Tt(t,e),Ct(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,no(e,i)));break;case 30:break;case 21:break;default:Tt(t,e),Ct(e)}}function Ct(e){var t=e.flags;if(t&2){try{for(var r,i=e.return;i!==null;){if(Cp(i)){r=i;break}i=i.return}if(r==null)throw Error(o(160));switch(r.tag){case 27:var l=r.stateNode,d=Zc(e);to(e,d,l);break;case 5:var y=r.stateNode;r.flags&32&&(Wr(y,""),r.flags&=-33);var w=Zc(e);to(e,w,y);break;case 3:case 4:var D=r.stateNode.containerInfo,q=Zc(e);Qc(e,q,D);break;default:throw Error(o(161))}}catch(Z){_e(e,e.return,Z)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function _p(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;_p(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function On(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)Np(e,t.alternate,t),t=t.sibling}function Vr(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:In(4,t,t.return),Vr(t);break;case 1:dn(t,t.return);var r=t.stateNode;typeof r.componentWillUnmount=="function"&&Ep(t,t.return,r),Vr(t);break;case 27:zi(t.stateNode);case 26:case 5:dn(t,t.return),Vr(t);break;case 22:t.memoizedState===null&&Vr(t);break;case 30:Vr(t);break;default:Vr(t)}e=e.sibling}}function zn(e,t,r){for(r=r&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var i=t.alternate,l=e,d=t,y=d.flags;switch(d.tag){case 0:case 11:case 15:zn(l,d,r),Ei(4,d);break;case 1:if(zn(l,d,r),i=d,l=i.stateNode,typeof l.componentDidMount=="function")try{l.componentDidMount()}catch(q){_e(i,i.return,q)}if(i=d,l=i.updateQueue,l!==null){var w=i.stateNode;try{var D=l.shared.hiddenCallbacks;if(D!==null)for(l.shared.hiddenCallbacks=null,l=0;l<D.length;l++)fm(D[l],w)}catch(q){_e(i,i.return,q)}}r&&y&64&&jp(d),Ti(d,d.return);break;case 27:Ap(d);case 26:case 5:zn(l,d,r),r&&i===null&&y&4&&Tp(d),Ti(d,d.return);break;case 12:zn(l,d,r);break;case 31:zn(l,d,r),r&&y&4&&Rp(l,d);break;case 13:zn(l,d,r),r&&y&4&&Op(l,d);break;case 22:d.memoizedState===null&&zn(l,d,r),Ti(d,d.return);break;case 30:break;default:zn(l,d,r)}t=t.sibling}}function Wc(e,t){var r=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(r=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==r&&(e!=null&&e.refCount++,r!=null&&di(r))}function Ic(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&di(e))}function rn(e,t,r,i){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Vp(e,t,r,i),t=t.sibling}function Vp(e,t,r,i){var l=t.flags;switch(t.tag){case 0:case 11:case 15:rn(e,t,r,i),l&2048&&Ei(9,t);break;case 1:rn(e,t,r,i);break;case 3:rn(e,t,r,i),l&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&di(e)));break;case 12:if(l&2048){rn(e,t,r,i),e=t.stateNode;try{var d=t.memoizedProps,y=d.id,w=d.onPostCommit;typeof w=="function"&&w(y,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(D){_e(t,t.return,D)}}else rn(e,t,r,i);break;case 31:rn(e,t,r,i);break;case 13:rn(e,t,r,i);break;case 23:break;case 22:d=t.stateNode,y=t.alternate,t.memoizedState!==null?d._visibility&2?rn(e,t,r,i):Ci(e,t):d._visibility&2?rn(e,t,r,i):(d._visibility|=2,va(e,t,r,i,(t.subtreeFlags&10256)!==0||!1)),l&2048&&Wc(y,t);break;case 24:rn(e,t,r,i),l&2048&&Ic(t.alternate,t);break;default:rn(e,t,r,i)}}function va(e,t,r,i,l){for(l=l&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var d=e,y=t,w=r,D=i,q=y.flags;switch(y.tag){case 0:case 11:case 15:va(d,y,w,D,l),Ei(8,y);break;case 23:break;case 22:var Z=y.stateNode;y.memoizedState!==null?Z._visibility&2?va(d,y,w,D,l):Ci(d,y):(Z._visibility|=2,va(d,y,w,D,l)),l&&q&2048&&Wc(y.alternate,y);break;case 24:va(d,y,w,D,l),l&&q&2048&&Ic(y.alternate,y);break;default:va(d,y,w,D,l)}t=t.sibling}}function Ci(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var r=e,i=t,l=i.flags;switch(i.tag){case 22:Ci(r,i),l&2048&&Wc(i.alternate,i);break;case 24:Ci(r,i),l&2048&&Ic(i.alternate,i);break;default:Ci(r,i)}t=t.sibling}}var Ai=8192;function ba(e,t,r){if(e.subtreeFlags&Ai)for(e=e.child;e!==null;)Bp(e,t,r),e=e.sibling}function Bp(e,t,r){switch(e.tag){case 26:ba(e,t,r),e.flags&Ai&&e.memoizedState!==null&&sw(r,nn,e.memoizedState,e.memoizedProps);break;case 5:ba(e,t,r);break;case 3:case 4:var i=nn;nn=yo(e.stateNode.containerInfo),ba(e,t,r),nn=i;break;case 22:e.memoizedState===null&&(i=e.alternate,i!==null&&i.memoizedState!==null?(i=Ai,Ai=16777216,ba(e,t,r),Ai=i):ba(e,t,r));break;default:ba(e,t,r)}}function Lp(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Di(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var r=0;r<t.length;r++){var i=t[r];ot=i,Hp(i,e)}Lp(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Up(e),e=e.sibling}function Up(e){switch(e.tag){case 0:case 11:case 15:Di(e),e.flags&2048&&In(9,e,e.return);break;case 3:Di(e);break;case 12:Di(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,ro(e)):Di(e);break;default:Di(e)}}function ro(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var r=0;r<t.length;r++){var i=t[r];ot=i,Hp(i,e)}Lp(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:In(8,t,t.return),ro(t);break;case 22:r=t.stateNode,r._visibility&2&&(r._visibility&=-3,ro(t));break;default:ro(t)}e=e.sibling}}function Hp(e,t){for(;ot!==null;){var r=ot;switch(r.tag){case 0:case 11:case 15:In(8,r,t);break;case 23:case 22:if(r.memoizedState!==null&&r.memoizedState.cachePool!==null){var i=r.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:di(r.memoizedState.cache)}if(i=r.child,i!==null)i.return=r,ot=i;else e:for(r=e;ot!==null;){i=ot;var l=i.sibling,d=i.return;if(Mp(i),i===r){ot=null;break e}if(l!==null){l.return=d,ot=l;break e}ot=d}}}var SS={getCacheForType:function(e){var t=dt(Ie),r=t.data.get(e);return r===void 0&&(r=e(),t.data.set(e,r)),r},cacheSignal:function(){return dt(Ie).controller.signal}},wS=typeof WeakMap=="function"?WeakMap:Map,Re=0,Ue=null,Ee=null,Ae=0,ze=0,Vt=null,er=!1,xa=!1,eu=!1,_n=0,Ke=0,tr=0,Br=0,tu=0,Bt=0,Sa=0,Ni=null,At=null,nu=!1,ao=0,qp=0,io=1/0,so=null,nr=null,at=0,rr=null,wa=null,Vn=0,ru=0,au=null,Yp=null,Mi=0,iu=null;function Lt(){return(Re&2)!==0&&Ae!==0?Ae&-Ae:U.T!==null?du():ah()}function Gp(){if(Bt===0)if((Ae&536870912)===0||Ne){var e=ms;ms<<=1,(ms&3932160)===0&&(ms=262144),Bt=e}else Bt=536870912;return e=zt.current,e!==null&&(e.flags|=32),Bt}function Dt(e,t,r){(e===Ue&&(ze===2||ze===9)||e.cancelPendingCommit!==null)&&(ja(e,0),ar(e,Ae,Bt,!1)),Ja(e,r),((Re&2)===0||e!==Ue)&&(e===Ue&&((Re&2)===0&&(Br|=r),Ke===4&&ar(e,Ae,Bt,!1)),fn(e))}function Pp(e,t,r){if((Re&6)!==0)throw Error(o(327));var i=!r&&(t&127)===0&&(t&e.expiredLanes)===0||Qa(e,t),l=i?TS(e,t):ou(e,t,!0),d=i;do{if(l===0){xa&&!i&&ar(e,t,0,!1);break}else{if(r=e.current.alternate,d&&!jS(r)){l=ou(e,t,!1),d=!1;continue}if(l===2){if(d=t,e.errorRecoveryDisabledLanes&d)var y=0;else y=e.pendingLanes&-536870913,y=y!==0?y:y&536870912?536870912:0;if(y!==0){t=y;e:{var w=e;l=Ni;var D=w.current.memoizedState.isDehydrated;if(D&&(ja(w,y).flags|=256),y=ou(w,y,!1),y!==2){if(eu&&!D){w.errorRecoveryDisabledLanes|=d,Br|=d,l=4;break e}d=At,At=l,d!==null&&(At===null?At=d:At.push.apply(At,d))}l=y}if(d=!1,l!==2)continue}}if(l===1){ja(e,0),ar(e,t,0,!0);break}e:{switch(i=e,d=l,d){case 0:case 1:throw Error(o(345));case 4:if((t&4194048)!==t)break;case 6:ar(i,t,Bt,!er);break e;case 2:At=null;break;case 3:case 5:break;default:throw Error(o(329))}if((t&62914560)===t&&(l=ao+300-Nt(),10<l)){if(ar(i,t,Bt,!er),gs(i,0,!0)!==0)break e;Vn=t,i.timeoutHandle=Sg(Xp.bind(null,i,r,At,so,nu,t,Bt,Br,Sa,er,d,"Throttled",-0,0),l);break e}Xp(i,r,At,so,nu,t,Bt,Br,Sa,er,d,null,-0,0)}}break}while(!0);fn(e)}function Xp(e,t,r,i,l,d,y,w,D,q,Z,I,P,$){if(e.timeoutHandle=-1,I=t.subtreeFlags,I&8192||(I&16785408)===16785408){I={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Sn},Bp(t,d,I);var ce=(d&62914560)===d?ao-Nt():(d&4194048)===d?qp-Nt():0;if(ce=ow(I,ce),ce!==null){Vn=d,e.cancelPendingCommit=ce(Ip.bind(null,e,t,d,r,i,l,y,w,D,Z,I,null,P,$)),ar(e,d,y,!q);return}}Ip(e,t,d,r,i,l,y,w,D)}function jS(e){for(var t=e;;){var r=t.tag;if((r===0||r===11||r===15)&&t.flags&16384&&(r=t.updateQueue,r!==null&&(r=r.stores,r!==null)))for(var i=0;i<r.length;i++){var l=r[i],d=l.getSnapshot;l=l.value;try{if(!Rt(d(),l))return!1}catch{return!1}}if(r=t.child,t.subtreeFlags&16384&&r!==null)r.return=t,t=r;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function ar(e,t,r,i){t&=~tu,t&=~Br,e.suspendedLanes|=t,e.pingedLanes&=~t,i&&(e.warmLanes|=t),i=e.expirationTimes;for(var l=t;0<l;){var d=31-kt(l),y=1<<d;i[d]=-1,l&=~y}r!==0&&th(e,r,t)}function oo(){return(Re&6)===0?(ki(0),!1):!0}function su(){if(Ee!==null){if(ze===0)var e=Ee.return;else e=Ee,Tn=Dr=null,wc(e),ha=null,hi=0,e=Ee;for(;e!==null;)wp(e.alternate,e),e=e.return;Ee=null}}function ja(e,t){var r=e.timeoutHandle;r!==-1&&(e.timeoutHandle=-1,GS(r)),r=e.cancelPendingCommit,r!==null&&(e.cancelPendingCommit=null,r()),Vn=0,su(),Ue=e,Ee=r=jn(e.current,null),Ae=t,ze=0,Vt=null,er=!1,xa=Qa(e,t),eu=!1,Sa=Bt=tu=Br=tr=Ke=0,At=Ni=null,nu=!1,(t&8)!==0&&(t|=t&32);var i=e.entangledLanes;if(i!==0)for(e=e.entanglements,i&=t;0<i;){var l=31-kt(i),d=1<<l;t|=e[l],i&=~d}return _n=t,Ds(),r}function $p(e,t){we=null,U.H=Si,t===fa||t===Vs?(t=lm(),ze=3):t===uc?(t=lm(),ze=4):ze=t===Lc?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,Vt=t,Ee===null&&(Ke=1,Qs(e,Pt(t,e.current)))}function Fp(){var e=zt.current;return e===null?!0:(Ae&4194048)===Ae?Kt===null:(Ae&62914560)===Ae||(Ae&536870912)!==0?e===Kt:!1}function Kp(){var e=U.H;return U.H=Si,e===null?Si:e}function Zp(){var e=U.A;return U.A=SS,e}function lo(){Ke=4,er||(Ae&4194048)!==Ae&&zt.current!==null||(xa=!0),(tr&134217727)===0&&(Br&134217727)===0||Ue===null||ar(Ue,Ae,Bt,!1)}function ou(e,t,r){var i=Re;Re|=2;var l=Kp(),d=Zp();(Ue!==e||Ae!==t)&&(so=null,ja(e,t)),t=!1;var y=Ke;e:do try{if(ze!==0&&Ee!==null){var w=Ee,D=Vt;switch(ze){case 8:su(),y=6;break e;case 3:case 2:case 9:case 6:zt.current===null&&(t=!0);var q=ze;if(ze=0,Vt=null,Ea(e,w,D,q),r&&xa){y=0;break e}break;default:q=ze,ze=0,Vt=null,Ea(e,w,D,q)}}ES(),y=Ke;break}catch(Z){$p(e,Z)}while(!0);return t&&e.shellSuspendCounter++,Tn=Dr=null,Re=i,U.H=l,U.A=d,Ee===null&&(Ue=null,Ae=0,Ds()),y}function ES(){for(;Ee!==null;)Qp(Ee)}function TS(e,t){var r=Re;Re|=2;var i=Kp(),l=Zp();Ue!==e||Ae!==t?(so=null,io=Nt()+500,ja(e,t)):xa=Qa(e,t);e:do try{if(ze!==0&&Ee!==null){t=Ee;var d=Vt;t:switch(ze){case 1:ze=0,Vt=null,Ea(e,t,d,1);break;case 2:case 9:if(sm(d)){ze=0,Vt=null,Jp(t);break}t=function(){ze!==2&&ze!==9||Ue!==e||(ze=7),fn(e)},d.then(t,t);break e;case 3:ze=7;break e;case 4:ze=5;break e;case 7:sm(d)?(ze=0,Vt=null,Jp(t)):(ze=0,Vt=null,Ea(e,t,d,7));break;case 5:var y=null;switch(Ee.tag){case 26:y=Ee.memoizedState;case 5:case 27:var w=Ee;if(y?Vg(y):w.stateNode.complete){ze=0,Vt=null;var D=w.sibling;if(D!==null)Ee=D;else{var q=w.return;q!==null?(Ee=q,co(q)):Ee=null}break t}}ze=0,Vt=null,Ea(e,t,d,5);break;case 6:ze=0,Vt=null,Ea(e,t,d,6);break;case 8:su(),Ke=6;break e;default:throw Error(o(462))}}CS();break}catch(Z){$p(e,Z)}while(!0);return Tn=Dr=null,U.H=i,U.A=l,Re=r,Ee!==null?0:(Ue=null,Ae=0,Ds(),Ke)}function CS(){for(;Ee!==null&&!Z0();)Qp(Ee)}function Qp(e){var t=xp(e.alternate,e,_n);e.memoizedProps=e.pendingProps,t===null?co(e):Ee=t}function Jp(e){var t=e,r=t.alternate;switch(t.tag){case 15:case 0:t=mp(r,t,t.pendingProps,t.type,void 0,Ae);break;case 11:t=mp(r,t,t.pendingProps,t.type.render,t.ref,Ae);break;case 5:wc(t);default:wp(r,t),t=Ee=Zh(t,_n),t=xp(r,t,_n)}e.memoizedProps=e.pendingProps,t===null?co(e):Ee=t}function Ea(e,t,r,i){Tn=Dr=null,wc(t),ha=null,hi=0;var l=t.return;try{if(mS(e,l,t,r,Ae)){Ke=1,Qs(e,Pt(r,e.current)),Ee=null;return}}catch(d){if(l!==null)throw Ee=l,d;Ke=1,Qs(e,Pt(r,e.current)),Ee=null;return}t.flags&32768?(Ne||i===1?e=!0:xa||(Ae&536870912)!==0?e=!1:(er=e=!0,(i===2||i===9||i===3||i===6)&&(i=zt.current,i!==null&&i.tag===13&&(i.flags|=16384))),Wp(t,e)):co(t)}function co(e){var t=e;do{if((t.flags&32768)!==0){Wp(t,er);return}e=t.return;var r=yS(t.alternate,t,_n);if(r!==null){Ee=r;return}if(t=t.sibling,t!==null){Ee=t;return}Ee=t=e}while(t!==null);Ke===0&&(Ke=5)}function Wp(e,t){do{var r=vS(e.alternate,e);if(r!==null){r.flags&=32767,Ee=r;return}if(r=e.return,r!==null&&(r.flags|=32768,r.subtreeFlags=0,r.deletions=null),!t&&(e=e.sibling,e!==null)){Ee=e;return}Ee=e=r}while(e!==null);Ke=6,Ee=null}function Ip(e,t,r,i,l,d,y,w,D){e.cancelPendingCommit=null;do uo();while(at!==0);if((Re&6)!==0)throw Error(o(327));if(t!==null){if(t===e.current)throw Error(o(177));if(d=t.lanes|t.childLanes,d|=Zl,i1(e,r,d,y,w,D),e===Ue&&(Ee=Ue=null,Ae=0),wa=t,rr=e,Vn=r,ru=d,au=l,Yp=i,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,MS(fs,function(){return ag(),null})):(e.callbackNode=null,e.callbackPriority=0),i=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||i){i=U.T,U.T=null,l=se.p,se.p=2,y=Re,Re|=4;try{bS(e,t,r)}finally{Re=y,se.p=l,U.T=i}}at=1,eg(),tg(),ng()}}function eg(){if(at===1){at=0;var e=rr,t=wa,r=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||r){r=U.T,U.T=null;var i=se.p;se.p=2;var l=Re;Re|=4;try{zp(t,e);var d=bu,y=Hh(e.containerInfo),w=d.focusedElem,D=d.selectionRange;if(y!==w&&w&&w.ownerDocument&&Uh(w.ownerDocument.documentElement,w)){if(D!==null&&Pl(w)){var q=D.start,Z=D.end;if(Z===void 0&&(Z=q),"selectionStart"in w)w.selectionStart=q,w.selectionEnd=Math.min(Z,w.value.length);else{var I=w.ownerDocument||document,P=I&&I.defaultView||window;if(P.getSelection){var $=P.getSelection(),ce=w.textContent.length,be=Math.min(D.start,ce),Le=D.end===void 0?be:Math.min(D.end,ce);!$.extend&&be>Le&&(y=Le,Le=be,be=y);var B=Lh(w,be),O=Lh(w,Le);if(B&&O&&($.rangeCount!==1||$.anchorNode!==B.node||$.anchorOffset!==B.offset||$.focusNode!==O.node||$.focusOffset!==O.offset)){var H=I.createRange();H.setStart(B.node,B.offset),$.removeAllRanges(),be>Le?($.addRange(H),$.extend(O.node,O.offset)):(H.setEnd(O.node,O.offset),$.addRange(H))}}}}for(I=[],$=w;$=$.parentNode;)$.nodeType===1&&I.push({element:$,left:$.scrollLeft,top:$.scrollTop});for(typeof w.focus=="function"&&w.focus(),w=0;w<I.length;w++){var J=I[w];J.element.scrollLeft=J.left,J.element.scrollTop=J.top}}jo=!!vu,bu=vu=null}finally{Re=l,se.p=i,U.T=r}}e.current=t,at=2}}function tg(){if(at===2){at=0;var e=rr,t=wa,r=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||r){r=U.T,U.T=null;var i=se.p;se.p=2;var l=Re;Re|=4;try{Np(e,t.alternate,t)}finally{Re=l,se.p=i,U.T=r}}at=3}}function ng(){if(at===4||at===3){at=0,Q0();var e=rr,t=wa,r=Vn,i=Yp;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?at=5:(at=0,wa=rr=null,rg(e,e.pendingLanes));var l=e.pendingLanes;if(l===0&&(nr=null),Tl(r),t=t.stateNode,Mt&&typeof Mt.onCommitFiberRoot=="function")try{Mt.onCommitFiberRoot(Za,t,void 0,(t.current.flags&128)===128)}catch{}if(i!==null){t=U.T,l=se.p,se.p=2,U.T=null;try{for(var d=e.onRecoverableError,y=0;y<i.length;y++){var w=i[y];d(w.value,{componentStack:w.stack})}}finally{U.T=t,se.p=l}}(Vn&3)!==0&&uo(),fn(e),l=e.pendingLanes,(r&261930)!==0&&(l&42)!==0?e===iu?Mi++:(Mi=0,iu=e):Mi=0,ki(0)}}function rg(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,di(t)))}function uo(){return eg(),tg(),ng(),ag()}function ag(){if(at!==5)return!1;var e=rr,t=ru;ru=0;var r=Tl(Vn),i=U.T,l=se.p;try{se.p=32>r?32:r,U.T=null,r=au,au=null;var d=rr,y=Vn;if(at=0,wa=rr=null,Vn=0,(Re&6)!==0)throw Error(o(331));var w=Re;if(Re|=4,Up(d.current),Vp(d,d.current,y,r),Re=w,ki(0,!1),Mt&&typeof Mt.onPostCommitFiberRoot=="function")try{Mt.onPostCommitFiberRoot(Za,d)}catch{}return!0}finally{se.p=l,U.T=i,rg(e,t)}}function ig(e,t,r){t=Pt(r,t),t=Bc(e.stateNode,t,2),e=Qn(e,t,2),e!==null&&(Ja(e,2),fn(e))}function _e(e,t,r){if(e.tag===3)ig(e,e,r);else for(;t!==null;){if(t.tag===3){ig(t,e,r);break}else if(t.tag===1){var i=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(nr===null||!nr.has(i))){e=Pt(r,e),r=sp(2),i=Qn(t,r,2),i!==null&&(op(r,i,t,e),Ja(i,2),fn(i));break}}t=t.return}}function lu(e,t,r){var i=e.pingCache;if(i===null){i=e.pingCache=new wS;var l=new Set;i.set(t,l)}else l=i.get(t),l===void 0&&(l=new Set,i.set(t,l));l.has(r)||(eu=!0,l.add(r),e=AS.bind(null,e,t,r),t.then(e,e))}function AS(e,t,r){var i=e.pingCache;i!==null&&i.delete(t),e.pingedLanes|=e.suspendedLanes&r,e.warmLanes&=~r,Ue===e&&(Ae&r)===r&&(Ke===4||Ke===3&&(Ae&62914560)===Ae&&300>Nt()-ao?(Re&2)===0&&ja(e,0):tu|=r,Sa===Ae&&(Sa=0)),fn(e)}function sg(e,t){t===0&&(t=eh()),e=Tr(e,t),e!==null&&(Ja(e,t),fn(e))}function DS(e){var t=e.memoizedState,r=0;t!==null&&(r=t.retryLane),sg(e,r)}function NS(e,t){var r=0;switch(e.tag){case 31:case 13:var i=e.stateNode,l=e.memoizedState;l!==null&&(r=l.retryLane);break;case 19:i=e.stateNode;break;case 22:i=e.stateNode._retryCache;break;default:throw Error(o(314))}i!==null&&i.delete(t),sg(e,r)}function MS(e,t){return Sl(e,t)}var fo=null,Ta=null,cu=!1,ho=!1,uu=!1,ir=0;function fn(e){e!==Ta&&e.next===null&&(Ta===null?fo=Ta=e:Ta=Ta.next=e),ho=!0,cu||(cu=!0,RS())}function ki(e,t){if(!uu&&ho){uu=!0;do for(var r=!1,i=fo;i!==null;){if(e!==0){var l=i.pendingLanes;if(l===0)var d=0;else{var y=i.suspendedLanes,w=i.pingedLanes;d=(1<<31-kt(42|e)+1)-1,d&=l&~(y&~w),d=d&201326741?d&201326741|1:d?d|2:0}d!==0&&(r=!0,ug(i,d))}else d=Ae,d=gs(i,i===Ue?d:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),(d&3)===0||Qa(i,d)||(r=!0,ug(i,d));i=i.next}while(r);uu=!1}}function kS(){og()}function og(){ho=cu=!1;var e=0;ir!==0&&YS()&&(e=ir);for(var t=Nt(),r=null,i=fo;i!==null;){var l=i.next,d=lg(i,t);d===0?(i.next=null,r===null?fo=l:r.next=l,l===null&&(Ta=r)):(r=i,(e!==0||(d&3)!==0)&&(ho=!0)),i=l}at!==0&&at!==5||ki(e),ir!==0&&(ir=0)}function lg(e,t){for(var r=e.suspendedLanes,i=e.pingedLanes,l=e.expirationTimes,d=e.pendingLanes&-62914561;0<d;){var y=31-kt(d),w=1<<y,D=l[y];D===-1?((w&r)===0||(w&i)!==0)&&(l[y]=a1(w,t)):D<=t&&(e.expiredLanes|=w),d&=~w}if(t=Ue,r=Ae,r=gs(e,e===t?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i=e.callbackNode,r===0||e===t&&(ze===2||ze===9)||e.cancelPendingCommit!==null)return i!==null&&i!==null&&wl(i),e.callbackNode=null,e.callbackPriority=0;if((r&3)===0||Qa(e,r)){if(t=r&-r,t===e.callbackPriority)return t;switch(i!==null&&wl(i),Tl(r)){case 2:case 8:r=Wf;break;case 32:r=fs;break;case 268435456:r=If;break;default:r=fs}return i=cg.bind(null,e),r=Sl(r,i),e.callbackPriority=t,e.callbackNode=r,t}return i!==null&&i!==null&&wl(i),e.callbackPriority=2,e.callbackNode=null,2}function cg(e,t){if(at!==0&&at!==5)return e.callbackNode=null,e.callbackPriority=0,null;var r=e.callbackNode;if(uo()&&e.callbackNode!==r)return null;var i=Ae;return i=gs(e,e===Ue?i:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i===0?null:(Pp(e,i,t),lg(e,Nt()),e.callbackNode!=null&&e.callbackNode===r?cg.bind(null,e):null)}function ug(e,t){if(uo())return null;Pp(e,t,!0)}function RS(){PS(function(){(Re&6)!==0?Sl(Jf,kS):og()})}function du(){if(ir===0){var e=ua;e===0&&(e=hs,hs<<=1,(hs&261888)===0&&(hs=256)),ir=e}return ir}function dg(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:xs(""+e)}function fg(e,t){var r=t.ownerDocument.createElement("input");return r.name=t.name,r.value=t.value,e.id&&r.setAttribute("form",e.id),t.parentNode.insertBefore(r,t),e=new FormData(e),r.parentNode.removeChild(r),e}function OS(e,t,r,i,l){if(t==="submit"&&r&&r.stateNode===l){var d=dg((l[wt]||null).action),y=i.submitter;y&&(t=(t=y[wt]||null)?dg(t.formAction):y.getAttribute("formAction"),t!==null&&(d=t,y=null));var w=new Es("action","action",null,i,l);e.push({event:w,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(ir!==0){var D=y?fg(l,y):new FormData(l);kc(r,{pending:!0,data:D,method:l.method,action:d},null,D)}}else typeof d=="function"&&(w.preventDefault(),D=y?fg(l,y):new FormData(l),kc(r,{pending:!0,data:D,method:l.method,action:d},d,D))},currentTarget:l}]})}}for(var fu=0;fu<Kl.length;fu++){var hu=Kl[fu],zS=hu.toLowerCase(),_S=hu[0].toUpperCase()+hu.slice(1);tn(zS,"on"+_S)}tn(Gh,"onAnimationEnd"),tn(Ph,"onAnimationIteration"),tn(Xh,"onAnimationStart"),tn("dblclick","onDoubleClick"),tn("focusin","onFocus"),tn("focusout","onBlur"),tn(J1,"onTransitionRun"),tn(W1,"onTransitionStart"),tn(I1,"onTransitionCancel"),tn($h,"onTransitionEnd"),Qr("onMouseEnter",["mouseout","mouseover"]),Qr("onMouseLeave",["mouseout","mouseover"]),Qr("onPointerEnter",["pointerout","pointerover"]),Qr("onPointerLeave",["pointerout","pointerover"]),Sr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Sr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Sr("onBeforeInput",["compositionend","keypress","textInput","paste"]),Sr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Sr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Sr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ri="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),VS=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ri));function hg(e,t){t=(t&4)!==0;for(var r=0;r<e.length;r++){var i=e[r],l=i.event;i=i.listeners;e:{var d=void 0;if(t)for(var y=i.length-1;0<=y;y--){var w=i[y],D=w.instance,q=w.currentTarget;if(w=w.listener,D!==d&&l.isPropagationStopped())break e;d=w,l.currentTarget=q;try{d(l)}catch(Z){As(Z)}l.currentTarget=null,d=D}else for(y=0;y<i.length;y++){if(w=i[y],D=w.instance,q=w.currentTarget,w=w.listener,D!==d&&l.isPropagationStopped())break e;d=w,l.currentTarget=q;try{d(l)}catch(Z){As(Z)}l.currentTarget=null,d=D}}}}function Te(e,t){var r=t[Cl];r===void 0&&(r=t[Cl]=new Set);var i=e+"__bubble";r.has(i)||(mg(t,e,2,!1),r.add(i))}function mu(e,t,r){var i=0;t&&(i|=4),mg(r,e,i,t)}var mo="_reactListening"+Math.random().toString(36).slice(2);function pu(e){if(!e[mo]){e[mo]=!0,oh.forEach(function(r){r!=="selectionchange"&&(VS.has(r)||mu(r,!1,e),mu(r,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[mo]||(t[mo]=!0,mu("selectionchange",!1,t))}}function mg(e,t,r,i){switch(Gg(t)){case 2:var l=uw;break;case 8:l=dw;break;default:l=Mu}r=l.bind(null,t,r,e),l=void 0,!_l||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0),i?l!==void 0?e.addEventListener(t,r,{capture:!0,passive:l}):e.addEventListener(t,r,!0):l!==void 0?e.addEventListener(t,r,{passive:l}):e.addEventListener(t,r,!1)}function gu(e,t,r,i,l){var d=i;if((t&1)===0&&(t&2)===0&&i!==null)e:for(;;){if(i===null)return;var y=i.tag;if(y===3||y===4){var w=i.stateNode.containerInfo;if(w===l)break;if(y===4)for(y=i.return;y!==null;){var D=y.tag;if((D===3||D===4)&&y.stateNode.containerInfo===l)return;y=y.return}for(;w!==null;){if(y=Fr(w),y===null)return;if(D=y.tag,D===5||D===6||D===26||D===27){i=d=y;continue e}w=w.parentNode}}i=i.return}bh(function(){var q=d,Z=Ol(r),I=[];e:{var P=Fh.get(e);if(P!==void 0){var $=Es,ce=e;switch(e){case"keypress":if(ws(r)===0)break e;case"keydown":case"keyup":$=N1;break;case"focusin":ce="focus",$=Ul;break;case"focusout":ce="blur",$=Ul;break;case"beforeblur":case"afterblur":$=Ul;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":$=wh;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":$=y1;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":$=R1;break;case Gh:case Ph:case Xh:$=x1;break;case $h:$=z1;break;case"scroll":case"scrollend":$=p1;break;case"wheel":$=V1;break;case"copy":case"cut":case"paste":$=w1;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":$=Eh;break;case"toggle":case"beforetoggle":$=L1}var be=(t&4)!==0,Le=!be&&(e==="scroll"||e==="scrollend"),B=be?P!==null?P+"Capture":null:P;be=[];for(var O=q,H;O!==null;){var J=O;if(H=J.stateNode,J=J.tag,J!==5&&J!==26&&J!==27||H===null||B===null||(J=ei(O,B),J!=null&&be.push(Oi(O,J,H))),Le)break;O=O.return}0<be.length&&(P=new $(P,ce,null,r,Z),I.push({event:P,listeners:be}))}}if((t&7)===0){e:{if(P=e==="mouseover"||e==="pointerover",$=e==="mouseout"||e==="pointerout",P&&r!==Rl&&(ce=r.relatedTarget||r.fromElement)&&(Fr(ce)||ce[$r]))break e;if(($||P)&&(P=Z.window===Z?Z:(P=Z.ownerDocument)?P.defaultView||P.parentWindow:window,$?(ce=r.relatedTarget||r.toElement,$=q,ce=ce?Fr(ce):null,ce!==null&&(Le=h(ce),be=ce.tag,ce!==Le||be!==5&&be!==27&&be!==6)&&(ce=null)):($=null,ce=q),$!==ce)){if(be=wh,J="onMouseLeave",B="onMouseEnter",O="mouse",(e==="pointerout"||e==="pointerover")&&(be=Eh,J="onPointerLeave",B="onPointerEnter",O="pointer"),Le=$==null?P:Ia($),H=ce==null?P:Ia(ce),P=new be(J,O+"leave",$,r,Z),P.target=Le,P.relatedTarget=H,J=null,Fr(Z)===q&&(be=new be(B,O+"enter",ce,r,Z),be.target=H,be.relatedTarget=Le,J=be),Le=J,$&&ce)t:{for(be=BS,B=$,O=ce,H=0,J=B;J;J=be(J))H++;J=0;for(var ge=O;ge;ge=be(ge))J++;for(;0<H-J;)B=be(B),H--;for(;0<J-H;)O=be(O),J--;for(;H--;){if(B===O||O!==null&&B===O.alternate){be=B;break t}B=be(B),O=be(O)}be=null}else be=null;$!==null&&pg(I,P,$,be,!1),ce!==null&&Le!==null&&pg(I,Le,ce,be,!0)}}e:{if(P=q?Ia(q):window,$=P.nodeName&&P.nodeName.toLowerCase(),$==="select"||$==="input"&&P.type==="file")var Me=Rh;else if(Mh(P))if(Oh)Me=K1;else{Me=$1;var me=X1}else $=P.nodeName,!$||$.toLowerCase()!=="input"||P.type!=="checkbox"&&P.type!=="radio"?q&&kl(q.elementType)&&(Me=Rh):Me=F1;if(Me&&(Me=Me(e,q))){kh(I,Me,r,Z);break e}me&&me(e,P,q),e==="focusout"&&q&&P.type==="number"&&q.memoizedProps.value!=null&&Ml(P,"number",P.value)}switch(me=q?Ia(q):window,e){case"focusin":(Mh(me)||me.contentEditable==="true")&&(na=me,Xl=q,li=null);break;case"focusout":li=Xl=na=null;break;case"mousedown":$l=!0;break;case"contextmenu":case"mouseup":case"dragend":$l=!1,qh(I,r,Z);break;case"selectionchange":if(Q1)break;case"keydown":case"keyup":qh(I,r,Z)}var je;if(ql)e:{switch(e){case"compositionstart":var De="onCompositionStart";break e;case"compositionend":De="onCompositionEnd";break e;case"compositionupdate":De="onCompositionUpdate";break e}De=void 0}else ta?Dh(e,r)&&(De="onCompositionEnd"):e==="keydown"&&r.keyCode===229&&(De="onCompositionStart");De&&(Th&&r.locale!=="ko"&&(ta||De!=="onCompositionStart"?De==="onCompositionEnd"&&ta&&(je=xh()):(Gn=Z,Vl="value"in Gn?Gn.value:Gn.textContent,ta=!0)),me=po(q,De),0<me.length&&(De=new jh(De,e,null,r,Z),I.push({event:De,listeners:me}),je?De.data=je:(je=Nh(r),je!==null&&(De.data=je)))),(je=H1?q1(e,r):Y1(e,r))&&(De=po(q,"onBeforeInput"),0<De.length&&(me=new jh("onBeforeInput","beforeinput",null,r,Z),I.push({event:me,listeners:De}),me.data=je)),OS(I,e,q,r,Z)}hg(I,t)})}function Oi(e,t,r){return{instance:e,listener:t,currentTarget:r}}function po(e,t){for(var r=t+"Capture",i=[];e!==null;){var l=e,d=l.stateNode;if(l=l.tag,l!==5&&l!==26&&l!==27||d===null||(l=ei(e,r),l!=null&&i.unshift(Oi(e,l,d)),l=ei(e,t),l!=null&&i.push(Oi(e,l,d))),e.tag===3)return i;e=e.return}return[]}function BS(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function pg(e,t,r,i,l){for(var d=t._reactName,y=[];r!==null&&r!==i;){var w=r,D=w.alternate,q=w.stateNode;if(w=w.tag,D!==null&&D===i)break;w!==5&&w!==26&&w!==27||q===null||(D=q,l?(q=ei(r,d),q!=null&&y.unshift(Oi(r,q,D))):l||(q=ei(r,d),q!=null&&y.push(Oi(r,q,D)))),r=r.return}y.length!==0&&e.push({event:t,listeners:y})}var LS=/\r\n?/g,US=/\u0000|\uFFFD/g;function gg(e){return(typeof e=="string"?e:""+e).replace(LS,`
`).replace(US,"")}function yg(e,t){return t=gg(t),gg(e)===t}function Be(e,t,r,i,l,d){switch(r){case"children":typeof i=="string"?t==="body"||t==="textarea"&&i===""||Wr(e,i):(typeof i=="number"||typeof i=="bigint")&&t!=="body"&&Wr(e,""+i);break;case"className":vs(e,"class",i);break;case"tabIndex":vs(e,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":vs(e,r,i);break;case"style":yh(e,i,d);break;case"data":if(t!=="object"){vs(e,"data",i);break}case"src":case"href":if(i===""&&(t!=="a"||r!=="href")){e.removeAttribute(r);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(r);break}i=xs(""+i),e.setAttribute(r,i);break;case"action":case"formAction":if(typeof i=="function"){e.setAttribute(r,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof d=="function"&&(r==="formAction"?(t!=="input"&&Be(e,t,"name",l.name,l,null),Be(e,t,"formEncType",l.formEncType,l,null),Be(e,t,"formMethod",l.formMethod,l,null),Be(e,t,"formTarget",l.formTarget,l,null)):(Be(e,t,"encType",l.encType,l,null),Be(e,t,"method",l.method,l,null),Be(e,t,"target",l.target,l,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(r);break}i=xs(""+i),e.setAttribute(r,i);break;case"onClick":i!=null&&(e.onclick=Sn);break;case"onScroll":i!=null&&Te("scroll",e);break;case"onScrollEnd":i!=null&&Te("scrollend",e);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(o(61));if(r=i.__html,r!=null){if(l.children!=null)throw Error(o(60));e.innerHTML=r}}break;case"multiple":e.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":e.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){e.removeAttribute("xlink:href");break}r=xs(""+i),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",r);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(r,""+i):e.removeAttribute(r);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(r,""):e.removeAttribute(r);break;case"capture":case"download":i===!0?e.setAttribute(r,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(r,i):e.removeAttribute(r);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?e.setAttribute(r,i):e.removeAttribute(r);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?e.removeAttribute(r):e.setAttribute(r,i);break;case"popover":Te("beforetoggle",e),Te("toggle",e),ys(e,"popover",i);break;case"xlinkActuate":xn(e,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":xn(e,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":xn(e,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":xn(e,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":xn(e,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":xn(e,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":xn(e,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":xn(e,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":xn(e,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":ys(e,"is",i);break;case"innerText":case"textContent":break;default:(!(2<r.length)||r[0]!=="o"&&r[0]!=="O"||r[1]!=="n"&&r[1]!=="N")&&(r=h1.get(r)||r,ys(e,r,i))}}function yu(e,t,r,i,l,d){switch(r){case"style":yh(e,i,d);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(o(61));if(r=i.__html,r!=null){if(l.children!=null)throw Error(o(60));e.innerHTML=r}}break;case"children":typeof i=="string"?Wr(e,i):(typeof i=="number"||typeof i=="bigint")&&Wr(e,""+i);break;case"onScroll":i!=null&&Te("scroll",e);break;case"onScrollEnd":i!=null&&Te("scrollend",e);break;case"onClick":i!=null&&(e.onclick=Sn);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!lh.hasOwnProperty(r))e:{if(r[0]==="o"&&r[1]==="n"&&(l=r.endsWith("Capture"),t=r.slice(2,l?r.length-7:void 0),d=e[wt]||null,d=d!=null?d[r]:null,typeof d=="function"&&e.removeEventListener(t,d,l),typeof i=="function")){typeof d!="function"&&d!==null&&(r in e?e[r]=null:e.hasAttribute(r)&&e.removeAttribute(r)),e.addEventListener(t,i,l);break e}r in e?e[r]=i:i===!0?e.setAttribute(r,""):ys(e,r,i)}}}function ht(e,t,r){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Te("error",e),Te("load",e);var i=!1,l=!1,d;for(d in r)if(r.hasOwnProperty(d)){var y=r[d];if(y!=null)switch(d){case"src":i=!0;break;case"srcSet":l=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(o(137,t));default:Be(e,t,d,y,r,null)}}l&&Be(e,t,"srcSet",r.srcSet,r,null),i&&Be(e,t,"src",r.src,r,null);return;case"input":Te("invalid",e);var w=d=y=l=null,D=null,q=null;for(i in r)if(r.hasOwnProperty(i)){var Z=r[i];if(Z!=null)switch(i){case"name":l=Z;break;case"type":y=Z;break;case"checked":D=Z;break;case"defaultChecked":q=Z;break;case"value":d=Z;break;case"defaultValue":w=Z;break;case"children":case"dangerouslySetInnerHTML":if(Z!=null)throw Error(o(137,t));break;default:Be(e,t,i,Z,r,null)}}hh(e,d,w,D,q,y,l,!1);return;case"select":Te("invalid",e),i=y=d=null;for(l in r)if(r.hasOwnProperty(l)&&(w=r[l],w!=null))switch(l){case"value":d=w;break;case"defaultValue":y=w;break;case"multiple":i=w;default:Be(e,t,l,w,r,null)}t=d,r=y,e.multiple=!!i,t!=null?Jr(e,!!i,t,!1):r!=null&&Jr(e,!!i,r,!0);return;case"textarea":Te("invalid",e),d=l=i=null;for(y in r)if(r.hasOwnProperty(y)&&(w=r[y],w!=null))switch(y){case"value":i=w;break;case"defaultValue":l=w;break;case"children":d=w;break;case"dangerouslySetInnerHTML":if(w!=null)throw Error(o(91));break;default:Be(e,t,y,w,r,null)}ph(e,i,l,d);return;case"option":for(D in r)if(r.hasOwnProperty(D)&&(i=r[D],i!=null))switch(D){case"selected":e.selected=i&&typeof i!="function"&&typeof i!="symbol";break;default:Be(e,t,D,i,r,null)}return;case"dialog":Te("beforetoggle",e),Te("toggle",e),Te("cancel",e),Te("close",e);break;case"iframe":case"object":Te("load",e);break;case"video":case"audio":for(i=0;i<Ri.length;i++)Te(Ri[i],e);break;case"image":Te("error",e),Te("load",e);break;case"details":Te("toggle",e);break;case"embed":case"source":case"link":Te("error",e),Te("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(q in r)if(r.hasOwnProperty(q)&&(i=r[q],i!=null))switch(q){case"children":case"dangerouslySetInnerHTML":throw Error(o(137,t));default:Be(e,t,q,i,r,null)}return;default:if(kl(t)){for(Z in r)r.hasOwnProperty(Z)&&(i=r[Z],i!==void 0&&yu(e,t,Z,i,r,void 0));return}}for(w in r)r.hasOwnProperty(w)&&(i=r[w],i!=null&&Be(e,t,w,i,r,null))}function HS(e,t,r,i){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var l=null,d=null,y=null,w=null,D=null,q=null,Z=null;for($ in r){var I=r[$];if(r.hasOwnProperty($)&&I!=null)switch($){case"checked":break;case"value":break;case"defaultValue":D=I;default:i.hasOwnProperty($)||Be(e,t,$,null,i,I)}}for(var P in i){var $=i[P];if(I=r[P],i.hasOwnProperty(P)&&($!=null||I!=null))switch(P){case"type":d=$;break;case"name":l=$;break;case"checked":q=$;break;case"defaultChecked":Z=$;break;case"value":y=$;break;case"defaultValue":w=$;break;case"children":case"dangerouslySetInnerHTML":if($!=null)throw Error(o(137,t));break;default:$!==I&&Be(e,t,P,$,i,I)}}Nl(e,y,w,D,q,Z,d,l);return;case"select":$=y=w=P=null;for(d in r)if(D=r[d],r.hasOwnProperty(d)&&D!=null)switch(d){case"value":break;case"multiple":$=D;default:i.hasOwnProperty(d)||Be(e,t,d,null,i,D)}for(l in i)if(d=i[l],D=r[l],i.hasOwnProperty(l)&&(d!=null||D!=null))switch(l){case"value":P=d;break;case"defaultValue":w=d;break;case"multiple":y=d;default:d!==D&&Be(e,t,l,d,i,D)}t=w,r=y,i=$,P!=null?Jr(e,!!r,P,!1):!!i!=!!r&&(t!=null?Jr(e,!!r,t,!0):Jr(e,!!r,r?[]:"",!1));return;case"textarea":$=P=null;for(w in r)if(l=r[w],r.hasOwnProperty(w)&&l!=null&&!i.hasOwnProperty(w))switch(w){case"value":break;case"children":break;default:Be(e,t,w,null,i,l)}for(y in i)if(l=i[y],d=r[y],i.hasOwnProperty(y)&&(l!=null||d!=null))switch(y){case"value":P=l;break;case"defaultValue":$=l;break;case"children":break;case"dangerouslySetInnerHTML":if(l!=null)throw Error(o(91));break;default:l!==d&&Be(e,t,y,l,i,d)}mh(e,P,$);return;case"option":for(var ce in r)if(P=r[ce],r.hasOwnProperty(ce)&&P!=null&&!i.hasOwnProperty(ce))switch(ce){case"selected":e.selected=!1;break;default:Be(e,t,ce,null,i,P)}for(D in i)if(P=i[D],$=r[D],i.hasOwnProperty(D)&&P!==$&&(P!=null||$!=null))switch(D){case"selected":e.selected=P&&typeof P!="function"&&typeof P!="symbol";break;default:Be(e,t,D,P,i,$)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var be in r)P=r[be],r.hasOwnProperty(be)&&P!=null&&!i.hasOwnProperty(be)&&Be(e,t,be,null,i,P);for(q in i)if(P=i[q],$=r[q],i.hasOwnProperty(q)&&P!==$&&(P!=null||$!=null))switch(q){case"children":case"dangerouslySetInnerHTML":if(P!=null)throw Error(o(137,t));break;default:Be(e,t,q,P,i,$)}return;default:if(kl(t)){for(var Le in r)P=r[Le],r.hasOwnProperty(Le)&&P!==void 0&&!i.hasOwnProperty(Le)&&yu(e,t,Le,void 0,i,P);for(Z in i)P=i[Z],$=r[Z],!i.hasOwnProperty(Z)||P===$||P===void 0&&$===void 0||yu(e,t,Z,P,i,$);return}}for(var B in r)P=r[B],r.hasOwnProperty(B)&&P!=null&&!i.hasOwnProperty(B)&&Be(e,t,B,null,i,P);for(I in i)P=i[I],$=r[I],!i.hasOwnProperty(I)||P===$||P==null&&$==null||Be(e,t,I,P,i,$)}function vg(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function qS(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,r=performance.getEntriesByType("resource"),i=0;i<r.length;i++){var l=r[i],d=l.transferSize,y=l.initiatorType,w=l.duration;if(d&&w&&vg(y)){for(y=0,w=l.responseEnd,i+=1;i<r.length;i++){var D=r[i],q=D.startTime;if(q>w)break;var Z=D.transferSize,I=D.initiatorType;Z&&vg(I)&&(D=D.responseEnd,y+=Z*(D<w?1:(w-q)/(D-q)))}if(--i,t+=8*(d+y)/(l.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var vu=null,bu=null;function go(e){return e.nodeType===9?e:e.ownerDocument}function bg(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function xg(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function xu(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Su=null;function YS(){var e=window.event;return e&&e.type==="popstate"?e===Su?!1:(Su=e,!0):(Su=null,!1)}var Sg=typeof setTimeout=="function"?setTimeout:void 0,GS=typeof clearTimeout=="function"?clearTimeout:void 0,wg=typeof Promise=="function"?Promise:void 0,PS=typeof queueMicrotask=="function"?queueMicrotask:typeof wg<"u"?function(e){return wg.resolve(null).then(e).catch(XS)}:Sg;function XS(e){setTimeout(function(){throw e})}function sr(e){return e==="head"}function jg(e,t){var r=t,i=0;do{var l=r.nextSibling;if(e.removeChild(r),l&&l.nodeType===8)if(r=l.data,r==="/$"||r==="/&"){if(i===0){e.removeChild(l),Na(t);return}i--}else if(r==="$"||r==="$?"||r==="$~"||r==="$!"||r==="&")i++;else if(r==="html")zi(e.ownerDocument.documentElement);else if(r==="head"){r=e.ownerDocument.head,zi(r);for(var d=r.firstChild;d;){var y=d.nextSibling,w=d.nodeName;d[Wa]||w==="SCRIPT"||w==="STYLE"||w==="LINK"&&d.rel.toLowerCase()==="stylesheet"||r.removeChild(d),d=y}}else r==="body"&&zi(e.ownerDocument.body);r=l}while(r);Na(t)}function Eg(e,t){var r=e;e=0;do{var i=r.nextSibling;if(r.nodeType===1?t?(r._stashedDisplay=r.style.display,r.style.display="none"):(r.style.display=r._stashedDisplay||"",r.getAttribute("style")===""&&r.removeAttribute("style")):r.nodeType===3&&(t?(r._stashedText=r.nodeValue,r.nodeValue=""):r.nodeValue=r._stashedText||""),i&&i.nodeType===8)if(r=i.data,r==="/$"){if(e===0)break;e--}else r!=="$"&&r!=="$?"&&r!=="$~"&&r!=="$!"||e++;r=i}while(r)}function wu(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var r=t;switch(t=t.nextSibling,r.nodeName){case"HTML":case"HEAD":case"BODY":wu(r),Al(r);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(r.rel.toLowerCase()==="stylesheet")continue}e.removeChild(r)}}function $S(e,t,r,i){for(;e.nodeType===1;){var l=r;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!i&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(i){if(!e[Wa])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(d=e.getAttribute("rel"),d==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(d!==l.rel||e.getAttribute("href")!==(l.href==null||l.href===""?null:l.href)||e.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin)||e.getAttribute("title")!==(l.title==null?null:l.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(d=e.getAttribute("src"),(d!==(l.src==null?null:l.src)||e.getAttribute("type")!==(l.type==null?null:l.type)||e.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin))&&d&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var d=l.name==null?null:""+l.name;if(l.type==="hidden"&&e.getAttribute("name")===d)return e}else return e;if(e=Zt(e.nextSibling),e===null)break}return null}function FS(e,t,r){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!r||(e=Zt(e.nextSibling),e===null))return null;return e}function Tg(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Zt(e.nextSibling),e===null))return null;return e}function ju(e){return e.data==="$?"||e.data==="$~"}function Eu(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function KS(e,t){var r=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||r.readyState!=="loading")t();else{var i=function(){t(),r.removeEventListener("DOMContentLoaded",i)};r.addEventListener("DOMContentLoaded",i),e._reactRetry=i}}function Zt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var Tu=null;function Cg(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="/$"||r==="/&"){if(t===0)return Zt(e.nextSibling);t--}else r!=="$"&&r!=="$!"&&r!=="$?"&&r!=="$~"&&r!=="&"||t++}e=e.nextSibling}return null}function Ag(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="$"||r==="$!"||r==="$?"||r==="$~"||r==="&"){if(t===0)return e;t--}else r!=="/$"&&r!=="/&"||t++}e=e.previousSibling}return null}function Dg(e,t,r){switch(t=go(r),e){case"html":if(e=t.documentElement,!e)throw Error(o(452));return e;case"head":if(e=t.head,!e)throw Error(o(453));return e;case"body":if(e=t.body,!e)throw Error(o(454));return e;default:throw Error(o(451))}}function zi(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Al(e)}var Qt=new Map,Ng=new Set;function yo(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Bn=se.d;se.d={f:ZS,r:QS,D:JS,C:WS,L:IS,m:ew,X:nw,S:tw,M:rw};function ZS(){var e=Bn.f(),t=oo();return e||t}function QS(e){var t=Kr(e);t!==null&&t.tag===5&&t.type==="form"?$m(t):Bn.r(e)}var Ca=typeof document>"u"?null:document;function Mg(e,t,r){var i=Ca;if(i&&typeof t=="string"&&t){var l=Yt(t);l='link[rel="'+e+'"][href="'+l+'"]',typeof r=="string"&&(l+='[crossorigin="'+r+'"]'),Ng.has(l)||(Ng.add(l),e={rel:e,crossOrigin:r,href:t},i.querySelector(l)===null&&(t=i.createElement("link"),ht(t,"link",e),st(t),i.head.appendChild(t)))}}function JS(e){Bn.D(e),Mg("dns-prefetch",e,null)}function WS(e,t){Bn.C(e,t),Mg("preconnect",e,t)}function IS(e,t,r){Bn.L(e,t,r);var i=Ca;if(i&&e&&t){var l='link[rel="preload"][as="'+Yt(t)+'"]';t==="image"&&r&&r.imageSrcSet?(l+='[imagesrcset="'+Yt(r.imageSrcSet)+'"]',typeof r.imageSizes=="string"&&(l+='[imagesizes="'+Yt(r.imageSizes)+'"]')):l+='[href="'+Yt(e)+'"]';var d=l;switch(t){case"style":d=Aa(e);break;case"script":d=Da(e)}Qt.has(d)||(e=b({rel:"preload",href:t==="image"&&r&&r.imageSrcSet?void 0:e,as:t},r),Qt.set(d,e),i.querySelector(l)!==null||t==="style"&&i.querySelector(_i(d))||t==="script"&&i.querySelector(Vi(d))||(t=i.createElement("link"),ht(t,"link",e),st(t),i.head.appendChild(t)))}}function ew(e,t){Bn.m(e,t);var r=Ca;if(r&&e){var i=t&&typeof t.as=="string"?t.as:"script",l='link[rel="modulepreload"][as="'+Yt(i)+'"][href="'+Yt(e)+'"]',d=l;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":d=Da(e)}if(!Qt.has(d)&&(e=b({rel:"modulepreload",href:e},t),Qt.set(d,e),r.querySelector(l)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(r.querySelector(Vi(d)))return}i=r.createElement("link"),ht(i,"link",e),st(i),r.head.appendChild(i)}}}function tw(e,t,r){Bn.S(e,t,r);var i=Ca;if(i&&e){var l=Zr(i).hoistableStyles,d=Aa(e);t=t||"default";var y=l.get(d);if(!y){var w={loading:0,preload:null};if(y=i.querySelector(_i(d)))w.loading=5;else{e=b({rel:"stylesheet",href:e,"data-precedence":t},r),(r=Qt.get(d))&&Cu(e,r);var D=y=i.createElement("link");st(D),ht(D,"link",e),D._p=new Promise(function(q,Z){D.onload=q,D.onerror=Z}),D.addEventListener("load",function(){w.loading|=1}),D.addEventListener("error",function(){w.loading|=2}),w.loading|=4,vo(y,t,i)}y={type:"stylesheet",instance:y,count:1,state:w},l.set(d,y)}}}function nw(e,t){Bn.X(e,t);var r=Ca;if(r&&e){var i=Zr(r).hoistableScripts,l=Da(e),d=i.get(l);d||(d=r.querySelector(Vi(l)),d||(e=b({src:e,async:!0},t),(t=Qt.get(l))&&Au(e,t),d=r.createElement("script"),st(d),ht(d,"link",e),r.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},i.set(l,d))}}function rw(e,t){Bn.M(e,t);var r=Ca;if(r&&e){var i=Zr(r).hoistableScripts,l=Da(e),d=i.get(l);d||(d=r.querySelector(Vi(l)),d||(e=b({src:e,async:!0,type:"module"},t),(t=Qt.get(l))&&Au(e,t),d=r.createElement("script"),st(d),ht(d,"link",e),r.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},i.set(l,d))}}function kg(e,t,r,i){var l=(l=fe.current)?yo(l):null;if(!l)throw Error(o(446));switch(e){case"meta":case"title":return null;case"style":return typeof r.precedence=="string"&&typeof r.href=="string"?(t=Aa(r.href),r=Zr(l).hoistableStyles,i=r.get(t),i||(i={type:"style",instance:null,count:0,state:null},r.set(t,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(r.rel==="stylesheet"&&typeof r.href=="string"&&typeof r.precedence=="string"){e=Aa(r.href);var d=Zr(l).hoistableStyles,y=d.get(e);if(y||(l=l.ownerDocument||l,y={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},d.set(e,y),(d=l.querySelector(_i(e)))&&!d._p&&(y.instance=d,y.state.loading=5),Qt.has(e)||(r={rel:"preload",as:"style",href:r.href,crossOrigin:r.crossOrigin,integrity:r.integrity,media:r.media,hrefLang:r.hrefLang,referrerPolicy:r.referrerPolicy},Qt.set(e,r),d||aw(l,e,r,y.state))),t&&i===null)throw Error(o(528,""));return y}if(t&&i!==null)throw Error(o(529,""));return null;case"script":return t=r.async,r=r.src,typeof r=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Da(r),r=Zr(l).hoistableScripts,i=r.get(t),i||(i={type:"script",instance:null,count:0,state:null},r.set(t,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(o(444,e))}}function Aa(e){return'href="'+Yt(e)+'"'}function _i(e){return'link[rel="stylesheet"]['+e+"]"}function Rg(e){return b({},e,{"data-precedence":e.precedence,precedence:null})}function aw(e,t,r,i){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?i.loading=1:(t=e.createElement("link"),i.preload=t,t.addEventListener("load",function(){return i.loading|=1}),t.addEventListener("error",function(){return i.loading|=2}),ht(t,"link",r),st(t),e.head.appendChild(t))}function Da(e){return'[src="'+Yt(e)+'"]'}function Vi(e){return"script[async]"+e}function Og(e,t,r){if(t.count++,t.instance===null)switch(t.type){case"style":var i=e.querySelector('style[data-href~="'+Yt(r.href)+'"]');if(i)return t.instance=i,st(i),i;var l=b({},r,{"data-href":r.href,"data-precedence":r.precedence,href:null,precedence:null});return i=(e.ownerDocument||e).createElement("style"),st(i),ht(i,"style",l),vo(i,r.precedence,e),t.instance=i;case"stylesheet":l=Aa(r.href);var d=e.querySelector(_i(l));if(d)return t.state.loading|=4,t.instance=d,st(d),d;i=Rg(r),(l=Qt.get(l))&&Cu(i,l),d=(e.ownerDocument||e).createElement("link"),st(d);var y=d;return y._p=new Promise(function(w,D){y.onload=w,y.onerror=D}),ht(d,"link",i),t.state.loading|=4,vo(d,r.precedence,e),t.instance=d;case"script":return d=Da(r.src),(l=e.querySelector(Vi(d)))?(t.instance=l,st(l),l):(i=r,(l=Qt.get(d))&&(i=b({},r),Au(i,l)),e=e.ownerDocument||e,l=e.createElement("script"),st(l),ht(l,"link",i),e.head.appendChild(l),t.instance=l);case"void":return null;default:throw Error(o(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(i=t.instance,t.state.loading|=4,vo(i,r.precedence,e));return t.instance}function vo(e,t,r){for(var i=r.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),l=i.length?i[i.length-1]:null,d=l,y=0;y<i.length;y++){var w=i[y];if(w.dataset.precedence===t)d=w;else if(d!==l)break}d?d.parentNode.insertBefore(e,d.nextSibling):(t=r.nodeType===9?r.head:r,t.insertBefore(e,t.firstChild))}function Cu(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function Au(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var bo=null;function zg(e,t,r){if(bo===null){var i=new Map,l=bo=new Map;l.set(r,i)}else l=bo,i=l.get(r),i||(i=new Map,l.set(r,i));if(i.has(e))return i;for(i.set(e,null),r=r.getElementsByTagName(e),l=0;l<r.length;l++){var d=r[l];if(!(d[Wa]||d[ct]||e==="link"&&d.getAttribute("rel")==="stylesheet")&&d.namespaceURI!=="http://www.w3.org/2000/svg"){var y=d.getAttribute(t)||"";y=e+y;var w=i.get(y);w?w.push(d):i.set(y,[d])}}return i}function _g(e,t,r){e=e.ownerDocument||e,e.head.insertBefore(r,t==="title"?e.querySelector("head > title"):null)}function iw(e,t,r){if(r===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function Vg(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function sw(e,t,r,i){if(r.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&(r.state.loading&4)===0){if(r.instance===null){var l=Aa(i.href),d=t.querySelector(_i(l));if(d){t=d._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=xo.bind(e),t.then(e,e)),r.state.loading|=4,r.instance=d,st(d);return}d=t.ownerDocument||t,i=Rg(i),(l=Qt.get(l))&&Cu(i,l),d=d.createElement("link"),st(d);var y=d;y._p=new Promise(function(w,D){y.onload=w,y.onerror=D}),ht(d,"link",i),r.instance=d}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(r,t),(t=r.state.preload)&&(r.state.loading&3)===0&&(e.count++,r=xo.bind(e),t.addEventListener("load",r),t.addEventListener("error",r))}}var Du=0;function ow(e,t){return e.stylesheets&&e.count===0&&wo(e,e.stylesheets),0<e.count||0<e.imgCount?function(r){var i=setTimeout(function(){if(e.stylesheets&&wo(e,e.stylesheets),e.unsuspend){var d=e.unsuspend;e.unsuspend=null,d()}},6e4+t);0<e.imgBytes&&Du===0&&(Du=62500*qS());var l=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&wo(e,e.stylesheets),e.unsuspend)){var d=e.unsuspend;e.unsuspend=null,d()}},(e.imgBytes>Du?50:800)+t);return e.unsuspend=r,function(){e.unsuspend=null,clearTimeout(i),clearTimeout(l)}}:null}function xo(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)wo(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var So=null;function wo(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,So=new Map,t.forEach(lw,e),So=null,xo.call(e))}function lw(e,t){if(!(t.state.loading&4)){var r=So.get(e);if(r)var i=r.get(null);else{r=new Map,So.set(e,r);for(var l=e.querySelectorAll("link[data-precedence],style[data-precedence]"),d=0;d<l.length;d++){var y=l[d];(y.nodeName==="LINK"||y.getAttribute("media")!=="not all")&&(r.set(y.dataset.precedence,y),i=y)}i&&r.set(null,i)}l=t.instance,y=l.getAttribute("data-precedence"),d=r.get(y)||i,d===i&&r.set(null,l),r.set(y,l),this.count++,i=xo.bind(this),l.addEventListener("load",i),l.addEventListener("error",i),d?d.parentNode.insertBefore(l,d.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(l,e.firstChild)),t.state.loading|=4}}var Bi={$$typeof:V,Provider:null,Consumer:null,_currentValue:K,_currentValue2:K,_threadCount:0};function cw(e,t,r,i,l,d,y,w,D){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=jl(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=jl(0),this.hiddenUpdates=jl(null),this.identifierPrefix=i,this.onUncaughtError=l,this.onCaughtError=d,this.onRecoverableError=y,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=D,this.incompleteTransitions=new Map}function Bg(e,t,r,i,l,d,y,w,D,q,Z,I){return e=new cw(e,t,r,y,D,q,Z,I,w),t=1,d===!0&&(t|=24),d=Ot(3,null,null,t),e.current=d,d.stateNode=e,t=oc(),t.refCount++,e.pooledCache=t,t.refCount++,d.memoizedState={element:i,isDehydrated:r,cache:t},dc(d),e}function Lg(e){return e?(e=ia,e):ia}function Ug(e,t,r,i,l,d){l=Lg(l),i.context===null?i.context=l:i.pendingContext=l,i=Zn(t),i.payload={element:r},d=d===void 0?null:d,d!==null&&(i.callback=d),r=Qn(e,i,t),r!==null&&(Dt(r,e,t),pi(r,e,t))}function Hg(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var r=e.retryLane;e.retryLane=r!==0&&r<t?r:t}}function Nu(e,t){Hg(e,t),(e=e.alternate)&&Hg(e,t)}function qg(e){if(e.tag===13||e.tag===31){var t=Tr(e,67108864);t!==null&&Dt(t,e,67108864),Nu(e,67108864)}}function Yg(e){if(e.tag===13||e.tag===31){var t=Lt();t=El(t);var r=Tr(e,t);r!==null&&Dt(r,e,t),Nu(e,t)}}var jo=!0;function uw(e,t,r,i){var l=U.T;U.T=null;var d=se.p;try{se.p=2,Mu(e,t,r,i)}finally{se.p=d,U.T=l}}function dw(e,t,r,i){var l=U.T;U.T=null;var d=se.p;try{se.p=8,Mu(e,t,r,i)}finally{se.p=d,U.T=l}}function Mu(e,t,r,i){if(jo){var l=ku(i);if(l===null)gu(e,t,i,Eo,r),Pg(e,i);else if(hw(l,e,t,r,i))i.stopPropagation();else if(Pg(e,i),t&4&&-1<fw.indexOf(e)){for(;l!==null;){var d=Kr(l);if(d!==null)switch(d.tag){case 3:if(d=d.stateNode,d.current.memoizedState.isDehydrated){var y=xr(d.pendingLanes);if(y!==0){var w=d;for(w.pendingLanes|=2,w.entangledLanes|=2;y;){var D=1<<31-kt(y);w.entanglements[1]|=D,y&=~D}fn(d),(Re&6)===0&&(io=Nt()+500,ki(0))}}break;case 31:case 13:w=Tr(d,2),w!==null&&Dt(w,d,2),oo(),Nu(d,2)}if(d=ku(i),d===null&&gu(e,t,i,Eo,r),d===l)break;l=d}l!==null&&i.stopPropagation()}else gu(e,t,i,null,r)}}function ku(e){return e=Ol(e),Ru(e)}var Eo=null;function Ru(e){if(Eo=null,e=Fr(e),e!==null){var t=h(e);if(t===null)e=null;else{var r=t.tag;if(r===13){if(e=f(t),e!==null)return e;e=null}else if(r===31){if(e=m(t),e!==null)return e;e=null}else if(r===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Eo=e,null}function Gg(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(J0()){case Jf:return 2;case Wf:return 8;case fs:case W0:return 32;case If:return 268435456;default:return 32}default:return 32}}var Ou=!1,or=null,lr=null,cr=null,Li=new Map,Ui=new Map,ur=[],fw="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Pg(e,t){switch(e){case"focusin":case"focusout":or=null;break;case"dragenter":case"dragleave":lr=null;break;case"mouseover":case"mouseout":cr=null;break;case"pointerover":case"pointerout":Li.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ui.delete(t.pointerId)}}function Hi(e,t,r,i,l,d){return e===null||e.nativeEvent!==d?(e={blockedOn:t,domEventName:r,eventSystemFlags:i,nativeEvent:d,targetContainers:[l]},t!==null&&(t=Kr(t),t!==null&&qg(t)),e):(e.eventSystemFlags|=i,t=e.targetContainers,l!==null&&t.indexOf(l)===-1&&t.push(l),e)}function hw(e,t,r,i,l){switch(t){case"focusin":return or=Hi(or,e,t,r,i,l),!0;case"dragenter":return lr=Hi(lr,e,t,r,i,l),!0;case"mouseover":return cr=Hi(cr,e,t,r,i,l),!0;case"pointerover":var d=l.pointerId;return Li.set(d,Hi(Li.get(d)||null,e,t,r,i,l)),!0;case"gotpointercapture":return d=l.pointerId,Ui.set(d,Hi(Ui.get(d)||null,e,t,r,i,l)),!0}return!1}function Xg(e){var t=Fr(e.target);if(t!==null){var r=h(t);if(r!==null){if(t=r.tag,t===13){if(t=f(r),t!==null){e.blockedOn=t,ih(e.priority,function(){Yg(r)});return}}else if(t===31){if(t=m(r),t!==null){e.blockedOn=t,ih(e.priority,function(){Yg(r)});return}}else if(t===3&&r.stateNode.current.memoizedState.isDehydrated){e.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}e.blockedOn=null}function To(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var r=ku(e.nativeEvent);if(r===null){r=e.nativeEvent;var i=new r.constructor(r.type,r);Rl=i,r.target.dispatchEvent(i),Rl=null}else return t=Kr(r),t!==null&&qg(t),e.blockedOn=r,!1;t.shift()}return!0}function $g(e,t,r){To(e)&&r.delete(t)}function mw(){Ou=!1,or!==null&&To(or)&&(or=null),lr!==null&&To(lr)&&(lr=null),cr!==null&&To(cr)&&(cr=null),Li.forEach($g),Ui.forEach($g)}function Co(e,t){e.blockedOn===t&&(e.blockedOn=null,Ou||(Ou=!0,n.unstable_scheduleCallback(n.unstable_NormalPriority,mw)))}var Ao=null;function Fg(e){Ao!==e&&(Ao=e,n.unstable_scheduleCallback(n.unstable_NormalPriority,function(){Ao===e&&(Ao=null);for(var t=0;t<e.length;t+=3){var r=e[t],i=e[t+1],l=e[t+2];if(typeof i!="function"){if(Ru(i||r)===null)continue;break}var d=Kr(r);d!==null&&(e.splice(t,3),t-=3,kc(d,{pending:!0,data:l,method:r.method,action:i},i,l))}}))}function Na(e){function t(D){return Co(D,e)}or!==null&&Co(or,e),lr!==null&&Co(lr,e),cr!==null&&Co(cr,e),Li.forEach(t),Ui.forEach(t);for(var r=0;r<ur.length;r++){var i=ur[r];i.blockedOn===e&&(i.blockedOn=null)}for(;0<ur.length&&(r=ur[0],r.blockedOn===null);)Xg(r),r.blockedOn===null&&ur.shift();if(r=(e.ownerDocument||e).$$reactFormReplay,r!=null)for(i=0;i<r.length;i+=3){var l=r[i],d=r[i+1],y=l[wt]||null;if(typeof d=="function")y||Fg(r);else if(y){var w=null;if(d&&d.hasAttribute("formAction")){if(l=d,y=d[wt]||null)w=y.formAction;else if(Ru(l)!==null)continue}else w=y.action;typeof w=="function"?r[i+1]=w:(r.splice(i,3),i-=3),Fg(r)}}}function Kg(){function e(d){d.canIntercept&&d.info==="react-transition"&&d.intercept({handler:function(){return new Promise(function(y){return l=y})},focusReset:"manual",scroll:"manual"})}function t(){l!==null&&(l(),l=null),i||setTimeout(r,20)}function r(){if(!i&&!navigation.transition){var d=navigation.currentEntry;d&&d.url!=null&&navigation.navigate(d.url,{state:d.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,l=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(r,100),function(){i=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),l!==null&&(l(),l=null)}}}function zu(e){this._internalRoot=e}Do.prototype.render=zu.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(o(409));var r=t.current,i=Lt();Ug(r,i,e,t,null,null)},Do.prototype.unmount=zu.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Ug(e.current,2,null,e,null,null),oo(),t[$r]=null}};function Do(e){this._internalRoot=e}Do.prototype.unstable_scheduleHydration=function(e){if(e){var t=ah();e={blockedOn:null,target:e,priority:t};for(var r=0;r<ur.length&&t!==0&&t<ur[r].priority;r++);ur.splice(r,0,e),r===0&&Xg(e)}};var Zg=a.version;if(Zg!=="19.2.8")throw Error(o(527,Zg,"19.2.8"));se.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(o(188)):(e=Object.keys(e).join(","),Error(o(268,e)));return e=g(t),e=e!==null?v(e):null,e=e===null?null:e.stateNode,e};var pw={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:U,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var No=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!No.isDisabled&&No.supportsFiber)try{Za=No.inject(pw),Mt=No}catch{}}return Yi.createRoot=function(e,t){if(!c(e))throw Error(o(299));var r=!1,i="",l=np,d=rp,y=ap;return t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onUncaughtError!==void 0&&(l=t.onUncaughtError),t.onCaughtError!==void 0&&(d=t.onCaughtError),t.onRecoverableError!==void 0&&(y=t.onRecoverableError)),t=Bg(e,1,!1,null,null,r,i,null,l,d,y,Kg),e[$r]=t.current,pu(e),new zu(t)},Yi.hydrateRoot=function(e,t,r){if(!c(e))throw Error(o(299));var i=!1,l="",d=np,y=rp,w=ap,D=null;return r!=null&&(r.unstable_strictMode===!0&&(i=!0),r.identifierPrefix!==void 0&&(l=r.identifierPrefix),r.onUncaughtError!==void 0&&(d=r.onUncaughtError),r.onCaughtError!==void 0&&(y=r.onCaughtError),r.onRecoverableError!==void 0&&(w=r.onRecoverableError),r.formState!==void 0&&(D=r.formState)),t=Bg(e,1,!0,t,r??null,i,l,D,d,y,w,Kg),t.context=Lg(null),r=t.current,i=Lt(),i=El(i),l=Zn(i),l.callback=null,Qn(r,l,i),r=i,t.current.lanes=r,Ja(t,r),fn(t),e[$r]=t.current,pu(e),new Do(t)},Yi.version="19.2.8",Yi}var iy;function Tw(){if(iy)return Bu.exports;iy=1;function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(a){console.error(a)}}return n(),Bu.exports=Ew(),Bu.exports}var of=Tw();const Cw=tb(of),lf=S.createContext({});function cf(n){const a=S.useRef(null);return a.current===null&&(a.current=n()),a.current}const Aw=typeof window<"u",uf=Aw?S.useLayoutEffect:S.useEffect,fl=S.createContext(null);function df(n,a){n.indexOf(a)===-1&&n.push(a)}function el(n,a){const s=n.indexOf(a);s>-1&&n.splice(s,1)}const vn=(n,a,s)=>s>a?a:s<n?n:s;let hl=()=>{};const gr={},ab=n=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n),ib=n=>typeof n=="object"&&n!==null,sb=n=>/^0[^.\s]+$/u.test(n);function ob(n){let a;return()=>(a===void 0&&(a=n()),a)}const It=n=>n,ss=(...n)=>n.reduce((a,s)=>o=>s(a(o))),Wi=(n,a,s)=>{const o=a-n;return o?(s-n)/o:1};class ff{constructor(){this.subscriptions=[]}add(a){return df(this.subscriptions,a),()=>el(this.subscriptions,a)}notify(a,s,o){const c=this.subscriptions.length;if(c)if(c===1)this.subscriptions[0](a,s,o);else for(let h=0;h<c;h++){const f=this.subscriptions[h];f&&f(a,s,o)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}}const Ht=n=>n*1e3,Wt=n=>n/1e3,lb=(n,a)=>a?n*(1e3/a):0,cb=(n,a,s)=>(((1-3*s+3*a)*n+(3*s-6*a))*n+3*a)*n,Dw=1e-7,Nw=12;function Mw(n,a,s,o,c){let h,f,m=0;do f=a+(s-a)/2,h=cb(f,o,c)-n,h>0?s=f:a=f;while(Math.abs(h)>Dw&&++m<Nw);return f}function os(n,a,s,o){if(n===a&&s===o)return It;const c=h=>Mw(h,0,1,n,s);return h=>h===0||h===1?h:cb(c(h),a,o)}const ub=n=>a=>a<=.5?n(2*a)/2:(2-n(2*(1-a)))/2,db=n=>a=>1-n(1-a),fb=os(.33,1.53,.69,.99),hf=db(fb),hb=ub(hf),mb=n=>n>=1?1:(n*=2)<1?.5*hf(n):.5*(2-Math.pow(2,-10*(n-1))),mf=n=>1-Math.sin(Math.acos(n)),pb=db(mf),gb=ub(mf),kw=os(.42,0,1,1),Rw=os(0,0,.58,1),yb=os(.42,0,.58,1),Ow=n=>Array.isArray(n)&&typeof n[0]!="number",vb=n=>Array.isArray(n)&&typeof n[0]=="number",zw={linear:It,easeIn:kw,easeInOut:yb,easeOut:Rw,circIn:mf,circInOut:gb,circOut:pb,backIn:hf,backInOut:hb,backOut:fb,anticipate:mb},_w=n=>typeof n=="string",sy=n=>{if(vb(n)){hl(n.length===4);const[a,s,o,c]=n;return os(a,s,o,c)}else if(_w(n))return zw[n];return n},Mo=["setup","read","resolveKeyframes","preUpdate","update","preRender","render","postRender"];function Vw(n){let a=new Set,s=new Set,o=!1,c=!1;const h=new WeakSet;let f={delta:0,timestamp:0,isProcessing:!1};function m(g){h.has(g)&&(p.schedule(g),n()),g(f)}const p={schedule:(g,v=!1,b=!1)=>{const j=b&&o?a:s;return v&&h.add(g),j.add(g),g},cancel:g=>{s.delete(g),h.delete(g)},process:g=>{if(f=g,o){c=!0;return}o=!0;const v=a;a=s,s=v,a.forEach(m),a.clear(),o=!1,c&&(c=!1,p.process(g))}};return p}const Bw=40;function bb(n,a){let s=!1,o=!0;const c={delta:0,timestamp:0,isProcessing:!1},h=()=>s=!0,f=Mo.reduce((V,_)=>(V[_]=Vw(h),V),{}),{setup:m,read:p,resolveKeyframes:g,preUpdate:v,update:b,preRender:x,render:j,postRender:E}=f,C=()=>{const V=gr.useManualTiming,_=V?c.timestamp:performance.now();s=!1,V||(c.delta=o?1e3/60:Math.max(Math.min(_-c.timestamp,Bw),1)),c.timestamp=_,c.isProcessing=!0,m.process(c),p.process(c),g.process(c),v.process(c),b.process(c),x.process(c),j.process(c),E.process(c),c.isProcessing=!1,s&&a&&(o=!1,n(C))},A=()=>{s=!0,o=!0,c.isProcessing||n(C)};return{schedule:Mo.reduce((V,_)=>{const L=f[_];return V[_]=(Y,N=!1,M=!1)=>(s||A(),L.schedule(Y,N,M)),V},{}),cancel:V=>{for(let _=0;_<Mo.length;_++)f[Mo[_]].cancel(V)},state:c,steps:f}}const{schedule:qe,cancel:yr,state:mt,steps:qu}=bb(typeof requestAnimationFrame<"u"?requestAnimationFrame:It,!0);let Go;function Lw(){Go=void 0}const bt={now:()=>(Go===void 0&&bt.set(mt.isProcessing||gr.useManualTiming?mt.timestamp:performance.now()),Go),set:n=>{Go=n,queueMicrotask(Lw)}},xb=n=>a=>typeof a=="string"&&a.startsWith(n),Sb=xb("--"),Uw=xb("var(--"),pf=n=>Uw(n)?Hw.test(n.split("/*")[0].trim()):!1,Hw=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;function oy(n){return typeof n!="string"?!1:n.split("/*")[0].includes("var(--")}const Pa={test:n=>typeof n=="number",parse:parseFloat,transform:n=>n},Ii={...Pa,transform:n=>vn(0,1,n)},ko={...Pa,default:1},Fi=n=>Math.round(n*1e5)/1e5,gf=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function qw(n){return n==null}const Yw=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,yf=(n,a)=>s=>!!(typeof s=="string"&&Yw.test(s)&&s.startsWith(n)||a&&!qw(s)&&Object.prototype.hasOwnProperty.call(s,a)),wb=(n,a,s)=>o=>{if(typeof o!="string")return o;const[c,h,f,m]=o.match(gf);return{[n]:parseFloat(c),[a]:parseFloat(h),[s]:parseFloat(f),alpha:m!==void 0?parseFloat(m):1}},Gw=n=>vn(0,255,n),Yu={...Pa,transform:n=>Math.round(Gw(n))},Hr={test:yf("rgb","red"),parse:wb("red","green","blue"),transform:({red:n,green:a,blue:s,alpha:o=1})=>"rgba("+Yu.transform(n)+", "+Yu.transform(a)+", "+Yu.transform(s)+", "+Fi(Ii.transform(o))+")"};function Pw(n){let a="",s="",o="",c="";return n.length>5?(a=n.substring(1,3),s=n.substring(3,5),o=n.substring(5,7),c=n.substring(7,9)):(a=n.substring(1,2),s=n.substring(2,3),o=n.substring(3,4),c=n.substring(4,5),a+=a,s+=s,o+=o,c+=c),{red:parseInt(a,16),green:parseInt(s,16),blue:parseInt(o,16),alpha:c?parseInt(c,16)/255:1}}const pd={test:yf("#"),parse:Pw,transform:Hr.transform},ls=n=>({test:a=>typeof a=="string"&&a.endsWith(n)&&a.split(" ").length===1,parse:parseFloat,transform:a=>`${a}${n}`}),Ln=ls("deg"),yn=ls("%"),de=ls("px"),Xw=ls("vh"),$w=ls("vw"),ly={...yn,parse:n=>yn.parse(n)/100,transform:n=>yn.transform(n*100)},_a={test:yf("hsl","hue"),parse:wb("hue","saturation","lightness"),transform:({hue:n,saturation:a,lightness:s,alpha:o=1})=>"hsla("+Math.round(n)+", "+yn.transform(Fi(a))+", "+yn.transform(Fi(s))+", "+Fi(Ii.transform(o))+")"},rt={test:n=>Hr.test(n)||pd.test(n)||_a.test(n),parse:n=>Hr.test(n)?Hr.parse(n):_a.test(n)?_a.parse(n):pd.parse(n),transform:n=>typeof n=="string"?n:n.hasOwnProperty("red")?Hr.transform(n):_a.transform(n),getAnimatableNone:n=>{const a=rt.parse(n);return a.alpha=0,rt.transform(a)}},Fw=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;function Kw(n){var a,s;return isNaN(n)&&typeof n=="string"&&(((a=n.match(gf))==null?void 0:a.length)||0)+(((s=n.match(Fw))==null?void 0:s.length)||0)>0}const jb="number",Eb="color",Zw="var",Qw="var(",cy="${}",Jw=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function Ua(n){const a=n.toString(),s=[],o={color:[],number:[],var:[]},c=[];let h=0;const m=a.replace(Jw,p=>(rt.test(p)?(o.color.push(h),c.push(Eb),s.push(rt.parse(p))):p.startsWith(Qw)?(o.var.push(h),c.push(Zw),s.push(p)):(o.number.push(h),c.push(jb),s.push(parseFloat(p))),++h,cy)).split(cy);return{values:s,split:m,indexes:o,types:c}}function Ww(n){return Ua(n).values}function Tb({split:n,types:a}){const s=n.length;return o=>{let c="";for(let h=0;h<s;h++)if(c+=n[h],o[h]!==void 0){const f=a[h];f===jb?c+=Fi(o[h]):f===Eb?c+=rt.transform(o[h]):c+=o[h]}return c}}function Iw(n){return Tb(Ua(n))}const e2=n=>typeof n=="number"?0:rt.test(n)?rt.getAnimatableNone(n):n,t2=(n,a)=>typeof n=="number"?a!=null&&a.trim().endsWith("/")?n:0:e2(n);function n2(n){const a=Ua(n);return Tb(a)(a.values.map((o,c)=>t2(o,a.split[c])))}const on={test:Kw,parse:Ww,createTransformer:Iw,getAnimatableNone:n2};function Gu(n,a,s){return s<0&&(s+=1),s>1&&(s-=1),s<1/6?n+(a-n)*6*s:s<1/2?a:s<2/3?n+(a-n)*(2/3-s)*6:n}function r2({hue:n,saturation:a,lightness:s,alpha:o}){n/=360,a/=100,s/=100;let c=0,h=0,f=0;if(!a)c=h=f=s;else{const m=s<.5?s*(1+a):s+a-s*a,p=2*s-m;c=Gu(p,m,n+1/3),h=Gu(p,m,n),f=Gu(p,m,n-1/3)}return{red:Math.round(c*255),green:Math.round(h*255),blue:Math.round(f*255),alpha:o}}function tl(n,a){return s=>s>0?a:n}const He=(n,a,s)=>n+(a-n)*s,Pu=(n,a,s)=>{const o=n*n,c=s*(a*a-o)+o;return c<0?0:Math.sqrt(c)},a2=[pd,Hr,_a],i2=n=>a2.find(a=>a.test(n));function uy(n){const a=i2(n);if(!a)return!1;let s=a.parse(n);return a===_a&&(s=r2(s)),s}const dy=(n,a)=>{const s=uy(n),o=uy(a);if(!s||!o)return tl(n,a);const c={...s};return h=>(c.red=Pu(s.red,o.red,h),c.green=Pu(s.green,o.green,h),c.blue=Pu(s.blue,o.blue,h),c.alpha=He(s.alpha,o.alpha,h),Hr.transform(c))},gd=new Set(["none","hidden"]);function s2(n,a){return gd.has(n)?s=>s<=0?n:a:s=>s>=1?a:n}function o2(n,a){return s=>He(n,a,s)}function vf(n){return typeof n=="number"?o2:typeof n=="string"?pf(n)?tl:rt.test(n)?dy:u2:Array.isArray(n)?Cb:typeof n=="object"?rt.test(n)?dy:l2:tl}function Cb(n,a){const s=[...n],o=s.length,c=n.map((h,f)=>vf(h)(h,a[f]));return h=>{for(let f=0;f<o;f++)s[f]=c[f](h);return s}}function l2(n,a){const s={...n,...a},o={};for(const c in s)n[c]!==void 0&&a[c]!==void 0&&(o[c]=vf(n[c])(n[c],a[c]));return c=>{for(const h in o)s[h]=o[h](c);return s}}function c2(n,a){const s=[],o={color:0,var:0,number:0};for(let c=0;c<a.values.length;c++){const h=a.types[c],f=n.indexes[h][o[h]],m=n.values[f]??0;s[c]=m,o[h]++}return s}const u2=(n,a)=>{const s=on.createTransformer(a),o=Ua(n),c=Ua(a);return o.indexes.var.length===c.indexes.var.length&&o.indexes.color.length===c.indexes.color.length&&o.indexes.number.length>=c.indexes.number.length?gd.has(n)&&!c.values.length||gd.has(a)&&!o.values.length?s2(n,a):ss(Cb(c2(o,c),c.values),s):tl(n,a)};function Ab(n,a,s){return typeof n=="number"&&typeof a=="number"&&typeof s=="number"?He(n,a,s):vf(n)(n,a)}const d2=n=>{const a=({timestamp:s})=>n(s);return{start:(s=!0)=>qe.update(a,s),stop:()=>yr(a),now:()=>mt.isProcessing?mt.timestamp:bt.now()}},Db=(n,a,s=10)=>{let o="";const c=Math.max(Math.round(a/s),2);for(let h=0;h<c;h++)o+=Math.round(n(h/(c-1))*1e4)/1e4+", ";return`linear(${o.substring(0,o.length-2)})`},nl=2e4;function bf(n){let a=0;const s=50;let o=n.next(a);for(;!o.done&&a<nl;)a+=s,o=n.next(a);return a>=nl?1/0:a}function f2(n,a=100,s){const o=s({...n,keyframes:[0,a]}),c=Math.min(bf(o),nl);return{type:"keyframes",ease:h=>o.next(c*h).value/a,duration:Wt(c)}}const Ze={stiffness:100,damping:10,mass:1,velocity:0,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05,maxDamping:1};function yd(n,a){return n*Math.sqrt(1-a*a)}const h2=12;function m2(n,a,s){let o=s;for(let c=1;c<h2;c++)o=o-n(o)/a(o);return o}const Xu=.001;function p2({duration:n=Ze.duration,bounce:a=Ze.bounce,velocity:s=Ze.velocity,mass:o=Ze.mass}){let c,h,f=1-a;f=vn(Ze.minDamping,Ze.maxDamping,f),n=vn(Ze.minDuration,Ze.maxDuration,Wt(n)),f<1?(c=g=>{const v=g*f,b=v*n,x=v-s,j=yd(g,f),E=Math.exp(-b);return Xu-x/j*E},h=g=>{const b=g*f*n,x=b*s+s,j=Math.pow(f,2)*Math.pow(g,2)*n,E=Math.exp(-b),C=yd(Math.pow(g,2),f);return(-c(g)+Xu>0?-1:1)*((x-j)*E)/C}):(c=g=>{const v=Math.exp(-g*n),b=(g-s)*n+1;return-Xu+v*b},h=g=>{const v=Math.exp(-g*n),b=(s-g)*(n*n);return v*b});const m=5/n,p=m2(c,h,m);if(n=Ht(n),isNaN(p))return{stiffness:Ze.stiffness,damping:Ze.damping,duration:n};{const g=Math.pow(p,2)*o;return{stiffness:g,damping:f*2*Math.sqrt(o*g),duration:n}}}const g2=["duration","bounce"],y2=["stiffness","damping","mass"];function fy(n,a){return a.some(s=>n[s]!==void 0)}function v2(n){let a={velocity:Ze.velocity,stiffness:Ze.stiffness,damping:Ze.damping,mass:Ze.mass,isResolvedFromDuration:!1,...n};if(!fy(n,y2)&&fy(n,g2))if(a.velocity=0,n.visualDuration){const s=n.visualDuration,o=2*Math.PI/(s*1.2),c=o*o,h=2*vn(.05,1,1-(n.bounce||0))*Math.sqrt(c);a={...a,mass:Ze.mass,stiffness:c,damping:h}}else{const s=p2({...n,velocity:0});a={...a,...s,mass:Ze.mass},a.isResolvedFromDuration=!0}return a}function rl(n=Ze.visualDuration,a=Ze.bounce){const s=typeof n!="object"?{visualDuration:n,keyframes:[0,1],bounce:a}:n;let{restSpeed:o,restDelta:c}=s;const h=s.keyframes[0],f=s.keyframes[s.keyframes.length-1],m={done:!1,value:h},{stiffness:p,damping:g,mass:v,duration:b,velocity:x,isResolvedFromDuration:j}=v2({...s,velocity:-Wt(s.velocity||0)}),E=x||0,C=g/(2*Math.sqrt(p*v)),A=f-h,z=Wt(Math.sqrt(p/v)),k=Math.abs(A)<5;o||(o=k?Ze.restSpeed.granular:Ze.restSpeed.default),c||(c=k?Ze.restDelta.granular:Ze.restDelta.default);let V,_,L,Y,N,M;if(C<1)L=yd(z,C),Y=(E+C*z*A)/L,V=F=>{const ne=Math.exp(-C*z*F);return f-ne*(Y*Math.sin(L*F)+A*Math.cos(L*F))},N=C*z*Y+A*L,M=C*z*A-Y*L,_=F=>Math.exp(-C*z*F)*(N*Math.sin(L*F)+M*Math.cos(L*F));else if(C===1){V=ne=>f-Math.exp(-z*ne)*(A+(E+z*A)*ne);const F=E+z*A;_=ne=>Math.exp(-z*ne)*(z*F*ne-E)}else{const F=z*Math.sqrt(C*C-1);V=le=>{const ve=Math.exp(-C*z*le),U=Math.min(F*le,300);return f-ve*((E+C*z*A)*Math.sinh(U)+F*A*Math.cosh(U))/F};const ne=(E+C*z*A)/F,ie=C*z*ne-A*F,pe=C*z*A-ne*F;_=le=>{const ve=Math.exp(-C*z*le),U=Math.min(F*le,300);return ve*(ie*Math.sinh(U)+pe*Math.cosh(U))}}const X={calculatedDuration:j&&b||null,velocity:F=>Ht(_(F)),next:F=>{if(!j&&C<1){const ie=Math.exp(-C*z*F),pe=Math.sin(L*F),le=Math.cos(L*F),ve=f-ie*(Y*pe+A*le),U=Ht(ie*(N*pe+M*le));return m.done=Math.abs(U)<=o&&Math.abs(f-ve)<=c,m.value=m.done?f:ve,m}const ne=V(F);if(j)m.done=F>=b;else{const ie=Ht(_(F));m.done=Math.abs(ie)<=o&&Math.abs(f-ne)<=c}return m.value=m.done?f:ne,m},toString:()=>{const F=Math.min(bf(X),nl),ne=Db(ie=>X.next(F*ie).value,F,30);return F+"ms "+ne},toTransition:()=>{}};return X}rl.applyToOptions=n=>{const a=f2(n,100,rl);return n.ease=a.ease,n.duration=Ht(a.duration),n.type="keyframes",n};const b2=5;function Nb(n,a,s){const o=Math.max(a-b2,0);return lb(s-n(o),a-o)}function vd({keyframes:n,velocity:a=0,power:s=.8,timeConstant:o=325,bounceDamping:c=10,bounceStiffness:h=500,modifyTarget:f,min:m,max:p,restDelta:g=.5,restSpeed:v}){const b=n[0],x={done:!1,value:b},j=M=>m!==void 0&&M<m||p!==void 0&&M>p,E=M=>m===void 0?p:p===void 0||Math.abs(m-M)<Math.abs(p-M)?m:p;let C=s*a;const A=b+C,z=f===void 0?A:f(A);z!==A&&(C=z-b);const k=M=>-C*Math.exp(-M/o),V=M=>z+k(M),_=M=>{const X=k(M),F=V(M);x.done=Math.abs(X)<=g,x.value=x.done?z:F};let L,Y;const N=M=>{j(x.value)&&(L=M,Y=rl({keyframes:[x.value,E(x.value)],velocity:Nb(V,M,x.value),damping:c,stiffness:h,restDelta:g,restSpeed:v}))};return N(0),{calculatedDuration:null,next:M=>{let X=!1;return!Y&&L===void 0&&(X=!0,_(M),N(M)),L!==void 0&&M>=L?Y.next(M-L):(!X&&_(M),x)}}}function x2(n,a,s){const o=[],c=s||gr.mix||Ab,h=n.length-1;for(let f=0;f<h;f++){let m=c(n[f],n[f+1]);if(a){const p=Array.isArray(a)?a[f]||It:a;m=ss(p,m)}o.push(m)}return o}function S2(n,a,{clamp:s=!0,ease:o,mixer:c}={}){const h=n.length;if(hl(h===a.length),h===1)return()=>a[0];if(h===2&&a[0]===a[1])return()=>a[1];const f=n[0]===n[1];n[0]>n[h-1]&&(n=[...n].reverse(),a=[...a].reverse());const m=x2(a,o,c),p=m.length,g=v=>{if(f&&v<n[0])return a[0];let b=0;if(p>1)for(;b<n.length-2&&!(v<n[b+1]);b++);const x=Wi(n[b],n[b+1],v);return m[b](x)};return s?v=>g(vn(n[0],n[h-1],v)):g}function w2(n,a){const s=n[n.length-1];for(let o=1;o<=a;o++){const c=Wi(0,a,o);n.push(He(s,1,c))}}function j2(n){const a=[0];return w2(a,n.length-1),a}function E2(n,a){return n.map(s=>s*a)}function T2(n,a){return n.map(()=>a||yb).splice(0,n.length-1)}function Ki({duration:n=300,keyframes:a,times:s,ease:o="easeInOut"}){const c=Ow(o)?o.map(sy):sy(o),h={done:!1,value:a[0]},f=E2(s&&s.length===a.length?s:j2(a),n),m=S2(f,a,{ease:Array.isArray(c)?c:T2(a,c)});return{calculatedDuration:n,next:p=>(h.value=m(p),h.done=p>=n,h)}}const C2=n=>n!==null;function ml(n,{repeat:a,repeatType:s="loop"},o,c=1){const h=n.filter(C2),m=c<0||a&&s!=="loop"&&a%2===1?0:h.length-1;return!m||o===void 0?h[m]:o}const A2={decay:vd,inertia:vd,tween:Ki,keyframes:Ki,spring:rl};function Mb(n){typeof n.type=="string"&&(n.type=A2[n.type])}class xf{constructor(){this.updateFinished()}get finished(){return this._finished}updateFinished(){this._finished=new Promise(a=>{this.resolve=a})}notifyFinished(){this.resolve()}then(a,s){return this.finished.then(a,s)}}const D2=n=>n/100;class al extends xf{constructor(a){super(),this.state="idle",this.startTime=null,this.isStopped=!1,this.currentTime=0,this.holdTime=null,this.playbackSpeed=1,this.delayState={done:!1,value:void 0},this.stop=()=>{var o,c;const{motionValue:s}=this.options;s&&s.updatedAt!==bt.now()&&this.tick(bt.now()),this.isStopped=!0,this.state!=="idle"&&(this.teardown(),(c=(o=this.options).onStop)==null||c.call(o))},this.options=a,this.initAnimation(),this.play(),a.autoplay===!1&&this.pause()}initAnimation(){const{options:a}=this;Mb(a);const{type:s=Ki,repeat:o=0,repeatDelay:c=0,repeatType:h,velocity:f=0}=a;let{keyframes:m}=a;const p=s||Ki;p!==Ki&&typeof m[0]!="number"&&(this.mixKeyframes=ss(D2,Ab(m[0],m[1])),m=[0,100]);const g=p({...a,keyframes:m});h==="mirror"&&(this.mirroredGenerator=p({...a,keyframes:[...m].reverse(),velocity:-f})),g.calculatedDuration===null&&(g.calculatedDuration=bf(g));const{calculatedDuration:v}=g;this.calculatedDuration=v,this.resolvedDuration=v+c,this.totalDuration=this.resolvedDuration*(o+1)-c,this.generator=g}updateTime(a){const s=Math.round(a-this.startTime)*this.playbackSpeed;this.holdTime!==null?this.currentTime=this.holdTime:this.currentTime=s}tick(a,s=!1){const{generator:o,totalDuration:c,mixKeyframes:h,mirroredGenerator:f,resolvedDuration:m,calculatedDuration:p}=this;if(this.startTime===null)return o.next(0);const{delay:g=0,keyframes:v,repeat:b,repeatType:x,repeatDelay:j,type:E,onUpdate:C,finalKeyframe:A}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,a):this.speed<0&&(this.startTime=Math.min(a-c/this.speed,this.startTime)),s?this.currentTime=a:this.updateTime(a);const z=this.currentTime-g*(this.playbackSpeed>=0?1:-1),k=this.playbackSpeed>=0?z<0:z>c;this.currentTime=Math.max(z,0),this.state==="finished"&&this.holdTime===null&&(this.currentTime=c);let V=this.currentTime,_=o;if(b){const M=Math.min(this.currentTime,c)/m;let X=Math.floor(M),F=M%1;!F&&M>=1&&(F=1),F===1&&X--,X=Math.min(X,b+1),!!(X%2)&&(x==="reverse"?(F=1-F,j&&(F-=j/m)):x==="mirror"&&(_=f)),V=vn(0,1,F)*m}let L;k?(this.delayState.value=v[0],L=this.delayState):L=_.next(V),h&&!k&&(L.value=h(L.value));let{done:Y}=L;!k&&p!==null&&(Y=this.playbackSpeed>=0?this.currentTime>=c:this.currentTime<=0);const N=this.holdTime===null&&(this.state==="finished"||this.state==="running"&&Y);return N&&E!==vd&&(L.value=ml(v,this.options,A,this.speed)),C&&C(L.value),N&&this.finish(),L}then(a,s){return this.finished.then(a,s)}get duration(){return Wt(this.calculatedDuration)}get iterationDuration(){const{delay:a=0}=this.options||{};return this.duration+Wt(a)}get time(){return Wt(this.currentTime)}set time(a){a=Ht(a),this.currentTime=a,this.startTime===null||this.holdTime!==null||this.playbackSpeed===0?this.holdTime=a:this.driver&&(this.startTime=this.driver.now()-a/this.playbackSpeed),this.driver?this.driver.start(!1):(this.startTime=0,this.state="paused",this.holdTime=a,this.tick(a))}getGeneratorVelocity(){const a=this.currentTime;if(a<=0)return this.options.velocity||0;if(this.generator.velocity)return this.generator.velocity(a);const s=this.generator.next(a).value;return Nb(o=>this.generator.next(o).value,a,s)}get speed(){return this.playbackSpeed}set speed(a){const s=this.playbackSpeed!==a;s&&this.driver&&this.updateTime(bt.now()),this.playbackSpeed=a,s&&this.driver&&(this.time=Wt(this.currentTime))}play(){var c,h;if(this.isStopped)return;const{driver:a=d2,startTime:s}=this.options;this.driver||(this.driver=a(f=>this.tick(f))),(h=(c=this.options).onPlay)==null||h.call(c);const o=this.driver.now();this.state==="finished"?(this.updateFinished(),this.startTime=o):this.holdTime!==null?this.startTime=o-this.holdTime:this.startTime||(this.startTime=s??o),this.state==="finished"&&this.speed<0&&(this.startTime+=this.calculatedDuration),this.holdTime=null,this.state="running",this.driver.start()}pause(){this.state="paused",this.updateTime(bt.now()),this.holdTime=this.currentTime}complete(){this.state!=="running"&&this.play(),this.state="finished",this.holdTime=null}finish(){var a,s;this.notifyFinished(),this.teardown(),this.state="finished",(s=(a=this.options).onComplete)==null||s.call(a)}cancel(){var a,s;this.holdTime=null,this.startTime=0,this.tick(0),this.teardown(),(s=(a=this.options).onCancel)==null||s.call(a)}teardown(){this.state="idle",this.stopDriver(),this.startTime=this.holdTime=null}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(a){return this.startTime=0,this.tick(a,!0)}attachTimeline(a){var s;return this.options.allowFlatten&&(this.options.type="keyframes",this.options.ease="linear",this.initAnimation()),(s=this.driver)==null||s.stop(),a.observe(this)}}function N2(n){for(let a=1;a<n.length;a++)n[a]??(n[a]=n[a-1])}const qr=n=>n*180/Math.PI,bd=n=>{const a=qr(Math.atan2(n[1],n[0]));return xd(a)},M2={x:4,y:5,translateX:4,translateY:5,scaleX:0,scaleY:3,scale:n=>(Math.abs(n[0])+Math.abs(n[3]))/2,rotate:bd,rotateZ:bd,skewX:n=>qr(Math.atan(n[1])),skewY:n=>qr(Math.atan(n[2])),skew:n=>(Math.abs(n[1])+Math.abs(n[2]))/2},xd=n=>(n=n%360,n<0&&(n+=360),n),hy=bd,my=n=>Math.sqrt(n[0]*n[0]+n[1]*n[1]),py=n=>Math.sqrt(n[4]*n[4]+n[5]*n[5]),k2={x:12,y:13,z:14,translateX:12,translateY:13,translateZ:14,scaleX:my,scaleY:py,scale:n=>(my(n)+py(n))/2,rotateX:n=>xd(qr(Math.atan2(n[6],n[5]))),rotateY:n=>xd(qr(Math.atan2(-n[2],n[0]))),rotateZ:hy,rotate:hy,skewX:n=>qr(Math.atan(n[4])),skewY:n=>qr(Math.atan(n[1])),skew:n=>(Math.abs(n[1])+Math.abs(n[4]))/2};function Sd(n){return n.includes("scale")?1:0}function wd(n,a){if(!n||n==="none")return Sd(a);const s=n.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);let o,c;if(s)o=k2,c=s;else{const m=n.match(/^matrix\(([-\d.e\s,]+)\)$/u);o=M2,c=m}if(!c)return Sd(a);const h=o[a],f=c[1].split(",").map(O2);return typeof h=="function"?h(f):f[h]}const R2=(n,a)=>{const{transform:s="none"}=getComputedStyle(n);return wd(s,a)};function O2(n){return parseFloat(n.trim())}const Xa=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],$a=new Set([...Xa,"pathRotation"]),gy=n=>n===Pa||n===de,z2=new Set(["x","y","z"]),_2=Xa.filter(n=>!z2.has(n));function V2(n){const a=[];return _2.forEach(s=>{const o=n.getValue(s);o!==void 0&&(a.push([s,o.get()]),o.set(s.startsWith("scale")?1:0))}),a}const mr={width:({x:n},{paddingLeft:a="0",paddingRight:s="0",boxSizing:o})=>{const c=n.max-n.min;return o==="border-box"?c:c-parseFloat(a)-parseFloat(s)},height:({y:n},{paddingTop:a="0",paddingBottom:s="0",boxSizing:o})=>{const c=n.max-n.min;return o==="border-box"?c:c-parseFloat(a)-parseFloat(s)},top:(n,{top:a})=>parseFloat(a),left:(n,{left:a})=>parseFloat(a),bottom:({y:n},{top:a})=>parseFloat(a)+(n.max-n.min),right:({x:n},{left:a})=>parseFloat(a)+(n.max-n.min),x:(n,{transform:a})=>wd(a,"x"),y:(n,{transform:a})=>wd(a,"y")};mr.translateX=mr.x;mr.translateY=mr.y;const Yr=new Set;let jd=!1,Ed=!1,Td=!1;function kb(){if(Ed){const n=Array.from(Yr).filter(o=>o.needsMeasurement),a=new Set(n.map(o=>o.element)),s=new Map;a.forEach(o=>{const c=V2(o);c.length&&(s.set(o,c),o.render())}),n.forEach(o=>o.measureInitialState()),a.forEach(o=>{o.render();const c=s.get(o);c&&c.forEach(([h,f])=>{var m;(m=o.getValue(h))==null||m.set(f)})}),n.forEach(o=>o.measureEndState()),n.forEach(o=>{o.suspendedScrollY!==void 0&&window.scrollTo(0,o.suspendedScrollY)})}Ed=!1,jd=!1,Yr.forEach(n=>n.complete(Td)),Yr.clear()}function Rb(){Yr.forEach(n=>{n.readKeyframes(),n.needsMeasurement&&(Ed=!0)})}function B2(){Td=!0,Rb(),kb(),Td=!1}class Sf{constructor(a,s,o,c,h,f=!1){this.state="pending",this.isAsync=!1,this.needsMeasurement=!1,this.unresolvedKeyframes=[...a],this.onComplete=s,this.name=o,this.motionValue=c,this.element=h,this.isAsync=f}scheduleResolve(){this.state="scheduled",this.isAsync?(Yr.add(this),jd||(jd=!0,qe.read(Rb),qe.resolveKeyframes(kb))):(this.readKeyframes(),this.complete())}readKeyframes(){const{unresolvedKeyframes:a,name:s,element:o,motionValue:c}=this;if(a[0]===null){const h=c==null?void 0:c.get(),f=a[a.length-1];if(h!==void 0)a[0]=h;else if(o&&s){const m=o.readValue(s,f);m!=null&&(a[0]=m)}a[0]===void 0&&(a[0]=f),c&&h===void 0&&c.set(a[0])}N2(a)}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(a=!1){this.state="complete",this.onComplete(this.unresolvedKeyframes,this.finalKeyframe,a),Yr.delete(this)}cancel(){this.state==="scheduled"&&(Yr.delete(this),this.state="pending")}resume(){this.state==="pending"&&this.scheduleResolve()}}const L2=n=>n.startsWith("--");function Ob(n,a,s){L2(a)?n.style.setProperty(a,s):n.style[a]=s}const U2={};function zb(n,a){const s=ob(n);return()=>U2[a]??s()}const H2=zb(()=>window.ScrollTimeline!==void 0,"scrollTimeline"),_b=zb(()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0},"linearEasing"),Xi=([n,a,s,o])=>`cubic-bezier(${n}, ${a}, ${s}, ${o})`,yy={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:Xi([0,.65,.55,1]),circOut:Xi([.55,0,1,.45]),backIn:Xi([.31,.01,.66,-.59]),backOut:Xi([.33,1.53,.69,.99])};function Vb(n,a){if(n)return typeof n=="function"?_b()?Db(n,a):"ease-out":vb(n)?Xi(n):Array.isArray(n)?n.map(s=>Vb(s,a)||yy.easeOut):yy[n]}function q2(n,a,s,{delay:o=0,duration:c=300,repeat:h=0,repeatType:f="loop",ease:m="easeOut",times:p}={},g=void 0){const v={[a]:s};p&&(v.offset=p);const b=Vb(m,c);Array.isArray(b)&&(v.easing=b);const x={delay:o,duration:c,easing:Array.isArray(b)?"linear":b,fill:"both",iterations:h+1,direction:f==="reverse"?"alternate":"normal"};return g&&(x.pseudoElement=g),n.animate(v,x)}function Bb(n){return typeof n=="function"&&"applyToOptions"in n}function Y2({type:n,...a}){return Bb(n)&&_b()?n.applyToOptions(a):(a.duration??(a.duration=300),a.ease??(a.ease="easeOut"),a)}class Lb extends xf{constructor(a){if(super(),this.finishedTime=null,this.isStopped=!1,this.manualStartTime=null,!a)return;const{element:s,name:o,keyframes:c,pseudoElement:h,allowFlatten:f=!1,finalKeyframe:m,onComplete:p}=a;this.isPseudoElement=!!h,this.allowFlatten=f,this.options=a,hl(typeof a.type!="string");const g=Y2(a);this.animation=q2(s,o,c,g,h),g.autoplay===!1&&this.animation.pause(),this.animation.onfinish=()=>{if(this.finishedTime=this.time,!h){const v=ml(c,this.options,m,this.speed);this.updateMotionValue&&this.updateMotionValue(v),Ob(s,o,v),this.animation.cancel()}p==null||p(),this.notifyFinished()}}play(){this.isStopped||(this.manualStartTime=null,this.animation.play(),this.state==="finished"&&this.updateFinished())}pause(){this.animation.pause()}complete(){var a,s;(s=(a=this.animation).finish)==null||s.call(a)}cancel(){try{this.animation.cancel()}catch{}}stop(){if(this.isStopped)return;this.isStopped=!0;const{state:a}=this;a==="idle"||a==="finished"||(this.updateMotionValue?this.updateMotionValue():this.commitStyles(),this.isPseudoElement||this.cancel())}commitStyles(){var s,o,c;const a=(s=this.options)==null?void 0:s.element;!this.isPseudoElement&&(a!=null&&a.isConnected)&&((c=(o=this.animation).commitStyles)==null||c.call(o))}get duration(){var s,o;const a=((o=(s=this.animation.effect)==null?void 0:s.getComputedTiming)==null?void 0:o.call(s).duration)||0;return Wt(Number(a))}get iterationDuration(){const{delay:a=0}=this.options||{};return this.duration+Wt(a)}get time(){return Wt(Number(this.animation.currentTime)||0)}set time(a){const s=this.finishedTime!==null;this.manualStartTime=null,this.finishedTime=null,this.animation.currentTime=Ht(a),s&&this.animation.pause()}get speed(){return this.animation.playbackRate}set speed(a){a<0&&(this.finishedTime=null),this.animation.playbackRate=a}get state(){return this.finishedTime!==null?"finished":this.animation.playState}get startTime(){return this.manualStartTime??Number(this.animation.startTime)}set startTime(a){this.manualStartTime=this.animation.startTime=a}attachTimeline({timeline:a,rangeStart:s,rangeEnd:o,observe:c}){var h;return this.allowFlatten&&((h=this.animation.effect)==null||h.updateTiming({easing:"linear"})),this.animation.onfinish=null,a&&H2()?(this.animation.timeline=a,s&&(this.animation.rangeStart=s),o&&(this.animation.rangeEnd=o),It):c(this)}}const Ub={anticipate:mb,backInOut:hb,circInOut:gb};function G2(n){return n in Ub}function P2(n){typeof n.ease=="string"&&G2(n.ease)&&(n.ease=Ub[n.ease])}const $u=10;class X2 extends Lb{constructor(a){P2(a),Mb(a),super(a),a.startTime!==void 0&&a.autoplay!==!1&&(this.startTime=a.startTime),this.options=a}updateMotionValue(a){const{motionValue:s,onUpdate:o,onComplete:c,element:h,...f}=this.options;if(!s)return;if(a!==void 0){s.set(a);return}const m=new al({...f,autoplay:!1}),p=Math.max($u,bt.now()-this.startTime),g=vn(0,$u,p-$u),v=m.sample(p).value,{name:b}=this.options;h&&b&&Ob(h,b,v),s.setWithVelocity(m.sample(Math.max(0,p-g)).value,v,g),m.stop()}}const vy=(n,a)=>a==="zIndex"?!1:!!(typeof n=="number"||Array.isArray(n)||typeof n=="string"&&(on.test(n)||n==="0")&&!n.startsWith("url("));function $2(n){const a=n[0];if(n.length===1)return!0;for(let s=0;s<n.length;s++)if(n[s]!==a)return!0}function F2(n,a,s,o){const c=n[0];if(c===null)return!1;if(a==="display"||a==="visibility")return!0;const h=n[n.length-1],f=vy(c,a),m=vy(h,a);return!f||!m?!1:$2(n)||(s==="spring"||Bb(s))&&o}function Cd(n){n.duration=0,n.type="keyframes"}const Hb=new Set(["opacity","clipPath","filter","transform","backgroundColor"]),K2=/^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;function Z2(n){for(let a=0;a<n.length;a++)if(typeof n[a]=="string"&&K2.test(n[a]))return!0;return!1}const Q2=new Set(["color","backgroundColor","outlineColor","fill","stroke","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"]),J2=ob(()=>Object.hasOwnProperty.call(Element.prototype,"animate"));function W2(n){var b;const{motionValue:a,name:s,repeatDelay:o,repeatType:c,damping:h,type:f,keyframes:m}=n,p=(b=a==null?void 0:a.owner)==null?void 0:b.current;if(!(p instanceof HTMLElement)&&!(p instanceof SVGElement))return!1;const{onUpdate:g,transformTemplate:v}=a.owner.getProps();return J2()&&s&&(Hb.has(s)||Q2.has(s)&&Z2(m))&&(s!=="transform"||!v)&&!g&&!o&&c!=="mirror"&&h!==0&&f!=="inertia"}const I2=40;class ej extends xf{constructor({autoplay:a=!0,delay:s=0,type:o="keyframes",repeat:c=0,repeatDelay:h=0,repeatType:f="loop",keyframes:m,name:p,motionValue:g,element:v,...b}){var E;super(),this.stop=()=>{var C,A;this._animation&&(this._animation.stop(),(C=this.stopTimeline)==null||C.call(this)),(A=this.keyframeResolver)==null||A.cancel()},this.createdAt=bt.now();const x={autoplay:a,delay:s,type:o,repeat:c,repeatDelay:h,repeatType:f,name:p,motionValue:g,element:v,...b},j=(v==null?void 0:v.KeyframeResolver)||Sf;this.keyframeResolver=new j(m,(C,A,z)=>this.onKeyframesResolved(C,A,x,!z),p,g,v),(E=this.keyframeResolver)==null||E.scheduleResolve()}onKeyframesResolved(a,s,o,c){var z,k;this.keyframeResolver=void 0;const{name:h,type:f,velocity:m,delay:p,isHandoff:g,onUpdate:v}=o;this.resolvedAt=bt.now();let b=!0;F2(a,h,f,m)||(b=!1,(gr.instantAnimations||!p)&&(v==null||v(ml(a,o,s))),a[0]=a[a.length-1],Cd(o),o.repeat=0);const j={startTime:c?this.resolvedAt?this.resolvedAt-this.createdAt>I2?this.resolvedAt:this.createdAt:this.createdAt:void 0,finalKeyframe:s,...o,keyframes:a},E=b&&!g&&W2(j),C=(k=(z=j.motionValue)==null?void 0:z.owner)==null?void 0:k.current;let A;if(E)try{A=new X2({...j,element:C})}catch{A=new al(j)}else A=new al(j);A.finished.then(()=>{this.notifyFinished()}).catch(It),this.pendingTimeline&&(this.stopTimeline=A.attachTimeline(this.pendingTimeline),this.pendingTimeline=void 0),this._animation=A}get finished(){return this._animation?this.animation.finished:this._finished}then(a,s){return this.finished.finally(a).then(()=>{})}get animation(){var a;return this._animation||((a=this.keyframeResolver)==null||a.resume(),B2()),this._animation}get duration(){return this.animation.duration}get iterationDuration(){return this.animation.iterationDuration}get time(){return this.animation.time}set time(a){this.animation.time=a}get speed(){return this.animation.speed}get state(){return this.animation.state}set speed(a){this.animation.speed=a}get startTime(){return this.animation.startTime}attachTimeline(a){return this._animation?this.stopTimeline=this.animation.attachTimeline(a):this.pendingTimeline=a,()=>this.stop()}play(){this.animation.play()}pause(){this.animation.pause()}complete(){this.animation.complete()}cancel(){var a;this._animation&&this.animation.cancel(),(a=this.keyframeResolver)==null||a.cancel()}}function qb(n,a,s,o=0,c=1){const h=Array.from(n).sort((g,v)=>g.sortNodePosition(v)).indexOf(a),f=n.size,m=(f-1)*o;return typeof s=="function"?s(h,f):c===1?h*o:m-h*o}const by=30,tj=n=>!isNaN(parseFloat(n));class nj{constructor(a,s={}){this.canTrackVelocity=null,this.events={},this.updateAndNotify=o=>{var h;const c=bt.now();if(this.updatedAt!==c&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(o),this.current!==this.prev&&((h=this.events.change)==null||h.notify(this.current),this.dependents))for(const f of this.dependents)f.dirty()},this.hasAnimated=!1,this.setCurrent(a),this.owner=s.owner}setCurrent(a){this.current=a,this.updatedAt=bt.now(),this.canTrackVelocity===null&&a!==void 0&&(this.canTrackVelocity=tj(this.current))}setPrevFrameValue(a=this.current){this.prevFrameValue=a,this.prevUpdatedAt=this.updatedAt}onChange(a){return this.on("change",a)}on(a,s){this.events[a]||(this.events[a]=new ff);const o=this.events[a].add(s);return a==="change"?()=>{o(),qe.read(()=>{this.events.change.getSize()||this.stop()})}:o}clearListeners(){for(const a in this.events)this.events[a].clear()}attach(a,s){this.passiveEffect=a,this.stopPassiveEffect=s}set(a){this.passiveEffect?this.passiveEffect(a,this.updateAndNotify):this.updateAndNotify(a)}setWithVelocity(a,s,o){this.set(s),this.prev=void 0,this.prevFrameValue=a,this.prevUpdatedAt=this.updatedAt-o}jump(a,s=!0){this.updateAndNotify(a),this.prev=a,this.prevUpdatedAt=this.prevFrameValue=void 0,s&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}dirty(){var a;(a=this.events.change)==null||a.notify(this.current)}addDependent(a){this.dependents||(this.dependents=new Set),this.dependents.add(a)}removeDependent(a){this.dependents&&this.dependents.delete(a)}get(){return this.current}getPrevious(){return this.prev}getVelocity(){const a=bt.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||a-this.updatedAt>by)return 0;const s=Math.min(this.updatedAt-this.prevUpdatedAt,by);return lb(parseFloat(this.current)-parseFloat(this.prevFrameValue),s)}start(a){return this.stop(),new Promise(s=>{this.hasAnimated=!0,this.animation=a(s),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){var a,s;(a=this.dependents)==null||a.clear(),(s=this.events.destroy)==null||s.notify(),this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}}function Ha(n,a){return new nj(n,a)}function Yb(n,a){if(n!=null&&n.inherit&&a){const{inherit:s,...o}=n;return{...a,...o}}return n}function wf(n,a){const s=(n==null?void 0:n[a])??(n==null?void 0:n.default)??n;return s!==n?Yb(s,n):s}const rj={type:"spring",stiffness:500,damping:25,restSpeed:10},aj=n=>({type:"spring",stiffness:550,damping:n===0?2*Math.sqrt(550):30,restSpeed:10}),ij={type:"keyframes",duration:.8},sj={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},oj=(n,{keyframes:a})=>a.length>2?ij:$a.has(n)?n.startsWith("scale")?aj(a[1]):rj:sj,lj=new Set(["when","delay","delayChildren","staggerChildren","staggerDirection","repeat","repeatType","repeatDelay","from","elapsed"]);function cj(n){for(const a in n)if(!lj.has(a))return!0;return!1}const jf=(n,a,s,o={},c,h)=>f=>{const m=wf(o,n)||{},p=m.delay||o.delay||0;let{elapsed:g=0}=o;g=g-Ht(p);const v={keyframes:Array.isArray(s)?s:[null,s],ease:"easeOut",velocity:a.getVelocity(),...m,delay:-g,onUpdate:x=>{a.set(x),m.onUpdate&&m.onUpdate(x)},onComplete:()=>{f(),m.onComplete&&m.onComplete()},name:n,motionValue:a,element:h?void 0:c};cj(m)||Object.assign(v,oj(n,v)),v.duration&&(v.duration=Ht(v.duration)),v.repeatDelay&&(v.repeatDelay=Ht(v.repeatDelay)),v.from!==void 0&&(v.keyframes[0]=v.from);let b=!1;if((v.type===!1||v.duration===0&&!v.repeatDelay)&&(Cd(v),v.delay===0&&(b=!0)),(gr.instantAnimations||gr.skipAnimations||c!=null&&c.shouldSkipAnimations||m.skipAnimations)&&(b=!0,Cd(v),v.delay=0),v.allowFlatten=!m.type&&!m.ease,b&&!h&&a.get()!==void 0){const x=ml(v.keyframes,m);if(x!==void 0){qe.update(()=>{v.onUpdate(x),v.onComplete()});return}}return m.isSync?new al(v):new ej(v)},uj=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function dj(n){const a=uj.exec(n);if(!a)return[,];const[,s,o,c]=a;return[`--${s??o}`,c]}function Gb(n,a,s=1){const[o,c]=dj(n);if(!o)return;const h=window.getComputedStyle(a).getPropertyValue(o);if(h){const f=h.trim();return ab(f)?parseFloat(f):f}return pf(c)?Gb(c,a,s+1):c}function xy(n){const a=[{},{}];return n==null||n.values.forEach((s,o)=>{a[0][o]=s.get(),a[1][o]=s.getVelocity()}),a}function Ef(n,a,s,o){if(typeof a=="function"){const[c,h]=xy(o);a=a(s!==void 0?s:n.custom,c,h)}if(typeof a=="string"&&(a=n.variants&&n.variants[a]),typeof a=="function"){const[c,h]=xy(o);a=a(s!==void 0?s:n.custom,c,h)}return a}function Gr(n,a,s){const o=n.getProps();return Ef(o,a,s!==void 0?s:o.custom,n)}const Pb=new Set(["width","height","top","left","right","bottom",...Xa]),Ad=n=>Array.isArray(n);function fj(n,a,s){n.hasValue(a)?n.getValue(a).set(s):n.addValue(a,Ha(s))}function hj(n){return Ad(n)?n[n.length-1]||0:n}function mj(n,a){const s=Gr(n,a);let{transitionEnd:o={},transition:c={},...h}=s||{};h={...h,...o};for(const f in h){const m=hj(h[f]);fj(n,f,m)}}const pt=n=>!!(n&&n.getVelocity);function pj(n){return!!(pt(n)&&n.add)}function Dd(n,a){const s=n.getValue("willChange");if(pj(s))return s.add(a);if(!s&&gr.WillChange){const o=new gr.WillChange("auto");n.addValue("willChange",o),o.add(a)}}function Tf(n){return n.replace(/([A-Z])/g,a=>`-${a.toLowerCase()}`)}const gj="framerAppearId",Xb="data-"+Tf(gj);function $b(n){return n.props[Xb]}function yj({protectedKeys:n,needsAnimating:a},s){const o=n.hasOwnProperty(s)&&a[s]!==!0;return a[s]=!1,o}function Fb(n,a,{delay:s=0,transitionOverride:o,type:c}={}){let{transition:h,transitionEnd:f,...m}=a;const p=n.getDefaultTransition();h=h?Yb(h,p):p;const g=h==null?void 0:h.reduceMotion,v=h==null?void 0:h.skipAnimations;o&&(h=o);const b=[],x=c&&n.animationState&&n.animationState.getState()[c],j=h==null?void 0:h.path;j&&j.animateVisualElement(n,m,h,s,b);for(const E in m){const C=n.getValue(E,n.latestValues[E]??null),A=m[E];if(A===void 0||x&&yj(x,E))continue;const z={delay:s,...wf(h||{},E)};v&&(z.skipAnimations=!0);const k=C.get();if(k!==void 0&&!C.isAnimating()&&!Array.isArray(A)&&A===k&&!z.velocity){qe.update(()=>C.set(A));continue}let V=!1;if(window.MotionHandoffAnimation){const Y=$b(n);if(Y){const N=window.MotionHandoffAnimation(Y,E,qe);N!==null&&(z.startTime=N,V=!0)}}Dd(n,E);const _=g??n.shouldReduceMotion;C.start(jf(E,C,A,_&&Pb.has(E)?{type:!1}:z,n,V));const L=C.animation;L&&b.push(L)}if(f){const E=()=>qe.update(()=>{f&&mj(n,f)});b.length?Promise.all(b).then(E):E()}return b}function Nd(n,a,s={}){var p;const o=Gr(n,a,s.type==="exit"?(p=n.presenceContext)==null?void 0:p.custom:void 0);let{transition:c=n.getDefaultTransition()||{}}=o||{};s.transitionOverride&&(c=s.transitionOverride);const h=o?()=>Promise.all(Fb(n,o,s)):()=>Promise.resolve(),f=n.variantChildren&&n.variantChildren.size?(g=0)=>{const{delayChildren:v=0,staggerChildren:b,staggerDirection:x}=c;return vj(n,a,g,v,b,x,s)}:()=>Promise.resolve(),{when:m}=c;if(m){const[g,v]=m==="beforeChildren"?[h,f]:[f,h];return g().then(()=>v())}else return Promise.all([h(),f(s.delay)])}function vj(n,a,s=0,o=0,c=0,h=1,f){const m=[];for(const p of n.variantChildren)p.notify("AnimationStart",a),m.push(Nd(p,a,{...f,delay:s+(typeof o=="function"?0:o)+qb(n.variantChildren,p,o,c,h)}).then(()=>p.notify("AnimationComplete",a)));return Promise.all(m)}function bj(n,a,s={}){n.notify("AnimationStart",a);let o;if(Array.isArray(a)){const c=a.map(h=>Nd(n,h,s));o=Promise.all(c)}else if(typeof a=="string")o=Nd(n,a,s);else{const c=typeof a=="function"?Gr(n,a,s.custom):a;o=Promise.all(Fb(n,c,s))}return o.then(()=>{n.notify("AnimationComplete",a)})}const xj={test:n=>n==="auto",parse:n=>n},Kb=n=>a=>a.test(n),Zb=[Pa,de,yn,Ln,$w,Xw,xj],Sy=n=>Zb.find(Kb(n));function Sj(n){return typeof n=="number"?n===0:n!==null?n==="none"||n==="0"||sb(n):!0}const wj=new Set(["brightness","contrast","saturate","opacity"]);function jj(n){const[a,s]=n.slice(0,-1).split("(");if(a==="drop-shadow")return n;const[o]=s.match(gf)||[];if(!o)return n;const c=s.replace(o,"");let h=wj.has(a)?1:0;return o!==s&&(h*=100),a+"("+h+c+")"}const Ej=/\b([a-z-]*)\(.*?\)/gu,Md={...on,getAnimatableNone:n=>{const a=n.match(Ej);return a?a.map(jj).join(" "):n}},kd={...on,getAnimatableNone:n=>{const a=on.parse(n);return on.createTransformer(n)(a.map(o=>typeof o=="number"?0:typeof o=="object"?{...o,alpha:1}:o))}},wy={...Pa,transform:Math.round},Tj={rotate:Ln,pathRotation:Ln,rotateX:Ln,rotateY:Ln,rotateZ:Ln,scale:ko,scaleX:ko,scaleY:ko,scaleZ:ko,skew:Ln,skewX:Ln,skewY:Ln,distance:de,translateX:de,translateY:de,translateZ:de,x:de,y:de,z:de,perspective:de,transformPerspective:de,opacity:Ii,originX:ly,originY:ly,originZ:de},il={borderWidth:de,borderTopWidth:de,borderRightWidth:de,borderBottomWidth:de,borderLeftWidth:de,borderRadius:de,borderTopLeftRadius:de,borderTopRightRadius:de,borderBottomRightRadius:de,borderBottomLeftRadius:de,width:de,maxWidth:de,height:de,maxHeight:de,top:de,right:de,bottom:de,left:de,inset:de,insetBlock:de,insetBlockStart:de,insetBlockEnd:de,insetInline:de,insetInlineStart:de,insetInlineEnd:de,padding:de,paddingTop:de,paddingRight:de,paddingBottom:de,paddingLeft:de,paddingBlock:de,paddingBlockStart:de,paddingBlockEnd:de,paddingInline:de,paddingInlineStart:de,paddingInlineEnd:de,margin:de,marginTop:de,marginRight:de,marginBottom:de,marginLeft:de,marginBlock:de,marginBlockStart:de,marginBlockEnd:de,marginInline:de,marginInlineStart:de,marginInlineEnd:de,fontSize:de,backgroundPositionX:de,backgroundPositionY:de,...Tj,zIndex:wy,fillOpacity:Ii,strokeOpacity:Ii,numOctaves:wy},Cj={...il,color:rt,backgroundColor:rt,outlineColor:rt,fill:rt,stroke:rt,borderColor:rt,borderTopColor:rt,borderRightColor:rt,borderBottomColor:rt,borderLeftColor:rt,filter:Md,WebkitFilter:Md,mask:kd,WebkitMask:kd},Qb=n=>Cj[n],Aj=new Set([Md,kd]);function Jb(n,a){let s=Qb(n);return Aj.has(s)||(s=on),s.getAnimatableNone?s.getAnimatableNone(a):void 0}const Dj=new Set(["auto","none","0"]);function Nj(n,a,s){let o=0,c;for(;o<n.length&&!c;){const h=n[o];typeof h=="string"&&!Dj.has(h)&&Ua(h).values.length&&(c=n[o]),o++}if(c&&s)for(const h of a)n[h]=Jb(s,c)}class Mj extends Sf{constructor(a,s,o,c,h){super(a,s,o,c,h,!0)}readKeyframes(){const{unresolvedKeyframes:a,element:s,name:o}=this;if(!s||!s.current)return;super.readKeyframes();for(let v=0;v<a.length;v++){let b=a[v];if(typeof b=="string"&&(b=b.trim(),pf(b))){const x=Gb(b,s.current);x!==void 0&&(a[v]=x),v===a.length-1&&(this.finalKeyframe=b)}}if(this.resolveNoneKeyframes(),!Pb.has(o)||a.length!==2)return;const[c,h]=a,f=Sy(c),m=Sy(h),p=oy(c),g=oy(h);if(p!==g&&mr[o]){this.needsMeasurement=!0;return}if(f!==m)if(gy(f)&&gy(m))for(let v=0;v<a.length;v++){const b=a[v];typeof b=="string"&&(a[v]=parseFloat(b))}else mr[o]&&(this.needsMeasurement=!0)}resolveNoneKeyframes(){const{unresolvedKeyframes:a,name:s}=this,o=[];for(let c=0;c<a.length;c++)(a[c]===null||Sj(a[c]))&&o.push(c);o.length&&Nj(a,o,s)}measureInitialState(){const{element:a,unresolvedKeyframes:s,name:o}=this;if(!a||!a.current)return;o==="height"&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=mr[o](a.measureViewportBox(),window.getComputedStyle(a.current)),s[0]=this.measuredOrigin;const c=s[s.length-1];c!==void 0&&a.getValue(o,c).jump(c,!1)}measureEndState(){var m;const{element:a,name:s,unresolvedKeyframes:o}=this;if(!a||!a.current)return;const c=a.getValue(s);c&&c.jump(this.measuredOrigin,!1);const h=o.length-1,f=o[h];o[h]=mr[s](a.measureViewportBox(),window.getComputedStyle(a.current)),f!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=f),(m=this.removedTransforms)!=null&&m.length&&this.removedTransforms.forEach(([p,g])=>{a.getValue(p).set(g)}),this.resolveNoneKeyframes()}}const Cf=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"];function Wb(n,a,s){if(n==null)return[];if(n instanceof EventTarget)return[n];if(typeof n=="string"){let o=document;const c=(s==null?void 0:s[n])??o.querySelectorAll(n);return c?Array.from(c):[]}return Array.from(n).filter(o=>o!=null)}const Rd=(n,a)=>a&&typeof n=="number"?a.transform(n):n;function Po(n){return ib(n)&&"offsetHeight"in n&&!("ownerSVGElement"in n)}const{schedule:Af}=bb(queueMicrotask,!1),sn={x:!1,y:!1};function Ib(){return sn.x||sn.y}function kj(n){return n==="x"||n==="y"?sn[n]?null:(sn[n]=!0,()=>{sn[n]=!1}):sn.x||sn.y?null:(sn.x=sn.y=!0,()=>{sn.x=sn.y=!1})}function ex(n,a){const s=Wb(n),o=new AbortController,c={passive:!0,...a,signal:o.signal};return[s,c,()=>o.abort()]}function Rj(n){return!(n.pointerType==="touch"||Ib())}function Oj(n,a,s={}){const[o,c,h]=ex(n,s);return o.forEach(f=>{let m=!1,p=!1,g;const v=()=>{f.removeEventListener("pointerleave",E)},b=A=>{g&&(g(A),g=void 0),v()},x=A=>{m=!1,window.removeEventListener("pointerup",x),window.removeEventListener("pointercancel",x),p&&(p=!1,b(A))},j=()=>{m=!0,window.addEventListener("pointerup",x,c),window.addEventListener("pointercancel",x,c)},E=A=>{if(A.pointerType!=="touch"){if(m){p=!0;return}b(A)}},C=A=>{if(!Rj(A))return;p=!1;const z=a(f,A);typeof z=="function"&&(g=z,f.addEventListener("pointerleave",E,c))};f.addEventListener("pointerenter",C,c),f.addEventListener("pointerdown",j,c)}),h}const tx=(n,a)=>a?n===a?!0:tx(n,a.parentElement):!1,Df=n=>n.pointerType==="mouse"?typeof n.button!="number"||n.button<=0:n.isPrimary!==!1,zj=new Set(["BUTTON","INPUT","SELECT","TEXTAREA","A"]);function _j(n){return zj.has(n.tagName)||n.isContentEditable===!0}const Vj=new Set(["INPUT","SELECT","TEXTAREA"]);function Bj(n){return Vj.has(n.tagName)||n.isContentEditable===!0}const Xo=new WeakSet;function jy(n){return a=>{a.key==="Enter"&&n(a)}}function Fu(n,a){n.dispatchEvent(new PointerEvent("pointer"+a,{isPrimary:!0,bubbles:!0}))}const Lj=(n,a)=>{const s=n.currentTarget;if(!s)return;const o=jy(()=>{if(Xo.has(s))return;Fu(s,"down");const c=jy(()=>{Fu(s,"up")}),h=()=>Fu(s,"cancel");s.addEventListener("keyup",c,a),s.addEventListener("blur",h,a)});s.addEventListener("keydown",o,a),s.addEventListener("blur",()=>s.removeEventListener("keydown",o),a)};function Ey(n){return Df(n)&&!Ib()}const Ty=new WeakSet;function Uj(n,a,s={}){const[o,c,h]=ex(n,s),f=m=>{const p=m.currentTarget;if(!Ey(m)||Ty.has(m))return;Xo.add(p),s.stopPropagation&&Ty.add(m);const g=a(p,m),v={...c,capture:!0},b=(E,C)=>{window.removeEventListener("pointerup",x,v),window.removeEventListener("pointercancel",j,v),Xo.has(p)&&Xo.delete(p),Ey(E)&&typeof g=="function"&&g(E,{success:C})},x=E=>{b(E,p===window||p===document||s.useGlobalTarget||tx(p,E.target))},j=E=>{b(E,!1)};window.addEventListener("pointerup",x,v),window.addEventListener("pointercancel",j,v)};return o.forEach(m=>{(s.useGlobalTarget?window:m).addEventListener("pointerdown",f,c),Po(m)&&(m.addEventListener("focus",g=>Lj(g,c)),!_j(m)&&!m.hasAttribute("tabindex")&&(m.tabIndex=0))}),h}function Nf(n){return ib(n)&&"ownerSVGElement"in n}const $o=new WeakMap;let fr;const nx=(n,a,s)=>(o,c)=>c&&c[0]?c[0][n+"Size"]:Nf(o)&&"getBBox"in o?o.getBBox()[a]:o[s],Hj=nx("inline","width","offsetWidth"),qj=nx("block","height","offsetHeight");function Yj({target:n,borderBoxSize:a}){var s;(s=$o.get(n))==null||s.forEach(o=>{o(n,{get width(){return Hj(n,a)},get height(){return qj(n,a)}})})}function Gj(n){n.forEach(Yj)}function Pj(){typeof ResizeObserver>"u"||(fr=new ResizeObserver(Gj))}function Xj(n,a){fr||Pj();const s=Wb(n);return s.forEach(o=>{let c=$o.get(o);c||(c=new Set,$o.set(o,c)),c.add(a),fr==null||fr.observe(o)}),()=>{s.forEach(o=>{const c=$o.get(o);c==null||c.delete(a),c!=null&&c.size||fr==null||fr.unobserve(o)})}}const Fo=new Set;let Va;function $j(){Va=()=>{const n={get width(){return window.innerWidth},get height(){return window.innerHeight}};Fo.forEach(a=>a(n))},window.addEventListener("resize",Va)}function Fj(n){return Fo.add(n),Va||$j(),()=>{Fo.delete(n),!Fo.size&&typeof Va=="function"&&(window.removeEventListener("resize",Va),Va=void 0)}}function Cy(n,a){return typeof n=="function"?Fj(n):Xj(n,a)}function Kj(n){return Nf(n)&&n.tagName==="svg"}const Zj=[...Zb,rt,on],Qj=n=>Zj.find(Kb(n)),Ay=()=>({translate:0,scale:1,origin:0,originPoint:0}),Ba=()=>({x:Ay(),y:Ay()}),Dy=()=>({min:0,max:0}),it=()=>({x:Dy(),y:Dy()}),Jj=new WeakMap;function pl(n){return n!==null&&typeof n=="object"&&typeof n.start=="function"}function es(n){return typeof n=="string"||Array.isArray(n)}const Mf=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],kf=["initial",...Mf];function gl(n){return pl(n.animate)||kf.some(a=>es(n[a]))}function rx(n){return!!(gl(n)||n.variants)}function Wj(n,a,s){for(const o in a){const c=a[o],h=s[o];if(pt(c))n.addValue(o,c);else if(pt(h))n.addValue(o,Ha(c,{owner:n}));else if(h!==c)if(n.hasValue(o)){const f=n.getValue(o);f.liveStyle===!0?f.jump(c):f.hasAnimated||f.set(c)}else{const f=n.getStaticValue(o);n.addValue(o,Ha(f!==void 0?f:c,{owner:n}))}}for(const o in s)a[o]===void 0&&n.removeValue(o);return a}const sl={current:null},Rf={current:!1},Ij=typeof window<"u";function ax(){if(Rf.current=!0,!!Ij)if(window.matchMedia){const n=window.matchMedia("(prefers-reduced-motion)"),a=()=>sl.current=n.matches;n.addEventListener("change",a),a()}else sl.current=!1}const Ny=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"];let ol={};function ix(n){ol=n}function eE(){return ol}class tE{scrapeMotionValuesFromProps(a,s,o){return{}}constructor({parent:a,props:s,presenceContext:o,reducedMotionConfig:c,skipAnimations:h,blockInitialAnimation:f,visualState:m},p={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.shouldSkipAnimations=!1,this.values=new Map,this.KeyframeResolver=Sf,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.hasBeenMounted=!1,this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{const j=bt.now();this.renderScheduledAt<j&&(this.renderScheduledAt=j,qe.render(this.render,!1,!0))};const{latestValues:g,renderState:v}=m;this.latestValues=g,this.baseTarget={...g},this.initialValues=s.initial?{...g}:{},this.renderState=v,this.parent=a,this.props=s,this.presenceContext=o,this.depth=a?a.depth+1:0,this.reducedMotionConfig=c,this.skipAnimationsConfig=h,this.options=p,this.blockInitialAnimation=!!f,this.isControllingVariants=gl(s),this.isVariantNode=rx(s),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(a&&a.current);const{willChange:b,...x}=this.scrapeMotionValuesFromProps(s,{},this);for(const j in x){const E=x[j];g[j]!==void 0&&pt(E)&&E.set(g[j])}}mount(a){var s,o;if(this.hasBeenMounted)for(const c in this.initialValues)(s=this.values.get(c))==null||s.jump(this.initialValues[c]),this.latestValues[c]=this.initialValues[c];this.current=a,Jj.set(a,this),this.projection&&!this.projection.instance&&this.projection.mount(a),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((c,h)=>this.bindToMotionValue(h,c)),this.reducedMotionConfig==="never"?this.shouldReduceMotion=!1:this.reducedMotionConfig==="always"?this.shouldReduceMotion=!0:(Rf.current||ax(),this.shouldReduceMotion=sl.current),this.shouldSkipAnimations=this.skipAnimationsConfig??!1,(o=this.parent)==null||o.addChild(this),this.update(this.props,this.presenceContext),this.hasBeenMounted=!0}unmount(){var a;this.projection&&this.projection.unmount(),yr(this.notifyUpdate),yr(this.render),this.valueSubscriptions.forEach(s=>s()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),(a=this.parent)==null||a.removeChild(this);for(const s in this.events)this.events[s].clear();for(const s in this.features){const o=this.features[s];o&&(o.unmount(),o.isMounted=!1)}this.current=null}addChild(a){this.children.add(a),this.enteringChildren??(this.enteringChildren=new Set),this.enteringChildren.add(a)}removeChild(a){this.children.delete(a),this.enteringChildren&&this.enteringChildren.delete(a)}bindToMotionValue(a,s){if(this.valueSubscriptions.has(a)&&this.valueSubscriptions.get(a)(),s.accelerate&&Hb.has(a)&&this.current instanceof HTMLElement){const{factory:f,keyframes:m,times:p,ease:g,duration:v}=s.accelerate,b=new Lb({element:this.current,name:a,keyframes:m,times:p,ease:g,duration:Ht(v)}),x=f(b);this.valueSubscriptions.set(a,()=>{x(),b.cancel()});return}const o=$a.has(a);o&&this.onBindTransform&&this.onBindTransform();const c=s.on("change",f=>{this.latestValues[a]=f,this.props.onUpdate&&qe.preRender(this.notifyUpdate),o&&this.projection&&(this.projection.isTransformDirty=!0),this.scheduleRender()});let h;typeof window<"u"&&window.MotionCheckAppearSync&&(h=window.MotionCheckAppearSync(this,a,s)),this.valueSubscriptions.set(a,()=>{c(),h&&h()})}sortNodePosition(a){return!this.current||!this.sortInstanceNodePosition||this.type!==a.type?0:this.sortInstanceNodePosition(this.current,a.current)}updateFeatures(){let a="animation";for(a in ol){const s=ol[a];if(!s)continue;const{isEnabled:o,Feature:c}=s;if(!this.features[a]&&c&&o(this.props)&&(this.features[a]=new c(this)),this.features[a]){const h=this.features[a];h.isMounted?h.update():(h.mount(),h.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):it()}getStaticValue(a){return this.latestValues[a]}setStaticValue(a,s){this.latestValues[a]=s}update(a,s){(a.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=a,this.prevPresenceContext=this.presenceContext,this.presenceContext=s;for(let o=0;o<Ny.length;o++){const c=Ny[o];this.propEventSubscriptions[c]&&(this.propEventSubscriptions[c](),delete this.propEventSubscriptions[c]);const h="on"+c,f=a[h];f&&(this.propEventSubscriptions[c]=this.on(c,f))}this.prevMotionValues=Wj(this,this.scrapeMotionValuesFromProps(a,this.prevProps||{},this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue()}getProps(){return this.props}getVariant(a){return this.props.variants?this.props.variants[a]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(a){const s=this.getClosestVariantNode();if(s)return s.variantChildren&&s.variantChildren.add(a),()=>s.variantChildren.delete(a)}addValue(a,s){const o=this.values.get(a);s!==o&&(o&&this.removeValue(a),this.bindToMotionValue(a,s),this.values.set(a,s),this.latestValues[a]=s.get())}removeValue(a){this.values.delete(a);const s=this.valueSubscriptions.get(a);s&&(s(),this.valueSubscriptions.delete(a)),delete this.latestValues[a],this.removeValueFromRenderState(a,this.renderState)}hasValue(a){return this.values.has(a)}getValue(a,s){if(this.props.values&&this.props.values[a])return this.props.values[a];let o=this.values.get(a);return o===void 0&&s!==void 0&&(o=Ha(s===null?void 0:s,{owner:this}),this.addValue(a,o)),o}readValue(a,s){let o=this.latestValues[a]!==void 0||!this.current?this.latestValues[a]:this.getBaseTargetFromProps(this.props,a)??this.readValueFromInstance(this.current,a,this.options);return o!=null&&(typeof o=="string"&&(ab(o)||sb(o))?o=parseFloat(o):!Qj(o)&&on.test(s)&&(o=Jb(a,s)),this.setBaseTarget(a,pt(o)?o.get():o)),pt(o)?o.get():o}setBaseTarget(a,s){this.baseTarget[a]=s}getBaseTarget(a){var h;const{initial:s}=this.props;let o;if(typeof s=="string"||typeof s=="object"){const f=Ef(this.props,s,(h=this.presenceContext)==null?void 0:h.custom);f&&(o=f[a])}if(s&&o!==void 0)return o;const c=this.getBaseTargetFromProps(this.props,a);return c!==void 0&&!pt(c)?c:this.initialValues[a]!==void 0&&o===void 0?void 0:this.baseTarget[a]}on(a,s){return this.events[a]||(this.events[a]=new ff),this.events[a].add(s)}notify(a,...s){this.events[a]&&this.events[a].notify(...s)}scheduleRenderMicrotask(){Af.render(this.render)}}class sx extends tE{constructor(){super(...arguments),this.KeyframeResolver=Mj}sortInstanceNodePosition(a,s){return a.compareDocumentPosition(s)&2?1:-1}getBaseTargetFromProps(a,s){const o=a.style;return o?o[s]:void 0}removeValueFromRenderState(a,{vars:s,style:o}){delete s[a],delete o[a]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);const{children:a}=this.props;pt(a)&&(this.childSubscription=a.on("change",s=>{this.current&&(this.current.textContent=`${s}`)}))}}class br{constructor(a){this.isMounted=!1,this.node=a}update(){}}function ox({top:n,left:a,right:s,bottom:o}){return{x:{min:a,max:s},y:{min:n,max:o}}}function nE({x:n,y:a}){return{top:a.min,right:n.max,bottom:a.max,left:n.min}}function rE(n,a){if(!a)return n;const s=a({x:n.left,y:n.top}),o=a({x:n.right,y:n.bottom});return{top:s.y,left:s.x,bottom:o.y,right:o.x}}function Ku(n){return n===void 0||n===1}function Od({scale:n,scaleX:a,scaleY:s}){return!Ku(n)||!Ku(a)||!Ku(s)}function Ur(n){return Od(n)||lx(n)||n.z||n.rotate||n.rotateX||n.rotateY||n.skewX||n.skewY}function lx(n){return My(n.x)||My(n.y)}function My(n){return n&&n!=="0%"}function ll(n,a,s){const o=n-s,c=a*o;return s+c}function ky(n,a,s,o,c){return c!==void 0&&(n=ll(n,c,o)),ll(n,s,o)+a}function zd(n,a=0,s=1,o,c){n.min=ky(n.min,a,s,o,c),n.max=ky(n.max,a,s,o,c)}function cx(n,{x:a,y:s}){zd(n.x,a.translate,a.scale,a.originPoint),zd(n.y,s.translate,s.scale,s.originPoint)}const Ry=.999999999999,Oy=1.0000000000001;function aE(n,a,s,o=!1){var m;const c=s.length;if(!c)return;a.x=a.y=1;let h,f;for(let p=0;p<c;p++){h=s[p],f=h.projectionDelta;const{visualElement:g}=h.options;g&&g.props.style&&g.props.style.display==="contents"||(o&&h.options.layoutScroll&&h.scroll&&h!==h.root&&(pn(n.x,-h.scroll.offset.x),pn(n.y,-h.scroll.offset.y)),f&&(a.x*=f.x.scale,a.y*=f.y.scale,cx(n,f)),o&&Ur(h.latestValues)&&Ko(n,h.latestValues,(m=h.layout)==null?void 0:m.layoutBox))}a.x<Oy&&a.x>Ry&&(a.x=1),a.y<Oy&&a.y>Ry&&(a.y=1)}function pn(n,a){n.min+=a,n.max+=a}function zy(n,a,s,o,c=.5){const h=He(n.min,n.max,c);zd(n,a,s,h,o)}function _y(n,a){return typeof n=="string"?parseFloat(n)/100*(a.max-a.min):n}function Ko(n,a,s){const o=s??n;zy(n.x,_y(a.x,o.x),a.scaleX,a.scale,a.originX),zy(n.y,_y(a.y,o.y),a.scaleY,a.scale,a.originY)}function ux(n,a){return ox(rE(n.getBoundingClientRect(),a))}function iE(n,a,s){const o=ux(n,s),{scroll:c}=a;return c&&(pn(o.x,c.offset.x),pn(o.y,c.offset.y)),o}const sE={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},oE=Xa.length;function lE(n,a,s){let o="",c=!0;for(let f=0;f<oE;f++){const m=Xa[f],p=n[m];if(p===void 0)continue;let g=!0;if(typeof p=="number")g=p===(m.startsWith("scale")?1:0);else{const v=parseFloat(p);g=m.startsWith("scale")?v===1:v===0}if(!g||s){const v=Rd(p,il[m]);if(!g){c=!1;const b=sE[m]||m;o+=`${b}(${v}) `}s&&(a[m]=v)}}const h=n.pathRotation;return h&&(c=!1,o+=`rotate(${Rd(h,il.pathRotation)}) `),o=o.trim(),s?o=s(a,c?"":o):c&&(o="none"),o}function Of(n,a,s){const{style:o,vars:c,transformOrigin:h}=n;let f=!1,m=!1;for(const p in a){const g=a[p];if($a.has(p)){f=!0;continue}else if(Sb(p)){c[p]=g;continue}else{const v=Rd(g,il[p]);p.startsWith("origin")?(m=!0,h[p]=v):o[p]=v}}if(a.transform||(f||s?o.transform=lE(a,n.transform,s):o.transform&&(o.transform="none")),m){const{originX:p="50%",originY:g="50%",originZ:v=0}=h;o.transformOrigin=`${p} ${g} ${v}`}}function dx(n,{style:a,vars:s},o,c){const h=n.style;let f;for(f in a)h[f]=a[f];c==null||c.applyProjectionStyles(h,o);for(f in s)h.setProperty(f,s[f])}function Vy(n,a){return a.max===a.min?0:n/(a.max-a.min)*100}const Gi={correct:(n,a)=>{if(!a.target)return n;if(typeof n=="string")if(de.test(n))n=parseFloat(n);else return n;const s=Vy(n,a.target.x),o=Vy(n,a.target.y);return`${s}% ${o}%`}},cE={correct:(n,{treeScale:a,projectionDelta:s})=>{const o=n,c=on.parse(n);if(c.length>5)return o;const h=on.createTransformer(n),f=typeof c[0]!="number"?1:0,m=s.x.scale*a.x,p=s.y.scale*a.y;c[0+f]/=m,c[1+f]/=p;const g=He(m,p,.5);return typeof c[2+f]=="number"&&(c[2+f]/=g),typeof c[3+f]=="number"&&(c[3+f]/=g),h(c)}},_d={borderRadius:{...Gi,applyTo:[...Cf]},borderTopLeftRadius:Gi,borderTopRightRadius:Gi,borderBottomLeftRadius:Gi,borderBottomRightRadius:Gi,boxShadow:cE};function fx(n,{layout:a,layoutId:s}){return $a.has(n)||n.startsWith("origin")||(a||s!==void 0)&&(!!_d[n]||n==="opacity")}function zf(n,a,s){var f;const o=n.style,c=a==null?void 0:a.style,h={};if(!o)return h;for(const m in o)(pt(o[m])||c&&pt(c[m])||fx(m,n)||((f=s==null?void 0:s.getValue(m))==null?void 0:f.liveStyle)!==void 0)&&(h[m]=o[m]);return h}function uE(n){return window.getComputedStyle(n)}class dE extends sx{constructor(){super(...arguments),this.type="html",this.renderInstance=dx}mount(a){hl(!!a.style),super.mount(a)}readValueFromInstance(a,s){var o;if($a.has(s))return(o=this.projection)!=null&&o.isProjecting?Sd(s):R2(a,s);{const c=uE(a),h=(Sb(s)?c.getPropertyValue(s):c[s])||0;return typeof h=="string"?h.trim():h}}measureInstanceViewportBox(a,{transformPagePoint:s}){return ux(a,s)}build(a,s,o){Of(a,s,o.transformTemplate)}scrapeMotionValuesFromProps(a,s,o){return zf(a,s,o)}}const fE={offset:"stroke-dashoffset",array:"stroke-dasharray"},hE={offset:"strokeDashoffset",array:"strokeDasharray"};function mE(n,a,s=1,o=0,c=!0){n.pathLength=1;const h=c?fE:hE;n[h.offset]=`${-o}`,n[h.array]=`${a} ${s}`}const pE=["offsetDistance","offsetPath","offsetRotate","offsetAnchor"];function hx(n,{attrX:a,attrY:s,attrScale:o,pathLength:c,pathSpacing:h=1,pathOffset:f=0,...m},p,g,v){if(Of(n,m,g),p){n.style.viewBox&&(n.attrs.viewBox=n.style.viewBox);return}n.attrs=n.style,n.style={};const{attrs:b,style:x}=n;b.transform&&(x.transform=b.transform,delete b.transform),(x.transform||b.transformOrigin)&&(x.transformOrigin=b.transformOrigin??"50% 50%",delete b.transformOrigin),x.transform&&(x.transformBox=(v==null?void 0:v.transformBox)??"fill-box",delete b.transformBox);for(const j of pE)b[j]!==void 0&&(x[j]=b[j],delete b[j]);a!==void 0&&(b.x=a),s!==void 0&&(b.y=s),o!==void 0&&(b.scale=o),c!==void 0&&mE(b,c,h,f,!1)}const mx=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]),px=n=>typeof n=="string"&&n.toLowerCase()==="svg";function gE(n,a,s,o){dx(n,a,void 0,o);for(const c in a.attrs)n.setAttribute(mx.has(c)?c:Tf(c),a.attrs[c])}function gx(n,a,s){const o=zf(n,a,s);for(const c in n)if(pt(n[c])||pt(a[c])){const h=Xa.indexOf(c)!==-1?"attr"+c.charAt(0).toUpperCase()+c.substring(1):c;o[h]=n[c]}return o}class yE extends sx{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1,this.measureInstanceViewportBox=it}getBaseTargetFromProps(a,s){return a[s]}readValueFromInstance(a,s){if($a.has(s)){const o=Qb(s);return o&&o.default||0}return s=mx.has(s)?s:Tf(s),a.getAttribute(s)}scrapeMotionValuesFromProps(a,s,o){return gx(a,s,o)}build(a,s,o){hx(a,s,this.isSVGTag,o.transformTemplate,o.style)}renderInstance(a,s,o,c){gE(a,s,o,c)}mount(a){this.isSVGTag=px(a.tagName),super.mount(a)}}const vE=kf.length;function yx(n){if(!n)return;if(!n.isControllingVariants){const s=n.parent?yx(n.parent)||{}:{};return n.props.initial!==void 0&&(s.initial=n.props.initial),s}const a={};for(let s=0;s<vE;s++){const o=kf[s],c=n.props[o];(es(c)||c===!1)&&(a[o]=c)}return a}function vx(n,a){if(!Array.isArray(a))return!1;const s=a.length;if(s!==n.length)return!1;for(let o=0;o<s;o++)if(a[o]!==n[o])return!1;return!0}const bE=[...Mf].reverse(),xE=Mf.length;function SE(n){return a=>Promise.all(a.map(({animation:s,options:o})=>bj(n,s,o)))}function wE(n){let a=SE(n),s=By(),o=!0,c=!1;const h=g=>(v,b)=>{var j;const x=Gr(n,b,g==="exit"?(j=n.presenceContext)==null?void 0:j.custom:void 0);if(x){const{transition:E,transitionEnd:C,...A}=x;v={...v,...A,...C}}return v};function f(g){a=g(n)}function m(g){const{props:v}=n,b=yx(n.parent)||{},x=[],j=new Set;let E={},C=1/0;for(let z=0;z<xE;z++){const k=bE[z],V=s[k],_=v[k]!==void 0?v[k]:b[k],L=es(_),Y=k===g?V.isActive:null;Y===!1&&(C=z);let N=_===b[k]&&_!==v[k]&&L;if(N&&(o||c)&&n.manuallyAnimateOnMount&&(N=!1),V.protectedKeys={...E},!V.isActive&&Y===null||!_&&!V.prevProp||pl(_)||typeof _=="boolean")continue;if(k==="exit"&&V.isActive&&Y!==!0){V.prevResolvedValues&&(E={...E,...V.prevResolvedValues});continue}const M=jE(V.prevProp,_);let X=M||k===g&&V.isActive&&!N&&L||z>C&&L,F=!1;const ne=Array.isArray(_)?_:[_];let ie=ne.reduce(h(k),{});Y===!1&&(ie={});const{prevResolvedValues:pe={}}=V,le={...pe,...ie},ve=K=>{X=!0,j.has(K)&&(F=!0,j.delete(K)),V.needsAnimating[K]=!0;const G=n.getValue(K);G&&(G.liveStyle=!1)};for(const K in le){const G=ie[K],te=pe[K];if(E.hasOwnProperty(K))continue;let T=!1;Ad(G)&&Ad(te)?T=!vx(G,te)||M:T=G!==te,T?G!=null?ve(K):j.add(K):G!==void 0&&j.has(K)?ve(K):V.protectedKeys[K]=!0}V.prevProp=_,V.prevResolvedValues=ie,V.isActive&&(E={...E,...ie}),(o||c)&&n.blockInitialAnimation&&(X=!1);const U=N&&M;X&&(!U||F)&&x.push(...ne.map(K=>{const G={type:k};if(typeof K=="string"&&(o||c)&&!U&&n.manuallyAnimateOnMount&&n.parent){const{parent:te}=n,T=Gr(te,K);if(te.enteringChildren&&T){const{delayChildren:R}=T.transition||{};G.delay=qb(te.enteringChildren,n,R)}}return{animation:K,options:G}}))}if(j.size){const z={};if(typeof v.initial!="boolean"){const k=Gr(n,Array.isArray(v.initial)?v.initial[0]:v.initial);k&&k.transition&&(z.transition=k.transition)}j.forEach(k=>{const V=n.getBaseTarget(k),_=n.getValue(k);_&&(_.liveStyle=!0),z[k]=V??null}),x.push({animation:z})}let A=!!x.length;return o&&(v.initial===!1||v.initial===v.animate)&&!n.manuallyAnimateOnMount&&(A=!1),o=!1,c=!1,A?a(x):Promise.resolve()}function p(g,v){var x;if(s[g].isActive===v)return Promise.resolve();(x=n.variantChildren)==null||x.forEach(j=>{var E;return(E=j.animationState)==null?void 0:E.setActive(g,v)}),s[g].isActive=v;const b=m(g);for(const j in s)s[j].protectedKeys={};return b}return{animateChanges:m,setActive:p,setAnimateFunction:f,getState:()=>s,reset:()=>{s=By(),c=!0}}}function jE(n,a){return typeof a=="string"?a!==n:Array.isArray(a)?!vx(a,n):!1}function Lr(n=!1){return{isActive:n,protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}function By(){return{animate:Lr(!0),whileInView:Lr(),whileHover:Lr(),whileTap:Lr(),whileDrag:Lr(),whileFocus:Lr(),exit:Lr()}}function Vd(n,a){n.min=a.min,n.max=a.max}function an(n,a){Vd(n.x,a.x),Vd(n.y,a.y)}function Ly(n,a){n.translate=a.translate,n.scale=a.scale,n.originPoint=a.originPoint,n.origin=a.origin}const bx=1e-4,EE=1-bx,TE=1+bx,xx=.01,CE=0-xx,AE=0+xx;function xt(n){return n.max-n.min}function DE(n,a,s){return Math.abs(n-a)<=s}function Uy(n,a,s,o=.5){n.origin=o,n.originPoint=He(a.min,a.max,n.origin),n.scale=xt(s)/xt(a),n.translate=He(s.min,s.max,n.origin)-n.originPoint,(n.scale>=EE&&n.scale<=TE||isNaN(n.scale))&&(n.scale=1),(n.translate>=CE&&n.translate<=AE||isNaN(n.translate))&&(n.translate=0)}function Zi(n,a,s,o){Uy(n.x,a.x,s.x,o?o.originX:void 0),Uy(n.y,a.y,s.y,o?o.originY:void 0)}function Hy(n,a,s,o=0){const c=o?He(s.min,s.max,o):s.min;n.min=c+a.min,n.max=n.min+xt(a)}function NE(n,a,s,o){Hy(n.x,a.x,s.x,o==null?void 0:o.x),Hy(n.y,a.y,s.y,o==null?void 0:o.y)}function qy(n,a,s,o=0){const c=o?He(s.min,s.max,o):s.min;n.min=a.min-c,n.max=n.min+xt(a)}function cl(n,a,s,o){qy(n.x,a.x,s.x,o==null?void 0:o.x),qy(n.y,a.y,s.y,o==null?void 0:o.y)}function Yy(n,a,s,o,c){return n-=a,n=ll(n,1/s,o),c!==void 0&&(n=ll(n,1/c,o)),n}function ME(n,a=0,s=1,o=.5,c,h=n,f=n){if(yn.test(a)&&(a=parseFloat(a),a=He(f.min,f.max,a/100)-f.min),typeof a!="number")return;let m=He(h.min,h.max,o);n===h&&(m-=a),n.min=Yy(n.min,a,s,m,c),n.max=Yy(n.max,a,s,m,c)}function Gy(n,a,[s,o,c],h,f){ME(n,a[s],a[o],a[c],a.scale,h,f)}const kE=["x","scaleX","originX"],RE=["y","scaleY","originY"];function Py(n,a,s,o){Gy(n.x,a,kE,s?s.x:void 0,o?o.x:void 0),Gy(n.y,a,RE,s?s.y:void 0,o?o.y:void 0)}function Xy(n){return n.translate===0&&n.scale===1}function Sx(n){return Xy(n.x)&&Xy(n.y)}function $y(n,a){return n.min===a.min&&n.max===a.max}function OE(n,a){return $y(n.x,a.x)&&$y(n.y,a.y)}function Fy(n,a){return Math.round(n.min)===Math.round(a.min)&&Math.round(n.max)===Math.round(a.max)}function wx(n,a){return Fy(n.x,a.x)&&Fy(n.y,a.y)}function Ky(n){return xt(n.x)/xt(n.y)}function Zy(n,a){return n.translate===a.translate&&n.scale===a.scale&&n.originPoint===a.originPoint}function mn(n){return[n("x"),n("y")]}function zE(n,a,s){let o="";const c=n.x.translate/a.x,h=n.y.translate/a.y,f=(s==null?void 0:s.z)||0;if((c||h||f)&&(o=`translate3d(${c}px, ${h}px, ${f}px) `),(a.x!==1||a.y!==1)&&(o+=`scale(${1/a.x}, ${1/a.y}) `),s){const{transformPerspective:g,rotate:v,pathRotation:b,rotateX:x,rotateY:j,skewX:E,skewY:C}=s;g&&(o=`perspective(${g}px) ${o}`),v&&(o+=`rotate(${v}deg) `),b&&(o+=`rotate(${b}deg) `),x&&(o+=`rotateX(${x}deg) `),j&&(o+=`rotateY(${j}deg) `),E&&(o+=`skewX(${E}deg) `),C&&(o+=`skewY(${C}deg) `)}const m=n.x.scale*a.x,p=n.y.scale*a.y;return(m!==1||p!==1)&&(o+=`scale(${m}, ${p})`),o||"none"}const _E=Cf.length,Qy=n=>typeof n=="string"?parseFloat(n):n,Jy=n=>typeof n=="number"||de.test(n);function VE(n,a,s,o,c,h){c?(n.opacity=He(0,s.opacity??1,BE(o)),n.opacityExit=He(a.opacity??1,0,LE(o))):h&&(n.opacity=He(a.opacity??1,s.opacity??1,o));for(let f=0;f<_E;f++){const m=Cf[f];let p=Wy(a,m),g=Wy(s,m);if(p===void 0&&g===void 0)continue;p||(p=0),g||(g=0),p===0||g===0||Jy(p)===Jy(g)?(n[m]=Math.max(He(Qy(p),Qy(g),o),0),(yn.test(g)||yn.test(p))&&(n[m]+="%")):n[m]=g}(a.rotate||s.rotate)&&(n.rotate=He(a.rotate||0,s.rotate||0,o))}function Wy(n,a){return n[a]!==void 0?n[a]:n.borderRadius}const BE=jx(0,.5,pb),LE=jx(.5,.95,It);function jx(n,a,s){return o=>o<n?0:o>a?1:s(Wi(n,a,o))}function UE(n,a,s){const o=pt(n)?n:Ha(n);return o.start(jf("",o,a,s)),o.animation}function ts(n,a,s,o={passive:!0}){return n.addEventListener(a,s,o),()=>n.removeEventListener(a,s,o)}const HE=(n,a)=>n.depth-a.depth;class qE{constructor(){this.children=[],this.isDirty=!1}add(a){df(this.children,a),this.isDirty=!0}remove(a){el(this.children,a),this.isDirty=!0}forEach(a){this.isDirty&&this.children.sort(HE),this.isDirty=!1,this.children.forEach(a)}}function YE(n,a){const s=bt.now(),o=({timestamp:c})=>{const h=c-s;h>=a&&(yr(o),n(h-a))};return qe.setup(o,!0),()=>yr(o)}function Zo(n){return pt(n)?n.get():n}class GE{constructor(){this.members=[]}add(a){df(this.members,a);for(let s=this.members.length-1;s>=0;s--){const o=this.members[s];if(o===a||o===this.lead||o===this.prevLead)continue;const c=o.instance;(!c||c.isConnected===!1)&&!o.snapshot&&(el(this.members,o),o.unmount())}a.scheduleRender()}remove(a){if(el(this.members,a),a===this.prevLead&&(this.prevLead=void 0),a===this.lead){const s=this.members[this.members.length-1];s&&this.promote(s)}}relegate(a){var s;for(let o=this.members.indexOf(a)-1;o>=0;o--){const c=this.members[o];if(c.isPresent!==!1&&((s=c.instance)==null?void 0:s.isConnected)!==!1)return this.promote(c),!0}return!1}promote(a,s){var c;const o=this.lead;if(a!==o&&(this.prevLead=o,this.lead=a,a.show(),o)){o.updateSnapshot(),a.scheduleRender();const{layoutDependency:h}=o.options,{layoutDependency:f}=a.options;(h===void 0||h!==f)&&(a.resumeFrom=o,s&&(o.preserveOpacity=!0),o.snapshot&&(a.snapshot=o.snapshot,a.snapshot.latestValues=o.animationValues||o.latestValues),(c=a.root)!=null&&c.isUpdating&&(a.isLayoutDirty=!0)),a.options.crossfade===!1&&o.hide()}}exitAnimationComplete(){this.members.forEach(a=>{var s,o,c,h,f;(o=(s=a.options).onExitComplete)==null||o.call(s),(f=(c=a.resumingFrom)==null?void 0:(h=c.options).onExitComplete)==null||f.call(h)})}scheduleRender(){this.members.forEach(a=>a.instance&&a.scheduleRender(!1))}removeLeadSnapshot(){var a;(a=this.lead)!=null&&a.snapshot&&(this.lead.snapshot=void 0)}}const Qo={hasAnimatedSinceResize:!0,hasEverUpdated:!1},Zu=["","X","Y","Z"],PE=1e3;let XE=0;function Qu(n,a,s,o){const{latestValues:c}=a;c[n]&&(s[n]=c[n],a.setStaticValue(n,0),o&&(o[n]=0))}function Ex(n){if(n.hasCheckedOptimisedAppear=!0,n.root===n)return;const{visualElement:a}=n.options;if(!a)return;const s=$b(a);if(window.MotionHasOptimisedAnimation(s,"transform")){const{layout:c,layoutId:h}=n.options;window.MotionCancelOptimisedAnimation(s,"transform",qe,!(c||h))}const{parent:o}=n;o&&!o.hasCheckedOptimisedAppear&&Ex(o)}function Tx({attachResizeListener:n,defaultParent:a,measureScroll:s,checkIsScrollRoot:o,resetTransform:c}){return class{constructor(f={},m=a==null?void 0:a()){this.id=XE++,this.animationId=0,this.animationCommitId=0,this.children=new Set,this.options={},this.isTreeAnimating=!1,this.isAnimationBlocked=!1,this.isLayoutDirty=!1,this.isProjectionDirty=!1,this.isSharedProjectionDirty=!1,this.isTransformDirty=!1,this.updateManuallyBlocked=!1,this.updateBlockedByResize=!1,this.isUpdating=!1,this.isSVG=!1,this.needsReset=!1,this.shouldResetTransform=!1,this.hasCheckedOptimisedAppear=!1,this.treeScale={x:1,y:1},this.eventHandlers=new Map,this.hasTreeAnimated=!1,this.layoutVersion=0,this.updateScheduled=!1,this.scheduleUpdate=()=>this.update(),this.projectionUpdateScheduled=!1,this.checkUpdateFailed=()=>{this.isUpdating&&(this.isUpdating=!1,this.clearAllSnapshots())},this.updateProjection=()=>{this.projectionUpdateScheduled=!1,this.nodes.forEach(KE),this.nodes.forEach(eT),this.nodes.forEach(tT),this.nodes.forEach(ZE)},this.resolvedRelativeTargetAt=0,this.linkedParentVersion=0,this.hasProjected=!1,this.isVisible=!0,this.animationProgress=0,this.sharedNodes=new Map,this.latestValues=f,this.root=m?m.root||m:this,this.path=m?[...m.path,m]:[],this.parent=m,this.depth=m?m.depth+1:0;for(let p=0;p<this.path.length;p++)this.path[p].shouldResetTransform=!0;this.root===this&&(this.nodes=new qE)}addEventListener(f,m){return this.eventHandlers.has(f)||this.eventHandlers.set(f,new ff),this.eventHandlers.get(f).add(m)}notifyListeners(f,...m){const p=this.eventHandlers.get(f);p&&p.notify(...m)}hasListeners(f){return this.eventHandlers.has(f)}mount(f){if(this.instance)return;this.isSVG=Nf(f)&&!Kj(f),this.instance=f;const{layoutId:m,layout:p,visualElement:g}=this.options;if(g&&!g.current&&g.mount(f),this.root.nodes.add(this),this.parent&&this.parent.children.add(this),this.root.hasTreeAnimated&&(p||m)&&(this.isLayoutDirty=!0),n){let v,b=0;const x=()=>this.root.updateBlockedByResize=!1;qe.read(()=>{b=window.innerWidth}),n(f,()=>{const j=window.innerWidth;j!==b&&(b=j,this.root.updateBlockedByResize=!0,v&&v(),v=YE(x,250),Qo.hasAnimatedSinceResize&&(Qo.hasAnimatedSinceResize=!1,this.nodes.forEach(tv)))})}m&&this.root.registerSharedNode(m,this),this.options.animate!==!1&&g&&(m||p)&&this.addEventListener("didUpdate",({delta:v,hasLayoutChanged:b,hasRelativeLayoutChanged:x,layout:j})=>{if(this.isTreeAnimationBlocked()){this.target=void 0,this.relativeTarget=void 0;return}const E=this.options.transition||g.getDefaultTransition()||sT,{onLayoutAnimationStart:C,onLayoutAnimationComplete:A}=g.getProps(),z=!this.targetLayout||!wx(this.targetLayout,j),k=!b&&x;if(this.options.layoutRoot||this.resumeFrom||k||b&&(z||!this.currentAnimation)){this.resumeFrom&&(this.resumingFrom=this.resumeFrom,this.resumingFrom.resumingFrom=void 0);const V={...wf(E,"layout"),onPlay:C,onComplete:A};(g.shouldReduceMotion||this.options.layoutRoot)&&(V.delay=0,V.type=!1),this.startAnimation(V),this.setAnimationOrigin(v,k,V.path)}else b||tv(this),this.isLead()&&this.options.onExitComplete&&this.options.onExitComplete();this.targetLayout=j})}unmount(){this.options.layoutId&&this.willUpdate(),this.root.nodes.remove(this);const f=this.getStack();f&&f.remove(this),this.parent&&this.parent.children.delete(this),this.instance=void 0,this.eventHandlers.clear(),yr(this.updateProjection)}blockUpdate(){this.updateManuallyBlocked=!0}unblockUpdate(){this.updateManuallyBlocked=!1}isUpdateBlocked(){return this.updateManuallyBlocked||this.updateBlockedByResize}isTreeAnimationBlocked(){return this.isAnimationBlocked||this.parent&&this.parent.isTreeAnimationBlocked()||!1}startUpdate(){this.isUpdateBlocked()||(this.isUpdating=!0,this.nodes&&this.nodes.forEach(nT),this.animationId++)}getTransformTemplate(){const{visualElement:f}=this.options;return f&&f.getProps().transformTemplate}willUpdate(f=!0){if(this.root.hasTreeAnimated=!0,this.root.isUpdateBlocked()){this.options.onExitComplete&&this.options.onExitComplete();return}if(window.MotionCancelOptimisedAnimation&&!this.hasCheckedOptimisedAppear&&Ex(this),!this.root.isUpdating&&this.root.startUpdate(),this.isLayoutDirty)return;this.isLayoutDirty=!0;for(let v=0;v<this.path.length;v++){const b=this.path[v];b.shouldResetTransform=!0,(typeof b.latestValues.x=="string"||typeof b.latestValues.y=="string")&&(b.isLayoutDirty=!0),b.updateScroll("snapshot"),b.options.layoutRoot&&b.willUpdate(!1)}const{layoutId:m,layout:p}=this.options;if(m===void 0&&!p)return;const g=this.getTransformTemplate();this.prevTransformTemplateValue=g?g(this.latestValues,""):void 0,this.updateSnapshot(),f&&this.notifyListeners("willUpdate")}update(){if(this.updateScheduled=!1,this.isUpdateBlocked()){const p=this.updateBlockedByResize;this.unblockUpdate(),this.updateBlockedByResize=!1,this.clearAllSnapshots(),p&&this.nodes.forEach(JE),this.nodes.forEach(Iy);return}if(this.animationId<=this.animationCommitId){this.nodes.forEach(ev);return}this.animationCommitId=this.animationId,this.isUpdating?(this.isUpdating=!1,this.nodes.forEach(WE),this.nodes.forEach(IE),this.nodes.forEach($E),this.nodes.forEach(FE)):this.nodes.forEach(ev),this.clearAllSnapshots();const m=bt.now();mt.delta=vn(0,1e3/60,m-mt.timestamp),mt.timestamp=m,mt.isProcessing=!0,qu.update.process(mt),qu.preRender.process(mt),qu.render.process(mt),mt.isProcessing=!1}didUpdate(){this.updateScheduled||(this.updateScheduled=!0,Af.read(this.scheduleUpdate))}clearAllSnapshots(){this.nodes.forEach(QE),this.sharedNodes.forEach(rT)}scheduleUpdateProjection(){this.projectionUpdateScheduled||(this.projectionUpdateScheduled=!0,qe.preRender(this.updateProjection,!1,!0))}scheduleCheckAfterUnmount(){qe.postRender(()=>{this.isLayoutDirty?this.root.didUpdate():this.root.checkUpdateFailed()})}updateSnapshot(){this.snapshot||!this.instance||(this.snapshot=this.measure(),this.snapshot&&!xt(this.snapshot.measuredBox.x)&&!xt(this.snapshot.measuredBox.y)&&(this.snapshot=void 0))}updateLayout(){if(!this.instance||(this.updateScroll(),!(this.options.alwaysMeasureLayout&&this.isLead())&&!this.isLayoutDirty))return;if(this.resumeFrom&&!this.resumeFrom.instance)for(let p=0;p<this.path.length;p++)this.path[p].updateScroll();const f=this.layout;this.layout=this.measure(!1),this.layoutVersion++,this.layoutCorrected||(this.layoutCorrected=it()),this.isLayoutDirty=!1,this.projectionDelta=void 0,this.notifyListeners("measure",this.layout.layoutBox);const{visualElement:m}=this.options;m&&m.notify("LayoutMeasure",this.layout.layoutBox,f?f.layoutBox:void 0)}updateScroll(f="measure"){let m=!!(this.options.layoutScroll&&this.instance);if(this.scroll&&this.scroll.animationId===this.root.animationId&&this.scroll.phase===f&&(m=!1),m&&this.instance){const p=o(this.instance);this.scroll={animationId:this.root.animationId,phase:f,isRoot:p,offset:s(this.instance),wasRoot:this.scroll?this.scroll.isRoot:p}}}resetTransform(){if(!c)return;const f=this.isLayoutDirty||this.shouldResetTransform||this.options.alwaysMeasureLayout,m=this.projectionDelta&&!Sx(this.projectionDelta),p=this.getTransformTemplate(),g=p?p(this.latestValues,""):void 0,v=g!==this.prevTransformTemplateValue;f&&this.instance&&(m||Ur(this.latestValues)||v)&&(c(this.instance,g),this.shouldResetTransform=!1,this.scheduleRender())}measure(f=!0){const m=this.measurePageBox();let p=this.removeElementScroll(m);return f&&(p=this.removeTransform(p)),oT(p),{animationId:this.root.animationId,measuredBox:m,layoutBox:p,latestValues:{},source:this.id}}measurePageBox(){var g;const{visualElement:f}=this.options;if(!f)return it();const m=f.measureViewportBox();if(!(((g=this.scroll)==null?void 0:g.wasRoot)||this.path.some(lT))){const{scroll:v}=this.root;v&&(pn(m.x,v.offset.x),pn(m.y,v.offset.y))}return m}removeElementScroll(f){var p;const m=it();if(an(m,f),(p=this.scroll)!=null&&p.wasRoot)return m;for(let g=0;g<this.path.length;g++){const v=this.path[g],{scroll:b,options:x}=v;v!==this.root&&b&&x.layoutScroll&&(b.wasRoot&&an(m,f),pn(m.x,b.offset.x),pn(m.y,b.offset.y))}return m}applyTransform(f,m=!1,p){var v,b;const g=p||it();an(g,f);for(let x=0;x<this.path.length;x++){const j=this.path[x];!m&&j.options.layoutScroll&&j.scroll&&j!==j.root&&(pn(g.x,-j.scroll.offset.x),pn(g.y,-j.scroll.offset.y)),Ur(j.latestValues)&&Ko(g,j.latestValues,(v=j.layout)==null?void 0:v.layoutBox)}return Ur(this.latestValues)&&Ko(g,this.latestValues,(b=this.layout)==null?void 0:b.layoutBox),g}removeTransform(f){var p;const m=it();an(m,f);for(let g=0;g<this.path.length;g++){const v=this.path[g];if(!Ur(v.latestValues))continue;let b;v.instance&&(Od(v.latestValues)&&v.updateSnapshot(),b=it(),an(b,v.measurePageBox())),Py(m,v.latestValues,(p=v.snapshot)==null?void 0:p.layoutBox,b)}return Ur(this.latestValues)&&Py(m,this.latestValues),m}setTargetDelta(f){this.targetDelta=f,this.root.scheduleUpdateProjection(),this.isProjectionDirty=!0}setOptions(f){this.options={...this.options,...f,crossfade:f.crossfade!==void 0?f.crossfade:!0}}clearMeasurements(){this.scroll=void 0,this.layout=void 0,this.snapshot=void 0,this.prevTransformTemplateValue=void 0,this.targetDelta=void 0,this.target=void 0,this.isLayoutDirty=!1}forceRelativeParentToResolveTarget(){this.relativeParent&&this.relativeParent.resolvedRelativeTargetAt!==mt.timestamp&&this.relativeParent.resolveTargetDelta(!0)}resolveTargetDelta(f=!1){var j;const m=this.getLead();this.isProjectionDirty||(this.isProjectionDirty=m.isProjectionDirty),this.isTransformDirty||(this.isTransformDirty=m.isTransformDirty),this.isSharedProjectionDirty||(this.isSharedProjectionDirty=m.isSharedProjectionDirty);const p=!!this.resumingFrom||this!==m;if(!(f||p&&this.isSharedProjectionDirty||this.isProjectionDirty||(j=this.parent)!=null&&j.isProjectionDirty||this.attemptToResolveRelativeTarget||this.root.updateBlockedByResize))return;const{layout:v,layoutId:b}=this.options;if(!this.layout||!(v||b))return;this.resolvedRelativeTargetAt=mt.timestamp;const x=this.getClosestProjectingParent();x&&this.linkedParentVersion!==x.layoutVersion&&!x.options.layoutRoot&&this.removeRelativeTarget(),!this.targetDelta&&!this.relativeTarget&&(this.options.layoutAnchor!==!1&&x&&x.layout?this.createRelativeTarget(x,this.layout.layoutBox,x.layout.layoutBox):this.removeRelativeTarget()),!(!this.relativeTarget&&!this.targetDelta)&&(this.target||(this.target=it(),this.targetWithTransforms=it()),this.relativeTarget&&this.relativeTargetOrigin&&this.relativeParent&&this.relativeParent.target?(this.forceRelativeParentToResolveTarget(),NE(this.target,this.relativeTarget,this.relativeParent.target,this.options.layoutAnchor||void 0)):this.targetDelta?(this.resumingFrom?this.applyTransform(this.layout.layoutBox,!1,this.target):an(this.target,this.layout.layoutBox),cx(this.target,this.targetDelta)):an(this.target,this.layout.layoutBox),this.attemptToResolveRelativeTarget&&(this.attemptToResolveRelativeTarget=!1,this.options.layoutAnchor!==!1&&x&&!!x.resumingFrom==!!this.resumingFrom&&!x.options.layoutScroll&&x.target&&this.animationProgress!==1?this.createRelativeTarget(x,this.target,x.target):this.relativeParent=this.relativeTarget=void 0))}getClosestProjectingParent(){if(!(!this.parent||Od(this.parent.latestValues)||lx(this.parent.latestValues)))return this.parent.isProjecting()?this.parent:this.parent.getClosestProjectingParent()}isProjecting(){return!!((this.relativeTarget||this.targetDelta||this.options.layoutRoot)&&this.layout)}createRelativeTarget(f,m,p){this.relativeParent=f,this.linkedParentVersion=f.layoutVersion,this.forceRelativeParentToResolveTarget(),this.relativeTarget=it(),this.relativeTargetOrigin=it(),cl(this.relativeTargetOrigin,m,p,this.options.layoutAnchor||void 0),an(this.relativeTarget,this.relativeTargetOrigin)}removeRelativeTarget(){this.relativeParent=this.relativeTarget=void 0}calcProjection(){var E;const f=this.getLead(),m=!!this.resumingFrom||this!==f;let p=!0;if((this.isProjectionDirty||(E=this.parent)!=null&&E.isProjectionDirty)&&(p=!1),m&&(this.isSharedProjectionDirty||this.isTransformDirty)&&(p=!1),this.resolvedRelativeTargetAt===mt.timestamp&&(p=!1),p)return;const{layout:g,layoutId:v}=this.options;if(this.isTreeAnimating=!!(this.parent&&this.parent.isTreeAnimating||this.currentAnimation||this.pendingAnimation),this.isTreeAnimating||(this.targetDelta=this.relativeTarget=void 0),!this.layout||!(g||v))return;an(this.layoutCorrected,this.layout.layoutBox);const b=this.treeScale.x,x=this.treeScale.y;aE(this.layoutCorrected,this.treeScale,this.path,m),f.layout&&!f.target&&(this.treeScale.x!==1||this.treeScale.y!==1)&&(f.target=f.layout.layoutBox,f.targetWithTransforms=it());const{target:j}=f;if(!j){this.prevProjectionDelta&&(this.createProjectionDeltas(),this.scheduleRender());return}!this.projectionDelta||!this.prevProjectionDelta?this.createProjectionDeltas():(Ly(this.prevProjectionDelta.x,this.projectionDelta.x),Ly(this.prevProjectionDelta.y,this.projectionDelta.y)),Zi(this.projectionDelta,this.layoutCorrected,j,this.latestValues),(this.treeScale.x!==b||this.treeScale.y!==x||!Zy(this.projectionDelta.x,this.prevProjectionDelta.x)||!Zy(this.projectionDelta.y,this.prevProjectionDelta.y))&&(this.hasProjected=!0,this.scheduleRender(),this.notifyListeners("projectionUpdate",j))}hide(){this.isVisible=!1}show(){this.isVisible=!0}scheduleRender(f=!0){var m;if((m=this.options.visualElement)==null||m.scheduleRender(),f){const p=this.getStack();p&&p.scheduleRender()}this.resumingFrom&&!this.resumingFrom.instance&&(this.resumingFrom=void 0)}createProjectionDeltas(){this.prevProjectionDelta=Ba(),this.projectionDelta=Ba(),this.projectionDeltaWithTransform=Ba()}setAnimationOrigin(f,m=!1,p){const g=this.snapshot,v=g?g.latestValues:{},b={...this.latestValues},x=Ba();(!this.relativeParent||!this.relativeParent.options.layoutRoot)&&(this.relativeTarget=this.relativeTargetOrigin=void 0),this.attemptToResolveRelativeTarget=!m;const j=it(),E=g?g.source:void 0,C=this.layout?this.layout.source:void 0,A=E!==C,z=this.getStack(),k=!z||z.members.length<=1,V=!!(A&&!k&&this.options.crossfade===!0&&!this.path.some(iT));this.animationProgress=0;let _;const L=p==null?void 0:p.interpolateProjection(f);this.mixTargetDelta=Y=>{const N=Y/1e3,M=L==null?void 0:L(N);M?(x.x.translate=M.x,x.x.scale=He(f.x.scale,1,N),x.x.origin=f.x.origin,x.x.originPoint=f.x.originPoint,x.y.translate=M.y,x.y.scale=He(f.y.scale,1,N),x.y.origin=f.y.origin,x.y.originPoint=f.y.originPoint):(nv(x.x,f.x,N),nv(x.y,f.y,N)),this.setTargetDelta(x),this.relativeTarget&&this.relativeTargetOrigin&&this.layout&&this.relativeParent&&this.relativeParent.layout&&(cl(j,this.layout.layoutBox,this.relativeParent.layout.layoutBox,this.options.layoutAnchor||void 0),aT(this.relativeTarget,this.relativeTargetOrigin,j,N),_&&OE(this.relativeTarget,_)&&(this.isProjectionDirty=!1),_||(_=it()),an(_,this.relativeTarget)),A&&(this.animationValues=b,VE(b,v,this.latestValues,N,V,k)),M&&M.rotate!==void 0&&(this.animationValues||(this.animationValues=b),this.animationValues.pathRotation=M.rotate),this.root.scheduleUpdateProjection(),this.scheduleRender(),this.animationProgress=N},this.mixTargetDelta(this.options.layoutRoot?1e3:0)}startAnimation(f){var m,p,g;this.notifyListeners("animationStart"),(m=this.currentAnimation)==null||m.stop(),(g=(p=this.resumingFrom)==null?void 0:p.currentAnimation)==null||g.stop(),this.pendingAnimation&&(yr(this.pendingAnimation),this.pendingAnimation=void 0),this.pendingAnimation=qe.update(()=>{Qo.hasAnimatedSinceResize=!0,this.motionValue||(this.motionValue=Ha(0)),this.motionValue.jump(0,!1),this.currentAnimation=UE(this.motionValue,[0,1e3],{...f,velocity:0,isSync:!0,onUpdate:v=>{this.mixTargetDelta(v),f.onUpdate&&f.onUpdate(v)},onComplete:()=>{f.onComplete&&f.onComplete(),this.completeAnimation()}}),this.resumingFrom&&(this.resumingFrom.currentAnimation=this.currentAnimation),this.pendingAnimation=void 0})}completeAnimation(){this.resumingFrom&&(this.resumingFrom.currentAnimation=void 0,this.resumingFrom.preserveOpacity=void 0);const f=this.getStack();f&&f.exitAnimationComplete(),this.resumingFrom=this.currentAnimation=this.animationValues=void 0,this.notifyListeners("animationComplete")}finishAnimation(){this.currentAnimation&&(this.mixTargetDelta&&this.mixTargetDelta(PE),this.currentAnimation.stop()),this.completeAnimation()}applyTransformsToTarget(){const f=this.getLead();let{targetWithTransforms:m,target:p,layout:g,latestValues:v}=f;if(!(!m||!p||!g)){if(this!==f&&this.layout&&g&&Cx(this.options.animationType,this.layout.layoutBox,g.layoutBox)){p=this.target||it();const b=xt(this.layout.layoutBox.x);p.x.min=f.target.x.min,p.x.max=p.x.min+b;const x=xt(this.layout.layoutBox.y);p.y.min=f.target.y.min,p.y.max=p.y.min+x}an(m,p),Ko(m,v),Zi(this.projectionDeltaWithTransform,this.layoutCorrected,m,v)}}registerSharedNode(f,m){this.sharedNodes.has(f)||this.sharedNodes.set(f,new GE),this.sharedNodes.get(f).add(m);const g=m.options.initialPromotionConfig;m.promote({transition:g?g.transition:void 0,preserveFollowOpacity:g&&g.shouldPreserveFollowOpacity?g.shouldPreserveFollowOpacity(m):void 0})}isLead(){const f=this.getStack();return f?f.lead===this:!0}getLead(){var m;const{layoutId:f}=this.options;return f?((m=this.getStack())==null?void 0:m.lead)||this:this}getPrevLead(){var m;const{layoutId:f}=this.options;return f?(m=this.getStack())==null?void 0:m.prevLead:void 0}getStack(){const{layoutId:f}=this.options;if(f)return this.root.sharedNodes.get(f)}promote({needsReset:f,transition:m,preserveFollowOpacity:p}={}){const g=this.getStack();g&&g.promote(this,p),f&&(this.projectionDelta=void 0,this.needsReset=!0),m&&this.setOptions({transition:m})}relegate(){const f=this.getStack();return f?f.relegate(this):!1}resetSkewAndRotation(){const{visualElement:f}=this.options;if(!f)return;let m=!1;const{latestValues:p}=f;if((p.z||p.rotate||p.rotateX||p.rotateY||p.rotateZ||p.skewX||p.skewY)&&(m=!0),!m)return;const g={};p.z&&Qu("z",f,g,this.animationValues);for(let v=0;v<Zu.length;v++)Qu(`rotate${Zu[v]}`,f,g,this.animationValues),Qu(`skew${Zu[v]}`,f,g,this.animationValues);f.render();for(const v in g)f.setStaticValue(v,g[v]),this.animationValues&&(this.animationValues[v]=g[v]);f.scheduleRender()}applyProjectionStyles(f,m){if(!this.instance||this.isSVG)return;if(!this.isVisible){f.visibility="hidden";return}const p=this.getTransformTemplate();if(this.needsReset){this.needsReset=!1,f.visibility="",f.opacity="",f.pointerEvents=Zo(m==null?void 0:m.pointerEvents)||"",f.transform=p?p(this.latestValues,""):"none";return}const g=this.getLead();if(!this.projectionDelta||!this.layout||!g.target){this.options.layoutId&&(f.opacity=this.latestValues.opacity!==void 0?this.latestValues.opacity:1,f.pointerEvents=Zo(m==null?void 0:m.pointerEvents)||""),this.hasProjected&&!Ur(this.latestValues)&&(f.transform=p?p({},""):"none",this.hasProjected=!1);return}f.visibility="";const v=g.animationValues||g.latestValues;this.applyTransformsToTarget();let b=zE(this.projectionDeltaWithTransform,this.treeScale,v);p&&(b=p(v,b)),f.transform=b;const{x,y:j}=this.projectionDelta;f.transformOrigin=`${x.origin*100}% ${j.origin*100}% 0`,g.animationValues?f.opacity=g===this?v.opacity??this.latestValues.opacity??1:this.preserveOpacity?this.latestValues.opacity:v.opacityExit:f.opacity=g===this?v.opacity!==void 0?v.opacity:"":v.opacityExit!==void 0?v.opacityExit:0;for(const E in _d){if(v[E]===void 0)continue;const{correct:C,applyTo:A,isCSSVariable:z}=_d[E],k=b==="none"?v[E]:C(v[E],g);if(A){const V=A.length;for(let _=0;_<V;_++)f[A[_]]=k}else z?this.options.visualElement.renderState.vars[E]=k:f[E]=k}this.options.layoutId&&(f.pointerEvents=g===this?Zo(m==null?void 0:m.pointerEvents)||"":"none")}clearSnapshot(){this.resumeFrom=this.snapshot=void 0}resetTree(){this.root.nodes.forEach(f=>{var m;return(m=f.currentAnimation)==null?void 0:m.stop()}),this.root.nodes.forEach(Iy),this.root.sharedNodes.clear()}}}function $E(n){n.updateLayout()}function FE(n){var s;const a=((s=n.resumeFrom)==null?void 0:s.snapshot)||n.snapshot;if(n.isLead()&&n.layout&&a&&n.hasListeners("didUpdate")){const{layoutBox:o,measuredBox:c}=n.layout,{animationType:h}=n.options,f=a.source!==n.layout.source;if(h==="size")mn(b=>{const x=f?a.measuredBox[b]:a.layoutBox[b],j=xt(x);x.min=o[b].min,x.max=x.min+j});else if(h==="x"||h==="y"){const b=h==="x"?"y":"x";Vd(f?a.measuredBox[b]:a.layoutBox[b],o[b])}else Cx(h,a.layoutBox,o)&&mn(b=>{const x=f?a.measuredBox[b]:a.layoutBox[b],j=xt(o[b]);x.max=x.min+j,n.relativeTarget&&!n.currentAnimation&&(n.isProjectionDirty=!0,n.relativeTarget[b].max=n.relativeTarget[b].min+j)});const m=Ba();Zi(m,o,a.layoutBox);const p=Ba();f?Zi(p,n.applyTransform(c,!0),a.measuredBox):Zi(p,o,a.layoutBox);const g=!Sx(m);let v=!1;if(!n.resumeFrom){const b=n.getClosestProjectingParent();if(b&&!b.resumeFrom){const{snapshot:x,layout:j}=b;if(x&&j){const E=n.options.layoutAnchor||void 0,C=it();cl(C,a.layoutBox,x.layoutBox,E);const A=it();cl(A,o,j.layoutBox,E),wx(C,A)||(v=!0),b.options.layoutRoot&&(n.relativeTarget=A,n.relativeTargetOrigin=C,n.relativeParent=b)}}}n.notifyListeners("didUpdate",{layout:o,snapshot:a,delta:p,layoutDelta:m,hasLayoutChanged:g,hasRelativeLayoutChanged:v})}else if(n.isLead()){const{onExitComplete:o}=n.options;o&&o()}n.options.transition=void 0}function KE(n){n.parent&&(n.isProjecting()||(n.isProjectionDirty=n.parent.isProjectionDirty),n.isSharedProjectionDirty||(n.isSharedProjectionDirty=!!(n.isProjectionDirty||n.parent.isProjectionDirty||n.parent.isSharedProjectionDirty)),n.isTransformDirty||(n.isTransformDirty=n.parent.isTransformDirty))}function ZE(n){n.isProjectionDirty=n.isSharedProjectionDirty=n.isTransformDirty=!1}function QE(n){n.clearSnapshot()}function Iy(n){n.clearMeasurements()}function JE(n){n.isLayoutDirty=!0,n.updateLayout()}function ev(n){n.isLayoutDirty=!1}function WE(n){n.isAnimationBlocked&&n.layout&&!n.isLayoutDirty&&(n.snapshot=n.layout,n.isLayoutDirty=!0)}function IE(n){const{visualElement:a}=n.options;a&&a.getProps().onBeforeLayoutMeasure&&a.notify("BeforeLayoutMeasure"),n.resetTransform()}function tv(n){n.finishAnimation(),n.targetDelta=n.relativeTarget=n.target=void 0,n.isProjectionDirty=!0}function eT(n){n.resolveTargetDelta()}function tT(n){n.calcProjection()}function nT(n){n.resetSkewAndRotation()}function rT(n){n.removeLeadSnapshot()}function nv(n,a,s){n.translate=He(a.translate,0,s),n.scale=He(a.scale,1,s),n.origin=a.origin,n.originPoint=a.originPoint}function rv(n,a,s,o){n.min=He(a.min,s.min,o),n.max=He(a.max,s.max,o)}function aT(n,a,s,o){rv(n.x,a.x,s.x,o),rv(n.y,a.y,s.y,o)}function iT(n){return n.animationValues&&n.animationValues.opacityExit!==void 0}const sT={duration:.45,ease:[.4,0,.1,1]},av=n=>typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().includes(n),iv=av("applewebkit/")&&!av("chrome/")?Math.round:It;function sv(n){n.min=iv(n.min),n.max=iv(n.max)}function oT(n){sv(n.x),sv(n.y)}function Cx(n,a,s){return n==="position"||n==="preserve-aspect"&&!DE(Ky(a),Ky(s),.2)}function lT(n){var a;return n!==n.root&&((a=n.scroll)==null?void 0:a.wasRoot)}const cT=Tx({attachResizeListener:(n,a)=>ts(n,"resize",a),measureScroll:()=>{var n,a;return{x:document.documentElement.scrollLeft||((n=document.body)==null?void 0:n.scrollLeft)||0,y:document.documentElement.scrollTop||((a=document.body)==null?void 0:a.scrollTop)||0}},checkIsScrollRoot:()=>!0}),Ju={current:void 0},Ax=Tx({measureScroll:n=>({x:n.scrollLeft,y:n.scrollTop}),defaultParent:()=>{if(!Ju.current){const n=new cT({});n.mount(window),n.setOptions({layoutScroll:!0}),Ju.current=n}return Ju.current},resetTransform:(n,a)=>{n.style.transform=a!==void 0?a:"none"},checkIsScrollRoot:n=>window.getComputedStyle(n).position==="fixed"}),_f=S.createContext({transformPagePoint:n=>n,isStatic:!1,reducedMotion:"never"});function ov(n,a){if(typeof n=="function")return n(a);n!=null&&(n.current=a)}function uT(...n){return a=>{let s=!1;const o=n.map(c=>{const h=ov(c,a);return!s&&typeof h=="function"&&(s=!0),h});if(s)return()=>{for(let c=0;c<o.length;c++){const h=o[c];typeof h=="function"?h():ov(n[c],null)}}}}function dT(...n){return S.useCallback(uT(...n),n)}class fT extends S.Component{getSnapshotBeforeUpdate(a){const s=this.props.childRef.current;if(Po(s)&&a.isPresent&&!this.props.isPresent&&this.props.pop!==!1){const o=s.offsetParent,c=Po(o)&&o.offsetWidth||0,h=Po(o)&&o.offsetHeight||0,f=getComputedStyle(s),m=this.props.sizeRef.current;m.height=parseFloat(f.height),m.width=parseFloat(f.width),m.top=s.offsetTop,m.left=s.offsetLeft,m.right=c-m.width-m.left,m.bottom=h-m.height-m.top,m.direction=f.direction}return null}componentDidUpdate(){}render(){return this.props.children}}function hT({children:n,isPresent:a,anchorX:s,anchorY:o,root:c,pop:h}){var x;const f=S.useId(),m=S.useRef(null),p=S.useRef({width:0,height:0,top:0,left:0,right:0,bottom:0,direction:"ltr"}),{nonce:g}=S.useContext(_f),v=h!==!1?((x=n.props)==null?void 0:x.ref)??(n==null?void 0:n.ref):void 0,b=dT(m,v);return S.useInsertionEffect(()=>{const{width:j,height:E,top:C,left:A,right:z,bottom:k,direction:V}=p.current;if(a||h===!1||!m.current||!j||!E)return;const _=V==="rtl",L=s==="left"?_?`right: ${z}`:`left: ${A}`:_?`left: ${A}`:`right: ${z}`,Y=o==="bottom"?`bottom: ${k}`:`top: ${C}`;m.current.dataset.motionPopId=f;const N=document.createElement("style");g&&(N.nonce=g);const M=c??document.head;return M.appendChild(N),N.sheet&&N.sheet.insertRule(`
          [data-motion-pop-id="${f}"] {
            position: absolute !important;
            width: ${j}px !important;
            height: ${E}px !important;
            ${L}px !important;
            ${Y}px !important;
          }
        `),()=>{var X;(X=m.current)==null||X.removeAttribute("data-motion-pop-id"),M.contains(N)&&M.removeChild(N)}},[a]),u.jsx(fT,{isPresent:a,childRef:m,sizeRef:p,pop:h,children:h===!1?n:S.cloneElement(n,{ref:b})})}const mT=({children:n,initial:a,isPresent:s,onExitComplete:o,custom:c,presenceAffectsLayout:h,mode:f,anchorX:m,anchorY:p,root:g})=>{const v=cf(pT),b=S.useId(),x=S.useRef(s),j=S.useRef(o);uf(()=>{x.current=s,j.current=o});let E=!0,C=S.useMemo(()=>(E=!1,{id:b,initial:a,isPresent:s,custom:c,onExitComplete:A=>{v.set(A,!0);for(const z of v.values())if(!z)return;o&&o()},register:A=>(v.set(A,!1),()=>{var z;v.delete(A),!x.current&&!v.size&&((z=j.current)==null||z.call(j))})}),[s,v,o]);return h&&E&&(C={...C}),S.useMemo(()=>{v.forEach((A,z)=>v.set(z,!1))},[s]),S.useEffect(()=>{!s&&!v.size&&o&&o()},[s]),n=u.jsx(hT,{pop:f==="popLayout",isPresent:s,anchorX:m,anchorY:p,root:g,children:n}),u.jsx(fl.Provider,{value:C,children:n})};function pT(){return new Map}function Dx(n=!0){const a=S.useContext(fl);if(a===null)return[!0,null];const{isPresent:s,onExitComplete:o,register:c}=a,h=S.useId();S.useEffect(()=>{if(n)return c(h)},[n]);const f=S.useCallback(()=>n&&o&&o(h),[h,o,n]);return!s&&o?[!1,f]:[!0]}const Ro=n=>n.key||"";function lv(n){const a=[];return S.Children.forEach(n,s=>{S.isValidElement(s)&&a.push(s)}),a}const gT=({children:n,custom:a,initial:s=!0,onExitComplete:o,presenceAffectsLayout:c=!0,mode:h="sync",propagate:f=!1,anchorX:m="left",anchorY:p="top",root:g})=>{const[v,b]=Dx(f),x=S.useMemo(()=>lv(n),[n]),j=f&&!v?[]:x.map(Ro),E=S.useRef(!0),C=S.useRef(x),A=cf(()=>new Map),z=S.useRef(new Set),[k,V]=S.useState(x),[_,L]=S.useState(x);uf(()=>{E.current=!1,C.current=x;for(let M=0;M<_.length;M++){const X=Ro(_[M]);j.includes(X)?(A.delete(X),z.current.delete(X)):A.get(X)!==!0&&A.set(X,!1)}},[_,j.length,j.join("-")]);const Y=[];if(x!==k){let M=[...x];for(let X=0;X<_.length;X++){const F=_[X],ne=Ro(F);j.includes(ne)||(M.splice(X,0,F),Y.push(F))}return h==="wait"&&Y.length&&(M=Y),L(lv(M)),V(x),null}const{forceRender:N}=S.useContext(lf);return u.jsx(u.Fragment,{children:_.map(M=>{const X=Ro(M),F=f&&!v?!1:x===_||j.includes(X),ne=()=>{if(z.current.has(X))return;if(A.has(X))z.current.add(X),A.set(X,!0);else return;let ie=!0;A.forEach(pe=>{pe||(ie=!1)}),ie&&(N==null||N(),L(C.current),f&&(b==null||b()),o&&o())};return u.jsx(mT,{isPresent:F,initial:!E.current||s?void 0:!1,custom:a,presenceAffectsLayout:c,mode:h,root:g,onExitComplete:F?void 0:ne,anchorX:m,anchorY:p,children:M},X)})})},Nx=S.createContext({strict:!1}),cv={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]};let uv=!1;function yT(){if(uv)return;const n={};for(const a in cv)n[a]={isEnabled:s=>cv[a].some(o=>!!s[o])};ix(n),uv=!0}function Mx(){return yT(),eE()}function vT(n){const a=Mx();for(const s in n)a[s]={...a[s],...n[s]};ix(a)}const bT=new Set(["animate","exit","variants","initial","style","values","variants","transition","transformTemplate","custom","inherit","onBeforeLayoutMeasure","onAnimationStart","onAnimationComplete","onUpdate","onDragStart","onDrag","onDragEnd","onMeasureDragConstraints","onDirectionLock","onDragTransitionEnd","_dragX","_dragY","onHoverStart","onHoverEnd","onViewportEnter","onViewportLeave","globalTapTarget","propagate","ignoreStrict","viewport"]);function ul(n){return n.startsWith("while")||n.startsWith("drag")&&n!=="draggable"||n.startsWith("layout")||n.startsWith("onTap")||n.startsWith("onPan")||n.startsWith("onLayout")||bT.has(n)}let kx=n=>!ul(n);function xT(n){typeof n=="function"&&(kx=a=>a.startsWith("on")?!ul(a):n(a))}try{xT(require("@emotion/is-prop-valid").default)}catch{}function ST(n,a,s){const o={};for(const c in n)c==="values"&&typeof n.values=="object"||pt(n[c])||(kx(c)||s===!0&&ul(c)||!a&&!ul(c)||n.draggable&&c.startsWith("onDrag"))&&(o[c]=n[c]);return o}const yl=S.createContext({});function wT(n,a){if(gl(n)){const{initial:s,animate:o}=n;return{initial:s===!1||es(s)?s:void 0,animate:es(o)?o:void 0}}return n.inherit!==!1?a:{}}function jT(n){const{initial:a,animate:s}=wT(n,S.useContext(yl));return S.useMemo(()=>({initial:a,animate:s}),[dv(a),dv(s)])}function dv(n){return Array.isArray(n)?n.join(" "):n}const Vf=()=>({style:{},transform:{},transformOrigin:{},vars:{}});function Rx(n,a,s){for(const o in a)!pt(a[o])&&!fx(o,s)&&(n[o]=a[o])}function ET({transformTemplate:n},a){return S.useMemo(()=>{const s=Vf();return Of(s,a,n),Object.assign({},s.vars,s.style)},[a])}function TT(n,a){const s=n.style||{},o={};return Rx(o,s,n),Object.assign(o,ET(n,a)),o}function CT(n,a){const s={},o=TT(n,a);return n.drag&&n.dragListener!==!1&&(s.draggable=!1,o.userSelect=o.WebkitUserSelect=o.WebkitTouchCallout="none",o.touchAction=n.drag===!0?"none":`pan-${n.drag==="x"?"y":"x"}`),n.tabIndex===void 0&&(n.onTap||n.onTapStart||n.whileTap)&&(s.tabIndex=0),s.style=o,s}const Ox=()=>({...Vf(),attrs:{}});function AT(n,a,s,o){const c=S.useMemo(()=>{const h=Ox();return hx(h,a,px(o),n.transformTemplate,n.style),{...h.attrs,style:{...h.style}}},[a]);if(n.style){const h={};Rx(h,n.style,n),c.style={...h,...c.style}}return c}const DT=["animate","circle","defs","desc","ellipse","g","image","line","filter","marker","mask","metadata","path","pattern","polygon","polyline","rect","stop","switch","symbol","svg","text","tspan","use","view"];function Bf(n){return typeof n!="string"||n.includes("-")?!1:!!(DT.indexOf(n)>-1||/[A-Z]/u.test(n))}function NT(n,a,s,{latestValues:o},c,h=!1,f){const p=(f??Bf(n)?AT:CT)(a,o,c,n),g=ST(a,typeof n=="string",h),v=n!==S.Fragment?{...g,...p,ref:s}:{},{children:b}=a,x=S.useMemo(()=>pt(b)?b.get():b,[b]);return S.createElement(n,{...v,children:x})}function MT({scrapeMotionValuesFromProps:n,createRenderState:a},s,o,c){return{latestValues:kT(s,o,c,n),renderState:a()}}function kT(n,a,s,o){const c={},h=o(n,{});for(const x in h)c[x]=Zo(h[x]);let{initial:f,animate:m}=n;const p=gl(n),g=rx(n);a&&g&&!p&&n.inherit!==!1&&(f===void 0&&(f=a.initial),m===void 0&&(m=a.animate));let v=s?s.initial===!1:!1;v=v||f===!1;const b=v?m:f;if(b&&typeof b!="boolean"&&!pl(b)){const x=Array.isArray(b)?b:[b];for(let j=0;j<x.length;j++){const E=Ef(n,x[j]);if(E){const{transitionEnd:C,transition:A,...z}=E;for(const k in z){let V=z[k];if(Array.isArray(V)){const _=v?V.length-1:0;V=V[_]}V!==null&&(c[k]=V)}for(const k in C)c[k]=C[k]}}}return c}const zx=n=>(a,s)=>{const o=S.useContext(yl),c=S.useContext(fl),h=()=>MT(n,a,o,c);return s?h():cf(h)},RT=zx({scrapeMotionValuesFromProps:zf,createRenderState:Vf}),OT=zx({scrapeMotionValuesFromProps:gx,createRenderState:Ox}),zT=Symbol.for("motionComponentSymbol");function _T(n,a,s){const o=S.useRef(s);S.useInsertionEffect(()=>{o.current=s});const c=S.useRef(null);return S.useCallback(h=>{var m;h&&((m=n.onMount)==null||m.call(n,h)),a&&(h?a.mount(h):a.unmount());const f=o.current;if(typeof f=="function")if(h){const p=f(h);typeof p=="function"&&(c.current=p)}else c.current?(c.current(),c.current=null):f(h);else f&&(f.current=h)},[a])}const _x=S.createContext({});function Oa(n){return n&&typeof n=="object"&&Object.prototype.hasOwnProperty.call(n,"current")}function VT(n,a,s,o,c,h){var V,_;const{visualElement:f}=S.useContext(yl),m=S.useContext(Nx),p=S.useContext(fl),g=S.useContext(_f),v=g.reducedMotion,b=g.skipAnimations,x=S.useRef(null),j=S.useRef(!1);o=o||m.renderer,!x.current&&o&&(x.current=o(n,{visualState:a,parent:f,props:s,presenceContext:p,blockInitialAnimation:p?p.initial===!1:!1,reducedMotionConfig:v,skipAnimations:b,isSVG:h}),j.current&&x.current&&(x.current.manuallyAnimateOnMount=!0));const E=x.current,C=S.useContext(_x);E&&!E.projection&&c&&(E.type==="html"||E.type==="svg")&&BT(x.current,s,c,C);const A=S.useRef(!1);S.useInsertionEffect(()=>{E&&A.current&&E.update(s,p)});const z=s[Xb],k=S.useRef(!!z&&typeof window<"u"&&!((V=window.MotionHandoffIsComplete)!=null&&V.call(window,z))&&((_=window.MotionHasOptimisedAnimation)==null?void 0:_.call(window,z)));return uf(()=>{j.current=!0,E&&(A.current=!0,window.MotionIsMounted=!0,E.updateFeatures(),E.scheduleRenderMicrotask(),k.current&&E.animationState&&E.animationState.animateChanges())}),S.useEffect(()=>{E&&(!k.current&&E.animationState&&E.animationState.animateChanges(),k.current&&(queueMicrotask(()=>{var L;(L=window.MotionHandoffMarkAsComplete)==null||L.call(window,z)}),k.current=!1),E.enteringChildren=void 0)}),E}function BT(n,a,s,o){const{layoutId:c,layout:h,drag:f,dragConstraints:m,layoutScroll:p,layoutRoot:g,layoutAnchor:v,layoutCrossfade:b}=a;n.projection=new s(n.latestValues,a["data-framer-portal-id"]?void 0:Vx(n.parent)),n.projection.setOptions({layoutId:c,layout:h,alwaysMeasureLayout:!!f||m&&Oa(m),visualElement:n,animationType:typeof h=="string"?h:"both",initialPromotionConfig:o,crossfade:b,layoutScroll:p,layoutRoot:g,layoutAnchor:v})}function Vx(n){if(n)return n.options.allowProjection!==!1?n.projection:Vx(n.parent)}function Wu(n,{forwardMotionProps:a=!1,type:s}={},o,c){o&&vT(o);const h=s?s==="svg":Bf(n),f=h?OT:RT;function m(g,v){let b;const x={...S.useContext(_f),...g,layoutId:LT(g)},{isStatic:j}=x,E=jT(g),C=f(g,j);if(!j&&typeof window<"u"){UT();const A=HT(x);b=A.MeasureLayout,E.visualElement=VT(n,C,x,c,A.ProjectionNode,h)}return u.jsxs(yl.Provider,{value:E,children:[b&&E.visualElement?u.jsx(b,{visualElement:E.visualElement,...x}):null,NT(n,g,_T(C,E.visualElement,v),C,j,a,h)]})}m.displayName=`motion.${typeof n=="string"?n:`create(${n.displayName??n.name??""})`}`;const p=S.forwardRef(m);return p[zT]=n,p}function LT({layoutId:n}){const a=S.useContext(lf).id;return a&&n!==void 0?a+"-"+n:n}function UT(n,a){S.useContext(Nx).strict}function HT(n){const a=Mx(),{drag:s,layout:o}=a;if(!s&&!o)return{};const c={...s,...o};return{MeasureLayout:s!=null&&s.isEnabled(n)||o!=null&&o.isEnabled(n)?c.MeasureLayout:void 0,ProjectionNode:c.ProjectionNode}}function qT(n,a){if(typeof Proxy>"u")return Wu;const s=new Map,o=(h,f)=>Wu(h,f,n,a),c=(h,f)=>o(h,f);return new Proxy(c,{get:(h,f)=>f==="create"?o:(s.has(f)||s.set(f,Wu(f,void 0,n,a)),s.get(f))})}const YT=(n,a)=>a.isSVG??Bf(n)?new yE(a):new dE(a,{allowProjection:n!==S.Fragment});class GT extends br{constructor(a){super(a),a.animationState||(a.animationState=wE(a))}updateAnimationControlsSubscription(){const{animate:a}=this.node.getProps();pl(a)&&(this.unmountControls=a.subscribe(this.node))}mount(){this.updateAnimationControlsSubscription()}update(){const{animate:a}=this.node.getProps(),{animate:s}=this.node.prevProps||{};a!==s&&this.updateAnimationControlsSubscription()}unmount(){var a;this.node.animationState.reset(),(a=this.unmountControls)==null||a.call(this)}}let PT=0;class XT extends br{constructor(){super(...arguments),this.id=PT++,this.isExitComplete=!1}update(){var h;if(!this.node.presenceContext)return;const{isPresent:a,onExitComplete:s}=this.node.presenceContext,{isPresent:o}=this.node.prevPresenceContext||{};if(!this.node.animationState||a===o)return;if(a&&o===!1){if(this.isExitComplete){const{initial:f,custom:m}=this.node.getProps();if(typeof f=="string"||typeof f=="object"&&f!==null&&!Array.isArray(f)){const p=Gr(this.node,f,m);if(p){const{transition:g,transitionEnd:v,...b}=p;for(const x in b)(h=this.node.getValue(x))==null||h.jump(b[x])}}this.node.animationState.reset(),this.node.animationState.animateChanges()}else this.node.animationState.setActive("exit",!1);this.isExitComplete=!1;return}const c=this.node.animationState.setActive("exit",!a);s&&!a&&c.then(()=>{this.isExitComplete=!0,s(this.id)})}mount(){const{register:a,onExitComplete:s}=this.node.presenceContext||{};s&&s(this.id),a&&(this.unmount=a(this.id))}unmount(){}}const $T={animation:{Feature:GT},exit:{Feature:XT}};function cs(n){return{point:{x:n.pageX,y:n.pageY}}}const FT=n=>a=>Df(a)&&n(a,cs(a));function Qi(n,a,s,o){return ts(n,a,FT(s),o)}const Bx=({current:n})=>n?n.ownerDocument.defaultView:null,fv=(n,a)=>Math.abs(n-a);function KT(n,a){const s=fv(n.x,a.x),o=fv(n.y,a.y);return Math.sqrt(s**2+o**2)}const hv=new Set(["auto","scroll"]);class Lx{constructor(a,s,{transformPagePoint:o,contextWindow:c=window,dragSnapToOrigin:h=!1,distanceThreshold:f=3,element:m}={}){if(this.startEvent=null,this.lastMoveEvent=null,this.lastMoveEventInfo=null,this.lastRawMoveEventInfo=null,this.handlers={},this.contextWindow=window,this.scrollPositions=new Map,this.removeScrollListeners=null,this.onElementScroll=E=>{this.handleScroll(E.target)},this.onWindowScroll=()=>{this.handleScroll(window)},this.updatePoint=()=>{if(!(this.lastMoveEvent&&this.lastMoveEventInfo))return;this.lastRawMoveEventInfo&&(this.lastMoveEventInfo=Oo(this.lastRawMoveEventInfo,this.transformPagePoint));const E=Iu(this.lastMoveEventInfo,this.history),C=this.startEvent!==null,A=KT(E.offset,{x:0,y:0})>=this.distanceThreshold;if(!C&&!A)return;const{point:z}=E,{timestamp:k}=mt;this.history.push({...z,timestamp:k});const{onStart:V,onMove:_}=this.handlers;C||(V&&V(this.lastMoveEvent,E),this.startEvent=this.lastMoveEvent),_&&_(this.lastMoveEvent,E)},this.handlePointerMove=(E,C)=>{this.lastMoveEvent=E,this.lastRawMoveEventInfo=C,this.lastMoveEventInfo=Oo(C,this.transformPagePoint),qe.update(this.updatePoint,!0)},this.handlePointerUp=(E,C)=>{this.end();const{onEnd:A,onSessionEnd:z,resumeAnimation:k}=this.handlers;if((this.dragSnapToOrigin||!this.startEvent)&&k&&k(),!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const V=Iu(E.type==="pointercancel"?this.lastMoveEventInfo:Oo(C,this.transformPagePoint),this.history);this.startEvent&&A&&A(E,V),z&&z(E,V)},!Df(a))return;this.dragSnapToOrigin=h,this.handlers=s,this.transformPagePoint=o,this.distanceThreshold=f,this.contextWindow=c||window;const p=cs(a),g=Oo(p,this.transformPagePoint),{point:v}=g,{timestamp:b}=mt;this.history=[{...v,timestamp:b}];const{onSessionStart:x}=s;x&&x(a,Iu(g,this.history));const j={passive:!0,capture:!0};this.removeListeners=ss(Qi(this.contextWindow,"pointermove",this.handlePointerMove,j),Qi(this.contextWindow,"pointerup",this.handlePointerUp,j),Qi(this.contextWindow,"pointercancel",this.handlePointerUp,j)),m&&this.startScrollTracking(m)}startScrollTracking(a){let s=a.parentElement;for(;s;){const o=getComputedStyle(s);(hv.has(o.overflowX)||hv.has(o.overflowY))&&this.scrollPositions.set(s,{x:s.scrollLeft,y:s.scrollTop}),s=s.parentElement}this.scrollPositions.set(window,{x:window.scrollX,y:window.scrollY}),window.addEventListener("scroll",this.onElementScroll,{capture:!0}),window.addEventListener("scroll",this.onWindowScroll),this.removeScrollListeners=()=>{window.removeEventListener("scroll",this.onElementScroll,{capture:!0}),window.removeEventListener("scroll",this.onWindowScroll)}}handleScroll(a){const s=this.scrollPositions.get(a);if(!s)return;const o=a===window,c=o?{x:window.scrollX,y:window.scrollY}:{x:a.scrollLeft,y:a.scrollTop},h={x:c.x-s.x,y:c.y-s.y};h.x===0&&h.y===0||(o?this.lastMoveEventInfo&&(this.lastMoveEventInfo.point.x+=h.x,this.lastMoveEventInfo.point.y+=h.y):this.history.length>0&&(this.history[0].x-=h.x,this.history[0].y-=h.y),this.scrollPositions.set(a,c),qe.update(this.updatePoint,!0))}updateHandlers(a){this.handlers=a}end(){this.removeListeners&&this.removeListeners(),this.removeScrollListeners&&this.removeScrollListeners(),this.scrollPositions.clear(),yr(this.updatePoint)}}function Oo(n,a){return a?{point:a(n.point)}:n}function mv(n,a){return{x:n.x-a.x,y:n.y-a.y}}function Iu({point:n},a){return{point:n,delta:mv(n,Ux(a)),offset:mv(n,ZT(a)),velocity:QT(a,.1)}}function ZT(n){return n[0]}function Ux(n){return n[n.length-1]}function QT(n,a){if(n.length<2)return{x:0,y:0};let s=n.length-1,o=null;const c=Ux(n);for(;s>=0&&(o=n[s],!(c.timestamp-o.timestamp>Ht(a)));)s--;if(!o)return{x:0,y:0};o===n[0]&&n.length>2&&c.timestamp-o.timestamp>Ht(a)*2&&(o=n[1]);const h=Wt(c.timestamp-o.timestamp);if(h===0)return{x:0,y:0};const f={x:(c.x-o.x)/h,y:(c.y-o.y)/h};return f.x===1/0&&(f.x=0),f.y===1/0&&(f.y=0),f}function JT(n,{min:a,max:s},o){return a!==void 0&&n<a?n=o?He(a,n,o.min):Math.max(n,a):s!==void 0&&n>s&&(n=o?He(s,n,o.max):Math.min(n,s)),n}function pv(n,a,s){return{min:a!==void 0?n.min+a:void 0,max:s!==void 0?n.max+s-(n.max-n.min):void 0}}function WT(n,{top:a,left:s,bottom:o,right:c}){return{x:pv(n.x,s,c),y:pv(n.y,a,o)}}function gv(n,a){let s=a.min-n.min,o=a.max-n.max;return a.max-a.min<n.max-n.min&&([s,o]=[o,s]),{min:s,max:o}}function IT(n,a){return{x:gv(n.x,a.x),y:gv(n.y,a.y)}}function eC(n,a){let s=.5;const o=xt(n),c=xt(a);return c>o?s=Wi(a.min,a.max-o,n.min):o>c&&(s=Wi(n.min,n.max-c,a.min)),vn(0,1,s)}function tC(n,a){const s={};return a.min!==void 0&&(s.min=a.min-n.min),a.max!==void 0&&(s.max=a.max-n.min),s}const Bd=.35;function nC(n=Bd){return n===!1?n=0:n===!0&&(n=Bd),{x:yv(n,"left","right"),y:yv(n,"top","bottom")}}function yv(n,a,s){return{min:vv(n,a),max:vv(n,s)}}function vv(n,a){return typeof n=="number"?n:n[a]||0}const rC=new WeakMap;class aC{constructor(a){this.openDragLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},this.constraints=!1,this.hasMutatedConstraints=!1,this.elastic=it(),this.latestPointerEvent=null,this.latestPanInfo=null,this.visualElement=a}start(a,{snapToCursor:s=!1,distanceThreshold:o}={}){const{presenceContext:c}=this.visualElement;if(c&&c.isPresent===!1)return;const h=b=>{s&&this.snapToCursor(cs(b).point),this.stopAnimation()},f=(b,x)=>{const{drag:j,dragPropagation:E,onDragStart:C}=this.getProps();if(j&&!E&&(this.openDragLock&&this.openDragLock(),this.openDragLock=kj(j),!this.openDragLock))return;this.latestPointerEvent=b,this.latestPanInfo=x,this.isDragging=!0,this.currentDirection=null,this.resolveConstraints(),this.visualElement.projection&&(this.visualElement.projection.isAnimationBlocked=!0,this.visualElement.projection.target=void 0),mn(z=>{let k=this.getAxisMotionValue(z).get()||0;if(yn.test(k)){const{projection:V}=this.visualElement;if(V&&V.layout){const _=V.layout.layoutBox[z];_&&(k=xt(_)*(parseFloat(k)/100))}}this.originPoint[z]=k}),C&&qe.update(()=>C(b,x),!1,!0),Dd(this.visualElement,"transform");const{animationState:A}=this.visualElement;A&&A.setActive("whileDrag",!0)},m=(b,x)=>{this.latestPointerEvent=b,this.latestPanInfo=x;const{dragPropagation:j,dragDirectionLock:E,onDirectionLock:C,onDrag:A}=this.getProps();if(!j&&!this.openDragLock)return;const{offset:z}=x;if(E&&this.currentDirection===null){this.currentDirection=sC(z),this.currentDirection!==null&&C&&C(this.currentDirection);return}this.updateAxis("x",x.point,z),this.updateAxis("y",x.point,z),this.visualElement.render(),A&&qe.update(()=>A(b,x),!1,!0)},p=(b,x)=>{this.latestPointerEvent=b,this.latestPanInfo=x,this.stop(b,x),this.latestPointerEvent=null,this.latestPanInfo=null},g=()=>{const{dragSnapToOrigin:b}=this.getProps();(b||this.constraints)&&this.startAnimation({x:0,y:0})},{dragSnapToOrigin:v}=this.getProps();this.panSession=new Lx(a,{onSessionStart:h,onStart:f,onMove:m,onSessionEnd:p,resumeAnimation:g},{transformPagePoint:this.visualElement.getTransformPagePoint(),dragSnapToOrigin:v,distanceThreshold:o,contextWindow:Bx(this.visualElement),element:this.visualElement.current})}stop(a,s){const o=a||this.latestPointerEvent,c=s||this.latestPanInfo,h=this.isDragging;if(this.cancel(),!h||!c||!o)return;const{velocity:f}=c;this.startAnimation(f);const{onDragEnd:m}=this.getProps();m&&qe.postRender(()=>m(o,c))}cancel(){this.isDragging=!1;const{projection:a,animationState:s}=this.visualElement;a&&(a.isAnimationBlocked=!1),this.endPanSession();const{dragPropagation:o}=this.getProps();!o&&this.openDragLock&&(this.openDragLock(),this.openDragLock=null),s&&s.setActive("whileDrag",!1)}endPanSession(){this.panSession&&this.panSession.end(),this.panSession=void 0}updateAxis(a,s,o){const{drag:c}=this.getProps();if(!o||!zo(a,c,this.currentDirection))return;const h=this.getAxisMotionValue(a);let f=this.originPoint[a]+o[a];this.constraints&&this.constraints[a]&&(f=JT(f,this.constraints[a],this.elastic[a])),h.set(f)}resolveConstraints(){var h;const{dragConstraints:a,dragElastic:s}=this.getProps(),o=this.visualElement.projection&&!this.visualElement.projection.layout?this.visualElement.projection.measure(!1):(h=this.visualElement.projection)==null?void 0:h.layout,c=this.constraints;a&&Oa(a)?this.constraints||(this.constraints=this.resolveRefConstraints()):a&&o?this.constraints=WT(o.layoutBox,a):this.constraints=!1,this.elastic=nC(s),c!==this.constraints&&!Oa(a)&&o&&this.constraints&&!this.hasMutatedConstraints&&mn(f=>{this.constraints!==!1&&this.getAxisMotionValue(f)&&(this.constraints[f]=tC(o.layoutBox[f],this.constraints[f]))})}resolveRefConstraints(){const{dragConstraints:a,onMeasureDragConstraints:s}=this.getProps();if(!a||!Oa(a))return!1;const o=a.current,{projection:c}=this.visualElement;if(!c||!c.layout)return!1;c.root&&(c.root.scroll=void 0,c.root.updateScroll());const h=iE(o,c.root,this.visualElement.getTransformPagePoint());let f=IT(c.layout.layoutBox,h);if(s){const m=s(nE(f));this.hasMutatedConstraints=!!m,m&&(f=ox(m))}return f}startAnimation(a){const{drag:s,dragMomentum:o,dragElastic:c,dragTransition:h,dragSnapToOrigin:f,onDragTransitionEnd:m}=this.getProps(),p=this.constraints||{},g=mn(v=>{if(!zo(v,s,this.currentDirection))return;let b=p&&p[v]||{};(f===!0||f===v)&&(b={min:0,max:0});const x=c?200:1e6,j=c?40:1e7,E={type:"inertia",velocity:o?a[v]:0,bounceStiffness:x,bounceDamping:j,timeConstant:750,restDelta:1,restSpeed:10,...h,...b};return this.startAxisValueAnimation(v,E)});return Promise.all(g).then(m)}startAxisValueAnimation(a,s){const o=this.getAxisMotionValue(a);return Dd(this.visualElement,a),o.start(jf(a,o,0,s,this.visualElement,!1))}stopAnimation(){mn(a=>this.getAxisMotionValue(a).stop())}getAxisMotionValue(a){const s=`_drag${a.toUpperCase()}`,c=this.visualElement.getProps()[s];return c||this.visualElement.getValue(a,this.visualElement.latestValues[a]??0)}snapToCursor(a){mn(s=>{const{drag:o}=this.getProps();if(!zo(s,o,this.currentDirection))return;const{projection:c}=this.visualElement,h=this.getAxisMotionValue(s);if(c&&c.layout){const{min:f,max:m}=c.layout.layoutBox[s],p=h.get()||0;h.set(a[s]-He(f,m,.5)+p)}})}scalePositionWithinConstraints(){if(!this.visualElement.current)return;const{drag:a,dragConstraints:s}=this.getProps(),{projection:o}=this.visualElement;if(!Oa(s)||!o||!this.constraints)return;this.stopAnimation();const c={x:0,y:0};mn(f=>{const m=this.getAxisMotionValue(f);if(m&&this.constraints!==!1){const p=m.get();c[f]=eC({min:p,max:p},this.constraints[f])}});const{transformTemplate:h}=this.visualElement.getProps();this.visualElement.current.style.transform=h?h({},""):"none",o.root&&o.root.updateScroll(),o.updateLayout(),this.constraints=!1,this.resolveConstraints(),mn(f=>{if(!zo(f,a,null))return;const m=this.getAxisMotionValue(f),{min:p,max:g}=this.constraints[f];m.set(He(p,g,c[f]))}),this.visualElement.render()}addListeners(){if(!this.visualElement.current)return;rC.set(this.visualElement,this);const a=this.visualElement.current,s=Qi(a,"pointerdown",g=>{const{drag:v,dragListener:b=!0}=this.getProps(),x=g.target,j=x!==a&&Bj(x);v&&b&&!j&&this.start(g)});let o;const c=()=>{const{dragConstraints:g}=this.getProps();Oa(g)&&g.current&&(this.constraints=this.resolveRefConstraints(),o||(o=iC(a,g.current,()=>this.scalePositionWithinConstraints())))},{projection:h}=this.visualElement,f=h.addEventListener("measure",c);h&&!h.layout&&(h.root&&h.root.updateScroll(),h.updateLayout()),qe.read(c);const m=ts(window,"resize",()=>this.scalePositionWithinConstraints()),p=h.addEventListener("didUpdate",(({delta:g,hasLayoutChanged:v})=>{this.isDragging&&v&&(mn(b=>{const x=this.getAxisMotionValue(b);x&&(this.originPoint[b]+=g[b].translate,x.set(x.get()+g[b].translate))}),this.visualElement.render())}));return()=>{m(),s(),f(),p&&p(),o&&o()}}getProps(){const a=this.visualElement.getProps(),{drag:s=!1,dragDirectionLock:o=!1,dragPropagation:c=!1,dragConstraints:h=!1,dragElastic:f=Bd,dragMomentum:m=!0}=a;return{...a,drag:s,dragDirectionLock:o,dragPropagation:c,dragConstraints:h,dragElastic:f,dragMomentum:m}}}function bv(n){let a=!0;return()=>{if(a){a=!1;return}n()}}function iC(n,a,s){const o=Cy(n,bv(s)),c=Cy(a,bv(s));return()=>{o(),c()}}function zo(n,a,s){return(a===!0||a===n)&&(s===null||s===n)}function sC(n,a=10){let s=null;return Math.abs(n.y)>a?s="y":Math.abs(n.x)>a&&(s="x"),s}class oC extends br{constructor(a){super(a),this.removeGroupControls=It,this.removeListeners=It,this.controls=new aC(a)}mount(){const{dragControls:a}=this.node.getProps();a&&(this.removeGroupControls=a.subscribe(this.controls)),this.removeListeners=this.controls.addListeners()||It}update(){const{dragControls:a}=this.node.getProps(),{dragControls:s}=this.node.prevProps||{};a!==s&&(this.removeGroupControls(),a&&(this.removeGroupControls=a.subscribe(this.controls)))}unmount(){this.removeGroupControls(),this.removeListeners(),this.controls.isDragging||this.controls.endPanSession()}}const ed=n=>(a,s)=>{n&&qe.update(()=>n(a,s),!1,!0)};class lC extends br{constructor(){super(...arguments),this.removePointerDownListener=It}onPointerDown(a){this.session=new Lx(a,this.createPanHandlers(),{transformPagePoint:this.node.getTransformPagePoint(),contextWindow:Bx(this.node)})}createPanHandlers(){const{onPanSessionStart:a,onPanStart:s,onPan:o,onPanEnd:c}=this.node.getProps();return{onSessionStart:ed(a),onStart:ed(s),onMove:ed(o),onEnd:(h,f)=>{delete this.session,c&&qe.postRender(()=>c(h,f))}}}mount(){this.removePointerDownListener=Qi(this.node.current,"pointerdown",a=>this.onPointerDown(a))}update(){this.session&&this.session.updateHandlers(this.createPanHandlers())}unmount(){this.removePointerDownListener(),this.session&&this.session.end()}}let td=!1;class cC extends S.Component{componentDidMount(){const{visualElement:a,layoutGroup:s,switchLayoutGroup:o,layoutId:c}=this.props,{projection:h}=a;h&&(s.group&&s.group.add(h),o&&o.register&&c&&o.register(h),td&&h.root.didUpdate(),h.addEventListener("animationComplete",()=>{this.safeToRemove()}),h.setOptions({...h.options,layoutDependency:this.props.layoutDependency,onExitComplete:()=>this.safeToRemove()})),Qo.hasEverUpdated=!0}getSnapshotBeforeUpdate(a){const{layoutDependency:s,visualElement:o,drag:c,isPresent:h}=this.props,{projection:f}=o;return f&&(f.isPresent=h,a.layoutDependency!==s&&f.setOptions({...f.options,layoutDependency:s}),td=!0,c||a.layoutDependency!==s||s===void 0||a.isPresent!==h?f.willUpdate():this.safeToRemove(),a.isPresent!==h&&(h?f.promote():f.relegate()||qe.postRender(()=>{const m=f.getStack();(!m||!m.members.length)&&this.safeToRemove()}))),null}componentDidUpdate(){const{visualElement:a,layoutAnchor:s}=this.props,{projection:o}=a;o&&(o.options.layoutAnchor=s,o.root.didUpdate(),Af.postRender(()=>{!o.currentAnimation&&o.isLead()&&this.safeToRemove()}))}componentWillUnmount(){const{visualElement:a,layoutGroup:s,switchLayoutGroup:o}=this.props,{projection:c}=a;td=!0,c&&(c.scheduleCheckAfterUnmount(),s&&s.group&&s.group.remove(c),o&&o.deregister&&o.deregister(c))}safeToRemove(){const{safeToRemove:a}=this.props;a&&a()}render(){return null}}function Hx(n){const[a,s]=Dx(),o=S.useContext(lf);return u.jsx(cC,{...n,layoutGroup:o,switchLayoutGroup:S.useContext(_x),isPresent:a,safeToRemove:s})}const uC={pan:{Feature:lC},drag:{Feature:oC,ProjectionNode:Ax,MeasureLayout:Hx}};function xv(n,a,s){const{props:o}=n;n.animationState&&o.whileHover&&n.animationState.setActive("whileHover",s==="Start");const c="onHover"+s,h=o[c];h&&qe.postRender(()=>h(a,cs(a)))}class dC extends br{mount(){const{current:a}=this.node;a&&(this.unmount=Oj(a,(s,o)=>(xv(this.node,o,"Start"),c=>xv(this.node,c,"End"))))}unmount(){}}class fC extends br{constructor(){super(...arguments),this.isActive=!1}onFocus(){let a=!1;try{a=this.node.current.matches(":focus-visible")}catch{a=!0}!a||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!0),this.isActive=!0)}onBlur(){!this.isActive||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!1),this.isActive=!1)}mount(){this.unmount=ss(ts(this.node.current,"focus",()=>this.onFocus()),ts(this.node.current,"blur",()=>this.onBlur()))}unmount(){}}function Sv(n,a,s){const{props:o}=n;if(n.current instanceof HTMLButtonElement&&n.current.disabled)return;n.animationState&&o.whileTap&&n.animationState.setActive("whileTap",s==="Start");const c="onTap"+(s==="End"?"":s),h=o[c];h&&qe.postRender(()=>h(a,cs(a)))}class hC extends br{mount(){const{current:a}=this.node;if(!a)return;const{globalTapTarget:s,propagate:o}=this.node.props;this.unmount=Uj(a,(c,h)=>(Sv(this.node,h,"Start"),(f,{success:m})=>Sv(this.node,f,m?"End":"Cancel")),{useGlobalTarget:s,stopPropagation:(o==null?void 0:o.tap)===!1})}unmount(){}}const Ld=new WeakMap,nd=new WeakMap,mC=n=>{const a=Ld.get(n.target);a&&a(n)},pC=n=>{n.forEach(mC)};function gC({root:n,...a}){const s=n||document;nd.has(s)||nd.set(s,{});const o=nd.get(s),c=JSON.stringify(a);return o[c]||(o[c]=new IntersectionObserver(pC,{root:n,...a})),o[c]}function yC(n,a,s){const o=gC(a);return Ld.set(n,s),o.observe(n),()=>{Ld.delete(n),o.unobserve(n)}}const vC={some:0,all:1};class bC extends br{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){var p;(p=this.stopObserver)==null||p.call(this);const{viewport:a={}}=this.node.getProps(),{root:s,margin:o,amount:c="some",once:h}=a,f={root:s?s.current:void 0,rootMargin:o,threshold:typeof c=="number"?c:vC[c]},m=g=>{const{isIntersecting:v}=g;if(this.isInView===v||(this.isInView=v,h&&!v&&this.hasEnteredView))return;v&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive("whileInView",v);const{onViewportEnter:b,onViewportLeave:x}=this.node.getProps(),j=v?b:x;j&&j(g)};this.stopObserver=yC(this.node.current,f,m)}mount(){this.startObserver()}update(){if(typeof IntersectionObserver>"u")return;const{props:a,prevProps:s}=this.node;["amount","margin","root"].some(xC(a,s))&&this.startObserver()}unmount(){var a;(a=this.stopObserver)==null||a.call(this),this.hasEnteredView=!1,this.isInView=!1}}function xC({viewport:n={}},{viewport:a={}}={}){return s=>n[s]!==a[s]}const SC={inView:{Feature:bC},tap:{Feature:hC},focus:{Feature:fC},hover:{Feature:dC}},wC={layout:{ProjectionNode:Ax,MeasureLayout:Hx}},jC={...$T,...SC,...uC,...wC},EC=qT(jC,YT);function qx(){!Rf.current&&ax();const[n]=S.useState(sl.current);return n}const Lf=EC,dl=new Map,wv=new Set;let TC=0;const Uf=()=>{var n;return(n=window.chrome)==null?void 0:n.webview};function CC(n){var s;const a=dl.get(n.id);if(a){if(n.type==="progress"){(s=a.progress)==null||s.call(a,n.data);return}window.clearTimeout(a.timer),dl.delete(n.id),n.ok?a.resolve(n.data):a.reject(new Error(n.error||"操作失败"))}}var eb;(eb=Uf())==null||eb.addEventListener("message",n=>CC(n.data));function AC(n,a){var s;a&&wv.has(a)||(a&&wv.add(a),(s=Uf())==null||s.postMessage({type:"app.ready",route:n,navigation:a}))}function xe(n,a,s=3e4,o){const c=Uf();if(!c)return Promise.reject(new Error("当前页面未连接到桌面宿主"));const h=`${Date.now()}-${++TC}`;return new Promise((f,m)=>{const p=window.setTimeout(()=>{dl.delete(h),m(new Error("操作超时，请重试"))},s);dl.set(h,{resolve:g=>f(g),reject:m,timer:p,progress:o}),c.postMessage({id:h,operation:n,payload:a})})}var Hf=rb();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const DC=n=>n.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Yx=(...n)=>n.filter((a,s,o)=>!!a&&a.trim()!==""&&o.indexOf(a)===s).join(" ").trim();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var NC={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const MC=S.forwardRef(({color:n="currentColor",size:a=24,strokeWidth:s=2,absoluteStrokeWidth:o,className:c="",children:h,iconNode:f,...m},p)=>S.createElement("svg",{ref:p,...NC,width:a,height:a,stroke:n,strokeWidth:o?Number(s)*24/Number(a):s,className:Yx("lucide",c),...m},[...f.map(([g,v])=>S.createElement(g,v)),...Array.isArray(h)?h:[h]]));/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ye=(n,a)=>{const s=S.forwardRef(({className:o,...c},h)=>S.createElement(MC,{ref:h,iconNode:a,className:Yx(`lucide-${DC(n)}`,o),...c}));return s.displayName=`${n}`,s};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ns=Ye("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kC=Ye("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const RC=Ye("CalendarDays",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M16 14h.01",key:"1gbofw"}],["path",{d:"M8 18h.01",key:"lrp35t"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M16 18h.01",key:"kzsmim"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const OC=Ye("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const us=Ye("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zC=Ye("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gx=Ye("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Px=Ye("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _C=Ye("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const VC=Ye("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ud=Ye("Database",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const BC=Ye("Ellipsis",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jv=Ye("FileSpreadsheet",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M8 13h2",key:"yr2amv"}],["path",{d:"M14 13h2",key:"un5t4a"}],["path",{d:"M8 17h2",key:"2yhykz"}],["path",{d:"M14 17h2",key:"10kma7"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const LC=Ye("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qa=Ye("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const UC=Ye("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const HC=Ye("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xx=Ye("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qC=Ye("RotateCw",[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",key:"1p45f6"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const YC=Ye("Rows3",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M21 9H3",key:"1338ky"}],["path",{d:"M21 15H3",key:"9uk58r"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const GC=Ye("Settings2",[["path",{d:"M20 7h-9",key:"3s1dr2"}],["path",{d:"M14 17H5",key:"gfn3mx"}],["circle",{cx:"17",cy:"17",r:"3",key:"18b49y"}],["circle",{cx:"7",cy:"7",r:"3",key:"dfmy0x"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const PC=Ye("Sigma",[["path",{d:"M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2",key:"wuwx1p"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const XC=Ye("SlidersHorizontal",[["line",{x1:"21",x2:"14",y1:"4",y2:"4",key:"obuewd"}],["line",{x1:"10",x2:"3",y1:"4",y2:"4",key:"1q6298"}],["line",{x1:"21",x2:"12",y1:"12",y2:"12",key:"1iu8h1"}],["line",{x1:"8",x2:"3",y1:"12",y2:"12",key:"ntss68"}],["line",{x1:"21",x2:"16",y1:"20",y2:"20",key:"14d8ph"}],["line",{x1:"12",x2:"3",y1:"20",y2:"20",key:"m0wm8r"}],["line",{x1:"14",x2:"14",y1:"2",y2:"6",key:"14e1ph"}],["line",{x1:"8",x2:"8",y1:"10",y2:"14",key:"1i6ji0"}],["line",{x1:"16",x2:"16",y1:"18",y2:"22",key:"1lctlv"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $C=Ye("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const FC=Ye("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $x=Ye("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),KC=["一","二","三","四","五","六","日"],ZC=Array.from({length:12},(n,a)=>`${a+1}月`);function QC(n){if(!n)return null;const[a,s,o=1]=n.split("-").map(Number);return!a||!s||!o?null:new Date(a,s-1,o)}function Ev(n){const a=n.getFullYear(),s=String(n.getMonth()+1).padStart(2,"0"),o=String(n.getDate()).padStart(2,"0");return`${a}-${s}-${o}`}function JC(n){const a=n.getFullYear(),s=String(n.getMonth()+1).padStart(2,"0"),o=String(n.getDate()).padStart(2,"0");return`${a}/${s}/${o}`}function WC(n,a){const s=new Date(n,a,1).getDay();return s===0?6:s-1}function IC(n,a){return new Date(n,a+1,0).getDate()}function Tv(n,a){return n.getFullYear()===a.getFullYear()&&n.getMonth()===a.getMonth()&&n.getDate()===a.getDate()}function eA(n){return Math.floor(n/12)*12}function Ya({value:n,onChange:a,label:s,disabled:o=!1,selectionMode:c="day"}){var T;const h=S.useId(),f=S.useMemo(()=>QC(n),[n]),[m,p]=S.useState(!1),[g,v]=S.useState(c),[b,x]=S.useState(f??new Date),[j,E]=S.useState({top:0,left:0}),[C,A]=S.useState("bottom"),z=S.useRef(null),k=S.useRef(null),V=S.useRef(null);S.useEffect(()=>{f&&x(f)},[n]);function _(){const R=z.current,W=V.current;if(!R||!W)return;const ae=R.ownerDocument.defaultView||window,oe=R.getBoundingClientRect(),fe=W.getBoundingClientRect(),ye=fe.width,re=fe.height,Q=8,ue=12,ee=ae.innerHeight-oe.bottom-ue,he=oe.top-ue,Ce=re>ee&&he>ee,Oe=Ce?"top":"bottom";let Qe=Ce?oe.top-re-Q:oe.bottom+Q;Qe<ue&&(Qe=ue),Qe+re>ae.innerHeight-ue&&(Qe=Math.max(ue,ae.innerHeight-re-ue));let $e=oe.left;$e+ye>ae.innerWidth-ue&&($e=ae.innerWidth-ye-ue),$e<ue&&($e=ue),A(Oe),E({top:Qe,left:$e})}S.useLayoutEffect(()=>{m&&_()},[m,g]),S.useEffect(()=>{var ae;if(!m)return;const R=((ae=z.current)==null?void 0:ae.ownerDocument.defaultView)||window;function W(){_()}return R.addEventListener("resize",W),R.addEventListener("scroll",W,!0),()=>{R.removeEventListener("resize",W),R.removeEventListener("scroll",W,!0)}},[m,g]),S.useEffect(()=>{var oe;const R=((oe=k.current)==null?void 0:oe.ownerDocument)||document;function W(fe){var ue,ee;const ye=fe.target,re=(ue=k.current)==null?void 0:ue.contains(ye),Q=(ee=V.current)==null?void 0:ee.contains(ye);!re&&!Q&&(p(!1),v(c))}function ae(fe){fe.key==="Escape"&&(p(!1),v(c))}return R.addEventListener("mousedown",W),R.addEventListener("keydown",ae),()=>{R.removeEventListener("mousedown",W),R.removeEventListener("keydown",ae)}},[c]);const L=b.getFullYear(),Y=b.getMonth(),N=IC(L,Y),M=WC(L,Y),X=eA(L),F=Array.from({length:12},(R,W)=>X+W),ne=[];for(let R=0;R<M;R+=1)ne.push(null);for(let R=1;R<=N;R+=1)ne.push(R);function ie(){if(g==="day"){x(new Date(L,Y-1,1));return}if(g==="month"){x(new Date(L-1,Y,1));return}x(new Date(L-12,Y,1))}function pe(){if(g==="day"){x(new Date(L,Y+1,1));return}if(g==="month"){x(new Date(L+1,Y,1));return}x(new Date(L+12,Y,1))}function le(){if(c==="month"){v(g==="month"?"year":"month");return}if(g==="day"){v("month");return}if(g==="month"){v("year");return}v("day")}function ve(R){const W=new Date(L,Y,R);a(Ev(W)),p(!1),v("day")}function U(R){if(c==="month"){a(`${L}-${String(R+1).padStart(2,"0")}`),x(new Date(L,R,1)),p(!1),v("month");return}x(new Date(L,R,1)),v("day")}function se(R){x(new Date(R,Y,1)),v("month")}function K(){const R=new Date;x(R),a(c==="month"?`${R.getFullYear()}-${String(R.getMonth()+1).padStart(2,"0")}`:Ev(R)),v(c),p(!1)}function G(){return g==="day"?`${L}年 ${Y+1}月`:g==="month"?`${L}年`:`${X} - ${X+11}`}const te=m?u.jsxs("div",{ref:V,className:`date-picker-popover date-picker-popover-${C}`,style:{top:j.top,left:j.left},children:[u.jsxs("div",{className:"date-picker-header",children:[u.jsx("button",{type:"button",className:"date-picker-nav-button",onClick:ie,"aria-label":"上一页",children:u.jsx(Gx,{size:17,strokeWidth:1.7})}),u.jsx("button",{type:"button",className:"date-picker-title-button",onClick:le,children:G()}),u.jsx("button",{type:"button",className:"date-picker-nav-button",onClick:pe,"aria-label":"下一页",children:u.jsx(Px,{size:17,strokeWidth:1.7})})]}),g==="day"&&u.jsxs(u.Fragment,{children:[u.jsx("div",{className:"date-picker-weekdays",children:KC.map(R=>u.jsx("div",{children:R},R))}),u.jsx("div",{className:"date-picker-grid",children:ne.map((R,W)=>{if(R===null)return u.jsx("div",{},`empty-${W}`);const ae=new Date(L,Y,R),oe=f?Tv(ae,f):!1,fe=Tv(ae,new Date);return u.jsx("button",{type:"button",className:["date-picker-day",oe?"date-picker-day-selected":"",fe&&!oe?"date-picker-day-today":""].filter(Boolean).join(" "),onClick:()=>ve(R),children:R},`${L}-${Y}-${R}`)})})]}),g==="month"&&u.jsx("div",{className:"date-picker-month-grid",children:ZC.map((R,W)=>{const ae=f&&f.getFullYear()===L&&f.getMonth()===W,oe=new Date().getFullYear()===L&&new Date().getMonth()===W;return u.jsx("button",{type:"button",className:["date-picker-month-item",ae?"date-picker-month-item-selected":"",oe&&!ae?"date-picker-month-item-current":""].filter(Boolean).join(" "),onClick:()=>U(W),children:R},R)})}),g==="year"&&u.jsx("div",{className:"date-picker-year-grid",children:F.map(R=>{const W=f&&f.getFullYear()===R,ae=new Date().getFullYear()===R;return u.jsx("button",{type:"button",className:["date-picker-year-item",W?"date-picker-year-item-selected":"",ae&&!W?"date-picker-year-item-current":""].filter(Boolean).join(" "),onClick:()=>se(R),children:R},R)})}),u.jsx("div",{className:"date-picker-footer",children:u.jsx("button",{type:"button",className:"date-picker-today-button",onClick:K,children:c==="month"?"回到本月":"回到今天"})})]}):null;return u.jsxs(u.Fragment,{children:[u.jsxs("div",{ref:k,className:"date-picker",children:[s&&u.jsx("label",{id:`${h}-label`,className:"date-picker-label",children:s}),u.jsxs("button",{ref:z,type:"button",disabled:o,className:`date-picker-trigger ${m?"date-picker-trigger-open":""}`,onClick:()=>{o||p(R=>{const W=!R;return W&&v(c),W})},"aria-expanded":m,"aria-labelledby":s?`${h}-label ${h}-value`:void 0,"aria-label":s?void 0:c==="month"?"选择月份":"选择日期",children:[u.jsx("span",{id:`${h}-value`,className:f?"":"date-picker-placeholder",children:f?c==="month"?`${f.getFullYear()} / ${String(f.getMonth()+1).padStart(2,"0")}`:JC(f):c==="month"?"选择月份":"选择日期"}),u.jsx(OC,{className:"date-picker-calendar-icon",size:16,strokeWidth:1.7})]})]}),te&&Hf.createPortal(te,((T=k.current)==null?void 0:T.ownerDocument.body)||document.body)]})}const Fx=`/* Generated from tools/experiments/production_message/production_assistant_demo/src/index.css and App.css.\r
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
`,Kx=`/* Shared controls: normal typography, neutral focus and unobtrusive scrollbars. */\r
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
`,tA=`<!doctype html>\r
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
`,Zx=""+new URL("Inter-VF2RPR_K.ttf",import.meta.url).href,Qx=""+new URL("NotoSansSC-Dz1u1FRy.ttf",import.meta.url).href,$i=new Map;function nA(n,a,s=!1){const o=JSON.stringify([n,a]),c=`daily-field-cache-v1:${o}`;let h=s?void 0:$i.get(o);if(!h&&!s)try{const f=JSON.parse(localStorage.getItem(c)||"null");f&&Array.isArray(f.metrics)&&f.metrics.every(m=>m&&typeof m.id=="string"&&typeof m.name=="string")&&(h=Promise.resolve(f),$i.set(o,h))}catch{}return h||(h=xe("daily.getProperties",{id:n,sourceId:a}).then(f=>{try{localStorage.setItem(c,JSON.stringify(f))}catch{}return f}).catch(f=>{throw $i.delete(o),f}),$i.set(o,h)),h}function rA(n=!1){if($i.clear(),n)try{Object.keys(localStorage).filter(a=>a.startsWith("daily-field-cache-v1:")).forEach(a=>localStorage.removeItem(a))}catch{}}const _o=[0,-1,-2].flatMap(n=>[{granularity:"day",key:n===0?"today":`day${n}`,label:n===0?"今日":`${n===-1?"去年":"前年"}同日`},{granularity:"mtd",key:n===0?"mtd":n===-1?"lastmonth":"mtd-2",label:n===0?"本月累计":`${n===-1?"去年":"前年"}同期月累计`},{granularity:"ytd",key:n===0?"ytd":n===-1?"last":"ytd-2",label:n===0?"本年累计":`${n===-1?"去年":"前年"}同期`},{granularity:"fullyear",key:n===0?"fullyear":n===-1?"full":"full-2",label:`${n===0?"今年":n===-1?"去年":"前年"}全年`}].map(a=>({key:a.key,label:a.label,spec:{granularity:a.granularity,yearOffset:n}}))),Jx={"system.date":'today("yyyy年M月d日")',"system.year":'today("yyyy年")',"system.month":'today("M月")',"system.day":'today("d日")'};function aA(n){return Jx[n]||n}function Cv(n){const a=[[]];function s(c){c.replace(/\u00a0/g," ").split(`
`).forEach((h,f)=>{var p;if(f&&a.push([]),!h)return;const m=a.at(-1);((p=m.at(-1))==null?void 0:p.type)==="text"?m.at(-1).text+=h:m.push({type:"text",text:h})})}function o(c){var h;if(c.nodeType===3){s(c.textContent||"");return}if(c instanceof n.ownerDocument.defaultView.HTMLElement){if(c.dataset.key){const f=aA(c.dataset.key);a.at(-1).push({type:f.startsWith("today(")?"dateToken":"fieldToken",attrs:{placeholder:f,label:c.textContent||"",...c.dataset.legacySpec?{dateRangeSpec:JSON.parse(c.dataset.legacySpec)}:{}}});return}if(c.tagName==="BR"){s(`
`);return}c!==n&&["DIV","P"].includes(c.tagName)&&c.childNodes.length===1&&((h=c.firstChild)==null?void 0:h.nodeName)==="BR"||Array.from(c.childNodes).forEach((f,m)=>{m&&f.nodeType===1&&["DIV","P"].includes(f.tagName)&&s(`
`),o(f)})}}return o(n),{text:a.map(c=>c.map(h=>h.type==="text"?h.text:h.attrs.placeholder).join("")).join(`
`),document:JSON.stringify({type:"doc",content:a.map(c=>({type:"paragraph",content:c}))})}}function iA(n,a,s,o){const c=[...s,...Object.entries(Jx).map(([f,m])=>({key:m,label:f==="system.date"?"业务日期":f==="system.year"?"业务年份":f==="system.month"?"业务月份":"业务日",metric:"date",scope:"date",keywords:"",field:void 0}))].filter(f=>f.field||f.metric==="date").sort((f,m)=>m.key.length-f.key.length);let h=a;for(;h;){const f=c.map(m=>({d:m,index:h.indexOf(m.key)})).filter(m=>m.index>=0).sort((m,p)=>m.index-p.index)[0];if(!f){n.append(n.ownerDocument.createTextNode(h));break}f.index&&n.append(n.ownerDocument.createTextNode(h.slice(0,f.index))),n.append(o(f.d)),h=h.slice(f.index+f.d.key.length)}}function sA(n,a,s,o){if(!a)return!1;let c;try{c=JSON.parse(a)}catch{return!1}if(c.type!=="doc")return!1;function h(f){var m,p,g,v;if(f.type==="text"){n.append(n.ownerDocument.createTextNode(f.text||""));return}if(f.type==="hardBreak"){n.append(n.ownerDocument.createTextNode(`
`));return}if(f.type==="fieldToken"||f.type==="dateToken"){const b=((m=f.attrs)==null?void 0:m.placeholder)||"";let x=s.find(E=>E.key===b);x||(x={key:b,label:f.type==="dateToken"?"业务日期":((p=f.attrs)==null?void 0:p.label)||"已有数据",metric:f.type==="dateToken"?"date":"legacy",scope:"legacy",keywords:((g=f.attrs)==null?void 0:g.label)||""},s.push(x));const j=o(x);(v=f.attrs)!=null&&v.dateRangeSpec&&(j.dataset.legacySpec=JSON.stringify(f.attrs.dateRangeSpec)),n.append(j);return}(f.content||[]).forEach((b,x)=>{f.type==="doc"&&x&&n.append(n.ownerDocument.createTextNode(`
`)),h(b)})}return h(c),!0}function Wx({id:n,back:a,changed:s,openSettings:o}){const c=S.useRef(null),[h,f]=S.useState("");return S.useEffect(()=>{let m=!1;const p=c.current;return xe("daily.get",{id:n}).then(g=>{if(m)return;const v=oA(g,{back:a,changed:s,openSettings:o});p.dailyRuntime=v,p.srcdoc=tA.replace("../../src/ProductionAssistant.App/Assets/Fonts/Inter.ttf",new URL(Zx,window.location.href).href).replace("../../src/ProductionAssistant.App/Assets/Fonts/NotoSansSC.ttf",new URL(Qx,window.location.href).href)}).catch(g=>{m||f(String(g.message||g))}),()=>{var g;m=!0,(g=p.dailyRuntime)==null||g.dispose()}},[n]),u.jsxs("div",{className:"message-template-host",children:[h&&u.jsx("p",{role:"alert",children:h}),u.jsx("iframe",{ref:c,title:"日报消息模板"})]})}function oA(n,a){var Y;let s=!1,o=!1,c,h,f=Promise.resolve(),m=0,p;const g=new Date,v=n.fields.map(N=>{var M,X,F;return{key:N.placeholder,label:N.label.replace(" · ",""),metric:`${N.databaseId||((M=N.binding)==null?void 0:M.dataSourceId)}:${N.businessId||((X=N.binding)==null?void 0:X.businessMetricId)}`,scope:((F=_o.find(ne=>JSON.stringify(ne.spec)===JSON.stringify(N.dateRangeSpec)))==null?void 0:F.key)||"legacy",keywords:N.label,field:N}}),b=[];let x=(Y=n.metricSourceIds)!=null&&Y.length?n.metricSourceIds:[...new Set(n.fields.map(N=>{var M;return N.databaseId||((M=N.binding)==null?void 0:M.dataSourceId)}).filter(Boolean))];const j=new Map(n.fields.map(N=>[N.placeholder,N])),E=new Map;function C(N){const M=h==null?void 0:h.querySelector("#preview-status");M&&(M.textContent=N)}function A(){h==null||h.querySelectorAll("[data-send]").forEach(N=>N.disabled=o||!n.notificationConfigured)}async function z(N){N.text===n.draftTemplate&&N.document===n.draftTemplateDocument||(await xe("daily.saveTemplate",{id:_,...N}),n.draftTemplate=N.text,n.draftTemplateDocument=N.document)}async function k(){var N;try{const M=await xe("daily.get",{id:_});if(s)return;n.notificationConfigured=M.notificationConfigured,n.sources=M.sources,A(),(N=h==null?void 0:h.querySelector("[data-notification-notice]"))==null||N.toggleAttribute("hidden",!!n.notificationConfigured),await V()}catch(M){C(String(M))}}async function V(){var M;const N=await Promise.allSettled(x.map(async X=>({sourceId:X,metrics:(await nA(_,X)).metrics})));if(!s){v.splice(0,v.length,...v.filter(X=>X.field)),b.length=0;for(const X of N)if(X.status==="fulfilled")for(const F of X.value.metrics){const ne=`${X.value.sourceId}:${F.id}`;b.push([ne,F.name,F.name,0]);const ie=F.granularity==="monthly"?[{key:"month",label:"本月"}]:_o;for(const pe of ie)v.push({key:`${ne}:${pe.key}`,metric:ne,scope:pe.key,label:F.granularity==="monthly"?F.name:pe.label+F.name,keywords:F.name+" "+pe.label+" "+(((M=n.sources.find(le=>le.id===X.value.sourceId))==null?void 0:M.name)||""),sourceId:X.value.sourceId,metricId:F.id});for(const pe of v.filter(le=>le.metric===ne&&le.field))pe.sourceId=X.value.sourceId,pe.metricId=F.id}N.some(X=>X.status==="rejected")?C("部分指标目录读取失败，请到系统设置刷新数据库。"):x.length||C("请在右上角任务设置中配置本任务的指标范围。")}}const _=n.id,L={dirty(){m++,p=void 0},id:_,name:n.name,sendTime:n.sendTime,businessDate:`${g.getFullYear()}-${String(g.getMonth()+1).padStart(2,"0")}-${String(g.getDate()).padStart(2,"0")}`,definitions:v,metrics:b,value:N=>{var M,X,F;return N.metric==="date"?"业务日期":((M=p==null?void 0:p.fieldValues)==null?void 0:M[N.key])||((F=p==null?void 0:p.fieldValues)==null?void 0:F[((X=v.find(ne=>ne.field&&ne.metric===N.metric&&ne.scope===N.scope))==null?void 0:X.key)||""])||""},mount:(N,M)=>{sA(N,n.draftTemplateDocument,v,M)||iA(N,n.draftTemplate,v,M)},async materialize(N){var pe;if(N.field||N.metric==="date")return N;const M=v.find(le=>le.metric===N.metric&&le.sourceId),X=N.sourceId||(M==null?void 0:M.sourceId),F=N.metricId||(M==null?void 0:M.metricId);if(!X||!F)throw new Error("此字段缺少可用的指标定义，请在任务设置中刷新指标。");const ne=JSON.stringify([X,F,N.scope,N.label]);let ie=E.get(ne);return ie||(ie=xe("daily.addField",{id:_,sourceId:X,metricId:F,placeholder:"",displayName:N.label,...N.scope==="month"?{rangeKind:"current-month"}:{dateRangeSpec:(pe=_o.find(le=>le.key===N.scope))==null?void 0:pe.spec}}).then(({field:le})=>{j.set(le.placeholder,le);const ve={...N,key:le.placeholder,field:le,sourceId:X,metricId:F};return v.some(U=>U.key===ve.key)||v.push(ve),a.changed(),ve}).catch(le=>{throw E.delete(ne),le}),E.set(ne,ie)),ie},save(N){const M=Cv(N),X=f.catch(()=>{}).then(()=>s?void 0:z(M));return f=X,X},preview(N,M){const X=Cv(N),F=++m,ne=f.catch(()=>{}).then(async()=>{if(s||F!==m)return{succeeded:!1,text:"",message:"内容已修改，请重新生成预览",errors:[]};await z(X);const ie=await xe("daily.preview",{id:_,businessDate:M},12e4),pe={...ie,errors:ie.fieldErrors||[],message:ie.succeeded?"已生成 · "+M:ie.message};return F===m&&!s&&(p=pe),pe});return f=ne,ne},async send(N,M,X){if(!o){if(!n.notificationConfigured)throw new Error("请先在系统设置中配置通知渠道。");o=!0,A();try{await L.save(N);const F=await xe(M==="test"?"daily.test":"daily.sendToday",M==="test"?{id:_,businessDate:X}:{id:_},12e4);if(!F.succeeded)throw new Error(F.message||"发送失败，请查看运行记录");C(F.alreadySent?"今日当前内容已发送":M==="test"?"测试发送成功":"今日消息已发送"),a.changed()}finally{o=!1,A()}}},configureAdvanced(N,M){const X=v.some(ie=>ie.metric===N&&ie.scope==="month"),F=X?[{key:"month",label:"本月计划"}]:[{key:"day",label:"日（业务日当天）"},{key:"mtd",label:"月累计（月初至业务日）"},{key:"ytd",label:"年累计（年初至业务日）"},{key:"fullyear",label:"全年"}];M.replaceChildren(...F.map(ie=>new Option(ie.label,ie.key)));const ne=M.ownerDocument.querySelector("#scope-year");ne&&(ne.disabled=X,ne.value="0")},resolveAdvanced(N,M){return N==="month"?"month":_o.find(X=>X.spec.granularity===N&&X.spec.yearOffset===Number(M)).key},async saveBasics(N,M){const X=Array.from((h==null?void 0:h.querySelectorAll("[data-context-source]:checked"))||[]).map(F=>F.value);await xe("daily.saveBasics",{id:_,name:N,sendTime:M,metricSourceIds:X}),n.name=N,n.sendTime=M,x=X,L.name=N,await V(),a.changed()},connect(N){var K;h=N,N.title=n.name,N.querySelector("#runs p").textContent="";const M=N.querySelector("header > span");M.removeAttribute("aria-hidden"),M.setAttribute("role","button"),M.setAttribute("tabindex","0"),M.setAttribute("aria-label","返回任务列表");const X=async()=>{const G=N.querySelector("#editor");G.contentEditable="false",m++;try{await L.save(G),a.back()}catch(te){C(String(te)),G.contentEditable="true"}};M.addEventListener("click",X),M.addEventListener("keydown",G=>{G.key==="Enter"&&X()});const F=N.querySelector("#settings"),ne=N.createElement("fieldset");ne.style.cssText="border:0;padding:0;max-height:180px;overflow:auto";const ie=N.createElement("legend");ie.textContent="本任务的指标范围",ne.append(ie);for(const G of n.sources){const te=N.createElement("label");te.style.cssText="display:flex;gap:8px;margin:8px 0";const T=N.createElement("input");T.type="checkbox",T.value=G.id,T.dataset.contextSource="",T.checked=x.includes(G.id),T.style.width="auto",te.append(T,N.createTextNode(G.name)),ne.append(te)}(K=F.querySelector("p"))==null||K.replaceWith(ne);const pe=N.createElement("button");pe.textContent="数据库设置",pe.type="button",pe.onclick=()=>{var G;F.close(),(G=a.openSettings)==null||G.call(a)},ne.after(pe);const le=N.querySelector("footer");for(const[G,te]of[["test","测试发送"],["today","发送今日消息"]]){const T=N.createElement("button");T.textContent=te,T.dataset.send=G,T.onclick=async()=>{const R=N.querySelector("#editor");R.contentEditable="false";try{await L.send(R,G,N.querySelector("#date").value)}catch(W){C(String(W))}finally{R.contentEditable="true"}},le.append(T)}const ve=N.createElement("style");ve.textContent=Fx+`
`+Kx+`
body{font-family:var(--font-ui)}#date-picker{width:154px}`,N.head.append(ve);const U=N.createElement("span");U.className="production-message-demo",U.hidden=!0,N.body.append(U),c=of.createRoot(N.querySelector("#date-picker")),c.render(u.jsx(lA,{input:N.querySelector("#date")})),window.addEventListener("production-settings-updated",k);const se=N.querySelector("#runs");if(se.ontoggle=async()=>{if(!se.open)return;const G=se.querySelector("p");G.textContent="正在读取…";try{const te=await xe("daily.runs",{id:_});G.textContent=te.runs.length?"":"暂无运行记录";for(const T of te.runs){const R=N.createElement("div");R.textContent=`${T.time} · ${T.status} · ${T.businessDate}${T.error?" · "+T.error:""}`,G.append(R)}}catch(te){G.textContent=String(te)}},!n.notificationConfigured){const G=N.createElement("div");G.className="notice",G.dataset.notificationNotice="",G.append(N.createTextNode("通知渠道尚未配置。 "));const te=N.createElement("button");te.textContent="通知设置",te.onclick=a.openSettings||null,G.append(te),N.querySelector("#message").before(G)}A(),V().catch(G=>C(String(G)))},dispose(){s=!0,m++,c==null||c.unmount(),window.removeEventListener("production-settings-updated",k)}};return L}function lA({input:n}){const[a,s]=S.useState(n.value);return u.jsx(Ya,{value:a,onChange:o=>{var c;s(o),n.value=o,n.dispatchEvent(new(((c=n.ownerDocument.defaultView)==null?void 0:c.Event)||Event)("change",{bubbles:!0}))}})}const cA=`<!doctype html>
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
`,Av=()=>{const n=new Date;return n.setDate(n.getDate()-1),`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`};function Ix({id:n,...a}){const s=S.useRef(null),[o,c]=S.useState("");return S.useEffect(()=>{let h=!1,f;const m=s.current;return c(""),xe("notionFill.get",{id:n}).then(p=>{h||(f=uA(p,a),m.onload=()=>{var g;!h&&((g=m.contentDocument)!=null&&g.getElementById("date-picker"))&&f.connect(m.contentDocument)},m.srcdoc=cA.replace("../../src/ProductionAssistant.App/Assets/Fonts/Inter.ttf",new URL(Zx,window.location.href).href).replace("../../src/ProductionAssistant.App/Assets/Fonts/NotoSansSC.ttf",new URL(Qx,window.location.href).href))}).catch(p=>{h||c(String(p.message||p))}),()=>{h=!0,m.onload=null,f==null||f.dispose()}},[n]),u.jsxs("div",{className:"message-template-host",children:[o&&u.jsx("p",{role:"alert",children:o}),u.jsx("iframe",{ref:s,title:"原材料自动入库"})]})}function uA(n,a){let s={...n,runTime:n.runTime||"00:00"},o,c,h=!1,f=!1,m=0,p=0,g=Av(),v,b=s.isEnabled;const x=G=>o.getElementById(G),j=G=>x(G),E=G=>x(G),C=G=>x(G),A=G=>G instanceof Error?G.message:String(G),z=G=>G.toLocaleString("zh-CN",{minimumFractionDigits:3,maximumFractionDigits:3});function k(G,te=!1){x("feedback").textContent=G,x("feedback").className=te?"callout error":""}function V(){return!!(s.sourcePageUrl&&s.username&&s.passwordConfigured)}function _(){c==null||c.render(u.jsx(Ya,{value:g,disabled:f,onChange:N}))}function L(){for(const G of["preview","source-test","yesterday","settings-open","back","confirm-run"])E(G).disabled=f;E("preview").disabled=f||!V()||!s.notionConfigured,E("source-test").disabled=f||!V(),E("run").disabled=f||!v,o.querySelectorAll("#settings button, #settings input").forEach(G=>G.disabled=f),E("toggle").disabled=f||!s.schedulingAvailable,E("preview").textContent=f?"处理中…":"生成预览",x("name").textContent=s.name,x("enabled").textContent=s.isEnabled?s.schedulerInstalled?"已启用":"计划异常":"未启用",x("target-name").textContent=s.targetDataSourceName,x("settings-target-name").textContent=s.targetDataSourceName,j("password").placeholder=s.passwordConfigured?"已保存；留空不修改":"请输入 93 系统密码",_()}function Y(G="尚未生成预览"){m++,v=void 0,x("source-empty").hidden=!1,x("source-values").hidden=!0,x("source-error").hidden=!0,x("record").hidden=!0,x("target-status").hidden=!0,x("target-empty").hidden=!1,x("target-empty").querySelector("strong").textContent=G,x("target-empty").querySelector("span").textContent="预览只读取数据，不会新增记录",E("run").textContent="执行本日期",E("run").disabled=!0,C("confirm").open&&C("confirm").close()}function N(G){f||(g=G,j("date").value=G,Y("待重新预览"),k(""),_())}function M(G){x("source-empty").hidden=!0,x("source-values").hidden=!1;for(const[te,T]of[["plate",G.plateWeight],["section",G.sectionWeight],["total",G.totalWeight]])x(te).textContent=z(T)}function X(G){M(G),x("target-empty").hidden=!0,x("record").hidden=!1,x("record-title").textContent=`${G.businessDate} 入库`,x("record-date").textContent=G.businessDate,x("record-plate").textContent=`${z(G.plateWeight)} 吨`,x("record-section").textContent=`${z(G.sectionWeight)} 吨`,x("target-status").hidden=!1,x("target-status").textContent=G.targetRecordExists?"该日期已有记录，无需新增。":"可新增 1 条入库记录。",E("run").textContent=G.targetRecordExists?"验证查重":"执行本日期"}function F(G){x("run-count").textContent=G.length?`· ${G.length}`:"";const te=G.map(T=>{const R=o.createElement("div");R.className="run";const W=o.createElement("span");W.textContent={"source-test":"93 测试",test:"只读预览",manual:"手动执行",automatic:"自动执行"}[T.source]||T.source;const ae=o.createElement("div");ae.textContent=T.error||T.message||(T.status==="created"?"已新增":T.status==="failed"?"执行失败":"已检查"),T.status==="failed"&&(ae.style.color="#B91C1C");const oe=o.createElement("p");oe.textContent=T.status==="failed"?T.businessDate:`${T.businessDate} · 板材 ${z(T.plateWeight)} 吨 · 型材 ${z(T.sectionWeight)} 吨`,ae.append(oe);const fe=o.createElement("small");return fe.textContent=T.time,R.append(W,ae,fe),R});x("runs-body").replaceChildren(...te),G.length||(x("runs-body").textContent="暂无运行记录")}async function ne(){const G=++p;try{const te=await xe("notionFill.runs",{id:s.id});!h&&G===p&&F(te.runs)}catch(te){!h&&G===p&&(x("runs-body").textContent=`运行记录读取失败：${A(te)}；重新展开可重试。`)}}function ie(){Promise.resolve(a.changed()).catch(()=>{})}async function pe(G){if(f||!g)return;f=!0,Y("正在读取…");const te=m;L(),k("");try{const T=await xe(G?"notionFill.testSource":"notionFill.test",{id:s.id,businessDate:g},12e4);if(h||te!==m)return;if(!T.succeeded)throw new Error(T.message||"读取失败");G?(M(T),x("target-empty").querySelector("strong").textContent="尚未检查 Notion",x("target-empty").querySelector("span").textContent="点击“生成预览”完成读取与查重"):(s.validated=!0,v=T,X(T)),ie()}catch(T){if(h||te!==m)return;Y("本次预览未完成"),x("source-error").hidden=!1,x("source-error").textContent=A(T)}finally{h||(f=!1,L(),ne())}}async function le(){if(f||!v||!C("confirm").open)return;const G=v.businessDate;C("confirm").close(),f=!0,L(),k("");try{const te=await xe("notionFill.runNow",{id:s.id,businessDate:G},12e4);if(h)return;if(!te.succeeded)throw new Error(te.message||"执行失败");v={...v,targetRecordExists:!0},x("target-status").textContent=te.message,E("run").textContent="验证查重",k(te.created?"Notion 写入成功。":"该日期已有记录，本次已跳过。"),ie()}catch(te){h||(Y("执行未完成，请重新预览"),k(A(te),!0))}finally{h||(f=!1,L(),ne())}}function ve(){return j("task-name").value.trim()!==s.name||j("url").value.trim().replace(/\/+$/,"")!==s.sourcePageUrl||j("username").value.trim()!==s.username||!!j("password").value}function U(){E("toggle").setAttribute("aria-checked",String(b)),x("schedule-hint").textContent=s.schedulingAvailable?ve()?"配置已修改：保存后需重新预览，再启用。":s.isEnabled&&!s.schedulerInstalled?s.schedulerMessage:s.validated?"只读预览已通过，可以启用定时入库。":"完成一次“生成预览”后可启用。":"当前运行环境不支持定时启停，预览与手动执行仍可使用。"}async function se(G){if(G.preventDefault(),f)return;const te=j("task-name").value.trim(),T=j("username").value.trim();if(!te||!T){x("settings-note").textContent="任务名称和用户名不能为空。";return}const R=ve(),W=j("run-time").value;if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(W)){x("settings-note").textContent="请选择有效的执行时间。";return}const ae=R||W!==s.runTime,oe=R?!1:b;let fe=!1;f=!0,L();try{if(ae){const re=j("url").value.trim().replace(/\/+$/,""),Q=j("password").value;if(await xe("notionFill.save",{id:s.id,name:te,sourcePageUrl:re,username:T,password:Q,runTime:W}),h)return;fe=!0,s={...s,name:te,sourcePageUrl:re,username:T,runTime:W,passwordConfigured:s.passwordConfigured||!!Q,isEnabled:R?!1:s.isEnabled,validated:R?!1:s.validated},j("password").value="",R&&Y("配置已修改，请重新预览")}if(oe!==s.isEnabled){const re=await xe("automation.setEnabled",{id:s.id,taskType:"notion_fill",enabled:oe});if(h)return;if(s.isEnabled=re.enabled,re.enabled!==oe)throw new Error(re.message||"定时任务状态未更新");fe=!0}const ye=await xe("notionFill.get",{id:s.id});if(h)return;s=ye,C("settings").close(),k(R?"配置已保存，请重新预览后启用。":"任务设置已保存。")}catch(ye){h||(x("settings-note").textContent=`${fe?"设置已更新，但后续操作失败：":""}${A(ye)}`)}finally{h||(f=!1,b=s.isEnabled,L(),U(),fe&&ie())}}async function K(){if(f||h)return;const G=m;try{const te=await xe("notionFill.get",{id:s.id});if(h||f||G!==m)return;s=te,Y("系统设置已更新，请重新预览"),L(),k(s.notionConfigured?"系统设置已更新，点击“生成预览”读取数据。":"Notion 连接尚未配置，仍可仅测试 93 读取。")}catch(te){h||k(A(te),!0)}}return{connect(G){c==null||c.unmount(),o=G;const te=o.createElement("style");te.textContent=Fx+`
`+Kx+`
body{color:#292524}#date-picker{width:163px;display:inline-block}`,o.head.append(te);const T=o.createElement("span");T.className="production-message-demo",T.hidden=!0,o.body.append(T),c=of.createRoot(x("date-picker")),j("date").value=g,j("date").onchange=()=>N(j("date").value),E("yesterday").onclick=()=>N(Av()),E("preview").onclick=()=>{pe(!1)},E("source-test").onclick=()=>{pe(!0)},E("back").onclick=a.back,E("run").onclick=()=>{f||!v||(x("confirm-title").textContent=v.targetRecordExists?"验证查重":"执行本日期",x("confirm-copy").textContent=v.targetRecordExists?`${v.businessDate} 已有记录，本次执行应跳过。`:`将向“${s.targetDataSourceName}”新增 ${v.businessDate} 的记录：板材 ${z(v.plateWeight)} 吨，型材 ${z(v.sectionWeight)} 吨。`,C("confirm").showModal())},E("confirm-run").onclick=()=>{le()},E("settings-open").onclick=()=>{j("task-name").value=s.name,j("url").value=s.sourcePageUrl,j("username").value=s.username,j("password").value="",j("run-time").value=s.runTime,j("password").required=!s.passwordConfigured,x("settings-note").textContent="修改名称或连接后，需重新预览并启用定时任务。",b=s.isEnabled,U(),C("settings").showModal()},E("toggle").onclick=()=>{if(s.schedulingAvailable){if(!b&&(!s.validated||ve())){x("schedule-hint").textContent="请先保存配置并完成“生成预览”，再启用定时入库。";return}b=!b,U()}};for(const R of["task-name","url","username","password"])j(R).oninput=()=>{ve()&&(b=!1),U()};x("settings-form").onsubmit=R=>{se(R)},C("settings").onclose=()=>{j("password").value=""},C("settings").oncancel=R=>{f&&R.preventDefault()},o.querySelectorAll("[data-close]").forEach(R=>R.onclick=()=>{f||C(R.dataset.close).close()}),E("system-settings").hidden=!a.openSettings,E("system-settings").onclick=()=>{var R;C("settings").close(),(R=a.openSettings)==null||R.call(a)},o.querySelector(".runs").ontoggle=R=>{R.currentTarget.open&&ne()},window.addEventListener("production-settings-updated",K),Y(),L(),V()?s.notionConfigured||k("Notion 连接尚未配置，请从任务设置打开系统设置；仍可仅测试 93 读取。"):k("请先在任务设置中补全 93 系统连接配置。")},dispose(){h=!0,m++,p++,c==null||c.unmount(),window.removeEventListener("production-settings-updated",K)}}}var dA=Object.defineProperty,Fa=(n,a)=>dA(n,"name",{value:a,configurable:!0}),e0=!!(typeof window<"u"&&window.document&&window.document.createElement);function pr(n,a,{checkForDefaultPrevented:s=!0}={}){return Fa(function(c){if(n==null||n(c),s===!1||!c||!c.defaultPrevented)return a==null?void 0:a(c)},"handleEvent")}Fa(pr,"composeEventHandlers");function fA(n){var a;if(!e0)throw new Error("Cannot access window outside of the DOM");return((a=n==null?void 0:n.ownerDocument)==null?void 0:a.defaultView)??window}Fa(fA,"getOwnerWindow");function Hd(n){if(!e0)throw new Error("Cannot access document outside of the DOM");return(n==null?void 0:n.ownerDocument)??document}Fa(Hd,"getOwnerDocument");function t0(n,a=!1){const{activeElement:s}=Hd(n);if(!(s!=null&&s.nodeName))return null;if(n0(s)&&s.contentDocument)return t0(s.contentDocument.body,a);if(a){const o=s.getAttribute("aria-activedescendant");if(o){const c=Hd(s).getElementById(o);if(c)return c}}return s}Fa(t0,"getActiveElement");function n0(n){return n.tagName==="IFRAME"}Fa(n0,"isFrame");var hA=Object.defineProperty,qf=(n,a)=>hA(n,"name",{value:a,configurable:!0});function qd(n,a){if(typeof n=="function")return n(a);n!=null&&(n.current=a)}qf(qd,"setRef");function r0(...n){return a=>{let s=!1;const o=n.map(c=>{const h=qd(c,a);return!s&&typeof h=="function"&&(s=!0),h});if(s)return()=>{for(let c=0;c<o.length;c++){const h=o[c];typeof h=="function"?h():qd(n[c],null)}}}}qf(r0,"composeRefs");function Ka(...n){return S.useCallback(r0(...n),n)}qf(Ka,"useComposedRefs");var mA=Object.defineProperty,Jt=(n,a)=>mA(n,"name",{value:a,configurable:!0});function pA(n,a){const s=S.createContext(a);s.displayName=n+"Context";const o=Jt(h=>{const{children:f,...m}=h,p=S.useMemo(()=>m,Object.values(m));return u.jsx(s.Provider,{value:p,children:f})},"Provider");o.displayName=n+"Provider";function c(h,f={}){const{optional:m=!1}=f,p=S.useContext(s);if(p)return p;if(a!==void 0)return a;if(!m)throw new Error(`\`${h}\` must be used within \`${n}\``)}return Jt(c,"useContext"),[o,c]}Jt(pA,"createContext");function a0(n,a=[]){let s=[];function o(h,f){const m=S.createContext(f);m.displayName=h+"Context";const p=s.length;s=[...s,f];const g=Jt(b=>{var z;const{scope:x,children:j,...E}=b,C=((z=x==null?void 0:x[n])==null?void 0:z[p])||m,A=S.useMemo(()=>E,Object.values(E));return u.jsx(C.Provider,{value:A,children:j})},"Provider");g.displayName=h+"Provider";function v(b,x,j={}){var z;const{optional:E=!1}=j,C=((z=x==null?void 0:x[n])==null?void 0:z[p])||m,A=S.useContext(C);if(A)return A;if(f!==void 0)return f;if(!E)throw new Error(`\`${b}\` must be used within \`${h}\``)}return Jt(v,"useContext"),[g,v]}Jt(o,"createContext");const c=Jt(()=>{const h=s.map(f=>S.createContext(f));return Jt(function(m){const p=(m==null?void 0:m[n])||h;return S.useMemo(()=>({[`__scope${n}`]:{...m,[n]:p}}),[m,p])},"useScope")},"createScope");return c.scopeName=n,[o,i0(c,...a)]}Jt(a0,"createContextScope");function i0(...n){const a=n[0];if(n.length===1)return a;const s=Jt(()=>{const o=n.map(c=>({useScope:c(),scopeName:c.scopeName}));return Jt(function(h){const f=o.reduce((m,{useScope:p,scopeName:g})=>{const b=p(h)[`__scope${g}`];return{...m,...b}},{});return S.useMemo(()=>({[`__scope${a.scopeName}`]:f}),[f])},"useComposedScopes")},"createScope");return s.scopeName=a.scopeName,s}Jt(i0,"composeContextScopes");var vr=globalThis!=null&&globalThis.document?S.useLayoutEffect:()=>{},gA=Object.defineProperty,yA=(n,a)=>gA(n,"name",{value:a,configurable:!0}),vA=is[" useId ".trim().toString()]||(()=>{}),bA=0;function Jo(n){const[a,s]=S.useState(vA());return vr(()=>{n||s(o=>o??String(bA++))},[n]),n||(a?`radix-${a}`:"")}yA(Jo,"useId");var xA=Object.defineProperty,SA=(n,a)=>xA(n,"name",{value:a,configurable:!0}),Dv=is[" useEffectEvent ".trim().toString()],Nv=is[" useInsertionEffect ".trim().toString()];function s0(n){if(typeof Dv=="function")return Dv(n);const a=S.useRef(()=>{throw new Error("Cannot call an event handler while rendering.")});return typeof Nv=="function"?Nv(()=>{a.current=n}):vr(()=>{a.current=n}),S.useMemo(()=>((...s)=>{var o;return(o=a.current)==null?void 0:o.call(a,...s)}),[])}SA(s0,"useEffectEvent");var wA=Object.defineProperty,ds=(n,a)=>wA(n,"name",{value:a,configurable:!0}),jA=is[" useInsertionEffect ".trim().toString()]||vr;function o0({prop:n,defaultProp:a,onChange:s=ds(()=>{},"onChange"),caller:o}){const[c,h,f]=l0({defaultProp:a,onChange:s}),m=n!==void 0,p=m?n:c,g=S.useCallback(v=>{var b;if(m){const x=c0(v)?v(n):v;x!==n&&((b=f.current)==null||b.call(f,x))}else h(v)},[m,n,h,f]);return[p,g]}ds(o0,"useControllableState");function l0({defaultProp:n,onChange:a}){const[s,o]=S.useState(n),c=S.useRef(s),h=S.useRef(a);return jA(()=>{h.current=a},[a]),S.useEffect(()=>{var f;c.current!==s&&((f=h.current)==null||f.call(h,s),c.current=s)},[s,c]),[s,o,h]}ds(l0,"useUncontrolledState");function c0(n){return typeof n=="function"}ds(c0,"isFunction");var Mv=Symbol("RADIX:SYNC_STATE");function EA(n,a,s,o){const{prop:c,defaultProp:h,onChange:f,caller:m}=a,p=c!==void 0,g=s0(f),v=[{...s,state:h}];o&&v.push(o);const[b,x]=S.useReducer((A,z)=>{if(z.type===Mv)return{...A,state:z.state};const k=n(A,z);return p&&!Object.is(k.state,A.state)&&g(k.state),k},...v),j=b.state,E=S.useRef(j);S.useEffect(()=>{E.current!==j&&(E.current=j,p||g(j))},[j,E,p]);const C=S.useMemo(()=>c!==void 0?{...b,state:c}:b,[b,c]);return S.useEffect(()=>{p&&!Object.is(c,b.state)&&x({type:Mv,state:c})},[c,b.state,p]),[C,x]}ds(EA,"useControllableStateReducer");var TA=Object.defineProperty,ln=(n,a)=>TA(n,"name",{value:a,configurable:!0});function Yf(n){const a=S.forwardRef((s,o)=>{let{children:c,...h}=s,f=null,m=!1;const p=[];Yd(c)&&typeof Vo=="function"&&(c=Vo(c._payload)),S.Children.forEach(c,x=>{var j;if(h0(x)){m=!0;const E=x;let C="child"in E.props?E.props.child:E.props.children;Yd(C)&&typeof Vo=="function"&&(C=Vo(C._payload)),f=AA(E,C),p.push((j=f==null?void 0:f.props)==null?void 0:j.children)}else p.push(x)}),f?f=S.cloneElement(f,void 0,p):!m&&S.Children.count(c)===1&&S.isValidElement(c)&&(f=c);const g=f?f0(f):void 0,v=Ka(o,g);if(!f){if(c||c===0)throw new Error(m?MA(n):NA(n));return c}const b=d0(h,f.props??{});return f.type!==S.Fragment&&(b.ref=o?v:g),S.cloneElement(f,b)});return a.displayName=`${n}.Slot`,a}ln(Yf,"createSlot");var u0=Symbol.for("radix.slottable");function CA(n){const a=ln(s=>"child"in s?s.children(s.child):s.children,"Slottable");return a.displayName=`${n}.Slottable`,a.__radixId=u0,a}ln(CA,"createSlottable");var AA=ln((n,a)=>{if("child"in n.props){const s=n.props.child;return S.isValidElement(s)?S.cloneElement(s,void 0,n.props.children(s.props.children)):null}return S.isValidElement(a)?a:null},"getSlottableElementFromSlottable");function d0(n,a){const s={...a};for(const o in a){const c=n[o],h=a[o];/^on[A-Z]/.test(o)?c&&h?s[o]=(...m)=>{const p=h(...m);return c(...m),p}:c&&(s[o]=c):o==="style"?s[o]={...c,...h}:o==="className"&&(s[o]=[c,h].filter(Boolean).join(" "))}return{...n,...s}}ln(d0,"mergeProps");function f0(n){var o,c;let a=(o=Object.getOwnPropertyDescriptor(n.props,"ref"))==null?void 0:o.get,s=a&&"isReactWarning"in a&&a.isReactWarning;return s?n.ref:(a=(c=Object.getOwnPropertyDescriptor(n,"ref"))==null?void 0:c.get,s=a&&"isReactWarning"in a&&a.isReactWarning,s?n.props.ref:n.props.ref||n.ref)}ln(f0,"getElementRef");function h0(n){return S.isValidElement(n)&&typeof n.type=="function"&&"__radixId"in n.type&&n.type.__radixId===u0}ln(h0,"isSlottable");var DA=Symbol.for("react.lazy");function Yd(n){return n!=null&&typeof n=="object"&&"$$typeof"in n&&n.$$typeof===DA&&"_payload"in n&&m0(n._payload)}ln(Yd,"isLazyComponent");function m0(n){return typeof n=="object"&&n!==null&&"then"in n}ln(m0,"isPromiseLike");var NA=ln(n=>`${n} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`,"createSlotError"),MA=ln(n=>`${n} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`,"createSlottableError"),Vo=is[" use ".trim().toString()],kA=Object.defineProperty,RA=(n,a)=>kA(n,"name",{value:a,configurable:!0}),OA=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],Xr=OA.reduce((n,a)=>{const s=Yf(`Primitive.${a}`),o=S.forwardRef((c,h)=>{const{asChild:f,...m}=c,p=f?s:a;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),u.jsx(p,{...m,ref:h})});return o.displayName=`Primitive.${a}`,{...n,[a]:o}},{});function p0(n,a){n&&Hf.flushSync(()=>n.dispatchEvent(a))}RA(p0,"dispatchDiscreteCustomEvent");var zA=Object.defineProperty,_A=(n,a)=>zA(n,"name",{value:a,configurable:!0});function Ga(n){const a=S.useRef(n);return S.useEffect(()=>{a.current=n}),S.useMemo(()=>((...s)=>{var o;return(o=a.current)==null?void 0:o.call(a,...s)}),[])}_A(Ga,"useCallbackRef");var VA=Object.defineProperty,lt=(n,a)=>VA(n,"name",{value:a,configurable:!0}),Gd="dismissableLayer.update",BA="dismissableLayer.pointerDownOutside",LA="dismissableLayer.focusOutside",kv,g0=S.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set,dismissableSurfaces:new Set}),UA=S.forwardRef(lt(function(a,s){const{disableOutsidePointerEvents:o=!1,deferPointerDownOutside:c=!1,onEscapeKeyDown:h,onPointerDownOutside:f,onFocusOutside:m,onInteractOutside:p,onDismiss:g,...v}=a,b=S.useContext(g0),[x,j]=S.useState(null),E=(x==null?void 0:x.ownerDocument)??(globalThis==null?void 0:globalThis.document),[,C]=S.useState({}),A=Ka(s,j),z=Array.from(b.layers),[k]=[...b.layersWithOutsidePointerEventsDisabled].slice(-1),V=k?z.indexOf(k):-1,_=x?z.indexOf(x):-1,L=b.layersWithOutsidePointerEventsDisabled.size>0,Y=_>=V,N=S.useRef(!1),M=v0(ie=>{f==null||f(ie),p==null||p(ie),ie.defaultPrevented||g==null||g()},{ownerDocument:E,deferPointerDownOutside:c,isDeferredPointerDownOutsideRef:N,dismissableSurfaces:b.dismissableSurfaces,shouldHandlePointerDownOutside:S.useCallback(ie=>{if(!(ie instanceof Node))return!1;const pe=[...b.branches].some(le=>le.contains(ie));return Y&&!pe},[b.branches,Y])}),X=b0(ie=>{if(c&&N.current)return;const pe=ie.target;[...b.branches].some(ve=>ve.contains(pe))||(m==null||m(ie),p==null||p(ie),ie.defaultPrevented||g==null||g())},E),F=x?_===z.length-1:!1,ne=Ga(ie=>{ie.key==="Escape"&&(h==null||h(ie),!ie.defaultPrevented&&g&&(ie.preventDefault(),g()))});return S.useEffect(()=>{if(F)return E.addEventListener("keydown",ne,{capture:!0}),()=>E.removeEventListener("keydown",ne,{capture:!0})},[E,F,ne]),S.useEffect(()=>{if(x)return o&&(b.layersWithOutsidePointerEventsDisabled.size===0&&(kv=E.body.style.pointerEvents,E.body.style.pointerEvents="none"),b.layersWithOutsidePointerEventsDisabled.add(x)),b.layers.add(x),Pd(),()=>{o&&(b.layersWithOutsidePointerEventsDisabled.delete(x),b.layersWithOutsidePointerEventsDisabled.size===0&&(E.body.style.pointerEvents=kv))}},[x,E,o,b]),S.useEffect(()=>()=>{x&&(b.layers.delete(x),b.layersWithOutsidePointerEventsDisabled.delete(x),Pd())},[x,b]),S.useEffect(()=>{const ie=lt(()=>C({}),"handleUpdate");return document.addEventListener(Gd,ie),()=>document.removeEventListener(Gd,ie)},[]),u.jsx(Xr.div,{...v,ref:A,style:{pointerEvents:L?Y?"auto":"none":void 0,...a.style},onFocusCapture:pr(a.onFocusCapture,X.onFocusCapture),onBlurCapture:pr(a.onBlurCapture,X.onBlurCapture),onPointerDownCapture:pr(a.onPointerDownCapture,M.onPointerDownCapture)})},"DismissableLayer"));function y0(){const n=S.useContext(g0),[a,s]=S.useState(null);return S.useEffect(()=>{if(a)return n.dismissableSurfaces.add(a),()=>{n.dismissableSurfaces.delete(a)}},[a,n.dismissableSurfaces]),s}lt(y0,"useDismissableLayerSurface");var HA=lt(()=>!0,"IS_TRUE");function v0(n,a){const{ownerDocument:s=globalThis==null?void 0:globalThis.document,deferPointerDownOutside:o=!1,isDeferredPointerDownOutsideRef:c,dismissableSurfaces:h,shouldHandlePointerDownOutside:f=HA}=a,m=Ga(n),p=S.useRef(!1),g=S.useRef(!1),v=S.useRef(new Map),b=S.useRef(()=>{});return S.useEffect(()=>{function x(){g.current=!1,c.current=!1,v.current.clear()}lt(x,"resetOutsideInteraction");function j(){return Array.from(v.current.values()).some(Boolean)}lt(j,"isOutsideInteractionIntercepted");function E(V){if(!g.current)return;const _=V.target;_ instanceof Node&&[...h].some(Y=>Y.contains(_))||v.current.set(V.type,!0),V.type==="click"&&window.setTimeout(()=>{g.current&&b.current()},0)}lt(E,"handleInteractionCapture");function C(V){g.current&&v.current.set(V.type,!1)}lt(C,"handleInteractionBubble");const A=lt(V=>{if(V.target&&!p.current){let _=function(){s.removeEventListener("click",b.current);const Y=j();x(),Y||Gf(BA,m,L,{discrete:!0})};if(lt(_,"handleAndDispatchPointerDownOutsideEvent"),!f(V.target)){s.removeEventListener("click",b.current),x(),p.current=!1;return}const L={originalEvent:V};g.current=!0,c.current=o&&V.button===0,v.current.clear(),!o||V.button!==0?_():(s.removeEventListener("click",b.current),b.current=_,s.addEventListener("click",b.current,{once:!0}))}else s.removeEventListener("click",b.current),x();p.current=!1},"handlePointerDown"),z=["pointerup","mousedown","mouseup","touchstart","touchend","click"];for(const V of z)s.addEventListener(V,E,!0),s.addEventListener(V,C);const k=window.setTimeout(()=>{s.addEventListener("pointerdown",A)},0);return()=>{window.clearTimeout(k),s.removeEventListener("pointerdown",A),s.removeEventListener("click",b.current);for(const V of z)s.removeEventListener(V,E,!0),s.removeEventListener(V,C)}},[s,m,o,c,h,f]),{onPointerDownCapture:lt(()=>p.current=!0,"onPointerDownCapture")}}lt(v0,"usePointerDownOutside");function b0(n,a=globalThis==null?void 0:globalThis.document){const s=Ga(n),o=S.useRef(!1);return S.useEffect(()=>{const c=lt(h=>{h.target&&!o.current&&Gf(LA,s,{originalEvent:h},{discrete:!1})},"handleFocus");return a.addEventListener("focusin",c),()=>a.removeEventListener("focusin",c)},[a,s]),{onFocusCapture:lt(()=>o.current=!0,"onFocusCapture"),onBlurCapture:lt(()=>o.current=!1,"onBlurCapture")}}lt(b0,"useFocusOutside");function Pd(){const n=new CustomEvent(Gd);document.dispatchEvent(n)}lt(Pd,"dispatchUpdate");function Gf(n,a,s,{discrete:o}){const c=s.originalEvent.target,h=new CustomEvent(n,{bubbles:!1,cancelable:!0,detail:s});a&&c.addEventListener(n,a,{once:!0}),o?p0(c,h):c.dispatchEvent(h)}lt(Gf,"handleAndDispatchCustomEvent");var qA=Object.defineProperty,St=(n,a)=>qA(n,"name",{value:a,configurable:!0}),rd="focusScope.autoFocusOnMount",ad="focusScope.autoFocusOnUnmount",Rv={bubbles:!1,cancelable:!0},YA=S.forwardRef(St(function(a,s){const{loop:o=!1,trapped:c=!1,onMountAutoFocus:h,onUnmountAutoFocus:f,...m}=a,[p,g]=S.useState(null),v=Ga(h),b=Ga(f),x=S.useRef(null),j=Ka(s,g),E=S.useRef({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;S.useEffect(()=>{if(c){let A=function(_){if(E.paused||!p)return;const L=_.target;p.contains(L)?x.current=L:Un(x.current,{select:!0})},z=function(_){if(E.paused||!p)return;const L=_.relatedTarget;L!==null&&(p.contains(L)||Un(x.current,{select:!0}))},k=function(_){if(document.activeElement===document.body)for(const Y of _)Y.removedNodes.length>0&&Un(p)};St(A,"handleFocusIn"),St(z,"handleFocusOut"),St(k,"handleMutations"),document.addEventListener("focusin",A),document.addEventListener("focusout",z);const V=new MutationObserver(k);return p&&V.observe(p,{childList:!0,subtree:!0}),()=>{document.removeEventListener("focusin",A),document.removeEventListener("focusout",z),V.disconnect()}}},[c,p,E.paused]),S.useEffect(()=>{if(p){Ov.add(E);const A=document.activeElement;if(!p.contains(A)){const k=new CustomEvent(rd,Rv);p.addEventListener(rd,v),p.dispatchEvent(k),k.defaultPrevented||(x0(T0(Pf(p)),{select:!0}),document.activeElement===A&&Un(p))}return()=>{p.removeEventListener(rd,v),setTimeout(()=>{const k=new CustomEvent(ad,Rv);p.addEventListener(ad,b),p.dispatchEvent(k),k.defaultPrevented||Un(A??document.body,{select:!0}),p.removeEventListener(ad,b),Ov.remove(E)},0)}}},[p,v,b,E]);const C=S.useCallback(A=>{if(!o&&!c||E.paused)return;const z=A.key==="Tab"&&!A.altKey&&!A.ctrlKey&&!A.metaKey,k=document.activeElement;if(z&&k){const V=A.currentTarget,[_,L]=S0(V);_&&L?!A.shiftKey&&k===L?(A.preventDefault(),o&&Un(_,{select:!0})):A.shiftKey&&k===_&&(A.preventDefault(),o&&Un(L,{select:!0})):k===V&&A.preventDefault()}},[o,c,E.paused]);return u.jsx(Xr.div,{tabIndex:-1,...m,ref:j,onKeyDown:C})},"FocusScope"));function x0(n,{select:a=!1}={}){const s=document.activeElement;for(const o of n)if(Un(o,{select:a}),document.activeElement!==s)return}St(x0,"focusFirst");function S0(n){const a=Pf(n),s=Xd(a,n),o=Xd(a.reverse(),n);return[s,o]}St(S0,"getTabbableEdges");function Pf(n){const a=[],s=document.createTreeWalker(n,NodeFilter.SHOW_ELEMENT,{acceptNode:St(o=>{const c=o.tagName==="INPUT"&&o.type==="hidden";return o.disabled||o.hidden||c?NodeFilter.FILTER_SKIP:o.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP},"acceptNode")});for(;s.nextNode();)a.push(s.currentNode);return a}St(Pf,"getTabbableCandidates");function Xd(n,a){const s=typeof a.checkVisibility=="function"&&a.checkVisibility({checkVisibilityCSS:!0});for(const o of n)if(!(s?!o.checkVisibility({checkVisibilityCSS:!0}):w0(o,{upTo:a})))return o}St(Xd,"findVisible");function w0(n,{upTo:a}){if(getComputedStyle(n).visibility==="hidden")return!0;for(;n;){if(a!==void 0&&n===a)return!1;if(getComputedStyle(n).display==="none")return!0;n=n.parentElement}return!1}St(w0,"isHidden");function j0(n){return n instanceof HTMLInputElement&&"select"in n}St(j0,"isSelectableInput");function Un(n,{select:a=!1}={}){if(n&&n.focus){const s=document.activeElement;n.focus({preventScroll:!0}),n!==s&&j0(n)&&a&&n.select()}}St(Un,"focus");var Ov=E0();function E0(){let n=[];return{add(a){const s=n[0];a!==s&&(s==null||s.pause()),n=$d(n,a),n.unshift(a)},remove(a){var s;n=$d(n,a),(s=n[0])==null||s.resume()}}}St(E0,"createFocusScopesStack");function $d(n,a){const s=[...n],o=s.indexOf(a);return o!==-1&&s.splice(o,1),s}St($d,"arrayRemove");function T0(n){return n.filter(a=>a.tagName!=="A")}St(T0,"removeLinks");var GA=Object.defineProperty,PA=(n,a)=>GA(n,"name",{value:a,configurable:!0}),XA=S.forwardRef(PA(function(a,s){var p;const{container:o,...c}=a,[h,f]=S.useState(!1);vr(()=>f(!0),[]);const m=o||h&&((p=globalThis==null?void 0:globalThis.document)==null?void 0:p.body);return m?Hf.createPortal(u.jsx(Xr.div,{...c,ref:s}),m):null},"Portal")),$A=Object.defineProperty,Hn=(n,a)=>$A(n,"name",{value:a,configurable:!0});function C0(n,a){return S.useReducer((s,o)=>a[s][o]??s,n)}Hn(C0,"useStateMachine");var Xf=Hn(n=>{const{present:a,children:s}=n,o=A0(a),c=typeof s=="function"?s({present:o.isPresent}):S.Children.only(s),h=D0(o.ref,N0(c));return typeof s=="function"||o.isPresent?S.cloneElement(c,{ref:h}):null},"Presence");function A0(n){const[a,s]=S.useState(),o=S.useRef(null),c=S.useRef(n),h=S.useRef("none"),f=S.useRef(void 0),m=n?"mounted":"unmounted",[p,g]=C0(m,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return S.useEffect(()=>{p==="mounted"?(h.current=f.current??za(o.current),f.current=void 0):h.current="none"},[p]),vr(()=>{const v=o.current,b=c.current;if(b!==n){const j=h.current,E=za(v);n?(f.current=E,g("MOUNT")):E==="none"||(v==null?void 0:v.display)==="none"?g("UNMOUNT"):g(b&&j!==E?"ANIMATION_OUT":"UNMOUNT"),c.current=n}},[n,g]),vr(()=>{if(a){let v;const b=a.ownerDocument.defaultView??window,x=Hn(E=>{const A=za(o.current).includes(CSS.escape(E.animationName));if(E.target===a&&A&&(g("ANIMATION_END"),!c.current)){const z=a.style.animationFillMode;a.style.animationFillMode="forwards",v=b.setTimeout(()=>{a.style.animationFillMode==="forwards"&&(a.style.animationFillMode=z)})}},"handleAnimationEnd"),j=Hn(E=>{E.target===a&&(h.current=za(o.current))},"handleAnimationStart");return a.addEventListener("animationstart",j),a.addEventListener("animationcancel",x),a.addEventListener("animationend",x),()=>{b.clearTimeout(v),a.removeEventListener("animationstart",j),a.removeEventListener("animationcancel",x),a.removeEventListener("animationend",x)}}else g("ANIMATION_END")},[a,g]),{isPresent:["mounted","unmountSuspended"].includes(p),ref:S.useCallback(v=>{if(v){const b=getComputedStyle(v);o.current=b,f.current=za(b)}else o.current=null;s(v)},[])}}Hn(A0,"usePresence");function Fd(n,a){if(typeof n=="function")return n(a);n!=null&&(n.current=a)}Hn(Fd,"setRef");function D0(...n){const a=S.useRef(n);return a.current=n,S.useCallback(s=>{const o=a.current;let c=!1;const h=o.map(f=>{const m=Fd(f,s);return!c&&typeof m=="function"&&(c=!0),m});if(c)return()=>{for(let f=0;f<h.length;f++){const m=h[f];typeof m=="function"?m():Fd(o[f],null)}}},[])}Hn(D0,"useStableComposedRefs");function za(n){return(n==null?void 0:n.animationName)||"none"}Hn(za,"getAnimationName");function N0(n){var o,c;let a=(o=Object.getOwnPropertyDescriptor(n.props,"ref"))==null?void 0:o.get,s=a&&"isReactWarning"in a&&a.isReactWarning;return s?n.ref:(a=(c=Object.getOwnPropertyDescriptor(n,"ref"))==null?void 0:c.get,s=a&&"isReactWarning"in a&&a.isReactWarning,s?n.props.ref:n.props.ref||n.ref)}Hn(N0,"getElementRef");var FA=Object.defineProperty,$f=(n,a)=>FA(n,"name",{value:a,configurable:!0}),Bo=0,hn=null;function KA(n){return Ff(),n.children}$f(KA,"FocusGuards");function Ff(){S.useEffect(()=>{hn||(hn={start:Kd(),end:Kd()});const{start:n,end:a}=hn;return document.body.firstElementChild!==n&&document.body.insertAdjacentElement("afterbegin",n),document.body.lastElementChild!==a&&document.body.insertAdjacentElement("beforeend",a),Bo++,()=>{Bo===1&&(hn==null||hn.start.remove(),hn==null||hn.end.remove(),hn=null),Bo=Math.max(0,Bo-1)}},[])}$f(Ff,"useFocusGuards");function Kd(){const n=document.createElement("span");return n.setAttribute("data-radix-focus-guard",""),n.tabIndex=0,n.style.outline="none",n.style.opacity="0",n.style.position="fixed",n.style.pointerEvents="none",n}$f(Kd,"createFocusGuard");var gn=function(){return gn=Object.assign||function(a){for(var s,o=1,c=arguments.length;o<c;o++){s=arguments[o];for(var h in s)Object.prototype.hasOwnProperty.call(s,h)&&(a[h]=s[h])}return a},gn.apply(this,arguments)};function M0(n,a){var s={};for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&a.indexOf(o)<0&&(s[o]=n[o]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var c=0,o=Object.getOwnPropertySymbols(n);c<o.length;c++)a.indexOf(o[c])<0&&Object.prototype.propertyIsEnumerable.call(n,o[c])&&(s[o[c]]=n[o[c]]);return s}function ZA(n,a,s){if(s||arguments.length===2)for(var o=0,c=a.length,h;o<c;o++)(h||!(o in a))&&(h||(h=Array.prototype.slice.call(a,0,o)),h[o]=a[o]);return n.concat(h||Array.prototype.slice.call(a))}var Wo="right-scroll-bar-position",Io="width-before-scroll-bar",QA="with-scroll-bars-hidden",JA="--removed-body-scroll-bar-size";function id(n,a){return typeof n=="function"?n(a):n&&(n.current=a),n}function WA(n,a){var s=S.useState(function(){return{value:n,callback:a,facade:{get current(){return s.value},set current(o){var c=s.value;c!==o&&(s.value=o,s.callback(o,c))}}}})[0];return s.callback=a,s.facade}var IA=typeof window<"u"?S.useLayoutEffect:S.useEffect,zv=new WeakMap;function eD(n,a){var s=WA(null,function(o){return n.forEach(function(c){return id(c,o)})});return IA(function(){var o=zv.get(s);if(o){var c=new Set(o),h=new Set(n),f=s.current;c.forEach(function(m){h.has(m)||id(m,null)}),h.forEach(function(m){c.has(m)||id(m,f)})}zv.set(s,n)},[n]),s}function tD(n){return n}function nD(n,a){a===void 0&&(a=tD);var s=[],o=!1,c={read:function(){if(o)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return s.length?s[s.length-1]:n},useMedium:function(h){var f=a(h,o);return s.push(f),function(){s=s.filter(function(m){return m!==f})}},assignSyncMedium:function(h){for(o=!0;s.length;){var f=s;s=[],f.forEach(h)}s={push:function(m){return h(m)},filter:function(){return s}}},assignMedium:function(h){o=!0;var f=[];if(s.length){var m=s;s=[],m.forEach(h),f=s}var p=function(){var v=f;f=[],v.forEach(h)},g=function(){return Promise.resolve().then(p)};g(),s={push:function(v){f.push(v),g()},filter:function(v){return f=f.filter(v),s}}}};return c}function rD(n){n===void 0&&(n={});var a=nD(null);return a.options=gn({async:!0,ssr:!1},n),a}var k0=function(n){var a=n.sideCar,s=M0(n,["sideCar"]);if(!a)throw new Error("Sidecar: please provide `sideCar` property to import the right car");var o=a.read();if(!o)throw new Error("Sidecar medium not found");return S.createElement(o,gn({},s))};k0.isSideCarExport=!0;function aD(n,a){return n.useMedium(a),k0}var R0=rD(),sd=function(){},vl=S.forwardRef(function(n,a){var s=S.useRef(null),o=S.useState({onScrollCapture:sd,onWheelCapture:sd,onTouchMoveCapture:sd}),c=o[0],h=o[1],f=n.forwardProps,m=n.children,p=n.className,g=n.removeScrollBar,v=n.enabled,b=n.shards,x=n.sideCar,j=n.noRelative,E=n.noIsolation,C=n.inert,A=n.allowPinchZoom,z=n.as,k=z===void 0?"div":z,V=n.gapMode,_=M0(n,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noRelative","noIsolation","inert","allowPinchZoom","as","gapMode"]),L=x,Y=eD([s,a]),N=gn(gn({},_),c);return S.createElement(S.Fragment,null,v&&S.createElement(L,{sideCar:R0,removeScrollBar:g,shards:b,noRelative:j,noIsolation:E,inert:C,setCallbacks:h,allowPinchZoom:!!A,lockRef:s,gapMode:V}),f?S.cloneElement(S.Children.only(m),gn(gn({},N),{ref:Y})):S.createElement(k,gn({},N,{className:p,ref:Y}),m))});vl.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};vl.classNames={fullWidth:Io,zeroRight:Wo};var iD=function(){if(typeof __webpack_nonce__<"u")return __webpack_nonce__};function sD(){if(!document)return null;var n=document.createElement("style");n.type="text/css";var a=iD();return a&&n.setAttribute("nonce",a),n}function oD(n,a){n.styleSheet?n.styleSheet.cssText=a:n.appendChild(document.createTextNode(a))}function lD(n){var a=document.head||document.getElementsByTagName("head")[0];a.appendChild(n)}var cD=function(){var n=0,a=null;return{add:function(s){n==0&&(a=sD())&&(oD(a,s),lD(a)),n++},remove:function(){n--,!n&&a&&(a.parentNode&&a.parentNode.removeChild(a),a=null)}}},uD=function(){var n=cD();return function(a,s){S.useEffect(function(){return n.add(a),function(){n.remove()}},[a&&s])}},O0=function(){var n=uD(),a=function(s){var o=s.styles,c=s.dynamic;return n(o,c),null};return a},dD={left:0,top:0,right:0,gap:0},od=function(n){return parseInt(n||"",10)||0},fD=function(n){var a=window.getComputedStyle(document.body),s=a[n==="padding"?"paddingLeft":"marginLeft"],o=a[n==="padding"?"paddingTop":"marginTop"],c=a[n==="padding"?"paddingRight":"marginRight"];return[od(s),od(o),od(c)]},hD=function(n){if(n===void 0&&(n="margin"),typeof window>"u")return dD;var a=fD(n),s=document.documentElement.clientWidth,o=window.innerWidth;return{left:a[0],top:a[1],right:a[2],gap:Math.max(0,o-s+a[2]-a[0])}},mD=O0(),La="data-scroll-locked",pD=function(n,a,s,o){var c=n.left,h=n.top,f=n.right,m=n.gap;return s===void 0&&(s="margin"),`
  .`.concat(QA,` {
   overflow: hidden `).concat(o,`;
   padding-right: `).concat(m,"px ").concat(o,`;
  }
  body[`).concat(La,`] {
    overflow: hidden `).concat(o,`;
    overscroll-behavior: contain;
    `).concat([a&&"position: relative ".concat(o,";"),s==="margin"&&`
    padding-left: `.concat(c,`px;
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
  
  body[`).concat(La,`] {
    `).concat(JA,": ").concat(m,`px;
  }
`)},_v=function(){var n=parseInt(document.body.getAttribute(La)||"0",10);return isFinite(n)?n:0},gD=function(){S.useEffect(function(){return document.body.setAttribute(La,(_v()+1).toString()),function(){var n=_v()-1;n<=0?document.body.removeAttribute(La):document.body.setAttribute(La,n.toString())}},[])},yD=function(n){var a=n.noRelative,s=n.noImportant,o=n.gapMode,c=o===void 0?"margin":o;gD();var h=S.useMemo(function(){return hD(c)},[c]);return S.createElement(mD,{styles:pD(h,!a,c,s?"":"!important")})},Zd=!1;if(typeof window<"u")try{var Lo=Object.defineProperty({},"passive",{get:function(){return Zd=!0,!0}});window.addEventListener("test",Lo,Lo),window.removeEventListener("test",Lo,Lo)}catch{Zd=!1}var Ma=Zd?{passive:!1}:!1,vD=function(n){return n.tagName==="TEXTAREA"},z0=function(n,a){if(!(n instanceof Element))return!1;var s=window.getComputedStyle(n);return s[a]!=="hidden"&&!(s.overflowY===s.overflowX&&!vD(n)&&s[a]==="visible")},bD=function(n){return z0(n,"overflowY")},xD=function(n){return z0(n,"overflowX")},Vv=function(n,a){var s=a.ownerDocument,o=a;do{typeof ShadowRoot<"u"&&o instanceof ShadowRoot&&(o=o.host);var c=_0(n,o);if(c){var h=V0(n,o),f=h[1],m=h[2];if(f>m)return!0}o=o.parentNode}while(o&&o!==s.body);return!1},SD=function(n){var a=n.scrollTop,s=n.scrollHeight,o=n.clientHeight;return[a,s,o]},wD=function(n){var a=n.scrollLeft,s=n.scrollWidth,o=n.clientWidth;return[a,s,o]},_0=function(n,a){return n==="v"?bD(a):xD(a)},V0=function(n,a){return n==="v"?SD(a):wD(a)},jD=function(n,a){return n==="h"&&a==="rtl"?-1:1},ED=function(n,a,s,o,c){var h=jD(n,window.getComputedStyle(a).direction),f=h*o,m=s.target,p=a.contains(m),g=!1,v=f>0,b=0,x=0;do{if(!m)break;var j=V0(n,m),E=j[0],C=j[1],A=j[2],z=C-A-h*E;(E||z)&&_0(n,m)&&(b+=z,x+=E);var k=m.parentNode;m=k&&k.nodeType===Node.DOCUMENT_FRAGMENT_NODE?k.host:k}while(!p&&m!==document.body||p&&(a.contains(m)||a===m));return(v&&Math.abs(b)<1||!v&&Math.abs(x)<1)&&(g=!0),g},Uo=function(n){return"changedTouches"in n?[n.changedTouches[0].clientX,n.changedTouches[0].clientY]:[0,0]},Bv=function(n){return[n.deltaX,n.deltaY]},Lv=function(n){return n&&"current"in n?n.current:n},TD=function(n,a){return n[0]===a[0]&&n[1]===a[1]},CD=function(n){return`
  .block-interactivity-`.concat(n,` {pointer-events: none;}
  .allow-interactivity-`).concat(n,` {pointer-events: all;}
`)},AD=0,ka=[];function DD(n){var a=S.useRef([]),s=S.useRef([0,0]),o=S.useRef(),c=S.useState(AD++)[0],h=S.useState(O0)[0],f=S.useRef(n);S.useEffect(function(){f.current=n},[n]),S.useEffect(function(){if(n.inert){document.body.classList.add("block-interactivity-".concat(c));var C=ZA([n.lockRef.current],(n.shards||[]).map(Lv),!0).filter(Boolean);return C.forEach(function(A){return A.classList.add("allow-interactivity-".concat(c))}),function(){document.body.classList.remove("block-interactivity-".concat(c)),C.forEach(function(A){return A.classList.remove("allow-interactivity-".concat(c))})}}},[n.inert,n.lockRef.current,n.shards]);var m=S.useCallback(function(C,A){if("touches"in C&&C.touches.length===2||C.type==="wheel"&&C.ctrlKey)return!f.current.allowPinchZoom;var z=Uo(C),k=s.current,V="deltaX"in C?C.deltaX:k[0]-z[0],_="deltaY"in C?C.deltaY:k[1]-z[1],L,Y=C.target,N=Math.abs(V)>Math.abs(_)?"h":"v";if("touches"in C&&N==="h"&&Y.type==="range")return!1;var M=window.getSelection(),X=M&&M.anchorNode,F=X?X===Y||X.contains(Y):!1;if(F)return!1;var ne=Vv(N,Y);if(!ne)return!0;if(ne?L=N:(L=N==="v"?"h":"v",ne=Vv(N,Y)),!ne)return!1;if(!o.current&&"changedTouches"in C&&(V||_)&&(o.current=L),!L)return!0;var ie=o.current||L;return ED(ie,A,C,ie==="h"?V:_)},[]),p=S.useCallback(function(C){var A=C;if(!(!ka.length||ka[ka.length-1]!==h)){var z="deltaY"in A?Bv(A):Uo(A),k=a.current.filter(function(L){return L.name===A.type&&(L.target===A.target||A.target===L.shadowParent)&&TD(L.delta,z)})[0];if(k&&k.should){A.cancelable&&A.preventDefault();return}if(!k){var V=(f.current.shards||[]).map(Lv).filter(Boolean).filter(function(L){return L.contains(A.target)}),_=V.length>0?m(A,V[0]):!f.current.noIsolation;_&&A.cancelable&&A.preventDefault()}}},[]),g=S.useCallback(function(C,A,z,k){var V={name:C,delta:A,target:z,should:k,shadowParent:ND(z)};a.current.push(V),setTimeout(function(){a.current=a.current.filter(function(_){return _!==V})},1)},[]),v=S.useCallback(function(C){s.current=Uo(C),o.current=void 0},[]),b=S.useCallback(function(C){g(C.type,Bv(C),C.target,m(C,n.lockRef.current))},[]),x=S.useCallback(function(C){g(C.type,Uo(C),C.target,m(C,n.lockRef.current))},[]);S.useEffect(function(){return ka.push(h),n.setCallbacks({onScrollCapture:b,onWheelCapture:b,onTouchMoveCapture:x}),document.addEventListener("wheel",p,Ma),document.addEventListener("touchmove",p,Ma),document.addEventListener("touchstart",v,Ma),function(){ka=ka.filter(function(C){return C!==h}),document.removeEventListener("wheel",p,Ma),document.removeEventListener("touchmove",p,Ma),document.removeEventListener("touchstart",v,Ma)}},[]);var j=n.removeScrollBar,E=n.inert;return S.createElement(S.Fragment,null,E?S.createElement(h,{styles:CD(c)}):null,j?S.createElement(yD,{noRelative:n.noRelative,gapMode:n.gapMode}):null)}function ND(n){for(var a=null;n!==null;)n instanceof ShadowRoot&&(a=n.host,n=n.host),n=n.parentNode;return a}const MD=aD(R0,DD);var B0=S.forwardRef(function(n,a){return S.createElement(vl,gn({},n,{ref:a,sideCar:MD}))});B0.classNames=vl.classNames;var kD=function(n){if(typeof document>"u")return null;var a=Array.isArray(n)?n[0]:n;return a.ownerDocument.body},Ra=new WeakMap,Ho=new WeakMap,qo={},ld=0,L0=function(n){return n&&(n.host||L0(n.parentNode))},RD=function(n,a){return a.map(function(s){if(n.contains(s))return s;var o=L0(s);return o&&n.contains(o)?o:(console.error("aria-hidden",s,"in not contained inside",n,". Doing nothing"),null)}).filter(function(s){return!!s})},OD=function(n,a,s,o){var c=RD(a,Array.isArray(n)?n:[n]);qo[s]||(qo[s]=new WeakMap);var h=qo[s],f=[],m=new Set,p=new Set(c),g=function(b){!b||m.has(b)||(m.add(b),g(b.parentNode))};c.forEach(g);var v=function(b){!b||p.has(b)||Array.prototype.forEach.call(b.children,function(x){if(m.has(x))v(x);else try{var j=x.getAttribute(o),E=j!==null&&j!=="false",C=(Ra.get(x)||0)+1,A=(h.get(x)||0)+1;Ra.set(x,C),h.set(x,A),f.push(x),C===1&&E&&Ho.set(x,!0),A===1&&x.setAttribute(s,"true"),E||x.setAttribute(o,"true")}catch(z){console.error("aria-hidden: cannot operate on ",x,z)}})};return v(a),m.clear(),ld++,function(){f.forEach(function(b){var x=Ra.get(b)-1,j=h.get(b)-1;Ra.set(b,x),h.set(b,j),x||(Ho.has(b)||b.removeAttribute(o),Ho.delete(b)),j||b.removeAttribute(s)}),ld--,ld||(Ra=new WeakMap,Ra=new WeakMap,Ho=new WeakMap,qo={})}},zD=function(n,a,s){s===void 0&&(s="data-aria-hidden");var o=Array.from(Array.isArray(n)?n:[n]),c=kD(n);return c?(o.push.apply(o,Array.from(c.querySelectorAll("[aria-live], script"))),OD(o,c,s,"aria-hidden")):function(){return null}},_D=Object.defineProperty,en=(n,a)=>_D(n,"name",{value:a,configurable:!0}),Kf="Dialog",[U0,MN]=a0(Kf),[VD,bn]=U0(Kf),Qd=en(n=>{const{__scopeDialog:a,children:s,open:o,defaultOpen:c,onOpenChange:h,modal:f=!0}=n,m=S.useRef(null),p=S.useRef(null),[g,v]=o0({prop:o,defaultProp:c??!1,onChange:h,caller:Kf}),[b,x]=S.useState(0),[j,E]=S.useState(0);return u.jsx(VD,{scope:a,triggerRef:m,contentRef:p,contentId:Jo(),titleId:Jo(),descriptionId:Jo(),titlePresent:b>0,descriptionPresent:j>0,setTitleCount:x,setDescriptionCount:E,open:g,onOpenChange:v,onOpenToggle:S.useCallback(()=>v(C=>!C),[v]),modal:f,children:s})},"Dialog"),H0="DialogPortal",[BD,q0]=U0(H0,{forceMount:void 0}),Jd=en(n=>{const{__scopeDialog:a,forceMount:s,children:o,container:c}=n,h=bn(H0,a);return u.jsx(BD,{scope:a,forceMount:s,children:S.Children.map(o,f=>u.jsx(Xf,{present:s||h.open,children:u.jsx(XA,{asChild:!0,container:c,children:f})}))})},"DialogPortal"),Wd="DialogOverlay",Id=S.forwardRef(en(function(a,s){const o=q0(Wd,a.__scopeDialog),{forceMount:c=o.forceMount,...h}=a,f=bn(Wd,a.__scopeDialog);return f.modal?u.jsx(Xf,{present:c||f.open,children:u.jsx(UD,{...h,ref:s})}):null},"DialogOverlay")),LD=Yf("DialogOverlay.RemoveScroll"),UD=S.forwardRef(en(function(a,s){const{__scopeDialog:o,...c}=a,h=bn(Wd,o),f=y0(),m=Ka(s,f);return u.jsx(B0,{as:LD,allowPinchZoom:!0,shards:[h.contentRef],children:u.jsx(Xr.div,{"data-state":Zf(h.open),...c,ref:m,style:{pointerEvents:"auto",...c.style}})})},"DialogOverlayImpl")),rs="DialogContent",ef=S.forwardRef(en(function(a,s){const o=q0(rs,a.__scopeDialog),{forceMount:c=o.forceMount,...h}=a,f=bn(rs,a.__scopeDialog);return u.jsx(Xf,{present:c||f.open,children:f.modal?u.jsx(HD,{...h,ref:s}):u.jsx(qD,{...h,ref:s})})},"DialogContent")),HD=S.forwardRef(en(function(a,s){const o=bn(rs,a.__scopeDialog),c=S.useRef(null),h=Ka(s,o.contentRef,c);return S.useEffect(()=>{const f=c.current;if(f)return zD(f)},[]),u.jsx(Y0,{...a,ref:h,trapFocus:o.open,disableOutsidePointerEvents:o.open,onCloseAutoFocus:pr(a.onCloseAutoFocus,f=>{var m;f.preventDefault(),(m=o.triggerRef.current)==null||m.focus()}),onPointerDownOutside:pr(a.onPointerDownOutside,f=>{const m=f.detail.originalEvent,p=m.button===0&&m.ctrlKey===!0;(m.button===2||p)&&f.preventDefault()}),onFocusOutside:pr(a.onFocusOutside,f=>f.preventDefault())})},"DialogContentModal")),qD=S.forwardRef(en(function(a,s){const o=bn(rs,a.__scopeDialog),c=S.useRef(!1),h=S.useRef(!1);return u.jsx(Y0,{...a,ref:s,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:f=>{var m,p;(m=a.onCloseAutoFocus)==null||m.call(a,f),f.defaultPrevented||(c.current||(p=o.triggerRef.current)==null||p.focus(),f.preventDefault()),c.current=!1,h.current=!1},onInteractOutside:f=>{var g,v;(g=a.onInteractOutside)==null||g.call(a,f),f.defaultPrevented||(c.current=!0,f.detail.originalEvent.type==="pointerdown"&&(h.current=!0));const m=f.target;((v=o.triggerRef.current)==null?void 0:v.contains(m))&&f.preventDefault(),f.detail.originalEvent.type==="focusin"&&h.current&&f.preventDefault()}})},"DialogContentNonModal")),Y0=S.forwardRef(en(function(a,s){const{__scopeDialog:o,trapFocus:c,onOpenAutoFocus:h,onCloseAutoFocus:f,...m}=a,p=bn(rs,o);return Ff(),u.jsx(u.Fragment,{children:u.jsx(YA,{asChild:!0,loop:!0,trapped:c,onMountAutoFocus:h,onUnmountAutoFocus:f,children:u.jsx(UA,{role:"dialog",id:p.contentId,"aria-describedby":p.descriptionPresent?p.descriptionId:void 0,"aria-labelledby":p.titlePresent?p.titleId:void 0,"data-state":Zf(p.open),...m,ref:s,deferPointerDownOutside:!0,onDismiss:()=>p.onOpenChange(!1)})})})},"DialogContentImpl")),YD="DialogTitle",tf=S.forwardRef(en(function(a,s){const{__scopeDialog:o,...c}=a,h=bn(YD,o),{setTitleCount:f}=h;return vr(()=>(f(m=>m+1),()=>f(m=>m-1)),[f]),u.jsx(Xr.h2,{id:h.titleId,...c,ref:s})},"DialogTitle")),GD="DialogDescription",nf=S.forwardRef(en(function(a,s){const{__scopeDialog:o,...c}=a,h=bn(GD,o),{setDescriptionCount:f}=h;return vr(()=>(f(m=>m+1),()=>f(m=>m-1)),[f]),u.jsx(Xr.p,{id:h.descriptionId,...c,ref:s})},"DialogDescription")),PD="DialogClose",Uv=S.forwardRef(en(function(a,s){const{__scopeDialog:o,...c}=a,h=bn(PD,o);return u.jsx(Xr.button,{type:"button",...c,ref:s,onClick:pr(a.onClick,()=>h.onOpenChange(!1))})},"DialogClose"));function Zf(n){return n?"open":"closed"}en(Zf,"getState");function XD({onCreated:n,onBack:a,onCancel:s}){const[o,c]=S.useState(2),[h,f]=S.useState("日报任务"),[m,p]=S.useState("17:30"),[g,v]=S.useState(!1),[b,x]=S.useState("");async function j(){v(!0),x("");try{const E=await xe("daily.create",{name:h.trim(),sendTime:m});await n(E)}catch(E){x(E instanceof Error?E.message:String(E))}finally{v(!1)}}return u.jsxs(u.Fragment,{children:[u.jsx($D,{current:o}),b&&u.jsx("div",{className:"notice error",role:"alert",children:u.jsxs("div",{children:[u.jsx("strong",{children:"创建失败"}),u.jsx("span",{children:b})]})}),o===2?u.jsxs("div",{className:"automation-create-step",children:[u.jsxs("div",{children:[u.jsx("h3",{children:"基本信息"}),u.jsx("p",{children:"名称用于在自动化任务列表中识别这份日报。"})]}),u.jsxs("label",{children:["任务名称",u.jsx("input",{value:h,autoFocus:!0,onChange:E=>f(E.target.value)})]}),u.jsxs("div",{className:"dialog-actions",children:[u.jsxs("button",{className:"ghost",onClick:a,children:[u.jsx(ns,{}),"返回选择类型"]}),u.jsx("button",{className:"primary",disabled:!h.trim(),onClick:()=>c(3),children:"下一步"})]})]}):u.jsxs("div",{className:"automation-create-step",children:[u.jsxs("div",{children:[u.jsx("h3",{children:"日报必要配置"}),u.jsx("p",{children:"先确定每天的发送时间；消息字段和测试发送在创建后的专用 Tab 中完成。"})]}),u.jsxs("label",{children:["每天发送时间",u.jsx("input",{type:"time",value:m,onChange:E=>p(E.target.value)})]}),u.jsxs("div",{className:"automation-create-summary",children:[u.jsx("span",{children:"任务类型"}),u.jsx("strong",{children:"日报推送"}),u.jsx("span",{children:"创建后继续"}),u.jsx("strong",{children:"消息内容 → 预览与测试"})]}),u.jsxs("div",{className:"dialog-actions",children:[u.jsxs("button",{className:"ghost",disabled:g,onClick:()=>c(2),children:[u.jsx(ns,{}),"上一步"]}),u.jsx("button",{className:"secondary",disabled:g,onClick:s,children:"取消"}),u.jsxs("button",{className:"primary",disabled:g||!m,onClick:j,children:[g&&u.jsx(qa,{className:"spin"}),"创建任务"]})]})]})]})}function $D({current:n}){return u.jsxs("ol",{className:"automation-create-progress","aria-label":"新建任务进度",children:[u.jsx("li",{className:"done",children:"1 选择类型"}),u.jsx("li",{className:n===2?"current":"done",children:"2 基本信息"}),u.jsx("li",{className:n===3?"current":"",children:"3 必要配置"})]})}function FD({onCreated:n,onBack:a,onCancel:s}){const[o,c]=S.useState(2),[h,f]=S.useState("原材料入库自动填报"),[m,p]=S.useState(""),[g,v]=S.useState(""),[b,x]=S.useState(""),[j,E]=S.useState(!1),[C,A]=S.useState("");async function z(){E(!0),A("");try{const k=await xe("notionFill.create",{name:h.trim(),sourcePageUrl:m.trim(),username:g.trim(),password:b});await n(k)}catch(k){A(k instanceof Error?k.message:String(k))}finally{E(!1)}}return u.jsxs(u.Fragment,{children:[u.jsx(KD,{current:o}),C&&u.jsx("div",{className:"notice error",role:"alert",children:u.jsxs("div",{children:[u.jsx("strong",{children:"创建失败"}),u.jsx("span",{children:C})]})}),o===2?u.jsxs("div",{className:"automation-create-step",children:[u.jsxs("div",{children:[u.jsx("h3",{children:"基本信息"}),u.jsx("p",{children:"名称用于在自动化任务列表中识别这份填报任务。"})]}),u.jsxs("label",{children:["任务名称",u.jsx("input",{value:h,autoFocus:!0,onChange:k=>f(k.target.value)})]}),u.jsxs("div",{className:"dialog-actions",children:[u.jsxs("button",{className:"ghost",onClick:a,children:[u.jsx(ns,{}),"返回选择类型"]}),u.jsx("button",{className:"primary",disabled:!h.trim(),onClick:()=>c(3),children:"下一步"})]})]}):u.jsxs("div",{className:"automation-create-step",children:[u.jsxs("div",{children:[u.jsx("h3",{children:"93 系统连接"}),u.jsx("p",{children:"凭据只归 NotionFill 任务所有，并使用现有 Windows 加密存储。"})]}),u.jsxs("label",{children:["材料入库业务页面",u.jsx("input",{type:"url",value:m,placeholder:"http://服务器/业务页面",autoFocus:!0,onChange:k=>p(k.target.value)})]}),u.jsxs("label",{children:["93 系统用户名",u.jsx("input",{value:g,autoComplete:"username",onChange:k=>v(k.target.value)})]}),u.jsxs("label",{children:["93 系统密码",u.jsx("input",{type:"password",value:b,autoComplete:"new-password",onChange:k=>x(k.target.value)})]}),u.jsxs("div",{className:"automation-create-summary",children:[u.jsx("span",{children:"填报目标"}),u.jsx("strong",{children:"原材料入库数据库"}),u.jsx("span",{children:"执行时间"}),u.jsx("strong",{children:"每天 00:00 · 填报前一天"}),u.jsx("span",{children:"写入方式"}),u.jsx("strong",{children:"按日期查重，仅新增"})]}),u.jsxs("div",{className:"dialog-actions",children:[u.jsxs("button",{className:"ghost",disabled:j,onClick:()=>c(2),children:[u.jsx(ns,{}),"上一步"]}),u.jsx("button",{className:"secondary",disabled:j,onClick:s,children:"取消"}),u.jsxs("button",{className:"primary",disabled:j||!m.trim()||!g.trim()||!b,onClick:z,children:[j&&u.jsx(qa,{className:"spin"}),"创建任务"]})]})]})]})}function KD({current:n}){return u.jsxs("ol",{className:"automation-create-progress","aria-label":"新建任务进度",children:[u.jsx("li",{className:"done",children:"1 选择类型"}),u.jsx("li",{className:n===2?"current":"done",children:"2 基本信息"}),u.jsx("li",{className:n===3?"current":"",children:"3 必要配置"})]})}const G0=[{taskType:"daily_report",name:"日报推送",description:"查询日报数据、生成消息并发送钉钉。",renderCreate:n=>u.jsx(XD,{...n}),taskTabs:[{id:"configuration",label:"任务配置"},{id:"execution",label:"运行与测试"}],resolveSection:n=>n==="basics"?"basics":n==="template"?"configuration":"execution",issueTitle:n=>n==="notification"?"通知渠道未就绪":n==="template"?"日报配置尚未验证":"基本信息不完整",renderEditor:n=>u.jsx(Wx,{id:n.id,back:()=>n.navigate("list"),changed:n.changed,openSettings:n.openSettings}),loadRuns:n=>xe("daily.runs",{id:n}).then(({runs:a})=>a.map(s=>({id:s.id,time:s.time,source:s.source,status:s.status,title:s.textSummary||`业务日期 ${s.businessDate||"—"}`,details:[`业务日期：${s.businessDate||"—"}`,`阶段：${s.stage}`,`尝试：${s.attempts}`],error:s.error})))},{taskType:"notion_fill",name:"Notion 自动填报",description:"读取 93 系统前一天入库数据并新增到 Notion。",renderCreate:n=>u.jsx(FD,{...n}),taskTabs:[{id:"configuration",label:"任务配置"},{id:"execution",label:"运行与测试"}],resolveSection:n=>n==="basics"?"basics":n==="test"?"execution":"configuration",issueTitle:n=>n==="connection"?"93 系统连接未就绪":n==="target"?"Notion 填报目标未就绪":n==="test"?"任务尚未完成只读测试":"基本信息不完整",renderEditor:n=>u.jsx(Ix,{id:n.id,back:()=>n.navigate("list"),changed:n.changed,openSettings:n.openSettings}),loadRuns:n=>xe("notionFill.runs",{id:n}).then(({runs:a})=>a.map(s=>({id:s.id,time:s.time,source:s.source==="source-test"?"93读取测试":s.source==="test"?"只读测试":s.source==="manual"?"手动执行":"自动执行",status:s.status==="created"?"已新增":s.status==="checked"?"已检查":"失败",title:`${s.businessDate} · 板材 ${s.plateWeight.toLocaleString("zh-CN",{maximumFractionDigits:3})} 吨 · 型材 ${s.sectionWeight.toLocaleString("zh-CN",{maximumFractionDigits:3})} 吨`,details:[s.message].filter(Boolean),error:s.error})))}];function Hv(n){return G0.find(a=>a.taskType===n)}const cd=n=>({tone:"error",title:"操作失败",message:n instanceof Error?n.message:String(n)});function ZD({openSettings:n}){var N;const[a,s]=S.useState([]),[o,c]=S.useState(),[h,f]=S.useState(""),[m,p]=S.useState(""),[g,v]=S.useState(),[b,x]=S.useState(),[j,E]=S.useState(),[C,A]=S.useState(!1),[z,k]=S.useState(""),V=()=>xe("automation.list").then(M=>{const X=Array.isArray(M.tasks)?M.tasks:a;return s(X),c(F=>F&&(X.find(ne=>ne.taskType===F.taskType&&ne.id===F.id)||F)),X});S.useEffect(()=>{V().catch(M=>v(cd(M)))},[]),S.useEffect(()=>{if(!b)return;const M=()=>x(void 0),X=F=>F.key==="Escape"&&M();return window.addEventListener("pointerdown",M),window.addEventListener("keydown",X),window.addEventListener("blur",M),()=>{window.removeEventListener("pointerdown",M),window.removeEventListener("keydown",X),window.removeEventListener("blur",M)}},[b]);async function _(M,X){const F=await V();A(!1),k(""),c(F.find(ne=>ne.taskType===M&&ne.id===X.id))}async function L(M){p(M.id),v(void 0);try{const X=await xe("automation.setEnabled",{taskType:M.taskType,id:M.id,enabled:!M.isEnabled},6e4);X.missingStep?(f(X.missingStep),c(M),v({tone:"warning",title:"配置尚未完成",message:X.message||""})):await V()}catch(X){v(cd(X))}finally{p("")}}async function Y(M){if(!M.isEnabled){p(M.id);try{await xe("automation.delete",{taskType:M.taskType,id:M.id}),E(void 0),await V()}catch(X){v(cd(X))}finally{p("")}}}if(o){const M=Hv(o.taskType);if(M)return u.jsx(QD,{openSettings:n,task:o,definition:M,focusStep:h,notice:g,refresh:V,back:()=>{c(void 0),f(""),v(void 0),V()}})}return u.jsxs("div",{className:"page daily-page automation-list-page",children:[u.jsxs("header",{children:[u.jsxs("div",{children:[u.jsx("h1",{children:"自动化任务"}),u.jsx("p",{children:"管理定时推送与自动填报，查看任务配置和运行情况。"})]}),u.jsx("div",{className:"header-actions",children:u.jsxs("button",{className:"primary",onClick:()=>A(!0),children:[u.jsx(HC,{}),"新建任务"]})})]}),g&&u.jsx("div",{className:`notice ${g.tone}`,role:"status",children:u.jsxs("div",{children:[u.jsx("strong",{children:g.title}),u.jsx("span",{children:g.message})]})}),u.jsxs("section",{className:"daily-job-list","aria-label":"任务列表",children:[a.map(M=>u.jsxs("article",{className:`daily-job-card${["incomplete","pending-test","schedule-error"].includes(M.status)?" needs-attention":""}`,onClick:()=>c(M),onContextMenu:X=>{X.preventDefault(),x({task:M,x:Math.min(X.clientX,window.innerWidth-176),y:Math.min(X.clientY,window.innerHeight-58)})},children:[u.jsxs("div",{className:"job-copy",children:[u.jsx("h2",{children:u.jsx("button",{type:"button",className:"automation-task-name",onClick:X=>{X.stopPropagation(),c(M)},children:M.name||"未命名任务"})}),u.jsxs("p",{children:[M.taskTypeName," · ",M.schedule," · ",M.connectionStatus]})]}),u.jsxs("div",{className:"job-actions",onClick:X=>X.stopPropagation(),children:[u.jsx("span",{className:`job-status ${M.status}`,children:P0(M.status)}),u.jsxs("label",{className:"switch",children:[u.jsx("input",{type:"checkbox","aria-label":`启用${M.name||"未命名任务"}`,checked:M.isEnabled,disabled:!M.schedulingAvailable||m===M.id,title:M.schedulingAvailable?void 0:"Development 环境默认不启用定时任务",onChange:()=>L(M)}),u.jsx("span",{})]}),u.jsx("button",{type:"button",className:"automation-task-more","aria-label":`${M.name||"未命名任务"}的更多操作`,"aria-haspopup":"menu",onClick:X=>{const F=X.currentTarget.getBoundingClientRect();x({task:M,x:Math.min(F.left,window.innerWidth-176),y:Math.min(F.bottom+4,window.innerHeight-58)})},children:u.jsx(BC,{})})]}),u.jsxs("div",{className:"automation-card-footer",children:["最近运行：",M.lastRun]})]},`${M.taskType}:${M.id}`)),!a.length&&u.jsxs("div",{className:"empty-state",children:[u.jsx(LC,{}),u.jsx("h2",{children:"还没有自动化任务"}),u.jsx("p",{children:"选择一种任务类型，新建后进入对应的专用配置界面。"})]})]}),!!a.length&&u.jsx("p",{className:"automation-list-help",children:"点击任务名称进入配置。日报配置通知后即可开启，执行结果见运行记录。"}),b&&u.jsx("div",{className:"job-context-menu",role:"menu",style:{left:b.x,top:b.y},onPointerDown:M=>M.stopPropagation(),children:u.jsxs("button",{className:"danger-quiet",role:"menuitem",disabled:b.task.isEnabled||m===b.task.id,onClick:()=>{E(b.task),x(void 0)},children:[u.jsx($C,{}),b.task.isEnabled?"停用后可删除":"删除任务"]})}),u.jsx(Qd,{open:!!j,onOpenChange:M=>!M&&E(void 0),children:u.jsxs(Jd,{children:[u.jsx(Id,{className:"dialog-overlay"}),u.jsxs(ef,{className:"dialog",children:[u.jsx(tf,{children:"删除自动化任务？"}),u.jsxs(nf,{children:["将删除“",j==null?void 0:j.name,"”及其业务记录，此操作无法撤销。"]}),u.jsxs("div",{className:"dialog-actions",children:[u.jsx("button",{className:"secondary",onClick:()=>E(void 0),children:"取消"}),u.jsx("button",{className:"danger",disabled:!!m,onClick:()=>j&&Y(j),children:"确认删除"})]})]})]})}),u.jsx(Qd,{open:C,onOpenChange:M=>{A(M),M||k("")},children:u.jsxs(Jd,{children:[u.jsx(Id,{className:"dialog-overlay"}),u.jsxs(ef,{className:"dialog automation-create-dialog",children:[u.jsx(tf,{children:"新建自动化任务"}),u.jsx(nf,{children:z?"填写任务信息，创建后可随时通过 Tab 修改。":"先选择任务类型，后续配置由对应任务自己提供。"}),z?(N=Hv(z))==null?void 0:N.renderCreate({onCreated:M=>_(z,M),onBack:()=>k(""),onCancel:()=>{A(!1),k("")}}):u.jsx("div",{className:"automation-create-types",children:G0.map(M=>u.jsxs("button",{onClick:()=>k(M.taskType),children:[u.jsx("strong",{children:M.name}),u.jsx("span",{children:M.description})]},M.taskType))})]})]})})]})}function QD({openSettings:n,task:a,definition:s,focusStep:o,notice:c,refresh:h,back:f}){const[m,p]=S.useState(o?s.resolveSection(o):"basics"),g=a.taskType==="daily_report",[v,b]=S.useState(),[x,j]=S.useState(""),[E,C]=S.useState(!1),A=[{id:"basics",label:"基本信息"},...s.taskTabs,{id:"runs",label:"运行记录"}],z=[...a.missingMessage?[{id:`configuration:${a.missingStep||"unknown"}`,title:s.issueTitle(a.missingStep||""),message:a.missingMessage,section:s.resolveSection(a.missingStep||"")}]:[],...a.status==="schedule-error"&&a.schedulerMessage?[{id:"scheduler",title:"计划任务异常",message:a.schedulerMessage,section:"basics"}]:[]];async function k(){C(!0),j("");try{b(await s.loadRuns(a.id))}catch(_){j(_ instanceof Error?_.message:String(_))}finally{C(!1)}}S.useEffect(()=>{m==="runs"&&v===void 0&&k()},[m,v]);function V(_,L){var N;if(_.key!=="ArrowLeft"&&_.key!=="ArrowRight")return;_.preventDefault();const Y=(L+(_.key==="ArrowRight"?1:-1)+A.length)%A.length;p(A[Y].id),A[Y].id==="basics"&&h().catch(()=>{}),(N=document.getElementById(`automation-tab-${A[Y].id}`))==null||N.focus()}return g?u.jsx(Wx,{id:a.id,back:f,changed:h,openSettings:n}):a.taskType==="notion_fill"?u.jsx(Ix,{id:a.id,back:f,changed:h,openSettings:n}):u.jsxs("div",{className:"page daily-page automation-detail",children:[u.jsxs("header",{children:[u.jsxs("div",{children:[u.jsxs("button",{className:"back-link","aria-label":"返回任务列表",onClick:f,children:[u.jsx(ns,{}),"返回任务列表"]}),u.jsx("h1",{title:a.name||"未命名任务",children:a.name||"未命名任务"}),u.jsxs("p",{children:[a.taskTypeName," · ",a.schedule]})]}),u.jsx("span",{className:`job-status ${a.status}`,children:P0(a.status)})]}),u.jsx("div",{className:"automation-tabs",role:"tablist","aria-label":"任务详情",children:A.map((_,L)=>u.jsx("button",{type:"button",role:"tab",id:`automation-tab-${_.id}`,"aria-selected":m===_.id,"aria-controls":`automation-panel-${_.id}`,tabIndex:m===_.id?0:-1,onClick:()=>{p(_.id),_.id==="basics"&&h().catch(()=>{})},onKeyDown:Y=>V(Y,L),children:_.label},_.id))}),u.jsxs("div",{children:[c&&u.jsx("div",{className:`notice ${c.tone}`,role:"status",children:u.jsxs("div",{children:[u.jsx("strong",{children:c.title}),u.jsx("span",{children:c.message})]})}),!!z.length&&u.jsxs("section",{className:"automation-issues","aria-labelledby":"automation-issues-title",children:[u.jsxs("div",{className:"automation-issues-heading",children:[u.jsx(FC,{}),u.jsxs("div",{children:[u.jsx("h2",{id:"automation-issues-title",children:"配置问题"}),u.jsx("p",{children:"完成以下项目后才能安全启用任务。"})]}),u.jsxs("span",{children:[z.length," 项"]})]}),u.jsx("ul",{children:z.map(_=>{var L;return u.jsxs("li",{children:[u.jsxs("div",{children:[u.jsx("strong",{children:_.title}),u.jsx("span",{children:_.message})]}),u.jsxs("button",{type:"button",onClick:()=>{p(_.section)},children:["前往",((L=A.find(Y=>Y.id===_.section))==null?void 0:L.label)||"处理",u.jsx(kC,{})]})]},_.id)})})]}),u.jsxs("div",{className:"automation-tab-panel",role:"tabpanel",id:`automation-panel-${m}`,"aria-labelledby":`automation-tab-${m}`,children:[u.jsx("div",{hidden:m==="runs",children:s.renderEditor({id:a.id,section:m,openSettings:n,navigate:p,changed:()=>{h().catch(()=>{})}})}),m==="runs"&&u.jsxs("section",{className:"surface automation-runs",children:[u.jsxs("div",{className:"automation-runs-heading",children:[u.jsxs("div",{children:[u.jsx("h2",{children:"运行记录"}),u.jsx("p",{children:"查看任务执行结果和错误详情。"})]}),u.jsxs("button",{className:"secondary",disabled:E,onClick:k,children:[E?u.jsx(qa,{className:"spin"}):u.jsx(qC,{}),"刷新"]})]}),x&&u.jsx("div",{className:"notice error",role:"alert",children:u.jsxs("div",{children:[u.jsx("strong",{children:"运行记录读取失败"}),u.jsx("span",{children:x})]})}),u.jsx("div",{className:"automation-run-list",children:v==null?void 0:v.map(_=>u.jsxs("details",{children:[u.jsxs("summary",{children:[u.jsx("span",{children:_.time}),u.jsx("span",{children:_.source}),u.jsx("strong",{children:_.title}),u.jsx("b",{className:_.error?"error-text":"",children:_.status})]}),u.jsxs("div",{children:[_.details.map(L=>u.jsx("p",{children:L},L)),_.error&&u.jsxs("p",{className:"run-error",children:["错误：",_.error]})]})]},_.id))}),!E&&v&&!v.length&&u.jsx("p",{className:"automation-empty",children:"暂无运行记录"})]})]})]})]})}function P0(n){return{incomplete:"配置未完成","pending-test":"待测试",ready:"可启用",enabled:"已启用","schedule-error":"计划异常"}[n]||n}function JD(n){const a=n-5;return Array.from({length:12},(s,o)=>a+o)}function WD(n,a){const s=new Date(n,a,1),o=new Date(n,a,1-s.getDay());return Array.from({length:42},(c,h)=>{const f=new Date(o.getFullYear(),o.getMonth(),o.getDate()+h);return{date:X0(f),day:f.getDate(),currentMonth:f.getMonth()===a}})}function X0(n){const a=n.getFullYear(),s=String(n.getMonth()+1).padStart(2,"0"),o=String(n.getDate()).padStart(2,"0");return`${a}-${s}-${o}`}function qv(n){const[a,s,o]=n.split("-").map(Number),c=new Date(a,s-1,o);return a&&s&&o&&c.getFullYear()===a&&c.getMonth()===s-1&&c.getDate()===o?c:new Date}function hr({value:n,options:a,placeholder:s,disabled:o,ariaLabel:c,onChange:h}){const[f,m]=S.useState(!1),p=qx(),g=a.find(v=>v.value===n);return u.jsxs("div",{className:"form-picker",children:[u.jsxs("button",{type:"button",className:`picker-trigger ${f?"open":""}`,disabled:o,"aria-label":c,"aria-haspopup":"listbox","aria-expanded":f,onClick:()=>m(!f),children:[u.jsx("span",{className:g?"":"picker-placeholder",children:(g==null?void 0:g.label)||s}),u.jsx(zC,{})]}),f&&u.jsxs(u.Fragment,{children:[u.jsx("button",{type:"button",className:"picker-backdrop","aria-label":"关闭选项",onClick:()=>m(!1)}),u.jsxs(Lf.div,{className:"picker-popover choice-popover",role:"listbox",initial:p?!1:{opacity:0,y:-5},animate:{opacity:1,y:0,transitionEnd:{transform:"none"}},transition:{duration:p?0:.12},children:[a.map(v=>u.jsxs("button",{type:"button",role:"option","aria-selected":v.value===n,className:v.value===n?"selected":"",onClick:()=>{h(v.value),m(!1)},children:[u.jsx("span",{children:v.label}),v.value===n&&u.jsx(us,{})]},v.value)),!a.length&&u.jsx("span",{className:"picker-empty",children:"暂无可选项"})]})]})]})}function ud({value:n,onChange:a}){const s=qv(n),[o,c]=S.useState(!1),[h,f]=S.useState("days"),[m,p]=S.useState(()=>new Date(s.getFullYear(),s.getMonth(),1)),g=WD(m.getFullYear(),m.getMonth()),v=JD(m.getFullYear()),b=X0(new Date),x=C=>{a(C),c(!1);const A=qv(C);p(new Date(A.getFullYear(),A.getMonth(),1))},j=()=>{const C=!o;c(C),f("days"),C&&p(new Date(s.getFullYear(),s.getMonth(),1))},E=C=>p(h==="days"?new Date(m.getFullYear(),m.getMonth()+C,1):new Date(m.getFullYear()+C*(h==="years"?12:1),m.getMonth(),1));return u.jsxs("div",{className:"date-picker",children:[u.jsxs("button",{type:"button",className:`date-trigger ${o?"open":""}`,"aria-haspopup":"dialog","aria-expanded":o,onClick:j,children:[u.jsx("span",{children:n?n.replaceAll("-","/"):"选择日期"}),u.jsx(RC,{})]}),o&&u.jsxs(u.Fragment,{children:[u.jsx("button",{type:"button",className:"date-backdrop","aria-label":"关闭日期选择器",onClick:()=>c(!1)}),u.jsxs(Lf.div,{className:"calendar-popover",role:"dialog","aria-label":"选择日期",initial:{opacity:0,y:-6},animate:{opacity:1,y:0,transitionEnd:{transform:"none"}},transition:{duration:.14},children:[u.jsxs("div",{className:"calendar-head",children:[u.jsx("button",{type:"button","aria-label":"上一页",onClick:()=>E(-1),children:u.jsx(Gx,{})}),u.jsx("button",{type:"button",className:"calendar-title",onClick:()=>f(C=>C==="days"?"months":"years"),children:h==="years"?`${v[0]}–${v[11]} 年`:`${m.getFullYear()} 年${h==="days"?` ${m.getMonth()+1} 月`:""}`}),u.jsx("button",{type:"button","aria-label":"下一页",onClick:()=>E(1),children:u.jsx(Px,{})})]}),h==="days"?u.jsxs(u.Fragment,{children:[u.jsx("div",{className:"weekdays",children:["日","一","二","三","四","五","六"].map(C=>u.jsx("span",{children:C},C))}),u.jsx("div",{className:"calendar-grid",children:g.map(C=>u.jsx("button",{type:"button",className:`${C.currentMonth?"":"outside"} ${C.date===n?"selected":""} ${C.date===b?"today":""}`,onClick:()=>x(C.date),children:C.day},C.date))})]}):h==="months"?u.jsx("div",{className:"month-grid",children:Array.from({length:12},(C,A)=>u.jsxs("button",{type:"button",className:s.getFullYear()===m.getFullYear()&&s.getMonth()===A?"selected":"",onClick:()=>{p(new Date(m.getFullYear(),A,1)),f("days")},children:[A+1," 月"]},A))}):u.jsx("div",{className:"month-grid year-grid",children:v.map(C=>u.jsx("button",{type:"button",className:s.getFullYear()===C?"selected":"",onClick:()=>{p(new Date(C,m.getMonth(),1)),f("months")},children:C},C))}),u.jsx("div",{className:"calendar-footer",children:u.jsx("button",{type:"button",onClick:()=>x(b),children:"今天"})})]})]})]})}function Yv({value:n,onChange:a,unit:s,className:o="",disabled:c,ariaLabel:h,onKeyDown:f}){return u.jsxs("div",{className:`numeric-input ${o}`.trim(),children:[u.jsx("input",{type:"text",inputMode:"decimal",value:n,disabled:c,"aria-label":h,onChange:m=>a(m.target.value),onKeyDown:f}),s&&u.jsx("span",{children:s})]})}function $0({current:n,titles:a,label:s}){const o=a.map((c,h)=>({number:h+1,title:c}));return u.jsx("div",{className:"step-bar","aria-label":s,children:o.map((c,h)=>{const f=c.number<n?"done":c.number===n?"active":"pending";return u.jsxs(S.Fragment,{children:[u.jsxs("div",{className:`step step-${f}`,"aria-current":f==="active"?"step":void 0,children:[u.jsx("div",{className:`step-circle ${f}`,children:f==="done"?u.jsx(us,{}):c.number}),u.jsx("span",{children:c.title})]}),h<o.length-1&&u.jsx("div",{className:`step-line ${c.number<n?"done":c.number===n?"transition":"pending"}`})]},c.number)})})}const Gv={configured:!1,binding:{bound:!1,name:"",path:""},usesBusinessSections:!1,businessSections:[],sources:[],selected:""};function ID(){const n=new Date;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`}function eN({openSettings:n}){const[a,s]=S.useState(1),[o,c]=S.useState(ID),[h,f]=S.useState(""),[m,p]=S.useState([]),[g,v]=S.useState(Gv),[b,x]=S.useState(!1),[j,E]=S.useState("database"),[C,A]=S.useState(""),[z,k]=S.useState(""),[V,_]=S.useState(!1),[L,Y]=S.useState("state"),[N,M]=S.useState(""),[X,F]=S.useState(""),[ne,ie]=S.useState(),pe=S.useRef(!1),le=S.useRef(!1);S.useEffect(()=>{xe("weld.getState").then(Q=>{var ee;const ue=Q!=null&&Q.binding&&Array.isArray(Q.sources)?Q:Gv;v(ue),A(((ee=ue.sources.find(he=>he.id===ue.selected))==null?void 0:ee.businessSection)||""),k(ue.selected)}).catch(Q=>M(Q instanceof Error?Q.message:"读取 Notion 配置失败")).finally(()=>Y(void 0))},[]);const ve=/^\d+$/.test(h)&&Number(h)>0,U=S.useMemo(()=>m.reduce((Q,ue)=>Q+Number(ue.qty||0),0),[m]),se=U-Number(h||0),K=m.length>0&&m.every(Q=>/^\d+$/.test(Q.qty))&&se===0,G=g.usesBusinessSections?g.sources.filter(Q=>Q.businessSection===C):g.sources,te=L==="generate"||L==="check"||L==="write";async function T(){if(!(!ve||te)){Y("generate"),M("");try{const Q=await xe("weld.generate",{month:o,total:h});p(Q.map(ue=>({...ue,qty:String(ue.qty)}))),s(2)}catch(Q){M(Q instanceof Error?Q.message:"拆分失败")}finally{Y(void 0)}}}function R(Q,ue){ue!==""&&!/^\d+$/.test(ue)||p(ee=>ee.map((he,Ce)=>Ce===Q?{...he,qty:ue}:he))}async function W(){if(z){Y("binding"),M("");try{const Q=await xe("weld.saveBinding",{sourceId:z});v(Q),k(Q.selected),x(!1)}catch(Q){M(Q instanceof Error?Q.message:"绑定失败")}finally{Y(void 0)}}}async function ae(){if(!K||!g.binding.bound||te||pe.current)return;pe.current=!0,Y("check"),M("");const Q={month:o,total:h,rows:m.map(ue=>({date:ue.date,qty:ue.qty}))};try{if((await xe("weld.check",Q,12e4)).hasExistingData){_(!0);return}await oe(Q,!1)}catch(ue){M(ue instanceof Error?ue.message:"Notion 数据检查失败")}finally{pe.current=!1,Y(ue=>ue==="check"?void 0:ue)}}async function oe(Q,ue){if(!le.current){le.current=!0,Y("write"),M(""),ie(void 0);try{const ee=await xe("weld.write",{...Q,overwriteExisting:ue},12e4,he=>ie(he));F(ee.message),_(!1),s(3)}catch(ee){M(ee instanceof Error?ee.message:"写入 Notion 失败")}finally{le.current=!1,Y(void 0)}}}function fe(){s(1),p([]),f(""),F(""),M(""),ie(void 0)}function ye(){M(""),E("database"),x(!0)}const re={month:o,total:h,rows:m.map(Q=>({date:Q.date,qty:Q.qty}))};return u.jsx("div",{className:"app-shell",children:u.jsxs("main",{className:"main-content",children:[u.jsxs("header",{className:"content-header",children:[u.jsxs("div",{children:[u.jsx("h1",{children:"月度焊接计划拆分"}),u.jsx("p",{children:"按自然日模拟产量浮动，确认后写入 Notion 焊接数据库"})]}),u.jsx("button",{type:"button",className:"template-config-button",disabled:L==="state",onClick:ye,children:"焊接设置"})]}),u.jsxs("div",{className:"production-message-scroll daily-weld-page",children:[u.jsx($0,{current:a,titles:["录入计划","拆分预览","完成"],label:"焊接计划拆分进度"}),N&&u.jsx("div",{className:"weld-notice error",role:"alert",children:N}),a===1&&u.jsxs("section",{className:"weld-plan-card","aria-labelledby":"weld-plan-title",children:[u.jsxs("div",{className:"weld-section-heading",children:[u.jsx("h2",{id:"weld-plan-title",children:"计划信息"}),u.jsx("p",{children:"输入本月计划焊接总量，下一步将生成每日拆分预览。"})]}),u.jsxs("div",{className:"weld-fields",children:[u.jsx(Ya,{label:"计划月份",value:o,selectionMode:"month",disabled:te,onChange:c}),u.jsxs("label",{className:"weld-field",children:[u.jsx("span",{children:"计划焊接总量（吨）"}),u.jsx(Yv,{value:h,disabled:te,onChange:Q=>{(Q===""||/^\d+$/.test(Q))&&f(Q)},unit:"吨",ariaLabel:"计划焊接总量"})]})]}),u.jsxs("div",{className:"weld-method-note",children:[u.jsx("strong",{children:"按自然日分配 · 模拟真实产量浮动"}),u.jsx("span",{children:"工作日与周末采用不同权重，并叠加波动；每日取整后自动配平至计划总量。"})]}),u.jsx("div",{className:"weld-actions",children:u.jsx("button",{type:"button",className:"primary-button",disabled:!ve||te,onClick:T,children:L==="generate"?"正在拆分…":"下一步：拆分预览"})})]}),a===2&&u.jsxs("section",{className:"weld-preview","aria-labelledby":"weld-preview-title",children:[u.jsxs("div",{className:"weld-preview-heading",children:[u.jsxs("div",{children:[u.jsxs("h2",{id:"weld-preview-title",children:[o.replace("-"," 年 ")," 月每日拆分详情"]}),u.jsx("p",{children:"可直接修改任意一天的数值；不满意本次浮动效果可重新模拟。"})]}),u.jsxs("button",{type:"button",className:"secondary",disabled:te,onClick:T,children:[u.jsx(Xx,{}),"重新模拟浮动"]})]}),u.jsx("div",{className:"weld-table-wrap",children:u.jsxs("table",{children:[u.jsx("thead",{children:u.jsxs("tr",{children:[u.jsx("th",{children:"日期"}),u.jsx("th",{children:"星期"}),u.jsx("th",{children:"类型"}),u.jsx("th",{children:"计划量（吨）"})]})}),u.jsx("tbody",{children:m.map((Q,ue)=>u.jsxs("tr",{children:[u.jsx("td",{children:Q.date}),u.jsx("td",{children:Q.weekday}),u.jsx("td",{children:u.jsx("span",{className:`weld-day-pill ${Q.isWeekend?"weekend":""}`,children:Q.isWeekend?"休息日":"工作日"})}),u.jsx("td",{children:u.jsx(Yv,{value:Q.qty,disabled:te,onChange:ee=>R(ue,ee),unit:"吨",ariaLabel:`${Q.date} 计划量`})})]},Q.date))})]})}),u.jsxs("div",{className:"weld-summary",children:[u.jsxs("span",{children:["共 ",m.length," 天 · 计划总量 ",u.jsx("strong",{children:h})," 吨"]}),u.jsxs("span",{children:["拆分合计 ",u.jsx("strong",{children:U})," 吨 ",se===0?u.jsx("em",{className:"match",children:"与计划总量一致"}):u.jsxs("em",{className:"mismatch",children:["偏差 ",se>0?"+":"",se," 吨，可手动调整"]})]})]}),L==="write"&&u.jsx("div",{className:"weld-write-progress",role:"status","aria-live":"polite",children:ne?`正在写入 ${ne.date.slice(0,10)}（${ne.current}/${ne.total}）`:"正在准备 Notion 层级数据…"}),u.jsxs("div",{className:"weld-actions split",children:[u.jsx("button",{type:"button",className:"secondary",disabled:te,onClick:()=>s(1),children:"返回修改"}),u.jsx("button",{type:"button",className:"primary-button",disabled:!K||!g.binding.bound||te,onClick:ae,children:L==="check"?"正在检查…":L==="write"?"正在写入…":"确认并写入 Notion"})]})]}),a===3&&u.jsxs("section",{className:"complete-view weld-complete",children:[u.jsx("div",{className:"complete-icon",children:u.jsx(us,{})}),u.jsx("h2",{children:"入库完成"}),u.jsx("p",{children:X||`${o} 共 ${m.length} 天的焊接计划数据已写入 Notion。`}),u.jsx("button",{className:"primary-button",onClick:fe,children:"拆分下一个月"})]})]}),b&&u.jsx("div",{className:"weld-settings-overlay",children:u.jsxs("section",{className:"weld-settings-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"weld-settings-title",children:[u.jsxs("aside",{className:"weld-settings-nav",children:[u.jsx("h2",{id:"weld-settings-title",children:"焊接设置"}),u.jsxs("nav",{"aria-label":"焊接设置分类",children:[u.jsxs("button",{type:"button",className:j==="rules"?"active":"",onClick:()=>E("rules"),children:[u.jsx(XC,{}),"拆分规则"]}),u.jsxs("button",{type:"button",className:j==="database"?"active":"",onClick:()=>E("database"),children:[u.jsx(Ud,{}),"数据库绑定"]})]})]}),u.jsxs("div",{className:"weld-settings-main",children:[u.jsx("button",{type:"button",className:"weld-settings-close","aria-label":"关闭焊接设置",disabled:L==="binding",onClick:()=>x(!1),children:u.jsx($x,{})}),j==="rules"?u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"weld-settings-heading",children:[u.jsx("h3",{children:"拆分规则"}),u.jsx("p",{children:"当前规则用于生成每日焊接计划，修改每日数值后仍需保证月度合计一致。"})]}),u.jsxs("dl",{className:"weld-rule-list",children:[u.jsxs("div",{children:[u.jsx("dt",{children:"分配周期"}),u.jsx("dd",{children:"按所选月份的全部自然日"})]}),u.jsxs("div",{children:[u.jsx("dt",{children:"产量浮动"}),u.jsx("dd",{children:"基准量叠加 22% 随机波动"})]}),u.jsxs("div",{children:[u.jsx("dt",{children:"周末权重"}),u.jsx("dd",{children:"周六、周日自动降低计划权重"})]}),u.jsxs("div",{children:[u.jsx("dt",{children:"总量配平"}),u.jsx("dd",{children:"每日取整后自动配平至月度计划"})]})]})]}):u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"weld-settings-heading",children:[u.jsx("h3",{children:"数据库绑定"}),u.jsx("p",{children:"每项业务只绑定一个主写入数据库，汇总数据库由系统自动维护。"})]}),N&&u.jsx("div",{className:"weld-notice error",role:"alert",children:N}),u.jsxs("section",{className:"weld-business-binding","aria-labelledby":"weld-business-title",children:[u.jsxs("div",{className:"weld-business-title",children:[u.jsxs("div",{children:[u.jsx("h4",{id:"weld-business-title",children:"焊接业务"}),u.jsx("p",{children:"每日焊接计划的主写入数据库"})]}),u.jsx("span",{className:g.binding.bound?"bound":"",children:g.binding.bound?"已绑定":"未绑定"})]}),!g.configured||!g.sources.length?u.jsx("div",{className:"weld-notice",children:"请先在系统设置中完成数据库连接并刷新数据源。"}):u.jsxs("div",{className:"weld-dialog-field",children:[g.usesBusinessSections&&u.jsxs(u.Fragment,{children:[u.jsx("span",{children:"业务板块"}),u.jsx(hr,{value:C,options:g.businessSections.map(Q=>({value:Q,label:Q})),placeholder:"选择焊接业务板块",ariaLabel:"焊接业务板块",disabled:L==="binding",onChange:Q=>{A(Q),k("")}})]}),u.jsx("span",{children:"主写入数据库"}),u.jsx(hr,{value:z,options:G.map(Q=>({value:Q.id,label:Q.name})),placeholder:"选择每日焊接量数据库",ariaLabel:"焊接业务主写入数据库",disabled:g.usesBusinessSections&&!C||L==="binding",onChange:k})]}),u.jsx("p",{className:"weld-binding-help",children:"月度和周度汇总数据库由系统在写入时自动维护，无需单独绑定。"})]}),u.jsxs("div",{className:"weld-settings-actions",children:[u.jsx("button",{type:"button",disabled:L==="binding",onClick:()=>x(!1),children:"取消"}),!g.configured||!g.sources.length?u.jsx("button",{type:"button",className:"primary-button",onClick:n,children:"前往系统设置"}):u.jsx("button",{type:"button",className:"primary-button",disabled:!z||L==="binding",onClick:W,children:L==="binding"?"正在检测…":"保存绑定"})]})]})]})]})}),V&&u.jsx("div",{className:"pm-dialog-overlay",children:u.jsxs("section",{className:"pm-dialog weld-confirm-dialog",role:"alertdialog","aria-modal":"true","aria-labelledby":"weld-overwrite-title",children:[u.jsx("h2",{id:"weld-overwrite-title",children:"确认覆盖已有产量"}),u.jsxs("p",{children:[o," 已存在产量数据。继续后将按本次拆分结果覆盖该月每日产量，并更新月、周、日关联。"]}),N&&u.jsx("div",{className:"weld-notice error",role:"alert",children:N}),L==="write"&&u.jsx("div",{className:"weld-write-progress",role:"status","aria-live":"polite",children:ne?`正在写入 ${ne.date.slice(0,10)}（${ne.current}/${ne.total}）`:"正在准备 Notion 层级数据…"}),u.jsxs("div",{className:"pm-dialog-actions",children:[u.jsx("button",{type:"button",disabled:L==="write",onClick:()=>_(!1),children:"取消"}),u.jsx("button",{type:"button",className:"primary-button",disabled:L==="write",onClick:()=>oe(re,!0),children:L==="write"?"正在写入…":"确认覆盖并写入"})]})]})})]})})}const F0=[{category:"数据文件处理",name:"挂网计划 PDF 导出"},{category:"数据文件处理",name:"生产会资料拆分"},{category:"数据文件处理",name:"文件统计汇总"},{category:"数据同步",name:"每日焊接数据模拟"},{category:"数据同步",name:"生产消息 Notion 入库"},{category:"数据同步",name:"数据库查看"},{category:"自动化",name:"自动化任务"}],tN=[...new Set(F0.map(n=>n.category))];function nN(n){switch(n){case"挂网计划 PDF 导出":return"plan-pdf";case"生产会资料拆分":return"production-meeting";case"每日焊接数据模拟":return"daily-weld";case"生产消息 Notion 入库":return"production-message";case"数据库查看":return"database-viewer";case"文件统计汇总":return"report-center";case"自动化任务":return"daily-report";default:return"plan-pdf"}}function rN({active:n,navigate:a,openSettings:s}){return u.jsxs("aside",{className:"sidebar",children:[u.jsx("div",{className:"sidebar-top",children:u.jsx("div",{className:"sidebar-brand",children:"生产助手"})}),u.jsx("nav",{className:"sidebar-nav","aria-label":"业务模块",children:tN.map(o=>u.jsxs("section",{className:"sidebar-section",children:[u.jsx("div",{className:"sidebar-section-label",children:o}),F0.filter(c=>c.category===o).map(c=>{const h=nN(c.name),f=h===n;return u.jsxs("button",{className:`sidebar-item ${f?"sidebar-item-active":""}`,"aria-current":f?"page":void 0,onClick:()=>a(h),children:[u.jsx(Pv,{name:c.name}),u.jsx("span",{children:c.name})]},c.name)})]},o))}),u.jsx("div",{className:"sidebar-bottom",children:u.jsxs("button",{className:"sidebar-item","aria-haspopup":"dialog",onClick:s,children:[u.jsx(Pv,{name:"设置"}),u.jsx("span",{children:"设置"})]})})]})}function Pv({name:n}){return n==="挂网计划 PDF 导出"||n==="生产会资料拆分"?u.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[u.jsx("path",{className:"folder-lid",d:"M3.5 7h6l1.8 2h9.2"}),u.jsx("path",{d:"M4.2 7h15.6l-1.3 11H5.5L4.2 7Z"})]}):n==="每日焊接数据模拟"||n==="自动化任务"?u.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[u.jsx("rect",{x:"5",y:"4.5",width:"14",height:"15",rx:"2"}),u.jsx("path",{d:"M8 3v3M16 3v3M5 9h14"}),u.jsx("path",{className:"daily-check",d:"m8.5 14 2 2 4.5-4.5"})]}):n==="生产消息 Notion 入库"?u.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[u.jsx("path",{d:"M4 14.5 6.2 6h11.6l2.2 8.5V19H4v-4.5Z"}),u.jsx("path",{className:"inbox-tray",d:"M4.3 14h4.1l1.2 2h4.8l1.2-2h4.1"}),u.jsx("path",{className:"inbox-arrow",d:"M12 5v7m-2.5-2.5L12 12l2.5-2.5"})]}):n==="数据库查看"?u.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[u.jsx("ellipse",{cx:"12",cy:"6",rx:"7",ry:"3"}),u.jsx("path",{d:"M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"})]}):n==="文件统计汇总"?u.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[u.jsx("path",{d:"M4.5 19h15"}),u.jsx("rect",{className:"report-bar report-bar-one",x:"6",y:"12",width:"2.5",height:"6",rx:"0.5"}),u.jsx("rect",{className:"report-bar report-bar-two",x:"10.75",y:"8",width:"2.5",height:"10",rx:"0.5"}),u.jsx("rect",{className:"report-bar report-bar-three",x:"15.5",y:"5",width:"2.5",height:"13",rx:"0.5"})]}):u.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[u.jsx("circle",{cx:"12",cy:"12",r:"3"}),u.jsx("path",{className:"settings-ring",d:"M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M18 6l-1.4 1.4M7.4 16.6 6 18"})]})}const Xv=new Set(["raw_message","message_type","parser_version","unit"]),aN=new Set(["piece_count","weight","sheet_in_stock","profile_in_stock","cutting","welding","daily_output","monthly_output","yearly_output","monthly_reference","output_sections"]),iN=/(公斤|千克|kg|吨|t|张|件|套|节|台|米|m)$/i,sN={piece_count:"张",weight:"吨",sheet_in_stock:"吨",profile_in_stock:"吨",cutting:"吨",welding:"吨",daily_output:"套",output_sections:"节"};function dd(){const n=new Date;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`}function Pi(n){return n instanceof Error?n.message:String(n)}function rf(n,a=""){const s=n.trim().match(iN);return{value:s?n.trim().slice(0,-s[0].length).trim():n,unit:(s==null?void 0:s[0])||a}}function oN(n,a){return n.trim()?`${n}${a}`:""}function lN(n,a){const s=rf(a).value.trim(),o=rf(n.databaseValue).value.trim(),c=n.propertyType==="number"&&!Number.isFinite(Number(s.replaceAll(",",""))),h=!s||c?"exception":o?n.propertyType==="number"?Number(s.replaceAll(",",""))===Number(o.replaceAll(",",""))?"same":"confirm":s===o?"same":"confirm":"new";return{...n,parsedValue:a,status:h,message:h==="exception"?`${n.name}的输入值无效`:h==="confirm"?"与数据库现值不同":""}}function cN(n){return{new:"新增",same:"一致",confirm:"待确认",exception:"异常",unchecked:"待检查"}[n]||"异常"}function uN(){const[n,a]=S.useState(""),[s,o]=S.useState(""),[c,h]=S.useState([]),[f,m]=S.useState(),[p,g]=S.useState(),[v,b]=S.useState(),[x,j]=S.useState(""),[E,C]=S.useState({}),[A,z]=S.useState(!1),[k,V]=S.useState(),[_,L]=S.useState(""),[Y,N]=S.useState([]),[M,X]=S.useState({}),[F,ne]=S.useState(!1),[ie,pe]=S.useState({cutting:"",towerDaily:""}),le=c.length>0,ve=le&&n!==s,U=!!f;S.useEffect(()=>{xe("production.getBindings").then(re=>{V(re),pe({cutting:re.selected.cutting||"",towerDaily:re.selected.towerDaily||""})}).catch(re=>L(Pi(re)))},[]);async function se(){L("");try{await xe("production.saveBindings",ie,12e4);const re=await xe("production.getBindings");V(re),ne(!1)}catch(re){L(Pi(re))}}async function K(re){m("check"),j(""),C({});try{const Q=await xe("production.check",{drafts:re,defaultDate:dd()});g(Q)}catch(Q){j(Pi(Q))}finally{m(void 0)}}async function G(){if(!(!n.trim()||U)){m("parse"),j(""),z(!1),b(void 0),g(void 0),C({});try{const re=await xe("production.parse",{text:n,defaultDate:dd()});if(h(re),o(n),!re.length){j("没有解析到可核对的数据，请检查消息内容后重试。");return}re.every(Q=>Q.canWrite)&&await K(re)}catch(re){h([]),g(void 0),j(Pi(re))}finally{m(re=>re==="parse"?void 0:re)}}}async function te(re,Q){const ue=c.map(ee=>ee.index===re?{...ee,businessDate:Q,canWrite:!!Q,warningText:Q?"":ee.warningText}:ee);h(ue),g(void 0),C({}),ue.every(ee=>ee.canWrite)&&await K(ue)}function T(re,Q,ue){const ee=`${re}:${Q}`;h(he=>he.map(Ce=>Ce.index===re?{...Ce,canWrite:!!Ce.businessDate&&Ce.kind!=="Unknown",fields:{...Ce.fields,[Q]:ue},previewFields:Ce.previewFields.map(Oe=>Oe.key===Q?{...Oe,value:ue}:Oe)}:Ce)),C(he=>Object.fromEntries(Object.entries(he).filter(([Ce])=>Ce!==ee))),g(he=>{if(!he)return he;const Ce=he.items.map(Oe=>{if(Oe.index!==re||!Oe.fields)return Oe;const Qe=Oe.fields.map(yt=>yt.key===Q?lN(yt,ue):yt),$e=Qe.some(yt=>yt.status==="exception")?"error":Qe.some(yt=>yt.status==="confirm")?"existing":"ready";return{...Oe,fields:Qe,status:$e}});return{...he,items:Ce,succeeded:Ce.every(Oe=>Oe.status!=="error")}})}async function R(re){if(!(!p||U)){m("write"),j("");try{const Q=await xe("production.write",{drafts:c,defaultDate:dd(),overwriteExisting:!1,fieldChoices:E,monthlyPlans:re},12e4);if(b(Q),Q.requiredMonths.length){N(Q.requiredMonths),X({});return}Q.succeeded?z(!0):j(Q.message||"Notion 写入未完成。")}catch(Q){j(Pi(Q))}finally{m(void 0)}}}function W(){a(""),o(""),h([]),g(void 0),b(void 0),C({}),z(!1),j("")}const ae=S.useMemo(()=>c.flatMap(re=>{var ue;const Q=(ue=p==null?void 0:p.items.find(ee=>ee.index===re.index))==null?void 0:ue.fields;return Q!=null&&Q.length?Q.filter(ee=>!Xv.has(ee.key)).map(ee=>({draft:re,key:ee.key,name:ee.name,propertyType:ee.propertyType,parsedValue:re.fields[ee.key]??ee.parsedValue,databaseValue:ee.databaseValue,status:ee.status,message:ee.message})):re.previewFields.filter(ee=>!Xv.has(ee.key)).map(ee=>({draft:re,key:ee.key,name:ee.label,propertyType:aN.has(ee.key)?"number":"",parsedValue:re.fields[ee.key]??ee.value,databaseValue:"",status:re.canWrite?"unchecked":"exception",message:re.warningText}))}),[c,p]),oe=S.useMemo(()=>({newFields:ae.filter(re=>re.status==="new").length,same:ae.filter(re=>re.status==="same").length,confirm:ae.filter(re=>re.status==="confirm").length,exception:ae.filter(re=>re.status==="exception").length}),[ae]),fe=ae.filter(re=>re.status==="confirm"),ye=le&&!ve&&!U&&!!(p!=null&&p.succeeded)&&c.every(re=>re.canWrite&&!!re.businessDate)&&ae.every(re=>re.status!=="exception"&&re.status!=="unchecked")&&fe.every(re=>!!E[`${re.draft.index}:${re.key}`]);return A?u.jsxs("div",{className:"app-shell",children:[u.jsxs("main",{className:"main-content",children:[u.jsx(Fv,{configure:()=>ne(!0)}),u.jsxs("div",{className:"production-message-scroll",children:[u.jsx(Kv,{current:3}),u.jsxs("section",{className:"complete-view",children:[u.jsx("div",{className:"complete-icon",children:u.jsx(us,{})}),u.jsx("h2",{children:"入库完成"}),u.jsx("p",{children:(v==null?void 0:v.message)||`${c.length} 条消息已写入 Notion`}),u.jsx("button",{className:"primary-button",onClick:W,children:"录入下一条"})]})]})]}),F&&k&&u.jsx($v,{state:k,selections:ie,setSelections:pe,error:_,close:()=>ne(!1),save:se})]}):u.jsxs("div",{className:"app-shell",children:[u.jsxs("main",{className:"main-content",children:[u.jsx(Fv,{configure:()=>ne(!0)}),u.jsxs("div",{className:"production-message-scroll",children:[u.jsx(Kv,{current:le?2:1}),u.jsxs("div",{className:"workspace-panel",children:[u.jsxs("section",{className:"message-pane",children:[u.jsxs("div",{className:"pane-title",children:[u.jsx("h2",{children:"原始消息"}),u.jsx("p",{children:"输入生产消息，系统将自动解析并检查已有数据。"})]}),u.jsx("textarea",{className:"message-textarea",value:n,disabled:U,onChange:re=>a(re.target.value),placeholder:"请输入生产消息"}),u.jsx("div",{className:"parse-action",children:u.jsxs("button",{className:"primary-button",disabled:!n.trim()||U,onClick:G,children:[le&&u.jsx(Xx,{className:"button-icon refresh-icon"}),u.jsx("span",{children:f==="parse"?"正在解析…":le?"重新解析":"解析消息"})]})})]}),u.jsx("section",{className:"review-pane",children:le?u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"review-header",children:[u.jsx("h2",{children:"解析结果"}),u.jsxs("div",{className:"review-summary",children:[u.jsxs("span",{children:["新增",u.jsx("strong",{children:oe.newFields})]}),u.jsx("i",{children:"·"}),u.jsxs("span",{children:["一致",u.jsx("strong",{children:oe.same})]}),u.jsx("i",{children:"·"}),u.jsxs("span",{children:["待确认",u.jsx("strong",{children:oe.confirm})]}),u.jsx("i",{children:"·"}),u.jsxs("span",{children:["异常",u.jsx("strong",{children:oe.exception})]})]})]}),u.jsx("div",{className:"date-groups",children:c.map(re=>{const Q=ae.filter(he=>he.draft.index===re.index),ue=Q.filter(he=>he.status==="confirm"),ee=p?{...p,items:p.items.filter(he=>he.index===re.index)}:void 0;return u.jsxs("section",{className:"date-group","data-business-date":re.businessDate,children:[u.jsxs("div",{className:"identity-section",children:[u.jsx("div",{className:"identity-field",children:u.jsx(Ya,{label:"日期",value:re.businessDate||"",disabled:U,onChange:he=>te(re.index,he)})}),u.jsxs("div",{className:"identity-field",children:[u.jsx("label",{children:"业务 / 产线"}),u.jsx("input",{className:"field-input",value:re.typeDisplay||"",readOnly:!0,disabled:U})]})]}),u.jsx(dN,{busy:f==="check",result:ee,error:x,needsReparse:ve,invalidCount:re.canWrite?0:1,fieldStatuses:Q.map(he=>he.status)}),u.jsx("div",{className:"data-title",children:"数据字段"}),u.jsxs("div",{className:"field-table",children:[u.jsxs("div",{className:"field-table-header",children:[u.jsx("div",{children:"字段"}),u.jsx("div",{children:"本次解析值"}),u.jsx("div",{children:"数据库值"}),u.jsx("div",{className:"header-status",children:"状态"})]}),Q.map(he=>{const Ce=rf(he.parsedValue,he.propertyType==="number"&&sN[he.key]||""),Oe=`${he.draft.index}:${he.key}`;return u.jsxs("div",{className:"field-row",children:[u.jsx("div",{className:"field-name",children:he.name}),u.jsx("div",{className:"field-editor",children:u.jsxs("div",{className:"input-unit-wrap",children:[u.jsx("input",{className:"field-input compact-input",value:Ce.value,disabled:U,"aria-invalid":he.status==="exception",onChange:Qe=>T(he.draft.index,he.key,oN(Qe.target.value,Ce.unit)),onKeyDown:Qe=>{Qe.key==="Enter"&&Qe.currentTarget.blur()}}),Ce.unit&&u.jsx("span",{children:Ce.unit})]})}),u.jsx("div",{className:"database-value",children:he.databaseValue||"—"}),u.jsx("div",{className:"field-status",children:he.status!=="unchecked"&&u.jsx("span",{className:`pill pill-${he.status}`,title:he.message,children:cN(he.status)})})]},Oe)})]}),ue.length>0&&u.jsxs("section",{className:"conflict-section","aria-label":`${re.businessDate} 待确认字段`,children:[u.jsx("div",{className:"conflict-section-title",children:"待确认字段"}),ue.map(he=>{const Ce=`${he.draft.index}:${he.key}`;return u.jsxs("div",{className:"conflict-panel",children:[u.jsxs("div",{className:"conflict-message",children:[u.jsx("strong",{children:he.name}),u.jsx("span",{children:"原值与新值不同，请选择保留项。"})]}),u.jsxs("div",{className:"conflict-options",children:[u.jsxs("label",{children:[u.jsx("input",{type:"radio",name:`conflict-${Ce}`,checked:E[Ce]==="keep",onChange:()=>C(Oe=>({...Oe,[Ce]:"keep"}))}),u.jsxs("span",{children:[u.jsx("small",{children:"原值"}),u.jsx("strong",{children:he.databaseValue||"—"})]})]}),u.jsxs("label",{children:[u.jsx("input",{type:"radio",name:`conflict-${Ce}`,checked:E[Ce]==="use",onChange:()=>C(Oe=>({...Oe,[Ce]:"use"}))}),u.jsxs("span",{children:[u.jsx("small",{children:"新值"}),u.jsx("strong",{children:he.parsedValue||"—"})]})]})]})]},Ce)})]})]},re.index)})}),u.jsxs("div",{className:"review-footer",children:[u.jsx("span",{className:"review-footer-text",children:c.length>1?`本次共 ${c.length} 条消息，将整批写入 Notion。`:"确认后将把本次解析结果写入 Notion。"}),u.jsx("button",{className:"primary-button confirm-button",disabled:!ye,onClick:()=>R(),children:f==="write"?"正在入库…":"确认入库"})]})]}):u.jsxs("div",{className:"review-empty",children:[u.jsx("h2",{children:"解析结果"}),u.jsx("p",{children:"解析消息后，Notion 数据检查结果将在这里显示。"}),(_||(k==null?void 0:k.configured)===!1||k&&(!k.cutting.bound||!k.towerDaily.bound))&&u.jsx("div",{className:"pm-notice",role:"alert",children:_||((k==null?void 0:k.configured)===!1?"Notion 连接尚未配置。":"数据库已变更，请点击右上角“数据库绑定”重新选择下料和塔筒主数据库。")})]})})]})]})]}),Y.length>0&&u.jsx(fN,{months:Y,values:M,setValues:X,close:()=>N([]),submit:re=>{N([]),R(re)}}),F&&k&&u.jsx($v,{state:k,selections:ie,setSelections:pe,error:_,close:()=>ne(!1),save:se})]})}function dN({busy:n,result:a,error:s,needsReparse:o,invalidCount:c,fieldStatuses:h}){if(n)return u.jsxs("div",{className:"match-status",role:"status","aria-live":"polite",children:[u.jsx("span",{className:"status-loader"}),u.jsx("span",{className:"match-status-copy",children:"正在检查 Notion 数据…"})]});if(o)return u.jsxs("div",{className:"match-status match-status-error",role:"alert",children:[u.jsx("span",{className:"new-record-icon",children:"!"}),u.jsx("span",{className:"match-status-copy",children:"原始消息已修改，请重新解析"})]});if(c)return u.jsxs("div",{className:"match-status match-status-error",role:"alert",children:[u.jsx("span",{className:"new-record-icon",children:"!"}),u.jsxs("span",{className:"match-status-copy",children:["本批有 ",c," 条异常，已停止检查和入库"]})]});if(s)return u.jsxs("div",{className:"match-status match-status-error",role:"alert",children:[u.jsx("span",{className:"new-record-icon",children:"!"}),u.jsxs("span",{className:"match-status-copy",children:["检查失败：",s]})]});const f=a==null?void 0:a.items.some(x=>x.status==="existing"||x.status==="conflict"),m=x=>h.includes(x),p=h.length>0&&h.every(x=>x==="same"),g=m("exception")||a&&!a.succeeded&&h.length===0?"match-status-error":m("confirm")?"match-status-warning":p?"match-status-neutral":"",v=m("exception")?"存在异常，不能入库":m("unchecked")?"字段已修改，等待检查":m("confirm")?"已找到对应记录，有字段待确认":m("new")?f||m("same")?"已找到对应记录，将补充空字段":"未找到对应记录，将新建":p?"已找到对应记录，数据一致":a&&!a.succeeded?"Notion 检查未通过":"等待检查 Notion 数据",b=!!a&&!m("exception")&&!m("confirm")&&!m("unchecked");return u.jsxs("div",{className:`match-status ${g}`,role:g==="match-status-error"?"alert":"status","aria-live":"polite",children:[b?u.jsx("span",{className:"match-check",children:u.jsx(us,{})}):u.jsx("span",{className:"new-record-icon",children:g?"!":"+"}),u.jsx("span",{className:"match-status-copy",children:v})]})}function fN({months:n,values:a,setValues:s,close:o,submit:c}){const h=Object.fromEntries(n.map(m=>[m,Number(a[m])])),f=n.every(m=>{var p;return((p=a[m])==null?void 0:p.trim())&&Number.isFinite(h[m])&&h[m]>=0});return u.jsx("div",{className:"pm-dialog-overlay",children:u.jsxs("section",{className:"pm-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"monthly-plan-title",children:[u.jsx("h2",{id:"monthly-plan-title",children:"补充下料月计划"}),u.jsx("p",{children:"独立月计划库中没有该月份记录，请填写计划下料（吨）。"}),n.map(m=>u.jsxs("label",{children:[m,u.jsx("input",{type:"number",min:"0",value:a[m]||"",onChange:p=>s({...a,[m]:p.target.value})})]},m)),u.jsxs("div",{className:"pm-dialog-actions",children:[u.jsx("button",{onClick:o,children:"取消"}),u.jsx("button",{className:"primary-button",disabled:!f,onClick:()=>c(h),children:"创建并继续"})]})]})})}function $v({state:n,selections:a,setSelections:s,error:o,close:c,save:h}){var b,x;const[f,m]=S.useState(((b=n.sources.find(j=>j.id===a.cutting))==null?void 0:b.businessSection)||""),[p,g]=S.useState(((x=n.sources.find(j=>j.id===a.towerDaily))==null?void 0:x.businessSection)||""),v=j=>n.usesBusinessSections?n.sources.filter(E=>E.businessSection===j):n.sources;return u.jsx("div",{className:"pm-dialog-overlay",children:u.jsxs("section",{className:"pm-dialog pm-binding-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"binding-title",children:[u.jsx("h2",{id:"binding-title",children:"数据库绑定"}),u.jsx("p",{children:"只绑定每日主数据库。月累计和年累计由软件查询计算；下料月计划库通过主库的 Relation 自动识别。"}),n.usesBusinessSections&&u.jsxs("label",{children:["下料业务板块",u.jsxs("select",{value:f,onChange:j=>{m(j.target.value),s({...a,cutting:""})},children:[u.jsx("option",{value:"",children:"不处理下料消息"}),n.businessSections.map(j=>u.jsx("option",{value:j,children:j},`cutting-business-${j}`))]})]}),u.jsxs("label",{children:["下料主数据库",u.jsxs("select",{value:a.cutting,disabled:n.usesBusinessSections&&!f,onChange:j=>s({...a,cutting:j.target.value}),children:[u.jsx("option",{value:"",children:"不处理下料消息"}),v(f).map(j=>u.jsx("option",{value:j.id,children:j.name},`cutting-${j.id}`))]})]}),n.usesBusinessSections&&u.jsxs("label",{children:["塔筒业务板块",u.jsxs("select",{value:p,onChange:j=>{g(j.target.value),s({...a,towerDaily:""})},children:[u.jsx("option",{value:"",children:"请选择业务板块"}),n.businessSections.map(j=>u.jsx("option",{value:j,children:j},`tower-business-${j}`))]})]}),u.jsxs("label",{children:["塔筒产线主数据库",u.jsxs("select",{value:a.towerDaily,disabled:n.usesBusinessSections&&!p,onChange:j=>s({...a,towerDaily:j.target.value}),children:[u.jsx("option",{value:"",children:"请选择具体数据库"}),v(p).map(j=>u.jsx("option",{value:j.id,children:j.name},`tower-${j.id}`))]})]}),o&&u.jsx("div",{className:"pm-notice",role:"alert",children:o}),u.jsxs("div",{className:"pm-dialog-actions",children:[u.jsx("button",{onClick:c,children:"取消"}),u.jsx("button",{className:"primary-button",disabled:!a.towerDaily,onClick:h,children:"保存绑定"})]})]})})}function Fv({configure:n}){return u.jsxs("header",{className:"content-header",children:[u.jsxs("div",{children:[u.jsx("h1",{children:"生产消息入库"}),u.jsx("p",{children:"解析生产消息，检查已有数据并确认入库"})]}),u.jsx("button",{type:"button",className:"template-config-button",onClick:n,children:"数据库绑定"})]})}function Kv({current:n}){return u.jsx($0,{current:n,titles:["录入消息","解析确认","完成"],label:"生产消息入库进度"})}const fd=(n=0)=>{const a=new Date;return{startDate:new Date(Date.UTC(a.getFullYear(),a.getMonth()+n-1,21)).toISOString().slice(0,10),endDate:new Date(Date.UTC(a.getFullYear(),a.getMonth()+n,20)).toISOString().slice(0,10)}},hd={sourceRoot:"",outputRoot:"",reportUrl:"",username:"",password:""},Zv=n=>({sourceRoot:n.sourceRoot,outputRoot:n.outputRoot,reportUrl:n.reportUrl,username:n.username,password:""}),Yo=n=>n instanceof Error?n.message:String(n),Qv=n=>n?`${n.slice(0,4)} 年 ${Number(n.slice(5,7))} 月`:"—",Jv={prepare:"准备中",collect:"正在导出日报",parse:"正在读取数据",summary:"正在生成汇总",complete:"正在完成"};function hN(){const[n,a]=S.useState(),[s,o]=S.useState(fd),[c,h]=S.useState(hd),[f,m]=S.useState(!1),[p,g]=S.useState("load"),[v,b]=S.useState(""),[x,j]=S.useState(""),[E,C]=S.useState(),[A,z]=S.useState(),[k,V]=S.useState(!1),[_,L]=S.useState(!1),Y=S.useRef(0),N=S.useRef(!1),M=Math.floor((Date.parse(`${s.endDate}T00:00:00Z`)-Date.parse(`${s.startDate}T00:00:00Z`))/864e5)+1,X=Number.isFinite(M)?M<1?"结束日期不能早于开始日期。":M>366?"单次统计范围不能超过 366 天。":"":"请选择完整日期。",F=A!=null&&A.total?Math.min(100,Math.max(0,Math.round(A.current/A.total*100))):0;async function ne(){const K=++Y.current;N.current=!0,g("load"),b("");try{const G=await xe("report.getState");K===Y.current&&a(G)}catch(G){K===Y.current&&b(Yo(G))}finally{K===Y.current&&(N.current=!1,g(void 0))}}S.useEffect(()=>(ne(),()=>{Y.current++}),[]);function ie(K){N.current||(o(K),C(void 0),z(void 0),V(!1),b(""),L(!1))}function pe(K){N.current||(m(K),j(""),h(K&&n?Zv(n):hd))}async function le(K){if(K.preventDefault(),N.current||!n)return;const G={...c,sourceRoot:c.sourceRoot.trim(),outputRoot:c.outputRoot.trim(),reportUrl:c.reportUrl.trim(),username:c.username.trim()};if(JSON.stringify(G)===JSON.stringify(Zv(n))){pe(!1);return}const te=++Y.current;N.current=!0,g("save"),j("");try{const T=await xe("report.saveConfig",G);if(te!==Y.current)return;a(T),m(!1),h(hd),C(void 0),z(void 0),V(!1),b("")}catch(T){te===Y.current&&j(Yo(T))}finally{te===Y.current&&(N.current=!1,g(void 0))}}async function ve(){if(N.current||!(n!=null&&n.credentialsConfigured))return;const K=++Y.current;N.current=!0,g("auth"),b("");try{await xe("report.authenticate",void 0,600*1e3);const G=await xe("report.getState");K===Y.current&&a(G)}catch(G){K===Y.current&&b(Yo(G))}finally{K===Y.current&&(N.current=!1,g(void 0))}}async function U(){if(N.current||!(n!=null&&n.authenticated)||X)return;const K=++Y.current,G={...s};N.current=!0,g("run"),b(""),C(void 0),V(!1),L(!1),z({stage:"prepare",current:0,total:M,message:""});try{const te=await xe("report.run",G,18e5,T=>{K===Y.current&&N.current&&z(T)});K===Y.current&&(C(te),z(void 0))}catch(te){K===Y.current&&(b(Yo(te)),V(!0),z(void 0))}finally{K===Y.current&&(N.current=!1,g(void 0))}}async function se(){if(E)try{await navigator.clipboard.writeText(E.summaryPath),L(!0)}catch{b("无法复制，请选中文件路径手动复制。")}}return u.jsxs("div",{className:"page report-center-page",children:[u.jsxs("header",{className:"report-header",children:[u.jsx("h1",{children:"文件统计汇总"}),u.jsxs("div",{className:"report-header-actions",children:[u.jsx("span",{className:"report-status",children:p==="load"?"加载中":n!=null&&n.authenticated?"已验证登录":"未验证登录"}),u.jsx("button",{className:"secondary report-icon-button","aria-label":"报表设置",title:"报表设置",disabled:!!p||!n,onClick:()=>pe(!0),children:u.jsx(GC,{})})]})]}),u.jsxs("div",{className:"report-content",children:[v&&u.jsxs("div",{className:"report-error",role:"alert",children:[u.jsx("span",{children:v}),!n&&u.jsx("button",{className:"secondary",disabled:!!p,onClick:()=>void ne(),children:"重新加载"})]}),u.jsxs("section",{className:"report-workspace",children:[u.jsxs("div",{className:"report-pane report-period",children:[u.jsxs("div",{className:"report-pane-heading",children:[u.jsx("h2",{children:"统计范围"}),!X&&u.jsxs("span",{children:[M," 天"]})]}),u.jsxs("div",{className:"report-dates",children:[u.jsx(Ya,{label:"开始日期",value:s.startDate,disabled:!!p,onChange:K=>ie({...s,startDate:K})}),u.jsx(Ya,{label:"结束日期",value:s.endDate,disabled:!!p,onChange:K=>ie({...s,endDate:K})})]}),u.jsxs("div",{className:"report-range-tools",children:[u.jsxs("div",{children:[u.jsx("button",{disabled:!!p,onClick:()=>ie(fd()),children:"本期"}),u.jsx("button",{disabled:!!p,onClick:()=>ie(fd(-1)),children:"上期"})]}),u.jsx("span",{children:X||`汇总月份 · ${Qv(s.endDate)}`})]}),u.jsxs("div",{className:"report-execution",children:[p==="run"&&u.jsxs("div",{className:"report-progress",role:"status",children:[u.jsxs("div",{children:[u.jsxs("span",{children:[u.jsx(qa,{className:"spin"}),Jv[(A==null?void 0:A.stage)||"prepare"]]}),A&&["collect","parse"].includes(A.stage)&&u.jsxs("span",{children:[A.current," / ",A.total]})]}),u.jsx("div",{className:"report-progress-bar",role:"progressbar","aria-label":Jv[(A==null?void 0:A.stage)||"prepare"],"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":F,children:u.jsx("i",{style:{width:`${F}%`}})}),(A==null?void 0:A.message)&&u.jsxs("details",{className:"report-details",children:[u.jsx("summary",{children:"处理详情"}),u.jsx("p",{children:A.message})]})]}),!(n!=null&&n.credentialsConfigured)&&n&&u.jsxs("p",{className:"report-setup",children:["请先配置报表连接。",u.jsx("button",{onClick:()=>pe(!0),children:"报表设置"})]}),(n==null?void 0:n.credentialsConfigured)&&!n.authenticated&&u.jsx("p",{className:"report-setup",children:"请先验证登录。"}),u.jsxs("div",{className:"report-actions",children:[(n==null?void 0:n.credentialsConfigured)&&u.jsxs("button",{className:"secondary",disabled:!!p,onClick:ve,children:[p==="auth"&&u.jsx(qa,{className:"spin"}),p==="auth"?"验证中…":n!=null&&n.authenticated?"重新验证":"验证登录"]}),u.jsx("button",{className:"primary",disabled:!!p||!(n!=null&&n.authenticated)||!!X,onClick:U,children:p==="run"?"正在汇总…":k?"重新汇总":"开始汇总"})]})]})]}),u.jsxs("div",{className:"report-pane report-result","aria-live":"polite",children:[u.jsxs("div",{className:"report-pane-heading",children:[u.jsx("h2",{children:"汇总结果"}),E&&u.jsx("span",{children:"已完成"})]}),E?u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"report-file",children:[u.jsx(jv,{}),u.jsxs("div",{children:[u.jsxs("h3",{children:[Qv(E.period.endDate),"设备台时汇总"]}),u.jsxs("p",{children:[E.period.startDate," — ",E.period.endDate]})]})]}),u.jsxs("dl",{className:"report-result-stats",children:[u.jsxs("div",{children:[u.jsx("dt",{children:"日报"}),u.jsxs("dd",{children:[E.parsedReports," / ",E.plannedReports," 份"]})]}),u.jsxs("div",{children:[u.jsx("dt",{children:"设备"}),u.jsxs("dd",{children:[E.deviceCount," 台"]})]})]}),u.jsxs("div",{className:"report-output",children:[u.jsx("span",{children:"文件位置"}),u.jsx("p",{children:E.summaryPath}),u.jsxs("button",{className:"secondary",onClick:se,children:[u.jsx(VC,{}),_?"已复制":"复制路径"]})]}),u.jsxs("details",{className:"report-details",children:[u.jsx("summary",{children:"汇总明细"}),u.jsxs("p",{children:["数据点：",E.actualDataPoints," / ",E.expectedDataPoints]}),E.warnings.map((K,G)=>u.jsx("p",{children:K},G))]})]}):u.jsxs("div",{className:"report-empty",children:[u.jsx(jv,{}),u.jsx("strong",{children:p==="run"?"正在生成汇总":k?"未生成汇总文件":"尚未生成汇总"}),u.jsx("p",{children:p==="run"?"完成后可在这里查看文件。":k?"处理错误后，可重新汇总。":"选择统计范围后开始汇总。"})]})]})]})]}),u.jsx(Qd,{open:f,onOpenChange:pe,children:u.jsxs(Jd,{children:[u.jsx(Id,{className:"dialog-overlay"}),u.jsxs(ef,{className:"report-settings-dialog",children:[u.jsxs("div",{className:"report-settings-heading",children:[u.jsx(tf,{children:"报表设置"}),u.jsx(Uv,{asChild:!0,children:u.jsx("button",{className:"secondary report-icon-button",disabled:!!p,"aria-label":"关闭报表设置",children:u.jsx($x,{})})})]}),u.jsx(nf,{className:"report-sr-only",children:"设置报表连接与文件保存位置。"}),u.jsxs("form",{onSubmit:le,children:[u.jsxs("fieldset",{disabled:!!p,children:[u.jsx("legend",{children:"报表连接"}),u.jsxs("label",{children:["报表网页",u.jsx("input",{type:"url",required:!0,value:c.reportUrl,onChange:K=>h({...c,reportUrl:K.target.value}),placeholder:"https://…"})]}),u.jsxs("div",{className:"report-settings-grid",children:[u.jsxs("label",{children:["账号",u.jsx("input",{required:!0,autoComplete:"username",value:c.username,onChange:K=>h({...c,username:K.target.value})})]}),u.jsxs("label",{children:["密码",u.jsx("input",{type:"password",required:!(n!=null&&n.credentialsConfigured),autoComplete:"new-password",value:c.password,onChange:K=>h({...c,password:K.target.value}),placeholder:n!=null&&n.credentialsConfigured?"留空保持原密码":"请输入密码"})]})]})]}),u.jsxs("fieldset",{disabled:!!p,children:[u.jsx("legend",{children:"保存位置"}),u.jsxs("label",{children:["原始日报",u.jsx("input",{required:!0,value:c.sourceRoot,onChange:K=>h({...c,sourceRoot:K.target.value})})]}),u.jsxs("label",{children:["汇总文件",u.jsx("input",{required:!0,value:c.outputRoot,onChange:K=>h({...c,outputRoot:K.target.value})})]})]}),x&&u.jsx("p",{className:"report-error",role:"alert",children:x}),u.jsxs("div",{className:"report-settings-actions",children:[u.jsx(Uv,{asChild:!0,children:u.jsx("button",{className:"secondary",type:"button",disabled:!!p,children:"取消"})}),u.jsx("button",{className:"primary",type:"submit",disabled:!!p,children:p==="save"?"保存中…":"保存设置"})]})]})]})]})})]})}const af="••••••••••••",Wv=[{key:"connection",label:"连接",keywords:"Notion API 令牌 根页面 数据源",icon:u.jsx(SN,{})},{key:"notification",label:"通知",keywords:"钉钉 Webhook Secret 规则",icon:u.jsx(wN,{})},{key:"data",label:"数据与缓存",keywords:"Notion 数据源 缓存 绑定",icon:u.jsx(jN,{})},{key:"about",label:"关于",keywords:"版本 WebView2 React TypeScript",icon:u.jsx(EN,{})}];function mN({open:n,onClose:a}){const[s,o]=S.useState("connection"),[c,h]=S.useState(""),[f,m]=S.useState(null),[p,g]=S.useState(""),[v,b]=S.useState(""),[x,j]=S.useState(""),E=S.useRef(null),C=S.useRef(null);S.useEffect(()=>{if(!n)return;C.current=document.activeElement instanceof HTMLElement?document.activeElement:null,j("settings.open"),b(""),xe("settings.open").then(V=>m(V)).catch(V=>b(V instanceof Error?V.message:"设置加载失败，请重试。")).finally(()=>j("")),window.setTimeout(()=>{var V;return(V=E.current)==null?void 0:V.focus()},0);const k=V=>{V.key==="Escape"&&a()};return window.addEventListener("keydown",k),()=>{var V;window.removeEventListener("keydown",k),(V=C.current)==null||V.focus()}},[n,a]),S.useEffect(()=>{if(!p)return;const k=window.setTimeout(()=>g(""),3e3);return()=>window.clearTimeout(k)},[p]);const A=async(k,V)=>{j(k),b(""),g("");try{const _=await xe(k,V,6e4);return(k==="settings.refreshDataSources"||k==="settings.saveConnection")&&rA(!0),m(_.state),g(_.message),!0}catch(_){return b(_ instanceof Error?_.message:"操作未完成，请重试。"),!1}finally{j("")}},z=S.useMemo(()=>{const k=c.trim().toLocaleLowerCase("zh-CN");return k?Wv.filter(V=>`${V.label} ${V.keywords}`.toLocaleLowerCase("zh-CN").includes(k)):Wv},[c]);return n?u.jsx("div",{className:"settings-overlay",onMouseDown:k=>{k.target===k.currentTarget&&a()},children:u.jsxs("div",{className:"settings-window",role:"dialog","aria-modal":"true","aria-label":"设置",children:[u.jsxs("aside",{className:"settings-sidebar",children:[u.jsxs("label",{className:"settings-search",children:[u.jsx(xN,{}),u.jsx("input",{value:c,onChange:k=>h(k.target.value),placeholder:"搜索设置","aria-label":"搜索设置"})]}),u.jsx("div",{className:"settings-sidebar-title",children:"设置"}),u.jsxs("nav",{className:"settings-nav","aria-label":"设置分类",children:[z.map(k=>u.jsxs("button",{type:"button",className:s===k.key?"settings-nav-item active":"settings-nav-item","aria-current":s===k.key?"page":void 0,onClick:()=>o(k.key),children:[u.jsx("span",{className:"settings-nav-icon",children:k.icon}),u.jsx("span",{children:k.label})]},k.key)),z.length===0&&u.jsx("p",{className:"settings-empty-search",children:"没有匹配的设置"})]})]}),u.jsxs("main",{className:"settings-main",children:[u.jsx("button",{ref:E,type:"button",className:"settings-close",onClick:a,"aria-label":"关闭设置",children:u.jsx(TN,{})}),u.jsxs("div",{className:"settings-content",children:[x==="settings.open"&&!f?u.jsx("div",{className:"settings-loading",children:"正在读取本机设置…"}):u.jsxs(u.Fragment,{children:[s==="connection"&&f&&u.jsx(pN,{state:f,busy:x,run:A}),s==="notification"&&f&&u.jsx(gN,{state:f,busy:x,run:A}),s==="data"&&f&&u.jsx(yN,{state:f,busy:x,run:A}),s==="about"&&f&&u.jsx(vN,{state:f})]}),(p||v)&&u.jsx("div",{className:`settings-message ${v?"error":""}`,role:"status","aria-live":"polite",children:v||p})]})]})]})}):null}function pN({state:n,busy:a,run:s}){const[o,c]=S.useState(""),[h,f]=S.useState(!1),[m,p]=S.useState(n.notion.rootPageId);S.useEffect(()=>p(n.notion.rootPageId),[n.notion.rootPageId]);const g=async x=>{await s(x,{token:h?o:"",rootPageId:m})&&(c(""),f(!1))},v=a==="settings.refreshDataSources",b=a==="settings.saveConnection";return u.jsxs(bl,{title:"连接",description:"管理生产助手使用的外部数据源和服务连接。",children:[u.jsxs(Pr,{title:"Notion",children:[u.jsx(Ut,{title:"连接状态",description:"当前本机连接配置和数据源缓存状态",children:u.jsx(K0,{connected:n.notion.configured,label:n.notion.configured?"已配置":"未配置"})}),u.jsx(Ji,{title:"API 令牌",description:"使用 Windows 当前用户加密后保存在本机",children:u.jsx("input",{className:"settings-input",type:"password",autoComplete:"off",placeholder:"输入 Notion API Token",value:h?o:n.notion.configured?af:"",onFocus:x=>{!h&&n.notion.configured&&x.currentTarget.select()},onChange:x=>{f(!0),c(x.target.value)}})}),u.jsx(Ji,{title:"根页面 ID",description:"可选。留空时自动发现当前令牌有权限访问的数据源",children:u.jsx("input",{className:"settings-input",value:m,onChange:x=>p(x.target.value)})}),u.jsxs("div",{className:"settings-buttons",children:[u.jsxs("button",{type:"button",className:"settings-button-primary",disabled:!!a,onClick:()=>g("settings.saveConnection"),children:[b&&u.jsx(as,{})," ",b?"正在连接…":"保存并连接"]}),u.jsxs("button",{type:"button",className:"settings-button-secondary",disabled:!!a,onClick:()=>g("settings.refreshDataSources"),children:[v&&u.jsx(as,{})," ",v?"正在刷新…":"刷新数据源"]})]})]}),u.jsxs(Pr,{title:"数据源",children:[u.jsx(Ut,{title:"已发现数据源",description:"最近一次从 Notion 获取的数据源",children:u.jsxs("span",{className:"settings-value",children:[n.notion.dataSourceCount," 个"]})}),u.jsx(Ut,{title:"上次同步",description:"数据源元信息最后更新时间",children:u.jsx("span",{className:"settings-value",children:n.notion.lastSyncedAt||"尚未同步"})})]})]})}function gN({state:n,busy:a,run:s}){const o=n.notification,[c,h]=S.useState(o.enabled),[f,m]=S.useState(o.channelName),[p,g]=S.useState(""),[v,b]=S.useState(""),[x,j]=S.useState(!1),[E,C]=S.useState(!1),[A,z]=S.useState(o.rules);S.useEffect(()=>{h(o.enabled),m(o.channelName),z(o.rules)},[o]);const k={enabled:c,channelName:f,webhook:x?p:"",secret:E?v:""},V=async Y=>{await s(Y,k)&&(g(""),b(""),j(!1),C(!1))},_=a==="settings.saveNotification",L=a==="settings.testNotification";return u.jsxs(bl,{title:"通知",description:"配置生产助手全局通知使用的技术通道。业务模块只决定何时通知。",children:[u.jsxs(Pr,{title:"通知服务",children:[u.jsx(Ut,{title:"启用通知",description:"关闭后所有业务模块都不会向外发送通知",children:u.jsx(Iv,{checked:c,onChange:h,label:"启用通知"})}),u.jsx(Ut,{title:"发送方式",description:"当前使用的全局通知技术通道",children:u.jsx("span",{className:"settings-value",children:"钉钉机器人 Webhook"})}),u.jsx(Ut,{title:"连接状态",description:o.checkedAt?`上次测试 ${o.checkedAt}`:"尚未发送测试通知",children:u.jsx(K0,{connected:o.connected,label:o.connected===!0?"连接正常":o.connected===!1?"连接失败":"待测试"})})]}),u.jsxs(Pr,{title:"钉钉机器人",children:[u.jsx(Ji,{title:"Webhook URL",description:"使用 Windows 当前用户加密后保存在本机",children:u.jsx("input",{className:"settings-input",type:"password",autoComplete:"off",placeholder:"https://oapi.dingtalk.com/robot/send?...",value:x?p:o.webhookConfigured?af:"",onFocus:Y=>{!x&&o.webhookConfigured&&Y.currentTarget.select()},onChange:Y=>{j(!0),g(Y.target.value)}})}),u.jsx(Ji,{title:"加签密钥",description:"钉钉机器人 Secret，使用 Windows 当前用户加密保存",children:u.jsx("input",{className:"settings-input",type:"password",autoComplete:"off",placeholder:"SEC...",value:E?v:o.secretConfigured?af:"",onFocus:Y=>{!E&&o.secretConfigured&&Y.currentTarget.select()},onChange:Y=>{C(!0),b(Y.target.value)}})}),u.jsx(Ji,{title:"默认接收群",description:"用于识别当前通知渠道",children:u.jsx("input",{className:"settings-input",value:f,onChange:Y=>m(Y.target.value),placeholder:"生产管理群"})}),u.jsxs("div",{className:"settings-buttons",children:[u.jsxs("button",{type:"button",className:"settings-button-primary",disabled:!!a,onClick:()=>V("settings.saveNotification"),children:[_&&u.jsx(as,{})," ",_?"正在保存…":"保存设置"]}),u.jsxs("button",{type:"button",className:"settings-button-secondary",disabled:!!a,onClick:()=>V("settings.testNotification"),children:[L&&u.jsx(as,{})," ",L?"正在发送…":"发送测试"]})]}),o.status&&u.jsx("p",{className:"settings-inline-status",children:o.status})]}),u.jsxs(Pr,{title:"通知规则",children:[u.jsx("div",{className:"settings-rule-list",children:A.map(Y=>u.jsx(Ut,{title:Y.name,description:`钉钉 · ${bN(Y.level)}`,children:u.jsx(Iv,{checked:Y.enabled,label:`通知规则：${Y.name}`,onChange:N=>z(M=>M.map(X=>X.eventType===Y.eventType?{...X,enabled:N}:X))})},Y.eventType))}),u.jsx("div",{className:"settings-buttons settings-buttons-end",children:u.jsx("button",{type:"button",className:"settings-button-primary",disabled:!!a,onClick:()=>s("settings.saveNotificationRules",{rules:A}),children:"保存通知规则"})})]})]})}function yN({state:n,busy:a,run:s}){return u.jsx(bl,{title:"数据与缓存",description:"查看和维护生产助手保存在本机的 Notion 数据源缓存。",children:u.jsxs(Pr,{title:"本地数据",children:[u.jsx(Ut,{title:"Notion 数据源缓存",description:"用于减少重复的网络请求",children:u.jsxs("div",{className:"settings-inline-actions",children:[u.jsxs("span",{className:"settings-value",children:[n.notion.dataSourceCount," 个"]}),u.jsxs("button",{type:"button",className:"settings-text-button",disabled:!!a,onClick:()=>s("settings.refreshDataSources"),children:[a==="settings.refreshDataSources"&&u.jsx(as,{})," ",a==="settings.refreshDataSources"?"刷新中…":"刷新"]})]})}),u.jsx(Ut,{title:"上次同步",description:"数据源元信息最后更新时间",children:u.jsx("span",{className:"settings-value",children:n.notion.lastSyncedAt||"尚未同步"})})]})})}function vN({state:n}){return u.jsx(bl,{title:"关于",description:"生产助手的版本和运行环境信息。",children:u.jsxs(Pr,{title:"生产助手",children:[u.jsx(Ut,{title:"版本",description:"当前安装版本",children:u.jsx("span",{className:"settings-value",children:n.version})}),u.jsx(Ut,{title:"桌面环境",description:"应用运行容器",children:u.jsx("span",{className:"settings-value",children:"WinUI 3 + WebView2"})}),u.jsx(Ut,{title:"前端",description:"用户界面技术栈",children:u.jsx("span",{className:"settings-value",children:"React + TypeScript"})}),u.jsx(Ut,{title:"本地数据保护",description:"令牌和通知凭据仅保存在本机",children:u.jsx("span",{className:"settings-value",children:"Windows 当前用户加密"})})]})})}function bl({title:n,description:a,children:s}){return u.jsxs("div",{className:"settings-page",children:[u.jsxs("header",{className:"settings-page-header",children:[u.jsx("h1",{children:n}),u.jsx("p",{children:a})]}),s]})}function Pr({title:n,children:a}){return u.jsxs("section",{className:"settings-section",children:[u.jsx("h2",{children:n}),u.jsx("div",{className:"settings-section-body",children:a})]})}function Ut({title:n,description:a,children:s}){return u.jsxs("div",{className:"settings-row",children:[u.jsxs("div",{className:"settings-row-text",children:[u.jsx("div",{className:"settings-row-title",children:n}),a&&u.jsx("div",{className:"settings-row-description",children:a})]}),u.jsx("div",{className:"settings-row-control",children:s})]})}function Ji({title:n,description:a,children:s}){return u.jsxs("label",{className:"settings-field",children:[u.jsx("span",{className:"settings-field-title",children:n}),a&&u.jsx("span",{className:"settings-field-description",children:a}),u.jsx("span",{className:"settings-field-control",children:s})]})}function Iv({checked:n,onChange:a,label:s}){return u.jsx("button",{type:"button",role:"switch","aria-checked":n,"aria-label":s,className:n?"settings-switch checked":"settings-switch",onClick:()=>a(!n),children:u.jsx("span",{})})}function K0({connected:n,label:a}){return u.jsxs("div",{className:`settings-connected ${n===!1?"error":n===null?"pending":""}`,children:[u.jsx("span",{className:"settings-status-dot"}),a]})}function as(){return u.jsx("span",{className:"settings-spinner","aria-hidden":"true"})}const bN=n=>n==="warning"?"警告":n==="info"?"信息":"错误";function xN(){return u.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[u.jsx("circle",{cx:"11",cy:"11",r:"6.5"}),u.jsx("path",{d:"m16 16 4 4"})]})}function SN(){return u.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[u.jsx("path",{d:"M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"}),u.jsx("path",{d:"M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1"})]})}function wN(){return u.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[u.jsx("path",{d:"M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"}),u.jsx("path",{d:"M10 21h4"})]})}function jN(){return u.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[u.jsx("ellipse",{cx:"12",cy:"5",rx:"7",ry:"3"}),u.jsx("path",{d:"M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5"}),u.jsx("path",{d:"M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"})]})}function EN(){return u.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[u.jsx("circle",{cx:"12",cy:"12",r:"9"}),u.jsx("path",{d:"M12 11v6"}),u.jsx("path",{d:"M12 7h.01"})]})}function TN(){return u.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[u.jsx("path",{d:"m6 6 12 12"}),u.jsx("path",{d:"m18 6-12 12"})]})}const md=new Date().toISOString().slice(0,10);function CN(){const[n,a]=S.useState(""),[s,o]=S.useState(!1),[c,h]=S.useState([]),[f,m]=S.useState(""),[p,g]=S.useState([]),[v,b]=S.useState(""),[x,j]=S.useState([]),[E,C]=S.useState(""),[A,z]=S.useState([]),[k,V]=S.useState(""),[_,L]=S.useState(""),[Y,N]=S.useState("day"),[M,X]=S.useState(md),[F,ne]=S.useState(md),[ie,pe]=S.useState(md),[le,ve]=S.useState("load"),[U,se]=S.useState(""),[K,G]=S.useState();S.useEffect(()=>{xe("database.getState").then(ee=>{a(ee.provider),o(ee.usesBusinessSections),h(ee.businessSections),g(ee.sources)}).catch(ee=>se(ee instanceof Error?ee.message:String(ee))).finally(()=>ve(""))},[]);const te=async ee=>{var he,Ce,Oe,Qe;if(b(ee),C(""),V(""),L(""),j([]),z([]),G(void 0),se(""),!!ee){ve("schema");try{const $e=await xe("database.getSchema",{sourceId:ee});z($e.fields),j($e.datasets),V(((he=$e.fields.find(yt=>yt.type==="date"))==null?void 0:he.id)||""),L(((Ce=$e.fields.find(yt=>yt.type==="number"))==null?void 0:Ce.id)||""),C(((Oe=$e.datasets.find(yt=>yt.name==="本年截止今日"))==null?void 0:Oe.id)||((Qe=$e.datasets[0])==null?void 0:Qe.id)||"")}catch($e){se($e instanceof Error?$e.message:String($e))}finally{ve("")}}},T=async()=>{ve("query"),se(""),G(void 0);try{G(await xe("database.inspect",{sourceId:v,datasetId:E,dateFieldId:ye?k:"",valueFieldId:ye?_:"",rangeKind:ye?Y:"all",businessDate:M,startDate:F,endDate:ie},12e4))}catch(ee){se(ee instanceof Error?ee.message:String(ee))}finally{ve("")}},R=A.filter(ee=>ee.type==="date"),W=s?p.filter(ee=>ee.businessSection===f):p,ae=A.filter(ee=>ee.type==="number"),oe=A.find(ee=>ee.id===_),fe=x.find(ee=>ee.id===E),ye=(fe==null?void 0:fe.name.trim())==="本年截止今日",re=S.useMemo(()=>{const ee=new Set([k,_]);return[...A.filter(he=>ee.has(he.id)),...A.filter(he=>!ee.has(he.id))]},[A,k,_]),Q=Y==="week"||Y==="custom",ue=v&&E&&(!ye||k&&(!Q||F&&ie));return u.jsxs("div",{className:"page database-viewer-page",children:[u.jsxs("header",{children:[u.jsxs("div",{children:[u.jsx("h1",{children:"数据库查看"}),u.jsx("p",{children:"按当前适配器提供的目录选择数据库并查看真实 View；目录层级不会由界面写死。"})]}),u.jsxs("span",{className:"database-provider",children:[u.jsx(Ud,{}),"当前适配器：",n||"读取中"]})]}),u.jsxs("section",{className:"database-query-panel",children:[u.jsxs("div",{className:"database-query-heading",children:[u.jsx("h2",{children:"查询条件"}),u.jsx("p",{children:"普通 View 读取其完整结果；只有“本年截止今日”可在返回记录内计算日期口径。"})]}),u.jsxs("div",{className:"database-query-grid",children:[s&&u.jsxs("label",{children:["业务板块",u.jsx(hr,{value:f,placeholder:le==="load"?"正在读取业务板块…":"请选择业务板块",disabled:!!le,options:c.map(ee=>({value:ee,label:ee})),onChange:ee=>{m(ee),te("")}})]}),u.jsxs("label",{children:["数据库",u.jsx(hr,{value:v,placeholder:"请选择具体数据库",disabled:s&&!f||!!le,options:W.map(ee=>({value:ee.id,label:ee.name})),onChange:te})]}),u.jsxs("label",{children:["View",u.jsx(hr,{value:E,placeholder:le==="schema"?"正在读取 View…":"请选择 View",disabled:!v||!!le,options:x.map(ee=>({value:ee.id,label:ee.name})),onChange:ee=>{C(ee),G(void 0)}})]}),ye&&u.jsxs(u.Fragment,{children:[u.jsxs("label",{children:["日期字段",u.jsx(hr,{value:k,placeholder:"请选择日期字段",disabled:!A.length||!!le,options:R.map(ee=>({value:ee.id,label:ee.name})),onChange:V})]}),u.jsxs("label",{children:["累计字段",u.jsx(hr,{value:_,placeholder:"可选择数值字段",disabled:!A.length||!!le,options:ae.map(ee=>({value:ee.id,label:ee.name})),onChange:L})]}),u.jsxs("label",{children:["软件查询口径",u.jsx(hr,{value:Y,placeholder:"请选择日期口径",disabled:!!le,options:[{value:"day",label:"指定日期"},{value:"week",label:"指定日期范围"},{value:"month",label:"月初至指定日期"},{value:"year",label:"年初至指定日期"}],onChange:ee=>{N(ee),G(void 0)}})]}),!Q&&u.jsxs("label",{children:["指定日期",u.jsx(ud,{value:M,onChange:X})]}),Q&&u.jsxs(u.Fragment,{children:[u.jsxs("label",{children:["开始日期",u.jsx(ud,{value:F,onChange:ne})]}),u.jsxs("label",{children:["结束日期",u.jsx(ud,{value:ie,onChange:pe})]})]})]})]}),u.jsx("div",{className:"database-query-actions",children:u.jsxs("button",{className:"primary",disabled:!ue||!!le,onClick:T,children:[le==="query"?u.jsx(qa,{className:"spin"}):u.jsx(UC,{}),le==="query"?"正在查询…":"执行查询"]})})]}),U&&u.jsxs("div",{className:"notice error",role:"alert",children:[u.jsx(_C,{}),u.jsxs("div",{children:[u.jsx("strong",{children:"查询失败"}),u.jsx("span",{children:U})]})]}),K?u.jsxs("section",{className:"database-result",children:[u.jsxs("div",{className:"database-result-head",children:[u.jsxs("div",{children:[u.jsxs("h2",{children:[K.sourceName," · ",K.datasetName]}),u.jsx("p",{children:ye?`${K.startDate} ～ ${K.endDate}`:"完整 View 结果"})]}),u.jsxs("dl",{children:[u.jsxs("div",{children:[u.jsxs("dt",{children:[u.jsx(YC,{}),"命中记录"]}),u.jsx("dd",{children:K.recordCount})]}),ye&&u.jsxs("div",{children:[u.jsxs("dt",{children:[u.jsx(PC,{}),(oe==null?void 0:oe.name)||"累计值"]}),u.jsx("dd",{children:K.total??"—"})]})]})]}),u.jsx("div",{className:"database-table-wrap",children:u.jsxs("table",{children:[u.jsx("thead",{children:u.jsx("tr",{children:re.map(ee=>u.jsxs("th",{children:[ee.name,u.jsx("small",{children:ee.type})]},ee.id))})}),u.jsx("tbody",{children:K.records.map(ee=>u.jsx("tr",{children:re.map(he=>u.jsx("td",{children:AN(ee.values[he.id])},he.id))},ee.id))})]})}),K.truncated&&u.jsx("p",{className:"database-truncated",children:"结果仅展示前 200 条，命中数量和累计值按全部记录计算。"})]}):!le&&!U&&u.jsxs("section",{className:"database-empty",children:[u.jsx(Ud,{}),u.jsx("h2",{children:s?"选择业务板块、数据库和 View 后执行查询":"选择数据库和 View 后执行查询"}),u.jsx("p",{children:"普通 View 显示完整结果；“本年截止今日”可进一步选择日期口径。所有操作均为只读。"})]})]})}function AN(n){return n==null||n===""?"—":typeof n=="boolean"?n?"是":"否":typeof n=="number"?n.toLocaleString("zh-CN",{maximumFractionDigits:2}):String(n)}function DN(){const[n,a]=S.useState(()=>window.location.search),[s,o]=S.useState(!1);S.useEffect(()=>{const j=()=>a(window.location.search);return window.addEventListener("popstate",j),()=>window.removeEventListener("popstate",j)},[]);const c=new URLSearchParams(n),h=c.get("route"),f=h!=null&&h.startsWith("navigation:")||h==="daily-weld"||h==="production-message"||h==="database-viewer"||h==="daily-report"||h==="report-center"?h:"production-message",m=c.get("navigation")||"",p=qx();S.useEffect(()=>{AC(f,m)},[f,m]);const g=j=>xe("app.navigateNative",{tag:j}).catch(()=>{}),v=f.startsWith("navigation:")?f.slice(11):f,b=f.startsWith("navigation:");S.useEffect(()=>(document.body.classList.toggle("settings-over-native",b&&s),()=>document.body.classList.remove("settings-over-native")),[b,s]);const x=()=>{o(!1),window.dispatchEvent(new Event("production-settings-updated")),xe("settings.close").catch(()=>{})};return u.jsxs("div",{className:`desktop-shell ${b&&s?"settings-over-native":""}`,children:[u.jsx("div",{className:"production-message-demo desktop-shell-navigation",children:u.jsx(rN,{active:v,navigate:g,openSettings:()=>o(!0)})}),u.jsx("div",{className:`desktop-shell-content ${b?"desktop-shell-content-native":""}`,children:b?u.jsx("div",{className:"native-content-slot","aria-hidden":"true"}):f==="production-message"||f==="daily-weld"?u.jsx("div",{className:"production-message-demo production-message-content",children:f==="daily-weld"?u.jsx(eN,{openSettings:()=>o(!0)}):u.jsx(uN,{})}):u.jsx("div",{className:"app-shell",children:u.jsx("main",{children:u.jsx(gT,{mode:"wait",children:u.jsx(Lf.div,{initial:p?!1:{opacity:0,y:8},animate:{opacity:1,y:0},exit:p?void 0:{opacity:0,y:-6},transition:{duration:.2},children:f==="database-viewer"?u.jsx(CN,{}):f==="daily-report"?u.jsx(ZD,{openSettings:()=>o(!0)}):u.jsx(hN,{})},f)})})})}),u.jsx(mN,{open:s,onClose:x})]})}Cw.createRoot(document.getElementById("root")).render(u.jsx(nb.StrictMode,{children:u.jsx(DN,{})}));
