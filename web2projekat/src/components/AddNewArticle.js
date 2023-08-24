import React from "react";
import { ReactDOM } from "react";
import { useState } from "react";
import { useEffect } from "react";
import ArticleDto from "../models/ArticleDto";
import UploadImage from "./UploadImage";
import { AddArticle } from "../services/ArticleServices";

const AddNewArticle = () => {

    const[name, setName] = useState('');
    const[price, setPrice] = useState(0);
    const[quantity, setQuantity] = useState(0);
    const[description, setDescription] = useState('');
    const[image, setImage] = useState('');
    const[error, setError] = useState('');
    //const [imageUrl,setImageUrl]=useState("");

    //const [file,setFile]=useState(null);

    

    const handleSubmit = () => {

        const user = sessionStorage.getItem('user');
        const userDto = JSON.parse(user);
        const userId = userDto.Id;

        const article = {
            Name : name,
            Price : price,
            Quanity : quantity,
            Description : description,
            UserId : userId,
            Image : image
        };


        async function fetchData() {
            try {
              const data = await AddArticle(article);
              if(data !== null){
                
                alert("Successfull article adding!");
                //reloadPage();
            }
            else{
                
                alert("Something went wrong!");
                //setInputsToEmpty();
            }
            } catch (error) {
              // Handle error
            }
          }
      
        fetchData();

    }

    /*const handleInputChanges = (e) => {
        const{name,value}=e.target;
        if(name === "image"){
            setImage(value);
        }
    }*/

    /* function handleFileSelect(event) {
        const file = event.target.files[0];
        console.log(file);
        setImageUrl(file);
        const formData = new FormData();
        formData.append("image", file);
        setFile(formData);
        setImageUrl(file)
      } */

    return (
        <div className="card">
            <h3>Add new article</h3>

            <form className="registerForm" onSubmit={handleSubmit}>
                <div className="field">
                    <label>Name </label>
                    <input type="text"
                            value={name}
                            name="name"
                            placeholder="Name of article"
                            onChange={(e) => setName(e.target.value)}/>
                    {error && name.length === 0 ? <div className="redLabel">You must enter your name!</div> : null}
                </div>

                <div className="field">
                    <label>Price</label>
                    <input type="number"
                            value={price}
                            name="price"
                            placeholder="Price"
                            onChange={(e) => setPrice(e.target.value)}/>
                    {error && price.length === 0 ? <div className="redLabel">You must enter your username!</div> : null}
                </div>

                <div className="field">
                    <label>Quantity </label>
                    <input type="number"
                            value={quantity}
                            name="quantity"
                            placeholder="Quantity"
                            onChange={(e) => setQuantity(e.target.value)}/>
                    {error && quantity.length === 0 ? <div className="redLabel">You must enter your password!</div> : null}
                </div>

                <div className="field">
                            <label>Description </label>
                            <input type="text"
                                value={description}
                                name="description"
                                placeholder="Description"
                                onChange={(e) => setDescription(e.target.value)}/>
                            {error && description.length === 0 ? <div className="redLabel">You must enter the email address!</div> : null}
                </div>

                <div className="field">
                        <label>Image: </label> 
                        <UploadImage slika={image} setSlika={setImage}></UploadImage>
                </div>
                

                

                <div className="buttons-flex">
                        <button className="blueButton" type="submit" onClick={handleSubmit}>Add article</button>
                        <div id="singInDiv"></div>
                </div>

            </form>

        </div>
    );
}

export default AddNewArticle;