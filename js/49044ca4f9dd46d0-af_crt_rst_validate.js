jQuery(function ($){
var ajaxurl=addify_af_crt_var.admin_url;
var nonce=addify_af_crt_var.nonce;
var checkoutURL=addify_af_crt_var.af_checkout;
function showWooError(message){
var $noticeContainer=$(".woocommerce-notices-wrapper");
if($noticeContainer.length===0){
$noticeContainer=$(".woocommerce-cart-form, .woocommerce-checkout, .content-area, .entry-content, .post-content");
}
$(".woocommerce-error").remove();
$noticeContainer.prepend('<ul class="woocommerce-error"><li>' + message + '</li></ul>');
if($noticeContainer.length){
$('html, body').animate({
scrollTop: $noticeContainer.offset().top - 100
}, 'slow');
}}
function validateBeforeProceed(e, callback){
e.preventDefault();
e.stopPropagation();
$.ajax({
url: ajaxurl,
type: 'POST',
data: {
action: 'af_order_and_cart_restrct',
nonce: nonce
},
success: function (data){
if(data['success']===true){
if(typeof callback==="function"){
callback();
}}else{
showWooError(data['message']);
}}
});
}
$(document).on('click', ".checkout-button, .wc-block-cart__submit-button", function (e){
validateBeforeProceed(e, function (){
window.location.href=checkoutURL;
});
});
const observer=new MutationObserver(()=> {
const buttons=document.querySelectorAll('.checkout-button, .wc-block-cart__submit-button, .wc-block-components-checkout-place-order-button'
);
buttons.forEach((btn)=> {
btn.removeEventListener('click', handleButtonClick);
btn.addEventListener('click', handleButtonClick);
});
});
observer.observe(document.body, { childList: true, subtree: true });
});
