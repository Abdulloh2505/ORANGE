console.log("Products frontend javascript file");

$(function () {
    $(".product-collection").on("change",() => {
        const selectedValue = $(".product-collection").val();
        if (selectedValue === "DRINK" || selectedValue === "COFFEE" || selectedValue === "TEA")
        {
            $("#product-collection").hide();
            $("#product-volume").show();
            } else {
             $("#product-volume").hide();
             $("#product-collection").show();
            }
    });
    $("#process-btn").on("click", () => {
     $(".dish-container").slideToggle(500);
     $("#process-btn").css("display", "none");
    });

     $("#cancel-btn").on("click", () => {
     $(".dish-container").slideToggle(100);
     $("#process-btn").css("display", "flex");
    });

    $(".new-product-status").on("change", async function(e) {
        const id = e.target.id;
        const productStatus = $(`#${id}.new-product-status`).val();
        console.log("id:",id);
        console.log("productStatus:", productStatus);

        try {
         const response = await axios.post(`/admin/product/${id}`, {productStatus: productStatus});
         console.log("response:", response);
        const result =response.data;
        if(result.data){
            console.log("Product updated!");
            $(".new-product-status").blur();

        } else  alert("Product update failed!");
        
        } catch(err) {
            console.log(err);
            alert("Product update failed!");
        }
     

    });
});




function validateForm(){
    const productName = $(".product-name").val();
    const productPrice = $(".product-price").val();
    const productLeftCount = $(".product-left-count").val();
    const productCollection = $(".product-collection").val();
    const productDescp = $(".product-desc").val();
    const productStatus = $(".product-status").val();

    if(
       productName === "" || 
       productPrice === "" ||
       productLeftCount === "" ||
       productCollection  === "" || 
       productDescp === "" || 
       productStatus === "" 
    ){
       alert("Please insert all details!");
        return false;
        
    } else return true;
  }


  function previewFileHandler(input, order) {
    const imgClassName = input.className;
    console.log("input:", input);

const file = $(`.${imgClassName}`).get(0).files[0];
const fileType = file["type"];
const validImageType = ["image/jpg","image/jpeg","image/png"];


if(!validImageType.includes(fileType)){
  alert("Please insert only jpeg, jpg and png!");

} else {
    if(file) {
        const reader = new FileReader();
        reader.onload = function() {
            $(`#image-section-${order}`).attr("src", reader.result);
        };
       reader.readAsDataURL(file);
    }
} 
}// ========== CURSOR FOLLOWER EFFECT ==========
console.log("Coffee cursor effects initializing...");

$(document).ready(function() {
    
    // Create coffee cup cursor
    const coffeeCup = $('<div class="cursor-follower">☕</div>');
    $('body').append(coffeeCup);
    
    let mouseX = 0;
    let mouseY = 0;
    let cupX = 0;
    let cupY = 0;
    
    // Track mouse
    $(document).on('mousemove', function(e) {
        mouseX = e.pageX;
        mouseY = e.pageY;
    });
    
    // Smooth animation
    function animate() {
        cupX += (mouseX - cupX) * 0.15;
        cupY += (mouseY - cupY) * 0.15;
        
        coffeeCup.css({
            left: cupX + 'px',
            top: cupY + 'px'
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    console.log("✅ Coffee cursor loaded!");
});