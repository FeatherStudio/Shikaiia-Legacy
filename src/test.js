window.onload = init;

var game = {
    data: [],
    backUp: [],
    state: 0,
    autoRunInterval: null,
    autoRunState: false,
    STATE_RUNNING: 1,
    STATE_GAME_OVER: 0,
    STATE_PLAYING: 2,

    generateANumber: function () {
        var generate_x = Math.floor(Math.random() * 4);
        var generate_y = Math.floor(Math.random() * 4);
        while (this.data[generate_x][generate_y] != 0) {
            generate_x = Math.floor(Math.random() * 4);
            generate_y = Math.floor(Math.random() * 4);
        }
        this.data[generate_x][generate_y] = Math.ceil(Math.random() * 2) * 2;
    },

    checkFull: function () {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (this.data[i][j] == 0) {
                    return false;
                }
            }
        }
        return true;
    },

    initialization: function () {
        this.data = [[0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]];
        this.backUp = [[0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]];
        this.score = 0;
        this.update();
        this.state = this.STATE_RUNNING;
        var div = document.getElementById("gameOver");
        div.style.display = "none";

        if (this.autoRunState) {
            clearInterval(this.autoRunInterval);
            this.autoRunState = false;
        }

        this.generateANumber();
        this.generateANumber();
        this.makeBackUp();
        this.update();
    },

    canFallDown: function () {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 3; j++) {
                if (this.data[j][i] != 0) {
                    for (var k = j + 1; k < 4; k++) {
                        if (this.data[k][i] == 0) {
                            return true;
                        }
                    }
                }
            }
        }
        for (i = 0; i < 4; i++) {
            for (j = 0; j < 3; j++) {
                if (this.data[j][i] != 0 && this.data[j + 1][i] == this.data[j][i]) {
                    return true;
                }
            }
        }
        return false;
    },

    canFallUp: function () {
        for (var i = 0; i < 4; i++) {
            for (var j = 3; j >= 1; j--) {
                if (this.data[j][i] != 0) {
                    for (var k = j - 1; k >= 0; k--) {
                        if (this.data[k][i] == 0) {
                            return true;
                        }
                    }
                }
            }
        }
        for (i = 0; i < 4; i++) {
            for (j = 3; j >= 1; j--) {
                if (this.data[j][i] != 0 && this.data[j - 1][i] == this.data[j][i]) {
                    return true;
                }
            }
        }
        return false;
    },

    canFallRight: function () {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 3; j++) {
                if (this.data[i][j] != 0) {
                    for (var k = j + 1; k < 4; k++) {
                        if (this.data[i][k] == 0) {
                            return true;
                        }
                    }
                }
            }
        }
        for (i = 0; i < 4; i++) {
            for (j = 0; j < 3; j++) {
                if (this.data[i][j] != 0 && this.data[i][j + 1] == this.data[i][j]) {
                    return true;
                }
            }
        }
        return false;
    },

    canFallLeft: function () {
        for (var i = 0; i < 4; i++) {
            for (var j = 3; j >= 1; j--) {
                if (this.data[i][j] != 0) {
                    for (var k = j - 1; k >= 0; k--) {
                        if (this.data[i][k] == 0) {
                            return true;
                        }
                    }
                }
            }
        }
        for (i = 0; i < 4; i++) {
            for (j = 3; j >= 1; j--) {
                if (this.data[i][j] != 0 && this.data[i][j - 1] == this.data[i][j]) {
                    return true;
                }
            }
        }
        return false;
    },

    getNextUp: function (i, j) {
        for (var k = i - 1; k >= 0; k--) {
            if (this.data[k][j] != 0) {
                return k;
            }
        }
        return -1;
    },

    getNextDown: function (i, j) {
        for (var k = i + 1; k < 4; k++) {
            if (this.data[k][j] != 0) {
                return k;
            }
        }
        return -1;
    },

    getNextLeft: function (i, j) {
        for (var k = j - 1; k >= 0; k--) {
            if (this.data[i][k] != 0) {
                return k;
            }
        }
        return -1;
    },

    getNextRight: function (i, j) {
        for (var k = j + 1; k < 4; k++) {
            if (this.data[i][k] != 0) {
                return k;
            }
        }
        return -1;
    },

    lineFallDown: function (j) {
        for (var i = 3; i >= 1; i--) {
            var next = this.getNextUp(i, j);
            if (next == -1) {
                break;
            } else {
                if (this.data[i][j] == 0) {
                    this.data[i][j] = this.data[next][j];
                    this.data[next][j] = 0;
                    animation.addTask("" + next + j, "" + i + j);
                    i++;
                } else if (this.data[i][j] == this.data[next][j]) {
                    this.data[i][j] *= 2;
                    this.score += this.data[i][j];
                    this.data[next][j] = 0;
                    animation.addTask("" + next + j, "" + i + j);
                }
            }
        }
    },

    lineFallRight: function (i) {
        for (var j = 3; j >= 1; j--) {
            var next = this.getNextLeft(i, j);
            if (next == -1) {
                break;
            } else {
                if (this.data[i][j] == 0) {
                    this.data[i][j] = this.data[i][next];
                    this.data[i][next] = 0;
                    animation.addTask("" + i + next, "" + i + j);
                    j++;
                } else if (this.data[i][j] == this.data[i][next]) {
                    this.data[i][j] *= 2;
                    this.score += this.data[i][j];
                    this.data[i][next] = 0;
                    animation.addTask("" + i + next, "" + i + j);
                }
            }
        }
    },

    lineFallUp: function (j) {
        for (var i = 0; i < 3; i++) {
            var next = this.getNextDown(i, j);
            if (next == -1) {
                break;
            } else {
                if (this.data[i][j] == 0) {
                    this.data[i][j] = this.data[next][j];
                    this.data[next][j] = 0;
                    animation.addTask("" + next + j, "" + i + j);
                    i--;
                } else if (this.data[i][j] == this.data[next][j]) {
                    this.data[i][j] *= 2;
                    this.score += this.data[i][j];
                    this.data[next][j] = 0;
                    animation.addTask("" + next + j, "" + i + j);
                }
            }
        }
    },

    lineFallLeft: function (i) {
        for (var j = 0; j < 3; j++) {
            var next = this.getNextRight(i, j);
            if (next == -1) {
                break;
            } else {
                if (this.data[i][j] == 0) {
                    this.data[i][j] = this.data[i][next];
                    this.data[i][next] = 0;
                    animation.addTask("" + i + next, "" + i + j);
                    j--;
                } else if (this.data[i][j] == this.data[i][next]) {
                    this.data[i][j] *= 2;
                    this.score += this.data[i][j];
                    this.data[i][next] = 0;
                    animation.addTask("" + i + next, "" + i + j);
                }
            }
        }
    },

    makeBackUp: function () {
        // this.updateEval();
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                this.backUp[i][j] = this.data[i][j];
            }
        }
    },

    goBack: function () {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                this.data[i][j] = this.backUp[i][j];
            }
        }
        this.update();
    },

    fallDown: function () {
        if (this.canFallDown()) {
            this.makeBackUp();

            for (var j = 0; j < 4; j++) {
                this.lineFallDown(j);
            }
            this.state = this.STATE_PLAYING;
            animation.start();
            setTimeout(function () {
                game.state = game.STATE_RUNNING;
                game.generateANumber();
                game.update();
            }, animation.times * animation.interval);
        }
    },

    fallUp: function () {
        if (this.canFallUp()) {
            this.makeBackUp();
            for (var j = 0; j < 4; j++) {
                this.lineFallUp(j);
            }
            this.state = this.STATE_PLAYING;
            animation.start();
            setTimeout(function () {
                game.state = game.STATE_RUNNING;
                game.generateANumber();
                game.update();
            }, animation.times * animation.interval);
        }
    },

    fallLeft: function () {
        if (this.canFallLeft()) {
            this.makeBackUp();
            for (var i = 0; i < 4; i++) {
                this.lineFallLeft(i);
            }
            this.state = this.STATE_PLAYING;
            animation.start();
            setTimeout(function () {
                game.state = game.STATE_RUNNING;
                game.generateANumber();
                game.update();
            }, animation.times * animation.interval);
        }
    },

    fallRight: function () {
        if (this.canFallRight()) {
            this.makeBackUp();
            for (var i = 0; i < 4; i++) {
                this.lineFallRight(i);
            }
            this.state = this.STATE_PLAYING;
            animation.start();
            setTimeout(function () {
                game.state = game.STATE_RUNNING;
                game.generateANumber();
                game.update();
            }, animation.times * animation.interval);
        }
    },

    checkGameOver: function () {
        if (!this.checkFull()) {
            return false;
        }
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (j < 3) {
                    if (this.data[i][j] == this.data[i][j + 1]) {
                        return false;
                    }
                }
                if (i < 3) {
                    if (this.data[i][j] == this.data[i + 1][j]) {
                        return false;
                    }
                }
            }
        }
        return true;
    },
    /*
     generateAStep: function () {
     if (this.canFallUp()) {
     this.fallUp();
     } else if (this.canFallRight()) {
     this.fallRight();
     } else if (this.canFallDown()) {
     this.fallDown();
     } else if (this.canFallLeft()) {
     this.fallLeft();
     }
     },

     */
    autoRun: function () {
        if (this.autoRunState == false) {
            this.autoRunInterval = setInterval(function () {
                // game.generateAStep();
                var grid = new Grid();
                for (var i = 0; i < 4; i++) {
                    for (var j = 0; j < 4; j++) {
                        grid.data[i][j] = game.data[i][j];
                    }
                }
                var newAI = new AI(grid);

                var getMove = newAI.getBestMove().move;
                if (getMove == 0) {
                    game.fallUp();
                } else if (getMove == 1) {
                    game.fallRight();
                } else if (getMove == 2) {
                    game.fallDown();
                } else if (getMove == 3) {
                    game.fallLeft();
                }
            }, 500);
            this.autoRunState = true;
        } else {
            clearInterval(this.autoRunInterval);
            this.autoRunState = false;
        }
    },

    autoRunOnce: function () {
        var grid = new Grid();
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                grid.data[i][j] = this.data[i][j];
            }
        }
        var newAI = new AI(grid);

        var getMove = newAI.getBestMove().move;
        if (getMove == 0) {
            this.fallUp();
        } else if (getMove == 1) {
            this.fallRight();
        } else if (getMove == 2) {
            this.fallDown();
        } else if (getMove == 3) {
            this.fallLeft();
        }
    },

    updateEval: function () {
        var newGrid = new Grid();
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                newGrid.data[i][j] = this.data[i][j];
            }
        }
        var newAI = new AI(newGrid);
        console.log(newAI.getEval());
    },

    update: function () {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                var currentBlock = document.getElementById("block" + i + j);
                currentBlock.innerHTML = this.data[i][j] == 0 ? "" : this.data[i][j];
                currentBlock.className = this.data[i][j] == 0 ? "block" : "block n" + this.data[i][j];
            }
        }
        var scoreSpan = document.getElementById("score");
        scoreSpan.innerHTML = this.score.toString();
        if (this.checkGameOver()) {
            this.state = this.STATE_GAME_OVER;
            var gameOverDiv = document.getElementById("gameOver");
            var finalScore = document.getElementById("finalScore");
            if (this.autoRunState) {
                clearInterval(this.autoRunInterval);
                this.autoRunState = false;
            }
            gameOverDiv.style.display = "block";
            finalScore.innerHTML = this.score.toString();
        }
    }
};

