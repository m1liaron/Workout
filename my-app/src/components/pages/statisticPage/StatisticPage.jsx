import Statistic from "../../statistic/Statistic";

const StatisticPage = ({setShowBar}) => {
    return (
        <div style={{background: '#fff'}}>
            <h1>Statistic</h1>
            <Statistic setShowBar={setShowBar}/>
        </div>
    )
}

export default StatisticPage;