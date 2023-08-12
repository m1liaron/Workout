import { removeExercise } from "../../redux/exercise/exerciseSlice";
import { addSets, removeSet, selectSets, updateSets, updateSetTime } from "../../redux/sets/setsSlice";
import { useDispatch, useSelector } from 'react-redux'; 
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { formatTime } from "../statistic/Statistic";
import './Exercise.css'
import Modal from "../modal/Modal";

const editModeDiv = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

const Exercise = ({ name, id, start, change}) => {
    const dispatch = useDispatch();
    const sets = useSelector(selectSets);
    const filteredSets = sets.filter((set) => set.exId === id);

    const [rep, setRep] = useState(filteredSets.length);
    const [selectedImage, setSelectedImage] = useState(null);
    const [activeMode, setActiveMode] = useState(false);
    const [visSet, setVisSet] = useState(false);
    const [value, setValue] = useState('10');
    const [modalShow, setModalShow] = useState(false);
    const [dis, setDis] = useState(false);
    const [duration, setDuration] = useState(0);

    // const handleImageChange = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         setSelectedImage(URL.createObjectURL(file)); // Set the selected image URL
    //     }
    // };

    useEffect(() => {
        if (start) {
            const updatedSets = sets.map(set => ({ ...set, checked: false }));
            updatedSets.forEach(updatedSet => dispatch(updateSets(updatedSet)));
        } else {
            return;
        }
    }, [start]);
    
    if (filteredSets.length === 0) {
        const defaultSet = { exId: id, setId: uuidv4(), repetitions: '10', checked: false, duration: 0 };
        dispatch(addSets(defaultSet));
    }

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
        const newSet = {
            exId: id,
            setId: uuidv4(),
            repetitions: value,
            checked: false,
            duration: 0
        };
        dispatch(addSets(newSet));
        setRep(rep + 1);
      };

        const handleRemoveLastSet = () => {
            if (filteredSets.length > 1) {
                const lastSetId = filteredSets[filteredSets.length - 1].setId;
                dispatch(removeSet(lastSetId));
                if(rep >= 1){
                    setRep(rep - 1);
                } else {
                    setRep(rep);
                }
            }
    };

    const handleCheckboxChange = (setId, checked) => {
    const updatedSets = sets.map((set) =>
      set.setId === setId ? { ...set, checked: !checked } : set
    );

    const setIndex = sets.findIndex((set) => set.setId === setId);
    if (setIndex !== -1) {
      dispatch(updateSets({ setId, checked: updatedSets[setIndex].checked }));
    }

    if (!checked) {
      setModalShow(true);
      setDis(true);
      if (start) {
          const startTime = Date.now();
        const timer = setInterval(() => {
          const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Convert to seconds
          setDuration(elapsedTime);
        }, 1000); 

        dispatch(updateSetTime({ setId, startTime, timer }));
      }
    } else {
      setModalShow(false);
      setDis(true);
      if (start && !modalShow) {
        const set = sets.find((set) => set.setId === setId);
        if (set && set.startTime && set.timer) {
          clearInterval(set.timer);
          const currentDuration = set.duration + duration;
          dispatch(updateSets({ setId, duration: currentDuration, timer: null }));
        }
      }
    }
  } ;

    return (
        <div style={{background: '#ffff', padding: '10px', marginBottom: '20px'}}>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
            background: 'rgb(213 213 213)',
            padding: '10px',
            borderRadius: '10px',
            alignItems: 'center'
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
                    <p>{rep} повт. по {value} раз</p>
               </div>
            </div>
            { activeMode ? 
                <div style={{position: 'absolute', width: '200px', background: '#fff', borderRadius: '10px', right: '44px'}}>
                    <div onClick={() => dispatch(removeExercise(id))}>Видалити вправу</div>
                    <div onClick={handleRemoveLastSet}>Видалити підхід</div>
                </div>
                : null
            }
            {change || start ? <div style={{border:'none', fontSize: '2rem'}} onClick={() => setActiveMode(!activeMode)}><i class="fa-solid fa-ellipsis-vertical"></i></div> : null}
            </div>
            { change && visSet || start && !visSet? 
                <div>
                    <ul>
                        {filteredSets.map((set, index) => (
                            <li key={set.id} style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                color: set.checked && start ? '#fff' : '#000',
                                background: set.checked && start ? "green" : "rgb(212 212 212)",
                                borderRadius: '20px',
                                alignItems: 'center',
                                textAlign: 'center',
                                padding: '5px',
                                marginBottom: '10px'
                            }}
                            className={visSet && change ? 'swimming' : ''}>
                                {start ? 
                                    <label className="checkbox-container">
                                        <input
                                        type="checkbox"
                                        checked={set.checked}
                                        onChange={() => handleCheckboxChange(set.setId, set.checked)}
                                        disabled={setDis}
                                        />
                                        <span className="checkmark"></span>
                                    </label>
                                    : null
                                }

                                <p>{index + 1}</p>
                                <div style={{display: 'flex'}}>
                                    <input
                                        style={{
                                            width: '90px',
                                            borderRadius: '10px',
                                            outline: 'none',
                                            border: 'none',
                                            background: set.checked && start ? "rgb(0 93 16)" : 'rgb(191 191 191)',
                                            textAlign: 'center',
                                            marginRight: '10px',
                                            color: set.checked && start ? '#fff' : '#000'
                                        }}
                                        type="number"
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                    />
                                    <p>повт.</p>
                                </div>
                                {start ? set.timer ? formatTime(set.timer) : '00:00:00' : null}
                            </li>
                        ))}
                        <button onClick={handleAddSets} style={{width: '100%', marginTop: '10px'}} className="btn btn-primary">Add new</button>
                    </ul>
                </div> : null
            }
            <Modal showModal={modalShow} closeModal={() => setModalShow(false)}/>
        </div>
    )
}

export default Exercise;