function Task(obj, verticalStep, horizontalStep) {
    this.obj = obj;
    this.verticalStep = verticalStep;
    this.horizontalStep = horizontalStep;
}
Task.prototype.move = function () {
    var style = getComputedStyle(this.obj, null);
    var vertical = parseInt(style.top);
    var horizontal = parseInt(style.left);

    this.obj.style.top = vertical + this.verticalStep + "px";
    this.obj.style.left = horizontal + this.horizontalStep + "px";
};
Task.prototype.clear = function () {
    this.obj.style.top = "";
    this.obj.style.left = "";
};

var animation = {
    times: 20,
    interval: 6,
    timer: null,
    tasks: [],

    addTask: function (source, target) {
        // console.log();
        var sourceDiv = document.getElementById("block" + source);
        var targetDiv = document.getElementById("block" + target);
        var sourceStyleVertical = parseInt(getComputedStyle(sourceDiv).top);
        var targetStyleVertical = parseInt(getComputedStyle(targetDiv).top);
        var sourceStyleHorizontal = parseInt(getComputedStyle(sourceDiv).left);
        var targetStyleHorizontal = parseInt(getComputedStyle(targetDiv).left);

        var verticalStep = (targetStyleVertical - sourceStyleVertical) / this.times;
        var horizontalStep = (targetStyleHorizontal - sourceStyleHorizontal) / this.times;

        var task = new Task(sourceDiv, verticalStep, horizontalStep);
        this.tasks.push(task);
    },
    start: function () {
        this.timer = setInterval(function () {
            for (var i = 0; i < animation.tasks.length; i++) {
                animation.tasks[i].move();
            }
            animation.times--;
            if (animation.times == 0) {
                for (i = 0; i < animation.tasks.length; i++) {
                    animation.tasks[i].clear();
                }
                clearInterval(animation.timer);
                animation.timer = null;
                animation.tasks = [];
                animation.times = 20;
            }
        }, this.interval);
    }
};

