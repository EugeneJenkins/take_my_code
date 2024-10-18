import {Animal} from "../services/animalService";

const animalState: Animal[] = [];

export const getAnimalState = () => animalState

export const addAnimal = (animal: Animal) => {
    animalState.push(animal);
};

export const updateAnimal = (id: string, updatedAnimal: Partial<Animal>) => {
    const index = animalState.findIndex(animal => animal.id === id);

    if (index !== -1) {
        animalState[index] = { ...animalState[index], ...updatedAnimal };
    }
};

export const moveAnimal = (fromId: string, toId: string) => {
    const fromIndex = animalState.findIndex(animal => animal.id === fromId);
    const toIndex = animalState.findIndex(animal => animal.id === toId);

    const [animalToMove] = animalState.splice(fromIndex, 1);
    animalState.splice(toIndex, 0, animalToMove);
}
