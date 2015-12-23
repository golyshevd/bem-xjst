var BEMHTML=function(t,e){return function(n){if("object"==typeof e&&"undefined"!=typeof t)t.exports=n();else if("function"==typeof define&&define.amd)define([],n);else{var i;i="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,i.BEMHTML=n()}}(function(){return function t(e,n,i){function r(o,h){if(!n[o]){if(!e[o]){var a="function"==typeof require&&require;if(!h&&a)return a(o,!0);if(s)return s(o,!0);var c=new Error("Cannot find module '"+o+"'");throw c.code="MODULE_NOT_FOUND",c}var l=n[o]={exports:{}};e[o][0].call(l.exports,function(t){var n=e[o][1][t];return r(n?n:t)},l,l.exports,t,e,n,i)}return n[o].exports}for(var s="function"==typeof require&&require,o=0;o<i.length;o++)r(i[o]);return r}({1:[function(t,e,n){function i(t){this.modDelim=t.mod||"_",this.elemDelim=t.elem||"__"}n.ClassBuilder=i,i.prototype.build=function(t,e){return void 0===e?t:t+this.elemDelim+e},i.prototype.buildModPostfix=function(t,e){var n=this.modDelim+t;return e!==!0&&(n+=this.modDelim+e),n},i.prototype.buildBlockClass=function(t,e,n){var i=t;return n&&(i+=this.buildModPostfix(e,n)),i},i.prototype.buildElemClass=function(t,e,n,i){var r=this.buildBlockClass(t)+this.elemDelim+e;return i&&(r+=this.buildModPostfix(n,i)),r},i.prototype.split=function(t){return t.split(this.elemDelim,2)}},{}],2:[function(t,e,n){function i(t){this._bemhtml=t,this.ctx=null,this.block="",this._currBlock="",this.elem=null,this.mods={},this.elemMods={},this.position=0,this._listLength=0,this._notNewList=!1,this._onceRef={}}var r=t("./utils");n.Context=i,i.prototype._flush=null,i.prototype.isArray=r.isArray,i.prototype.isSimple=r.isSimple,i.prototype.isShortTag=r.isShortTag,i.prototype.extend=r.extend,i.prototype.identify=r.identify,i.prototype.xmlEscape=r.xmlEscape,i.prototype.attrEscape=r.attrEscape,i.prototype.jsAttrEscape=r.jsAttrEscape,i.prototype.isFirst=function(){return 1===this.position},i.prototype.isLast=function(){return this.position===this._listLength},i.prototype.generateId=function(){return r.identify(this.ctx)},i.prototype.reapply=function(t){return this._bemhtml.run(t)}},{"./utils":7}],3:[function(t,e,n){function i(t,e,n,i){this.bemhtml=t,this.block=null,this.elem=null,this.jsClass=null,this.canFlush=!0,this.options={},this.def=new c(this),this.tag=new c(this),this.attrs=new c(this),this.mod=new c(this),this.js=new c(this),this.mix=new c(this),this.bem=new c(this),this.cls=new c(this),this.content=new c(this),this.rest={},this.init(e,n),this.initModes(i)}function r(){return this.ctx.content}var s=t("./utils"),o=t("./tree").Template,h=t("./tree").PropertyMatch,a=t("./tree").CompilerOptions,c=t("./match").Match;n.Entity=i,i.prototype.init=function(t,e){this.block=t,this.elem=e,this.jsClass=this.bemhtml.classBuilder.build(this.block,this.elem)},i.prototype.initModes=function(t){for(var e=0;e<t.length;e++){for(var n=t[e],i=n.predicates.length-1;i>=0;i--){var r=n.predicates[i];if(r instanceof h&&"_mode"===r.key){n.predicates.splice(i,1),this._initRest(r.value),this.rest[r.value].push(n);break}}-1===i&&this.def.push(n);for(var i=n.predicates.length-1;i>=0;i--){var r=n.predicates[i];r instanceof a&&(this.options=s.extend(this.options,r.options))}}},i.prototype._initRest=function(t){"tag"===t||"attrs"===t||"js"===t||"mix"===t||"bem"===t||"cls"===t||"content"===t||"default"===t?"default"===t?this.rest[t]=this.def:this.rest[t]=this[t]:this.rest.hasOwnProperty(t)||(this.rest[t]=new c(this))},i.prototype.setDefaults=function(){if(0!==this.content.count&&this.content.push(new o([],r)),0!==this.def.count){this.canFlush=this.options.flush||!1;var t=this;this.def.push(new o([],function(){return t.defaultBody(this)}))}},i.prototype.prepend=function(t){for(var e=Object.keys(this.rest),n=0;n<e.length;n++){var i=e[n];t.rest[i]&&this.rest[i].prepend(t.rest[i])}e=Object.keys(t.rest);for(var n=0;n<e.length;n++){var i=e[n];this.rest[i]||(this._initRest(i),this.rest[i].prepend(t.rest[i]))}},i.prototype.run=function(t){return 0!==this.def.count?this.def.exec(t):this.defaultBody(t)},i.prototype.defaultBody=function(t){var e=t.ctx.tag;void 0===e&&(e=this.tag.exec(t));var n;t.ctx.js!==!1&&(n=this.js.exec(t));var i=this.bem.exec(t),r=this.cls.exec(t),s=this.mix.exec(t),o=this.attrs.exec(t),h=this.content.exec(t);return 0===this.content.count&&void 0===h&&(h=t.ctx.content),this.bemhtml.render(t,this,e,n,i,r,s,o,h)}},{"./match":5,"./tree":6,"./utils":7}],4:[function(t,e,n){function i(t){this.options=t||{},this.entities=null,this.defaultEnt=null,this.tree=null,this.match=null,this.contextConstructor=function(t){a.call(this,t)},r(this.contextConstructor,a),this.context=null,this.classBuilder=new c(this.options.naming||{}),this.depth=0,this.canFlush=!1,this.oninit=null,this.defaultEnt=new h(this,"","",[]),this.defaultElemEnt=new h(this,"","",[])}var r=t("inherits"),s=t("./tree").Tree,o=t("./tree").PropertyMatch,h=t("./entity").Entity,a=t("./context").Context,c=t("./class-builder").ClassBuilder,l=t("./utils");e.exports=i,i.locals=s.methods.concat("local","applyCtx","applyNext","apply"),i.prototype.compile=function(t){function e(){return o._run(o.context.ctx)}function n(t,n){return n?o.local(n,function(){return o.local({ctx:t},e)}):o.local({ctx:t},e)}function i(t,e){return o.applyMode(t,e)}function r(t){return function(e){return o.local(t,e)}}var o=this,h=new s({refs:{applyCtx:n,local:r}}),a=this.recompileInput(t),c=h.build(a,[r,n,function u(t){return t?o.local(t,u):o.applyNext()},i]);this.tree&&(c={templates:c.templates.concat(this.tree.templates),oninit:this.tree.oninit.concat(c.oninit)}),this.tree=c;var l=this.groupEntities(c.templates);l=this.transformEntities(l),this.entities=l,this.oninit=c.oninit},i.prototype.recompileInput=function(t){var e=t.toString(),n=i.locals;return"function"==typeof t&&t.length===n.length?t:(e=e.replace(/^function[^{]+{|}$/g,""),e=new Function(n.join(", "),e))},i.prototype.groupEntities=function(t){for(var e={},n=0;n<t.length;n++){var i,r=t[n].clone(),s=null;i=void 0;for(var h=0;h<r.predicates.length;h++){var a=r.predicates[h];if(a instanceof o){if("block"===a.key)s=a.value;else{if("elem"!==a.key)continue;i=a.value}r.predicates.splice(h,1),h--}}if(null===s)throw new Error('block("...") not found in one of the templates');var c=this.classBuilder.build(s,i);e[c]||(e[c]=[]),e[c].push(r)}return e},i.prototype.transformEntities=function(t){for(var e=[],n=Object.keys(t),i=0;i<n.length;i++){var r=n[i],s=this.classBuilder.split(r),o=s[0],a=s[1];"*"===a&&e.push(o),t[r]=new h(this,o,a,t[r])}if(t.hasOwnProperty("*")){for(var c=t["*"],i=0;i<n.length;i++){var r=n[i];"*"!==r&&t[r].prepend(c)}this.defaultEnt.prepend(c),this.defaultElemEnt.prepend(c)}for(var i=0;i<e.length;i++){for(var o=e[i],l=this.classBuilder.build(o,"*"),c=t[l],i=0;i<n.length;i++){var r=n[i];if(r!==l){var u=t[r];u.block===o&&void 0!==u.elem&&t[r].prepend(c)}}this.defaultElemEnt.prepend(c)}for(var i=0;i<n.length;i++){var r=n[i];t[r].setDefaults(),this.defaultEnt.setDefaults(),this.defaultElemEnt.setDefaults()}return t},i.prototype._run=function(t){var e;return e=void 0===t||""===t||null===t?this.runEmpty():l.isArray(t)?this.runMany(t):l.isSimple(t)?this.runSimple(t):this.runOne(t)},i.prototype.run=function(t){var e=this.match,n=this.context;this.match=null,this.context=new this.contextConstructor(this),this.canFlush=null!==this.context._flush,this.depth=0;var i=this._run(t);return this.canFlush&&(i=this.context._flush(i)),this.match=e,this.context=n,i},i.prototype.runEmpty=function(){return this.context._listLength--,""},i.prototype.runMany=function(t){var e="",n=this.context,i=n.position,r=n._notNewList;if(r?n._listLength+=t.length-1:(n.position=0,n._listLength=t.length),n._notNewList=!0,this.canFlush)for(var s=0;s<t.length;s++)e+=n._flush(this._run(t[s]));else for(var s=0;s<t.length;s++)e+=this._run(t[s]);return r||(n.position=i),e},i.prototype.runSimple=function(t){this.context._listLength--;var e="";return(t&&t!==!0||0===t)&&(e+=t),e},i.prototype.runOne=function(t){var e=this.context,n=e.ctx,i=e.block,r=e._currBlock,s=e.elem,o=e.mods,h=e.elemMods;t.block||t.elem?e._currBlock="":e._currBlock=e.block,e.ctx=t,t.block?(e.block=t.block,t.mods?e.mods=t.mods:e.mods={}):t.elem?r&&(e.block=r):e.block="",e.elem=t.elem,t.elemMods?e.elemMods=t.elemMods:e.elemMods={};var a=e.block||"",c=e.elem;a||c?e.position++:e._listLength--,this.depth++;var l=this.classBuilder.build(a,c),u=!1,p=this.entities[l];p?this.canFlush&&!p.canFlush&&(u=!0,this.canFlush=!1):(p=this.defaultEnt,void 0!==c&&(p=this.defaultElemEnt),p.init(a,c));var f=p.run(e);return e.ctx=n,e.block=i,e.elem=s,e.mods=o,e.elemMods=h,e._currBlock=r,this.depth--,u&&(this.canFlush=!0),f},i.prototype.render=function(t,e,n,i,r,s,o,h,a){var c=t.ctx;if(void 0===n&&(n="div"),!n)return this.renderNoTag(t,i,r,s,o,h,a);var u="<"+n,p=c.js;p!==!1&&(i===!0&&(i={}),i?p!==!0&&(i=l.extend(p,i)):i=p===!0?{}:p);var f;i&&(f={},f[e.jsClass]=i);var d=r;void 0===d&&(d=void 0===c.bem?e.block||e.elem:c.bem),d=!!d,void 0===s&&(s=c.cls);var m=e.block&&f&&!e.elem;if(!d&&!s)return this.renderClose(u,t,n,h,d,c,a);if(u+=' class="',d){var y=c.elemMods||c.mods;!y&&c.block&&(y=t.mods),u+=e.jsClass,u+=this.buildModsClasses(e.block,e.elem,y);var v=o;if(c.mix&&(v=v?[].concat(v,c.mix):c.mix),v){var b=this.renderMix(e,v,f,m);u+=b.out,f=b.jsParams,m=b.addJSInitClass}s&&(u+=" "+s)}else s&&(u+=s);return u+=m?' i-bem"':'"',d&&f&&(u+=" data-bem='"+l.jsAttrEscape(JSON.stringify(f))+"'"),this.renderClose(u,t,n,h,d,c,a)},i.prototype.renderClose=function(t,e,n,i,r,s,o){var h=t;if(i=l.extend(i,s.attrs)){var a;for(a in i){var c=i[a];void 0!==c&&(h+=" "+a+'="'+l.attrEscape(l.isSimple(c)?c:this.context.reapply(c))+'"')}}return l.isShortTag(n)?(h+="/>",this.canFlush&&(h=e._flush(h))):(h+=">",this.canFlush&&(h=e._flush(h)),(o||0===o)&&(h+=this.renderContent(o,r)),h+="</"+n+">"),this.canFlush&&(h=e._flush(h)),h},i.prototype.renderMix=function(t,e,n,i){var r={},s=this.context,o=n,h=i;r[t.jsClass]=!0,l.isArray(e)||(e=[e]);for(var a=this.classBuilder,c="",u=0;u<e.length;u++){var p=e[u];if(void 0!==p){"string"==typeof p&&(p={block:p,elem:void 0});var f=p.block||p.elem,d=p.block||p._block||s.block,m=p.elem||p._elem||s.elem,y=a.build(d,m),v=p.elem||p._elem||(p.block?void 0:s.elem);if(f&&(c+=" "+a.build(d,v)),c+=this.buildModsClasses(d,v,p.elemMods||p.mods),p.js&&(o||(o={}),o[a.build(d,p.elem)]=p.js===!0?{}:p.js,h||(h=d&&!p.elem)),f&&!r[y]){r[y]=!0;var b=this.entities[y];if(b){var g=s.block,x=s.elem,k=b.mix.exec(s);if(s.elem=x,s.block=g,k)for(var w=0;w<k.length;w++){var M=k[w];(M.block||M.elem)&&r[a.build(M.block,M.elem)]||(M._block=d,M._elem=m,e=e.slice(0,u+1).concat(M,e.slice(u+1)))}}}}}return{out:c,jsParams:o,addJSInitClass:h}},i.prototype.buildModsClasses=function(t,e,n){if(!n)return"";var i,r="";for(i in n)if(n.hasOwnProperty(i)){var s=n[i];if(s||0===s){"boolean"!=typeof s&&(s+="");var o=this.classBuilder;r+=" "+(e?o.buildElemClass(t,e,i,s):o.buildBlockClass(t,i,s))}}return r},i.prototype.renderContent=function(t,e){var n=this.context,i=n.position,r=n._listLength,s=n._notNewList;n._notNewList=!1,e&&(n.position=1,n._listLength=1);var o=this._run(t);return n.position=i,n._listLength=r,n._notNewList=s,o},i.prototype.renderNoTag=function(t,e,n,i,r,s,o){return o||0===o?this._run(o):""},i.prototype.local=function(t,e){for(var n=Object.keys(t),i=[],r=0;r<n.length;r++){for(var s=n[r],o=s.split("."),h=this.context,a=0;a<o.length-1;a++)h=h[o[a]];i.push({parts:o,value:h[o[a]]}),h[o[a]]=t[s]}for(var c=e.call(this.context),r=0;r<i.length;r++){for(var o=i[r].parts,h=this.context,a=0;a<o.length-1;a++)h=h[o[a]];h[o[a]]=i[r].value}return c},i.prototype.applyNext=function(){return this.match.exec(this.context)},i.prototype.applyMode=function(t,e){var n=this.match.entity.rest[t];if(n){if(!e)return n.exec(this.context);var i=this,r=function(){return n.exec(i.context)};return this.local(e,r)}},i.prototype.exportApply=function(t){var e=this;t.apply=function(t){return e.run(t)},t.compile=function(t){return e.compile(t)};var n={};t.BEMContext=this.contextConstructor,n.BEMContext=t.BEMContext;for(var i=0;i<this.oninit.length;i++){var r=this.oninit[i];r(t,n)}}},{"./class-builder":1,"./context":2,"./entity":3,"./tree":6,"./utils":7,inherits:8}],5:[function(t,e,n){function i(t,e){this.template=t,this.key=e.key,this.value=e.value}function r(t,e){this.template=t,this.keys=e.key,this.value=e.value}function s(t,e){this.template=t,this.key=e.key}function o(t,e){this.template=t,this.body=e.body}function h(t){this.template=t,this.once=null}function a(t){this.template=t,this.wrap=null}function c(t,e){this.mode=t,this.predicates=new Array(e.predicates.length),this.body=e.body;for(var n=[],c=0,l=0;c<this.predicates.length;c++,l++){var v=e.predicates[c];v instanceof p?u.isArray(v.key)?this.predicates[l]=new r(this,v):this.predicates[l]=new i(this,v):v instanceof m?this.predicates[l]=new s(this,v):v instanceof y?this.predicates[l]=new o(this,v):v instanceof f?(l--,n.push(new h(this))):v instanceof d?(l--,n.push(new a(this))):l--}for(var c=0;c<n.length;c++,l++)this.predicates[l]=n[c];this.predicates.length!==l&&(this.predicates.length=l)}function l(t){this.entity=t,this.bemhtml=this.entity.bemhtml,this.templates=[],this.mask=[0],this.maskSize=0,this.maskOffset=0,this.count=0,this.depth=-1,this.thrownError=null}var u=t("./utils"),p=t("./tree").PropertyMatch,f=t("./tree").OnceMatch,d=t("./tree").WrapMatch,m=t("./tree").PropertyAbsent,y=t("./tree").CustomMatch;i.prototype.exec=function(t){return t[this.key]===this.value},r.prototype.exec=function(t){for(var e=t,n=0;n<this.keys.length-1;n++)if(e=e[this.keys[n]],!e)return!1;return e[this.keys[n]]===this.value},s.prototype.exec=function(t){return!t[this.key]},o.prototype.exec=function(t){return this.body.call(t)},h.prototype.exec=function(t){var e=this.once!==t._onceRef;return this.once=t._onceRef,e},a.prototype.exec=function(t){var e=this.wrap!==t.ctx;return this.wrap=t.ctx,e},n.MatchTemplate=c,n.Match=l,l.prototype.clone=function(t){var e=new l(t);return e.templates=this.templates.slice(),e.mask=this.mask.slice(),e.maskSize=this.maskSize,e.count=this.count,e},l.prototype.prepend=function(t){for(this.templates=t.templates.concat(this.templates),this.count+=t.count;Math.ceil(this.count/31)>this.mask.length;)this.mask.push(0);this.maskSize=this.mask.length},l.prototype.push=function(t){this.templates.push(new c(this,t)),this.count++,Math.ceil(this.count/31)>this.mask.length&&this.mask.push(0),this.maskSize=this.mask.length},l.prototype.tryCatch=function(t,e){try{return t.call(e)}catch(n){this.thrownError=n}},l.prototype.exec=function(t){for(var e,n=this.checkDepth(),i=this.maskOffset,r=this.mask[i],s=1,o=0;o<this.count;o++){if(0===(r&s)){e=this.templates[o];for(var h=0;h<e.predicates.length;h++){var a=e.predicates[h];if(!a.exec(t))break}if(h===e.predicates.length)break}1073741824===s?(i++,r=this.mask[i],s=1):s<<=1}if(o===this.count)return void 0;var c=r,l=this.bemhtml.match;this.mask[i]|=s,this.bemhtml.match=this,this.thrownError=null;var u;u="function"==typeof e.body?this.tryCatch(e.body,t):e.body,this.mask[i]=c,this.bemhtml.match=l,this.restoreDepth(n);var p=this.thrownError;if(null!==p)throw this.thrownError=null,p;return u},l.prototype.checkDepth=function(){if(-1===this.depth)return this.depth=this.bemhtml.depth,-1;if(this.bemhtml.depth===this.depth)return this.depth;var t=this.depth;for(this.depth=this.bemhtml.depth,this.maskOffset+=this.maskSize;this.mask.length<this.maskOffset+this.maskSize;)this.mask.push(0);return t},l.prototype.restoreDepth=function(t){-1!==t&&t!==this.depth&&(this.maskOffset-=this.maskSize),this.depth=t}},{"./tree":6,"./utils":7}],6:[function(t,e,n){function i(t,e){this.predicates=t,this.body=e}function r(){}function s(t,e){this.conditions=[],this.children=[];for(var n=e.length-1;n>=0;n--){var i=e[n];i instanceof r?this.conditions.push(i):i===t.boundBody?this.children[n]=t.queue.pop():this.children[n]=i}}function o(){r.call(this)}function h(t){r.call(this),this.refs=t}function a(t){r.call(this),this.refs=t}function c(t){r.call(this),this.refs=t}function l(t){r.call(this),this.options=t}function u(t,e){r.call(this),this.key=t,this.value=e}function p(t){r.call(this),this.key=t}function f(t){r.call(this),this.body=t}function d(t){this.options=t,this.refs=this.options.refs,this.boundBody=this.body.bind(this);for(var e=this.methods("body"),n=0;n<e.length;n++){var i=e[n];this.boundBody[d.methods[n]]=i}this.queue=[],this.templates=[],this.initializers=[]}function m(t,e,n){var i=t[n],r=t.boundBody;return"body"!==e?"replace"===n||"extend"===n||"wrap"===n?function(){return i.apply(t,arguments)}:function(){return i.apply(t,arguments),r}:function(){var e=i.apply(t,arguments),s=t.queue.pop(),o=t.queue[t.queue.length-1];return o.conditions=o.conditions.concat(s.conditions),o.children=o.children.concat(s.children),"replace"===n||"extend"===n||"wrap"===n?e:r}}var y=t("minimalistic-assert"),v=t("inherits");n.Template=i,i.prototype.wrap=function(){for(var t=this.body,e=0;e<this.predicates.length;e++){var n=this.predicates[e];t=n.wrapBody(t)}this.body=t},i.prototype.clone=function(){return new i(this.predicates.slice(),this.body)},n.MatchBase=r,r.prototype.wrapBody=function(t){return t},v(o,r),n.OnceMatch=o,v(h,r),n.WrapMatch=h,h.prototype.wrapBody=function(t){var e=this.refs.applyCtx;return"function"!=typeof t?function(){return e(t)}:function(){return e(t.call(this))}},v(a,r),n.ReplaceMatch=a,a.prototype.wrapBody=function(t){var e=this.refs.applyCtx;return"function"!=typeof t?function(){return e(t)}:function(){return e(t.call(this))}},v(c,r),n.ExtendMatch=c,c.prototype.wrapBody=function(t){var e=this.refs.applyCtx,n=this.refs.local;return"function"!=typeof t?function(){for(var i={},r=Object.keys(t),s=0;s<r.length;s++)i["ctx."+r[s]]=t[r[s]];return n(i)(function(){return e(this.ctx)})}:function(){for(var i={},r=t.call(this),s=Object.keys(r),o=0;o<s.length;o++)i["ctx."+s[o]]=r[s[o]];return n(i)(function(){return e(this.ctx)})}},v(l,r),n.CompilerOptions=l,v(u,r),n.PropertyMatch=u,v(p,r),n.PropertyAbsent=p,v(f,r),n.CustomMatch=f,n.Tree=d,d.methods=["match","once","wrap","elemMatch","block","elem","mode","mod","elemMod","def","tag","attrs","cls","js","jsAttr","bem","mix","content","replace","extend","oninit","xjstOptions"],d.prototype.build=function(t,e){var n=this.methods("global").concat(e);return n[0]=this.match.bind(this),t.apply({},n),{templates:this.templates.slice().reverse(),oninit:this.initializers}},d.prototype.methods=function(t){for(var e=new Array(d.methods.length),n=0;n<e.length;n++){var i=d.methods[n];e[n]=m(this,t,i)}return e},d.prototype.flush=function(t,e){var n;n=e.conditions?t.concat(e.conditions):e.conditions;for(var r=0;r<e.children.length;r++){var o=e.children[r];if(o instanceof s)this.flush(n,e.children[r]);else{var h=new i(t,o);h.wrap(),this.templates.push(h)}}},d.prototype.body=function(){for(var t=new Array(arguments.length),e=0;e<arguments.length;e++)t[e]=arguments[e];var n=new s(this,t);return this.queue[this.queue.length-1].children.push(n),1===this.queue.length&&this.flush([],this.queue.shift()),this.boundBody},d.prototype.match=function(){for(var t=new Array(arguments.length),e=0;e<arguments.length;e++){var n=arguments[e];"function"==typeof n&&(n=new f(n)),y(n instanceof r,"Wrong .match() argument"),t[e]=n}return this.queue.push(new s(this,t)),this.boundBody},d.prototype.once=function(){if(arguments.length)throw new Error("Predicate should not have arguments");return this.match(new o)},d.prototype.applyMode=function(t,e){if(t.length)throw new Error("Predicate should not have arguments");return this.mode(e)},d.prototype.wrap=function(){return this.def.apply(this,arguments).match(new h(this.refs))},d.prototype.xjstOptions=function(t){return this.queue.push(new s(this,[new l(t)])),this.boundBody},d.prototype.block=function(t){return this.match(new u("block",t))},d.prototype.elemMatch=function(){return this.match.apply(this,arguments)},d.prototype.elem=function(t){return this.match(new u("elem",t))},d.prototype.mode=function(t){return this.match(new u("_mode",t))},d.prototype.mod=function(t,e){return this.match(new u(["mods",t],e))},d.prototype.elemMod=function(t,e){return this.match(new u(["elemMods",t],e))},d.prototype.def=function(){return this.applyMode(arguments,"default")},d.prototype.tag=function(){return this.applyMode(arguments,"tag")},d.prototype.attrs=function(){return this.applyMode(arguments,"attrs")},d.prototype.cls=function(){return this.applyMode(arguments,"cls")},d.prototype.js=function(){return this.applyMode(arguments,"js")},d.prototype.jsAttr=function(){return this.applyMode(arguments,"jsAttr")},d.prototype.bem=function(){return this.applyMode(arguments,"bem")},d.prototype.mix=function(){return this.applyMode(arguments,"mix")},d.prototype.content=function(){return this.applyMode(arguments,"content")},d.prototype.replace=function(){return this.def.apply(this,arguments).match(new a(this.refs))},d.prototype.extend=function(){return this.def.apply(this,arguments).match(new c(this.refs))},d.prototype.oninit=function(t){this.initializers.push(t)}},{inherits:8,"minimalistic-assert":9}],7:[function(t,e,n){function i(){return c+ ++o}var r=Object.prototype.toString;n.isArray=Array.isArray,n.isArray||(n.isArray=function(t){return"[object Array]"===r.call(t)}),n.xmlEscape=function(t){return(t+"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},n.attrEscape=function(t){return(t+"").replace(/&/g,"&amp;").replace(/"/g,"&quot;")},n.jsAttrEscape=function(t){return(t+"").replace(/&/g,"&amp;").replace(/'/g,"&#39;")},n.extend=function(t,e){if(!t||!e)return t||e;var n,i={};for(n in t)t.hasOwnProperty(n)&&(i[n]=t[n]);for(n in e)e.hasOwnProperty(n)&&(i[n]=e[n]);return i};var s={area:1,base:1,br:1,col:1,command:1,embed:1,hr:1,img:1,input:1,keygen:1,link:1,meta:1,param:1,source:1,wbr:1};n.isShortTag=function(t){return s.hasOwnProperty(t)},n.isSimple=function(t){return t&&t!==!0?"string"==typeof t||"number"==typeof t:!0};var o=0,h=+new Date,a="__"+h,c="uniq"+h;n.getUniq=i,n.identify=function(t,e){if(!t)return i();if(e||t[a])return t[a];var n=i();return t[a]=n,n}},{}],8:[function(t,e,n){"function"==typeof Object.create?e.exports=function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:e.exports=function(t,e){t.super_=e;var n=function(){};n.prototype=e.prototype,t.prototype=new n,t.prototype.constructor=t}},{}],9:[function(t,e,n){function i(t,e){if(!t)throw new Error(e||"Assertion failed")}e.exports=i,i.equal=function(t,e,n){if(t!=e)throw new Error(n||"Assertion failed: "+t+" != "+e)}},{}]},{},[4])(4)}),t.exports||e.BEMHTML}({},{}),api=new BEMHTML({});api.compile(function(t,e,n,i,r,s,o,h,a,c,l,u,p,f,d,m,y,v,b,g,x,k,w,M,_,E){});