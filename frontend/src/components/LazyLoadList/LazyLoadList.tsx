import React, {useEffect, useState} from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import ListItem from "../ListItem";
import {StrictModeDroppable} from "../../utils";
import {Animal} from "../../types";
import {notifySelectedAnimal, updateAnimalPosition} from "../../api";
import "./LazyLoadList.scss";

interface LazyLoadListProps {
    list: Animal[];
    loadItems: () => void;
}

const LazyLoadList: React.FC<LazyLoadListProps> = ({list, loadItems}) => {
    const [items, setItems] = useState<Animal[]>(list);

    useEffect(() => {
        setItems(list);
    }, [list]);

    const onDragEnd = async (result: any) => {
        if (!result.destination) return;

        const source = result.source.index;
        const destination = result.destination.index;

        const reorderedItems = Array.from(items);
        const [removed] = reorderedItems.splice(source, 1);
        reorderedItems.splice(destination, 0, removed);

        setItems(reorderedItems);

        await updateAnimalPosition(items[source].id, items[destination].id);
    };

    const handleCheckboxChange = (id: string, selected: boolean) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? {...item, selected} : item
            )
        );

        notifySelectedAnimal(id, selected).then();
    };

    const handleScroll = (event: React.UIEvent<HTMLElement>) => {
        const bottom = event.currentTarget.scrollHeight === event.currentTarget.scrollTop + event.currentTarget.clientHeight;

        if (bottom) {
            loadItems()
        }
    };

    return (
        <div className={'lazy-load-wrapper'} onScroll={handleScroll}>
            <DragDropContext onDragEnd={onDragEnd}>
                <StrictModeDroppable droppableId="droppable">
                    {(provided) => (
                        <ul
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{listStyleType: 'none', padding: 0}}
                        >
                            {items.map((item, index) => (
                                <ListItem
                                    index={index}
                                    item={item}
                                    key={item.id}
                                    onCheckboxChange={handleCheckboxChange}/>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </StrictModeDroppable>
            </DragDropContext>
        </div>
    );
};

export default LazyLoadList;
