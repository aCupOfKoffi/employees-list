import './app-info.css';

const AppInfo = ({increase, employees}) => {
    return (
        <div className="app-info">
            <h1>Employees of company N</h1>
            <h2>Number of employees: {employees}</h2>
            <h2>Get/gets premium: {increase}</h2>
        </div>
    )
}

export default AppInfo;