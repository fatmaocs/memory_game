//declaration of all variables

let duration = 1000;

let blocks_container = document.querySelector('.memory-game-blocks');

let blocks = Array.from(blocks_container.children);

let orderRange = [...Array(blocks.length).keys()];

let tries = document.querySelector('.tries');

Shuffle(orderRange);

re_order_blocks();

function re_order_blocks() {
    blocks.forEach((selected_block, index) => {

        selected_block.style.order = orderRange[index];
        selected_block.addEventListener('click', function () {

            flip_block(selected_block);
        });



    });
}

function Shuffle(array) {
    let current = array.length, temp, random;

    while (current > 0) {

        current--;
        random = Math.floor(Math.random() * current);

        temp = array[current];
        array[current] = array[random];
        array[random] = temp;


    }
    return array;

}

function flip_block(selected_block) {

    selected_block.classList.add('is-flipped');

    flipped_blocks = blocks.filter(block => block.classList.contains('is-flipped'));

    if (flipped_blocks.length == 2) {
        stop_clicking();
        check_flipped_cards(flipped_blocks[0], flipped_blocks[1]);

    }
}

function stop_clicking() {
    blocks_container.classList.add('no-clicking');

    setTimeout(() => {
        blocks_container.classList.remove('no-clicking')
    }, duration);
}

function check_flipped_cards(first_block, second_block) {


    if (first_block.dataset.fruits === second_block.dataset.fruits) {

        first_block.classList.remove('is-flipped');
        second_block.classList.remove('is-flipped');

        first_block.classList.add('has-match');
        second_block.classList.add('has-match');

        document.getElementById('success').play();

    }

    else {
        tries.innerHTML = parseInt(tries.innerHTML) + 1;

        setTimeout(() => {

            second_block.classList.remove('is-flipped');
            first_block.classList.remove('is-flipped');

        }, duration);

        document.getElementById('fail').play();
    }
}

function ResetGame() {

    tries.innerHTML = 0;

    matched_blocks = blocks.filter(block => block.classList.contains('has-match'));

    flipped_blocks = blocks.filter(block => block.classList.contains('is-flipped'));


    flipped_blocks.forEach(block => {
        block.classList.remove('is-flipped');
    });

    matched_blocks.forEach(block => {
        block.classList.remove('has-match');
    });

    setTimeout(() => { Shuffle(orderRange); re_order_blocks(); }, 1000);

}