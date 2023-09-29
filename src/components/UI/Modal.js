import classes from'./Modal.module.css';
import ReactDOM from 'react-dom';

const BackDrop=(props)=>{
    return <div className={classes.backdrop} onClick={props.onClose} />
}

const ModalOverlay=(props)=>{
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    )
}

const pElement=document.getElementById('overlays')

const Modal=(props)=>{
    return (
        <>
            {ReactDOM.createPortal(<BackDrop onClose={props.onClose}/>,pElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,pElement)}
        </>
    )
}

export default Modal;