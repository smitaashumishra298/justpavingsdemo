const openQuoteBtn=document.getElementById("openQuoteBtn");
const closeQuoteBtn=document.getElementById("closeQuoteBtn");
const quotePopup=document.getElementById("quotePopup");
const quoteForm=document.getElementById("quoteForm");
const nameInput=document.getElementById("name");
const emailInput=document.getElementById("email");
const phoneInput=document.getElementById("phone");
const messageInput=document.getElementById("message");
const nameError=document.getElementById("nameError");
const emailError=document.getElementById("emailError");
const phoneError=document.getElementById("phoneError");
const messageError=document.getElementById("messageError");
const formMessage=document.getElementById("formMessage");
const submitBtn=document.getElementById("submitBtn");

openQuoteBtn.addEventListener("click",()=>quotePopup.classList.add("active"));
closeQuoteBtn.addEventListener("click",()=>quotePopup.classList.remove("active"));

quotePopup.addEventListener("click",e=>{
  if(e.target===quotePopup) quotePopup.classList.remove("active");
});

document.addEventListener("keydown",e=>{
  if(e.key==="Escape") quotePopup.classList.remove("active");
});

phoneInput.addEventListener("input",()=>{
  phoneInput.value=phoneInput.value.replace(/\D/g,"").slice(0,10);
});

quoteForm.addEventListener("submit",e=>{
  e.preventDefault();
  clearErrors();

  let valid=true;
  const name=nameInput.value.trim();
  const email=emailInput.value.trim();
  const phone=phoneInput.value.trim();
  const message=messageInput.value.trim();

  if(!name){nameError.textContent="Please enter your name.";valid=false}
  else if(name.length<2){nameError.textContent="Name must be at least 2 characters.";valid=false}

  if(!email){emailError.textContent="Please enter your email.";valid=false}
  else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){emailError.textContent="Please enter a valid email.";valid=false}

  if(!phone){phoneError.textContent="Please enter your phone number.";valid=false}
  else if(!/^[6-9]\d{9}$/.test(phone)){phoneError.textContent="Please enter a valid 10-digit phone number.";valid=false}

  if(!message){messageError.textContent="Please enter your message.";valid=false}
  else if(message.length<10){messageError.textContent="Message must be at least 10 characters.";valid=false}

  if(!valid)return;

  submitBtn.disabled=true;
  submitBtn.textContent="Sending...";
  const formData=new FormData(quoteForm);

  fetch("send.php",{method:"POST",body:formData})
  .then(r=>r.json())
  .then(data=>{
    if(data.success){
      formMessage.textContent="Thank you! Your enquiry has been sent successfully.";
      formMessage.className="success-message";
      quoteForm.reset();
      setTimeout(()=>{
        quotePopup.classList.remove("active");
        formMessage.textContent="";
      },2500);
    }else{
      formMessage.textContent=data.message||"Something went wrong.";
      formMessage.className="error-message";
    }
  })
  .catch(()=>{
    formMessage.textContent="Unable to send your enquiry. Please try again.";
    formMessage.className="error-message";
  })
  .finally(()=>{
    submitBtn.disabled=false;
    submitBtn.textContent="Submit";
  });
});

function clearErrors(){
  nameError.textContent="";
  emailError.textContent="";
  phoneError.textContent="";
  messageError.textContent="";
  formMessage.textContent="";
  formMessage.className="";
}
