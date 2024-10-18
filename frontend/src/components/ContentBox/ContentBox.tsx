import React, {useEffect, useState} from "react";
import SearchInput from "../SearchInput";
import "./ContentBox.scss"
import LazyLoadList from "../LazyLoadList";
import {getAllAnimals} from "../../api";
import {Animal} from "../../types";

const ContentBox: React.FC = () => {
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [animalsCount, setAnimalsCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');

    const Limit = 20;
    const [offset, setOffset] = useState<number>(0);

    const handleSearch = async (value: string) => {
        setLoading(true);

        const animals = await getAllAnimals(Limit, offset, value)
        setAnimals(animals.animals);
        setAnimalsCount(animals.count)

        setLoading(false);
        setSearch(value)
        setOffset(0)
    };

    useEffect(() => {
        getAllAnimals(Limit, 0, '').then((res) => {
            setAnimals(res.animals)
            setAnimalsCount(res.count)
        })
    }, []);

    const loadItems = async () => {
        if (loading || animalsCount <= offset) {
            return;
        }

        setLoading(true);

        const nextOffset = offset + Limit
        const newAnimals = await getAllAnimals(Limit, nextOffset, search);

        setAnimals((prev) => [...prev, ...newAnimals.animals]);
        setLoading(false);
        setOffset(nextOffset);
    }

    return (
        <div className={'content-wrapper'}>
            <div className="content-box">
                <h1 className="text-center">Select animals {animals.length}</h1>
                <SearchInput onSearch={handleSearch}/>
                {loading && <p>Loading...</p>}
                {animals.length > 0 && <LazyLoadList list={animals} loadItems={loadItems}/>}
            </div>
        </div>
    );
}

export default ContentBox;
