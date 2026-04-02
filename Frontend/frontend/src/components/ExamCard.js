import React from "react";
import "./ExamCard.css";
function ExamCard({exam,startExam}){

return(

<div className="exam-card">

<h3>{exam.title}</h3>
<p>{exam.description}</p>
<p>Duration : {exam.duration} mins</p>

<button onClick={()=>startExam(exam._id)}>
Start Exam
</button>

</div>

)

}

export default ExamCard