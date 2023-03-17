// write a GET api request to fetch data from "https://fh-api-dev.herokuapp.com/api/products-service/products/website/CAD?page=0&limit=6"
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const API_URL = "https://fh-api-dev.herokuapp.com/api/products-service/products/website/CAD?page=0&limit=6";

export default async function handler (req: NextApiRequest, res: NextApiResponse)  {
  try {
    const response = await axios.get(API_URL);
    console.log ("response.data", response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Error fetching data" });
  }
};