import {en, Faker} from '@faker-js/faker';
import {addAnimal, getAnimalState, moveAnimal, updateAnimal} from "../state";

const faker = new Faker({
    locale: [en],
});

type AnimalType = 'dog' | 'cat' | 'fish' | 'bird';

export interface Animal {
    id: string,
    animal: string,
    breed: string,
    selected: boolean
}

export const getAllAnimals = (): Animal[] => {
    if (getAnimalState().length === 0) {
        generateAnimals();
    }

    return getAnimalState();
};

export const updateSelectedState = (id: string, state: boolean) => {
    updateAnimal(id, {selected: state})
}

export const updatePosition = (from: string, to: string) => {
    moveAnimal(from, to)
}

export const searchAnimalByBreed = (breed: string = ''): Animal[] => {
    if (breed === '') {
        return getAnimalState();
    }

    return getAnimalState().filter(animal =>
        animal.breed.toLowerCase().includes(breed.toLowerCase())
    );
}

const generateAnimals = () => {
    const count: number = 100
    const animals: AnimalType[] = ['dog' , 'cat' , 'fish' , 'bird']


    for (let i = 0; i < count; i++) {
        const random = Math.floor(Math.random() * animals.length);
        const animalType: AnimalType = animals[random]

        addAnimal({
            id: faker.string.uuid(),
            animal: animalType,
            breed: faker.animal[animalType](),
            selected: false
        });
    }
}

interface FilterAnimals {
    limit: number,
    offset: number,
    search: string,
}


export const getFilteredAnimals = (filter: FilterAnimals) => {
    let animals = getAllAnimals();
    let filteredAnimals: Animal[] = animals;

    if (filter.search !== '') {
        filteredAnimals = animals.filter(animal =>
            animal.breed.toLowerCase().includes(filter.search.toLowerCase()) ||
            animal.animal.includes(filter.search.toLowerCase())
        );
    }

    filteredAnimals = filteredAnimals.slice(filter.offset, filter.offset + filter.limit)

    return {
        count: animals.length,
        animals: filteredAnimals
    };
}
