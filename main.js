!function(){"use strict";class t{constructor(t,e){this._formSelector=t.formSelector,this._inputSelector=t.inputSelector,this._submitButtonSelector=t.submitButtonSelector,this._inactiveButtonClass=t.inactiveButtonClass,this._inputErrorClass=t.inputErrorClass,this._errorClass=t.errorClass,this._inputInvalidClass=t.inputInvalidClass,this._formElement=e,this._submitButton=this._formElement.querySelector(this._submitButtonSelector),this._inputs=Array.from(this._formElement.querySelectorAll(this._inputSelector))}_hideAllErrors(){Array.from(this._formElement.querySelectorAll(`.${this._inputErrorClass}`)).forEach((t=>{this._hideInputError(t)}))}_validateInput(t){const e=t.parentElement.querySelector(`.${this._inputErrorClass}`);t.validity.valid?this._hideInputError(e,t):this._showInputError(e,t.validationMessage,t)}_showInputError(t,e,s){t.textContent=e,t.classList.add(this._errorClass),s&&s.classList.add(this._inputInvalidClass)}_hideInputError(t,e){t.textContent="",t.classList.remove(this._errorClass),e&&e.classList.remove(this._inputInvalidClass)}_toggleButtonState(){this._inputs.every((t=>t.validity.valid))?this._enableButton():this._disableButton()}_enableButton(){this._submitButton.removeAttribute("disabled"),this._submitButton.classList.remove(this._inactiveButtonClass)}_disableButton(){this._submitButton.setAttribute("disabled",!0),this._submitButton.classList.add(this._inactiveButtonClass)}enableValidation(){this._formElement.addEventListener("submit",(t=>{t.preventDefault()})),this._inputs.forEach((t=>{t.addEventListener("input",(()=>{this._validateInput(t),this._toggleButtonState()}))}))}disableButton(){this._submitButton&&this._disableButton()}}class e{constructor(t,e,s){this._name=t.name,this._link=t.link,this._cardSelector=e,this._handleImageClick=s}generateCard(){return this._getTemplate(),this._cardLikeButton=this._cardElement.querySelector(".card__like-button"),this._cardDeleteButton=this._cardElement.querySelector(".card__delete-button"),this.cardTitleElement=this._cardElement.querySelector(".card__title"),this.cardImageElement=this._cardElement.querySelector(".card__image"),this.cardTitleElement.textContent=this._name,this.cardImageElement.src=this._link,this.cardImageElement.alt=this._name,this._setEventListeners(),this._cardElement}_getTemplate(){const t=document.querySelector(this._cardSelector);this._cardElement=t.content.firstElementChild.cloneNode(!0)}_setEventListeners(){this._cardLikeButton.addEventListener("click",(()=>{this._handleLikeButton()})),this._cardDeleteButton.addEventListener("click",(()=>{this._handleDeleteButton()})),this.cardImageElement.addEventListener("click",(()=>{this._handleImageClick({name:this._name,link:this._link})}))}_handleDeleteButton(){this._cardElement.remove(),this._cardElement=null}_handleLikeButton(){this._cardLikeButton.classList.toggle("liked")}}class s{constructor(t){this._popup=document.querySelector(t),this._closeButton=this._popup.querySelector(".modal__close")}open(){this._popup.classList.add("modal_opened"),document.addEventListener("keydown",this._handleEscClose)}close(){this._popup.classList.remove("modal_opened"),document.removeEventListener("keydown",this._handleEscClose)}setEventListeners(){this._closeButton.addEventListener("click",(()=>{this.close()})),this._popup.addEventListener("click",(t=>{t.target===this._popup&&this.close()}))}_handleEscClose=t=>{"Escape"===t.key&&this.close()}}class i extends s{constructor(t,e){super(t),this._submitCallback=e,this._form=this._popup.querySelector(".modal__form"),this._inputFields=Array.from(this._form.querySelectorAll(".modal__text-input"))}_getInputValues(){const t={};return this._inputFields.forEach((e=>{t[e.name]=e.value})),t}reset(){this._form.reset()}setEventListeners(){super.setEventListeners(),this._form.addEventListener("submit",(t=>{t.preventDefault(),this._submitCallback(this._getInputValues()),this.reset()}))}}const n=document.querySelector(".profile__edit-button"),o=document.querySelector(".profile__add-button"),r=document.querySelector("#title-textbox"),l=document.querySelector("#subtitle-textbox"),a=document.querySelector(".modal__close"),c=document.querySelector("#add-modal-close"),u=document.querySelector("#card-title-textbox"),d=document.querySelector("#card-subtitle-textbox"),m={formSelector:".modal__form",inputSelector:".modal__text-input",submitButtonSelector:".modal__button",inactiveButtonClass:"modal__button-inactive",inputErrorClass:"modal__invalid",errorClass:"modal__invalid_active",inputInvalidClass:"modal__text_invalid"},_=new i("#profile-add-modal",(function(){!function(t){const e=B(t);y.addItem(e)}({name:u.value,link:d.value}),E.disableButton(),_.close()})),h=new i("#profile-edit-modal",(function(){const t=r.value,e=l.value;p.setUserInfo({name:t,job:e}),h.close()}));_.setEventListeners(),h.setEventListeners(),o.addEventListener("click",(()=>{_.open()})),c.addEventListener("click",(()=>{_.close()})),n.addEventListener("click",(()=>{const{name:t,job:e}=p.getUserInfo();r.value=t,l.value=e,h.open()}));const p=new class{constructor(t){let{nameSelector:e,jobSelector:s}=t;this._nameElement=document.querySelector(e),this._jobElement=document.querySelector(s)}getUserInfo(){return{name:this._nameElement.textContent,job:this._jobElement.textContent}}setUserInfo(t){let{name:e,job:s}=t;this._nameElement.textContent=e,this._jobElement.textContent=s}updateProfileInfo(t,e){this.setUserInfo({name:t,job:e})}}({nameSelector:".profile__title",jobSelector:".profile__subtitle"});a.addEventListener("click",(()=>{h.close()}));const f=document.forms["add-form"],b=document.forms["modal-form"],E=new t(m,f),v=new t(m,b);function x(t){S.open(t)}function B(t){return new e(t,"#card-template",x).generateCard()}E.disableButton(),v.disableButton(),E.enableValidation(),v.enableValidation();const S=new class extends s{constructor(t){super(t),this._image=this._popup.querySelector(".modal__image"),this._caption=this._popup.querySelector(".modal__image-subtitle")}open(t){this._image.src=t.link,this._image.alt=`Photo of ${t.name}`,this._caption.textContent=t.name,super.open()}setEventListeners(){super.setEventListeners()}}("#modal-image-preview");S.setEventListeners();const y=new class{constructor(t,e){let{items:s,renderer:i}=t;this._items=s,this._renderer=i,this._container=document.querySelector(e)}renderItems(){this._items.forEach((t=>{const e=this._renderer(t);this._container.append(e)}))}addItem(t){this._container.prepend(t)}}({items:[{name:"Ferris Wheel",link:"https://images.unsplash.com/photo-1700433158968-b1abf25bb8f9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},{name:"Air Ballon",link:"https://images.unsplash.com/photo-1559926223-e70036a18ceb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},{name:"Falls Creek",link:"https://images.unsplash.com/photo-1551675705-72513c2722a2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},{name:"Old Mill",link:"https://images.unsplash.com/photo-1618577201585-3afa2ec882b1?q=80&w=1944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},{name:"Cayon",link:"https://images.unsplash.com/photo-1491466424936-e304919aada7?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},{name:"Fusine Lake",link:"https://plus.unsplash.com/premium_photo-1669239113599-f51b76587dc9?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}],renderer:B},".cards__list");y.renderItems()}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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S0FDakNxQyxNQUFNVixNQUNSLENBRUFJLGlCQUFBQSxHQUNFTSxNQUFNTixtQkFDUixHRjRHb0Msd0JBRXRDaUQsRUFBV2pELG9CQUVYLE1BQU0yQixFQUFjLElHbElMLE1BQ2JuSCxXQUFBQSxDQUFXOEgsRUFBc0JlLEdBQW1CLElBQXhDLE1BQUVDLEVBQUssU0FBRUMsR0FBVWpCLEVBQzdCM0gsS0FBSzZJLE9BQVNGLEVBQ2QzSSxLQUFLOEksVUFBWUYsRUFDakI1SSxLQUFLK0ksV0FBYXpFLFNBQVNyRCxjQUFjeUgsRUFDM0MsQ0FFQU0sV0FBQUEsR0FDRWhKLEtBQUs2SSxPQUFPdEgsU0FBU2dILElBQ25CLE1BQU16QixFQUFjOUcsS0FBSzhJLFVBQVVQLEdBQ25DdkksS0FBSytJLFdBQVdFLE9BQU9uQyxFQUFZLEdBRXZDLENBRUFHLE9BQUFBLENBQVFpQyxHQUNObEosS0FBSytJLFdBQVdJLFFBQVFELEVBQzFCLEdIbUhBLENBQ0VQLE1BNUhpQixDQUNuQixDQUNFckYsS0FBTSxlQUNORSxLQUFNLDBLQUVSLENBQ0VGLEtBQU0sYUFDTkUsS0FBTSx1S0FFUixDQUNFRixLQUFNLGNBQ05FLEtBQU0sdUtBRVIsQ0FDRUYsS0FBTSxXQUNORSxLQUFNLDBLQUVSLENBQ0VGLEtBQU0sUUFDTkUsS0FBTSwwS0FFUixDQUNFRixLQUFNLGNBQ05FLEtBQU0saUxBc0dOb0YsU0FBVTdCLEdBRVosZ0JBR0ZDLEVBQVlnQyxhIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy9jb21wb25lbnRzL0NhcmQuanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy9jb21wb25lbnRzL1BvcHVwLmpzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvcGFnZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2VfcHJvamVjdF9hcm91bmR0aGV1cy8uL3NyYy9jb21wb25lbnRzL1VzZXJJbmZvLmpzIiwid2VicGFjazovL3NlX3Byb2plY3RfYXJvdW5kdGhldXMvLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qcyIsIndlYnBhY2s6Ly9zZV9wcm9qZWN0X2Fyb3VuZHRoZXVzLy4vc3JjL2NvbXBvbmVudHMvU2VjdGlvbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtVmFsaWRhdG9yIHtcclxuICBjb25zdHJ1Y3RvcihzZXR0aW5ncywgZm9ybUVsZW1lbnQpIHtcclxuICAgIHRoaXMuX2Zvcm1TZWxlY3RvciA9IHNldHRpbmdzLmZvcm1TZWxlY3RvcjtcclxuICAgIHRoaXMuX2lucHV0U2VsZWN0b3IgPSBzZXR0aW5ncy5pbnB1dFNlbGVjdG9yO1xyXG4gICAgdGhpcy5fc3VibWl0QnV0dG9uU2VsZWN0b3IgPSBzZXR0aW5ncy5zdWJtaXRCdXR0b25TZWxlY3RvcjtcclxuICAgIHRoaXMuX2luYWN0aXZlQnV0dG9uQ2xhc3MgPSBzZXR0aW5ncy5pbmFjdGl2ZUJ1dHRvbkNsYXNzO1xyXG4gICAgdGhpcy5faW5wdXRFcnJvckNsYXNzID0gc2V0dGluZ3MuaW5wdXRFcnJvckNsYXNzO1xyXG4gICAgdGhpcy5fZXJyb3JDbGFzcyA9IHNldHRpbmdzLmVycm9yQ2xhc3M7XHJcbiAgICB0aGlzLl9pbnB1dEludmFsaWRDbGFzcyA9IHNldHRpbmdzLmlucHV0SW52YWxpZENsYXNzO1xyXG4gICAgdGhpcy5fZm9ybUVsZW1lbnQgPSBmb3JtRWxlbWVudDtcclxuXHJcbiAgICB0aGlzLl9zdWJtaXRCdXR0b24gPSB0aGlzLl9mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICB0aGlzLl9zdWJtaXRCdXR0b25TZWxlY3RvclxyXG4gICAgKTtcclxuICAgIHRoaXMuX2lucHV0cyA9IEFycmF5LmZyb20oXHJcbiAgICAgIHRoaXMuX2Zvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5faW5wdXRTZWxlY3RvcilcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBfaGlkZUFsbEVycm9ycygpIHtcclxuICAgIGNvbnN0IGVycm9yRWxlbWVudHMgPSBBcnJheS5mcm9tKFxyXG4gICAgICB0aGlzLl9mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHt0aGlzLl9pbnB1dEVycm9yQ2xhc3N9YClcclxuICAgICk7XHJcbiAgICBlcnJvckVsZW1lbnRzLmZvckVhY2goKGVycm9yRWxlbWVudCkgPT4ge1xyXG4gICAgICB0aGlzLl9oaWRlSW5wdXRFcnJvcihlcnJvckVsZW1lbnQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBfdmFsaWRhdGVJbnB1dChpbnB1dCkge1xyXG4gICAgY29uc3QgZXJyb3JFbGVtZW50ID0gaW5wdXQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBgLiR7dGhpcy5faW5wdXRFcnJvckNsYXNzfWBcclxuICAgICk7XHJcbiAgICBpZiAoIWlucHV0LnZhbGlkaXR5LnZhbGlkKSB7XHJcbiAgICAgIHRoaXMuX3Nob3dJbnB1dEVycm9yKGVycm9yRWxlbWVudCwgaW5wdXQudmFsaWRhdGlvbk1lc3NhZ2UsIGlucHV0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2hpZGVJbnB1dEVycm9yKGVycm9yRWxlbWVudCwgaW5wdXQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX3Nob3dJbnB1dEVycm9yKGVycm9yRWxlbWVudCwgbWVzc2FnZSwgaW5wdXQpIHtcclxuICAgIGVycm9yRWxlbWVudC50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XHJcbiAgICBlcnJvckVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLl9lcnJvckNsYXNzKTtcclxuICAgIGlmIChpbnB1dCkge1xyXG4gICAgICBpbnB1dC5jbGFzc0xpc3QuYWRkKHRoaXMuX2lucHV0SW52YWxpZENsYXNzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9oaWRlSW5wdXRFcnJvcihlcnJvckVsZW1lbnQsIGlucHV0KSB7XHJcbiAgICBlcnJvckVsZW1lbnQudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgZXJyb3JFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fZXJyb3JDbGFzcyk7XHJcbiAgICBpZiAoaW5wdXQpIHtcclxuICAgICAgaW5wdXQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9pbnB1dEludmFsaWRDbGFzcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfdG9nZ2xlQnV0dG9uU3RhdGUoKSB7XHJcbiAgICBjb25zdCBpc1ZhbGlkID0gdGhpcy5faW5wdXRzLmV2ZXJ5KChpbnB1dCkgPT4gaW5wdXQudmFsaWRpdHkudmFsaWQpO1xyXG4gICAgaWYgKGlzVmFsaWQpIHtcclxuICAgICAgdGhpcy5fZW5hYmxlQnV0dG9uKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9kaXNhYmxlQnV0dG9uKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfZW5hYmxlQnV0dG9uKCkge1xyXG4gICAgdGhpcy5fc3VibWl0QnV0dG9uLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xyXG4gICAgdGhpcy5fc3VibWl0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5faW5hY3RpdmVCdXR0b25DbGFzcyk7XHJcbiAgfVxyXG5cclxuICBfZGlzYWJsZUJ1dHRvbigpIHtcclxuICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKHRoaXMuX2luYWN0aXZlQnV0dG9uQ2xhc3MpO1xyXG4gIH1cclxuXHJcbiAgZW5hYmxlVmFsaWRhdGlvbigpIHtcclxuICAgIHRoaXMuX2Zvcm1FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2dCkgPT4ge1xyXG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuX2lucHV0cy5mb3JFYWNoKChpbnB1dCkgPT4ge1xyXG4gICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuX3ZhbGlkYXRlSW5wdXQoaW5wdXQpO1xyXG4gICAgICAgIHRoaXMuX3RvZ2dsZUJ1dHRvblN0YXRlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBkaXNhYmxlQnV0dG9uKCkge1xyXG4gICAgaWYgKHRoaXMuX3N1Ym1pdEJ1dHRvbikge1xyXG4gICAgICB0aGlzLl9kaXNhYmxlQnV0dG9uKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcmQge1xyXG4gIGNvbnN0cnVjdG9yKGRhdGEsIGNhcmRTZWxlY3RvciwgaGFuZGxlSW1hZ2VDbGljaykge1xyXG4gICAgdGhpcy5fbmFtZSA9IGRhdGEubmFtZTtcclxuICAgIHRoaXMuX2xpbmsgPSBkYXRhLmxpbms7XHJcbiAgICB0aGlzLl9jYXJkU2VsZWN0b3IgPSBjYXJkU2VsZWN0b3I7XHJcbiAgICB0aGlzLl9oYW5kbGVJbWFnZUNsaWNrID0gaGFuZGxlSW1hZ2VDbGljaztcclxuICB9XHJcblxyXG4gIGdlbmVyYXRlQ2FyZCgpIHtcclxuICAgIHRoaXMuX2dldFRlbXBsYXRlKCk7XHJcblxyXG4gICAgdGhpcy5fY2FyZExpa2VCdXR0b24gPVxyXG4gICAgICB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2xpa2UtYnV0dG9uXCIpO1xyXG4gICAgdGhpcy5fY2FyZERlbGV0ZUJ1dHRvbiA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLmNhcmRfX2RlbGV0ZS1idXR0b25cIlxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLmNhcmRUaXRsZUVsZW1lbnQgPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX3RpdGxlXCIpO1xyXG4gICAgdGhpcy5jYXJkSW1hZ2VFbGVtZW50ID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19pbWFnZVwiKTtcclxuXHJcbiAgICB0aGlzLmNhcmRUaXRsZUVsZW1lbnQudGV4dENvbnRlbnQgPSB0aGlzLl9uYW1lO1xyXG4gICAgdGhpcy5jYXJkSW1hZ2VFbGVtZW50LnNyYyA9IHRoaXMuX2xpbms7XHJcbiAgICB0aGlzLmNhcmRJbWFnZUVsZW1lbnQuYWx0ID0gdGhpcy5fbmFtZTtcclxuXHJcbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycygpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLl9jYXJkRWxlbWVudDtcclxuICB9XHJcblxyXG4gIF9nZXRUZW1wbGF0ZSgpIHtcclxuICAgIGNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLl9jYXJkU2VsZWN0b3IpO1xyXG4gICAgdGhpcy5fY2FyZEVsZW1lbnQgPSB0ZW1wbGF0ZS5jb250ZW50LmZpcnN0RWxlbWVudENoaWxkLmNsb25lTm9kZSh0cnVlKTtcclxuICB9XHJcblxyXG4gIF9zZXRFdmVudExpc3RlbmVycygpIHtcclxuICAgIHRoaXMuX2NhcmRMaWtlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuX2hhbmRsZUxpa2VCdXR0b24oKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5fY2FyZERlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICB0aGlzLl9oYW5kbGVEZWxldGVCdXR0b24oKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuY2FyZEltYWdlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICB0aGlzLl9oYW5kbGVJbWFnZUNsaWNrKHtcclxuICAgICAgICBuYW1lOiB0aGlzLl9uYW1lLFxyXG4gICAgICAgIGxpbms6IHRoaXMuX2xpbmssXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBfaGFuZGxlRGVsZXRlQnV0dG9uKCkge1xyXG4gICAgdGhpcy5fY2FyZEVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICB0aGlzLl9jYXJkRWxlbWVudCA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBfaGFuZGxlTGlrZUJ1dHRvbigpIHtcclxuICAgIHRoaXMuX2NhcmRMaWtlQnV0dG9uLmNsYXNzTGlzdC50b2dnbGUoXCJsaWtlZFwiKTtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXAge1xyXG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IpIHtcclxuICAgIHRoaXMuX3BvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihwb3B1cFNlbGVjdG9yKTtcclxuICAgIHRoaXMuX2Nsb3NlQnV0dG9uID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fY2xvc2VcIik7XHJcbiAgfVxyXG5cclxuICBvcGVuKCkge1xyXG4gICAgdGhpcy5fcG9wdXAuY2xhc3NMaXN0LmFkZChcIm1vZGFsX29wZW5lZFwiKTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTtcclxuICB9XHJcblxyXG4gIGNsb3NlKCkge1xyXG4gICAgdGhpcy5fcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcIm1vZGFsX29wZW5lZFwiKTtcclxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTtcclxuICB9XHJcblxyXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgdGhpcy5fY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5fcG9wdXAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xyXG4gICAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSB0aGlzLl9wb3B1cCkge1xyXG4gICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBfaGFuZGxlRXNjQ2xvc2UgPSAoZXZlbnQpID0+IHtcclxuICAgIGlmIChldmVudC5rZXkgPT09IFwiRXNjYXBlXCIpIHtcclxuICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFdpdGhGb3JtIGV4dGVuZHMgUG9wdXAge1xyXG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IsIHN1Ym1pdENhbGxiYWNrKSB7XHJcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcclxuICAgIHRoaXMuX3N1Ym1pdENhbGxiYWNrID0gc3VibWl0Q2FsbGJhY2s7XHJcbiAgICB0aGlzLl9mb3JtID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fZm9ybVwiKTtcclxuICAgIHRoaXMuX2lucHV0RmllbGRzID0gQXJyYXkuZnJvbShcclxuICAgICAgdGhpcy5fZm9ybS5xdWVyeVNlbGVjdG9yQWxsKFwiLm1vZGFsX190ZXh0LWlucHV0XCIpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgX2dldElucHV0VmFsdWVzKCkge1xyXG4gICAgY29uc3QgdmFsdWVzID0ge307XHJcbiAgICB0aGlzLl9pbnB1dEZpZWxkcy5mb3JFYWNoKChpbnB1dCkgPT4ge1xyXG4gICAgICB2YWx1ZXNbaW5wdXQubmFtZV0gPSBpbnB1dC52YWx1ZTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHZhbHVlcztcclxuICB9XHJcblxyXG4gIHJlc2V0KCkge1xyXG4gICAgdGhpcy5fZm9ybS5yZXNldCgpO1xyXG4gIH1cclxuXHJcbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICBzdXBlci5zZXRFdmVudExpc3RlbmVycygpO1xyXG4gICAgdGhpcy5fZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldnQpID0+IHtcclxuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHRoaXMuX3N1Ym1pdENhbGxiYWNrKHRoaXMuX2dldElucHV0VmFsdWVzKCkpO1xyXG4gICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IEZvcm1WYWxpZGF0b3IgZnJvbSBcIi4uL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qc1wiO1xyXG5pbXBvcnQgQ2FyZCBmcm9tIFwiLi4vY29tcG9uZW50cy9DYXJkLmpzXCI7XHJcbmltcG9ydCBTZWN0aW9uIGZyb20gXCIuLi9jb21wb25lbnRzL1NlY3Rpb24uanNcIjtcclxuaW1wb3J0IFBvcHVwV2l0aEltYWdlIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aEltYWdlLmpzXCI7XHJcbmltcG9ydCBQb3B1cFdpdGhGb3JtIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm0uanNcIjtcclxuaW1wb3J0IFVzZXJJbmZvIGZyb20gXCIuLi9jb21wb25lbnRzL1VzZXJJbmZvLmpzXCI7XHJcbmltcG9ydCBcIi4uL3BhZ2VzL2luZGV4LmNzc1wiO1xyXG5cclxuY29uc3QgaW5pdGlhbENhcmRzID0gW1xyXG4gIHtcclxuICAgIG5hbWU6IFwiRmVycmlzIFdoZWVsXCIsXHJcbiAgICBsaW5rOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNzAwNDMzMTU4OTY4LWIxYWJmMjViYjhmOT9xPTgwJnc9MTg4NyZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZpeGxpYj1yYi00LjAuMyZpeGlkPU0zd3hNakEzZkRCOE1IeHdhRzkwYnkxd1lXZGxmSHg4ZkdWdWZEQjhmSHg4ZkElM0QlM0RcIixcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6IFwiQWlyIEJhbGxvblwiLFxyXG4gICAgbGluazogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTU1OTkyNjIyMy1lNzAwMzZhMThjZWI/cT04MCZ3PTE4ODcmYXV0bz1mb3JtYXQmZml0PWNyb3AmaXhsaWI9cmItNC4wLjMmaXhpZD1NM3d4TWpBM2ZEQjhNSHh3YUc5MGJ5MXdZV2RsZkh4OGZHVnVmREI4Zkh4OGZBJTNEJTNEXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiBcIkZhbGxzIENyZWVrXCIsXHJcbiAgICBsaW5rOiBcImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTUxNjc1NzA1LTcyNTEzYzI3MjJhMj9xPTgwJnc9MTk3NiZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZpeGxpYj1yYi00LjAuMyZpeGlkPU0zd3hNakEzZkRCOE1IeHdhRzkwYnkxd1lXZGxmSHg4ZkdWdWZEQjhmSHg4ZkElM0QlM0RcIixcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6IFwiT2xkIE1pbGxcIixcclxuICAgIGxpbms6IFwiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE2MTg1NzcyMDE1ODUtM2FmYTJlYzg4MmIxP3E9ODAmdz0xOTQ0JmF1dG89Zm9ybWF0JmZpdD1jcm9wJml4bGliPXJiLTQuMC4zJml4aWQ9TTN3eE1qQTNmREI4TUh4d2FHOTBieTF3WVdkbGZIeDhmR1Z1ZkRCOGZIeDhmQSUzRCUzRFwiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogXCJDYXlvblwiLFxyXG4gICAgbGluazogXCJodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQ5MTQ2NjQyNDkzNi1lMzA0OTE5YWFkYTc/cT04MCZ3PTIwNjkmYXV0bz1mb3JtYXQmZml0PWNyb3AmaXhsaWI9cmItNC4wLjMmaXhpZD1NM3d4TWpBM2ZEQjhNSHh3YUc5MGJ5MXdZV2RsZkh4OGZHVnVmREI4Zkh4OGZBJTNEJTNEXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiBcIkZ1c2luZSBMYWtlXCIsXHJcbiAgICBsaW5rOiBcImh0dHBzOi8vcGx1cy51bnNwbGFzaC5jb20vcHJlbWl1bV9waG90by0xNjY5MjM5MTEzNTk5LWY1MWI3NjU4N2RjOT9xPTgwJnc9MTkzMyZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZpeGxpYj1yYi00LjAuMyZpeGlkPU0zd3hNakEzZkRCOE1IeHdhRzkwYnkxd1lXZGxmSHg4ZkdWdWZEQjhmSHg4ZkElM0QlM0RcIixcclxuICB9LFxyXG5dO1xyXG5cclxuY29uc3QgcHJvZmlsZUVkaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2VkaXQtYnV0dG9uXCIpO1xyXG5jb25zdCBwcm9maWxlQWRkQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlX19hZGQtYnV0dG9uXCIpO1xyXG5jb25zdCBlZGl0TW9kYWxUaXRsZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0aXRsZS10ZXh0Ym94XCIpO1xyXG5jb25zdCBlZGl0TW9kYWxTdWJ0aXRsZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdWJ0aXRsZS10ZXh0Ym94XCIpO1xyXG5jb25zdCBlZGl0TW9kYWxDbG9zZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2Nsb3NlXCIpO1xyXG5jb25zdCBhZGRDYXJkQ2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZC1tb2RhbC1jbG9zZVwiKTtcclxuY29uc3QgYWRkQ2FyZFRpdGxlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtdGl0bGUtdGV4dGJveFwiKTtcclxuY29uc3QgYWRkQ2FyZFVybElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYXJkLXN1YnRpdGxlLXRleHRib3hcIik7XHJcblxyXG5jb25zdCBjb25maWcgPSB7XHJcbiAgZm9ybVNlbGVjdG9yOiBcIi5tb2RhbF9fZm9ybVwiLFxyXG4gIGlucHV0U2VsZWN0b3I6IFwiLm1vZGFsX190ZXh0LWlucHV0XCIsXHJcbiAgc3VibWl0QnV0dG9uU2VsZWN0b3I6IFwiLm1vZGFsX19idXR0b25cIixcclxuICBpbmFjdGl2ZUJ1dHRvbkNsYXNzOiBcIm1vZGFsX19idXR0b24taW5hY3RpdmVcIixcclxuICBpbnB1dEVycm9yQ2xhc3M6IFwibW9kYWxfX2ludmFsaWRcIixcclxuICBlcnJvckNsYXNzOiBcIm1vZGFsX19pbnZhbGlkX2FjdGl2ZVwiLFxyXG4gIGlucHV0SW52YWxpZENsYXNzOiBcIm1vZGFsX190ZXh0X2ludmFsaWRcIixcclxufTtcclxuXHJcbmZ1bmN0aW9uIGhhbmRsZUNhcmRGb3JtU3VibWl0KCkge1xyXG4gIGNvbnN0IG5hbWUgPSBhZGRDYXJkVGl0bGVJbnB1dC52YWx1ZTtcclxuICBjb25zdCBsaW5rID0gYWRkQ2FyZFVybElucHV0LnZhbHVlO1xyXG4gIHJlbmRlckNhcmQoeyBuYW1lLCBsaW5rIH0pO1xyXG4gIGNhcmRGb3JtVmFsaWRhdG9yLmRpc2FibGVCdXR0b24oKTtcclxuICBhZGRDYXJkUG9wdXAuY2xvc2UoKTtcclxufVxyXG5cclxuY29uc3QgYWRkQ2FyZFBvcHVwID0gbmV3IFBvcHVwV2l0aEZvcm0oXHJcbiAgXCIjcHJvZmlsZS1hZGQtbW9kYWxcIixcclxuICBoYW5kbGVDYXJkRm9ybVN1Ym1pdFxyXG4pO1xyXG5jb25zdCBlZGl0TW9kYWxQb3B1cCA9IG5ldyBQb3B1cFdpdGhGb3JtKFxyXG4gIFwiI3Byb2ZpbGUtZWRpdC1tb2RhbFwiLFxyXG4gIGVkaXRQcm9maWxlTW9kYWxcclxuKTtcclxuYWRkQ2FyZFBvcHVwLnNldEV2ZW50TGlzdGVuZXJzKCk7XHJcbmVkaXRNb2RhbFBvcHVwLnNldEV2ZW50TGlzdGVuZXJzKCk7XHJcblxyXG5wcm9maWxlQWRkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgYWRkQ2FyZFBvcHVwLm9wZW4oKTtcclxufSk7XHJcblxyXG5hZGRDYXJkQ2xvc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICBhZGRDYXJkUG9wdXAuY2xvc2UoKTtcclxufSk7XHJcblxyXG5wcm9maWxlRWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gIGNvbnN0IHsgbmFtZSwgam9iIH0gPSB1c2VySW5mby5nZXRVc2VySW5mbygpO1xyXG4gIGVkaXRNb2RhbFRpdGxlSW5wdXQudmFsdWUgPSBuYW1lO1xyXG4gIGVkaXRNb2RhbFN1YnRpdGxlSW5wdXQudmFsdWUgPSBqb2I7XHJcbiAgZWRpdE1vZGFsUG9wdXAub3BlbigpO1xyXG59KTtcclxuXHJcbmNvbnN0IHVzZXJJbmZvID0gbmV3IFVzZXJJbmZvKHtcclxuICBuYW1lU2VsZWN0b3I6IFwiLnByb2ZpbGVfX3RpdGxlXCIsXHJcbiAgam9iU2VsZWN0b3I6IFwiLnByb2ZpbGVfX3N1YnRpdGxlXCIsXHJcbn0pO1xyXG5cclxuZWRpdE1vZGFsQ2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICBlZGl0TW9kYWxQb3B1cC5jbG9zZSgpO1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGVkaXRQcm9maWxlTW9kYWwoKSB7XHJcbiAgY29uc3QgbmV3TmFtZSA9IGVkaXRNb2RhbFRpdGxlSW5wdXQudmFsdWU7XHJcbiAgY29uc3QgbmV3Sm9iID0gZWRpdE1vZGFsU3VidGl0bGVJbnB1dC52YWx1ZTtcclxuICB1c2VySW5mby5zZXRVc2VySW5mbyh7IG5hbWU6IG5ld05hbWUsIGpvYjogbmV3Sm9iIH0pO1xyXG4gIGVkaXRNb2RhbFBvcHVwLmNsb3NlKCk7XHJcbn1cclxuXHJcbmNvbnN0IHByb2ZpbGVBZGRlZEZvcm0gPSBkb2N1bWVudC5mb3Jtc1tcImFkZC1mb3JtXCJdO1xyXG5cclxuY29uc3QgcHJvZmlsZUZvcm0gPSBkb2N1bWVudC5mb3Jtc1tcIm1vZGFsLWZvcm1cIl07XHJcblxyXG5jb25zdCBjYXJkRm9ybVZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKGNvbmZpZywgcHJvZmlsZUFkZGVkRm9ybSk7XHJcbmNvbnN0IHByb2ZpbGVGb3JtVmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3IoY29uZmlnLCBwcm9maWxlRm9ybSk7XHJcblxyXG5jYXJkRm9ybVZhbGlkYXRvci5kaXNhYmxlQnV0dG9uKCk7XHJcbnByb2ZpbGVGb3JtVmFsaWRhdG9yLmRpc2FibGVCdXR0b24oKTtcclxuXHJcbmNhcmRGb3JtVmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRpb24oKTtcclxucHJvZmlsZUZvcm1WYWxpZGF0b3IuZW5hYmxlVmFsaWRhdGlvbigpO1xyXG5cclxuZnVuY3Rpb24gaGFuZGxlSW1hZ2VDbGljayhjYXJkRGF0YSkge1xyXG4gIGltYWdlUG9wdXAub3BlbihjYXJkRGF0YSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUNhcmQoaXRlbSkge1xyXG4gIGNvbnN0IGNhcmQgPSBuZXcgQ2FyZChpdGVtLCBcIiNjYXJkLXRlbXBsYXRlXCIsIGhhbmRsZUltYWdlQ2xpY2spO1xyXG4gIHJldHVybiBjYXJkLmdlbmVyYXRlQ2FyZCgpO1xyXG59XHJcblxyXG5jb25zdCBpbWFnZVBvcHVwID0gbmV3IFBvcHVwV2l0aEltYWdlKFwiI21vZGFsLWltYWdlLXByZXZpZXdcIik7XHJcblxyXG5pbWFnZVBvcHVwLnNldEV2ZW50TGlzdGVuZXJzKCk7XHJcblxyXG5jb25zdCBjYXJkU2VjdGlvbiA9IG5ldyBTZWN0aW9uKFxyXG4gIHtcclxuICAgIGl0ZW1zOiBpbml0aWFsQ2FyZHMsXHJcbiAgICByZW5kZXJlcjogY3JlYXRlQ2FyZCxcclxuICB9LFxyXG4gIFwiLmNhcmRzX19saXN0XCJcclxuKTtcclxuXHJcbmNhcmRTZWN0aW9uLnJlbmRlckl0ZW1zKCk7XHJcblxyXG5mdW5jdGlvbiByZW5kZXJDYXJkKGNhcmREYXRhKSB7XHJcbiAgY29uc3QgY2FyZEVsZW1lbnQgPSBjcmVhdGVDYXJkKGNhcmREYXRhKTtcclxuICBjYXJkU2VjdGlvbi5hZGRJdGVtKGNhcmRFbGVtZW50KTtcclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VySW5mbyB7XHJcbiAgY29uc3RydWN0b3IoeyBuYW1lU2VsZWN0b3IsIGpvYlNlbGVjdG9yIH0pIHtcclxuICAgIHRoaXMuX25hbWVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihuYW1lU2VsZWN0b3IpO1xyXG4gICAgdGhpcy5fam9iRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioam9iU2VsZWN0b3IpO1xyXG4gIH1cclxuXHJcbiAgZ2V0VXNlckluZm8oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuYW1lOiB0aGlzLl9uYW1lRWxlbWVudC50ZXh0Q29udGVudCxcclxuICAgICAgam9iOiB0aGlzLl9qb2JFbGVtZW50LnRleHRDb250ZW50LFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHNldFVzZXJJbmZvKHsgbmFtZSwgam9iIH0pIHtcclxuICAgIHRoaXMuX25hbWVFbGVtZW50LnRleHRDb250ZW50ID0gbmFtZTtcclxuICAgIHRoaXMuX2pvYkVsZW1lbnQudGV4dENvbnRlbnQgPSBqb2I7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVQcm9maWxlSW5mbyhuZXdOYW1lLCBuZXdKb2IpIHtcclxuICAgIHRoaXMuc2V0VXNlckluZm8oeyBuYW1lOiBuZXdOYW1lLCBqb2I6IG5ld0pvYiB9KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFdpdGhJbWFnZSBleHRlbmRzIFBvcHVwIHtcclxuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKSB7XHJcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcclxuICAgIHRoaXMuX2ltYWdlID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9faW1hZ2VcIik7XHJcbiAgICB0aGlzLl9jYXB0aW9uID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9faW1hZ2Utc3VidGl0bGVcIik7XHJcbiAgfVxyXG5cclxuICBvcGVuKGRhdGEpIHtcclxuICAgIHRoaXMuX2ltYWdlLnNyYyA9IGRhdGEubGluaztcclxuICAgIHRoaXMuX2ltYWdlLmFsdCA9IGBQaG90byBvZiAke2RhdGEubmFtZX1gO1xyXG4gICAgdGhpcy5fY2FwdGlvbi50ZXh0Q29udGVudCA9IGRhdGEubmFtZTtcclxuICAgIHN1cGVyLm9wZW4oKTtcclxuICB9XHJcblxyXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgc3VwZXIuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VjdGlvbiB7XHJcbiAgY29uc3RydWN0b3IoeyBpdGVtcywgcmVuZGVyZXIgfSwgY29udGFpbmVyU2VsZWN0b3IpIHtcclxuICAgIHRoaXMuX2l0ZW1zID0gaXRlbXM7XHJcbiAgICB0aGlzLl9yZW5kZXJlciA9IHJlbmRlcmVyO1xyXG4gICAgdGhpcy5fY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXJTZWxlY3Rvcik7XHJcbiAgfVxyXG5cclxuICByZW5kZXJJdGVtcygpIHtcclxuICAgIHRoaXMuX2l0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgY29uc3QgY2FyZEVsZW1lbnQgPSB0aGlzLl9yZW5kZXJlcihpdGVtKTtcclxuICAgICAgdGhpcy5fY29udGFpbmVyLmFwcGVuZChjYXJkRWxlbWVudCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFkZEl0ZW0oZWxlbWVudCkge1xyXG4gICAgdGhpcy5fY29udGFpbmVyLnByZXBlbmQoZWxlbWVudCk7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJGb3JtVmFsaWRhdG9yIiwiY29uc3RydWN0b3IiLCJzZXR0aW5ncyIsImZvcm1FbGVtZW50IiwidGhpcyIsIl9mb3JtU2VsZWN0b3IiLCJmb3JtU2VsZWN0b3IiLCJfaW5wdXRTZWxlY3RvciIsImlucHV0U2VsZWN0b3IiLCJfc3VibWl0QnV0dG9uU2VsZWN0b3IiLCJzdWJtaXRCdXR0b25TZWxlY3RvciIsIl9pbmFjdGl2ZUJ1dHRvbkNsYXNzIiwiaW5hY3RpdmVCdXR0b25DbGFzcyIsIl9pbnB1dEVycm9yQ2xhc3MiLCJpbnB1dEVycm9yQ2xhc3MiLCJfZXJyb3JDbGFzcyIsImVycm9yQ2xhc3MiLCJfaW5wdXRJbnZhbGlkQ2xhc3MiLCJpbnB1dEludmFsaWRDbGFzcyIsIl9mb3JtRWxlbWVudCIsIl9zdWJtaXRCdXR0b24iLCJxdWVyeVNlbGVjdG9yIiwiX2lucHV0cyIsIkFycmF5IiwiZnJvbSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJfaGlkZUFsbEVycm9ycyIsImZvckVhY2giLCJlcnJvckVsZW1lbnQiLCJfaGlkZUlucHV0RXJyb3IiLCJfdmFsaWRhdGVJbnB1dCIsImlucHV0IiwicGFyZW50RWxlbWVudCIsInZhbGlkaXR5IiwidmFsaWQiLCJfc2hvd0lucHV0RXJyb3IiLCJ2YWxpZGF0aW9uTWVzc2FnZSIsIm1lc3NhZ2UiLCJ0ZXh0Q29udGVudCIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsIl90b2dnbGVCdXR0b25TdGF0ZSIsImV2ZXJ5IiwiX2VuYWJsZUJ1dHRvbiIsIl9kaXNhYmxlQnV0dG9uIiwicmVtb3ZlQXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwiZW5hYmxlVmFsaWRhdGlvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJldnQiLCJwcmV2ZW50RGVmYXVsdCIsImRpc2FibGVCdXR0b24iLCJDYXJkIiwiZGF0YSIsImNhcmRTZWxlY3RvciIsImhhbmRsZUltYWdlQ2xpY2siLCJfbmFtZSIsIm5hbWUiLCJfbGluayIsImxpbmsiLCJfY2FyZFNlbGVjdG9yIiwiX2hhbmRsZUltYWdlQ2xpY2siLCJnZW5lcmF0ZUNhcmQiLCJfZ2V0VGVtcGxhdGUiLCJfY2FyZExpa2VCdXR0b24iLCJfY2FyZEVsZW1lbnQiLCJfY2FyZERlbGV0ZUJ1dHRvbiIsImNhcmRUaXRsZUVsZW1lbnQiLCJjYXJkSW1hZ2VFbGVtZW50Iiwic3JjIiwiYWx0IiwiX3NldEV2ZW50TGlzdGVuZXJzIiwidGVtcGxhdGUiLCJkb2N1bWVudCIsImNvbnRlbnQiLCJmaXJzdEVsZW1lbnRDaGlsZCIsImNsb25lTm9kZSIsIl9oYW5kbGVMaWtlQnV0dG9uIiwiX2hhbmRsZURlbGV0ZUJ1dHRvbiIsInRvZ2dsZSIsIlBvcHVwIiwicG9wdXBTZWxlY3RvciIsIl9wb3B1cCIsIl9jbG9zZUJ1dHRvbiIsIm9wZW4iLCJfaGFuZGxlRXNjQ2xvc2UiLCJjbG9zZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJzZXRFdmVudExpc3RlbmVycyIsImV2ZW50IiwidGFyZ2V0Iiwia2V5IiwiUG9wdXBXaXRoRm9ybSIsInN1Ym1pdENhbGxiYWNrIiwic3VwZXIiLCJfc3VibWl0Q2FsbGJhY2siLCJfZm9ybSIsIl9pbnB1dEZpZWxkcyIsIl9nZXRJbnB1dFZhbHVlcyIsInZhbHVlcyIsInZhbHVlIiwicmVzZXQiLCJwcm9maWxlRWRpdEJ1dHRvbiIsInByb2ZpbGVBZGRCdXR0b24iLCJlZGl0TW9kYWxUaXRsZUlucHV0IiwiZWRpdE1vZGFsU3VidGl0bGVJbnB1dCIsImVkaXRNb2RhbENsb3NlQnV0dG9uIiwiYWRkQ2FyZENsb3NlIiwiYWRkQ2FyZFRpdGxlSW5wdXQiLCJhZGRDYXJkVXJsSW5wdXQiLCJjb25maWciLCJhZGRDYXJkUG9wdXAiLCJjYXJkRGF0YSIsImNhcmRFbGVtZW50IiwiY3JlYXRlQ2FyZCIsImNhcmRTZWN0aW9uIiwiYWRkSXRlbSIsInJlbmRlckNhcmQiLCJjYXJkRm9ybVZhbGlkYXRvciIsImVkaXRNb2RhbFBvcHVwIiwibmV3TmFtZSIsIm5ld0pvYiIsInVzZXJJbmZvIiwic2V0VXNlckluZm8iLCJqb2IiLCJnZXRVc2VySW5mbyIsIl9yZWYiLCJuYW1lU2VsZWN0b3IiLCJqb2JTZWxlY3RvciIsIl9uYW1lRWxlbWVudCIsIl9qb2JFbGVtZW50IiwiX3JlZjIiLCJ1cGRhdGVQcm9maWxlSW5mbyIsInByb2ZpbGVBZGRlZEZvcm0iLCJmb3JtcyIsInByb2ZpbGVGb3JtIiwicHJvZmlsZUZvcm1WYWxpZGF0b3IiLCJpbWFnZVBvcHVwIiwiaXRlbSIsIl9pbWFnZSIsIl9jYXB0aW9uIiwiY29udGFpbmVyU2VsZWN0b3IiLCJpdGVtcyIsInJlbmRlcmVyIiwiX2l0ZW1zIiwiX3JlbmRlcmVyIiwiX2NvbnRhaW5lciIsInJlbmRlckl0ZW1zIiwiYXBwZW5kIiwiZWxlbWVudCIsInByZXBlbmQiXSwic291cmNlUm9vdCI6IiJ9