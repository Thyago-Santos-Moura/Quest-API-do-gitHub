const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user){
        this.userProfile.innerHTML = `
        <div class='info'>
            <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
            <div class='data'>
                <h1>${user.name ?? "Não possui nome cadastrado 😥"}</h1>
                <p>${user.bio ?? "não possui bio cadastrado 😥"}</p>
                <br>
                <p>👥 Seguidores: ${user.followers}</p>
                <p>👍 Seguindo: ${user.following}</p>
            </div>
        </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}<div><span>🍴${repo.forks_count}</span><span>⭐${repo.stargazers_count}</span><span>👀${repo.watchers_count}</span><span>👨‍💻${repo.language ?? "Sem linguagem"}</span></div></a></li>`
        )

        if(user.repositories.length > 0){
            this.userProfile.innerHTML += `
            <div class="repositories section">
                <h2>Repositórios</h2>
                <ul>${repositoriesItens}</ul>
            </div>
            `
        }

        let eventsItens = ''
        user.events.forEach(events => {
            eventsItens += `<li>${events.repo.name}&nbsp;&nbsp;&nbsp;<span>-${events.type == "PushEvent" ? events.payload.commits[0].message : "CreateEvent" }</span></li>`
        })
        
        if(user.events.length > 0){
            this.userProfile.innerHTML += `
            <div class="events">
                <h2>Eventos</h2>
                <ul>${eventsItens}</ul>
            </div>
            `
        }

    },
    renderNotFound(){
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export {screen}