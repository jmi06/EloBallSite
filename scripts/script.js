let highToLow;

getDivision('all')


function getDivision(division) {









    fetch('https://falling-frog-ec91.jmi06.workers.dev')
        .then(response => {
            if (!response.ok) {
                throw new Error('Response was not ok')

            }
            return response.json();
        })

        .then(data => {

            generate_table(division, data)

        })

        .catch(error => {
            console.error('Error: ', error)
        })



       
}





function generate_table(division, data) {
    // Race data is "All" if its just all driver standings





        orderData = data[division]
        
        const table = document.getElementById('data-table')

        const tableHead = document.getElementById("table-head");
        const tableBody = document.getElementById("table-body");

        tableHead.innerText = ""

        const headers = ['Pos', 'Team', 'Elo', 'Games', 'Record']
        const header_stat = ["team_name", "elo", 'games', "record"]

        // Do Playoff points and position separate




        headers.forEach(header => {
            const th = document.createElement("th");
            th.textContent = header;


            tableHead.appendChild(th);
        });

        let new_stat;
        tableBody.innerText = ""
        Object.entries(orderData).forEach((team, index) => {
            console.log(team)
            const tr = document.createElement("tr");

            const positionTd = document.createElement("td");
            positionTd.textContent = index + 1; // Position starts from 1, not 0
            tr.appendChild(positionTd);

            header_stat.forEach(stat => {
                if(stat == 'team_name'){
                    new_stat = team[0]
                }
                if(stat == 'elo'){
                    new_stat = team[1]['elo']
                }

                if (stat == "games") {
                    new_stat = team[1]['games'].length


                } 
                if (stat == "record"){
                    if(team[1]['record']){

                        new_stat = team[1]['record'].split('-')
                        console.log(new_stat)
                        new_stat = new_stat[0] / ( Number(new_stat[0]) + Number(new_stat[1]))
                        new_stat = new_stat.toFixed(3);

                        if(new_stat < 1){
                            new_stat = new_stat.slice(1)
                        }


                    } else{
                        new_stat = '--'
                    }
                } 
               
                const td = document.createElement("td");
                td.textContent = new_stat || ''; // Handle undefined properties
                tr.appendChild(td);
            });


            tableBody.appendChild(tr);


        });




    } 



