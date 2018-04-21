// 数组用来存储每一个数字
var grid_number = new Array();
// 总分
var score = 0;

// 开始游戏
window.onload = function() {
    init();
    document.getElementById('score').innerHTML = score;
    
    // 根据键盘（上下左右）操作开始游戏
    document.addEventListener('keydown', (e) => {

        switch (e.keyCode) {
            case 37:
                // 左键
                e.preventDefault();
                if (moveLeft()) {
                    setTimeout(() => {
                        newNumber();
                    }, 200);
                    setTimeout(() => {
                        gameOver()
                    }, 400);
                }
                break;
            case 39:
                // 右键
                e.preventDefault();
                if (moveRight()) {
                    setTimeout(() => {
                        newNumber();
                    }, 200);
                    setTimeout(() => {
                        gameOver()
                    }, 400);
                }
                break;
            case 38:
                // 上键
                e.preventDefault();
                if (moveUp()) {
                    setTimeout(() => {
                        newNumber();
                    }, 200);
                    setTimeout(() => {
                        gameOver()
                    }, 400);
                }
                break;
            case 40:
                // 下键
                e.preventDefault();
                if (moveDown()) {
                    setTimeout(() => {
                        newNumber();
                    }, 200);
                    setTimeout(() => {
                        gameOver()
                    }, 400);
                }
                break;
            default:
                break;
        }
    });

}

// 获取数字背景颜色
function getNumberBackgroundColor(number) {
    switch (number) {
        case 2:
            return "#eee4da";
            break;
        case 4:
            return "#ede0c8";
            break;
        case 8:
            return "#f2b179";
            break;
        case 16:
            return "#f59563";
            break;
        case 32:
            return "#f67e5f";
            break;
        case 64:
            return "#f65e3b";
            break;
        case 128:
            return "#edcf72";
            break;
        case 256:
            return "#edcc61";
            break;
        case 512:
            return "#9c0";
            break;
        case 1024:
            return "#33b5e5";
            break;
        case 2048:
            return "#09c";
            break;
    }
    return "black";
}

// 获取数字颜色
function getNumberColor(number) {
    if (number <= 4)
        return "#776e65";
    return "white";
}

// 初始化界面
function init() {
    // 初始化数组
    for (let i = 0; i < 4; i++) {
        grid_number[i] = new Array();
        for (let j = 0; j < 4; j++) {
            grid_number[i][j] = 0;
        }
    }

    newNumber();
    newNumber();
}

// 判断是否有空余位置放置新数字
function isEmptySpace() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid_number[i][j] == 0) {
                return true;
            }
        } 
    }
    return false;
}

// 产生新数字
function newNumber() {
    if (!isEmptySpace()) {
        return false;
    }

    // gridx与gridy指数字所属div的下标，范围是1-4
    let gridx = parseInt(Math.floor(Math.random() * 4 + 1));
    let gridy = parseInt(Math.floor(Math.random() * 4 + 1));
    while (grid_number[gridx - 1][gridy - 1] != 0) {
        gridx = parseInt(Math.floor(Math.random() * 4 + 1));
        gridy = parseInt(Math.floor(Math.random() * 4 + 1));
    }
    let grid = document.getElementsByClassName('column grid-' + gridx + '-' + gridy)[0];

    // 随机生成一个2或者4
    let randomNumber = Math.random() > 0.5 ? 2 : 4;
    grid.innerHTML = randomNumber;
    grid.style.backgroundColor = getNumberBackgroundColor(randomNumber);
    grid.style.color = getNumberColor(randomNumber);
    grid_number[gridx - 1][gridy - 1] = randomNumber;
}



// 按下按键后更新视图
function updateView() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let grid = document.getElementsByClassName('column grid-' + (i + 1) + '-' + (j + 1))[0];
            if (grid_number[i][j] != 0) {
                grid.innerHTML = grid_number[i][j];
                grid.style.backgroundColor = getNumberBackgroundColor(grid_number[i][j]);
                grid.style.color = getNumberColor(grid_number[i][j]);
            } else {
                grid.innerHTML = null;
                grid.style.backgroundColor = '#C7B9AD';
            }
        }
    }
}



// 判断是否可以向左移动
function canMoveLeft() {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (grid_number[i][j] != 0)
                if (grid_number[i][j - 1] == 0 || grid_number[i][j - 1] == grid_number[i][j])
                    return true;
        }
    }
    return false;
}

// 向左移动
function moveLeft() {
    if (!canMoveLeft) {
        return false;
    }
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            if (grid_number[i][j] != 0) {
                for (var k = j - 1; k >= 0; k--) {
                    if (grid_number[i][k] == 0) {
                        if (k == 0) {
                            [grid_number[i][k], grid_number[i][j]] = [grid_number[i][j], 0];
                            break;
                        }
                        continue;
                    } else if (grid_number[i][k] == grid_number[i][j]) {
                        [grid_number[i][k], grid_number[i][j]] = [grid_number[i][j] * 2, 0];
                        score+=grid_number[i][k];
                        document.getElementById('score').innerHTML = score;
                        break;
                    } else if (grid_number[i][k] != 0) {
                        // 如果k邻接着j，则直接break
                        if(j-k==1){
                            break;
                        }
                        // 否则将j所在数字赋给k右边的第一个元素
                        else{
                            [grid_number[i][k + 1], grid_number[i][j]] = [grid_number[i][j], 0];
                            break;
                        }
                    }
                }
            }
        }
    }

    updateView();
    return true;
}

