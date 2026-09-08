function m2(n,a){for(var s=0;s<a.length;s++){const o=a[s];if(typeof o!="string"&&!Array.isArray(o)){for(const c in o)if(c!=="default"&&!(c in n)){const h=Object.getOwnPropertyDescriptor(o,c);h&&Object.defineProperty(n,c,h.get?h:{enumerable:!0,get:()=>o[c]})}}}return Object.freeze(Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}))}(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))o(c);new MutationObserver(c=>{for(const h of c)if(h.type==="childList")for(const f of h.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&o(f)}).observe(document,{childList:!0,subtree:!0});function s(c){const h={};return c.integrity&&(h.integrity=c.integrity),c.referrerPolicy&&(h.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?h.credentials="include":c.crossOrigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function o(c){if(c.ep)return;c.ep=!0;const h=s(c);fetch(c.href,h)}})();function Jv(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var _u={exports:{}},Ui={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Yg;function p2(){if(Yg)return Ui;Yg=1;var n=Symbol.for("react.transitional.element"),a=Symbol.for("react.fragment");function s(o,c,h){var f=null;if(h!==void 0&&(f=""+h),c.key!==void 0&&(f=""+c.key),"key"in c){h={};for(var m in c)m!=="key"&&(h[m]=c[m])}else h=c;return c=h.ref,{$$typeof:n,type:o,key:f,ref:c!==void 0?c:null,props:h}}return Ui.Fragment=a,Ui.jsx=s,Ui.jsxs=s,Ui}var Gg;function g2(){return Gg||(Gg=1,_u.exports=p2()),_u.exports}var u=g2(),Vu={exports:{}},Se={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Pg;function y2(){if(Pg)return Se;Pg=1;var n=Symbol.for("react.transitional.element"),a=Symbol.for("react.portal"),s=Symbol.for("react.fragment"),o=Symbol.for("react.strict_mode"),c=Symbol.for("react.profiler"),h=Symbol.for("react.consumer"),f=Symbol.for("react.context"),m=Symbol.for("react.forward_ref"),g=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),x=Symbol.for("react.activity"),b=Symbol.iterator;function j(C){return C===null||typeof C!="object"?null:(C=b&&C[b]||C["@@iterator"],typeof C=="function"?C:null)}var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},T=Object.assign,A={};function R(C,O,J){this.props=C,this.context=O,this.refs=A,this.updater=J||E}R.prototype.isReactComponent={},R.prototype.setState=function(C,O){if(typeof C!="object"&&typeof C!="function"&&C!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,C,O,"setState")},R.prototype.forceUpdate=function(C){this.updater.enqueueForceUpdate(this,C,"forceUpdate")};function M(){}M.prototype=R.prototype;function _(C,O,J){this.props=C,this.context=O,this.refs=A,this.updater=J||E}var V=_.prototype=new M;V.constructor=_,T(V,R.prototype),V.isPureReactComponent=!0;var L=Array.isArray;function P(){}var k={H:null,A:null,T:null,S:null},N=Object.prototype.hasOwnProperty;function G(C,O,J){var te=J.ref;return{$$typeof:n,type:C,key:O,ref:te!==void 0?te:null,props:J}}function F(C,O){return G(C.type,O,C.props)}function ee(C){return typeof C=="object"&&C!==null&&C.$$typeof===n}function ie(C){var O={"=":"=0",":":"=2"};return"$"+C.replace(/[=:]/g,function(J){return O[J]})}var ge=/\/+/g;function ce(C,O){return typeof C=="object"&&C!==null&&C.key!=null?ie(""+C.key):O.toString(36)}function oe(C){switch(C.status){case"fulfilled":return C.value;case"rejected":throw C.reason;default:switch(typeof C.status=="string"?C.then(P,P):(C.status="pending",C.then(function(O){C.status==="pending"&&(C.status="fulfilled",C.value=O)},function(O){C.status==="pending"&&(C.status="rejected",C.reason=O)})),C.status){case"fulfilled":return C.value;case"rejected":throw C.reason}}throw C}function U(C,O,J,te,le){var de=typeof C;(de==="undefined"||de==="boolean")&&(C=null);var ve=!1;if(C===null)ve=!0;else switch(de){case"bigint":case"string":case"number":ve=!0;break;case"object":switch(C.$$typeof){case n:case a:ve=!0;break;case v:return ve=C._init,U(ve(C._payload),O,J,te,le)}}if(ve)return le=le(C),ve=te===""?"."+ce(C,0):te,L(le)?(J="",ve!=null&&(J=ve.replace(ge,"$&/")+"/"),U(le,O,J,"",function(fe){return fe})):le!=null&&(ee(le)&&(le=F(le,J+(le.key==null||C&&C.key===le.key?"":(""+le.key).replace(ge,"$&/")+"/")+ve)),O.push(le)),1;ve=0;var re=te===""?".":te+":";if(L(C))for(var Q=0;Q<C.length;Q++)te=C[Q],de=re+ce(te,Q),ve+=U(te,O,J,de,le);else if(Q=j(C),typeof Q=="function")for(C=Q.call(C),Q=0;!(te=C.next()).done;)te=te.value,de=re+ce(te,Q++),ve+=U(te,O,J,de,le);else if(de==="object"){if(typeof C.then=="function")return U(oe(C),O,J,te,le);throw O=String(C),Error("Objects are not valid as a React child (found: "+(O==="[object Object]"?"object with keys {"+Object.keys(C).join(", ")+"}":O)+"). If you meant to render a collection of children, use an array instead.")}return ve}function ae(C,O,J){if(C==null)return C;var te=[],le=0;return U(C,te,"","",function(de){return O.call(J,de,le++)}),te}function se(C){if(C._status===-1){var O=C._result;O=O(),O.then(function(J){(C._status===0||C._status===-1)&&(C._status=1,C._result=J)},function(J){(C._status===0||C._status===-1)&&(C._status=2,C._result=J)}),C._status===-1&&(C._status=0,C._result=O)}if(C._status===1)return C._result.default;throw C._result}var $=typeof reportError=="function"?reportError:function(C){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var O=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof C=="object"&&C!==null&&typeof C.message=="string"?String(C.message):String(C),error:C});if(!window.dispatchEvent(O))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",C);return}console.error(C)},ne={map:ae,forEach:function(C,O,J){ae(C,function(){O.apply(this,arguments)},J)},count:function(C){var O=0;return ae(C,function(){O++}),O},toArray:function(C){return ae(C,function(O){return O})||[]},only:function(C){if(!ee(C))throw Error("React.Children.only expected to receive a single React element child.");return C}};return Se.Activity=x,Se.Children=ne,Se.Component=R,Se.Fragment=s,Se.Profiler=c,Se.PureComponent=_,Se.StrictMode=o,Se.Suspense=g,Se.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=k,Se.__COMPILER_RUNTIME={__proto__:null,c:function(C){return k.H.useMemoCache(C)}},Se.cache=function(C){return function(){return C.apply(null,arguments)}},Se.cacheSignal=function(){return null},Se.cloneElement=function(C,O,J){if(C==null)throw Error("The argument must be a React element, but you passed "+C+".");var te=T({},C.props),le=C.key;if(O!=null)for(de in O.key!==void 0&&(le=""+O.key),O)!N.call(O,de)||de==="key"||de==="__self"||de==="__source"||de==="ref"&&O.ref===void 0||(te[de]=O[de]);var de=arguments.length-2;if(de===1)te.children=J;else if(1<de){for(var ve=Array(de),re=0;re<de;re++)ve[re]=arguments[re+2];te.children=ve}return G(C.type,le,te)},Se.createContext=function(C){return C={$$typeof:f,_currentValue:C,_currentValue2:C,_threadCount:0,Provider:null,Consumer:null},C.Provider=C,C.Consumer={$$typeof:h,_context:C},C},Se.createElement=function(C,O,J){var te,le={},de=null;if(O!=null)for(te in O.key!==void 0&&(de=""+O.key),O)N.call(O,te)&&te!=="key"&&te!=="__self"&&te!=="__source"&&(le[te]=O[te]);var ve=arguments.length-2;if(ve===1)le.children=J;else if(1<ve){for(var re=Array(ve),Q=0;Q<ve;Q++)re[Q]=arguments[Q+2];le.children=re}if(C&&C.defaultProps)for(te in ve=C.defaultProps,ve)le[te]===void 0&&(le[te]=ve[te]);return G(C,de,le)},Se.createRef=function(){return{current:null}},Se.forwardRef=function(C){return{$$typeof:m,render:C}},Se.isValidElement=ee,Se.lazy=function(C){return{$$typeof:v,_payload:{_status:-1,_result:C},_init:se}},Se.memo=function(C,O){return{$$typeof:p,type:C,compare:O===void 0?null:O}},Se.startTransition=function(C){var O=k.T,J={};k.T=J;try{var te=C(),le=k.S;le!==null&&le(J,te),typeof te=="object"&&te!==null&&typeof te.then=="function"&&te.then(P,$)}catch(de){$(de)}finally{O!==null&&J.types!==null&&(O.types=J.types),k.T=O}},Se.unstable_useCacheRefresh=function(){return k.H.useCacheRefresh()},Se.use=function(C){return k.H.use(C)},Se.useActionState=function(C,O,J){return k.H.useActionState(C,O,J)},Se.useCallback=function(C,O){return k.H.useCallback(C,O)},Se.useContext=function(C){return k.H.useContext(C)},Se.useDebugValue=function(){},Se.useDeferredValue=function(C,O){return k.H.useDeferredValue(C,O)},Se.useEffect=function(C,O){return k.H.useEffect(C,O)},Se.useEffectEvent=function(C){return k.H.useEffectEvent(C)},Se.useId=function(){return k.H.useId()},Se.useImperativeHandle=function(C,O,J){return k.H.useImperativeHandle(C,O,J)},Se.useInsertionEffect=function(C,O){return k.H.useInsertionEffect(C,O)},Se.useLayoutEffect=function(C,O){return k.H.useLayoutEffect(C,O)},Se.useMemo=function(C,O){return k.H.useMemo(C,O)},Se.useOptimistic=function(C,O){return k.H.useOptimistic(C,O)},Se.useReducer=function(C,O,J){return k.H.useReducer(C,O,J)},Se.useRef=function(C){return k.H.useRef(C)},Se.useState=function(C){return k.H.useState(C)},Se.useSyncExternalStore=function(C,O,J){return k.H.useSyncExternalStore(C,O,J)},Se.useTransition=function(){return k.H.useTransition()},Se.version="19.2.8",Se}var Xg;function Jd(){return Xg||(Xg=1,Vu.exports=y2()),Vu.exports}var S=Jd();const Wv=Jv(S),as=m2({__proto__:null,default:Wv},[S]);var Bu={exports:{}},Hi={},Lu={exports:{}},Uu={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $g;function v2(){return $g||($g=1,(function(n){function a(U,ae){var se=U.length;U.push(ae);e:for(;0<se;){var $=se-1>>>1,ne=U[$];if(0<c(ne,ae))U[$]=ae,U[se]=ne,se=$;else break e}}function s(U){return U.length===0?null:U[0]}function o(U){if(U.length===0)return null;var ae=U[0],se=U.pop();if(se!==ae){U[0]=se;e:for(var $=0,ne=U.length,C=ne>>>1;$<C;){var O=2*($+1)-1,J=U[O],te=O+1,le=U[te];if(0>c(J,se))te<ne&&0>c(le,J)?(U[$]=le,U[te]=se,$=te):(U[$]=J,U[O]=se,$=O);else if(te<ne&&0>c(le,se))U[$]=le,U[te]=se,$=te;else break e}}return ae}function c(U,ae){var se=U.sortIndex-ae.sortIndex;return se!==0?se:U.id-ae.id}if(n.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var h=performance;n.unstable_now=function(){return h.now()}}else{var f=Date,m=f.now();n.unstable_now=function(){return f.now()-m}}var g=[],p=[],v=1,x=null,b=3,j=!1,E=!1,T=!1,A=!1,R=typeof setTimeout=="function"?setTimeout:null,M=typeof clearTimeout=="function"?clearTimeout:null,_=typeof setImmediate<"u"?setImmediate:null;function V(U){for(var ae=s(p);ae!==null;){if(ae.callback===null)o(p);else if(ae.startTime<=U)o(p),ae.sortIndex=ae.expirationTime,a(g,ae);else break;ae=s(p)}}function L(U){if(T=!1,V(U),!E)if(s(g)!==null)E=!0,P||(P=!0,ie());else{var ae=s(p);ae!==null&&oe(L,ae.startTime-U)}}var P=!1,k=-1,N=5,G=-1;function F(){return A?!0:!(n.unstable_now()-G<N)}function ee(){if(A=!1,P){var U=n.unstable_now();G=U;var ae=!0;try{e:{E=!1,T&&(T=!1,M(k),k=-1),j=!0;var se=b;try{t:{for(V(U),x=s(g);x!==null&&!(x.expirationTime>U&&F());){var $=x.callback;if(typeof $=="function"){x.callback=null,b=x.priorityLevel;var ne=$(x.expirationTime<=U);if(U=n.unstable_now(),typeof ne=="function"){x.callback=ne,V(U),ae=!0;break t}x===s(g)&&o(g),V(U)}else o(g);x=s(g)}if(x!==null)ae=!0;else{var C=s(p);C!==null&&oe(L,C.startTime-U),ae=!1}}break e}finally{x=null,b=se,j=!1}ae=void 0}}finally{ae?ie():P=!1}}}var ie;if(typeof _=="function")ie=function(){_(ee)};else if(typeof MessageChannel<"u"){var ge=new MessageChannel,ce=ge.port2;ge.port1.onmessage=ee,ie=function(){ce.postMessage(null)}}else ie=function(){R(ee,0)};function oe(U,ae){k=R(function(){U(n.unstable_now())},ae)}n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(U){U.callback=null},n.unstable_forceFrameRate=function(U){0>U||125<U?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):N=0<U?Math.floor(1e3/U):5},n.unstable_getCurrentPriorityLevel=function(){return b},n.unstable_next=function(U){switch(b){case 1:case 2:case 3:var ae=3;break;default:ae=b}var se=b;b=ae;try{return U()}finally{b=se}},n.unstable_requestPaint=function(){A=!0},n.unstable_runWithPriority=function(U,ae){switch(U){case 1:case 2:case 3:case 4:case 5:break;default:U=3}var se=b;b=U;try{return ae()}finally{b=se}},n.unstable_scheduleCallback=function(U,ae,se){var $=n.unstable_now();switch(typeof se=="object"&&se!==null?(se=se.delay,se=typeof se=="number"&&0<se?$+se:$):se=$,U){case 1:var ne=-1;break;case 2:ne=250;break;case 5:ne=1073741823;break;case 4:ne=1e4;break;default:ne=5e3}return ne=se+ne,U={id:v++,callback:ae,priorityLevel:U,startTime:se,expirationTime:ne,sortIndex:-1},se>$?(U.sortIndex=se,a(p,U),s(g)===null&&U===s(p)&&(T?(M(k),k=-1):T=!0,oe(L,se-$))):(U.sortIndex=ne,a(g,U),E||j||(E=!0,P||(P=!0,ie()))),U},n.unstable_shouldYield=F,n.unstable_wrapCallback=function(U){var ae=b;return function(){var se=b;b=ae;try{return U.apply(this,arguments)}finally{b=se}}}})(Uu)),Uu}var Fg;function x2(){return Fg||(Fg=1,Lu.exports=v2()),Lu.exports}var Hu={exports:{}},gt={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Kg;function b2(){if(Kg)return gt;Kg=1;var n=Jd();function a(g){var p="https://react.dev/errors/"+g;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var v=2;v<arguments.length;v++)p+="&args[]="+encodeURIComponent(arguments[v])}return"Minified React error #"+g+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function s(){}var o={d:{f:s,r:function(){throw Error(a(522))},D:s,C:s,L:s,m:s,X:s,S:s,M:s},p:0,findDOMNode:null},c=Symbol.for("react.portal");function h(g,p,v){var x=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:c,key:x==null?null:""+x,children:g,containerInfo:p,implementation:v}}var f=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function m(g,p){if(g==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return gt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=o,gt.createPortal=function(g,p){var v=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(a(299));return h(g,p,null,v)},gt.flushSync=function(g){var p=f.T,v=o.p;try{if(f.T=null,o.p=2,g)return g()}finally{f.T=p,o.p=v,o.d.f()}},gt.preconnect=function(g,p){typeof g=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,o.d.C(g,p))},gt.prefetchDNS=function(g){typeof g=="string"&&o.d.D(g)},gt.preinit=function(g,p){if(typeof g=="string"&&p&&typeof p.as=="string"){var v=p.as,x=m(v,p.crossOrigin),b=typeof p.integrity=="string"?p.integrity:void 0,j=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;v==="style"?o.d.S(g,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:x,integrity:b,fetchPriority:j}):v==="script"&&o.d.X(g,{crossOrigin:x,integrity:b,fetchPriority:j,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},gt.preinitModule=function(g,p){if(typeof g=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var v=m(p.as,p.crossOrigin);o.d.M(g,{crossOrigin:v,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&o.d.M(g)},gt.preload=function(g,p){if(typeof g=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var v=p.as,x=m(v,p.crossOrigin);o.d.L(g,v,{crossOrigin:x,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},gt.preloadModule=function(g,p){if(typeof g=="string")if(p){var v=m(p.as,p.crossOrigin);o.d.m(g,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:v,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else o.d.m(g)},gt.requestFormReset=function(g){o.d.r(g)},gt.unstable_batchedUpdates=function(g,p){return g(p)},gt.useFormState=function(g,p,v){return f.H.useFormState(g,p,v)},gt.useFormStatus=function(){return f.H.useHostTransitionStatus()},gt.version="19.2.8",gt}var Zg;function Iv(){if(Zg)return Hu.exports;Zg=1;function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(a){console.error(a)}}return n(),Hu.exports=b2(),Hu.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Qg;function S2(){if(Qg)return Hi;Qg=1;var n=x2(),a=Jd(),s=Iv();function o(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var r=2;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function c(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function h(e){var t=e,r=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(r=t.return),e=t.return;while(e)}return t.tag===3?r:null}function f(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function m(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function g(e){if(h(e)!==e)throw Error(o(188))}function p(e){var t=e.alternate;if(!t){if(t=h(e),t===null)throw Error(o(188));return t!==e?null:e}for(var r=e,i=t;;){var l=r.return;if(l===null)break;var d=l.alternate;if(d===null){if(i=l.return,i!==null){r=i;continue}break}if(l.child===d.child){for(d=l.child;d;){if(d===r)return g(l),e;if(d===i)return g(l),t;d=d.sibling}throw Error(o(188))}if(r.return!==i.return)r=l,i=d;else{for(var y=!1,w=l.child;w;){if(w===r){y=!0,r=l,i=d;break}if(w===i){y=!0,i=l,r=d;break}w=w.sibling}if(!y){for(w=d.child;w;){if(w===r){y=!0,r=d,i=l;break}if(w===i){y=!0,i=d,r=l;break}w=w.sibling}if(!y)throw Error(o(189))}}if(r.alternate!==i)throw Error(o(190))}if(r.tag!==3)throw Error(o(188));return r.stateNode.current===r?e:t}function v(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=v(e),t!==null)return t;e=e.sibling}return null}var x=Object.assign,b=Symbol.for("react.element"),j=Symbol.for("react.transitional.element"),E=Symbol.for("react.portal"),T=Symbol.for("react.fragment"),A=Symbol.for("react.strict_mode"),R=Symbol.for("react.profiler"),M=Symbol.for("react.consumer"),_=Symbol.for("react.context"),V=Symbol.for("react.forward_ref"),L=Symbol.for("react.suspense"),P=Symbol.for("react.suspense_list"),k=Symbol.for("react.memo"),N=Symbol.for("react.lazy"),G=Symbol.for("react.activity"),F=Symbol.for("react.memo_cache_sentinel"),ee=Symbol.iterator;function ie(e){return e===null||typeof e!="object"?null:(e=ee&&e[ee]||e["@@iterator"],typeof e=="function"?e:null)}var ge=Symbol.for("react.client.reference");function ce(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===ge?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case T:return"Fragment";case R:return"Profiler";case A:return"StrictMode";case L:return"Suspense";case P:return"SuspenseList";case G:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case E:return"Portal";case _:return e.displayName||"Context";case M:return(e._context.displayName||"Context")+".Consumer";case V:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case k:return t=e.displayName||null,t!==null?t:ce(e.type)||"Memo";case N:t=e._payload,e=e._init;try{return ce(e(t))}catch{}}return null}var oe=Array.isArray,U=a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ae=s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,se={pending:!1,data:null,method:null,action:null},$=[],ne=-1;function C(e){return{current:e}}function O(e){0>ne||(e.current=$[ne],$[ne]=null,ne--)}function J(e,t){ne++,$[ne]=e.current,e.current=t}var te=C(null),le=C(null),de=C(null),ve=C(null);function re(e,t){switch(J(de,t),J(le,e),J(te,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?dg(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=dg(t),e=fg(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}O(te),J(te,e)}function Q(){O(te),O(le),O(de)}function fe(e){e.memoizedState!==null&&J(ve,e);var t=te.current,r=fg(t,e.type);t!==r&&(J(le,e),J(te,r))}function I(e){le.current===e&&(O(te),O(le)),ve.current===e&&(O(ve),_i._currentValue=se)}var me,Ce;function ze(e){if(me===void 0)try{throw Error()}catch(r){var t=r.stack.trim().match(/\n( *(at )?)/);me=t&&t[1]||"",Ce=-1<r.stack.indexOf(`
    at`)?" (<anonymous>)":-1<r.stack.indexOf("@")?"@unknown:0:0":""}return`
`+me+e+Ce}var Qe=!1;function $e(e,t){if(!e||Qe)return"";Qe=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(t){var W=function(){throw Error()};if(Object.defineProperty(W.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(W,[])}catch(X){var Y=X}Reflect.construct(e,[],W)}else{try{W.call()}catch(X){Y=X}e.call(W.prototype)}}else{try{throw Error()}catch(X){Y=X}(W=e())&&typeof W.catch=="function"&&W.catch(function(){})}}catch(X){if(X&&Y&&typeof X.stack=="string")return[X.stack,Y.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var l=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");l&&l.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var d=i.DetermineComponentFrameRoot(),y=d[0],w=d[1];if(y&&w){var D=y.split(`
`),q=w.split(`
`);for(l=i=0;i<D.length&&!D[i].includes("DetermineComponentFrameRoot");)i++;for(;l<q.length&&!q[l].includes("DetermineComponentFrameRoot");)l++;if(i===D.length||l===q.length)for(i=D.length-1,l=q.length-1;1<=i&&0<=l&&D[i]!==q[l];)l--;for(;1<=i&&0<=l;i--,l--)if(D[i]!==q[l]){if(i!==1||l!==1)do if(i--,l--,0>l||D[i]!==q[l]){var K=`
`+D[i].replace(" at new "," at ");return e.displayName&&K.includes("<anonymous>")&&(K=K.replace("<anonymous>",e.displayName)),K}while(1<=i&&0<=l);break}}}finally{Qe=!1,Error.prepareStackTrace=r}return(r=e?e.displayName||e.name:"")?ze(r):""}function yt(e,t){switch(e.tag){case 26:case 27:case 5:return ze(e.type);case 16:return ze("Lazy");case 13:return e.child!==t&&t!==null?ze("Suspense Fallback"):ze("Suspense");case 19:return ze("SuspenseList");case 0:case 15:return $e(e.type,!1);case 11:return $e(e.type.render,!1);case 1:return $e(e.type,!0);case 31:return ze("Activity");default:return""}}function Yf(e){try{var t="",r=null;do t+=yt(e,r),r=e,e=e.return;while(e);return t}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var bl=Object.prototype.hasOwnProperty,Sl=n.unstable_scheduleCallback,wl=n.unstable_cancelCallback,$b=n.unstable_shouldYield,Fb=n.unstable_requestPaint,Nt=n.unstable_now,Kb=n.unstable_getCurrentPriorityLevel,Gf=n.unstable_ImmediatePriority,Pf=n.unstable_UserBlockingPriority,ds=n.unstable_NormalPriority,Zb=n.unstable_LowPriority,Xf=n.unstable_IdlePriority,Qb=n.log,Jb=n.unstable_setDisableYieldValue,Fa=null,Mt=null;function qn(e){if(typeof Qb=="function"&&Jb(e),Mt&&typeof Mt.setStrictMode=="function")try{Mt.setStrictMode(Fa,e)}catch{}}var kt=Math.clz32?Math.clz32:e1,Wb=Math.log,Ib=Math.LN2;function e1(e){return e>>>=0,e===0?32:31-(Wb(e)/Ib|0)|0}var fs=256,hs=262144,ms=4194304;function xr(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function ps(e,t,r){var i=e.pendingLanes;if(i===0)return 0;var l=0,d=e.suspendedLanes,y=e.pingedLanes;e=e.warmLanes;var w=i&134217727;return w!==0?(i=w&~d,i!==0?l=xr(i):(y&=w,y!==0?l=xr(y):r||(r=w&~e,r!==0&&(l=xr(r))))):(w=i&~d,w!==0?l=xr(w):y!==0?l=xr(y):r||(r=i&~e,r!==0&&(l=xr(r)))),l===0?0:t!==0&&t!==l&&(t&d)===0&&(d=l&-l,r=t&-t,d>=r||d===32&&(r&4194048)!==0)?t:l}function Ka(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function t1(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function $f(){var e=ms;return ms<<=1,(ms&62914560)===0&&(ms=4194304),e}function jl(e){for(var t=[],r=0;31>r;r++)t.push(e);return t}function Za(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function n1(e,t,r,i,l,d){var y=e.pendingLanes;e.pendingLanes=r,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=r,e.entangledLanes&=r,e.errorRecoveryDisabledLanes&=r,e.shellSuspendCounter=0;var w=e.entanglements,D=e.expirationTimes,q=e.hiddenUpdates;for(r=y&~r;0<r;){var K=31-kt(r),W=1<<K;w[K]=0,D[K]=-1;var Y=q[K];if(Y!==null)for(q[K]=null,K=0;K<Y.length;K++){var X=Y[K];X!==null&&(X.lane&=-536870913)}r&=~W}i!==0&&Ff(e,i,0),d!==0&&l===0&&e.tag!==0&&(e.suspendedLanes|=d&~(y&~t))}function Ff(e,t,r){e.pendingLanes|=t,e.suspendedLanes&=~t;var i=31-kt(t);e.entangledLanes|=t,e.entanglements[i]=e.entanglements[i]|1073741824|r&261930}function Kf(e,t){var r=e.entangledLanes|=t;for(e=e.entanglements;r;){var i=31-kt(r),l=1<<i;l&t|e[i]&t&&(e[i]|=t),r&=~l}}function Zf(e,t){var r=t&-t;return r=(r&42)!==0?1:El(r),(r&(e.suspendedLanes|t))!==0?0:r}function El(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Tl(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Qf(){var e=ae.p;return e!==0?e:(e=window.event,e===void 0?32:_g(e.type))}function Jf(e,t){var r=ae.p;try{return ae.p=e,t()}finally{ae.p=r}}var Yn=Math.random().toString(36).slice(2),ct="__reactFiber$"+Yn,wt="__reactProps$"+Yn,Xr="__reactContainer$"+Yn,Cl="__reactEvents$"+Yn,r1="__reactListeners$"+Yn,a1="__reactHandles$"+Yn,Wf="__reactResources$"+Yn,Qa="__reactMarker$"+Yn;function Al(e){delete e[ct],delete e[wt],delete e[Cl],delete e[r1],delete e[a1]}function $r(e){var t=e[ct];if(t)return t;for(var r=e.parentNode;r;){if(t=r[Xr]||r[ct]){if(r=t.alternate,t.child!==null||r!==null&&r.child!==null)for(e=xg(e);e!==null;){if(r=e[ct])return r;e=xg(e)}return t}e=r,r=e.parentNode}return null}function Fr(e){if(e=e[ct]||e[Xr]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Ja(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(o(33))}function Kr(e){var t=e[Wf];return t||(t=e[Wf]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function st(e){e[Qa]=!0}var If=new Set,eh={};function br(e,t){Zr(e,t),Zr(e+"Capture",t)}function Zr(e,t){for(eh[e]=t,e=0;e<t.length;e++)If.add(t[e])}var i1=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),th={},nh={};function s1(e){return bl.call(nh,e)?!0:bl.call(th,e)?!1:i1.test(e)?nh[e]=!0:(th[e]=!0,!1)}function gs(e,t,r){if(s1(t))if(r===null)e.removeAttribute(t);else{switch(typeof r){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var i=t.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+r)}}function ys(e,t,r){if(r===null)e.removeAttribute(t);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+r)}}function xn(e,t,r,i){if(i===null)e.removeAttribute(r);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(r);return}e.setAttributeNS(t,r,""+i)}}function qt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function rh(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function o1(e,t,r){var i=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var l=i.get,d=i.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(y){r=""+y,d.call(this,y)}}),Object.defineProperty(e,t,{enumerable:i.enumerable}),{getValue:function(){return r},setValue:function(y){r=""+y},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Dl(e){if(!e._valueTracker){var t=rh(e)?"checked":"value";e._valueTracker=o1(e,t,""+e[t])}}function ah(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var r=t.getValue(),i="";return e&&(i=rh(e)?e.checked?"true":"false":e.value),e=i,e!==r?(t.setValue(e),!0):!1}function vs(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var l1=/[\n"\\]/g;function Yt(e){return e.replace(l1,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function Nl(e,t,r,i,l,d,y,w){e.name="",y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"?e.type=y:e.removeAttribute("type"),t!=null?y==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+qt(t)):e.value!==""+qt(t)&&(e.value=""+qt(t)):y!=="submit"&&y!=="reset"||e.removeAttribute("value"),t!=null?Ml(e,y,qt(t)):r!=null?Ml(e,y,qt(r)):i!=null&&e.removeAttribute("value"),l==null&&d!=null&&(e.defaultChecked=!!d),l!=null&&(e.checked=l&&typeof l!="function"&&typeof l!="symbol"),w!=null&&typeof w!="function"&&typeof w!="symbol"&&typeof w!="boolean"?e.name=""+qt(w):e.removeAttribute("name")}function ih(e,t,r,i,l,d,y,w){if(d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"&&(e.type=d),t!=null||r!=null){if(!(d!=="submit"&&d!=="reset"||t!=null)){Dl(e);return}r=r!=null?""+qt(r):"",t=t!=null?""+qt(t):r,w||t===e.value||(e.value=t),e.defaultValue=t}i=i??l,i=typeof i!="function"&&typeof i!="symbol"&&!!i,e.checked=w?e.checked:!!i,e.defaultChecked=!!i,y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"&&(e.name=y),Dl(e)}function Ml(e,t,r){t==="number"&&vs(e.ownerDocument)===e||e.defaultValue===""+r||(e.defaultValue=""+r)}function Qr(e,t,r,i){if(e=e.options,t){t={};for(var l=0;l<r.length;l++)t["$"+r[l]]=!0;for(r=0;r<e.length;r++)l=t.hasOwnProperty("$"+e[r].value),e[r].selected!==l&&(e[r].selected=l),l&&i&&(e[r].defaultSelected=!0)}else{for(r=""+qt(r),t=null,l=0;l<e.length;l++){if(e[l].value===r){e[l].selected=!0,i&&(e[l].defaultSelected=!0);return}t!==null||e[l].disabled||(t=e[l])}t!==null&&(t.selected=!0)}}function sh(e,t,r){if(t!=null&&(t=""+qt(t),t!==e.value&&(e.value=t),r==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=r!=null?""+qt(r):""}function oh(e,t,r,i){if(t==null){if(i!=null){if(r!=null)throw Error(o(92));if(oe(i)){if(1<i.length)throw Error(o(93));i=i[0]}r=i}r==null&&(r=""),t=r}r=qt(t),e.defaultValue=r,i=e.textContent,i===r&&i!==""&&i!==null&&(e.value=i),Dl(e)}function Jr(e,t){if(t){var r=e.firstChild;if(r&&r===e.lastChild&&r.nodeType===3){r.nodeValue=t;return}}e.textContent=t}var c1=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function lh(e,t,r){var i=t.indexOf("--")===0;r==null||typeof r=="boolean"||r===""?i?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":i?e.setProperty(t,r):typeof r!="number"||r===0||c1.has(t)?t==="float"?e.cssFloat=r:e[t]=(""+r).trim():e[t]=r+"px"}function ch(e,t,r){if(t!=null&&typeof t!="object")throw Error(o(62));if(e=e.style,r!=null){for(var i in r)!r.hasOwnProperty(i)||t!=null&&t.hasOwnProperty(i)||(i.indexOf("--")===0?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="");for(var l in t)i=t[l],t.hasOwnProperty(l)&&r[l]!==i&&lh(e,l,i)}else for(var d in t)t.hasOwnProperty(d)&&lh(e,d,t[d])}function kl(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var u1=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),d1=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function xs(e){return d1.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function bn(){}var Rl=null;function Ol(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Wr=null,Ir=null;function uh(e){var t=Fr(e);if(t&&(e=t.stateNode)){var r=e[wt]||null;e:switch(e=t.stateNode,t.type){case"input":if(Nl(e,r.value,r.defaultValue,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name),t=r.name,r.type==="radio"&&t!=null){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll('input[name="'+Yt(""+t)+'"][type="radio"]'),t=0;t<r.length;t++){var i=r[t];if(i!==e&&i.form===e.form){var l=i[wt]||null;if(!l)throw Error(o(90));Nl(i,l.value,l.defaultValue,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name)}}for(t=0;t<r.length;t++)i=r[t],i.form===e.form&&ah(i)}break e;case"textarea":sh(e,r.value,r.defaultValue);break e;case"select":t=r.value,t!=null&&Qr(e,!!r.multiple,t,!1)}}}var zl=!1;function dh(e,t,r){if(zl)return e(t,r);zl=!0;try{var i=e(t);return i}finally{if(zl=!1,(Wr!==null||Ir!==null)&&(so(),Wr&&(t=Wr,e=Ir,Ir=Wr=null,uh(t),e)))for(t=0;t<e.length;t++)uh(e[t])}}function Wa(e,t){var r=e.stateNode;if(r===null)return null;var i=r[wt]||null;if(i===null)return null;r=i[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break e;default:e=!1}if(e)return null;if(r&&typeof r!="function")throw Error(o(231,t,typeof r));return r}var Sn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),_l=!1;if(Sn)try{var Ia={};Object.defineProperty(Ia,"passive",{get:function(){_l=!0}}),window.addEventListener("test",Ia,Ia),window.removeEventListener("test",Ia,Ia)}catch{_l=!1}var Gn=null,Vl=null,bs=null;function fh(){if(bs)return bs;var e,t=Vl,r=t.length,i,l="value"in Gn?Gn.value:Gn.textContent,d=l.length;for(e=0;e<r&&t[e]===l[e];e++);var y=r-e;for(i=1;i<=y&&t[r-i]===l[d-i];i++);return bs=l.slice(e,1<i?1-i:void 0)}function Ss(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function ws(){return!0}function hh(){return!1}function jt(e){function t(r,i,l,d,y){this._reactName=r,this._targetInst=l,this.type=i,this.nativeEvent=d,this.target=y,this.currentTarget=null;for(var w in e)e.hasOwnProperty(w)&&(r=e[w],this[w]=r?r(d):d[w]);return this.isDefaultPrevented=(d.defaultPrevented!=null?d.defaultPrevented:d.returnValue===!1)?ws:hh,this.isPropagationStopped=hh,this}return x(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=ws)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=ws)},persist:function(){},isPersistent:ws}),t}var Sr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},js=jt(Sr),ei=x({},Sr,{view:0,detail:0}),f1=jt(ei),Bl,Ll,ti,Es=x({},ei,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Hl,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==ti&&(ti&&e.type==="mousemove"?(Bl=e.screenX-ti.screenX,Ll=e.screenY-ti.screenY):Ll=Bl=0,ti=e),Bl)},movementY:function(e){return"movementY"in e?e.movementY:Ll}}),mh=jt(Es),h1=x({},Es,{dataTransfer:0}),m1=jt(h1),p1=x({},ei,{relatedTarget:0}),Ul=jt(p1),g1=x({},Sr,{animationName:0,elapsedTime:0,pseudoElement:0}),y1=jt(g1),v1=x({},Sr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),x1=jt(v1),b1=x({},Sr,{data:0}),ph=jt(b1),S1={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},w1={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},j1={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function E1(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=j1[e])?!!t[e]:!1}function Hl(){return E1}var T1=x({},ei,{key:function(e){if(e.key){var t=S1[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Ss(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?w1[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Hl,charCode:function(e){return e.type==="keypress"?Ss(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Ss(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),C1=jt(T1),A1=x({},Es,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),gh=jt(A1),D1=x({},ei,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Hl}),N1=jt(D1),M1=x({},Sr,{propertyName:0,elapsedTime:0,pseudoElement:0}),k1=jt(M1),R1=x({},Es,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),O1=jt(R1),z1=x({},Sr,{newState:0,oldState:0}),_1=jt(z1),V1=[9,13,27,32],ql=Sn&&"CompositionEvent"in window,ni=null;Sn&&"documentMode"in document&&(ni=document.documentMode);var B1=Sn&&"TextEvent"in window&&!ni,yh=Sn&&(!ql||ni&&8<ni&&11>=ni),vh=" ",xh=!1;function bh(e,t){switch(e){case"keyup":return V1.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Sh(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var ea=!1;function L1(e,t){switch(e){case"compositionend":return Sh(t);case"keypress":return t.which!==32?null:(xh=!0,vh);case"textInput":return e=t.data,e===vh&&xh?null:e;default:return null}}function U1(e,t){if(ea)return e==="compositionend"||!ql&&bh(e,t)?(e=fh(),bs=Vl=Gn=null,ea=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return yh&&t.locale!=="ko"?null:t.data;default:return null}}var H1={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function wh(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!H1[e.type]:t==="textarea"}function jh(e,t,r,i){Wr?Ir?Ir.push(i):Ir=[i]:Wr=i,t=mo(t,"onChange"),0<t.length&&(r=new js("onChange","change",null,r,i),e.push({event:r,listeners:t}))}var ri=null,ai=null;function q1(e){ig(e,0)}function Ts(e){var t=Ja(e);if(ah(t))return e}function Eh(e,t){if(e==="change")return t}var Th=!1;if(Sn){var Yl;if(Sn){var Gl="oninput"in document;if(!Gl){var Ch=document.createElement("div");Ch.setAttribute("oninput","return;"),Gl=typeof Ch.oninput=="function"}Yl=Gl}else Yl=!1;Th=Yl&&(!document.documentMode||9<document.documentMode)}function Ah(){ri&&(ri.detachEvent("onpropertychange",Dh),ai=ri=null)}function Dh(e){if(e.propertyName==="value"&&Ts(ai)){var t=[];jh(t,ai,e,Ol(e)),dh(q1,t)}}function Y1(e,t,r){e==="focusin"?(Ah(),ri=t,ai=r,ri.attachEvent("onpropertychange",Dh)):e==="focusout"&&Ah()}function G1(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ts(ai)}function P1(e,t){if(e==="click")return Ts(t)}function X1(e,t){if(e==="input"||e==="change")return Ts(t)}function $1(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Rt=typeof Object.is=="function"?Object.is:$1;function ii(e,t){if(Rt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var r=Object.keys(e),i=Object.keys(t);if(r.length!==i.length)return!1;for(i=0;i<r.length;i++){var l=r[i];if(!bl.call(t,l)||!Rt(e[l],t[l]))return!1}return!0}function Nh(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Mh(e,t){var r=Nh(e);e=0;for(var i;r;){if(r.nodeType===3){if(i=e+r.textContent.length,e<=t&&i>=t)return{node:r,offset:t-e};e=i}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=Nh(r)}}function kh(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?kh(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Rh(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=vs(e.document);t instanceof e.HTMLIFrameElement;){try{var r=typeof t.contentWindow.location.href=="string"}catch{r=!1}if(r)e=t.contentWindow;else break;t=vs(e.document)}return t}function Pl(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var F1=Sn&&"documentMode"in document&&11>=document.documentMode,ta=null,Xl=null,si=null,$l=!1;function Oh(e,t,r){var i=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;$l||ta==null||ta!==vs(i)||(i=ta,"selectionStart"in i&&Pl(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),si&&ii(si,i)||(si=i,i=mo(Xl,"onSelect"),0<i.length&&(t=new js("onSelect","select",null,t,r),e.push({event:t,listeners:i}),t.target=ta)))}function wr(e,t){var r={};return r[e.toLowerCase()]=t.toLowerCase(),r["Webkit"+e]="webkit"+t,r["Moz"+e]="moz"+t,r}var na={animationend:wr("Animation","AnimationEnd"),animationiteration:wr("Animation","AnimationIteration"),animationstart:wr("Animation","AnimationStart"),transitionrun:wr("Transition","TransitionRun"),transitionstart:wr("Transition","TransitionStart"),transitioncancel:wr("Transition","TransitionCancel"),transitionend:wr("Transition","TransitionEnd")},Fl={},zh={};Sn&&(zh=document.createElement("div").style,"AnimationEvent"in window||(delete na.animationend.animation,delete na.animationiteration.animation,delete na.animationstart.animation),"TransitionEvent"in window||delete na.transitionend.transition);function jr(e){if(Fl[e])return Fl[e];if(!na[e])return e;var t=na[e],r;for(r in t)if(t.hasOwnProperty(r)&&r in zh)return Fl[e]=t[r];return e}var _h=jr("animationend"),Vh=jr("animationiteration"),Bh=jr("animationstart"),K1=jr("transitionrun"),Z1=jr("transitionstart"),Q1=jr("transitioncancel"),Lh=jr("transitionend"),Uh=new Map,Kl="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Kl.push("scrollEnd");function en(e,t){Uh.set(e,t),br(t,[e])}var Cs=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Gt=[],ra=0,Zl=0;function As(){for(var e=ra,t=Zl=ra=0;t<e;){var r=Gt[t];Gt[t++]=null;var i=Gt[t];Gt[t++]=null;var l=Gt[t];Gt[t++]=null;var d=Gt[t];if(Gt[t++]=null,i!==null&&l!==null){var y=i.pending;y===null?l.next=l:(l.next=y.next,y.next=l),i.pending=l}d!==0&&Hh(r,l,d)}}function Ds(e,t,r,i){Gt[ra++]=e,Gt[ra++]=t,Gt[ra++]=r,Gt[ra++]=i,Zl|=i,e.lanes|=i,e=e.alternate,e!==null&&(e.lanes|=i)}function Ql(e,t,r,i){return Ds(e,t,r,i),Ns(e)}function Er(e,t){return Ds(e,null,null,t),Ns(e)}function Hh(e,t,r){e.lanes|=r;var i=e.alternate;i!==null&&(i.lanes|=r);for(var l=!1,d=e.return;d!==null;)d.childLanes|=r,i=d.alternate,i!==null&&(i.childLanes|=r),d.tag===22&&(e=d.stateNode,e===null||e._visibility&1||(l=!0)),e=d,d=d.return;return e.tag===3?(d=e.stateNode,l&&t!==null&&(l=31-kt(r),e=d.hiddenUpdates,i=e[l],i===null?e[l]=[t]:i.push(t),t.lane=r|536870912),d):null}function Ns(e){if(50<Di)throw Di=0,iu=null,Error(o(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var aa={};function J1(e,t,r,i){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ot(e,t,r,i){return new J1(e,t,r,i)}function Jl(e){return e=e.prototype,!(!e||!e.isReactComponent)}function wn(e,t){var r=e.alternate;return r===null?(r=Ot(e.tag,t,e.key,e.mode),r.elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=e.flags&65011712,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,t=e.dependencies,r.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r.refCleanup=e.refCleanup,r}function qh(e,t){e.flags&=65011714;var r=e.alternate;return r===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=r.childLanes,e.lanes=r.lanes,e.child=r.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=r.memoizedProps,e.memoizedState=r.memoizedState,e.updateQueue=r.updateQueue,e.type=r.type,t=r.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Ms(e,t,r,i,l,d){var y=0;if(i=e,typeof e=="function")Jl(e)&&(y=1);else if(typeof e=="string")y=n2(e,r,te.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case G:return e=Ot(31,r,t,l),e.elementType=G,e.lanes=d,e;case T:return Tr(r.children,l,d,t);case A:y=8,l|=24;break;case R:return e=Ot(12,r,t,l|2),e.elementType=R,e.lanes=d,e;case L:return e=Ot(13,r,t,l),e.elementType=L,e.lanes=d,e;case P:return e=Ot(19,r,t,l),e.elementType=P,e.lanes=d,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case _:y=10;break e;case M:y=9;break e;case V:y=11;break e;case k:y=14;break e;case N:y=16,i=null;break e}y=29,r=Error(o(130,e===null?"null":typeof e,"")),i=null}return t=Ot(y,r,t,l),t.elementType=e,t.type=i,t.lanes=d,t}function Tr(e,t,r,i){return e=Ot(7,e,i,t),e.lanes=r,e}function Wl(e,t,r){return e=Ot(6,e,null,t),e.lanes=r,e}function Yh(e){var t=Ot(18,null,null,0);return t.stateNode=e,t}function Il(e,t,r){return t=Ot(4,e.children!==null?e.children:[],e.key,t),t.lanes=r,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Gh=new WeakMap;function Pt(e,t){if(typeof e=="object"&&e!==null){var r=Gh.get(e);return r!==void 0?r:(t={value:e,source:t,stack:Yf(t)},Gh.set(e,t),t)}return{value:e,source:t,stack:Yf(t)}}var ia=[],sa=0,ks=null,oi=0,Xt=[],$t=0,Pn=null,cn=1,un="";function jn(e,t){ia[sa++]=oi,ia[sa++]=ks,ks=e,oi=t}function Ph(e,t,r){Xt[$t++]=cn,Xt[$t++]=un,Xt[$t++]=Pn,Pn=e;var i=cn;e=un;var l=32-kt(i)-1;i&=~(1<<l),r+=1;var d=32-kt(t)+l;if(30<d){var y=l-l%5;d=(i&(1<<y)-1).toString(32),i>>=y,l-=y,cn=1<<32-kt(t)+l|r<<l|i,un=d+e}else cn=1<<d|r<<l|i,un=e}function ec(e){e.return!==null&&(jn(e,1),Ph(e,1,0))}function tc(e){for(;e===ks;)ks=ia[--sa],ia[sa]=null,oi=ia[--sa],ia[sa]=null;for(;e===Pn;)Pn=Xt[--$t],Xt[$t]=null,un=Xt[--$t],Xt[$t]=null,cn=Xt[--$t],Xt[$t]=null}function Xh(e,t){Xt[$t++]=cn,Xt[$t++]=un,Xt[$t++]=Pn,cn=t.id,un=t.overflow,Pn=e}var ut=null,Ge=null,Ne=!1,Xn=null,Ft=!1,nc=Error(o(519));function $n(e){var t=Error(o(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw li(Pt(t,e)),nc}function $h(e){var t=e.stateNode,r=e.type,i=e.memoizedProps;switch(t[ct]=e,t[wt]=i,r){case"dialog":Te("cancel",t),Te("close",t);break;case"iframe":case"object":case"embed":Te("load",t);break;case"video":case"audio":for(r=0;r<Mi.length;r++)Te(Mi[r],t);break;case"source":Te("error",t);break;case"img":case"image":case"link":Te("error",t),Te("load",t);break;case"details":Te("toggle",t);break;case"input":Te("invalid",t),ih(t,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":Te("invalid",t);break;case"textarea":Te("invalid",t),oh(t,i.value,i.defaultValue,i.children)}r=i.children,typeof r!="string"&&typeof r!="number"&&typeof r!="bigint"||t.textContent===""+r||i.suppressHydrationWarning===!0||cg(t.textContent,r)?(i.popover!=null&&(Te("beforetoggle",t),Te("toggle",t)),i.onScroll!=null&&Te("scroll",t),i.onScrollEnd!=null&&Te("scrollend",t),i.onClick!=null&&(t.onclick=bn),t=!0):t=!1,t||$n(e,!0)}function Fh(e){for(ut=e.return;ut;)switch(ut.tag){case 5:case 31:case 13:Ft=!1;return;case 27:case 3:Ft=!0;return;default:ut=ut.return}}function oa(e){if(e!==ut)return!1;if(!Ne)return Fh(e),Ne=!0,!1;var t=e.tag,r;if((r=t!==3&&t!==27)&&((r=t===5)&&(r=e.type,r=!(r!=="form"&&r!=="button")||bu(e.type,e.memoizedProps)),r=!r),r&&Ge&&$n(e),Fh(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(o(317));Ge=vg(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(o(317));Ge=vg(e)}else t===27?(t=Ge,sr(e.type)?(e=Tu,Tu=null,Ge=e):Ge=t):Ge=ut?Zt(e.stateNode.nextSibling):null;return!0}function Cr(){Ge=ut=null,Ne=!1}function rc(){var e=Xn;return e!==null&&(At===null?At=e:At.push.apply(At,e),Xn=null),e}function li(e){Xn===null?Xn=[e]:Xn.push(e)}var ac=C(null),Ar=null,En=null;function Fn(e,t,r){J(ac,t._currentValue),t._currentValue=r}function Tn(e){e._currentValue=ac.current,O(ac)}function ic(e,t,r){for(;e!==null;){var i=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,i!==null&&(i.childLanes|=t)):i!==null&&(i.childLanes&t)!==t&&(i.childLanes|=t),e===r)break;e=e.return}}function sc(e,t,r,i){var l=e.child;for(l!==null&&(l.return=e);l!==null;){var d=l.dependencies;if(d!==null){var y=l.child;d=d.firstContext;e:for(;d!==null;){var w=d;d=l;for(var D=0;D<t.length;D++)if(w.context===t[D]){d.lanes|=r,w=d.alternate,w!==null&&(w.lanes|=r),ic(d.return,r,e),i||(y=null);break e}d=w.next}}else if(l.tag===18){if(y=l.return,y===null)throw Error(o(341));y.lanes|=r,d=y.alternate,d!==null&&(d.lanes|=r),ic(y,r,e),y=null}else y=l.child;if(y!==null)y.return=l;else for(y=l;y!==null;){if(y===e){y=null;break}if(l=y.sibling,l!==null){l.return=y.return,y=l;break}y=y.return}l=y}}function la(e,t,r,i){e=null;for(var l=t,d=!1;l!==null;){if(!d){if((l.flags&524288)!==0)d=!0;else if((l.flags&262144)!==0)break}if(l.tag===10){var y=l.alternate;if(y===null)throw Error(o(387));if(y=y.memoizedProps,y!==null){var w=l.type;Rt(l.pendingProps.value,y.value)||(e!==null?e.push(w):e=[w])}}else if(l===ve.current){if(y=l.alternate,y===null)throw Error(o(387));y.memoizedState.memoizedState!==l.memoizedState.memoizedState&&(e!==null?e.push(_i):e=[_i])}l=l.return}e!==null&&sc(t,e,r,i),t.flags|=262144}function Rs(e){for(e=e.firstContext;e!==null;){if(!Rt(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Dr(e){Ar=e,En=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function dt(e){return Kh(Ar,e)}function Os(e,t){return Ar===null&&Dr(e),Kh(e,t)}function Kh(e,t){var r=t._currentValue;if(t={context:t,memoizedValue:r,next:null},En===null){if(e===null)throw Error(o(308));En=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else En=En.next=t;return r}var W1=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(r,i){e.push(i)}};this.abort=function(){t.aborted=!0,e.forEach(function(r){return r()})}},I1=n.unstable_scheduleCallback,eS=n.unstable_NormalPriority,Ie={$$typeof:_,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function oc(){return{controller:new W1,data:new Map,refCount:0}}function ci(e){e.refCount--,e.refCount===0&&I1(eS,function(){e.controller.abort()})}var ui=null,lc=0,ca=0,ua=null;function tS(e,t){if(ui===null){var r=ui=[];lc=0,ca=du(),ua={status:"pending",value:void 0,then:function(i){r.push(i)}}}return lc++,t.then(Zh,Zh),t}function Zh(){if(--lc===0&&ui!==null){ua!==null&&(ua.status="fulfilled");var e=ui;ui=null,ca=0,ua=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function nS(e,t){var r=[],i={status:"pending",value:null,reason:null,then:function(l){r.push(l)}};return e.then(function(){i.status="fulfilled",i.value=t;for(var l=0;l<r.length;l++)(0,r[l])(t)},function(l){for(i.status="rejected",i.reason=l,l=0;l<r.length;l++)(0,r[l])(void 0)}),i}var Qh=U.S;U.S=function(e,t){Op=Nt(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&tS(e,t),Qh!==null&&Qh(e,t)};var Nr=C(null);function cc(){var e=Nr.current;return e!==null?e:He.pooledCache}function zs(e,t){t===null?J(Nr,Nr.current):J(Nr,t.pool)}function Jh(){var e=cc();return e===null?null:{parent:Ie._currentValue,pool:e}}var da=Error(o(460)),uc=Error(o(474)),_s=Error(o(542)),Vs={then:function(){}};function Wh(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Ih(e,t,r){switch(r=e[r],r===void 0?e.push(t):r!==t&&(t.then(bn,bn),t=r),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,tm(e),e;default:if(typeof t.status=="string")t.then(bn,bn);else{if(e=He,e!==null&&100<e.shellSuspendCounter)throw Error(o(482));e=t,e.status="pending",e.then(function(i){if(t.status==="pending"){var l=t;l.status="fulfilled",l.value=i}},function(i){if(t.status==="pending"){var l=t;l.status="rejected",l.reason=i}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,tm(e),e}throw kr=t,da}}function Mr(e){try{var t=e._init;return t(e._payload)}catch(r){throw r!==null&&typeof r=="object"&&typeof r.then=="function"?(kr=r,da):r}}var kr=null;function em(){if(kr===null)throw Error(o(459));var e=kr;return kr=null,e}function tm(e){if(e===da||e===_s)throw Error(o(483))}var fa=null,di=0;function Bs(e){var t=di;return di+=1,fa===null&&(fa=[]),Ih(fa,e,t)}function fi(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function Ls(e,t){throw t.$$typeof===b?Error(o(525)):(e=Object.prototype.toString.call(t),Error(o(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function nm(e){function t(B,z){if(e){var H=B.deletions;H===null?(B.deletions=[z],B.flags|=16):H.push(z)}}function r(B,z){if(!e)return null;for(;z!==null;)t(B,z),z=z.sibling;return null}function i(B){for(var z=new Map;B!==null;)B.key!==null?z.set(B.key,B):z.set(B.index,B),B=B.sibling;return z}function l(B,z){return B=wn(B,z),B.index=0,B.sibling=null,B}function d(B,z,H){return B.index=H,e?(H=B.alternate,H!==null?(H=H.index,H<z?(B.flags|=67108866,z):H):(B.flags|=67108866,z)):(B.flags|=1048576,z)}function y(B){return e&&B.alternate===null&&(B.flags|=67108866),B}function w(B,z,H,Z){return z===null||z.tag!==6?(z=Wl(H,B.mode,Z),z.return=B,z):(z=l(z,H),z.return=B,z)}function D(B,z,H,Z){var ye=H.type;return ye===T?K(B,z,H.props.children,Z,H.key):z!==null&&(z.elementType===ye||typeof ye=="object"&&ye!==null&&ye.$$typeof===N&&Mr(ye)===z.type)?(z=l(z,H.props),fi(z,H),z.return=B,z):(z=Ms(H.type,H.key,H.props,null,B.mode,Z),fi(z,H),z.return=B,z)}function q(B,z,H,Z){return z===null||z.tag!==4||z.stateNode.containerInfo!==H.containerInfo||z.stateNode.implementation!==H.implementation?(z=Il(H,B.mode,Z),z.return=B,z):(z=l(z,H.children||[]),z.return=B,z)}function K(B,z,H,Z,ye){return z===null||z.tag!==7?(z=Tr(H,B.mode,Z,ye),z.return=B,z):(z=l(z,H),z.return=B,z)}function W(B,z,H){if(typeof z=="string"&&z!==""||typeof z=="number"||typeof z=="bigint")return z=Wl(""+z,B.mode,H),z.return=B,z;if(typeof z=="object"&&z!==null){switch(z.$$typeof){case j:return H=Ms(z.type,z.key,z.props,null,B.mode,H),fi(H,z),H.return=B,H;case E:return z=Il(z,B.mode,H),z.return=B,z;case N:return z=Mr(z),W(B,z,H)}if(oe(z)||ie(z))return z=Tr(z,B.mode,H,null),z.return=B,z;if(typeof z.then=="function")return W(B,Bs(z),H);if(z.$$typeof===_)return W(B,Os(B,z),H);Ls(B,z)}return null}function Y(B,z,H,Z){var ye=z!==null?z.key:null;if(typeof H=="string"&&H!==""||typeof H=="number"||typeof H=="bigint")return ye!==null?null:w(B,z,""+H,Z);if(typeof H=="object"&&H!==null){switch(H.$$typeof){case j:return H.key===ye?D(B,z,H,Z):null;case E:return H.key===ye?q(B,z,H,Z):null;case N:return H=Mr(H),Y(B,z,H,Z)}if(oe(H)||ie(H))return ye!==null?null:K(B,z,H,Z,null);if(typeof H.then=="function")return Y(B,z,Bs(H),Z);if(H.$$typeof===_)return Y(B,z,Os(B,H),Z);Ls(B,H)}return null}function X(B,z,H,Z,ye){if(typeof Z=="string"&&Z!==""||typeof Z=="number"||typeof Z=="bigint")return B=B.get(H)||null,w(z,B,""+Z,ye);if(typeof Z=="object"&&Z!==null){switch(Z.$$typeof){case j:return B=B.get(Z.key===null?H:Z.key)||null,D(z,B,Z,ye);case E:return B=B.get(Z.key===null?H:Z.key)||null,q(z,B,Z,ye);case N:return Z=Mr(Z),X(B,z,H,Z,ye)}if(oe(Z)||ie(Z))return B=B.get(H)||null,K(z,B,Z,ye,null);if(typeof Z.then=="function")return X(B,z,H,Bs(Z),ye);if(Z.$$typeof===_)return X(B,z,H,Os(z,Z),ye);Ls(z,Z)}return null}function ue(B,z,H,Z){for(var ye=null,ke=null,pe=z,je=z=0,De=null;pe!==null&&je<H.length;je++){pe.index>je?(De=pe,pe=null):De=pe.sibling;var Re=Y(B,pe,H[je],Z);if(Re===null){pe===null&&(pe=De);break}e&&pe&&Re.alternate===null&&t(B,pe),z=d(Re,z,je),ke===null?ye=Re:ke.sibling=Re,ke=Re,pe=De}if(je===H.length)return r(B,pe),Ne&&jn(B,je),ye;if(pe===null){for(;je<H.length;je++)pe=W(B,H[je],Z),pe!==null&&(z=d(pe,z,je),ke===null?ye=pe:ke.sibling=pe,ke=pe);return Ne&&jn(B,je),ye}for(pe=i(pe);je<H.length;je++)De=X(pe,B,je,H[je],Z),De!==null&&(e&&De.alternate!==null&&pe.delete(De.key===null?je:De.key),z=d(De,z,je),ke===null?ye=De:ke.sibling=De,ke=De);return e&&pe.forEach(function(dr){return t(B,dr)}),Ne&&jn(B,je),ye}function xe(B,z,H,Z){if(H==null)throw Error(o(151));for(var ye=null,ke=null,pe=z,je=z=0,De=null,Re=H.next();pe!==null&&!Re.done;je++,Re=H.next()){pe.index>je?(De=pe,pe=null):De=pe.sibling;var dr=Y(B,pe,Re.value,Z);if(dr===null){pe===null&&(pe=De);break}e&&pe&&dr.alternate===null&&t(B,pe),z=d(dr,z,je),ke===null?ye=dr:ke.sibling=dr,ke=dr,pe=De}if(Re.done)return r(B,pe),Ne&&jn(B,je),ye;if(pe===null){for(;!Re.done;je++,Re=H.next())Re=W(B,Re.value,Z),Re!==null&&(z=d(Re,z,je),ke===null?ye=Re:ke.sibling=Re,ke=Re);return Ne&&jn(B,je),ye}for(pe=i(pe);!Re.done;je++,Re=H.next())Re=X(pe,B,je,Re.value,Z),Re!==null&&(e&&Re.alternate!==null&&pe.delete(Re.key===null?je:Re.key),z=d(Re,z,je),ke===null?ye=Re:ke.sibling=Re,ke=Re);return e&&pe.forEach(function(h2){return t(B,h2)}),Ne&&jn(B,je),ye}function Ue(B,z,H,Z){if(typeof H=="object"&&H!==null&&H.type===T&&H.key===null&&(H=H.props.children),typeof H=="object"&&H!==null){switch(H.$$typeof){case j:e:{for(var ye=H.key;z!==null;){if(z.key===ye){if(ye=H.type,ye===T){if(z.tag===7){r(B,z.sibling),Z=l(z,H.props.children),Z.return=B,B=Z;break e}}else if(z.elementType===ye||typeof ye=="object"&&ye!==null&&ye.$$typeof===N&&Mr(ye)===z.type){r(B,z.sibling),Z=l(z,H.props),fi(Z,H),Z.return=B,B=Z;break e}r(B,z);break}else t(B,z);z=z.sibling}H.type===T?(Z=Tr(H.props.children,B.mode,Z,H.key),Z.return=B,B=Z):(Z=Ms(H.type,H.key,H.props,null,B.mode,Z),fi(Z,H),Z.return=B,B=Z)}return y(B);case E:e:{for(ye=H.key;z!==null;){if(z.key===ye)if(z.tag===4&&z.stateNode.containerInfo===H.containerInfo&&z.stateNode.implementation===H.implementation){r(B,z.sibling),Z=l(z,H.children||[]),Z.return=B,B=Z;break e}else{r(B,z);break}else t(B,z);z=z.sibling}Z=Il(H,B.mode,Z),Z.return=B,B=Z}return y(B);case N:return H=Mr(H),Ue(B,z,H,Z)}if(oe(H))return ue(B,z,H,Z);if(ie(H)){if(ye=ie(H),typeof ye!="function")throw Error(o(150));return H=ye.call(H),xe(B,z,H,Z)}if(typeof H.then=="function")return Ue(B,z,Bs(H),Z);if(H.$$typeof===_)return Ue(B,z,Os(B,H),Z);Ls(B,H)}return typeof H=="string"&&H!==""||typeof H=="number"||typeof H=="bigint"?(H=""+H,z!==null&&z.tag===6?(r(B,z.sibling),Z=l(z,H),Z.return=B,B=Z):(r(B,z),Z=Wl(H,B.mode,Z),Z.return=B,B=Z),y(B)):r(B,z)}return function(B,z,H,Z){try{di=0;var ye=Ue(B,z,H,Z);return fa=null,ye}catch(pe){if(pe===da||pe===_s)throw pe;var ke=Ot(29,pe,null,B.mode);return ke.lanes=Z,ke.return=B,ke}finally{}}}var Rr=nm(!0),rm=nm(!1),Kn=!1;function dc(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function fc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Zn(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Qn(e,t,r){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,(Oe&2)!==0){var l=i.pending;return l===null?t.next=t:(t.next=l.next,l.next=t),i.pending=t,t=Ns(e),Hh(e,null,r),t}return Ds(e,i,t,r),Ns(e)}function hi(e,t,r){if(t=t.updateQueue,t!==null&&(t=t.shared,(r&4194048)!==0)){var i=t.lanes;i&=e.pendingLanes,r|=i,t.lanes=r,Kf(e,r)}}function hc(e,t){var r=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,r===i)){var l=null,d=null;if(r=r.firstBaseUpdate,r!==null){do{var y={lane:r.lane,tag:r.tag,payload:r.payload,callback:null,next:null};d===null?l=d=y:d=d.next=y,r=r.next}while(r!==null);d===null?l=d=t:d=d.next=t}else l=d=t;r={baseState:i.baseState,firstBaseUpdate:l,lastBaseUpdate:d,shared:i.shared,callbacks:i.callbacks},e.updateQueue=r;return}e=r.lastBaseUpdate,e===null?r.firstBaseUpdate=t:e.next=t,r.lastBaseUpdate=t}var mc=!1;function mi(){if(mc){var e=ua;if(e!==null)throw e}}function pi(e,t,r,i){mc=!1;var l=e.updateQueue;Kn=!1;var d=l.firstBaseUpdate,y=l.lastBaseUpdate,w=l.shared.pending;if(w!==null){l.shared.pending=null;var D=w,q=D.next;D.next=null,y===null?d=q:y.next=q,y=D;var K=e.alternate;K!==null&&(K=K.updateQueue,w=K.lastBaseUpdate,w!==y&&(w===null?K.firstBaseUpdate=q:w.next=q,K.lastBaseUpdate=D))}if(d!==null){var W=l.baseState;y=0,K=q=D=null,w=d;do{var Y=w.lane&-536870913,X=Y!==w.lane;if(X?(Ae&Y)===Y:(i&Y)===Y){Y!==0&&Y===ca&&(mc=!0),K!==null&&(K=K.next={lane:0,tag:w.tag,payload:w.payload,callback:null,next:null});e:{var ue=e,xe=w;Y=t;var Ue=r;switch(xe.tag){case 1:if(ue=xe.payload,typeof ue=="function"){W=ue.call(Ue,W,Y);break e}W=ue;break e;case 3:ue.flags=ue.flags&-65537|128;case 0:if(ue=xe.payload,Y=typeof ue=="function"?ue.call(Ue,W,Y):ue,Y==null)break e;W=x({},W,Y);break e;case 2:Kn=!0}}Y=w.callback,Y!==null&&(e.flags|=64,X&&(e.flags|=8192),X=l.callbacks,X===null?l.callbacks=[Y]:X.push(Y))}else X={lane:Y,tag:w.tag,payload:w.payload,callback:w.callback,next:null},K===null?(q=K=X,D=W):K=K.next=X,y|=Y;if(w=w.next,w===null){if(w=l.shared.pending,w===null)break;X=w,w=X.next,X.next=null,l.lastBaseUpdate=X,l.shared.pending=null}}while(!0);K===null&&(D=W),l.baseState=D,l.firstBaseUpdate=q,l.lastBaseUpdate=K,d===null&&(l.shared.lanes=0),tr|=y,e.lanes=y,e.memoizedState=W}}function am(e,t){if(typeof e!="function")throw Error(o(191,e));e.call(t)}function im(e,t){var r=e.callbacks;if(r!==null)for(e.callbacks=null,e=0;e<r.length;e++)am(r[e],t)}var ha=C(null),Us=C(0);function sm(e,t){e=zn,J(Us,e),J(ha,t),zn=e|t.baseLanes}function pc(){J(Us,zn),J(ha,ha.current)}function gc(){zn=Us.current,O(ha),O(Us)}var zt=C(null),Kt=null;function Jn(e){var t=e.alternate;J(Je,Je.current&1),J(zt,e),Kt===null&&(t===null||ha.current!==null||t.memoizedState!==null)&&(Kt=e)}function yc(e){J(Je,Je.current),J(zt,e),Kt===null&&(Kt=e)}function om(e){e.tag===22?(J(Je,Je.current),J(zt,e),Kt===null&&(Kt=e)):Wn()}function Wn(){J(Je,Je.current),J(zt,zt.current)}function _t(e){O(zt),Kt===e&&(Kt=null),O(Je)}var Je=C(0);function Hs(e){for(var t=e;t!==null;){if(t.tag===13){var r=t.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||ju(r)||Eu(r)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Cn=0,we=null,Be=null,et=null,qs=!1,ma=!1,Or=!1,Ys=0,gi=0,pa=null,rS=0;function Fe(){throw Error(o(321))}function vc(e,t){if(t===null)return!1;for(var r=0;r<t.length&&r<e.length;r++)if(!Rt(e[r],t[r]))return!1;return!0}function xc(e,t,r,i,l,d){return Cn=d,we=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,U.H=e===null||e.memoizedState===null?Pm:zc,Or=!1,d=r(i,l),Or=!1,ma&&(d=cm(t,r,i,l)),lm(e),d}function lm(e){U.H=xi;var t=Be!==null&&Be.next!==null;if(Cn=0,et=Be=we=null,qs=!1,gi=0,pa=null,t)throw Error(o(300));e===null||tt||(e=e.dependencies,e!==null&&Rs(e)&&(tt=!0))}function cm(e,t,r,i){we=e;var l=0;do{if(ma&&(pa=null),gi=0,ma=!1,25<=l)throw Error(o(301));if(l+=1,et=Be=null,e.updateQueue!=null){var d=e.updateQueue;d.lastEffect=null,d.events=null,d.stores=null,d.memoCache!=null&&(d.memoCache.index=0)}U.H=Xm,d=t(r,i)}while(ma);return d}function aS(){var e=U.H,t=e.useState()[0];return t=typeof t.then=="function"?yi(t):t,e=e.useState()[0],(Be!==null?Be.memoizedState:null)!==e&&(we.flags|=1024),t}function bc(){var e=Ys!==0;return Ys=0,e}function Sc(e,t,r){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~r}function wc(e){if(qs){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}qs=!1}Cn=0,et=Be=we=null,ma=!1,gi=Ys=0,pa=null}function vt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return et===null?we.memoizedState=et=e:et=et.next=e,et}function We(){if(Be===null){var e=we.alternate;e=e!==null?e.memoizedState:null}else e=Be.next;var t=et===null?we.memoizedState:et.next;if(t!==null)et=t,Be=e;else{if(e===null)throw we.alternate===null?Error(o(467)):Error(o(310));Be=e,e={memoizedState:Be.memoizedState,baseState:Be.baseState,baseQueue:Be.baseQueue,queue:Be.queue,next:null},et===null?we.memoizedState=et=e:et=et.next=e}return et}function Gs(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function yi(e){var t=gi;return gi+=1,pa===null&&(pa=[]),e=Ih(pa,e,t),t=we,(et===null?t.memoizedState:et.next)===null&&(t=t.alternate,U.H=t===null||t.memoizedState===null?Pm:zc),e}function Ps(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return yi(e);if(e.$$typeof===_)return dt(e)}throw Error(o(438,String(e)))}function jc(e){var t=null,r=we.updateQueue;if(r!==null&&(t=r.memoCache),t==null){var i=we.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(t={data:i.data.map(function(l){return l.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),r===null&&(r=Gs(),we.updateQueue=r),r.memoCache=t,r=t.data[t.index],r===void 0)for(r=t.data[t.index]=Array(e),i=0;i<e;i++)r[i]=F;return t.index++,r}function An(e,t){return typeof t=="function"?t(e):t}function Xs(e){var t=We();return Ec(t,Be,e)}function Ec(e,t,r){var i=e.queue;if(i===null)throw Error(o(311));i.lastRenderedReducer=r;var l=e.baseQueue,d=i.pending;if(d!==null){if(l!==null){var y=l.next;l.next=d.next,d.next=y}t.baseQueue=l=d,i.pending=null}if(d=e.baseState,l===null)e.memoizedState=d;else{t=l.next;var w=y=null,D=null,q=t,K=!1;do{var W=q.lane&-536870913;if(W!==q.lane?(Ae&W)===W:(Cn&W)===W){var Y=q.revertLane;if(Y===0)D!==null&&(D=D.next={lane:0,revertLane:0,gesture:null,action:q.action,hasEagerState:q.hasEagerState,eagerState:q.eagerState,next:null}),W===ca&&(K=!0);else if((Cn&Y)===Y){q=q.next,Y===ca&&(K=!0);continue}else W={lane:0,revertLane:q.revertLane,gesture:null,action:q.action,hasEagerState:q.hasEagerState,eagerState:q.eagerState,next:null},D===null?(w=D=W,y=d):D=D.next=W,we.lanes|=Y,tr|=Y;W=q.action,Or&&r(d,W),d=q.hasEagerState?q.eagerState:r(d,W)}else Y={lane:W,revertLane:q.revertLane,gesture:q.gesture,action:q.action,hasEagerState:q.hasEagerState,eagerState:q.eagerState,next:null},D===null?(w=D=Y,y=d):D=D.next=Y,we.lanes|=W,tr|=W;q=q.next}while(q!==null&&q!==t);if(D===null?y=d:D.next=w,!Rt(d,e.memoizedState)&&(tt=!0,K&&(r=ua,r!==null)))throw r;e.memoizedState=d,e.baseState=y,e.baseQueue=D,i.lastRenderedState=d}return l===null&&(i.lanes=0),[e.memoizedState,i.dispatch]}function Tc(e){var t=We(),r=t.queue;if(r===null)throw Error(o(311));r.lastRenderedReducer=e;var i=r.dispatch,l=r.pending,d=t.memoizedState;if(l!==null){r.pending=null;var y=l=l.next;do d=e(d,y.action),y=y.next;while(y!==l);Rt(d,t.memoizedState)||(tt=!0),t.memoizedState=d,t.baseQueue===null&&(t.baseState=d),r.lastRenderedState=d}return[d,i]}function um(e,t,r){var i=we,l=We(),d=Ne;if(d){if(r===void 0)throw Error(o(407));r=r()}else r=t();var y=!Rt((Be||l).memoizedState,r);if(y&&(l.memoizedState=r,tt=!0),l=l.queue,Dc(hm.bind(null,i,l,e),[e]),l.getSnapshot!==t||y||et!==null&&et.memoizedState.tag&1){if(i.flags|=2048,ga(9,{destroy:void 0},fm.bind(null,i,l,r,t),null),He===null)throw Error(o(349));d||(Cn&127)!==0||dm(i,t,r)}return r}function dm(e,t,r){e.flags|=16384,e={getSnapshot:t,value:r},t=we.updateQueue,t===null?(t=Gs(),we.updateQueue=t,t.stores=[e]):(r=t.stores,r===null?t.stores=[e]:r.push(e))}function fm(e,t,r,i){t.value=r,t.getSnapshot=i,mm(t)&&pm(e)}function hm(e,t,r){return r(function(){mm(t)&&pm(e)})}function mm(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!Rt(e,r)}catch{return!0}}function pm(e){var t=Er(e,2);t!==null&&Dt(t,e,2)}function Cc(e){var t=vt();if(typeof e=="function"){var r=e;if(e=r(),Or){qn(!0);try{r()}finally{qn(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:An,lastRenderedState:e},t}function gm(e,t,r,i){return e.baseState=r,Ec(e,Be,typeof i=="function"?i:An)}function iS(e,t,r,i,l){if(Ks(e))throw Error(o(485));if(e=t.action,e!==null){var d={payload:l,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(y){d.listeners.push(y)}};U.T!==null?r(!0):d.isTransition=!1,i(d),r=t.pending,r===null?(d.next=t.pending=d,ym(t,d)):(d.next=r.next,t.pending=r.next=d)}}function ym(e,t){var r=t.action,i=t.payload,l=e.state;if(t.isTransition){var d=U.T,y={};U.T=y;try{var w=r(l,i),D=U.S;D!==null&&D(y,w),vm(e,t,w)}catch(q){Ac(e,t,q)}finally{d!==null&&y.types!==null&&(d.types=y.types),U.T=d}}else try{d=r(l,i),vm(e,t,d)}catch(q){Ac(e,t,q)}}function vm(e,t,r){r!==null&&typeof r=="object"&&typeof r.then=="function"?r.then(function(i){xm(e,t,i)},function(i){return Ac(e,t,i)}):xm(e,t,r)}function xm(e,t,r){t.status="fulfilled",t.value=r,bm(t),e.state=r,t=e.pending,t!==null&&(r=t.next,r===t?e.pending=null:(r=r.next,t.next=r,ym(e,r)))}function Ac(e,t,r){var i=e.pending;if(e.pending=null,i!==null){i=i.next;do t.status="rejected",t.reason=r,bm(t),t=t.next;while(t!==i)}e.action=null}function bm(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Sm(e,t){return t}function wm(e,t){if(Ne){var r=He.formState;if(r!==null){e:{var i=we;if(Ne){if(Ge){t:{for(var l=Ge,d=Ft;l.nodeType!==8;){if(!d){l=null;break t}if(l=Zt(l.nextSibling),l===null){l=null;break t}}d=l.data,l=d==="F!"||d==="F"?l:null}if(l){Ge=Zt(l.nextSibling),i=l.data==="F!";break e}}$n(i)}i=!1}i&&(t=r[0])}}return r=vt(),r.memoizedState=r.baseState=t,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Sm,lastRenderedState:t},r.queue=i,r=qm.bind(null,we,i),i.dispatch=r,i=Cc(!1),d=Oc.bind(null,we,!1,i.queue),i=vt(),l={state:t,dispatch:null,action:e,pending:null},i.queue=l,r=iS.bind(null,we,l,d,r),l.dispatch=r,i.memoizedState=e,[t,r,!1]}function jm(e){var t=We();return Em(t,Be,e)}function Em(e,t,r){if(t=Ec(e,t,Sm)[0],e=Xs(An)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var i=yi(t)}catch(y){throw y===da?_s:y}else i=t;t=We();var l=t.queue,d=l.dispatch;return r!==t.memoizedState&&(we.flags|=2048,ga(9,{destroy:void 0},sS.bind(null,l,r),null)),[i,d,e]}function sS(e,t){e.action=t}function Tm(e){var t=We(),r=Be;if(r!==null)return Em(t,r,e);We(),t=t.memoizedState,r=We();var i=r.queue.dispatch;return r.memoizedState=e,[t,i,!1]}function ga(e,t,r,i){return e={tag:e,create:r,deps:i,inst:t,next:null},t=we.updateQueue,t===null&&(t=Gs(),we.updateQueue=t),r=t.lastEffect,r===null?t.lastEffect=e.next=e:(i=r.next,r.next=e,e.next=i,t.lastEffect=e),e}function Cm(){return We().memoizedState}function $s(e,t,r,i){var l=vt();we.flags|=e,l.memoizedState=ga(1|t,{destroy:void 0},r,i===void 0?null:i)}function Fs(e,t,r,i){var l=We();i=i===void 0?null:i;var d=l.memoizedState.inst;Be!==null&&i!==null&&vc(i,Be.memoizedState.deps)?l.memoizedState=ga(t,d,r,i):(we.flags|=e,l.memoizedState=ga(1|t,d,r,i))}function Am(e,t){$s(8390656,8,e,t)}function Dc(e,t){Fs(2048,8,e,t)}function oS(e){we.flags|=4;var t=we.updateQueue;if(t===null)t=Gs(),we.updateQueue=t,t.events=[e];else{var r=t.events;r===null?t.events=[e]:r.push(e)}}function Dm(e){var t=We().memoizedState;return oS({ref:t,nextImpl:e}),function(){if((Oe&2)!==0)throw Error(o(440));return t.impl.apply(void 0,arguments)}}function Nm(e,t){return Fs(4,2,e,t)}function Mm(e,t){return Fs(4,4,e,t)}function km(e,t){if(typeof t=="function"){e=e();var r=t(e);return function(){typeof r=="function"?r():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Rm(e,t,r){r=r!=null?r.concat([e]):null,Fs(4,4,km.bind(null,t,e),r)}function Nc(){}function Om(e,t){var r=We();t=t===void 0?null:t;var i=r.memoizedState;return t!==null&&vc(t,i[1])?i[0]:(r.memoizedState=[e,t],e)}function zm(e,t){var r=We();t=t===void 0?null:t;var i=r.memoizedState;if(t!==null&&vc(t,i[1]))return i[0];if(i=e(),Or){qn(!0);try{e()}finally{qn(!1)}}return r.memoizedState=[i,t],i}function Mc(e,t,r){return r===void 0||(Cn&1073741824)!==0&&(Ae&261930)===0?e.memoizedState=t:(e.memoizedState=r,e=_p(),we.lanes|=e,tr|=e,r)}function _m(e,t,r,i){return Rt(r,t)?r:ha.current!==null?(e=Mc(e,r,i),Rt(e,t)||(tt=!0),e):(Cn&42)===0||(Cn&1073741824)!==0&&(Ae&261930)===0?(tt=!0,e.memoizedState=r):(e=_p(),we.lanes|=e,tr|=e,t)}function Vm(e,t,r,i,l){var d=ae.p;ae.p=d!==0&&8>d?d:8;var y=U.T,w={};U.T=w,Oc(e,!1,t,r);try{var D=l(),q=U.S;if(q!==null&&q(w,D),D!==null&&typeof D=="object"&&typeof D.then=="function"){var K=nS(D,i);vi(e,t,K,Lt(e))}else vi(e,t,i,Lt(e))}catch(W){vi(e,t,{then:function(){},status:"rejected",reason:W},Lt())}finally{ae.p=d,y!==null&&w.types!==null&&(y.types=w.types),U.T=y}}function lS(){}function kc(e,t,r,i){if(e.tag!==5)throw Error(o(476));var l=Bm(e).queue;Vm(e,l,t,se,r===null?lS:function(){return Lm(e),r(i)})}function Bm(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:se,baseState:se,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:An,lastRenderedState:se},next:null};var r={};return t.next={memoizedState:r,baseState:r,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:An,lastRenderedState:r},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Lm(e){var t=Bm(e);t.next===null&&(t=e.alternate.memoizedState),vi(e,t.next.queue,{},Lt())}function Rc(){return dt(_i)}function Um(){return We().memoizedState}function Hm(){return We().memoizedState}function cS(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var r=Lt();e=Zn(r);var i=Qn(t,e,r);i!==null&&(Dt(i,t,r),hi(i,t,r)),t={cache:oc()},e.payload=t;return}t=t.return}}function uS(e,t,r){var i=Lt();r={lane:i,revertLane:0,gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},Ks(e)?Ym(t,r):(r=Ql(e,t,r,i),r!==null&&(Dt(r,e,i),Gm(r,t,i)))}function qm(e,t,r){var i=Lt();vi(e,t,r,i)}function vi(e,t,r,i){var l={lane:i,revertLane:0,gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null};if(Ks(e))Ym(t,l);else{var d=e.alternate;if(e.lanes===0&&(d===null||d.lanes===0)&&(d=t.lastRenderedReducer,d!==null))try{var y=t.lastRenderedState,w=d(y,r);if(l.hasEagerState=!0,l.eagerState=w,Rt(w,y))return Ds(e,t,l,0),He===null&&As(),!1}catch{}finally{}if(r=Ql(e,t,l,i),r!==null)return Dt(r,e,i),Gm(r,t,i),!0}return!1}function Oc(e,t,r,i){if(i={lane:2,revertLane:du(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},Ks(e)){if(t)throw Error(o(479))}else t=Ql(e,r,i,2),t!==null&&Dt(t,e,2)}function Ks(e){var t=e.alternate;return e===we||t!==null&&t===we}function Ym(e,t){ma=qs=!0;var r=e.pending;r===null?t.next=t:(t.next=r.next,r.next=t),e.pending=t}function Gm(e,t,r){if((r&4194048)!==0){var i=t.lanes;i&=e.pendingLanes,r|=i,t.lanes=r,Kf(e,r)}}var xi={readContext:dt,use:Ps,useCallback:Fe,useContext:Fe,useEffect:Fe,useImperativeHandle:Fe,useLayoutEffect:Fe,useInsertionEffect:Fe,useMemo:Fe,useReducer:Fe,useRef:Fe,useState:Fe,useDebugValue:Fe,useDeferredValue:Fe,useTransition:Fe,useSyncExternalStore:Fe,useId:Fe,useHostTransitionStatus:Fe,useFormState:Fe,useActionState:Fe,useOptimistic:Fe,useMemoCache:Fe,useCacheRefresh:Fe};xi.useEffectEvent=Fe;var Pm={readContext:dt,use:Ps,useCallback:function(e,t){return vt().memoizedState=[e,t===void 0?null:t],e},useContext:dt,useEffect:Am,useImperativeHandle:function(e,t,r){r=r!=null?r.concat([e]):null,$s(4194308,4,km.bind(null,t,e),r)},useLayoutEffect:function(e,t){return $s(4194308,4,e,t)},useInsertionEffect:function(e,t){$s(4,2,e,t)},useMemo:function(e,t){var r=vt();t=t===void 0?null:t;var i=e();if(Or){qn(!0);try{e()}finally{qn(!1)}}return r.memoizedState=[i,t],i},useReducer:function(e,t,r){var i=vt();if(r!==void 0){var l=r(t);if(Or){qn(!0);try{r(t)}finally{qn(!1)}}}else l=t;return i.memoizedState=i.baseState=l,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:l},i.queue=e,e=e.dispatch=uS.bind(null,we,e),[i.memoizedState,e]},useRef:function(e){var t=vt();return e={current:e},t.memoizedState=e},useState:function(e){e=Cc(e);var t=e.queue,r=qm.bind(null,we,t);return t.dispatch=r,[e.memoizedState,r]},useDebugValue:Nc,useDeferredValue:function(e,t){var r=vt();return Mc(r,e,t)},useTransition:function(){var e=Cc(!1);return e=Vm.bind(null,we,e.queue,!0,!1),vt().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,r){var i=we,l=vt();if(Ne){if(r===void 0)throw Error(o(407));r=r()}else{if(r=t(),He===null)throw Error(o(349));(Ae&127)!==0||dm(i,t,r)}l.memoizedState=r;var d={value:r,getSnapshot:t};return l.queue=d,Am(hm.bind(null,i,d,e),[e]),i.flags|=2048,ga(9,{destroy:void 0},fm.bind(null,i,d,r,t),null),r},useId:function(){var e=vt(),t=He.identifierPrefix;if(Ne){var r=un,i=cn;r=(i&~(1<<32-kt(i)-1)).toString(32)+r,t="_"+t+"R_"+r,r=Ys++,0<r&&(t+="H"+r.toString(32)),t+="_"}else r=rS++,t="_"+t+"r_"+r.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:Rc,useFormState:wm,useActionState:wm,useOptimistic:function(e){var t=vt();t.memoizedState=t.baseState=e;var r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=r,t=Oc.bind(null,we,!0,r),r.dispatch=t,[e,t]},useMemoCache:jc,useCacheRefresh:function(){return vt().memoizedState=cS.bind(null,we)},useEffectEvent:function(e){var t=vt(),r={impl:e};return t.memoizedState=r,function(){if((Oe&2)!==0)throw Error(o(440));return r.impl.apply(void 0,arguments)}}},zc={readContext:dt,use:Ps,useCallback:Om,useContext:dt,useEffect:Dc,useImperativeHandle:Rm,useInsertionEffect:Nm,useLayoutEffect:Mm,useMemo:zm,useReducer:Xs,useRef:Cm,useState:function(){return Xs(An)},useDebugValue:Nc,useDeferredValue:function(e,t){var r=We();return _m(r,Be.memoizedState,e,t)},useTransition:function(){var e=Xs(An)[0],t=We().memoizedState;return[typeof e=="boolean"?e:yi(e),t]},useSyncExternalStore:um,useId:Um,useHostTransitionStatus:Rc,useFormState:jm,useActionState:jm,useOptimistic:function(e,t){var r=We();return gm(r,Be,e,t)},useMemoCache:jc,useCacheRefresh:Hm};zc.useEffectEvent=Dm;var Xm={readContext:dt,use:Ps,useCallback:Om,useContext:dt,useEffect:Dc,useImperativeHandle:Rm,useInsertionEffect:Nm,useLayoutEffect:Mm,useMemo:zm,useReducer:Tc,useRef:Cm,useState:function(){return Tc(An)},useDebugValue:Nc,useDeferredValue:function(e,t){var r=We();return Be===null?Mc(r,e,t):_m(r,Be.memoizedState,e,t)},useTransition:function(){var e=Tc(An)[0],t=We().memoizedState;return[typeof e=="boolean"?e:yi(e),t]},useSyncExternalStore:um,useId:Um,useHostTransitionStatus:Rc,useFormState:Tm,useActionState:Tm,useOptimistic:function(e,t){var r=We();return Be!==null?gm(r,Be,e,t):(r.baseState=e,[e,r.queue.dispatch])},useMemoCache:jc,useCacheRefresh:Hm};Xm.useEffectEvent=Dm;function _c(e,t,r,i){t=e.memoizedState,r=r(i,t),r=r==null?t:x({},t,r),e.memoizedState=r,e.lanes===0&&(e.updateQueue.baseState=r)}var Vc={enqueueSetState:function(e,t,r){e=e._reactInternals;var i=Lt(),l=Zn(i);l.payload=t,r!=null&&(l.callback=r),t=Qn(e,l,i),t!==null&&(Dt(t,e,i),hi(t,e,i))},enqueueReplaceState:function(e,t,r){e=e._reactInternals;var i=Lt(),l=Zn(i);l.tag=1,l.payload=t,r!=null&&(l.callback=r),t=Qn(e,l,i),t!==null&&(Dt(t,e,i),hi(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var r=Lt(),i=Zn(r);i.tag=2,t!=null&&(i.callback=t),t=Qn(e,i,r),t!==null&&(Dt(t,e,r),hi(t,e,r))}};function $m(e,t,r,i,l,d,y){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,d,y):t.prototype&&t.prototype.isPureReactComponent?!ii(r,i)||!ii(l,d):!0}function Fm(e,t,r,i){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(r,i),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(r,i),t.state!==e&&Vc.enqueueReplaceState(t,t.state,null)}function zr(e,t){var r=t;if("ref"in t){r={};for(var i in t)i!=="ref"&&(r[i]=t[i])}if(e=e.defaultProps){r===t&&(r=x({},r));for(var l in e)r[l]===void 0&&(r[l]=e[l])}return r}function Km(e){Cs(e)}function Zm(e){console.error(e)}function Qm(e){Cs(e)}function Zs(e,t){try{var r=e.onUncaughtError;r(t.value,{componentStack:t.stack})}catch(i){setTimeout(function(){throw i})}}function Jm(e,t,r){try{var i=e.onCaughtError;i(r.value,{componentStack:r.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(l){setTimeout(function(){throw l})}}function Bc(e,t,r){return r=Zn(r),r.tag=3,r.payload={element:null},r.callback=function(){Zs(e,t)},r}function Wm(e){return e=Zn(e),e.tag=3,e}function Im(e,t,r,i){var l=r.type.getDerivedStateFromError;if(typeof l=="function"){var d=i.value;e.payload=function(){return l(d)},e.callback=function(){Jm(t,r,i)}}var y=r.stateNode;y!==null&&typeof y.componentDidCatch=="function"&&(e.callback=function(){Jm(t,r,i),typeof l!="function"&&(nr===null?nr=new Set([this]):nr.add(this));var w=i.stack;this.componentDidCatch(i.value,{componentStack:w!==null?w:""})})}function dS(e,t,r,i,l){if(r.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(t=r.alternate,t!==null&&la(t,r,l,!0),r=zt.current,r!==null){switch(r.tag){case 31:case 13:return Kt===null?oo():r.alternate===null&&Ke===0&&(Ke=3),r.flags&=-257,r.flags|=65536,r.lanes=l,i===Vs?r.flags|=16384:(t=r.updateQueue,t===null?r.updateQueue=new Set([i]):t.add(i),lu(e,i,l)),!1;case 22:return r.flags|=65536,i===Vs?r.flags|=16384:(t=r.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([i])},r.updateQueue=t):(r=t.retryQueue,r===null?t.retryQueue=new Set([i]):r.add(i)),lu(e,i,l)),!1}throw Error(o(435,r.tag))}return lu(e,i,l),oo(),!1}if(Ne)return t=zt.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=l,i!==nc&&(e=Error(o(422),{cause:i}),li(Pt(e,r)))):(i!==nc&&(t=Error(o(423),{cause:i}),li(Pt(t,r))),e=e.current.alternate,e.flags|=65536,l&=-l,e.lanes|=l,i=Pt(i,r),l=Bc(e.stateNode,i,l),hc(e,l),Ke!==4&&(Ke=2)),!1;var d=Error(o(520),{cause:i});if(d=Pt(d,r),Ai===null?Ai=[d]:Ai.push(d),Ke!==4&&(Ke=2),t===null)return!0;i=Pt(i,r),r=t;do{switch(r.tag){case 3:return r.flags|=65536,e=l&-l,r.lanes|=e,e=Bc(r.stateNode,i,e),hc(r,e),!1;case 1:if(t=r.type,d=r.stateNode,(r.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||d!==null&&typeof d.componentDidCatch=="function"&&(nr===null||!nr.has(d))))return r.flags|=65536,l&=-l,r.lanes|=l,l=Wm(l),Im(l,e,r,i),hc(r,l),!1}r=r.return}while(r!==null);return!1}var Lc=Error(o(461)),tt=!1;function ft(e,t,r,i){t.child=e===null?rm(t,null,r,i):Rr(t,e.child,r,i)}function ep(e,t,r,i,l){r=r.render;var d=t.ref;if("ref"in i){var y={};for(var w in i)w!=="ref"&&(y[w]=i[w])}else y=i;return Dr(t),i=xc(e,t,r,y,d,l),w=bc(),e!==null&&!tt?(Sc(e,t,l),Dn(e,t,l)):(Ne&&w&&ec(t),t.flags|=1,ft(e,t,i,l),t.child)}function tp(e,t,r,i,l){if(e===null){var d=r.type;return typeof d=="function"&&!Jl(d)&&d.defaultProps===void 0&&r.compare===null?(t.tag=15,t.type=d,np(e,t,d,i,l)):(e=Ms(r.type,null,i,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(d=e.child,!$c(e,l)){var y=d.memoizedProps;if(r=r.compare,r=r!==null?r:ii,r(y,i)&&e.ref===t.ref)return Dn(e,t,l)}return t.flags|=1,e=wn(d,i),e.ref=t.ref,e.return=t,t.child=e}function np(e,t,r,i,l){if(e!==null){var d=e.memoizedProps;if(ii(d,i)&&e.ref===t.ref)if(tt=!1,t.pendingProps=i=d,$c(e,l))(e.flags&131072)!==0&&(tt=!0);else return t.lanes=e.lanes,Dn(e,t,l)}return Uc(e,t,r,i,l)}function rp(e,t,r,i){var l=i.children,d=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if((t.flags&128)!==0){if(d=d!==null?d.baseLanes|r:r,e!==null){for(i=t.child=e.child,l=0;i!==null;)l=l|i.lanes|i.childLanes,i=i.sibling;i=l&~d}else i=0,t.child=null;return ap(e,t,d,r,i)}if((r&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&zs(t,d!==null?d.cachePool:null),d!==null?sm(t,d):pc(),om(t);else return i=t.lanes=536870912,ap(e,t,d!==null?d.baseLanes|r:r,r,i)}else d!==null?(zs(t,d.cachePool),sm(t,d),Wn(),t.memoizedState=null):(e!==null&&zs(t,null),pc(),Wn());return ft(e,t,l,r),t.child}function bi(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function ap(e,t,r,i,l){var d=cc();return d=d===null?null:{parent:Ie._currentValue,pool:d},t.memoizedState={baseLanes:r,cachePool:d},e!==null&&zs(t,null),pc(),om(t),e!==null&&la(e,t,i,!0),t.childLanes=l,null}function Qs(e,t){return t=Ws({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function ip(e,t,r){return Rr(t,e.child,null,r),e=Qs(t,t.pendingProps),e.flags|=2,_t(t),t.memoizedState=null,e}function fS(e,t,r){var i=t.pendingProps,l=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(Ne){if(i.mode==="hidden")return e=Qs(t,i),t.lanes=536870912,bi(null,e);if(yc(t),(e=Ge)?(e=yg(e,Ft),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Pn!==null?{id:cn,overflow:un}:null,retryLane:536870912,hydrationErrors:null},r=Yh(e),r.return=t,t.child=r,ut=t,Ge=null)):e=null,e===null)throw $n(t);return t.lanes=536870912,null}return Qs(t,i)}var d=e.memoizedState;if(d!==null){var y=d.dehydrated;if(yc(t),l)if(t.flags&256)t.flags&=-257,t=ip(e,t,r);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(o(558));else if(tt||la(e,t,r,!1),l=(r&e.childLanes)!==0,tt||l){if(i=He,i!==null&&(y=Zf(i,r),y!==0&&y!==d.retryLane))throw d.retryLane=y,Er(e,y),Dt(i,e,y),Lc;oo(),t=ip(e,t,r)}else e=d.treeContext,Ge=Zt(y.nextSibling),ut=t,Ne=!0,Xn=null,Ft=!1,e!==null&&Xh(t,e),t=Qs(t,i),t.flags|=4096;return t}return e=wn(e.child,{mode:i.mode,children:i.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Js(e,t){var r=t.ref;if(r===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof r!="function"&&typeof r!="object")throw Error(o(284));(e===null||e.ref!==r)&&(t.flags|=4194816)}}function Uc(e,t,r,i,l){return Dr(t),r=xc(e,t,r,i,void 0,l),i=bc(),e!==null&&!tt?(Sc(e,t,l),Dn(e,t,l)):(Ne&&i&&ec(t),t.flags|=1,ft(e,t,r,l),t.child)}function sp(e,t,r,i,l,d){return Dr(t),t.updateQueue=null,r=cm(t,i,r,l),lm(e),i=bc(),e!==null&&!tt?(Sc(e,t,d),Dn(e,t,d)):(Ne&&i&&ec(t),t.flags|=1,ft(e,t,r,d),t.child)}function op(e,t,r,i,l){if(Dr(t),t.stateNode===null){var d=aa,y=r.contextType;typeof y=="object"&&y!==null&&(d=dt(y)),d=new r(i,d),t.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,d.updater=Vc,t.stateNode=d,d._reactInternals=t,d=t.stateNode,d.props=i,d.state=t.memoizedState,d.refs={},dc(t),y=r.contextType,d.context=typeof y=="object"&&y!==null?dt(y):aa,d.state=t.memoizedState,y=r.getDerivedStateFromProps,typeof y=="function"&&(_c(t,r,y,i),d.state=t.memoizedState),typeof r.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(y=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),y!==d.state&&Vc.enqueueReplaceState(d,d.state,null),pi(t,i,d,l),mi(),d.state=t.memoizedState),typeof d.componentDidMount=="function"&&(t.flags|=4194308),i=!0}else if(e===null){d=t.stateNode;var w=t.memoizedProps,D=zr(r,w);d.props=D;var q=d.context,K=r.contextType;y=aa,typeof K=="object"&&K!==null&&(y=dt(K));var W=r.getDerivedStateFromProps;K=typeof W=="function"||typeof d.getSnapshotBeforeUpdate=="function",w=t.pendingProps!==w,K||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(w||q!==y)&&Fm(t,d,i,y),Kn=!1;var Y=t.memoizedState;d.state=Y,pi(t,i,d,l),mi(),q=t.memoizedState,w||Y!==q||Kn?(typeof W=="function"&&(_c(t,r,W,i),q=t.memoizedState),(D=Kn||$m(t,r,D,i,Y,q,y))?(K||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount()),typeof d.componentDidMount=="function"&&(t.flags|=4194308)):(typeof d.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=i,t.memoizedState=q),d.props=i,d.state=q,d.context=y,i=D):(typeof d.componentDidMount=="function"&&(t.flags|=4194308),i=!1)}else{d=t.stateNode,fc(e,t),y=t.memoizedProps,K=zr(r,y),d.props=K,W=t.pendingProps,Y=d.context,q=r.contextType,D=aa,typeof q=="object"&&q!==null&&(D=dt(q)),w=r.getDerivedStateFromProps,(q=typeof w=="function"||typeof d.getSnapshotBeforeUpdate=="function")||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(y!==W||Y!==D)&&Fm(t,d,i,D),Kn=!1,Y=t.memoizedState,d.state=Y,pi(t,i,d,l),mi();var X=t.memoizedState;y!==W||Y!==X||Kn||e!==null&&e.dependencies!==null&&Rs(e.dependencies)?(typeof w=="function"&&(_c(t,r,w,i),X=t.memoizedState),(K=Kn||$m(t,r,K,i,Y,X,D)||e!==null&&e.dependencies!==null&&Rs(e.dependencies))?(q||typeof d.UNSAFE_componentWillUpdate!="function"&&typeof d.componentWillUpdate!="function"||(typeof d.componentWillUpdate=="function"&&d.componentWillUpdate(i,X,D),typeof d.UNSAFE_componentWillUpdate=="function"&&d.UNSAFE_componentWillUpdate(i,X,D)),typeof d.componentDidUpdate=="function"&&(t.flags|=4),typeof d.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof d.componentDidUpdate!="function"||y===e.memoizedProps&&Y===e.memoizedState||(t.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&Y===e.memoizedState||(t.flags|=1024),t.memoizedProps=i,t.memoizedState=X),d.props=i,d.state=X,d.context=D,i=K):(typeof d.componentDidUpdate!="function"||y===e.memoizedProps&&Y===e.memoizedState||(t.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&Y===e.memoizedState||(t.flags|=1024),i=!1)}return d=i,Js(e,t),i=(t.flags&128)!==0,d||i?(d=t.stateNode,r=i&&typeof r.getDerivedStateFromError!="function"?null:d.render(),t.flags|=1,e!==null&&i?(t.child=Rr(t,e.child,null,l),t.child=Rr(t,null,r,l)):ft(e,t,r,l),t.memoizedState=d.state,e=t.child):e=Dn(e,t,l),e}function lp(e,t,r,i){return Cr(),t.flags|=256,ft(e,t,r,i),t.child}var Hc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function qc(e){return{baseLanes:e,cachePool:Jh()}}function Yc(e,t,r){return e=e!==null?e.childLanes&~r:0,t&&(e|=Bt),e}function cp(e,t,r){var i=t.pendingProps,l=!1,d=(t.flags&128)!==0,y;if((y=d)||(y=e!==null&&e.memoizedState===null?!1:(Je.current&2)!==0),y&&(l=!0,t.flags&=-129),y=(t.flags&32)!==0,t.flags&=-33,e===null){if(Ne){if(l?Jn(t):Wn(),(e=Ge)?(e=yg(e,Ft),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Pn!==null?{id:cn,overflow:un}:null,retryLane:536870912,hydrationErrors:null},r=Yh(e),r.return=t,t.child=r,ut=t,Ge=null)):e=null,e===null)throw $n(t);return Eu(e)?t.lanes=32:t.lanes=536870912,null}var w=i.children;return i=i.fallback,l?(Wn(),l=t.mode,w=Ws({mode:"hidden",children:w},l),i=Tr(i,l,r,null),w.return=t,i.return=t,w.sibling=i,t.child=w,i=t.child,i.memoizedState=qc(r),i.childLanes=Yc(e,y,r),t.memoizedState=Hc,bi(null,i)):(Jn(t),Gc(t,w))}var D=e.memoizedState;if(D!==null&&(w=D.dehydrated,w!==null)){if(d)t.flags&256?(Jn(t),t.flags&=-257,t=Pc(e,t,r)):t.memoizedState!==null?(Wn(),t.child=e.child,t.flags|=128,t=null):(Wn(),w=i.fallback,l=t.mode,i=Ws({mode:"visible",children:i.children},l),w=Tr(w,l,r,null),w.flags|=2,i.return=t,w.return=t,i.sibling=w,t.child=i,Rr(t,e.child,null,r),i=t.child,i.memoizedState=qc(r),i.childLanes=Yc(e,y,r),t.memoizedState=Hc,t=bi(null,i));else if(Jn(t),Eu(w)){if(y=w.nextSibling&&w.nextSibling.dataset,y)var q=y.dgst;y=q,i=Error(o(419)),i.stack="",i.digest=y,li({value:i,source:null,stack:null}),t=Pc(e,t,r)}else if(tt||la(e,t,r,!1),y=(r&e.childLanes)!==0,tt||y){if(y=He,y!==null&&(i=Zf(y,r),i!==0&&i!==D.retryLane))throw D.retryLane=i,Er(e,i),Dt(y,e,i),Lc;ju(w)||oo(),t=Pc(e,t,r)}else ju(w)?(t.flags|=192,t.child=e.child,t=null):(e=D.treeContext,Ge=Zt(w.nextSibling),ut=t,Ne=!0,Xn=null,Ft=!1,e!==null&&Xh(t,e),t=Gc(t,i.children),t.flags|=4096);return t}return l?(Wn(),w=i.fallback,l=t.mode,D=e.child,q=D.sibling,i=wn(D,{mode:"hidden",children:i.children}),i.subtreeFlags=D.subtreeFlags&65011712,q!==null?w=wn(q,w):(w=Tr(w,l,r,null),w.flags|=2),w.return=t,i.return=t,i.sibling=w,t.child=i,bi(null,i),i=t.child,w=e.child.memoizedState,w===null?w=qc(r):(l=w.cachePool,l!==null?(D=Ie._currentValue,l=l.parent!==D?{parent:D,pool:D}:l):l=Jh(),w={baseLanes:w.baseLanes|r,cachePool:l}),i.memoizedState=w,i.childLanes=Yc(e,y,r),t.memoizedState=Hc,bi(e.child,i)):(Jn(t),r=e.child,e=r.sibling,r=wn(r,{mode:"visible",children:i.children}),r.return=t,r.sibling=null,e!==null&&(y=t.deletions,y===null?(t.deletions=[e],t.flags|=16):y.push(e)),t.child=r,t.memoizedState=null,r)}function Gc(e,t){return t=Ws({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function Ws(e,t){return e=Ot(22,e,null,t),e.lanes=0,e}function Pc(e,t,r){return Rr(t,e.child,null,r),e=Gc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function up(e,t,r){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t),ic(e.return,t,r)}function Xc(e,t,r,i,l,d){var y=e.memoizedState;y===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:i,tail:r,tailMode:l,treeForkCount:d}:(y.isBackwards=t,y.rendering=null,y.renderingStartTime=0,y.last=i,y.tail=r,y.tailMode=l,y.treeForkCount=d)}function dp(e,t,r){var i=t.pendingProps,l=i.revealOrder,d=i.tail;i=i.children;var y=Je.current,w=(y&2)!==0;if(w?(y=y&1|2,t.flags|=128):y&=1,J(Je,y),ft(e,t,i,r),i=Ne?oi:0,!w&&e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&up(e,r,t);else if(e.tag===19)up(e,r,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(l){case"forwards":for(r=t.child,l=null;r!==null;)e=r.alternate,e!==null&&Hs(e)===null&&(l=r),r=r.sibling;r=l,r===null?(l=t.child,t.child=null):(l=r.sibling,r.sibling=null),Xc(t,!1,l,r,d,i);break;case"backwards":case"unstable_legacy-backwards":for(r=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&Hs(e)===null){t.child=l;break}e=l.sibling,l.sibling=r,r=l,l=e}Xc(t,!0,r,null,d,i);break;case"together":Xc(t,!1,null,null,void 0,i);break;default:t.memoizedState=null}return t.child}function Dn(e,t,r){if(e!==null&&(t.dependencies=e.dependencies),tr|=t.lanes,(r&t.childLanes)===0)if(e!==null){if(la(e,t,r,!1),(r&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(o(153));if(t.child!==null){for(e=t.child,r=wn(e,e.pendingProps),t.child=r,r.return=t;e.sibling!==null;)e=e.sibling,r=r.sibling=wn(e,e.pendingProps),r.return=t;r.sibling=null}return t.child}function $c(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&Rs(e)))}function hS(e,t,r){switch(t.tag){case 3:re(t,t.stateNode.containerInfo),Fn(t,Ie,e.memoizedState.cache),Cr();break;case 27:case 5:fe(t);break;case 4:re(t,t.stateNode.containerInfo);break;case 10:Fn(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,yc(t),null;break;case 13:var i=t.memoizedState;if(i!==null)return i.dehydrated!==null?(Jn(t),t.flags|=128,null):(r&t.child.childLanes)!==0?cp(e,t,r):(Jn(t),e=Dn(e,t,r),e!==null?e.sibling:null);Jn(t);break;case 19:var l=(e.flags&128)!==0;if(i=(r&t.childLanes)!==0,i||(la(e,t,r,!1),i=(r&t.childLanes)!==0),l){if(i)return dp(e,t,r);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),J(Je,Je.current),i)break;return null;case 22:return t.lanes=0,rp(e,t,r,t.pendingProps);case 24:Fn(t,Ie,e.memoizedState.cache)}return Dn(e,t,r)}function fp(e,t,r){if(e!==null)if(e.memoizedProps!==t.pendingProps)tt=!0;else{if(!$c(e,r)&&(t.flags&128)===0)return tt=!1,hS(e,t,r);tt=(e.flags&131072)!==0}else tt=!1,Ne&&(t.flags&1048576)!==0&&Ph(t,oi,t.index);switch(t.lanes=0,t.tag){case 16:e:{var i=t.pendingProps;if(e=Mr(t.elementType),t.type=e,typeof e=="function")Jl(e)?(i=zr(e,i),t.tag=1,t=op(null,t,e,i,r)):(t.tag=0,t=Uc(null,t,e,i,r));else{if(e!=null){var l=e.$$typeof;if(l===V){t.tag=11,t=ep(null,t,e,i,r);break e}else if(l===k){t.tag=14,t=tp(null,t,e,i,r);break e}}throw t=ce(e)||e,Error(o(306,t,""))}}return t;case 0:return Uc(e,t,t.type,t.pendingProps,r);case 1:return i=t.type,l=zr(i,t.pendingProps),op(e,t,i,l,r);case 3:e:{if(re(t,t.stateNode.containerInfo),e===null)throw Error(o(387));i=t.pendingProps;var d=t.memoizedState;l=d.element,fc(e,t),pi(t,i,null,r);var y=t.memoizedState;if(i=y.cache,Fn(t,Ie,i),i!==d.cache&&sc(t,[Ie],r,!0),mi(),i=y.element,d.isDehydrated)if(d={element:i,isDehydrated:!1,cache:y.cache},t.updateQueue.baseState=d,t.memoizedState=d,t.flags&256){t=lp(e,t,i,r);break e}else if(i!==l){l=Pt(Error(o(424)),t),li(l),t=lp(e,t,i,r);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Ge=Zt(e.firstChild),ut=t,Ne=!0,Xn=null,Ft=!0,r=rm(t,null,i,r),t.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling}else{if(Cr(),i===l){t=Dn(e,t,r);break e}ft(e,t,i,r)}t=t.child}return t;case 26:return Js(e,t),e===null?(r=jg(t.type,null,t.pendingProps,null))?t.memoizedState=r:Ne||(r=t.type,e=t.pendingProps,i=po(de.current).createElement(r),i[ct]=t,i[wt]=e,ht(i,r,e),st(i),t.stateNode=i):t.memoizedState=jg(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return fe(t),e===null&&Ne&&(i=t.stateNode=bg(t.type,t.pendingProps,de.current),ut=t,Ft=!0,l=Ge,sr(t.type)?(Tu=l,Ge=Zt(i.firstChild)):Ge=l),ft(e,t,t.pendingProps.children,r),Js(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&Ne&&((l=i=Ge)&&(i=GS(i,t.type,t.pendingProps,Ft),i!==null?(t.stateNode=i,ut=t,Ge=Zt(i.firstChild),Ft=!1,l=!0):l=!1),l||$n(t)),fe(t),l=t.type,d=t.pendingProps,y=e!==null?e.memoizedProps:null,i=d.children,bu(l,d)?i=null:y!==null&&bu(l,y)&&(t.flags|=32),t.memoizedState!==null&&(l=xc(e,t,aS,null,null,r),_i._currentValue=l),Js(e,t),ft(e,t,i,r),t.child;case 6:return e===null&&Ne&&((e=r=Ge)&&(r=PS(r,t.pendingProps,Ft),r!==null?(t.stateNode=r,ut=t,Ge=null,e=!0):e=!1),e||$n(t)),null;case 13:return cp(e,t,r);case 4:return re(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=Rr(t,null,i,r):ft(e,t,i,r),t.child;case 11:return ep(e,t,t.type,t.pendingProps,r);case 7:return ft(e,t,t.pendingProps,r),t.child;case 8:return ft(e,t,t.pendingProps.children,r),t.child;case 12:return ft(e,t,t.pendingProps.children,r),t.child;case 10:return i=t.pendingProps,Fn(t,t.type,i.value),ft(e,t,i.children,r),t.child;case 9:return l=t.type._context,i=t.pendingProps.children,Dr(t),l=dt(l),i=i(l),t.flags|=1,ft(e,t,i,r),t.child;case 14:return tp(e,t,t.type,t.pendingProps,r);case 15:return np(e,t,t.type,t.pendingProps,r);case 19:return dp(e,t,r);case 31:return fS(e,t,r);case 22:return rp(e,t,r,t.pendingProps);case 24:return Dr(t),i=dt(Ie),e===null?(l=cc(),l===null&&(l=He,d=oc(),l.pooledCache=d,d.refCount++,d!==null&&(l.pooledCacheLanes|=r),l=d),t.memoizedState={parent:i,cache:l},dc(t),Fn(t,Ie,l)):((e.lanes&r)!==0&&(fc(e,t),pi(t,null,null,r),mi()),l=e.memoizedState,d=t.memoizedState,l.parent!==i?(l={parent:i,cache:i},t.memoizedState=l,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=l),Fn(t,Ie,i)):(i=d.cache,Fn(t,Ie,i),i!==l.cache&&sc(t,[Ie],r,!0))),ft(e,t,t.pendingProps.children,r),t.child;case 29:throw t.pendingProps}throw Error(o(156,t.tag))}function Nn(e){e.flags|=4}function Fc(e,t,r,i,l){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(l&335544128)===l)if(e.stateNode.complete)e.flags|=8192;else if(Up())e.flags|=8192;else throw kr=Vs,uc}else e.flags&=-16777217}function hp(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Dg(t))if(Up())e.flags|=8192;else throw kr=Vs,uc}function Is(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?$f():536870912,e.lanes|=t,ba|=t)}function Si(e,t){if(!Ne)switch(e.tailMode){case"hidden":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var i=null;r!==null;)r.alternate!==null&&(i=r),r=r.sibling;i===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null}}function Pe(e){var t=e.alternate!==null&&e.alternate.child===e.child,r=0,i=0;if(t)for(var l=e.child;l!==null;)r|=l.lanes|l.childLanes,i|=l.subtreeFlags&65011712,i|=l.flags&65011712,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)r|=l.lanes|l.childLanes,i|=l.subtreeFlags,i|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=i,e.childLanes=r,t}function mS(e,t,r){var i=t.pendingProps;switch(tc(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Pe(t),null;case 1:return Pe(t),null;case 3:return r=t.stateNode,i=null,e!==null&&(i=e.memoizedState.cache),t.memoizedState.cache!==i&&(t.flags|=2048),Tn(Ie),Q(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(oa(t)?Nn(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,rc())),Pe(t),null;case 26:var l=t.type,d=t.memoizedState;return e===null?(Nn(t),d!==null?(Pe(t),hp(t,d)):(Pe(t),Fc(t,l,null,i,r))):d?d!==e.memoizedState?(Nn(t),Pe(t),hp(t,d)):(Pe(t),t.flags&=-16777217):(e=e.memoizedProps,e!==i&&Nn(t),Pe(t),Fc(t,l,e,i,r)),null;case 27:if(I(t),r=de.current,l=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&Nn(t);else{if(!i){if(t.stateNode===null)throw Error(o(166));return Pe(t),null}e=te.current,oa(t)?$h(t):(e=bg(l,i,r),t.stateNode=e,Nn(t))}return Pe(t),null;case 5:if(I(t),l=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&Nn(t);else{if(!i){if(t.stateNode===null)throw Error(o(166));return Pe(t),null}if(d=te.current,oa(t))$h(t);else{var y=po(de.current);switch(d){case 1:d=y.createElementNS("http://www.w3.org/2000/svg",l);break;case 2:d=y.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;default:switch(l){case"svg":d=y.createElementNS("http://www.w3.org/2000/svg",l);break;case"math":d=y.createElementNS("http://www.w3.org/1998/Math/MathML",l);break;case"script":d=y.createElement("div"),d.innerHTML="<script><\/script>",d=d.removeChild(d.firstChild);break;case"select":d=typeof i.is=="string"?y.createElement("select",{is:i.is}):y.createElement("select"),i.multiple?d.multiple=!0:i.size&&(d.size=i.size);break;default:d=typeof i.is=="string"?y.createElement(l,{is:i.is}):y.createElement(l)}}d[ct]=t,d[wt]=i;e:for(y=t.child;y!==null;){if(y.tag===5||y.tag===6)d.appendChild(y.stateNode);else if(y.tag!==4&&y.tag!==27&&y.child!==null){y.child.return=y,y=y.child;continue}if(y===t)break e;for(;y.sibling===null;){if(y.return===null||y.return===t)break e;y=y.return}y.sibling.return=y.return,y=y.sibling}t.stateNode=d;e:switch(ht(d,l,i),l){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}i&&Nn(t)}}return Pe(t),Fc(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,r),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==i&&Nn(t);else{if(typeof i!="string"&&t.stateNode===null)throw Error(o(166));if(e=de.current,oa(t)){if(e=t.stateNode,r=t.memoizedProps,i=null,l=ut,l!==null)switch(l.tag){case 27:case 5:i=l.memoizedProps}e[ct]=t,e=!!(e.nodeValue===r||i!==null&&i.suppressHydrationWarning===!0||cg(e.nodeValue,r)),e||$n(t,!0)}else e=po(e).createTextNode(i),e[ct]=t,t.stateNode=e}return Pe(t),null;case 31:if(r=t.memoizedState,e===null||e.memoizedState!==null){if(i=oa(t),r!==null){if(e===null){if(!i)throw Error(o(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(o(557));e[ct]=t}else Cr(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Pe(t),e=!1}else r=rc(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=r),e=!0;if(!e)return t.flags&256?(_t(t),t):(_t(t),null);if((t.flags&128)!==0)throw Error(o(558))}return Pe(t),null;case 13:if(i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(l=oa(t),i!==null&&i.dehydrated!==null){if(e===null){if(!l)throw Error(o(318));if(l=t.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(o(317));l[ct]=t}else Cr(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Pe(t),l=!1}else l=rc(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=l),l=!0;if(!l)return t.flags&256?(_t(t),t):(_t(t),null)}return _t(t),(t.flags&128)!==0?(t.lanes=r,t):(r=i!==null,e=e!==null&&e.memoizedState!==null,r&&(i=t.child,l=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(l=i.alternate.memoizedState.cachePool.pool),d=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(d=i.memoizedState.cachePool.pool),d!==l&&(i.flags|=2048)),r!==e&&r&&(t.child.flags|=8192),Is(t,t.updateQueue),Pe(t),null);case 4:return Q(),e===null&&pu(t.stateNode.containerInfo),Pe(t),null;case 10:return Tn(t.type),Pe(t),null;case 19:if(O(Je),i=t.memoizedState,i===null)return Pe(t),null;if(l=(t.flags&128)!==0,d=i.rendering,d===null)if(l)Si(i,!1);else{if(Ke!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(d=Hs(e),d!==null){for(t.flags|=128,Si(i,!1),e=d.updateQueue,t.updateQueue=e,Is(t,e),t.subtreeFlags=0,e=r,r=t.child;r!==null;)qh(r,e),r=r.sibling;return J(Je,Je.current&1|2),Ne&&jn(t,i.treeForkCount),t.child}e=e.sibling}i.tail!==null&&Nt()>ao&&(t.flags|=128,l=!0,Si(i,!1),t.lanes=4194304)}else{if(!l)if(e=Hs(d),e!==null){if(t.flags|=128,l=!0,e=e.updateQueue,t.updateQueue=e,Is(t,e),Si(i,!0),i.tail===null&&i.tailMode==="hidden"&&!d.alternate&&!Ne)return Pe(t),null}else 2*Nt()-i.renderingStartTime>ao&&r!==536870912&&(t.flags|=128,l=!0,Si(i,!1),t.lanes=4194304);i.isBackwards?(d.sibling=t.child,t.child=d):(e=i.last,e!==null?e.sibling=d:t.child=d,i.last=d)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=Nt(),e.sibling=null,r=Je.current,J(Je,l?r&1|2:r&1),Ne&&jn(t,i.treeForkCount),e):(Pe(t),null);case 22:case 23:return _t(t),gc(),i=t.memoizedState!==null,e!==null?e.memoizedState!==null!==i&&(t.flags|=8192):i&&(t.flags|=8192),i?(r&536870912)!==0&&(t.flags&128)===0&&(Pe(t),t.subtreeFlags&6&&(t.flags|=8192)):Pe(t),r=t.updateQueue,r!==null&&Is(t,r.retryQueue),r=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(r=e.memoizedState.cachePool.pool),i=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(i=t.memoizedState.cachePool.pool),i!==r&&(t.flags|=2048),e!==null&&O(Nr),null;case 24:return r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),Tn(Ie),Pe(t),null;case 25:return null;case 30:return null}throw Error(o(156,t.tag))}function pS(e,t){switch(tc(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Tn(Ie),Q(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return I(t),null;case 31:if(t.memoizedState!==null){if(_t(t),t.alternate===null)throw Error(o(340));Cr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(_t(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(o(340));Cr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return O(Je),null;case 4:return Q(),null;case 10:return Tn(t.type),null;case 22:case 23:return _t(t),gc(),e!==null&&O(Nr),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Tn(Ie),null;case 25:return null;default:return null}}function mp(e,t){switch(tc(t),t.tag){case 3:Tn(Ie),Q();break;case 26:case 27:case 5:I(t);break;case 4:Q();break;case 31:t.memoizedState!==null&&_t(t);break;case 13:_t(t);break;case 19:O(Je);break;case 10:Tn(t.type);break;case 22:case 23:_t(t),gc(),e!==null&&O(Nr);break;case 24:Tn(Ie)}}function wi(e,t){try{var r=t.updateQueue,i=r!==null?r.lastEffect:null;if(i!==null){var l=i.next;r=l;do{if((r.tag&e)===e){i=void 0;var d=r.create,y=r.inst;i=d(),y.destroy=i}r=r.next}while(r!==l)}}catch(w){Ve(t,t.return,w)}}function In(e,t,r){try{var i=t.updateQueue,l=i!==null?i.lastEffect:null;if(l!==null){var d=l.next;i=d;do{if((i.tag&e)===e){var y=i.inst,w=y.destroy;if(w!==void 0){y.destroy=void 0,l=t;var D=r,q=w;try{q()}catch(K){Ve(l,D,K)}}}i=i.next}while(i!==d)}}catch(K){Ve(t,t.return,K)}}function pp(e){var t=e.updateQueue;if(t!==null){var r=e.stateNode;try{im(t,r)}catch(i){Ve(e,e.return,i)}}}function gp(e,t,r){r.props=zr(e.type,e.memoizedProps),r.state=e.memoizedState;try{r.componentWillUnmount()}catch(i){Ve(e,t,i)}}function ji(e,t){try{var r=e.ref;if(r!==null){switch(e.tag){case 26:case 27:case 5:var i=e.stateNode;break;case 30:i=e.stateNode;break;default:i=e.stateNode}typeof r=="function"?e.refCleanup=r(i):r.current=i}}catch(l){Ve(e,t,l)}}function dn(e,t){var r=e.ref,i=e.refCleanup;if(r!==null)if(typeof i=="function")try{i()}catch(l){Ve(e,t,l)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof r=="function")try{r(null)}catch(l){Ve(e,t,l)}else r.current=null}function yp(e){var t=e.type,r=e.memoizedProps,i=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":r.autoFocus&&i.focus();break e;case"img":r.src?i.src=r.src:r.srcSet&&(i.srcset=r.srcSet)}}catch(l){Ve(e,e.return,l)}}function Kc(e,t,r){try{var i=e.stateNode;BS(i,e.type,r,t),i[wt]=t}catch(l){Ve(e,e.return,l)}}function vp(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&sr(e.type)||e.tag===4}function Zc(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||vp(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&sr(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Qc(e,t,r){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?(r.nodeType===9?r.body:r.nodeName==="HTML"?r.ownerDocument.body:r).insertBefore(e,t):(t=r.nodeType===9?r.body:r.nodeName==="HTML"?r.ownerDocument.body:r,t.appendChild(e),r=r._reactRootContainer,r!=null||t.onclick!==null||(t.onclick=bn));else if(i!==4&&(i===27&&sr(e.type)&&(r=e.stateNode,t=null),e=e.child,e!==null))for(Qc(e,t,r),e=e.sibling;e!==null;)Qc(e,t,r),e=e.sibling}function eo(e,t,r){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?r.insertBefore(e,t):r.appendChild(e);else if(i!==4&&(i===27&&sr(e.type)&&(r=e.stateNode),e=e.child,e!==null))for(eo(e,t,r),e=e.sibling;e!==null;)eo(e,t,r),e=e.sibling}function xp(e){var t=e.stateNode,r=e.memoizedProps;try{for(var i=e.type,l=t.attributes;l.length;)t.removeAttributeNode(l[0]);ht(t,i,r),t[ct]=e,t[wt]=r}catch(d){Ve(e,e.return,d)}}var Mn=!1,nt=!1,Jc=!1,bp=typeof WeakSet=="function"?WeakSet:Set,ot=null;function gS(e,t){if(e=e.containerInfo,vu=wo,e=Rh(e),Pl(e)){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{r=(r=e.ownerDocument)&&r.defaultView||window;var i=r.getSelection&&r.getSelection();if(i&&i.rangeCount!==0){r=i.anchorNode;var l=i.anchorOffset,d=i.focusNode;i=i.focusOffset;try{r.nodeType,d.nodeType}catch{r=null;break e}var y=0,w=-1,D=-1,q=0,K=0,W=e,Y=null;t:for(;;){for(var X;W!==r||l!==0&&W.nodeType!==3||(w=y+l),W!==d||i!==0&&W.nodeType!==3||(D=y+i),W.nodeType===3&&(y+=W.nodeValue.length),(X=W.firstChild)!==null;)Y=W,W=X;for(;;){if(W===e)break t;if(Y===r&&++q===l&&(w=y),Y===d&&++K===i&&(D=y),(X=W.nextSibling)!==null)break;W=Y,Y=W.parentNode}W=X}r=w===-1||D===-1?null:{start:w,end:D}}else r=null}r=r||{start:0,end:0}}else r=null;for(xu={focusedElem:e,selectionRange:r},wo=!1,ot=t;ot!==null;)if(t=ot,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,ot=e;else for(;ot!==null;){switch(t=ot,d=t.alternate,e=t.flags,t.tag){case 0:if((e&4)!==0&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(r=0;r<e.length;r++)l=e[r],l.ref.impl=l.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&d!==null){e=void 0,r=t,l=d.memoizedProps,d=d.memoizedState,i=r.stateNode;try{var ue=zr(r.type,l);e=i.getSnapshotBeforeUpdate(ue,d),i.__reactInternalSnapshotBeforeUpdate=e}catch(xe){Ve(r,r.return,xe)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,r=e.nodeType,r===9)wu(e);else if(r===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":wu(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(o(163))}if(e=t.sibling,e!==null){e.return=t.return,ot=e;break}ot=t.return}}function Sp(e,t,r){var i=r.flags;switch(r.tag){case 0:case 11:case 15:Rn(e,r),i&4&&wi(5,r);break;case 1:if(Rn(e,r),i&4)if(e=r.stateNode,t===null)try{e.componentDidMount()}catch(y){Ve(r,r.return,y)}else{var l=zr(r.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(l,t,e.__reactInternalSnapshotBeforeUpdate)}catch(y){Ve(r,r.return,y)}}i&64&&pp(r),i&512&&ji(r,r.return);break;case 3:if(Rn(e,r),i&64&&(e=r.updateQueue,e!==null)){if(t=null,r.child!==null)switch(r.child.tag){case 27:case 5:t=r.child.stateNode;break;case 1:t=r.child.stateNode}try{im(e,t)}catch(y){Ve(r,r.return,y)}}break;case 27:t===null&&i&4&&xp(r);case 26:case 5:Rn(e,r),t===null&&i&4&&yp(r),i&512&&ji(r,r.return);break;case 12:Rn(e,r);break;case 31:Rn(e,r),i&4&&Ep(e,r);break;case 13:Rn(e,r),i&4&&Tp(e,r),i&64&&(e=r.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(r=TS.bind(null,r),XS(e,r))));break;case 22:if(i=r.memoizedState!==null||Mn,!i){t=t!==null&&t.memoizedState!==null||nt,l=Mn;var d=nt;Mn=i,(nt=t)&&!d?On(e,r,(r.subtreeFlags&8772)!==0):Rn(e,r),Mn=l,nt=d}break;case 30:break;default:Rn(e,r)}}function wp(e){var t=e.alternate;t!==null&&(e.alternate=null,wp(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Al(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Xe=null,Et=!1;function kn(e,t,r){for(r=r.child;r!==null;)jp(e,t,r),r=r.sibling}function jp(e,t,r){if(Mt&&typeof Mt.onCommitFiberUnmount=="function")try{Mt.onCommitFiberUnmount(Fa,r)}catch{}switch(r.tag){case 26:nt||dn(r,t),kn(e,t,r),r.memoizedState?r.memoizedState.count--:r.stateNode&&(r=r.stateNode,r.parentNode.removeChild(r));break;case 27:nt||dn(r,t);var i=Xe,l=Et;sr(r.type)&&(Xe=r.stateNode,Et=!1),kn(e,t,r),Ri(r.stateNode),Xe=i,Et=l;break;case 5:nt||dn(r,t);case 6:if(i=Xe,l=Et,Xe=null,kn(e,t,r),Xe=i,Et=l,Xe!==null)if(Et)try{(Xe.nodeType===9?Xe.body:Xe.nodeName==="HTML"?Xe.ownerDocument.body:Xe).removeChild(r.stateNode)}catch(d){Ve(r,t,d)}else try{Xe.removeChild(r.stateNode)}catch(d){Ve(r,t,d)}break;case 18:Xe!==null&&(Et?(e=Xe,pg(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,r.stateNode),Da(e)):pg(Xe,r.stateNode));break;case 4:i=Xe,l=Et,Xe=r.stateNode.containerInfo,Et=!0,kn(e,t,r),Xe=i,Et=l;break;case 0:case 11:case 14:case 15:In(2,r,t),nt||In(4,r,t),kn(e,t,r);break;case 1:nt||(dn(r,t),i=r.stateNode,typeof i.componentWillUnmount=="function"&&gp(r,t,i)),kn(e,t,r);break;case 21:kn(e,t,r);break;case 22:nt=(i=nt)||r.memoizedState!==null,kn(e,t,r),nt=i;break;default:kn(e,t,r)}}function Ep(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Da(e)}catch(r){Ve(t,t.return,r)}}}function Tp(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Da(e)}catch(r){Ve(t,t.return,r)}}function yS(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new bp),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new bp),t;default:throw Error(o(435,e.tag))}}function to(e,t){var r=yS(e);t.forEach(function(i){if(!r.has(i)){r.add(i);var l=CS.bind(null,e,i);i.then(l,l)}})}function Tt(e,t){var r=t.deletions;if(r!==null)for(var i=0;i<r.length;i++){var l=r[i],d=e,y=t,w=y;e:for(;w!==null;){switch(w.tag){case 27:if(sr(w.type)){Xe=w.stateNode,Et=!1;break e}break;case 5:Xe=w.stateNode,Et=!1;break e;case 3:case 4:Xe=w.stateNode.containerInfo,Et=!0;break e}w=w.return}if(Xe===null)throw Error(o(160));jp(d,y,l),Xe=null,Et=!1,d=l.alternate,d!==null&&(d.return=null),l.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Cp(t,e),t=t.sibling}var tn=null;function Cp(e,t){var r=e.alternate,i=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Tt(t,e),Ct(e),i&4&&(In(3,e,e.return),wi(3,e),In(5,e,e.return));break;case 1:Tt(t,e),Ct(e),i&512&&(nt||r===null||dn(r,r.return)),i&64&&Mn&&(e=e.updateQueue,e!==null&&(i=e.callbacks,i!==null&&(r=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=r===null?i:r.concat(i))));break;case 26:var l=tn;if(Tt(t,e),Ct(e),i&512&&(nt||r===null||dn(r,r.return)),i&4){var d=r!==null?r.memoizedState:null;if(i=e.memoizedState,r===null)if(i===null)if(e.stateNode===null){e:{i=e.type,r=e.memoizedProps,l=l.ownerDocument||l;t:switch(i){case"title":d=l.getElementsByTagName("title")[0],(!d||d[Qa]||d[ct]||d.namespaceURI==="http://www.w3.org/2000/svg"||d.hasAttribute("itemprop"))&&(d=l.createElement(i),l.head.insertBefore(d,l.querySelector("head > title"))),ht(d,i,r),d[ct]=e,st(d),i=d;break e;case"link":var y=Cg("link","href",l).get(i+(r.href||""));if(y){for(var w=0;w<y.length;w++)if(d=y[w],d.getAttribute("href")===(r.href==null||r.href===""?null:r.href)&&d.getAttribute("rel")===(r.rel==null?null:r.rel)&&d.getAttribute("title")===(r.title==null?null:r.title)&&d.getAttribute("crossorigin")===(r.crossOrigin==null?null:r.crossOrigin)){y.splice(w,1);break t}}d=l.createElement(i),ht(d,i,r),l.head.appendChild(d);break;case"meta":if(y=Cg("meta","content",l).get(i+(r.content||""))){for(w=0;w<y.length;w++)if(d=y[w],d.getAttribute("content")===(r.content==null?null:""+r.content)&&d.getAttribute("name")===(r.name==null?null:r.name)&&d.getAttribute("property")===(r.property==null?null:r.property)&&d.getAttribute("http-equiv")===(r.httpEquiv==null?null:r.httpEquiv)&&d.getAttribute("charset")===(r.charSet==null?null:r.charSet)){y.splice(w,1);break t}}d=l.createElement(i),ht(d,i,r),l.head.appendChild(d);break;default:throw Error(o(468,i))}d[ct]=e,st(d),i=d}e.stateNode=i}else Ag(l,e.type,e.stateNode);else e.stateNode=Tg(l,i,e.memoizedProps);else d!==i?(d===null?r.stateNode!==null&&(r=r.stateNode,r.parentNode.removeChild(r)):d.count--,i===null?Ag(l,e.type,e.stateNode):Tg(l,i,e.memoizedProps)):i===null&&e.stateNode!==null&&Kc(e,e.memoizedProps,r.memoizedProps)}break;case 27:Tt(t,e),Ct(e),i&512&&(nt||r===null||dn(r,r.return)),r!==null&&i&4&&Kc(e,e.memoizedProps,r.memoizedProps);break;case 5:if(Tt(t,e),Ct(e),i&512&&(nt||r===null||dn(r,r.return)),e.flags&32){l=e.stateNode;try{Jr(l,"")}catch(ue){Ve(e,e.return,ue)}}i&4&&e.stateNode!=null&&(l=e.memoizedProps,Kc(e,l,r!==null?r.memoizedProps:l)),i&1024&&(Jc=!0);break;case 6:if(Tt(t,e),Ct(e),i&4){if(e.stateNode===null)throw Error(o(162));i=e.memoizedProps,r=e.stateNode;try{r.nodeValue=i}catch(ue){Ve(e,e.return,ue)}}break;case 3:if(vo=null,l=tn,tn=go(t.containerInfo),Tt(t,e),tn=l,Ct(e),i&4&&r!==null&&r.memoizedState.isDehydrated)try{Da(t.containerInfo)}catch(ue){Ve(e,e.return,ue)}Jc&&(Jc=!1,Ap(e));break;case 4:i=tn,tn=go(e.stateNode.containerInfo),Tt(t,e),Ct(e),tn=i;break;case 12:Tt(t,e),Ct(e);break;case 31:Tt(t,e),Ct(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,to(e,i)));break;case 13:Tt(t,e),Ct(e),e.child.flags&8192&&e.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(ro=Nt()),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,to(e,i)));break;case 22:l=e.memoizedState!==null;var D=r!==null&&r.memoizedState!==null,q=Mn,K=nt;if(Mn=q||l,nt=K||D,Tt(t,e),nt=K,Mn=q,Ct(e),i&8192)e:for(t=e.stateNode,t._visibility=l?t._visibility&-2:t._visibility|1,l&&(r===null||D||Mn||nt||_r(e)),r=null,t=e;;){if(t.tag===5||t.tag===26){if(r===null){D=r=t;try{if(d=D.stateNode,l)y=d.style,typeof y.setProperty=="function"?y.setProperty("display","none","important"):y.display="none";else{w=D.stateNode;var W=D.memoizedProps.style,Y=W!=null&&W.hasOwnProperty("display")?W.display:null;w.style.display=Y==null||typeof Y=="boolean"?"":(""+Y).trim()}}catch(ue){Ve(D,D.return,ue)}}}else if(t.tag===6){if(r===null){D=t;try{D.stateNode.nodeValue=l?"":D.memoizedProps}catch(ue){Ve(D,D.return,ue)}}}else if(t.tag===18){if(r===null){D=t;try{var X=D.stateNode;l?gg(X,!0):gg(D.stateNode,!1)}catch(ue){Ve(D,D.return,ue)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;r===t&&(r=null),t=t.return}r===t&&(r=null),t.sibling.return=t.return,t=t.sibling}i&4&&(i=e.updateQueue,i!==null&&(r=i.retryQueue,r!==null&&(i.retryQueue=null,to(e,r))));break;case 19:Tt(t,e),Ct(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,to(e,i)));break;case 30:break;case 21:break;default:Tt(t,e),Ct(e)}}function Ct(e){var t=e.flags;if(t&2){try{for(var r,i=e.return;i!==null;){if(vp(i)){r=i;break}i=i.return}if(r==null)throw Error(o(160));switch(r.tag){case 27:var l=r.stateNode,d=Zc(e);eo(e,d,l);break;case 5:var y=r.stateNode;r.flags&32&&(Jr(y,""),r.flags&=-33);var w=Zc(e);eo(e,w,y);break;case 3:case 4:var D=r.stateNode.containerInfo,q=Zc(e);Qc(e,q,D);break;default:throw Error(o(161))}}catch(K){Ve(e,e.return,K)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Ap(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Ap(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function Rn(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)Sp(e,t.alternate,t),t=t.sibling}function _r(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:In(4,t,t.return),_r(t);break;case 1:dn(t,t.return);var r=t.stateNode;typeof r.componentWillUnmount=="function"&&gp(t,t.return,r),_r(t);break;case 27:Ri(t.stateNode);case 26:case 5:dn(t,t.return),_r(t);break;case 22:t.memoizedState===null&&_r(t);break;case 30:_r(t);break;default:_r(t)}e=e.sibling}}function On(e,t,r){for(r=r&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var i=t.alternate,l=e,d=t,y=d.flags;switch(d.tag){case 0:case 11:case 15:On(l,d,r),wi(4,d);break;case 1:if(On(l,d,r),i=d,l=i.stateNode,typeof l.componentDidMount=="function")try{l.componentDidMount()}catch(q){Ve(i,i.return,q)}if(i=d,l=i.updateQueue,l!==null){var w=i.stateNode;try{var D=l.shared.hiddenCallbacks;if(D!==null)for(l.shared.hiddenCallbacks=null,l=0;l<D.length;l++)am(D[l],w)}catch(q){Ve(i,i.return,q)}}r&&y&64&&pp(d),ji(d,d.return);break;case 27:xp(d);case 26:case 5:On(l,d,r),r&&i===null&&y&4&&yp(d),ji(d,d.return);break;case 12:On(l,d,r);break;case 31:On(l,d,r),r&&y&4&&Ep(l,d);break;case 13:On(l,d,r),r&&y&4&&Tp(l,d);break;case 22:d.memoizedState===null&&On(l,d,r),ji(d,d.return);break;case 30:break;default:On(l,d,r)}t=t.sibling}}function Wc(e,t){var r=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(r=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==r&&(e!=null&&e.refCount++,r!=null&&ci(r))}function Ic(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ci(e))}function nn(e,t,r,i){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Dp(e,t,r,i),t=t.sibling}function Dp(e,t,r,i){var l=t.flags;switch(t.tag){case 0:case 11:case 15:nn(e,t,r,i),l&2048&&wi(9,t);break;case 1:nn(e,t,r,i);break;case 3:nn(e,t,r,i),l&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ci(e)));break;case 12:if(l&2048){nn(e,t,r,i),e=t.stateNode;try{var d=t.memoizedProps,y=d.id,w=d.onPostCommit;typeof w=="function"&&w(y,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(D){Ve(t,t.return,D)}}else nn(e,t,r,i);break;case 31:nn(e,t,r,i);break;case 13:nn(e,t,r,i);break;case 23:break;case 22:d=t.stateNode,y=t.alternate,t.memoizedState!==null?d._visibility&2?nn(e,t,r,i):Ei(e,t):d._visibility&2?nn(e,t,r,i):(d._visibility|=2,ya(e,t,r,i,(t.subtreeFlags&10256)!==0||!1)),l&2048&&Wc(y,t);break;case 24:nn(e,t,r,i),l&2048&&Ic(t.alternate,t);break;default:nn(e,t,r,i)}}function ya(e,t,r,i,l){for(l=l&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var d=e,y=t,w=r,D=i,q=y.flags;switch(y.tag){case 0:case 11:case 15:ya(d,y,w,D,l),wi(8,y);break;case 23:break;case 22:var K=y.stateNode;y.memoizedState!==null?K._visibility&2?ya(d,y,w,D,l):Ei(d,y):(K._visibility|=2,ya(d,y,w,D,l)),l&&q&2048&&Wc(y.alternate,y);break;case 24:ya(d,y,w,D,l),l&&q&2048&&Ic(y.alternate,y);break;default:ya(d,y,w,D,l)}t=t.sibling}}function Ei(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var r=e,i=t,l=i.flags;switch(i.tag){case 22:Ei(r,i),l&2048&&Wc(i.alternate,i);break;case 24:Ei(r,i),l&2048&&Ic(i.alternate,i);break;default:Ei(r,i)}t=t.sibling}}var Ti=8192;function va(e,t,r){if(e.subtreeFlags&Ti)for(e=e.child;e!==null;)Np(e,t,r),e=e.sibling}function Np(e,t,r){switch(e.tag){case 26:va(e,t,r),e.flags&Ti&&e.memoizedState!==null&&r2(r,tn,e.memoizedState,e.memoizedProps);break;case 5:va(e,t,r);break;case 3:case 4:var i=tn;tn=go(e.stateNode.containerInfo),va(e,t,r),tn=i;break;case 22:e.memoizedState===null&&(i=e.alternate,i!==null&&i.memoizedState!==null?(i=Ti,Ti=16777216,va(e,t,r),Ti=i):va(e,t,r));break;default:va(e,t,r)}}function Mp(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Ci(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var r=0;r<t.length;r++){var i=t[r];ot=i,Rp(i,e)}Mp(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)kp(e),e=e.sibling}function kp(e){switch(e.tag){case 0:case 11:case 15:Ci(e),e.flags&2048&&In(9,e,e.return);break;case 3:Ci(e);break;case 12:Ci(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,no(e)):Ci(e);break;default:Ci(e)}}function no(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var r=0;r<t.length;r++){var i=t[r];ot=i,Rp(i,e)}Mp(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:In(8,t,t.return),no(t);break;case 22:r=t.stateNode,r._visibility&2&&(r._visibility&=-3,no(t));break;default:no(t)}e=e.sibling}}function Rp(e,t){for(;ot!==null;){var r=ot;switch(r.tag){case 0:case 11:case 15:In(8,r,t);break;case 23:case 22:if(r.memoizedState!==null&&r.memoizedState.cachePool!==null){var i=r.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:ci(r.memoizedState.cache)}if(i=r.child,i!==null)i.return=r,ot=i;else e:for(r=e;ot!==null;){i=ot;var l=i.sibling,d=i.return;if(wp(i),i===r){ot=null;break e}if(l!==null){l.return=d,ot=l;break e}ot=d}}}var vS={getCacheForType:function(e){var t=dt(Ie),r=t.data.get(e);return r===void 0&&(r=e(),t.data.set(e,r)),r},cacheSignal:function(){return dt(Ie).controller.signal}},xS=typeof WeakMap=="function"?WeakMap:Map,Oe=0,He=null,Ee=null,Ae=0,_e=0,Vt=null,er=!1,xa=!1,eu=!1,zn=0,Ke=0,tr=0,Vr=0,tu=0,Bt=0,ba=0,Ai=null,At=null,nu=!1,ro=0,Op=0,ao=1/0,io=null,nr=null,at=0,rr=null,Sa=null,_n=0,ru=0,au=null,zp=null,Di=0,iu=null;function Lt(){return(Oe&2)!==0&&Ae!==0?Ae&-Ae:U.T!==null?du():Qf()}function _p(){if(Bt===0)if((Ae&536870912)===0||Ne){var e=hs;hs<<=1,(hs&3932160)===0&&(hs=262144),Bt=e}else Bt=536870912;return e=zt.current,e!==null&&(e.flags|=32),Bt}function Dt(e,t,r){(e===He&&(_e===2||_e===9)||e.cancelPendingCommit!==null)&&(wa(e,0),ar(e,Ae,Bt,!1)),Za(e,r),((Oe&2)===0||e!==He)&&(e===He&&((Oe&2)===0&&(Vr|=r),Ke===4&&ar(e,Ae,Bt,!1)),fn(e))}function Vp(e,t,r){if((Oe&6)!==0)throw Error(o(327));var i=!r&&(t&127)===0&&(t&e.expiredLanes)===0||Ka(e,t),l=i?wS(e,t):ou(e,t,!0),d=i;do{if(l===0){xa&&!i&&ar(e,t,0,!1);break}else{if(r=e.current.alternate,d&&!bS(r)){l=ou(e,t,!1),d=!1;continue}if(l===2){if(d=t,e.errorRecoveryDisabledLanes&d)var y=0;else y=e.pendingLanes&-536870913,y=y!==0?y:y&536870912?536870912:0;if(y!==0){t=y;e:{var w=e;l=Ai;var D=w.current.memoizedState.isDehydrated;if(D&&(wa(w,y).flags|=256),y=ou(w,y,!1),y!==2){if(eu&&!D){w.errorRecoveryDisabledLanes|=d,Vr|=d,l=4;break e}d=At,At=l,d!==null&&(At===null?At=d:At.push.apply(At,d))}l=y}if(d=!1,l!==2)continue}}if(l===1){wa(e,0),ar(e,t,0,!0);break}e:{switch(i=e,d=l,d){case 0:case 1:throw Error(o(345));case 4:if((t&4194048)!==t)break;case 6:ar(i,t,Bt,!er);break e;case 2:At=null;break;case 3:case 5:break;default:throw Error(o(329))}if((t&62914560)===t&&(l=ro+300-Nt(),10<l)){if(ar(i,t,Bt,!er),ps(i,0,!0)!==0)break e;_n=t,i.timeoutHandle=hg(Bp.bind(null,i,r,At,io,nu,t,Bt,Vr,ba,er,d,"Throttled",-0,0),l);break e}Bp(i,r,At,io,nu,t,Bt,Vr,ba,er,d,null,-0,0)}}break}while(!0);fn(e)}function Bp(e,t,r,i,l,d,y,w,D,q,K,W,Y,X){if(e.timeoutHandle=-1,W=t.subtreeFlags,W&8192||(W&16785408)===16785408){W={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:bn},Np(t,d,W);var ue=(d&62914560)===d?ro-Nt():(d&4194048)===d?Op-Nt():0;if(ue=a2(W,ue),ue!==null){_n=d,e.cancelPendingCommit=ue(Xp.bind(null,e,t,d,r,i,l,y,w,D,K,W,null,Y,X)),ar(e,d,y,!q);return}}Xp(e,t,d,r,i,l,y,w,D)}function bS(e){for(var t=e;;){var r=t.tag;if((r===0||r===11||r===15)&&t.flags&16384&&(r=t.updateQueue,r!==null&&(r=r.stores,r!==null)))for(var i=0;i<r.length;i++){var l=r[i],d=l.getSnapshot;l=l.value;try{if(!Rt(d(),l))return!1}catch{return!1}}if(r=t.child,t.subtreeFlags&16384&&r!==null)r.return=t,t=r;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function ar(e,t,r,i){t&=~tu,t&=~Vr,e.suspendedLanes|=t,e.pingedLanes&=~t,i&&(e.warmLanes|=t),i=e.expirationTimes;for(var l=t;0<l;){var d=31-kt(l),y=1<<d;i[d]=-1,l&=~y}r!==0&&Ff(e,r,t)}function so(){return(Oe&6)===0?(Ni(0),!1):!0}function su(){if(Ee!==null){if(_e===0)var e=Ee.return;else e=Ee,En=Ar=null,wc(e),fa=null,di=0,e=Ee;for(;e!==null;)mp(e.alternate,e),e=e.return;Ee=null}}function wa(e,t){var r=e.timeoutHandle;r!==-1&&(e.timeoutHandle=-1,HS(r)),r=e.cancelPendingCommit,r!==null&&(e.cancelPendingCommit=null,r()),_n=0,su(),He=e,Ee=r=wn(e.current,null),Ae=t,_e=0,Vt=null,er=!1,xa=Ka(e,t),eu=!1,ba=Bt=tu=Vr=tr=Ke=0,At=Ai=null,nu=!1,(t&8)!==0&&(t|=t&32);var i=e.entangledLanes;if(i!==0)for(e=e.entanglements,i&=t;0<i;){var l=31-kt(i),d=1<<l;t|=e[l],i&=~d}return zn=t,As(),r}function Lp(e,t){we=null,U.H=xi,t===da||t===_s?(t=em(),_e=3):t===uc?(t=em(),_e=4):_e=t===Lc?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,Vt=t,Ee===null&&(Ke=1,Zs(e,Pt(t,e.current)))}function Up(){var e=zt.current;return e===null?!0:(Ae&4194048)===Ae?Kt===null:(Ae&62914560)===Ae||(Ae&536870912)!==0?e===Kt:!1}function Hp(){var e=U.H;return U.H=xi,e===null?xi:e}function qp(){var e=U.A;return U.A=vS,e}function oo(){Ke=4,er||(Ae&4194048)!==Ae&&zt.current!==null||(xa=!0),(tr&134217727)===0&&(Vr&134217727)===0||He===null||ar(He,Ae,Bt,!1)}function ou(e,t,r){var i=Oe;Oe|=2;var l=Hp(),d=qp();(He!==e||Ae!==t)&&(io=null,wa(e,t)),t=!1;var y=Ke;e:do try{if(_e!==0&&Ee!==null){var w=Ee,D=Vt;switch(_e){case 8:su(),y=6;break e;case 3:case 2:case 9:case 6:zt.current===null&&(t=!0);var q=_e;if(_e=0,Vt=null,ja(e,w,D,q),r&&xa){y=0;break e}break;default:q=_e,_e=0,Vt=null,ja(e,w,D,q)}}SS(),y=Ke;break}catch(K){Lp(e,K)}while(!0);return t&&e.shellSuspendCounter++,En=Ar=null,Oe=i,U.H=l,U.A=d,Ee===null&&(He=null,Ae=0,As()),y}function SS(){for(;Ee!==null;)Yp(Ee)}function wS(e,t){var r=Oe;Oe|=2;var i=Hp(),l=qp();He!==e||Ae!==t?(io=null,ao=Nt()+500,wa(e,t)):xa=Ka(e,t);e:do try{if(_e!==0&&Ee!==null){t=Ee;var d=Vt;t:switch(_e){case 1:_e=0,Vt=null,ja(e,t,d,1);break;case 2:case 9:if(Wh(d)){_e=0,Vt=null,Gp(t);break}t=function(){_e!==2&&_e!==9||He!==e||(_e=7),fn(e)},d.then(t,t);break e;case 3:_e=7;break e;case 4:_e=5;break e;case 7:Wh(d)?(_e=0,Vt=null,Gp(t)):(_e=0,Vt=null,ja(e,t,d,7));break;case 5:var y=null;switch(Ee.tag){case 26:y=Ee.memoizedState;case 5:case 27:var w=Ee;if(y?Dg(y):w.stateNode.complete){_e=0,Vt=null;var D=w.sibling;if(D!==null)Ee=D;else{var q=w.return;q!==null?(Ee=q,lo(q)):Ee=null}break t}}_e=0,Vt=null,ja(e,t,d,5);break;case 6:_e=0,Vt=null,ja(e,t,d,6);break;case 8:su(),Ke=6;break e;default:throw Error(o(462))}}jS();break}catch(K){Lp(e,K)}while(!0);return En=Ar=null,U.H=i,U.A=l,Oe=r,Ee!==null?0:(He=null,Ae=0,As(),Ke)}function jS(){for(;Ee!==null&&!$b();)Yp(Ee)}function Yp(e){var t=fp(e.alternate,e,zn);e.memoizedProps=e.pendingProps,t===null?lo(e):Ee=t}function Gp(e){var t=e,r=t.alternate;switch(t.tag){case 15:case 0:t=sp(r,t,t.pendingProps,t.type,void 0,Ae);break;case 11:t=sp(r,t,t.pendingProps,t.type.render,t.ref,Ae);break;case 5:wc(t);default:mp(r,t),t=Ee=qh(t,zn),t=fp(r,t,zn)}e.memoizedProps=e.pendingProps,t===null?lo(e):Ee=t}function ja(e,t,r,i){En=Ar=null,wc(t),fa=null,di=0;var l=t.return;try{if(dS(e,l,t,r,Ae)){Ke=1,Zs(e,Pt(r,e.current)),Ee=null;return}}catch(d){if(l!==null)throw Ee=l,d;Ke=1,Zs(e,Pt(r,e.current)),Ee=null;return}t.flags&32768?(Ne||i===1?e=!0:xa||(Ae&536870912)!==0?e=!1:(er=e=!0,(i===2||i===9||i===3||i===6)&&(i=zt.current,i!==null&&i.tag===13&&(i.flags|=16384))),Pp(t,e)):lo(t)}function lo(e){var t=e;do{if((t.flags&32768)!==0){Pp(t,er);return}e=t.return;var r=mS(t.alternate,t,zn);if(r!==null){Ee=r;return}if(t=t.sibling,t!==null){Ee=t;return}Ee=t=e}while(t!==null);Ke===0&&(Ke=5)}function Pp(e,t){do{var r=pS(e.alternate,e);if(r!==null){r.flags&=32767,Ee=r;return}if(r=e.return,r!==null&&(r.flags|=32768,r.subtreeFlags=0,r.deletions=null),!t&&(e=e.sibling,e!==null)){Ee=e;return}Ee=e=r}while(e!==null);Ke=6,Ee=null}function Xp(e,t,r,i,l,d,y,w,D){e.cancelPendingCommit=null;do co();while(at!==0);if((Oe&6)!==0)throw Error(o(327));if(t!==null){if(t===e.current)throw Error(o(177));if(d=t.lanes|t.childLanes,d|=Zl,n1(e,r,d,y,w,D),e===He&&(Ee=He=null,Ae=0),Sa=t,rr=e,_n=r,ru=d,au=l,zp=i,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,AS(ds,function(){return Qp(),null})):(e.callbackNode=null,e.callbackPriority=0),i=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||i){i=U.T,U.T=null,l=ae.p,ae.p=2,y=Oe,Oe|=4;try{gS(e,t,r)}finally{Oe=y,ae.p=l,U.T=i}}at=1,$p(),Fp(),Kp()}}function $p(){if(at===1){at=0;var e=rr,t=Sa,r=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||r){r=U.T,U.T=null;var i=ae.p;ae.p=2;var l=Oe;Oe|=4;try{Cp(t,e);var d=xu,y=Rh(e.containerInfo),w=d.focusedElem,D=d.selectionRange;if(y!==w&&w&&w.ownerDocument&&kh(w.ownerDocument.documentElement,w)){if(D!==null&&Pl(w)){var q=D.start,K=D.end;if(K===void 0&&(K=q),"selectionStart"in w)w.selectionStart=q,w.selectionEnd=Math.min(K,w.value.length);else{var W=w.ownerDocument||document,Y=W&&W.defaultView||window;if(Y.getSelection){var X=Y.getSelection(),ue=w.textContent.length,xe=Math.min(D.start,ue),Ue=D.end===void 0?xe:Math.min(D.end,ue);!X.extend&&xe>Ue&&(y=Ue,Ue=xe,xe=y);var B=Mh(w,xe),z=Mh(w,Ue);if(B&&z&&(X.rangeCount!==1||X.anchorNode!==B.node||X.anchorOffset!==B.offset||X.focusNode!==z.node||X.focusOffset!==z.offset)){var H=W.createRange();H.setStart(B.node,B.offset),X.removeAllRanges(),xe>Ue?(X.addRange(H),X.extend(z.node,z.offset)):(H.setEnd(z.node,z.offset),X.addRange(H))}}}}for(W=[],X=w;X=X.parentNode;)X.nodeType===1&&W.push({element:X,left:X.scrollLeft,top:X.scrollTop});for(typeof w.focus=="function"&&w.focus(),w=0;w<W.length;w++){var Z=W[w];Z.element.scrollLeft=Z.left,Z.element.scrollTop=Z.top}}wo=!!vu,xu=vu=null}finally{Oe=l,ae.p=i,U.T=r}}e.current=t,at=2}}function Fp(){if(at===2){at=0;var e=rr,t=Sa,r=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||r){r=U.T,U.T=null;var i=ae.p;ae.p=2;var l=Oe;Oe|=4;try{Sp(e,t.alternate,t)}finally{Oe=l,ae.p=i,U.T=r}}at=3}}function Kp(){if(at===4||at===3){at=0,Fb();var e=rr,t=Sa,r=_n,i=zp;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?at=5:(at=0,Sa=rr=null,Zp(e,e.pendingLanes));var l=e.pendingLanes;if(l===0&&(nr=null),Tl(r),t=t.stateNode,Mt&&typeof Mt.onCommitFiberRoot=="function")try{Mt.onCommitFiberRoot(Fa,t,void 0,(t.current.flags&128)===128)}catch{}if(i!==null){t=U.T,l=ae.p,ae.p=2,U.T=null;try{for(var d=e.onRecoverableError,y=0;y<i.length;y++){var w=i[y];d(w.value,{componentStack:w.stack})}}finally{U.T=t,ae.p=l}}(_n&3)!==0&&co(),fn(e),l=e.pendingLanes,(r&261930)!==0&&(l&42)!==0?e===iu?Di++:(Di=0,iu=e):Di=0,Ni(0)}}function Zp(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,ci(t)))}function co(){return $p(),Fp(),Kp(),Qp()}function Qp(){if(at!==5)return!1;var e=rr,t=ru;ru=0;var r=Tl(_n),i=U.T,l=ae.p;try{ae.p=32>r?32:r,U.T=null,r=au,au=null;var d=rr,y=_n;if(at=0,Sa=rr=null,_n=0,(Oe&6)!==0)throw Error(o(331));var w=Oe;if(Oe|=4,kp(d.current),Dp(d,d.current,y,r),Oe=w,Ni(0,!1),Mt&&typeof Mt.onPostCommitFiberRoot=="function")try{Mt.onPostCommitFiberRoot(Fa,d)}catch{}return!0}finally{ae.p=l,U.T=i,Zp(e,t)}}function Jp(e,t,r){t=Pt(r,t),t=Bc(e.stateNode,t,2),e=Qn(e,t,2),e!==null&&(Za(e,2),fn(e))}function Ve(e,t,r){if(e.tag===3)Jp(e,e,r);else for(;t!==null;){if(t.tag===3){Jp(t,e,r);break}else if(t.tag===1){var i=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(nr===null||!nr.has(i))){e=Pt(r,e),r=Wm(2),i=Qn(t,r,2),i!==null&&(Im(r,i,t,e),Za(i,2),fn(i));break}}t=t.return}}function lu(e,t,r){var i=e.pingCache;if(i===null){i=e.pingCache=new xS;var l=new Set;i.set(t,l)}else l=i.get(t),l===void 0&&(l=new Set,i.set(t,l));l.has(r)||(eu=!0,l.add(r),e=ES.bind(null,e,t,r),t.then(e,e))}function ES(e,t,r){var i=e.pingCache;i!==null&&i.delete(t),e.pingedLanes|=e.suspendedLanes&r,e.warmLanes&=~r,He===e&&(Ae&r)===r&&(Ke===4||Ke===3&&(Ae&62914560)===Ae&&300>Nt()-ro?(Oe&2)===0&&wa(e,0):tu|=r,ba===Ae&&(ba=0)),fn(e)}function Wp(e,t){t===0&&(t=$f()),e=Er(e,t),e!==null&&(Za(e,t),fn(e))}function TS(e){var t=e.memoizedState,r=0;t!==null&&(r=t.retryLane),Wp(e,r)}function CS(e,t){var r=0;switch(e.tag){case 31:case 13:var i=e.stateNode,l=e.memoizedState;l!==null&&(r=l.retryLane);break;case 19:i=e.stateNode;break;case 22:i=e.stateNode._retryCache;break;default:throw Error(o(314))}i!==null&&i.delete(t),Wp(e,r)}function AS(e,t){return Sl(e,t)}var uo=null,Ea=null,cu=!1,fo=!1,uu=!1,ir=0;function fn(e){e!==Ea&&e.next===null&&(Ea===null?uo=Ea=e:Ea=Ea.next=e),fo=!0,cu||(cu=!0,NS())}function Ni(e,t){if(!uu&&fo){uu=!0;do for(var r=!1,i=uo;i!==null;){if(e!==0){var l=i.pendingLanes;if(l===0)var d=0;else{var y=i.suspendedLanes,w=i.pingedLanes;d=(1<<31-kt(42|e)+1)-1,d&=l&~(y&~w),d=d&201326741?d&201326741|1:d?d|2:0}d!==0&&(r=!0,ng(i,d))}else d=Ae,d=ps(i,i===He?d:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),(d&3)===0||Ka(i,d)||(r=!0,ng(i,d));i=i.next}while(r);uu=!1}}function DS(){Ip()}function Ip(){fo=cu=!1;var e=0;ir!==0&&US()&&(e=ir);for(var t=Nt(),r=null,i=uo;i!==null;){var l=i.next,d=eg(i,t);d===0?(i.next=null,r===null?uo=l:r.next=l,l===null&&(Ea=r)):(r=i,(e!==0||(d&3)!==0)&&(fo=!0)),i=l}at!==0&&at!==5||Ni(e),ir!==0&&(ir=0)}function eg(e,t){for(var r=e.suspendedLanes,i=e.pingedLanes,l=e.expirationTimes,d=e.pendingLanes&-62914561;0<d;){var y=31-kt(d),w=1<<y,D=l[y];D===-1?((w&r)===0||(w&i)!==0)&&(l[y]=t1(w,t)):D<=t&&(e.expiredLanes|=w),d&=~w}if(t=He,r=Ae,r=ps(e,e===t?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i=e.callbackNode,r===0||e===t&&(_e===2||_e===9)||e.cancelPendingCommit!==null)return i!==null&&i!==null&&wl(i),e.callbackNode=null,e.callbackPriority=0;if((r&3)===0||Ka(e,r)){if(t=r&-r,t===e.callbackPriority)return t;switch(i!==null&&wl(i),Tl(r)){case 2:case 8:r=Pf;break;case 32:r=ds;break;case 268435456:r=Xf;break;default:r=ds}return i=tg.bind(null,e),r=Sl(r,i),e.callbackPriority=t,e.callbackNode=r,t}return i!==null&&i!==null&&wl(i),e.callbackPriority=2,e.callbackNode=null,2}function tg(e,t){if(at!==0&&at!==5)return e.callbackNode=null,e.callbackPriority=0,null;var r=e.callbackNode;if(co()&&e.callbackNode!==r)return null;var i=Ae;return i=ps(e,e===He?i:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i===0?null:(Vp(e,i,t),eg(e,Nt()),e.callbackNode!=null&&e.callbackNode===r?tg.bind(null,e):null)}function ng(e,t){if(co())return null;Vp(e,t,!0)}function NS(){qS(function(){(Oe&6)!==0?Sl(Gf,DS):Ip()})}function du(){if(ir===0){var e=ca;e===0&&(e=fs,fs<<=1,(fs&261888)===0&&(fs=256)),ir=e}return ir}function rg(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:xs(""+e)}function ag(e,t){var r=t.ownerDocument.createElement("input");return r.name=t.name,r.value=t.value,e.id&&r.setAttribute("form",e.id),t.parentNode.insertBefore(r,t),e=new FormData(e),r.parentNode.removeChild(r),e}function MS(e,t,r,i,l){if(t==="submit"&&r&&r.stateNode===l){var d=rg((l[wt]||null).action),y=i.submitter;y&&(t=(t=y[wt]||null)?rg(t.formAction):y.getAttribute("formAction"),t!==null&&(d=t,y=null));var w=new js("action","action",null,i,l);e.push({event:w,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(ir!==0){var D=y?ag(l,y):new FormData(l);kc(r,{pending:!0,data:D,method:l.method,action:d},null,D)}}else typeof d=="function"&&(w.preventDefault(),D=y?ag(l,y):new FormData(l),kc(r,{pending:!0,data:D,method:l.method,action:d},d,D))},currentTarget:l}]})}}for(var fu=0;fu<Kl.length;fu++){var hu=Kl[fu],kS=hu.toLowerCase(),RS=hu[0].toUpperCase()+hu.slice(1);en(kS,"on"+RS)}en(_h,"onAnimationEnd"),en(Vh,"onAnimationIteration"),en(Bh,"onAnimationStart"),en("dblclick","onDoubleClick"),en("focusin","onFocus"),en("focusout","onBlur"),en(K1,"onTransitionRun"),en(Z1,"onTransitionStart"),en(Q1,"onTransitionCancel"),en(Lh,"onTransitionEnd"),Zr("onMouseEnter",["mouseout","mouseover"]),Zr("onMouseLeave",["mouseout","mouseover"]),Zr("onPointerEnter",["pointerout","pointerover"]),Zr("onPointerLeave",["pointerout","pointerover"]),br("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),br("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),br("onBeforeInput",["compositionend","keypress","textInput","paste"]),br("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),br("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),br("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Mi="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),OS=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Mi));function ig(e,t){t=(t&4)!==0;for(var r=0;r<e.length;r++){var i=e[r],l=i.event;i=i.listeners;e:{var d=void 0;if(t)for(var y=i.length-1;0<=y;y--){var w=i[y],D=w.instance,q=w.currentTarget;if(w=w.listener,D!==d&&l.isPropagationStopped())break e;d=w,l.currentTarget=q;try{d(l)}catch(K){Cs(K)}l.currentTarget=null,d=D}else for(y=0;y<i.length;y++){if(w=i[y],D=w.instance,q=w.currentTarget,w=w.listener,D!==d&&l.isPropagationStopped())break e;d=w,l.currentTarget=q;try{d(l)}catch(K){Cs(K)}l.currentTarget=null,d=D}}}}function Te(e,t){var r=t[Cl];r===void 0&&(r=t[Cl]=new Set);var i=e+"__bubble";r.has(i)||(sg(t,e,2,!1),r.add(i))}function mu(e,t,r){var i=0;t&&(i|=4),sg(r,e,i,t)}var ho="_reactListening"+Math.random().toString(36).slice(2);function pu(e){if(!e[ho]){e[ho]=!0,If.forEach(function(r){r!=="selectionchange"&&(OS.has(r)||mu(r,!1,e),mu(r,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[ho]||(t[ho]=!0,mu("selectionchange",!1,t))}}function sg(e,t,r,i){switch(_g(t)){case 2:var l=o2;break;case 8:l=l2;break;default:l=Mu}r=l.bind(null,t,r,e),l=void 0,!_l||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0),i?l!==void 0?e.addEventListener(t,r,{capture:!0,passive:l}):e.addEventListener(t,r,!0):l!==void 0?e.addEventListener(t,r,{passive:l}):e.addEventListener(t,r,!1)}function gu(e,t,r,i,l){var d=i;if((t&1)===0&&(t&2)===0&&i!==null)e:for(;;){if(i===null)return;var y=i.tag;if(y===3||y===4){var w=i.stateNode.containerInfo;if(w===l)break;if(y===4)for(y=i.return;y!==null;){var D=y.tag;if((D===3||D===4)&&y.stateNode.containerInfo===l)return;y=y.return}for(;w!==null;){if(y=$r(w),y===null)return;if(D=y.tag,D===5||D===6||D===26||D===27){i=d=y;continue e}w=w.parentNode}}i=i.return}dh(function(){var q=d,K=Ol(r),W=[];e:{var Y=Uh.get(e);if(Y!==void 0){var X=js,ue=e;switch(e){case"keypress":if(Ss(r)===0)break e;case"keydown":case"keyup":X=C1;break;case"focusin":ue="focus",X=Ul;break;case"focusout":ue="blur",X=Ul;break;case"beforeblur":case"afterblur":X=Ul;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":X=mh;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":X=m1;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":X=N1;break;case _h:case Vh:case Bh:X=y1;break;case Lh:X=k1;break;case"scroll":case"scrollend":X=f1;break;case"wheel":X=O1;break;case"copy":case"cut":case"paste":X=x1;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":X=gh;break;case"toggle":case"beforetoggle":X=_1}var xe=(t&4)!==0,Ue=!xe&&(e==="scroll"||e==="scrollend"),B=xe?Y!==null?Y+"Capture":null:Y;xe=[];for(var z=q,H;z!==null;){var Z=z;if(H=Z.stateNode,Z=Z.tag,Z!==5&&Z!==26&&Z!==27||H===null||B===null||(Z=Wa(z,B),Z!=null&&xe.push(ki(z,Z,H))),Ue)break;z=z.return}0<xe.length&&(Y=new X(Y,ue,null,r,K),W.push({event:Y,listeners:xe}))}}if((t&7)===0){e:{if(Y=e==="mouseover"||e==="pointerover",X=e==="mouseout"||e==="pointerout",Y&&r!==Rl&&(ue=r.relatedTarget||r.fromElement)&&($r(ue)||ue[Xr]))break e;if((X||Y)&&(Y=K.window===K?K:(Y=K.ownerDocument)?Y.defaultView||Y.parentWindow:window,X?(ue=r.relatedTarget||r.toElement,X=q,ue=ue?$r(ue):null,ue!==null&&(Ue=h(ue),xe=ue.tag,ue!==Ue||xe!==5&&xe!==27&&xe!==6)&&(ue=null)):(X=null,ue=q),X!==ue)){if(xe=mh,Z="onMouseLeave",B="onMouseEnter",z="mouse",(e==="pointerout"||e==="pointerover")&&(xe=gh,Z="onPointerLeave",B="onPointerEnter",z="pointer"),Ue=X==null?Y:Ja(X),H=ue==null?Y:Ja(ue),Y=new xe(Z,z+"leave",X,r,K),Y.target=Ue,Y.relatedTarget=H,Z=null,$r(K)===q&&(xe=new xe(B,z+"enter",ue,r,K),xe.target=H,xe.relatedTarget=Ue,Z=xe),Ue=Z,X&&ue)t:{for(xe=zS,B=X,z=ue,H=0,Z=B;Z;Z=xe(Z))H++;Z=0;for(var ye=z;ye;ye=xe(ye))Z++;for(;0<H-Z;)B=xe(B),H--;for(;0<Z-H;)z=xe(z),Z--;for(;H--;){if(B===z||z!==null&&B===z.alternate){xe=B;break t}B=xe(B),z=xe(z)}xe=null}else xe=null;X!==null&&og(W,Y,X,xe,!1),ue!==null&&Ue!==null&&og(W,Ue,ue,xe,!0)}}e:{if(Y=q?Ja(q):window,X=Y.nodeName&&Y.nodeName.toLowerCase(),X==="select"||X==="input"&&Y.type==="file")var ke=Eh;else if(wh(Y))if(Th)ke=X1;else{ke=G1;var pe=Y1}else X=Y.nodeName,!X||X.toLowerCase()!=="input"||Y.type!=="checkbox"&&Y.type!=="radio"?q&&kl(q.elementType)&&(ke=Eh):ke=P1;if(ke&&(ke=ke(e,q))){jh(W,ke,r,K);break e}pe&&pe(e,Y,q),e==="focusout"&&q&&Y.type==="number"&&q.memoizedProps.value!=null&&Ml(Y,"number",Y.value)}switch(pe=q?Ja(q):window,e){case"focusin":(wh(pe)||pe.contentEditable==="true")&&(ta=pe,Xl=q,si=null);break;case"focusout":si=Xl=ta=null;break;case"mousedown":$l=!0;break;case"contextmenu":case"mouseup":case"dragend":$l=!1,Oh(W,r,K);break;case"selectionchange":if(F1)break;case"keydown":case"keyup":Oh(W,r,K)}var je;if(ql)e:{switch(e){case"compositionstart":var De="onCompositionStart";break e;case"compositionend":De="onCompositionEnd";break e;case"compositionupdate":De="onCompositionUpdate";break e}De=void 0}else ea?bh(e,r)&&(De="onCompositionEnd"):e==="keydown"&&r.keyCode===229&&(De="onCompositionStart");De&&(yh&&r.locale!=="ko"&&(ea||De!=="onCompositionStart"?De==="onCompositionEnd"&&ea&&(je=fh()):(Gn=K,Vl="value"in Gn?Gn.value:Gn.textContent,ea=!0)),pe=mo(q,De),0<pe.length&&(De=new ph(De,e,null,r,K),W.push({event:De,listeners:pe}),je?De.data=je:(je=Sh(r),je!==null&&(De.data=je)))),(je=B1?L1(e,r):U1(e,r))&&(De=mo(q,"onBeforeInput"),0<De.length&&(pe=new ph("onBeforeInput","beforeinput",null,r,K),W.push({event:pe,listeners:De}),pe.data=je)),MS(W,e,q,r,K)}ig(W,t)})}function ki(e,t,r){return{instance:e,listener:t,currentTarget:r}}function mo(e,t){for(var r=t+"Capture",i=[];e!==null;){var l=e,d=l.stateNode;if(l=l.tag,l!==5&&l!==26&&l!==27||d===null||(l=Wa(e,r),l!=null&&i.unshift(ki(e,l,d)),l=Wa(e,t),l!=null&&i.push(ki(e,l,d))),e.tag===3)return i;e=e.return}return[]}function zS(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function og(e,t,r,i,l){for(var d=t._reactName,y=[];r!==null&&r!==i;){var w=r,D=w.alternate,q=w.stateNode;if(w=w.tag,D!==null&&D===i)break;w!==5&&w!==26&&w!==27||q===null||(D=q,l?(q=Wa(r,d),q!=null&&y.unshift(ki(r,q,D))):l||(q=Wa(r,d),q!=null&&y.push(ki(r,q,D)))),r=r.return}y.length!==0&&e.push({event:t,listeners:y})}var _S=/\r\n?/g,VS=/\u0000|\uFFFD/g;function lg(e){return(typeof e=="string"?e:""+e).replace(_S,`
`).replace(VS,"")}function cg(e,t){return t=lg(t),lg(e)===t}function Le(e,t,r,i,l,d){switch(r){case"children":typeof i=="string"?t==="body"||t==="textarea"&&i===""||Jr(e,i):(typeof i=="number"||typeof i=="bigint")&&t!=="body"&&Jr(e,""+i);break;case"className":ys(e,"class",i);break;case"tabIndex":ys(e,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":ys(e,r,i);break;case"style":ch(e,i,d);break;case"data":if(t!=="object"){ys(e,"data",i);break}case"src":case"href":if(i===""&&(t!=="a"||r!=="href")){e.removeAttribute(r);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(r);break}i=xs(""+i),e.setAttribute(r,i);break;case"action":case"formAction":if(typeof i=="function"){e.setAttribute(r,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof d=="function"&&(r==="formAction"?(t!=="input"&&Le(e,t,"name",l.name,l,null),Le(e,t,"formEncType",l.formEncType,l,null),Le(e,t,"formMethod",l.formMethod,l,null),Le(e,t,"formTarget",l.formTarget,l,null)):(Le(e,t,"encType",l.encType,l,null),Le(e,t,"method",l.method,l,null),Le(e,t,"target",l.target,l,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(r);break}i=xs(""+i),e.setAttribute(r,i);break;case"onClick":i!=null&&(e.onclick=bn);break;case"onScroll":i!=null&&Te("scroll",e);break;case"onScrollEnd":i!=null&&Te("scrollend",e);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(o(61));if(r=i.__html,r!=null){if(l.children!=null)throw Error(o(60));e.innerHTML=r}}break;case"multiple":e.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":e.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){e.removeAttribute("xlink:href");break}r=xs(""+i),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",r);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(r,""+i):e.removeAttribute(r);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(r,""):e.removeAttribute(r);break;case"capture":case"download":i===!0?e.setAttribute(r,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(r,i):e.removeAttribute(r);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?e.setAttribute(r,i):e.removeAttribute(r);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?e.removeAttribute(r):e.setAttribute(r,i);break;case"popover":Te("beforetoggle",e),Te("toggle",e),gs(e,"popover",i);break;case"xlinkActuate":xn(e,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":xn(e,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":xn(e,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":xn(e,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":xn(e,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":xn(e,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":xn(e,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":xn(e,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":xn(e,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":gs(e,"is",i);break;case"innerText":case"textContent":break;default:(!(2<r.length)||r[0]!=="o"&&r[0]!=="O"||r[1]!=="n"&&r[1]!=="N")&&(r=u1.get(r)||r,gs(e,r,i))}}function yu(e,t,r,i,l,d){switch(r){case"style":ch(e,i,d);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(o(61));if(r=i.__html,r!=null){if(l.children!=null)throw Error(o(60));e.innerHTML=r}}break;case"children":typeof i=="string"?Jr(e,i):(typeof i=="number"||typeof i=="bigint")&&Jr(e,""+i);break;case"onScroll":i!=null&&Te("scroll",e);break;case"onScrollEnd":i!=null&&Te("scrollend",e);break;case"onClick":i!=null&&(e.onclick=bn);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!eh.hasOwnProperty(r))e:{if(r[0]==="o"&&r[1]==="n"&&(l=r.endsWith("Capture"),t=r.slice(2,l?r.length-7:void 0),d=e[wt]||null,d=d!=null?d[r]:null,typeof d=="function"&&e.removeEventListener(t,d,l),typeof i=="function")){typeof d!="function"&&d!==null&&(r in e?e[r]=null:e.hasAttribute(r)&&e.removeAttribute(r)),e.addEventListener(t,i,l);break e}r in e?e[r]=i:i===!0?e.setAttribute(r,""):gs(e,r,i)}}}function ht(e,t,r){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Te("error",e),Te("load",e);var i=!1,l=!1,d;for(d in r)if(r.hasOwnProperty(d)){var y=r[d];if(y!=null)switch(d){case"src":i=!0;break;case"srcSet":l=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(o(137,t));default:Le(e,t,d,y,r,null)}}l&&Le(e,t,"srcSet",r.srcSet,r,null),i&&Le(e,t,"src",r.src,r,null);return;case"input":Te("invalid",e);var w=d=y=l=null,D=null,q=null;for(i in r)if(r.hasOwnProperty(i)){var K=r[i];if(K!=null)switch(i){case"name":l=K;break;case"type":y=K;break;case"checked":D=K;break;case"defaultChecked":q=K;break;case"value":d=K;break;case"defaultValue":w=K;break;case"children":case"dangerouslySetInnerHTML":if(K!=null)throw Error(o(137,t));break;default:Le(e,t,i,K,r,null)}}ih(e,d,w,D,q,y,l,!1);return;case"select":Te("invalid",e),i=y=d=null;for(l in r)if(r.hasOwnProperty(l)&&(w=r[l],w!=null))switch(l){case"value":d=w;break;case"defaultValue":y=w;break;case"multiple":i=w;default:Le(e,t,l,w,r,null)}t=d,r=y,e.multiple=!!i,t!=null?Qr(e,!!i,t,!1):r!=null&&Qr(e,!!i,r,!0);return;case"textarea":Te("invalid",e),d=l=i=null;for(y in r)if(r.hasOwnProperty(y)&&(w=r[y],w!=null))switch(y){case"value":i=w;break;case"defaultValue":l=w;break;case"children":d=w;break;case"dangerouslySetInnerHTML":if(w!=null)throw Error(o(91));break;default:Le(e,t,y,w,r,null)}oh(e,i,l,d);return;case"option":for(D in r)if(r.hasOwnProperty(D)&&(i=r[D],i!=null))switch(D){case"selected":e.selected=i&&typeof i!="function"&&typeof i!="symbol";break;default:Le(e,t,D,i,r,null)}return;case"dialog":Te("beforetoggle",e),Te("toggle",e),Te("cancel",e),Te("close",e);break;case"iframe":case"object":Te("load",e);break;case"video":case"audio":for(i=0;i<Mi.length;i++)Te(Mi[i],e);break;case"image":Te("error",e),Te("load",e);break;case"details":Te("toggle",e);break;case"embed":case"source":case"link":Te("error",e),Te("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(q in r)if(r.hasOwnProperty(q)&&(i=r[q],i!=null))switch(q){case"children":case"dangerouslySetInnerHTML":throw Error(o(137,t));default:Le(e,t,q,i,r,null)}return;default:if(kl(t)){for(K in r)r.hasOwnProperty(K)&&(i=r[K],i!==void 0&&yu(e,t,K,i,r,void 0));return}}for(w in r)r.hasOwnProperty(w)&&(i=r[w],i!=null&&Le(e,t,w,i,r,null))}function BS(e,t,r,i){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var l=null,d=null,y=null,w=null,D=null,q=null,K=null;for(X in r){var W=r[X];if(r.hasOwnProperty(X)&&W!=null)switch(X){case"checked":break;case"value":break;case"defaultValue":D=W;default:i.hasOwnProperty(X)||Le(e,t,X,null,i,W)}}for(var Y in i){var X=i[Y];if(W=r[Y],i.hasOwnProperty(Y)&&(X!=null||W!=null))switch(Y){case"type":d=X;break;case"name":l=X;break;case"checked":q=X;break;case"defaultChecked":K=X;break;case"value":y=X;break;case"defaultValue":w=X;break;case"children":case"dangerouslySetInnerHTML":if(X!=null)throw Error(o(137,t));break;default:X!==W&&Le(e,t,Y,X,i,W)}}Nl(e,y,w,D,q,K,d,l);return;case"select":X=y=w=Y=null;for(d in r)if(D=r[d],r.hasOwnProperty(d)&&D!=null)switch(d){case"value":break;case"multiple":X=D;default:i.hasOwnProperty(d)||Le(e,t,d,null,i,D)}for(l in i)if(d=i[l],D=r[l],i.hasOwnProperty(l)&&(d!=null||D!=null))switch(l){case"value":Y=d;break;case"defaultValue":w=d;break;case"multiple":y=d;default:d!==D&&Le(e,t,l,d,i,D)}t=w,r=y,i=X,Y!=null?Qr(e,!!r,Y,!1):!!i!=!!r&&(t!=null?Qr(e,!!r,t,!0):Qr(e,!!r,r?[]:"",!1));return;case"textarea":X=Y=null;for(w in r)if(l=r[w],r.hasOwnProperty(w)&&l!=null&&!i.hasOwnProperty(w))switch(w){case"value":break;case"children":break;default:Le(e,t,w,null,i,l)}for(y in i)if(l=i[y],d=r[y],i.hasOwnProperty(y)&&(l!=null||d!=null))switch(y){case"value":Y=l;break;case"defaultValue":X=l;break;case"children":break;case"dangerouslySetInnerHTML":if(l!=null)throw Error(o(91));break;default:l!==d&&Le(e,t,y,l,i,d)}sh(e,Y,X);return;case"option":for(var ue in r)if(Y=r[ue],r.hasOwnProperty(ue)&&Y!=null&&!i.hasOwnProperty(ue))switch(ue){case"selected":e.selected=!1;break;default:Le(e,t,ue,null,i,Y)}for(D in i)if(Y=i[D],X=r[D],i.hasOwnProperty(D)&&Y!==X&&(Y!=null||X!=null))switch(D){case"selected":e.selected=Y&&typeof Y!="function"&&typeof Y!="symbol";break;default:Le(e,t,D,Y,i,X)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var xe in r)Y=r[xe],r.hasOwnProperty(xe)&&Y!=null&&!i.hasOwnProperty(xe)&&Le(e,t,xe,null,i,Y);for(q in i)if(Y=i[q],X=r[q],i.hasOwnProperty(q)&&Y!==X&&(Y!=null||X!=null))switch(q){case"children":case"dangerouslySetInnerHTML":if(Y!=null)throw Error(o(137,t));break;default:Le(e,t,q,Y,i,X)}return;default:if(kl(t)){for(var Ue in r)Y=r[Ue],r.hasOwnProperty(Ue)&&Y!==void 0&&!i.hasOwnProperty(Ue)&&yu(e,t,Ue,void 0,i,Y);for(K in i)Y=i[K],X=r[K],!i.hasOwnProperty(K)||Y===X||Y===void 0&&X===void 0||yu(e,t,K,Y,i,X);return}}for(var B in r)Y=r[B],r.hasOwnProperty(B)&&Y!=null&&!i.hasOwnProperty(B)&&Le(e,t,B,null,i,Y);for(W in i)Y=i[W],X=r[W],!i.hasOwnProperty(W)||Y===X||Y==null&&X==null||Le(e,t,W,Y,i,X)}function ug(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function LS(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,r=performance.getEntriesByType("resource"),i=0;i<r.length;i++){var l=r[i],d=l.transferSize,y=l.initiatorType,w=l.duration;if(d&&w&&ug(y)){for(y=0,w=l.responseEnd,i+=1;i<r.length;i++){var D=r[i],q=D.startTime;if(q>w)break;var K=D.transferSize,W=D.initiatorType;K&&ug(W)&&(D=D.responseEnd,y+=K*(D<w?1:(w-q)/(D-q)))}if(--i,t+=8*(d+y)/(l.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var vu=null,xu=null;function po(e){return e.nodeType===9?e:e.ownerDocument}function dg(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function fg(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function bu(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Su=null;function US(){var e=window.event;return e&&e.type==="popstate"?e===Su?!1:(Su=e,!0):(Su=null,!1)}var hg=typeof setTimeout=="function"?setTimeout:void 0,HS=typeof clearTimeout=="function"?clearTimeout:void 0,mg=typeof Promise=="function"?Promise:void 0,qS=typeof queueMicrotask=="function"?queueMicrotask:typeof mg<"u"?function(e){return mg.resolve(null).then(e).catch(YS)}:hg;function YS(e){setTimeout(function(){throw e})}function sr(e){return e==="head"}function pg(e,t){var r=t,i=0;do{var l=r.nextSibling;if(e.removeChild(r),l&&l.nodeType===8)if(r=l.data,r==="/$"||r==="/&"){if(i===0){e.removeChild(l),Da(t);return}i--}else if(r==="$"||r==="$?"||r==="$~"||r==="$!"||r==="&")i++;else if(r==="html")Ri(e.ownerDocument.documentElement);else if(r==="head"){r=e.ownerDocument.head,Ri(r);for(var d=r.firstChild;d;){var y=d.nextSibling,w=d.nodeName;d[Qa]||w==="SCRIPT"||w==="STYLE"||w==="LINK"&&d.rel.toLowerCase()==="stylesheet"||r.removeChild(d),d=y}}else r==="body"&&Ri(e.ownerDocument.body);r=l}while(r);Da(t)}function gg(e,t){var r=e;e=0;do{var i=r.nextSibling;if(r.nodeType===1?t?(r._stashedDisplay=r.style.display,r.style.display="none"):(r.style.display=r._stashedDisplay||"",r.getAttribute("style")===""&&r.removeAttribute("style")):r.nodeType===3&&(t?(r._stashedText=r.nodeValue,r.nodeValue=""):r.nodeValue=r._stashedText||""),i&&i.nodeType===8)if(r=i.data,r==="/$"){if(e===0)break;e--}else r!=="$"&&r!=="$?"&&r!=="$~"&&r!=="$!"||e++;r=i}while(r)}function wu(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var r=t;switch(t=t.nextSibling,r.nodeName){case"HTML":case"HEAD":case"BODY":wu(r),Al(r);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(r.rel.toLowerCase()==="stylesheet")continue}e.removeChild(r)}}function GS(e,t,r,i){for(;e.nodeType===1;){var l=r;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!i&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(i){if(!e[Qa])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(d=e.getAttribute("rel"),d==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(d!==l.rel||e.getAttribute("href")!==(l.href==null||l.href===""?null:l.href)||e.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin)||e.getAttribute("title")!==(l.title==null?null:l.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(d=e.getAttribute("src"),(d!==(l.src==null?null:l.src)||e.getAttribute("type")!==(l.type==null?null:l.type)||e.getAttribute("crossorigin")!==(l.crossOrigin==null?null:l.crossOrigin))&&d&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var d=l.name==null?null:""+l.name;if(l.type==="hidden"&&e.getAttribute("name")===d)return e}else return e;if(e=Zt(e.nextSibling),e===null)break}return null}function PS(e,t,r){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!r||(e=Zt(e.nextSibling),e===null))return null;return e}function yg(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Zt(e.nextSibling),e===null))return null;return e}function ju(e){return e.data==="$?"||e.data==="$~"}function Eu(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function XS(e,t){var r=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||r.readyState!=="loading")t();else{var i=function(){t(),r.removeEventListener("DOMContentLoaded",i)};r.addEventListener("DOMContentLoaded",i),e._reactRetry=i}}function Zt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var Tu=null;function vg(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="/$"||r==="/&"){if(t===0)return Zt(e.nextSibling);t--}else r!=="$"&&r!=="$!"&&r!=="$?"&&r!=="$~"&&r!=="&"||t++}e=e.nextSibling}return null}function xg(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="$"||r==="$!"||r==="$?"||r==="$~"||r==="&"){if(t===0)return e;t--}else r!=="/$"&&r!=="/&"||t++}e=e.previousSibling}return null}function bg(e,t,r){switch(t=po(r),e){case"html":if(e=t.documentElement,!e)throw Error(o(452));return e;case"head":if(e=t.head,!e)throw Error(o(453));return e;case"body":if(e=t.body,!e)throw Error(o(454));return e;default:throw Error(o(451))}}function Ri(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Al(e)}var Qt=new Map,Sg=new Set;function go(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Vn=ae.d;ae.d={f:$S,r:FS,D:KS,C:ZS,L:QS,m:JS,X:IS,S:WS,M:e2};function $S(){var e=Vn.f(),t=so();return e||t}function FS(e){var t=Fr(e);t!==null&&t.tag===5&&t.type==="form"?Lm(t):Vn.r(e)}var Ta=typeof document>"u"?null:document;function wg(e,t,r){var i=Ta;if(i&&typeof t=="string"&&t){var l=Yt(t);l='link[rel="'+e+'"][href="'+l+'"]',typeof r=="string"&&(l+='[crossorigin="'+r+'"]'),Sg.has(l)||(Sg.add(l),e={rel:e,crossOrigin:r,href:t},i.querySelector(l)===null&&(t=i.createElement("link"),ht(t,"link",e),st(t),i.head.appendChild(t)))}}function KS(e){Vn.D(e),wg("dns-prefetch",e,null)}function ZS(e,t){Vn.C(e,t),wg("preconnect",e,t)}function QS(e,t,r){Vn.L(e,t,r);var i=Ta;if(i&&e&&t){var l='link[rel="preload"][as="'+Yt(t)+'"]';t==="image"&&r&&r.imageSrcSet?(l+='[imagesrcset="'+Yt(r.imageSrcSet)+'"]',typeof r.imageSizes=="string"&&(l+='[imagesizes="'+Yt(r.imageSizes)+'"]')):l+='[href="'+Yt(e)+'"]';var d=l;switch(t){case"style":d=Ca(e);break;case"script":d=Aa(e)}Qt.has(d)||(e=x({rel:"preload",href:t==="image"&&r&&r.imageSrcSet?void 0:e,as:t},r),Qt.set(d,e),i.querySelector(l)!==null||t==="style"&&i.querySelector(Oi(d))||t==="script"&&i.querySelector(zi(d))||(t=i.createElement("link"),ht(t,"link",e),st(t),i.head.appendChild(t)))}}function JS(e,t){Vn.m(e,t);var r=Ta;if(r&&e){var i=t&&typeof t.as=="string"?t.as:"script",l='link[rel="modulepreload"][as="'+Yt(i)+'"][href="'+Yt(e)+'"]',d=l;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":d=Aa(e)}if(!Qt.has(d)&&(e=x({rel:"modulepreload",href:e},t),Qt.set(d,e),r.querySelector(l)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(r.querySelector(zi(d)))return}i=r.createElement("link"),ht(i,"link",e),st(i),r.head.appendChild(i)}}}function WS(e,t,r){Vn.S(e,t,r);var i=Ta;if(i&&e){var l=Kr(i).hoistableStyles,d=Ca(e);t=t||"default";var y=l.get(d);if(!y){var w={loading:0,preload:null};if(y=i.querySelector(Oi(d)))w.loading=5;else{e=x({rel:"stylesheet",href:e,"data-precedence":t},r),(r=Qt.get(d))&&Cu(e,r);var D=y=i.createElement("link");st(D),ht(D,"link",e),D._p=new Promise(function(q,K){D.onload=q,D.onerror=K}),D.addEventListener("load",function(){w.loading|=1}),D.addEventListener("error",function(){w.loading|=2}),w.loading|=4,yo(y,t,i)}y={type:"stylesheet",instance:y,count:1,state:w},l.set(d,y)}}}function IS(e,t){Vn.X(e,t);var r=Ta;if(r&&e){var i=Kr(r).hoistableScripts,l=Aa(e),d=i.get(l);d||(d=r.querySelector(zi(l)),d||(e=x({src:e,async:!0},t),(t=Qt.get(l))&&Au(e,t),d=r.createElement("script"),st(d),ht(d,"link",e),r.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},i.set(l,d))}}function e2(e,t){Vn.M(e,t);var r=Ta;if(r&&e){var i=Kr(r).hoistableScripts,l=Aa(e),d=i.get(l);d||(d=r.querySelector(zi(l)),d||(e=x({src:e,async:!0,type:"module"},t),(t=Qt.get(l))&&Au(e,t),d=r.createElement("script"),st(d),ht(d,"link",e),r.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},i.set(l,d))}}function jg(e,t,r,i){var l=(l=de.current)?go(l):null;if(!l)throw Error(o(446));switch(e){case"meta":case"title":return null;case"style":return typeof r.precedence=="string"&&typeof r.href=="string"?(t=Ca(r.href),r=Kr(l).hoistableStyles,i=r.get(t),i||(i={type:"style",instance:null,count:0,state:null},r.set(t,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(r.rel==="stylesheet"&&typeof r.href=="string"&&typeof r.precedence=="string"){e=Ca(r.href);var d=Kr(l).hoistableStyles,y=d.get(e);if(y||(l=l.ownerDocument||l,y={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},d.set(e,y),(d=l.querySelector(Oi(e)))&&!d._p&&(y.instance=d,y.state.loading=5),Qt.has(e)||(r={rel:"preload",as:"style",href:r.href,crossOrigin:r.crossOrigin,integrity:r.integrity,media:r.media,hrefLang:r.hrefLang,referrerPolicy:r.referrerPolicy},Qt.set(e,r),d||t2(l,e,r,y.state))),t&&i===null)throw Error(o(528,""));return y}if(t&&i!==null)throw Error(o(529,""));return null;case"script":return t=r.async,r=r.src,typeof r=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Aa(r),r=Kr(l).hoistableScripts,i=r.get(t),i||(i={type:"script",instance:null,count:0,state:null},r.set(t,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(o(444,e))}}function Ca(e){return'href="'+Yt(e)+'"'}function Oi(e){return'link[rel="stylesheet"]['+e+"]"}function Eg(e){return x({},e,{"data-precedence":e.precedence,precedence:null})}function t2(e,t,r,i){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?i.loading=1:(t=e.createElement("link"),i.preload=t,t.addEventListener("load",function(){return i.loading|=1}),t.addEventListener("error",function(){return i.loading|=2}),ht(t,"link",r),st(t),e.head.appendChild(t))}function Aa(e){return'[src="'+Yt(e)+'"]'}function zi(e){return"script[async]"+e}function Tg(e,t,r){if(t.count++,t.instance===null)switch(t.type){case"style":var i=e.querySelector('style[data-href~="'+Yt(r.href)+'"]');if(i)return t.instance=i,st(i),i;var l=x({},r,{"data-href":r.href,"data-precedence":r.precedence,href:null,precedence:null});return i=(e.ownerDocument||e).createElement("style"),st(i),ht(i,"style",l),yo(i,r.precedence,e),t.instance=i;case"stylesheet":l=Ca(r.href);var d=e.querySelector(Oi(l));if(d)return t.state.loading|=4,t.instance=d,st(d),d;i=Eg(r),(l=Qt.get(l))&&Cu(i,l),d=(e.ownerDocument||e).createElement("link"),st(d);var y=d;return y._p=new Promise(function(w,D){y.onload=w,y.onerror=D}),ht(d,"link",i),t.state.loading|=4,yo(d,r.precedence,e),t.instance=d;case"script":return d=Aa(r.src),(l=e.querySelector(zi(d)))?(t.instance=l,st(l),l):(i=r,(l=Qt.get(d))&&(i=x({},r),Au(i,l)),e=e.ownerDocument||e,l=e.createElement("script"),st(l),ht(l,"link",i),e.head.appendChild(l),t.instance=l);case"void":return null;default:throw Error(o(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(i=t.instance,t.state.loading|=4,yo(i,r.precedence,e));return t.instance}function yo(e,t,r){for(var i=r.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),l=i.length?i[i.length-1]:null,d=l,y=0;y<i.length;y++){var w=i[y];if(w.dataset.precedence===t)d=w;else if(d!==l)break}d?d.parentNode.insertBefore(e,d.nextSibling):(t=r.nodeType===9?r.head:r,t.insertBefore(e,t.firstChild))}function Cu(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function Au(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var vo=null;function Cg(e,t,r){if(vo===null){var i=new Map,l=vo=new Map;l.set(r,i)}else l=vo,i=l.get(r),i||(i=new Map,l.set(r,i));if(i.has(e))return i;for(i.set(e,null),r=r.getElementsByTagName(e),l=0;l<r.length;l++){var d=r[l];if(!(d[Qa]||d[ct]||e==="link"&&d.getAttribute("rel")==="stylesheet")&&d.namespaceURI!=="http://www.w3.org/2000/svg"){var y=d.getAttribute(t)||"";y=e+y;var w=i.get(y);w?w.push(d):i.set(y,[d])}}return i}function Ag(e,t,r){e=e.ownerDocument||e,e.head.insertBefore(r,t==="title"?e.querySelector("head > title"):null)}function n2(e,t,r){if(r===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function Dg(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function r2(e,t,r,i){if(r.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&(r.state.loading&4)===0){if(r.instance===null){var l=Ca(i.href),d=t.querySelector(Oi(l));if(d){t=d._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=xo.bind(e),t.then(e,e)),r.state.loading|=4,r.instance=d,st(d);return}d=t.ownerDocument||t,i=Eg(i),(l=Qt.get(l))&&Cu(i,l),d=d.createElement("link"),st(d);var y=d;y._p=new Promise(function(w,D){y.onload=w,y.onerror=D}),ht(d,"link",i),r.instance=d}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(r,t),(t=r.state.preload)&&(r.state.loading&3)===0&&(e.count++,r=xo.bind(e),t.addEventListener("load",r),t.addEventListener("error",r))}}var Du=0;function a2(e,t){return e.stylesheets&&e.count===0&&So(e,e.stylesheets),0<e.count||0<e.imgCount?function(r){var i=setTimeout(function(){if(e.stylesheets&&So(e,e.stylesheets),e.unsuspend){var d=e.unsuspend;e.unsuspend=null,d()}},6e4+t);0<e.imgBytes&&Du===0&&(Du=62500*LS());var l=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&So(e,e.stylesheets),e.unsuspend)){var d=e.unsuspend;e.unsuspend=null,d()}},(e.imgBytes>Du?50:800)+t);return e.unsuspend=r,function(){e.unsuspend=null,clearTimeout(i),clearTimeout(l)}}:null}function xo(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)So(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var bo=null;function So(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,bo=new Map,t.forEach(i2,e),bo=null,xo.call(e))}function i2(e,t){if(!(t.state.loading&4)){var r=bo.get(e);if(r)var i=r.get(null);else{r=new Map,bo.set(e,r);for(var l=e.querySelectorAll("link[data-precedence],style[data-precedence]"),d=0;d<l.length;d++){var y=l[d];(y.nodeName==="LINK"||y.getAttribute("media")!=="not all")&&(r.set(y.dataset.precedence,y),i=y)}i&&r.set(null,i)}l=t.instance,y=l.getAttribute("data-precedence"),d=r.get(y)||i,d===i&&r.set(null,l),r.set(y,l),this.count++,i=xo.bind(this),l.addEventListener("load",i),l.addEventListener("error",i),d?d.parentNode.insertBefore(l,d.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(l,e.firstChild)),t.state.loading|=4}}var _i={$$typeof:_,Provider:null,Consumer:null,_currentValue:se,_currentValue2:se,_threadCount:0};function s2(e,t,r,i,l,d,y,w,D){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=jl(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=jl(0),this.hiddenUpdates=jl(null),this.identifierPrefix=i,this.onUncaughtError=l,this.onCaughtError=d,this.onRecoverableError=y,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=D,this.incompleteTransitions=new Map}function Ng(e,t,r,i,l,d,y,w,D,q,K,W){return e=new s2(e,t,r,y,D,q,K,W,w),t=1,d===!0&&(t|=24),d=Ot(3,null,null,t),e.current=d,d.stateNode=e,t=oc(),t.refCount++,e.pooledCache=t,t.refCount++,d.memoizedState={element:i,isDehydrated:r,cache:t},dc(d),e}function Mg(e){return e?(e=aa,e):aa}function kg(e,t,r,i,l,d){l=Mg(l),i.context===null?i.context=l:i.pendingContext=l,i=Zn(t),i.payload={element:r},d=d===void 0?null:d,d!==null&&(i.callback=d),r=Qn(e,i,t),r!==null&&(Dt(r,e,t),hi(r,e,t))}function Rg(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var r=e.retryLane;e.retryLane=r!==0&&r<t?r:t}}function Nu(e,t){Rg(e,t),(e=e.alternate)&&Rg(e,t)}function Og(e){if(e.tag===13||e.tag===31){var t=Er(e,67108864);t!==null&&Dt(t,e,67108864),Nu(e,67108864)}}function zg(e){if(e.tag===13||e.tag===31){var t=Lt();t=El(t);var r=Er(e,t);r!==null&&Dt(r,e,t),Nu(e,t)}}var wo=!0;function o2(e,t,r,i){var l=U.T;U.T=null;var d=ae.p;try{ae.p=2,Mu(e,t,r,i)}finally{ae.p=d,U.T=l}}function l2(e,t,r,i){var l=U.T;U.T=null;var d=ae.p;try{ae.p=8,Mu(e,t,r,i)}finally{ae.p=d,U.T=l}}function Mu(e,t,r,i){if(wo){var l=ku(i);if(l===null)gu(e,t,i,jo,r),Vg(e,i);else if(u2(l,e,t,r,i))i.stopPropagation();else if(Vg(e,i),t&4&&-1<c2.indexOf(e)){for(;l!==null;){var d=Fr(l);if(d!==null)switch(d.tag){case 3:if(d=d.stateNode,d.current.memoizedState.isDehydrated){var y=xr(d.pendingLanes);if(y!==0){var w=d;for(w.pendingLanes|=2,w.entangledLanes|=2;y;){var D=1<<31-kt(y);w.entanglements[1]|=D,y&=~D}fn(d),(Oe&6)===0&&(ao=Nt()+500,Ni(0))}}break;case 31:case 13:w=Er(d,2),w!==null&&Dt(w,d,2),so(),Nu(d,2)}if(d=ku(i),d===null&&gu(e,t,i,jo,r),d===l)break;l=d}l!==null&&i.stopPropagation()}else gu(e,t,i,null,r)}}function ku(e){return e=Ol(e),Ru(e)}var jo=null;function Ru(e){if(jo=null,e=$r(e),e!==null){var t=h(e);if(t===null)e=null;else{var r=t.tag;if(r===13){if(e=f(t),e!==null)return e;e=null}else if(r===31){if(e=m(t),e!==null)return e;e=null}else if(r===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return jo=e,null}function _g(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Kb()){case Gf:return 2;case Pf:return 8;case ds:case Zb:return 32;case Xf:return 268435456;default:return 32}default:return 32}}var Ou=!1,or=null,lr=null,cr=null,Vi=new Map,Bi=new Map,ur=[],c2="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Vg(e,t){switch(e){case"focusin":case"focusout":or=null;break;case"dragenter":case"dragleave":lr=null;break;case"mouseover":case"mouseout":cr=null;break;case"pointerover":case"pointerout":Vi.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Bi.delete(t.pointerId)}}function Li(e,t,r,i,l,d){return e===null||e.nativeEvent!==d?(e={blockedOn:t,domEventName:r,eventSystemFlags:i,nativeEvent:d,targetContainers:[l]},t!==null&&(t=Fr(t),t!==null&&Og(t)),e):(e.eventSystemFlags|=i,t=e.targetContainers,l!==null&&t.indexOf(l)===-1&&t.push(l),e)}function u2(e,t,r,i,l){switch(t){case"focusin":return or=Li(or,e,t,r,i,l),!0;case"dragenter":return lr=Li(lr,e,t,r,i,l),!0;case"mouseover":return cr=Li(cr,e,t,r,i,l),!0;case"pointerover":var d=l.pointerId;return Vi.set(d,Li(Vi.get(d)||null,e,t,r,i,l)),!0;case"gotpointercapture":return d=l.pointerId,Bi.set(d,Li(Bi.get(d)||null,e,t,r,i,l)),!0}return!1}function Bg(e){var t=$r(e.target);if(t!==null){var r=h(t);if(r!==null){if(t=r.tag,t===13){if(t=f(r),t!==null){e.blockedOn=t,Jf(e.priority,function(){zg(r)});return}}else if(t===31){if(t=m(r),t!==null){e.blockedOn=t,Jf(e.priority,function(){zg(r)});return}}else if(t===3&&r.stateNode.current.memoizedState.isDehydrated){e.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Eo(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var r=ku(e.nativeEvent);if(r===null){r=e.nativeEvent;var i=new r.constructor(r.type,r);Rl=i,r.target.dispatchEvent(i),Rl=null}else return t=Fr(r),t!==null&&Og(t),e.blockedOn=r,!1;t.shift()}return!0}function Lg(e,t,r){Eo(e)&&r.delete(t)}function d2(){Ou=!1,or!==null&&Eo(or)&&(or=null),lr!==null&&Eo(lr)&&(lr=null),cr!==null&&Eo(cr)&&(cr=null),Vi.forEach(Lg),Bi.forEach(Lg)}function To(e,t){e.blockedOn===t&&(e.blockedOn=null,Ou||(Ou=!0,n.unstable_scheduleCallback(n.unstable_NormalPriority,d2)))}var Co=null;function Ug(e){Co!==e&&(Co=e,n.unstable_scheduleCallback(n.unstable_NormalPriority,function(){Co===e&&(Co=null);for(var t=0;t<e.length;t+=3){var r=e[t],i=e[t+1],l=e[t+2];if(typeof i!="function"){if(Ru(i||r)===null)continue;break}var d=Fr(r);d!==null&&(e.splice(t,3),t-=3,kc(d,{pending:!0,data:l,method:r.method,action:i},i,l))}}))}function Da(e){function t(D){return To(D,e)}or!==null&&To(or,e),lr!==null&&To(lr,e),cr!==null&&To(cr,e),Vi.forEach(t),Bi.forEach(t);for(var r=0;r<ur.length;r++){var i=ur[r];i.blockedOn===e&&(i.blockedOn=null)}for(;0<ur.length&&(r=ur[0],r.blockedOn===null);)Bg(r),r.blockedOn===null&&ur.shift();if(r=(e.ownerDocument||e).$$reactFormReplay,r!=null)for(i=0;i<r.length;i+=3){var l=r[i],d=r[i+1],y=l[wt]||null;if(typeof d=="function")y||Ug(r);else if(y){var w=null;if(d&&d.hasAttribute("formAction")){if(l=d,y=d[wt]||null)w=y.formAction;else if(Ru(l)!==null)continue}else w=y.action;typeof w=="function"?r[i+1]=w:(r.splice(i,3),i-=3),Ug(r)}}}function Hg(){function e(d){d.canIntercept&&d.info==="react-transition"&&d.intercept({handler:function(){return new Promise(function(y){return l=y})},focusReset:"manual",scroll:"manual"})}function t(){l!==null&&(l(),l=null),i||setTimeout(r,20)}function r(){if(!i&&!navigation.transition){var d=navigation.currentEntry;d&&d.url!=null&&navigation.navigate(d.url,{state:d.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,l=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(r,100),function(){i=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),l!==null&&(l(),l=null)}}}function zu(e){this._internalRoot=e}Ao.prototype.render=zu.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(o(409));var r=t.current,i=Lt();kg(r,i,e,t,null,null)},Ao.prototype.unmount=zu.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;kg(e.current,2,null,e,null,null),so(),t[Xr]=null}};function Ao(e){this._internalRoot=e}Ao.prototype.unstable_scheduleHydration=function(e){if(e){var t=Qf();e={blockedOn:null,target:e,priority:t};for(var r=0;r<ur.length&&t!==0&&t<ur[r].priority;r++);ur.splice(r,0,e),r===0&&Bg(e)}};var qg=a.version;if(qg!=="19.2.8")throw Error(o(527,qg,"19.2.8"));ae.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(o(188)):(e=Object.keys(e).join(","),Error(o(268,e)));return e=p(t),e=e!==null?v(e):null,e=e===null?null:e.stateNode,e};var f2={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:U,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Do=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Do.isDisabled&&Do.supportsFiber)try{Fa=Do.inject(f2),Mt=Do}catch{}}return Hi.createRoot=function(e,t){if(!c(e))throw Error(o(299));var r=!1,i="",l=Km,d=Zm,y=Qm;return t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onUncaughtError!==void 0&&(l=t.onUncaughtError),t.onCaughtError!==void 0&&(d=t.onCaughtError),t.onRecoverableError!==void 0&&(y=t.onRecoverableError)),t=Ng(e,1,!1,null,null,r,i,null,l,d,y,Hg),e[Xr]=t.current,pu(e),new zu(t)},Hi.hydrateRoot=function(e,t,r){if(!c(e))throw Error(o(299));var i=!1,l="",d=Km,y=Zm,w=Qm,D=null;return r!=null&&(r.unstable_strictMode===!0&&(i=!0),r.identifierPrefix!==void 0&&(l=r.identifierPrefix),r.onUncaughtError!==void 0&&(d=r.onUncaughtError),r.onCaughtError!==void 0&&(y=r.onCaughtError),r.onRecoverableError!==void 0&&(w=r.onRecoverableError),r.formState!==void 0&&(D=r.formState)),t=Ng(e,1,!0,t,r??null,i,l,D,d,y,w,Hg),t.context=Mg(null),r=t.current,i=Lt(),i=El(i),l=Zn(i),l.callback=null,Qn(r,l,i),r=i,t.current.lanes=r,Za(t,r),fn(t),e[Xr]=t.current,pu(e),new Ao(t)},Hi.version="19.2.8",Hi}var Jg;function w2(){if(Jg)return Bu.exports;Jg=1;function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(a){console.error(a)}}return n(),Bu.exports=S2(),Bu.exports}var Wd=w2();const j2=Jv(Wd),Id=S.createContext({});function ef(n){const a=S.useRef(null);return a.current===null&&(a.current=n()),a.current}const E2=typeof window<"u",tf=E2?S.useLayoutEffect:S.useEffect,ul=S.createContext(null);function nf(n,a){n.indexOf(a)===-1&&n.push(a)}function Wo(n,a){const s=n.indexOf(a);s>-1&&n.splice(s,1)}const vn=(n,a,s)=>s>a?a:s<n?n:s;let dl=()=>{};const pr={},e0=n=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n),t0=n=>typeof n=="object"&&n!==null,n0=n=>/^0[^.\s]+$/u.test(n);function r0(n){let a;return()=>(a===void 0&&(a=n()),a)}const It=n=>n,is=(...n)=>n.reduce((a,s)=>o=>s(a(o))),Ji=(n,a,s)=>{const o=a-n;return o?(s-n)/o:1};class rf{constructor(){this.subscriptions=[]}add(a){return nf(this.subscriptions,a),()=>Wo(this.subscriptions,a)}notify(a,s,o){const c=this.subscriptions.length;if(c)if(c===1)this.subscriptions[0](a,s,o);else for(let h=0;h<c;h++){const f=this.subscriptions[h];f&&f(a,s,o)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}}const Ht=n=>n*1e3,Wt=n=>n/1e3,a0=(n,a)=>a?n*(1e3/a):0,i0=(n,a,s)=>(((1-3*s+3*a)*n+(3*s-6*a))*n+3*a)*n,T2=1e-7,C2=12;function A2(n,a,s,o,c){let h,f,m=0;do f=a+(s-a)/2,h=i0(f,o,c)-n,h>0?s=f:a=f;while(Math.abs(h)>T2&&++m<C2);return f}function ss(n,a,s,o){if(n===a&&s===o)return It;const c=h=>A2(h,0,1,n,s);return h=>h===0||h===1?h:i0(c(h),a,o)}const s0=n=>a=>a<=.5?n(2*a)/2:(2-n(2*(1-a)))/2,o0=n=>a=>1-n(1-a),l0=ss(.33,1.53,.69,.99),af=o0(l0),c0=s0(af),u0=n=>n>=1?1:(n*=2)<1?.5*af(n):.5*(2-Math.pow(2,-10*(n-1))),sf=n=>1-Math.sin(Math.acos(n)),d0=o0(sf),f0=s0(sf),D2=ss(.42,0,1,1),N2=ss(0,0,.58,1),h0=ss(.42,0,.58,1),M2=n=>Array.isArray(n)&&typeof n[0]!="number",m0=n=>Array.isArray(n)&&typeof n[0]=="number",k2={linear:It,easeIn:D2,easeInOut:h0,easeOut:N2,circIn:sf,circInOut:f0,circOut:d0,backIn:af,backInOut:c0,backOut:l0,anticipate:u0},R2=n=>typeof n=="string",Wg=n=>{if(m0(n)){dl(n.length===4);const[a,s,o,c]=n;return ss(a,s,o,c)}else if(R2(n))return k2[n];return n},No=["setup","read","resolveKeyframes","preUpdate","update","preRender","render","postRender"];function O2(n){let a=new Set,s=new Set,o=!1,c=!1;const h=new WeakSet;let f={delta:0,timestamp:0,isProcessing:!1};function m(p){h.has(p)&&(g.schedule(p),n()),p(f)}const g={schedule:(p,v=!1,x=!1)=>{const j=x&&o?a:s;return v&&h.add(p),j.add(p),p},cancel:p=>{s.delete(p),h.delete(p)},process:p=>{if(f=p,o){c=!0;return}o=!0;const v=a;a=s,s=v,a.forEach(m),a.clear(),o=!1,c&&(c=!1,g.process(p))}};return g}const z2=40;function p0(n,a){let s=!1,o=!0;const c={delta:0,timestamp:0,isProcessing:!1},h=()=>s=!0,f=No.reduce((_,V)=>(_[V]=O2(h),_),{}),{setup:m,read:g,resolveKeyframes:p,preUpdate:v,update:x,preRender:b,render:j,postRender:E}=f,T=()=>{const _=pr.useManualTiming,V=_?c.timestamp:performance.now();s=!1,_||(c.delta=o?1e3/60:Math.max(Math.min(V-c.timestamp,z2),1)),c.timestamp=V,c.isProcessing=!0,m.process(c),g.process(c),p.process(c),v.process(c),x.process(c),b.process(c),j.process(c),E.process(c),c.isProcessing=!1,s&&a&&(o=!1,n(T))},A=()=>{s=!0,o=!0,c.isProcessing||n(T)};return{schedule:No.reduce((_,V)=>{const L=f[V];return _[V]=(P,k=!1,N=!1)=>(s||A(),L.schedule(P,k,N)),_},{}),cancel:_=>{for(let V=0;V<No.length;V++)f[No[V]].cancel(_)},state:c,steps:f}}const{schedule:Ye,cancel:gr,state:mt,steps:qu}=p0(typeof requestAnimationFrame<"u"?requestAnimationFrame:It,!0);let qo;function _2(){qo=void 0}const xt={now:()=>(qo===void 0&&xt.set(mt.isProcessing||pr.useManualTiming?mt.timestamp:performance.now()),qo),set:n=>{qo=n,queueMicrotask(_2)}},g0=n=>a=>typeof a=="string"&&a.startsWith(n),y0=g0("--"),V2=g0("var(--"),of=n=>V2(n)?B2.test(n.split("/*")[0].trim()):!1,B2=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;function Ig(n){return typeof n!="string"?!1:n.split("/*")[0].includes("var(--")}const qa={test:n=>typeof n=="number",parse:parseFloat,transform:n=>n},Wi={...qa,transform:n=>vn(0,1,n)},Mo={...qa,default:1},Xi=n=>Math.round(n*1e5)/1e5,lf=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function L2(n){return n==null}const U2=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,cf=(n,a)=>s=>!!(typeof s=="string"&&U2.test(s)&&s.startsWith(n)||a&&!L2(s)&&Object.prototype.hasOwnProperty.call(s,a)),v0=(n,a,s)=>o=>{if(typeof o!="string")return o;const[c,h,f,m]=o.match(lf);return{[n]:parseFloat(c),[a]:parseFloat(h),[s]:parseFloat(f),alpha:m!==void 0?parseFloat(m):1}},H2=n=>vn(0,255,n),Yu={...qa,transform:n=>Math.round(H2(n))},Ur={test:cf("rgb","red"),parse:v0("red","green","blue"),transform:({red:n,green:a,blue:s,alpha:o=1})=>"rgba("+Yu.transform(n)+", "+Yu.transform(a)+", "+Yu.transform(s)+", "+Xi(Wi.transform(o))+")"};function q2(n){let a="",s="",o="",c="";return n.length>5?(a=n.substring(1,3),s=n.substring(3,5),o=n.substring(5,7),c=n.substring(7,9)):(a=n.substring(1,2),s=n.substring(2,3),o=n.substring(3,4),c=n.substring(4,5),a+=a,s+=s,o+=o,c+=c),{red:parseInt(a,16),green:parseInt(s,16),blue:parseInt(o,16),alpha:c?parseInt(c,16)/255:1}}const fd={test:cf("#"),parse:q2,transform:Ur.transform},os=n=>({test:a=>typeof a=="string"&&a.endsWith(n)&&a.split(" ").length===1,parse:parseFloat,transform:a=>`${a}${n}`}),Bn=os("deg"),yn=os("%"),he=os("px"),Y2=os("vh"),G2=os("vw"),ey={...yn,parse:n=>yn.parse(n)/100,transform:n=>yn.transform(n*100)},za={test:cf("hsl","hue"),parse:v0("hue","saturation","lightness"),transform:({hue:n,saturation:a,lightness:s,alpha:o=1})=>"hsla("+Math.round(n)+", "+yn.transform(Xi(a))+", "+yn.transform(Xi(s))+", "+Xi(Wi.transform(o))+")"},rt={test:n=>Ur.test(n)||fd.test(n)||za.test(n),parse:n=>Ur.test(n)?Ur.parse(n):za.test(n)?za.parse(n):fd.parse(n),transform:n=>typeof n=="string"?n:n.hasOwnProperty("red")?Ur.transform(n):za.transform(n),getAnimatableNone:n=>{const a=rt.parse(n);return a.alpha=0,rt.transform(a)}},P2=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;function X2(n){var a,s;return isNaN(n)&&typeof n=="string"&&(((a=n.match(lf))==null?void 0:a.length)||0)+(((s=n.match(P2))==null?void 0:s.length)||0)>0}const x0="number",b0="color",$2="var",F2="var(",ty="${}",K2=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function La(n){const a=n.toString(),s=[],o={color:[],number:[],var:[]},c=[];let h=0;const m=a.replace(K2,g=>(rt.test(g)?(o.color.push(h),c.push(b0),s.push(rt.parse(g))):g.startsWith(F2)?(o.var.push(h),c.push($2),s.push(g)):(o.number.push(h),c.push(x0),s.push(parseFloat(g))),++h,ty)).split(ty);return{values:s,split:m,indexes:o,types:c}}function Z2(n){return La(n).values}function S0({split:n,types:a}){const s=n.length;return o=>{let c="";for(let h=0;h<s;h++)if(c+=n[h],o[h]!==void 0){const f=a[h];f===x0?c+=Xi(o[h]):f===b0?c+=rt.transform(o[h]):c+=o[h]}return c}}function Q2(n){return S0(La(n))}const J2=n=>typeof n=="number"?0:rt.test(n)?rt.getAnimatableNone(n):n,W2=(n,a)=>typeof n=="number"?a!=null&&a.trim().endsWith("/")?n:0:J2(n);function I2(n){const a=La(n);return S0(a)(a.values.map((o,c)=>W2(o,a.split[c])))}const sn={test:X2,parse:Z2,createTransformer:Q2,getAnimatableNone:I2};function Gu(n,a,s){return s<0&&(s+=1),s>1&&(s-=1),s<1/6?n+(a-n)*6*s:s<1/2?a:s<2/3?n+(a-n)*(2/3-s)*6:n}function ew({hue:n,saturation:a,lightness:s,alpha:o}){n/=360,a/=100,s/=100;let c=0,h=0,f=0;if(!a)c=h=f=s;else{const m=s<.5?s*(1+a):s+a-s*a,g=2*s-m;c=Gu(g,m,n+1/3),h=Gu(g,m,n),f=Gu(g,m,n-1/3)}return{red:Math.round(c*255),green:Math.round(h*255),blue:Math.round(f*255),alpha:o}}function Io(n,a){return s=>s>0?a:n}const qe=(n,a,s)=>n+(a-n)*s,Pu=(n,a,s)=>{const o=n*n,c=s*(a*a-o)+o;return c<0?0:Math.sqrt(c)},tw=[fd,Ur,za],nw=n=>tw.find(a=>a.test(n));function ny(n){const a=nw(n);if(!a)return!1;let s=a.parse(n);return a===za&&(s=ew(s)),s}const ry=(n,a)=>{const s=ny(n),o=ny(a);if(!s||!o)return Io(n,a);const c={...s};return h=>(c.red=Pu(s.red,o.red,h),c.green=Pu(s.green,o.green,h),c.blue=Pu(s.blue,o.blue,h),c.alpha=qe(s.alpha,o.alpha,h),Ur.transform(c))},hd=new Set(["none","hidden"]);function rw(n,a){return hd.has(n)?s=>s<=0?n:a:s=>s>=1?a:n}function aw(n,a){return s=>qe(n,a,s)}function uf(n){return typeof n=="number"?aw:typeof n=="string"?of(n)?Io:rt.test(n)?ry:ow:Array.isArray(n)?w0:typeof n=="object"?rt.test(n)?ry:iw:Io}function w0(n,a){const s=[...n],o=s.length,c=n.map((h,f)=>uf(h)(h,a[f]));return h=>{for(let f=0;f<o;f++)s[f]=c[f](h);return s}}function iw(n,a){const s={...n,...a},o={};for(const c in s)n[c]!==void 0&&a[c]!==void 0&&(o[c]=uf(n[c])(n[c],a[c]));return c=>{for(const h in o)s[h]=o[h](c);return s}}function sw(n,a){const s=[],o={color:0,var:0,number:0};for(let c=0;c<a.values.length;c++){const h=a.types[c],f=n.indexes[h][o[h]],m=n.values[f]??0;s[c]=m,o[h]++}return s}const ow=(n,a)=>{const s=sn.createTransformer(a),o=La(n),c=La(a);return o.indexes.var.length===c.indexes.var.length&&o.indexes.color.length===c.indexes.color.length&&o.indexes.number.length>=c.indexes.number.length?hd.has(n)&&!c.values.length||hd.has(a)&&!o.values.length?rw(n,a):is(w0(sw(o,c),c.values),s):Io(n,a)};function j0(n,a,s){return typeof n=="number"&&typeof a=="number"&&typeof s=="number"?qe(n,a,s):uf(n)(n,a)}const lw=n=>{const a=({timestamp:s})=>n(s);return{start:(s=!0)=>Ye.update(a,s),stop:()=>gr(a),now:()=>mt.isProcessing?mt.timestamp:xt.now()}},E0=(n,a,s=10)=>{let o="";const c=Math.max(Math.round(a/s),2);for(let h=0;h<c;h++)o+=Math.round(n(h/(c-1))*1e4)/1e4+", ";return`linear(${o.substring(0,o.length-2)})`},el=2e4;function df(n){let a=0;const s=50;let o=n.next(a);for(;!o.done&&a<el;)a+=s,o=n.next(a);return a>=el?1/0:a}function cw(n,a=100,s){const o=s({...n,keyframes:[0,a]}),c=Math.min(df(o),el);return{type:"keyframes",ease:h=>o.next(c*h).value/a,duration:Wt(c)}}const Ze={stiffness:100,damping:10,mass:1,velocity:0,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05,maxDamping:1};function md(n,a){return n*Math.sqrt(1-a*a)}const uw=12;function dw(n,a,s){let o=s;for(let c=1;c<uw;c++)o=o-n(o)/a(o);return o}const Xu=.001;function fw({duration:n=Ze.duration,bounce:a=Ze.bounce,velocity:s=Ze.velocity,mass:o=Ze.mass}){let c,h,f=1-a;f=vn(Ze.minDamping,Ze.maxDamping,f),n=vn(Ze.minDuration,Ze.maxDuration,Wt(n)),f<1?(c=p=>{const v=p*f,x=v*n,b=v-s,j=md(p,f),E=Math.exp(-x);return Xu-b/j*E},h=p=>{const x=p*f*n,b=x*s+s,j=Math.pow(f,2)*Math.pow(p,2)*n,E=Math.exp(-x),T=md(Math.pow(p,2),f);return(-c(p)+Xu>0?-1:1)*((b-j)*E)/T}):(c=p=>{const v=Math.exp(-p*n),x=(p-s)*n+1;return-Xu+v*x},h=p=>{const v=Math.exp(-p*n),x=(s-p)*(n*n);return v*x});const m=5/n,g=dw(c,h,m);if(n=Ht(n),isNaN(g))return{stiffness:Ze.stiffness,damping:Ze.damping,duration:n};{const p=Math.pow(g,2)*o;return{stiffness:p,damping:f*2*Math.sqrt(o*p),duration:n}}}const hw=["duration","bounce"],mw=["stiffness","damping","mass"];function ay(n,a){return a.some(s=>n[s]!==void 0)}function pw(n){let a={velocity:Ze.velocity,stiffness:Ze.stiffness,damping:Ze.damping,mass:Ze.mass,isResolvedFromDuration:!1,...n};if(!ay(n,mw)&&ay(n,hw))if(a.velocity=0,n.visualDuration){const s=n.visualDuration,o=2*Math.PI/(s*1.2),c=o*o,h=2*vn(.05,1,1-(n.bounce||0))*Math.sqrt(c);a={...a,mass:Ze.mass,stiffness:c,damping:h}}else{const s=fw({...n,velocity:0});a={...a,...s,mass:Ze.mass},a.isResolvedFromDuration=!0}return a}function tl(n=Ze.visualDuration,a=Ze.bounce){const s=typeof n!="object"?{visualDuration:n,keyframes:[0,1],bounce:a}:n;let{restSpeed:o,restDelta:c}=s;const h=s.keyframes[0],f=s.keyframes[s.keyframes.length-1],m={done:!1,value:h},{stiffness:g,damping:p,mass:v,duration:x,velocity:b,isResolvedFromDuration:j}=pw({...s,velocity:-Wt(s.velocity||0)}),E=b||0,T=p/(2*Math.sqrt(g*v)),A=f-h,R=Wt(Math.sqrt(g/v)),M=Math.abs(A)<5;o||(o=M?Ze.restSpeed.granular:Ze.restSpeed.default),c||(c=M?Ze.restDelta.granular:Ze.restDelta.default);let _,V,L,P,k,N;if(T<1)L=md(R,T),P=(E+T*R*A)/L,_=F=>{const ee=Math.exp(-T*R*F);return f-ee*(P*Math.sin(L*F)+A*Math.cos(L*F))},k=T*R*P+A*L,N=T*R*A-P*L,V=F=>Math.exp(-T*R*F)*(k*Math.sin(L*F)+N*Math.cos(L*F));else if(T===1){_=ee=>f-Math.exp(-R*ee)*(A+(E+R*A)*ee);const F=E+R*A;V=ee=>Math.exp(-R*ee)*(R*F*ee-E)}else{const F=R*Math.sqrt(T*T-1);_=ce=>{const oe=Math.exp(-T*R*ce),U=Math.min(F*ce,300);return f-oe*((E+T*R*A)*Math.sinh(U)+F*A*Math.cosh(U))/F};const ee=(E+T*R*A)/F,ie=T*R*ee-A*F,ge=T*R*A-ee*F;V=ce=>{const oe=Math.exp(-T*R*ce),U=Math.min(F*ce,300);return oe*(ie*Math.sinh(U)+ge*Math.cosh(U))}}const G={calculatedDuration:j&&x||null,velocity:F=>Ht(V(F)),next:F=>{if(!j&&T<1){const ie=Math.exp(-T*R*F),ge=Math.sin(L*F),ce=Math.cos(L*F),oe=f-ie*(P*ge+A*ce),U=Ht(ie*(k*ge+N*ce));return m.done=Math.abs(U)<=o&&Math.abs(f-oe)<=c,m.value=m.done?f:oe,m}const ee=_(F);if(j)m.done=F>=x;else{const ie=Ht(V(F));m.done=Math.abs(ie)<=o&&Math.abs(f-ee)<=c}return m.value=m.done?f:ee,m},toString:()=>{const F=Math.min(df(G),el),ee=E0(ie=>G.next(F*ie).value,F,30);return F+"ms "+ee},toTransition:()=>{}};return G}tl.applyToOptions=n=>{const a=cw(n,100,tl);return n.ease=a.ease,n.duration=Ht(a.duration),n.type="keyframes",n};const gw=5;function T0(n,a,s){const o=Math.max(a-gw,0);return a0(s-n(o),a-o)}function pd({keyframes:n,velocity:a=0,power:s=.8,timeConstant:o=325,bounceDamping:c=10,bounceStiffness:h=500,modifyTarget:f,min:m,max:g,restDelta:p=.5,restSpeed:v}){const x=n[0],b={done:!1,value:x},j=N=>m!==void 0&&N<m||g!==void 0&&N>g,E=N=>m===void 0?g:g===void 0||Math.abs(m-N)<Math.abs(g-N)?m:g;let T=s*a;const A=x+T,R=f===void 0?A:f(A);R!==A&&(T=R-x);const M=N=>-T*Math.exp(-N/o),_=N=>R+M(N),V=N=>{const G=M(N),F=_(N);b.done=Math.abs(G)<=p,b.value=b.done?R:F};let L,P;const k=N=>{j(b.value)&&(L=N,P=tl({keyframes:[b.value,E(b.value)],velocity:T0(_,N,b.value),damping:c,stiffness:h,restDelta:p,restSpeed:v}))};return k(0),{calculatedDuration:null,next:N=>{let G=!1;return!P&&L===void 0&&(G=!0,V(N),k(N)),L!==void 0&&N>=L?P.next(N-L):(!G&&V(N),b)}}}function yw(n,a,s){const o=[],c=s||pr.mix||j0,h=n.length-1;for(let f=0;f<h;f++){let m=c(n[f],n[f+1]);if(a){const g=Array.isArray(a)?a[f]||It:a;m=is(g,m)}o.push(m)}return o}function vw(n,a,{clamp:s=!0,ease:o,mixer:c}={}){const h=n.length;if(dl(h===a.length),h===1)return()=>a[0];if(h===2&&a[0]===a[1])return()=>a[1];const f=n[0]===n[1];n[0]>n[h-1]&&(n=[...n].reverse(),a=[...a].reverse());const m=yw(a,o,c),g=m.length,p=v=>{if(f&&v<n[0])return a[0];let x=0;if(g>1)for(;x<n.length-2&&!(v<n[x+1]);x++);const b=Ji(n[x],n[x+1],v);return m[x](b)};return s?v=>p(vn(n[0],n[h-1],v)):p}function xw(n,a){const s=n[n.length-1];for(let o=1;o<=a;o++){const c=Ji(0,a,o);n.push(qe(s,1,c))}}function bw(n){const a=[0];return xw(a,n.length-1),a}function Sw(n,a){return n.map(s=>s*a)}function ww(n,a){return n.map(()=>a||h0).splice(0,n.length-1)}function $i({duration:n=300,keyframes:a,times:s,ease:o="easeInOut"}){const c=M2(o)?o.map(Wg):Wg(o),h={done:!1,value:a[0]},f=Sw(s&&s.length===a.length?s:bw(a),n),m=vw(f,a,{ease:Array.isArray(c)?c:ww(a,c)});return{calculatedDuration:n,next:g=>(h.value=m(g),h.done=g>=n,h)}}const jw=n=>n!==null;function fl(n,{repeat:a,repeatType:s="loop"},o,c=1){const h=n.filter(jw),m=c<0||a&&s!=="loop"&&a%2===1?0:h.length-1;return!m||o===void 0?h[m]:o}const Ew={decay:pd,inertia:pd,tween:$i,keyframes:$i,spring:tl};function C0(n){typeof n.type=="string"&&(n.type=Ew[n.type])}class ff{constructor(){this.updateFinished()}get finished(){return this._finished}updateFinished(){this._finished=new Promise(a=>{this.resolve=a})}notifyFinished(){this.resolve()}then(a,s){return this.finished.then(a,s)}}const Tw=n=>n/100;class nl extends ff{constructor(a){super(),this.state="idle",this.startTime=null,this.isStopped=!1,this.currentTime=0,this.holdTime=null,this.playbackSpeed=1,this.delayState={done:!1,value:void 0},this.stop=()=>{var o,c;const{motionValue:s}=this.options;s&&s.updatedAt!==xt.now()&&this.tick(xt.now()),this.isStopped=!0,this.state!=="idle"&&(this.teardown(),(c=(o=this.options).onStop)==null||c.call(o))},this.options=a,this.initAnimation(),this.play(),a.autoplay===!1&&this.pause()}initAnimation(){const{options:a}=this;C0(a);const{type:s=$i,repeat:o=0,repeatDelay:c=0,repeatType:h,velocity:f=0}=a;let{keyframes:m}=a;const g=s||$i;g!==$i&&typeof m[0]!="number"&&(this.mixKeyframes=is(Tw,j0(m[0],m[1])),m=[0,100]);const p=g({...a,keyframes:m});h==="mirror"&&(this.mirroredGenerator=g({...a,keyframes:[...m].reverse(),velocity:-f})),p.calculatedDuration===null&&(p.calculatedDuration=df(p));const{calculatedDuration:v}=p;this.calculatedDuration=v,this.resolvedDuration=v+c,this.totalDuration=this.resolvedDuration*(o+1)-c,this.generator=p}updateTime(a){const s=Math.round(a-this.startTime)*this.playbackSpeed;this.holdTime!==null?this.currentTime=this.holdTime:this.currentTime=s}tick(a,s=!1){const{generator:o,totalDuration:c,mixKeyframes:h,mirroredGenerator:f,resolvedDuration:m,calculatedDuration:g}=this;if(this.startTime===null)return o.next(0);const{delay:p=0,keyframes:v,repeat:x,repeatType:b,repeatDelay:j,type:E,onUpdate:T,finalKeyframe:A}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,a):this.speed<0&&(this.startTime=Math.min(a-c/this.speed,this.startTime)),s?this.currentTime=a:this.updateTime(a);const R=this.currentTime-p*(this.playbackSpeed>=0?1:-1),M=this.playbackSpeed>=0?R<0:R>c;this.currentTime=Math.max(R,0),this.state==="finished"&&this.holdTime===null&&(this.currentTime=c);let _=this.currentTime,V=o;if(x){const N=Math.min(this.currentTime,c)/m;let G=Math.floor(N),F=N%1;!F&&N>=1&&(F=1),F===1&&G--,G=Math.min(G,x+1),!!(G%2)&&(b==="reverse"?(F=1-F,j&&(F-=j/m)):b==="mirror"&&(V=f)),_=vn(0,1,F)*m}let L;M?(this.delayState.value=v[0],L=this.delayState):L=V.next(_),h&&!M&&(L.value=h(L.value));let{done:P}=L;!M&&g!==null&&(P=this.playbackSpeed>=0?this.currentTime>=c:this.currentTime<=0);const k=this.holdTime===null&&(this.state==="finished"||this.state==="running"&&P);return k&&E!==pd&&(L.value=fl(v,this.options,A,this.speed)),T&&T(L.value),k&&this.finish(),L}then(a,s){return this.finished.then(a,s)}get duration(){return Wt(this.calculatedDuration)}get iterationDuration(){const{delay:a=0}=this.options||{};return this.duration+Wt(a)}get time(){return Wt(this.currentTime)}set time(a){a=Ht(a),this.currentTime=a,this.startTime===null||this.holdTime!==null||this.playbackSpeed===0?this.holdTime=a:this.driver&&(this.startTime=this.driver.now()-a/this.playbackSpeed),this.driver?this.driver.start(!1):(this.startTime=0,this.state="paused",this.holdTime=a,this.tick(a))}getGeneratorVelocity(){const a=this.currentTime;if(a<=0)return this.options.velocity||0;if(this.generator.velocity)return this.generator.velocity(a);const s=this.generator.next(a).value;return T0(o=>this.generator.next(o).value,a,s)}get speed(){return this.playbackSpeed}set speed(a){const s=this.playbackSpeed!==a;s&&this.driver&&this.updateTime(xt.now()),this.playbackSpeed=a,s&&this.driver&&(this.time=Wt(this.currentTime))}play(){var c,h;if(this.isStopped)return;const{driver:a=lw,startTime:s}=this.options;this.driver||(this.driver=a(f=>this.tick(f))),(h=(c=this.options).onPlay)==null||h.call(c);const o=this.driver.now();this.state==="finished"?(this.updateFinished(),this.startTime=o):this.holdTime!==null?this.startTime=o-this.holdTime:this.startTime||(this.startTime=s??o),this.state==="finished"&&this.speed<0&&(this.startTime+=this.calculatedDuration),this.holdTime=null,this.state="running",this.driver.start()}pause(){this.state="paused",this.updateTime(xt.now()),this.holdTime=this.currentTime}complete(){this.state!=="running"&&this.play(),this.state="finished",this.holdTime=null}finish(){var a,s;this.notifyFinished(),this.teardown(),this.state="finished",(s=(a=this.options).onComplete)==null||s.call(a)}cancel(){var a,s;this.holdTime=null,this.startTime=0,this.tick(0),this.teardown(),(s=(a=this.options).onCancel)==null||s.call(a)}teardown(){this.state="idle",this.stopDriver(),this.startTime=this.holdTime=null}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(a){return this.startTime=0,this.tick(a,!0)}attachTimeline(a){var s;return this.options.allowFlatten&&(this.options.type="keyframes",this.options.ease="linear",this.initAnimation()),(s=this.driver)==null||s.stop(),a.observe(this)}}function Cw(n){for(let a=1;a<n.length;a++)n[a]??(n[a]=n[a-1])}const Hr=n=>n*180/Math.PI,gd=n=>{const a=Hr(Math.atan2(n[1],n[0]));return yd(a)},Aw={x:4,y:5,translateX:4,translateY:5,scaleX:0,scaleY:3,scale:n=>(Math.abs(n[0])+Math.abs(n[3]))/2,rotate:gd,rotateZ:gd,skewX:n=>Hr(Math.atan(n[1])),skewY:n=>Hr(Math.atan(n[2])),skew:n=>(Math.abs(n[1])+Math.abs(n[2]))/2},yd=n=>(n=n%360,n<0&&(n+=360),n),iy=gd,sy=n=>Math.sqrt(n[0]*n[0]+n[1]*n[1]),oy=n=>Math.sqrt(n[4]*n[4]+n[5]*n[5]),Dw={x:12,y:13,z:14,translateX:12,translateY:13,translateZ:14,scaleX:sy,scaleY:oy,scale:n=>(sy(n)+oy(n))/2,rotateX:n=>yd(Hr(Math.atan2(n[6],n[5]))),rotateY:n=>yd(Hr(Math.atan2(-n[2],n[0]))),rotateZ:iy,rotate:iy,skewX:n=>Hr(Math.atan(n[4])),skewY:n=>Hr(Math.atan(n[1])),skew:n=>(Math.abs(n[1])+Math.abs(n[4]))/2};function vd(n){return n.includes("scale")?1:0}function xd(n,a){if(!n||n==="none")return vd(a);const s=n.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);let o,c;if(s)o=Dw,c=s;else{const m=n.match(/^matrix\(([-\d.e\s,]+)\)$/u);o=Aw,c=m}if(!c)return vd(a);const h=o[a],f=c[1].split(",").map(Mw);return typeof h=="function"?h(f):f[h]}const Nw=(n,a)=>{const{transform:s="none"}=getComputedStyle(n);return xd(s,a)};function Mw(n){return parseFloat(n.trim())}const Ya=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],Ga=new Set([...Ya,"pathRotation"]),ly=n=>n===qa||n===he,kw=new Set(["x","y","z"]),Rw=Ya.filter(n=>!kw.has(n));function Ow(n){const a=[];return Rw.forEach(s=>{const o=n.getValue(s);o!==void 0&&(a.push([s,o.get()]),o.set(s.startsWith("scale")?1:0))}),a}const mr={width:({x:n},{paddingLeft:a="0",paddingRight:s="0",boxSizing:o})=>{const c=n.max-n.min;return o==="border-box"?c:c-parseFloat(a)-parseFloat(s)},height:({y:n},{paddingTop:a="0",paddingBottom:s="0",boxSizing:o})=>{const c=n.max-n.min;return o==="border-box"?c:c-parseFloat(a)-parseFloat(s)},top:(n,{top:a})=>parseFloat(a),left:(n,{left:a})=>parseFloat(a),bottom:({y:n},{top:a})=>parseFloat(a)+(n.max-n.min),right:({x:n},{left:a})=>parseFloat(a)+(n.max-n.min),x:(n,{transform:a})=>xd(a,"x"),y:(n,{transform:a})=>xd(a,"y")};mr.translateX=mr.x;mr.translateY=mr.y;const qr=new Set;let bd=!1,Sd=!1,wd=!1;function A0(){if(Sd){const n=Array.from(qr).filter(o=>o.needsMeasurement),a=new Set(n.map(o=>o.element)),s=new Map;a.forEach(o=>{const c=Ow(o);c.length&&(s.set(o,c),o.render())}),n.forEach(o=>o.measureInitialState()),a.forEach(o=>{o.render();const c=s.get(o);c&&c.forEach(([h,f])=>{var m;(m=o.getValue(h))==null||m.set(f)})}),n.forEach(o=>o.measureEndState()),n.forEach(o=>{o.suspendedScrollY!==void 0&&window.scrollTo(0,o.suspendedScrollY)})}Sd=!1,bd=!1,qr.forEach(n=>n.complete(wd)),qr.clear()}function D0(){qr.forEach(n=>{n.readKeyframes(),n.needsMeasurement&&(Sd=!0)})}function zw(){wd=!0,D0(),A0(),wd=!1}class hf{constructor(a,s,o,c,h,f=!1){this.state="pending",this.isAsync=!1,this.needsMeasurement=!1,this.unresolvedKeyframes=[...a],this.onComplete=s,this.name=o,this.motionValue=c,this.element=h,this.isAsync=f}scheduleResolve(){this.state="scheduled",this.isAsync?(qr.add(this),bd||(bd=!0,Ye.read(D0),Ye.resolveKeyframes(A0))):(this.readKeyframes(),this.complete())}readKeyframes(){const{unresolvedKeyframes:a,name:s,element:o,motionValue:c}=this;if(a[0]===null){const h=c==null?void 0:c.get(),f=a[a.length-1];if(h!==void 0)a[0]=h;else if(o&&s){const m=o.readValue(s,f);m!=null&&(a[0]=m)}a[0]===void 0&&(a[0]=f),c&&h===void 0&&c.set(a[0])}Cw(a)}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(a=!1){this.state="complete",this.onComplete(this.unresolvedKeyframes,this.finalKeyframe,a),qr.delete(this)}cancel(){this.state==="scheduled"&&(qr.delete(this),this.state="pending")}resume(){this.state==="pending"&&this.scheduleResolve()}}const _w=n=>n.startsWith("--");function N0(n,a,s){_w(a)?n.style.setProperty(a,s):n.style[a]=s}const Vw={};function M0(n,a){const s=r0(n);return()=>Vw[a]??s()}const Bw=M0(()=>window.ScrollTimeline!==void 0,"scrollTimeline"),k0=M0(()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0},"linearEasing"),Gi=([n,a,s,o])=>`cubic-bezier(${n}, ${a}, ${s}, ${o})`,cy={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:Gi([0,.65,.55,1]),circOut:Gi([.55,0,1,.45]),backIn:Gi([.31,.01,.66,-.59]),backOut:Gi([.33,1.53,.69,.99])};function R0(n,a){if(n)return typeof n=="function"?k0()?E0(n,a):"ease-out":m0(n)?Gi(n):Array.isArray(n)?n.map(s=>R0(s,a)||cy.easeOut):cy[n]}function Lw(n,a,s,{delay:o=0,duration:c=300,repeat:h=0,repeatType:f="loop",ease:m="easeOut",times:g}={},p=void 0){const v={[a]:s};g&&(v.offset=g);const x=R0(m,c);Array.isArray(x)&&(v.easing=x);const b={delay:o,duration:c,easing:Array.isArray(x)?"linear":x,fill:"both",iterations:h+1,direction:f==="reverse"?"alternate":"normal"};return p&&(b.pseudoElement=p),n.animate(v,b)}function O0(n){return typeof n=="function"&&"applyToOptions"in n}function Uw({type:n,...a}){return O0(n)&&k0()?n.applyToOptions(a):(a.duration??(a.duration=300),a.ease??(a.ease="easeOut"),a)}class z0 extends ff{constructor(a){if(super(),this.finishedTime=null,this.isStopped=!1,this.manualStartTime=null,!a)return;const{element:s,name:o,keyframes:c,pseudoElement:h,allowFlatten:f=!1,finalKeyframe:m,onComplete:g}=a;this.isPseudoElement=!!h,this.allowFlatten=f,this.options=a,dl(typeof a.type!="string");const p=Uw(a);this.animation=Lw(s,o,c,p,h),p.autoplay===!1&&this.animation.pause(),this.animation.onfinish=()=>{if(this.finishedTime=this.time,!h){const v=fl(c,this.options,m,this.speed);this.updateMotionValue&&this.updateMotionValue(v),N0(s,o,v),this.animation.cancel()}g==null||g(),this.notifyFinished()}}play(){this.isStopped||(this.manualStartTime=null,this.animation.play(),this.state==="finished"&&this.updateFinished())}pause(){this.animation.pause()}complete(){var a,s;(s=(a=this.animation).finish)==null||s.call(a)}cancel(){try{this.animation.cancel()}catch{}}stop(){if(this.isStopped)return;this.isStopped=!0;const{state:a}=this;a==="idle"||a==="finished"||(this.updateMotionValue?this.updateMotionValue():this.commitStyles(),this.isPseudoElement||this.cancel())}commitStyles(){var s,o,c;const a=(s=this.options)==null?void 0:s.element;!this.isPseudoElement&&(a!=null&&a.isConnected)&&((c=(o=this.animation).commitStyles)==null||c.call(o))}get duration(){var s,o;const a=((o=(s=this.animation.effect)==null?void 0:s.getComputedTiming)==null?void 0:o.call(s).duration)||0;return Wt(Number(a))}get iterationDuration(){const{delay:a=0}=this.options||{};return this.duration+Wt(a)}get time(){return Wt(Number(this.animation.currentTime)||0)}set time(a){const s=this.finishedTime!==null;this.manualStartTime=null,this.finishedTime=null,this.animation.currentTime=Ht(a),s&&this.animation.pause()}get speed(){return this.animation.playbackRate}set speed(a){a<0&&(this.finishedTime=null),this.animation.playbackRate=a}get state(){return this.finishedTime!==null?"finished":this.animation.playState}get startTime(){return this.manualStartTime??Number(this.animation.startTime)}set startTime(a){this.manualStartTime=this.animation.startTime=a}attachTimeline({timeline:a,rangeStart:s,rangeEnd:o,observe:c}){var h;return this.allowFlatten&&((h=this.animation.effect)==null||h.updateTiming({easing:"linear"})),this.animation.onfinish=null,a&&Bw()?(this.animation.timeline=a,s&&(this.animation.rangeStart=s),o&&(this.animation.rangeEnd=o),It):c(this)}}const _0={anticipate:u0,backInOut:c0,circInOut:f0};function Hw(n){return n in _0}function qw(n){typeof n.ease=="string"&&Hw(n.ease)&&(n.ease=_0[n.ease])}const $u=10;class Yw extends z0{constructor(a){qw(a),C0(a),super(a),a.startTime!==void 0&&a.autoplay!==!1&&(this.startTime=a.startTime),this.options=a}updateMotionValue(a){const{motionValue:s,onUpdate:o,onComplete:c,element:h,...f}=this.options;if(!s)return;if(a!==void 0){s.set(a);return}const m=new nl({...f,autoplay:!1}),g=Math.max($u,xt.now()-this.startTime),p=vn(0,$u,g-$u),v=m.sample(g).value,{name:x}=this.options;h&&x&&N0(h,x,v),s.setWithVelocity(m.sample(Math.max(0,g-p)).value,v,p),m.stop()}}const uy=(n,a)=>a==="zIndex"?!1:!!(typeof n=="number"||Array.isArray(n)||typeof n=="string"&&(sn.test(n)||n==="0")&&!n.startsWith("url("));function Gw(n){const a=n[0];if(n.length===1)return!0;for(let s=0;s<n.length;s++)if(n[s]!==a)return!0}function Pw(n,a,s,o){const c=n[0];if(c===null)return!1;if(a==="display"||a==="visibility")return!0;const h=n[n.length-1],f=uy(c,a),m=uy(h,a);return!f||!m?!1:Gw(n)||(s==="spring"||O0(s))&&o}function jd(n){n.duration=0,n.type="keyframes"}const V0=new Set(["opacity","clipPath","filter","transform","backgroundColor"]),Xw=/^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;function $w(n){for(let a=0;a<n.length;a++)if(typeof n[a]=="string"&&Xw.test(n[a]))return!0;return!1}const Fw=new Set(["color","backgroundColor","outlineColor","fill","stroke","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"]),Kw=r0(()=>Object.hasOwnProperty.call(Element.prototype,"animate"));function Zw(n){var x;const{motionValue:a,name:s,repeatDelay:o,repeatType:c,damping:h,type:f,keyframes:m}=n,g=(x=a==null?void 0:a.owner)==null?void 0:x.current;if(!(g instanceof HTMLElement)&&!(g instanceof SVGElement))return!1;const{onUpdate:p,transformTemplate:v}=a.owner.getProps();return Kw()&&s&&(V0.has(s)||Fw.has(s)&&$w(m))&&(s!=="transform"||!v)&&!p&&!o&&c!=="mirror"&&h!==0&&f!=="inertia"}const Qw=40;class Jw extends ff{constructor({autoplay:a=!0,delay:s=0,type:o="keyframes",repeat:c=0,repeatDelay:h=0,repeatType:f="loop",keyframes:m,name:g,motionValue:p,element:v,...x}){var E;super(),this.stop=()=>{var T,A;this._animation&&(this._animation.stop(),(T=this.stopTimeline)==null||T.call(this)),(A=this.keyframeResolver)==null||A.cancel()},this.createdAt=xt.now();const b={autoplay:a,delay:s,type:o,repeat:c,repeatDelay:h,repeatType:f,name:g,motionValue:p,element:v,...x},j=(v==null?void 0:v.KeyframeResolver)||hf;this.keyframeResolver=new j(m,(T,A,R)=>this.onKeyframesResolved(T,A,b,!R),g,p,v),(E=this.keyframeResolver)==null||E.scheduleResolve()}onKeyframesResolved(a,s,o,c){var R,M;this.keyframeResolver=void 0;const{name:h,type:f,velocity:m,delay:g,isHandoff:p,onUpdate:v}=o;this.resolvedAt=xt.now();let x=!0;Pw(a,h,f,m)||(x=!1,(pr.instantAnimations||!g)&&(v==null||v(fl(a,o,s))),a[0]=a[a.length-1],jd(o),o.repeat=0);const j={startTime:c?this.resolvedAt?this.resolvedAt-this.createdAt>Qw?this.resolvedAt:this.createdAt:this.createdAt:void 0,finalKeyframe:s,...o,keyframes:a},E=x&&!p&&Zw(j),T=(M=(R=j.motionValue)==null?void 0:R.owner)==null?void 0:M.current;let A;if(E)try{A=new Yw({...j,element:T})}catch{A=new nl(j)}else A=new nl(j);A.finished.then(()=>{this.notifyFinished()}).catch(It),this.pendingTimeline&&(this.stopTimeline=A.attachTimeline(this.pendingTimeline),this.pendingTimeline=void 0),this._animation=A}get finished(){return this._animation?this.animation.finished:this._finished}then(a,s){return this.finished.finally(a).then(()=>{})}get animation(){var a;return this._animation||((a=this.keyframeResolver)==null||a.resume(),zw()),this._animation}get duration(){return this.animation.duration}get iterationDuration(){return this.animation.iterationDuration}get time(){return this.animation.time}set time(a){this.animation.time=a}get speed(){return this.animation.speed}get state(){return this.animation.state}set speed(a){this.animation.speed=a}get startTime(){return this.animation.startTime}attachTimeline(a){return this._animation?this.stopTimeline=this.animation.attachTimeline(a):this.pendingTimeline=a,()=>this.stop()}play(){this.animation.play()}pause(){this.animation.pause()}complete(){this.animation.complete()}cancel(){var a;this._animation&&this.animation.cancel(),(a=this.keyframeResolver)==null||a.cancel()}}function B0(n,a,s,o=0,c=1){const h=Array.from(n).sort((p,v)=>p.sortNodePosition(v)).indexOf(a),f=n.size,m=(f-1)*o;return typeof s=="function"?s(h,f):c===1?h*o:m-h*o}const dy=30,Ww=n=>!isNaN(parseFloat(n));class Iw{constructor(a,s={}){this.canTrackVelocity=null,this.events={},this.updateAndNotify=o=>{var h;const c=xt.now();if(this.updatedAt!==c&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(o),this.current!==this.prev&&((h=this.events.change)==null||h.notify(this.current),this.dependents))for(const f of this.dependents)f.dirty()},this.hasAnimated=!1,this.setCurrent(a),this.owner=s.owner}setCurrent(a){this.current=a,this.updatedAt=xt.now(),this.canTrackVelocity===null&&a!==void 0&&(this.canTrackVelocity=Ww(this.current))}setPrevFrameValue(a=this.current){this.prevFrameValue=a,this.prevUpdatedAt=this.updatedAt}onChange(a){return this.on("change",a)}on(a,s){this.events[a]||(this.events[a]=new rf);const o=this.events[a].add(s);return a==="change"?()=>{o(),Ye.read(()=>{this.events.change.getSize()||this.stop()})}:o}clearListeners(){for(const a in this.events)this.events[a].clear()}attach(a,s){this.passiveEffect=a,this.stopPassiveEffect=s}set(a){this.passiveEffect?this.passiveEffect(a,this.updateAndNotify):this.updateAndNotify(a)}setWithVelocity(a,s,o){this.set(s),this.prev=void 0,this.prevFrameValue=a,this.prevUpdatedAt=this.updatedAt-o}jump(a,s=!0){this.updateAndNotify(a),this.prev=a,this.prevUpdatedAt=this.prevFrameValue=void 0,s&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}dirty(){var a;(a=this.events.change)==null||a.notify(this.current)}addDependent(a){this.dependents||(this.dependents=new Set),this.dependents.add(a)}removeDependent(a){this.dependents&&this.dependents.delete(a)}get(){return this.current}getPrevious(){return this.prev}getVelocity(){const a=xt.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||a-this.updatedAt>dy)return 0;const s=Math.min(this.updatedAt-this.prevUpdatedAt,dy);return a0(parseFloat(this.current)-parseFloat(this.prevFrameValue),s)}start(a){return this.stop(),new Promise(s=>{this.hasAnimated=!0,this.animation=a(s),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){var a,s;(a=this.dependents)==null||a.clear(),(s=this.events.destroy)==null||s.notify(),this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}}function Ua(n,a){return new Iw(n,a)}function L0(n,a){if(n!=null&&n.inherit&&a){const{inherit:s,...o}=n;return{...a,...o}}return n}function mf(n,a){const s=(n==null?void 0:n[a])??(n==null?void 0:n.default)??n;return s!==n?L0(s,n):s}const ej={type:"spring",stiffness:500,damping:25,restSpeed:10},tj=n=>({type:"spring",stiffness:550,damping:n===0?2*Math.sqrt(550):30,restSpeed:10}),nj={type:"keyframes",duration:.8},rj={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},aj=(n,{keyframes:a})=>a.length>2?nj:Ga.has(n)?n.startsWith("scale")?tj(a[1]):ej:rj,ij=new Set(["when","delay","delayChildren","staggerChildren","staggerDirection","repeat","repeatType","repeatDelay","from","elapsed"]);function sj(n){for(const a in n)if(!ij.has(a))return!0;return!1}const pf=(n,a,s,o={},c,h)=>f=>{const m=mf(o,n)||{},g=m.delay||o.delay||0;let{elapsed:p=0}=o;p=p-Ht(g);const v={keyframes:Array.isArray(s)?s:[null,s],ease:"easeOut",velocity:a.getVelocity(),...m,delay:-p,onUpdate:b=>{a.set(b),m.onUpdate&&m.onUpdate(b)},onComplete:()=>{f(),m.onComplete&&m.onComplete()},name:n,motionValue:a,element:h?void 0:c};sj(m)||Object.assign(v,aj(n,v)),v.duration&&(v.duration=Ht(v.duration)),v.repeatDelay&&(v.repeatDelay=Ht(v.repeatDelay)),v.from!==void 0&&(v.keyframes[0]=v.from);let x=!1;if((v.type===!1||v.duration===0&&!v.repeatDelay)&&(jd(v),v.delay===0&&(x=!0)),(pr.instantAnimations||pr.skipAnimations||c!=null&&c.shouldSkipAnimations||m.skipAnimations)&&(x=!0,jd(v),v.delay=0),v.allowFlatten=!m.type&&!m.ease,x&&!h&&a.get()!==void 0){const b=fl(v.keyframes,m);if(b!==void 0){Ye.update(()=>{v.onUpdate(b),v.onComplete()});return}}return m.isSync?new nl(v):new Jw(v)},oj=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function lj(n){const a=oj.exec(n);if(!a)return[,];const[,s,o,c]=a;return[`--${s??o}`,c]}function U0(n,a,s=1){const[o,c]=lj(n);if(!o)return;const h=window.getComputedStyle(a).getPropertyValue(o);if(h){const f=h.trim();return e0(f)?parseFloat(f):f}return of(c)?U0(c,a,s+1):c}function fy(n){const a=[{},{}];return n==null||n.values.forEach((s,o)=>{a[0][o]=s.get(),a[1][o]=s.getVelocity()}),a}function gf(n,a,s,o){if(typeof a=="function"){const[c,h]=fy(o);a=a(s!==void 0?s:n.custom,c,h)}if(typeof a=="string"&&(a=n.variants&&n.variants[a]),typeof a=="function"){const[c,h]=fy(o);a=a(s!==void 0?s:n.custom,c,h)}return a}function Yr(n,a,s){const o=n.getProps();return gf(o,a,s!==void 0?s:o.custom,n)}const H0=new Set(["width","height","top","left","right","bottom",...Ya]),Ed=n=>Array.isArray(n);function cj(n,a,s){n.hasValue(a)?n.getValue(a).set(s):n.addValue(a,Ua(s))}function uj(n){return Ed(n)?n[n.length-1]||0:n}function dj(n,a){const s=Yr(n,a);let{transitionEnd:o={},transition:c={},...h}=s||{};h={...h,...o};for(const f in h){const m=uj(h[f]);cj(n,f,m)}}const pt=n=>!!(n&&n.getVelocity);function fj(n){return!!(pt(n)&&n.add)}function Td(n,a){const s=n.getValue("willChange");if(fj(s))return s.add(a);if(!s&&pr.WillChange){const o=new pr.WillChange("auto");n.addValue("willChange",o),o.add(a)}}function yf(n){return n.replace(/([A-Z])/g,a=>`-${a.toLowerCase()}`)}const hj="framerAppearId",q0="data-"+yf(hj);function Y0(n){return n.props[q0]}function mj({protectedKeys:n,needsAnimating:a},s){const o=n.hasOwnProperty(s)&&a[s]!==!0;return a[s]=!1,o}function G0(n,a,{delay:s=0,transitionOverride:o,type:c}={}){let{transition:h,transitionEnd:f,...m}=a;const g=n.getDefaultTransition();h=h?L0(h,g):g;const p=h==null?void 0:h.reduceMotion,v=h==null?void 0:h.skipAnimations;o&&(h=o);const x=[],b=c&&n.animationState&&n.animationState.getState()[c],j=h==null?void 0:h.path;j&&j.animateVisualElement(n,m,h,s,x);for(const E in m){const T=n.getValue(E,n.latestValues[E]??null),A=m[E];if(A===void 0||b&&mj(b,E))continue;const R={delay:s,...mf(h||{},E)};v&&(R.skipAnimations=!0);const M=T.get();if(M!==void 0&&!T.isAnimating()&&!Array.isArray(A)&&A===M&&!R.velocity){Ye.update(()=>T.set(A));continue}let _=!1;if(window.MotionHandoffAnimation){const P=Y0(n);if(P){const k=window.MotionHandoffAnimation(P,E,Ye);k!==null&&(R.startTime=k,_=!0)}}Td(n,E);const V=p??n.shouldReduceMotion;T.start(pf(E,T,A,V&&H0.has(E)?{type:!1}:R,n,_));const L=T.animation;L&&x.push(L)}if(f){const E=()=>Ye.update(()=>{f&&dj(n,f)});x.length?Promise.all(x).then(E):E()}return x}function Cd(n,a,s={}){var g;const o=Yr(n,a,s.type==="exit"?(g=n.presenceContext)==null?void 0:g.custom:void 0);let{transition:c=n.getDefaultTransition()||{}}=o||{};s.transitionOverride&&(c=s.transitionOverride);const h=o?()=>Promise.all(G0(n,o,s)):()=>Promise.resolve(),f=n.variantChildren&&n.variantChildren.size?(p=0)=>{const{delayChildren:v=0,staggerChildren:x,staggerDirection:b}=c;return pj(n,a,p,v,x,b,s)}:()=>Promise.resolve(),{when:m}=c;if(m){const[p,v]=m==="beforeChildren"?[h,f]:[f,h];return p().then(()=>v())}else return Promise.all([h(),f(s.delay)])}function pj(n,a,s=0,o=0,c=0,h=1,f){const m=[];for(const g of n.variantChildren)g.notify("AnimationStart",a),m.push(Cd(g,a,{...f,delay:s+(typeof o=="function"?0:o)+B0(n.variantChildren,g,o,c,h)}).then(()=>g.notify("AnimationComplete",a)));return Promise.all(m)}function gj(n,a,s={}){n.notify("AnimationStart",a);let o;if(Array.isArray(a)){const c=a.map(h=>Cd(n,h,s));o=Promise.all(c)}else if(typeof a=="string")o=Cd(n,a,s);else{const c=typeof a=="function"?Yr(n,a,s.custom):a;o=Promise.all(G0(n,c,s))}return o.then(()=>{n.notify("AnimationComplete",a)})}const yj={test:n=>n==="auto",parse:n=>n},P0=n=>a=>a.test(n),X0=[qa,he,yn,Bn,G2,Y2,yj],hy=n=>X0.find(P0(n));function vj(n){return typeof n=="number"?n===0:n!==null?n==="none"||n==="0"||n0(n):!0}const xj=new Set(["brightness","contrast","saturate","opacity"]);function bj(n){const[a,s]=n.slice(0,-1).split("(");if(a==="drop-shadow")return n;const[o]=s.match(lf)||[];if(!o)return n;const c=s.replace(o,"");let h=xj.has(a)?1:0;return o!==s&&(h*=100),a+"("+h+c+")"}const Sj=/\b([a-z-]*)\(.*?\)/gu,Ad={...sn,getAnimatableNone:n=>{const a=n.match(Sj);return a?a.map(bj).join(" "):n}},Dd={...sn,getAnimatableNone:n=>{const a=sn.parse(n);return sn.createTransformer(n)(a.map(o=>typeof o=="number"?0:typeof o=="object"?{...o,alpha:1}:o))}},my={...qa,transform:Math.round},wj={rotate:Bn,pathRotation:Bn,rotateX:Bn,rotateY:Bn,rotateZ:Bn,scale:Mo,scaleX:Mo,scaleY:Mo,scaleZ:Mo,skew:Bn,skewX:Bn,skewY:Bn,distance:he,translateX:he,translateY:he,translateZ:he,x:he,y:he,z:he,perspective:he,transformPerspective:he,opacity:Wi,originX:ey,originY:ey,originZ:he},rl={borderWidth:he,borderTopWidth:he,borderRightWidth:he,borderBottomWidth:he,borderLeftWidth:he,borderRadius:he,borderTopLeftRadius:he,borderTopRightRadius:he,borderBottomRightRadius:he,borderBottomLeftRadius:he,width:he,maxWidth:he,height:he,maxHeight:he,top:he,right:he,bottom:he,left:he,inset:he,insetBlock:he,insetBlockStart:he,insetBlockEnd:he,insetInline:he,insetInlineStart:he,insetInlineEnd:he,padding:he,paddingTop:he,paddingRight:he,paddingBottom:he,paddingLeft:he,paddingBlock:he,paddingBlockStart:he,paddingBlockEnd:he,paddingInline:he,paddingInlineStart:he,paddingInlineEnd:he,margin:he,marginTop:he,marginRight:he,marginBottom:he,marginLeft:he,marginBlock:he,marginBlockStart:he,marginBlockEnd:he,marginInline:he,marginInlineStart:he,marginInlineEnd:he,fontSize:he,backgroundPositionX:he,backgroundPositionY:he,...wj,zIndex:my,fillOpacity:Wi,strokeOpacity:Wi,numOctaves:my},jj={...rl,color:rt,backgroundColor:rt,outlineColor:rt,fill:rt,stroke:rt,borderColor:rt,borderTopColor:rt,borderRightColor:rt,borderBottomColor:rt,borderLeftColor:rt,filter:Ad,WebkitFilter:Ad,mask:Dd,WebkitMask:Dd},$0=n=>jj[n],Ej=new Set([Ad,Dd]);function F0(n,a){let s=$0(n);return Ej.has(s)||(s=sn),s.getAnimatableNone?s.getAnimatableNone(a):void 0}const Tj=new Set(["auto","none","0"]);function Cj(n,a,s){let o=0,c;for(;o<n.length&&!c;){const h=n[o];typeof h=="string"&&!Tj.has(h)&&La(h).values.length&&(c=n[o]),o++}if(c&&s)for(const h of a)n[h]=F0(s,c)}class Aj extends hf{constructor(a,s,o,c,h){super(a,s,o,c,h,!0)}readKeyframes(){const{unresolvedKeyframes:a,element:s,name:o}=this;if(!s||!s.current)return;super.readKeyframes();for(let v=0;v<a.length;v++){let x=a[v];if(typeof x=="string"&&(x=x.trim(),of(x))){const b=U0(x,s.current);b!==void 0&&(a[v]=b),v===a.length-1&&(this.finalKeyframe=x)}}if(this.resolveNoneKeyframes(),!H0.has(o)||a.length!==2)return;const[c,h]=a,f=hy(c),m=hy(h),g=Ig(c),p=Ig(h);if(g!==p&&mr[o]){this.needsMeasurement=!0;return}if(f!==m)if(ly(f)&&ly(m))for(let v=0;v<a.length;v++){const x=a[v];typeof x=="string"&&(a[v]=parseFloat(x))}else mr[o]&&(this.needsMeasurement=!0)}resolveNoneKeyframes(){const{unresolvedKeyframes:a,name:s}=this,o=[];for(let c=0;c<a.length;c++)(a[c]===null||vj(a[c]))&&o.push(c);o.length&&Cj(a,o,s)}measureInitialState(){const{element:a,unresolvedKeyframes:s,name:o}=this;if(!a||!a.current)return;o==="height"&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=mr[o](a.measureViewportBox(),window.getComputedStyle(a.current)),s[0]=this.measuredOrigin;const c=s[s.length-1];c!==void 0&&a.getValue(o,c).jump(c,!1)}measureEndState(){var m;const{element:a,name:s,unresolvedKeyframes:o}=this;if(!a||!a.current)return;const c=a.getValue(s);c&&c.jump(this.measuredOrigin,!1);const h=o.length-1,f=o[h];o[h]=mr[s](a.measureViewportBox(),window.getComputedStyle(a.current)),f!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=f),(m=this.removedTransforms)!=null&&m.length&&this.removedTransforms.forEach(([g,p])=>{a.getValue(g).set(p)}),this.resolveNoneKeyframes()}}const vf=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"];function K0(n,a,s){if(n==null)return[];if(n instanceof EventTarget)return[n];if(typeof n=="string"){let o=document;const c=(s==null?void 0:s[n])??o.querySelectorAll(n);return c?Array.from(c):[]}return Array.from(n).filter(o=>o!=null)}const Nd=(n,a)=>a&&typeof n=="number"?a.transform(n):n;function Yo(n){return t0(n)&&"offsetHeight"in n&&!("ownerSVGElement"in n)}const{schedule:xf}=p0(queueMicrotask,!1),an={x:!1,y:!1};function Z0(){return an.x||an.y}function Dj(n){return n==="x"||n==="y"?an[n]?null:(an[n]=!0,()=>{an[n]=!1}):an.x||an.y?null:(an.x=an.y=!0,()=>{an.x=an.y=!1})}function Q0(n,a){const s=K0(n),o=new AbortController,c={passive:!0,...a,signal:o.signal};return[s,c,()=>o.abort()]}function Nj(n){return!(n.pointerType==="touch"||Z0())}function Mj(n,a,s={}){const[o,c,h]=Q0(n,s);return o.forEach(f=>{let m=!1,g=!1,p;const v=()=>{f.removeEventListener("pointerleave",E)},x=A=>{p&&(p(A),p=void 0),v()},b=A=>{m=!1,window.removeEventListener("pointerup",b),window.removeEventListener("pointercancel",b),g&&(g=!1,x(A))},j=()=>{m=!0,window.addEventListener("pointerup",b,c),window.addEventListener("pointercancel",b,c)},E=A=>{if(A.pointerType!=="touch"){if(m){g=!0;return}x(A)}},T=A=>{if(!Nj(A))return;g=!1;const R=a(f,A);typeof R=="function"&&(p=R,f.addEventListener("pointerleave",E,c))};f.addEventListener("pointerenter",T,c),f.addEventListener("pointerdown",j,c)}),h}const J0=(n,a)=>a?n===a?!0:J0(n,a.parentElement):!1,bf=n=>n.pointerType==="mouse"?typeof n.button!="number"||n.button<=0:n.isPrimary!==!1,kj=new Set(["BUTTON","INPUT","SELECT","TEXTAREA","A"]);function Rj(n){return kj.has(n.tagName)||n.isContentEditable===!0}const Oj=new Set(["INPUT","SELECT","TEXTAREA"]);function zj(n){return Oj.has(n.tagName)||n.isContentEditable===!0}const Go=new WeakSet;function py(n){return a=>{a.key==="Enter"&&n(a)}}function Fu(n,a){n.dispatchEvent(new PointerEvent("pointer"+a,{isPrimary:!0,bubbles:!0}))}const _j=(n,a)=>{const s=n.currentTarget;if(!s)return;const o=py(()=>{if(Go.has(s))return;Fu(s,"down");const c=py(()=>{Fu(s,"up")}),h=()=>Fu(s,"cancel");s.addEventListener("keyup",c,a),s.addEventListener("blur",h,a)});s.addEventListener("keydown",o,a),s.addEventListener("blur",()=>s.removeEventListener("keydown",o),a)};function gy(n){return bf(n)&&!Z0()}const yy=new WeakSet;function Vj(n,a,s={}){const[o,c,h]=Q0(n,s),f=m=>{const g=m.currentTarget;if(!gy(m)||yy.has(m))return;Go.add(g),s.stopPropagation&&yy.add(m);const p=a(g,m),v={...c,capture:!0},x=(E,T)=>{window.removeEventListener("pointerup",b,v),window.removeEventListener("pointercancel",j,v),Go.has(g)&&Go.delete(g),gy(E)&&typeof p=="function"&&p(E,{success:T})},b=E=>{x(E,g===window||g===document||s.useGlobalTarget||J0(g,E.target))},j=E=>{x(E,!1)};window.addEventListener("pointerup",b,v),window.addEventListener("pointercancel",j,v)};return o.forEach(m=>{(s.useGlobalTarget?window:m).addEventListener("pointerdown",f,c),Yo(m)&&(m.addEventListener("focus",p=>_j(p,c)),!Rj(m)&&!m.hasAttribute("tabindex")&&(m.tabIndex=0))}),h}function Sf(n){return t0(n)&&"ownerSVGElement"in n}const Po=new WeakMap;let fr;const W0=(n,a,s)=>(o,c)=>c&&c[0]?c[0][n+"Size"]:Sf(o)&&"getBBox"in o?o.getBBox()[a]:o[s],Bj=W0("inline","width","offsetWidth"),Lj=W0("block","height","offsetHeight");function Uj({target:n,borderBoxSize:a}){var s;(s=Po.get(n))==null||s.forEach(o=>{o(n,{get width(){return Bj(n,a)},get height(){return Lj(n,a)}})})}function Hj(n){n.forEach(Uj)}function qj(){typeof ResizeObserver>"u"||(fr=new ResizeObserver(Hj))}function Yj(n,a){fr||qj();const s=K0(n);return s.forEach(o=>{let c=Po.get(o);c||(c=new Set,Po.set(o,c)),c.add(a),fr==null||fr.observe(o)}),()=>{s.forEach(o=>{const c=Po.get(o);c==null||c.delete(a),c!=null&&c.size||fr==null||fr.unobserve(o)})}}const Xo=new Set;let _a;function Gj(){_a=()=>{const n={get width(){return window.innerWidth},get height(){return window.innerHeight}};Xo.forEach(a=>a(n))},window.addEventListener("resize",_a)}function Pj(n){return Xo.add(n),_a||Gj(),()=>{Xo.delete(n),!Xo.size&&typeof _a=="function"&&(window.removeEventListener("resize",_a),_a=void 0)}}function vy(n,a){return typeof n=="function"?Pj(n):Yj(n,a)}function Xj(n){return Sf(n)&&n.tagName==="svg"}const $j=[...X0,rt,sn],Fj=n=>$j.find(P0(n)),xy=()=>({translate:0,scale:1,origin:0,originPoint:0}),Va=()=>({x:xy(),y:xy()}),by=()=>({min:0,max:0}),it=()=>({x:by(),y:by()}),Kj=new WeakMap;function hl(n){return n!==null&&typeof n=="object"&&typeof n.start=="function"}function Ii(n){return typeof n=="string"||Array.isArray(n)}const wf=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],jf=["initial",...wf];function ml(n){return hl(n.animate)||jf.some(a=>Ii(n[a]))}function I0(n){return!!(ml(n)||n.variants)}function Zj(n,a,s){for(const o in a){const c=a[o],h=s[o];if(pt(c))n.addValue(o,c);else if(pt(h))n.addValue(o,Ua(c,{owner:n}));else if(h!==c)if(n.hasValue(o)){const f=n.getValue(o);f.liveStyle===!0?f.jump(c):f.hasAnimated||f.set(c)}else{const f=n.getStaticValue(o);n.addValue(o,Ua(f!==void 0?f:c,{owner:n}))}}for(const o in s)a[o]===void 0&&n.removeValue(o);return a}const al={current:null},Ef={current:!1},Qj=typeof window<"u";function ex(){if(Ef.current=!0,!!Qj)if(window.matchMedia){const n=window.matchMedia("(prefers-reduced-motion)"),a=()=>al.current=n.matches;n.addEventListener("change",a),a()}else al.current=!1}const Sy=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"];let il={};function tx(n){il=n}function Jj(){return il}class Wj{scrapeMotionValuesFromProps(a,s,o){return{}}constructor({parent:a,props:s,presenceContext:o,reducedMotionConfig:c,skipAnimations:h,blockInitialAnimation:f,visualState:m},g={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.shouldSkipAnimations=!1,this.values=new Map,this.KeyframeResolver=hf,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.hasBeenMounted=!1,this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{const j=xt.now();this.renderScheduledAt<j&&(this.renderScheduledAt=j,Ye.render(this.render,!1,!0))};const{latestValues:p,renderState:v}=m;this.latestValues=p,this.baseTarget={...p},this.initialValues=s.initial?{...p}:{},this.renderState=v,this.parent=a,this.props=s,this.presenceContext=o,this.depth=a?a.depth+1:0,this.reducedMotionConfig=c,this.skipAnimationsConfig=h,this.options=g,this.blockInitialAnimation=!!f,this.isControllingVariants=ml(s),this.isVariantNode=I0(s),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(a&&a.current);const{willChange:x,...b}=this.scrapeMotionValuesFromProps(s,{},this);for(const j in b){const E=b[j];p[j]!==void 0&&pt(E)&&E.set(p[j])}}mount(a){var s,o;if(this.hasBeenMounted)for(const c in this.initialValues)(s=this.values.get(c))==null||s.jump(this.initialValues[c]),this.latestValues[c]=this.initialValues[c];this.current=a,Kj.set(a,this),this.projection&&!this.projection.instance&&this.projection.mount(a),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((c,h)=>this.bindToMotionValue(h,c)),this.reducedMotionConfig==="never"?this.shouldReduceMotion=!1:this.reducedMotionConfig==="always"?this.shouldReduceMotion=!0:(Ef.current||ex(),this.shouldReduceMotion=al.current),this.shouldSkipAnimations=this.skipAnimationsConfig??!1,(o=this.parent)==null||o.addChild(this),this.update(this.props,this.presenceContext),this.hasBeenMounted=!0}unmount(){var a;this.projection&&this.projection.unmount(),gr(this.notifyUpdate),gr(this.render),this.valueSubscriptions.forEach(s=>s()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),(a=this.parent)==null||a.removeChild(this);for(const s in this.events)this.events[s].clear();for(const s in this.features){const o=this.features[s];o&&(o.unmount(),o.isMounted=!1)}this.current=null}addChild(a){this.children.add(a),this.enteringChildren??(this.enteringChildren=new Set),this.enteringChildren.add(a)}removeChild(a){this.children.delete(a),this.enteringChildren&&this.enteringChildren.delete(a)}bindToMotionValue(a,s){if(this.valueSubscriptions.has(a)&&this.valueSubscriptions.get(a)(),s.accelerate&&V0.has(a)&&this.current instanceof HTMLElement){const{factory:f,keyframes:m,times:g,ease:p,duration:v}=s.accelerate,x=new z0({element:this.current,name:a,keyframes:m,times:g,ease:p,duration:Ht(v)}),b=f(x);this.valueSubscriptions.set(a,()=>{b(),x.cancel()});return}const o=Ga.has(a);o&&this.onBindTransform&&this.onBindTransform();const c=s.on("change",f=>{this.latestValues[a]=f,this.props.onUpdate&&Ye.preRender(this.notifyUpdate),o&&this.projection&&(this.projection.isTransformDirty=!0),this.scheduleRender()});let h;typeof window<"u"&&window.MotionCheckAppearSync&&(h=window.MotionCheckAppearSync(this,a,s)),this.valueSubscriptions.set(a,()=>{c(),h&&h()})}sortNodePosition(a){return!this.current||!this.sortInstanceNodePosition||this.type!==a.type?0:this.sortInstanceNodePosition(this.current,a.current)}updateFeatures(){let a="animation";for(a in il){const s=il[a];if(!s)continue;const{isEnabled:o,Feature:c}=s;if(!this.features[a]&&c&&o(this.props)&&(this.features[a]=new c(this)),this.features[a]){const h=this.features[a];h.isMounted?h.update():(h.mount(),h.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):it()}getStaticValue(a){return this.latestValues[a]}setStaticValue(a,s){this.latestValues[a]=s}update(a,s){(a.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=a,this.prevPresenceContext=this.presenceContext,this.presenceContext=s;for(let o=0;o<Sy.length;o++){const c=Sy[o];this.propEventSubscriptions[c]&&(this.propEventSubscriptions[c](),delete this.propEventSubscriptions[c]);const h="on"+c,f=a[h];f&&(this.propEventSubscriptions[c]=this.on(c,f))}this.prevMotionValues=Zj(this,this.scrapeMotionValuesFromProps(a,this.prevProps||{},this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue()}getProps(){return this.props}getVariant(a){return this.props.variants?this.props.variants[a]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(a){const s=this.getClosestVariantNode();if(s)return s.variantChildren&&s.variantChildren.add(a),()=>s.variantChildren.delete(a)}addValue(a,s){const o=this.values.get(a);s!==o&&(o&&this.removeValue(a),this.bindToMotionValue(a,s),this.values.set(a,s),this.latestValues[a]=s.get())}removeValue(a){this.values.delete(a);const s=this.valueSubscriptions.get(a);s&&(s(),this.valueSubscriptions.delete(a)),delete this.latestValues[a],this.removeValueFromRenderState(a,this.renderState)}hasValue(a){return this.values.has(a)}getValue(a,s){if(this.props.values&&this.props.values[a])return this.props.values[a];let o=this.values.get(a);return o===void 0&&s!==void 0&&(o=Ua(s===null?void 0:s,{owner:this}),this.addValue(a,o)),o}readValue(a,s){let o=this.latestValues[a]!==void 0||!this.current?this.latestValues[a]:this.getBaseTargetFromProps(this.props,a)??this.readValueFromInstance(this.current,a,this.options);return o!=null&&(typeof o=="string"&&(e0(o)||n0(o))?o=parseFloat(o):!Fj(o)&&sn.test(s)&&(o=F0(a,s)),this.setBaseTarget(a,pt(o)?o.get():o)),pt(o)?o.get():o}setBaseTarget(a,s){this.baseTarget[a]=s}getBaseTarget(a){var h;const{initial:s}=this.props;let o;if(typeof s=="string"||typeof s=="object"){const f=gf(this.props,s,(h=this.presenceContext)==null?void 0:h.custom);f&&(o=f[a])}if(s&&o!==void 0)return o;const c=this.getBaseTargetFromProps(this.props,a);return c!==void 0&&!pt(c)?c:this.initialValues[a]!==void 0&&o===void 0?void 0:this.baseTarget[a]}on(a,s){return this.events[a]||(this.events[a]=new rf),this.events[a].add(s)}notify(a,...s){this.events[a]&&this.events[a].notify(...s)}scheduleRenderMicrotask(){xf.render(this.render)}}class nx extends Wj{constructor(){super(...arguments),this.KeyframeResolver=Aj}sortInstanceNodePosition(a,s){return a.compareDocumentPosition(s)&2?1:-1}getBaseTargetFromProps(a,s){const o=a.style;return o?o[s]:void 0}removeValueFromRenderState(a,{vars:s,style:o}){delete s[a],delete o[a]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);const{children:a}=this.props;pt(a)&&(this.childSubscription=a.on("change",s=>{this.current&&(this.current.textContent=`${s}`)}))}}class vr{constructor(a){this.isMounted=!1,this.node=a}update(){}}function rx({top:n,left:a,right:s,bottom:o}){return{x:{min:a,max:s},y:{min:n,max:o}}}function Ij({x:n,y:a}){return{top:a.min,right:n.max,bottom:a.max,left:n.min}}function eE(n,a){if(!a)return n;const s=a({x:n.left,y:n.top}),o=a({x:n.right,y:n.bottom});return{top:s.y,left:s.x,bottom:o.y,right:o.x}}function Ku(n){return n===void 0||n===1}function Md({scale:n,scaleX:a,scaleY:s}){return!Ku(n)||!Ku(a)||!Ku(s)}function Lr(n){return Md(n)||ax(n)||n.z||n.rotate||n.rotateX||n.rotateY||n.skewX||n.skewY}function ax(n){return wy(n.x)||wy(n.y)}function wy(n){return n&&n!=="0%"}function sl(n,a,s){const o=n-s,c=a*o;return s+c}function jy(n,a,s,o,c){return c!==void 0&&(n=sl(n,c,o)),sl(n,s,o)+a}function kd(n,a=0,s=1,o,c){n.min=jy(n.min,a,s,o,c),n.max=jy(n.max,a,s,o,c)}function ix(n,{x:a,y:s}){kd(n.x,a.translate,a.scale,a.originPoint),kd(n.y,s.translate,s.scale,s.originPoint)}const Ey=.999999999999,Ty=1.0000000000001;function tE(n,a,s,o=!1){var m;const c=s.length;if(!c)return;a.x=a.y=1;let h,f;for(let g=0;g<c;g++){h=s[g],f=h.projectionDelta;const{visualElement:p}=h.options;p&&p.props.style&&p.props.style.display==="contents"||(o&&h.options.layoutScroll&&h.scroll&&h!==h.root&&(pn(n.x,-h.scroll.offset.x),pn(n.y,-h.scroll.offset.y)),f&&(a.x*=f.x.scale,a.y*=f.y.scale,ix(n,f)),o&&Lr(h.latestValues)&&$o(n,h.latestValues,(m=h.layout)==null?void 0:m.layoutBox))}a.x<Ty&&a.x>Ey&&(a.x=1),a.y<Ty&&a.y>Ey&&(a.y=1)}function pn(n,a){n.min+=a,n.max+=a}function Cy(n,a,s,o,c=.5){const h=qe(n.min,n.max,c);kd(n,a,s,h,o)}function Ay(n,a){return typeof n=="string"?parseFloat(n)/100*(a.max-a.min):n}function $o(n,a,s){const o=s??n;Cy(n.x,Ay(a.x,o.x),a.scaleX,a.scale,a.originX),Cy(n.y,Ay(a.y,o.y),a.scaleY,a.scale,a.originY)}function sx(n,a){return rx(eE(n.getBoundingClientRect(),a))}function nE(n,a,s){const o=sx(n,s),{scroll:c}=a;return c&&(pn(o.x,c.offset.x),pn(o.y,c.offset.y)),o}const rE={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},aE=Ya.length;function iE(n,a,s){let o="",c=!0;for(let f=0;f<aE;f++){const m=Ya[f],g=n[m];if(g===void 0)continue;let p=!0;if(typeof g=="number")p=g===(m.startsWith("scale")?1:0);else{const v=parseFloat(g);p=m.startsWith("scale")?v===1:v===0}if(!p||s){const v=Nd(g,rl[m]);if(!p){c=!1;const x=rE[m]||m;o+=`${x}(${v}) `}s&&(a[m]=v)}}const h=n.pathRotation;return h&&(c=!1,o+=`rotate(${Nd(h,rl.pathRotation)}) `),o=o.trim(),s?o=s(a,c?"":o):c&&(o="none"),o}function Tf(n,a,s){const{style:o,vars:c,transformOrigin:h}=n;let f=!1,m=!1;for(const g in a){const p=a[g];if(Ga.has(g)){f=!0;continue}else if(y0(g)){c[g]=p;continue}else{const v=Nd(p,rl[g]);g.startsWith("origin")?(m=!0,h[g]=v):o[g]=v}}if(a.transform||(f||s?o.transform=iE(a,n.transform,s):o.transform&&(o.transform="none")),m){const{originX:g="50%",originY:p="50%",originZ:v=0}=h;o.transformOrigin=`${g} ${p} ${v}`}}function ox(n,{style:a,vars:s},o,c){const h=n.style;let f;for(f in a)h[f]=a[f];c==null||c.applyProjectionStyles(h,o);for(f in s)h.setProperty(f,s[f])}function Dy(n,a){return a.max===a.min?0:n/(a.max-a.min)*100}const qi={correct:(n,a)=>{if(!a.target)return n;if(typeof n=="string")if(he.test(n))n=parseFloat(n);else return n;const s=Dy(n,a.target.x),o=Dy(n,a.target.y);return`${s}% ${o}%`}},sE={correct:(n,{treeScale:a,projectionDelta:s})=>{const o=n,c=sn.parse(n);if(c.length>5)return o;const h=sn.createTransformer(n),f=typeof c[0]!="number"?1:0,m=s.x.scale*a.x,g=s.y.scale*a.y;c[0+f]/=m,c[1+f]/=g;const p=qe(m,g,.5);return typeof c[2+f]=="number"&&(c[2+f]/=p),typeof c[3+f]=="number"&&(c[3+f]/=p),h(c)}},Rd={borderRadius:{...qi,applyTo:[...vf]},borderTopLeftRadius:qi,borderTopRightRadius:qi,borderBottomLeftRadius:qi,borderBottomRightRadius:qi,boxShadow:sE};function lx(n,{layout:a,layoutId:s}){return Ga.has(n)||n.startsWith("origin")||(a||s!==void 0)&&(!!Rd[n]||n==="opacity")}function Cf(n,a,s){var f;const o=n.style,c=a==null?void 0:a.style,h={};if(!o)return h;for(const m in o)(pt(o[m])||c&&pt(c[m])||lx(m,n)||((f=s==null?void 0:s.getValue(m))==null?void 0:f.liveStyle)!==void 0)&&(h[m]=o[m]);return h}function oE(n){return window.getComputedStyle(n)}class lE extends nx{constructor(){super(...arguments),this.type="html",this.renderInstance=ox}mount(a){dl(!!a.style),super.mount(a)}readValueFromInstance(a,s){var o;if(Ga.has(s))return(o=this.projection)!=null&&o.isProjecting?vd(s):Nw(a,s);{const c=oE(a),h=(y0(s)?c.getPropertyValue(s):c[s])||0;return typeof h=="string"?h.trim():h}}measureInstanceViewportBox(a,{transformPagePoint:s}){return sx(a,s)}build(a,s,o){Tf(a,s,o.transformTemplate)}scrapeMotionValuesFromProps(a,s,o){return Cf(a,s,o)}}const cE={offset:"stroke-dashoffset",array:"stroke-dasharray"},uE={offset:"strokeDashoffset",array:"strokeDasharray"};function dE(n,a,s=1,o=0,c=!0){n.pathLength=1;const h=c?cE:uE;n[h.offset]=`${-o}`,n[h.array]=`${a} ${s}`}const fE=["offsetDistance","offsetPath","offsetRotate","offsetAnchor"];function cx(n,{attrX:a,attrY:s,attrScale:o,pathLength:c,pathSpacing:h=1,pathOffset:f=0,...m},g,p,v){if(Tf(n,m,p),g){n.style.viewBox&&(n.attrs.viewBox=n.style.viewBox);return}n.attrs=n.style,n.style={};const{attrs:x,style:b}=n;x.transform&&(b.transform=x.transform,delete x.transform),(b.transform||x.transformOrigin)&&(b.transformOrigin=x.transformOrigin??"50% 50%",delete x.transformOrigin),b.transform&&(b.transformBox=(v==null?void 0:v.transformBox)??"fill-box",delete x.transformBox);for(const j of fE)x[j]!==void 0&&(b[j]=x[j],delete x[j]);a!==void 0&&(x.x=a),s!==void 0&&(x.y=s),o!==void 0&&(x.scale=o),c!==void 0&&dE(x,c,h,f,!1)}const ux=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]),dx=n=>typeof n=="string"&&n.toLowerCase()==="svg";function hE(n,a,s,o){ox(n,a,void 0,o);for(const c in a.attrs)n.setAttribute(ux.has(c)?c:yf(c),a.attrs[c])}function fx(n,a,s){const o=Cf(n,a,s);for(const c in n)if(pt(n[c])||pt(a[c])){const h=Ya.indexOf(c)!==-1?"attr"+c.charAt(0).toUpperCase()+c.substring(1):c;o[h]=n[c]}return o}class mE extends nx{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1,this.measureInstanceViewportBox=it}getBaseTargetFromProps(a,s){return a[s]}readValueFromInstance(a,s){if(Ga.has(s)){const o=$0(s);return o&&o.default||0}return s=ux.has(s)?s:yf(s),a.getAttribute(s)}scrapeMotionValuesFromProps(a,s,o){return fx(a,s,o)}build(a,s,o){cx(a,s,this.isSVGTag,o.transformTemplate,o.style)}renderInstance(a,s,o,c){hE(a,s,o,c)}mount(a){this.isSVGTag=dx(a.tagName),super.mount(a)}}const pE=jf.length;function hx(n){if(!n)return;if(!n.isControllingVariants){const s=n.parent?hx(n.parent)||{}:{};return n.props.initial!==void 0&&(s.initial=n.props.initial),s}const a={};for(let s=0;s<pE;s++){const o=jf[s],c=n.props[o];(Ii(c)||c===!1)&&(a[o]=c)}return a}function mx(n,a){if(!Array.isArray(a))return!1;const s=a.length;if(s!==n.length)return!1;for(let o=0;o<s;o++)if(a[o]!==n[o])return!1;return!0}const gE=[...wf].reverse(),yE=wf.length;function vE(n){return a=>Promise.all(a.map(({animation:s,options:o})=>gj(n,s,o)))}function xE(n){let a=vE(n),s=Ny(),o=!0,c=!1;const h=p=>(v,x)=>{var j;const b=Yr(n,x,p==="exit"?(j=n.presenceContext)==null?void 0:j.custom:void 0);if(b){const{transition:E,transitionEnd:T,...A}=b;v={...v,...A,...T}}return v};function f(p){a=p(n)}function m(p){const{props:v}=n,x=hx(n.parent)||{},b=[],j=new Set;let E={},T=1/0;for(let R=0;R<yE;R++){const M=gE[R],_=s[M],V=v[M]!==void 0?v[M]:x[M],L=Ii(V),P=M===p?_.isActive:null;P===!1&&(T=R);let k=V===x[M]&&V!==v[M]&&L;if(k&&(o||c)&&n.manuallyAnimateOnMount&&(k=!1),_.protectedKeys={...E},!_.isActive&&P===null||!V&&!_.prevProp||hl(V)||typeof V=="boolean")continue;if(M==="exit"&&_.isActive&&P!==!0){_.prevResolvedValues&&(E={...E,..._.prevResolvedValues});continue}const N=bE(_.prevProp,V);let G=N||M===p&&_.isActive&&!k&&L||R>T&&L,F=!1;const ee=Array.isArray(V)?V:[V];let ie=ee.reduce(h(M),{});P===!1&&(ie={});const{prevResolvedValues:ge={}}=_,ce={...ge,...ie},oe=se=>{G=!0,j.has(se)&&(F=!0,j.delete(se)),_.needsAnimating[se]=!0;const $=n.getValue(se);$&&($.liveStyle=!1)};for(const se in ce){const $=ie[se],ne=ge[se];if(E.hasOwnProperty(se))continue;let C=!1;Ed($)&&Ed(ne)?C=!mx($,ne)||N:C=$!==ne,C?$!=null?oe(se):j.add(se):$!==void 0&&j.has(se)?oe(se):_.protectedKeys[se]=!0}_.prevProp=V,_.prevResolvedValues=ie,_.isActive&&(E={...E,...ie}),(o||c)&&n.blockInitialAnimation&&(G=!1);const U=k&&N;G&&(!U||F)&&b.push(...ee.map(se=>{const $={type:M};if(typeof se=="string"&&(o||c)&&!U&&n.manuallyAnimateOnMount&&n.parent){const{parent:ne}=n,C=Yr(ne,se);if(ne.enteringChildren&&C){const{delayChildren:O}=C.transition||{};$.delay=B0(ne.enteringChildren,n,O)}}return{animation:se,options:$}}))}if(j.size){const R={};if(typeof v.initial!="boolean"){const M=Yr(n,Array.isArray(v.initial)?v.initial[0]:v.initial);M&&M.transition&&(R.transition=M.transition)}j.forEach(M=>{const _=n.getBaseTarget(M),V=n.getValue(M);V&&(V.liveStyle=!0),R[M]=_??null}),b.push({animation:R})}let A=!!b.length;return o&&(v.initial===!1||v.initial===v.animate)&&!n.manuallyAnimateOnMount&&(A=!1),o=!1,c=!1,A?a(b):Promise.resolve()}function g(p,v){var b;if(s[p].isActive===v)return Promise.resolve();(b=n.variantChildren)==null||b.forEach(j=>{var E;return(E=j.animationState)==null?void 0:E.setActive(p,v)}),s[p].isActive=v;const x=m(p);for(const j in s)s[j].protectedKeys={};return x}return{animateChanges:m,setActive:g,setAnimateFunction:f,getState:()=>s,reset:()=>{s=Ny(),c=!0}}}function bE(n,a){return typeof a=="string"?a!==n:Array.isArray(a)?!mx(a,n):!1}function Br(n=!1){return{isActive:n,protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}function Ny(){return{animate:Br(!0),whileInView:Br(),whileHover:Br(),whileTap:Br(),whileDrag:Br(),whileFocus:Br(),exit:Br()}}function Od(n,a){n.min=a.min,n.max=a.max}function rn(n,a){Od(n.x,a.x),Od(n.y,a.y)}function My(n,a){n.translate=a.translate,n.scale=a.scale,n.originPoint=a.originPoint,n.origin=a.origin}const px=1e-4,SE=1-px,wE=1+px,gx=.01,jE=0-gx,EE=0+gx;function bt(n){return n.max-n.min}function TE(n,a,s){return Math.abs(n-a)<=s}function ky(n,a,s,o=.5){n.origin=o,n.originPoint=qe(a.min,a.max,n.origin),n.scale=bt(s)/bt(a),n.translate=qe(s.min,s.max,n.origin)-n.originPoint,(n.scale>=SE&&n.scale<=wE||isNaN(n.scale))&&(n.scale=1),(n.translate>=jE&&n.translate<=EE||isNaN(n.translate))&&(n.translate=0)}function Fi(n,a,s,o){ky(n.x,a.x,s.x,o?o.originX:void 0),ky(n.y,a.y,s.y,o?o.originY:void 0)}function Ry(n,a,s,o=0){const c=o?qe(s.min,s.max,o):s.min;n.min=c+a.min,n.max=n.min+bt(a)}function CE(n,a,s,o){Ry(n.x,a.x,s.x,o==null?void 0:o.x),Ry(n.y,a.y,s.y,o==null?void 0:o.y)}function Oy(n,a,s,o=0){const c=o?qe(s.min,s.max,o):s.min;n.min=a.min-c,n.max=n.min+bt(a)}function ol(n,a,s,o){Oy(n.x,a.x,s.x,o==null?void 0:o.x),Oy(n.y,a.y,s.y,o==null?void 0:o.y)}function zy(n,a,s,o,c){return n-=a,n=sl(n,1/s,o),c!==void 0&&(n=sl(n,1/c,o)),n}function AE(n,a=0,s=1,o=.5,c,h=n,f=n){if(yn.test(a)&&(a=parseFloat(a),a=qe(f.min,f.max,a/100)-f.min),typeof a!="number")return;let m=qe(h.min,h.max,o);n===h&&(m-=a),n.min=zy(n.min,a,s,m,c),n.max=zy(n.max,a,s,m,c)}function _y(n,a,[s,o,c],h,f){AE(n,a[s],a[o],a[c],a.scale,h,f)}const DE=["x","scaleX","originX"],NE=["y","scaleY","originY"];function Vy(n,a,s,o){_y(n.x,a,DE,s?s.x:void 0,o?o.x:void 0),_y(n.y,a,NE,s?s.y:void 0,o?o.y:void 0)}function By(n){return n.translate===0&&n.scale===1}function yx(n){return By(n.x)&&By(n.y)}function Ly(n,a){return n.min===a.min&&n.max===a.max}function ME(n,a){return Ly(n.x,a.x)&&Ly(n.y,a.y)}function Uy(n,a){return Math.round(n.min)===Math.round(a.min)&&Math.round(n.max)===Math.round(a.max)}function vx(n,a){return Uy(n.x,a.x)&&Uy(n.y,a.y)}function Hy(n){return bt(n.x)/bt(n.y)}function qy(n,a){return n.translate===a.translate&&n.scale===a.scale&&n.originPoint===a.originPoint}function mn(n){return[n("x"),n("y")]}function kE(n,a,s){let o="";const c=n.x.translate/a.x,h=n.y.translate/a.y,f=(s==null?void 0:s.z)||0;if((c||h||f)&&(o=`translate3d(${c}px, ${h}px, ${f}px) `),(a.x!==1||a.y!==1)&&(o+=`scale(${1/a.x}, ${1/a.y}) `),s){const{transformPerspective:p,rotate:v,pathRotation:x,rotateX:b,rotateY:j,skewX:E,skewY:T}=s;p&&(o=`perspective(${p}px) ${o}`),v&&(o+=`rotate(${v}deg) `),x&&(o+=`rotate(${x}deg) `),b&&(o+=`rotateX(${b}deg) `),j&&(o+=`rotateY(${j}deg) `),E&&(o+=`skewX(${E}deg) `),T&&(o+=`skewY(${T}deg) `)}const m=n.x.scale*a.x,g=n.y.scale*a.y;return(m!==1||g!==1)&&(o+=`scale(${m}, ${g})`),o||"none"}const RE=vf.length,Yy=n=>typeof n=="string"?parseFloat(n):n,Gy=n=>typeof n=="number"||he.test(n);function OE(n,a,s,o,c,h){c?(n.opacity=qe(0,s.opacity??1,zE(o)),n.opacityExit=qe(a.opacity??1,0,_E(o))):h&&(n.opacity=qe(a.opacity??1,s.opacity??1,o));for(let f=0;f<RE;f++){const m=vf[f];let g=Py(a,m),p=Py(s,m);if(g===void 0&&p===void 0)continue;g||(g=0),p||(p=0),g===0||p===0||Gy(g)===Gy(p)?(n[m]=Math.max(qe(Yy(g),Yy(p),o),0),(yn.test(p)||yn.test(g))&&(n[m]+="%")):n[m]=p}(a.rotate||s.rotate)&&(n.rotate=qe(a.rotate||0,s.rotate||0,o))}function Py(n,a){return n[a]!==void 0?n[a]:n.borderRadius}const zE=xx(0,.5,d0),_E=xx(.5,.95,It);function xx(n,a,s){return o=>o<n?0:o>a?1:s(Ji(n,a,o))}function VE(n,a,s){const o=pt(n)?n:Ua(n);return o.start(pf("",o,a,s)),o.animation}function es(n,a,s,o={passive:!0}){return n.addEventListener(a,s,o),()=>n.removeEventListener(a,s,o)}const BE=(n,a)=>n.depth-a.depth;class LE{constructor(){this.children=[],this.isDirty=!1}add(a){nf(this.children,a),this.isDirty=!0}remove(a){Wo(this.children,a),this.isDirty=!0}forEach(a){this.isDirty&&this.children.sort(BE),this.isDirty=!1,this.children.forEach(a)}}function UE(n,a){const s=xt.now(),o=({timestamp:c})=>{const h=c-s;h>=a&&(gr(o),n(h-a))};return Ye.setup(o,!0),()=>gr(o)}function Fo(n){return pt(n)?n.get():n}class HE{constructor(){this.members=[]}add(a){nf(this.members,a);for(let s=this.members.length-1;s>=0;s--){const o=this.members[s];if(o===a||o===this.lead||o===this.prevLead)continue;const c=o.instance;(!c||c.isConnected===!1)&&!o.snapshot&&(Wo(this.members,o),o.unmount())}a.scheduleRender()}remove(a){if(Wo(this.members,a),a===this.prevLead&&(this.prevLead=void 0),a===this.lead){const s=this.members[this.members.length-1];s&&this.promote(s)}}relegate(a){var s;for(let o=this.members.indexOf(a)-1;o>=0;o--){const c=this.members[o];if(c.isPresent!==!1&&((s=c.instance)==null?void 0:s.isConnected)!==!1)return this.promote(c),!0}return!1}promote(a,s){var c;const o=this.lead;if(a!==o&&(this.prevLead=o,this.lead=a,a.show(),o)){o.updateSnapshot(),a.scheduleRender();const{layoutDependency:h}=o.options,{layoutDependency:f}=a.options;(h===void 0||h!==f)&&(a.resumeFrom=o,s&&(o.preserveOpacity=!0),o.snapshot&&(a.snapshot=o.snapshot,a.snapshot.latestValues=o.animationValues||o.latestValues),(c=a.root)!=null&&c.isUpdating&&(a.isLayoutDirty=!0)),a.options.crossfade===!1&&o.hide()}}exitAnimationComplete(){this.members.forEach(a=>{var s,o,c,h,f;(o=(s=a.options).onExitComplete)==null||o.call(s),(f=(c=a.resumingFrom)==null?void 0:(h=c.options).onExitComplete)==null||f.call(h)})}scheduleRender(){this.members.forEach(a=>a.instance&&a.scheduleRender(!1))}removeLeadSnapshot(){var a;(a=this.lead)!=null&&a.snapshot&&(this.lead.snapshot=void 0)}}const Ko={hasAnimatedSinceResize:!0,hasEverUpdated:!1},Zu=["","X","Y","Z"],qE=1e3;let YE=0;function Qu(n,a,s,o){const{latestValues:c}=a;c[n]&&(s[n]=c[n],a.setStaticValue(n,0),o&&(o[n]=0))}function bx(n){if(n.hasCheckedOptimisedAppear=!0,n.root===n)return;const{visualElement:a}=n.options;if(!a)return;const s=Y0(a);if(window.MotionHasOptimisedAnimation(s,"transform")){const{layout:c,layoutId:h}=n.options;window.MotionCancelOptimisedAnimation(s,"transform",Ye,!(c||h))}const{parent:o}=n;o&&!o.hasCheckedOptimisedAppear&&bx(o)}function Sx({attachResizeListener:n,defaultParent:a,measureScroll:s,checkIsScrollRoot:o,resetTransform:c}){return class{constructor(f={},m=a==null?void 0:a()){this.id=YE++,this.animationId=0,this.animationCommitId=0,this.children=new Set,this.options={},this.isTreeAnimating=!1,this.isAnimationBlocked=!1,this.isLayoutDirty=!1,this.isProjectionDirty=!1,this.isSharedProjectionDirty=!1,this.isTransformDirty=!1,this.updateManuallyBlocked=!1,this.updateBlockedByResize=!1,this.isUpdating=!1,this.isSVG=!1,this.needsReset=!1,this.shouldResetTransform=!1,this.hasCheckedOptimisedAppear=!1,this.treeScale={x:1,y:1},this.eventHandlers=new Map,this.hasTreeAnimated=!1,this.layoutVersion=0,this.updateScheduled=!1,this.scheduleUpdate=()=>this.update(),this.projectionUpdateScheduled=!1,this.checkUpdateFailed=()=>{this.isUpdating&&(this.isUpdating=!1,this.clearAllSnapshots())},this.updateProjection=()=>{this.projectionUpdateScheduled=!1,this.nodes.forEach(XE),this.nodes.forEach(JE),this.nodes.forEach(WE),this.nodes.forEach($E)},this.resolvedRelativeTargetAt=0,this.linkedParentVersion=0,this.hasProjected=!1,this.isVisible=!0,this.animationProgress=0,this.sharedNodes=new Map,this.latestValues=f,this.root=m?m.root||m:this,this.path=m?[...m.path,m]:[],this.parent=m,this.depth=m?m.depth+1:0;for(let g=0;g<this.path.length;g++)this.path[g].shouldResetTransform=!0;this.root===this&&(this.nodes=new LE)}addEventListener(f,m){return this.eventHandlers.has(f)||this.eventHandlers.set(f,new rf),this.eventHandlers.get(f).add(m)}notifyListeners(f,...m){const g=this.eventHandlers.get(f);g&&g.notify(...m)}hasListeners(f){return this.eventHandlers.has(f)}mount(f){if(this.instance)return;this.isSVG=Sf(f)&&!Xj(f),this.instance=f;const{layoutId:m,layout:g,visualElement:p}=this.options;if(p&&!p.current&&p.mount(f),this.root.nodes.add(this),this.parent&&this.parent.children.add(this),this.root.hasTreeAnimated&&(g||m)&&(this.isLayoutDirty=!0),n){let v,x=0;const b=()=>this.root.updateBlockedByResize=!1;Ye.read(()=>{x=window.innerWidth}),n(f,()=>{const j=window.innerWidth;j!==x&&(x=j,this.root.updateBlockedByResize=!0,v&&v(),v=UE(b,250),Ko.hasAnimatedSinceResize&&(Ko.hasAnimatedSinceResize=!1,this.nodes.forEach(Fy)))})}m&&this.root.registerSharedNode(m,this),this.options.animate!==!1&&p&&(m||g)&&this.addEventListener("didUpdate",({delta:v,hasLayoutChanged:x,hasRelativeLayoutChanged:b,layout:j})=>{if(this.isTreeAnimationBlocked()){this.target=void 0,this.relativeTarget=void 0;return}const E=this.options.transition||p.getDefaultTransition()||rT,{onLayoutAnimationStart:T,onLayoutAnimationComplete:A}=p.getProps(),R=!this.targetLayout||!vx(this.targetLayout,j),M=!x&&b;if(this.options.layoutRoot||this.resumeFrom||M||x&&(R||!this.currentAnimation)){this.resumeFrom&&(this.resumingFrom=this.resumeFrom,this.resumingFrom.resumingFrom=void 0);const _={...mf(E,"layout"),onPlay:T,onComplete:A};(p.shouldReduceMotion||this.options.layoutRoot)&&(_.delay=0,_.type=!1),this.startAnimation(_),this.setAnimationOrigin(v,M,_.path)}else x||Fy(this),this.isLead()&&this.options.onExitComplete&&this.options.onExitComplete();this.targetLayout=j})}unmount(){this.options.layoutId&&this.willUpdate(),this.root.nodes.remove(this);const f=this.getStack();f&&f.remove(this),this.parent&&this.parent.children.delete(this),this.instance=void 0,this.eventHandlers.clear(),gr(this.updateProjection)}blockUpdate(){this.updateManuallyBlocked=!0}unblockUpdate(){this.updateManuallyBlocked=!1}isUpdateBlocked(){return this.updateManuallyBlocked||this.updateBlockedByResize}isTreeAnimationBlocked(){return this.isAnimationBlocked||this.parent&&this.parent.isTreeAnimationBlocked()||!1}startUpdate(){this.isUpdateBlocked()||(this.isUpdating=!0,this.nodes&&this.nodes.forEach(IE),this.animationId++)}getTransformTemplate(){const{visualElement:f}=this.options;return f&&f.getProps().transformTemplate}willUpdate(f=!0){if(this.root.hasTreeAnimated=!0,this.root.isUpdateBlocked()){this.options.onExitComplete&&this.options.onExitComplete();return}if(window.MotionCancelOptimisedAnimation&&!this.hasCheckedOptimisedAppear&&bx(this),!this.root.isUpdating&&this.root.startUpdate(),this.isLayoutDirty)return;this.isLayoutDirty=!0;for(let v=0;v<this.path.length;v++){const x=this.path[v];x.shouldResetTransform=!0,(typeof x.latestValues.x=="string"||typeof x.latestValues.y=="string")&&(x.isLayoutDirty=!0),x.updateScroll("snapshot"),x.options.layoutRoot&&x.willUpdate(!1)}const{layoutId:m,layout:g}=this.options;if(m===void 0&&!g)return;const p=this.getTransformTemplate();this.prevTransformTemplateValue=p?p(this.latestValues,""):void 0,this.updateSnapshot(),f&&this.notifyListeners("willUpdate")}update(){if(this.updateScheduled=!1,this.isUpdateBlocked()){const g=this.updateBlockedByResize;this.unblockUpdate(),this.updateBlockedByResize=!1,this.clearAllSnapshots(),g&&this.nodes.forEach(KE),this.nodes.forEach(Xy);return}if(this.animationId<=this.animationCommitId){this.nodes.forEach($y);return}this.animationCommitId=this.animationId,this.isUpdating?(this.isUpdating=!1,this.nodes.forEach(ZE),this.nodes.forEach(QE),this.nodes.forEach(GE),this.nodes.forEach(PE)):this.nodes.forEach($y),this.clearAllSnapshots();const m=xt.now();mt.delta=vn(0,1e3/60,m-mt.timestamp),mt.timestamp=m,mt.isProcessing=!0,qu.update.process(mt),qu.preRender.process(mt),qu.render.process(mt),mt.isProcessing=!1}didUpdate(){this.updateScheduled||(this.updateScheduled=!0,xf.read(this.scheduleUpdate))}clearAllSnapshots(){this.nodes.forEach(FE),this.sharedNodes.forEach(eT)}scheduleUpdateProjection(){this.projectionUpdateScheduled||(this.projectionUpdateScheduled=!0,Ye.preRender(this.updateProjection,!1,!0))}scheduleCheckAfterUnmount(){Ye.postRender(()=>{this.isLayoutDirty?this.root.didUpdate():this.root.checkUpdateFailed()})}updateSnapshot(){this.snapshot||!this.instance||(this.snapshot=this.measure(),this.snapshot&&!bt(this.snapshot.measuredBox.x)&&!bt(this.snapshot.measuredBox.y)&&(this.snapshot=void 0))}updateLayout(){if(!this.instance||(this.updateScroll(),!(this.options.alwaysMeasureLayout&&this.isLead())&&!this.isLayoutDirty))return;if(this.resumeFrom&&!this.resumeFrom.instance)for(let g=0;g<this.path.length;g++)this.path[g].updateScroll();const f=this.layout;this.layout=this.measure(!1),this.layoutVersion++,this.layoutCorrected||(this.layoutCorrected=it()),this.isLayoutDirty=!1,this.projectionDelta=void 0,this.notifyListeners("measure",this.layout.layoutBox);const{visualElement:m}=this.options;m&&m.notify("LayoutMeasure",this.layout.layoutBox,f?f.layoutBox:void 0)}updateScroll(f="measure"){let m=!!(this.options.layoutScroll&&this.instance);if(this.scroll&&this.scroll.animationId===this.root.animationId&&this.scroll.phase===f&&(m=!1),m&&this.instance){const g=o(this.instance);this.scroll={animationId:this.root.animationId,phase:f,isRoot:g,offset:s(this.instance),wasRoot:this.scroll?this.scroll.isRoot:g}}}resetTransform(){if(!c)return;const f=this.isLayoutDirty||this.shouldResetTransform||this.options.alwaysMeasureLayout,m=this.projectionDelta&&!yx(this.projectionDelta),g=this.getTransformTemplate(),p=g?g(this.latestValues,""):void 0,v=p!==this.prevTransformTemplateValue;f&&this.instance&&(m||Lr(this.latestValues)||v)&&(c(this.instance,p),this.shouldResetTransform=!1,this.scheduleRender())}measure(f=!0){const m=this.measurePageBox();let g=this.removeElementScroll(m);return f&&(g=this.removeTransform(g)),aT(g),{animationId:this.root.animationId,measuredBox:m,layoutBox:g,latestValues:{},source:this.id}}measurePageBox(){var p;const{visualElement:f}=this.options;if(!f)return it();const m=f.measureViewportBox();if(!(((p=this.scroll)==null?void 0:p.wasRoot)||this.path.some(iT))){const{scroll:v}=this.root;v&&(pn(m.x,v.offset.x),pn(m.y,v.offset.y))}return m}removeElementScroll(f){var g;const m=it();if(rn(m,f),(g=this.scroll)!=null&&g.wasRoot)return m;for(let p=0;p<this.path.length;p++){const v=this.path[p],{scroll:x,options:b}=v;v!==this.root&&x&&b.layoutScroll&&(x.wasRoot&&rn(m,f),pn(m.x,x.offset.x),pn(m.y,x.offset.y))}return m}applyTransform(f,m=!1,g){var v,x;const p=g||it();rn(p,f);for(let b=0;b<this.path.length;b++){const j=this.path[b];!m&&j.options.layoutScroll&&j.scroll&&j!==j.root&&(pn(p.x,-j.scroll.offset.x),pn(p.y,-j.scroll.offset.y)),Lr(j.latestValues)&&$o(p,j.latestValues,(v=j.layout)==null?void 0:v.layoutBox)}return Lr(this.latestValues)&&$o(p,this.latestValues,(x=this.layout)==null?void 0:x.layoutBox),p}removeTransform(f){var g;const m=it();rn(m,f);for(let p=0;p<this.path.length;p++){const v=this.path[p];if(!Lr(v.latestValues))continue;let x;v.instance&&(Md(v.latestValues)&&v.updateSnapshot(),x=it(),rn(x,v.measurePageBox())),Vy(m,v.latestValues,(g=v.snapshot)==null?void 0:g.layoutBox,x)}return Lr(this.latestValues)&&Vy(m,this.latestValues),m}setTargetDelta(f){this.targetDelta=f,this.root.scheduleUpdateProjection(),this.isProjectionDirty=!0}setOptions(f){this.options={...this.options,...f,crossfade:f.crossfade!==void 0?f.crossfade:!0}}clearMeasurements(){this.scroll=void 0,this.layout=void 0,this.snapshot=void 0,this.prevTransformTemplateValue=void 0,this.targetDelta=void 0,this.target=void 0,this.isLayoutDirty=!1}forceRelativeParentToResolveTarget(){this.relativeParent&&this.relativeParent.resolvedRelativeTargetAt!==mt.timestamp&&this.relativeParent.resolveTargetDelta(!0)}resolveTargetDelta(f=!1){var j;const m=this.getLead();this.isProjectionDirty||(this.isProjectionDirty=m.isProjectionDirty),this.isTransformDirty||(this.isTransformDirty=m.isTransformDirty),this.isSharedProjectionDirty||(this.isSharedProjectionDirty=m.isSharedProjectionDirty);const g=!!this.resumingFrom||this!==m;if(!(f||g&&this.isSharedProjectionDirty||this.isProjectionDirty||(j=this.parent)!=null&&j.isProjectionDirty||this.attemptToResolveRelativeTarget||this.root.updateBlockedByResize))return;const{layout:v,layoutId:x}=this.options;if(!this.layout||!(v||x))return;this.resolvedRelativeTargetAt=mt.timestamp;const b=this.getClosestProjectingParent();b&&this.linkedParentVersion!==b.layoutVersion&&!b.options.layoutRoot&&this.removeRelativeTarget(),!this.targetDelta&&!this.relativeTarget&&(this.options.layoutAnchor!==!1&&b&&b.layout?this.createRelativeTarget(b,this.layout.layoutBox,b.layout.layoutBox):this.removeRelativeTarget()),!(!this.relativeTarget&&!this.targetDelta)&&(this.target||(this.target=it(),this.targetWithTransforms=it()),this.relativeTarget&&this.relativeTargetOrigin&&this.relativeParent&&this.relativeParent.target?(this.forceRelativeParentToResolveTarget(),CE(this.target,this.relativeTarget,this.relativeParent.target,this.options.layoutAnchor||void 0)):this.targetDelta?(this.resumingFrom?this.applyTransform(this.layout.layoutBox,!1,this.target):rn(this.target,this.layout.layoutBox),ix(this.target,this.targetDelta)):rn(this.target,this.layout.layoutBox),this.attemptToResolveRelativeTarget&&(this.attemptToResolveRelativeTarget=!1,this.options.layoutAnchor!==!1&&b&&!!b.resumingFrom==!!this.resumingFrom&&!b.options.layoutScroll&&b.target&&this.animationProgress!==1?this.createRelativeTarget(b,this.target,b.target):this.relativeParent=this.relativeTarget=void 0))}getClosestProjectingParent(){if(!(!this.parent||Md(this.parent.latestValues)||ax(this.parent.latestValues)))return this.parent.isProjecting()?this.parent:this.parent.getClosestProjectingParent()}isProjecting(){return!!((this.relativeTarget||this.targetDelta||this.options.layoutRoot)&&this.layout)}createRelativeTarget(f,m,g){this.relativeParent=f,this.linkedParentVersion=f.layoutVersion,this.forceRelativeParentToResolveTarget(),this.relativeTarget=it(),this.relativeTargetOrigin=it(),ol(this.relativeTargetOrigin,m,g,this.options.layoutAnchor||void 0),rn(this.relativeTarget,this.relativeTargetOrigin)}removeRelativeTarget(){this.relativeParent=this.relativeTarget=void 0}calcProjection(){var E;const f=this.getLead(),m=!!this.resumingFrom||this!==f;let g=!0;if((this.isProjectionDirty||(E=this.parent)!=null&&E.isProjectionDirty)&&(g=!1),m&&(this.isSharedProjectionDirty||this.isTransformDirty)&&(g=!1),this.resolvedRelativeTargetAt===mt.timestamp&&(g=!1),g)return;const{layout:p,layoutId:v}=this.options;if(this.isTreeAnimating=!!(this.parent&&this.parent.isTreeAnimating||this.currentAnimation||this.pendingAnimation),this.isTreeAnimating||(this.targetDelta=this.relativeTarget=void 0),!this.layout||!(p||v))return;rn(this.layoutCorrected,this.layout.layoutBox);const x=this.treeScale.x,b=this.treeScale.y;tE(this.layoutCorrected,this.treeScale,this.path,m),f.layout&&!f.target&&(this.treeScale.x!==1||this.treeScale.y!==1)&&(f.target=f.layout.layoutBox,f.targetWithTransforms=it());const{target:j}=f;if(!j){this.prevProjectionDelta&&(this.createProjectionDeltas(),this.scheduleRender());return}!this.projectionDelta||!this.prevProjectionDelta?this.createProjectionDeltas():(My(this.prevProjectionDelta.x,this.projectionDelta.x),My(this.prevProjectionDelta.y,this.projectionDelta.y)),Fi(this.projectionDelta,this.layoutCorrected,j,this.latestValues),(this.treeScale.x!==x||this.treeScale.y!==b||!qy(this.projectionDelta.x,this.prevProjectionDelta.x)||!qy(this.projectionDelta.y,this.prevProjectionDelta.y))&&(this.hasProjected=!0,this.scheduleRender(),this.notifyListeners("projectionUpdate",j))}hide(){this.isVisible=!1}show(){this.isVisible=!0}scheduleRender(f=!0){var m;if((m=this.options.visualElement)==null||m.scheduleRender(),f){const g=this.getStack();g&&g.scheduleRender()}this.resumingFrom&&!this.resumingFrom.instance&&(this.resumingFrom=void 0)}createProjectionDeltas(){this.prevProjectionDelta=Va(),this.projectionDelta=Va(),this.projectionDeltaWithTransform=Va()}setAnimationOrigin(f,m=!1,g){const p=this.snapshot,v=p?p.latestValues:{},x={...this.latestValues},b=Va();(!this.relativeParent||!this.relativeParent.options.layoutRoot)&&(this.relativeTarget=this.relativeTargetOrigin=void 0),this.attemptToResolveRelativeTarget=!m;const j=it(),E=p?p.source:void 0,T=this.layout?this.layout.source:void 0,A=E!==T,R=this.getStack(),M=!R||R.members.length<=1,_=!!(A&&!M&&this.options.crossfade===!0&&!this.path.some(nT));this.animationProgress=0;let V;const L=g==null?void 0:g.interpolateProjection(f);this.mixTargetDelta=P=>{const k=P/1e3,N=L==null?void 0:L(k);N?(b.x.translate=N.x,b.x.scale=qe(f.x.scale,1,k),b.x.origin=f.x.origin,b.x.originPoint=f.x.originPoint,b.y.translate=N.y,b.y.scale=qe(f.y.scale,1,k),b.y.origin=f.y.origin,b.y.originPoint=f.y.originPoint):(Ky(b.x,f.x,k),Ky(b.y,f.y,k)),this.setTargetDelta(b),this.relativeTarget&&this.relativeTargetOrigin&&this.layout&&this.relativeParent&&this.relativeParent.layout&&(ol(j,this.layout.layoutBox,this.relativeParent.layout.layoutBox,this.options.layoutAnchor||void 0),tT(this.relativeTarget,this.relativeTargetOrigin,j,k),V&&ME(this.relativeTarget,V)&&(this.isProjectionDirty=!1),V||(V=it()),rn(V,this.relativeTarget)),A&&(this.animationValues=x,OE(x,v,this.latestValues,k,_,M)),N&&N.rotate!==void 0&&(this.animationValues||(this.animationValues=x),this.animationValues.pathRotation=N.rotate),this.root.scheduleUpdateProjection(),this.scheduleRender(),this.animationProgress=k},this.mixTargetDelta(this.options.layoutRoot?1e3:0)}startAnimation(f){var m,g,p;this.notifyListeners("animationStart"),(m=this.currentAnimation)==null||m.stop(),(p=(g=this.resumingFrom)==null?void 0:g.currentAnimation)==null||p.stop(),this.pendingAnimation&&(gr(this.pendingAnimation),this.pendingAnimation=void 0),this.pendingAnimation=Ye.update(()=>{Ko.hasAnimatedSinceResize=!0,this.motionValue||(this.motionValue=Ua(0)),this.motionValue.jump(0,!1),this.currentAnimation=VE(this.motionValue,[0,1e3],{...f,velocity:0,isSync:!0,onUpdate:v=>{this.mixTargetDelta(v),f.onUpdate&&f.onUpdate(v)},onComplete:()=>{f.onComplete&&f.onComplete(),this.completeAnimation()}}),this.resumingFrom&&(this.resumingFrom.currentAnimation=this.currentAnimation),this.pendingAnimation=void 0})}completeAnimation(){this.resumingFrom&&(this.resumingFrom.currentAnimation=void 0,this.resumingFrom.preserveOpacity=void 0);const f=this.getStack();f&&f.exitAnimationComplete(),this.resumingFrom=this.currentAnimation=this.animationValues=void 0,this.notifyListeners("animationComplete")}finishAnimation(){this.currentAnimation&&(this.mixTargetDelta&&this.mixTargetDelta(qE),this.currentAnimation.stop()),this.completeAnimation()}applyTransformsToTarget(){const f=this.getLead();let{targetWithTransforms:m,target:g,layout:p,latestValues:v}=f;if(!(!m||!g||!p)){if(this!==f&&this.layout&&p&&wx(this.options.animationType,this.layout.layoutBox,p.layoutBox)){g=this.target||it();const x=bt(this.layout.layoutBox.x);g.x.min=f.target.x.min,g.x.max=g.x.min+x;const b=bt(this.layout.layoutBox.y);g.y.min=f.target.y.min,g.y.max=g.y.min+b}rn(m,g),$o(m,v),Fi(this.projectionDeltaWithTransform,this.layoutCorrected,m,v)}}registerSharedNode(f,m){this.sharedNodes.has(f)||this.sharedNodes.set(f,new HE),this.sharedNodes.get(f).add(m);const p=m.options.initialPromotionConfig;m.promote({transition:p?p.transition:void 0,preserveFollowOpacity:p&&p.shouldPreserveFollowOpacity?p.shouldPreserveFollowOpacity(m):void 0})}isLead(){const f=this.getStack();return f?f.lead===this:!0}getLead(){var m;const{layoutId:f}=this.options;return f?((m=this.getStack())==null?void 0:m.lead)||this:this}getPrevLead(){var m;const{layoutId:f}=this.options;return f?(m=this.getStack())==null?void 0:m.prevLead:void 0}getStack(){const{layoutId:f}=this.options;if(f)return this.root.sharedNodes.get(f)}promote({needsReset:f,transition:m,preserveFollowOpacity:g}={}){const p=this.getStack();p&&p.promote(this,g),f&&(this.projectionDelta=void 0,this.needsReset=!0),m&&this.setOptions({transition:m})}relegate(){const f=this.getStack();return f?f.relegate(this):!1}resetSkewAndRotation(){const{visualElement:f}=this.options;if(!f)return;let m=!1;const{latestValues:g}=f;if((g.z||g.rotate||g.rotateX||g.rotateY||g.rotateZ||g.skewX||g.skewY)&&(m=!0),!m)return;const p={};g.z&&Qu("z",f,p,this.animationValues);for(let v=0;v<Zu.length;v++)Qu(`rotate${Zu[v]}`,f,p,this.animationValues),Qu(`skew${Zu[v]}`,f,p,this.animationValues);f.render();for(const v in p)f.setStaticValue(v,p[v]),this.animationValues&&(this.animationValues[v]=p[v]);f.scheduleRender()}applyProjectionStyles(f,m){if(!this.instance||this.isSVG)return;if(!this.isVisible){f.visibility="hidden";return}const g=this.getTransformTemplate();if(this.needsReset){this.needsReset=!1,f.visibility="",f.opacity="",f.pointerEvents=Fo(m==null?void 0:m.pointerEvents)||"",f.transform=g?g(this.latestValues,""):"none";return}const p=this.getLead();if(!this.projectionDelta||!this.layout||!p.target){this.options.layoutId&&(f.opacity=this.latestValues.opacity!==void 0?this.latestValues.opacity:1,f.pointerEvents=Fo(m==null?void 0:m.pointerEvents)||""),this.hasProjected&&!Lr(this.latestValues)&&(f.transform=g?g({},""):"none",this.hasProjected=!1);return}f.visibility="";const v=p.animationValues||p.latestValues;this.applyTransformsToTarget();let x=kE(this.projectionDeltaWithTransform,this.treeScale,v);g&&(x=g(v,x)),f.transform=x;const{x:b,y:j}=this.projectionDelta;f.transformOrigin=`${b.origin*100}% ${j.origin*100}% 0`,p.animationValues?f.opacity=p===this?v.opacity??this.latestValues.opacity??1:this.preserveOpacity?this.latestValues.opacity:v.opacityExit:f.opacity=p===this?v.opacity!==void 0?v.opacity:"":v.opacityExit!==void 0?v.opacityExit:0;for(const E in Rd){if(v[E]===void 0)continue;const{correct:T,applyTo:A,isCSSVariable:R}=Rd[E],M=x==="none"?v[E]:T(v[E],p);if(A){const _=A.length;for(let V=0;V<_;V++)f[A[V]]=M}else R?this.options.visualElement.renderState.vars[E]=M:f[E]=M}this.options.layoutId&&(f.pointerEvents=p===this?Fo(m==null?void 0:m.pointerEvents)||"":"none")}clearSnapshot(){this.resumeFrom=this.snapshot=void 0}resetTree(){this.root.nodes.forEach(f=>{var m;return(m=f.currentAnimation)==null?void 0:m.stop()}),this.root.nodes.forEach(Xy),this.root.sharedNodes.clear()}}}function GE(n){n.updateLayout()}function PE(n){var s;const a=((s=n.resumeFrom)==null?void 0:s.snapshot)||n.snapshot;if(n.isLead()&&n.layout&&a&&n.hasListeners("didUpdate")){const{layoutBox:o,measuredBox:c}=n.layout,{animationType:h}=n.options,f=a.source!==n.layout.source;if(h==="size")mn(x=>{const b=f?a.measuredBox[x]:a.layoutBox[x],j=bt(b);b.min=o[x].min,b.max=b.min+j});else if(h==="x"||h==="y"){const x=h==="x"?"y":"x";Od(f?a.measuredBox[x]:a.layoutBox[x],o[x])}else wx(h,a.layoutBox,o)&&mn(x=>{const b=f?a.measuredBox[x]:a.layoutBox[x],j=bt(o[x]);b.max=b.min+j,n.relativeTarget&&!n.currentAnimation&&(n.isProjectionDirty=!0,n.relativeTarget[x].max=n.relativeTarget[x].min+j)});const m=Va();Fi(m,o,a.layoutBox);const g=Va();f?Fi(g,n.applyTransform(c,!0),a.measuredBox):Fi(g,o,a.layoutBox);const p=!yx(m);let v=!1;if(!n.resumeFrom){const x=n.getClosestProjectingParent();if(x&&!x.resumeFrom){const{snapshot:b,layout:j}=x;if(b&&j){const E=n.options.layoutAnchor||void 0,T=it();ol(T,a.layoutBox,b.layoutBox,E);const A=it();ol(A,o,j.layoutBox,E),vx(T,A)||(v=!0),x.options.layoutRoot&&(n.relativeTarget=A,n.relativeTargetOrigin=T,n.relativeParent=x)}}}n.notifyListeners("didUpdate",{layout:o,snapshot:a,delta:g,layoutDelta:m,hasLayoutChanged:p,hasRelativeLayoutChanged:v})}else if(n.isLead()){const{onExitComplete:o}=n.options;o&&o()}n.options.transition=void 0}function XE(n){n.parent&&(n.isProjecting()||(n.isProjectionDirty=n.parent.isProjectionDirty),n.isSharedProjectionDirty||(n.isSharedProjectionDirty=!!(n.isProjectionDirty||n.parent.isProjectionDirty||n.parent.isSharedProjectionDirty)),n.isTransformDirty||(n.isTransformDirty=n.parent.isTransformDirty))}function $E(n){n.isProjectionDirty=n.isSharedProjectionDirty=n.isTransformDirty=!1}function FE(n){n.clearSnapshot()}function Xy(n){n.clearMeasurements()}function KE(n){n.isLayoutDirty=!0,n.updateLayout()}function $y(n){n.isLayoutDirty=!1}function ZE(n){n.isAnimationBlocked&&n.layout&&!n.isLayoutDirty&&(n.snapshot=n.layout,n.isLayoutDirty=!0)}function QE(n){const{visualElement:a}=n.options;a&&a.getProps().onBeforeLayoutMeasure&&a.notify("BeforeLayoutMeasure"),n.resetTransform()}function Fy(n){n.finishAnimation(),n.targetDelta=n.relativeTarget=n.target=void 0,n.isProjectionDirty=!0}function JE(n){n.resolveTargetDelta()}function WE(n){n.calcProjection()}function IE(n){n.resetSkewAndRotation()}function eT(n){n.removeLeadSnapshot()}function Ky(n,a,s){n.translate=qe(a.translate,0,s),n.scale=qe(a.scale,1,s),n.origin=a.origin,n.originPoint=a.originPoint}function Zy(n,a,s,o){n.min=qe(a.min,s.min,o),n.max=qe(a.max,s.max,o)}function tT(n,a,s,o){Zy(n.x,a.x,s.x,o),Zy(n.y,a.y,s.y,o)}function nT(n){return n.animationValues&&n.animationValues.opacityExit!==void 0}const rT={duration:.45,ease:[.4,0,.1,1]},Qy=n=>typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().includes(n),Jy=Qy("applewebkit/")&&!Qy("chrome/")?Math.round:It;function Wy(n){n.min=Jy(n.min),n.max=Jy(n.max)}function aT(n){Wy(n.x),Wy(n.y)}function wx(n,a,s){return n==="position"||n==="preserve-aspect"&&!TE(Hy(a),Hy(s),.2)}function iT(n){var a;return n!==n.root&&((a=n.scroll)==null?void 0:a.wasRoot)}const sT=Sx({attachResizeListener:(n,a)=>es(n,"resize",a),measureScroll:()=>{var n,a;return{x:document.documentElement.scrollLeft||((n=document.body)==null?void 0:n.scrollLeft)||0,y:document.documentElement.scrollTop||((a=document.body)==null?void 0:a.scrollTop)||0}},checkIsScrollRoot:()=>!0}),Ju={current:void 0},jx=Sx({measureScroll:n=>({x:n.scrollLeft,y:n.scrollTop}),defaultParent:()=>{if(!Ju.current){const n=new sT({});n.mount(window),n.setOptions({layoutScroll:!0}),Ju.current=n}return Ju.current},resetTransform:(n,a)=>{n.style.transform=a!==void 0?a:"none"},checkIsScrollRoot:n=>window.getComputedStyle(n).position==="fixed"}),Af=S.createContext({transformPagePoint:n=>n,isStatic:!1,reducedMotion:"never"});function Iy(n,a){if(typeof n=="function")return n(a);n!=null&&(n.current=a)}function oT(...n){return a=>{let s=!1;const o=n.map(c=>{const h=Iy(c,a);return!s&&typeof h=="function"&&(s=!0),h});if(s)return()=>{for(let c=0;c<o.length;c++){const h=o[c];typeof h=="function"?h():Iy(n[c],null)}}}}function lT(...n){return S.useCallback(oT(...n),n)}class cT extends S.Component{getSnapshotBeforeUpdate(a){const s=this.props.childRef.current;if(Yo(s)&&a.isPresent&&!this.props.isPresent&&this.props.pop!==!1){const o=s.offsetParent,c=Yo(o)&&o.offsetWidth||0,h=Yo(o)&&o.offsetHeight||0,f=getComputedStyle(s),m=this.props.sizeRef.current;m.height=parseFloat(f.height),m.width=parseFloat(f.width),m.top=s.offsetTop,m.left=s.offsetLeft,m.right=c-m.width-m.left,m.bottom=h-m.height-m.top,m.direction=f.direction}return null}componentDidUpdate(){}render(){return this.props.children}}function uT({children:n,isPresent:a,anchorX:s,anchorY:o,root:c,pop:h}){var b;const f=S.useId(),m=S.useRef(null),g=S.useRef({width:0,height:0,top:0,left:0,right:0,bottom:0,direction:"ltr"}),{nonce:p}=S.useContext(Af),v=h!==!1?((b=n.props)==null?void 0:b.ref)??(n==null?void 0:n.ref):void 0,x=lT(m,v);return S.useInsertionEffect(()=>{const{width:j,height:E,top:T,left:A,right:R,bottom:M,direction:_}=g.current;if(a||h===!1||!m.current||!j||!E)return;const V=_==="rtl",L=s==="left"?V?`right: ${R}`:`left: ${A}`:V?`left: ${A}`:`right: ${R}`,P=o==="bottom"?`bottom: ${M}`:`top: ${T}`;m.current.dataset.motionPopId=f;const k=document.createElement("style");p&&(k.nonce=p);const N=c??document.head;return N.appendChild(k),k.sheet&&k.sheet.insertRule(`
          [data-motion-pop-id="${f}"] {
            position: absolute !important;
            width: ${j}px !important;
            height: ${E}px !important;
            ${L}px !important;
            ${P}px !important;
          }
        `),()=>{var G;(G=m.current)==null||G.removeAttribute("data-motion-pop-id"),N.contains(k)&&N.removeChild(k)}},[a]),u.jsx(cT,{isPresent:a,childRef:m,sizeRef:g,pop:h,children:h===!1?n:S.cloneElement(n,{ref:x})})}const dT=({children:n,initial:a,isPresent:s,onExitComplete:o,custom:c,presenceAffectsLayout:h,mode:f,anchorX:m,anchorY:g,root:p})=>{const v=ef(fT),x=S.useId(),b=S.useRef(s),j=S.useRef(o);tf(()=>{b.current=s,j.current=o});let E=!0,T=S.useMemo(()=>(E=!1,{id:x,initial:a,isPresent:s,custom:c,onExitComplete:A=>{v.set(A,!0);for(const R of v.values())if(!R)return;o&&o()},register:A=>(v.set(A,!1),()=>{var R;v.delete(A),!b.current&&!v.size&&((R=j.current)==null||R.call(j))})}),[s,v,o]);return h&&E&&(T={...T}),S.useMemo(()=>{v.forEach((A,R)=>v.set(R,!1))},[s]),S.useEffect(()=>{!s&&!v.size&&o&&o()},[s]),n=u.jsx(uT,{pop:f==="popLayout",isPresent:s,anchorX:m,anchorY:g,root:p,children:n}),u.jsx(ul.Provider,{value:T,children:n})};function fT(){return new Map}function Ex(n=!0){const a=S.useContext(ul);if(a===null)return[!0,null];const{isPresent:s,onExitComplete:o,register:c}=a,h=S.useId();S.useEffect(()=>{if(n)return c(h)},[n]);const f=S.useCallback(()=>n&&o&&o(h),[h,o,n]);return!s&&o?[!1,f]:[!0]}const ko=n=>n.key||"";function ev(n){const a=[];return S.Children.forEach(n,s=>{S.isValidElement(s)&&a.push(s)}),a}const hT=({children:n,custom:a,initial:s=!0,onExitComplete:o,presenceAffectsLayout:c=!0,mode:h="sync",propagate:f=!1,anchorX:m="left",anchorY:g="top",root:p})=>{const[v,x]=Ex(f),b=S.useMemo(()=>ev(n),[n]),j=f&&!v?[]:b.map(ko),E=S.useRef(!0),T=S.useRef(b),A=ef(()=>new Map),R=S.useRef(new Set),[M,_]=S.useState(b),[V,L]=S.useState(b);tf(()=>{E.current=!1,T.current=b;for(let N=0;N<V.length;N++){const G=ko(V[N]);j.includes(G)?(A.delete(G),R.current.delete(G)):A.get(G)!==!0&&A.set(G,!1)}},[V,j.length,j.join("-")]);const P=[];if(b!==M){let N=[...b];for(let G=0;G<V.length;G++){const F=V[G],ee=ko(F);j.includes(ee)||(N.splice(G,0,F),P.push(F))}return h==="wait"&&P.length&&(N=P),L(ev(N)),_(b),null}const{forceRender:k}=S.useContext(Id);return u.jsx(u.Fragment,{children:V.map(N=>{const G=ko(N),F=f&&!v?!1:b===V||j.includes(G),ee=()=>{if(R.current.has(G))return;if(A.has(G))R.current.add(G),A.set(G,!0);else return;let ie=!0;A.forEach(ge=>{ge||(ie=!1)}),ie&&(k==null||k(),L(T.current),f&&(x==null||x()),o&&o())};return u.jsx(dT,{isPresent:F,initial:!E.current||s?void 0:!1,custom:a,presenceAffectsLayout:c,mode:h,root:p,onExitComplete:F?void 0:ee,anchorX:m,anchorY:g,children:N},G)})})},Tx=S.createContext({strict:!1}),tv={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]};let nv=!1;function mT(){if(nv)return;const n={};for(const a in tv)n[a]={isEnabled:s=>tv[a].some(o=>!!s[o])};tx(n),nv=!0}function Cx(){return mT(),Jj()}function pT(n){const a=Cx();for(const s in n)a[s]={...a[s],...n[s]};tx(a)}const gT=new Set(["animate","exit","variants","initial","style","values","variants","transition","transformTemplate","custom","inherit","onBeforeLayoutMeasure","onAnimationStart","onAnimationComplete","onUpdate","onDragStart","onDrag","onDragEnd","onMeasureDragConstraints","onDirectionLock","onDragTransitionEnd","_dragX","_dragY","onHoverStart","onHoverEnd","onViewportEnter","onViewportLeave","globalTapTarget","propagate","ignoreStrict","viewport"]);function ll(n){return n.startsWith("while")||n.startsWith("drag")&&n!=="draggable"||n.startsWith("layout")||n.startsWith("onTap")||n.startsWith("onPan")||n.startsWith("onLayout")||gT.has(n)}let Ax=n=>!ll(n);function yT(n){typeof n=="function"&&(Ax=a=>a.startsWith("on")?!ll(a):n(a))}try{yT(require("@emotion/is-prop-valid").default)}catch{}function vT(n,a,s){const o={};for(const c in n)c==="values"&&typeof n.values=="object"||pt(n[c])||(Ax(c)||s===!0&&ll(c)||!a&&!ll(c)||n.draggable&&c.startsWith("onDrag"))&&(o[c]=n[c]);return o}const pl=S.createContext({});function xT(n,a){if(ml(n)){const{initial:s,animate:o}=n;return{initial:s===!1||Ii(s)?s:void 0,animate:Ii(o)?o:void 0}}return n.inherit!==!1?a:{}}function bT(n){const{initial:a,animate:s}=xT(n,S.useContext(pl));return S.useMemo(()=>({initial:a,animate:s}),[rv(a),rv(s)])}function rv(n){return Array.isArray(n)?n.join(" "):n}const Df=()=>({style:{},transform:{},transformOrigin:{},vars:{}});function Dx(n,a,s){for(const o in a)!pt(a[o])&&!lx(o,s)&&(n[o]=a[o])}function ST({transformTemplate:n},a){return S.useMemo(()=>{const s=Df();return Tf(s,a,n),Object.assign({},s.vars,s.style)},[a])}function wT(n,a){const s=n.style||{},o={};return Dx(o,s,n),Object.assign(o,ST(n,a)),o}function jT(n,a){const s={},o=wT(n,a);return n.drag&&n.dragListener!==!1&&(s.draggable=!1,o.userSelect=o.WebkitUserSelect=o.WebkitTouchCallout="none",o.touchAction=n.drag===!0?"none":`pan-${n.drag==="x"?"y":"x"}`),n.tabIndex===void 0&&(n.onTap||n.onTapStart||n.whileTap)&&(s.tabIndex=0),s.style=o,s}const Nx=()=>({...Df(),attrs:{}});function ET(n,a,s,o){const c=S.useMemo(()=>{const h=Nx();return cx(h,a,dx(o),n.transformTemplate,n.style),{...h.attrs,style:{...h.style}}},[a]);if(n.style){const h={};Dx(h,n.style,n),c.style={...h,...c.style}}return c}const TT=["animate","circle","defs","desc","ellipse","g","image","line","filter","marker","mask","metadata","path","pattern","polygon","polyline","rect","stop","switch","symbol","svg","text","tspan","use","view"];function Nf(n){return typeof n!="string"||n.includes("-")?!1:!!(TT.indexOf(n)>-1||/[A-Z]/u.test(n))}function CT(n,a,s,{latestValues:o},c,h=!1,f){const g=(f??Nf(n)?ET:jT)(a,o,c,n),p=vT(a,typeof n=="string",h),v=n!==S.Fragment?{...p,...g,ref:s}:{},{children:x}=a,b=S.useMemo(()=>pt(x)?x.get():x,[x]);return S.createElement(n,{...v,children:b})}function AT({scrapeMotionValuesFromProps:n,createRenderState:a},s,o,c){return{latestValues:DT(s,o,c,n),renderState:a()}}function DT(n,a,s,o){const c={},h=o(n,{});for(const b in h)c[b]=Fo(h[b]);let{initial:f,animate:m}=n;const g=ml(n),p=I0(n);a&&p&&!g&&n.inherit!==!1&&(f===void 0&&(f=a.initial),m===void 0&&(m=a.animate));let v=s?s.initial===!1:!1;v=v||f===!1;const x=v?m:f;if(x&&typeof x!="boolean"&&!hl(x)){const b=Array.isArray(x)?x:[x];for(let j=0;j<b.length;j++){const E=gf(n,b[j]);if(E){const{transitionEnd:T,transition:A,...R}=E;for(const M in R){let _=R[M];if(Array.isArray(_)){const V=v?_.length-1:0;_=_[V]}_!==null&&(c[M]=_)}for(const M in T)c[M]=T[M]}}}return c}const Mx=n=>(a,s)=>{const o=S.useContext(pl),c=S.useContext(ul),h=()=>AT(n,a,o,c);return s?h():ef(h)},NT=Mx({scrapeMotionValuesFromProps:Cf,createRenderState:Df}),MT=Mx({scrapeMotionValuesFromProps:fx,createRenderState:Nx}),kT=Symbol.for("motionComponentSymbol");function RT(n,a,s){const o=S.useRef(s);S.useInsertionEffect(()=>{o.current=s});const c=S.useRef(null);return S.useCallback(h=>{var m;h&&((m=n.onMount)==null||m.call(n,h)),a&&(h?a.mount(h):a.unmount());const f=o.current;if(typeof f=="function")if(h){const g=f(h);typeof g=="function"&&(c.current=g)}else c.current?(c.current(),c.current=null):f(h);else f&&(f.current=h)},[a])}const kx=S.createContext({});function Ra(n){return n&&typeof n=="object"&&Object.prototype.hasOwnProperty.call(n,"current")}function OT(n,a,s,o,c,h){var _,V;const{visualElement:f}=S.useContext(pl),m=S.useContext(Tx),g=S.useContext(ul),p=S.useContext(Af),v=p.reducedMotion,x=p.skipAnimations,b=S.useRef(null),j=S.useRef(!1);o=o||m.renderer,!b.current&&o&&(b.current=o(n,{visualState:a,parent:f,props:s,presenceContext:g,blockInitialAnimation:g?g.initial===!1:!1,reducedMotionConfig:v,skipAnimations:x,isSVG:h}),j.current&&b.current&&(b.current.manuallyAnimateOnMount=!0));const E=b.current,T=S.useContext(kx);E&&!E.projection&&c&&(E.type==="html"||E.type==="svg")&&zT(b.current,s,c,T);const A=S.useRef(!1);S.useInsertionEffect(()=>{E&&A.current&&E.update(s,g)});const R=s[q0],M=S.useRef(!!R&&typeof window<"u"&&!((_=window.MotionHandoffIsComplete)!=null&&_.call(window,R))&&((V=window.MotionHasOptimisedAnimation)==null?void 0:V.call(window,R)));return tf(()=>{j.current=!0,E&&(A.current=!0,window.MotionIsMounted=!0,E.updateFeatures(),E.scheduleRenderMicrotask(),M.current&&E.animationState&&E.animationState.animateChanges())}),S.useEffect(()=>{E&&(!M.current&&E.animationState&&E.animationState.animateChanges(),M.current&&(queueMicrotask(()=>{var L;(L=window.MotionHandoffMarkAsComplete)==null||L.call(window,R)}),M.current=!1),E.enteringChildren=void 0)}),E}function zT(n,a,s,o){const{layoutId:c,layout:h,drag:f,dragConstraints:m,layoutScroll:g,layoutRoot:p,layoutAnchor:v,layoutCrossfade:x}=a;n.projection=new s(n.latestValues,a["data-framer-portal-id"]?void 0:Rx(n.parent)),n.projection.setOptions({layoutId:c,layout:h,alwaysMeasureLayout:!!f||m&&Ra(m),visualElement:n,animationType:typeof h=="string"?h:"both",initialPromotionConfig:o,crossfade:x,layoutScroll:g,layoutRoot:p,layoutAnchor:v})}function Rx(n){if(n)return n.options.allowProjection!==!1?n.projection:Rx(n.parent)}function Wu(n,{forwardMotionProps:a=!1,type:s}={},o,c){o&&pT(o);const h=s?s==="svg":Nf(n),f=h?MT:NT;function m(p,v){let x;const b={...S.useContext(Af),...p,layoutId:_T(p)},{isStatic:j}=b,E=bT(p),T=f(p,j);if(!j&&typeof window<"u"){VT();const A=BT(b);x=A.MeasureLayout,E.visualElement=OT(n,T,b,c,A.ProjectionNode,h)}return u.jsxs(pl.Provider,{value:E,children:[x&&E.visualElement?u.jsx(x,{visualElement:E.visualElement,...b}):null,CT(n,p,RT(T,E.visualElement,v),T,j,a,h)]})}m.displayName=`motion.${typeof n=="string"?n:`create(${n.displayName??n.name??""})`}`;const g=S.forwardRef(m);return g[kT]=n,g}function _T({layoutId:n}){const a=S.useContext(Id).id;return a&&n!==void 0?a+"-"+n:n}function VT(n,a){S.useContext(Tx).strict}function BT(n){const a=Cx(),{drag:s,layout:o}=a;if(!s&&!o)return{};const c={...s,...o};return{MeasureLayout:s!=null&&s.isEnabled(n)||o!=null&&o.isEnabled(n)?c.MeasureLayout:void 0,ProjectionNode:c.ProjectionNode}}function LT(n,a){if(typeof Proxy>"u")return Wu;const s=new Map,o=(h,f)=>Wu(h,f,n,a),c=(h,f)=>o(h,f);return new Proxy(c,{get:(h,f)=>f==="create"?o:(s.has(f)||s.set(f,Wu(f,void 0,n,a)),s.get(f))})}const UT=(n,a)=>a.isSVG??Nf(n)?new mE(a):new lE(a,{allowProjection:n!==S.Fragment});class HT extends vr{constructor(a){super(a),a.animationState||(a.animationState=xE(a))}updateAnimationControlsSubscription(){const{animate:a}=this.node.getProps();hl(a)&&(this.unmountControls=a.subscribe(this.node))}mount(){this.updateAnimationControlsSubscription()}update(){const{animate:a}=this.node.getProps(),{animate:s}=this.node.prevProps||{};a!==s&&this.updateAnimationControlsSubscription()}unmount(){var a;this.node.animationState.reset(),(a=this.unmountControls)==null||a.call(this)}}let qT=0;class YT extends vr{constructor(){super(...arguments),this.id=qT++,this.isExitComplete=!1}update(){var h;if(!this.node.presenceContext)return;const{isPresent:a,onExitComplete:s}=this.node.presenceContext,{isPresent:o}=this.node.prevPresenceContext||{};if(!this.node.animationState||a===o)return;if(a&&o===!1){if(this.isExitComplete){const{initial:f,custom:m}=this.node.getProps();if(typeof f=="string"||typeof f=="object"&&f!==null&&!Array.isArray(f)){const g=Yr(this.node,f,m);if(g){const{transition:p,transitionEnd:v,...x}=g;for(const b in x)(h=this.node.getValue(b))==null||h.jump(x[b])}}this.node.animationState.reset(),this.node.animationState.animateChanges()}else this.node.animationState.setActive("exit",!1);this.isExitComplete=!1;return}const c=this.node.animationState.setActive("exit",!a);s&&!a&&c.then(()=>{this.isExitComplete=!0,s(this.id)})}mount(){const{register:a,onExitComplete:s}=this.node.presenceContext||{};s&&s(this.id),a&&(this.unmount=a(this.id))}unmount(){}}const GT={animation:{Feature:HT},exit:{Feature:YT}};function ls(n){return{point:{x:n.pageX,y:n.pageY}}}const PT=n=>a=>bf(a)&&n(a,ls(a));function Ki(n,a,s,o){return es(n,a,PT(s),o)}const Ox=({current:n})=>n?n.ownerDocument.defaultView:null,av=(n,a)=>Math.abs(n-a);function XT(n,a){const s=av(n.x,a.x),o=av(n.y,a.y);return Math.sqrt(s**2+o**2)}const iv=new Set(["auto","scroll"]);class zx{constructor(a,s,{transformPagePoint:o,contextWindow:c=window,dragSnapToOrigin:h=!1,distanceThreshold:f=3,element:m}={}){if(this.startEvent=null,this.lastMoveEvent=null,this.lastMoveEventInfo=null,this.lastRawMoveEventInfo=null,this.handlers={},this.contextWindow=window,this.scrollPositions=new Map,this.removeScrollListeners=null,this.onElementScroll=E=>{this.handleScroll(E.target)},this.onWindowScroll=()=>{this.handleScroll(window)},this.updatePoint=()=>{if(!(this.lastMoveEvent&&this.lastMoveEventInfo))return;this.lastRawMoveEventInfo&&(this.lastMoveEventInfo=Ro(this.lastRawMoveEventInfo,this.transformPagePoint));const E=Iu(this.lastMoveEventInfo,this.history),T=this.startEvent!==null,A=XT(E.offset,{x:0,y:0})>=this.distanceThreshold;if(!T&&!A)return;const{point:R}=E,{timestamp:M}=mt;this.history.push({...R,timestamp:M});const{onStart:_,onMove:V}=this.handlers;T||(_&&_(this.lastMoveEvent,E),this.startEvent=this.lastMoveEvent),V&&V(this.lastMoveEvent,E)},this.handlePointerMove=(E,T)=>{this.lastMoveEvent=E,this.lastRawMoveEventInfo=T,this.lastMoveEventInfo=Ro(T,this.transformPagePoint),Ye.update(this.updatePoint,!0)},this.handlePointerUp=(E,T)=>{this.end();const{onEnd:A,onSessionEnd:R,resumeAnimation:M}=this.handlers;if((this.dragSnapToOrigin||!this.startEvent)&&M&&M(),!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const _=Iu(E.type==="pointercancel"?this.lastMoveEventInfo:Ro(T,this.transformPagePoint),this.history);this.startEvent&&A&&A(E,_),R&&R(E,_)},!bf(a))return;this.dragSnapToOrigin=h,this.handlers=s,this.transformPagePoint=o,this.distanceThreshold=f,this.contextWindow=c||window;const g=ls(a),p=Ro(g,this.transformPagePoint),{point:v}=p,{timestamp:x}=mt;this.history=[{...v,timestamp:x}];const{onSessionStart:b}=s;b&&b(a,Iu(p,this.history));const j={passive:!0,capture:!0};this.removeListeners=is(Ki(this.contextWindow,"pointermove",this.handlePointerMove,j),Ki(this.contextWindow,"pointerup",this.handlePointerUp,j),Ki(this.contextWindow,"pointercancel",this.handlePointerUp,j)),m&&this.startScrollTracking(m)}startScrollTracking(a){let s=a.parentElement;for(;s;){const o=getComputedStyle(s);(iv.has(o.overflowX)||iv.has(o.overflowY))&&this.scrollPositions.set(s,{x:s.scrollLeft,y:s.scrollTop}),s=s.parentElement}this.scrollPositions.set(window,{x:window.scrollX,y:window.scrollY}),window.addEventListener("scroll",this.onElementScroll,{capture:!0}),window.addEventListener("scroll",this.onWindowScroll),this.removeScrollListeners=()=>{window.removeEventListener("scroll",this.onElementScroll,{capture:!0}),window.removeEventListener("scroll",this.onWindowScroll)}}handleScroll(a){const s=this.scrollPositions.get(a);if(!s)return;const o=a===window,c=o?{x:window.scrollX,y:window.scrollY}:{x:a.scrollLeft,y:a.scrollTop},h={x:c.x-s.x,y:c.y-s.y};h.x===0&&h.y===0||(o?this.lastMoveEventInfo&&(this.lastMoveEventInfo.point.x+=h.x,this.lastMoveEventInfo.point.y+=h.y):this.history.length>0&&(this.history[0].x-=h.x,this.history[0].y-=h.y),this.scrollPositions.set(a,c),Ye.update(this.updatePoint,!0))}updateHandlers(a){this.handlers=a}end(){this.removeListeners&&this.removeListeners(),this.removeScrollListeners&&this.removeScrollListeners(),this.scrollPositions.clear(),gr(this.updatePoint)}}function Ro(n,a){return a?{point:a(n.point)}:n}function sv(n,a){return{x:n.x-a.x,y:n.y-a.y}}function Iu({point:n},a){return{point:n,delta:sv(n,_x(a)),offset:sv(n,$T(a)),velocity:FT(a,.1)}}function $T(n){return n[0]}function _x(n){return n[n.length-1]}function FT(n,a){if(n.length<2)return{x:0,y:0};let s=n.length-1,o=null;const c=_x(n);for(;s>=0&&(o=n[s],!(c.timestamp-o.timestamp>Ht(a)));)s--;if(!o)return{x:0,y:0};o===n[0]&&n.length>2&&c.timestamp-o.timestamp>Ht(a)*2&&(o=n[1]);const h=Wt(c.timestamp-o.timestamp);if(h===0)return{x:0,y:0};const f={x:(c.x-o.x)/h,y:(c.y-o.y)/h};return f.x===1/0&&(f.x=0),f.y===1/0&&(f.y=0),f}function KT(n,{min:a,max:s},o){return a!==void 0&&n<a?n=o?qe(a,n,o.min):Math.max(n,a):s!==void 0&&n>s&&(n=o?qe(s,n,o.max):Math.min(n,s)),n}function ov(n,a,s){return{min:a!==void 0?n.min+a:void 0,max:s!==void 0?n.max+s-(n.max-n.min):void 0}}function ZT(n,{top:a,left:s,bottom:o,right:c}){return{x:ov(n.x,s,c),y:ov(n.y,a,o)}}function lv(n,a){let s=a.min-n.min,o=a.max-n.max;return a.max-a.min<n.max-n.min&&([s,o]=[o,s]),{min:s,max:o}}function QT(n,a){return{x:lv(n.x,a.x),y:lv(n.y,a.y)}}function JT(n,a){let s=.5;const o=bt(n),c=bt(a);return c>o?s=Ji(a.min,a.max-o,n.min):o>c&&(s=Ji(n.min,n.max-c,a.min)),vn(0,1,s)}function WT(n,a){const s={};return a.min!==void 0&&(s.min=a.min-n.min),a.max!==void 0&&(s.max=a.max-n.min),s}const zd=.35;function IT(n=zd){return n===!1?n=0:n===!0&&(n=zd),{x:cv(n,"left","right"),y:cv(n,"top","bottom")}}function cv(n,a,s){return{min:uv(n,a),max:uv(n,s)}}function uv(n,a){return typeof n=="number"?n:n[a]||0}const eC=new WeakMap;class tC{constructor(a){this.openDragLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},this.constraints=!1,this.hasMutatedConstraints=!1,this.elastic=it(),this.latestPointerEvent=null,this.latestPanInfo=null,this.visualElement=a}start(a,{snapToCursor:s=!1,distanceThreshold:o}={}){const{presenceContext:c}=this.visualElement;if(c&&c.isPresent===!1)return;const h=x=>{s&&this.snapToCursor(ls(x).point),this.stopAnimation()},f=(x,b)=>{const{drag:j,dragPropagation:E,onDragStart:T}=this.getProps();if(j&&!E&&(this.openDragLock&&this.openDragLock(),this.openDragLock=Dj(j),!this.openDragLock))return;this.latestPointerEvent=x,this.latestPanInfo=b,this.isDragging=!0,this.currentDirection=null,this.resolveConstraints(),this.visualElement.projection&&(this.visualElement.projection.isAnimationBlocked=!0,this.visualElement.projection.target=void 0),mn(R=>{let M=this.getAxisMotionValue(R).get()||0;if(yn.test(M)){const{projection:_}=this.visualElement;if(_&&_.layout){const V=_.layout.layoutBox[R];V&&(M=bt(V)*(parseFloat(M)/100))}}this.originPoint[R]=M}),T&&Ye.update(()=>T(x,b),!1,!0),Td(this.visualElement,"transform");const{animationState:A}=this.visualElement;A&&A.setActive("whileDrag",!0)},m=(x,b)=>{this.latestPointerEvent=x,this.latestPanInfo=b;const{dragPropagation:j,dragDirectionLock:E,onDirectionLock:T,onDrag:A}=this.getProps();if(!j&&!this.openDragLock)return;const{offset:R}=b;if(E&&this.currentDirection===null){this.currentDirection=rC(R),this.currentDirection!==null&&T&&T(this.currentDirection);return}this.updateAxis("x",b.point,R),this.updateAxis("y",b.point,R),this.visualElement.render(),A&&Ye.update(()=>A(x,b),!1,!0)},g=(x,b)=>{this.latestPointerEvent=x,this.latestPanInfo=b,this.stop(x,b),this.latestPointerEvent=null,this.latestPanInfo=null},p=()=>{const{dragSnapToOrigin:x}=this.getProps();(x||this.constraints)&&this.startAnimation({x:0,y:0})},{dragSnapToOrigin:v}=this.getProps();this.panSession=new zx(a,{onSessionStart:h,onStart:f,onMove:m,onSessionEnd:g,resumeAnimation:p},{transformPagePoint:this.visualElement.getTransformPagePoint(),dragSnapToOrigin:v,distanceThreshold:o,contextWindow:Ox(this.visualElement),element:this.visualElement.current})}stop(a,s){const o=a||this.latestPointerEvent,c=s||this.latestPanInfo,h=this.isDragging;if(this.cancel(),!h||!c||!o)return;const{velocity:f}=c;this.startAnimation(f);const{onDragEnd:m}=this.getProps();m&&Ye.postRender(()=>m(o,c))}cancel(){this.isDragging=!1;const{projection:a,animationState:s}=this.visualElement;a&&(a.isAnimationBlocked=!1),this.endPanSession();const{dragPropagation:o}=this.getProps();!o&&this.openDragLock&&(this.openDragLock(),this.openDragLock=null),s&&s.setActive("whileDrag",!1)}endPanSession(){this.panSession&&this.panSession.end(),this.panSession=void 0}updateAxis(a,s,o){const{drag:c}=this.getProps();if(!o||!Oo(a,c,this.currentDirection))return;const h=this.getAxisMotionValue(a);let f=this.originPoint[a]+o[a];this.constraints&&this.constraints[a]&&(f=KT(f,this.constraints[a],this.elastic[a])),h.set(f)}resolveConstraints(){var h;const{dragConstraints:a,dragElastic:s}=this.getProps(),o=this.visualElement.projection&&!this.visualElement.projection.layout?this.visualElement.projection.measure(!1):(h=this.visualElement.projection)==null?void 0:h.layout,c=this.constraints;a&&Ra(a)?this.constraints||(this.constraints=this.resolveRefConstraints()):a&&o?this.constraints=ZT(o.layoutBox,a):this.constraints=!1,this.elastic=IT(s),c!==this.constraints&&!Ra(a)&&o&&this.constraints&&!this.hasMutatedConstraints&&mn(f=>{this.constraints!==!1&&this.getAxisMotionValue(f)&&(this.constraints[f]=WT(o.layoutBox[f],this.constraints[f]))})}resolveRefConstraints(){const{dragConstraints:a,onMeasureDragConstraints:s}=this.getProps();if(!a||!Ra(a))return!1;const o=a.current,{projection:c}=this.visualElement;if(!c||!c.layout)return!1;c.root&&(c.root.scroll=void 0,c.root.updateScroll());const h=nE(o,c.root,this.visualElement.getTransformPagePoint());let f=QT(c.layout.layoutBox,h);if(s){const m=s(Ij(f));this.hasMutatedConstraints=!!m,m&&(f=rx(m))}return f}startAnimation(a){const{drag:s,dragMomentum:o,dragElastic:c,dragTransition:h,dragSnapToOrigin:f,onDragTransitionEnd:m}=this.getProps(),g=this.constraints||{},p=mn(v=>{if(!Oo(v,s,this.currentDirection))return;let x=g&&g[v]||{};(f===!0||f===v)&&(x={min:0,max:0});const b=c?200:1e6,j=c?40:1e7,E={type:"inertia",velocity:o?a[v]:0,bounceStiffness:b,bounceDamping:j,timeConstant:750,restDelta:1,restSpeed:10,...h,...x};return this.startAxisValueAnimation(v,E)});return Promise.all(p).then(m)}startAxisValueAnimation(a,s){const o=this.getAxisMotionValue(a);return Td(this.visualElement,a),o.start(pf(a,o,0,s,this.visualElement,!1))}stopAnimation(){mn(a=>this.getAxisMotionValue(a).stop())}getAxisMotionValue(a){const s=`_drag${a.toUpperCase()}`,c=this.visualElement.getProps()[s];return c||this.visualElement.getValue(a,this.visualElement.latestValues[a]??0)}snapToCursor(a){mn(s=>{const{drag:o}=this.getProps();if(!Oo(s,o,this.currentDirection))return;const{projection:c}=this.visualElement,h=this.getAxisMotionValue(s);if(c&&c.layout){const{min:f,max:m}=c.layout.layoutBox[s],g=h.get()||0;h.set(a[s]-qe(f,m,.5)+g)}})}scalePositionWithinConstraints(){if(!this.visualElement.current)return;const{drag:a,dragConstraints:s}=this.getProps(),{projection:o}=this.visualElement;if(!Ra(s)||!o||!this.constraints)return;this.stopAnimation();const c={x:0,y:0};mn(f=>{const m=this.getAxisMotionValue(f);if(m&&this.constraints!==!1){const g=m.get();c[f]=JT({min:g,max:g},this.constraints[f])}});const{transformTemplate:h}=this.visualElement.getProps();this.visualElement.current.style.transform=h?h({},""):"none",o.root&&o.root.updateScroll(),o.updateLayout(),this.constraints=!1,this.resolveConstraints(),mn(f=>{if(!Oo(f,a,null))return;const m=this.getAxisMotionValue(f),{min:g,max:p}=this.constraints[f];m.set(qe(g,p,c[f]))}),this.visualElement.render()}addListeners(){if(!this.visualElement.current)return;eC.set(this.visualElement,this);const a=this.visualElement.current,s=Ki(a,"pointerdown",p=>{const{drag:v,dragListener:x=!0}=this.getProps(),b=p.target,j=b!==a&&zj(b);v&&x&&!j&&this.start(p)});let o;const c=()=>{const{dragConstraints:p}=this.getProps();Ra(p)&&p.current&&(this.constraints=this.resolveRefConstraints(),o||(o=nC(a,p.current,()=>this.scalePositionWithinConstraints())))},{projection:h}=this.visualElement,f=h.addEventListener("measure",c);h&&!h.layout&&(h.root&&h.root.updateScroll(),h.updateLayout()),Ye.read(c);const m=es(window,"resize",()=>this.scalePositionWithinConstraints()),g=h.addEventListener("didUpdate",(({delta:p,hasLayoutChanged:v})=>{this.isDragging&&v&&(mn(x=>{const b=this.getAxisMotionValue(x);b&&(this.originPoint[x]+=p[x].translate,b.set(b.get()+p[x].translate))}),this.visualElement.render())}));return()=>{m(),s(),f(),g&&g(),o&&o()}}getProps(){const a=this.visualElement.getProps(),{drag:s=!1,dragDirectionLock:o=!1,dragPropagation:c=!1,dragConstraints:h=!1,dragElastic:f=zd,dragMomentum:m=!0}=a;return{...a,drag:s,dragDirectionLock:o,dragPropagation:c,dragConstraints:h,dragElastic:f,dragMomentum:m}}}function dv(n){let a=!0;return()=>{if(a){a=!1;return}n()}}function nC(n,a,s){const o=vy(n,dv(s)),c=vy(a,dv(s));return()=>{o(),c()}}function Oo(n,a,s){return(a===!0||a===n)&&(s===null||s===n)}function rC(n,a=10){let s=null;return Math.abs(n.y)>a?s="y":Math.abs(n.x)>a&&(s="x"),s}class aC extends vr{constructor(a){super(a),this.removeGroupControls=It,this.removeListeners=It,this.controls=new tC(a)}mount(){const{dragControls:a}=this.node.getProps();a&&(this.removeGroupControls=a.subscribe(this.controls)),this.removeListeners=this.controls.addListeners()||It}update(){const{dragControls:a}=this.node.getProps(),{dragControls:s}=this.node.prevProps||{};a!==s&&(this.removeGroupControls(),a&&(this.removeGroupControls=a.subscribe(this.controls)))}unmount(){this.removeGroupControls(),this.removeListeners(),this.controls.isDragging||this.controls.endPanSession()}}const ed=n=>(a,s)=>{n&&Ye.update(()=>n(a,s),!1,!0)};class iC extends vr{constructor(){super(...arguments),this.removePointerDownListener=It}onPointerDown(a){this.session=new zx(a,this.createPanHandlers(),{transformPagePoint:this.node.getTransformPagePoint(),contextWindow:Ox(this.node)})}createPanHandlers(){const{onPanSessionStart:a,onPanStart:s,onPan:o,onPanEnd:c}=this.node.getProps();return{onSessionStart:ed(a),onStart:ed(s),onMove:ed(o),onEnd:(h,f)=>{delete this.session,c&&Ye.postRender(()=>c(h,f))}}}mount(){this.removePointerDownListener=Ki(this.node.current,"pointerdown",a=>this.onPointerDown(a))}update(){this.session&&this.session.updateHandlers(this.createPanHandlers())}unmount(){this.removePointerDownListener(),this.session&&this.session.end()}}let td=!1;class sC extends S.Component{componentDidMount(){const{visualElement:a,layoutGroup:s,switchLayoutGroup:o,layoutId:c}=this.props,{projection:h}=a;h&&(s.group&&s.group.add(h),o&&o.register&&c&&o.register(h),td&&h.root.didUpdate(),h.addEventListener("animationComplete",()=>{this.safeToRemove()}),h.setOptions({...h.options,layoutDependency:this.props.layoutDependency,onExitComplete:()=>this.safeToRemove()})),Ko.hasEverUpdated=!0}getSnapshotBeforeUpdate(a){const{layoutDependency:s,visualElement:o,drag:c,isPresent:h}=this.props,{projection:f}=o;return f&&(f.isPresent=h,a.layoutDependency!==s&&f.setOptions({...f.options,layoutDependency:s}),td=!0,c||a.layoutDependency!==s||s===void 0||a.isPresent!==h?f.willUpdate():this.safeToRemove(),a.isPresent!==h&&(h?f.promote():f.relegate()||Ye.postRender(()=>{const m=f.getStack();(!m||!m.members.length)&&this.safeToRemove()}))),null}componentDidUpdate(){const{visualElement:a,layoutAnchor:s}=this.props,{projection:o}=a;o&&(o.options.layoutAnchor=s,o.root.didUpdate(),xf.postRender(()=>{!o.currentAnimation&&o.isLead()&&this.safeToRemove()}))}componentWillUnmount(){const{visualElement:a,layoutGroup:s,switchLayoutGroup:o}=this.props,{projection:c}=a;td=!0,c&&(c.scheduleCheckAfterUnmount(),s&&s.group&&s.group.remove(c),o&&o.deregister&&o.deregister(c))}safeToRemove(){const{safeToRemove:a}=this.props;a&&a()}render(){return null}}function Vx(n){const[a,s]=Ex(),o=S.useContext(Id);return u.jsx(sC,{...n,layoutGroup:o,switchLayoutGroup:S.useContext(kx),isPresent:a,safeToRemove:s})}const oC={pan:{Feature:iC},drag:{Feature:aC,ProjectionNode:jx,MeasureLayout:Vx}};function fv(n,a,s){const{props:o}=n;n.animationState&&o.whileHover&&n.animationState.setActive("whileHover",s==="Start");const c="onHover"+s,h=o[c];h&&Ye.postRender(()=>h(a,ls(a)))}class lC extends vr{mount(){const{current:a}=this.node;a&&(this.unmount=Mj(a,(s,o)=>(fv(this.node,o,"Start"),c=>fv(this.node,c,"End"))))}unmount(){}}class cC extends vr{constructor(){super(...arguments),this.isActive=!1}onFocus(){let a=!1;try{a=this.node.current.matches(":focus-visible")}catch{a=!0}!a||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!0),this.isActive=!0)}onBlur(){!this.isActive||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!1),this.isActive=!1)}mount(){this.unmount=is(es(this.node.current,"focus",()=>this.onFocus()),es(this.node.current,"blur",()=>this.onBlur()))}unmount(){}}function hv(n,a,s){const{props:o}=n;if(n.current instanceof HTMLButtonElement&&n.current.disabled)return;n.animationState&&o.whileTap&&n.animationState.setActive("whileTap",s==="Start");const c="onTap"+(s==="End"?"":s),h=o[c];h&&Ye.postRender(()=>h(a,ls(a)))}class uC extends vr{mount(){const{current:a}=this.node;if(!a)return;const{globalTapTarget:s,propagate:o}=this.node.props;this.unmount=Vj(a,(c,h)=>(hv(this.node,h,"Start"),(f,{success:m})=>hv(this.node,f,m?"End":"Cancel")),{useGlobalTarget:s,stopPropagation:(o==null?void 0:o.tap)===!1})}unmount(){}}const _d=new WeakMap,nd=new WeakMap,dC=n=>{const a=_d.get(n.target);a&&a(n)},fC=n=>{n.forEach(dC)};function hC({root:n,...a}){const s=n||document;nd.has(s)||nd.set(s,{});const o=nd.get(s),c=JSON.stringify(a);return o[c]||(o[c]=new IntersectionObserver(fC,{root:n,...a})),o[c]}function mC(n,a,s){const o=hC(a);return _d.set(n,s),o.observe(n),()=>{_d.delete(n),o.unobserve(n)}}const pC={some:0,all:1};class gC extends vr{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){var g;(g=this.stopObserver)==null||g.call(this);const{viewport:a={}}=this.node.getProps(),{root:s,margin:o,amount:c="some",once:h}=a,f={root:s?s.current:void 0,rootMargin:o,threshold:typeof c=="number"?c:pC[c]},m=p=>{const{isIntersecting:v}=p;if(this.isInView===v||(this.isInView=v,h&&!v&&this.hasEnteredView))return;v&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive("whileInView",v);const{onViewportEnter:x,onViewportLeave:b}=this.node.getProps(),j=v?x:b;j&&j(p)};this.stopObserver=mC(this.node.current,f,m)}mount(){this.startObserver()}update(){if(typeof IntersectionObserver>"u")return;const{props:a,prevProps:s}=this.node;["amount","margin","root"].some(yC(a,s))&&this.startObserver()}unmount(){var a;(a=this.stopObserver)==null||a.call(this),this.hasEnteredView=!1,this.isInView=!1}}function yC({viewport:n={}},{viewport:a={}}={}){return s=>n[s]!==a[s]}const vC={inView:{Feature:gC},tap:{Feature:uC},focus:{Feature:cC},hover:{Feature:lC}},xC={layout:{ProjectionNode:jx,MeasureLayout:Vx}},bC={...GT,...vC,...oC,...xC},SC=LT(bC,UT);function Bx(){!Ef.current&&ex();const[n]=S.useState(al.current);return n}const Mf=SC,cl=new Map,mv=new Set;let wC=0;const kf=()=>{var n;return(n=window.chrome)==null?void 0:n.webview};function jC(n){var s;const a=cl.get(n.id);if(a){if(n.type==="progress"){(s=a.progress)==null||s.call(a,n.data);return}window.clearTimeout(a.timer),cl.delete(n.id),n.ok?a.resolve(n.data):a.reject(new Error(n.error||"操作失败"))}}var Qv;(Qv=kf())==null||Qv.addEventListener("message",n=>jC(n.data));function EC(n,a){var s;a&&mv.has(a)||(a&&mv.add(a),(s=kf())==null||s.postMessage({type:"app.ready",route:n,navigation:a}))}function be(n,a,s=3e4,o){const c=kf();if(!c)return Promise.reject(new Error("当前页面未连接到桌面宿主"));const h=`${Date.now()}-${++wC}`;return new Promise((f,m)=>{const g=window.setTimeout(()=>{cl.delete(h),m(new Error("操作超时，请重试"))},s);cl.set(h,{resolve:p=>f(p),reject:m,timer:g,progress:o}),c.postMessage({id:h,operation:n,payload:a})})}var Rf=Iv();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const TC=n=>n.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Lx=(...n)=>n.filter((a,s,o)=>!!a&&a.trim()!==""&&o.indexOf(a)===s).join(" ").trim();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var CC={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const AC=S.forwardRef(({color:n="currentColor",size:a=24,strokeWidth:s=2,absoluteStrokeWidth:o,className:c="",children:h,iconNode:f,...m},g)=>S.createElement("svg",{ref:g,...CC,width:a,height:a,stroke:n,strokeWidth:o?Number(s)*24/Number(a):s,className:Lx("lucide",c),...m},[...f.map(([p,v])=>S.createElement(p,v)),...Array.isArray(h)?h:[h]]));/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Me=(n,a)=>{const s=S.forwardRef(({className:o,...c},h)=>S.createElement(AC,{ref:h,iconNode:a,className:Lx(`lucide-${TC(n)}`,o),...c}));return s.displayName=`${n}`,s};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ts=Me("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const DC=Me("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ux=Me("CalendarDays",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M16 14h.01",key:"1gbofw"}],["path",{d:"M8 18h.01",key:"lrp35t"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M16 18h.01",key:"kzsmim"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const NC=Me("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cs=Me("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const MC=Me("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hx=Me("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qx=Me("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vd=Me("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pv=Me("CircleCheck",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bd=Me("Database",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kC=Me("Earth",[["path",{d:"M21.54 15H17a2 2 0 0 0-2 2v4.54",key:"1djwo0"}],["path",{d:"M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17",key:"1tzkfa"}],["path",{d:"M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05",key:"14pb5j"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const RC=Me("Ellipsis",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const OC=Me("FileSpreadsheet",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M8 13h2",key:"yr2amv"}],["path",{d:"M14 13h2",key:"un5t4a"}],["path",{d:"M8 17h2",key:"2yhykz"}],["path",{d:"M14 17h2",key:"10kma7"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zC=Me("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _C=Me("FolderInput",[["path",{d:"M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1",key:"fm4g5t"}],["path",{d:"M2 13h10",key:"pgb2dq"}],["path",{d:"m9 16 3-3-3-3",key:"6m91ic"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gv=Me("FolderOpen",[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const VC=Me("KeyRound",[["path",{d:"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",key:"1s6t7t"}],["circle",{cx:"16.5",cy:"7.5",r:".5",fill:"currentColor",key:"w0ekpg"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gl=Me("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const BC=Me("LockKeyhole",[["circle",{cx:"12",cy:"16",r:"1",key:"1au0dj"}],["rect",{x:"3",y:"10",width:"18",height:"12",rx:"2",key:"6s8ecr"}],["path",{d:"M7 10V7a5 5 0 0 1 10 0v3",key:"1pqi11"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yx=Me("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const LC=Me("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gx=Me("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const UC=Me("RotateCw",[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",key:"1p45f6"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const HC=Me("Rows3",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M21 9H3",key:"1338ky"}],["path",{d:"M21 15H3",key:"9uk58r"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qC=Me("Save",[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const YC=Me("Settings2",[["path",{d:"M20 7h-9",key:"3s1dr2"}],["path",{d:"M14 17H5",key:"gfn3mx"}],["circle",{cx:"17",cy:"17",r:"3",key:"18b49y"}],["circle",{cx:"7",cy:"7",r:"3",key:"dfmy0x"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const GC=Me("Sigma",[["path",{d:"M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2",key:"wuwx1p"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const PC=Me("SlidersHorizontal",[["line",{x1:"21",x2:"14",y1:"4",y2:"4",key:"obuewd"}],["line",{x1:"10",x2:"3",y1:"4",y2:"4",key:"1q6298"}],["line",{x1:"21",x2:"12",y1:"12",y2:"12",key:"1iu8h1"}],["line",{x1:"8",x2:"3",y1:"12",y2:"12",key:"ntss68"}],["line",{x1:"21",x2:"16",y1:"20",y2:"20",key:"14d8ph"}],["line",{x1:"12",x2:"3",y1:"20",y2:"20",key:"m0wm8r"}],["line",{x1:"14",x2:"14",y1:"2",y2:"6",key:"14e1ph"}],["line",{x1:"8",x2:"8",y1:"10",y2:"14",key:"1i6ji0"}],["line",{x1:"16",x2:"16",y1:"18",y2:"22",key:"1lctlv"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const XC=Me("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $C=Me("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const FC=Me("UserRound",[["circle",{cx:"12",cy:"8",r:"5",key:"1hypcn"}],["path",{d:"M20 21a8 8 0 0 0-16 0",key:"rfgkzh"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const KC=Me("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),ZC=["一","二","三","四","五","六","日"],QC=Array.from({length:12},(n,a)=>`${a+1}月`);function JC(n){if(!n)return null;const[a,s,o=1]=n.split("-").map(Number);return!a||!s||!o?null:new Date(a,s-1,o)}function yv(n){const a=n.getFullYear(),s=String(n.getMonth()+1).padStart(2,"0"),o=String(n.getDate()).padStart(2,"0");return`${a}-${s}-${o}`}function WC(n){const a=n.getFullYear(),s=String(n.getMonth()+1).padStart(2,"0"),o=String(n.getDate()).padStart(2,"0");return`${a}/${s}/${o}`}function IC(n,a){const s=new Date(n,a,1).getDay();return s===0?6:s-1}function eA(n,a){return new Date(n,a+1,0).getDate()}function vv(n,a){return n.getFullYear()===a.getFullYear()&&n.getMonth()===a.getMonth()&&n.getDate()===a.getDate()}function tA(n){return Math.floor(n/12)*12}function yl({value:n,onChange:a,label:s,disabled:o=!1,selectionMode:c="day"}){var C;const h=S.useId(),f=S.useMemo(()=>JC(n),[n]),[m,g]=S.useState(!1),[p,v]=S.useState(c),[x,b]=S.useState(f??new Date),[j,E]=S.useState({top:0,left:0}),[T,A]=S.useState("bottom"),R=S.useRef(null),M=S.useRef(null),_=S.useRef(null);S.useEffect(()=>{f&&b(f)},[n]);function V(){const O=R.current,J=_.current;if(!O||!J)return;const te=O.ownerDocument.defaultView||window,le=O.getBoundingClientRect(),de=J.getBoundingClientRect(),ve=de.width,re=de.height,Q=8,fe=12,I=te.innerHeight-le.bottom-fe,me=le.top-fe,Ce=re>I&&me>I,ze=Ce?"top":"bottom";let Qe=Ce?le.top-re-Q:le.bottom+Q;Qe<fe&&(Qe=fe),Qe+re>te.innerHeight-fe&&(Qe=Math.max(fe,te.innerHeight-re-fe));let $e=le.left;$e+ve>te.innerWidth-fe&&($e=te.innerWidth-ve-fe),$e<fe&&($e=fe),A(ze),E({top:Qe,left:$e})}S.useLayoutEffect(()=>{m&&V()},[m,p]),S.useEffect(()=>{var te;if(!m)return;const O=((te=R.current)==null?void 0:te.ownerDocument.defaultView)||window;function J(){V()}return O.addEventListener("resize",J),O.addEventListener("scroll",J,!0),()=>{O.removeEventListener("resize",J),O.removeEventListener("scroll",J,!0)}},[m,p]),S.useEffect(()=>{var le;const O=((le=M.current)==null?void 0:le.ownerDocument)||document;function J(de){var fe,I;const ve=de.target,re=(fe=M.current)==null?void 0:fe.contains(ve),Q=(I=_.current)==null?void 0:I.contains(ve);!re&&!Q&&(g(!1),v(c))}function te(de){de.key==="Escape"&&(g(!1),v(c))}return O.addEventListener("mousedown",J),O.addEventListener("keydown",te),()=>{O.removeEventListener("mousedown",J),O.removeEventListener("keydown",te)}},[c]);const L=x.getFullYear(),P=x.getMonth(),k=eA(L,P),N=IC(L,P),G=tA(L),F=Array.from({length:12},(O,J)=>G+J),ee=[];for(let O=0;O<N;O+=1)ee.push(null);for(let O=1;O<=k;O+=1)ee.push(O);function ie(){if(p==="day"){b(new Date(L,P-1,1));return}if(p==="month"){b(new Date(L-1,P,1));return}b(new Date(L-12,P,1))}function ge(){if(p==="day"){b(new Date(L,P+1,1));return}if(p==="month"){b(new Date(L+1,P,1));return}b(new Date(L+12,P,1))}function ce(){if(c==="month"){v(p==="month"?"year":"month");return}if(p==="day"){v("month");return}if(p==="month"){v("year");return}v("day")}function oe(O){const J=new Date(L,P,O);a(yv(J)),g(!1),v("day")}function U(O){if(c==="month"){a(`${L}-${String(O+1).padStart(2,"0")}`),b(new Date(L,O,1)),g(!1),v("month");return}b(new Date(L,O,1)),v("day")}function ae(O){b(new Date(O,P,1)),v("month")}function se(){const O=new Date;b(O),a(c==="month"?`${O.getFullYear()}-${String(O.getMonth()+1).padStart(2,"0")}`:yv(O)),v(c),g(!1)}function $(){return p==="day"?`${L}年 ${P+1}月`:p==="month"?`${L}年`:`${G} - ${G+11}`}const ne=m?u.jsxs("div",{ref:_,className:`date-picker-popover date-picker-popover-${T}`,style:{top:j.top,left:j.left},children:[u.jsxs("div",{className:"date-picker-header",children:[u.jsx("button",{type:"button",className:"date-picker-nav-button",onClick:ie,"aria-label":"上一页",children:u.jsx(Hx,{size:17,strokeWidth:1.7})}),u.jsx("button",{type:"button",className:"date-picker-title-button",onClick:ce,children:$()}),u.jsx("button",{type:"button",className:"date-picker-nav-button",onClick:ge,"aria-label":"下一页",children:u.jsx(qx,{size:17,strokeWidth:1.7})})]}),p==="day"&&u.jsxs(u.Fragment,{children:[u.jsx("div",{className:"date-picker-weekdays",children:ZC.map(O=>u.jsx("div",{children:O},O))}),u.jsx("div",{className:"date-picker-grid",children:ee.map((O,J)=>{if(O===null)return u.jsx("div",{},`empty-${J}`);const te=new Date(L,P,O),le=f?vv(te,f):!1,de=vv(te,new Date);return u.jsx("button",{type:"button",className:["date-picker-day",le?"date-picker-day-selected":"",de&&!le?"date-picker-day-today":""].filter(Boolean).join(" "),onClick:()=>oe(O),children:O},`${L}-${P}-${O}`)})})]}),p==="month"&&u.jsx("div",{className:"date-picker-month-grid",children:QC.map((O,J)=>{const te=f&&f.getFullYear()===L&&f.getMonth()===J,le=new Date().getFullYear()===L&&new Date().getMonth()===J;return u.jsx("button",{type:"button",className:["date-picker-month-item",te?"date-picker-month-item-selected":"",le&&!te?"date-picker-month-item-current":""].filter(Boolean).join(" "),onClick:()=>U(J),children:O},O)})}),p==="year"&&u.jsx("div",{className:"date-picker-year-grid",children:F.map(O=>{const J=f&&f.getFullYear()===O,te=new Date().getFullYear()===O;return u.jsx("button",{type:"button",className:["date-picker-year-item",J?"date-picker-year-item-selected":"",te&&!J?"date-picker-year-item-current":""].filter(Boolean).join(" "),onClick:()=>ae(O),children:O},O)})}),u.jsx("div",{className:"date-picker-footer",children:u.jsx("button",{type:"button",className:"date-picker-today-button",onClick:se,children:c==="month"?"回到本月":"回到今天"})})]}):null;return u.jsxs(u.Fragment,{children:[u.jsxs("div",{ref:M,className:"date-picker",children:[s&&u.jsx("label",{id:`${h}-label`,className:"date-picker-label",children:s}),u.jsxs("button",{ref:R,type:"button",disabled:o,className:`date-picker-trigger ${m?"date-picker-trigger-open":""}`,onClick:()=>{o||g(O=>{const J=!O;return J&&v(c),J})},"aria-expanded":m,"aria-labelledby":s?`${h}-label ${h}-value`:void 0,"aria-label":s?void 0:c==="month"?"选择月份":"选择日期",children:[u.jsx("span",{id:`${h}-value`,className:f?"":"date-picker-placeholder",children:f?c==="month"?`${f.getFullYear()} / ${String(f.getMonth()+1).padStart(2,"0")}`:WC(f):c==="month"?"选择月份":"选择日期"}),u.jsx(NC,{className:"date-picker-calendar-icon",size:16,strokeWidth:1.7})]})]}),ne&&Rf.createPortal(ne,((C=M.current)==null?void 0:C.ownerDocument.body)||document.body)]})}const Px=`/* Generated from tools/experiments/production_message/production_assistant_demo/src/index.css and App.css.\r
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
`,Xx=`/* Shared controls: normal typography, neutral focus and unobtrusive scrollbars. */\r
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
`,nA=`<!doctype html>\r
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
`,$x=""+new URL("Inter-VF2RPR_K.ttf",import.meta.url).href,Fx=""+new URL("NotoSansSC-Dz1u1FRy.ttf",import.meta.url).href,Pi=new Map;function rA(n,a,s=!1){const o=JSON.stringify([n,a]),c=`daily-field-cache-v1:${o}`;let h=s?void 0:Pi.get(o);if(!h&&!s)try{const f=JSON.parse(localStorage.getItem(c)||"null");f&&Array.isArray(f.metrics)&&f.metrics.every(m=>m&&typeof m.id=="string"&&typeof m.name=="string")&&(h=Promise.resolve(f),Pi.set(o,h))}catch{}return h||(h=be("daily.getProperties",{id:n,sourceId:a}).then(f=>{try{localStorage.setItem(c,JSON.stringify(f))}catch{}return f}).catch(f=>{throw Pi.delete(o),f}),Pi.set(o,h)),h}function aA(n=!1){if(Pi.clear(),n)try{Object.keys(localStorage).filter(a=>a.startsWith("daily-field-cache-v1:")).forEach(a=>localStorage.removeItem(a))}catch{}}const zo=[0,-1,-2].flatMap(n=>[{granularity:"day",key:n===0?"today":`day${n}`,label:n===0?"今日":`${n===-1?"去年":"前年"}同日`},{granularity:"mtd",key:n===0?"mtd":n===-1?"lastmonth":"mtd-2",label:n===0?"本月累计":`${n===-1?"去年":"前年"}同期月累计`},{granularity:"ytd",key:n===0?"ytd":n===-1?"last":"ytd-2",label:n===0?"本年累计":`${n===-1?"去年":"前年"}同期`},{granularity:"fullyear",key:n===0?"fullyear":n===-1?"full":"full-2",label:`${n===0?"今年":n===-1?"去年":"前年"}全年`}].map(a=>({key:a.key,label:a.label,spec:{granularity:a.granularity,yearOffset:n}}))),Kx={"system.date":'today("yyyy年M月d日")',"system.year":'today("yyyy年")',"system.month":'today("M月")',"system.day":'today("d日")'};function iA(n){return Kx[n]||n}function xv(n){const a=[[]];function s(c){c.replace(/\u00a0/g," ").split(`
`).forEach((h,f)=>{var g;if(f&&a.push([]),!h)return;const m=a.at(-1);((g=m.at(-1))==null?void 0:g.type)==="text"?m.at(-1).text+=h:m.push({type:"text",text:h})})}function o(c){var h;if(c.nodeType===3){s(c.textContent||"");return}if(c instanceof n.ownerDocument.defaultView.HTMLElement){if(c.dataset.key){const f=iA(c.dataset.key);a.at(-1).push({type:f.startsWith("today(")?"dateToken":"fieldToken",attrs:{placeholder:f,label:c.textContent||"",...c.dataset.legacySpec?{dateRangeSpec:JSON.parse(c.dataset.legacySpec)}:{}}});return}if(c.tagName==="BR"){s(`
`);return}c!==n&&["DIV","P"].includes(c.tagName)&&c.childNodes.length===1&&((h=c.firstChild)==null?void 0:h.nodeName)==="BR"||Array.from(c.childNodes).forEach((f,m)=>{m&&f.nodeType===1&&["DIV","P"].includes(f.tagName)&&s(`
`),o(f)})}}return o(n),{text:a.map(c=>c.map(h=>h.type==="text"?h.text:h.attrs.placeholder).join("")).join(`
`),document:JSON.stringify({type:"doc",content:a.map(c=>({type:"paragraph",content:c}))})}}function sA(n,a,s,o){const c=[...s,...Object.entries(Kx).map(([f,m])=>({key:m,label:f==="system.date"?"业务日期":f==="system.year"?"业务年份":f==="system.month"?"业务月份":"业务日",metric:"date",scope:"date",keywords:"",field:void 0}))].filter(f=>f.field||f.metric==="date").sort((f,m)=>m.key.length-f.key.length);let h=a;for(;h;){const f=c.map(m=>({d:m,index:h.indexOf(m.key)})).filter(m=>m.index>=0).sort((m,g)=>m.index-g.index)[0];if(!f){n.append(n.ownerDocument.createTextNode(h));break}f.index&&n.append(n.ownerDocument.createTextNode(h.slice(0,f.index))),n.append(o(f.d)),h=h.slice(f.index+f.d.key.length)}}function oA(n,a,s,o){if(!a)return!1;let c;try{c=JSON.parse(a)}catch{return!1}if(c.type!=="doc")return!1;function h(f){var m,g,p,v;if(f.type==="text"){n.append(n.ownerDocument.createTextNode(f.text||""));return}if(f.type==="hardBreak"){n.append(n.ownerDocument.createTextNode(`
`));return}if(f.type==="fieldToken"||f.type==="dateToken"){const x=((m=f.attrs)==null?void 0:m.placeholder)||"";let b=s.find(E=>E.key===x);b||(b={key:x,label:f.type==="dateToken"?"业务日期":((g=f.attrs)==null?void 0:g.label)||"已有数据",metric:f.type==="dateToken"?"date":"legacy",scope:"legacy",keywords:((p=f.attrs)==null?void 0:p.label)||""},s.push(b));const j=o(b);(v=f.attrs)!=null&&v.dateRangeSpec&&(j.dataset.legacySpec=JSON.stringify(f.attrs.dateRangeSpec)),n.append(j);return}(f.content||[]).forEach((x,b)=>{f.type==="doc"&&b&&n.append(n.ownerDocument.createTextNode(`
`)),h(x)})}return h(c),!0}function Zx({id:n,back:a,changed:s,openSettings:o}){const c=S.useRef(null),[h,f]=S.useState("");return S.useEffect(()=>{let m=!1;const g=c.current;return be("daily.get",{id:n}).then(p=>{if(m)return;const v=lA(p,{back:a,changed:s,openSettings:o});g.dailyRuntime=v,g.srcdoc=nA.replace("../../src/ProductionAssistant.App/Assets/Fonts/Inter.ttf",new URL($x,window.location.href).href).replace("../../src/ProductionAssistant.App/Assets/Fonts/NotoSansSC.ttf",new URL(Fx,window.location.href).href)}).catch(p=>{m||f(String(p.message||p))}),()=>{var p;m=!0,(p=g.dailyRuntime)==null||p.dispose()}},[n]),u.jsxs("div",{className:"message-template-host",children:[h&&u.jsx("p",{role:"alert",children:h}),u.jsx("iframe",{ref:c,title:"日报消息模板"})]})}function lA(n,a){var P;let s=!1,o=!1,c,h,f=Promise.resolve(),m=0,g;const p=new Date,v=n.fields.map(k=>{var N,G,F;return{key:k.placeholder,label:k.label.replace(" · ",""),metric:`${k.databaseId||((N=k.binding)==null?void 0:N.dataSourceId)}:${k.businessId||((G=k.binding)==null?void 0:G.businessMetricId)}`,scope:((F=zo.find(ee=>JSON.stringify(ee.spec)===JSON.stringify(k.dateRangeSpec)))==null?void 0:F.key)||"legacy",keywords:k.label,field:k}}),x=[];let b=(P=n.metricSourceIds)!=null&&P.length?n.metricSourceIds:[...new Set(n.fields.map(k=>{var N;return k.databaseId||((N=k.binding)==null?void 0:N.dataSourceId)}).filter(Boolean))];const j=new Map(n.fields.map(k=>[k.placeholder,k])),E=new Map;function T(k){const N=h==null?void 0:h.querySelector("#preview-status");N&&(N.textContent=k)}function A(){h==null||h.querySelectorAll("[data-send]").forEach(k=>k.disabled=o||!n.notificationConfigured)}async function R(k){k.text===n.draftTemplate&&k.document===n.draftTemplateDocument||(await be("daily.saveTemplate",{id:V,...k}),n.draftTemplate=k.text,n.draftTemplateDocument=k.document)}async function M(){var k;try{const N=await be("daily.get",{id:V});if(s)return;n.notificationConfigured=N.notificationConfigured,n.sources=N.sources,A(),(k=h==null?void 0:h.querySelector("[data-notification-notice]"))==null||k.toggleAttribute("hidden",!!n.notificationConfigured),await _()}catch(N){T(String(N))}}async function _(){var N;const k=await Promise.allSettled(b.map(async G=>({sourceId:G,metrics:(await rA(V,G)).metrics})));if(!s){v.splice(0,v.length,...v.filter(G=>G.field)),x.length=0;for(const G of k)if(G.status==="fulfilled")for(const F of G.value.metrics){const ee=`${G.value.sourceId}:${F.id}`;x.push([ee,F.name,F.name,0]);const ie=F.granularity==="monthly"?[{key:"month",label:"本月"}]:zo;for(const ge of ie)v.push({key:`${ee}:${ge.key}`,metric:ee,scope:ge.key,label:F.granularity==="monthly"?F.name:ge.label+F.name,keywords:F.name+" "+ge.label+" "+(((N=n.sources.find(ce=>ce.id===G.value.sourceId))==null?void 0:N.name)||""),sourceId:G.value.sourceId,metricId:F.id});for(const ge of v.filter(ce=>ce.metric===ee&&ce.field))ge.sourceId=G.value.sourceId,ge.metricId=F.id}k.some(G=>G.status==="rejected")?T("部分指标目录读取失败，请到系统设置刷新数据库。"):b.length||T("请在右上角任务设置中配置本任务的指标范围。")}}const V=n.id,L={dirty(){m++,g=void 0},id:V,name:n.name,sendTime:n.sendTime,businessDate:`${p.getFullYear()}-${String(p.getMonth()+1).padStart(2,"0")}-${String(p.getDate()).padStart(2,"0")}`,definitions:v,metrics:x,value:k=>{var N,G,F;return k.metric==="date"?"业务日期":((N=g==null?void 0:g.fieldValues)==null?void 0:N[k.key])||((F=g==null?void 0:g.fieldValues)==null?void 0:F[((G=v.find(ee=>ee.field&&ee.metric===k.metric&&ee.scope===k.scope))==null?void 0:G.key)||""])||""},mount:(k,N)=>{oA(k,n.draftTemplateDocument,v,N)||sA(k,n.draftTemplate,v,N)},async materialize(k){var ge;if(k.field||k.metric==="date")return k;const N=v.find(ce=>ce.metric===k.metric&&ce.sourceId),G=k.sourceId||(N==null?void 0:N.sourceId),F=k.metricId||(N==null?void 0:N.metricId);if(!G||!F)throw new Error("此字段缺少可用的指标定义，请在任务设置中刷新指标。");const ee=JSON.stringify([G,F,k.scope,k.label]);let ie=E.get(ee);return ie||(ie=be("daily.addField",{id:V,sourceId:G,metricId:F,placeholder:"",displayName:k.label,...k.scope==="month"?{rangeKind:"current-month"}:{dateRangeSpec:(ge=zo.find(ce=>ce.key===k.scope))==null?void 0:ge.spec}}).then(({field:ce})=>{j.set(ce.placeholder,ce);const oe={...k,key:ce.placeholder,field:ce,sourceId:G,metricId:F};return v.some(U=>U.key===oe.key)||v.push(oe),a.changed(),oe}).catch(ce=>{throw E.delete(ee),ce}),E.set(ee,ie)),ie},save(k){const N=xv(k),G=f.catch(()=>{}).then(()=>s?void 0:R(N));return f=G,G},preview(k,N){const G=xv(k),F=++m,ee=f.catch(()=>{}).then(async()=>{if(s||F!==m)return{succeeded:!1,text:"",message:"内容已修改，请重新生成预览",errors:[]};await R(G);const ie=await be("daily.preview",{id:V,businessDate:N},12e4),ge={...ie,errors:ie.fieldErrors||[],message:ie.succeeded?"已生成 · "+N:ie.message};return F===m&&!s&&(g=ge),ge});return f=ee,ee},async send(k,N,G){if(!o){if(!n.notificationConfigured)throw new Error("请先在系统设置中配置通知渠道。");o=!0,A();try{await L.save(k);const F=await be(N==="test"?"daily.test":"daily.sendToday",N==="test"?{id:V,businessDate:G}:{id:V},12e4);if(!F.succeeded)throw new Error(F.message||"发送失败，请查看运行记录");T(F.alreadySent?"今日当前内容已发送":N==="test"?"测试发送成功":"今日消息已发送"),a.changed()}finally{o=!1,A()}}},configureAdvanced(k,N){const G=v.some(ie=>ie.metric===k&&ie.scope==="month"),F=G?[{key:"month",label:"本月计划"}]:[{key:"day",label:"日（业务日当天）"},{key:"mtd",label:"月累计（月初至业务日）"},{key:"ytd",label:"年累计（年初至业务日）"},{key:"fullyear",label:"全年"}];N.replaceChildren(...F.map(ie=>new Option(ie.label,ie.key)));const ee=N.ownerDocument.querySelector("#scope-year");ee&&(ee.disabled=G,ee.value="0")},resolveAdvanced(k,N){return k==="month"?"month":zo.find(G=>G.spec.granularity===k&&G.spec.yearOffset===Number(N)).key},async saveBasics(k,N){const G=Array.from((h==null?void 0:h.querySelectorAll("[data-context-source]:checked"))||[]).map(F=>F.value);await be("daily.saveBasics",{id:V,name:k,sendTime:N,metricSourceIds:G}),n.name=k,n.sendTime=N,b=G,L.name=k,await _(),a.changed()},connect(k){var se;h=k,k.title=n.name,k.querySelector("#runs p").textContent="";const N=k.querySelector("header > span");N.removeAttribute("aria-hidden"),N.setAttribute("role","button"),N.setAttribute("tabindex","0"),N.setAttribute("aria-label","返回任务列表");const G=async()=>{const $=k.querySelector("#editor");$.contentEditable="false",m++;try{await L.save($),a.back()}catch(ne){T(String(ne)),$.contentEditable="true"}};N.addEventListener("click",G),N.addEventListener("keydown",$=>{$.key==="Enter"&&G()});const F=k.querySelector("#settings"),ee=k.createElement("fieldset");ee.style.cssText="border:0;padding:0;max-height:180px;overflow:auto";const ie=k.createElement("legend");ie.textContent="本任务的指标范围",ee.append(ie);for(const $ of n.sources){const ne=k.createElement("label");ne.style.cssText="display:flex;gap:8px;margin:8px 0";const C=k.createElement("input");C.type="checkbox",C.value=$.id,C.dataset.contextSource="",C.checked=b.includes($.id),C.style.width="auto",ne.append(C,k.createTextNode($.name)),ee.append(ne)}(se=F.querySelector("p"))==null||se.replaceWith(ee);const ge=k.createElement("button");ge.textContent="数据库设置",ge.type="button",ge.onclick=()=>{var $;F.close(),($=a.openSettings)==null||$.call(a)},ee.after(ge);const ce=k.querySelector("footer");for(const[$,ne]of[["test","测试发送"],["today","发送今日消息"]]){const C=k.createElement("button");C.textContent=ne,C.dataset.send=$,C.onclick=async()=>{const O=k.querySelector("#editor");O.contentEditable="false";try{await L.send(O,$,k.querySelector("#date").value)}catch(J){T(String(J))}finally{O.contentEditable="true"}},ce.append(C)}const oe=k.createElement("style");oe.textContent=Px+`
`+Xx+`
body{font-family:var(--font-ui)}#date-picker{width:154px}`,k.head.append(oe);const U=k.createElement("span");U.className="production-message-demo",U.hidden=!0,k.body.append(U),c=Wd.createRoot(k.querySelector("#date-picker")),c.render(u.jsx(cA,{input:k.querySelector("#date")})),window.addEventListener("production-settings-updated",M);const ae=k.querySelector("#runs");if(ae.ontoggle=async()=>{if(!ae.open)return;const $=ae.querySelector("p");$.textContent="正在读取…";try{const ne=await be("daily.runs",{id:V});$.textContent=ne.runs.length?"":"暂无运行记录";for(const C of ne.runs){const O=k.createElement("div");O.textContent=`${C.time} · ${C.status} · ${C.businessDate}${C.error?" · "+C.error:""}`,$.append(O)}}catch(ne){$.textContent=String(ne)}},!n.notificationConfigured){const $=k.createElement("div");$.className="notice",$.dataset.notificationNotice="",$.append(k.createTextNode("通知渠道尚未配置。 "));const ne=k.createElement("button");ne.textContent="通知设置",ne.onclick=a.openSettings||null,$.append(ne),k.querySelector("#message").before($)}A(),_().catch($=>T(String($)))},dispose(){s=!0,m++,c==null||c.unmount(),window.removeEventListener("production-settings-updated",M)}};return L}function cA({input:n}){const[a,s]=S.useState(n.value);return u.jsx(yl,{value:a,onChange:o=>{var c;s(o),n.value=o,n.dispatchEvent(new(((c=n.ownerDocument.defaultView)==null?void 0:c.Event)||Event)("change",{bubbles:!0}))}})}const uA=`<!doctype html>
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
<dialog id="settings" aria-labelledby="settings-title"><form id="settings-form"><header><h2 id="settings-title">任务设置</h2><button type="button" class="icon quiet" data-close="settings" aria-label="关闭任务设置">✕</button></header><label>任务名称<input id="task-name" required maxlength="80"></label><div class="section"><h3>93 系统连接</h3><label>材料入库业务页面<input type="url" id="url" required placeholder="http://服务器/业务页面"></label><div class="two"><label>用户名<input id="username" required autocomplete="off"></label><label>密码<input id="password" type="password" placeholder="已保存；留空不修改" autocomplete="new-password"></label></div></div><div class="section"><div class="switch-row"><div><h3>定时入库</h3><small>每天 00:00 · 填报前一天</small></div><button type="button" id="toggle" class="toggle" role="switch" aria-checked="false" aria-label="定时入库"></button></div><p id="schedule-hint" class="muted" style="margin-top:12px">完成一次“生成预览”后可启用。</p></div><div class="section"><h3>固定写入目标</h3><p class="muted" style="margin-top:8px"><span id="settings-target-name">原材料入库数据库</span> · 业务、日期、板材、型材<br>Notion 连接与数据库目录在系统设置中维护。<br><button type="button" class="plain" id="system-settings">打开系统设置</button></p></div><p class="callout" id="settings-note">修改配置后，需重新预览并启用定时任务。</p><div class="actions"><button type="button" data-close="settings">取消</button><button class="primary" type="submit">保存设置</button></div></form></dialog>
<dialog id="confirm" aria-labelledby="confirm-title"><header><h2 id="confirm-title">执行本日期</h2><button class="icon quiet" data-close="confirm" aria-label="关闭确认">✕</button></header><p id="confirm-copy"></p><p class="callout">执行时会重新读取并查重，以当时的数据为准；已有记录则跳过。</p><div class="actions"><button data-close="confirm">取消</button><button class="primary" id="confirm-run">确认执行</button></div></dialog>

</html>
`,bv=()=>{const n=new Date;return n.setDate(n.getDate()-1),`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`};function Qx({id:n,...a}){const s=S.useRef(null),[o,c]=S.useState("");return S.useEffect(()=>{let h=!1,f;const m=s.current;return c(""),be("notionFill.get",{id:n}).then(g=>{h||(f=dA(g,a),m.onload=()=>{var p;!h&&((p=m.contentDocument)!=null&&p.getElementById("date-picker"))&&f.connect(m.contentDocument)},m.srcdoc=uA.replace("../../src/ProductionAssistant.App/Assets/Fonts/Inter.ttf",new URL($x,window.location.href).href).replace("../../src/ProductionAssistant.App/Assets/Fonts/NotoSansSC.ttf",new URL(Fx,window.location.href).href))}).catch(g=>{h||c(String(g.message||g))}),()=>{h=!0,m.onload=null,f==null||f.dispose()}},[n]),u.jsxs("div",{className:"message-template-host",children:[o&&u.jsx("p",{role:"alert",children:o}),u.jsx("iframe",{ref:s,title:"原材料自动入库"})]})}function dA(n,a){let s={...n},o,c,h=!1,f=!1,m=0,g=0,p=bv(),v,x=s.isEnabled;const b=$=>o.getElementById($),j=$=>b($),E=$=>b($),T=$=>b($),A=$=>$ instanceof Error?$.message:String($),R=$=>$.toLocaleString("zh-CN",{minimumFractionDigits:3,maximumFractionDigits:3});function M($,ne=!1){b("feedback").textContent=$,b("feedback").className=ne?"callout error":""}function _(){return!!(s.sourcePageUrl&&s.username&&s.passwordConfigured)}function V(){c==null||c.render(u.jsx(yl,{value:p,disabled:f,onChange:k}))}function L(){for(const $ of["preview","source-test","yesterday","settings-open","back","confirm-run"])E($).disabled=f;E("preview").disabled=f||!_()||!s.notionConfigured,E("source-test").disabled=f||!_(),E("run").disabled=f||!v,o.querySelectorAll("#settings button, #settings input").forEach($=>$.disabled=f),E("toggle").disabled=f||!s.schedulingAvailable,E("preview").textContent=f?"处理中…":"生成预览",b("name").textContent=s.name,b("enabled").textContent=s.isEnabled?s.schedulerInstalled?"已启用":"计划异常":"未启用",b("target-name").textContent=s.targetDataSourceName,b("settings-target-name").textContent=s.targetDataSourceName,j("password").placeholder=s.passwordConfigured?"已保存；留空不修改":"请输入 93 系统密码",V()}function P($="尚未生成预览"){m++,v=void 0,b("source-empty").hidden=!1,b("source-values").hidden=!0,b("source-error").hidden=!0,b("record").hidden=!0,b("target-status").hidden=!0,b("target-empty").hidden=!1,b("target-empty").querySelector("strong").textContent=$,b("target-empty").querySelector("span").textContent="预览只读取数据，不会新增记录",E("run").textContent="执行本日期",E("run").disabled=!0,T("confirm").open&&T("confirm").close()}function k($){f||(p=$,j("date").value=$,P("待重新预览"),M(""),V())}function N($){b("source-empty").hidden=!0,b("source-values").hidden=!1;for(const[ne,C]of[["plate",$.plateWeight],["section",$.sectionWeight],["total",$.totalWeight]])b(ne).textContent=R(C)}function G($){N($),b("target-empty").hidden=!0,b("record").hidden=!1,b("record-title").textContent=`${$.businessDate} 入库`,b("record-date").textContent=$.businessDate,b("record-plate").textContent=`${R($.plateWeight)} 吨`,b("record-section").textContent=`${R($.sectionWeight)} 吨`,b("target-status").hidden=!1,b("target-status").textContent=$.targetRecordExists?"该日期已有记录，无需新增。":"可新增 1 条入库记录。",E("run").textContent=$.targetRecordExists?"验证查重":"执行本日期"}function F($){b("run-count").textContent=$.length?`· ${$.length}`:"";const ne=$.map(C=>{const O=o.createElement("div");O.className="run";const J=o.createElement("span");J.textContent={"source-test":"93 测试",test:"只读预览",manual:"手动执行",automatic:"自动执行"}[C.source]||C.source;const te=o.createElement("div");te.textContent=C.error||C.message||(C.status==="created"?"已新增":C.status==="failed"?"执行失败":"已检查"),C.status==="failed"&&(te.style.color="#B91C1C");const le=o.createElement("p");le.textContent=C.status==="failed"?C.businessDate:`${C.businessDate} · 板材 ${R(C.plateWeight)} 吨 · 型材 ${R(C.sectionWeight)} 吨`,te.append(le);const de=o.createElement("small");return de.textContent=C.time,O.append(J,te,de),O});b("runs-body").replaceChildren(...ne),$.length||(b("runs-body").textContent="暂无运行记录")}async function ee(){const $=++g;try{const ne=await be("notionFill.runs",{id:s.id});!h&&$===g&&F(ne.runs)}catch(ne){!h&&$===g&&(b("runs-body").textContent=`运行记录读取失败：${A(ne)}；重新展开可重试。`)}}function ie(){Promise.resolve(a.changed()).catch(()=>{})}async function ge($){if(f||!p)return;f=!0,P("正在读取…");const ne=m;L(),M("");try{const C=await be($?"notionFill.testSource":"notionFill.test",{id:s.id,businessDate:p},12e4);if(h||ne!==m)return;if(!C.succeeded)throw new Error(C.message||"读取失败");$?(N(C),b("target-empty").querySelector("strong").textContent="尚未检查 Notion",b("target-empty").querySelector("span").textContent="点击“生成预览”完成读取与查重"):(s.validated=!0,v=C,G(C)),ie()}catch(C){if(h||ne!==m)return;P("本次预览未完成"),b("source-error").hidden=!1,b("source-error").textContent=A(C)}finally{h||(f=!1,L(),ee())}}async function ce(){if(f||!v||!T("confirm").open)return;const $=v.businessDate;T("confirm").close(),f=!0,L(),M("");try{const ne=await be("notionFill.runNow",{id:s.id,businessDate:$},12e4);if(h)return;if(!ne.succeeded)throw new Error(ne.message||"执行失败");v={...v,targetRecordExists:!0},b("target-status").textContent=ne.message,E("run").textContent="验证查重",M(ne.created?"Notion 写入成功。":"该日期已有记录，本次已跳过。"),ie()}catch(ne){h||(P("执行未完成，请重新预览"),M(A(ne),!0))}finally{h||(f=!1,L(),ee())}}function oe(){return j("task-name").value.trim()!==s.name||j("url").value.trim().replace(/\/+$/,"")!==s.sourcePageUrl||j("username").value.trim()!==s.username||!!j("password").value}function U(){E("toggle").setAttribute("aria-checked",String(x)),b("schedule-hint").textContent=s.schedulingAvailable?oe()?"配置已修改：保存后需重新预览，再启用。":s.isEnabled&&!s.schedulerInstalled?s.schedulerMessage:s.validated?"只读预览已通过，可以启用定时入库。":"完成一次“生成预览”后可启用。":"当前运行环境不支持定时启停，预览与手动执行仍可使用。"}async function ae($){if($.preventDefault(),f)return;const ne=j("task-name").value.trim(),C=j("username").value.trim();if(!ne||!C){b("settings-note").textContent="任务名称和用户名不能为空。";return}const O=oe(),J=O?!1:x;let te=!1;f=!0,L();try{if(O){const de=j("url").value.trim().replace(/\/+$/,""),ve=j("password").value;if(await be("notionFill.save",{id:s.id,name:ne,sourcePageUrl:de,username:C,password:ve}),h)return;te=!0,s={...s,name:ne,sourcePageUrl:de,username:C,passwordConfigured:s.passwordConfigured||!!ve,isEnabled:!1,validated:!1},j("password").value="",P("配置已修改，请重新预览")}if(J!==s.isEnabled){const de=await be("automation.setEnabled",{id:s.id,taskType:"notion_fill",enabled:J});if(h)return;if(s.isEnabled=de.enabled,de.enabled!==J)throw new Error(de.message||"定时任务状态未更新");te=!0}const le=await be("notionFill.get",{id:s.id});if(h)return;s=le,T("settings").close(),M(O?"配置已保存，请重新预览后启用。":"任务设置已保存。")}catch(le){h||(b("settings-note").textContent=`${te?"设置已更新，但后续操作失败：":""}${A(le)}`)}finally{h||(f=!1,x=s.isEnabled,L(),U(),te&&ie())}}async function se(){if(f||h)return;const $=m;try{const ne=await be("notionFill.get",{id:s.id});if(h||f||$!==m)return;s=ne,P("系统设置已更新，请重新预览"),L(),M(s.notionConfigured?"系统设置已更新，点击“生成预览”读取数据。":"Notion 连接尚未配置，仍可仅测试 93 读取。")}catch(ne){h||M(A(ne),!0)}}return{connect($){c==null||c.unmount(),o=$;const ne=o.createElement("style");ne.textContent=Px+`
`+Xx+`
body{color:#292524}#date-picker{width:163px;display:inline-block}`,o.head.append(ne);const C=o.createElement("span");C.className="production-message-demo",C.hidden=!0,o.body.append(C),c=Wd.createRoot(b("date-picker")),j("date").value=p,j("date").onchange=()=>k(j("date").value),E("yesterday").onclick=()=>k(bv()),E("preview").onclick=()=>{ge(!1)},E("source-test").onclick=()=>{ge(!0)},E("back").onclick=a.back,E("run").onclick=()=>{f||!v||(b("confirm-title").textContent=v.targetRecordExists?"验证查重":"执行本日期",b("confirm-copy").textContent=v.targetRecordExists?`${v.businessDate} 已有记录，本次执行应跳过。`:`将向“${s.targetDataSourceName}”新增 ${v.businessDate} 的记录：板材 ${R(v.plateWeight)} 吨，型材 ${R(v.sectionWeight)} 吨。`,T("confirm").showModal())},E("confirm-run").onclick=()=>{ce()},E("settings-open").onclick=()=>{j("task-name").value=s.name,j("url").value=s.sourcePageUrl,j("username").value=s.username,j("password").value="",j("password").required=!s.passwordConfigured,b("settings-note").textContent="修改配置后，需重新预览并启用定时任务。",x=s.isEnabled,U(),T("settings").showModal()},E("toggle").onclick=()=>{if(s.schedulingAvailable){if(!x&&(!s.validated||oe())){b("schedule-hint").textContent="请先保存配置并完成“生成预览”，再启用定时入库。";return}x=!x,U()}};for(const O of["task-name","url","username","password"])j(O).oninput=()=>{oe()&&(x=!1),U()};b("settings-form").onsubmit=O=>{ae(O)},T("settings").onclose=()=>{j("password").value=""},T("settings").oncancel=O=>{f&&O.preventDefault()},o.querySelectorAll("[data-close]").forEach(O=>O.onclick=()=>{f||T(O.dataset.close).close()}),E("system-settings").hidden=!a.openSettings,E("system-settings").onclick=()=>{var O;T("settings").close(),(O=a.openSettings)==null||O.call(a)},o.querySelector(".runs").ontoggle=O=>{O.currentTarget.open&&ee()},window.addEventListener("production-settings-updated",se),P(),L(),_()?s.notionConfigured||M("Notion 连接尚未配置，请从任务设置打开系统设置；仍可仅测试 93 读取。"):M("请先在任务设置中补全 93 系统连接配置。")},dispose(){h=!0,m++,g++,c==null||c.unmount(),window.removeEventListener("production-settings-updated",se)}}}var fA=Object.defineProperty,Pa=(n,a)=>fA(n,"name",{value:a,configurable:!0}),Jx=!!(typeof window<"u"&&window.document&&window.document.createElement);function Gr(n,a,{checkForDefaultPrevented:s=!0}={}){return Pa(function(c){if(n==null||n(c),s===!1||!c||!c.defaultPrevented)return a==null?void 0:a(c)},"handleEvent")}Pa(Gr,"composeEventHandlers");function hA(n){var a;if(!Jx)throw new Error("Cannot access window outside of the DOM");return((a=n==null?void 0:n.ownerDocument)==null?void 0:a.defaultView)??window}Pa(hA,"getOwnerWindow");function Ld(n){if(!Jx)throw new Error("Cannot access document outside of the DOM");return(n==null?void 0:n.ownerDocument)??document}Pa(Ld,"getOwnerDocument");function Wx(n,a=!1){const{activeElement:s}=Ld(n);if(!(s!=null&&s.nodeName))return null;if(Ix(s)&&s.contentDocument)return Wx(s.contentDocument.body,a);if(a){const o=s.getAttribute("aria-activedescendant");if(o){const c=Ld(s).getElementById(o);if(c)return c}}return s}Pa(Wx,"getActiveElement");function Ix(n){return n.tagName==="IFRAME"}Pa(Ix,"isFrame");var mA=Object.defineProperty,Of=(n,a)=>mA(n,"name",{value:a,configurable:!0});function Ud(n,a){if(typeof n=="function")return n(a);n!=null&&(n.current=a)}Of(Ud,"setRef");function eb(...n){return a=>{let s=!1;const o=n.map(c=>{const h=Ud(c,a);return!s&&typeof h=="function"&&(s=!0),h});if(s)return()=>{for(let c=0;c<o.length;c++){const h=o[c];typeof h=="function"?h():Ud(n[c],null)}}}}Of(eb,"composeRefs");function Xa(...n){return S.useCallback(eb(...n),n)}Of(Xa,"useComposedRefs");var pA=Object.defineProperty,Jt=(n,a)=>pA(n,"name",{value:a,configurable:!0});function gA(n,a){const s=S.createContext(a);s.displayName=n+"Context";const o=Jt(h=>{const{children:f,...m}=h,g=S.useMemo(()=>m,Object.values(m));return u.jsx(s.Provider,{value:g,children:f})},"Provider");o.displayName=n+"Provider";function c(h,f={}){const{optional:m=!1}=f,g=S.useContext(s);if(g)return g;if(a!==void 0)return a;if(!m)throw new Error(`\`${h}\` must be used within \`${n}\``)}return Jt(c,"useContext"),[o,c]}Jt(gA,"createContext");function tb(n,a=[]){let s=[];function o(h,f){const m=S.createContext(f);m.displayName=h+"Context";const g=s.length;s=[...s,f];const p=Jt(x=>{var R;const{scope:b,children:j,...E}=x,T=((R=b==null?void 0:b[n])==null?void 0:R[g])||m,A=S.useMemo(()=>E,Object.values(E));return u.jsx(T.Provider,{value:A,children:j})},"Provider");p.displayName=h+"Provider";function v(x,b,j={}){var R;const{optional:E=!1}=j,T=((R=b==null?void 0:b[n])==null?void 0:R[g])||m,A=S.useContext(T);if(A)return A;if(f!==void 0)return f;if(!E)throw new Error(`\`${x}\` must be used within \`${h}\``)}return Jt(v,"useContext"),[p,v]}Jt(o,"createContext");const c=Jt(()=>{const h=s.map(f=>S.createContext(f));return Jt(function(m){const g=(m==null?void 0:m[n])||h;return S.useMemo(()=>({[`__scope${n}`]:{...m,[n]:g}}),[m,g])},"useScope")},"createScope");return c.scopeName=n,[o,nb(c,...a)]}Jt(tb,"createContextScope");function nb(...n){const a=n[0];if(n.length===1)return a;const s=Jt(()=>{const o=n.map(c=>({useScope:c(),scopeName:c.scopeName}));return Jt(function(h){const f=o.reduce((m,{useScope:g,scopeName:p})=>{const x=g(h)[`__scope${p}`];return{...m,...x}},{});return S.useMemo(()=>({[`__scope${a.scopeName}`]:f}),[f])},"useComposedScopes")},"createScope");return s.scopeName=a.scopeName,s}Jt(nb,"composeContextScopes");var yr=globalThis!=null&&globalThis.document?S.useLayoutEffect:()=>{},yA=Object.defineProperty,vA=(n,a)=>yA(n,"name",{value:a,configurable:!0}),xA=as[" useId ".trim().toString()]||(()=>{}),bA=0;function Zo(n){const[a,s]=S.useState(xA());return yr(()=>{n||s(o=>o??String(bA++))},[n]),n||(a?`radix-${a}`:"")}vA(Zo,"useId");var SA=Object.defineProperty,wA=(n,a)=>SA(n,"name",{value:a,configurable:!0}),Sv=as[" useEffectEvent ".trim().toString()],wv=as[" useInsertionEffect ".trim().toString()];function rb(n){if(typeof Sv=="function")return Sv(n);const a=S.useRef(()=>{throw new Error("Cannot call an event handler while rendering.")});return typeof wv=="function"?wv(()=>{a.current=n}):yr(()=>{a.current=n}),S.useMemo(()=>((...s)=>{var o;return(o=a.current)==null?void 0:o.call(a,...s)}),[])}wA(rb,"useEffectEvent");var jA=Object.defineProperty,us=(n,a)=>jA(n,"name",{value:a,configurable:!0}),EA=as[" useInsertionEffect ".trim().toString()]||yr;function ab({prop:n,defaultProp:a,onChange:s=us(()=>{},"onChange"),caller:o}){const[c,h,f]=ib({defaultProp:a,onChange:s}),m=n!==void 0,g=m?n:c,p=S.useCallback(v=>{var x;if(m){const b=sb(v)?v(n):v;b!==n&&((x=f.current)==null||x.call(f,b))}else h(v)},[m,n,h,f]);return[g,p]}us(ab,"useControllableState");function ib({defaultProp:n,onChange:a}){const[s,o]=S.useState(n),c=S.useRef(s),h=S.useRef(a);return EA(()=>{h.current=a},[a]),S.useEffect(()=>{var f;c.current!==s&&((f=h.current)==null||f.call(h,s),c.current=s)},[s,c]),[s,o,h]}us(ib,"useUncontrolledState");function sb(n){return typeof n=="function"}us(sb,"isFunction");var jv=Symbol("RADIX:SYNC_STATE");function TA(n,a,s,o){const{prop:c,defaultProp:h,onChange:f,caller:m}=a,g=c!==void 0,p=rb(f),v=[{...s,state:h}];o&&v.push(o);const[x,b]=S.useReducer((A,R)=>{if(R.type===jv)return{...A,state:R.state};const M=n(A,R);return g&&!Object.is(M.state,A.state)&&p(M.state),M},...v),j=x.state,E=S.useRef(j);S.useEffect(()=>{E.current!==j&&(E.current=j,g||p(j))},[j,E,g]);const T=S.useMemo(()=>c!==void 0?{...x,state:c}:x,[x,c]);return S.useEffect(()=>{g&&!Object.is(c,x.state)&&b({type:jv,state:c})},[c,x.state,g]),[T,b]}us(TA,"useControllableStateReducer");var CA=Object.defineProperty,on=(n,a)=>CA(n,"name",{value:a,configurable:!0});function zf(n){const a=S.forwardRef((s,o)=>{let{children:c,...h}=s,f=null,m=!1;const g=[];Hd(c)&&typeof _o=="function"&&(c=_o(c._payload)),S.Children.forEach(c,b=>{var j;if(ub(b)){m=!0;const E=b;let T="child"in E.props?E.props.child:E.props.children;Hd(T)&&typeof _o=="function"&&(T=_o(T._payload)),f=DA(E,T),g.push((j=f==null?void 0:f.props)==null?void 0:j.children)}else g.push(b)}),f?f=S.cloneElement(f,void 0,g):!m&&S.Children.count(c)===1&&S.isValidElement(c)&&(f=c);const p=f?cb(f):void 0,v=Xa(o,p);if(!f){if(c||c===0)throw new Error(m?kA(n):MA(n));return c}const x=lb(h,f.props??{});return f.type!==S.Fragment&&(x.ref=o?v:p),S.cloneElement(f,x)});return a.displayName=`${n}.Slot`,a}on(zf,"createSlot");var ob=Symbol.for("radix.slottable");function AA(n){const a=on(s=>"child"in s?s.children(s.child):s.children,"Slottable");return a.displayName=`${n}.Slottable`,a.__radixId=ob,a}on(AA,"createSlottable");var DA=on((n,a)=>{if("child"in n.props){const s=n.props.child;return S.isValidElement(s)?S.cloneElement(s,void 0,n.props.children(s.props.children)):null}return S.isValidElement(a)?a:null},"getSlottableElementFromSlottable");function lb(n,a){const s={...a};for(const o in a){const c=n[o],h=a[o];/^on[A-Z]/.test(o)?c&&h?s[o]=(...m)=>{const g=h(...m);return c(...m),g}:c&&(s[o]=c):o==="style"?s[o]={...c,...h}:o==="className"&&(s[o]=[c,h].filter(Boolean).join(" "))}return{...n,...s}}on(lb,"mergeProps");function cb(n){var o,c;let a=(o=Object.getOwnPropertyDescriptor(n.props,"ref"))==null?void 0:o.get,s=a&&"isReactWarning"in a&&a.isReactWarning;return s?n.ref:(a=(c=Object.getOwnPropertyDescriptor(n,"ref"))==null?void 0:c.get,s=a&&"isReactWarning"in a&&a.isReactWarning,s?n.props.ref:n.props.ref||n.ref)}on(cb,"getElementRef");function ub(n){return S.isValidElement(n)&&typeof n.type=="function"&&"__radixId"in n.type&&n.type.__radixId===ob}on(ub,"isSlottable");var NA=Symbol.for("react.lazy");function Hd(n){return n!=null&&typeof n=="object"&&"$$typeof"in n&&n.$$typeof===NA&&"_payload"in n&&db(n._payload)}on(Hd,"isLazyComponent");function db(n){return typeof n=="object"&&n!==null&&"then"in n}on(db,"isPromiseLike");var MA=on(n=>`${n} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`,"createSlotError"),kA=on(n=>`${n} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`,"createSlottableError"),_o=as[" use ".trim().toString()],RA=Object.defineProperty,OA=(n,a)=>RA(n,"name",{value:a,configurable:!0}),zA=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],$a=zA.reduce((n,a)=>{const s=zf(`Primitive.${a}`),o=S.forwardRef((c,h)=>{const{asChild:f,...m}=c,g=f?s:a;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),u.jsx(g,{...m,ref:h})});return o.displayName=`Primitive.${a}`,{...n,[a]:o}},{});function fb(n,a){n&&Rf.flushSync(()=>n.dispatchEvent(a))}OA(fb,"dispatchDiscreteCustomEvent");var _A=Object.defineProperty,VA=(n,a)=>_A(n,"name",{value:a,configurable:!0});function Ha(n){const a=S.useRef(n);return S.useEffect(()=>{a.current=n}),S.useMemo(()=>((...s)=>{var o;return(o=a.current)==null?void 0:o.call(a,...s)}),[])}VA(Ha,"useCallbackRef");var BA=Object.defineProperty,lt=(n,a)=>BA(n,"name",{value:a,configurable:!0}),qd="dismissableLayer.update",LA="dismissableLayer.pointerDownOutside",UA="dismissableLayer.focusOutside",Ev,hb=S.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set,dismissableSurfaces:new Set}),HA=S.forwardRef(lt(function(a,s){const{disableOutsidePointerEvents:o=!1,deferPointerDownOutside:c=!1,onEscapeKeyDown:h,onPointerDownOutside:f,onFocusOutside:m,onInteractOutside:g,onDismiss:p,...v}=a,x=S.useContext(hb),[b,j]=S.useState(null),E=(b==null?void 0:b.ownerDocument)??(globalThis==null?void 0:globalThis.document),[,T]=S.useState({}),A=Xa(s,j),R=Array.from(x.layers),[M]=[...x.layersWithOutsidePointerEventsDisabled].slice(-1),_=M?R.indexOf(M):-1,V=b?R.indexOf(b):-1,L=x.layersWithOutsidePointerEventsDisabled.size>0,P=V>=_,k=S.useRef(!1),N=pb(ie=>{f==null||f(ie),g==null||g(ie),ie.defaultPrevented||p==null||p()},{ownerDocument:E,deferPointerDownOutside:c,isDeferredPointerDownOutsideRef:k,dismissableSurfaces:x.dismissableSurfaces,shouldHandlePointerDownOutside:S.useCallback(ie=>{if(!(ie instanceof Node))return!1;const ge=[...x.branches].some(ce=>ce.contains(ie));return P&&!ge},[x.branches,P])}),G=gb(ie=>{if(c&&k.current)return;const ge=ie.target;[...x.branches].some(oe=>oe.contains(ge))||(m==null||m(ie),g==null||g(ie),ie.defaultPrevented||p==null||p())},E),F=b?V===R.length-1:!1,ee=Ha(ie=>{ie.key==="Escape"&&(h==null||h(ie),!ie.defaultPrevented&&p&&(ie.preventDefault(),p()))});return S.useEffect(()=>{if(F)return E.addEventListener("keydown",ee,{capture:!0}),()=>E.removeEventListener("keydown",ee,{capture:!0})},[E,F,ee]),S.useEffect(()=>{if(b)return o&&(x.layersWithOutsidePointerEventsDisabled.size===0&&(Ev=E.body.style.pointerEvents,E.body.style.pointerEvents="none"),x.layersWithOutsidePointerEventsDisabled.add(b)),x.layers.add(b),Yd(),()=>{o&&(x.layersWithOutsidePointerEventsDisabled.delete(b),x.layersWithOutsidePointerEventsDisabled.size===0&&(E.body.style.pointerEvents=Ev))}},[b,E,o,x]),S.useEffect(()=>()=>{b&&(x.layers.delete(b),x.layersWithOutsidePointerEventsDisabled.delete(b),Yd())},[b,x]),S.useEffect(()=>{const ie=lt(()=>T({}),"handleUpdate");return document.addEventListener(qd,ie),()=>document.removeEventListener(qd,ie)},[]),u.jsx($a.div,{...v,ref:A,style:{pointerEvents:L?P?"auto":"none":void 0,...a.style},onFocusCapture:Gr(a.onFocusCapture,G.onFocusCapture),onBlurCapture:Gr(a.onBlurCapture,G.onBlurCapture),onPointerDownCapture:Gr(a.onPointerDownCapture,N.onPointerDownCapture)})},"DismissableLayer"));function mb(){const n=S.useContext(hb),[a,s]=S.useState(null);return S.useEffect(()=>{if(a)return n.dismissableSurfaces.add(a),()=>{n.dismissableSurfaces.delete(a)}},[a,n.dismissableSurfaces]),s}lt(mb,"useDismissableLayerSurface");var qA=lt(()=>!0,"IS_TRUE");function pb(n,a){const{ownerDocument:s=globalThis==null?void 0:globalThis.document,deferPointerDownOutside:o=!1,isDeferredPointerDownOutsideRef:c,dismissableSurfaces:h,shouldHandlePointerDownOutside:f=qA}=a,m=Ha(n),g=S.useRef(!1),p=S.useRef(!1),v=S.useRef(new Map),x=S.useRef(()=>{});return S.useEffect(()=>{function b(){p.current=!1,c.current=!1,v.current.clear()}lt(b,"resetOutsideInteraction");function j(){return Array.from(v.current.values()).some(Boolean)}lt(j,"isOutsideInteractionIntercepted");function E(_){if(!p.current)return;const V=_.target;V instanceof Node&&[...h].some(P=>P.contains(V))||v.current.set(_.type,!0),_.type==="click"&&window.setTimeout(()=>{p.current&&x.current()},0)}lt(E,"handleInteractionCapture");function T(_){p.current&&v.current.set(_.type,!1)}lt(T,"handleInteractionBubble");const A=lt(_=>{if(_.target&&!g.current){let V=function(){s.removeEventListener("click",x.current);const P=j();b(),P||_f(LA,m,L,{discrete:!0})};if(lt(V,"handleAndDispatchPointerDownOutsideEvent"),!f(_.target)){s.removeEventListener("click",x.current),b(),g.current=!1;return}const L={originalEvent:_};p.current=!0,c.current=o&&_.button===0,v.current.clear(),!o||_.button!==0?V():(s.removeEventListener("click",x.current),x.current=V,s.addEventListener("click",x.current,{once:!0}))}else s.removeEventListener("click",x.current),b();g.current=!1},"handlePointerDown"),R=["pointerup","mousedown","mouseup","touchstart","touchend","click"];for(const _ of R)s.addEventListener(_,E,!0),s.addEventListener(_,T);const M=window.setTimeout(()=>{s.addEventListener("pointerdown",A)},0);return()=>{window.clearTimeout(M),s.removeEventListener("pointerdown",A),s.removeEventListener("click",x.current);for(const _ of R)s.removeEventListener(_,E,!0),s.removeEventListener(_,T)}},[s,m,o,c,h,f]),{onPointerDownCapture:lt(()=>g.current=!0,"onPointerDownCapture")}}lt(pb,"usePointerDownOutside");function gb(n,a=globalThis==null?void 0:globalThis.document){const s=Ha(n),o=S.useRef(!1);return S.useEffect(()=>{const c=lt(h=>{h.target&&!o.current&&_f(UA,s,{originalEvent:h},{discrete:!1})},"handleFocus");return a.addEventListener("focusin",c),()=>a.removeEventListener("focusin",c)},[a,s]),{onFocusCapture:lt(()=>o.current=!0,"onFocusCapture"),onBlurCapture:lt(()=>o.current=!1,"onBlurCapture")}}lt(gb,"useFocusOutside");function Yd(){const n=new CustomEvent(qd);document.dispatchEvent(n)}lt(Yd,"dispatchUpdate");function _f(n,a,s,{discrete:o}){const c=s.originalEvent.target,h=new CustomEvent(n,{bubbles:!1,cancelable:!0,detail:s});a&&c.addEventListener(n,a,{once:!0}),o?fb(c,h):c.dispatchEvent(h)}lt(_f,"handleAndDispatchCustomEvent");var YA=Object.defineProperty,St=(n,a)=>YA(n,"name",{value:a,configurable:!0}),rd="focusScope.autoFocusOnMount",ad="focusScope.autoFocusOnUnmount",Tv={bubbles:!1,cancelable:!0},GA=S.forwardRef(St(function(a,s){const{loop:o=!1,trapped:c=!1,onMountAutoFocus:h,onUnmountAutoFocus:f,...m}=a,[g,p]=S.useState(null),v=Ha(h),x=Ha(f),b=S.useRef(null),j=Xa(s,p),E=S.useRef({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;S.useEffect(()=>{if(c){let A=function(V){if(E.paused||!g)return;const L=V.target;g.contains(L)?b.current=L:Ln(b.current,{select:!0})},R=function(V){if(E.paused||!g)return;const L=V.relatedTarget;L!==null&&(g.contains(L)||Ln(b.current,{select:!0}))},M=function(V){if(document.activeElement===document.body)for(const P of V)P.removedNodes.length>0&&Ln(g)};St(A,"handleFocusIn"),St(R,"handleFocusOut"),St(M,"handleMutations"),document.addEventListener("focusin",A),document.addEventListener("focusout",R);const _=new MutationObserver(M);return g&&_.observe(g,{childList:!0,subtree:!0}),()=>{document.removeEventListener("focusin",A),document.removeEventListener("focusout",R),_.disconnect()}}},[c,g,E.paused]),S.useEffect(()=>{if(g){Cv.add(E);const A=document.activeElement;if(!g.contains(A)){const M=new CustomEvent(rd,Tv);g.addEventListener(rd,v),g.dispatchEvent(M),M.defaultPrevented||(yb(wb(Vf(g)),{select:!0}),document.activeElement===A&&Ln(g))}return()=>{g.removeEventListener(rd,v),setTimeout(()=>{const M=new CustomEvent(ad,Tv);g.addEventListener(ad,x),g.dispatchEvent(M),M.defaultPrevented||Ln(A??document.body,{select:!0}),g.removeEventListener(ad,x),Cv.remove(E)},0)}}},[g,v,x,E]);const T=S.useCallback(A=>{if(!o&&!c||E.paused)return;const R=A.key==="Tab"&&!A.altKey&&!A.ctrlKey&&!A.metaKey,M=document.activeElement;if(R&&M){const _=A.currentTarget,[V,L]=vb(_);V&&L?!A.shiftKey&&M===L?(A.preventDefault(),o&&Ln(V,{select:!0})):A.shiftKey&&M===V&&(A.preventDefault(),o&&Ln(L,{select:!0})):M===_&&A.preventDefault()}},[o,c,E.paused]);return u.jsx($a.div,{tabIndex:-1,...m,ref:j,onKeyDown:T})},"FocusScope"));function yb(n,{select:a=!1}={}){const s=document.activeElement;for(const o of n)if(Ln(o,{select:a}),document.activeElement!==s)return}St(yb,"focusFirst");function vb(n){const a=Vf(n),s=Gd(a,n),o=Gd(a.reverse(),n);return[s,o]}St(vb,"getTabbableEdges");function Vf(n){const a=[],s=document.createTreeWalker(n,NodeFilter.SHOW_ELEMENT,{acceptNode:St(o=>{const c=o.tagName==="INPUT"&&o.type==="hidden";return o.disabled||o.hidden||c?NodeFilter.FILTER_SKIP:o.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP},"acceptNode")});for(;s.nextNode();)a.push(s.currentNode);return a}St(Vf,"getTabbableCandidates");function Gd(n,a){const s=typeof a.checkVisibility=="function"&&a.checkVisibility({checkVisibilityCSS:!0});for(const o of n)if(!(s?!o.checkVisibility({checkVisibilityCSS:!0}):xb(o,{upTo:a})))return o}St(Gd,"findVisible");function xb(n,{upTo:a}){if(getComputedStyle(n).visibility==="hidden")return!0;for(;n;){if(a!==void 0&&n===a)return!1;if(getComputedStyle(n).display==="none")return!0;n=n.parentElement}return!1}St(xb,"isHidden");function bb(n){return n instanceof HTMLInputElement&&"select"in n}St(bb,"isSelectableInput");function Ln(n,{select:a=!1}={}){if(n&&n.focus){const s=document.activeElement;n.focus({preventScroll:!0}),n!==s&&bb(n)&&a&&n.select()}}St(Ln,"focus");var Cv=Sb();function Sb(){let n=[];return{add(a){const s=n[0];a!==s&&(s==null||s.pause()),n=Pd(n,a),n.unshift(a)},remove(a){var s;n=Pd(n,a),(s=n[0])==null||s.resume()}}}St(Sb,"createFocusScopesStack");function Pd(n,a){const s=[...n],o=s.indexOf(a);return o!==-1&&s.splice(o,1),s}St(Pd,"arrayRemove");function wb(n){return n.filter(a=>a.tagName!=="A")}St(wb,"removeLinks");var PA=Object.defineProperty,XA=(n,a)=>PA(n,"name",{value:a,configurable:!0}),$A=S.forwardRef(XA(function(a,s){var g;const{container:o,...c}=a,[h,f]=S.useState(!1);yr(()=>f(!0),[]);const m=o||h&&((g=globalThis==null?void 0:globalThis.document)==null?void 0:g.body);return m?Rf.createPortal(u.jsx($a.div,{...c,ref:s}),m):null},"Portal")),FA=Object.defineProperty,Un=(n,a)=>FA(n,"name",{value:a,configurable:!0});function jb(n,a){return S.useReducer((s,o)=>a[s][o]??s,n)}Un(jb,"useStateMachine");var Bf=Un(n=>{const{present:a,children:s}=n,o=Eb(a),c=typeof s=="function"?s({present:o.isPresent}):S.Children.only(s),h=Tb(o.ref,Cb(c));return typeof s=="function"||o.isPresent?S.cloneElement(c,{ref:h}):null},"Presence");function Eb(n){const[a,s]=S.useState(),o=S.useRef(null),c=S.useRef(n),h=S.useRef("none"),f=S.useRef(void 0),m=n?"mounted":"unmounted",[g,p]=jb(m,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return S.useEffect(()=>{g==="mounted"?(h.current=f.current??Oa(o.current),f.current=void 0):h.current="none"},[g]),yr(()=>{const v=o.current,x=c.current;if(x!==n){const j=h.current,E=Oa(v);n?(f.current=E,p("MOUNT")):E==="none"||(v==null?void 0:v.display)==="none"?p("UNMOUNT"):p(x&&j!==E?"ANIMATION_OUT":"UNMOUNT"),c.current=n}},[n,p]),yr(()=>{if(a){let v;const x=a.ownerDocument.defaultView??window,b=Un(E=>{const A=Oa(o.current).includes(CSS.escape(E.animationName));if(E.target===a&&A&&(p("ANIMATION_END"),!c.current)){const R=a.style.animationFillMode;a.style.animationFillMode="forwards",v=x.setTimeout(()=>{a.style.animationFillMode==="forwards"&&(a.style.animationFillMode=R)})}},"handleAnimationEnd"),j=Un(E=>{E.target===a&&(h.current=Oa(o.current))},"handleAnimationStart");return a.addEventListener("animationstart",j),a.addEventListener("animationcancel",b),a.addEventListener("animationend",b),()=>{x.clearTimeout(v),a.removeEventListener("animationstart",j),a.removeEventListener("animationcancel",b),a.removeEventListener("animationend",b)}}else p("ANIMATION_END")},[a,p]),{isPresent:["mounted","unmountSuspended"].includes(g),ref:S.useCallback(v=>{if(v){const x=getComputedStyle(v);o.current=x,f.current=Oa(x)}else o.current=null;s(v)},[])}}Un(Eb,"usePresence");function Xd(n,a){if(typeof n=="function")return n(a);n!=null&&(n.current=a)}Un(Xd,"setRef");function Tb(...n){const a=S.useRef(n);return a.current=n,S.useCallback(s=>{const o=a.current;let c=!1;const h=o.map(f=>{const m=Xd(f,s);return!c&&typeof m=="function"&&(c=!0),m});if(c)return()=>{for(let f=0;f<h.length;f++){const m=h[f];typeof m=="function"?m():Xd(o[f],null)}}},[])}Un(Tb,"useStableComposedRefs");function Oa(n){return(n==null?void 0:n.animationName)||"none"}Un(Oa,"getAnimationName");function Cb(n){var o,c;let a=(o=Object.getOwnPropertyDescriptor(n.props,"ref"))==null?void 0:o.get,s=a&&"isReactWarning"in a&&a.isReactWarning;return s?n.ref:(a=(c=Object.getOwnPropertyDescriptor(n,"ref"))==null?void 0:c.get,s=a&&"isReactWarning"in a&&a.isReactWarning,s?n.props.ref:n.props.ref||n.ref)}Un(Cb,"getElementRef");var KA=Object.defineProperty,Lf=(n,a)=>KA(n,"name",{value:a,configurable:!0}),Vo=0,hn=null;function ZA(n){return Uf(),n.children}Lf(ZA,"FocusGuards");function Uf(){S.useEffect(()=>{hn||(hn={start:$d(),end:$d()});const{start:n,end:a}=hn;return document.body.firstElementChild!==n&&document.body.insertAdjacentElement("afterbegin",n),document.body.lastElementChild!==a&&document.body.insertAdjacentElement("beforeend",a),Vo++,()=>{Vo===1&&(hn==null||hn.start.remove(),hn==null||hn.end.remove(),hn=null),Vo=Math.max(0,Vo-1)}},[])}Lf(Uf,"useFocusGuards");function $d(){const n=document.createElement("span");return n.setAttribute("data-radix-focus-guard",""),n.tabIndex=0,n.style.outline="none",n.style.opacity="0",n.style.position="fixed",n.style.pointerEvents="none",n}Lf($d,"createFocusGuard");var gn=function(){return gn=Object.assign||function(a){for(var s,o=1,c=arguments.length;o<c;o++){s=arguments[o];for(var h in s)Object.prototype.hasOwnProperty.call(s,h)&&(a[h]=s[h])}return a},gn.apply(this,arguments)};function Ab(n,a){var s={};for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&a.indexOf(o)<0&&(s[o]=n[o]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var c=0,o=Object.getOwnPropertySymbols(n);c<o.length;c++)a.indexOf(o[c])<0&&Object.prototype.propertyIsEnumerable.call(n,o[c])&&(s[o[c]]=n[o[c]]);return s}function QA(n,a,s){if(s||arguments.length===2)for(var o=0,c=a.length,h;o<c;o++)(h||!(o in a))&&(h||(h=Array.prototype.slice.call(a,0,o)),h[o]=a[o]);return n.concat(h||Array.prototype.slice.call(a))}var Qo="right-scroll-bar-position",Jo="width-before-scroll-bar",JA="with-scroll-bars-hidden",WA="--removed-body-scroll-bar-size";function id(n,a){return typeof n=="function"?n(a):n&&(n.current=a),n}function IA(n,a){var s=S.useState(function(){return{value:n,callback:a,facade:{get current(){return s.value},set current(o){var c=s.value;c!==o&&(s.value=o,s.callback(o,c))}}}})[0];return s.callback=a,s.facade}var eD=typeof window<"u"?S.useLayoutEffect:S.useEffect,Av=new WeakMap;function tD(n,a){var s=IA(null,function(o){return n.forEach(function(c){return id(c,o)})});return eD(function(){var o=Av.get(s);if(o){var c=new Set(o),h=new Set(n),f=s.current;c.forEach(function(m){h.has(m)||id(m,null)}),h.forEach(function(m){c.has(m)||id(m,f)})}Av.set(s,n)},[n]),s}function nD(n){return n}function rD(n,a){a===void 0&&(a=nD);var s=[],o=!1,c={read:function(){if(o)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return s.length?s[s.length-1]:n},useMedium:function(h){var f=a(h,o);return s.push(f),function(){s=s.filter(function(m){return m!==f})}},assignSyncMedium:function(h){for(o=!0;s.length;){var f=s;s=[],f.forEach(h)}s={push:function(m){return h(m)},filter:function(){return s}}},assignMedium:function(h){o=!0;var f=[];if(s.length){var m=s;s=[],m.forEach(h),f=s}var g=function(){var v=f;f=[],v.forEach(h)},p=function(){return Promise.resolve().then(g)};p(),s={push:function(v){f.push(v),p()},filter:function(v){return f=f.filter(v),s}}}};return c}function aD(n){n===void 0&&(n={});var a=rD(null);return a.options=gn({async:!0,ssr:!1},n),a}var Db=function(n){var a=n.sideCar,s=Ab(n,["sideCar"]);if(!a)throw new Error("Sidecar: please provide `sideCar` property to import the right car");var o=a.read();if(!o)throw new Error("Sidecar medium not found");return S.createElement(o,gn({},s))};Db.isSideCarExport=!0;function iD(n,a){return n.useMedium(a),Db}var Nb=aD(),sd=function(){},vl=S.forwardRef(function(n,a){var s=S.useRef(null),o=S.useState({onScrollCapture:sd,onWheelCapture:sd,onTouchMoveCapture:sd}),c=o[0],h=o[1],f=n.forwardProps,m=n.children,g=n.className,p=n.removeScrollBar,v=n.enabled,x=n.shards,b=n.sideCar,j=n.noRelative,E=n.noIsolation,T=n.inert,A=n.allowPinchZoom,R=n.as,M=R===void 0?"div":R,_=n.gapMode,V=Ab(n,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noRelative","noIsolation","inert","allowPinchZoom","as","gapMode"]),L=b,P=tD([s,a]),k=gn(gn({},V),c);return S.createElement(S.Fragment,null,v&&S.createElement(L,{sideCar:Nb,removeScrollBar:p,shards:x,noRelative:j,noIsolation:E,inert:T,setCallbacks:h,allowPinchZoom:!!A,lockRef:s,gapMode:_}),f?S.cloneElement(S.Children.only(m),gn(gn({},k),{ref:P})):S.createElement(M,gn({},k,{className:g,ref:P}),m))});vl.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};vl.classNames={fullWidth:Jo,zeroRight:Qo};var sD=function(){if(typeof __webpack_nonce__<"u")return __webpack_nonce__};function oD(){if(!document)return null;var n=document.createElement("style");n.type="text/css";var a=sD();return a&&n.setAttribute("nonce",a),n}function lD(n,a){n.styleSheet?n.styleSheet.cssText=a:n.appendChild(document.createTextNode(a))}function cD(n){var a=document.head||document.getElementsByTagName("head")[0];a.appendChild(n)}var uD=function(){var n=0,a=null;return{add:function(s){n==0&&(a=oD())&&(lD(a,s),cD(a)),n++},remove:function(){n--,!n&&a&&(a.parentNode&&a.parentNode.removeChild(a),a=null)}}},dD=function(){var n=uD();return function(a,s){S.useEffect(function(){return n.add(a),function(){n.remove()}},[a&&s])}},Mb=function(){var n=dD(),a=function(s){var o=s.styles,c=s.dynamic;return n(o,c),null};return a},fD={left:0,top:0,right:0,gap:0},od=function(n){return parseInt(n||"",10)||0},hD=function(n){var a=window.getComputedStyle(document.body),s=a[n==="padding"?"paddingLeft":"marginLeft"],o=a[n==="padding"?"paddingTop":"marginTop"],c=a[n==="padding"?"paddingRight":"marginRight"];return[od(s),od(o),od(c)]},mD=function(n){if(n===void 0&&(n="margin"),typeof window>"u")return fD;var a=hD(n),s=document.documentElement.clientWidth,o=window.innerWidth;return{left:a[0],top:a[1],right:a[2],gap:Math.max(0,o-s+a[2]-a[0])}},pD=Mb(),Ba="data-scroll-locked",gD=function(n,a,s,o){var c=n.left,h=n.top,f=n.right,m=n.gap;return s===void 0&&(s="margin"),`
  .`.concat(JA,` {
   overflow: hidden `).concat(o,`;
   padding-right: `).concat(m,"px ").concat(o,`;
  }
  body[`).concat(Ba,`] {
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
  
  .`).concat(Qo,` {
    right: `).concat(m,"px ").concat(o,`;
  }
  
  .`).concat(Jo,` {
    margin-right: `).concat(m,"px ").concat(o,`;
  }
  
  .`).concat(Qo," .").concat(Qo,` {
    right: 0 `).concat(o,`;
  }
  
  .`).concat(Jo," .").concat(Jo,` {
    margin-right: 0 `).concat(o,`;
  }
  
  body[`).concat(Ba,`] {
    `).concat(WA,": ").concat(m,`px;
  }
`)},Dv=function(){var n=parseInt(document.body.getAttribute(Ba)||"0",10);return isFinite(n)?n:0},yD=function(){S.useEffect(function(){return document.body.setAttribute(Ba,(Dv()+1).toString()),function(){var n=Dv()-1;n<=0?document.body.removeAttribute(Ba):document.body.setAttribute(Ba,n.toString())}},[])},vD=function(n){var a=n.noRelative,s=n.noImportant,o=n.gapMode,c=o===void 0?"margin":o;yD();var h=S.useMemo(function(){return mD(c)},[c]);return S.createElement(pD,{styles:gD(h,!a,c,s?"":"!important")})},Fd=!1;if(typeof window<"u")try{var Bo=Object.defineProperty({},"passive",{get:function(){return Fd=!0,!0}});window.addEventListener("test",Bo,Bo),window.removeEventListener("test",Bo,Bo)}catch{Fd=!1}var Na=Fd?{passive:!1}:!1,xD=function(n){return n.tagName==="TEXTAREA"},kb=function(n,a){if(!(n instanceof Element))return!1;var s=window.getComputedStyle(n);return s[a]!=="hidden"&&!(s.overflowY===s.overflowX&&!xD(n)&&s[a]==="visible")},bD=function(n){return kb(n,"overflowY")},SD=function(n){return kb(n,"overflowX")},Nv=function(n,a){var s=a.ownerDocument,o=a;do{typeof ShadowRoot<"u"&&o instanceof ShadowRoot&&(o=o.host);var c=Rb(n,o);if(c){var h=Ob(n,o),f=h[1],m=h[2];if(f>m)return!0}o=o.parentNode}while(o&&o!==s.body);return!1},wD=function(n){var a=n.scrollTop,s=n.scrollHeight,o=n.clientHeight;return[a,s,o]},jD=function(n){var a=n.scrollLeft,s=n.scrollWidth,o=n.clientWidth;return[a,s,o]},Rb=function(n,a){return n==="v"?bD(a):SD(a)},Ob=function(n,a){return n==="v"?wD(a):jD(a)},ED=function(n,a){return n==="h"&&a==="rtl"?-1:1},TD=function(n,a,s,o,c){var h=ED(n,window.getComputedStyle(a).direction),f=h*o,m=s.target,g=a.contains(m),p=!1,v=f>0,x=0,b=0;do{if(!m)break;var j=Ob(n,m),E=j[0],T=j[1],A=j[2],R=T-A-h*E;(E||R)&&Rb(n,m)&&(x+=R,b+=E);var M=m.parentNode;m=M&&M.nodeType===Node.DOCUMENT_FRAGMENT_NODE?M.host:M}while(!g&&m!==document.body||g&&(a.contains(m)||a===m));return(v&&Math.abs(x)<1||!v&&Math.abs(b)<1)&&(p=!0),p},Lo=function(n){return"changedTouches"in n?[n.changedTouches[0].clientX,n.changedTouches[0].clientY]:[0,0]},Mv=function(n){return[n.deltaX,n.deltaY]},kv=function(n){return n&&"current"in n?n.current:n},CD=function(n,a){return n[0]===a[0]&&n[1]===a[1]},AD=function(n){return`
  .block-interactivity-`.concat(n,` {pointer-events: none;}
  .allow-interactivity-`).concat(n,` {pointer-events: all;}
`)},DD=0,Ma=[];function ND(n){var a=S.useRef([]),s=S.useRef([0,0]),o=S.useRef(),c=S.useState(DD++)[0],h=S.useState(Mb)[0],f=S.useRef(n);S.useEffect(function(){f.current=n},[n]),S.useEffect(function(){if(n.inert){document.body.classList.add("block-interactivity-".concat(c));var T=QA([n.lockRef.current],(n.shards||[]).map(kv),!0).filter(Boolean);return T.forEach(function(A){return A.classList.add("allow-interactivity-".concat(c))}),function(){document.body.classList.remove("block-interactivity-".concat(c)),T.forEach(function(A){return A.classList.remove("allow-interactivity-".concat(c))})}}},[n.inert,n.lockRef.current,n.shards]);var m=S.useCallback(function(T,A){if("touches"in T&&T.touches.length===2||T.type==="wheel"&&T.ctrlKey)return!f.current.allowPinchZoom;var R=Lo(T),M=s.current,_="deltaX"in T?T.deltaX:M[0]-R[0],V="deltaY"in T?T.deltaY:M[1]-R[1],L,P=T.target,k=Math.abs(_)>Math.abs(V)?"h":"v";if("touches"in T&&k==="h"&&P.type==="range")return!1;var N=window.getSelection(),G=N&&N.anchorNode,F=G?G===P||G.contains(P):!1;if(F)return!1;var ee=Nv(k,P);if(!ee)return!0;if(ee?L=k:(L=k==="v"?"h":"v",ee=Nv(k,P)),!ee)return!1;if(!o.current&&"changedTouches"in T&&(_||V)&&(o.current=L),!L)return!0;var ie=o.current||L;return TD(ie,A,T,ie==="h"?_:V)},[]),g=S.useCallback(function(T){var A=T;if(!(!Ma.length||Ma[Ma.length-1]!==h)){var R="deltaY"in A?Mv(A):Lo(A),M=a.current.filter(function(L){return L.name===A.type&&(L.target===A.target||A.target===L.shadowParent)&&CD(L.delta,R)})[0];if(M&&M.should){A.cancelable&&A.preventDefault();return}if(!M){var _=(f.current.shards||[]).map(kv).filter(Boolean).filter(function(L){return L.contains(A.target)}),V=_.length>0?m(A,_[0]):!f.current.noIsolation;V&&A.cancelable&&A.preventDefault()}}},[]),p=S.useCallback(function(T,A,R,M){var _={name:T,delta:A,target:R,should:M,shadowParent:MD(R)};a.current.push(_),setTimeout(function(){a.current=a.current.filter(function(V){return V!==_})},1)},[]),v=S.useCallback(function(T){s.current=Lo(T),o.current=void 0},[]),x=S.useCallback(function(T){p(T.type,Mv(T),T.target,m(T,n.lockRef.current))},[]),b=S.useCallback(function(T){p(T.type,Lo(T),T.target,m(T,n.lockRef.current))},[]);S.useEffect(function(){return Ma.push(h),n.setCallbacks({onScrollCapture:x,onWheelCapture:x,onTouchMoveCapture:b}),document.addEventListener("wheel",g,Na),document.addEventListener("touchmove",g,Na),document.addEventListener("touchstart",v,Na),function(){Ma=Ma.filter(function(T){return T!==h}),document.removeEventListener("wheel",g,Na),document.removeEventListener("touchmove",g,Na),document.removeEventListener("touchstart",v,Na)}},[]);var j=n.removeScrollBar,E=n.inert;return S.createElement(S.Fragment,null,E?S.createElement(h,{styles:AD(c)}):null,j?S.createElement(vD,{noRelative:n.noRelative,gapMode:n.gapMode}):null)}function MD(n){for(var a=null;n!==null;)n instanceof ShadowRoot&&(a=n.host,n=n.host),n=n.parentNode;return a}const kD=iD(Nb,ND);var zb=S.forwardRef(function(n,a){return S.createElement(vl,gn({},n,{ref:a,sideCar:kD}))});zb.classNames=vl.classNames;var RD=function(n){if(typeof document>"u")return null;var a=Array.isArray(n)?n[0]:n;return a.ownerDocument.body},ka=new WeakMap,Uo=new WeakMap,Ho={},ld=0,_b=function(n){return n&&(n.host||_b(n.parentNode))},OD=function(n,a){return a.map(function(s){if(n.contains(s))return s;var o=_b(s);return o&&n.contains(o)?o:(console.error("aria-hidden",s,"in not contained inside",n,". Doing nothing"),null)}).filter(function(s){return!!s})},zD=function(n,a,s,o){var c=OD(a,Array.isArray(n)?n:[n]);Ho[s]||(Ho[s]=new WeakMap);var h=Ho[s],f=[],m=new Set,g=new Set(c),p=function(x){!x||m.has(x)||(m.add(x),p(x.parentNode))};c.forEach(p);var v=function(x){!x||g.has(x)||Array.prototype.forEach.call(x.children,function(b){if(m.has(b))v(b);else try{var j=b.getAttribute(o),E=j!==null&&j!=="false",T=(ka.get(b)||0)+1,A=(h.get(b)||0)+1;ka.set(b,T),h.set(b,A),f.push(b),T===1&&E&&Uo.set(b,!0),A===1&&b.setAttribute(s,"true"),E||b.setAttribute(o,"true")}catch(R){console.error("aria-hidden: cannot operate on ",b,R)}})};return v(a),m.clear(),ld++,function(){f.forEach(function(x){var b=ka.get(x)-1,j=h.get(x)-1;ka.set(x,b),h.set(x,j),b||(Uo.has(x)||x.removeAttribute(o),Uo.delete(x)),j||x.removeAttribute(s)}),ld--,ld||(ka=new WeakMap,ka=new WeakMap,Uo=new WeakMap,Ho={})}},_D=function(n,a,s){s===void 0&&(s="data-aria-hidden");var o=Array.from(Array.isArray(n)?n:[n]),c=RD(n);return c?(o.push.apply(o,Array.from(c.querySelectorAll("[aria-live], script"))),zD(o,c,s,"aria-hidden")):function(){return null}},VD=Object.defineProperty,ln=(n,a)=>VD(n,"name",{value:a,configurable:!0}),Hf="Dialog",[Vb,kN]=tb(Hf),[BD,Hn]=Vb(Hf),Rv=ln(n=>{const{__scopeDialog:a,children:s,open:o,defaultOpen:c,onOpenChange:h,modal:f=!0}=n,m=S.useRef(null),g=S.useRef(null),[p,v]=ab({prop:o,defaultProp:c??!1,onChange:h,caller:Hf}),[x,b]=S.useState(0),[j,E]=S.useState(0);return u.jsx(BD,{scope:a,triggerRef:m,contentRef:g,contentId:Zo(),titleId:Zo(),descriptionId:Zo(),titlePresent:x>0,descriptionPresent:j>0,setTitleCount:b,setDescriptionCount:E,open:p,onOpenChange:v,onOpenToggle:S.useCallback(()=>v(T=>!T),[v]),modal:f,children:s})},"Dialog"),Bb="DialogPortal",[LD,Lb]=Vb(Bb,{forceMount:void 0}),Ov=ln(n=>{const{__scopeDialog:a,forceMount:s,children:o,container:c}=n,h=Hn(Bb,a);return u.jsx(LD,{scope:a,forceMount:s,children:S.Children.map(o,f=>u.jsx(Bf,{present:s||h.open,children:u.jsx($A,{asChild:!0,container:c,children:f})}))})},"DialogPortal"),Kd="DialogOverlay",zv=S.forwardRef(ln(function(a,s){const o=Lb(Kd,a.__scopeDialog),{forceMount:c=o.forceMount,...h}=a,f=Hn(Kd,a.__scopeDialog);return f.modal?u.jsx(Bf,{present:c||f.open,children:u.jsx(HD,{...h,ref:s})}):null},"DialogOverlay")),UD=zf("DialogOverlay.RemoveScroll"),HD=S.forwardRef(ln(function(a,s){const{__scopeDialog:o,...c}=a,h=Hn(Kd,o),f=mb(),m=Xa(s,f);return u.jsx(zb,{as:UD,allowPinchZoom:!0,shards:[h.contentRef],children:u.jsx($a.div,{"data-state":qf(h.open),...c,ref:m,style:{pointerEvents:"auto",...c.style}})})},"DialogOverlayImpl")),ns="DialogContent",_v=S.forwardRef(ln(function(a,s){const o=Lb(ns,a.__scopeDialog),{forceMount:c=o.forceMount,...h}=a,f=Hn(ns,a.__scopeDialog);return u.jsx(Bf,{present:c||f.open,children:f.modal?u.jsx(qD,{...h,ref:s}):u.jsx(YD,{...h,ref:s})})},"DialogContent")),qD=S.forwardRef(ln(function(a,s){const o=Hn(ns,a.__scopeDialog),c=S.useRef(null),h=Xa(s,o.contentRef,c);return S.useEffect(()=>{const f=c.current;if(f)return _D(f)},[]),u.jsx(Ub,{...a,ref:h,trapFocus:o.open,disableOutsidePointerEvents:o.open,onCloseAutoFocus:Gr(a.onCloseAutoFocus,f=>{var m;f.preventDefault(),(m=o.triggerRef.current)==null||m.focus()}),onPointerDownOutside:Gr(a.onPointerDownOutside,f=>{const m=f.detail.originalEvent,g=m.button===0&&m.ctrlKey===!0;(m.button===2||g)&&f.preventDefault()}),onFocusOutside:Gr(a.onFocusOutside,f=>f.preventDefault())})},"DialogContentModal")),YD=S.forwardRef(ln(function(a,s){const o=Hn(ns,a.__scopeDialog),c=S.useRef(!1),h=S.useRef(!1);return u.jsx(Ub,{...a,ref:s,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:f=>{var m,g;(m=a.onCloseAutoFocus)==null||m.call(a,f),f.defaultPrevented||(c.current||(g=o.triggerRef.current)==null||g.focus(),f.preventDefault()),c.current=!1,h.current=!1},onInteractOutside:f=>{var p,v;(p=a.onInteractOutside)==null||p.call(a,f),f.defaultPrevented||(c.current=!0,f.detail.originalEvent.type==="pointerdown"&&(h.current=!0));const m=f.target;((v=o.triggerRef.current)==null?void 0:v.contains(m))&&f.preventDefault(),f.detail.originalEvent.type==="focusin"&&h.current&&f.preventDefault()}})},"DialogContentNonModal")),Ub=S.forwardRef(ln(function(a,s){const{__scopeDialog:o,trapFocus:c,onOpenAutoFocus:h,onCloseAutoFocus:f,...m}=a,g=Hn(ns,o);return Uf(),u.jsx(u.Fragment,{children:u.jsx(GA,{asChild:!0,loop:!0,trapped:c,onMountAutoFocus:h,onUnmountAutoFocus:f,children:u.jsx(HA,{role:"dialog",id:g.contentId,"aria-describedby":g.descriptionPresent?g.descriptionId:void 0,"aria-labelledby":g.titlePresent?g.titleId:void 0,"data-state":qf(g.open),...m,ref:s,deferPointerDownOutside:!0,onDismiss:()=>g.onOpenChange(!1)})})})},"DialogContentImpl")),GD="DialogTitle",Vv=S.forwardRef(ln(function(a,s){const{__scopeDialog:o,...c}=a,h=Hn(GD,o),{setTitleCount:f}=h;return yr(()=>(f(m=>m+1),()=>f(m=>m-1)),[f]),u.jsx($a.h2,{id:h.titleId,...c,ref:s})},"DialogTitle")),PD="DialogDescription",Bv=S.forwardRef(ln(function(a,s){const{__scopeDialog:o,...c}=a,h=Hn(PD,o),{setDescriptionCount:f}=h;return yr(()=>(f(m=>m+1),()=>f(m=>m-1)),[f]),u.jsx($a.p,{id:h.descriptionId,...c,ref:s})},"DialogDescription"));function qf(n){return n?"open":"closed"}ln(qf,"getState");function XD({onCreated:n,onBack:a,onCancel:s}){const[o,c]=S.useState(2),[h,f]=S.useState("日报任务"),[m,g]=S.useState("17:30"),[p,v]=S.useState(!1),[x,b]=S.useState("");async function j(){v(!0),b("");try{const E=await be("daily.create",{name:h.trim(),sendTime:m});await n(E)}catch(E){b(E instanceof Error?E.message:String(E))}finally{v(!1)}}return u.jsxs(u.Fragment,{children:[u.jsx($D,{current:o}),x&&u.jsx("div",{className:"notice error",role:"alert",children:u.jsxs("div",{children:[u.jsx("strong",{children:"创建失败"}),u.jsx("span",{children:x})]})}),o===2?u.jsxs("div",{className:"automation-create-step",children:[u.jsxs("div",{children:[u.jsx("h3",{children:"基本信息"}),u.jsx("p",{children:"名称用于在自动化任务列表中识别这份日报。"})]}),u.jsxs("label",{children:["任务名称",u.jsx("input",{value:h,autoFocus:!0,onChange:E=>f(E.target.value)})]}),u.jsxs("div",{className:"dialog-actions",children:[u.jsxs("button",{className:"ghost",onClick:a,children:[u.jsx(ts,{}),"返回选择类型"]}),u.jsx("button",{className:"primary",disabled:!h.trim(),onClick:()=>c(3),children:"下一步"})]})]}):u.jsxs("div",{className:"automation-create-step",children:[u.jsxs("div",{children:[u.jsx("h3",{children:"日报必要配置"}),u.jsx("p",{children:"先确定每天的发送时间；消息字段和测试发送在创建后的专用 Tab 中完成。"})]}),u.jsxs("label",{children:["每天发送时间",u.jsx("input",{type:"time",value:m,onChange:E=>g(E.target.value)})]}),u.jsxs("div",{className:"automation-create-summary",children:[u.jsx("span",{children:"任务类型"}),u.jsx("strong",{children:"日报推送"}),u.jsx("span",{children:"创建后继续"}),u.jsx("strong",{children:"消息内容 → 预览与测试"})]}),u.jsxs("div",{className:"dialog-actions",children:[u.jsxs("button",{className:"ghost",disabled:p,onClick:()=>c(2),children:[u.jsx(ts,{}),"上一步"]}),u.jsx("button",{className:"secondary",disabled:p,onClick:s,children:"取消"}),u.jsxs("button",{className:"primary",disabled:p||!m,onClick:j,children:[p&&u.jsx(gl,{className:"spin"}),"创建任务"]})]})]})]})}function $D({current:n}){return u.jsxs("ol",{className:"automation-create-progress","aria-label":"新建任务进度",children:[u.jsx("li",{className:"done",children:"1 选择类型"}),u.jsx("li",{className:n===2?"current":"done",children:"2 基本信息"}),u.jsx("li",{className:n===3?"current":"",children:"3 必要配置"})]})}function FD({onCreated:n,onBack:a,onCancel:s}){const[o,c]=S.useState(2),[h,f]=S.useState("原材料入库自动填报"),[m,g]=S.useState(""),[p,v]=S.useState(""),[x,b]=S.useState(""),[j,E]=S.useState(!1),[T,A]=S.useState("");async function R(){E(!0),A("");try{const M=await be("notionFill.create",{name:h.trim(),sourcePageUrl:m.trim(),username:p.trim(),password:x});await n(M)}catch(M){A(M instanceof Error?M.message:String(M))}finally{E(!1)}}return u.jsxs(u.Fragment,{children:[u.jsx(KD,{current:o}),T&&u.jsx("div",{className:"notice error",role:"alert",children:u.jsxs("div",{children:[u.jsx("strong",{children:"创建失败"}),u.jsx("span",{children:T})]})}),o===2?u.jsxs("div",{className:"automation-create-step",children:[u.jsxs("div",{children:[u.jsx("h3",{children:"基本信息"}),u.jsx("p",{children:"名称用于在自动化任务列表中识别这份填报任务。"})]}),u.jsxs("label",{children:["任务名称",u.jsx("input",{value:h,autoFocus:!0,onChange:M=>f(M.target.value)})]}),u.jsxs("div",{className:"dialog-actions",children:[u.jsxs("button",{className:"ghost",onClick:a,children:[u.jsx(ts,{}),"返回选择类型"]}),u.jsx("button",{className:"primary",disabled:!h.trim(),onClick:()=>c(3),children:"下一步"})]})]}):u.jsxs("div",{className:"automation-create-step",children:[u.jsxs("div",{children:[u.jsx("h3",{children:"93 系统连接"}),u.jsx("p",{children:"凭据只归 NotionFill 任务所有，并使用现有 Windows 加密存储。"})]}),u.jsxs("label",{children:["材料入库业务页面",u.jsx("input",{type:"url",value:m,placeholder:"http://服务器/业务页面",autoFocus:!0,onChange:M=>g(M.target.value)})]}),u.jsxs("label",{children:["93 系统用户名",u.jsx("input",{value:p,autoComplete:"username",onChange:M=>v(M.target.value)})]}),u.jsxs("label",{children:["93 系统密码",u.jsx("input",{type:"password",value:x,autoComplete:"new-password",onChange:M=>b(M.target.value)})]}),u.jsxs("div",{className:"automation-create-summary",children:[u.jsx("span",{children:"填报目标"}),u.jsx("strong",{children:"原材料入库数据库"}),u.jsx("span",{children:"执行时间"}),u.jsx("strong",{children:"每天 00:00 · 填报前一天"}),u.jsx("span",{children:"写入方式"}),u.jsx("strong",{children:"按日期查重，仅新增"})]}),u.jsxs("div",{className:"dialog-actions",children:[u.jsxs("button",{className:"ghost",disabled:j,onClick:()=>c(2),children:[u.jsx(ts,{}),"上一步"]}),u.jsx("button",{className:"secondary",disabled:j,onClick:s,children:"取消"}),u.jsxs("button",{className:"primary",disabled:j||!m.trim()||!p.trim()||!x,onClick:R,children:[j&&u.jsx(gl,{className:"spin"}),"创建任务"]})]})]})]})}function KD({current:n}){return u.jsxs("ol",{className:"automation-create-progress","aria-label":"新建任务进度",children:[u.jsx("li",{className:"done",children:"1 选择类型"}),u.jsx("li",{className:n===2?"current":"done",children:"2 基本信息"}),u.jsx("li",{className:n===3?"current":"",children:"3 必要配置"})]})}const Hb=[{taskType:"daily_report",name:"日报推送",description:"查询日报数据、生成消息并发送钉钉。",renderCreate:n=>u.jsx(XD,{...n}),taskTabs:[{id:"configuration",label:"任务配置"},{id:"execution",label:"运行与测试"}],resolveSection:n=>n==="basics"?"basics":n==="template"?"configuration":"execution",issueTitle:n=>n==="notification"?"通知渠道未就绪":n==="template"?"日报配置尚未验证":"基本信息不完整",renderEditor:n=>u.jsx(Zx,{id:n.id,back:()=>n.navigate("list"),changed:n.changed,openSettings:n.openSettings}),loadRuns:n=>be("daily.runs",{id:n}).then(({runs:a})=>a.map(s=>({id:s.id,time:s.time,source:s.source,status:s.status,title:s.textSummary||`业务日期 ${s.businessDate||"—"}`,details:[`业务日期：${s.businessDate||"—"}`,`阶段：${s.stage}`,`尝试：${s.attempts}`],error:s.error})))},{taskType:"notion_fill",name:"Notion 自动填报",description:"读取 93 系统前一天入库数据并新增到 Notion。",renderCreate:n=>u.jsx(FD,{...n}),taskTabs:[{id:"configuration",label:"任务配置"},{id:"execution",label:"运行与测试"}],resolveSection:n=>n==="basics"?"basics":n==="test"?"execution":"configuration",issueTitle:n=>n==="connection"?"93 系统连接未就绪":n==="target"?"Notion 填报目标未就绪":n==="test"?"任务尚未完成只读测试":"基本信息不完整",renderEditor:n=>u.jsx(Qx,{id:n.id,back:()=>n.navigate("list"),changed:n.changed,openSettings:n.openSettings}),loadRuns:n=>be("notionFill.runs",{id:n}).then(({runs:a})=>a.map(s=>({id:s.id,time:s.time,source:s.source==="source-test"?"93读取测试":s.source==="test"?"只读测试":s.source==="manual"?"手动执行":"自动执行",status:s.status==="created"?"已新增":s.status==="checked"?"已检查":"失败",title:`${s.businessDate} · 板材 ${s.plateWeight.toLocaleString("zh-CN",{maximumFractionDigits:3})} 吨 · 型材 ${s.sectionWeight.toLocaleString("zh-CN",{maximumFractionDigits:3})} 吨`,details:[s.message].filter(Boolean),error:s.error})))}];function Lv(n){return Hb.find(a=>a.taskType===n)}const cd=n=>({tone:"error",title:"操作失败",message:n instanceof Error?n.message:String(n)});function ZD({openSettings:n}){var k;const[a,s]=S.useState([]),[o,c]=S.useState(),[h,f]=S.useState(""),[m,g]=S.useState(""),[p,v]=S.useState(),[x,b]=S.useState(),[j,E]=S.useState(),[T,A]=S.useState(!1),[R,M]=S.useState(""),_=()=>be("automation.list").then(N=>{const G=Array.isArray(N.tasks)?N.tasks:a;return s(G),c(F=>F&&(G.find(ee=>ee.taskType===F.taskType&&ee.id===F.id)||F)),G});S.useEffect(()=>{_().catch(N=>v(cd(N)))},[]),S.useEffect(()=>{if(!x)return;const N=()=>b(void 0),G=F=>F.key==="Escape"&&N();return window.addEventListener("pointerdown",N),window.addEventListener("keydown",G),window.addEventListener("blur",N),()=>{window.removeEventListener("pointerdown",N),window.removeEventListener("keydown",G),window.removeEventListener("blur",N)}},[x]);async function V(N,G){const F=await _();A(!1),M(""),c(F.find(ee=>ee.taskType===N&&ee.id===G.id))}async function L(N){g(N.id),v(void 0);try{const G=await be("automation.setEnabled",{taskType:N.taskType,id:N.id,enabled:!N.isEnabled},6e4);G.missingStep?(f(G.missingStep),c(N),v({tone:"warning",title:"配置尚未完成",message:G.message||""})):await _()}catch(G){v(cd(G))}finally{g("")}}async function P(N){if(!N.isEnabled){g(N.id);try{await be("automation.delete",{taskType:N.taskType,id:N.id}),E(void 0),await _()}catch(G){v(cd(G))}finally{g("")}}}if(o){const N=Lv(o.taskType);if(N)return u.jsx(QD,{openSettings:n,task:o,definition:N,focusStep:h,notice:p,refresh:_,back:()=>{c(void 0),f(""),v(void 0),_()}})}return u.jsxs("div",{className:"page daily-page automation-list-page",children:[u.jsxs("header",{children:[u.jsxs("div",{children:[u.jsx("h1",{children:"自动化任务"}),u.jsx("p",{children:"管理定时推送与自动填报，查看任务配置和运行情况。"})]}),u.jsx("div",{className:"header-actions",children:u.jsxs("button",{className:"primary",onClick:()=>A(!0),children:[u.jsx(LC,{}),"新建任务"]})})]}),p&&u.jsx("div",{className:`notice ${p.tone}`,role:"status",children:u.jsxs("div",{children:[u.jsx("strong",{children:p.title}),u.jsx("span",{children:p.message})]})}),u.jsxs("section",{className:"daily-job-list","aria-label":"任务列表",children:[a.map(N=>u.jsxs("article",{className:`daily-job-card${["incomplete","pending-test","schedule-error"].includes(N.status)?" needs-attention":""}`,onClick:()=>c(N),onContextMenu:G=>{G.preventDefault(),b({task:N,x:Math.min(G.clientX,window.innerWidth-176),y:Math.min(G.clientY,window.innerHeight-58)})},children:[u.jsxs("div",{className:"job-copy",children:[u.jsx("h2",{children:u.jsx("button",{type:"button",className:"automation-task-name",onClick:G=>{G.stopPropagation(),c(N)},children:N.name||"未命名任务"})}),u.jsxs("p",{children:[N.taskTypeName," · ",N.schedule," · ",N.connectionStatus]})]}),u.jsxs("div",{className:"job-actions",onClick:G=>G.stopPropagation(),children:[u.jsx("span",{className:`job-status ${N.status}`,children:qb(N.status)}),u.jsxs("label",{className:"switch",children:[u.jsx("input",{type:"checkbox","aria-label":`启用${N.name||"未命名任务"}`,checked:N.isEnabled,disabled:!N.schedulingAvailable||m===N.id,title:N.schedulingAvailable?void 0:"Development 环境默认不启用定时任务",onChange:()=>L(N)}),u.jsx("span",{})]}),u.jsx("button",{type:"button",className:"automation-task-more","aria-label":`${N.name||"未命名任务"}的更多操作`,"aria-haspopup":"menu",onClick:G=>{const F=G.currentTarget.getBoundingClientRect();b({task:N,x:Math.min(F.left,window.innerWidth-176),y:Math.min(F.bottom+4,window.innerHeight-58)})},children:u.jsx(RC,{})})]}),u.jsxs("div",{className:"automation-card-footer",children:["最近运行：",N.lastRun]})]},`${N.taskType}:${N.id}`)),!a.length&&u.jsxs("div",{className:"empty-state",children:[u.jsx(zC,{}),u.jsx("h2",{children:"还没有自动化任务"}),u.jsx("p",{children:"选择一种任务类型，新建后进入对应的专用配置界面。"})]})]}),!!a.length&&u.jsx("p",{className:"automation-list-help",children:"点击任务名称进入配置。日报配置通知后即可开启，执行结果见运行记录。"}),x&&u.jsx("div",{className:"job-context-menu",role:"menu",style:{left:x.x,top:x.y},onPointerDown:N=>N.stopPropagation(),children:u.jsxs("button",{className:"danger-quiet",role:"menuitem",disabled:x.task.isEnabled||m===x.task.id,onClick:()=>{E(x.task),b(void 0)},children:[u.jsx(XC,{}),x.task.isEnabled?"停用后可删除":"删除任务"]})}),u.jsx(Rv,{open:!!j,onOpenChange:N=>!N&&E(void 0),children:u.jsxs(Ov,{children:[u.jsx(zv,{className:"dialog-overlay"}),u.jsxs(_v,{className:"dialog",children:[u.jsx(Vv,{children:"删除自动化任务？"}),u.jsxs(Bv,{children:["将删除“",j==null?void 0:j.name,"”及其业务记录，此操作无法撤销。"]}),u.jsxs("div",{className:"dialog-actions",children:[u.jsx("button",{className:"secondary",onClick:()=>E(void 0),children:"取消"}),u.jsx("button",{className:"danger",disabled:!!m,onClick:()=>j&&P(j),children:"确认删除"})]})]})]})}),u.jsx(Rv,{open:T,onOpenChange:N=>{A(N),N||M("")},children:u.jsxs(Ov,{children:[u.jsx(zv,{className:"dialog-overlay"}),u.jsxs(_v,{className:"dialog automation-create-dialog",children:[u.jsx(Vv,{children:"新建自动化任务"}),u.jsx(Bv,{children:R?"填写任务信息，创建后可随时通过 Tab 修改。":"先选择任务类型，后续配置由对应任务自己提供。"}),R?(k=Lv(R))==null?void 0:k.renderCreate({onCreated:N=>V(R,N),onBack:()=>M(""),onCancel:()=>{A(!1),M("")}}):u.jsx("div",{className:"automation-create-types",children:Hb.map(N=>u.jsxs("button",{onClick:()=>M(N.taskType),children:[u.jsx("strong",{children:N.name}),u.jsx("span",{children:N.description})]},N.taskType))})]})]})})]})}function QD({openSettings:n,task:a,definition:s,focusStep:o,notice:c,refresh:h,back:f}){const[m,g]=S.useState(o?s.resolveSection(o):"basics"),p=a.taskType==="daily_report",[v,x]=S.useState(),[b,j]=S.useState(""),[E,T]=S.useState(!1),A=[{id:"basics",label:"基本信息"},...s.taskTabs,{id:"runs",label:"运行记录"}],R=[...a.missingMessage?[{id:`configuration:${a.missingStep||"unknown"}`,title:s.issueTitle(a.missingStep||""),message:a.missingMessage,section:s.resolveSection(a.missingStep||"")}]:[],...a.status==="schedule-error"&&a.schedulerMessage?[{id:"scheduler",title:"计划任务异常",message:a.schedulerMessage,section:"basics"}]:[]];async function M(){T(!0),j("");try{x(await s.loadRuns(a.id))}catch(V){j(V instanceof Error?V.message:String(V))}finally{T(!1)}}S.useEffect(()=>{m==="runs"&&v===void 0&&M()},[m,v]);function _(V,L){var k;if(V.key!=="ArrowLeft"&&V.key!=="ArrowRight")return;V.preventDefault();const P=(L+(V.key==="ArrowRight"?1:-1)+A.length)%A.length;g(A[P].id),A[P].id==="basics"&&h().catch(()=>{}),(k=document.getElementById(`automation-tab-${A[P].id}`))==null||k.focus()}return p?u.jsx(Zx,{id:a.id,back:f,changed:h,openSettings:n}):a.taskType==="notion_fill"?u.jsx(Qx,{id:a.id,back:f,changed:h,openSettings:n}):u.jsxs("div",{className:"page daily-page automation-detail",children:[u.jsxs("header",{children:[u.jsxs("div",{children:[u.jsxs("button",{className:"back-link","aria-label":"返回任务列表",onClick:f,children:[u.jsx(ts,{}),"返回任务列表"]}),u.jsx("h1",{title:a.name||"未命名任务",children:a.name||"未命名任务"}),u.jsxs("p",{children:[a.taskTypeName," · ",a.schedule]})]}),u.jsx("span",{className:`job-status ${a.status}`,children:qb(a.status)})]}),u.jsx("div",{className:"automation-tabs",role:"tablist","aria-label":"任务详情",children:A.map((V,L)=>u.jsx("button",{type:"button",role:"tab",id:`automation-tab-${V.id}`,"aria-selected":m===V.id,"aria-controls":`automation-panel-${V.id}`,tabIndex:m===V.id?0:-1,onClick:()=>{g(V.id),V.id==="basics"&&h().catch(()=>{})},onKeyDown:P=>_(P,L),children:V.label},V.id))}),u.jsxs("div",{children:[c&&u.jsx("div",{className:`notice ${c.tone}`,role:"status",children:u.jsxs("div",{children:[u.jsx("strong",{children:c.title}),u.jsx("span",{children:c.message})]})}),!!R.length&&u.jsxs("section",{className:"automation-issues","aria-labelledby":"automation-issues-title",children:[u.jsxs("div",{className:"automation-issues-heading",children:[u.jsx($C,{}),u.jsxs("div",{children:[u.jsx("h2",{id:"automation-issues-title",children:"配置问题"}),u.jsx("p",{children:"完成以下项目后才能安全启用任务。"})]}),u.jsxs("span",{children:[R.length," 项"]})]}),u.jsx("ul",{children:R.map(V=>{var L;return u.jsxs("li",{children:[u.jsxs("div",{children:[u.jsx("strong",{children:V.title}),u.jsx("span",{children:V.message})]}),u.jsxs("button",{type:"button",onClick:()=>{g(V.section)},children:["前往",((L=A.find(P=>P.id===V.section))==null?void 0:L.label)||"处理",u.jsx(DC,{})]})]},V.id)})})]}),u.jsxs("div",{className:"automation-tab-panel",role:"tabpanel",id:`automation-panel-${m}`,"aria-labelledby":`automation-tab-${m}`,children:[u.jsx("div",{hidden:m==="runs",children:s.renderEditor({id:a.id,section:m,openSettings:n,navigate:g,changed:()=>{h().catch(()=>{})}})}),m==="runs"&&u.jsxs("section",{className:"surface automation-runs",children:[u.jsxs("div",{className:"automation-runs-heading",children:[u.jsxs("div",{children:[u.jsx("h2",{children:"运行记录"}),u.jsx("p",{children:"查看任务执行结果和错误详情。"})]}),u.jsxs("button",{className:"secondary",disabled:E,onClick:M,children:[E?u.jsx(gl,{className:"spin"}):u.jsx(UC,{}),"刷新"]})]}),b&&u.jsx("div",{className:"notice error",role:"alert",children:u.jsxs("div",{children:[u.jsx("strong",{children:"运行记录读取失败"}),u.jsx("span",{children:b})]})}),u.jsx("div",{className:"automation-run-list",children:v==null?void 0:v.map(V=>u.jsxs("details",{children:[u.jsxs("summary",{children:[u.jsx("span",{children:V.time}),u.jsx("span",{children:V.source}),u.jsx("strong",{children:V.title}),u.jsx("b",{className:V.error?"error-text":"",children:V.status})]}),u.jsxs("div",{children:[V.details.map(L=>u.jsx("p",{children:L},L)),V.error&&u.jsxs("p",{className:"run-error",children:["错误：",V.error]})]})]},V.id))}),!E&&v&&!v.length&&u.jsx("p",{className:"automation-empty",children:"暂无运行记录"})]})]})]})]})}function qb(n){return{incomplete:"配置未完成","pending-test":"待测试",ready:"可启用",enabled:"已启用","schedule-error":"计划异常"}[n]||n}function JD(n){const a=n-5;return Array.from({length:12},(s,o)=>a+o)}function WD(n,a){const s=new Date(n,a,1),o=new Date(n,a,1-s.getDay());return Array.from({length:42},(c,h)=>{const f=new Date(o.getFullYear(),o.getMonth(),o.getDate()+h);return{date:Yb(f),day:f.getDate(),currentMonth:f.getMonth()===a}})}function Yb(n){const a=n.getFullYear(),s=String(n.getMonth()+1).padStart(2,"0"),o=String(n.getDate()).padStart(2,"0");return`${a}-${s}-${o}`}function Uv(n){const[a,s,o]=n.split("-").map(Number),c=new Date(a,s-1,o);return a&&s&&o&&c.getFullYear()===a&&c.getMonth()===s-1&&c.getDate()===o?c:new Date}function hr({value:n,options:a,placeholder:s,disabled:o,ariaLabel:c,onChange:h}){const[f,m]=S.useState(!1),g=Bx(),p=a.find(v=>v.value===n);return u.jsxs("div",{className:"form-picker",children:[u.jsxs("button",{type:"button",className:`picker-trigger ${f?"open":""}`,disabled:o,"aria-label":c,"aria-haspopup":"listbox","aria-expanded":f,onClick:()=>m(!f),children:[u.jsx("span",{className:p?"":"picker-placeholder",children:(p==null?void 0:p.label)||s}),u.jsx(MC,{})]}),f&&u.jsxs(u.Fragment,{children:[u.jsx("button",{type:"button",className:"picker-backdrop","aria-label":"关闭选项",onClick:()=>m(!1)}),u.jsxs(Mf.div,{className:"picker-popover choice-popover",role:"listbox",initial:g?!1:{opacity:0,y:-5},animate:{opacity:1,y:0,transitionEnd:{transform:"none"}},transition:{duration:g?0:.12},children:[a.map(v=>u.jsxs("button",{type:"button",role:"option","aria-selected":v.value===n,className:v.value===n?"selected":"",onClick:()=>{h(v.value),m(!1)},children:[u.jsx("span",{children:v.label}),v.value===n&&u.jsx(cs,{})]},v.value)),!a.length&&u.jsx("span",{className:"picker-empty",children:"暂无可选项"})]})]})]})}function Zi({value:n,onChange:a}){const s=Uv(n),[o,c]=S.useState(!1),[h,f]=S.useState("days"),[m,g]=S.useState(()=>new Date(s.getFullYear(),s.getMonth(),1)),p=WD(m.getFullYear(),m.getMonth()),v=JD(m.getFullYear()),x=Yb(new Date),b=T=>{a(T),c(!1);const A=Uv(T);g(new Date(A.getFullYear(),A.getMonth(),1))},j=()=>{const T=!o;c(T),f("days"),T&&g(new Date(s.getFullYear(),s.getMonth(),1))},E=T=>g(h==="days"?new Date(m.getFullYear(),m.getMonth()+T,1):new Date(m.getFullYear()+T*(h==="years"?12:1),m.getMonth(),1));return u.jsxs("div",{className:"date-picker",children:[u.jsxs("button",{type:"button",className:`date-trigger ${o?"open":""}`,"aria-haspopup":"dialog","aria-expanded":o,onClick:j,children:[u.jsx("span",{children:n?n.replaceAll("-","/"):"选择日期"}),u.jsx(Ux,{})]}),o&&u.jsxs(u.Fragment,{children:[u.jsx("button",{type:"button",className:"date-backdrop","aria-label":"关闭日期选择器",onClick:()=>c(!1)}),u.jsxs(Mf.div,{className:"calendar-popover",role:"dialog","aria-label":"选择日期",initial:{opacity:0,y:-6},animate:{opacity:1,y:0,transitionEnd:{transform:"none"}},transition:{duration:.14},children:[u.jsxs("div",{className:"calendar-head",children:[u.jsx("button",{type:"button","aria-label":"上一页",onClick:()=>E(-1),children:u.jsx(Hx,{})}),u.jsx("button",{type:"button",className:"calendar-title",onClick:()=>f(T=>T==="days"?"months":"years"),children:h==="years"?`${v[0]}–${v[11]} 年`:`${m.getFullYear()} 年${h==="days"?` ${m.getMonth()+1} 月`:""}`}),u.jsx("button",{type:"button","aria-label":"下一页",onClick:()=>E(1),children:u.jsx(qx,{})})]}),h==="days"?u.jsxs(u.Fragment,{children:[u.jsx("div",{className:"weekdays",children:["日","一","二","三","四","五","六"].map(T=>u.jsx("span",{children:T},T))}),u.jsx("div",{className:"calendar-grid",children:p.map(T=>u.jsx("button",{type:"button",className:`${T.currentMonth?"":"outside"} ${T.date===n?"selected":""} ${T.date===x?"today":""}`,onClick:()=>b(T.date),children:T.day},T.date))})]}):h==="months"?u.jsx("div",{className:"month-grid",children:Array.from({length:12},(T,A)=>u.jsxs("button",{type:"button",className:s.getFullYear()===m.getFullYear()&&s.getMonth()===A?"selected":"",onClick:()=>{g(new Date(m.getFullYear(),A,1)),f("days")},children:[A+1," 月"]},A))}):u.jsx("div",{className:"month-grid year-grid",children:v.map(T=>u.jsx("button",{type:"button",className:s.getFullYear()===T?"selected":"",onClick:()=>{g(new Date(T,m.getMonth(),1)),f("months")},children:T},T))}),u.jsx("div",{className:"calendar-footer",children:u.jsx("button",{type:"button",onClick:()=>b(x),children:"今天"})})]})]})]})}function Hv({value:n,onChange:a,unit:s,className:o="",disabled:c,ariaLabel:h,onKeyDown:f}){return u.jsxs("div",{className:`numeric-input ${o}`.trim(),children:[u.jsx("input",{type:"text",inputMode:"decimal",value:n,disabled:c,"aria-label":h,onChange:m=>a(m.target.value),onKeyDown:f}),s&&u.jsx("span",{children:s})]})}function Gb({current:n,titles:a,label:s}){const o=a.map((c,h)=>({number:h+1,title:c}));return u.jsx("div",{className:"step-bar","aria-label":s,children:o.map((c,h)=>{const f=c.number<n?"done":c.number===n?"active":"pending";return u.jsxs(S.Fragment,{children:[u.jsxs("div",{className:`step step-${f}`,"aria-current":f==="active"?"step":void 0,children:[u.jsx("div",{className:`step-circle ${f}`,children:f==="done"?u.jsx(cs,{}):c.number}),u.jsx("span",{children:c.title})]}),h<o.length-1&&u.jsx("div",{className:`step-line ${c.number<n?"done":c.number===n?"transition":"pending"}`})]},c.number)})})}const qv={configured:!1,binding:{bound:!1,name:"",path:""},usesBusinessSections:!1,businessSections:[],sources:[],selected:""};function ID(){const n=new Date;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`}function eN({openSettings:n}){const[a,s]=S.useState(1),[o,c]=S.useState(ID),[h,f]=S.useState(""),[m,g]=S.useState([]),[p,v]=S.useState(qv),[x,b]=S.useState(!1),[j,E]=S.useState("database"),[T,A]=S.useState(""),[R,M]=S.useState(""),[_,V]=S.useState(!1),[L,P]=S.useState("state"),[k,N]=S.useState(""),[G,F]=S.useState(""),[ee,ie]=S.useState(),ge=S.useRef(!1),ce=S.useRef(!1);S.useEffect(()=>{be("weld.getState").then(Q=>{var I;const fe=Q!=null&&Q.binding&&Array.isArray(Q.sources)?Q:qv;v(fe),A(((I=fe.sources.find(me=>me.id===fe.selected))==null?void 0:I.businessSection)||""),M(fe.selected)}).catch(Q=>N(Q instanceof Error?Q.message:"读取 Notion 配置失败")).finally(()=>P(void 0))},[]);const oe=/^\d+$/.test(h)&&Number(h)>0,U=S.useMemo(()=>m.reduce((Q,fe)=>Q+Number(fe.qty||0),0),[m]),ae=U-Number(h||0),se=m.length>0&&m.every(Q=>/^\d+$/.test(Q.qty))&&ae===0,$=p.usesBusinessSections?p.sources.filter(Q=>Q.businessSection===T):p.sources,ne=L==="generate"||L==="check"||L==="write";async function C(){if(!(!oe||ne)){P("generate"),N("");try{const Q=await be("weld.generate",{month:o,total:h});g(Q.map(fe=>({...fe,qty:String(fe.qty)}))),s(2)}catch(Q){N(Q instanceof Error?Q.message:"拆分失败")}finally{P(void 0)}}}function O(Q,fe){fe!==""&&!/^\d+$/.test(fe)||g(I=>I.map((me,Ce)=>Ce===Q?{...me,qty:fe}:me))}async function J(){if(R){P("binding"),N("");try{const Q=await be("weld.saveBinding",{sourceId:R});v(Q),M(Q.selected),b(!1)}catch(Q){N(Q instanceof Error?Q.message:"绑定失败")}finally{P(void 0)}}}async function te(){if(!se||!p.binding.bound||ne||ge.current)return;ge.current=!0,P("check"),N("");const Q={month:o,total:h,rows:m.map(fe=>({date:fe.date,qty:fe.qty}))};try{if((await be("weld.check",Q,12e4)).hasExistingData){V(!0);return}await le(Q,!1)}catch(fe){N(fe instanceof Error?fe.message:"Notion 数据检查失败")}finally{ge.current=!1,P(fe=>fe==="check"?void 0:fe)}}async function le(Q,fe){if(!ce.current){ce.current=!0,P("write"),N(""),ie(void 0);try{const I=await be("weld.write",{...Q,overwriteExisting:fe},12e4,me=>ie(me));F(I.message),V(!1),s(3)}catch(I){N(I instanceof Error?I.message:"写入 Notion 失败")}finally{ce.current=!1,P(void 0)}}}function de(){s(1),g([]),f(""),F(""),N(""),ie(void 0)}function ve(){N(""),E("database"),b(!0)}const re={month:o,total:h,rows:m.map(Q=>({date:Q.date,qty:Q.qty}))};return u.jsx("div",{className:"app-shell",children:u.jsxs("main",{className:"main-content",children:[u.jsxs("header",{className:"content-header",children:[u.jsxs("div",{children:[u.jsx("h1",{children:"月度焊接计划拆分"}),u.jsx("p",{children:"按自然日模拟产量浮动，确认后写入 Notion 焊接数据库"})]}),u.jsx("button",{type:"button",className:"template-config-button",disabled:L==="state",onClick:ve,children:"焊接设置"})]}),u.jsxs("div",{className:"production-message-scroll daily-weld-page",children:[u.jsx(Gb,{current:a,titles:["录入计划","拆分预览","完成"],label:"焊接计划拆分进度"}),k&&u.jsx("div",{className:"weld-notice error",role:"alert",children:k}),a===1&&u.jsxs("section",{className:"weld-plan-card","aria-labelledby":"weld-plan-title",children:[u.jsxs("div",{className:"weld-section-heading",children:[u.jsx("h2",{id:"weld-plan-title",children:"计划信息"}),u.jsx("p",{children:"输入本月计划焊接总量，下一步将生成每日拆分预览。"})]}),u.jsxs("div",{className:"weld-fields",children:[u.jsx(yl,{label:"计划月份",value:o,selectionMode:"month",disabled:ne,onChange:c}),u.jsxs("label",{className:"weld-field",children:[u.jsx("span",{children:"计划焊接总量（吨）"}),u.jsx(Hv,{value:h,disabled:ne,onChange:Q=>{(Q===""||/^\d+$/.test(Q))&&f(Q)},unit:"吨",ariaLabel:"计划焊接总量"})]})]}),u.jsxs("div",{className:"weld-method-note",children:[u.jsx("strong",{children:"按自然日分配 · 模拟真实产量浮动"}),u.jsx("span",{children:"工作日与周末采用不同权重，并叠加波动；每日取整后自动配平至计划总量。"})]}),u.jsx("div",{className:"weld-actions",children:u.jsx("button",{type:"button",className:"primary-button",disabled:!oe||ne,onClick:C,children:L==="generate"?"正在拆分…":"下一步：拆分预览"})})]}),a===2&&u.jsxs("section",{className:"weld-preview","aria-labelledby":"weld-preview-title",children:[u.jsxs("div",{className:"weld-preview-heading",children:[u.jsxs("div",{children:[u.jsxs("h2",{id:"weld-preview-title",children:[o.replace("-"," 年 ")," 月每日拆分详情"]}),u.jsx("p",{children:"可直接修改任意一天的数值；不满意本次浮动效果可重新模拟。"})]}),u.jsxs("button",{type:"button",className:"secondary",disabled:ne,onClick:C,children:[u.jsx(Gx,{}),"重新模拟浮动"]})]}),u.jsx("div",{className:"weld-table-wrap",children:u.jsxs("table",{children:[u.jsx("thead",{children:u.jsxs("tr",{children:[u.jsx("th",{children:"日期"}),u.jsx("th",{children:"星期"}),u.jsx("th",{children:"类型"}),u.jsx("th",{children:"计划量（吨）"})]})}),u.jsx("tbody",{children:m.map((Q,fe)=>u.jsxs("tr",{children:[u.jsx("td",{children:Q.date}),u.jsx("td",{children:Q.weekday}),u.jsx("td",{children:u.jsx("span",{className:`weld-day-pill ${Q.isWeekend?"weekend":""}`,children:Q.isWeekend?"休息日":"工作日"})}),u.jsx("td",{children:u.jsx(Hv,{value:Q.qty,disabled:ne,onChange:I=>O(fe,I),unit:"吨",ariaLabel:`${Q.date} 计划量`})})]},Q.date))})]})}),u.jsxs("div",{className:"weld-summary",children:[u.jsxs("span",{children:["共 ",m.length," 天 · 计划总量 ",u.jsx("strong",{children:h})," 吨"]}),u.jsxs("span",{children:["拆分合计 ",u.jsx("strong",{children:U})," 吨 ",ae===0?u.jsx("em",{className:"match",children:"与计划总量一致"}):u.jsxs("em",{className:"mismatch",children:["偏差 ",ae>0?"+":"",ae," 吨，可手动调整"]})]})]}),L==="write"&&u.jsx("div",{className:"weld-write-progress",role:"status","aria-live":"polite",children:ee?`正在写入 ${ee.date.slice(0,10)}（${ee.current}/${ee.total}）`:"正在准备 Notion 层级数据…"}),u.jsxs("div",{className:"weld-actions split",children:[u.jsx("button",{type:"button",className:"secondary",disabled:ne,onClick:()=>s(1),children:"返回修改"}),u.jsx("button",{type:"button",className:"primary-button",disabled:!se||!p.binding.bound||ne,onClick:te,children:L==="check"?"正在检查…":L==="write"?"正在写入…":"确认并写入 Notion"})]})]}),a===3&&u.jsxs("section",{className:"complete-view weld-complete",children:[u.jsx("div",{className:"complete-icon",children:u.jsx(cs,{})}),u.jsx("h2",{children:"入库完成"}),u.jsx("p",{children:G||`${o} 共 ${m.length} 天的焊接计划数据已写入 Notion。`}),u.jsx("button",{className:"primary-button",onClick:de,children:"拆分下一个月"})]})]}),x&&u.jsx("div",{className:"weld-settings-overlay",children:u.jsxs("section",{className:"weld-settings-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"weld-settings-title",children:[u.jsxs("aside",{className:"weld-settings-nav",children:[u.jsx("h2",{id:"weld-settings-title",children:"焊接设置"}),u.jsxs("nav",{"aria-label":"焊接设置分类",children:[u.jsxs("button",{type:"button",className:j==="rules"?"active":"",onClick:()=>E("rules"),children:[u.jsx(PC,{}),"拆分规则"]}),u.jsxs("button",{type:"button",className:j==="database"?"active":"",onClick:()=>E("database"),children:[u.jsx(Bd,{}),"数据库绑定"]})]})]}),u.jsxs("div",{className:"weld-settings-main",children:[u.jsx("button",{type:"button",className:"weld-settings-close","aria-label":"关闭焊接设置",disabled:L==="binding",onClick:()=>b(!1),children:u.jsx(KC,{})}),j==="rules"?u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"weld-settings-heading",children:[u.jsx("h3",{children:"拆分规则"}),u.jsx("p",{children:"当前规则用于生成每日焊接计划，修改每日数值后仍需保证月度合计一致。"})]}),u.jsxs("dl",{className:"weld-rule-list",children:[u.jsxs("div",{children:[u.jsx("dt",{children:"分配周期"}),u.jsx("dd",{children:"按所选月份的全部自然日"})]}),u.jsxs("div",{children:[u.jsx("dt",{children:"产量浮动"}),u.jsx("dd",{children:"基准量叠加 22% 随机波动"})]}),u.jsxs("div",{children:[u.jsx("dt",{children:"周末权重"}),u.jsx("dd",{children:"周六、周日自动降低计划权重"})]}),u.jsxs("div",{children:[u.jsx("dt",{children:"总量配平"}),u.jsx("dd",{children:"每日取整后自动配平至月度计划"})]})]})]}):u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"weld-settings-heading",children:[u.jsx("h3",{children:"数据库绑定"}),u.jsx("p",{children:"每项业务只绑定一个主写入数据库，汇总数据库由系统自动维护。"})]}),k&&u.jsx("div",{className:"weld-notice error",role:"alert",children:k}),u.jsxs("section",{className:"weld-business-binding","aria-labelledby":"weld-business-title",children:[u.jsxs("div",{className:"weld-business-title",children:[u.jsxs("div",{children:[u.jsx("h4",{id:"weld-business-title",children:"焊接业务"}),u.jsx("p",{children:"每日焊接计划的主写入数据库"})]}),u.jsx("span",{className:p.binding.bound?"bound":"",children:p.binding.bound?"已绑定":"未绑定"})]}),!p.configured||!p.sources.length?u.jsx("div",{className:"weld-notice",children:"请先在系统设置中完成数据库连接并刷新数据源。"}):u.jsxs("div",{className:"weld-dialog-field",children:[p.usesBusinessSections&&u.jsxs(u.Fragment,{children:[u.jsx("span",{children:"业务板块"}),u.jsx(hr,{value:T,options:p.businessSections.map(Q=>({value:Q,label:Q})),placeholder:"选择焊接业务板块",ariaLabel:"焊接业务板块",disabled:L==="binding",onChange:Q=>{A(Q),M("")}})]}),u.jsx("span",{children:"主写入数据库"}),u.jsx(hr,{value:R,options:$.map(Q=>({value:Q.id,label:Q.name})),placeholder:"选择每日焊接量数据库",ariaLabel:"焊接业务主写入数据库",disabled:p.usesBusinessSections&&!T||L==="binding",onChange:M})]}),u.jsx("p",{className:"weld-binding-help",children:"月度和周度汇总数据库由系统在写入时自动维护，无需单独绑定。"})]}),u.jsxs("div",{className:"weld-settings-actions",children:[u.jsx("button",{type:"button",disabled:L==="binding",onClick:()=>b(!1),children:"取消"}),!p.configured||!p.sources.length?u.jsx("button",{type:"button",className:"primary-button",onClick:n,children:"前往系统设置"}):u.jsx("button",{type:"button",className:"primary-button",disabled:!R||L==="binding",onClick:J,children:L==="binding"?"正在检测…":"保存绑定"})]})]})]})]})}),_&&u.jsx("div",{className:"pm-dialog-overlay",children:u.jsxs("section",{className:"pm-dialog weld-confirm-dialog",role:"alertdialog","aria-modal":"true","aria-labelledby":"weld-overwrite-title",children:[u.jsx("h2",{id:"weld-overwrite-title",children:"确认覆盖已有产量"}),u.jsxs("p",{children:[o," 已存在产量数据。继续后将按本次拆分结果覆盖该月每日产量，并更新月、周、日关联。"]}),k&&u.jsx("div",{className:"weld-notice error",role:"alert",children:k}),L==="write"&&u.jsx("div",{className:"weld-write-progress",role:"status","aria-live":"polite",children:ee?`正在写入 ${ee.date.slice(0,10)}（${ee.current}/${ee.total}）`:"正在准备 Notion 层级数据…"}),u.jsxs("div",{className:"pm-dialog-actions",children:[u.jsx("button",{type:"button",disabled:L==="write",onClick:()=>V(!1),children:"取消"}),u.jsx("button",{type:"button",className:"primary-button",disabled:L==="write",onClick:()=>le(re,!0),children:L==="write"?"正在写入…":"确认覆盖并写入"})]})]})})]})})}const Pb=[{category:"数据文件处理",name:"挂网计划 PDF 导出"},{category:"数据文件处理",name:"生产会资料拆分"},{category:"数据文件处理",name:"文件统计汇总"},{category:"数据同步",name:"每日焊接数据模拟"},{category:"数据同步",name:"生产消息 Notion 入库"},{category:"数据同步",name:"数据库查看"},{category:"自动化",name:"自动化任务"}],tN=[...new Set(Pb.map(n=>n.category))];function nN(n){switch(n){case"挂网计划 PDF 导出":return"plan-pdf";case"生产会资料拆分":return"production-meeting";case"每日焊接数据模拟":return"daily-weld";case"生产消息 Notion 入库":return"production-message";case"数据库查看":return"database-viewer";case"文件统计汇总":return"report-center";case"自动化任务":return"daily-report";default:return"plan-pdf"}}function rN({active:n,navigate:a,openSettings:s}){return u.jsxs("aside",{className:"sidebar",children:[u.jsx("div",{className:"sidebar-top",children:u.jsx("div",{className:"sidebar-brand",children:"生产助手"})}),u.jsx("nav",{className:"sidebar-nav","aria-label":"业务模块",children:tN.map(o=>u.jsxs("section",{className:"sidebar-section",children:[u.jsx("div",{className:"sidebar-section-label",children:o}),Pb.filter(c=>c.category===o).map(c=>{const h=nN(c.name),f=h===n;return u.jsxs("button",{className:`sidebar-item ${f?"sidebar-item-active":""}`,"aria-current":f?"page":void 0,onClick:()=>a(h),children:[u.jsx(Yv,{name:c.name}),u.jsx("span",{children:c.name})]},c.name)})]},o))}),u.jsx("div",{className:"sidebar-bottom",children:u.jsxs("button",{className:"sidebar-item","aria-haspopup":"dialog",onClick:s,children:[u.jsx(Yv,{name:"设置"}),u.jsx("span",{children:"设置"})]})})]})}function Yv({name:n}){return n==="挂网计划 PDF 导出"||n==="生产会资料拆分"?u.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[u.jsx("path",{className:"folder-lid",d:"M3.5 7h6l1.8 2h9.2"}),u.jsx("path",{d:"M4.2 7h15.6l-1.3 11H5.5L4.2 7Z"})]}):n==="每日焊接数据模拟"||n==="自动化任务"?u.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[u.jsx("rect",{x:"5",y:"4.5",width:"14",height:"15",rx:"2"}),u.jsx("path",{d:"M8 3v3M16 3v3M5 9h14"}),u.jsx("path",{className:"daily-check",d:"m8.5 14 2 2 4.5-4.5"})]}):n==="生产消息 Notion 入库"?u.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[u.jsx("path",{d:"M4 14.5 6.2 6h11.6l2.2 8.5V19H4v-4.5Z"}),u.jsx("path",{className:"inbox-tray",d:"M4.3 14h4.1l1.2 2h4.8l1.2-2h4.1"}),u.jsx("path",{className:"inbox-arrow",d:"M12 5v7m-2.5-2.5L12 12l2.5-2.5"})]}):n==="数据库查看"?u.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[u.jsx("ellipse",{cx:"12",cy:"6",rx:"7",ry:"3"}),u.jsx("path",{d:"M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"})]}):n==="文件统计汇总"?u.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[u.jsx("path",{d:"M4.5 19h15"}),u.jsx("rect",{className:"report-bar report-bar-one",x:"6",y:"12",width:"2.5",height:"6",rx:"0.5"}),u.jsx("rect",{className:"report-bar report-bar-two",x:"10.75",y:"8",width:"2.5",height:"10",rx:"0.5"}),u.jsx("rect",{className:"report-bar report-bar-three",x:"15.5",y:"5",width:"2.5",height:"13",rx:"0.5"})]}):u.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[u.jsx("circle",{cx:"12",cy:"12",r:"3"}),u.jsx("path",{className:"settings-ring",d:"M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M18 6l-1.4 1.4M7.4 16.6 6 18"})]})}const Gv=new Set(["raw_message","message_type","parser_version","unit"]),aN=new Set(["piece_count","weight","sheet_in_stock","profile_in_stock","cutting","welding","daily_output","monthly_output","yearly_output","monthly_reference","output_sections"]),iN=/(公斤|千克|kg|吨|t|张|件|套|节|台|米|m)$/i,sN={piece_count:"张",weight:"吨",sheet_in_stock:"吨",profile_in_stock:"吨",cutting:"吨",welding:"吨",daily_output:"套",output_sections:"节"};function ud(){const n=new Date;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`}function Yi(n){return n instanceof Error?n.message:String(n)}function Zd(n,a=""){const s=n.trim().match(iN);return{value:s?n.trim().slice(0,-s[0].length).trim():n,unit:(s==null?void 0:s[0])||a}}function oN(n,a){return n.trim()?`${n}${a}`:""}function lN(n,a){const s=Zd(a).value.trim(),o=Zd(n.databaseValue).value.trim(),c=n.propertyType==="number"&&!Number.isFinite(Number(s.replaceAll(",",""))),h=!s||c?"exception":o?n.propertyType==="number"?Number(s.replaceAll(",",""))===Number(o.replaceAll(",",""))?"same":"confirm":s===o?"same":"confirm":"new";return{...n,parsedValue:a,status:h,message:h==="exception"?`${n.name}的输入值无效`:h==="confirm"?"与数据库现值不同":""}}function cN(n){return{new:"新增",same:"一致",confirm:"待确认",exception:"异常",unchecked:"待检查"}[n]||"异常"}function uN(){const[n,a]=S.useState(""),[s,o]=S.useState(""),[c,h]=S.useState([]),[f,m]=S.useState(),[g,p]=S.useState(),[v,x]=S.useState(),[b,j]=S.useState(""),[E,T]=S.useState({}),[A,R]=S.useState(!1),[M,_]=S.useState(),[V,L]=S.useState(""),[P,k]=S.useState([]),[N,G]=S.useState({}),[F,ee]=S.useState(!1),[ie,ge]=S.useState({cutting:"",towerDaily:""}),ce=c.length>0,oe=ce&&n!==s,U=!!f;S.useEffect(()=>{be("production.getBindings").then(re=>{_(re),ge({cutting:re.selected.cutting||"",towerDaily:re.selected.towerDaily||""})}).catch(re=>L(Yi(re)))},[]);async function ae(){L("");try{await be("production.saveBindings",ie,12e4);const re=await be("production.getBindings");_(re),ee(!1)}catch(re){L(Yi(re))}}async function se(re){m("check"),j(""),T({});try{const Q=await be("production.check",{drafts:re,defaultDate:ud()});p(Q)}catch(Q){j(Yi(Q))}finally{m(void 0)}}async function $(){if(!(!n.trim()||U)){m("parse"),j(""),R(!1),x(void 0),p(void 0),T({});try{const re=await be("production.parse",{text:n,defaultDate:ud()});if(h(re),o(n),!re.length){j("没有解析到可核对的数据，请检查消息内容后重试。");return}re.every(Q=>Q.canWrite)&&await se(re)}catch(re){h([]),p(void 0),j(Yi(re))}finally{m(re=>re==="parse"?void 0:re)}}}async function ne(re,Q){const fe=c.map(I=>I.index===re?{...I,businessDate:Q,canWrite:!!Q,warningText:Q?"":I.warningText}:I);h(fe),p(void 0),T({}),fe.every(I=>I.canWrite)&&await se(fe)}function C(re,Q,fe){const I=`${re}:${Q}`;h(me=>me.map(Ce=>Ce.index===re?{...Ce,canWrite:!!Ce.businessDate&&Ce.kind!=="Unknown",fields:{...Ce.fields,[Q]:fe},previewFields:Ce.previewFields.map(ze=>ze.key===Q?{...ze,value:fe}:ze)}:Ce)),T(me=>Object.fromEntries(Object.entries(me).filter(([Ce])=>Ce!==I))),p(me=>{if(!me)return me;const Ce=me.items.map(ze=>{if(ze.index!==re||!ze.fields)return ze;const Qe=ze.fields.map(yt=>yt.key===Q?lN(yt,fe):yt),$e=Qe.some(yt=>yt.status==="exception")?"error":Qe.some(yt=>yt.status==="confirm")?"existing":"ready";return{...ze,fields:Qe,status:$e}});return{...me,items:Ce,succeeded:Ce.every(ze=>ze.status!=="error")}})}async function O(re){if(!(!g||U)){m("write"),j("");try{const Q=await be("production.write",{drafts:c,defaultDate:ud(),overwriteExisting:!1,fieldChoices:E,monthlyPlans:re},12e4);if(x(Q),Q.requiredMonths.length){k(Q.requiredMonths),G({});return}Q.succeeded?R(!0):j(Q.message||"Notion 写入未完成。")}catch(Q){j(Yi(Q))}finally{m(void 0)}}}function J(){a(""),o(""),h([]),p(void 0),x(void 0),T({}),R(!1),j("")}const te=S.useMemo(()=>c.flatMap(re=>{var fe;const Q=(fe=g==null?void 0:g.items.find(I=>I.index===re.index))==null?void 0:fe.fields;return Q!=null&&Q.length?Q.filter(I=>!Gv.has(I.key)).map(I=>({draft:re,key:I.key,name:I.name,propertyType:I.propertyType,parsedValue:re.fields[I.key]??I.parsedValue,databaseValue:I.databaseValue,status:I.status,message:I.message})):re.previewFields.filter(I=>!Gv.has(I.key)).map(I=>({draft:re,key:I.key,name:I.label,propertyType:aN.has(I.key)?"number":"",parsedValue:re.fields[I.key]??I.value,databaseValue:"",status:re.canWrite?"unchecked":"exception",message:re.warningText}))}),[c,g]),le=S.useMemo(()=>({newFields:te.filter(re=>re.status==="new").length,same:te.filter(re=>re.status==="same").length,confirm:te.filter(re=>re.status==="confirm").length,exception:te.filter(re=>re.status==="exception").length}),[te]),de=te.filter(re=>re.status==="confirm"),ve=ce&&!oe&&!U&&!!(g!=null&&g.succeeded)&&c.every(re=>re.canWrite&&!!re.businessDate)&&te.every(re=>re.status!=="exception"&&re.status!=="unchecked")&&de.every(re=>!!E[`${re.draft.index}:${re.key}`]);return A?u.jsxs("div",{className:"app-shell",children:[u.jsxs("main",{className:"main-content",children:[u.jsx(Xv,{configure:()=>ee(!0)}),u.jsxs("div",{className:"production-message-scroll",children:[u.jsx($v,{current:3}),u.jsxs("section",{className:"complete-view",children:[u.jsx("div",{className:"complete-icon",children:u.jsx(cs,{})}),u.jsx("h2",{children:"入库完成"}),u.jsx("p",{children:(v==null?void 0:v.message)||`${c.length} 条消息已写入 Notion`}),u.jsx("button",{className:"primary-button",onClick:J,children:"录入下一条"})]})]})]}),F&&M&&u.jsx(Pv,{state:M,selections:ie,setSelections:ge,error:V,close:()=>ee(!1),save:ae})]}):u.jsxs("div",{className:"app-shell",children:[u.jsxs("main",{className:"main-content",children:[u.jsx(Xv,{configure:()=>ee(!0)}),u.jsxs("div",{className:"production-message-scroll",children:[u.jsx($v,{current:ce?2:1}),u.jsxs("div",{className:"workspace-panel",children:[u.jsxs("section",{className:"message-pane",children:[u.jsxs("div",{className:"pane-title",children:[u.jsx("h2",{children:"原始消息"}),u.jsx("p",{children:"输入生产消息，系统将自动解析并检查已有数据。"})]}),u.jsx("textarea",{className:"message-textarea",value:n,disabled:U,onChange:re=>a(re.target.value),placeholder:"请输入生产消息"}),u.jsx("div",{className:"parse-action",children:u.jsxs("button",{className:"primary-button",disabled:!n.trim()||U,onClick:$,children:[ce&&u.jsx(Gx,{className:"button-icon refresh-icon"}),u.jsx("span",{children:f==="parse"?"正在解析…":ce?"重新解析":"解析消息"})]})})]}),u.jsx("section",{className:"review-pane",children:ce?u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"review-header",children:[u.jsx("h2",{children:"解析结果"}),u.jsxs("div",{className:"review-summary",children:[u.jsxs("span",{children:["新增",u.jsx("strong",{children:le.newFields})]}),u.jsx("i",{children:"·"}),u.jsxs("span",{children:["一致",u.jsx("strong",{children:le.same})]}),u.jsx("i",{children:"·"}),u.jsxs("span",{children:["待确认",u.jsx("strong",{children:le.confirm})]}),u.jsx("i",{children:"·"}),u.jsxs("span",{children:["异常",u.jsx("strong",{children:le.exception})]})]})]}),u.jsx("div",{className:"date-groups",children:c.map(re=>{const Q=te.filter(me=>me.draft.index===re.index),fe=Q.filter(me=>me.status==="confirm"),I=g?{...g,items:g.items.filter(me=>me.index===re.index)}:void 0;return u.jsxs("section",{className:"date-group","data-business-date":re.businessDate,children:[u.jsxs("div",{className:"identity-section",children:[u.jsx("div",{className:"identity-field",children:u.jsx(yl,{label:"日期",value:re.businessDate||"",disabled:U,onChange:me=>ne(re.index,me)})}),u.jsxs("div",{className:"identity-field",children:[u.jsx("label",{children:"业务 / 产线"}),u.jsx("input",{className:"field-input",value:re.typeDisplay||"",readOnly:!0,disabled:U})]})]}),u.jsx(dN,{busy:f==="check",result:I,error:b,needsReparse:oe,invalidCount:re.canWrite?0:1,fieldStatuses:Q.map(me=>me.status)}),u.jsx("div",{className:"data-title",children:"数据字段"}),u.jsxs("div",{className:"field-table",children:[u.jsxs("div",{className:"field-table-header",children:[u.jsx("div",{children:"字段"}),u.jsx("div",{children:"本次解析值"}),u.jsx("div",{children:"数据库值"}),u.jsx("div",{className:"header-status",children:"状态"})]}),Q.map(me=>{const Ce=Zd(me.parsedValue,me.propertyType==="number"&&sN[me.key]||""),ze=`${me.draft.index}:${me.key}`;return u.jsxs("div",{className:"field-row",children:[u.jsx("div",{className:"field-name",children:me.name}),u.jsx("div",{className:"field-editor",children:u.jsxs("div",{className:"input-unit-wrap",children:[u.jsx("input",{className:"field-input compact-input",value:Ce.value,disabled:U,"aria-invalid":me.status==="exception",onChange:Qe=>C(me.draft.index,me.key,oN(Qe.target.value,Ce.unit)),onKeyDown:Qe=>{Qe.key==="Enter"&&Qe.currentTarget.blur()}}),Ce.unit&&u.jsx("span",{children:Ce.unit})]})}),u.jsx("div",{className:"database-value",children:me.databaseValue||"—"}),u.jsx("div",{className:"field-status",children:me.status!=="unchecked"&&u.jsx("span",{className:`pill pill-${me.status}`,title:me.message,children:cN(me.status)})})]},ze)})]}),fe.length>0&&u.jsxs("section",{className:"conflict-section","aria-label":`${re.businessDate} 待确认字段`,children:[u.jsx("div",{className:"conflict-section-title",children:"待确认字段"}),fe.map(me=>{const Ce=`${me.draft.index}:${me.key}`;return u.jsxs("div",{className:"conflict-panel",children:[u.jsxs("div",{className:"conflict-message",children:[u.jsx("strong",{children:me.name}),u.jsx("span",{children:"原值与新值不同，请选择保留项。"})]}),u.jsxs("div",{className:"conflict-options",children:[u.jsxs("label",{children:[u.jsx("input",{type:"radio",name:`conflict-${Ce}`,checked:E[Ce]==="keep",onChange:()=>T(ze=>({...ze,[Ce]:"keep"}))}),u.jsxs("span",{children:[u.jsx("small",{children:"原值"}),u.jsx("strong",{children:me.databaseValue||"—"})]})]}),u.jsxs("label",{children:[u.jsx("input",{type:"radio",name:`conflict-${Ce}`,checked:E[Ce]==="use",onChange:()=>T(ze=>({...ze,[Ce]:"use"}))}),u.jsxs("span",{children:[u.jsx("small",{children:"新值"}),u.jsx("strong",{children:me.parsedValue||"—"})]})]})]})]},Ce)})]})]},re.index)})}),u.jsxs("div",{className:"review-footer",children:[u.jsx("span",{className:"review-footer-text",children:c.length>1?`本次共 ${c.length} 条消息，将整批写入 Notion。`:"确认后将把本次解析结果写入 Notion。"}),u.jsx("button",{className:"primary-button confirm-button",disabled:!ve,onClick:()=>O(),children:f==="write"?"正在入库…":"确认入库"})]})]}):u.jsxs("div",{className:"review-empty",children:[u.jsx("h2",{children:"解析结果"}),u.jsx("p",{children:"解析消息后，Notion 数据检查结果将在这里显示。"}),(V||(M==null?void 0:M.configured)===!1||M&&(!M.cutting.bound||!M.towerDaily.bound))&&u.jsx("div",{className:"pm-notice",role:"alert",children:V||((M==null?void 0:M.configured)===!1?"Notion 连接尚未配置。":"数据库已变更，请点击右上角“数据库绑定”重新选择下料和塔筒主数据库。")})]})})]})]})]}),P.length>0&&u.jsx(fN,{months:P,values:N,setValues:G,close:()=>k([]),submit:re=>{k([]),O(re)}}),F&&M&&u.jsx(Pv,{state:M,selections:ie,setSelections:ge,error:V,close:()=>ee(!1),save:ae})]})}function dN({busy:n,result:a,error:s,needsReparse:o,invalidCount:c,fieldStatuses:h}){if(n)return u.jsxs("div",{className:"match-status",role:"status","aria-live":"polite",children:[u.jsx("span",{className:"status-loader"}),u.jsx("span",{className:"match-status-copy",children:"正在检查 Notion 数据…"})]});if(o)return u.jsxs("div",{className:"match-status match-status-error",role:"alert",children:[u.jsx("span",{className:"new-record-icon",children:"!"}),u.jsx("span",{className:"match-status-copy",children:"原始消息已修改，请重新解析"})]});if(c)return u.jsxs("div",{className:"match-status match-status-error",role:"alert",children:[u.jsx("span",{className:"new-record-icon",children:"!"}),u.jsxs("span",{className:"match-status-copy",children:["本批有 ",c," 条异常，已停止检查和入库"]})]});if(s)return u.jsxs("div",{className:"match-status match-status-error",role:"alert",children:[u.jsx("span",{className:"new-record-icon",children:"!"}),u.jsxs("span",{className:"match-status-copy",children:["检查失败：",s]})]});const f=a==null?void 0:a.items.some(b=>b.status==="existing"||b.status==="conflict"),m=b=>h.includes(b),g=h.length>0&&h.every(b=>b==="same"),p=m("exception")||a&&!a.succeeded&&h.length===0?"match-status-error":m("confirm")?"match-status-warning":g?"match-status-neutral":"",v=m("exception")?"存在异常，不能入库":m("unchecked")?"字段已修改，等待检查":m("confirm")?"已找到对应记录，有字段待确认":m("new")?f||m("same")?"已找到对应记录，将补充空字段":"未找到对应记录，将新建":g?"已找到对应记录，数据一致":a&&!a.succeeded?"Notion 检查未通过":"等待检查 Notion 数据",x=!!a&&!m("exception")&&!m("confirm")&&!m("unchecked");return u.jsxs("div",{className:`match-status ${p}`,role:p==="match-status-error"?"alert":"status","aria-live":"polite",children:[x?u.jsx("span",{className:"match-check",children:u.jsx(cs,{})}):u.jsx("span",{className:"new-record-icon",children:p?"!":"+"}),u.jsx("span",{className:"match-status-copy",children:v})]})}function fN({months:n,values:a,setValues:s,close:o,submit:c}){const h=Object.fromEntries(n.map(m=>[m,Number(a[m])])),f=n.every(m=>{var g;return((g=a[m])==null?void 0:g.trim())&&Number.isFinite(h[m])&&h[m]>=0});return u.jsx("div",{className:"pm-dialog-overlay",children:u.jsxs("section",{className:"pm-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"monthly-plan-title",children:[u.jsx("h2",{id:"monthly-plan-title",children:"补充下料月计划"}),u.jsx("p",{children:"独立月计划库中没有该月份记录，请填写计划下料（吨）。"}),n.map(m=>u.jsxs("label",{children:[m,u.jsx("input",{type:"number",min:"0",value:a[m]||"",onChange:g=>s({...a,[m]:g.target.value})})]},m)),u.jsxs("div",{className:"pm-dialog-actions",children:[u.jsx("button",{onClick:o,children:"取消"}),u.jsx("button",{className:"primary-button",disabled:!f,onClick:()=>c(h),children:"创建并继续"})]})]})})}function Pv({state:n,selections:a,setSelections:s,error:o,close:c,save:h}){var x,b;const[f,m]=S.useState(((x=n.sources.find(j=>j.id===a.cutting))==null?void 0:x.businessSection)||""),[g,p]=S.useState(((b=n.sources.find(j=>j.id===a.towerDaily))==null?void 0:b.businessSection)||""),v=j=>n.usesBusinessSections?n.sources.filter(E=>E.businessSection===j):n.sources;return u.jsx("div",{className:"pm-dialog-overlay",children:u.jsxs("section",{className:"pm-dialog pm-binding-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"binding-title",children:[u.jsx("h2",{id:"binding-title",children:"数据库绑定"}),u.jsx("p",{children:"只绑定每日主数据库。月累计和年累计由软件查询计算；下料月计划库通过主库的 Relation 自动识别。"}),n.usesBusinessSections&&u.jsxs("label",{children:["下料业务板块",u.jsxs("select",{value:f,onChange:j=>{m(j.target.value),s({...a,cutting:""})},children:[u.jsx("option",{value:"",children:"不处理下料消息"}),n.businessSections.map(j=>u.jsx("option",{value:j,children:j},`cutting-business-${j}`))]})]}),u.jsxs("label",{children:["下料主数据库",u.jsxs("select",{value:a.cutting,disabled:n.usesBusinessSections&&!f,onChange:j=>s({...a,cutting:j.target.value}),children:[u.jsx("option",{value:"",children:"不处理下料消息"}),v(f).map(j=>u.jsx("option",{value:j.id,children:j.name},`cutting-${j.id}`))]})]}),n.usesBusinessSections&&u.jsxs("label",{children:["塔筒业务板块",u.jsxs("select",{value:g,onChange:j=>{p(j.target.value),s({...a,towerDaily:""})},children:[u.jsx("option",{value:"",children:"请选择业务板块"}),n.businessSections.map(j=>u.jsx("option",{value:j,children:j},`tower-business-${j}`))]})]}),u.jsxs("label",{children:["塔筒产线主数据库",u.jsxs("select",{value:a.towerDaily,disabled:n.usesBusinessSections&&!g,onChange:j=>s({...a,towerDaily:j.target.value}),children:[u.jsx("option",{value:"",children:"请选择具体数据库"}),v(g).map(j=>u.jsx("option",{value:j.id,children:j.name},`tower-${j.id}`))]})]}),o&&u.jsx("div",{className:"pm-notice",role:"alert",children:o}),u.jsxs("div",{className:"pm-dialog-actions",children:[u.jsx("button",{onClick:c,children:"取消"}),u.jsx("button",{className:"primary-button",disabled:!a.towerDaily,onClick:h,children:"保存绑定"})]})]})})}function Xv({configure:n}){return u.jsxs("header",{className:"content-header",children:[u.jsxs("div",{children:[u.jsx("h1",{children:"生产消息入库"}),u.jsx("p",{children:"解析生产消息，检查已有数据并确认入库"})]}),u.jsx("button",{type:"button",className:"template-config-button",onClick:n,children:"数据库绑定"})]})}function $v({current:n}){return u.jsx(Gb,{current:n,titles:["录入消息","解析确认","完成"],label:"生产消息入库进度"})}function hN({label:n,steps:a,currentStep:s,direction:o,transition:c,busy:h=!1}){const f=(c==null?void 0:c.phase)==="rail"||(c==null?void 0:c.phase)==="arrive"?c.target:s,m=Math.min(f,a.length-1);return u.jsxs("nav",{className:"daily-progress","aria-label":n,children:[u.jsxs("div",{className:"progress-meta",children:[u.jsx("span",{children:"当前步骤"}),u.jsxs("strong",{children:[Math.min(s+1,a.length)," / ",a.length]})]}),u.jsxs("div",{className:"progress-rail",children:[u.jsx("div",{className:"progress-segments","aria-hidden":"true",children:a.slice(1).map((g,p)=>u.jsx("span",{children:u.jsx("i",{style:{width:p<m?"100%":"0%"}})},p))}),u.jsx("ol",{className:o<0?"backward":"forward",style:{gridTemplateColumns:`repeat(${a.length}, 1fr)`},children:a.map((g,p)=>{const v=c?Math.min(c.from,a.length-1):-1,x=p<s||s===a.length,b=(c==null?void 0:c.direction)===1&&c.phase!=="arrive"&&p===v,j=(c==null?void 0:c.direction)===-1&&c.phase!=="arrive"&&p===v,E=!j&&(x||b),T=j?"idle":E?"done":p===s?`active${h?" working":""}`:"idle",A=(c==null?void 0:c.phase)==="node"&&p===v?c.direction>0?" just-completed":" just-back-leave":(c==null?void 0:c.phase)==="arrive"&&p===c.target?c.direction>0?" just-active":" just-back-active":"";return u.jsxs("li",{className:`${T}${A}`,"aria-current":p===s?"step":void 0,"aria-label":`${g}，${E?"已完成":p===s?"当前步骤":"未开始"}`,children:[u.jsx("span",{children:E?"✓":p+1}),u.jsx("strong",{children:g})]},g)})})]})]})}const Fv=n=>n.toISOString().slice(0,10);function mN(){const n=new Date,a=new Date(Date.UTC(n.getFullYear(),n.getMonth(),20)),s=new Date(Date.UTC(n.getFullYear(),n.getMonth()-1,21)),[o,c]=S.useState(),[h,f]=S.useState(Fv(s)),[m,g]=S.useState(Fv(a)),[p,v]=S.useState({sourceRoot:"",outputRoot:"",reportUrl:"",username:"",password:""}),[x,b]=S.useState(),[j,E]=S.useState(""),[T,A]=S.useState(""),[R,M]=S.useState(),[_,V]=S.useState(),L=m?`${Number(m.slice(5,7))} 月`:"—",P=S.useMemo(()=>{const oe=Date.parse(`${h}T00:00:00Z`),U=Date.parse(`${m}T00:00:00Z`);return Number.isFinite(oe)&&Number.isFinite(U)&&U>=oe?Math.floor((U-oe)/864e5)+1:0},[h,m]),k=oe=>{c(oe),v(U=>({sourceRoot:oe.sourceRoot,outputRoot:oe.outputRoot,reportUrl:oe.reportUrl,username:oe.username,password:U.password}))},N=()=>be("report.getState").then(k).catch(oe=>E(oe.message));S.useEffect(()=>{N()},[]);const G=async()=>{b("save"),E(""),A("");try{const oe=await be("report.saveConfig",p);k(oe),v(U=>({...U,password:""})),A("配置已保存，请验证登录。")}catch(oe){E(oe instanceof Error?oe.message:"配置保存失败")}finally{b(void 0)}},F=async()=>{b("auth"),E(""),A("");try{await be("report.authenticate",void 0,600*1e3),await N(),A("登录验证通过。")}catch(oe){E(oe instanceof Error?oe.message:"登录验证失败")}finally{b(void 0)}},ee=async()=>{b("run"),E(""),A(""),M(void 0),V({stage:"prepare",current:0,total:P,message:"正在准备任务"});try{M(await be("report.run",{startDate:h,endDate:m},1800*1e3,oe=>V(oe)))}catch(oe){E(oe instanceof Error?oe.message:"任务执行失败")}finally{b(void 0)}},ie=["准备报表","导出日报","解析数据","生成汇总","完成"],ge=_?{prepare:0,collect:1,parse:2,summary:3,complete:5}[_.stage]:0,ce=_!=null&&_.total?Math.round(_.current/_.total*100):0;return u.jsxs("div",{className:"page report-center-page",children:[u.jsxs("header",{children:[u.jsxs("div",{children:[u.jsx("h1",{children:"文件统计汇总"}),u.jsx("p",{children:"手动选择统计日期，自动采集加工日报并生成设备实开台时汇总。"})]}),u.jsxs("span",{className:`report-auth ${o!=null&&o.authenticated?"ready":""}`,children:[o!=null&&o.authenticated?u.jsx(pv,{}):u.jsx(Vd,{}),o!=null&&o.authenticated?"登录可用":"待验证登录"]})]}),u.jsxs("section",{className:"report-workspace",children:[u.jsxs("div",{className:"report-period",children:[u.jsxs("div",{className:"report-section-title",children:[u.jsx(Ux,{}),u.jsxs("div",{children:[u.jsx("h2",{children:"选择统计范围"}),u.jsx("p",{children:"汇总月份自动取结束日期所在月份"})]})]}),u.jsxs("div",{className:"report-fields",children:[u.jsxs("label",{children:["开始日期",u.jsx(Zi,{value:h,onChange:f})]}),u.jsxs("label",{children:["结束日期",u.jsx(Zi,{value:m,onChange:g})]})]}),u.jsxs("div",{className:"report-period-preview",children:[u.jsxs("div",{children:[u.jsx("span",{children:"统计范围"}),u.jsxs("strong",{children:[h||"—"," ～ ",m||"—"]})]}),u.jsxs("div",{children:[u.jsx("span",{children:"汇总月份"}),u.jsx("strong",{children:L})]}),u.jsxs("div",{children:[u.jsx("span",{children:"日报数量"}),u.jsxs("strong",{children:[P||"—"," 天"]})]})]}),(x==="run"||_)&&u.jsxs("div",{className:"report-run-progress","aria-live":"polite",children:[u.jsx(hN,{label:"报表任务进度",steps:ie,currentStep:ge,direction:1,busy:x==="run"}),u.jsxs("div",{className:"report-progress-detail",children:[u.jsx("span",{children:(_==null?void 0:_.message)||"正在准备任务"}),u.jsx("strong",{children:_!=null&&_.total?`${_.current}/${_.total}`:"准备中"})]}),u.jsx("div",{className:"report-progress-bar",role:"progressbar","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":ce,children:u.jsx("i",{style:{width:`${ce}%`}})})]}),u.jsxs("div",{className:"report-actions",children:[u.jsxs("button",{className:"secondary",disabled:!!x||!(o!=null&&o.credentialsConfigured),onClick:F,children:[u.jsx(VC,{}),x==="auth"?"正在验证登录…":"验证登录"]}),u.jsxs("button",{className:"primary",disabled:!!x||!(o!=null&&o.authenticated)||P===0,onClick:ee,children:[u.jsx(Yx,{}),x==="run"?"正在导出并汇总…":"开始运行"]})]}),u.jsx("p",{className:"report-note",children:"Playwright 在后台运行。测试阶段已有原始日报会重新导出并覆盖。"})]}),u.jsxs("div",{className:"report-side",children:[u.jsx("h2",{children:"输出位置"}),u.jsxs("div",{className:"report-path",children:[u.jsx(gv,{}),u.jsx("span",{children:(o==null?void 0:o.outputRoot)||"正在读取配置…"})]}),u.jsxs("dl",{children:[u.jsxs("div",{children:[u.jsx("dt",{children:"原始日报"}),u.jsxs("dd",{children:[(o==null?void 0:o.sourceRoot)||"—"," · 按年份、月份归档"]})]}),u.jsxs("div",{children:[u.jsx("dt",{children:"汇总文件"}),u.jsx("dd",{children:"按结束日期所在月份归档"})]}),u.jsxs("div",{children:[u.jsx("dt",{children:"本次月份"}),u.jsx("dd",{children:L})]})]})]})]}),u.jsxs("section",{className:"report-config",children:[u.jsxs("div",{className:"report-section-title",children:[u.jsx(YC,{}),u.jsxs("div",{children:[u.jsx("h2",{children:"报表配置"}),u.jsx("p",{children:"保存后登录状态会失效，需要重新验证一次"})]})]}),u.jsxs("div",{className:"report-config-grid",children:[u.jsxs("label",{children:[u.jsxs("span",{children:[u.jsx(_C,{}),"源文件位置"]}),u.jsx("input",{value:p.sourceRoot,onChange:oe=>v({...p,sourceRoot:oe.target.value}),placeholder:"原始日报保存根目录"})]}),u.jsxs("label",{children:[u.jsxs("span",{children:[u.jsx(gv,{}),"输出位置"]}),u.jsx("input",{value:p.outputRoot,onChange:oe=>v({...p,outputRoot:oe.target.value}),placeholder:"汇总文件保存根目录"})]}),u.jsxs("label",{className:"wide",children:[u.jsxs("span",{children:[u.jsx(kC,{}),"报表网页"]}),u.jsx("input",{type:"url",value:p.reportUrl,onChange:oe=>v({...p,reportUrl:oe.target.value}),placeholder:"https://…"})]}),u.jsxs("label",{children:[u.jsxs("span",{children:[u.jsx(FC,{}),"账号"]}),u.jsx("input",{autoComplete:"username",value:p.username,onChange:oe=>v({...p,username:oe.target.value})})]}),u.jsxs("label",{children:[u.jsxs("span",{children:[u.jsx(BC,{}),"密码"]}),u.jsx("input",{type:"password",autoComplete:"new-password",value:p.password,onChange:oe=>v({...p,password:oe.target.value}),placeholder:o!=null&&o.credentialsConfigured?"已保存，留空表示不修改":"请输入密码"})]})]}),u.jsxs("div",{className:"report-config-footer",children:[u.jsx("p",{children:"账号和密码使用 Windows 本机加密保存，不写入 YAML，也不会回传显示密码。"}),u.jsxs("button",{className:"primary",disabled:!!x,onClick:G,children:[u.jsx(qC,{}),x==="save"?"正在保存…":"保存配置"]})]})]}),j&&u.jsxs("div",{className:"report-message error",role:"alert",children:[u.jsx(Vd,{}),u.jsxs("div",{children:[u.jsx("strong",{children:"操作未完成"}),u.jsx("span",{children:j})]})]}),T&&u.jsxs("div",{className:"report-message success",role:"status",children:[u.jsx(pv,{}),u.jsxs("div",{children:[u.jsx("strong",{children:"操作成功"}),u.jsx("span",{children:T})]})]}),R&&u.jsxs("section",{className:"report-result",children:[u.jsxs("div",{className:"report-section-title",children:[u.jsx(OC,{}),u.jsxs("div",{children:[u.jsxs("h2",{children:[L,"汇总已完成"]}),u.jsxs("p",{children:[R.period.startDate," ～ ",R.period.endDate]})]})]}),u.jsxs("div",{className:"report-stats",children:[u.jsxs("span",{children:[u.jsxs("strong",{children:[R.parsedReports,"/",R.plannedReports]}),"日报完整"]}),u.jsxs("span",{children:[u.jsx("strong",{children:R.deviceCount}),"台设备"]}),u.jsxs("span",{children:[u.jsxs("strong",{children:[R.actualDataPoints,"/",R.expectedDataPoints]}),"数据点"]})]}),u.jsxs("div",{className:"report-output",children:[u.jsx("span",{children:"汇总文件"}),u.jsx("strong",{children:R.summaryPath})]}),R.warnings.length>0&&u.jsxs("p",{className:"report-warning",children:[R.warnings.length," 份日报使用了已有归档文件。"]})]})]})}const Qd="••••••••••••",Kv=[{key:"connection",label:"连接",keywords:"Notion API 令牌 根页面 数据源",icon:u.jsx(wN,{})},{key:"notification",label:"通知",keywords:"钉钉 Webhook Secret 规则",icon:u.jsx(jN,{})},{key:"data",label:"数据与缓存",keywords:"Notion 数据源 缓存 绑定",icon:u.jsx(EN,{})},{key:"about",label:"关于",keywords:"版本 WebView2 React TypeScript",icon:u.jsx(TN,{})}];function pN({open:n,onClose:a}){const[s,o]=S.useState("connection"),[c,h]=S.useState(""),[f,m]=S.useState(null),[g,p]=S.useState(""),[v,x]=S.useState(""),[b,j]=S.useState(""),E=S.useRef(null),T=S.useRef(null);S.useEffect(()=>{if(!n)return;T.current=document.activeElement instanceof HTMLElement?document.activeElement:null,j("settings.open"),x(""),be("settings.open").then(_=>m(_)).catch(_=>x(_ instanceof Error?_.message:"设置加载失败，请重试。")).finally(()=>j("")),window.setTimeout(()=>{var _;return(_=E.current)==null?void 0:_.focus()},0);const M=_=>{_.key==="Escape"&&a()};return window.addEventListener("keydown",M),()=>{var _;window.removeEventListener("keydown",M),(_=T.current)==null||_.focus()}},[n,a]),S.useEffect(()=>{if(!g)return;const M=window.setTimeout(()=>p(""),3e3);return()=>window.clearTimeout(M)},[g]);const A=async(M,_)=>{j(M),x(""),p("");try{const V=await be(M,_,6e4);return(M==="settings.refreshDataSources"||M==="settings.saveConnection")&&aA(!0),m(V.state),p(V.message),!0}catch(V){return x(V instanceof Error?V.message:"操作未完成，请重试。"),!1}finally{j("")}},R=S.useMemo(()=>{const M=c.trim().toLocaleLowerCase("zh-CN");return M?Kv.filter(_=>`${_.label} ${_.keywords}`.toLocaleLowerCase("zh-CN").includes(M)):Kv},[c]);return n?u.jsx("div",{className:"settings-overlay",onMouseDown:M=>{M.target===M.currentTarget&&a()},children:u.jsxs("div",{className:"settings-window",role:"dialog","aria-modal":"true","aria-label":"设置",children:[u.jsxs("aside",{className:"settings-sidebar",children:[u.jsxs("label",{className:"settings-search",children:[u.jsx(SN,{}),u.jsx("input",{value:c,onChange:M=>h(M.target.value),placeholder:"搜索设置","aria-label":"搜索设置"})]}),u.jsx("div",{className:"settings-sidebar-title",children:"设置"}),u.jsxs("nav",{className:"settings-nav","aria-label":"设置分类",children:[R.map(M=>u.jsxs("button",{type:"button",className:s===M.key?"settings-nav-item active":"settings-nav-item","aria-current":s===M.key?"page":void 0,onClick:()=>o(M.key),children:[u.jsx("span",{className:"settings-nav-icon",children:M.icon}),u.jsx("span",{children:M.label})]},M.key)),R.length===0&&u.jsx("p",{className:"settings-empty-search",children:"没有匹配的设置"})]})]}),u.jsxs("main",{className:"settings-main",children:[u.jsx("button",{ref:E,type:"button",className:"settings-close",onClick:a,"aria-label":"关闭设置",children:u.jsx(CN,{})}),u.jsxs("div",{className:"settings-content",children:[b==="settings.open"&&!f?u.jsx("div",{className:"settings-loading",children:"正在读取本机设置…"}):u.jsxs(u.Fragment,{children:[s==="connection"&&f&&u.jsx(gN,{state:f,busy:b,run:A}),s==="notification"&&f&&u.jsx(yN,{state:f,busy:b,run:A}),s==="data"&&f&&u.jsx(vN,{state:f,busy:b,run:A}),s==="about"&&f&&u.jsx(xN,{state:f})]}),(g||v)&&u.jsx("div",{className:`settings-message ${v?"error":""}`,role:"status","aria-live":"polite",children:v||g})]})]})]})}):null}function gN({state:n,busy:a,run:s}){const[o,c]=S.useState(""),[h,f]=S.useState(!1),[m,g]=S.useState(n.notion.rootPageId);S.useEffect(()=>g(n.notion.rootPageId),[n.notion.rootPageId]);const p=async b=>{await s(b,{token:h?o:"",rootPageId:m})&&(c(""),f(!1))},v=a==="settings.refreshDataSources",x=a==="settings.saveConnection";return u.jsxs(xl,{title:"连接",description:"管理生产助手使用的外部数据源和服务连接。",children:[u.jsxs(Pr,{title:"Notion",children:[u.jsx(Ut,{title:"连接状态",description:"当前本机连接配置和数据源缓存状态",children:u.jsx(Xb,{connected:n.notion.configured,label:n.notion.configured?"已配置":"未配置"})}),u.jsx(Qi,{title:"API 令牌",description:"使用 Windows 当前用户加密后保存在本机",children:u.jsx("input",{className:"settings-input",type:"password",autoComplete:"off",placeholder:"输入 Notion API Token",value:h?o:n.notion.configured?Qd:"",onFocus:b=>{!h&&n.notion.configured&&b.currentTarget.select()},onChange:b=>{f(!0),c(b.target.value)}})}),u.jsx(Qi,{title:"根页面 ID",description:"可选。留空时自动发现当前令牌有权限访问的数据源",children:u.jsx("input",{className:"settings-input",value:m,onChange:b=>g(b.target.value)})}),u.jsxs("div",{className:"settings-buttons",children:[u.jsxs("button",{type:"button",className:"settings-button-primary",disabled:!!a,onClick:()=>p("settings.saveConnection"),children:[x&&u.jsx(rs,{})," ",x?"正在连接…":"保存并连接"]}),u.jsxs("button",{type:"button",className:"settings-button-secondary",disabled:!!a,onClick:()=>p("settings.refreshDataSources"),children:[v&&u.jsx(rs,{})," ",v?"正在刷新…":"刷新数据源"]})]})]}),u.jsxs(Pr,{title:"数据源",children:[u.jsx(Ut,{title:"已发现数据源",description:"最近一次从 Notion 获取的数据源",children:u.jsxs("span",{className:"settings-value",children:[n.notion.dataSourceCount," 个"]})}),u.jsx(Ut,{title:"上次同步",description:"数据源元信息最后更新时间",children:u.jsx("span",{className:"settings-value",children:n.notion.lastSyncedAt||"尚未同步"})})]})]})}function yN({state:n,busy:a,run:s}){const o=n.notification,[c,h]=S.useState(o.enabled),[f,m]=S.useState(o.channelName),[g,p]=S.useState(""),[v,x]=S.useState(""),[b,j]=S.useState(!1),[E,T]=S.useState(!1),[A,R]=S.useState(o.rules);S.useEffect(()=>{h(o.enabled),m(o.channelName),R(o.rules)},[o]);const M={enabled:c,channelName:f,webhook:b?g:"",secret:E?v:""},_=async P=>{await s(P,M)&&(p(""),x(""),j(!1),T(!1))},V=a==="settings.saveNotification",L=a==="settings.testNotification";return u.jsxs(xl,{title:"通知",description:"配置生产助手全局通知使用的技术通道。业务模块只决定何时通知。",children:[u.jsxs(Pr,{title:"通知服务",children:[u.jsx(Ut,{title:"启用通知",description:"关闭后所有业务模块都不会向外发送通知",children:u.jsx(Zv,{checked:c,onChange:h,label:"启用通知"})}),u.jsx(Ut,{title:"发送方式",description:"当前使用的全局通知技术通道",children:u.jsx("span",{className:"settings-value",children:"钉钉机器人 Webhook"})}),u.jsx(Ut,{title:"连接状态",description:o.checkedAt?`上次测试 ${o.checkedAt}`:"尚未发送测试通知",children:u.jsx(Xb,{connected:o.connected,label:o.connected===!0?"连接正常":o.connected===!1?"连接失败":"待测试"})})]}),u.jsxs(Pr,{title:"钉钉机器人",children:[u.jsx(Qi,{title:"Webhook URL",description:"使用 Windows 当前用户加密后保存在本机",children:u.jsx("input",{className:"settings-input",type:"password",autoComplete:"off",placeholder:"https://oapi.dingtalk.com/robot/send?...",value:b?g:o.webhookConfigured?Qd:"",onFocus:P=>{!b&&o.webhookConfigured&&P.currentTarget.select()},onChange:P=>{j(!0),p(P.target.value)}})}),u.jsx(Qi,{title:"加签密钥",description:"钉钉机器人 Secret，使用 Windows 当前用户加密保存",children:u.jsx("input",{className:"settings-input",type:"password",autoComplete:"off",placeholder:"SEC...",value:E?v:o.secretConfigured?Qd:"",onFocus:P=>{!E&&o.secretConfigured&&P.currentTarget.select()},onChange:P=>{T(!0),x(P.target.value)}})}),u.jsx(Qi,{title:"默认接收群",description:"用于识别当前通知渠道",children:u.jsx("input",{className:"settings-input",value:f,onChange:P=>m(P.target.value),placeholder:"生产管理群"})}),u.jsxs("div",{className:"settings-buttons",children:[u.jsxs("button",{type:"button",className:"settings-button-primary",disabled:!!a,onClick:()=>_("settings.saveNotification"),children:[V&&u.jsx(rs,{})," ",V?"正在保存…":"保存设置"]}),u.jsxs("button",{type:"button",className:"settings-button-secondary",disabled:!!a,onClick:()=>_("settings.testNotification"),children:[L&&u.jsx(rs,{})," ",L?"正在发送…":"发送测试"]})]}),o.status&&u.jsx("p",{className:"settings-inline-status",children:o.status})]}),u.jsxs(Pr,{title:"通知规则",children:[u.jsx("div",{className:"settings-rule-list",children:A.map(P=>u.jsx(Ut,{title:P.name,description:`钉钉 · ${bN(P.level)}`,children:u.jsx(Zv,{checked:P.enabled,label:`通知规则：${P.name}`,onChange:k=>R(N=>N.map(G=>G.eventType===P.eventType?{...G,enabled:k}:G))})},P.eventType))}),u.jsx("div",{className:"settings-buttons settings-buttons-end",children:u.jsx("button",{type:"button",className:"settings-button-primary",disabled:!!a,onClick:()=>s("settings.saveNotificationRules",{rules:A}),children:"保存通知规则"})})]})]})}function vN({state:n,busy:a,run:s}){return u.jsx(xl,{title:"数据与缓存",description:"查看和维护生产助手保存在本机的 Notion 数据源缓存。",children:u.jsxs(Pr,{title:"本地数据",children:[u.jsx(Ut,{title:"Notion 数据源缓存",description:"用于减少重复的网络请求",children:u.jsxs("div",{className:"settings-inline-actions",children:[u.jsxs("span",{className:"settings-value",children:[n.notion.dataSourceCount," 个"]}),u.jsxs("button",{type:"button",className:"settings-text-button",disabled:!!a,onClick:()=>s("settings.refreshDataSources"),children:[a==="settings.refreshDataSources"&&u.jsx(rs,{})," ",a==="settings.refreshDataSources"?"刷新中…":"刷新"]})]})}),u.jsx(Ut,{title:"上次同步",description:"数据源元信息最后更新时间",children:u.jsx("span",{className:"settings-value",children:n.notion.lastSyncedAt||"尚未同步"})})]})})}function xN({state:n}){return u.jsx(xl,{title:"关于",description:"生产助手的版本和运行环境信息。",children:u.jsxs(Pr,{title:"生产助手",children:[u.jsx(Ut,{title:"版本",description:"当前安装版本",children:u.jsx("span",{className:"settings-value",children:n.version})}),u.jsx(Ut,{title:"桌面环境",description:"应用运行容器",children:u.jsx("span",{className:"settings-value",children:"WinUI 3 + WebView2"})}),u.jsx(Ut,{title:"前端",description:"用户界面技术栈",children:u.jsx("span",{className:"settings-value",children:"React + TypeScript"})}),u.jsx(Ut,{title:"本地数据保护",description:"令牌和通知凭据仅保存在本机",children:u.jsx("span",{className:"settings-value",children:"Windows 当前用户加密"})})]})})}function xl({title:n,description:a,children:s}){return u.jsxs("div",{className:"settings-page",children:[u.jsxs("header",{className:"settings-page-header",children:[u.jsx("h1",{children:n}),u.jsx("p",{children:a})]}),s]})}function Pr({title:n,children:a}){return u.jsxs("section",{className:"settings-section",children:[u.jsx("h2",{children:n}),u.jsx("div",{className:"settings-section-body",children:a})]})}function Ut({title:n,description:a,children:s}){return u.jsxs("div",{className:"settings-row",children:[u.jsxs("div",{className:"settings-row-text",children:[u.jsx("div",{className:"settings-row-title",children:n}),a&&u.jsx("div",{className:"settings-row-description",children:a})]}),u.jsx("div",{className:"settings-row-control",children:s})]})}function Qi({title:n,description:a,children:s}){return u.jsxs("label",{className:"settings-field",children:[u.jsx("span",{className:"settings-field-title",children:n}),a&&u.jsx("span",{className:"settings-field-description",children:a}),u.jsx("span",{className:"settings-field-control",children:s})]})}function Zv({checked:n,onChange:a,label:s}){return u.jsx("button",{type:"button",role:"switch","aria-checked":n,"aria-label":s,className:n?"settings-switch checked":"settings-switch",onClick:()=>a(!n),children:u.jsx("span",{})})}function Xb({connected:n,label:a}){return u.jsxs("div",{className:`settings-connected ${n===!1?"error":n===null?"pending":""}`,children:[u.jsx("span",{className:"settings-status-dot"}),a]})}function rs(){return u.jsx("span",{className:"settings-spinner","aria-hidden":"true"})}const bN=n=>n==="warning"?"警告":n==="info"?"信息":"错误";function SN(){return u.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[u.jsx("circle",{cx:"11",cy:"11",r:"6.5"}),u.jsx("path",{d:"m16 16 4 4"})]})}function wN(){return u.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[u.jsx("path",{d:"M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"}),u.jsx("path",{d:"M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1"})]})}function jN(){return u.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[u.jsx("path",{d:"M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"}),u.jsx("path",{d:"M10 21h4"})]})}function EN(){return u.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[u.jsx("ellipse",{cx:"12",cy:"5",rx:"7",ry:"3"}),u.jsx("path",{d:"M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5"}),u.jsx("path",{d:"M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"})]})}function TN(){return u.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[u.jsx("circle",{cx:"12",cy:"12",r:"9"}),u.jsx("path",{d:"M12 11v6"}),u.jsx("path",{d:"M12 7h.01"})]})}function CN(){return u.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[u.jsx("path",{d:"m6 6 12 12"}),u.jsx("path",{d:"m18 6-12 12"})]})}const dd=new Date().toISOString().slice(0,10);function AN(){const[n,a]=S.useState(""),[s,o]=S.useState(!1),[c,h]=S.useState([]),[f,m]=S.useState(""),[g,p]=S.useState([]),[v,x]=S.useState(""),[b,j]=S.useState([]),[E,T]=S.useState(""),[A,R]=S.useState([]),[M,_]=S.useState(""),[V,L]=S.useState(""),[P,k]=S.useState("day"),[N,G]=S.useState(dd),[F,ee]=S.useState(dd),[ie,ge]=S.useState(dd),[ce,oe]=S.useState("load"),[U,ae]=S.useState(""),[se,$]=S.useState();S.useEffect(()=>{be("database.getState").then(I=>{a(I.provider),o(I.usesBusinessSections),h(I.businessSections),p(I.sources)}).catch(I=>ae(I instanceof Error?I.message:String(I))).finally(()=>oe(""))},[]);const ne=async I=>{var me,Ce,ze,Qe;if(x(I),T(""),_(""),L(""),j([]),R([]),$(void 0),ae(""),!!I){oe("schema");try{const $e=await be("database.getSchema",{sourceId:I});R($e.fields),j($e.datasets),_(((me=$e.fields.find(yt=>yt.type==="date"))==null?void 0:me.id)||""),L(((Ce=$e.fields.find(yt=>yt.type==="number"))==null?void 0:Ce.id)||""),T(((ze=$e.datasets.find(yt=>yt.name==="本年截止今日"))==null?void 0:ze.id)||((Qe=$e.datasets[0])==null?void 0:Qe.id)||"")}catch($e){ae($e instanceof Error?$e.message:String($e))}finally{oe("")}}},C=async()=>{oe("query"),ae(""),$(void 0);try{$(await be("database.inspect",{sourceId:v,datasetId:E,dateFieldId:ve?M:"",valueFieldId:ve?V:"",rangeKind:ve?P:"all",businessDate:N,startDate:F,endDate:ie},12e4))}catch(I){ae(I instanceof Error?I.message:String(I))}finally{oe("")}},O=A.filter(I=>I.type==="date"),J=s?g.filter(I=>I.businessSection===f):g,te=A.filter(I=>I.type==="number"),le=A.find(I=>I.id===V),de=b.find(I=>I.id===E),ve=(de==null?void 0:de.name.trim())==="本年截止今日",re=S.useMemo(()=>{const I=new Set([M,V]);return[...A.filter(me=>I.has(me.id)),...A.filter(me=>!I.has(me.id))]},[A,M,V]),Q=P==="week"||P==="custom",fe=v&&E&&(!ve||M&&(!Q||F&&ie));return u.jsxs("div",{className:"page database-viewer-page",children:[u.jsxs("header",{children:[u.jsxs("div",{children:[u.jsx("h1",{children:"数据库查看"}),u.jsx("p",{children:"按当前适配器提供的目录选择数据库并查看真实 View；目录层级不会由界面写死。"})]}),u.jsxs("span",{className:"database-provider",children:[u.jsx(Bd,{}),"当前适配器：",n||"读取中"]})]}),u.jsxs("section",{className:"database-query-panel",children:[u.jsxs("div",{className:"database-query-heading",children:[u.jsx("h2",{children:"查询条件"}),u.jsx("p",{children:"普通 View 读取其完整结果；只有“本年截止今日”可在返回记录内计算日期口径。"})]}),u.jsxs("div",{className:"database-query-grid",children:[s&&u.jsxs("label",{children:["业务板块",u.jsx(hr,{value:f,placeholder:ce==="load"?"正在读取业务板块…":"请选择业务板块",disabled:!!ce,options:c.map(I=>({value:I,label:I})),onChange:I=>{m(I),ne("")}})]}),u.jsxs("label",{children:["数据库",u.jsx(hr,{value:v,placeholder:"请选择具体数据库",disabled:s&&!f||!!ce,options:J.map(I=>({value:I.id,label:I.name})),onChange:ne})]}),u.jsxs("label",{children:["View",u.jsx(hr,{value:E,placeholder:ce==="schema"?"正在读取 View…":"请选择 View",disabled:!v||!!ce,options:b.map(I=>({value:I.id,label:I.name})),onChange:I=>{T(I),$(void 0)}})]}),ve&&u.jsxs(u.Fragment,{children:[u.jsxs("label",{children:["日期字段",u.jsx(hr,{value:M,placeholder:"请选择日期字段",disabled:!A.length||!!ce,options:O.map(I=>({value:I.id,label:I.name})),onChange:_})]}),u.jsxs("label",{children:["累计字段",u.jsx(hr,{value:V,placeholder:"可选择数值字段",disabled:!A.length||!!ce,options:te.map(I=>({value:I.id,label:I.name})),onChange:L})]}),u.jsxs("label",{children:["软件查询口径",u.jsx(hr,{value:P,placeholder:"请选择日期口径",disabled:!!ce,options:[{value:"day",label:"指定日期"},{value:"week",label:"指定日期范围"},{value:"month",label:"月初至指定日期"},{value:"year",label:"年初至指定日期"}],onChange:I=>{k(I),$(void 0)}})]}),!Q&&u.jsxs("label",{children:["指定日期",u.jsx(Zi,{value:N,onChange:G})]}),Q&&u.jsxs(u.Fragment,{children:[u.jsxs("label",{children:["开始日期",u.jsx(Zi,{value:F,onChange:ee})]}),u.jsxs("label",{children:["结束日期",u.jsx(Zi,{value:ie,onChange:ge})]})]})]})]}),u.jsx("div",{className:"database-query-actions",children:u.jsxs("button",{className:"primary",disabled:!fe||!!ce,onClick:C,children:[ce==="query"?u.jsx(gl,{className:"spin"}):u.jsx(Yx,{}),ce==="query"?"正在查询…":"执行查询"]})})]}),U&&u.jsxs("div",{className:"notice error",role:"alert",children:[u.jsx(Vd,{}),u.jsxs("div",{children:[u.jsx("strong",{children:"查询失败"}),u.jsx("span",{children:U})]})]}),se?u.jsxs("section",{className:"database-result",children:[u.jsxs("div",{className:"database-result-head",children:[u.jsxs("div",{children:[u.jsxs("h2",{children:[se.sourceName," · ",se.datasetName]}),u.jsx("p",{children:ve?`${se.startDate} ～ ${se.endDate}`:"完整 View 结果"})]}),u.jsxs("dl",{children:[u.jsxs("div",{children:[u.jsxs("dt",{children:[u.jsx(HC,{}),"命中记录"]}),u.jsx("dd",{children:se.recordCount})]}),ve&&u.jsxs("div",{children:[u.jsxs("dt",{children:[u.jsx(GC,{}),(le==null?void 0:le.name)||"累计值"]}),u.jsx("dd",{children:se.total??"—"})]})]})]}),u.jsx("div",{className:"database-table-wrap",children:u.jsxs("table",{children:[u.jsx("thead",{children:u.jsx("tr",{children:re.map(I=>u.jsxs("th",{children:[I.name,u.jsx("small",{children:I.type})]},I.id))})}),u.jsx("tbody",{children:se.records.map(I=>u.jsx("tr",{children:re.map(me=>u.jsx("td",{children:DN(I.values[me.id])},me.id))},I.id))})]})}),se.truncated&&u.jsx("p",{className:"database-truncated",children:"结果仅展示前 200 条，命中数量和累计值按全部记录计算。"})]}):!ce&&!U&&u.jsxs("section",{className:"database-empty",children:[u.jsx(Bd,{}),u.jsx("h2",{children:s?"选择业务板块、数据库和 View 后执行查询":"选择数据库和 View 后执行查询"}),u.jsx("p",{children:"普通 View 显示完整结果；“本年截止今日”可进一步选择日期口径。所有操作均为只读。"})]})]})}function DN(n){return n==null||n===""?"—":typeof n=="boolean"?n?"是":"否":typeof n=="number"?n.toLocaleString("zh-CN",{maximumFractionDigits:2}):String(n)}function NN(){const[n,a]=S.useState(()=>window.location.search),[s,o]=S.useState(!1);S.useEffect(()=>{const j=()=>a(window.location.search);return window.addEventListener("popstate",j),()=>window.removeEventListener("popstate",j)},[]);const c=new URLSearchParams(n),h=c.get("route"),f=h!=null&&h.startsWith("navigation:")||h==="daily-weld"||h==="production-message"||h==="database-viewer"||h==="daily-report"||h==="report-center"?h:"production-message",m=c.get("navigation")||"",g=Bx();S.useEffect(()=>{EC(f,m)},[f,m]);const p=j=>be("app.navigateNative",{tag:j}).catch(()=>{}),v=f.startsWith("navigation:")?f.slice(11):f,x=f.startsWith("navigation:");S.useEffect(()=>(document.body.classList.toggle("settings-over-native",x&&s),()=>document.body.classList.remove("settings-over-native")),[x,s]);const b=()=>{o(!1),window.dispatchEvent(new Event("production-settings-updated")),be("settings.close").catch(()=>{})};return u.jsxs("div",{className:`desktop-shell ${x&&s?"settings-over-native":""}`,children:[u.jsx("div",{className:"production-message-demo desktop-shell-navigation",children:u.jsx(rN,{active:v,navigate:p,openSettings:()=>o(!0)})}),u.jsx("div",{className:`desktop-shell-content ${x?"desktop-shell-content-native":""}`,children:x?u.jsx("div",{className:"native-content-slot","aria-hidden":"true"}):f==="production-message"||f==="daily-weld"?u.jsx("div",{className:"production-message-demo production-message-content",children:f==="daily-weld"?u.jsx(eN,{openSettings:()=>o(!0)}):u.jsx(uN,{})}):u.jsx("div",{className:"app-shell",children:u.jsx("main",{children:u.jsx(hT,{mode:"wait",children:u.jsx(Mf.div,{initial:g?!1:{opacity:0,y:8},animate:{opacity:1,y:0},exit:g?void 0:{opacity:0,y:-6},transition:{duration:.2},children:f==="database-viewer"?u.jsx(AN,{}):f==="daily-report"?u.jsx(ZD,{openSettings:()=>o(!0)}):u.jsx(mN,{})},f)})})})}),u.jsx(pN,{open:s,onClose:b})]})}j2.createRoot(document.getElementById("root")).render(u.jsx(Wv.StrictMode,{children:u.jsx(NN,{})}));
