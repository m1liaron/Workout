import { removeExercise } from "../../redux/exercise/exerciseSlice";
import { addSets, removeSets, selectSets } from "../../redux/sets/setsSlice";
import { useDispatch, useSelector } from 'react-redux'; 
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
    const [rep, setRep] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null); // State to hold the selected image file
    const [activeMode, setActiveMode] = useState(false);
    const [visSet, setVisSet] = useState(false);
    const [value, setValue] = useState('10');

    const [setsList, setSetsList] = useState([{ id: uuidv4(), repetitions: '10' }]);

    // const handleImageChange = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         setSelectedImage(URL.createObjectURL(file)); // Set the selected image URL
    //     }
    // };

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
        const newSet = { setId: uuidv4(), repetitions: value }; // Generate a new UUID for the set
        setSetsList([...setsList, newSet]);
        dispatch(addSets({ setId: newSet.setId, repetitions: value }));
        setRep(rep + 1);
      };

    const handleRemoveLastSet = () => {
        if (setsList.length > 1) {
          const lastSetId = setsList[setsList.length - 1].id;

          dispatch(removeSets(lastSetId));
    
          setSetsList(setsList.slice(0, setsList.length - 1));
          setRep(rep - 1);
        }
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
                <div style={{display: 'flex', alignItems: 'center'}}>
                        {change ?
                            <i className="fa-solid fa-arrow-up" style={{transition: '0.5s', marginRight: '10px'}} onClick={showSets}></i>
                            : null
                        }
                        {start ? 
                        <i className="fa-solid fa-arrow-down" style={{transition: '0.5s', marginRight: '10px'}} onClick={showSets}></i>
                        : 
                        null
                        }
                    {renderImage()}
                    {/* <input type="file" onChange={handleImageChange} /> */}
                </div>
                <div>
                    <h1>{name}</h1>
                     <p>{rep} повт. по 10 раз.</p>
               </div>
            </div>
            { activeMode ? 
                <div style={{position: 'absolute', width: '100px', height: '150px', background: '#fff', borderRadius: '10px', right: '60px'}}>
                    <button onClick={() => dispatch(removeExercise(id))} className="btn btn-primary">Видалити вправу</button>
                    <button onClick={handleRemoveLastSet} className="btn btn-primary">Видалити підхід</button>
                </div>
                : null
            }
            <button style={{border:'none'}} onClick={() => setActiveMode(!activeMode)}>...</button>
        </div>
            { change && visSet || start && !visSet? 
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
                                padding: '5px',
                                marginBottom: '10px'
                            }}>
                                <p>{setsList.indexOf(set) + 1}</p>
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
                                        value={value}
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