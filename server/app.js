
const express = require('express');
const app = express();
app.listen('4000', ()=>{
    console.log('server started on 4000')
})


//Синглтон
//Для того, чтобы избежать лишних подключений в базе данных
class DatabaseConection {
    constructor(host,user,databaseName,password,connectionLimit){
        if(DatabaseConection.exists){
            return DatabaseConection.instance
        }
        DatabaseConection.instance = this
        DatabaseConection.exists = true //проинициализирован

        const {createPool} = require('mysql')
        const connection = createPool({
            host: host,
            user: user,
            database: databaseName,
            password: password,
            connectionLimit: connectionLimit
        })
        this.connection  = connection
    }
    getConnection(){
        return this.connection
    }
}
let salam
//const db = new DatabaseConection('localhost', 'root', 'interactivemap', '1234', '10')


// db.getConnection().query('SELECT * FROM interactivemap.user', (err, result) => {
    
//     salam = result
//    console.log('получил значение')
// })


app.get('/hello',(req, res, next) => {
    res.json({
        message: salam
    })
}
)

//Фасад
class DatabaseActions{
    creatingTable(){
        const sql = `create table if not exists user(
            id int primary key auto_increment,
            name varchar(255) not null,
            age int not null
          )`;

          db.getConnection().query(sql, function(err, results) {
            if(err) console.log(err);
            else console.log("Таблица создана");
        });
    }

    addingData(){
            const sql = `INSERT INTO user(name, age) VALUES('Sam', 31)`;
            db.getConnection().query(sql, function(err, results) {
            if(err) console.log(err);
            console.log(results);
        });
    }

    addingMultipleValues(){
        const user = [
            ["Bob", 22],
            ["Alice", 25],
            ["Kate", 28]
          ];
          const sql = `INSERT INTO user(name, age) VALUES ?`;
           
          db.getConnection().query(sql, [user], function(err, results) {
              if(err) console.log(err);
              console.log(results);
          });
    }

    gettingData(){
            const sql = `SELECT * FROM user`;
            db.getConnection().query(sql, function(err, results) {
            if(err) console.log(err);
            console.log(results);
        });
    }

    dataFiltering(){
            const sql = `SELECT * FROM user WHERE name=? AND age=?`;
            const filter = ["Tom", 29];
             db.getConnection().query(sql, filter, function(err, results) {
            if(err) console.log(err);
            console.log(results);
        });
    }

    deletingData(){
            const sql = "DELETE FROM users WHERE name=?";
        const data = ["Sam"]; // удаляем пользователей с именем Sam
        db.getConnection().query(sql, data, function(err, results) {
        if(err) console.log(err);
        console.log(results);
        });
    }
}

class DatabaseFacade {
    constructor(database) {
        this.database = database;
    }
    tableСreation_filling_output(){
        this.database.creatingTable()
        this.database.addingData()
        this.database.gettingData()
    }

    filling_output(){
        this.database.addingData()
        this.database.gettingData()
    }

    deletingData_output(){
        this.database.deletingData()
        this.database.gettingData()
    }

    creatingTable_addingData_dataFiltering_gettingData(){
        this.database.creatingTable()
        this.database.addingData()
        this.database.dataFiltering()
        this.database.gettingData()
    }
}

// eslint-disable-next-line no-unused-vars
const db_action = new DatabaseFacade(new DatabaseActions())

//Команда

class Command {
    constructor (subject) {
        this.subject = subject
        this.commandsExecuted = [] // здесь будет храниться список команд, которые были вызваны
    }

    execute(command) {
        this.commandsExecuted.push(command)
        return this.subject[command]()
    }
}

const db = new Command(new DatabaseConection('localhost', 'root', 'interactivemap', '1234', '10'))
db.execute('getConnection')
console.log(db.commandsExecuted)