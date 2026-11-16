// Safari's toolbars and keyboard change the visible viewport independently of vh.
export function trackModalViewport(win=window) {
  const viewport=win.visualViewport,style=win.document.documentElement.style;
  const update=()=>{
    style.setProperty('--modal-viewport-height',`${Math.round(viewport?.height||win.innerHeight)}px`);
    style.setProperty('--modal-viewport-top',`${Math.round(viewport?.offsetTop||0)}px`);
  };
  update();
  win.addEventListener('resize',update);
  viewport?.addEventListener('resize',update);
  viewport?.addEventListener('scroll',update);
}

// Move existing action nodes, preserving delegated clicks and minigame listeners.
// Lists, wardrobe tiles and form submits stay in their own scrollable containers.
export function layoutModal(root,kind) {
  const dialog=root.querySelector('.modal'),body=dialog?.querySelector('.modal-content');
  if(!body)return;
  dialog.dataset.modal=kind;
  const groups=[...body.querySelectorAll(':scope > .choices, .event-outfit-actions, .intro-actions, .lake-actions, .ceremony-controls, .wish-actions')];
  const form=body.querySelector('#account-form');
  const submit=form?.querySelector('button[type=submit]');
  if(submit)submit.setAttribute('form',form.id);
  const controls=[...(submit?[submit]:[]),...body.querySelectorAll(':scope > button.full, :scope > a.full, .fitting-info > button, .decree-scroll > button, .decree-scroll > .choices, .coronation-decree > button, .qin-result > button, .festival-result > button, .lake-fishing > .fishing-reel')];
  if(!groups.length&&!controls.length)return;
  const footer=body.ownerDocument.createElement('footer');
  footer.className='modal-actions';
  footer.setAttribute('aria-label','Choices');
  for(const group of groups){
    // Bullying demands contain item art before the choices; keep it with the story.
    for(const child of [...group.children]){
      if(child.matches('button'))footer.append(child);
      else body.append(child);
    }
    group.remove();
  }
  for(const node of controls)if(body.contains(node)){
    if(node.matches('.choices'))footer.append(...node.children);
    else footer.append(node);
    if(node.matches('.choices'))node.remove();
  }
  if(!footer.children.length)return;
  if(footer.children.length>3)footer.classList.add('many-actions');
  dialog.classList.add('has-modal-actions');
  dialog.append(footer);
}
