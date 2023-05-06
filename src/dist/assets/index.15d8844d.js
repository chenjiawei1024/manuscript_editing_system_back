import{d as L,c as s,X as ae,l as B,a as N,J as oe,j as D,B as ie,k as re,y as le,x as se,h as I,Z as x,m as U,p as H,H as E,z as b,aq as _,w as f,$ as P,o as w,ac as ue,as as A,ab as ce,a0 as de,b as ve}from"./index.a8adaa79.js";import{a as fe}from"./axios.4378cf49.js";import{o as me,p as ge,c as he,e as ye,f as pe,g as Ce,V as Se,j as be,l as T}from"./VTextField.e878460c.js";import{V as j,a as Ve}from"./VNavigationDrawer.0b7abcbd.js";import{u as K,q as ke,f as $,g as G,h as we,i as q,d as Z,k as J,j as W,l as X,n as Q,U as _e,p as Pe,w as Be,B as Ee,Z as Le,V as M,a as O}from"./VList.d9a00a96.js";const De=L({name:"VAppBarTitle",props:me(),setup(e,t){let{slots:n}=t;return K(()=>s(ge,ae(e,{class:"v-app-bar-title"}),n)),{}}}),Ie=ke("flex-grow-1","div","VSpacer");var xe=["onActivate","onAddUndo","onBeforeAddUndo","onBeforeExecCommand","onBeforeGetContent","onBeforeRenderUI","onBeforeSetContent","onBeforePaste","onBlur","onChange","onClearUndos","onClick","onContextMenu","onCopy","onCut","onDblclick","onDeactivate","onDirty","onDrag","onDragDrop","onDragEnd","onDragGesture","onDragOver","onDrop","onExecCommand","onFocus","onFocusIn","onFocusOut","onGetContent","onHide","onInit","onKeyDown","onKeyPress","onKeyUp","onLoadContent","onMouseDown","onMouseEnter","onMouseLeave","onMouseMove","onMouseOut","onMouseOver","onMouseUp","onNodeChange","onObjectResizeStart","onObjectResized","onObjectSelected","onPaste","onPostProcess","onPostRender","onPreProcess","onProgressState","onRedo","onRemove","onReset","onSaveContent","onSelectionChange","onSetAttrib","onSetContent","onShow","onSubmit","onUndo","onVisualAid"],Ae=function(e){return xe.map(function(t){return t.toLowerCase()}).indexOf(e.toLowerCase())!==-1},Te=function(e,t,n){Object.keys(t).filter(Ae).forEach(function(o){var a=t[o];typeof a=="function"&&(o==="onInit"?a(e,n):n.on(o.substring(2),function(r){return a(r,n)}))})},je=function(e,t,n,o){var a=e.modelEvents?e.modelEvents:null,r=Array.isArray(a)?a.join(" "):a;B(o,function(l,u){n&&typeof l=="string"&&l!==u&&l!==n.getContent({format:e.outputFormat})&&n.setContent(l)}),n.on(r||"change input undo redo",function(){t.emit("update:modelValue",n.getContent({format:e.outputFormat}))})},Me=function(e,t,n,o,a,r){o.setContent(r()),n.attrs["onUpdate:modelValue"]&&je(t,n,o,a),Te(e,n.attrs,o)},R=0,Y=function(e){var t=Date.now(),n=Math.floor(Math.random()*1e9);return R++,e+"_"+n+R+String(t)},Oe=function(e){return e!==null&&e.tagName.toLowerCase()==="textarea"},z=function(e){return typeof e>"u"||e===""?[]:Array.isArray(e)?e:e.split(" ")},Re=function(e,t){return z(e).concat(z(t))},ze=function(e){return e==null},F=function(){return{listeners:[],scriptId:Y("tiny-script"),scriptLoaded:!1}},Fe=function(){var e=F(),t=function(a,r,l,u){var i=r.createElement("script");i.referrerPolicy="origin",i.type="application/javascript",i.id=a,i.src=l;var v=function(){i.removeEventListener("load",v),u()};i.addEventListener("load",v),r.head&&r.head.appendChild(i)},n=function(a,r,l){e.scriptLoaded?l():(e.listeners.push(l),a.getElementById(e.scriptId)||t(e.scriptId,a,r,function(){e.listeners.forEach(function(u){return u()}),e.scriptLoaded=!0}))},o=function(){e=F()};return{load:n,reinitialize:o}},Ne=Fe(),Ue=function(){return typeof window<"u"?window:global},h=function(){var e=Ue();return e&&e.tinymce?e.tinymce:null},He={apiKey:String,cloudChannel:String,id:String,init:Object,initialValue:String,inline:Boolean,modelEvents:[String,Array],plugins:[String,Array],tagName:String,toolbar:[String,Array],modelValue:String,disabled:Boolean,tinymceScriptSrc:String,outputFormat:{type:String,validator:function(e){return e==="html"||e==="text"}}},y=globalThis&&globalThis.__assign||function(){return y=Object.assign||function(e){for(var t,n=1,o=arguments.length;n<o;n++){t=arguments[n];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e},y.apply(this,arguments)},Ke=function(e,t,n,o){return e(o||"div",{id:t,ref:n})},$e=function(e,t,n){return e("textarea",{id:t,visibility:"hidden",ref:n})},Ge=N({props:He,setup:function(e,t){var n=e.init?y({},e.init):{},o=oe(e),a=o.disabled,r=o.modelValue,l=o.tagName,u=D(null),i=null,v=e.id||Y("tiny-vue"),g=e.init&&e.init.inline||e.inline,m=!!t.attrs["onUpdate:modelValue"],C=!0,V=e.initialValue?e.initialValue:"",k="",ee=function(c){return m?function(){return r!=null&&r.value?r.value:""}:function(){return c?V:k}},S=function(){var c=ee(C),d=y(y({},n),{readonly:e.disabled,selector:"#"+v,plugins:Re(n.plugins,e.plugins),toolbar:e.toolbar||n.toolbar,inline:g,setup:function(p){i=p,p.on("init",function(te){return Me(te,e,t,p,r,c)}),typeof n.setup=="function"&&n.setup(p)}});Oe(u.value)&&(u.value.style.visibility=""),h().init(d),C=!1};B(a,function(c){var d;i!==null&&(typeof((d=i.mode)===null||d===void 0?void 0:d.set)=="function"?i.mode.set(c?"readonly":"design"):i.setMode(c?"readonly":"design"))}),B(l,function(c){var d;m||(k=i.getContent()),(d=h())===null||d===void 0||d.remove(i),x(function(){return S()})}),ie(function(){if(h()!==null)S();else if(u.value&&u.value.ownerDocument){var c=e.cloudChannel?e.cloudChannel:"6",d=e.apiKey?e.apiKey:"no-api-key",p=ze(e.tinymceScriptSrc)?"https://cdn.tiny.cloud/1/"+d+"/tinymce/"+c+"/tinymce.min.js":e.tinymceScriptSrc;Ne.load(u.value.ownerDocument,p,S)}}),re(function(){h()!==null&&h().remove(i)}),g||(le(function(){C||S()}),se(function(){var c;m||(k=i.getContent()),(c=h())===null||c===void 0||c.remove(i)}));var ne=function(c){var d;k=i.getContent(),(d=h())===null||d===void 0||d.remove(i),n=y(y({},n),c),x(function(){return S()})};return t.expose({rerender:ne}),function(){return g?Ke(I,v,u,e.tagName):$e(I,v,u)}}});const qe=async()=>{const{data:e}=await fe.get("https://v.api.aa1.cn/api/topbaidu/");return e.newslist};const Ze=L({name:"VFooter",props:{app:Boolean,color:String,height:{type:[Number,String],default:"auto"},...$(),...G(),...we(),...q(),...Z({tag:"footer"}),...U()},setup(e,t){let{slots:n}=t;const{themeClasses:o}=H(e),{backgroundColorClasses:a,backgroundColorStyles:r}=J(E(e,"color")),{borderClasses:l}=W(e),{elevationClasses:u}=X(e),{roundedClasses:i}=Q(e),v=D(32),{resizeRef:g}=_e(V=>{!V.length||(v.value=V[0].target.clientHeight)}),m=b(()=>e.height==="auto"?v.value:parseInt(e.height,10)),{layoutItemStyles:C}=Pe({id:e.name,order:b(()=>parseInt(e.order,10)),position:b(()=>"bottom"),layoutSize:m,elementSize:b(()=>e.height==="auto"?void 0:m.value),active:b(()=>e.app),absolute:E(e,"absolute")});return K(()=>s(e.tag,{ref:g,class:["v-footer",o.value,a.value,l.value,u.value,i.value],style:[r.value,e.app?C.value:void 0]},n)),{}}});const Je=L({name:"VSheet",props:{color:String,...$(),...Be(),...G(),...he(),...ye(),...q(),...Z(),...U()},setup(e,t){let{slots:n}=t;const{themeClasses:o}=H(e),{backgroundColorClasses:a,backgroundColorStyles:r}=J(E(e,"color")),{borderClasses:l}=W(e),{dimensionStyles:u}=Ee(e),{elevationClasses:i}=X(e),{locationStyles:v}=pe(e),{positionClasses:g}=Ce(e),{roundedClasses:m}=Q(e);return()=>s(e.tag,{class:["v-sheet",o.value,a.value,l.value,i.value,g.value,m.value],style:[r.value,u.value,v.value]},n)}}),nn=N({__name:"index",setup(e){const t=D([]);(async()=>{const a=await qe();t.value=a})();const o=()=>{};return(a,r)=>(w(),_(P,null,[s(Se,{elevation:2},{prepend:f(()=>[s(be)]),default:f(()=>[s(De,null,{default:f(()=>[ue("Creation")]),_:1}),s(Ie),s(Le,{"max-width":"156"},{default:f(()=>[s(T,{"bg-color":"grey-lighten-2",class:"rounded-pill overflow-hidden",density:"compact","hide-details":"",variant:"solo"})]),_:1})]),_:1}),s(j,{width:"300"},{default:f(()=>[s(Je,{color:"grey-lighten-5",height:"128",width:"100%"}),s(M,null,{default:f(()=>[(w(!0),_(P,null,A(t.value,l=>(w(),ve(O,{key:l.hotnum,title:l.title,link:"",onClick:o},null,8,["title"]))),128))]),_:1})]),_:1}),s(Ve,null,{default:f(()=>[ce("div",null,[s(de(Ge),{"api-key":"ej8vo2s2u5a6b5g04917ajn437b37nxf5olm4yemnyz9gcad",init:{skin:"oxide-dark",content_css:"dark",branding:!1,plugins:"lists link image table code help wordcount"}})])]),_:1}),s(j,{location:"right"},{default:f(()=>[s(M,null,{default:f(()=>[(w(),_(P,null,A(5,l=>s(O,{key:l,title:`Item ${l}`,link:""},null,8,["title"])),64))]),_:1})]),_:1}),s(Ze,{app:"",height:"72"},{default:f(()=>[s(T,{"bg-color":"grey-lighten-1",class:"rounded-pill overflow-hidden",density:"compact","hide-details":"",variant:"solo"})]),_:1})],64))}});export{nn as default};