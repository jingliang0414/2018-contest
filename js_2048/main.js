// 存储每一个数字
var grid_number = new Array();

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
function is_empty_space(grid_number) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid_number[i][j] == 0) {
                return true;
            }
        }
        return false;
    }
}

// 产生新数字
function newNumber() {
    if (!is_empty_space(grid_number)) {
        return false;
    }

    let gridx = parseInt(Math.floor(Math.random() * 4 + 1));
    let gridy = parseInt(Math.floor(Math.random() * 4 + 1));
    let grid = document.getElementsByClassName('column grid-' + gridx + '-' + gridy)[0];

    // 随机生成一个2或者4
    let randomNumber = Math.random() > 0.5 ? 2 : 4;
    grid.innerHTML = randomNumber;
    grid.style.backgroundColor = getNumberBackgroundColor(randomNumber);
    grid.style.color = getNumberColor(randomNumber);
    grid_number[gridx][gridy] = randomNumber;
}



// 按下按键后更新视图
function updateView() {

}

window.onload = function() {
    init();
    this.document.addEventListener('keydown', keydown);
}

function keydown(event) {
    switch (event.keyCode) {
        // 左键
        case 37:
            // 右键
        case 39:
            // 上键
        case 38:
            // 下键
        case 40:
    }
}

function canMoveLeft() {

}