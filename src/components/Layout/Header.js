import Image from '../../Assets/picture.png';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header=(props)=>{
    return (
        <>
            <header className={classes.header}>
                <h1>Med-Store</h1>
                <HeaderCartButton onClick={props.onShow}/>
            </header>
            <div className={classes['main-image']}>
                <img src={Image} alt='Delicious Food!'/>
            </div>
        </>
    )
}

export default Header;