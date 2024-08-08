import axios, { AxiosPromise } from "axios"
import { FoodData } from "../components/interface/FoodData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://localhost:8080";

const postData = async (data: FoodData): AxiosPromise<any> => {
    const response = axios.post(API_URL + '/foods', data)
    return response;
}

export function useFoodDataMutate(){
    const queryCliente = useQueryClient();

    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryCliente.invalidateQueries(['food-data'])
        }
    }) 

   return mutate;
}