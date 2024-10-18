import {Request, Response} from 'express';
import {animalService} from "../services";

export const getAnimals  = async (req: Request, res: Response) => {
    const { limit, offset, search } = req.query;
    const request = {
        offset: 0,
        limit: 20,
        search: ''
    };

    if (typeof limit === "string") {
        request['limit'] = limit ? parseInt(limit, 10) : 20;
    }

    if (typeof offset === "string") {
        request['offset'] = limit ? parseInt(offset, 10) : 0;
    }

    const searchString = Array.isArray(search) ? search[0] : search;

    if (typeof searchString === "string") {
        request.search = searchString;
    }

    res.json(animalService.getFilteredAnimals(request));
}

export const updatedSelectedState = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const {selected} = req.body;

        animalService.updateSelectedState(id, selected)

        res.json({status: 'ok'});
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
}

export const updatePosition = async (req: Request, res: Response) => {
    try {
        const {fromId, toId} = req.body;
        animalService.updatePosition(fromId, toId)

        res.json({status: 'ok'});
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
}
