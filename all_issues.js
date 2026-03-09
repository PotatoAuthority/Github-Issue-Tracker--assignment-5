const loadAll_issues = () =>{
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())
    .then(issue => generateCard(issue.data));
}

const load_open = () =>{
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())
    .then(issue => {
        const openIssues = issue.data.filter(elem => elem.status === "open");
        console.log('open', openIssues);
        generateCard(openIssues);
    });
}

const load_closed = () =>{
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())
    .then(issue => {
        const closedIssues = issue.data.filter(elem => elem.status === "closed");
        generateCard(closedIssues);
    });
}

const generateCard = (issue_in) =>{
    const issueCounter = document.getElementById('counter');

    console.log(issue_in.data);
    const container = document.getElementById('issue_container');
    container.innerHTML = '';
    let counter = 0

    issue_in.forEach(elem =>{
        const issue_card = document.createElement('div');

        const createdDate = elem.createdAt;
        const date = new Date(createdDate);
        const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

        console.log(formattedDate); 
        issue_card.innerHTML = `
        
                    <div class="top flex justify-between items-center mb-3">
                        <img src="${elem.status==='open'? './asset/Open-Status.png' :'./asset/Closed- Status .png'}" alt="">
                        ${elem.priority === 'high' ? `<div class="badge badge-soft badge-error">HIGH</div>` : elem.priority === 'medium' ? `<div class="badge badge-soft badge-warning">MEDIUM</div>` : `<div class="badge badge-soft badge-success">LOW</div>`}
                    </div>
                    
                    <div>
                        <h2 class="font-semibold text-[14px] line-clamp-2 h-10 mb-2">${elem.title}</h2>
                        <p class="text-[12px] text-[#64748B] line-clamp-2 mb-3">${elem.description}</p>
                    </div>
                    
                    <div class="flex flex-wrap gap-1">${elem.labels.map(label => `<div class="badge badge-outline badge-error text-[12px] font-medium p-1">${label}</div>`).join("")}</div>

                    <div>
                    <hr class="mt-4 mb-4">
                    <p class="text-[12px] text-[#64748B] line-clamp-2 mb-3">#1 by ${elem.author}</p>
                    <p class="text-[12px] text-[#64748B] line-clamp-2 ">${formattedDate}</p>
                    </div>
                    
                   
        `;
        // issue_card.classList.add('border-2');
        issue_card.classList.add('p-[16px]');
        issue_card.classList.add('rounded-[4px]');
        issue_card.classList.add('shadow-sm');
        if(elem.status ==='open'){
            issue_card.classList.add('border-t-4', 'border-t-[#00A96E]');
        }
        else{
            issue_card.classList.add('border-t-4', 'border-t-[#A855F7]');
        }
        issue_card.classList.add('flex', 'flex-col', 'justify-between');
        container.append(issue_card);
        counter++;

    });
    issueCounter.innerText = counter;
}

const buttonToggleHandler = (id) => {
    const buttons = document.getElementsByClassName('issue-btn');
    for (let btn of buttons){
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-outline');
    }

    const activeBtn = document.getElementById(id);
    activeBtn.classList.remove('btn-outline');
    activeBtn.classList.add('btn-primary');
}

buttonToggleHandler('btn-all');
loadAll_issues();