// 判断是否可以向右移动
function canMoveRight() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
            if (grid_number[i][j] != 0)
                if (grid_number[i][j+1] == 0 || grid_number[i][j + 1] == grid_number[i][j])
                    return true;
        }
    }
    return false;
}

// 向右移动
function moveRight() {
    if (!canMoveRight) {
        return false;
    }
    for (let i = 3; i >=0; i--) {
        for (let j = 2; j >= 0; j--) {
            if (grid_number[i][j] != 0) {
                for (var k = j + 1; k < 4; k++) {
                    if (grid_number[i][k] == 0) {
                        if (k == 3) {
                            [grid_number[i][k], grid_number[i][j]] = [grid_number[i][j], 0];
                            break;
                        }
                        continue;
                    } else if (grid_number[i][k] == grid_number[i][j]) {
                        [grid_number[i][k], grid_number[i][j]] = [grid_number[i][j] * 2, 0];
                        score+=grid_number[i][k];
                        document.getElementById('score').innerHTML = score;
                        break;
                    } else if (grid_number[i][k] != 0) {
                        // 如果k邻接着j，则直接break
                        if(k-j==1){
                            break;
                        }
                        // 否则将j所在数字赋给k左边的第一个元素
                        else{
                            [grid_number[i][k - 1], grid_number[i][j]] = [grid_number[i][j], 0];
                            break;
                        }
                    }
                }
            }
        }
    }

    updateView();
    return true;
}

// 判断是否可以向上移动 
function canMoveUp() {
    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (grid_number[i][j] != 0)
                if (grid_number[i-1][j] == 0 || grid_number[i - 1][j] == grid_number[i][j])
                    return true;
        }
    }
    return false;
}

// 向上移动
function moveUp() {
    if (!canMoveUp) {
        return false;
    }
    for (let i = 1; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid_number[i][j] != 0) {
                for (var k = i - 1; k >= 0; k--) {
                    if (grid_number[k][j] == 0) {
                        if (k == 0) {
                            [grid_number[k][j], grid_number[i][j]] = [grid_number[i][j], 0];
                            break;
                        }
                        continue;
                    } else if (grid_number[k][j] == grid_number[i][j]) {
                        [grid_number[k][j], grid_number[i][j]] = [grid_number[i][j] * 2, 0];
                        score+=grid_number[k][j];
                        document.getElementById('score').innerHTML = score;
                        break;
                    } else if (grid_number[k][j] != 0) {
                        // 如果k邻接着j，则直接break
                        if(i-k==1){
                            break;
                        }
                        // 否则将j所在数字赋给k右边的第一个元素
                        else{
                            [grid_number[k+1][j], grid_number[i][j]] = [grid_number[i][j], 0];
                            break;
                        }
                    }
                }
            }
        }
    }

    updateView();
    return true;
}

// 判断是否可以向下移动
function canMoveDown() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 4; j++) {
            if (grid_number[i][j] != 0)
                if (grid_number[i + 1][j] == 0 || grid_number[i + 1][j] == grid_number[i][j])
                    return true;
        }
    }
    return false;
}

// 向下移动
function moveDown() {
    if (!canMoveDown) {
        return false;
    }
    for (let i = 2; i >= 0; i--) {
        for (let j = 0; j < 4; j++) {
            if (grid_number[i][j] != 0) {
                for (var k = i + 1; k < 4; k++) {
                    if (grid_number[k][j] == 0) {
                        if (k == 3) {
                            [grid_number[k][j], grid_number[i][j]] = [grid_number[i][j], 0];
                            break;
                        }
                        continue;
                    } else if (grid_number[k][j] == grid_number[i][j]) {
                        [grid_number[k][j], grid_number[i][j]] = [grid_number[i][j] * 2, 0];
                        score+=grid_number[k][j];
                        document.getElementById('score').innerHTML = score;
                        break;
                    } else if (grid_number[k][j] != 0) {
                        // 如果k邻接着j，则直接break
                        if(k - i==1){
                            break;
                        }
                        // 否则将j所在数字赋给k右边的第一个元素
                        else{
                            [grid_number[k-1][j], grid_number[i][j]] = [grid_number[i][j], 0];
                            break;
                        }
                    }
                }
            }
        }
    }

    updateView();
    return true;
}

// 判断游戏是否结束
function gameOver(){
    if(!isEmptySpace() && !(canMoveLeft()||canMoveRight()||canMoveUp()||canMoveDown())){
        alert("GAME OVER\nSCORE: "+score);
    }
}