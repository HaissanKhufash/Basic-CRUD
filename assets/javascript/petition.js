export default function requestingData(){
    // Components
    const $form = document.querySelector('.form'),
    $formTitle = document.querySelector('.form-title'),
    $template = document.querySelector('.template-t-content').content,
    // Store data in dynamic way, no saturating the document
    $fragment = document.createDocumentFragment();

    // DISPLAYING DATA FROM REST API
    const getAll = async e => {
        try{
            const res = await fetch('http://localhost:5000/league'),
            json = await res.json();

            if(!res.ok) throw {status: res.status, statusText: res.statusText}

            const $tbody = document.querySelector('.table-body')

            // ASSIGNING TEMPLATE ELEMENTS TO TBODY AND GIVING THEM SOME VALUES - AND APPLYING DATASETS TO BUTTONS
            json.forEach(el => {
                const clone = document.importNode($template, true),
                $league = clone.querySelector('.league'),
                $champion = clone.querySelector('.champion'),
                $edit = clone.querySelector('.edit'),
                $delete = clone.querySelector('.delete');

                $league.textContent = el.name
                $champion.textContent = el.champion
                $edit.dataset.id = el.id
                $edit.dataset.league = el.name
                $edit.dataset.champion = el.champion
                $delete.dataset.id = el.id

                $fragment.append(clone)
            })

            $tbody.append($fragment);

        } 
        catch(err){
            const $error = document.createElement('p'),
            message = `Error ${err.status} has happened. Therefore: ${err.statusText}`,
            errorMessage = document.createTextNode(message);

            $error.append(errorMessage)

            $form.insertAdjacentElement('afterend', $error)
        }
    }

    getAll() // Reading data from REST API

    //  VALIDATE CREATING ITEMS OR UPDATE THEM.
    const formAction = async e => {
        if(e.target === $form){
            e.preventDefault()

            if(!e.target.id.value){
                // POST
                try{
                    const options = {
                        method: 'POST', 
                        headers: {'Content-Type': 'application/json; charset=utf-8'},
                        body: JSON.stringify({
                            name: `${$form.league.value}`,
                            champion: `${$form.champion.value}`
                        })
                    },  
                    res = await fetch('http://localhost:5000/league', options)
        
                    if(!res.ok) throw {status: res.status, statusText: res.statusText}

                    location.reload()
        
                } 
                catch(err){
                    const $error = document.createElement('p'),
                    message = `Error ${err.status} has happened. Therefore: ${err.statusText}`,
                    errorMessage = document.createTextNode(message);
        
                    $error.append(errorMessage)
        
                    $form.insertAdjacentElement('afterend', $error)
                }

            }
            else{
                // PUT
                try{
                    const options = {
                        method: 'PUT', 
                        headers: {'Content-Type': 'application/json; charset=utf-8'},
                        body: JSON.stringify({
                            name: `${$form.league.value}`,
                            champion: `${$form.champion.value}`
                        })
                    },  
                    res = await fetch(`http://localhost:5000/league/${e.target.id.value}`, options)
        
                    if(!res.ok) throw {status: res.status, statusText: res.statusText}

                    location.reload()
        
                } 
                catch(err){
                    const $error = document.createElement('p'),
                    message = `Error ${err.status} has happened. Therefore: ${err.statusText}`,
                    errorMessage = document.createTextNode(message);
        
                    $error.append(errorMessage)
        
                    $form.insertAdjacentElement('afterend', $error)
                }
            }
        }
    }

    document
    .addEventListener('submit', formAction)

    const tbuttonAction = async e => {

        if(e.target.matches('.table-body .edit')){
            // Copy data to form fields
            try{
                $formTitle.textContent = 'Updating items'
                $form.id.value = e.target.dataset.id
                $form.league.value = e.target.dataset.league
                $form.champion.value = e.target.dataset.champion
            } 
            catch(err){
                const $error = document.createElement('p'),
                message = `An error has happened.`,
                errorMessage = document.createTextNode(message);
    
                $error.append(errorMessage)
    
                $form.insertAdjacentElement('afterend', $error)
            }

        }
        else if(e.target.matches('.table-body .delete')){
            // DELETE
            try{
                const options = {
                    method: 'DELETE'
                },  
                res = await fetch(`http://localhost:5000/league/${e.target.dataset.id}`, options)
    
                if(!res.ok) throw {status: res.status, statusText: res.statusText}

                location.reload()
    
            } 
            catch(err){
                const $error = document.createElement('p'),
                message = `Error ${err.status} has happened. Therefore: ${err.statusText}`,
                errorMessage = document.createTextNode(message);
    
                $error.append(errorMessage)
    
                $form.insertAdjacentElement('afterend', $error)
            }
        }
    }
    
    document
    .addEventListener('click', tbuttonAction)
    
}