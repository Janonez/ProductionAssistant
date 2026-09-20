function Ej(n,a){for(var s=0;s<a.length;s++){const l=a[s];if(typeof l!="string"&&!Array.isArray(l)){for(const c in l)if(c!=="default"&&!(c in n)){const h=Object.getOwnPropertyDescriptor(l,c);h&&Object.defineProperty(n,c,h.get?h:{enumerable:!0,get:()=>l[c]})}}}return Object.freeze(Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}))}(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))l(c);new MutationObserver(c=>{for(const h of c)if(h.type==="childList")for(const d of h.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&l(d)}).observe(document,{childList:!0,subtree:!0});function s(c){const h={};return c.integrity&&(h.integrity=c.integrity),c.referrerPolicy&&(h.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?h.credentials="include":c.crossOrigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function l(c){if(c.ep)return;c.ep=!0;const h=s(c);fetch(c.href,h)}})();function ux(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var $u={exports:{}},Fi={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ny;function Tj(){if(ny)return Fi;ny=1;var n=Symbol.for("react.transitional.element"),a=Symbol.for("react.fragment");function s(l,c,h){var d=null;if(h!==void 0&&(d=""+h),c.key!==void 0&&(d=""+c.key),"key"in c){h={};for(var m in c)m!=="key"&&(h[m]=c[m])}else h=c;return c=h.ref,{$$typeof:n,type:l,key:d,ref:c!==void 0?c:null,props:h}}return Fi.Fragment=a,Fi.jsx=s,Fi.jsxs=s,Fi}var ry;function Cj(){return ry||(ry=1,$u.exports=Tj()),$u.exports}var o=Cj(),Ku={exports:{}},je={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ay;function Nj(){if(ay)return je;ay=1;var n=Symbol.for("react.transitional.element"),a=Symbol.for("react.portal"),s=Symbol.for("react.fragment"),l=Symbol.for("react.strict_mode"),c=Symbol.for("react.profiler"),h=Symbol.for("react.consumer"),d=Symbol.for("react.context"),m=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),g=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),x=Symbol.for("react.activity"),b=Symbol.iterator;function E(C){return C===null||typeof C!="object"?null:(C=b&&C[b]||C["@@iterator"],typeof C=="function"?C:null)}var w={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},N=Object.assign,T={};function A(C,V,I){this.props=C,this.context=V,this.refs=T,this.updater=I||w}A.prototype.isReactComponent={},A.prototype.setState=function(C,V){if(typeof C!="object"&&typeof C!="function"&&C!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,C,V,"setState")},A.prototype.forceUpdate=function(C){this.updater.enqueueForceUpdate(this,C,"forceUpdate")};function k(){}k.prototype=A.prototype;function _(C,V,I){this.props=C,this.context=V,this.refs=T,this.updater=I||w}var z=_.prototype=new k;z.constructor=_,N(z,A.prototype),z.isPureReactComponent=!0;var U=Array.isArray;function L(){}var D={H:null,A:null,T:null,S:null},H=Object.prototype.hasOwnProperty;function M(C,V,I){var ne=I.ref;return{$$typeof:n,type:C,key:V,ref:ne!==void 0?ne:null,props:I}}function O(C,V){return M(C.type,V,C.props)}function $(C){return typeof C=="object"&&C!==null&&C.$$typeof===n}function Z(C){var V={"=":"=0",":":"=2"};return"$"+C.replace(/[=:]/g,function(I){return V[I]})}var ue=/\/+/g;function de(C,V){return typeof C=="object"&&C!==null&&C.key!=null?Z(""+C.key):V.toString(36)}function ye(C){switch(C.status){case"fulfilled":return C.value;case"rejected":throw C.reason;default:switch(typeof C.status=="string"?C.then(L,L):(C.status="pending",C.then(function(V){C.status==="pending"&&(C.status="fulfilled",C.value=V)},function(V){C.status==="pending"&&(C.status="rejected",C.reason=V)})),C.status){case"fulfilled":return C.value;case"rejected":throw C.reason}}throw C}function Y(C,V,I,ne,oe){var me=typeof C;(me==="undefined"||me==="boolean")&&(C=null);var be=!1;if(C===null)be=!0;else switch(me){case"bigint":case"string":case"number":be=!0;break;case"object":switch(C.$$typeof){case n:case a:be=!0;break;case v:return be=C._init,Y(be(C._payload),V,I,ne,oe)}}if(be)return oe=oe(C),be=ne===""?"."+de(C,0):ne,U(oe)?(I="",be!=null&&(I=be.replace(ue,"$&/")+"/"),Y(oe,V,I,"",function(ce){return ce})):oe!=null&&($(oe)&&(oe=O(oe,I+(oe.key==null||C&&C.key===oe.key?"":(""+oe.key).replace(ue,"$&/")+"/")+be)),V.push(oe)),1;be=0;var ie=ne===""?".":ne+":";if(U(C))for(var J=0;J<C.length;J++)ne=C[J],me=ie+de(ne,J),be+=Y(ne,V,I,me,oe);else if(J=E(C),typeof J=="function")for(C=J.call(C),J=0;!(ne=C.next()).done;)ne=ne.value,me=ie+de(ne,J++),be+=Y(ne,V,I,me,oe);else if(me==="object"){if(typeof C.then=="function")return Y(ye(C),V,I,ne,oe);throw V=String(C),Error("Objects are not valid as a React child (found: "+(V==="[object Object]"?"object with keys {"+Object.keys(C).join(", ")+"}":V)+"). If you meant to render a collection of children, use an array instead.")}return be}function le(C,V,I){if(C==null)return C;var ne=[],oe=0;return Y(C,ne,"","",function(me){return V.call(I,me,oe++)}),ne}function Q(C){if(C._status===-1){var V=C._result;V=V(),V.then(function(I){(C._status===0||C._status===-1)&&(C._status=1,C._result=I)},function(I){(C._status===0||C._status===-1)&&(C._status=2,C._result=I)}),C._status===-1&&(C._status=0,C._result=V)}if(C._status===1)return C._result.default;throw C._result}var G=typeof reportError=="function"?reportError:function(C){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var V=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof C=="object"&&C!==null&&typeof C.message=="string"?String(C.message):String(C),error:C});if(!window.dispatchEvent(V))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",C);return}console.error(C)},ae={map:le,forEach:function(C,V,I){le(C,function(){V.apply(this,arguments)},I)},count:function(C){var V=0;return le(C,function(){V++}),V},toArray:function(C){return le(C,function(V){return V})||[]},only:function(C){if(!$(C))throw Error("React.Children.only expected to receive a single React element child.");return C}};return je.Activity=x,je.Children=ae,je.Component=A,je.Fragment=s,je.Profiler=c,je.PureComponent=_,je.StrictMode=l,je.Suspense=p,je.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=D,je.__COMPILER_RUNTIME={__proto__:null,c:function(C){return D.H.useMemoCache(C)}},je.cache=function(C){return function(){return C.apply(null,arguments)}},je.cacheSignal=function(){return null},je.cloneElement=function(C,V,I){if(C==null)throw Error("The argument must be a React element, but you passed "+C+".");var ne=N({},C.props),oe=C.key;if(V!=null)for(me in V.key!==void 0&&(oe=""+V.key),V)!H.call(V,me)||me==="key"||me==="__self"||me==="__source"||me==="ref"&&V.ref===void 0||(ne[me]=V[me]);var me=arguments.length-2;if(me===1)ne.children=I;else if(1<me){for(var be=Array(me),ie=0;ie<me;ie++)be[ie]=arguments[ie+2];ne.children=be}return M(C.type,oe,ne)},je.createContext=function(C){return C={$$typeof:d,_currentValue:C,_currentValue2:C,_threadCount:0,Provider:null,Consumer:null},C.Provider=C,C.Consumer={$$typeof:h,_context:C},C},je.createElement=function(C,V,I){var ne,oe={},me=null;if(V!=null)for(ne in V.key!==void 0&&(me=""+V.key),V)H.call(V,ne)&&ne!=="key"&&ne!=="__self"&&ne!=="__source"&&(oe[ne]=V[ne]);var be=arguments.length-2;if(be===1)oe.children=I;else if(1<be){for(var ie=Array(be),J=0;J<be;J++)ie[J]=arguments[J+2];oe.children=ie}if(C&&C.defaultProps)for(ne in be=C.defaultProps,be)oe[ne]===void 0&&(oe[ne]=be[ne]);return M(C,me,oe)},je.createRef=function(){return{current:null}},je.forwardRef=function(C){return{$$typeof:m,render:C}},je.isValidElement=$,je.lazy=function(C){return{$$typeof:v,_payload:{_status:-1,_result:C},_init:Q}},je.memo=function(C,V){return{$$typeof:g,type:C,compare:V===void 0?null:V}},je.startTransition=function(C){var V=D.T,I={};D.T=I;try{var ne=C(),oe=D.S;oe!==null&&oe(I,ne),typeof ne=="object"&&ne!==null&&typeof ne.then=="function"&&ne.then(L,G)}catch(me){G(me)}finally{V!==null&&I.types!==null&&(V.types=I.types),D.T=V}},je.unstable_useCacheRefresh=function(){return D.H.useCacheRefresh()},je.use=function(C){return D.H.use(C)},je.useActionState=function(C,V,I){return D.H.useActionState(C,V,I)},je.useCallback=function(C,V){return D.H.useCallback(C,V)},je.useContext=function(C){return D.H.useContext(C)},je.useDebugValue=function(){},je.useDeferredValue=function(C,V){return D.H.useDeferredValue(C,V)},je.useEffect=function(C,V){return D.H.useEffect(C,V)},je.useEffectEvent=function(C){return D.H.useEffectEvent(C)},je.useId=function(){return D.H.useId()},je.useImperativeHandle=function(C,V,I){return D.H.useImperativeHandle(C,V,I)},je.useInsertionEffect=function(C,V){return D.H.useInsertionEffect(C,V)},je.useLayoutEffect=function(C,V){return D.H.useLayoutEffect(C,V)},je.useMemo=function(C,V){return D.H.useMemo(C,V)},je.useOptimistic=function(C,V){return D.H.useOptimistic(C,V)},je.useReducer=function(C,V,I){return D.H.useReducer(C,V,I)},je.useRef=function(C){return D.H.useRef(C)},je.useState=function(C){return D.H.useState(C)},je.useSyncExternalStore=function(C,V,I){return D.H.useSyncExternalStore(C,V,I)},je.useTransition=function(){return D.H.useTransition()},je.version="19.2.8",je}var iy;function ff(){return iy||(iy=1,Ku.exports=Nj()),Ku.exports}var S=ff();const dx=ux(S),ps=Ej({__proto__:null,default:dx},[S]);var Zu={exports:{}},Xi={},Qu={exports:{}},Ju={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var sy;function Dj(){return sy||(sy=1,(function(n){function a(Y,le){var Q=Y.length;Y.push(le);e:for(;0<Q;){var G=Q-1>>>1,ae=Y[G];if(0<c(ae,le))Y[G]=le,Y[Q]=ae,Q=G;else break e}}function s(Y){return Y.length===0?null:Y[0]}function l(Y){if(Y.length===0)return null;var le=Y[0],Q=Y.pop();if(Q!==le){Y[0]=Q;e:for(var G=0,ae=Y.length,C=ae>>>1;G<C;){var V=2*(G+1)-1,I=Y[V],ne=V+1,oe=Y[ne];if(0>c(I,Q))ne<ae&&0>c(oe,I)?(Y[G]=oe,Y[ne]=Q,G=ne):(Y[G]=I,Y[V]=Q,G=V);else if(ne<ae&&0>c(oe,Q))Y[G]=oe,Y[ne]=Q,G=ne;else break e}}return le}function c(Y,le){var Q=Y.sortIndex-le.sortIndex;return Q!==0?Q:Y.id-le.id}if(n.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var h=performance;n.unstable_now=function(){return h.now()}}else{var d=Date,m=d.now();n.unstable_now=function(){return d.now()-m}}var p=[],g=[],v=1,x=null,b=3,E=!1,w=!1,N=!1,T=!1,A=typeof setTimeout=="function"?setTimeout:null,k=typeof clearTimeout=="function"?clearTimeout:null,_=typeof setImmediate<"u"?setImmediate:null;function z(Y){for(var le=s(g);le!==null;){if(le.callback===null)l(g);else if(le.startTime<=Y)l(g),le.sortIndex=le.expirationTime,a(p,le);else break;le=s(g)}}function U(Y){if(N=!1,z(Y),!w)if(s(p)!==null)w=!0,L||(L=!0,Z());else{var le=s(g);le!==null&&ye(U,le.startTime-Y)}}var L=!1,D=-1,H=5,M=-1;function O(){return T?!0:!(n.unstable_now()-M<H)}function $(){if(T=!1,L){var Y=n.unstable_now();M=Y;var le=!0;try{e:{w=!1,N&&(N=!1,k(D),D=-1),E=!0;var Q=b;try{t:{for(z(Y),x=s(p);x!==null&&!(x.expirationTime>Y&&O());){var G=x.callback;if(typeof G=="function"){x.callback=null,b=x.priorityLevel;var ae=G(x.expirationTime<=Y);if(Y=n.unstable_now(),typeof ae=="function"){x.callback=ae,z(Y),le=!0;break t}x===s(p)&&l(p),z(Y)}else l(p);x=s(p)}if(x!==null)le=!0;else{var C=s(g);C!==null&&ye(U,C.startTime-Y),le=!1}}break e}finally{x=null,b=Q,E=!1}le=void 0}}finally{le?Z():L=!1}}}var Z;if(typeof _=="function")Z=function(){_($)};else if(typeof MessageChannel<"u"){var ue=new MessageChannel,de=ue.port2;ue.port1.onmessage=$,Z=function(){de.postMessage(null)}}else Z=function(){A($,0)};function ye(Y,le){D=A(function(){Y(n.unstable_now())},le)}n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(Y){Y.callback=null},n.unstable_forceFrameRate=function(Y){0>Y||125<Y?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):H=0<Y?Math.floor(1e3/Y):5},n.unstable_getCurrentPriorityLevel=function(){return b},n.unstable_next=function(Y){switch(b){case 1:case 2:case 3:var le=3;break;default:le=b}var Q=b;b=le;try{return Y()}finally{b=Q}},n.unstable_requestPaint=function(){T=!0},n.unstable_runWithPriority=function(Y,le){switch(Y){case 1:case 2:case 3:case 4:case 5:break;default:Y=3}var Q=b;b=Y;try{return le()}finally{b=Q}},n.unstable_scheduleCallback=function(Y,le,Q){var G=n.unstable_now();switch(typeof Q=="object"&&Q!==null?(Q=Q.delay,Q=typeof Q=="number"&&0<Q?G+Q:G):Q=G,Y){case 1:var ae=-1;break;case 2:ae=250;break;case 5:ae=1073741823;break;case 4:ae=1e4;break;default:ae=5e3}return ae=Q+ae,Y={id:v++,callback:le,priorityLevel:Y,startTime:Q,expirationTime:ae,sortIndex:-1},Q>G?(Y.sortIndex=Q,a(g,Y),s(p)===null&&Y===s(g)&&(N?(k(D),D=-1):N=!0,ye(U,Q-G))):(Y.sortIndex=ae,a(p,Y),w||E||(w=!0,L||(L=!0,Z()))),Y},n.unstable_shouldYield=O,n.unstable_wrapCallback=function(Y){var le=b;return function(){var Q=b;b=le;try{return Y.apply(this,arguments)}finally{b=Q}}}})(Ju)),Ju}var ly;function Aj(){return ly||(ly=1,Qu.exports=Dj()),Qu.exports}var Wu={exports:{}},bt={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var oy;function kj(){if(oy)return bt;oy=1;var n=ff();function a(p){var g="https://react.dev/errors/"+p;if(1<arguments.length){g+="?args[]="+encodeURIComponent(arguments[1]);for(var v=2;v<arguments.length;v++)g+="&args[]="+encodeURIComponent(arguments[v])}return"Minified React error #"+p+"; visit "+g+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function s(){}var l={d:{f:s,r:function(){throw Error(a(522))},D:s,C:s,L:s,m:s,X:s,S:s,M:s},p:0,findDOMNode:null},c=Symbol.for("react.portal");function h(p,g,v){var x=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:c,key:x==null?null:""+x,children:p,containerInfo:g,implementation:v}}var d=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function m(p,g){if(p==="font")return"";if(typeof g=="string")return g==="use-credentials"?g:""}return bt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=l,bt.createPortal=function(p,g){var v=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!g||g.nodeType!==1&&g.nodeType!==9&&g.nodeType!==11)throw Error(a(299));return h(p,g,null,v)},bt.flushSync=function(p){var g=d.T,v=l.p;try{if(d.T=null,l.p=2,p)return p()}finally{d.T=g,l.p=v,l.d.f()}},bt.preconnect=function(p,g){typeof p=="string"&&(g?(g=g.crossOrigin,g=typeof g=="string"?g==="use-credentials"?g:"":void 0):g=null,l.d.C(p,g))},bt.prefetchDNS=function(p){typeof p=="string"&&l.d.D(p)},bt.preinit=function(p,g){if(typeof p=="string"&&g&&typeof g.as=="string"){var v=g.as,x=m(v,g.crossOrigin),b=typeof g.integrity=="string"?g.integrity:void 0,E=typeof g.fetchPriority=="string"?g.fetchPriority:void 0;v==="style"?l.d.S(p,typeof g.precedence=="string"?g.precedence:void 0,{crossOrigin:x,integrity:b,fetchPriority:E}):v==="script"&&l.d.X(p,{crossOrigin:x,integrity:b,fetchPriority:E,nonce:typeof g.nonce=="string"?g.nonce:void 0})}},bt.preinitModule=function(p,g){if(typeof p=="string")if(typeof g=="object"&&g!==null){if(g.as==null||g.as==="script"){var v=m(g.as,g.crossOrigin);l.d.M(p,{crossOrigin:v,integrity:typeof g.integrity=="string"?g.integrity:void 0,nonce:typeof g.nonce=="string"?g.nonce:void 0})}}else g==null&&l.d.M(p)},bt.preload=function(p,g){if(typeof p=="string"&&typeof g=="object"&&g!==null&&typeof g.as=="string"){var v=g.as,x=m(v,g.crossOrigin);l.d.L(p,v,{crossOrigin:x,integrity:typeof g.integrity=="string"?g.integrity:void 0,nonce:typeof g.nonce=="string"?g.nonce:void 0,type:typeof g.type=="string"?g.type:void 0,fetchPriority:typeof g.fetchPriority=="string"?g.fetchPriority:void 0,referrerPolicy:typeof g.referrerPolicy=="string"?g.referrerPolicy:void 0,imageSrcSet:typeof g.imageSrcSet=="string"?g.imageSrcSet:void 0,imageSizes:typeof g.imageSizes=="string"?g.imageSizes:void 0,media:typeof g.media=="string"?g.media:void 0})}},bt.preloadModule=function(p,g){if(typeof p=="string")if(g){var v=m(g.as,g.crossOrigin);l.d.m(p,{as:typeof g.as=="string"&&g.as!=="script"?g.as:void 0,crossOrigin:v,integrity:typeof g.integrity=="string"?g.integrity:void 0})}else l.d.m(p)},bt.requestFormReset=function(p){l.d.r(p)},bt.unstable_batchedUpdates=function(p,g){return p(g)},bt.useFormState=function(p,g,v){return d.H.useFormState(p,g,v)},bt.useFormStatus=function(){return d.H.useHostTransitionStatus()},bt.version="19.2.8",bt}var cy;function fx(){if(cy)return Wu.exports;cy=1;function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(a){console.error(a)}}return n(),Wu.exports=kj(),Wu.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var uy;function Mj(){if(uy)return Xi;uy=1;var n=Aj(),a=ff(),s=fx();function l(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var r=2;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function c(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function h(e){var t=e,r=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(r=t.return),e=t.return;while(e)}return t.tag===3?r:null}function d(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function m(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function p(e){if(h(e)!==e)throw Error(l(188))}function g(e){var t=e.alternate;if(!t){if(t=h(e),t===null)throw Error(l(188));return t!==e?null:e}for(var r=e,i=t;;){var u=r.return;if(u===null)break;var f=u.alternate;if(f===null){if(i=u.return,i!==null){r=i;continue}break}if(u.child===f.child){for(f=u.child;f;){if(f===r)return p(u),e;if(f===i)return p(u),t;f=f.sibling}throw Error(l(188))}if(r.return!==i.return)r=u,i=f;else{for(var y=!1,j=u.child;j;){if(j===r){y=!0,r=u,i=f;break}if(j===i){y=!0,i=u,r=f;break}j=j.sibling}if(!y){for(j=f.child;j;){if(j===r){y=!0,r=f,i=u;break}if(j===i){y=!0,i=f,r=u;break}j=j.sibling}if(!y)throw Error(l(189))}}if(r.alternate!==i)throw Error(l(190))}if(r.tag!==3)throw Error(l(188));return r.stateNode.current===r?e:t}function v(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=v(e),t!==null)return t;e=e.sibling}return null}var x=Object.assign,b=Symbol.for("react.element"),E=Symbol.for("react.transitional.element"),w=Symbol.for("react.portal"),N=Symbol.for("react.fragment"),T=Symbol.for("react.strict_mode"),A=Symbol.for("react.profiler"),k=Symbol.for("react.consumer"),_=Symbol.for("react.context"),z=Symbol.for("react.forward_ref"),U=Symbol.for("react.suspense"),L=Symbol.for("react.suspense_list"),D=Symbol.for("react.memo"),H=Symbol.for("react.lazy"),M=Symbol.for("react.activity"),O=Symbol.for("react.memo_cache_sentinel"),$=Symbol.iterator;function Z(e){return e===null||typeof e!="object"?null:(e=$&&e[$]||e["@@iterator"],typeof e=="function"?e:null)}var ue=Symbol.for("react.client.reference");function de(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===ue?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case N:return"Fragment";case A:return"Profiler";case T:return"StrictMode";case U:return"Suspense";case L:return"SuspenseList";case M:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case w:return"Portal";case _:return e.displayName||"Context";case k:return(e._context.displayName||"Context")+".Consumer";case z:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case D:return t=e.displayName||null,t!==null?t:de(e.type)||"Memo";case H:t=e._payload,e=e._init;try{return de(e(t))}catch{}}return null}var ye=Array.isArray,Y=a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,le=s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Q={pending:!1,data:null,method:null,action:null},G=[],ae=-1;function C(e){return{current:e}}function V(e){0>ae||(e.current=G[ae],G[ae]=null,ae--)}function I(e,t){ae++,G[ae]=e.current,e.current=t}var ne=C(null),oe=C(null),me=C(null),be=C(null);function ie(e,t){switch(I(me,t),I(oe,e),I(ne,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Tg(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Tg(t),e=Cg(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}V(ne),I(ne,e)}function J(){V(ne),V(oe),V(me)}function ce(e){e.memoizedState!==null&&I(be,e);var t=ne.current,r=Cg(t,e.type);t!==r&&(I(oe,e),I(ne,r))}function te(e){oe.current===e&&(V(ne),V(oe)),be.current===e&&(V(be),qi._currentValue=Q)}var he,we;function Ce(e){if(he===void 0)try{throw Error()}catch(r){var t=r.stack.trim().match(/\n( *(at )?)/);he=t&&t[1]||"",we=-1<r.stack.indexOf(`
    at`)?" (<anonymous>)":-1<r.stack.indexOf("@")?"@unknown:0:0":""}return`
`+he+e+we}var Ve=!1;function Xe(e,t){if(!e||Ve)return"";Ve=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(t){var re=function(){throw Error()};if(Object.defineProperty(re.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(re,[])}catch(K){var X=K}Reflect.construct(e,[],re)}else{try{re.call()}catch(K){X=K}e.call(re.prototype)}}else{try{throw Error()}catch(K){X=K}(re=e())&&typeof re.catch=="function"&&re.catch(function(){})}}catch(K){if(K&&X&&typeof K.stack=="string")return[K.stack,X.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var f=i.DetermineComponentFrameRoot(),y=f[0],j=f[1];if(y&&j){var R=y.split(`
`),F=j.split(`
`);for(u=i=0;i<R.length&&!R[i].includes("DetermineComponentFrameRoot");)i++;for(;u<F.length&&!F[u].includes("DetermineComponentFrameRoot");)u++;if(i===R.length||u===F.length)for(i=R.length-1,u=F.length-1;1<=i&&0<=u&&R[i]!==F[u];)u--;for(;1<=i&&0<=u;i--,u--)if(R[i]!==F[u]){if(i!==1||u!==1)do if(i--,u--,0>u||R[i]!==F[u]){var W=`
`+R[i].replace(" at new "," at ");return e.displayName&&W.includes("<anonymous>")&&(W=W.replace("<anonymous>",e.displayName)),W}while(1<=i&&0<=u);break}}}finally{Ve=!1,Error.prepareStackTrace=r}return(r=e?e.displayName||e.name:"")?Ce(r):""}function ct(e,t){switch(e.tag){case 26:case 27:case 5:return Ce(e.type);case 16:return Ce("Lazy");case 13:return e.child!==t&&t!==null?Ce("Suspense Fallback"):Ce("Suspense");case 19:return Ce("SuspenseList");case 0:case 15:return Xe(e.type,!1);case 11:return Xe(e.type.render,!1);case 1:return Xe(e.type,!0);case 31:return Ce("Activity");default:return""}}function se(e){try{var t="",r=null;do t+=ct(e,r),r=e,e=e.return;while(e);return t}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var Ne=Object.prototype.hasOwnProperty,sn=n.unstable_scheduleCallback,zo=n.unstable_cancelCallback,n1=n.unstable_shouldYield,r1=n.unstable_requestPaint,Rt=n.unstable_now,a1=n.unstable_getCurrentPriorityLevel,rh=n.unstable_ImmediatePriority,ah=n.unstable_UserBlockingPriority,Ss=n.unstable_NormalPriority,i1=n.unstable_LowPriority,ih=n.unstable_IdlePriority,s1=n.log,l1=n.unstable_setDisableYieldValue,Ia=null,Ot=null;function $n(e){if(typeof s1=="function"&&l1(e),Ot&&typeof Ot.setStrictMode=="function")try{Ot.setStrictMode(Ia,e)}catch{}}var zt=Math.clz32?Math.clz32:u1,o1=Math.log,c1=Math.LN2;function u1(e){return e>>>=0,e===0?32:31-(o1(e)/c1|0)|0}var js=256,ws=262144,Es=4194304;function Tr(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Ts(e,t,r){var i=e.pendingLanes;if(i===0)return 0;var u=0,f=e.suspendedLanes,y=e.pingedLanes;e=e.warmLanes;var j=i&134217727;return j!==0?(i=j&~f,i!==0?u=Tr(i):(y&=j,y!==0?u=Tr(y):r||(r=j&~e,r!==0&&(u=Tr(r))))):(j=i&~f,j!==0?u=Tr(j):y!==0?u=Tr(y):r||(r=i&~e,r!==0&&(u=Tr(r)))),u===0?0:t!==0&&t!==u&&(t&f)===0&&(f=u&-u,r=t&-t,f>=r||f===32&&(r&4194048)!==0)?t:u}function ei(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function d1(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function sh(){var e=Es;return Es<<=1,(Es&62914560)===0&&(Es=4194304),e}function _o(e){for(var t=[],r=0;31>r;r++)t.push(e);return t}function ti(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function f1(e,t,r,i,u,f){var y=e.pendingLanes;e.pendingLanes=r,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=r,e.entangledLanes&=r,e.errorRecoveryDisabledLanes&=r,e.shellSuspendCounter=0;var j=e.entanglements,R=e.expirationTimes,F=e.hiddenUpdates;for(r=y&~r;0<r;){var W=31-zt(r),re=1<<W;j[W]=0,R[W]=-1;var X=F[W];if(X!==null)for(F[W]=null,W=0;W<X.length;W++){var K=X[W];K!==null&&(K.lane&=-536870913)}r&=~re}i!==0&&lh(e,i,0),f!==0&&u===0&&e.tag!==0&&(e.suspendedLanes|=f&~(y&~t))}function lh(e,t,r){e.pendingLanes|=t,e.suspendedLanes&=~t;var i=31-zt(t);e.entangledLanes|=t,e.entanglements[i]=e.entanglements[i]|1073741824|r&261930}function oh(e,t){var r=e.entangledLanes|=t;for(e=e.entanglements;r;){var i=31-zt(r),u=1<<i;u&t|e[i]&t&&(e[i]|=t),r&=~u}}function ch(e,t){var r=t&-t;return r=(r&42)!==0?1:Vo(r),(r&(e.suspendedLanes|t))!==0?0:r}function Vo(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Bo(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function uh(){var e=le.p;return e!==0?e:(e=window.event,e===void 0?32:Zg(e.type))}function dh(e,t){var r=le.p;try{return le.p=e,t()}finally{le.p=r}}var Kn=Math.random().toString(36).slice(2),ht="__reactFiber$"+Kn,Tt="__reactProps$"+Kn,Jr="__reactContainer$"+Kn,Lo="__reactEvents$"+Kn,h1="__reactListeners$"+Kn,m1="__reactHandles$"+Kn,fh="__reactResources$"+Kn,ni="__reactMarker$"+Kn;function Uo(e){delete e[ht],delete e[Tt],delete e[Lo],delete e[h1],delete e[m1]}function Wr(e){var t=e[ht];if(t)return t;for(var r=e.parentNode;r;){if(t=r[Jr]||r[ht]){if(r=t.alternate,t.child!==null||r!==null&&r.child!==null)for(e=Og(e);e!==null;){if(r=e[ht])return r;e=Og(e)}return t}e=r,r=e.parentNode}return null}function Ir(e){if(e=e[ht]||e[Jr]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function ri(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(l(33))}function ea(e){var t=e[fh];return t||(t=e[fh]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function ut(e){e[ni]=!0}var hh=new Set,mh={};function Cr(e,t){ta(e,t),ta(e+"Capture",t)}function ta(e,t){for(mh[e]=t,e=0;e<t.length;e++)hh.add(t[e])}var p1=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),ph={},gh={};function g1(e){return Ne.call(gh,e)?!0:Ne.call(ph,e)?!1:p1.test(e)?gh[e]=!0:(ph[e]=!0,!1)}function Cs(e,t,r){if(g1(t))if(r===null)e.removeAttribute(t);else{switch(typeof r){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var i=t.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+r)}}function Ns(e,t,r){if(r===null)e.removeAttribute(t);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+r)}}function Cn(e,t,r,i){if(i===null)e.removeAttribute(r);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(r);return}e.setAttributeNS(t,r,""+i)}}function Ft(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function yh(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function y1(e,t,r){var i=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var u=i.get,f=i.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return u.call(this)},set:function(y){r=""+y,f.call(this,y)}}),Object.defineProperty(e,t,{enumerable:i.enumerable}),{getValue:function(){return r},setValue:function(y){r=""+y},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Ho(e){if(!e._valueTracker){var t=yh(e)?"checked":"value";e._valueTracker=y1(e,t,""+e[t])}}function vh(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var r=t.getValue(),i="";return e&&(i=yh(e)?e.checked?"true":"false":e.value),e=i,e!==r?(t.setValue(e),!0):!1}function Ds(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var v1=/[\n"\\]/g;function Xt(e){return e.replace(v1,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function qo(e,t,r,i,u,f,y,j){e.name="",y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"?e.type=y:e.removeAttribute("type"),t!=null?y==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+Ft(t)):e.value!==""+Ft(t)&&(e.value=""+Ft(t)):y!=="submit"&&y!=="reset"||e.removeAttribute("value"),t!=null?Yo(e,y,Ft(t)):r!=null?Yo(e,y,Ft(r)):i!=null&&e.removeAttribute("value"),u==null&&f!=null&&(e.defaultChecked=!!f),u!=null&&(e.checked=u&&typeof u!="function"&&typeof u!="symbol"),j!=null&&typeof j!="function"&&typeof j!="symbol"&&typeof j!="boolean"?e.name=""+Ft(j):e.removeAttribute("name")}function xh(e,t,r,i,u,f,y,j){if(f!=null&&typeof f!="function"&&typeof f!="symbol"&&typeof f!="boolean"&&(e.type=f),t!=null||r!=null){if(!(f!=="submit"&&f!=="reset"||t!=null)){Ho(e);return}r=r!=null?""+Ft(r):"",t=t!=null?""+Ft(t):r,j||t===e.value||(e.value=t),e.defaultValue=t}i=i??u,i=typeof i!="function"&&typeof i!="symbol"&&!!i,e.checked=j?e.checked:!!i,e.defaultChecked=!!i,y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"&&(e.name=y),Ho(e)}function Yo(e,t,r){t==="number"&&Ds(e.ownerDocument)===e||e.defaultValue===""+r||(e.defaultValue=""+r)}function na(e,t,r,i){if(e=e.options,t){t={};for(var u=0;u<r.length;u++)t["$"+r[u]]=!0;for(r=0;r<e.length;r++)u=t.hasOwnProperty("$"+e[r].value),e[r].selected!==u&&(e[r].selected=u),u&&i&&(e[r].defaultSelected=!0)}else{for(r=""+Ft(r),t=null,u=0;u<e.length;u++){if(e[u].value===r){e[u].selected=!0,i&&(e[u].defaultSelected=!0);return}t!==null||e[u].disabled||(t=e[u])}t!==null&&(t.selected=!0)}}function bh(e,t,r){if(t!=null&&(t=""+Ft(t),t!==e.value&&(e.value=t),r==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=r!=null?""+Ft(r):""}function Sh(e,t,r,i){if(t==null){if(i!=null){if(r!=null)throw Error(l(92));if(ye(i)){if(1<i.length)throw Error(l(93));i=i[0]}r=i}r==null&&(r=""),t=r}r=Ft(t),e.defaultValue=r,i=e.textContent,i===r&&i!==""&&i!==null&&(e.value=i),Ho(e)}function ra(e,t){if(t){var r=e.firstChild;if(r&&r===e.lastChild&&r.nodeType===3){r.nodeValue=t;return}}e.textContent=t}var x1=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function jh(e,t,r){var i=t.indexOf("--")===0;r==null||typeof r=="boolean"||r===""?i?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":i?e.setProperty(t,r):typeof r!="number"||r===0||x1.has(t)?t==="float"?e.cssFloat=r:e[t]=(""+r).trim():e[t]=r+"px"}function wh(e,t,r){if(t!=null&&typeof t!="object")throw Error(l(62));if(e=e.style,r!=null){for(var i in r)!r.hasOwnProperty(i)||t!=null&&t.hasOwnProperty(i)||(i.indexOf("--")===0?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="");for(var u in t)i=t[u],t.hasOwnProperty(u)&&r[u]!==i&&jh(e,u,i)}else for(var f in t)t.hasOwnProperty(f)&&jh(e,f,t[f])}function Po(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var b1=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),S1=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function As(e){return S1.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Nn(){}var Go=null;function Fo(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var aa=null,ia=null;function Eh(e){var t=Ir(e);if(t&&(e=t.stateNode)){var r=e[Tt]||null;e:switch(e=t.stateNode,t.type){case"input":if(qo(e,r.value,r.defaultValue,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name),t=r.name,r.type==="radio"&&t!=null){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll('input[name="'+Xt(""+t)+'"][type="radio"]'),t=0;t<r.length;t++){var i=r[t];if(i!==e&&i.form===e.form){var u=i[Tt]||null;if(!u)throw Error(l(90));qo(i,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(t=0;t<r.length;t++)i=r[t],i.form===e.form&&vh(i)}break e;case"textarea":bh(e,r.value,r.defaultValue);break e;case"select":t=r.value,t!=null&&na(e,!!r.multiple,t,!1)}}}var Xo=!1;function Th(e,t,r){if(Xo)return e(t,r);Xo=!0;try{var i=e(t);return i}finally{if(Xo=!1,(aa!==null||ia!==null)&&(gl(),aa&&(t=aa,e=ia,ia=aa=null,Eh(t),e)))for(t=0;t<e.length;t++)Eh(e[t])}}function ai(e,t){var r=e.stateNode;if(r===null)return null;var i=r[Tt]||null;if(i===null)return null;r=i[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break e;default:e=!1}if(e)return null;if(r&&typeof r!="function")throw Error(l(231,t,typeof r));return r}var Dn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),$o=!1;if(Dn)try{var ii={};Object.defineProperty(ii,"passive",{get:function(){$o=!0}}),window.addEventListener("test",ii,ii),window.removeEventListener("test",ii,ii)}catch{$o=!1}var Zn=null,Ko=null,ks=null;function Ch(){if(ks)return ks;var e,t=Ko,r=t.length,i,u="value"in Zn?Zn.value:Zn.textContent,f=u.length;for(e=0;e<r&&t[e]===u[e];e++);var y=r-e;for(i=1;i<=y&&t[r-i]===u[f-i];i++);return ks=u.slice(e,1<i?1-i:void 0)}function Ms(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Rs(){return!0}function Nh(){return!1}function Ct(e){function t(r,i,u,f,y){this._reactName=r,this._targetInst=u,this.type=i,this.nativeEvent=f,this.target=y,this.currentTarget=null;for(var j in e)e.hasOwnProperty(j)&&(r=e[j],this[j]=r?r(f):f[j]);return this.isDefaultPrevented=(f.defaultPrevented!=null?f.defaultPrevented:f.returnValue===!1)?Rs:Nh,this.isPropagationStopped=Nh,this}return x(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=Rs)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=Rs)},persist:function(){},isPersistent:Rs}),t}var Nr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Os=Ct(Nr),si=x({},Nr,{view:0,detail:0}),j1=Ct(si),Zo,Qo,li,zs=x({},si,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Wo,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==li&&(li&&e.type==="mousemove"?(Zo=e.screenX-li.screenX,Qo=e.screenY-li.screenY):Qo=Zo=0,li=e),Zo)},movementY:function(e){return"movementY"in e?e.movementY:Qo}}),Dh=Ct(zs),w1=x({},zs,{dataTransfer:0}),E1=Ct(w1),T1=x({},si,{relatedTarget:0}),Jo=Ct(T1),C1=x({},Nr,{animationName:0,elapsedTime:0,pseudoElement:0}),N1=Ct(C1),D1=x({},Nr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),A1=Ct(D1),k1=x({},Nr,{data:0}),Ah=Ct(k1),M1={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},R1={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},O1={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function z1(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=O1[e])?!!t[e]:!1}function Wo(){return z1}var _1=x({},si,{key:function(e){if(e.key){var t=M1[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Ms(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?R1[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Wo,charCode:function(e){return e.type==="keypress"?Ms(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Ms(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),V1=Ct(_1),B1=x({},zs,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),kh=Ct(B1),L1=x({},si,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Wo}),U1=Ct(L1),H1=x({},Nr,{propertyName:0,elapsedTime:0,pseudoElement:0}),q1=Ct(H1),Y1=x({},zs,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),P1=Ct(Y1),G1=x({},Nr,{newState:0,oldState:0}),F1=Ct(G1),X1=[9,13,27,32],Io=Dn&&"CompositionEvent"in window,oi=null;Dn&&"documentMode"in document&&(oi=document.documentMode);var $1=Dn&&"TextEvent"in window&&!oi,Mh=Dn&&(!Io||oi&&8<oi&&11>=oi),Rh=" ",Oh=!1;function zh(e,t){switch(e){case"keyup":return X1.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function _h(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var sa=!1;function K1(e,t){switch(e){case"compositionend":return _h(t);case"keypress":return t.which!==32?null:(Oh=!0,Rh);case"textInput":return e=t.data,e===Rh&&Oh?null:e;default:return null}}function Z1(e,t){if(sa)return e==="compositionend"||!Io&&zh(e,t)?(e=Ch(),ks=Ko=Zn=null,sa=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Mh&&t.locale!=="ko"?null:t.data;default:return null}}var Q1={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Vh(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Q1[e.type]:t==="textarea"}function Bh(e,t,r,i){aa?ia?ia.push(i):ia=[i]:aa=i,t=wl(t,"onChange"),0<t.length&&(r=new Os("onChange","change",null,r,i),e.push({event:r,listeners:t}))}var ci=null,ui=null;function J1(e){xg(e,0)}function _s(e){var t=ri(e);if(vh(t))return e}function Lh(e,t){if(e==="change")return t}var Uh=!1;if(Dn){var ec;if(Dn){var tc="oninput"in document;if(!tc){var Hh=document.createElement("div");Hh.setAttribute("oninput","return;"),tc=typeof Hh.oninput=="function"}ec=tc}else ec=!1;Uh=ec&&(!document.documentMode||9<document.documentMode)}function qh(){ci&&(ci.detachEvent("onpropertychange",Yh),ui=ci=null)}function Yh(e){if(e.propertyName==="value"&&_s(ui)){var t=[];Bh(t,ui,e,Fo(e)),Th(J1,t)}}function W1(e,t,r){e==="focusin"?(qh(),ci=t,ui=r,ci.attachEvent("onpropertychange",Yh)):e==="focusout"&&qh()}function I1(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return _s(ui)}function eS(e,t){if(e==="click")return _s(t)}function tS(e,t){if(e==="input"||e==="change")return _s(t)}function nS(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var _t=typeof Object.is=="function"?Object.is:nS;function di(e,t){if(_t(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var r=Object.keys(e),i=Object.keys(t);if(r.length!==i.length)return!1;for(i=0;i<r.length;i++){var u=r[i];if(!Ne.call(t,u)||!_t(e[u],t[u]))return!1}return!0}function Ph(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Gh(e,t){var r=Ph(e);e=0;for(var i;r;){if(r.nodeType===3){if(i=e+r.textContent.length,e<=t&&i>=t)return{node:r,offset:t-e};e=i}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=Ph(r)}}function Fh(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Fh(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Xh(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Ds(e.document);t instanceof e.HTMLIFrameElement;){try{var r=typeof t.contentWindow.location.href=="string"}catch{r=!1}if(r)e=t.contentWindow;else break;t=Ds(e.document)}return t}function nc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var rS=Dn&&"documentMode"in document&&11>=document.documentMode,la=null,rc=null,fi=null,ac=!1;function $h(e,t,r){var i=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;ac||la==null||la!==Ds(i)||(i=la,"selectionStart"in i&&nc(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),fi&&di(fi,i)||(fi=i,i=wl(rc,"onSelect"),0<i.length&&(t=new Os("onSelect","select",null,t,r),e.push({event:t,listeners:i}),t.target=la)))}function Dr(e,t){var r={};return r[e.toLowerCase()]=t.toLowerCase(),r["Webkit"+e]="webkit"+t,r["Moz"+e]="moz"+t,r}var oa={animationend:Dr("Animation","AnimationEnd"),animationiteration:Dr("Animation","AnimationIteration"),animationstart:Dr("Animation","AnimationStart"),transitionrun:Dr("Transition","TransitionRun"),transitionstart:Dr("Transition","TransitionStart"),transitioncancel:Dr("Transition","TransitionCancel"),transitionend:Dr("Transition","TransitionEnd")},ic={},Kh={};Dn&&(Kh=document.createElement("div").style,"AnimationEvent"in window||(delete oa.animationend.animation,delete oa.animationiteration.animation,delete oa.animationstart.animation),"TransitionEvent"in window||delete oa.transitionend.transition);function Ar(e){if(ic[e])return ic[e];if(!oa[e])return e;var t=oa[e],r;for(r in t)if(t.hasOwnProperty(r)&&r in Kh)return ic[e]=t[r];return e}var Zh=Ar("animationend"),Qh=Ar("animationiteration"),Jh=Ar("animationstart"),aS=Ar("transitionrun"),iS=Ar("transitionstart"),sS=Ar("transitioncancel"),Wh=Ar("transitionend"),Ih=new Map,sc="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");sc.push("scrollEnd");function ln(e,t){Ih.set(e,t),Cr(t,[e])}var Vs=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},$t=[],ca=0,lc=0;function Bs(){for(var e=ca,t=lc=ca=0;t<e;){var r=$t[t];$t[t++]=null;var i=$t[t];$t[t++]=null;var u=$t[t];$t[t++]=null;var f=$t[t];if($t[t++]=null,i!==null&&u!==null){var y=i.pending;y===null?u.next=u:(u.next=y.next,y.next=u),i.pending=u}f!==0&&em(r,u,f)}}function Ls(e,t,r,i){$t[ca++]=e,$t[ca++]=t,$t[ca++]=r,$t[ca++]=i,lc|=i,e.lanes|=i,e=e.alternate,e!==null&&(e.lanes|=i)}function oc(e,t,r,i){return Ls(e,t,r,i),Us(e)}function kr(e,t){return Ls(e,null,null,t),Us(e)}function em(e,t,r){e.lanes|=r;var i=e.alternate;i!==null&&(i.lanes|=r);for(var u=!1,f=e.return;f!==null;)f.childLanes|=r,i=f.alternate,i!==null&&(i.childLanes|=r),f.tag===22&&(e=f.stateNode,e===null||e._visibility&1||(u=!0)),e=f,f=f.return;return e.tag===3?(f=e.stateNode,u&&t!==null&&(u=31-zt(r),e=f.hiddenUpdates,i=e[u],i===null?e[u]=[t]:i.push(t),t.lane=r|536870912),f):null}function Us(e){if(50<zi)throw zi=0,yu=null,Error(l(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var ua={};function lS(e,t,r,i){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Vt(e,t,r,i){return new lS(e,t,r,i)}function cc(e){return e=e.prototype,!(!e||!e.isReactComponent)}function An(e,t){var r=e.alternate;return r===null?(r=Vt(e.tag,t,e.key,e.mode),r.elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=e.flags&65011712,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,t=e.dependencies,r.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r.refCleanup=e.refCleanup,r}function tm(e,t){e.flags&=65011714;var r=e.alternate;return r===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=r.childLanes,e.lanes=r.lanes,e.child=r.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=r.memoizedProps,e.memoizedState=r.memoizedState,e.updateQueue=r.updateQueue,e.type=r.type,t=r.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Hs(e,t,r,i,u,f){var y=0;if(i=e,typeof e=="function")cc(e)&&(y=1);else if(typeof e=="string")y=fj(e,r,ne.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case M:return e=Vt(31,r,t,u),e.elementType=M,e.lanes=f,e;case N:return Mr(r.children,u,f,t);case T:y=8,u|=24;break;case A:return e=Vt(12,r,t,u|2),e.elementType=A,e.lanes=f,e;case U:return e=Vt(13,r,t,u),e.elementType=U,e.lanes=f,e;case L:return e=Vt(19,r,t,u),e.elementType=L,e.lanes=f,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case _:y=10;break e;case k:y=9;break e;case z:y=11;break e;case D:y=14;break e;case H:y=16,i=null;break e}y=29,r=Error(l(130,e===null?"null":typeof e,"")),i=null}return t=Vt(y,r,t,u),t.elementType=e,t.type=i,t.lanes=f,t}function Mr(e,t,r,i){return e=Vt(7,e,i,t),e.lanes=r,e}function uc(e,t,r){return e=Vt(6,e,null,t),e.lanes=r,e}function nm(e){var t=Vt(18,null,null,0);return t.stateNode=e,t}function dc(e,t,r){return t=Vt(4,e.children!==null?e.children:[],e.key,t),t.lanes=r,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var rm=new WeakMap;function Kt(e,t){if(typeof e=="object"&&e!==null){var r=rm.get(e);return r!==void 0?r:(t={value:e,source:t,stack:se(t)},rm.set(e,t),t)}return{value:e,source:t,stack:se(t)}}var da=[],fa=0,qs=null,hi=0,Zt=[],Qt=0,Qn=null,pn=1,gn="";function kn(e,t){da[fa++]=hi,da[fa++]=qs,qs=e,hi=t}function am(e,t,r){Zt[Qt++]=pn,Zt[Qt++]=gn,Zt[Qt++]=Qn,Qn=e;var i=pn;e=gn;var u=32-zt(i)-1;i&=~(1<<u),r+=1;var f=32-zt(t)+u;if(30<f){var y=u-u%5;f=(i&(1<<y)-1).toString(32),i>>=y,u-=y,pn=1<<32-zt(t)+u|r<<u|i,gn=f+e}else pn=1<<f|r<<u|i,gn=e}function fc(e){e.return!==null&&(kn(e,1),am(e,1,0))}function hc(e){for(;e===qs;)qs=da[--fa],da[fa]=null,hi=da[--fa],da[fa]=null;for(;e===Qn;)Qn=Zt[--Qt],Zt[Qt]=null,gn=Zt[--Qt],Zt[Qt]=null,pn=Zt[--Qt],Zt[Qt]=null}function im(e,t){Zt[Qt++]=pn,Zt[Qt++]=gn,Zt[Qt++]=Qn,pn=t.id,gn=t.overflow,Qn=e}var mt=null,$e=null,Re=!1,Jn=null,Jt=!1,mc=Error(l(519));function Wn(e){var t=Error(l(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw mi(Kt(t,e)),mc}function sm(e){var t=e.stateNode,r=e.type,i=e.memoizedProps;switch(t[ht]=e,t[Tt]=i,r){case"dialog":Ae("cancel",t),Ae("close",t);break;case"iframe":case"object":case"embed":Ae("load",t);break;case"video":case"audio":for(r=0;r<Vi.length;r++)Ae(Vi[r],t);break;case"source":Ae("error",t);break;case"img":case"image":case"link":Ae("error",t),Ae("load",t);break;case"details":Ae("toggle",t);break;case"input":Ae("invalid",t),xh(t,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":Ae("invalid",t);break;case"textarea":Ae("invalid",t),Sh(t,i.value,i.defaultValue,i.children)}r=i.children,typeof r!="string"&&typeof r!="number"&&typeof r!="bigint"||t.textContent===""+r||i.suppressHydrationWarning===!0||wg(t.textContent,r)?(i.popover!=null&&(Ae("beforetoggle",t),Ae("toggle",t)),i.onScroll!=null&&Ae("scroll",t),i.onScrollEnd!=null&&Ae("scrollend",t),i.onClick!=null&&(t.onclick=Nn),t=!0):t=!1,t||Wn(e,!0)}function lm(e){for(mt=e.return;mt;)switch(mt.tag){case 5:case 31:case 13:Jt=!1;return;case 27:case 3:Jt=!0;return;default:mt=mt.return}}function ha(e){if(e!==mt)return!1;if(!Re)return lm(e),Re=!0,!1;var t=e.tag,r;if((r=t!==3&&t!==27)&&((r=t===5)&&(r=e.type,r=!(r!=="form"&&r!=="button")||Ru(e.type,e.memoizedProps)),r=!r),r&&$e&&Wn(e),lm(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(l(317));$e=Rg(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(l(317));$e=Rg(e)}else t===27?(t=$e,fr(e.type)?(e=Bu,Bu=null,$e=e):$e=t):$e=mt?It(e.stateNode.nextSibling):null;return!0}function Rr(){$e=mt=null,Re=!1}function pc(){var e=Jn;return e!==null&&(kt===null?kt=e:kt.push.apply(kt,e),Jn=null),e}function mi(e){Jn===null?Jn=[e]:Jn.push(e)}var gc=C(null),Or=null,Mn=null;function In(e,t,r){I(gc,t._currentValue),t._currentValue=r}function Rn(e){e._currentValue=gc.current,V(gc)}function yc(e,t,r){for(;e!==null;){var i=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,i!==null&&(i.childLanes|=t)):i!==null&&(i.childLanes&t)!==t&&(i.childLanes|=t),e===r)break;e=e.return}}function vc(e,t,r,i){var u=e.child;for(u!==null&&(u.return=e);u!==null;){var f=u.dependencies;if(f!==null){var y=u.child;f=f.firstContext;e:for(;f!==null;){var j=f;f=u;for(var R=0;R<t.length;R++)if(j.context===t[R]){f.lanes|=r,j=f.alternate,j!==null&&(j.lanes|=r),yc(f.return,r,e),i||(y=null);break e}f=j.next}}else if(u.tag===18){if(y=u.return,y===null)throw Error(l(341));y.lanes|=r,f=y.alternate,f!==null&&(f.lanes|=r),yc(y,r,e),y=null}else y=u.child;if(y!==null)y.return=u;else for(y=u;y!==null;){if(y===e){y=null;break}if(u=y.sibling,u!==null){u.return=y.return,y=u;break}y=y.return}u=y}}function ma(e,t,r,i){e=null;for(var u=t,f=!1;u!==null;){if(!f){if((u.flags&524288)!==0)f=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var y=u.alternate;if(y===null)throw Error(l(387));if(y=y.memoizedProps,y!==null){var j=u.type;_t(u.pendingProps.value,y.value)||(e!==null?e.push(j):e=[j])}}else if(u===be.current){if(y=u.alternate,y===null)throw Error(l(387));y.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(e!==null?e.push(qi):e=[qi])}u=u.return}e!==null&&vc(t,e,r,i),t.flags|=262144}function Ys(e){for(e=e.firstContext;e!==null;){if(!_t(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function zr(e){Or=e,Mn=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function pt(e){return om(Or,e)}function Ps(e,t){return Or===null&&zr(e),om(e,t)}function om(e,t){var r=t._currentValue;if(t={context:t,memoizedValue:r,next:null},Mn===null){if(e===null)throw Error(l(308));Mn=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Mn=Mn.next=t;return r}var oS=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(r,i){e.push(i)}};this.abort=function(){t.aborted=!0,e.forEach(function(r){return r()})}},cS=n.unstable_scheduleCallback,uS=n.unstable_NormalPriority,nt={$$typeof:_,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function xc(){return{controller:new oS,data:new Map,refCount:0}}function pi(e){e.refCount--,e.refCount===0&&cS(uS,function(){e.controller.abort()})}var gi=null,bc=0,pa=0,ga=null;function dS(e,t){if(gi===null){var r=gi=[];bc=0,pa=wu(),ga={status:"pending",value:void 0,then:function(i){r.push(i)}}}return bc++,t.then(cm,cm),t}function cm(){if(--bc===0&&gi!==null){ga!==null&&(ga.status="fulfilled");var e=gi;gi=null,pa=0,ga=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function fS(e,t){var r=[],i={status:"pending",value:null,reason:null,then:function(u){r.push(u)}};return e.then(function(){i.status="fulfilled",i.value=t;for(var u=0;u<r.length;u++)(0,r[u])(t)},function(u){for(i.status="rejected",i.reason=u,u=0;u<r.length;u++)(0,r[u])(void 0)}),i}var um=Y.S;Y.S=function(e,t){$p=Rt(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&dS(e,t),um!==null&&um(e,t)};var _r=C(null);function Sc(){var e=_r.current;return e!==null?e:Pe.pooledCache}function Gs(e,t){t===null?I(_r,_r.current):I(_r,t.pool)}function dm(){var e=Sc();return e===null?null:{parent:nt._currentValue,pool:e}}var ya=Error(l(460)),jc=Error(l(474)),Fs=Error(l(542)),Xs={then:function(){}};function fm(e){return e=e.status,e==="fulfilled"||e==="rejected"}function hm(e,t,r){switch(r=e[r],r===void 0?e.push(t):r!==t&&(t.then(Nn,Nn),t=r),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,pm(e),e;default:if(typeof t.status=="string")t.then(Nn,Nn);else{if(e=Pe,e!==null&&100<e.shellSuspendCounter)throw Error(l(482));e=t,e.status="pending",e.then(function(i){if(t.status==="pending"){var u=t;u.status="fulfilled",u.value=i}},function(i){if(t.status==="pending"){var u=t;u.status="rejected",u.reason=i}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,pm(e),e}throw Br=t,ya}}function Vr(e){try{var t=e._init;return t(e._payload)}catch(r){throw r!==null&&typeof r=="object"&&typeof r.then=="function"?(Br=r,ya):r}}var Br=null;function mm(){if(Br===null)throw Error(l(459));var e=Br;return Br=null,e}function pm(e){if(e===ya||e===Fs)throw Error(l(483))}var va=null,yi=0;function $s(e){var t=yi;return yi+=1,va===null&&(va=[]),hm(va,e,t)}function vi(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function Ks(e,t){throw t.$$typeof===b?Error(l(525)):(e=Object.prototype.toString.call(t),Error(l(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function gm(e){function t(q,B){if(e){var P=q.deletions;P===null?(q.deletions=[B],q.flags|=16):P.push(B)}}function r(q,B){if(!e)return null;for(;B!==null;)t(q,B),B=B.sibling;return null}function i(q){for(var B=new Map;q!==null;)q.key!==null?B.set(q.key,q):B.set(q.index,q),q=q.sibling;return B}function u(q,B){return q=An(q,B),q.index=0,q.sibling=null,q}function f(q,B,P){return q.index=P,e?(P=q.alternate,P!==null?(P=P.index,P<B?(q.flags|=67108866,B):P):(q.flags|=67108866,B)):(q.flags|=1048576,B)}function y(q){return e&&q.alternate===null&&(q.flags|=67108866),q}function j(q,B,P,ee){return B===null||B.tag!==6?(B=uc(P,q.mode,ee),B.return=q,B):(B=u(B,P),B.return=q,B)}function R(q,B,P,ee){var xe=P.type;return xe===N?W(q,B,P.props.children,ee,P.key):B!==null&&(B.elementType===xe||typeof xe=="object"&&xe!==null&&xe.$$typeof===H&&Vr(xe)===B.type)?(B=u(B,P.props),vi(B,P),B.return=q,B):(B=Hs(P.type,P.key,P.props,null,q.mode,ee),vi(B,P),B.return=q,B)}function F(q,B,P,ee){return B===null||B.tag!==4||B.stateNode.containerInfo!==P.containerInfo||B.stateNode.implementation!==P.implementation?(B=dc(P,q.mode,ee),B.return=q,B):(B=u(B,P.children||[]),B.return=q,B)}function W(q,B,P,ee,xe){return B===null||B.tag!==7?(B=Mr(P,q.mode,ee,xe),B.return=q,B):(B=u(B,P),B.return=q,B)}function re(q,B,P){if(typeof B=="string"&&B!==""||typeof B=="number"||typeof B=="bigint")return B=uc(""+B,q.mode,P),B.return=q,B;if(typeof B=="object"&&B!==null){switch(B.$$typeof){case E:return P=Hs(B.type,B.key,B.props,null,q.mode,P),vi(P,B),P.return=q,P;case w:return B=dc(B,q.mode,P),B.return=q,B;case H:return B=Vr(B),re(q,B,P)}if(ye(B)||Z(B))return B=Mr(B,q.mode,P,null),B.return=q,B;if(typeof B.then=="function")return re(q,$s(B),P);if(B.$$typeof===_)return re(q,Ps(q,B),P);Ks(q,B)}return null}function X(q,B,P,ee){var xe=B!==null?B.key:null;if(typeof P=="string"&&P!==""||typeof P=="number"||typeof P=="bigint")return xe!==null?null:j(q,B,""+P,ee);if(typeof P=="object"&&P!==null){switch(P.$$typeof){case E:return P.key===xe?R(q,B,P,ee):null;case w:return P.key===xe?F(q,B,P,ee):null;case H:return P=Vr(P),X(q,B,P,ee)}if(ye(P)||Z(P))return xe!==null?null:W(q,B,P,ee,null);if(typeof P.then=="function")return X(q,B,$s(P),ee);if(P.$$typeof===_)return X(q,B,Ps(q,P),ee);Ks(q,P)}return null}function K(q,B,P,ee,xe){if(typeof ee=="string"&&ee!==""||typeof ee=="number"||typeof ee=="bigint")return q=q.get(P)||null,j(B,q,""+ee,xe);if(typeof ee=="object"&&ee!==null){switch(ee.$$typeof){case E:return q=q.get(ee.key===null?P:ee.key)||null,R(B,q,ee,xe);case w:return q=q.get(ee.key===null?P:ee.key)||null,F(B,q,ee,xe);case H:return ee=Vr(ee),K(q,B,P,ee,xe)}if(ye(ee)||Z(ee))return q=q.get(P)||null,W(B,q,ee,xe,null);if(typeof ee.then=="function")return K(q,B,P,$s(ee),xe);if(ee.$$typeof===_)return K(q,B,P,Ps(B,ee),xe);Ks(B,ee)}return null}function pe(q,B,P,ee){for(var xe=null,Oe=null,ve=B,Te=B=0,Me=null;ve!==null&&Te<P.length;Te++){ve.index>Te?(Me=ve,ve=null):Me=ve.sibling;var ze=X(q,ve,P[Te],ee);if(ze===null){ve===null&&(ve=Me);break}e&&ve&&ze.alternate===null&&t(q,ve),B=f(ze,B,Te),Oe===null?xe=ze:Oe.sibling=ze,Oe=ze,ve=Me}if(Te===P.length)return r(q,ve),Re&&kn(q,Te),xe;if(ve===null){for(;Te<P.length;Te++)ve=re(q,P[Te],ee),ve!==null&&(B=f(ve,B,Te),Oe===null?xe=ve:Oe.sibling=ve,Oe=ve);return Re&&kn(q,Te),xe}for(ve=i(ve);Te<P.length;Te++)Me=K(ve,q,Te,P[Te],ee),Me!==null&&(e&&Me.alternate!==null&&ve.delete(Me.key===null?Te:Me.key),B=f(Me,B,Te),Oe===null?xe=Me:Oe.sibling=Me,Oe=Me);return e&&ve.forEach(function(yr){return t(q,yr)}),Re&&kn(q,Te),xe}function Se(q,B,P,ee){if(P==null)throw Error(l(151));for(var xe=null,Oe=null,ve=B,Te=B=0,Me=null,ze=P.next();ve!==null&&!ze.done;Te++,ze=P.next()){ve.index>Te?(Me=ve,ve=null):Me=ve.sibling;var yr=X(q,ve,ze.value,ee);if(yr===null){ve===null&&(ve=Me);break}e&&ve&&yr.alternate===null&&t(q,ve),B=f(yr,B,Te),Oe===null?xe=yr:Oe.sibling=yr,Oe=yr,ve=Me}if(ze.done)return r(q,ve),Re&&kn(q,Te),xe;if(ve===null){for(;!ze.done;Te++,ze=P.next())ze=re(q,ze.value,ee),ze!==null&&(B=f(ze,B,Te),Oe===null?xe=ze:Oe.sibling=ze,Oe=ze);return Re&&kn(q,Te),xe}for(ve=i(ve);!ze.done;Te++,ze=P.next())ze=K(ve,q,Te,ze.value,ee),ze!==null&&(e&&ze.alternate!==null&&ve.delete(ze.key===null?Te:ze.key),B=f(ze,B,Te),Oe===null?xe=ze:Oe.sibling=ze,Oe=ze);return e&&ve.forEach(function(wj){return t(q,wj)}),Re&&kn(q,Te),xe}function qe(q,B,P,ee){if(typeof P=="object"&&P!==null&&P.type===N&&P.key===null&&(P=P.props.children),typeof P=="object"&&P!==null){switch(P.$$typeof){case E:e:{for(var xe=P.key;B!==null;){if(B.key===xe){if(xe=P.type,xe===N){if(B.tag===7){r(q,B.sibling),ee=u(B,P.props.children),ee.return=q,q=ee;break e}}else if(B.elementType===xe||typeof xe=="object"&&xe!==null&&xe.$$typeof===H&&Vr(xe)===B.type){r(q,B.sibling),ee=u(B,P.props),vi(ee,P),ee.return=q,q=ee;break e}r(q,B);break}else t(q,B);B=B.sibling}P.type===N?(ee=Mr(P.props.children,q.mode,ee,P.key),ee.return=q,q=ee):(ee=Hs(P.type,P.key,P.props,null,q.mode,ee),vi(ee,P),ee.return=q,q=ee)}return y(q);case w:e:{for(xe=P.key;B!==null;){if(B.key===xe)if(B.tag===4&&B.stateNode.containerInfo===P.containerInfo&&B.stateNode.implementation===P.implementation){r(q,B.sibling),ee=u(B,P.children||[]),ee.return=q,q=ee;break e}else{r(q,B);break}else t(q,B);B=B.sibling}ee=dc(P,q.mode,ee),ee.return=q,q=ee}return y(q);case H:return P=Vr(P),qe(q,B,P,ee)}if(ye(P))return pe(q,B,P,ee);if(Z(P)){if(xe=Z(P),typeof xe!="function")throw Error(l(150));return P=xe.call(P),Se(q,B,P,ee)}if(typeof P.then=="function")return qe(q,B,$s(P),ee);if(P.$$typeof===_)return qe(q,B,Ps(q,P),ee);Ks(q,P)}return typeof P=="string"&&P!==""||typeof P=="number"||typeof P=="bigint"?(P=""+P,B!==null&&B.tag===6?(r(q,B.sibling),ee=u(B,P),ee.return=q,q=ee):(r(q,B),ee=uc(P,q.mode,ee),ee.return=q,q=ee),y(q)):r(q,B)}return function(q,B,P,ee){try{yi=0;var xe=qe(q,B,P,ee);return va=null,xe}catch(ve){if(ve===ya||ve===Fs)throw ve;var Oe=Vt(29,ve,null,q.mode);return Oe.lanes=ee,Oe.return=q,Oe}finally{}}}var Lr=gm(!0),ym=gm(!1),er=!1;function wc(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Ec(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function tr(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function nr(e,t,r){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,(_e&2)!==0){var u=i.pending;return u===null?t.next=t:(t.next=u.next,u.next=t),i.pending=t,t=Us(e),em(e,null,r),t}return Ls(e,i,t,r),Us(e)}function xi(e,t,r){if(t=t.updateQueue,t!==null&&(t=t.shared,(r&4194048)!==0)){var i=t.lanes;i&=e.pendingLanes,r|=i,t.lanes=r,oh(e,r)}}function Tc(e,t){var r=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,r===i)){var u=null,f=null;if(r=r.firstBaseUpdate,r!==null){do{var y={lane:r.lane,tag:r.tag,payload:r.payload,callback:null,next:null};f===null?u=f=y:f=f.next=y,r=r.next}while(r!==null);f===null?u=f=t:f=f.next=t}else u=f=t;r={baseState:i.baseState,firstBaseUpdate:u,lastBaseUpdate:f,shared:i.shared,callbacks:i.callbacks},e.updateQueue=r;return}e=r.lastBaseUpdate,e===null?r.firstBaseUpdate=t:e.next=t,r.lastBaseUpdate=t}var Cc=!1;function bi(){if(Cc){var e=ga;if(e!==null)throw e}}function Si(e,t,r,i){Cc=!1;var u=e.updateQueue;er=!1;var f=u.firstBaseUpdate,y=u.lastBaseUpdate,j=u.shared.pending;if(j!==null){u.shared.pending=null;var R=j,F=R.next;R.next=null,y===null?f=F:y.next=F,y=R;var W=e.alternate;W!==null&&(W=W.updateQueue,j=W.lastBaseUpdate,j!==y&&(j===null?W.firstBaseUpdate=F:j.next=F,W.lastBaseUpdate=R))}if(f!==null){var re=u.baseState;y=0,W=F=R=null,j=f;do{var X=j.lane&-536870913,K=X!==j.lane;if(K?(ke&X)===X:(i&X)===X){X!==0&&X===pa&&(Cc=!0),W!==null&&(W=W.next={lane:0,tag:j.tag,payload:j.payload,callback:null,next:null});e:{var pe=e,Se=j;X=t;var qe=r;switch(Se.tag){case 1:if(pe=Se.payload,typeof pe=="function"){re=pe.call(qe,re,X);break e}re=pe;break e;case 3:pe.flags=pe.flags&-65537|128;case 0:if(pe=Se.payload,X=typeof pe=="function"?pe.call(qe,re,X):pe,X==null)break e;re=x({},re,X);break e;case 2:er=!0}}X=j.callback,X!==null&&(e.flags|=64,K&&(e.flags|=8192),K=u.callbacks,K===null?u.callbacks=[X]:K.push(X))}else K={lane:X,tag:j.tag,payload:j.payload,callback:j.callback,next:null},W===null?(F=W=K,R=re):W=W.next=K,y|=X;if(j=j.next,j===null){if(j=u.shared.pending,j===null)break;K=j,j=K.next,K.next=null,u.lastBaseUpdate=K,u.shared.pending=null}}while(!0);W===null&&(R=re),u.baseState=R,u.firstBaseUpdate=F,u.lastBaseUpdate=W,f===null&&(u.shared.lanes=0),lr|=y,e.lanes=y,e.memoizedState=re}}function vm(e,t){if(typeof e!="function")throw Error(l(191,e));e.call(t)}function xm(e,t){var r=e.callbacks;if(r!==null)for(e.callbacks=null,e=0;e<r.length;e++)vm(r[e],t)}var xa=C(null),Zs=C(0);function bm(e,t){e=qn,I(Zs,e),I(xa,t),qn=e|t.baseLanes}function Nc(){I(Zs,qn),I(xa,xa.current)}function Dc(){qn=Zs.current,V(xa),V(Zs)}var Bt=C(null),Wt=null;function rr(e){var t=e.alternate;I(et,et.current&1),I(Bt,e),Wt===null&&(t===null||xa.current!==null||t.memoizedState!==null)&&(Wt=e)}function Ac(e){I(et,et.current),I(Bt,e),Wt===null&&(Wt=e)}function Sm(e){e.tag===22?(I(et,et.current),I(Bt,e),Wt===null&&(Wt=e)):ar()}function ar(){I(et,et.current),I(Bt,Bt.current)}function Lt(e){V(Bt),Wt===e&&(Wt=null),V(et)}var et=C(0);function Qs(e){for(var t=e;t!==null;){if(t.tag===13){var r=t.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||_u(r)||Vu(r)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var On=0,Ee=null,Ue=null,rt=null,Js=!1,ba=!1,Ur=!1,Ws=0,ji=0,Sa=null,hS=0;function Qe(){throw Error(l(321))}function kc(e,t){if(t===null)return!1;for(var r=0;r<t.length&&r<e.length;r++)if(!_t(e[r],t[r]))return!1;return!0}function Mc(e,t,r,i,u,f){return On=f,Ee=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Y.H=e===null||e.memoizedState===null?ap:Xc,Ur=!1,f=r(i,u),Ur=!1,ba&&(f=wm(t,r,i,u)),jm(e),f}function jm(e){Y.H=Ti;var t=Ue!==null&&Ue.next!==null;if(On=0,rt=Ue=Ee=null,Js=!1,ji=0,Sa=null,t)throw Error(l(300));e===null||at||(e=e.dependencies,e!==null&&Ys(e)&&(at=!0))}function wm(e,t,r,i){Ee=e;var u=0;do{if(ba&&(Sa=null),ji=0,ba=!1,25<=u)throw Error(l(301));if(u+=1,rt=Ue=null,e.updateQueue!=null){var f=e.updateQueue;f.lastEffect=null,f.events=null,f.stores=null,f.memoCache!=null&&(f.memoCache.index=0)}Y.H=ip,f=t(r,i)}while(ba);return f}function mS(){var e=Y.H,t=e.useState()[0];return t=typeof t.then=="function"?wi(t):t,e=e.useState()[0],(Ue!==null?Ue.memoizedState:null)!==e&&(Ee.flags|=1024),t}function Rc(){var e=Ws!==0;return Ws=0,e}function Oc(e,t,r){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~r}function zc(e){if(Js){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Js=!1}On=0,rt=Ue=Ee=null,ba=!1,ji=Ws=0,Sa=null}function St(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return rt===null?Ee.memoizedState=rt=e:rt=rt.next=e,rt}function tt(){if(Ue===null){var e=Ee.alternate;e=e!==null?e.memoizedState:null}else e=Ue.next;var t=rt===null?Ee.memoizedState:rt.next;if(t!==null)rt=t,Ue=e;else{if(e===null)throw Ee.alternate===null?Error(l(467)):Error(l(310));Ue=e,e={memoizedState:Ue.memoizedState,baseState:Ue.baseState,baseQueue:Ue.baseQueue,queue:Ue.queue,next:null},rt===null?Ee.memoizedState=rt=e:rt=rt.next=e}return rt}function Is(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function wi(e){var t=ji;return ji+=1,Sa===null&&(Sa=[]),e=hm(Sa,e,t),t=Ee,(rt===null?t.memoizedState:rt.next)===null&&(t=t.alternate,Y.H=t===null||t.memoizedState===null?ap:Xc),e}function el(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return wi(e);if(e.$$typeof===_)return pt(e)}throw Error(l(438,String(e)))}function _c(e){var t=null,r=Ee.updateQueue;if(r!==null&&(t=r.memoCache),t==null){var i=Ee.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(t={data:i.data.map(function(u){return u.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),r===null&&(r=Is(),Ee.updateQueue=r),r.memoCache=t,r=t.data[t.index],r===void 0)for(r=t.data[t.index]=Array(e),i=0;i<e;i++)r[i]=O;return t.index++,r}function zn(e,t){return typeof t=="function"?t(e):t}function tl(e){var t=tt();return Vc(t,Ue,e)}function Vc(e,t,r){var i=e.queue;if(i===null)throw Error(l(311));i.lastRenderedReducer=r;var u=e.baseQueue,f=i.pending;if(f!==null){if(u!==null){var y=u.next;u.next=f.next,f.next=y}t.baseQueue=u=f,i.pending=null}if(f=e.baseState,u===null)e.memoizedState=f;else{t=u.next;var j=y=null,R=null,F=t,W=!1;do{var re=F.lane&-536870913;if(re!==F.lane?(ke&re)===re:(On&re)===re){var X=F.revertLane;if(X===0)R!==null&&(R=R.next={lane:0,revertLane:0,gesture:null,action:F.action,hasEagerState:F.hasEagerState,eagerState:F.eagerState,next:null}),re===pa&&(W=!0);else if((On&X)===X){F=F.next,X===pa&&(W=!0);continue}else re={lane:0,revertLane:F.revertLane,gesture:null,action:F.action,hasEagerState:F.hasEagerState,eagerState:F.eagerState,next:null},R===null?(j=R=re,y=f):R=R.next=re,Ee.lanes|=X,lr|=X;re=F.action,Ur&&r(f,re),f=F.hasEagerState?F.eagerState:r(f,re)}else X={lane:re,revertLane:F.revertLane,gesture:F.gesture,action:F.action,hasEagerState:F.hasEagerState,eagerState:F.eagerState,next:null},R===null?(j=R=X,y=f):R=R.next=X,Ee.lanes|=re,lr|=re;F=F.next}while(F!==null&&F!==t);if(R===null?y=f:R.next=j,!_t(f,e.memoizedState)&&(at=!0,W&&(r=ga,r!==null)))throw r;e.memoizedState=f,e.baseState=y,e.baseQueue=R,i.lastRenderedState=f}return u===null&&(i.lanes=0),[e.memoizedState,i.dispatch]}function Bc(e){var t=tt(),r=t.queue;if(r===null)throw Error(l(311));r.lastRenderedReducer=e;var i=r.dispatch,u=r.pending,f=t.memoizedState;if(u!==null){r.pending=null;var y=u=u.next;do f=e(f,y.action),y=y.next;while(y!==u);_t(f,t.memoizedState)||(at=!0),t.memoizedState=f,t.baseQueue===null&&(t.baseState=f),r.lastRenderedState=f}return[f,i]}function Em(e,t,r){var i=Ee,u=tt(),f=Re;if(f){if(r===void 0)throw Error(l(407));r=r()}else r=t();var y=!_t((Ue||u).memoizedState,r);if(y&&(u.memoizedState=r,at=!0),u=u.queue,Hc(Nm.bind(null,i,u,e),[e]),u.getSnapshot!==t||y||rt!==null&&rt.memoizedState.tag&1){if(i.flags|=2048,ja(9,{destroy:void 0},Cm.bind(null,i,u,r,t),null),Pe===null)throw Error(l(349));f||(On&127)!==0||Tm(i,t,r)}return r}function Tm(e,t,r){e.flags|=16384,e={getSnapshot:t,value:r},t=Ee.updateQueue,t===null?(t=Is(),Ee.updateQueue=t,t.stores=[e]):(r=t.stores,r===null?t.stores=[e]:r.push(e))}function Cm(e,t,r,i){t.value=r,t.getSnapshot=i,Dm(t)&&Am(e)}function Nm(e,t,r){return r(function(){Dm(t)&&Am(e)})}function Dm(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!_t(e,r)}catch{return!0}}function Am(e){var t=kr(e,2);t!==null&&Mt(t,e,2)}function Lc(e){var t=St();if(typeof e=="function"){var r=e;if(e=r(),Ur){$n(!0);try{r()}finally{$n(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:zn,lastRenderedState:e},t}function km(e,t,r,i){return e.baseState=r,Vc(e,Ue,typeof i=="function"?i:zn)}function pS(e,t,r,i,u){if(al(e))throw Error(l(485));if(e=t.action,e!==null){var f={payload:u,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(y){f.listeners.push(y)}};Y.T!==null?r(!0):f.isTransition=!1,i(f),r=t.pending,r===null?(f.next=t.pending=f,Mm(t,f)):(f.next=r.next,t.pending=r.next=f)}}function Mm(e,t){var r=t.action,i=t.payload,u=e.state;if(t.isTransition){var f=Y.T,y={};Y.T=y;try{var j=r(u,i),R=Y.S;R!==null&&R(y,j),Rm(e,t,j)}catch(F){Uc(e,t,F)}finally{f!==null&&y.types!==null&&(f.types=y.types),Y.T=f}}else try{f=r(u,i),Rm(e,t,f)}catch(F){Uc(e,t,F)}}function Rm(e,t,r){r!==null&&typeof r=="object"&&typeof r.then=="function"?r.then(function(i){Om(e,t,i)},function(i){return Uc(e,t,i)}):Om(e,t,r)}function Om(e,t,r){t.status="fulfilled",t.value=r,zm(t),e.state=r,t=e.pending,t!==null&&(r=t.next,r===t?e.pending=null:(r=r.next,t.next=r,Mm(e,r)))}function Uc(e,t,r){var i=e.pending;if(e.pending=null,i!==null){i=i.next;do t.status="rejected",t.reason=r,zm(t),t=t.next;while(t!==i)}e.action=null}function zm(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function _m(e,t){return t}function Vm(e,t){if(Re){var r=Pe.formState;if(r!==null){e:{var i=Ee;if(Re){if($e){t:{for(var u=$e,f=Jt;u.nodeType!==8;){if(!f){u=null;break t}if(u=It(u.nextSibling),u===null){u=null;break t}}f=u.data,u=f==="F!"||f==="F"?u:null}if(u){$e=It(u.nextSibling),i=u.data==="F!";break e}}Wn(i)}i=!1}i&&(t=r[0])}}return r=St(),r.memoizedState=r.baseState=t,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:_m,lastRenderedState:t},r.queue=i,r=tp.bind(null,Ee,i),i.dispatch=r,i=Lc(!1),f=Fc.bind(null,Ee,!1,i.queue),i=St(),u={state:t,dispatch:null,action:e,pending:null},i.queue=u,r=pS.bind(null,Ee,u,f,r),u.dispatch=r,i.memoizedState=e,[t,r,!1]}function Bm(e){var t=tt();return Lm(t,Ue,e)}function Lm(e,t,r){if(t=Vc(e,t,_m)[0],e=tl(zn)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var i=wi(t)}catch(y){throw y===ya?Fs:y}else i=t;t=tt();var u=t.queue,f=u.dispatch;return r!==t.memoizedState&&(Ee.flags|=2048,ja(9,{destroy:void 0},gS.bind(null,u,r),null)),[i,f,e]}function gS(e,t){e.action=t}function Um(e){var t=tt(),r=Ue;if(r!==null)return Lm(t,r,e);tt(),t=t.memoizedState,r=tt();var i=r.queue.dispatch;return r.memoizedState=e,[t,i,!1]}function ja(e,t,r,i){return e={tag:e,create:r,deps:i,inst:t,next:null},t=Ee.updateQueue,t===null&&(t=Is(),Ee.updateQueue=t),r=t.lastEffect,r===null?t.lastEffect=e.next=e:(i=r.next,r.next=e,e.next=i,t.lastEffect=e),e}function Hm(){return tt().memoizedState}function nl(e,t,r,i){var u=St();Ee.flags|=e,u.memoizedState=ja(1|t,{destroy:void 0},r,i===void 0?null:i)}function rl(e,t,r,i){var u=tt();i=i===void 0?null:i;var f=u.memoizedState.inst;Ue!==null&&i!==null&&kc(i,Ue.memoizedState.deps)?u.memoizedState=ja(t,f,r,i):(Ee.flags|=e,u.memoizedState=ja(1|t,f,r,i))}function qm(e,t){nl(8390656,8,e,t)}function Hc(e,t){rl(2048,8,e,t)}function yS(e){Ee.flags|=4;var t=Ee.updateQueue;if(t===null)t=Is(),Ee.updateQueue=t,t.events=[e];else{var r=t.events;r===null?t.events=[e]:r.push(e)}}function Ym(e){var t=tt().memoizedState;return yS({ref:t,nextImpl:e}),function(){if((_e&2)!==0)throw Error(l(440));return t.impl.apply(void 0,arguments)}}function Pm(e,t){return rl(4,2,e,t)}function Gm(e,t){return rl(4,4,e,t)}function Fm(e,t){if(typeof t=="function"){e=e();var r=t(e);return function(){typeof r=="function"?r():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Xm(e,t,r){r=r!=null?r.concat([e]):null,rl(4,4,Fm.bind(null,t,e),r)}function qc(){}function $m(e,t){var r=tt();t=t===void 0?null:t;var i=r.memoizedState;return t!==null&&kc(t,i[1])?i[0]:(r.memoizedState=[e,t],e)}function Km(e,t){var r=tt();t=t===void 0?null:t;var i=r.memoizedState;if(t!==null&&kc(t,i[1]))return i[0];if(i=e(),Ur){$n(!0);try{e()}finally{$n(!1)}}return r.memoizedState=[i,t],i}function Yc(e,t,r){return r===void 0||(On&1073741824)!==0&&(ke&261930)===0?e.memoizedState=t:(e.memoizedState=r,e=Zp(),Ee.lanes|=e,lr|=e,r)}function Zm(e,t,r,i){return _t(r,t)?r:xa.current!==null?(e=Yc(e,r,i),_t(e,t)||(at=!0),e):(On&42)===0||(On&1073741824)!==0&&(ke&261930)===0?(at=!0,e.memoizedState=r):(e=Zp(),Ee.lanes|=e,lr|=e,t)}function Qm(e,t,r,i,u){var f=le.p;le.p=f!==0&&8>f?f:8;var y=Y.T,j={};Y.T=j,Fc(e,!1,t,r);try{var R=u(),F=Y.S;if(F!==null&&F(j,R),R!==null&&typeof R=="object"&&typeof R.then=="function"){var W=fS(R,i);Ei(e,t,W,qt(e))}else Ei(e,t,i,qt(e))}catch(re){Ei(e,t,{then:function(){},status:"rejected",reason:re},qt())}finally{le.p=f,y!==null&&j.types!==null&&(y.types=j.types),Y.T=y}}function vS(){}function Pc(e,t,r,i){if(e.tag!==5)throw Error(l(476));var u=Jm(e).queue;Qm(e,u,t,Q,r===null?vS:function(){return Wm(e),r(i)})}function Jm(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:Q,baseState:Q,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:zn,lastRenderedState:Q},next:null};var r={};return t.next={memoizedState:r,baseState:r,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:zn,lastRenderedState:r},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Wm(e){var t=Jm(e);t.next===null&&(t=e.alternate.memoizedState),Ei(e,t.next.queue,{},qt())}function Gc(){return pt(qi)}function Im(){return tt().memoizedState}function ep(){return tt().memoizedState}function xS(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var r=qt();e=tr(r);var i=nr(t,e,r);i!==null&&(Mt(i,t,r),xi(i,t,r)),t={cache:xc()},e.payload=t;return}t=t.return}}function bS(e,t,r){var i=qt();r={lane:i,revertLane:0,gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},al(e)?np(t,r):(r=oc(e,t,r,i),r!==null&&(Mt(r,e,i),rp(r,t,i)))}function tp(e,t,r){var i=qt();Ei(e,t,r,i)}function Ei(e,t,r,i){var u={lane:i,revertLane:0,gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null};if(al(e))np(t,u);else{var f=e.alternate;if(e.lanes===0&&(f===null||f.lanes===0)&&(f=t.lastRenderedReducer,f!==null))try{var y=t.lastRenderedState,j=f(y,r);if(u.hasEagerState=!0,u.eagerState=j,_t(j,y))return Ls(e,t,u,0),Pe===null&&Bs(),!1}catch{}finally{}if(r=oc(e,t,u,i),r!==null)return Mt(r,e,i),rp(r,t,i),!0}return!1}function Fc(e,t,r,i){if(i={lane:2,revertLane:wu(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},al(e)){if(t)throw Error(l(479))}else t=oc(e,r,i,2),t!==null&&Mt(t,e,2)}function al(e){var t=e.alternate;return e===Ee||t!==null&&t===Ee}function np(e,t){ba=Js=!0;var r=e.pending;r===null?t.next=t:(t.next=r.next,r.next=t),e.pending=t}function rp(e,t,r){if((r&4194048)!==0){var i=t.lanes;i&=e.pendingLanes,r|=i,t.lanes=r,oh(e,r)}}var Ti={readContext:pt,use:el,useCallback:Qe,useContext:Qe,useEffect:Qe,useImperativeHandle:Qe,useLayoutEffect:Qe,useInsertionEffect:Qe,useMemo:Qe,useReducer:Qe,useRef:Qe,useState:Qe,useDebugValue:Qe,useDeferredValue:Qe,useTransition:Qe,useSyncExternalStore:Qe,useId:Qe,useHostTransitionStatus:Qe,useFormState:Qe,useActionState:Qe,useOptimistic:Qe,useMemoCache:Qe,useCacheRefresh:Qe};Ti.useEffectEvent=Qe;var ap={readContext:pt,use:el,useCallback:function(e,t){return St().memoizedState=[e,t===void 0?null:t],e},useContext:pt,useEffect:qm,useImperativeHandle:function(e,t,r){r=r!=null?r.concat([e]):null,nl(4194308,4,Fm.bind(null,t,e),r)},useLayoutEffect:function(e,t){return nl(4194308,4,e,t)},useInsertionEffect:function(e,t){nl(4,2,e,t)},useMemo:function(e,t){var r=St();t=t===void 0?null:t;var i=e();if(Ur){$n(!0);try{e()}finally{$n(!1)}}return r.memoizedState=[i,t],i},useReducer:function(e,t,r){var i=St();if(r!==void 0){var u=r(t);if(Ur){$n(!0);try{r(t)}finally{$n(!1)}}}else u=t;return i.memoizedState=i.baseState=u,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:u},i.queue=e,e=e.dispatch=bS.bind(null,Ee,e),[i.memoizedState,e]},useRef:function(e){var t=St();return e={current:e},t.memoizedState=e},useState:function(e){e=Lc(e);var t=e.queue,r=tp.bind(null,Ee,t);return t.dispatch=r,[e.memoizedState,r]},useDebugValue:qc,useDeferredValue:function(e,t){var r=St();return Yc(r,e,t)},useTransition:function(){var e=Lc(!1);return e=Qm.bind(null,Ee,e.queue,!0,!1),St().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,r){var i=Ee,u=St();if(Re){if(r===void 0)throw Error(l(407));r=r()}else{if(r=t(),Pe===null)throw Error(l(349));(ke&127)!==0||Tm(i,t,r)}u.memoizedState=r;var f={value:r,getSnapshot:t};return u.queue=f,qm(Nm.bind(null,i,f,e),[e]),i.flags|=2048,ja(9,{destroy:void 0},Cm.bind(null,i,f,r,t),null),r},useId:function(){var e=St(),t=Pe.identifierPrefix;if(Re){var r=gn,i=pn;r=(i&~(1<<32-zt(i)-1)).toString(32)+r,t="_"+t+"R_"+r,r=Ws++,0<r&&(t+="H"+r.toString(32)),t+="_"}else r=hS++,t="_"+t+"r_"+r.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:Gc,useFormState:Vm,useActionState:Vm,useOptimistic:function(e){var t=St();t.memoizedState=t.baseState=e;var r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=r,t=Fc.bind(null,Ee,!0,r),r.dispatch=t,[e,t]},useMemoCache:_c,useCacheRefresh:function(){return St().memoizedState=xS.bind(null,Ee)},useEffectEvent:function(e){var t=St(),r={impl:e};return t.memoizedState=r,function(){if((_e&2)!==0)throw Error(l(440));return r.impl.apply(void 0,arguments)}}},Xc={readContext:pt,use:el,useCallback:$m,useContext:pt,useEffect:Hc,useImperativeHandle:Xm,useInsertionEffect:Pm,useLayoutEffect:Gm,useMemo:Km,useReducer:tl,useRef:Hm,useState:function(){return tl(zn)},useDebugValue:qc,useDeferredValue:function(e,t){var r=tt();return Zm(r,Ue.memoizedState,e,t)},useTransition:function(){var e=tl(zn)[0],t=tt().memoizedState;return[typeof e=="boolean"?e:wi(e),t]},useSyncExternalStore:Em,useId:Im,useHostTransitionStatus:Gc,useFormState:Bm,useActionState:Bm,useOptimistic:function(e,t){var r=tt();return km(r,Ue,e,t)},useMemoCache:_c,useCacheRefresh:ep};Xc.useEffectEvent=Ym;var ip={readContext:pt,use:el,useCallback:$m,useContext:pt,useEffect:Hc,useImperativeHandle:Xm,useInsertionEffect:Pm,useLayoutEffect:Gm,useMemo:Km,useReducer:Bc,useRef:Hm,useState:function(){return Bc(zn)},useDebugValue:qc,useDeferredValue:function(e,t){var r=tt();return Ue===null?Yc(r,e,t):Zm(r,Ue.memoizedState,e,t)},useTransition:function(){var e=Bc(zn)[0],t=tt().memoizedState;return[typeof e=="boolean"?e:wi(e),t]},useSyncExternalStore:Em,useId:Im,useHostTransitionStatus:Gc,useFormState:Um,useActionState:Um,useOptimistic:function(e,t){var r=tt();return Ue!==null?km(r,Ue,e,t):(r.baseState=e,[e,r.queue.dispatch])},useMemoCache:_c,useCacheRefresh:ep};ip.useEffectEvent=Ym;function $c(e,t,r,i){t=e.memoizedState,r=r(i,t),r=r==null?t:x({},t,r),e.memoizedState=r,e.lanes===0&&(e.updateQueue.baseState=r)}var Kc={enqueueSetState:function(e,t,r){e=e._reactInternals;var i=qt(),u=tr(i);u.payload=t,r!=null&&(u.callback=r),t=nr(e,u,i),t!==null&&(Mt(t,e,i),xi(t,e,i))},enqueueReplaceState:function(e,t,r){e=e._reactInternals;var i=qt(),u=tr(i);u.tag=1,u.payload=t,r!=null&&(u.callback=r),t=nr(e,u,i),t!==null&&(Mt(t,e,i),xi(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var r=qt(),i=tr(r);i.tag=2,t!=null&&(i.callback=t),t=nr(e,i,r),t!==null&&(Mt(t,e,r),xi(t,e,r))}};function sp(e,t,r,i,u,f,y){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,f,y):t.prototype&&t.prototype.isPureReactComponent?!di(r,i)||!di(u,f):!0}function lp(e,t,r,i){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(r,i),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(r,i),t.state!==e&&Kc.enqueueReplaceState(t,t.state,null)}function Hr(e,t){var r=t;if("ref"in t){r={};for(var i in t)i!=="ref"&&(r[i]=t[i])}if(e=e.defaultProps){r===t&&(r=x({},r));for(var u in e)r[u]===void 0&&(r[u]=e[u])}return r}function op(e){Vs(e)}function cp(e){console.error(e)}function up(e){Vs(e)}function il(e,t){try{var r=e.onUncaughtError;r(t.value,{componentStack:t.stack})}catch(i){setTimeout(function(){throw i})}}function dp(e,t,r){try{var i=e.onCaughtError;i(r.value,{componentStack:r.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function Zc(e,t,r){return r=tr(r),r.tag=3,r.payload={element:null},r.callback=function(){il(e,t)},r}function fp(e){return e=tr(e),e.tag=3,e}function hp(e,t,r,i){var u=r.type.getDerivedStateFromError;if(typeof u=="function"){var f=i.value;e.payload=function(){return u(f)},e.callback=function(){dp(t,r,i)}}var y=r.stateNode;y!==null&&typeof y.componentDidCatch=="function"&&(e.callback=function(){dp(t,r,i),typeof u!="function"&&(or===null?or=new Set([this]):or.add(this));var j=i.stack;this.componentDidCatch(i.value,{componentStack:j!==null?j:""})})}function SS(e,t,r,i,u){if(r.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(t=r.alternate,t!==null&&ma(t,r,u,!0),r=Bt.current,r!==null){switch(r.tag){case 31:case 13:return Wt===null?yl():r.alternate===null&&Je===0&&(Je=3),r.flags&=-257,r.flags|=65536,r.lanes=u,i===Xs?r.flags|=16384:(t=r.updateQueue,t===null?r.updateQueue=new Set([i]):t.add(i),bu(e,i,u)),!1;case 22:return r.flags|=65536,i===Xs?r.flags|=16384:(t=r.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([i])},r.updateQueue=t):(r=t.retryQueue,r===null?t.retryQueue=new Set([i]):r.add(i)),bu(e,i,u)),!1}throw Error(l(435,r.tag))}return bu(e,i,u),yl(),!1}if(Re)return t=Bt.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=u,i!==mc&&(e=Error(l(422),{cause:i}),mi(Kt(e,r)))):(i!==mc&&(t=Error(l(423),{cause:i}),mi(Kt(t,r))),e=e.current.alternate,e.flags|=65536,u&=-u,e.lanes|=u,i=Kt(i,r),u=Zc(e.stateNode,i,u),Tc(e,u),Je!==4&&(Je=2)),!1;var f=Error(l(520),{cause:i});if(f=Kt(f,r),Oi===null?Oi=[f]:Oi.push(f),Je!==4&&(Je=2),t===null)return!0;i=Kt(i,r),r=t;do{switch(r.tag){case 3:return r.flags|=65536,e=u&-u,r.lanes|=e,e=Zc(r.stateNode,i,e),Tc(r,e),!1;case 1:if(t=r.type,f=r.stateNode,(r.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(or===null||!or.has(f))))return r.flags|=65536,u&=-u,r.lanes|=u,u=fp(u),hp(u,e,r,i),Tc(r,u),!1}r=r.return}while(r!==null);return!1}var Qc=Error(l(461)),at=!1;function gt(e,t,r,i){t.child=e===null?ym(t,null,r,i):Lr(t,e.child,r,i)}function mp(e,t,r,i,u){r=r.render;var f=t.ref;if("ref"in i){var y={};for(var j in i)j!=="ref"&&(y[j]=i[j])}else y=i;return zr(t),i=Mc(e,t,r,y,f,u),j=Rc(),e!==null&&!at?(Oc(e,t,u),_n(e,t,u)):(Re&&j&&fc(t),t.flags|=1,gt(e,t,i,u),t.child)}function pp(e,t,r,i,u){if(e===null){var f=r.type;return typeof f=="function"&&!cc(f)&&f.defaultProps===void 0&&r.compare===null?(t.tag=15,t.type=f,gp(e,t,f,i,u)):(e=Hs(r.type,null,i,t,t.mode,u),e.ref=t.ref,e.return=t,t.child=e)}if(f=e.child,!au(e,u)){var y=f.memoizedProps;if(r=r.compare,r=r!==null?r:di,r(y,i)&&e.ref===t.ref)return _n(e,t,u)}return t.flags|=1,e=An(f,i),e.ref=t.ref,e.return=t,t.child=e}function gp(e,t,r,i,u){if(e!==null){var f=e.memoizedProps;if(di(f,i)&&e.ref===t.ref)if(at=!1,t.pendingProps=i=f,au(e,u))(e.flags&131072)!==0&&(at=!0);else return t.lanes=e.lanes,_n(e,t,u)}return Jc(e,t,r,i,u)}function yp(e,t,r,i){var u=i.children,f=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if((t.flags&128)!==0){if(f=f!==null?f.baseLanes|r:r,e!==null){for(i=t.child=e.child,u=0;i!==null;)u=u|i.lanes|i.childLanes,i=i.sibling;i=u&~f}else i=0,t.child=null;return vp(e,t,f,r,i)}if((r&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Gs(t,f!==null?f.cachePool:null),f!==null?bm(t,f):Nc(),Sm(t);else return i=t.lanes=536870912,vp(e,t,f!==null?f.baseLanes|r:r,r,i)}else f!==null?(Gs(t,f.cachePool),bm(t,f),ar(),t.memoizedState=null):(e!==null&&Gs(t,null),Nc(),ar());return gt(e,t,u,r),t.child}function Ci(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function vp(e,t,r,i,u){var f=Sc();return f=f===null?null:{parent:nt._currentValue,pool:f},t.memoizedState={baseLanes:r,cachePool:f},e!==null&&Gs(t,null),Nc(),Sm(t),e!==null&&ma(e,t,i,!0),t.childLanes=u,null}function sl(e,t){return t=ol({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function xp(e,t,r){return Lr(t,e.child,null,r),e=sl(t,t.pendingProps),e.flags|=2,Lt(t),t.memoizedState=null,e}function jS(e,t,r){var i=t.pendingProps,u=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(Re){if(i.mode==="hidden")return e=sl(t,i),t.lanes=536870912,Ci(null,e);if(Ac(t),(e=$e)?(e=Mg(e,Jt),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Qn!==null?{id:pn,overflow:gn}:null,retryLane:536870912,hydrationErrors:null},r=nm(e),r.return=t,t.child=r,mt=t,$e=null)):e=null,e===null)throw Wn(t);return t.lanes=536870912,null}return sl(t,i)}var f=e.memoizedState;if(f!==null){var y=f.dehydrated;if(Ac(t),u)if(t.flags&256)t.flags&=-257,t=xp(e,t,r);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(l(558));else if(at||ma(e,t,r,!1),u=(r&e.childLanes)!==0,at||u){if(i=Pe,i!==null&&(y=ch(i,r),y!==0&&y!==f.retryLane))throw f.retryLane=y,kr(e,y),Mt(i,e,y),Qc;yl(),t=xp(e,t,r)}else e=f.treeContext,$e=It(y.nextSibling),mt=t,Re=!0,Jn=null,Jt=!1,e!==null&&im(t,e),t=sl(t,i),t.flags|=4096;return t}return e=An(e.child,{mode:i.mode,children:i.children}),e.ref=t.ref,t.child=e,e.return=t,e}function ll(e,t){var r=t.ref;if(r===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof r!="function"&&typeof r!="object")throw Error(l(284));(e===null||e.ref!==r)&&(t.flags|=4194816)}}function Jc(e,t,r,i,u){return zr(t),r=Mc(e,t,r,i,void 0,u),i=Rc(),e!==null&&!at?(Oc(e,t,u),_n(e,t,u)):(Re&&i&&fc(t),t.flags|=1,gt(e,t,r,u),t.child)}function bp(e,t,r,i,u,f){return zr(t),t.updateQueue=null,r=wm(t,i,r,u),jm(e),i=Rc(),e!==null&&!at?(Oc(e,t,f),_n(e,t,f)):(Re&&i&&fc(t),t.flags|=1,gt(e,t,r,f),t.child)}function Sp(e,t,r,i,u){if(zr(t),t.stateNode===null){var f=ua,y=r.contextType;typeof y=="object"&&y!==null&&(f=pt(y)),f=new r(i,f),t.memoizedState=f.state!==null&&f.state!==void 0?f.state:null,f.updater=Kc,t.stateNode=f,f._reactInternals=t,f=t.stateNode,f.props=i,f.state=t.memoizedState,f.refs={},wc(t),y=r.contextType,f.context=typeof y=="object"&&y!==null?pt(y):ua,f.state=t.memoizedState,y=r.getDerivedStateFromProps,typeof y=="function"&&($c(t,r,y,i),f.state=t.memoizedState),typeof r.getDerivedStateFromProps=="function"||typeof f.getSnapshotBeforeUpdate=="function"||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(y=f.state,typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount(),y!==f.state&&Kc.enqueueReplaceState(f,f.state,null),Si(t,i,f,u),bi(),f.state=t.memoizedState),typeof f.componentDidMount=="function"&&(t.flags|=4194308),i=!0}else if(e===null){f=t.stateNode;var j=t.memoizedProps,R=Hr(r,j);f.props=R;var F=f.context,W=r.contextType;y=ua,typeof W=="object"&&W!==null&&(y=pt(W));var re=r.getDerivedStateFromProps;W=typeof re=="function"||typeof f.getSnapshotBeforeUpdate=="function",j=t.pendingProps!==j,W||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(j||F!==y)&&lp(t,f,i,y),er=!1;var X=t.memoizedState;f.state=X,Si(t,i,f,u),bi(),F=t.memoizedState,j||X!==F||er?(typeof re=="function"&&($c(t,r,re,i),F=t.memoizedState),(R=er||sp(t,r,R,i,X,F,y))?(W||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount()),typeof f.componentDidMount=="function"&&(t.flags|=4194308)):(typeof f.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=i,t.memoizedState=F),f.props=i,f.state=F,f.context=y,i=R):(typeof f.componentDidMount=="function"&&(t.flags|=4194308),i=!1)}else{f=t.stateNode,Ec(e,t),y=t.memoizedProps,W=Hr(r,y),f.props=W,re=t.pendingProps,X=f.context,F=r.contextType,R=ua,typeof F=="object"&&F!==null&&(R=pt(F)),j=r.getDerivedStateFromProps,(F=typeof j=="function"||typeof f.getSnapshotBeforeUpdate=="function")||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(y!==re||X!==R)&&lp(t,f,i,R),er=!1,X=t.memoizedState,f.state=X,Si(t,i,f,u),bi();var K=t.memoizedState;y!==re||X!==K||er||e!==null&&e.dependencies!==null&&Ys(e.dependencies)?(typeof j=="function"&&($c(t,r,j,i),K=t.memoizedState),(W=er||sp(t,r,W,i,X,K,R)||e!==null&&e.dependencies!==null&&Ys(e.dependencies))?(F||typeof f.UNSAFE_componentWillUpdate!="function"&&typeof f.componentWillUpdate!="function"||(typeof f.componentWillUpdate=="function"&&f.componentWillUpdate(i,K,R),typeof f.UNSAFE_componentWillUpdate=="function"&&f.UNSAFE_componentWillUpdate(i,K,R)),typeof f.componentDidUpdate=="function"&&(t.flags|=4),typeof f.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof f.componentDidUpdate!="function"||y===e.memoizedProps&&X===e.memoizedState||(t.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&X===e.memoizedState||(t.flags|=1024),t.memoizedProps=i,t.memoizedState=K),f.props=i,f.state=K,f.context=R,i=W):(typeof f.componentDidUpdate!="function"||y===e.memoizedProps&&X===e.memoizedState||(t.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&X===e.memoizedState||(t.flags|=1024),i=!1)}return f=i,ll(e,t),i=(t.flags&128)!==0,f||i?(f=t.stateNode,r=i&&typeof r.getDerivedStateFromError!="function"?null:f.render(),t.flags|=1,e!==null&&i?(t.child=Lr(t,e.child,null,u),t.child=Lr(t,null,r,u)):gt(e,t,r,u),t.memoizedState=f.state,e=t.child):e=_n(e,t,u),e}function jp(e,t,r,i){return Rr(),t.flags|=256,gt(e,t,r,i),t.child}var Wc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Ic(e){return{baseLanes:e,cachePool:dm()}}function eu(e,t,r){return e=e!==null?e.childLanes&~r:0,t&&(e|=Ht),e}function wp(e,t,r){var i=t.pendingProps,u=!1,f=(t.flags&128)!==0,y;if((y=f)||(y=e!==null&&e.memoizedState===null?!1:(et.current&2)!==0),y&&(u=!0,t.flags&=-129),y=(t.flags&32)!==0,t.flags&=-33,e===null){if(Re){if(u?rr(t):ar(),(e=$e)?(e=Mg(e,Jt),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Qn!==null?{id:pn,overflow:gn}:null,retryLane:536870912,hydrationErrors:null},r=nm(e),r.return=t,t.child=r,mt=t,$e=null)):e=null,e===null)throw Wn(t);return Vu(e)?t.lanes=32:t.lanes=536870912,null}var j=i.children;return i=i.fallback,u?(ar(),u=t.mode,j=ol({mode:"hidden",children:j},u),i=Mr(i,u,r,null),j.return=t,i.return=t,j.sibling=i,t.child=j,i=t.child,i.memoizedState=Ic(r),i.childLanes=eu(e,y,r),t.memoizedState=Wc,Ci(null,i)):(rr(t),tu(t,j))}var R=e.memoizedState;if(R!==null&&(j=R.dehydrated,j!==null)){if(f)t.flags&256?(rr(t),t.flags&=-257,t=nu(e,t,r)):t.memoizedState!==null?(ar(),t.child=e.child,t.flags|=128,t=null):(ar(),j=i.fallback,u=t.mode,i=ol({mode:"visible",children:i.children},u),j=Mr(j,u,r,null),j.flags|=2,i.return=t,j.return=t,i.sibling=j,t.child=i,Lr(t,e.child,null,r),i=t.child,i.memoizedState=Ic(r),i.childLanes=eu(e,y,r),t.memoizedState=Wc,t=Ci(null,i));else if(rr(t),Vu(j)){if(y=j.nextSibling&&j.nextSibling.dataset,y)var F=y.dgst;y=F,i=Error(l(419)),i.stack="",i.digest=y,mi({value:i,source:null,stack:null}),t=nu(e,t,r)}else if(at||ma(e,t,r,!1),y=(r&e.childLanes)!==0,at||y){if(y=Pe,y!==null&&(i=ch(y,r),i!==0&&i!==R.retryLane))throw R.retryLane=i,kr(e,i),Mt(y,e,i),Qc;_u(j)||yl(),t=nu(e,t,r)}else _u(j)?(t.flags|=192,t.child=e.child,t=null):(e=R.treeContext,$e=It(j.nextSibling),mt=t,Re=!0,Jn=null,Jt=!1,e!==null&&im(t,e),t=tu(t,i.children),t.flags|=4096);return t}return u?(ar(),j=i.fallback,u=t.mode,R=e.child,F=R.sibling,i=An(R,{mode:"hidden",children:i.children}),i.subtreeFlags=R.subtreeFlags&65011712,F!==null?j=An(F,j):(j=Mr(j,u,r,null),j.flags|=2),j.return=t,i.return=t,i.sibling=j,t.child=i,Ci(null,i),i=t.child,j=e.child.memoizedState,j===null?j=Ic(r):(u=j.cachePool,u!==null?(R=nt._currentValue,u=u.parent!==R?{parent:R,pool:R}:u):u=dm(),j={baseLanes:j.baseLanes|r,cachePool:u}),i.memoizedState=j,i.childLanes=eu(e,y,r),t.memoizedState=Wc,Ci(e.child,i)):(rr(t),r=e.child,e=r.sibling,r=An(r,{mode:"visible",children:i.children}),r.return=t,r.sibling=null,e!==null&&(y=t.deletions,y===null?(t.deletions=[e],t.flags|=16):y.push(e)),t.child=r,t.memoizedState=null,r)}function tu(e,t){return t=ol({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function ol(e,t){return e=Vt(22,e,null,t),e.lanes=0,e}function nu(e,t,r){return Lr(t,e.child,null,r),e=tu(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Ep(e,t,r){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t),yc(e.return,t,r)}function ru(e,t,r,i,u,f){var y=e.memoizedState;y===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:i,tail:r,tailMode:u,treeForkCount:f}:(y.isBackwards=t,y.rendering=null,y.renderingStartTime=0,y.last=i,y.tail=r,y.tailMode=u,y.treeForkCount=f)}function Tp(e,t,r){var i=t.pendingProps,u=i.revealOrder,f=i.tail;i=i.children;var y=et.current,j=(y&2)!==0;if(j?(y=y&1|2,t.flags|=128):y&=1,I(et,y),gt(e,t,i,r),i=Re?hi:0,!j&&e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ep(e,r,t);else if(e.tag===19)Ep(e,r,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(u){case"forwards":for(r=t.child,u=null;r!==null;)e=r.alternate,e!==null&&Qs(e)===null&&(u=r),r=r.sibling;r=u,r===null?(u=t.child,t.child=null):(u=r.sibling,r.sibling=null),ru(t,!1,u,r,f,i);break;case"backwards":case"unstable_legacy-backwards":for(r=null,u=t.child,t.child=null;u!==null;){if(e=u.alternate,e!==null&&Qs(e)===null){t.child=u;break}e=u.sibling,u.sibling=r,r=u,u=e}ru(t,!0,r,null,f,i);break;case"together":ru(t,!1,null,null,void 0,i);break;default:t.memoizedState=null}return t.child}function _n(e,t,r){if(e!==null&&(t.dependencies=e.dependencies),lr|=t.lanes,(r&t.childLanes)===0)if(e!==null){if(ma(e,t,r,!1),(r&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(l(153));if(t.child!==null){for(e=t.child,r=An(e,e.pendingProps),t.child=r,r.return=t;e.sibling!==null;)e=e.sibling,r=r.sibling=An(e,e.pendingProps),r.return=t;r.sibling=null}return t.child}function au(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&Ys(e)))}function wS(e,t,r){switch(t.tag){case 3:ie(t,t.stateNode.containerInfo),In(t,nt,e.memoizedState.cache),Rr();break;case 27:case 5:ce(t);break;case 4:ie(t,t.stateNode.containerInfo);break;case 10:In(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Ac(t),null;break;case 13:var i=t.memoizedState;if(i!==null)return i.dehydrated!==null?(rr(t),t.flags|=128,null):(r&t.child.childLanes)!==0?wp(e,t,r):(rr(t),e=_n(e,t,r),e!==null?e.sibling:null);rr(t);break;case 19:var u=(e.flags&128)!==0;if(i=(r&t.childLanes)!==0,i||(ma(e,t,r,!1),i=(r&t.childLanes)!==0),u){if(i)return Tp(e,t,r);t.flags|=128}if(u=t.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),I(et,et.current),i)break;return null;case 22:return t.lanes=0,yp(e,t,r,t.pendingProps);case 24:In(t,nt,e.memoizedState.cache)}return _n(e,t,r)}function Cp(e,t,r){if(e!==null)if(e.memoizedProps!==t.pendingProps)at=!0;else{if(!au(e,r)&&(t.flags&128)===0)return at=!1,wS(e,t,r);at=(e.flags&131072)!==0}else at=!1,Re&&(t.flags&1048576)!==0&&am(t,hi,t.index);switch(t.lanes=0,t.tag){case 16:e:{var i=t.pendingProps;if(e=Vr(t.elementType),t.type=e,typeof e=="function")cc(e)?(i=Hr(e,i),t.tag=1,t=Sp(null,t,e,i,r)):(t.tag=0,t=Jc(null,t,e,i,r));else{if(e!=null){var u=e.$$typeof;if(u===z){t.tag=11,t=mp(null,t,e,i,r);break e}else if(u===D){t.tag=14,t=pp(null,t,e,i,r);break e}}throw t=de(e)||e,Error(l(306,t,""))}}return t;case 0:return Jc(e,t,t.type,t.pendingProps,r);case 1:return i=t.type,u=Hr(i,t.pendingProps),Sp(e,t,i,u,r);case 3:e:{if(ie(t,t.stateNode.containerInfo),e===null)throw Error(l(387));i=t.pendingProps;var f=t.memoizedState;u=f.element,Ec(e,t),Si(t,i,null,r);var y=t.memoizedState;if(i=y.cache,In(t,nt,i),i!==f.cache&&vc(t,[nt],r,!0),bi(),i=y.element,f.isDehydrated)if(f={element:i,isDehydrated:!1,cache:y.cache},t.updateQueue.baseState=f,t.memoizedState=f,t.flags&256){t=jp(e,t,i,r);break e}else if(i!==u){u=Kt(Error(l(424)),t),mi(u),t=jp(e,t,i,r);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for($e=It(e.firstChild),mt=t,Re=!0,Jn=null,Jt=!0,r=ym(t,null,i,r),t.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling}else{if(Rr(),i===u){t=_n(e,t,r);break e}gt(e,t,i,r)}t=t.child}return t;case 26:return ll(e,t),e===null?(r=Bg(t.type,null,t.pendingProps,null))?t.memoizedState=r:Re||(r=t.type,e=t.pendingProps,i=El(me.current).createElement(r),i[ht]=t,i[Tt]=e,yt(i,r,e),ut(i),t.stateNode=i):t.memoizedState=Bg(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return ce(t),e===null&&Re&&(i=t.stateNode=zg(t.type,t.pendingProps,me.current),mt=t,Jt=!0,u=$e,fr(t.type)?(Bu=u,$e=It(i.firstChild)):$e=u),gt(e,t,t.pendingProps.children,r),ll(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&Re&&((u=i=$e)&&(i=IS(i,t.type,t.pendingProps,Jt),i!==null?(t.stateNode=i,mt=t,$e=It(i.firstChild),Jt=!1,u=!0):u=!1),u||Wn(t)),ce(t),u=t.type,f=t.pendingProps,y=e!==null?e.memoizedProps:null,i=f.children,Ru(u,f)?i=null:y!==null&&Ru(u,y)&&(t.flags|=32),t.memoizedState!==null&&(u=Mc(e,t,mS,null,null,r),qi._currentValue=u),ll(e,t),gt(e,t,i,r),t.child;case 6:return e===null&&Re&&((e=r=$e)&&(r=ej(r,t.pendingProps,Jt),r!==null?(t.stateNode=r,mt=t,$e=null,e=!0):e=!1),e||Wn(t)),null;case 13:return wp(e,t,r);case 4:return ie(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=Lr(t,null,i,r):gt(e,t,i,r),t.child;case 11:return mp(e,t,t.type,t.pendingProps,r);case 7:return gt(e,t,t.pendingProps,r),t.child;case 8:return gt(e,t,t.pendingProps.children,r),t.child;case 12:return gt(e,t,t.pendingProps.children,r),t.child;case 10:return i=t.pendingProps,In(t,t.type,i.value),gt(e,t,i.children,r),t.child;case 9:return u=t.type._context,i=t.pendingProps.children,zr(t),u=pt(u),i=i(u),t.flags|=1,gt(e,t,i,r),t.child;case 14:return pp(e,t,t.type,t.pendingProps,r);case 15:return gp(e,t,t.type,t.pendingProps,r);case 19:return Tp(e,t,r);case 31:return jS(e,t,r);case 22:return yp(e,t,r,t.pendingProps);case 24:return zr(t),i=pt(nt),e===null?(u=Sc(),u===null&&(u=Pe,f=xc(),u.pooledCache=f,f.refCount++,f!==null&&(u.pooledCacheLanes|=r),u=f),t.memoizedState={parent:i,cache:u},wc(t),In(t,nt,u)):((e.lanes&r)!==0&&(Ec(e,t),Si(t,null,null,r),bi()),u=e.memoizedState,f=t.memoizedState,u.parent!==i?(u={parent:i,cache:i},t.memoizedState=u,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=u),In(t,nt,i)):(i=f.cache,In(t,nt,i),i!==u.cache&&vc(t,[nt],r,!0))),gt(e,t,t.pendingProps.children,r),t.child;case 29:throw t.pendingProps}throw Error(l(156,t.tag))}function Vn(e){e.flags|=4}function iu(e,t,r,i,u){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(u&335544128)===u)if(e.stateNode.complete)e.flags|=8192;else if(Ip())e.flags|=8192;else throw Br=Xs,jc}else e.flags&=-16777217}function Np(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Yg(t))if(Ip())e.flags|=8192;else throw Br=Xs,jc}function cl(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?sh():536870912,e.lanes|=t,Ca|=t)}function Ni(e,t){if(!Re)switch(e.tailMode){case"hidden":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var i=null;r!==null;)r.alternate!==null&&(i=r),r=r.sibling;i===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null}}function Ke(e){var t=e.alternate!==null&&e.alternate.child===e.child,r=0,i=0;if(t)for(var u=e.child;u!==null;)r|=u.lanes|u.childLanes,i|=u.subtreeFlags&65011712,i|=u.flags&65011712,u.return=e,u=u.sibling;else for(u=e.child;u!==null;)r|=u.lanes|u.childLanes,i|=u.subtreeFlags,i|=u.flags,u.return=e,u=u.sibling;return e.subtreeFlags|=i,e.childLanes=r,t}function ES(e,t,r){var i=t.pendingProps;switch(hc(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ke(t),null;case 1:return Ke(t),null;case 3:return r=t.stateNode,i=null,e!==null&&(i=e.memoizedState.cache),t.memoizedState.cache!==i&&(t.flags|=2048),Rn(nt),J(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(ha(t)?Vn(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,pc())),Ke(t),null;case 26:var u=t.type,f=t.memoizedState;return e===null?(Vn(t),f!==null?(Ke(t),Np(t,f)):(Ke(t),iu(t,u,null,i,r))):f?f!==e.memoizedState?(Vn(t),Ke(t),Np(t,f)):(Ke(t),t.flags&=-16777217):(e=e.memoizedProps,e!==i&&Vn(t),Ke(t),iu(t,u,e,i,r)),null;case 27:if(te(t),r=me.current,u=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&Vn(t);else{if(!i){if(t.stateNode===null)throw Error(l(166));return Ke(t),null}e=ne.current,ha(t)?sm(t):(e=zg(u,i,r),t.stateNode=e,Vn(t))}return Ke(t),null;case 5:if(te(t),u=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&Vn(t);else{if(!i){if(t.stateNode===null)throw Error(l(166));return Ke(t),null}if(f=ne.current,ha(t))sm(t);else{var y=El(me.current);switch(f){case 1:f=y.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:f=y.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":f=y.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":f=y.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":f=y.createElement("div"),f.innerHTML="<script><\/script>",f=f.removeChild(f.firstChild);break;case"select":f=typeof i.is=="string"?y.createElement("select",{is:i.is}):y.createElement("select"),i.multiple?f.multiple=!0:i.size&&(f.size=i.size);break;default:f=typeof i.is=="string"?y.createElement(u,{is:i.is}):y.createElement(u)}}f[ht]=t,f[Tt]=i;e:for(y=t.child;y!==null;){if(y.tag===5||y.tag===6)f.appendChild(y.stateNode);else if(y.tag!==4&&y.tag!==27&&y.child!==null){y.child.return=y,y=y.child;continue}if(y===t)break e;for(;y.sibling===null;){if(y.return===null||y.return===t)break e;y=y.return}y.sibling.return=y.return,y=y.sibling}t.stateNode=f;e:switch(yt(f,u,i),u){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}i&&Vn(t)}}return Ke(t),iu(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,r),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==i&&Vn(t);else{if(typeof i!="string"&&t.stateNode===null)throw Error(l(166));if(e=me.current,ha(t)){if(e=t.stateNode,r=t.memoizedProps,i=null,u=mt,u!==null)switch(u.tag){case 27:case 5:i=u.memoizedProps}e[ht]=t,e=!!(e.nodeValue===r||i!==null&&i.suppressHydrationWarning===!0||wg(e.nodeValue,r)),e||Wn(t,!0)}else e=El(e).createTextNode(i),e[ht]=t,t.stateNode=e}return Ke(t),null;case 31:if(r=t.memoizedState,e===null||e.memoizedState!==null){if(i=ha(t),r!==null){if(e===null){if(!i)throw Error(l(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(l(557));e[ht]=t}else Rr(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ke(t),e=!1}else r=pc(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=r),e=!0;if(!e)return t.flags&256?(Lt(t),t):(Lt(t),null);if((t.flags&128)!==0)throw Error(l(558))}return Ke(t),null;case 13:if(i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(u=ha(t),i!==null&&i.dehydrated!==null){if(e===null){if(!u)throw Error(l(318));if(u=t.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(l(317));u[ht]=t}else Rr(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ke(t),u=!1}else u=pc(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=u),u=!0;if(!u)return t.flags&256?(Lt(t),t):(Lt(t),null)}return Lt(t),(t.flags&128)!==0?(t.lanes=r,t):(r=i!==null,e=e!==null&&e.memoizedState!==null,r&&(i=t.child,u=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(u=i.alternate.memoizedState.cachePool.pool),f=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(f=i.memoizedState.cachePool.pool),f!==u&&(i.flags|=2048)),r!==e&&r&&(t.child.flags|=8192),cl(t,t.updateQueue),Ke(t),null);case 4:return J(),e===null&&Nu(t.stateNode.containerInfo),Ke(t),null;case 10:return Rn(t.type),Ke(t),null;case 19:if(V(et),i=t.memoizedState,i===null)return Ke(t),null;if(u=(t.flags&128)!==0,f=i.rendering,f===null)if(u)Ni(i,!1);else{if(Je!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(f=Qs(e),f!==null){for(t.flags|=128,Ni(i,!1),e=f.updateQueue,t.updateQueue=e,cl(t,e),t.subtreeFlags=0,e=r,r=t.child;r!==null;)tm(r,e),r=r.sibling;return I(et,et.current&1|2),Re&&kn(t,i.treeForkCount),t.child}e=e.sibling}i.tail!==null&&Rt()>ml&&(t.flags|=128,u=!0,Ni(i,!1),t.lanes=4194304)}else{if(!u)if(e=Qs(f),e!==null){if(t.flags|=128,u=!0,e=e.updateQueue,t.updateQueue=e,cl(t,e),Ni(i,!0),i.tail===null&&i.tailMode==="hidden"&&!f.alternate&&!Re)return Ke(t),null}else 2*Rt()-i.renderingStartTime>ml&&r!==536870912&&(t.flags|=128,u=!0,Ni(i,!1),t.lanes=4194304);i.isBackwards?(f.sibling=t.child,t.child=f):(e=i.last,e!==null?e.sibling=f:t.child=f,i.last=f)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=Rt(),e.sibling=null,r=et.current,I(et,u?r&1|2:r&1),Re&&kn(t,i.treeForkCount),e):(Ke(t),null);case 22:case 23:return Lt(t),Dc(),i=t.memoizedState!==null,e!==null?e.memoizedState!==null!==i&&(t.flags|=8192):i&&(t.flags|=8192),i?(r&536870912)!==0&&(t.flags&128)===0&&(Ke(t),t.subtreeFlags&6&&(t.flags|=8192)):Ke(t),r=t.updateQueue,r!==null&&cl(t,r.retryQueue),r=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(r=e.memoizedState.cachePool.pool),i=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(i=t.memoizedState.cachePool.pool),i!==r&&(t.flags|=2048),e!==null&&V(_r),null;case 24:return r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),Rn(nt),Ke(t),null;case 25:return null;case 30:return null}throw Error(l(156,t.tag))}function TS(e,t){switch(hc(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Rn(nt),J(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return te(t),null;case 31:if(t.memoizedState!==null){if(Lt(t),t.alternate===null)throw Error(l(340));Rr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Lt(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(l(340));Rr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return V(et),null;case 4:return J(),null;case 10:return Rn(t.type),null;case 22:case 23:return Lt(t),Dc(),e!==null&&V(_r),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Rn(nt),null;case 25:return null;default:return null}}function Dp(e,t){switch(hc(t),t.tag){case 3:Rn(nt),J();break;case 26:case 27:case 5:te(t);break;case 4:J();break;case 31:t.memoizedState!==null&&Lt(t);break;case 13:Lt(t);break;case 19:V(et);break;case 10:Rn(t.type);break;case 22:case 23:Lt(t),Dc(),e!==null&&V(_r);break;case 24:Rn(nt)}}function Di(e,t){try{var r=t.updateQueue,i=r!==null?r.lastEffect:null;if(i!==null){var u=i.next;r=u;do{if((r.tag&e)===e){i=void 0;var f=r.create,y=r.inst;i=f(),y.destroy=i}r=r.next}while(r!==u)}}catch(j){Le(t,t.return,j)}}function ir(e,t,r){try{var i=t.updateQueue,u=i!==null?i.lastEffect:null;if(u!==null){var f=u.next;i=f;do{if((i.tag&e)===e){var y=i.inst,j=y.destroy;if(j!==void 0){y.destroy=void 0,u=t;var R=r,F=j;try{F()}catch(W){Le(u,R,W)}}}i=i.next}while(i!==f)}}catch(W){Le(t,t.return,W)}}function Ap(e){var t=e.updateQueue;if(t!==null){var r=e.stateNode;try{xm(t,r)}catch(i){Le(e,e.return,i)}}}function kp(e,t,r){r.props=Hr(e.type,e.memoizedProps),r.state=e.memoizedState;try{r.componentWillUnmount()}catch(i){Le(e,t,i)}}function Ai(e,t){try{var r=e.ref;if(r!==null){switch(e.tag){case 26:case 27:case 5:var i=e.stateNode;break;case 30:i=e.stateNode;break;default:i=e.stateNode}typeof r=="function"?e.refCleanup=r(i):r.current=i}}catch(u){Le(e,t,u)}}function yn(e,t){var r=e.ref,i=e.refCleanup;if(r!==null)if(typeof i=="function")try{i()}catch(u){Le(e,t,u)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof r=="function")try{r(null)}catch(u){Le(e,t,u)}else r.current=null}function Mp(e){var t=e.type,r=e.memoizedProps,i=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":r.autoFocus&&i.focus();break e;case"img":r.src?i.src=r.src:r.srcSet&&(i.srcset=r.srcSet)}}catch(u){Le(e,e.return,u)}}function su(e,t,r){try{var i=e.stateNode;$S(i,e.type,r,t),i[Tt]=t}catch(u){Le(e,e.return,u)}}function Rp(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&fr(e.type)||e.tag===4}function lu(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Rp(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&fr(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function ou(e,t,r){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?(r.nodeType===9?r.body:r.nodeName==="HTML"?r.ownerDocument.body:r).insertBefore(e,t):(t=r.nodeType===9?r.body:r.nodeName==="HTML"?r.ownerDocument.body:r,t.appendChild(e),r=r._reactRootContainer,r!=null||t.onclick!==null||(t.onclick=Nn));else if(i!==4&&(i===27&&fr(e.type)&&(r=e.stateNode,t=null),e=e.child,e!==null))for(ou(e,t,r),e=e.sibling;e!==null;)ou(e,t,r),e=e.sibling}function ul(e,t,r){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?r.insertBefore(e,t):r.appendChild(e);else if(i!==4&&(i===27&&fr(e.type)&&(r=e.stateNode),e=e.child,e!==null))for(ul(e,t,r),e=e.sibling;e!==null;)ul(e,t,r),e=e.sibling}function Op(e){var t=e.stateNode,r=e.memoizedProps;try{for(var i=e.type,u=t.attributes;u.length;)t.removeAttributeNode(u[0]);yt(t,i,r),t[ht]=e,t[Tt]=r}catch(f){Le(e,e.return,f)}}var Bn=!1,it=!1,cu=!1,zp=typeof WeakSet=="function"?WeakSet:Set,dt=null;function CS(e,t){if(e=e.containerInfo,ku=Ml,e=Xh(e),nc(e)){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{r=(r=e.ownerDocument)&&r.defaultView||window;var i=r.getSelection&&r.getSelection();if(i&&i.rangeCount!==0){r=i.anchorNode;var u=i.anchorOffset,f=i.focusNode;i=i.focusOffset;try{r.nodeType,f.nodeType}catch{r=null;break e}var y=0,j=-1,R=-1,F=0,W=0,re=e,X=null;t:for(;;){for(var K;re!==r||u!==0&&re.nodeType!==3||(j=y+u),re!==f||i!==0&&re.nodeType!==3||(R=y+i),re.nodeType===3&&(y+=re.nodeValue.length),(K=re.firstChild)!==null;)X=re,re=K;for(;;){if(re===e)break t;if(X===r&&++F===u&&(j=y),X===f&&++W===i&&(R=y),(K=re.nextSibling)!==null)break;re=X,X=re.parentNode}re=K}r=j===-1||R===-1?null:{start:j,end:R}}else r=null}r=r||{start:0,end:0}}else r=null;for(Mu={focusedElem:e,selectionRange:r},Ml=!1,dt=t;dt!==null;)if(t=dt,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,dt=e;else for(;dt!==null;){switch(t=dt,f=t.alternate,e=t.flags,t.tag){case 0:if((e&4)!==0&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(r=0;r<e.length;r++)u=e[r],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&f!==null){e=void 0,r=t,u=f.memoizedProps,f=f.memoizedState,i=r.stateNode;try{var pe=Hr(r.type,u);e=i.getSnapshotBeforeUpdate(pe,f),i.__reactInternalSnapshotBeforeUpdate=e}catch(Se){Le(r,r.return,Se)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,r=e.nodeType,r===9)zu(e);else if(r===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":zu(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(l(163))}if(e=t.sibling,e!==null){e.return=t.return,dt=e;break}dt=t.return}}function _p(e,t,r){var i=r.flags;switch(r.tag){case 0:case 11:case 15:Un(e,r),i&4&&Di(5,r);break;case 1:if(Un(e,r),i&4)if(e=r.stateNode,t===null)try{e.componentDidMount()}catch(y){Le(r,r.return,y)}else{var u=Hr(r.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(u,t,e.__reactInternalSnapshotBeforeUpdate)}catch(y){Le(r,r.return,y)}}i&64&&Ap(r),i&512&&Ai(r,r.return);break;case 3:if(Un(e,r),i&64&&(e=r.updateQueue,e!==null)){if(t=null,r.child!==null)switch(r.child.tag){case 27:case 5:t=r.child.stateNode;break;case 1:t=r.child.stateNode}try{xm(e,t)}catch(y){Le(r,r.return,y)}}break;case 27:t===null&&i&4&&Op(r);case 26:case 5:Un(e,r),t===null&&i&4&&Mp(r),i&512&&Ai(r,r.return);break;case 12:Un(e,r);break;case 31:Un(e,r),i&4&&Lp(e,r);break;case 13:Un(e,r),i&4&&Up(e,r),i&64&&(e=r.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(r=_S.bind(null,r),tj(e,r))));break;case 22:if(i=r.memoizedState!==null||Bn,!i){t=t!==null&&t.memoizedState!==null||it,u=Bn;var f=it;Bn=i,(it=t)&&!f?Hn(e,r,(r.subtreeFlags&8772)!==0):Un(e,r),Bn=u,it=f}break;case 30:break;default:Un(e,r)}}function Vp(e){var t=e.alternate;t!==null&&(e.alternate=null,Vp(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Uo(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Ze=null,Nt=!1;function Ln(e,t,r){for(r=r.child;r!==null;)Bp(e,t,r),r=r.sibling}function Bp(e,t,r){if(Ot&&typeof Ot.onCommitFiberUnmount=="function")try{Ot.onCommitFiberUnmount(Ia,r)}catch{}switch(r.tag){case 26:it||yn(r,t),Ln(e,t,r),r.memoizedState?r.memoizedState.count--:r.stateNode&&(r=r.stateNode,r.parentNode.removeChild(r));break;case 27:it||yn(r,t);var i=Ze,u=Nt;fr(r.type)&&(Ze=r.stateNode,Nt=!1),Ln(e,t,r),Li(r.stateNode),Ze=i,Nt=u;break;case 5:it||yn(r,t);case 6:if(i=Ze,u=Nt,Ze=null,Ln(e,t,r),Ze=i,Nt=u,Ze!==null)if(Nt)try{(Ze.nodeType===9?Ze.body:Ze.nodeName==="HTML"?Ze.ownerDocument.body:Ze).removeChild(r.stateNode)}catch(f){Le(r,t,f)}else try{Ze.removeChild(r.stateNode)}catch(f){Le(r,t,f)}break;case 18:Ze!==null&&(Nt?(e=Ze,Ag(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,r.stateNode),za(e)):Ag(Ze,r.stateNode));break;case 4:i=Ze,u=Nt,Ze=r.stateNode.containerInfo,Nt=!0,Ln(e,t,r),Ze=i,Nt=u;break;case 0:case 11:case 14:case 15:ir(2,r,t),it||ir(4,r,t),Ln(e,t,r);break;case 1:it||(yn(r,t),i=r.stateNode,typeof i.componentWillUnmount=="function"&&kp(r,t,i)),Ln(e,t,r);break;case 21:Ln(e,t,r);break;case 22:it=(i=it)||r.memoizedState!==null,Ln(e,t,r),it=i;break;default:Ln(e,t,r)}}function Lp(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{za(e)}catch(r){Le(t,t.return,r)}}}function Up(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{za(e)}catch(r){Le(t,t.return,r)}}function NS(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new zp),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new zp),t;default:throw Error(l(435,e.tag))}}function dl(e,t){var r=NS(e);t.forEach(function(i){if(!r.has(i)){r.add(i);var u=VS.bind(null,e,i);i.then(u,u)}})}function Dt(e,t){var r=t.deletions;if(r!==null)for(var i=0;i<r.length;i++){var u=r[i],f=e,y=t,j=y;e:for(;j!==null;){switch(j.tag){case 27:if(fr(j.type)){Ze=j.stateNode,Nt=!1;break e}break;case 5:Ze=j.stateNode,Nt=!1;break e;case 3:case 4:Ze=j.stateNode.containerInfo,Nt=!0;break e}j=j.return}if(Ze===null)throw Error(l(160));Bp(f,y,u),Ze=null,Nt=!1,f=u.alternate,f!==null&&(f.return=null),u.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Hp(t,e),t=t.sibling}var on=null;function Hp(e,t){var r=e.alternate,i=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Dt(t,e),At(e),i&4&&(ir(3,e,e.return),Di(3,e),ir(5,e,e.return));break;case 1:Dt(t,e),At(e),i&512&&(it||r===null||yn(r,r.return)),i&64&&Bn&&(e=e.updateQueue,e!==null&&(i=e.callbacks,i!==null&&(r=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=r===null?i:r.concat(i))));break;case 26:var u=on;if(Dt(t,e),At(e),i&512&&(it||r===null||yn(r,r.return)),i&4){var f=r!==null?r.memoizedState:null;if(i=e.memoizedState,r===null)if(i===null)if(e.stateNode===null){e:{i=e.type,r=e.memoizedProps,u=u.ownerDocument||u;t:switch(i){case"title":f=u.getElementsByTagName("title")[0],(!f||f[ni]||f[ht]||f.namespaceURI==="http://www.w3.org/2000/svg"||f.hasAttribute("itemprop"))&&(f=u.createElement(i),u.head.insertBefore(f,u.querySelector("head > title"))),yt(f,i,r),f[ht]=e,ut(f),i=f;break e;case"link":var y=Hg("link","href",u).get(i+(r.href||""));if(y){for(var j=0;j<y.length;j++)if(f=y[j],f.getAttribute("href")===(r.href==null||r.href===""?null:r.href)&&f.getAttribute("rel")===(r.rel==null?null:r.rel)&&f.getAttribute("title")===(r.title==null?null:r.title)&&f.getAttribute("crossorigin")===(r.crossOrigin==null?null:r.crossOrigin)){y.splice(j,1);break t}}f=u.createElement(i),yt(f,i,r),u.head.appendChild(f);break;case"meta":if(y=Hg("meta","content",u).get(i+(r.content||""))){for(j=0;j<y.length;j++)if(f=y[j],f.getAttribute("content")===(r.content==null?null:""+r.content)&&f.getAttribute("name")===(r.name==null?null:r.name)&&f.getAttribute("property")===(r.property==null?null:r.property)&&f.getAttribute("http-equiv")===(r.httpEquiv==null?null:r.httpEquiv)&&f.getAttribute("charset")===(r.charSet==null?null:r.charSet)){y.splice(j,1);break t}}f=u.createElement(i),yt(f,i,r),u.head.appendChild(f);break;default:throw Error(l(468,i))}f[ht]=e,ut(f),i=f}e.stateNode=i}else qg(u,e.type,e.stateNode);else e.stateNode=Ug(u,i,e.memoizedProps);else f!==i?(f===null?r.stateNode!==null&&(r=r.stateNode,r.parentNode.removeChild(r)):f.count--,i===null?qg(u,e.type,e.stateNode):Ug(u,i,e.memoizedProps)):i===null&&e.stateNode!==null&&su(e,e.memoizedProps,r.memoizedProps)}break;case 27:Dt(t,e),At(e),i&512&&(it||r===null||yn(r,r.return)),r!==null&&i&4&&su(e,e.memoizedProps,r.memoizedProps);break;case 5:if(Dt(t,e),At(e),i&512&&(it||r===null||yn(r,r.return)),e.flags&32){u=e.stateNode;try{ra(u,"")}catch(pe){Le(e,e.return,pe)}}i&4&&e.stateNode!=null&&(u=e.memoizedProps,su(e,u,r!==null?r.memoizedProps:u)),i&1024&&(cu=!0);break;case 6:if(Dt(t,e),At(e),i&4){if(e.stateNode===null)throw Error(l(162));i=e.memoizedProps,r=e.stateNode;try{r.nodeValue=i}catch(pe){Le(e,e.return,pe)}}break;case 3:if(Nl=null,u=on,on=Tl(t.containerInfo),Dt(t,e),on=u,At(e),i&4&&r!==null&&r.memoizedState.isDehydrated)try{za(t.containerInfo)}catch(pe){Le(e,e.return,pe)}cu&&(cu=!1,qp(e));break;case 4:i=on,on=Tl(e.stateNode.containerInfo),Dt(t,e),At(e),on=i;break;case 12:Dt(t,e),At(e);break;case 31:Dt(t,e),At(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,dl(e,i)));break;case 13:Dt(t,e),At(e),e.child.flags&8192&&e.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(hl=Rt()),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,dl(e,i)));break;case 22:u=e.memoizedState!==null;var R=r!==null&&r.memoizedState!==null,F=Bn,W=it;if(Bn=F||u,it=W||R,Dt(t,e),it=W,Bn=F,At(e),i&8192)e:for(t=e.stateNode,t._visibility=u?t._visibility&-2:t._visibility|1,u&&(r===null||R||Bn||it||qr(e)),r=null,t=e;;){if(t.tag===5||t.tag===26){if(r===null){R=r=t;try{if(f=R.stateNode,u)y=f.style,typeof y.setProperty=="function"?y.setProperty("display","none","important"):y.display="none";else{j=R.stateNode;var re=R.memoizedProps.style,X=re!=null&&re.hasOwnProperty("display")?re.display:null;j.style.display=X==null||typeof X=="boolean"?"":(""+X).trim()}}catch(pe){Le(R,R.return,pe)}}}else if(t.tag===6){if(r===null){R=t;try{R.stateNode.nodeValue=u?"":R.memoizedProps}catch(pe){Le(R,R.return,pe)}}}else if(t.tag===18){if(r===null){R=t;try{var K=R.stateNode;u?kg(K,!0):kg(R.stateNode,!1)}catch(pe){Le(R,R.return,pe)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;r===t&&(r=null),t=t.return}r===t&&(r=null),t.sibling.return=t.return,t=t.sibling}i&4&&(i=e.updateQueue,i!==null&&(r=i.retryQueue,r!==null&&(i.retryQueue=null,dl(e,r))));break;case 19:Dt(t,e),At(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,dl(e,i)));break;case 30:break;case 21:break;default:Dt(t,e),At(e)}}function At(e){var t=e.flags;if(t&2){try{for(var r,i=e.return;i!==null;){if(Rp(i)){r=i;break}i=i.return}if(r==null)throw Error(l(160));switch(r.tag){case 27:var u=r.stateNode,f=lu(e);ul(e,f,u);break;case 5:var y=r.stateNode;r.flags&32&&(ra(y,""),r.flags&=-33);var j=lu(e);ul(e,j,y);break;case 3:case 4:var R=r.stateNode.containerInfo,F=lu(e);ou(e,F,R);break;default:throw Error(l(161))}}catch(W){Le(e,e.return,W)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function qp(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;qp(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function Un(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)_p(e,t.alternate,t),t=t.sibling}function qr(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:ir(4,t,t.return),qr(t);break;case 1:yn(t,t.return);var r=t.stateNode;typeof r.componentWillUnmount=="function"&&kp(t,t.return,r),qr(t);break;case 27:Li(t.stateNode);case 26:case 5:yn(t,t.return),qr(t);break;case 22:t.memoizedState===null&&qr(t);break;case 30:qr(t);break;default:qr(t)}e=e.sibling}}function Hn(e,t,r){for(r=r&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var i=t.alternate,u=e,f=t,y=f.flags;switch(f.tag){case 0:case 11:case 15:Hn(u,f,r),Di(4,f);break;case 1:if(Hn(u,f,r),i=f,u=i.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(F){Le(i,i.return,F)}if(i=f,u=i.updateQueue,u!==null){var j=i.stateNode;try{var R=u.shared.hiddenCallbacks;if(R!==null)for(u.shared.hiddenCallbacks=null,u=0;u<R.length;u++)vm(R[u],j)}catch(F){Le(i,i.return,F)}}r&&y&64&&Ap(f),Ai(f,f.return);break;case 27:Op(f);case 26:case 5:Hn(u,f,r),r&&i===null&&y&4&&Mp(f),Ai(f,f.return);break;case 12:Hn(u,f,r);break;case 31:Hn(u,f,r),r&&y&4&&Lp(u,f);break;case 13:Hn(u,f,r),r&&y&4&&Up(u,f);break;case 22:f.memoizedState===null&&Hn(u,f,r),Ai(f,f.return);break;case 30:break;default:Hn(u,f,r)}t=t.sibling}}function uu(e,t){var r=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(r=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==r&&(e!=null&&e.refCount++,r!=null&&pi(r))}function du(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&pi(e))}function cn(e,t,r,i){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Yp(e,t,r,i),t=t.sibling}function Yp(e,t,r,i){var u=t.flags;switch(t.tag){case 0:case 11:case 15:cn(e,t,r,i),u&2048&&Di(9,t);break;case 1:cn(e,t,r,i);break;case 3:cn(e,t,r,i),u&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&pi(e)));break;case 12:if(u&2048){cn(e,t,r,i),e=t.stateNode;try{var f=t.memoizedProps,y=f.id,j=f.onPostCommit;typeof j=="function"&&j(y,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(R){Le(t,t.return,R)}}else cn(e,t,r,i);break;case 31:cn(e,t,r,i);break;case 13:cn(e,t,r,i);break;case 23:break;case 22:f=t.stateNode,y=t.alternate,t.memoizedState!==null?f._visibility&2?cn(e,t,r,i):ki(e,t):f._visibility&2?cn(e,t,r,i):(f._visibility|=2,wa(e,t,r,i,(t.subtreeFlags&10256)!==0||!1)),u&2048&&uu(y,t);break;case 24:cn(e,t,r,i),u&2048&&du(t.alternate,t);break;default:cn(e,t,r,i)}}function wa(e,t,r,i,u){for(u=u&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var f=e,y=t,j=r,R=i,F=y.flags;switch(y.tag){case 0:case 11:case 15:wa(f,y,j,R,u),Di(8,y);break;case 23:break;case 22:var W=y.stateNode;y.memoizedState!==null?W._visibility&2?wa(f,y,j,R,u):ki(f,y):(W._visibility|=2,wa(f,y,j,R,u)),u&&F&2048&&uu(y.alternate,y);break;case 24:wa(f,y,j,R,u),u&&F&2048&&du(y.alternate,y);break;default:wa(f,y,j,R,u)}t=t.sibling}}function ki(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var r=e,i=t,u=i.flags;switch(i.tag){case 22:ki(r,i),u&2048&&uu(i.alternate,i);break;case 24:ki(r,i),u&2048&&du(i.alternate,i);break;default:ki(r,i)}t=t.sibling}}var Mi=8192;function Ea(e,t,r){if(e.subtreeFlags&Mi)for(e=e.child;e!==null;)Pp(e,t,r),e=e.sibling}function Pp(e,t,r){switch(e.tag){case 26:Ea(e,t,r),e.flags&Mi&&e.memoizedState!==null&&hj(r,on,e.memoizedState,e.memoizedProps);break;case 5:Ea(e,t,r);break;case 3:case 4:var i=on;on=Tl(e.stateNode.containerInfo),Ea(e,t,r),on=i;break;case 22:e.memoizedState===null&&(i=e.alternate,i!==null&&i.memoizedState!==null?(i=Mi,Mi=16777216,Ea(e,t,r),Mi=i):Ea(e,t,r));break;default:Ea(e,t,r)}}function Gp(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Ri(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var r=0;r<t.length;r++){var i=t[r];dt=i,Xp(i,e)}Gp(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Fp(e),e=e.sibling}function Fp(e){switch(e.tag){case 0:case 11:case 15:Ri(e),e.flags&2048&&ir(9,e,e.return);break;case 3:Ri(e);break;case 12:Ri(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,fl(e)):Ri(e);break;default:Ri(e)}}function fl(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var r=0;r<t.length;r++){var i=t[r];dt=i,Xp(i,e)}Gp(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:ir(8,t,t.return),fl(t);break;case 22:r=t.stateNode,r._visibility&2&&(r._visibility&=-3,fl(t));break;default:fl(t)}e=e.sibling}}function Xp(e,t){for(;dt!==null;){var r=dt;switch(r.tag){case 0:case 11:case 15:ir(8,r,t);break;case 23:case 22:if(r.memoizedState!==null&&r.memoizedState.cachePool!==null){var i=r.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:pi(r.memoizedState.cache)}if(i=r.child,i!==null)i.return=r,dt=i;else e:for(r=e;dt!==null;){i=dt;var u=i.sibling,f=i.return;if(Vp(i),i===r){dt=null;break e}if(u!==null){u.return=f,dt=u;break e}dt=f}}}var DS={getCacheForType:function(e){var t=pt(nt),r=t.data.get(e);return r===void 0&&(r=e(),t.data.set(e,r)),r},cacheSignal:function(){return pt(nt).controller.signal}},AS=typeof WeakMap=="function"?WeakMap:Map,_e=0,Pe=null,De=null,ke=0,Be=0,Ut=null,sr=!1,Ta=!1,fu=!1,qn=0,Je=0,lr=0,Yr=0,hu=0,Ht=0,Ca=0,Oi=null,kt=null,mu=!1,hl=0,$p=0,ml=1/0,pl=null,or=null,lt=0,cr=null,Na=null,Yn=0,pu=0,gu=null,Kp=null,zi=0,yu=null;function qt(){return(_e&2)!==0&&ke!==0?ke&-ke:Y.T!==null?wu():uh()}function Zp(){if(Ht===0)if((ke&536870912)===0||Re){var e=ws;ws<<=1,(ws&3932160)===0&&(ws=262144),Ht=e}else Ht=536870912;return e=Bt.current,e!==null&&(e.flags|=32),Ht}function Mt(e,t,r){(e===Pe&&(Be===2||Be===9)||e.cancelPendingCommit!==null)&&(Da(e,0),ur(e,ke,Ht,!1)),ti(e,r),((_e&2)===0||e!==Pe)&&(e===Pe&&((_e&2)===0&&(Yr|=r),Je===4&&ur(e,ke,Ht,!1)),vn(e))}function Qp(e,t,r){if((_e&6)!==0)throw Error(l(327));var i=!r&&(t&127)===0&&(t&e.expiredLanes)===0||ei(e,t),u=i?RS(e,t):xu(e,t,!0),f=i;do{if(u===0){Ta&&!i&&ur(e,t,0,!1);break}else{if(r=e.current.alternate,f&&!kS(r)){u=xu(e,t,!1),f=!1;continue}if(u===2){if(f=t,e.errorRecoveryDisabledLanes&f)var y=0;else y=e.pendingLanes&-536870913,y=y!==0?y:y&536870912?536870912:0;if(y!==0){t=y;e:{var j=e;u=Oi;var R=j.current.memoizedState.isDehydrated;if(R&&(Da(j,y).flags|=256),y=xu(j,y,!1),y!==2){if(fu&&!R){j.errorRecoveryDisabledLanes|=f,Yr|=f,u=4;break e}f=kt,kt=u,f!==null&&(kt===null?kt=f:kt.push.apply(kt,f))}u=y}if(f=!1,u!==2)continue}}if(u===1){Da(e,0),ur(e,t,0,!0);break}e:{switch(i=e,f=u,f){case 0:case 1:throw Error(l(345));case 4:if((t&4194048)!==t)break;case 6:ur(i,t,Ht,!sr);break e;case 2:kt=null;break;case 3:case 5:break;default:throw Error(l(329))}if((t&62914560)===t&&(u=hl+300-Rt(),10<u)){if(ur(i,t,Ht,!sr),Ts(i,0,!0)!==0)break e;Yn=t,i.timeoutHandle=Ng(Jp.bind(null,i,r,kt,pl,mu,t,Ht,Yr,Ca,sr,f,"Throttled",-0,0),u);break e}Jp(i,r,kt,pl,mu,t,Ht,Yr,Ca,sr,f,null,-0,0)}}break}while(!0);vn(e)}function Jp(e,t,r,i,u,f,y,j,R,F,W,re,X,K){if(e.timeoutHandle=-1,re=t.subtreeFlags,re&8192||(re&16785408)===16785408){re={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Nn},Pp(t,f,re);var pe=(f&62914560)===f?hl-Rt():(f&4194048)===f?$p-Rt():0;if(pe=mj(re,pe),pe!==null){Yn=f,e.cancelPendingCommit=pe(ig.bind(null,e,t,f,r,i,u,y,j,R,W,re,null,X,K)),ur(e,f,y,!F);return}}ig(e,t,f,r,i,u,y,j,R)}function kS(e){for(var t=e;;){var r=t.tag;if((r===0||r===11||r===15)&&t.flags&16384&&(r=t.updateQueue,r!==null&&(r=r.stores,r!==null)))for(var i=0;i<r.length;i++){var u=r[i],f=u.getSnapshot;u=u.value;try{if(!_t(f(),u))return!1}catch{return!1}}if(r=t.child,t.subtreeFlags&16384&&r!==null)r.return=t,t=r;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function ur(e,t,r,i){t&=~hu,t&=~Yr,e.suspendedLanes|=t,e.pingedLanes&=~t,i&&(e.warmLanes|=t),i=e.expirationTimes;for(var u=t;0<u;){var f=31-zt(u),y=1<<f;i[f]=-1,u&=~y}r!==0&&lh(e,r,t)}function gl(){return(_e&6)===0?(_i(0),!1):!0}function vu(){if(De!==null){if(Be===0)var e=De.return;else e=De,Mn=Or=null,zc(e),va=null,yi=0,e=De;for(;e!==null;)Dp(e.alternate,e),e=e.return;De=null}}function Da(e,t){var r=e.timeoutHandle;r!==-1&&(e.timeoutHandle=-1,QS(r)),r=e.cancelPendingCommit,r!==null&&(e.cancelPendingCommit=null,r()),Yn=0,vu(),Pe=e,De=r=An(e.current,null),ke=t,Be=0,Ut=null,sr=!1,Ta=ei(e,t),fu=!1,Ca=Ht=hu=Yr=lr=Je=0,kt=Oi=null,mu=!1,(t&8)!==0&&(t|=t&32);var i=e.entangledLanes;if(i!==0)for(e=e.entanglements,i&=t;0<i;){var u=31-zt(i),f=1<<u;t|=e[u],i&=~f}return qn=t,Bs(),r}function Wp(e,t){Ee=null,Y.H=Ti,t===ya||t===Fs?(t=mm(),Be=3):t===jc?(t=mm(),Be=4):Be=t===Qc?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,Ut=t,De===null&&(Je=1,il(e,Kt(t,e.current)))}function Ip(){var e=Bt.current;return e===null?!0:(ke&4194048)===ke?Wt===null:(ke&62914560)===ke||(ke&536870912)!==0?e===Wt:!1}function eg(){var e=Y.H;return Y.H=Ti,e===null?Ti:e}function tg(){var e=Y.A;return Y.A=DS,e}function yl(){Je=4,sr||(ke&4194048)!==ke&&Bt.current!==null||(Ta=!0),(lr&134217727)===0&&(Yr&134217727)===0||Pe===null||ur(Pe,ke,Ht,!1)}function xu(e,t,r){var i=_e;_e|=2;var u=eg(),f=tg();(Pe!==e||ke!==t)&&(pl=null,Da(e,t)),t=!1;var y=Je;e:do try{if(Be!==0&&De!==null){var j=De,R=Ut;switch(Be){case 8:vu(),y=6;break e;case 3:case 2:case 9:case 6:Bt.current===null&&(t=!0);var F=Be;if(Be=0,Ut=null,Aa(e,j,R,F),r&&Ta){y=0;break e}break;default:F=Be,Be=0,Ut=null,Aa(e,j,R,F)}}MS(),y=Je;break}catch(W){Wp(e,W)}while(!0);return t&&e.shellSuspendCounter++,Mn=Or=null,_e=i,Y.H=u,Y.A=f,De===null&&(Pe=null,ke=0,Bs()),y}function MS(){for(;De!==null;)ng(De)}function RS(e,t){var r=_e;_e|=2;var i=eg(),u=tg();Pe!==e||ke!==t?(pl=null,ml=Rt()+500,Da(e,t)):Ta=ei(e,t);e:do try{if(Be!==0&&De!==null){t=De;var f=Ut;t:switch(Be){case 1:Be=0,Ut=null,Aa(e,t,f,1);break;case 2:case 9:if(fm(f)){Be=0,Ut=null,rg(t);break}t=function(){Be!==2&&Be!==9||Pe!==e||(Be=7),vn(e)},f.then(t,t);break e;case 3:Be=7;break e;case 4:Be=5;break e;case 7:fm(f)?(Be=0,Ut=null,rg(t)):(Be=0,Ut=null,Aa(e,t,f,7));break;case 5:var y=null;switch(De.tag){case 26:y=De.memoizedState;case 5:case 27:var j=De;if(y?Yg(y):j.stateNode.complete){Be=0,Ut=null;var R=j.sibling;if(R!==null)De=R;else{var F=j.return;F!==null?(De=F,vl(F)):De=null}break t}}Be=0,Ut=null,Aa(e,t,f,5);break;case 6:Be=0,Ut=null,Aa(e,t,f,6);break;case 8:vu(),Je=6;break e;default:throw Error(l(462))}}OS();break}catch(W){Wp(e,W)}while(!0);return Mn=Or=null,Y.H=i,Y.A=u,_e=r,De!==null?0:(Pe=null,ke=0,Bs(),Je)}function OS(){for(;De!==null&&!n1();)ng(De)}function ng(e){var t=Cp(e.alternate,e,qn);e.memoizedProps=e.pendingProps,t===null?vl(e):De=t}function rg(e){var t=e,r=t.alternate;switch(t.tag){case 15:case 0:t=bp(r,t,t.pendingProps,t.type,void 0,ke);break;case 11:t=bp(r,t,t.pendingProps,t.type.render,t.ref,ke);break;case 5:zc(t);default:Dp(r,t),t=De=tm(t,qn),t=Cp(r,t,qn)}e.memoizedProps=e.pendingProps,t===null?vl(e):De=t}function Aa(e,t,r,i){Mn=Or=null,zc(t),va=null,yi=0;var u=t.return;try{if(SS(e,u,t,r,ke)){Je=1,il(e,Kt(r,e.current)),De=null;return}}catch(f){if(u!==null)throw De=u,f;Je=1,il(e,Kt(r,e.current)),De=null;return}t.flags&32768?(Re||i===1?e=!0:Ta||(ke&536870912)!==0?e=!1:(sr=e=!0,(i===2||i===9||i===3||i===6)&&(i=Bt.current,i!==null&&i.tag===13&&(i.flags|=16384))),ag(t,e)):vl(t)}function vl(e){var t=e;do{if((t.flags&32768)!==0){ag(t,sr);return}e=t.return;var r=ES(t.alternate,t,qn);if(r!==null){De=r;return}if(t=t.sibling,t!==null){De=t;return}De=t=e}while(t!==null);Je===0&&(Je=5)}function ag(e,t){do{var r=TS(e.alternate,e);if(r!==null){r.flags&=32767,De=r;return}if(r=e.return,r!==null&&(r.flags|=32768,r.subtreeFlags=0,r.deletions=null),!t&&(e=e.sibling,e!==null)){De=e;return}De=e=r}while(e!==null);Je=6,De=null}function ig(e,t,r,i,u,f,y,j,R){e.cancelPendingCommit=null;do xl();while(lt!==0);if((_e&6)!==0)throw Error(l(327));if(t!==null){if(t===e.current)throw Error(l(177));if(f=t.lanes|t.childLanes,f|=lc,f1(e,r,f,y,j,R),e===Pe&&(De=Pe=null,ke=0),Na=t,cr=e,Yn=r,pu=f,gu=u,Kp=i,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,BS(Ss,function(){return ug(),null})):(e.callbackNode=null,e.callbackPriority=0),i=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||i){i=Y.T,Y.T=null,u=le.p,le.p=2,y=_e,_e|=4;try{CS(e,t,r)}finally{_e=y,le.p=u,Y.T=i}}lt=1,sg(),lg(),og()}}function sg(){if(lt===1){lt=0;var e=cr,t=Na,r=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||r){r=Y.T,Y.T=null;var i=le.p;le.p=2;var u=_e;_e|=4;try{Hp(t,e);var f=Mu,y=Xh(e.containerInfo),j=f.focusedElem,R=f.selectionRange;if(y!==j&&j&&j.ownerDocument&&Fh(j.ownerDocument.documentElement,j)){if(R!==null&&nc(j)){var F=R.start,W=R.end;if(W===void 0&&(W=F),"selectionStart"in j)j.selectionStart=F,j.selectionEnd=Math.min(W,j.value.length);else{var re=j.ownerDocument||document,X=re&&re.defaultView||window;if(X.getSelection){var K=X.getSelection(),pe=j.textContent.length,Se=Math.min(R.start,pe),qe=R.end===void 0?Se:Math.min(R.end,pe);!K.extend&&Se>qe&&(y=qe,qe=Se,Se=y);var q=Gh(j,Se),B=Gh(j,qe);if(q&&B&&(K.rangeCount!==1||K.anchorNode!==q.node||K.anchorOffset!==q.offset||K.focusNode!==B.node||K.focusOffset!==B.offset)){var P=re.createRange();P.setStart(q.node,q.offset),K.removeAllRanges(),Se>qe?(K.addRange(P),K.extend(B.node,B.offset)):(P.setEnd(B.node,B.offset),K.addRange(P))}}}}for(re=[],K=j;K=K.parentNode;)K.nodeType===1&&re.push({element:K,left:K.scrollLeft,top:K.scrollTop});for(typeof j.focus=="function"&&j.focus(),j=0;j<re.length;j++){var ee=re[j];ee.element.scrollLeft=ee.left,ee.element.scrollTop=ee.top}}Ml=!!ku,Mu=ku=null}finally{_e=u,le.p=i,Y.T=r}}e.current=t,lt=2}}function lg(){if(lt===2){lt=0;var e=cr,t=Na,r=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||r){r=Y.T,Y.T=null;var i=le.p;le.p=2;var u=_e;_e|=4;try{_p(e,t.alternate,t)}finally{_e=u,le.p=i,Y.T=r}}lt=3}}function og(){if(lt===4||lt===3){lt=0,r1();var e=cr,t=Na,r=Yn,i=Kp;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?lt=5:(lt=0,Na=cr=null,cg(e,e.pendingLanes));var u=e.pendingLanes;if(u===0&&(or=null),Bo(r),t=t.stateNode,Ot&&typeof Ot.onCommitFiberRoot=="function")try{Ot.onCommitFiberRoot(Ia,t,void 0,(t.current.flags&128)===128)}catch{}if(i!==null){t=Y.T,u=le.p,le.p=2,Y.T=null;try{for(var f=e.onRecoverableError,y=0;y<i.length;y++){var j=i[y];f(j.value,{componentStack:j.stack})}}finally{Y.T=t,le.p=u}}(Yn&3)!==0&&xl(),vn(e),u=e.pendingLanes,(r&261930)!==0&&(u&42)!==0?e===yu?zi++:(zi=0,yu=e):zi=0,_i(0)}}function cg(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,pi(t)))}function xl(){return sg(),lg(),og(),ug()}function ug(){if(lt!==5)return!1;var e=cr,t=pu;pu=0;var r=Bo(Yn),i=Y.T,u=le.p;try{le.p=32>r?32:r,Y.T=null,r=gu,gu=null;var f=cr,y=Yn;if(lt=0,Na=cr=null,Yn=0,(_e&6)!==0)throw Error(l(331));var j=_e;if(_e|=4,Fp(f.current),Yp(f,f.current,y,r),_e=j,_i(0,!1),Ot&&typeof Ot.onPostCommitFiberRoot=="function")try{Ot.onPostCommitFiberRoot(Ia,f)}catch{}return!0}finally{le.p=u,Y.T=i,cg(e,t)}}function dg(e,t,r){t=Kt(r,t),t=Zc(e.stateNode,t,2),e=nr(e,t,2),e!==null&&(ti(e,2),vn(e))}function Le(e,t,r){if(e.tag===3)dg(e,e,r);else for(;t!==null;){if(t.tag===3){dg(t,e,r);break}else if(t.tag===1){var i=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(or===null||!or.has(i))){e=Kt(r,e),r=fp(2),i=nr(t,r,2),i!==null&&(hp(r,i,t,e),ti(i,2),vn(i));break}}t=t.return}}function bu(e,t,r){var i=e.pingCache;if(i===null){i=e.pingCache=new AS;var u=new Set;i.set(t,u)}else u=i.get(t),u===void 0&&(u=new Set,i.set(t,u));u.has(r)||(fu=!0,u.add(r),e=zS.bind(null,e,t,r),t.then(e,e))}function zS(e,t,r){var i=e.pingCache;i!==null&&i.delete(t),e.pingedLanes|=e.suspendedLanes&r,e.warmLanes&=~r,Pe===e&&(ke&r)===r&&(Je===4||Je===3&&(ke&62914560)===ke&&300>Rt()-hl?(_e&2)===0&&Da(e,0):hu|=r,Ca===ke&&(Ca=0)),vn(e)}function fg(e,t){t===0&&(t=sh()),e=kr(e,t),e!==null&&(ti(e,t),vn(e))}function _S(e){var t=e.memoizedState,r=0;t!==null&&(r=t.retryLane),fg(e,r)}function VS(e,t){var r=0;switch(e.tag){case 31:case 13:var i=e.stateNode,u=e.memoizedState;u!==null&&(r=u.retryLane);break;case 19:i=e.stateNode;break;case 22:i=e.stateNode._retryCache;break;default:throw Error(l(314))}i!==null&&i.delete(t),fg(e,r)}function BS(e,t){return sn(e,t)}var bl=null,ka=null,Su=!1,Sl=!1,ju=!1,dr=0;function vn(e){e!==ka&&e.next===null&&(ka===null?bl=ka=e:ka=ka.next=e),Sl=!0,Su||(Su=!0,US())}function _i(e,t){if(!ju&&Sl){ju=!0;do for(var r=!1,i=bl;i!==null;){if(e!==0){var u=i.pendingLanes;if(u===0)var f=0;else{var y=i.suspendedLanes,j=i.pingedLanes;f=(1<<31-zt(42|e)+1)-1,f&=u&~(y&~j),f=f&201326741?f&201326741|1:f?f|2:0}f!==0&&(r=!0,gg(i,f))}else f=ke,f=Ts(i,i===Pe?f:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),(f&3)===0||ei(i,f)||(r=!0,gg(i,f));i=i.next}while(r);ju=!1}}function LS(){hg()}function hg(){Sl=Su=!1;var e=0;dr!==0&&ZS()&&(e=dr);for(var t=Rt(),r=null,i=bl;i!==null;){var u=i.next,f=mg(i,t);f===0?(i.next=null,r===null?bl=u:r.next=u,u===null&&(ka=r)):(r=i,(e!==0||(f&3)!==0)&&(Sl=!0)),i=u}lt!==0&&lt!==5||_i(e),dr!==0&&(dr=0)}function mg(e,t){for(var r=e.suspendedLanes,i=e.pingedLanes,u=e.expirationTimes,f=e.pendingLanes&-62914561;0<f;){var y=31-zt(f),j=1<<y,R=u[y];R===-1?((j&r)===0||(j&i)!==0)&&(u[y]=d1(j,t)):R<=t&&(e.expiredLanes|=j),f&=~j}if(t=Pe,r=ke,r=Ts(e,e===t?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i=e.callbackNode,r===0||e===t&&(Be===2||Be===9)||e.cancelPendingCommit!==null)return i!==null&&i!==null&&zo(i),e.callbackNode=null,e.callbackPriority=0;if((r&3)===0||ei(e,r)){if(t=r&-r,t===e.callbackPriority)return t;switch(i!==null&&zo(i),Bo(r)){case 2:case 8:r=ah;break;case 32:r=Ss;break;case 268435456:r=ih;break;default:r=Ss}return i=pg.bind(null,e),r=sn(r,i),e.callbackPriority=t,e.callbackNode=r,t}return i!==null&&i!==null&&zo(i),e.callbackPriority=2,e.callbackNode=null,2}function pg(e,t){if(lt!==0&&lt!==5)return e.callbackNode=null,e.callbackPriority=0,null;var r=e.callbackNode;if(xl()&&e.callbackNode!==r)return null;var i=ke;return i=Ts(e,e===Pe?i:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i===0?null:(Qp(e,i,t),mg(e,Rt()),e.callbackNode!=null&&e.callbackNode===r?pg.bind(null,e):null)}function gg(e,t){if(xl())return null;Qp(e,t,!0)}function US(){JS(function(){(_e&6)!==0?sn(rh,LS):hg()})}function wu(){if(dr===0){var e=pa;e===0&&(e=js,js<<=1,(js&261888)===0&&(js=256)),dr=e}return dr}function yg(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:As(""+e)}function vg(e,t){var r=t.ownerDocument.createElement("input");return r.name=t.name,r.value=t.value,e.id&&r.setAttribute("form",e.id),t.parentNode.insertBefore(r,t),e=new FormData(e),r.parentNode.removeChild(r),e}function HS(e,t,r,i,u){if(t==="submit"&&r&&r.stateNode===u){var f=yg((u[Tt]||null).action),y=i.submitter;y&&(t=(t=y[Tt]||null)?yg(t.formAction):y.getAttribute("formAction"),t!==null&&(f=t,y=null));var j=new Os("action","action",null,i,u);e.push({event:j,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(dr!==0){var R=y?vg(u,y):new FormData(u);Pc(r,{pending:!0,data:R,method:u.method,action:f},null,R)}}else typeof f=="function"&&(j.preventDefault(),R=y?vg(u,y):new FormData(u),Pc(r,{pending:!0,data:R,method:u.method,action:f},f,R))},currentTarget:u}]})}}for(var Eu=0;Eu<sc.length;Eu++){var Tu=sc[Eu],qS=Tu.toLowerCase(),YS=Tu[0].toUpperCase()+Tu.slice(1);ln(qS,"on"+YS)}ln(Zh,"onAnimationEnd"),ln(Qh,"onAnimationIteration"),ln(Jh,"onAnimationStart"),ln("dblclick","onDoubleClick"),ln("focusin","onFocus"),ln("focusout","onBlur"),ln(aS,"onTransitionRun"),ln(iS,"onTransitionStart"),ln(sS,"onTransitionCancel"),ln(Wh,"onTransitionEnd"),ta("onMouseEnter",["mouseout","mouseover"]),ta("onMouseLeave",["mouseout","mouseover"]),ta("onPointerEnter",["pointerout","pointerover"]),ta("onPointerLeave",["pointerout","pointerover"]),Cr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Cr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Cr("onBeforeInput",["compositionend","keypress","textInput","paste"]),Cr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Cr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Cr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Vi="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),PS=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Vi));function xg(e,t){t=(t&4)!==0;for(var r=0;r<e.length;r++){var i=e[r],u=i.event;i=i.listeners;e:{var f=void 0;if(t)for(var y=i.length-1;0<=y;y--){var j=i[y],R=j.instance,F=j.currentTarget;if(j=j.listener,R!==f&&u.isPropagationStopped())break e;f=j,u.currentTarget=F;try{f(u)}catch(W){Vs(W)}u.currentTarget=null,f=R}else for(y=0;y<i.length;y++){if(j=i[y],R=j.instance,F=j.currentTarget,j=j.listener,R!==f&&u.isPropagationStopped())break e;f=j,u.currentTarget=F;try{f(u)}catch(W){Vs(W)}u.currentTarget=null,f=R}}}}function Ae(e,t){var r=t[Lo];r===void 0&&(r=t[Lo]=new Set);var i=e+"__bubble";r.has(i)||(bg(t,e,2,!1),r.add(i))}function Cu(e,t,r){var i=0;t&&(i|=4),bg(r,e,i,t)}var jl="_reactListening"+Math.random().toString(36).slice(2);function Nu(e){if(!e[jl]){e[jl]=!0,hh.forEach(function(r){r!=="selectionchange"&&(PS.has(r)||Cu(r,!1,e),Cu(r,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[jl]||(t[jl]=!0,Cu("selectionchange",!1,t))}}function bg(e,t,r,i){switch(Zg(t)){case 2:var u=yj;break;case 8:u=vj;break;default:u=Yu}r=u.bind(null,t,r,e),u=void 0,!$o||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(u=!0),i?u!==void 0?e.addEventListener(t,r,{capture:!0,passive:u}):e.addEventListener(t,r,!0):u!==void 0?e.addEventListener(t,r,{passive:u}):e.addEventListener(t,r,!1)}function Du(e,t,r,i,u){var f=i;if((t&1)===0&&(t&2)===0&&i!==null)e:for(;;){if(i===null)return;var y=i.tag;if(y===3||y===4){var j=i.stateNode.containerInfo;if(j===u)break;if(y===4)for(y=i.return;y!==null;){var R=y.tag;if((R===3||R===4)&&y.stateNode.containerInfo===u)return;y=y.return}for(;j!==null;){if(y=Wr(j),y===null)return;if(R=y.tag,R===5||R===6||R===26||R===27){i=f=y;continue e}j=j.parentNode}}i=i.return}Th(function(){var F=f,W=Fo(r),re=[];e:{var X=Ih.get(e);if(X!==void 0){var K=Os,pe=e;switch(e){case"keypress":if(Ms(r)===0)break e;case"keydown":case"keyup":K=V1;break;case"focusin":pe="focus",K=Jo;break;case"focusout":pe="blur",K=Jo;break;case"beforeblur":case"afterblur":K=Jo;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":K=Dh;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":K=E1;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":K=U1;break;case Zh:case Qh:case Jh:K=N1;break;case Wh:K=q1;break;case"scroll":case"scrollend":K=j1;break;case"wheel":K=P1;break;case"copy":case"cut":case"paste":K=A1;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":K=kh;break;case"toggle":case"beforetoggle":K=F1}var Se=(t&4)!==0,qe=!Se&&(e==="scroll"||e==="scrollend"),q=Se?X!==null?X+"Capture":null:X;Se=[];for(var B=F,P;B!==null;){var ee=B;if(P=ee.stateNode,ee=ee.tag,ee!==5&&ee!==26&&ee!==27||P===null||q===null||(ee=ai(B,q),ee!=null&&Se.push(Bi(B,ee,P))),qe)break;B=B.return}0<Se.length&&(X=new K(X,pe,null,r,W),re.push({event:X,listeners:Se}))}}if((t&7)===0){e:{if(X=e==="mouseover"||e==="pointerover",K=e==="mouseout"||e==="pointerout",X&&r!==Go&&(pe=r.relatedTarget||r.fromElement)&&(Wr(pe)||pe[Jr]))break e;if((K||X)&&(X=W.window===W?W:(X=W.ownerDocument)?X.defaultView||X.parentWindow:window,K?(pe=r.relatedTarget||r.toElement,K=F,pe=pe?Wr(pe):null,pe!==null&&(qe=h(pe),Se=pe.tag,pe!==qe||Se!==5&&Se!==27&&Se!==6)&&(pe=null)):(K=null,pe=F),K!==pe)){if(Se=Dh,ee="onMouseLeave",q="onMouseEnter",B="mouse",(e==="pointerout"||e==="pointerover")&&(Se=kh,ee="onPointerLeave",q="onPointerEnter",B="pointer"),qe=K==null?X:ri(K),P=pe==null?X:ri(pe),X=new Se(ee,B+"leave",K,r,W),X.target=qe,X.relatedTarget=P,ee=null,Wr(W)===F&&(Se=new Se(q,B+"enter",pe,r,W),Se.target=P,Se.relatedTarget=qe,ee=Se),qe=ee,K&&pe)t:{for(Se=GS,q=K,B=pe,P=0,ee=q;ee;ee=Se(ee))P++;ee=0;for(var xe=B;xe;xe=Se(xe))ee++;for(;0<P-ee;)q=Se(q),P--;for(;0<ee-P;)B=Se(B),ee--;for(;P--;){if(q===B||B!==null&&q===B.alternate){Se=q;break t}q=Se(q),B=Se(B)}Se=null}else Se=null;K!==null&&Sg(re,X,K,Se,!1),pe!==null&&qe!==null&&Sg(re,qe,pe,Se,!0)}}e:{if(X=F?ri(F):window,K=X.nodeName&&X.nodeName.toLowerCase(),K==="select"||K==="input"&&X.type==="file")var Oe=Lh;else if(Vh(X))if(Uh)Oe=tS;else{Oe=I1;var ve=W1}else K=X.nodeName,!K||K.toLowerCase()!=="input"||X.type!=="checkbox"&&X.type!=="radio"?F&&Po(F.elementType)&&(Oe=Lh):Oe=eS;if(Oe&&(Oe=Oe(e,F))){Bh(re,Oe,r,W);break e}ve&&ve(e,X,F),e==="focusout"&&F&&X.type==="number"&&F.memoizedProps.value!=null&&Yo(X,"number",X.value)}switch(ve=F?ri(F):window,e){case"focusin":(Vh(ve)||ve.contentEditable==="true")&&(la=ve,rc=F,fi=null);break;case"focusout":fi=rc=la=null;break;case"mousedown":ac=!0;break;case"contextmenu":case"mouseup":case"dragend":ac=!1,$h(re,r,W);break;case"selectionchange":if(rS)break;case"keydown":case"keyup":$h(re,r,W)}var Te;if(Io)e:{switch(e){case"compositionstart":var Me="onCompositionStart";break e;case"compositionend":Me="onCompositionEnd";break e;case"compositionupdate":Me="onCompositionUpdate";break e}Me=void 0}else sa?zh(e,r)&&(Me="onCompositionEnd"):e==="keydown"&&r.keyCode===229&&(Me="onCompositionStart");Me&&(Mh&&r.locale!=="ko"&&(sa||Me!=="onCompositionStart"?Me==="onCompositionEnd"&&sa&&(Te=Ch()):(Zn=W,Ko="value"in Zn?Zn.value:Zn.textContent,sa=!0)),ve=wl(F,Me),0<ve.length&&(Me=new Ah(Me,e,null,r,W),re.push({event:Me,listeners:ve}),Te?Me.data=Te:(Te=_h(r),Te!==null&&(Me.data=Te)))),(Te=$1?K1(e,r):Z1(e,r))&&(Me=wl(F,"onBeforeInput"),0<Me.length&&(ve=new Ah("onBeforeInput","beforeinput",null,r,W),re.push({event:ve,listeners:Me}),ve.data=Te)),HS(re,e,F,r,W)}xg(re,t)})}function Bi(e,t,r){return{instance:e,listener:t,currentTarget:r}}function wl(e,t){for(var r=t+"Capture",i=[];e!==null;){var u=e,f=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||f===null||(u=ai(e,r),u!=null&&i.unshift(Bi(e,u,f)),u=ai(e,t),u!=null&&i.push(Bi(e,u,f))),e.tag===3)return i;e=e.return}return[]}function GS(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Sg(e,t,r,i,u){for(var f=t._reactName,y=[];r!==null&&r!==i;){var j=r,R=j.alternate,F=j.stateNode;if(j=j.tag,R!==null&&R===i)break;j!==5&&j!==26&&j!==27||F===null||(R=F,u?(F=ai(r,f),F!=null&&y.unshift(Bi(r,F,R))):u||(F=ai(r,f),F!=null&&y.push(Bi(r,F,R)))),r=r.return}y.length!==0&&e.push({event:t,listeners:y})}var FS=/\r\n?/g,XS=/\u0000|\uFFFD/g;function jg(e){return(typeof e=="string"?e:""+e).replace(FS,`
`).replace(XS,"")}function wg(e,t){return t=jg(t),jg(e)===t}function He(e,t,r,i,u,f){switch(r){case"children":typeof i=="string"?t==="body"||t==="textarea"&&i===""||ra(e,i):(typeof i=="number"||typeof i=="bigint")&&t!=="body"&&ra(e,""+i);break;case"className":Ns(e,"class",i);break;case"tabIndex":Ns(e,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":Ns(e,r,i);break;case"style":wh(e,i,f);break;case"data":if(t!=="object"){Ns(e,"data",i);break}case"src":case"href":if(i===""&&(t!=="a"||r!=="href")){e.removeAttribute(r);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(r);break}i=As(""+i),e.setAttribute(r,i);break;case"action":case"formAction":if(typeof i=="function"){e.setAttribute(r,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof f=="function"&&(r==="formAction"?(t!=="input"&&He(e,t,"name",u.name,u,null),He(e,t,"formEncType",u.formEncType,u,null),He(e,t,"formMethod",u.formMethod,u,null),He(e,t,"formTarget",u.formTarget,u,null)):(He(e,t,"encType",u.encType,u,null),He(e,t,"method",u.method,u,null),He(e,t,"target",u.target,u,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(r);break}i=As(""+i),e.setAttribute(r,i);break;case"onClick":i!=null&&(e.onclick=Nn);break;case"onScroll":i!=null&&Ae("scroll",e);break;case"onScrollEnd":i!=null&&Ae("scrollend",e);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(l(61));if(r=i.__html,r!=null){if(u.children!=null)throw Error(l(60));e.innerHTML=r}}break;case"multiple":e.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":e.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){e.removeAttribute("xlink:href");break}r=As(""+i),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",r);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(r,""+i):e.removeAttribute(r);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(r,""):e.removeAttribute(r);break;case"capture":case"download":i===!0?e.setAttribute(r,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(r,i):e.removeAttribute(r);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?e.setAttribute(r,i):e.removeAttribute(r);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?e.removeAttribute(r):e.setAttribute(r,i);break;case"popover":Ae("beforetoggle",e),Ae("toggle",e),Cs(e,"popover",i);break;case"xlinkActuate":Cn(e,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":Cn(e,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":Cn(e,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":Cn(e,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":Cn(e,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":Cn(e,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":Cn(e,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":Cn(e,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":Cn(e,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":Cs(e,"is",i);break;case"innerText":case"textContent":break;default:(!(2<r.length)||r[0]!=="o"&&r[0]!=="O"||r[1]!=="n"&&r[1]!=="N")&&(r=b1.get(r)||r,Cs(e,r,i))}}function Au(e,t,r,i,u,f){switch(r){case"style":wh(e,i,f);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(l(61));if(r=i.__html,r!=null){if(u.children!=null)throw Error(l(60));e.innerHTML=r}}break;case"children":typeof i=="string"?ra(e,i):(typeof i=="number"||typeof i=="bigint")&&ra(e,""+i);break;case"onScroll":i!=null&&Ae("scroll",e);break;case"onScrollEnd":i!=null&&Ae("scrollend",e);break;case"onClick":i!=null&&(e.onclick=Nn);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!mh.hasOwnProperty(r))e:{if(r[0]==="o"&&r[1]==="n"&&(u=r.endsWith("Capture"),t=r.slice(2,u?r.length-7:void 0),f=e[Tt]||null,f=f!=null?f[r]:null,typeof f=="function"&&e.removeEventListener(t,f,u),typeof i=="function")){typeof f!="function"&&f!==null&&(r in e?e[r]=null:e.hasAttribute(r)&&e.removeAttribute(r)),e.addEventListener(t,i,u);break e}r in e?e[r]=i:i===!0?e.setAttribute(r,""):Cs(e,r,i)}}}function yt(e,t,r){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Ae("error",e),Ae("load",e);var i=!1,u=!1,f;for(f in r)if(r.hasOwnProperty(f)){var y=r[f];if(y!=null)switch(f){case"src":i=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(l(137,t));default:He(e,t,f,y,r,null)}}u&&He(e,t,"srcSet",r.srcSet,r,null),i&&He(e,t,"src",r.src,r,null);return;case"input":Ae("invalid",e);var j=f=y=u=null,R=null,F=null;for(i in r)if(r.hasOwnProperty(i)){var W=r[i];if(W!=null)switch(i){case"name":u=W;break;case"type":y=W;break;case"checked":R=W;break;case"defaultChecked":F=W;break;case"value":f=W;break;case"defaultValue":j=W;break;case"children":case"dangerouslySetInnerHTML":if(W!=null)throw Error(l(137,t));break;default:He(e,t,i,W,r,null)}}xh(e,f,j,R,F,y,u,!1);return;case"select":Ae("invalid",e),i=y=f=null;for(u in r)if(r.hasOwnProperty(u)&&(j=r[u],j!=null))switch(u){case"value":f=j;break;case"defaultValue":y=j;break;case"multiple":i=j;default:He(e,t,u,j,r,null)}t=f,r=y,e.multiple=!!i,t!=null?na(e,!!i,t,!1):r!=null&&na(e,!!i,r,!0);return;case"textarea":Ae("invalid",e),f=u=i=null;for(y in r)if(r.hasOwnProperty(y)&&(j=r[y],j!=null))switch(y){case"value":i=j;break;case"defaultValue":u=j;break;case"children":f=j;break;case"dangerouslySetInnerHTML":if(j!=null)throw Error(l(91));break;default:He(e,t,y,j,r,null)}Sh(e,i,u,f);return;case"option":for(R in r)if(r.hasOwnProperty(R)&&(i=r[R],i!=null))switch(R){case"selected":e.selected=i&&typeof i!="function"&&typeof i!="symbol";break;default:He(e,t,R,i,r,null)}return;case"dialog":Ae("beforetoggle",e),Ae("toggle",e),Ae("cancel",e),Ae("close",e);break;case"iframe":case"object":Ae("load",e);break;case"video":case"audio":for(i=0;i<Vi.length;i++)Ae(Vi[i],e);break;case"image":Ae("error",e),Ae("load",e);break;case"details":Ae("toggle",e);break;case"embed":case"source":case"link":Ae("error",e),Ae("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(F in r)if(r.hasOwnProperty(F)&&(i=r[F],i!=null))switch(F){case"children":case"dangerouslySetInnerHTML":throw Error(l(137,t));default:He(e,t,F,i,r,null)}return;default:if(Po(t)){for(W in r)r.hasOwnProperty(W)&&(i=r[W],i!==void 0&&Au(e,t,W,i,r,void 0));return}}for(j in r)r.hasOwnProperty(j)&&(i=r[j],i!=null&&He(e,t,j,i,r,null))}function $S(e,t,r,i){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,f=null,y=null,j=null,R=null,F=null,W=null;for(K in r){var re=r[K];if(r.hasOwnProperty(K)&&re!=null)switch(K){case"checked":break;case"value":break;case"defaultValue":R=re;default:i.hasOwnProperty(K)||He(e,t,K,null,i,re)}}for(var X in i){var K=i[X];if(re=r[X],i.hasOwnProperty(X)&&(K!=null||re!=null))switch(X){case"type":f=K;break;case"name":u=K;break;case"checked":F=K;break;case"defaultChecked":W=K;break;case"value":y=K;break;case"defaultValue":j=K;break;case"children":case"dangerouslySetInnerHTML":if(K!=null)throw Error(l(137,t));break;default:K!==re&&He(e,t,X,K,i,re)}}qo(e,y,j,R,F,W,f,u);return;case"select":K=y=j=X=null;for(f in r)if(R=r[f],r.hasOwnProperty(f)&&R!=null)switch(f){case"value":break;case"multiple":K=R;default:i.hasOwnProperty(f)||He(e,t,f,null,i,R)}for(u in i)if(f=i[u],R=r[u],i.hasOwnProperty(u)&&(f!=null||R!=null))switch(u){case"value":X=f;break;case"defaultValue":j=f;break;case"multiple":y=f;default:f!==R&&He(e,t,u,f,i,R)}t=j,r=y,i=K,X!=null?na(e,!!r,X,!1):!!i!=!!r&&(t!=null?na(e,!!r,t,!0):na(e,!!r,r?[]:"",!1));return;case"textarea":K=X=null;for(j in r)if(u=r[j],r.hasOwnProperty(j)&&u!=null&&!i.hasOwnProperty(j))switch(j){case"value":break;case"children":break;default:He(e,t,j,null,i,u)}for(y in i)if(u=i[y],f=r[y],i.hasOwnProperty(y)&&(u!=null||f!=null))switch(y){case"value":X=u;break;case"defaultValue":K=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(l(91));break;default:u!==f&&He(e,t,y,u,i,f)}bh(e,X,K);return;case"option":for(var pe in r)if(X=r[pe],r.hasOwnProperty(pe)&&X!=null&&!i.hasOwnProperty(pe))switch(pe){case"selected":e.selected=!1;break;default:He(e,t,pe,null,i,X)}for(R in i)if(X=i[R],K=r[R],i.hasOwnProperty(R)&&X!==K&&(X!=null||K!=null))switch(R){case"selected":e.selected=X&&typeof X!="function"&&typeof X!="symbol";break;default:He(e,t,R,X,i,K)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var Se in r)X=r[Se],r.hasOwnProperty(Se)&&X!=null&&!i.hasOwnProperty(Se)&&He(e,t,Se,null,i,X);for(F in i)if(X=i[F],K=r[F],i.hasOwnProperty(F)&&X!==K&&(X!=null||K!=null))switch(F){case"children":case"dangerouslySetInnerHTML":if(X!=null)throw Error(l(137,t));break;default:He(e,t,F,X,i,K)}return;default:if(Po(t)){for(var qe in r)X=r[qe],r.hasOwnProperty(qe)&&X!==void 0&&!i.hasOwnProperty(qe)&&Au(e,t,qe,void 0,i,X);for(W in i)X=i[W],K=r[W],!i.hasOwnProperty(W)||X===K||X===void 0&&K===void 0||Au(e,t,W,X,i,K);return}}for(var q in r)X=r[q],r.hasOwnProperty(q)&&X!=null&&!i.hasOwnProperty(q)&&He(e,t,q,null,i,X);for(re in i)X=i[re],K=r[re],!i.hasOwnProperty(re)||X===K||X==null&&K==null||He(e,t,re,X,i,K)}function Eg(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function KS(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,r=performance.getEntriesByType("resource"),i=0;i<r.length;i++){var u=r[i],f=u.transferSize,y=u.initiatorType,j=u.duration;if(f&&j&&Eg(y)){for(y=0,j=u.responseEnd,i+=1;i<r.length;i++){var R=r[i],F=R.startTime;if(F>j)break;var W=R.transferSize,re=R.initiatorType;W&&Eg(re)&&(R=R.responseEnd,y+=W*(R<j?1:(j-F)/(R-F)))}if(--i,t+=8*(f+y)/(u.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var ku=null,Mu=null;function El(e){return e.nodeType===9?e:e.ownerDocument}function Tg(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Cg(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function Ru(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Ou=null;function ZS(){var e=window.event;return e&&e.type==="popstate"?e===Ou?!1:(Ou=e,!0):(Ou=null,!1)}var Ng=typeof setTimeout=="function"?setTimeout:void 0,QS=typeof clearTimeout=="function"?clearTimeout:void 0,Dg=typeof Promise=="function"?Promise:void 0,JS=typeof queueMicrotask=="function"?queueMicrotask:typeof Dg<"u"?function(e){return Dg.resolve(null).then(e).catch(WS)}:Ng;function WS(e){setTimeout(function(){throw e})}function fr(e){return e==="head"}function Ag(e,t){var r=t,i=0;do{var u=r.nextSibling;if(e.removeChild(r),u&&u.nodeType===8)if(r=u.data,r==="/$"||r==="/&"){if(i===0){e.removeChild(u),za(t);return}i--}else if(r==="$"||r==="$?"||r==="$~"||r==="$!"||r==="&")i++;else if(r==="html")Li(e.ownerDocument.documentElement);else if(r==="head"){r=e.ownerDocument.head,Li(r);for(var f=r.firstChild;f;){var y=f.nextSibling,j=f.nodeName;f[ni]||j==="SCRIPT"||j==="STYLE"||j==="LINK"&&f.rel.toLowerCase()==="stylesheet"||r.removeChild(f),f=y}}else r==="body"&&Li(e.ownerDocument.body);r=u}while(r);za(t)}function kg(e,t){var r=e;e=0;do{var i=r.nextSibling;if(r.nodeType===1?t?(r._stashedDisplay=r.style.display,r.style.display="none"):(r.style.display=r._stashedDisplay||"",r.getAttribute("style")===""&&r.removeAttribute("style")):r.nodeType===3&&(t?(r._stashedText=r.nodeValue,r.nodeValue=""):r.nodeValue=r._stashedText||""),i&&i.nodeType===8)if(r=i.data,r==="/$"){if(e===0)break;e--}else r!=="$"&&r!=="$?"&&r!=="$~"&&r!=="$!"||e++;r=i}while(r)}function zu(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var r=t;switch(t=t.nextSibling,r.nodeName){case"HTML":case"HEAD":case"BODY":zu(r),Uo(r);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(r.rel.toLowerCase()==="stylesheet")continue}e.removeChild(r)}}function IS(e,t,r,i){for(;e.nodeType===1;){var u=r;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!i&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(i){if(!e[ni])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(f=e.getAttribute("rel"),f==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(f!==u.rel||e.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||e.getAttribute("title")!==(u.title==null?null:u.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(f=e.getAttribute("src"),(f!==(u.src==null?null:u.src)||e.getAttribute("type")!==(u.type==null?null:u.type)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&f&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var f=u.name==null?null:""+u.name;if(u.type==="hidden"&&e.getAttribute("name")===f)return e}else return e;if(e=It(e.nextSibling),e===null)break}return null}function ej(e,t,r){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!r||(e=It(e.nextSibling),e===null))return null;return e}function Mg(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=It(e.nextSibling),e===null))return null;return e}function _u(e){return e.data==="$?"||e.data==="$~"}function Vu(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function tj(e,t){var r=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||r.readyState!=="loading")t();else{var i=function(){t(),r.removeEventListener("DOMContentLoaded",i)};r.addEventListener("DOMContentLoaded",i),e._reactRetry=i}}function It(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var Bu=null;function Rg(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="/$"||r==="/&"){if(t===0)return It(e.nextSibling);t--}else r!=="$"&&r!=="$!"&&r!=="$?"&&r!=="$~"&&r!=="&"||t++}e=e.nextSibling}return null}function Og(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="$"||r==="$!"||r==="$?"||r==="$~"||r==="&"){if(t===0)return e;t--}else r!=="/$"&&r!=="/&"||t++}e=e.previousSibling}return null}function zg(e,t,r){switch(t=El(r),e){case"html":if(e=t.documentElement,!e)throw Error(l(452));return e;case"head":if(e=t.head,!e)throw Error(l(453));return e;case"body":if(e=t.body,!e)throw Error(l(454));return e;default:throw Error(l(451))}}function Li(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Uo(e)}var en=new Map,_g=new Set;function Tl(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Pn=le.d;le.d={f:nj,r:rj,D:aj,C:ij,L:sj,m:lj,X:cj,S:oj,M:uj};function nj(){var e=Pn.f(),t=gl();return e||t}function rj(e){var t=Ir(e);t!==null&&t.tag===5&&t.type==="form"?Wm(t):Pn.r(e)}var Ma=typeof document>"u"?null:document;function Vg(e,t,r){var i=Ma;if(i&&typeof t=="string"&&t){var u=Xt(t);u='link[rel="'+e+'"][href="'+u+'"]',typeof r=="string"&&(u+='[crossorigin="'+r+'"]'),_g.has(u)||(_g.add(u),e={rel:e,crossOrigin:r,href:t},i.querySelector(u)===null&&(t=i.createElement("link"),yt(t,"link",e),ut(t),i.head.appendChild(t)))}}function aj(e){Pn.D(e),Vg("dns-prefetch",e,null)}function ij(e,t){Pn.C(e,t),Vg("preconnect",e,t)}function sj(e,t,r){Pn.L(e,t,r);var i=Ma;if(i&&e&&t){var u='link[rel="preload"][as="'+Xt(t)+'"]';t==="image"&&r&&r.imageSrcSet?(u+='[imagesrcset="'+Xt(r.imageSrcSet)+'"]',typeof r.imageSizes=="string"&&(u+='[imagesizes="'+Xt(r.imageSizes)+'"]')):u+='[href="'+Xt(e)+'"]';var f=u;switch(t){case"style":f=Ra(e);break;case"script":f=Oa(e)}en.has(f)||(e=x({rel:"preload",href:t==="image"&&r&&r.imageSrcSet?void 0:e,as:t},r),en.set(f,e),i.querySelector(u)!==null||t==="style"&&i.querySelector(Ui(f))||t==="script"&&i.querySelector(Hi(f))||(t=i.createElement("link"),yt(t,"link",e),ut(t),i.head.appendChild(t)))}}function lj(e,t){Pn.m(e,t);var r=Ma;if(r&&e){var i=t&&typeof t.as=="string"?t.as:"script",u='link[rel="modulepreload"][as="'+Xt(i)+'"][href="'+Xt(e)+'"]',f=u;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":f=Oa(e)}if(!en.has(f)&&(e=x({rel:"modulepreload",href:e},t),en.set(f,e),r.querySelector(u)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(r.querySelector(Hi(f)))return}i=r.createElement("link"),yt(i,"link",e),ut(i),r.head.appendChild(i)}}}function oj(e,t,r){Pn.S(e,t,r);var i=Ma;if(i&&e){var u=ea(i).hoistableStyles,f=Ra(e);t=t||"default";var y=u.get(f);if(!y){var j={loading:0,preload:null};if(y=i.querySelector(Ui(f)))j.loading=5;else{e=x({rel:"stylesheet",href:e,"data-precedence":t},r),(r=en.get(f))&&Lu(e,r);var R=y=i.createElement("link");ut(R),yt(R,"link",e),R._p=new Promise(function(F,W){R.onload=F,R.onerror=W}),R.addEventListener("load",function(){j.loading|=1}),R.addEventListener("error",function(){j.loading|=2}),j.loading|=4,Cl(y,t,i)}y={type:"stylesheet",instance:y,count:1,state:j},u.set(f,y)}}}function cj(e,t){Pn.X(e,t);var r=Ma;if(r&&e){var i=ea(r).hoistableScripts,u=Oa(e),f=i.get(u);f||(f=r.querySelector(Hi(u)),f||(e=x({src:e,async:!0},t),(t=en.get(u))&&Uu(e,t),f=r.createElement("script"),ut(f),yt(f,"link",e),r.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},i.set(u,f))}}function uj(e,t){Pn.M(e,t);var r=Ma;if(r&&e){var i=ea(r).hoistableScripts,u=Oa(e),f=i.get(u);f||(f=r.querySelector(Hi(u)),f||(e=x({src:e,async:!0,type:"module"},t),(t=en.get(u))&&Uu(e,t),f=r.createElement("script"),ut(f),yt(f,"link",e),r.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},i.set(u,f))}}function Bg(e,t,r,i){var u=(u=me.current)?Tl(u):null;if(!u)throw Error(l(446));switch(e){case"meta":case"title":return null;case"style":return typeof r.precedence=="string"&&typeof r.href=="string"?(t=Ra(r.href),r=ea(u).hoistableStyles,i=r.get(t),i||(i={type:"style",instance:null,count:0,state:null},r.set(t,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(r.rel==="stylesheet"&&typeof r.href=="string"&&typeof r.precedence=="string"){e=Ra(r.href);var f=ea(u).hoistableStyles,y=f.get(e);if(y||(u=u.ownerDocument||u,y={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},f.set(e,y),(f=u.querySelector(Ui(e)))&&!f._p&&(y.instance=f,y.state.loading=5),en.has(e)||(r={rel:"preload",as:"style",href:r.href,crossOrigin:r.crossOrigin,integrity:r.integrity,media:r.media,hrefLang:r.hrefLang,referrerPolicy:r.referrerPolicy},en.set(e,r),f||dj(u,e,r,y.state))),t&&i===null)throw Error(l(528,""));return y}if(t&&i!==null)throw Error(l(529,""));return null;case"script":return t=r.async,r=r.src,typeof r=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Oa(r),r=ea(u).hoistableScripts,i=r.get(t),i||(i={type:"script",instance:null,count:0,state:null},r.set(t,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(l(444,e))}}function Ra(e){return'href="'+Xt(e)+'"'}function Ui(e){return'link[rel="stylesheet"]['+e+"]"}function Lg(e){return x({},e,{"data-precedence":e.precedence,precedence:null})}function dj(e,t,r,i){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?i.loading=1:(t=e.createElement("link"),i.preload=t,t.addEventListener("load",function(){return i.loading|=1}),t.addEventListener("error",function(){return i.loading|=2}),yt(t,"link",r),ut(t),e.head.appendChild(t))}function Oa(e){return'[src="'+Xt(e)+'"]'}function Hi(e){return"script[async]"+e}function Ug(e,t,r){if(t.count++,t.instance===null)switch(t.type){case"style":var i=e.querySelector('style[data-href~="'+Xt(r.href)+'"]');if(i)return t.instance=i,ut(i),i;var u=x({},r,{"data-href":r.href,"data-precedence":r.precedence,href:null,precedence:null});return i=(e.ownerDocument||e).createElement("style"),ut(i),yt(i,"style",u),Cl(i,r.precedence,e),t.instance=i;case"stylesheet":u=Ra(r.href);var f=e.querySelector(Ui(u));if(f)return t.state.loading|=4,t.instance=f,ut(f),f;i=Lg(r),(u=en.get(u))&&Lu(i,u),f=(e.ownerDocument||e).createElement("link"),ut(f);var y=f;return y._p=new Promise(function(j,R){y.onload=j,y.onerror=R}),yt(f,"link",i),t.state.loading|=4,Cl(f,r.precedence,e),t.instance=f;case"script":return f=Oa(r.src),(u=e.querySelector(Hi(f)))?(t.instance=u,ut(u),u):(i=r,(u=en.get(f))&&(i=x({},r),Uu(i,u)),e=e.ownerDocument||e,u=e.createElement("script"),ut(u),yt(u,"link",i),e.head.appendChild(u),t.instance=u);case"void":return null;default:throw Error(l(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(i=t.instance,t.state.loading|=4,Cl(i,r.precedence,e));return t.instance}function Cl(e,t,r){for(var i=r.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=i.length?i[i.length-1]:null,f=u,y=0;y<i.length;y++){var j=i[y];if(j.dataset.precedence===t)f=j;else if(f!==u)break}f?f.parentNode.insertBefore(e,f.nextSibling):(t=r.nodeType===9?r.head:r,t.insertBefore(e,t.firstChild))}function Lu(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function Uu(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var Nl=null;function Hg(e,t,r){if(Nl===null){var i=new Map,u=Nl=new Map;u.set(r,i)}else u=Nl,i=u.get(r),i||(i=new Map,u.set(r,i));if(i.has(e))return i;for(i.set(e,null),r=r.getElementsByTagName(e),u=0;u<r.length;u++){var f=r[u];if(!(f[ni]||f[ht]||e==="link"&&f.getAttribute("rel")==="stylesheet")&&f.namespaceURI!=="http://www.w3.org/2000/svg"){var y=f.getAttribute(t)||"";y=e+y;var j=i.get(y);j?j.push(f):i.set(y,[f])}}return i}function qg(e,t,r){e=e.ownerDocument||e,e.head.insertBefore(r,t==="title"?e.querySelector("head > title"):null)}function fj(e,t,r){if(r===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function Yg(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function hj(e,t,r,i){if(r.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&(r.state.loading&4)===0){if(r.instance===null){var u=Ra(i.href),f=t.querySelector(Ui(u));if(f){t=f._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=Dl.bind(e),t.then(e,e)),r.state.loading|=4,r.instance=f,ut(f);return}f=t.ownerDocument||t,i=Lg(i),(u=en.get(u))&&Lu(i,u),f=f.createElement("link"),ut(f);var y=f;y._p=new Promise(function(j,R){y.onload=j,y.onerror=R}),yt(f,"link",i),r.instance=f}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(r,t),(t=r.state.preload)&&(r.state.loading&3)===0&&(e.count++,r=Dl.bind(e),t.addEventListener("load",r),t.addEventListener("error",r))}}var Hu=0;function mj(e,t){return e.stylesheets&&e.count===0&&kl(e,e.stylesheets),0<e.count||0<e.imgCount?function(r){var i=setTimeout(function(){if(e.stylesheets&&kl(e,e.stylesheets),e.unsuspend){var f=e.unsuspend;e.unsuspend=null,f()}},6e4+t);0<e.imgBytes&&Hu===0&&(Hu=62500*KS());var u=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&kl(e,e.stylesheets),e.unsuspend)){var f=e.unsuspend;e.unsuspend=null,f()}},(e.imgBytes>Hu?50:800)+t);return e.unsuspend=r,function(){e.unsuspend=null,clearTimeout(i),clearTimeout(u)}}:null}function Dl(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)kl(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Al=null;function kl(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Al=new Map,t.forEach(pj,e),Al=null,Dl.call(e))}function pj(e,t){if(!(t.state.loading&4)){var r=Al.get(e);if(r)var i=r.get(null);else{r=new Map,Al.set(e,r);for(var u=e.querySelectorAll("link[data-precedence],style[data-precedence]"),f=0;f<u.length;f++){var y=u[f];(y.nodeName==="LINK"||y.getAttribute("media")!=="not all")&&(r.set(y.dataset.precedence,y),i=y)}i&&r.set(null,i)}u=t.instance,y=u.getAttribute("data-precedence"),f=r.get(y)||i,f===i&&r.set(null,u),r.set(y,u),this.count++,i=Dl.bind(this),u.addEventListener("load",i),u.addEventListener("error",i),f?f.parentNode.insertBefore(u,f.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(u,e.firstChild)),t.state.loading|=4}}var qi={$$typeof:_,Provider:null,Consumer:null,_currentValue:Q,_currentValue2:Q,_threadCount:0};function gj(e,t,r,i,u,f,y,j,R){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=_o(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=_o(0),this.hiddenUpdates=_o(null),this.identifierPrefix=i,this.onUncaughtError=u,this.onCaughtError=f,this.onRecoverableError=y,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=R,this.incompleteTransitions=new Map}function Pg(e,t,r,i,u,f,y,j,R,F,W,re){return e=new gj(e,t,r,y,R,F,W,re,j),t=1,f===!0&&(t|=24),f=Vt(3,null,null,t),e.current=f,f.stateNode=e,t=xc(),t.refCount++,e.pooledCache=t,t.refCount++,f.memoizedState={element:i,isDehydrated:r,cache:t},wc(f),e}function Gg(e){return e?(e=ua,e):ua}function Fg(e,t,r,i,u,f){u=Gg(u),i.context===null?i.context=u:i.pendingContext=u,i=tr(t),i.payload={element:r},f=f===void 0?null:f,f!==null&&(i.callback=f),r=nr(e,i,t),r!==null&&(Mt(r,e,t),xi(r,e,t))}function Xg(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var r=e.retryLane;e.retryLane=r!==0&&r<t?r:t}}function qu(e,t){Xg(e,t),(e=e.alternate)&&Xg(e,t)}function $g(e){if(e.tag===13||e.tag===31){var t=kr(e,67108864);t!==null&&Mt(t,e,67108864),qu(e,67108864)}}function Kg(e){if(e.tag===13||e.tag===31){var t=qt();t=Vo(t);var r=kr(e,t);r!==null&&Mt(r,e,t),qu(e,t)}}var Ml=!0;function yj(e,t,r,i){var u=Y.T;Y.T=null;var f=le.p;try{le.p=2,Yu(e,t,r,i)}finally{le.p=f,Y.T=u}}function vj(e,t,r,i){var u=Y.T;Y.T=null;var f=le.p;try{le.p=8,Yu(e,t,r,i)}finally{le.p=f,Y.T=u}}function Yu(e,t,r,i){if(Ml){var u=Pu(i);if(u===null)Du(e,t,i,Rl,r),Qg(e,i);else if(bj(u,e,t,r,i))i.stopPropagation();else if(Qg(e,i),t&4&&-1<xj.indexOf(e)){for(;u!==null;){var f=Ir(u);if(f!==null)switch(f.tag){case 3:if(f=f.stateNode,f.current.memoizedState.isDehydrated){var y=Tr(f.pendingLanes);if(y!==0){var j=f;for(j.pendingLanes|=2,j.entangledLanes|=2;y;){var R=1<<31-zt(y);j.entanglements[1]|=R,y&=~R}vn(f),(_e&6)===0&&(ml=Rt()+500,_i(0))}}break;case 31:case 13:j=kr(f,2),j!==null&&Mt(j,f,2),gl(),qu(f,2)}if(f=Pu(i),f===null&&Du(e,t,i,Rl,r),f===u)break;u=f}u!==null&&i.stopPropagation()}else Du(e,t,i,null,r)}}function Pu(e){return e=Fo(e),Gu(e)}var Rl=null;function Gu(e){if(Rl=null,e=Wr(e),e!==null){var t=h(e);if(t===null)e=null;else{var r=t.tag;if(r===13){if(e=d(t),e!==null)return e;e=null}else if(r===31){if(e=m(t),e!==null)return e;e=null}else if(r===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Rl=e,null}function Zg(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(a1()){case rh:return 2;case ah:return 8;case Ss:case i1:return 32;case ih:return 268435456;default:return 32}default:return 32}}var Fu=!1,hr=null,mr=null,pr=null,Yi=new Map,Pi=new Map,gr=[],xj="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Qg(e,t){switch(e){case"focusin":case"focusout":hr=null;break;case"dragenter":case"dragleave":mr=null;break;case"mouseover":case"mouseout":pr=null;break;case"pointerover":case"pointerout":Yi.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Pi.delete(t.pointerId)}}function Gi(e,t,r,i,u,f){return e===null||e.nativeEvent!==f?(e={blockedOn:t,domEventName:r,eventSystemFlags:i,nativeEvent:f,targetContainers:[u]},t!==null&&(t=Ir(t),t!==null&&$g(t)),e):(e.eventSystemFlags|=i,t=e.targetContainers,u!==null&&t.indexOf(u)===-1&&t.push(u),e)}function bj(e,t,r,i,u){switch(t){case"focusin":return hr=Gi(hr,e,t,r,i,u),!0;case"dragenter":return mr=Gi(mr,e,t,r,i,u),!0;case"mouseover":return pr=Gi(pr,e,t,r,i,u),!0;case"pointerover":var f=u.pointerId;return Yi.set(f,Gi(Yi.get(f)||null,e,t,r,i,u)),!0;case"gotpointercapture":return f=u.pointerId,Pi.set(f,Gi(Pi.get(f)||null,e,t,r,i,u)),!0}return!1}function Jg(e){var t=Wr(e.target);if(t!==null){var r=h(t);if(r!==null){if(t=r.tag,t===13){if(t=d(r),t!==null){e.blockedOn=t,dh(e.priority,function(){Kg(r)});return}}else if(t===31){if(t=m(r),t!==null){e.blockedOn=t,dh(e.priority,function(){Kg(r)});return}}else if(t===3&&r.stateNode.current.memoizedState.isDehydrated){e.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ol(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var r=Pu(e.nativeEvent);if(r===null){r=e.nativeEvent;var i=new r.constructor(r.type,r);Go=i,r.target.dispatchEvent(i),Go=null}else return t=Ir(r),t!==null&&$g(t),e.blockedOn=r,!1;t.shift()}return!0}function Wg(e,t,r){Ol(e)&&r.delete(t)}function Sj(){Fu=!1,hr!==null&&Ol(hr)&&(hr=null),mr!==null&&Ol(mr)&&(mr=null),pr!==null&&Ol(pr)&&(pr=null),Yi.forEach(Wg),Pi.forEach(Wg)}function zl(e,t){e.blockedOn===t&&(e.blockedOn=null,Fu||(Fu=!0,n.unstable_scheduleCallback(n.unstable_NormalPriority,Sj)))}var _l=null;function Ig(e){_l!==e&&(_l=e,n.unstable_scheduleCallback(n.unstable_NormalPriority,function(){_l===e&&(_l=null);for(var t=0;t<e.length;t+=3){var r=e[t],i=e[t+1],u=e[t+2];if(typeof i!="function"){if(Gu(i||r)===null)continue;break}var f=Ir(r);f!==null&&(e.splice(t,3),t-=3,Pc(f,{pending:!0,data:u,method:r.method,action:i},i,u))}}))}function za(e){function t(R){return zl(R,e)}hr!==null&&zl(hr,e),mr!==null&&zl(mr,e),pr!==null&&zl(pr,e),Yi.forEach(t),Pi.forEach(t);for(var r=0;r<gr.length;r++){var i=gr[r];i.blockedOn===e&&(i.blockedOn=null)}for(;0<gr.length&&(r=gr[0],r.blockedOn===null);)Jg(r),r.blockedOn===null&&gr.shift();if(r=(e.ownerDocument||e).$$reactFormReplay,r!=null)for(i=0;i<r.length;i+=3){var u=r[i],f=r[i+1],y=u[Tt]||null;if(typeof f=="function")y||Ig(r);else if(y){var j=null;if(f&&f.hasAttribute("formAction")){if(u=f,y=f[Tt]||null)j=y.formAction;else if(Gu(u)!==null)continue}else j=y.action;typeof j=="function"?r[i+1]=j:(r.splice(i,3),i-=3),Ig(r)}}}function ey(){function e(f){f.canIntercept&&f.info==="react-transition"&&f.intercept({handler:function(){return new Promise(function(y){return u=y})},focusReset:"manual",scroll:"manual"})}function t(){u!==null&&(u(),u=null),i||setTimeout(r,20)}function r(){if(!i&&!navigation.transition){var f=navigation.currentEntry;f&&f.url!=null&&navigation.navigate(f.url,{state:f.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,u=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(r,100),function(){i=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),u!==null&&(u(),u=null)}}}function Xu(e){this._internalRoot=e}Vl.prototype.render=Xu.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(l(409));var r=t.current,i=qt();Fg(r,i,e,t,null,null)},Vl.prototype.unmount=Xu.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Fg(e.current,2,null,e,null,null),gl(),t[Jr]=null}};function Vl(e){this._internalRoot=e}Vl.prototype.unstable_scheduleHydration=function(e){if(e){var t=uh();e={blockedOn:null,target:e,priority:t};for(var r=0;r<gr.length&&t!==0&&t<gr[r].priority;r++);gr.splice(r,0,e),r===0&&Jg(e)}};var ty=a.version;if(ty!=="19.2.8")throw Error(l(527,ty,"19.2.8"));le.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(l(188)):(e=Object.keys(e).join(","),Error(l(268,e)));return e=g(t),e=e!==null?v(e):null,e=e===null?null:e.stateNode,e};var jj={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:Y,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Bl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Bl.isDisabled&&Bl.supportsFiber)try{Ia=Bl.inject(jj),Ot=Bl}catch{}}return Xi.createRoot=function(e,t){if(!c(e))throw Error(l(299));var r=!1,i="",u=op,f=cp,y=up;return t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onUncaughtError!==void 0&&(u=t.onUncaughtError),t.onCaughtError!==void 0&&(f=t.onCaughtError),t.onRecoverableError!==void 0&&(y=t.onRecoverableError)),t=Pg(e,1,!1,null,null,r,i,null,u,f,y,ey),e[Jr]=t.current,Nu(e),new Xu(t)},Xi.hydrateRoot=function(e,t,r){if(!c(e))throw Error(l(299));var i=!1,u="",f=op,y=cp,j=up,R=null;return r!=null&&(r.unstable_strictMode===!0&&(i=!0),r.identifierPrefix!==void 0&&(u=r.identifierPrefix),r.onUncaughtError!==void 0&&(f=r.onUncaughtError),r.onCaughtError!==void 0&&(y=r.onCaughtError),r.onRecoverableError!==void 0&&(j=r.onRecoverableError),r.formState!==void 0&&(R=r.formState)),t=Pg(e,1,!0,t,r??null,i,u,R,f,y,j,ey),t.context=Gg(null),r=t.current,i=qt(),i=Vo(i),u=tr(i),u.callback=null,nr(r,u,i),r=i,t.current.lanes=r,ti(t,r),vn(t),e[Jr]=t.current,Nu(e),new Vl(t)},Xi.version="19.2.8",Xi}var dy;function Rj(){if(dy)return Zu.exports;dy=1;function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(a){console.error(a)}}return n(),Zu.exports=Mj(),Zu.exports}var hf=Rj();const Oj=ux(hf),mf=S.createContext({});function pf(n){const a=S.useRef(null);return a.current===null&&(a.current=n()),a.current}const zj=typeof window<"u",gf=zj?S.useLayoutEffect:S.useEffect,To=S.createContext(null);function yf(n,a){n.indexOf(a)===-1&&n.push(a)}function co(n,a){const s=n.indexOf(a);s>-1&&n.splice(s,1)}const En=(n,a,s)=>s>a?a:s<n?n:s;let Co=()=>{};const Sr={},hx=n=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n),mx=n=>typeof n=="object"&&n!==null,px=n=>/^0[^.\s]+$/u.test(n);function gx(n){let a;return()=>(a===void 0&&(a=n()),a)}const rn=n=>n,gs=(...n)=>n.reduce((a,s)=>l=>s(a(l))),ns=(n,a,s)=>{const l=a-n;return l?(s-n)/l:1};class vf{constructor(){this.subscriptions=[]}add(a){return yf(this.subscriptions,a),()=>co(this.subscriptions,a)}notify(a,s,l){const c=this.subscriptions.length;if(c)if(c===1)this.subscriptions[0](a,s,l);else for(let h=0;h<c;h++){const d=this.subscriptions[h];d&&d(a,s,l)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}}const Pt=n=>n*1e3,nn=n=>n/1e3,yx=(n,a)=>a?n*(1e3/a):0,vx=(n,a,s)=>(((1-3*s+3*a)*n+(3*s-6*a))*n+3*a)*n,_j=1e-7,Vj=12;function Bj(n,a,s,l,c){let h,d,m=0;do d=a+(s-a)/2,h=vx(d,l,c)-n,h>0?s=d:a=d;while(Math.abs(h)>_j&&++m<Vj);return d}function ys(n,a,s,l){if(n===a&&s===l)return rn;const c=h=>Bj(h,0,1,n,s);return h=>h===0||h===1?h:vx(c(h),a,l)}const xx=n=>a=>a<=.5?n(2*a)/2:(2-n(2*(1-a)))/2,bx=n=>a=>1-n(1-a),Sx=ys(.33,1.53,.69,.99),xf=bx(Sx),jx=xx(xf),wx=n=>n>=1?1:(n*=2)<1?.5*xf(n):.5*(2-Math.pow(2,-10*(n-1))),bf=n=>1-Math.sin(Math.acos(n)),Ex=bx(bf),Tx=xx(bf),Lj=ys(.42,0,1,1),Uj=ys(0,0,.58,1),Cx=ys(.42,0,.58,1),Hj=n=>Array.isArray(n)&&typeof n[0]!="number",Nx=n=>Array.isArray(n)&&typeof n[0]=="number",qj={linear:rn,easeIn:Lj,easeInOut:Cx,easeOut:Uj,circIn:bf,circInOut:Tx,circOut:Ex,backIn:xf,backInOut:jx,backOut:Sx,anticipate:wx},Yj=n=>typeof n=="string",fy=n=>{if(Nx(n)){Co(n.length===4);const[a,s,l,c]=n;return ys(a,s,l,c)}else if(Yj(n))return qj[n];return n},Ll=["setup","read","resolveKeyframes","preUpdate","update","preRender","render","postRender"];function Pj(n){let a=new Set,s=new Set,l=!1,c=!1;const h=new WeakSet;let d={delta:0,timestamp:0,isProcessing:!1};function m(g){h.has(g)&&(p.schedule(g),n()),g(d)}const p={schedule:(g,v=!1,x=!1)=>{const E=x&&l?a:s;return v&&h.add(g),E.add(g),g},cancel:g=>{s.delete(g),h.delete(g)},process:g=>{if(d=g,l){c=!0;return}l=!0;const v=a;a=s,s=v,a.forEach(m),a.clear(),l=!1,c&&(c=!1,p.process(g))}};return p}const Gj=40;function Dx(n,a){let s=!1,l=!0;const c={delta:0,timestamp:0,isProcessing:!1},h=()=>s=!0,d=Ll.reduce((_,z)=>(_[z]=Pj(h),_),{}),{setup:m,read:p,resolveKeyframes:g,preUpdate:v,update:x,preRender:b,render:E,postRender:w}=d,N=()=>{const _=Sr.useManualTiming,z=_?c.timestamp:performance.now();s=!1,_||(c.delta=l?1e3/60:Math.max(Math.min(z-c.timestamp,Gj),1)),c.timestamp=z,c.isProcessing=!0,m.process(c),p.process(c),g.process(c),v.process(c),x.process(c),b.process(c),E.process(c),w.process(c),c.isProcessing=!1,s&&a&&(l=!1,n(N))},T=()=>{s=!0,l=!0,c.isProcessing||n(N)};return{schedule:Ll.reduce((_,z)=>{const U=d[z];return _[z]=(L,D=!1,H=!1)=>(s||T(),U.schedule(L,D,H)),_},{}),cancel:_=>{for(let z=0;z<Ll.length;z++)d[Ll[z]].cancel(_)},state:c,steps:d}}const{schedule:Fe,cancel:jr,state:vt,steps:Iu}=Dx(typeof requestAnimationFrame<"u"?requestAnimationFrame:rn,!0);let Wl;function Fj(){Wl=void 0}const jt={now:()=>(Wl===void 0&&jt.set(vt.isProcessing||Sr.useManualTiming?vt.timestamp:performance.now()),Wl),set:n=>{Wl=n,queueMicrotask(Fj)}},Ax=n=>a=>typeof a=="string"&&a.startsWith(n),kx=Ax("--"),Xj=Ax("var(--"),Sf=n=>Xj(n)?$j.test(n.split("/*")[0].trim()):!1,$j=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;function hy(n){return typeof n!="string"?!1:n.split("/*")[0].includes("var(--")}const $a={test:n=>typeof n=="number",parse:parseFloat,transform:n=>n},rs={...$a,transform:n=>En(0,1,n)},Ul={...$a,default:1},Ji=n=>Math.round(n*1e5)/1e5,jf=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function Kj(n){return n==null}const Zj=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,wf=(n,a)=>s=>!!(typeof s=="string"&&Zj.test(s)&&s.startsWith(n)||a&&!Kj(s)&&Object.prototype.hasOwnProperty.call(s,a)),Mx=(n,a,s)=>l=>{if(typeof l!="string")return l;const[c,h,d,m]=l.match(jf);return{[n]:parseFloat(c),[a]:parseFloat(h),[s]:parseFloat(d),alpha:m!==void 0?parseFloat(m):1}},Qj=n=>En(0,255,n),ed={...$a,transform:n=>Math.round(Qj(n))},Fr={test:wf("rgb","red"),parse:Mx("red","green","blue"),transform:({red:n,green:a,blue:s,alpha:l=1})=>"rgba("+ed.transform(n)+", "+ed.transform(a)+", "+ed.transform(s)+", "+Ji(rs.transform(l))+")"};function Jj(n){let a="",s="",l="",c="";return n.length>5?(a=n.substring(1,3),s=n.substring(3,5),l=n.substring(5,7),c=n.substring(7,9)):(a=n.substring(1,2),s=n.substring(2,3),l=n.substring(3,4),c=n.substring(4,5),a+=a,s+=s,l+=l,c+=c),{red:parseInt(a,16),green:parseInt(s,16),blue:parseInt(l,16),alpha:c?parseInt(c,16)/255:1}}const Cd={test:wf("#"),parse:Jj,transform:Fr.transform},vs=n=>({test:a=>typeof a=="string"&&a.endsWith(n)&&a.split(" ").length===1,parse:parseFloat,transform:a=>`${a}${n}`}),Gn=vs("deg"),wn=vs("%"),ge=vs("px"),Wj=vs("vh"),Ij=vs("vw"),my={...wn,parse:n=>wn.parse(n)/100,transform:n=>wn.transform(n*100)},Ha={test:wf("hsl","hue"),parse:Mx("hue","saturation","lightness"),transform:({hue:n,saturation:a,lightness:s,alpha:l=1})=>"hsla("+Math.round(n)+", "+wn.transform(Ji(a))+", "+wn.transform(Ji(s))+", "+Ji(rs.transform(l))+")"},st={test:n=>Fr.test(n)||Cd.test(n)||Ha.test(n),parse:n=>Fr.test(n)?Fr.parse(n):Ha.test(n)?Ha.parse(n):Cd.parse(n),transform:n=>typeof n=="string"?n:n.hasOwnProperty("red")?Fr.transform(n):Ha.transform(n),getAnimatableNone:n=>{const a=st.parse(n);return a.alpha=0,st.transform(a)}},ew=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;function tw(n){var a,s;return isNaN(n)&&typeof n=="string"&&(((a=n.match(jf))==null?void 0:a.length)||0)+(((s=n.match(ew))==null?void 0:s.length)||0)>0}const Rx="number",Ox="color",nw="var",rw="var(",py="${}",aw=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function Ga(n){const a=n.toString(),s=[],l={color:[],number:[],var:[]},c=[];let h=0;const m=a.replace(aw,p=>(st.test(p)?(l.color.push(h),c.push(Ox),s.push(st.parse(p))):p.startsWith(rw)?(l.var.push(h),c.push(nw),s.push(p)):(l.number.push(h),c.push(Rx),s.push(parseFloat(p))),++h,py)).split(py);return{values:s,split:m,indexes:l,types:c}}function iw(n){return Ga(n).values}function zx({split:n,types:a}){const s=n.length;return l=>{let c="";for(let h=0;h<s;h++)if(c+=n[h],l[h]!==void 0){const d=a[h];d===Rx?c+=Ji(l[h]):d===Ox?c+=st.transform(l[h]):c+=l[h]}return c}}function sw(n){return zx(Ga(n))}const lw=n=>typeof n=="number"?0:st.test(n)?st.getAnimatableNone(n):n,ow=(n,a)=>typeof n=="number"?a!=null&&a.trim().endsWith("/")?n:0:lw(n);function cw(n){const a=Ga(n);return zx(a)(a.values.map((l,c)=>ow(l,a.split[c])))}const fn={test:tw,parse:iw,createTransformer:sw,getAnimatableNone:cw};function td(n,a,s){return s<0&&(s+=1),s>1&&(s-=1),s<1/6?n+(a-n)*6*s:s<1/2?a:s<2/3?n+(a-n)*(2/3-s)*6:n}function uw({hue:n,saturation:a,lightness:s,alpha:l}){n/=360,a/=100,s/=100;let c=0,h=0,d=0;if(!a)c=h=d=s;else{const m=s<.5?s*(1+a):s+a-s*a,p=2*s-m;c=td(p,m,n+1/3),h=td(p,m,n),d=td(p,m,n-1/3)}return{red:Math.round(c*255),green:Math.round(h*255),blue:Math.round(d*255),alpha:l}}function uo(n,a){return s=>s>0?a:n}const Ge=(n,a,s)=>n+(a-n)*s,nd=(n,a,s)=>{const l=n*n,c=s*(a*a-l)+l;return c<0?0:Math.sqrt(c)},dw=[Cd,Fr,Ha],fw=n=>dw.find(a=>a.test(n));function gy(n){const a=fw(n);if(!a)return!1;let s=a.parse(n);return a===Ha&&(s=uw(s)),s}const yy=(n,a)=>{const s=gy(n),l=gy(a);if(!s||!l)return uo(n,a);const c={...s};return h=>(c.red=nd(s.red,l.red,h),c.green=nd(s.green,l.green,h),c.blue=nd(s.blue,l.blue,h),c.alpha=Ge(s.alpha,l.alpha,h),Fr.transform(c))},Nd=new Set(["none","hidden"]);function hw(n,a){return Nd.has(n)?s=>s<=0?n:a:s=>s>=1?a:n}function mw(n,a){return s=>Ge(n,a,s)}function Ef(n){return typeof n=="number"?mw:typeof n=="string"?Sf(n)?uo:st.test(n)?yy:yw:Array.isArray(n)?_x:typeof n=="object"?st.test(n)?yy:pw:uo}function _x(n,a){const s=[...n],l=s.length,c=n.map((h,d)=>Ef(h)(h,a[d]));return h=>{for(let d=0;d<l;d++)s[d]=c[d](h);return s}}function pw(n,a){const s={...n,...a},l={};for(const c in s)n[c]!==void 0&&a[c]!==void 0&&(l[c]=Ef(n[c])(n[c],a[c]));return c=>{for(const h in l)s[h]=l[h](c);return s}}function gw(n,a){const s=[],l={color:0,var:0,number:0};for(let c=0;c<a.values.length;c++){const h=a.types[c],d=n.indexes[h][l[h]],m=n.values[d]??0;s[c]=m,l[h]++}return s}const yw=(n,a)=>{const s=fn.createTransformer(a),l=Ga(n),c=Ga(a);return l.indexes.var.length===c.indexes.var.length&&l.indexes.color.length===c.indexes.color.length&&l.indexes.number.length>=c.indexes.number.length?Nd.has(n)&&!c.values.length||Nd.has(a)&&!l.values.length?hw(n,a):gs(_x(gw(l,c),c.values),s):uo(n,a)};function Vx(n,a,s){return typeof n=="number"&&typeof a=="number"&&typeof s=="number"?Ge(n,a,s):Ef(n)(n,a)}const vw=n=>{const a=({timestamp:s})=>n(s);return{start:(s=!0)=>Fe.update(a,s),stop:()=>jr(a),now:()=>vt.isProcessing?vt.timestamp:jt.now()}},Bx=(n,a,s=10)=>{let l="";const c=Math.max(Math.round(a/s),2);for(let h=0;h<c;h++)l+=Math.round(n(h/(c-1))*1e4)/1e4+", ";return`linear(${l.substring(0,l.length-2)})`},fo=2e4;function Tf(n){let a=0;const s=50;let l=n.next(a);for(;!l.done&&a<fo;)a+=s,l=n.next(a);return a>=fo?1/0:a}function xw(n,a=100,s){const l=s({...n,keyframes:[0,a]}),c=Math.min(Tf(l),fo);return{type:"keyframes",ease:h=>l.next(c*h).value/a,duration:nn(c)}}const We={stiffness:100,damping:10,mass:1,velocity:0,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05,maxDamping:1};function Dd(n,a){return n*Math.sqrt(1-a*a)}const bw=12;function Sw(n,a,s){let l=s;for(let c=1;c<bw;c++)l=l-n(l)/a(l);return l}const rd=.001;function jw({duration:n=We.duration,bounce:a=We.bounce,velocity:s=We.velocity,mass:l=We.mass}){let c,h,d=1-a;d=En(We.minDamping,We.maxDamping,d),n=En(We.minDuration,We.maxDuration,nn(n)),d<1?(c=g=>{const v=g*d,x=v*n,b=v-s,E=Dd(g,d),w=Math.exp(-x);return rd-b/E*w},h=g=>{const x=g*d*n,b=x*s+s,E=Math.pow(d,2)*Math.pow(g,2)*n,w=Math.exp(-x),N=Dd(Math.pow(g,2),d);return(-c(g)+rd>0?-1:1)*((b-E)*w)/N}):(c=g=>{const v=Math.exp(-g*n),x=(g-s)*n+1;return-rd+v*x},h=g=>{const v=Math.exp(-g*n),x=(s-g)*(n*n);return v*x});const m=5/n,p=Sw(c,h,m);if(n=Pt(n),isNaN(p))return{stiffness:We.stiffness,damping:We.damping,duration:n};{const g=Math.pow(p,2)*l;return{stiffness:g,damping:d*2*Math.sqrt(l*g),duration:n}}}const ww=["duration","bounce"],Ew=["stiffness","damping","mass"];function vy(n,a){return a.some(s=>n[s]!==void 0)}function Tw(n){let a={velocity:We.velocity,stiffness:We.stiffness,damping:We.damping,mass:We.mass,isResolvedFromDuration:!1,...n};if(!vy(n,Ew)&&vy(n,ww))if(a.velocity=0,n.visualDuration){const s=n.visualDuration,l=2*Math.PI/(s*1.2),c=l*l,h=2*En(.05,1,1-(n.bounce||0))*Math.sqrt(c);a={...a,mass:We.mass,stiffness:c,damping:h}}else{const s=jw({...n,velocity:0});a={...a,...s,mass:We.mass},a.isResolvedFromDuration=!0}return a}function ho(n=We.visualDuration,a=We.bounce){const s=typeof n!="object"?{visualDuration:n,keyframes:[0,1],bounce:a}:n;let{restSpeed:l,restDelta:c}=s;const h=s.keyframes[0],d=s.keyframes[s.keyframes.length-1],m={done:!1,value:h},{stiffness:p,damping:g,mass:v,duration:x,velocity:b,isResolvedFromDuration:E}=Tw({...s,velocity:-nn(s.velocity||0)}),w=b||0,N=g/(2*Math.sqrt(p*v)),T=d-h,A=nn(Math.sqrt(p/v)),k=Math.abs(T)<5;l||(l=k?We.restSpeed.granular:We.restSpeed.default),c||(c=k?We.restDelta.granular:We.restDelta.default);let _,z,U,L,D,H;if(N<1)U=Dd(A,N),L=(w+N*A*T)/U,_=O=>{const $=Math.exp(-N*A*O);return d-$*(L*Math.sin(U*O)+T*Math.cos(U*O))},D=N*A*L+T*U,H=N*A*T-L*U,z=O=>Math.exp(-N*A*O)*(D*Math.sin(U*O)+H*Math.cos(U*O));else if(N===1){_=$=>d-Math.exp(-A*$)*(T+(w+A*T)*$);const O=w+A*T;z=$=>Math.exp(-A*$)*(A*O*$-w)}else{const O=A*Math.sqrt(N*N-1);_=de=>{const ye=Math.exp(-N*A*de),Y=Math.min(O*de,300);return d-ye*((w+N*A*T)*Math.sinh(Y)+O*T*Math.cosh(Y))/O};const $=(w+N*A*T)/O,Z=N*A*$-T*O,ue=N*A*T-$*O;z=de=>{const ye=Math.exp(-N*A*de),Y=Math.min(O*de,300);return ye*(Z*Math.sinh(Y)+ue*Math.cosh(Y))}}const M={calculatedDuration:E&&x||null,velocity:O=>Pt(z(O)),next:O=>{if(!E&&N<1){const Z=Math.exp(-N*A*O),ue=Math.sin(U*O),de=Math.cos(U*O),ye=d-Z*(L*ue+T*de),Y=Pt(Z*(D*ue+H*de));return m.done=Math.abs(Y)<=l&&Math.abs(d-ye)<=c,m.value=m.done?d:ye,m}const $=_(O);if(E)m.done=O>=x;else{const Z=Pt(z(O));m.done=Math.abs(Z)<=l&&Math.abs(d-$)<=c}return m.value=m.done?d:$,m},toString:()=>{const O=Math.min(Tf(M),fo),$=Bx(Z=>M.next(O*Z).value,O,30);return O+"ms "+$},toTransition:()=>{}};return M}ho.applyToOptions=n=>{const a=xw(n,100,ho);return n.ease=a.ease,n.duration=Pt(a.duration),n.type="keyframes",n};const Cw=5;function Lx(n,a,s){const l=Math.max(a-Cw,0);return yx(s-n(l),a-l)}function Ad({keyframes:n,velocity:a=0,power:s=.8,timeConstant:l=325,bounceDamping:c=10,bounceStiffness:h=500,modifyTarget:d,min:m,max:p,restDelta:g=.5,restSpeed:v}){const x=n[0],b={done:!1,value:x},E=H=>m!==void 0&&H<m||p!==void 0&&H>p,w=H=>m===void 0?p:p===void 0||Math.abs(m-H)<Math.abs(p-H)?m:p;let N=s*a;const T=x+N,A=d===void 0?T:d(T);A!==T&&(N=A-x);const k=H=>-N*Math.exp(-H/l),_=H=>A+k(H),z=H=>{const M=k(H),O=_(H);b.done=Math.abs(M)<=g,b.value=b.done?A:O};let U,L;const D=H=>{E(b.value)&&(U=H,L=ho({keyframes:[b.value,w(b.value)],velocity:Lx(_,H,b.value),damping:c,stiffness:h,restDelta:g,restSpeed:v}))};return D(0),{calculatedDuration:null,next:H=>{let M=!1;return!L&&U===void 0&&(M=!0,z(H),D(H)),U!==void 0&&H>=U?L.next(H-U):(!M&&z(H),b)}}}function Nw(n,a,s){const l=[],c=s||Sr.mix||Vx,h=n.length-1;for(let d=0;d<h;d++){let m=c(n[d],n[d+1]);if(a){const p=Array.isArray(a)?a[d]||rn:a;m=gs(p,m)}l.push(m)}return l}function Dw(n,a,{clamp:s=!0,ease:l,mixer:c}={}){const h=n.length;if(Co(h===a.length),h===1)return()=>a[0];if(h===2&&a[0]===a[1])return()=>a[1];const d=n[0]===n[1];n[0]>n[h-1]&&(n=[...n].reverse(),a=[...a].reverse());const m=Nw(a,l,c),p=m.length,g=v=>{if(d&&v<n[0])return a[0];let x=0;if(p>1)for(;x<n.length-2&&!(v<n[x+1]);x++);const b=ns(n[x],n[x+1],v);return m[x](b)};return s?v=>g(En(n[0],n[h-1],v)):g}function Aw(n,a){const s=n[n.length-1];for(let l=1;l<=a;l++){const c=ns(0,a,l);n.push(Ge(s,1,c))}}function kw(n){const a=[0];return Aw(a,n.length-1),a}function Mw(n,a){return n.map(s=>s*a)}function Rw(n,a){return n.map(()=>a||Cx).splice(0,n.length-1)}function Wi({duration:n=300,keyframes:a,times:s,ease:l="easeInOut"}){const c=Hj(l)?l.map(fy):fy(l),h={done:!1,value:a[0]},d=Mw(s&&s.length===a.length?s:kw(a),n),m=Dw(d,a,{ease:Array.isArray(c)?c:Rw(a,c)});return{calculatedDuration:n,next:p=>(h.value=m(p),h.done=p>=n,h)}}const Ow=n=>n!==null;function No(n,{repeat:a,repeatType:s="loop"},l,c=1){const h=n.filter(Ow),m=c<0||a&&s!=="loop"&&a%2===1?0:h.length-1;return!m||l===void 0?h[m]:l}const zw={decay:Ad,inertia:Ad,tween:Wi,keyframes:Wi,spring:ho};function Ux(n){typeof n.type=="string"&&(n.type=zw[n.type])}class Cf{constructor(){this.updateFinished()}get finished(){return this._finished}updateFinished(){this._finished=new Promise(a=>{this.resolve=a})}notifyFinished(){this.resolve()}then(a,s){return this.finished.then(a,s)}}const _w=n=>n/100;class mo extends Cf{constructor(a){super(),this.state="idle",this.startTime=null,this.isStopped=!1,this.currentTime=0,this.holdTime=null,this.playbackSpeed=1,this.delayState={done:!1,value:void 0},this.stop=()=>{var l,c;const{motionValue:s}=this.options;s&&s.updatedAt!==jt.now()&&this.tick(jt.now()),this.isStopped=!0,this.state!=="idle"&&(this.teardown(),(c=(l=this.options).onStop)==null||c.call(l))},this.options=a,this.initAnimation(),this.play(),a.autoplay===!1&&this.pause()}initAnimation(){const{options:a}=this;Ux(a);const{type:s=Wi,repeat:l=0,repeatDelay:c=0,repeatType:h,velocity:d=0}=a;let{keyframes:m}=a;const p=s||Wi;p!==Wi&&typeof m[0]!="number"&&(this.mixKeyframes=gs(_w,Vx(m[0],m[1])),m=[0,100]);const g=p({...a,keyframes:m});h==="mirror"&&(this.mirroredGenerator=p({...a,keyframes:[...m].reverse(),velocity:-d})),g.calculatedDuration===null&&(g.calculatedDuration=Tf(g));const{calculatedDuration:v}=g;this.calculatedDuration=v,this.resolvedDuration=v+c,this.totalDuration=this.resolvedDuration*(l+1)-c,this.generator=g}updateTime(a){const s=Math.round(a-this.startTime)*this.playbackSpeed;this.holdTime!==null?this.currentTime=this.holdTime:this.currentTime=s}tick(a,s=!1){const{generator:l,totalDuration:c,mixKeyframes:h,mirroredGenerator:d,resolvedDuration:m,calculatedDuration:p}=this;if(this.startTime===null)return l.next(0);const{delay:g=0,keyframes:v,repeat:x,repeatType:b,repeatDelay:E,type:w,onUpdate:N,finalKeyframe:T}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,a):this.speed<0&&(this.startTime=Math.min(a-c/this.speed,this.startTime)),s?this.currentTime=a:this.updateTime(a);const A=this.currentTime-g*(this.playbackSpeed>=0?1:-1),k=this.playbackSpeed>=0?A<0:A>c;this.currentTime=Math.max(A,0),this.state==="finished"&&this.holdTime===null&&(this.currentTime=c);let _=this.currentTime,z=l;if(x){const H=Math.min(this.currentTime,c)/m;let M=Math.floor(H),O=H%1;!O&&H>=1&&(O=1),O===1&&M--,M=Math.min(M,x+1),!!(M%2)&&(b==="reverse"?(O=1-O,E&&(O-=E/m)):b==="mirror"&&(z=d)),_=En(0,1,O)*m}let U;k?(this.delayState.value=v[0],U=this.delayState):U=z.next(_),h&&!k&&(U.value=h(U.value));let{done:L}=U;!k&&p!==null&&(L=this.playbackSpeed>=0?this.currentTime>=c:this.currentTime<=0);const D=this.holdTime===null&&(this.state==="finished"||this.state==="running"&&L);return D&&w!==Ad&&(U.value=No(v,this.options,T,this.speed)),N&&N(U.value),D&&this.finish(),U}then(a,s){return this.finished.then(a,s)}get duration(){return nn(this.calculatedDuration)}get iterationDuration(){const{delay:a=0}=this.options||{};return this.duration+nn(a)}get time(){return nn(this.currentTime)}set time(a){a=Pt(a),this.currentTime=a,this.startTime===null||this.holdTime!==null||this.playbackSpeed===0?this.holdTime=a:this.driver&&(this.startTime=this.driver.now()-a/this.playbackSpeed),this.driver?this.driver.start(!1):(this.startTime=0,this.state="paused",this.holdTime=a,this.tick(a))}getGeneratorVelocity(){const a=this.currentTime;if(a<=0)return this.options.velocity||0;if(this.generator.velocity)return this.generator.velocity(a);const s=this.generator.next(a).value;return Lx(l=>this.generator.next(l).value,a,s)}get speed(){return this.playbackSpeed}set speed(a){const s=this.playbackSpeed!==a;s&&this.driver&&this.updateTime(jt.now()),this.playbackSpeed=a,s&&this.driver&&(this.time=nn(this.currentTime))}play(){var c,h;if(this.isStopped)return;const{driver:a=vw,startTime:s}=this.options;this.driver||(this.driver=a(d=>this.tick(d))),(h=(c=this.options).onPlay)==null||h.call(c);const l=this.driver.now();this.state==="finished"?(this.updateFinished(),this.startTime=l):this.holdTime!==null?this.startTime=l-this.holdTime:this.startTime||(this.startTime=s??l),this.state==="finished"&&this.speed<0&&(this.startTime+=this.calculatedDuration),this.holdTime=null,this.state="running",this.driver.start()}pause(){this.state="paused",this.updateTime(jt.now()),this.holdTime=this.currentTime}complete(){this.state!=="running"&&this.play(),this.state="finished",this.holdTime=null}finish(){var a,s;this.notifyFinished(),this.teardown(),this.state="finished",(s=(a=this.options).onComplete)==null||s.call(a)}cancel(){var a,s;this.holdTime=null,this.startTime=0,this.tick(0),this.teardown(),(s=(a=this.options).onCancel)==null||s.call(a)}teardown(){this.state="idle",this.stopDriver(),this.startTime=this.holdTime=null}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(a){return this.startTime=0,this.tick(a,!0)}attachTimeline(a){var s;return this.options.allowFlatten&&(this.options.type="keyframes",this.options.ease="linear",this.initAnimation()),(s=this.driver)==null||s.stop(),a.observe(this)}}function Vw(n){for(let a=1;a<n.length;a++)n[a]??(n[a]=n[a-1])}const Xr=n=>n*180/Math.PI,kd=n=>{const a=Xr(Math.atan2(n[1],n[0]));return Md(a)},Bw={x:4,y:5,translateX:4,translateY:5,scaleX:0,scaleY:3,scale:n=>(Math.abs(n[0])+Math.abs(n[3]))/2,rotate:kd,rotateZ:kd,skewX:n=>Xr(Math.atan(n[1])),skewY:n=>Xr(Math.atan(n[2])),skew:n=>(Math.abs(n[1])+Math.abs(n[2]))/2},Md=n=>(n=n%360,n<0&&(n+=360),n),xy=kd,by=n=>Math.sqrt(n[0]*n[0]+n[1]*n[1]),Sy=n=>Math.sqrt(n[4]*n[4]+n[5]*n[5]),Lw={x:12,y:13,z:14,translateX:12,translateY:13,translateZ:14,scaleX:by,scaleY:Sy,scale:n=>(by(n)+Sy(n))/2,rotateX:n=>Md(Xr(Math.atan2(n[6],n[5]))),rotateY:n=>Md(Xr(Math.atan2(-n[2],n[0]))),rotateZ:xy,rotate:xy,skewX:n=>Xr(Math.atan(n[4])),skewY:n=>Xr(Math.atan(n[1])),skew:n=>(Math.abs(n[1])+Math.abs(n[4]))/2};function Rd(n){return n.includes("scale")?1:0}function Od(n,a){if(!n||n==="none")return Rd(a);const s=n.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);let l,c;if(s)l=Lw,c=s;else{const m=n.match(/^matrix\(([-\d.e\s,]+)\)$/u);l=Bw,c=m}if(!c)return Rd(a);const h=l[a],d=c[1].split(",").map(Hw);return typeof h=="function"?h(d):d[h]}const Uw=(n,a)=>{const{transform:s="none"}=getComputedStyle(n);return Od(s,a)};function Hw(n){return parseFloat(n.trim())}const Ka=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],Za=new Set([...Ka,"pathRotation"]),jy=n=>n===$a||n===ge,qw=new Set(["x","y","z"]),Yw=Ka.filter(n=>!qw.has(n));function Pw(n){const a=[];return Yw.forEach(s=>{const l=n.getValue(s);l!==void 0&&(a.push([s,l.get()]),l.set(s.startsWith("scale")?1:0))}),a}const xr={width:({x:n},{paddingLeft:a="0",paddingRight:s="0",boxSizing:l})=>{const c=n.max-n.min;return l==="border-box"?c:c-parseFloat(a)-parseFloat(s)},height:({y:n},{paddingTop:a="0",paddingBottom:s="0",boxSizing:l})=>{const c=n.max-n.min;return l==="border-box"?c:c-parseFloat(a)-parseFloat(s)},top:(n,{top:a})=>parseFloat(a),left:(n,{left:a})=>parseFloat(a),bottom:({y:n},{top:a})=>parseFloat(a)+(n.max-n.min),right:({x:n},{left:a})=>parseFloat(a)+(n.max-n.min),x:(n,{transform:a})=>Od(a,"x"),y:(n,{transform:a})=>Od(a,"y")};xr.translateX=xr.x;xr.translateY=xr.y;const $r=new Set;let zd=!1,_d=!1,Vd=!1;function Hx(){if(_d){const n=Array.from($r).filter(l=>l.needsMeasurement),a=new Set(n.map(l=>l.element)),s=new Map;a.forEach(l=>{const c=Pw(l);c.length&&(s.set(l,c),l.render())}),n.forEach(l=>l.measureInitialState()),a.forEach(l=>{l.render();const c=s.get(l);c&&c.forEach(([h,d])=>{var m;(m=l.getValue(h))==null||m.set(d)})}),n.forEach(l=>l.measureEndState()),n.forEach(l=>{l.suspendedScrollY!==void 0&&window.scrollTo(0,l.suspendedScrollY)})}_d=!1,zd=!1,$r.forEach(n=>n.complete(Vd)),$r.clear()}function qx(){$r.forEach(n=>{n.readKeyframes(),n.needsMeasurement&&(_d=!0)})}function Gw(){Vd=!0,qx(),Hx(),Vd=!1}class Nf{constructor(a,s,l,c,h,d=!1){this.state="pending",this.isAsync=!1,this.needsMeasurement=!1,this.unresolvedKeyframes=[...a],this.onComplete=s,this.name=l,this.motionValue=c,this.element=h,this.isAsync=d}scheduleResolve(){this.state="scheduled",this.isAsync?($r.add(this),zd||(zd=!0,Fe.read(qx),Fe.resolveKeyframes(Hx))):(this.readKeyframes(),this.complete())}readKeyframes(){const{unresolvedKeyframes:a,name:s,element:l,motionValue:c}=this;if(a[0]===null){const h=c==null?void 0:c.get(),d=a[a.length-1];if(h!==void 0)a[0]=h;else if(l&&s){const m=l.readValue(s,d);m!=null&&(a[0]=m)}a[0]===void 0&&(a[0]=d),c&&h===void 0&&c.set(a[0])}Vw(a)}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(a=!1){this.state="complete",this.onComplete(this.unresolvedKeyframes,this.finalKeyframe,a),$r.delete(this)}cancel(){this.state==="scheduled"&&($r.delete(this),this.state="pending")}resume(){this.state==="pending"&&this.scheduleResolve()}}const Fw=n=>n.startsWith("--");function Yx(n,a,s){Fw(a)?n.style.setProperty(a,s):n.style[a]=s}const Xw={};function Px(n,a){const s=gx(n);return()=>Xw[a]??s()}const $w=Px(()=>window.ScrollTimeline!==void 0,"scrollTimeline"),Gx=Px(()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0},"linearEasing"),Zi=([n,a,s,l])=>`cubic-bezier(${n}, ${a}, ${s}, ${l})`,wy={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:Zi([0,.65,.55,1]),circOut:Zi([.55,0,1,.45]),backIn:Zi([.31,.01,.66,-.59]),backOut:Zi([.33,1.53,.69,.99])};function Fx(n,a){if(n)return typeof n=="function"?Gx()?Bx(n,a):"ease-out":Nx(n)?Zi(n):Array.isArray(n)?n.map(s=>Fx(s,a)||wy.easeOut):wy[n]}function Kw(n,a,s,{delay:l=0,duration:c=300,repeat:h=0,repeatType:d="loop",ease:m="easeOut",times:p}={},g=void 0){const v={[a]:s};p&&(v.offset=p);const x=Fx(m,c);Array.isArray(x)&&(v.easing=x);const b={delay:l,duration:c,easing:Array.isArray(x)?"linear":x,fill:"both",iterations:h+1,direction:d==="reverse"?"alternate":"normal"};return g&&(b.pseudoElement=g),n.animate(v,b)}function Xx(n){return typeof n=="function"&&"applyToOptions"in n}function Zw({type:n,...a}){return Xx(n)&&Gx()?n.applyToOptions(a):(a.duration??(a.duration=300),a.ease??(a.ease="easeOut"),a)}class $x extends Cf{constructor(a){if(super(),this.finishedTime=null,this.isStopped=!1,this.manualStartTime=null,!a)return;const{element:s,name:l,keyframes:c,pseudoElement:h,allowFlatten:d=!1,finalKeyframe:m,onComplete:p}=a;this.isPseudoElement=!!h,this.allowFlatten=d,this.options=a,Co(typeof a.type!="string");const g=Zw(a);this.animation=Kw(s,l,c,g,h),g.autoplay===!1&&this.animation.pause(),this.animation.onfinish=()=>{if(this.finishedTime=this.time,!h){const v=No(c,this.options,m,this.speed);this.updateMotionValue&&this.updateMotionValue(v),Yx(s,l,v),this.animation.cancel()}p==null||p(),this.notifyFinished()}}play(){this.isStopped||(this.manualStartTime=null,this.animation.play(),this.state==="finished"&&this.updateFinished())}pause(){this.animation.pause()}complete(){var a,s;(s=(a=this.animation).finish)==null||s.call(a)}cancel(){try{this.animation.cancel()}catch{}}stop(){if(this.isStopped)return;this.isStopped=!0;const{state:a}=this;a==="idle"||a==="finished"||(this.updateMotionValue?this.updateMotionValue():this.commitStyles(),this.isPseudoElement||this.cancel())}commitStyles(){var s,l,c;const a=(s=this.options)==null?void 0:s.element;!this.isPseudoElement&&(a!=null&&a.isConnected)&&((c=(l=this.animation).commitStyles)==null||c.call(l))}get duration(){var s,l;const a=((l=(s=this.animation.effect)==null?void 0:s.getComputedTiming)==null?void 0:l.call(s).duration)||0;return nn(Number(a))}get iterationDuration(){const{delay:a=0}=this.options||{};return this.duration+nn(a)}get time(){return nn(Number(this.animation.currentTime)||0)}set time(a){const s=this.finishedTime!==null;this.manualStartTime=null,this.finishedTime=null,this.animation.currentTime=Pt(a),s&&this.animation.pause()}get speed(){return this.animation.playbackRate}set speed(a){a<0&&(this.finishedTime=null),this.animation.playbackRate=a}get state(){return this.finishedTime!==null?"finished":this.animation.playState}get startTime(){return this.manualStartTime??Number(this.animation.startTime)}set startTime(a){this.manualStartTime=this.animation.startTime=a}attachTimeline({timeline:a,rangeStart:s,rangeEnd:l,observe:c}){var h;return this.allowFlatten&&((h=this.animation.effect)==null||h.updateTiming({easing:"linear"})),this.animation.onfinish=null,a&&$w()?(this.animation.timeline=a,s&&(this.animation.rangeStart=s),l&&(this.animation.rangeEnd=l),rn):c(this)}}const Kx={anticipate:wx,backInOut:jx,circInOut:Tx};function Qw(n){return n in Kx}function Jw(n){typeof n.ease=="string"&&Qw(n.ease)&&(n.ease=Kx[n.ease])}const ad=10;class Ww extends $x{constructor(a){Jw(a),Ux(a),super(a),a.startTime!==void 0&&a.autoplay!==!1&&(this.startTime=a.startTime),this.options=a}updateMotionValue(a){const{motionValue:s,onUpdate:l,onComplete:c,element:h,...d}=this.options;if(!s)return;if(a!==void 0){s.set(a);return}const m=new mo({...d,autoplay:!1}),p=Math.max(ad,jt.now()-this.startTime),g=En(0,ad,p-ad),v=m.sample(p).value,{name:x}=this.options;h&&x&&Yx(h,x,v),s.setWithVelocity(m.sample(Math.max(0,p-g)).value,v,g),m.stop()}}const Ey=(n,a)=>a==="zIndex"?!1:!!(typeof n=="number"||Array.isArray(n)||typeof n=="string"&&(fn.test(n)||n==="0")&&!n.startsWith("url("));function Iw(n){const a=n[0];if(n.length===1)return!0;for(let s=0;s<n.length;s++)if(n[s]!==a)return!0}function e2(n,a,s,l){const c=n[0];if(c===null)return!1;if(a==="display"||a==="visibility")return!0;const h=n[n.length-1],d=Ey(c,a),m=Ey(h,a);return!d||!m?!1:Iw(n)||(s==="spring"||Xx(s))&&l}function Bd(n){n.duration=0,n.type="keyframes"}const Zx=new Set(["opacity","clipPath","filter","transform","backgroundColor"]),t2=/^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;function n2(n){for(let a=0;a<n.length;a++)if(typeof n[a]=="string"&&t2.test(n[a]))return!0;return!1}const r2=new Set(["color","backgroundColor","outlineColor","fill","stroke","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"]),a2=gx(()=>Object.hasOwnProperty.call(Element.prototype,"animate"));function i2(n){var x;const{motionValue:a,name:s,repeatDelay:l,repeatType:c,damping:h,type:d,keyframes:m}=n,p=(x=a==null?void 0:a.owner)==null?void 0:x.current;if(!(p instanceof HTMLElement)&&!(p instanceof SVGElement))return!1;const{onUpdate:g,transformTemplate:v}=a.owner.getProps();return a2()&&s&&(Zx.has(s)||r2.has(s)&&n2(m))&&(s!=="transform"||!v)&&!g&&!l&&c!=="mirror"&&h!==0&&d!=="inertia"}const s2=40;class l2 extends Cf{constructor({autoplay:a=!0,delay:s=0,type:l="keyframes",repeat:c=0,repeatDelay:h=0,repeatType:d="loop",keyframes:m,name:p,motionValue:g,element:v,...x}){var w;super(),this.stop=()=>{var N,T;this._animation&&(this._animation.stop(),(N=this.stopTimeline)==null||N.call(this)),(T=this.keyframeResolver)==null||T.cancel()},this.createdAt=jt.now();const b={autoplay:a,delay:s,type:l,repeat:c,repeatDelay:h,repeatType:d,name:p,motionValue:g,element:v,...x},E=(v==null?void 0:v.KeyframeResolver)||Nf;this.keyframeResolver=new E(m,(N,T,A)=>this.onKeyframesResolved(N,T,b,!A),p,g,v),(w=this.keyframeResolver)==null||w.scheduleResolve()}onKeyframesResolved(a,s,l,c){var A,k;this.keyframeResolver=void 0;const{name:h,type:d,velocity:m,delay:p,isHandoff:g,onUpdate:v}=l;this.resolvedAt=jt.now();let x=!0;e2(a,h,d,m)||(x=!1,(Sr.instantAnimations||!p)&&(v==null||v(No(a,l,s))),a[0]=a[a.length-1],Bd(l),l.repeat=0);const E={startTime:c?this.resolvedAt?this.resolvedAt-this.createdAt>s2?this.resolvedAt:this.createdAt:this.createdAt:void 0,finalKeyframe:s,...l,keyframes:a},w=x&&!g&&i2(E),N=(k=(A=E.motionValue)==null?void 0:A.owner)==null?void 0:k.current;let T;if(w)try{T=new Ww({...E,element:N})}catch{T=new mo(E)}else T=new mo(E);T.finished.then(()=>{this.notifyFinished()}).catch(rn),this.pendingTimeline&&(this.stopTimeline=T.attachTimeline(this.pendingTimeline),this.pendingTimeline=void 0),this._animation=T}get finished(){return this._animation?this.animation.finished:this._finished}then(a,s){return this.finished.finally(a).then(()=>{})}get animation(){var a;return this._animation||((a=this.keyframeResolver)==null||a.resume(),Gw()),this._animation}get duration(){return this.animation.duration}get iterationDuration(){return this.animation.iterationDuration}get time(){return this.animation.time}set time(a){this.animation.time=a}get speed(){return this.animation.speed}get state(){return this.animation.state}set speed(a){this.animation.speed=a}get startTime(){return this.animation.startTime}attachTimeline(a){return this._animation?this.stopTimeline=this.animation.attachTimeline(a):this.pendingTimeline=a,()=>this.stop()}play(){this.animation.play()}pause(){this.animation.pause()}complete(){this.animation.complete()}cancel(){var a;this._animation&&this.animation.cancel(),(a=this.keyframeResolver)==null||a.cancel()}}function Qx(n,a,s,l=0,c=1){const h=Array.from(n).sort((g,v)=>g.sortNodePosition(v)).indexOf(a),d=n.size,m=(d-1)*l;return typeof s=="function"?s(h,d):c===1?h*l:m-h*l}const Ty=30,o2=n=>!isNaN(parseFloat(n));class c2{constructor(a,s={}){this.canTrackVelocity=null,this.events={},this.updateAndNotify=l=>{var h;const c=jt.now();if(this.updatedAt!==c&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(l),this.current!==this.prev&&((h=this.events.change)==null||h.notify(this.current),this.dependents))for(const d of this.dependents)d.dirty()},this.hasAnimated=!1,this.setCurrent(a),this.owner=s.owner}setCurrent(a){this.current=a,this.updatedAt=jt.now(),this.canTrackVelocity===null&&a!==void 0&&(this.canTrackVelocity=o2(this.current))}setPrevFrameValue(a=this.current){this.prevFrameValue=a,this.prevUpdatedAt=this.updatedAt}onChange(a){return this.on("change",a)}on(a,s){this.events[a]||(this.events[a]=new vf);const l=this.events[a].add(s);return a==="change"?()=>{l(),Fe.read(()=>{this.events.change.getSize()||this.stop()})}:l}clearListeners(){for(const a in this.events)this.events[a].clear()}attach(a,s){this.passiveEffect=a,this.stopPassiveEffect=s}set(a){this.passiveEffect?this.passiveEffect(a,this.updateAndNotify):this.updateAndNotify(a)}setWithVelocity(a,s,l){this.set(s),this.prev=void 0,this.prevFrameValue=a,this.prevUpdatedAt=this.updatedAt-l}jump(a,s=!0){this.updateAndNotify(a),this.prev=a,this.prevUpdatedAt=this.prevFrameValue=void 0,s&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}dirty(){var a;(a=this.events.change)==null||a.notify(this.current)}addDependent(a){this.dependents||(this.dependents=new Set),this.dependents.add(a)}removeDependent(a){this.dependents&&this.dependents.delete(a)}get(){return this.current}getPrevious(){return this.prev}getVelocity(){const a=jt.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||a-this.updatedAt>Ty)return 0;const s=Math.min(this.updatedAt-this.prevUpdatedAt,Ty);return yx(parseFloat(this.current)-parseFloat(this.prevFrameValue),s)}start(a){return this.stop(),new Promise(s=>{this.hasAnimated=!0,this.animation=a(s),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){var a,s;(a=this.dependents)==null||a.clear(),(s=this.events.destroy)==null||s.notify(),this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}}function Fa(n,a){return new c2(n,a)}function Jx(n,a){if(n!=null&&n.inherit&&a){const{inherit:s,...l}=n;return{...a,...l}}return n}function Df(n,a){const s=(n==null?void 0:n[a])??(n==null?void 0:n.default)??n;return s!==n?Jx(s,n):s}const u2={type:"spring",stiffness:500,damping:25,restSpeed:10},d2=n=>({type:"spring",stiffness:550,damping:n===0?2*Math.sqrt(550):30,restSpeed:10}),f2={type:"keyframes",duration:.8},h2={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},m2=(n,{keyframes:a})=>a.length>2?f2:Za.has(n)?n.startsWith("scale")?d2(a[1]):u2:h2,p2=new Set(["when","delay","delayChildren","staggerChildren","staggerDirection","repeat","repeatType","repeatDelay","from","elapsed"]);function g2(n){for(const a in n)if(!p2.has(a))return!0;return!1}const Af=(n,a,s,l={},c,h)=>d=>{const m=Df(l,n)||{},p=m.delay||l.delay||0;let{elapsed:g=0}=l;g=g-Pt(p);const v={keyframes:Array.isArray(s)?s:[null,s],ease:"easeOut",velocity:a.getVelocity(),...m,delay:-g,onUpdate:b=>{a.set(b),m.onUpdate&&m.onUpdate(b)},onComplete:()=>{d(),m.onComplete&&m.onComplete()},name:n,motionValue:a,element:h?void 0:c};g2(m)||Object.assign(v,m2(n,v)),v.duration&&(v.duration=Pt(v.duration)),v.repeatDelay&&(v.repeatDelay=Pt(v.repeatDelay)),v.from!==void 0&&(v.keyframes[0]=v.from);let x=!1;if((v.type===!1||v.duration===0&&!v.repeatDelay)&&(Bd(v),v.delay===0&&(x=!0)),(Sr.instantAnimations||Sr.skipAnimations||c!=null&&c.shouldSkipAnimations||m.skipAnimations)&&(x=!0,Bd(v),v.delay=0),v.allowFlatten=!m.type&&!m.ease,x&&!h&&a.get()!==void 0){const b=No(v.keyframes,m);if(b!==void 0){Fe.update(()=>{v.onUpdate(b),v.onComplete()});return}}return m.isSync?new mo(v):new l2(v)},y2=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function v2(n){const a=y2.exec(n);if(!a)return[,];const[,s,l,c]=a;return[`--${s??l}`,c]}function Wx(n,a,s=1){const[l,c]=v2(n);if(!l)return;const h=window.getComputedStyle(a).getPropertyValue(l);if(h){const d=h.trim();return hx(d)?parseFloat(d):d}return Sf(c)?Wx(c,a,s+1):c}function Cy(n){const a=[{},{}];return n==null||n.values.forEach((s,l)=>{a[0][l]=s.get(),a[1][l]=s.getVelocity()}),a}function kf(n,a,s,l){if(typeof a=="function"){const[c,h]=Cy(l);a=a(s!==void 0?s:n.custom,c,h)}if(typeof a=="string"&&(a=n.variants&&n.variants[a]),typeof a=="function"){const[c,h]=Cy(l);a=a(s!==void 0?s:n.custom,c,h)}return a}function Kr(n,a,s){const l=n.getProps();return kf(l,a,s!==void 0?s:l.custom,n)}const Ix=new Set(["width","height","top","left","right","bottom",...Ka]),Ld=n=>Array.isArray(n);function x2(n,a,s){n.hasValue(a)?n.getValue(a).set(s):n.addValue(a,Fa(s))}function b2(n){return Ld(n)?n[n.length-1]||0:n}function S2(n,a){const s=Kr(n,a);let{transitionEnd:l={},transition:c={},...h}=s||{};h={...h,...l};for(const d in h){const m=b2(h[d]);x2(n,d,m)}}const xt=n=>!!(n&&n.getVelocity);function j2(n){return!!(xt(n)&&n.add)}function Ud(n,a){const s=n.getValue("willChange");if(j2(s))return s.add(a);if(!s&&Sr.WillChange){const l=new Sr.WillChange("auto");n.addValue("willChange",l),l.add(a)}}function Mf(n){return n.replace(/([A-Z])/g,a=>`-${a.toLowerCase()}`)}const w2="framerAppearId",eb="data-"+Mf(w2);function tb(n){return n.props[eb]}function E2({protectedKeys:n,needsAnimating:a},s){const l=n.hasOwnProperty(s)&&a[s]!==!0;return a[s]=!1,l}function nb(n,a,{delay:s=0,transitionOverride:l,type:c}={}){let{transition:h,transitionEnd:d,...m}=a;const p=n.getDefaultTransition();h=h?Jx(h,p):p;const g=h==null?void 0:h.reduceMotion,v=h==null?void 0:h.skipAnimations;l&&(h=l);const x=[],b=c&&n.animationState&&n.animationState.getState()[c],E=h==null?void 0:h.path;E&&E.animateVisualElement(n,m,h,s,x);for(const w in m){const N=n.getValue(w,n.latestValues[w]??null),T=m[w];if(T===void 0||b&&E2(b,w))continue;const A={delay:s,...Df(h||{},w)};v&&(A.skipAnimations=!0);const k=N.get();if(k!==void 0&&!N.isAnimating()&&!Array.isArray(T)&&T===k&&!A.velocity){Fe.update(()=>N.set(T));continue}let _=!1;if(window.MotionHandoffAnimation){const L=tb(n);if(L){const D=window.MotionHandoffAnimation(L,w,Fe);D!==null&&(A.startTime=D,_=!0)}}Ud(n,w);const z=g??n.shouldReduceMotion;N.start(Af(w,N,T,z&&Ix.has(w)?{type:!1}:A,n,_));const U=N.animation;U&&x.push(U)}if(d){const w=()=>Fe.update(()=>{d&&S2(n,d)});x.length?Promise.all(x).then(w):w()}return x}function Hd(n,a,s={}){var p;const l=Kr(n,a,s.type==="exit"?(p=n.presenceContext)==null?void 0:p.custom:void 0);let{transition:c=n.getDefaultTransition()||{}}=l||{};s.transitionOverride&&(c=s.transitionOverride);const h=l?()=>Promise.all(nb(n,l,s)):()=>Promise.resolve(),d=n.variantChildren&&n.variantChildren.size?(g=0)=>{const{delayChildren:v=0,staggerChildren:x,staggerDirection:b}=c;return T2(n,a,g,v,x,b,s)}:()=>Promise.resolve(),{when:m}=c;if(m){const[g,v]=m==="beforeChildren"?[h,d]:[d,h];return g().then(()=>v())}else return Promise.all([h(),d(s.delay)])}function T2(n,a,s=0,l=0,c=0,h=1,d){const m=[];for(const p of n.variantChildren)p.notify("AnimationStart",a),m.push(Hd(p,a,{...d,delay:s+(typeof l=="function"?0:l)+Qx(n.variantChildren,p,l,c,h)}).then(()=>p.notify("AnimationComplete",a)));return Promise.all(m)}function C2(n,a,s={}){n.notify("AnimationStart",a);let l;if(Array.isArray(a)){const c=a.map(h=>Hd(n,h,s));l=Promise.all(c)}else if(typeof a=="string")l=Hd(n,a,s);else{const c=typeof a=="function"?Kr(n,a,s.custom):a;l=Promise.all(nb(n,c,s))}return l.then(()=>{n.notify("AnimationComplete",a)})}const N2={test:n=>n==="auto",parse:n=>n},rb=n=>a=>a.test(n),ab=[$a,ge,wn,Gn,Ij,Wj,N2],Ny=n=>ab.find(rb(n));function D2(n){return typeof n=="number"?n===0:n!==null?n==="none"||n==="0"||px(n):!0}const A2=new Set(["brightness","contrast","saturate","opacity"]);function k2(n){const[a,s]=n.slice(0,-1).split("(");if(a==="drop-shadow")return n;const[l]=s.match(jf)||[];if(!l)return n;const c=s.replace(l,"");let h=A2.has(a)?1:0;return l!==s&&(h*=100),a+"("+h+c+")"}const M2=/\b([a-z-]*)\(.*?\)/gu,qd={...fn,getAnimatableNone:n=>{const a=n.match(M2);return a?a.map(k2).join(" "):n}},Yd={...fn,getAnimatableNone:n=>{const a=fn.parse(n);return fn.createTransformer(n)(a.map(l=>typeof l=="number"?0:typeof l=="object"?{...l,alpha:1}:l))}},Dy={...$a,transform:Math.round},R2={rotate:Gn,pathRotation:Gn,rotateX:Gn,rotateY:Gn,rotateZ:Gn,scale:Ul,scaleX:Ul,scaleY:Ul,scaleZ:Ul,skew:Gn,skewX:Gn,skewY:Gn,distance:ge,translateX:ge,translateY:ge,translateZ:ge,x:ge,y:ge,z:ge,perspective:ge,transformPerspective:ge,opacity:rs,originX:my,originY:my,originZ:ge},po={borderWidth:ge,borderTopWidth:ge,borderRightWidth:ge,borderBottomWidth:ge,borderLeftWidth:ge,borderRadius:ge,borderTopLeftRadius:ge,borderTopRightRadius:ge,borderBottomRightRadius:ge,borderBottomLeftRadius:ge,width:ge,maxWidth:ge,height:ge,maxHeight:ge,top:ge,right:ge,bottom:ge,left:ge,inset:ge,insetBlock:ge,insetBlockStart:ge,insetBlockEnd:ge,insetInline:ge,insetInlineStart:ge,insetInlineEnd:ge,padding:ge,paddingTop:ge,paddingRight:ge,paddingBottom:ge,paddingLeft:ge,paddingBlock:ge,paddingBlockStart:ge,paddingBlockEnd:ge,paddingInline:ge,paddingInlineStart:ge,paddingInlineEnd:ge,margin:ge,marginTop:ge,marginRight:ge,marginBottom:ge,marginLeft:ge,marginBlock:ge,marginBlockStart:ge,marginBlockEnd:ge,marginInline:ge,marginInlineStart:ge,marginInlineEnd:ge,fontSize:ge,backgroundPositionX:ge,backgroundPositionY:ge,...R2,zIndex:Dy,fillOpacity:rs,strokeOpacity:rs,numOctaves:Dy},O2={...po,color:st,backgroundColor:st,outlineColor:st,fill:st,stroke:st,borderColor:st,borderTopColor:st,borderRightColor:st,borderBottomColor:st,borderLeftColor:st,filter:qd,WebkitFilter:qd,mask:Yd,WebkitMask:Yd},ib=n=>O2[n],z2=new Set([qd,Yd]);function sb(n,a){let s=ib(n);return z2.has(s)||(s=fn),s.getAnimatableNone?s.getAnimatableNone(a):void 0}const _2=new Set(["auto","none","0"]);function V2(n,a,s){let l=0,c;for(;l<n.length&&!c;){const h=n[l];typeof h=="string"&&!_2.has(h)&&Ga(h).values.length&&(c=n[l]),l++}if(c&&s)for(const h of a)n[h]=sb(s,c)}class B2 extends Nf{constructor(a,s,l,c,h){super(a,s,l,c,h,!0)}readKeyframes(){const{unresolvedKeyframes:a,element:s,name:l}=this;if(!s||!s.current)return;super.readKeyframes();for(let v=0;v<a.length;v++){let x=a[v];if(typeof x=="string"&&(x=x.trim(),Sf(x))){const b=Wx(x,s.current);b!==void 0&&(a[v]=b),v===a.length-1&&(this.finalKeyframe=x)}}if(this.resolveNoneKeyframes(),!Ix.has(l)||a.length!==2)return;const[c,h]=a,d=Ny(c),m=Ny(h),p=hy(c),g=hy(h);if(p!==g&&xr[l]){this.needsMeasurement=!0;return}if(d!==m)if(jy(d)&&jy(m))for(let v=0;v<a.length;v++){const x=a[v];typeof x=="string"&&(a[v]=parseFloat(x))}else xr[l]&&(this.needsMeasurement=!0)}resolveNoneKeyframes(){const{unresolvedKeyframes:a,name:s}=this,l=[];for(let c=0;c<a.length;c++)(a[c]===null||D2(a[c]))&&l.push(c);l.length&&V2(a,l,s)}measureInitialState(){const{element:a,unresolvedKeyframes:s,name:l}=this;if(!a||!a.current)return;l==="height"&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=xr[l](a.measureViewportBox(),window.getComputedStyle(a.current)),s[0]=this.measuredOrigin;const c=s[s.length-1];c!==void 0&&a.getValue(l,c).jump(c,!1)}measureEndState(){var m;const{element:a,name:s,unresolvedKeyframes:l}=this;if(!a||!a.current)return;const c=a.getValue(s);c&&c.jump(this.measuredOrigin,!1);const h=l.length-1,d=l[h];l[h]=xr[s](a.measureViewportBox(),window.getComputedStyle(a.current)),d!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=d),(m=this.removedTransforms)!=null&&m.length&&this.removedTransforms.forEach(([p,g])=>{a.getValue(p).set(g)}),this.resolveNoneKeyframes()}}const Rf=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"];function lb(n,a,s){if(n==null)return[];if(n instanceof EventTarget)return[n];if(typeof n=="string"){let l=document;const c=(s==null?void 0:s[n])??l.querySelectorAll(n);return c?Array.from(c):[]}return Array.from(n).filter(l=>l!=null)}const Pd=(n,a)=>a&&typeof n=="number"?a.transform(n):n;function Il(n){return mx(n)&&"offsetHeight"in n&&!("ownerSVGElement"in n)}const{schedule:Of}=Dx(queueMicrotask,!1),dn={x:!1,y:!1};function ob(){return dn.x||dn.y}function L2(n){return n==="x"||n==="y"?dn[n]?null:(dn[n]=!0,()=>{dn[n]=!1}):dn.x||dn.y?null:(dn.x=dn.y=!0,()=>{dn.x=dn.y=!1})}function cb(n,a){const s=lb(n),l=new AbortController,c={passive:!0,...a,signal:l.signal};return[s,c,()=>l.abort()]}function U2(n){return!(n.pointerType==="touch"||ob())}function H2(n,a,s={}){const[l,c,h]=cb(n,s);return l.forEach(d=>{let m=!1,p=!1,g;const v=()=>{d.removeEventListener("pointerleave",w)},x=T=>{g&&(g(T),g=void 0),v()},b=T=>{m=!1,window.removeEventListener("pointerup",b),window.removeEventListener("pointercancel",b),p&&(p=!1,x(T))},E=()=>{m=!0,window.addEventListener("pointerup",b,c),window.addEventListener("pointercancel",b,c)},w=T=>{if(T.pointerType!=="touch"){if(m){p=!0;return}x(T)}},N=T=>{if(!U2(T))return;p=!1;const A=a(d,T);typeof A=="function"&&(g=A,d.addEventListener("pointerleave",w,c))};d.addEventListener("pointerenter",N,c),d.addEventListener("pointerdown",E,c)}),h}const ub=(n,a)=>a?n===a?!0:ub(n,a.parentElement):!1,zf=n=>n.pointerType==="mouse"?typeof n.button!="number"||n.button<=0:n.isPrimary!==!1,q2=new Set(["BUTTON","INPUT","SELECT","TEXTAREA","A"]);function Y2(n){return q2.has(n.tagName)||n.isContentEditable===!0}const P2=new Set(["INPUT","SELECT","TEXTAREA"]);function G2(n){return P2.has(n.tagName)||n.isContentEditable===!0}const eo=new WeakSet;function Ay(n){return a=>{a.key==="Enter"&&n(a)}}function id(n,a){n.dispatchEvent(new PointerEvent("pointer"+a,{isPrimary:!0,bubbles:!0}))}const F2=(n,a)=>{const s=n.currentTarget;if(!s)return;const l=Ay(()=>{if(eo.has(s))return;id(s,"down");const c=Ay(()=>{id(s,"up")}),h=()=>id(s,"cancel");s.addEventListener("keyup",c,a),s.addEventListener("blur",h,a)});s.addEventListener("keydown",l,a),s.addEventListener("blur",()=>s.removeEventListener("keydown",l),a)};function ky(n){return zf(n)&&!ob()}const My=new WeakSet;function X2(n,a,s={}){const[l,c,h]=cb(n,s),d=m=>{const p=m.currentTarget;if(!ky(m)||My.has(m))return;eo.add(p),s.stopPropagation&&My.add(m);const g=a(p,m),v={...c,capture:!0},x=(w,N)=>{window.removeEventListener("pointerup",b,v),window.removeEventListener("pointercancel",E,v),eo.has(p)&&eo.delete(p),ky(w)&&typeof g=="function"&&g(w,{success:N})},b=w=>{x(w,p===window||p===document||s.useGlobalTarget||ub(p,w.target))},E=w=>{x(w,!1)};window.addEventListener("pointerup",b,v),window.addEventListener("pointercancel",E,v)};return l.forEach(m=>{(s.useGlobalTarget?window:m).addEventListener("pointerdown",d,c),Il(m)&&(m.addEventListener("focus",g=>F2(g,c)),!Y2(m)&&!m.hasAttribute("tabindex")&&(m.tabIndex=0))}),h}function _f(n){return mx(n)&&"ownerSVGElement"in n}const to=new WeakMap;let vr;const db=(n,a,s)=>(l,c)=>c&&c[0]?c[0][n+"Size"]:_f(l)&&"getBBox"in l?l.getBBox()[a]:l[s],$2=db("inline","width","offsetWidth"),K2=db("block","height","offsetHeight");function Z2({target:n,borderBoxSize:a}){var s;(s=to.get(n))==null||s.forEach(l=>{l(n,{get width(){return $2(n,a)},get height(){return K2(n,a)}})})}function Q2(n){n.forEach(Z2)}function J2(){typeof ResizeObserver>"u"||(vr=new ResizeObserver(Q2))}function W2(n,a){vr||J2();const s=lb(n);return s.forEach(l=>{let c=to.get(l);c||(c=new Set,to.set(l,c)),c.add(a),vr==null||vr.observe(l)}),()=>{s.forEach(l=>{const c=to.get(l);c==null||c.delete(a),c!=null&&c.size||vr==null||vr.unobserve(l)})}}const no=new Set;let qa;function I2(){qa=()=>{const n={get width(){return window.innerWidth},get height(){return window.innerHeight}};no.forEach(a=>a(n))},window.addEventListener("resize",qa)}function eE(n){return no.add(n),qa||I2(),()=>{no.delete(n),!no.size&&typeof qa=="function"&&(window.removeEventListener("resize",qa),qa=void 0)}}function Ry(n,a){return typeof n=="function"?eE(n):W2(n,a)}function tE(n){return _f(n)&&n.tagName==="svg"}const nE=[...ab,st,fn],rE=n=>nE.find(rb(n)),Oy=()=>({translate:0,scale:1,origin:0,originPoint:0}),Ya=()=>({x:Oy(),y:Oy()}),zy=()=>({min:0,max:0}),ot=()=>({x:zy(),y:zy()}),aE=new WeakMap;function Do(n){return n!==null&&typeof n=="object"&&typeof n.start=="function"}function as(n){return typeof n=="string"||Array.isArray(n)}const Vf=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],Bf=["initial",...Vf];function Ao(n){return Do(n.animate)||Bf.some(a=>as(n[a]))}function fb(n){return!!(Ao(n)||n.variants)}function iE(n,a,s){for(const l in a){const c=a[l],h=s[l];if(xt(c))n.addValue(l,c);else if(xt(h))n.addValue(l,Fa(c,{owner:n}));else if(h!==c)if(n.hasValue(l)){const d=n.getValue(l);d.liveStyle===!0?d.jump(c):d.hasAnimated||d.set(c)}else{const d=n.getStaticValue(l);n.addValue(l,Fa(d!==void 0?d:c,{owner:n}))}}for(const l in s)a[l]===void 0&&n.removeValue(l);return a}const go={current:null},Lf={current:!1},sE=typeof window<"u";function hb(){if(Lf.current=!0,!!sE)if(window.matchMedia){const n=window.matchMedia("(prefers-reduced-motion)"),a=()=>go.current=n.matches;n.addEventListener("change",a),a()}else go.current=!1}const _y=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"];let yo={};function mb(n){yo=n}function lE(){return yo}class oE{scrapeMotionValuesFromProps(a,s,l){return{}}constructor({parent:a,props:s,presenceContext:l,reducedMotionConfig:c,skipAnimations:h,blockInitialAnimation:d,visualState:m},p={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.shouldSkipAnimations=!1,this.values=new Map,this.KeyframeResolver=Nf,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.hasBeenMounted=!1,this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{const E=jt.now();this.renderScheduledAt<E&&(this.renderScheduledAt=E,Fe.render(this.render,!1,!0))};const{latestValues:g,renderState:v}=m;this.latestValues=g,this.baseTarget={...g},this.initialValues=s.initial?{...g}:{},this.renderState=v,this.parent=a,this.props=s,this.presenceContext=l,this.depth=a?a.depth+1:0,this.reducedMotionConfig=c,this.skipAnimationsConfig=h,this.options=p,this.blockInitialAnimation=!!d,this.isControllingVariants=Ao(s),this.isVariantNode=fb(s),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(a&&a.current);const{willChange:x,...b}=this.scrapeMotionValuesFromProps(s,{},this);for(const E in b){const w=b[E];g[E]!==void 0&&xt(w)&&w.set(g[E])}}mount(a){var s,l;if(this.hasBeenMounted)for(const c in this.initialValues)(s=this.values.get(c))==null||s.jump(this.initialValues[c]),this.latestValues[c]=this.initialValues[c];this.current=a,aE.set(a,this),this.projection&&!this.projection.instance&&this.projection.mount(a),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((c,h)=>this.bindToMotionValue(h,c)),this.reducedMotionConfig==="never"?this.shouldReduceMotion=!1:this.reducedMotionConfig==="always"?this.shouldReduceMotion=!0:(Lf.current||hb(),this.shouldReduceMotion=go.current),this.shouldSkipAnimations=this.skipAnimationsConfig??!1,(l=this.parent)==null||l.addChild(this),this.update(this.props,this.presenceContext),this.hasBeenMounted=!0}unmount(){var a;this.projection&&this.projection.unmount(),jr(this.notifyUpdate),jr(this.render),this.valueSubscriptions.forEach(s=>s()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),(a=this.parent)==null||a.removeChild(this);for(const s in this.events)this.events[s].clear();for(const s in this.features){const l=this.features[s];l&&(l.unmount(),l.isMounted=!1)}this.current=null}addChild(a){this.children.add(a),this.enteringChildren??(this.enteringChildren=new Set),this.enteringChildren.add(a)}removeChild(a){this.children.delete(a),this.enteringChildren&&this.enteringChildren.delete(a)}bindToMotionValue(a,s){if(this.valueSubscriptions.has(a)&&this.valueSubscriptions.get(a)(),s.accelerate&&Zx.has(a)&&this.current instanceof HTMLElement){const{factory:d,keyframes:m,times:p,ease:g,duration:v}=s.accelerate,x=new $x({element:this.current,name:a,keyframes:m,times:p,ease:g,duration:Pt(v)}),b=d(x);this.valueSubscriptions.set(a,()=>{b(),x.cancel()});return}const l=Za.has(a);l&&this.onBindTransform&&this.onBindTransform();const c=s.on("change",d=>{this.latestValues[a]=d,this.props.onUpdate&&Fe.preRender(this.notifyUpdate),l&&this.projection&&(this.projection.isTransformDirty=!0),this.scheduleRender()});let h;typeof window<"u"&&window.MotionCheckAppearSync&&(h=window.MotionCheckAppearSync(this,a,s)),this.valueSubscriptions.set(a,()=>{c(),h&&h()})}sortNodePosition(a){return!this.current||!this.sortInstanceNodePosition||this.type!==a.type?0:this.sortInstanceNodePosition(this.current,a.current)}updateFeatures(){let a="animation";for(a in yo){const s=yo[a];if(!s)continue;const{isEnabled:l,Feature:c}=s;if(!this.features[a]&&c&&l(this.props)&&(this.features[a]=new c(this)),this.features[a]){const h=this.features[a];h.isMounted?h.update():(h.mount(),h.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):ot()}getStaticValue(a){return this.latestValues[a]}setStaticValue(a,s){this.latestValues[a]=s}update(a,s){(a.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=a,this.prevPresenceContext=this.presenceContext,this.presenceContext=s;for(let l=0;l<_y.length;l++){const c=_y[l];this.propEventSubscriptions[c]&&(this.propEventSubscriptions[c](),delete this.propEventSubscriptions[c]);const h="on"+c,d=a[h];d&&(this.propEventSubscriptions[c]=this.on(c,d))}this.prevMotionValues=iE(this,this.scrapeMotionValuesFromProps(a,this.prevProps||{},this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue()}getProps(){return this.props}getVariant(a){return this.props.variants?this.props.variants[a]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(a){const s=this.getClosestVariantNode();if(s)return s.variantChildren&&s.variantChildren.add(a),()=>s.variantChildren.delete(a)}addValue(a,s){const l=this.values.get(a);s!==l&&(l&&this.removeValue(a),this.bindToMotionValue(a,s),this.values.set(a,s),this.latestValues[a]=s.get())}removeValue(a){this.values.delete(a);const s=this.valueSubscriptions.get(a);s&&(s(),this.valueSubscriptions.delete(a)),delete this.latestValues[a],this.removeValueFromRenderState(a,this.renderState)}hasValue(a){return this.values.has(a)}getValue(a,s){if(this.props.values&&this.props.values[a])return this.props.values[a];let l=this.values.get(a);return l===void 0&&s!==void 0&&(l=Fa(s===null?void 0:s,{owner:this}),this.addValue(a,l)),l}readValue(a,s){let l=this.latestValues[a]!==void 0||!this.current?this.latestValues[a]:this.getBaseTargetFromProps(this.props,a)??this.readValueFromInstance(this.current,a,this.options);return l!=null&&(typeof l=="string"&&(hx(l)||px(l))?l=parseFloat(l):!rE(l)&&fn.test(s)&&(l=sb(a,s)),this.setBaseTarget(a,xt(l)?l.get():l)),xt(l)?l.get():l}setBaseTarget(a,s){this.baseTarget[a]=s}getBaseTarget(a){var h;const{initial:s}=this.props;let l;if(typeof s=="string"||typeof s=="object"){const d=kf(this.props,s,(h=this.presenceContext)==null?void 0:h.custom);d&&(l=d[a])}if(s&&l!==void 0)return l;const c=this.getBaseTargetFromProps(this.props,a);return c!==void 0&&!xt(c)?c:this.initialValues[a]!==void 0&&l===void 0?void 0:this.baseTarget[a]}on(a,s){return this.events[a]||(this.events[a]=new vf),this.events[a].add(s)}notify(a,...s){this.events[a]&&this.events[a].notify(...s)}scheduleRenderMicrotask(){Of.render(this.render)}}class pb extends oE{constructor(){super(...arguments),this.KeyframeResolver=B2}sortInstanceNodePosition(a,s){return a.compareDocumentPosition(s)&2?1:-1}getBaseTargetFromProps(a,s){const l=a.style;return l?l[s]:void 0}removeValueFromRenderState(a,{vars:s,style:l}){delete s[a],delete l[a]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);const{children:a}=this.props;xt(a)&&(this.childSubscription=a.on("change",s=>{this.current&&(this.current.textContent=`${s}`)}))}}class Er{constructor(a){this.isMounted=!1,this.node=a}update(){}}function gb({top:n,left:a,right:s,bottom:l}){return{x:{min:a,max:s},y:{min:n,max:l}}}function cE({x:n,y:a}){return{top:a.min,right:n.max,bottom:a.max,left:n.min}}function uE(n,a){if(!a)return n;const s=a({x:n.left,y:n.top}),l=a({x:n.right,y:n.bottom});return{top:s.y,left:s.x,bottom:l.y,right:l.x}}function sd(n){return n===void 0||n===1}function Gd({scale:n,scaleX:a,scaleY:s}){return!sd(n)||!sd(a)||!sd(s)}function Gr(n){return Gd(n)||yb(n)||n.z||n.rotate||n.rotateX||n.rotateY||n.skewX||n.skewY}function yb(n){return Vy(n.x)||Vy(n.y)}function Vy(n){return n&&n!=="0%"}function vo(n,a,s){const l=n-s,c=a*l;return s+c}function By(n,a,s,l,c){return c!==void 0&&(n=vo(n,c,l)),vo(n,s,l)+a}function Fd(n,a=0,s=1,l,c){n.min=By(n.min,a,s,l,c),n.max=By(n.max,a,s,l,c)}function vb(n,{x:a,y:s}){Fd(n.x,a.translate,a.scale,a.originPoint),Fd(n.y,s.translate,s.scale,s.originPoint)}const Ly=.999999999999,Uy=1.0000000000001;function dE(n,a,s,l=!1){var m;const c=s.length;if(!c)return;a.x=a.y=1;let h,d;for(let p=0;p<c;p++){h=s[p],d=h.projectionDelta;const{visualElement:g}=h.options;g&&g.props.style&&g.props.style.display==="contents"||(l&&h.options.layoutScroll&&h.scroll&&h!==h.root&&(Sn(n.x,-h.scroll.offset.x),Sn(n.y,-h.scroll.offset.y)),d&&(a.x*=d.x.scale,a.y*=d.y.scale,vb(n,d)),l&&Gr(h.latestValues)&&ro(n,h.latestValues,(m=h.layout)==null?void 0:m.layoutBox))}a.x<Uy&&a.x>Ly&&(a.x=1),a.y<Uy&&a.y>Ly&&(a.y=1)}function Sn(n,a){n.min+=a,n.max+=a}function Hy(n,a,s,l,c=.5){const h=Ge(n.min,n.max,c);Fd(n,a,s,h,l)}function qy(n,a){return typeof n=="string"?parseFloat(n)/100*(a.max-a.min):n}function ro(n,a,s){const l=s??n;Hy(n.x,qy(a.x,l.x),a.scaleX,a.scale,a.originX),Hy(n.y,qy(a.y,l.y),a.scaleY,a.scale,a.originY)}function xb(n,a){return gb(uE(n.getBoundingClientRect(),a))}function fE(n,a,s){const l=xb(n,s),{scroll:c}=a;return c&&(Sn(l.x,c.offset.x),Sn(l.y,c.offset.y)),l}const hE={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},mE=Ka.length;function pE(n,a,s){let l="",c=!0;for(let d=0;d<mE;d++){const m=Ka[d],p=n[m];if(p===void 0)continue;let g=!0;if(typeof p=="number")g=p===(m.startsWith("scale")?1:0);else{const v=parseFloat(p);g=m.startsWith("scale")?v===1:v===0}if(!g||s){const v=Pd(p,po[m]);if(!g){c=!1;const x=hE[m]||m;l+=`${x}(${v}) `}s&&(a[m]=v)}}const h=n.pathRotation;return h&&(c=!1,l+=`rotate(${Pd(h,po.pathRotation)}) `),l=l.trim(),s?l=s(a,c?"":l):c&&(l="none"),l}function Uf(n,a,s){const{style:l,vars:c,transformOrigin:h}=n;let d=!1,m=!1;for(const p in a){const g=a[p];if(Za.has(p)){d=!0;continue}else if(kx(p)){c[p]=g;continue}else{const v=Pd(g,po[p]);p.startsWith("origin")?(m=!0,h[p]=v):l[p]=v}}if(a.transform||(d||s?l.transform=pE(a,n.transform,s):l.transform&&(l.transform="none")),m){const{originX:p="50%",originY:g="50%",originZ:v=0}=h;l.transformOrigin=`${p} ${g} ${v}`}}function bb(n,{style:a,vars:s},l,c){const h=n.style;let d;for(d in a)h[d]=a[d];c==null||c.applyProjectionStyles(h,l);for(d in s)h.setProperty(d,s[d])}function Yy(n,a){return a.max===a.min?0:n/(a.max-a.min)*100}const $i={correct:(n,a)=>{if(!a.target)return n;if(typeof n=="string")if(ge.test(n))n=parseFloat(n);else return n;const s=Yy(n,a.target.x),l=Yy(n,a.target.y);return`${s}% ${l}%`}},gE={correct:(n,{treeScale:a,projectionDelta:s})=>{const l=n,c=fn.parse(n);if(c.length>5)return l;const h=fn.createTransformer(n),d=typeof c[0]!="number"?1:0,m=s.x.scale*a.x,p=s.y.scale*a.y;c[0+d]/=m,c[1+d]/=p;const g=Ge(m,p,.5);return typeof c[2+d]=="number"&&(c[2+d]/=g),typeof c[3+d]=="number"&&(c[3+d]/=g),h(c)}},Xd={borderRadius:{...$i,applyTo:[...Rf]},borderTopLeftRadius:$i,borderTopRightRadius:$i,borderBottomLeftRadius:$i,borderBottomRightRadius:$i,boxShadow:gE};function Sb(n,{layout:a,layoutId:s}){return Za.has(n)||n.startsWith("origin")||(a||s!==void 0)&&(!!Xd[n]||n==="opacity")}function Hf(n,a,s){var d;const l=n.style,c=a==null?void 0:a.style,h={};if(!l)return h;for(const m in l)(xt(l[m])||c&&xt(c[m])||Sb(m,n)||((d=s==null?void 0:s.getValue(m))==null?void 0:d.liveStyle)!==void 0)&&(h[m]=l[m]);return h}function yE(n){return window.getComputedStyle(n)}class vE extends pb{constructor(){super(...arguments),this.type="html",this.renderInstance=bb}mount(a){Co(!!a.style),super.mount(a)}readValueFromInstance(a,s){var l;if(Za.has(s))return(l=this.projection)!=null&&l.isProjecting?Rd(s):Uw(a,s);{const c=yE(a),h=(kx(s)?c.getPropertyValue(s):c[s])||0;return typeof h=="string"?h.trim():h}}measureInstanceViewportBox(a,{transformPagePoint:s}){return xb(a,s)}build(a,s,l){Uf(a,s,l.transformTemplate)}scrapeMotionValuesFromProps(a,s,l){return Hf(a,s,l)}}const xE={offset:"stroke-dashoffset",array:"stroke-dasharray"},bE={offset:"strokeDashoffset",array:"strokeDasharray"};function SE(n,a,s=1,l=0,c=!0){n.pathLength=1;const h=c?xE:bE;n[h.offset]=`${-l}`,n[h.array]=`${a} ${s}`}const jE=["offsetDistance","offsetPath","offsetRotate","offsetAnchor"];function jb(n,{attrX:a,attrY:s,attrScale:l,pathLength:c,pathSpacing:h=1,pathOffset:d=0,...m},p,g,v){if(Uf(n,m,g),p){n.style.viewBox&&(n.attrs.viewBox=n.style.viewBox);return}n.attrs=n.style,n.style={};const{attrs:x,style:b}=n;x.transform&&(b.transform=x.transform,delete x.transform),(b.transform||x.transformOrigin)&&(b.transformOrigin=x.transformOrigin??"50% 50%",delete x.transformOrigin),b.transform&&(b.transformBox=(v==null?void 0:v.transformBox)??"fill-box",delete x.transformBox);for(const E of jE)x[E]!==void 0&&(b[E]=x[E],delete x[E]);a!==void 0&&(x.x=a),s!==void 0&&(x.y=s),l!==void 0&&(x.scale=l),c!==void 0&&SE(x,c,h,d,!1)}const wb=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]),Eb=n=>typeof n=="string"&&n.toLowerCase()==="svg";function wE(n,a,s,l){bb(n,a,void 0,l);for(const c in a.attrs)n.setAttribute(wb.has(c)?c:Mf(c),a.attrs[c])}function Tb(n,a,s){const l=Hf(n,a,s);for(const c in n)if(xt(n[c])||xt(a[c])){const h=Ka.indexOf(c)!==-1?"attr"+c.charAt(0).toUpperCase()+c.substring(1):c;l[h]=n[c]}return l}class EE extends pb{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1,this.measureInstanceViewportBox=ot}getBaseTargetFromProps(a,s){return a[s]}readValueFromInstance(a,s){if(Za.has(s)){const l=ib(s);return l&&l.default||0}return s=wb.has(s)?s:Mf(s),a.getAttribute(s)}scrapeMotionValuesFromProps(a,s,l){return Tb(a,s,l)}build(a,s,l){jb(a,s,this.isSVGTag,l.transformTemplate,l.style)}renderInstance(a,s,l,c){wE(a,s,l,c)}mount(a){this.isSVGTag=Eb(a.tagName),super.mount(a)}}const TE=Bf.length;function Cb(n){if(!n)return;if(!n.isControllingVariants){const s=n.parent?Cb(n.parent)||{}:{};return n.props.initial!==void 0&&(s.initial=n.props.initial),s}const a={};for(let s=0;s<TE;s++){const l=Bf[s],c=n.props[l];(as(c)||c===!1)&&(a[l]=c)}return a}function Nb(n,a){if(!Array.isArray(a))return!1;const s=a.length;if(s!==n.length)return!1;for(let l=0;l<s;l++)if(a[l]!==n[l])return!1;return!0}const CE=[...Vf].reverse(),NE=Vf.length;function DE(n){return a=>Promise.all(a.map(({animation:s,options:l})=>C2(n,s,l)))}function AE(n){let a=DE(n),s=Py(),l=!0,c=!1;const h=g=>(v,x)=>{var E;const b=Kr(n,x,g==="exit"?(E=n.presenceContext)==null?void 0:E.custom:void 0);if(b){const{transition:w,transitionEnd:N,...T}=b;v={...v,...T,...N}}return v};function d(g){a=g(n)}function m(g){const{props:v}=n,x=Cb(n.parent)||{},b=[],E=new Set;let w={},N=1/0;for(let A=0;A<NE;A++){const k=CE[A],_=s[k],z=v[k]!==void 0?v[k]:x[k],U=as(z),L=k===g?_.isActive:null;L===!1&&(N=A);let D=z===x[k]&&z!==v[k]&&U;if(D&&(l||c)&&n.manuallyAnimateOnMount&&(D=!1),_.protectedKeys={...w},!_.isActive&&L===null||!z&&!_.prevProp||Do(z)||typeof z=="boolean")continue;if(k==="exit"&&_.isActive&&L!==!0){_.prevResolvedValues&&(w={...w,..._.prevResolvedValues});continue}const H=kE(_.prevProp,z);let M=H||k===g&&_.isActive&&!D&&U||A>N&&U,O=!1;const $=Array.isArray(z)?z:[z];let Z=$.reduce(h(k),{});L===!1&&(Z={});const{prevResolvedValues:ue={}}=_,de={...ue,...Z},ye=Q=>{M=!0,E.has(Q)&&(O=!0,E.delete(Q)),_.needsAnimating[Q]=!0;const G=n.getValue(Q);G&&(G.liveStyle=!1)};for(const Q in de){const G=Z[Q],ae=ue[Q];if(w.hasOwnProperty(Q))continue;let C=!1;Ld(G)&&Ld(ae)?C=!Nb(G,ae)||H:C=G!==ae,C?G!=null?ye(Q):E.add(Q):G!==void 0&&E.has(Q)?ye(Q):_.protectedKeys[Q]=!0}_.prevProp=z,_.prevResolvedValues=Z,_.isActive&&(w={...w,...Z}),(l||c)&&n.blockInitialAnimation&&(M=!1);const Y=D&&H;M&&(!Y||O)&&b.push(...$.map(Q=>{const G={type:k};if(typeof Q=="string"&&(l||c)&&!Y&&n.manuallyAnimateOnMount&&n.parent){const{parent:ae}=n,C=Kr(ae,Q);if(ae.enteringChildren&&C){const{delayChildren:V}=C.transition||{};G.delay=Qx(ae.enteringChildren,n,V)}}return{animation:Q,options:G}}))}if(E.size){const A={};if(typeof v.initial!="boolean"){const k=Kr(n,Array.isArray(v.initial)?v.initial[0]:v.initial);k&&k.transition&&(A.transition=k.transition)}E.forEach(k=>{const _=n.getBaseTarget(k),z=n.getValue(k);z&&(z.liveStyle=!0),A[k]=_??null}),b.push({animation:A})}let T=!!b.length;return l&&(v.initial===!1||v.initial===v.animate)&&!n.manuallyAnimateOnMount&&(T=!1),l=!1,c=!1,T?a(b):Promise.resolve()}function p(g,v){var b;if(s[g].isActive===v)return Promise.resolve();(b=n.variantChildren)==null||b.forEach(E=>{var w;return(w=E.animationState)==null?void 0:w.setActive(g,v)}),s[g].isActive=v;const x=m(g);for(const E in s)s[E].protectedKeys={};return x}return{animateChanges:m,setActive:p,setAnimateFunction:d,getState:()=>s,reset:()=>{s=Py(),c=!0}}}function kE(n,a){return typeof a=="string"?a!==n:Array.isArray(a)?!Nb(a,n):!1}function Pr(n=!1){return{isActive:n,protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}function Py(){return{animate:Pr(!0),whileInView:Pr(),whileHover:Pr(),whileTap:Pr(),whileDrag:Pr(),whileFocus:Pr(),exit:Pr()}}function $d(n,a){n.min=a.min,n.max=a.max}function un(n,a){$d(n.x,a.x),$d(n.y,a.y)}function Gy(n,a){n.translate=a.translate,n.scale=a.scale,n.originPoint=a.originPoint,n.origin=a.origin}const Db=1e-4,ME=1-Db,RE=1+Db,Ab=.01,OE=0-Ab,zE=0+Ab;function wt(n){return n.max-n.min}function _E(n,a,s){return Math.abs(n-a)<=s}function Fy(n,a,s,l=.5){n.origin=l,n.originPoint=Ge(a.min,a.max,n.origin),n.scale=wt(s)/wt(a),n.translate=Ge(s.min,s.max,n.origin)-n.originPoint,(n.scale>=ME&&n.scale<=RE||isNaN(n.scale))&&(n.scale=1),(n.translate>=OE&&n.translate<=zE||isNaN(n.translate))&&(n.translate=0)}function Ii(n,a,s,l){Fy(n.x,a.x,s.x,l?l.originX:void 0),Fy(n.y,a.y,s.y,l?l.originY:void 0)}function Xy(n,a,s,l=0){const c=l?Ge(s.min,s.max,l):s.min;n.min=c+a.min,n.max=n.min+wt(a)}function VE(n,a,s,l){Xy(n.x,a.x,s.x,l==null?void 0:l.x),Xy(n.y,a.y,s.y,l==null?void 0:l.y)}function $y(n,a,s,l=0){const c=l?Ge(s.min,s.max,l):s.min;n.min=a.min-c,n.max=n.min+wt(a)}function xo(n,a,s,l){$y(n.x,a.x,s.x,l==null?void 0:l.x),$y(n.y,a.y,s.y,l==null?void 0:l.y)}function Ky(n,a,s,l,c){return n-=a,n=vo(n,1/s,l),c!==void 0&&(n=vo(n,1/c,l)),n}function BE(n,a=0,s=1,l=.5,c,h=n,d=n){if(wn.test(a)&&(a=parseFloat(a),a=Ge(d.min,d.max,a/100)-d.min),typeof a!="number")return;let m=Ge(h.min,h.max,l);n===h&&(m-=a),n.min=Ky(n.min,a,s,m,c),n.max=Ky(n.max,a,s,m,c)}function Zy(n,a,[s,l,c],h,d){BE(n,a[s],a[l],a[c],a.scale,h,d)}const LE=["x","scaleX","originX"],UE=["y","scaleY","originY"];function Qy(n,a,s,l){Zy(n.x,a,LE,s?s.x:void 0,l?l.x:void 0),Zy(n.y,a,UE,s?s.y:void 0,l?l.y:void 0)}function Jy(n){return n.translate===0&&n.scale===1}function kb(n){return Jy(n.x)&&Jy(n.y)}function Wy(n,a){return n.min===a.min&&n.max===a.max}function HE(n,a){return Wy(n.x,a.x)&&Wy(n.y,a.y)}function Iy(n,a){return Math.round(n.min)===Math.round(a.min)&&Math.round(n.max)===Math.round(a.max)}function Mb(n,a){return Iy(n.x,a.x)&&Iy(n.y,a.y)}function ev(n){return wt(n.x)/wt(n.y)}function tv(n,a){return n.translate===a.translate&&n.scale===a.scale&&n.originPoint===a.originPoint}function bn(n){return[n("x"),n("y")]}function qE(n,a,s){let l="";const c=n.x.translate/a.x,h=n.y.translate/a.y,d=(s==null?void 0:s.z)||0;if((c||h||d)&&(l=`translate3d(${c}px, ${h}px, ${d}px) `),(a.x!==1||a.y!==1)&&(l+=`scale(${1/a.x}, ${1/a.y}) `),s){const{transformPerspective:g,rotate:v,pathRotation:x,rotateX:b,rotateY:E,skewX:w,skewY:N}=s;g&&(l=`perspective(${g}px) ${l}`),v&&(l+=`rotate(${v}deg) `),x&&(l+=`rotate(${x}deg) `),b&&(l+=`rotateX(${b}deg) `),E&&(l+=`rotateY(${E}deg) `),w&&(l+=`skewX(${w}deg) `),N&&(l+=`skewY(${N}deg) `)}const m=n.x.scale*a.x,p=n.y.scale*a.y;return(m!==1||p!==1)&&(l+=`scale(${m}, ${p})`),l||"none"}const YE=Rf.length,nv=n=>typeof n=="string"?parseFloat(n):n,rv=n=>typeof n=="number"||ge.test(n);function PE(n,a,s,l,c,h){c?(n.opacity=Ge(0,s.opacity??1,GE(l)),n.opacityExit=Ge(a.opacity??1,0,FE(l))):h&&(n.opacity=Ge(a.opacity??1,s.opacity??1,l));for(let d=0;d<YE;d++){const m=Rf[d];let p=av(a,m),g=av(s,m);if(p===void 0&&g===void 0)continue;p||(p=0),g||(g=0),p===0||g===0||rv(p)===rv(g)?(n[m]=Math.max(Ge(nv(p),nv(g),l),0),(wn.test(g)||wn.test(p))&&(n[m]+="%")):n[m]=g}(a.rotate||s.rotate)&&(n.rotate=Ge(a.rotate||0,s.rotate||0,l))}function av(n,a){return n[a]!==void 0?n[a]:n.borderRadius}const GE=Rb(0,.5,Ex),FE=Rb(.5,.95,rn);function Rb(n,a,s){return l=>l<n?0:l>a?1:s(ns(n,a,l))}function XE(n,a,s){const l=xt(n)?n:Fa(n);return l.start(Af("",l,a,s)),l.animation}function is(n,a,s,l={passive:!0}){return n.addEventListener(a,s,l),()=>n.removeEventListener(a,s,l)}const $E=(n,a)=>n.depth-a.depth;class KE{constructor(){this.children=[],this.isDirty=!1}add(a){yf(this.children,a),this.isDirty=!0}remove(a){co(this.children,a),this.isDirty=!0}forEach(a){this.isDirty&&this.children.sort($E),this.isDirty=!1,this.children.forEach(a)}}function ZE(n,a){const s=jt.now(),l=({timestamp:c})=>{const h=c-s;h>=a&&(jr(l),n(h-a))};return Fe.setup(l,!0),()=>jr(l)}function ao(n){return xt(n)?n.get():n}class QE{constructor(){this.members=[]}add(a){yf(this.members,a);for(let s=this.members.length-1;s>=0;s--){const l=this.members[s];if(l===a||l===this.lead||l===this.prevLead)continue;const c=l.instance;(!c||c.isConnected===!1)&&!l.snapshot&&(co(this.members,l),l.unmount())}a.scheduleRender()}remove(a){if(co(this.members,a),a===this.prevLead&&(this.prevLead=void 0),a===this.lead){const s=this.members[this.members.length-1];s&&this.promote(s)}}relegate(a){var s;for(let l=this.members.indexOf(a)-1;l>=0;l--){const c=this.members[l];if(c.isPresent!==!1&&((s=c.instance)==null?void 0:s.isConnected)!==!1)return this.promote(c),!0}return!1}promote(a,s){var c;const l=this.lead;if(a!==l&&(this.prevLead=l,this.lead=a,a.show(),l)){l.updateSnapshot(),a.scheduleRender();const{layoutDependency:h}=l.options,{layoutDependency:d}=a.options;(h===void 0||h!==d)&&(a.resumeFrom=l,s&&(l.preserveOpacity=!0),l.snapshot&&(a.snapshot=l.snapshot,a.snapshot.latestValues=l.animationValues||l.latestValues),(c=a.root)!=null&&c.isUpdating&&(a.isLayoutDirty=!0)),a.options.crossfade===!1&&l.hide()}}exitAnimationComplete(){this.members.forEach(a=>{var s,l,c,h,d;(l=(s=a.options).onExitComplete)==null||l.call(s),(d=(c=a.resumingFrom)==null?void 0:(h=c.options).onExitComplete)==null||d.call(h)})}scheduleRender(){this.members.forEach(a=>a.instance&&a.scheduleRender(!1))}removeLeadSnapshot(){var a;(a=this.lead)!=null&&a.snapshot&&(this.lead.snapshot=void 0)}}const io={hasAnimatedSinceResize:!0,hasEverUpdated:!1},ld=["","X","Y","Z"],JE=1e3;let WE=0;function od(n,a,s,l){const{latestValues:c}=a;c[n]&&(s[n]=c[n],a.setStaticValue(n,0),l&&(l[n]=0))}function Ob(n){if(n.hasCheckedOptimisedAppear=!0,n.root===n)return;const{visualElement:a}=n.options;if(!a)return;const s=tb(a);if(window.MotionHasOptimisedAnimation(s,"transform")){const{layout:c,layoutId:h}=n.options;window.MotionCancelOptimisedAnimation(s,"transform",Fe,!(c||h))}const{parent:l}=n;l&&!l.hasCheckedOptimisedAppear&&Ob(l)}function zb({attachResizeListener:n,defaultParent:a,measureScroll:s,checkIsScrollRoot:l,resetTransform:c}){return class{constructor(d={},m=a==null?void 0:a()){this.id=WE++,this.animationId=0,this.animationCommitId=0,this.children=new Set,this.options={},this.isTreeAnimating=!1,this.isAnimationBlocked=!1,this.isLayoutDirty=!1,this.isProjectionDirty=!1,this.isSharedProjectionDirty=!1,this.isTransformDirty=!1,this.updateManuallyBlocked=!1,this.updateBlockedByResize=!1,this.isUpdating=!1,this.isSVG=!1,this.needsReset=!1,this.shouldResetTransform=!1,this.hasCheckedOptimisedAppear=!1,this.treeScale={x:1,y:1},this.eventHandlers=new Map,this.hasTreeAnimated=!1,this.layoutVersion=0,this.updateScheduled=!1,this.scheduleUpdate=()=>this.update(),this.projectionUpdateScheduled=!1,this.checkUpdateFailed=()=>{this.isUpdating&&(this.isUpdating=!1,this.clearAllSnapshots())},this.updateProjection=()=>{this.projectionUpdateScheduled=!1,this.nodes.forEach(tT),this.nodes.forEach(lT),this.nodes.forEach(oT),this.nodes.forEach(nT)},this.resolvedRelativeTargetAt=0,this.linkedParentVersion=0,this.hasProjected=!1,this.isVisible=!0,this.animationProgress=0,this.sharedNodes=new Map,this.latestValues=d,this.root=m?m.root||m:this,this.path=m?[...m.path,m]:[],this.parent=m,this.depth=m?m.depth+1:0;for(let p=0;p<this.path.length;p++)this.path[p].shouldResetTransform=!0;this.root===this&&(this.nodes=new KE)}addEventListener(d,m){return this.eventHandlers.has(d)||this.eventHandlers.set(d,new vf),this.eventHandlers.get(d).add(m)}notifyListeners(d,...m){const p=this.eventHandlers.get(d);p&&p.notify(...m)}hasListeners(d){return this.eventHandlers.has(d)}mount(d){if(this.instance)return;this.isSVG=_f(d)&&!tE(d),this.instance=d;const{layoutId:m,layout:p,visualElement:g}=this.options;if(g&&!g.current&&g.mount(d),this.root.nodes.add(this),this.parent&&this.parent.children.add(this),this.root.hasTreeAnimated&&(p||m)&&(this.isLayoutDirty=!0),n){let v,x=0;const b=()=>this.root.updateBlockedByResize=!1;Fe.read(()=>{x=window.innerWidth}),n(d,()=>{const E=window.innerWidth;E!==x&&(x=E,this.root.updateBlockedByResize=!0,v&&v(),v=ZE(b,250),io.hasAnimatedSinceResize&&(io.hasAnimatedSinceResize=!1,this.nodes.forEach(lv)))})}m&&this.root.registerSharedNode(m,this),this.options.animate!==!1&&g&&(m||p)&&this.addEventListener("didUpdate",({delta:v,hasLayoutChanged:x,hasRelativeLayoutChanged:b,layout:E})=>{if(this.isTreeAnimationBlocked()){this.target=void 0,this.relativeTarget=void 0;return}const w=this.options.transition||g.getDefaultTransition()||hT,{onLayoutAnimationStart:N,onLayoutAnimationComplete:T}=g.getProps(),A=!this.targetLayout||!Mb(this.targetLayout,E),k=!x&&b;if(this.options.layoutRoot||this.resumeFrom||k||x&&(A||!this.currentAnimation)){this.resumeFrom&&(this.resumingFrom=this.resumeFrom,this.resumingFrom.resumingFrom=void 0);const _={...Df(w,"layout"),onPlay:N,onComplete:T};(g.shouldReduceMotion||this.options.layoutRoot)&&(_.delay=0,_.type=!1),this.startAnimation(_),this.setAnimationOrigin(v,k,_.path)}else x||lv(this),this.isLead()&&this.options.onExitComplete&&this.options.onExitComplete();this.targetLayout=E})}unmount(){this.options.layoutId&&this.willUpdate(),this.root.nodes.remove(this);const d=this.getStack();d&&d.remove(this),this.parent&&this.parent.children.delete(this),this.instance=void 0,this.eventHandlers.clear(),jr(this.updateProjection)}blockUpdate(){this.updateManuallyBlocked=!0}unblockUpdate(){this.updateManuallyBlocked=!1}isUpdateBlocked(){return this.updateManuallyBlocked||this.updateBlockedByResize}isTreeAnimationBlocked(){return this.isAnimationBlocked||this.parent&&this.parent.isTreeAnimationBlocked()||!1}startUpdate(){this.isUpdateBlocked()||(this.isUpdating=!0,this.nodes&&this.nodes.forEach(cT),this.animationId++)}getTransformTemplate(){const{visualElement:d}=this.options;return d&&d.getProps().transformTemplate}willUpdate(d=!0){if(this.root.hasTreeAnimated=!0,this.root.isUpdateBlocked()){this.options.onExitComplete&&this.options.onExitComplete();return}if(window.MotionCancelOptimisedAnimation&&!this.hasCheckedOptimisedAppear&&Ob(this),!this.root.isUpdating&&this.root.startUpdate(),this.isLayoutDirty)return;this.isLayoutDirty=!0;for(let v=0;v<this.path.length;v++){const x=this.path[v];x.shouldResetTransform=!0,(typeof x.latestValues.x=="string"||typeof x.latestValues.y=="string")&&(x.isLayoutDirty=!0),x.updateScroll("snapshot"),x.options.layoutRoot&&x.willUpdate(!1)}const{layoutId:m,layout:p}=this.options;if(m===void 0&&!p)return;const g=this.getTransformTemplate();this.prevTransformTemplateValue=g?g(this.latestValues,""):void 0,this.updateSnapshot(),d&&this.notifyListeners("willUpdate")}update(){if(this.updateScheduled=!1,this.isUpdateBlocked()){const p=this.updateBlockedByResize;this.unblockUpdate(),this.updateBlockedByResize=!1,this.clearAllSnapshots(),p&&this.nodes.forEach(aT),this.nodes.forEach(iv);return}if(this.animationId<=this.animationCommitId){this.nodes.forEach(sv);return}this.animationCommitId=this.animationId,this.isUpdating?(this.isUpdating=!1,this.nodes.forEach(iT),this.nodes.forEach(sT),this.nodes.forEach(IE),this.nodes.forEach(eT)):this.nodes.forEach(sv),this.clearAllSnapshots();const m=jt.now();vt.delta=En(0,1e3/60,m-vt.timestamp),vt.timestamp=m,vt.isProcessing=!0,Iu.update.process(vt),Iu.preRender.process(vt),Iu.render.process(vt),vt.isProcessing=!1}didUpdate(){this.updateScheduled||(this.updateScheduled=!0,Of.read(this.scheduleUpdate))}clearAllSnapshots(){this.nodes.forEach(rT),this.sharedNodes.forEach(uT)}scheduleUpdateProjection(){this.projectionUpdateScheduled||(this.projectionUpdateScheduled=!0,Fe.preRender(this.updateProjection,!1,!0))}scheduleCheckAfterUnmount(){Fe.postRender(()=>{this.isLayoutDirty?this.root.didUpdate():this.root.checkUpdateFailed()})}updateSnapshot(){this.snapshot||!this.instance||(this.snapshot=this.measure(),this.snapshot&&!wt(this.snapshot.measuredBox.x)&&!wt(this.snapshot.measuredBox.y)&&(this.snapshot=void 0))}updateLayout(){if(!this.instance||(this.updateScroll(),!(this.options.alwaysMeasureLayout&&this.isLead())&&!this.isLayoutDirty))return;if(this.resumeFrom&&!this.resumeFrom.instance)for(let p=0;p<this.path.length;p++)this.path[p].updateScroll();const d=this.layout;this.layout=this.measure(!1),this.layoutVersion++,this.layoutCorrected||(this.layoutCorrected=ot()),this.isLayoutDirty=!1,this.projectionDelta=void 0,this.notifyListeners("measure",this.layout.layoutBox);const{visualElement:m}=this.options;m&&m.notify("LayoutMeasure",this.layout.layoutBox,d?d.layoutBox:void 0)}updateScroll(d="measure"){let m=!!(this.options.layoutScroll&&this.instance);if(this.scroll&&this.scroll.animationId===this.root.animationId&&this.scroll.phase===d&&(m=!1),m&&this.instance){const p=l(this.instance);this.scroll={animationId:this.root.animationId,phase:d,isRoot:p,offset:s(this.instance),wasRoot:this.scroll?this.scroll.isRoot:p}}}resetTransform(){if(!c)return;const d=this.isLayoutDirty||this.shouldResetTransform||this.options.alwaysMeasureLayout,m=this.projectionDelta&&!kb(this.projectionDelta),p=this.getTransformTemplate(),g=p?p(this.latestValues,""):void 0,v=g!==this.prevTransformTemplateValue;d&&this.instance&&(m||Gr(this.latestValues)||v)&&(c(this.instance,g),this.shouldResetTransform=!1,this.scheduleRender())}measure(d=!0){const m=this.measurePageBox();let p=this.removeElementScroll(m);return d&&(p=this.removeTransform(p)),mT(p),{animationId:this.root.animationId,measuredBox:m,layoutBox:p,latestValues:{},source:this.id}}measurePageBox(){var g;const{visualElement:d}=this.options;if(!d)return ot();const m=d.measureViewportBox();if(!(((g=this.scroll)==null?void 0:g.wasRoot)||this.path.some(pT))){const{scroll:v}=this.root;v&&(Sn(m.x,v.offset.x),Sn(m.y,v.offset.y))}return m}removeElementScroll(d){var p;const m=ot();if(un(m,d),(p=this.scroll)!=null&&p.wasRoot)return m;for(let g=0;g<this.path.length;g++){const v=this.path[g],{scroll:x,options:b}=v;v!==this.root&&x&&b.layoutScroll&&(x.wasRoot&&un(m,d),Sn(m.x,x.offset.x),Sn(m.y,x.offset.y))}return m}applyTransform(d,m=!1,p){var v,x;const g=p||ot();un(g,d);for(let b=0;b<this.path.length;b++){const E=this.path[b];!m&&E.options.layoutScroll&&E.scroll&&E!==E.root&&(Sn(g.x,-E.scroll.offset.x),Sn(g.y,-E.scroll.offset.y)),Gr(E.latestValues)&&ro(g,E.latestValues,(v=E.layout)==null?void 0:v.layoutBox)}return Gr(this.latestValues)&&ro(g,this.latestValues,(x=this.layout)==null?void 0:x.layoutBox),g}removeTransform(d){var p;const m=ot();un(m,d);for(let g=0;g<this.path.length;g++){const v=this.path[g];if(!Gr(v.latestValues))continue;let x;v.instance&&(Gd(v.latestValues)&&v.updateSnapshot(),x=ot(),un(x,v.measurePageBox())),Qy(m,v.latestValues,(p=v.snapshot)==null?void 0:p.layoutBox,x)}return Gr(this.latestValues)&&Qy(m,this.latestValues),m}setTargetDelta(d){this.targetDelta=d,this.root.scheduleUpdateProjection(),this.isProjectionDirty=!0}setOptions(d){this.options={...this.options,...d,crossfade:d.crossfade!==void 0?d.crossfade:!0}}clearMeasurements(){this.scroll=void 0,this.layout=void 0,this.snapshot=void 0,this.prevTransformTemplateValue=void 0,this.targetDelta=void 0,this.target=void 0,this.isLayoutDirty=!1}forceRelativeParentToResolveTarget(){this.relativeParent&&this.relativeParent.resolvedRelativeTargetAt!==vt.timestamp&&this.relativeParent.resolveTargetDelta(!0)}resolveTargetDelta(d=!1){var E;const m=this.getLead();this.isProjectionDirty||(this.isProjectionDirty=m.isProjectionDirty),this.isTransformDirty||(this.isTransformDirty=m.isTransformDirty),this.isSharedProjectionDirty||(this.isSharedProjectionDirty=m.isSharedProjectionDirty);const p=!!this.resumingFrom||this!==m;if(!(d||p&&this.isSharedProjectionDirty||this.isProjectionDirty||(E=this.parent)!=null&&E.isProjectionDirty||this.attemptToResolveRelativeTarget||this.root.updateBlockedByResize))return;const{layout:v,layoutId:x}=this.options;if(!this.layout||!(v||x))return;this.resolvedRelativeTargetAt=vt.timestamp;const b=this.getClosestProjectingParent();b&&this.linkedParentVersion!==b.layoutVersion&&!b.options.layoutRoot&&this.removeRelativeTarget(),!this.targetDelta&&!this.relativeTarget&&(this.options.layoutAnchor!==!1&&b&&b.layout?this.createRelativeTarget(b,this.layout.layoutBox,b.layout.layoutBox):this.removeRelativeTarget()),!(!this.relativeTarget&&!this.targetDelta)&&(this.target||(this.target=ot(),this.targetWithTransforms=ot()),this.relativeTarget&&this.relativeTargetOrigin&&this.relativeParent&&this.relativeParent.target?(this.forceRelativeParentToResolveTarget(),VE(this.target,this.relativeTarget,this.relativeParent.target,this.options.layoutAnchor||void 0)):this.targetDelta?(this.resumingFrom?this.applyTransform(this.layout.layoutBox,!1,this.target):un(this.target,this.layout.layoutBox),vb(this.target,this.targetDelta)):un(this.target,this.layout.layoutBox),this.attemptToResolveRelativeTarget&&(this.attemptToResolveRelativeTarget=!1,this.options.layoutAnchor!==!1&&b&&!!b.resumingFrom==!!this.resumingFrom&&!b.options.layoutScroll&&b.target&&this.animationProgress!==1?this.createRelativeTarget(b,this.target,b.target):this.relativeParent=this.relativeTarget=void 0))}getClosestProjectingParent(){if(!(!this.parent||Gd(this.parent.latestValues)||yb(this.parent.latestValues)))return this.parent.isProjecting()?this.parent:this.parent.getClosestProjectingParent()}isProjecting(){return!!((this.relativeTarget||this.targetDelta||this.options.layoutRoot)&&this.layout)}createRelativeTarget(d,m,p){this.relativeParent=d,this.linkedParentVersion=d.layoutVersion,this.forceRelativeParentToResolveTarget(),this.relativeTarget=ot(),this.relativeTargetOrigin=ot(),xo(this.relativeTargetOrigin,m,p,this.options.layoutAnchor||void 0),un(this.relativeTarget,this.relativeTargetOrigin)}removeRelativeTarget(){this.relativeParent=this.relativeTarget=void 0}calcProjection(){var w;const d=this.getLead(),m=!!this.resumingFrom||this!==d;let p=!0;if((this.isProjectionDirty||(w=this.parent)!=null&&w.isProjectionDirty)&&(p=!1),m&&(this.isSharedProjectionDirty||this.isTransformDirty)&&(p=!1),this.resolvedRelativeTargetAt===vt.timestamp&&(p=!1),p)return;const{layout:g,layoutId:v}=this.options;if(this.isTreeAnimating=!!(this.parent&&this.parent.isTreeAnimating||this.currentAnimation||this.pendingAnimation),this.isTreeAnimating||(this.targetDelta=this.relativeTarget=void 0),!this.layout||!(g||v))return;un(this.layoutCorrected,this.layout.layoutBox);const x=this.treeScale.x,b=this.treeScale.y;dE(this.layoutCorrected,this.treeScale,this.path,m),d.layout&&!d.target&&(this.treeScale.x!==1||this.treeScale.y!==1)&&(d.target=d.layout.layoutBox,d.targetWithTransforms=ot());const{target:E}=d;if(!E){this.prevProjectionDelta&&(this.createProjectionDeltas(),this.scheduleRender());return}!this.projectionDelta||!this.prevProjectionDelta?this.createProjectionDeltas():(Gy(this.prevProjectionDelta.x,this.projectionDelta.x),Gy(this.prevProjectionDelta.y,this.projectionDelta.y)),Ii(this.projectionDelta,this.layoutCorrected,E,this.latestValues),(this.treeScale.x!==x||this.treeScale.y!==b||!tv(this.projectionDelta.x,this.prevProjectionDelta.x)||!tv(this.projectionDelta.y,this.prevProjectionDelta.y))&&(this.hasProjected=!0,this.scheduleRender(),this.notifyListeners("projectionUpdate",E))}hide(){this.isVisible=!1}show(){this.isVisible=!0}scheduleRender(d=!0){var m;if((m=this.options.visualElement)==null||m.scheduleRender(),d){const p=this.getStack();p&&p.scheduleRender()}this.resumingFrom&&!this.resumingFrom.instance&&(this.resumingFrom=void 0)}createProjectionDeltas(){this.prevProjectionDelta=Ya(),this.projectionDelta=Ya(),this.projectionDeltaWithTransform=Ya()}setAnimationOrigin(d,m=!1,p){const g=this.snapshot,v=g?g.latestValues:{},x={...this.latestValues},b=Ya();(!this.relativeParent||!this.relativeParent.options.layoutRoot)&&(this.relativeTarget=this.relativeTargetOrigin=void 0),this.attemptToResolveRelativeTarget=!m;const E=ot(),w=g?g.source:void 0,N=this.layout?this.layout.source:void 0,T=w!==N,A=this.getStack(),k=!A||A.members.length<=1,_=!!(T&&!k&&this.options.crossfade===!0&&!this.path.some(fT));this.animationProgress=0;let z;const U=p==null?void 0:p.interpolateProjection(d);this.mixTargetDelta=L=>{const D=L/1e3,H=U==null?void 0:U(D);H?(b.x.translate=H.x,b.x.scale=Ge(d.x.scale,1,D),b.x.origin=d.x.origin,b.x.originPoint=d.x.originPoint,b.y.translate=H.y,b.y.scale=Ge(d.y.scale,1,D),b.y.origin=d.y.origin,b.y.originPoint=d.y.originPoint):(ov(b.x,d.x,D),ov(b.y,d.y,D)),this.setTargetDelta(b),this.relativeTarget&&this.relativeTargetOrigin&&this.layout&&this.relativeParent&&this.relativeParent.layout&&(xo(E,this.layout.layoutBox,this.relativeParent.layout.layoutBox,this.options.layoutAnchor||void 0),dT(this.relativeTarget,this.relativeTargetOrigin,E,D),z&&HE(this.relativeTarget,z)&&(this.isProjectionDirty=!1),z||(z=ot()),un(z,this.relativeTarget)),T&&(this.animationValues=x,PE(x,v,this.latestValues,D,_,k)),H&&H.rotate!==void 0&&(this.animationValues||(this.animationValues=x),this.animationValues.pathRotation=H.rotate),this.root.scheduleUpdateProjection(),this.scheduleRender(),this.animationProgress=D},this.mixTargetDelta(this.options.layoutRoot?1e3:0)}startAnimation(d){var m,p,g;this.notifyListeners("animationStart"),(m=this.currentAnimation)==null||m.stop(),(g=(p=this.resumingFrom)==null?void 0:p.currentAnimation)==null||g.stop(),this.pendingAnimation&&(jr(this.pendingAnimation),this.pendingAnimation=void 0),this.pendingAnimation=Fe.update(()=>{io.hasAnimatedSinceResize=!0,this.motionValue||(this.motionValue=Fa(0)),this.motionValue.jump(0,!1),this.currentAnimation=XE(this.motionValue,[0,1e3],{...d,velocity:0,isSync:!0,onUpdate:v=>{this.mixTargetDelta(v),d.onUpdate&&d.onUpdate(v)},onComplete:()=>{d.onComplete&&d.onComplete(),this.completeAnimation()}}),this.resumingFrom&&(this.resumingFrom.currentAnimation=this.currentAnimation),this.pendingAnimation=void 0})}completeAnimation(){this.resumingFrom&&(this.resumingFrom.currentAnimation=void 0,this.resumingFrom.preserveOpacity=void 0);const d=this.getStack();d&&d.exitAnimationComplete(),this.resumingFrom=this.currentAnimation=this.animationValues=void 0,this.notifyListeners("animationComplete")}finishAnimation(){this.currentAnimation&&(this.mixTargetDelta&&this.mixTargetDelta(JE),this.currentAnimation.stop()),this.completeAnimation()}applyTransformsToTarget(){const d=this.getLead();let{targetWithTransforms:m,target:p,layout:g,latestValues:v}=d;if(!(!m||!p||!g)){if(this!==d&&this.layout&&g&&_b(this.options.animationType,this.layout.layoutBox,g.layoutBox)){p=this.target||ot();const x=wt(this.layout.layoutBox.x);p.x.min=d.target.x.min,p.x.max=p.x.min+x;const b=wt(this.layout.layoutBox.y);p.y.min=d.target.y.min,p.y.max=p.y.min+b}un(m,p),ro(m,v),Ii(this.projectionDeltaWithTransform,this.layoutCorrected,m,v)}}registerSharedNode(d,m){this.sharedNodes.has(d)||this.sharedNodes.set(d,new QE),this.sharedNodes.get(d).add(m);const g=m.options.initialPromotionConfig;m.promote({transition:g?g.transition:void 0,preserveFollowOpacity:g&&g.shouldPreserveFollowOpacity?g.shouldPreserveFollowOpacity(m):void 0})}isLead(){const d=this.getStack();return d?d.lead===this:!0}getLead(){var m;const{layoutId:d}=this.options;return d?((m=this.getStack())==null?void 0:m.lead)||this:this}getPrevLead(){var m;const{layoutId:d}=this.options;return d?(m=this.getStack())==null?void 0:m.prevLead:void 0}getStack(){const{layoutId:d}=this.options;if(d)return this.root.sharedNodes.get(d)}promote({needsReset:d,transition:m,preserveFollowOpacity:p}={}){const g=this.getStack();g&&g.promote(this,p),d&&(this.projectionDelta=void 0,this.needsReset=!0),m&&this.setOptions({transition:m})}relegate(){const d=this.getStack();return d?d.relegate(this):!1}resetSkewAndRotation(){const{visualElement:d}=this.options;if(!d)return;let m=!1;const{latestValues:p}=d;if((p.z||p.rotate||p.rotateX||p.rotateY||p.rotateZ||p.skewX||p.skewY)&&(m=!0),!m)return;const g={};p.z&&od("z",d,g,this.animationValues);for(let v=0;v<ld.length;v++)od(`rotate${ld[v]}`,d,g,this.animationValues),od(`skew${ld[v]}`,d,g,this.animationValues);d.render();for(const v in g)d.setStaticValue(v,g[v]),this.animationValues&&(this.animationValues[v]=g[v]);d.scheduleRender()}applyProjectionStyles(d,m){if(!this.instance||this.isSVG)return;if(!this.isVisible){d.visibility="hidden";return}const p=this.getTransformTemplate();if(this.needsReset){this.needsReset=!1,d.visibility="",d.opacity="",d.pointerEvents=ao(m==null?void 0:m.pointerEvents)||"",d.transform=p?p(this.latestValues,""):"none";return}const g=this.getLead();if(!this.projectionDelta||!this.layout||!g.target){this.options.layoutId&&(d.opacity=this.latestValues.opacity!==void 0?this.latestValues.opacity:1,d.pointerEvents=ao(m==null?void 0:m.pointerEvents)||""),this.hasProjected&&!Gr(this.latestValues)&&(d.transform=p?p({},""):"none",this.hasProjected=!1);return}d.visibility="";const v=g.animationValues||g.latestValues;this.applyTransformsToTarget();let x=qE(this.projectionDeltaWithTransform,this.treeScale,v);p&&(x=p(v,x)),d.transform=x;const{x:b,y:E}=this.projectionDelta;d.transformOrigin=`${b.origin*100}% ${E.origin*100}% 0`,g.animationValues?d.opacity=g===this?v.opacity??this.latestValues.opacity??1:this.preserveOpacity?this.latestValues.opacity:v.opacityExit:d.opacity=g===this?v.opacity!==void 0?v.opacity:"":v.opacityExit!==void 0?v.opacityExit:0;for(const w in Xd){if(v[w]===void 0)continue;const{correct:N,applyTo:T,isCSSVariable:A}=Xd[w],k=x==="none"?v[w]:N(v[w],g);if(T){const _=T.length;for(let z=0;z<_;z++)d[T[z]]=k}else A?this.options.visualElement.renderState.vars[w]=k:d[w]=k}this.options.layoutId&&(d.pointerEvents=g===this?ao(m==null?void 0:m.pointerEvents)||"":"none")}clearSnapshot(){this.resumeFrom=this.snapshot=void 0}resetTree(){this.root.nodes.forEach(d=>{var m;return(m=d.currentAnimation)==null?void 0:m.stop()}),this.root.nodes.forEach(iv),this.root.sharedNodes.clear()}}}function IE(n){n.updateLayout()}function eT(n){var s;const a=((s=n.resumeFrom)==null?void 0:s.snapshot)||n.snapshot;if(n.isLead()&&n.layout&&a&&n.hasListeners("didUpdate")){const{layoutBox:l,measuredBox:c}=n.layout,{animationType:h}=n.options,d=a.source!==n.layout.source;if(h==="size")bn(x=>{const b=d?a.measuredBox[x]:a.layoutBox[x],E=wt(b);b.min=l[x].min,b.max=b.min+E});else if(h==="x"||h==="y"){const x=h==="x"?"y":"x";$d(d?a.measuredBox[x]:a.layoutBox[x],l[x])}else _b(h,a.layoutBox,l)&&bn(x=>{const b=d?a.measuredBox[x]:a.layoutBox[x],E=wt(l[x]);b.max=b.min+E,n.relativeTarget&&!n.currentAnimation&&(n.isProjectionDirty=!0,n.relativeTarget[x].max=n.relativeTarget[x].min+E)});const m=Ya();Ii(m,l,a.layoutBox);const p=Ya();d?Ii(p,n.applyTransform(c,!0),a.measuredBox):Ii(p,l,a.layoutBox);const g=!kb(m);let v=!1;if(!n.resumeFrom){const x=n.getClosestProjectingParent();if(x&&!x.resumeFrom){const{snapshot:b,layout:E}=x;if(b&&E){const w=n.options.layoutAnchor||void 0,N=ot();xo(N,a.layoutBox,b.layoutBox,w);const T=ot();xo(T,l,E.layoutBox,w),Mb(N,T)||(v=!0),x.options.layoutRoot&&(n.relativeTarget=T,n.relativeTargetOrigin=N,n.relativeParent=x)}}}n.notifyListeners("didUpdate",{layout:l,snapshot:a,delta:p,layoutDelta:m,hasLayoutChanged:g,hasRelativeLayoutChanged:v})}else if(n.isLead()){const{onExitComplete:l}=n.options;l&&l()}n.options.transition=void 0}function tT(n){n.parent&&(n.isProjecting()||(n.isProjectionDirty=n.parent.isProjectionDirty),n.isSharedProjectionDirty||(n.isSharedProjectionDirty=!!(n.isProjectionDirty||n.parent.isProjectionDirty||n.parent.isSharedProjectionDirty)),n.isTransformDirty||(n.isTransformDirty=n.parent.isTransformDirty))}function nT(n){n.isProjectionDirty=n.isSharedProjectionDirty=n.isTransformDirty=!1}function rT(n){n.clearSnapshot()}function iv(n){n.clearMeasurements()}function aT(n){n.isLayoutDirty=!0,n.updateLayout()}function sv(n){n.isLayoutDirty=!1}function iT(n){n.isAnimationBlocked&&n.layout&&!n.isLayoutDirty&&(n.snapshot=n.layout,n.isLayoutDirty=!0)}function sT(n){const{visualElement:a}=n.options;a&&a.getProps().onBeforeLayoutMeasure&&a.notify("BeforeLayoutMeasure"),n.resetTransform()}function lv(n){n.finishAnimation(),n.targetDelta=n.relativeTarget=n.target=void 0,n.isProjectionDirty=!0}function lT(n){n.resolveTargetDelta()}function oT(n){n.calcProjection()}function cT(n){n.resetSkewAndRotation()}function uT(n){n.removeLeadSnapshot()}function ov(n,a,s){n.translate=Ge(a.translate,0,s),n.scale=Ge(a.scale,1,s),n.origin=a.origin,n.originPoint=a.originPoint}function cv(n,a,s,l){n.min=Ge(a.min,s.min,l),n.max=Ge(a.max,s.max,l)}function dT(n,a,s,l){cv(n.x,a.x,s.x,l),cv(n.y,a.y,s.y,l)}function fT(n){return n.animationValues&&n.animationValues.opacityExit!==void 0}const hT={duration:.45,ease:[.4,0,.1,1]},uv=n=>typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().includes(n),dv=uv("applewebkit/")&&!uv("chrome/")?Math.round:rn;function fv(n){n.min=dv(n.min),n.max=dv(n.max)}function mT(n){fv(n.x),fv(n.y)}function _b(n,a,s){return n==="position"||n==="preserve-aspect"&&!_E(ev(a),ev(s),.2)}function pT(n){var a;return n!==n.root&&((a=n.scroll)==null?void 0:a.wasRoot)}const gT=zb({attachResizeListener:(n,a)=>is(n,"resize",a),measureScroll:()=>{var n,a;return{x:document.documentElement.scrollLeft||((n=document.body)==null?void 0:n.scrollLeft)||0,y:document.documentElement.scrollTop||((a=document.body)==null?void 0:a.scrollTop)||0}},checkIsScrollRoot:()=>!0}),cd={current:void 0},Vb=zb({measureScroll:n=>({x:n.scrollLeft,y:n.scrollTop}),defaultParent:()=>{if(!cd.current){const n=new gT({});n.mount(window),n.setOptions({layoutScroll:!0}),cd.current=n}return cd.current},resetTransform:(n,a)=>{n.style.transform=a!==void 0?a:"none"},checkIsScrollRoot:n=>window.getComputedStyle(n).position==="fixed"}),qf=S.createContext({transformPagePoint:n=>n,isStatic:!1,reducedMotion:"never"});function hv(n,a){if(typeof n=="function")return n(a);n!=null&&(n.current=a)}function yT(...n){return a=>{let s=!1;const l=n.map(c=>{const h=hv(c,a);return!s&&typeof h=="function"&&(s=!0),h});if(s)return()=>{for(let c=0;c<l.length;c++){const h=l[c];typeof h=="function"?h():hv(n[c],null)}}}}function vT(...n){return S.useCallback(yT(...n),n)}class xT extends S.Component{getSnapshotBeforeUpdate(a){const s=this.props.childRef.current;if(Il(s)&&a.isPresent&&!this.props.isPresent&&this.props.pop!==!1){const l=s.offsetParent,c=Il(l)&&l.offsetWidth||0,h=Il(l)&&l.offsetHeight||0,d=getComputedStyle(s),m=this.props.sizeRef.current;m.height=parseFloat(d.height),m.width=parseFloat(d.width),m.top=s.offsetTop,m.left=s.offsetLeft,m.right=c-m.width-m.left,m.bottom=h-m.height-m.top,m.direction=d.direction}return null}componentDidUpdate(){}render(){return this.props.children}}function bT({children:n,isPresent:a,anchorX:s,anchorY:l,root:c,pop:h}){var b;const d=S.useId(),m=S.useRef(null),p=S.useRef({width:0,height:0,top:0,left:0,right:0,bottom:0,direction:"ltr"}),{nonce:g}=S.useContext(qf),v=h!==!1?((b=n.props)==null?void 0:b.ref)??(n==null?void 0:n.ref):void 0,x=vT(m,v);return S.useInsertionEffect(()=>{const{width:E,height:w,top:N,left:T,right:A,bottom:k,direction:_}=p.current;if(a||h===!1||!m.current||!E||!w)return;const z=_==="rtl",U=s==="left"?z?`right: ${A}`:`left: ${T}`:z?`left: ${T}`:`right: ${A}`,L=l==="bottom"?`bottom: ${k}`:`top: ${N}`;m.current.dataset.motionPopId=d;const D=document.createElement("style");g&&(D.nonce=g);const H=c??document.head;return H.appendChild(D),D.sheet&&D.sheet.insertRule(`
          [data-motion-pop-id="${d}"] {
            position: absolute !important;
            width: ${E}px !important;
            height: ${w}px !important;
            ${U}px !important;
            ${L}px !important;
          }
        `),()=>{var M;(M=m.current)==null||M.removeAttribute("data-motion-pop-id"),H.contains(D)&&H.removeChild(D)}},[a]),o.jsx(xT,{isPresent:a,childRef:m,sizeRef:p,pop:h,children:h===!1?n:S.cloneElement(n,{ref:x})})}const ST=({children:n,initial:a,isPresent:s,onExitComplete:l,custom:c,presenceAffectsLayout:h,mode:d,anchorX:m,anchorY:p,root:g})=>{const v=pf(jT),x=S.useId(),b=S.useRef(s),E=S.useRef(l);gf(()=>{b.current=s,E.current=l});let w=!0,N=S.useMemo(()=>(w=!1,{id:x,initial:a,isPresent:s,custom:c,onExitComplete:T=>{v.set(T,!0);for(const A of v.values())if(!A)return;l&&l()},register:T=>(v.set(T,!1),()=>{var A;v.delete(T),!b.current&&!v.size&&((A=E.current)==null||A.call(E))})}),[s,v,l]);return h&&w&&(N={...N}),S.useMemo(()=>{v.forEach((T,A)=>v.set(A,!1))},[s]),S.useEffect(()=>{!s&&!v.size&&l&&l()},[s]),n=o.jsx(bT,{pop:d==="popLayout",isPresent:s,anchorX:m,anchorY:p,root:g,children:n}),o.jsx(To.Provider,{value:N,children:n})};function jT(){return new Map}function Bb(n=!0){const a=S.useContext(To);if(a===null)return[!0,null];const{isPresent:s,onExitComplete:l,register:c}=a,h=S.useId();S.useEffect(()=>{if(n)return c(h)},[n]);const d=S.useCallback(()=>n&&l&&l(h),[h,l,n]);return!s&&l?[!1,d]:[!0]}const Hl=n=>n.key||"";function mv(n){const a=[];return S.Children.forEach(n,s=>{S.isValidElement(s)&&a.push(s)}),a}const wT=({children:n,custom:a,initial:s=!0,onExitComplete:l,presenceAffectsLayout:c=!0,mode:h="sync",propagate:d=!1,anchorX:m="left",anchorY:p="top",root:g})=>{const[v,x]=Bb(d),b=S.useMemo(()=>mv(n),[n]),E=d&&!v?[]:b.map(Hl),w=S.useRef(!0),N=S.useRef(b),T=pf(()=>new Map),A=S.useRef(new Set),[k,_]=S.useState(b),[z,U]=S.useState(b);gf(()=>{w.current=!1,N.current=b;for(let H=0;H<z.length;H++){const M=Hl(z[H]);E.includes(M)?(T.delete(M),A.current.delete(M)):T.get(M)!==!0&&T.set(M,!1)}},[z,E.length,E.join("-")]);const L=[];if(b!==k){let H=[...b];for(let M=0;M<z.length;M++){const O=z[M],$=Hl(O);E.includes($)||(H.splice(M,0,O),L.push(O))}return h==="wait"&&L.length&&(H=L),U(mv(H)),_(b),null}const{forceRender:D}=S.useContext(mf);return o.jsx(o.Fragment,{children:z.map(H=>{const M=Hl(H),O=d&&!v?!1:b===z||E.includes(M),$=()=>{if(A.current.has(M))return;if(T.has(M))A.current.add(M),T.set(M,!0);else return;let Z=!0;T.forEach(ue=>{ue||(Z=!1)}),Z&&(D==null||D(),U(N.current),d&&(x==null||x()),l&&l())};return o.jsx(ST,{isPresent:O,initial:!w.current||s?void 0:!1,custom:a,presenceAffectsLayout:c,mode:h,root:g,onExitComplete:O?void 0:$,anchorX:m,anchorY:p,children:H},M)})})},Lb=S.createContext({strict:!1}),pv={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]};let gv=!1;function ET(){if(gv)return;const n={};for(const a in pv)n[a]={isEnabled:s=>pv[a].some(l=>!!s[l])};mb(n),gv=!0}function Ub(){return ET(),lE()}function TT(n){const a=Ub();for(const s in n)a[s]={...a[s],...n[s]};mb(a)}const CT=new Set(["animate","exit","variants","initial","style","values","variants","transition","transformTemplate","custom","inherit","onBeforeLayoutMeasure","onAnimationStart","onAnimationComplete","onUpdate","onDragStart","onDrag","onDragEnd","onMeasureDragConstraints","onDirectionLock","onDragTransitionEnd","_dragX","_dragY","onHoverStart","onHoverEnd","onViewportEnter","onViewportLeave","globalTapTarget","propagate","ignoreStrict","viewport"]);function bo(n){return n.startsWith("while")||n.startsWith("drag")&&n!=="draggable"||n.startsWith("layout")||n.startsWith("onTap")||n.startsWith("onPan")||n.startsWith("onLayout")||CT.has(n)}let Hb=n=>!bo(n);function NT(n){typeof n=="function"&&(Hb=a=>a.startsWith("on")?!bo(a):n(a))}try{NT(require("@emotion/is-prop-valid").default)}catch{}function DT(n,a,s){const l={};for(const c in n)c==="values"&&typeof n.values=="object"||xt(n[c])||(Hb(c)||s===!0&&bo(c)||!a&&!bo(c)||n.draggable&&c.startsWith("onDrag"))&&(l[c]=n[c]);return l}const ko=S.createContext({});function AT(n,a){if(Ao(n)){const{initial:s,animate:l}=n;return{initial:s===!1||as(s)?s:void 0,animate:as(l)?l:void 0}}return n.inherit!==!1?a:{}}function kT(n){const{initial:a,animate:s}=AT(n,S.useContext(ko));return S.useMemo(()=>({initial:a,animate:s}),[yv(a),yv(s)])}function yv(n){return Array.isArray(n)?n.join(" "):n}const Yf=()=>({style:{},transform:{},transformOrigin:{},vars:{}});function qb(n,a,s){for(const l in a)!xt(a[l])&&!Sb(l,s)&&(n[l]=a[l])}function MT({transformTemplate:n},a){return S.useMemo(()=>{const s=Yf();return Uf(s,a,n),Object.assign({},s.vars,s.style)},[a])}function RT(n,a){const s=n.style||{},l={};return qb(l,s,n),Object.assign(l,MT(n,a)),l}function OT(n,a){const s={},l=RT(n,a);return n.drag&&n.dragListener!==!1&&(s.draggable=!1,l.userSelect=l.WebkitUserSelect=l.WebkitTouchCallout="none",l.touchAction=n.drag===!0?"none":`pan-${n.drag==="x"?"y":"x"}`),n.tabIndex===void 0&&(n.onTap||n.onTapStart||n.whileTap)&&(s.tabIndex=0),s.style=l,s}const Yb=()=>({...Yf(),attrs:{}});function zT(n,a,s,l){const c=S.useMemo(()=>{const h=Yb();return jb(h,a,Eb(l),n.transformTemplate,n.style),{...h.attrs,style:{...h.style}}},[a]);if(n.style){const h={};qb(h,n.style,n),c.style={...h,...c.style}}return c}const _T=["animate","circle","defs","desc","ellipse","g","image","line","filter","marker","mask","metadata","path","pattern","polygon","polyline","rect","stop","switch","symbol","svg","text","tspan","use","view"];function Pf(n){return typeof n!="string"||n.includes("-")?!1:!!(_T.indexOf(n)>-1||/[A-Z]/u.test(n))}function VT(n,a,s,{latestValues:l},c,h=!1,d){const p=(d??Pf(n)?zT:OT)(a,l,c,n),g=DT(a,typeof n=="string",h),v=n!==S.Fragment?{...g,...p,ref:s}:{},{children:x}=a,b=S.useMemo(()=>xt(x)?x.get():x,[x]);return S.createElement(n,{...v,children:b})}function BT({scrapeMotionValuesFromProps:n,createRenderState:a},s,l,c){return{latestValues:LT(s,l,c,n),renderState:a()}}function LT(n,a,s,l){const c={},h=l(n,{});for(const b in h)c[b]=ao(h[b]);let{initial:d,animate:m}=n;const p=Ao(n),g=fb(n);a&&g&&!p&&n.inherit!==!1&&(d===void 0&&(d=a.initial),m===void 0&&(m=a.animate));let v=s?s.initial===!1:!1;v=v||d===!1;const x=v?m:d;if(x&&typeof x!="boolean"&&!Do(x)){const b=Array.isArray(x)?x:[x];for(let E=0;E<b.length;E++){const w=kf(n,b[E]);if(w){const{transitionEnd:N,transition:T,...A}=w;for(const k in A){let _=A[k];if(Array.isArray(_)){const z=v?_.length-1:0;_=_[z]}_!==null&&(c[k]=_)}for(const k in N)c[k]=N[k]}}}return c}const Pb=n=>(a,s)=>{const l=S.useContext(ko),c=S.useContext(To),h=()=>BT(n,a,l,c);return s?h():pf(h)},UT=Pb({scrapeMotionValuesFromProps:Hf,createRenderState:Yf}),HT=Pb({scrapeMotionValuesFromProps:Tb,createRenderState:Yb}),qT=Symbol.for("motionComponentSymbol");function YT(n,a,s){const l=S.useRef(s);S.useInsertionEffect(()=>{l.current=s});const c=S.useRef(null);return S.useCallback(h=>{var m;h&&((m=n.onMount)==null||m.call(n,h)),a&&(h?a.mount(h):a.unmount());const d=l.current;if(typeof d=="function")if(h){const p=d(h);typeof p=="function"&&(c.current=p)}else c.current?(c.current(),c.current=null):d(h);else d&&(d.current=h)},[a])}const Gb=S.createContext({});function La(n){return n&&typeof n=="object"&&Object.prototype.hasOwnProperty.call(n,"current")}function PT(n,a,s,l,c,h){var _,z;const{visualElement:d}=S.useContext(ko),m=S.useContext(Lb),p=S.useContext(To),g=S.useContext(qf),v=g.reducedMotion,x=g.skipAnimations,b=S.useRef(null),E=S.useRef(!1);l=l||m.renderer,!b.current&&l&&(b.current=l(n,{visualState:a,parent:d,props:s,presenceContext:p,blockInitialAnimation:p?p.initial===!1:!1,reducedMotionConfig:v,skipAnimations:x,isSVG:h}),E.current&&b.current&&(b.current.manuallyAnimateOnMount=!0));const w=b.current,N=S.useContext(Gb);w&&!w.projection&&c&&(w.type==="html"||w.type==="svg")&&GT(b.current,s,c,N);const T=S.useRef(!1);S.useInsertionEffect(()=>{w&&T.current&&w.update(s,p)});const A=s[eb],k=S.useRef(!!A&&typeof window<"u"&&!((_=window.MotionHandoffIsComplete)!=null&&_.call(window,A))&&((z=window.MotionHasOptimisedAnimation)==null?void 0:z.call(window,A)));return gf(()=>{E.current=!0,w&&(T.current=!0,window.MotionIsMounted=!0,w.updateFeatures(),w.scheduleRenderMicrotask(),k.current&&w.animationState&&w.animationState.animateChanges())}),S.useEffect(()=>{w&&(!k.current&&w.animationState&&w.animationState.animateChanges(),k.current&&(queueMicrotask(()=>{var U;(U=window.MotionHandoffMarkAsComplete)==null||U.call(window,A)}),k.current=!1),w.enteringChildren=void 0)}),w}function GT(n,a,s,l){const{layoutId:c,layout:h,drag:d,dragConstraints:m,layoutScroll:p,layoutRoot:g,layoutAnchor:v,layoutCrossfade:x}=a;n.projection=new s(n.latestValues,a["data-framer-portal-id"]?void 0:Fb(n.parent)),n.projection.setOptions({layoutId:c,layout:h,alwaysMeasureLayout:!!d||m&&La(m),visualElement:n,animationType:typeof h=="string"?h:"both",initialPromotionConfig:l,crossfade:x,layoutScroll:p,layoutRoot:g,layoutAnchor:v})}function Fb(n){if(n)return n.options.allowProjection!==!1?n.projection:Fb(n.parent)}function ud(n,{forwardMotionProps:a=!1,type:s}={},l,c){l&&TT(l);const h=s?s==="svg":Pf(n),d=h?HT:UT;function m(g,v){let x;const b={...S.useContext(qf),...g,layoutId:FT(g)},{isStatic:E}=b,w=kT(g),N=d(g,E);if(!E&&typeof window<"u"){XT();const T=$T(b);x=T.MeasureLayout,w.visualElement=PT(n,N,b,c,T.ProjectionNode,h)}return o.jsxs(ko.Provider,{value:w,children:[x&&w.visualElement?o.jsx(x,{visualElement:w.visualElement,...b}):null,VT(n,g,YT(N,w.visualElement,v),N,E,a,h)]})}m.displayName=`motion.${typeof n=="string"?n:`create(${n.displayName??n.name??""})`}`;const p=S.forwardRef(m);return p[qT]=n,p}function FT({layoutId:n}){const a=S.useContext(mf).id;return a&&n!==void 0?a+"-"+n:n}function XT(n,a){S.useContext(Lb).strict}function $T(n){const a=Ub(),{drag:s,layout:l}=a;if(!s&&!l)return{};const c={...s,...l};return{MeasureLayout:s!=null&&s.isEnabled(n)||l!=null&&l.isEnabled(n)?c.MeasureLayout:void 0,ProjectionNode:c.ProjectionNode}}function KT(n,a){if(typeof Proxy>"u")return ud;const s=new Map,l=(h,d)=>ud(h,d,n,a),c=(h,d)=>l(h,d);return new Proxy(c,{get:(h,d)=>d==="create"?l:(s.has(d)||s.set(d,ud(d,void 0,n,a)),s.get(d))})}const ZT=(n,a)=>a.isSVG??Pf(n)?new EE(a):new vE(a,{allowProjection:n!==S.Fragment});class QT extends Er{constructor(a){super(a),a.animationState||(a.animationState=AE(a))}updateAnimationControlsSubscription(){const{animate:a}=this.node.getProps();Do(a)&&(this.unmountControls=a.subscribe(this.node))}mount(){this.updateAnimationControlsSubscription()}update(){const{animate:a}=this.node.getProps(),{animate:s}=this.node.prevProps||{};a!==s&&this.updateAnimationControlsSubscription()}unmount(){var a;this.node.animationState.reset(),(a=this.unmountControls)==null||a.call(this)}}let JT=0;class WT extends Er{constructor(){super(...arguments),this.id=JT++,this.isExitComplete=!1}update(){var h;if(!this.node.presenceContext)return;const{isPresent:a,onExitComplete:s}=this.node.presenceContext,{isPresent:l}=this.node.prevPresenceContext||{};if(!this.node.animationState||a===l)return;if(a&&l===!1){if(this.isExitComplete){const{initial:d,custom:m}=this.node.getProps();if(typeof d=="string"||typeof d=="object"&&d!==null&&!Array.isArray(d)){const p=Kr(this.node,d,m);if(p){const{transition:g,transitionEnd:v,...x}=p;for(const b in x)(h=this.node.getValue(b))==null||h.jump(x[b])}}this.node.animationState.reset(),this.node.animationState.animateChanges()}else this.node.animationState.setActive("exit",!1);this.isExitComplete=!1;return}const c=this.node.animationState.setActive("exit",!a);s&&!a&&c.then(()=>{this.isExitComplete=!0,s(this.id)})}mount(){const{register:a,onExitComplete:s}=this.node.presenceContext||{};s&&s(this.id),a&&(this.unmount=a(this.id))}unmount(){}}const IT={animation:{Feature:QT},exit:{Feature:WT}};function xs(n){return{point:{x:n.pageX,y:n.pageY}}}const eC=n=>a=>zf(a)&&n(a,xs(a));function es(n,a,s,l){return is(n,a,eC(s),l)}const Xb=({current:n})=>n?n.ownerDocument.defaultView:null,vv=(n,a)=>Math.abs(n-a);function tC(n,a){const s=vv(n.x,a.x),l=vv(n.y,a.y);return Math.sqrt(s**2+l**2)}const xv=new Set(["auto","scroll"]);class $b{constructor(a,s,{transformPagePoint:l,contextWindow:c=window,dragSnapToOrigin:h=!1,distanceThreshold:d=3,element:m}={}){if(this.startEvent=null,this.lastMoveEvent=null,this.lastMoveEventInfo=null,this.lastRawMoveEventInfo=null,this.handlers={},this.contextWindow=window,this.scrollPositions=new Map,this.removeScrollListeners=null,this.onElementScroll=w=>{this.handleScroll(w.target)},this.onWindowScroll=()=>{this.handleScroll(window)},this.updatePoint=()=>{if(!(this.lastMoveEvent&&this.lastMoveEventInfo))return;this.lastRawMoveEventInfo&&(this.lastMoveEventInfo=ql(this.lastRawMoveEventInfo,this.transformPagePoint));const w=dd(this.lastMoveEventInfo,this.history),N=this.startEvent!==null,T=tC(w.offset,{x:0,y:0})>=this.distanceThreshold;if(!N&&!T)return;const{point:A}=w,{timestamp:k}=vt;this.history.push({...A,timestamp:k});const{onStart:_,onMove:z}=this.handlers;N||(_&&_(this.lastMoveEvent,w),this.startEvent=this.lastMoveEvent),z&&z(this.lastMoveEvent,w)},this.handlePointerMove=(w,N)=>{this.lastMoveEvent=w,this.lastRawMoveEventInfo=N,this.lastMoveEventInfo=ql(N,this.transformPagePoint),Fe.update(this.updatePoint,!0)},this.handlePointerUp=(w,N)=>{this.end();const{onEnd:T,onSessionEnd:A,resumeAnimation:k}=this.handlers;if((this.dragSnapToOrigin||!this.startEvent)&&k&&k(),!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const _=dd(w.type==="pointercancel"?this.lastMoveEventInfo:ql(N,this.transformPagePoint),this.history);this.startEvent&&T&&T(w,_),A&&A(w,_)},!zf(a))return;this.dragSnapToOrigin=h,this.handlers=s,this.transformPagePoint=l,this.distanceThreshold=d,this.contextWindow=c||window;const p=xs(a),g=ql(p,this.transformPagePoint),{point:v}=g,{timestamp:x}=vt;this.history=[{...v,timestamp:x}];const{onSessionStart:b}=s;b&&b(a,dd(g,this.history));const E={passive:!0,capture:!0};this.removeListeners=gs(es(this.contextWindow,"pointermove",this.handlePointerMove,E),es(this.contextWindow,"pointerup",this.handlePointerUp,E),es(this.contextWindow,"pointercancel",this.handlePointerUp,E)),m&&this.startScrollTracking(m)}startScrollTracking(a){let s=a.parentElement;for(;s;){const l=getComputedStyle(s);(xv.has(l.overflowX)||xv.has(l.overflowY))&&this.scrollPositions.set(s,{x:s.scrollLeft,y:s.scrollTop}),s=s.parentElement}this.scrollPositions.set(window,{x:window.scrollX,y:window.scrollY}),window.addEventListener("scroll",this.onElementScroll,{capture:!0}),window.addEventListener("scroll",this.onWindowScroll),this.removeScrollListeners=()=>{window.removeEventListener("scroll",this.onElementScroll,{capture:!0}),window.removeEventListener("scroll",this.onWindowScroll)}}handleScroll(a){const s=this.scrollPositions.get(a);if(!s)return;const l=a===window,c=l?{x:window.scrollX,y:window.scrollY}:{x:a.scrollLeft,y:a.scrollTop},h={x:c.x-s.x,y:c.y-s.y};h.x===0&&h.y===0||(l?this.lastMoveEventInfo&&(this.lastMoveEventInfo.point.x+=h.x,this.lastMoveEventInfo.point.y+=h.y):this.history.length>0&&(this.history[0].x-=h.x,this.history[0].y-=h.y),this.scrollPositions.set(a,c),Fe.update(this.updatePoint,!0))}updateHandlers(a){this.handlers=a}end(){this.removeListeners&&this.removeListeners(),this.removeScrollListeners&&this.removeScrollListeners(),this.scrollPositions.clear(),jr(this.updatePoint)}}function ql(n,a){return a?{point:a(n.point)}:n}function bv(n,a){return{x:n.x-a.x,y:n.y-a.y}}function dd({point:n},a){return{point:n,delta:bv(n,Kb(a)),offset:bv(n,nC(a)),velocity:rC(a,.1)}}function nC(n){return n[0]}function Kb(n){return n[n.length-1]}function rC(n,a){if(n.length<2)return{x:0,y:0};let s=n.length-1,l=null;const c=Kb(n);for(;s>=0&&(l=n[s],!(c.timestamp-l.timestamp>Pt(a)));)s--;if(!l)return{x:0,y:0};l===n[0]&&n.length>2&&c.timestamp-l.timestamp>Pt(a)*2&&(l=n[1]);const h=nn(c.timestamp-l.timestamp);if(h===0)return{x:0,y:0};const d={x:(c.x-l.x)/h,y:(c.y-l.y)/h};return d.x===1/0&&(d.x=0),d.y===1/0&&(d.y=0),d}function aC(n,{min:a,max:s},l){return a!==void 0&&n<a?n=l?Ge(a,n,l.min):Math.max(n,a):s!==void 0&&n>s&&(n=l?Ge(s,n,l.max):Math.min(n,s)),n}function Sv(n,a,s){return{min:a!==void 0?n.min+a:void 0,max:s!==void 0?n.max+s-(n.max-n.min):void 0}}function iC(n,{top:a,left:s,bottom:l,right:c}){return{x:Sv(n.x,s,c),y:Sv(n.y,a,l)}}function jv(n,a){let s=a.min-n.min,l=a.max-n.max;return a.max-a.min<n.max-n.min&&([s,l]=[l,s]),{min:s,max:l}}function sC(n,a){return{x:jv(n.x,a.x),y:jv(n.y,a.y)}}function lC(n,a){let s=.5;const l=wt(n),c=wt(a);return c>l?s=ns(a.min,a.max-l,n.min):l>c&&(s=ns(n.min,n.max-c,a.min)),En(0,1,s)}function oC(n,a){const s={};return a.min!==void 0&&(s.min=a.min-n.min),a.max!==void 0&&(s.max=a.max-n.min),s}const Kd=.35;function cC(n=Kd){return n===!1?n=0:n===!0&&(n=Kd),{x:wv(n,"left","right"),y:wv(n,"top","bottom")}}function wv(n,a,s){return{min:Ev(n,a),max:Ev(n,s)}}function Ev(n,a){return typeof n=="number"?n:n[a]||0}const uC=new WeakMap;class dC{constructor(a){this.openDragLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},this.constraints=!1,this.hasMutatedConstraints=!1,this.elastic=ot(),this.latestPointerEvent=null,this.latestPanInfo=null,this.visualElement=a}start(a,{snapToCursor:s=!1,distanceThreshold:l}={}){const{presenceContext:c}=this.visualElement;if(c&&c.isPresent===!1)return;const h=x=>{s&&this.snapToCursor(xs(x).point),this.stopAnimation()},d=(x,b)=>{const{drag:E,dragPropagation:w,onDragStart:N}=this.getProps();if(E&&!w&&(this.openDragLock&&this.openDragLock(),this.openDragLock=L2(E),!this.openDragLock))return;this.latestPointerEvent=x,this.latestPanInfo=b,this.isDragging=!0,this.currentDirection=null,this.resolveConstraints(),this.visualElement.projection&&(this.visualElement.projection.isAnimationBlocked=!0,this.visualElement.projection.target=void 0),bn(A=>{let k=this.getAxisMotionValue(A).get()||0;if(wn.test(k)){const{projection:_}=this.visualElement;if(_&&_.layout){const z=_.layout.layoutBox[A];z&&(k=wt(z)*(parseFloat(k)/100))}}this.originPoint[A]=k}),N&&Fe.update(()=>N(x,b),!1,!0),Ud(this.visualElement,"transform");const{animationState:T}=this.visualElement;T&&T.setActive("whileDrag",!0)},m=(x,b)=>{this.latestPointerEvent=x,this.latestPanInfo=b;const{dragPropagation:E,dragDirectionLock:w,onDirectionLock:N,onDrag:T}=this.getProps();if(!E&&!this.openDragLock)return;const{offset:A}=b;if(w&&this.currentDirection===null){this.currentDirection=hC(A),this.currentDirection!==null&&N&&N(this.currentDirection);return}this.updateAxis("x",b.point,A),this.updateAxis("y",b.point,A),this.visualElement.render(),T&&Fe.update(()=>T(x,b),!1,!0)},p=(x,b)=>{this.latestPointerEvent=x,this.latestPanInfo=b,this.stop(x,b),this.latestPointerEvent=null,this.latestPanInfo=null},g=()=>{const{dragSnapToOrigin:x}=this.getProps();(x||this.constraints)&&this.startAnimation({x:0,y:0})},{dragSnapToOrigin:v}=this.getProps();this.panSession=new $b(a,{onSessionStart:h,onStart:d,onMove:m,onSessionEnd:p,resumeAnimation:g},{transformPagePoint:this.visualElement.getTransformPagePoint(),dragSnapToOrigin:v,distanceThreshold:l,contextWindow:Xb(this.visualElement),element:this.visualElement.current})}stop(a,s){const l=a||this.latestPointerEvent,c=s||this.latestPanInfo,h=this.isDragging;if(this.cancel(),!h||!c||!l)return;const{velocity:d}=c;this.startAnimation(d);const{onDragEnd:m}=this.getProps();m&&Fe.postRender(()=>m(l,c))}cancel(){this.isDragging=!1;const{projection:a,animationState:s}=this.visualElement;a&&(a.isAnimationBlocked=!1),this.endPanSession();const{dragPropagation:l}=this.getProps();!l&&this.openDragLock&&(this.openDragLock(),this.openDragLock=null),s&&s.setActive("whileDrag",!1)}endPanSession(){this.panSession&&this.panSession.end(),this.panSession=void 0}updateAxis(a,s,l){const{drag:c}=this.getProps();if(!l||!Yl(a,c,this.currentDirection))return;const h=this.getAxisMotionValue(a);let d=this.originPoint[a]+l[a];this.constraints&&this.constraints[a]&&(d=aC(d,this.constraints[a],this.elastic[a])),h.set(d)}resolveConstraints(){var h;const{dragConstraints:a,dragElastic:s}=this.getProps(),l=this.visualElement.projection&&!this.visualElement.projection.layout?this.visualElement.projection.measure(!1):(h=this.visualElement.projection)==null?void 0:h.layout,c=this.constraints;a&&La(a)?this.constraints||(this.constraints=this.resolveRefConstraints()):a&&l?this.constraints=iC(l.layoutBox,a):this.constraints=!1,this.elastic=cC(s),c!==this.constraints&&!La(a)&&l&&this.constraints&&!this.hasMutatedConstraints&&bn(d=>{this.constraints!==!1&&this.getAxisMotionValue(d)&&(this.constraints[d]=oC(l.layoutBox[d],this.constraints[d]))})}resolveRefConstraints(){const{dragConstraints:a,onMeasureDragConstraints:s}=this.getProps();if(!a||!La(a))return!1;const l=a.current,{projection:c}=this.visualElement;if(!c||!c.layout)return!1;c.root&&(c.root.scroll=void 0,c.root.updateScroll());const h=fE(l,c.root,this.visualElement.getTransformPagePoint());let d=sC(c.layout.layoutBox,h);if(s){const m=s(cE(d));this.hasMutatedConstraints=!!m,m&&(d=gb(m))}return d}startAnimation(a){const{drag:s,dragMomentum:l,dragElastic:c,dragTransition:h,dragSnapToOrigin:d,onDragTransitionEnd:m}=this.getProps(),p=this.constraints||{},g=bn(v=>{if(!Yl(v,s,this.currentDirection))return;let x=p&&p[v]||{};(d===!0||d===v)&&(x={min:0,max:0});const b=c?200:1e6,E=c?40:1e7,w={type:"inertia",velocity:l?a[v]:0,bounceStiffness:b,bounceDamping:E,timeConstant:750,restDelta:1,restSpeed:10,...h,...x};return this.startAxisValueAnimation(v,w)});return Promise.all(g).then(m)}startAxisValueAnimation(a,s){const l=this.getAxisMotionValue(a);return Ud(this.visualElement,a),l.start(Af(a,l,0,s,this.visualElement,!1))}stopAnimation(){bn(a=>this.getAxisMotionValue(a).stop())}getAxisMotionValue(a){const s=`_drag${a.toUpperCase()}`,c=this.visualElement.getProps()[s];return c||this.visualElement.getValue(a,this.visualElement.latestValues[a]??0)}snapToCursor(a){bn(s=>{const{drag:l}=this.getProps();if(!Yl(s,l,this.currentDirection))return;const{projection:c}=this.visualElement,h=this.getAxisMotionValue(s);if(c&&c.layout){const{min:d,max:m}=c.layout.layoutBox[s],p=h.get()||0;h.set(a[s]-Ge(d,m,.5)+p)}})}scalePositionWithinConstraints(){if(!this.visualElement.current)return;const{drag:a,dragConstraints:s}=this.getProps(),{projection:l}=this.visualElement;if(!La(s)||!l||!this.constraints)return;this.stopAnimation();const c={x:0,y:0};bn(d=>{const m=this.getAxisMotionValue(d);if(m&&this.constraints!==!1){const p=m.get();c[d]=lC({min:p,max:p},this.constraints[d])}});const{transformTemplate:h}=this.visualElement.getProps();this.visualElement.current.style.transform=h?h({},""):"none",l.root&&l.root.updateScroll(),l.updateLayout(),this.constraints=!1,this.resolveConstraints(),bn(d=>{if(!Yl(d,a,null))return;const m=this.getAxisMotionValue(d),{min:p,max:g}=this.constraints[d];m.set(Ge(p,g,c[d]))}),this.visualElement.render()}addListeners(){if(!this.visualElement.current)return;uC.set(this.visualElement,this);const a=this.visualElement.current,s=es(a,"pointerdown",g=>{const{drag:v,dragListener:x=!0}=this.getProps(),b=g.target,E=b!==a&&G2(b);v&&x&&!E&&this.start(g)});let l;const c=()=>{const{dragConstraints:g}=this.getProps();La(g)&&g.current&&(this.constraints=this.resolveRefConstraints(),l||(l=fC(a,g.current,()=>this.scalePositionWithinConstraints())))},{projection:h}=this.visualElement,d=h.addEventListener("measure",c);h&&!h.layout&&(h.root&&h.root.updateScroll(),h.updateLayout()),Fe.read(c);const m=is(window,"resize",()=>this.scalePositionWithinConstraints()),p=h.addEventListener("didUpdate",(({delta:g,hasLayoutChanged:v})=>{this.isDragging&&v&&(bn(x=>{const b=this.getAxisMotionValue(x);b&&(this.originPoint[x]+=g[x].translate,b.set(b.get()+g[x].translate))}),this.visualElement.render())}));return()=>{m(),s(),d(),p&&p(),l&&l()}}getProps(){const a=this.visualElement.getProps(),{drag:s=!1,dragDirectionLock:l=!1,dragPropagation:c=!1,dragConstraints:h=!1,dragElastic:d=Kd,dragMomentum:m=!0}=a;return{...a,drag:s,dragDirectionLock:l,dragPropagation:c,dragConstraints:h,dragElastic:d,dragMomentum:m}}}function Tv(n){let a=!0;return()=>{if(a){a=!1;return}n()}}function fC(n,a,s){const l=Ry(n,Tv(s)),c=Ry(a,Tv(s));return()=>{l(),c()}}function Yl(n,a,s){return(a===!0||a===n)&&(s===null||s===n)}function hC(n,a=10){let s=null;return Math.abs(n.y)>a?s="y":Math.abs(n.x)>a&&(s="x"),s}class mC extends Er{constructor(a){super(a),this.removeGroupControls=rn,this.removeListeners=rn,this.controls=new dC(a)}mount(){const{dragControls:a}=this.node.getProps();a&&(this.removeGroupControls=a.subscribe(this.controls)),this.removeListeners=this.controls.addListeners()||rn}update(){const{dragControls:a}=this.node.getProps(),{dragControls:s}=this.node.prevProps||{};a!==s&&(this.removeGroupControls(),a&&(this.removeGroupControls=a.subscribe(this.controls)))}unmount(){this.removeGroupControls(),this.removeListeners(),this.controls.isDragging||this.controls.endPanSession()}}const fd=n=>(a,s)=>{n&&Fe.update(()=>n(a,s),!1,!0)};class pC extends Er{constructor(){super(...arguments),this.removePointerDownListener=rn}onPointerDown(a){this.session=new $b(a,this.createPanHandlers(),{transformPagePoint:this.node.getTransformPagePoint(),contextWindow:Xb(this.node)})}createPanHandlers(){const{onPanSessionStart:a,onPanStart:s,onPan:l,onPanEnd:c}=this.node.getProps();return{onSessionStart:fd(a),onStart:fd(s),onMove:fd(l),onEnd:(h,d)=>{delete this.session,c&&Fe.postRender(()=>c(h,d))}}}mount(){this.removePointerDownListener=es(this.node.current,"pointerdown",a=>this.onPointerDown(a))}update(){this.session&&this.session.updateHandlers(this.createPanHandlers())}unmount(){this.removePointerDownListener(),this.session&&this.session.end()}}let hd=!1;class gC extends S.Component{componentDidMount(){const{visualElement:a,layoutGroup:s,switchLayoutGroup:l,layoutId:c}=this.props,{projection:h}=a;h&&(s.group&&s.group.add(h),l&&l.register&&c&&l.register(h),hd&&h.root.didUpdate(),h.addEventListener("animationComplete",()=>{this.safeToRemove()}),h.setOptions({...h.options,layoutDependency:this.props.layoutDependency,onExitComplete:()=>this.safeToRemove()})),io.hasEverUpdated=!0}getSnapshotBeforeUpdate(a){const{layoutDependency:s,visualElement:l,drag:c,isPresent:h}=this.props,{projection:d}=l;return d&&(d.isPresent=h,a.layoutDependency!==s&&d.setOptions({...d.options,layoutDependency:s}),hd=!0,c||a.layoutDependency!==s||s===void 0||a.isPresent!==h?d.willUpdate():this.safeToRemove(),a.isPresent!==h&&(h?d.promote():d.relegate()||Fe.postRender(()=>{const m=d.getStack();(!m||!m.members.length)&&this.safeToRemove()}))),null}componentDidUpdate(){const{visualElement:a,layoutAnchor:s}=this.props,{projection:l}=a;l&&(l.options.layoutAnchor=s,l.root.didUpdate(),Of.postRender(()=>{!l.currentAnimation&&l.isLead()&&this.safeToRemove()}))}componentWillUnmount(){const{visualElement:a,layoutGroup:s,switchLayoutGroup:l}=this.props,{projection:c}=a;hd=!0,c&&(c.scheduleCheckAfterUnmount(),s&&s.group&&s.group.remove(c),l&&l.deregister&&l.deregister(c))}safeToRemove(){const{safeToRemove:a}=this.props;a&&a()}render(){return null}}function Zb(n){const[a,s]=Bb(),l=S.useContext(mf);return o.jsx(gC,{...n,layoutGroup:l,switchLayoutGroup:S.useContext(Gb),isPresent:a,safeToRemove:s})}const yC={pan:{Feature:pC},drag:{Feature:mC,ProjectionNode:Vb,MeasureLayout:Zb}};function Cv(n,a,s){const{props:l}=n;n.animationState&&l.whileHover&&n.animationState.setActive("whileHover",s==="Start");const c="onHover"+s,h=l[c];h&&Fe.postRender(()=>h(a,xs(a)))}class vC extends Er{mount(){const{current:a}=this.node;a&&(this.unmount=H2(a,(s,l)=>(Cv(this.node,l,"Start"),c=>Cv(this.node,c,"End"))))}unmount(){}}class xC extends Er{constructor(){super(...arguments),this.isActive=!1}onFocus(){let a=!1;try{a=this.node.current.matches(":focus-visible")}catch{a=!0}!a||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!0),this.isActive=!0)}onBlur(){!this.isActive||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!1),this.isActive=!1)}mount(){this.unmount=gs(is(this.node.current,"focus",()=>this.onFocus()),is(this.node.current,"blur",()=>this.onBlur()))}unmount(){}}function Nv(n,a,s){const{props:l}=n;if(n.current instanceof HTMLButtonElement&&n.current.disabled)return;n.animationState&&l.whileTap&&n.animationState.setActive("whileTap",s==="Start");const c="onTap"+(s==="End"?"":s),h=l[c];h&&Fe.postRender(()=>h(a,xs(a)))}class bC extends Er{mount(){const{current:a}=this.node;if(!a)return;const{globalTapTarget:s,propagate:l}=this.node.props;this.unmount=X2(a,(c,h)=>(Nv(this.node,h,"Start"),(d,{success:m})=>Nv(this.node,d,m?"End":"Cancel")),{useGlobalTarget:s,stopPropagation:(l==null?void 0:l.tap)===!1})}unmount(){}}const Zd=new WeakMap,md=new WeakMap,SC=n=>{const a=Zd.get(n.target);a&&a(n)},jC=n=>{n.forEach(SC)};function wC({root:n,...a}){const s=n||document;md.has(s)||md.set(s,{});const l=md.get(s),c=JSON.stringify(a);return l[c]||(l[c]=new IntersectionObserver(jC,{root:n,...a})),l[c]}function EC(n,a,s){const l=wC(a);return Zd.set(n,s),l.observe(n),()=>{Zd.delete(n),l.unobserve(n)}}const TC={some:0,all:1};class CC extends Er{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){var p;(p=this.stopObserver)==null||p.call(this);const{viewport:a={}}=this.node.getProps(),{root:s,margin:l,amount:c="some",once:h}=a,d={root:s?s.current:void 0,rootMargin:l,threshold:typeof c=="number"?c:TC[c]},m=g=>{const{isIntersecting:v}=g;if(this.isInView===v||(this.isInView=v,h&&!v&&this.hasEnteredView))return;v&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive("whileInView",v);const{onViewportEnter:x,onViewportLeave:b}=this.node.getProps(),E=v?x:b;E&&E(g)};this.stopObserver=EC(this.node.current,d,m)}mount(){this.startObserver()}update(){if(typeof IntersectionObserver>"u")return;const{props:a,prevProps:s}=this.node;["amount","margin","root"].some(NC(a,s))&&this.startObserver()}unmount(){var a;(a=this.stopObserver)==null||a.call(this),this.hasEnteredView=!1,this.isInView=!1}}function NC({viewport:n={}},{viewport:a={}}={}){return s=>n[s]!==a[s]}const DC={inView:{Feature:CC},tap:{Feature:bC},focus:{Feature:xC},hover:{Feature:vC}},AC={layout:{ProjectionNode:Vb,MeasureLayout:Zb}},kC={...IT,...DC,...yC,...AC},MC=KT(kC,ZT);function Qb(){!Lf.current&&hb();const[n]=S.useState(go.current);return n}const Gf=MC,So=new Map,Dv=new Set;let RC=0;const Ff=()=>{var n;return(n=window.chrome)==null?void 0:n.webview};function OC(n){var s;const a=So.get(n.id);if(a){if(n.type==="progress"){(s=a.progress)==null||s.call(a,n.data);return}window.clearTimeout(a.timer),So.delete(n.id),n.ok?a.resolve(n.data):a.reject(new Error(n.error||"操作失败"))}}var cx;(cx=Ff())==null||cx.addEventListener("message",n=>OC(n.data));function zC(n,a){var s;a&&Dv.has(a)||(a&&Dv.add(a),(s=Ff())==null||s.postMessage({type:"app.ready",route:n,navigation:a}))}function fe(n,a,s=3e4,l){const c=Ff();if(!c)return Promise.reject(new Error("当前页面未连接到桌面宿主"));const h=`${Date.now()}-${++RC}`;return new Promise((d,m)=>{const p=window.setTimeout(()=>{So.delete(h),m(new Error("操作超时，请重试"))},s);So.set(h,{resolve:g=>d(g),reject:m,timer:p,progress:l}),c.postMessage({id:h,operation:n,payload:a})})}var Xf=fx();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _C=n=>n.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Jb=(...n)=>n.filter((a,s,l)=>!!a&&a.trim()!==""&&l.indexOf(a)===s).join(" ").trim();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var VC={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const BC=S.forwardRef(({color:n="currentColor",size:a=24,strokeWidth:s=2,absoluteStrokeWidth:l,className:c="",children:h,iconNode:d,...m},p)=>S.createElement("svg",{ref:p,...VC,width:a,height:a,stroke:n,strokeWidth:l?Number(s)*24/Number(a):s,className:Jb("lucide",c),...m},[...d.map(([g,v])=>S.createElement(g,v)),...Array.isArray(h)?h:[h]]));/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ye=(n,a)=>{const s=S.forwardRef(({className:l,...c},h)=>S.createElement(BC,{ref:h,iconNode:a,className:Jb(`lucide-${_C(n)}`,l),...c}));return s.displayName=`${n}`,s};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ss=Ye("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const LC=Ye("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const UC=Ye("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qa=Ye("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wb=Ye("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const HC=Ye("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qC=Ye("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const YC=Ye("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const PC=Ye("Clock3",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16.5 12",key:"1aq6pp"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const GC=Ye("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qd=Ye("Database",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const FC=Ye("Ellipsis",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Av=Ye("FileCheck2",[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4",key:"1pf5j1"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"m3 15 2 2 4-4",key:"1lhrkk"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jo=Ye("FileSpreadsheet",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M8 13h2",key:"yr2amv"}],["path",{d:"M14 13h2",key:"un5t4a"}],["path",{d:"M8 17h2",key:"2yhykz"}],["path",{d:"M14 17h2",key:"10kma7"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const XC=Ye("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wo=Ye("FolderOpen",[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hn=Ye("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $C=Ye("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const KC=Ye("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ib=Ye("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ZC=Ye("RotateCw",[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",key:"1p45f6"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const QC=Ye("Rows3",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M21 9H3",key:"1338ky"}],["path",{d:"M21 15H3",key:"9uk58r"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $f=Ye("Settings2",[["path",{d:"M20 7h-9",key:"3s1dr2"}],["path",{d:"M14 17H5",key:"gfn3mx"}],["circle",{cx:"17",cy:"17",r:"3",key:"18b49y"}],["circle",{cx:"7",cy:"7",r:"3",key:"dfmy0x"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const JC=Ye("Sigma",[["path",{d:"M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2",key:"wuwx1p"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const WC=Ye("SlidersHorizontal",[["line",{x1:"21",x2:"14",y1:"4",y2:"4",key:"obuewd"}],["line",{x1:"10",x2:"3",y1:"4",y2:"4",key:"1q6298"}],["line",{x1:"21",x2:"12",y1:"12",y2:"12",key:"1iu8h1"}],["line",{x1:"8",x2:"3",y1:"12",y2:"12",key:"ntss68"}],["line",{x1:"21",x2:"16",y1:"20",y2:"20",key:"14d8ph"}],["line",{x1:"12",x2:"3",y1:"20",y2:"20",key:"m0wm8r"}],["line",{x1:"14",x2:"14",y1:"2",y2:"6",key:"14e1ph"}],["line",{x1:"8",x2:"8",y1:"10",y2:"14",key:"1i6ji0"}],["line",{x1:"16",x2:"16",y1:"18",y2:"22",key:"1lctlv"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const IC=Ye("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eN=Ye("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mo=Ye("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),tN=["一","二","三","四","五","六","日"],nN=Array.from({length:12},(n,a)=>`${a+1}月`);function rN(n){if(!n)return null;const[a,s,l=1]=n.split("-").map(Number);return!a||!s||!l?null:new Date(a,s-1,l)}function kv(n){const a=n.getFullYear(),s=String(n.getMonth()+1).padStart(2,"0"),l=String(n.getDate()).padStart(2,"0");return`${a}-${s}-${l}`}function aN(n){const a=n.getFullYear(),s=String(n.getMonth()+1).padStart(2,"0"),l=String(n.getDate()).padStart(2,"0");return`${a}/${s}/${l}`}function iN(n,a){const s=new Date(n,a,1).getDay();return s===0?6:s-1}function sN(n,a){return new Date(n,a+1,0).getDate()}function Mv(n,a){return n.getFullYear()===a.getFullYear()&&n.getMonth()===a.getMonth()&&n.getDate()===a.getDate()}function lN(n){return Math.floor(n/12)*12}function Gt({value:n,onChange:a,label:s,disabled:l=!1,selectionMode:c="day"}){var C;const h=S.useId(),d=S.useMemo(()=>rN(n),[n]),[m,p]=S.useState(!1),[g,v]=S.useState(c),[x,b]=S.useState(d??new Date),[E,w]=S.useState({top:0,left:0}),[N,T]=S.useState("bottom"),A=S.useRef(null),k=S.useRef(null),_=S.useRef(null);S.useEffect(()=>{d&&b(d)},[n]);function z(){const V=A.current,I=_.current;if(!V||!I)return;const ne=V.ownerDocument.defaultView||window,oe=V.getBoundingClientRect(),me=I.getBoundingClientRect(),be=me.width,ie=me.height,J=8,ce=12,te=ne.innerHeight-oe.bottom-ce,he=oe.top-ce,we=ie>te&&he>te,Ce=we?"top":"bottom";let Ve=we?oe.top-ie-J:oe.bottom+J;Ve<ce&&(Ve=ce),Ve+ie>ne.innerHeight-ce&&(Ve=Math.max(ce,ne.innerHeight-ie-ce));let Xe=oe.left;Xe+be>ne.innerWidth-ce&&(Xe=ne.innerWidth-be-ce),Xe<ce&&(Xe=ce),T(Ce),w({top:Ve,left:Xe})}S.useLayoutEffect(()=>{m&&z()},[m,g]),S.useEffect(()=>{var ne;if(!m)return;const V=((ne=A.current)==null?void 0:ne.ownerDocument.defaultView)||window;function I(){z()}return V.addEventListener("resize",I),V.addEventListener("scroll",I,!0),()=>{V.removeEventListener("resize",I),V.removeEventListener("scroll",I,!0)}},[m,g]),S.useEffect(()=>{var oe;const V=((oe=k.current)==null?void 0:oe.ownerDocument)||document;function I(me){var ce,te;const be=me.target,ie=(ce=k.current)==null?void 0:ce.contains(be),J=(te=_.current)==null?void 0:te.contains(be);!ie&&!J&&(p(!1),v(c))}function ne(me){me.key==="Escape"&&(p(!1),v(c))}return V.addEventListener("mousedown",I),V.addEventListener("keydown",ne),()=>{V.removeEventListener("mousedown",I),V.removeEventListener("keydown",ne)}},[c]);const U=x.getFullYear(),L=x.getMonth(),D=sN(U,L),H=iN(U,L),M=lN(U),O=Array.from({length:12},(V,I)=>M+I),$=[];for(let V=0;V<H;V+=1)$.push(null);for(let V=1;V<=D;V+=1)$.push(V);function Z(){if(g==="day"){b(new Date(U,L-1,1));return}if(g==="month"){b(new Date(U-1,L,1));return}b(new Date(U-12,L,1))}function ue(){if(g==="day"){b(new Date(U,L+1,1));return}if(g==="month"){b(new Date(U+1,L,1));return}b(new Date(U+12,L,1))}function de(){if(c==="month"){v(g==="month"?"year":"month");return}if(g==="day"){v("month");return}if(g==="month"){v("year");return}v("day")}function ye(V){const I=new Date(U,L,V);a(kv(I)),p(!1),v("day")}function Y(V){if(c==="month"){a(`${U}-${String(V+1).padStart(2,"0")}`),b(new Date(U,V,1)),p(!1),v("month");return}b(new Date(U,V,1)),v("day")}function le(V){b(new Date(V,L,1)),v("month")}function Q(){const V=new Date;b(V),a(c==="month"?`${V.getFullYear()}-${String(V.getMonth()+1).padStart(2,"0")}`:kv(V)),v(c),p(!1)}function G(){return g==="day"?`${U}年 ${L+1}月`:g==="month"?`${U}年`:`${M} - ${M+11}`}const ae=m?o.jsxs("div",{ref:_,className:`date-picker-popover date-picker-popover-${N}`,style:{top:E.top,left:E.left},children:[o.jsxs("div",{className:"date-picker-header",children:[o.jsx("button",{type:"button",className:"date-picker-nav-button",onClick:Z,"aria-label":"上一页",children:o.jsx(HC,{size:17,strokeWidth:1.7})}),o.jsx("button",{type:"button",className:"date-picker-title-button",onClick:de,children:G()}),o.jsx("button",{type:"button",className:"date-picker-nav-button",onClick:ue,"aria-label":"下一页",children:o.jsx(qC,{size:17,strokeWidth:1.7})})]}),g==="day"&&o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"date-picker-weekdays",children:tN.map(V=>o.jsx("div",{children:V},V))}),o.jsx("div",{className:"date-picker-grid",children:$.map((V,I)=>{if(V===null)return o.jsx("div",{},`empty-${I}`);const ne=new Date(U,L,V),oe=d?Mv(ne,d):!1,me=Mv(ne,new Date);return o.jsx("button",{type:"button",className:["date-picker-day",oe?"date-picker-day-selected":"",me&&!oe?"date-picker-day-today":""].filter(Boolean).join(" "),onClick:()=>ye(V),children:V},`${U}-${L}-${V}`)})})]}),g==="month"&&o.jsx("div",{className:"date-picker-month-grid",children:nN.map((V,I)=>{const ne=d&&d.getFullYear()===U&&d.getMonth()===I,oe=new Date().getFullYear()===U&&new Date().getMonth()===I;return o.jsx("button",{type:"button",className:["date-picker-month-item",ne?"date-picker-month-item-selected":"",oe&&!ne?"date-picker-month-item-current":""].filter(Boolean).join(" "),onClick:()=>Y(I),children:V},V)})}),g==="year"&&o.jsx("div",{className:"date-picker-year-grid",children:O.map(V=>{const I=d&&d.getFullYear()===V,ne=new Date().getFullYear()===V;return o.jsx("button",{type:"button",className:["date-picker-year-item",I?"date-picker-year-item-selected":"",ne&&!I?"date-picker-year-item-current":""].filter(Boolean).join(" "),onClick:()=>le(V),children:V},V)})}),o.jsx("div",{className:"date-picker-footer",children:o.jsx("button",{type:"button",className:"date-picker-today-button",onClick:Q,children:c==="month"?"回到本月":"回到今天"})})]}):null;return o.jsxs(o.Fragment,{children:[o.jsxs("div",{ref:k,className:"date-picker",children:[s&&o.jsx("label",{id:`${h}-label`,className:"date-picker-label",children:s}),o.jsxs("button",{ref:A,type:"button",disabled:l,className:`date-picker-trigger ${m?"date-picker-trigger-open":""}`,onClick:()=>{l||p(V=>{const I=!V;return I&&v(c),I})},"aria-expanded":m,"aria-labelledby":s?`${h}-label ${h}-value`:void 0,"aria-label":s?void 0:c==="month"?"选择月份":"选择日期",children:[o.jsx("span",{id:`${h}-value`,className:d?"":"date-picker-placeholder",children:d?c==="month"?`${d.getFullYear()} / ${String(d.getMonth()+1).padStart(2,"0")}`:aN(d):c==="month"?"选择月份":"选择日期"}),o.jsx(UC,{className:"date-picker-calendar-icon",size:16,strokeWidth:1.7})]})]}),ae&&Xf.createPortal(ae,((C=k.current)==null?void 0:C.ownerDocument.body)||document.body)]})}const e0=`/* Generated from tools/experiments/production_message/production_assistant_demo/src/index.css and App.css.\r
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
`,t0=`/* Shared controls: normal typography, neutral focus and unobtrusive scrollbars. */\r
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
`,oN=`<!doctype html>\r
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
`,n0=""+new URL("Inter-VF2RPR_K.ttf",import.meta.url).href,r0=""+new URL("NotoSansSC-Dz1u1FRy.ttf",import.meta.url).href,Qi=new Map;function cN(n,a,s=!1){const l=JSON.stringify([n,a]),c=`daily-field-cache-v1:${l}`;let h=s?void 0:Qi.get(l);if(!h&&!s)try{const d=JSON.parse(localStorage.getItem(c)||"null");d&&Array.isArray(d.metrics)&&d.metrics.every(m=>m&&typeof m.id=="string"&&typeof m.name=="string")&&(h=Promise.resolve(d),Qi.set(l,h))}catch{}return h||(h=fe("daily.getProperties",{id:n,sourceId:a}).then(d=>{try{localStorage.setItem(c,JSON.stringify(d))}catch{}return d}).catch(d=>{throw Qi.delete(l),d}),Qi.set(l,h)),h}function uN(n=!1){if(Qi.clear(),n)try{Object.keys(localStorage).filter(a=>a.startsWith("daily-field-cache-v1:")).forEach(a=>localStorage.removeItem(a))}catch{}}const Pl=[0,-1,-2].flatMap(n=>[{granularity:"day",key:n===0?"today":`day${n}`,label:n===0?"今日":`${n===-1?"去年":"前年"}同日`},{granularity:"mtd",key:n===0?"mtd":n===-1?"lastmonth":"mtd-2",label:n===0?"本月累计":`${n===-1?"去年":"前年"}同期月累计`},{granularity:"ytd",key:n===0?"ytd":n===-1?"last":"ytd-2",label:n===0?"本年累计":`${n===-1?"去年":"前年"}同期`},{granularity:"fullyear",key:n===0?"fullyear":n===-1?"full":"full-2",label:`${n===0?"今年":n===-1?"去年":"前年"}全年`}].map(a=>({key:a.key,label:a.label,spec:{granularity:a.granularity,yearOffset:n}}))),a0={"system.date":'today("yyyy年M月d日")',"system.year":'today("yyyy年")',"system.month":'today("M月")',"system.day":'today("d日")'};function dN(n){return a0[n]||n}function Rv(n){const a=[[]];function s(c){c.replace(/\u00a0/g," ").split(`
`).forEach((h,d)=>{var p;if(d&&a.push([]),!h)return;const m=a.at(-1);((p=m.at(-1))==null?void 0:p.type)==="text"?m.at(-1).text+=h:m.push({type:"text",text:h})})}function l(c){var h;if(c.nodeType===3){s(c.textContent||"");return}if(c instanceof n.ownerDocument.defaultView.HTMLElement){if(c.dataset.key){const d=dN(c.dataset.key);a.at(-1).push({type:d.startsWith("today(")?"dateToken":"fieldToken",attrs:{placeholder:d,label:c.textContent||"",...c.dataset.legacySpec?{dateRangeSpec:JSON.parse(c.dataset.legacySpec)}:{}}});return}if(c.tagName==="BR"){s(`
`);return}c!==n&&["DIV","P"].includes(c.tagName)&&c.childNodes.length===1&&((h=c.firstChild)==null?void 0:h.nodeName)==="BR"||Array.from(c.childNodes).forEach((d,m)=>{m&&d.nodeType===1&&["DIV","P"].includes(d.tagName)&&s(`
`),l(d)})}}return l(n),{text:a.map(c=>c.map(h=>h.type==="text"?h.text:h.attrs.placeholder).join("")).join(`
`),document:JSON.stringify({type:"doc",content:a.map(c=>({type:"paragraph",content:c}))})}}function fN(n,a,s,l){const c=[...s,...Object.entries(a0).map(([d,m])=>({key:m,label:d==="system.date"?"业务日期":d==="system.year"?"业务年份":d==="system.month"?"业务月份":"业务日",metric:"date",scope:"date",keywords:"",field:void 0}))].filter(d=>d.field||d.metric==="date").sort((d,m)=>m.key.length-d.key.length);let h=a;for(;h;){const d=c.map(m=>({d:m,index:h.indexOf(m.key)})).filter(m=>m.index>=0).sort((m,p)=>m.index-p.index)[0];if(!d){n.append(n.ownerDocument.createTextNode(h));break}d.index&&n.append(n.ownerDocument.createTextNode(h.slice(0,d.index))),n.append(l(d.d)),h=h.slice(d.index+d.d.key.length)}}function hN(n,a,s,l){if(!a)return!1;let c;try{c=JSON.parse(a)}catch{return!1}if(c.type!=="doc")return!1;function h(d){var m,p,g,v;if(d.type==="text"){n.append(n.ownerDocument.createTextNode(d.text||""));return}if(d.type==="hardBreak"){n.append(n.ownerDocument.createTextNode(`
`));return}if(d.type==="fieldToken"||d.type==="dateToken"){const x=((m=d.attrs)==null?void 0:m.placeholder)||"";let b=s.find(w=>w.key===x);b||(b={key:x,label:d.type==="dateToken"?"业务日期":((p=d.attrs)==null?void 0:p.label)||"已有数据",metric:d.type==="dateToken"?"date":"legacy",scope:"legacy",keywords:((g=d.attrs)==null?void 0:g.label)||""},s.push(b));const E=l(b);(v=d.attrs)!=null&&v.dateRangeSpec&&(E.dataset.legacySpec=JSON.stringify(d.attrs.dateRangeSpec)),n.append(E);return}(d.content||[]).forEach((x,b)=>{d.type==="doc"&&b&&n.append(n.ownerDocument.createTextNode(`
`)),h(x)})}return h(c),!0}function i0({id:n,back:a,changed:s,openSettings:l}){const c=S.useRef(null),[h,d]=S.useState("");return S.useEffect(()=>{let m=!1;const p=c.current;return fe("daily.get",{id:n}).then(g=>{if(m)return;const v=mN(g,{back:a,changed:s,openSettings:l});p.dailyRuntime=v,p.srcdoc=oN.replace("../../src/ProductionAssistant.App/Assets/Fonts/Inter.ttf",new URL(n0,window.location.href).href).replace("../../src/ProductionAssistant.App/Assets/Fonts/NotoSansSC.ttf",new URL(r0,window.location.href).href)}).catch(g=>{m||d(String(g.message||g))}),()=>{var g;m=!0,(g=p.dailyRuntime)==null||g.dispose()}},[n]),o.jsxs("div",{className:"message-template-host",children:[h&&o.jsx("p",{role:"alert",children:h}),o.jsx("iframe",{ref:c,title:"日报消息模板"})]})}function mN(n,a){var L;let s=!1,l=!1,c,h,d=Promise.resolve(),m=0,p;const g=new Date,v=n.fields.map(D=>{var H,M,O;return{key:D.placeholder,label:D.label.replace(" · ",""),metric:`${D.databaseId||((H=D.binding)==null?void 0:H.dataSourceId)}:${D.businessId||((M=D.binding)==null?void 0:M.businessMetricId)}`,scope:((O=Pl.find($=>JSON.stringify($.spec)===JSON.stringify(D.dateRangeSpec)))==null?void 0:O.key)||"legacy",keywords:D.label,field:D}}),x=[];let b=(L=n.metricSourceIds)!=null&&L.length?n.metricSourceIds:[...new Set(n.fields.map(D=>{var H;return D.databaseId||((H=D.binding)==null?void 0:H.dataSourceId)}).filter(Boolean))];const E=new Map(n.fields.map(D=>[D.placeholder,D])),w=new Map;function N(D){const H=h==null?void 0:h.querySelector("#preview-status");H&&(H.textContent=D)}function T(){h==null||h.querySelectorAll("[data-send]").forEach(D=>D.disabled=l||!n.notificationConfigured)}async function A(D){D.text===n.draftTemplate&&D.document===n.draftTemplateDocument||(await fe("daily.saveTemplate",{id:z,...D}),n.draftTemplate=D.text,n.draftTemplateDocument=D.document)}async function k(){var D;try{const H=await fe("daily.get",{id:z});if(s)return;n.notificationConfigured=H.notificationConfigured,n.sources=H.sources,T(),(D=h==null?void 0:h.querySelector("[data-notification-notice]"))==null||D.toggleAttribute("hidden",!!n.notificationConfigured),await _()}catch(H){N(String(H))}}async function _(){var H;const D=await Promise.allSettled(b.map(async M=>({sourceId:M,metrics:(await cN(z,M)).metrics})));if(!s){v.splice(0,v.length,...v.filter(M=>M.field)),x.length=0;for(const M of D)if(M.status==="fulfilled")for(const O of M.value.metrics){const $=`${M.value.sourceId}:${O.id}`;x.push([$,O.name,O.name,0]);const Z=O.granularity==="monthly"?[{key:"month",label:"本月"}]:Pl;for(const ue of Z)v.push({key:`${$}:${ue.key}`,metric:$,scope:ue.key,label:O.granularity==="monthly"?O.name:ue.label+O.name,keywords:O.name+" "+ue.label+" "+(((H=n.sources.find(de=>de.id===M.value.sourceId))==null?void 0:H.name)||""),sourceId:M.value.sourceId,metricId:O.id});for(const ue of v.filter(de=>de.metric===$&&de.field))ue.sourceId=M.value.sourceId,ue.metricId=O.id}D.some(M=>M.status==="rejected")?N("部分指标目录读取失败，请到系统设置刷新数据库。"):b.length||N("请在右上角任务设置中配置本任务的指标范围。")}}const z=n.id,U={dirty(){m++,p=void 0},id:z,name:n.name,sendTime:n.sendTime,businessDate:`${g.getFullYear()}-${String(g.getMonth()+1).padStart(2,"0")}-${String(g.getDate()).padStart(2,"0")}`,definitions:v,metrics:x,value:D=>{var H,M,O;return D.metric==="date"?"业务日期":((H=p==null?void 0:p.fieldValues)==null?void 0:H[D.key])||((O=p==null?void 0:p.fieldValues)==null?void 0:O[((M=v.find($=>$.field&&$.metric===D.metric&&$.scope===D.scope))==null?void 0:M.key)||""])||""},mount:(D,H)=>{hN(D,n.draftTemplateDocument,v,H)||fN(D,n.draftTemplate,v,H)},async materialize(D){var ue;if(D.field||D.metric==="date")return D;const H=v.find(de=>de.metric===D.metric&&de.sourceId),M=D.sourceId||(H==null?void 0:H.sourceId),O=D.metricId||(H==null?void 0:H.metricId);if(!M||!O)throw new Error("此字段缺少可用的指标定义，请在任务设置中刷新指标。");const $=JSON.stringify([M,O,D.scope,D.label]);let Z=w.get($);return Z||(Z=fe("daily.addField",{id:z,sourceId:M,metricId:O,placeholder:"",displayName:D.label,...D.scope==="month"?{rangeKind:"current-month"}:{dateRangeSpec:(ue=Pl.find(de=>de.key===D.scope))==null?void 0:ue.spec}}).then(({field:de})=>{E.set(de.placeholder,de);const ye={...D,key:de.placeholder,field:de,sourceId:M,metricId:O};return v.some(Y=>Y.key===ye.key)||v.push(ye),a.changed(),ye}).catch(de=>{throw w.delete($),de}),w.set($,Z)),Z},save(D){const H=Rv(D),M=d.catch(()=>{}).then(()=>s?void 0:A(H));return d=M,M},preview(D,H){const M=Rv(D),O=++m,$=d.catch(()=>{}).then(async()=>{if(s||O!==m)return{succeeded:!1,text:"",message:"内容已修改，请重新生成预览",errors:[]};await A(M);const Z=await fe("daily.preview",{id:z,businessDate:H},12e4),ue={...Z,errors:Z.fieldErrors||[],message:Z.succeeded?"已生成 · "+H:Z.message};return O===m&&!s&&(p=ue),ue});return d=$,$},async send(D,H,M){if(!l){if(!n.notificationConfigured)throw new Error("请先在系统设置中配置通知渠道。");l=!0,T();try{await U.save(D);const O=await fe(H==="test"?"daily.test":"daily.sendToday",H==="test"?{id:z,businessDate:M}:{id:z},12e4);if(!O.succeeded)throw new Error(O.message||"发送失败，请查看运行记录");N(O.alreadySent?"今日当前内容已发送":H==="test"?"测试发送成功":"今日消息已发送"),a.changed()}finally{l=!1,T()}}},configureAdvanced(D,H){const M=v.some(Z=>Z.metric===D&&Z.scope==="month"),O=M?[{key:"month",label:"本月计划"}]:[{key:"day",label:"日（业务日当天）"},{key:"mtd",label:"月累计（月初至业务日）"},{key:"ytd",label:"年累计（年初至业务日）"},{key:"fullyear",label:"全年"}];H.replaceChildren(...O.map(Z=>new Option(Z.label,Z.key)));const $=H.ownerDocument.querySelector("#scope-year");$&&($.disabled=M,$.value="0")},resolveAdvanced(D,H){return D==="month"?"month":Pl.find(M=>M.spec.granularity===D&&M.spec.yearOffset===Number(H)).key},async saveBasics(D,H){const M=Array.from((h==null?void 0:h.querySelectorAll("[data-context-source]:checked"))||[]).map(O=>O.value);await fe("daily.saveBasics",{id:z,name:D,sendTime:H,metricSourceIds:M}),n.name=D,n.sendTime=H,b=M,U.name=D,await _(),a.changed()},connect(D){var Q;h=D,D.title=n.name,D.querySelector("#runs p").textContent="";const H=D.querySelector("header > span");H.removeAttribute("aria-hidden"),H.setAttribute("role","button"),H.setAttribute("tabindex","0"),H.setAttribute("aria-label","返回任务列表");const M=async()=>{const G=D.querySelector("#editor");G.contentEditable="false",m++;try{await U.save(G),a.back()}catch(ae){N(String(ae)),G.contentEditable="true"}};H.addEventListener("click",M),H.addEventListener("keydown",G=>{G.key==="Enter"&&M()});const O=D.querySelector("#settings"),$=D.createElement("fieldset");$.style.cssText="border:0;padding:0;max-height:180px;overflow:auto";const Z=D.createElement("legend");Z.textContent="本任务的指标范围",$.append(Z);for(const G of n.sources){const ae=D.createElement("label");ae.style.cssText="display:flex;gap:8px;margin:8px 0";const C=D.createElement("input");C.type="checkbox",C.value=G.id,C.dataset.contextSource="",C.checked=b.includes(G.id),C.style.width="auto",ae.append(C,D.createTextNode(G.name)),$.append(ae)}(Q=O.querySelector("p"))==null||Q.replaceWith($);const ue=D.createElement("button");ue.textContent="数据库设置",ue.type="button",ue.onclick=()=>{var G;O.close(),(G=a.openSettings)==null||G.call(a)},$.after(ue);const de=D.querySelector("footer");for(const[G,ae]of[["test","测试发送"],["today","发送今日消息"]]){const C=D.createElement("button");C.textContent=ae,C.dataset.send=G,C.onclick=async()=>{const V=D.querySelector("#editor");V.contentEditable="false";try{await U.send(V,G,D.querySelector("#date").value)}catch(I){N(String(I))}finally{V.contentEditable="true"}},de.append(C)}const ye=D.createElement("style");ye.textContent=e0+`
`+t0+`
body{font-family:var(--font-ui)}#date-picker{width:154px}`,D.head.append(ye);const Y=D.createElement("span");Y.className="production-message-demo",Y.hidden=!0,D.body.append(Y),c=hf.createRoot(D.querySelector("#date-picker")),c.render(o.jsx(pN,{input:D.querySelector("#date")})),window.addEventListener("production-settings-updated",k);const le=D.querySelector("#runs");if(le.ontoggle=async()=>{if(!le.open)return;const G=le.querySelector("p");G.textContent="正在读取…";try{const ae=await fe("daily.runs",{id:z});G.textContent=ae.runs.length?"":"暂无运行记录";for(const C of ae.runs){const V=D.createElement("div");V.textContent=`${C.time} · ${C.status} · ${C.businessDate}${C.error?" · "+C.error:""}`,G.append(V)}}catch(ae){G.textContent=String(ae)}},!n.notificationConfigured){const G=D.createElement("div");G.className="notice",G.dataset.notificationNotice="",G.append(D.createTextNode("通知渠道尚未配置。 "));const ae=D.createElement("button");ae.textContent="通知设置",ae.onclick=a.openSettings||null,G.append(ae),D.querySelector("#message").before(G)}T(),_().catch(G=>N(String(G)))},dispose(){s=!0,m++,c==null||c.unmount(),window.removeEventListener("production-settings-updated",k)}};return U}function pN({input:n}){const[a,s]=S.useState(n.value);return o.jsx(Gt,{value:a,onChange:l=>{var c;s(l),n.value=l,n.dispatchEvent(new(((c=n.ownerDocument.defaultView)==null?void 0:c.Event)||Event)("change",{bubbles:!0}))}})}const gN=`<!doctype html>
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
`,Ov=()=>{const n=new Date;return n.setDate(n.getDate()-1),`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`};function s0({id:n,...a}){const s=S.useRef(null),[l,c]=S.useState("");return S.useEffect(()=>{let h=!1,d;const m=s.current;return c(""),fe("notionFill.get",{id:n}).then(p=>{h||(d=yN(p,a),m.onload=()=>{var g;!h&&((g=m.contentDocument)!=null&&g.getElementById("date-picker"))&&d.connect(m.contentDocument)},m.srcdoc=gN.replace("../../src/ProductionAssistant.App/Assets/Fonts/Inter.ttf",new URL(n0,window.location.href).href).replace("../../src/ProductionAssistant.App/Assets/Fonts/NotoSansSC.ttf",new URL(r0,window.location.href).href))}).catch(p=>{h||c(String(p.message||p))}),()=>{h=!0,m.onload=null,d==null||d.dispose()}},[n]),o.jsxs("div",{className:"message-template-host",children:[l&&o.jsx("p",{role:"alert",children:l}),o.jsx("iframe",{ref:s,title:"原材料自动入库"})]})}function yN(n,a){let s={...n,runTime:n.runTime||"00:00"},l,c,h=!1,d=!1,m=0,p=0,g=Ov(),v,x=s.isEnabled;const b=G=>l.getElementById(G),E=G=>b(G),w=G=>b(G),N=G=>b(G),T=G=>G instanceof Error?G.message:String(G),A=G=>G.toLocaleString("zh-CN",{minimumFractionDigits:3,maximumFractionDigits:3});function k(G,ae=!1){b("feedback").textContent=G,b("feedback").className=ae?"callout error":""}function _(){return!!(s.sourcePageUrl&&s.username&&s.passwordConfigured)}function z(){c==null||c.render(o.jsx(Gt,{value:g,disabled:d,onChange:D}))}function U(){for(const G of["preview","source-test","yesterday","settings-open","back","confirm-run"])w(G).disabled=d;w("preview").disabled=d||!_()||!s.notionConfigured,w("source-test").disabled=d||!_(),w("run").disabled=d||!v,l.querySelectorAll("#settings button, #settings input").forEach(G=>G.disabled=d),w("toggle").disabled=d||!s.schedulingAvailable,w("preview").textContent=d?"处理中…":"生成预览",b("name").textContent=s.name,b("enabled").textContent=s.isEnabled?s.schedulerInstalled?"已启用":"计划异常":"未启用",b("target-name").textContent=s.targetDataSourceName,b("settings-target-name").textContent=s.targetDataSourceName,E("password").placeholder=s.passwordConfigured?"已保存；留空不修改":"请输入 93 系统密码",z()}function L(G="尚未生成预览"){m++,v=void 0,b("source-empty").hidden=!1,b("source-values").hidden=!0,b("source-error").hidden=!0,b("record").hidden=!0,b("target-status").hidden=!0,b("target-empty").hidden=!1,b("target-empty").querySelector("strong").textContent=G,b("target-empty").querySelector("span").textContent="预览只读取数据，不会新增记录",w("run").textContent="执行本日期",w("run").disabled=!0,N("confirm").open&&N("confirm").close()}function D(G){d||(g=G,E("date").value=G,L("待重新预览"),k(""),z())}function H(G){b("source-empty").hidden=!0,b("source-values").hidden=!1;for(const[ae,C]of[["plate",G.plateWeight],["section",G.sectionWeight],["total",G.totalWeight]])b(ae).textContent=A(C)}function M(G){H(G),b("target-empty").hidden=!0,b("record").hidden=!1,b("record-title").textContent=`${G.businessDate} 入库`,b("record-date").textContent=G.businessDate,b("record-plate").textContent=`${A(G.plateWeight)} 吨`,b("record-section").textContent=`${A(G.sectionWeight)} 吨`,b("target-status").hidden=!1,b("target-status").textContent=G.targetRecordExists?"该日期已有记录，无需新增。":"可新增 1 条入库记录。",w("run").textContent=G.targetRecordExists?"验证查重":"执行本日期"}function O(G){b("run-count").textContent=G.length?`· ${G.length}`:"";const ae=G.map(C=>{const V=l.createElement("div");V.className="run";const I=l.createElement("span");I.textContent={"source-test":"93 测试",test:"只读预览",manual:"手动执行",automatic:"自动执行"}[C.source]||C.source;const ne=l.createElement("div");ne.textContent=C.error||C.message||(C.status==="created"?"已新增":C.status==="failed"?"执行失败":"已检查"),C.status==="failed"&&(ne.style.color="#B91C1C");const oe=l.createElement("p");oe.textContent=C.status==="failed"?C.businessDate:`${C.businessDate} · 板材 ${A(C.plateWeight)} 吨 · 型材 ${A(C.sectionWeight)} 吨`,ne.append(oe);const me=l.createElement("small");return me.textContent=C.time,V.append(I,ne,me),V});b("runs-body").replaceChildren(...ae),G.length||(b("runs-body").textContent="暂无运行记录")}async function $(){const G=++p;try{const ae=await fe("notionFill.runs",{id:s.id});!h&&G===p&&O(ae.runs)}catch(ae){!h&&G===p&&(b("runs-body").textContent=`运行记录读取失败：${T(ae)}；重新展开可重试。`)}}function Z(){Promise.resolve(a.changed()).catch(()=>{})}async function ue(G){if(d||!g)return;d=!0,L("正在读取…");const ae=m;U(),k("");try{const C=await fe(G?"notionFill.testSource":"notionFill.test",{id:s.id,businessDate:g},12e4);if(h||ae!==m)return;if(!C.succeeded)throw new Error(C.message||"读取失败");G?(H(C),b("target-empty").querySelector("strong").textContent="尚未检查 Notion",b("target-empty").querySelector("span").textContent="点击“生成预览”完成读取与查重"):(s.validated=!0,v=C,M(C)),Z()}catch(C){if(h||ae!==m)return;L("本次预览未完成"),b("source-error").hidden=!1,b("source-error").textContent=T(C)}finally{h||(d=!1,U(),$())}}async function de(){if(d||!v||!N("confirm").open)return;const G=v.businessDate;N("confirm").close(),d=!0,U(),k("");try{const ae=await fe("notionFill.runNow",{id:s.id,businessDate:G},12e4);if(h)return;if(!ae.succeeded)throw new Error(ae.message||"执行失败");v={...v,targetRecordExists:!0},b("target-status").textContent=ae.message,w("run").textContent="验证查重",k(ae.created?"Notion 写入成功。":"该日期已有记录，本次已跳过。"),Z()}catch(ae){h||(L("执行未完成，请重新预览"),k(T(ae),!0))}finally{h||(d=!1,U(),$())}}function ye(){return E("task-name").value.trim()!==s.name||E("url").value.trim().replace(/\/+$/,"")!==s.sourcePageUrl||E("username").value.trim()!==s.username||!!E("password").value}function Y(){w("toggle").setAttribute("aria-checked",String(x)),b("schedule-hint").textContent=s.schedulingAvailable?ye()?"配置已修改：保存后需重新预览，再启用。":s.isEnabled&&!s.schedulerInstalled?s.schedulerMessage:s.validated?"只读预览已通过，可以启用定时入库。":"完成一次“生成预览”后可启用。":"当前运行环境不支持定时启停，预览与手动执行仍可使用。"}async function le(G){if(G.preventDefault(),d)return;const ae=E("task-name").value.trim(),C=E("username").value.trim();if(!ae||!C){b("settings-note").textContent="任务名称和用户名不能为空。";return}const V=ye(),I=E("run-time").value;if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(I)){b("settings-note").textContent="请选择有效的执行时间。";return}const ne=V||I!==s.runTime,oe=V?!1:x;let me=!1;d=!0,U();try{if(ne){const ie=E("url").value.trim().replace(/\/+$/,""),J=E("password").value;if(await fe("notionFill.save",{id:s.id,name:ae,sourcePageUrl:ie,username:C,password:J,runTime:I}),h)return;me=!0,s={...s,name:ae,sourcePageUrl:ie,username:C,runTime:I,passwordConfigured:s.passwordConfigured||!!J,isEnabled:V?!1:s.isEnabled,validated:V?!1:s.validated},E("password").value="",V&&L("配置已修改，请重新预览")}if(oe!==s.isEnabled){const ie=await fe("automation.setEnabled",{id:s.id,taskType:"notion_fill",enabled:oe});if(h)return;if(s.isEnabled=ie.enabled,ie.enabled!==oe)throw new Error(ie.message||"定时任务状态未更新");me=!0}const be=await fe("notionFill.get",{id:s.id});if(h)return;s=be,N("settings").close(),k(V?"配置已保存，请重新预览后启用。":"任务设置已保存。")}catch(be){h||(b("settings-note").textContent=`${me?"设置已更新，但后续操作失败：":""}${T(be)}`)}finally{h||(d=!1,x=s.isEnabled,U(),Y(),me&&Z())}}async function Q(){if(d||h)return;const G=m;try{const ae=await fe("notionFill.get",{id:s.id});if(h||d||G!==m)return;s=ae,L("系统设置已更新，请重新预览"),U(),k(s.notionConfigured?"系统设置已更新，点击“生成预览”读取数据。":"Notion 连接尚未配置，仍可仅测试 93 读取。")}catch(ae){h||k(T(ae),!0)}}return{connect(G){c==null||c.unmount(),l=G;const ae=l.createElement("style");ae.textContent=e0+`
`+t0+`
body{color:#292524}#date-picker{width:163px;display:inline-block}`,l.head.append(ae);const C=l.createElement("span");C.className="production-message-demo",C.hidden=!0,l.body.append(C),c=hf.createRoot(b("date-picker")),E("date").value=g,E("date").onchange=()=>D(E("date").value),w("yesterday").onclick=()=>D(Ov()),w("preview").onclick=()=>{ue(!1)},w("source-test").onclick=()=>{ue(!0)},w("back").onclick=a.back,w("run").onclick=()=>{d||!v||(b("confirm-title").textContent=v.targetRecordExists?"验证查重":"执行本日期",b("confirm-copy").textContent=v.targetRecordExists?`${v.businessDate} 已有记录，本次执行应跳过。`:`将向“${s.targetDataSourceName}”新增 ${v.businessDate} 的记录：板材 ${A(v.plateWeight)} 吨，型材 ${A(v.sectionWeight)} 吨。`,N("confirm").showModal())},w("confirm-run").onclick=()=>{de()},w("settings-open").onclick=()=>{E("task-name").value=s.name,E("url").value=s.sourcePageUrl,E("username").value=s.username,E("password").value="",E("run-time").value=s.runTime,E("password").required=!s.passwordConfigured,b("settings-note").textContent="修改名称或连接后，需重新预览并启用定时任务。",x=s.isEnabled,Y(),N("settings").showModal()},w("toggle").onclick=()=>{if(s.schedulingAvailable){if(!x&&(!s.validated||ye())){b("schedule-hint").textContent="请先保存配置并完成“生成预览”，再启用定时入库。";return}x=!x,Y()}};for(const V of["task-name","url","username","password"])E(V).oninput=()=>{ye()&&(x=!1),Y()};b("settings-form").onsubmit=V=>{le(V)},N("settings").onclose=()=>{E("password").value=""},N("settings").oncancel=V=>{d&&V.preventDefault()},l.querySelectorAll("[data-close]").forEach(V=>V.onclick=()=>{d||N(V.dataset.close).close()}),w("system-settings").hidden=!a.openSettings,w("system-settings").onclick=()=>{var V;N("settings").close(),(V=a.openSettings)==null||V.call(a)},l.querySelector(".runs").ontoggle=V=>{V.currentTarget.open&&$()},window.addEventListener("production-settings-updated",Q),L(),U(),_()?s.notionConfigured||k("Notion 连接尚未配置，请从任务设置打开系统设置；仍可仅测试 93 读取。"):k("请先在任务设置中补全 93 系统连接配置。")},dispose(){h=!0,m++,p++,c==null||c.unmount(),window.removeEventListener("production-settings-updated",Q)}}}var vN=Object.defineProperty,Ja=(n,a)=>vN(n,"name",{value:a,configurable:!0}),l0=!!(typeof window<"u"&&window.document&&window.document.createElement);function br(n,a,{checkForDefaultPrevented:s=!0}={}){return Ja(function(c){if(n==null||n(c),s===!1||!c||!c.defaultPrevented)return a==null?void 0:a(c)},"handleEvent")}Ja(br,"composeEventHandlers");function xN(n){var a;if(!l0)throw new Error("Cannot access window outside of the DOM");return((a=n==null?void 0:n.ownerDocument)==null?void 0:a.defaultView)??window}Ja(xN,"getOwnerWindow");function Jd(n){if(!l0)throw new Error("Cannot access document outside of the DOM");return(n==null?void 0:n.ownerDocument)??document}Ja(Jd,"getOwnerDocument");function o0(n,a=!1){const{activeElement:s}=Jd(n);if(!(s!=null&&s.nodeName))return null;if(c0(s)&&s.contentDocument)return o0(s.contentDocument.body,a);if(a){const l=s.getAttribute("aria-activedescendant");if(l){const c=Jd(s).getElementById(l);if(c)return c}}return s}Ja(o0,"getActiveElement");function c0(n){return n.tagName==="IFRAME"}Ja(c0,"isFrame");var bN=Object.defineProperty,Kf=(n,a)=>bN(n,"name",{value:a,configurable:!0});function Wd(n,a){if(typeof n=="function")return n(a);n!=null&&(n.current=a)}Kf(Wd,"setRef");function u0(...n){return a=>{let s=!1;const l=n.map(c=>{const h=Wd(c,a);return!s&&typeof h=="function"&&(s=!0),h});if(s)return()=>{for(let c=0;c<l.length;c++){const h=l[c];typeof h=="function"?h():Wd(n[c],null)}}}}Kf(u0,"composeRefs");function Wa(...n){return S.useCallback(u0(...n),n)}Kf(Wa,"useComposedRefs");var SN=Object.defineProperty,tn=(n,a)=>SN(n,"name",{value:a,configurable:!0});function jN(n,a){const s=S.createContext(a);s.displayName=n+"Context";const l=tn(h=>{const{children:d,...m}=h,p=S.useMemo(()=>m,Object.values(m));return o.jsx(s.Provider,{value:p,children:d})},"Provider");l.displayName=n+"Provider";function c(h,d={}){const{optional:m=!1}=d,p=S.useContext(s);if(p)return p;if(a!==void 0)return a;if(!m)throw new Error(`\`${h}\` must be used within \`${n}\``)}return tn(c,"useContext"),[l,c]}tn(jN,"createContext");function d0(n,a=[]){let s=[];function l(h,d){const m=S.createContext(d);m.displayName=h+"Context";const p=s.length;s=[...s,d];const g=tn(x=>{var A;const{scope:b,children:E,...w}=x,N=((A=b==null?void 0:b[n])==null?void 0:A[p])||m,T=S.useMemo(()=>w,Object.values(w));return o.jsx(N.Provider,{value:T,children:E})},"Provider");g.displayName=h+"Provider";function v(x,b,E={}){var A;const{optional:w=!1}=E,N=((A=b==null?void 0:b[n])==null?void 0:A[p])||m,T=S.useContext(N);if(T)return T;if(d!==void 0)return d;if(!w)throw new Error(`\`${x}\` must be used within \`${h}\``)}return tn(v,"useContext"),[g,v]}tn(l,"createContext");const c=tn(()=>{const h=s.map(d=>S.createContext(d));return tn(function(m){const p=(m==null?void 0:m[n])||h;return S.useMemo(()=>({[`__scope${n}`]:{...m,[n]:p}}),[m,p])},"useScope")},"createScope");return c.scopeName=n,[l,f0(c,...a)]}tn(d0,"createContextScope");function f0(...n){const a=n[0];if(n.length===1)return a;const s=tn(()=>{const l=n.map(c=>({useScope:c(),scopeName:c.scopeName}));return tn(function(h){const d=l.reduce((m,{useScope:p,scopeName:g})=>{const x=p(h)[`__scope${g}`];return{...m,...x}},{});return S.useMemo(()=>({[`__scope${a.scopeName}`]:d}),[d])},"useComposedScopes")},"createScope");return s.scopeName=a.scopeName,s}tn(f0,"composeContextScopes");var wr=globalThis!=null&&globalThis.document?S.useLayoutEffect:()=>{},wN=Object.defineProperty,EN=(n,a)=>wN(n,"name",{value:a,configurable:!0}),TN=ps[" useId ".trim().toString()]||(()=>{}),CN=0;function so(n){const[a,s]=S.useState(TN());return wr(()=>{n||s(l=>l??String(CN++))},[n]),n||(a?`radix-${a}`:"")}EN(so,"useId");var NN=Object.defineProperty,DN=(n,a)=>NN(n,"name",{value:a,configurable:!0}),zv=ps[" useEffectEvent ".trim().toString()],_v=ps[" useInsertionEffect ".trim().toString()];function h0(n){if(typeof zv=="function")return zv(n);const a=S.useRef(()=>{throw new Error("Cannot call an event handler while rendering.")});return typeof _v=="function"?_v(()=>{a.current=n}):wr(()=>{a.current=n}),S.useMemo(()=>((...s)=>{var l;return(l=a.current)==null?void 0:l.call(a,...s)}),[])}DN(h0,"useEffectEvent");var AN=Object.defineProperty,bs=(n,a)=>AN(n,"name",{value:a,configurable:!0}),kN=ps[" useInsertionEffect ".trim().toString()]||wr;function m0({prop:n,defaultProp:a,onChange:s=bs(()=>{},"onChange"),caller:l}){const[c,h,d]=p0({defaultProp:a,onChange:s}),m=n!==void 0,p=m?n:c,g=S.useCallback(v=>{var x;if(m){const b=g0(v)?v(n):v;b!==n&&((x=d.current)==null||x.call(d,b))}else h(v)},[m,n,h,d]);return[p,g]}bs(m0,"useControllableState");function p0({defaultProp:n,onChange:a}){const[s,l]=S.useState(n),c=S.useRef(s),h=S.useRef(a);return kN(()=>{h.current=a},[a]),S.useEffect(()=>{var d;c.current!==s&&((d=h.current)==null||d.call(h,s),c.current=s)},[s,c]),[s,l,h]}bs(p0,"useUncontrolledState");function g0(n){return typeof n=="function"}bs(g0,"isFunction");var Vv=Symbol("RADIX:SYNC_STATE");function MN(n,a,s,l){const{prop:c,defaultProp:h,onChange:d,caller:m}=a,p=c!==void 0,g=h0(d),v=[{...s,state:h}];l&&v.push(l);const[x,b]=S.useReducer((T,A)=>{if(A.type===Vv)return{...T,state:A.state};const k=n(T,A);return p&&!Object.is(k.state,T.state)&&g(k.state),k},...v),E=x.state,w=S.useRef(E);S.useEffect(()=>{w.current!==E&&(w.current=E,p||g(E))},[E,w,p]);const N=S.useMemo(()=>c!==void 0?{...x,state:c}:x,[x,c]);return S.useEffect(()=>{p&&!Object.is(c,x.state)&&b({type:Vv,state:c})},[c,x.state,p]),[N,b]}bs(MN,"useControllableStateReducer");var RN=Object.defineProperty,mn=(n,a)=>RN(n,"name",{value:a,configurable:!0});function Zf(n){const a=S.forwardRef((s,l)=>{let{children:c,...h}=s,d=null,m=!1;const p=[];Id(c)&&typeof Gl=="function"&&(c=Gl(c._payload)),S.Children.forEach(c,b=>{var E;if(b0(b)){m=!0;const w=b;let N="child"in w.props?w.props.child:w.props.children;Id(N)&&typeof Gl=="function"&&(N=Gl(N._payload)),d=zN(w,N),p.push((E=d==null?void 0:d.props)==null?void 0:E.children)}else p.push(b)}),d?d=S.cloneElement(d,void 0,p):!m&&S.Children.count(c)===1&&S.isValidElement(c)&&(d=c);const g=d?x0(d):void 0,v=Wa(l,g);if(!d){if(c||c===0)throw new Error(m?BN(n):VN(n));return c}const x=v0(h,d.props??{});return d.type!==S.Fragment&&(x.ref=l?v:g),S.cloneElement(d,x)});return a.displayName=`${n}.Slot`,a}mn(Zf,"createSlot");var y0=Symbol.for("radix.slottable");function ON(n){const a=mn(s=>"child"in s?s.children(s.child):s.children,"Slottable");return a.displayName=`${n}.Slottable`,a.__radixId=y0,a}mn(ON,"createSlottable");var zN=mn((n,a)=>{if("child"in n.props){const s=n.props.child;return S.isValidElement(s)?S.cloneElement(s,void 0,n.props.children(s.props.children)):null}return S.isValidElement(a)?a:null},"getSlottableElementFromSlottable");function v0(n,a){const s={...a};for(const l in a){const c=n[l],h=a[l];/^on[A-Z]/.test(l)?c&&h?s[l]=(...m)=>{const p=h(...m);return c(...m),p}:c&&(s[l]=c):l==="style"?s[l]={...c,...h}:l==="className"&&(s[l]=[c,h].filter(Boolean).join(" "))}return{...n,...s}}mn(v0,"mergeProps");function x0(n){var l,c;let a=(l=Object.getOwnPropertyDescriptor(n.props,"ref"))==null?void 0:l.get,s=a&&"isReactWarning"in a&&a.isReactWarning;return s?n.ref:(a=(c=Object.getOwnPropertyDescriptor(n,"ref"))==null?void 0:c.get,s=a&&"isReactWarning"in a&&a.isReactWarning,s?n.props.ref:n.props.ref||n.ref)}mn(x0,"getElementRef");function b0(n){return S.isValidElement(n)&&typeof n.type=="function"&&"__radixId"in n.type&&n.type.__radixId===y0}mn(b0,"isSlottable");var _N=Symbol.for("react.lazy");function Id(n){return n!=null&&typeof n=="object"&&"$$typeof"in n&&n.$$typeof===_N&&"_payload"in n&&S0(n._payload)}mn(Id,"isLazyComponent");function S0(n){return typeof n=="object"&&n!==null&&"then"in n}mn(S0,"isPromiseLike");var VN=mn(n=>`${n} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`,"createSlotError"),BN=mn(n=>`${n} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`,"createSlottableError"),Gl=ps[" use ".trim().toString()],LN=Object.defineProperty,UN=(n,a)=>LN(n,"name",{value:a,configurable:!0}),HN=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],Qr=HN.reduce((n,a)=>{const s=Zf(`Primitive.${a}`),l=S.forwardRef((c,h)=>{const{asChild:d,...m}=c,p=d?s:a;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),o.jsx(p,{...m,ref:h})});return l.displayName=`Primitive.${a}`,{...n,[a]:l}},{});function j0(n,a){n&&Xf.flushSync(()=>n.dispatchEvent(a))}UN(j0,"dispatchDiscreteCustomEvent");var qN=Object.defineProperty,YN=(n,a)=>qN(n,"name",{value:a,configurable:!0});function Xa(n){const a=S.useRef(n);return S.useEffect(()=>{a.current=n}),S.useMemo(()=>((...s)=>{var l;return(l=a.current)==null?void 0:l.call(a,...s)}),[])}YN(Xa,"useCallbackRef");var PN=Object.defineProperty,ft=(n,a)=>PN(n,"name",{value:a,configurable:!0}),ef="dismissableLayer.update",GN="dismissableLayer.pointerDownOutside",FN="dismissableLayer.focusOutside",Bv,w0=S.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set,dismissableSurfaces:new Set}),XN=S.forwardRef(ft(function(a,s){const{disableOutsidePointerEvents:l=!1,deferPointerDownOutside:c=!1,onEscapeKeyDown:h,onPointerDownOutside:d,onFocusOutside:m,onInteractOutside:p,onDismiss:g,...v}=a,x=S.useContext(w0),[b,E]=S.useState(null),w=(b==null?void 0:b.ownerDocument)??(globalThis==null?void 0:globalThis.document),[,N]=S.useState({}),T=Wa(s,E),A=Array.from(x.layers),[k]=[...x.layersWithOutsidePointerEventsDisabled].slice(-1),_=k?A.indexOf(k):-1,z=b?A.indexOf(b):-1,U=x.layersWithOutsidePointerEventsDisabled.size>0,L=z>=_,D=S.useRef(!1),H=T0(Z=>{d==null||d(Z),p==null||p(Z),Z.defaultPrevented||g==null||g()},{ownerDocument:w,deferPointerDownOutside:c,isDeferredPointerDownOutsideRef:D,dismissableSurfaces:x.dismissableSurfaces,shouldHandlePointerDownOutside:S.useCallback(Z=>{if(!(Z instanceof Node))return!1;const ue=[...x.branches].some(de=>de.contains(Z));return L&&!ue},[x.branches,L])}),M=C0(Z=>{if(c&&D.current)return;const ue=Z.target;[...x.branches].some(ye=>ye.contains(ue))||(m==null||m(Z),p==null||p(Z),Z.defaultPrevented||g==null||g())},w),O=b?z===A.length-1:!1,$=Xa(Z=>{Z.key==="Escape"&&(h==null||h(Z),!Z.defaultPrevented&&g&&(Z.preventDefault(),g()))});return S.useEffect(()=>{if(O)return w.addEventListener("keydown",$,{capture:!0}),()=>w.removeEventListener("keydown",$,{capture:!0})},[w,O,$]),S.useEffect(()=>{if(b)return l&&(x.layersWithOutsidePointerEventsDisabled.size===0&&(Bv=w.body.style.pointerEvents,w.body.style.pointerEvents="none"),x.layersWithOutsidePointerEventsDisabled.add(b)),x.layers.add(b),tf(),()=>{l&&(x.layersWithOutsidePointerEventsDisabled.delete(b),x.layersWithOutsidePointerEventsDisabled.size===0&&(w.body.style.pointerEvents=Bv))}},[b,w,l,x]),S.useEffect(()=>()=>{b&&(x.layers.delete(b),x.layersWithOutsidePointerEventsDisabled.delete(b),tf())},[b,x]),S.useEffect(()=>{const Z=ft(()=>N({}),"handleUpdate");return document.addEventListener(ef,Z),()=>document.removeEventListener(ef,Z)},[]),o.jsx(Qr.div,{...v,ref:T,style:{pointerEvents:U?L?"auto":"none":void 0,...a.style},onFocusCapture:br(a.onFocusCapture,M.onFocusCapture),onBlurCapture:br(a.onBlurCapture,M.onBlurCapture),onPointerDownCapture:br(a.onPointerDownCapture,H.onPointerDownCapture)})},"DismissableLayer"));function E0(){const n=S.useContext(w0),[a,s]=S.useState(null);return S.useEffect(()=>{if(a)return n.dismissableSurfaces.add(a),()=>{n.dismissableSurfaces.delete(a)}},[a,n.dismissableSurfaces]),s}ft(E0,"useDismissableLayerSurface");var $N=ft(()=>!0,"IS_TRUE");function T0(n,a){const{ownerDocument:s=globalThis==null?void 0:globalThis.document,deferPointerDownOutside:l=!1,isDeferredPointerDownOutsideRef:c,dismissableSurfaces:h,shouldHandlePointerDownOutside:d=$N}=a,m=Xa(n),p=S.useRef(!1),g=S.useRef(!1),v=S.useRef(new Map),x=S.useRef(()=>{});return S.useEffect(()=>{function b(){g.current=!1,c.current=!1,v.current.clear()}ft(b,"resetOutsideInteraction");function E(){return Array.from(v.current.values()).some(Boolean)}ft(E,"isOutsideInteractionIntercepted");function w(_){if(!g.current)return;const z=_.target;z instanceof Node&&[...h].some(L=>L.contains(z))||v.current.set(_.type,!0),_.type==="click"&&window.setTimeout(()=>{g.current&&x.current()},0)}ft(w,"handleInteractionCapture");function N(_){g.current&&v.current.set(_.type,!1)}ft(N,"handleInteractionBubble");const T=ft(_=>{if(_.target&&!p.current){let z=function(){s.removeEventListener("click",x.current);const L=E();b(),L||Qf(GN,m,U,{discrete:!0})};if(ft(z,"handleAndDispatchPointerDownOutsideEvent"),!d(_.target)){s.removeEventListener("click",x.current),b(),p.current=!1;return}const U={originalEvent:_};g.current=!0,c.current=l&&_.button===0,v.current.clear(),!l||_.button!==0?z():(s.removeEventListener("click",x.current),x.current=z,s.addEventListener("click",x.current,{once:!0}))}else s.removeEventListener("click",x.current),b();p.current=!1},"handlePointerDown"),A=["pointerup","mousedown","mouseup","touchstart","touchend","click"];for(const _ of A)s.addEventListener(_,w,!0),s.addEventListener(_,N);const k=window.setTimeout(()=>{s.addEventListener("pointerdown",T)},0);return()=>{window.clearTimeout(k),s.removeEventListener("pointerdown",T),s.removeEventListener("click",x.current);for(const _ of A)s.removeEventListener(_,w,!0),s.removeEventListener(_,N)}},[s,m,l,c,h,d]),{onPointerDownCapture:ft(()=>p.current=!0,"onPointerDownCapture")}}ft(T0,"usePointerDownOutside");function C0(n,a=globalThis==null?void 0:globalThis.document){const s=Xa(n),l=S.useRef(!1);return S.useEffect(()=>{const c=ft(h=>{h.target&&!l.current&&Qf(FN,s,{originalEvent:h},{discrete:!1})},"handleFocus");return a.addEventListener("focusin",c),()=>a.removeEventListener("focusin",c)},[a,s]),{onFocusCapture:ft(()=>l.current=!0,"onFocusCapture"),onBlurCapture:ft(()=>l.current=!1,"onBlurCapture")}}ft(C0,"useFocusOutside");function tf(){const n=new CustomEvent(ef);document.dispatchEvent(n)}ft(tf,"dispatchUpdate");function Qf(n,a,s,{discrete:l}){const c=s.originalEvent.target,h=new CustomEvent(n,{bubbles:!1,cancelable:!0,detail:s});a&&c.addEventListener(n,a,{once:!0}),l?j0(c,h):c.dispatchEvent(h)}ft(Qf,"handleAndDispatchCustomEvent");var KN=Object.defineProperty,Et=(n,a)=>KN(n,"name",{value:a,configurable:!0}),pd="focusScope.autoFocusOnMount",gd="focusScope.autoFocusOnUnmount",Lv={bubbles:!1,cancelable:!0},ZN=S.forwardRef(Et(function(a,s){const{loop:l=!1,trapped:c=!1,onMountAutoFocus:h,onUnmountAutoFocus:d,...m}=a,[p,g]=S.useState(null),v=Xa(h),x=Xa(d),b=S.useRef(null),E=Wa(s,g),w=S.useRef({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;S.useEffect(()=>{if(c){let T=function(z){if(w.paused||!p)return;const U=z.target;p.contains(U)?b.current=U:Fn(b.current,{select:!0})},A=function(z){if(w.paused||!p)return;const U=z.relatedTarget;U!==null&&(p.contains(U)||Fn(b.current,{select:!0}))},k=function(z){if(document.activeElement===document.body)for(const L of z)L.removedNodes.length>0&&Fn(p)};Et(T,"handleFocusIn"),Et(A,"handleFocusOut"),Et(k,"handleMutations"),document.addEventListener("focusin",T),document.addEventListener("focusout",A);const _=new MutationObserver(k);return p&&_.observe(p,{childList:!0,subtree:!0}),()=>{document.removeEventListener("focusin",T),document.removeEventListener("focusout",A),_.disconnect()}}},[c,p,w.paused]),S.useEffect(()=>{if(p){Uv.add(w);const T=document.activeElement;if(!p.contains(T)){const k=new CustomEvent(pd,Lv);p.addEventListener(pd,v),p.dispatchEvent(k),k.defaultPrevented||(N0(R0(Jf(p)),{select:!0}),document.activeElement===T&&Fn(p))}return()=>{p.removeEventListener(pd,v),setTimeout(()=>{const k=new CustomEvent(gd,Lv);p.addEventListener(gd,x),p.dispatchEvent(k),k.defaultPrevented||Fn(T??document.body,{select:!0}),p.removeEventListener(gd,x),Uv.remove(w)},0)}}},[p,v,x,w]);const N=S.useCallback(T=>{if(!l&&!c||w.paused)return;const A=T.key==="Tab"&&!T.altKey&&!T.ctrlKey&&!T.metaKey,k=document.activeElement;if(A&&k){const _=T.currentTarget,[z,U]=D0(_);z&&U?!T.shiftKey&&k===U?(T.preventDefault(),l&&Fn(z,{select:!0})):T.shiftKey&&k===z&&(T.preventDefault(),l&&Fn(U,{select:!0})):k===_&&T.preventDefault()}},[l,c,w.paused]);return o.jsx(Qr.div,{tabIndex:-1,...m,ref:E,onKeyDown:N})},"FocusScope"));function N0(n,{select:a=!1}={}){const s=document.activeElement;for(const l of n)if(Fn(l,{select:a}),document.activeElement!==s)return}Et(N0,"focusFirst");function D0(n){const a=Jf(n),s=nf(a,n),l=nf(a.reverse(),n);return[s,l]}Et(D0,"getTabbableEdges");function Jf(n){const a=[],s=document.createTreeWalker(n,NodeFilter.SHOW_ELEMENT,{acceptNode:Et(l=>{const c=l.tagName==="INPUT"&&l.type==="hidden";return l.disabled||l.hidden||c?NodeFilter.FILTER_SKIP:l.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP},"acceptNode")});for(;s.nextNode();)a.push(s.currentNode);return a}Et(Jf,"getTabbableCandidates");function nf(n,a){const s=typeof a.checkVisibility=="function"&&a.checkVisibility({checkVisibilityCSS:!0});for(const l of n)if(!(s?!l.checkVisibility({checkVisibilityCSS:!0}):A0(l,{upTo:a})))return l}Et(nf,"findVisible");function A0(n,{upTo:a}){if(getComputedStyle(n).visibility==="hidden")return!0;for(;n;){if(a!==void 0&&n===a)return!1;if(getComputedStyle(n).display==="none")return!0;n=n.parentElement}return!1}Et(A0,"isHidden");function k0(n){return n instanceof HTMLInputElement&&"select"in n}Et(k0,"isSelectableInput");function Fn(n,{select:a=!1}={}){if(n&&n.focus){const s=document.activeElement;n.focus({preventScroll:!0}),n!==s&&k0(n)&&a&&n.select()}}Et(Fn,"focus");var Uv=M0();function M0(){let n=[];return{add(a){const s=n[0];a!==s&&(s==null||s.pause()),n=rf(n,a),n.unshift(a)},remove(a){var s;n=rf(n,a),(s=n[0])==null||s.resume()}}}Et(M0,"createFocusScopesStack");function rf(n,a){const s=[...n],l=s.indexOf(a);return l!==-1&&s.splice(l,1),s}Et(rf,"arrayRemove");function R0(n){return n.filter(a=>a.tagName!=="A")}Et(R0,"removeLinks");var QN=Object.defineProperty,JN=(n,a)=>QN(n,"name",{value:a,configurable:!0}),WN=S.forwardRef(JN(function(a,s){var p;const{container:l,...c}=a,[h,d]=S.useState(!1);wr(()=>d(!0),[]);const m=l||h&&((p=globalThis==null?void 0:globalThis.document)==null?void 0:p.body);return m?Xf.createPortal(o.jsx(Qr.div,{...c,ref:s}),m):null},"Portal")),IN=Object.defineProperty,Xn=(n,a)=>IN(n,"name",{value:a,configurable:!0});function O0(n,a){return S.useReducer((s,l)=>a[s][l]??s,n)}Xn(O0,"useStateMachine");var Wf=Xn(n=>{const{present:a,children:s}=n,l=z0(a),c=typeof s=="function"?s({present:l.isPresent}):S.Children.only(s),h=_0(l.ref,V0(c));return typeof s=="function"||l.isPresent?S.cloneElement(c,{ref:h}):null},"Presence");function z0(n){const[a,s]=S.useState(),l=S.useRef(null),c=S.useRef(n),h=S.useRef("none"),d=S.useRef(void 0),m=n?"mounted":"unmounted",[p,g]=O0(m,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return S.useEffect(()=>{p==="mounted"?(h.current=d.current??Ua(l.current),d.current=void 0):h.current="none"},[p]),wr(()=>{const v=l.current,x=c.current;if(x!==n){const E=h.current,w=Ua(v);n?(d.current=w,g("MOUNT")):w==="none"||(v==null?void 0:v.display)==="none"?g("UNMOUNT"):g(x&&E!==w?"ANIMATION_OUT":"UNMOUNT"),c.current=n}},[n,g]),wr(()=>{if(a){let v;const x=a.ownerDocument.defaultView??window,b=Xn(w=>{const T=Ua(l.current).includes(CSS.escape(w.animationName));if(w.target===a&&T&&(g("ANIMATION_END"),!c.current)){const A=a.style.animationFillMode;a.style.animationFillMode="forwards",v=x.setTimeout(()=>{a.style.animationFillMode==="forwards"&&(a.style.animationFillMode=A)})}},"handleAnimationEnd"),E=Xn(w=>{w.target===a&&(h.current=Ua(l.current))},"handleAnimationStart");return a.addEventListener("animationstart",E),a.addEventListener("animationcancel",b),a.addEventListener("animationend",b),()=>{x.clearTimeout(v),a.removeEventListener("animationstart",E),a.removeEventListener("animationcancel",b),a.removeEventListener("animationend",b)}}else g("ANIMATION_END")},[a,g]),{isPresent:["mounted","unmountSuspended"].includes(p),ref:S.useCallback(v=>{if(v){const x=getComputedStyle(v);l.current=x,d.current=Ua(x)}else l.current=null;s(v)},[])}}Xn(z0,"usePresence");function af(n,a){if(typeof n=="function")return n(a);n!=null&&(n.current=a)}Xn(af,"setRef");function _0(...n){const a=S.useRef(n);return a.current=n,S.useCallback(s=>{const l=a.current;let c=!1;const h=l.map(d=>{const m=af(d,s);return!c&&typeof m=="function"&&(c=!0),m});if(c)return()=>{for(let d=0;d<h.length;d++){const m=h[d];typeof m=="function"?m():af(l[d],null)}}},[])}Xn(_0,"useStableComposedRefs");function Ua(n){return(n==null?void 0:n.animationName)||"none"}Xn(Ua,"getAnimationName");function V0(n){var l,c;let a=(l=Object.getOwnPropertyDescriptor(n.props,"ref"))==null?void 0:l.get,s=a&&"isReactWarning"in a&&a.isReactWarning;return s?n.ref:(a=(c=Object.getOwnPropertyDescriptor(n,"ref"))==null?void 0:c.get,s=a&&"isReactWarning"in a&&a.isReactWarning,s?n.props.ref:n.props.ref||n.ref)}Xn(V0,"getElementRef");var eD=Object.defineProperty,If=(n,a)=>eD(n,"name",{value:a,configurable:!0}),Fl=0,xn=null;function tD(n){return eh(),n.children}If(tD,"FocusGuards");function eh(){S.useEffect(()=>{xn||(xn={start:sf(),end:sf()});const{start:n,end:a}=xn;return document.body.firstElementChild!==n&&document.body.insertAdjacentElement("afterbegin",n),document.body.lastElementChild!==a&&document.body.insertAdjacentElement("beforeend",a),Fl++,()=>{Fl===1&&(xn==null||xn.start.remove(),xn==null||xn.end.remove(),xn=null),Fl=Math.max(0,Fl-1)}},[])}If(eh,"useFocusGuards");function sf(){const n=document.createElement("span");return n.setAttribute("data-radix-focus-guard",""),n.tabIndex=0,n.style.outline="none",n.style.opacity="0",n.style.position="fixed",n.style.pointerEvents="none",n}If(sf,"createFocusGuard");var jn=function(){return jn=Object.assign||function(a){for(var s,l=1,c=arguments.length;l<c;l++){s=arguments[l];for(var h in s)Object.prototype.hasOwnProperty.call(s,h)&&(a[h]=s[h])}return a},jn.apply(this,arguments)};function B0(n,a){var s={};for(var l in n)Object.prototype.hasOwnProperty.call(n,l)&&a.indexOf(l)<0&&(s[l]=n[l]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var c=0,l=Object.getOwnPropertySymbols(n);c<l.length;c++)a.indexOf(l[c])<0&&Object.prototype.propertyIsEnumerable.call(n,l[c])&&(s[l[c]]=n[l[c]]);return s}function nD(n,a,s){if(s||arguments.length===2)for(var l=0,c=a.length,h;l<c;l++)(h||!(l in a))&&(h||(h=Array.prototype.slice.call(a,0,l)),h[l]=a[l]);return n.concat(h||Array.prototype.slice.call(a))}var lo="right-scroll-bar-position",oo="width-before-scroll-bar",rD="with-scroll-bars-hidden",aD="--removed-body-scroll-bar-size";function yd(n,a){return typeof n=="function"?n(a):n&&(n.current=a),n}function iD(n,a){var s=S.useState(function(){return{value:n,callback:a,facade:{get current(){return s.value},set current(l){var c=s.value;c!==l&&(s.value=l,s.callback(l,c))}}}})[0];return s.callback=a,s.facade}var sD=typeof window<"u"?S.useLayoutEffect:S.useEffect,Hv=new WeakMap;function lD(n,a){var s=iD(null,function(l){return n.forEach(function(c){return yd(c,l)})});return sD(function(){var l=Hv.get(s);if(l){var c=new Set(l),h=new Set(n),d=s.current;c.forEach(function(m){h.has(m)||yd(m,null)}),h.forEach(function(m){c.has(m)||yd(m,d)})}Hv.set(s,n)},[n]),s}function oD(n){return n}function cD(n,a){a===void 0&&(a=oD);var s=[],l=!1,c={read:function(){if(l)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return s.length?s[s.length-1]:n},useMedium:function(h){var d=a(h,l);return s.push(d),function(){s=s.filter(function(m){return m!==d})}},assignSyncMedium:function(h){for(l=!0;s.length;){var d=s;s=[],d.forEach(h)}s={push:function(m){return h(m)},filter:function(){return s}}},assignMedium:function(h){l=!0;var d=[];if(s.length){var m=s;s=[],m.forEach(h),d=s}var p=function(){var v=d;d=[],v.forEach(h)},g=function(){return Promise.resolve().then(p)};g(),s={push:function(v){d.push(v),g()},filter:function(v){return d=d.filter(v),s}}}};return c}function uD(n){n===void 0&&(n={});var a=cD(null);return a.options=jn({async:!0,ssr:!1},n),a}var L0=function(n){var a=n.sideCar,s=B0(n,["sideCar"]);if(!a)throw new Error("Sidecar: please provide `sideCar` property to import the right car");var l=a.read();if(!l)throw new Error("Sidecar medium not found");return S.createElement(l,jn({},s))};L0.isSideCarExport=!0;function dD(n,a){return n.useMedium(a),L0}var U0=uD(),vd=function(){},Ro=S.forwardRef(function(n,a){var s=S.useRef(null),l=S.useState({onScrollCapture:vd,onWheelCapture:vd,onTouchMoveCapture:vd}),c=l[0],h=l[1],d=n.forwardProps,m=n.children,p=n.className,g=n.removeScrollBar,v=n.enabled,x=n.shards,b=n.sideCar,E=n.noRelative,w=n.noIsolation,N=n.inert,T=n.allowPinchZoom,A=n.as,k=A===void 0?"div":A,_=n.gapMode,z=B0(n,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noRelative","noIsolation","inert","allowPinchZoom","as","gapMode"]),U=b,L=lD([s,a]),D=jn(jn({},z),c);return S.createElement(S.Fragment,null,v&&S.createElement(U,{sideCar:U0,removeScrollBar:g,shards:x,noRelative:E,noIsolation:w,inert:N,setCallbacks:h,allowPinchZoom:!!T,lockRef:s,gapMode:_}),d?S.cloneElement(S.Children.only(m),jn(jn({},D),{ref:L})):S.createElement(k,jn({},D,{className:p,ref:L}),m))});Ro.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};Ro.classNames={fullWidth:oo,zeroRight:lo};var fD=function(){if(typeof __webpack_nonce__<"u")return __webpack_nonce__};function hD(){if(!document)return null;var n=document.createElement("style");n.type="text/css";var a=fD();return a&&n.setAttribute("nonce",a),n}function mD(n,a){n.styleSheet?n.styleSheet.cssText=a:n.appendChild(document.createTextNode(a))}function pD(n){var a=document.head||document.getElementsByTagName("head")[0];a.appendChild(n)}var gD=function(){var n=0,a=null;return{add:function(s){n==0&&(a=hD())&&(mD(a,s),pD(a)),n++},remove:function(){n--,!n&&a&&(a.parentNode&&a.parentNode.removeChild(a),a=null)}}},yD=function(){var n=gD();return function(a,s){S.useEffect(function(){return n.add(a),function(){n.remove()}},[a&&s])}},H0=function(){var n=yD(),a=function(s){var l=s.styles,c=s.dynamic;return n(l,c),null};return a},vD={left:0,top:0,right:0,gap:0},xd=function(n){return parseInt(n||"",10)||0},xD=function(n){var a=window.getComputedStyle(document.body),s=a[n==="padding"?"paddingLeft":"marginLeft"],l=a[n==="padding"?"paddingTop":"marginTop"],c=a[n==="padding"?"paddingRight":"marginRight"];return[xd(s),xd(l),xd(c)]},bD=function(n){if(n===void 0&&(n="margin"),typeof window>"u")return vD;var a=xD(n),s=document.documentElement.clientWidth,l=window.innerWidth;return{left:a[0],top:a[1],right:a[2],gap:Math.max(0,l-s+a[2]-a[0])}},SD=H0(),Pa="data-scroll-locked",jD=function(n,a,s,l){var c=n.left,h=n.top,d=n.right,m=n.gap;return s===void 0&&(s="margin"),`
  .`.concat(rD,` {
   overflow: hidden `).concat(l,`;
   padding-right: `).concat(m,"px ").concat(l,`;
  }
  body[`).concat(Pa,`] {
    overflow: hidden `).concat(l,`;
    overscroll-behavior: contain;
    `).concat([a&&"position: relative ".concat(l,";"),s==="margin"&&`
    padding-left: `.concat(c,`px;
    padding-top: `).concat(h,`px;
    padding-right: `).concat(d,`px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(m,"px ").concat(l,`;
    `),s==="padding"&&"padding-right: ".concat(m,"px ").concat(l,";")].filter(Boolean).join(""),`
  }
  
  .`).concat(lo,` {
    right: `).concat(m,"px ").concat(l,`;
  }
  
  .`).concat(oo,` {
    margin-right: `).concat(m,"px ").concat(l,`;
  }
  
  .`).concat(lo," .").concat(lo,` {
    right: 0 `).concat(l,`;
  }
  
  .`).concat(oo," .").concat(oo,` {
    margin-right: 0 `).concat(l,`;
  }
  
  body[`).concat(Pa,`] {
    `).concat(aD,": ").concat(m,`px;
  }
`)},qv=function(){var n=parseInt(document.body.getAttribute(Pa)||"0",10);return isFinite(n)?n:0},wD=function(){S.useEffect(function(){return document.body.setAttribute(Pa,(qv()+1).toString()),function(){var n=qv()-1;n<=0?document.body.removeAttribute(Pa):document.body.setAttribute(Pa,n.toString())}},[])},ED=function(n){var a=n.noRelative,s=n.noImportant,l=n.gapMode,c=l===void 0?"margin":l;wD();var h=S.useMemo(function(){return bD(c)},[c]);return S.createElement(SD,{styles:jD(h,!a,c,s?"":"!important")})},lf=!1;if(typeof window<"u")try{var Xl=Object.defineProperty({},"passive",{get:function(){return lf=!0,!0}});window.addEventListener("test",Xl,Xl),window.removeEventListener("test",Xl,Xl)}catch{lf=!1}var _a=lf?{passive:!1}:!1,TD=function(n){return n.tagName==="TEXTAREA"},q0=function(n,a){if(!(n instanceof Element))return!1;var s=window.getComputedStyle(n);return s[a]!=="hidden"&&!(s.overflowY===s.overflowX&&!TD(n)&&s[a]==="visible")},CD=function(n){return q0(n,"overflowY")},ND=function(n){return q0(n,"overflowX")},Yv=function(n,a){var s=a.ownerDocument,l=a;do{typeof ShadowRoot<"u"&&l instanceof ShadowRoot&&(l=l.host);var c=Y0(n,l);if(c){var h=P0(n,l),d=h[1],m=h[2];if(d>m)return!0}l=l.parentNode}while(l&&l!==s.body);return!1},DD=function(n){var a=n.scrollTop,s=n.scrollHeight,l=n.clientHeight;return[a,s,l]},AD=function(n){var a=n.scrollLeft,s=n.scrollWidth,l=n.clientWidth;return[a,s,l]},Y0=function(n,a){return n==="v"?CD(a):ND(a)},P0=function(n,a){return n==="v"?DD(a):AD(a)},kD=function(n,a){return n==="h"&&a==="rtl"?-1:1},MD=function(n,a,s,l,c){var h=kD(n,window.getComputedStyle(a).direction),d=h*l,m=s.target,p=a.contains(m),g=!1,v=d>0,x=0,b=0;do{if(!m)break;var E=P0(n,m),w=E[0],N=E[1],T=E[2],A=N-T-h*w;(w||A)&&Y0(n,m)&&(x+=A,b+=w);var k=m.parentNode;m=k&&k.nodeType===Node.DOCUMENT_FRAGMENT_NODE?k.host:k}while(!p&&m!==document.body||p&&(a.contains(m)||a===m));return(v&&Math.abs(x)<1||!v&&Math.abs(b)<1)&&(g=!0),g},$l=function(n){return"changedTouches"in n?[n.changedTouches[0].clientX,n.changedTouches[0].clientY]:[0,0]},Pv=function(n){return[n.deltaX,n.deltaY]},Gv=function(n){return n&&"current"in n?n.current:n},RD=function(n,a){return n[0]===a[0]&&n[1]===a[1]},OD=function(n){return`
  .block-interactivity-`.concat(n,` {pointer-events: none;}
  .allow-interactivity-`).concat(n,` {pointer-events: all;}
`)},zD=0,Va=[];function _D(n){var a=S.useRef([]),s=S.useRef([0,0]),l=S.useRef(),c=S.useState(zD++)[0],h=S.useState(H0)[0],d=S.useRef(n);S.useEffect(function(){d.current=n},[n]),S.useEffect(function(){if(n.inert){document.body.classList.add("block-interactivity-".concat(c));var N=nD([n.lockRef.current],(n.shards||[]).map(Gv),!0).filter(Boolean);return N.forEach(function(T){return T.classList.add("allow-interactivity-".concat(c))}),function(){document.body.classList.remove("block-interactivity-".concat(c)),N.forEach(function(T){return T.classList.remove("allow-interactivity-".concat(c))})}}},[n.inert,n.lockRef.current,n.shards]);var m=S.useCallback(function(N,T){if("touches"in N&&N.touches.length===2||N.type==="wheel"&&N.ctrlKey)return!d.current.allowPinchZoom;var A=$l(N),k=s.current,_="deltaX"in N?N.deltaX:k[0]-A[0],z="deltaY"in N?N.deltaY:k[1]-A[1],U,L=N.target,D=Math.abs(_)>Math.abs(z)?"h":"v";if("touches"in N&&D==="h"&&L.type==="range")return!1;var H=window.getSelection(),M=H&&H.anchorNode,O=M?M===L||M.contains(L):!1;if(O)return!1;var $=Yv(D,L);if(!$)return!0;if($?U=D:(U=D==="v"?"h":"v",$=Yv(D,L)),!$)return!1;if(!l.current&&"changedTouches"in N&&(_||z)&&(l.current=U),!U)return!0;var Z=l.current||U;return MD(Z,T,N,Z==="h"?_:z)},[]),p=S.useCallback(function(N){var T=N;if(!(!Va.length||Va[Va.length-1]!==h)){var A="deltaY"in T?Pv(T):$l(T),k=a.current.filter(function(U){return U.name===T.type&&(U.target===T.target||T.target===U.shadowParent)&&RD(U.delta,A)})[0];if(k&&k.should){T.cancelable&&T.preventDefault();return}if(!k){var _=(d.current.shards||[]).map(Gv).filter(Boolean).filter(function(U){return U.contains(T.target)}),z=_.length>0?m(T,_[0]):!d.current.noIsolation;z&&T.cancelable&&T.preventDefault()}}},[]),g=S.useCallback(function(N,T,A,k){var _={name:N,delta:T,target:A,should:k,shadowParent:VD(A)};a.current.push(_),setTimeout(function(){a.current=a.current.filter(function(z){return z!==_})},1)},[]),v=S.useCallback(function(N){s.current=$l(N),l.current=void 0},[]),x=S.useCallback(function(N){g(N.type,Pv(N),N.target,m(N,n.lockRef.current))},[]),b=S.useCallback(function(N){g(N.type,$l(N),N.target,m(N,n.lockRef.current))},[]);S.useEffect(function(){return Va.push(h),n.setCallbacks({onScrollCapture:x,onWheelCapture:x,onTouchMoveCapture:b}),document.addEventListener("wheel",p,_a),document.addEventListener("touchmove",p,_a),document.addEventListener("touchstart",v,_a),function(){Va=Va.filter(function(N){return N!==h}),document.removeEventListener("wheel",p,_a),document.removeEventListener("touchmove",p,_a),document.removeEventListener("touchstart",v,_a)}},[]);var E=n.removeScrollBar,w=n.inert;return S.createElement(S.Fragment,null,w?S.createElement(h,{styles:OD(c)}):null,E?S.createElement(ED,{noRelative:n.noRelative,gapMode:n.gapMode}):null)}function VD(n){for(var a=null;n!==null;)n instanceof ShadowRoot&&(a=n.host,n=n.host),n=n.parentNode;return a}const BD=dD(U0,_D);var G0=S.forwardRef(function(n,a){return S.createElement(Ro,jn({},n,{ref:a,sideCar:BD}))});G0.classNames=Ro.classNames;var LD=function(n){if(typeof document>"u")return null;var a=Array.isArray(n)?n[0]:n;return a.ownerDocument.body},Ba=new WeakMap,Kl=new WeakMap,Zl={},bd=0,F0=function(n){return n&&(n.host||F0(n.parentNode))},UD=function(n,a){return a.map(function(s){if(n.contains(s))return s;var l=F0(s);return l&&n.contains(l)?l:(console.error("aria-hidden",s,"in not contained inside",n,". Doing nothing"),null)}).filter(function(s){return!!s})},HD=function(n,a,s,l){var c=UD(a,Array.isArray(n)?n:[n]);Zl[s]||(Zl[s]=new WeakMap);var h=Zl[s],d=[],m=new Set,p=new Set(c),g=function(x){!x||m.has(x)||(m.add(x),g(x.parentNode))};c.forEach(g);var v=function(x){!x||p.has(x)||Array.prototype.forEach.call(x.children,function(b){if(m.has(b))v(b);else try{var E=b.getAttribute(l),w=E!==null&&E!=="false",N=(Ba.get(b)||0)+1,T=(h.get(b)||0)+1;Ba.set(b,N),h.set(b,T),d.push(b),N===1&&w&&Kl.set(b,!0),T===1&&b.setAttribute(s,"true"),w||b.setAttribute(l,"true")}catch(A){console.error("aria-hidden: cannot operate on ",b,A)}})};return v(a),m.clear(),bd++,function(){d.forEach(function(x){var b=Ba.get(x)-1,E=h.get(x)-1;Ba.set(x,b),h.set(x,E),b||(Kl.has(x)||x.removeAttribute(l),Kl.delete(x)),E||x.removeAttribute(s)}),bd--,bd||(Ba=new WeakMap,Ba=new WeakMap,Kl=new WeakMap,Zl={})}},qD=function(n,a,s){s===void 0&&(s="data-aria-hidden");var l=Array.from(Array.isArray(n)?n:[n]),c=LD(n);return c?(l.push.apply(l,Array.from(c.querySelectorAll("[aria-live], script"))),HD(l,c,s,"aria-hidden")):function(){return null}},YD=Object.defineProperty,an=(n,a)=>YD(n,"name",{value:a,configurable:!0}),th="Dialog",[X0,ZA]=d0(th),[PD,Tn]=X0(th),ls=an(n=>{const{__scopeDialog:a,children:s,open:l,defaultOpen:c,onOpenChange:h,modal:d=!0}=n,m=S.useRef(null),p=S.useRef(null),[g,v]=m0({prop:l,defaultProp:c??!1,onChange:h,caller:th}),[x,b]=S.useState(0),[E,w]=S.useState(0);return o.jsx(PD,{scope:a,triggerRef:m,contentRef:p,contentId:so(),titleId:so(),descriptionId:so(),titlePresent:x>0,descriptionPresent:E>0,setTitleCount:b,setDescriptionCount:w,open:g,onOpenChange:v,onOpenToggle:S.useCallback(()=>v(N=>!N),[v]),modal:d,children:s})},"Dialog"),$0="DialogPortal",[GD,K0]=X0($0,{forceMount:void 0}),os=an(n=>{const{__scopeDialog:a,forceMount:s,children:l,container:c}=n,h=Tn($0,a);return o.jsx(GD,{scope:a,forceMount:s,children:S.Children.map(l,d=>o.jsx(Wf,{present:s||h.open,children:o.jsx(WN,{asChild:!0,container:c,children:d})}))})},"DialogPortal"),of="DialogOverlay",cs=S.forwardRef(an(function(a,s){const l=K0(of,a.__scopeDialog),{forceMount:c=l.forceMount,...h}=a,d=Tn(of,a.__scopeDialog);return d.modal?o.jsx(Wf,{present:c||d.open,children:o.jsx(XD,{...h,ref:s})}):null},"DialogOverlay")),FD=Zf("DialogOverlay.RemoveScroll"),XD=S.forwardRef(an(function(a,s){const{__scopeDialog:l,...c}=a,h=Tn(of,l),d=E0(),m=Wa(s,d);return o.jsx(G0,{as:FD,allowPinchZoom:!0,shards:[h.contentRef],children:o.jsx(Qr.div,{"data-state":nh(h.open),...c,ref:m,style:{pointerEvents:"auto",...c.style}})})},"DialogOverlayImpl")),us="DialogContent",ds=S.forwardRef(an(function(a,s){const l=K0(us,a.__scopeDialog),{forceMount:c=l.forceMount,...h}=a,d=Tn(us,a.__scopeDialog);return o.jsx(Wf,{present:c||d.open,children:d.modal?o.jsx($D,{...h,ref:s}):o.jsx(KD,{...h,ref:s})})},"DialogContent")),$D=S.forwardRef(an(function(a,s){const l=Tn(us,a.__scopeDialog),c=S.useRef(null),h=Wa(s,l.contentRef,c);return S.useEffect(()=>{const d=c.current;if(d)return qD(d)},[]),o.jsx(Z0,{...a,ref:h,trapFocus:l.open,disableOutsidePointerEvents:l.open,onCloseAutoFocus:br(a.onCloseAutoFocus,d=>{var m;d.preventDefault(),(m=l.triggerRef.current)==null||m.focus()}),onPointerDownOutside:br(a.onPointerDownOutside,d=>{const m=d.detail.originalEvent,p=m.button===0&&m.ctrlKey===!0;(m.button===2||p)&&d.preventDefault()}),onFocusOutside:br(a.onFocusOutside,d=>d.preventDefault())})},"DialogContentModal")),KD=S.forwardRef(an(function(a,s){const l=Tn(us,a.__scopeDialog),c=S.useRef(!1),h=S.useRef(!1);return o.jsx(Z0,{...a,ref:s,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:d=>{var m,p;(m=a.onCloseAutoFocus)==null||m.call(a,d),d.defaultPrevented||(c.current||(p=l.triggerRef.current)==null||p.focus(),d.preventDefault()),c.current=!1,h.current=!1},onInteractOutside:d=>{var g,v;(g=a.onInteractOutside)==null||g.call(a,d),d.defaultPrevented||(c.current=!0,d.detail.originalEvent.type==="pointerdown"&&(h.current=!0));const m=d.target;((v=l.triggerRef.current)==null?void 0:v.contains(m))&&d.preventDefault(),d.detail.originalEvent.type==="focusin"&&h.current&&d.preventDefault()}})},"DialogContentNonModal")),Z0=S.forwardRef(an(function(a,s){const{__scopeDialog:l,trapFocus:c,onOpenAutoFocus:h,onCloseAutoFocus:d,...m}=a,p=Tn(us,l);return eh(),o.jsx(o.Fragment,{children:o.jsx(ZN,{asChild:!0,loop:!0,trapped:c,onMountAutoFocus:h,onUnmountAutoFocus:d,children:o.jsx(XN,{role:"dialog",id:p.contentId,"aria-describedby":p.descriptionPresent?p.descriptionId:void 0,"aria-labelledby":p.titlePresent?p.titleId:void 0,"data-state":nh(p.open),...m,ref:s,deferPointerDownOutside:!0,onDismiss:()=>p.onOpenChange(!1)})})})},"DialogContentImpl")),ZD="DialogTitle",fs=S.forwardRef(an(function(a,s){const{__scopeDialog:l,...c}=a,h=Tn(ZD,l),{setTitleCount:d}=h;return wr(()=>(d(m=>m+1),()=>d(m=>m-1)),[d]),o.jsx(Qr.h2,{id:h.titleId,...c,ref:s})},"DialogTitle")),QD="DialogDescription",hs=S.forwardRef(an(function(a,s){const{__scopeDialog:l,...c}=a,h=Tn(QD,l),{setDescriptionCount:d}=h;return wr(()=>(d(m=>m+1),()=>d(m=>m-1)),[d]),o.jsx(Qr.p,{id:h.descriptionId,...c,ref:s})},"DialogDescription")),JD="DialogClose",Eo=S.forwardRef(an(function(a,s){const{__scopeDialog:l,...c}=a,h=Tn(JD,l);return o.jsx(Qr.button,{type:"button",...c,ref:s,onClick:br(a.onClick,()=>h.onOpenChange(!1))})},"DialogClose"));function nh(n){return n?"open":"closed"}an(nh,"getState");function WD({onCreated:n,onBack:a,onCancel:s}){const[l,c]=S.useState(2),[h,d]=S.useState("日报任务"),[m,p]=S.useState("17:30"),[g,v]=S.useState(!1),[x,b]=S.useState("");async function E(){v(!0),b("");try{const w=await fe("daily.create",{name:h.trim(),sendTime:m});await n(w)}catch(w){b(w instanceof Error?w.message:String(w))}finally{v(!1)}}return o.jsxs(o.Fragment,{children:[o.jsx(ID,{current:l}),x&&o.jsx("div",{className:"notice error",role:"alert",children:o.jsxs("div",{children:[o.jsx("strong",{children:"创建失败"}),o.jsx("span",{children:x})]})}),l===2?o.jsxs("div",{className:"automation-create-step",children:[o.jsxs("div",{children:[o.jsx("h3",{children:"基本信息"}),o.jsx("p",{children:"名称用于在自动化任务列表中识别这份日报。"})]}),o.jsxs("label",{children:["任务名称",o.jsx("input",{value:h,autoFocus:!0,onChange:w=>d(w.target.value)})]}),o.jsxs("div",{className:"dialog-actions",children:[o.jsxs("button",{className:"ghost",onClick:a,children:[o.jsx(ss,{}),"返回选择类型"]}),o.jsx("button",{className:"primary",disabled:!h.trim(),onClick:()=>c(3),children:"下一步"})]})]}):o.jsxs("div",{className:"automation-create-step",children:[o.jsxs("div",{children:[o.jsx("h3",{children:"日报必要配置"}),o.jsx("p",{children:"先确定每天的发送时间；消息字段和测试发送在创建后的专用 Tab 中完成。"})]}),o.jsxs("label",{children:["每天发送时间",o.jsx("input",{type:"time",value:m,onChange:w=>p(w.target.value)})]}),o.jsxs("div",{className:"automation-create-summary",children:[o.jsx("span",{children:"任务类型"}),o.jsx("strong",{children:"日报推送"}),o.jsx("span",{children:"创建后继续"}),o.jsx("strong",{children:"消息内容 → 预览与测试"})]}),o.jsxs("div",{className:"dialog-actions",children:[o.jsxs("button",{className:"ghost",disabled:g,onClick:()=>c(2),children:[o.jsx(ss,{}),"上一步"]}),o.jsx("button",{className:"secondary",disabled:g,onClick:s,children:"取消"}),o.jsxs("button",{className:"primary",disabled:g||!m,onClick:E,children:[g&&o.jsx(hn,{className:"spin"}),"创建任务"]})]})]})]})}function ID({current:n}){return o.jsxs("ol",{className:"automation-create-progress","aria-label":"新建任务进度",children:[o.jsx("li",{className:"done",children:"1 选择类型"}),o.jsx("li",{className:n===2?"current":"done",children:"2 基本信息"}),o.jsx("li",{className:n===3?"current":"",children:"3 必要配置"})]})}function eA({onCreated:n,onBack:a,onCancel:s}){const[l,c]=S.useState(2),[h,d]=S.useState("原材料入库自动填报"),[m,p]=S.useState(""),[g,v]=S.useState(""),[x,b]=S.useState(""),[E,w]=S.useState(!1),[N,T]=S.useState("");async function A(){w(!0),T("");try{const k=await fe("notionFill.create",{name:h.trim(),sourcePageUrl:m.trim(),username:g.trim(),password:x});await n(k)}catch(k){T(k instanceof Error?k.message:String(k))}finally{w(!1)}}return o.jsxs(o.Fragment,{children:[o.jsx(tA,{current:l}),N&&o.jsx("div",{className:"notice error",role:"alert",children:o.jsxs("div",{children:[o.jsx("strong",{children:"创建失败"}),o.jsx("span",{children:N})]})}),l===2?o.jsxs("div",{className:"automation-create-step",children:[o.jsxs("div",{children:[o.jsx("h3",{children:"基本信息"}),o.jsx("p",{children:"名称用于在自动化任务列表中识别这份填报任务。"})]}),o.jsxs("label",{children:["任务名称",o.jsx("input",{value:h,autoFocus:!0,onChange:k=>d(k.target.value)})]}),o.jsxs("div",{className:"dialog-actions",children:[o.jsxs("button",{className:"ghost",onClick:a,children:[o.jsx(ss,{}),"返回选择类型"]}),o.jsx("button",{className:"primary",disabled:!h.trim(),onClick:()=>c(3),children:"下一步"})]})]}):o.jsxs("div",{className:"automation-create-step",children:[o.jsxs("div",{children:[o.jsx("h3",{children:"93 系统连接"}),o.jsx("p",{children:"凭据只归 NotionFill 任务所有，并使用现有 Windows 加密存储。"})]}),o.jsxs("label",{children:["材料入库业务页面",o.jsx("input",{type:"url",value:m,placeholder:"http://服务器/业务页面",autoFocus:!0,onChange:k=>p(k.target.value)})]}),o.jsxs("label",{children:["93 系统用户名",o.jsx("input",{value:g,autoComplete:"username",onChange:k=>v(k.target.value)})]}),o.jsxs("label",{children:["93 系统密码",o.jsx("input",{type:"password",value:x,autoComplete:"new-password",onChange:k=>b(k.target.value)})]}),o.jsxs("div",{className:"automation-create-summary",children:[o.jsx("span",{children:"填报目标"}),o.jsx("strong",{children:"原材料入库数据库"}),o.jsx("span",{children:"执行时间"}),o.jsx("strong",{children:"每天 00:00 · 填报前一天"}),o.jsx("span",{children:"写入方式"}),o.jsx("strong",{children:"按日期查重，仅新增"})]}),o.jsxs("div",{className:"dialog-actions",children:[o.jsxs("button",{className:"ghost",disabled:E,onClick:()=>c(2),children:[o.jsx(ss,{}),"上一步"]}),o.jsx("button",{className:"secondary",disabled:E,onClick:s,children:"取消"}),o.jsxs("button",{className:"primary",disabled:E||!m.trim()||!g.trim()||!x,onClick:A,children:[E&&o.jsx(hn,{className:"spin"}),"创建任务"]})]})]})]})}function tA({current:n}){return o.jsxs("ol",{className:"automation-create-progress","aria-label":"新建任务进度",children:[o.jsx("li",{className:"done",children:"1 选择类型"}),o.jsx("li",{className:n===2?"current":"done",children:"2 基本信息"}),o.jsx("li",{className:n===3?"current":"",children:"3 必要配置"})]})}function Ie({value:n,options:a,placeholder:s,disabled:l,ariaLabel:c,onChange:h}){const[d,m]=S.useState(!1),p=Qb(),g=a.find(v=>v.value===n);return o.jsxs("div",{className:"form-picker",children:[o.jsxs("button",{type:"button",className:`picker-trigger ${d?"open":""}`,disabled:l,"aria-label":c,"aria-haspopup":"listbox","aria-expanded":d,onClick:()=>m(!d),children:[o.jsx("span",{className:g?"":"picker-placeholder",children:(g==null?void 0:g.label)||s}),o.jsx(Wb,{})]}),d&&o.jsxs(o.Fragment,{children:[o.jsx("button",{type:"button",className:"picker-backdrop","aria-label":"关闭选项",onClick:()=>m(!1)}),o.jsxs(Gf.div,{className:"picker-popover choice-popover",role:"listbox",initial:p?!1:{opacity:0,y:-5},animate:{opacity:1,y:0,transitionEnd:{transform:"none"}},transition:{duration:p?0:.12},children:[a.map(v=>o.jsxs("button",{type:"button",role:"option","aria-selected":v.value===n,className:v.value===n?"selected":"",onClick:()=>{h(v.value),m(!1)},children:[o.jsx("span",{children:v.label}),v.value===n&&o.jsx(Qa,{})]},v.value)),!a.length&&o.jsx("span",{className:"picker-empty",children:"暂无可选项"})]})]})]})}function nA({value:n,onChange:a}){const[s,l]=S.useState(!1),c=S.useRef(null),[h="17",d="30"]=n.split(":"),m=(p,g)=>a(`${p}:${g}`);return S.useEffect(()=>{var p;s&&((p=c.current)==null||p.querySelectorAll(".time-column button.selected").forEach(g=>g.scrollIntoView({block:"center"})))},[s,h,d]),o.jsxs("div",{className:"form-picker",children:[o.jsxs("button",{type:"button",className:`picker-trigger time-trigger ${s?"open":""}`,"aria-haspopup":"dialog","aria-expanded":s,onClick:()=>l(!s),children:[o.jsx(PC,{}),o.jsx("span",{children:n}),o.jsx(Wb,{})]}),s&&o.jsxs(o.Fragment,{children:[o.jsx("button",{type:"button",className:"picker-backdrop","aria-label":"关闭时间选择",onClick:()=>l(!1)}),o.jsxs(Gf.div,{ref:c,className:"picker-popover time-popover",role:"dialog","aria-label":"选择发送时间",initial:{opacity:0,y:-5},animate:{opacity:1,y:0,transitionEnd:{transform:"none"}},transition:{duration:.12},children:[[{title:"时",values:Array.from({length:24},(p,g)=>String(g).padStart(2,"0")),selected:h,change:p=>m(p,d)},{title:"分",values:Array.from({length:60},(p,g)=>String(g).padStart(2,"0")),selected:d,change:p=>m(h,p)}].map(p=>o.jsxs("div",{className:"time-column",children:[o.jsx("strong",{children:p.title}),o.jsx("div",{children:p.values.map(g=>o.jsx("button",{type:"button",className:g===p.selected?"selected":"",onClick:()=>p.change(g),children:g},g))})]},p.title)),o.jsx("button",{type:"button",className:"time-done",onClick:()=>l(!1),children:"完成"})]})]})]})}const Fv=["firstTarget","secondTarget","dateHeader","label"],Xv=n=>n.rowStep?`每天向下 ${n.rowStep} 行`:`每天向右 ${n.columnStep} 列`;function rA(){const n=new Intl.DateTimeFormat("en",{timeZone:"Asia/Shanghai",year:"numeric",month:"2-digit"}).formatToParts(new Date);return`${n.find(a=>a.type==="year").value}-${n.find(a=>a.type==="month").value}`}function aA({id:n,metrics:a,initialMetric:s,businessDate:l,rules:c,fixedSheet:h,disabled:d,run:m,onActive:p,onSaved:g}){var $,Z;const[v,x]=S.useState(s||(($=a[0])==null?void 0:$.value)||""),[b]=S.useState(()=>(l==null?void 0:l.slice(0,7))||rA()),[E,w]=S.useState(`${b}-01`),[N,T]=S.useState(`${b}-02`),[A,k]=S.useState(),[_,z]=S.useState({}),[U,L]=S.useState(""),D=!!A,H=((Z=a.find(ue=>ue.value===v))==null?void 0:Z.label)||"业务字段",M={firstTarget:`${E} 的${H}填报格`,secondTarget:`${N} 的${H}填报格`,dateHeader:`${E} 的日期单元格`,label:"项目名称、公司或材料表头"};async function O(ue){L(""),await m(ue==="preview"?"验证排列并定位第三个日期":ue==="confirm"?"保存排列规则":"记录示范位置",async()=>{try{const de=await fe("tencentSheet.teach",{id:n,stage:ue,metric:v,firstDate:E,secondDate:N,sessionToken:A==null?void 0:A.sessionToken,previewToken:A==null?void 0:A.previewToken,slot:A==null?void 0:A.step},3e5);ue==="confirm"||ue==="cancel"?(k(void 0),z({}),p(!1),ue==="confirm"&&await g()):(k(ye=>({...ye,...de})),p(!0),de.capture&&de.slot&&z(ye=>({...ye,[de.slot]:de.capture})))}catch(de){L(de instanceof Error?de.message:String(de)),ue==="cancel"&&(k(void 0),z({}),p(!1))}})}return o.jsxs("fieldset",{className:"tencent-sheet-panel tencent-teaching",disabled:d,children:[o.jsx("legend",{children:"示范填报位置"}),o.jsx("p",{className:"tencent-sheet-help",children:"为每个项目记录排列规则。示范两个日期的位置，程序学习向右或向下的间隔，再请你确认第三个位置。各项业务须完成位置示范。"}),o.jsx("div",{className:"tencent-teaching-rules",children:a.map(ue=>o.jsxs("div",{children:[o.jsx("strong",{children:ue.label}),o.jsx("span",{children:c!=null&&c[ue.value]?Xv(c[ue.value]):"待示范位置"})]},ue.value))}),U&&o.jsx("div",{className:"notice error",role:"alert",children:o.jsxs("div",{children:[o.jsx("strong",{children:"示范未完成"}),o.jsx("span",{children:U})]})}),D?o.jsxs(o.Fragment,{children:[o.jsx("ol",{className:"tencent-teaching-steps","aria-label":"示范进度",children:Fv.map((ue,de)=>{var ye;return o.jsxs("li",{"aria-current":A.step===ue?"step":void 0,className:_[ue]?"done":"",children:[o.jsxs("span",{children:[de+1,". ",M[ue]]}),o.jsx("strong",{children:((ye=_[ue])==null?void 0:ye.address)||"待选取"})]},ue)})}),Fv.includes(A.step)&&o.jsxs("div",{className:"tencent-teaching-prompt",children:[o.jsxs("strong",{children:["请在网页中单击：",M[A.step]]}),o.jsx("p",{children:A.step==="dateHeader"?"选择显示该日期的单元格，程序会检查后续日期是否按同样间隔排列。":A.step==="label"?"选择一处固定的文字标志，用于确认每次填写的仍是这个项目。":"只选中单元格即可，不需要输入数据。已有数据的格子也可用于示范。"}),o.jsx("button",{className:"primary",onClick:()=>O("capture"),children:"记住当前选中的单元格"})]}),A.step==="preview"&&o.jsx("button",{className:"primary",onClick:()=>O("preview"),children:"验证规则并查看第三个位置"}),A.step==="confirm"&&A.rule&&A.prediction&&o.jsxs("div",{className:"tencent-teaching-prompt",children:[o.jsxs("strong",{children:[H,"：",Xv(A.rule)]}),o.jsxs("p",{children:["程序已选中 ",A.prediction.date," 的预测位置 ",o.jsx("b",{children:A.prediction.address}),"。请查看网页，确认它确实是当天的填报格。"]}),o.jsxs("p",{children:["日期及“",A.rule.labelAnchor.expected,"”已通过只读校验。"]}),(A.sheetMode==="fixed"||!A.sheetMode&&h)&&!A.rule.dateAnchor.format.includes("{yyyy}")&&o.jsx("p",{children:"日期未包含完整年月。此固定工作表跨月时需重新示范确认。"}),o.jsxs("div",{className:"tencent-sheet-actions",children:[o.jsx("button",{className:"secondary",onClick:()=>O("preview"),children:"再次定位预测位置"}),o.jsx("button",{className:"primary",onClick:()=>O("confirm"),children:"位置正确，保存此项目"})]})]}),o.jsx("button",{className:"ghost",onClick:()=>O("cancel"),children:"取消示范，保留原配置"})]}):o.jsxs(o.Fragment,{children:[o.jsxs("label",{children:["要示范哪个项目？",o.jsx(Ie,{value:v,options:a,placeholder:"选择项目",disabled:d,ariaLabel:"要示范的项目",onChange:x})]}),o.jsxs("div",{className:"tencent-sheet-grid",children:[o.jsx(Gt,{value:E,onChange:w,label:"第一个示范日期",disabled:d}),o.jsx(Gt,{value:N,onChange:T,label:"第二个示范日期",disabled:d})]}),o.jsx("p",{className:"tencent-sheet-help",children:"先在网页选中要配置的工作表。两个日期必须在同一个月，建议使用 1 日和 2 日。"}),o.jsx("button",{className:"secondary",disabled:d||!v||!E||!N,onClick:()=>O("start"),children:c!=null&&c[v]?"重新示范此项目":"开始示范此项目"})]})]})}const Ql=[{key:"sheetTab",title:"① Sheet 标签",prompt:"请在浏览器中点击任意一个底部 Sheet 标签。程序会识别它所属的集合。"},{key:"cellAddressBox",title:"② 单元格名称框",prompt:"请点击左上角显示当前单元格地址的位置。"},{key:"cellEditor",title:"③ 内容编辑区／公式栏",prompt:"请点击可以读取和输入单元格内容的编辑区，不要选择名称框。"},{key:"saveStatus",title:"④ 保存状态（可选）",prompt:"请点击显示“已保存”“最近保存”或“上次修改时间”的状态控件。"}];function iA({id:n,value:a,disabled:s,onSaved:l,onActive:c}){const[h,d]=S.useState(),[m,p]=S.useState(!1),[g,v]=S.useState(""),[x,b]=S.useState(""),[E,w]=S.useState(!1),[N,T]=S.useState(""),[A,k]=S.useState([]);function _(){T(""),k([])}function z(){d(structuredClone(a??{})),p(!1),b(""),w(!1),_(),c(!0)}async function U(L,D){if(!h)return;v(D??L),w(!1),b(D?Ql.find(M=>M.key===D).prompt:"正在操作…");const H=N;L!=="save"&&_();try{const M=await fe(`tencentSite.${L}`,{id:n,controls:h,key:D,token:H},3e5);b(M.message),L==="open"&&p(!0),M.controls&&d(M.controls),L==="test"&&(T(M.token??""),k(M.steps)),L==="save"&&(await l(),d(void 0),c(!1))}catch(M){w(!0),b(M instanceof Error?M.message:String(M)),_()}finally{v("")}}return o.jsxs("fieldset",{className:"tencent-web-controls tencent-sheet-panel","aria-busy":!!g,disabled:s,children:[o.jsx("legend",{children:"网页控件"}),o.jsx("p",{className:"tencent-sheet-help",children:"记录本任务的单元格名称框、内容编辑区和 Sheet 标签。可补录保存状态，用于等待网页保存完成；业务填写位置在下方独立配置。"}),h?o.jsx(o.Fragment,{children:o.jsxs("fieldset",{className:"tencent-site-fields",disabled:s||!!g,children:[o.jsx("button",{className:"primary",onClick:()=>U("open"),children:m?"重新打开配置文档":"开始配置"}),o.jsxs("div",{className:"tencent-site-recording",children:[o.jsx("div",{className:"tencent-site-controls",children:Ql.map(L=>o.jsxs("div",{children:[o.jsx("strong",{children:L.title}),o.jsxs("span",{className:"tencent-control-state",children:[h[L.key]?"已录制":"未配置",L.key==="saveStatus"&&h.saveStatus?` · ${h.saveStatus.sampleText}`:""]}),o.jsxs("button",{className:"secondary",disabled:!m,onClick:()=>U("pick",L.key),children:["录制",L.key==="sheetTab"?" Sheet 标签":L.key==="cellEditor"?"内容编辑区":L.key==="saveStatus"?"保存状态":"单元格名称框"]}),L.key==="saveStatus"&&h.saveStatus&&o.jsx("button",{className:"secondary",onClick:()=>{const D={...h};delete D.saveStatus,d(D),_()},children:"移除保存状态"})]},L.key))}),o.jsxs("div",{className:"tencent-site-instructions",children:[o.jsx("strong",{children:Ql.some(L=>L.key===g)?"正在等待网页点选":"控件录制模式"}),o.jsx("p",{children:"点击左侧录制按钮后，在打开的浏览器中选择控件。鼠标悬停时高亮，点击只记录位置，不执行页面原动作。按 Esc 取消。"}),o.jsx("p",{children:"录制时识别标签集合；测试时先定位今天所在月份的工作表，并确认选中状态，不往返切换历史月份。登录提示自动发现，无需录制。"})]})]}),!!(A!=null&&A.length)&&o.jsx("ol",{className:"tencent-site-results",children:A.map(L=>o.jsxs("li",{children:[o.jsx("strong",{children:L.label}),o.jsx("span",{children:L.detail})]},L.label))}),o.jsx("p",{className:"tencent-sheet-help",children:"测试先定位北京时间今天所在月份的工作表，再检查单元格。有业务位置规则时自动定位今天；尚未示范位置时，请先在当前月份工作表中选中今天可编辑的单元格，再点击测试。测试仅定位、读取和检查编辑区，不填写业务数值。全部通过后才可保存。"}),o.jsx("p",{className:"tencent-sheet-help",children:"保存状态可单独补录，已有三个控件无需重录。录制后填写会等待保存状态稳定，再刷新回读；上次修改时间仅表示空闲，不能单独证明本次保存成功。未配置时沿用原确认方式。"}),o.jsxs("div",{className:"tencent-sheet-actions",children:[o.jsx("button",{className:"secondary",disabled:!m||!h.sheetTab||!h.cellAddressBox||!h.cellEditor,onClick:()=>U("test"),children:"测试网页控件"}),o.jsx("button",{className:"primary",disabled:!N,onClick:()=>U("save"),children:"保存网页控件"}),o.jsx("button",{className:"secondary",onClick:()=>{d(void 0),c(!1),_(),b("")},children:"取消"})]})]})}):o.jsxs(o.Fragment,{children:[o.jsx("p",{children:Ql.map(L=>`${L.title}：${a!=null&&a[L.key]?"已录制":L.key==="saveStatus"?"未配置":"待录制"}`).join("　")}),o.jsx("button",{className:"secondary",onClick:z,children:a?"重新录制网页控件":"录制网页控件"})]}),x&&o.jsx("div",{className:`notice ${E?"error":"info"}`,role:E?"alert":"status",children:x})]})}function sA({id:n,field:a,disabled:s,continueToTeaching:l=!1,onSave:c,onCancel:h}){const[d,m]=S.useState(a.notion??{sourceId:"",valueFieldId:"",queryMode:"date",dateFieldId:"",datasetId:"",period:"day"}),[p,g]=S.useState([]),[v,x]=S.useState([]),[b,E]=S.useState([]),[w,N]=S.useState(!1),[T,A]=S.useState(!1),[k,_]=S.useState("");S.useEffect(()=>{let M=!0;return fe("tencentSheet.sources",{id:n}).then(O=>{M&&g(O.sources)}).catch(O=>{M&&_(String(O))}),()=>{M=!1}},[n]),S.useEffect(()=>{let M=!0;if(x([]),_(""),N(!1),!!d.sourceId)return N(!0),fe("tencentSheet.schema",{id:n,sourceId:d.sourceId}).then(O=>{M&&x(O.fields)}).catch(O=>{M&&_(String(O))}).finally(()=>{M&&N(!1)}),()=>{M=!1}},[n,d.sourceId]),S.useEffect(()=>{let M=!0;if(E([]),A(!1),!(d.queryMode!=="view"||!d.sourceId))return A(!0),fe("tencentSheet.views",{id:n,sourceId:d.sourceId},12e4).then(O=>{M&&E(O.views)}).catch(O=>{M&&_(String(O))}).finally(()=>{M&&A(!1)}),()=>{M=!1}},[n,d.sourceId,d.queryMode]);const z=M=>M.map(O=>({value:O.id,label:O.name})),U=v.filter(M=>["number","formula","rollup"].includes(M.type??"")),L=v.filter(M=>M.type==="date"),D=s||w||d.queryMode==="view"&&T,H=p.some(M=>M.id===d.sourceId)&&U.some(M=>M.id===d.valueFieldId)&&(d.queryMode==="date"?L.some(M=>M.id===d.dateFieldId):b.some(M=>M.id===d.datasetId));return o.jsxs("fieldset",{className:"tencent-sheet-panel",disabled:s,children:[o.jsxs("legend",{children:["绑定 Notion：",a.name]}),o.jsx("p",{className:"tencent-sheet-help",children:"选择这个业务字段的数据来源，默认获取本次业务日期当天的数据；例如补填 8 月 31 日，就查询 8 月 31 日。保存后接着录制网页位置。"}),o.jsxs("label",{children:["Notion 数据库",o.jsx(Ie,{value:d.sourceId,options:z(p),placeholder:"选择已有数据库",ariaLabel:"Notion 数据库",disabled:D,onChange:M=>m({...d,sourceId:M,valueFieldId:"",dateFieldId:"",datasetId:""})})]}),o.jsxs("label",{children:["取数方式",o.jsx(Ie,{value:d.queryMode,options:[{value:"date",label:"按业务日期筛选后汇总"},{value:"view",label:"汇总指定 View 的筛选结果"}],placeholder:"选择取数方式",disabled:D,onChange:M=>{_(""),m({...d,queryMode:M})}})]}),o.jsxs("div",{className:"tencent-sheet-grid",children:[o.jsxs("label",{children:["数值字段",o.jsx(Ie,{value:d.valueFieldId,options:z(U),placeholder:"选择要汇总的数值字段",disabled:D,onChange:M=>m({...d,valueFieldId:M})})]}),d.queryMode==="date"?o.jsxs("label",{children:["日期字段",o.jsx(Ie,{value:d.dateFieldId,options:z(L),placeholder:"选择用于筛选的日期字段",disabled:D,onChange:M=>m({...d,dateFieldId:M})})]}):o.jsxs("label",{children:["Notion View",o.jsx(Ie,{value:d.datasetId,options:z(b),placeholder:"选择真实 View",disabled:D,onChange:M=>m({...d,datasetId:M})})]})]}),d.queryMode==="date"?o.jsxs("label",{children:["统计范围",o.jsx(Ie,{value:d.period,options:[{value:"day",label:"业务日期当天"},{value:"month",label:"业务日期所在月月初至该日"},{value:"year",label:"业务日期所在年年初至该日"}],placeholder:"选择统计范围",disabled:D,onChange:M=>m({...d,period:M})})]}):o.jsx("p",{className:"tencent-sheet-help",children:"使用该 View 在 Notion 中的真实筛选结果，不额外添加日期条件。需要业务日期当天的数据，请使用按业务日期筛选。"}),(w||T)&&o.jsx("p",{role:"status",children:"正在读取数据库结构…"}),k&&o.jsx("p",{role:"alert",children:k}),o.jsxs("div",{className:"tencent-sheet-actions",children:[o.jsx("button",{className:"primary",disabled:D||!H,onClick:()=>{var M,O,$;return c({...d,sourceName:(M=p.find(Z=>Z.id===d.sourceId))==null?void 0:M.name,valueFieldName:(O=U.find(Z=>Z.id===d.valueFieldId))==null?void 0:O.name,datasetName:($=b.find(Z=>Z.id===d.datasetId))==null?void 0:$.name})},children:l?"下一步 · 录制位置":"保存数据绑定"}),o.jsx("button",{className:"secondary",disabled:s,onClick:h,children:"稍后继续"})]})]})}const Q0={weekdays:[1,2,3,4,5,6,0],times:["08:00"]},lA=["周日","周一","周二","周三","周四","周五","周六"];function oA({rule:n,schedule:a,disabled:s,onChange:l}){const[c,h]=S.useState(n.kind==="relative"&&![-1,0].includes(n.offsetDays)),d=n.kind==="fixed"?"fixed":c?"offset":n.offsetDays===0?"today":"previous";return o.jsxs("fieldset",{className:"tencent-sheet-panel",disabled:s,children:[o.jsx("legend",{children:"执行规则"}),o.jsx("p",{className:"tencent-sheet-help",children:"执行时间决定什么时候开始；业务日期决定取哪天的数据、选择哪个月份的工作表、填写哪个位置。以下规则可独立组合。"}),o.jsxs("div",{className:"tencent-sheet-grid",children:[o.jsxs("label",{children:["执行频率",o.jsx(Ie,{value:a.weekdays.length===7?"daily":"weekly",options:[{value:"daily",label:"每天"},{value:"weekly",label:"指定星期"}],placeholder:"选择执行频率",disabled:s,onChange:m=>l(n,{...a,weekdays:m==="daily"?[...Q0.weekdays]:[1,2,3,4,5]})})]}),o.jsxs("label",{children:["业务日期",o.jsx(Ie,{value:d,options:[{value:"previous",label:"执行当天的前一天"},{value:"today",label:"执行当天"},{value:"offset",label:"相对执行当天偏移 N 天"},{value:"fixed",label:"指定固定日期"}],placeholder:"选择业务日期规则",disabled:s,onChange:m=>{h(m==="offset"),l(m==="fixed"?{kind:"fixed",date:""}:{kind:"relative",offsetDays:m==="today"?0:n.kind==="relative"&&m==="offset"?n.offsetDays:-1},a)}})]})]}),a.weekdays.length!==7&&o.jsx("div",{className:"tencent-sheet-actions",role:"group","aria-label":"执行星期",children:[1,2,3,4,5,6,0].map(m=>o.jsxs("label",{className:"tencent-sheet-date-mode",children:[o.jsx("input",{type:"checkbox",checked:a.weekdays.includes(m),onChange:p=>l(n,{...a,weekdays:p.target.checked?[...a.weekdays,m]:a.weekdays.filter(g=>g!==m)})}),lA[m]]},m))}),d==="offset"&&n.kind==="relative"&&o.jsxs("label",{children:["偏移天数（负数向前，正数向后）",o.jsx("input",{type:"number",min:"-3660",max:"3660",step:"1",value:Number.isFinite(n.offsetDays)?n.offsetDays:"",onChange:m=>l({kind:"relative",offsetDays:m.target.value===""?NaN:Number(m.target.value)},a)})]}),n.kind==="fixed"&&o.jsx(Gt,{label:"固定业务日期",value:n.date,onChange:m=>l({kind:"fixed",date:m},a),disabled:s}),o.jsx("div",{className:"tencent-sheet-grid",children:a.times.map((m,p)=>o.jsxs("div",{children:[o.jsxs("label",{children:["执行时刻 ",p+1,"（北京时间）"]}),o.jsxs("div",{className:"tencent-sheet-actions",children:[o.jsx(nA,{value:m,onChange:g=>l(n,{...a,times:a.times.map((v,x)=>x===p?g:v)})}),o.jsxs("button",{className:"ghost",disabled:a.times.length===1,onClick:()=>l(n,{...a,times:a.times.filter((g,v)=>v!==p)}),children:["移除时刻 ",p+1]})]})]},p))}),o.jsx("button",{className:"secondary",disabled:a.times.length>=24,onClick:()=>{const m=Array.from({length:24},(p,g)=>`${String(g).padStart(2,"0")}:00`).find(p=>!a.times.includes(p));m&&l(n,{...a,times:[...a.times,m]})},children:"添加执行时刻"}),o.jsx("p",{className:"tencent-sheet-help",children:"保存规则不会自动启用定时。先完成前台或后台测试；当前配置后台测试通过后，可在任务列表启用定时。临时补填日期只影响本次测试。"})]})}let $v=Promise.resolve();const cA={loading:["正在准备二维码","正在连接腾讯文档，请稍候。"],consent:["确认腾讯文档登录协议","继续前，请阅读腾讯文档的服务协议与隐私政策。"],waiting:["请使用企业微信扫一扫","打开手机企业微信，扫描上方二维码。"],scanned:["已扫码，请在手机上确认","确认后将检查目标文档是否可访问。"],expired:["二维码已过期","刷新后，使用企业微信重新扫码。"],failed:["暂时无法完成登录","请检查网络连接后重试。"],success:["登录完成","已连接腾讯文档，可以继续识别并检查。"]};function uA({id:n,onClose:a}){const[s,l]=S.useState({state:"loading"}),[c,h]=S.useState(!0),[d,m]=S.useState(!1),[p,g]=S.useState(""),v=S.useRef(void 0),x=S.useRef(a);x.current=a,S.useEffect(()=>{const N=crypto.randomUUID();let T=!1,A=!1,k=!1,_,z=Date.now();const U=D=>{const H=$v.then(()=>fe("tencentSheet.login",{id:n,sessionToken:N,stage:D},3e5));return $v=H.catch(()=>{}),H},L=D=>{clearTimeout(_),D!=="poll"&&(z=Date.now(),l({state:"loading"})),h(!0),(async()=>{try{const H=await U(D);if(T||A)return;if(H.state==="loading"){if(z??(z=Date.now()),Date.now()-z>45e3)throw new Error("暂时无法确认登录状态或加载企业微信二维码，请刷新重试，或打开文档检查登录页面。")}else z=void 0;k=H.state==="success",l(H),["loading","waiting","scanned"].includes(H.state)&&(_=setTimeout(()=>L("poll"),1200))}catch(H){!T&&!A&&l({state:"failed",message:H instanceof Error?H.message:String(H)})}finally{T||h(!1)}})()};return v.current={run:L,close:()=>{A||(A=!0,clearTimeout(_),m(!0),U("cancel").then(()=>{T||x.current(k)}).catch(D=>{T||(A=!1,m(!1),l({state:"failed",message:`关闭登录会话失败：${D instanceof Error?D.message:String(D)}`}))}))}},L("start"),()=>{T=!0,clearTimeout(_),A||U("cancel").catch(()=>{})}},[n]);async function b(N){g("");try{await fe("tencentSheet.loginAgreement",{kind:N})}catch(T){g(T instanceof Error?T.message:String(T))}}const[E,w]=cA[s.state];return o.jsx(ls,{open:!0,onOpenChange:N=>{var T;N||(T=v.current)==null||T.close()},children:o.jsxs(os,{children:[o.jsx(cs,{className:"dialog-overlay"}),o.jsxs(ds,{className:"tencent-login-dialog",onPointerDownOutside:N=>N.preventDefault(),children:[o.jsxs("div",{className:"tencent-login-header",children:[o.jsx(fs,{children:"登录腾讯文档"}),o.jsx("button",{className:"secondary","aria-label":"关闭登录弹窗",disabled:d,onClick:()=>{var N;return(N=v.current)==null?void 0:N.close()},children:o.jsx(Mo,{size:20})})]}),o.jsx("div",{className:"tencent-login-method",children:"企业微信扫码"}),o.jsx("div",{className:"tencent-login-qr",children:s.state==="waiting"&&s.qr?o.jsx("img",{src:s.qr,alt:"企业微信登录二维码"}):s.state==="success"?o.jsx(Qa,{size:48}):s.state==="loading"?o.jsx(hn,{className:"spin",size:36}):o.jsx("span",{children:s.state==="scanned"?"等待确认":s.state==="consent"?"登录协议":s.state==="expired"?"已过期":"请重试"})}),o.jsxs("div",{className:"tencent-login-status","aria-live":"polite",children:[o.jsx("h3",{children:E}),o.jsx(hs,{children:s.message||w})]}),s.state==="consent"&&o.jsxs("p",{className:"tencent-login-terms",children:[o.jsx("a",{href:"https://docs.qq.com/doc/p/41c65c813fe78d2f262bf35b825c214f0f459bfe",onClick:N=>{N.preventDefault(),b("service")},children:"服务协议"}),o.jsx("span",{children:"与"}),o.jsx("a",{href:"https://docs.qq.com/doc/p/79d8f25f4f022ccca80949ea89b3fe8a137d8940",onClick:N=>{N.preventDefault(),b("privacy")},children:"隐私政策"})]}),p&&o.jsx("p",{role:"alert",className:"tencent-sheet-help",children:p}),o.jsx("button",{className:"primary tencent-login-submit",disabled:c||d,onClick:()=>{var N,T;return s.state==="success"?(N=v.current)==null?void 0:N.close():(T=v.current)==null?void 0:T.run(s.state==="consent"?"consent":"refresh")},children:d?"正在关闭…":s.state==="success"?"完成":s.state==="consent"?"同意协议并继续":s.state==="failed"?"重新加载":"刷新二维码"}),o.jsx("p",{className:"tencent-sheet-help tencent-login-footnote",children:"关闭弹窗可取消本次登录。已有登录状态会保留。"})]})]})})}const cf=n=>n instanceof Error?n.message:String(n);function dA({onCreated:n,onCancel:a}){const[s,l]=S.useState(""),[c,h]=S.useState(!1),[d,m]=S.useState("");async function p(){h(!0),m("");try{await n(await fe("tencentSheet.create",{documentUrl:s}))}catch(g){m(cf(g))}finally{h(!1)}}return o.jsxs("div",{className:"automation-create-step",children:[o.jsxs("div",{children:[o.jsx("h3",{children:"新建文档填报任务"}),o.jsx("p",{children:"填写文档链接，进入任务后分别配置网页控件、业务位置和执行规则。"})]}),o.jsxs("label",{children:["文档分享链接",o.jsx("input",{type:"url",disabled:c,value:s,onChange:g=>l(g.target.value),placeholder:"粘贴腾讯文档或企业微信文档链接"})]}),d&&o.jsx("p",{role:"alert",children:d}),o.jsxs("div",{className:"dialog-actions",children:[o.jsx("button",{className:"secondary",disabled:c,onClick:a,children:"取消"}),o.jsxs("button",{className:"primary",disabled:c||!s.trim(),onClick:p,children:[c&&o.jsx(hn,{className:"spin"}),"创建并配置"]})]})]})}function fA({id:n,changed:a}){var Xe,ct;const[s,l]=S.useState(),[c,h]=S.useState(""),[d,m]=S.useState(""),[p,g]=S.useState(!1),[v,x]=S.useState(!1),[b,E]=S.useState(""),[w,N]=S.useState(),[T,A]=S.useState(!1),[k,_]=S.useState(!1),[z,U]=S.useState(!1),[L,D]=S.useState(!1),[H,M]=S.useState(!1),[O,$]=S.useState([]),[Z,ue]=S.useState(""),[de,ye]=S.useState(""),[Y,le]=S.useState(""),[Q,G]=S.useState(""),ae=S.useRef(null),[C,V]=S.useState(),I=()=>fe("tencentSheet.get",{id:n}).then(l);S.useEffect(()=>{let se=!0;return D(!1),U(!1),fe("tencentSheet.get",{id:n}).then(Ne=>{se&&l(Ne)}).catch(Ne=>{se&&(g(!0),m(cf(Ne)))}),()=>{se=!1}},[n]),S.useEffect(()=>{var se,Ne;(Y||Q)&&((Ne=(se=ae.current)==null?void 0:se.scrollIntoView)==null||Ne.call(se,{block:"start"}))},[Y,Q]);async function ne(se,Ne){h(se),m(""),g(!1);try{await Ne()}catch(sn){g(!0),m(cf(sn))}finally{h("")}}function oe(){V(void 0),N(void 0)}function me(se){l(Ne=>Ne&&{...Ne,config:se}),D(!1),A(!0),oe()}async function be(se,Ne){var sn;oe(),l(await fe("tencentSheet.updateField",{id:n,fieldId:se.id,name:se.name,unit:se.unit,...Ne?{notion:Ne}:{}})),G(""),(sn=s==null?void 0:s.config.rules)!=null&&sn[se.id]||(le(te?se.id:""),m(te?"数据来源已保存，接着示范这个字段的两个日期位置。":"数据来源已保存。录制网页控件后，再示范这个字段的填写位置。")),a()}async function ie(){if(!s)return;const se=await fe("tencentSheet.save",{id:n,config:s.config,configRevision:s.configRevision??0});l(se),A(!1),oe(),a()}async function J(se){T&&await ie(),oe();const Ne=await fe(`tencentSheet.${se}`,{id:n},3e5);m(Ne.message),Ne.sheets&&$([...new Set(Ne.sheets)]),await I()}if(!s)return o.jsx("div",{className:"notice",role:"status",children:d||"正在读取填报配置…"});const ce=s.config,te=!!((Xe=ce.webControls)!=null&&Xe.sheetTab&&ce.webControls.cellAddressBox&&ce.webControls.cellEditor),he=ce.fields??[],we=he.find(se=>se.id===Y),Ce=he.find(se=>se.id===Q),Ve=!!c||k||!!Ce||H||z;return o.jsxs("div",{className:"tencent-sheet-workbench","aria-busy":!!c,children:[o.jsxs("div",{className:"tencent-sheet-intro",children:[o.jsxs("div",{children:[o.jsx("h2",{children:"腾讯文档填报"}),o.jsx("p",{children:"在同一任务中配置网页控件、业务位置和执行规则。目标格已有内容时会停止。"})]}),o.jsx("span",{children:"Development 测试"})]}),d&&o.jsx("div",{className:`notice ${p?"error":"info"}`,role:p?"alert":"status",children:o.jsxs("div",{children:[o.jsx("strong",{children:p?"操作未完成":"操作结果"}),o.jsx("span",{children:d})]})}),o.jsxs("fieldset",{disabled:Ve,className:"tencent-sheet-panel",children:[o.jsx("legend",{children:"文档"}),o.jsxs("label",{children:["文档链接",o.jsx("input",{type:"url",disabled:s.enabled,value:ce.documentUrl,onChange:se=>me({...ce,documentUrl:se.target.value})})]}),o.jsxs("div",{className:"tencent-login-session",children:[o.jsxs("div",{children:[o.jsx("strong",{children:L?"已登录":"连接填报账号"}),o.jsx("p",{className:"tencent-sheet-help",children:L?"可继续识别目标文档；执行前会重新检查登录状态。":"使用企业微信扫码，已有登录状态会自动复用。"})]}),o.jsx("button",{className:"primary",onClick:()=>ne("准备扫码登录",async()=>{T&&await ie(),oe(),D(!1),U(!0)}),children:L?"检查登录":"扫码登录"})]}),o.jsxs("div",{className:"tencent-sheet-actions",children:[o.jsx("button",{className:"secondary",onClick:()=>ne("打开文档",()=>J("open")),children:"打开文档"}),o.jsx("button",{className:"primary",disabled:s.enabled,onClick:()=>ne("识别页面",()=>J("recognize")),children:"识别并检查"})]}),o.jsx("button",{className:"secondary",onClick:()=>ne("结束前台会话",async()=>{oe();const se=await fe("tencentSheet.close",{id:n});m(se.message)}),children:"结束前台会话"}),o.jsx("p",{className:"tencent-sheet-help",children:"识别会检查已保存控件并读取工作表名称，不填写数据。录制控件和示范位置时，仍会打开填报专用浏览器。"}),!!O.length&&o.jsxs("label",{children:["工作表名称",o.jsx(Ie,{value:ce.sheetReferenceName??ce.capturedSheet??ce.sheetName??"",options:O.map(se=>({value:se,label:se})),placeholder:"选择识别到的工作表名称",disabled:Ve,onChange:se=>me({...ce,sheetReferenceName:se})})]}),(ce.sheetReferenceName||ce.capturedSheet||ce.sheetMode==="fixed")&&o.jsxs("p",{className:"tencent-sheet-help",children:["工作表：",ce.sheetReferenceName??ce.capturedSheet??ce.sheetName," · 执行时按名称匹配，年月使用本次业务日期。"]})]}),z&&o.jsx(uA,{id:n,onClose:se=>{D(se),U(!1),m(se?"已登录腾讯文档，可以继续识别并检查。":"已关闭扫码登录，原有登录状态已保留。")}},`login:${n}`),T&&o.jsx("button",{className:"primary",disabled:Ve,onClick:()=>ne("保存任务配置",async()=>{await ie(),m("任务配置已保存。保存规则不会自动启用定时。")}),children:"保存任务配置"}),o.jsx(iA,{id:n,value:ce.webControls,disabled:!!c||k||!!Ce||T||!!s.enabled,onActive:se=>{M(se),se&&oe()},onSaved:async()=>{await I(),oe(),a()}},n),o.jsxs("fieldset",{disabled:Ve||T||s.enabled,className:"tencent-sheet-panel",children:[o.jsx("legend",{children:"业务字段与填写位置"}),o.jsx("p",{className:"tencent-sheet-help",children:"填写业务名称 → 选择 Notion 数据库和数值字段 → 连续录制位置。取数、月份和位置共用本次业务日期。"}),o.jsxs("div",{className:"tencent-sheet-grid",children:[o.jsxs("label",{children:["业务字段名称",o.jsx("input",{value:Z,placeholder:"例如：合格数量",onChange:se=>ue(se.target.value)})]}),o.jsxs("label",{children:["单位（可选）",o.jsx("input",{value:de,placeholder:"例如：件",onChange:se=>ye(se.target.value)})]})]}),o.jsx("button",{className:"primary",disabled:!Z.trim(),onClick:()=>ne("新增业务字段",async()=>{var Ne,sn;oe();const se=await fe("tencentSheet.addField",{id:n,name:Z,unit:de});l(se),le(""),G(((sn=(Ne=se.config.fields)==null?void 0:Ne.at(-1))==null?void 0:sn.id)??""),ue(""),ye(""),a()}),children:"下一步 · 选择数据库"}),!he.length&&o.jsx("p",{children:"还没有业务字段，请先新增。新文档没有预设业务。"}),o.jsx("div",{className:"tencent-sheet-guidance",children:he.map(se=>{var Ne;return o.jsxs("div",{children:[o.jsxs("span",{children:[o.jsxs("strong",{children:[se.name,se.unit?`（${se.unit}）`:""]}),o.jsxs("small",{className:"tencent-control-state",children:[(Ne=ce.rules)!=null&&Ne[se.id]?"位置已示范":"待示范位置"," · ",se.notion?`${se.notion.sourceName??"Notion"} / ${se.notion.valueFieldName??"数值字段"}`:"待绑定数据库"]})]}),o.jsxs("div",{className:"tencent-sheet-actions",children:[o.jsxs("button",{className:"secondary",disabled:!te||!se.notion,onClick:()=>{le(se.id),oe()},children:["示范位置：",se.name]}),o.jsxs("button",{className:"secondary",onClick:()=>{G(se.id),le(""),oe()},children:["绑定数据：",se.name]}),o.jsxs("button",{className:"ghost",onClick:()=>ne("删除业务字段",async()=>{oe(),l(await fe("tencentSheet.deleteField",{id:n,fieldId:se.id})),Y===se.id&&le(""),a()}),children:["删除：",se.name]})]})]},se.id)})})]}),(we||Ce)&&o.jsxs("div",{ref:ae,children:[we&&!Ce&&o.jsx(aA,{id:n,businessDate:v&&b?b:s.businessDate,metrics:[{value:we.id,label:we.name}],initialMetric:we.id,rules:ce.rules,fixedSheet:ce.sheetMode==="fixed",disabled:!!c||T||H,run:ne,onActive:se=>{_(se),se&&oe()},onSaved:async()=>{await I(),oe(),le(""),m("这个业务字段的数据来源和填报位置已配置完成，可以新增下一个字段或获取本次数据。"),a()}},`${n}:${we.id}:${JSON.stringify(ce.rules)}`),Ce&&o.jsx(sA,{id:n,field:Ce,continueToTeaching:te&&!((ct=ce.rules)!=null&&ct[Ce.id]),disabled:!!c,onCancel:()=>G(""),onSave:se=>ne("保存数据绑定",()=>be(Ce,se))},Ce.id)]}),o.jsx(oA,{rule:ce.businessDateRule??{kind:"relative",offsetDays:-1},schedule:ce.executionSchedule??Q0,disabled:Ve||!!s.enabled,onChange:(se,Ne)=>me({...ce,businessDateRule:se,executionSchedule:Ne})}),o.jsxs("fieldset",{disabled:Ve||T,className:"tencent-sheet-panel",children:[o.jsx("legend",{children:"前台测试"}),o.jsxs("label",{className:"tencent-sheet-date-mode",children:[o.jsx("input",{type:"checkbox",checked:v,onChange:se=>{x(se.target.checked),oe()}}),"指定补填日期"]}),v?o.jsx(Gt,{label:"本次业务日期",disabled:!!c,value:b,onChange:se=>{E(se),oe()}}):o.jsxs("p",{children:["按已保存规则计算的业务日期：",(C==null?void 0:C.date)??s.businessDate??"获取数据时确定","。本次取数后日期固定，检查与填报沿用同一天。"]}),o.jsx("button",{className:"secondary",disabled:!he.length||v&&!b||he.some(se=>{var Ne;return!((Ne=ce.rules)!=null&&Ne[se.id])||!se.notion}),onClick:()=>ne("获取 Notion 数据",async()=>{oe(),V(await fe("tencentSheet.fetch",{id:n,businessDate:v?b:void 0},3e5)),m("取数完成，请核对来源、日期和数值后检查网页位置。")}),children:"获取本次 Notion 数据"}),C&&o.jsxs("div",{className:"tencent-sheet-table",children:[o.jsxs("p",{children:["业务日期：",C.date]}),o.jsxs("table",{children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{children:"业务字段"}),o.jsx("th",{children:"数值"}),o.jsx("th",{children:"来源与范围"}),o.jsx("th",{children:"记录数"})]})}),o.jsx("tbody",{children:C.rows.map(se=>o.jsxs("tr",{children:[o.jsx("td",{children:se.name}),o.jsxs("td",{children:[se.value," ",se.unit]}),o.jsxs("td",{children:[se.source," · ",se.period]}),o.jsx("td",{children:se.recordCount})]},se.id))})]})]}),o.jsx("button",{className:"primary",disabled:!he.length||v&&!b||!C,onClick:()=>ne("检查填报位置",async()=>{N(void 0);const se=await fe("tencentSheet.inspect",{id:n,dataToken:C==null?void 0:C.dataToken,businessDate:(C==null?void 0:C.date)??(v?b:void 0)},3e5);N(se),m(se.message),a()}),children:"检查本次数据与位置"})]}),o.jsxs("fieldset",{disabled:Ve||T,className:"tencent-sheet-panel",children:[o.jsx("legend",{children:"后台自动测试"}),o.jsx("p",{className:"tencent-sheet-help",children:"按本次业务日期重新取数，自动检查位置、填写空白格并确认保存。这会真实写入文档。测试时关闭前台填报浏览器，复用登录状态在后台运行；失败后可重新打开文档检查。"}),o.jsx("p",{className:"tencent-sheet-help",children:"所有字段须绑定 Notion。测试通过后，可在任务列表启用定时；当前环境须开放 Windows 调度，电脑须开机且用户已登录。已有执行记录的业务日期不会由定时再次填写。"}),o.jsx("button",{className:"primary",disabled:!he.length||he.some(se=>{var Ne;return!se.notion||!((Ne=ce.rules)!=null&&Ne[se.id])})||v&&!b,onClick:()=>ne("后台取数、填报并确认保存",async()=>{oe();try{const se=await fe("tencentSheet.backgroundTest",{id:n,businessDate:v?b:void 0},6e5);m(se.message)}finally{await I(),a()}}),children:"后台自动测试并填写"}),s.enabled&&o.jsx("p",{className:"tencent-sheet-help",children:"定时填报已启用。修改配置前请先在任务列表停用。"})]}),w&&o.jsxs("section",{className:"tencent-sheet-panel",children:[o.jsx("h3",{children:"确认填报"}),o.jsxs("p",{children:["业务日期：",w.date," · ",w.sheet]}),o.jsx("div",{className:"tencent-sheet-table",children:o.jsxs("table",{children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{children:"项目"}),o.jsx("th",{children:"位置"}),o.jsx("th",{children:"原内容"}),o.jsx("th",{children:"本次填报"})]})}),o.jsx("tbody",{children:w.rows.map(se=>o.jsxs("tr",{children:[o.jsx("td",{children:se.label}),o.jsx("td",{children:se.address}),o.jsx("td",{children:se.current||"空白"}),o.jsx("td",{children:se.value})]},se.address))})]})}),o.jsx("p",{children:w.conflict?"目标格已有内容，本次不可写入。":"将仅填写以上空白单元格。确认有效期为 2 分钟。"}),o.jsxs("button",{className:"primary",disabled:Ve||!w.token||w.conflict,onClick:()=>ne("填报并确认保存",async()=>{const se=w;N(void 0);const Ne=await fe("tencentSheet.write",{id:n,dataToken:C==null?void 0:C.dataToken,businessDate:se.date,token:se.token},31e4);m(Ne.message),a()}),children:["确认填报以上 ",w.rows.length," 项"]})]}),c&&o.jsxs("p",{role:"status",className:"tencent-sheet-progress",children:[o.jsx(hn,{className:"spin"}),c,"… 请等待操作结束"]})]})}const J0=[{taskType:"tencent_sheet_fill",name:"腾讯文档填报",includeBasics:!1,description:"录制文档控件与业务位置，按执行规则从 Notion 取数填报。",renderCreate:n=>o.jsx(dA,{...n}),taskTabs:[{id:"configuration",label:"配置与填报"}],resolveSection:()=>"configuration",issueTitle:()=>"请完成文档连接与位置检查",renderEditor:n=>o.jsx(fA,{id:n.id,changed:n.changed},n.id),loadRuns:n=>fe("tencentSheet.runs",{id:n}).then(({runs:a})=>a.map(s=>({...s,source:s.source==="background-test"?"后台自动测试":s.source==="automatic"?"定时填报":"前台测试",title:s.businessDate,details:s.message?[s.message]:[]})))},{taskType:"daily_report",name:"日报推送",description:"查询日报数据、生成消息并发送钉钉。",renderCreate:n=>o.jsx(WD,{...n}),taskTabs:[{id:"configuration",label:"任务配置"},{id:"execution",label:"运行与测试"}],resolveSection:n=>n==="basics"?"basics":n==="template"?"configuration":"execution",issueTitle:n=>n==="notification"?"通知渠道未就绪":n==="template"?"日报配置尚未验证":"基本信息不完整",renderEditor:n=>o.jsx(i0,{id:n.id,back:()=>n.navigate("list"),changed:n.changed,openSettings:n.openSettings}),loadRuns:n=>fe("daily.runs",{id:n}).then(({runs:a})=>a.map(s=>({id:s.id,time:s.time,source:s.source,status:s.status,title:s.textSummary||`业务日期 ${s.businessDate||"—"}`,details:[`业务日期：${s.businessDate||"—"}`,`阶段：${s.stage}`,`尝试：${s.attempts}`],error:s.error})))},{taskType:"notion_fill",name:"Notion 自动填报",description:"读取 93 系统前一天入库数据并新增到 Notion。",renderCreate:n=>o.jsx(eA,{...n}),taskTabs:[{id:"configuration",label:"任务配置"},{id:"execution",label:"运行与测试"}],resolveSection:n=>n==="basics"?"basics":n==="test"?"execution":"configuration",issueTitle:n=>n==="connection"?"93 系统连接未就绪":n==="target"?"Notion 填报目标未就绪":n==="test"?"任务尚未完成只读测试":"基本信息不完整",renderEditor:n=>o.jsx(s0,{id:n.id,back:()=>n.navigate("list"),changed:n.changed,openSettings:n.openSettings}),loadRuns:n=>fe("notionFill.runs",{id:n}).then(({runs:a})=>a.map(s=>({id:s.id,time:s.time,source:s.source==="source-test"?"93读取测试":s.source==="test"?"只读测试":s.source==="manual"?"手动执行":"自动执行",status:s.status==="created"?"已新增":s.status==="checked"?"已检查":"失败",title:`${s.businessDate} · 板材 ${s.plateWeight.toLocaleString("zh-CN",{maximumFractionDigits:3})} 吨 · 型材 ${s.sectionWeight.toLocaleString("zh-CN",{maximumFractionDigits:3})} 吨`,details:[s.message].filter(Boolean),error:s.error})))}];function Kv(n){return J0.find(a=>a.taskType===n)}const Sd=n=>({tone:"error",title:"操作失败",message:n instanceof Error?n.message:String(n)});function hA({openSettings:n}){var M;const[a,s]=S.useState([]),[l,c]=S.useState(),[h,d]=S.useState(""),[m,p]=S.useState(""),[g,v]=S.useState(),[x,b]=S.useState(),[E,w]=S.useState(),[N,T]=S.useState(!1),[A,k]=S.useState(""),[_,z]=S.useState(["daily_report","notion_fill"]),U=()=>fe("automation.list").then(O=>{O.availableTaskTypes&&z(O.availableTaskTypes);const $=Array.isArray(O.tasks)?O.tasks:a;return s($),c(Z=>Z&&($.find(ue=>ue.taskType===Z.taskType&&ue.id===Z.id)||Z)),$});S.useEffect(()=>{U().catch(O=>v(Sd(O)))},[]),S.useEffect(()=>{if(!x)return;const O=()=>b(void 0),$=Z=>Z.key==="Escape"&&O();return window.addEventListener("pointerdown",O),window.addEventListener("keydown",$),window.addEventListener("blur",O),()=>{window.removeEventListener("pointerdown",O),window.removeEventListener("keydown",$),window.removeEventListener("blur",O)}},[x]);async function L(O,$){const Z=await U();T(!1),k(""),c(Z.find(ue=>ue.taskType===O&&ue.id===$.id))}async function D(O){p(O.id),v(void 0);try{const $=await fe("automation.setEnabled",{taskType:O.taskType,id:O.id,enabled:!O.isEnabled},6e4);$.missingStep?(d($.missingStep),c(O),v({tone:"warning",title:"配置尚未完成",message:$.message||""})):await U()}catch($){v(Sd($))}finally{p("")}}async function H(O){if(!O.isEnabled){p(O.id);try{await fe("automation.delete",{taskType:O.taskType,id:O.id}),w(void 0),await U()}catch($){v(Sd($))}finally{p("")}}}if(l){const O=Kv(l.taskType);if(O)return o.jsx(mA,{openSettings:n,task:l,definition:O,focusStep:h,notice:g,refresh:U,back:()=>{c(void 0),d(""),v(void 0),U()}})}return o.jsxs("div",{className:"page daily-page automation-list-page",children:[o.jsxs("header",{children:[o.jsxs("div",{children:[o.jsx("h1",{children:"自动化任务"}),o.jsx("p",{children:"管理定时推送与自动填报，查看任务配置和运行情况。"})]}),o.jsx("div",{className:"header-actions",children:o.jsxs("button",{className:"primary",onClick:()=>T(!0),children:[o.jsx(KC,{}),"新建任务"]})})]}),g&&o.jsx("div",{className:`notice ${g.tone}`,role:"status",children:o.jsxs("div",{children:[o.jsx("strong",{children:g.title}),o.jsx("span",{children:g.message})]})}),o.jsxs("section",{className:"daily-job-list","aria-label":"任务列表",children:[a.map(O=>o.jsxs("article",{className:`daily-job-card${["incomplete","pending-test","schedule-error"].includes(O.status)?" needs-attention":""}`,onClick:()=>c(O),onContextMenu:$=>{$.preventDefault(),b({task:O,x:Math.min($.clientX,window.innerWidth-176),y:Math.min($.clientY,window.innerHeight-58)})},children:[o.jsxs("div",{className:"job-copy",children:[o.jsx("h2",{children:o.jsx("button",{type:"button",className:"automation-task-name",onClick:$=>{$.stopPropagation(),c(O)},children:O.name||"未命名任务"})}),o.jsxs("p",{children:[O.taskTypeName," · ",O.schedule," · ",O.connectionStatus]})]}),o.jsxs("div",{className:"job-actions",onClick:$=>$.stopPropagation(),children:[o.jsx("span",{className:`job-status ${O.status}`,children:W0(O.status)}),o.jsxs("label",{className:"switch",children:[o.jsx("input",{type:"checkbox","aria-label":`启用${O.name||"未命名任务"}`,checked:O.isEnabled,disabled:!O.schedulingAvailable||m===O.id,title:O.schedulingAvailable?void 0:"Development 环境默认不启用定时任务",onChange:()=>D(O)}),o.jsx("span",{})]}),o.jsx("button",{type:"button",className:"automation-task-more","aria-label":`${O.name||"未命名任务"}的更多操作`,"aria-haspopup":"menu",onClick:$=>{const Z=$.currentTarget.getBoundingClientRect();b({task:O,x:Math.min(Z.left,window.innerWidth-176),y:Math.min(Z.bottom+4,window.innerHeight-58)})},children:o.jsx(FC,{})})]}),o.jsxs("div",{className:"automation-card-footer",children:["最近运行：",O.lastRun]})]},`${O.taskType}:${O.id}`)),!a.length&&o.jsxs("div",{className:"empty-state",children:[o.jsx(XC,{}),o.jsx("h2",{children:"还没有自动化任务"}),o.jsx("p",{children:"选择一种任务类型，新建后进入对应的专用配置界面。"})]})]}),!!a.length&&o.jsx("p",{className:"automation-list-help",children:"点击任务名称进入配置。日报配置通知后即可开启，执行结果见运行记录。"}),x&&o.jsx("div",{className:"job-context-menu",role:"menu",style:{left:x.x,top:x.y},onPointerDown:O=>O.stopPropagation(),children:o.jsxs("button",{className:"danger-quiet",role:"menuitem",disabled:x.task.isEnabled||m===x.task.id,onClick:()=>{w(x.task),b(void 0)},children:[o.jsx(IC,{}),x.task.isEnabled?"停用后可删除":"删除任务"]})}),o.jsx(ls,{open:!!E,onOpenChange:O=>!O&&w(void 0),children:o.jsxs(os,{children:[o.jsx(cs,{className:"dialog-overlay"}),o.jsxs(ds,{className:"dialog",children:[o.jsx(fs,{children:"删除自动化任务？"}),o.jsxs(hs,{children:["将删除“",E==null?void 0:E.name,"”及其业务记录，此操作无法撤销。"]}),o.jsxs("div",{className:"dialog-actions",children:[o.jsx("button",{className:"secondary",onClick:()=>w(void 0),children:"取消"}),o.jsx("button",{className:"danger",disabled:!!m,onClick:()=>E&&H(E),children:"确认删除"})]})]})]})}),o.jsx(ls,{open:N,onOpenChange:O=>{T(O),O||k("")},children:o.jsxs(os,{children:[o.jsx(cs,{className:"dialog-overlay"}),o.jsxs(ds,{className:"dialog automation-create-dialog",children:[o.jsx(fs,{children:"新建自动化任务"}),o.jsx(hs,{children:A?"填写任务信息，创建后可随时通过 Tab 修改。":"先选择任务类型，后续配置由对应任务自己提供。"}),A?(M=Kv(A))==null?void 0:M.renderCreate({onCreated:O=>L(A,O),onBack:()=>k(""),onCancel:()=>{T(!1),k("")}}):o.jsx("div",{className:"automation-create-types",children:J0.filter(O=>_.includes(O.taskType)).map(O=>o.jsxs("button",{onClick:()=>k(O.taskType),children:[o.jsx("strong",{children:O.name}),o.jsx("span",{children:O.description})]},O.taskType))})]})]})})]})}function mA({openSettings:n,task:a,definition:s,focusStep:l,notice:c,refresh:h,back:d}){const[m,p]=S.useState(l?s.resolveSection(l):s.includeBasics===!1?s.taskTabs[0].id:"basics"),g=a.taskType==="daily_report",[v,x]=S.useState(),[b,E]=S.useState(""),[w,N]=S.useState(!1),T=[...s.includeBasics===!1?[]:[{id:"basics",label:"基本信息"}],...s.taskTabs,{id:"runs",label:"运行记录"}],A=[...a.missingMessage?[{id:`configuration:${a.missingStep||"unknown"}`,title:s.issueTitle(a.missingStep||""),message:a.missingMessage,section:s.resolveSection(a.missingStep||"")}]:[],...a.status==="schedule-error"&&a.schedulerMessage?[{id:"scheduler",title:"计划任务异常",message:a.schedulerMessage,section:"basics"}]:[]];async function k(){N(!0),E("");try{x(await s.loadRuns(a.id))}catch(z){E(z instanceof Error?z.message:String(z))}finally{N(!1)}}S.useEffect(()=>{m==="runs"&&v===void 0&&k()},[m,v]);function _(z,U){var D;if(z.key!=="ArrowLeft"&&z.key!=="ArrowRight")return;z.preventDefault();const L=(U+(z.key==="ArrowRight"?1:-1)+T.length)%T.length;p(T[L].id),T[L].id==="basics"&&h().catch(()=>{}),(D=document.getElementById(`automation-tab-${T[L].id}`))==null||D.focus()}return g?o.jsx(i0,{id:a.id,back:d,changed:h,openSettings:n}):a.taskType==="notion_fill"?o.jsx(s0,{id:a.id,back:d,changed:h,openSettings:n}):o.jsxs("div",{className:"page daily-page automation-detail",children:[o.jsxs("header",{children:[o.jsxs("div",{children:[o.jsxs("button",{className:"back-link","aria-label":"返回任务列表",onClick:d,children:[o.jsx(ss,{}),"返回任务列表"]}),o.jsx("h1",{title:a.name||"未命名任务",children:a.name||"未命名任务"}),o.jsxs("p",{children:[a.taskTypeName," · ",a.schedule]})]}),o.jsx("span",{className:`job-status ${a.status}`,children:W0(a.status)})]}),o.jsx("div",{className:"automation-tabs",role:"tablist","aria-label":"任务详情",children:T.map((z,U)=>o.jsx("button",{type:"button",role:"tab",id:`automation-tab-${z.id}`,"aria-selected":m===z.id,"aria-controls":`automation-panel-${z.id}`,tabIndex:m===z.id?0:-1,onClick:()=>{p(z.id),z.id==="basics"&&h().catch(()=>{})},onKeyDown:L=>_(L,U),children:z.label},z.id))}),o.jsxs("div",{children:[c&&o.jsx("div",{className:`notice ${c.tone}`,role:"status",children:o.jsxs("div",{children:[o.jsx("strong",{children:c.title}),o.jsx("span",{children:c.message})]})}),!!A.length&&o.jsxs("section",{className:"automation-issues","aria-labelledby":"automation-issues-title",children:[o.jsxs("div",{className:"automation-issues-heading",children:[o.jsx(eN,{}),o.jsxs("div",{children:[o.jsx("h2",{id:"automation-issues-title",children:"配置问题"}),o.jsx("p",{children:"完成以下项目后才能安全启用任务。"})]}),o.jsxs("span",{children:[A.length," 项"]})]}),o.jsx("ul",{children:A.map(z=>{var U;return o.jsxs("li",{children:[o.jsxs("div",{children:[o.jsx("strong",{children:z.title}),o.jsx("span",{children:z.message})]}),o.jsxs("button",{type:"button",onClick:()=>{p(z.section)},children:["前往",((U=T.find(L=>L.id===z.section))==null?void 0:U.label)||"处理",o.jsx(LC,{})]})]},z.id)})})]}),o.jsxs("div",{className:"automation-tab-panel",role:"tabpanel",id:`automation-panel-${m}`,"aria-labelledby":`automation-tab-${m}`,children:[o.jsx("div",{hidden:m==="runs",children:s.renderEditor({id:a.id,section:m,openSettings:n,navigate:p,changed:()=>{h().catch(()=>{})}})}),m==="runs"&&o.jsxs("section",{className:"surface automation-runs",children:[o.jsxs("div",{className:"automation-runs-heading",children:[o.jsxs("div",{children:[o.jsx("h2",{children:"运行记录"}),o.jsx("p",{children:"查看任务执行结果和错误详情。"})]}),o.jsxs("button",{className:"secondary",disabled:w,onClick:k,children:[w?o.jsx(hn,{className:"spin"}):o.jsx(ZC,{}),"刷新"]})]}),b&&o.jsx("div",{className:"notice error",role:"alert",children:o.jsxs("div",{children:[o.jsx("strong",{children:"运行记录读取失败"}),o.jsx("span",{children:b})]})}),o.jsx("div",{className:"automation-run-list",children:v==null?void 0:v.map(z=>o.jsxs("details",{children:[o.jsxs("summary",{children:[o.jsx("span",{children:z.time}),o.jsx("span",{children:z.source}),o.jsx("strong",{children:z.title}),o.jsx("b",{className:z.error?"error-text":"",children:z.status})]}),o.jsxs("div",{children:[z.details.map(U=>o.jsx("p",{children:U},U)),z.error&&o.jsxs("p",{className:"run-error",children:["错误：",z.error]})]})]},z.id))}),!w&&v&&!v.length&&o.jsx("p",{className:"automation-empty",children:"暂无运行记录"})]})]})]})]})}function W0(n){return{incomplete:"配置未完成","pending-test":"待测试",checked:"已验证",ready:"可启用",enabled:"已启用","schedule-error":"计划异常"}[n]||n}function Zv({value:n,onChange:a,unit:s,className:l="",disabled:c,ariaLabel:h,onKeyDown:d}){return o.jsxs("div",{className:`numeric-input ${l}`.trim(),children:[o.jsx("input",{type:"text",inputMode:"decimal",value:n,disabled:c,"aria-label":h,onChange:m=>a(m.target.value),onKeyDown:d}),s&&o.jsx("span",{children:s})]})}function I0({current:n,titles:a,label:s}){const l=a.map((c,h)=>({number:h+1,title:c}));return o.jsx("div",{className:"step-bar","aria-label":s,children:l.map((c,h)=>{const d=c.number<n?"done":c.number===n?"active":"pending";return o.jsxs(S.Fragment,{children:[o.jsxs("div",{className:`step step-${d}`,"aria-current":d==="active"?"step":void 0,children:[o.jsx("div",{className:`step-circle ${d}`,children:d==="done"?o.jsx(Qa,{}):c.number}),o.jsx("span",{children:c.title})]}),h<l.length-1&&o.jsx("div",{className:`step-line ${c.number<n?"done":c.number===n?"transition":"pending"}`})]},c.number)})})}const Qv={configured:!1,binding:{bound:!1,name:"",path:""},usesBusinessSections:!1,businessSections:[],sources:[],selected:""};function pA(){const n=new Date;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`}function gA({openSettings:n}){const[a,s]=S.useState(1),[l,c]=S.useState(pA),[h,d]=S.useState(""),[m,p]=S.useState([]),[g,v]=S.useState(Qv),[x,b]=S.useState(!1),[E,w]=S.useState("database"),[N,T]=S.useState(""),[A,k]=S.useState(""),[_,z]=S.useState(!1),[U,L]=S.useState("state"),[D,H]=S.useState(""),[M,O]=S.useState(""),[$,Z]=S.useState(),ue=S.useRef(!1),de=S.useRef(!1);S.useEffect(()=>{fe("weld.getState").then(J=>{var te;const ce=J!=null&&J.binding&&Array.isArray(J.sources)?J:Qv;v(ce),T(((te=ce.sources.find(he=>he.id===ce.selected))==null?void 0:te.businessSection)||""),k(ce.selected)}).catch(J=>H(J instanceof Error?J.message:"读取 Notion 配置失败")).finally(()=>L(void 0))},[]);const ye=/^\d+$/.test(h)&&Number(h)>0,Y=S.useMemo(()=>m.reduce((J,ce)=>J+Number(ce.qty||0),0),[m]),le=Y-Number(h||0),Q=m.length>0&&m.every(J=>/^\d+$/.test(J.qty))&&le===0,G=g.usesBusinessSections?g.sources.filter(J=>J.businessSection===N):g.sources,ae=!!U;async function C(){if(!(!ye||ae)){L("generate"),H("");try{const J=await fe("weld.generate",{month:l,total:h});p(J.map(ce=>({...ce,qty:String(ce.qty)}))),s(2)}catch(J){H(J instanceof Error?J.message:"拆分失败")}finally{L(void 0)}}}function V(J,ce){ce!==""&&!/^\d+$/.test(ce)||p(te=>te.map((he,we)=>we===J?{...he,qty:ce}:he))}async function I(){if(!(!A||U)){L("binding"),H("");try{const J=await fe("weld.saveBinding",{sourceId:A});v(J),k(J.selected),b(!1)}catch(J){H(J instanceof Error?J.message:"绑定失败")}finally{L(void 0)}}}async function ne(){if(!Q||!g.binding.bound||ae||ue.current)return;ue.current=!0,L("check"),H("");const J={month:l,total:h,rows:m.map(ce=>({date:ce.date,qty:ce.qty}))};try{if((await fe("weld.check",J,12e4)).hasExistingData){z(!0);return}await oe(J,!1)}catch(ce){H(ce instanceof Error?ce.message:"Notion 数据检查失败")}finally{ue.current=!1,L(ce=>ce==="check"?void 0:ce)}}async function oe(J,ce){if(!de.current){de.current=!0,L("write"),H(""),Z(void 0);try{const te=await fe("weld.write",{...J,overwriteExisting:ce},12e4,he=>Z(he));O(te.message),z(!1),s(3)}catch(te){H(te instanceof Error?te.message:"写入 Notion 失败")}finally{de.current=!1,L(void 0)}}}function me(){s(1),p([]),d(""),O(""),H(""),Z(void 0)}function be(){var J;ae||(k(g.selected),T(((J=g.sources.find(ce=>ce.id===g.selected))==null?void 0:J.businessSection)||""),H(""),w("database"),b(!0))}const ie={month:l,total:h,rows:m.map(J=>({date:J.date,qty:J.qty}))};return o.jsx("div",{className:"app-shell",children:o.jsxs("main",{className:"main-content",children:[o.jsxs("header",{className:"content-header",children:[o.jsx("h1",{children:"每日焊接数据模拟"}),o.jsx("button",{type:"button",className:"template-config-button",disabled:ae,"aria-label":"焊接设置",title:"焊接设置",onClick:be,children:o.jsx($f,{})})]}),o.jsxs("div",{className:"production-message-scroll daily-weld-page",children:[o.jsx(I0,{current:a,titles:["录入计划","拆分预览","完成"],label:"焊接计划拆分进度"}),D&&o.jsx("div",{className:"weld-notice error",role:"alert",children:D}),a===1&&o.jsxs("section",{className:"weld-plan-card","aria-labelledby":"weld-plan-title",children:[o.jsx("div",{className:"weld-section-heading",children:o.jsx("h2",{id:"weld-plan-title",children:"计划信息"})}),o.jsxs("div",{className:"weld-fields",children:[o.jsx(Gt,{label:"计划月份",value:l,selectionMode:"month",disabled:ae,onChange:c}),o.jsxs("label",{className:"weld-field",children:[o.jsx("span",{children:"计划焊接总量"}),o.jsx(Zv,{value:h,disabled:ae,onChange:J=>{(J===""||/^\d+$/.test(J))&&d(J)},unit:"吨",ariaLabel:"计划焊接总量"})]})]}),o.jsx("div",{className:"weld-actions",children:o.jsx("button",{type:"button",className:"primary-button",disabled:!ye||ae,onClick:C,children:U==="generate"?"正在拆分…":"下一步：拆分预览"})})]}),a===2&&o.jsxs("section",{className:"weld-preview","aria-labelledby":"weld-preview-title",children:[o.jsxs("div",{className:"weld-preview-heading",children:[o.jsxs("div",{children:[o.jsxs("h2",{id:"weld-preview-title",children:[l.replace("-"," 年 ")," 月每日拆分详情"]}),o.jsx("p",{children:"可直接修改任意一天的数值；不满意本次浮动效果可重新模拟。"})]}),o.jsxs("button",{type:"button",className:"secondary",disabled:ae,onClick:C,children:[o.jsx(Ib,{}),"重新模拟浮动"]})]}),o.jsx("div",{className:"weld-table-wrap",children:o.jsxs("table",{children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{children:"日期"}),o.jsx("th",{children:"星期"}),o.jsx("th",{children:"类型"}),o.jsx("th",{children:"计划量（吨）"})]})}),o.jsx("tbody",{children:m.map((J,ce)=>o.jsxs("tr",{children:[o.jsx("td",{children:J.date}),o.jsx("td",{children:J.weekday}),o.jsx("td",{children:o.jsx("span",{className:`weld-day-pill ${J.isWeekend?"weekend":""}`,children:J.isWeekend?"休息日":"工作日"})}),o.jsx("td",{children:o.jsx(Zv,{value:J.qty,disabled:ae,onChange:te=>V(ce,te),unit:"吨",ariaLabel:`${J.date} 计划量`})})]},J.date))})]})}),o.jsxs("div",{className:"weld-summary",children:[o.jsxs("span",{children:["共 ",m.length," 天 · 计划总量 ",o.jsx("strong",{children:h})," 吨"]}),o.jsxs("span",{children:["拆分合计 ",o.jsx("strong",{children:Y})," 吨 ",le===0?o.jsx("em",{className:"match",children:"与计划总量一致"}):o.jsxs("em",{className:"mismatch",children:["偏差 ",le>0?"+":"",le," 吨，可手动调整"]})]})]}),U==="write"&&o.jsx("div",{className:"weld-write-progress",role:"status","aria-live":"polite",children:$?`正在写入 ${$.date.slice(0,10)}（${$.current}/${$.total}）`:"正在准备 Notion 层级数据…"}),o.jsxs("div",{className:"weld-actions split",children:[o.jsx("button",{type:"button",className:"secondary",disabled:ae,onClick:()=>s(1),children:"返回修改"}),o.jsx("button",{type:"button",className:"primary-button",disabled:!Q||!g.binding.bound||ae,onClick:ne,children:U==="check"?"正在检查…":U==="write"?"正在写入…":"确认并写入 Notion"})]})]}),a===3&&o.jsxs("section",{className:"complete-view weld-complete",children:[o.jsx("div",{className:"complete-icon",children:o.jsx(Qa,{})}),o.jsx("h2",{children:"入库完成"}),o.jsx("p",{children:M||`${l} 共 ${m.length} 天的焊接计划数据已写入 Notion。`}),o.jsx("button",{className:"primary-button",onClick:me,children:"拆分下一个月"})]})]}),x&&o.jsx("div",{className:"weld-settings-overlay",children:o.jsxs("section",{className:"weld-settings-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"weld-settings-title",children:[o.jsxs("aside",{className:"weld-settings-nav",children:[o.jsx("h2",{id:"weld-settings-title",children:"焊接设置"}),o.jsxs("nav",{"aria-label":"焊接设置分类",children:[o.jsxs("button",{type:"button",className:E==="rules"?"active":"",onClick:()=>w("rules"),children:[o.jsx(WC,{}),"拆分规则"]}),o.jsxs("button",{type:"button",className:E==="database"?"active":"",onClick:()=>w("database"),children:[o.jsx(Qd,{}),"数据库绑定"]})]})]}),o.jsxs("div",{className:"weld-settings-main",children:[o.jsx("button",{type:"button",className:"weld-settings-close","aria-label":"关闭焊接设置",disabled:U==="binding",onClick:()=>b(!1),children:o.jsx(Mo,{})}),E==="rules"?o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"weld-settings-heading",children:[o.jsx("h3",{children:"拆分规则"}),o.jsx("p",{children:"当前规则用于生成每日焊接计划，修改每日数值后仍需保证月度合计一致。"})]}),o.jsxs("dl",{className:"weld-rule-list",children:[o.jsxs("div",{children:[o.jsx("dt",{children:"分配周期"}),o.jsx("dd",{children:"按所选月份的全部自然日"})]}),o.jsxs("div",{children:[o.jsx("dt",{children:"产量浮动"}),o.jsx("dd",{children:"基准量叠加 22% 随机波动"})]}),o.jsxs("div",{children:[o.jsx("dt",{children:"周末权重"}),o.jsx("dd",{children:"周六、周日自动降低计划权重"})]}),o.jsxs("div",{children:[o.jsx("dt",{children:"总量配平"}),o.jsx("dd",{children:"每日取整后自动配平至月度计划"})]})]})]}):o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"weld-settings-heading",children:[o.jsx("h3",{children:"数据库绑定"}),o.jsx("p",{children:"每项业务只绑定一个主写入数据库，汇总数据库由系统自动维护。"})]}),D&&o.jsx("div",{className:"weld-notice error",role:"alert",children:D}),o.jsxs("section",{className:"weld-business-binding","aria-labelledby":"weld-business-title",children:[o.jsxs("div",{className:"weld-business-title",children:[o.jsxs("div",{children:[o.jsx("h4",{id:"weld-business-title",children:"焊接业务"}),o.jsx("p",{children:"每日焊接计划的主写入数据库"})]}),o.jsx("span",{className:g.binding.bound?"bound":"",children:g.binding.bound?"已绑定":"未绑定"})]}),!g.configured||!g.sources.length?o.jsx("div",{className:"weld-notice",children:"请先在系统设置中完成数据库连接并刷新数据源。"}):o.jsxs("div",{className:"weld-dialog-field",children:[g.usesBusinessSections&&o.jsxs(o.Fragment,{children:[o.jsx("span",{children:"业务板块"}),o.jsx(Ie,{value:N,options:g.businessSections.map(J=>({value:J,label:J})),placeholder:"选择焊接业务板块",ariaLabel:"焊接业务板块",disabled:U==="binding",onChange:J=>{T(J),k("")}})]}),o.jsx("span",{children:"主写入数据库"}),o.jsx(Ie,{value:A,options:G.map(J=>({value:J.id,label:J.name})),placeholder:"选择每日焊接量数据库",ariaLabel:"焊接业务主写入数据库",disabled:g.usesBusinessSections&&!N||U==="binding",onChange:k})]}),o.jsx("p",{className:"weld-binding-help",children:"月度和周度汇总数据库由系统在写入时自动维护，无需单独绑定。"})]}),o.jsxs("div",{className:"weld-settings-actions",children:[o.jsx("button",{type:"button",disabled:U==="binding",onClick:()=>b(!1),children:"取消"}),!g.configured||!g.sources.length?o.jsx("button",{type:"button",className:"primary-button",onClick:n,children:"前往系统设置"}):o.jsx("button",{type:"button",className:"primary-button",disabled:!A||U==="binding",onClick:I,children:U==="binding"?"正在检测…":"保存绑定"})]})]})]})]})}),_&&o.jsx("div",{className:"pm-dialog-overlay",children:o.jsxs("section",{className:"pm-dialog weld-confirm-dialog",role:"alertdialog","aria-modal":"true","aria-labelledby":"weld-overwrite-title",children:[o.jsx("h2",{id:"weld-overwrite-title",children:"确认覆盖已有产量"}),o.jsxs("p",{children:[l," 已存在产量数据。继续后将按本次拆分结果覆盖该月每日产量，并更新月、周、日关联。"]}),D&&o.jsx("div",{className:"weld-notice error",role:"alert",children:D}),U==="write"&&o.jsx("div",{className:"weld-write-progress",role:"status","aria-live":"polite",children:$?`正在写入 ${$.date.slice(0,10)}（${$.current}/${$.total}）`:"正在准备 Notion 层级数据…"}),o.jsxs("div",{className:"pm-dialog-actions",children:[o.jsx("button",{type:"button",disabled:U==="write",onClick:()=>z(!1),children:"取消"}),o.jsx("button",{type:"button",className:"primary-button",disabled:U==="write",onClick:()=>oe(ie,!0),children:U==="write"?"正在写入…":"确认覆盖并写入"})]})]})})]})})}const e1=[{category:"数据文件处理",name:"挂网计划 PDF 导出"},{category:"数据文件处理",name:"生产会资料拆分"},{category:"数据文件处理",name:"文件统计汇总"},{category:"数据同步",name:"每日焊接数据模拟"},{category:"数据同步",name:"生产消息 Notion 入库"},{category:"数据同步",name:"数据库查看"},{category:"自动化",name:"自动化任务"}],yA=[...new Set(e1.map(n=>n.category))];function vA(n){switch(n){case"挂网计划 PDF 导出":return"plan-pdf";case"生产会资料拆分":return"production-meeting";case"每日焊接数据模拟":return"daily-weld";case"生产消息 Notion 入库":return"production-message";case"数据库查看":return"database-viewer";case"文件统计汇总":return"report-center";case"自动化任务":return"daily-report";default:return"plan-pdf"}}function xA({active:n,navigate:a,openSettings:s}){return o.jsxs("aside",{className:"sidebar",children:[o.jsx("div",{className:"sidebar-top",children:o.jsx("div",{className:"sidebar-brand",children:"生产助手"})}),o.jsx("nav",{className:"sidebar-nav","aria-label":"业务模块",children:yA.map(l=>o.jsxs("section",{className:"sidebar-section",children:[o.jsx("div",{className:"sidebar-section-label",children:l}),e1.filter(c=>c.category===l).map(c=>{const h=vA(c.name),d=h===n;return o.jsxs("button",{className:`sidebar-item ${d?"sidebar-item-active":""}`,"aria-current":d?"page":void 0,onClick:()=>a(h),children:[o.jsx(Jv,{name:c.name}),o.jsx("span",{children:c.name})]},c.name)})]},l))}),o.jsx("div",{className:"sidebar-bottom",children:o.jsxs("button",{className:"sidebar-item","aria-haspopup":"dialog",onClick:s,children:[o.jsx(Jv,{name:"设置"}),o.jsx("span",{children:"设置"})]})})]})}function Jv({name:n}){return n==="挂网计划 PDF 导出"||n==="生产会资料拆分"?o.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("path",{className:"folder-lid",d:"M3.5 7h6l1.8 2h9.2"}),o.jsx("path",{d:"M4.2 7h15.6l-1.3 11H5.5L4.2 7Z"})]}):n==="每日焊接数据模拟"||n==="自动化任务"?o.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("rect",{x:"5",y:"4.5",width:"14",height:"15",rx:"2"}),o.jsx("path",{d:"M8 3v3M16 3v3M5 9h14"}),o.jsx("path",{className:"daily-check",d:"m8.5 14 2 2 4.5-4.5"})]}):n==="生产消息 Notion 入库"?o.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("path",{d:"M4 14.5 6.2 6h11.6l2.2 8.5V19H4v-4.5Z"}),o.jsx("path",{className:"inbox-tray",d:"M4.3 14h4.1l1.2 2h4.8l1.2-2h4.1"}),o.jsx("path",{className:"inbox-arrow",d:"M12 5v7m-2.5-2.5L12 12l2.5-2.5"})]}):n==="数据库查看"?o.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("ellipse",{cx:"12",cy:"6",rx:"7",ry:"3"}),o.jsx("path",{d:"M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"})]}):n==="文件统计汇总"?o.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("path",{d:"M4.5 19h15"}),o.jsx("rect",{className:"report-bar report-bar-one",x:"6",y:"12",width:"2.5",height:"6",rx:"0.5"}),o.jsx("rect",{className:"report-bar report-bar-two",x:"10.75",y:"8",width:"2.5",height:"10",rx:"0.5"}),o.jsx("rect",{className:"report-bar report-bar-three",x:"15.5",y:"5",width:"2.5",height:"13",rx:"0.5"})]}):o.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("circle",{cx:"12",cy:"12",r:"3"}),o.jsx("path",{className:"settings-ring",d:"M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M18 6l-1.4 1.4M7.4 16.6 6 18"})]})}const Wv=new Set(["raw_message","message_type","parser_version","unit"]),bA=new Set(["piece_count","weight","sheet_in_stock","profile_in_stock","cutting","welding","daily_output","monthly_output","yearly_output","monthly_reference","output_sections"]),SA=/(公斤|千克|kg|吨|t|张|件|套|节|台|米|m)$/i,jA={piece_count:"张",weight:"吨",sheet_in_stock:"吨",profile_in_stock:"吨",cutting:"吨",welding:"吨",daily_output:"套",output_sections:"节"};function jd(){const n=new Date;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`}function Ki(n){return n instanceof Error?n.message:String(n)}function uf(n,a=""){const s=n.trim().match(SA);return{value:s?n.trim().slice(0,-s[0].length).trim():n,unit:(s==null?void 0:s[0])||a}}function wA(n,a){return n.trim()?`${n}${a}`:""}function EA(n,a){const s=uf(a).value.trim(),l=uf(n.databaseValue).value.trim(),c=n.propertyType==="number"&&!Number.isFinite(Number(s.replaceAll(",",""))),h=!s||c?"exception":l?n.propertyType==="number"?Number(s.replaceAll(",",""))===Number(l.replaceAll(",",""))?"same":"confirm":s===l?"same":"confirm":"new";return{...n,parsedValue:a,status:h,message:h==="exception"?`${n.name}的输入值无效`:h==="confirm"?"与数据库现值不同":""}}function TA(n){return{new:"新增",same:"一致",confirm:"待确认",exception:"异常",unchecked:"待检查"}[n]||"异常"}function CA(){const[n,a]=S.useState(""),[s,l]=S.useState(""),[c,h]=S.useState([]),[d,m]=S.useState(),[p,g]=S.useState(),[v,x]=S.useState(),[b,E]=S.useState(""),[w,N]=S.useState({}),[T,A]=S.useState(!1),[k,_]=S.useState(),[z,U]=S.useState(""),[L,D]=S.useState([]),[H,M]=S.useState({}),[O,$]=S.useState(!1),[Z,ue]=S.useState({cutting:"",towerDaily:""}),de=c.length>0,ye=de&&n!==s,Y=!!d;S.useEffect(()=>{fe("production.getBindings").then(ie=>{_(ie),ue({cutting:ie.selected.cutting||"",towerDaily:ie.selected.towerDaily||""})}).catch(ie=>U(Ki(ie)))},[]);async function le(){U("");try{await fe("production.saveBindings",Z,12e4);const ie=await fe("production.getBindings");_(ie),$(!1)}catch(ie){U(Ki(ie))}}async function Q(ie){m("check"),E(""),N({});try{const J=await fe("production.check",{drafts:ie,defaultDate:jd()});g(J)}catch(J){E(Ki(J))}finally{m(void 0)}}async function G(){if(!(!n.trim()||Y)){m("parse"),E(""),A(!1),x(void 0),g(void 0),N({});try{const ie=await fe("production.parse",{text:n,defaultDate:jd()});if(h(ie),l(n),!ie.length){E("没有解析到可核对的数据，请检查消息内容后重试。");return}ie.every(J=>J.canWrite)&&await Q(ie)}catch(ie){h([]),g(void 0),E(Ki(ie))}finally{m(ie=>ie==="parse"?void 0:ie)}}}async function ae(ie,J){const ce=c.map(te=>te.index===ie?{...te,businessDate:J,canWrite:!!J,warningText:J?"":te.warningText}:te);h(ce),g(void 0),N({}),ce.every(te=>te.canWrite)&&await Q(ce)}function C(ie,J,ce){const te=`${ie}:${J}`;h(he=>he.map(we=>we.index===ie?{...we,canWrite:!!we.businessDate&&we.kind!=="Unknown",fields:{...we.fields,[J]:ce},previewFields:we.previewFields.map(Ce=>Ce.key===J?{...Ce,value:ce}:Ce)}:we)),N(he=>Object.fromEntries(Object.entries(he).filter(([we])=>we!==te))),g(he=>{if(!he)return he;const we=he.items.map(Ce=>{if(Ce.index!==ie||!Ce.fields)return Ce;const Ve=Ce.fields.map(ct=>ct.key===J?EA(ct,ce):ct),Xe=Ve.some(ct=>ct.status==="exception")?"error":Ve.some(ct=>ct.status==="confirm")?"existing":"ready";return{...Ce,fields:Ve,status:Xe}});return{...he,items:we,succeeded:we.every(Ce=>Ce.status!=="error")}})}async function V(ie){if(!(!p||Y)){m("write"),E("");try{const J=await fe("production.write",{drafts:c,defaultDate:jd(),overwriteExisting:!1,fieldChoices:w,monthlyPlans:ie},12e4);if(x(J),J.requiredMonths.length){D(J.requiredMonths),M({});return}J.succeeded?A(!0):E(J.message||"Notion 写入未完成。")}catch(J){E(Ki(J))}finally{m(void 0)}}}function I(){a(""),l(""),h([]),g(void 0),x(void 0),N({}),A(!1),E("")}const ne=S.useMemo(()=>c.flatMap(ie=>{var ce;const J=(ce=p==null?void 0:p.items.find(te=>te.index===ie.index))==null?void 0:ce.fields;return J!=null&&J.length?J.filter(te=>!Wv.has(te.key)).map(te=>({draft:ie,key:te.key,name:te.name,propertyType:te.propertyType,parsedValue:ie.fields[te.key]??te.parsedValue,databaseValue:te.databaseValue,status:te.status,message:te.message})):ie.previewFields.filter(te=>!Wv.has(te.key)).map(te=>({draft:ie,key:te.key,name:te.label,propertyType:bA.has(te.key)?"number":"",parsedValue:ie.fields[te.key]??te.value,databaseValue:"",status:ie.canWrite?"unchecked":"exception",message:ie.warningText}))}),[c,p]),oe=S.useMemo(()=>({newFields:ne.filter(ie=>ie.status==="new").length,same:ne.filter(ie=>ie.status==="same").length,confirm:ne.filter(ie=>ie.status==="confirm").length,exception:ne.filter(ie=>ie.status==="exception").length}),[ne]),me=ne.filter(ie=>ie.status==="confirm"),be=de&&!ye&&!Y&&!!(p!=null&&p.succeeded)&&c.every(ie=>ie.canWrite&&!!ie.businessDate)&&ne.every(ie=>ie.status!=="exception"&&ie.status!=="unchecked")&&me.every(ie=>!!w[`${ie.draft.index}:${ie.key}`]);return T?o.jsxs("div",{className:"app-shell",children:[o.jsxs("main",{className:"main-content",children:[o.jsx(ex,{disabled:Y,configure:()=>{k&&ue({cutting:k.selected.cutting||"",towerDaily:k.selected.towerDaily||""}),U(""),$(!0)}}),o.jsxs("div",{className:"production-message-scroll",children:[o.jsx(tx,{current:3}),o.jsxs("section",{className:"complete-view",children:[o.jsx("div",{className:"complete-icon",children:o.jsx(Qa,{})}),o.jsx("h2",{children:"入库完成"}),o.jsx("p",{children:(v==null?void 0:v.message)||`${c.length} 条消息已写入 Notion`}),o.jsx("button",{className:"primary-button",onClick:I,children:"录入下一条"})]})]})]}),O&&k&&o.jsx(Iv,{state:k,selections:Z,setSelections:ue,error:z,close:()=>$(!1),save:le})]}):o.jsxs("div",{className:"app-shell",children:[o.jsxs("main",{className:"main-content",children:[o.jsx(ex,{disabled:Y,configure:()=>{k&&ue({cutting:k.selected.cutting||"",towerDaily:k.selected.towerDaily||""}),U(""),$(!0)}}),o.jsxs("div",{className:"production-message-scroll",children:[o.jsx(tx,{current:de?2:1}),o.jsxs("div",{className:"workspace-panel",children:[o.jsxs("section",{className:"message-pane",children:[o.jsxs("div",{className:"pane-title",children:[o.jsx("h2",{children:"原始消息"}),o.jsx("p",{children:"输入生产消息，系统将自动解析并检查已有数据。"})]}),o.jsx("textarea",{className:"message-textarea",value:n,disabled:Y,onChange:ie=>a(ie.target.value),placeholder:"请输入生产消息"}),o.jsx("div",{className:"parse-action",children:o.jsxs("button",{className:"primary-button",disabled:!n.trim()||Y,onClick:G,children:[de&&o.jsx(Ib,{className:"button-icon refresh-icon"}),o.jsx("span",{children:d==="parse"?"正在解析…":de?"重新解析":"解析消息"})]})})]}),o.jsx("section",{className:"review-pane",children:de?o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"review-header",children:[o.jsx("h2",{children:"解析结果"}),o.jsxs("div",{className:"review-summary",children:[o.jsxs("span",{children:["新增",o.jsx("strong",{children:oe.newFields})]}),o.jsx("i",{children:"·"}),o.jsxs("span",{children:["一致",o.jsx("strong",{children:oe.same})]}),o.jsx("i",{children:"·"}),o.jsxs("span",{children:["待确认",o.jsx("strong",{children:oe.confirm})]}),o.jsx("i",{children:"·"}),o.jsxs("span",{children:["异常",o.jsx("strong",{children:oe.exception})]})]})]}),o.jsx("div",{className:"date-groups",children:c.map(ie=>{const J=ne.filter(he=>he.draft.index===ie.index),ce=J.filter(he=>he.status==="confirm"),te=p?{...p,items:p.items.filter(he=>he.index===ie.index)}:void 0;return o.jsxs("section",{className:"date-group","data-business-date":ie.businessDate,children:[o.jsxs("div",{className:"identity-section",children:[o.jsx("div",{className:"identity-field",children:o.jsx(Gt,{label:"日期",value:ie.businessDate||"",disabled:Y,onChange:he=>ae(ie.index,he)})}),o.jsxs("div",{className:"identity-field",children:[o.jsx("label",{children:"业务 / 产线"}),o.jsx("input",{className:"field-input",value:ie.typeDisplay||"",readOnly:!0,disabled:Y})]})]}),o.jsx(NA,{busy:d==="check",result:te,error:b,needsReparse:ye,invalidCount:ie.canWrite?0:1,fieldStatuses:J.map(he=>he.status)}),o.jsx("div",{className:"data-title",children:"数据字段"}),o.jsxs("div",{className:"field-table",children:[o.jsxs("div",{className:"field-table-header",children:[o.jsx("div",{children:"字段"}),o.jsx("div",{children:"本次解析值"}),o.jsx("div",{children:"数据库值"}),o.jsx("div",{className:"header-status",children:"状态"})]}),J.map(he=>{const we=uf(he.parsedValue,he.propertyType==="number"&&jA[he.key]||""),Ce=`${he.draft.index}:${he.key}`;return o.jsxs("div",{className:"field-row",children:[o.jsx("div",{className:"field-name",children:he.name}),o.jsx("div",{className:"field-editor",children:o.jsxs("div",{className:"input-unit-wrap",children:[o.jsx("input",{className:"field-input compact-input",value:we.value,disabled:Y,"aria-invalid":he.status==="exception",onChange:Ve=>C(he.draft.index,he.key,wA(Ve.target.value,we.unit)),onKeyDown:Ve=>{Ve.key==="Enter"&&Ve.currentTarget.blur()}}),we.unit&&o.jsx("span",{children:we.unit})]})}),o.jsx("div",{className:"database-value",children:he.databaseValue||"—"}),o.jsx("div",{className:"field-status",children:he.status!=="unchecked"&&o.jsx("span",{className:`pill pill-${he.status}`,title:he.message,children:TA(he.status)})})]},Ce)})]}),ce.length>0&&o.jsxs("section",{className:"conflict-section","aria-label":`${ie.businessDate} 待确认字段`,children:[o.jsx("div",{className:"conflict-section-title",children:"待确认字段"}),ce.map(he=>{const we=`${he.draft.index}:${he.key}`;return o.jsxs("div",{className:"conflict-panel",children:[o.jsxs("div",{className:"conflict-message",children:[o.jsx("strong",{children:he.name}),o.jsx("span",{children:"原值与新值不同，请选择保留项。"})]}),o.jsxs("div",{className:"conflict-options",children:[o.jsxs("label",{children:[o.jsx("input",{type:"radio",name:`conflict-${we}`,checked:w[we]==="keep",onChange:()=>N(Ce=>({...Ce,[we]:"keep"}))}),o.jsxs("span",{children:[o.jsx("small",{children:"原值"}),o.jsx("strong",{children:he.databaseValue||"—"})]})]}),o.jsxs("label",{children:[o.jsx("input",{type:"radio",name:`conflict-${we}`,checked:w[we]==="use",onChange:()=>N(Ce=>({...Ce,[we]:"use"}))}),o.jsxs("span",{children:[o.jsx("small",{children:"新值"}),o.jsx("strong",{children:he.parsedValue||"—"})]})]})]})]},we)})]})]},ie.index)})}),o.jsxs("div",{className:"review-footer",children:[o.jsx("span",{className:"review-footer-text",children:c.length>1?`本次共 ${c.length} 条消息，将整批写入 Notion。`:"确认后将把本次解析结果写入 Notion。"}),o.jsx("button",{className:"primary-button confirm-button",disabled:!be,onClick:()=>V(),children:d==="write"?"正在入库…":"确认入库"})]})]}):o.jsxs("div",{className:"review-empty",children:[o.jsx("h2",{children:"解析结果"}),o.jsx("p",{children:"解析消息后，Notion 数据检查结果将在这里显示。"}),(z||(k==null?void 0:k.configured)===!1||k&&(!k.cutting.bound||!k.towerDaily.bound))&&o.jsx("div",{className:"pm-notice",role:"alert",children:z||((k==null?void 0:k.configured)===!1?"Notion 连接尚未配置。":"数据库已变更，请点击右上角“数据库绑定”重新选择下料和塔筒主数据库。")})]})})]})]})]}),L.length>0&&o.jsx(DA,{months:L,values:H,setValues:M,close:()=>D([]),submit:ie=>{D([]),V(ie)}}),O&&k&&o.jsx(Iv,{state:k,selections:Z,setSelections:ue,error:z,close:()=>$(!1),save:le})]})}function NA({busy:n,result:a,error:s,needsReparse:l,invalidCount:c,fieldStatuses:h}){if(n)return o.jsxs("div",{className:"match-status",role:"status","aria-live":"polite",children:[o.jsx("span",{className:"status-loader"}),o.jsx("span",{className:"match-status-copy",children:"正在检查 Notion 数据…"})]});if(l)return o.jsxs("div",{className:"match-status match-status-error",role:"alert",children:[o.jsx("span",{className:"new-record-icon",children:"!"}),o.jsx("span",{className:"match-status-copy",children:"原始消息已修改，请重新解析"})]});if(c)return o.jsxs("div",{className:"match-status match-status-error",role:"alert",children:[o.jsx("span",{className:"new-record-icon",children:"!"}),o.jsxs("span",{className:"match-status-copy",children:["本批有 ",c," 条异常，已停止检查和入库"]})]});if(s)return o.jsxs("div",{className:"match-status match-status-error",role:"alert",children:[o.jsx("span",{className:"new-record-icon",children:"!"}),o.jsxs("span",{className:"match-status-copy",children:["检查失败：",s]})]});const d=a==null?void 0:a.items.some(b=>b.status==="existing"||b.status==="conflict"),m=b=>h.includes(b),p=h.length>0&&h.every(b=>b==="same"),g=m("exception")||a&&!a.succeeded&&h.length===0?"match-status-error":m("confirm")?"match-status-warning":p?"match-status-neutral":"",v=m("exception")?"存在异常，不能入库":m("unchecked")?"字段已修改，等待检查":m("confirm")?"已找到对应记录，有字段待确认":m("new")?d||m("same")?"已找到对应记录，将补充空字段":"未找到对应记录，将新建":p?"已找到对应记录，数据一致":a&&!a.succeeded?"Notion 检查未通过":"等待检查 Notion 数据",x=!!a&&!m("exception")&&!m("confirm")&&!m("unchecked");return o.jsxs("div",{className:`match-status ${g}`,role:g==="match-status-error"?"alert":"status","aria-live":"polite",children:[x?o.jsx("span",{className:"match-check",children:o.jsx(Qa,{})}):o.jsx("span",{className:"new-record-icon",children:g?"!":"+"}),o.jsx("span",{className:"match-status-copy",children:v})]})}function DA({months:n,values:a,setValues:s,close:l,submit:c}){const h=Object.fromEntries(n.map(m=>[m,Number(a[m])])),d=n.every(m=>{var p;return((p=a[m])==null?void 0:p.trim())&&Number.isFinite(h[m])&&h[m]>=0});return o.jsx("div",{className:"pm-dialog-overlay",children:o.jsxs("section",{className:"pm-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"monthly-plan-title",children:[o.jsx("h2",{id:"monthly-plan-title",children:"补充下料月计划"}),o.jsx("p",{children:"独立月计划库中没有该月份记录，请填写计划下料（吨）。"}),n.map(m=>o.jsxs("label",{children:[m,o.jsx("input",{type:"number",min:"0",value:a[m]||"",onChange:p=>s({...a,[m]:p.target.value})})]},m)),o.jsxs("div",{className:"pm-dialog-actions",children:[o.jsx("button",{onClick:l,children:"取消"}),o.jsx("button",{className:"primary-button",disabled:!d,onClick:()=>c(h),children:"创建并继续"})]})]})})}function Iv({state:n,selections:a,setSelections:s,error:l,close:c,save:h}){var x,b;const[d,m]=S.useState(((x=n.sources.find(E=>E.id===a.cutting))==null?void 0:x.businessSection)||""),[p,g]=S.useState(((b=n.sources.find(E=>E.id===a.towerDaily))==null?void 0:b.businessSection)||""),v=E=>n.usesBusinessSections?n.sources.filter(w=>w.businessSection===E):n.sources;return o.jsx("div",{className:"pm-dialog-overlay",children:o.jsxs("section",{className:"pm-dialog pm-binding-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"binding-title",children:[o.jsx("h2",{id:"binding-title",children:"数据库绑定"}),o.jsx("p",{children:"只绑定每日主数据库。月累计和年累计由软件查询计算；下料月计划库通过主库的 Relation 自动识别。"}),n.usesBusinessSections&&o.jsxs("label",{children:["下料业务板块",o.jsx(Ie,{value:d,ariaLabel:"下料业务板块",placeholder:"不处理下料消息",options:[{value:"",label:"不处理下料消息"},...n.businessSections.map(E=>({value:E,label:E}))],onChange:E=>{m(E),s({...a,cutting:""})}})]}),o.jsxs("label",{children:["下料主数据库",o.jsx(Ie,{value:a.cutting,ariaLabel:"下料主数据库",placeholder:"不处理下料消息",disabled:n.usesBusinessSections&&!d,options:[{value:"",label:"不处理下料消息"},...v(d).map(E=>({value:E.id,label:E.name}))],onChange:E=>s({...a,cutting:E})})]}),n.usesBusinessSections&&o.jsxs("label",{children:["塔筒业务板块",o.jsx(Ie,{value:p,ariaLabel:"塔筒业务板块",placeholder:"请选择业务板块",options:n.businessSections.map(E=>({value:E,label:E})),onChange:E=>{g(E),s({...a,towerDaily:""})}})]}),o.jsxs("label",{children:["塔筒产线主数据库",o.jsx(Ie,{value:a.towerDaily,ariaLabel:"塔筒产线主数据库",placeholder:"请选择具体数据库",disabled:n.usesBusinessSections&&!p,options:v(p).map(E=>({value:E.id,label:E.name})),onChange:E=>s({...a,towerDaily:E})})]}),l&&o.jsx("div",{className:"pm-notice",role:"alert",children:l}),o.jsxs("div",{className:"pm-dialog-actions",children:[o.jsx("button",{onClick:c,children:"取消"}),o.jsx("button",{className:"primary-button",disabled:!a.towerDaily,onClick:h,children:"保存绑定"})]})]})})}function ex({configure:n,disabled:a}){return o.jsxs("header",{className:"content-header",children:[o.jsx("h1",{children:"生产消息入库"}),o.jsx("button",{type:"button",className:"template-config-button",disabled:a,"aria-label":"数据库绑定",title:"数据库绑定",onClick:n,children:o.jsx($f,{})})]})}function tx({current:n}){return o.jsx(I0,{current:n,titles:["录入消息","解析确认","完成"],label:"生产消息入库进度"})}const nx={audit:"正在检查",repair:"正在备份修复并复查",export:"正在导出",pickFolder:"选择目录",openOutput:"正在打开目录"},rx=n=>n.split(/[\\/]/).pop();function AA(){const[n,a]=S.useState(""),[s,l]=S.useState(),[c,h]=S.useState(),[d,m]=S.useState(),[p,g]=S.useState(),[v,x]=S.useState(),[b,E]=S.useState(""),[w,N]=S.useState("全部"),[T,A]=S.useState(),k=S.useRef(!1),_=S.useRef(0);S.useEffect(()=>()=>{_.current++},[]);const z=(s==null?void 0:s.issues.filter(M=>M.severity==="错误").length)||0,U=(s==null?void 0:s.issues.filter(M=>M.severity==="警告").length)||0;function L(M){k.current||(a(M),l(void 0),m(void 0),h(void 0),E(""),A(void 0),N("全部"))}async function D(M){if(k.current||M==="audit"&&!n.trim()||["repair","export","openOutput"].includes(M)&&!s)return;const O=++_.current;k.current=!0,g(M),E(""),x(void 0),M==="audit"&&(l(void 0),h(void 0),N("全部")),M==="repair"&&(l($=>$&&{...$,repaired:!1,canExport:!1}),h(void 0)),["audit","repair","export"].includes(M)&&(m(void 0),A(void 0));try{if(M==="pickFolder"){const $=await fe("plan.pickFolder",void 0,6e5);if(O!==_.current)return;$.path&&(k.current=!1,L($.path),k.current=!0)}else{const $=await fe(`plan.${M}`,{path:n.trim(),auditId:s==null?void 0:s.auditId,confirmed:M==="repair"||M==="export"},18e5,Z=>{O===_.current&&k.current&&A(Z)});if(O!==_.current)return;if(M==="audit"&&l($),M==="repair"){const Z=$;l(Z.audit),h(Z.repair)}M==="export"&&m($)}}catch($){O===_.current&&(E($ instanceof Error?$.message:String($)),(M==="repair"||M==="export")&&l(Z=>Z&&{...Z,canExport:!1,repaired:!1}))}finally{O===_.current&&(k.current=!1,g(void 0),A(void 0))}}const H=p?nx[p]:d?"候选 PDF 已生成":s?z?"存在待处理错误":s.canExport?"可以导出":"检查完成，待修复":"等待检查";return o.jsxs("div",{className:"page plan-pdf-page",children:[o.jsxs("header",{className:"plan-header",children:[o.jsx("h1",{children:"挂网计划导出"}),o.jsx("span",{children:H})]}),o.jsxs("div",{className:"plan-content",children:[o.jsxs("section",{className:"plan-source",children:[o.jsx("label",{htmlFor:"plan-folder",children:"月度目录"}),o.jsxs("div",{children:[o.jsx("input",{id:"plan-folder",value:n,disabled:!!p,placeholder:"选择包含一二三级计划的月份目录",onChange:M=>L(M.target.value)}),o.jsxs("button",{className:"secondary",disabled:!!p,onClick:()=>void D("pickFolder"),children:[o.jsx(wo,{}),"选择目录"]}),o.jsx("button",{className:"primary",disabled:!!p||!n.trim(),onClick:()=>void D("audit"),children:s?"重新检查":"检查计划"})]})]}),b&&o.jsx("p",{className:"plan-error",role:"alert",children:b}),p&&o.jsxs("div",{className:"plan-progress",role:"status",children:[o.jsxs("span",{children:[o.jsx(hn,{className:"spin"}),nx[p]]}),p==="export"&&T&&o.jsxs(o.Fragment,{children:[o.jsxs("span",{children:[T.current," / ",T.total," · ",T.name]}),o.jsx("progress",{"aria-label":"PDF 导出进度",max:T.total||11,value:T.current})]})]}),o.jsxs("div",{className:"plan-workspace",children:[o.jsxs("section",{className:"plan-inspection",children:[o.jsxs("div",{className:"plan-pane-heading",children:[o.jsx("h2",{children:"检查结果"}),s&&o.jsxs("span",{children:[s.sheetCount," 个工作表"]})]}),s?o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"plan-workbook",children:[o.jsxs("strong",{children:[s.workspace.year," 年 ",s.workspace.month," 月计划"]}),o.jsx("span",{children:rx(s.workspace.workbookPath)})]}),o.jsx("div",{className:"plan-filters","aria-label":"问题筛选",children:["全部","错误","警告"].map(M=>o.jsxs("button",{"aria-pressed":w===M,onClick:()=>N(M),children:[M," ",o.jsx("span",{children:M==="全部"?s.issues.length:M==="错误"?z:U})]},M))}),o.jsxs("div",{className:"plan-issues",children:[s.issues.filter(M=>w==="全部"||M.severity===w).map((M,O)=>o.jsxs("article",{children:[o.jsxs("div",{children:[o.jsx("span",{className:M.severity==="错误"?"plan-severity-error":"",children:M.severity}),o.jsxs("strong",{children:[M.sheet,M.location&&` · ${M.location}`]}),o.jsx("span",{children:M.canAutoFix?"可自动修复":"需手动处理"})]}),o.jsx("p",{children:M.message})]},O)),!s.issues.some(M=>w==="全部"||M.severity===w)&&o.jsx("p",{className:"plan-clear",children:s.issues.length?`没有${w}`:"未发现检查问题"})]}),o.jsxs("div",{className:"plan-next",children:[o.jsx("span",{children:z?s.repaired?"请手动处理剩余错误，再重新检查。":"修复后自动复查，剩余错误需手动处理。":s.canExport?"复查通过，可以导出候选 PDF。":"继续备份并修复，完成导出前准备。"}),o.jsx("button",{className:"secondary",disabled:!!p,onClick:()=>x("repair"),children:s.repaired?"再次修复":"备份并修复"})]}),c&&o.jsxs("details",{className:"plan-details",children:[o.jsx("summary",{children:"备份与修复明细"}),o.jsxs("p",{children:["已调整 ",c.changedCells," 个单元格、",c.changedRows," 行。"]}),o.jsxs("p",{children:["备份：",c.backupPath]})]})]}):o.jsxs("div",{className:"plan-empty",children:[o.jsx(Av,{}),o.jsx("strong",{children:"尚未检查计划"}),o.jsx("p",{children:"选择月度目录后，查看需要处理的问题。"})]})]}),o.jsxs("section",{className:"plan-result",children:[o.jsxs("div",{className:"plan-pane-heading",children:[o.jsx("h2",{children:"导出结果"}),d&&o.jsxs("span",{children:[d.files.length," 份 PDF"]})]}),d?o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"plan-file-list",children:d.files.map(M=>o.jsx("p",{children:rx(M)},M))}),o.jsxs("div",{className:"plan-output",children:[o.jsx("span",{children:"文件位置"}),o.jsx("p",{children:d.outputFolder}),o.jsxs("button",{className:"secondary",disabled:!!p,onClick:()=>void D("openOutput"),children:[o.jsx(wo,{}),"打开输出目录"]})]})]}):o.jsxs("div",{className:"plan-empty",children:[o.jsx(Av,{}),o.jsx("strong",{children:p==="export"?"正在生成候选 PDF":"尚未导出"}),o.jsx("p",{children:"完成检查和修复后，生成 11 份候选 PDF。"})]}),o.jsx("div",{className:"plan-export-action",children:o.jsx("button",{className:"primary",disabled:!!p||!(s!=null&&s.canExport),onClick:()=>x("export"),children:d?"重新导出 PDF":"导出 PDF"})})]})]})]}),o.jsx(ls,{open:!!v,onOpenChange:M=>{M||x(void 0)},children:o.jsxs(os,{children:[o.jsx(cs,{className:"dialog-overlay"}),o.jsxs(ds,{className:"plan-confirm",children:[o.jsxs("div",{children:[o.jsx(fs,{children:v==="repair"?"确认备份并修复":"确认导出 PDF"}),o.jsx(Eo,{asChild:!0,children:o.jsx("button",{className:"secondary","aria-label":"关闭确认",children:o.jsx(Mo,{})})})]}),o.jsx(hs,{children:v==="repair"?"将先备份 Excel，再修复格式和序号，并自动复查。":"将生成 11 份候选 PDF，不修改 Excel。"}),o.jsxs("footer",{children:[o.jsx(Eo,{asChild:!0,children:o.jsx("button",{className:"secondary",autoFocus:!0,children:"取消"})}),o.jsx("button",{className:"primary",onClick:()=>v&&void D(v),children:v==="repair"?"备份并修复":"确认导出"})]})]})]})})]})}const kA=n=>n.split(/[\\/]/).pop();function MA(){const[n,a]=S.useState(""),[s,l]=S.useState(),[c,h]=S.useState(),[d,m]=S.useState(""),p=S.useRef(!1),g=S.useRef(0);S.useEffect(()=>()=>{g.current++},[]);function v(b){p.current||(a(b),l(void 0),m(""))}async function x(b){if(p.current||b==="export"&&!n.trim()||b==="open"&&!s)return;p.current=!0;const E=++g.current;h(b),m(""),b==="export"&&l(void 0);try{if(b==="pick"){const w=await fe("meeting.pickFile",void 0,6e5);E===g.current&&w.path&&(a(w.path),l(void 0))}else if(b==="export"){const w=await fe("meeting.export",{path:n.trim()},18e5);E===g.current&&l(w)}else await fe("meeting.openOutput",{resultId:s.resultId})}catch(w){E===g.current&&m(w instanceof Error?w.message:String(w))}finally{E===g.current&&(p.current=!1,h(void 0))}}return o.jsxs("div",{className:"page meeting-page",children:[o.jsxs("header",{className:"meeting-header",children:[o.jsx("h1",{children:"生产会资料拆分"}),o.jsx("span",{children:c==="export"?"正在拆分":s?"拆分完成":"等待拆分"})]}),o.jsxs("div",{className:"meeting-content",children:[d&&o.jsx("p",{className:"meeting-error",role:"alert",children:d}),o.jsxs("div",{className:"meeting-workspace",children:[o.jsxs("section",{children:[o.jsx("h2",{children:"源文件"}),o.jsx("label",{htmlFor:"meeting-source",children:"生产会资料 Excel"}),o.jsxs("div",{className:"meeting-input",children:[o.jsx("input",{id:"meeting-source",value:n,disabled:!!c,onChange:b=>v(b.target.value),placeholder:"选择 .xlsx、.xlsm 或 .xls 文件"}),o.jsxs("button",{className:"secondary",disabled:!!c,onClick:()=>void x("pick"),children:[o.jsx(wo,{}),"选择文件"]})]}),o.jsx("p",{className:"meeting-hint",children:"源文件需包含一个工作表，按已发运、在制、预投三个分段拆分。"}),o.jsxs("details",{className:"meeting-rules",children:[o.jsx("summary",{children:"拆分规则"}),o.jsx("p",{children:"生成包含三个独立工作表的 .xlsx，保存到源文件所在目录，保留源文件。"}),o.jsx("p",{children:"保留原有内容、公式和布局，清除红色与绿色背景填充。宏不会保留到输出文件。"})]}),o.jsx("div",{className:"meeting-actions",children:o.jsx("button",{className:"primary",disabled:!!c||!n.trim(),onClick:()=>void x("export"),children:c==="export"?"正在拆分…":s?"重新拆分":"开始拆分"})})]}),o.jsxs("section",{className:"meeting-result","aria-live":"polite",children:[o.jsxs("div",{className:"meeting-result-heading",children:[o.jsx("h2",{children:"拆分结果"}),s&&o.jsxs("span",{children:[s.sheetNames.length," 个工作表"]})]}),s?o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"meeting-file",children:[o.jsx(jo,{}),o.jsxs("div",{children:[o.jsx("h3",{children:kA(s.outputPath)}),o.jsxs("p",{children:["开会日期 · ",s.meetingDate]})]})]}),o.jsx("ol",{children:s.sheetNames.map(b=>o.jsx("li",{children:b},b))}),o.jsxs("div",{className:"meeting-output",children:[o.jsx("span",{children:"文件位置"}),o.jsx("p",{children:s.outputPath}),o.jsxs("button",{className:"secondary",disabled:!!c,onClick:()=>void x("open"),children:[o.jsx(wo,{}),"打开文件位置"]})]})]}):o.jsxs("div",{className:"meeting-empty",children:[c==="export"?o.jsx(hn,{className:"spin"}):o.jsx(jo,{}),o.jsx("strong",{children:c==="export"?"正在生成拆分文件":"尚未生成拆分文件"}),o.jsx("p",{children:c==="export"?"正在检查并处理工作表，请稍候。":"选择源文件后开始拆分。"})]})]})]})]})]})}const wd=(n=0)=>{const a=new Date;return{startDate:new Date(Date.UTC(a.getFullYear(),a.getMonth()+n-1,21)).toISOString().slice(0,10),endDate:new Date(Date.UTC(a.getFullYear(),a.getMonth()+n,20)).toISOString().slice(0,10)}},Ed={sourceRoot:"",outputRoot:"",reportUrl:"",username:"",password:""},ax=n=>({sourceRoot:n.sourceRoot,outputRoot:n.outputRoot,reportUrl:n.reportUrl,username:n.username,password:""}),Jl=n=>n instanceof Error?n.message:String(n),ix=n=>n?`${n.slice(0,4)} 年 ${Number(n.slice(5,7))} 月`:"—",sx={prepare:"准备中",collect:"正在导出日报",parse:"正在读取数据",summary:"正在生成汇总",complete:"正在完成"};function RA(){const[n,a]=S.useState(),[s,l]=S.useState(wd),[c,h]=S.useState(Ed),[d,m]=S.useState(!1),[p,g]=S.useState("load"),[v,x]=S.useState(""),[b,E]=S.useState(""),[w,N]=S.useState(),[T,A]=S.useState(),[k,_]=S.useState(!1),[z,U]=S.useState(!1),L=S.useRef(0),D=S.useRef(!1),H=Math.floor((Date.parse(`${s.endDate}T00:00:00Z`)-Date.parse(`${s.startDate}T00:00:00Z`))/864e5)+1,M=Number.isFinite(H)?H<1?"结束日期不能早于开始日期。":H>366?"单次统计范围不能超过 366 天。":"":"请选择完整日期。",O=T!=null&&T.total?Math.min(100,Math.max(0,Math.round(T.current/T.total*100))):0;async function $(){const Q=++L.current;D.current=!0,g("load"),x("");try{const G=await fe("report.getState");Q===L.current&&a(G)}catch(G){Q===L.current&&x(Jl(G))}finally{Q===L.current&&(D.current=!1,g(void 0))}}S.useEffect(()=>($(),()=>{L.current++}),[]);function Z(Q){D.current||(l(Q),N(void 0),A(void 0),_(!1),x(""),U(!1))}function ue(Q){D.current||(m(Q),E(""),h(Q&&n?ax(n):Ed))}async function de(Q){if(Q.preventDefault(),D.current||!n)return;const G={...c,sourceRoot:c.sourceRoot.trim(),outputRoot:c.outputRoot.trim(),reportUrl:c.reportUrl.trim(),username:c.username.trim()};if(JSON.stringify(G)===JSON.stringify(ax(n))){ue(!1);return}const ae=++L.current;D.current=!0,g("save"),E("");try{const C=await fe("report.saveConfig",G);if(ae!==L.current)return;a(C),m(!1),h(Ed),N(void 0),A(void 0),_(!1),x("")}catch(C){ae===L.current&&E(Jl(C))}finally{ae===L.current&&(D.current=!1,g(void 0))}}async function ye(){if(D.current||!(n!=null&&n.credentialsConfigured))return;const Q=++L.current;D.current=!0,g("auth"),x("");try{await fe("report.authenticate",void 0,600*1e3);const G=await fe("report.getState");Q===L.current&&a(G)}catch(G){Q===L.current&&x(Jl(G))}finally{Q===L.current&&(D.current=!1,g(void 0))}}async function Y(){if(D.current||!(n!=null&&n.authenticated)||M)return;const Q=++L.current,G={...s};D.current=!0,g("run"),x(""),N(void 0),_(!1),U(!1),A({stage:"prepare",current:0,total:H,message:""});try{const ae=await fe("report.run",G,18e5,C=>{Q===L.current&&D.current&&A(C)});Q===L.current&&(N(ae),A(void 0))}catch(ae){Q===L.current&&(x(Jl(ae)),_(!0),A(void 0))}finally{Q===L.current&&(D.current=!1,g(void 0))}}async function le(){if(w)try{await navigator.clipboard.writeText(w.summaryPath),U(!0)}catch{x("无法复制，请选中文件路径手动复制。")}}return o.jsxs("div",{className:"page report-center-page",children:[o.jsxs("header",{className:"report-header",children:[o.jsx("h1",{children:"文件统计汇总"}),o.jsxs("div",{className:"report-header-actions",children:[o.jsx("span",{className:"report-status",children:p==="load"?"加载中":n!=null&&n.authenticated?"已验证登录":"未验证登录"}),o.jsx("button",{className:"secondary report-icon-button","aria-label":"报表设置",title:"报表设置",disabled:!!p||!n,onClick:()=>ue(!0),children:o.jsx($f,{})})]})]}),o.jsxs("div",{className:"report-content",children:[v&&o.jsxs("div",{className:"report-error",role:"alert",children:[o.jsx("span",{children:v}),!n&&o.jsx("button",{className:"secondary",disabled:!!p,onClick:()=>void $(),children:"重新加载"})]}),o.jsxs("section",{className:"report-workspace",children:[o.jsxs("div",{className:"report-pane report-period",children:[o.jsxs("div",{className:"report-pane-heading",children:[o.jsx("h2",{children:"统计范围"}),!M&&o.jsxs("span",{children:[H," 天"]})]}),o.jsxs("div",{className:"report-dates",children:[o.jsx(Gt,{label:"开始日期",value:s.startDate,disabled:!!p,onChange:Q=>Z({...s,startDate:Q})}),o.jsx(Gt,{label:"结束日期",value:s.endDate,disabled:!!p,onChange:Q=>Z({...s,endDate:Q})})]}),o.jsxs("div",{className:"report-range-tools",children:[o.jsxs("div",{children:[o.jsx("button",{disabled:!!p,onClick:()=>Z(wd()),children:"本期"}),o.jsx("button",{disabled:!!p,onClick:()=>Z(wd(-1)),children:"上期"})]}),o.jsx("span",{children:M||`汇总月份 · ${ix(s.endDate)}`})]}),o.jsxs("div",{className:"report-execution",children:[p==="run"&&o.jsxs("div",{className:"report-progress",role:"status",children:[o.jsxs("div",{children:[o.jsxs("span",{children:[o.jsx(hn,{className:"spin"}),sx[(T==null?void 0:T.stage)||"prepare"]]}),T&&["collect","parse"].includes(T.stage)&&o.jsxs("span",{children:[T.current," / ",T.total]})]}),o.jsx("div",{className:"report-progress-bar",role:"progressbar","aria-label":sx[(T==null?void 0:T.stage)||"prepare"],"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":O,children:o.jsx("i",{style:{width:`${O}%`}})}),(T==null?void 0:T.message)&&o.jsxs("details",{className:"report-details",children:[o.jsx("summary",{children:"处理详情"}),o.jsx("p",{children:T.message})]})]}),!(n!=null&&n.credentialsConfigured)&&n&&o.jsxs("p",{className:"report-setup",children:["请先配置报表连接。",o.jsx("button",{onClick:()=>ue(!0),children:"报表设置"})]}),(n==null?void 0:n.credentialsConfigured)&&!n.authenticated&&o.jsx("p",{className:"report-setup",children:"请先验证登录。"}),o.jsxs("div",{className:"report-actions",children:[(n==null?void 0:n.credentialsConfigured)&&o.jsxs("button",{className:"secondary",disabled:!!p,onClick:ye,children:[p==="auth"&&o.jsx(hn,{className:"spin"}),p==="auth"?"验证中…":n!=null&&n.authenticated?"重新验证":"验证登录"]}),o.jsx("button",{className:"primary",disabled:!!p||!(n!=null&&n.authenticated)||!!M,onClick:Y,children:p==="run"?"正在汇总…":k?"重新汇总":"开始汇总"})]})]})]}),o.jsxs("div",{className:"report-pane report-result","aria-live":"polite",children:[o.jsxs("div",{className:"report-pane-heading",children:[o.jsx("h2",{children:"汇总结果"}),w&&o.jsx("span",{children:"已完成"})]}),w?o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"report-file",children:[o.jsx(jo,{}),o.jsxs("div",{children:[o.jsxs("h3",{children:[ix(w.period.endDate),"设备台时汇总"]}),o.jsxs("p",{children:[w.period.startDate," — ",w.period.endDate]})]})]}),o.jsxs("dl",{className:"report-result-stats",children:[o.jsxs("div",{children:[o.jsx("dt",{children:"日报"}),o.jsxs("dd",{children:[w.parsedReports," / ",w.plannedReports," 份"]})]}),o.jsxs("div",{children:[o.jsx("dt",{children:"设备"}),o.jsxs("dd",{children:[w.deviceCount," 台"]})]})]}),o.jsxs("div",{className:"report-output",children:[o.jsx("span",{children:"文件位置"}),o.jsx("p",{children:w.summaryPath}),o.jsxs("button",{className:"secondary",onClick:le,children:[o.jsx(GC,{}),z?"已复制":"复制路径"]})]}),o.jsxs("details",{className:"report-details",children:[o.jsx("summary",{children:"汇总明细"}),o.jsxs("p",{children:["数据点：",w.actualDataPoints," / ",w.expectedDataPoints]}),w.warnings.map((Q,G)=>o.jsx("p",{children:Q},G))]})]}):o.jsxs("div",{className:"report-empty",children:[o.jsx(jo,{}),o.jsx("strong",{children:p==="run"?"正在生成汇总":k?"未生成汇总文件":"尚未生成汇总"}),o.jsx("p",{children:p==="run"?"完成后可在这里查看文件。":k?"处理错误后，可重新汇总。":"选择统计范围后开始汇总。"})]})]})]})]}),o.jsx(ls,{open:d,onOpenChange:ue,children:o.jsxs(os,{children:[o.jsx(cs,{className:"dialog-overlay"}),o.jsxs(ds,{className:"report-settings-dialog",children:[o.jsxs("div",{className:"report-settings-heading",children:[o.jsx(fs,{children:"报表设置"}),o.jsx(Eo,{asChild:!0,children:o.jsx("button",{className:"secondary report-icon-button",disabled:!!p,"aria-label":"关闭报表设置",children:o.jsx(Mo,{})})})]}),o.jsx(hs,{className:"report-sr-only",children:"设置报表连接与文件保存位置。"}),o.jsxs("form",{onSubmit:de,children:[o.jsxs("fieldset",{disabled:!!p,children:[o.jsx("legend",{children:"报表连接"}),o.jsxs("label",{children:["报表网页",o.jsx("input",{type:"url",required:!0,value:c.reportUrl,onChange:Q=>h({...c,reportUrl:Q.target.value}),placeholder:"https://…"})]}),o.jsxs("div",{className:"report-settings-grid",children:[o.jsxs("label",{children:["账号",o.jsx("input",{required:!0,autoComplete:"username",value:c.username,onChange:Q=>h({...c,username:Q.target.value})})]}),o.jsxs("label",{children:["密码",o.jsx("input",{type:"password",required:!(n!=null&&n.credentialsConfigured),autoComplete:"new-password",value:c.password,onChange:Q=>h({...c,password:Q.target.value}),placeholder:n!=null&&n.credentialsConfigured?"留空保持原密码":"请输入密码"})]})]})]}),o.jsxs("fieldset",{disabled:!!p,children:[o.jsx("legend",{children:"保存位置"}),o.jsxs("label",{children:["原始日报",o.jsx("input",{required:!0,value:c.sourceRoot,onChange:Q=>h({...c,sourceRoot:Q.target.value})})]}),o.jsxs("label",{children:["汇总文件",o.jsx("input",{required:!0,value:c.outputRoot,onChange:Q=>h({...c,outputRoot:Q.target.value})})]})]}),b&&o.jsx("p",{className:"report-error",role:"alert",children:b}),o.jsxs("div",{className:"report-settings-actions",children:[o.jsx(Eo,{asChild:!0,children:o.jsx("button",{className:"secondary",type:"button",disabled:!!p,children:"取消"})}),o.jsx("button",{className:"primary",type:"submit",disabled:!!p,children:p==="save"?"保存中…":"保存设置"})]})]})]})]})})]})}const df="••••••••••••",lx=[{key:"connection",label:"连接",keywords:"Notion API 令牌 根页面 数据源",icon:o.jsx(HA,{})},{key:"notification",label:"通知",keywords:"钉钉 Webhook Secret 规则",icon:o.jsx(qA,{})},{key:"data",label:"数据与缓存",keywords:"Notion 数据源 缓存 绑定",icon:o.jsx(YA,{})},{key:"about",label:"关于",keywords:"版本 WebView2 React TypeScript",icon:o.jsx(PA,{})}];function OA({open:n,onClose:a}){const[s,l]=S.useState("connection"),[c,h]=S.useState(""),[d,m]=S.useState(null),[p,g]=S.useState(""),[v,x]=S.useState(""),[b,E]=S.useState(""),w=S.useRef(null),N=S.useRef(null);S.useEffect(()=>{if(!n)return;N.current=document.activeElement instanceof HTMLElement?document.activeElement:null,E("settings.open"),x(""),fe("settings.open").then(_=>m(_)).catch(_=>x(_ instanceof Error?_.message:"设置加载失败，请重试。")).finally(()=>E("")),window.setTimeout(()=>{var _;return(_=w.current)==null?void 0:_.focus()},0);const k=_=>{_.key==="Escape"&&a()};return window.addEventListener("keydown",k),()=>{var _;window.removeEventListener("keydown",k),(_=N.current)==null||_.focus()}},[n,a]),S.useEffect(()=>{if(!p)return;const k=window.setTimeout(()=>g(""),3e3);return()=>window.clearTimeout(k)},[p]);const T=async(k,_)=>{E(k),x(""),g("");try{const z=await fe(k,_,6e4);return(k==="settings.refreshDataSources"||k==="settings.saveConnection")&&uN(!0),m(z.state),g(z.message),!0}catch(z){return x(z instanceof Error?z.message:"操作未完成，请重试。"),!1}finally{E("")}},A=S.useMemo(()=>{const k=c.trim().toLocaleLowerCase("zh-CN");return k?lx.filter(_=>`${_.label} ${_.keywords}`.toLocaleLowerCase("zh-CN").includes(k)):lx},[c]);return n?o.jsx("div",{className:"settings-overlay",onMouseDown:k=>{k.target===k.currentTarget&&a()},children:o.jsxs("div",{className:"settings-window",role:"dialog","aria-modal":"true","aria-label":"设置",children:[o.jsxs("aside",{className:"settings-sidebar",children:[o.jsxs("label",{className:"settings-search",children:[o.jsx(UA,{}),o.jsx("input",{value:c,onChange:k=>h(k.target.value),placeholder:"搜索设置","aria-label":"搜索设置"})]}),o.jsx("div",{className:"settings-sidebar-title",children:"设置"}),o.jsxs("nav",{className:"settings-nav","aria-label":"设置分类",children:[A.map(k=>o.jsxs("button",{type:"button",className:s===k.key?"settings-nav-item active":"settings-nav-item","aria-current":s===k.key?"page":void 0,onClick:()=>l(k.key),children:[o.jsx("span",{className:"settings-nav-icon",children:k.icon}),o.jsx("span",{children:k.label})]},k.key)),A.length===0&&o.jsx("p",{className:"settings-empty-search",children:"没有匹配的设置"})]})]}),o.jsxs("main",{className:"settings-main",children:[o.jsx("button",{ref:w,type:"button",className:"settings-close",onClick:a,"aria-label":"关闭设置",children:o.jsx(GA,{})}),o.jsxs("div",{className:"settings-content",children:[b==="settings.open"&&!d?o.jsx("div",{className:"settings-loading",children:"正在读取本机设置…"}):o.jsxs(o.Fragment,{children:[s==="connection"&&d&&o.jsx(zA,{state:d,busy:b,run:T}),s==="notification"&&d&&o.jsx(_A,{state:d,busy:b,run:T}),s==="data"&&d&&o.jsx(VA,{state:d,busy:b,run:T}),s==="about"&&d&&o.jsx(BA,{state:d})]}),(p||v)&&o.jsx("div",{className:`settings-message ${v?"error":""}`,role:"status","aria-live":"polite",children:v||p})]})]})]})}):null}function zA({state:n,busy:a,run:s}){const[l,c]=S.useState(""),[h,d]=S.useState(!1),[m,p]=S.useState(n.notion.rootPageId);S.useEffect(()=>p(n.notion.rootPageId),[n.notion.rootPageId]);const g=async b=>{await s(b,{token:h?l:"",rootPageId:m})&&(c(""),d(!1))},v=a==="settings.refreshDataSources",x=a==="settings.saveConnection";return o.jsxs(Oo,{title:"连接",description:"管理生产助手使用的外部数据源和服务连接。",children:[o.jsxs(Zr,{title:"Notion",children:[o.jsx(Yt,{title:"连接状态",description:"当前本机连接配置和数据源缓存状态",children:o.jsx(t1,{connected:n.notion.configured,label:n.notion.configured?"已配置":"未配置"})}),o.jsx(ts,{title:"API 令牌",description:"使用 Windows 当前用户加密后保存在本机",children:o.jsx("input",{className:"settings-input",type:"password",autoComplete:"off",placeholder:"输入 Notion API Token",value:h?l:n.notion.configured?df:"",onFocus:b=>{!h&&n.notion.configured&&b.currentTarget.select()},onChange:b=>{d(!0),c(b.target.value)}})}),o.jsx(ts,{title:"根页面 ID",description:"可选。留空时自动发现当前令牌有权限访问的数据源",children:o.jsx("input",{className:"settings-input",value:m,onChange:b=>p(b.target.value)})}),o.jsxs("div",{className:"settings-buttons",children:[o.jsxs("button",{type:"button",className:"settings-button-primary",disabled:!!a,onClick:()=>g("settings.saveConnection"),children:[x&&o.jsx(ms,{})," ",x?"正在连接…":"保存并连接"]}),o.jsxs("button",{type:"button",className:"settings-button-secondary",disabled:!!a,onClick:()=>g("settings.refreshDataSources"),children:[v&&o.jsx(ms,{})," ",v?"正在刷新…":"刷新数据源"]})]})]}),o.jsxs(Zr,{title:"数据源",children:[o.jsx(Yt,{title:"已发现数据源",description:"最近一次从 Notion 获取的数据源",children:o.jsxs("span",{className:"settings-value",children:[n.notion.dataSourceCount," 个"]})}),o.jsx(Yt,{title:"上次同步",description:"数据源元信息最后更新时间",children:o.jsx("span",{className:"settings-value",children:n.notion.lastSyncedAt||"尚未同步"})})]})]})}function _A({state:n,busy:a,run:s}){const l=n.notification,[c,h]=S.useState(l.enabled),[d,m]=S.useState(l.channelName),[p,g]=S.useState(""),[v,x]=S.useState(""),[b,E]=S.useState(!1),[w,N]=S.useState(!1),[T,A]=S.useState(l.rules);S.useEffect(()=>{h(l.enabled),m(l.channelName),A(l.rules)},[l]);const k={enabled:c,channelName:d,webhook:b?p:"",secret:w?v:""},_=async L=>{await s(L,k)&&(g(""),x(""),E(!1),N(!1))},z=a==="settings.saveNotification",U=a==="settings.testNotification";return o.jsxs(Oo,{title:"通知",description:"配置生产助手全局通知使用的技术通道。业务模块只决定何时通知。",children:[o.jsxs(Zr,{title:"通知服务",children:[o.jsx(Yt,{title:"启用通知",description:"关闭后所有业务模块都不会向外发送通知",children:o.jsx(ox,{checked:c,onChange:h,label:"启用通知"})}),o.jsx(Yt,{title:"发送方式",description:"当前使用的全局通知技术通道",children:o.jsx("span",{className:"settings-value",children:"钉钉机器人 Webhook"})}),o.jsx(Yt,{title:"连接状态",description:l.checkedAt?`上次测试 ${l.checkedAt}`:"尚未发送测试通知",children:o.jsx(t1,{connected:l.connected,label:l.connected===!0?"连接正常":l.connected===!1?"连接失败":"待测试"})})]}),o.jsxs(Zr,{title:"钉钉机器人",children:[o.jsx(ts,{title:"Webhook URL",description:"使用 Windows 当前用户加密后保存在本机",children:o.jsx("input",{className:"settings-input",type:"password",autoComplete:"off",placeholder:"https://oapi.dingtalk.com/robot/send?...",value:b?p:l.webhookConfigured?df:"",onFocus:L=>{!b&&l.webhookConfigured&&L.currentTarget.select()},onChange:L=>{E(!0),g(L.target.value)}})}),o.jsx(ts,{title:"加签密钥",description:"钉钉机器人 Secret，使用 Windows 当前用户加密保存",children:o.jsx("input",{className:"settings-input",type:"password",autoComplete:"off",placeholder:"SEC...",value:w?v:l.secretConfigured?df:"",onFocus:L=>{!w&&l.secretConfigured&&L.currentTarget.select()},onChange:L=>{N(!0),x(L.target.value)}})}),o.jsx(ts,{title:"默认接收群",description:"用于识别当前通知渠道",children:o.jsx("input",{className:"settings-input",value:d,onChange:L=>m(L.target.value),placeholder:"生产管理群"})}),o.jsxs("div",{className:"settings-buttons",children:[o.jsxs("button",{type:"button",className:"settings-button-primary",disabled:!!a,onClick:()=>_("settings.saveNotification"),children:[z&&o.jsx(ms,{})," ",z?"正在保存…":"保存设置"]}),o.jsxs("button",{type:"button",className:"settings-button-secondary",disabled:!!a,onClick:()=>_("settings.testNotification"),children:[U&&o.jsx(ms,{})," ",U?"正在发送…":"发送测试"]})]}),l.status&&o.jsx("p",{className:"settings-inline-status",children:l.status})]}),o.jsxs(Zr,{title:"通知规则",children:[o.jsx("div",{className:"settings-rule-list",children:T.map(L=>o.jsx(Yt,{title:L.name,description:`钉钉 · ${LA(L.level)}`,children:o.jsx(ox,{checked:L.enabled,label:`通知规则：${L.name}`,onChange:D=>A(H=>H.map(M=>M.eventType===L.eventType?{...M,enabled:D}:M))})},L.eventType))}),o.jsx("div",{className:"settings-buttons settings-buttons-end",children:o.jsx("button",{type:"button",className:"settings-button-primary",disabled:!!a,onClick:()=>s("settings.saveNotificationRules",{rules:T}),children:"保存通知规则"})})]})]})}function VA({state:n,busy:a,run:s}){return o.jsx(Oo,{title:"数据与缓存",description:"查看和维护生产助手保存在本机的 Notion 数据源缓存。",children:o.jsxs(Zr,{title:"本地数据",children:[o.jsx(Yt,{title:"Notion 数据源缓存",description:"用于减少重复的网络请求",children:o.jsxs("div",{className:"settings-inline-actions",children:[o.jsxs("span",{className:"settings-value",children:[n.notion.dataSourceCount," 个"]}),o.jsxs("button",{type:"button",className:"settings-text-button",disabled:!!a,onClick:()=>s("settings.refreshDataSources"),children:[a==="settings.refreshDataSources"&&o.jsx(ms,{})," ",a==="settings.refreshDataSources"?"刷新中…":"刷新"]})]})}),o.jsx(Yt,{title:"上次同步",description:"数据源元信息最后更新时间",children:o.jsx("span",{className:"settings-value",children:n.notion.lastSyncedAt||"尚未同步"})})]})})}function BA({state:n}){return o.jsx(Oo,{title:"关于",description:"生产助手的版本和运行环境信息。",children:o.jsxs(Zr,{title:"生产助手",children:[o.jsx(Yt,{title:"版本",description:"当前安装版本",children:o.jsx("span",{className:"settings-value",children:n.version})}),o.jsx(Yt,{title:"桌面环境",description:"应用运行容器",children:o.jsx("span",{className:"settings-value",children:"WinUI 3 + WebView2"})}),o.jsx(Yt,{title:"前端",description:"用户界面技术栈",children:o.jsx("span",{className:"settings-value",children:"React + TypeScript"})}),o.jsx(Yt,{title:"本地数据保护",description:"令牌和通知凭据仅保存在本机",children:o.jsx("span",{className:"settings-value",children:"Windows 当前用户加密"})})]})})}function Oo({title:n,description:a,children:s}){return o.jsxs("div",{className:"settings-page",children:[o.jsxs("header",{className:"settings-page-header",children:[o.jsx("h1",{children:n}),o.jsx("p",{children:a})]}),s]})}function Zr({title:n,children:a}){return o.jsxs("section",{className:"settings-section",children:[o.jsx("h2",{children:n}),o.jsx("div",{className:"settings-section-body",children:a})]})}function Yt({title:n,description:a,children:s}){return o.jsxs("div",{className:"settings-row",children:[o.jsxs("div",{className:"settings-row-text",children:[o.jsx("div",{className:"settings-row-title",children:n}),a&&o.jsx("div",{className:"settings-row-description",children:a})]}),o.jsx("div",{className:"settings-row-control",children:s})]})}function ts({title:n,description:a,children:s}){return o.jsxs("label",{className:"settings-field",children:[o.jsx("span",{className:"settings-field-title",children:n}),a&&o.jsx("span",{className:"settings-field-description",children:a}),o.jsx("span",{className:"settings-field-control",children:s})]})}function ox({checked:n,onChange:a,label:s}){return o.jsx("button",{type:"button",role:"switch","aria-checked":n,"aria-label":s,className:n?"settings-switch checked":"settings-switch",onClick:()=>a(!n),children:o.jsx("span",{})})}function t1({connected:n,label:a}){return o.jsxs("div",{className:`settings-connected ${n===!1?"error":n===null?"pending":""}`,children:[o.jsx("span",{className:"settings-status-dot"}),a]})}function ms(){return o.jsx("span",{className:"settings-spinner","aria-hidden":"true"})}const LA=n=>n==="warning"?"警告":n==="info"?"信息":"错误";function UA(){return o.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("circle",{cx:"11",cy:"11",r:"6.5"}),o.jsx("path",{d:"m16 16 4 4"})]})}function HA(){return o.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("path",{d:"M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"}),o.jsx("path",{d:"M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1"})]})}function qA(){return o.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("path",{d:"M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"}),o.jsx("path",{d:"M10 21h4"})]})}function YA(){return o.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("ellipse",{cx:"12",cy:"5",rx:"7",ry:"3"}),o.jsx("path",{d:"M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5"}),o.jsx("path",{d:"M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"})]})}function PA(){return o.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("circle",{cx:"12",cy:"12",r:"9"}),o.jsx("path",{d:"M12 11v6"}),o.jsx("path",{d:"M12 7h.01"})]})}function GA(){return o.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("path",{d:"m6 6 12 12"}),o.jsx("path",{d:"m18 6-12 12"})]})}const Td=new Date().toISOString().slice(0,10);function FA(){const[n,a]=S.useState(""),[s,l]=S.useState(!1),[c,h]=S.useState([]),[d,m]=S.useState(""),[p,g]=S.useState([]),[v,x]=S.useState(""),[b,E]=S.useState([]),[w,N]=S.useState(""),[T,A]=S.useState([]),[k,_]=S.useState(""),[z,U]=S.useState(""),[L,D]=S.useState("day"),[H,M]=S.useState(Td),[O,$]=S.useState(Td),[Z,ue]=S.useState(Td),[de,ye]=S.useState("load"),[Y,le]=S.useState(""),[Q,G]=S.useState();S.useEffect(()=>{fe("database.getState").then(te=>{a(te.provider),l(te.usesBusinessSections),h(te.businessSections),g(te.sources)}).catch(te=>le(te instanceof Error?te.message:String(te))).finally(()=>ye(""))},[]);const ae=async te=>{var he,we,Ce,Ve;if(x(te),N(""),_(""),U(""),E([]),A([]),G(void 0),le(""),!!te){ye("schema");try{const Xe=await fe("database.getSchema",{sourceId:te});A(Xe.fields),E(Xe.datasets),_(((he=Xe.fields.find(ct=>ct.type==="date"))==null?void 0:he.id)||""),U(((we=Xe.fields.find(ct=>ct.type==="number"))==null?void 0:we.id)||""),N(((Ce=Xe.datasets.find(ct=>ct.name==="本年截止今日"))==null?void 0:Ce.id)||((Ve=Xe.datasets[0])==null?void 0:Ve.id)||"")}catch(Xe){le(Xe instanceof Error?Xe.message:String(Xe))}finally{ye("")}}},C=async()=>{ye("query"),le(""),G(void 0);try{G(await fe("database.inspect",{sourceId:v,datasetId:w,dateFieldId:be?k:"",valueFieldId:be?z:"",rangeKind:be?L:"all",businessDate:H,startDate:O,endDate:Z},12e4))}catch(te){le(te instanceof Error?te.message:String(te))}finally{ye("")}},V=T.filter(te=>te.type==="date"),I=s?p.filter(te=>te.businessSection===d):p,ne=T.filter(te=>te.type==="number"),oe=T.find(te=>te.id===z),me=b.find(te=>te.id===w),be=(me==null?void 0:me.name.trim())==="本年截止今日",ie=S.useMemo(()=>{const te=new Set([k,z]);return[...T.filter(he=>te.has(he.id)),...T.filter(he=>!te.has(he.id))]},[T,k,z]),J=L==="week"||L==="custom",ce=v&&w&&(!be||k&&(!J||O&&Z));return o.jsxs("div",{className:"page database-viewer-page",children:[o.jsxs("header",{children:[o.jsxs("div",{children:[o.jsx("h1",{children:"数据库查看"}),o.jsx("p",{children:"按当前适配器提供的目录选择数据库并查看真实 View；目录层级不会由界面写死。"})]}),o.jsxs("span",{className:"database-provider",children:[o.jsx(Qd,{}),"当前适配器：",n||"读取中"]})]}),o.jsxs("section",{className:"database-query-panel",children:[o.jsxs("div",{className:"database-query-heading",children:[o.jsx("h2",{children:"查询条件"}),o.jsx("p",{children:"普通 View 读取其完整结果；只有“本年截止今日”可在返回记录内计算日期口径。"})]}),o.jsxs("div",{className:"database-query-grid",children:[s&&o.jsxs("label",{children:["业务板块",o.jsx(Ie,{value:d,placeholder:de==="load"?"正在读取业务板块…":"请选择业务板块",disabled:!!de,options:c.map(te=>({value:te,label:te})),onChange:te=>{m(te),ae("")}})]}),o.jsxs("label",{children:["数据库",o.jsx(Ie,{value:v,placeholder:"请选择具体数据库",disabled:s&&!d||!!de,options:I.map(te=>({value:te.id,label:te.name})),onChange:ae})]}),o.jsxs("label",{children:["View",o.jsx(Ie,{value:w,placeholder:de==="schema"?"正在读取 View…":"请选择 View",disabled:!v||!!de,options:b.map(te=>({value:te.id,label:te.name})),onChange:te=>{N(te),G(void 0)}})]}),be&&o.jsxs(o.Fragment,{children:[o.jsxs("label",{children:["日期字段",o.jsx(Ie,{value:k,placeholder:"请选择日期字段",disabled:!T.length||!!de,options:V.map(te=>({value:te.id,label:te.name})),onChange:_})]}),o.jsxs("label",{children:["累计字段",o.jsx(Ie,{value:z,placeholder:"可选择数值字段",disabled:!T.length||!!de,options:ne.map(te=>({value:te.id,label:te.name})),onChange:U})]}),o.jsxs("label",{children:["软件查询口径",o.jsx(Ie,{value:L,placeholder:"请选择日期口径",disabled:!!de,options:[{value:"day",label:"指定日期"},{value:"week",label:"指定日期范围"},{value:"month",label:"月初至指定日期"},{value:"year",label:"年初至指定日期"}],onChange:te=>{D(te),G(void 0)}})]}),!J&&o.jsxs("label",{children:["指定日期",o.jsx(Gt,{value:H,onChange:M})]}),J&&o.jsxs(o.Fragment,{children:[o.jsxs("label",{children:["开始日期",o.jsx(Gt,{value:O,onChange:$})]}),o.jsxs("label",{children:["结束日期",o.jsx(Gt,{value:Z,onChange:ue})]})]})]})]}),o.jsx("div",{className:"database-query-actions",children:o.jsxs("button",{className:"primary",disabled:!ce||!!de,onClick:C,children:[de==="query"?o.jsx(hn,{className:"spin"}):o.jsx($C,{}),de==="query"?"正在查询…":"执行查询"]})})]}),Y&&o.jsxs("div",{className:"notice error",role:"alert",children:[o.jsx(YC,{}),o.jsxs("div",{children:[o.jsx("strong",{children:"查询失败"}),o.jsx("span",{children:Y})]})]}),Q?o.jsxs("section",{className:"database-result",children:[o.jsxs("div",{className:"database-result-head",children:[o.jsxs("div",{children:[o.jsxs("h2",{children:[Q.sourceName," · ",Q.datasetName]}),o.jsx("p",{children:be?`${Q.startDate} ～ ${Q.endDate}`:"完整 View 结果"})]}),o.jsxs("dl",{children:[o.jsxs("div",{children:[o.jsxs("dt",{children:[o.jsx(QC,{}),"命中记录"]}),o.jsx("dd",{children:Q.recordCount})]}),be&&o.jsxs("div",{children:[o.jsxs("dt",{children:[o.jsx(JC,{}),(oe==null?void 0:oe.name)||"累计值"]}),o.jsx("dd",{children:Q.total??"—"})]})]})]}),o.jsx("div",{className:"database-table-wrap",children:o.jsxs("table",{children:[o.jsx("thead",{children:o.jsx("tr",{children:ie.map(te=>o.jsxs("th",{children:[te.name,o.jsx("small",{children:te.type})]},te.id))})}),o.jsx("tbody",{children:Q.records.map(te=>o.jsx("tr",{children:ie.map(he=>o.jsx("td",{children:XA(te.values[he.id])},he.id))},te.id))})]})}),Q.truncated&&o.jsx("p",{className:"database-truncated",children:"结果仅展示前 200 条，命中数量和累计值按全部记录计算。"})]}):!de&&!Y&&o.jsxs("section",{className:"database-empty",children:[o.jsx(Qd,{}),o.jsx("h2",{children:s?"选择业务板块、数据库和 View 后执行查询":"选择数据库和 View 后执行查询"}),o.jsx("p",{children:"普通 View 显示完整结果；“本年截止今日”可进一步选择日期口径。所有操作均为只读。"})]})]})}function XA(n){return n==null||n===""?"—":typeof n=="boolean"?n?"是":"否":typeof n=="number"?n.toLocaleString("zh-CN",{maximumFractionDigits:2}):String(n)}function $A(){const[n,a]=S.useState(()=>window.location.search),[s,l]=S.useState(!1);S.useEffect(()=>{const E=()=>a(window.location.search);return window.addEventListener("popstate",E),()=>window.removeEventListener("popstate",E)},[]);const c=new URLSearchParams(n),h=c.get("route"),d=h!=null&&h.startsWith("navigation:")||h==="daily-weld"||h==="production-message"||h==="database-viewer"||h==="daily-report"||h==="report-center"||h==="plan-pdf"||h==="production-meeting"?h:"production-message",m=c.get("navigation")||"",p=Qb();S.useEffect(()=>{zC(d,m)},[d,m]);const g=E=>fe("app.navigateNative",{tag:E}).catch(()=>{}),v=d.startsWith("navigation:")?d.slice(11):d,x=d.startsWith("navigation:");S.useEffect(()=>(document.body.classList.toggle("settings-over-native",x&&s),()=>document.body.classList.remove("settings-over-native")),[x,s]);const b=()=>{l(!1),window.dispatchEvent(new Event("production-settings-updated")),fe("settings.close").catch(()=>{})};return o.jsxs("div",{className:`desktop-shell ${x&&s?"settings-over-native":""}`,children:[o.jsx("div",{className:"production-message-demo desktop-shell-navigation",children:o.jsx(xA,{active:v,navigate:g,openSettings:()=>l(!0)})}),o.jsx("div",{className:`desktop-shell-content ${x?"desktop-shell-content-native":""}`,children:x?o.jsx("div",{className:"native-content-slot","aria-hidden":"true"}):o.jsx(wT,{mode:"wait",children:o.jsx(Gf.div,{className:d==="production-message"||d==="daily-weld"?"production-message-demo production-message-content":"app-shell","data-page-route":d,initial:p?!1:{opacity:0,y:8},animate:{opacity:1,y:0},exit:p?void 0:{opacity:0,y:-6},transition:{duration:.2},children:d==="production-message"?o.jsx(CA,{}):d==="daily-weld"?o.jsx(gA,{openSettings:()=>l(!0)}):o.jsx("main",{children:d==="production-meeting"?o.jsx(MA,{}):d==="plan-pdf"?o.jsx(AA,{}):d==="database-viewer"?o.jsx(FA,{}):d==="daily-report"?o.jsx(hA,{openSettings:()=>l(!0)}):o.jsx(RA,{})})},d)})}),o.jsx(OA,{open:s,onClose:b})]})}Oj.createRoot(document.getElementById("root")).render(o.jsx(dx.StrictMode,{children:o.jsx($A,{})}));
