export default function ErrorMessage({text}){
	return text ? <div style={{color:'red'}}>{text}</div>:null;
}