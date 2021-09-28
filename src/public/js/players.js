Vue.component('Players',{
    template: /*html*/`
        <div class="pa-15">
            <v-row>
                <v-col cols="12" sm="12" md="5" lg="4" xl="4">
                    <v-card class="pa-5 rounded-xl mb-8 box-card-search" color="deep-purple accent-3" dark>
                        <v-row align="center" justify="center">
                            <v-col cols="12" sm="12" md="12" class="text-center">
                                <h1> Search FIFA21 </h1>
                                <p> You can search to name or team </p>
                            </v-col>
                        </v-row>
                        <v-row align="center" justify="center">
                            <v-col cols="12" sm="12" md="12">
                                <v-autocomplete
                                    v-model="page"
                                    :items="pagesPlayers"
                                    item-color="black"
                                    label="Page"
                                    rounded
                                    filled                                    
                                    hide-details
                                    @change="countPagesPlayers"
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
                        <v-row align="center" justify="center">
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field
                                    v-model="team"
                                    autocomplete="off"
                                    label="Search name team"
                                    placeholder="Press Enter to Search"
                                    rounded
                                    filled
                                    append-icon="mdi-account-group"
                                    hide-details
                                    @keypress.enter="teams"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row align="center" justify="center">
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field
                                    v-model="search"
                                    autocomplete="off"
                                    label="Search name players"
                                    placeholder="Press Enter to Search"
                                    rounded
                                    filled
                                    append-icon="mdi-account"
                                    hide-details
                                    @keypress.enter="players"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row align="center" justify="center">
                            <v-col cols="12" sm="12" md="12">
                                <v-select
                                    v-model="order"
                                    :items="orderBy"
                                    item-color="black"
                                    label="Order by"
                                    rounded
                                    filled
                                    @change="orderByList"
                                    hide-details
                                ></v-select>
                            </v-col>
                        </v-row>
                    </v-card>

                    <div>
                        <v-card class="pa-5 rounded-xl box-card-search " v-if="listPlayers != 0">
                            <v-card-title>
                                <span :class="listPlayers != 0 ? 'mb-6' : ''"> Team: {{ team }} </span>
                                <v-spacer></v-spacer>
                                <span :class="listPlayers != 0 ? 'mb-6' : ''"> Page: {{ page }} </span>
                            </v-card-title>
                            <v-card-text>
                                <ul v-if="listPlayers != 0">
                                    <li 
                                        v-for="({name}, index) in listPlayers"
                                        :key="index"
                                    >
                                        {{ name }}
                                    </li>
                                </ul>
                            </v-card-text>
                        </v-card>
                    </div>
                </v-col>
                <v-col cols="12" sm="12" md="7" xl="8" class="mt-2">
                    <v-row align="center" justify="center">
                        <v-col cols="12" sm="12" md="12" v-if="listPlayers != 0">
                            <v-row align="center" justify="center">
                                <v-col cols="12" sm="6" md="6" lg="4" xl="3"
                                    v-for="(item, index) in listPlayers"
                                    :key="index"
                                >
                                    <v-card class="rounded-xl box-card-search mb-3" @click="seeFilePlayer(item)"
                                        width="250">
                                        <v-img
                                            src="https://res.cloudinary.com/dbepipmro/image/upload/v1632688108/4633559_jtzhzc.png"
                                            width="250"
                                            class="info-card"
                                        >
                                            <div class="pa-8">
                                                <h1 class="title white--text"> {{ item.name }} </h1>
                                                <v-divider color="white"></v-divider>
                                                <h2 class="subtitle-1 white--text"> Position: {{ item.position }} </h2>
                                            </div>
                                        </v-img>
                                    </v-card>
                                </v-col>
                            </v-row>
                            
                            <v-dialog
                                v-model="seeFile"
                                transition="dialog-bottom-transition"
                                max-width="600"
                                class="rounded-xl"
                            >
                                <template v-slot:default="dialog">
                                    <v-card class="rounded-xl bg-card-file">
                                        <v-toolbar
                                            color="deep-purple accent-3"
                                            dark
                                        >Player</v-toolbar>
                                        
                                        <v-card-text>
                                            <div class="pa-8">
                                                <h1 class="title mb-5">
                                                    {{ filePlayer.name }}
                                                </h1>
                                                <p class="subtitle-1"> 
                                                    <b>Team: </b>{{ filePlayer.team }} <br>
                                                    <b>Position:</b> {{ filePlayer.position }} <br>
                                                    <b>Nationality:</b> {{ filePlayer.nationality }} <br>
                                                </p>                                                
                                            </div>
                                        </v-card-text>
                                        <v-card-actions class="justify-end">
                                            <v-btn
                                                rounded
                                                large
                                                @click="dialog.value = false"
                                            >Close</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </template>
                            </v-dialog>
                        </v-col>                        
                    </v-row>            
                </v-col>
            </v-row>
        </div>
    `,
    data(){
        return{
            loading: '',

            page: 1,
            pagesPlayers:[],

            search: '',
            team: '',
            order: '',
            orderBy: ['asc', 'desc'],

            listPlayers:[],
            
            seeFile: false,
            filePlayer: {
                name: '',
                position: '',
                team: '',
                nationality: '',
            }
        }
    },
    watch:{
        async search(value, oldValue){
            if(value == ''){
                this.listPlayers = []
                this.loading = ''
                this.players()
            }
        },
        async team(value, oldValue){
            if(value == ''){
                this.listPlayers = []
                this.players()
            }
        }
    },
    methods:{
        seeFilePlayer(item){
            this.seeFile = true
            this.filePlayer.name = item.name
            this.filePlayer.position = item.position
            this.filePlayer.team = item.team
            this.filePlayer.nationality = item.nationality
        },
        totalPages(){
            for (let index = 1; index <= 709; index++) {
                this.pagesPlayers.push(index)
            }
        },
        async countPagesPlayers( param ){
            this.listPlayers = []
            await fetch(`http://localhost:3000/api/v1/players?page=${param}`)
                .then( response => response.json())
                .then( data => {
                    const { players } = data

                    players.forEach(element => {
                        this.listPlayers.push({
                            name: element.nombre_jugador,
                            position: element.posicion,
                            nationality: element.nacionalidad,
                            team: element.equipo
                        })
                    });
                })
        },
        orderByList(){ 
            this.players()
        },
        async players(){
            this.listPlayers = []
            this.team = ''
            await fetch(`http://localhost:3000/api/v1/players?search=${this.search}&order=${this.order}`)
                .then( response => response.json())
                .then( data => {
                    const { players } = data

                    players.forEach(element => {
                        this.listPlayers.push({
                            name: element.nombre_jugador.length > 30 ? `${element.nombre_jugador.substring(0, 32)} ...` : element.nombre_jugador,
                            position: element.posicion,
                            nationality: element.nacionalidad,
                            team: element.equipo
                        })
                    });
                })
        },
        async teams(){
            this.listPlayers = []
            this.search = ''
            await fetch(`http://localhost:3000/api/v1/team`,{
                headers:{
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({name: this.team})
            })
                .then( response => response.json())
                .then( data => {
                    const { players } = data
                    players.forEach(element => {
                        this.listPlayers.push({
                            name: element.nombre_jugador,
                            position: element.posicion,
                            nationality: element.nacionalidad,
                            team: element.equipo
                        })
                    });
                    
                })
        },
    },
    mounted(){
        this.players()
        this.totalPages()
    }
})