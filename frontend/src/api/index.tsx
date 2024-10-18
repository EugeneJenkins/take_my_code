import axios, {AxiosInstance} from 'axios';
import {Animal} from "../types";

const options = {
    headers: {
        'Content-Type': 'application/json',
    },
}

const apiClient: AxiosInstance = axios.create({
    baseURL: 'api/',
    timeout: 10000,
    ...options
});

interface AllAnimals {
    animals: Animal[],
    count: number
}

export const getAllAnimals = async (limit: number, offset: number, search: string): Promise<AllAnimals> => {
    try {
        const params =  new URLSearchParams({
            limit: String(limit),
            offset: String(offset),
            search
        })

        const response = await apiClient.get(`/animals?${params.toString()}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        // throw error;

        return {animals: [], count: 0}
    }
}

export const notifySelectedAnimal = async (id: string, selected: boolean) => {
    try {
        const response = await apiClient.patch(`/animals/state/${id}`, {selected});
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export const updateAnimalPosition = async (fromId: string, toId: string) => {
    try {
        const response = await apiClient.put('/animals/update/position', {
            fromId,
            toId
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}
