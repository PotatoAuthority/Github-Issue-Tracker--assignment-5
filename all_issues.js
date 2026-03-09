const loadAll_issues = () =>{
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())
    .then(issue => generateCard(issue));
}

const load_open = () =>{

}

const generateCard = (issue_in) =>{
    const issueCounter = document.getElementById('counter');

    console.log(issue_in.data);
    const container = document.getElementById('issue_container');
    container.innerHTML = '';
    let counter = 0

    issue_in.data.forEach(elem =>{
        const issue_card = document.createElement('div');

        const createdDate = elem.createdAt;
        const date = new Date(createdDate);
        const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

        console.log(formattedDate); // Output: "1/15/2024"
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

loadAll_issues();