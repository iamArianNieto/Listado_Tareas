import "bootstrap/dist/css/bootstrap.min.css"

const Modal = () => {

    const cerrarmodal = () => {

        document.getElementById("mymodal").style.display = "none";

    };


    return (


        <div className="modal" tabIndex="-1" id="mymodal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Error</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={cerrarmodal}></button>
                    </div>
                    <div className="modal-body">
                        <p>La descripción no puede estar vacia.</p>
                    </div>
                    <div className="modal-footer">
                        <center><button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={cerrarmodal}>Cerrar</button></center>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Modal;

