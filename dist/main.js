(()=>{"use strict";const e=()=>{const e={title:"",description:"",isDefault:!1,todoList:[],setTitle:t=>{e.title=t},setDescription:t=>{e.description=t},setDefault:t=>{e.isDefault=t},addTask:t=>{e.todoList.push(t)}};return e},t=()=>{const e={title:"",description:"",dueDate:"2021-01-01",priority:"Low",notes:"",status:!1,setTitle:t=>{e.title=t},setDescription:t=>{e.description=t},setDueDate:t=>{e.dueDate=t},setPriority:t=>{e.priority=t},setNotes:t=>{e.notes=t},setStatus:t=>{e.status=t}};return e};function n(e,t,n){let i=document.getElementById("taskWindow");i.innerHTML="";let l=document.createElement("div");l.id="taskTitle",l.innerHTML=e.title;let a=document.createElement("div");a.setAttribute("class","editButton"),a.innerHTML="Edit",a.addEventListener("click",(()=>{d("edit",e,t,n)}));let r=document.createElement("div");r.id="taskDueDate";let s=document.createElement("span");s.setAttribute("class","taskLabel"),s.innerHTML="Due Date: ";let c=document.createElement("span");c.innerHTML=e.dueDate,r.append(s,c);let o=document.createElement("div");o.id="taskPriority";let u=document.createElement("span");u.setAttribute("class","taskLabel"),u.innerHTML="Priority: ";let m=document.createElement("span");m.innerHTML=e.priority,o.append(u,m);let p=document.createElement("div");p.id="taskStatus";let E=document.createElement("span");E.setAttribute("class","taskLabel"),E.innerHTML="Status: ";let L=document.createElement("span");L.innerHTML=e.status?"Complete":"Incomplete",L.style.color=e.status?"rgb(0,255,0)":"rgb(255,0,0)",p.append(E,L);let v=document.createElement("div");v.id="taskDescription",v.innerHTML=e.description;let T=document.createElement("div");T.id="taskNotes";let b=document.createElement("span");b.setAttribute("class","taskLabel"),b.innerHTML="Notes:<br />";let H=document.createElement("span");H.innerHTML=e.notes,T.append(b,H),i.append(l,a,r,o,p,v,T)}function i(t,n,i){let d=document.getElementById("container"),a=document.createElement("div");a.id="cover",a.classList.add("cover"),a.addEventListener("click",(()=>{l(a,o)})),d.appendChild(a),setTimeout((()=>{a.classList.add("backgroundFade")}),100);let o=document.createElement("div");o.setAttribute("class","projectForm");let u=document.createElement("div");u.id="formTitle","add"==t?u.innerHTML="Add Project":"edit"==t&&(u.innerHTML="Edit Project"),o.append(u);let m=document.createElement("label");m.setAttribute("for","projectTitle"),m.innerHTML="Title";let p=document.createElement("label");p.setAttribute("class","errorMessage");let E=document.createElement("input");E.setAttribute("type","text"),E.id="titleInput","edit"==t&&(E.value=n.title),o.append(m,p,E);let L=document.createElement("label");L.setAttribute("for","projectDescription"),L.innerHTML="Description";let v=document.createElement("textarea");v.setAttribute("type","text"),v.id="descriptionInput","edit"==t&&(v.value=n.description),o.append(L,v);let T=document.createElement("label");T.setAttribute("for","projectDefault"),T.id="defaultLabel",T.innerHTML="Default";let b=document.createElement("input");b.setAttribute("type","checkbox"),b.id="defaultCheckbox",o.append(T,b);let H=document.createElement("div");H.id="saveButton",H.innerHTML="Save",H.addEventListener("click",(()=>{let d=document.getElementById("titleInput").value,u=document.getElementById("descriptionInput").value,m=document.getElementById("defaultCheckbox").value;if(d){if(m&&i.forEach((e=>{e.setDefault(!1)})),"add"==t){let t=e();t.setTitle(d),t.setDescription(u),t.setDefault(m),i.push(t)}else"edit"==t&&(n.setTitle(d),n.setDefault(m),n.setDescription(u),r(n,i));s(i,!1),l(a,o),c(i)}else p.innerHTML="* Title required."})),o.appendChild(H),d.appendChild(o),setTimeout((()=>{o.classList.add("projectFormFade")}),100)}function d(e,i,d,l){let s=document.getElementById("container"),o=document.createElement("div");o.id="cover",o.classList.add("cover"),o.addEventListener("click",(()=>{a(o,u)})),s.appendChild(o),setTimeout((()=>{o.classList.add("backgroundFade")}),100);let u=document.createElement("div");u.setAttribute("class","taskForm");let m=document.createElement("div");m.id="formTitle","add"==e?m.innerHTML="Add Task":"edit"==e&&(m.innerHTML="Edit Task"),u.append(m);let p=document.createElement("label");p.setAttribute("for","taskTitle"),p.innerHTML="Title";let E=document.createElement("label");E.setAttribute("class","errorMessage");let L=document.createElement("input");L.setAttribute("type","text"),L.id="titleInput","edit"==e&&(L.value=i.title),u.append(p,E,L);let v=document.createElement("label");v.setAttribute("for","taskDueDate"),v.innerHTML="Due Date";let T=document.createElement("input");T.setAttribute("type","date"),T.id="dueDateInput",T.valueAsDate=new Date,"edit"==e&&(T.value=i.dueDate),u.append(v,T);let b=document.createElement("label");b.setAttribute("for","taskPriority"),b.innerHTML="Priority";let H=document.createElement("select");H.setAttribute("name","priority"),H.id="prioritySelect";let M=document.createElement("option");M.value="Low",M.innerHTML="Low";let k=document.createElement("option");k.value="Mid",k.innerHTML="Mid";let y=document.createElement("option");y.value="High",y.innerHTML="High",H.append(M,k,y),"edit"==e&&(H.value=i.priority),u.append(b,H);let D=document.createElement("label");D.setAttribute("for","taskDescription"),D.innerHTML="Description";let f=document.createElement("textarea");f.setAttribute("type","text"),f.id="descriptionInput","edit"==e&&(f.value=i.description),u.append(D,f);let g=document.createElement("label");g.setAttribute("for","taskNotes"),g.innerHTML="Notes";let A=document.createElement("textarea");A.setAttribute("type","text"),A.id="notesInput","edit"==e&&(A.value=i.notes),u.append(g,A);let I=document.createElement("div");I.id="saveButton",I.innerHTML="Save",I.addEventListener("click",(()=>{let s=document.getElementById("titleInput").value,m=document.getElementById("dueDateInput").value,p=document.getElementById("prioritySelect").value,L=document.getElementById("descriptionInput").value,v=document.getElementById("notesInput").value;if(s){if("add"==e){let e=t();e.setTitle(s),e.setDueDate(m),e.setPriority(p),e.setDescription(L),e.setNotes(v),d.todoList.push(e)}else"edit"==e&&(i.setTitle(s),i.setDueDate(m),i.setPriority(p),i.setDescription(L),i.setNotes(v),n(i,d,l));r(d,l),a(o,u),c(l)}else E.innerHTML="* Title required."})),u.appendChild(I),s.appendChild(u),setTimeout((()=>{u.classList.add("taskFormFade")}),100)}function l(e,t){setTimeout((()=>{e.classList.remove("backgroundFade"),t.classList.remove("projectFormFade"),setTimeout((()=>{t.remove(),e.remove()}),500)}),100)}function a(e,t){setTimeout((()=>{e.classList.remove("backgroundFade"),t.classList.remove("taskFormFade"),setTimeout((()=>{t.remove(),e.remove()}),500)}),100)}function r(e,t){let l=document.getElementById("main");l.innerHTML="";let a=document.createElement("div");a.id="projectTitle",a.innerHTML=e.title;let s=document.createElement("div");s.setAttribute("class","editButton"),s.innerHTML="Edit",s.addEventListener("click",(()=>{i("edit",e,t)}));let o=document.createElement("div");o.id="projectDescription",o.innerHTML=e.description;let u=document.createElement("div");u.id="tasksTitle",u.innerHTML="Tasks";let m=document.createElement("div");m.id="addTaskButton",m.innerHTML="+",m.addEventListener("click",(()=>{d("add",null,e,t)}));let p=document.createElement("div");p.id="todoList";let E=document.createElement("div");E.id="listHeader";let L=document.createElement("div");L.id="listHeaderTitle",L.innerHTML="Name";let v=document.createElement("div");v.id="listHeaderProperties";let T=document.createElement("div");T.id="listHeaderDueDate",T.innerHTML="Due Date";let b=document.createElement("div");b.id="listHeaderPriority",b.innerHTML="Priority";let H=document.createElement("div");H.id="listHeaderStatus",H.innerHTML="Status",v.append(T,b,H),E.append(L,v),p.append(E),e.todoList.forEach(((i,d)=>{let l=document.createElement("div");l.setAttribute("class","task");let a=document.createElement("div");a.setAttribute("class","taskTitle"),a.innerHTML=d+1+". "+i.title;let s=document.createElement("div");s.setAttribute("class","taskProperties");let o=document.createElement("div");o.setAttribute("class","taskDueDate"),o.innerHTML=i.dueDate;let u=document.createElement("div");u.setAttribute("class","taskPriority"),u.innerHTML=i.priority;let m=document.createElement("div");m.setAttribute("class","taskStatus"),m.innerHTML=i.status?"Complete":"Incomplete",m.style.color=i.status?"rgb(0,255,0)":"rgb(255,0,0)",m.addEventListener("mouseenter",(()=>{m.style.textDecoration="underline"})),m.addEventListener("mouseleave",(()=>{m.style.textDecoration="unset"})),m.addEventListener("click",(()=>{let n=!i.status;i.setStatus(n),m.innerHTML=i.status?"Complete":"Incomplete",r(e,t)})),s.append(o,u,m);let E=document.createElement("div");E.setAttribute("class","removeTaskButton"),E.innerHTML="-",E.addEventListener("click",(()=>{!function(e,t,n){let i=document.getElementById("taskWindow");const d=t.todoList.indexOf(e);d>-1&&t.todoList.splice(d,1),i.innerHTML="",r(t,n),c(n)}(i,e,t)})),l.addEventListener("click",(()=>{n(i,e,t)})),l.append(a,s,E),p.appendChild(l)})),l.append(a,s,o,u,m,p)}function s(e,t){document.getElementById("sidebar");let n=document.getElementById("projectsContainer");document.getElementById("main"),n.innerHTML="",e.forEach(((i,d)=>{let l=document.createElement("div");l.setAttribute("class","project"),d==e.length-1&&l.classList.add("projectLast");let a=document.createElement("div");a.setAttribute("class","projectTitle"),a.innerHTML=i.title;let o=document.createElement("div");o.setAttribute("class","removeProjectButton"),o.innerHTML="-",o.addEventListener("click",(()=>{!function(e,t){let n=document.getElementById("main");const i=t.indexOf(e);i>-1&&t.splice(i,1),n.innerHTML="",s(t,!1),c(t)}(i,e)})),t&&i.isDefault&&r(i,e),a.addEventListener("click",(()=>{r(i,e)})),l.appendChild(a),l.appendChild(o),n.appendChild(l)}))}function c(e){localStorage.setItem("projects",JSON.stringify(e)),0==e.length&&localStorage.clear()}!function(){let e=document.getElementById("container"),t=document.createElement("div");t.id="header";let n=document.createElement("a");n.id="title",n.innerHTML="Todo List",n.addEventListener("click",(()=>{location.reload()})),t.append(n);let i=document.createElement("div");i.id="sidebar";let d=document.createElement("div");d.id="sidebarTitle",d.innerHTML="Projects",i.appendChild(d);let l=document.createElement("div");l.id="addProjectButton",l.innerHTML="+",i.appendChild(l);let a=document.createElement("div");a.id="projectsContainer",i.appendChild(a);let r=document.createElement("div");r.id="main";let s=document.createElement("div");s.id="taskWindow",e.append(t,i,r,s)}(),function(){let n=[];if(localStorage.getItem("projects"))n=JSON.parse(localStorage.getItem("projects"));else{let i=e();i.setTitle("My Project");let d=t();d.setTitle("My Task"),i.addTask(d),n.push(i)}!function(e){document.getElementById("sidebar"),document.getElementById("addProjectButton").addEventListener("click",(()=>{i("add",null,e)})),s(e,!0)}(n)}()})();