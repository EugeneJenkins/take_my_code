import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {Animal} from "../../types";

interface ListItemProps {
    item: Animal;
    index: number;
    onCheckboxChange: (id: string, checked: boolean) => void;
}

const ListItem: React.FC<ListItemProps> = ({ item, index, onCheckboxChange }) => {
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        onCheckboxChange(item.id, event.target.checked);
    }

    return (
        <Draggable draggableId={item.id} index={index} key={item.id}>
            {(provided) => (
                <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        ...provided.draggableProps.style,
                        padding: '16px',
                        margin: '4px 0',
                        backgroundColor: '#fff',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        textAlign: "center"
                    }}
                >
                    <input
                        type="checkbox"
                        checked={item.selected}
                        onChange={handleCheckboxChange}
                    />
                    <span>Animal: {item.animal}.</span>
                    <span style={{marginLeft: 10}}>Breed: {item.breed}</span>
                </li>
            )}
        </Draggable>
    );
};

export default ListItem;
