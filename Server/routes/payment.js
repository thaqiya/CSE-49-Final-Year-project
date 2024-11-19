import express from 'express';
import crypto from 'crypto';
import axios from 'axios';

export const router = express.Router();

// Define the salt key and merchant ID (confirm these values with PhonePe)
const salt_key = "96434309-7796-489d-8924-ab56988a6076";
const merchant_id = "PGTESTPAYUAT86";
const keyIndex = 1; // Set according to PhonePe API requirements (often 1 for test)


router.post("/order", async (req, res) => {
  try {
    let { MUID, transactionId, amount, name, mobile } = req.body;

    console.log(MUID, transactionId, amount, name, mobile);

    const data = {
      merchantId: merchant_id,
      merchantTransactionId: transactionId,
      name: name,
      amount: amount * 100,
      redirectUrl: `http://localhost:5001/api/payment/status?id=${transactionId}`,
      redirectMode: "POST",
      mobileNumber: mobile,
      paymentInstrument: { type: "PAY_PAGE" },
    };

    // Encode data to base64 and generate the checksum
    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString("base64");

    // Verify order of payload and endpoint per PhonePe API documentation
    const string = payloadMain + "/pg/v1/pay" + salt_key;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + keyIndex;

    const prod_URL =
      "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

    // Set headers and make request
    const options = {
      method: "POST",
      url: prod_URL,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "X-VERIFY": checksum,
      },
      data: { request: payloadMain },
    };

    // Handle API response
    const response = await axios(options);
    res.json(response.data);
  } catch (error) {
    console.error("Order Error:", error);
    console.log(error);

    res.status(500).json({ error: error.message });
  }
});

router.post("/status", async (req, res) => {
  try {
    const merchantId = merchant_id;
    const merchantTransactionId = req.query.id;

    const string =
      `/pg/v1/status/${merchantId}/${merchantTransactionId}` + salt_key;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + keyIndex;

    const options = {
      method: "GET",
      url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": merchantId,
      },
    };

    const response = await axios(options);

    if (response.data.success === true) {
      res.redirect(303, "http://localhost:5173/payment-success"); // Use 303 status to prevent the gateway from being cached in history
    } else {
      res.redirect(303, "http://localhost:5173/payment");
    }
  } catch (error) {
    console.error("Status Error:", error);
    res.status(500).json({ error: error.message });
  }
});