function Grid() {
    this.data = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    this.playRound = true;
}

Grid.prototype.clone = function () {
    var newGrid = new Grid();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            newGrid.data[i][j] = this.data[i][j];
        }
    }
    return newGrid;
};
Grid.prototype.leftRotate = function () {
    var tempData = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            tempData[i][j] = this.data[j][3 - i];
        }
    }
    this.data = tempData;
};
Grid.prototype.rightRotate = function () {
    var tempData = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            tempData[i][j] = this.data[3 - j][i];
        }
    }
    this.data = tempData;
};
Grid.prototype.upsideDown = function () {
    var tempData = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            tempData[i][j] = this.data[3 - i][3 - j];
        }
    }
    this.data = tempData;
};
Grid.prototype.getNextUp = function (i, j) {
    for (var k = i - 1; k >= 0; k--) {
        if (this.data[k][j] != 0) {
            return k;
        }
    }
    return -1;
};
Grid.prototype.getNextRight = function (i, j) {
    for (var k = j + 1; k < 4; k++) {
        if (this.data[i][k] != 0) {
            return k;
        }
    }
    return -1;
};
Grid.prototype.getNextDown = function (i, j) {
    for (var k = i + 1; k < 4; k++) {
        if (this.data[k][j] != 0) {
            return k;
        }
    }
    return -1;
};
Grid.prototype.lineMoveDown = function (j) {
    for (var i = 3; i >= 1; i--) {
        var next = this.getNextUp(i, j);
        if (next == -1) {
            break;
        } else {
            if (this.data[i][j] == 0) {
                this.data[i][j] = this.data[next][j];
                this.data[next][j] = 0;
                i++;
            } else if (this.data[i][j] == this.data[next][j]) {
                this.data[i][j] *= 2;
                this.score += this.data[i][j];
                this.data[next][j] = 0;
            }
        }
    }
};
Grid.prototype.moveDown = function () {
    if (this.canFallDown()) {
        for (var j = 0; j < 4; j++) {
            this.lineMoveDown(j);
        }
    }
};
Grid.prototype.canFallDown = function () {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
            if (this.data[j][i] != 0) {
                for (var k = j + 1; k < 4; k++) {
                    if (this.data[k][i] == 0) {
                        return true;
                    }
                }
            }
        }
    }
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 3; j++) {
            if (this.data[j][i] != 0 && this.data[j + 1][i] == this.data[j][i]) {
                return true;
            }
        }
    }
    return false;
};
Grid.prototype.canFall = function (direction) {
    var temp;
    if (direction == 0) {
        this.upsideDown();
        temp = this.canFallDown();
        this.upsideDown();
    } else if (direction == 1) {
        this.rightRotate();
        temp = this.canFallDown();
        this.leftRotate();
    } else if (direction == 2) {
        temp = this.canFallDown();
    } else {
        this.leftRotate();
        temp = this.canFallDown();
        this.rightRotate();
    }
    return temp;
};
Grid.prototype.fall = function (direction) {
    // 0 : up
    // 1 : right
    // 2 : down
    // 3 : left
    if (direction == 0) {
        this.upsideDown();
        this.moveDown();
        this.upsideDown();
    } else if (direction == 1) {
        this.rightRotate();
        this.moveDown();
        this.leftRotate();
    } else if (direction == 2) {
        this.moveDown();
    } else {
        this.leftRotate();
        this.moveDown();
        this.rightRotate();
    }
};
Grid.prototype.availableBlocks = function () {
    var list = [];

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (this.data[i][j] == 0) {
                list.push({i: i, j: j});
            }
        }
    }
    return list;
};
Grid.prototype.connectedBlocks = function () {

    var visited = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    var counter = 0;
    var dx = [0, 0, -1, 1];
    var dy = [1, -1, 0, 0];
    var self = this;
    var fill = function (x, y, color) {
        if (x < 4 && x >= 0 && y < 4 && y >= 0 && self.data[x][y] != 0 && self.data[x][y] == color && visited[x][y] == 0) {
            visited[x][y] = 1;
            for (var i = 0; i < 4; i++) {
                fill(x + dx[i], y + dy[i], color);
            }
        }
    };

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (this.data[i][j] != 0 && visited[i][j] == 0) {
                counter++;
                fill(i, j, this.data[i][j]);
            }
        }
    }

    return counter;

};
Grid.prototype.clone = function () {
    var newGrid = new Grid();
    newGrid.playRound = this.playRound;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            newGrid.data[i][j] = this.data[i][j];
        }
    }
    return newGrid;
};

