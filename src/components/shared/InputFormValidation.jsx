import './InputFormValidation.css'

export default function InputFormValidation({value, onChange, type, rules}){

    return(
        <>
            <input type={type} value={value} onChange={onChange} className="form-control"></input>
            {rules && value.length>0? <ul className="normasRegistro" role="alert">            
            {rules.map(rule=> {                
                return(<li className='norma'>{rule.fn(value)?'✅':'❌'}{rule.text}</li>)                
            })}
        </ul>:''}
            
        </>
    )
}