import {localize} from './english.mjs';
// Keep unchanged image/SVG nodes mounted so Safari does not repaint facial layers.
export function patchNode(current,next){
 if(current.nodeType!==next.nodeType||current.nodeName!==next.nodeName){current.replaceWith(next);return;}
 if(current.nodeType===3){if(current.nodeValue!==next.nodeValue)current.nodeValue=next.nodeValue;return;}
 if(current.nodeType!==1)return;
 if(current.hasAttribute('data-look')&&current.getAttribute('data-look')===next.getAttribute('data-look'))return;
 if(current.isEqualNode(next))return;
 for(const a of [...current.attributes])if(!next.hasAttribute(a.name))current.removeAttribute(a.name);
 for(const a of [...next.attributes])if(current.getAttribute(a.name)!==a.value)current.setAttribute(a.name,a.value);
 const old=[...current.childNodes],fresh=[...next.childNodes];
 for(let i=0;i<Math.max(old.length,fresh.length);i++){if(!fresh[i])old[i].remove();else if(!old[i])current.append(fresh[i]);else patchNode(old[i],fresh[i]);}
}
export function updateMarkup(root,html){const template=document.createElement('template');template.innerHTML=html;const next=root.cloneNode(false);next.append(template.content);localize(next);patchNode(root,next);}
