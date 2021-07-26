export function ldapPrint (ldapId) {
 const fontSize = 16;
 const edgeLen = fontSize * 10;
 const edgeLen2 = edgeLen * 2;
 let ldapStr = '';
 let ldap = ldapId;
 const ldapLen = ldapId.length;
 const rows = Math.ceil(ldapLen / 12);
 const cols = Math.ceil(ldapLen / rows);
 while (ldap.length > cols) {
  ldapStr += ldap.slice(0, cols) + '<br />';
  ldap = ldap.slice(cols);
 }
 ldapStr += ldap;
 /* eslint-disable */
 /* prettier-ignore */
 const bgImg =
  `url("data:image/svg+xml;utf8,` +
  `<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='${edgeLen2}px' width='${edgeLen2}px'>` +
  `<style>` +
  `div{color: rgba(0,0,0,.06);font-size:${fontSize}px;}` +
  `p{width:${edgeLen}px;height:${edgeLen}px;display:flex;align-items:center;margin:0;line-height:1.5;text-align:center}` +
  `</style>` +
  `<foreignObject x='0' y='0' width='${edgeLen2}' height='${edgeLen2}'>` +
  `<div xmlns='http://www.w3.org/1999/xhtml'>` +
  `<p>${ldapStr}</p>` +
  `<p style='padding-left:${edgeLen}px'>${ldapStr}</p>` +
  `</div>` +
  `</foreignObject>` +
  `</svg>")`;
 /* eslint-enable */
 const ele = document.createElement('div');
 const css =
  `width:200vw;height:200vh;position:fixed;top:0;left:0;pointer-events:none;z-index:9999999;` +
  `background:${bgImg};transform:translate3d(-50vw,-50vh,0) rotate(-30deg);`;
 ele.style.cssText = css;

 document.body.appendChild(ele);

 const styleObserver = new MutationObserver(() => {
  location.reload();
 });
 styleObserver.observe(ele, { attributes: true });

 const domObserver = new MutationObserver(() => {
  if (!ele.parentElement) {
   location.reload();
  }
 });
 domObserver.observe(document.body, { childList: true });
}