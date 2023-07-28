import './FinishWorkout.css'
import StrongMan from '../../assets/img/strong_men.png'

const FinishWorkout = ({ time }) => {

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);

    return `${hours.toString().padStart(2)} годин${minutes.toString().padStart(2)} хвилини ${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <div className='container'>
        <div style={{ display: 'flex' }}>
          <img src={StrongMan} alt='Man' style={{ width: '150px' }} />
          <div
            style={{
              width: '8rem',
              height: '5.5rem',
              fill: '#FFF',
              filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
              background: '#fff',
              borderRadius: '100%',
            }}
          >
            <h1 style={{ marginTop: '20px' }}>Вітаю!</h1>
          </div>
        </div>
        <div
          style={{
            width: '244px',
            border: '1px solid #A9D6FF',
            background: '#FFF',
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
            padding: '10px',
            borderRadius: '10px',
          }}
        >
          <h4>
            Ви займались {formatTime(time)}
          </h4>
        </div>
      </div>
    </>
  )
}

export default FinishWorkout;