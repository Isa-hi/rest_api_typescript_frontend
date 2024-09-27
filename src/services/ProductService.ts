import axios from "axios";
import { DraftProductSchema, ProductSchema, ProductsSchema, ProductType } from "../types";
import { safeParse } from "valibot";
import { stringToBoolean } from "../utils";
type ProductData = {
    [k: string]: FormDataEntryValue;
}

export async function addProduct(data : ProductData) {
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        });
        if(result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`;
            const { data } = await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })
            console.log(data);
            
        } else {
            throw new Error('Invalid data')
        }
    } catch (error) {
        console.log(error);   
    }
    
}

export async function getProducts() {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);        
        const parsedResult = safeParse(ProductsSchema, data.data);
        if(parsedResult.success) {          
            return parsedResult.output;
        } else {
            throw new Error('Invalid data');
        }    
        
    } catch (error) {
        console.log(error);
        
    }
}

export async function getProductsById(id : ProductType['id']) {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
        const parsedResult = safeParse(ProductSchema, data.data);
       
        if(parsedResult.success) {          
            return parsedResult.output;
        } else {
            throw new Error('Invalid data');
        }    
        
    } catch (error) {
        console.log(error);
        
    }
}

export async function updateProduct(data : ProductData, id: ProductType['id']) {
    try {
        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: +data.price,
            availability: stringToBoolean(data.availability.toString())
        })
        if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
            const { data } = await axios.put(url, result.output)
            return data;
        }
        
    } catch (error) {
        console.log(error);
    }
    
}

export async function deleteProduct(id: ProductType['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        const { data } = await axios.delete(url);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function updateProductAvailability(id:ProductType['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        await axios.patch(url);
    } catch (error) {
        console.log(error);
        
    }
}