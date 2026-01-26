
import express from "express";
const router = express.Router();
import memberController from "./controllers/member.controller";
import uploader from "./libs/utils/uploader";//file vidio larni yuklaydiha uploder
import productController from "./controllers/product.controller";
import orderController from "./controllers/order.controller";



/** Member **/
router.get("/member/restaurant",memberController.getRestaurant);
router.post("/member/login", memberController.login);

router.post("/member/signup", memberController.signup);
router.post("/member/logout", 
    memberController.verifyAuth,
    memberController.logout);
router.get("/member/detail",
    memberController.verifyAuth, 
    memberController. getMemberDetail);

    router.post("/member/update", 
        memberController.verifyAuth,
        uploader("members").single("memberImage"),
        memberController.updateMember
    );
      router.post("/member/update", // User bor bulganda gina update qilish mumkin buladi
        memberController.verifyAuth,
        uploader("members").single("memberImage"),//uploderni integratsiya qildik va
        memberController.updateMember// bita rasim yuklashga ruxsat berdik
    );
    router.get("/member/top-users", memberController.getTopUsers);


/** Product **/

router.get("/product/all", productController.getProducts);//
router.get("/product/:id", 
    memberController.retrieveAuth, 
    productController.getProduct
);


/** Order **/
router.post("/order/create",
     memberController.verifyAuth,
    orderController.createOrder
    );
router.get("/order/all", 
    memberController.verifyAuth,
    orderController.getMyOrders
);
router.post("/order/update", 
    memberController.verifyAuth, 
    orderController.updateOrder );

export default router;
