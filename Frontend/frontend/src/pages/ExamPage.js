import React,{useEffect,useState} from "react"
import axios from "axios"
import "./ExamPage.css";
function ExamPage(){

const [questions,setQuestions] = useState([])
const [answers,setAnswers] = useState({})

useEffect(()=>{
axios.get("/api/questions")
.then(res=>setQuestions(res.data))
},[])

const selectAnswer=(qid,option)=>{
setAnswers({...answers,[qid]:option})
}

return(

<div>

<h2>Exam</h2>

{questions.map(q=>(
<div key={q._id}>

<h3>{q.question}</h3>

{q.options.map(opt=>(
<button onClick={()=>selectAnswer(q._id,opt)}>
{opt}
</button>
))}

</div>
))}

<button>Submit</button>

</div>

)

}

export default ExamPage