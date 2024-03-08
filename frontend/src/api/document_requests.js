import axios from "axios"
import { SERVER_BASE } from "./config";
const ROUTE_URL = "/documents/"


export const createDocument = async (documentObject) => {
    let res
    try {
        res = await axios.post(SERVER_BASE + ROUTE_URL, documentObject)
    } catch (error) {
        res = {message: error.message, success: false}
    }
    finally {return res}
};