import { Request, Response, Router } from "express";

import * as Bitcoin from "bitcoinjs-lib";
import * as ecc from "tiny-secp256k1";

import axios from "axios";

import {
  combinePsbt,
  generateSendBTCPSBT,
  generateSendOrdinalPSBT,
  generateRBF_PSBT,
  finalizePsbtInput,
} from "../../service/psbt.service";
import { LocalWallet } from "../../service/localWallet";
import {
  TEST_MODE,
  WalletTypes,
  OPENAPI_UNISAT_TOKEN,
  OPENAPI_UNISAT_URL,
} from "../../config/config";
import { chooseWinner } from "../../service/utils.service";
import { sendInscription } from "../../service/unisat.service";

// Create a new instance of the Express Router
const SendBtcRoute = Router();

// @route    GET api/users/username
// @desc     Is username available
// @access   Public
SendBtcRoute.post("/pre-exec", async (req, res) => {
    try {

        console.log('exec api is called!')

        const {
            buyerPayPubkey,
            buyerOrdinalAddress,
            buyerOrdinalPubkey,
            sellerPaymentAddress,
            amount,
            walletType
        } = req.body;

        const { psbt, buyerPaymentsignIndexes } = await generateSendBTCPSBT(
            walletType,
            buyerPayPubkey,
            buyerOrdinalAddress,
            buyerOrdinalPubkey,
            sellerPaymentAddress,
            amount
        );

        return res.status(200).json({
            success: true,
            psbtHex: psbt.toHex(),
            psbtBase64: psbt.toBase64(),
            buyerPaymentsignIndexes,
          });

        return res.json({});
    } catch (error: any) {
        console.error(error);
        return res.status(500).send({ error });
    }
});

SendBtcRoute.post("/exec", async (req, res) => {
    console.log('exec api is calling!!');
    try {
        const {
          psbt,
          signedPSBT,
          walletType,
        } = req.body;
    
        let sellerSignPSBT;
        if (walletType === WalletTypes.XVERSE) {
          sellerSignPSBT = Bitcoin.Psbt.fromBase64(signedPSBT);
          sellerSignPSBT = await finalizePsbtInput(sellerSignPSBT.toHex(), [0]);
        } else if (walletType === WalletTypes.HIRO) {
          sellerSignPSBT = await finalizePsbtInput(signedPSBT, [0]);
        } else {
          sellerSignPSBT = signedPSBT;
        }

        console.log('sellerSignPSBT ==> ', sellerSignPSBT);
    
        const txID = await combinePsbt(psbt, sellerSignPSBT);
        console.log(txID);
    
        return res
          .status(200)
          .json({ success: true, msg: txID });
      } catch (error) {
        console.log("Buy Ticket and Combine PSBT Error : ", error);
        return res.status(500).json({ success: false });
      }
})

SendBtcRoute.post("/rbf", async (req, res) => {
    try {

        console.log('req.body ==> ', req.body);

        const {
            txId,
            walletType,
            feeRate
        } = req.body;

        const { psbt, buyerPaymentsignIndexes } = await generateRBF_PSBT(
            txId,
            walletType,
            feeRate
        );

        return res.status(200).json({
          success: true,
          psbtHex: psbt.toHex(),
          psbtBase64: psbt.toBase64(),
          buyerPaymentsignIndexes,
        });

        return res.json({});
    } catch (error: any) {
        console.error(error);
        return res.status(500).send({ error });
    }
});

export default SendBtcRoute;
