import { removeExercise } from "../../redux/exercise/exerciseSlice";
import { addSets, removeSets, selectSets } from "../../redux/sets/setsSlice";
import { useDispatch, useSelector } from 'react-redux'; 
import Push from '../../assets/img/push.jpg';
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const editModeDiv = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

const Exercise = ({ name, id, start, change}) => {
    const dispatch = useDispatch();
    const sets = useSelector(selectSets);
    const [selectedImage, setSelectedImage] = useState(null); // State to hold the selected image file
    const [activeMode, setActiveMode] = useState(false);
    const [visSet, setVisSet] = useState(false);
    const [value, setValue] = useState('10');

    const [setsList, setSetsList] = useState([{ id: uuidv4(), repetitions: '10' }]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file)); // Set the selected image URL
        }
    };

    const renderImage = () => {
        if (selectedImage) {
            return <img style={{ width: '90px' }} src={selectedImage} alt="Selected" />;
        } else {
            const initials = name ? name.charAt(0) : "?";
            return <div style={{
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                backgroundColor: 'rgb(203 203 203)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 'bold'
            }}>{initials}</div>;
        }
    };

    const showSets = (e) => {
        e.target.style.transform += 'rotate(180deg)';
        setVisSet(!visSet);
    }

    const handleAddSets = () => {
        const newSet = { id: uuidv4(), repetitions: value };
        setSetsList([...setsList, newSet]);
    };

    return (
        <div style={{background: '#fff', padding: '10px'}}>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
            background: 'rgb(213 213 213)',
            padding: '10px',
            borderRadius: '10px'
        }}>
            <div style={editModeDiv}>
                <div>
                    {/* {renderImage()} */}
                    {/* <input type="file" onChange={handleImageChange} /> */}
                        {change ?
                            <i className="fa-solid fa-arrow-up" style={{transition: '0.5s'}} onClick={showSets}></i>
                            : null
                        }
                    <img style={{ width: '70px', marginRight: '5px' }} src={Push} alt="" />
                </div>
                <div>
                    <h1>{name}</h1>
                     <p>1 повт. по 10 раз.</p>
               </div>
            </div>
            { activeMode ? 
                <div style={{ width: '100px', height: '80px', background: 'rgb(211 211 211)', borderRadius: '10px' }}>
                    <button onClick={() => dispatch(removeExercise(id))} className="btn btn-primary">Remove</button>
                </div>
                : null
            }
            <button style={{border:'none'}} onClick={() => setActiveMode(!activeMode)}>...</button>
        </div>
            { change && visSet ? 
                <div>
<ul>
                        {setsList.map((set) => (
                            <li key={set.id} style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                background: 'rgb(211 211 211)',
                                borderRadius: '20px',
                                alignItems: 'center',
                                textAlign: 'center',
                                padding: '5px'
                            }}>
                                <p>1</p>
                                <div style={{display: 'flex'}}>
                                    <input
                                        style={{
                                            width: '90px',
                                            borderRadius: '10px',
                                            outline: 'none',
                                            border: 'none',
                                            background: 'rgb(191 191 191)',
                                            textAlign: 'center',
                                            marginRight: '10px'
                                        }}
                                        type="number"
                                        value={set.repetitions}
                                        onChange={(e) => setValue(e.target.value)}
                                    />
                                    <p>повт.</p>
                                </div>
                            </li>
                        ))}
                        <button onClick={handleAddSets} style={{width: '100%', marginTop: '10px'}} className="btn btn-primary">Add new</button>
                    </ul>
                </div> : null
            }
        </div>
    )
}

export default Exercise;