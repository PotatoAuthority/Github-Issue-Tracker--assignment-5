const loadAll_issues = () =>{
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())
    .then(issue => generateCard(issue));
}

const generateCard = (issue_in) =>{
    console.log(issue_in.data);
    const container = document.getElementById('issue_container');
    container.innerHTML = '';

    issue_in.data.forEach(elem =>{
        const issue_card = document.createElement('div');
        issue_card.innerHTML = `
        <div class="top flex justify-between items-center">
                        <img src="./asset/Open-Status.png" alt="">
                        <div class="badge badge-error">HIGH</div>
                    </div>
                    <id>${elem.id}</id>
                    <h2>${elem.title}</h2>
                    <p>${elem.description}</p>
                    <p>${elem.status}</p>
        `;
        issue_card.classList.add('border-2');
        container.append(issue_card);

    })
}

loadAll_issues();