function AI(anotherGrid) {
    this.grid = anotherGrid;
}
AI.prototype.getSmoothness = function () {
    var smoothness = 0;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (this.grid.data[i][j] != 0) {
                var currentValue = Math.log(this.grid.data[i][j]) / Math.log(2);
                var rightNodeJ = this.grid.getNextRight(i, j);
                var downNodeI = this.grid.getNextDown(i, j);
                if (rightNodeJ != -1) {
                    var rightValue = Math.log(this.grid.data[i][rightNodeJ]) / Math.log(2);
                    smoothness -= Math.abs(currentValue - rightValue);
                }
                if (downNodeI != -1) {
                    var downValue = Math.log(this.grid.data[downNodeI][j]) / Math.log(2);
                    smoothness -= Math.abs(currentValue - downValue);
                }
            }
        }
    }
    return smoothness;
};
AI.prototype.getMonotonicity = function () {

    var horizontalLeft = 0;
    var horizontalRight = 0;
    var verticalUp = 0;
    var verticalDown = 0;

    /*for (var i = 0; i < 4; i++) {
     var list = [];

     for (var j = 0; j < 4; j++) {
     if (this.grid.data[i][j] != 0) {
     list.push(this.grid.data[i][j]);
     }
     }
     if (list.length != 0) {
     if (list.length == 1) {
     /!*list[0] = Math.log(list[0]) / Math.log(2);
     horizontalLeft += list[0];
     horizontalRight += list[0];*!/
     } else {
     for (j = 0; j < list.length - 1; j++) {
     var dist = Math.log(list[j]) / Math.log(2) - Math.log(list[j + 1]) / Math.log(2);
     if (dist > 0) {
     horizontalLeft += dist;
     } else {
     horizontalRight -= dist;
     }
     }
     /!*horizontalLeft += Math.log(list[list.length - 1]) / Math.log(2);
     horizontalRight += Math.log(list[0]) / Math.log(2);*!/
     }
     }
     }

     for (j = 0; j < 4; j++) {
     list = [];
     for (i = 0; i < 4; i++) {
     if (this.grid.data[i][j] != 0) {
     list.push(this.grid.data[i][j]);
     }
     }
     if (list.length != 0) {
     if (list.length == 1) {
     /!*list[0] = Math.log(list[0]) / Math.log(2);
     verticalDown += list[0];
     verticalUp += list[0];*!/
     } else {
     for (i = 0; i < list.length - 1; i++) {
     dist = Math.log(list[i]) / Math.log(2) - Math.log(list[i + 1]) / Math.log(2);
     if (dist > 0) {
     verticalUp += dist;
     } else {
     verticalDown -= dist;
     }
     }
     /!*verticalUp += Math.log(list[list.length - 1]) / Math.log(2);
     verticalDown += Math.log(list[0]) / Math.log(2);*!/
     }
     }
     }*/

    for (var x = 0; x < 4; x++) {
        var current = 0;
        var next = current + 1;
        while (next < 4) {
            while (next < 4 && this.grid.data[x][next] == 0) {
                next++;
            }
            if (next >= 4) {
                next--;
            }
            var currentValue = this.grid.data[x][current] != 0 ?
                Math.log(this.grid.data[x][current]) / Math.log(2) :
                0;
            var nextValue = this.grid.data[x][next] != 0 ?
                Math.log(this.grid.data[x][next]) / Math.log(2) :
                0;
            if (currentValue > nextValue) {
                horizontalLeft += nextValue - currentValue;
            } else if (nextValue > currentValue) {
                horizontalRight += currentValue - nextValue;
            }
            current = next;
            next++;
        }
    }

    for (var y = 0; y < 4; y++) {
        current = 0;
        next = current + 1;
        while (next < 4) {
            while (next < 4 && this.grid.data[next][y] == 0) {
                next++;
            }
            if (next >= 4) {
                next--;
            }
            var currentValue = this.grid.data[current][y]!=0 ?
                Math.log(this.grid.data[current][y]) / Math.log(2) :
                0;
            var nextValue = this.grid.data[next][y]!=0 ?
                Math.log(this.grid.data[next][y]) / Math.log(2) :
                0;
            if (currentValue > nextValue) {
                verticalUp += nextValue - currentValue;
            } else if (nextValue > currentValue) {
                verticalDown += currentValue - nextValue;
            }
            current = next;
            next++;
        }
    }

    return Math.max(horizontalRight, horizontalLeft) + Math.max(verticalUp, verticalDown);

};
AI.prototype.getEmptyCells = function () {
    var counter = 0;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (this.grid.data[i][j] != 0) {
                counter++;
            }
        }
    }
    return Math.log(counter == 0 ? 1 : counter) / Math.log(2);
};
AI.prototype.getMaxCell = function () {
    var maxValue = 0;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            maxValue = Math.max(maxValue, this.grid.data[i][j]);
        }
    }
    return Math.log(maxValue) / Math.log(2);
};
AI.prototype.getEval = function () {
    return this.getMonotonicity() * 1.0 +
        this.getSmoothness() * 0.1 +
        this.getEmptyCells() * 2.7 +
        this.getMaxCell() * 1.0;
};
AI.prototype.search = function (depth, alpha, beta, positions, cutOffs) {

    var bestScore;
    var bestMove = -1;
    var result;

    if (this.grid.playRound) { // player round
        bestScore = alpha;
        for (var direction = 0; direction < 4; direction++) {
            var newGrid = this.grid.clone();
            if (newGrid.canFall(direction)) {
                newGrid.fall(direction);
                newGrid.playRound = false;
                positions++;

                var currentAI = new AI(newGrid);

                if (depth == 0) {
                    result = {move: direction, score: currentAI.getEval()};
                } else {
                    result = currentAI.search(depth - 1, bestScore, beta, positions, cutOffs);
                    if (result.score > 9900) {
                        result.score--;
                    }
                    positions = result.positions;
                    cutOffs = result.cutOffs;
                }
                if (result.score > bestScore) {
                    bestScore = result.score;
                    bestMove = direction;
                }
                if (bestScore > beta) {
                    cutOffs++;
                    return {move: bestMove, score: beta, positions: positions, cutOffs: cutOffs};
                }
            }
        }
    } else {
        bestScore = beta;

        var candidates = [];
        var blocks = this.grid.availableBlocks();
        var scores = {2: [], 4: []};

        for (var value in scores) {
            for (var i = 0; i < blocks.length; i++) {
                var block = blocks[i];
                this.grid.data[block.i][block.j] = parseInt(value);
                scores[value].push(-this.getSmoothness() + this.grid.connectedBlocks());
                this.grid.data[block.i][block.j] = 0;
            }
        }

        var maxScore = Math.max(Math.max.apply(null, scores[2]), Math.max.apply(null, scores[4]));

        for (value in scores) {
            for (var j = 0; j < scores[value].length; j++) {
                if (scores[value][j] == maxScore) {
                    candidates.push({position: blocks[j], value: parseInt(value, 10)});
                }
            }
        }

        for (i = 0; i < candidates.length; i++) {
            var position = candidates[i].position;
            value = candidates[i].value;
            newGrid = this.grid.clone();

            newGrid.playRound = true;
            newGrid.data[position.i][position.j] = value;
            positions++;

            var newAI = new AI(newGrid);
            result = newAI.search(depth, alpha, bestScore, positions, cutOffs);
            positions = result.positions;
            cutOffs = result.cutOffs;

            if (result.score < bestScore) {
                bestScore = result.score;
            }
            if (bestScore < alpha) {
                cutOffs++;
                return {move: null, score: alpha, positions: positions, cutOffs: cutOffs};
            }
        }
    }
    return {move: bestMove, score: bestScore, positions: positions, cutOffs: cutOffs};
};

