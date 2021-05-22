//const { Socket } = require("dgram"); хз что, лучше не трогать
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST', 'WS'],
        credentials: true,
    },
})

app.use(cors())
app.use(morgan('dev'))

server.listen(3000)

app.listen(app.get('port'), () => {
    console.log(`[OK] Server is running on localhost`)
})

app.get('/', function (request, respons) {
    respons.sendFile(__dirname + '/index.html')
})

let users = []

io.on('connection', function (user) {
    // user.emit("SOCKET_CONNECT");
    console.log('Пути, не путю')
    //информация о юзере
    /*
    user.info = {
        step: "login",
        choseLocation: null,
        chosePerson: null,
    };

    users.push(user);

    //Получение нового шага игры
    user.on("setChose", (choseNow) => {
        setChose(choseNow);
    });

    //Получение нового шага игры
    user.on("getStep", (stepNow) => {
        sendNextStep();
    });

    //При отключении кикаем и массива подключенных
    user.on("disconnect", () => {
        users.splice(users.indexOf(user), 1);
        console.log("disconnect");
    });

    //записываем очередной выбор
    function setChose(choseNow) {
        if (choseNow.type === "location") {
            user.info.choseLocation = choseNow.choice;
        } else if (choseNow.type === "person") {
            user.info.chosePerson = choseNow.choice;
        } else {
            user.emit("viewError", `неизвестный тип выбора: ${choseNow.type}`);
        }
    }

    //Отправляем инфу о новом шаге игры
    function sendNextStep(moreInfo = null) {
        //Получаем новый шаг если все условия соблюдены
        let res = tryCanGetNextStep(user.info.step);

        if (res.isError) {
            //выводим ошибку если такая имеется)
            user.emit("viewError", res.error.msg);
        } else {
            //записываем новый шаг юзеру и отсылаем его на вьюху
            user.info.step = res.response.nextStep;
            user.emit(res.response.nextStep, moreInfo);
        }
    }

    //Логика очередного шага игры
    function tryCanGetNextStep(stepNow) {
        //объект ответа этой функции
        let res = {
            isError: false,
            error: {
                code: 0,
                msg: null,
            },
            response: {
                nextStep: null,
            },
        };

        if (stepNow === "login") {
            res.response.nextStep = "viewFormChoseLocation";
        }
        //При выборе персонажа, наш предыдущий шаг должен быть выбор локации и данные по его выбору уже должны быть записаны
        else if (stepNow === "viewFormChoseLocation") {
            if (user.info.choseLocation !== null) {
                res.response.nextStep = "viewFormChosePerson";
            } else {
                res.isError = true;
                res.error.code = 1;
                res.error.msg = "Сначала выберите локацию!";
            }
        } else if (stepNow === "viewFormChosePerson") {
            if (user.info.chosePerson !== null) {
                if (user.info.choseLocation !== null) {
                    res.response.nextStep = "viewFormChoseDesiredRole";
                } else {
                    res.isError = true;
                    res.error.code = 3;
                    res.error.msg = "Сначала выберите локацию!";
                }
            } else {
                res.isError = true;
                res.error.code = 2;
                res.error.msg = "Сначала выберите персонажа!";
            }
        }

        return res;
    }*/
})
