const { app, io, http } = require("./db/main");
const { mongoose } = require("./db/connection");
const schema = require("./db/schemas");
const act = require("./db/actions");

app.get("/", (req, res) => {
    res.send(Object.keys(io.engine.clients));
});

io.on("connection", (socket) => {
    // Оповещение о присоединении
    console.log(`A user connected with socket id ${socket.id}`);
    socket.broadcast.emit("ON_USER_CONNECTED", socket.id);

    // Отсоединение пользователя
    socket.on("disconnect", () => {
        console.log(`A user disconnected with socket id ${socket.id}`);
        socket.broadcast.emit("SOCKET_USER_DISCONNECTED", socket.id);
    });

    // Создание пользователя
    socket.on(act.EMIT_ADD_USER, (user, callback) => {
        let User = mongoose.model("User", schema.user);

        let newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            name: user.name,
            color: user.color,
            canvas: "",
        });

        newUser.save(function (err) {
            if (err) throw err;
            console.log(`User ${newUser._id} successfully saved.`);

            callback({
                id: newUser._id,
            });
        });
    });

    // Изменение пользователя
    socket.on(act.EMIT_EDIT_USER, (user, callback) => {
        let User = mongoose.model("User", schema.user);

        let editUser = new User({
            _id: user._id,
            name: user.name,
            color: user.color,
            canvas: user.canvas,
        });

        User.findById(editUser._id, function (err, doc) {
            if (err) throw err;

            if (doc) {
                User.updateOne({ _id: doc.id }, editUser, function (err, result) {
                    if (err) throw err;
                    console.log(`User ${editUser._id} successfully edited.`);

                    callback();
                });
            } else {
                editUser.save(function (err) {
                    if (err) throw err;
                    console.log(`User ${editUser._id} successfully saved.`);

                    callback();
                });
            }
        });
    });

    // Создание доски
    socket.on(act.EMIT_ADD_BOARD, (board, callback) => {
        let Board = mongoose.model("Board", schema.board);

        let newBoard = new Board({
            _id: new mongoose.Types.ObjectId(),
            name: board.name,
            description: board.description,
            subject_id: board.subject_id,
            is_private: board.is_private,
            mode: board.mode,
            password: board.password,
            owner: mongoose.Types.ObjectId(board.owner._id), // Владелец
            members: [], // Участники
        });

        newBoard.save(function (err) {
            if (err) throw err;
            console.log(`Board ${newBoard._id} successfully saved.`);

            callback({
                id: newBoard._id,
            });

            Board.find({}, function (err, boards) {
                if (err) throw err;

                board._id = newBoard._id;

                socket.broadcast.emit(act.ON_ADD_BOARD, { count: boards.length, lastBoard: board });
            });
        });
    });

    // Получение всех досок
    socket.on(act.EMIT_GET_ALL_BOARD, (search, callback) => {
        let Board = mongoose.model("Board", schema.board);

        Board.find(search, null, { sort: { _id: -1 } }, function (err, boards) {
            if (err) throw err;

            let User = mongoose.model("User", schema.user);

            var arrayOfPromises = boards.map(function (row) {
                // Заполняем владельца
                return User.findById(row.owner, function (err, doc) {
                    if (err) throw err;

                    row.owner = doc;
                }).then(() => {
                    // Заполняем участников
                    var innerArray = row.members.map(function (member) {
                        User.findById(member, function (err, doc) {
                            if (err) throw err;

                            member = doc;
                        });
                    });
                    return Promise.all(innerArray);
                });
            });
            Promise.all(arrayOfPromises).then(() => {
                callback(boards);
            });
        });
    });
});

// Прослушка сервера
http.listen(8081);
