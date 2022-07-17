const LoadingPage = () => {
    return (
        <div style={{fontSize:"4em",position:"absolute",top:"0px",bottom:"0px",right:"0px",left:"0px"}}  className="d-flex flex-row align-items-center justify-content-center">
             <div style={{fontSize:"3em"}} className={`spinner-grow text-success spinner-grow-lg`} role="status"></div>
        </div>
    )
}

export default LoadingPage;