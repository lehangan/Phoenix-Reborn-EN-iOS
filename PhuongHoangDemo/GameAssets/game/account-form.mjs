// Safari-safe form handling: layoutModal moves the submit button into a footer
// and retains its form owner via form="account-form". It is not a descendant.
export function accountSubmitHandler({authenticate,onSuccess,readValues=form=>new FormData(form)}){
 return async event=>{
  const form=event.target;
  if(form?.id!=='account-form')return;
  event.preventDefault();
  if(form.dataset.submitting==='true')return;
  const values=readValues(form),register=form.dataset.register==='true',password=values.get('password');
  const error=form.querySelector('.account-error');
  if(register&&password!==values.get('confirmation')){error.textContent='Hai mật khẩu chưa trùng nhau.';return;}
  // Enter can submit without SubmitEvent.submitter; form.elements includes
  // associated controls outside the form, unlike form.querySelector().
  const submit=event.submitter?.form===form?event.submitter:Array.from(form.elements).find(el=>el.type==='submit');
  form.dataset.submitting='true';form.setAttribute('aria-busy','true');
  if(submit)submit.disabled=true;
  error.textContent='Đang kết nối…';
  try{
   await authenticate(values.get('username'),password,register);
   form.reset();onSuccess();
  }catch(err){error.textContent=err.message||'Chưa đăng nhập được. Anh chị thử lại nhé.';}
  finally{
   delete form.dataset.submitting;form.removeAttribute('aria-busy');
   if(submit)submit.disabled=false;
  }
 };
}
