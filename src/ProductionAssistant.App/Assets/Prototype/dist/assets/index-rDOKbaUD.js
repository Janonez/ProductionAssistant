function wj(n,a){for(var s=0;s<a.length;s++){const l=a[s];if(typeof l!="string"&&!Array.isArray(l)){for(const c in l)if(c!=="default"&&!(c in n)){const h=Object.getOwnPropertyDescriptor(l,c);h&&Object.defineProperty(n,c,h.get?h:{enumerable:!0,get:()=>l[c]})}}}return Object.freeze(Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}))}(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))l(c);new MutationObserver(c=>{for(const h of c)if(h.type==="childList")for(const d of h.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&l(d)}).observe(document,{childList:!0,subtree:!0});function s(c){const h={};return c.integrity&&(h.integrity=c.integrity),c.referrerPolicy&&(h.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?h.credentials="include":c.crossOrigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function l(c){if(c.ep)return;c.ep=!0;const h=s(c);fetch(c.href,h)}})();function cx(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var Fu={exports:{}},qi={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ny;function Ej(){if(ny)return qi;ny=1;var n=Symbol.for("react.transitional.element"),a=Symbol.for("react.fragment");function s(l,c,h){var d=null;if(h!==void 0&&(d=""+h),c.key!==void 0&&(d=""+c.key),"key"in c){h={};for(var m in c)m!=="key"&&(h[m]=c[m])}else h=c;return c=h.ref,{$$typeof:n,type:l,key:d,ref:c!==void 0?c:null,props:h}}return qi.Fragment=a,qi.jsx=s,qi.jsxs=s,qi}var ry;function Tj(){return ry||(ry=1,Fu.exports=Ej()),Fu.exports}var o=Tj(),Xu={exports:{}},we={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ay;function Cj(){if(ay)return we;ay=1;var n=Symbol.for("react.transitional.element"),a=Symbol.for("react.portal"),s=Symbol.for("react.fragment"),l=Symbol.for("react.strict_mode"),c=Symbol.for("react.profiler"),h=Symbol.for("react.consumer"),d=Symbol.for("react.context"),m=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),g=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),x=Symbol.for("react.activity"),b=Symbol.iterator;function E(T){return T===null||typeof T!="object"?null:(T=b&&T[b]||T["@@iterator"],typeof T=="function"?T:null)}var w={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},N=Object.assign,C={};function A(T,_,re){this.props=T,this.context=_,this.refs=C,this.updater=re||w}A.prototype.isReactComponent={},A.prototype.setState=function(T,_){if(typeof T!="object"&&typeof T!="function"&&T!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,T,_,"setState")},A.prototype.forceUpdate=function(T){this.updater.enqueueForceUpdate(this,T,"forceUpdate")};function k(){}k.prototype=A.prototype;function V(T,_,re){this.props=T,this.context=_,this.refs=C,this.updater=re||w}var z=V.prototype=new k;z.constructor=V,N(z,A.prototype),z.isPureReactComponent=!0;var L=Array.isArray;function U(){}var D={H:null,A:null,T:null,S:null},q=Object.prototype.hasOwnProperty;function M(T,_,re){var le=re.ref;return{$$typeof:n,type:T,key:_,ref:le!==void 0?le:null,props:re}}function O(T,_){return M(T.type,_,T.props)}function $(T){return typeof T=="object"&&T!==null&&T.$$typeof===n}function Z(T){var _={"=":"=0",":":"=2"};return"$"+T.replace(/[=:]/g,function(re){return _[re]})}var oe=/\/+/g;function ue(T,_){return typeof T=="object"&&T!==null&&T.key!=null?Z(""+T.key):_.toString(36)}function ye(T){switch(T.status){case"fulfilled":return T.value;case"rejected":throw T.reason;default:switch(typeof T.status=="string"?T.then(U,U):(T.status="pending",T.then(function(_){T.status==="pending"&&(T.status="fulfilled",T.value=_)},function(_){T.status==="pending"&&(T.status="rejected",T.reason=_)})),T.status){case"fulfilled":return T.value;case"rejected":throw T.reason}}throw T}function Y(T,_,re,le,de){var ce=typeof T;(ce==="undefined"||ce==="boolean")&&(T=null);var xe=!1;if(T===null)xe=!0;else switch(ce){case"bigint":case"string":case"number":xe=!0;break;case"object":switch(T.$$typeof){case n:case a:xe=!0;break;case v:return xe=T._init,Y(xe(T._payload),_,re,le,de)}}if(xe)return de=de(T),xe=le===""?"."+ue(T,0):le,L(de)?(re="",xe!=null&&(re=xe.replace(oe,"$&/")+"/"),Y(de,_,re,"",function(fe){return fe})):de!=null&&($(de)&&(de=O(de,re+(de.key==null||T&&T.key===de.key?"":(""+de.key).replace(oe,"$&/")+"/")+xe)),_.push(de)),1;xe=0;var ie=le===""?".":le+":";if(L(T))for(var J=0;J<T.length;J++)le=T[J],ce=ie+ue(le,J),xe+=Y(le,_,re,ce,de);else if(J=E(T),typeof J=="function")for(T=J.call(T),J=0;!(le=T.next()).done;)le=le.value,ce=ie+ue(le,J++),xe+=Y(le,_,re,ce,de);else if(ce==="object"){if(typeof T.then=="function")return Y(ye(T),_,re,le,de);throw _=String(T),Error("Objects are not valid as a React child (found: "+(_==="[object Object]"?"object with keys {"+Object.keys(T).join(", ")+"}":_)+"). If you meant to render a collection of children, use an array instead.")}return xe}function ae(T,_,re){if(T==null)return T;var le=[],de=0;return Y(T,le,"","",function(ce){return _.call(re,ce,de++)}),le}function W(T){if(T._status===-1){var _=T._result;_=_(),_.then(function(re){(T._status===0||T._status===-1)&&(T._status=1,T._result=re)},function(re){(T._status===0||T._status===-1)&&(T._status=2,T._result=re)}),T._status===-1&&(T._status=0,T._result=_)}if(T._status===1)return T._result.default;throw T._result}var G=typeof reportError=="function"?reportError:function(T){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var _=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof T=="object"&&T!==null&&typeof T.message=="string"?String(T.message):String(T),error:T});if(!window.dispatchEvent(_))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",T);return}console.error(T)},ee={map:ae,forEach:function(T,_,re){ae(T,function(){_.apply(this,arguments)},re)},count:function(T){var _=0;return ae(T,function(){_++}),_},toArray:function(T){return ae(T,function(_){return _})||[]},only:function(T){if(!$(T))throw Error("React.Children.only expected to receive a single React element child.");return T}};return we.Activity=x,we.Children=ee,we.Component=A,we.Fragment=s,we.Profiler=c,we.PureComponent=V,we.StrictMode=l,we.Suspense=p,we.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=D,we.__COMPILER_RUNTIME={__proto__:null,c:function(T){return D.H.useMemoCache(T)}},we.cache=function(T){return function(){return T.apply(null,arguments)}},we.cacheSignal=function(){return null},we.cloneElement=function(T,_,re){if(T==null)throw Error("The argument must be a React element, but you passed "+T+".");var le=N({},T.props),de=T.key;if(_!=null)for(ce in _.key!==void 0&&(de=""+_.key),_)!q.call(_,ce)||ce==="key"||ce==="__self"||ce==="__source"||ce==="ref"&&_.ref===void 0||(le[ce]=_[ce]);var ce=arguments.length-2;if(ce===1)le.children=re;else if(1<ce){for(var xe=Array(ce),ie=0;ie<ce;ie++)xe[ie]=arguments[ie+2];le.children=xe}return M(T.type,de,le)},we.createContext=function(T){return T={$$typeof:d,_currentValue:T,_currentValue2:T,_threadCount:0,Provider:null,Consumer:null},T.Provider=T,T.Consumer={$$typeof:h,_context:T},T},we.createElement=function(T,_,re){var le,de={},ce=null;if(_!=null)for(le in _.key!==void 0&&(ce=""+_.key),_)q.call(_,le)&&le!=="key"&&le!=="__self"&&le!=="__source"&&(de[le]=_[le]);var xe=arguments.length-2;if(xe===1)de.children=re;else if(1<xe){for(var ie=Array(xe),J=0;J<xe;J++)ie[J]=arguments[J+2];de.children=ie}if(T&&T.defaultProps)for(le in xe=T.defaultProps,xe)de[le]===void 0&&(de[le]=xe[le]);return M(T,ce,de)},we.createRef=function(){return{current:null}},we.forwardRef=function(T){return{$$typeof:m,render:T}},we.isValidElement=$,we.lazy=function(T){return{$$typeof:v,_payload:{_status:-1,_result:T},_init:W}},we.memo=function(T,_){return{$$typeof:g,type:T,compare:_===void 0?null:_}},we.startTransition=function(T){var _=D.T,re={};D.T=re;try{var le=T(),de=D.S;de!==null&&de(re,le),typeof le=="object"&&le!==null&&typeof le.then=="function"&&le.then(U,G)}catch(ce){G(ce)}finally{_!==null&&re.types!==null&&(_.types=re.types),D.T=_}},we.unstable_useCacheRefresh=function(){return D.H.useCacheRefresh()},we.use=function(T){return D.H.use(T)},we.useActionState=function(T,_,re){return D.H.useActionState(T,_,re)},we.useCallback=function(T,_){return D.H.useCallback(T,_)},we.useContext=function(T){return D.H.useContext(T)},we.useDebugValue=function(){},we.useDeferredValue=function(T,_){return D.H.useDeferredValue(T,_)},we.useEffect=function(T,_){return D.H.useEffect(T,_)},we.useEffectEvent=function(T){return D.H.useEffectEvent(T)},we.useId=function(){return D.H.useId()},we.useImperativeHandle=function(T,_,re){return D.H.useImperativeHandle(T,_,re)},we.useInsertionEffect=function(T,_){return D.H.useInsertionEffect(T,_)},we.useLayoutEffect=function(T,_){return D.H.useLayoutEffect(T,_)},we.useMemo=function(T,_){return D.H.useMemo(T,_)},we.useOptimistic=function(T,_){return D.H.useOptimistic(T,_)},we.useReducer=function(T,_,re){return D.H.useReducer(T,_,re)},we.useRef=function(T){return D.H.useRef(T)},we.useState=function(T){return D.H.useState(T)},we.useSyncExternalStore=function(T,_,re){return D.H.useSyncExternalStore(T,_,re)},we.useTransition=function(){return D.H.useTransition()},we.version="19.2.8",we}var iy;function uf(){return iy||(iy=1,Xu.exports=Cj()),Xu.exports}var S=uf();const ux=cx(S),is=wj({__proto__:null,default:ux},[S]);var $u={exports:{}},Yi={},Ku={exports:{}},Zu={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var sy;function Nj(){return sy||(sy=1,(function(n){function a(Y,ae){var W=Y.length;Y.push(ae);e:for(;0<W;){var G=W-1>>>1,ee=Y[G];if(0<c(ee,ae))Y[G]=ae,Y[W]=ee,W=G;else break e}}function s(Y){return Y.length===0?null:Y[0]}function l(Y){if(Y.length===0)return null;var ae=Y[0],W=Y.pop();if(W!==ae){Y[0]=W;e:for(var G=0,ee=Y.length,T=ee>>>1;G<T;){var _=2*(G+1)-1,re=Y[_],le=_+1,de=Y[le];if(0>c(re,W))le<ee&&0>c(de,re)?(Y[G]=de,Y[le]=W,G=le):(Y[G]=re,Y[_]=W,G=_);else if(le<ee&&0>c(de,W))Y[G]=de,Y[le]=W,G=le;else break e}}return ae}function c(Y,ae){var W=Y.sortIndex-ae.sortIndex;return W!==0?W:Y.id-ae.id}if(n.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var h=performance;n.unstable_now=function(){return h.now()}}else{var d=Date,m=d.now();n.unstable_now=function(){return d.now()-m}}var p=[],g=[],v=1,x=null,b=3,E=!1,w=!1,N=!1,C=!1,A=typeof setTimeout=="function"?setTimeout:null,k=typeof clearTimeout=="function"?clearTimeout:null,V=typeof setImmediate<"u"?setImmediate:null;function z(Y){for(var ae=s(g);ae!==null;){if(ae.callback===null)l(g);else if(ae.startTime<=Y)l(g),ae.sortIndex=ae.expirationTime,a(p,ae);else break;ae=s(g)}}function L(Y){if(N=!1,z(Y),!w)if(s(p)!==null)w=!0,U||(U=!0,Z());else{var ae=s(g);ae!==null&&ye(L,ae.startTime-Y)}}var U=!1,D=-1,q=5,M=-1;function O(){return C?!0:!(n.unstable_now()-M<q)}function $(){if(C=!1,U){var Y=n.unstable_now();M=Y;var ae=!0;try{e:{w=!1,N&&(N=!1,k(D),D=-1),E=!0;var W=b;try{t:{for(z(Y),x=s(p);x!==null&&!(x.expirationTime>Y&&O());){var G=x.callback;if(typeof G=="function"){x.callback=null,b=x.priorityLevel;var ee=G(x.expirationTime<=Y);if(Y=n.unstable_now(),typeof ee=="function"){x.callback=ee,z(Y),ae=!0;break t}x===s(p)&&l(p),z(Y)}else l(p);x=s(p)}if(x!==null)ae=!0;else{var T=s(g);T!==null&&ye(L,T.startTime-Y),ae=!1}}break e}finally{x=null,b=W,E=!1}ae=void 0}}finally{ae?Z():U=!1}}}var Z;if(typeof V=="function")Z=function(){V($)};else if(typeof MessageChannel<"u"){var oe=new MessageChannel,ue=oe.port2;oe.port1.onmessage=$,Z=function(){ue.postMessage(null)}}else Z=function(){A($,0)};function ye(Y,ae){D=A(function(){Y(n.unstable_now())},ae)}n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(Y){Y.callback=null},n.unstable_forceFrameRate=function(Y){0>Y||125<Y?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):q=0<Y?Math.floor(1e3/Y):5},n.unstable_getCurrentPriorityLevel=function(){return b},n.unstable_next=function(Y){switch(b){case 1:case 2:case 3:var ae=3;break;default:ae=b}var W=b;b=ae;try{return Y()}finally{b=W}},n.unstable_requestPaint=function(){C=!0},n.unstable_runWithPriority=function(Y,ae){switch(Y){case 1:case 2:case 3:case 4:case 5:break;default:Y=3}var W=b;b=Y;try{return ae()}finally{b=W}},n.unstable_scheduleCallback=function(Y,ae,W){var G=n.unstable_now();switch(typeof W=="object"&&W!==null?(W=W.delay,W=typeof W=="number"&&0<W?G+W:G):W=G,Y){case 1:var ee=-1;break;case 2:ee=250;break;case 5:ee=1073741823;break;case 4:ee=1e4;break;default:ee=5e3}return ee=W+ee,Y={id:v++,callback:ae,priorityLevel:Y,startTime:W,expirationTime:ee,sortIndex:-1},W>G?(Y.sortIndex=W,a(g,Y),s(p)===null&&Y===s(g)&&(N?(k(D),D=-1):N=!0,ye(L,W-G))):(Y.sortIndex=ee,a(p,Y),w||E||(w=!0,U||(U=!0,Z()))),Y},n.unstable_shouldYield=O,n.unstable_wrapCallback=function(Y){var ae=b;return function(){var W=b;b=ae;try{return Y.apply(this,arguments)}finally{b=W}}}})(Zu)),Zu}var ly;function Dj(){return ly||(ly=1,Ku.exports=Nj()),Ku.exports}var Qu={exports:{}},yt={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var oy;function Aj(){if(oy)return yt;oy=1;var n=uf();function a(p){var g="https://react.dev/errors/"+p;if(1<arguments.length){g+="?args[]="+encodeURIComponent(arguments[1]);for(var v=2;v<arguments.length;v++)g+="&args[]="+encodeURIComponent(arguments[v])}return"Minified React error #"+p+"; visit "+g+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function s(){}var l={d:{f:s,r:function(){throw Error(a(522))},D:s,C:s,L:s,m:s,X:s,S:s,M:s},p:0,findDOMNode:null},c=Symbol.for("react.portal");function h(p,g,v){var x=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:c,key:x==null?null:""+x,children:p,containerInfo:g,implementation:v}}var d=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function m(p,g){if(p==="font")return"";if(typeof g=="string")return g==="use-credentials"?g:""}return yt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=l,yt.createPortal=function(p,g){var v=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!g||g.nodeType!==1&&g.nodeType!==9&&g.nodeType!==11)throw Error(a(299));return h(p,g,null,v)},yt.flushSync=function(p){var g=d.T,v=l.p;try{if(d.T=null,l.p=2,p)return p()}finally{d.T=g,l.p=v,l.d.f()}},yt.preconnect=function(p,g){typeof p=="string"&&(g?(g=g.crossOrigin,g=typeof g=="string"?g==="use-credentials"?g:"":void 0):g=null,l.d.C(p,g))},yt.prefetchDNS=function(p){typeof p=="string"&&l.d.D(p)},yt.preinit=function(p,g){if(typeof p=="string"&&g&&typeof g.as=="string"){var v=g.as,x=m(v,g.crossOrigin),b=typeof g.integrity=="string"?g.integrity:void 0,E=typeof g.fetchPriority=="string"?g.fetchPriority:void 0;v==="style"?l.d.S(p,typeof g.precedence=="string"?g.precedence:void 0,{crossOrigin:x,integrity:b,fetchPriority:E}):v==="script"&&l.d.X(p,{crossOrigin:x,integrity:b,fetchPriority:E,nonce:typeof g.nonce=="string"?g.nonce:void 0})}},yt.preinitModule=function(p,g){if(typeof p=="string")if(typeof g=="object"&&g!==null){if(g.as==null||g.as==="script"){var v=m(g.as,g.crossOrigin);l.d.M(p,{crossOrigin:v,integrity:typeof g.integrity=="string"?g.integrity:void 0,nonce:typeof g.nonce=="string"?g.nonce:void 0})}}else g==null&&l.d.M(p)},yt.preload=function(p,g){if(typeof p=="string"&&typeof g=="object"&&g!==null&&typeof g.as=="string"){var v=g.as,x=m(v,g.crossOrigin);l.d.L(p,v,{crossOrigin:x,integrity:typeof g.integrity=="string"?g.integrity:void 0,nonce:typeof g.nonce=="string"?g.nonce:void 0,type:typeof g.type=="string"?g.type:void 0,fetchPriority:typeof g.fetchPriority=="string"?g.fetchPriority:void 0,referrerPolicy:typeof g.referrerPolicy=="string"?g.referrerPolicy:void 0,imageSrcSet:typeof g.imageSrcSet=="string"?g.imageSrcSet:void 0,imageSizes:typeof g.imageSizes=="string"?g.imageSizes:void 0,media:typeof g.media=="string"?g.media:void 0})}},yt.preloadModule=function(p,g){if(typeof p=="string")if(g){var v=m(g.as,g.crossOrigin);l.d.m(p,{as:typeof g.as=="string"&&g.as!=="script"?g.as:void 0,crossOrigin:v,integrity:typeof g.integrity=="string"?g.integrity:void 0})}else l.d.m(p)},yt.requestFormReset=function(p){l.d.r(p)},yt.unstable_batchedUpdates=function(p,g){return p(g)},yt.useFormState=function(p,g,v){return d.H.useFormState(p,g,v)},yt.useFormStatus=function(){return d.H.useHostTransitionStatus()},yt.version="19.2.8",yt}var cy;function dx(){if(cy)return Qu.exports;cy=1;function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(a){console.error(a)}}return n(),Qu.exports=Aj(),Qu.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var uy;function kj(){if(uy)return Yi;uy=1;var n=Dj(),a=uf(),s=dx();function l(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var r=2;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function c(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function h(e){var t=e,r=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(r=t.return),e=t.return;while(e)}return t.tag===3?r:null}function d(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function m(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function p(e){if(h(e)!==e)throw Error(l(188))}function g(e){var t=e.alternate;if(!t){if(t=h(e),t===null)throw Error(l(188));return t!==e?null:e}for(var r=e,i=t;;){var u=r.return;if(u===null)break;var f=u.alternate;if(f===null){if(i=u.return,i!==null){r=i;continue}break}if(u.child===f.child){for(f=u.child;f;){if(f===r)return p(u),e;if(f===i)return p(u),t;f=f.sibling}throw Error(l(188))}if(r.return!==i.return)r=u,i=f;else{for(var y=!1,j=u.child;j;){if(j===r){y=!0,r=u,i=f;break}if(j===i){y=!0,i=u,r=f;break}j=j.sibling}if(!y){for(j=f.child;j;){if(j===r){y=!0,r=f,i=u;break}if(j===i){y=!0,i=f,r=u;break}j=j.sibling}if(!y)throw Error(l(189))}}if(r.alternate!==i)throw Error(l(190))}if(r.tag!==3)throw Error(l(188));return r.stateNode.current===r?e:t}function v(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=v(e),t!==null)return t;e=e.sibling}return null}var x=Object.assign,b=Symbol.for("react.element"),E=Symbol.for("react.transitional.element"),w=Symbol.for("react.portal"),N=Symbol.for("react.fragment"),C=Symbol.for("react.strict_mode"),A=Symbol.for("react.profiler"),k=Symbol.for("react.consumer"),V=Symbol.for("react.context"),z=Symbol.for("react.forward_ref"),L=Symbol.for("react.suspense"),U=Symbol.for("react.suspense_list"),D=Symbol.for("react.memo"),q=Symbol.for("react.lazy"),M=Symbol.for("react.activity"),O=Symbol.for("react.memo_cache_sentinel"),$=Symbol.iterator;function Z(e){return e===null||typeof e!="object"?null:(e=$&&e[$]||e["@@iterator"],typeof e=="function"?e:null)}var oe=Symbol.for("react.client.reference");function ue(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===oe?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case N:return"Fragment";case A:return"Profiler";case C:return"StrictMode";case L:return"Suspense";case U:return"SuspenseList";case M:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case w:return"Portal";case V:return e.displayName||"Context";case k:return(e._context.displayName||"Context")+".Consumer";case z:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case D:return t=e.displayName||null,t!==null?t:ue(e.type)||"Memo";case q:t=e._payload,e=e._init;try{return ue(e(t))}catch{}}return null}var ye=Array.isArray,Y=a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ae=s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,W={pending:!1,data:null,method:null,action:null},G=[],ee=-1;function T(e){return{current:e}}function _(e){0>ee||(e.current=G[ee],G[ee]=null,ee--)}function re(e,t){ee++,G[ee]=e.current,e.current=t}var le=T(null),de=T(null),ce=T(null),xe=T(null);function ie(e,t){switch(re(ce,t),re(de,e),re(le,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Tg(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Tg(t),e=Cg(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}_(le),re(le,e)}function J(){_(le),_(de),_(ce)}function fe(e){e.memoizedState!==null&&re(xe,e);var t=le.current,r=Cg(t,e.type);t!==r&&(re(de,e),re(le,r))}function te(e){de.current===e&&(_(le),_(de)),xe.current===e&&(_(xe),Bi._currentValue=W)}var me,Ce;function Q(e){if(me===void 0)try{throw Error()}catch(r){var t=r.stack.trim().match(/\n( *(at )?)/);me=t&&t[1]||"",Ce=-1<r.stack.indexOf(`
    at`)?" (<anonymous>)":-1<r.stack.indexOf("@")?"@unknown:0:0":""}return`
`+me+e+Ce}var be=!1;function _e(e,t){if(!e||be)return"";be=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(t){var se=function(){throw Error()};if(Object.defineProperty(se.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(se,[])}catch(K){var X=K}Reflect.construct(e,[],se)}else{try{se.call()}catch(K){X=K}e.call(se.prototype)}}else{try{throw Error()}catch(K){X=K}(se=e())&&typeof se.catch=="function"&&se.catch(function(){})}}catch(K){if(K&&X&&typeof K.stack=="string")return[K.stack,X.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var f=i.DetermineComponentFrameRoot(),y=f[0],j=f[1];if(y&&j){var R=y.split(`
`),F=j.split(`
`);for(u=i=0;i<R.length&&!R[i].includes("DetermineComponentFrameRoot");)i++;for(;u<F.length&&!F[u].includes("DetermineComponentFrameRoot");)u++;if(i===R.length||u===F.length)for(i=R.length-1,u=F.length-1;1<=i&&0<=u&&R[i]!==F[u];)u--;for(;1<=i&&0<=u;i--,u--)if(R[i]!==F[u]){if(i!==1||u!==1)do if(i--,u--,0>u||R[i]!==F[u]){var I=`
`+R[i].replace(" at new "," at ");return e.displayName&&I.includes("<anonymous>")&&(I=I.replace("<anonymous>",e.displayName)),I}while(1<=i&&0<=u);break}}}finally{be=!1,Error.prepareStackTrace=r}return(r=e?e.displayName||e.name:"")?Q(r):""}function vt(e,t){switch(e.tag){case 26:case 27:case 5:return Q(e.type);case 16:return Q("Lazy");case 13:return e.child!==t&&t!==null?Q("Suspense Fallback"):Q("Suspense");case 19:return Q("SuspenseList");case 0:case 15:return _e(e.type,!1);case 11:return _e(e.type.render,!1);case 1:return _e(e.type,!0);case 31:return Q("Activity");default:return""}}function nh(e){try{var t="",r=null;do t+=vt(e,r),r=e,e=e.return;while(e);return t}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var ko=Object.prototype.hasOwnProperty,Mo=n.unstable_scheduleCallback,Ro=n.unstable_cancelCallback,t1=n.unstable_shouldYield,n1=n.unstable_requestPaint,kt=n.unstable_now,r1=n.unstable_getCurrentPriorityLevel,rh=n.unstable_ImmediatePriority,ah=n.unstable_UserBlockingPriority,fs=n.unstable_NormalPriority,a1=n.unstable_LowPriority,ih=n.unstable_IdlePriority,i1=n.log,s1=n.unstable_setDisableYieldValue,Za=null,Mt=null;function Gn(e){if(typeof i1=="function"&&s1(e),Mt&&typeof Mt.setStrictMode=="function")try{Mt.setStrictMode(Za,e)}catch{}}var Rt=Math.clz32?Math.clz32:c1,l1=Math.log,o1=Math.LN2;function c1(e){return e>>>=0,e===0?32:31-(l1(e)/o1|0)|0}var hs=256,ms=262144,ps=4194304;function jr(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function gs(e,t,r){var i=e.pendingLanes;if(i===0)return 0;var u=0,f=e.suspendedLanes,y=e.pingedLanes;e=e.warmLanes;var j=i&134217727;return j!==0?(i=j&~f,i!==0?u=jr(i):(y&=j,y!==0?u=jr(y):r||(r=j&~e,r!==0&&(u=jr(r))))):(j=i&~f,j!==0?u=jr(j):y!==0?u=jr(y):r||(r=i&~e,r!==0&&(u=jr(r)))),u===0?0:t!==0&&t!==u&&(t&f)===0&&(f=u&-u,r=t&-t,f>=r||f===32&&(r&4194048)!==0)?t:u}function Qa(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function u1(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function sh(){var e=ps;return ps<<=1,(ps&62914560)===0&&(ps=4194304),e}function Oo(e){for(var t=[],r=0;31>r;r++)t.push(e);return t}function Ja(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function d1(e,t,r,i,u,f){var y=e.pendingLanes;e.pendingLanes=r,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=r,e.entangledLanes&=r,e.errorRecoveryDisabledLanes&=r,e.shellSuspendCounter=0;var j=e.entanglements,R=e.expirationTimes,F=e.hiddenUpdates;for(r=y&~r;0<r;){var I=31-Rt(r),se=1<<I;j[I]=0,R[I]=-1;var X=F[I];if(X!==null)for(F[I]=null,I=0;I<X.length;I++){var K=X[I];K!==null&&(K.lane&=-536870913)}r&=~se}i!==0&&lh(e,i,0),f!==0&&u===0&&e.tag!==0&&(e.suspendedLanes|=f&~(y&~t))}function lh(e,t,r){e.pendingLanes|=t,e.suspendedLanes&=~t;var i=31-Rt(t);e.entangledLanes|=t,e.entanglements[i]=e.entanglements[i]|1073741824|r&261930}function oh(e,t){var r=e.entangledLanes|=t;for(e=e.entanglements;r;){var i=31-Rt(r),u=1<<i;u&t|e[i]&t&&(e[i]|=t),r&=~u}}function ch(e,t){var r=t&-t;return r=(r&42)!==0?1:zo(r),(r&(e.suspendedLanes|t))!==0?0:r}function zo(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function _o(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function uh(){var e=ae.p;return e!==0?e:(e=window.event,e===void 0?32:Zg(e.type))}function dh(e,t){var r=ae.p;try{return ae.p=e,t()}finally{ae.p=r}}var Fn=Math.random().toString(36).slice(2),ut="__reactFiber$"+Fn,wt="__reactProps$"+Fn,Kr="__reactContainer$"+Fn,Vo="__reactEvents$"+Fn,f1="__reactListeners$"+Fn,h1="__reactHandles$"+Fn,fh="__reactResources$"+Fn,Wa="__reactMarker$"+Fn;function Bo(e){delete e[ut],delete e[wt],delete e[Vo],delete e[f1],delete e[h1]}function Zr(e){var t=e[ut];if(t)return t;for(var r=e.parentNode;r;){if(t=r[Kr]||r[ut]){if(r=t.alternate,t.child!==null||r!==null&&r.child!==null)for(e=Og(e);e!==null;){if(r=e[ut])return r;e=Og(e)}return t}e=r,r=e.parentNode}return null}function Qr(e){if(e=e[ut]||e[Kr]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Ia(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(l(33))}function Jr(e){var t=e[fh];return t||(t=e[fh]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function lt(e){e[Wa]=!0}var hh=new Set,mh={};function wr(e,t){Wr(e,t),Wr(e+"Capture",t)}function Wr(e,t){for(mh[e]=t,e=0;e<t.length;e++)hh.add(t[e])}var m1=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),ph={},gh={};function p1(e){return ko.call(gh,e)?!0:ko.call(ph,e)?!1:m1.test(e)?gh[e]=!0:(ph[e]=!0,!1)}function ys(e,t,r){if(p1(t))if(r===null)e.removeAttribute(t);else{switch(typeof r){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var i=t.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+r)}}function vs(e,t,r){if(r===null)e.removeAttribute(t);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+r)}}function wn(e,t,r,i){if(i===null)e.removeAttribute(r);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(r);return}e.setAttributeNS(t,r,""+i)}}function Pt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function yh(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function g1(e,t,r){var i=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var u=i.get,f=i.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return u.call(this)},set:function(y){r=""+y,f.call(this,y)}}),Object.defineProperty(e,t,{enumerable:i.enumerable}),{getValue:function(){return r},setValue:function(y){r=""+y},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Lo(e){if(!e._valueTracker){var t=yh(e)?"checked":"value";e._valueTracker=g1(e,t,""+e[t])}}function vh(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var r=t.getValue(),i="";return e&&(i=yh(e)?e.checked?"true":"false":e.value),e=i,e!==r?(t.setValue(e),!0):!1}function xs(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var y1=/[\n"\\]/g;function Gt(e){return e.replace(y1,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function Uo(e,t,r,i,u,f,y,j){e.name="",y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"?e.type=y:e.removeAttribute("type"),t!=null?y==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+Pt(t)):e.value!==""+Pt(t)&&(e.value=""+Pt(t)):y!=="submit"&&y!=="reset"||e.removeAttribute("value"),t!=null?Ho(e,y,Pt(t)):r!=null?Ho(e,y,Pt(r)):i!=null&&e.removeAttribute("value"),u==null&&f!=null&&(e.defaultChecked=!!f),u!=null&&(e.checked=u&&typeof u!="function"&&typeof u!="symbol"),j!=null&&typeof j!="function"&&typeof j!="symbol"&&typeof j!="boolean"?e.name=""+Pt(j):e.removeAttribute("name")}function xh(e,t,r,i,u,f,y,j){if(f!=null&&typeof f!="function"&&typeof f!="symbol"&&typeof f!="boolean"&&(e.type=f),t!=null||r!=null){if(!(f!=="submit"&&f!=="reset"||t!=null)){Lo(e);return}r=r!=null?""+Pt(r):"",t=t!=null?""+Pt(t):r,j||t===e.value||(e.value=t),e.defaultValue=t}i=i??u,i=typeof i!="function"&&typeof i!="symbol"&&!!i,e.checked=j?e.checked:!!i,e.defaultChecked=!!i,y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"&&(e.name=y),Lo(e)}function Ho(e,t,r){t==="number"&&xs(e.ownerDocument)===e||e.defaultValue===""+r||(e.defaultValue=""+r)}function Ir(e,t,r,i){if(e=e.options,t){t={};for(var u=0;u<r.length;u++)t["$"+r[u]]=!0;for(r=0;r<e.length;r++)u=t.hasOwnProperty("$"+e[r].value),e[r].selected!==u&&(e[r].selected=u),u&&i&&(e[r].defaultSelected=!0)}else{for(r=""+Pt(r),t=null,u=0;u<e.length;u++){if(e[u].value===r){e[u].selected=!0,i&&(e[u].defaultSelected=!0);return}t!==null||e[u].disabled||(t=e[u])}t!==null&&(t.selected=!0)}}function bh(e,t,r){if(t!=null&&(t=""+Pt(t),t!==e.value&&(e.value=t),r==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=r!=null?""+Pt(r):""}function Sh(e,t,r,i){if(t==null){if(i!=null){if(r!=null)throw Error(l(92));if(ye(i)){if(1<i.length)throw Error(l(93));i=i[0]}r=i}r==null&&(r=""),t=r}r=Pt(t),e.defaultValue=r,i=e.textContent,i===r&&i!==""&&i!==null&&(e.value=i),Lo(e)}function ea(e,t){if(t){var r=e.firstChild;if(r&&r===e.lastChild&&r.nodeType===3){r.nodeValue=t;return}}e.textContent=t}var v1=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function jh(e,t,r){var i=t.indexOf("--")===0;r==null||typeof r=="boolean"||r===""?i?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":i?e.setProperty(t,r):typeof r!="number"||r===0||v1.has(t)?t==="float"?e.cssFloat=r:e[t]=(""+r).trim():e[t]=r+"px"}function wh(e,t,r){if(t!=null&&typeof t!="object")throw Error(l(62));if(e=e.style,r!=null){for(var i in r)!r.hasOwnProperty(i)||t!=null&&t.hasOwnProperty(i)||(i.indexOf("--")===0?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="");for(var u in t)i=t[u],t.hasOwnProperty(u)&&r[u]!==i&&jh(e,u,i)}else for(var f in t)t.hasOwnProperty(f)&&jh(e,f,t[f])}function qo(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var x1=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),b1=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function bs(e){return b1.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function En(){}var Yo=null;function Po(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ta=null,na=null;function Eh(e){var t=Qr(e);if(t&&(e=t.stateNode)){var r=e[wt]||null;e:switch(e=t.stateNode,t.type){case"input":if(Uo(e,r.value,r.defaultValue,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name),t=r.name,r.type==="radio"&&t!=null){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll('input[name="'+Gt(""+t)+'"][type="radio"]'),t=0;t<r.length;t++){var i=r[t];if(i!==e&&i.form===e.form){var u=i[wt]||null;if(!u)throw Error(l(90));Uo(i,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(t=0;t<r.length;t++)i=r[t],i.form===e.form&&vh(i)}break e;case"textarea":bh(e,r.value,r.defaultValue);break e;case"select":t=r.value,t!=null&&Ir(e,!!r.multiple,t,!1)}}}var Go=!1;function Th(e,t,r){if(Go)return e(t,r);Go=!0;try{var i=e(t);return i}finally{if(Go=!1,(ta!==null||na!==null)&&(ll(),ta&&(t=ta,e=na,na=ta=null,Eh(t),e)))for(t=0;t<e.length;t++)Eh(e[t])}}function ei(e,t){var r=e.stateNode;if(r===null)return null;var i=r[wt]||null;if(i===null)return null;r=i[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break e;default:e=!1}if(e)return null;if(r&&typeof r!="function")throw Error(l(231,t,typeof r));return r}var Tn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Fo=!1;if(Tn)try{var ti={};Object.defineProperty(ti,"passive",{get:function(){Fo=!0}}),window.addEventListener("test",ti,ti),window.removeEventListener("test",ti,ti)}catch{Fo=!1}var Xn=null,Xo=null,Ss=null;function Ch(){if(Ss)return Ss;var e,t=Xo,r=t.length,i,u="value"in Xn?Xn.value:Xn.textContent,f=u.length;for(e=0;e<r&&t[e]===u[e];e++);var y=r-e;for(i=1;i<=y&&t[r-i]===u[f-i];i++);return Ss=u.slice(e,1<i?1-i:void 0)}function js(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function ws(){return!0}function Nh(){return!1}function Et(e){function t(r,i,u,f,y){this._reactName=r,this._targetInst=u,this.type=i,this.nativeEvent=f,this.target=y,this.currentTarget=null;for(var j in e)e.hasOwnProperty(j)&&(r=e[j],this[j]=r?r(f):f[j]);return this.isDefaultPrevented=(f.defaultPrevented!=null?f.defaultPrevented:f.returnValue===!1)?ws:Nh,this.isPropagationStopped=Nh,this}return x(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=ws)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=ws)},persist:function(){},isPersistent:ws}),t}var Er={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Es=Et(Er),ni=x({},Er,{view:0,detail:0}),S1=Et(ni),$o,Ko,ri,Ts=x({},ni,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Qo,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==ri&&(ri&&e.type==="mousemove"?($o=e.screenX-ri.screenX,Ko=e.screenY-ri.screenY):Ko=$o=0,ri=e),$o)},movementY:function(e){return"movementY"in e?e.movementY:Ko}}),Dh=Et(Ts),j1=x({},Ts,{dataTransfer:0}),w1=Et(j1),E1=x({},ni,{relatedTarget:0}),Zo=Et(E1),T1=x({},Er,{animationName:0,elapsedTime:0,pseudoElement:0}),C1=Et(T1),N1=x({},Er,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),D1=Et(N1),A1=x({},Er,{data:0}),Ah=Et(A1),k1={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},M1={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},R1={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function O1(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=R1[e])?!!t[e]:!1}function Qo(){return O1}var z1=x({},ni,{key:function(e){if(e.key){var t=k1[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=js(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?M1[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Qo,charCode:function(e){return e.type==="keypress"?js(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?js(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),_1=Et(z1),V1=x({},Ts,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),kh=Et(V1),B1=x({},ni,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Qo}),L1=Et(B1),U1=x({},Er,{propertyName:0,elapsedTime:0,pseudoElement:0}),H1=Et(U1),q1=x({},Ts,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Y1=Et(q1),P1=x({},Er,{newState:0,oldState:0}),G1=Et(P1),F1=[9,13,27,32],Jo=Tn&&"CompositionEvent"in window,ai=null;Tn&&"documentMode"in document&&(ai=document.documentMode);var X1=Tn&&"TextEvent"in window&&!ai,Mh=Tn&&(!Jo||ai&&8<ai&&11>=ai),Rh=" ",Oh=!1;function zh(e,t){switch(e){case"keyup":return F1.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function _h(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var ra=!1;function $1(e,t){switch(e){case"compositionend":return _h(t);case"keypress":return t.which!==32?null:(Oh=!0,Rh);case"textInput":return e=t.data,e===Rh&&Oh?null:e;default:return null}}function K1(e,t){if(ra)return e==="compositionend"||!Jo&&zh(e,t)?(e=Ch(),Ss=Xo=Xn=null,ra=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Mh&&t.locale!=="ko"?null:t.data;default:return null}}var Z1={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Vh(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Z1[e.type]:t==="textarea"}function Bh(e,t,r,i){ta?na?na.push(i):na=[i]:ta=i,t=ml(t,"onChange"),0<t.length&&(r=new Es("onChange","change",null,r,i),e.push({event:r,listeners:t}))}var ii=null,si=null;function Q1(e){xg(e,0)}function Cs(e){var t=Ia(e);if(vh(t))return e}function Lh(e,t){if(e==="change")return t}var Uh=!1;if(Tn){var Wo;if(Tn){var Io="oninput"in document;if(!Io){var Hh=document.createElement("div");Hh.setAttribute("oninput","return;"),Io=typeof Hh.oninput=="function"}Wo=Io}else Wo=!1;Uh=Wo&&(!document.documentMode||9<document.documentMode)}function qh(){ii&&(ii.detachEvent("onpropertychange",Yh),si=ii=null)}function Yh(e){if(e.propertyName==="value"&&Cs(si)){var t=[];Bh(t,si,e,Po(e)),Th(Q1,t)}}function J1(e,t,r){e==="focusin"?(qh(),ii=t,si=r,ii.attachEvent("onpropertychange",Yh)):e==="focusout"&&qh()}function W1(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Cs(si)}function I1(e,t){if(e==="click")return Cs(t)}function eS(e,t){if(e==="input"||e==="change")return Cs(t)}function tS(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ot=typeof Object.is=="function"?Object.is:tS;function li(e,t){if(Ot(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var r=Object.keys(e),i=Object.keys(t);if(r.length!==i.length)return!1;for(i=0;i<r.length;i++){var u=r[i];if(!ko.call(t,u)||!Ot(e[u],t[u]))return!1}return!0}function Ph(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Gh(e,t){var r=Ph(e);e=0;for(var i;r;){if(r.nodeType===3){if(i=e+r.textContent.length,e<=t&&i>=t)return{node:r,offset:t-e};e=i}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=Ph(r)}}function Fh(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Fh(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Xh(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=xs(e.document);t instanceof e.HTMLIFrameElement;){try{var r=typeof t.contentWindow.location.href=="string"}catch{r=!1}if(r)e=t.contentWindow;else break;t=xs(e.document)}return t}function ec(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var nS=Tn&&"documentMode"in document&&11>=document.documentMode,aa=null,tc=null,oi=null,nc=!1;function $h(e,t,r){var i=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;nc||aa==null||aa!==xs(i)||(i=aa,"selectionStart"in i&&ec(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),oi&&li(oi,i)||(oi=i,i=ml(tc,"onSelect"),0<i.length&&(t=new Es("onSelect","select",null,t,r),e.push({event:t,listeners:i}),t.target=aa)))}function Tr(e,t){var r={};return r[e.toLowerCase()]=t.toLowerCase(),r["Webkit"+e]="webkit"+t,r["Moz"+e]="moz"+t,r}var ia={animationend:Tr("Animation","AnimationEnd"),animationiteration:Tr("Animation","AnimationIteration"),animationstart:Tr("Animation","AnimationStart"),transitionrun:Tr("Transition","TransitionRun"),transitionstart:Tr("Transition","TransitionStart"),transitioncancel:Tr("Transition","TransitionCancel"),transitionend:Tr("Transition","TransitionEnd")},rc={},Kh={};Tn&&(Kh=document.createElement("div").style,"AnimationEvent"in window||(delete ia.animationend.animation,delete ia.animationiteration.animation,delete ia.animationstart.animation),"TransitionEvent"in window||delete ia.transitionend.transition);function Cr(e){if(rc[e])return rc[e];if(!ia[e])return e;var t=ia[e],r;for(r in t)if(t.hasOwnProperty(r)&&r in Kh)return rc[e]=t[r];return e}var Zh=Cr("animationend"),Qh=Cr("animationiteration"),Jh=Cr("animationstart"),rS=Cr("transitionrun"),aS=Cr("transitionstart"),iS=Cr("transitioncancel"),Wh=Cr("transitionend"),Ih=new Map,ac="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");ac.push("scrollEnd");function rn(e,t){Ih.set(e,t),wr(t,[e])}var Ns=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Ft=[],sa=0,ic=0;function Ds(){for(var e=sa,t=ic=sa=0;t<e;){var r=Ft[t];Ft[t++]=null;var i=Ft[t];Ft[t++]=null;var u=Ft[t];Ft[t++]=null;var f=Ft[t];if(Ft[t++]=null,i!==null&&u!==null){var y=i.pending;y===null?u.next=u:(u.next=y.next,y.next=u),i.pending=u}f!==0&&em(r,u,f)}}function As(e,t,r,i){Ft[sa++]=e,Ft[sa++]=t,Ft[sa++]=r,Ft[sa++]=i,ic|=i,e.lanes|=i,e=e.alternate,e!==null&&(e.lanes|=i)}function sc(e,t,r,i){return As(e,t,r,i),ks(e)}function Nr(e,t){return As(e,null,null,t),ks(e)}function em(e,t,r){e.lanes|=r;var i=e.alternate;i!==null&&(i.lanes|=r);for(var u=!1,f=e.return;f!==null;)f.childLanes|=r,i=f.alternate,i!==null&&(i.childLanes|=r),f.tag===22&&(e=f.stateNode,e===null||e._visibility&1||(u=!0)),e=f,f=f.return;return e.tag===3?(f=e.stateNode,u&&t!==null&&(u=31-Rt(r),e=f.hiddenUpdates,i=e[u],i===null?e[u]=[t]:i.push(t),t.lane=r|536870912),f):null}function ks(e){if(50<ki)throw ki=0,pu=null,Error(l(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var la={};function sS(e,t,r,i){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function zt(e,t,r,i){return new sS(e,t,r,i)}function lc(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Cn(e,t){var r=e.alternate;return r===null?(r=zt(e.tag,t,e.key,e.mode),r.elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=e.flags&65011712,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,t=e.dependencies,r.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r.refCleanup=e.refCleanup,r}function tm(e,t){e.flags&=65011714;var r=e.alternate;return r===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=r.childLanes,e.lanes=r.lanes,e.child=r.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=r.memoizedProps,e.memoizedState=r.memoizedState,e.updateQueue=r.updateQueue,e.type=r.type,t=r.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Ms(e,t,r,i,u,f){var y=0;if(i=e,typeof e=="function")lc(e)&&(y=1);else if(typeof e=="string")y=dj(e,r,le.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case M:return e=zt(31,r,t,u),e.elementType=M,e.lanes=f,e;case N:return Dr(r.children,u,f,t);case C:y=8,u|=24;break;case A:return e=zt(12,r,t,u|2),e.elementType=A,e.lanes=f,e;case L:return e=zt(13,r,t,u),e.elementType=L,e.lanes=f,e;case U:return e=zt(19,r,t,u),e.elementType=U,e.lanes=f,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case V:y=10;break e;case k:y=9;break e;case z:y=11;break e;case D:y=14;break e;case q:y=16,i=null;break e}y=29,r=Error(l(130,e===null?"null":typeof e,"")),i=null}return t=zt(y,r,t,u),t.elementType=e,t.type=i,t.lanes=f,t}function Dr(e,t,r,i){return e=zt(7,e,i,t),e.lanes=r,e}function oc(e,t,r){return e=zt(6,e,null,t),e.lanes=r,e}function nm(e){var t=zt(18,null,null,0);return t.stateNode=e,t}function cc(e,t,r){return t=zt(4,e.children!==null?e.children:[],e.key,t),t.lanes=r,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var rm=new WeakMap;function Xt(e,t){if(typeof e=="object"&&e!==null){var r=rm.get(e);return r!==void 0?r:(t={value:e,source:t,stack:nh(t)},rm.set(e,t),t)}return{value:e,source:t,stack:nh(t)}}var oa=[],ca=0,Rs=null,ci=0,$t=[],Kt=0,$n=null,dn=1,fn="";function Nn(e,t){oa[ca++]=ci,oa[ca++]=Rs,Rs=e,ci=t}function am(e,t,r){$t[Kt++]=dn,$t[Kt++]=fn,$t[Kt++]=$n,$n=e;var i=dn;e=fn;var u=32-Rt(i)-1;i&=~(1<<u),r+=1;var f=32-Rt(t)+u;if(30<f){var y=u-u%5;f=(i&(1<<y)-1).toString(32),i>>=y,u-=y,dn=1<<32-Rt(t)+u|r<<u|i,fn=f+e}else dn=1<<f|r<<u|i,fn=e}function uc(e){e.return!==null&&(Nn(e,1),am(e,1,0))}function dc(e){for(;e===Rs;)Rs=oa[--ca],oa[ca]=null,ci=oa[--ca],oa[ca]=null;for(;e===$n;)$n=$t[--Kt],$t[Kt]=null,fn=$t[--Kt],$t[Kt]=null,dn=$t[--Kt],$t[Kt]=null}function im(e,t){$t[Kt++]=dn,$t[Kt++]=fn,$t[Kt++]=$n,dn=t.id,fn=t.overflow,$n=e}var dt=null,Fe=null,Me=!1,Kn=null,Zt=!1,fc=Error(l(519));function Zn(e){var t=Error(l(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw ui(Xt(t,e)),fc}function sm(e){var t=e.stateNode,r=e.type,i=e.memoizedProps;switch(t[ut]=e,t[wt]=i,r){case"dialog":De("cancel",t),De("close",t);break;case"iframe":case"object":case"embed":De("load",t);break;case"video":case"audio":for(r=0;r<Ri.length;r++)De(Ri[r],t);break;case"source":De("error",t);break;case"img":case"image":case"link":De("error",t),De("load",t);break;case"details":De("toggle",t);break;case"input":De("invalid",t),xh(t,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":De("invalid",t);break;case"textarea":De("invalid",t),Sh(t,i.value,i.defaultValue,i.children)}r=i.children,typeof r!="string"&&typeof r!="number"&&typeof r!="bigint"||t.textContent===""+r||i.suppressHydrationWarning===!0||wg(t.textContent,r)?(i.popover!=null&&(De("beforetoggle",t),De("toggle",t)),i.onScroll!=null&&De("scroll",t),i.onScrollEnd!=null&&De("scrollend",t),i.onClick!=null&&(t.onclick=En),t=!0):t=!1,t||Zn(e,!0)}function lm(e){for(dt=e.return;dt;)switch(dt.tag){case 5:case 31:case 13:Zt=!1;return;case 27:case 3:Zt=!0;return;default:dt=dt.return}}function ua(e){if(e!==dt)return!1;if(!Me)return lm(e),Me=!0,!1;var t=e.tag,r;if((r=t!==3&&t!==27)&&((r=t===5)&&(r=e.type,r=!(r!=="form"&&r!=="button")||ku(e.type,e.memoizedProps)),r=!r),r&&Fe&&Zn(e),lm(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(l(317));Fe=Rg(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(l(317));Fe=Rg(e)}else t===27?(t=Fe,cr(e.type)?(e=_u,_u=null,Fe=e):Fe=t):Fe=dt?Jt(e.stateNode.nextSibling):null;return!0}function Ar(){Fe=dt=null,Me=!1}function hc(){var e=Kn;return e!==null&&(Dt===null?Dt=e:Dt.push.apply(Dt,e),Kn=null),e}function ui(e){Kn===null?Kn=[e]:Kn.push(e)}var mc=T(null),kr=null,Dn=null;function Qn(e,t,r){re(mc,t._currentValue),t._currentValue=r}function An(e){e._currentValue=mc.current,_(mc)}function pc(e,t,r){for(;e!==null;){var i=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,i!==null&&(i.childLanes|=t)):i!==null&&(i.childLanes&t)!==t&&(i.childLanes|=t),e===r)break;e=e.return}}function gc(e,t,r,i){var u=e.child;for(u!==null&&(u.return=e);u!==null;){var f=u.dependencies;if(f!==null){var y=u.child;f=f.firstContext;e:for(;f!==null;){var j=f;f=u;for(var R=0;R<t.length;R++)if(j.context===t[R]){f.lanes|=r,j=f.alternate,j!==null&&(j.lanes|=r),pc(f.return,r,e),i||(y=null);break e}f=j.next}}else if(u.tag===18){if(y=u.return,y===null)throw Error(l(341));y.lanes|=r,f=y.alternate,f!==null&&(f.lanes|=r),pc(y,r,e),y=null}else y=u.child;if(y!==null)y.return=u;else for(y=u;y!==null;){if(y===e){y=null;break}if(u=y.sibling,u!==null){u.return=y.return,y=u;break}y=y.return}u=y}}function da(e,t,r,i){e=null;for(var u=t,f=!1;u!==null;){if(!f){if((u.flags&524288)!==0)f=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var y=u.alternate;if(y===null)throw Error(l(387));if(y=y.memoizedProps,y!==null){var j=u.type;Ot(u.pendingProps.value,y.value)||(e!==null?e.push(j):e=[j])}}else if(u===xe.current){if(y=u.alternate,y===null)throw Error(l(387));y.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(e!==null?e.push(Bi):e=[Bi])}u=u.return}e!==null&&gc(t,e,r,i),t.flags|=262144}function Os(e){for(e=e.firstContext;e!==null;){if(!Ot(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Mr(e){kr=e,Dn=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function ft(e){return om(kr,e)}function zs(e,t){return kr===null&&Mr(e),om(e,t)}function om(e,t){var r=t._currentValue;if(t={context:t,memoizedValue:r,next:null},Dn===null){if(e===null)throw Error(l(308));Dn=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Dn=Dn.next=t;return r}var lS=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(r,i){e.push(i)}};this.abort=function(){t.aborted=!0,e.forEach(function(r){return r()})}},oS=n.unstable_scheduleCallback,cS=n.unstable_NormalPriority,et={$$typeof:V,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function yc(){return{controller:new lS,data:new Map,refCount:0}}function di(e){e.refCount--,e.refCount===0&&oS(cS,function(){e.controller.abort()})}var fi=null,vc=0,fa=0,ha=null;function uS(e,t){if(fi===null){var r=fi=[];vc=0,fa=Su(),ha={status:"pending",value:void 0,then:function(i){r.push(i)}}}return vc++,t.then(cm,cm),t}function cm(){if(--vc===0&&fi!==null){ha!==null&&(ha.status="fulfilled");var e=fi;fi=null,fa=0,ha=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function dS(e,t){var r=[],i={status:"pending",value:null,reason:null,then:function(u){r.push(u)}};return e.then(function(){i.status="fulfilled",i.value=t;for(var u=0;u<r.length;u++)(0,r[u])(t)},function(u){for(i.status="rejected",i.reason=u,u=0;u<r.length;u++)(0,r[u])(void 0)}),i}var um=Y.S;Y.S=function(e,t){$p=kt(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&uS(e,t),um!==null&&um(e,t)};var Rr=T(null);function xc(){var e=Rr.current;return e!==null?e:Ye.pooledCache}function _s(e,t){t===null?re(Rr,Rr.current):re(Rr,t.pool)}function dm(){var e=xc();return e===null?null:{parent:et._currentValue,pool:e}}var ma=Error(l(460)),bc=Error(l(474)),Vs=Error(l(542)),Bs={then:function(){}};function fm(e){return e=e.status,e==="fulfilled"||e==="rejected"}function hm(e,t,r){switch(r=e[r],r===void 0?e.push(t):r!==t&&(t.then(En,En),t=r),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,pm(e),e;default:if(typeof t.status=="string")t.then(En,En);else{if(e=Ye,e!==null&&100<e.shellSuspendCounter)throw Error(l(482));e=t,e.status="pending",e.then(function(i){if(t.status==="pending"){var u=t;u.status="fulfilled",u.value=i}},function(i){if(t.status==="pending"){var u=t;u.status="rejected",u.reason=i}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,pm(e),e}throw zr=t,ma}}function Or(e){try{var t=e._init;return t(e._payload)}catch(r){throw r!==null&&typeof r=="object"&&typeof r.then=="function"?(zr=r,ma):r}}var zr=null;function mm(){if(zr===null)throw Error(l(459));var e=zr;return zr=null,e}function pm(e){if(e===ma||e===Vs)throw Error(l(483))}var pa=null,hi=0;function Ls(e){var t=hi;return hi+=1,pa===null&&(pa=[]),hm(pa,e,t)}function mi(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function Us(e,t){throw t.$$typeof===b?Error(l(525)):(e=Object.prototype.toString.call(t),Error(l(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function gm(e){function t(H,B){if(e){var P=H.deletions;P===null?(H.deletions=[B],H.flags|=16):P.push(B)}}function r(H,B){if(!e)return null;for(;B!==null;)t(H,B),B=B.sibling;return null}function i(H){for(var B=new Map;H!==null;)H.key!==null?B.set(H.key,H):B.set(H.index,H),H=H.sibling;return B}function u(H,B){return H=Cn(H,B),H.index=0,H.sibling=null,H}function f(H,B,P){return H.index=P,e?(P=H.alternate,P!==null?(P=P.index,P<B?(H.flags|=67108866,B):P):(H.flags|=67108866,B)):(H.flags|=1048576,B)}function y(H){return e&&H.alternate===null&&(H.flags|=67108866),H}function j(H,B,P,ne){return B===null||B.tag!==6?(B=oc(P,H.mode,ne),B.return=H,B):(B=u(B,P),B.return=H,B)}function R(H,B,P,ne){var Se=P.type;return Se===N?I(H,B,P.props.children,ne,P.key):B!==null&&(B.elementType===Se||typeof Se=="object"&&Se!==null&&Se.$$typeof===q&&Or(Se)===B.type)?(B=u(B,P.props),mi(B,P),B.return=H,B):(B=Ms(P.type,P.key,P.props,null,H.mode,ne),mi(B,P),B.return=H,B)}function F(H,B,P,ne){return B===null||B.tag!==4||B.stateNode.containerInfo!==P.containerInfo||B.stateNode.implementation!==P.implementation?(B=cc(P,H.mode,ne),B.return=H,B):(B=u(B,P.children||[]),B.return=H,B)}function I(H,B,P,ne,Se){return B===null||B.tag!==7?(B=Dr(P,H.mode,ne,Se),B.return=H,B):(B=u(B,P),B.return=H,B)}function se(H,B,P){if(typeof B=="string"&&B!==""||typeof B=="number"||typeof B=="bigint")return B=oc(""+B,H.mode,P),B.return=H,B;if(typeof B=="object"&&B!==null){switch(B.$$typeof){case E:return P=Ms(B.type,B.key,B.props,null,H.mode,P),mi(P,B),P.return=H,P;case w:return B=cc(B,H.mode,P),B.return=H,B;case q:return B=Or(B),se(H,B,P)}if(ye(B)||Z(B))return B=Dr(B,H.mode,P,null),B.return=H,B;if(typeof B.then=="function")return se(H,Ls(B),P);if(B.$$typeof===V)return se(H,zs(H,B),P);Us(H,B)}return null}function X(H,B,P,ne){var Se=B!==null?B.key:null;if(typeof P=="string"&&P!==""||typeof P=="number"||typeof P=="bigint")return Se!==null?null:j(H,B,""+P,ne);if(typeof P=="object"&&P!==null){switch(P.$$typeof){case E:return P.key===Se?R(H,B,P,ne):null;case w:return P.key===Se?F(H,B,P,ne):null;case q:return P=Or(P),X(H,B,P,ne)}if(ye(P)||Z(P))return Se!==null?null:I(H,B,P,ne,null);if(typeof P.then=="function")return X(H,B,Ls(P),ne);if(P.$$typeof===V)return X(H,B,zs(H,P),ne);Us(H,P)}return null}function K(H,B,P,ne,Se){if(typeof ne=="string"&&ne!==""||typeof ne=="number"||typeof ne=="bigint")return H=H.get(P)||null,j(B,H,""+ne,Se);if(typeof ne=="object"&&ne!==null){switch(ne.$$typeof){case E:return H=H.get(ne.key===null?P:ne.key)||null,R(B,H,ne,Se);case w:return H=H.get(ne.key===null?P:ne.key)||null,F(B,H,ne,Se);case q:return ne=Or(ne),K(H,B,P,ne,Se)}if(ye(ne)||Z(ne))return H=H.get(P)||null,I(B,H,ne,Se,null);if(typeof ne.then=="function")return K(H,B,P,Ls(ne),Se);if(ne.$$typeof===V)return K(H,B,P,zs(B,ne),Se);Us(B,ne)}return null}function pe(H,B,P,ne){for(var Se=null,Re=null,ve=B,Te=B=0,ke=null;ve!==null&&Te<P.length;Te++){ve.index>Te?(ke=ve,ve=null):ke=ve.sibling;var Oe=X(H,ve,P[Te],ne);if(Oe===null){ve===null&&(ve=ke);break}e&&ve&&Oe.alternate===null&&t(H,ve),B=f(Oe,B,Te),Re===null?Se=Oe:Re.sibling=Oe,Re=Oe,ve=ke}if(Te===P.length)return r(H,ve),Me&&Nn(H,Te),Se;if(ve===null){for(;Te<P.length;Te++)ve=se(H,P[Te],ne),ve!==null&&(B=f(ve,B,Te),Re===null?Se=ve:Re.sibling=ve,Re=ve);return Me&&Nn(H,Te),Se}for(ve=i(ve);Te<P.length;Te++)ke=K(ve,H,Te,P[Te],ne),ke!==null&&(e&&ke.alternate!==null&&ve.delete(ke.key===null?Te:ke.key),B=f(ke,B,Te),Re===null?Se=ke:Re.sibling=ke,Re=ke);return e&&ve.forEach(function(mr){return t(H,mr)}),Me&&Nn(H,Te),Se}function je(H,B,P,ne){if(P==null)throw Error(l(151));for(var Se=null,Re=null,ve=B,Te=B=0,ke=null,Oe=P.next();ve!==null&&!Oe.done;Te++,Oe=P.next()){ve.index>Te?(ke=ve,ve=null):ke=ve.sibling;var mr=X(H,ve,Oe.value,ne);if(mr===null){ve===null&&(ve=ke);break}e&&ve&&mr.alternate===null&&t(H,ve),B=f(mr,B,Te),Re===null?Se=mr:Re.sibling=mr,Re=mr,ve=ke}if(Oe.done)return r(H,ve),Me&&Nn(H,Te),Se;if(ve===null){for(;!Oe.done;Te++,Oe=P.next())Oe=se(H,Oe.value,ne),Oe!==null&&(B=f(Oe,B,Te),Re===null?Se=Oe:Re.sibling=Oe,Re=Oe);return Me&&Nn(H,Te),Se}for(ve=i(ve);!Oe.done;Te++,Oe=P.next())Oe=K(ve,H,Te,Oe.value,ne),Oe!==null&&(e&&Oe.alternate!==null&&ve.delete(Oe.key===null?Te:Oe.key),B=f(Oe,B,Te),Re===null?Se=Oe:Re.sibling=Oe,Re=Oe);return e&&ve.forEach(function(jj){return t(H,jj)}),Me&&Nn(H,Te),Se}function He(H,B,P,ne){if(typeof P=="object"&&P!==null&&P.type===N&&P.key===null&&(P=P.props.children),typeof P=="object"&&P!==null){switch(P.$$typeof){case E:e:{for(var Se=P.key;B!==null;){if(B.key===Se){if(Se=P.type,Se===N){if(B.tag===7){r(H,B.sibling),ne=u(B,P.props.children),ne.return=H,H=ne;break e}}else if(B.elementType===Se||typeof Se=="object"&&Se!==null&&Se.$$typeof===q&&Or(Se)===B.type){r(H,B.sibling),ne=u(B,P.props),mi(ne,P),ne.return=H,H=ne;break e}r(H,B);break}else t(H,B);B=B.sibling}P.type===N?(ne=Dr(P.props.children,H.mode,ne,P.key),ne.return=H,H=ne):(ne=Ms(P.type,P.key,P.props,null,H.mode,ne),mi(ne,P),ne.return=H,H=ne)}return y(H);case w:e:{for(Se=P.key;B!==null;){if(B.key===Se)if(B.tag===4&&B.stateNode.containerInfo===P.containerInfo&&B.stateNode.implementation===P.implementation){r(H,B.sibling),ne=u(B,P.children||[]),ne.return=H,H=ne;break e}else{r(H,B);break}else t(H,B);B=B.sibling}ne=cc(P,H.mode,ne),ne.return=H,H=ne}return y(H);case q:return P=Or(P),He(H,B,P,ne)}if(ye(P))return pe(H,B,P,ne);if(Z(P)){if(Se=Z(P),typeof Se!="function")throw Error(l(150));return P=Se.call(P),je(H,B,P,ne)}if(typeof P.then=="function")return He(H,B,Ls(P),ne);if(P.$$typeof===V)return He(H,B,zs(H,P),ne);Us(H,P)}return typeof P=="string"&&P!==""||typeof P=="number"||typeof P=="bigint"?(P=""+P,B!==null&&B.tag===6?(r(H,B.sibling),ne=u(B,P),ne.return=H,H=ne):(r(H,B),ne=oc(P,H.mode,ne),ne.return=H,H=ne),y(H)):r(H,B)}return function(H,B,P,ne){try{hi=0;var Se=He(H,B,P,ne);return pa=null,Se}catch(ve){if(ve===ma||ve===Vs)throw ve;var Re=zt(29,ve,null,H.mode);return Re.lanes=ne,Re.return=H,Re}finally{}}}var _r=gm(!0),ym=gm(!1),Jn=!1;function Sc(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function jc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Wn(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function In(e,t,r){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,(ze&2)!==0){var u=i.pending;return u===null?t.next=t:(t.next=u.next,u.next=t),i.pending=t,t=ks(e),em(e,null,r),t}return As(e,i,t,r),ks(e)}function pi(e,t,r){if(t=t.updateQueue,t!==null&&(t=t.shared,(r&4194048)!==0)){var i=t.lanes;i&=e.pendingLanes,r|=i,t.lanes=r,oh(e,r)}}function wc(e,t){var r=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,r===i)){var u=null,f=null;if(r=r.firstBaseUpdate,r!==null){do{var y={lane:r.lane,tag:r.tag,payload:r.payload,callback:null,next:null};f===null?u=f=y:f=f.next=y,r=r.next}while(r!==null);f===null?u=f=t:f=f.next=t}else u=f=t;r={baseState:i.baseState,firstBaseUpdate:u,lastBaseUpdate:f,shared:i.shared,callbacks:i.callbacks},e.updateQueue=r;return}e=r.lastBaseUpdate,e===null?r.firstBaseUpdate=t:e.next=t,r.lastBaseUpdate=t}var Ec=!1;function gi(){if(Ec){var e=ha;if(e!==null)throw e}}function yi(e,t,r,i){Ec=!1;var u=e.updateQueue;Jn=!1;var f=u.firstBaseUpdate,y=u.lastBaseUpdate,j=u.shared.pending;if(j!==null){u.shared.pending=null;var R=j,F=R.next;R.next=null,y===null?f=F:y.next=F,y=R;var I=e.alternate;I!==null&&(I=I.updateQueue,j=I.lastBaseUpdate,j!==y&&(j===null?I.firstBaseUpdate=F:j.next=F,I.lastBaseUpdate=R))}if(f!==null){var se=u.baseState;y=0,I=F=R=null,j=f;do{var X=j.lane&-536870913,K=X!==j.lane;if(K?(Ae&X)===X:(i&X)===X){X!==0&&X===fa&&(Ec=!0),I!==null&&(I=I.next={lane:0,tag:j.tag,payload:j.payload,callback:null,next:null});e:{var pe=e,je=j;X=t;var He=r;switch(je.tag){case 1:if(pe=je.payload,typeof pe=="function"){se=pe.call(He,se,X);break e}se=pe;break e;case 3:pe.flags=pe.flags&-65537|128;case 0:if(pe=je.payload,X=typeof pe=="function"?pe.call(He,se,X):pe,X==null)break e;se=x({},se,X);break e;case 2:Jn=!0}}X=j.callback,X!==null&&(e.flags|=64,K&&(e.flags|=8192),K=u.callbacks,K===null?u.callbacks=[X]:K.push(X))}else K={lane:X,tag:j.tag,payload:j.payload,callback:j.callback,next:null},I===null?(F=I=K,R=se):I=I.next=K,y|=X;if(j=j.next,j===null){if(j=u.shared.pending,j===null)break;K=j,j=K.next,K.next=null,u.lastBaseUpdate=K,u.shared.pending=null}}while(!0);I===null&&(R=se),u.baseState=R,u.firstBaseUpdate=F,u.lastBaseUpdate=I,f===null&&(u.shared.lanes=0),ar|=y,e.lanes=y,e.memoizedState=se}}function vm(e,t){if(typeof e!="function")throw Error(l(191,e));e.call(t)}function xm(e,t){var r=e.callbacks;if(r!==null)for(e.callbacks=null,e=0;e<r.length;e++)vm(r[e],t)}var ga=T(null),Hs=T(0);function bm(e,t){e=Ln,re(Hs,e),re(ga,t),Ln=e|t.baseLanes}function Tc(){re(Hs,Ln),re(ga,ga.current)}function Cc(){Ln=Hs.current,_(ga),_(Hs)}var _t=T(null),Qt=null;function er(e){var t=e.alternate;re(We,We.current&1),re(_t,e),Qt===null&&(t===null||ga.current!==null||t.memoizedState!==null)&&(Qt=e)}function Nc(e){re(We,We.current),re(_t,e),Qt===null&&(Qt=e)}function Sm(e){e.tag===22?(re(We,We.current),re(_t,e),Qt===null&&(Qt=e)):tr()}function tr(){re(We,We.current),re(_t,_t.current)}function Vt(e){_(_t),Qt===e&&(Qt=null),_(We)}var We=T(0);function qs(e){for(var t=e;t!==null;){if(t.tag===13){var r=t.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||Ou(r)||zu(r)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var kn=0,Ee=null,Le=null,tt=null,Ys=!1,ya=!1,Vr=!1,Ps=0,vi=0,va=null,fS=0;function Ke(){throw Error(l(321))}function Dc(e,t){if(t===null)return!1;for(var r=0;r<t.length&&r<e.length;r++)if(!Ot(e[r],t[r]))return!1;return!0}function Ac(e,t,r,i,u,f){return kn=f,Ee=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Y.H=e===null||e.memoizedState===null?ap:Gc,Vr=!1,f=r(i,u),Vr=!1,ya&&(f=wm(t,r,i,u)),jm(e),f}function jm(e){Y.H=Si;var t=Le!==null&&Le.next!==null;if(kn=0,tt=Le=Ee=null,Ys=!1,vi=0,va=null,t)throw Error(l(300));e===null||nt||(e=e.dependencies,e!==null&&Os(e)&&(nt=!0))}function wm(e,t,r,i){Ee=e;var u=0;do{if(ya&&(va=null),vi=0,ya=!1,25<=u)throw Error(l(301));if(u+=1,tt=Le=null,e.updateQueue!=null){var f=e.updateQueue;f.lastEffect=null,f.events=null,f.stores=null,f.memoCache!=null&&(f.memoCache.index=0)}Y.H=ip,f=t(r,i)}while(ya);return f}function hS(){var e=Y.H,t=e.useState()[0];return t=typeof t.then=="function"?xi(t):t,e=e.useState()[0],(Le!==null?Le.memoizedState:null)!==e&&(Ee.flags|=1024),t}function kc(){var e=Ps!==0;return Ps=0,e}function Mc(e,t,r){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~r}function Rc(e){if(Ys){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Ys=!1}kn=0,tt=Le=Ee=null,ya=!1,vi=Ps=0,va=null}function xt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return tt===null?Ee.memoizedState=tt=e:tt=tt.next=e,tt}function Ie(){if(Le===null){var e=Ee.alternate;e=e!==null?e.memoizedState:null}else e=Le.next;var t=tt===null?Ee.memoizedState:tt.next;if(t!==null)tt=t,Le=e;else{if(e===null)throw Ee.alternate===null?Error(l(467)):Error(l(310));Le=e,e={memoizedState:Le.memoizedState,baseState:Le.baseState,baseQueue:Le.baseQueue,queue:Le.queue,next:null},tt===null?Ee.memoizedState=tt=e:tt=tt.next=e}return tt}function Gs(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function xi(e){var t=vi;return vi+=1,va===null&&(va=[]),e=hm(va,e,t),t=Ee,(tt===null?t.memoizedState:tt.next)===null&&(t=t.alternate,Y.H=t===null||t.memoizedState===null?ap:Gc),e}function Fs(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return xi(e);if(e.$$typeof===V)return ft(e)}throw Error(l(438,String(e)))}function Oc(e){var t=null,r=Ee.updateQueue;if(r!==null&&(t=r.memoCache),t==null){var i=Ee.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(t={data:i.data.map(function(u){return u.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),r===null&&(r=Gs(),Ee.updateQueue=r),r.memoCache=t,r=t.data[t.index],r===void 0)for(r=t.data[t.index]=Array(e),i=0;i<e;i++)r[i]=O;return t.index++,r}function Mn(e,t){return typeof t=="function"?t(e):t}function Xs(e){var t=Ie();return zc(t,Le,e)}function zc(e,t,r){var i=e.queue;if(i===null)throw Error(l(311));i.lastRenderedReducer=r;var u=e.baseQueue,f=i.pending;if(f!==null){if(u!==null){var y=u.next;u.next=f.next,f.next=y}t.baseQueue=u=f,i.pending=null}if(f=e.baseState,u===null)e.memoizedState=f;else{t=u.next;var j=y=null,R=null,F=t,I=!1;do{var se=F.lane&-536870913;if(se!==F.lane?(Ae&se)===se:(kn&se)===se){var X=F.revertLane;if(X===0)R!==null&&(R=R.next={lane:0,revertLane:0,gesture:null,action:F.action,hasEagerState:F.hasEagerState,eagerState:F.eagerState,next:null}),se===fa&&(I=!0);else if((kn&X)===X){F=F.next,X===fa&&(I=!0);continue}else se={lane:0,revertLane:F.revertLane,gesture:null,action:F.action,hasEagerState:F.hasEagerState,eagerState:F.eagerState,next:null},R===null?(j=R=se,y=f):R=R.next=se,Ee.lanes|=X,ar|=X;se=F.action,Vr&&r(f,se),f=F.hasEagerState?F.eagerState:r(f,se)}else X={lane:se,revertLane:F.revertLane,gesture:F.gesture,action:F.action,hasEagerState:F.hasEagerState,eagerState:F.eagerState,next:null},R===null?(j=R=X,y=f):R=R.next=X,Ee.lanes|=se,ar|=se;F=F.next}while(F!==null&&F!==t);if(R===null?y=f:R.next=j,!Ot(f,e.memoizedState)&&(nt=!0,I&&(r=ha,r!==null)))throw r;e.memoizedState=f,e.baseState=y,e.baseQueue=R,i.lastRenderedState=f}return u===null&&(i.lanes=0),[e.memoizedState,i.dispatch]}function _c(e){var t=Ie(),r=t.queue;if(r===null)throw Error(l(311));r.lastRenderedReducer=e;var i=r.dispatch,u=r.pending,f=t.memoizedState;if(u!==null){r.pending=null;var y=u=u.next;do f=e(f,y.action),y=y.next;while(y!==u);Ot(f,t.memoizedState)||(nt=!0),t.memoizedState=f,t.baseQueue===null&&(t.baseState=f),r.lastRenderedState=f}return[f,i]}function Em(e,t,r){var i=Ee,u=Ie(),f=Me;if(f){if(r===void 0)throw Error(l(407));r=r()}else r=t();var y=!Ot((Le||u).memoizedState,r);if(y&&(u.memoizedState=r,nt=!0),u=u.queue,Lc(Nm.bind(null,i,u,e),[e]),u.getSnapshot!==t||y||tt!==null&&tt.memoizedState.tag&1){if(i.flags|=2048,xa(9,{destroy:void 0},Cm.bind(null,i,u,r,t),null),Ye===null)throw Error(l(349));f||(kn&127)!==0||Tm(i,t,r)}return r}function Tm(e,t,r){e.flags|=16384,e={getSnapshot:t,value:r},t=Ee.updateQueue,t===null?(t=Gs(),Ee.updateQueue=t,t.stores=[e]):(r=t.stores,r===null?t.stores=[e]:r.push(e))}function Cm(e,t,r,i){t.value=r,t.getSnapshot=i,Dm(t)&&Am(e)}function Nm(e,t,r){return r(function(){Dm(t)&&Am(e)})}function Dm(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!Ot(e,r)}catch{return!0}}function Am(e){var t=Nr(e,2);t!==null&&At(t,e,2)}function Vc(e){var t=xt();if(typeof e=="function"){var r=e;if(e=r(),Vr){Gn(!0);try{r()}finally{Gn(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Mn,lastRenderedState:e},t}function km(e,t,r,i){return e.baseState=r,zc(e,Le,typeof i=="function"?i:Mn)}function mS(e,t,r,i,u){if(Zs(e))throw Error(l(485));if(e=t.action,e!==null){var f={payload:u,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(y){f.listeners.push(y)}};Y.T!==null?r(!0):f.isTransition=!1,i(f),r=t.pending,r===null?(f.next=t.pending=f,Mm(t,f)):(f.next=r.next,t.pending=r.next=f)}}function Mm(e,t){var r=t.action,i=t.payload,u=e.state;if(t.isTransition){var f=Y.T,y={};Y.T=y;try{var j=r(u,i),R=Y.S;R!==null&&R(y,j),Rm(e,t,j)}catch(F){Bc(e,t,F)}finally{f!==null&&y.types!==null&&(f.types=y.types),Y.T=f}}else try{f=r(u,i),Rm(e,t,f)}catch(F){Bc(e,t,F)}}function Rm(e,t,r){r!==null&&typeof r=="object"&&typeof r.then=="function"?r.then(function(i){Om(e,t,i)},function(i){return Bc(e,t,i)}):Om(e,t,r)}function Om(e,t,r){t.status="fulfilled",t.value=r,zm(t),e.state=r,t=e.pending,t!==null&&(r=t.next,r===t?e.pending=null:(r=r.next,t.next=r,Mm(e,r)))}function Bc(e,t,r){var i=e.pending;if(e.pending=null,i!==null){i=i.next;do t.status="rejected",t.reason=r,zm(t),t=t.next;while(t!==i)}e.action=null}function zm(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function _m(e,t){return t}function Vm(e,t){if(Me){var r=Ye.formState;if(r!==null){e:{var i=Ee;if(Me){if(Fe){t:{for(var u=Fe,f=Zt;u.nodeType!==8;){if(!f){u=null;break t}if(u=Jt(u.nextSibling),u===null){u=null;break t}}f=u.data,u=f==="F!"||f==="F"?u:null}if(u){Fe=Jt(u.nextSibling),i=u.data==="F!";break e}}Zn(i)}i=!1}i&&(t=r[0])}}return r=xt(),r.memoizedState=r.baseState=t,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:_m,lastRenderedState:t},r.queue=i,r=tp.bind(null,Ee,i),i.dispatch=r,i=Vc(!1),f=Pc.bind(null,Ee,!1,i.queue),i=xt(),u={state:t,dispatch:null,action:e,pending:null},i.queue=u,r=mS.bind(null,Ee,u,f,r),u.dispatch=r,i.memoizedState=e,[t,r,!1]}function Bm(e){var t=Ie();return Lm(t,Le,e)}function Lm(e,t,r){if(t=zc(e,t,_m)[0],e=Xs(Mn)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var i=xi(t)}catch(y){throw y===ma?Vs:y}else i=t;t=Ie();var u=t.queue,f=u.dispatch;return r!==t.memoizedState&&(Ee.flags|=2048,xa(9,{destroy:void 0},pS.bind(null,u,r),null)),[i,f,e]}function pS(e,t){e.action=t}function Um(e){var t=Ie(),r=Le;if(r!==null)return Lm(t,r,e);Ie(),t=t.memoizedState,r=Ie();var i=r.queue.dispatch;return r.memoizedState=e,[t,i,!1]}function xa(e,t,r,i){return e={tag:e,create:r,deps:i,inst:t,next:null},t=Ee.updateQueue,t===null&&(t=Gs(),Ee.updateQueue=t),r=t.lastEffect,r===null?t.lastEffect=e.next=e:(i=r.next,r.next=e,e.next=i,t.lastEffect=e),e}function Hm(){return Ie().memoizedState}function $s(e,t,r,i){var u=xt();Ee.flags|=e,u.memoizedState=xa(1|t,{destroy:void 0},r,i===void 0?null:i)}function Ks(e,t,r,i){var u=Ie();i=i===void 0?null:i;var f=u.memoizedState.inst;Le!==null&&i!==null&&Dc(i,Le.memoizedState.deps)?u.memoizedState=xa(t,f,r,i):(Ee.flags|=e,u.memoizedState=xa(1|t,f,r,i))}function qm(e,t){$s(8390656,8,e,t)}function Lc(e,t){Ks(2048,8,e,t)}function gS(e){Ee.flags|=4;var t=Ee.updateQueue;if(t===null)t=Gs(),Ee.updateQueue=t,t.events=[e];else{var r=t.events;r===null?t.events=[e]:r.push(e)}}function Ym(e){var t=Ie().memoizedState;return gS({ref:t,nextImpl:e}),function(){if((ze&2)!==0)throw Error(l(440));return t.impl.apply(void 0,arguments)}}function Pm(e,t){return Ks(4,2,e,t)}function Gm(e,t){return Ks(4,4,e,t)}function Fm(e,t){if(typeof t=="function"){e=e();var r=t(e);return function(){typeof r=="function"?r():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Xm(e,t,r){r=r!=null?r.concat([e]):null,Ks(4,4,Fm.bind(null,t,e),r)}function Uc(){}function $m(e,t){var r=Ie();t=t===void 0?null:t;var i=r.memoizedState;return t!==null&&Dc(t,i[1])?i[0]:(r.memoizedState=[e,t],e)}function Km(e,t){var r=Ie();t=t===void 0?null:t;var i=r.memoizedState;if(t!==null&&Dc(t,i[1]))return i[0];if(i=e(),Vr){Gn(!0);try{e()}finally{Gn(!1)}}return r.memoizedState=[i,t],i}function Hc(e,t,r){return r===void 0||(kn&1073741824)!==0&&(Ae&261930)===0?e.memoizedState=t:(e.memoizedState=r,e=Zp(),Ee.lanes|=e,ar|=e,r)}function Zm(e,t,r,i){return Ot(r,t)?r:ga.current!==null?(e=Hc(e,r,i),Ot(e,t)||(nt=!0),e):(kn&42)===0||(kn&1073741824)!==0&&(Ae&261930)===0?(nt=!0,e.memoizedState=r):(e=Zp(),Ee.lanes|=e,ar|=e,t)}function Qm(e,t,r,i,u){var f=ae.p;ae.p=f!==0&&8>f?f:8;var y=Y.T,j={};Y.T=j,Pc(e,!1,t,r);try{var R=u(),F=Y.S;if(F!==null&&F(j,R),R!==null&&typeof R=="object"&&typeof R.then=="function"){var I=dS(R,i);bi(e,t,I,Ut(e))}else bi(e,t,i,Ut(e))}catch(se){bi(e,t,{then:function(){},status:"rejected",reason:se},Ut())}finally{ae.p=f,y!==null&&j.types!==null&&(y.types=j.types),Y.T=y}}function yS(){}function qc(e,t,r,i){if(e.tag!==5)throw Error(l(476));var u=Jm(e).queue;Qm(e,u,t,W,r===null?yS:function(){return Wm(e),r(i)})}function Jm(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:W,baseState:W,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Mn,lastRenderedState:W},next:null};var r={};return t.next={memoizedState:r,baseState:r,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Mn,lastRenderedState:r},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Wm(e){var t=Jm(e);t.next===null&&(t=e.alternate.memoizedState),bi(e,t.next.queue,{},Ut())}function Yc(){return ft(Bi)}function Im(){return Ie().memoizedState}function ep(){return Ie().memoizedState}function vS(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var r=Ut();e=Wn(r);var i=In(t,e,r);i!==null&&(At(i,t,r),pi(i,t,r)),t={cache:yc()},e.payload=t;return}t=t.return}}function xS(e,t,r){var i=Ut();r={lane:i,revertLane:0,gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},Zs(e)?np(t,r):(r=sc(e,t,r,i),r!==null&&(At(r,e,i),rp(r,t,i)))}function tp(e,t,r){var i=Ut();bi(e,t,r,i)}function bi(e,t,r,i){var u={lane:i,revertLane:0,gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null};if(Zs(e))np(t,u);else{var f=e.alternate;if(e.lanes===0&&(f===null||f.lanes===0)&&(f=t.lastRenderedReducer,f!==null))try{var y=t.lastRenderedState,j=f(y,r);if(u.hasEagerState=!0,u.eagerState=j,Ot(j,y))return As(e,t,u,0),Ye===null&&Ds(),!1}catch{}finally{}if(r=sc(e,t,u,i),r!==null)return At(r,e,i),rp(r,t,i),!0}return!1}function Pc(e,t,r,i){if(i={lane:2,revertLane:Su(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},Zs(e)){if(t)throw Error(l(479))}else t=sc(e,r,i,2),t!==null&&At(t,e,2)}function Zs(e){var t=e.alternate;return e===Ee||t!==null&&t===Ee}function np(e,t){ya=Ys=!0;var r=e.pending;r===null?t.next=t:(t.next=r.next,r.next=t),e.pending=t}function rp(e,t,r){if((r&4194048)!==0){var i=t.lanes;i&=e.pendingLanes,r|=i,t.lanes=r,oh(e,r)}}var Si={readContext:ft,use:Fs,useCallback:Ke,useContext:Ke,useEffect:Ke,useImperativeHandle:Ke,useLayoutEffect:Ke,useInsertionEffect:Ke,useMemo:Ke,useReducer:Ke,useRef:Ke,useState:Ke,useDebugValue:Ke,useDeferredValue:Ke,useTransition:Ke,useSyncExternalStore:Ke,useId:Ke,useHostTransitionStatus:Ke,useFormState:Ke,useActionState:Ke,useOptimistic:Ke,useMemoCache:Ke,useCacheRefresh:Ke};Si.useEffectEvent=Ke;var ap={readContext:ft,use:Fs,useCallback:function(e,t){return xt().memoizedState=[e,t===void 0?null:t],e},useContext:ft,useEffect:qm,useImperativeHandle:function(e,t,r){r=r!=null?r.concat([e]):null,$s(4194308,4,Fm.bind(null,t,e),r)},useLayoutEffect:function(e,t){return $s(4194308,4,e,t)},useInsertionEffect:function(e,t){$s(4,2,e,t)},useMemo:function(e,t){var r=xt();t=t===void 0?null:t;var i=e();if(Vr){Gn(!0);try{e()}finally{Gn(!1)}}return r.memoizedState=[i,t],i},useReducer:function(e,t,r){var i=xt();if(r!==void 0){var u=r(t);if(Vr){Gn(!0);try{r(t)}finally{Gn(!1)}}}else u=t;return i.memoizedState=i.baseState=u,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:u},i.queue=e,e=e.dispatch=xS.bind(null,Ee,e),[i.memoizedState,e]},useRef:function(e){var t=xt();return e={current:e},t.memoizedState=e},useState:function(e){e=Vc(e);var t=e.queue,r=tp.bind(null,Ee,t);return t.dispatch=r,[e.memoizedState,r]},useDebugValue:Uc,useDeferredValue:function(e,t){var r=xt();return Hc(r,e,t)},useTransition:function(){var e=Vc(!1);return e=Qm.bind(null,Ee,e.queue,!0,!1),xt().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,r){var i=Ee,u=xt();if(Me){if(r===void 0)throw Error(l(407));r=r()}else{if(r=t(),Ye===null)throw Error(l(349));(Ae&127)!==0||Tm(i,t,r)}u.memoizedState=r;var f={value:r,getSnapshot:t};return u.queue=f,qm(Nm.bind(null,i,f,e),[e]),i.flags|=2048,xa(9,{destroy:void 0},Cm.bind(null,i,f,r,t),null),r},useId:function(){var e=xt(),t=Ye.identifierPrefix;if(Me){var r=fn,i=dn;r=(i&~(1<<32-Rt(i)-1)).toString(32)+r,t="_"+t+"R_"+r,r=Ps++,0<r&&(t+="H"+r.toString(32)),t+="_"}else r=fS++,t="_"+t+"r_"+r.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:Yc,useFormState:Vm,useActionState:Vm,useOptimistic:function(e){var t=xt();t.memoizedState=t.baseState=e;var r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=r,t=Pc.bind(null,Ee,!0,r),r.dispatch=t,[e,t]},useMemoCache:Oc,useCacheRefresh:function(){return xt().memoizedState=vS.bind(null,Ee)},useEffectEvent:function(e){var t=xt(),r={impl:e};return t.memoizedState=r,function(){if((ze&2)!==0)throw Error(l(440));return r.impl.apply(void 0,arguments)}}},Gc={readContext:ft,use:Fs,useCallback:$m,useContext:ft,useEffect:Lc,useImperativeHandle:Xm,useInsertionEffect:Pm,useLayoutEffect:Gm,useMemo:Km,useReducer:Xs,useRef:Hm,useState:function(){return Xs(Mn)},useDebugValue:Uc,useDeferredValue:function(e,t){var r=Ie();return Zm(r,Le.memoizedState,e,t)},useTransition:function(){var e=Xs(Mn)[0],t=Ie().memoizedState;return[typeof e=="boolean"?e:xi(e),t]},useSyncExternalStore:Em,useId:Im,useHostTransitionStatus:Yc,useFormState:Bm,useActionState:Bm,useOptimistic:function(e,t){var r=Ie();return km(r,Le,e,t)},useMemoCache:Oc,useCacheRefresh:ep};Gc.useEffectEvent=Ym;var ip={readContext:ft,use:Fs,useCallback:$m,useContext:ft,useEffect:Lc,useImperativeHandle:Xm,useInsertionEffect:Pm,useLayoutEffect:Gm,useMemo:Km,useReducer:_c,useRef:Hm,useState:function(){return _c(Mn)},useDebugValue:Uc,useDeferredValue:function(e,t){var r=Ie();return Le===null?Hc(r,e,t):Zm(r,Le.memoizedState,e,t)},useTransition:function(){var e=_c(Mn)[0],t=Ie().memoizedState;return[typeof e=="boolean"?e:xi(e),t]},useSyncExternalStore:Em,useId:Im,useHostTransitionStatus:Yc,useFormState:Um,useActionState:Um,useOptimistic:function(e,t){var r=Ie();return Le!==null?km(r,Le,e,t):(r.baseState=e,[e,r.queue.dispatch])},useMemoCache:Oc,useCacheRefresh:ep};ip.useEffectEvent=Ym;function Fc(e,t,r,i){t=e.memoizedState,r=r(i,t),r=r==null?t:x({},t,r),e.memoizedState=r,e.lanes===0&&(e.updateQueue.baseState=r)}var Xc={enqueueSetState:function(e,t,r){e=e._reactInternals;var i=Ut(),u=Wn(i);u.payload=t,r!=null&&(u.callback=r),t=In(e,u,i),t!==null&&(At(t,e,i),pi(t,e,i))},enqueueReplaceState:function(e,t,r){e=e._reactInternals;var i=Ut(),u=Wn(i);u.tag=1,u.payload=t,r!=null&&(u.callback=r),t=In(e,u,i),t!==null&&(At(t,e,i),pi(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var r=Ut(),i=Wn(r);i.tag=2,t!=null&&(i.callback=t),t=In(e,i,r),t!==null&&(At(t,e,r),pi(t,e,r))}};function sp(e,t,r,i,u,f,y){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,f,y):t.prototype&&t.prototype.isPureReactComponent?!li(r,i)||!li(u,f):!0}function lp(e,t,r,i){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(r,i),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(r,i),t.state!==e&&Xc.enqueueReplaceState(t,t.state,null)}function Br(e,t){var r=t;if("ref"in t){r={};for(var i in t)i!=="ref"&&(r[i]=t[i])}if(e=e.defaultProps){r===t&&(r=x({},r));for(var u in e)r[u]===void 0&&(r[u]=e[u])}return r}function op(e){Ns(e)}function cp(e){console.error(e)}function up(e){Ns(e)}function Qs(e,t){try{var r=e.onUncaughtError;r(t.value,{componentStack:t.stack})}catch(i){setTimeout(function(){throw i})}}function dp(e,t,r){try{var i=e.onCaughtError;i(r.value,{componentStack:r.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function $c(e,t,r){return r=Wn(r),r.tag=3,r.payload={element:null},r.callback=function(){Qs(e,t)},r}function fp(e){return e=Wn(e),e.tag=3,e}function hp(e,t,r,i){var u=r.type.getDerivedStateFromError;if(typeof u=="function"){var f=i.value;e.payload=function(){return u(f)},e.callback=function(){dp(t,r,i)}}var y=r.stateNode;y!==null&&typeof y.componentDidCatch=="function"&&(e.callback=function(){dp(t,r,i),typeof u!="function"&&(ir===null?ir=new Set([this]):ir.add(this));var j=i.stack;this.componentDidCatch(i.value,{componentStack:j!==null?j:""})})}function bS(e,t,r,i,u){if(r.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(t=r.alternate,t!==null&&da(t,r,u,!0),r=_t.current,r!==null){switch(r.tag){case 31:case 13:return Qt===null?ol():r.alternate===null&&Ze===0&&(Ze=3),r.flags&=-257,r.flags|=65536,r.lanes=u,i===Bs?r.flags|=16384:(t=r.updateQueue,t===null?r.updateQueue=new Set([i]):t.add(i),vu(e,i,u)),!1;case 22:return r.flags|=65536,i===Bs?r.flags|=16384:(t=r.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([i])},r.updateQueue=t):(r=t.retryQueue,r===null?t.retryQueue=new Set([i]):r.add(i)),vu(e,i,u)),!1}throw Error(l(435,r.tag))}return vu(e,i,u),ol(),!1}if(Me)return t=_t.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=u,i!==fc&&(e=Error(l(422),{cause:i}),ui(Xt(e,r)))):(i!==fc&&(t=Error(l(423),{cause:i}),ui(Xt(t,r))),e=e.current.alternate,e.flags|=65536,u&=-u,e.lanes|=u,i=Xt(i,r),u=$c(e.stateNode,i,u),wc(e,u),Ze!==4&&(Ze=2)),!1;var f=Error(l(520),{cause:i});if(f=Xt(f,r),Ai===null?Ai=[f]:Ai.push(f),Ze!==4&&(Ze=2),t===null)return!0;i=Xt(i,r),r=t;do{switch(r.tag){case 3:return r.flags|=65536,e=u&-u,r.lanes|=e,e=$c(r.stateNode,i,e),wc(r,e),!1;case 1:if(t=r.type,f=r.stateNode,(r.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(ir===null||!ir.has(f))))return r.flags|=65536,u&=-u,r.lanes|=u,u=fp(u),hp(u,e,r,i),wc(r,u),!1}r=r.return}while(r!==null);return!1}var Kc=Error(l(461)),nt=!1;function ht(e,t,r,i){t.child=e===null?ym(t,null,r,i):_r(t,e.child,r,i)}function mp(e,t,r,i,u){r=r.render;var f=t.ref;if("ref"in i){var y={};for(var j in i)j!=="ref"&&(y[j]=i[j])}else y=i;return Mr(t),i=Ac(e,t,r,y,f,u),j=kc(),e!==null&&!nt?(Mc(e,t,u),Rn(e,t,u)):(Me&&j&&uc(t),t.flags|=1,ht(e,t,i,u),t.child)}function pp(e,t,r,i,u){if(e===null){var f=r.type;return typeof f=="function"&&!lc(f)&&f.defaultProps===void 0&&r.compare===null?(t.tag=15,t.type=f,gp(e,t,f,i,u)):(e=Ms(r.type,null,i,t,t.mode,u),e.ref=t.ref,e.return=t,t.child=e)}if(f=e.child,!nu(e,u)){var y=f.memoizedProps;if(r=r.compare,r=r!==null?r:li,r(y,i)&&e.ref===t.ref)return Rn(e,t,u)}return t.flags|=1,e=Cn(f,i),e.ref=t.ref,e.return=t,t.child=e}function gp(e,t,r,i,u){if(e!==null){var f=e.memoizedProps;if(li(f,i)&&e.ref===t.ref)if(nt=!1,t.pendingProps=i=f,nu(e,u))(e.flags&131072)!==0&&(nt=!0);else return t.lanes=e.lanes,Rn(e,t,u)}return Zc(e,t,r,i,u)}function yp(e,t,r,i){var u=i.children,f=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if((t.flags&128)!==0){if(f=f!==null?f.baseLanes|r:r,e!==null){for(i=t.child=e.child,u=0;i!==null;)u=u|i.lanes|i.childLanes,i=i.sibling;i=u&~f}else i=0,t.child=null;return vp(e,t,f,r,i)}if((r&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&_s(t,f!==null?f.cachePool:null),f!==null?bm(t,f):Tc(),Sm(t);else return i=t.lanes=536870912,vp(e,t,f!==null?f.baseLanes|r:r,r,i)}else f!==null?(_s(t,f.cachePool),bm(t,f),tr(),t.memoizedState=null):(e!==null&&_s(t,null),Tc(),tr());return ht(e,t,u,r),t.child}function ji(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function vp(e,t,r,i,u){var f=xc();return f=f===null?null:{parent:et._currentValue,pool:f},t.memoizedState={baseLanes:r,cachePool:f},e!==null&&_s(t,null),Tc(),Sm(t),e!==null&&da(e,t,i,!0),t.childLanes=u,null}function Js(e,t){return t=Is({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function xp(e,t,r){return _r(t,e.child,null,r),e=Js(t,t.pendingProps),e.flags|=2,Vt(t),t.memoizedState=null,e}function SS(e,t,r){var i=t.pendingProps,u=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(Me){if(i.mode==="hidden")return e=Js(t,i),t.lanes=536870912,ji(null,e);if(Nc(t),(e=Fe)?(e=Mg(e,Zt),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:$n!==null?{id:dn,overflow:fn}:null,retryLane:536870912,hydrationErrors:null},r=nm(e),r.return=t,t.child=r,dt=t,Fe=null)):e=null,e===null)throw Zn(t);return t.lanes=536870912,null}return Js(t,i)}var f=e.memoizedState;if(f!==null){var y=f.dehydrated;if(Nc(t),u)if(t.flags&256)t.flags&=-257,t=xp(e,t,r);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(l(558));else if(nt||da(e,t,r,!1),u=(r&e.childLanes)!==0,nt||u){if(i=Ye,i!==null&&(y=ch(i,r),y!==0&&y!==f.retryLane))throw f.retryLane=y,Nr(e,y),At(i,e,y),Kc;ol(),t=xp(e,t,r)}else e=f.treeContext,Fe=Jt(y.nextSibling),dt=t,Me=!0,Kn=null,Zt=!1,e!==null&&im(t,e),t=Js(t,i),t.flags|=4096;return t}return e=Cn(e.child,{mode:i.mode,children:i.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Ws(e,t){var r=t.ref;if(r===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof r!="function"&&typeof r!="object")throw Error(l(284));(e===null||e.ref!==r)&&(t.flags|=4194816)}}function Zc(e,t,r,i,u){return Mr(t),r=Ac(e,t,r,i,void 0,u),i=kc(),e!==null&&!nt?(Mc(e,t,u),Rn(e,t,u)):(Me&&i&&uc(t),t.flags|=1,ht(e,t,r,u),t.child)}function bp(e,t,r,i,u,f){return Mr(t),t.updateQueue=null,r=wm(t,i,r,u),jm(e),i=kc(),e!==null&&!nt?(Mc(e,t,f),Rn(e,t,f)):(Me&&i&&uc(t),t.flags|=1,ht(e,t,r,f),t.child)}function Sp(e,t,r,i,u){if(Mr(t),t.stateNode===null){var f=la,y=r.contextType;typeof y=="object"&&y!==null&&(f=ft(y)),f=new r(i,f),t.memoizedState=f.state!==null&&f.state!==void 0?f.state:null,f.updater=Xc,t.stateNode=f,f._reactInternals=t,f=t.stateNode,f.props=i,f.state=t.memoizedState,f.refs={},Sc(t),y=r.contextType,f.context=typeof y=="object"&&y!==null?ft(y):la,f.state=t.memoizedState,y=r.getDerivedStateFromProps,typeof y=="function"&&(Fc(t,r,y,i),f.state=t.memoizedState),typeof r.getDerivedStateFromProps=="function"||typeof f.getSnapshotBeforeUpdate=="function"||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(y=f.state,typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount(),y!==f.state&&Xc.enqueueReplaceState(f,f.state,null),yi(t,i,f,u),gi(),f.state=t.memoizedState),typeof f.componentDidMount=="function"&&(t.flags|=4194308),i=!0}else if(e===null){f=t.stateNode;var j=t.memoizedProps,R=Br(r,j);f.props=R;var F=f.context,I=r.contextType;y=la,typeof I=="object"&&I!==null&&(y=ft(I));var se=r.getDerivedStateFromProps;I=typeof se=="function"||typeof f.getSnapshotBeforeUpdate=="function",j=t.pendingProps!==j,I||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(j||F!==y)&&lp(t,f,i,y),Jn=!1;var X=t.memoizedState;f.state=X,yi(t,i,f,u),gi(),F=t.memoizedState,j||X!==F||Jn?(typeof se=="function"&&(Fc(t,r,se,i),F=t.memoizedState),(R=Jn||sp(t,r,R,i,X,F,y))?(I||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount()),typeof f.componentDidMount=="function"&&(t.flags|=4194308)):(typeof f.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=i,t.memoizedState=F),f.props=i,f.state=F,f.context=y,i=R):(typeof f.componentDidMount=="function"&&(t.flags|=4194308),i=!1)}else{f=t.stateNode,jc(e,t),y=t.memoizedProps,I=Br(r,y),f.props=I,se=t.pendingProps,X=f.context,F=r.contextType,R=la,typeof F=="object"&&F!==null&&(R=ft(F)),j=r.getDerivedStateFromProps,(F=typeof j=="function"||typeof f.getSnapshotBeforeUpdate=="function")||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(y!==se||X!==R)&&lp(t,f,i,R),Jn=!1,X=t.memoizedState,f.state=X,yi(t,i,f,u),gi();var K=t.memoizedState;y!==se||X!==K||Jn||e!==null&&e.dependencies!==null&&Os(e.dependencies)?(typeof j=="function"&&(Fc(t,r,j,i),K=t.memoizedState),(I=Jn||sp(t,r,I,i,X,K,R)||e!==null&&e.dependencies!==null&&Os(e.dependencies))?(F||typeof f.UNSAFE_componentWillUpdate!="function"&&typeof f.componentWillUpdate!="function"||(typeof f.componentWillUpdate=="function"&&f.componentWillUpdate(i,K,R),typeof f.UNSAFE_componentWillUpdate=="function"&&f.UNSAFE_componentWillUpdate(i,K,R)),typeof f.componentDidUpdate=="function"&&(t.flags|=4),typeof f.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof f.componentDidUpdate!="function"||y===e.memoizedProps&&X===e.memoizedState||(t.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&X===e.memoizedState||(t.flags|=1024),t.memoizedProps=i,t.memoizedState=K),f.props=i,f.state=K,f.context=R,i=I):(typeof f.componentDidUpdate!="function"||y===e.memoizedProps&&X===e.memoizedState||(t.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&X===e.memoizedState||(t.flags|=1024),i=!1)}return f=i,Ws(e,t),i=(t.flags&128)!==0,f||i?(f=t.stateNode,r=i&&typeof r.getDerivedStateFromError!="function"?null:f.render(),t.flags|=1,e!==null&&i?(t.child=_r(t,e.child,null,u),t.child=_r(t,null,r,u)):ht(e,t,r,u),t.memoizedState=f.state,e=t.child):e=Rn(e,t,u),e}function jp(e,t,r,i){return Ar(),t.flags|=256,ht(e,t,r,i),t.child}var Qc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Jc(e){return{baseLanes:e,cachePool:dm()}}function Wc(e,t,r){return e=e!==null?e.childLanes&~r:0,t&&(e|=Lt),e}function wp(e,t,r){var i=t.pendingProps,u=!1,f=(t.flags&128)!==0,y;if((y=f)||(y=e!==null&&e.memoizedState===null?!1:(We.current&2)!==0),y&&(u=!0,t.flags&=-129),y=(t.flags&32)!==0,t.flags&=-33,e===null){if(Me){if(u?er(t):tr(),(e=Fe)?(e=Mg(e,Zt),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:$n!==null?{id:dn,overflow:fn}:null,retryLane:536870912,hydrationErrors:null},r=nm(e),r.return=t,t.child=r,dt=t,Fe=null)):e=null,e===null)throw Zn(t);return zu(e)?t.lanes=32:t.lanes=536870912,null}var j=i.children;return i=i.fallback,u?(tr(),u=t.mode,j=Is({mode:"hidden",children:j},u),i=Dr(i,u,r,null),j.return=t,i.return=t,j.sibling=i,t.child=j,i=t.child,i.memoizedState=Jc(r),i.childLanes=Wc(e,y,r),t.memoizedState=Qc,ji(null,i)):(er(t),Ic(t,j))}var R=e.memoizedState;if(R!==null&&(j=R.dehydrated,j!==null)){if(f)t.flags&256?(er(t),t.flags&=-257,t=eu(e,t,r)):t.memoizedState!==null?(tr(),t.child=e.child,t.flags|=128,t=null):(tr(),j=i.fallback,u=t.mode,i=Is({mode:"visible",children:i.children},u),j=Dr(j,u,r,null),j.flags|=2,i.return=t,j.return=t,i.sibling=j,t.child=i,_r(t,e.child,null,r),i=t.child,i.memoizedState=Jc(r),i.childLanes=Wc(e,y,r),t.memoizedState=Qc,t=ji(null,i));else if(er(t),zu(j)){if(y=j.nextSibling&&j.nextSibling.dataset,y)var F=y.dgst;y=F,i=Error(l(419)),i.stack="",i.digest=y,ui({value:i,source:null,stack:null}),t=eu(e,t,r)}else if(nt||da(e,t,r,!1),y=(r&e.childLanes)!==0,nt||y){if(y=Ye,y!==null&&(i=ch(y,r),i!==0&&i!==R.retryLane))throw R.retryLane=i,Nr(e,i),At(y,e,i),Kc;Ou(j)||ol(),t=eu(e,t,r)}else Ou(j)?(t.flags|=192,t.child=e.child,t=null):(e=R.treeContext,Fe=Jt(j.nextSibling),dt=t,Me=!0,Kn=null,Zt=!1,e!==null&&im(t,e),t=Ic(t,i.children),t.flags|=4096);return t}return u?(tr(),j=i.fallback,u=t.mode,R=e.child,F=R.sibling,i=Cn(R,{mode:"hidden",children:i.children}),i.subtreeFlags=R.subtreeFlags&65011712,F!==null?j=Cn(F,j):(j=Dr(j,u,r,null),j.flags|=2),j.return=t,i.return=t,i.sibling=j,t.child=i,ji(null,i),i=t.child,j=e.child.memoizedState,j===null?j=Jc(r):(u=j.cachePool,u!==null?(R=et._currentValue,u=u.parent!==R?{parent:R,pool:R}:u):u=dm(),j={baseLanes:j.baseLanes|r,cachePool:u}),i.memoizedState=j,i.childLanes=Wc(e,y,r),t.memoizedState=Qc,ji(e.child,i)):(er(t),r=e.child,e=r.sibling,r=Cn(r,{mode:"visible",children:i.children}),r.return=t,r.sibling=null,e!==null&&(y=t.deletions,y===null?(t.deletions=[e],t.flags|=16):y.push(e)),t.child=r,t.memoizedState=null,r)}function Ic(e,t){return t=Is({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function Is(e,t){return e=zt(22,e,null,t),e.lanes=0,e}function eu(e,t,r){return _r(t,e.child,null,r),e=Ic(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Ep(e,t,r){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t),pc(e.return,t,r)}function tu(e,t,r,i,u,f){var y=e.memoizedState;y===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:i,tail:r,tailMode:u,treeForkCount:f}:(y.isBackwards=t,y.rendering=null,y.renderingStartTime=0,y.last=i,y.tail=r,y.tailMode=u,y.treeForkCount=f)}function Tp(e,t,r){var i=t.pendingProps,u=i.revealOrder,f=i.tail;i=i.children;var y=We.current,j=(y&2)!==0;if(j?(y=y&1|2,t.flags|=128):y&=1,re(We,y),ht(e,t,i,r),i=Me?ci:0,!j&&e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ep(e,r,t);else if(e.tag===19)Ep(e,r,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(u){case"forwards":for(r=t.child,u=null;r!==null;)e=r.alternate,e!==null&&qs(e)===null&&(u=r),r=r.sibling;r=u,r===null?(u=t.child,t.child=null):(u=r.sibling,r.sibling=null),tu(t,!1,u,r,f,i);break;case"backwards":case"unstable_legacy-backwards":for(r=null,u=t.child,t.child=null;u!==null;){if(e=u.alternate,e!==null&&qs(e)===null){t.child=u;break}e=u.sibling,u.sibling=r,r=u,u=e}tu(t,!0,r,null,f,i);break;case"together":tu(t,!1,null,null,void 0,i);break;default:t.memoizedState=null}return t.child}function Rn(e,t,r){if(e!==null&&(t.dependencies=e.dependencies),ar|=t.lanes,(r&t.childLanes)===0)if(e!==null){if(da(e,t,r,!1),(r&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(l(153));if(t.child!==null){for(e=t.child,r=Cn(e,e.pendingProps),t.child=r,r.return=t;e.sibling!==null;)e=e.sibling,r=r.sibling=Cn(e,e.pendingProps),r.return=t;r.sibling=null}return t.child}function nu(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&Os(e)))}function jS(e,t,r){switch(t.tag){case 3:ie(t,t.stateNode.containerInfo),Qn(t,et,e.memoizedState.cache),Ar();break;case 27:case 5:fe(t);break;case 4:ie(t,t.stateNode.containerInfo);break;case 10:Qn(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Nc(t),null;break;case 13:var i=t.memoizedState;if(i!==null)return i.dehydrated!==null?(er(t),t.flags|=128,null):(r&t.child.childLanes)!==0?wp(e,t,r):(er(t),e=Rn(e,t,r),e!==null?e.sibling:null);er(t);break;case 19:var u=(e.flags&128)!==0;if(i=(r&t.childLanes)!==0,i||(da(e,t,r,!1),i=(r&t.childLanes)!==0),u){if(i)return Tp(e,t,r);t.flags|=128}if(u=t.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),re(We,We.current),i)break;return null;case 22:return t.lanes=0,yp(e,t,r,t.pendingProps);case 24:Qn(t,et,e.memoizedState.cache)}return Rn(e,t,r)}function Cp(e,t,r){if(e!==null)if(e.memoizedProps!==t.pendingProps)nt=!0;else{if(!nu(e,r)&&(t.flags&128)===0)return nt=!1,jS(e,t,r);nt=(e.flags&131072)!==0}else nt=!1,Me&&(t.flags&1048576)!==0&&am(t,ci,t.index);switch(t.lanes=0,t.tag){case 16:e:{var i=t.pendingProps;if(e=Or(t.elementType),t.type=e,typeof e=="function")lc(e)?(i=Br(e,i),t.tag=1,t=Sp(null,t,e,i,r)):(t.tag=0,t=Zc(null,t,e,i,r));else{if(e!=null){var u=e.$$typeof;if(u===z){t.tag=11,t=mp(null,t,e,i,r);break e}else if(u===D){t.tag=14,t=pp(null,t,e,i,r);break e}}throw t=ue(e)||e,Error(l(306,t,""))}}return t;case 0:return Zc(e,t,t.type,t.pendingProps,r);case 1:return i=t.type,u=Br(i,t.pendingProps),Sp(e,t,i,u,r);case 3:e:{if(ie(t,t.stateNode.containerInfo),e===null)throw Error(l(387));i=t.pendingProps;var f=t.memoizedState;u=f.element,jc(e,t),yi(t,i,null,r);var y=t.memoizedState;if(i=y.cache,Qn(t,et,i),i!==f.cache&&gc(t,[et],r,!0),gi(),i=y.element,f.isDehydrated)if(f={element:i,isDehydrated:!1,cache:y.cache},t.updateQueue.baseState=f,t.memoizedState=f,t.flags&256){t=jp(e,t,i,r);break e}else if(i!==u){u=Xt(Error(l(424)),t),ui(u),t=jp(e,t,i,r);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Fe=Jt(e.firstChild),dt=t,Me=!0,Kn=null,Zt=!0,r=ym(t,null,i,r),t.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling}else{if(Ar(),i===u){t=Rn(e,t,r);break e}ht(e,t,i,r)}t=t.child}return t;case 26:return Ws(e,t),e===null?(r=Bg(t.type,null,t.pendingProps,null))?t.memoizedState=r:Me||(r=t.type,e=t.pendingProps,i=pl(ce.current).createElement(r),i[ut]=t,i[wt]=e,mt(i,r,e),lt(i),t.stateNode=i):t.memoizedState=Bg(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return fe(t),e===null&&Me&&(i=t.stateNode=zg(t.type,t.pendingProps,ce.current),dt=t,Zt=!0,u=Fe,cr(t.type)?(_u=u,Fe=Jt(i.firstChild)):Fe=u),ht(e,t,t.pendingProps.children,r),Ws(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&Me&&((u=i=Fe)&&(i=WS(i,t.type,t.pendingProps,Zt),i!==null?(t.stateNode=i,dt=t,Fe=Jt(i.firstChild),Zt=!1,u=!0):u=!1),u||Zn(t)),fe(t),u=t.type,f=t.pendingProps,y=e!==null?e.memoizedProps:null,i=f.children,ku(u,f)?i=null:y!==null&&ku(u,y)&&(t.flags|=32),t.memoizedState!==null&&(u=Ac(e,t,hS,null,null,r),Bi._currentValue=u),Ws(e,t),ht(e,t,i,r),t.child;case 6:return e===null&&Me&&((e=r=Fe)&&(r=IS(r,t.pendingProps,Zt),r!==null?(t.stateNode=r,dt=t,Fe=null,e=!0):e=!1),e||Zn(t)),null;case 13:return wp(e,t,r);case 4:return ie(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=_r(t,null,i,r):ht(e,t,i,r),t.child;case 11:return mp(e,t,t.type,t.pendingProps,r);case 7:return ht(e,t,t.pendingProps,r),t.child;case 8:return ht(e,t,t.pendingProps.children,r),t.child;case 12:return ht(e,t,t.pendingProps.children,r),t.child;case 10:return i=t.pendingProps,Qn(t,t.type,i.value),ht(e,t,i.children,r),t.child;case 9:return u=t.type._context,i=t.pendingProps.children,Mr(t),u=ft(u),i=i(u),t.flags|=1,ht(e,t,i,r),t.child;case 14:return pp(e,t,t.type,t.pendingProps,r);case 15:return gp(e,t,t.type,t.pendingProps,r);case 19:return Tp(e,t,r);case 31:return SS(e,t,r);case 22:return yp(e,t,r,t.pendingProps);case 24:return Mr(t),i=ft(et),e===null?(u=xc(),u===null&&(u=Ye,f=yc(),u.pooledCache=f,f.refCount++,f!==null&&(u.pooledCacheLanes|=r),u=f),t.memoizedState={parent:i,cache:u},Sc(t),Qn(t,et,u)):((e.lanes&r)!==0&&(jc(e,t),yi(t,null,null,r),gi()),u=e.memoizedState,f=t.memoizedState,u.parent!==i?(u={parent:i,cache:i},t.memoizedState=u,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=u),Qn(t,et,i)):(i=f.cache,Qn(t,et,i),i!==u.cache&&gc(t,[et],r,!0))),ht(e,t,t.pendingProps.children,r),t.child;case 29:throw t.pendingProps}throw Error(l(156,t.tag))}function On(e){e.flags|=4}function ru(e,t,r,i,u){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(u&335544128)===u)if(e.stateNode.complete)e.flags|=8192;else if(Ip())e.flags|=8192;else throw zr=Bs,bc}else e.flags&=-16777217}function Np(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Yg(t))if(Ip())e.flags|=8192;else throw zr=Bs,bc}function el(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?sh():536870912,e.lanes|=t,wa|=t)}function wi(e,t){if(!Me)switch(e.tailMode){case"hidden":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var i=null;r!==null;)r.alternate!==null&&(i=r),r=r.sibling;i===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null}}function Xe(e){var t=e.alternate!==null&&e.alternate.child===e.child,r=0,i=0;if(t)for(var u=e.child;u!==null;)r|=u.lanes|u.childLanes,i|=u.subtreeFlags&65011712,i|=u.flags&65011712,u.return=e,u=u.sibling;else for(u=e.child;u!==null;)r|=u.lanes|u.childLanes,i|=u.subtreeFlags,i|=u.flags,u.return=e,u=u.sibling;return e.subtreeFlags|=i,e.childLanes=r,t}function wS(e,t,r){var i=t.pendingProps;switch(dc(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Xe(t),null;case 1:return Xe(t),null;case 3:return r=t.stateNode,i=null,e!==null&&(i=e.memoizedState.cache),t.memoizedState.cache!==i&&(t.flags|=2048),An(et),J(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(ua(t)?On(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,hc())),Xe(t),null;case 26:var u=t.type,f=t.memoizedState;return e===null?(On(t),f!==null?(Xe(t),Np(t,f)):(Xe(t),ru(t,u,null,i,r))):f?f!==e.memoizedState?(On(t),Xe(t),Np(t,f)):(Xe(t),t.flags&=-16777217):(e=e.memoizedProps,e!==i&&On(t),Xe(t),ru(t,u,e,i,r)),null;case 27:if(te(t),r=ce.current,u=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&On(t);else{if(!i){if(t.stateNode===null)throw Error(l(166));return Xe(t),null}e=le.current,ua(t)?sm(t):(e=zg(u,i,r),t.stateNode=e,On(t))}return Xe(t),null;case 5:if(te(t),u=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&On(t);else{if(!i){if(t.stateNode===null)throw Error(l(166));return Xe(t),null}if(f=le.current,ua(t))sm(t);else{var y=pl(ce.current);switch(f){case 1:f=y.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:f=y.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":f=y.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":f=y.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":f=y.createElement("div"),f.innerHTML="<script><\/script>",f=f.removeChild(f.firstChild);break;case"select":f=typeof i.is=="string"?y.createElement("select",{is:i.is}):y.createElement("select"),i.multiple?f.multiple=!0:i.size&&(f.size=i.size);break;default:f=typeof i.is=="string"?y.createElement(u,{is:i.is}):y.createElement(u)}}f[ut]=t,f[wt]=i;e:for(y=t.child;y!==null;){if(y.tag===5||y.tag===6)f.appendChild(y.stateNode);else if(y.tag!==4&&y.tag!==27&&y.child!==null){y.child.return=y,y=y.child;continue}if(y===t)break e;for(;y.sibling===null;){if(y.return===null||y.return===t)break e;y=y.return}y.sibling.return=y.return,y=y.sibling}t.stateNode=f;e:switch(mt(f,u,i),u){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}i&&On(t)}}return Xe(t),ru(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,r),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==i&&On(t);else{if(typeof i!="string"&&t.stateNode===null)throw Error(l(166));if(e=ce.current,ua(t)){if(e=t.stateNode,r=t.memoizedProps,i=null,u=dt,u!==null)switch(u.tag){case 27:case 5:i=u.memoizedProps}e[ut]=t,e=!!(e.nodeValue===r||i!==null&&i.suppressHydrationWarning===!0||wg(e.nodeValue,r)),e||Zn(t,!0)}else e=pl(e).createTextNode(i),e[ut]=t,t.stateNode=e}return Xe(t),null;case 31:if(r=t.memoizedState,e===null||e.memoizedState!==null){if(i=ua(t),r!==null){if(e===null){if(!i)throw Error(l(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(l(557));e[ut]=t}else Ar(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Xe(t),e=!1}else r=hc(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=r),e=!0;if(!e)return t.flags&256?(Vt(t),t):(Vt(t),null);if((t.flags&128)!==0)throw Error(l(558))}return Xe(t),null;case 13:if(i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(u=ua(t),i!==null&&i.dehydrated!==null){if(e===null){if(!u)throw Error(l(318));if(u=t.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(l(317));u[ut]=t}else Ar(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Xe(t),u=!1}else u=hc(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=u),u=!0;if(!u)return t.flags&256?(Vt(t),t):(Vt(t),null)}return Vt(t),(t.flags&128)!==0?(t.lanes=r,t):(r=i!==null,e=e!==null&&e.memoizedState!==null,r&&(i=t.child,u=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(u=i.alternate.memoizedState.cachePool.pool),f=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(f=i.memoizedState.cachePool.pool),f!==u&&(i.flags|=2048)),r!==e&&r&&(t.child.flags|=8192),el(t,t.updateQueue),Xe(t),null);case 4:return J(),e===null&&Tu(t.stateNode.containerInfo),Xe(t),null;case 10:return An(t.type),Xe(t),null;case 19:if(_(We),i=t.memoizedState,i===null)return Xe(t),null;if(u=(t.flags&128)!==0,f=i.rendering,f===null)if(u)wi(i,!1);else{if(Ze!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(f=qs(e),f!==null){for(t.flags|=128,wi(i,!1),e=f.updateQueue,t.updateQueue=e,el(t,e),t.subtreeFlags=0,e=r,r=t.child;r!==null;)tm(r,e),r=r.sibling;return re(We,We.current&1|2),Me&&Nn(t,i.treeForkCount),t.child}e=e.sibling}i.tail!==null&&kt()>il&&(t.flags|=128,u=!0,wi(i,!1),t.lanes=4194304)}else{if(!u)if(e=qs(f),e!==null){if(t.flags|=128,u=!0,e=e.updateQueue,t.updateQueue=e,el(t,e),wi(i,!0),i.tail===null&&i.tailMode==="hidden"&&!f.alternate&&!Me)return Xe(t),null}else 2*kt()-i.renderingStartTime>il&&r!==536870912&&(t.flags|=128,u=!0,wi(i,!1),t.lanes=4194304);i.isBackwards?(f.sibling=t.child,t.child=f):(e=i.last,e!==null?e.sibling=f:t.child=f,i.last=f)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=kt(),e.sibling=null,r=We.current,re(We,u?r&1|2:r&1),Me&&Nn(t,i.treeForkCount),e):(Xe(t),null);case 22:case 23:return Vt(t),Cc(),i=t.memoizedState!==null,e!==null?e.memoizedState!==null!==i&&(t.flags|=8192):i&&(t.flags|=8192),i?(r&536870912)!==0&&(t.flags&128)===0&&(Xe(t),t.subtreeFlags&6&&(t.flags|=8192)):Xe(t),r=t.updateQueue,r!==null&&el(t,r.retryQueue),r=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(r=e.memoizedState.cachePool.pool),i=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(i=t.memoizedState.cachePool.pool),i!==r&&(t.flags|=2048),e!==null&&_(Rr),null;case 24:return r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),An(et),Xe(t),null;case 25:return null;case 30:return null}throw Error(l(156,t.tag))}function ES(e,t){switch(dc(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return An(et),J(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return te(t),null;case 31:if(t.memoizedState!==null){if(Vt(t),t.alternate===null)throw Error(l(340));Ar()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Vt(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(l(340));Ar()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return _(We),null;case 4:return J(),null;case 10:return An(t.type),null;case 22:case 23:return Vt(t),Cc(),e!==null&&_(Rr),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return An(et),null;case 25:return null;default:return null}}function Dp(e,t){switch(dc(t),t.tag){case 3:An(et),J();break;case 26:case 27:case 5:te(t);break;case 4:J();break;case 31:t.memoizedState!==null&&Vt(t);break;case 13:Vt(t);break;case 19:_(We);break;case 10:An(t.type);break;case 22:case 23:Vt(t),Cc(),e!==null&&_(Rr);break;case 24:An(et)}}function Ei(e,t){try{var r=t.updateQueue,i=r!==null?r.lastEffect:null;if(i!==null){var u=i.next;r=u;do{if((r.tag&e)===e){i=void 0;var f=r.create,y=r.inst;i=f(),y.destroy=i}r=r.next}while(r!==u)}}catch(j){Be(t,t.return,j)}}function nr(e,t,r){try{var i=t.updateQueue,u=i!==null?i.lastEffect:null;if(u!==null){var f=u.next;i=f;do{if((i.tag&e)===e){var y=i.inst,j=y.destroy;if(j!==void 0){y.destroy=void 0,u=t;var R=r,F=j;try{F()}catch(I){Be(u,R,I)}}}i=i.next}while(i!==f)}}catch(I){Be(t,t.return,I)}}function Ap(e){var t=e.updateQueue;if(t!==null){var r=e.stateNode;try{xm(t,r)}catch(i){Be(e,e.return,i)}}}function kp(e,t,r){r.props=Br(e.type,e.memoizedProps),r.state=e.memoizedState;try{r.componentWillUnmount()}catch(i){Be(e,t,i)}}function Ti(e,t){try{var r=e.ref;if(r!==null){switch(e.tag){case 26:case 27:case 5:var i=e.stateNode;break;case 30:i=e.stateNode;break;default:i=e.stateNode}typeof r=="function"?e.refCleanup=r(i):r.current=i}}catch(u){Be(e,t,u)}}function hn(e,t){var r=e.ref,i=e.refCleanup;if(r!==null)if(typeof i=="function")try{i()}catch(u){Be(e,t,u)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof r=="function")try{r(null)}catch(u){Be(e,t,u)}else r.current=null}function Mp(e){var t=e.type,r=e.memoizedProps,i=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":r.autoFocus&&i.focus();break e;case"img":r.src?i.src=r.src:r.srcSet&&(i.srcset=r.srcSet)}}catch(u){Be(e,e.return,u)}}function au(e,t,r){try{var i=e.stateNode;XS(i,e.type,r,t),i[wt]=t}catch(u){Be(e,e.return,u)}}function Rp(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&cr(e.type)||e.tag===4}function iu(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Rp(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&cr(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function su(e,t,r){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?(r.nodeType===9?r.body:r.nodeName==="HTML"?r.ownerDocument.body:r).insertBefore(e,t):(t=r.nodeType===9?r.body:r.nodeName==="HTML"?r.ownerDocument.body:r,t.appendChild(e),r=r._reactRootContainer,r!=null||t.onclick!==null||(t.onclick=En));else if(i!==4&&(i===27&&cr(e.type)&&(r=e.stateNode,t=null),e=e.child,e!==null))for(su(e,t,r),e=e.sibling;e!==null;)su(e,t,r),e=e.sibling}function tl(e,t,r){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?r.insertBefore(e,t):r.appendChild(e);else if(i!==4&&(i===27&&cr(e.type)&&(r=e.stateNode),e=e.child,e!==null))for(tl(e,t,r),e=e.sibling;e!==null;)tl(e,t,r),e=e.sibling}function Op(e){var t=e.stateNode,r=e.memoizedProps;try{for(var i=e.type,u=t.attributes;u.length;)t.removeAttributeNode(u[0]);mt(t,i,r),t[ut]=e,t[wt]=r}catch(f){Be(e,e.return,f)}}var zn=!1,rt=!1,lu=!1,zp=typeof WeakSet=="function"?WeakSet:Set,ot=null;function TS(e,t){if(e=e.containerInfo,Du=jl,e=Xh(e),ec(e)){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{r=(r=e.ownerDocument)&&r.defaultView||window;var i=r.getSelection&&r.getSelection();if(i&&i.rangeCount!==0){r=i.anchorNode;var u=i.anchorOffset,f=i.focusNode;i=i.focusOffset;try{r.nodeType,f.nodeType}catch{r=null;break e}var y=0,j=-1,R=-1,F=0,I=0,se=e,X=null;t:for(;;){for(var K;se!==r||u!==0&&se.nodeType!==3||(j=y+u),se!==f||i!==0&&se.nodeType!==3||(R=y+i),se.nodeType===3&&(y+=se.nodeValue.length),(K=se.firstChild)!==null;)X=se,se=K;for(;;){if(se===e)break t;if(X===r&&++F===u&&(j=y),X===f&&++I===i&&(R=y),(K=se.nextSibling)!==null)break;se=X,X=se.parentNode}se=K}r=j===-1||R===-1?null:{start:j,end:R}}else r=null}r=r||{start:0,end:0}}else r=null;for(Au={focusedElem:e,selectionRange:r},jl=!1,ot=t;ot!==null;)if(t=ot,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,ot=e;else for(;ot!==null;){switch(t=ot,f=t.alternate,e=t.flags,t.tag){case 0:if((e&4)!==0&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(r=0;r<e.length;r++)u=e[r],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&f!==null){e=void 0,r=t,u=f.memoizedProps,f=f.memoizedState,i=r.stateNode;try{var pe=Br(r.type,u);e=i.getSnapshotBeforeUpdate(pe,f),i.__reactInternalSnapshotBeforeUpdate=e}catch(je){Be(r,r.return,je)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,r=e.nodeType,r===9)Ru(e);else if(r===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Ru(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(l(163))}if(e=t.sibling,e!==null){e.return=t.return,ot=e;break}ot=t.return}}function _p(e,t,r){var i=r.flags;switch(r.tag){case 0:case 11:case 15:Vn(e,r),i&4&&Ei(5,r);break;case 1:if(Vn(e,r),i&4)if(e=r.stateNode,t===null)try{e.componentDidMount()}catch(y){Be(r,r.return,y)}else{var u=Br(r.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(u,t,e.__reactInternalSnapshotBeforeUpdate)}catch(y){Be(r,r.return,y)}}i&64&&Ap(r),i&512&&Ti(r,r.return);break;case 3:if(Vn(e,r),i&64&&(e=r.updateQueue,e!==null)){if(t=null,r.child!==null)switch(r.child.tag){case 27:case 5:t=r.child.stateNode;break;case 1:t=r.child.stateNode}try{xm(e,t)}catch(y){Be(r,r.return,y)}}break;case 27:t===null&&i&4&&Op(r);case 26:case 5:Vn(e,r),t===null&&i&4&&Mp(r),i&512&&Ti(r,r.return);break;case 12:Vn(e,r);break;case 31:Vn(e,r),i&4&&Lp(e,r);break;case 13:Vn(e,r),i&4&&Up(e,r),i&64&&(e=r.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(r=zS.bind(null,r),ej(e,r))));break;case 22:if(i=r.memoizedState!==null||zn,!i){t=t!==null&&t.memoizedState!==null||rt,u=zn;var f=rt;zn=i,(rt=t)&&!f?Bn(e,r,(r.subtreeFlags&8772)!==0):Vn(e,r),zn=u,rt=f}break;case 30:break;default:Vn(e,r)}}function Vp(e){var t=e.alternate;t!==null&&(e.alternate=null,Vp(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Bo(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var $e=null,Tt=!1;function _n(e,t,r){for(r=r.child;r!==null;)Bp(e,t,r),r=r.sibling}function Bp(e,t,r){if(Mt&&typeof Mt.onCommitFiberUnmount=="function")try{Mt.onCommitFiberUnmount(Za,r)}catch{}switch(r.tag){case 26:rt||hn(r,t),_n(e,t,r),r.memoizedState?r.memoizedState.count--:r.stateNode&&(r=r.stateNode,r.parentNode.removeChild(r));break;case 27:rt||hn(r,t);var i=$e,u=Tt;cr(r.type)&&($e=r.stateNode,Tt=!1),_n(e,t,r),zi(r.stateNode),$e=i,Tt=u;break;case 5:rt||hn(r,t);case 6:if(i=$e,u=Tt,$e=null,_n(e,t,r),$e=i,Tt=u,$e!==null)if(Tt)try{($e.nodeType===9?$e.body:$e.nodeName==="HTML"?$e.ownerDocument.body:$e).removeChild(r.stateNode)}catch(f){Be(r,t,f)}else try{$e.removeChild(r.stateNode)}catch(f){Be(r,t,f)}break;case 18:$e!==null&&(Tt?(e=$e,Ag(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,r.stateNode),Ma(e)):Ag($e,r.stateNode));break;case 4:i=$e,u=Tt,$e=r.stateNode.containerInfo,Tt=!0,_n(e,t,r),$e=i,Tt=u;break;case 0:case 11:case 14:case 15:nr(2,r,t),rt||nr(4,r,t),_n(e,t,r);break;case 1:rt||(hn(r,t),i=r.stateNode,typeof i.componentWillUnmount=="function"&&kp(r,t,i)),_n(e,t,r);break;case 21:_n(e,t,r);break;case 22:rt=(i=rt)||r.memoizedState!==null,_n(e,t,r),rt=i;break;default:_n(e,t,r)}}function Lp(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Ma(e)}catch(r){Be(t,t.return,r)}}}function Up(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Ma(e)}catch(r){Be(t,t.return,r)}}function CS(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new zp),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new zp),t;default:throw Error(l(435,e.tag))}}function nl(e,t){var r=CS(e);t.forEach(function(i){if(!r.has(i)){r.add(i);var u=_S.bind(null,e,i);i.then(u,u)}})}function Ct(e,t){var r=t.deletions;if(r!==null)for(var i=0;i<r.length;i++){var u=r[i],f=e,y=t,j=y;e:for(;j!==null;){switch(j.tag){case 27:if(cr(j.type)){$e=j.stateNode,Tt=!1;break e}break;case 5:$e=j.stateNode,Tt=!1;break e;case 3:case 4:$e=j.stateNode.containerInfo,Tt=!0;break e}j=j.return}if($e===null)throw Error(l(160));Bp(f,y,u),$e=null,Tt=!1,f=u.alternate,f!==null&&(f.return=null),u.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Hp(t,e),t=t.sibling}var an=null;function Hp(e,t){var r=e.alternate,i=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Ct(t,e),Nt(e),i&4&&(nr(3,e,e.return),Ei(3,e),nr(5,e,e.return));break;case 1:Ct(t,e),Nt(e),i&512&&(rt||r===null||hn(r,r.return)),i&64&&zn&&(e=e.updateQueue,e!==null&&(i=e.callbacks,i!==null&&(r=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=r===null?i:r.concat(i))));break;case 26:var u=an;if(Ct(t,e),Nt(e),i&512&&(rt||r===null||hn(r,r.return)),i&4){var f=r!==null?r.memoizedState:null;if(i=e.memoizedState,r===null)if(i===null)if(e.stateNode===null){e:{i=e.type,r=e.memoizedProps,u=u.ownerDocument||u;t:switch(i){case"title":f=u.getElementsByTagName("title")[0],(!f||f[Wa]||f[ut]||f.namespaceURI==="http://www.w3.org/2000/svg"||f.hasAttribute("itemprop"))&&(f=u.createElement(i),u.head.insertBefore(f,u.querySelector("head > title"))),mt(f,i,r),f[ut]=e,lt(f),i=f;break e;case"link":var y=Hg("link","href",u).get(i+(r.href||""));if(y){for(var j=0;j<y.length;j++)if(f=y[j],f.getAttribute("href")===(r.href==null||r.href===""?null:r.href)&&f.getAttribute("rel")===(r.rel==null?null:r.rel)&&f.getAttribute("title")===(r.title==null?null:r.title)&&f.getAttribute("crossorigin")===(r.crossOrigin==null?null:r.crossOrigin)){y.splice(j,1);break t}}f=u.createElement(i),mt(f,i,r),u.head.appendChild(f);break;case"meta":if(y=Hg("meta","content",u).get(i+(r.content||""))){for(j=0;j<y.length;j++)if(f=y[j],f.getAttribute("content")===(r.content==null?null:""+r.content)&&f.getAttribute("name")===(r.name==null?null:r.name)&&f.getAttribute("property")===(r.property==null?null:r.property)&&f.getAttribute("http-equiv")===(r.httpEquiv==null?null:r.httpEquiv)&&f.getAttribute("charset")===(r.charSet==null?null:r.charSet)){y.splice(j,1);break t}}f=u.createElement(i),mt(f,i,r),u.head.appendChild(f);break;default:throw Error(l(468,i))}f[ut]=e,lt(f),i=f}e.stateNode=i}else qg(u,e.type,e.stateNode);else e.stateNode=Ug(u,i,e.memoizedProps);else f!==i?(f===null?r.stateNode!==null&&(r=r.stateNode,r.parentNode.removeChild(r)):f.count--,i===null?qg(u,e.type,e.stateNode):Ug(u,i,e.memoizedProps)):i===null&&e.stateNode!==null&&au(e,e.memoizedProps,r.memoizedProps)}break;case 27:Ct(t,e),Nt(e),i&512&&(rt||r===null||hn(r,r.return)),r!==null&&i&4&&au(e,e.memoizedProps,r.memoizedProps);break;case 5:if(Ct(t,e),Nt(e),i&512&&(rt||r===null||hn(r,r.return)),e.flags&32){u=e.stateNode;try{ea(u,"")}catch(pe){Be(e,e.return,pe)}}i&4&&e.stateNode!=null&&(u=e.memoizedProps,au(e,u,r!==null?r.memoizedProps:u)),i&1024&&(lu=!0);break;case 6:if(Ct(t,e),Nt(e),i&4){if(e.stateNode===null)throw Error(l(162));i=e.memoizedProps,r=e.stateNode;try{r.nodeValue=i}catch(pe){Be(e,e.return,pe)}}break;case 3:if(vl=null,u=an,an=gl(t.containerInfo),Ct(t,e),an=u,Nt(e),i&4&&r!==null&&r.memoizedState.isDehydrated)try{Ma(t.containerInfo)}catch(pe){Be(e,e.return,pe)}lu&&(lu=!1,qp(e));break;case 4:i=an,an=gl(e.stateNode.containerInfo),Ct(t,e),Nt(e),an=i;break;case 12:Ct(t,e),Nt(e);break;case 31:Ct(t,e),Nt(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,nl(e,i)));break;case 13:Ct(t,e),Nt(e),e.child.flags&8192&&e.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(al=kt()),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,nl(e,i)));break;case 22:u=e.memoizedState!==null;var R=r!==null&&r.memoizedState!==null,F=zn,I=rt;if(zn=F||u,rt=I||R,Ct(t,e),rt=I,zn=F,Nt(e),i&8192)e:for(t=e.stateNode,t._visibility=u?t._visibility&-2:t._visibility|1,u&&(r===null||R||zn||rt||Lr(e)),r=null,t=e;;){if(t.tag===5||t.tag===26){if(r===null){R=r=t;try{if(f=R.stateNode,u)y=f.style,typeof y.setProperty=="function"?y.setProperty("display","none","important"):y.display="none";else{j=R.stateNode;var se=R.memoizedProps.style,X=se!=null&&se.hasOwnProperty("display")?se.display:null;j.style.display=X==null||typeof X=="boolean"?"":(""+X).trim()}}catch(pe){Be(R,R.return,pe)}}}else if(t.tag===6){if(r===null){R=t;try{R.stateNode.nodeValue=u?"":R.memoizedProps}catch(pe){Be(R,R.return,pe)}}}else if(t.tag===18){if(r===null){R=t;try{var K=R.stateNode;u?kg(K,!0):kg(R.stateNode,!1)}catch(pe){Be(R,R.return,pe)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;r===t&&(r=null),t=t.return}r===t&&(r=null),t.sibling.return=t.return,t=t.sibling}i&4&&(i=e.updateQueue,i!==null&&(r=i.retryQueue,r!==null&&(i.retryQueue=null,nl(e,r))));break;case 19:Ct(t,e),Nt(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,nl(e,i)));break;case 30:break;case 21:break;default:Ct(t,e),Nt(e)}}function Nt(e){var t=e.flags;if(t&2){try{for(var r,i=e.return;i!==null;){if(Rp(i)){r=i;break}i=i.return}if(r==null)throw Error(l(160));switch(r.tag){case 27:var u=r.stateNode,f=iu(e);tl(e,f,u);break;case 5:var y=r.stateNode;r.flags&32&&(ea(y,""),r.flags&=-33);var j=iu(e);tl(e,j,y);break;case 3:case 4:var R=r.stateNode.containerInfo,F=iu(e);su(e,F,R);break;default:throw Error(l(161))}}catch(I){Be(e,e.return,I)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function qp(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;qp(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function Vn(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)_p(e,t.alternate,t),t=t.sibling}function Lr(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:nr(4,t,t.return),Lr(t);break;case 1:hn(t,t.return);var r=t.stateNode;typeof r.componentWillUnmount=="function"&&kp(t,t.return,r),Lr(t);break;case 27:zi(t.stateNode);case 26:case 5:hn(t,t.return),Lr(t);break;case 22:t.memoizedState===null&&Lr(t);break;case 30:Lr(t);break;default:Lr(t)}e=e.sibling}}function Bn(e,t,r){for(r=r&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var i=t.alternate,u=e,f=t,y=f.flags;switch(f.tag){case 0:case 11:case 15:Bn(u,f,r),Ei(4,f);break;case 1:if(Bn(u,f,r),i=f,u=i.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(F){Be(i,i.return,F)}if(i=f,u=i.updateQueue,u!==null){var j=i.stateNode;try{var R=u.shared.hiddenCallbacks;if(R!==null)for(u.shared.hiddenCallbacks=null,u=0;u<R.length;u++)vm(R[u],j)}catch(F){Be(i,i.return,F)}}r&&y&64&&Ap(f),Ti(f,f.return);break;case 27:Op(f);case 26:case 5:Bn(u,f,r),r&&i===null&&y&4&&Mp(f),Ti(f,f.return);break;case 12:Bn(u,f,r);break;case 31:Bn(u,f,r),r&&y&4&&Lp(u,f);break;case 13:Bn(u,f,r),r&&y&4&&Up(u,f);break;case 22:f.memoizedState===null&&Bn(u,f,r),Ti(f,f.return);break;case 30:break;default:Bn(u,f,r)}t=t.sibling}}function ou(e,t){var r=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(r=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==r&&(e!=null&&e.refCount++,r!=null&&di(r))}function cu(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&di(e))}function sn(e,t,r,i){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Yp(e,t,r,i),t=t.sibling}function Yp(e,t,r,i){var u=t.flags;switch(t.tag){case 0:case 11:case 15:sn(e,t,r,i),u&2048&&Ei(9,t);break;case 1:sn(e,t,r,i);break;case 3:sn(e,t,r,i),u&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&di(e)));break;case 12:if(u&2048){sn(e,t,r,i),e=t.stateNode;try{var f=t.memoizedProps,y=f.id,j=f.onPostCommit;typeof j=="function"&&j(y,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(R){Be(t,t.return,R)}}else sn(e,t,r,i);break;case 31:sn(e,t,r,i);break;case 13:sn(e,t,r,i);break;case 23:break;case 22:f=t.stateNode,y=t.alternate,t.memoizedState!==null?f._visibility&2?sn(e,t,r,i):Ci(e,t):f._visibility&2?sn(e,t,r,i):(f._visibility|=2,ba(e,t,r,i,(t.subtreeFlags&10256)!==0||!1)),u&2048&&ou(y,t);break;case 24:sn(e,t,r,i),u&2048&&cu(t.alternate,t);break;default:sn(e,t,r,i)}}function ba(e,t,r,i,u){for(u=u&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var f=e,y=t,j=r,R=i,F=y.flags;switch(y.tag){case 0:case 11:case 15:ba(f,y,j,R,u),Ei(8,y);break;case 23:break;case 22:var I=y.stateNode;y.memoizedState!==null?I._visibility&2?ba(f,y,j,R,u):Ci(f,y):(I._visibility|=2,ba(f,y,j,R,u)),u&&F&2048&&ou(y.alternate,y);break;case 24:ba(f,y,j,R,u),u&&F&2048&&cu(y.alternate,y);break;default:ba(f,y,j,R,u)}t=t.sibling}}function Ci(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var r=e,i=t,u=i.flags;switch(i.tag){case 22:Ci(r,i),u&2048&&ou(i.alternate,i);break;case 24:Ci(r,i),u&2048&&cu(i.alternate,i);break;default:Ci(r,i)}t=t.sibling}}var Ni=8192;function Sa(e,t,r){if(e.subtreeFlags&Ni)for(e=e.child;e!==null;)Pp(e,t,r),e=e.sibling}function Pp(e,t,r){switch(e.tag){case 26:Sa(e,t,r),e.flags&Ni&&e.memoizedState!==null&&fj(r,an,e.memoizedState,e.memoizedProps);break;case 5:Sa(e,t,r);break;case 3:case 4:var i=an;an=gl(e.stateNode.containerInfo),Sa(e,t,r),an=i;break;case 22:e.memoizedState===null&&(i=e.alternate,i!==null&&i.memoizedState!==null?(i=Ni,Ni=16777216,Sa(e,t,r),Ni=i):Sa(e,t,r));break;default:Sa(e,t,r)}}function Gp(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Di(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var r=0;r<t.length;r++){var i=t[r];ot=i,Xp(i,e)}Gp(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Fp(e),e=e.sibling}function Fp(e){switch(e.tag){case 0:case 11:case 15:Di(e),e.flags&2048&&nr(9,e,e.return);break;case 3:Di(e);break;case 12:Di(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,rl(e)):Di(e);break;default:Di(e)}}function rl(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var r=0;r<t.length;r++){var i=t[r];ot=i,Xp(i,e)}Gp(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:nr(8,t,t.return),rl(t);break;case 22:r=t.stateNode,r._visibility&2&&(r._visibility&=-3,rl(t));break;default:rl(t)}e=e.sibling}}function Xp(e,t){for(;ot!==null;){var r=ot;switch(r.tag){case 0:case 11:case 15:nr(8,r,t);break;case 23:case 22:if(r.memoizedState!==null&&r.memoizedState.cachePool!==null){var i=r.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:di(r.memoizedState.cache)}if(i=r.child,i!==null)i.return=r,ot=i;else e:for(r=e;ot!==null;){i=ot;var u=i.sibling,f=i.return;if(Vp(i),i===r){ot=null;break e}if(u!==null){u.return=f,ot=u;break e}ot=f}}}var NS={getCacheForType:function(e){var t=ft(et),r=t.data.get(e);return r===void 0&&(r=e(),t.data.set(e,r)),r},cacheSignal:function(){return ft(et).controller.signal}},DS=typeof WeakMap=="function"?WeakMap:Map,ze=0,Ye=null,Ne=null,Ae=0,Ve=0,Bt=null,rr=!1,ja=!1,uu=!1,Ln=0,Ze=0,ar=0,Ur=0,du=0,Lt=0,wa=0,Ai=null,Dt=null,fu=!1,al=0,$p=0,il=1/0,sl=null,ir=null,it=0,sr=null,Ea=null,Un=0,hu=0,mu=null,Kp=null,ki=0,pu=null;function Ut(){return(ze&2)!==0&&Ae!==0?Ae&-Ae:Y.T!==null?Su():uh()}function Zp(){if(Lt===0)if((Ae&536870912)===0||Me){var e=ms;ms<<=1,(ms&3932160)===0&&(ms=262144),Lt=e}else Lt=536870912;return e=_t.current,e!==null&&(e.flags|=32),Lt}function At(e,t,r){(e===Ye&&(Ve===2||Ve===9)||e.cancelPendingCommit!==null)&&(Ta(e,0),lr(e,Ae,Lt,!1)),Ja(e,r),((ze&2)===0||e!==Ye)&&(e===Ye&&((ze&2)===0&&(Ur|=r),Ze===4&&lr(e,Ae,Lt,!1)),mn(e))}function Qp(e,t,r){if((ze&6)!==0)throw Error(l(327));var i=!r&&(t&127)===0&&(t&e.expiredLanes)===0||Qa(e,t),u=i?MS(e,t):yu(e,t,!0),f=i;do{if(u===0){ja&&!i&&lr(e,t,0,!1);break}else{if(r=e.current.alternate,f&&!AS(r)){u=yu(e,t,!1),f=!1;continue}if(u===2){if(f=t,e.errorRecoveryDisabledLanes&f)var y=0;else y=e.pendingLanes&-536870913,y=y!==0?y:y&536870912?536870912:0;if(y!==0){t=y;e:{var j=e;u=Ai;var R=j.current.memoizedState.isDehydrated;if(R&&(Ta(j,y).flags|=256),y=yu(j,y,!1),y!==2){if(uu&&!R){j.errorRecoveryDisabledLanes|=f,Ur|=f,u=4;break e}f=Dt,Dt=u,f!==null&&(Dt===null?Dt=f:Dt.push.apply(Dt,f))}u=y}if(f=!1,u!==2)continue}}if(u===1){Ta(e,0),lr(e,t,0,!0);break}e:{switch(i=e,f=u,f){case 0:case 1:throw Error(l(345));case 4:if((t&4194048)!==t)break;case 6:lr(i,t,Lt,!rr);break e;case 2:Dt=null;break;case 3:case 5:break;default:throw Error(l(329))}if((t&62914560)===t&&(u=al+300-kt(),10<u)){if(lr(i,t,Lt,!rr),gs(i,0,!0)!==0)break e;Un=t,i.timeoutHandle=Ng(Jp.bind(null,i,r,Dt,sl,fu,t,Lt,Ur,wa,rr,f,"Throttled",-0,0),u);break e}Jp(i,r,Dt,sl,fu,t,Lt,Ur,wa,rr,f,null,-0,0)}}break}while(!0);mn(e)}function Jp(e,t,r,i,u,f,y,j,R,F,I,se,X,K){if(e.timeoutHandle=-1,se=t.subtreeFlags,se&8192||(se&16785408)===16785408){se={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:En},Pp(t,f,se);var pe=(f&62914560)===f?al-kt():(f&4194048)===f?$p-kt():0;if(pe=hj(se,pe),pe!==null){Un=f,e.cancelPendingCommit=pe(ig.bind(null,e,t,f,r,i,u,y,j,R,I,se,null,X,K)),lr(e,f,y,!F);return}}ig(e,t,f,r,i,u,y,j,R)}function AS(e){for(var t=e;;){var r=t.tag;if((r===0||r===11||r===15)&&t.flags&16384&&(r=t.updateQueue,r!==null&&(r=r.stores,r!==null)))for(var i=0;i<r.length;i++){var u=r[i],f=u.getSnapshot;u=u.value;try{if(!Ot(f(),u))return!1}catch{return!1}}if(r=t.child,t.subtreeFlags&16384&&r!==null)r.return=t,t=r;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function lr(e,t,r,i){t&=~du,t&=~Ur,e.suspendedLanes|=t,e.pingedLanes&=~t,i&&(e.warmLanes|=t),i=e.expirationTimes;for(var u=t;0<u;){var f=31-Rt(u),y=1<<f;i[f]=-1,u&=~y}r!==0&&lh(e,r,t)}function ll(){return(ze&6)===0?(Mi(0),!1):!0}function gu(){if(Ne!==null){if(Ve===0)var e=Ne.return;else e=Ne,Dn=kr=null,Rc(e),pa=null,hi=0,e=Ne;for(;e!==null;)Dp(e.alternate,e),e=e.return;Ne=null}}function Ta(e,t){var r=e.timeoutHandle;r!==-1&&(e.timeoutHandle=-1,ZS(r)),r=e.cancelPendingCommit,r!==null&&(e.cancelPendingCommit=null,r()),Un=0,gu(),Ye=e,Ne=r=Cn(e.current,null),Ae=t,Ve=0,Bt=null,rr=!1,ja=Qa(e,t),uu=!1,wa=Lt=du=Ur=ar=Ze=0,Dt=Ai=null,fu=!1,(t&8)!==0&&(t|=t&32);var i=e.entangledLanes;if(i!==0)for(e=e.entanglements,i&=t;0<i;){var u=31-Rt(i),f=1<<u;t|=e[u],i&=~f}return Ln=t,Ds(),r}function Wp(e,t){Ee=null,Y.H=Si,t===ma||t===Vs?(t=mm(),Ve=3):t===bc?(t=mm(),Ve=4):Ve=t===Kc?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,Bt=t,Ne===null&&(Ze=1,Qs(e,Xt(t,e.current)))}function Ip(){var e=_t.current;return e===null?!0:(Ae&4194048)===Ae?Qt===null:(Ae&62914560)===Ae||(Ae&536870912)!==0?e===Qt:!1}function eg(){var e=Y.H;return Y.H=Si,e===null?Si:e}function tg(){var e=Y.A;return Y.A=NS,e}function ol(){Ze=4,rr||(Ae&4194048)!==Ae&&_t.current!==null||(ja=!0),(ar&134217727)===0&&(Ur&134217727)===0||Ye===null||lr(Ye,Ae,Lt,!1)}function yu(e,t,r){var i=ze;ze|=2;var u=eg(),f=tg();(Ye!==e||Ae!==t)&&(sl=null,Ta(e,t)),t=!1;var y=Ze;e:do try{if(Ve!==0&&Ne!==null){var j=Ne,R=Bt;switch(Ve){case 8:gu(),y=6;break e;case 3:case 2:case 9:case 6:_t.current===null&&(t=!0);var F=Ve;if(Ve=0,Bt=null,Ca(e,j,R,F),r&&ja){y=0;break e}break;default:F=Ve,Ve=0,Bt=null,Ca(e,j,R,F)}}kS(),y=Ze;break}catch(I){Wp(e,I)}while(!0);return t&&e.shellSuspendCounter++,Dn=kr=null,ze=i,Y.H=u,Y.A=f,Ne===null&&(Ye=null,Ae=0,Ds()),y}function kS(){for(;Ne!==null;)ng(Ne)}function MS(e,t){var r=ze;ze|=2;var i=eg(),u=tg();Ye!==e||Ae!==t?(sl=null,il=kt()+500,Ta(e,t)):ja=Qa(e,t);e:do try{if(Ve!==0&&Ne!==null){t=Ne;var f=Bt;t:switch(Ve){case 1:Ve=0,Bt=null,Ca(e,t,f,1);break;case 2:case 9:if(fm(f)){Ve=0,Bt=null,rg(t);break}t=function(){Ve!==2&&Ve!==9||Ye!==e||(Ve=7),mn(e)},f.then(t,t);break e;case 3:Ve=7;break e;case 4:Ve=5;break e;case 7:fm(f)?(Ve=0,Bt=null,rg(t)):(Ve=0,Bt=null,Ca(e,t,f,7));break;case 5:var y=null;switch(Ne.tag){case 26:y=Ne.memoizedState;case 5:case 27:var j=Ne;if(y?Yg(y):j.stateNode.complete){Ve=0,Bt=null;var R=j.sibling;if(R!==null)Ne=R;else{var F=j.return;F!==null?(Ne=F,cl(F)):Ne=null}break t}}Ve=0,Bt=null,Ca(e,t,f,5);break;case 6:Ve=0,Bt=null,Ca(e,t,f,6);break;case 8:gu(),Ze=6;break e;default:throw Error(l(462))}}RS();break}catch(I){Wp(e,I)}while(!0);return Dn=kr=null,Y.H=i,Y.A=u,ze=r,Ne!==null?0:(Ye=null,Ae=0,Ds(),Ze)}function RS(){for(;Ne!==null&&!t1();)ng(Ne)}function ng(e){var t=Cp(e.alternate,e,Ln);e.memoizedProps=e.pendingProps,t===null?cl(e):Ne=t}function rg(e){var t=e,r=t.alternate;switch(t.tag){case 15:case 0:t=bp(r,t,t.pendingProps,t.type,void 0,Ae);break;case 11:t=bp(r,t,t.pendingProps,t.type.render,t.ref,Ae);break;case 5:Rc(t);default:Dp(r,t),t=Ne=tm(t,Ln),t=Cp(r,t,Ln)}e.memoizedProps=e.pendingProps,t===null?cl(e):Ne=t}function Ca(e,t,r,i){Dn=kr=null,Rc(t),pa=null,hi=0;var u=t.return;try{if(bS(e,u,t,r,Ae)){Ze=1,Qs(e,Xt(r,e.current)),Ne=null;return}}catch(f){if(u!==null)throw Ne=u,f;Ze=1,Qs(e,Xt(r,e.current)),Ne=null;return}t.flags&32768?(Me||i===1?e=!0:ja||(Ae&536870912)!==0?e=!1:(rr=e=!0,(i===2||i===9||i===3||i===6)&&(i=_t.current,i!==null&&i.tag===13&&(i.flags|=16384))),ag(t,e)):cl(t)}function cl(e){var t=e;do{if((t.flags&32768)!==0){ag(t,rr);return}e=t.return;var r=wS(t.alternate,t,Ln);if(r!==null){Ne=r;return}if(t=t.sibling,t!==null){Ne=t;return}Ne=t=e}while(t!==null);Ze===0&&(Ze=5)}function ag(e,t){do{var r=ES(e.alternate,e);if(r!==null){r.flags&=32767,Ne=r;return}if(r=e.return,r!==null&&(r.flags|=32768,r.subtreeFlags=0,r.deletions=null),!t&&(e=e.sibling,e!==null)){Ne=e;return}Ne=e=r}while(e!==null);Ze=6,Ne=null}function ig(e,t,r,i,u,f,y,j,R){e.cancelPendingCommit=null;do ul();while(it!==0);if((ze&6)!==0)throw Error(l(327));if(t!==null){if(t===e.current)throw Error(l(177));if(f=t.lanes|t.childLanes,f|=ic,d1(e,r,f,y,j,R),e===Ye&&(Ne=Ye=null,Ae=0),Ea=t,sr=e,Un=r,hu=f,mu=u,Kp=i,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,VS(fs,function(){return ug(),null})):(e.callbackNode=null,e.callbackPriority=0),i=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||i){i=Y.T,Y.T=null,u=ae.p,ae.p=2,y=ze,ze|=4;try{TS(e,t,r)}finally{ze=y,ae.p=u,Y.T=i}}it=1,sg(),lg(),og()}}function sg(){if(it===1){it=0;var e=sr,t=Ea,r=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||r){r=Y.T,Y.T=null;var i=ae.p;ae.p=2;var u=ze;ze|=4;try{Hp(t,e);var f=Au,y=Xh(e.containerInfo),j=f.focusedElem,R=f.selectionRange;if(y!==j&&j&&j.ownerDocument&&Fh(j.ownerDocument.documentElement,j)){if(R!==null&&ec(j)){var F=R.start,I=R.end;if(I===void 0&&(I=F),"selectionStart"in j)j.selectionStart=F,j.selectionEnd=Math.min(I,j.value.length);else{var se=j.ownerDocument||document,X=se&&se.defaultView||window;if(X.getSelection){var K=X.getSelection(),pe=j.textContent.length,je=Math.min(R.start,pe),He=R.end===void 0?je:Math.min(R.end,pe);!K.extend&&je>He&&(y=He,He=je,je=y);var H=Gh(j,je),B=Gh(j,He);if(H&&B&&(K.rangeCount!==1||K.anchorNode!==H.node||K.anchorOffset!==H.offset||K.focusNode!==B.node||K.focusOffset!==B.offset)){var P=se.createRange();P.setStart(H.node,H.offset),K.removeAllRanges(),je>He?(K.addRange(P),K.extend(B.node,B.offset)):(P.setEnd(B.node,B.offset),K.addRange(P))}}}}for(se=[],K=j;K=K.parentNode;)K.nodeType===1&&se.push({element:K,left:K.scrollLeft,top:K.scrollTop});for(typeof j.focus=="function"&&j.focus(),j=0;j<se.length;j++){var ne=se[j];ne.element.scrollLeft=ne.left,ne.element.scrollTop=ne.top}}jl=!!Du,Au=Du=null}finally{ze=u,ae.p=i,Y.T=r}}e.current=t,it=2}}function lg(){if(it===2){it=0;var e=sr,t=Ea,r=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||r){r=Y.T,Y.T=null;var i=ae.p;ae.p=2;var u=ze;ze|=4;try{_p(e,t.alternate,t)}finally{ze=u,ae.p=i,Y.T=r}}it=3}}function og(){if(it===4||it===3){it=0,n1();var e=sr,t=Ea,r=Un,i=Kp;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?it=5:(it=0,Ea=sr=null,cg(e,e.pendingLanes));var u=e.pendingLanes;if(u===0&&(ir=null),_o(r),t=t.stateNode,Mt&&typeof Mt.onCommitFiberRoot=="function")try{Mt.onCommitFiberRoot(Za,t,void 0,(t.current.flags&128)===128)}catch{}if(i!==null){t=Y.T,u=ae.p,ae.p=2,Y.T=null;try{for(var f=e.onRecoverableError,y=0;y<i.length;y++){var j=i[y];f(j.value,{componentStack:j.stack})}}finally{Y.T=t,ae.p=u}}(Un&3)!==0&&ul(),mn(e),u=e.pendingLanes,(r&261930)!==0&&(u&42)!==0?e===pu?ki++:(ki=0,pu=e):ki=0,Mi(0)}}function cg(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,di(t)))}function ul(){return sg(),lg(),og(),ug()}function ug(){if(it!==5)return!1;var e=sr,t=hu;hu=0;var r=_o(Un),i=Y.T,u=ae.p;try{ae.p=32>r?32:r,Y.T=null,r=mu,mu=null;var f=sr,y=Un;if(it=0,Ea=sr=null,Un=0,(ze&6)!==0)throw Error(l(331));var j=ze;if(ze|=4,Fp(f.current),Yp(f,f.current,y,r),ze=j,Mi(0,!1),Mt&&typeof Mt.onPostCommitFiberRoot=="function")try{Mt.onPostCommitFiberRoot(Za,f)}catch{}return!0}finally{ae.p=u,Y.T=i,cg(e,t)}}function dg(e,t,r){t=Xt(r,t),t=$c(e.stateNode,t,2),e=In(e,t,2),e!==null&&(Ja(e,2),mn(e))}function Be(e,t,r){if(e.tag===3)dg(e,e,r);else for(;t!==null;){if(t.tag===3){dg(t,e,r);break}else if(t.tag===1){var i=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(ir===null||!ir.has(i))){e=Xt(r,e),r=fp(2),i=In(t,r,2),i!==null&&(hp(r,i,t,e),Ja(i,2),mn(i));break}}t=t.return}}function vu(e,t,r){var i=e.pingCache;if(i===null){i=e.pingCache=new DS;var u=new Set;i.set(t,u)}else u=i.get(t),u===void 0&&(u=new Set,i.set(t,u));u.has(r)||(uu=!0,u.add(r),e=OS.bind(null,e,t,r),t.then(e,e))}function OS(e,t,r){var i=e.pingCache;i!==null&&i.delete(t),e.pingedLanes|=e.suspendedLanes&r,e.warmLanes&=~r,Ye===e&&(Ae&r)===r&&(Ze===4||Ze===3&&(Ae&62914560)===Ae&&300>kt()-al?(ze&2)===0&&Ta(e,0):du|=r,wa===Ae&&(wa=0)),mn(e)}function fg(e,t){t===0&&(t=sh()),e=Nr(e,t),e!==null&&(Ja(e,t),mn(e))}function zS(e){var t=e.memoizedState,r=0;t!==null&&(r=t.retryLane),fg(e,r)}function _S(e,t){var r=0;switch(e.tag){case 31:case 13:var i=e.stateNode,u=e.memoizedState;u!==null&&(r=u.retryLane);break;case 19:i=e.stateNode;break;case 22:i=e.stateNode._retryCache;break;default:throw Error(l(314))}i!==null&&i.delete(t),fg(e,r)}function VS(e,t){return Mo(e,t)}var dl=null,Na=null,xu=!1,fl=!1,bu=!1,or=0;function mn(e){e!==Na&&e.next===null&&(Na===null?dl=Na=e:Na=Na.next=e),fl=!0,xu||(xu=!0,LS())}function Mi(e,t){if(!bu&&fl){bu=!0;do for(var r=!1,i=dl;i!==null;){if(e!==0){var u=i.pendingLanes;if(u===0)var f=0;else{var y=i.suspendedLanes,j=i.pingedLanes;f=(1<<31-Rt(42|e)+1)-1,f&=u&~(y&~j),f=f&201326741?f&201326741|1:f?f|2:0}f!==0&&(r=!0,gg(i,f))}else f=Ae,f=gs(i,i===Ye?f:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),(f&3)===0||Qa(i,f)||(r=!0,gg(i,f));i=i.next}while(r);bu=!1}}function BS(){hg()}function hg(){fl=xu=!1;var e=0;or!==0&&KS()&&(e=or);for(var t=kt(),r=null,i=dl;i!==null;){var u=i.next,f=mg(i,t);f===0?(i.next=null,r===null?dl=u:r.next=u,u===null&&(Na=r)):(r=i,(e!==0||(f&3)!==0)&&(fl=!0)),i=u}it!==0&&it!==5||Mi(e),or!==0&&(or=0)}function mg(e,t){for(var r=e.suspendedLanes,i=e.pingedLanes,u=e.expirationTimes,f=e.pendingLanes&-62914561;0<f;){var y=31-Rt(f),j=1<<y,R=u[y];R===-1?((j&r)===0||(j&i)!==0)&&(u[y]=u1(j,t)):R<=t&&(e.expiredLanes|=j),f&=~j}if(t=Ye,r=Ae,r=gs(e,e===t?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i=e.callbackNode,r===0||e===t&&(Ve===2||Ve===9)||e.cancelPendingCommit!==null)return i!==null&&i!==null&&Ro(i),e.callbackNode=null,e.callbackPriority=0;if((r&3)===0||Qa(e,r)){if(t=r&-r,t===e.callbackPriority)return t;switch(i!==null&&Ro(i),_o(r)){case 2:case 8:r=ah;break;case 32:r=fs;break;case 268435456:r=ih;break;default:r=fs}return i=pg.bind(null,e),r=Mo(r,i),e.callbackPriority=t,e.callbackNode=r,t}return i!==null&&i!==null&&Ro(i),e.callbackPriority=2,e.callbackNode=null,2}function pg(e,t){if(it!==0&&it!==5)return e.callbackNode=null,e.callbackPriority=0,null;var r=e.callbackNode;if(ul()&&e.callbackNode!==r)return null;var i=Ae;return i=gs(e,e===Ye?i:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i===0?null:(Qp(e,i,t),mg(e,kt()),e.callbackNode!=null&&e.callbackNode===r?pg.bind(null,e):null)}function gg(e,t){if(ul())return null;Qp(e,t,!0)}function LS(){QS(function(){(ze&6)!==0?Mo(rh,BS):hg()})}function Su(){if(or===0){var e=fa;e===0&&(e=hs,hs<<=1,(hs&261888)===0&&(hs=256)),or=e}return or}function yg(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:bs(""+e)}function vg(e,t){var r=t.ownerDocument.createElement("input");return r.name=t.name,r.value=t.value,e.id&&r.setAttribute("form",e.id),t.parentNode.insertBefore(r,t),e=new FormData(e),r.parentNode.removeChild(r),e}function US(e,t,r,i,u){if(t==="submit"&&r&&r.stateNode===u){var f=yg((u[wt]||null).action),y=i.submitter;y&&(t=(t=y[wt]||null)?yg(t.formAction):y.getAttribute("formAction"),t!==null&&(f=t,y=null));var j=new Es("action","action",null,i,u);e.push({event:j,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(or!==0){var R=y?vg(u,y):new FormData(u);qc(r,{pending:!0,data:R,method:u.method,action:f},null,R)}}else typeof f=="function"&&(j.preventDefault(),R=y?vg(u,y):new FormData(u),qc(r,{pending:!0,data:R,method:u.method,action:f},f,R))},currentTarget:u}]})}}for(var ju=0;ju<ac.length;ju++){var wu=ac[ju],HS=wu.toLowerCase(),qS=wu[0].toUpperCase()+wu.slice(1);rn(HS,"on"+qS)}rn(Zh,"onAnimationEnd"),rn(Qh,"onAnimationIteration"),rn(Jh,"onAnimationStart"),rn("dblclick","onDoubleClick"),rn("focusin","onFocus"),rn("focusout","onBlur"),rn(rS,"onTransitionRun"),rn(aS,"onTransitionStart"),rn(iS,"onTransitionCancel"),rn(Wh,"onTransitionEnd"),Wr("onMouseEnter",["mouseout","mouseover"]),Wr("onMouseLeave",["mouseout","mouseover"]),Wr("onPointerEnter",["pointerout","pointerover"]),Wr("onPointerLeave",["pointerout","pointerover"]),wr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),wr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),wr("onBeforeInput",["compositionend","keypress","textInput","paste"]),wr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),wr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),wr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ri="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),YS=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ri));function xg(e,t){t=(t&4)!==0;for(var r=0;r<e.length;r++){var i=e[r],u=i.event;i=i.listeners;e:{var f=void 0;if(t)for(var y=i.length-1;0<=y;y--){var j=i[y],R=j.instance,F=j.currentTarget;if(j=j.listener,R!==f&&u.isPropagationStopped())break e;f=j,u.currentTarget=F;try{f(u)}catch(I){Ns(I)}u.currentTarget=null,f=R}else for(y=0;y<i.length;y++){if(j=i[y],R=j.instance,F=j.currentTarget,j=j.listener,R!==f&&u.isPropagationStopped())break e;f=j,u.currentTarget=F;try{f(u)}catch(I){Ns(I)}u.currentTarget=null,f=R}}}}function De(e,t){var r=t[Vo];r===void 0&&(r=t[Vo]=new Set);var i=e+"__bubble";r.has(i)||(bg(t,e,2,!1),r.add(i))}function Eu(e,t,r){var i=0;t&&(i|=4),bg(r,e,i,t)}var hl="_reactListening"+Math.random().toString(36).slice(2);function Tu(e){if(!e[hl]){e[hl]=!0,hh.forEach(function(r){r!=="selectionchange"&&(YS.has(r)||Eu(r,!1,e),Eu(r,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[hl]||(t[hl]=!0,Eu("selectionchange",!1,t))}}function bg(e,t,r,i){switch(Zg(t)){case 2:var u=gj;break;case 8:u=yj;break;default:u=Hu}r=u.bind(null,t,r,e),u=void 0,!Fo||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(u=!0),i?u!==void 0?e.addEventListener(t,r,{capture:!0,passive:u}):e.addEventListener(t,r,!0):u!==void 0?e.addEventListener(t,r,{passive:u}):e.addEventListener(t,r,!1)}function Cu(e,t,r,i,u){var f=i;if((t&1)===0&&(t&2)===0&&i!==null)e:for(;;){if(i===null)return;var y=i.tag;if(y===3||y===4){var j=i.stateNode.containerInfo;if(j===u)break;if(y===4)for(y=i.return;y!==null;){var R=y.tag;if((R===3||R===4)&&y.stateNode.containerInfo===u)return;y=y.return}for(;j!==null;){if(y=Zr(j),y===null)return;if(R=y.tag,R===5||R===6||R===26||R===27){i=f=y;continue e}j=j.parentNode}}i=i.return}Th(function(){var F=f,I=Po(r),se=[];e:{var X=Ih.get(e);if(X!==void 0){var K=Es,pe=e;switch(e){case"keypress":if(js(r)===0)break e;case"keydown":case"keyup":K=_1;break;case"focusin":pe="focus",K=Zo;break;case"focusout":pe="blur",K=Zo;break;case"beforeblur":case"afterblur":K=Zo;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":K=Dh;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":K=w1;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":K=L1;break;case Zh:case Qh:case Jh:K=C1;break;case Wh:K=H1;break;case"scroll":case"scrollend":K=S1;break;case"wheel":K=Y1;break;case"copy":case"cut":case"paste":K=D1;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":K=kh;break;case"toggle":case"beforetoggle":K=G1}var je=(t&4)!==0,He=!je&&(e==="scroll"||e==="scrollend"),H=je?X!==null?X+"Capture":null:X;je=[];for(var B=F,P;B!==null;){var ne=B;if(P=ne.stateNode,ne=ne.tag,ne!==5&&ne!==26&&ne!==27||P===null||H===null||(ne=ei(B,H),ne!=null&&je.push(Oi(B,ne,P))),He)break;B=B.return}0<je.length&&(X=new K(X,pe,null,r,I),se.push({event:X,listeners:je}))}}if((t&7)===0){e:{if(X=e==="mouseover"||e==="pointerover",K=e==="mouseout"||e==="pointerout",X&&r!==Yo&&(pe=r.relatedTarget||r.fromElement)&&(Zr(pe)||pe[Kr]))break e;if((K||X)&&(X=I.window===I?I:(X=I.ownerDocument)?X.defaultView||X.parentWindow:window,K?(pe=r.relatedTarget||r.toElement,K=F,pe=pe?Zr(pe):null,pe!==null&&(He=h(pe),je=pe.tag,pe!==He||je!==5&&je!==27&&je!==6)&&(pe=null)):(K=null,pe=F),K!==pe)){if(je=Dh,ne="onMouseLeave",H="onMouseEnter",B="mouse",(e==="pointerout"||e==="pointerover")&&(je=kh,ne="onPointerLeave",H="onPointerEnter",B="pointer"),He=K==null?X:Ia(K),P=pe==null?X:Ia(pe),X=new je(ne,B+"leave",K,r,I),X.target=He,X.relatedTarget=P,ne=null,Zr(I)===F&&(je=new je(H,B+"enter",pe,r,I),je.target=P,je.relatedTarget=He,ne=je),He=ne,K&&pe)t:{for(je=PS,H=K,B=pe,P=0,ne=H;ne;ne=je(ne))P++;ne=0;for(var Se=B;Se;Se=je(Se))ne++;for(;0<P-ne;)H=je(H),P--;for(;0<ne-P;)B=je(B),ne--;for(;P--;){if(H===B||B!==null&&H===B.alternate){je=H;break t}H=je(H),B=je(B)}je=null}else je=null;K!==null&&Sg(se,X,K,je,!1),pe!==null&&He!==null&&Sg(se,He,pe,je,!0)}}e:{if(X=F?Ia(F):window,K=X.nodeName&&X.nodeName.toLowerCase(),K==="select"||K==="input"&&X.type==="file")var Re=Lh;else if(Vh(X))if(Uh)Re=eS;else{Re=W1;var ve=J1}else K=X.nodeName,!K||K.toLowerCase()!=="input"||X.type!=="checkbox"&&X.type!=="radio"?F&&qo(F.elementType)&&(Re=Lh):Re=I1;if(Re&&(Re=Re(e,F))){Bh(se,Re,r,I);break e}ve&&ve(e,X,F),e==="focusout"&&F&&X.type==="number"&&F.memoizedProps.value!=null&&Ho(X,"number",X.value)}switch(ve=F?Ia(F):window,e){case"focusin":(Vh(ve)||ve.contentEditable==="true")&&(aa=ve,tc=F,oi=null);break;case"focusout":oi=tc=aa=null;break;case"mousedown":nc=!0;break;case"contextmenu":case"mouseup":case"dragend":nc=!1,$h(se,r,I);break;case"selectionchange":if(nS)break;case"keydown":case"keyup":$h(se,r,I)}var Te;if(Jo)e:{switch(e){case"compositionstart":var ke="onCompositionStart";break e;case"compositionend":ke="onCompositionEnd";break e;case"compositionupdate":ke="onCompositionUpdate";break e}ke=void 0}else ra?zh(e,r)&&(ke="onCompositionEnd"):e==="keydown"&&r.keyCode===229&&(ke="onCompositionStart");ke&&(Mh&&r.locale!=="ko"&&(ra||ke!=="onCompositionStart"?ke==="onCompositionEnd"&&ra&&(Te=Ch()):(Xn=I,Xo="value"in Xn?Xn.value:Xn.textContent,ra=!0)),ve=ml(F,ke),0<ve.length&&(ke=new Ah(ke,e,null,r,I),se.push({event:ke,listeners:ve}),Te?ke.data=Te:(Te=_h(r),Te!==null&&(ke.data=Te)))),(Te=X1?$1(e,r):K1(e,r))&&(ke=ml(F,"onBeforeInput"),0<ke.length&&(ve=new Ah("onBeforeInput","beforeinput",null,r,I),se.push({event:ve,listeners:ke}),ve.data=Te)),US(se,e,F,r,I)}xg(se,t)})}function Oi(e,t,r){return{instance:e,listener:t,currentTarget:r}}function ml(e,t){for(var r=t+"Capture",i=[];e!==null;){var u=e,f=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||f===null||(u=ei(e,r),u!=null&&i.unshift(Oi(e,u,f)),u=ei(e,t),u!=null&&i.push(Oi(e,u,f))),e.tag===3)return i;e=e.return}return[]}function PS(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Sg(e,t,r,i,u){for(var f=t._reactName,y=[];r!==null&&r!==i;){var j=r,R=j.alternate,F=j.stateNode;if(j=j.tag,R!==null&&R===i)break;j!==5&&j!==26&&j!==27||F===null||(R=F,u?(F=ei(r,f),F!=null&&y.unshift(Oi(r,F,R))):u||(F=ei(r,f),F!=null&&y.push(Oi(r,F,R)))),r=r.return}y.length!==0&&e.push({event:t,listeners:y})}var GS=/\r\n?/g,FS=/\u0000|\uFFFD/g;function jg(e){return(typeof e=="string"?e:""+e).replace(GS,`
`).replace(FS,"")}function wg(e,t){return t=jg(t),jg(e)===t}function Ue(e,t,r,i,u,f){switch(r){case"children":typeof i=="string"?t==="body"||t==="textarea"&&i===""||ea(e,i):(typeof i=="number"||typeof i=="bigint")&&t!=="body"&&ea(e,""+i);break;case"className":vs(e,"class",i);break;case"tabIndex":vs(e,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":vs(e,r,i);break;case"style":wh(e,i,f);break;case"data":if(t!=="object"){vs(e,"data",i);break}case"src":case"href":if(i===""&&(t!=="a"||r!=="href")){e.removeAttribute(r);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(r);break}i=bs(""+i),e.setAttribute(r,i);break;case"action":case"formAction":if(typeof i=="function"){e.setAttribute(r,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof f=="function"&&(r==="formAction"?(t!=="input"&&Ue(e,t,"name",u.name,u,null),Ue(e,t,"formEncType",u.formEncType,u,null),Ue(e,t,"formMethod",u.formMethod,u,null),Ue(e,t,"formTarget",u.formTarget,u,null)):(Ue(e,t,"encType",u.encType,u,null),Ue(e,t,"method",u.method,u,null),Ue(e,t,"target",u.target,u,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(r);break}i=bs(""+i),e.setAttribute(r,i);break;case"onClick":i!=null&&(e.onclick=En);break;case"onScroll":i!=null&&De("scroll",e);break;case"onScrollEnd":i!=null&&De("scrollend",e);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(l(61));if(r=i.__html,r!=null){if(u.children!=null)throw Error(l(60));e.innerHTML=r}}break;case"multiple":e.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":e.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){e.removeAttribute("xlink:href");break}r=bs(""+i),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",r);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(r,""+i):e.removeAttribute(r);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(r,""):e.removeAttribute(r);break;case"capture":case"download":i===!0?e.setAttribute(r,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(r,i):e.removeAttribute(r);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?e.setAttribute(r,i):e.removeAttribute(r);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?e.removeAttribute(r):e.setAttribute(r,i);break;case"popover":De("beforetoggle",e),De("toggle",e),ys(e,"popover",i);break;case"xlinkActuate":wn(e,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":wn(e,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":wn(e,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":wn(e,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":wn(e,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":wn(e,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":wn(e,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":wn(e,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":wn(e,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":ys(e,"is",i);break;case"innerText":case"textContent":break;default:(!(2<r.length)||r[0]!=="o"&&r[0]!=="O"||r[1]!=="n"&&r[1]!=="N")&&(r=x1.get(r)||r,ys(e,r,i))}}function Nu(e,t,r,i,u,f){switch(r){case"style":wh(e,i,f);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(l(61));if(r=i.__html,r!=null){if(u.children!=null)throw Error(l(60));e.innerHTML=r}}break;case"children":typeof i=="string"?ea(e,i):(typeof i=="number"||typeof i=="bigint")&&ea(e,""+i);break;case"onScroll":i!=null&&De("scroll",e);break;case"onScrollEnd":i!=null&&De("scrollend",e);break;case"onClick":i!=null&&(e.onclick=En);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!mh.hasOwnProperty(r))e:{if(r[0]==="o"&&r[1]==="n"&&(u=r.endsWith("Capture"),t=r.slice(2,u?r.length-7:void 0),f=e[wt]||null,f=f!=null?f[r]:null,typeof f=="function"&&e.removeEventListener(t,f,u),typeof i=="function")){typeof f!="function"&&f!==null&&(r in e?e[r]=null:e.hasAttribute(r)&&e.removeAttribute(r)),e.addEventListener(t,i,u);break e}r in e?e[r]=i:i===!0?e.setAttribute(r,""):ys(e,r,i)}}}function mt(e,t,r){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":De("error",e),De("load",e);var i=!1,u=!1,f;for(f in r)if(r.hasOwnProperty(f)){var y=r[f];if(y!=null)switch(f){case"src":i=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(l(137,t));default:Ue(e,t,f,y,r,null)}}u&&Ue(e,t,"srcSet",r.srcSet,r,null),i&&Ue(e,t,"src",r.src,r,null);return;case"input":De("invalid",e);var j=f=y=u=null,R=null,F=null;for(i in r)if(r.hasOwnProperty(i)){var I=r[i];if(I!=null)switch(i){case"name":u=I;break;case"type":y=I;break;case"checked":R=I;break;case"defaultChecked":F=I;break;case"value":f=I;break;case"defaultValue":j=I;break;case"children":case"dangerouslySetInnerHTML":if(I!=null)throw Error(l(137,t));break;default:Ue(e,t,i,I,r,null)}}xh(e,f,j,R,F,y,u,!1);return;case"select":De("invalid",e),i=y=f=null;for(u in r)if(r.hasOwnProperty(u)&&(j=r[u],j!=null))switch(u){case"value":f=j;break;case"defaultValue":y=j;break;case"multiple":i=j;default:Ue(e,t,u,j,r,null)}t=f,r=y,e.multiple=!!i,t!=null?Ir(e,!!i,t,!1):r!=null&&Ir(e,!!i,r,!0);return;case"textarea":De("invalid",e),f=u=i=null;for(y in r)if(r.hasOwnProperty(y)&&(j=r[y],j!=null))switch(y){case"value":i=j;break;case"defaultValue":u=j;break;case"children":f=j;break;case"dangerouslySetInnerHTML":if(j!=null)throw Error(l(91));break;default:Ue(e,t,y,j,r,null)}Sh(e,i,u,f);return;case"option":for(R in r)if(r.hasOwnProperty(R)&&(i=r[R],i!=null))switch(R){case"selected":e.selected=i&&typeof i!="function"&&typeof i!="symbol";break;default:Ue(e,t,R,i,r,null)}return;case"dialog":De("beforetoggle",e),De("toggle",e),De("cancel",e),De("close",e);break;case"iframe":case"object":De("load",e);break;case"video":case"audio":for(i=0;i<Ri.length;i++)De(Ri[i],e);break;case"image":De("error",e),De("load",e);break;case"details":De("toggle",e);break;case"embed":case"source":case"link":De("error",e),De("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(F in r)if(r.hasOwnProperty(F)&&(i=r[F],i!=null))switch(F){case"children":case"dangerouslySetInnerHTML":throw Error(l(137,t));default:Ue(e,t,F,i,r,null)}return;default:if(qo(t)){for(I in r)r.hasOwnProperty(I)&&(i=r[I],i!==void 0&&Nu(e,t,I,i,r,void 0));return}}for(j in r)r.hasOwnProperty(j)&&(i=r[j],i!=null&&Ue(e,t,j,i,r,null))}function XS(e,t,r,i){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,f=null,y=null,j=null,R=null,F=null,I=null;for(K in r){var se=r[K];if(r.hasOwnProperty(K)&&se!=null)switch(K){case"checked":break;case"value":break;case"defaultValue":R=se;default:i.hasOwnProperty(K)||Ue(e,t,K,null,i,se)}}for(var X in i){var K=i[X];if(se=r[X],i.hasOwnProperty(X)&&(K!=null||se!=null))switch(X){case"type":f=K;break;case"name":u=K;break;case"checked":F=K;break;case"defaultChecked":I=K;break;case"value":y=K;break;case"defaultValue":j=K;break;case"children":case"dangerouslySetInnerHTML":if(K!=null)throw Error(l(137,t));break;default:K!==se&&Ue(e,t,X,K,i,se)}}Uo(e,y,j,R,F,I,f,u);return;case"select":K=y=j=X=null;for(f in r)if(R=r[f],r.hasOwnProperty(f)&&R!=null)switch(f){case"value":break;case"multiple":K=R;default:i.hasOwnProperty(f)||Ue(e,t,f,null,i,R)}for(u in i)if(f=i[u],R=r[u],i.hasOwnProperty(u)&&(f!=null||R!=null))switch(u){case"value":X=f;break;case"defaultValue":j=f;break;case"multiple":y=f;default:f!==R&&Ue(e,t,u,f,i,R)}t=j,r=y,i=K,X!=null?Ir(e,!!r,X,!1):!!i!=!!r&&(t!=null?Ir(e,!!r,t,!0):Ir(e,!!r,r?[]:"",!1));return;case"textarea":K=X=null;for(j in r)if(u=r[j],r.hasOwnProperty(j)&&u!=null&&!i.hasOwnProperty(j))switch(j){case"value":break;case"children":break;default:Ue(e,t,j,null,i,u)}for(y in i)if(u=i[y],f=r[y],i.hasOwnProperty(y)&&(u!=null||f!=null))switch(y){case"value":X=u;break;case"defaultValue":K=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(l(91));break;default:u!==f&&Ue(e,t,y,u,i,f)}bh(e,X,K);return;case"option":for(var pe in r)if(X=r[pe],r.hasOwnProperty(pe)&&X!=null&&!i.hasOwnProperty(pe))switch(pe){case"selected":e.selected=!1;break;default:Ue(e,t,pe,null,i,X)}for(R in i)if(X=i[R],K=r[R],i.hasOwnProperty(R)&&X!==K&&(X!=null||K!=null))switch(R){case"selected":e.selected=X&&typeof X!="function"&&typeof X!="symbol";break;default:Ue(e,t,R,X,i,K)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var je in r)X=r[je],r.hasOwnProperty(je)&&X!=null&&!i.hasOwnProperty(je)&&Ue(e,t,je,null,i,X);for(F in i)if(X=i[F],K=r[F],i.hasOwnProperty(F)&&X!==K&&(X!=null||K!=null))switch(F){case"children":case"dangerouslySetInnerHTML":if(X!=null)throw Error(l(137,t));break;default:Ue(e,t,F,X,i,K)}return;default:if(qo(t)){for(var He in r)X=r[He],r.hasOwnProperty(He)&&X!==void 0&&!i.hasOwnProperty(He)&&Nu(e,t,He,void 0,i,X);for(I in i)X=i[I],K=r[I],!i.hasOwnProperty(I)||X===K||X===void 0&&K===void 0||Nu(e,t,I,X,i,K);return}}for(var H in r)X=r[H],r.hasOwnProperty(H)&&X!=null&&!i.hasOwnProperty(H)&&Ue(e,t,H,null,i,X);for(se in i)X=i[se],K=r[se],!i.hasOwnProperty(se)||X===K||X==null&&K==null||Ue(e,t,se,X,i,K)}function Eg(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function $S(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,r=performance.getEntriesByType("resource"),i=0;i<r.length;i++){var u=r[i],f=u.transferSize,y=u.initiatorType,j=u.duration;if(f&&j&&Eg(y)){for(y=0,j=u.responseEnd,i+=1;i<r.length;i++){var R=r[i],F=R.startTime;if(F>j)break;var I=R.transferSize,se=R.initiatorType;I&&Eg(se)&&(R=R.responseEnd,y+=I*(R<j?1:(j-F)/(R-F)))}if(--i,t+=8*(f+y)/(u.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Du=null,Au=null;function pl(e){return e.nodeType===9?e:e.ownerDocument}function Tg(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Cg(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function ku(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Mu=null;function KS(){var e=window.event;return e&&e.type==="popstate"?e===Mu?!1:(Mu=e,!0):(Mu=null,!1)}var Ng=typeof setTimeout=="function"?setTimeout:void 0,ZS=typeof clearTimeout=="function"?clearTimeout:void 0,Dg=typeof Promise=="function"?Promise:void 0,QS=typeof queueMicrotask=="function"?queueMicrotask:typeof Dg<"u"?function(e){return Dg.resolve(null).then(e).catch(JS)}:Ng;function JS(e){setTimeout(function(){throw e})}function cr(e){return e==="head"}function Ag(e,t){var r=t,i=0;do{var u=r.nextSibling;if(e.removeChild(r),u&&u.nodeType===8)if(r=u.data,r==="/$"||r==="/&"){if(i===0){e.removeChild(u),Ma(t);return}i--}else if(r==="$"||r==="$?"||r==="$~"||r==="$!"||r==="&")i++;else if(r==="html")zi(e.ownerDocument.documentElement);else if(r==="head"){r=e.ownerDocument.head,zi(r);for(var f=r.firstChild;f;){var y=f.nextSibling,j=f.nodeName;f[Wa]||j==="SCRIPT"||j==="STYLE"||j==="LINK"&&f.rel.toLowerCase()==="stylesheet"||r.removeChild(f),f=y}}else r==="body"&&zi(e.ownerDocument.body);r=u}while(r);Ma(t)}function kg(e,t){var r=e;e=0;do{var i=r.nextSibling;if(r.nodeType===1?t?(r._stashedDisplay=r.style.display,r.style.display="none"):(r.style.display=r._stashedDisplay||"",r.getAttribute("style")===""&&r.removeAttribute("style")):r.nodeType===3&&(t?(r._stashedText=r.nodeValue,r.nodeValue=""):r.nodeValue=r._stashedText||""),i&&i.nodeType===8)if(r=i.data,r==="/$"){if(e===0)break;e--}else r!=="$"&&r!=="$?"&&r!=="$~"&&r!=="$!"||e++;r=i}while(r)}function Ru(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var r=t;switch(t=t.nextSibling,r.nodeName){case"HTML":case"HEAD":case"BODY":Ru(r),Bo(r);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(r.rel.toLowerCase()==="stylesheet")continue}e.removeChild(r)}}function WS(e,t,r,i){for(;e.nodeType===1;){var u=r;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!i&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(i){if(!e[Wa])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(f=e.getAttribute("rel"),f==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(f!==u.rel||e.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||e.getAttribute("title")!==(u.title==null?null:u.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(f=e.getAttribute("src"),(f!==(u.src==null?null:u.src)||e.getAttribute("type")!==(u.type==null?null:u.type)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&f&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var f=u.name==null?null:""+u.name;if(u.type==="hidden"&&e.getAttribute("name")===f)return e}else return e;if(e=Jt(e.nextSibling),e===null)break}return null}function IS(e,t,r){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!r||(e=Jt(e.nextSibling),e===null))return null;return e}function Mg(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Jt(e.nextSibling),e===null))return null;return e}function Ou(e){return e.data==="$?"||e.data==="$~"}function zu(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function ej(e,t){var r=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||r.readyState!=="loading")t();else{var i=function(){t(),r.removeEventListener("DOMContentLoaded",i)};r.addEventListener("DOMContentLoaded",i),e._reactRetry=i}}function Jt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var _u=null;function Rg(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="/$"||r==="/&"){if(t===0)return Jt(e.nextSibling);t--}else r!=="$"&&r!=="$!"&&r!=="$?"&&r!=="$~"&&r!=="&"||t++}e=e.nextSibling}return null}function Og(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="$"||r==="$!"||r==="$?"||r==="$~"||r==="&"){if(t===0)return e;t--}else r!=="/$"&&r!=="/&"||t++}e=e.previousSibling}return null}function zg(e,t,r){switch(t=pl(r),e){case"html":if(e=t.documentElement,!e)throw Error(l(452));return e;case"head":if(e=t.head,!e)throw Error(l(453));return e;case"body":if(e=t.body,!e)throw Error(l(454));return e;default:throw Error(l(451))}}function zi(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Bo(e)}var Wt=new Map,_g=new Set;function gl(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Hn=ae.d;ae.d={f:tj,r:nj,D:rj,C:aj,L:ij,m:sj,X:oj,S:lj,M:cj};function tj(){var e=Hn.f(),t=ll();return e||t}function nj(e){var t=Qr(e);t!==null&&t.tag===5&&t.type==="form"?Wm(t):Hn.r(e)}var Da=typeof document>"u"?null:document;function Vg(e,t,r){var i=Da;if(i&&typeof t=="string"&&t){var u=Gt(t);u='link[rel="'+e+'"][href="'+u+'"]',typeof r=="string"&&(u+='[crossorigin="'+r+'"]'),_g.has(u)||(_g.add(u),e={rel:e,crossOrigin:r,href:t},i.querySelector(u)===null&&(t=i.createElement("link"),mt(t,"link",e),lt(t),i.head.appendChild(t)))}}function rj(e){Hn.D(e),Vg("dns-prefetch",e,null)}function aj(e,t){Hn.C(e,t),Vg("preconnect",e,t)}function ij(e,t,r){Hn.L(e,t,r);var i=Da;if(i&&e&&t){var u='link[rel="preload"][as="'+Gt(t)+'"]';t==="image"&&r&&r.imageSrcSet?(u+='[imagesrcset="'+Gt(r.imageSrcSet)+'"]',typeof r.imageSizes=="string"&&(u+='[imagesizes="'+Gt(r.imageSizes)+'"]')):u+='[href="'+Gt(e)+'"]';var f=u;switch(t){case"style":f=Aa(e);break;case"script":f=ka(e)}Wt.has(f)||(e=x({rel:"preload",href:t==="image"&&r&&r.imageSrcSet?void 0:e,as:t},r),Wt.set(f,e),i.querySelector(u)!==null||t==="style"&&i.querySelector(_i(f))||t==="script"&&i.querySelector(Vi(f))||(t=i.createElement("link"),mt(t,"link",e),lt(t),i.head.appendChild(t)))}}function sj(e,t){Hn.m(e,t);var r=Da;if(r&&e){var i=t&&typeof t.as=="string"?t.as:"script",u='link[rel="modulepreload"][as="'+Gt(i)+'"][href="'+Gt(e)+'"]',f=u;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":f=ka(e)}if(!Wt.has(f)&&(e=x({rel:"modulepreload",href:e},t),Wt.set(f,e),r.querySelector(u)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(r.querySelector(Vi(f)))return}i=r.createElement("link"),mt(i,"link",e),lt(i),r.head.appendChild(i)}}}function lj(e,t,r){Hn.S(e,t,r);var i=Da;if(i&&e){var u=Jr(i).hoistableStyles,f=Aa(e);t=t||"default";var y=u.get(f);if(!y){var j={loading:0,preload:null};if(y=i.querySelector(_i(f)))j.loading=5;else{e=x({rel:"stylesheet",href:e,"data-precedence":t},r),(r=Wt.get(f))&&Vu(e,r);var R=y=i.createElement("link");lt(R),mt(R,"link",e),R._p=new Promise(function(F,I){R.onload=F,R.onerror=I}),R.addEventListener("load",function(){j.loading|=1}),R.addEventListener("error",function(){j.loading|=2}),j.loading|=4,yl(y,t,i)}y={type:"stylesheet",instance:y,count:1,state:j},u.set(f,y)}}}function oj(e,t){Hn.X(e,t);var r=Da;if(r&&e){var i=Jr(r).hoistableScripts,u=ka(e),f=i.get(u);f||(f=r.querySelector(Vi(u)),f||(e=x({src:e,async:!0},t),(t=Wt.get(u))&&Bu(e,t),f=r.createElement("script"),lt(f),mt(f,"link",e),r.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},i.set(u,f))}}function cj(e,t){Hn.M(e,t);var r=Da;if(r&&e){var i=Jr(r).hoistableScripts,u=ka(e),f=i.get(u);f||(f=r.querySelector(Vi(u)),f||(e=x({src:e,async:!0,type:"module"},t),(t=Wt.get(u))&&Bu(e,t),f=r.createElement("script"),lt(f),mt(f,"link",e),r.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},i.set(u,f))}}function Bg(e,t,r,i){var u=(u=ce.current)?gl(u):null;if(!u)throw Error(l(446));switch(e){case"meta":case"title":return null;case"style":return typeof r.precedence=="string"&&typeof r.href=="string"?(t=Aa(r.href),r=Jr(u).hoistableStyles,i=r.get(t),i||(i={type:"style",instance:null,count:0,state:null},r.set(t,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(r.rel==="stylesheet"&&typeof r.href=="string"&&typeof r.precedence=="string"){e=Aa(r.href);var f=Jr(u).hoistableStyles,y=f.get(e);if(y||(u=u.ownerDocument||u,y={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},f.set(e,y),(f=u.querySelector(_i(e)))&&!f._p&&(y.instance=f,y.state.loading=5),Wt.has(e)||(r={rel:"preload",as:"style",href:r.href,crossOrigin:r.crossOrigin,integrity:r.integrity,media:r.media,hrefLang:r.hrefLang,referrerPolicy:r.referrerPolicy},Wt.set(e,r),f||uj(u,e,r,y.state))),t&&i===null)throw Error(l(528,""));return y}if(t&&i!==null)throw Error(l(529,""));return null;case"script":return t=r.async,r=r.src,typeof r=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=ka(r),r=Jr(u).hoistableScripts,i=r.get(t),i||(i={type:"script",instance:null,count:0,state:null},r.set(t,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(l(444,e))}}function Aa(e){return'href="'+Gt(e)+'"'}function _i(e){return'link[rel="stylesheet"]['+e+"]"}function Lg(e){return x({},e,{"data-precedence":e.precedence,precedence:null})}function uj(e,t,r,i){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?i.loading=1:(t=e.createElement("link"),i.preload=t,t.addEventListener("load",function(){return i.loading|=1}),t.addEventListener("error",function(){return i.loading|=2}),mt(t,"link",r),lt(t),e.head.appendChild(t))}function ka(e){return'[src="'+Gt(e)+'"]'}function Vi(e){return"script[async]"+e}function Ug(e,t,r){if(t.count++,t.instance===null)switch(t.type){case"style":var i=e.querySelector('style[data-href~="'+Gt(r.href)+'"]');if(i)return t.instance=i,lt(i),i;var u=x({},r,{"data-href":r.href,"data-precedence":r.precedence,href:null,precedence:null});return i=(e.ownerDocument||e).createElement("style"),lt(i),mt(i,"style",u),yl(i,r.precedence,e),t.instance=i;case"stylesheet":u=Aa(r.href);var f=e.querySelector(_i(u));if(f)return t.state.loading|=4,t.instance=f,lt(f),f;i=Lg(r),(u=Wt.get(u))&&Vu(i,u),f=(e.ownerDocument||e).createElement("link"),lt(f);var y=f;return y._p=new Promise(function(j,R){y.onload=j,y.onerror=R}),mt(f,"link",i),t.state.loading|=4,yl(f,r.precedence,e),t.instance=f;case"script":return f=ka(r.src),(u=e.querySelector(Vi(f)))?(t.instance=u,lt(u),u):(i=r,(u=Wt.get(f))&&(i=x({},r),Bu(i,u)),e=e.ownerDocument||e,u=e.createElement("script"),lt(u),mt(u,"link",i),e.head.appendChild(u),t.instance=u);case"void":return null;default:throw Error(l(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(i=t.instance,t.state.loading|=4,yl(i,r.precedence,e));return t.instance}function yl(e,t,r){for(var i=r.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=i.length?i[i.length-1]:null,f=u,y=0;y<i.length;y++){var j=i[y];if(j.dataset.precedence===t)f=j;else if(f!==u)break}f?f.parentNode.insertBefore(e,f.nextSibling):(t=r.nodeType===9?r.head:r,t.insertBefore(e,t.firstChild))}function Vu(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function Bu(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var vl=null;function Hg(e,t,r){if(vl===null){var i=new Map,u=vl=new Map;u.set(r,i)}else u=vl,i=u.get(r),i||(i=new Map,u.set(r,i));if(i.has(e))return i;for(i.set(e,null),r=r.getElementsByTagName(e),u=0;u<r.length;u++){var f=r[u];if(!(f[Wa]||f[ut]||e==="link"&&f.getAttribute("rel")==="stylesheet")&&f.namespaceURI!=="http://www.w3.org/2000/svg"){var y=f.getAttribute(t)||"";y=e+y;var j=i.get(y);j?j.push(f):i.set(y,[f])}}return i}function qg(e,t,r){e=e.ownerDocument||e,e.head.insertBefore(r,t==="title"?e.querySelector("head > title"):null)}function dj(e,t,r){if(r===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function Yg(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function fj(e,t,r,i){if(r.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&(r.state.loading&4)===0){if(r.instance===null){var u=Aa(i.href),f=t.querySelector(_i(u));if(f){t=f._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=xl.bind(e),t.then(e,e)),r.state.loading|=4,r.instance=f,lt(f);return}f=t.ownerDocument||t,i=Lg(i),(u=Wt.get(u))&&Vu(i,u),f=f.createElement("link"),lt(f);var y=f;y._p=new Promise(function(j,R){y.onload=j,y.onerror=R}),mt(f,"link",i),r.instance=f}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(r,t),(t=r.state.preload)&&(r.state.loading&3)===0&&(e.count++,r=xl.bind(e),t.addEventListener("load",r),t.addEventListener("error",r))}}var Lu=0;function hj(e,t){return e.stylesheets&&e.count===0&&Sl(e,e.stylesheets),0<e.count||0<e.imgCount?function(r){var i=setTimeout(function(){if(e.stylesheets&&Sl(e,e.stylesheets),e.unsuspend){var f=e.unsuspend;e.unsuspend=null,f()}},6e4+t);0<e.imgBytes&&Lu===0&&(Lu=62500*$S());var u=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Sl(e,e.stylesheets),e.unsuspend)){var f=e.unsuspend;e.unsuspend=null,f()}},(e.imgBytes>Lu?50:800)+t);return e.unsuspend=r,function(){e.unsuspend=null,clearTimeout(i),clearTimeout(u)}}:null}function xl(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Sl(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var bl=null;function Sl(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,bl=new Map,t.forEach(mj,e),bl=null,xl.call(e))}function mj(e,t){if(!(t.state.loading&4)){var r=bl.get(e);if(r)var i=r.get(null);else{r=new Map,bl.set(e,r);for(var u=e.querySelectorAll("link[data-precedence],style[data-precedence]"),f=0;f<u.length;f++){var y=u[f];(y.nodeName==="LINK"||y.getAttribute("media")!=="not all")&&(r.set(y.dataset.precedence,y),i=y)}i&&r.set(null,i)}u=t.instance,y=u.getAttribute("data-precedence"),f=r.get(y)||i,f===i&&r.set(null,u),r.set(y,u),this.count++,i=xl.bind(this),u.addEventListener("load",i),u.addEventListener("error",i),f?f.parentNode.insertBefore(u,f.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(u,e.firstChild)),t.state.loading|=4}}var Bi={$$typeof:V,Provider:null,Consumer:null,_currentValue:W,_currentValue2:W,_threadCount:0};function pj(e,t,r,i,u,f,y,j,R){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Oo(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Oo(0),this.hiddenUpdates=Oo(null),this.identifierPrefix=i,this.onUncaughtError=u,this.onCaughtError=f,this.onRecoverableError=y,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=R,this.incompleteTransitions=new Map}function Pg(e,t,r,i,u,f,y,j,R,F,I,se){return e=new pj(e,t,r,y,R,F,I,se,j),t=1,f===!0&&(t|=24),f=zt(3,null,null,t),e.current=f,f.stateNode=e,t=yc(),t.refCount++,e.pooledCache=t,t.refCount++,f.memoizedState={element:i,isDehydrated:r,cache:t},Sc(f),e}function Gg(e){return e?(e=la,e):la}function Fg(e,t,r,i,u,f){u=Gg(u),i.context===null?i.context=u:i.pendingContext=u,i=Wn(t),i.payload={element:r},f=f===void 0?null:f,f!==null&&(i.callback=f),r=In(e,i,t),r!==null&&(At(r,e,t),pi(r,e,t))}function Xg(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var r=e.retryLane;e.retryLane=r!==0&&r<t?r:t}}function Uu(e,t){Xg(e,t),(e=e.alternate)&&Xg(e,t)}function $g(e){if(e.tag===13||e.tag===31){var t=Nr(e,67108864);t!==null&&At(t,e,67108864),Uu(e,67108864)}}function Kg(e){if(e.tag===13||e.tag===31){var t=Ut();t=zo(t);var r=Nr(e,t);r!==null&&At(r,e,t),Uu(e,t)}}var jl=!0;function gj(e,t,r,i){var u=Y.T;Y.T=null;var f=ae.p;try{ae.p=2,Hu(e,t,r,i)}finally{ae.p=f,Y.T=u}}function yj(e,t,r,i){var u=Y.T;Y.T=null;var f=ae.p;try{ae.p=8,Hu(e,t,r,i)}finally{ae.p=f,Y.T=u}}function Hu(e,t,r,i){if(jl){var u=qu(i);if(u===null)Cu(e,t,i,wl,r),Qg(e,i);else if(xj(u,e,t,r,i))i.stopPropagation();else if(Qg(e,i),t&4&&-1<vj.indexOf(e)){for(;u!==null;){var f=Qr(u);if(f!==null)switch(f.tag){case 3:if(f=f.stateNode,f.current.memoizedState.isDehydrated){var y=jr(f.pendingLanes);if(y!==0){var j=f;for(j.pendingLanes|=2,j.entangledLanes|=2;y;){var R=1<<31-Rt(y);j.entanglements[1]|=R,y&=~R}mn(f),(ze&6)===0&&(il=kt()+500,Mi(0))}}break;case 31:case 13:j=Nr(f,2),j!==null&&At(j,f,2),ll(),Uu(f,2)}if(f=qu(i),f===null&&Cu(e,t,i,wl,r),f===u)break;u=f}u!==null&&i.stopPropagation()}else Cu(e,t,i,null,r)}}function qu(e){return e=Po(e),Yu(e)}var wl=null;function Yu(e){if(wl=null,e=Zr(e),e!==null){var t=h(e);if(t===null)e=null;else{var r=t.tag;if(r===13){if(e=d(t),e!==null)return e;e=null}else if(r===31){if(e=m(t),e!==null)return e;e=null}else if(r===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return wl=e,null}function Zg(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(r1()){case rh:return 2;case ah:return 8;case fs:case a1:return 32;case ih:return 268435456;default:return 32}default:return 32}}var Pu=!1,ur=null,dr=null,fr=null,Li=new Map,Ui=new Map,hr=[],vj="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Qg(e,t){switch(e){case"focusin":case"focusout":ur=null;break;case"dragenter":case"dragleave":dr=null;break;case"mouseover":case"mouseout":fr=null;break;case"pointerover":case"pointerout":Li.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ui.delete(t.pointerId)}}function Hi(e,t,r,i,u,f){return e===null||e.nativeEvent!==f?(e={blockedOn:t,domEventName:r,eventSystemFlags:i,nativeEvent:f,targetContainers:[u]},t!==null&&(t=Qr(t),t!==null&&$g(t)),e):(e.eventSystemFlags|=i,t=e.targetContainers,u!==null&&t.indexOf(u)===-1&&t.push(u),e)}function xj(e,t,r,i,u){switch(t){case"focusin":return ur=Hi(ur,e,t,r,i,u),!0;case"dragenter":return dr=Hi(dr,e,t,r,i,u),!0;case"mouseover":return fr=Hi(fr,e,t,r,i,u),!0;case"pointerover":var f=u.pointerId;return Li.set(f,Hi(Li.get(f)||null,e,t,r,i,u)),!0;case"gotpointercapture":return f=u.pointerId,Ui.set(f,Hi(Ui.get(f)||null,e,t,r,i,u)),!0}return!1}function Jg(e){var t=Zr(e.target);if(t!==null){var r=h(t);if(r!==null){if(t=r.tag,t===13){if(t=d(r),t!==null){e.blockedOn=t,dh(e.priority,function(){Kg(r)});return}}else if(t===31){if(t=m(r),t!==null){e.blockedOn=t,dh(e.priority,function(){Kg(r)});return}}else if(t===3&&r.stateNode.current.memoizedState.isDehydrated){e.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}e.blockedOn=null}function El(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var r=qu(e.nativeEvent);if(r===null){r=e.nativeEvent;var i=new r.constructor(r.type,r);Yo=i,r.target.dispatchEvent(i),Yo=null}else return t=Qr(r),t!==null&&$g(t),e.blockedOn=r,!1;t.shift()}return!0}function Wg(e,t,r){El(e)&&r.delete(t)}function bj(){Pu=!1,ur!==null&&El(ur)&&(ur=null),dr!==null&&El(dr)&&(dr=null),fr!==null&&El(fr)&&(fr=null),Li.forEach(Wg),Ui.forEach(Wg)}function Tl(e,t){e.blockedOn===t&&(e.blockedOn=null,Pu||(Pu=!0,n.unstable_scheduleCallback(n.unstable_NormalPriority,bj)))}var Cl=null;function Ig(e){Cl!==e&&(Cl=e,n.unstable_scheduleCallback(n.unstable_NormalPriority,function(){Cl===e&&(Cl=null);for(var t=0;t<e.length;t+=3){var r=e[t],i=e[t+1],u=e[t+2];if(typeof i!="function"){if(Yu(i||r)===null)continue;break}var f=Qr(r);f!==null&&(e.splice(t,3),t-=3,qc(f,{pending:!0,data:u,method:r.method,action:i},i,u))}}))}function Ma(e){function t(R){return Tl(R,e)}ur!==null&&Tl(ur,e),dr!==null&&Tl(dr,e),fr!==null&&Tl(fr,e),Li.forEach(t),Ui.forEach(t);for(var r=0;r<hr.length;r++){var i=hr[r];i.blockedOn===e&&(i.blockedOn=null)}for(;0<hr.length&&(r=hr[0],r.blockedOn===null);)Jg(r),r.blockedOn===null&&hr.shift();if(r=(e.ownerDocument||e).$$reactFormReplay,r!=null)for(i=0;i<r.length;i+=3){var u=r[i],f=r[i+1],y=u[wt]||null;if(typeof f=="function")y||Ig(r);else if(y){var j=null;if(f&&f.hasAttribute("formAction")){if(u=f,y=f[wt]||null)j=y.formAction;else if(Yu(u)!==null)continue}else j=y.action;typeof j=="function"?r[i+1]=j:(r.splice(i,3),i-=3),Ig(r)}}}function ey(){function e(f){f.canIntercept&&f.info==="react-transition"&&f.intercept({handler:function(){return new Promise(function(y){return u=y})},focusReset:"manual",scroll:"manual"})}function t(){u!==null&&(u(),u=null),i||setTimeout(r,20)}function r(){if(!i&&!navigation.transition){var f=navigation.currentEntry;f&&f.url!=null&&navigation.navigate(f.url,{state:f.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,u=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(r,100),function(){i=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),u!==null&&(u(),u=null)}}}function Gu(e){this._internalRoot=e}Nl.prototype.render=Gu.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(l(409));var r=t.current,i=Ut();Fg(r,i,e,t,null,null)},Nl.prototype.unmount=Gu.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Fg(e.current,2,null,e,null,null),ll(),t[Kr]=null}};function Nl(e){this._internalRoot=e}Nl.prototype.unstable_scheduleHydration=function(e){if(e){var t=uh();e={blockedOn:null,target:e,priority:t};for(var r=0;r<hr.length&&t!==0&&t<hr[r].priority;r++);hr.splice(r,0,e),r===0&&Jg(e)}};var ty=a.version;if(ty!=="19.2.8")throw Error(l(527,ty,"19.2.8"));ae.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(l(188)):(e=Object.keys(e).join(","),Error(l(268,e)));return e=g(t),e=e!==null?v(e):null,e=e===null?null:e.stateNode,e};var Sj={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:Y,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Dl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Dl.isDisabled&&Dl.supportsFiber)try{Za=Dl.inject(Sj),Mt=Dl}catch{}}return Yi.createRoot=function(e,t){if(!c(e))throw Error(l(299));var r=!1,i="",u=op,f=cp,y=up;return t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onUncaughtError!==void 0&&(u=t.onUncaughtError),t.onCaughtError!==void 0&&(f=t.onCaughtError),t.onRecoverableError!==void 0&&(y=t.onRecoverableError)),t=Pg(e,1,!1,null,null,r,i,null,u,f,y,ey),e[Kr]=t.current,Tu(e),new Gu(t)},Yi.hydrateRoot=function(e,t,r){if(!c(e))throw Error(l(299));var i=!1,u="",f=op,y=cp,j=up,R=null;return r!=null&&(r.unstable_strictMode===!0&&(i=!0),r.identifierPrefix!==void 0&&(u=r.identifierPrefix),r.onUncaughtError!==void 0&&(f=r.onUncaughtError),r.onCaughtError!==void 0&&(y=r.onCaughtError),r.onRecoverableError!==void 0&&(j=r.onRecoverableError),r.formState!==void 0&&(R=r.formState)),t=Pg(e,1,!0,t,r??null,i,u,R,f,y,j,ey),t.context=Gg(null),r=t.current,i=Ut(),i=zo(i),u=Wn(i),u.callback=null,In(r,u,i),r=i,t.current.lanes=r,Ja(t,r),mn(t),e[Kr]=t.current,Tu(e),new Nl(t)},Yi.version="19.2.8",Yi}var dy;function Mj(){if(dy)return $u.exports;dy=1;function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(a){console.error(a)}}return n(),$u.exports=kj(),$u.exports}var df=Mj();const Rj=cx(df),ff=S.createContext({});function hf(n){const a=S.useRef(null);return a.current===null&&(a.current=n()),a.current}const Oj=typeof window<"u",mf=Oj?S.useLayoutEffect:S.useEffect,jo=S.createContext(null);function pf(n,a){n.indexOf(a)===-1&&n.push(a)}function eo(n,a){const s=n.indexOf(a);s>-1&&n.splice(s,1)}const bn=(n,a,s)=>s>a?a:s<n?n:s;let wo=()=>{};const vr={},fx=n=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n),hx=n=>typeof n=="object"&&n!==null,mx=n=>/^0[^.\s]+$/u.test(n);function px(n){let a;return()=>(a===void 0&&(a=n()),a)}const tn=n=>n,ss=(...n)=>n.reduce((a,s)=>l=>s(a(l))),Wi=(n,a,s)=>{const l=a-n;return l?(s-n)/l:1};class gf{constructor(){this.subscriptions=[]}add(a){return pf(this.subscriptions,a),()=>eo(this.subscriptions,a)}notify(a,s,l){const c=this.subscriptions.length;if(c)if(c===1)this.subscriptions[0](a,s,l);else for(let h=0;h<c;h++){const d=this.subscriptions[h];d&&d(a,s,l)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}}const qt=n=>n*1e3,en=n=>n/1e3,gx=(n,a)=>a?n*(1e3/a):0,yx=(n,a,s)=>(((1-3*s+3*a)*n+(3*s-6*a))*n+3*a)*n,zj=1e-7,_j=12;function Vj(n,a,s,l,c){let h,d,m=0;do d=a+(s-a)/2,h=yx(d,l,c)-n,h>0?s=d:a=d;while(Math.abs(h)>zj&&++m<_j);return d}function ls(n,a,s,l){if(n===a&&s===l)return tn;const c=h=>Vj(h,0,1,n,s);return h=>h===0||h===1?h:yx(c(h),a,l)}const vx=n=>a=>a<=.5?n(2*a)/2:(2-n(2*(1-a)))/2,xx=n=>a=>1-n(1-a),bx=ls(.33,1.53,.69,.99),yf=xx(bx),Sx=vx(yf),jx=n=>n>=1?1:(n*=2)<1?.5*yf(n):.5*(2-Math.pow(2,-10*(n-1))),vf=n=>1-Math.sin(Math.acos(n)),wx=xx(vf),Ex=vx(vf),Bj=ls(.42,0,1,1),Lj=ls(0,0,.58,1),Tx=ls(.42,0,.58,1),Uj=n=>Array.isArray(n)&&typeof n[0]!="number",Cx=n=>Array.isArray(n)&&typeof n[0]=="number",Hj={linear:tn,easeIn:Bj,easeInOut:Tx,easeOut:Lj,circIn:vf,circInOut:Ex,circOut:wx,backIn:yf,backInOut:Sx,backOut:bx,anticipate:jx},qj=n=>typeof n=="string",fy=n=>{if(Cx(n)){wo(n.length===4);const[a,s,l,c]=n;return ls(a,s,l,c)}else if(qj(n))return Hj[n];return n},Al=["setup","read","resolveKeyframes","preUpdate","update","preRender","render","postRender"];function Yj(n){let a=new Set,s=new Set,l=!1,c=!1;const h=new WeakSet;let d={delta:0,timestamp:0,isProcessing:!1};function m(g){h.has(g)&&(p.schedule(g),n()),g(d)}const p={schedule:(g,v=!1,x=!1)=>{const E=x&&l?a:s;return v&&h.add(g),E.add(g),g},cancel:g=>{s.delete(g),h.delete(g)},process:g=>{if(d=g,l){c=!0;return}l=!0;const v=a;a=s,s=v,a.forEach(m),a.clear(),l=!1,c&&(c=!1,p.process(g))}};return p}const Pj=40;function Nx(n,a){let s=!1,l=!0;const c={delta:0,timestamp:0,isProcessing:!1},h=()=>s=!0,d=Al.reduce((V,z)=>(V[z]=Yj(h),V),{}),{setup:m,read:p,resolveKeyframes:g,preUpdate:v,update:x,preRender:b,render:E,postRender:w}=d,N=()=>{const V=vr.useManualTiming,z=V?c.timestamp:performance.now();s=!1,V||(c.delta=l?1e3/60:Math.max(Math.min(z-c.timestamp,Pj),1)),c.timestamp=z,c.isProcessing=!0,m.process(c),p.process(c),g.process(c),v.process(c),x.process(c),b.process(c),E.process(c),w.process(c),c.isProcessing=!1,s&&a&&(l=!1,n(N))},C=()=>{s=!0,l=!0,c.isProcessing||n(N)};return{schedule:Al.reduce((V,z)=>{const L=d[z];return V[z]=(U,D=!1,q=!1)=>(s||C(),L.schedule(U,D,q)),V},{}),cancel:V=>{for(let z=0;z<Al.length;z++)d[Al[z]].cancel(V)},state:c,steps:d}}const{schedule:Ge,cancel:xr,state:pt,steps:Ju}=Nx(typeof requestAnimationFrame<"u"?requestAnimationFrame:tn,!0);let Pl;function Gj(){Pl=void 0}const bt={now:()=>(Pl===void 0&&bt.set(pt.isProcessing||vr.useManualTiming?pt.timestamp:performance.now()),Pl),set:n=>{Pl=n,queueMicrotask(Gj)}},Dx=n=>a=>typeof a=="string"&&a.startsWith(n),Ax=Dx("--"),Fj=Dx("var(--"),xf=n=>Fj(n)?Xj.test(n.split("/*")[0].trim()):!1,Xj=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;function hy(n){return typeof n!="string"?!1:n.split("/*")[0].includes("var(--")}const Ga={test:n=>typeof n=="number",parse:parseFloat,transform:n=>n},Ii={...Ga,transform:n=>bn(0,1,n)},kl={...Ga,default:1},$i=n=>Math.round(n*1e5)/1e5,bf=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function $j(n){return n==null}const Kj=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,Sf=(n,a)=>s=>!!(typeof s=="string"&&Kj.test(s)&&s.startsWith(n)||a&&!$j(s)&&Object.prototype.hasOwnProperty.call(s,a)),kx=(n,a,s)=>l=>{if(typeof l!="string")return l;const[c,h,d,m]=l.match(bf);return{[n]:parseFloat(c),[a]:parseFloat(h),[s]:parseFloat(d),alpha:m!==void 0?parseFloat(m):1}},Zj=n=>bn(0,255,n),Wu={...Ga,transform:n=>Math.round(Zj(n))},Yr={test:Sf("rgb","red"),parse:kx("red","green","blue"),transform:({red:n,green:a,blue:s,alpha:l=1})=>"rgba("+Wu.transform(n)+", "+Wu.transform(a)+", "+Wu.transform(s)+", "+$i(Ii.transform(l))+")"};function Qj(n){let a="",s="",l="",c="";return n.length>5?(a=n.substring(1,3),s=n.substring(3,5),l=n.substring(5,7),c=n.substring(7,9)):(a=n.substring(1,2),s=n.substring(2,3),l=n.substring(3,4),c=n.substring(4,5),a+=a,s+=s,l+=l,c+=c),{red:parseInt(a,16),green:parseInt(s,16),blue:parseInt(l,16),alpha:c?parseInt(c,16)/255:1}}const Ed={test:Sf("#"),parse:Qj,transform:Yr.transform},os=n=>({test:a=>typeof a=="string"&&a.endsWith(n)&&a.split(" ").length===1,parse:parseFloat,transform:a=>`${a}${n}`}),qn=os("deg"),xn=os("%"),ge=os("px"),Jj=os("vh"),Wj=os("vw"),my={...xn,parse:n=>xn.parse(n)/100,transform:n=>xn.transform(n*100)},Ba={test:Sf("hsl","hue"),parse:kx("hue","saturation","lightness"),transform:({hue:n,saturation:a,lightness:s,alpha:l=1})=>"hsla("+Math.round(n)+", "+xn.transform($i(a))+", "+xn.transform($i(s))+", "+$i(Ii.transform(l))+")"},at={test:n=>Yr.test(n)||Ed.test(n)||Ba.test(n),parse:n=>Yr.test(n)?Yr.parse(n):Ba.test(n)?Ba.parse(n):Ed.parse(n),transform:n=>typeof n=="string"?n:n.hasOwnProperty("red")?Yr.transform(n):Ba.transform(n),getAnimatableNone:n=>{const a=at.parse(n);return a.alpha=0,at.transform(a)}},Ij=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;function ew(n){var a,s;return isNaN(n)&&typeof n=="string"&&(((a=n.match(bf))==null?void 0:a.length)||0)+(((s=n.match(Ij))==null?void 0:s.length)||0)>0}const Mx="number",Rx="color",tw="var",nw="var(",py="${}",rw=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function qa(n){const a=n.toString(),s=[],l={color:[],number:[],var:[]},c=[];let h=0;const m=a.replace(rw,p=>(at.test(p)?(l.color.push(h),c.push(Rx),s.push(at.parse(p))):p.startsWith(nw)?(l.var.push(h),c.push(tw),s.push(p)):(l.number.push(h),c.push(Mx),s.push(parseFloat(p))),++h,py)).split(py);return{values:s,split:m,indexes:l,types:c}}function aw(n){return qa(n).values}function Ox({split:n,types:a}){const s=n.length;return l=>{let c="";for(let h=0;h<s;h++)if(c+=n[h],l[h]!==void 0){const d=a[h];d===Mx?c+=$i(l[h]):d===Rx?c+=at.transform(l[h]):c+=l[h]}return c}}function iw(n){return Ox(qa(n))}const sw=n=>typeof n=="number"?0:at.test(n)?at.getAnimatableNone(n):n,lw=(n,a)=>typeof n=="number"?a!=null&&a.trim().endsWith("/")?n:0:sw(n);function ow(n){const a=qa(n);return Ox(a)(a.values.map((l,c)=>lw(l,a.split[c])))}const cn={test:ew,parse:aw,createTransformer:iw,getAnimatableNone:ow};function Iu(n,a,s){return s<0&&(s+=1),s>1&&(s-=1),s<1/6?n+(a-n)*6*s:s<1/2?a:s<2/3?n+(a-n)*(2/3-s)*6:n}function cw({hue:n,saturation:a,lightness:s,alpha:l}){n/=360,a/=100,s/=100;let c=0,h=0,d=0;if(!a)c=h=d=s;else{const m=s<.5?s*(1+a):s+a-s*a,p=2*s-m;c=Iu(p,m,n+1/3),h=Iu(p,m,n),d=Iu(p,m,n-1/3)}return{red:Math.round(c*255),green:Math.round(h*255),blue:Math.round(d*255),alpha:l}}function to(n,a){return s=>s>0?a:n}const Pe=(n,a,s)=>n+(a-n)*s,ed=(n,a,s)=>{const l=n*n,c=s*(a*a-l)+l;return c<0?0:Math.sqrt(c)},uw=[Ed,Yr,Ba],dw=n=>uw.find(a=>a.test(n));function gy(n){const a=dw(n);if(!a)return!1;let s=a.parse(n);return a===Ba&&(s=cw(s)),s}const yy=(n,a)=>{const s=gy(n),l=gy(a);if(!s||!l)return to(n,a);const c={...s};return h=>(c.red=ed(s.red,l.red,h),c.green=ed(s.green,l.green,h),c.blue=ed(s.blue,l.blue,h),c.alpha=Pe(s.alpha,l.alpha,h),Yr.transform(c))},Td=new Set(["none","hidden"]);function fw(n,a){return Td.has(n)?s=>s<=0?n:a:s=>s>=1?a:n}function hw(n,a){return s=>Pe(n,a,s)}function jf(n){return typeof n=="number"?hw:typeof n=="string"?xf(n)?to:at.test(n)?yy:gw:Array.isArray(n)?zx:typeof n=="object"?at.test(n)?yy:mw:to}function zx(n,a){const s=[...n],l=s.length,c=n.map((h,d)=>jf(h)(h,a[d]));return h=>{for(let d=0;d<l;d++)s[d]=c[d](h);return s}}function mw(n,a){const s={...n,...a},l={};for(const c in s)n[c]!==void 0&&a[c]!==void 0&&(l[c]=jf(n[c])(n[c],a[c]));return c=>{for(const h in l)s[h]=l[h](c);return s}}function pw(n,a){const s=[],l={color:0,var:0,number:0};for(let c=0;c<a.values.length;c++){const h=a.types[c],d=n.indexes[h][l[h]],m=n.values[d]??0;s[c]=m,l[h]++}return s}const gw=(n,a)=>{const s=cn.createTransformer(a),l=qa(n),c=qa(a);return l.indexes.var.length===c.indexes.var.length&&l.indexes.color.length===c.indexes.color.length&&l.indexes.number.length>=c.indexes.number.length?Td.has(n)&&!c.values.length||Td.has(a)&&!l.values.length?fw(n,a):ss(zx(pw(l,c),c.values),s):to(n,a)};function _x(n,a,s){return typeof n=="number"&&typeof a=="number"&&typeof s=="number"?Pe(n,a,s):jf(n)(n,a)}const yw=n=>{const a=({timestamp:s})=>n(s);return{start:(s=!0)=>Ge.update(a,s),stop:()=>xr(a),now:()=>pt.isProcessing?pt.timestamp:bt.now()}},Vx=(n,a,s=10)=>{let l="";const c=Math.max(Math.round(a/s),2);for(let h=0;h<c;h++)l+=Math.round(n(h/(c-1))*1e4)/1e4+", ";return`linear(${l.substring(0,l.length-2)})`},no=2e4;function wf(n){let a=0;const s=50;let l=n.next(a);for(;!l.done&&a<no;)a+=s,l=n.next(a);return a>=no?1/0:a}function vw(n,a=100,s){const l=s({...n,keyframes:[0,a]}),c=Math.min(wf(l),no);return{type:"keyframes",ease:h=>l.next(c*h).value/a,duration:en(c)}}const Qe={stiffness:100,damping:10,mass:1,velocity:0,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05,maxDamping:1};function Cd(n,a){return n*Math.sqrt(1-a*a)}const xw=12;function bw(n,a,s){let l=s;for(let c=1;c<xw;c++)l=l-n(l)/a(l);return l}const td=.001;function Sw({duration:n=Qe.duration,bounce:a=Qe.bounce,velocity:s=Qe.velocity,mass:l=Qe.mass}){let c,h,d=1-a;d=bn(Qe.minDamping,Qe.maxDamping,d),n=bn(Qe.minDuration,Qe.maxDuration,en(n)),d<1?(c=g=>{const v=g*d,x=v*n,b=v-s,E=Cd(g,d),w=Math.exp(-x);return td-b/E*w},h=g=>{const x=g*d*n,b=x*s+s,E=Math.pow(d,2)*Math.pow(g,2)*n,w=Math.exp(-x),N=Cd(Math.pow(g,2),d);return(-c(g)+td>0?-1:1)*((b-E)*w)/N}):(c=g=>{const v=Math.exp(-g*n),x=(g-s)*n+1;return-td+v*x},h=g=>{const v=Math.exp(-g*n),x=(s-g)*(n*n);return v*x});const m=5/n,p=bw(c,h,m);if(n=qt(n),isNaN(p))return{stiffness:Qe.stiffness,damping:Qe.damping,duration:n};{const g=Math.pow(p,2)*l;return{stiffness:g,damping:d*2*Math.sqrt(l*g),duration:n}}}const jw=["duration","bounce"],ww=["stiffness","damping","mass"];function vy(n,a){return a.some(s=>n[s]!==void 0)}function Ew(n){let a={velocity:Qe.velocity,stiffness:Qe.stiffness,damping:Qe.damping,mass:Qe.mass,isResolvedFromDuration:!1,...n};if(!vy(n,ww)&&vy(n,jw))if(a.velocity=0,n.visualDuration){const s=n.visualDuration,l=2*Math.PI/(s*1.2),c=l*l,h=2*bn(.05,1,1-(n.bounce||0))*Math.sqrt(c);a={...a,mass:Qe.mass,stiffness:c,damping:h}}else{const s=Sw({...n,velocity:0});a={...a,...s,mass:Qe.mass},a.isResolvedFromDuration=!0}return a}function ro(n=Qe.visualDuration,a=Qe.bounce){const s=typeof n!="object"?{visualDuration:n,keyframes:[0,1],bounce:a}:n;let{restSpeed:l,restDelta:c}=s;const h=s.keyframes[0],d=s.keyframes[s.keyframes.length-1],m={done:!1,value:h},{stiffness:p,damping:g,mass:v,duration:x,velocity:b,isResolvedFromDuration:E}=Ew({...s,velocity:-en(s.velocity||0)}),w=b||0,N=g/(2*Math.sqrt(p*v)),C=d-h,A=en(Math.sqrt(p/v)),k=Math.abs(C)<5;l||(l=k?Qe.restSpeed.granular:Qe.restSpeed.default),c||(c=k?Qe.restDelta.granular:Qe.restDelta.default);let V,z,L,U,D,q;if(N<1)L=Cd(A,N),U=(w+N*A*C)/L,V=O=>{const $=Math.exp(-N*A*O);return d-$*(U*Math.sin(L*O)+C*Math.cos(L*O))},D=N*A*U+C*L,q=N*A*C-U*L,z=O=>Math.exp(-N*A*O)*(D*Math.sin(L*O)+q*Math.cos(L*O));else if(N===1){V=$=>d-Math.exp(-A*$)*(C+(w+A*C)*$);const O=w+A*C;z=$=>Math.exp(-A*$)*(A*O*$-w)}else{const O=A*Math.sqrt(N*N-1);V=ue=>{const ye=Math.exp(-N*A*ue),Y=Math.min(O*ue,300);return d-ye*((w+N*A*C)*Math.sinh(Y)+O*C*Math.cosh(Y))/O};const $=(w+N*A*C)/O,Z=N*A*$-C*O,oe=N*A*C-$*O;z=ue=>{const ye=Math.exp(-N*A*ue),Y=Math.min(O*ue,300);return ye*(Z*Math.sinh(Y)+oe*Math.cosh(Y))}}const M={calculatedDuration:E&&x||null,velocity:O=>qt(z(O)),next:O=>{if(!E&&N<1){const Z=Math.exp(-N*A*O),oe=Math.sin(L*O),ue=Math.cos(L*O),ye=d-Z*(U*oe+C*ue),Y=qt(Z*(D*oe+q*ue));return m.done=Math.abs(Y)<=l&&Math.abs(d-ye)<=c,m.value=m.done?d:ye,m}const $=V(O);if(E)m.done=O>=x;else{const Z=qt(z(O));m.done=Math.abs(Z)<=l&&Math.abs(d-$)<=c}return m.value=m.done?d:$,m},toString:()=>{const O=Math.min(wf(M),no),$=Vx(Z=>M.next(O*Z).value,O,30);return O+"ms "+$},toTransition:()=>{}};return M}ro.applyToOptions=n=>{const a=vw(n,100,ro);return n.ease=a.ease,n.duration=qt(a.duration),n.type="keyframes",n};const Tw=5;function Bx(n,a,s){const l=Math.max(a-Tw,0);return gx(s-n(l),a-l)}function Nd({keyframes:n,velocity:a=0,power:s=.8,timeConstant:l=325,bounceDamping:c=10,bounceStiffness:h=500,modifyTarget:d,min:m,max:p,restDelta:g=.5,restSpeed:v}){const x=n[0],b={done:!1,value:x},E=q=>m!==void 0&&q<m||p!==void 0&&q>p,w=q=>m===void 0?p:p===void 0||Math.abs(m-q)<Math.abs(p-q)?m:p;let N=s*a;const C=x+N,A=d===void 0?C:d(C);A!==C&&(N=A-x);const k=q=>-N*Math.exp(-q/l),V=q=>A+k(q),z=q=>{const M=k(q),O=V(q);b.done=Math.abs(M)<=g,b.value=b.done?A:O};let L,U;const D=q=>{E(b.value)&&(L=q,U=ro({keyframes:[b.value,w(b.value)],velocity:Bx(V,q,b.value),damping:c,stiffness:h,restDelta:g,restSpeed:v}))};return D(0),{calculatedDuration:null,next:q=>{let M=!1;return!U&&L===void 0&&(M=!0,z(q),D(q)),L!==void 0&&q>=L?U.next(q-L):(!M&&z(q),b)}}}function Cw(n,a,s){const l=[],c=s||vr.mix||_x,h=n.length-1;for(let d=0;d<h;d++){let m=c(n[d],n[d+1]);if(a){const p=Array.isArray(a)?a[d]||tn:a;m=ss(p,m)}l.push(m)}return l}function Nw(n,a,{clamp:s=!0,ease:l,mixer:c}={}){const h=n.length;if(wo(h===a.length),h===1)return()=>a[0];if(h===2&&a[0]===a[1])return()=>a[1];const d=n[0]===n[1];n[0]>n[h-1]&&(n=[...n].reverse(),a=[...a].reverse());const m=Cw(a,l,c),p=m.length,g=v=>{if(d&&v<n[0])return a[0];let x=0;if(p>1)for(;x<n.length-2&&!(v<n[x+1]);x++);const b=Wi(n[x],n[x+1],v);return m[x](b)};return s?v=>g(bn(n[0],n[h-1],v)):g}function Dw(n,a){const s=n[n.length-1];for(let l=1;l<=a;l++){const c=Wi(0,a,l);n.push(Pe(s,1,c))}}function Aw(n){const a=[0];return Dw(a,n.length-1),a}function kw(n,a){return n.map(s=>s*a)}function Mw(n,a){return n.map(()=>a||Tx).splice(0,n.length-1)}function Ki({duration:n=300,keyframes:a,times:s,ease:l="easeInOut"}){const c=Uj(l)?l.map(fy):fy(l),h={done:!1,value:a[0]},d=kw(s&&s.length===a.length?s:Aw(a),n),m=Nw(d,a,{ease:Array.isArray(c)?c:Mw(a,c)});return{calculatedDuration:n,next:p=>(h.value=m(p),h.done=p>=n,h)}}const Rw=n=>n!==null;function Eo(n,{repeat:a,repeatType:s="loop"},l,c=1){const h=n.filter(Rw),m=c<0||a&&s!=="loop"&&a%2===1?0:h.length-1;return!m||l===void 0?h[m]:l}const Ow={decay:Nd,inertia:Nd,tween:Ki,keyframes:Ki,spring:ro};function Lx(n){typeof n.type=="string"&&(n.type=Ow[n.type])}class Ef{constructor(){this.updateFinished()}get finished(){return this._finished}updateFinished(){this._finished=new Promise(a=>{this.resolve=a})}notifyFinished(){this.resolve()}then(a,s){return this.finished.then(a,s)}}const zw=n=>n/100;class ao extends Ef{constructor(a){super(),this.state="idle",this.startTime=null,this.isStopped=!1,this.currentTime=0,this.holdTime=null,this.playbackSpeed=1,this.delayState={done:!1,value:void 0},this.stop=()=>{var l,c;const{motionValue:s}=this.options;s&&s.updatedAt!==bt.now()&&this.tick(bt.now()),this.isStopped=!0,this.state!=="idle"&&(this.teardown(),(c=(l=this.options).onStop)==null||c.call(l))},this.options=a,this.initAnimation(),this.play(),a.autoplay===!1&&this.pause()}initAnimation(){const{options:a}=this;Lx(a);const{type:s=Ki,repeat:l=0,repeatDelay:c=0,repeatType:h,velocity:d=0}=a;let{keyframes:m}=a;const p=s||Ki;p!==Ki&&typeof m[0]!="number"&&(this.mixKeyframes=ss(zw,_x(m[0],m[1])),m=[0,100]);const g=p({...a,keyframes:m});h==="mirror"&&(this.mirroredGenerator=p({...a,keyframes:[...m].reverse(),velocity:-d})),g.calculatedDuration===null&&(g.calculatedDuration=wf(g));const{calculatedDuration:v}=g;this.calculatedDuration=v,this.resolvedDuration=v+c,this.totalDuration=this.resolvedDuration*(l+1)-c,this.generator=g}updateTime(a){const s=Math.round(a-this.startTime)*this.playbackSpeed;this.holdTime!==null?this.currentTime=this.holdTime:this.currentTime=s}tick(a,s=!1){const{generator:l,totalDuration:c,mixKeyframes:h,mirroredGenerator:d,resolvedDuration:m,calculatedDuration:p}=this;if(this.startTime===null)return l.next(0);const{delay:g=0,keyframes:v,repeat:x,repeatType:b,repeatDelay:E,type:w,onUpdate:N,finalKeyframe:C}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,a):this.speed<0&&(this.startTime=Math.min(a-c/this.speed,this.startTime)),s?this.currentTime=a:this.updateTime(a);const A=this.currentTime-g*(this.playbackSpeed>=0?1:-1),k=this.playbackSpeed>=0?A<0:A>c;this.currentTime=Math.max(A,0),this.state==="finished"&&this.holdTime===null&&(this.currentTime=c);let V=this.currentTime,z=l;if(x){const q=Math.min(this.currentTime,c)/m;let M=Math.floor(q),O=q%1;!O&&q>=1&&(O=1),O===1&&M--,M=Math.min(M,x+1),!!(M%2)&&(b==="reverse"?(O=1-O,E&&(O-=E/m)):b==="mirror"&&(z=d)),V=bn(0,1,O)*m}let L;k?(this.delayState.value=v[0],L=this.delayState):L=z.next(V),h&&!k&&(L.value=h(L.value));let{done:U}=L;!k&&p!==null&&(U=this.playbackSpeed>=0?this.currentTime>=c:this.currentTime<=0);const D=this.holdTime===null&&(this.state==="finished"||this.state==="running"&&U);return D&&w!==Nd&&(L.value=Eo(v,this.options,C,this.speed)),N&&N(L.value),D&&this.finish(),L}then(a,s){return this.finished.then(a,s)}get duration(){return en(this.calculatedDuration)}get iterationDuration(){const{delay:a=0}=this.options||{};return this.duration+en(a)}get time(){return en(this.currentTime)}set time(a){a=qt(a),this.currentTime=a,this.startTime===null||this.holdTime!==null||this.playbackSpeed===0?this.holdTime=a:this.driver&&(this.startTime=this.driver.now()-a/this.playbackSpeed),this.driver?this.driver.start(!1):(this.startTime=0,this.state="paused",this.holdTime=a,this.tick(a))}getGeneratorVelocity(){const a=this.currentTime;if(a<=0)return this.options.velocity||0;if(this.generator.velocity)return this.generator.velocity(a);const s=this.generator.next(a).value;return Bx(l=>this.generator.next(l).value,a,s)}get speed(){return this.playbackSpeed}set speed(a){const s=this.playbackSpeed!==a;s&&this.driver&&this.updateTime(bt.now()),this.playbackSpeed=a,s&&this.driver&&(this.time=en(this.currentTime))}play(){var c,h;if(this.isStopped)return;const{driver:a=yw,startTime:s}=this.options;this.driver||(this.driver=a(d=>this.tick(d))),(h=(c=this.options).onPlay)==null||h.call(c);const l=this.driver.now();this.state==="finished"?(this.updateFinished(),this.startTime=l):this.holdTime!==null?this.startTime=l-this.holdTime:this.startTime||(this.startTime=s??l),this.state==="finished"&&this.speed<0&&(this.startTime+=this.calculatedDuration),this.holdTime=null,this.state="running",this.driver.start()}pause(){this.state="paused",this.updateTime(bt.now()),this.holdTime=this.currentTime}complete(){this.state!=="running"&&this.play(),this.state="finished",this.holdTime=null}finish(){var a,s;this.notifyFinished(),this.teardown(),this.state="finished",(s=(a=this.options).onComplete)==null||s.call(a)}cancel(){var a,s;this.holdTime=null,this.startTime=0,this.tick(0),this.teardown(),(s=(a=this.options).onCancel)==null||s.call(a)}teardown(){this.state="idle",this.stopDriver(),this.startTime=this.holdTime=null}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(a){return this.startTime=0,this.tick(a,!0)}attachTimeline(a){var s;return this.options.allowFlatten&&(this.options.type="keyframes",this.options.ease="linear",this.initAnimation()),(s=this.driver)==null||s.stop(),a.observe(this)}}function _w(n){for(let a=1;a<n.length;a++)n[a]??(n[a]=n[a-1])}const Pr=n=>n*180/Math.PI,Dd=n=>{const a=Pr(Math.atan2(n[1],n[0]));return Ad(a)},Vw={x:4,y:5,translateX:4,translateY:5,scaleX:0,scaleY:3,scale:n=>(Math.abs(n[0])+Math.abs(n[3]))/2,rotate:Dd,rotateZ:Dd,skewX:n=>Pr(Math.atan(n[1])),skewY:n=>Pr(Math.atan(n[2])),skew:n=>(Math.abs(n[1])+Math.abs(n[2]))/2},Ad=n=>(n=n%360,n<0&&(n+=360),n),xy=Dd,by=n=>Math.sqrt(n[0]*n[0]+n[1]*n[1]),Sy=n=>Math.sqrt(n[4]*n[4]+n[5]*n[5]),Bw={x:12,y:13,z:14,translateX:12,translateY:13,translateZ:14,scaleX:by,scaleY:Sy,scale:n=>(by(n)+Sy(n))/2,rotateX:n=>Ad(Pr(Math.atan2(n[6],n[5]))),rotateY:n=>Ad(Pr(Math.atan2(-n[2],n[0]))),rotateZ:xy,rotate:xy,skewX:n=>Pr(Math.atan(n[4])),skewY:n=>Pr(Math.atan(n[1])),skew:n=>(Math.abs(n[1])+Math.abs(n[4]))/2};function kd(n){return n.includes("scale")?1:0}function Md(n,a){if(!n||n==="none")return kd(a);const s=n.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);let l,c;if(s)l=Bw,c=s;else{const m=n.match(/^matrix\(([-\d.e\s,]+)\)$/u);l=Vw,c=m}if(!c)return kd(a);const h=l[a],d=c[1].split(",").map(Uw);return typeof h=="function"?h(d):d[h]}const Lw=(n,a)=>{const{transform:s="none"}=getComputedStyle(n);return Md(s,a)};function Uw(n){return parseFloat(n.trim())}const Fa=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],Xa=new Set([...Fa,"pathRotation"]),jy=n=>n===Ga||n===ge,Hw=new Set(["x","y","z"]),qw=Fa.filter(n=>!Hw.has(n));function Yw(n){const a=[];return qw.forEach(s=>{const l=n.getValue(s);l!==void 0&&(a.push([s,l.get()]),l.set(s.startsWith("scale")?1:0))}),a}const gr={width:({x:n},{paddingLeft:a="0",paddingRight:s="0",boxSizing:l})=>{const c=n.max-n.min;return l==="border-box"?c:c-parseFloat(a)-parseFloat(s)},height:({y:n},{paddingTop:a="0",paddingBottom:s="0",boxSizing:l})=>{const c=n.max-n.min;return l==="border-box"?c:c-parseFloat(a)-parseFloat(s)},top:(n,{top:a})=>parseFloat(a),left:(n,{left:a})=>parseFloat(a),bottom:({y:n},{top:a})=>parseFloat(a)+(n.max-n.min),right:({x:n},{left:a})=>parseFloat(a)+(n.max-n.min),x:(n,{transform:a})=>Md(a,"x"),y:(n,{transform:a})=>Md(a,"y")};gr.translateX=gr.x;gr.translateY=gr.y;const Gr=new Set;let Rd=!1,Od=!1,zd=!1;function Ux(){if(Od){const n=Array.from(Gr).filter(l=>l.needsMeasurement),a=new Set(n.map(l=>l.element)),s=new Map;a.forEach(l=>{const c=Yw(l);c.length&&(s.set(l,c),l.render())}),n.forEach(l=>l.measureInitialState()),a.forEach(l=>{l.render();const c=s.get(l);c&&c.forEach(([h,d])=>{var m;(m=l.getValue(h))==null||m.set(d)})}),n.forEach(l=>l.measureEndState()),n.forEach(l=>{l.suspendedScrollY!==void 0&&window.scrollTo(0,l.suspendedScrollY)})}Od=!1,Rd=!1,Gr.forEach(n=>n.complete(zd)),Gr.clear()}function Hx(){Gr.forEach(n=>{n.readKeyframes(),n.needsMeasurement&&(Od=!0)})}function Pw(){zd=!0,Hx(),Ux(),zd=!1}class Tf{constructor(a,s,l,c,h,d=!1){this.state="pending",this.isAsync=!1,this.needsMeasurement=!1,this.unresolvedKeyframes=[...a],this.onComplete=s,this.name=l,this.motionValue=c,this.element=h,this.isAsync=d}scheduleResolve(){this.state="scheduled",this.isAsync?(Gr.add(this),Rd||(Rd=!0,Ge.read(Hx),Ge.resolveKeyframes(Ux))):(this.readKeyframes(),this.complete())}readKeyframes(){const{unresolvedKeyframes:a,name:s,element:l,motionValue:c}=this;if(a[0]===null){const h=c==null?void 0:c.get(),d=a[a.length-1];if(h!==void 0)a[0]=h;else if(l&&s){const m=l.readValue(s,d);m!=null&&(a[0]=m)}a[0]===void 0&&(a[0]=d),c&&h===void 0&&c.set(a[0])}_w(a)}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(a=!1){this.state="complete",this.onComplete(this.unresolvedKeyframes,this.finalKeyframe,a),Gr.delete(this)}cancel(){this.state==="scheduled"&&(Gr.delete(this),this.state="pending")}resume(){this.state==="pending"&&this.scheduleResolve()}}const Gw=n=>n.startsWith("--");function qx(n,a,s){Gw(a)?n.style.setProperty(a,s):n.style[a]=s}const Fw={};function Yx(n,a){const s=px(n);return()=>Fw[a]??s()}const Xw=Yx(()=>window.ScrollTimeline!==void 0,"scrollTimeline"),Px=Yx(()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0},"linearEasing"),Fi=([n,a,s,l])=>`cubic-bezier(${n}, ${a}, ${s}, ${l})`,wy={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:Fi([0,.65,.55,1]),circOut:Fi([.55,0,1,.45]),backIn:Fi([.31,.01,.66,-.59]),backOut:Fi([.33,1.53,.69,.99])};function Gx(n,a){if(n)return typeof n=="function"?Px()?Vx(n,a):"ease-out":Cx(n)?Fi(n):Array.isArray(n)?n.map(s=>Gx(s,a)||wy.easeOut):wy[n]}function $w(n,a,s,{delay:l=0,duration:c=300,repeat:h=0,repeatType:d="loop",ease:m="easeOut",times:p}={},g=void 0){const v={[a]:s};p&&(v.offset=p);const x=Gx(m,c);Array.isArray(x)&&(v.easing=x);const b={delay:l,duration:c,easing:Array.isArray(x)?"linear":x,fill:"both",iterations:h+1,direction:d==="reverse"?"alternate":"normal"};return g&&(b.pseudoElement=g),n.animate(v,b)}function Fx(n){return typeof n=="function"&&"applyToOptions"in n}function Kw({type:n,...a}){return Fx(n)&&Px()?n.applyToOptions(a):(a.duration??(a.duration=300),a.ease??(a.ease="easeOut"),a)}class Xx extends Ef{constructor(a){if(super(),this.finishedTime=null,this.isStopped=!1,this.manualStartTime=null,!a)return;const{element:s,name:l,keyframes:c,pseudoElement:h,allowFlatten:d=!1,finalKeyframe:m,onComplete:p}=a;this.isPseudoElement=!!h,this.allowFlatten=d,this.options=a,wo(typeof a.type!="string");const g=Kw(a);this.animation=$w(s,l,c,g,h),g.autoplay===!1&&this.animation.pause(),this.animation.onfinish=()=>{if(this.finishedTime=this.time,!h){const v=Eo(c,this.options,m,this.speed);this.updateMotionValue&&this.updateMotionValue(v),qx(s,l,v),this.animation.cancel()}p==null||p(),this.notifyFinished()}}play(){this.isStopped||(this.manualStartTime=null,this.animation.play(),this.state==="finished"&&this.updateFinished())}pause(){this.animation.pause()}complete(){var a,s;(s=(a=this.animation).finish)==null||s.call(a)}cancel(){try{this.animation.cancel()}catch{}}stop(){if(this.isStopped)return;this.isStopped=!0;const{state:a}=this;a==="idle"||a==="finished"||(this.updateMotionValue?this.updateMotionValue():this.commitStyles(),this.isPseudoElement||this.cancel())}commitStyles(){var s,l,c;const a=(s=this.options)==null?void 0:s.element;!this.isPseudoElement&&(a!=null&&a.isConnected)&&((c=(l=this.animation).commitStyles)==null||c.call(l))}get duration(){var s,l;const a=((l=(s=this.animation.effect)==null?void 0:s.getComputedTiming)==null?void 0:l.call(s).duration)||0;return en(Number(a))}get iterationDuration(){const{delay:a=0}=this.options||{};return this.duration+en(a)}get time(){return en(Number(this.animation.currentTime)||0)}set time(a){const s=this.finishedTime!==null;this.manualStartTime=null,this.finishedTime=null,this.animation.currentTime=qt(a),s&&this.animation.pause()}get speed(){return this.animation.playbackRate}set speed(a){a<0&&(this.finishedTime=null),this.animation.playbackRate=a}get state(){return this.finishedTime!==null?"finished":this.animation.playState}get startTime(){return this.manualStartTime??Number(this.animation.startTime)}set startTime(a){this.manualStartTime=this.animation.startTime=a}attachTimeline({timeline:a,rangeStart:s,rangeEnd:l,observe:c}){var h;return this.allowFlatten&&((h=this.animation.effect)==null||h.updateTiming({easing:"linear"})),this.animation.onfinish=null,a&&Xw()?(this.animation.timeline=a,s&&(this.animation.rangeStart=s),l&&(this.animation.rangeEnd=l),tn):c(this)}}const $x={anticipate:jx,backInOut:Sx,circInOut:Ex};function Zw(n){return n in $x}function Qw(n){typeof n.ease=="string"&&Zw(n.ease)&&(n.ease=$x[n.ease])}const nd=10;class Jw extends Xx{constructor(a){Qw(a),Lx(a),super(a),a.startTime!==void 0&&a.autoplay!==!1&&(this.startTime=a.startTime),this.options=a}updateMotionValue(a){const{motionValue:s,onUpdate:l,onComplete:c,element:h,...d}=this.options;if(!s)return;if(a!==void 0){s.set(a);return}const m=new ao({...d,autoplay:!1}),p=Math.max(nd,bt.now()-this.startTime),g=bn(0,nd,p-nd),v=m.sample(p).value,{name:x}=this.options;h&&x&&qx(h,x,v),s.setWithVelocity(m.sample(Math.max(0,p-g)).value,v,g),m.stop()}}const Ey=(n,a)=>a==="zIndex"?!1:!!(typeof n=="number"||Array.isArray(n)||typeof n=="string"&&(cn.test(n)||n==="0")&&!n.startsWith("url("));function Ww(n){const a=n[0];if(n.length===1)return!0;for(let s=0;s<n.length;s++)if(n[s]!==a)return!0}function Iw(n,a,s,l){const c=n[0];if(c===null)return!1;if(a==="display"||a==="visibility")return!0;const h=n[n.length-1],d=Ey(c,a),m=Ey(h,a);return!d||!m?!1:Ww(n)||(s==="spring"||Fx(s))&&l}function _d(n){n.duration=0,n.type="keyframes"}const Kx=new Set(["opacity","clipPath","filter","transform","backgroundColor"]),e2=/^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;function t2(n){for(let a=0;a<n.length;a++)if(typeof n[a]=="string"&&e2.test(n[a]))return!0;return!1}const n2=new Set(["color","backgroundColor","outlineColor","fill","stroke","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"]),r2=px(()=>Object.hasOwnProperty.call(Element.prototype,"animate"));function a2(n){var x;const{motionValue:a,name:s,repeatDelay:l,repeatType:c,damping:h,type:d,keyframes:m}=n,p=(x=a==null?void 0:a.owner)==null?void 0:x.current;if(!(p instanceof HTMLElement)&&!(p instanceof SVGElement))return!1;const{onUpdate:g,transformTemplate:v}=a.owner.getProps();return r2()&&s&&(Kx.has(s)||n2.has(s)&&t2(m))&&(s!=="transform"||!v)&&!g&&!l&&c!=="mirror"&&h!==0&&d!=="inertia"}const i2=40;class s2 extends Ef{constructor({autoplay:a=!0,delay:s=0,type:l="keyframes",repeat:c=0,repeatDelay:h=0,repeatType:d="loop",keyframes:m,name:p,motionValue:g,element:v,...x}){var w;super(),this.stop=()=>{var N,C;this._animation&&(this._animation.stop(),(N=this.stopTimeline)==null||N.call(this)),(C=this.keyframeResolver)==null||C.cancel()},this.createdAt=bt.now();const b={autoplay:a,delay:s,type:l,repeat:c,repeatDelay:h,repeatType:d,name:p,motionValue:g,element:v,...x},E=(v==null?void 0:v.KeyframeResolver)||Tf;this.keyframeResolver=new E(m,(N,C,A)=>this.onKeyframesResolved(N,C,b,!A),p,g,v),(w=this.keyframeResolver)==null||w.scheduleResolve()}onKeyframesResolved(a,s,l,c){var A,k;this.keyframeResolver=void 0;const{name:h,type:d,velocity:m,delay:p,isHandoff:g,onUpdate:v}=l;this.resolvedAt=bt.now();let x=!0;Iw(a,h,d,m)||(x=!1,(vr.instantAnimations||!p)&&(v==null||v(Eo(a,l,s))),a[0]=a[a.length-1],_d(l),l.repeat=0);const E={startTime:c?this.resolvedAt?this.resolvedAt-this.createdAt>i2?this.resolvedAt:this.createdAt:this.createdAt:void 0,finalKeyframe:s,...l,keyframes:a},w=x&&!g&&a2(E),N=(k=(A=E.motionValue)==null?void 0:A.owner)==null?void 0:k.current;let C;if(w)try{C=new Jw({...E,element:N})}catch{C=new ao(E)}else C=new ao(E);C.finished.then(()=>{this.notifyFinished()}).catch(tn),this.pendingTimeline&&(this.stopTimeline=C.attachTimeline(this.pendingTimeline),this.pendingTimeline=void 0),this._animation=C}get finished(){return this._animation?this.animation.finished:this._finished}then(a,s){return this.finished.finally(a).then(()=>{})}get animation(){var a;return this._animation||((a=this.keyframeResolver)==null||a.resume(),Pw()),this._animation}get duration(){return this.animation.duration}get iterationDuration(){return this.animation.iterationDuration}get time(){return this.animation.time}set time(a){this.animation.time=a}get speed(){return this.animation.speed}get state(){return this.animation.state}set speed(a){this.animation.speed=a}get startTime(){return this.animation.startTime}attachTimeline(a){return this._animation?this.stopTimeline=this.animation.attachTimeline(a):this.pendingTimeline=a,()=>this.stop()}play(){this.animation.play()}pause(){this.animation.pause()}complete(){this.animation.complete()}cancel(){var a;this._animation&&this.animation.cancel(),(a=this.keyframeResolver)==null||a.cancel()}}function Zx(n,a,s,l=0,c=1){const h=Array.from(n).sort((g,v)=>g.sortNodePosition(v)).indexOf(a),d=n.size,m=(d-1)*l;return typeof s=="function"?s(h,d):c===1?h*l:m-h*l}const Ty=30,l2=n=>!isNaN(parseFloat(n));class o2{constructor(a,s={}){this.canTrackVelocity=null,this.events={},this.updateAndNotify=l=>{var h;const c=bt.now();if(this.updatedAt!==c&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(l),this.current!==this.prev&&((h=this.events.change)==null||h.notify(this.current),this.dependents))for(const d of this.dependents)d.dirty()},this.hasAnimated=!1,this.setCurrent(a),this.owner=s.owner}setCurrent(a){this.current=a,this.updatedAt=bt.now(),this.canTrackVelocity===null&&a!==void 0&&(this.canTrackVelocity=l2(this.current))}setPrevFrameValue(a=this.current){this.prevFrameValue=a,this.prevUpdatedAt=this.updatedAt}onChange(a){return this.on("change",a)}on(a,s){this.events[a]||(this.events[a]=new gf);const l=this.events[a].add(s);return a==="change"?()=>{l(),Ge.read(()=>{this.events.change.getSize()||this.stop()})}:l}clearListeners(){for(const a in this.events)this.events[a].clear()}attach(a,s){this.passiveEffect=a,this.stopPassiveEffect=s}set(a){this.passiveEffect?this.passiveEffect(a,this.updateAndNotify):this.updateAndNotify(a)}setWithVelocity(a,s,l){this.set(s),this.prev=void 0,this.prevFrameValue=a,this.prevUpdatedAt=this.updatedAt-l}jump(a,s=!0){this.updateAndNotify(a),this.prev=a,this.prevUpdatedAt=this.prevFrameValue=void 0,s&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}dirty(){var a;(a=this.events.change)==null||a.notify(this.current)}addDependent(a){this.dependents||(this.dependents=new Set),this.dependents.add(a)}removeDependent(a){this.dependents&&this.dependents.delete(a)}get(){return this.current}getPrevious(){return this.prev}getVelocity(){const a=bt.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||a-this.updatedAt>Ty)return 0;const s=Math.min(this.updatedAt-this.prevUpdatedAt,Ty);return gx(parseFloat(this.current)-parseFloat(this.prevFrameValue),s)}start(a){return this.stop(),new Promise(s=>{this.hasAnimated=!0,this.animation=a(s),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){var a,s;(a=this.dependents)==null||a.clear(),(s=this.events.destroy)==null||s.notify(),this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}}function Ya(n,a){return new o2(n,a)}function Qx(n,a){if(n!=null&&n.inherit&&a){const{inherit:s,...l}=n;return{...a,...l}}return n}function Cf(n,a){const s=(n==null?void 0:n[a])??(n==null?void 0:n.default)??n;return s!==n?Qx(s,n):s}const c2={type:"spring",stiffness:500,damping:25,restSpeed:10},u2=n=>({type:"spring",stiffness:550,damping:n===0?2*Math.sqrt(550):30,restSpeed:10}),d2={type:"keyframes",duration:.8},f2={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},h2=(n,{keyframes:a})=>a.length>2?d2:Xa.has(n)?n.startsWith("scale")?u2(a[1]):c2:f2,m2=new Set(["when","delay","delayChildren","staggerChildren","staggerDirection","repeat","repeatType","repeatDelay","from","elapsed"]);function p2(n){for(const a in n)if(!m2.has(a))return!0;return!1}const Nf=(n,a,s,l={},c,h)=>d=>{const m=Cf(l,n)||{},p=m.delay||l.delay||0;let{elapsed:g=0}=l;g=g-qt(p);const v={keyframes:Array.isArray(s)?s:[null,s],ease:"easeOut",velocity:a.getVelocity(),...m,delay:-g,onUpdate:b=>{a.set(b),m.onUpdate&&m.onUpdate(b)},onComplete:()=>{d(),m.onComplete&&m.onComplete()},name:n,motionValue:a,element:h?void 0:c};p2(m)||Object.assign(v,h2(n,v)),v.duration&&(v.duration=qt(v.duration)),v.repeatDelay&&(v.repeatDelay=qt(v.repeatDelay)),v.from!==void 0&&(v.keyframes[0]=v.from);let x=!1;if((v.type===!1||v.duration===0&&!v.repeatDelay)&&(_d(v),v.delay===0&&(x=!0)),(vr.instantAnimations||vr.skipAnimations||c!=null&&c.shouldSkipAnimations||m.skipAnimations)&&(x=!0,_d(v),v.delay=0),v.allowFlatten=!m.type&&!m.ease,x&&!h&&a.get()!==void 0){const b=Eo(v.keyframes,m);if(b!==void 0){Ge.update(()=>{v.onUpdate(b),v.onComplete()});return}}return m.isSync?new ao(v):new s2(v)},g2=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function y2(n){const a=g2.exec(n);if(!a)return[,];const[,s,l,c]=a;return[`--${s??l}`,c]}function Jx(n,a,s=1){const[l,c]=y2(n);if(!l)return;const h=window.getComputedStyle(a).getPropertyValue(l);if(h){const d=h.trim();return fx(d)?parseFloat(d):d}return xf(c)?Jx(c,a,s+1):c}function Cy(n){const a=[{},{}];return n==null||n.values.forEach((s,l)=>{a[0][l]=s.get(),a[1][l]=s.getVelocity()}),a}function Df(n,a,s,l){if(typeof a=="function"){const[c,h]=Cy(l);a=a(s!==void 0?s:n.custom,c,h)}if(typeof a=="string"&&(a=n.variants&&n.variants[a]),typeof a=="function"){const[c,h]=Cy(l);a=a(s!==void 0?s:n.custom,c,h)}return a}function Fr(n,a,s){const l=n.getProps();return Df(l,a,s!==void 0?s:l.custom,n)}const Wx=new Set(["width","height","top","left","right","bottom",...Fa]),Vd=n=>Array.isArray(n);function v2(n,a,s){n.hasValue(a)?n.getValue(a).set(s):n.addValue(a,Ya(s))}function x2(n){return Vd(n)?n[n.length-1]||0:n}function b2(n,a){const s=Fr(n,a);let{transitionEnd:l={},transition:c={},...h}=s||{};h={...h,...l};for(const d in h){const m=x2(h[d]);v2(n,d,m)}}const gt=n=>!!(n&&n.getVelocity);function S2(n){return!!(gt(n)&&n.add)}function Bd(n,a){const s=n.getValue("willChange");if(S2(s))return s.add(a);if(!s&&vr.WillChange){const l=new vr.WillChange("auto");n.addValue("willChange",l),l.add(a)}}function Af(n){return n.replace(/([A-Z])/g,a=>`-${a.toLowerCase()}`)}const j2="framerAppearId",Ix="data-"+Af(j2);function eb(n){return n.props[Ix]}function w2({protectedKeys:n,needsAnimating:a},s){const l=n.hasOwnProperty(s)&&a[s]!==!0;return a[s]=!1,l}function tb(n,a,{delay:s=0,transitionOverride:l,type:c}={}){let{transition:h,transitionEnd:d,...m}=a;const p=n.getDefaultTransition();h=h?Qx(h,p):p;const g=h==null?void 0:h.reduceMotion,v=h==null?void 0:h.skipAnimations;l&&(h=l);const x=[],b=c&&n.animationState&&n.animationState.getState()[c],E=h==null?void 0:h.path;E&&E.animateVisualElement(n,m,h,s,x);for(const w in m){const N=n.getValue(w,n.latestValues[w]??null),C=m[w];if(C===void 0||b&&w2(b,w))continue;const A={delay:s,...Cf(h||{},w)};v&&(A.skipAnimations=!0);const k=N.get();if(k!==void 0&&!N.isAnimating()&&!Array.isArray(C)&&C===k&&!A.velocity){Ge.update(()=>N.set(C));continue}let V=!1;if(window.MotionHandoffAnimation){const U=eb(n);if(U){const D=window.MotionHandoffAnimation(U,w,Ge);D!==null&&(A.startTime=D,V=!0)}}Bd(n,w);const z=g??n.shouldReduceMotion;N.start(Nf(w,N,C,z&&Wx.has(w)?{type:!1}:A,n,V));const L=N.animation;L&&x.push(L)}if(d){const w=()=>Ge.update(()=>{d&&b2(n,d)});x.length?Promise.all(x).then(w):w()}return x}function Ld(n,a,s={}){var p;const l=Fr(n,a,s.type==="exit"?(p=n.presenceContext)==null?void 0:p.custom:void 0);let{transition:c=n.getDefaultTransition()||{}}=l||{};s.transitionOverride&&(c=s.transitionOverride);const h=l?()=>Promise.all(tb(n,l,s)):()=>Promise.resolve(),d=n.variantChildren&&n.variantChildren.size?(g=0)=>{const{delayChildren:v=0,staggerChildren:x,staggerDirection:b}=c;return E2(n,a,g,v,x,b,s)}:()=>Promise.resolve(),{when:m}=c;if(m){const[g,v]=m==="beforeChildren"?[h,d]:[d,h];return g().then(()=>v())}else return Promise.all([h(),d(s.delay)])}function E2(n,a,s=0,l=0,c=0,h=1,d){const m=[];for(const p of n.variantChildren)p.notify("AnimationStart",a),m.push(Ld(p,a,{...d,delay:s+(typeof l=="function"?0:l)+Zx(n.variantChildren,p,l,c,h)}).then(()=>p.notify("AnimationComplete",a)));return Promise.all(m)}function T2(n,a,s={}){n.notify("AnimationStart",a);let l;if(Array.isArray(a)){const c=a.map(h=>Ld(n,h,s));l=Promise.all(c)}else if(typeof a=="string")l=Ld(n,a,s);else{const c=typeof a=="function"?Fr(n,a,s.custom):a;l=Promise.all(tb(n,c,s))}return l.then(()=>{n.notify("AnimationComplete",a)})}const C2={test:n=>n==="auto",parse:n=>n},nb=n=>a=>a.test(n),rb=[Ga,ge,xn,qn,Wj,Jj,C2],Ny=n=>rb.find(nb(n));function N2(n){return typeof n=="number"?n===0:n!==null?n==="none"||n==="0"||mx(n):!0}const D2=new Set(["brightness","contrast","saturate","opacity"]);function A2(n){const[a,s]=n.slice(0,-1).split("(");if(a==="drop-shadow")return n;const[l]=s.match(bf)||[];if(!l)return n;const c=s.replace(l,"");let h=D2.has(a)?1:0;return l!==s&&(h*=100),a+"("+h+c+")"}const k2=/\b([a-z-]*)\(.*?\)/gu,Ud={...cn,getAnimatableNone:n=>{const a=n.match(k2);return a?a.map(A2).join(" "):n}},Hd={...cn,getAnimatableNone:n=>{const a=cn.parse(n);return cn.createTransformer(n)(a.map(l=>typeof l=="number"?0:typeof l=="object"?{...l,alpha:1}:l))}},Dy={...Ga,transform:Math.round},M2={rotate:qn,pathRotation:qn,rotateX:qn,rotateY:qn,rotateZ:qn,scale:kl,scaleX:kl,scaleY:kl,scaleZ:kl,skew:qn,skewX:qn,skewY:qn,distance:ge,translateX:ge,translateY:ge,translateZ:ge,x:ge,y:ge,z:ge,perspective:ge,transformPerspective:ge,opacity:Ii,originX:my,originY:my,originZ:ge},io={borderWidth:ge,borderTopWidth:ge,borderRightWidth:ge,borderBottomWidth:ge,borderLeftWidth:ge,borderRadius:ge,borderTopLeftRadius:ge,borderTopRightRadius:ge,borderBottomRightRadius:ge,borderBottomLeftRadius:ge,width:ge,maxWidth:ge,height:ge,maxHeight:ge,top:ge,right:ge,bottom:ge,left:ge,inset:ge,insetBlock:ge,insetBlockStart:ge,insetBlockEnd:ge,insetInline:ge,insetInlineStart:ge,insetInlineEnd:ge,padding:ge,paddingTop:ge,paddingRight:ge,paddingBottom:ge,paddingLeft:ge,paddingBlock:ge,paddingBlockStart:ge,paddingBlockEnd:ge,paddingInline:ge,paddingInlineStart:ge,paddingInlineEnd:ge,margin:ge,marginTop:ge,marginRight:ge,marginBottom:ge,marginLeft:ge,marginBlock:ge,marginBlockStart:ge,marginBlockEnd:ge,marginInline:ge,marginInlineStart:ge,marginInlineEnd:ge,fontSize:ge,backgroundPositionX:ge,backgroundPositionY:ge,...M2,zIndex:Dy,fillOpacity:Ii,strokeOpacity:Ii,numOctaves:Dy},R2={...io,color:at,backgroundColor:at,outlineColor:at,fill:at,stroke:at,borderColor:at,borderTopColor:at,borderRightColor:at,borderBottomColor:at,borderLeftColor:at,filter:Ud,WebkitFilter:Ud,mask:Hd,WebkitMask:Hd},ab=n=>R2[n],O2=new Set([Ud,Hd]);function ib(n,a){let s=ab(n);return O2.has(s)||(s=cn),s.getAnimatableNone?s.getAnimatableNone(a):void 0}const z2=new Set(["auto","none","0"]);function _2(n,a,s){let l=0,c;for(;l<n.length&&!c;){const h=n[l];typeof h=="string"&&!z2.has(h)&&qa(h).values.length&&(c=n[l]),l++}if(c&&s)for(const h of a)n[h]=ib(s,c)}class V2 extends Tf{constructor(a,s,l,c,h){super(a,s,l,c,h,!0)}readKeyframes(){const{unresolvedKeyframes:a,element:s,name:l}=this;if(!s||!s.current)return;super.readKeyframes();for(let v=0;v<a.length;v++){let x=a[v];if(typeof x=="string"&&(x=x.trim(),xf(x))){const b=Jx(x,s.current);b!==void 0&&(a[v]=b),v===a.length-1&&(this.finalKeyframe=x)}}if(this.resolveNoneKeyframes(),!Wx.has(l)||a.length!==2)return;const[c,h]=a,d=Ny(c),m=Ny(h),p=hy(c),g=hy(h);if(p!==g&&gr[l]){this.needsMeasurement=!0;return}if(d!==m)if(jy(d)&&jy(m))for(let v=0;v<a.length;v++){const x=a[v];typeof x=="string"&&(a[v]=parseFloat(x))}else gr[l]&&(this.needsMeasurement=!0)}resolveNoneKeyframes(){const{unresolvedKeyframes:a,name:s}=this,l=[];for(let c=0;c<a.length;c++)(a[c]===null||N2(a[c]))&&l.push(c);l.length&&_2(a,l,s)}measureInitialState(){const{element:a,unresolvedKeyframes:s,name:l}=this;if(!a||!a.current)return;l==="height"&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=gr[l](a.measureViewportBox(),window.getComputedStyle(a.current)),s[0]=this.measuredOrigin;const c=s[s.length-1];c!==void 0&&a.getValue(l,c).jump(c,!1)}measureEndState(){var m;const{element:a,name:s,unresolvedKeyframes:l}=this;if(!a||!a.current)return;const c=a.getValue(s);c&&c.jump(this.measuredOrigin,!1);const h=l.length-1,d=l[h];l[h]=gr[s](a.measureViewportBox(),window.getComputedStyle(a.current)),d!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=d),(m=this.removedTransforms)!=null&&m.length&&this.removedTransforms.forEach(([p,g])=>{a.getValue(p).set(g)}),this.resolveNoneKeyframes()}}const kf=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"];function sb(n,a,s){if(n==null)return[];if(n instanceof EventTarget)return[n];if(typeof n=="string"){let l=document;const c=(s==null?void 0:s[n])??l.querySelectorAll(n);return c?Array.from(c):[]}return Array.from(n).filter(l=>l!=null)}const qd=(n,a)=>a&&typeof n=="number"?a.transform(n):n;function Gl(n){return hx(n)&&"offsetHeight"in n&&!("ownerSVGElement"in n)}const{schedule:Mf}=Nx(queueMicrotask,!1),on={x:!1,y:!1};function lb(){return on.x||on.y}function B2(n){return n==="x"||n==="y"?on[n]?null:(on[n]=!0,()=>{on[n]=!1}):on.x||on.y?null:(on.x=on.y=!0,()=>{on.x=on.y=!1})}function ob(n,a){const s=sb(n),l=new AbortController,c={passive:!0,...a,signal:l.signal};return[s,c,()=>l.abort()]}function L2(n){return!(n.pointerType==="touch"||lb())}function U2(n,a,s={}){const[l,c,h]=ob(n,s);return l.forEach(d=>{let m=!1,p=!1,g;const v=()=>{d.removeEventListener("pointerleave",w)},x=C=>{g&&(g(C),g=void 0),v()},b=C=>{m=!1,window.removeEventListener("pointerup",b),window.removeEventListener("pointercancel",b),p&&(p=!1,x(C))},E=()=>{m=!0,window.addEventListener("pointerup",b,c),window.addEventListener("pointercancel",b,c)},w=C=>{if(C.pointerType!=="touch"){if(m){p=!0;return}x(C)}},N=C=>{if(!L2(C))return;p=!1;const A=a(d,C);typeof A=="function"&&(g=A,d.addEventListener("pointerleave",w,c))};d.addEventListener("pointerenter",N,c),d.addEventListener("pointerdown",E,c)}),h}const cb=(n,a)=>a?n===a?!0:cb(n,a.parentElement):!1,Rf=n=>n.pointerType==="mouse"?typeof n.button!="number"||n.button<=0:n.isPrimary!==!1,H2=new Set(["BUTTON","INPUT","SELECT","TEXTAREA","A"]);function q2(n){return H2.has(n.tagName)||n.isContentEditable===!0}const Y2=new Set(["INPUT","SELECT","TEXTAREA"]);function P2(n){return Y2.has(n.tagName)||n.isContentEditable===!0}const Fl=new WeakSet;function Ay(n){return a=>{a.key==="Enter"&&n(a)}}function rd(n,a){n.dispatchEvent(new PointerEvent("pointer"+a,{isPrimary:!0,bubbles:!0}))}const G2=(n,a)=>{const s=n.currentTarget;if(!s)return;const l=Ay(()=>{if(Fl.has(s))return;rd(s,"down");const c=Ay(()=>{rd(s,"up")}),h=()=>rd(s,"cancel");s.addEventListener("keyup",c,a),s.addEventListener("blur",h,a)});s.addEventListener("keydown",l,a),s.addEventListener("blur",()=>s.removeEventListener("keydown",l),a)};function ky(n){return Rf(n)&&!lb()}const My=new WeakSet;function F2(n,a,s={}){const[l,c,h]=ob(n,s),d=m=>{const p=m.currentTarget;if(!ky(m)||My.has(m))return;Fl.add(p),s.stopPropagation&&My.add(m);const g=a(p,m),v={...c,capture:!0},x=(w,N)=>{window.removeEventListener("pointerup",b,v),window.removeEventListener("pointercancel",E,v),Fl.has(p)&&Fl.delete(p),ky(w)&&typeof g=="function"&&g(w,{success:N})},b=w=>{x(w,p===window||p===document||s.useGlobalTarget||cb(p,w.target))},E=w=>{x(w,!1)};window.addEventListener("pointerup",b,v),window.addEventListener("pointercancel",E,v)};return l.forEach(m=>{(s.useGlobalTarget?window:m).addEventListener("pointerdown",d,c),Gl(m)&&(m.addEventListener("focus",g=>G2(g,c)),!q2(m)&&!m.hasAttribute("tabindex")&&(m.tabIndex=0))}),h}function Of(n){return hx(n)&&"ownerSVGElement"in n}const Xl=new WeakMap;let pr;const ub=(n,a,s)=>(l,c)=>c&&c[0]?c[0][n+"Size"]:Of(l)&&"getBBox"in l?l.getBBox()[a]:l[s],X2=ub("inline","width","offsetWidth"),$2=ub("block","height","offsetHeight");function K2({target:n,borderBoxSize:a}){var s;(s=Xl.get(n))==null||s.forEach(l=>{l(n,{get width(){return X2(n,a)},get height(){return $2(n,a)}})})}function Z2(n){n.forEach(K2)}function Q2(){typeof ResizeObserver>"u"||(pr=new ResizeObserver(Z2))}function J2(n,a){pr||Q2();const s=sb(n);return s.forEach(l=>{let c=Xl.get(l);c||(c=new Set,Xl.set(l,c)),c.add(a),pr==null||pr.observe(l)}),()=>{s.forEach(l=>{const c=Xl.get(l);c==null||c.delete(a),c!=null&&c.size||pr==null||pr.unobserve(l)})}}const $l=new Set;let La;function W2(){La=()=>{const n={get width(){return window.innerWidth},get height(){return window.innerHeight}};$l.forEach(a=>a(n))},window.addEventListener("resize",La)}function I2(n){return $l.add(n),La||W2(),()=>{$l.delete(n),!$l.size&&typeof La=="function"&&(window.removeEventListener("resize",La),La=void 0)}}function Ry(n,a){return typeof n=="function"?I2(n):J2(n,a)}function eE(n){return Of(n)&&n.tagName==="svg"}const tE=[...rb,at,cn],nE=n=>tE.find(nb(n)),Oy=()=>({translate:0,scale:1,origin:0,originPoint:0}),Ua=()=>({x:Oy(),y:Oy()}),zy=()=>({min:0,max:0}),st=()=>({x:zy(),y:zy()}),rE=new WeakMap;function To(n){return n!==null&&typeof n=="object"&&typeof n.start=="function"}function es(n){return typeof n=="string"||Array.isArray(n)}const zf=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],_f=["initial",...zf];function Co(n){return To(n.animate)||_f.some(a=>es(n[a]))}function db(n){return!!(Co(n)||n.variants)}function aE(n,a,s){for(const l in a){const c=a[l],h=s[l];if(gt(c))n.addValue(l,c);else if(gt(h))n.addValue(l,Ya(c,{owner:n}));else if(h!==c)if(n.hasValue(l)){const d=n.getValue(l);d.liveStyle===!0?d.jump(c):d.hasAnimated||d.set(c)}else{const d=n.getStaticValue(l);n.addValue(l,Ya(d!==void 0?d:c,{owner:n}))}}for(const l in s)a[l]===void 0&&n.removeValue(l);return a}const so={current:null},Vf={current:!1},iE=typeof window<"u";function fb(){if(Vf.current=!0,!!iE)if(window.matchMedia){const n=window.matchMedia("(prefers-reduced-motion)"),a=()=>so.current=n.matches;n.addEventListener("change",a),a()}else so.current=!1}const _y=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"];let lo={};function hb(n){lo=n}function sE(){return lo}class lE{scrapeMotionValuesFromProps(a,s,l){return{}}constructor({parent:a,props:s,presenceContext:l,reducedMotionConfig:c,skipAnimations:h,blockInitialAnimation:d,visualState:m},p={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.shouldSkipAnimations=!1,this.values=new Map,this.KeyframeResolver=Tf,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.hasBeenMounted=!1,this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{const E=bt.now();this.renderScheduledAt<E&&(this.renderScheduledAt=E,Ge.render(this.render,!1,!0))};const{latestValues:g,renderState:v}=m;this.latestValues=g,this.baseTarget={...g},this.initialValues=s.initial?{...g}:{},this.renderState=v,this.parent=a,this.props=s,this.presenceContext=l,this.depth=a?a.depth+1:0,this.reducedMotionConfig=c,this.skipAnimationsConfig=h,this.options=p,this.blockInitialAnimation=!!d,this.isControllingVariants=Co(s),this.isVariantNode=db(s),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(a&&a.current);const{willChange:x,...b}=this.scrapeMotionValuesFromProps(s,{},this);for(const E in b){const w=b[E];g[E]!==void 0&&gt(w)&&w.set(g[E])}}mount(a){var s,l;if(this.hasBeenMounted)for(const c in this.initialValues)(s=this.values.get(c))==null||s.jump(this.initialValues[c]),this.latestValues[c]=this.initialValues[c];this.current=a,rE.set(a,this),this.projection&&!this.projection.instance&&this.projection.mount(a),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((c,h)=>this.bindToMotionValue(h,c)),this.reducedMotionConfig==="never"?this.shouldReduceMotion=!1:this.reducedMotionConfig==="always"?this.shouldReduceMotion=!0:(Vf.current||fb(),this.shouldReduceMotion=so.current),this.shouldSkipAnimations=this.skipAnimationsConfig??!1,(l=this.parent)==null||l.addChild(this),this.update(this.props,this.presenceContext),this.hasBeenMounted=!0}unmount(){var a;this.projection&&this.projection.unmount(),xr(this.notifyUpdate),xr(this.render),this.valueSubscriptions.forEach(s=>s()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),(a=this.parent)==null||a.removeChild(this);for(const s in this.events)this.events[s].clear();for(const s in this.features){const l=this.features[s];l&&(l.unmount(),l.isMounted=!1)}this.current=null}addChild(a){this.children.add(a),this.enteringChildren??(this.enteringChildren=new Set),this.enteringChildren.add(a)}removeChild(a){this.children.delete(a),this.enteringChildren&&this.enteringChildren.delete(a)}bindToMotionValue(a,s){if(this.valueSubscriptions.has(a)&&this.valueSubscriptions.get(a)(),s.accelerate&&Kx.has(a)&&this.current instanceof HTMLElement){const{factory:d,keyframes:m,times:p,ease:g,duration:v}=s.accelerate,x=new Xx({element:this.current,name:a,keyframes:m,times:p,ease:g,duration:qt(v)}),b=d(x);this.valueSubscriptions.set(a,()=>{b(),x.cancel()});return}const l=Xa.has(a);l&&this.onBindTransform&&this.onBindTransform();const c=s.on("change",d=>{this.latestValues[a]=d,this.props.onUpdate&&Ge.preRender(this.notifyUpdate),l&&this.projection&&(this.projection.isTransformDirty=!0),this.scheduleRender()});let h;typeof window<"u"&&window.MotionCheckAppearSync&&(h=window.MotionCheckAppearSync(this,a,s)),this.valueSubscriptions.set(a,()=>{c(),h&&h()})}sortNodePosition(a){return!this.current||!this.sortInstanceNodePosition||this.type!==a.type?0:this.sortInstanceNodePosition(this.current,a.current)}updateFeatures(){let a="animation";for(a in lo){const s=lo[a];if(!s)continue;const{isEnabled:l,Feature:c}=s;if(!this.features[a]&&c&&l(this.props)&&(this.features[a]=new c(this)),this.features[a]){const h=this.features[a];h.isMounted?h.update():(h.mount(),h.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):st()}getStaticValue(a){return this.latestValues[a]}setStaticValue(a,s){this.latestValues[a]=s}update(a,s){(a.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=a,this.prevPresenceContext=this.presenceContext,this.presenceContext=s;for(let l=0;l<_y.length;l++){const c=_y[l];this.propEventSubscriptions[c]&&(this.propEventSubscriptions[c](),delete this.propEventSubscriptions[c]);const h="on"+c,d=a[h];d&&(this.propEventSubscriptions[c]=this.on(c,d))}this.prevMotionValues=aE(this,this.scrapeMotionValuesFromProps(a,this.prevProps||{},this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue()}getProps(){return this.props}getVariant(a){return this.props.variants?this.props.variants[a]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(a){const s=this.getClosestVariantNode();if(s)return s.variantChildren&&s.variantChildren.add(a),()=>s.variantChildren.delete(a)}addValue(a,s){const l=this.values.get(a);s!==l&&(l&&this.removeValue(a),this.bindToMotionValue(a,s),this.values.set(a,s),this.latestValues[a]=s.get())}removeValue(a){this.values.delete(a);const s=this.valueSubscriptions.get(a);s&&(s(),this.valueSubscriptions.delete(a)),delete this.latestValues[a],this.removeValueFromRenderState(a,this.renderState)}hasValue(a){return this.values.has(a)}getValue(a,s){if(this.props.values&&this.props.values[a])return this.props.values[a];let l=this.values.get(a);return l===void 0&&s!==void 0&&(l=Ya(s===null?void 0:s,{owner:this}),this.addValue(a,l)),l}readValue(a,s){let l=this.latestValues[a]!==void 0||!this.current?this.latestValues[a]:this.getBaseTargetFromProps(this.props,a)??this.readValueFromInstance(this.current,a,this.options);return l!=null&&(typeof l=="string"&&(fx(l)||mx(l))?l=parseFloat(l):!nE(l)&&cn.test(s)&&(l=ib(a,s)),this.setBaseTarget(a,gt(l)?l.get():l)),gt(l)?l.get():l}setBaseTarget(a,s){this.baseTarget[a]=s}getBaseTarget(a){var h;const{initial:s}=this.props;let l;if(typeof s=="string"||typeof s=="object"){const d=Df(this.props,s,(h=this.presenceContext)==null?void 0:h.custom);d&&(l=d[a])}if(s&&l!==void 0)return l;const c=this.getBaseTargetFromProps(this.props,a);return c!==void 0&&!gt(c)?c:this.initialValues[a]!==void 0&&l===void 0?void 0:this.baseTarget[a]}on(a,s){return this.events[a]||(this.events[a]=new gf),this.events[a].add(s)}notify(a,...s){this.events[a]&&this.events[a].notify(...s)}scheduleRenderMicrotask(){Mf.render(this.render)}}class mb extends lE{constructor(){super(...arguments),this.KeyframeResolver=V2}sortInstanceNodePosition(a,s){return a.compareDocumentPosition(s)&2?1:-1}getBaseTargetFromProps(a,s){const l=a.style;return l?l[s]:void 0}removeValueFromRenderState(a,{vars:s,style:l}){delete s[a],delete l[a]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);const{children:a}=this.props;gt(a)&&(this.childSubscription=a.on("change",s=>{this.current&&(this.current.textContent=`${s}`)}))}}class Sr{constructor(a){this.isMounted=!1,this.node=a}update(){}}function pb({top:n,left:a,right:s,bottom:l}){return{x:{min:a,max:s},y:{min:n,max:l}}}function oE({x:n,y:a}){return{top:a.min,right:n.max,bottom:a.max,left:n.min}}function cE(n,a){if(!a)return n;const s=a({x:n.left,y:n.top}),l=a({x:n.right,y:n.bottom});return{top:s.y,left:s.x,bottom:l.y,right:l.x}}function ad(n){return n===void 0||n===1}function Yd({scale:n,scaleX:a,scaleY:s}){return!ad(n)||!ad(a)||!ad(s)}function qr(n){return Yd(n)||gb(n)||n.z||n.rotate||n.rotateX||n.rotateY||n.skewX||n.skewY}function gb(n){return Vy(n.x)||Vy(n.y)}function Vy(n){return n&&n!=="0%"}function oo(n,a,s){const l=n-s,c=a*l;return s+c}function By(n,a,s,l,c){return c!==void 0&&(n=oo(n,c,l)),oo(n,s,l)+a}function Pd(n,a=0,s=1,l,c){n.min=By(n.min,a,s,l,c),n.max=By(n.max,a,s,l,c)}function yb(n,{x:a,y:s}){Pd(n.x,a.translate,a.scale,a.originPoint),Pd(n.y,s.translate,s.scale,s.originPoint)}const Ly=.999999999999,Uy=1.0000000000001;function uE(n,a,s,l=!1){var m;const c=s.length;if(!c)return;a.x=a.y=1;let h,d;for(let p=0;p<c;p++){h=s[p],d=h.projectionDelta;const{visualElement:g}=h.options;g&&g.props.style&&g.props.style.display==="contents"||(l&&h.options.layoutScroll&&h.scroll&&h!==h.root&&(yn(n.x,-h.scroll.offset.x),yn(n.y,-h.scroll.offset.y)),d&&(a.x*=d.x.scale,a.y*=d.y.scale,yb(n,d)),l&&qr(h.latestValues)&&Kl(n,h.latestValues,(m=h.layout)==null?void 0:m.layoutBox))}a.x<Uy&&a.x>Ly&&(a.x=1),a.y<Uy&&a.y>Ly&&(a.y=1)}function yn(n,a){n.min+=a,n.max+=a}function Hy(n,a,s,l,c=.5){const h=Pe(n.min,n.max,c);Pd(n,a,s,h,l)}function qy(n,a){return typeof n=="string"?parseFloat(n)/100*(a.max-a.min):n}function Kl(n,a,s){const l=s??n;Hy(n.x,qy(a.x,l.x),a.scaleX,a.scale,a.originX),Hy(n.y,qy(a.y,l.y),a.scaleY,a.scale,a.originY)}function vb(n,a){return pb(cE(n.getBoundingClientRect(),a))}function dE(n,a,s){const l=vb(n,s),{scroll:c}=a;return c&&(yn(l.x,c.offset.x),yn(l.y,c.offset.y)),l}const fE={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},hE=Fa.length;function mE(n,a,s){let l="",c=!0;for(let d=0;d<hE;d++){const m=Fa[d],p=n[m];if(p===void 0)continue;let g=!0;if(typeof p=="number")g=p===(m.startsWith("scale")?1:0);else{const v=parseFloat(p);g=m.startsWith("scale")?v===1:v===0}if(!g||s){const v=qd(p,io[m]);if(!g){c=!1;const x=fE[m]||m;l+=`${x}(${v}) `}s&&(a[m]=v)}}const h=n.pathRotation;return h&&(c=!1,l+=`rotate(${qd(h,io.pathRotation)}) `),l=l.trim(),s?l=s(a,c?"":l):c&&(l="none"),l}function Bf(n,a,s){const{style:l,vars:c,transformOrigin:h}=n;let d=!1,m=!1;for(const p in a){const g=a[p];if(Xa.has(p)){d=!0;continue}else if(Ax(p)){c[p]=g;continue}else{const v=qd(g,io[p]);p.startsWith("origin")?(m=!0,h[p]=v):l[p]=v}}if(a.transform||(d||s?l.transform=mE(a,n.transform,s):l.transform&&(l.transform="none")),m){const{originX:p="50%",originY:g="50%",originZ:v=0}=h;l.transformOrigin=`${p} ${g} ${v}`}}function xb(n,{style:a,vars:s},l,c){const h=n.style;let d;for(d in a)h[d]=a[d];c==null||c.applyProjectionStyles(h,l);for(d in s)h.setProperty(d,s[d])}function Yy(n,a){return a.max===a.min?0:n/(a.max-a.min)*100}const Pi={correct:(n,a)=>{if(!a.target)return n;if(typeof n=="string")if(ge.test(n))n=parseFloat(n);else return n;const s=Yy(n,a.target.x),l=Yy(n,a.target.y);return`${s}% ${l}%`}},pE={correct:(n,{treeScale:a,projectionDelta:s})=>{const l=n,c=cn.parse(n);if(c.length>5)return l;const h=cn.createTransformer(n),d=typeof c[0]!="number"?1:0,m=s.x.scale*a.x,p=s.y.scale*a.y;c[0+d]/=m,c[1+d]/=p;const g=Pe(m,p,.5);return typeof c[2+d]=="number"&&(c[2+d]/=g),typeof c[3+d]=="number"&&(c[3+d]/=g),h(c)}},Gd={borderRadius:{...Pi,applyTo:[...kf]},borderTopLeftRadius:Pi,borderTopRightRadius:Pi,borderBottomLeftRadius:Pi,borderBottomRightRadius:Pi,boxShadow:pE};function bb(n,{layout:a,layoutId:s}){return Xa.has(n)||n.startsWith("origin")||(a||s!==void 0)&&(!!Gd[n]||n==="opacity")}function Lf(n,a,s){var d;const l=n.style,c=a==null?void 0:a.style,h={};if(!l)return h;for(const m in l)(gt(l[m])||c&&gt(c[m])||bb(m,n)||((d=s==null?void 0:s.getValue(m))==null?void 0:d.liveStyle)!==void 0)&&(h[m]=l[m]);return h}function gE(n){return window.getComputedStyle(n)}class yE extends mb{constructor(){super(...arguments),this.type="html",this.renderInstance=xb}mount(a){wo(!!a.style),super.mount(a)}readValueFromInstance(a,s){var l;if(Xa.has(s))return(l=this.projection)!=null&&l.isProjecting?kd(s):Lw(a,s);{const c=gE(a),h=(Ax(s)?c.getPropertyValue(s):c[s])||0;return typeof h=="string"?h.trim():h}}measureInstanceViewportBox(a,{transformPagePoint:s}){return vb(a,s)}build(a,s,l){Bf(a,s,l.transformTemplate)}scrapeMotionValuesFromProps(a,s,l){return Lf(a,s,l)}}const vE={offset:"stroke-dashoffset",array:"stroke-dasharray"},xE={offset:"strokeDashoffset",array:"strokeDasharray"};function bE(n,a,s=1,l=0,c=!0){n.pathLength=1;const h=c?vE:xE;n[h.offset]=`${-l}`,n[h.array]=`${a} ${s}`}const SE=["offsetDistance","offsetPath","offsetRotate","offsetAnchor"];function Sb(n,{attrX:a,attrY:s,attrScale:l,pathLength:c,pathSpacing:h=1,pathOffset:d=0,...m},p,g,v){if(Bf(n,m,g),p){n.style.viewBox&&(n.attrs.viewBox=n.style.viewBox);return}n.attrs=n.style,n.style={};const{attrs:x,style:b}=n;x.transform&&(b.transform=x.transform,delete x.transform),(b.transform||x.transformOrigin)&&(b.transformOrigin=x.transformOrigin??"50% 50%",delete x.transformOrigin),b.transform&&(b.transformBox=(v==null?void 0:v.transformBox)??"fill-box",delete x.transformBox);for(const E of SE)x[E]!==void 0&&(b[E]=x[E],delete x[E]);a!==void 0&&(x.x=a),s!==void 0&&(x.y=s),l!==void 0&&(x.scale=l),c!==void 0&&bE(x,c,h,d,!1)}const jb=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]),wb=n=>typeof n=="string"&&n.toLowerCase()==="svg";function jE(n,a,s,l){xb(n,a,void 0,l);for(const c in a.attrs)n.setAttribute(jb.has(c)?c:Af(c),a.attrs[c])}function Eb(n,a,s){const l=Lf(n,a,s);for(const c in n)if(gt(n[c])||gt(a[c])){const h=Fa.indexOf(c)!==-1?"attr"+c.charAt(0).toUpperCase()+c.substring(1):c;l[h]=n[c]}return l}class wE extends mb{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1,this.measureInstanceViewportBox=st}getBaseTargetFromProps(a,s){return a[s]}readValueFromInstance(a,s){if(Xa.has(s)){const l=ab(s);return l&&l.default||0}return s=jb.has(s)?s:Af(s),a.getAttribute(s)}scrapeMotionValuesFromProps(a,s,l){return Eb(a,s,l)}build(a,s,l){Sb(a,s,this.isSVGTag,l.transformTemplate,l.style)}renderInstance(a,s,l,c){jE(a,s,l,c)}mount(a){this.isSVGTag=wb(a.tagName),super.mount(a)}}const EE=_f.length;function Tb(n){if(!n)return;if(!n.isControllingVariants){const s=n.parent?Tb(n.parent)||{}:{};return n.props.initial!==void 0&&(s.initial=n.props.initial),s}const a={};for(let s=0;s<EE;s++){const l=_f[s],c=n.props[l];(es(c)||c===!1)&&(a[l]=c)}return a}function Cb(n,a){if(!Array.isArray(a))return!1;const s=a.length;if(s!==n.length)return!1;for(let l=0;l<s;l++)if(a[l]!==n[l])return!1;return!0}const TE=[...zf].reverse(),CE=zf.length;function NE(n){return a=>Promise.all(a.map(({animation:s,options:l})=>T2(n,s,l)))}function DE(n){let a=NE(n),s=Py(),l=!0,c=!1;const h=g=>(v,x)=>{var E;const b=Fr(n,x,g==="exit"?(E=n.presenceContext)==null?void 0:E.custom:void 0);if(b){const{transition:w,transitionEnd:N,...C}=b;v={...v,...C,...N}}return v};function d(g){a=g(n)}function m(g){const{props:v}=n,x=Tb(n.parent)||{},b=[],E=new Set;let w={},N=1/0;for(let A=0;A<CE;A++){const k=TE[A],V=s[k],z=v[k]!==void 0?v[k]:x[k],L=es(z),U=k===g?V.isActive:null;U===!1&&(N=A);let D=z===x[k]&&z!==v[k]&&L;if(D&&(l||c)&&n.manuallyAnimateOnMount&&(D=!1),V.protectedKeys={...w},!V.isActive&&U===null||!z&&!V.prevProp||To(z)||typeof z=="boolean")continue;if(k==="exit"&&V.isActive&&U!==!0){V.prevResolvedValues&&(w={...w,...V.prevResolvedValues});continue}const q=AE(V.prevProp,z);let M=q||k===g&&V.isActive&&!D&&L||A>N&&L,O=!1;const $=Array.isArray(z)?z:[z];let Z=$.reduce(h(k),{});U===!1&&(Z={});const{prevResolvedValues:oe={}}=V,ue={...oe,...Z},ye=W=>{M=!0,E.has(W)&&(O=!0,E.delete(W)),V.needsAnimating[W]=!0;const G=n.getValue(W);G&&(G.liveStyle=!1)};for(const W in ue){const G=Z[W],ee=oe[W];if(w.hasOwnProperty(W))continue;let T=!1;Vd(G)&&Vd(ee)?T=!Cb(G,ee)||q:T=G!==ee,T?G!=null?ye(W):E.add(W):G!==void 0&&E.has(W)?ye(W):V.protectedKeys[W]=!0}V.prevProp=z,V.prevResolvedValues=Z,V.isActive&&(w={...w,...Z}),(l||c)&&n.blockInitialAnimation&&(M=!1);const Y=D&&q;M&&(!Y||O)&&b.push(...$.map(W=>{const G={type:k};if(typeof W=="string"&&(l||c)&&!Y&&n.manuallyAnimateOnMount&&n.parent){const{parent:ee}=n,T=Fr(ee,W);if(ee.enteringChildren&&T){const{delayChildren:_}=T.transition||{};G.delay=Zx(ee.enteringChildren,n,_)}}return{animation:W,options:G}}))}if(E.size){const A={};if(typeof v.initial!="boolean"){const k=Fr(n,Array.isArray(v.initial)?v.initial[0]:v.initial);k&&k.transition&&(A.transition=k.transition)}E.forEach(k=>{const V=n.getBaseTarget(k),z=n.getValue(k);z&&(z.liveStyle=!0),A[k]=V??null}),b.push({animation:A})}let C=!!b.length;return l&&(v.initial===!1||v.initial===v.animate)&&!n.manuallyAnimateOnMount&&(C=!1),l=!1,c=!1,C?a(b):Promise.resolve()}function p(g,v){var b;if(s[g].isActive===v)return Promise.resolve();(b=n.variantChildren)==null||b.forEach(E=>{var w;return(w=E.animationState)==null?void 0:w.setActive(g,v)}),s[g].isActive=v;const x=m(g);for(const E in s)s[E].protectedKeys={};return x}return{animateChanges:m,setActive:p,setAnimateFunction:d,getState:()=>s,reset:()=>{s=Py(),c=!0}}}function AE(n,a){return typeof a=="string"?a!==n:Array.isArray(a)?!Cb(a,n):!1}function Hr(n=!1){return{isActive:n,protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}function Py(){return{animate:Hr(!0),whileInView:Hr(),whileHover:Hr(),whileTap:Hr(),whileDrag:Hr(),whileFocus:Hr(),exit:Hr()}}function Fd(n,a){n.min=a.min,n.max=a.max}function ln(n,a){Fd(n.x,a.x),Fd(n.y,a.y)}function Gy(n,a){n.translate=a.translate,n.scale=a.scale,n.originPoint=a.originPoint,n.origin=a.origin}const Nb=1e-4,kE=1-Nb,ME=1+Nb,Db=.01,RE=0-Db,OE=0+Db;function St(n){return n.max-n.min}function zE(n,a,s){return Math.abs(n-a)<=s}function Fy(n,a,s,l=.5){n.origin=l,n.originPoint=Pe(a.min,a.max,n.origin),n.scale=St(s)/St(a),n.translate=Pe(s.min,s.max,n.origin)-n.originPoint,(n.scale>=kE&&n.scale<=ME||isNaN(n.scale))&&(n.scale=1),(n.translate>=RE&&n.translate<=OE||isNaN(n.translate))&&(n.translate=0)}function Zi(n,a,s,l){Fy(n.x,a.x,s.x,l?l.originX:void 0),Fy(n.y,a.y,s.y,l?l.originY:void 0)}function Xy(n,a,s,l=0){const c=l?Pe(s.min,s.max,l):s.min;n.min=c+a.min,n.max=n.min+St(a)}function _E(n,a,s,l){Xy(n.x,a.x,s.x,l==null?void 0:l.x),Xy(n.y,a.y,s.y,l==null?void 0:l.y)}function $y(n,a,s,l=0){const c=l?Pe(s.min,s.max,l):s.min;n.min=a.min-c,n.max=n.min+St(a)}function co(n,a,s,l){$y(n.x,a.x,s.x,l==null?void 0:l.x),$y(n.y,a.y,s.y,l==null?void 0:l.y)}function Ky(n,a,s,l,c){return n-=a,n=oo(n,1/s,l),c!==void 0&&(n=oo(n,1/c,l)),n}function VE(n,a=0,s=1,l=.5,c,h=n,d=n){if(xn.test(a)&&(a=parseFloat(a),a=Pe(d.min,d.max,a/100)-d.min),typeof a!="number")return;let m=Pe(h.min,h.max,l);n===h&&(m-=a),n.min=Ky(n.min,a,s,m,c),n.max=Ky(n.max,a,s,m,c)}function Zy(n,a,[s,l,c],h,d){VE(n,a[s],a[l],a[c],a.scale,h,d)}const BE=["x","scaleX","originX"],LE=["y","scaleY","originY"];function Qy(n,a,s,l){Zy(n.x,a,BE,s?s.x:void 0,l?l.x:void 0),Zy(n.y,a,LE,s?s.y:void 0,l?l.y:void 0)}function Jy(n){return n.translate===0&&n.scale===1}function Ab(n){return Jy(n.x)&&Jy(n.y)}function Wy(n,a){return n.min===a.min&&n.max===a.max}function UE(n,a){return Wy(n.x,a.x)&&Wy(n.y,a.y)}function Iy(n,a){return Math.round(n.min)===Math.round(a.min)&&Math.round(n.max)===Math.round(a.max)}function kb(n,a){return Iy(n.x,a.x)&&Iy(n.y,a.y)}function ev(n){return St(n.x)/St(n.y)}function tv(n,a){return n.translate===a.translate&&n.scale===a.scale&&n.originPoint===a.originPoint}function gn(n){return[n("x"),n("y")]}function HE(n,a,s){let l="";const c=n.x.translate/a.x,h=n.y.translate/a.y,d=(s==null?void 0:s.z)||0;if((c||h||d)&&(l=`translate3d(${c}px, ${h}px, ${d}px) `),(a.x!==1||a.y!==1)&&(l+=`scale(${1/a.x}, ${1/a.y}) `),s){const{transformPerspective:g,rotate:v,pathRotation:x,rotateX:b,rotateY:E,skewX:w,skewY:N}=s;g&&(l=`perspective(${g}px) ${l}`),v&&(l+=`rotate(${v}deg) `),x&&(l+=`rotate(${x}deg) `),b&&(l+=`rotateX(${b}deg) `),E&&(l+=`rotateY(${E}deg) `),w&&(l+=`skewX(${w}deg) `),N&&(l+=`skewY(${N}deg) `)}const m=n.x.scale*a.x,p=n.y.scale*a.y;return(m!==1||p!==1)&&(l+=`scale(${m}, ${p})`),l||"none"}const qE=kf.length,nv=n=>typeof n=="string"?parseFloat(n):n,rv=n=>typeof n=="number"||ge.test(n);function YE(n,a,s,l,c,h){c?(n.opacity=Pe(0,s.opacity??1,PE(l)),n.opacityExit=Pe(a.opacity??1,0,GE(l))):h&&(n.opacity=Pe(a.opacity??1,s.opacity??1,l));for(let d=0;d<qE;d++){const m=kf[d];let p=av(a,m),g=av(s,m);if(p===void 0&&g===void 0)continue;p||(p=0),g||(g=0),p===0||g===0||rv(p)===rv(g)?(n[m]=Math.max(Pe(nv(p),nv(g),l),0),(xn.test(g)||xn.test(p))&&(n[m]+="%")):n[m]=g}(a.rotate||s.rotate)&&(n.rotate=Pe(a.rotate||0,s.rotate||0,l))}function av(n,a){return n[a]!==void 0?n[a]:n.borderRadius}const PE=Mb(0,.5,wx),GE=Mb(.5,.95,tn);function Mb(n,a,s){return l=>l<n?0:l>a?1:s(Wi(n,a,l))}function FE(n,a,s){const l=gt(n)?n:Ya(n);return l.start(Nf("",l,a,s)),l.animation}function ts(n,a,s,l={passive:!0}){return n.addEventListener(a,s,l),()=>n.removeEventListener(a,s,l)}const XE=(n,a)=>n.depth-a.depth;class $E{constructor(){this.children=[],this.isDirty=!1}add(a){pf(this.children,a),this.isDirty=!0}remove(a){eo(this.children,a),this.isDirty=!0}forEach(a){this.isDirty&&this.children.sort(XE),this.isDirty=!1,this.children.forEach(a)}}function KE(n,a){const s=bt.now(),l=({timestamp:c})=>{const h=c-s;h>=a&&(xr(l),n(h-a))};return Ge.setup(l,!0),()=>xr(l)}function Zl(n){return gt(n)?n.get():n}class ZE{constructor(){this.members=[]}add(a){pf(this.members,a);for(let s=this.members.length-1;s>=0;s--){const l=this.members[s];if(l===a||l===this.lead||l===this.prevLead)continue;const c=l.instance;(!c||c.isConnected===!1)&&!l.snapshot&&(eo(this.members,l),l.unmount())}a.scheduleRender()}remove(a){if(eo(this.members,a),a===this.prevLead&&(this.prevLead=void 0),a===this.lead){const s=this.members[this.members.length-1];s&&this.promote(s)}}relegate(a){var s;for(let l=this.members.indexOf(a)-1;l>=0;l--){const c=this.members[l];if(c.isPresent!==!1&&((s=c.instance)==null?void 0:s.isConnected)!==!1)return this.promote(c),!0}return!1}promote(a,s){var c;const l=this.lead;if(a!==l&&(this.prevLead=l,this.lead=a,a.show(),l)){l.updateSnapshot(),a.scheduleRender();const{layoutDependency:h}=l.options,{layoutDependency:d}=a.options;(h===void 0||h!==d)&&(a.resumeFrom=l,s&&(l.preserveOpacity=!0),l.snapshot&&(a.snapshot=l.snapshot,a.snapshot.latestValues=l.animationValues||l.latestValues),(c=a.root)!=null&&c.isUpdating&&(a.isLayoutDirty=!0)),a.options.crossfade===!1&&l.hide()}}exitAnimationComplete(){this.members.forEach(a=>{var s,l,c,h,d;(l=(s=a.options).onExitComplete)==null||l.call(s),(d=(c=a.resumingFrom)==null?void 0:(h=c.options).onExitComplete)==null||d.call(h)})}scheduleRender(){this.members.forEach(a=>a.instance&&a.scheduleRender(!1))}removeLeadSnapshot(){var a;(a=this.lead)!=null&&a.snapshot&&(this.lead.snapshot=void 0)}}const Ql={hasAnimatedSinceResize:!0,hasEverUpdated:!1},id=["","X","Y","Z"],QE=1e3;let JE=0;function sd(n,a,s,l){const{latestValues:c}=a;c[n]&&(s[n]=c[n],a.setStaticValue(n,0),l&&(l[n]=0))}function Rb(n){if(n.hasCheckedOptimisedAppear=!0,n.root===n)return;const{visualElement:a}=n.options;if(!a)return;const s=eb(a);if(window.MotionHasOptimisedAnimation(s,"transform")){const{layout:c,layoutId:h}=n.options;window.MotionCancelOptimisedAnimation(s,"transform",Ge,!(c||h))}const{parent:l}=n;l&&!l.hasCheckedOptimisedAppear&&Rb(l)}function Ob({attachResizeListener:n,defaultParent:a,measureScroll:s,checkIsScrollRoot:l,resetTransform:c}){return class{constructor(d={},m=a==null?void 0:a()){this.id=JE++,this.animationId=0,this.animationCommitId=0,this.children=new Set,this.options={},this.isTreeAnimating=!1,this.isAnimationBlocked=!1,this.isLayoutDirty=!1,this.isProjectionDirty=!1,this.isSharedProjectionDirty=!1,this.isTransformDirty=!1,this.updateManuallyBlocked=!1,this.updateBlockedByResize=!1,this.isUpdating=!1,this.isSVG=!1,this.needsReset=!1,this.shouldResetTransform=!1,this.hasCheckedOptimisedAppear=!1,this.treeScale={x:1,y:1},this.eventHandlers=new Map,this.hasTreeAnimated=!1,this.layoutVersion=0,this.updateScheduled=!1,this.scheduleUpdate=()=>this.update(),this.projectionUpdateScheduled=!1,this.checkUpdateFailed=()=>{this.isUpdating&&(this.isUpdating=!1,this.clearAllSnapshots())},this.updateProjection=()=>{this.projectionUpdateScheduled=!1,this.nodes.forEach(eT),this.nodes.forEach(sT),this.nodes.forEach(lT),this.nodes.forEach(tT)},this.resolvedRelativeTargetAt=0,this.linkedParentVersion=0,this.hasProjected=!1,this.isVisible=!0,this.animationProgress=0,this.sharedNodes=new Map,this.latestValues=d,this.root=m?m.root||m:this,this.path=m?[...m.path,m]:[],this.parent=m,this.depth=m?m.depth+1:0;for(let p=0;p<this.path.length;p++)this.path[p].shouldResetTransform=!0;this.root===this&&(this.nodes=new $E)}addEventListener(d,m){return this.eventHandlers.has(d)||this.eventHandlers.set(d,new gf),this.eventHandlers.get(d).add(m)}notifyListeners(d,...m){const p=this.eventHandlers.get(d);p&&p.notify(...m)}hasListeners(d){return this.eventHandlers.has(d)}mount(d){if(this.instance)return;this.isSVG=Of(d)&&!eE(d),this.instance=d;const{layoutId:m,layout:p,visualElement:g}=this.options;if(g&&!g.current&&g.mount(d),this.root.nodes.add(this),this.parent&&this.parent.children.add(this),this.root.hasTreeAnimated&&(p||m)&&(this.isLayoutDirty=!0),n){let v,x=0;const b=()=>this.root.updateBlockedByResize=!1;Ge.read(()=>{x=window.innerWidth}),n(d,()=>{const E=window.innerWidth;E!==x&&(x=E,this.root.updateBlockedByResize=!0,v&&v(),v=KE(b,250),Ql.hasAnimatedSinceResize&&(Ql.hasAnimatedSinceResize=!1,this.nodes.forEach(lv)))})}m&&this.root.registerSharedNode(m,this),this.options.animate!==!1&&g&&(m||p)&&this.addEventListener("didUpdate",({delta:v,hasLayoutChanged:x,hasRelativeLayoutChanged:b,layout:E})=>{if(this.isTreeAnimationBlocked()){this.target=void 0,this.relativeTarget=void 0;return}const w=this.options.transition||g.getDefaultTransition()||fT,{onLayoutAnimationStart:N,onLayoutAnimationComplete:C}=g.getProps(),A=!this.targetLayout||!kb(this.targetLayout,E),k=!x&&b;if(this.options.layoutRoot||this.resumeFrom||k||x&&(A||!this.currentAnimation)){this.resumeFrom&&(this.resumingFrom=this.resumeFrom,this.resumingFrom.resumingFrom=void 0);const V={...Cf(w,"layout"),onPlay:N,onComplete:C};(g.shouldReduceMotion||this.options.layoutRoot)&&(V.delay=0,V.type=!1),this.startAnimation(V),this.setAnimationOrigin(v,k,V.path)}else x||lv(this),this.isLead()&&this.options.onExitComplete&&this.options.onExitComplete();this.targetLayout=E})}unmount(){this.options.layoutId&&this.willUpdate(),this.root.nodes.remove(this);const d=this.getStack();d&&d.remove(this),this.parent&&this.parent.children.delete(this),this.instance=void 0,this.eventHandlers.clear(),xr(this.updateProjection)}blockUpdate(){this.updateManuallyBlocked=!0}unblockUpdate(){this.updateManuallyBlocked=!1}isUpdateBlocked(){return this.updateManuallyBlocked||this.updateBlockedByResize}isTreeAnimationBlocked(){return this.isAnimationBlocked||this.parent&&this.parent.isTreeAnimationBlocked()||!1}startUpdate(){this.isUpdateBlocked()||(this.isUpdating=!0,this.nodes&&this.nodes.forEach(oT),this.animationId++)}getTransformTemplate(){const{visualElement:d}=this.options;return d&&d.getProps().transformTemplate}willUpdate(d=!0){if(this.root.hasTreeAnimated=!0,this.root.isUpdateBlocked()){this.options.onExitComplete&&this.options.onExitComplete();return}if(window.MotionCancelOptimisedAnimation&&!this.hasCheckedOptimisedAppear&&Rb(this),!this.root.isUpdating&&this.root.startUpdate(),this.isLayoutDirty)return;this.isLayoutDirty=!0;for(let v=0;v<this.path.length;v++){const x=this.path[v];x.shouldResetTransform=!0,(typeof x.latestValues.x=="string"||typeof x.latestValues.y=="string")&&(x.isLayoutDirty=!0),x.updateScroll("snapshot"),x.options.layoutRoot&&x.willUpdate(!1)}const{layoutId:m,layout:p}=this.options;if(m===void 0&&!p)return;const g=this.getTransformTemplate();this.prevTransformTemplateValue=g?g(this.latestValues,""):void 0,this.updateSnapshot(),d&&this.notifyListeners("willUpdate")}update(){if(this.updateScheduled=!1,this.isUpdateBlocked()){const p=this.updateBlockedByResize;this.unblockUpdate(),this.updateBlockedByResize=!1,this.clearAllSnapshots(),p&&this.nodes.forEach(rT),this.nodes.forEach(iv);return}if(this.animationId<=this.animationCommitId){this.nodes.forEach(sv);return}this.animationCommitId=this.animationId,this.isUpdating?(this.isUpdating=!1,this.nodes.forEach(aT),this.nodes.forEach(iT),this.nodes.forEach(WE),this.nodes.forEach(IE)):this.nodes.forEach(sv),this.clearAllSnapshots();const m=bt.now();pt.delta=bn(0,1e3/60,m-pt.timestamp),pt.timestamp=m,pt.isProcessing=!0,Ju.update.process(pt),Ju.preRender.process(pt),Ju.render.process(pt),pt.isProcessing=!1}didUpdate(){this.updateScheduled||(this.updateScheduled=!0,Mf.read(this.scheduleUpdate))}clearAllSnapshots(){this.nodes.forEach(nT),this.sharedNodes.forEach(cT)}scheduleUpdateProjection(){this.projectionUpdateScheduled||(this.projectionUpdateScheduled=!0,Ge.preRender(this.updateProjection,!1,!0))}scheduleCheckAfterUnmount(){Ge.postRender(()=>{this.isLayoutDirty?this.root.didUpdate():this.root.checkUpdateFailed()})}updateSnapshot(){this.snapshot||!this.instance||(this.snapshot=this.measure(),this.snapshot&&!St(this.snapshot.measuredBox.x)&&!St(this.snapshot.measuredBox.y)&&(this.snapshot=void 0))}updateLayout(){if(!this.instance||(this.updateScroll(),!(this.options.alwaysMeasureLayout&&this.isLead())&&!this.isLayoutDirty))return;if(this.resumeFrom&&!this.resumeFrom.instance)for(let p=0;p<this.path.length;p++)this.path[p].updateScroll();const d=this.layout;this.layout=this.measure(!1),this.layoutVersion++,this.layoutCorrected||(this.layoutCorrected=st()),this.isLayoutDirty=!1,this.projectionDelta=void 0,this.notifyListeners("measure",this.layout.layoutBox);const{visualElement:m}=this.options;m&&m.notify("LayoutMeasure",this.layout.layoutBox,d?d.layoutBox:void 0)}updateScroll(d="measure"){let m=!!(this.options.layoutScroll&&this.instance);if(this.scroll&&this.scroll.animationId===this.root.animationId&&this.scroll.phase===d&&(m=!1),m&&this.instance){const p=l(this.instance);this.scroll={animationId:this.root.animationId,phase:d,isRoot:p,offset:s(this.instance),wasRoot:this.scroll?this.scroll.isRoot:p}}}resetTransform(){if(!c)return;const d=this.isLayoutDirty||this.shouldResetTransform||this.options.alwaysMeasureLayout,m=this.projectionDelta&&!Ab(this.projectionDelta),p=this.getTransformTemplate(),g=p?p(this.latestValues,""):void 0,v=g!==this.prevTransformTemplateValue;d&&this.instance&&(m||qr(this.latestValues)||v)&&(c(this.instance,g),this.shouldResetTransform=!1,this.scheduleRender())}measure(d=!0){const m=this.measurePageBox();let p=this.removeElementScroll(m);return d&&(p=this.removeTransform(p)),hT(p),{animationId:this.root.animationId,measuredBox:m,layoutBox:p,latestValues:{},source:this.id}}measurePageBox(){var g;const{visualElement:d}=this.options;if(!d)return st();const m=d.measureViewportBox();if(!(((g=this.scroll)==null?void 0:g.wasRoot)||this.path.some(mT))){const{scroll:v}=this.root;v&&(yn(m.x,v.offset.x),yn(m.y,v.offset.y))}return m}removeElementScroll(d){var p;const m=st();if(ln(m,d),(p=this.scroll)!=null&&p.wasRoot)return m;for(let g=0;g<this.path.length;g++){const v=this.path[g],{scroll:x,options:b}=v;v!==this.root&&x&&b.layoutScroll&&(x.wasRoot&&ln(m,d),yn(m.x,x.offset.x),yn(m.y,x.offset.y))}return m}applyTransform(d,m=!1,p){var v,x;const g=p||st();ln(g,d);for(let b=0;b<this.path.length;b++){const E=this.path[b];!m&&E.options.layoutScroll&&E.scroll&&E!==E.root&&(yn(g.x,-E.scroll.offset.x),yn(g.y,-E.scroll.offset.y)),qr(E.latestValues)&&Kl(g,E.latestValues,(v=E.layout)==null?void 0:v.layoutBox)}return qr(this.latestValues)&&Kl(g,this.latestValues,(x=this.layout)==null?void 0:x.layoutBox),g}removeTransform(d){var p;const m=st();ln(m,d);for(let g=0;g<this.path.length;g++){const v=this.path[g];if(!qr(v.latestValues))continue;let x;v.instance&&(Yd(v.latestValues)&&v.updateSnapshot(),x=st(),ln(x,v.measurePageBox())),Qy(m,v.latestValues,(p=v.snapshot)==null?void 0:p.layoutBox,x)}return qr(this.latestValues)&&Qy(m,this.latestValues),m}setTargetDelta(d){this.targetDelta=d,this.root.scheduleUpdateProjection(),this.isProjectionDirty=!0}setOptions(d){this.options={...this.options,...d,crossfade:d.crossfade!==void 0?d.crossfade:!0}}clearMeasurements(){this.scroll=void 0,this.layout=void 0,this.snapshot=void 0,this.prevTransformTemplateValue=void 0,this.targetDelta=void 0,this.target=void 0,this.isLayoutDirty=!1}forceRelativeParentToResolveTarget(){this.relativeParent&&this.relativeParent.resolvedRelativeTargetAt!==pt.timestamp&&this.relativeParent.resolveTargetDelta(!0)}resolveTargetDelta(d=!1){var E;const m=this.getLead();this.isProjectionDirty||(this.isProjectionDirty=m.isProjectionDirty),this.isTransformDirty||(this.isTransformDirty=m.isTransformDirty),this.isSharedProjectionDirty||(this.isSharedProjectionDirty=m.isSharedProjectionDirty);const p=!!this.resumingFrom||this!==m;if(!(d||p&&this.isSharedProjectionDirty||this.isProjectionDirty||(E=this.parent)!=null&&E.isProjectionDirty||this.attemptToResolveRelativeTarget||this.root.updateBlockedByResize))return;const{layout:v,layoutId:x}=this.options;if(!this.layout||!(v||x))return;this.resolvedRelativeTargetAt=pt.timestamp;const b=this.getClosestProjectingParent();b&&this.linkedParentVersion!==b.layoutVersion&&!b.options.layoutRoot&&this.removeRelativeTarget(),!this.targetDelta&&!this.relativeTarget&&(this.options.layoutAnchor!==!1&&b&&b.layout?this.createRelativeTarget(b,this.layout.layoutBox,b.layout.layoutBox):this.removeRelativeTarget()),!(!this.relativeTarget&&!this.targetDelta)&&(this.target||(this.target=st(),this.targetWithTransforms=st()),this.relativeTarget&&this.relativeTargetOrigin&&this.relativeParent&&this.relativeParent.target?(this.forceRelativeParentToResolveTarget(),_E(this.target,this.relativeTarget,this.relativeParent.target,this.options.layoutAnchor||void 0)):this.targetDelta?(this.resumingFrom?this.applyTransform(this.layout.layoutBox,!1,this.target):ln(this.target,this.layout.layoutBox),yb(this.target,this.targetDelta)):ln(this.target,this.layout.layoutBox),this.attemptToResolveRelativeTarget&&(this.attemptToResolveRelativeTarget=!1,this.options.layoutAnchor!==!1&&b&&!!b.resumingFrom==!!this.resumingFrom&&!b.options.layoutScroll&&b.target&&this.animationProgress!==1?this.createRelativeTarget(b,this.target,b.target):this.relativeParent=this.relativeTarget=void 0))}getClosestProjectingParent(){if(!(!this.parent||Yd(this.parent.latestValues)||gb(this.parent.latestValues)))return this.parent.isProjecting()?this.parent:this.parent.getClosestProjectingParent()}isProjecting(){return!!((this.relativeTarget||this.targetDelta||this.options.layoutRoot)&&this.layout)}createRelativeTarget(d,m,p){this.relativeParent=d,this.linkedParentVersion=d.layoutVersion,this.forceRelativeParentToResolveTarget(),this.relativeTarget=st(),this.relativeTargetOrigin=st(),co(this.relativeTargetOrigin,m,p,this.options.layoutAnchor||void 0),ln(this.relativeTarget,this.relativeTargetOrigin)}removeRelativeTarget(){this.relativeParent=this.relativeTarget=void 0}calcProjection(){var w;const d=this.getLead(),m=!!this.resumingFrom||this!==d;let p=!0;if((this.isProjectionDirty||(w=this.parent)!=null&&w.isProjectionDirty)&&(p=!1),m&&(this.isSharedProjectionDirty||this.isTransformDirty)&&(p=!1),this.resolvedRelativeTargetAt===pt.timestamp&&(p=!1),p)return;const{layout:g,layoutId:v}=this.options;if(this.isTreeAnimating=!!(this.parent&&this.parent.isTreeAnimating||this.currentAnimation||this.pendingAnimation),this.isTreeAnimating||(this.targetDelta=this.relativeTarget=void 0),!this.layout||!(g||v))return;ln(this.layoutCorrected,this.layout.layoutBox);const x=this.treeScale.x,b=this.treeScale.y;uE(this.layoutCorrected,this.treeScale,this.path,m),d.layout&&!d.target&&(this.treeScale.x!==1||this.treeScale.y!==1)&&(d.target=d.layout.layoutBox,d.targetWithTransforms=st());const{target:E}=d;if(!E){this.prevProjectionDelta&&(this.createProjectionDeltas(),this.scheduleRender());return}!this.projectionDelta||!this.prevProjectionDelta?this.createProjectionDeltas():(Gy(this.prevProjectionDelta.x,this.projectionDelta.x),Gy(this.prevProjectionDelta.y,this.projectionDelta.y)),Zi(this.projectionDelta,this.layoutCorrected,E,this.latestValues),(this.treeScale.x!==x||this.treeScale.y!==b||!tv(this.projectionDelta.x,this.prevProjectionDelta.x)||!tv(this.projectionDelta.y,this.prevProjectionDelta.y))&&(this.hasProjected=!0,this.scheduleRender(),this.notifyListeners("projectionUpdate",E))}hide(){this.isVisible=!1}show(){this.isVisible=!0}scheduleRender(d=!0){var m;if((m=this.options.visualElement)==null||m.scheduleRender(),d){const p=this.getStack();p&&p.scheduleRender()}this.resumingFrom&&!this.resumingFrom.instance&&(this.resumingFrom=void 0)}createProjectionDeltas(){this.prevProjectionDelta=Ua(),this.projectionDelta=Ua(),this.projectionDeltaWithTransform=Ua()}setAnimationOrigin(d,m=!1,p){const g=this.snapshot,v=g?g.latestValues:{},x={...this.latestValues},b=Ua();(!this.relativeParent||!this.relativeParent.options.layoutRoot)&&(this.relativeTarget=this.relativeTargetOrigin=void 0),this.attemptToResolveRelativeTarget=!m;const E=st(),w=g?g.source:void 0,N=this.layout?this.layout.source:void 0,C=w!==N,A=this.getStack(),k=!A||A.members.length<=1,V=!!(C&&!k&&this.options.crossfade===!0&&!this.path.some(dT));this.animationProgress=0;let z;const L=p==null?void 0:p.interpolateProjection(d);this.mixTargetDelta=U=>{const D=U/1e3,q=L==null?void 0:L(D);q?(b.x.translate=q.x,b.x.scale=Pe(d.x.scale,1,D),b.x.origin=d.x.origin,b.x.originPoint=d.x.originPoint,b.y.translate=q.y,b.y.scale=Pe(d.y.scale,1,D),b.y.origin=d.y.origin,b.y.originPoint=d.y.originPoint):(ov(b.x,d.x,D),ov(b.y,d.y,D)),this.setTargetDelta(b),this.relativeTarget&&this.relativeTargetOrigin&&this.layout&&this.relativeParent&&this.relativeParent.layout&&(co(E,this.layout.layoutBox,this.relativeParent.layout.layoutBox,this.options.layoutAnchor||void 0),uT(this.relativeTarget,this.relativeTargetOrigin,E,D),z&&UE(this.relativeTarget,z)&&(this.isProjectionDirty=!1),z||(z=st()),ln(z,this.relativeTarget)),C&&(this.animationValues=x,YE(x,v,this.latestValues,D,V,k)),q&&q.rotate!==void 0&&(this.animationValues||(this.animationValues=x),this.animationValues.pathRotation=q.rotate),this.root.scheduleUpdateProjection(),this.scheduleRender(),this.animationProgress=D},this.mixTargetDelta(this.options.layoutRoot?1e3:0)}startAnimation(d){var m,p,g;this.notifyListeners("animationStart"),(m=this.currentAnimation)==null||m.stop(),(g=(p=this.resumingFrom)==null?void 0:p.currentAnimation)==null||g.stop(),this.pendingAnimation&&(xr(this.pendingAnimation),this.pendingAnimation=void 0),this.pendingAnimation=Ge.update(()=>{Ql.hasAnimatedSinceResize=!0,this.motionValue||(this.motionValue=Ya(0)),this.motionValue.jump(0,!1),this.currentAnimation=FE(this.motionValue,[0,1e3],{...d,velocity:0,isSync:!0,onUpdate:v=>{this.mixTargetDelta(v),d.onUpdate&&d.onUpdate(v)},onComplete:()=>{d.onComplete&&d.onComplete(),this.completeAnimation()}}),this.resumingFrom&&(this.resumingFrom.currentAnimation=this.currentAnimation),this.pendingAnimation=void 0})}completeAnimation(){this.resumingFrom&&(this.resumingFrom.currentAnimation=void 0,this.resumingFrom.preserveOpacity=void 0);const d=this.getStack();d&&d.exitAnimationComplete(),this.resumingFrom=this.currentAnimation=this.animationValues=void 0,this.notifyListeners("animationComplete")}finishAnimation(){this.currentAnimation&&(this.mixTargetDelta&&this.mixTargetDelta(QE),this.currentAnimation.stop()),this.completeAnimation()}applyTransformsToTarget(){const d=this.getLead();let{targetWithTransforms:m,target:p,layout:g,latestValues:v}=d;if(!(!m||!p||!g)){if(this!==d&&this.layout&&g&&zb(this.options.animationType,this.layout.layoutBox,g.layoutBox)){p=this.target||st();const x=St(this.layout.layoutBox.x);p.x.min=d.target.x.min,p.x.max=p.x.min+x;const b=St(this.layout.layoutBox.y);p.y.min=d.target.y.min,p.y.max=p.y.min+b}ln(m,p),Kl(m,v),Zi(this.projectionDeltaWithTransform,this.layoutCorrected,m,v)}}registerSharedNode(d,m){this.sharedNodes.has(d)||this.sharedNodes.set(d,new ZE),this.sharedNodes.get(d).add(m);const g=m.options.initialPromotionConfig;m.promote({transition:g?g.transition:void 0,preserveFollowOpacity:g&&g.shouldPreserveFollowOpacity?g.shouldPreserveFollowOpacity(m):void 0})}isLead(){const d=this.getStack();return d?d.lead===this:!0}getLead(){var m;const{layoutId:d}=this.options;return d?((m=this.getStack())==null?void 0:m.lead)||this:this}getPrevLead(){var m;const{layoutId:d}=this.options;return d?(m=this.getStack())==null?void 0:m.prevLead:void 0}getStack(){const{layoutId:d}=this.options;if(d)return this.root.sharedNodes.get(d)}promote({needsReset:d,transition:m,preserveFollowOpacity:p}={}){const g=this.getStack();g&&g.promote(this,p),d&&(this.projectionDelta=void 0,this.needsReset=!0),m&&this.setOptions({transition:m})}relegate(){const d=this.getStack();return d?d.relegate(this):!1}resetSkewAndRotation(){const{visualElement:d}=this.options;if(!d)return;let m=!1;const{latestValues:p}=d;if((p.z||p.rotate||p.rotateX||p.rotateY||p.rotateZ||p.skewX||p.skewY)&&(m=!0),!m)return;const g={};p.z&&sd("z",d,g,this.animationValues);for(let v=0;v<id.length;v++)sd(`rotate${id[v]}`,d,g,this.animationValues),sd(`skew${id[v]}`,d,g,this.animationValues);d.render();for(const v in g)d.setStaticValue(v,g[v]),this.animationValues&&(this.animationValues[v]=g[v]);d.scheduleRender()}applyProjectionStyles(d,m){if(!this.instance||this.isSVG)return;if(!this.isVisible){d.visibility="hidden";return}const p=this.getTransformTemplate();if(this.needsReset){this.needsReset=!1,d.visibility="",d.opacity="",d.pointerEvents=Zl(m==null?void 0:m.pointerEvents)||"",d.transform=p?p(this.latestValues,""):"none";return}const g=this.getLead();if(!this.projectionDelta||!this.layout||!g.target){this.options.layoutId&&(d.opacity=this.latestValues.opacity!==void 0?this.latestValues.opacity:1,d.pointerEvents=Zl(m==null?void 0:m.pointerEvents)||""),this.hasProjected&&!qr(this.latestValues)&&(d.transform=p?p({},""):"none",this.hasProjected=!1);return}d.visibility="";const v=g.animationValues||g.latestValues;this.applyTransformsToTarget();let x=HE(this.projectionDeltaWithTransform,this.treeScale,v);p&&(x=p(v,x)),d.transform=x;const{x:b,y:E}=this.projectionDelta;d.transformOrigin=`${b.origin*100}% ${E.origin*100}% 0`,g.animationValues?d.opacity=g===this?v.opacity??this.latestValues.opacity??1:this.preserveOpacity?this.latestValues.opacity:v.opacityExit:d.opacity=g===this?v.opacity!==void 0?v.opacity:"":v.opacityExit!==void 0?v.opacityExit:0;for(const w in Gd){if(v[w]===void 0)continue;const{correct:N,applyTo:C,isCSSVariable:A}=Gd[w],k=x==="none"?v[w]:N(v[w],g);if(C){const V=C.length;for(let z=0;z<V;z++)d[C[z]]=k}else A?this.options.visualElement.renderState.vars[w]=k:d[w]=k}this.options.layoutId&&(d.pointerEvents=g===this?Zl(m==null?void 0:m.pointerEvents)||"":"none")}clearSnapshot(){this.resumeFrom=this.snapshot=void 0}resetTree(){this.root.nodes.forEach(d=>{var m;return(m=d.currentAnimation)==null?void 0:m.stop()}),this.root.nodes.forEach(iv),this.root.sharedNodes.clear()}}}function WE(n){n.updateLayout()}function IE(n){var s;const a=((s=n.resumeFrom)==null?void 0:s.snapshot)||n.snapshot;if(n.isLead()&&n.layout&&a&&n.hasListeners("didUpdate")){const{layoutBox:l,measuredBox:c}=n.layout,{animationType:h}=n.options,d=a.source!==n.layout.source;if(h==="size")gn(x=>{const b=d?a.measuredBox[x]:a.layoutBox[x],E=St(b);b.min=l[x].min,b.max=b.min+E});else if(h==="x"||h==="y"){const x=h==="x"?"y":"x";Fd(d?a.measuredBox[x]:a.layoutBox[x],l[x])}else zb(h,a.layoutBox,l)&&gn(x=>{const b=d?a.measuredBox[x]:a.layoutBox[x],E=St(l[x]);b.max=b.min+E,n.relativeTarget&&!n.currentAnimation&&(n.isProjectionDirty=!0,n.relativeTarget[x].max=n.relativeTarget[x].min+E)});const m=Ua();Zi(m,l,a.layoutBox);const p=Ua();d?Zi(p,n.applyTransform(c,!0),a.measuredBox):Zi(p,l,a.layoutBox);const g=!Ab(m);let v=!1;if(!n.resumeFrom){const x=n.getClosestProjectingParent();if(x&&!x.resumeFrom){const{snapshot:b,layout:E}=x;if(b&&E){const w=n.options.layoutAnchor||void 0,N=st();co(N,a.layoutBox,b.layoutBox,w);const C=st();co(C,l,E.layoutBox,w),kb(N,C)||(v=!0),x.options.layoutRoot&&(n.relativeTarget=C,n.relativeTargetOrigin=N,n.relativeParent=x)}}}n.notifyListeners("didUpdate",{layout:l,snapshot:a,delta:p,layoutDelta:m,hasLayoutChanged:g,hasRelativeLayoutChanged:v})}else if(n.isLead()){const{onExitComplete:l}=n.options;l&&l()}n.options.transition=void 0}function eT(n){n.parent&&(n.isProjecting()||(n.isProjectionDirty=n.parent.isProjectionDirty),n.isSharedProjectionDirty||(n.isSharedProjectionDirty=!!(n.isProjectionDirty||n.parent.isProjectionDirty||n.parent.isSharedProjectionDirty)),n.isTransformDirty||(n.isTransformDirty=n.parent.isTransformDirty))}function tT(n){n.isProjectionDirty=n.isSharedProjectionDirty=n.isTransformDirty=!1}function nT(n){n.clearSnapshot()}function iv(n){n.clearMeasurements()}function rT(n){n.isLayoutDirty=!0,n.updateLayout()}function sv(n){n.isLayoutDirty=!1}function aT(n){n.isAnimationBlocked&&n.layout&&!n.isLayoutDirty&&(n.snapshot=n.layout,n.isLayoutDirty=!0)}function iT(n){const{visualElement:a}=n.options;a&&a.getProps().onBeforeLayoutMeasure&&a.notify("BeforeLayoutMeasure"),n.resetTransform()}function lv(n){n.finishAnimation(),n.targetDelta=n.relativeTarget=n.target=void 0,n.isProjectionDirty=!0}function sT(n){n.resolveTargetDelta()}function lT(n){n.calcProjection()}function oT(n){n.resetSkewAndRotation()}function cT(n){n.removeLeadSnapshot()}function ov(n,a,s){n.translate=Pe(a.translate,0,s),n.scale=Pe(a.scale,1,s),n.origin=a.origin,n.originPoint=a.originPoint}function cv(n,a,s,l){n.min=Pe(a.min,s.min,l),n.max=Pe(a.max,s.max,l)}function uT(n,a,s,l){cv(n.x,a.x,s.x,l),cv(n.y,a.y,s.y,l)}function dT(n){return n.animationValues&&n.animationValues.opacityExit!==void 0}const fT={duration:.45,ease:[.4,0,.1,1]},uv=n=>typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().includes(n),dv=uv("applewebkit/")&&!uv("chrome/")?Math.round:tn;function fv(n){n.min=dv(n.min),n.max=dv(n.max)}function hT(n){fv(n.x),fv(n.y)}function zb(n,a,s){return n==="position"||n==="preserve-aspect"&&!zE(ev(a),ev(s),.2)}function mT(n){var a;return n!==n.root&&((a=n.scroll)==null?void 0:a.wasRoot)}const pT=Ob({attachResizeListener:(n,a)=>ts(n,"resize",a),measureScroll:()=>{var n,a;return{x:document.documentElement.scrollLeft||((n=document.body)==null?void 0:n.scrollLeft)||0,y:document.documentElement.scrollTop||((a=document.body)==null?void 0:a.scrollTop)||0}},checkIsScrollRoot:()=>!0}),ld={current:void 0},_b=Ob({measureScroll:n=>({x:n.scrollLeft,y:n.scrollTop}),defaultParent:()=>{if(!ld.current){const n=new pT({});n.mount(window),n.setOptions({layoutScroll:!0}),ld.current=n}return ld.current},resetTransform:(n,a)=>{n.style.transform=a!==void 0?a:"none"},checkIsScrollRoot:n=>window.getComputedStyle(n).position==="fixed"}),Uf=S.createContext({transformPagePoint:n=>n,isStatic:!1,reducedMotion:"never"});function hv(n,a){if(typeof n=="function")return n(a);n!=null&&(n.current=a)}function gT(...n){return a=>{let s=!1;const l=n.map(c=>{const h=hv(c,a);return!s&&typeof h=="function"&&(s=!0),h});if(s)return()=>{for(let c=0;c<l.length;c++){const h=l[c];typeof h=="function"?h():hv(n[c],null)}}}}function yT(...n){return S.useCallback(gT(...n),n)}class vT extends S.Component{getSnapshotBeforeUpdate(a){const s=this.props.childRef.current;if(Gl(s)&&a.isPresent&&!this.props.isPresent&&this.props.pop!==!1){const l=s.offsetParent,c=Gl(l)&&l.offsetWidth||0,h=Gl(l)&&l.offsetHeight||0,d=getComputedStyle(s),m=this.props.sizeRef.current;m.height=parseFloat(d.height),m.width=parseFloat(d.width),m.top=s.offsetTop,m.left=s.offsetLeft,m.right=c-m.width-m.left,m.bottom=h-m.height-m.top,m.direction=d.direction}return null}componentDidUpdate(){}render(){return this.props.children}}function xT({children:n,isPresent:a,anchorX:s,anchorY:l,root:c,pop:h}){var b;const d=S.useId(),m=S.useRef(null),p=S.useRef({width:0,height:0,top:0,left:0,right:0,bottom:0,direction:"ltr"}),{nonce:g}=S.useContext(Uf),v=h!==!1?((b=n.props)==null?void 0:b.ref)??(n==null?void 0:n.ref):void 0,x=yT(m,v);return S.useInsertionEffect(()=>{const{width:E,height:w,top:N,left:C,right:A,bottom:k,direction:V}=p.current;if(a||h===!1||!m.current||!E||!w)return;const z=V==="rtl",L=s==="left"?z?`right: ${A}`:`left: ${C}`:z?`left: ${C}`:`right: ${A}`,U=l==="bottom"?`bottom: ${k}`:`top: ${N}`;m.current.dataset.motionPopId=d;const D=document.createElement("style");g&&(D.nonce=g);const q=c??document.head;return q.appendChild(D),D.sheet&&D.sheet.insertRule(`
          [data-motion-pop-id="${d}"] {
            position: absolute !important;
            width: ${E}px !important;
            height: ${w}px !important;
            ${L}px !important;
            ${U}px !important;
          }
        `),()=>{var M;(M=m.current)==null||M.removeAttribute("data-motion-pop-id"),q.contains(D)&&q.removeChild(D)}},[a]),o.jsx(vT,{isPresent:a,childRef:m,sizeRef:p,pop:h,children:h===!1?n:S.cloneElement(n,{ref:x})})}const bT=({children:n,initial:a,isPresent:s,onExitComplete:l,custom:c,presenceAffectsLayout:h,mode:d,anchorX:m,anchorY:p,root:g})=>{const v=hf(ST),x=S.useId(),b=S.useRef(s),E=S.useRef(l);mf(()=>{b.current=s,E.current=l});let w=!0,N=S.useMemo(()=>(w=!1,{id:x,initial:a,isPresent:s,custom:c,onExitComplete:C=>{v.set(C,!0);for(const A of v.values())if(!A)return;l&&l()},register:C=>(v.set(C,!1),()=>{var A;v.delete(C),!b.current&&!v.size&&((A=E.current)==null||A.call(E))})}),[s,v,l]);return h&&w&&(N={...N}),S.useMemo(()=>{v.forEach((C,A)=>v.set(A,!1))},[s]),S.useEffect(()=>{!s&&!v.size&&l&&l()},[s]),n=o.jsx(xT,{pop:d==="popLayout",isPresent:s,anchorX:m,anchorY:p,root:g,children:n}),o.jsx(jo.Provider,{value:N,children:n})};function ST(){return new Map}function Vb(n=!0){const a=S.useContext(jo);if(a===null)return[!0,null];const{isPresent:s,onExitComplete:l,register:c}=a,h=S.useId();S.useEffect(()=>{if(n)return c(h)},[n]);const d=S.useCallback(()=>n&&l&&l(h),[h,l,n]);return!s&&l?[!1,d]:[!0]}const Ml=n=>n.key||"";function mv(n){const a=[];return S.Children.forEach(n,s=>{S.isValidElement(s)&&a.push(s)}),a}const jT=({children:n,custom:a,initial:s=!0,onExitComplete:l,presenceAffectsLayout:c=!0,mode:h="sync",propagate:d=!1,anchorX:m="left",anchorY:p="top",root:g})=>{const[v,x]=Vb(d),b=S.useMemo(()=>mv(n),[n]),E=d&&!v?[]:b.map(Ml),w=S.useRef(!0),N=S.useRef(b),C=hf(()=>new Map),A=S.useRef(new Set),[k,V]=S.useState(b),[z,L]=S.useState(b);mf(()=>{w.current=!1,N.current=b;for(let q=0;q<z.length;q++){const M=Ml(z[q]);E.includes(M)?(C.delete(M),A.current.delete(M)):C.get(M)!==!0&&C.set(M,!1)}},[z,E.length,E.join("-")]);const U=[];if(b!==k){let q=[...b];for(let M=0;M<z.length;M++){const O=z[M],$=Ml(O);E.includes($)||(q.splice(M,0,O),U.push(O))}return h==="wait"&&U.length&&(q=U),L(mv(q)),V(b),null}const{forceRender:D}=S.useContext(ff);return o.jsx(o.Fragment,{children:z.map(q=>{const M=Ml(q),O=d&&!v?!1:b===z||E.includes(M),$=()=>{if(A.current.has(M))return;if(C.has(M))A.current.add(M),C.set(M,!0);else return;let Z=!0;C.forEach(oe=>{oe||(Z=!1)}),Z&&(D==null||D(),L(N.current),d&&(x==null||x()),l&&l())};return o.jsx(bT,{isPresent:O,initial:!w.current||s?void 0:!1,custom:a,presenceAffectsLayout:c,mode:h,root:g,onExitComplete:O?void 0:$,anchorX:m,anchorY:p,children:q},M)})})},Bb=S.createContext({strict:!1}),pv={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]};let gv=!1;function wT(){if(gv)return;const n={};for(const a in pv)n[a]={isEnabled:s=>pv[a].some(l=>!!s[l])};hb(n),gv=!0}function Lb(){return wT(),sE()}function ET(n){const a=Lb();for(const s in n)a[s]={...a[s],...n[s]};hb(a)}const TT=new Set(["animate","exit","variants","initial","style","values","variants","transition","transformTemplate","custom","inherit","onBeforeLayoutMeasure","onAnimationStart","onAnimationComplete","onUpdate","onDragStart","onDrag","onDragEnd","onMeasureDragConstraints","onDirectionLock","onDragTransitionEnd","_dragX","_dragY","onHoverStart","onHoverEnd","onViewportEnter","onViewportLeave","globalTapTarget","propagate","ignoreStrict","viewport"]);function uo(n){return n.startsWith("while")||n.startsWith("drag")&&n!=="draggable"||n.startsWith("layout")||n.startsWith("onTap")||n.startsWith("onPan")||n.startsWith("onLayout")||TT.has(n)}let Ub=n=>!uo(n);function CT(n){typeof n=="function"&&(Ub=a=>a.startsWith("on")?!uo(a):n(a))}try{CT(require("@emotion/is-prop-valid").default)}catch{}function NT(n,a,s){const l={};for(const c in n)c==="values"&&typeof n.values=="object"||gt(n[c])||(Ub(c)||s===!0&&uo(c)||!a&&!uo(c)||n.draggable&&c.startsWith("onDrag"))&&(l[c]=n[c]);return l}const No=S.createContext({});function DT(n,a){if(Co(n)){const{initial:s,animate:l}=n;return{initial:s===!1||es(s)?s:void 0,animate:es(l)?l:void 0}}return n.inherit!==!1?a:{}}function AT(n){const{initial:a,animate:s}=DT(n,S.useContext(No));return S.useMemo(()=>({initial:a,animate:s}),[yv(a),yv(s)])}function yv(n){return Array.isArray(n)?n.join(" "):n}const Hf=()=>({style:{},transform:{},transformOrigin:{},vars:{}});function Hb(n,a,s){for(const l in a)!gt(a[l])&&!bb(l,s)&&(n[l]=a[l])}function kT({transformTemplate:n},a){return S.useMemo(()=>{const s=Hf();return Bf(s,a,n),Object.assign({},s.vars,s.style)},[a])}function MT(n,a){const s=n.style||{},l={};return Hb(l,s,n),Object.assign(l,kT(n,a)),l}function RT(n,a){const s={},l=MT(n,a);return n.drag&&n.dragListener!==!1&&(s.draggable=!1,l.userSelect=l.WebkitUserSelect=l.WebkitTouchCallout="none",l.touchAction=n.drag===!0?"none":`pan-${n.drag==="x"?"y":"x"}`),n.tabIndex===void 0&&(n.onTap||n.onTapStart||n.whileTap)&&(s.tabIndex=0),s.style=l,s}const qb=()=>({...Hf(),attrs:{}});function OT(n,a,s,l){const c=S.useMemo(()=>{const h=qb();return Sb(h,a,wb(l),n.transformTemplate,n.style),{...h.attrs,style:{...h.style}}},[a]);if(n.style){const h={};Hb(h,n.style,n),c.style={...h,...c.style}}return c}const zT=["animate","circle","defs","desc","ellipse","g","image","line","filter","marker","mask","metadata","path","pattern","polygon","polyline","rect","stop","switch","symbol","svg","text","tspan","use","view"];function qf(n){return typeof n!="string"||n.includes("-")?!1:!!(zT.indexOf(n)>-1||/[A-Z]/u.test(n))}function _T(n,a,s,{latestValues:l},c,h=!1,d){const p=(d??qf(n)?OT:RT)(a,l,c,n),g=NT(a,typeof n=="string",h),v=n!==S.Fragment?{...g,...p,ref:s}:{},{children:x}=a,b=S.useMemo(()=>gt(x)?x.get():x,[x]);return S.createElement(n,{...v,children:b})}function VT({scrapeMotionValuesFromProps:n,createRenderState:a},s,l,c){return{latestValues:BT(s,l,c,n),renderState:a()}}function BT(n,a,s,l){const c={},h=l(n,{});for(const b in h)c[b]=Zl(h[b]);let{initial:d,animate:m}=n;const p=Co(n),g=db(n);a&&g&&!p&&n.inherit!==!1&&(d===void 0&&(d=a.initial),m===void 0&&(m=a.animate));let v=s?s.initial===!1:!1;v=v||d===!1;const x=v?m:d;if(x&&typeof x!="boolean"&&!To(x)){const b=Array.isArray(x)?x:[x];for(let E=0;E<b.length;E++){const w=Df(n,b[E]);if(w){const{transitionEnd:N,transition:C,...A}=w;for(const k in A){let V=A[k];if(Array.isArray(V)){const z=v?V.length-1:0;V=V[z]}V!==null&&(c[k]=V)}for(const k in N)c[k]=N[k]}}}return c}const Yb=n=>(a,s)=>{const l=S.useContext(No),c=S.useContext(jo),h=()=>VT(n,a,l,c);return s?h():hf(h)},LT=Yb({scrapeMotionValuesFromProps:Lf,createRenderState:Hf}),UT=Yb({scrapeMotionValuesFromProps:Eb,createRenderState:qb}),HT=Symbol.for("motionComponentSymbol");function qT(n,a,s){const l=S.useRef(s);S.useInsertionEffect(()=>{l.current=s});const c=S.useRef(null);return S.useCallback(h=>{var m;h&&((m=n.onMount)==null||m.call(n,h)),a&&(h?a.mount(h):a.unmount());const d=l.current;if(typeof d=="function")if(h){const p=d(h);typeof p=="function"&&(c.current=p)}else c.current?(c.current(),c.current=null):d(h);else d&&(d.current=h)},[a])}const Pb=S.createContext({});function _a(n){return n&&typeof n=="object"&&Object.prototype.hasOwnProperty.call(n,"current")}function YT(n,a,s,l,c,h){var V,z;const{visualElement:d}=S.useContext(No),m=S.useContext(Bb),p=S.useContext(jo),g=S.useContext(Uf),v=g.reducedMotion,x=g.skipAnimations,b=S.useRef(null),E=S.useRef(!1);l=l||m.renderer,!b.current&&l&&(b.current=l(n,{visualState:a,parent:d,props:s,presenceContext:p,blockInitialAnimation:p?p.initial===!1:!1,reducedMotionConfig:v,skipAnimations:x,isSVG:h}),E.current&&b.current&&(b.current.manuallyAnimateOnMount=!0));const w=b.current,N=S.useContext(Pb);w&&!w.projection&&c&&(w.type==="html"||w.type==="svg")&&PT(b.current,s,c,N);const C=S.useRef(!1);S.useInsertionEffect(()=>{w&&C.current&&w.update(s,p)});const A=s[Ix],k=S.useRef(!!A&&typeof window<"u"&&!((V=window.MotionHandoffIsComplete)!=null&&V.call(window,A))&&((z=window.MotionHasOptimisedAnimation)==null?void 0:z.call(window,A)));return mf(()=>{E.current=!0,w&&(C.current=!0,window.MotionIsMounted=!0,w.updateFeatures(),w.scheduleRenderMicrotask(),k.current&&w.animationState&&w.animationState.animateChanges())}),S.useEffect(()=>{w&&(!k.current&&w.animationState&&w.animationState.animateChanges(),k.current&&(queueMicrotask(()=>{var L;(L=window.MotionHandoffMarkAsComplete)==null||L.call(window,A)}),k.current=!1),w.enteringChildren=void 0)}),w}function PT(n,a,s,l){const{layoutId:c,layout:h,drag:d,dragConstraints:m,layoutScroll:p,layoutRoot:g,layoutAnchor:v,layoutCrossfade:x}=a;n.projection=new s(n.latestValues,a["data-framer-portal-id"]?void 0:Gb(n.parent)),n.projection.setOptions({layoutId:c,layout:h,alwaysMeasureLayout:!!d||m&&_a(m),visualElement:n,animationType:typeof h=="string"?h:"both",initialPromotionConfig:l,crossfade:x,layoutScroll:p,layoutRoot:g,layoutAnchor:v})}function Gb(n){if(n)return n.options.allowProjection!==!1?n.projection:Gb(n.parent)}function od(n,{forwardMotionProps:a=!1,type:s}={},l,c){l&&ET(l);const h=s?s==="svg":qf(n),d=h?UT:LT;function m(g,v){let x;const b={...S.useContext(Uf),...g,layoutId:GT(g)},{isStatic:E}=b,w=AT(g),N=d(g,E);if(!E&&typeof window<"u"){FT();const C=XT(b);x=C.MeasureLayout,w.visualElement=YT(n,N,b,c,C.ProjectionNode,h)}return o.jsxs(No.Provider,{value:w,children:[x&&w.visualElement?o.jsx(x,{visualElement:w.visualElement,...b}):null,_T(n,g,qT(N,w.visualElement,v),N,E,a,h)]})}m.displayName=`motion.${typeof n=="string"?n:`create(${n.displayName??n.name??""})`}`;const p=S.forwardRef(m);return p[HT]=n,p}function GT({layoutId:n}){const a=S.useContext(ff).id;return a&&n!==void 0?a+"-"+n:n}function FT(n,a){S.useContext(Bb).strict}function XT(n){const a=Lb(),{drag:s,layout:l}=a;if(!s&&!l)return{};const c={...s,...l};return{MeasureLayout:s!=null&&s.isEnabled(n)||l!=null&&l.isEnabled(n)?c.MeasureLayout:void 0,ProjectionNode:c.ProjectionNode}}function $T(n,a){if(typeof Proxy>"u")return od;const s=new Map,l=(h,d)=>od(h,d,n,a),c=(h,d)=>l(h,d);return new Proxy(c,{get:(h,d)=>d==="create"?l:(s.has(d)||s.set(d,od(d,void 0,n,a)),s.get(d))})}const KT=(n,a)=>a.isSVG??qf(n)?new wE(a):new yE(a,{allowProjection:n!==S.Fragment});class ZT extends Sr{constructor(a){super(a),a.animationState||(a.animationState=DE(a))}updateAnimationControlsSubscription(){const{animate:a}=this.node.getProps();To(a)&&(this.unmountControls=a.subscribe(this.node))}mount(){this.updateAnimationControlsSubscription()}update(){const{animate:a}=this.node.getProps(),{animate:s}=this.node.prevProps||{};a!==s&&this.updateAnimationControlsSubscription()}unmount(){var a;this.node.animationState.reset(),(a=this.unmountControls)==null||a.call(this)}}let QT=0;class JT extends Sr{constructor(){super(...arguments),this.id=QT++,this.isExitComplete=!1}update(){var h;if(!this.node.presenceContext)return;const{isPresent:a,onExitComplete:s}=this.node.presenceContext,{isPresent:l}=this.node.prevPresenceContext||{};if(!this.node.animationState||a===l)return;if(a&&l===!1){if(this.isExitComplete){const{initial:d,custom:m}=this.node.getProps();if(typeof d=="string"||typeof d=="object"&&d!==null&&!Array.isArray(d)){const p=Fr(this.node,d,m);if(p){const{transition:g,transitionEnd:v,...x}=p;for(const b in x)(h=this.node.getValue(b))==null||h.jump(x[b])}}this.node.animationState.reset(),this.node.animationState.animateChanges()}else this.node.animationState.setActive("exit",!1);this.isExitComplete=!1;return}const c=this.node.animationState.setActive("exit",!a);s&&!a&&c.then(()=>{this.isExitComplete=!0,s(this.id)})}mount(){const{register:a,onExitComplete:s}=this.node.presenceContext||{};s&&s(this.id),a&&(this.unmount=a(this.id))}unmount(){}}const WT={animation:{Feature:ZT},exit:{Feature:JT}};function cs(n){return{point:{x:n.pageX,y:n.pageY}}}const IT=n=>a=>Rf(a)&&n(a,cs(a));function Qi(n,a,s,l){return ts(n,a,IT(s),l)}const Fb=({current:n})=>n?n.ownerDocument.defaultView:null,vv=(n,a)=>Math.abs(n-a);function eC(n,a){const s=vv(n.x,a.x),l=vv(n.y,a.y);return Math.sqrt(s**2+l**2)}const xv=new Set(["auto","scroll"]);class Xb{constructor(a,s,{transformPagePoint:l,contextWindow:c=window,dragSnapToOrigin:h=!1,distanceThreshold:d=3,element:m}={}){if(this.startEvent=null,this.lastMoveEvent=null,this.lastMoveEventInfo=null,this.lastRawMoveEventInfo=null,this.handlers={},this.contextWindow=window,this.scrollPositions=new Map,this.removeScrollListeners=null,this.onElementScroll=w=>{this.handleScroll(w.target)},this.onWindowScroll=()=>{this.handleScroll(window)},this.updatePoint=()=>{if(!(this.lastMoveEvent&&this.lastMoveEventInfo))return;this.lastRawMoveEventInfo&&(this.lastMoveEventInfo=Rl(this.lastRawMoveEventInfo,this.transformPagePoint));const w=cd(this.lastMoveEventInfo,this.history),N=this.startEvent!==null,C=eC(w.offset,{x:0,y:0})>=this.distanceThreshold;if(!N&&!C)return;const{point:A}=w,{timestamp:k}=pt;this.history.push({...A,timestamp:k});const{onStart:V,onMove:z}=this.handlers;N||(V&&V(this.lastMoveEvent,w),this.startEvent=this.lastMoveEvent),z&&z(this.lastMoveEvent,w)},this.handlePointerMove=(w,N)=>{this.lastMoveEvent=w,this.lastRawMoveEventInfo=N,this.lastMoveEventInfo=Rl(N,this.transformPagePoint),Ge.update(this.updatePoint,!0)},this.handlePointerUp=(w,N)=>{this.end();const{onEnd:C,onSessionEnd:A,resumeAnimation:k}=this.handlers;if((this.dragSnapToOrigin||!this.startEvent)&&k&&k(),!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const V=cd(w.type==="pointercancel"?this.lastMoveEventInfo:Rl(N,this.transformPagePoint),this.history);this.startEvent&&C&&C(w,V),A&&A(w,V)},!Rf(a))return;this.dragSnapToOrigin=h,this.handlers=s,this.transformPagePoint=l,this.distanceThreshold=d,this.contextWindow=c||window;const p=cs(a),g=Rl(p,this.transformPagePoint),{point:v}=g,{timestamp:x}=pt;this.history=[{...v,timestamp:x}];const{onSessionStart:b}=s;b&&b(a,cd(g,this.history));const E={passive:!0,capture:!0};this.removeListeners=ss(Qi(this.contextWindow,"pointermove",this.handlePointerMove,E),Qi(this.contextWindow,"pointerup",this.handlePointerUp,E),Qi(this.contextWindow,"pointercancel",this.handlePointerUp,E)),m&&this.startScrollTracking(m)}startScrollTracking(a){let s=a.parentElement;for(;s;){const l=getComputedStyle(s);(xv.has(l.overflowX)||xv.has(l.overflowY))&&this.scrollPositions.set(s,{x:s.scrollLeft,y:s.scrollTop}),s=s.parentElement}this.scrollPositions.set(window,{x:window.scrollX,y:window.scrollY}),window.addEventListener("scroll",this.onElementScroll,{capture:!0}),window.addEventListener("scroll",this.onWindowScroll),this.removeScrollListeners=()=>{window.removeEventListener("scroll",this.onElementScroll,{capture:!0}),window.removeEventListener("scroll",this.onWindowScroll)}}handleScroll(a){const s=this.scrollPositions.get(a);if(!s)return;const l=a===window,c=l?{x:window.scrollX,y:window.scrollY}:{x:a.scrollLeft,y:a.scrollTop},h={x:c.x-s.x,y:c.y-s.y};h.x===0&&h.y===0||(l?this.lastMoveEventInfo&&(this.lastMoveEventInfo.point.x+=h.x,this.lastMoveEventInfo.point.y+=h.y):this.history.length>0&&(this.history[0].x-=h.x,this.history[0].y-=h.y),this.scrollPositions.set(a,c),Ge.update(this.updatePoint,!0))}updateHandlers(a){this.handlers=a}end(){this.removeListeners&&this.removeListeners(),this.removeScrollListeners&&this.removeScrollListeners(),this.scrollPositions.clear(),xr(this.updatePoint)}}function Rl(n,a){return a?{point:a(n.point)}:n}function bv(n,a){return{x:n.x-a.x,y:n.y-a.y}}function cd({point:n},a){return{point:n,delta:bv(n,$b(a)),offset:bv(n,tC(a)),velocity:nC(a,.1)}}function tC(n){return n[0]}function $b(n){return n[n.length-1]}function nC(n,a){if(n.length<2)return{x:0,y:0};let s=n.length-1,l=null;const c=$b(n);for(;s>=0&&(l=n[s],!(c.timestamp-l.timestamp>qt(a)));)s--;if(!l)return{x:0,y:0};l===n[0]&&n.length>2&&c.timestamp-l.timestamp>qt(a)*2&&(l=n[1]);const h=en(c.timestamp-l.timestamp);if(h===0)return{x:0,y:0};const d={x:(c.x-l.x)/h,y:(c.y-l.y)/h};return d.x===1/0&&(d.x=0),d.y===1/0&&(d.y=0),d}function rC(n,{min:a,max:s},l){return a!==void 0&&n<a?n=l?Pe(a,n,l.min):Math.max(n,a):s!==void 0&&n>s&&(n=l?Pe(s,n,l.max):Math.min(n,s)),n}function Sv(n,a,s){return{min:a!==void 0?n.min+a:void 0,max:s!==void 0?n.max+s-(n.max-n.min):void 0}}function aC(n,{top:a,left:s,bottom:l,right:c}){return{x:Sv(n.x,s,c),y:Sv(n.y,a,l)}}function jv(n,a){let s=a.min-n.min,l=a.max-n.max;return a.max-a.min<n.max-n.min&&([s,l]=[l,s]),{min:s,max:l}}function iC(n,a){return{x:jv(n.x,a.x),y:jv(n.y,a.y)}}function sC(n,a){let s=.5;const l=St(n),c=St(a);return c>l?s=Wi(a.min,a.max-l,n.min):l>c&&(s=Wi(n.min,n.max-c,a.min)),bn(0,1,s)}function lC(n,a){const s={};return a.min!==void 0&&(s.min=a.min-n.min),a.max!==void 0&&(s.max=a.max-n.min),s}const Xd=.35;function oC(n=Xd){return n===!1?n=0:n===!0&&(n=Xd),{x:wv(n,"left","right"),y:wv(n,"top","bottom")}}function wv(n,a,s){return{min:Ev(n,a),max:Ev(n,s)}}function Ev(n,a){return typeof n=="number"?n:n[a]||0}const cC=new WeakMap;class uC{constructor(a){this.openDragLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},this.constraints=!1,this.hasMutatedConstraints=!1,this.elastic=st(),this.latestPointerEvent=null,this.latestPanInfo=null,this.visualElement=a}start(a,{snapToCursor:s=!1,distanceThreshold:l}={}){const{presenceContext:c}=this.visualElement;if(c&&c.isPresent===!1)return;const h=x=>{s&&this.snapToCursor(cs(x).point),this.stopAnimation()},d=(x,b)=>{const{drag:E,dragPropagation:w,onDragStart:N}=this.getProps();if(E&&!w&&(this.openDragLock&&this.openDragLock(),this.openDragLock=B2(E),!this.openDragLock))return;this.latestPointerEvent=x,this.latestPanInfo=b,this.isDragging=!0,this.currentDirection=null,this.resolveConstraints(),this.visualElement.projection&&(this.visualElement.projection.isAnimationBlocked=!0,this.visualElement.projection.target=void 0),gn(A=>{let k=this.getAxisMotionValue(A).get()||0;if(xn.test(k)){const{projection:V}=this.visualElement;if(V&&V.layout){const z=V.layout.layoutBox[A];z&&(k=St(z)*(parseFloat(k)/100))}}this.originPoint[A]=k}),N&&Ge.update(()=>N(x,b),!1,!0),Bd(this.visualElement,"transform");const{animationState:C}=this.visualElement;C&&C.setActive("whileDrag",!0)},m=(x,b)=>{this.latestPointerEvent=x,this.latestPanInfo=b;const{dragPropagation:E,dragDirectionLock:w,onDirectionLock:N,onDrag:C}=this.getProps();if(!E&&!this.openDragLock)return;const{offset:A}=b;if(w&&this.currentDirection===null){this.currentDirection=fC(A),this.currentDirection!==null&&N&&N(this.currentDirection);return}this.updateAxis("x",b.point,A),this.updateAxis("y",b.point,A),this.visualElement.render(),C&&Ge.update(()=>C(x,b),!1,!0)},p=(x,b)=>{this.latestPointerEvent=x,this.latestPanInfo=b,this.stop(x,b),this.latestPointerEvent=null,this.latestPanInfo=null},g=()=>{const{dragSnapToOrigin:x}=this.getProps();(x||this.constraints)&&this.startAnimation({x:0,y:0})},{dragSnapToOrigin:v}=this.getProps();this.panSession=new Xb(a,{onSessionStart:h,onStart:d,onMove:m,onSessionEnd:p,resumeAnimation:g},{transformPagePoint:this.visualElement.getTransformPagePoint(),dragSnapToOrigin:v,distanceThreshold:l,contextWindow:Fb(this.visualElement),element:this.visualElement.current})}stop(a,s){const l=a||this.latestPointerEvent,c=s||this.latestPanInfo,h=this.isDragging;if(this.cancel(),!h||!c||!l)return;const{velocity:d}=c;this.startAnimation(d);const{onDragEnd:m}=this.getProps();m&&Ge.postRender(()=>m(l,c))}cancel(){this.isDragging=!1;const{projection:a,animationState:s}=this.visualElement;a&&(a.isAnimationBlocked=!1),this.endPanSession();const{dragPropagation:l}=this.getProps();!l&&this.openDragLock&&(this.openDragLock(),this.openDragLock=null),s&&s.setActive("whileDrag",!1)}endPanSession(){this.panSession&&this.panSession.end(),this.panSession=void 0}updateAxis(a,s,l){const{drag:c}=this.getProps();if(!l||!Ol(a,c,this.currentDirection))return;const h=this.getAxisMotionValue(a);let d=this.originPoint[a]+l[a];this.constraints&&this.constraints[a]&&(d=rC(d,this.constraints[a],this.elastic[a])),h.set(d)}resolveConstraints(){var h;const{dragConstraints:a,dragElastic:s}=this.getProps(),l=this.visualElement.projection&&!this.visualElement.projection.layout?this.visualElement.projection.measure(!1):(h=this.visualElement.projection)==null?void 0:h.layout,c=this.constraints;a&&_a(a)?this.constraints||(this.constraints=this.resolveRefConstraints()):a&&l?this.constraints=aC(l.layoutBox,a):this.constraints=!1,this.elastic=oC(s),c!==this.constraints&&!_a(a)&&l&&this.constraints&&!this.hasMutatedConstraints&&gn(d=>{this.constraints!==!1&&this.getAxisMotionValue(d)&&(this.constraints[d]=lC(l.layoutBox[d],this.constraints[d]))})}resolveRefConstraints(){const{dragConstraints:a,onMeasureDragConstraints:s}=this.getProps();if(!a||!_a(a))return!1;const l=a.current,{projection:c}=this.visualElement;if(!c||!c.layout)return!1;c.root&&(c.root.scroll=void 0,c.root.updateScroll());const h=dE(l,c.root,this.visualElement.getTransformPagePoint());let d=iC(c.layout.layoutBox,h);if(s){const m=s(oE(d));this.hasMutatedConstraints=!!m,m&&(d=pb(m))}return d}startAnimation(a){const{drag:s,dragMomentum:l,dragElastic:c,dragTransition:h,dragSnapToOrigin:d,onDragTransitionEnd:m}=this.getProps(),p=this.constraints||{},g=gn(v=>{if(!Ol(v,s,this.currentDirection))return;let x=p&&p[v]||{};(d===!0||d===v)&&(x={min:0,max:0});const b=c?200:1e6,E=c?40:1e7,w={type:"inertia",velocity:l?a[v]:0,bounceStiffness:b,bounceDamping:E,timeConstant:750,restDelta:1,restSpeed:10,...h,...x};return this.startAxisValueAnimation(v,w)});return Promise.all(g).then(m)}startAxisValueAnimation(a,s){const l=this.getAxisMotionValue(a);return Bd(this.visualElement,a),l.start(Nf(a,l,0,s,this.visualElement,!1))}stopAnimation(){gn(a=>this.getAxisMotionValue(a).stop())}getAxisMotionValue(a){const s=`_drag${a.toUpperCase()}`,c=this.visualElement.getProps()[s];return c||this.visualElement.getValue(a,this.visualElement.latestValues[a]??0)}snapToCursor(a){gn(s=>{const{drag:l}=this.getProps();if(!Ol(s,l,this.currentDirection))return;const{projection:c}=this.visualElement,h=this.getAxisMotionValue(s);if(c&&c.layout){const{min:d,max:m}=c.layout.layoutBox[s],p=h.get()||0;h.set(a[s]-Pe(d,m,.5)+p)}})}scalePositionWithinConstraints(){if(!this.visualElement.current)return;const{drag:a,dragConstraints:s}=this.getProps(),{projection:l}=this.visualElement;if(!_a(s)||!l||!this.constraints)return;this.stopAnimation();const c={x:0,y:0};gn(d=>{const m=this.getAxisMotionValue(d);if(m&&this.constraints!==!1){const p=m.get();c[d]=sC({min:p,max:p},this.constraints[d])}});const{transformTemplate:h}=this.visualElement.getProps();this.visualElement.current.style.transform=h?h({},""):"none",l.root&&l.root.updateScroll(),l.updateLayout(),this.constraints=!1,this.resolveConstraints(),gn(d=>{if(!Ol(d,a,null))return;const m=this.getAxisMotionValue(d),{min:p,max:g}=this.constraints[d];m.set(Pe(p,g,c[d]))}),this.visualElement.render()}addListeners(){if(!this.visualElement.current)return;cC.set(this.visualElement,this);const a=this.visualElement.current,s=Qi(a,"pointerdown",g=>{const{drag:v,dragListener:x=!0}=this.getProps(),b=g.target,E=b!==a&&P2(b);v&&x&&!E&&this.start(g)});let l;const c=()=>{const{dragConstraints:g}=this.getProps();_a(g)&&g.current&&(this.constraints=this.resolveRefConstraints(),l||(l=dC(a,g.current,()=>this.scalePositionWithinConstraints())))},{projection:h}=this.visualElement,d=h.addEventListener("measure",c);h&&!h.layout&&(h.root&&h.root.updateScroll(),h.updateLayout()),Ge.read(c);const m=ts(window,"resize",()=>this.scalePositionWithinConstraints()),p=h.addEventListener("didUpdate",(({delta:g,hasLayoutChanged:v})=>{this.isDragging&&v&&(gn(x=>{const b=this.getAxisMotionValue(x);b&&(this.originPoint[x]+=g[x].translate,b.set(b.get()+g[x].translate))}),this.visualElement.render())}));return()=>{m(),s(),d(),p&&p(),l&&l()}}getProps(){const a=this.visualElement.getProps(),{drag:s=!1,dragDirectionLock:l=!1,dragPropagation:c=!1,dragConstraints:h=!1,dragElastic:d=Xd,dragMomentum:m=!0}=a;return{...a,drag:s,dragDirectionLock:l,dragPropagation:c,dragConstraints:h,dragElastic:d,dragMomentum:m}}}function Tv(n){let a=!0;return()=>{if(a){a=!1;return}n()}}function dC(n,a,s){const l=Ry(n,Tv(s)),c=Ry(a,Tv(s));return()=>{l(),c()}}function Ol(n,a,s){return(a===!0||a===n)&&(s===null||s===n)}function fC(n,a=10){let s=null;return Math.abs(n.y)>a?s="y":Math.abs(n.x)>a&&(s="x"),s}class hC extends Sr{constructor(a){super(a),this.removeGroupControls=tn,this.removeListeners=tn,this.controls=new uC(a)}mount(){const{dragControls:a}=this.node.getProps();a&&(this.removeGroupControls=a.subscribe(this.controls)),this.removeListeners=this.controls.addListeners()||tn}update(){const{dragControls:a}=this.node.getProps(),{dragControls:s}=this.node.prevProps||{};a!==s&&(this.removeGroupControls(),a&&(this.removeGroupControls=a.subscribe(this.controls)))}unmount(){this.removeGroupControls(),this.removeListeners(),this.controls.isDragging||this.controls.endPanSession()}}const ud=n=>(a,s)=>{n&&Ge.update(()=>n(a,s),!1,!0)};class mC extends Sr{constructor(){super(...arguments),this.removePointerDownListener=tn}onPointerDown(a){this.session=new Xb(a,this.createPanHandlers(),{transformPagePoint:this.node.getTransformPagePoint(),contextWindow:Fb(this.node)})}createPanHandlers(){const{onPanSessionStart:a,onPanStart:s,onPan:l,onPanEnd:c}=this.node.getProps();return{onSessionStart:ud(a),onStart:ud(s),onMove:ud(l),onEnd:(h,d)=>{delete this.session,c&&Ge.postRender(()=>c(h,d))}}}mount(){this.removePointerDownListener=Qi(this.node.current,"pointerdown",a=>this.onPointerDown(a))}update(){this.session&&this.session.updateHandlers(this.createPanHandlers())}unmount(){this.removePointerDownListener(),this.session&&this.session.end()}}let dd=!1;class pC extends S.Component{componentDidMount(){const{visualElement:a,layoutGroup:s,switchLayoutGroup:l,layoutId:c}=this.props,{projection:h}=a;h&&(s.group&&s.group.add(h),l&&l.register&&c&&l.register(h),dd&&h.root.didUpdate(),h.addEventListener("animationComplete",()=>{this.safeToRemove()}),h.setOptions({...h.options,layoutDependency:this.props.layoutDependency,onExitComplete:()=>this.safeToRemove()})),Ql.hasEverUpdated=!0}getSnapshotBeforeUpdate(a){const{layoutDependency:s,visualElement:l,drag:c,isPresent:h}=this.props,{projection:d}=l;return d&&(d.isPresent=h,a.layoutDependency!==s&&d.setOptions({...d.options,layoutDependency:s}),dd=!0,c||a.layoutDependency!==s||s===void 0||a.isPresent!==h?d.willUpdate():this.safeToRemove(),a.isPresent!==h&&(h?d.promote():d.relegate()||Ge.postRender(()=>{const m=d.getStack();(!m||!m.members.length)&&this.safeToRemove()}))),null}componentDidUpdate(){const{visualElement:a,layoutAnchor:s}=this.props,{projection:l}=a;l&&(l.options.layoutAnchor=s,l.root.didUpdate(),Mf.postRender(()=>{!l.currentAnimation&&l.isLead()&&this.safeToRemove()}))}componentWillUnmount(){const{visualElement:a,layoutGroup:s,switchLayoutGroup:l}=this.props,{projection:c}=a;dd=!0,c&&(c.scheduleCheckAfterUnmount(),s&&s.group&&s.group.remove(c),l&&l.deregister&&l.deregister(c))}safeToRemove(){const{safeToRemove:a}=this.props;a&&a()}render(){return null}}function Kb(n){const[a,s]=Vb(),l=S.useContext(ff);return o.jsx(pC,{...n,layoutGroup:l,switchLayoutGroup:S.useContext(Pb),isPresent:a,safeToRemove:s})}const gC={pan:{Feature:mC},drag:{Feature:hC,ProjectionNode:_b,MeasureLayout:Kb}};function Cv(n,a,s){const{props:l}=n;n.animationState&&l.whileHover&&n.animationState.setActive("whileHover",s==="Start");const c="onHover"+s,h=l[c];h&&Ge.postRender(()=>h(a,cs(a)))}class yC extends Sr{mount(){const{current:a}=this.node;a&&(this.unmount=U2(a,(s,l)=>(Cv(this.node,l,"Start"),c=>Cv(this.node,c,"End"))))}unmount(){}}class vC extends Sr{constructor(){super(...arguments),this.isActive=!1}onFocus(){let a=!1;try{a=this.node.current.matches(":focus-visible")}catch{a=!0}!a||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!0),this.isActive=!0)}onBlur(){!this.isActive||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!1),this.isActive=!1)}mount(){this.unmount=ss(ts(this.node.current,"focus",()=>this.onFocus()),ts(this.node.current,"blur",()=>this.onBlur()))}unmount(){}}function Nv(n,a,s){const{props:l}=n;if(n.current instanceof HTMLButtonElement&&n.current.disabled)return;n.animationState&&l.whileTap&&n.animationState.setActive("whileTap",s==="Start");const c="onTap"+(s==="End"?"":s),h=l[c];h&&Ge.postRender(()=>h(a,cs(a)))}class xC extends Sr{mount(){const{current:a}=this.node;if(!a)return;const{globalTapTarget:s,propagate:l}=this.node.props;this.unmount=F2(a,(c,h)=>(Nv(this.node,h,"Start"),(d,{success:m})=>Nv(this.node,d,m?"End":"Cancel")),{useGlobalTarget:s,stopPropagation:(l==null?void 0:l.tap)===!1})}unmount(){}}const $d=new WeakMap,fd=new WeakMap,bC=n=>{const a=$d.get(n.target);a&&a(n)},SC=n=>{n.forEach(bC)};function jC({root:n,...a}){const s=n||document;fd.has(s)||fd.set(s,{});const l=fd.get(s),c=JSON.stringify(a);return l[c]||(l[c]=new IntersectionObserver(SC,{root:n,...a})),l[c]}function wC(n,a,s){const l=jC(a);return $d.set(n,s),l.observe(n),()=>{$d.delete(n),l.unobserve(n)}}const EC={some:0,all:1};class TC extends Sr{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){var p;(p=this.stopObserver)==null||p.call(this);const{viewport:a={}}=this.node.getProps(),{root:s,margin:l,amount:c="some",once:h}=a,d={root:s?s.current:void 0,rootMargin:l,threshold:typeof c=="number"?c:EC[c]},m=g=>{const{isIntersecting:v}=g;if(this.isInView===v||(this.isInView=v,h&&!v&&this.hasEnteredView))return;v&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive("whileInView",v);const{onViewportEnter:x,onViewportLeave:b}=this.node.getProps(),E=v?x:b;E&&E(g)};this.stopObserver=wC(this.node.current,d,m)}mount(){this.startObserver()}update(){if(typeof IntersectionObserver>"u")return;const{props:a,prevProps:s}=this.node;["amount","margin","root"].some(CC(a,s))&&this.startObserver()}unmount(){var a;(a=this.stopObserver)==null||a.call(this),this.hasEnteredView=!1,this.isInView=!1}}function CC({viewport:n={}},{viewport:a={}}={}){return s=>n[s]!==a[s]}const NC={inView:{Feature:TC},tap:{Feature:xC},focus:{Feature:vC},hover:{Feature:yC}},DC={layout:{ProjectionNode:_b,MeasureLayout:Kb}},AC={...WT,...NC,...gC,...DC},kC=$T(AC,KT);function Zb(){!Vf.current&&fb();const[n]=S.useState(so.current);return n}const Yf=kC,fo=new Map,Dv=new Set;let MC=0;const Pf=()=>{var n;return(n=window.chrome)==null?void 0:n.webview};function RC(n){var s;const a=fo.get(n.id);if(a){if(n.type==="progress"){(s=a.progress)==null||s.call(a,n.data);return}window.clearTimeout(a.timer),fo.delete(n.id),n.ok?a.resolve(n.data):a.reject(new Error(n.error||"操作失败"))}}var ox;(ox=Pf())==null||ox.addEventListener("message",n=>RC(n.data));function OC(n,a){var s;a&&Dv.has(a)||(a&&Dv.add(a),(s=Pf())==null||s.postMessage({type:"app.ready",route:n,navigation:a}))}function he(n,a,s=3e4,l){const c=Pf();if(!c)return Promise.reject(new Error("当前页面未连接到桌面宿主"));const h=`${Date.now()}-${++MC}`;return new Promise((d,m)=>{const p=window.setTimeout(()=>{fo.delete(h),m(new Error("操作超时，请重试"))},s);fo.set(h,{resolve:g=>d(g),reject:m,timer:p,progress:l}),c.postMessage({id:h,operation:n,payload:a})})}var Gf=dx();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zC=n=>n.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Qb=(...n)=>n.filter((a,s,l)=>!!a&&a.trim()!==""&&l.indexOf(a)===s).join(" ").trim();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var _C={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const VC=S.forwardRef(({color:n="currentColor",size:a=24,strokeWidth:s=2,absoluteStrokeWidth:l,className:c="",children:h,iconNode:d,...m},p)=>S.createElement("svg",{ref:p,..._C,width:a,height:a,stroke:n,strokeWidth:l?Number(s)*24/Number(a):s,className:Qb("lucide",c),...m},[...d.map(([g,v])=>S.createElement(g,v)),...Array.isArray(h)?h:[h]]));/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qe=(n,a)=>{const s=S.forwardRef(({className:l,...c},h)=>S.createElement(VC,{ref:h,iconNode:a,className:Qb(`lucide-${zC(n)}`,l),...c}));return s.displayName=`${n}`,s};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ns=qe("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const BC=qe("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const LC=qe("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const us=qe("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jb=qe("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const UC=qe("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const HC=qe("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qC=qe("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const YC=qe("Clock3",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16.5 12",key:"1aq6pp"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const PC=qe("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kd=qe("Database",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const GC=qe("Ellipsis",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Av=qe("FileCheck2",[["path",{d:"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4",key:"1pf5j1"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"m3 15 2 2 4-4",key:"1lhrkk"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ho=qe("FileSpreadsheet",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M8 13h2",key:"yr2amv"}],["path",{d:"M14 13h2",key:"un5t4a"}],["path",{d:"M8 17h2",key:"2yhykz"}],["path",{d:"M14 17h2",key:"10kma7"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const FC=qe("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mo=qe("FolderOpen",[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sn=qe("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const XC=qe("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $C=qe("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wb=qe("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const KC=qe("RotateCw",[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",key:"1p45f6"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ZC=qe("Rows3",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M21 9H3",key:"1338ky"}],["path",{d:"M21 15H3",key:"9uk58r"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ff=qe("Settings2",[["path",{d:"M20 7h-9",key:"3s1dr2"}],["path",{d:"M14 17H5",key:"gfn3mx"}],["circle",{cx:"17",cy:"17",r:"3",key:"18b49y"}],["circle",{cx:"7",cy:"7",r:"3",key:"dfmy0x"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const QC=qe("Sigma",[["path",{d:"M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2",key:"wuwx1p"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const JC=qe("SlidersHorizontal",[["line",{x1:"21",x2:"14",y1:"4",y2:"4",key:"obuewd"}],["line",{x1:"10",x2:"3",y1:"4",y2:"4",key:"1q6298"}],["line",{x1:"21",x2:"12",y1:"12",y2:"12",key:"1iu8h1"}],["line",{x1:"8",x2:"3",y1:"12",y2:"12",key:"ntss68"}],["line",{x1:"21",x2:"16",y1:"20",y2:"20",key:"14d8ph"}],["line",{x1:"12",x2:"3",y1:"20",y2:"20",key:"m0wm8r"}],["line",{x1:"14",x2:"14",y1:"2",y2:"6",key:"14e1ph"}],["line",{x1:"8",x2:"8",y1:"10",y2:"14",key:"1i6ji0"}],["line",{x1:"16",x2:"16",y1:"18",y2:"22",key:"1lctlv"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const WC=qe("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const IC=qe("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xf=qe("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),eN=["一","二","三","四","五","六","日"],tN=Array.from({length:12},(n,a)=>`${a+1}月`);function nN(n){if(!n)return null;const[a,s,l=1]=n.split("-").map(Number);return!a||!s||!l?null:new Date(a,s-1,l)}function kv(n){const a=n.getFullYear(),s=String(n.getMonth()+1).padStart(2,"0"),l=String(n.getDate()).padStart(2,"0");return`${a}-${s}-${l}`}function rN(n){const a=n.getFullYear(),s=String(n.getMonth()+1).padStart(2,"0"),l=String(n.getDate()).padStart(2,"0");return`${a}/${s}/${l}`}function aN(n,a){const s=new Date(n,a,1).getDay();return s===0?6:s-1}function iN(n,a){return new Date(n,a+1,0).getDate()}function Mv(n,a){return n.getFullYear()===a.getFullYear()&&n.getMonth()===a.getMonth()&&n.getDate()===a.getDate()}function sN(n){return Math.floor(n/12)*12}function Yt({value:n,onChange:a,label:s,disabled:l=!1,selectionMode:c="day"}){var T;const h=S.useId(),d=S.useMemo(()=>nN(n),[n]),[m,p]=S.useState(!1),[g,v]=S.useState(c),[x,b]=S.useState(d??new Date),[E,w]=S.useState({top:0,left:0}),[N,C]=S.useState("bottom"),A=S.useRef(null),k=S.useRef(null),V=S.useRef(null);S.useEffect(()=>{d&&b(d)},[n]);function z(){const _=A.current,re=V.current;if(!_||!re)return;const le=_.ownerDocument.defaultView||window,de=_.getBoundingClientRect(),ce=re.getBoundingClientRect(),xe=ce.width,ie=ce.height,J=8,fe=12,te=le.innerHeight-de.bottom-fe,me=de.top-fe,Ce=ie>te&&me>te,Q=Ce?"top":"bottom";let be=Ce?de.top-ie-J:de.bottom+J;be<fe&&(be=fe),be+ie>le.innerHeight-fe&&(be=Math.max(fe,le.innerHeight-ie-fe));let _e=de.left;_e+xe>le.innerWidth-fe&&(_e=le.innerWidth-xe-fe),_e<fe&&(_e=fe),C(Q),w({top:be,left:_e})}S.useLayoutEffect(()=>{m&&z()},[m,g]),S.useEffect(()=>{var le;if(!m)return;const _=((le=A.current)==null?void 0:le.ownerDocument.defaultView)||window;function re(){z()}return _.addEventListener("resize",re),_.addEventListener("scroll",re,!0),()=>{_.removeEventListener("resize",re),_.removeEventListener("scroll",re,!0)}},[m,g]),S.useEffect(()=>{var de;const _=((de=k.current)==null?void 0:de.ownerDocument)||document;function re(ce){var fe,te;const xe=ce.target,ie=(fe=k.current)==null?void 0:fe.contains(xe),J=(te=V.current)==null?void 0:te.contains(xe);!ie&&!J&&(p(!1),v(c))}function le(ce){ce.key==="Escape"&&(p(!1),v(c))}return _.addEventListener("mousedown",re),_.addEventListener("keydown",le),()=>{_.removeEventListener("mousedown",re),_.removeEventListener("keydown",le)}},[c]);const L=x.getFullYear(),U=x.getMonth(),D=iN(L,U),q=aN(L,U),M=sN(L),O=Array.from({length:12},(_,re)=>M+re),$=[];for(let _=0;_<q;_+=1)$.push(null);for(let _=1;_<=D;_+=1)$.push(_);function Z(){if(g==="day"){b(new Date(L,U-1,1));return}if(g==="month"){b(new Date(L-1,U,1));return}b(new Date(L-12,U,1))}function oe(){if(g==="day"){b(new Date(L,U+1,1));return}if(g==="month"){b(new Date(L+1,U,1));return}b(new Date(L+12,U,1))}function ue(){if(c==="month"){v(g==="month"?"year":"month");return}if(g==="day"){v("month");return}if(g==="month"){v("year");return}v("day")}function ye(_){const re=new Date(L,U,_);a(kv(re)),p(!1),v("day")}function Y(_){if(c==="month"){a(`${L}-${String(_+1).padStart(2,"0")}`),b(new Date(L,_,1)),p(!1),v("month");return}b(new Date(L,_,1)),v("day")}function ae(_){b(new Date(_,U,1)),v("month")}function W(){const _=new Date;b(_),a(c==="month"?`${_.getFullYear()}-${String(_.getMonth()+1).padStart(2,"0")}`:kv(_)),v(c),p(!1)}function G(){return g==="day"?`${L}年 ${U+1}月`:g==="month"?`${L}年`:`${M} - ${M+11}`}const ee=m?o.jsxs("div",{ref:V,className:`date-picker-popover date-picker-popover-${N}`,style:{top:E.top,left:E.left},children:[o.jsxs("div",{className:"date-picker-header",children:[o.jsx("button",{type:"button",className:"date-picker-nav-button",onClick:Z,"aria-label":"上一页",children:o.jsx(UC,{size:17,strokeWidth:1.7})}),o.jsx("button",{type:"button",className:"date-picker-title-button",onClick:ue,children:G()}),o.jsx("button",{type:"button",className:"date-picker-nav-button",onClick:oe,"aria-label":"下一页",children:o.jsx(HC,{size:17,strokeWidth:1.7})})]}),g==="day"&&o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"date-picker-weekdays",children:eN.map(_=>o.jsx("div",{children:_},_))}),o.jsx("div",{className:"date-picker-grid",children:$.map((_,re)=>{if(_===null)return o.jsx("div",{},`empty-${re}`);const le=new Date(L,U,_),de=d?Mv(le,d):!1,ce=Mv(le,new Date);return o.jsx("button",{type:"button",className:["date-picker-day",de?"date-picker-day-selected":"",ce&&!de?"date-picker-day-today":""].filter(Boolean).join(" "),onClick:()=>ye(_),children:_},`${L}-${U}-${_}`)})})]}),g==="month"&&o.jsx("div",{className:"date-picker-month-grid",children:tN.map((_,re)=>{const le=d&&d.getFullYear()===L&&d.getMonth()===re,de=new Date().getFullYear()===L&&new Date().getMonth()===re;return o.jsx("button",{type:"button",className:["date-picker-month-item",le?"date-picker-month-item-selected":"",de&&!le?"date-picker-month-item-current":""].filter(Boolean).join(" "),onClick:()=>Y(re),children:_},_)})}),g==="year"&&o.jsx("div",{className:"date-picker-year-grid",children:O.map(_=>{const re=d&&d.getFullYear()===_,le=new Date().getFullYear()===_;return o.jsx("button",{type:"button",className:["date-picker-year-item",re?"date-picker-year-item-selected":"",le&&!re?"date-picker-year-item-current":""].filter(Boolean).join(" "),onClick:()=>ae(_),children:_},_)})}),o.jsx("div",{className:"date-picker-footer",children:o.jsx("button",{type:"button",className:"date-picker-today-button",onClick:W,children:c==="month"?"回到本月":"回到今天"})})]}):null;return o.jsxs(o.Fragment,{children:[o.jsxs("div",{ref:k,className:"date-picker",children:[s&&o.jsx("label",{id:`${h}-label`,className:"date-picker-label",children:s}),o.jsxs("button",{ref:A,type:"button",disabled:l,className:`date-picker-trigger ${m?"date-picker-trigger-open":""}`,onClick:()=>{l||p(_=>{const re=!_;return re&&v(c),re})},"aria-expanded":m,"aria-labelledby":s?`${h}-label ${h}-value`:void 0,"aria-label":s?void 0:c==="month"?"选择月份":"选择日期",children:[o.jsx("span",{id:`${h}-value`,className:d?"":"date-picker-placeholder",children:d?c==="month"?`${d.getFullYear()} / ${String(d.getMonth()+1).padStart(2,"0")}`:rN(d):c==="month"?"选择月份":"选择日期"}),o.jsx(LC,{className:"date-picker-calendar-icon",size:16,strokeWidth:1.7})]})]}),ee&&Gf.createPortal(ee,((T=k.current)==null?void 0:T.ownerDocument.body)||document.body)]})}const Ib=`/* Generated from tools/experiments/production_message/production_assistant_demo/src/index.css and App.css.\r
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
`,e0=`/* Shared controls: normal typography, neutral focus and unobtrusive scrollbars. */\r
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
`,lN=`<!doctype html>\r
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
`,t0=""+new URL("Inter-VF2RPR_K.ttf",import.meta.url).href,n0=""+new URL("NotoSansSC-Dz1u1FRy.ttf",import.meta.url).href,Xi=new Map;function oN(n,a,s=!1){const l=JSON.stringify([n,a]),c=`daily-field-cache-v1:${l}`;let h=s?void 0:Xi.get(l);if(!h&&!s)try{const d=JSON.parse(localStorage.getItem(c)||"null");d&&Array.isArray(d.metrics)&&d.metrics.every(m=>m&&typeof m.id=="string"&&typeof m.name=="string")&&(h=Promise.resolve(d),Xi.set(l,h))}catch{}return h||(h=he("daily.getProperties",{id:n,sourceId:a}).then(d=>{try{localStorage.setItem(c,JSON.stringify(d))}catch{}return d}).catch(d=>{throw Xi.delete(l),d}),Xi.set(l,h)),h}function cN(n=!1){if(Xi.clear(),n)try{Object.keys(localStorage).filter(a=>a.startsWith("daily-field-cache-v1:")).forEach(a=>localStorage.removeItem(a))}catch{}}const zl=[0,-1,-2].flatMap(n=>[{granularity:"day",key:n===0?"today":`day${n}`,label:n===0?"今日":`${n===-1?"去年":"前年"}同日`},{granularity:"mtd",key:n===0?"mtd":n===-1?"lastmonth":"mtd-2",label:n===0?"本月累计":`${n===-1?"去年":"前年"}同期月累计`},{granularity:"ytd",key:n===0?"ytd":n===-1?"last":"ytd-2",label:n===0?"本年累计":`${n===-1?"去年":"前年"}同期`},{granularity:"fullyear",key:n===0?"fullyear":n===-1?"full":"full-2",label:`${n===0?"今年":n===-1?"去年":"前年"}全年`}].map(a=>({key:a.key,label:a.label,spec:{granularity:a.granularity,yearOffset:n}}))),r0={"system.date":'today("yyyy年M月d日")',"system.year":'today("yyyy年")',"system.month":'today("M月")',"system.day":'today("d日")'};function uN(n){return r0[n]||n}function Rv(n){const a=[[]];function s(c){c.replace(/\u00a0/g," ").split(`
`).forEach((h,d)=>{var p;if(d&&a.push([]),!h)return;const m=a.at(-1);((p=m.at(-1))==null?void 0:p.type)==="text"?m.at(-1).text+=h:m.push({type:"text",text:h})})}function l(c){var h;if(c.nodeType===3){s(c.textContent||"");return}if(c instanceof n.ownerDocument.defaultView.HTMLElement){if(c.dataset.key){const d=uN(c.dataset.key);a.at(-1).push({type:d.startsWith("today(")?"dateToken":"fieldToken",attrs:{placeholder:d,label:c.textContent||"",...c.dataset.legacySpec?{dateRangeSpec:JSON.parse(c.dataset.legacySpec)}:{}}});return}if(c.tagName==="BR"){s(`
`);return}c!==n&&["DIV","P"].includes(c.tagName)&&c.childNodes.length===1&&((h=c.firstChild)==null?void 0:h.nodeName)==="BR"||Array.from(c.childNodes).forEach((d,m)=>{m&&d.nodeType===1&&["DIV","P"].includes(d.tagName)&&s(`
`),l(d)})}}return l(n),{text:a.map(c=>c.map(h=>h.type==="text"?h.text:h.attrs.placeholder).join("")).join(`
`),document:JSON.stringify({type:"doc",content:a.map(c=>({type:"paragraph",content:c}))})}}function dN(n,a,s,l){const c=[...s,...Object.entries(r0).map(([d,m])=>({key:m,label:d==="system.date"?"业务日期":d==="system.year"?"业务年份":d==="system.month"?"业务月份":"业务日",metric:"date",scope:"date",keywords:"",field:void 0}))].filter(d=>d.field||d.metric==="date").sort((d,m)=>m.key.length-d.key.length);let h=a;for(;h;){const d=c.map(m=>({d:m,index:h.indexOf(m.key)})).filter(m=>m.index>=0).sort((m,p)=>m.index-p.index)[0];if(!d){n.append(n.ownerDocument.createTextNode(h));break}d.index&&n.append(n.ownerDocument.createTextNode(h.slice(0,d.index))),n.append(l(d.d)),h=h.slice(d.index+d.d.key.length)}}function fN(n,a,s,l){if(!a)return!1;let c;try{c=JSON.parse(a)}catch{return!1}if(c.type!=="doc")return!1;function h(d){var m,p,g,v;if(d.type==="text"){n.append(n.ownerDocument.createTextNode(d.text||""));return}if(d.type==="hardBreak"){n.append(n.ownerDocument.createTextNode(`
`));return}if(d.type==="fieldToken"||d.type==="dateToken"){const x=((m=d.attrs)==null?void 0:m.placeholder)||"";let b=s.find(w=>w.key===x);b||(b={key:x,label:d.type==="dateToken"?"业务日期":((p=d.attrs)==null?void 0:p.label)||"已有数据",metric:d.type==="dateToken"?"date":"legacy",scope:"legacy",keywords:((g=d.attrs)==null?void 0:g.label)||""},s.push(b));const E=l(b);(v=d.attrs)!=null&&v.dateRangeSpec&&(E.dataset.legacySpec=JSON.stringify(d.attrs.dateRangeSpec)),n.append(E);return}(d.content||[]).forEach((x,b)=>{d.type==="doc"&&b&&n.append(n.ownerDocument.createTextNode(`
`)),h(x)})}return h(c),!0}function a0({id:n,back:a,changed:s,openSettings:l}){const c=S.useRef(null),[h,d]=S.useState("");return S.useEffect(()=>{let m=!1;const p=c.current;return he("daily.get",{id:n}).then(g=>{if(m)return;const v=hN(g,{back:a,changed:s,openSettings:l});p.dailyRuntime=v,p.srcdoc=lN.replace("../../src/ProductionAssistant.App/Assets/Fonts/Inter.ttf",new URL(t0,window.location.href).href).replace("../../src/ProductionAssistant.App/Assets/Fonts/NotoSansSC.ttf",new URL(n0,window.location.href).href)}).catch(g=>{m||d(String(g.message||g))}),()=>{var g;m=!0,(g=p.dailyRuntime)==null||g.dispose()}},[n]),o.jsxs("div",{className:"message-template-host",children:[h&&o.jsx("p",{role:"alert",children:h}),o.jsx("iframe",{ref:c,title:"日报消息模板"})]})}function hN(n,a){var U;let s=!1,l=!1,c,h,d=Promise.resolve(),m=0,p;const g=new Date,v=n.fields.map(D=>{var q,M,O;return{key:D.placeholder,label:D.label.replace(" · ",""),metric:`${D.databaseId||((q=D.binding)==null?void 0:q.dataSourceId)}:${D.businessId||((M=D.binding)==null?void 0:M.businessMetricId)}`,scope:((O=zl.find($=>JSON.stringify($.spec)===JSON.stringify(D.dateRangeSpec)))==null?void 0:O.key)||"legacy",keywords:D.label,field:D}}),x=[];let b=(U=n.metricSourceIds)!=null&&U.length?n.metricSourceIds:[...new Set(n.fields.map(D=>{var q;return D.databaseId||((q=D.binding)==null?void 0:q.dataSourceId)}).filter(Boolean))];const E=new Map(n.fields.map(D=>[D.placeholder,D])),w=new Map;function N(D){const q=h==null?void 0:h.querySelector("#preview-status");q&&(q.textContent=D)}function C(){h==null||h.querySelectorAll("[data-send]").forEach(D=>D.disabled=l||!n.notificationConfigured)}async function A(D){D.text===n.draftTemplate&&D.document===n.draftTemplateDocument||(await he("daily.saveTemplate",{id:z,...D}),n.draftTemplate=D.text,n.draftTemplateDocument=D.document)}async function k(){var D;try{const q=await he("daily.get",{id:z});if(s)return;n.notificationConfigured=q.notificationConfigured,n.sources=q.sources,C(),(D=h==null?void 0:h.querySelector("[data-notification-notice]"))==null||D.toggleAttribute("hidden",!!n.notificationConfigured),await V()}catch(q){N(String(q))}}async function V(){var q;const D=await Promise.allSettled(b.map(async M=>({sourceId:M,metrics:(await oN(z,M)).metrics})));if(!s){v.splice(0,v.length,...v.filter(M=>M.field)),x.length=0;for(const M of D)if(M.status==="fulfilled")for(const O of M.value.metrics){const $=`${M.value.sourceId}:${O.id}`;x.push([$,O.name,O.name,0]);const Z=O.granularity==="monthly"?[{key:"month",label:"本月"}]:zl;for(const oe of Z)v.push({key:`${$}:${oe.key}`,metric:$,scope:oe.key,label:O.granularity==="monthly"?O.name:oe.label+O.name,keywords:O.name+" "+oe.label+" "+(((q=n.sources.find(ue=>ue.id===M.value.sourceId))==null?void 0:q.name)||""),sourceId:M.value.sourceId,metricId:O.id});for(const oe of v.filter(ue=>ue.metric===$&&ue.field))oe.sourceId=M.value.sourceId,oe.metricId=O.id}D.some(M=>M.status==="rejected")?N("部分指标目录读取失败，请到系统设置刷新数据库。"):b.length||N("请在右上角任务设置中配置本任务的指标范围。")}}const z=n.id,L={dirty(){m++,p=void 0},id:z,name:n.name,sendTime:n.sendTime,businessDate:`${g.getFullYear()}-${String(g.getMonth()+1).padStart(2,"0")}-${String(g.getDate()).padStart(2,"0")}`,definitions:v,metrics:x,value:D=>{var q,M,O;return D.metric==="date"?"业务日期":((q=p==null?void 0:p.fieldValues)==null?void 0:q[D.key])||((O=p==null?void 0:p.fieldValues)==null?void 0:O[((M=v.find($=>$.field&&$.metric===D.metric&&$.scope===D.scope))==null?void 0:M.key)||""])||""},mount:(D,q)=>{fN(D,n.draftTemplateDocument,v,q)||dN(D,n.draftTemplate,v,q)},async materialize(D){var oe;if(D.field||D.metric==="date")return D;const q=v.find(ue=>ue.metric===D.metric&&ue.sourceId),M=D.sourceId||(q==null?void 0:q.sourceId),O=D.metricId||(q==null?void 0:q.metricId);if(!M||!O)throw new Error("此字段缺少可用的指标定义，请在任务设置中刷新指标。");const $=JSON.stringify([M,O,D.scope,D.label]);let Z=w.get($);return Z||(Z=he("daily.addField",{id:z,sourceId:M,metricId:O,placeholder:"",displayName:D.label,...D.scope==="month"?{rangeKind:"current-month"}:{dateRangeSpec:(oe=zl.find(ue=>ue.key===D.scope))==null?void 0:oe.spec}}).then(({field:ue})=>{E.set(ue.placeholder,ue);const ye={...D,key:ue.placeholder,field:ue,sourceId:M,metricId:O};return v.some(Y=>Y.key===ye.key)||v.push(ye),a.changed(),ye}).catch(ue=>{throw w.delete($),ue}),w.set($,Z)),Z},save(D){const q=Rv(D),M=d.catch(()=>{}).then(()=>s?void 0:A(q));return d=M,M},preview(D,q){const M=Rv(D),O=++m,$=d.catch(()=>{}).then(async()=>{if(s||O!==m)return{succeeded:!1,text:"",message:"内容已修改，请重新生成预览",errors:[]};await A(M);const Z=await he("daily.preview",{id:z,businessDate:q},12e4),oe={...Z,errors:Z.fieldErrors||[],message:Z.succeeded?"已生成 · "+q:Z.message};return O===m&&!s&&(p=oe),oe});return d=$,$},async send(D,q,M){if(!l){if(!n.notificationConfigured)throw new Error("请先在系统设置中配置通知渠道。");l=!0,C();try{await L.save(D);const O=await he(q==="test"?"daily.test":"daily.sendToday",q==="test"?{id:z,businessDate:M}:{id:z},12e4);if(!O.succeeded)throw new Error(O.message||"发送失败，请查看运行记录");N(O.alreadySent?"今日当前内容已发送":q==="test"?"测试发送成功":"今日消息已发送"),a.changed()}finally{l=!1,C()}}},configureAdvanced(D,q){const M=v.some(Z=>Z.metric===D&&Z.scope==="month"),O=M?[{key:"month",label:"本月计划"}]:[{key:"day",label:"日（业务日当天）"},{key:"mtd",label:"月累计（月初至业务日）"},{key:"ytd",label:"年累计（年初至业务日）"},{key:"fullyear",label:"全年"}];q.replaceChildren(...O.map(Z=>new Option(Z.label,Z.key)));const $=q.ownerDocument.querySelector("#scope-year");$&&($.disabled=M,$.value="0")},resolveAdvanced(D,q){return D==="month"?"month":zl.find(M=>M.spec.granularity===D&&M.spec.yearOffset===Number(q)).key},async saveBasics(D,q){const M=Array.from((h==null?void 0:h.querySelectorAll("[data-context-source]:checked"))||[]).map(O=>O.value);await he("daily.saveBasics",{id:z,name:D,sendTime:q,metricSourceIds:M}),n.name=D,n.sendTime=q,b=M,L.name=D,await V(),a.changed()},connect(D){var W;h=D,D.title=n.name,D.querySelector("#runs p").textContent="";const q=D.querySelector("header > span");q.removeAttribute("aria-hidden"),q.setAttribute("role","button"),q.setAttribute("tabindex","0"),q.setAttribute("aria-label","返回任务列表");const M=async()=>{const G=D.querySelector("#editor");G.contentEditable="false",m++;try{await L.save(G),a.back()}catch(ee){N(String(ee)),G.contentEditable="true"}};q.addEventListener("click",M),q.addEventListener("keydown",G=>{G.key==="Enter"&&M()});const O=D.querySelector("#settings"),$=D.createElement("fieldset");$.style.cssText="border:0;padding:0;max-height:180px;overflow:auto";const Z=D.createElement("legend");Z.textContent="本任务的指标范围",$.append(Z);for(const G of n.sources){const ee=D.createElement("label");ee.style.cssText="display:flex;gap:8px;margin:8px 0";const T=D.createElement("input");T.type="checkbox",T.value=G.id,T.dataset.contextSource="",T.checked=b.includes(G.id),T.style.width="auto",ee.append(T,D.createTextNode(G.name)),$.append(ee)}(W=O.querySelector("p"))==null||W.replaceWith($);const oe=D.createElement("button");oe.textContent="数据库设置",oe.type="button",oe.onclick=()=>{var G;O.close(),(G=a.openSettings)==null||G.call(a)},$.after(oe);const ue=D.querySelector("footer");for(const[G,ee]of[["test","测试发送"],["today","发送今日消息"]]){const T=D.createElement("button");T.textContent=ee,T.dataset.send=G,T.onclick=async()=>{const _=D.querySelector("#editor");_.contentEditable="false";try{await L.send(_,G,D.querySelector("#date").value)}catch(re){N(String(re))}finally{_.contentEditable="true"}},ue.append(T)}const ye=D.createElement("style");ye.textContent=Ib+`
`+e0+`
body{font-family:var(--font-ui)}#date-picker{width:154px}`,D.head.append(ye);const Y=D.createElement("span");Y.className="production-message-demo",Y.hidden=!0,D.body.append(Y),c=df.createRoot(D.querySelector("#date-picker")),c.render(o.jsx(mN,{input:D.querySelector("#date")})),window.addEventListener("production-settings-updated",k);const ae=D.querySelector("#runs");if(ae.ontoggle=async()=>{if(!ae.open)return;const G=ae.querySelector("p");G.textContent="正在读取…";try{const ee=await he("daily.runs",{id:z});G.textContent=ee.runs.length?"":"暂无运行记录";for(const T of ee.runs){const _=D.createElement("div");_.textContent=`${T.time} · ${T.status} · ${T.businessDate}${T.error?" · "+T.error:""}`,G.append(_)}}catch(ee){G.textContent=String(ee)}},!n.notificationConfigured){const G=D.createElement("div");G.className="notice",G.dataset.notificationNotice="",G.append(D.createTextNode("通知渠道尚未配置。 "));const ee=D.createElement("button");ee.textContent="通知设置",ee.onclick=a.openSettings||null,G.append(ee),D.querySelector("#message").before(G)}C(),V().catch(G=>N(String(G)))},dispose(){s=!0,m++,c==null||c.unmount(),window.removeEventListener("production-settings-updated",k)}};return L}function mN({input:n}){const[a,s]=S.useState(n.value);return o.jsx(Yt,{value:a,onChange:l=>{var c;s(l),n.value=l,n.dispatchEvent(new(((c=n.ownerDocument.defaultView)==null?void 0:c.Event)||Event)("change",{bubbles:!0}))}})}const pN=`<!doctype html>
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
`,Ov=()=>{const n=new Date;return n.setDate(n.getDate()-1),`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`};function i0({id:n,...a}){const s=S.useRef(null),[l,c]=S.useState("");return S.useEffect(()=>{let h=!1,d;const m=s.current;return c(""),he("notionFill.get",{id:n}).then(p=>{h||(d=gN(p,a),m.onload=()=>{var g;!h&&((g=m.contentDocument)!=null&&g.getElementById("date-picker"))&&d.connect(m.contentDocument)},m.srcdoc=pN.replace("../../src/ProductionAssistant.App/Assets/Fonts/Inter.ttf",new URL(t0,window.location.href).href).replace("../../src/ProductionAssistant.App/Assets/Fonts/NotoSansSC.ttf",new URL(n0,window.location.href).href))}).catch(p=>{h||c(String(p.message||p))}),()=>{h=!0,m.onload=null,d==null||d.dispose()}},[n]),o.jsxs("div",{className:"message-template-host",children:[l&&o.jsx("p",{role:"alert",children:l}),o.jsx("iframe",{ref:s,title:"原材料自动入库"})]})}function gN(n,a){let s={...n,runTime:n.runTime||"00:00"},l,c,h=!1,d=!1,m=0,p=0,g=Ov(),v,x=s.isEnabled;const b=G=>l.getElementById(G),E=G=>b(G),w=G=>b(G),N=G=>b(G),C=G=>G instanceof Error?G.message:String(G),A=G=>G.toLocaleString("zh-CN",{minimumFractionDigits:3,maximumFractionDigits:3});function k(G,ee=!1){b("feedback").textContent=G,b("feedback").className=ee?"callout error":""}function V(){return!!(s.sourcePageUrl&&s.username&&s.passwordConfigured)}function z(){c==null||c.render(o.jsx(Yt,{value:g,disabled:d,onChange:D}))}function L(){for(const G of["preview","source-test","yesterday","settings-open","back","confirm-run"])w(G).disabled=d;w("preview").disabled=d||!V()||!s.notionConfigured,w("source-test").disabled=d||!V(),w("run").disabled=d||!v,l.querySelectorAll("#settings button, #settings input").forEach(G=>G.disabled=d),w("toggle").disabled=d||!s.schedulingAvailable,w("preview").textContent=d?"处理中…":"生成预览",b("name").textContent=s.name,b("enabled").textContent=s.isEnabled?s.schedulerInstalled?"已启用":"计划异常":"未启用",b("target-name").textContent=s.targetDataSourceName,b("settings-target-name").textContent=s.targetDataSourceName,E("password").placeholder=s.passwordConfigured?"已保存；留空不修改":"请输入 93 系统密码",z()}function U(G="尚未生成预览"){m++,v=void 0,b("source-empty").hidden=!1,b("source-values").hidden=!0,b("source-error").hidden=!0,b("record").hidden=!0,b("target-status").hidden=!0,b("target-empty").hidden=!1,b("target-empty").querySelector("strong").textContent=G,b("target-empty").querySelector("span").textContent="预览只读取数据，不会新增记录",w("run").textContent="执行本日期",w("run").disabled=!0,N("confirm").open&&N("confirm").close()}function D(G){d||(g=G,E("date").value=G,U("待重新预览"),k(""),z())}function q(G){b("source-empty").hidden=!0,b("source-values").hidden=!1;for(const[ee,T]of[["plate",G.plateWeight],["section",G.sectionWeight],["total",G.totalWeight]])b(ee).textContent=A(T)}function M(G){q(G),b("target-empty").hidden=!0,b("record").hidden=!1,b("record-title").textContent=`${G.businessDate} 入库`,b("record-date").textContent=G.businessDate,b("record-plate").textContent=`${A(G.plateWeight)} 吨`,b("record-section").textContent=`${A(G.sectionWeight)} 吨`,b("target-status").hidden=!1,b("target-status").textContent=G.targetRecordExists?"该日期已有记录，无需新增。":"可新增 1 条入库记录。",w("run").textContent=G.targetRecordExists?"验证查重":"执行本日期"}function O(G){b("run-count").textContent=G.length?`· ${G.length}`:"";const ee=G.map(T=>{const _=l.createElement("div");_.className="run";const re=l.createElement("span");re.textContent={"source-test":"93 测试",test:"只读预览",manual:"手动执行",automatic:"自动执行"}[T.source]||T.source;const le=l.createElement("div");le.textContent=T.error||T.message||(T.status==="created"?"已新增":T.status==="failed"?"执行失败":"已检查"),T.status==="failed"&&(le.style.color="#B91C1C");const de=l.createElement("p");de.textContent=T.status==="failed"?T.businessDate:`${T.businessDate} · 板材 ${A(T.plateWeight)} 吨 · 型材 ${A(T.sectionWeight)} 吨`,le.append(de);const ce=l.createElement("small");return ce.textContent=T.time,_.append(re,le,ce),_});b("runs-body").replaceChildren(...ee),G.length||(b("runs-body").textContent="暂无运行记录")}async function $(){const G=++p;try{const ee=await he("notionFill.runs",{id:s.id});!h&&G===p&&O(ee.runs)}catch(ee){!h&&G===p&&(b("runs-body").textContent=`运行记录读取失败：${C(ee)}；重新展开可重试。`)}}function Z(){Promise.resolve(a.changed()).catch(()=>{})}async function oe(G){if(d||!g)return;d=!0,U("正在读取…");const ee=m;L(),k("");try{const T=await he(G?"notionFill.testSource":"notionFill.test",{id:s.id,businessDate:g},12e4);if(h||ee!==m)return;if(!T.succeeded)throw new Error(T.message||"读取失败");G?(q(T),b("target-empty").querySelector("strong").textContent="尚未检查 Notion",b("target-empty").querySelector("span").textContent="点击“生成预览”完成读取与查重"):(s.validated=!0,v=T,M(T)),Z()}catch(T){if(h||ee!==m)return;U("本次预览未完成"),b("source-error").hidden=!1,b("source-error").textContent=C(T)}finally{h||(d=!1,L(),$())}}async function ue(){if(d||!v||!N("confirm").open)return;const G=v.businessDate;N("confirm").close(),d=!0,L(),k("");try{const ee=await he("notionFill.runNow",{id:s.id,businessDate:G},12e4);if(h)return;if(!ee.succeeded)throw new Error(ee.message||"执行失败");v={...v,targetRecordExists:!0},b("target-status").textContent=ee.message,w("run").textContent="验证查重",k(ee.created?"Notion 写入成功。":"该日期已有记录，本次已跳过。"),Z()}catch(ee){h||(U("执行未完成，请重新预览"),k(C(ee),!0))}finally{h||(d=!1,L(),$())}}function ye(){return E("task-name").value.trim()!==s.name||E("url").value.trim().replace(/\/+$/,"")!==s.sourcePageUrl||E("username").value.trim()!==s.username||!!E("password").value}function Y(){w("toggle").setAttribute("aria-checked",String(x)),b("schedule-hint").textContent=s.schedulingAvailable?ye()?"配置已修改：保存后需重新预览，再启用。":s.isEnabled&&!s.schedulerInstalled?s.schedulerMessage:s.validated?"只读预览已通过，可以启用定时入库。":"完成一次“生成预览”后可启用。":"当前运行环境不支持定时启停，预览与手动执行仍可使用。"}async function ae(G){if(G.preventDefault(),d)return;const ee=E("task-name").value.trim(),T=E("username").value.trim();if(!ee||!T){b("settings-note").textContent="任务名称和用户名不能为空。";return}const _=ye(),re=E("run-time").value;if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(re)){b("settings-note").textContent="请选择有效的执行时间。";return}const le=_||re!==s.runTime,de=_?!1:x;let ce=!1;d=!0,L();try{if(le){const ie=E("url").value.trim().replace(/\/+$/,""),J=E("password").value;if(await he("notionFill.save",{id:s.id,name:ee,sourcePageUrl:ie,username:T,password:J,runTime:re}),h)return;ce=!0,s={...s,name:ee,sourcePageUrl:ie,username:T,runTime:re,passwordConfigured:s.passwordConfigured||!!J,isEnabled:_?!1:s.isEnabled,validated:_?!1:s.validated},E("password").value="",_&&U("配置已修改，请重新预览")}if(de!==s.isEnabled){const ie=await he("automation.setEnabled",{id:s.id,taskType:"notion_fill",enabled:de});if(h)return;if(s.isEnabled=ie.enabled,ie.enabled!==de)throw new Error(ie.message||"定时任务状态未更新");ce=!0}const xe=await he("notionFill.get",{id:s.id});if(h)return;s=xe,N("settings").close(),k(_?"配置已保存，请重新预览后启用。":"任务设置已保存。")}catch(xe){h||(b("settings-note").textContent=`${ce?"设置已更新，但后续操作失败：":""}${C(xe)}`)}finally{h||(d=!1,x=s.isEnabled,L(),Y(),ce&&Z())}}async function W(){if(d||h)return;const G=m;try{const ee=await he("notionFill.get",{id:s.id});if(h||d||G!==m)return;s=ee,U("系统设置已更新，请重新预览"),L(),k(s.notionConfigured?"系统设置已更新，点击“生成预览”读取数据。":"Notion 连接尚未配置，仍可仅测试 93 读取。")}catch(ee){h||k(C(ee),!0)}}return{connect(G){c==null||c.unmount(),l=G;const ee=l.createElement("style");ee.textContent=Ib+`
`+e0+`
body{color:#292524}#date-picker{width:163px;display:inline-block}`,l.head.append(ee);const T=l.createElement("span");T.className="production-message-demo",T.hidden=!0,l.body.append(T),c=df.createRoot(b("date-picker")),E("date").value=g,E("date").onchange=()=>D(E("date").value),w("yesterday").onclick=()=>D(Ov()),w("preview").onclick=()=>{oe(!1)},w("source-test").onclick=()=>{oe(!0)},w("back").onclick=a.back,w("run").onclick=()=>{d||!v||(b("confirm-title").textContent=v.targetRecordExists?"验证查重":"执行本日期",b("confirm-copy").textContent=v.targetRecordExists?`${v.businessDate} 已有记录，本次执行应跳过。`:`将向“${s.targetDataSourceName}”新增 ${v.businessDate} 的记录：板材 ${A(v.plateWeight)} 吨，型材 ${A(v.sectionWeight)} 吨。`,N("confirm").showModal())},w("confirm-run").onclick=()=>{ue()},w("settings-open").onclick=()=>{E("task-name").value=s.name,E("url").value=s.sourcePageUrl,E("username").value=s.username,E("password").value="",E("run-time").value=s.runTime,E("password").required=!s.passwordConfigured,b("settings-note").textContent="修改名称或连接后，需重新预览并启用定时任务。",x=s.isEnabled,Y(),N("settings").showModal()},w("toggle").onclick=()=>{if(s.schedulingAvailable){if(!x&&(!s.validated||ye())){b("schedule-hint").textContent="请先保存配置并完成“生成预览”，再启用定时入库。";return}x=!x,Y()}};for(const _ of["task-name","url","username","password"])E(_).oninput=()=>{ye()&&(x=!1),Y()};b("settings-form").onsubmit=_=>{ae(_)},N("settings").onclose=()=>{E("password").value=""},N("settings").oncancel=_=>{d&&_.preventDefault()},l.querySelectorAll("[data-close]").forEach(_=>_.onclick=()=>{d||N(_.dataset.close).close()}),w("system-settings").hidden=!a.openSettings,w("system-settings").onclick=()=>{var _;N("settings").close(),(_=a.openSettings)==null||_.call(a)},l.querySelector(".runs").ontoggle=_=>{_.currentTarget.open&&$()},window.addEventListener("production-settings-updated",W),U(),L(),V()?s.notionConfigured||k("Notion 连接尚未配置，请从任务设置打开系统设置；仍可仅测试 93 读取。"):k("请先在任务设置中补全 93 系统连接配置。")},dispose(){h=!0,m++,p++,c==null||c.unmount(),window.removeEventListener("production-settings-updated",W)}}}var yN=Object.defineProperty,$a=(n,a)=>yN(n,"name",{value:a,configurable:!0}),s0=!!(typeof window<"u"&&window.document&&window.document.createElement);function yr(n,a,{checkForDefaultPrevented:s=!0}={}){return $a(function(c){if(n==null||n(c),s===!1||!c||!c.defaultPrevented)return a==null?void 0:a(c)},"handleEvent")}$a(yr,"composeEventHandlers");function vN(n){var a;if(!s0)throw new Error("Cannot access window outside of the DOM");return((a=n==null?void 0:n.ownerDocument)==null?void 0:a.defaultView)??window}$a(vN,"getOwnerWindow");function Zd(n){if(!s0)throw new Error("Cannot access document outside of the DOM");return(n==null?void 0:n.ownerDocument)??document}$a(Zd,"getOwnerDocument");function l0(n,a=!1){const{activeElement:s}=Zd(n);if(!(s!=null&&s.nodeName))return null;if(o0(s)&&s.contentDocument)return l0(s.contentDocument.body,a);if(a){const l=s.getAttribute("aria-activedescendant");if(l){const c=Zd(s).getElementById(l);if(c)return c}}return s}$a(l0,"getActiveElement");function o0(n){return n.tagName==="IFRAME"}$a(o0,"isFrame");var xN=Object.defineProperty,$f=(n,a)=>xN(n,"name",{value:a,configurable:!0});function Qd(n,a){if(typeof n=="function")return n(a);n!=null&&(n.current=a)}$f(Qd,"setRef");function c0(...n){return a=>{let s=!1;const l=n.map(c=>{const h=Qd(c,a);return!s&&typeof h=="function"&&(s=!0),h});if(s)return()=>{for(let c=0;c<l.length;c++){const h=l[c];typeof h=="function"?h():Qd(n[c],null)}}}}$f(c0,"composeRefs");function Ka(...n){return S.useCallback(c0(...n),n)}$f(Ka,"useComposedRefs");var bN=Object.defineProperty,It=(n,a)=>bN(n,"name",{value:a,configurable:!0});function SN(n,a){const s=S.createContext(a);s.displayName=n+"Context";const l=It(h=>{const{children:d,...m}=h,p=S.useMemo(()=>m,Object.values(m));return o.jsx(s.Provider,{value:p,children:d})},"Provider");l.displayName=n+"Provider";function c(h,d={}){const{optional:m=!1}=d,p=S.useContext(s);if(p)return p;if(a!==void 0)return a;if(!m)throw new Error(`\`${h}\` must be used within \`${n}\``)}return It(c,"useContext"),[l,c]}It(SN,"createContext");function u0(n,a=[]){let s=[];function l(h,d){const m=S.createContext(d);m.displayName=h+"Context";const p=s.length;s=[...s,d];const g=It(x=>{var A;const{scope:b,children:E,...w}=x,N=((A=b==null?void 0:b[n])==null?void 0:A[p])||m,C=S.useMemo(()=>w,Object.values(w));return o.jsx(N.Provider,{value:C,children:E})},"Provider");g.displayName=h+"Provider";function v(x,b,E={}){var A;const{optional:w=!1}=E,N=((A=b==null?void 0:b[n])==null?void 0:A[p])||m,C=S.useContext(N);if(C)return C;if(d!==void 0)return d;if(!w)throw new Error(`\`${x}\` must be used within \`${h}\``)}return It(v,"useContext"),[g,v]}It(l,"createContext");const c=It(()=>{const h=s.map(d=>S.createContext(d));return It(function(m){const p=(m==null?void 0:m[n])||h;return S.useMemo(()=>({[`__scope${n}`]:{...m,[n]:p}}),[m,p])},"useScope")},"createScope");return c.scopeName=n,[l,d0(c,...a)]}It(u0,"createContextScope");function d0(...n){const a=n[0];if(n.length===1)return a;const s=It(()=>{const l=n.map(c=>({useScope:c(),scopeName:c.scopeName}));return It(function(h){const d=l.reduce((m,{useScope:p,scopeName:g})=>{const x=p(h)[`__scope${g}`];return{...m,...x}},{});return S.useMemo(()=>({[`__scope${a.scopeName}`]:d}),[d])},"useComposedScopes")},"createScope");return s.scopeName=a.scopeName,s}It(d0,"composeContextScopes");var br=globalThis!=null&&globalThis.document?S.useLayoutEffect:()=>{},jN=Object.defineProperty,wN=(n,a)=>jN(n,"name",{value:a,configurable:!0}),EN=is[" useId ".trim().toString()]||(()=>{}),TN=0;function Jl(n){const[a,s]=S.useState(EN());return br(()=>{n||s(l=>l??String(TN++))},[n]),n||(a?`radix-${a}`:"")}wN(Jl,"useId");var CN=Object.defineProperty,NN=(n,a)=>CN(n,"name",{value:a,configurable:!0}),zv=is[" useEffectEvent ".trim().toString()],_v=is[" useInsertionEffect ".trim().toString()];function f0(n){if(typeof zv=="function")return zv(n);const a=S.useRef(()=>{throw new Error("Cannot call an event handler while rendering.")});return typeof _v=="function"?_v(()=>{a.current=n}):br(()=>{a.current=n}),S.useMemo(()=>((...s)=>{var l;return(l=a.current)==null?void 0:l.call(a,...s)}),[])}NN(f0,"useEffectEvent");var DN=Object.defineProperty,ds=(n,a)=>DN(n,"name",{value:a,configurable:!0}),AN=is[" useInsertionEffect ".trim().toString()]||br;function h0({prop:n,defaultProp:a,onChange:s=ds(()=>{},"onChange"),caller:l}){const[c,h,d]=m0({defaultProp:a,onChange:s}),m=n!==void 0,p=m?n:c,g=S.useCallback(v=>{var x;if(m){const b=p0(v)?v(n):v;b!==n&&((x=d.current)==null||x.call(d,b))}else h(v)},[m,n,h,d]);return[p,g]}ds(h0,"useControllableState");function m0({defaultProp:n,onChange:a}){const[s,l]=S.useState(n),c=S.useRef(s),h=S.useRef(a);return AN(()=>{h.current=a},[a]),S.useEffect(()=>{var d;c.current!==s&&((d=h.current)==null||d.call(h,s),c.current=s)},[s,c]),[s,l,h]}ds(m0,"useUncontrolledState");function p0(n){return typeof n=="function"}ds(p0,"isFunction");var Vv=Symbol("RADIX:SYNC_STATE");function kN(n,a,s,l){const{prop:c,defaultProp:h,onChange:d,caller:m}=a,p=c!==void 0,g=f0(d),v=[{...s,state:h}];l&&v.push(l);const[x,b]=S.useReducer((C,A)=>{if(A.type===Vv)return{...C,state:A.state};const k=n(C,A);return p&&!Object.is(k.state,C.state)&&g(k.state),k},...v),E=x.state,w=S.useRef(E);S.useEffect(()=>{w.current!==E&&(w.current=E,p||g(E))},[E,w,p]);const N=S.useMemo(()=>c!==void 0?{...x,state:c}:x,[x,c]);return S.useEffect(()=>{p&&!Object.is(c,x.state)&&b({type:Vv,state:c})},[c,x.state,p]),[N,b]}ds(kN,"useControllableStateReducer");var MN=Object.defineProperty,un=(n,a)=>MN(n,"name",{value:a,configurable:!0});function Kf(n){const a=S.forwardRef((s,l)=>{let{children:c,...h}=s,d=null,m=!1;const p=[];Jd(c)&&typeof _l=="function"&&(c=_l(c._payload)),S.Children.forEach(c,b=>{var E;if(x0(b)){m=!0;const w=b;let N="child"in w.props?w.props.child:w.props.children;Jd(N)&&typeof _l=="function"&&(N=_l(N._payload)),d=ON(w,N),p.push((E=d==null?void 0:d.props)==null?void 0:E.children)}else p.push(b)}),d?d=S.cloneElement(d,void 0,p):!m&&S.Children.count(c)===1&&S.isValidElement(c)&&(d=c);const g=d?v0(d):void 0,v=Ka(l,g);if(!d){if(c||c===0)throw new Error(m?VN(n):_N(n));return c}const x=y0(h,d.props??{});return d.type!==S.Fragment&&(x.ref=l?v:g),S.cloneElement(d,x)});return a.displayName=`${n}.Slot`,a}un(Kf,"createSlot");var g0=Symbol.for("radix.slottable");function RN(n){const a=un(s=>"child"in s?s.children(s.child):s.children,"Slottable");return a.displayName=`${n}.Slottable`,a.__radixId=g0,a}un(RN,"createSlottable");var ON=un((n,a)=>{if("child"in n.props){const s=n.props.child;return S.isValidElement(s)?S.cloneElement(s,void 0,n.props.children(s.props.children)):null}return S.isValidElement(a)?a:null},"getSlottableElementFromSlottable");function y0(n,a){const s={...a};for(const l in a){const c=n[l],h=a[l];/^on[A-Z]/.test(l)?c&&h?s[l]=(...m)=>{const p=h(...m);return c(...m),p}:c&&(s[l]=c):l==="style"?s[l]={...c,...h}:l==="className"&&(s[l]=[c,h].filter(Boolean).join(" "))}return{...n,...s}}un(y0,"mergeProps");function v0(n){var l,c;let a=(l=Object.getOwnPropertyDescriptor(n.props,"ref"))==null?void 0:l.get,s=a&&"isReactWarning"in a&&a.isReactWarning;return s?n.ref:(a=(c=Object.getOwnPropertyDescriptor(n,"ref"))==null?void 0:c.get,s=a&&"isReactWarning"in a&&a.isReactWarning,s?n.props.ref:n.props.ref||n.ref)}un(v0,"getElementRef");function x0(n){return S.isValidElement(n)&&typeof n.type=="function"&&"__radixId"in n.type&&n.type.__radixId===g0}un(x0,"isSlottable");var zN=Symbol.for("react.lazy");function Jd(n){return n!=null&&typeof n=="object"&&"$$typeof"in n&&n.$$typeof===zN&&"_payload"in n&&b0(n._payload)}un(Jd,"isLazyComponent");function b0(n){return typeof n=="object"&&n!==null&&"then"in n}un(b0,"isPromiseLike");var _N=un(n=>`${n} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`,"createSlotError"),VN=un(n=>`${n} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`,"createSlottableError"),_l=is[" use ".trim().toString()],BN=Object.defineProperty,LN=(n,a)=>BN(n,"name",{value:a,configurable:!0}),UN=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],$r=UN.reduce((n,a)=>{const s=Kf(`Primitive.${a}`),l=S.forwardRef((c,h)=>{const{asChild:d,...m}=c,p=d?s:a;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),o.jsx(p,{...m,ref:h})});return l.displayName=`Primitive.${a}`,{...n,[a]:l}},{});function S0(n,a){n&&Gf.flushSync(()=>n.dispatchEvent(a))}LN(S0,"dispatchDiscreteCustomEvent");var HN=Object.defineProperty,qN=(n,a)=>HN(n,"name",{value:a,configurable:!0});function Pa(n){const a=S.useRef(n);return S.useEffect(()=>{a.current=n}),S.useMemo(()=>((...s)=>{var l;return(l=a.current)==null?void 0:l.call(a,...s)}),[])}qN(Pa,"useCallbackRef");var YN=Object.defineProperty,ct=(n,a)=>YN(n,"name",{value:a,configurable:!0}),Wd="dismissableLayer.update",PN="dismissableLayer.pointerDownOutside",GN="dismissableLayer.focusOutside",Bv,j0=S.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set,dismissableSurfaces:new Set}),FN=S.forwardRef(ct(function(a,s){const{disableOutsidePointerEvents:l=!1,deferPointerDownOutside:c=!1,onEscapeKeyDown:h,onPointerDownOutside:d,onFocusOutside:m,onInteractOutside:p,onDismiss:g,...v}=a,x=S.useContext(j0),[b,E]=S.useState(null),w=(b==null?void 0:b.ownerDocument)??(globalThis==null?void 0:globalThis.document),[,N]=S.useState({}),C=Ka(s,E),A=Array.from(x.layers),[k]=[...x.layersWithOutsidePointerEventsDisabled].slice(-1),V=k?A.indexOf(k):-1,z=b?A.indexOf(b):-1,L=x.layersWithOutsidePointerEventsDisabled.size>0,U=z>=V,D=S.useRef(!1),q=E0(Z=>{d==null||d(Z),p==null||p(Z),Z.defaultPrevented||g==null||g()},{ownerDocument:w,deferPointerDownOutside:c,isDeferredPointerDownOutsideRef:D,dismissableSurfaces:x.dismissableSurfaces,shouldHandlePointerDownOutside:S.useCallback(Z=>{if(!(Z instanceof Node))return!1;const oe=[...x.branches].some(ue=>ue.contains(Z));return U&&!oe},[x.branches,U])}),M=T0(Z=>{if(c&&D.current)return;const oe=Z.target;[...x.branches].some(ye=>ye.contains(oe))||(m==null||m(Z),p==null||p(Z),Z.defaultPrevented||g==null||g())},w),O=b?z===A.length-1:!1,$=Pa(Z=>{Z.key==="Escape"&&(h==null||h(Z),!Z.defaultPrevented&&g&&(Z.preventDefault(),g()))});return S.useEffect(()=>{if(O)return w.addEventListener("keydown",$,{capture:!0}),()=>w.removeEventListener("keydown",$,{capture:!0})},[w,O,$]),S.useEffect(()=>{if(b)return l&&(x.layersWithOutsidePointerEventsDisabled.size===0&&(Bv=w.body.style.pointerEvents,w.body.style.pointerEvents="none"),x.layersWithOutsidePointerEventsDisabled.add(b)),x.layers.add(b),Id(),()=>{l&&(x.layersWithOutsidePointerEventsDisabled.delete(b),x.layersWithOutsidePointerEventsDisabled.size===0&&(w.body.style.pointerEvents=Bv))}},[b,w,l,x]),S.useEffect(()=>()=>{b&&(x.layers.delete(b),x.layersWithOutsidePointerEventsDisabled.delete(b),Id())},[b,x]),S.useEffect(()=>{const Z=ct(()=>N({}),"handleUpdate");return document.addEventListener(Wd,Z),()=>document.removeEventListener(Wd,Z)},[]),o.jsx($r.div,{...v,ref:C,style:{pointerEvents:L?U?"auto":"none":void 0,...a.style},onFocusCapture:yr(a.onFocusCapture,M.onFocusCapture),onBlurCapture:yr(a.onBlurCapture,M.onBlurCapture),onPointerDownCapture:yr(a.onPointerDownCapture,q.onPointerDownCapture)})},"DismissableLayer"));function w0(){const n=S.useContext(j0),[a,s]=S.useState(null);return S.useEffect(()=>{if(a)return n.dismissableSurfaces.add(a),()=>{n.dismissableSurfaces.delete(a)}},[a,n.dismissableSurfaces]),s}ct(w0,"useDismissableLayerSurface");var XN=ct(()=>!0,"IS_TRUE");function E0(n,a){const{ownerDocument:s=globalThis==null?void 0:globalThis.document,deferPointerDownOutside:l=!1,isDeferredPointerDownOutsideRef:c,dismissableSurfaces:h,shouldHandlePointerDownOutside:d=XN}=a,m=Pa(n),p=S.useRef(!1),g=S.useRef(!1),v=S.useRef(new Map),x=S.useRef(()=>{});return S.useEffect(()=>{function b(){g.current=!1,c.current=!1,v.current.clear()}ct(b,"resetOutsideInteraction");function E(){return Array.from(v.current.values()).some(Boolean)}ct(E,"isOutsideInteractionIntercepted");function w(V){if(!g.current)return;const z=V.target;z instanceof Node&&[...h].some(U=>U.contains(z))||v.current.set(V.type,!0),V.type==="click"&&window.setTimeout(()=>{g.current&&x.current()},0)}ct(w,"handleInteractionCapture");function N(V){g.current&&v.current.set(V.type,!1)}ct(N,"handleInteractionBubble");const C=ct(V=>{if(V.target&&!p.current){let z=function(){s.removeEventListener("click",x.current);const U=E();b(),U||Zf(PN,m,L,{discrete:!0})};if(ct(z,"handleAndDispatchPointerDownOutsideEvent"),!d(V.target)){s.removeEventListener("click",x.current),b(),p.current=!1;return}const L={originalEvent:V};g.current=!0,c.current=l&&V.button===0,v.current.clear(),!l||V.button!==0?z():(s.removeEventListener("click",x.current),x.current=z,s.addEventListener("click",x.current,{once:!0}))}else s.removeEventListener("click",x.current),b();p.current=!1},"handlePointerDown"),A=["pointerup","mousedown","mouseup","touchstart","touchend","click"];for(const V of A)s.addEventListener(V,w,!0),s.addEventListener(V,N);const k=window.setTimeout(()=>{s.addEventListener("pointerdown",C)},0);return()=>{window.clearTimeout(k),s.removeEventListener("pointerdown",C),s.removeEventListener("click",x.current);for(const V of A)s.removeEventListener(V,w,!0),s.removeEventListener(V,N)}},[s,m,l,c,h,d]),{onPointerDownCapture:ct(()=>p.current=!0,"onPointerDownCapture")}}ct(E0,"usePointerDownOutside");function T0(n,a=globalThis==null?void 0:globalThis.document){const s=Pa(n),l=S.useRef(!1);return S.useEffect(()=>{const c=ct(h=>{h.target&&!l.current&&Zf(GN,s,{originalEvent:h},{discrete:!1})},"handleFocus");return a.addEventListener("focusin",c),()=>a.removeEventListener("focusin",c)},[a,s]),{onFocusCapture:ct(()=>l.current=!0,"onFocusCapture"),onBlurCapture:ct(()=>l.current=!1,"onBlurCapture")}}ct(T0,"useFocusOutside");function Id(){const n=new CustomEvent(Wd);document.dispatchEvent(n)}ct(Id,"dispatchUpdate");function Zf(n,a,s,{discrete:l}){const c=s.originalEvent.target,h=new CustomEvent(n,{bubbles:!1,cancelable:!0,detail:s});a&&c.addEventListener(n,a,{once:!0}),l?S0(c,h):c.dispatchEvent(h)}ct(Zf,"handleAndDispatchCustomEvent");var $N=Object.defineProperty,jt=(n,a)=>$N(n,"name",{value:a,configurable:!0}),hd="focusScope.autoFocusOnMount",md="focusScope.autoFocusOnUnmount",Lv={bubbles:!1,cancelable:!0},KN=S.forwardRef(jt(function(a,s){const{loop:l=!1,trapped:c=!1,onMountAutoFocus:h,onUnmountAutoFocus:d,...m}=a,[p,g]=S.useState(null),v=Pa(h),x=Pa(d),b=S.useRef(null),E=Ka(s,g),w=S.useRef({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;S.useEffect(()=>{if(c){let C=function(z){if(w.paused||!p)return;const L=z.target;p.contains(L)?b.current=L:Yn(b.current,{select:!0})},A=function(z){if(w.paused||!p)return;const L=z.relatedTarget;L!==null&&(p.contains(L)||Yn(b.current,{select:!0}))},k=function(z){if(document.activeElement===document.body)for(const U of z)U.removedNodes.length>0&&Yn(p)};jt(C,"handleFocusIn"),jt(A,"handleFocusOut"),jt(k,"handleMutations"),document.addEventListener("focusin",C),document.addEventListener("focusout",A);const V=new MutationObserver(k);return p&&V.observe(p,{childList:!0,subtree:!0}),()=>{document.removeEventListener("focusin",C),document.removeEventListener("focusout",A),V.disconnect()}}},[c,p,w.paused]),S.useEffect(()=>{if(p){Uv.add(w);const C=document.activeElement;if(!p.contains(C)){const k=new CustomEvent(hd,Lv);p.addEventListener(hd,v),p.dispatchEvent(k),k.defaultPrevented||(C0(M0(Qf(p)),{select:!0}),document.activeElement===C&&Yn(p))}return()=>{p.removeEventListener(hd,v),setTimeout(()=>{const k=new CustomEvent(md,Lv);p.addEventListener(md,x),p.dispatchEvent(k),k.defaultPrevented||Yn(C??document.body,{select:!0}),p.removeEventListener(md,x),Uv.remove(w)},0)}}},[p,v,x,w]);const N=S.useCallback(C=>{if(!l&&!c||w.paused)return;const A=C.key==="Tab"&&!C.altKey&&!C.ctrlKey&&!C.metaKey,k=document.activeElement;if(A&&k){const V=C.currentTarget,[z,L]=N0(V);z&&L?!C.shiftKey&&k===L?(C.preventDefault(),l&&Yn(z,{select:!0})):C.shiftKey&&k===z&&(C.preventDefault(),l&&Yn(L,{select:!0})):k===V&&C.preventDefault()}},[l,c,w.paused]);return o.jsx($r.div,{tabIndex:-1,...m,ref:E,onKeyDown:N})},"FocusScope"));function C0(n,{select:a=!1}={}){const s=document.activeElement;for(const l of n)if(Yn(l,{select:a}),document.activeElement!==s)return}jt(C0,"focusFirst");function N0(n){const a=Qf(n),s=ef(a,n),l=ef(a.reverse(),n);return[s,l]}jt(N0,"getTabbableEdges");function Qf(n){const a=[],s=document.createTreeWalker(n,NodeFilter.SHOW_ELEMENT,{acceptNode:jt(l=>{const c=l.tagName==="INPUT"&&l.type==="hidden";return l.disabled||l.hidden||c?NodeFilter.FILTER_SKIP:l.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP},"acceptNode")});for(;s.nextNode();)a.push(s.currentNode);return a}jt(Qf,"getTabbableCandidates");function ef(n,a){const s=typeof a.checkVisibility=="function"&&a.checkVisibility({checkVisibilityCSS:!0});for(const l of n)if(!(s?!l.checkVisibility({checkVisibilityCSS:!0}):D0(l,{upTo:a})))return l}jt(ef,"findVisible");function D0(n,{upTo:a}){if(getComputedStyle(n).visibility==="hidden")return!0;for(;n;){if(a!==void 0&&n===a)return!1;if(getComputedStyle(n).display==="none")return!0;n=n.parentElement}return!1}jt(D0,"isHidden");function A0(n){return n instanceof HTMLInputElement&&"select"in n}jt(A0,"isSelectableInput");function Yn(n,{select:a=!1}={}){if(n&&n.focus){const s=document.activeElement;n.focus({preventScroll:!0}),n!==s&&A0(n)&&a&&n.select()}}jt(Yn,"focus");var Uv=k0();function k0(){let n=[];return{add(a){const s=n[0];a!==s&&(s==null||s.pause()),n=tf(n,a),n.unshift(a)},remove(a){var s;n=tf(n,a),(s=n[0])==null||s.resume()}}}jt(k0,"createFocusScopesStack");function tf(n,a){const s=[...n],l=s.indexOf(a);return l!==-1&&s.splice(l,1),s}jt(tf,"arrayRemove");function M0(n){return n.filter(a=>a.tagName!=="A")}jt(M0,"removeLinks");var ZN=Object.defineProperty,QN=(n,a)=>ZN(n,"name",{value:a,configurable:!0}),JN=S.forwardRef(QN(function(a,s){var p;const{container:l,...c}=a,[h,d]=S.useState(!1);br(()=>d(!0),[]);const m=l||h&&((p=globalThis==null?void 0:globalThis.document)==null?void 0:p.body);return m?Gf.createPortal(o.jsx($r.div,{...c,ref:s}),m):null},"Portal")),WN=Object.defineProperty,Pn=(n,a)=>WN(n,"name",{value:a,configurable:!0});function R0(n,a){return S.useReducer((s,l)=>a[s][l]??s,n)}Pn(R0,"useStateMachine");var Jf=Pn(n=>{const{present:a,children:s}=n,l=O0(a),c=typeof s=="function"?s({present:l.isPresent}):S.Children.only(s),h=z0(l.ref,_0(c));return typeof s=="function"||l.isPresent?S.cloneElement(c,{ref:h}):null},"Presence");function O0(n){const[a,s]=S.useState(),l=S.useRef(null),c=S.useRef(n),h=S.useRef("none"),d=S.useRef(void 0),m=n?"mounted":"unmounted",[p,g]=R0(m,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return S.useEffect(()=>{p==="mounted"?(h.current=d.current??Va(l.current),d.current=void 0):h.current="none"},[p]),br(()=>{const v=l.current,x=c.current;if(x!==n){const E=h.current,w=Va(v);n?(d.current=w,g("MOUNT")):w==="none"||(v==null?void 0:v.display)==="none"?g("UNMOUNT"):g(x&&E!==w?"ANIMATION_OUT":"UNMOUNT"),c.current=n}},[n,g]),br(()=>{if(a){let v;const x=a.ownerDocument.defaultView??window,b=Pn(w=>{const C=Va(l.current).includes(CSS.escape(w.animationName));if(w.target===a&&C&&(g("ANIMATION_END"),!c.current)){const A=a.style.animationFillMode;a.style.animationFillMode="forwards",v=x.setTimeout(()=>{a.style.animationFillMode==="forwards"&&(a.style.animationFillMode=A)})}},"handleAnimationEnd"),E=Pn(w=>{w.target===a&&(h.current=Va(l.current))},"handleAnimationStart");return a.addEventListener("animationstart",E),a.addEventListener("animationcancel",b),a.addEventListener("animationend",b),()=>{x.clearTimeout(v),a.removeEventListener("animationstart",E),a.removeEventListener("animationcancel",b),a.removeEventListener("animationend",b)}}else g("ANIMATION_END")},[a,g]),{isPresent:["mounted","unmountSuspended"].includes(p),ref:S.useCallback(v=>{if(v){const x=getComputedStyle(v);l.current=x,d.current=Va(x)}else l.current=null;s(v)},[])}}Pn(O0,"usePresence");function nf(n,a){if(typeof n=="function")return n(a);n!=null&&(n.current=a)}Pn(nf,"setRef");function z0(...n){const a=S.useRef(n);return a.current=n,S.useCallback(s=>{const l=a.current;let c=!1;const h=l.map(d=>{const m=nf(d,s);return!c&&typeof m=="function"&&(c=!0),m});if(c)return()=>{for(let d=0;d<h.length;d++){const m=h[d];typeof m=="function"?m():nf(l[d],null)}}},[])}Pn(z0,"useStableComposedRefs");function Va(n){return(n==null?void 0:n.animationName)||"none"}Pn(Va,"getAnimationName");function _0(n){var l,c;let a=(l=Object.getOwnPropertyDescriptor(n.props,"ref"))==null?void 0:l.get,s=a&&"isReactWarning"in a&&a.isReactWarning;return s?n.ref:(a=(c=Object.getOwnPropertyDescriptor(n,"ref"))==null?void 0:c.get,s=a&&"isReactWarning"in a&&a.isReactWarning,s?n.props.ref:n.props.ref||n.ref)}Pn(_0,"getElementRef");var IN=Object.defineProperty,Wf=(n,a)=>IN(n,"name",{value:a,configurable:!0}),Vl=0,pn=null;function eD(n){return If(),n.children}Wf(eD,"FocusGuards");function If(){S.useEffect(()=>{pn||(pn={start:rf(),end:rf()});const{start:n,end:a}=pn;return document.body.firstElementChild!==n&&document.body.insertAdjacentElement("afterbegin",n),document.body.lastElementChild!==a&&document.body.insertAdjacentElement("beforeend",a),Vl++,()=>{Vl===1&&(pn==null||pn.start.remove(),pn==null||pn.end.remove(),pn=null),Vl=Math.max(0,Vl-1)}},[])}Wf(If,"useFocusGuards");function rf(){const n=document.createElement("span");return n.setAttribute("data-radix-focus-guard",""),n.tabIndex=0,n.style.outline="none",n.style.opacity="0",n.style.position="fixed",n.style.pointerEvents="none",n}Wf(rf,"createFocusGuard");var vn=function(){return vn=Object.assign||function(a){for(var s,l=1,c=arguments.length;l<c;l++){s=arguments[l];for(var h in s)Object.prototype.hasOwnProperty.call(s,h)&&(a[h]=s[h])}return a},vn.apply(this,arguments)};function V0(n,a){var s={};for(var l in n)Object.prototype.hasOwnProperty.call(n,l)&&a.indexOf(l)<0&&(s[l]=n[l]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var c=0,l=Object.getOwnPropertySymbols(n);c<l.length;c++)a.indexOf(l[c])<0&&Object.prototype.propertyIsEnumerable.call(n,l[c])&&(s[l[c]]=n[l[c]]);return s}function tD(n,a,s){if(s||arguments.length===2)for(var l=0,c=a.length,h;l<c;l++)(h||!(l in a))&&(h||(h=Array.prototype.slice.call(a,0,l)),h[l]=a[l]);return n.concat(h||Array.prototype.slice.call(a))}var Wl="right-scroll-bar-position",Il="width-before-scroll-bar",nD="with-scroll-bars-hidden",rD="--removed-body-scroll-bar-size";function pd(n,a){return typeof n=="function"?n(a):n&&(n.current=a),n}function aD(n,a){var s=S.useState(function(){return{value:n,callback:a,facade:{get current(){return s.value},set current(l){var c=s.value;c!==l&&(s.value=l,s.callback(l,c))}}}})[0];return s.callback=a,s.facade}var iD=typeof window<"u"?S.useLayoutEffect:S.useEffect,Hv=new WeakMap;function sD(n,a){var s=aD(null,function(l){return n.forEach(function(c){return pd(c,l)})});return iD(function(){var l=Hv.get(s);if(l){var c=new Set(l),h=new Set(n),d=s.current;c.forEach(function(m){h.has(m)||pd(m,null)}),h.forEach(function(m){c.has(m)||pd(m,d)})}Hv.set(s,n)},[n]),s}function lD(n){return n}function oD(n,a){a===void 0&&(a=lD);var s=[],l=!1,c={read:function(){if(l)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return s.length?s[s.length-1]:n},useMedium:function(h){var d=a(h,l);return s.push(d),function(){s=s.filter(function(m){return m!==d})}},assignSyncMedium:function(h){for(l=!0;s.length;){var d=s;s=[],d.forEach(h)}s={push:function(m){return h(m)},filter:function(){return s}}},assignMedium:function(h){l=!0;var d=[];if(s.length){var m=s;s=[],m.forEach(h),d=s}var p=function(){var v=d;d=[],v.forEach(h)},g=function(){return Promise.resolve().then(p)};g(),s={push:function(v){d.push(v),g()},filter:function(v){return d=d.filter(v),s}}}};return c}function cD(n){n===void 0&&(n={});var a=oD(null);return a.options=vn({async:!0,ssr:!1},n),a}var B0=function(n){var a=n.sideCar,s=V0(n,["sideCar"]);if(!a)throw new Error("Sidecar: please provide `sideCar` property to import the right car");var l=a.read();if(!l)throw new Error("Sidecar medium not found");return S.createElement(l,vn({},s))};B0.isSideCarExport=!0;function uD(n,a){return n.useMedium(a),B0}var L0=cD(),gd=function(){},Do=S.forwardRef(function(n,a){var s=S.useRef(null),l=S.useState({onScrollCapture:gd,onWheelCapture:gd,onTouchMoveCapture:gd}),c=l[0],h=l[1],d=n.forwardProps,m=n.children,p=n.className,g=n.removeScrollBar,v=n.enabled,x=n.shards,b=n.sideCar,E=n.noRelative,w=n.noIsolation,N=n.inert,C=n.allowPinchZoom,A=n.as,k=A===void 0?"div":A,V=n.gapMode,z=V0(n,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noRelative","noIsolation","inert","allowPinchZoom","as","gapMode"]),L=b,U=sD([s,a]),D=vn(vn({},z),c);return S.createElement(S.Fragment,null,v&&S.createElement(L,{sideCar:L0,removeScrollBar:g,shards:x,noRelative:E,noIsolation:w,inert:N,setCallbacks:h,allowPinchZoom:!!C,lockRef:s,gapMode:V}),d?S.cloneElement(S.Children.only(m),vn(vn({},D),{ref:U})):S.createElement(k,vn({},D,{className:p,ref:U}),m))});Do.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};Do.classNames={fullWidth:Il,zeroRight:Wl};var dD=function(){if(typeof __webpack_nonce__<"u")return __webpack_nonce__};function fD(){if(!document)return null;var n=document.createElement("style");n.type="text/css";var a=dD();return a&&n.setAttribute("nonce",a),n}function hD(n,a){n.styleSheet?n.styleSheet.cssText=a:n.appendChild(document.createTextNode(a))}function mD(n){var a=document.head||document.getElementsByTagName("head")[0];a.appendChild(n)}var pD=function(){var n=0,a=null;return{add:function(s){n==0&&(a=fD())&&(hD(a,s),mD(a)),n++},remove:function(){n--,!n&&a&&(a.parentNode&&a.parentNode.removeChild(a),a=null)}}},gD=function(){var n=pD();return function(a,s){S.useEffect(function(){return n.add(a),function(){n.remove()}},[a&&s])}},U0=function(){var n=gD(),a=function(s){var l=s.styles,c=s.dynamic;return n(l,c),null};return a},yD={left:0,top:0,right:0,gap:0},yd=function(n){return parseInt(n||"",10)||0},vD=function(n){var a=window.getComputedStyle(document.body),s=a[n==="padding"?"paddingLeft":"marginLeft"],l=a[n==="padding"?"paddingTop":"marginTop"],c=a[n==="padding"?"paddingRight":"marginRight"];return[yd(s),yd(l),yd(c)]},xD=function(n){if(n===void 0&&(n="margin"),typeof window>"u")return yD;var a=vD(n),s=document.documentElement.clientWidth,l=window.innerWidth;return{left:a[0],top:a[1],right:a[2],gap:Math.max(0,l-s+a[2]-a[0])}},bD=U0(),Ha="data-scroll-locked",SD=function(n,a,s,l){var c=n.left,h=n.top,d=n.right,m=n.gap;return s===void 0&&(s="margin"),`
  .`.concat(nD,` {
   overflow: hidden `).concat(l,`;
   padding-right: `).concat(m,"px ").concat(l,`;
  }
  body[`).concat(Ha,`] {
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
  
  .`).concat(Wl,` {
    right: `).concat(m,"px ").concat(l,`;
  }
  
  .`).concat(Il,` {
    margin-right: `).concat(m,"px ").concat(l,`;
  }
  
  .`).concat(Wl," .").concat(Wl,` {
    right: 0 `).concat(l,`;
  }
  
  .`).concat(Il," .").concat(Il,` {
    margin-right: 0 `).concat(l,`;
  }
  
  body[`).concat(Ha,`] {
    `).concat(rD,": ").concat(m,`px;
  }
`)},qv=function(){var n=parseInt(document.body.getAttribute(Ha)||"0",10);return isFinite(n)?n:0},jD=function(){S.useEffect(function(){return document.body.setAttribute(Ha,(qv()+1).toString()),function(){var n=qv()-1;n<=0?document.body.removeAttribute(Ha):document.body.setAttribute(Ha,n.toString())}},[])},wD=function(n){var a=n.noRelative,s=n.noImportant,l=n.gapMode,c=l===void 0?"margin":l;jD();var h=S.useMemo(function(){return xD(c)},[c]);return S.createElement(bD,{styles:SD(h,!a,c,s?"":"!important")})},af=!1;if(typeof window<"u")try{var Bl=Object.defineProperty({},"passive",{get:function(){return af=!0,!0}});window.addEventListener("test",Bl,Bl),window.removeEventListener("test",Bl,Bl)}catch{af=!1}var Ra=af?{passive:!1}:!1,ED=function(n){return n.tagName==="TEXTAREA"},H0=function(n,a){if(!(n instanceof Element))return!1;var s=window.getComputedStyle(n);return s[a]!=="hidden"&&!(s.overflowY===s.overflowX&&!ED(n)&&s[a]==="visible")},TD=function(n){return H0(n,"overflowY")},CD=function(n){return H0(n,"overflowX")},Yv=function(n,a){var s=a.ownerDocument,l=a;do{typeof ShadowRoot<"u"&&l instanceof ShadowRoot&&(l=l.host);var c=q0(n,l);if(c){var h=Y0(n,l),d=h[1],m=h[2];if(d>m)return!0}l=l.parentNode}while(l&&l!==s.body);return!1},ND=function(n){var a=n.scrollTop,s=n.scrollHeight,l=n.clientHeight;return[a,s,l]},DD=function(n){var a=n.scrollLeft,s=n.scrollWidth,l=n.clientWidth;return[a,s,l]},q0=function(n,a){return n==="v"?TD(a):CD(a)},Y0=function(n,a){return n==="v"?ND(a):DD(a)},AD=function(n,a){return n==="h"&&a==="rtl"?-1:1},kD=function(n,a,s,l,c){var h=AD(n,window.getComputedStyle(a).direction),d=h*l,m=s.target,p=a.contains(m),g=!1,v=d>0,x=0,b=0;do{if(!m)break;var E=Y0(n,m),w=E[0],N=E[1],C=E[2],A=N-C-h*w;(w||A)&&q0(n,m)&&(x+=A,b+=w);var k=m.parentNode;m=k&&k.nodeType===Node.DOCUMENT_FRAGMENT_NODE?k.host:k}while(!p&&m!==document.body||p&&(a.contains(m)||a===m));return(v&&Math.abs(x)<1||!v&&Math.abs(b)<1)&&(g=!0),g},Ll=function(n){return"changedTouches"in n?[n.changedTouches[0].clientX,n.changedTouches[0].clientY]:[0,0]},Pv=function(n){return[n.deltaX,n.deltaY]},Gv=function(n){return n&&"current"in n?n.current:n},MD=function(n,a){return n[0]===a[0]&&n[1]===a[1]},RD=function(n){return`
  .block-interactivity-`.concat(n,` {pointer-events: none;}
  .allow-interactivity-`).concat(n,` {pointer-events: all;}
`)},OD=0,Oa=[];function zD(n){var a=S.useRef([]),s=S.useRef([0,0]),l=S.useRef(),c=S.useState(OD++)[0],h=S.useState(U0)[0],d=S.useRef(n);S.useEffect(function(){d.current=n},[n]),S.useEffect(function(){if(n.inert){document.body.classList.add("block-interactivity-".concat(c));var N=tD([n.lockRef.current],(n.shards||[]).map(Gv),!0).filter(Boolean);return N.forEach(function(C){return C.classList.add("allow-interactivity-".concat(c))}),function(){document.body.classList.remove("block-interactivity-".concat(c)),N.forEach(function(C){return C.classList.remove("allow-interactivity-".concat(c))})}}},[n.inert,n.lockRef.current,n.shards]);var m=S.useCallback(function(N,C){if("touches"in N&&N.touches.length===2||N.type==="wheel"&&N.ctrlKey)return!d.current.allowPinchZoom;var A=Ll(N),k=s.current,V="deltaX"in N?N.deltaX:k[0]-A[0],z="deltaY"in N?N.deltaY:k[1]-A[1],L,U=N.target,D=Math.abs(V)>Math.abs(z)?"h":"v";if("touches"in N&&D==="h"&&U.type==="range")return!1;var q=window.getSelection(),M=q&&q.anchorNode,O=M?M===U||M.contains(U):!1;if(O)return!1;var $=Yv(D,U);if(!$)return!0;if($?L=D:(L=D==="v"?"h":"v",$=Yv(D,U)),!$)return!1;if(!l.current&&"changedTouches"in N&&(V||z)&&(l.current=L),!L)return!0;var Z=l.current||L;return kD(Z,C,N,Z==="h"?V:z)},[]),p=S.useCallback(function(N){var C=N;if(!(!Oa.length||Oa[Oa.length-1]!==h)){var A="deltaY"in C?Pv(C):Ll(C),k=a.current.filter(function(L){return L.name===C.type&&(L.target===C.target||C.target===L.shadowParent)&&MD(L.delta,A)})[0];if(k&&k.should){C.cancelable&&C.preventDefault();return}if(!k){var V=(d.current.shards||[]).map(Gv).filter(Boolean).filter(function(L){return L.contains(C.target)}),z=V.length>0?m(C,V[0]):!d.current.noIsolation;z&&C.cancelable&&C.preventDefault()}}},[]),g=S.useCallback(function(N,C,A,k){var V={name:N,delta:C,target:A,should:k,shadowParent:_D(A)};a.current.push(V),setTimeout(function(){a.current=a.current.filter(function(z){return z!==V})},1)},[]),v=S.useCallback(function(N){s.current=Ll(N),l.current=void 0},[]),x=S.useCallback(function(N){g(N.type,Pv(N),N.target,m(N,n.lockRef.current))},[]),b=S.useCallback(function(N){g(N.type,Ll(N),N.target,m(N,n.lockRef.current))},[]);S.useEffect(function(){return Oa.push(h),n.setCallbacks({onScrollCapture:x,onWheelCapture:x,onTouchMoveCapture:b}),document.addEventListener("wheel",p,Ra),document.addEventListener("touchmove",p,Ra),document.addEventListener("touchstart",v,Ra),function(){Oa=Oa.filter(function(N){return N!==h}),document.removeEventListener("wheel",p,Ra),document.removeEventListener("touchmove",p,Ra),document.removeEventListener("touchstart",v,Ra)}},[]);var E=n.removeScrollBar,w=n.inert;return S.createElement(S.Fragment,null,w?S.createElement(h,{styles:RD(c)}):null,E?S.createElement(wD,{noRelative:n.noRelative,gapMode:n.gapMode}):null)}function _D(n){for(var a=null;n!==null;)n instanceof ShadowRoot&&(a=n.host,n=n.host),n=n.parentNode;return a}const VD=uD(L0,zD);var P0=S.forwardRef(function(n,a){return S.createElement(Do,vn({},n,{ref:a,sideCar:VD}))});P0.classNames=Do.classNames;var BD=function(n){if(typeof document>"u")return null;var a=Array.isArray(n)?n[0]:n;return a.ownerDocument.body},za=new WeakMap,Ul=new WeakMap,Hl={},vd=0,G0=function(n){return n&&(n.host||G0(n.parentNode))},LD=function(n,a){return a.map(function(s){if(n.contains(s))return s;var l=G0(s);return l&&n.contains(l)?l:(console.error("aria-hidden",s,"in not contained inside",n,". Doing nothing"),null)}).filter(function(s){return!!s})},UD=function(n,a,s,l){var c=LD(a,Array.isArray(n)?n:[n]);Hl[s]||(Hl[s]=new WeakMap);var h=Hl[s],d=[],m=new Set,p=new Set(c),g=function(x){!x||m.has(x)||(m.add(x),g(x.parentNode))};c.forEach(g);var v=function(x){!x||p.has(x)||Array.prototype.forEach.call(x.children,function(b){if(m.has(b))v(b);else try{var E=b.getAttribute(l),w=E!==null&&E!=="false",N=(za.get(b)||0)+1,C=(h.get(b)||0)+1;za.set(b,N),h.set(b,C),d.push(b),N===1&&w&&Ul.set(b,!0),C===1&&b.setAttribute(s,"true"),w||b.setAttribute(l,"true")}catch(A){console.error("aria-hidden: cannot operate on ",b,A)}})};return v(a),m.clear(),vd++,function(){d.forEach(function(x){var b=za.get(x)-1,E=h.get(x)-1;za.set(x,b),h.set(x,E),b||(Ul.has(x)||x.removeAttribute(l),Ul.delete(x)),E||x.removeAttribute(s)}),vd--,vd||(za=new WeakMap,za=new WeakMap,Ul=new WeakMap,Hl={})}},HD=function(n,a,s){s===void 0&&(s="data-aria-hidden");var l=Array.from(Array.isArray(n)?n:[n]),c=BD(n);return c?(l.push.apply(l,Array.from(c.querySelectorAll("[aria-live], script"))),UD(l,c,s,"aria-hidden")):function(){return null}},qD=Object.defineProperty,nn=(n,a)=>qD(n,"name",{value:a,configurable:!0}),eh="Dialog",[F0,XA]=u0(eh),[YD,jn]=F0(eh),po=nn(n=>{const{__scopeDialog:a,children:s,open:l,defaultOpen:c,onOpenChange:h,modal:d=!0}=n,m=S.useRef(null),p=S.useRef(null),[g,v]=h0({prop:l,defaultProp:c??!1,onChange:h,caller:eh}),[x,b]=S.useState(0),[E,w]=S.useState(0);return o.jsx(YD,{scope:a,triggerRef:m,contentRef:p,contentId:Jl(),titleId:Jl(),descriptionId:Jl(),titlePresent:x>0,descriptionPresent:E>0,setTitleCount:b,setDescriptionCount:w,open:g,onOpenChange:v,onOpenToggle:S.useCallback(()=>v(N=>!N),[v]),modal:d,children:s})},"Dialog"),X0="DialogPortal",[PD,$0]=F0(X0,{forceMount:void 0}),go=nn(n=>{const{__scopeDialog:a,forceMount:s,children:l,container:c}=n,h=jn(X0,a);return o.jsx(PD,{scope:a,forceMount:s,children:S.Children.map(l,d=>o.jsx(Jf,{present:s||h.open,children:o.jsx(JN,{asChild:!0,container:c,children:d})}))})},"DialogPortal"),sf="DialogOverlay",yo=S.forwardRef(nn(function(a,s){const l=$0(sf,a.__scopeDialog),{forceMount:c=l.forceMount,...h}=a,d=jn(sf,a.__scopeDialog);return d.modal?o.jsx(Jf,{present:c||d.open,children:o.jsx(FD,{...h,ref:s})}):null},"DialogOverlay")),GD=Kf("DialogOverlay.RemoveScroll"),FD=S.forwardRef(nn(function(a,s){const{__scopeDialog:l,...c}=a,h=jn(sf,l),d=w0(),m=Ka(s,d);return o.jsx(P0,{as:GD,allowPinchZoom:!0,shards:[h.contentRef],children:o.jsx($r.div,{"data-state":th(h.open),...c,ref:m,style:{pointerEvents:"auto",...c.style}})})},"DialogOverlayImpl")),rs="DialogContent",vo=S.forwardRef(nn(function(a,s){const l=$0(rs,a.__scopeDialog),{forceMount:c=l.forceMount,...h}=a,d=jn(rs,a.__scopeDialog);return o.jsx(Jf,{present:c||d.open,children:d.modal?o.jsx(XD,{...h,ref:s}):o.jsx($D,{...h,ref:s})})},"DialogContent")),XD=S.forwardRef(nn(function(a,s){const l=jn(rs,a.__scopeDialog),c=S.useRef(null),h=Ka(s,l.contentRef,c);return S.useEffect(()=>{const d=c.current;if(d)return HD(d)},[]),o.jsx(K0,{...a,ref:h,trapFocus:l.open,disableOutsidePointerEvents:l.open,onCloseAutoFocus:yr(a.onCloseAutoFocus,d=>{var m;d.preventDefault(),(m=l.triggerRef.current)==null||m.focus()}),onPointerDownOutside:yr(a.onPointerDownOutside,d=>{const m=d.detail.originalEvent,p=m.button===0&&m.ctrlKey===!0;(m.button===2||p)&&d.preventDefault()}),onFocusOutside:yr(a.onFocusOutside,d=>d.preventDefault())})},"DialogContentModal")),$D=S.forwardRef(nn(function(a,s){const l=jn(rs,a.__scopeDialog),c=S.useRef(!1),h=S.useRef(!1);return o.jsx(K0,{...a,ref:s,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:d=>{var m,p;(m=a.onCloseAutoFocus)==null||m.call(a,d),d.defaultPrevented||(c.current||(p=l.triggerRef.current)==null||p.focus(),d.preventDefault()),c.current=!1,h.current=!1},onInteractOutside:d=>{var g,v;(g=a.onInteractOutside)==null||g.call(a,d),d.defaultPrevented||(c.current=!0,d.detail.originalEvent.type==="pointerdown"&&(h.current=!0));const m=d.target;((v=l.triggerRef.current)==null?void 0:v.contains(m))&&d.preventDefault(),d.detail.originalEvent.type==="focusin"&&h.current&&d.preventDefault()}})},"DialogContentNonModal")),K0=S.forwardRef(nn(function(a,s){const{__scopeDialog:l,trapFocus:c,onOpenAutoFocus:h,onCloseAutoFocus:d,...m}=a,p=jn(rs,l);return If(),o.jsx(o.Fragment,{children:o.jsx(KN,{asChild:!0,loop:!0,trapped:c,onMountAutoFocus:h,onUnmountAutoFocus:d,children:o.jsx(FN,{role:"dialog",id:p.contentId,"aria-describedby":p.descriptionPresent?p.descriptionId:void 0,"aria-labelledby":p.titlePresent?p.titleId:void 0,"data-state":th(p.open),...m,ref:s,deferPointerDownOutside:!0,onDismiss:()=>p.onOpenChange(!1)})})})},"DialogContentImpl")),KD="DialogTitle",xo=S.forwardRef(nn(function(a,s){const{__scopeDialog:l,...c}=a,h=jn(KD,l),{setTitleCount:d}=h;return br(()=>(d(m=>m+1),()=>d(m=>m-1)),[d]),o.jsx($r.h2,{id:h.titleId,...c,ref:s})},"DialogTitle")),ZD="DialogDescription",bo=S.forwardRef(nn(function(a,s){const{__scopeDialog:l,...c}=a,h=jn(ZD,l),{setDescriptionCount:d}=h;return br(()=>(d(m=>m+1),()=>d(m=>m-1)),[d]),o.jsx($r.p,{id:h.descriptionId,...c,ref:s})},"DialogDescription")),QD="DialogClose",So=S.forwardRef(nn(function(a,s){const{__scopeDialog:l,...c}=a,h=jn(QD,l);return o.jsx($r.button,{type:"button",...c,ref:s,onClick:yr(a.onClick,()=>h.onOpenChange(!1))})},"DialogClose"));function th(n){return n?"open":"closed"}nn(th,"getState");function JD({onCreated:n,onBack:a,onCancel:s}){const[l,c]=S.useState(2),[h,d]=S.useState("日报任务"),[m,p]=S.useState("17:30"),[g,v]=S.useState(!1),[x,b]=S.useState("");async function E(){v(!0),b("");try{const w=await he("daily.create",{name:h.trim(),sendTime:m});await n(w)}catch(w){b(w instanceof Error?w.message:String(w))}finally{v(!1)}}return o.jsxs(o.Fragment,{children:[o.jsx(WD,{current:l}),x&&o.jsx("div",{className:"notice error",role:"alert",children:o.jsxs("div",{children:[o.jsx("strong",{children:"创建失败"}),o.jsx("span",{children:x})]})}),l===2?o.jsxs("div",{className:"automation-create-step",children:[o.jsxs("div",{children:[o.jsx("h3",{children:"基本信息"}),o.jsx("p",{children:"名称用于在自动化任务列表中识别这份日报。"})]}),o.jsxs("label",{children:["任务名称",o.jsx("input",{value:h,autoFocus:!0,onChange:w=>d(w.target.value)})]}),o.jsxs("div",{className:"dialog-actions",children:[o.jsxs("button",{className:"ghost",onClick:a,children:[o.jsx(ns,{}),"返回选择类型"]}),o.jsx("button",{className:"primary",disabled:!h.trim(),onClick:()=>c(3),children:"下一步"})]})]}):o.jsxs("div",{className:"automation-create-step",children:[o.jsxs("div",{children:[o.jsx("h3",{children:"日报必要配置"}),o.jsx("p",{children:"先确定每天的发送时间；消息字段和测试发送在创建后的专用 Tab 中完成。"})]}),o.jsxs("label",{children:["每天发送时间",o.jsx("input",{type:"time",value:m,onChange:w=>p(w.target.value)})]}),o.jsxs("div",{className:"automation-create-summary",children:[o.jsx("span",{children:"任务类型"}),o.jsx("strong",{children:"日报推送"}),o.jsx("span",{children:"创建后继续"}),o.jsx("strong",{children:"消息内容 → 预览与测试"})]}),o.jsxs("div",{className:"dialog-actions",children:[o.jsxs("button",{className:"ghost",disabled:g,onClick:()=>c(2),children:[o.jsx(ns,{}),"上一步"]}),o.jsx("button",{className:"secondary",disabled:g,onClick:s,children:"取消"}),o.jsxs("button",{className:"primary",disabled:g||!m,onClick:E,children:[g&&o.jsx(Sn,{className:"spin"}),"创建任务"]})]})]})]})}function WD({current:n}){return o.jsxs("ol",{className:"automation-create-progress","aria-label":"新建任务进度",children:[o.jsx("li",{className:"done",children:"1 选择类型"}),o.jsx("li",{className:n===2?"current":"done",children:"2 基本信息"}),o.jsx("li",{className:n===3?"current":"",children:"3 必要配置"})]})}function ID({onCreated:n,onBack:a,onCancel:s}){const[l,c]=S.useState(2),[h,d]=S.useState("原材料入库自动填报"),[m,p]=S.useState(""),[g,v]=S.useState(""),[x,b]=S.useState(""),[E,w]=S.useState(!1),[N,C]=S.useState("");async function A(){w(!0),C("");try{const k=await he("notionFill.create",{name:h.trim(),sourcePageUrl:m.trim(),username:g.trim(),password:x});await n(k)}catch(k){C(k instanceof Error?k.message:String(k))}finally{w(!1)}}return o.jsxs(o.Fragment,{children:[o.jsx(eA,{current:l}),N&&o.jsx("div",{className:"notice error",role:"alert",children:o.jsxs("div",{children:[o.jsx("strong",{children:"创建失败"}),o.jsx("span",{children:N})]})}),l===2?o.jsxs("div",{className:"automation-create-step",children:[o.jsxs("div",{children:[o.jsx("h3",{children:"基本信息"}),o.jsx("p",{children:"名称用于在自动化任务列表中识别这份填报任务。"})]}),o.jsxs("label",{children:["任务名称",o.jsx("input",{value:h,autoFocus:!0,onChange:k=>d(k.target.value)})]}),o.jsxs("div",{className:"dialog-actions",children:[o.jsxs("button",{className:"ghost",onClick:a,children:[o.jsx(ns,{}),"返回选择类型"]}),o.jsx("button",{className:"primary",disabled:!h.trim(),onClick:()=>c(3),children:"下一步"})]})]}):o.jsxs("div",{className:"automation-create-step",children:[o.jsxs("div",{children:[o.jsx("h3",{children:"93 系统连接"}),o.jsx("p",{children:"凭据只归 NotionFill 任务所有，并使用现有 Windows 加密存储。"})]}),o.jsxs("label",{children:["材料入库业务页面",o.jsx("input",{type:"url",value:m,placeholder:"http://服务器/业务页面",autoFocus:!0,onChange:k=>p(k.target.value)})]}),o.jsxs("label",{children:["93 系统用户名",o.jsx("input",{value:g,autoComplete:"username",onChange:k=>v(k.target.value)})]}),o.jsxs("label",{children:["93 系统密码",o.jsx("input",{type:"password",value:x,autoComplete:"new-password",onChange:k=>b(k.target.value)})]}),o.jsxs("div",{className:"automation-create-summary",children:[o.jsx("span",{children:"填报目标"}),o.jsx("strong",{children:"原材料入库数据库"}),o.jsx("span",{children:"执行时间"}),o.jsx("strong",{children:"每天 00:00 · 填报前一天"}),o.jsx("span",{children:"写入方式"}),o.jsx("strong",{children:"按日期查重，仅新增"})]}),o.jsxs("div",{className:"dialog-actions",children:[o.jsxs("button",{className:"ghost",disabled:E,onClick:()=>c(2),children:[o.jsx(ns,{}),"上一步"]}),o.jsx("button",{className:"secondary",disabled:E,onClick:s,children:"取消"}),o.jsxs("button",{className:"primary",disabled:E||!m.trim()||!g.trim()||!x,onClick:A,children:[E&&o.jsx(Sn,{className:"spin"}),"创建任务"]})]})]})]})}function eA({current:n}){return o.jsxs("ol",{className:"automation-create-progress","aria-label":"新建任务进度",children:[o.jsx("li",{className:"done",children:"1 选择类型"}),o.jsx("li",{className:n===2?"current":"done",children:"2 基本信息"}),o.jsx("li",{className:n===3?"current":"",children:"3 必要配置"})]})}function Je({value:n,options:a,placeholder:s,disabled:l,ariaLabel:c,onChange:h}){const[d,m]=S.useState(!1),p=Zb(),g=a.find(v=>v.value===n);return o.jsxs("div",{className:"form-picker",children:[o.jsxs("button",{type:"button",className:`picker-trigger ${d?"open":""}`,disabled:l,"aria-label":c,"aria-haspopup":"listbox","aria-expanded":d,onClick:()=>m(!d),children:[o.jsx("span",{className:g?"":"picker-placeholder",children:(g==null?void 0:g.label)||s}),o.jsx(Jb,{})]}),d&&o.jsxs(o.Fragment,{children:[o.jsx("button",{type:"button",className:"picker-backdrop","aria-label":"关闭选项",onClick:()=>m(!1)}),o.jsxs(Yf.div,{className:"picker-popover choice-popover",role:"listbox",initial:p?!1:{opacity:0,y:-5},animate:{opacity:1,y:0,transitionEnd:{transform:"none"}},transition:{duration:p?0:.12},children:[a.map(v=>o.jsxs("button",{type:"button",role:"option","aria-selected":v.value===n,className:v.value===n?"selected":"",onClick:()=>{h(v.value),m(!1)},children:[o.jsx("span",{children:v.label}),v.value===n&&o.jsx(us,{})]},v.value)),!a.length&&o.jsx("span",{className:"picker-empty",children:"暂无可选项"})]})]})]})}function tA({value:n,onChange:a}){const[s,l]=S.useState(!1),c=S.useRef(null),[h="17",d="30"]=n.split(":"),m=(p,g)=>a(`${p}:${g}`);return S.useEffect(()=>{var p;s&&((p=c.current)==null||p.querySelectorAll(".time-column button.selected").forEach(g=>g.scrollIntoView({block:"center"})))},[s,h,d]),o.jsxs("div",{className:"form-picker",children:[o.jsxs("button",{type:"button",className:`picker-trigger time-trigger ${s?"open":""}`,"aria-haspopup":"dialog","aria-expanded":s,onClick:()=>l(!s),children:[o.jsx(YC,{}),o.jsx("span",{children:n}),o.jsx(Jb,{})]}),s&&o.jsxs(o.Fragment,{children:[o.jsx("button",{type:"button",className:"picker-backdrop","aria-label":"关闭时间选择",onClick:()=>l(!1)}),o.jsxs(Yf.div,{ref:c,className:"picker-popover time-popover",role:"dialog","aria-label":"选择发送时间",initial:{opacity:0,y:-5},animate:{opacity:1,y:0,transitionEnd:{transform:"none"}},transition:{duration:.12},children:[[{title:"时",values:Array.from({length:24},(p,g)=>String(g).padStart(2,"0")),selected:h,change:p=>m(p,d)},{title:"分",values:Array.from({length:60},(p,g)=>String(g).padStart(2,"0")),selected:d,change:p=>m(h,p)}].map(p=>o.jsxs("div",{className:"time-column",children:[o.jsx("strong",{children:p.title}),o.jsx("div",{children:p.values.map(g=>o.jsx("button",{type:"button",className:g===p.selected?"selected":"",onClick:()=>p.change(g),children:g},g))})]},p.title)),o.jsx("button",{type:"button",className:"time-done",onClick:()=>l(!1),children:"完成"})]})]})]})}const Fv=["firstTarget","secondTarget","dateHeader","label"],Xv=n=>n.rowStep?`每天向下 ${n.rowStep} 行`:`每天向右 ${n.columnStep} 列`;function nA(){const n=new Intl.DateTimeFormat("en",{timeZone:"Asia/Shanghai",year:"numeric",month:"2-digit"}).formatToParts(new Date);return`${n.find(a=>a.type==="year").value}-${n.find(a=>a.type==="month").value}`}function rA({id:n,metrics:a,initialMetric:s,businessDate:l,rules:c,fixedSheet:h,disabled:d,run:m,onActive:p,onSaved:g}){var $,Z;const[v,x]=S.useState(s||(($=a[0])==null?void 0:$.value)||""),[b]=S.useState(()=>(l==null?void 0:l.slice(0,7))||nA()),[E,w]=S.useState(`${b}-01`),[N,C]=S.useState(`${b}-02`),[A,k]=S.useState(),[V,z]=S.useState({}),[L,U]=S.useState(""),D=!!A,q=((Z=a.find(oe=>oe.value===v))==null?void 0:Z.label)||"业务字段",M={firstTarget:`${E} 的${q}填报格`,secondTarget:`${N} 的${q}填报格`,dateHeader:`${E} 的日期单元格`,label:"项目名称、公司或材料表头"};async function O(oe){U(""),await m(oe==="preview"?"验证排列并定位第三个日期":oe==="confirm"?"保存排列规则":"记录示范位置",async()=>{try{const ue=await he("tencentSheet.teach",{id:n,stage:oe,metric:v,firstDate:E,secondDate:N,sessionToken:A==null?void 0:A.sessionToken,previewToken:A==null?void 0:A.previewToken,slot:A==null?void 0:A.step},3e5);oe==="confirm"||oe==="cancel"?(k(void 0),z({}),p(!1),oe==="confirm"&&await g()):(k(ye=>({...ye,...ue})),p(!0),ue.capture&&ue.slot&&z(ye=>({...ye,[ue.slot]:ue.capture})))}catch(ue){U(ue instanceof Error?ue.message:String(ue)),oe==="cancel"&&(k(void 0),z({}),p(!1))}})}return o.jsxs("fieldset",{className:"tencent-sheet-panel tencent-teaching",disabled:d,children:[o.jsx("legend",{children:"示范填报位置"}),o.jsx("p",{className:"tencent-sheet-help",children:"为每个项目记录排列规则。示范两个日期的位置，程序学习向右或向下的间隔，再请你确认第三个位置。各项业务须完成位置示范。"}),o.jsx("div",{className:"tencent-teaching-rules",children:a.map(oe=>o.jsxs("div",{children:[o.jsx("strong",{children:oe.label}),o.jsx("span",{children:c!=null&&c[oe.value]?Xv(c[oe.value]):"待示范位置"})]},oe.value))}),L&&o.jsx("div",{className:"notice error",role:"alert",children:o.jsxs("div",{children:[o.jsx("strong",{children:"示范未完成"}),o.jsx("span",{children:L})]})}),D?o.jsxs(o.Fragment,{children:[o.jsx("ol",{className:"tencent-teaching-steps","aria-label":"示范进度",children:Fv.map((oe,ue)=>{var ye;return o.jsxs("li",{"aria-current":A.step===oe?"step":void 0,className:V[oe]?"done":"",children:[o.jsxs("span",{children:[ue+1,". ",M[oe]]}),o.jsx("strong",{children:((ye=V[oe])==null?void 0:ye.address)||"待选取"})]},oe)})}),Fv.includes(A.step)&&o.jsxs("div",{className:"tencent-teaching-prompt",children:[o.jsxs("strong",{children:["请在网页中单击：",M[A.step]]}),o.jsx("p",{children:A.step==="dateHeader"?"选择显示该日期的单元格，程序会检查后续日期是否按同样间隔排列。":A.step==="label"?"选择一处固定的文字标志，用于确认每次填写的仍是这个项目。":"只选中单元格即可，不需要输入数据。已有数据的格子也可用于示范。"}),o.jsx("button",{className:"primary",onClick:()=>O("capture"),children:"记住当前选中的单元格"})]}),A.step==="preview"&&o.jsx("button",{className:"primary",onClick:()=>O("preview"),children:"验证规则并查看第三个位置"}),A.step==="confirm"&&A.rule&&A.prediction&&o.jsxs("div",{className:"tencent-teaching-prompt",children:[o.jsxs("strong",{children:[q,"：",Xv(A.rule)]}),o.jsxs("p",{children:["程序已选中 ",A.prediction.date," 的预测位置 ",o.jsx("b",{children:A.prediction.address}),"。请查看网页，确认它确实是当天的填报格。"]}),o.jsxs("p",{children:["日期及“",A.rule.labelAnchor.expected,"”已通过只读校验。"]}),(A.sheetMode==="fixed"||!A.sheetMode&&h)&&!A.rule.dateAnchor.format.includes("{yyyy}")&&o.jsx("p",{children:"日期未包含完整年月。此固定工作表跨月时需重新示范确认。"}),o.jsxs("div",{className:"tencent-sheet-actions",children:[o.jsx("button",{className:"secondary",onClick:()=>O("preview"),children:"再次定位预测位置"}),o.jsx("button",{className:"primary",onClick:()=>O("confirm"),children:"位置正确，保存此项目"})]})]}),o.jsx("button",{className:"ghost",onClick:()=>O("cancel"),children:"取消示范，保留原配置"})]}):o.jsxs(o.Fragment,{children:[o.jsxs("label",{children:["要示范哪个项目？",o.jsx(Je,{value:v,options:a,placeholder:"选择项目",disabled:d,ariaLabel:"要示范的项目",onChange:x})]}),o.jsxs("div",{className:"tencent-sheet-grid",children:[o.jsx(Yt,{value:E,onChange:w,label:"第一个示范日期",disabled:d}),o.jsx(Yt,{value:N,onChange:C,label:"第二个示范日期",disabled:d})]}),o.jsx("p",{className:"tencent-sheet-help",children:"先在网页选中要配置的工作表。两个日期必须在同一个月，建议使用 1 日和 2 日。"}),o.jsx("button",{className:"secondary",disabled:d||!v||!E||!N,onClick:()=>O("start"),children:c!=null&&c[v]?"重新示范此项目":"开始示范此项目"})]})]})}const ql=[{key:"sheetTab",title:"① Sheet 标签",prompt:"请在浏览器中点击任意一个底部 Sheet 标签。程序会识别它所属的集合。"},{key:"cellAddressBox",title:"② 单元格名称框",prompt:"请点击左上角显示当前单元格地址的位置。"},{key:"cellEditor",title:"③ 内容编辑区／公式栏",prompt:"请点击可以读取和输入单元格内容的编辑区，不要选择名称框。"}];function aA({id:n,value:a,disabled:s,onSaved:l,onActive:c}){const[h,d]=S.useState(),[m,p]=S.useState(!1),[g,v]=S.useState(""),[x,b]=S.useState(""),[E,w]=S.useState(!1),[N,C]=S.useState(""),[A,k]=S.useState([]);function V(){C(""),k([])}function z(){d(structuredClone(a??{})),p(!1),b(""),w(!1),V(),c(!0)}async function L(U,D){if(!h)return;v(D??U),w(!1),b(D?ql.find(M=>M.key===D).prompt:"正在操作…");const q=N;U!=="save"&&V();try{const M=await he(`tencentSite.${U}`,{id:n,controls:h,key:D,token:q},3e5);b(M.message),U==="open"&&p(!0),M.controls&&d(M.controls),U==="test"&&(C(M.token??""),k(M.steps)),U==="save"&&(await l(),d(void 0),c(!1))}catch(M){w(!0),b(M instanceof Error?M.message:String(M)),V()}finally{v("")}}return o.jsxs("fieldset",{className:"tencent-web-controls tencent-sheet-panel","aria-busy":!!g,disabled:s,children:[o.jsx("legend",{children:"网页控件"}),o.jsx("p",{className:"tencent-sheet-help",children:"记录本任务的单元格名称框、内容编辑区和 Sheet 标签。业务填写位置在下方独立配置。"}),h?o.jsx(o.Fragment,{children:o.jsxs("fieldset",{className:"tencent-site-fields",disabled:s||!!g,children:[o.jsx("button",{className:"primary",onClick:()=>L("open"),children:m?"重新打开配置文档":"开始配置"}),o.jsxs("div",{className:"tencent-site-recording",children:[o.jsx("div",{className:"tencent-site-controls",children:ql.map(U=>o.jsxs("div",{children:[o.jsx("strong",{children:U.title}),o.jsx("span",{className:"tencent-control-state",children:h[U.key]?"已录制":"未配置"}),o.jsxs("button",{className:"secondary",disabled:!m,onClick:()=>L("pick",U.key),children:["录制",U.key==="sheetTab"?" Sheet 标签":U.key==="cellEditor"?"内容编辑区":"单元格名称框"]})]},U.key))}),o.jsxs("div",{className:"tencent-site-instructions",children:[o.jsx("strong",{children:ql.some(U=>U.key===g)?"正在等待网页点选":"控件录制模式"}),o.jsx("p",{children:"点击左侧录制按钮后，在打开的浏览器中选择控件。鼠标悬停时高亮，点击只记录位置，不执行页面原动作。按 Esc 取消。"}),o.jsx("p",{children:"录制时先识别标签集合；测试时自动切换两个标签并切回，学习选中状态。登录提示自动发现，无需录制。"})]})]}),!!(A!=null&&A.length)&&o.jsx("ol",{className:"tencent-site-results",children:A.map(U=>o.jsxs("li",{children:[o.jsx("strong",{children:U.label}),o.jsx("span",{children:U.detail})]},U.label))}),o.jsx("p",{className:"tencent-sheet-help",children:"测试会在两个标签间切换、学习选中状态，再切回录制标签并定位 J9。不会向业务单元格填写数值。全部通过后才可保存。"}),o.jsxs("div",{className:"tencent-sheet-actions",children:[o.jsx("button",{className:"secondary",disabled:!m||!h.sheetTab||!h.cellAddressBox||!h.cellEditor,onClick:()=>L("test"),children:"测试网页控件"}),o.jsx("button",{className:"primary",disabled:!N,onClick:()=>L("save"),children:"保存网页控件"}),o.jsx("button",{className:"secondary",onClick:()=>{d(void 0),c(!1),V(),b("")},children:"取消"})]})]})}):o.jsxs(o.Fragment,{children:[o.jsx("p",{children:ql.map(U=>`${U.title}：${a!=null&&a[U.key]?"已录制":"待录制"}`).join("　")}),o.jsx("button",{className:"secondary",onClick:z,children:a?"重新录制网页控件":"录制网页控件"})]}),x&&o.jsx("div",{className:`notice ${E?"error":"info"}`,role:E?"alert":"status",children:x})]})}function iA({id:n,field:a,disabled:s,continueToTeaching:l=!1,onSave:c,onCancel:h}){const[d,m]=S.useState(a.notion??{sourceId:"",valueFieldId:"",queryMode:"date",dateFieldId:"",datasetId:"",period:"day"}),[p,g]=S.useState([]),[v,x]=S.useState([]),[b,E]=S.useState([]),[w,N]=S.useState(!1),[C,A]=S.useState(!1),[k,V]=S.useState("");S.useEffect(()=>{let M=!0;return he("tencentSheet.sources",{id:n}).then(O=>{M&&g(O.sources)}).catch(O=>{M&&V(String(O))}),()=>{M=!1}},[n]),S.useEffect(()=>{let M=!0;if(x([]),V(""),N(!1),!!d.sourceId)return N(!0),he("tencentSheet.schema",{id:n,sourceId:d.sourceId}).then(O=>{M&&x(O.fields)}).catch(O=>{M&&V(String(O))}).finally(()=>{M&&N(!1)}),()=>{M=!1}},[n,d.sourceId]),S.useEffect(()=>{let M=!0;if(E([]),A(!1),!(d.queryMode!=="view"||!d.sourceId))return A(!0),he("tencentSheet.views",{id:n,sourceId:d.sourceId},12e4).then(O=>{M&&E(O.views)}).catch(O=>{M&&V(String(O))}).finally(()=>{M&&A(!1)}),()=>{M=!1}},[n,d.sourceId,d.queryMode]);const z=M=>M.map(O=>({value:O.id,label:O.name})),L=v.filter(M=>["number","formula","rollup"].includes(M.type??"")),U=v.filter(M=>M.type==="date"),D=s||w||d.queryMode==="view"&&C,q=p.some(M=>M.id===d.sourceId)&&L.some(M=>M.id===d.valueFieldId)&&(d.queryMode==="date"?U.some(M=>M.id===d.dateFieldId):b.some(M=>M.id===d.datasetId));return o.jsxs("fieldset",{className:"tencent-sheet-panel",disabled:s,children:[o.jsxs("legend",{children:["绑定 Notion：",a.name]}),o.jsx("p",{className:"tencent-sheet-help",children:"选择这个业务字段的数据来源，默认获取本次业务日期当天的数据；例如补填 8 月 31 日，就查询 8 月 31 日。保存后接着录制网页位置。"}),o.jsxs("label",{children:["Notion 数据库",o.jsx(Je,{value:d.sourceId,options:z(p),placeholder:"选择已有数据库",ariaLabel:"Notion 数据库",disabled:D,onChange:M=>m({...d,sourceId:M,valueFieldId:"",dateFieldId:"",datasetId:""})})]}),o.jsxs("label",{children:["取数方式",o.jsx(Je,{value:d.queryMode,options:[{value:"date",label:"按业务日期筛选后汇总"},{value:"view",label:"汇总指定 View 的筛选结果"}],placeholder:"选择取数方式",disabled:D,onChange:M=>{V(""),m({...d,queryMode:M})}})]}),o.jsxs("div",{className:"tencent-sheet-grid",children:[o.jsxs("label",{children:["数值字段",o.jsx(Je,{value:d.valueFieldId,options:z(L),placeholder:"选择要汇总的数值字段",disabled:D,onChange:M=>m({...d,valueFieldId:M})})]}),d.queryMode==="date"?o.jsxs("label",{children:["日期字段",o.jsx(Je,{value:d.dateFieldId,options:z(U),placeholder:"选择用于筛选的日期字段",disabled:D,onChange:M=>m({...d,dateFieldId:M})})]}):o.jsxs("label",{children:["Notion View",o.jsx(Je,{value:d.datasetId,options:z(b),placeholder:"选择真实 View",disabled:D,onChange:M=>m({...d,datasetId:M})})]})]}),d.queryMode==="date"?o.jsxs("label",{children:["统计范围",o.jsx(Je,{value:d.period,options:[{value:"day",label:"业务日期当天"},{value:"month",label:"业务日期所在月月初至该日"},{value:"year",label:"业务日期所在年年初至该日"}],placeholder:"选择统计范围",disabled:D,onChange:M=>m({...d,period:M})})]}):o.jsx("p",{className:"tencent-sheet-help",children:"使用该 View 在 Notion 中的真实筛选结果，不额外添加日期条件。需要业务日期当天的数据，请使用按业务日期筛选。"}),(w||C)&&o.jsx("p",{role:"status",children:"正在读取数据库结构…"}),k&&o.jsx("p",{role:"alert",children:k}),o.jsxs("div",{className:"tencent-sheet-actions",children:[o.jsx("button",{className:"primary",disabled:D||!q,onClick:()=>{var M,O,$;return c({...d,sourceName:(M=p.find(Z=>Z.id===d.sourceId))==null?void 0:M.name,valueFieldName:(O=L.find(Z=>Z.id===d.valueFieldId))==null?void 0:O.name,datasetName:($=b.find(Z=>Z.id===d.datasetId))==null?void 0:$.name})},children:l?"下一步 · 录制位置":"保存数据绑定"}),o.jsx("button",{className:"secondary",disabled:s,onClick:h,children:"稍后继续"})]})]})}const Z0={weekdays:[1,2,3,4,5,6,0],times:["08:00"]},sA=["周日","周一","周二","周三","周四","周五","周六"];function lA({rule:n,schedule:a,disabled:s,onChange:l}){const[c,h]=S.useState(n.kind==="relative"&&![-1,0].includes(n.offsetDays)),d=n.kind==="fixed"?"fixed":c?"offset":n.offsetDays===0?"today":"previous";return o.jsxs("fieldset",{className:"tencent-sheet-panel",disabled:s,children:[o.jsx("legend",{children:"执行规则"}),o.jsx("p",{className:"tencent-sheet-help",children:"执行时间决定什么时候开始；业务日期决定取哪天的数据、选择哪个月份的工作表、填写哪个位置。以下规则可独立组合。"}),o.jsxs("div",{className:"tencent-sheet-grid",children:[o.jsxs("label",{children:["执行频率",o.jsx(Je,{value:a.weekdays.length===7?"daily":"weekly",options:[{value:"daily",label:"每天"},{value:"weekly",label:"指定星期"}],placeholder:"选择执行频率",disabled:s,onChange:m=>l(n,{...a,weekdays:m==="daily"?[...Z0.weekdays]:[1,2,3,4,5]})})]}),o.jsxs("label",{children:["业务日期",o.jsx(Je,{value:d,options:[{value:"previous",label:"执行当天的前一天"},{value:"today",label:"执行当天"},{value:"offset",label:"相对执行当天偏移 N 天"},{value:"fixed",label:"指定固定日期"}],placeholder:"选择业务日期规则",disabled:s,onChange:m=>{h(m==="offset"),l(m==="fixed"?{kind:"fixed",date:""}:{kind:"relative",offsetDays:m==="today"?0:n.kind==="relative"&&m==="offset"?n.offsetDays:-1},a)}})]})]}),a.weekdays.length!==7&&o.jsx("div",{className:"tencent-sheet-actions",role:"group","aria-label":"执行星期",children:[1,2,3,4,5,6,0].map(m=>o.jsxs("label",{className:"tencent-sheet-date-mode",children:[o.jsx("input",{type:"checkbox",checked:a.weekdays.includes(m),onChange:p=>l(n,{...a,weekdays:p.target.checked?[...a.weekdays,m]:a.weekdays.filter(g=>g!==m)})}),sA[m]]},m))}),d==="offset"&&n.kind==="relative"&&o.jsxs("label",{children:["偏移天数（负数向前，正数向后）",o.jsx("input",{type:"number",min:"-3660",max:"3660",step:"1",value:Number.isFinite(n.offsetDays)?n.offsetDays:"",onChange:m=>l({kind:"relative",offsetDays:m.target.value===""?NaN:Number(m.target.value)},a)})]}),n.kind==="fixed"&&o.jsx(Yt,{label:"固定业务日期",value:n.date,onChange:m=>l({kind:"fixed",date:m},a),disabled:s}),o.jsx("div",{className:"tencent-sheet-grid",children:a.times.map((m,p)=>o.jsxs("div",{children:[o.jsxs("label",{children:["执行时刻 ",p+1,"（北京时间）"]}),o.jsxs("div",{className:"tencent-sheet-actions",children:[o.jsx(tA,{value:m,onChange:g=>l(n,{...a,times:a.times.map((v,x)=>x===p?g:v)})}),o.jsxs("button",{className:"ghost",disabled:a.times.length===1,onClick:()=>l(n,{...a,times:a.times.filter((g,v)=>v!==p)}),children:["移除时刻 ",p+1]})]})]},p))}),o.jsx("button",{className:"secondary",disabled:a.times.length>=24,onClick:()=>{const m=Array.from({length:24},(p,g)=>`${String(g).padStart(2,"0")}:00`).find(p=>!a.times.includes(p));m&&l(n,{...a,times:[...a.times,m]})},children:"添加执行时刻"}),o.jsx("p",{className:"tencent-sheet-help",children:"保存规则不会自动启用定时。先完成前台或后台测试；当前配置后台测试通过后，可在任务列表启用定时。临时补填日期只影响本次测试。"})]})}const lf=n=>n instanceof Error?n.message:String(n);function oA({onCreated:n,onCancel:a}){const[s,l]=S.useState(""),[c,h]=S.useState(!1),[d,m]=S.useState("");async function p(){h(!0),m("");try{await n(await he("tencentSheet.create",{documentUrl:s}))}catch(g){m(lf(g))}finally{h(!1)}}return o.jsxs("div",{className:"automation-create-step",children:[o.jsxs("div",{children:[o.jsx("h3",{children:"新建文档填报任务"}),o.jsx("p",{children:"填写文档链接，进入任务后分别配置网页控件、业务位置和执行规则。"})]}),o.jsxs("label",{children:["文档分享链接",o.jsx("input",{type:"url",disabled:c,value:s,onChange:g=>l(g.target.value),placeholder:"粘贴腾讯文档或企业微信文档链接"})]}),d&&o.jsx("p",{role:"alert",children:d}),o.jsxs("div",{className:"dialog-actions",children:[o.jsx("button",{className:"secondary",disabled:c,onClick:a,children:"取消"}),o.jsxs("button",{className:"primary",disabled:c||!s.trim(),onClick:p,children:[c&&o.jsx(Sn,{className:"spin"}),"创建并配置"]})]})]})}function cA({id:n,changed:a}){var me,Ce;const[s,l]=S.useState(),[c,h]=S.useState(""),[d,m]=S.useState(""),[p,g]=S.useState(!1),[v,x]=S.useState(!1),[b,E]=S.useState(""),[w,N]=S.useState(),[C,A]=S.useState(!1),[k,V]=S.useState(!1),[z,L]=S.useState(!1),[U,D]=S.useState([]),[q,M]=S.useState(""),[O,$]=S.useState(""),[Z,oe]=S.useState(""),[ue,ye]=S.useState(""),Y=S.useRef(null),[ae,W]=S.useState(),G=()=>he("tencentSheet.get",{id:n}).then(l);S.useEffect(()=>{let Q=!0;return he("tencentSheet.get",{id:n}).then(be=>{Q&&l(be)}).catch(be=>{Q&&(g(!0),m(lf(be)))}),()=>{Q=!1}},[n]),S.useEffect(()=>{var Q,be;(Z||ue)&&((be=(Q=Y.current)==null?void 0:Q.scrollIntoView)==null||be.call(Q,{block:"start"}))},[Z,ue]);async function ee(Q,be){h(Q),m(""),g(!1);try{await be()}catch(_e){g(!0),m(lf(_e))}finally{h("")}}function T(){W(void 0),N(void 0)}function _(Q){l(be=>be&&{...be,config:Q}),A(!0),T()}async function re(Q,be){var _e;T(),l(await he("tencentSheet.updateField",{id:n,fieldId:Q.id,name:Q.name,unit:Q.unit,...be?{notion:be}:{}})),ye(""),(_e=s==null?void 0:s.config.rules)!=null&&_e[Q.id]||(oe(xe?Q.id:""),m(xe?"数据来源已保存，接着示范这个字段的两个日期位置。":"数据来源已保存。录制网页控件后，再示范这个字段的填写位置。")),a()}async function le(){if(!s)return;const Q=await he("tencentSheet.save",{id:n,config:s.config,configRevision:s.configRevision??0});l(Q),A(!1),T(),a()}async function de(Q){C&&await le(),T();const be=await he(`tencentSheet.${Q}`,{id:n},3e5);m(be.message),be.sheets&&D([...new Set(be.sheets)]),await G()}if(!s)return o.jsx("div",{className:"notice",role:"status",children:d||"正在读取填报配置…"});const ce=s.config,xe=!!((me=ce.webControls)!=null&&me.sheetTab&&ce.webControls.cellAddressBox&&ce.webControls.cellEditor),ie=ce.fields??[],J=ie.find(Q=>Q.id===Z),fe=ie.find(Q=>Q.id===ue),te=!!c||k||!!fe||z;return o.jsxs("div",{className:"tencent-sheet-workbench","aria-busy":!!c,children:[o.jsxs("div",{className:"tencent-sheet-intro",children:[o.jsxs("div",{children:[o.jsx("h2",{children:"腾讯文档填报"}),o.jsx("p",{children:"在同一任务中配置网页控件、业务位置和执行规则。目标格已有内容时会停止。"})]}),o.jsx("span",{children:"Development 测试"})]}),d&&o.jsx("div",{className:`notice ${p?"error":"info"}`,role:p?"alert":"status",children:o.jsxs("div",{children:[o.jsx("strong",{children:p?"操作未完成":"操作结果"}),o.jsx("span",{children:d})]})}),o.jsxs("fieldset",{disabled:te,className:"tencent-sheet-panel",children:[o.jsx("legend",{children:"文档"}),o.jsxs("label",{children:["文档链接",o.jsx("input",{type:"url",disabled:s.enabled,value:ce.documentUrl,onChange:Q=>_({...ce,documentUrl:Q.target.value})})]}),o.jsxs("div",{className:"tencent-sheet-actions",children:[o.jsx("button",{className:"secondary",onClick:()=>ee("打开文档",()=>de("open")),children:"打开文档 / 扫码登录"}),o.jsx("button",{className:"primary",disabled:s.enabled,onClick:()=>ee("识别页面",()=>de("recognize")),children:"识别并检查"})]}),o.jsx("button",{className:"secondary",onClick:()=>ee("结束前台会话",async()=>{T();const Q=await he("tencentSheet.close",{id:n});m(Q.message)}),children:"结束前台会话"}),o.jsx("p",{className:"tencent-sheet-help",children:"首次使用扫码登录。识别会检查已保存控件并读取工作表名称，不填写数据。"}),!!U.length&&o.jsxs("label",{children:["工作表名称",o.jsx(Je,{value:ce.sheetReferenceName??ce.capturedSheet??ce.sheetName??"",options:U.map(Q=>({value:Q,label:Q})),placeholder:"选择识别到的工作表名称",disabled:te,onChange:Q=>_({...ce,sheetReferenceName:Q})})]}),(ce.sheetReferenceName||ce.capturedSheet||ce.sheetMode==="fixed")&&o.jsxs("p",{className:"tencent-sheet-help",children:["工作表：",ce.sheetReferenceName??ce.capturedSheet??ce.sheetName," · 执行时按名称匹配，年月使用本次业务日期。"]})]}),C&&o.jsx("button",{className:"primary",disabled:te,onClick:()=>ee("保存任务配置",async()=>{await le(),m("任务配置已保存。保存规则不会自动启用定时。")}),children:"保存任务配置"}),o.jsx(aA,{id:n,value:ce.webControls,disabled:!!c||k||!!fe||C||!!s.enabled,onActive:Q=>{L(Q),Q&&T()},onSaved:async()=>{await G(),T(),a()}},n),o.jsxs("fieldset",{disabled:te||C||s.enabled,className:"tencent-sheet-panel",children:[o.jsx("legend",{children:"业务字段与填写位置"}),o.jsx("p",{className:"tencent-sheet-help",children:"填写业务名称 → 选择 Notion 数据库和数值字段 → 连续录制位置。取数、月份和位置共用本次业务日期。"}),o.jsxs("div",{className:"tencent-sheet-grid",children:[o.jsxs("label",{children:["业务字段名称",o.jsx("input",{value:q,placeholder:"例如：合格数量",onChange:Q=>M(Q.target.value)})]}),o.jsxs("label",{children:["单位（可选）",o.jsx("input",{value:O,placeholder:"例如：件",onChange:Q=>$(Q.target.value)})]})]}),o.jsx("button",{className:"primary",disabled:!q.trim(),onClick:()=>ee("新增业务字段",async()=>{var be,_e;T();const Q=await he("tencentSheet.addField",{id:n,name:q,unit:O});l(Q),oe(""),ye(((_e=(be=Q.config.fields)==null?void 0:be.at(-1))==null?void 0:_e.id)??""),M(""),$(""),a()}),children:"下一步 · 选择数据库"}),!ie.length&&o.jsx("p",{children:"还没有业务字段，请先新增。新文档没有预设业务。"}),o.jsx("div",{className:"tencent-sheet-guidance",children:ie.map(Q=>{var be;return o.jsxs("div",{children:[o.jsxs("span",{children:[o.jsxs("strong",{children:[Q.name,Q.unit?`（${Q.unit}）`:""]}),o.jsxs("small",{className:"tencent-control-state",children:[(be=ce.rules)!=null&&be[Q.id]?"位置已示范":"待示范位置"," · ",Q.notion?`${Q.notion.sourceName??"Notion"} / ${Q.notion.valueFieldName??"数值字段"}`:"待绑定数据库"]})]}),o.jsxs("div",{className:"tencent-sheet-actions",children:[o.jsxs("button",{className:"secondary",disabled:!xe||!Q.notion,onClick:()=>{oe(Q.id),T()},children:["示范位置：",Q.name]}),o.jsxs("button",{className:"secondary",onClick:()=>{ye(Q.id),oe(""),T()},children:["绑定数据：",Q.name]}),o.jsxs("button",{className:"ghost",onClick:()=>ee("删除业务字段",async()=>{T(),l(await he("tencentSheet.deleteField",{id:n,fieldId:Q.id})),Z===Q.id&&oe(""),a()}),children:["删除：",Q.name]})]})]},Q.id)})})]}),(J||fe)&&o.jsxs("div",{ref:Y,children:[J&&!fe&&o.jsx(rA,{id:n,businessDate:v&&b?b:s.businessDate,metrics:[{value:J.id,label:J.name}],initialMetric:J.id,rules:ce.rules,fixedSheet:ce.sheetMode==="fixed",disabled:!!c||C||z,run:ee,onActive:Q=>{V(Q),Q&&T()},onSaved:async()=>{await G(),T(),oe(""),m("这个业务字段的数据来源和填报位置已配置完成，可以新增下一个字段或获取本次数据。"),a()}},`${n}:${J.id}:${JSON.stringify(ce.rules)}`),fe&&o.jsx(iA,{id:n,field:fe,continueToTeaching:xe&&!((Ce=ce.rules)!=null&&Ce[fe.id]),disabled:!!c,onCancel:()=>ye(""),onSave:Q=>ee("保存数据绑定",()=>re(fe,Q))},fe.id)]}),o.jsx(lA,{rule:ce.businessDateRule??{kind:"relative",offsetDays:-1},schedule:ce.executionSchedule??Z0,disabled:te||!!s.enabled,onChange:(Q,be)=>_({...ce,businessDateRule:Q,executionSchedule:be})}),o.jsxs("fieldset",{disabled:te||C,className:"tencent-sheet-panel",children:[o.jsx("legend",{children:"前台测试"}),o.jsxs("label",{className:"tencent-sheet-date-mode",children:[o.jsx("input",{type:"checkbox",checked:v,onChange:Q=>{x(Q.target.checked),T()}}),"指定补填日期"]}),v?o.jsx(Yt,{label:"本次业务日期",disabled:!!c,value:b,onChange:Q=>{E(Q),T()}}):o.jsxs("p",{children:["按已保存规则计算的业务日期：",(ae==null?void 0:ae.date)??s.businessDate??"获取数据时确定","。本次取数后日期固定，检查与填报沿用同一天。"]}),o.jsx("button",{className:"secondary",disabled:!ie.length||v&&!b||ie.some(Q=>{var be;return!((be=ce.rules)!=null&&be[Q.id])||!Q.notion}),onClick:()=>ee("获取 Notion 数据",async()=>{T(),W(await he("tencentSheet.fetch",{id:n,businessDate:v?b:void 0},3e5)),m("取数完成，请核对来源、日期和数值后检查网页位置。")}),children:"获取本次 Notion 数据"}),ae&&o.jsxs("div",{className:"tencent-sheet-table",children:[o.jsxs("p",{children:["业务日期：",ae.date]}),o.jsxs("table",{children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{children:"业务字段"}),o.jsx("th",{children:"数值"}),o.jsx("th",{children:"来源与范围"}),o.jsx("th",{children:"记录数"})]})}),o.jsx("tbody",{children:ae.rows.map(Q=>o.jsxs("tr",{children:[o.jsx("td",{children:Q.name}),o.jsxs("td",{children:[Q.value," ",Q.unit]}),o.jsxs("td",{children:[Q.source," · ",Q.period]}),o.jsx("td",{children:Q.recordCount})]},Q.id))})]})]}),o.jsx("button",{className:"primary",disabled:!ie.length||v&&!b||!ae,onClick:()=>ee("检查填报位置",async()=>{N(void 0);const Q=await he("tencentSheet.inspect",{id:n,dataToken:ae==null?void 0:ae.dataToken,businessDate:(ae==null?void 0:ae.date)??(v?b:void 0)},3e5);N(Q),m(Q.message),a()}),children:"检查本次数据与位置"})]}),o.jsxs("fieldset",{disabled:te||C,className:"tencent-sheet-panel",children:[o.jsx("legend",{children:"后台自动测试"}),o.jsx("p",{className:"tencent-sheet-help",children:"按本次业务日期重新取数，自动检查位置、填写空白格并确认保存。这会真实写入文档。测试时关闭前台填报浏览器，复用登录状态在后台运行；失败后可重新打开文档检查。"}),o.jsx("p",{className:"tencent-sheet-help",children:"所有字段须绑定 Notion。测试通过后，可在任务列表启用定时；当前环境须开放 Windows 调度，电脑须开机且用户已登录。已有执行记录的业务日期不会由定时再次填写。"}),o.jsx("button",{className:"primary",disabled:!ie.length||ie.some(Q=>{var be;return!Q.notion||!((be=ce.rules)!=null&&be[Q.id])})||v&&!b,onClick:()=>ee("后台取数、填报并确认保存",async()=>{T();try{const Q=await he("tencentSheet.backgroundTest",{id:n,businessDate:v?b:void 0},6e5);m(Q.message)}finally{await G(),a()}}),children:"后台自动测试并填写"}),s.enabled&&o.jsx("p",{className:"tencent-sheet-help",children:"定时填报已启用。修改配置前请先在任务列表停用。"})]}),w&&o.jsxs("section",{className:"tencent-sheet-panel",children:[o.jsx("h3",{children:"确认填报"}),o.jsxs("p",{children:["业务日期：",w.date," · ",w.sheet]}),o.jsx("div",{className:"tencent-sheet-table",children:o.jsxs("table",{children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{children:"项目"}),o.jsx("th",{children:"位置"}),o.jsx("th",{children:"原内容"}),o.jsx("th",{children:"本次填报"})]})}),o.jsx("tbody",{children:w.rows.map(Q=>o.jsxs("tr",{children:[o.jsx("td",{children:Q.label}),o.jsx("td",{children:Q.address}),o.jsx("td",{children:Q.current||"空白"}),o.jsx("td",{children:Q.value})]},Q.address))})]})}),o.jsx("p",{children:w.conflict?"目标格已有内容，本次不可写入。":"将仅填写以上空白单元格。确认有效期为 2 分钟。"}),o.jsxs("button",{className:"primary",disabled:te||!w.token||w.conflict,onClick:()=>ee("填报并确认保存",async()=>{const Q=w;N(void 0);const be=await he("tencentSheet.write",{id:n,dataToken:ae==null?void 0:ae.dataToken,businessDate:Q.date,token:Q.token},31e4);m(be.message),a()}),children:["确认填报以上 ",w.rows.length," 项"]})]}),c&&o.jsxs("p",{role:"status",className:"tencent-sheet-progress",children:[o.jsx(Sn,{className:"spin"}),c,"… 请等待操作结束"]})]})}const Q0=[{taskType:"tencent_sheet_fill",name:"腾讯文档填报",includeBasics:!1,description:"录制文档控件与业务位置，按执行规则从 Notion 取数填报。",renderCreate:n=>o.jsx(oA,{...n}),taskTabs:[{id:"configuration",label:"配置与填报"}],resolveSection:()=>"configuration",issueTitle:()=>"请完成文档连接与位置检查",renderEditor:n=>o.jsx(cA,{id:n.id,changed:n.changed},n.id),loadRuns:n=>he("tencentSheet.runs",{id:n}).then(({runs:a})=>a.map(s=>({...s,source:s.source==="background-test"?"后台自动测试":s.source==="automatic"?"定时填报":"前台测试",title:s.businessDate,details:s.message?[s.message]:[]})))},{taskType:"daily_report",name:"日报推送",description:"查询日报数据、生成消息并发送钉钉。",renderCreate:n=>o.jsx(JD,{...n}),taskTabs:[{id:"configuration",label:"任务配置"},{id:"execution",label:"运行与测试"}],resolveSection:n=>n==="basics"?"basics":n==="template"?"configuration":"execution",issueTitle:n=>n==="notification"?"通知渠道未就绪":n==="template"?"日报配置尚未验证":"基本信息不完整",renderEditor:n=>o.jsx(a0,{id:n.id,back:()=>n.navigate("list"),changed:n.changed,openSettings:n.openSettings}),loadRuns:n=>he("daily.runs",{id:n}).then(({runs:a})=>a.map(s=>({id:s.id,time:s.time,source:s.source,status:s.status,title:s.textSummary||`业务日期 ${s.businessDate||"—"}`,details:[`业务日期：${s.businessDate||"—"}`,`阶段：${s.stage}`,`尝试：${s.attempts}`],error:s.error})))},{taskType:"notion_fill",name:"Notion 自动填报",description:"读取 93 系统前一天入库数据并新增到 Notion。",renderCreate:n=>o.jsx(ID,{...n}),taskTabs:[{id:"configuration",label:"任务配置"},{id:"execution",label:"运行与测试"}],resolveSection:n=>n==="basics"?"basics":n==="test"?"execution":"configuration",issueTitle:n=>n==="connection"?"93 系统连接未就绪":n==="target"?"Notion 填报目标未就绪":n==="test"?"任务尚未完成只读测试":"基本信息不完整",renderEditor:n=>o.jsx(i0,{id:n.id,back:()=>n.navigate("list"),changed:n.changed,openSettings:n.openSettings}),loadRuns:n=>he("notionFill.runs",{id:n}).then(({runs:a})=>a.map(s=>({id:s.id,time:s.time,source:s.source==="source-test"?"93读取测试":s.source==="test"?"只读测试":s.source==="manual"?"手动执行":"自动执行",status:s.status==="created"?"已新增":s.status==="checked"?"已检查":"失败",title:`${s.businessDate} · 板材 ${s.plateWeight.toLocaleString("zh-CN",{maximumFractionDigits:3})} 吨 · 型材 ${s.sectionWeight.toLocaleString("zh-CN",{maximumFractionDigits:3})} 吨`,details:[s.message].filter(Boolean),error:s.error})))}];function $v(n){return Q0.find(a=>a.taskType===n)}const xd=n=>({tone:"error",title:"操作失败",message:n instanceof Error?n.message:String(n)});function uA({openSettings:n}){var M;const[a,s]=S.useState([]),[l,c]=S.useState(),[h,d]=S.useState(""),[m,p]=S.useState(""),[g,v]=S.useState(),[x,b]=S.useState(),[E,w]=S.useState(),[N,C]=S.useState(!1),[A,k]=S.useState(""),[V,z]=S.useState(["daily_report","notion_fill"]),L=()=>he("automation.list").then(O=>{O.availableTaskTypes&&z(O.availableTaskTypes);const $=Array.isArray(O.tasks)?O.tasks:a;return s($),c(Z=>Z&&($.find(oe=>oe.taskType===Z.taskType&&oe.id===Z.id)||Z)),$});S.useEffect(()=>{L().catch(O=>v(xd(O)))},[]),S.useEffect(()=>{if(!x)return;const O=()=>b(void 0),$=Z=>Z.key==="Escape"&&O();return window.addEventListener("pointerdown",O),window.addEventListener("keydown",$),window.addEventListener("blur",O),()=>{window.removeEventListener("pointerdown",O),window.removeEventListener("keydown",$),window.removeEventListener("blur",O)}},[x]);async function U(O,$){const Z=await L();C(!1),k(""),c(Z.find(oe=>oe.taskType===O&&oe.id===$.id))}async function D(O){p(O.id),v(void 0);try{const $=await he("automation.setEnabled",{taskType:O.taskType,id:O.id,enabled:!O.isEnabled},6e4);$.missingStep?(d($.missingStep),c(O),v({tone:"warning",title:"配置尚未完成",message:$.message||""})):await L()}catch($){v(xd($))}finally{p("")}}async function q(O){if(!O.isEnabled){p(O.id);try{await he("automation.delete",{taskType:O.taskType,id:O.id}),w(void 0),await L()}catch($){v(xd($))}finally{p("")}}}if(l){const O=$v(l.taskType);if(O)return o.jsx(dA,{openSettings:n,task:l,definition:O,focusStep:h,notice:g,refresh:L,back:()=>{c(void 0),d(""),v(void 0),L()}})}return o.jsxs("div",{className:"page daily-page automation-list-page",children:[o.jsxs("header",{children:[o.jsxs("div",{children:[o.jsx("h1",{children:"自动化任务"}),o.jsx("p",{children:"管理定时推送与自动填报，查看任务配置和运行情况。"})]}),o.jsx("div",{className:"header-actions",children:o.jsxs("button",{className:"primary",onClick:()=>C(!0),children:[o.jsx($C,{}),"新建任务"]})})]}),g&&o.jsx("div",{className:`notice ${g.tone}`,role:"status",children:o.jsxs("div",{children:[o.jsx("strong",{children:g.title}),o.jsx("span",{children:g.message})]})}),o.jsxs("section",{className:"daily-job-list","aria-label":"任务列表",children:[a.map(O=>o.jsxs("article",{className:`daily-job-card${["incomplete","pending-test","schedule-error"].includes(O.status)?" needs-attention":""}`,onClick:()=>c(O),onContextMenu:$=>{$.preventDefault(),b({task:O,x:Math.min($.clientX,window.innerWidth-176),y:Math.min($.clientY,window.innerHeight-58)})},children:[o.jsxs("div",{className:"job-copy",children:[o.jsx("h2",{children:o.jsx("button",{type:"button",className:"automation-task-name",onClick:$=>{$.stopPropagation(),c(O)},children:O.name||"未命名任务"})}),o.jsxs("p",{children:[O.taskTypeName," · ",O.schedule," · ",O.connectionStatus]})]}),o.jsxs("div",{className:"job-actions",onClick:$=>$.stopPropagation(),children:[o.jsx("span",{className:`job-status ${O.status}`,children:J0(O.status)}),o.jsxs("label",{className:"switch",children:[o.jsx("input",{type:"checkbox","aria-label":`启用${O.name||"未命名任务"}`,checked:O.isEnabled,disabled:!O.schedulingAvailable||m===O.id,title:O.schedulingAvailable?void 0:"Development 环境默认不启用定时任务",onChange:()=>D(O)}),o.jsx("span",{})]}),o.jsx("button",{type:"button",className:"automation-task-more","aria-label":`${O.name||"未命名任务"}的更多操作`,"aria-haspopup":"menu",onClick:$=>{const Z=$.currentTarget.getBoundingClientRect();b({task:O,x:Math.min(Z.left,window.innerWidth-176),y:Math.min(Z.bottom+4,window.innerHeight-58)})},children:o.jsx(GC,{})})]}),o.jsxs("div",{className:"automation-card-footer",children:["最近运行：",O.lastRun]})]},`${O.taskType}:${O.id}`)),!a.length&&o.jsxs("div",{className:"empty-state",children:[o.jsx(FC,{}),o.jsx("h2",{children:"还没有自动化任务"}),o.jsx("p",{children:"选择一种任务类型，新建后进入对应的专用配置界面。"})]})]}),!!a.length&&o.jsx("p",{className:"automation-list-help",children:"点击任务名称进入配置。日报配置通知后即可开启，执行结果见运行记录。"}),x&&o.jsx("div",{className:"job-context-menu",role:"menu",style:{left:x.x,top:x.y},onPointerDown:O=>O.stopPropagation(),children:o.jsxs("button",{className:"danger-quiet",role:"menuitem",disabled:x.task.isEnabled||m===x.task.id,onClick:()=>{w(x.task),b(void 0)},children:[o.jsx(WC,{}),x.task.isEnabled?"停用后可删除":"删除任务"]})}),o.jsx(po,{open:!!E,onOpenChange:O=>!O&&w(void 0),children:o.jsxs(go,{children:[o.jsx(yo,{className:"dialog-overlay"}),o.jsxs(vo,{className:"dialog",children:[o.jsx(xo,{children:"删除自动化任务？"}),o.jsxs(bo,{children:["将删除“",E==null?void 0:E.name,"”及其业务记录，此操作无法撤销。"]}),o.jsxs("div",{className:"dialog-actions",children:[o.jsx("button",{className:"secondary",onClick:()=>w(void 0),children:"取消"}),o.jsx("button",{className:"danger",disabled:!!m,onClick:()=>E&&q(E),children:"确认删除"})]})]})]})}),o.jsx(po,{open:N,onOpenChange:O=>{C(O),O||k("")},children:o.jsxs(go,{children:[o.jsx(yo,{className:"dialog-overlay"}),o.jsxs(vo,{className:"dialog automation-create-dialog",children:[o.jsx(xo,{children:"新建自动化任务"}),o.jsx(bo,{children:A?"填写任务信息，创建后可随时通过 Tab 修改。":"先选择任务类型，后续配置由对应任务自己提供。"}),A?(M=$v(A))==null?void 0:M.renderCreate({onCreated:O=>U(A,O),onBack:()=>k(""),onCancel:()=>{C(!1),k("")}}):o.jsx("div",{className:"automation-create-types",children:Q0.filter(O=>V.includes(O.taskType)).map(O=>o.jsxs("button",{onClick:()=>k(O.taskType),children:[o.jsx("strong",{children:O.name}),o.jsx("span",{children:O.description})]},O.taskType))})]})]})})]})}function dA({openSettings:n,task:a,definition:s,focusStep:l,notice:c,refresh:h,back:d}){const[m,p]=S.useState(l?s.resolveSection(l):s.includeBasics===!1?s.taskTabs[0].id:"basics"),g=a.taskType==="daily_report",[v,x]=S.useState(),[b,E]=S.useState(""),[w,N]=S.useState(!1),C=[...s.includeBasics===!1?[]:[{id:"basics",label:"基本信息"}],...s.taskTabs,{id:"runs",label:"运行记录"}],A=[...a.missingMessage?[{id:`configuration:${a.missingStep||"unknown"}`,title:s.issueTitle(a.missingStep||""),message:a.missingMessage,section:s.resolveSection(a.missingStep||"")}]:[],...a.status==="schedule-error"&&a.schedulerMessage?[{id:"scheduler",title:"计划任务异常",message:a.schedulerMessage,section:"basics"}]:[]];async function k(){N(!0),E("");try{x(await s.loadRuns(a.id))}catch(z){E(z instanceof Error?z.message:String(z))}finally{N(!1)}}S.useEffect(()=>{m==="runs"&&v===void 0&&k()},[m,v]);function V(z,L){var D;if(z.key!=="ArrowLeft"&&z.key!=="ArrowRight")return;z.preventDefault();const U=(L+(z.key==="ArrowRight"?1:-1)+C.length)%C.length;p(C[U].id),C[U].id==="basics"&&h().catch(()=>{}),(D=document.getElementById(`automation-tab-${C[U].id}`))==null||D.focus()}return g?o.jsx(a0,{id:a.id,back:d,changed:h,openSettings:n}):a.taskType==="notion_fill"?o.jsx(i0,{id:a.id,back:d,changed:h,openSettings:n}):o.jsxs("div",{className:"page daily-page automation-detail",children:[o.jsxs("header",{children:[o.jsxs("div",{children:[o.jsxs("button",{className:"back-link","aria-label":"返回任务列表",onClick:d,children:[o.jsx(ns,{}),"返回任务列表"]}),o.jsx("h1",{title:a.name||"未命名任务",children:a.name||"未命名任务"}),o.jsxs("p",{children:[a.taskTypeName," · ",a.schedule]})]}),o.jsx("span",{className:`job-status ${a.status}`,children:J0(a.status)})]}),o.jsx("div",{className:"automation-tabs",role:"tablist","aria-label":"任务详情",children:C.map((z,L)=>o.jsx("button",{type:"button",role:"tab",id:`automation-tab-${z.id}`,"aria-selected":m===z.id,"aria-controls":`automation-panel-${z.id}`,tabIndex:m===z.id?0:-1,onClick:()=>{p(z.id),z.id==="basics"&&h().catch(()=>{})},onKeyDown:U=>V(U,L),children:z.label},z.id))}),o.jsxs("div",{children:[c&&o.jsx("div",{className:`notice ${c.tone}`,role:"status",children:o.jsxs("div",{children:[o.jsx("strong",{children:c.title}),o.jsx("span",{children:c.message})]})}),!!A.length&&o.jsxs("section",{className:"automation-issues","aria-labelledby":"automation-issues-title",children:[o.jsxs("div",{className:"automation-issues-heading",children:[o.jsx(IC,{}),o.jsxs("div",{children:[o.jsx("h2",{id:"automation-issues-title",children:"配置问题"}),o.jsx("p",{children:"完成以下项目后才能安全启用任务。"})]}),o.jsxs("span",{children:[A.length," 项"]})]}),o.jsx("ul",{children:A.map(z=>{var L;return o.jsxs("li",{children:[o.jsxs("div",{children:[o.jsx("strong",{children:z.title}),o.jsx("span",{children:z.message})]}),o.jsxs("button",{type:"button",onClick:()=>{p(z.section)},children:["前往",((L=C.find(U=>U.id===z.section))==null?void 0:L.label)||"处理",o.jsx(BC,{})]})]},z.id)})})]}),o.jsxs("div",{className:"automation-tab-panel",role:"tabpanel",id:`automation-panel-${m}`,"aria-labelledby":`automation-tab-${m}`,children:[o.jsx("div",{hidden:m==="runs",children:s.renderEditor({id:a.id,section:m,openSettings:n,navigate:p,changed:()=>{h().catch(()=>{})}})}),m==="runs"&&o.jsxs("section",{className:"surface automation-runs",children:[o.jsxs("div",{className:"automation-runs-heading",children:[o.jsxs("div",{children:[o.jsx("h2",{children:"运行记录"}),o.jsx("p",{children:"查看任务执行结果和错误详情。"})]}),o.jsxs("button",{className:"secondary",disabled:w,onClick:k,children:[w?o.jsx(Sn,{className:"spin"}):o.jsx(KC,{}),"刷新"]})]}),b&&o.jsx("div",{className:"notice error",role:"alert",children:o.jsxs("div",{children:[o.jsx("strong",{children:"运行记录读取失败"}),o.jsx("span",{children:b})]})}),o.jsx("div",{className:"automation-run-list",children:v==null?void 0:v.map(z=>o.jsxs("details",{children:[o.jsxs("summary",{children:[o.jsx("span",{children:z.time}),o.jsx("span",{children:z.source}),o.jsx("strong",{children:z.title}),o.jsx("b",{className:z.error?"error-text":"",children:z.status})]}),o.jsxs("div",{children:[z.details.map(L=>o.jsx("p",{children:L},L)),z.error&&o.jsxs("p",{className:"run-error",children:["错误：",z.error]})]})]},z.id))}),!w&&v&&!v.length&&o.jsx("p",{className:"automation-empty",children:"暂无运行记录"})]})]})]})]})}function J0(n){return{incomplete:"配置未完成","pending-test":"待测试",checked:"已验证",ready:"可启用",enabled:"已启用","schedule-error":"计划异常"}[n]||n}function Kv({value:n,onChange:a,unit:s,className:l="",disabled:c,ariaLabel:h,onKeyDown:d}){return o.jsxs("div",{className:`numeric-input ${l}`.trim(),children:[o.jsx("input",{type:"text",inputMode:"decimal",value:n,disabled:c,"aria-label":h,onChange:m=>a(m.target.value),onKeyDown:d}),s&&o.jsx("span",{children:s})]})}function W0({current:n,titles:a,label:s}){const l=a.map((c,h)=>({number:h+1,title:c}));return o.jsx("div",{className:"step-bar","aria-label":s,children:l.map((c,h)=>{const d=c.number<n?"done":c.number===n?"active":"pending";return o.jsxs(S.Fragment,{children:[o.jsxs("div",{className:`step step-${d}`,"aria-current":d==="active"?"step":void 0,children:[o.jsx("div",{className:`step-circle ${d}`,children:d==="done"?o.jsx(us,{}):c.number}),o.jsx("span",{children:c.title})]}),h<l.length-1&&o.jsx("div",{className:`step-line ${c.number<n?"done":c.number===n?"transition":"pending"}`})]},c.number)})})}const Zv={configured:!1,binding:{bound:!1,name:"",path:""},usesBusinessSections:!1,businessSections:[],sources:[],selected:""};function fA(){const n=new Date;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`}function hA({openSettings:n}){const[a,s]=S.useState(1),[l,c]=S.useState(fA),[h,d]=S.useState(""),[m,p]=S.useState([]),[g,v]=S.useState(Zv),[x,b]=S.useState(!1),[E,w]=S.useState("database"),[N,C]=S.useState(""),[A,k]=S.useState(""),[V,z]=S.useState(!1),[L,U]=S.useState("state"),[D,q]=S.useState(""),[M,O]=S.useState(""),[$,Z]=S.useState(),oe=S.useRef(!1),ue=S.useRef(!1);S.useEffect(()=>{he("weld.getState").then(J=>{var te;const fe=J!=null&&J.binding&&Array.isArray(J.sources)?J:Zv;v(fe),C(((te=fe.sources.find(me=>me.id===fe.selected))==null?void 0:te.businessSection)||""),k(fe.selected)}).catch(J=>q(J instanceof Error?J.message:"读取 Notion 配置失败")).finally(()=>U(void 0))},[]);const ye=/^\d+$/.test(h)&&Number(h)>0,Y=S.useMemo(()=>m.reduce((J,fe)=>J+Number(fe.qty||0),0),[m]),ae=Y-Number(h||0),W=m.length>0&&m.every(J=>/^\d+$/.test(J.qty))&&ae===0,G=g.usesBusinessSections?g.sources.filter(J=>J.businessSection===N):g.sources,ee=!!L;async function T(){if(!(!ye||ee)){U("generate"),q("");try{const J=await he("weld.generate",{month:l,total:h});p(J.map(fe=>({...fe,qty:String(fe.qty)}))),s(2)}catch(J){q(J instanceof Error?J.message:"拆分失败")}finally{U(void 0)}}}function _(J,fe){fe!==""&&!/^\d+$/.test(fe)||p(te=>te.map((me,Ce)=>Ce===J?{...me,qty:fe}:me))}async function re(){if(!(!A||L)){U("binding"),q("");try{const J=await he("weld.saveBinding",{sourceId:A});v(J),k(J.selected),b(!1)}catch(J){q(J instanceof Error?J.message:"绑定失败")}finally{U(void 0)}}}async function le(){if(!W||!g.binding.bound||ee||oe.current)return;oe.current=!0,U("check"),q("");const J={month:l,total:h,rows:m.map(fe=>({date:fe.date,qty:fe.qty}))};try{if((await he("weld.check",J,12e4)).hasExistingData){z(!0);return}await de(J,!1)}catch(fe){q(fe instanceof Error?fe.message:"Notion 数据检查失败")}finally{oe.current=!1,U(fe=>fe==="check"?void 0:fe)}}async function de(J,fe){if(!ue.current){ue.current=!0,U("write"),q(""),Z(void 0);try{const te=await he("weld.write",{...J,overwriteExisting:fe},12e4,me=>Z(me));O(te.message),z(!1),s(3)}catch(te){q(te instanceof Error?te.message:"写入 Notion 失败")}finally{ue.current=!1,U(void 0)}}}function ce(){s(1),p([]),d(""),O(""),q(""),Z(void 0)}function xe(){var J;ee||(k(g.selected),C(((J=g.sources.find(fe=>fe.id===g.selected))==null?void 0:J.businessSection)||""),q(""),w("database"),b(!0))}const ie={month:l,total:h,rows:m.map(J=>({date:J.date,qty:J.qty}))};return o.jsx("div",{className:"app-shell",children:o.jsxs("main",{className:"main-content",children:[o.jsxs("header",{className:"content-header",children:[o.jsx("h1",{children:"每日焊接数据模拟"}),o.jsx("button",{type:"button",className:"template-config-button",disabled:ee,"aria-label":"焊接设置",title:"焊接设置",onClick:xe,children:o.jsx(Ff,{})})]}),o.jsxs("div",{className:"production-message-scroll daily-weld-page",children:[o.jsx(W0,{current:a,titles:["录入计划","拆分预览","完成"],label:"焊接计划拆分进度"}),D&&o.jsx("div",{className:"weld-notice error",role:"alert",children:D}),a===1&&o.jsxs("section",{className:"weld-plan-card","aria-labelledby":"weld-plan-title",children:[o.jsx("div",{className:"weld-section-heading",children:o.jsx("h2",{id:"weld-plan-title",children:"计划信息"})}),o.jsxs("div",{className:"weld-fields",children:[o.jsx(Yt,{label:"计划月份",value:l,selectionMode:"month",disabled:ee,onChange:c}),o.jsxs("label",{className:"weld-field",children:[o.jsx("span",{children:"计划焊接总量"}),o.jsx(Kv,{value:h,disabled:ee,onChange:J=>{(J===""||/^\d+$/.test(J))&&d(J)},unit:"吨",ariaLabel:"计划焊接总量"})]})]}),o.jsx("div",{className:"weld-actions",children:o.jsx("button",{type:"button",className:"primary-button",disabled:!ye||ee,onClick:T,children:L==="generate"?"正在拆分…":"下一步：拆分预览"})})]}),a===2&&o.jsxs("section",{className:"weld-preview","aria-labelledby":"weld-preview-title",children:[o.jsxs("div",{className:"weld-preview-heading",children:[o.jsxs("div",{children:[o.jsxs("h2",{id:"weld-preview-title",children:[l.replace("-"," 年 ")," 月每日拆分详情"]}),o.jsx("p",{children:"可直接修改任意一天的数值；不满意本次浮动效果可重新模拟。"})]}),o.jsxs("button",{type:"button",className:"secondary",disabled:ee,onClick:T,children:[o.jsx(Wb,{}),"重新模拟浮动"]})]}),o.jsx("div",{className:"weld-table-wrap",children:o.jsxs("table",{children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{children:"日期"}),o.jsx("th",{children:"星期"}),o.jsx("th",{children:"类型"}),o.jsx("th",{children:"计划量（吨）"})]})}),o.jsx("tbody",{children:m.map((J,fe)=>o.jsxs("tr",{children:[o.jsx("td",{children:J.date}),o.jsx("td",{children:J.weekday}),o.jsx("td",{children:o.jsx("span",{className:`weld-day-pill ${J.isWeekend?"weekend":""}`,children:J.isWeekend?"休息日":"工作日"})}),o.jsx("td",{children:o.jsx(Kv,{value:J.qty,disabled:ee,onChange:te=>_(fe,te),unit:"吨",ariaLabel:`${J.date} 计划量`})})]},J.date))})]})}),o.jsxs("div",{className:"weld-summary",children:[o.jsxs("span",{children:["共 ",m.length," 天 · 计划总量 ",o.jsx("strong",{children:h})," 吨"]}),o.jsxs("span",{children:["拆分合计 ",o.jsx("strong",{children:Y})," 吨 ",ae===0?o.jsx("em",{className:"match",children:"与计划总量一致"}):o.jsxs("em",{className:"mismatch",children:["偏差 ",ae>0?"+":"",ae," 吨，可手动调整"]})]})]}),L==="write"&&o.jsx("div",{className:"weld-write-progress",role:"status","aria-live":"polite",children:$?`正在写入 ${$.date.slice(0,10)}（${$.current}/${$.total}）`:"正在准备 Notion 层级数据…"}),o.jsxs("div",{className:"weld-actions split",children:[o.jsx("button",{type:"button",className:"secondary",disabled:ee,onClick:()=>s(1),children:"返回修改"}),o.jsx("button",{type:"button",className:"primary-button",disabled:!W||!g.binding.bound||ee,onClick:le,children:L==="check"?"正在检查…":L==="write"?"正在写入…":"确认并写入 Notion"})]})]}),a===3&&o.jsxs("section",{className:"complete-view weld-complete",children:[o.jsx("div",{className:"complete-icon",children:o.jsx(us,{})}),o.jsx("h2",{children:"入库完成"}),o.jsx("p",{children:M||`${l} 共 ${m.length} 天的焊接计划数据已写入 Notion。`}),o.jsx("button",{className:"primary-button",onClick:ce,children:"拆分下一个月"})]})]}),x&&o.jsx("div",{className:"weld-settings-overlay",children:o.jsxs("section",{className:"weld-settings-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"weld-settings-title",children:[o.jsxs("aside",{className:"weld-settings-nav",children:[o.jsx("h2",{id:"weld-settings-title",children:"焊接设置"}),o.jsxs("nav",{"aria-label":"焊接设置分类",children:[o.jsxs("button",{type:"button",className:E==="rules"?"active":"",onClick:()=>w("rules"),children:[o.jsx(JC,{}),"拆分规则"]}),o.jsxs("button",{type:"button",className:E==="database"?"active":"",onClick:()=>w("database"),children:[o.jsx(Kd,{}),"数据库绑定"]})]})]}),o.jsxs("div",{className:"weld-settings-main",children:[o.jsx("button",{type:"button",className:"weld-settings-close","aria-label":"关闭焊接设置",disabled:L==="binding",onClick:()=>b(!1),children:o.jsx(Xf,{})}),E==="rules"?o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"weld-settings-heading",children:[o.jsx("h3",{children:"拆分规则"}),o.jsx("p",{children:"当前规则用于生成每日焊接计划，修改每日数值后仍需保证月度合计一致。"})]}),o.jsxs("dl",{className:"weld-rule-list",children:[o.jsxs("div",{children:[o.jsx("dt",{children:"分配周期"}),o.jsx("dd",{children:"按所选月份的全部自然日"})]}),o.jsxs("div",{children:[o.jsx("dt",{children:"产量浮动"}),o.jsx("dd",{children:"基准量叠加 22% 随机波动"})]}),o.jsxs("div",{children:[o.jsx("dt",{children:"周末权重"}),o.jsx("dd",{children:"周六、周日自动降低计划权重"})]}),o.jsxs("div",{children:[o.jsx("dt",{children:"总量配平"}),o.jsx("dd",{children:"每日取整后自动配平至月度计划"})]})]})]}):o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"weld-settings-heading",children:[o.jsx("h3",{children:"数据库绑定"}),o.jsx("p",{children:"每项业务只绑定一个主写入数据库，汇总数据库由系统自动维护。"})]}),D&&o.jsx("div",{className:"weld-notice error",role:"alert",children:D}),o.jsxs("section",{className:"weld-business-binding","aria-labelledby":"weld-business-title",children:[o.jsxs("div",{className:"weld-business-title",children:[o.jsxs("div",{children:[o.jsx("h4",{id:"weld-business-title",children:"焊接业务"}),o.jsx("p",{children:"每日焊接计划的主写入数据库"})]}),o.jsx("span",{className:g.binding.bound?"bound":"",children:g.binding.bound?"已绑定":"未绑定"})]}),!g.configured||!g.sources.length?o.jsx("div",{className:"weld-notice",children:"请先在系统设置中完成数据库连接并刷新数据源。"}):o.jsxs("div",{className:"weld-dialog-field",children:[g.usesBusinessSections&&o.jsxs(o.Fragment,{children:[o.jsx("span",{children:"业务板块"}),o.jsx(Je,{value:N,options:g.businessSections.map(J=>({value:J,label:J})),placeholder:"选择焊接业务板块",ariaLabel:"焊接业务板块",disabled:L==="binding",onChange:J=>{C(J),k("")}})]}),o.jsx("span",{children:"主写入数据库"}),o.jsx(Je,{value:A,options:G.map(J=>({value:J.id,label:J.name})),placeholder:"选择每日焊接量数据库",ariaLabel:"焊接业务主写入数据库",disabled:g.usesBusinessSections&&!N||L==="binding",onChange:k})]}),o.jsx("p",{className:"weld-binding-help",children:"月度和周度汇总数据库由系统在写入时自动维护，无需单独绑定。"})]}),o.jsxs("div",{className:"weld-settings-actions",children:[o.jsx("button",{type:"button",disabled:L==="binding",onClick:()=>b(!1),children:"取消"}),!g.configured||!g.sources.length?o.jsx("button",{type:"button",className:"primary-button",onClick:n,children:"前往系统设置"}):o.jsx("button",{type:"button",className:"primary-button",disabled:!A||L==="binding",onClick:re,children:L==="binding"?"正在检测…":"保存绑定"})]})]})]})]})}),V&&o.jsx("div",{className:"pm-dialog-overlay",children:o.jsxs("section",{className:"pm-dialog weld-confirm-dialog",role:"alertdialog","aria-modal":"true","aria-labelledby":"weld-overwrite-title",children:[o.jsx("h2",{id:"weld-overwrite-title",children:"确认覆盖已有产量"}),o.jsxs("p",{children:[l," 已存在产量数据。继续后将按本次拆分结果覆盖该月每日产量，并更新月、周、日关联。"]}),D&&o.jsx("div",{className:"weld-notice error",role:"alert",children:D}),L==="write"&&o.jsx("div",{className:"weld-write-progress",role:"status","aria-live":"polite",children:$?`正在写入 ${$.date.slice(0,10)}（${$.current}/${$.total}）`:"正在准备 Notion 层级数据…"}),o.jsxs("div",{className:"pm-dialog-actions",children:[o.jsx("button",{type:"button",disabled:L==="write",onClick:()=>z(!1),children:"取消"}),o.jsx("button",{type:"button",className:"primary-button",disabled:L==="write",onClick:()=>de(ie,!0),children:L==="write"?"正在写入…":"确认覆盖并写入"})]})]})})]})})}const I0=[{category:"数据文件处理",name:"挂网计划 PDF 导出"},{category:"数据文件处理",name:"生产会资料拆分"},{category:"数据文件处理",name:"文件统计汇总"},{category:"数据同步",name:"每日焊接数据模拟"},{category:"数据同步",name:"生产消息 Notion 入库"},{category:"数据同步",name:"数据库查看"},{category:"自动化",name:"自动化任务"}],mA=[...new Set(I0.map(n=>n.category))];function pA(n){switch(n){case"挂网计划 PDF 导出":return"plan-pdf";case"生产会资料拆分":return"production-meeting";case"每日焊接数据模拟":return"daily-weld";case"生产消息 Notion 入库":return"production-message";case"数据库查看":return"database-viewer";case"文件统计汇总":return"report-center";case"自动化任务":return"daily-report";default:return"plan-pdf"}}function gA({active:n,navigate:a,openSettings:s}){return o.jsxs("aside",{className:"sidebar",children:[o.jsx("div",{className:"sidebar-top",children:o.jsx("div",{className:"sidebar-brand",children:"生产助手"})}),o.jsx("nav",{className:"sidebar-nav","aria-label":"业务模块",children:mA.map(l=>o.jsxs("section",{className:"sidebar-section",children:[o.jsx("div",{className:"sidebar-section-label",children:l}),I0.filter(c=>c.category===l).map(c=>{const h=pA(c.name),d=h===n;return o.jsxs("button",{className:`sidebar-item ${d?"sidebar-item-active":""}`,"aria-current":d?"page":void 0,onClick:()=>a(h),children:[o.jsx(Qv,{name:c.name}),o.jsx("span",{children:c.name})]},c.name)})]},l))}),o.jsx("div",{className:"sidebar-bottom",children:o.jsxs("button",{className:"sidebar-item","aria-haspopup":"dialog",onClick:s,children:[o.jsx(Qv,{name:"设置"}),o.jsx("span",{children:"设置"})]})})]})}function Qv({name:n}){return n==="挂网计划 PDF 导出"||n==="生产会资料拆分"?o.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("path",{className:"folder-lid",d:"M3.5 7h6l1.8 2h9.2"}),o.jsx("path",{d:"M4.2 7h15.6l-1.3 11H5.5L4.2 7Z"})]}):n==="每日焊接数据模拟"||n==="自动化任务"?o.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("rect",{x:"5",y:"4.5",width:"14",height:"15",rx:"2"}),o.jsx("path",{d:"M8 3v3M16 3v3M5 9h14"}),o.jsx("path",{className:"daily-check",d:"m8.5 14 2 2 4.5-4.5"})]}):n==="生产消息 Notion 入库"?o.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("path",{d:"M4 14.5 6.2 6h11.6l2.2 8.5V19H4v-4.5Z"}),o.jsx("path",{className:"inbox-tray",d:"M4.3 14h4.1l1.2 2h4.8l1.2-2h4.1"}),o.jsx("path",{className:"inbox-arrow",d:"M12 5v7m-2.5-2.5L12 12l2.5-2.5"})]}):n==="数据库查看"?o.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("ellipse",{cx:"12",cy:"6",rx:"7",ry:"3"}),o.jsx("path",{d:"M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"})]}):n==="文件统计汇总"?o.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("path",{d:"M4.5 19h15"}),o.jsx("rect",{className:"report-bar report-bar-one",x:"6",y:"12",width:"2.5",height:"6",rx:"0.5"}),o.jsx("rect",{className:"report-bar report-bar-two",x:"10.75",y:"8",width:"2.5",height:"10",rx:"0.5"}),o.jsx("rect",{className:"report-bar report-bar-three",x:"15.5",y:"5",width:"2.5",height:"13",rx:"0.5"})]}):o.jsxs("svg",{className:"nav-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("circle",{cx:"12",cy:"12",r:"3"}),o.jsx("path",{className:"settings-ring",d:"M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M18 6l-1.4 1.4M7.4 16.6 6 18"})]})}const Jv=new Set(["raw_message","message_type","parser_version","unit"]),yA=new Set(["piece_count","weight","sheet_in_stock","profile_in_stock","cutting","welding","daily_output","monthly_output","yearly_output","monthly_reference","output_sections"]),vA=/(公斤|千克|kg|吨|t|张|件|套|节|台|米|m)$/i,xA={piece_count:"张",weight:"吨",sheet_in_stock:"吨",profile_in_stock:"吨",cutting:"吨",welding:"吨",daily_output:"套",output_sections:"节"};function bd(){const n=new Date;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`}function Gi(n){return n instanceof Error?n.message:String(n)}function of(n,a=""){const s=n.trim().match(vA);return{value:s?n.trim().slice(0,-s[0].length).trim():n,unit:(s==null?void 0:s[0])||a}}function bA(n,a){return n.trim()?`${n}${a}`:""}function SA(n,a){const s=of(a).value.trim(),l=of(n.databaseValue).value.trim(),c=n.propertyType==="number"&&!Number.isFinite(Number(s.replaceAll(",",""))),h=!s||c?"exception":l?n.propertyType==="number"?Number(s.replaceAll(",",""))===Number(l.replaceAll(",",""))?"same":"confirm":s===l?"same":"confirm":"new";return{...n,parsedValue:a,status:h,message:h==="exception"?`${n.name}的输入值无效`:h==="confirm"?"与数据库现值不同":""}}function jA(n){return{new:"新增",same:"一致",confirm:"待确认",exception:"异常",unchecked:"待检查"}[n]||"异常"}function wA(){const[n,a]=S.useState(""),[s,l]=S.useState(""),[c,h]=S.useState([]),[d,m]=S.useState(),[p,g]=S.useState(),[v,x]=S.useState(),[b,E]=S.useState(""),[w,N]=S.useState({}),[C,A]=S.useState(!1),[k,V]=S.useState(),[z,L]=S.useState(""),[U,D]=S.useState([]),[q,M]=S.useState({}),[O,$]=S.useState(!1),[Z,oe]=S.useState({cutting:"",towerDaily:""}),ue=c.length>0,ye=ue&&n!==s,Y=!!d;S.useEffect(()=>{he("production.getBindings").then(ie=>{V(ie),oe({cutting:ie.selected.cutting||"",towerDaily:ie.selected.towerDaily||""})}).catch(ie=>L(Gi(ie)))},[]);async function ae(){L("");try{await he("production.saveBindings",Z,12e4);const ie=await he("production.getBindings");V(ie),$(!1)}catch(ie){L(Gi(ie))}}async function W(ie){m("check"),E(""),N({});try{const J=await he("production.check",{drafts:ie,defaultDate:bd()});g(J)}catch(J){E(Gi(J))}finally{m(void 0)}}async function G(){if(!(!n.trim()||Y)){m("parse"),E(""),A(!1),x(void 0),g(void 0),N({});try{const ie=await he("production.parse",{text:n,defaultDate:bd()});if(h(ie),l(n),!ie.length){E("没有解析到可核对的数据，请检查消息内容后重试。");return}ie.every(J=>J.canWrite)&&await W(ie)}catch(ie){h([]),g(void 0),E(Gi(ie))}finally{m(ie=>ie==="parse"?void 0:ie)}}}async function ee(ie,J){const fe=c.map(te=>te.index===ie?{...te,businessDate:J,canWrite:!!J,warningText:J?"":te.warningText}:te);h(fe),g(void 0),N({}),fe.every(te=>te.canWrite)&&await W(fe)}function T(ie,J,fe){const te=`${ie}:${J}`;h(me=>me.map(Ce=>Ce.index===ie?{...Ce,canWrite:!!Ce.businessDate&&Ce.kind!=="Unknown",fields:{...Ce.fields,[J]:fe},previewFields:Ce.previewFields.map(Q=>Q.key===J?{...Q,value:fe}:Q)}:Ce)),N(me=>Object.fromEntries(Object.entries(me).filter(([Ce])=>Ce!==te))),g(me=>{if(!me)return me;const Ce=me.items.map(Q=>{if(Q.index!==ie||!Q.fields)return Q;const be=Q.fields.map(vt=>vt.key===J?SA(vt,fe):vt),_e=be.some(vt=>vt.status==="exception")?"error":be.some(vt=>vt.status==="confirm")?"existing":"ready";return{...Q,fields:be,status:_e}});return{...me,items:Ce,succeeded:Ce.every(Q=>Q.status!=="error")}})}async function _(ie){if(!(!p||Y)){m("write"),E("");try{const J=await he("production.write",{drafts:c,defaultDate:bd(),overwriteExisting:!1,fieldChoices:w,monthlyPlans:ie},12e4);if(x(J),J.requiredMonths.length){D(J.requiredMonths),M({});return}J.succeeded?A(!0):E(J.message||"Notion 写入未完成。")}catch(J){E(Gi(J))}finally{m(void 0)}}}function re(){a(""),l(""),h([]),g(void 0),x(void 0),N({}),A(!1),E("")}const le=S.useMemo(()=>c.flatMap(ie=>{var fe;const J=(fe=p==null?void 0:p.items.find(te=>te.index===ie.index))==null?void 0:fe.fields;return J!=null&&J.length?J.filter(te=>!Jv.has(te.key)).map(te=>({draft:ie,key:te.key,name:te.name,propertyType:te.propertyType,parsedValue:ie.fields[te.key]??te.parsedValue,databaseValue:te.databaseValue,status:te.status,message:te.message})):ie.previewFields.filter(te=>!Jv.has(te.key)).map(te=>({draft:ie,key:te.key,name:te.label,propertyType:yA.has(te.key)?"number":"",parsedValue:ie.fields[te.key]??te.value,databaseValue:"",status:ie.canWrite?"unchecked":"exception",message:ie.warningText}))}),[c,p]),de=S.useMemo(()=>({newFields:le.filter(ie=>ie.status==="new").length,same:le.filter(ie=>ie.status==="same").length,confirm:le.filter(ie=>ie.status==="confirm").length,exception:le.filter(ie=>ie.status==="exception").length}),[le]),ce=le.filter(ie=>ie.status==="confirm"),xe=ue&&!ye&&!Y&&!!(p!=null&&p.succeeded)&&c.every(ie=>ie.canWrite&&!!ie.businessDate)&&le.every(ie=>ie.status!=="exception"&&ie.status!=="unchecked")&&ce.every(ie=>!!w[`${ie.draft.index}:${ie.key}`]);return C?o.jsxs("div",{className:"app-shell",children:[o.jsxs("main",{className:"main-content",children:[o.jsx(Iv,{disabled:Y,configure:()=>{k&&oe({cutting:k.selected.cutting||"",towerDaily:k.selected.towerDaily||""}),L(""),$(!0)}}),o.jsxs("div",{className:"production-message-scroll",children:[o.jsx(ex,{current:3}),o.jsxs("section",{className:"complete-view",children:[o.jsx("div",{className:"complete-icon",children:o.jsx(us,{})}),o.jsx("h2",{children:"入库完成"}),o.jsx("p",{children:(v==null?void 0:v.message)||`${c.length} 条消息已写入 Notion`}),o.jsx("button",{className:"primary-button",onClick:re,children:"录入下一条"})]})]})]}),O&&k&&o.jsx(Wv,{state:k,selections:Z,setSelections:oe,error:z,close:()=>$(!1),save:ae})]}):o.jsxs("div",{className:"app-shell",children:[o.jsxs("main",{className:"main-content",children:[o.jsx(Iv,{disabled:Y,configure:()=>{k&&oe({cutting:k.selected.cutting||"",towerDaily:k.selected.towerDaily||""}),L(""),$(!0)}}),o.jsxs("div",{className:"production-message-scroll",children:[o.jsx(ex,{current:ue?2:1}),o.jsxs("div",{className:"workspace-panel",children:[o.jsxs("section",{className:"message-pane",children:[o.jsxs("div",{className:"pane-title",children:[o.jsx("h2",{children:"原始消息"}),o.jsx("p",{children:"输入生产消息，系统将自动解析并检查已有数据。"})]}),o.jsx("textarea",{className:"message-textarea",value:n,disabled:Y,onChange:ie=>a(ie.target.value),placeholder:"请输入生产消息"}),o.jsx("div",{className:"parse-action",children:o.jsxs("button",{className:"primary-button",disabled:!n.trim()||Y,onClick:G,children:[ue&&o.jsx(Wb,{className:"button-icon refresh-icon"}),o.jsx("span",{children:d==="parse"?"正在解析…":ue?"重新解析":"解析消息"})]})})]}),o.jsx("section",{className:"review-pane",children:ue?o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"review-header",children:[o.jsx("h2",{children:"解析结果"}),o.jsxs("div",{className:"review-summary",children:[o.jsxs("span",{children:["新增",o.jsx("strong",{children:de.newFields})]}),o.jsx("i",{children:"·"}),o.jsxs("span",{children:["一致",o.jsx("strong",{children:de.same})]}),o.jsx("i",{children:"·"}),o.jsxs("span",{children:["待确认",o.jsx("strong",{children:de.confirm})]}),o.jsx("i",{children:"·"}),o.jsxs("span",{children:["异常",o.jsx("strong",{children:de.exception})]})]})]}),o.jsx("div",{className:"date-groups",children:c.map(ie=>{const J=le.filter(me=>me.draft.index===ie.index),fe=J.filter(me=>me.status==="confirm"),te=p?{...p,items:p.items.filter(me=>me.index===ie.index)}:void 0;return o.jsxs("section",{className:"date-group","data-business-date":ie.businessDate,children:[o.jsxs("div",{className:"identity-section",children:[o.jsx("div",{className:"identity-field",children:o.jsx(Yt,{label:"日期",value:ie.businessDate||"",disabled:Y,onChange:me=>ee(ie.index,me)})}),o.jsxs("div",{className:"identity-field",children:[o.jsx("label",{children:"业务 / 产线"}),o.jsx("input",{className:"field-input",value:ie.typeDisplay||"",readOnly:!0,disabled:Y})]})]}),o.jsx(EA,{busy:d==="check",result:te,error:b,needsReparse:ye,invalidCount:ie.canWrite?0:1,fieldStatuses:J.map(me=>me.status)}),o.jsx("div",{className:"data-title",children:"数据字段"}),o.jsxs("div",{className:"field-table",children:[o.jsxs("div",{className:"field-table-header",children:[o.jsx("div",{children:"字段"}),o.jsx("div",{children:"本次解析值"}),o.jsx("div",{children:"数据库值"}),o.jsx("div",{className:"header-status",children:"状态"})]}),J.map(me=>{const Ce=of(me.parsedValue,me.propertyType==="number"&&xA[me.key]||""),Q=`${me.draft.index}:${me.key}`;return o.jsxs("div",{className:"field-row",children:[o.jsx("div",{className:"field-name",children:me.name}),o.jsx("div",{className:"field-editor",children:o.jsxs("div",{className:"input-unit-wrap",children:[o.jsx("input",{className:"field-input compact-input",value:Ce.value,disabled:Y,"aria-invalid":me.status==="exception",onChange:be=>T(me.draft.index,me.key,bA(be.target.value,Ce.unit)),onKeyDown:be=>{be.key==="Enter"&&be.currentTarget.blur()}}),Ce.unit&&o.jsx("span",{children:Ce.unit})]})}),o.jsx("div",{className:"database-value",children:me.databaseValue||"—"}),o.jsx("div",{className:"field-status",children:me.status!=="unchecked"&&o.jsx("span",{className:`pill pill-${me.status}`,title:me.message,children:jA(me.status)})})]},Q)})]}),fe.length>0&&o.jsxs("section",{className:"conflict-section","aria-label":`${ie.businessDate} 待确认字段`,children:[o.jsx("div",{className:"conflict-section-title",children:"待确认字段"}),fe.map(me=>{const Ce=`${me.draft.index}:${me.key}`;return o.jsxs("div",{className:"conflict-panel",children:[o.jsxs("div",{className:"conflict-message",children:[o.jsx("strong",{children:me.name}),o.jsx("span",{children:"原值与新值不同，请选择保留项。"})]}),o.jsxs("div",{className:"conflict-options",children:[o.jsxs("label",{children:[o.jsx("input",{type:"radio",name:`conflict-${Ce}`,checked:w[Ce]==="keep",onChange:()=>N(Q=>({...Q,[Ce]:"keep"}))}),o.jsxs("span",{children:[o.jsx("small",{children:"原值"}),o.jsx("strong",{children:me.databaseValue||"—"})]})]}),o.jsxs("label",{children:[o.jsx("input",{type:"radio",name:`conflict-${Ce}`,checked:w[Ce]==="use",onChange:()=>N(Q=>({...Q,[Ce]:"use"}))}),o.jsxs("span",{children:[o.jsx("small",{children:"新值"}),o.jsx("strong",{children:me.parsedValue||"—"})]})]})]})]},Ce)})]})]},ie.index)})}),o.jsxs("div",{className:"review-footer",children:[o.jsx("span",{className:"review-footer-text",children:c.length>1?`本次共 ${c.length} 条消息，将整批写入 Notion。`:"确认后将把本次解析结果写入 Notion。"}),o.jsx("button",{className:"primary-button confirm-button",disabled:!xe,onClick:()=>_(),children:d==="write"?"正在入库…":"确认入库"})]})]}):o.jsxs("div",{className:"review-empty",children:[o.jsx("h2",{children:"解析结果"}),o.jsx("p",{children:"解析消息后，Notion 数据检查结果将在这里显示。"}),(z||(k==null?void 0:k.configured)===!1||k&&(!k.cutting.bound||!k.towerDaily.bound))&&o.jsx("div",{className:"pm-notice",role:"alert",children:z||((k==null?void 0:k.configured)===!1?"Notion 连接尚未配置。":"数据库已变更，请点击右上角“数据库绑定”重新选择下料和塔筒主数据库。")})]})})]})]})]}),U.length>0&&o.jsx(TA,{months:U,values:q,setValues:M,close:()=>D([]),submit:ie=>{D([]),_(ie)}}),O&&k&&o.jsx(Wv,{state:k,selections:Z,setSelections:oe,error:z,close:()=>$(!1),save:ae})]})}function EA({busy:n,result:a,error:s,needsReparse:l,invalidCount:c,fieldStatuses:h}){if(n)return o.jsxs("div",{className:"match-status",role:"status","aria-live":"polite",children:[o.jsx("span",{className:"status-loader"}),o.jsx("span",{className:"match-status-copy",children:"正在检查 Notion 数据…"})]});if(l)return o.jsxs("div",{className:"match-status match-status-error",role:"alert",children:[o.jsx("span",{className:"new-record-icon",children:"!"}),o.jsx("span",{className:"match-status-copy",children:"原始消息已修改，请重新解析"})]});if(c)return o.jsxs("div",{className:"match-status match-status-error",role:"alert",children:[o.jsx("span",{className:"new-record-icon",children:"!"}),o.jsxs("span",{className:"match-status-copy",children:["本批有 ",c," 条异常，已停止检查和入库"]})]});if(s)return o.jsxs("div",{className:"match-status match-status-error",role:"alert",children:[o.jsx("span",{className:"new-record-icon",children:"!"}),o.jsxs("span",{className:"match-status-copy",children:["检查失败：",s]})]});const d=a==null?void 0:a.items.some(b=>b.status==="existing"||b.status==="conflict"),m=b=>h.includes(b),p=h.length>0&&h.every(b=>b==="same"),g=m("exception")||a&&!a.succeeded&&h.length===0?"match-status-error":m("confirm")?"match-status-warning":p?"match-status-neutral":"",v=m("exception")?"存在异常，不能入库":m("unchecked")?"字段已修改，等待检查":m("confirm")?"已找到对应记录，有字段待确认":m("new")?d||m("same")?"已找到对应记录，将补充空字段":"未找到对应记录，将新建":p?"已找到对应记录，数据一致":a&&!a.succeeded?"Notion 检查未通过":"等待检查 Notion 数据",x=!!a&&!m("exception")&&!m("confirm")&&!m("unchecked");return o.jsxs("div",{className:`match-status ${g}`,role:g==="match-status-error"?"alert":"status","aria-live":"polite",children:[x?o.jsx("span",{className:"match-check",children:o.jsx(us,{})}):o.jsx("span",{className:"new-record-icon",children:g?"!":"+"}),o.jsx("span",{className:"match-status-copy",children:v})]})}function TA({months:n,values:a,setValues:s,close:l,submit:c}){const h=Object.fromEntries(n.map(m=>[m,Number(a[m])])),d=n.every(m=>{var p;return((p=a[m])==null?void 0:p.trim())&&Number.isFinite(h[m])&&h[m]>=0});return o.jsx("div",{className:"pm-dialog-overlay",children:o.jsxs("section",{className:"pm-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"monthly-plan-title",children:[o.jsx("h2",{id:"monthly-plan-title",children:"补充下料月计划"}),o.jsx("p",{children:"独立月计划库中没有该月份记录，请填写计划下料（吨）。"}),n.map(m=>o.jsxs("label",{children:[m,o.jsx("input",{type:"number",min:"0",value:a[m]||"",onChange:p=>s({...a,[m]:p.target.value})})]},m)),o.jsxs("div",{className:"pm-dialog-actions",children:[o.jsx("button",{onClick:l,children:"取消"}),o.jsx("button",{className:"primary-button",disabled:!d,onClick:()=>c(h),children:"创建并继续"})]})]})})}function Wv({state:n,selections:a,setSelections:s,error:l,close:c,save:h}){var x,b;const[d,m]=S.useState(((x=n.sources.find(E=>E.id===a.cutting))==null?void 0:x.businessSection)||""),[p,g]=S.useState(((b=n.sources.find(E=>E.id===a.towerDaily))==null?void 0:b.businessSection)||""),v=E=>n.usesBusinessSections?n.sources.filter(w=>w.businessSection===E):n.sources;return o.jsx("div",{className:"pm-dialog-overlay",children:o.jsxs("section",{className:"pm-dialog pm-binding-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"binding-title",children:[o.jsx("h2",{id:"binding-title",children:"数据库绑定"}),o.jsx("p",{children:"只绑定每日主数据库。月累计和年累计由软件查询计算；下料月计划库通过主库的 Relation 自动识别。"}),n.usesBusinessSections&&o.jsxs("label",{children:["下料业务板块",o.jsx(Je,{value:d,ariaLabel:"下料业务板块",placeholder:"不处理下料消息",options:[{value:"",label:"不处理下料消息"},...n.businessSections.map(E=>({value:E,label:E}))],onChange:E=>{m(E),s({...a,cutting:""})}})]}),o.jsxs("label",{children:["下料主数据库",o.jsx(Je,{value:a.cutting,ariaLabel:"下料主数据库",placeholder:"不处理下料消息",disabled:n.usesBusinessSections&&!d,options:[{value:"",label:"不处理下料消息"},...v(d).map(E=>({value:E.id,label:E.name}))],onChange:E=>s({...a,cutting:E})})]}),n.usesBusinessSections&&o.jsxs("label",{children:["塔筒业务板块",o.jsx(Je,{value:p,ariaLabel:"塔筒业务板块",placeholder:"请选择业务板块",options:n.businessSections.map(E=>({value:E,label:E})),onChange:E=>{g(E),s({...a,towerDaily:""})}})]}),o.jsxs("label",{children:["塔筒产线主数据库",o.jsx(Je,{value:a.towerDaily,ariaLabel:"塔筒产线主数据库",placeholder:"请选择具体数据库",disabled:n.usesBusinessSections&&!p,options:v(p).map(E=>({value:E.id,label:E.name})),onChange:E=>s({...a,towerDaily:E})})]}),l&&o.jsx("div",{className:"pm-notice",role:"alert",children:l}),o.jsxs("div",{className:"pm-dialog-actions",children:[o.jsx("button",{onClick:c,children:"取消"}),o.jsx("button",{className:"primary-button",disabled:!a.towerDaily,onClick:h,children:"保存绑定"})]})]})})}function Iv({configure:n,disabled:a}){return o.jsxs("header",{className:"content-header",children:[o.jsx("h1",{children:"生产消息入库"}),o.jsx("button",{type:"button",className:"template-config-button",disabled:a,"aria-label":"数据库绑定",title:"数据库绑定",onClick:n,children:o.jsx(Ff,{})})]})}function ex({current:n}){return o.jsx(W0,{current:n,titles:["录入消息","解析确认","完成"],label:"生产消息入库进度"})}const tx={audit:"正在检查",repair:"正在备份修复并复查",export:"正在导出",pickFolder:"选择目录",openOutput:"正在打开目录"},nx=n=>n.split(/[\\/]/).pop();function CA(){const[n,a]=S.useState(""),[s,l]=S.useState(),[c,h]=S.useState(),[d,m]=S.useState(),[p,g]=S.useState(),[v,x]=S.useState(),[b,E]=S.useState(""),[w,N]=S.useState("全部"),[C,A]=S.useState(),k=S.useRef(!1),V=S.useRef(0);S.useEffect(()=>()=>{V.current++},[]);const z=(s==null?void 0:s.issues.filter(M=>M.severity==="错误").length)||0,L=(s==null?void 0:s.issues.filter(M=>M.severity==="警告").length)||0;function U(M){k.current||(a(M),l(void 0),m(void 0),h(void 0),E(""),A(void 0),N("全部"))}async function D(M){if(k.current||M==="audit"&&!n.trim()||["repair","export","openOutput"].includes(M)&&!s)return;const O=++V.current;k.current=!0,g(M),E(""),x(void 0),M==="audit"&&(l(void 0),h(void 0),N("全部")),M==="repair"&&(l($=>$&&{...$,repaired:!1,canExport:!1}),h(void 0)),["audit","repair","export"].includes(M)&&(m(void 0),A(void 0));try{if(M==="pickFolder"){const $=await he("plan.pickFolder",void 0,6e5);if(O!==V.current)return;$.path&&(k.current=!1,U($.path),k.current=!0)}else{const $=await he(`plan.${M}`,{path:n.trim(),auditId:s==null?void 0:s.auditId,confirmed:M==="repair"||M==="export"},18e5,Z=>{O===V.current&&k.current&&A(Z)});if(O!==V.current)return;if(M==="audit"&&l($),M==="repair"){const Z=$;l(Z.audit),h(Z.repair)}M==="export"&&m($)}}catch($){O===V.current&&(E($ instanceof Error?$.message:String($)),(M==="repair"||M==="export")&&l(Z=>Z&&{...Z,canExport:!1,repaired:!1}))}finally{O===V.current&&(k.current=!1,g(void 0),A(void 0))}}const q=p?tx[p]:d?"候选 PDF 已生成":s?z?"存在待处理错误":s.canExport?"可以导出":"检查完成，待修复":"等待检查";return o.jsxs("div",{className:"page plan-pdf-page",children:[o.jsxs("header",{className:"plan-header",children:[o.jsx("h1",{children:"挂网计划导出"}),o.jsx("span",{children:q})]}),o.jsxs("div",{className:"plan-content",children:[o.jsxs("section",{className:"plan-source",children:[o.jsx("label",{htmlFor:"plan-folder",children:"月度目录"}),o.jsxs("div",{children:[o.jsx("input",{id:"plan-folder",value:n,disabled:!!p,placeholder:"选择包含一二三级计划的月份目录",onChange:M=>U(M.target.value)}),o.jsxs("button",{className:"secondary",disabled:!!p,onClick:()=>void D("pickFolder"),children:[o.jsx(mo,{}),"选择目录"]}),o.jsx("button",{className:"primary",disabled:!!p||!n.trim(),onClick:()=>void D("audit"),children:s?"重新检查":"检查计划"})]})]}),b&&o.jsx("p",{className:"plan-error",role:"alert",children:b}),p&&o.jsxs("div",{className:"plan-progress",role:"status",children:[o.jsxs("span",{children:[o.jsx(Sn,{className:"spin"}),tx[p]]}),p==="export"&&C&&o.jsxs(o.Fragment,{children:[o.jsxs("span",{children:[C.current," / ",C.total," · ",C.name]}),o.jsx("progress",{"aria-label":"PDF 导出进度",max:C.total||11,value:C.current})]})]}),o.jsxs("div",{className:"plan-workspace",children:[o.jsxs("section",{className:"plan-inspection",children:[o.jsxs("div",{className:"plan-pane-heading",children:[o.jsx("h2",{children:"检查结果"}),s&&o.jsxs("span",{children:[s.sheetCount," 个工作表"]})]}),s?o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"plan-workbook",children:[o.jsxs("strong",{children:[s.workspace.year," 年 ",s.workspace.month," 月计划"]}),o.jsx("span",{children:nx(s.workspace.workbookPath)})]}),o.jsx("div",{className:"plan-filters","aria-label":"问题筛选",children:["全部","错误","警告"].map(M=>o.jsxs("button",{"aria-pressed":w===M,onClick:()=>N(M),children:[M," ",o.jsx("span",{children:M==="全部"?s.issues.length:M==="错误"?z:L})]},M))}),o.jsxs("div",{className:"plan-issues",children:[s.issues.filter(M=>w==="全部"||M.severity===w).map((M,O)=>o.jsxs("article",{children:[o.jsxs("div",{children:[o.jsx("span",{className:M.severity==="错误"?"plan-severity-error":"",children:M.severity}),o.jsxs("strong",{children:[M.sheet,M.location&&` · ${M.location}`]}),o.jsx("span",{children:M.canAutoFix?"可自动修复":"需手动处理"})]}),o.jsx("p",{children:M.message})]},O)),!s.issues.some(M=>w==="全部"||M.severity===w)&&o.jsx("p",{className:"plan-clear",children:s.issues.length?`没有${w}`:"未发现检查问题"})]}),o.jsxs("div",{className:"plan-next",children:[o.jsx("span",{children:z?s.repaired?"请手动处理剩余错误，再重新检查。":"修复后自动复查，剩余错误需手动处理。":s.canExport?"复查通过，可以导出候选 PDF。":"继续备份并修复，完成导出前准备。"}),o.jsx("button",{className:"secondary",disabled:!!p,onClick:()=>x("repair"),children:s.repaired?"再次修复":"备份并修复"})]}),c&&o.jsxs("details",{className:"plan-details",children:[o.jsx("summary",{children:"备份与修复明细"}),o.jsxs("p",{children:["已调整 ",c.changedCells," 个单元格、",c.changedRows," 行。"]}),o.jsxs("p",{children:["备份：",c.backupPath]})]})]}):o.jsxs("div",{className:"plan-empty",children:[o.jsx(Av,{}),o.jsx("strong",{children:"尚未检查计划"}),o.jsx("p",{children:"选择月度目录后，查看需要处理的问题。"})]})]}),o.jsxs("section",{className:"plan-result",children:[o.jsxs("div",{className:"plan-pane-heading",children:[o.jsx("h2",{children:"导出结果"}),d&&o.jsxs("span",{children:[d.files.length," 份 PDF"]})]}),d?o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"plan-file-list",children:d.files.map(M=>o.jsx("p",{children:nx(M)},M))}),o.jsxs("div",{className:"plan-output",children:[o.jsx("span",{children:"文件位置"}),o.jsx("p",{children:d.outputFolder}),o.jsxs("button",{className:"secondary",disabled:!!p,onClick:()=>void D("openOutput"),children:[o.jsx(mo,{}),"打开输出目录"]})]})]}):o.jsxs("div",{className:"plan-empty",children:[o.jsx(Av,{}),o.jsx("strong",{children:p==="export"?"正在生成候选 PDF":"尚未导出"}),o.jsx("p",{children:"完成检查和修复后，生成 11 份候选 PDF。"})]}),o.jsx("div",{className:"plan-export-action",children:o.jsx("button",{className:"primary",disabled:!!p||!(s!=null&&s.canExport),onClick:()=>x("export"),children:d?"重新导出 PDF":"导出 PDF"})})]})]})]}),o.jsx(po,{open:!!v,onOpenChange:M=>{M||x(void 0)},children:o.jsxs(go,{children:[o.jsx(yo,{className:"dialog-overlay"}),o.jsxs(vo,{className:"plan-confirm",children:[o.jsxs("div",{children:[o.jsx(xo,{children:v==="repair"?"确认备份并修复":"确认导出 PDF"}),o.jsx(So,{asChild:!0,children:o.jsx("button",{className:"secondary","aria-label":"关闭确认",children:o.jsx(Xf,{})})})]}),o.jsx(bo,{children:v==="repair"?"将先备份 Excel，再修复格式和序号，并自动复查。":"将生成 11 份候选 PDF，不修改 Excel。"}),o.jsxs("footer",{children:[o.jsx(So,{asChild:!0,children:o.jsx("button",{className:"secondary",autoFocus:!0,children:"取消"})}),o.jsx("button",{className:"primary",onClick:()=>v&&void D(v),children:v==="repair"?"备份并修复":"确认导出"})]})]})]})})]})}const NA=n=>n.split(/[\\/]/).pop();function DA(){const[n,a]=S.useState(""),[s,l]=S.useState(),[c,h]=S.useState(),[d,m]=S.useState(""),p=S.useRef(!1),g=S.useRef(0);S.useEffect(()=>()=>{g.current++},[]);function v(b){p.current||(a(b),l(void 0),m(""))}async function x(b){if(p.current||b==="export"&&!n.trim()||b==="open"&&!s)return;p.current=!0;const E=++g.current;h(b),m(""),b==="export"&&l(void 0);try{if(b==="pick"){const w=await he("meeting.pickFile",void 0,6e5);E===g.current&&w.path&&(a(w.path),l(void 0))}else if(b==="export"){const w=await he("meeting.export",{path:n.trim()},18e5);E===g.current&&l(w)}else await he("meeting.openOutput",{resultId:s.resultId})}catch(w){E===g.current&&m(w instanceof Error?w.message:String(w))}finally{E===g.current&&(p.current=!1,h(void 0))}}return o.jsxs("div",{className:"page meeting-page",children:[o.jsxs("header",{className:"meeting-header",children:[o.jsx("h1",{children:"生产会资料拆分"}),o.jsx("span",{children:c==="export"?"正在拆分":s?"拆分完成":"等待拆分"})]}),o.jsxs("div",{className:"meeting-content",children:[d&&o.jsx("p",{className:"meeting-error",role:"alert",children:d}),o.jsxs("div",{className:"meeting-workspace",children:[o.jsxs("section",{children:[o.jsx("h2",{children:"源文件"}),o.jsx("label",{htmlFor:"meeting-source",children:"生产会资料 Excel"}),o.jsxs("div",{className:"meeting-input",children:[o.jsx("input",{id:"meeting-source",value:n,disabled:!!c,onChange:b=>v(b.target.value),placeholder:"选择 .xlsx、.xlsm 或 .xls 文件"}),o.jsxs("button",{className:"secondary",disabled:!!c,onClick:()=>void x("pick"),children:[o.jsx(mo,{}),"选择文件"]})]}),o.jsx("p",{className:"meeting-hint",children:"源文件需包含一个工作表，按已发运、在制、预投三个分段拆分。"}),o.jsxs("details",{className:"meeting-rules",children:[o.jsx("summary",{children:"拆分规则"}),o.jsx("p",{children:"生成包含三个独立工作表的 .xlsx，保存到源文件所在目录，保留源文件。"}),o.jsx("p",{children:"保留原有内容、公式和布局，清除红色与绿色背景填充。宏不会保留到输出文件。"})]}),o.jsx("div",{className:"meeting-actions",children:o.jsx("button",{className:"primary",disabled:!!c||!n.trim(),onClick:()=>void x("export"),children:c==="export"?"正在拆分…":s?"重新拆分":"开始拆分"})})]}),o.jsxs("section",{className:"meeting-result","aria-live":"polite",children:[o.jsxs("div",{className:"meeting-result-heading",children:[o.jsx("h2",{children:"拆分结果"}),s&&o.jsxs("span",{children:[s.sheetNames.length," 个工作表"]})]}),s?o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"meeting-file",children:[o.jsx(ho,{}),o.jsxs("div",{children:[o.jsx("h3",{children:NA(s.outputPath)}),o.jsxs("p",{children:["开会日期 · ",s.meetingDate]})]})]}),o.jsx("ol",{children:s.sheetNames.map(b=>o.jsx("li",{children:b},b))}),o.jsxs("div",{className:"meeting-output",children:[o.jsx("span",{children:"文件位置"}),o.jsx("p",{children:s.outputPath}),o.jsxs("button",{className:"secondary",disabled:!!c,onClick:()=>void x("open"),children:[o.jsx(mo,{}),"打开文件位置"]})]})]}):o.jsxs("div",{className:"meeting-empty",children:[c==="export"?o.jsx(Sn,{className:"spin"}):o.jsx(ho,{}),o.jsx("strong",{children:c==="export"?"正在生成拆分文件":"尚未生成拆分文件"}),o.jsx("p",{children:c==="export"?"正在检查并处理工作表，请稍候。":"选择源文件后开始拆分。"})]})]})]})]})]})}const Sd=(n=0)=>{const a=new Date;return{startDate:new Date(Date.UTC(a.getFullYear(),a.getMonth()+n-1,21)).toISOString().slice(0,10),endDate:new Date(Date.UTC(a.getFullYear(),a.getMonth()+n,20)).toISOString().slice(0,10)}},jd={sourceRoot:"",outputRoot:"",reportUrl:"",username:"",password:""},rx=n=>({sourceRoot:n.sourceRoot,outputRoot:n.outputRoot,reportUrl:n.reportUrl,username:n.username,password:""}),Yl=n=>n instanceof Error?n.message:String(n),ax=n=>n?`${n.slice(0,4)} 年 ${Number(n.slice(5,7))} 月`:"—",ix={prepare:"准备中",collect:"正在导出日报",parse:"正在读取数据",summary:"正在生成汇总",complete:"正在完成"};function AA(){const[n,a]=S.useState(),[s,l]=S.useState(Sd),[c,h]=S.useState(jd),[d,m]=S.useState(!1),[p,g]=S.useState("load"),[v,x]=S.useState(""),[b,E]=S.useState(""),[w,N]=S.useState(),[C,A]=S.useState(),[k,V]=S.useState(!1),[z,L]=S.useState(!1),U=S.useRef(0),D=S.useRef(!1),q=Math.floor((Date.parse(`${s.endDate}T00:00:00Z`)-Date.parse(`${s.startDate}T00:00:00Z`))/864e5)+1,M=Number.isFinite(q)?q<1?"结束日期不能早于开始日期。":q>366?"单次统计范围不能超过 366 天。":"":"请选择完整日期。",O=C!=null&&C.total?Math.min(100,Math.max(0,Math.round(C.current/C.total*100))):0;async function $(){const W=++U.current;D.current=!0,g("load"),x("");try{const G=await he("report.getState");W===U.current&&a(G)}catch(G){W===U.current&&x(Yl(G))}finally{W===U.current&&(D.current=!1,g(void 0))}}S.useEffect(()=>($(),()=>{U.current++}),[]);function Z(W){D.current||(l(W),N(void 0),A(void 0),V(!1),x(""),L(!1))}function oe(W){D.current||(m(W),E(""),h(W&&n?rx(n):jd))}async function ue(W){if(W.preventDefault(),D.current||!n)return;const G={...c,sourceRoot:c.sourceRoot.trim(),outputRoot:c.outputRoot.trim(),reportUrl:c.reportUrl.trim(),username:c.username.trim()};if(JSON.stringify(G)===JSON.stringify(rx(n))){oe(!1);return}const ee=++U.current;D.current=!0,g("save"),E("");try{const T=await he("report.saveConfig",G);if(ee!==U.current)return;a(T),m(!1),h(jd),N(void 0),A(void 0),V(!1),x("")}catch(T){ee===U.current&&E(Yl(T))}finally{ee===U.current&&(D.current=!1,g(void 0))}}async function ye(){if(D.current||!(n!=null&&n.credentialsConfigured))return;const W=++U.current;D.current=!0,g("auth"),x("");try{await he("report.authenticate",void 0,600*1e3);const G=await he("report.getState");W===U.current&&a(G)}catch(G){W===U.current&&x(Yl(G))}finally{W===U.current&&(D.current=!1,g(void 0))}}async function Y(){if(D.current||!(n!=null&&n.authenticated)||M)return;const W=++U.current,G={...s};D.current=!0,g("run"),x(""),N(void 0),V(!1),L(!1),A({stage:"prepare",current:0,total:q,message:""});try{const ee=await he("report.run",G,18e5,T=>{W===U.current&&D.current&&A(T)});W===U.current&&(N(ee),A(void 0))}catch(ee){W===U.current&&(x(Yl(ee)),V(!0),A(void 0))}finally{W===U.current&&(D.current=!1,g(void 0))}}async function ae(){if(w)try{await navigator.clipboard.writeText(w.summaryPath),L(!0)}catch{x("无法复制，请选中文件路径手动复制。")}}return o.jsxs("div",{className:"page report-center-page",children:[o.jsxs("header",{className:"report-header",children:[o.jsx("h1",{children:"文件统计汇总"}),o.jsxs("div",{className:"report-header-actions",children:[o.jsx("span",{className:"report-status",children:p==="load"?"加载中":n!=null&&n.authenticated?"已验证登录":"未验证登录"}),o.jsx("button",{className:"secondary report-icon-button","aria-label":"报表设置",title:"报表设置",disabled:!!p||!n,onClick:()=>oe(!0),children:o.jsx(Ff,{})})]})]}),o.jsxs("div",{className:"report-content",children:[v&&o.jsxs("div",{className:"report-error",role:"alert",children:[o.jsx("span",{children:v}),!n&&o.jsx("button",{className:"secondary",disabled:!!p,onClick:()=>void $(),children:"重新加载"})]}),o.jsxs("section",{className:"report-workspace",children:[o.jsxs("div",{className:"report-pane report-period",children:[o.jsxs("div",{className:"report-pane-heading",children:[o.jsx("h2",{children:"统计范围"}),!M&&o.jsxs("span",{children:[q," 天"]})]}),o.jsxs("div",{className:"report-dates",children:[o.jsx(Yt,{label:"开始日期",value:s.startDate,disabled:!!p,onChange:W=>Z({...s,startDate:W})}),o.jsx(Yt,{label:"结束日期",value:s.endDate,disabled:!!p,onChange:W=>Z({...s,endDate:W})})]}),o.jsxs("div",{className:"report-range-tools",children:[o.jsxs("div",{children:[o.jsx("button",{disabled:!!p,onClick:()=>Z(Sd()),children:"本期"}),o.jsx("button",{disabled:!!p,onClick:()=>Z(Sd(-1)),children:"上期"})]}),o.jsx("span",{children:M||`汇总月份 · ${ax(s.endDate)}`})]}),o.jsxs("div",{className:"report-execution",children:[p==="run"&&o.jsxs("div",{className:"report-progress",role:"status",children:[o.jsxs("div",{children:[o.jsxs("span",{children:[o.jsx(Sn,{className:"spin"}),ix[(C==null?void 0:C.stage)||"prepare"]]}),C&&["collect","parse"].includes(C.stage)&&o.jsxs("span",{children:[C.current," / ",C.total]})]}),o.jsx("div",{className:"report-progress-bar",role:"progressbar","aria-label":ix[(C==null?void 0:C.stage)||"prepare"],"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":O,children:o.jsx("i",{style:{width:`${O}%`}})}),(C==null?void 0:C.message)&&o.jsxs("details",{className:"report-details",children:[o.jsx("summary",{children:"处理详情"}),o.jsx("p",{children:C.message})]})]}),!(n!=null&&n.credentialsConfigured)&&n&&o.jsxs("p",{className:"report-setup",children:["请先配置报表连接。",o.jsx("button",{onClick:()=>oe(!0),children:"报表设置"})]}),(n==null?void 0:n.credentialsConfigured)&&!n.authenticated&&o.jsx("p",{className:"report-setup",children:"请先验证登录。"}),o.jsxs("div",{className:"report-actions",children:[(n==null?void 0:n.credentialsConfigured)&&o.jsxs("button",{className:"secondary",disabled:!!p,onClick:ye,children:[p==="auth"&&o.jsx(Sn,{className:"spin"}),p==="auth"?"验证中…":n!=null&&n.authenticated?"重新验证":"验证登录"]}),o.jsx("button",{className:"primary",disabled:!!p||!(n!=null&&n.authenticated)||!!M,onClick:Y,children:p==="run"?"正在汇总…":k?"重新汇总":"开始汇总"})]})]})]}),o.jsxs("div",{className:"report-pane report-result","aria-live":"polite",children:[o.jsxs("div",{className:"report-pane-heading",children:[o.jsx("h2",{children:"汇总结果"}),w&&o.jsx("span",{children:"已完成"})]}),w?o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"report-file",children:[o.jsx(ho,{}),o.jsxs("div",{children:[o.jsxs("h3",{children:[ax(w.period.endDate),"设备台时汇总"]}),o.jsxs("p",{children:[w.period.startDate," — ",w.period.endDate]})]})]}),o.jsxs("dl",{className:"report-result-stats",children:[o.jsxs("div",{children:[o.jsx("dt",{children:"日报"}),o.jsxs("dd",{children:[w.parsedReports," / ",w.plannedReports," 份"]})]}),o.jsxs("div",{children:[o.jsx("dt",{children:"设备"}),o.jsxs("dd",{children:[w.deviceCount," 台"]})]})]}),o.jsxs("div",{className:"report-output",children:[o.jsx("span",{children:"文件位置"}),o.jsx("p",{children:w.summaryPath}),o.jsxs("button",{className:"secondary",onClick:ae,children:[o.jsx(PC,{}),z?"已复制":"复制路径"]})]}),o.jsxs("details",{className:"report-details",children:[o.jsx("summary",{children:"汇总明细"}),o.jsxs("p",{children:["数据点：",w.actualDataPoints," / ",w.expectedDataPoints]}),w.warnings.map((W,G)=>o.jsx("p",{children:W},G))]})]}):o.jsxs("div",{className:"report-empty",children:[o.jsx(ho,{}),o.jsx("strong",{children:p==="run"?"正在生成汇总":k?"未生成汇总文件":"尚未生成汇总"}),o.jsx("p",{children:p==="run"?"完成后可在这里查看文件。":k?"处理错误后，可重新汇总。":"选择统计范围后开始汇总。"})]})]})]})]}),o.jsx(po,{open:d,onOpenChange:oe,children:o.jsxs(go,{children:[o.jsx(yo,{className:"dialog-overlay"}),o.jsxs(vo,{className:"report-settings-dialog",children:[o.jsxs("div",{className:"report-settings-heading",children:[o.jsx(xo,{children:"报表设置"}),o.jsx(So,{asChild:!0,children:o.jsx("button",{className:"secondary report-icon-button",disabled:!!p,"aria-label":"关闭报表设置",children:o.jsx(Xf,{})})})]}),o.jsx(bo,{className:"report-sr-only",children:"设置报表连接与文件保存位置。"}),o.jsxs("form",{onSubmit:ue,children:[o.jsxs("fieldset",{disabled:!!p,children:[o.jsx("legend",{children:"报表连接"}),o.jsxs("label",{children:["报表网页",o.jsx("input",{type:"url",required:!0,value:c.reportUrl,onChange:W=>h({...c,reportUrl:W.target.value}),placeholder:"https://…"})]}),o.jsxs("div",{className:"report-settings-grid",children:[o.jsxs("label",{children:["账号",o.jsx("input",{required:!0,autoComplete:"username",value:c.username,onChange:W=>h({...c,username:W.target.value})})]}),o.jsxs("label",{children:["密码",o.jsx("input",{type:"password",required:!(n!=null&&n.credentialsConfigured),autoComplete:"new-password",value:c.password,onChange:W=>h({...c,password:W.target.value}),placeholder:n!=null&&n.credentialsConfigured?"留空保持原密码":"请输入密码"})]})]})]}),o.jsxs("fieldset",{disabled:!!p,children:[o.jsx("legend",{children:"保存位置"}),o.jsxs("label",{children:["原始日报",o.jsx("input",{required:!0,value:c.sourceRoot,onChange:W=>h({...c,sourceRoot:W.target.value})})]}),o.jsxs("label",{children:["汇总文件",o.jsx("input",{required:!0,value:c.outputRoot,onChange:W=>h({...c,outputRoot:W.target.value})})]})]}),b&&o.jsx("p",{className:"report-error",role:"alert",children:b}),o.jsxs("div",{className:"report-settings-actions",children:[o.jsx(So,{asChild:!0,children:o.jsx("button",{className:"secondary",type:"button",disabled:!!p,children:"取消"})}),o.jsx("button",{className:"primary",type:"submit",disabled:!!p,children:p==="save"?"保存中…":"保存设置"})]})]})]})]})})]})}const cf="••••••••••••",sx=[{key:"connection",label:"连接",keywords:"Notion API 令牌 根页面 数据源",icon:o.jsx(BA,{})},{key:"notification",label:"通知",keywords:"钉钉 Webhook Secret 规则",icon:o.jsx(LA,{})},{key:"data",label:"数据与缓存",keywords:"Notion 数据源 缓存 绑定",icon:o.jsx(UA,{})},{key:"about",label:"关于",keywords:"版本 WebView2 React TypeScript",icon:o.jsx(HA,{})}];function kA({open:n,onClose:a}){const[s,l]=S.useState("connection"),[c,h]=S.useState(""),[d,m]=S.useState(null),[p,g]=S.useState(""),[v,x]=S.useState(""),[b,E]=S.useState(""),w=S.useRef(null),N=S.useRef(null);S.useEffect(()=>{if(!n)return;N.current=document.activeElement instanceof HTMLElement?document.activeElement:null,E("settings.open"),x(""),he("settings.open").then(V=>m(V)).catch(V=>x(V instanceof Error?V.message:"设置加载失败，请重试。")).finally(()=>E("")),window.setTimeout(()=>{var V;return(V=w.current)==null?void 0:V.focus()},0);const k=V=>{V.key==="Escape"&&a()};return window.addEventListener("keydown",k),()=>{var V;window.removeEventListener("keydown",k),(V=N.current)==null||V.focus()}},[n,a]),S.useEffect(()=>{if(!p)return;const k=window.setTimeout(()=>g(""),3e3);return()=>window.clearTimeout(k)},[p]);const C=async(k,V)=>{E(k),x(""),g("");try{const z=await he(k,V,6e4);return(k==="settings.refreshDataSources"||k==="settings.saveConnection")&&cN(!0),m(z.state),g(z.message),!0}catch(z){return x(z instanceof Error?z.message:"操作未完成，请重试。"),!1}finally{E("")}},A=S.useMemo(()=>{const k=c.trim().toLocaleLowerCase("zh-CN");return k?sx.filter(V=>`${V.label} ${V.keywords}`.toLocaleLowerCase("zh-CN").includes(k)):sx},[c]);return n?o.jsx("div",{className:"settings-overlay",onMouseDown:k=>{k.target===k.currentTarget&&a()},children:o.jsxs("div",{className:"settings-window",role:"dialog","aria-modal":"true","aria-label":"设置",children:[o.jsxs("aside",{className:"settings-sidebar",children:[o.jsxs("label",{className:"settings-search",children:[o.jsx(VA,{}),o.jsx("input",{value:c,onChange:k=>h(k.target.value),placeholder:"搜索设置","aria-label":"搜索设置"})]}),o.jsx("div",{className:"settings-sidebar-title",children:"设置"}),o.jsxs("nav",{className:"settings-nav","aria-label":"设置分类",children:[A.map(k=>o.jsxs("button",{type:"button",className:s===k.key?"settings-nav-item active":"settings-nav-item","aria-current":s===k.key?"page":void 0,onClick:()=>l(k.key),children:[o.jsx("span",{className:"settings-nav-icon",children:k.icon}),o.jsx("span",{children:k.label})]},k.key)),A.length===0&&o.jsx("p",{className:"settings-empty-search",children:"没有匹配的设置"})]})]}),o.jsxs("main",{className:"settings-main",children:[o.jsx("button",{ref:w,type:"button",className:"settings-close",onClick:a,"aria-label":"关闭设置",children:o.jsx(qA,{})}),o.jsxs("div",{className:"settings-content",children:[b==="settings.open"&&!d?o.jsx("div",{className:"settings-loading",children:"正在读取本机设置…"}):o.jsxs(o.Fragment,{children:[s==="connection"&&d&&o.jsx(MA,{state:d,busy:b,run:C}),s==="notification"&&d&&o.jsx(RA,{state:d,busy:b,run:C}),s==="data"&&d&&o.jsx(OA,{state:d,busy:b,run:C}),s==="about"&&d&&o.jsx(zA,{state:d})]}),(p||v)&&o.jsx("div",{className:`settings-message ${v?"error":""}`,role:"status","aria-live":"polite",children:v||p})]})]})]})}):null}function MA({state:n,busy:a,run:s}){const[l,c]=S.useState(""),[h,d]=S.useState(!1),[m,p]=S.useState(n.notion.rootPageId);S.useEffect(()=>p(n.notion.rootPageId),[n.notion.rootPageId]);const g=async b=>{await s(b,{token:h?l:"",rootPageId:m})&&(c(""),d(!1))},v=a==="settings.refreshDataSources",x=a==="settings.saveConnection";return o.jsxs(Ao,{title:"连接",description:"管理生产助手使用的外部数据源和服务连接。",children:[o.jsxs(Xr,{title:"Notion",children:[o.jsx(Ht,{title:"连接状态",description:"当前本机连接配置和数据源缓存状态",children:o.jsx(e1,{connected:n.notion.configured,label:n.notion.configured?"已配置":"未配置"})}),o.jsx(Ji,{title:"API 令牌",description:"使用 Windows 当前用户加密后保存在本机",children:o.jsx("input",{className:"settings-input",type:"password",autoComplete:"off",placeholder:"输入 Notion API Token",value:h?l:n.notion.configured?cf:"",onFocus:b=>{!h&&n.notion.configured&&b.currentTarget.select()},onChange:b=>{d(!0),c(b.target.value)}})}),o.jsx(Ji,{title:"根页面 ID",description:"可选。留空时自动发现当前令牌有权限访问的数据源",children:o.jsx("input",{className:"settings-input",value:m,onChange:b=>p(b.target.value)})}),o.jsxs("div",{className:"settings-buttons",children:[o.jsxs("button",{type:"button",className:"settings-button-primary",disabled:!!a,onClick:()=>g("settings.saveConnection"),children:[x&&o.jsx(as,{})," ",x?"正在连接…":"保存并连接"]}),o.jsxs("button",{type:"button",className:"settings-button-secondary",disabled:!!a,onClick:()=>g("settings.refreshDataSources"),children:[v&&o.jsx(as,{})," ",v?"正在刷新…":"刷新数据源"]})]})]}),o.jsxs(Xr,{title:"数据源",children:[o.jsx(Ht,{title:"已发现数据源",description:"最近一次从 Notion 获取的数据源",children:o.jsxs("span",{className:"settings-value",children:[n.notion.dataSourceCount," 个"]})}),o.jsx(Ht,{title:"上次同步",description:"数据源元信息最后更新时间",children:o.jsx("span",{className:"settings-value",children:n.notion.lastSyncedAt||"尚未同步"})})]})]})}function RA({state:n,busy:a,run:s}){const l=n.notification,[c,h]=S.useState(l.enabled),[d,m]=S.useState(l.channelName),[p,g]=S.useState(""),[v,x]=S.useState(""),[b,E]=S.useState(!1),[w,N]=S.useState(!1),[C,A]=S.useState(l.rules);S.useEffect(()=>{h(l.enabled),m(l.channelName),A(l.rules)},[l]);const k={enabled:c,channelName:d,webhook:b?p:"",secret:w?v:""},V=async U=>{await s(U,k)&&(g(""),x(""),E(!1),N(!1))},z=a==="settings.saveNotification",L=a==="settings.testNotification";return o.jsxs(Ao,{title:"通知",description:"配置生产助手全局通知使用的技术通道。业务模块只决定何时通知。",children:[o.jsxs(Xr,{title:"通知服务",children:[o.jsx(Ht,{title:"启用通知",description:"关闭后所有业务模块都不会向外发送通知",children:o.jsx(lx,{checked:c,onChange:h,label:"启用通知"})}),o.jsx(Ht,{title:"发送方式",description:"当前使用的全局通知技术通道",children:o.jsx("span",{className:"settings-value",children:"钉钉机器人 Webhook"})}),o.jsx(Ht,{title:"连接状态",description:l.checkedAt?`上次测试 ${l.checkedAt}`:"尚未发送测试通知",children:o.jsx(e1,{connected:l.connected,label:l.connected===!0?"连接正常":l.connected===!1?"连接失败":"待测试"})})]}),o.jsxs(Xr,{title:"钉钉机器人",children:[o.jsx(Ji,{title:"Webhook URL",description:"使用 Windows 当前用户加密后保存在本机",children:o.jsx("input",{className:"settings-input",type:"password",autoComplete:"off",placeholder:"https://oapi.dingtalk.com/robot/send?...",value:b?p:l.webhookConfigured?cf:"",onFocus:U=>{!b&&l.webhookConfigured&&U.currentTarget.select()},onChange:U=>{E(!0),g(U.target.value)}})}),o.jsx(Ji,{title:"加签密钥",description:"钉钉机器人 Secret，使用 Windows 当前用户加密保存",children:o.jsx("input",{className:"settings-input",type:"password",autoComplete:"off",placeholder:"SEC...",value:w?v:l.secretConfigured?cf:"",onFocus:U=>{!w&&l.secretConfigured&&U.currentTarget.select()},onChange:U=>{N(!0),x(U.target.value)}})}),o.jsx(Ji,{title:"默认接收群",description:"用于识别当前通知渠道",children:o.jsx("input",{className:"settings-input",value:d,onChange:U=>m(U.target.value),placeholder:"生产管理群"})}),o.jsxs("div",{className:"settings-buttons",children:[o.jsxs("button",{type:"button",className:"settings-button-primary",disabled:!!a,onClick:()=>V("settings.saveNotification"),children:[z&&o.jsx(as,{})," ",z?"正在保存…":"保存设置"]}),o.jsxs("button",{type:"button",className:"settings-button-secondary",disabled:!!a,onClick:()=>V("settings.testNotification"),children:[L&&o.jsx(as,{})," ",L?"正在发送…":"发送测试"]})]}),l.status&&o.jsx("p",{className:"settings-inline-status",children:l.status})]}),o.jsxs(Xr,{title:"通知规则",children:[o.jsx("div",{className:"settings-rule-list",children:C.map(U=>o.jsx(Ht,{title:U.name,description:`钉钉 · ${_A(U.level)}`,children:o.jsx(lx,{checked:U.enabled,label:`通知规则：${U.name}`,onChange:D=>A(q=>q.map(M=>M.eventType===U.eventType?{...M,enabled:D}:M))})},U.eventType))}),o.jsx("div",{className:"settings-buttons settings-buttons-end",children:o.jsx("button",{type:"button",className:"settings-button-primary",disabled:!!a,onClick:()=>s("settings.saveNotificationRules",{rules:C}),children:"保存通知规则"})})]})]})}function OA({state:n,busy:a,run:s}){return o.jsx(Ao,{title:"数据与缓存",description:"查看和维护生产助手保存在本机的 Notion 数据源缓存。",children:o.jsxs(Xr,{title:"本地数据",children:[o.jsx(Ht,{title:"Notion 数据源缓存",description:"用于减少重复的网络请求",children:o.jsxs("div",{className:"settings-inline-actions",children:[o.jsxs("span",{className:"settings-value",children:[n.notion.dataSourceCount," 个"]}),o.jsxs("button",{type:"button",className:"settings-text-button",disabled:!!a,onClick:()=>s("settings.refreshDataSources"),children:[a==="settings.refreshDataSources"&&o.jsx(as,{})," ",a==="settings.refreshDataSources"?"刷新中…":"刷新"]})]})}),o.jsx(Ht,{title:"上次同步",description:"数据源元信息最后更新时间",children:o.jsx("span",{className:"settings-value",children:n.notion.lastSyncedAt||"尚未同步"})})]})})}function zA({state:n}){return o.jsx(Ao,{title:"关于",description:"生产助手的版本和运行环境信息。",children:o.jsxs(Xr,{title:"生产助手",children:[o.jsx(Ht,{title:"版本",description:"当前安装版本",children:o.jsx("span",{className:"settings-value",children:n.version})}),o.jsx(Ht,{title:"桌面环境",description:"应用运行容器",children:o.jsx("span",{className:"settings-value",children:"WinUI 3 + WebView2"})}),o.jsx(Ht,{title:"前端",description:"用户界面技术栈",children:o.jsx("span",{className:"settings-value",children:"React + TypeScript"})}),o.jsx(Ht,{title:"本地数据保护",description:"令牌和通知凭据仅保存在本机",children:o.jsx("span",{className:"settings-value",children:"Windows 当前用户加密"})})]})})}function Ao({title:n,description:a,children:s}){return o.jsxs("div",{className:"settings-page",children:[o.jsxs("header",{className:"settings-page-header",children:[o.jsx("h1",{children:n}),o.jsx("p",{children:a})]}),s]})}function Xr({title:n,children:a}){return o.jsxs("section",{className:"settings-section",children:[o.jsx("h2",{children:n}),o.jsx("div",{className:"settings-section-body",children:a})]})}function Ht({title:n,description:a,children:s}){return o.jsxs("div",{className:"settings-row",children:[o.jsxs("div",{className:"settings-row-text",children:[o.jsx("div",{className:"settings-row-title",children:n}),a&&o.jsx("div",{className:"settings-row-description",children:a})]}),o.jsx("div",{className:"settings-row-control",children:s})]})}function Ji({title:n,description:a,children:s}){return o.jsxs("label",{className:"settings-field",children:[o.jsx("span",{className:"settings-field-title",children:n}),a&&o.jsx("span",{className:"settings-field-description",children:a}),o.jsx("span",{className:"settings-field-control",children:s})]})}function lx({checked:n,onChange:a,label:s}){return o.jsx("button",{type:"button",role:"switch","aria-checked":n,"aria-label":s,className:n?"settings-switch checked":"settings-switch",onClick:()=>a(!n),children:o.jsx("span",{})})}function e1({connected:n,label:a}){return o.jsxs("div",{className:`settings-connected ${n===!1?"error":n===null?"pending":""}`,children:[o.jsx("span",{className:"settings-status-dot"}),a]})}function as(){return o.jsx("span",{className:"settings-spinner","aria-hidden":"true"})}const _A=n=>n==="warning"?"警告":n==="info"?"信息":"错误";function VA(){return o.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("circle",{cx:"11",cy:"11",r:"6.5"}),o.jsx("path",{d:"m16 16 4 4"})]})}function BA(){return o.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("path",{d:"M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"}),o.jsx("path",{d:"M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1"})]})}function LA(){return o.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("path",{d:"M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"}),o.jsx("path",{d:"M10 21h4"})]})}function UA(){return o.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("ellipse",{cx:"12",cy:"5",rx:"7",ry:"3"}),o.jsx("path",{d:"M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5"}),o.jsx("path",{d:"M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"})]})}function HA(){return o.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("circle",{cx:"12",cy:"12",r:"9"}),o.jsx("path",{d:"M12 11v6"}),o.jsx("path",{d:"M12 7h.01"})]})}function qA(){return o.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:[o.jsx("path",{d:"m6 6 12 12"}),o.jsx("path",{d:"m18 6-12 12"})]})}const wd=new Date().toISOString().slice(0,10);function YA(){const[n,a]=S.useState(""),[s,l]=S.useState(!1),[c,h]=S.useState([]),[d,m]=S.useState(""),[p,g]=S.useState([]),[v,x]=S.useState(""),[b,E]=S.useState([]),[w,N]=S.useState(""),[C,A]=S.useState([]),[k,V]=S.useState(""),[z,L]=S.useState(""),[U,D]=S.useState("day"),[q,M]=S.useState(wd),[O,$]=S.useState(wd),[Z,oe]=S.useState(wd),[ue,ye]=S.useState("load"),[Y,ae]=S.useState(""),[W,G]=S.useState();S.useEffect(()=>{he("database.getState").then(te=>{a(te.provider),l(te.usesBusinessSections),h(te.businessSections),g(te.sources)}).catch(te=>ae(te instanceof Error?te.message:String(te))).finally(()=>ye(""))},[]);const ee=async te=>{var me,Ce,Q,be;if(x(te),N(""),V(""),L(""),E([]),A([]),G(void 0),ae(""),!!te){ye("schema");try{const _e=await he("database.getSchema",{sourceId:te});A(_e.fields),E(_e.datasets),V(((me=_e.fields.find(vt=>vt.type==="date"))==null?void 0:me.id)||""),L(((Ce=_e.fields.find(vt=>vt.type==="number"))==null?void 0:Ce.id)||""),N(((Q=_e.datasets.find(vt=>vt.name==="本年截止今日"))==null?void 0:Q.id)||((be=_e.datasets[0])==null?void 0:be.id)||"")}catch(_e){ae(_e instanceof Error?_e.message:String(_e))}finally{ye("")}}},T=async()=>{ye("query"),ae(""),G(void 0);try{G(await he("database.inspect",{sourceId:v,datasetId:w,dateFieldId:xe?k:"",valueFieldId:xe?z:"",rangeKind:xe?U:"all",businessDate:q,startDate:O,endDate:Z},12e4))}catch(te){ae(te instanceof Error?te.message:String(te))}finally{ye("")}},_=C.filter(te=>te.type==="date"),re=s?p.filter(te=>te.businessSection===d):p,le=C.filter(te=>te.type==="number"),de=C.find(te=>te.id===z),ce=b.find(te=>te.id===w),xe=(ce==null?void 0:ce.name.trim())==="本年截止今日",ie=S.useMemo(()=>{const te=new Set([k,z]);return[...C.filter(me=>te.has(me.id)),...C.filter(me=>!te.has(me.id))]},[C,k,z]),J=U==="week"||U==="custom",fe=v&&w&&(!xe||k&&(!J||O&&Z));return o.jsxs("div",{className:"page database-viewer-page",children:[o.jsxs("header",{children:[o.jsxs("div",{children:[o.jsx("h1",{children:"数据库查看"}),o.jsx("p",{children:"按当前适配器提供的目录选择数据库并查看真实 View；目录层级不会由界面写死。"})]}),o.jsxs("span",{className:"database-provider",children:[o.jsx(Kd,{}),"当前适配器：",n||"读取中"]})]}),o.jsxs("section",{className:"database-query-panel",children:[o.jsxs("div",{className:"database-query-heading",children:[o.jsx("h2",{children:"查询条件"}),o.jsx("p",{children:"普通 View 读取其完整结果；只有“本年截止今日”可在返回记录内计算日期口径。"})]}),o.jsxs("div",{className:"database-query-grid",children:[s&&o.jsxs("label",{children:["业务板块",o.jsx(Je,{value:d,placeholder:ue==="load"?"正在读取业务板块…":"请选择业务板块",disabled:!!ue,options:c.map(te=>({value:te,label:te})),onChange:te=>{m(te),ee("")}})]}),o.jsxs("label",{children:["数据库",o.jsx(Je,{value:v,placeholder:"请选择具体数据库",disabled:s&&!d||!!ue,options:re.map(te=>({value:te.id,label:te.name})),onChange:ee})]}),o.jsxs("label",{children:["View",o.jsx(Je,{value:w,placeholder:ue==="schema"?"正在读取 View…":"请选择 View",disabled:!v||!!ue,options:b.map(te=>({value:te.id,label:te.name})),onChange:te=>{N(te),G(void 0)}})]}),xe&&o.jsxs(o.Fragment,{children:[o.jsxs("label",{children:["日期字段",o.jsx(Je,{value:k,placeholder:"请选择日期字段",disabled:!C.length||!!ue,options:_.map(te=>({value:te.id,label:te.name})),onChange:V})]}),o.jsxs("label",{children:["累计字段",o.jsx(Je,{value:z,placeholder:"可选择数值字段",disabled:!C.length||!!ue,options:le.map(te=>({value:te.id,label:te.name})),onChange:L})]}),o.jsxs("label",{children:["软件查询口径",o.jsx(Je,{value:U,placeholder:"请选择日期口径",disabled:!!ue,options:[{value:"day",label:"指定日期"},{value:"week",label:"指定日期范围"},{value:"month",label:"月初至指定日期"},{value:"year",label:"年初至指定日期"}],onChange:te=>{D(te),G(void 0)}})]}),!J&&o.jsxs("label",{children:["指定日期",o.jsx(Yt,{value:q,onChange:M})]}),J&&o.jsxs(o.Fragment,{children:[o.jsxs("label",{children:["开始日期",o.jsx(Yt,{value:O,onChange:$})]}),o.jsxs("label",{children:["结束日期",o.jsx(Yt,{value:Z,onChange:oe})]})]})]})]}),o.jsx("div",{className:"database-query-actions",children:o.jsxs("button",{className:"primary",disabled:!fe||!!ue,onClick:T,children:[ue==="query"?o.jsx(Sn,{className:"spin"}):o.jsx(XC,{}),ue==="query"?"正在查询…":"执行查询"]})})]}),Y&&o.jsxs("div",{className:"notice error",role:"alert",children:[o.jsx(qC,{}),o.jsxs("div",{children:[o.jsx("strong",{children:"查询失败"}),o.jsx("span",{children:Y})]})]}),W?o.jsxs("section",{className:"database-result",children:[o.jsxs("div",{className:"database-result-head",children:[o.jsxs("div",{children:[o.jsxs("h2",{children:[W.sourceName," · ",W.datasetName]}),o.jsx("p",{children:xe?`${W.startDate} ～ ${W.endDate}`:"完整 View 结果"})]}),o.jsxs("dl",{children:[o.jsxs("div",{children:[o.jsxs("dt",{children:[o.jsx(ZC,{}),"命中记录"]}),o.jsx("dd",{children:W.recordCount})]}),xe&&o.jsxs("div",{children:[o.jsxs("dt",{children:[o.jsx(QC,{}),(de==null?void 0:de.name)||"累计值"]}),o.jsx("dd",{children:W.total??"—"})]})]})]}),o.jsx("div",{className:"database-table-wrap",children:o.jsxs("table",{children:[o.jsx("thead",{children:o.jsx("tr",{children:ie.map(te=>o.jsxs("th",{children:[te.name,o.jsx("small",{children:te.type})]},te.id))})}),o.jsx("tbody",{children:W.records.map(te=>o.jsx("tr",{children:ie.map(me=>o.jsx("td",{children:PA(te.values[me.id])},me.id))},te.id))})]})}),W.truncated&&o.jsx("p",{className:"database-truncated",children:"结果仅展示前 200 条，命中数量和累计值按全部记录计算。"})]}):!ue&&!Y&&o.jsxs("section",{className:"database-empty",children:[o.jsx(Kd,{}),o.jsx("h2",{children:s?"选择业务板块、数据库和 View 后执行查询":"选择数据库和 View 后执行查询"}),o.jsx("p",{children:"普通 View 显示完整结果；“本年截止今日”可进一步选择日期口径。所有操作均为只读。"})]})]})}function PA(n){return n==null||n===""?"—":typeof n=="boolean"?n?"是":"否":typeof n=="number"?n.toLocaleString("zh-CN",{maximumFractionDigits:2}):String(n)}function GA(){const[n,a]=S.useState(()=>window.location.search),[s,l]=S.useState(!1);S.useEffect(()=>{const E=()=>a(window.location.search);return window.addEventListener("popstate",E),()=>window.removeEventListener("popstate",E)},[]);const c=new URLSearchParams(n),h=c.get("route"),d=h!=null&&h.startsWith("navigation:")||h==="daily-weld"||h==="production-message"||h==="database-viewer"||h==="daily-report"||h==="report-center"||h==="plan-pdf"||h==="production-meeting"?h:"production-message",m=c.get("navigation")||"",p=Zb();S.useEffect(()=>{OC(d,m)},[d,m]);const g=E=>he("app.navigateNative",{tag:E}).catch(()=>{}),v=d.startsWith("navigation:")?d.slice(11):d,x=d.startsWith("navigation:");S.useEffect(()=>(document.body.classList.toggle("settings-over-native",x&&s),()=>document.body.classList.remove("settings-over-native")),[x,s]);const b=()=>{l(!1),window.dispatchEvent(new Event("production-settings-updated")),he("settings.close").catch(()=>{})};return o.jsxs("div",{className:`desktop-shell ${x&&s?"settings-over-native":""}`,children:[o.jsx("div",{className:"production-message-demo desktop-shell-navigation",children:o.jsx(gA,{active:v,navigate:g,openSettings:()=>l(!0)})}),o.jsx("div",{className:`desktop-shell-content ${x?"desktop-shell-content-native":""}`,children:x?o.jsx("div",{className:"native-content-slot","aria-hidden":"true"}):o.jsx(jT,{mode:"wait",children:o.jsx(Yf.div,{className:d==="production-message"||d==="daily-weld"?"production-message-demo production-message-content":"app-shell","data-page-route":d,initial:p?!1:{opacity:0,y:8},animate:{opacity:1,y:0},exit:p?void 0:{opacity:0,y:-6},transition:{duration:.2},children:d==="production-message"?o.jsx(wA,{}):d==="daily-weld"?o.jsx(hA,{openSettings:()=>l(!0)}):o.jsx("main",{children:d==="production-meeting"?o.jsx(DA,{}):d==="plan-pdf"?o.jsx(CA,{}):d==="database-viewer"?o.jsx(YA,{}):d==="daily-report"?o.jsx(uA,{openSettings:()=>l(!0)}):o.jsx(AA,{})})},d)})}),o.jsx(kA,{open:s,onClose:b})]})}Rj.createRoot(document.getElementById("root")).render(o.jsx(ux.StrictMode,{children:o.jsx(GA,{})}));
