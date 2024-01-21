const repobox=document.getElementById('repo-box')

let usernamevalue;
let perpage=10,totalpages=0;


function submitform()
{
    const username=document.getElementById("username");
    usernamevalue=username.value
    datafetchfirsttime()
}

async function datafetchfirsttime()
{
    
    
        document.getElementById("loader-container").style.display = "flex";
        let completedata = await fetch(`https://api.github.com/users/${usernamevalue}/repos`);
        let completedatafetched = await completedata.json();


        document.getElementById("loader-container").style.display = "none";

        totalpages = Math.ceil(completedatafetched.length / perpage);

        let data = await getcustomizeddata(usernamevalue, perpage, 1);

        repobox.style.display = 'block';

        displayrepository(data);
        SelectDropdown(totalpages);
    
    
}

async function selectdata()
{
    var PageSelect = document.getElementById('pageSelect');
    var selectedPage = parseInt(PageSelect.value, 10);
    
        document.getElementById("loader-container").style.display = "flex";
        let fetch_customized_data = await getcustomizeddata(usernamevalue, perpage, selectedPage)
        document.getElementById("loader-container").style.display = "none";
        displayrepository(fetch_customized_data)

}

async function getcustomizeddata(username, perpage, page) {
   
    var apiUrl = `https://api.github.com/users/${username}/repos?per_page=${perpage}&page=${page}`;

    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Error fetching GitHub repositories:', error);
            return [];
        });
}


function displayrepository(repo)
{
        repobox.innerHTML = ''; 

        repo.map((item) => {
        let heading = document.createElement("h1");
        let div = document.createElement("div");
        var description = document.createElement('p');
        var language = document.createElement("h3");
        var viewbutton = document.createElement("button");

        div.className = 'dynamic-div';
        language.className = 'language';
        viewbutton.className = 'viewbutton'


        description.textContent = item.description;
        language.textContent = item.language;
        heading.textContent = item.name;
        viewbutton.textContent = 'View Repository'

        div.appendChild(heading);
        div.appendChild(language);
        div.appendChild(description);
        div.appendChild(viewbutton);

        viewbutton.addEventListener('click', function () {
            window.open(item.svn_url, '_blank');
        });

        repobox.appendChild(div);
    }
    )

}

function SelectDropdown(totalPages) {
    var pageSelect = document.getElementById('pageSelect');
    pageSelect.innerHTML = '';

    for (var i = 1; i <= totalPages; i++) {
        var option = document.createElement('option');
        option.value = i;
        option.textContent = 'Page ' + i;
        pageSelect.appendChild(option);
    }

   
}


