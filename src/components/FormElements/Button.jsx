import './button.scss';

const Button = ({text, btnType, icon, ...rest}) => {
    
    var btnClass;

    if (btnType==="err") {
        btnClass = "btn-err";
    } else {
        btnClass = "btn-default";
    }

    return (
        
        <button className={btnClass} {...rest}>
            {icon && <i className={"fas fa-" + icon}></i>} {text}
        </button>
        
    )

}

export default Button;