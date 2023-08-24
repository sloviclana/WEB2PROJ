import React from "react";
import ResponseDto from "../models/ResponseDto";
import RegisterResponseDto from "../models/RegisterResponseDto";
import ArticleDto from "../models/ArticleDto";
import axios from 'axios';
import ArticlesArray from "../models/ArticlesArray";

export const GetAllArticles = async () => {
    const GETALL_ARTICLES_URL = "api/articles/allArticles";

    try{
        const {data} = await axios.get(`${process.env.REACT_APP_API_URL}${GETALL_ARTICLES_URL}`);

        const response = new ArticlesArray(data);
        return response;

    } catch(err) {
        
        alert("Cannot get information about articles!");
        return null;
    }
}

export const AddArticle = async (ArticleDto) => {
    const ADDARTICLE_URL = "api/articles/newArticle";

    try{
        const {data} = await axios.post(`${process.env.REACT_APP_API_URL}${ADDARTICLE_URL}`,
        ArticleDto,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
        );

        const response = new ArticlesArray(data);
        return response;

    } catch(err) {
        
        alert("Cannot get information about articles!");
        return null;
    }

}