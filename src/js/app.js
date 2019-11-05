setTimeout(() => {
    import("@scss/app");
}, 2000);

// import 'regenerator-runtime';
// import 'core-js';

const init = async () => {
    utils.log('hello from app.js');
    await asyncFn();
    jQuery();
};

async function asyncFn() {
    console.log([1, 2, 3].includes(0));
}
init();
