import axios from "axios"
import { SERVER_BASE } from "./config";
const ROUTE_URL = "/users/"

export const login = async (username,password) => {
    let res
    try {
        res = await axios.post(SERVER_BASE + ROUTE_URL + "auth", {username,password})
    } catch (error) {
        res = {message: error.message, success: false}
    
    }
    finally {return res}
  };
