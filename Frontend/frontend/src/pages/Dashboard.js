import React,{useEffect,useState} from "react"
import ExamCard from "../components/ExamCard"
import axios from "axios"
import "./Dashboard.css";
function Dashboard(){

const [exams,setExams] = useState([])

useEffect(()=>{
axios.get("http://localhost:5000/api/exams")
.then(res=>setExams(res.data))
},[])

return(

<div className="dashboard">

<h2>Available Exams</h2>

<div className="exam-list">

{exams.map(exam=>(
<ExamCard exam={exam}/>
))}

</div>

</div>

)

}

export default Dashboard