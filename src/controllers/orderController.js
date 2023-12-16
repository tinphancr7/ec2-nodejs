import db from "../models";

const createOrder = async (req, res) => {
	const {
		paymentMethod,
		shippingAddress,
		orderStatus,
		totalCost,
		products,
		email,
		phone,
		fullname,
	} = req.body;
	const userId = req.user.id;

	try {
		const result = await db.Order.create({
			userId,
			paymentMethod,
			shippingAddress,
			orderStatus,
			totalCost,
			email,
			phone,
			fullname,
		});

		const orderItems = products.map((product) => ({
			OrderId: result.id,
			productId: product.productId,
			quantity: product.quantity,
			priceAtPurchase: product.price,
		}));

		await db.OrderItem.bulkCreate(orderItems);

		return res.status(200).send(result);
	} catch (error) {
		// Handle the error appropriately
		console.error("Error creating/updating user cart:", error);
		throw error;
	}
};

const getOrderItemsByUser = async (req, res) => {
	const userId = req.user?.id;

	try {
		const result = await db.Order.findAll({
			where: {
				userId: userId,
			},
			include: {
				model: db.OrderItem,
				as: "orderData",
				include: {
					model: db.Product,
					as: "orderItemData",
					atributes: ["id", "name", "price", "description", "quantity"],
				},
			},
			raw: false,
			nest: true,
		});
		return res.status(200).send(result);
	} catch (error) {
		// Handle the error appropriately
		console.error("Error creating/updating user cart:", error);
		throw error;
	}
};
// http://localhost:5173/?partnerCode=MOMO&orderId=MOMO1702610780570&requestId=MOMO1702610780570&amount=1000&orderInfo=pay+with+MoMo&orderType=momo_wallet&transId=3108111745&resultCode=0&message=Successful.&payType=qr&responseTime=1702610801454&extraData=&signature=0c6d292b9a4e8d2a8113fd35a919f81c1f8839073324eb5e0209e87d9932bc87
const paymentOrder = async (req, res) => {
	//https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
	//parameters
	console.log("paymentOrder");
	var partnerCode = "MOMO";
	var accessKey = "F8BBA842ECF85";
	var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
	var requestId = partnerCode + new Date().getTime();
	var orderId = requestId;
	var orderInfo = "pay with MoMo";
	var redirectUrl = "http://localhost:5173/";
	var ipnUrl = "http://localhost:8080/api/notify";
	// var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
	var amount = "1000";
	var requestType = "captureWallet";
	var extraData = ""; //pass empty value if your merchant does not have stores

	//before sign HMAC SHA256 with format
	//accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
	var rawSignature =
		"accessKey=" +
		accessKey +
		"&amount=" +
		amount +
		"&extraData=" +
		extraData +
		"&ipnUrl=" +
		ipnUrl +
		"&orderId=" +
		orderId +
		"&orderInfo=" +
		orderInfo +
		"&partnerCode=" +
		partnerCode +
		"&redirectUrl=" +
		redirectUrl +
		"&requestId=" +
		requestId +
		"&requestType=" +
		requestType;
	//puts raw signature
	console.log("--------------------RAW SIGNATURE----------------");
	console.log(rawSignature);
	//signature
	const crypto = require("crypto");
	var signature = crypto
		.createHmac("sha256", secretkey)
		.update(rawSignature)
		.digest("hex");
	console.log("--------------------SIGNATURE----------------");
	console.log(signature);

	//json object send to MoMo endpoint
	const requestBody = JSON.stringify({
		partnerCode: partnerCode,
		accessKey: accessKey,
		requestId: requestId,
		amount: amount,
		orderId: orderId,
		orderInfo: orderInfo,
		redirectUrl: redirectUrl,
		ipnUrl: ipnUrl,
		extraData: extraData,
		requestType: requestType,
		signature: signature,
		lang: "en",
	});
	//Create the HTTPS objects
	const https = require("https");
	const options = {
		hostname: "test-payment.momo.vn",
		port: 443,
		path: "/v2/gateway/api/create",
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Content-Length": Buffer.byteLength(requestBody),
		},
	};
	//Send the request and get the response
	const reqq = https.request(options, (ress) => {
		console.log(`Status: ${ress.statusCode}`);
		console.log(`Headers: ${JSON.stringify(ress.headers)}`);
		ress.setEncoding("utf8");
		ress.on("data", (body) => {
			console.log("Body: ");
			console.log(body);
			console.log("payUrl: ");
			console.log(JSON.parse(body).payUrl);
			return res.status(200).send(JSON.parse(body).payUrl);
		});
		ress.on("end", () => {
			console.log("No more data in response.");
		});
	});

	reqq.on("error", (e) => {
		console.log(`problem with request: ${e.message}`);
	});
	// write data to request body
	console.log("Sending....");
	reqq.write(requestBody);
	reqq.end();
};

const notifyOrder = (req, res) => {
	console.log("notifyOrder");
	console.log(req.body);
	return res.status(200).send("OK");
};
export {createOrder, getOrderItemsByUser, paymentOrder, notifyOrder};
