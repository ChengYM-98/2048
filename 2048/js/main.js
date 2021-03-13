var game = {
    data: [],
    score: 0,   //分数
    status: 0,   //是否结束
    gameover: 0,
    gamerunning: 1,

    // 初始化
    start: function () {
        this.score = 0;
        this.data = [//用数组形容网格
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
        this.status = this.gamerunning;
        this.randomNum();
        this.randomNum();
        this.dataView();
    },

    //随机数字
    randomNum: function () {
        //创建死循环
        for (; ;) {
            var x = Math.floor(Math.random() * 4);
            var y = Math.floor(Math.random() * 4);

            //如果随机坐标处无数字，则填充2或4
            if (this.data[x][y] == 0) {
                var num = Math.random() > 0.2 ? 2 : 4;// 20%出2,80%出4
                this.data[x][y] = num;
                break;//退出死循环
            }
        }
    },
    // 更新表格样式
    dataView: function () {
        for (var x = 0; x < 4; x++) {
            for (var y = 0; y < 4; y++) {
                var div = document.getElementById("x" + x + y);
                if (this.data[x][y] != 0) {
                    div.innerHTML = this.data[x][y];
                    div.className = "n" + this.data[x][y];
                } else {
                    div.innerHTML = "";
                    div.className = "";
                }
            }
        }
        document.getElementById("score_1").innerHTML = this.score;//更新分数

        //监听事件
        if (this.status == this.gameover) {
            //游戏结束显示遮罩层
            document.getElementById("score_2").innerHTML = this.score;
            console.log("dead!!!!!!!!");
            document.getElementById("cover").style.display = "block"
        } else {
            document.getElementById("cover").style.display = "none"
        }
    },
    //判断游戏结束
    isGameOver: function () {
        for (var x = 0; x < 4; x++) {
            for (var y = 0; y < 4; y++) {
                //若还有空，不退出
                if (this.data[x][y] == 0) {
                    return false;
                }
                if (x < 3) {
                    if (this.data[x][y] == this.data[x + 1][y]) {
                        return false;
                    }
                }
                if (y < 3) {
                    if (this.data[x][y] == this.data[x][y + 1]) {
                        return false;
                    }
                }
            }
        }
        return true;//游戏结束
    },

    //左移动
    moveLeft: function () {
        var before = String(this.data)//移动之前
        for (var x = 0; x < 4; x++) {
            this.moveLeftInrow(x);
        }
        var after = String(this.data)//移动之后
        if (before != after) {
            this.randomNum()
            if (this.isGameOver()) {
                this.status = this.gameover;//游戏结束
            }
            this.dataView();//更新状态
        }
    },
    moveLeftInrow: function (x) {
        for (var y = 0; y < 3; y++) {
            var nexty = this.getNextInrow(x, y);
            if (nexty != -1) {
                if (this.data[x][y] == 0) {//当前格为0
                    this.data[x][y] = this.data[x][nexty];//后面不为0的替换
                    this.data[x][nexty] = 0;
                    y--;
                } else if (this.data[x][y] == this.data[x][nexty]) {
                    this.data[x][y] *= 2;//当前格数值乘2
                    this.score += this.data[x][y]//加上分数
                    this.data[x][nexty] = 0//后面值清零
                }
            } else {
                break;
            }
        }
    },

    getNextInrow: function (r, c) {
        for (var i = c + 1; i < 4; i++) {
            if (this.data[r][i] != 0) {//判断当前格后面的值是否为0
                return i//不为0返回格
            }
        }
        return -1;
    },



    // 右移动
    moveRight: function () {
        var before = String(this.data) //移动之前
        for (var r = 3; r >= 0; r--) {
            this.moveRightInRow(r);
        }
        var after = String(this.data) //移动之后
        if (before != after) {
            this.randomNum()
            if (this.isGameOver()) {
                this.status = this.gameover;

            }
            this.dataView()
        }
    },

    moveRightInRow: function (r) { //单独处理每一行的逻辑
        for (var c = 3; c >= 0; c--) {
            var nextc = this.getNextInRowa(r, c);
            if (nextc != -1) {
                if (this.data[r][c] == 0) {
                    this.data[r][c] = this.data[r][nextc];
                    this.data[r][nextc] = 0;
                    c++;
                } else if (this.data[r][c] == this.data[r][nextc]) {
                    this.data[r][c] *= 2;
                    this.score += this.data[r][c]
                    this.data[r][nextc] = 0
                }
            } else {
                break;
            }
        }
    },
    getNextInRowa: function (r, c) {
        for (var i = c - 1; i >= 0; i--) {
            if (this.data[r][i] != 0) {
                return i
            }
        }
        return -1;
    },

    // 上移动
    moveTop: function () {
        var before = String(this.data) //移动之前
        for (var c = 0; c < 4; c++) {
            this.moveTopInRow(c);
        }
        var after = String(this.data) //移动之后
        if (before != after) {
            this.randomNum()
            if (this.isGameOver()) {
                this.status = this.gameover;

            }
            this.dataView()
        }
    },
    moveTopInRow: function (c) { //单独处理每一列的逻辑
        for (var r = 0; r < 3; r++) {
            var nextr = this.getNextInRowaa(r, c);
            if (nextr != -1) {
                if (this.data[r][c] == 0) {
                    this.data[r][c] = this.data[nextr][c];
                    this.data[nextr][c] = 0;
                    r--;
                } else if (this.data[r][c] == this.data[nextr][c]) {
                    this.data[r][c] *= 2;
                    this.score += this.data[r][c]
                    this.data[nextr][c] = 0
                }
            } else {
                break;
            }
        }
    },
    getNextInRowaa: function (r, c) {
        for (var i = r + 1; i < 4; i++) {
            if (this.data[i][c] != 0) {
                return i
            }
        }
        return -1;
    },
    // 下移动
    moveButtom: function () {
        var before = String(this.data) //移动之前
        for (var c = 3; c >= 0; c--) {
            this.moveButtomInRow(c);
        }
        var after = String(this.data) //移动之后
        if (before != after) {
            this.randomNum()
            if (this.isGameOver()) {
                this.status = this.gameover;

            }
            this.dataView()
        }
    },
    moveButtomInRow: function (c) { //单独处理每一列的逻辑
        for (var r = 3; r >= 0; r--) {
            var nextr = this.getNextInRowaaa(r, c);
            if (nextr != -1) {
                if (this.data[r][c] == 0) {
                    this.data[r][c] = this.data[nextr][c];
                    this.data[nextr][c] = 0;
                    r++;
                } else if (this.data[r][c] == this.data[nextr][c]) {
                    this.data[r][c] *= 2;
                    this.score += this.data[r][c]
                    this.data[nextr][c] = 0
                }
            } else {
                break;
            }
        }
    },
    getNextInRowaaa: function (r, c) {
        for (var i = r - 1; i >= 0; i--) {
            if (this.data[i][c] != 0) {
                return i
            }
        }
        return -1;
    },



}

game.start()

document.onkeydown = function (event) {
    console.log(event.keyCode);
    if (event.keyCode== 37) {
        game.moveLeft()
    }
    if (event.keyCode == 39) {
        game.moveRight()
    }
    if (event.keyCode == 38) {
        game.moveTop()
    }
    if (event.keyCode == 40) {
        game.moveButtom()
    }
}

tryAgain = function () {
    game.start()

}

