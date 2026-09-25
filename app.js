let pool=[], current=0, score=0, answered=false, timer=null, seconds=30, quizQuestions=[];
const $=id=>document.getElementById(id);
function filtered(){
 const s=$("subject").value,d=$("difficulty").value,c=$("company").value;
 return QUESTION_BANK.filter(q=>(s==="All Subjects"||q.subject===s)&&(d==="All Levels"||q.difficulty===d)&&(c==="All Companies"||q.company===c));
}
function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function supportive(ok){
 return ok ? ["Correct! Keep going — you're building placement confidence.","Great work! One more step toward a stronger score.","Nice! Your preparation is paying off."][current%3]
 : ["Don't worry — mistakes are part of preparation. Read the explanation and try the next one.","Keep going! One wrong answer does not define your performance.","Good attempt. Note the concept and use it on the next question."][current%3];
}
function start(){
 let f=filtered(); if(!f.length){alert("No questions match these filters.");return}
 let n=+$("count").value; quizQuestions=shuffle(f).slice(0,n); current=0;score=0;
 $("quiz").classList.remove("hidden");$("result").classList.add("hidden");$("stats").innerHTML=`<span>${f.length.toLocaleString()} matching questions</span><span>1,200+ per subject</span><span>${companiesCount()} company styles</span>`;
 show();
}
function companiesCount(){return new Set(QUESTION_BANK.map(q=>q.company)).size}
function show(){
 answered=false;seconds=30;clearInterval(timer);
 const q=quizQuestions[current];$("progress").textContent=`Question ${current+1} / ${quizQuestions.length}`;$("timer").textContent=`⏱ ${seconds}s`;
 $("bar").style.width=((current)/quizQuestions.length*100)+"%";$("qSubject").textContent=q.subject;$("qDiff").textContent=q.difficulty;$("qCompany").textContent=q.company+" style";
 $("question").textContent=q.question;$("feedback").innerHTML="";
 $("options").innerHTML=q.options.map(o=>`<button class="option">${o}</button>`).join("");
 document.querySelectorAll(".option").forEach(b=>b.onclick=()=>answer(b));
 $("next").textContent=current===quizQuestions.length-1?"Finish Quiz":"Next →"; $("next").disabled=true;
 timer=setInterval(()=>{seconds--; $("timer").textContent=`⏱ ${seconds}s`; if(seconds<=0){clearInterval(timer);autoWrong()}},1000);
}
function autoWrong(){if(answered)return;answered=true;$("feedback").innerHTML=`<div class="feedback">⏰ Time's up. ${supportive(false)}<br><br><b>Correct answer:</b> ${quizQuestions[current].answer}<br>${quizQuestions[current].explanation}</div>`;document.querySelectorAll(".option").forEach(b=>b.disabled=true);$("next").disabled=false}
function answer(btn){
 if(answered)return;answered=true;clearInterval(timer);let q=quizQuestions[current],ok=btn.textContent===q.answer;
 if(ok){score++;btn.classList.add("correct")}else{btn.classList.add("wrong")}
 document.querySelectorAll(".option").forEach(b=>{b.disabled=true;if(b.textContent===q.answer)b.classList.add("correct")});
 $("feedback").innerHTML=`<div class="feedback"><b>${supportive(ok)}</b><br><br><b>Correct answer:</b> ${q.answer}<br>${q.explanation}</div>`;$("next").disabled=false;
}
$("next").onclick=()=>{if(!answered)return;if(current<quizQuestions.length-1){current++;show()}else finish()};
function finish(){
 clearInterval(timer);$("quiz").classList.add("hidden");$("result").classList.remove("hidden");
 let pct=Math.round(score/quizQuestions.length*100);let msg=pct>=80?"Excellent placement practice!":pct>=60?"Good effort — review the missed concepts and try again.":"Keep practicing. Every attempt helps improve your speed and accuracy.";
 $("result").innerHTML=`<h2>Quiz Complete 🎉</h2><p>${score} / ${quizQuestions.length}</p><h2>${pct}%</h2><p>${msg}</p><p>Subjects, difficulty and company styles were mixed according to your selections.</p><button onclick="location.reload()">Back to Quiz Setup</button>`;
}
$("start").onclick=start;
$("themeBtn").onclick=()=>document.body.classList.toggle("dark");

const companies=["TCS", "Infosys", "Wipro", "Accenture", "Cognizant", "Capgemini", "HCLTech", "Tech Mahindra", "LTIMindtree", "Mphasis", "Persistent Systems", "Hexaware", "Coforge", "Birlasoft", "DXC Technology", "IBM", "Oracle", "SAP", "Microsoft", "Google", "Amazon", "Cisco", "Deloitte", "EY", "PwC", "KPMG", "Genpact", "CGI", "Virtusa", "NTT DATA", "UST", "L&T Technology Services", "KPIT", "Zensar", "Sonata Software", "Zoho", "Freshworks", "Thoughtworks", "Publicis Sapient", "Nagarro", "EPAM", "Qualcomm", "Intel", "NVIDIA", "Adobe", "Salesforce", "Apple", "Meta", "Samsung", "PayPal", "Uber", "Walmart Global Tech", "Flipkart", "PhonePe", "Razorpay", "Swiggy", "Zomato", "Meesho"];
