(()=>{"use strict";const e=()=>{const e={title:"",description:"",isDefault:!1,todoList:[],setTitle:t=>{e.title=t},setDescription:t=>{e.description=t},setDefault:t=>{e.isDefault=t},addTask:t=>{e.todoList.push(t)}};return e},t=()=>{const e={title:"",description:"",dueDate:"",priority:"Low",notes:"",status:!1,setTitle:t=>{e.title=t},setDescription:t=>{e.description=t},setDueDate:t=>{e.dueDate=t},setPriority:t=>{e.priority=t},setNotes:t=>{e.notes=t},setStatus:t=>{e.status=t}};return e};function n(t,n,l){let a=document.getElementById("container"),r=document.createElement("div");r.id="cover",r.classList.add("cover"),r.addEventListener("click",(()=>{i(r,s)})),a.appendChild(r),setTimeout((()=>{r.classList.add("backgroundFade")}),100);let s=document.createElement("div");s.setAttribute("class","projectForm");let c=document.createElement("div");c.id="formTitle","add"==t?c.innerHTML="Add Project":"edit"==t&&(c.innerHTML="Edit Project"),s.append(c);let o=document.createElement("label");o.setAttribute("for","projectTitle"),o.innerHTML="Title";let u=document.createElement("label");u.setAttribute("class","errorMessage");let m=document.createElement("input");m.setAttribute("type","text"),m.id="titleInput","edit"==t&&(m.value=n.title),s.append(o,u,m);let p=document.createElement("label");p.setAttribute("for","projectDescription"),p.innerHTML="Description";let E=document.createElement("textarea");E.setAttribute("type","text"),E.id="descriptionInput","edit"==t&&(E.value=n.description),s.append(p,E);let L=document.createElement("label");L.setAttribute("for","projectDefault"),L.id="defaultLabel",L.innerHTML="Default";let v=document.createElement("input");v.setAttribute("type","checkbox"),v.id="defaultCheckbox",s.append(L,v);let T=document.createElement("div");T.id="saveButton",T.innerHTML="Save",T.addEventListener("click",(()=>{let a=document.getElementById("titleInput").value,c=document.getElementById("descriptionInput").value,o=document.getElementById("defaultCheckbox").value;if(a){if(o&&l.forEach((e=>{e.setDefault(!1)})),"add"==t){let t=e();t.setTitle(a),t.setDescription(c),t.setDefault(o),l.push(t)}else"edit"==t&&(n.setTitle(a),n.setDefault(o),n.setDescription(c));d(l,!1),i(r,s)}else u.innerHTML="* Title required."})),s.appendChild(T),a.appendChild(s),setTimeout((()=>{s.classList.add("projectFormFade")}),100)}function i(e,t){setTimeout((()=>{e.classList.remove("backgroundFade"),t.classList.remove("projectFormFade"),setTimeout((()=>{t.remove(),e.remove()}),500)}),100)}function d(e,t){document.getElementById("sidebar");let n=document.getElementById("projectsContainer");document.getElementById("main"),n.innerHTML="",e.forEach(((i,a)=>{let r=document.createElement("div");r.setAttribute("class","project"),a==e.length-1&&r.classList.add("projectLast");let s=document.createElement("div");s.setAttribute("class","projectTitle"),s.innerHTML=i.title;let c=document.createElement("div");c.setAttribute("class","removeProjectButton"),c.innerHTML="-",c.addEventListener("click",(()=>{!function(e,t){let n=document.getElementById("main");const i=t.indexOf(e);i>-1&&t.splice(i,1),n.innerHTML="",d(t,!1)}(i,e)})),t&&i.isDefault&&l(i,e),s.addEventListener("click",(()=>{l(i,e)})),r.appendChild(s),r.appendChild(c),n.appendChild(r)}))}function l(e,t){let i=document.getElementById("main");i.innerHTML="";let d=document.createElement("div");d.id="projectTitle",d.innerHTML=e.title;let r=document.createElement("div");r.setAttribute("class","editButton"),r.innerHTML="Edit",r.addEventListener("click",(()=>{n("edit",e,t)}));let s=document.createElement("div");s.id="projectDescription",s.innerHTML=e.description;let c=document.createElement("div");c.id="tasksTitle",c.innerHTML="Tasks";let o=document.createElement("div");o.id="addTaskButton",o.innerHTML="+",o.addEventListener("click",(()=>{a("add",null,e,t)}));let u=document.createElement("div");u.id="todoList";let m=document.createElement("div");m.id="listHeader";let p=document.createElement("div");p.id="listHeaderTitle",p.innerHTML="Name";let E=document.createElement("div");E.id="listHeaderProperties";let L=document.createElement("div");L.id="listHeaderDueDate",L.innerHTML="Due Date";let v=document.createElement("div");v.id="listHeaderPriority",v.innerHTML="Priority";let T=document.createElement("div");T.id="listHeaderStatus",T.innerHTML="Status",E.append(L,v,T),m.append(p,E),u.append(m),e.todoList.forEach(((n,i)=>{let d=document.createElement("div");d.setAttribute("class","task");let r=document.createElement("div");r.setAttribute("class","taskTitle"),r.innerHTML=i+1+". "+n.title;let s=document.createElement("div");s.setAttribute("class","taskProperties");let c=document.createElement("div");c.setAttribute("class","taskDueDate"),c.innerHTML=n.dueDate;let o=document.createElement("div");o.setAttribute("class","taskPriority"),o.innerHTML=n.priority;let m=document.createElement("div");m.setAttribute("class","taskStatus"),m.innerHTML=n.status?"Complete":"Incomplete",m.style.color=n.status?"rgb(0,255,0)":"rgb(255,0,0)",m.addEventListener("mouseenter",(()=>{m.style.textDecoration="underline"})),m.addEventListener("mouseleave",(()=>{m.style.textDecoration="unset"})),m.addEventListener("click",(()=>{let i=!n.status;n.setStatus(i),m.innerHTML=n.status?"Complete":"Incomplete",l(e,t)})),s.append(c,o,m);let p=document.createElement("div");p.setAttribute("class","removeTaskButton"),p.innerHTML="-",p.addEventListener("click",(()=>{!function(e,t,n){let i=document.getElementById("taskWindow");const d=t.todoList.indexOf(e);d>-1&&t.todoList.splice(d,1),i.innerHTML="",l(t,n)}(n,e,t)})),d.addEventListener("click",(()=>{!function(e,t,n){let i=document.getElementById("taskWindow");i.innerHTML="";let d=document.createElement("div");d.id="taskTitle",d.innerHTML=e.title;let l=document.createElement("div");l.setAttribute("class","editButton"),l.innerHTML="Edit",l.addEventListener("click",(()=>{a("edit",e,t,n)}));let r=document.createElement("div");r.id="taskDueDate";let s=document.createElement("span");s.setAttribute("class","taskLabel"),s.innerHTML="Due Date: ";let c=document.createElement("span");c.innerHTML=e.dueDate,r.append(s,c);let o=document.createElement("div");o.id="taskPriority";let u=document.createElement("span");u.setAttribute("class","taskLabel"),u.innerHTML="Priority: ";let m=document.createElement("span");m.innerHTML=e.priority,o.append(u,m);let p=document.createElement("div");p.id="taskStatus";let E=document.createElement("span");E.setAttribute("class","taskLabel"),E.innerHTML="Status: ";let L=document.createElement("span");L.innerHTML=e.status?"Complete":"Incomplete",L.style.color=e.status?"rgb(0,255,0)":"rgb(255,0,0)",p.append(E,L);let v=document.createElement("div");v.id="taskDescription",v.innerHTML=e.description;let T=document.createElement("div");T.id="taskNotes";let b=document.createElement("span");b.setAttribute("class","taskLabel"),b.innerHTML="Notes:<br />";let H=document.createElement("span");H.innerHTML=e.notes,T.append(b,H),i.append(d,l,r,o,p,v,T)}(n,e,t)})),d.append(r,s,p),u.appendChild(d)})),i.append(d,r,s,c,o,u)}function a(e,n,i,d){let a=document.getElementById("container"),s=document.createElement("div");s.id="cover",s.classList.add("cover"),s.addEventListener("click",(()=>{r(s,c)})),a.appendChild(s),setTimeout((()=>{s.classList.add("backgroundFade")}),100);let c=document.createElement("div");c.setAttribute("class","taskForm");let o=document.createElement("div");o.id="formTitle","add"==e?o.innerHTML="Add Task":"edit"==e&&(o.innerHTML="Edit Task"),c.append(o);let u=document.createElement("label");u.setAttribute("for","taskTitle"),u.innerHTML="Title";let m=document.createElement("label");m.setAttribute("class","errorMessage");let p=document.createElement("input");p.setAttribute("type","text"),p.id="titleInput","edit"==e&&(p.value=n.title),c.append(u,m,p);let E=document.createElement("label");E.setAttribute("for","taskDueDate"),E.innerHTML="Due Date";let L=document.createElement("input");L.setAttribute("type","date"),L.id="dueDateInput",L.valueAsDate=new Date,"edit"==e&&(L.value=n.dueDate),c.append(E,L);let v=document.createElement("label");v.setAttribute("for","taskPriority"),v.innerHTML="Priority";let T=document.createElement("select");T.setAttribute("name","priority"),T.id="prioritySelect";let b=document.createElement("option");b.value="Low",b.innerHTML="Low";let H=document.createElement("option");H.value="Mid",H.innerHTML="Mid";let M=document.createElement("option");M.value="High",M.innerHTML="High",T.append(b,H,M),"edit"==e&&(T.value=n.priority),c.append(v,T);let k=document.createElement("label");k.setAttribute("for","taskDescription"),k.innerHTML="Description";let D=document.createElement("textarea");D.setAttribute("type","text"),D.id="descriptionInput","edit"==e&&(D.value=n.description),c.append(k,D);let y=document.createElement("label");y.setAttribute("for","taskNotes"),y.innerHTML="notes";let f=document.createElement("textarea");f.setAttribute("type","text"),f.id="notesInput","edit"==e&&(f.value=n.notes),c.append(y,f);let A=document.createElement("div");A.id="saveButton",A.innerHTML="Save",A.addEventListener("click",(()=>{let a=document.getElementById("titleInput").value,o=document.getElementById("dueDateInput").value,u=document.getElementById("prioritySelect").value,p=document.getElementById("descriptionInput").value,E=document.getElementById("notesInput").value;if(a){if("add"==e){let e=t();e.setTitle(a),e.setDueDate(o),e.setPriority(u),e.setDescription(p),e.setNotes(E),i.todoList.push(e)}else"edit"==e&&(n.setTitle(a),n.setDueDate(o),n.setPriority(u),n.setDescription(p),n.setNotes(E));l(i,d),r(s,c)}else m.innerHTML="* Title required."})),c.appendChild(A),a.appendChild(c),setTimeout((()=>{c.classList.add("taskFormFade")}),100)}function r(e,t){setTimeout((()=>{e.classList.remove("backgroundFade"),t.classList.remove("taskFormFade"),setTimeout((()=>{t.remove(),e.remove()}),500)}),100)}let s=e();s.setTitle("My Project"),s.setDescription(""),s.setDefault(!0);let c=t();c.setTitle("My Task"),c.setDescription(""),c.setDueDate("2021-01-01"),c.setPriority("Low"),c.setNotes(""),c.setStatus(!1),s.addTask(c);let o=[s];(function(e){let t=document.getElementById("container"),n=document.createElement("div");n.id="header";let i=document.createElement("div");i.id="sidebar";let d=document.createElement("div");d.id="sidebarTitle",d.innerHTML="Projects",i.appendChild(d);let l=document.createElement("div");l.id="addProjectButton",l.innerHTML="+",i.appendChild(l);let a=document.createElement("div");a.id="projectsContainer",i.appendChild(a);let r=document.createElement("div");r.id="main";let s=document.createElement("div");s.id="taskWindow",t.append(n,i,r,s)})(),function(){let e=document.getElementById("header"),t=document.createElement("div");t.id="title",t.innerHTML="Todo List",t.addEventListener("click",(()=>{location.reload()})),e.appendChild(t)}(),function(e){document.getElementById("sidebar"),document.getElementById("addProjectButton").addEventListener("click",(()=>{n("add",null,e)})),d(e,!0)}(o)})();