AI.prototype.getBestMove = function () {
    var startTime = (new Date()).getTime();
    var depth = 0;
    var best;
    do {
        var newBest = this.search(depth, -10000, 10000, 0, 0);
        if (newBest.move == -1) {
            break;
        } else {
            best = newBest;
        }
        depth++;

    } while ((new Date()).getTime() - startTime < 30);
    return best;
    /*
     var value = [];

     for (var i = 0; i < 4; i++) {
     var newGrid = this.grid.clone();
     if (newGrid.canFall(i)) {
     newGrid.fall(i);
     var newAI = new AI(newGrid);
     value.push({score: newAI.getEval(), direction: i});
     //console.log(value[i].score + "<=" + value[i].direction);
     }
     }

     for (var i = 0; i < value.length; i++) {
     // console.log(value[i].score + "<=" + value[i].direction);
     }

     var maxScore = value[0].score;

     for (i = 1; i < value.length; i++) {
     maxScore = Math.max(maxScore, value[i].score);

     }

     for (var i = 0; i < value.length; i++) {
     if (value[i].score == maxScore) {
     return {move: value[i].direction};
     }
     }*/
};

function setUp() {
    var branch = document.body;

    var scoreCounter = document.createElement("p");
    scoreCounter.appendChild(document.createTextNode("Score:"));

    var scoreSpan = document.createElement("span");
    scoreSpan.id = "score";
    scoreCounter.appendChild(scoreSpan);

    branch.appendChild(scoreCounter);


    var gridPanel = document.createElement("div");
    gridPanel.id = "gridPanel";
    branch.appendChild(gridPanel);

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var backGrid = document.createElement("div");
            backGrid.id = "g" + i + j;
            backGrid.className = "grid";
            gridPanel.appendChild(backGrid);
        }
    }

    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            var frontGrid = document.createElement("div");
            frontGrid.id = "block" + i + j;
            frontGrid.className = "cell";
            gridPanel.appendChild(frontGrid);
        }
    }

    var gameOver = document.createElement("div");
    gameOver.id = "gameOver";
    gameOver.style.display = "none";

    var gameOverBackground = document.createElement("div");
    gameOver.appendChild(gameOverBackground);

    var gameOverNotice = document.createElement("p");
    var br1 = document.createElement("br");
    var br2 = document.createElement("br");
    gameOverNotice.appendChild(document.createTextNode("Game Over"));
    gameOverNotice.appendChild(br1);
    gameOverNotice.appendChild(document.createTextNode("Score: "));

    var gameOverSpan = document.createElement("span");
    gameOverSpan.id = "finalScore";
    gameOverNotice.appendChild(gameOverSpan);

    gameOverNotice.appendChild(br2);

    var restartButton = document.createElement("a");
    restartButton.className = "button";
    restartButton.id = "restart";
    restartButton.style.fontSize = "30px";
    restartButton.onclick = function () {
        game.initialization();
    };

    restartButton.innerHTML = "Try Again";

    gameOverNotice.appendChild(restartButton);

    gameOver.appendChild(gameOverNotice);
    branch.appendChild(gameOver);

    var hintText = document.createElement("div");

    hintText.innerHTML = "Press R to restart.<br> Press C to cancel your last move<br>Press A to auto-run<br>Press S to have a hint";
    hintText.style.color = "grey";
    hintText.style.margin = "10px auto";
    hintText.style.textAlign = "center";

    branch.appendChild(hintText);
}
function init() {
    setUp();
    game.initialization();

    document.onkeydown = function () {

        //console.log("123");

        if (game.state != game.STATE_PLAYING) {
            var event = window.event || arguments[0];

            if (event.keyCode == 82) {
                game.initialization();
                return;
            }
            if (game.state == game.STATE_RUNNING) {
                //console.log("11231321");

                if (event.keyCode == 37) {
                    game.fallLeft();
                } else if (event.keyCode == 39) {
                    game.fallRight();
                } else if (event.keyCode == 38) {
                    game.fallUp();
                } else if (event.keyCode == 40) {
                    game.fallDown();
                } else if (event.keyCode == 67) {
                    game.goBack();
                } else if (event.keyCode == 65) {
                    game.autoRun();
                } else if (event.keyCode == 83) {
                    game.autoRunOnce();
                }

            } else if (event.keyCode == 13) {
                game.initialization();
            }
        }
    };

}